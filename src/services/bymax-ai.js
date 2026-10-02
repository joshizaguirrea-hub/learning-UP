/**
 * services/bymax-ai.js — Cliente unico para hablar con el Worker de los profes IA.
 *
 * DRY: un solo lugar que hace el fetch al Worker (chat/conversation/story...).
 * Devuelve SIEMPRE { answer, error } — nunca lanza — para que la UI decida.
 *
 * NOMBRES: "bymax" es el nombre INTERNO del motor. Hacia el alumno el profe se
 * llama Megan / Mathias / Susan segun el contexto, asi que SIEMPRE se manda
 * `teacher` al Worker: si no, la IA se presentaria con el nombre del motor.
 */
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";
import { getTeacherName } from "../ui/robot-prefs.js";

/**
 * Pregunta al profe IA.
 * @param {object} p - { mode, topic, level, question, history, role }
 *   `role`: "course" (Megan) | "speaking" (Mathias) | "interview" (Susan).
 * @returns {Promise<{answer?:string, error?:string}>}
 */
export async function askBymax({ mode = "conversation", topic = "general", level = "B1", question, history = [], targetLang = "en", role = "course", teacher } = {}) {
  if (!bymaxAiEnabled) return { error: "El profe con IA no esta disponible (Worker inactivo)." };
  try {
    const res = await fetch(BYMAX_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode, topic, level, question, history, targetLang,
        teacher: teacher || getTeacherName(role),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.answer) return { answer: data.answer };
    const why = [data && data.error, data && data.detail, !res.ok && res.status].filter(Boolean).join(" | ");
    return { error: why || "No pude responder ahora." };
  } catch (err) {
    console.error("[bymax-ai] fallo de red:", err);
    return { error: "Sin conexion con el profe IA." };
  }
}
