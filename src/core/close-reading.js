/**
 * core/close-reading.js — Motor PURO del "close-reading" (analisis literario C1/C2).
 *
 * Close-reading = leer DESPACIO y con lupa: no solo "que dice" sino "como" y "por
 * que". El alumno responde preguntas por LENTES de analisis (tono, eleccion de
 * palabras, subtexto, recursos, tema) y la IA evalua su analisis como un profesor
 * de literatura: comprension, evidencia textual, profundidad y expresion.
 *
 * Sin DOM ni red: la UI vive en features/close-reading.js y el fetch en
 * services/bymax-ai.js. Aqui solo se arman las preguntas y el prompt evaluador.
 */
import { FEEDBACK_TOKEN } from "./feedback.js";

/** Lentes de close-reading. El orden define el orden en pantalla. */
export const LENSES = [
  {
    id: "tone", label: "Tono y atm\u00f3sfera",
    q: "What tone or mood does the author create? Quote 1\u20132 words from the text that build it.",
    hint: "Piensa en el sentimiento del pasaje y ancla tu respuesta en palabras concretas.",
  },
  {
    id: "diction", label: "Elecci\u00f3n de palabras",
    q: "Pick one key word or phrase and explain why the author chose it (its connotation).",
    hint: "\u00bfQu\u00e9 sugiere esa palabra m\u00e1s all\u00e1 de su significado literal?",
  },
  {
    id: "subtext", label: "Subtexto",
    q: "What is implied but NOT stated directly? What is the text hinting at?",
    hint: "Lee entre l\u00edneas: lo que el autor da por entendido.",
  },
  {
    id: "device", label: "Recurso literario",
    q: "Identify one literary device (metaphor, symbol, irony\u2026) and explain its effect.",
    hint: "Nombra el recurso y di QU\u00c9 logra en el lector.",
  },
  {
    id: "theme", label: "Tema central",
    q: "What is the central theme, and how does the passage develop it?",
    hint: "Una idea universal + c\u00f3mo el texto la construye.",
  },
];

/**
 * Arma la sesion de close-reading para un pasaje.
 * @param {{title?:string, body?:string}|string} passage
 * @param {object} [opts] { max } cuantas lentes usar (def 4)
 * @returns {{title:string, body:string, questions:Array<{id,lens,q,hint}>}}
 */
export function buildCloseReading(passage, opts = {}) {
  const max = Math.max(1, opts.max == null ? 4 : opts.max);
  const body = String((passage && passage.body) || passage || "").trim();
  const title = (passage && passage.title) || "";
  const questions = LENSES.slice(0, max).map((l) => ({
    id: l.id, lens: l.label, q: l.q, hint: l.hint,
  }));
  return { title, body, questions };
}

/**
 * Construye el prompt evaluador para la IA (modo interview). Antepone el token
 * que activa al evaluador y pide SIEMPRE el mismo formato parseable por
 * core/feedback.js (areas de close-reading + secciones de texto).
 * @param {object} p
 * @param {{title?:string, body:string}} p.passage
 * @param {Array<{q:string, answer:string}>} p.qa - preguntas y respuestas del alumno
 * @returns {string}
 */
export function buildAnalysisPrompt({ passage, qa }) {
  const title = (passage && passage.title) ? passage.title : "Untitled";
  const body = (passage && passage.body) ? passage.body : "";
  const answers = (qa || [])
    .map((x, i) => (i + 1) + ") " + x.q + "\n   Respuesta del alumno: " + (x.answer || "(sin respuesta)"))
    .join("\n");

  return FEEDBACK_TOKEN + "\n" +
    "Eres profesor de literatura en ingl\u00e9s. El alumno (nivel C1/C2) hizo un CLOSE-READING " +
    "del siguiente pasaje y respondio unas preguntas de analisis. Evalua SU analisis (no reescribas " +
    "el texto). Responde SIEMPRE en espa\u00f1ol y EXACTAMENTE en este formato, sin texto extra:\n\n" +
    "PUNTAJE: <0-100>\n" +
    "COMPRENSION: <0-100>\n" +
    "EVIDENCIA: <0-100>\n" +
    "PROFUNDIDAD: <0-100>\n" +
    "EXPRESION: <0-100>\n\n" +
    "LO QUE HICISTE BIEN:\n- <2 o 3 vi\u00f1etas concretas>\n" +
    "A MEJORAR:\n- <2 o 3 vi\u00f1etas accionables sobre su analisis>\n" +
    "FRASES MODELO:\n- <2 o 3 frases en ingles que profundizarian el analisis>\n" +
    "CONSEJO FINAL:\n<1 o 2 frases motivadoras>\n\n" +
    "=== PASAJE (\"" + title + "\") ===\n" + body + "\n\n" +
    "=== RESPUESTAS DEL ALUMNO ===\n" + answers;
}
