/**
 * core/checkpoint.js — Logica PURA del Repaso Acumulativo (checkpoint).
 *
 * Sin DOM ni red => testeable. Arma un repaso que MEZCLA vocabulario y gramatica
 * de VARIAS unidades (la actual + las anteriores del mismo nivel/idioma).
 *
 * Base cientifica: la INTERCALACION (interleaving, Rohrer & Bjork) vence al
 * repaso en bloque. Por eso el core intercala items de DISTINTAS unidades y de
 * distintos TIPOS de forma DETERMINISTA (round-robin), en vez de repasar una
 * unidad completa y luego la siguiente. La UI solo baraja el orden de opciones.
 */
import { normalize } from "./activities.js";

/** Proporcion 0..1 -> porcentaje 0..100. */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}

/** Primeros N distractores distintos del pool que no sean la respuesta. */
function pickDistractors(pool, answer, n) {
  const seen = new Set([normalize(answer)]);
  const out = [];
  for (const t of pool) {
    const k = normalize(t);
    if (!k || seen.has(k)) continue;
    seen.add(k); out.push(t);
    if (out.length >= n) break;
  }
  return out;
}

/** Actividades de gramatica auto-corregibles de una unidad (cloze / opcion). */
function grammarItemsOf(unit) {
  const lesson = (unit?.lessons || []).find((l) => (l.skills || []).includes("grammar"));
  const acts = (lesson?.activities || []).filter(
    (a) => a && (a.type === "cloze" || a.type === "multiple_choice") && a.payload);
  return acts;
}

/**
 * Cola de items de UNA unidad, alternando vocabulario y gramatica (mezcla de
 * tipos dentro de la unidad). Determinista.
 * @param {object} unit
 * @param {string[]} translationPool - traducciones de TODAS las unidades (distractores)
 * @param {object} opts - { perUnit } cuantos items como maximo por unidad
 */
function unitQueue(unit, translationPool, opts = {}) {
  const perUnit = opts.perUnit || 4;
  const vocab = (unit.vocab || []).filter((v) => v.term && v.translation);

  const vocabItems = [];
  for (const v of vocab) {
    const dTr = pickDistractors(translationPool, v.translation, 2);
    if (dTr.length < 2) continue;
    vocabItems.push({
      kind: "choose", unitId: unit.id, unitTitle: unit.title || "", refId: v.id, say: v.term,
      q: 'En "' + (unit.title || "") + '": \u00bfqu\u00e9 significa "' + v.term + '"?',
      options: [{ text: v.translation, correct: true }, ...dTr.map((d) => ({ text: d, correct: false }))],
    });
  }

  const grammarItems = grammarItemsOf(unit).map((a) => ({
    kind: "grammar", unitId: unit.id, unitTitle: unit.title || "", activity: a,
  }));

  // Alterna vocab/gramatica hasta llenar la cuota de la unidad.
  const queue = [];
  let vi = 0, gi = 0;
  while (queue.length < perUnit && (vi < vocabItems.length || gi < grammarItems.length)) {
    if (vi < vocabItems.length) queue.push(vocabItems[vi++]);
    if (queue.length >= perUnit) break;
    if (gi < grammarItems.length) queue.push(grammarItems[gi++]);
  }
  return queue;
}

/**
 * Arma el checkpoint acumulativo mezclando varias unidades.
 * @param {Array} units - unidades a repasar (actual + anteriores), en orden
 * @param {object} [opts] - { max=12, perUnit=4 }
 * @returns {Array} items intercalados (round-robin entre unidades)
 */
export function buildCheckpoint(units, opts = {}) {
  const max = opts.max || 12;
  const list = (units || []).filter((u) => u && (u.vocab || u.lessons));
  if (!list.length) return [];

  const translationPool = list.flatMap((u) => (u.vocab || []).map((v) => v.translation)).filter(Boolean);
  const queues = list.map((u) => unitQueue(u, translationPool, opts));

  // ROUND-ROBIN entre unidades: 1 item de la unidad A, 1 de la B, 1 de la C...
  // -> las unidades quedan INTERCALADAS (no en bloque). Determinista.
  const ordered = [];
  let added = true;
  while (added && ordered.length < max) {
    added = false;
    for (const q of queues) {
      if (q.length) {
        ordered.push(q.shift());
        added = true;
        if (ordered.length >= max) break;
      }
    }
  }
  return ordered;
}

/** Cuenta cuantas unidades distintas aporta el checkpoint (para el resumen). */
export function unitsCovered(items) {
  return new Set((items || []).map((i) => i.unitId)).size;
}
