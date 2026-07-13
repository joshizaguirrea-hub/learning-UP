/**
 * ui/speech.js — Texto a voz (TTS) con la Web Speech API del navegador.
 *
 * GRATIS y sin servidor: usa window.speechSynthesis. Elige la MEJOR voz nativa
 * disponible por idioma (ingles real para el contenido; espanol nativo para las
 * indicaciones del profe). Si el navegador no lo soporta, los botones no se
 * muestran (degradacion elegante).
 */
import { el } from "./dom.js";
import { ICONS } from "./icons.js";

/** True si el navegador soporta sintesis de voz. */
export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Cache de voces (se cargan async en algunos navegadores).
let voices = [];
function loadVoices() {
  if (!isSpeechSupported()) return;
  voices = window.speechSynthesis.getVoices() || [];
}
if (isSpeechSupported()) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Voces "buenas" suelen tener estas marcas en el nombre (mas naturales).
const NICE = /google|natural|premium|neural|enhanced|siri|zira|aria|sabina|paulina|helena/i;
// Preferencia de region por idioma (primero = mejor).
const REGION_PREF = {
  es: ["es-mx", "es-us", "es-la", "es-419", "es-es", "es-co", "es-ar", "es"],
  en: ["en-us", "en-gb", "en-au", "en-ca", "en"],
};

/** Elige la mejor voz para el idioma dado (ej. 'es-MX' o 'en-US'). */
function pickVoice(lang) {
  const base = lang.slice(0, 2).toLowerCase();
  const pool = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(base));
  if (!pool.length) return null;
  const prefs = REGION_PREF[base] || [base];
  // 1) region preferida + nombre "bonito"  2) region preferida  3) nombre bonito  4) cualquiera.
  for (const region of prefs) {
    const nice = pool.find((v) => v.lang.toLowerCase().startsWith(region) && NICE.test(v.name));
    if (nice) return nice;
    const any = pool.find((v) => v.lang.toLowerCase().startsWith(region));
    if (any) return any;
  }
  return pool.find((v) => NICE.test(v.name)) || pool[0];
}

/**
 * Pronuncia un texto. Corta cualquier locucion en curso primero.
 * @param {string} text
 * @param {string} [lang] BCP-47, ej. 'en-US' o 'es-MX'
 * @param {object} [opts] { rate, pitch }
 */
export function speak(text, lang = "en-US", opts = {}) {
  if (!isSpeechSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const v = pickVoice(lang);
  const rate = opts.rate ?? 0.98;
  const pitch = opts.pitch ?? 1.0;
  const gap = opts.gap ?? 900; // pausa (ms) entre alternativas separadas por "/"

  // "are produced / are polluted" -> se dice una, pausa ~1s, luego la otra.
  const parts = String(text).split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean);

  let i = 0;
  function sayNext() {
    if (i >= parts.length) return;
    const u = new SpeechSynthesisUtterance(parts[i]);
    u.lang = v?.lang || lang;
    u.rate = rate;
    u.pitch = pitch;
    if (v) u.voice = v;
    u.onend = () => { i++; if (i < parts.length) setTimeout(sayNext, gap); };
    synth.speak(u);
  }
  sayNext();
}

/** Voz del Profe Robo: mas aguda y alegre. Idioma segun se le pase. */
export function speakRobot(text, lang = "es-MX") {
  speak(text, lang, { rate: 1.06, pitch: 1.2 });
}

/**
 * Crea un boton de altavoz que pronuncia `text`. Devuelve null si no hay soporte.
 * Uso: speakButton("hello") (ingles por defecto, para el contenido).
 */
export function speakButton(text, { lang = "en-US", cls = "" } = {}) {
  if (!isSpeechSupported()) return null;
  return el("button", {
    type: "button",
    class: "inline-flex items-center justify-center w-7 h-7 rounded-full text-indigo-300 " +
      "hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400 shrink-0 " + cls,
    "aria-label": `Escuchar: ${text}`,
    title: "Escuchar",
    onclick: (e) => { e.preventDefault(); e.stopPropagation(); speak(text, lang); },
    html: ICONS.sound,
  });
}
