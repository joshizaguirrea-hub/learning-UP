// bymax-worker.js — Cloudflare Worker: cerebro de Bymax (chat IA + voz).
//
// Endpoints (POST):
//   /       -> CHAT con Gemini (secret GEMINI_API_KEY)
//   /tts    -> VOZ: texto -> audio
//              ESPANOL: Google Cloud TTS (voz latina natural, secret GOOGLE_TTS_KEY)
//                       fallback -> Google Translate TTS (robotico) si algo falla.
//              INGLES : Google Chirp3-HD (voz humana, con genero y velocidad) si
//                       hay GOOGLE_TTS_KEY; fallback -> Deepgram Aura (binding "AI").
//
// CACHE (opcional): si existe el binding KV "AUDIO_KV", cada audio generado se
// guarda por hash(lang+voice+text). Como los textos de la app son fijos, cada
// audio se genera UNA sola vez -> costo ~$0 y carga instantanea. Si el binding
// no existe, el Worker funciona igual (solo se salta el cache).

const MODEL = "gemini-flash-latest";   // alias rolling de Google al flash actual (2.0 y 2.5 bloqueados para cuentas nuevas)
const TTS_MODEL_EN = "@cf/deepgram/aura-1";         // ingles MUY natural (humano)
// Voces Aura permitidas (voz distinta a cada persona del dialogo).
const AURA_VOICES = new Set([
  "asteria", "luna", "stella", "athena", "hera",
  "orion", "arcas", "perseus", "angus", "orpheus", "helios", "zeus",
]);
// Voces espanol latino de Google Cloud, de MAS humana a mas segura.
// Chirp3-HD = lo mas natural (persona real). Neural2 = respaldo solido.
const GTTS_LANG = "es-US";
const GTTS_VOICES = ["es-US-Chirp3-HD-Aoede", "es-US-Neural2-A"];

const SYSTEM_PROMPT = `Eres "Bymax", un profesor de ingles amigable, futurista y motivador
dentro de una app llamada "Learning UP". Ayudas a hispanohablantes a aprender ingles.

REGLAS:
- Responde SIEMPRE en espanol claro y sencillo (el alumno esta aprendiendo).
- Se BREVE: 2 a 5 frases. Ve al grano, como un buen profe.
- Si citas ingles, ponlo entre comillas: "I would travel".
- Da ejemplos concretos cuando ayuden.
- Tono calido, con chispa, animando. Nunca reganas.
- Si la pregunta NO es sobre ingles/aprendizaje, redirige con amabilidad al tema.
- No inventes. Si no estas seguro, dilo y da la mejor guia posible.`;

// Modo CONVERSACION: Bymax es un companero de charla en INGLES, guiado por tema
// y nivel MCER. Inmersion real con ayuda en espanol si el alumno se traba.
const CONVERSATION_PROMPT = `Eres "Bymax", un companero de conversacion en INGLES dentro de
la app "Learning UP", para hispanohablantes que aprenden ingles. Esto es una
CONVERSACION REAL y guiada, no una clase de gramatica.

REGLAS:
- Conversa SIEMPRE en INGLES, ajustando la dificultad al nivel MCER del alumno
  (abajo): frases cortas y simples en A1-A2; mas ricas en B1-B2; naturales e
  idiomaticas en C1-C2.
- Manten el HILO de la charla sobre el tema indicado. Es una conversacion, no un
  interrogatorio: reacciona a lo que dice el alumno y luego haz UNA sola pregunta
  de seguimiento para que siga hablando.
- Se BREVE: 2 a 4 frases por turno.
- Si el alumno comete un error importante, primero responde con naturalidad a lo
  que dijo y luego agrega en una linea aparte "(tip: ...)" con la correccion
  amable. Ignora errores menores para no abrumar.
- Si el alumno se traba, escribe en espanol, o pide ayuda, dale una mano BREVE en
  espanol entre parentesis y sigue en ingles.
- El PRIMER mensaje del alumno sera "[BEGIN]": cuando lo veas, saluda con calidez
  en ingles, presenta el tema en una frase y haz la primera pregunta sencilla.
- Tono calido, alentador y con chispa. No rompas el personaje ni cambies de tema
  salvo que el alumno lo pida.`;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

