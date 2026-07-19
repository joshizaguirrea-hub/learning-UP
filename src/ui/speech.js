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
import { cloudSpeak, cancelCloud, cloudTtsEnabled, prefetchCloud } from "./cloud-tts.js";

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

// Pronuncia un texto en el idioma indicado (no lo parte por idioma: el profe de
// cada rol dice su frase entera). Normaliza simbolos y lo pasa a speakSequence.
// @param text  @param lang idioma (es-MX | en-US)  @param opts { rate, pitch, gap }
export function speak(text, lang = "en-US", opts = {}) {
  if (!text) return;
  const base = String(lang).toLowerCase().startsWith("es") ? "es" : "en";

  // Normaliza simbolos para que suene NATURAL (como un profe, no una maquina):
  //   "=" -> pausa (coma); "\u00B7"/flechas -> separan ideas; "+ ( ) * _ :" -> pausa.
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

  // Un item por parte; speakSequence lo divide por idioma (es/en) y le da a cada
  // trozo su voz correcta (RAIZ anti-Spanglish). Cae al navegador solo en ingles.
  speakSequence(parts.map((p) => ({ text: p, lang: base === "es" ? "es-MX" : "en-US", opts })));
}

// --- Deteccion de idioma por frase (anti-Spanglish en respuestas MIXTAS) ---
// Marcas inequivocas de espanol (acentos, enye, signos ¿¡) y palabras funcion
// frecuentes. Se usa para decidir la voz de cada frase por separado.
const ES_CHARS = /[\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC\u00F1\u00BF\u00A1]/i;
const ES_WORDS = /\b(el|la|los|las|un|una|unos|unas|de|del|que|qu\u00E9|y|o|pero|porque|como|c\u00F3mo|para|por|con|sin|tu|tus|te|te|es|est\u00E1|estas|estoy|soy|eres|eras|puedes|puede|tienes|tiene|hacer|dices|dice|algo|muy|bien|no|s\u00ED|si|esto|esta|este|eso|ese|cuando|donde|dedicas|trabajo|sue\u00F1os|ayudarte|preocupes|completamente|normal|responder|sencillo|ejemplo|frase|regla|recuerda|significa|correcto|respuesta)\b/i;
const EN_WORDS = /\b(the|a|an|of|to|is|are|was|were|do|does|did|you|your|i|we|they|he|she|it|and|or|but|because|what|when|where|how|can|could|would|should|will|have|has|had|work|student|office|dream|job|example|answer|question|hello|hi|nice)\b/i;

/** Devuelve "es" o "en" para un fragmento de texto (default en). */
function detectLang(text) {
  const t = String(text || "");
  if (ES_CHARS.test(t)) return "es";
  const es = (t.match(new RegExp(ES_WORDS, "gi")) || []).length;
  const en = (t.match(new RegExp(EN_WORDS, "gi")) || []).length;
  return es > en ? "es" : "en";
}

/**
 * Habla un texto MIXTO (es/en) dando a cada frase su voz correcta. Los ejemplos
 * entre comillas ("I am a student") se dicen SIEMPRE en ingles; el resto se
 * detecta por frase. Anti-Spanglish real cuando Bymax ayuda en espanol pero
 * cita ejemplos en ingles.
 * @param {string} text
 * @returns {function} cancel()
 */
