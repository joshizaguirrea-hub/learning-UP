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
 * CONJUGACION), usando los encabezados que piden los prompts de "profundizar".
 * El de NOTA GRAMATICAL se busca con REGEX (no texto exacto): el prompt le
 * manda a la IA "NOTA GRAMATICAL (sin asteriscos ni markdown aqui):" -- ese
 * parentesis es una instruccion PARA la IA, pero a veces el modelo lo copia
 * tal cual en su respuesta, y un indexOf("NOTA GRAMATICAL:") literal fallaba
 * en ese caso (bug real: la pantalla mostraba "Sin nota esta vez." pese a que
 * la IA si habia escrito una nota -- todo el texto caia a "examples" porque
 * no se encontraba el separador). Si el modelo de plano no respeta el
 * formato, TODO cae en "examples" (nunca se pierde contenido, solo el
 * color-coding).
 * @param {string} text - respuesta cruda de la IA
 * @returns {{examples: string, grammar: string, conjugation: string}}
 */
export function parseDeepenAnswer(text) {
  const t = String(text || "");
  const gMatch = t.match(/NOTA GRAMATICAL[^:\n]*:/i);
  if (!gMatch) return { examples: t.replace(/^EJEMPLOS:\s*/i, "").trim(), grammar: "", conjugation: "" };
  const gi = gMatch.index;
  const gEnd = gi + gMatch[0].length;
  const examples = t.slice(0, gi).replace(/^EJEMPLOS:\s*/i, "").trim();
  const ci = t.indexOf("CONJUGACION", gEnd);
  if (ci === -1) return { examples, grammar: t.slice(gEnd).trim(), conjugation: "" };
  const grammar = t.slice(gEnd, ci).trim();
  const conjugation = t.slice(ci).replace(/^CONJUGACION[^:]*:\s*/i, "").trim();
  return { examples, grammar, conjugation };
}

/**
 * Parsea el bloque de EJEMPLOS numerados en una lista de items, uno por
 * tarjeta (ver ui/example-card.js). Formato esperado por ejemplo:
 *   1. <frase>
 *      = <traduccion>
 *      ESTRUCTURA: Sujeto = ... | Verbo = ... (tiempo) | Objeto = ...
 *      REGLA: <explicacion o "-" si no aplica>
 * ESTRUCTURA/REGLA son OPCIONALES -- si el modelo no las manda, el item
 * igual se arma solo con phrase/translation (nunca se pierde contenido por
 * un formato imperfecto; mejor un ejemplo incompleto que ninguno).
 * @param {string} examplesText - texto crudo de la seccion EJEMPLOS (SIN
 *   limpiar markdown -- esta funcion solo separa estructura, no sanitiza).
 * @returns {Array<{phrase: string, translation: string, structure: string, rule: string}>}
 */
export function parseExampleItems(examplesText) {
  const text = String(examplesText || "").trim();
  if (!text) return [];
  const items = [];
  // Cada ejemplo empieza con "N. " al inicio de linea; partimos ahi.
  const blocks = text.split(/\n(?=\d+\.\s)/);
  for (const block of blocks) {
    const m = block.match(/^\d+\.\s*([\s\S]*?)\n\s*=\s*([^\n]*)([\s\S]*)$/);
    if (m) {
      const rest = m[3] || "";
      const structureM = rest.match(/ESTRUCTURA:\s*([^\n]*)/i);
      const ruleM = rest.match(/REGLA:\s*([^\n]*)/i);
      const rule = (ruleM?.[1] || "").trim();
      items.push({
        phrase: m[1].trim(),
        translation: m[2].trim(),
        structure: (structureM?.[1] || "").trim(),
        rule: rule === "-" ? "" : rule,
      });
    } else {
      const clean = block.replace(/^\d+\.\s*/, "").trim();
      if (clean) items.push({ phrase: clean, translation: "", structure: "", rule: "" });
    }
  }
  return items;
}

/** Escapa caracteres especiales de regex en un texto literal. */
function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Genera las formas mas probables de un verbo en ingles (3a persona del
 * presente y gerundio) a partir de su forma base, para que el resaltado de
 * ejemplos (highlightFirstMatch) tambien reconozca "applies"/"applying"
 * aunque solo tengamos guardada la base "apply". Mismo patron de deteccion
 * (consonante + "y") que ya usa regularPastRule() en core/verb-tips.js para
 * el pasado -- aqui se aplica a las otras formas que tienen el mismo cambio
 * ortografico. No es un conjugador completo (no dobla consonante en verbos
 * cortos tipo stop->stopping): si no detecta nada fiable, el resaltado
 * simplemente no aparece en vez de aparecer MAL puesto.
 * @param {string} base - forma base del verbo (ej. "apply")
 * @returns {string[]} formas candidatas (incluye la base)
 */
export function expandVerbForms(base) {
  const b = String(base || "").trim();
  if (!b) return [];
  const forms = new Set([b]);
  if (/[^aeiou]y$/i.test(b)) {
    forms.add(b.slice(0, -1) + "ies"); // apply -> applies
  } else if (/(s|sh|ch|x|z|o)$/i.test(b)) {
    forms.add(b + "es"); // watch -> watches, go -> goes
  } else {
    forms.add(b + "s"); // walk -> walks
  }
  if (/[^aeiou]e$/i.test(b) && !/ee$/i.test(b)) {
    forms.add(b.slice(0, -1) + "ing"); // like -> liking
  } else {
    forms.add(b + "ing"); // walk -> walking, apply -> applying (la "y" NO cambia antes de -ing)
  }
  return [...forms];
}

/**
 * Envuelve la PRIMERA aparicion de alguna de las formas dadas dentro de
 * `phrase` con el marcado *palabra* (ver ui/richtext.js), para resaltar el
 * verbo/palabra objetivo SIN depender de que la IA inserte el marcado ella
 * misma -- eso fallaba en la practica: al pedirle a la IA "envuelve el verbo
 * con asteriscos" dentro de un prompt en espanol, a veces mezclaba idiomas
 * en la misma frase (spanglish) en vez de solo resaltar. Haciendolo aqui, en
 * codigo, el prompt puede pedir la frase 100% en el idioma meta sin ninguna
 * instruccion de formato adicional que lo confunda, y el resaltado queda
 * garantizado (o ausente si de verdad no aparece ninguna forma conocida,
 * nunca mal puesto).
 * @param {string} phrase - frase ya limpia (sin markdown)
 * @param {string[]} forms - formas a buscar, de mas especifica a menos
 *   (ej. ["applied", "applying", "apply"]); se usa la PRIMERA que aparezca.
 * @returns {string} la frase, con la forma encontrada envuelta en *…* (o
 *   igual a `phrase` si ninguna forma aparece).
 */
export function highlightFirstMatch(phrase, forms) {
  const text = String(phrase || "");
  const candidates = (forms || []).filter(Boolean).sort((a, b) => b.length - a.length);
  for (const form of candidates) {
    // \w* al final capta formas flexionadas que comparten la raiz dada
    // (apply -> applies/applying); las formas YA conjugadas (applied) se
    // encuentran completas porque ya son la ortografia exacta esperada.
    const re = new RegExp(`\\b(${escapeRegExp(form)}\\w*)\\b`, "i");
    const m = text.match(re);
    if (m) return text.slice(0, m.index) + "*" + m[0] + "*" + text.slice(m.index + m[0].length);
  }
  return text;
}
