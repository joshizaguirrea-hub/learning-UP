/**
 * services/bymax-ai.js — Cliente unico para hablar con el Worker de Bymax.
 *
 * DRY: un solo lugar que hace el fetch al Worker (chat/conversation/story...).
 * Devuelve SIEMPRE { answer, error } — nunca lanza — para que la UI decida.
 */
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";

/**
 * Pregunta a Bymax.
 * @param {object} p - { mode, topic, level, question, history }
 * @returns {Promise<{answer?:string, error?:string}>}
 */
export async function askBymax({ mode = "conversation", topic = "general", level = "B1", question, history = [] } = {}) {
  if (!bymaxAiEnabled) return { error: "Bymax IA no esta configurado (Worker inactivo)." };
  try {
    const res = await fetch(BYMAX_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, topic, level, question, history }),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.answer) return { answer: data.answer };
    const why = [data && data.error, data && data.detail, !res.ok && res.status].filter(Boolean).join(" | ");
    return { error: why || "No pude responder ahora." };
  } catch (err) {
    console.error("[bymax-ai] fallo de red:", err);
    return { error: "Sin conexion con Bymax IA." };
  }
}
