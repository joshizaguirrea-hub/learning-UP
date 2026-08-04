/**
 * core/unit-language.js — Referencia de la unidad: PRONOMBRES + VOCABULARIO.
 *
 * "De lo que YA tiene la unidad": sin IA ni red. Junta el vocabulario definido en
 * la unidad (unit.vocab + glosarios de las lecciones) y DETECTA que pronombres
 * del idioma meta aparecen en la gramatica/ejemplos/vocab del capitulo, con su
 * traduccion al espanol. Si no detecta ninguno, cae al set base del idioma para
 * que el segmento sea util igual. Puro y testeable (sin DOM).
 */

/** Pronombres por idioma meta -> { forma: glosa en espanol }. */
const PRONOUNS = {
  it: { io: "yo", tu: "tú", "lui": "él", "lei": "ella", noi: "nosotros/as", voi: "vosotros/as", loro: "ellos/as" },
  pt: { eu: "yo", "você": "tú/usted", tu: "tú", ele: "él", ela: "ella", "nós": "nosotros/as", "vocês": "ustedes", eles: "ellos", elas: "ellas" },
  en: { i: "yo", you: "tú/usted/ustedes", he: "él", she: "ella", it: "ello (cosa)", we: "nosotros/as", they: "ellos/as" },
  fr: { je: "yo", tu: "tú", il: "él", elle: "ella", on: "uno / nosotros", nous: "nosotros/as", vous: "usted/vosotros", ils: "ellos", elles: "ellas" },
  es: { yo: "yo", "tú": "tú", "él": "él", ella: "ella", usted: "usted", "nosotros": "nosotros/as", vosotros: "vosotros/as", ellos: "ellos/as" },
};

function langKey(unit) {
  return String(unit?.language || "en").slice(0, 2).toLowerCase();
}

/** Quita acentos y baja a minusculas (para detectar pronombres con tolerancia). */
function fold(s) {
  return String(s || "").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Junta el vocabulario del capitulo (unit.vocab + glosarios de lecciones),
 * deduplicado por termino. Devuelve [{term, translation, example}].
 */
export function unitVocabulary(unit) {
  const out = [];
  const seen = new Set();
  const add = (v) => {
    const term = (v && (v.term || v.word)) ? String(v.term || v.word).trim() : "";
    if (!term) return;
    const k = term.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    out.push({ term, translation: v.translation || v.note || "", example: v.example || "" });
  };
  for (const v of (unit?.vocab || [])) add(v);
  for (const l of (unit?.lessons || [])) {
    const g = l.glossary || (l.content && l.content.glossary) || [];
    for (const v of g) add(v);
  }
  return out;
}

/**
 * Detecta los pronombres del idioma meta presentes en la gramatica/ejemplos/
 * vocab del capitulo. Devuelve [{form, es}]. Si no detecta ninguno, devuelve el
 * set base del idioma (para no dejar el segmento vacio).
 */
export function unitPronouns(unit) {
  const lang = langKey(unit);
  const dict = PRONOUNS[lang] || PRONOUNS.en;

  // Corpus del capitulo: reglas, formas y ejemplos de gramatica + terminos/ejemplos de vocab.
  const parts = [];
  for (const l of (unit?.lessons || [])) {
    const g = l.grammar;
    if (g) {
      if (g.rule) parts.push(g.rule);
      if (g.form) parts.push(g.form);
      if (Array.isArray(g.examples)) parts.push(g.examples.join(" "));
    }
  }
  for (const v of unitVocabulary(unit)) { parts.push(v.term); if (v.example) parts.push(v.example); }
  const corpus = " " + fold(parts.join(" ")).replace(/[^a-z' ]+/g, " ") + " ";

  const found = [];
  for (const [form, es] of Object.entries(dict)) {
    const f = fold(form);
    // Coincidencia por palabra completa (evita 'io' dentro de otra palabra).
    if (new RegExp("(^| )" + f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "( |$)").test(corpus)) {
      found.push({ form, es });
    }
  }
  // Si el capitulo no menciona pronombres explicitos, mostramos el set base.
  if (!found.length) return Object.entries(dict).map(([form, es]) => ({ form, es }));
  return found;
}
