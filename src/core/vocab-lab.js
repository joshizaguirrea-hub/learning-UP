/**
 * core/vocab-lab.js — Logica PURA del Vocab Lab (Vocabulary 2.0).
 *
 * Sin DOM ni red => testeable. Convierte el "repaso de vocabulario" (que hoy es
 * SOLO reconocer la traduccion) en una ESCALERA DE RECUPERACION graduada, la
 * forma cientifica de fijar palabras (depth of processing + generation effect):
 *
 *   1) reconocer   -> ves la palabra, eliges su significado (facil)
 *   2) pista       -> te dan la traduccion + inicial, escribes la palabra
 *   3) colocacion  -> completas la palabra dentro de su FRASE (chunk / Lexical Approach)
 *   4) produccion  -> solo la traduccion, escribes la palabra (sin pista)
 *   5) trampa auditiva -> OYES la palabra y eliges cual fue (pares confundibles)
 *
 * Se corre por RONDAS (todas las palabras en nivel 1, luego nivel 2...) para que
 * la dificultad escale pero las palabras se INTERCALEN (desirable difficulty).
 */
import { normalize } from "./activities.js";

/** Forma limpia de un termino: sin "to " inicial ni parentesis. */
export function cleanTerm(term) {
  return String(term || "")
    .replace(/^to\s+/i, "")
    .replace(/\s*\(.*?\)\s*/g, " ")
    .trim();
}

/** Palabra principal de un termino ("boarding pass" -> "boarding"). */
function mainWord(term) {
  return cleanTerm(term).split(/\s+/)[0] || cleanTerm(term);
}

/** Formas aceptables (normalizadas) al escribir un termino: con y sin "to". */
export function acceptsFor(term) {
  const clean = cleanTerm(term);
  const set = new Set([normalize(clean), normalize(term), normalize("to " + clean)]);
  return [...set].filter(Boolean);
}

/** Distancia de edicion (Levenshtein) entre dos cadenas. Pura. */
export function editDistance(a, b) {
  a = String(a); b = String(b);
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
}

/** Pista: primera letra + guiones por cada letra restante ("deadline" -> "d _______"). */
export function firstHint(word) {
  const clean = cleanTerm(word);
  return clean.split(/\s+/).map((w) => {
    if (!w) return "";
    return w[0] + " " + "_ ".repeat(Math.max(0, w.length - 1)).trim();
  }).join("   ");
}

/** Reemplaza (1a vez) la palabra clave del termino en el ejemplo por un hueco. */
export function clozeExample(example, term) {
  const ex = String(example || "");
  const w = mainWord(term);
  if (!ex || !w) return null;
  const re = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
  const m = ex.match(re);
  if (!m) return null;
  return { sentence: ex.replace(re, "_____"), answer: m[0] };
}

/** Termino mas confundible (ortografia parecida) para la trampa auditiva. */
export function confusable(term, pool) {
  const base = normalize(cleanTerm(term));
  let best = null, bestD = Infinity;
  for (const other of pool) {
    const o = normalize(cleanTerm(other));
    if (!o || o === base) continue;
    const d = editDistance(base, o);
    if (d < bestD) { bestD = d; best = other; }
  }
  // Solo sirve si es parecido (evita distractores absurdos).
  if (!best || bestD > Math.max(2, Math.ceil(base.length * 0.6))) return null;
  return best;
}

/**
 * Arma la escalera completa de ejercicios para el vocab de una unidad.
 * @returns {Array} ejercicios ordenados por nivel (rondas), c/u con {level, kind, vocabId, ...}
 */
export function buildVocabLadder(unit, opts = {}) {
  const maxWords = opts.maxWords || 6;
  const max = opts.max || 16;
  const vocab = (unit?.vocab || []).filter((v) => v.term && v.translation);
  const words = vocab.slice(0, maxWords);
  const translations = vocab.map((v) => v.translation).filter(Boolean);
  const terms = vocab.map((v) => v.term).filter(Boolean);

  const pickDistractors = (pool, answer, n) => {
    const seen = new Set([normalize(answer)]);
    const out = [];
    for (const t of pool) {
      const k = normalize(t);
      if (seen.has(k)) continue;
      seen.add(k); out.push(t);
      if (out.length >= n) break;
    }
    return out;
  };

  const rounds = { recognize: [], cue: [], collocation: [], produce: [], audio: [] };

  for (const v of words) {
    const clean = cleanTerm(v.term);
    const say = clean;

    // 1) reconocer: ves la palabra -> eliges significado (en->es)
    const dTr = pickDistractors(translations, v.translation, 2);
    if (dTr.length === 2) {
      rounds.recognize.push({
        level: 1, kind: "choose", vocabId: v.id, say,
        q: '\u00bfQu\u00e9 significa "' + clean + '"?',
        options: [{ text: v.translation, correct: true }, ...dTr.map((d) => ({ text: d, correct: false }))],
      });
    }

    // 2) pista: traduccion + inicial -> escribe la palabra
    rounds.cue.push({
      level: 2, kind: "type", vocabId: v.id, say,
      q: 'Escribe en ingl\u00e9s: "' + v.translation + '"',
      hint: firstHint(v.term), accepts: acceptsFor(v.term), answer: clean,
    });

    // 3) colocacion: completa la palabra DENTRO de su frase (chunk)
    const cz = clozeExample(v.example, v.term);
    if (cz) {
      rounds.collocation.push({
        level: 3, kind: "type", vocabId: v.id, say,
        q: "Completa la frase:", sentence: cz.sentence,
        accepts: [normalize(cz.answer), ...acceptsFor(v.term)], answer: cz.answer,
      });
    }

    // 4) produccion: solo la traduccion -> escribe la palabra (sin pista)
    rounds.produce.push({
      level: 4, kind: "type", vocabId: v.id, say,
      q: 'Producci\u00f3n: di "' + v.translation + '" en ingl\u00e9s (sin pista)',
      accepts: acceptsFor(v.term), answer: clean,
    });

    // 5) trampa auditiva: oyes la palabra -> eliges cual fue
    const conf = confusable(v.term, terms);
    if (conf) {
      rounds.audio.push({
        level: 5, kind: "audio", vocabId: v.id, say,
        q: "\u00bfQu\u00e9 palabra escuchaste?",
        options: [{ text: clean, correct: true }, { text: cleanTerm(conf), correct: false }],
      });
    }
  }

  const ordered = [
    ...rounds.recognize, ...rounds.cue, ...rounds.collocation, ...rounds.produce, ...rounds.audio,
  ];
  return ordered.slice(0, max);
}

/** Proporcion 0..1 -> porcentaje 0..100. */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}
