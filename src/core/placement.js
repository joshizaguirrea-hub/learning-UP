/**
 * core/placement.js — Motor del examen de ubicacion adaptativo.
 *
 * Logica PURA (sin I/O, sin DOM) => testeable con Node.
 *
 * Como funciona (CAT-lite, adaptativo y determinista):
 *   - Empieza en A2 (nivel intermedio-bajo) para no aburrir ni asustar.
 *   - Si aciertas, la siguiente pregunta sube de nivel; si fallas, baja.
 *   - Tras N preguntas, el nivel final = promedio (redondeado) de la dificultad
 *     de las preguntas que acertaste. Si no acierta ninguna => A1.
 *
 * El motor NO conoce Supabase ni la UI: recibe el banco y devuelve estado.
 */
import { CEFR_ORDER } from "../data/cefr.js";

/** Niveles evaluables por el examen (subconjunto ordenado del MCER). */
const EXAM_LEVELS = ["A1", "A2", "B1", "B2"];
const START_INDEX = 1; // A2
const DEFAULT_MAX_QUESTIONS = 8;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/**
 * Crea una sesion de examen.
 * @param {Array} bank - banco de preguntas (data/placement-questions.js).
 * @param {object} [opts] - { maxQuestions }
 */
export function createSession(bank, opts = {}) {
  return {
    bank,
    maxQuestions: opts.maxQuestions ?? DEFAULT_MAX_QUESTIONS,
    levelIndex: START_INDEX,
    askedIds: [],
    answers: [], // { question, choice, correct }
    finished: false,
  };
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
  const target = EXAM_LEVELS[session.levelIndex];
  const notAsked = (q) => !session.askedIds.includes(q.id);

  // 1) intenta el nivel objetivo, 2) niveles cada vez mas lejanos.
  let candidate = session.bank.find((q) => q.level === target && notAsked(q));
  for (let d = 1; !candidate && d < EXAM_LEVELS.length; d++) {
    const up = EXAM_LEVELS[session.levelIndex + d];
    const down = EXAM_LEVELS[session.levelIndex - d];
    candidate =
      session.bank.find((q) => q.level === up && notAsked(q)) ||
      session.bank.find((q) => q.level === down && notAsked(q));
  }
  if (!candidate) {
    session.finished = true;
    return null;
  }
  session.askedIds.push(candidate.id);
  return candidate;
}

/**
 * Registra la respuesta a una pregunta y ajusta la dificultad.
 * @param {object} session
 * @param {object} question - la pregunta respondida
 * @param {number} choice - indice de la opcion elegida
 * @returns {boolean} si fue correcta
 */
export function answer(session, question, choice) {
  const correct = choice === question.answer;
  session.answers.push({ question, choice, correct });
  // Adaptacion: acierto sube, fallo baja (con topes).
  session.levelIndex = clamp(
    session.levelIndex + (correct ? 1 : -1),
    0,
    EXAM_LEVELS.length - 1
  );
  return correct;
}

/** Progreso 0..1 para la barra de la UI. */
export function progress(session) {
  return session.answers.length / session.maxQuestions;
}

/**
 * Calcula el resultado final del examen.
 * @returns {{ cefr: string, correct: number, total: number, byLevel: object }}
 */
export function result(session) {
  const total = session.answers.length;
  const correctAnswers = session.answers.filter((a) => a.correct);
  const correct = correctAnswers.length;

  // Nivel final = promedio de la dificultad de lo que acerto (o A1 si nada).
  let cefr = "A1";
  if (correct > 0) {
    const mean =
      correctAnswers.reduce((sum, a) => sum + EXAM_LEVELS.indexOf(a.question.level), 0) /
      correct;
    cefr = EXAM_LEVELS[clamp(Math.round(mean), 0, EXAM_LEVELS.length - 1)];
  }

  // Desglose por competencia (util para el plan de estudio).
  const byLevel = {};
  for (const a of session.answers) {
    const lvl = a.question.level;
    byLevel[lvl] = byLevel[lvl] || { correct: 0, total: 0 };
    byLevel[lvl].total += 1;
    if (a.correct) byLevel[lvl].correct += 1;
  }

  return { cefr, correct, total, byLevel, cefrRank: CEFR_ORDER.indexOf(cefr) };
}
