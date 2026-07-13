/**
 * bymax-worker.js — Cloudflare Worker: proxy seguro Gemini <-> Learning UP.
 *
 * Por que existe: Learning UP es un sitio ESTATICO (GitHub Pages). Si llamaramos
 * a Gemini directo desde el navegador, la API key quedaria EXPUESTA. Este Worker
 * corre en el servidor de Cloudflare, guarda la key como "secret" y solo
 * reenvia la pregunta del alumno a Gemini. El navegador nunca ve la key.
 *
 * DESPLIEGUE (ver README.md en esta carpeta):
 *   1) Crear el Worker en dash.cloudflare.com y pegar este archivo.
 *   2) Settings -> Variables -> Add secret:  GEMINI_API_KEY = tu_key_de_gemini
 *   3) (Opcional) ALLOWED_ORIGIN = https://TU-USUARIO.github.io  (candado CORS)
 */

// Modelo gratuito de Gemini (free-tier). Cambia aqui si sale uno nuevo.
const MODEL = "gemini-2.0-flash";

// La PERSONALIDAD de Bymax. Se le manda a Gemini en cada pregunta.
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

export default {
  async fetch(request, env) {
    const allowed = env.ALLOWED_ORIGIN || "*";
    const origin = request.headers.get("Origin") || allowed;

    // Preflight CORS.
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Usa POST." }, 405, origin);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: "Falta configurar GEMINI_API_KEY en el Worker." }, 500, origin);
    }
    // Candado opcional: si ALLOWED_ORIGIN esta puesto, solo tu app puede llamar.
    if (env.ALLOWED_ORIGIN && origin && !origin.startsWith(env.ALLOWED_ORIGIN)) {
      return json({ error: "Origen no permitido." }, 403, origin);
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
  },
};
