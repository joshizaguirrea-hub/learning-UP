/**
 * core/feedback.js — Motor PURO del feedback de habla (Speaking + Entrevista).
 *
 * Un profe de verdad no solo pone una nota: evalua GRAMATICA, VOCABULARIO,
 * FLUIDEZ, COHERENCIA y PRONUNCIACION, dice que hiciste bien, que corregir y te
 * deja frases modelo. Este modulo:
 *   1) buildFeedbackPrompt(kind) -> la INSTRUCCION (rubrica) que se manda a la IA
 *      para que devuelva SIEMPRE el mismo formato parseable.
 *   2) parseFeedback(text) -> { score, areas[], sections[] } listo para el dashboard.
 *
 * Sin DOM, sin red: todo aqui es testeable con node. La UI vive en
 * features/feedback-dashboard.js y el fetch en services/bymax-ai.js.
 */

/** Token que el Worker reconoce para entrar en "modo evaluador" (entrevista). */
export const FEEDBACK_TOKEN = "[FEEDBACK]";

/**
 * Areas que evalua un profe. `key` = etiqueta que pedimos a la IA (en MAYUS).
 * El orden es el orden en que se pintan las barras del dashboard.
 */
export const AREA_DEFS = [
  { key: "GRAMATICA", label: "Gram\u00e1tica", grad: "from-violet-400 to-fuchsia-500" },
  { key: "VOCABULARIO", label: "Vocabulario", grad: "from-sky-400 to-cyan-400" },
  { key: "FLUIDEZ", label: "Fluidez", grad: "from-emerald-400 to-teal-500" },
  { key: "COHERENCIA", label: "Coherencia", grad: "from-amber-400 to-orange-500" },
  { key: "PRONUNCIACION", label: "Pronunciaci\u00f3n", grad: "from-pink-400 to-rose-500" },
  { key: "INTERACCION", label: "Interacci\u00f3n", grad: "from-indigo-400 to-blue-500" },
  // Dimensiones del close-reading (an\u00e1lisis literario):
  { key: "COMPRENSION", label: "Comprensi\u00f3n", grad: "from-emerald-400 to-green-500" },
  { key: "EVIDENCIA", label: "Evidencia textual", grad: "from-sky-400 to-blue-500" },
  { key: "PROFUNDIDAD", label: "Profundidad", grad: "from-violet-400 to-purple-500" },
  { key: "EXPRESION", label: "Expresi\u00f3n", grad: "from-amber-400 to-orange-500" },
  // Compat con el formato viejo de entrevista (por si el Worker aun lo usa):
  { key: "CONTENIDO", label: "Contenido", grad: "from-indigo-400 to-violet-400" },
  { key: "ESTRUCTURA", label: "Estructura (STAR)", grad: "from-fuchsia-400 to-pink-400" },
];

/** Secciones de texto del feedback, con su icono y tono para el dashboard. */
export const SECTION_DEFS = [
  { key: "LO QUE HICISTE BIEN", title: "Lo que hiciste bien", icon: "\u2705", tone: "emerald" },
  { key: "VOCABULARIO QUE USASTE", title: "Vocabulario que usaste", icon: "\uD83D\uDFE2", tone: "emerald" },
  { key: "A MEJORAR", title: "A mejorar", icon: "\uD83C\uDFAF", tone: "amber" },
  { key: "ERRORES CLAVE", title: "Errores clave", icon: "\u270F\uFE0F", tone: "rose" },
  { key: "VOCABULARIO SUGERIDO", title: "Podr\u00edas subir de nivel con", icon: "\uD83D\uDD35", tone: "sky" },
  { key: "FRASES MODELO", title: "Frases modelo", icon: "\uD83D\uDCAC", tone: "sky" },
  { key: "CONSEJO FINAL", title: "Consejo final", icon: "\u2B50", tone: "indigo" },
];

