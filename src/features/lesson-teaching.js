/**
 * features/lesson-teaching.js — Bloques de "la CLASE" (contenido para leer).
 *
 * Capa de feature (presentacion). Aqui viven los bloques que muestran teoria:
 * lectura, glosario, frases clave, nota, dialogo y —sobre todo— las REGLAS de
 * gramatica, ahora con tabla comparativa, formula, ejemplos y errores comunes,
 * todo mas ordenado y bonito. Sin logica de negocio.
 */
import { el } from "../ui/dom.js";
import { speakButton } from "../ui/speech.js";
import { richText, stripMarkup } from "../ui/richtext.js";

const BOX = "bg-white/5 border border-white/5 rounded-xl p-4";
const H2 = "font-bold text-lg text-slate-100 flex items-center gap-2";

/** Chip-icono decorativo para encabezar cada bloque. */
function chip(emoji, tone = "bg-indigo-500/20 text-indigo-200") {
  return el("span", { class: "grid place-items-center w-8 h-8 rounded-xl text-lg shrink-0 " + tone, "aria-hidden": "true" }, emoji);
}

export function readingSection(text) {
  const paras = String(text).split(/\n\n+/);
  return el("section", {},
    el("div", { class: "flex items-center gap-2" },
      el("h2", { class: H2 }, chip("\uD83D\uDCD6"), "Lectura"),
      speakButton(stripMarkup(String(text).replace(/\n+/g, " ")))),
    el("div", { class: "mt-3 space-y-3" },
      ...paras.map((p) => el("p", { class: "text-slate-200 leading-relaxed " + BOX }, richText(p)))));
}

export function glossarySection(glossary) {
  return el("section", {},
    el("h2", { class: H2 }, chip("\uD83D\uDCDA"), "Glosario"),
    el("div", { class: "mt-3 rounded-xl border border-white/10 overflow-hidden" }, ...glossary.map((g, i) =>
      el("div", { class: "flex justify-between items-center gap-4 px-3 py-2 " + (i % 2 ? "bg-white/[0.03]" : "") },
        el("span", { class: "font-semibold text-slate-100 flex items-center gap-2" }, richText(g.term), speakButton(stripMarkup(g.term))),
        el("span", { class: "text-slate-400 text-right" }, g.translation)))));
}

export function keyPhrasesSection(phrases) {
  return el("section", {},
    el("h2", { class: H2 }, chip("\uD83D\uDCAC"), "Frases clave"),
    el("ul", { class: "mt-3 space-y-2" },
      ...phrases.map((p) => el("li", { class: "text-sm text-slate-300 flex items-center gap-2 " + BOX }, speakButton(stripMarkup(p)), richText(p)))));
}

export function noteSection(note) {
  return el("section", { class: "bg-amber-500/10 border border-amber-500/30 rounded-xl p-4" },
    el("h2", { class: "font-bold text-amber-300 flex items-center gap-2" }, chip("\uD83D\uDCA1", "bg-amber-500/20 text-amber-200"), "Nota de uso"),
    el("p", { class: "mt-2 text-sm text-amber-100" }, richText(note)));
}

export function dialogueSection(dialogue) {
  return el("section", {},
    el("h2", { class: H2 }, chip("\uD83C\uDFAD"), "Dialogo"),
    el("ul", { class: "mt-3 space-y-1 " + BOX + " text-slate-300 text-sm" },
      ...dialogue.map((line) => el("li", { class: "flex items-center gap-2" },
        speakButton(stripMarkup(line.replace(/^[A-Z]:\s*/, ""))), el("span", {}, richText(line))))));
}

/** Tabla comparativa opcional: { headers:[...], rows:[[...], ...] }. */
function grammarTable(table) {
  return el("div", { class: "mt-3 overflow-x-auto rounded-xl border border-white/10" },
    el("table", { class: "w-full text-sm border-collapse" },
      el("thead", {},
        el("tr", { class: "bg-indigo-500/25 text-indigo-100" },
          ...table.headers.map((h) => el("th", { class: "text-left font-bold px-3 py-2 whitespace-nowrap" }, richText(h))))),
      el("tbody", {},
        ...table.rows.map((row, ri) =>
          el("tr", { class: ri % 2 ? "bg-white/[0.03]" : "" },
            ...row.map((cell, ci) => el("td", {
              class: "px-3 py-2 align-top border-t border-white/5 " +
                (ci === 0 ? "font-semibold text-indigo-200 whitespace-nowrap" : "text-slate-200"),
            }, richText(cell))))))));
}

/**
 * Caja de gramatica REDISENADA: encabezado, formula, tabla comparativa,
 * ejemplos (tarjetas con audio) y errores comunes (antes/despues).
 */
export function grammarBox(g) {
  return el("section", { class: "border border-indigo-500/30 bg-indigo-500/10 rounded-2xl p-5" },
    el("div", { class: "flex items-center gap-2" },
      chip("\u2728"),
      el("div", {},
        el("p", { class: "text-[11px] uppercase tracking-widest text-indigo-300/80" }, "Las reglas"),
        el("h2", { class: "font-bold text-lg text-indigo-100 leading-tight" }, g.title))),

    g.form ? el("div", { class: "mt-4" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-slate-400 mb-1" }, "Formula"),
      el("p", { class: "font-mono text-sm text-indigo-100 bg-slate-950/50 border border-white/10 rounded-lg px-3 py-2" }, richText(g.form))) : null,

    g.table?.headers?.length ? el("div", { class: "mt-4" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-slate-400 mb-1" }, "Comparacion"),
      grammarTable(g.table)) : null,

    g.examples?.length ? el("div", { class: "mt-4" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-slate-400 mb-1" }, "Ejemplos"),
      el("ul", { class: "space-y-1.5" },
        ...g.examples.map((ex) => el("li", {
          class: "text-sm text-slate-200 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2",
        }, speakButton(stripMarkup(ex)), richText(ex))))) : null,

    g.mistakes?.length ? el("div", { class: "mt-4" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-slate-400 mb-1" }, "Errores comunes"),
      el("ul", { class: "space-y-1.5" }, ...g.mistakes.map((m) =>
        el("li", { class: "text-sm flex flex-wrap items-center gap-x-2 gap-y-0.5 bg-white/5 rounded-lg px-3 py-2" },
          el("span", { class: "text-red-300/90 line-through" }, m.wrong),
          el("span", { class: "text-emerald-400 font-bold" }, "\u2192"),
          el("span", { class: "text-emerald-300 font-semibold" }, m.right))))) : null);
}
