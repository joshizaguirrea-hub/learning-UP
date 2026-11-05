/**
 * features/idiom-comic.js — El mini-comic de 2 vinetas de un modismo.
 *
 * Panel 1 (el chiste): que dirian las palabras si las tradujeras literal, una
 * por una -- casi siempre absurdo. Panel 2 (la realidad): que significa DE
 * VERDAD. El salto entre ambas es el "aha" que hace que un modismo se quede
 * grabado, mucho mas que leer su traduccion sola.
 *
 * Se muestra como CONFIRMACION al acertar el juego de adivinanza (ver
 * features/flashcard-game.js, que orquesta la mecanica de las 3 opciones).
 */
import { el } from "../ui/dom.js";

/**
 * @param {{literal?:string, back:string}} item
 * @returns {HTMLElement|null} null si el item no tiene significado literal
 *   (mazos que no son de idioms, o un item sin ese dato).
 */
export function buildIdiomComic(item) {
  if (!item.literal) return null;
  return el("div", { class: "mt-3 grid sm:grid-cols-2 gap-3 text-left" },
    panel({ emoji: "\uD83D\uDE35", label: "Si lo traduces LITERAL...", text: item.literal, tone: "amber" }),
    panel({ emoji: "\u2728", label: "Pero en realidad significa...", text: item.back, tone: "emerald" }));
}

function panel({ emoji, label, text, tone }) {
  const tones = {
    amber: "border-amber-500/30 bg-amber-500/5",
    emerald: "border-emerald-500/30 bg-emerald-500/5",
  };
  return el("div", { class: "rounded-2xl border p-4 text-center " + (tones[tone] || tones.amber) },
    el("p", { class: "text-3xl", "aria-hidden": "true" }, emoji),
    el("p", { class: "mt-1 text-[10px] uppercase tracking-wide text-slate-500" }, label),
    el("p", { class: "mt-1 font-semibold text-slate-100 text-sm leading-snug" }, text));
}