// Convierte ArrayBuffer / Response / stream a base64 (para el audio de Aura).
function abToBase64(ab) {
  const bytes = new Uint8Array(ab);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

async function toBase64Audio(out) {
  if (out && typeof out.audio === "string") return out.audio;
  if (out instanceof ArrayBuffer) return abToBase64(out);
  if (typeof Response !== "undefined" && out instanceof Response) return abToBase64(await out.arrayBuffer());
  if (typeof ReadableStream !== "undefined" && out instanceof ReadableStream) return abToBase64(await new Response(out).arrayBuffer());
  if (out && out.audio instanceof ArrayBuffer) return abToBase64(out.audio);
  return null;
}

// ---- CACHE de audio (Cloudflare KV, opcional) ----------------------------
// Clave estable por (lang, voice, text). SHA-256 en hex, prefijo versionado
// para poder invalidar todo el cache cambiando "v1" si cambia la voz global.
async function cacheKey(lang, voice, text) {
  const raw = `${lang}|${voice}|${text}`;
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `tts:v2:${lang}:${hex}`;
}

// Divide texto largo en trozos <= max chars (Google Translate TTS limita ~200).
function splitForTts(text, max) {
  const out = [];
  let rest = String(text).trim();
  while (rest.length > max) {
    let cut = rest.lastIndexOf(". ", max);
    if (cut < 40) cut = rest.lastIndexOf(", ", max);
    if (cut < 40) cut = rest.lastIndexOf(" ", max);
    if (cut < 1) cut = max;
    out.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  if (rest) out.push(rest);
  return out;
}

// ESPANOL con voz NATURAL latina: Google Cloud Text-to-Speech.
// Intenta cada voz de GTTS_VOICES en orden (Chirp3-HD primero); usa la que funcione.
// Devuelve base64 mp3. Lanza error solo si TODAS fallan.
async function googleCloudTts(text, env, rate) {
  return gctts(text, env.GOOGLE_TTS_KEY, GTTS_LANG, GTTS_VOICES, rate);
}

// Google Cloud TTS generico (ES o EN). Prueba las voces en orden y usa la 1a que
// funcione. `rate` (0.5-1.5) ajusta la velocidad (titulos mas lentos = carino).
// Chirp3-HD soporta speakingRate; si una voz no lo acepta, reintenta sin rate.
async function gctts(text, key, langCode, voiceNames, rate) {
  if (!key) throw new Error("sin GOOGLE_TTS_KEY");
  const url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + key;
  const useRate = rate >= 0.5 && rate <= 1.5;
  let lastErr = "";
  for (const name of voiceNames) {
    for (const withRate of (useRate ? [true, false] : [false])) {
      const audioConfig = { audioEncoding: "MP3" };
      if (withRate) audioConfig.speakingRate = rate;
      const body = { input: { text }, voice: { languageCode: langCode, name }, audioConfig };
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (r.ok) {
        const data = await r.json();
        if (data.audioContent) return { audio: data.audioContent, voice: name };
        lastErr = "sin audioContent (" + name + ")";
        break; // sin audio: prueba la siguiente voz, no el mismo con/sin rate
      }
      lastErr = "gctts " + r.status + " " + (await r.text().catch(() => "")).slice(0, 120);
      // si fallo CON rate, el bucle interno reintenta SIN rate antes de rendirse.
    }
  }
  throw new Error(lastErr || "gctts fallo");
}

// Fallback espanol (robotico): Google Translate TTS. Concatena los mp3.
async function googleTts(text) {
  const chunks = splitForTts(text, 190);
  const parts = [];
  let total = 0;
  for (const c of chunks) {
    const url = "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=" + encodeURIComponent(c);
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://translate.google.com/",
      },
    });
    if (!r.ok) throw new Error("gtts " + r.status);
    const b = new Uint8Array(await r.arrayBuffer());
    parts.push(b); total += b.length;
  }
  const all = new Uint8Array(total);
  let off = 0;
  for (const b of parts) { all.set(b, off); off += b.length; }
  return abToBase64(all.buffer);
}

