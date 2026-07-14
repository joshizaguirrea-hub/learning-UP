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
import { fixSpanishAccents } from "./es-accents.js";
import { cloudSpeak, cancelCloud, cloudTtsEnabled } from "./cloud-tts.js";

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

// Voces "buenas" (naturales/neurales) suelen tener estas marcas en el nombre.
const NICE = /google|natural|premium|neural|enhanced|online|siri|wavenet|dalia|jorge|paulina|helena|sabina|aria|jenny|guy/i;
// Voces ROBOTICAS conocidas (evitarlas si hay algo mejor).
const ROBOTIC = /microsoft (sabina|raul|helena|laura|pablo) desktop|espeak|pico/i;
// Preferencia de region por idioma (primero = mejor).
const REGION_PREF = {
  es: ["es-mx", "es-us", "es-la", "es-419", "es-es", "es-co", "es-ar", "es"],
  en: ["en-us", "en-gb", "en-au", "en-ca", "en"],
};

/**
 * Elige la MEJOR voz para el idioma (ej. 'es-MX'), priorizando fuerte las voces
 * naturales/neurales sobre las roboticas.
 */
function pickVoice(lang) {
  const base = lang.slice(0, 2).toLowerCase();
  const pool = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith(base));
  if (!pool.length) return null;
  const prefs = REGION_PREF[base] || [base];
  const inRegion = (v, r) => v.lang.toLowerCase().startsWith(r);
  const nice = (v) => NICE.test(v.name) && !ROBOTIC.test(v.name);

  // 1) Neural/natural en la region preferida (en orden).
  for (const r of prefs) {
    const hit = pool.find((v) => inRegion(v, r) && nice(v));
    if (hit) return hit;
  }
  // 2) Cualquier voz neural/natural del idioma (aunque sea otra region).
  const anyNice = pool.find(nice);
  if (anyNice) return anyNice;
  // 3) Voz NO robotica en la region preferida.
  for (const r of prefs) {
    const hit = pool.find((v) => inRegion(v, r) && !ROBOTIC.test(v.name));
    if (hit) return hit;
  }
  // 4) Region preferida, lo que haya. 5) cualquiera.
  for (const r of prefs) {
    const hit = pool.find((v) => inRegion(v, r));
    if (hit) return hit;
  }
  return pool[0];
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

/**
 * Detecta el idioma DOMINANTE de un texto (por conteo de palabras es/en).
 * Devuelve 'es' o 'en'. Si empata o no hay pistas, usa `base`.
 */
function detectLang(text, base) {
  let es = 0;
  let en = 0;
  for (const raw of String(text).toLowerCase().split(/\s+/)) {
    const w = raw.replace(/[^a-z\u00E0-\u00FF]/gi, "");
    if (!w) continue;
    if (/[\u00E1\u00E9\u00ED\u00F3\u00FA\u00F1\u00FC]/.test(raw) || ES_WORDS.has(w) ||
        /(cion|mente|dad|aje|ando|iendo|ivo|iva|ncia|oso|osa)$/.test(w)) es++;
  }
  // Heuristica simple: cuenta acentos/palabras es; el resto pesa hacia en.
  const words = String(text).split(/\s+/).filter(Boolean).length;
  en = words - es;
  if (es === en) return base;
  return es > en ? "es" : "en";
}

/**
 * Pronuncia un texto con UNA sola voz (natural, sin cambios de acento a media
 * frase). Elige la voz por el idioma dominante del texto (o `lang` si empata) y
 * agrega pausas naturales en "/", "." y ",". Corta lo que este sonando.
 * @param {string} text
 * @param {string} [lang] idioma base ('es-MX' | 'en-US')
 * @param {object} [opts] { rate, pitch, gap }
 */
