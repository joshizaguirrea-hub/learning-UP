/**
 * core/kana-lab.js — Logica PURA del laboratorio de Escritura (Hiragana).
 *
 * Arma las preguntas de reconocimiento de kana. Nada de teclado ni trazos
 * aun (fase 1, ver docs/ROADMAP-JAPONES.md): primero RECONOCER el caracter
 * de forma solida -- leerlo y encontrarlo -- que es la base de todo lo demas.
 * Sin DOM ni red => testeable. El repaso espaciado reusa core/srs.js tal
 * cual (un caracter de kana es, ni mas ni menos, una tarjeta mas que
 * recordar -- mismo motor que el vocabulario, servicio compartido).
 */
import { HIRAGANA } from "../data/kana-hiragana.js";

/** Barajada simple (Fisher-ish via sort), igual que el resto del curso. */
function shuffle(a) {
  return a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);
}

/** Caracteres de una fila del gojuon (o todos si no se especifica). */
export function charsForRow(row) {
  return row ? HIRAGANA.filter((k) => k.row === row) : HIRAGANA;
}

/** Filas disponibles, en el orden del catalogo (para el selector de lotes). */
export function kanaRows() {
  const seen = [];
  for (const k of HIRAGANA) if (!seen.includes(k.row)) seen.push(k.row);
  return seen;
}

function pickDistractors(pool, answerId, n) {
  const others = pool.filter((k) => k.id !== answerId);
  return shuffle(others).slice(0, n);
}

/**
 * Arma el quiz de un lote de caracteres: mitad LECTURA (ves el kana -> eliges
 * el romaji) y mitad BUSQUEDA (lees el romaji -> encuentras el kana). Ninguna
 * de las dos requiere teclado -- opcion multiple, funciona para cualquier
 * escritura, y es el primer paso real antes de poder ESCRIBIR el caracter.
 * @param {Array} chars - lote de caracteres (ver charsForRow)
 * @param {{maxOptions?: number}} [opts]
 * @returns {Array} items {id, kind, charId, kana, prompt, options[]}
 */
export function buildKanaQuiz(chars, opts = {}) {
  const maxOptions = opts.maxOptions || 4;
  // Distractores de sobra aunque el lote sea chico (ej. solo 5 vocales):
  // tira del catalogo completo si el lote no alcanza para armar opciones.
  const pool = chars.length > maxOptions ? chars : HIRAGANA;
  const items = [];

  for (const k of chars) {
    const wrong = pickDistractors(pool, k.id, maxOptions - 1);
    items.push({
      id: k.id + "-read", kind: "read", charId: k.id, kana: k.kana,
      prompt: k.kana,
      options: shuffle([{ text: k.romaji, correct: true }, ...wrong.map((w) => ({ text: w.romaji, correct: false }))]),
    });
  }
  for (const k of chars) {
    const wrong = pickDistractors(pool, k.id, maxOptions - 1);
    items.push({
      id: k.id + "-find", kind: "find", charId: k.id, kana: k.kana,
      prompt: k.romaji,
      options: shuffle([{ text: k.kana, correct: true }, ...wrong.map((w) => ({ text: w.kana, correct: false }))]),
    });
  }
  return shuffle(items);
}

/** Proporcion 0..1 -> porcentaje 0..100 (mismo molde que core/vocab-lab.js). */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}
