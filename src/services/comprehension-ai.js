/**
 * services/comprehension-ai.js — Genera CONTENIDO de comprension con el Worker.
 *
 * Lo usa el Listening Lab: la IA NARRA una historia nueva (en el idioma META) y
 * luego arma un TEST de 8 preguntas (facil -> dificil) sobre ESA historia.
 *
 * Por que 2 llamadas y no 1: el Worker limita la salida a ~800 tokens y el
 * prompt de "story" PROHIBE cualquier cosa que no sea el cuento. Asi que:
 *   1) generateStory()   -> mode:"story"  -> cuento limpio (idioma meta).
 *   2) generateQuestions()-> mode chat    -> JSON con 8 preguntas de comprension.
 *      La historia viaja como turno "model" en `history` (respeta la alternancia
 *      user/model que exige Gemini y esquiva el tope de 800 chars del `question`).
 *
 * Sin DOM. Solo red + parseo defensivo. Si el Worker no esta, lanza un Error
 * con mensaje amable que el Listening Lab muestra.
 */
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";

// Nombre del idioma META para el LLM (igual que en features/story.js -> DRY mental).
const STORY_LANGS = {
  en: "INGLES", pt: "PORTUGUES (de Brasil, pt-BR)", fr: "FRANCES",
  it: "ITALIANO", ja: "JAPONES", es: "ESPANOL",
};

