/**
 * core/gamification.js — Logica pura de progreso, XP y logros.
 *
 * Sin I/O, sin DOM => testeable. Calcula el dominio por competencia, la
 * experiencia (XP), el nivel de jugador y los logros desbloqueados, a partir
 * de datos ya cargados (unidades del catalogo + progreso del usuario).
 */
import { SKILL_META } from "../data/skill-meta.js";

const XP_PER_LESSON = 20;
const XP_PER_VOCAB = 5;

/** Repasos correctos para considerar "dominado" un item de un mazo Bonus. */
export const MASTER_REPS = 2;

/**
 * Estado de las medallas de los mazos Bonus (logica pura, sin I/O ni DOM).
 * Una medalla se gana al dominar el mazo: todos sus items con reps >= MASTER_REPS.
 * @param {Array} decks - catalogo de mazos ({ id, items:[{id}], medalTitle, ... })
 * @param {Object} cardMap - mapa id -> { reps } del progreso SRS del usuario
 * @returns {Array} [{ deck, done, total, mastered, pct }] en el orden de `decks`
 */
export function bonusMedals(decks, cardMap) {
  return decks.map((deck) => {
    const total = deck.items.length;
    const done = deck.items.filter((it) => (cardMap[it.id]?.reps || 0) >= MASTER_REPS).length;
    const mastered = total > 0 && done === total;
    return { deck, done, total, mastered, pct: total ? Math.round((done / total) * 100) : 0 };
  });
}

/**
 * Dominio por competencia. Recorre todas las lecciones de todas las unidades,
 * cuenta cuantas entrenan cada skill y cuantas de esas estan completadas.
 * @param {Array} units - catalogo de unidades
 * @param {Set<string>} completed - ids de lecciones completadas
 * @returns {Array} [{ key, total, done, pct, locked }] en el orden de SKILL_META
 */
export function skillProgress(units, completed) {
  const tally = {};
  for (const key of Object.keys(SKILL_META)) tally[key] = { total: 0, done: 0 };

  for (const unit of units) {
    for (const lesson of unit.lessons) {
      for (const skill of lesson.skills || []) {
        if (!tally[skill]) tally[skill] = { total: 0, done: 0 };
        tally[skill].total += 1;
        if (completed.has(lesson.id)) tally[skill].done += 1;
      }
    }
  }

  return Object.keys(SKILL_META).map((key) => {
    const t = tally[key];
    const locked = t.total === 0; // sin contenido aun para esa competencia
    const pct = locked ? 0 : Math.round((t.done / t.total) * 100);
    return { key, total: t.total, done: t.done, pct, locked };
  });
}

/** Experiencia total. */
export function totalXp(lessonsDone, vocabLearned) {
  return lessonsDone * XP_PER_LESSON + vocabLearned * XP_PER_VOCAB;
}

/** Nivel de jugador (gamificacion) a partir del XP. 100 XP por nivel. */
export function playerLevel(xp) {
  return 1 + Math.floor(xp / 100);
}

/** XP que falta para el siguiente nivel (para la barra). */
export function xpToNext(xp) {
  const into = xp % 100;
  return { into, needed: 100, pct: into };
}

/**
 * Logros desbloqueados segun el estado del estudiante.
 * @param {object} s - { placementDone, lessonsDone, vocabLearned, unitsCompleted }
 * @returns {Array} [{ id, title, desc, unlocked }]
 */
export function achievements(s) {
  return [
    { id: "first_step", title: "Primer paso", desc: "Completaste el examen de ubicacion",
      unlocked: !!s.placementDone },
    { id: "first_lesson", title: "A estudiar", desc: "Completaste tu primera leccion",
      unlocked: s.lessonsDone >= 1 },
    { id: "vocab_10", title: "Coleccionista", desc: "Aprendiste 10 palabras",
      unlocked: s.vocabLearned >= 10 },
    { id: "dedicated", title: "Dedicado", desc: "Completaste 5 lecciones",
      unlocked: s.lessonsDone >= 5 },
    { id: "unit_master", title: "Maestro de unidad", desc: "Completaste una unidad entera",
      unlocked: s.unitsCompleted >= 1 },
    { id: "streak_7", title: "Constante", desc: "7 dias seguidos de estudio",
      unlocked: (s.streak || 0) >= 7 },
    { id: "on_fire", title: "Imparable", desc: "Completaste 15 lecciones",
      unlocked: s.lessonsDone >= 15 },
  ];
}
