/**
 * ui/example-card.js — Tarjeta de un ejemplo de uso: audio + frase (con
 * resaltado opcional *palabra*) + traduccion debajo.
 *
 * Reutilizada por vocab-class.js y bonus.js para que los ejemplos generados
 * por IA ("Ejemplos en contexto") se vean EXACTAMENTE igual que los ejemplos
 * curados de la unidad ("Ejemplos de uso") -- antes los de IA eran un solo
 * bloque de texto plano sin separar. Pedido directo del alumno: "que se
 * dividan en cuadritos individuales con colores llamativos senalando el
 * verbo". El resaltado usa el marcado *palabra* que ya existe en
 * ui/richtext.js (mismo verde que resalta verbos en el resto del curso -- no
 * se inventa un esquema de colores nuevo, se reusa el que el alumno ya
 * reconoce de las lecciones).
 */
import { el } from "./dom.js";
import { speakButton } from "./speech.js";
import { richText, stripMarkup } from "./richtext.js";

/**
 * @param {object} item - { phrase, translation } (phrase puede traer *resaltado*)
 * @param {string} [lang] - idioma de la voz (BCP-47 o base, ver unitTts/micCode)
 * @returns {HTMLElement}
 */
export function exampleCard({ phrase, translation }, lang) {
  return el("div", { class: "rounded-lg bg-slate-900/50 border border-slate-700/60 p-3" },
    el("div", { class: "flex items-center gap-2" },
      speakButton(stripMarkup(phrase), { lang }),
      el("p", { class: "text-lg text-slate-100" }, richText(phrase))),
    translation ? el("p", { class: "mt-1 text-sm text-slate-400 pl-9" }, translation) : null);
}
