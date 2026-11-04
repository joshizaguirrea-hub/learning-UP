/**
 * core/passport.js — Que unidades ya tienen "sello" (examen final aprobado).
 *
 * Logica PURA (sin DOM ni I/O). Un sello se gana al APROBAR EL EXAMEN de la
 * unidad -- el mismo evento que ya dispara la celebracion grande en
 * lesson-player.js (completeLesson() solo se llama ahi cuando `passed` es
 * true). No hace falta ademas haber dominado los mazos requeridos de B1 para
 * esto: el sello celebra "venciste el examen de este tema", un logro propio y
 * honesto, no un duplicado de isUnitComplete()/unlockedUnitIds().
 */

/**
 * @param {Array} units - unidades (de uno o varios niveles, en orden)
 * @param {Object} progressMap - id de leccion -> { status, completedAt }
 * @returns {Array<{unit, earned: boolean, stampedAt: string|null}>}
 */
export function buildPassport(units, progressMap = {}) {
  return (units || []).map((unit) => {
    const test = (unit.lessons || []).find((l) => l.kind === "test");
    const entry = test ? progressMap[test.id] : null;
    const earned = !!entry && entry.status === "done";
    return { unit, earned, stampedAt: earned ? (entry.completedAt || null) : null };
  });
}

/** Cuantos sellos ya se ganaron (de la lista de unidades dada). */
export function stampCount(units, progressMap = {}) {
  return buildPassport(units, progressMap).filter((p) => p.earned).length;
}
