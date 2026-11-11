/**
 * ui/example-card.js — Tarjeta de un ejemplo de uso: audio + frase (con
 * resaltado opcional *palabra*) + traduccion + estructura gramatical.
 *
 * Reutilizada por vocab-class.js y bonus.js para que los ejemplos generados
 * por IA ("Ejemplos en contexto") se vean como tarjetas individuales, igual
 * que los ejemplos curados de la unidad ("Ejemplos de uso"). El resaltado
 * de la palabra/verbo objetivo usa el marcado *palabra* que ya existe en
 * ui/richtext.js (mismo verde que resalta verbos en el resto del curso).
 *
 * ESTRUCTURA (sujeto/verbo/objeto): pedido directo del alumno -- "quiero que
 * resaltes toda la estructura de la oracion a un lado explicando que es".
 * Se muestra como chips de colores debajo de la traduccion, a partir de un
 * string tipo "Sujeto = She | Verbo = applies (presente) | Objeto = for new
 * jobs" (ver core/ai-deepen.js: parseExampleItems). Si el modelo no manda
 * REGLA o ESTRUCTURA, esas partes simplemente no se pintan -- nunca se
 * inventa contenido que no vino.
 */
import { el } from "./dom.js";
import { speakButton } from "./speech.js";
import { richText, stripMarkup } from "./richtext.js";

// Colores por rol gramatical. Se detecta por palabra clave en el label (en
// espanol, como lo pide el prompt) -- si no matchea ninguno, usa gris neutro.
const ROLE_COLOR = [
  { test: /sujeto/i, cls: "bg-sky-500/15 text-sky-200 border-sky-400/30" },
  { test: /verbo/i, cls: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30" },
  { test: /objeto|complemento/i, cls: "bg-amber-500/15 text-amber-200 border-amber-400/30" },
];
const DEFAULT_ROLE_CLS = "bg-slate-700/40 text-slate-300 border-slate-600";

/** "Sujeto = She | Verbo = applies (presente)" -> chips de colores. */
function structureChips(structure) {
  const parts = String(structure || "").split("|").map((p) => p.trim()).filter(Boolean);
  if (!parts.length) return null;
  return el("div", { class: "mt-2 flex flex-wrap gap-1.5 pl-9" },
    ...parts.map((part) => {
      const eq = part.indexOf("=");
      const label = eq === -1 ? part : part.slice(0, eq).trim();
      const value = eq === -1 ? "" : part.slice(eq + 1).trim();
      const role = ROLE_COLOR.find((r) => r.test.test(label));
      return el("span", {
        class: "text-xs font-semibold px-2 py-1 rounded-full border " + (role?.cls || DEFAULT_ROLE_CLS),
      }, value ? `${label}: ${value}` : label);
    }));
}

/**
 * @param {object} item - { phrase, translation, structure?, rule? }
 *   phrase puede traer *resaltado*; structure/rule son opcionales.
 * @param {string} [lang] - idioma de la voz (BCP-47 o base, ver unitTts/micCode)
 * @returns {HTMLElement}
 */
export function exampleCard({ phrase, translation, structure, rule }, lang) {
  return el("div", { class: "rounded-lg bg-slate-900/50 border border-slate-700/60 p-3" },
    el("div", { class: "flex items-center gap-2" },
      speakButton(stripMarkup(phrase), { lang }),
      el("p", { class: "text-lg text-slate-100" }, richText(phrase))),
    translation ? el("p", { class: "mt-1 text-sm text-slate-400 pl-9" }, translation) : null,
    structureChips(structure),
    rule ? el("p", { class: "mt-1.5 pl-9 text-xs text-violet-300 italic" }, "\uD83D\uDCA1 " + rule) : null);
}
