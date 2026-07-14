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
let current = null;      // Audio en reproduccion

/** Detiene el audio de nube que este sonando. */
export function cancelCloud() {
  if (current) {
    try { current.pause(); } catch { /* ignore */ }
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
      const audio = new Audio(url);
      current = audio;
      audio.onended = () => { if (current === audio) current = null; resolve(); };
      audio.onerror = () => { if (current === audio) current = null; reject(new Error("audio error")); };
      const p = audio.play();
      if (p && p.catch) p.catch(reject);
    }).catch(reject);
  });
}
