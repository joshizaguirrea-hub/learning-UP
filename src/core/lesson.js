/**
 * core/lesson.js — Logica pura para lecciones y calificacion de practicas.
 *
 * Sin I/O, sin DOM => testeable. Provee la leccion de un modulo (con un
 * fallback elegante para competencias sin contenido aun) y califica la practica.
 */
import { LESSONS } from "../data/lessons.js";

const SKILL_LABEL = {
  grammar: "Gramatica",
  vocabulary: "Vocabulario",
  reading: "Lectura",
  listening: "Comprension auditiva",
  writing: "Escritura",
  speaking: "Conversacion",
};

/** Umbral de aciertos (proporcion) para aprobar una practica. */
export const PASS_RATIO = 0.6;

/**
 * Devuelve la leccion para un nivel + competencia.
 * Si no hay contenido, devuelve un fallback con `available: false`
 * (competencias como listening/speaking necesitan audio/IA: proximamente).
 */
export function getLesson(level, skill) {
  const lesson = LESSONS[`${level}:${skill}`];
  if (lesson) return { ...lesson, level, skill, available: true };

  const label = SKILL_LABEL[skill] || skill;
  const needsMedia = skill === "listening" || skill === "speaking";
  return {
    title: `${label} - ${level}`,
    level,
    skill,
    available: false,
    intro: needsMedia
      ? `El contenido de ${label} requiere audio o IA y estara disponible pronto.`
      : `El contenido de ${label} para ${level} estara disponible pronto.`,
    examples: [],
    practice: [],
  };
}

/**
 * Califica las respuestas de una practica.
 * @param {object} lesson - leccion (con practice[])
 * @param {number[]} answers - indice elegido por pregunta
 * @returns {{correct, total, ratio, passed}}
 */
export function scorePractice(lesson, answers) {
  const total = lesson.practice.length;
  if (total === 0) return { correct: 0, total: 0, ratio: 0, passed: false };
  let correct = 0;
  lesson.practice.forEach((q, i) => {
    if (answers[i] === q.answer) correct++;
  });
  const ratio = correct / total;
  return { correct, total, ratio, passed: ratio >= PASS_RATIO };
}
