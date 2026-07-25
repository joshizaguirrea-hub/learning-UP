/**
 * core/shadowing.js — Logica PURA del shadowing (sin DOM, sin I/O).
 *
 * Shadowing = escuchar una frase modelo y repetirla como un eco, imitando
 * ritmo y entonacion. Para frases largas se practica POR PARTES (chunks): el
 * cerebro no puede sombrear 15 palabras de una, pero si trozos de 3-6.
 *
 * chunkPhrase() parte una frase en trozos naturales de forma DETERMINISTA:
 *   1) corta por puntuacion fuerte (comas, punto y coma, dos puntos, guion);
 *   2) si un trozo sigue siendo largo, lo divide en ventanas de ~maxWords;
 *   3) fusiona colas muy cortas (1 palabra) con el trozo anterior para que
 *      ningun chunk quede huerfano.
 * Es pura -> se puede testear sin navegador (ver tests/shadowing.test.mjs).
 */

/** Divide en palabras respetando la puntuacion pegada (no la separa). */
function words(text) {
  return String(text || "").trim().split(/\s+/).filter(Boolean);
}

/**
 * Parte una frase en chunks para shadowing.
 * @param {string} text
 * @param {number} [maxWords=6] tamano maximo (aprox) de un chunk
 * @returns {string[]} trozos en orden; nunca vacio si hay texto
 */
export function chunkPhrase(text, maxWords = 6) {
  const clean = String(text || "").trim();
  if (!clean) return [];
  const max = Math.max(2, Math.floor(maxWords) || 6);

  // 1) Corta por puntuacion fuerte, conservando el signo con su trozo.
  const byPunct = clean
    .split(/(?<=[,;:\u2014\u2013-])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  // 2) Cada trozo largo se re-divide en ventanas de ~max palabras.
  const chunks = [];
  for (const part of byPunct) {
    const w = words(part);
    if (w.length <= max) {
      chunks.push(part);
      continue;
    }
    for (let i = 0; i < w.length; i += max) {
      chunks.push(w.slice(i, i + max).join(" "));
    }
  }

  // 3) Fusiona colas huerfanas (1 palabra) con el trozo anterior.
  const merged = [];
  for (const c of chunks) {
    if (merged.length && words(c).length === 1) {
      merged[merged.length - 1] += " " + c;
    } else {
      merged.push(c);
    }
  }
  return merged;
}

/**
 * Convierte una lista de puntajes por frase (0..1) en el puntaje de la sesion
 * de shadowing (0..100). Promedio simple redondeado; 0 si no hubo frases.
 * @param {number[]} scores proporciones 0..1
 * @returns {number} 0..100
 */
export function sessionScore(scores) {
  const list = (scores || []).map(Number).filter((n) => !Number.isNaN(n));
  if (!list.length) return 0;
  const avg = list.reduce((a, b) => a + b, 0) / list.length;
  return Math.max(0, Math.min(100, Math.round(avg * 100)));
}
