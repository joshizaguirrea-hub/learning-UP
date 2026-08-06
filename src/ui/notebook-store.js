/**
 * ui/notebook-store.js — Persistencia LOCAL del "Cuaderno de errores" por unidad.
 *
 * Cada vez que el alumno termina una clase/conversacion, la profe apunta sus
 * errores y el vocabulario que le falto. Aqui los GUARDAMOS por (usuario, unidad)
 * de forma ACUMULATIVA (historico) para repasar y practicar. localStorage -> sin
 * tocar el esquema de la BD; si se pierde, se vuelve a llenar practicando.
 */
import { mergeNotebook } from "../core/notebook.js";

const KEY = "learningup:notebook:";
const keyFor = (userId) => KEY + (userId || "anon");

/** Mapa { unitId: {unitId,title,level,lang,errors[],vocab[],lastScore,sessions,updatedAt} }. */
export function loadNotebooks(userId) {
  try {
    const raw = localStorage.getItem(keyFor(userId));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

/** Cuaderno guardado de una unidad concreta (o null). */
export function loadNotebook(userId, unitId) {
  return loadNotebooks(userId)[unitId] || null;
}

/**
 * Acumula el resultado fresco de una sesion en el cuaderno de la unidad.
 * @param {string} userId
 * @param {object} meta - { unitId, title, level, lang, skill }
 * @param {object} fresh - { errors[], vocabSuggested[], score } (de parseFeedback)
 * @returns {object|null} el cuaderno actualizado de esa unidad (o null si no hay unitId)
 */
export function addToNotebook(userId, meta, fresh) {
  if (!meta || !meta.unitId) return null;
  const all = loadNotebooks(userId);
  const prev = all[meta.unitId] || null;
  // Etiqueta TODOS los errores de esta sesion con la competencia (grammar,
  // speaking, writing...) para que caigan en su pestana del cuaderno.
  const merged = mergeNotebook(prev, { ...(fresh || {}), skill: meta.skill || "" });
  const entry = {
    unitId: meta.unitId,
    title: meta.title || (prev && prev.title) || "",
    level: meta.level || (prev && prev.level) || "",
    lang: meta.lang || (prev && prev.lang) || "en",
    errors: merged.errors,
    vocab: merged.vocab,
    lastScore: merged.lastScore,
    sessions: merged.sessions,
    updatedAt: Date.now(),
  };
  try {
    all[meta.unitId] = entry;
    localStorage.setItem(keyFor(userId), JSON.stringify(all));
  } catch { /* best-effort */ }
  return entry;
}

/** Borra el cuaderno de una unidad (por si el alumno quiere empezar de cero). */
export function clearNotebook(userId, unitId) {
  const all = loadNotebooks(userId);
  if (all[unitId]) {
    delete all[unitId];
    try { localStorage.setItem(keyFor(userId), JSON.stringify(all)); } catch { /* nada */ }
  }
  return all;
}
