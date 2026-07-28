/**
 * ui/study-plan-store.js — Persistencia LOCAL del plan de trabajo (localStorage).
 *
 * Por que local: las preferencias del cuestionario (meta, minutos/dia, autonivel)
 * y el plan generado se guardan en el dispositivo, sin tocar el esquema de la BD.
 * Es info de UX/guia, no critica; si se pierde, el estudiante la vuelve a elegir.
 * Scoped por userId para que convivan varias cuentas en el mismo equipo.
 */
const KEY = "learningup:study-plan:";

/** Guarda las preferencias + el plan del usuario. Best-effort. */
export function saveStudyPlan(userId, plan) {
  try {
    localStorage.setItem(KEY + (userId || "anon"), JSON.stringify({ ...plan, savedAt: Date.now() }));
    return true;
  } catch { return false; }
}

/** Carga el plan del usuario (o null si no hay / falla). */
export function loadStudyPlan(userId) {
  try {
    const raw = localStorage.getItem(KEY + (userId || "anon"));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/** Borra el plan (p.ej. si el usuario quiere rehacer el cuestionario). */
export function clearStudyPlan(userId) {
  try { localStorage.removeItem(KEY + (userId || "anon")); } catch { /* nada */ }
}
