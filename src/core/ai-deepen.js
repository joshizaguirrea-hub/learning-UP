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

/**
 * Como stripMd, pero PRESERVA el marcado *palabra* de ui/richtext.js (asi los
 * ejemplos pueden resaltar el verbo/palabra en contexto, pedido directo del
 * alumno: "que se dividan en cuadritos con colores senalando el verbo").
 * Quita negritas markdown reales (**texto** -> texto, sin perder contenido) y
 * backticks/guiones bajos sueltos, pero deja los asteriscos SIMPLES intactos
 * para que richText() los pinte.
 */
export function stripMdKeepHighlight(t) {
  return String(t).replace(/\*\*([^*]+)\*\*/g, "$1").replace(/[_`]/g, "").replace(/^#+\s*/gm, "");
}

/**
 * Parsea el bloque de EJEMPLOS numerados ("1. frase\n   = traduccion\n2. ...")
 * en una lista de {phrase, translation} para pintar cada uno como su propia
 * tarjeta (ver ui/example-card.js) en vez de un bloque de texto plano.
 * Tolerante: si una linea no calza el formato exacto, igual se devuelve con
 * translation vacia -- nunca se pierde contenido por un formato imperfecto.
 * @param {string} examplesText - normalmente stripMdKeepHighlight(parsed.examples)
 * @returns {Array<{phrase: string, translation: string}>}
 */
export function parseExampleItems(examplesText) {
  const text = String(examplesText || "").trim();
  if (!text) return [];
  const items = [];
  // Cada ejemplo empieza con "N. " al inicio de linea; partimos ahi.
  const blocks = text.split(/\n(?=\d+\.\s)/);
  for (const block of blocks) {
    const m = block.match(/^\d+\.\s*([\s\S]*?)\n\s*=\s*([\s\S]*)$/);
    if (m) {
      items.push({ phrase: m[1].trim(), translation: m[2].trim() });
    } else {
      const clean = block.replace(/^\d+\.\s*/, "").trim();
      if (clean) items.push({ phrase: clean, translation: "" });
    }
  }
  return items;
}
