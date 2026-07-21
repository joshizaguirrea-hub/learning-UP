/**
 * ui/bilingual.js — Segmentador ANTI-SPANGLISH (garantia de voz).
 *
 * Punto unico de verdad para partir un texto (posiblemente MEZCLADO es/en) en
 * trozos de UN SOLO idioma cada uno, para que el motor de voz nunca lea una
 * palabra inglesa con voz espanola ni al reves.
 *
 * Estrategia (defensa en capas, todo en CODIGO -> no depende del modelo):
 *   1) Lo entrecomillado ("...") se fuerza a INGLES (contrato con la IA).
 *   2) Cada palabra se clasifica es/en por senales FUERTES (acentos, enye,
 *      signos ¿¡, contracciones tipo "don't", y listas curadas sin colisiones).
 *   3) Las palabras ambiguas heredan el idioma del vecino conocido; si no hay,
 *      el idioma DOMINANTE del texto (la mayoria de senales fuertes).
 *   4) Se agrupan rachas contiguas del mismo idioma en un solo trozo (fluido,
 *      pocas peticiones de TTS).
 */

// Marcas inequivocas de espanol: acentos, enye, dieresis y signos de apertura.
const ES_CHARS = /[\u00E1\u00E9\u00ED\u00F3\u00FA\u00FC\u00F1\u00BF\u00A1]/i;

// Palabras EXCLUSIVAS del ingles (no son palabras validas en espanol) para
// usarlas como ANCLA segura. Curadas para evitar colisiones (fuera "he", "has",
// "son", "van", "dice", "sin"... que existen en ambos idiomas).
const EN_STRONG = new Set((
  "the an of to is are am was were be been being do does did you your yours we " +
  "they she and but because what when where why who which can could would should " +
  "will shall have had this that these those there then than not about from into " +
  "over under again people student teacher work school home food travel money " +
  "week year english hello thanks please with my his her their " +
  "our its i it or if up out off all get got make made want need like know think " +
  "time day very here yes how they're don't doesn't isn't aren't wasn't i'm you're " +
  "we're he's she's it's let's going want need really something someone about"
).split(/\s+/));

// Palabras EXCLUSIVAS del espanol (no validas en ingles) como ancla segura.
const ES_STRONG = new Set((
  "el la los las un una unos unas de del que para porque pero con muy esto esta " +
  "este estos esas esos cuando donde cual cuales tus sus mis nuestro nuestra estan " +
  "estoy soy eres somos tiene tienes tengo hacer digo dices algo bien aqui alli " +
  "tambien segun ejemplo regla respuesta frase palabra palabras significa correcto " +
  "recuerda vamos aprender saludos hablar hoy ayer siempre nunca gente alumno profe " +
  "casa comida dinero tiempo semana espanol ingles tu su mi se le les nos ella " +
  "ellos ellas usted ustedes hola gracias por favor quiero necesito puedo puedes " +
  "vas voy estas mas tan cada otro otra mismo entonces ademas sobre entre hasta " +
  "desde entiendo escribe escucha practica repite intenta significa oracion"
).split(/\s+/));

/** Clasifica UNA palabra: "es" | "en" | null (ambigua -> hereda contexto). */
export function classifyWord(word) {
  const raw = String(word);
  if (ES_CHARS.test(raw)) return "es";                 // acento/enye/¿¡ = español
  if (/[a-z]'[a-z]/i.test(raw)) return "en";           // don't, isn't, I'm...
  const c = raw.toLowerCase().replace(/[^a-z]/g, "");
  if (!c) return null;
  if (EN_STRONG.has(c)) return "en";
  if (ES_STRONG.has(c)) return "es";
  return null;
}

/** Limpia simbolos para que la voz suene natural (no lea "asterisco", etc.). */
export function normalizeForSpeech(text) {
  return String(text || "")
    .replace(/\s*=\s*/g, ", ")
    .replace(/\u00B7/g, ", ")
    .replace(/\s*(?:->|=>|\u2192|\u21D2|\u2190)\s*/g, ", ")
    .replace(/[*_#`~^<>|/\\{}\[\]()]/g, " ")
    .replace(/\s*:\s*/g, ", ")
    .replace(/\s+([,.;!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Convierte un texto (posible mezcla es/en) en items de UN idioma cada uno.
 * @param {string} text
 * @param {string} [defaultLang="es"] idioma para empates de ambiguedad
 * @returns {Array<{text:string, lang:string, opts:object}>}
 */
export function toBilingualItems(text, defaultLang = "es") {
  const def = String(defaultLang).toLowerCase().startsWith("en") ? "en" : "es";
  const norm = normalizeForSpeech(text);
  if (!norm) return [];

  // 1) Tokeniza en orden, marcando lo entrecomillado como INGLES forzado.
  const tokens = [];
  const addPlain = (s) => { for (const w of s.split(/\s+/)) if (w) tokens.push({ w, lang: null }); };
  const re = /["\u201C\u201D]([^"\u201C\u201D]+)["\u201C\u201D]/g;
  let last = 0, m;
  while ((m = re.exec(norm))) {
    if (m.index > last) addPlain(norm.slice(last, m.index));
    for (const w of m[1].split(/\s+/)) if (w) tokens.push({ w, lang: "en" });
    last = re.lastIndex;
  }
  if (last < norm.length) addPlain(norm.slice(last));
  if (!tokens.length) return [];

  // 2) Clasifica palabras y calcula el idioma DOMINANTE (senales fuertes).
  let es = 0, en = 0;
  for (const t of tokens) {
    if (t.lang == null) t.lang = classifyWord(t.w);
    if (t.lang === "es") es++; else if (t.lang === "en") en++;
  }
  const base = en > es ? "en" : es > en ? "es" : def;

  // 3) Rellena ambiguos: vecino conocido (izq/der) o el idioma base.
  for (let k = 0; k < tokens.length; k++) {
    if (tokens[k].lang) continue;
    let l = k - 1; while (l >= 0 && !tokens[l].lang) l--;
    let r = k + 1; while (r < tokens.length && !tokens[r].lang) r++;
    tokens[k].lang = (l >= 0 && tokens[l].lang) || (r < tokens.length && tokens[r].lang) || base;
  }

  // 4) Agrupa rachas contiguas del mismo idioma en un solo trozo.
  const runs = [];
  for (const t of tokens) {
    const prev = runs[runs.length - 1];
    if (prev && prev.lang === t.lang) prev.text += " " + t.w;
    else runs.push({ text: t.w, lang: t.lang });
  }

  return runs.map((r) => ({
    text: r.text,
    lang: r.lang === "en" ? "en-US" : "es-MX",
    opts: r.lang === "en" ? { rate: 0.9 } : {},
  }));
}
