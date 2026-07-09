/**
 * core/streak.js — Logica pura de rachas diarias (habito).
 *
 * Sin I/O ni DOM => testeable. Calcula la nueva racha comparando la ultima fecha
 * de actividad con hoy. Es el motor del habito (lo que hace que el estudiante
 * vuelva cada dia).
 */
import { isoDay } from "./srs.js";

/** Resta dias a un dia ISO y devuelve el dia ISO. */
function minusDays(isoDate, days) {
  const d = new Date(isoDate + "T00:00:00");
  d.setDate(d.getDate() - days);
  return isoDay(d);
}

/**
 * Calcula la racha tras una actividad de hoy.
 * @param {string|null} lastActive - ultimo dia activo (ISO 'YYYY-MM-DD') o null
 * @param {number} currentStreak - racha actual
 * @param {Date} [today]
 * @returns {{ streak, changed, today }}
 *   changed = true si hoy cuenta como dia nuevo (para animar/celebrar).
 */
export function computeStreak(lastActive, currentStreak, today = new Date()) {
  const t = isoDay(today);
  if (lastActive === t) return { streak: currentStreak || 0, changed: false, today: t };
  const yesterday = minusDays(t, 1);
  const streak = lastActive === yesterday ? (currentStreak || 0) + 1 : 1;
  return { streak, changed: true, today: t };
}

/** True si la racha sigue viva hoy (activo hoy o ayer). */
export function streakAlive(lastActive, today = new Date()) {
  const t = isoDay(today);
  return lastActive === t || lastActive === minusDays(t, 1);
}

/** True si ya estudio hoy (meta diaria cumplida). */
export function didToday(lastActive, today = new Date()) {
  return lastActive === isoDay(today);
}