/** POST al Worker; devuelve el texto `answer` o lanza Error con motivo. */
async function askWorker(payload) {
  if (!bymaxAiEnabled) {
    throw new Error("El Worker de IA no esta activo. El Listening con historia necesita conexion.");
  }
  let res;
  try {
    res = await fetch(BYMAX_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[comprehension] fallo de red:", err);
    throw new Error("Sin conexion con la IA. Revisa tu internet e intenta de nuevo.");
  }
  const data = await res.json().catch(() => ({}));
  if (!data || !data.answer) {
    const why = [data && data.error, data && data.detail].filter(Boolean).join(" | ");
    throw new Error(why ? ("La IA no pudo responder: " + why) : "La IA no pudo responder ahora. Intenta de nuevo.");
  }
  return data.answer;
}

/**
 * Limpia el cuento: quita markdown y la linea "MORAL:" en espanol (rompe la
 * inmersion del audio). Devuelve { title, body, moral }.
 */
export function sanitizeStory(text) {
  const clean = String(text || "")
    .replace(/\*\*/g, "").replace(/[*_`]/g, "").replace(/^#+\s*/gm, "");
  const lines = clean.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  let moral = "";
  const kept = lines.filter((l) => {
    if (/^moral\s*:/i.test(l)) { moral = l.replace(/^moral\s*:\s*/i, "").trim(); return false; }
    return true;
  });
  const title = kept.length ? kept[0] : "";
  const body = kept.slice(1).join("\n\n") || kept.join("\n\n");
  return { title, body: body.trim(), moral };
}

/**
 * Genera una historia NUEVA para escuchar (idioma meta, nivelada al MCER).
 * @param {object} unit - { title, level, language, vocab }
 * @returns {Promise<{title:string, body:string, moral:string}>}
 */
export async function generateStory(unit) {
  const level = unit?.level || "B1";
  const langName = STORY_LANGS[unit?.language || "en"] || "INGLES";
  const keywords = (unit?.vocab || []).slice(0, 8).map((v) => v.term).join(", ");
  const question =
    `Escribe UNICAMENTE un cuento corto en ${langName} sobre "${unit?.title || "la vida diaria"}", ` +
    `nivel ${level} (MCER), de 90 a 140 palabras, con inicio, nudo y desenlace claros. ` +
    (keywords ? `Usa de forma natural estas palabras: ${keywords}. ` : "") +
    `La primera linea es un titulo corto; luego 2 o 3 parrafos. NO uses markdown, listas ni traducciones. ` +
    `Este cuento se LEERA EN VOZ ALTA para un ejercicio de comprension auditiva.`;
  // mode:"class" -> OpenAI (gpt-4o-mini): Gemini (mode:"story") TRUNCA la salida
  // a ~120 chars por el "thinking" del modelo. OpenAI respeta la longitud y la
  // instruccion. immersive:false evita el protocolo SAY/TIP de clase.
  const answer = await askWorker({
    question, mode: "class", immersive: false,
    topic: unit?.title, level, targetLang: unit?.language || "en",
  });
  return sanitizeStory(answer);
}

/** Extrae y valida un array JSON de preguntas de un texto (defensivo).
 * Rescata objetos completos aunque el JSON venga TRUNCADO (tope de tokens). */
export function parseQuestions(text) {
  let t = String(text || "").trim()
    .replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
  const start = t.indexOf("[");
  const end = t.lastIndexOf("]");
  if (start >= 0 && end > start) t = t.slice(start, end + 1);
  else if (start >= 0) t = t.slice(start); // sin "]" -> vino truncado

  let arr = null;
  try { arr = JSON.parse(t); } catch { /* intentamos rescatar abajo */ }
  if (!Array.isArray(arr)) {
    // Rescate: parsea objeto por objeto (nuestros objetos no anidan llaves),
    // ignorando el ultimo si quedo incompleto por truncamiento.
    arr = [];
    for (const m of t.matchAll(/\{[^{}]*\}/g)) {
      try { arr.push(JSON.parse(m[0])); } catch { /* salta el roto */ }
    }
  }
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const raw of arr) {
    if (!raw || typeof raw !== "object") continue;
    const q = String(raw.q || raw.question || "").trim();
    const choices = Array.isArray(raw.choices || raw.options)
      ? (raw.choices || raw.options).map((c) => String(c).trim()).filter(Boolean)
      : [];
    let answer = Number(raw.answer);
    if (!Number.isInteger(answer)) answer = 0;
    if (!q || choices.length < 2) continue;
    if (answer < 0 || answer >= choices.length) answer = 0;
    out.push({ q, choices, answer, explain: String(raw.explain || "").trim() });
  }
  return out.slice(0, 8);
}

/**
 * Genera 8 preguntas de comprension (facil -> dificil) sobre una historia.
 * @param {object} p - { story, level, targetLang }
 * @returns {Promise<Array<{q,choices,answer,explain}>>}
 */
export async function generateQuestions({ story, level = "B1", targetLang = "en" }) {
  const langName = STORY_LANGS[targetLang] || "INGLES";
  const history = [
    { role: "user", text: "Esta es la historia (en " + langName + ") de un ejercicio de listening:" },
    { role: "model", text: String(story || "").slice(0, 1200) },
  ];
  const question =
    "Con base en LA HISTORIA anterior, crea EXACTAMENTE 8 preguntas de comprension auditiva de opcion multiple, " +
    "ordenadas de FACIL a DIFICIL (las primeras sobre datos explicitos; las ultimas de inferencia). " +
    "Responde SOLO con un array JSON COMPACTO (en UNA sola linea, SIN saltos de linea ni espacios innecesarios), " +
    "SIN texto extra y SIN markdown. Cada elemento debe ser: " +
    '{"q":"pregunta en espanol","choices":["op1","op2","op3"],"answer":indice 0-2 de la correcta,' +
    '"explain":"explicacion muy breve en espanol (max 8 palabras)"}. Las preguntas y opciones van en ESPANOL. ' +
    "Se conciso para que quepan las 8 preguntas.";
  // mode:"class" -> el Worker usa OpenAI (gpt-4o-mini): NO trunca como Gemini en
  // salidas estructuradas y obedece mejor el JSON. immersive:false + targetLang
  // "es" evitan el protocolo SAY/TIP (queremos JSON en espanol, no clase hablada).
  const answer = await askWorker({
    question, history, level, targetLang: "es", mode: "class", immersive: false,
  });
  const qs = parseQuestions(answer);
  if (qs.length < 4) throw new Error("La IA no devolvio suficientes preguntas. Intenta de nuevo.");
  return qs;
}

/**
 * Genera historia + preguntas de una vez (lo que consume el Listening Lab).
 * @returns {Promise<{story:{title,body,moral}, questions:Array}>}
 */
export async function generateListening(unit) {
  const story = await generateStory(unit);
  if (!story.body) throw new Error("La IA no genero una historia. Intenta de nuevo.");
  const questions = await generateQuestions({
    story: story.body,
    level: unit?.level || "B1",
    targetLang: unit?.language || "en",
  });
  return { story, questions };
}