export function speakBilingual(text) {
  if (!text) return () => {};
  // 1) Trocea en segmentos: lo entrecomillado (" " o “ ”) va aparte como INGLES.
  const raw = String(text).replace(/\s+/g, " ").trim();
  const segs = [];
  const re = /["\u201C\u201D]([^"\u201C\u201D]+)["\u201C\u201D]/g;
  let last = 0, m;
  while ((m = re.exec(raw))) {
    if (m.index > last) segs.push({ text: raw.slice(last, m.index), quoted: false });
    segs.push({ text: m[1], quoted: true });
    last = re.lastIndex;
  }
  if (last < raw.length) segs.push({ text: raw.slice(last), quoted: false });

  // 2) Cada segmento no entrecomillado se parte en frases; cada frase toma su
  //    idioma detectado. Las entrecomilladas van forzadas a ingles.
  const rawItems = [];
  for (const s of segs) {
    const clean = s.text.replace(/^[\s,.;:]+|[\s,.;:]+$/g, "").trim();
    if (!clean) continue;
    if (s.quoted) { rawItems.push({ text: clean, lang: "en-US" }); continue; }
    for (const phrase of clean.split(/(?<=[.!?\u00A1\u00BF])\s+/)) {
      const p = phrase.trim();
      if (!p) continue;
      rawItems.push({ text: p, lang: detectLang(p) === "es" ? "es-MX" : "en-US" });
    }
  }
  if (!rawItems.length) return () => {};

  // 2b) FUSIONA trozos SEGUIDOS del mismo idioma en uno solo -> menos cortes y
  //     menos peticiones (una frase completa por idioma suena mas fluida).
  const items = [];
  for (const it of rawItems) {
    const prev = items[items.length - 1];
    if (prev && prev.lang === it.lang) prev.text += " " + it.text;
    else items.push({ ...it });
  }
  // Gap corto entre idiomas: transicion viva, sin silencios que aburran.
  for (const it of items) it.gapAfter = 90;

  // 3) PRE-DESCARGA en PARALELO todos los audios (warm cache) para que al
  //    reproducir NO haya pausa de red entre el espanol y el ingles. La clave
  //    debe coincidir con la que usa speakSequence (fixSpanishAccents en ES).
  for (const it of items) {
    const isEs = String(it.lang).toLowerCase().startsWith("es");
    prefetchCloud(isEs ? fixSpanishAccents(it.text) : it.text, isEs ? "es" : "en");
  }

  return speakSequence(items);
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
  if (isSpeechSupported()) window.speechSynthesis.cancel();

  // Solo la ULTIMA secuencia manda: si alguien arranca otra, esta se detiene
  // sola (evita que dos secuencias se pisen -> "dice palabras y reinicia").
  const myGen = ++seqGen;

  // MODELO DOS PROFES: cada item se dice ENTERO en el idioma de su rol. El profe
  // de ESPANOL (explicaciones, preguntas, logica) no corta a ingles a media
  // frase; el profe de INGLES lee el contenido (ejemplos, dialogos, lecturas).
  // El idioma lo fija quien crea el item (lang: es-MX | en-US).
  const expanded = items.map((it) => ({
    text: String(it.text),
    lang: String(it.lang || "es-MX").toLowerCase().startsWith("es") ? "es-MX" : "en-US",
    opts: it.opts,
    gapAfter: it.gapAfter,
  }));

  let i = 0;
  let cancelled = false;
  const dead = () => cancelled || myGen !== seqGen;

  function advance(it) {
    i++;
    if (!dead()) setTimeout(next, it.gapAfter ?? 220);
  }

  function next() {
    if (dead()) return;
    if (i >= expanded.length) { onDone?.(); return; }
    const it = expanded[i];
    onEach?.(i);
    const isEs = String(it.lang || "es-MX").toLowerCase().startsWith("es");

    // Voz de la nube para ambos (ingles Aura, espanol Google TTS latino),
    // independiente del dispositivo. Cae al navegador si falla.
    if (cloudTtsEnabled()) {
      const ct = isEs ? fixSpanishAccents(String(it.text)) : String(it.text);
      // Ingles PAUSADO por defecto (0.9) si nadie fijo un rate; espanol queda
      // normal (ya suena nitido). Asi el ingles nunca sale atropellado.
      const baseOpts = it.opts || {};
      const opts = (!isEs && baseOpts.rate == null) ? { ...baseOpts, rate: 0.9 } : baseOpts;
      cloudSpeak(ct, isEs ? "es" : "en", opts)
        .then(() => advance(it))
        .catch(() => {
          // MEDIDA DRASTICA: si la nube falla y es ESPANOL, saltamos el item
          // (silencio) en vez de leerlo con voz gringa. Ingles si cae al navegador.
          if (isEs) { advance(it); return; }
          browserSay(it, isEs, () => advance(it));
        });
      return;
    }
    browserSay(it, isEs, () => advance(it));
  }

  function browserSay(it, isEs, done) {
    if (!isSpeechSupported()) { setTimeout(done, 300); return; }
    // CANDADO DURO anti-Spanglish: el navegador NUNCA lee espanol. Solo nube.
    if (isEs) { setTimeout(done, 100); return; }
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
