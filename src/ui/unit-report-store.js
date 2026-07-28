/**
 * ui/unit-report-store.js — Persistencia LOCAL del boletin de cada unidad.
 *
 * Guardamos la CALIFICACION + resumen de cada unidad terminada (por usuario y
 * unidad) para poder mostrar el historial y "vamos guardando el feedback". Es
 * info de UX/seguimiento (no critica); si se pierde, se recalcula al reabrir la
 * unidad. localStorage -> sin tocar el esquema de la BD. Scoped por userId.
 */
const KEY = "learningup:unit-report:";

const keyFor = (userId) => KEY + (userId || "anon");

/** Devuelve el mapa { unitId: {score, passed, weakSkills, savedAt} } del usuario. */
export function loadUnitReports(userId) {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/** Guarda/actualiza el boletin de una unidad. Best-effort. Devuelve el mapa. */
export function saveUnitReport(userId, report) {
  const all = loadUnitReports(userId);
  try {
    all[report.unitId] = {
      unitId: report.unitId,
      title: report.title,
      level: report.level,
      score: report.score,
      passed: report.passed,
      weakSkills: report.weakSkills || [],
      savedAt: Date.now(),
    };
    localStorage.setItem(keyFor(userId), JSON.stringify(all));
  } catch { /* nada */ }
  return all;
}

/** Boletin guardado de una unidad concreta (o null). */
export function loadUnitReport(userId, unitId) {
  return loadUnitReports(userId)[unitId] || null;
}
