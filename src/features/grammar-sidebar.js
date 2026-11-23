/**
 * features/grammar-sidebar.js — Panel lateral de referencia para la clase de
 * Gramatica a pantalla completa (ver features/skill-class.js, que lo arma, y
 * features/bymax-session.js, que lo pinta al lado del chat via cfg.sidebar).
 *
 * POR QUE: Joshua pidio que, al dar la clase de Gramatica, el ENFOQUE de la
 * clase (la regla que Megan esta ensenando) y los VERBOS del tema de la
 * unidad queden siempre a la vista -- con el mismo lenguaje visual de
 * tarjetas que ya usa el mazo de verbos (ui/example-card.js,
 * features/bonus.js) -- en vez de que el alumno tenga que recordarlos solo
 * por lo que Megan dijo en el chat.
 *
 * SEGUNDO PEDIDO (real, de un alumno en vivo): "le digo al profe que no
 * entiendo esto, o no se como se dice por que no tengo el vocabulario -- que
 * agregues al lado derecho el vocabulario que vayamos a dar en la clase".
 * Dos fuentes de vocabulario conviven aqui:
 *   1. El vocabulario DE LA UNIDAD (estatico, ya autorado -- lo que "se va a
 *      dar en la clase"), via unitVocabulary() de core/unit-language.js.
 *   2. El vocabulario EN VIVO que Megan ensena sobre la marcha, cuando el
 *      alumno dice "no entiendo esto" -- ver `addVocab()` mas abajo y el
 *      protocolo "VOCAB:" en worker/bymax-worker.js + bymax-session.js.
 *
 * TERCER PEDIDO (ajuste, mismo alumno): "no tanto los errores comunes, eso
 * se puede preguntar" -- se quito esa tarjeta a proposito. Si el alumno la
 * necesita, se la pide a Megan por chat; no hace falta tenerla precargada
 * ocupando espacio que mejor se usa en vocabulario.
 *
 * Logica de PRESENTACION: la parte ESTATICA (vocab de la unidad, enfoque,
 * ejemplos, verbos) sale de datos que YA existen; la parte DINAMICA
 * (vocabulario en vivo) crece mientras dura la clase. No llama a la IA ni
 * hace red por si misma.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { richText, stripMarkup } from "../ui/richtext.js";
import { speakButton } from "../ui/speech.js";
import { topicVerbDeckFor } from "../data/topic-verb-decks.js";
import { unitVocabulary } from "../core/unit-language.js";
import { termDisplay, speakSource } from "../ui/bilingual-term.js";

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
    speakButton(speakSource(text, lang), { lang }),
    el("p", { class: "text-sm text-slate-100 leading-relaxed" }, termDisplay(text, lang)));
}

/** Chip de una palabra del vocabulario DE LA UNIDAD (estatico -- lo que "se
 * va a dar en la clase"). Mismo molde visual que verbChip. */
function unitVocabChip(term, translation, lang) {
  return el("div", { class: "flex items-center gap-2 rounded-lg bg-slate-800/60 border border-slate-700 p-2.5" },
    speakButton(speakSource(term, lang), { lang }),
    el("div", { class: "min-w-0" },
      el("p", { class: "font-semibold text-slate-100 text-sm truncate" }, termDisplay(term, lang)),
      translation ? el("p", { class: "text-xs text-slate-400 truncate" }, translation) : null));
}

/** Chip de un verbo del tema: base -> pasado / participio. */
function verbChip(item) {
  const forms = [item.past, item.participle].filter(Boolean).join(" / ");
  return el("div", { class: "rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2" },
    el("p", { class: "font-bold text-slate-100 text-sm" }, item.front),
    forms ? el("p", { class: "text-xs text-slate-400 mt-0.5" }, forms) : null);
}

/** Chip de una palabra NUEVA ensenada en vivo (distinto del verde de "done",
 * para distinguirla de las tarjetas estaticas de arriba). */
function liveVocabChip(term, translation, lang) {
  return el("div", { class: "flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 p-2.5" },
    speakButton(speakSource(term, lang), { lang }),
    el("div", { class: "min-w-0" },
      el("p", { class: "font-semibold text-emerald-200 text-sm truncate" }, termDisplay(term, lang)),
      translation ? el("p", { class: "text-xs text-slate-400 truncate" }, translation) : null));
}

/**
 * Arma el panel lateral de la clase de Gramatica.
 * @param {object} unit - unidad del curso (para los verbos del tema, ver
 *   data/topic-verb-decks.js)
 * @param {object} lesson - la leccion de gramatica (usa lesson.grammar)
 * @returns {{node: HTMLElement, addVocab: (term:string, translation?:string) => void}}
 *   `node` va directo a cfg.sidebar (ver features/skill-class.js); `addVocab`
 *   lo llama bymax-session.js cada vez que Megan ensena una palabra nueva
 *   (protocolo "VOCAB:", ver worker/bymax-worker.js).
 */
export function buildGrammarSidebar(unit, lesson) {
  const g = lesson?.grammar || {};
  const lang = unit?.language || "en";
  const deck = unit && topicVerbDeckFor(unit.id);

  // Seccion DINAMICA (vocabulario en vivo): arranca vacia/oculta -- no tiene
  // sentido mostrar una tarjeta "Vocabulario de la clase" en blanco antes de
  // que Megan ensene su primera palabra nueva.
  const liveVocabList = el("div", { class: "space-y-2" });
  const liveVocabSection = el("section", {
    class: "hidden rounded-2xl bg-slate-900 border border-emerald-500/25 shadow-lg p-4",
  },
    el("div", { class: "flex items-center gap-2 mb-1" },
      el("span", { class: "w-5 h-5 text-emerald-300 shrink-0", html: ICONS.bulb }),
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-emerald-300" }, "Vocabulario de la clase")),
    el("p", { class: "text-xs text-slate-500 mb-3" }, "Las palabras nuevas que Megan te explique van apareciendo aqui."),
    liveVocabList);

  /** Agrega una palabra nueva (la mas reciente, arriba) y muestra la tarjeta
   * si era la primera. Ignora llamadas sin palabra (defensivo). */
  function addVocab(term, translation) {
    const t = String(term || "").trim();
    if (!t) return;
    liveVocabSection.classList.remove("hidden");
    liveVocabList.prepend(liveVocabChip(t, String(translation || "").trim(), lang));
  }

  const sections = [
    el("p", { class: "text-xs uppercase tracking-widest text-slate-500 px-1" }, "Tu guia de clase"),

    liveVocabSection,

    (() => {
      const vocab = unitVocabulary(unit).slice(0, 14); // tope: que no sea una pared de chips
      return vocab.length
        ? card("Vocabulario de la unidad", ICONS.book,
            el("p", { class: "text-xs text-slate-400 -mt-1 mb-1" }, "Lo que vamos a usar en esta clase."),
            el("div", { class: "grid grid-cols-1 gap-2" }, ...vocab.map((v) => unitVocabChip(v.term, v.translation, lang))))
        : null;
    })(),

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

    deck?.items?.length
      ? card("Verbos de este tema", ICONS.clock,
          el("p", { class: "text-xs text-slate-400 -mt-1 mb-1" }, "Base \u2192 pasado / participio"),
          el("div", { class: "grid grid-cols-2 gap-2" }, ...deck.items.map(verbChip)))
      : null,
  ].filter(Boolean);

  return { node: el("div", { class: "flex flex-col gap-4" }, ...sections), addVocab };
}