export function speak(text, lang = "en-US", opts = {}) {
  if (!text) return;
  cancelCloud();
  if (isSpeechSupported()) window.speechSynthesis.cancel();
  const base = String(lang).toLowerCase().startsWith("es") ? "es" : "en";

  // Normaliza simbolos para que suene NATURAL (como un profe, no una maquina):
  //   "=" -> pausa breve (coma)     "who = personas" => "who, personas"
  //   "\u00B7" y flechas -> pausa larga (separan ideas)
  //   "+ ( ) * _ :" -> se omiten o se vuelven pausa.
  const norm = String(text)
    .replace(/\s*=\s*/g, ", ")
    .replace(/\u00B7/g, " / ")
    .replace(/\s*(?:->|\u2192|\u21D2)\s*/g, " / ")
    .replace(/[+*_()\[\]{}|]/g, " ")
    .replace(/\s*:\s*/g, ", ")
    .replace(/\s+([,.])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  const parts = norm.split(/\s*\/\s*/).map((s) => s.trim().replace(/^[,.\s]+/, "")).filter(Boolean);
  if (!parts.length) return;

  const useLang = detectLang(norm, base);

  // Voz NATURAL de la nube (espanol e ingles) si hay Worker. Cae al navegador si falla.
  if (cloudTtsEnabled()) {
    const cloudText = useLang === "es" ? fixSpanishAccents(parts.join(". ")) : parts.join(". ");
    cloudSpeak(cloudText, useLang === "es" ? "es" : "en").catch(browserSpeak);
    return;
  }
  browserSpeak();

  function browserSpeak() {
    if (!isSpeechSupported()) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const rate = opts.rate ?? 0.96;
    const pitch = opts.pitch ?? 1.0;
    const gap = opts.gap ?? 750; // pausa larga (ms) entre alternativas "/"
    const v = pickVoice(useLang === "es" ? "es-MX" : "en-US");
    let i = 0;
    function sayNext() {
      if (i >= parts.length) return;
      const say = useLang === "es" ? fixSpanishAccents(parts[i]) : parts[i];
      const u = new SpeechSynthesisUtterance(say);
      u.lang = v?.lang || (useLang === "es" ? "es-MX" : "en-US");
      u.rate = rate;
      u.pitch = pitch;
      if (v) u.voice = v;
      u.onend = () => { i++; if (i < parts.length) setTimeout(sayNext, gap); };
      synth.speak(u);
    }
    sayNext();
  }
}

/** Voz del Profe Robo: futurista (aguda, brillante) + chirp sci-fi opcional. */
export function speakRobot(text, lang = "es-MX", opts = {}) {
  if (opts.chirp) robotChirp();
  speak(text, lang, { rate: 1.05, pitch: 1.18 });
}

// ---- Chirp "sci-fi" del robot (Web Audio) ---------------------------------
// El navegador NO deja procesar la voz del TTS, pero SI podemos generar un
// "bip-bup" electronico corto ANTES de hablar => sensacion de robot futurista.
let _audioCtx = null;
function audioCtx() {
  if (_audioCtx) return _audioCtx;
  try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  catch { _audioCtx = null; }
  return _audioCtx;
}

/** Dos notas ascendentes cortas: el "saludo" robotico de Bymax. */
export function robotChirp() {
  const ctx = audioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  const notes = [720, 1080]; // bip (grave) -> bup (agudo)
  notes.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = f;
    const t = now + i * 0.065;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  });
}

/**
 * Habla una SECUENCIA de frases, cada una con su idioma/voz, una tras otra.
 * @param {Array<{text, lang, opts?}>} items
 * @param {function} [onEach] callback(index) justo antes de decir cada item
 * @param {function} [onDone] callback al terminar todo
 * @returns {function} cancel() para detener la secuencia
 */
export function speakSequence(items, onEach, onDone) {
  cancelCloud();
  if (isSpeechSupported()) window.speechSynthesis.cancel();
  let i = 0;
  let cancelled = false;

  function advance(it) {
    i++;
    if (!cancelled) setTimeout(next, it.gapAfter ?? 220);
  }

  function next() {
    if (cancelled) return;
    if (i >= items.length) { onDone?.(); return; }
    const it = items[i];
    onEach?.(i);
    const isEs = String(it.lang || "es-MX").toLowerCase().startsWith("es");

    // Voz NATURAL de la nube (es/en). Cae al navegador si falla.
    if (cloudTtsEnabled()) {
      const ct = isEs ? fixSpanishAccents(String(it.text)) : String(it.text);
      cloudSpeak(ct, isEs ? "es" : "en")
        .then(() => advance(it))
        .catch(() => browserSay(it, isEs, () => advance(it)));
      return;
    }
    browserSay(it, isEs, () => advance(it));
  }

  function browserSay(it, isEs, done) {
    if (!isSpeechSupported()) { setTimeout(done, 300); return; }
    const synth = window.speechSynthesis;
    const opts = it.opts || {};
    const b = isEs ? "es-MX" : "en-US";
    const v = pickVoice(b);
    const say = isEs ? fixSpanishAccents(String(it.text)) : String(it.text);
    const u = new SpeechSynthesisUtterance(say);
    u.lang = v?.lang || b;
    u.rate = opts.rate ?? 0.98;
    u.pitch = opts.pitch ?? 1.05;
    if (v) u.voice = v;
    u.onend = done;
    synth.speak(u);
  }

  next();
  return () => { cancelled = true; cancelCloud(); if (isSpeechSupported()) window.speechSynthesis.cancel(); };
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
