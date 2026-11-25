/**
 * core/listening-ja.js — Listening ESCALONADO para japones (alumno que NO
 * conoce el idioma todavia).
 *
 * POR QUE (ver ADR-008 y la conversacion con Joshua): el Listening generico
 * (features/listening-lab.js) manda directo a "escucha una historia de 90-140
 * palabras generada por IA y responde 8 preguntas" -- eso es EXAMINAR, no
 * ENSENAR. Funciona mas o menos para it/pt (hay cognados con el espanol) pero
 * es una pared para alguien que nunca oyo japones: no hay forma de "adivinar
 * por contexto" si ni siquiera puedes separar donde empieza una palabra.
 *
 * Esta escalera usa SOLO vocabulario que el alumno YA vio en la Clase de
 * Vocabulario de la unidad (core/vocab-lab.js), en dos rondas:
 *   A) "significado" -> oyes la palabra sola, eliges su traduccion al espanol.
 *   B) "palabra"      -> oyes la frase de ejemplo completa, eliges que palabra
 *      (en romaji) reconociste dentro de ella.
 * Las opciones SI muestran romaji (no es una prueba de oido "a ciegas": aqui
 * se refuerza sonido<->significado de vocab ya ensenado). La historia libre
 * con IA sigue existiendo como reto OPCIONAL/avanzado una vez hay base de
 * vocabulario (ver features/listening-lab-ja.js).
 */
import { splitJa } from "./ja-script.js";

function shuffle(a) {
  return a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);
}

/** N distractores de `pool` (array de strings) distintos de `answer`. */
function pickDistractors(pool, answer, n) {
  const seen = new Set([answer]);
  const out = [];
  for (const item of pool) {
    if (seen.has(item)) continue;
    seen.add(item);
    out.push(item);
    if (out.length >= n) break;
  }
  return out;
}

/**
 * Arma la escalera de listening (rondas A + B) a partir del vocab de la unidad.
 * @param {object} unit - { vocab: [{id, term, translation, example}] }
 * @param {object} [opts] - { maxWords }
 * @returns {Array} items {level, kind:"meaning"|"word", wordId, say, prompt, options}
 */
export function buildJaListeningLadder(unit, opts = {}) {
  const maxWords = opts.maxWords || 6;
  const raw = (unit?.vocab || []).filter((v) => v.term && v.translation);
  const words = raw.slice(0, maxWords).map((v) => {
    const { jp, romaji } = splitJa(v.term);
    return { id: v.id, jp, romaji: romaji || jp, translation: v.translation, example: v.example || "" };
  });
  const translations = words.map((w) => w.translation);
  const romajis = words.map((w) => w.romaji);

  const roundA = []; // oir la palabra -> elegir el SIGNIFICADO
  const roundB = []; // oir la frase -> elegir la PALABRA (romaji)

  words.forEach((w, i) => {
    const distractorsA = pickDistractors(translations.filter((_, j) => j !== i), w.translation, 2);
    if (distractorsA.length === 2) {
      roundA.push({
        level: 1, kind: "meaning", wordId: w.id, say: w.jp,
        prompt: "Escucha la palabra. \u00bfQu\u00e9 significa?",
        options: shuffle([{ text: w.translation, correct: true }, ...distractorsA.map((d) => ({ text: d, correct: false }))]),
      });
    }

    if (w.example) {
      const exJp = splitJa(w.example).jp;
      const distractorsB = pickDistractors(romajis.filter((_, j) => j !== i), w.romaji, 2);
      if (distractorsB.length === 2) {
        roundB.push({
          level: 2, kind: "word", wordId: w.id, say: exJp,
          prompt: "Escucha la frase. \u00bfQu\u00e9 palabra reconoces?",
          options: shuffle([{ text: w.romaji, correct: true }, ...distractorsB.map((d) => ({ text: d, correct: false }))]),
        });
      }
    }
  });

  return [...roundA, ...roundB];
}

/** Proporcion 0..1 -> porcentaje 0..100 (mismo molde que los demas labs). */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}