// ---- VOZ: texto -> audio -------------------------------------------------
async function handleTts(request, env, origin) {
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "JSON invalido." }, 400, origin); }

  const text = String(body.text || "").slice(0, 600).trim();
  const lang = String(body.lang || "es").slice(0, 5);
  const voice = AURA_VOICES.has(body.voice) ? body.voice : "asteria";
  // Voz Google Chirp3-HD ingles (Worker nuevo): solo se acepta el patron oficial.
  const voiceHd = typeof body.voiceHd === "string" && /^en-US-Chirp3-HD-[A-Za-z]+$/.test(body.voiceHd) ? body.voiceHd : "";
  const gender = body.gender === "M" ? "M" : "F";
  // Velocidad opcional (0.5-1.5). 0 = velocidad normal (no forzar).
  let rate = Number(body.rate);
  if (!(rate >= 0.5 && rate <= 1.5)) rate = 0;
  if (!text) return json({ error: "Sin texto." }, 400, origin);

  const isEn = lang.toLowerCase().startsWith("en");
  // Voz HD ingles efectiva: la pedida, o una por genero (para que TODO el ingles
  // suene humano por defecto, no solo los dialogos). Vacia si no hay clave Google.
  const hdEn = env.GOOGLE_TTS_KEY ? (voiceHd || (gender === "M" ? "en-US-Chirp3-HD-Charon" : "en-US-Chirp3-HD-Aoede")) : "";

  // 1) CACHE HIT: si hay binding KV y ya generamos este audio, lo servimos ya.
  //    La clave incluye la voz REAL usada (HD o Aura) y el rate (afectan el audio).
  const kv = env.AUDIO_KV;
  const keyVoice = (isEn ? (hdEn || voice) : "es") + "@" + (rate || "n");
  let key = null;
  if (kv) {
    try {
      key = await cacheKey(lang, keyVoice, text);
      const hit = await kv.get(key, { type: "json" });
      if (hit && hit.audio) {
        return json({ ...hit, cached: true }, 200, origin);
      }
    } catch { /* si el cache falla, seguimos generando normal */ }
  }

  // 2) Generar el audio (y, si hay KV, guardarlo para la proxima).
  const store = async (payload) => {
    if (kv && key && payload && payload.audio) {
      // 30 dias de TTL: texto fijo, pero deja que se refresque si cambia la voz.
      try { await kv.put(key, JSON.stringify(payload), { expirationTtl: 2592000 }); }
      catch { /* mejor sin cache que romper la respuesta */ }
    }
    return json(payload, 200, origin);
  };

  try {
    if (isEn) {
      // 1) Google Chirp3-HD ingles: voz humana, con genero y velocidad. Por
      //    defecto TODO el ingles usa Chirp3-HD (hdEn); Aura queda de respaldo.
      if (hdEn) {
        try {
          const gc = await gctts(text, env.GOOGLE_TTS_KEY, "en-US", [hdEn], rate);
          if (gc && gc.audio) return store({ audio: gc.audio, engine: "google-cloud-en", voice: gc.voice });
        } catch (e) { /* cae a Aura abajo */ }
      }
      // 2) Respaldo: Deepgram Aura (Workers AI).
      if (!env.AI) return json({ error: "Falta el binding 'AI' (Workers AI)." }, 500, origin);
      const out = await env.AI.run(TTS_MODEL_EN, { text, speaker: voice, encoding: "mp3" });
      const audio = await toBase64Audio(out);
      if (!audio) return json({ error: "TTS sin audio." }, 502, origin);
      return store({ audio, engine: "aura", voice });
    }
    // ESPANOL -> Google Cloud TTS (voz latina natural). Si falla, Google Translate.
    try {
      const gc = await googleCloudTts(text, env, rate);
      if (gc && gc.audio) return store({ audio: gc.audio, engine: "google-cloud", voice: gc.voice });
    } catch (e) {
      // Fallback robotico NO se cachea (para que reintente Chirp3-HD la proxima).
      return json({ audio: await googleTts(text), engine: "google", gcttsError: String(e).slice(0, 180) }, 200, origin);
    }
    const audio = await googleTts(text);
    if (!audio) return json({ error: "TTS sin audio." }, 502, origin);
    return json({ audio, engine: "google" }, 200, origin);
  } catch (e) {
    return json({ error: "TTS fallo.", detail: String(e).slice(0, 200) }, 502, origin);
  }
}

