/**
 * data/units/index.js — Catalogo de unidades del curso.
 *
 * Datos puros. Registra todas las unidades disponibles. Agregar una unidad
 * nueva = crear su archivo y sumarla a esta lista (la logica no cambia).
 */
import { WORK_CAREER_B1 } from "./work-career-b1.js";
import { TRAVEL_PLANS_B1 } from "./travel-plans-b1.js";

export const UNITS = [WORK_CAREER_B1, TRAVEL_PLANS_B1];

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
