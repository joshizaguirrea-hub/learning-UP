/**
 * ui/cloud-tts.js — Voz de ESPANOL nativa via Cloudflare Workers AI (MeloTTS).
 *
 * Por que: la Web Speech API depende de las voces instaladas en cada equipo.
 * En un celular sin voz espanola suena "gringo leyendo espanol". Aqui pedimos
 * el audio al Worker (que usa el TTS gratis de Cloudflare) y lo reproducimos.
 * Resultado: espanol nativo en CUALQUIER dispositivo, sin instalar nada.
 *
 * Degradacion elegante: si el Worker no responde, quien llama cae a la voz del
 * navegador. Cachea por texto para no repetir peticiones (ahorra free-tier).
 */
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";

/** True si hay Worker configurado para pedir audio a la nube. */
export function cloudTtsEnabled() {
  return bymaxAiEnabled;
}

const cache = new Map();    // "lang|texto" -> dataURL (mp3 base64) YA descargado
const inflight = new Map(); // "lang|texto" -> Promise<dataURL> en vuelo (DEDUP)
let current = null;         // true si el player esta reproduciendo algo nuestro
let playToken = 0;          // generacion: invalida reproducciones viejas (anti-"pisa y reinicia")

/**
 * Arregla el texto ANTES de mandarlo al TTS para que suene natural:
 *  - "UP" en mayusculas lo deletrea "u-pe" -> lo pasamos a "Up" (marca).
 *  - Flechas (->, =>, <-, unicode) -> pausa natural (coma), no leer el simbolo.
 *  - Simbolos mudos (= * _ # < > | ~ ^ ` {} [] () \ / " y comillas) -> espacio.
 * Se conservan apostrofes (para "isn't") y la puntuacion normal (. , ; : ! ?).
 */
function normalizeForTts(text) {
  return String(text)
    .replace(/\bUP\b/g, "Up")
    .replace(/-->|->|=>|<--|<-|[\u2190-\u21FF\u2794\u279C\u27A1]/g, ", ")
    .replace(/[=_*#|~^`<>{}\[\]\\/()"\u201C\u201D\u00AB\u00BB]/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// UN SOLO elemento de audio, reusado siempre. Clave en MOVIL: una vez que el
// usuario lo "desbloquea" con un toque, los play() programaticos posteriores
// (secuencias titulo->narracion) ya NO los bloquea la politica de autoplay.
let player = null;
function getPlayer() {
  if (!player) player = new Audio();
  return player;
}
// Desbloquea el audio en el primer gesto del usuario (touch/click).
if (typeof window !== "undefined") {
  const unlock = () => {
    try {
      const p = getPlayer();
      p.muted = true;
      const pr = p.play();
      if (pr && pr.then) pr.then(() => { p.pause(); p.muted = false; }).catch(() => { p.muted = false; });
    } catch { /* ignore */ }
    window.removeEventListener("touchend", unlock);
    window.removeEventListener("click", unlock);
  };
  window.addEventListener("touchend", unlock, { once: true });
  window.addEventListener("click", unlock, { once: true });
}

/** Detiene el audio de nube que este sonando (e invalida reproducciones pendientes). */
export function cancelCloud() {
  playToken++; // cualquier fetch.then anterior vera un token viejo y NO tocara el player
  if (current && player) {
    try { player.pause(); } catch { /* ignore */ }
    current = null;
  }
}

async function fetchAudio(rawText, lang, opts) {
  const o = opts || {};
  const text = normalizeForTts(rawText);
  // La clave de cache incluye todo lo que cambia el audio (voz, voz HD, rate).
  const key = lang + "|" + (o.voice || "") + "|" + (o.voiceHd || "") + "|" + (o.rate || "") + "|" + text;
  if (cache.has(key)) return cache.get(key);
  if (inflight.has(key)) return inflight.get(key); // DEDUP: no bajar 2 veces lo mismo
  const base = BYMAX_WORKER_URL.replace(/\/+$/, "");
  const p = (async () => {
    const res = await fetch(base + "/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text, lang,
        voice: o.voice,      // voz Aura (compat con Worker viejo)
        voiceHd: o.voiceHd,  // voz Google Chirp3-HD ingles (Worker nuevo)
        gender: o.gender,    // "F" | "M" (para elegir voz por defecto)
        rate: o.rate,        // velocidad (titulos mas lentos = mas carino)
      }),
    });
    if (!res.ok) throw new Error("tts http " + res.status);
    const data = await res.json().catch(() => ({}));
    if (!data.audio) throw new Error("tts sin audio");
    const url = "data:audio/mp3;base64," + data.audio;
    cache.set(key, url);
    return url;
  })();
  inflight.set(key, p);
  try { return await p; }
  finally { inflight.delete(key); }
}

