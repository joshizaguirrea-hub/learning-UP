/**
 * features/grammar-sidebar.js — Panel lateral de referencia para la clase de
 * Gramatica a pantalla completa (ver features/skill-class.js, que lo arma, y
 * features/bymax-session.js, que lo pinta al lado del chat via cfg.sidebar).
 *
 * POR QUE: Joshua pidio que, al dar la clase de Gramatica, el ENFOQUE de la
 * clase (la regla que Megan esta ensenando), sus ejemplos/errores comunes, y
 * los VERBOS del tema de la unidad queden siempre a la vista -- con el mismo
 * lenguaje visual de tarjetas que ya usa el mazo de verbos (ui/example-card.js,
 * features/bonus.js) -- en vez de que el alumno tenga que recordarlos solo
 * por lo que Megan dijo en el chat.
 *
 * Logica de PRESENTACION pura: arma DOM a partir de datos que YA existen en
 * la leccion/unidad (lesson.grammar, data/topic-verb-decks.js). No llama a la
 * IA ni hace red -- es una referencia ESTATICA junto a un chat que si es vivo.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { richText, stripMarkup } from "../ui/richtext.js";
import { speakButton } from "../ui/speech.js";
import { topicVerbDeckFor } from "../data/topic-verb-decks.js";

/** Tarjeta contenedora: mismo lenguaje visual (sombra + borde indigo) que el
 * resto del reskin de Gramatica (ver ui/session-theme.js, tema "grammar"). */
function card(titleText, icon, ...children) {
  const kids = children.filter(Boolean);
  if (!kids.length) return null;
  return el("section", { class: "rounded-2xl bg-slate-900 border border-indigo-500/20 shadow-lg p-4" },
    el("div", { class: "flex items-center gap-2 mb-3" },
      el("span", { class: "w-5 h-5 text-indigo-300 shrink-0", html: icon }),
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300" }, titleText)),
    ...kids);
}

/** Una frase de ejemplo con audio + resaltado (verbo/foco, ver ui/richtext.js)
 * ya usado en grammar.examples de las unidades (ver data/units/work-career-b1.js). */
function exampleLine(text, lang) {
  return el("div", { class: "rounded-lg bg-slate-800/60 border border-slate-700/60 p-3 flex items-start gap-2" },
    speakButton(stripMarkup(text), { lang }),
    el("p", { class: "text-sm text-slate-100 leading-relaxed" }, richText(text)));
}

/** Un error comun: lo incorrecto tachado -> lo correcto en verde (mismo
 * lenguaje visual que features/notebook.js:errorCard). */
function mistakeLine(m) {
  if (!m?.wrong || !m?.right) return null;
  return el("div", { class: "rounded-lg bg-rose-500/5 border border-rose-500/20 p-2.5 text-sm" },
    el("span", { class: "line-through text-rose-300" }, m.wrong),
    el("span", { class: "mx-2 text-slate-500" }, "\u2192"),
    el("span", { class: "text-emerald-300 font-semibold" }, m.right));
}

/** Chip de un verbo del tema: base -> pasado / participio. */
function verbChip(item) {
  const forms = [item.past, item.participle].filter(Boolean).join(" / ");
  return el("div", { class: "rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2" },
    el("p", { class: "font-bold text-slate-100 text-sm" }, item.front),
    forms ? el("p", { class: "text-xs text-slate-400 mt-0.5" }, forms) : null);
}

/**
 * Arma el panel lateral de la clase de Gramatica.
 * @param {object} unit - unidad del curso (para los verbos del tema, ver
 *   data/topic-verb-decks.js)
 * @param {object} lesson - la leccion de gramatica (usa lesson.grammar)
 * @returns {HTMLElement}
 */
export function buildGrammarSidebar(unit, lesson) {
  const g = lesson?.grammar || {};
  const lang = unit?.language || "en";
  const deck = unit && topicVerbDeckFor(unit.id);

  const sections = [
    el("p", { class: "text-xs uppercase tracking-widest text-slate-500 px-1" }, "Tu guia de clase"),

    card("Enfoque de la clase", ICONS.grid,
      g.title ? el("p", { class: "font-bold text-slate-100" }, g.title) : null,
      g.rule ? el("p", { class: "mt-1.5 text-sm text-slate-300 leading-relaxed" }, richText(g.rule)) : null,
      g.form ? el("p", {
        class: "mt-2 text-xs font-mono text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-lg px-3 py-2",
      }, stripMarkup(g.form)) : null),

    (g.examples || []).length
      ? card("Ejemplos de la regla", ICONS.book,
          el("div", { class: "space-y-2" }, ...g.examples.map((ex) => exampleLine(ex, lang))))
      : null,

    (g.mistakes || []).length
      ? card("Errores comunes a evitar", ICONS.bulb,
          el("div", { class: "space-y-2" }, ...g.mistakes.map(mistakeLine).filter(Boolean)))
      : null,

    deck?.items?.length
      ? card("Verbos de este tema", ICONS.clock,
          el("p", { class: "text-xs text-slate-400 -mt-1 mb-1" }, "Base \u2192 pasado / participio"),
          el("div", { class: "grid grid-cols-2 gap-2" }, ...deck.items.map(verbChip)))
      : null,
  ].filter(Boolean);

  return el("div", { class: "flex flex-col gap-4" }, ...sections);
}
