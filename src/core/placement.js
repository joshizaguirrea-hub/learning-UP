/**
 * core/placement.js — Motor del examen de ubicacion adaptativo.
 *
 * Logica PURA (sin I/O, sin DOM) => testeable con Node.
 *
 * Como funciona (CAT-lite, adaptativo y determinista):
 *   - Empieza en el nivel que sugiere la autoevaluacion (De cero=A1, Intermedio=B1,
 *     Avanzado=B2) para no aburrir ni asustar.
 *   - Si aciertas, la siguiente pregunta sube de nivel; si fallas, baja.
 *   - Dentro de un nivel, prioriza la COMPETENCIA menos evaluada (reading,
 *     literature, writing, speaking, vocabulary, grammar) para un examen completo.
 *   - Tras N preguntas, el nivel final = promedio (redondeado) de la dificultad
 *     de las preguntas que acertaste. Si no acierta ninguna => A1.
 *
 * El motor NO conoce Supabase ni la UI: recibe el banco y devuelve estado.
 */
import { CEFR_ORDER } from "../data/cefr.js";

/** Niveles evaluables por el examen (subconjunto ordenado del MCER). */
export const EXAM_LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const DEFAULT_START_INDEX = 1;        // A2
const DEFAULT_MAX_QUESTIONS = 12;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/** Traduce la autoevaluacion a un indice de inicio del examen. */
export function startIndexFor(selfLevel) {
  switch (selfLevel) {
    case "basico": return 0;      // A1
    case "intermedio": return 2;  // B1
    case "avanzado": return 3;    // B2
    default: return DEFAULT_START_INDEX;
  }
}

/**
 * Crea una sesion de examen.
 * @param {Array} bank - banco de preguntas (data/placement-questions.js).
 * @param {object} [opts] - { maxQuestions, startIndex }
 */
export function createSession(bank, opts = {}) {
  return {
    bank,
    maxQuestions: opts.maxQuestions ?? DEFAULT_MAX_QUESTIONS,
    levelIndex: clamp(opts.startIndex ?? DEFAULT_START_INDEX, 0, EXAM_LEVELS.length - 1),
    askedIds: [],
    answers: [], // { question, choice, correct }
    finished: false,
  };
}

/** Elige, en un nivel dado, la pregunta no usada de la competencia menos evaluada. */
function pickAtLevel(session, level) {
  const notAsked = session.bank.filter(
    (q) => q.level === level && !session.askedIds.includes(q.id));
  if (!notAsked.length) return null;
  const counts = {};
  for (const a of session.answers) counts[a.question.skill] = (counts[a.question.skill] || 0) + 1;
  // Menos evaluada primero; empates conservan el orden del banco (determinista).
  let best = notAsked[0];
  let bestC = counts[best.skill] || 0;
  for (const q of notAsked) {
    const c = counts[q.skill] || 0;
    if (c < bestC) { best = q; bestC = c; }
  }
  return best;
}

/**
 * Elige la siguiente pregunta segun el nivel actual, sin repetir.
 * Si no queda ninguna en el nivel exacto, busca en el nivel mas cercano.
 * @returns {object|null} la pregunta, o null si el examen termino.
 */
export function nextQuestion(session) {
  if (session.finished || session.answers.length >= session.maxQuestions) {
    session.finished = true;
    return null;
  }
  let candidate = pickAtLevel(session, EXAM_LEVELS[session.levelIndex]);
  for (let d = 1; !candidate && d < EXAM_LEVELS.length; d++) {
    const up = EXAM_LEVELS[session.levelIndex + d];
    const down = EXAM_LEVELS[session.levelIndex - d];
    candidate =
      (up && pickAtLevel(session, up)) ||
      (down && pickAtLevel(session, down));
  }
  if (!candidate) { session.finished = true; return null; }
  session.askedIds.push(candidate.id);
  return candidate;
}

/**
 * Registra la respuesta a una pregunta y ajusta la dificultad.
 * @returns {boolean} si fue correcta
 */
export function answer(session, question, choice) {
  const correct = choice === question.answer;
  session.answers.push({ question, choice, correct });
  session.levelIndex = clamp(
    session.levelIndex + (correct ? 1 : -1), 0, EXAM_LEVELS.length - 1);
  return correct;
}

/** Progreso 0..1 para la barra de la UI. */
export function progress(session) {
  return session.answers.length / session.maxQuestions;
}

/**
 * Calcula el resultado final del examen.
 * @returns {{cefr, correct, total, byLevel, bySkill, cefrRank}}
 */
export function result(session) {
  const total = session.answers.length;
  const correctAnswers = session.answers.filter((a) => a.correct);
  const correct = correctAnswers.length;

  // Nivel final = promedio de la dificultad de lo que acerto (o A1 si nada).
  let cefr = "A1";
  if (correct > 0) {
    const mean =
      correctAnswers.reduce((s, a) => s + EXAM_LEVELS.indexOf(a.question.level), 0) / correct;
    cefr = EXAM_LEVELS[clamp(Math.round(mean), 0, EXAM_LEVELS.length - 1)];
  }

  const byLevel = {};
  const bySkill = {};
  for (const a of session.answers) {
    const lvl = a.question.level;
    byLevel[lvl] = byLevel[lvl] || { correct: 0, total: 0 };
    byLevel[lvl].total += 1;
    if (a.correct) byLevel[lvl].correct += 1;

    const sk = a.question.skill;
    bySkill[sk] = bySkill[sk] || { correct: 0, total: 0 };
    bySkill[sk].total += 1;
    if (a.correct) bySkill[sk].correct += 1;
  }

  return { cefr, correct, total, byLevel, bySkill, cefrRank: CEFR_ORDER.indexOf(cefr) };
}