// PRE-DESCARGA (warm cache) del audio SIN reproducirlo. Se usa para bajar en
// paralelo todos los trozos de una secuencia bilingue -> al reproducir ya estan
// en cache y NO hay pausa de red entre idiomas. Silencioso: ignora errores.
export function prefetchCloud(text, lang = "es", opts) {
  const o = typeof opts === "string" ? { voice: opts } : (opts || {});
  if (!cloudTtsEnabled() || !text) return Promise.resolve();
  return fetchAudio(text, lang, o).catch(() => {});
}

/**
 * Reproduce `text` con voz de la nube. Devuelve una Promise que se resuelve
 * cuando termina de sonar (o se rechaza si algo falla -> el que llama cae al
 * navegador).
 * @param {string} text
 * @param {string} [lang] "es" | "en"
 * @param {object|string} [opts] { voice, voiceHd, gender, rate } (o voz Aura como string, compat)
 */
export function cloudSpeak(text, lang = "es", opts) {
  const o = typeof opts === "string" ? { voice: opts } : (opts || {});
  return new Promise((resolve, reject) => {
    if (!cloudTtsEnabled() || !text) { reject(new Error("cloud tts off")); return; }
    cancelCloud();
    // Token de ESTA reproduccion. Si mientras baja el audio alguien llama a
    // cancelCloud()/otro cloudSpeak, el token cambia y este .then se descarta
    // -> NUNCA se reproduce un audio viejo encima del nuevo (bug "reinicia").
    const myToken = playToken;
    fetchAudio(text, lang, o).then((url) => {
      if (myToken !== playToken) { resolve(); return; } // quedo obsoleto: no suena
      const audio = getPlayer();
      current = true;
      // Blindaje: el "unlock" movil pudo dejar el player en muted. Forzamos que
      // el audio real SIEMPRE suene (si no, la app se oiria muda por error).
      audio.muted = false;
      audio.volume = 1;
      let done = false;
      const finish = (fn, arg) => {
        if (done) return;           // un solo desenlace: ni doble resolve ni reinicio
        done = true;
        audio.onended = null;
        audio.onerror = null;
        if (current && myToken === playToken) current = null;
        fn(arg);
      };
      audio.onended = () => finish(resolve);
      audio.onerror = () => {
        // Si esta reproduccion quedo obsoleta (otra la reemplazo), NO es un error
        // real: resolvemos en silencio para NO gatillar el fallback del navegador
        // (que releeria el texto = "dice palabras y reinicia").
        if (myToken !== playToken) finish(resolve);
        else finish(reject, new Error("audio error"));
      };
      try { audio.pause(); } catch { /* ignore */ }
      audio.src = url;            // reasignar src reinicia currentTime a 0 (una sola vez)
      const p = audio.play();
      if (p && p.catch) p.catch((e) => {
        // AbortError = play() interrumpido por otro src/pause (normal al alternar).
        // Eso o quedar obsoleto NO debe reintentar con la voz del navegador.
        if ((e && e.name === "AbortError") || myToken !== playToken) finish(resolve);
        else finish(reject, e);
      });
    }).catch(reject);
  });
}
