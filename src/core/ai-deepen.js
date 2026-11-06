/**
 * core/ai-deepen.js — Logica PURA para parsear una "ampliacion" de un item
 * (palabra de vocabulario o verbo) que pide la IA: ejemplos en contexto +
 * nota gramatical (+ conjugacion si aplica).
 *
 * Compartido por features/vocab-class.js (vocabulario) y features/bonus.js
 * (verbos) para no duplicar el parser de secciones ni la limpieza de
 * markdown -- ambos piden el MISMO formato de respuesta a la IA
 * (EJEMPLOS: / NOTA GRAMATICAL: / CONJUGACION:), solo cambia el prompt.
 */

/** Limpia markdown basico que a veces se cuela pese a pedir texto plano. */
export function stripMd(t) {
  return String(t).replace(/\*\*/g, "").replace(/[*_`]/g, "").replace(/^#+\s*/gm, "");
}

/**
 * Separa la respuesta en sus secciones (EJEMPLOS / NOTA GRAMATICAL /
 * CONJUGACION), usando los encabezados EXACTOS que piden los prompts de
 * "profundizar". Si el modelo no respeta el formato al pie de la letra, TODO
 * cae en "examples" (nunca se pierde contenido, solo el color-coding).
 * @param {string} text - respuesta cruda de la IA
 * @returns {{examples: string, grammar: string, conjugation: string}}
 */
export function parseDeepenAnswer(text) {
  const t = String(text || "");
  const gi = t.indexOf("NOTA GRAMATICAL:");
  if (gi === -1) return { examples: t.replace(/^EJEMPLOS:\s*/i, "").trim(), grammar: "", conjugation: "" };
  const examples = t.slice(0, gi).replace(/^EJEMPLOS:\s*/i, "").trim();
  const ci = t.indexOf("CONJUGACION", gi);
  if (ci === -1) return { examples, grammar: t.slice(gi + "NOTA GRAMATICAL:".length).trim(), conjugation: "" };
  const grammar = t.slice(gi + "NOTA GRAMATICAL:".length, ci).trim();
  const conjugation = t.slice(ci).replace(/^CONJUGACION[^:]*:\s*/i, "").trim();
  return { examples, grammar, conjugation };
}
