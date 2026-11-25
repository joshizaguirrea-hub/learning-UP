/**
 * core/speaking-ja.js — Speaking ESCALONADO para japones (alumno que NO
 * conoce el idioma todavia).
 *
 * MISMA LOGICA que Escucha (core/listening-ja.js) y el mismo ADR-008: en vez
 * de lanzar directo a repetir oraciones completas con particulas y verbos
 * conjugados, se escala de sonidos/palabras sueltas (ya vistas en Vocabulario)
 * a frases completas. Pedido directo de Joshua: "una forma oportuna, sencilla,
 * divertida, con pedagogia de alto nivel" -- esto es "listen and repeat"
 * clasico (Audio-Lingual Method) con warm-up fonetico antes de la oracion,
 * en vez de tirar al alumno a la alberca honda en la frase 1.
 *
 * DOS BUGS REALES que arregla de paso (ver features/speaking.js original):
 *   1) El texto objetivo mezclaba kana+romaji ("texto (romaji)") y el
 *      microfono (reconocimiento en ja-JP, que transcribe SOLO kana) se
 *      comparaba contra ESE string mixto -- la mitad de los "tokens"
 *      (los romaji) nunca podian coincidir -> calificacion injustamente baja.
 *   2) `scoreDetail` (features/speaking.js) reparte aciertos PALABRA POR
 *      PALABRA separando por espacios -- el japones NO separa palabras con
 *      espacios, asi que ese sistema no aplica. Aqui se califica por
 *      SIMILITUD DE CARACTERES (distancia de edicion normalizada) contra el
 *      KANA puro reconocido, que es lo que de verdad se puede comparar.
 */
import { splitJa } from "./ja-script.js";
import { editDistance } from "./vocab-lab.js";

const PASS = 0.6;

// Puntuacion japonesa que no aporta nada al comparar sonido (no se pronuncia).
const PUNCT_RE = /[\s\u3002\u3001\uff1f\uff01\u300c\u300d]/g;

/**
 * Arma el mazo de practica: Nivel 1 (palabras sueltas) + Nivel 2 (frases
 * completas), ambos con vocabulario YA visto en la Clase de Vocabulario.
 * @param {object} unit - { vocab: [{id, term, translation, example}] }
 * @param {object} [opts] - { maxWords }
 * @returns {Array} items {level, kana, romaji, translation, hint}
 */
export function buildJaSpeakingDeck(unit, opts = {}) {
  const maxWords = opts.maxWords || 6;
  const vocab = (unit?.vocab || []).filter((v) => v.term && v.translation);
  const chosen = vocab.slice(0, maxWords);

  const words = chosen.map((v) => {
    const { jp, romaji } = splitJa(v.term);
    return { level: 1, kana: jp, romaji: romaji || jp, translation: v.translation, hint: null };
  });

  const sentences = chosen.filter((v) => v.example).map((v) => {
    const { jp, romaji } = splitJa(v.example);
    const termRomaji = splitJa(v.term).romaji || splitJa(v.term).jp;
    return {
      level: 2, kana: jp, romaji: romaji || jp, translation: null,
      hint: termRomaji + " = " + v.translation,
    };
  });

  return [...words, ...sentences];
}

/**
 * Califica la pronunciacion POR SIMILITUD DE CARACTERES (no por palabras: el
 * japones no separa palabras con espacios, asi que comparar "tokens" como en
 * los demas idiomas no tiene sentido aqui). Compara el kana reconocido por el
 * microfono contra el kana objetivo, ignorando puntuacion.
 * @returns {{score: number, ok: boolean}} score 0..1
 */
export function scoreJaSpeech(target, heard) {
  const a = String(target || "").replace(PUNCT_RE, "");
  const b = String(heard || "").replace(PUNCT_RE, "");
  if (!a) return { score: 0, ok: false };
  if (!b) return { score: 0, ok: false };
  const dist = editDistance(a, b);
  const score = Math.max(0, 1 - dist / a.length);
  return { score, ok: score >= PASS };
}