/**
 * Construye la rubrica que se le manda a la IA. SIEMPRE antepone el token que el
 * Worker reconoce para entrar en "modo evaluador" (si no, el modo charla seguiria
 * conversando en ingles en vez de evaluar). El `kind` solo cambia el contexto.
 * @param {"speaking"|"interview"} kind
 * @returns {string}
 */
export function buildFeedbackPrompt(kind = "speaking") {
  const ctx = kind === "interview"
    ? "Acabas de terminar una ENTREVISTA DE TRABAJO en ingles con el candidato."
    : "Acabas de terminar una CONVERSACION de practica de ingles con el estudiante.";
  const rubric =
    ctx + " Eres su profesor de ingles. Evalua SU desempe\u00f1o (lo que dijo el estudiante, " +
    "no tus propios turnos) como un examinador MCER. Responde SIEMPRE en espa\u00f1ol y EXACTAMENTE " +
    "en este formato, sin texto extra antes ni despues:\n\n" +
    "PUNTAJE: <0-100>\n" +
    "GRAMATICA: <0-100>\n" +
    "VOCABULARIO: <0-100>\n" +
    "FLUIDEZ: <0-100>\n" +
    "COHERENCIA: <0-100>\n" +
    "PRONUNCIACION: <0-100>\n\n" +
    "LO QUE HICISTE BIEN:\n- <2 o 3 vi\u00f1etas concretas>\n" +
    "VOCABULARIO QUE USASTE:\n- <palabras o expresiones EN INGLES que el estudiante realmente uso bien, una por linea>\n" +
    "A MEJORAR:\n- <2 o 3 vi\u00f1etas concretas y accionables>\n" +
    "ERRORES CLAVE:\n- \"<frase EXACTA que dijo mal>\" -> \"<como se dice correcto>\" (<por que, breve>)\n<una linea por error, 2 a 4 errores reales de lo que dijo>\n" +
    "VOCABULARIO SUGERIDO:\n- <palabra o expresion EN INGLES que pudo usar> = <significado corto en espanol>\n<2 a 4 lineas>\n" +
    "FRASES MODELO:\n- <2 o 3 frases naturales en ingles que pudo haber usado>\n" +
    "CONSEJO FINAL:\n<1 o 2 frases motivadoras y claras>";
  return FEEDBACK_TOKEN + "\n" + rubric;
}

/** Quita acentos y pasa a MAYUS SIN cambiar la longitud (para localizar indices). */
function upperNoAccent(s) {
  return String(s || "")
    .replace(/[\u00e1\u00e0\u00e4\u00e2]/g, "a").replace(/[\u00c1\u00c0\u00c4\u00c2]/g, "A")
    .replace(/[\u00e9\u00e8\u00eb\u00ea]/g, "e").replace(/[\u00c9\u00c8\u00cb\u00ca]/g, "E")
    .replace(/[\u00ed\u00ec\u00ef\u00ee]/g, "i").replace(/[\u00cd\u00cc\u00cf\u00ce]/g, "I")
    .replace(/[\u00f3\u00f2\u00f6\u00f4]/g, "o").replace(/[\u00d3\u00d2\u00d6\u00d4]/g, "O")
    .replace(/[\u00fa\u00f9\u00fc\u00fb]/g, "u").replace(/[\u00da\u00d9\u00dc\u00db]/g, "U")
    .toUpperCase();
}

function clamp(n) { return Math.max(0, Math.min(100, Math.round(Number(n) || 0))); }

/**
 * Interpreta la respuesta de la IA en el objeto que consume el dashboard.
 * Tolerante: si falta el formato, cae a score 60 y deja el texto crudo como
 * unica seccion. Reconoce el formato nuevo y el viejo de entrevista.
 * @param {string} text
 * @returns {{score:number, areas:Array<{key,label,grad,value}>, sections:Array<{title,body,icon,tone}>, raw:string}}
 */
