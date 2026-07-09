/**
 * core/srs.js — Motor de repeticion espaciada (algoritmo tipo SM-2 simplificado).
 *
 * Logica PURA (sin I/O, sin DOM) => testeable. Decide CUANDO repasar cada item
 * segun que tan bien lo recuerdas. Es la pieza que hace que el conocimiento
 * PERDURE (ver docs/PEDAGOGIA.md, seccion 4).
 *
 * Calificaciones al repasar: "again" | "hard" | "good" | "easy".
 */

const MIN_EASE = 1.3;
const MAX_EASE = 2.8;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

/** Fecha (solo dia) en formato ISO 'YYYY-MM-DD'. */
export function isoDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

/** Suma dias a una fecha y devuelve el dia ISO. */
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return isoDay(d);
}

/** Crea una tarjeta nueva (aun no repasada), vencida hoy. */
export function newCard(today = new Date()) {
  return { ease: 2.5, interval: 0, reps: 0, due: isoDay(today) };
}

/**
 * Actualiza una tarjeta tras un repaso.
 * @param {object} card - { ease, interval, reps, due }
 * @param {string} grade - "again" | "hard" | "good" | "easy"
 * @param {Date} [today]
 * @returns {object} tarjeta actualizada
 */
export function review(card, grade, today = new Date()) {
  let { ease, interval, reps } = card;

  if (grade === "again") {
    reps = 0;
    interval = 0; // vuelve a estar disponible hoy
    ease = clamp(ease - 0.2, MIN_EASE, MAX_EASE);
    return { ease, interval, reps, due: isoDay(today) };
  }

  reps += 1;
  if (reps === 1) interval = grade === "easy" ? 2 : 1;
  else if (reps === 2) interval = grade === "easy" ? 8 : 6;
  else {
    const factor = grade === "hard" ? 1.2 : grade === "easy" ? ease * 1.3 : ease;
    interval = Math.max(1, Math.round(interval * factor));
  }

  if (grade === "hard") ease = clamp(ease - 0.15, MIN_EASE, MAX_EASE);
  else if (grade === "easy") ease = clamp(ease + 0.15, MIN_EASE, MAX_EASE);

  return { ease, interval, reps, due: addDays(today, interval) };
}

/** True si la tarjeta esta vencida (se debe repasar hoy o antes). */
export function isDue(card, today = new Date()) {
  return card.due <= isoDay(today);
}

/** Filtra las tarjetas vencidas de una lista. */
export function dueCards(cards, today = new Date()) {
  return cards.filter((c) => isDue(c, today));
}
