/**
 * data/listening-gen.js — Generador de lecciones de LISTENING (datos puros).
 *
 * DRY + escala A1..C2: en vez de escribir a mano una leccion de comprension
 * auditiva por unidad, la GENERAMOS a partir del VOCABULARIO que cada unidad ya
 * tiene (term + example). El alumno escucha la frase (voz real Chirp3-HD) con el
 * texto OCULTO y elige la palabra clave que oyo -> entrena el oido y el vocab.
 *
 * No toca DOM ni red. Se aplica en data/units/index.js sobre cada unidad que
 * todavia NO tenga una leccion de listening (respeta las hechas a mano).
 */
import { unitTts } from "./languages.js";

/** Escapa una cadena para usarla dentro de un RegExp. */
function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Articulos y particulas que NO pueden ser la "palabra clave" de un ejercicio
 * de oido. Cubre los 4 idiomas del curso (en/fr/it/pt) + es por si acaso.
 *
 * POR QUE: el glosario de fr/it guarda el genero en el termino ("la mere",
 * "il pane"), que es CORRECTO pedagogicamente -- en esos idiomas la palabra se
 * aprende con su articulo. Pero para el ejercicio de escucha hay que quedarse
 * con el sustantivo: preguntar "que palabra oiste" y que las opciones sean
 * "le", "la" y "les" no entrena el oido, entrena a adivinar.
 */
const PARTICULAS = new Set([
  "to", "the", "a", "an",                                  // en
  "le", "la", "les", "un", "une", "des", "du", "au", "aux", // fr
  "il", "lo", "gli", "i", "uno", "una", "dei", "degli",     // it
  "o", "os", "as", "um", "uma", "uns", "umas",              // pt
  "el", "los", "las", "unos", "unas",                       // es
  "se", "si", "me", "te", "nos", "vos",                     // pronominales
]);

/**
 * Palabra AUDIBLE y distintiva de un termino, para usarla como respuesta.
 *   "to book"            -> "book"
 *   "la mere"            -> "mere"        (sin el articulo)
 *   "le fils / la fille" -> "fils"        (se queda la primera variante)
 *   "l'eau"              -> "eau"         (sin el apostrofe)
 *   "se lever"           -> "lever"       (sin el pronombre)
 *   "to go (went)"       -> "went"        (ver nota)
 * Si tras limpiar no queda nada util, devuelve "".
 *
 * NOTA sobre el parentesis: en las unidades de pasado el glosario guarda
 * "to go (went)" y el ejemplo es "I WENT to the beach". La palabra que SUENA
 * es la irregular, no el infinitivo -> si hay parentesis, manda su contenido.
 * Sin esto la unidad entera se quedaba sin leccion de listening.
 */
export function mainWord(term) {
  const raw = String(term || "");
  // Forma entre parentesis (pasado irregular): es la que se oye en el ejemplo.
  const paren = raw.match(/\(([^)]+)\)/);
  if (paren && paren[1].trim()) return paren[1].trim().split(/\s+/)[0];

  let t = raw.split("/")[0].trim(); // "le fils / la fille" -> "le fils"
  // Quita particulas iniciales mientras queden (ej. "tous les jours" -> "jours").
  const partes = t.split(/\s+/).filter(Boolean);
  while (partes.length > 1 && PARTICULAS.has(partes[0].toLowerCase())) partes.shift();
  t = partes.join(" ");
  // Elisiones: l'eau, d'eau, s'appeler, n'est... -> se queda lo de despues.
  t = t.replace(/^[a-z]['\u2019]/i, "");
  const w = t.split(/\s+/)[0] || "";
  // Si quedo una particula suelta o nada, el termino no sirve de clave.
  return w && !PARTICULAS.has(w.toLowerCase()) ? w : "";
}

/** True si el ejemplo CONTIENE (audible) la palabra clave del termino. */
function exampleHasTerm(v) {
  if (!v.example || !v.term) return false;
  const w = mainWord(v.term);
  if (!w) return false; // el termino es solo particulas: no sirve de clave
  return new RegExp("\\b" + escapeRe(w), "i").test(v.example);
}

/** Inserta `value` en la posicion `pos` de una copia de `arr`. */
function insertAt(arr, value, pos) {
  const copy = [...arr];
  copy.splice(Math.min(pos, copy.length), 0, value);
  return copy;
}

/**
 * Construye la leccion de listening de una unidad a partir de su vocab.
 * @returns {object|null} la leccion, o null si no hay material suficiente.
 */
export function buildListeningLesson(unit, ttsLang) {
  const usable = (unit.vocab || []).filter(exampleHasTerm);
  if (usable.length < 3) return null;

  const chosen = usable.slice(0, 6);
  const activities = [];

  chosen.forEach((v, i) => {
    const wOfV = mainWord(v.term);
    const wLow = wOfV.toLowerCase();
    // Distractores: palabras clave de OTROS terminos que NO suenan en este
    // ejemplo (para que haya UNA sola respuesta correcta y audible).
    const pool = usable
      .map((o) => mainWord(o.term))
      .filter((w) => w && w.toLowerCase() !== wLow)
      .filter((w) => !new RegExp("\\b" + escapeRe(w), "i").test(v.example));

    // Elige 2 distractores DISTINTOS entre si (reparto deterministico).
    const distractors = [];
    for (let k = 0; k < pool.length && distractors.length < 2; k++) {
      const cand = pool[(i + k) % pool.length];
      if (cand && !distractors.some((d) => d.toLowerCase() === cand.toLowerCase())) {
        distractors.push(cand);
      }
    }
    if (distractors.length < 2) return; // sin buenos distractores, saltamos

    // Las opciones son la PALABRA CLAVE, no el termino con articulo: en fr/it
    // el glosario guarda "la mere" / "il pane" (correcto para aprender el
    // genero), pero elegir entre "le", "la" y "les" no entrena el oido.
    const choices = insertAt(distractors, wOfV, i % 3); // rota la posicion correcta
    const answer = choices.indexOf(wOfV);

    activities.push({
      id: unit.id + "-listen-a" + (i + 1),
      type: "listening",
      prompt: (i + 1) + ". Escucha y responde:",
      payload: {
        audio: v.example,
        // El idioma lo manda la UNIDAD. Estaba fijo en "en-US", asi que una
        // frase francesa se leia con voz inglesa: inservible para el oido.
        lang: ttsLang || "en-US",
        question: "\u00bfQu\u00e9 palabra clave escuchaste en la frase?",
        choices,
        answer,
        transcript: v.example,
      },
    });
  });

  if (activities.length < 3) return null;

  return {
    id: unit.id + "-listen",
    order: 90, // siempre al final del recorrido de la unidad
    phase: "practice",
    skills: ["listening"],
    title: "Listening: entrena tu o\u00eddo",
    intro:
      "Competencia de LISTENING (comprension auditiva). Escucha cada frase con voz " +
      "real las veces que necesites y elige la palabra clave que oiste. El texto esta " +
      "OCULTO a proposito; puedes abrir la transcripcion despues de responder.",
    activities,
  };
}

/**
 * Devuelve la unidad asegurando que tenga una leccion de listening. Si ya tiene
 * una (hecha a mano), NO agrega nada. Muta la unidad (mantiene referencias).
 */
export function withListening(unit) {
  const already = (unit.lessons || []).some((l) => (l.skills || []).includes("listening"));
  if (!already) {
    // El idioma sale de la unidad (unit.language), no se asume ingles.
    const lesson = buildListeningLesson(unit, unitTts(unit));
    if (lesson) unit.lessons.push(lesson);
  }
  return unit;
}