export function parseFeedback(text) {
  const raw = String(text || "");
  const U = upperNoAccent(raw);

  const m = U.match(/PUNTAJE[^\d]{0,4}(\d{1,3})/);
  const score = m ? clamp(m[1]) : 60;

  const areas = [];
  for (const a of AREA_DEFS) {
    const mm = U.match(new RegExp(a.key + "[^\\d]{0,4}(\\d{1,3})"));
    if (mm) areas.push({ key: a.key, label: a.label, grad: a.grad, value: clamp(mm[1]) });
  }

  // Localiza cada seccion presente por su encabezado y corta hasta el siguiente.
  const found = SECTION_DEFS
    .map((d) => ({ def: d, at: U.indexOf(d.key) }))
    .filter((x) => x.at !== -1)
    .sort((a, b) => a.at - b.at);

  const sections = [];
  for (let i = 0; i < found.length; i++) {
    const { def, at } = found[i];
    const from = at + def.key.length;
    const end = i + 1 < found.length ? found[i + 1].at : raw.length;
    const body = raw.slice(from, end).replace(/^[:\s]+/, "").trim();
    if (body) sections.push({ title: def.title, body, icon: def.icon, tone: def.tone });
  }

  const errors = parseErrorItems(sectionBody(sections, "Errores clave"));
  const vocabUsed = parseVocabItems(sectionBody(sections, "Vocabulario que usaste"));
  const vocabSuggested = parseVocabItems(sectionBody(sections, "Podr\u00edas subir de nivel con"));

  return { score, areas, sections, errors, vocabUsed, vocabSuggested, raw };
}

/** Cuerpo de una seccion por su titulo (para reusar improvements, etc.). */
export function sectionBody(sections, title) {
  const s = (sections || []).find((x) => x.title === title);
  return s ? s.body : "";
}

/** Quita comillas envolventes y puntuacion sobrante de los extremos. */
function stripQuotes(s) {
  return String(s || "")
    .replace(/^[\s\u201c\u201d"'\u00ab\u00bb.\-\u2022*]+/, "")
    .replace(/[\s\u201c\u201d"'\u00ab\u00bb.]+$/, "")
    .trim();
}

/**
 * Parsea la seccion "Errores clave" en items estructurados para poder PRACTICAR.
 * Reconoce lineas tipo:  "I have 20 years" -> "I am 20 years old" (edad con 'to be')
 * Tolera flechas ->, \u2192, =>, comillas rectas o curvas, y (motivo) opcional.
 * @param {string} body
 * @returns {Array<{wrong:string, right:string, why:string}>}
 */
export function parseErrorItems(body) {
  const out = [];
  for (let line of String(body || "").split(/\n+/)) {
    line = line.replace(/^\s*[-*\u2022]\s*/, "").trim();
    if (!line) continue;
    const parts = line.split(/\s*(?:->|\u2192|=>)\s*/);
    if (parts.length < 2) continue;
    const wrong = stripQuotes(parts[0]);
    let rest = parts.slice(1).join(" -> ").trim();
    let why = "";
    const wm = rest.match(/\(([^)]*)\)\s*$/);
    if (wm) { why = wm[1].trim(); rest = rest.slice(0, wm.index).trim(); }
    const right = stripQuotes(rest);
    if (wrong && right) out.push({ wrong, right, why });
  }
  return out;
}

/**
 * Parsea una seccion de vocabulario en items { word, note }.
 * Reconoce:  "resilient = resistente"  o  "to look forward to: esperar con ganas".
 * @param {string} body
 * @returns {Array<{word:string, note:string}>}
 */
export function parseVocabItems(body) {
  const out = [];
  const seen = new Set();
  for (let line of String(body || "").split(/\n+/)) {
    line = line.replace(/^\s*[-*\u2022]\s*/, "").trim();
    if (!line) continue;
    let word = line, note = "";
    const eq = line.split(/\s*(?:=|:|\u2013|\u2014)\s*/);
    if (eq.length >= 2) { word = eq[0].trim(); note = eq.slice(1).join(" ").trim(); }
    word = stripQuotes(word);
    const key = word.toLowerCase();
    if (word && !seen.has(key)) { seen.add(key); out.push({ word, note }); }
  }
  return out;
}
