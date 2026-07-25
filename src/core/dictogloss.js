/**
 * core/dictogloss.js — Logica PURA del Dictogloss (dictado de comprension).
 *
 * Sin DOM ni red => testeable. Dictogloss es el metodo estrella de LISTENING:
 * el alumno OYE una frase (voz real, texto oculto), ESCRIBE lo que entendio, y
 * el sistema compara palabra por palabra dando feedback (que acerto, que le
 * FALTO). Fuerza a parsear el sonido real -> comprension auditiva profunda.
 *
 * Fuente de frases: los `example` del vocabulario (cortos y limpios) y, de
 * respaldo, las frases del texto de lectura. Deterministico y offline.
 */
import { normalize } from "./activities.js";

/** Clave comparable de una palabra: sin acentos/mayus/puntuacion (conserva apostrofo). */
function wordKey(w) {
  return normalize(w).replace(/[^a-z0-9']/g, "");
}

/** Frases de una unidad aptas para dictado (largo razonable, con letras, sin repetir). */
export function dictationSentences(unit, opts = {}) {
  const max = opts.max || 8;
  const minW = opts.minWords || 3;
  const maxW = opts.maxWords || 14;
  const seen = new Set();
  const out = [];

  const push = (raw) => {
    const t = String(raw || "").trim().replace(/\s+/g, " ");
    if (!t || !/[a-z]/i.test(t)) return;
    const wc = t.split(/\s+/).length;
    if (wc < minW || wc > maxW) return;
    const key = normalize(t);
    if (seen.has(key)) return;
    seen.add(key);
    out.push(t);
  };

  // 1) Ejemplos del vocabulario: cortos, claros, con una palabra clave audible.
  for (const v of unit?.vocab || []) push(v.example);

  // 2) Respaldo: frases del texto de lectura (quita encabezados y marcas A:/B:).
  if (out.length < max) {
    const reading = (unit?.lessons || [])
      .map((l) => (l.content && l.content.reading) || l.passage || "")
      .find(Boolean) || "";
    const sentences = String(reading)
      .split(/\n+/)
      .filter((line) => !/^\s*TEXT\s*\d/i.test(line))
      .join(" ")
      .replace(/\b[A-Z]:\s*/g, " ")
      .split(/(?<=[.!?])\s+/);
    for (const s of sentences) {
      if (out.length >= max) break;
      push(s);
    }
  }

  return out.slice(0, max);
}

/**
 * Compara lo que el alumno ESCRIBIO contra la frase objetivo, palabra por
 * palabra (multiconjunto: respeta repeticiones). Ignora la puntuacion.
 * @returns {{score:number, marks:Array<{word,hit,punct?}>, missing:string[], extra:string[]}}
 */
export function gradeDictation(target, typed) {
  const targetWords = String(target).split(/\s+/).filter(Boolean);

  // Multiconjunto de palabras escritas (por su clave comparable).
  const typedCounts = new Map();
  for (const w of String(typed).split(/\s+/).filter(Boolean)) {
    const k = wordKey(w);
    if (!k) continue;
    typedCounts.set(k, (typedCounts.get(k) || 0) + 1);
  }

  const marks = [];
  const missing = [];
  for (const raw of targetWords) {
    const k = wordKey(raw);
    if (!k) { marks.push({ word: raw, hit: true, punct: true }); continue; }
    const avail = typedCounts.get(k) || 0;
    if (avail > 0) {
      typedCounts.set(k, avail - 1);
      marks.push({ word: raw, hit: true });
    } else {
      marks.push({ word: raw, hit: false });
      missing.push(raw);
    }
  }

  // Sobrantes: lo que escribio y no correspondia a ninguna palabra pendiente.
  const extra = [];
  for (const [w, c] of typedCounts) {
    for (let i = 0; i < c; i++) extra.push(w);
  }

  const scorable = marks.filter((m) => !m.punct);
  const hits = scorable.filter((m) => m.hit).length;
  const score = scorable.length ? hits / scorable.length : 0;
  return { score, marks, missing, extra };
}

/** Promedio 0..100 de una lista de proporciones 0..1. */
export function sessionScore(scores) {
  if (!scores.length) return 0;
  return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
}
