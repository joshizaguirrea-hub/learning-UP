/**
 * core/speaking-score.js — "Speaking Score": la metrica ESTRELLA de habla.
 *
 * Mide cuanto practica HABLANDO el alumno (pronunciacion, roleplay, entrevistas)
 * y le da UN numero que sube -> medible, adictivo y compartible. Persistencia
 * simple en localStorage por usuario (no necesita backend para arrancar).
 *
 * Guardamos: mejor puntaje, promedio, total de sesiones y ultima practica.
 */

const KEY = (userId) => `linguapath.speaking.${userId || "anon"}`;

/** Lee el estado del Speaking Score de un usuario. Nunca lanza. */
export function getSpeakingScore(userId) {
  const base = { best: 0, avg: 0, sessions: 0, last: 0, lastAt: null };
  try {
    const raw = localStorage.getItem(KEY(userId));
    if (!raw) return base;
    return { ...base, ...JSON.parse(raw) };
  } catch {
    return base;
  }
}

/**
 * Registra una nueva sesion de habla y devuelve el estado actualizado.
 * @param {string} userId
 * @param {number} score - puntaje 0..100 de la sesion
 */
export function recordSpeakingScore(userId, score) {
  const s = Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
  const cur = getSpeakingScore(userId);
  const sessions = cur.sessions + 1;
  // Promedio incremental (sin guardar todo el historial).
  const avg = Math.round((cur.avg * cur.sessions + s) / sessions);
  const next = {
    best: Math.max(cur.best, s),
    avg,
    sessions,
    last: s,
    lastAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEY(userId), JSON.stringify(next));
  } catch {
    /* si no hay storage, igual devolvemos el calculo */
  }
  return next;
}

/** Etiqueta motivadora segun el puntaje (en espanol). */
export function scoreLabel(score) {
  const s = Number(score) || 0;
  if (s >= 90) return { label: "Excelente", tone: "emerald" };
  if (s >= 75) return { label: "Muy bien", tone: "teal" };
  if (s >= 60) return { label: "Aprobado", tone: "indigo" };
  if (s >= 40) return { label: "Vas mejorando", tone: "amber" };
  return { label: "Sigue practicando", tone: "rose" };
}
