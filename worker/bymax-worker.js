/**
 * bymax-worker.js — Cloudflare Worker: cerebro de Bymax (chat IA + voz).
 *
 * Dos endpoints (ambos POST):
 *   /       -> CHAT con Gemini (responde dudas de ingles). Necesita el secret
 *              GEMINI_API_KEY.
 *   /tts    -> VOZ: texto -> audio (espanol nativo) usando Workers AI (MeloTTS).
 *              Necesita el binding "AI" (Workers AI). GRATIS, sin key extra.
 *
 * El navegador nunca ve claves: viven aqui como secret/binding.
 * Despliegue: ver README.md en esta carpeta.
 */

const MODEL = "gemini-2.0-flash";
const TTS_MODEL = "@cf/myshell-ai/melotts";        // multilingue (espanol)
const TTS_MODEL_EN = "@cf/deepgram/aura-1";         // ingles MUY natural (humano)
// Voces Aura permitidas (para dar voz distinta a cada persona del dialogo).
const AURA_VOICES = new Set([
  "asteria", "luna", "stella", "athena", "hera",
  "orion", "arcas", "perseus", "angus", "orpheus", "helios", "zeus",
]);

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

// Convierte cualquier salida de audio (base64 string, ArrayBuffer, Response o
// ReadableStream) a base64 para mandarlo como JSON al navegador.
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
  if (out && typeof out.audio === "string") return out.audio;       // melotts
  if (out instanceof ArrayBuffer) return abToBase64(out);
  if (typeof Response !== "undefined" && out instanceof Response) return abToBase64(await out.arrayBuffer());
  if (typeof ReadableStream !== "undefined" && out instanceof ReadableStream) return abToBase64(await new Response(out).arrayBuffer());
  if (out && out.audio instanceof ArrayBuffer) return abToBase64(out.audio);
  return null;
}

// Divide texto largo en trozos <= max chars (Google TTS limita ~200 por peticion).
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

// Escapa texto para meterlo en SSML/XML.
function escapeXml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

// Voz NEURAL humana (Microsoft Edge TTS) via WebSocket. GRATIS, sin key.
// voice ej: "es-MX-DaliaNeural" (latino), "en-US-AriaNeural". xmlLang ej "es-MX".
async function edgeTts(text, voice, xmlLang) {
  const TRUSTED = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  const url = "wss://speech.platform.bing.com/consumer/speech/synthesize/" +
    "readaloud/edge/v1?TrustedClientToken=" + TRUSTED;
  const resp = await fetch(url, { headers: { Upgrade: "websocket" } });
  const ws = resp.webSocket;
  if (!ws) throw new Error("edge sin websocket");
  ws.accept();

  const chunks = [];
  const done = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("edge timeout")), 15000);
    ws.addEventListener("message", (ev) => {
      if (typeof ev.data === "string") {
        if (ev.data.includes("Path:turn.end")) { clearTimeout(timer); resolve(); }
      } else {
        const buf = new Uint8Array(ev.data);
        const headerLen = (buf[0] << 8) | buf[1];
        const audio = buf.slice(2 + headerLen);
        if (audio.length) chunks.push(audio);
      }
    });
    ws.addEventListener("close", () => { clearTimeout(timer); resolve(); });
    ws.addEventListener("error", () => { clearTimeout(timer); reject(new Error("edge ws error")); });
  });

  const now = new Date().toString();
  const reqId = (crypto.randomUUID ? crypto.randomUUID() : "id" + Date.now()).replace(/-/g, "");
  ws.send(
    "X-Timestamp:" + now + "\r\nContent-Type:application/json; charset=utf-8\r\n" +
    "Path:speech.config\r\n\r\n" +
    JSON.stringify({ context: { synthesis: { audio: {
      metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: false },
      outputFormat: "audio-24khz-48kbitrate-mono-mp3",
    } } } })
  );
  const ssml = "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='" +
    xmlLang + "'><voice name='" + voice + "'><prosody rate='-4%'>" +
    escapeXml(text) + "</prosody></voice></speak>";
  ws.send(
    "X-RequestId:" + reqId + "\r\nContent-Type:application/ssml+xml\r\n" +
    "X-Timestamp:" + now + "\r\nPath:ssml\r\n\r\n" + ssml
  );

  await done;
  try { ws.close(); } catch { /* ignore */ }
  let total = 0;
  for (const c of chunks) total += c.length;
  if (!total) throw new Error("edge sin audio");
  const all = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { all.set(c, off); off += c.length; }
  return abToBase64(all.buffer);
}

// Espanol LATINO independiente del dispositivo via Google TTS. Concatena los mp3.
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

// ---- VOZ: texto -> audio (espanol latino / ingles humano) ----------------
async function handleTts(request, env, origin) {
  let body;
  try { body = await request.json(); }
  catch { return json({ error: "JSON invalido." }, 400, origin); }

  const text = String(body.text || "").slice(0, 600).trim();
  const lang = String(body.lang || "es").slice(0, 5);
  const voice = AURA_VOICES.has(body.voice) ? body.voice : "asteria";
  if (!text) return json({ error: "Sin texto." }, 400, origin);

  const isEn = lang.toLowerCase().startsWith("en");
  try {
    if (isEn) {
      if (!env.AI) return json({ error: "Falta el binding 'AI' (Workers AI)." }, 500, origin);
      // Ingles con voz humana (Aura).
      const out = await env.AI.run(TTS_MODEL_EN, { text, speaker: voice, encoding: "mp3" });
      const audio = await toBase64Audio(out);
      if (!audio) return json({ error: "TTS sin audio." }, 502, origin);
      return json({ audio }, 200, origin);
    }
    // ESPANOL -> voz neural humana latina (Edge, es-MX Dalia). Si falla, Google TTS.
    try {
      const audio = await edgeTts(text, "es-MX-DaliaNeural", "es-MX");
      if (audio) return json({ audio }, 200, origin);
    } catch (_) { /* fallback a google */ }
    const audio = await googleTts(text);
    if (!audio) return json({ error: "TTS sin audio." }, 502, origin);
    return json({ audio }, 200, origin);
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

  const userText = context
    ? `Contexto de la leccion actual: ${context}\n\nPregunta del alumno: ${question}`
    : `Pregunta del alumno: ${question}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: userText }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
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
