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
import { robotName } from "../ui/robot.js";
import { openRuleExplainer } from "./rule-explainer.js";

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

// Paleta de temas para el cuadro visual de conjugacion (grammarChart).
const CHART_THEME = {
  green:  { border: "border-emerald-400/40", top: "bg-emerald-400/10", bottom: "bg-emerald-500/25", bottomAlt: "bg-emerald-500/40", text: "text-emerald-50" },
  amber:  { border: "border-amber-400/40",   top: "bg-amber-400/10",   bottom: "bg-amber-500/30",   bottomAlt: "bg-orange-500/50",  text: "text-amber-50" },
  sky:    { border: "border-sky-400/40",     top: "bg-sky-400/10",     bottom: "bg-sky-500/30",     bottomAlt: "bg-sky-500/50",    text: "text-sky-50" },
  violet: { border: "border-violet-400/40",  top: "bg-violet-400/10",  bottom: "bg-violet-500/30",  bottomAlt: "bg-fuchsia-500/45", text: "text-violet-50" },
  rose:   { border: "border-rose-400/40",    top: "bg-rose-400/10",    bottom: "bg-rose-500/30",    bottomAlt: "bg-rose-500/50",   text: "text-rose-50" },
  indigo: { border: "border-indigo-400/40",  top: "bg-indigo-400/10",  bottom: "bg-indigo-500/30",  bottomAlt: "bg-indigo-500/50", text: "text-indigo-50" },
};

/** Un segmento (una forma verbal + sus sujetos) dentro de un tiempo. */
function chartSegment(theme, form, subjects, i) {
  return el("div", { class: "flex-1 min-w-0 flex flex-col " + (i > 0 ? "border-l border-black/25" : "") },
    el("div", { class: "px-2 py-2 flex justify-center " + theme.top },
      el("span", { class: "bg-white text-slate-900 font-extrabold text-sm rounded px-2 py-0.5 whitespace-nowrap shadow-sm" }, form)),
    el("div", { class: "px-2 py-1.5 text-center text-[11px] font-semibold leading-snug " + (i % 2 ? theme.bottomAlt : theme.bottom) + " " + theme.text }, subjects));
}

/** Un tiempo verbal (ej. PASADO) con su fila de segmentos coloreados. */
function chartGroup(group) {
  const theme = CHART_THEME[group.color] || CHART_THEME.indigo;
  return el("div", {},
    el("p", { class: "text-center text-[11px] font-extrabold tracking-[0.2em] text-slate-400 mb-1" }, group.label),
    el("div", { class: "flex rounded-xl overflow-hidden border " + theme.border },
      ...group.forms.map((f, i) => chartSegment(theme, f.form, f.subjects, i))));
}

/**
 * Cuadro VISUAL de conjugacion (estilo poster educativo):
 *   { title, maps?, groups: [{ label, color, forms: [{form, subjects}] }] }
 * Ideal para verbos y tiempos (BE, going to vs will, etc.).
 */
export function grammarChart(chart) {
  return el("div", { class: "mt-2" },
    el("div", { class: "text-center mb-3 flex items-center justify-center gap-2 flex-wrap" },
      el("span", { class: "text-2xl font-extrabold text-slate-100" }, chart.title),
      chart.maps ? el("span", { class: "text-red-500 text-xl" }, "\u25B6") : null,
      chart.maps ? el("span", { class: "text-2xl font-extrabold text-slate-100" }, chart.maps) : null),
    el("div", { class: "space-y-4" }, ...chart.groups.map(chartGroup)));
}

/**
 * Caja de gramatica REDISENADA: encabezado, cuadro visual, formula, tabla
 * comparativa, ejemplos (con audio) y errores comunes (antes/despues).
 */
export function grammarBox(g, robotLang = "es-MX") {
  return el("section", { class: "border border-indigo-500/30 bg-indigo-500/10 rounded-2xl p-5" },
    el("div", { class: "flex items-center gap-2" },
      chip("\u2728"),
      el("div", {},
        el("p", { class: "text-[11px] uppercase tracking-widest text-indigo-300/80" }, "Las reglas"),
        el("h2", { class: "font-bold text-lg text-indigo-100 leading-tight" }, g.title))),

    g.desc ? el("div", { class: "mt-3 border-l-2 border-fuchsia-400/60 bg-fuchsia-500/5 rounded-r-lg px-3 py-2" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-fuchsia-300/80 mb-0.5" }, "\u00bfPara que sirve?"),
      el("p", { class: "text-sm text-slate-200 leading-relaxed" }, g.desc)) : null,

    (g.form || g.examples?.length) ? el("button", {
      class: "mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 " +
        "text-white font-semibold px-4 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400 shadow-lg shadow-indigo-900/40 transition active:scale-[0.98]",
      onclick: () => openRuleExplainer(g, robotLang),
    }, el("span", { class: "text-lg" }, "\uD83E\uDD16"), "Yo, " + robotName() + ", te explico la regla") : null,

    g.chart?.groups?.length ? el("div", { class: "mt-4" }, grammarChart(g.chart)) : null,

    g.form ? el("div", { class: "mt-4" },
      el("div", { class: "flex items-center gap-2 mb-1" },
        el("p", { class: "text-[11px] uppercase tracking-wide text-slate-400" }, "Formula"),
        speakButton(stripMarkup(g.form))),
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
