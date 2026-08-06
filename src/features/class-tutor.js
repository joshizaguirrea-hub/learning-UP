/**
 * features/class-tutor.js — CLASE 1 a 1 con Bymax (tutor privado, estilo Lerna).
 *
 * Envoltorio delgado sobre el motor compartido (features/bymax-session.js). A
 * diferencia de la conversacion libre, aqui Bymax DA LA CLASE: ensena en espanol,
 * hace practicar en ingles y CORRIGE AL INSTANTE (mode "class" en el Worker).
 */
import { openBymaxSession } from "./bymax-session.js";
import { robotName } from "../ui/robot.js";
import { languageByCode } from "../data/languages.js";

/**
 * Abre la clase 1 a 1 con Bymax para una unidad.
 * @param {object} unit - unidad del curso { title, subtitle, level }
 * @param {object} [user] - usuario actual (para guardar el cuaderno de errores)
 */
export function openClass(unit, user) {
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const name = robotName();
  const langName = languageByCode(unit?.language || "en")?.name || "Ingles";
  openBymaxSession({
    mode: "class",
    topic, level,
    targetLang: unit?.language || "en", // Bymax ensena en el idioma de la unidad
    unitId: unit?.id, unitTitle: unit?.title, userId: user?.id, // -> cuaderno de errores
    skill: "grammar", // clase general -> sus correcciones caen en la pestana Gramatica
    title: name + " \u00b7 Clase 1 a 1",
    subtitle: topic + " \u00b7 nivel " + level + " \u00b7 te corrige al instante",
    placeholder: "Responde en " + langName + " (o escribe/di 'ayuda')...",
    ariaLabel: "Clase 1 a 1 con " + name,
  });
}
