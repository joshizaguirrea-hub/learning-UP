/**
 * core/reading-lab.js — Logica PURA del Reading Lab (comprension lectora).
 *
 * Sin DOM ni red => testeable. El Reading Lab convierte "leer" en
 * "leer + ENTENDER + recibir feedback": parte el texto de la unidad en pasajes,
 * y arma preguntas de comprension REUSANDO las preguntas ya autoradas en cada
 * unidad (lesson.content.check) y, ademas, autogenera preguntas seguras de
 * "palabra en contexto" con el vocabulario que REALMENTE aparece en el texto.
 *
 * Principio SLA: recuperacion activa + feedback inmediato sobre el SIGNIFICADO
 * (no solo la pronunciacion, que ya cubre reading-aloud.js).
 */
import { normalize } from "./activities.js";

/** Quita "to " inicial y parentesis: "to apply (for)" -> "apply". */
function cleanTerm(term) {
  return String(term || "")
    .replace(/^to\s+/i, "")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .trim();
}

/**
 * Parte el texto de lectura en pasajes usando encabezados "TEXT 1 - Titulo".
 * Si no hay encabezados, devuelve un solo pasaje con todo el texto.
 * @returns {Array<{title:string, body:string}>}
 */
export function splitTexts(reading) {
  const text = String(reading || "").trim();
  if (!text) return [];
  const headerRe = /^\s*TEXT\s*\d+\s*[-\u2013\u2014:]\s*(.*)$/i;
  const parts = [];
  let cur = null;
  for (const line of text.split(/\n/)) {
    const m = line.match(headerRe);
    if (m) {
      if (cur) parts.push(cur);
      cur = { title: m[1].trim(), body: "" };
    } else {
      if (!cur) cur = { title: "", body: "" };
      cur.body += (cur.body ? "\n" : "") + line;
    }
  }
  if (cur) parts.push(cur);
  return parts
    .map((p) => ({ title: p.title, body: p.body.trim() }))
    .filter((p) => p.body);
}

/** Vocab de la unidad cuyo termino APARECE en el texto (para "palabra en contexto"). */
export function vocabInText(unit, text) {
  const hay = normalize(text || "");
  const out = [];
  for (const v of unit?.vocab || []) {
    const clean = cleanTerm(v.term);
    if (!clean) continue;
    if (hay.includes(normalize(clean))) {
      out.push({ term: v.term, clean, translation: v.translation });
    }
  }
  return out;
}

/** N distractores unicos de `pool`, distintos de `answer` (deterministico). */
function pickDistractors(pool, answer, n) {
  const seen = new Set([normalize(answer)]);
  const out = [];
  for (const t of pool) {
    const key = normalize(t);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
    if (out.length >= n) break;
  }
  return out;
}

/**
 * Arma la lista de preguntas de comprension para una leccion de reading.
 * Prioriza las preguntas autoradas (content.check) y luego agrega
 * "palabra en contexto" del vocab que aparece en el texto.
 * @returns {Array<{kind, q, options:[{text,correct}], explain}>}
 */
export function buildQuestions(lesson, unit, opts = {}) {
  const max = opts.max || 8;
  const out = [];

  // 1) Preguntas de comprension YA autoradas (opcion multiple).
  for (const c of lesson?.content?.check || []) {
    if (!Array.isArray(c.choices) || typeof c.answer !== "number") continue;
    out.push({
      kind: "comprehension",
      q: c.prompt,
      options: c.choices.map((t, i) => ({ text: t, correct: i === c.answer })),
      explain: c.explain || "",
    });
  }

  // 2) "Palabra en contexto" (autogenerada, segura) del vocab presente en el texto.
  const text = lesson?.content?.reading || "";
  const allTranslations = (unit?.vocab || []).map((v) => v.translation).filter(Boolean);
  for (const v of vocabInText(unit, text)) {
    if (!v.translation) continue;
    const distractors = pickDistractors(allTranslations, v.translation, 2);
    if (distractors.length < 2) continue;
    out.push({
      kind: "vocab",
      q: 'En el texto, \u00bfqu\u00e9 significa "' + v.clean + '"?',
      options: [
        { text: v.translation, correct: true },
        ...distractors.map((d) => ({ text: d, correct: false })),
      ],
      explain: '"' + v.clean + '" = ' + v.translation + ".",
    });
  }

  return out.slice(0, max);
}

/** Porcentaje 0..100 de aciertos. */
export function scorePct(correct, total) {
  if (!total) return 0;
  return Math.round((correct / total) * 100);
}
