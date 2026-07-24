/**
 * features/class-tutor.js — CLASE 1 a 1 con Bymax (tutor privado, estilo Lerna).
 *
 * Envoltorio delgado sobre el motor compartido (features/bymax-session.js). A
 * diferencia de la conversacion libre, aqui Bymax DA LA CLASE: ensena en espanol,
 * hace practicar en ingles y CORRIGE AL INSTANTE (mode "class" en el Worker).
 */
import { openBymaxSession } from "./bymax-session.js";
import { robotName } from "../ui/robot.js";

/**
 * Abre la clase 1 a 1 con Bymax para una unidad.
 * @param {object} unit - unidad del curso { title, subtitle, level }
 */
export function openClass(unit) {
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const name = robotName();
  openBymaxSession({
    mode: "class",
    topic, level,
    title: name + " \u00b7 Clase 1 a 1",
    subtitle: topic + " \u00b7 nivel " + level + " \u00b7 te corrige al instante",
    placeholder: "Responde en ingles (o escribe/di 'ayuda')...",
    ariaLabel: "Clase 1 a 1 con " + name,
  });
}
