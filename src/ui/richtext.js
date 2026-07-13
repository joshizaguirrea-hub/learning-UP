/**
 * ui/richtext.js — Marcado ligero para resaltar aprendizaje en el contenido.
 *
 * Convenio (dentro de cualquier texto de las unidades):
 *   *palabra*    -> VERBO que se aprende  (verde,  clase .hl-verb)
 *   **palabra**  -> FOCO / punto clave     (morado, clase .hl-focus)
 *
 * Devuelve nodos del DOM (no innerHTML) => seguro contra inyeccion. Asi las
 * unidades siguen siendo texto plano y el resaltado es opcional y progresivo.
 */
import { el } from "./dom.js";

// **foco** primero (mas especifico), luego *verbo*.
const RE = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;

/** Convierte texto con marcado en un DocumentFragment con spans de color. */
export function richText(text) {
  const frag = document.createDocumentFragment();
  const str = String(text ?? "");
  let last = 0;
  let m;
  RE.lastIndex = 0;
  while ((m = RE.exec(str)) !== null) {
    if (m.index > last) frag.append(document.createTextNode(str.slice(last, m.index)));
    if (m[1] !== undefined) frag.append(el("span", { class: "hl-focus" }, m[1]));
    else frag.append(el("span", { class: "hl-verb" }, m[2]));
    last = RE.lastIndex;
  }
  if (last < str.length) frag.append(document.createTextNode(str.slice(last)));
  return frag;
}

/** Quita el marcado (para TTS, aria-labels, etc.). */
export function stripMarkup(text) {
  return String(text ?? "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");
}
