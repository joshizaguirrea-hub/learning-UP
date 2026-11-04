/**
 * core/villains.js — Convierte un error DOMINADO en un "villano vencido".
 *
 * Logica PURA. A partir de un error {wrong, right, skill} deriva un nombre y
 * un emoji de villano SIEMPRE IGUAL para ESE error (hash determinista, nunca
 * al azar en cada render) -- asi "el mismo villano" se ve identico cada vez
 * que aparece en la galeria, como un personaje real y no un sorteo que cambia
 * de cara. La gracia de una coleccion es que los personajes sean reconocibles.
 */

const VILLAIN_NAMES = {
  grammar: ["El Se\u00f1or Pronombre", "Duque Discordante", "Bar\u00f3n Conjugaci\u00f3n", "Lord Desorden", "Conde Confuso"],
  vocabulary: ["La Bruja del Vocabulario", "Duende Confuso", "Esp\u00edritu Olvidadizo", "Fantasma de la Palabra Perdida"],
  reading: ["El Lector Despistado", "Sombra de la Comprensi\u00f3n", "Ni\u00e9bla del Texto"],
  listening: ["El Eco Traicionero", "Susurro Confuso", "Est\u00e1tica Traviesa"],
  writing: ["El Garabato Maldito", "Tinta Torcida", "Borr\u00f3n Rebelde"],
  speaking: ["El Trabalenguas", "Acento Rebelde", "Tartamudo Fantasma"],
};

const VILLAIN_EMOJI = {
  grammar: "\uD83E\uDDD9", vocabulary: "\uD83D\uDC79", reading: "\uD83D\uDC7B",
  listening: "\uD83D\uDC42", writing: "\u270D\uFE0F", speaking: "\uD83D\uDDE3\uFE0F",
};

/** Hash simple y determinista de un string (para elegir SIEMPRE el mismo nombre). */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * @param {{wrong:string, right:string, skill?:string}} error
 * @returns {{name:string, emoji:string}}
 */
export function villainFor(error) {
  const skill = (error && error.skill) || "grammar";
  const names = VILLAIN_NAMES[skill] || VILLAIN_NAMES.grammar;
  const key = ((error && error.wrong) || "") + "|" + ((error && error.right) || "");
  const idx = hashStr(key) % names.length;
  return { name: names[idx], emoji: VILLAIN_EMOJI[skill] || "\uD83D\uDC79" };
}
