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

const cache = new Map(); // "lang|texto" -> dataURL (mp3 base64)
let current = null;      // true si el player esta reproduciendo algo nuestro

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

/** Detiene el audio de nube que este sonando. */
export function cancelCloud() {
  if (current && player) {
    try { player.pause(); } catch { /* ignore */ }
    current = null;
  }
}

async function fetchAudio(text, lang, voice) {
  const key = lang + "|" + (voice || "") + "|" + text;
  if (cache.has(key)) return cache.get(key);
  const base = BYMAX_WORKER_URL.replace(/\/+$/, "");
  const res = await fetch(base + "/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, lang, voice }),
  });
  if (!res.ok) throw new Error("tts http " + res.status);
  const data = await res.json().catch(() => ({}));
  if (!data.audio) throw new Error("tts sin audio");
  const url = "data:audio/mp3;base64," + data.audio;
  cache.set(key, url);
  return url;
}

/**
 * Reproduce `text` con voz de la nube. Devuelve una Promise que se resuelve
 * cuando termina de sonar (o se rechaza si algo falla -> el que llama cae al
 * navegador).
 * @param {string} text
 * @param {string} [lang] "es" | "en"
 * @param {string} [voice] voz Aura para ingles (ej. "asteria", "orion")
 */
export function cloudSpeak(text, lang = "es", voice) {
  return new Promise((resolve, reject) => {
    if (!cloudTtsEnabled() || !text) { reject(new Error("cloud tts off")); return; }
    cancelCloud();
    fetchAudio(text, lang, voice).then((url) => {
      const audio = getPlayer();
      current = true;
      // Blindaje: el "unlock" movil pudo dejar el player en muted. Forzamos que
      // el audio real SIEMPRE suene (si no, la app se oiria muda por error).
      audio.muted = false;
      audio.volume = 1;
      audio.onended = () => { current = null; resolve(); };
      audio.onerror = () => { current = null; reject(new Error("audio error")); };
      audio.src = url;
      const p = audio.play();
      if (p && p.catch) p.catch(reject);
    }).catch(reject);
  });
}
