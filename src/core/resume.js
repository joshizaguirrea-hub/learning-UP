/**
 * core/resume.js — Persistencia PURA del avance de ejercicios (autosave/continuar).
 *
 * Sin DOM: solo toca localStorage (via globalThis, con guardas) -> testeable en
 * Node con un shim. Resuelve el problema del celular: un desliz accidental cierra
 * el ejercicio y se pierde el avance; aqui lo guardamos y al reabrir se retoma.
 *
 * La tarjeta visual "¿Continuar?" vive en ui/resume.js (esa si toca el DOM).
 */
const PREFIX = "linguapath.resume.";
const MAX_AGE_MS = 2 * 24 * 60 * 60 * 1000; // 2 dias: pasado eso, no molesta con avances viejos.

/** Acceso seguro a localStorage (null en entornos sin el, ej. Node). */
function store() {
  try { return globalThis.localStorage || null; } catch (e) { return null; }
}

/** Clave estable a partir de partes (usuario, unidad, ejercicio...). */
export function makeResumeKey(...parts) {
  return parts.map((p) => String(p ?? "anon").replace(/[^\w-]+/g, "_")).join(".");
}

/** Guarda el estado del ejercicio (best-effort: si falla, no rompe nada). */
export function saveProgress(key, state) {
  const s = store();
  if (!key || !s) return;
  try {
    s.setItem(PREFIX + key, JSON.stringify({ ts: Date.now(), state }));
  } catch (e) { /* localStorage lleno o bloqueado: no es critico */ }
}

/** Devuelve el estado guardado si existe y no expiro; si no, null. */
export function loadProgress(key) {
  const s = store();
  if (!key || !s) return null;
  try {
    const raw = s.getItem(PREFIX + key);
    if (!raw) return null;
    const { ts, state } = JSON.parse(raw);
    if (!ts || Date.now() - ts > MAX_AGE_MS) { clearProgress(key); return null; }
    return state || null;
  } catch (e) { return null; }
}

/** Borra el progreso guardado (al terminar el ejercicio o al reiniciarlo). */
export function clearProgress(key) {
  const s = store();
  if (!key || !s) return;
  try { s.removeItem(PREFIX + key); } catch (e) { /* nada */ }
}
