/**
 * services/dictionary.js — Traduccion de palabras/frases (ES <-> EN).
 *
 * Usa la API gratuita y sin llave de MyMemory (soporta CORS). Si la red falla,
 * lanza un error claro para que la UI degrade con elegancia.
 *
 * No guarda estado global salvo un cache en memoria para no repetir peticiones.
 */

const ENDPOINT = "https://api.mymemory.translated.net/get";
const cache = new Map(); // clave: `${dir}:${texto}` -> traduccion

/** Detecta si el texto parece ingles (heuristica simple por caracteres). */
export function looksEnglish(text) {
  // Si tiene acentos o enie, casi seguro es espanol.
  if (/[aeiou]\u0301|[ñáéíóúü]/i.test(text)) return false;
  return /^[\x00-\x7F]+$/.test(text); // solo ASCII -> probablemente ingles
}

/**
 * Traduce texto en la direccion dada.
 * @param {string} text
 * @param {"en|es"|"es|en"} pair
 * @returns {Promise<{text:string, match:number}>}
 */
export async function translate(text, pair = "en|es") {
  const q = String(text || "").trim();
  if (!q) return { text: "", match: 0 };
  const key = `${pair}:${q.toLowerCase()}`;
  if (cache.has(key)) return cache.get(key);

  const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&langpair=${encodeURIComponent(pair)}`;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    throw new Error("Sin conexion para traducir. Revisa tu internet.");
  }
  if (!res.ok) throw new Error(`El traductor respondio ${res.status}.`);
  const data = await res.json();
  const out = {
    text: data?.responseData?.translatedText || "",
    match: data?.responseData?.match || 0,
  };
  if (!out.text) throw new Error("No se encontro traduccion.");
  cache.set(key, out);
  return out;
}
