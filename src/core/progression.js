/**
 * core/progression.js — Desbloqueo secuencial de unidades (estilo Duolingo/libro).
 *
 * Logica PURA (sin DOM ni I/O). Una unidad esta "completa" cuando TODAS sus
 * lecciones estan hechas Y (si la unidad lo exige, ver core/unit-requirements.js)
 * los mazos Bonus requeridos (verbos del tema, idioms, expresiones) ya estan
 * dominados. El curso avanza como un sendero: la primera unidad siempre esta
 * abierta, y cada siguiente se desbloquea al COMPLETAR la anterior.
 */
import { requiredBonusSatisfied } from "./unit-requirements.js";

/** Una unidad esta completa si tiene lecciones, todas estan hechas, y sus
 * mazos Bonus requeridos (si los tiene) ya estan dominados. */
export function isUnitComplete(unit, completed) {
  return unit.lessons.length > 0
    && unit.lessons.every((l) => completed.has(l.id))
    && requiredBonusSatisfied(unit, completed);
}

/**
 * Conjunto de ids de unidades DESBLOQUEADAS, en orden.
 * @param {Array} units - unidades del nivel (en orden)
 * @param {Set<string>} completed - ids de lecciones completadas
 * @returns {Set<string>} ids de unidades accesibles
 */
export function unlockedUnitIds(units, completed) {
  const unlocked = new Set();
  let prevComplete = true; // la primera unidad siempre esta abierta
  for (const u of units) {
    if (prevComplete) unlocked.add(u.id);
    prevComplete = isUnitComplete(u, completed);
  }
  return unlocked;
}

/** True si una unidad concreta esta desbloqueada dado el progreso. */
export function isUnitUnlocked(unitId, units, completed) {
  return unlockedUnitIds(units, completed).has(unitId);
}
