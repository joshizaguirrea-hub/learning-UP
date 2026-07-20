/**
 * data/cloze-gen.js — Anade TRAMPAS (distractores) a los cloze de vocabulario.
 *
 * DRY + escala A1..C2: en vez de escribir opciones a mano en 57 unidades, cuando
 * un ejercicio de COMPLETAR (cloze) tiene como respuesta una PALABRA DEL
 * VOCABULARIO de la unidad, le agregamos `choices` = respuesta + distractores
 * (otras palabras del MISMO tema, por eso son trampas tentadoras). El
 * lesson-player entonces pinta un banco de palabras y PRONUNCIA la elegida.
 *
 * Solo toca cloze cuya respuesta sea vocab (fill de vocabulario). Los cloze de
 * gramatica se quedan como texto libre (sus buenas trampas serian gramaticales,
 * que no tenemos como dato). No toca DOM ni red.
 */

const norm = (s) => String(s).trim().toLowerCase();
/** Forma "limpia" de un termino: sin "to " inicial ("to book" -> "book"). */
const stripTo = (s) => norm(s).replace(/^to\s+/, "");

/** Anade choices con trampas a los cloze de vocabulario de la unidad. Muta. */
export function withClozeChoices(unit) {
  const terms = (unit.vocab || []).map((v) => v.term).filter(Boolean);
  if (terms.length < 3) return unit;

  // Distractores candidatos: formas de una sola palabra (sin "to ", sin frases).
  const singles = [...new Set(terms.map(stripTo).filter((w) => /^[a-z']+$/.test(w)))];

  for (const lesson of unit.lessons || []) {
    for (const a of lesson.activities || []) {
      if (a.type !== "cloze" || !a.payload || a.payload.choices) continue;
      const ans = a.payload.answer;
      if (!ans) continue;
      const ansN = norm(ans);
      // Solo si la respuesta corresponde a una palabra del vocabulario.
      const isVocab = terms.some((t) => norm(t) === ansN || stripTo(t) === ansN);
      if (!isVocab) continue;

      const distractors = singles.filter((w) => w !== ansN).slice(0, 3);
      if (distractors.length < 2) continue;

      a.payload.choices = [ans, ...distractors]; // el player los baraja al pintar
    }
  }
  return unit;
}
