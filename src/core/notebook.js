/**
 * core/notebook.js — Motor PURO del "Cuaderno de la unidad".
 *
 * Al terminar una CLASE o CONVERSACION con la profe, un buen docente no solo
 * charla: apunta en un cuaderno TODOS los errores del alumno (pronombres,
 * conjugacion, concordancia, vocabulario que le falto) para que los REPASE y
 * PRACTIQUE despues. Este modulo:
 *   1) buildNotebookPrompt(targetLang) -> la rubrica que se manda a la IA para que
 *      evalue la conversacion y devuelva SIEMPRE el mismo formato parseable.
 *   2) mergeNotebook(prev, fresh) -> acumula (dedup) errores y vocabulario a lo
 *      largo de varias sesiones de la MISMA unidad (cuaderno historico).
 *
 * DRY: el formato es el MISMO que core/feedback.js, asi que la respuesta se lee
 * con su parseFeedback() (errores + vocabulario ya salen estructurados). Sin DOM
 * ni red: testeable con node. La UI vive en features/notebook.js y el guardado en
 * ui/notebook-store.js.
 */
import { FEEDBACK_TOKEN } from "./feedback.js";

/** Nombre en espanol del idioma meta (para la rubrica). */
const LANG_ES = {
  en: "ingles", pt: "portugues", it: "italiano", fr: "frances", ja: "japones", es: "espanol",
};
export function langNameEs(code) {
  return LANG_ES[String(code || "en").slice(0, 2).toLowerCase()] || "ingles";
}

/**
 * Construye la rubrica del cuaderno. Antepone el token que el Worker reconoce
 * para SALIR del rol de clase y evaluar. Pide EXACTAMENTE el formato que lee
 * parseFeedback(), con enfasis en PRONOMBRES y en el VOCABULARIO QUE LE FALTA.
 * @param {string} targetLang - idioma meta (en|pt|it|fr|ja)
 * @returns {string}
 */
export function buildNotebookPrompt(targetLang = "en") {
  const L = langNameEs(targetLang);
  const rubric =
    `Acabas de terminar una CLASE/CONVERSACION de practica de ${L} con el estudiante ` +
    `(hispanohablante). Eres su profesor de ${L}. Revisa SOLO lo que dijo el ESTUDIANTE ` +
    `(no tus propios turnos) y arma su CUADERNO DE ERRORES como un examinador MCER. ` +
    `Responde SIEMPRE en espanol y EXACTAMENTE en este formato, sin texto extra antes ni despues:\n\n` +
    "PUNTAJE: <0-100>\n" +
    "GRAMATICA: <0-100>\n" +
    "VOCABULARIO: <0-100>\n" +
    "FLUIDEZ: <0-100>\n" +
    "COHERENCIA: <0-100>\n\n" +
    "LO QUE HICISTE BIEN:\n- <2 o 3 vinetas concretas de lo que el estudiante hizo bien>\n" +
    `VOCABULARIO QUE USASTE:\n- <palabras o expresiones EN ${L} que el estudiante uso bien, una por linea>\n` +
    "A MEJORAR:\n- <2 o 3 vinetas concretas y accionables>\n" +
    "ERRORES CLAVE:\n" +
    `- "<frase EXACTA que dijo mal en ${L}>" -> "<como se dice correcto>" (<por que, breve; si es de PRONOMBRE, conjugacion, genero o numero, DILO>)\n` +
    "<una linea por error real, 2 a 6 errores; PRIORIZA errores de PRONOMBRES, concordancia y conjugacion>\n" +
    "VOCABULARIO SUGERIDO:\n" +
    `- <palabra o expresion EN ${L} que le FALTO o no supo> = <significado corto en espanol>\n` +
    "<2 a 6 lineas: el vocabulario que necesita y que le habria servido en esta conversacion>\n" +
    "CONSEJO FINAL:\n<1 o 2 frases motivadoras y claras en espanol>";
  return FEEDBACK_TOKEN + "\n" + rubric;
}

/** Clave de dedup de un error (frase mal + correccion, normalizadas). */
function errorKey(e) {
  return ((e.wrong || "") + "->" + (e.right || "")).toLowerCase().replace(/\s+/g, " ").trim();
}
/** Clave de dedup de una palabra de vocabulario. */
function vocabKey(v) {
  return String(v.word || "").toLowerCase().replace(/\s+/g, " ").trim();
}

/** Limites para que el cuaderno no crezca sin fin (localStorage). */
const MAX_ERRORS = 60;
const MAX_VOCAB = 80;

/**
 * Acumula (dedup) el cuaderno previo con el resultado fresco de una sesion.
 * Mantiene lo mas RECIENTE al frente. No muta las entradas de entrada.
 * @param {object|null} prev - cuaderno guardado { errors[], vocab[], sessions } o null
 * @param {object} fresh - { errors:[{wrong,right,why}], vocabSuggested:[{word,note}], score }
 * @returns {{errors:Array, vocab:Array, lastScore:number, sessions:number}}
 */
export function mergeNotebook(prev, fresh) {
  const now = Date.now();
  const prevErrors = (prev && prev.errors) || [];
  const prevVocab = (prev && prev.vocab) || [];

  const errSeen = new Map();
  const errors = [];
  const pushErr = (e, ts) => {
    if (!e || !e.wrong || !e.right) return;
    const k = errorKey(e);
    if (errSeen.has(k)) return;
    errSeen.set(k, true);
    errors.push({ wrong: e.wrong, right: e.right, why: e.why || "", ts: ts || now });
  };
  // Los frescos primero (mas relevantes), luego el historico.
  for (const e of (fresh.errors || [])) pushErr(e, now);
  for (const e of prevErrors) pushErr(e, e.ts);

  const vocSeen = new Map();
  const vocab = [];
  const pushVoc = (v, ts) => {
    if (!v || !v.word) return;
    const k = vocabKey(v);
    if (vocSeen.has(k)) return;
    vocSeen.set(k, true);
    vocab.push({ word: v.word, note: v.note || "", ts: ts || now });
  };
  for (const v of (fresh.vocabSuggested || [])) pushVoc({ word: v.word, note: v.note }, now);
  for (const v of prevVocab) pushVoc(v, v.ts);

  return {
    errors: errors.slice(0, MAX_ERRORS),
    vocab: vocab.slice(0, MAX_VOCAB),
    lastScore: typeof fresh.score === "number" ? fresh.score : (prev && prev.lastScore) || null,
    sessions: ((prev && prev.sessions) || 0) + 1,
  };
}
