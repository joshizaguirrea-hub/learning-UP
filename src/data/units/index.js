/**
 * data/units/index.js — Catalogo de unidades del curso.
 *
 * Datos puros. Registra todas las unidades disponibles. Agregar una unidad
 * nueva = crear su archivo y sumarla a esta lista (la logica no cambia).
 */
import { WORK_CAREER_B1 } from "./work-career-b1.js";
import { TRAVEL_PLANS_B1 } from "./travel-plans-b1.js";
import { A1_HELLO } from "./a1-hello.js";
import { A1_FAMILY } from "./a1-family.js";
import { A1_ROUTINE } from "./a1-routine.js";
import { A1_FOOD } from "./a1-food.js";
import { A1_HOME } from "./a1-home.js";
import { A1_SHOPPING } from "./a1-shopping.js";
import { A1_FREETIME } from "./a1-freetime.js";
import { A1_YESTERDAY } from "./a1-yesterday.js";
import { A2_LAST_WEEKEND } from "./a2-last-weekend.js";
import { A2_TRAVEL_STORIES } from "./a2-travel-stories.js";
import { A2_IN_THE_CITY } from "./a2-in-the-city.js";
import { A2_HEALTH } from "./a2-health.js";
import { A2_MAKING_PLANS } from "./a2-making-plans.js";
import { A2_COMPARISONS } from "./a2-comparisons.js";
import { A2_WORK_JOBS } from "./a2-work-jobs.js";
import { A2_FREE_TIME_SPORT } from "./a2-free-time-sport.js";

// Orden del catalogo: por nivel (A1 -> A2 -> ... -> B1) y dentro del nivel, por tema.
export const UNITS = [
  // --- A1 ---
  A1_HELLO, A1_FAMILY, A1_ROUTINE, A1_FOOD, A1_HOME, A1_SHOPPING, A1_FREETIME, A1_YESTERDAY,
  // --- A2 ---
  A2_LAST_WEEKEND, A2_TRAVEL_STORIES, A2_IN_THE_CITY, A2_HEALTH,
  A2_MAKING_PLANS, A2_COMPARISONS, A2_WORK_JOBS, A2_FREE_TIME_SPORT,
  // --- B1 ---
  WORK_CAREER_B1, TRAVEL_PLANS_B1,
];

/** Unidades disponibles para un nivel MCER dado. */
export function unitsForLevel(level) {
  return UNITS.filter((u) => u.level === level);
}

/** Busca una unidad por su id. */
export function unitById(id) {
  return UNITS.find((u) => u.id === id) || null;
}

/** Busca una leccion (y su unidad) por el id de la leccion. */
export function findLesson(lessonId) {
  for (const unit of UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return null;
}

/** Busca un item de vocabulario por su id (en cualquier unidad). */
export function vocabById(vocabId) {
  for (const unit of UNITS) {
    const item = unit.vocab.find((v) => v.id === vocabId);
    if (item) return item;
  }
  return null;
}