// ---- CHAT: dudas de ingles con Gemini ------------------------------------
async function handleChat(request, env, origin) {
  if (!env.GEMINI_API_KEY) {
    return json({ error: "Falta configurar GEMINI_API_KEY en el Worker." }, 500, origin);
  }
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "JSON invalido." }, 400, origin); }

  const question = String(body.question || "").slice(0, 800).trim();
  const context = String(body.context || "").slice(0, 600).trim();
  if (!question) return json({ error: "Escribe una pregunta." }, 400, origin);

  // MODO CONVERSACION: companero de charla en ingles guiado por tema + nivel.
  const isConversation = body.mode === "conversation";
  const topic = String(body.topic || "").slice(0, 160).trim();
  const level = String(body.level || "").slice(0, 4).trim();
  let systemText = isConversation ? CONVERSATION_PROMPT : SYSTEM_PROMPT;
  if (isConversation) {
    systemText += `\n\nTEMA de la conversacion: ${topic || "general"}` +
      `\nNIVEL del alumno (MCER): ${level || "B1"}`;
  }

  // MEMORIA DE CONVERSACION: el cliente manda los turnos previos en `history`
  // ([{role:"user"|"model", text}]). Reconstruimos el hilo para que Bymax
  // recuerde de que hablabamos. Guardrails (presupuesto $1): max 10 turnos y
  // ~6000 chars totales; textos largos se recortan. El contexto de la leccion
  // solo viaja en el 1er turno (ya vive en el historial despues) -> ahorra tokens.
  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const contents = [];
  let histChars = 0;
  for (const h of rawHistory.slice(-10)) {
    const role = h && h.role === "model" ? "model" : "user";
    const text = String((h && h.text) || "").slice(0, 1200).trim();
    if (!text) continue;
    histChars += text.length;
    contents.push({ role, parts: [{ text }] });
  }
  // Recorte por tamano total: soltamos los turnos mas viejos si nos pasamos.
  while (histChars > 6000 && contents.length > 1) {
    const dropped = contents.shift();
    histChars -= dropped.parts[0].text.length;
  }
  // Gemini exige que la conversacion empiece con un turno "user".
  while (contents.length && contents[0].role !== "user") contents.shift();

  // En conversacion el tema vive en el system prompt -> el turno va tal cual.
  // En tutoria, el contexto de la leccion se antepone a la pregunta.
  const userText = isConversation
    ? question
    : (context
        ? `Contexto de la leccion actual: ${context}\n\nPregunta del alumno: ${question}`
        : `Pregunta del alumno: ${question}`);
  contents.push({ role: "user", parts: [{ text: userText }] });

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
  const payload = {
    systemInstruction: { parts: [{ text: systemText }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
      // Gemini 2.5 "piensa" y ese pensamiento consume maxOutputTokens -> respuestas
      // cortadas. Lo apagamos: Bymax da respuestas breves, no necesita razonar hondo.
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return json({ error: "No se pudo contactar a Gemini." }, 502, origin);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return json({ error: "Gemini respondio con error.", status: res.status, detail: detail.slice(0, 300) }, 502, origin);
  }

  const data = await res.json().catch(() => null);
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!answer) return json({ error: "Bymax no pudo responder esta vez." }, 502, origin);

  return json({ answer }, 200, origin);
}

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const origin = request.headers.get("Origin") || allowed;
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Usa POST." }, 405, origin);
    }
    if (env.ALLOWED_ORIGIN && origin && !origin.startsWith(env.ALLOWED_ORIGIN)) {
      return json({ error: "Origen no permitido." }, 403, origin);
    }

    if (url.pathname === "/tts") return handleTts(request, env, origin);
    return handleChat(request, env, origin);
  },
};
