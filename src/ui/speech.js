/**
 * ui/speech.js — Texto a voz (TTS) con la Web Speech API del navegador.
 *
 * GRATIS y sin servidor: usa window.speechSynthesis. Pronuncia texto en el
 * idioma indicado (por defecto ingles). Si el navegador no lo soporta, los
 * botones simplemente no se muestran (degradacion elegante).
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

/** Elige una voz para el idioma dado (ej. 'en'). */
function pickVoice(lang) {
  const base = lang.slice(0, 2).toLowerCase();
  return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(base)) || null;
}

/**
 * Pronuncia un texto. Corta cualquier locucion en curso primero.
 * @param {string} text
 * @param {string} [lang] BCP-47, ej. 'en-US'
 * @param {number} [rate] velocidad (0.5-1.5)
 */
export function speak(text, lang = "en-US", rate = 0.95) {
  if (!isSpeechSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(String(text));
  u.lang = lang;
  u.rate = rate;
  const v = pickVoice(lang);
  if (v) u.voice = v;
  synth.speak(u);
}

/**
 * Crea un boton de altavoz que pronuncia `text`. Devuelve null si no hay soporte
 * (asi el llamador no pinta nada). Uso: speakButton("hello").
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
