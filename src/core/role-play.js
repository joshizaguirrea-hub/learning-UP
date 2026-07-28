/**
 * core/role-play.js — Motor PURO del Reading role-play (dialogo interpretado).
 *
 * Convierte un pasaje-dialogo ("A: ... B: ...") en una obra a dos voces: el
 * alumno INTERPRETA un personaje (lee su linea en voz alta con entonacion) y
 * Bymax hace el otro. Aqui solo se parsea el dialogo, se asignan roles y se
 * puntua cada linea (reusando gradeDictation). Sin DOM ni red -> testeable.
 */
import { gradeDictation, sessionScore } from "./dictogloss.js";

export { sessionScore };

/**
 * Parte un pasaje en turnos de dialogo. Reconoce etiquetas de hablante al
 * inicio o tras un espacio: "A:", "B:", "Maria:"... (mayuscula inicial, <=15
 * letras). Soporta varios turnos en una misma linea ("A: Hi. B: Hello").
 * @param {string} text
 * @returns {Array<{speaker:string, line:string}>}
 */
export function parseDialogue(text) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  if (!t) return [];
  const re = /(^|\s)([A-Z][A-Za-z]{0,14}):\s*/g;
  const marks = [];
  let m;
  while ((m = re.exec(t))) {
    marks.push({ speaker: m[2], lineStart: re.lastIndex });
    // guarda tambien donde empieza la etiqueta (para cortar el turno anterior)
    marks[marks.length - 1].labelStart = m.index + m[1].length;
  }
  if (marks.length < 2) return [];
  const turns = [];
  for (let i = 0; i < marks.length; i++) {
    const end = i + 1 < marks.length ? marks[i + 1].labelStart : t.length;
    const line = t.slice(marks[i].lineStart, end).trim();
    if (line) turns.push({ speaker: marks[i].speaker, line });
  }
  return turns;
}

/** Hablantes unicos en orden de aparicion. */
export function dialogueSpeakers(turns) {
  const seen = [];
  for (const t of turns || []) if (!seen.includes(t.speaker)) seen.push(t.speaker);
  return seen;
}

/** True si el texto es un dialogo utilizable (>=2 turnos, 2-6 hablantes). */
export function isDialogue(text) {
  const turns = parseDialogue(text);
  const speakers = dialogueSpeakers(turns);
  return turns.length >= 2 && speakers.length >= 2 && speakers.length <= 6;
}

/**
 * Marca cada turno con isUser segun el personaje elegido por el alumno.
 * @param {Array} turns
 * @param {string} userSpeaker
 * @returns {Array<{speaker, line, isUser:boolean}>}
 */
export function buildScript(turns, userSpeaker) {
  return (turns || []).map((t) => ({ ...t, isUser: t.speaker === userSpeaker }));
}

/**
 * Puntua una linea dicha vs la linea objetivo (reusa gradeDictation).
 * @returns {{pct:number, marks:Array, missing:string[]}}
 */
export function scoreLine(target, said) {
  const g = gradeDictation(target, said);
  return { pct: Math.round(g.score * 100), marks: g.marks, missing: g.missing };
}
