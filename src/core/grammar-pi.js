/**
 * core/grammar-pi.js — Processing Instruction AVANZADO (VanPatten), motor PURO.
 *
 * El Structured Input basico (core/grammar-si.js) ya hace actividades
 * REFERENCIALES (tiempo, polaridad). El Processing Instruction "de verdad" anade
 * las dos piezas que faltaban:
 *
 *   1) EXPLICIT INFORMATION + aviso de ESTRATEGIA: antes de practicar, se le dice
 *      al alumno QUE atajo mental usa mal (p.ej. "te fijas en yesterday/tomorrow
 *      y no en el verbo") y como corregirlo. VanPatten: nombrar la mala estrategia
 *      de procesamiento acelera el aprendizaje.
 *   2) Actividades AFECTIVAS: frases con la forma en foco a las que el alumno
 *      reacciona SOBRE SI MISMO (de acuerdo / me pasa / lo hare). No hay respuesta
 *      "correcta", pero para responder con sentido DEBE procesar la forma. Cierra
 *      el ciclo: forma -> significado -> conexion personal.
 *
 * Sin DOM ni red -> testeable. Reusa detectTense/detectPolarity/sourceSentences
 * y hasTimeMarker de grammar-si.js (una sola fuente de verdad).
 */
import { detectTense, detectPolarity, hasTimeMarker, sourceSentences } from "./grammar-si.js";

// Estrategias de procesamiento mal usadas (la "trampa") + su correccion. Una por
// familia detectable. Texto en espanol (indicaciones del profe).
const STRATEGIES = {
  tense: {
    trap: "Sueles buscar palabras como \"yesterday\" o \"tomorrow\" y adivinar el tiempo por ah\u00ed.",
    fix: "Cuando NO hay esa pista, el \u00fanico dato est\u00e1 en el VERBO (was/went = pas\u00f3; will/going to = pasar\u00e1).",
    focus: "Mira siempre la forma del verbo, no solo los adverbios de tiempo.",
  },
  polarity: {
    trap: "El cerebro tiende a saltarse las palabras cortas como \"not\", \"-n't\" o \"never\".",
    fix: "Esas palabras peque\u00f1as CAMBIAN todo el significado: convierten un s\u00ed en un no.",
    focus: "Lee la frase completa: una sola marca negativa la vuelve negativa.",
  },
};

// Preguntas afectivas por familia/tiempo. Sin respuesta correcta: solo obligan a
// procesar la forma para reaccionar con sentido.
const AFFECTIVE_Q = {
  past: "\u00bfA ti tambi\u00e9n te pas\u00f3 algo as\u00ed?",
  present: "\u00bfEs verdad para ti hoy en d\u00eda?",
  future: "\u00bfT\u00fa tambi\u00e9n lo har\u00e1s?",
  polarity: "\u00bfEst\u00e1s de acuerdo con la frase?",
};

const AFFECTIVE_OPTS = {
  tense: [
    { id: "yes", text: "S\u00ed, igual que yo" },
    { id: "no", text: "No, a m\u00ed no" },
    { id: "maybe", text: "M\u00e1s o menos" },
  ],
  polarity: [
    { id: "agree", text: "S\u00ed, de acuerdo" },
    { id: "disagree", text: "No, para nada" },
    { id: "depends", text: "Depende" },
  ],
};

/**
 * Devuelve la informacion explicita (EI) para las familias presentes en la unidad.
 * @param {object} si - resultado de buildGrammarInput(unit) (usa si.items)
 * @returns {Array<{family, trap, fix, focus}>}
 */
export function explicitInfo(si) {
  const families = new Set((si?.items || []).map((it) => it.family));
  const out = [];
  for (const fam of ["tense", "polarity"]) {
    if (families.has(fam)) out.push({ family: fam, ...STRATEGIES[fam] });
  }
  return out;
}

/**
 * Construye actividades AFECTIVAS de la unidad. Prioriza frases SIN marca de
 * tiempo (para tiempo) igual que el referencial, y reacciona segun la forma.
 * @param {object} unit
 * @param {object} [opts] { max = 5 }
 * @returns {Array<{id, family, sentence, question, options:[{id,text}], note}>}
 */
export function buildAffectiveItems(unit, opts = {}) {
  const max = opts.max || 5;
  const pool = sourceSentences(unit);
  const out = [];

  for (const s of pool) {
    const tense = !hasTimeMarker(s) ? detectTense(s) : null;
    if (tense) {
      out.push({
        id: "aff-t" + out.length,
        family: "tense",
        sentence: s,
        question: AFFECTIVE_Q[tense],
        options: AFFECTIVE_OPTS.tense,
        note: tense === "past"
          ? "Fijate: el verbo est\u00e1 en pasado (ya ocurri\u00f3)."
          : tense === "future"
            ? "Fijate: la frase habla del futuro (a\u00fan no ocurre)."
            : "Fijate: la frase habla del presente (ahora o siempre).",
      });
    } else {
      const pol = detectPolarity(s);
      out.push({
        id: "aff-p" + out.length,
        family: "polarity",
        sentence: s,
        question: AFFECTIVE_Q.polarity,
        options: AFFECTIVE_OPTS.polarity,
        note: pol === "neg"
          ? "Ojo: la frase NIEGA (lleva not / -n't / never)."
          : "La frase AFIRMA (no lleva marca negativa).",
      });
    }
    if (out.length >= max) break;
  }
  return out;
}
