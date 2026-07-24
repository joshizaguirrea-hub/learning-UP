/**
 * features/conversation.js — Conversacion LIBRE con la IA (por unidad/tema).
 *
 * Envoltorio delgado sobre el motor compartido (features/bymax-session.js): abre
 * una charla en INGLES donde Bymax hace de companero de conversacion, guiado por
 * el TEMA de la unidad y el NIVEL MCER del alumno. Toda la mecanica (mascota viva,
 * microfono, voz bilingue, memoria) vive en el motor -> DRY.
 */
import { openBymaxSession } from "./bymax-session.js";
import { robotName } from "../ui/robot.js";

/**
 * Abre la conversacion libre con la IA para una unidad.
 * @param {object} unit - unidad del curso { title, subtitle, level }
 */
export function openConversation(unit) {
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const name = robotName();
  openBymaxSession({
    mode: "conversation",
    topic, level,
    title: name + " \u00b7 " + topic,
    subtitle: "Practica hablando en ingles \u00b7 nivel " + level,
    ariaLabel: "Conversacion con " + name,
  });
}
