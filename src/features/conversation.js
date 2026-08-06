/**
 * features/conversation.js — Conversacion LIBRE con la IA (por unidad/tema).
 *
 * Envoltorio delgado sobre el motor compartido (features/bymax-session.js): abre
 * una charla en INGLES donde Bymax hace de companero de conversacion, guiado por
 * el TEMA de la unidad y el NIVEL MCER del alumno. Toda la mecanica (mascota viva,
 * microfono, voz bilingue, memoria) vive en el motor -> DRY.
 */
import { openBymaxSession } from "./bymax-session.js";
import { teacherName } from "../ui/robot.js";
import { languageName } from "../data/languages.js";

/**
 * Abre la conversacion libre con la IA para una unidad.
 * @param {object} unit - unidad del curso { title, subtitle, level }
 * @param {object} [user] - usuario actual (para guardar el cuaderno de errores)
 */
export function openConversation(unit, user) {
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const targetLang = unit?.language || "en"; // idioma META (no ingles fijo)
  const langLabel = languageName(targetLang).toLowerCase();
  const name = teacherName("speaking");
  openBymaxSession({
    mode: "conversation",
    role: "speaking",
    topic, level, targetLang,
    unitId: unit?.id, unitTitle: unit?.title, userId: user?.id, // -> cuaderno de errores
    skill: "speaking", // competencia -> pestana Speaking del cuaderno
    teacher: name,
    title: name + " \u00b7 " + topic,
    subtitle: "Practica hablando en " + langLabel + " \u00b7 nivel " + level,
    ariaLabel: "Conversacion con " + name,
  });
}
