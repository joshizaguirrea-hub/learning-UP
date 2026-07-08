/**
 * core/pricing.js — Techo de cobro escalonado (ADR-005).
 *
 * Logica PURA: recibe datos, devuelve numeros. Sin I/O, sin DOM => testeable.
 * Regla: el techo sube con el nivel maximo que el profesor puede ensenar y con
 * su rating. Protege al alumno de abusos y a la vez retiene a los buenos profes.
 */

/** Techo base por hora (USD) segun el nivel maximo del profesor. */
const BASE_CAP_BY_LEVEL = {
  A1: 8,
  A2: 8,
  B1: 14,
  B2: 14,
  C1: 22,
  C2: 22,
  Native: 30,
};

/** Rating a partir del cual se desbloquea el techo alto. */
const HIGH_RATING_THRESHOLD = 4.7;

/** Factor de bonificacion aplicado al techo cuando el rating es alto. */
const HIGH_RATING_MULTIPLIER = 1.3;

/**
 * Calcula el techo de tarifa por hora para un profesor.
 * @param {string} maxLevel - nivel maximo que puede ensenar (ej. "B2").
 * @param {number} rating   - rating promedio (0 a 5).
 * @returns {number} techo en USD/hora, redondeado a entero.
 */
export function priceCap(maxLevel, rating = 0) {
  const base = BASE_CAP_BY_LEVEL[maxLevel];
  if (base === undefined) return 0; // nivel desconocido => sin permiso de cobro
  const cap = rating >= HIGH_RATING_THRESHOLD ? base * HIGH_RATING_MULTIPLIER : base;
  return Math.round(cap);
}

/**
 * Valida si una tarifa propuesta esta permitida.
 * @returns {{ok: boolean, cap: number, reason?: string}}
 */
export function validateRate(rate, maxLevel, rating = 0) {
  const cap = priceCap(maxLevel, rating);
  if (cap === 0) {
    return { ok: false, cap, reason: "El profesor aun no tiene nivel asignado." };
  }
  if (rate > cap) {
    return { ok: false, cap, reason: `La tarifa supera el techo permitido ($${cap}/h).` };
  }
  if (rate <= 0) {
    return { ok: false, cap, reason: "La tarifa debe ser mayor a cero." };
  }
  return { ok: true, cap };
}
