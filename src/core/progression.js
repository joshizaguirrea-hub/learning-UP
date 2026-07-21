/**
 * core/progression.js — Desbloqueo secuencial de unidades (estilo Duolingo/libro).
 *
 * Logica PURA (sin DOM ni I/O). Una unidad esta "completa" cuando TODAS sus
 * lecciones estan hechas. El curso avanza como un sendero: la primera unidad
 * siempre esta abierta, y cada siguiente se desbloquea al COMPLETAR la anterior.
 */

/** Una unidad esta completa si tiene lecciones y todas estan hechas. */
export function isUnitComplete(unit, completed) {
  return unit.lessons.length > 0 && unit.lessons.every((l) => completed.has(l.id));
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
