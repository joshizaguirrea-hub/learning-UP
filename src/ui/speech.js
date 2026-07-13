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

// Palabras clave para detectar idioma en textos MIXTOS (es/en).
const ES_WORDS = new Set([
  "presente", "pasado", "futuro", "participio", "gerundio", "infinitivo", "agente",
  "opcional", "verbo", "verbos", "sujeto", "complemento", "objeto", "regla", "reglas",
  "voz", "pasiva", "activa", "ejemplo", "ejemplos", "femenino", "masculino", "singular",
  "plural", "afirmativo", "negativo", "pregunta", "respuesta", "sustantivo", "adjetivo",
  "adverbio", "articulo", "pronombre", "condicional", "subjuntivo", "imperativo", "tiempo",
  "con", "para", "por", "una", "uno", "unos", "unas", "del", "las", "los", "que", "cuando",
  "como", "mas", "pero", "tambien", "ser", "estar", "hacer", "cosa", "cosas", "forma",
]);
const EN_WORDS = new Set([
  "is", "are", "was", "were", "be", "been", "being", "am", "will", "would", "shall",
  "can", "could", "do", "does", "did", "has", "have", "had", "by", "of", "the", "to",
  "and", "or", "not", "going", "get", "got", "verb", "past", "present", "future",
  "subject", "object", "with", "for", "from", "they", "you", "he", "she", "it", "we",
]);

/** Idioma de una palabra: 'es' | 'en' | null (ambiguo, se hereda). */
function wordLang(word) {
  if (/[\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00FC\u00BF\u00A1]/i.test(word)) return "es";
  const w = word.toLowerCase().replace(/[^a-z\u00E0-\u00FF]/gi, "");
  if (!w) return null;
  if (ES_WORDS.has(w)) return "es";
  if (EN_WORDS.has(w)) return "en";
  if (/(cion|mente|dad|aje|ando|iendo|ivo|iva|ncia|oso|osa)$/.test(w)) return "es";
  return null;
}

/** Agrupa un texto en trozos consecutivos del mismo idioma. */
function groupByLang(text, base) {
  const tokens = String(text).split(/\s+/).filter(Boolean);
  const chunks = [];
  let prev = base;
  for (const tok of tokens) {
    const lang = wordLang(tok) || prev;
    prev = lang;
    const last = chunks[chunks.length - 1];
    if (last && last.lang === lang) last.text += " " + tok;
    else chunks.push({ lang, text: tok });
  }
  return chunks.length ? chunks : [{ lang: base, text: String(text) }];
}

/**
 * Pronuncia un texto que puede MEZCLAR espanol e ingles. Detecta el idioma por
 * palabra y usa voz latina para el espanol y voz US/UK para el ingles, con
 * pausas en "/" y ".". Corta cualquier locucion en curso primero.
 * @param {string} text
 * @param {string} [lang] idioma base para palabras ambiguas ('es-MX' | 'en-US')
 * @param {object} [opts] { rate, pitch, gap }
 */
export function speak(text, lang = "en-US", opts = {}) {
  if (!isSpeechSupported() || !text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const rate = opts.rate ?? 0.98;
  const pitch = opts.pitch ?? 1.0;
  const gap = opts.gap ?? 900; // pausa larga (ms) entre alternativas "/"
  const base = String(lang).toLowerCase().startsWith("es") ? "es" : "en";

  // Normaliza simbolos que suenan raro; "\u00B7" separa como "/" (pausa).
  const norm = String(text)
    .replace(/\u00B7/g, " / ")
    .replace(/[+()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = norm.split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean);

  // Cada parte -> chunks agrupados por idioma; cola de locuciones.
  const queue = [];
  parts.forEach((part, pi) => {
    const chunks = groupByLang(part, base);
    chunks.forEach((ch, ci) => {
      const lastInPart = ci === chunks.length - 1;
      queue.push({ text: ch.text, lang: ch.lang, gapAfter: lastInPart ? (pi < parts.length - 1 ? gap : 0) : 160 });
    });
  });

  const esVoice = pickVoice("es-MX");
  const enVoice = pickVoice("en-US");
  let i = 0;
  function sayNext() {
    if (i >= queue.length) return;
    const item = queue[i];
    const u = new SpeechSynthesisUtterance(item.text);
    const v = item.lang === "es" ? esVoice : enVoice;
    u.lang = v?.lang || (item.lang === "es" ? "es-MX" : "en-US");
    u.rate = rate;
    u.pitch = pitch;
    if (v) u.voice = v;
    u.onend = () => { i++; if (i < queue.length) setTimeout(sayNext, item.gapAfter); };
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
