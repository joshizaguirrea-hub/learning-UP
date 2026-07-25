/**
 * features/listening.js — Listening tipo VIDEOLLAMADA con Bymax.
 *
 * A diferencia de la conversacion (que muestra el texto), aqui Bymax HABLA y su
 * texto NO se muestra: el alumno debe ENTENDER de oido (comprension auditiva
 * real). Responde por microfono o, si el mic falla, ESCRIBIENDO. Reutiliza el
 * motor compartido (bymax-session.js) con la bandera hideBotText -> DRY.
 */
import { openBymaxSession } from "./bymax-session.js";
import { robotName } from "../ui/robot.js";

/**
 * Abre el Listening (videollamada) para una unidad.
 * @param {object} unit - unidad del curso { title, level }
 */
export function openListening(unit) {
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const name = robotName();
  openBymaxSession({
    mode: "conversation",   // charla guiada en ingles (voz)
    hideBotText: true,      // NO mostrar el texto: se entrena el OIDO
    topic, level,
    title: name + " \u00b7 Listening (videollamada)",
    subtitle: topic + " \u00b7 escucha y responde \u00b7 nivel " + level,
    placeholder: "Responde por voz, o escribe aqui si el mic falla...",
    ariaLabel: "Listening tipo videollamada con " + name,
  });
}
