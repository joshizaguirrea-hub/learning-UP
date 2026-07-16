/**
 * features/lesson-teaching.js — Bloques de "la CLASE" (contenido para leer).
 *
 * Capa de feature (presentacion). Aqui viven los bloques que muestran teoria:
 * lectura, glosario, frases clave, nota, dialogo y —sobre todo— las REGLAS de
 * gramatica, ahora con tabla comparativa, formula, ejemplos y errores comunes,
 * todo mas ordenado y bonito. Sin logica de negocio.
 */
import { el } from "../ui/dom.js";
import { speakButton, speakSequence } from "../ui/speech.js";
import { ICONS } from "../ui/icons.js";
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
  const blocks = String(text).split(/\n\n+/).map((para) => {
    const lines = para.split(/\n/);
    const tm = (lines[0] || "").match(/^TEXT\s*\d*\s*[-\u2013]\s*(.+)$/i);
    const title = tm ? tm[1].trim() : null;
    const body = lines.slice(tm ? 1 : 0).join(" ").trim();
    return { title, body };
  });
  return el("section", {},
    el("div", { class: "flex items-center gap-2" },
      el("h2", { class: H2 }, chip("\uD83D\uDCD6"), "Lectura"),
      playSeqButton(() => readingItems(text))),
    el("div", { class: "mt-3 space-y-4" }, ...blocks.map(renderReadingBlock)));
}

/** Render de un bloque de lectura: titulo + (dialogo con nombres | narracion). */
function renderReadingBlock(b) {
  const children = [];
  if (b.title) children.push(el("p", { class: "font-bold text-indigo-200 mb-1" }, b.title));
  if (b.body && hasDialog(b.body)) {
    const turns = parseDialogTurns(b.body);
    const cast = buildCast(turns, b.body);
    children.push(el("ul", { class: "space-y-1 text-slate-200 text-sm" },
      ...turns.map((t) => {
        const who = t.speaker ? (cast.names[t.speaker] || t.speaker) : "";
        return el("li", { class: "flex items-start gap-2" },
          playSeqButton(() => [turnItem(t, cast)]),
          el("span", {},
            who ? el("span", { class: "font-semibold text-indigo-200" }, who + ": ") : null,
            richText(t.line)));
      })));
  } else if (b.body) {
    children.push(el("p", { class: "text-slate-200 leading-relaxed" }, richText(b.body)));
  }
  return el("div", { class: BOX }, ...children);
}

// Nombres para los interlocutores de un dialogo. Se asignan de forma
// determinista por texto (mismo texto -> mismos nombres; textos distintos ->
// nombres distintos) para dar variedad sin perder consistencia.
const NAME_POOL = [
  "Mar\u00eda", "Joshua", "Daniel", "Oscar", "Sonia", "Alessandro", "Geo",
  "Adrian", "Kristel", "Gaby", "Jenny", "Meribeth", "Stephanie", "Zoe",
  "Megan", "Mau", "Valeria", "Sophia", "Paula",
];

// Genero de cada nombre (F = femenino, M = masculino) para elegir una voz que
// SUENE al personaje (antes se asignaba por turno y salia un hombre por Meribeth).
const NAME_GENDER = {
  "Mar\u00eda": "F", Joshua: "M", Daniel: "M", Oscar: "M", Sonia: "F",
  Alessandro: "M", Geo: "M", Adrian: "M", Kristel: "F", Gaby: "F", Jenny: "F",
  Meribeth: "F", Stephanie: "F", Zoe: "F", Megan: "F", Mau: "M", Valeria: "F",
  Sophia: "F", Paula: "F",
};

// Voces por genero. `aura` = Deepgram Aura (Worker actual). `hd` = Google
// Chirp3-HD ingles (Worker nuevo, mas humano). Se emparejan por indice para dar
// una voz DISTINTA a cada persona del mismo genero.
const VOICES = {
  F: {
    aura: ["asteria", "luna", "stella", "athena", "hera"],
    hd: ["en-US-Chirp3-HD-Aoede", "en-US-Chirp3-HD-Kore", "en-US-Chirp3-HD-Leda", "en-US-Chirp3-HD-Zephyr", "en-US-Chirp3-HD-Aoede"],
  },
  M: {
    aura: ["orion", "arcas", "perseus", "angus", "orpheus"],
    hd: ["en-US-Chirp3-HD-Charon", "en-US-Chirp3-HD-Fenrir", "en-US-Chirp3-HD-Orus", "en-US-Chirp3-HD-Puck", "en-US-Chirp3-HD-Charon"],
  },
};

/** Hash estable de un texto (para elegir nombres de forma reproducible). */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Reparte NOMBRES y VOCES a cada interlocutor segun el texto (determinista).
 * Devuelve { names: {A:'Sonia',...}, voices: {A:{voice,voiceHd,gender},...} }.
 * La voz se elige por el GENERO del nombre, distinta a cada persona.
 */
function buildCast(turns, seed) {
  const speakers = [...new Set(turns.map((t) => t.speaker).filter(Boolean))];
  const h = hashStr(seed);
  const names = {};
  const voices = {};
  const used = new Set();
  const gCount = { F: 0, M: 0 };
  speakers.forEach((sp, idx) => {
    let i = (h + idx * 7) % NAME_POOL.length;
    while (used.has(NAME_POOL[i])) i = (i + 1) % NAME_POOL.length;
    used.add(NAME_POOL[i]);
    const name = NAME_POOL[i];
    names[sp] = name;
    const g = NAME_GENDER[name] || "F";
    const slot = gCount[g]++ % VOICES[g].aura.length;
    voices[sp] = { voice: VOICES[g].aura[slot], voiceHd: VOICES[g].hd[slot], gender: g };
  });
  return { names, voices };
}

/** True si el texto trae marcas de dialogo tipo "A: ... B: ...". */
function hasDialog(text) { return /\b[A-D]:\s/.test(text); }

/** Separa "A: .. B: .. A: .." en turnos { speaker, line }. */
function parseDialogTurns(text) {
  return String(text).split(/\s*(?=\b[A-D]:\s)/).map((s) => s.trim()).filter(Boolean)
    .map((ch) => {
      const m = ch.match(/^([A-D]):\s*(.*)$/s);
      return m ? { speaker: m[1], line: m[2].trim() } : { speaker: null, line: ch };
    });
}

/** Un turno -> item de voz con nombre (pausa tras el nombre) y voz por genero. */
function turnItem(t, cast) {
  const who = t.speaker ? (cast.names[t.speaker] || t.speaker) : "";
  const text = who ? who + ". " + t.line : t.line; // el punto crea la pausa
  const v = (cast.voices && t.speaker && cast.voices[t.speaker]) || {};
  return {
    text, lang: "en-US",
    opts: { rate: 0.86, voice: v.voice, voiceHd: v.voiceHd, gender: v.gender }, // ingles PAUSADO
    gapAfter: 380, // mas aire entre turnos (no atropellado)
  };
}

/**
 * Convierte un texto de lectura en items para speakSequence:
 *   - Titulo se dice solo, con pausa breve.
 *   - La narracion va COMPLETA en un item (la voz pone las pausas naturales
 *     dentro -> suena fluido y claro, no cortado).
 *   - Los dialogos se leen turno por turno con nombres y pausa breve.
 */
function readingItems(text) {
  const items = [];
  for (const para of String(text).split(/\n\n+/)) {
    const lines = para.split(/\n/);
    let bodyStart = 0;
    const tm = (lines[0] || "").match(/^TEXT\s*\d*\s*[-\u2013]\s*(.+)$/i);
    if (tm) {
      // Titulo: mas LENTO y con calma (con carino), no corriendo. gapAfter largo.
      items.push({ text: tm[1].trim(), lang: "en-US", opts: { rate: 0.8, pitch: 1.04, gender: "F" }, gapAfter: 500 });
      bodyStart = 1;
    }
    const body = lines.slice(bodyStart).join(" ").trim();
    if (!body) continue;
    if (hasDialog(body)) {
      const turns = parseDialogTurns(body);
      const cast = buildCast(turns, body);
      for (const t of turns) items.push(turnItem(t, cast));
    } else {
      items.push({ text: body, lang: "en-US", opts: { rate: 0.85 }, gapAfter: 350 }); // narracion PAUSADA
    }
  }
  return items;
}

/** Boton de altavoz que reproduce una SECUENCIA (titulo/pausas/turnos). */
function playSeqButton(getItems, cls = "") {
  return el("button", {
    type: "button",
    class: "inline-flex items-center justify-center w-7 h-7 rounded-full text-indigo-300 " +
      "hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400 shrink-0 " + cls,
    "aria-label": "Escuchar todo", title: "Escuchar todo",
    onclick: (e) => { e.preventDefault(); e.stopPropagation(); speakSequence(getItems()); },
    html: ICONS.sound,
  });
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
  const turns = dialogue.map((line) => {
    const m = String(line).match(/^([A-D]):\s*(.*)$/s);
    return m ? { speaker: m[1], line: m[2].trim() } : { speaker: null, line: String(line) };
  });
  const cast = buildCast(turns, dialogue.join(" "));
  return el("section", {},
    el("div", { class: "flex items-center gap-2" },
      el("h2", { class: H2 }, chip("\uD83C\uDFAD"), "Dialogo"),
      playSeqButton(() => turns.map((t) => turnItem(t, cast)))),
    el("ul", { class: "mt-3 space-y-1 " + BOX + " text-slate-300 text-sm" },
      ...turns.map((t) => {
        const who = t.speaker ? (cast.names[t.speaker] || t.speaker) : "";
        return el("li", { class: "flex items-center gap-2" },
          playSeqButton(() => [turnItem(t, cast)]),
          el("span", {},
            who ? el("span", { class: "font-semibold text-indigo-200" }, who + ": ") : null,
            richText(t.line)));
      })));
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
      el("div", { class: "flex items-center gap-2 mb-0.5" },
        el("p", { class: "text-[11px] uppercase tracking-wide text-fuchsia-300/80" }, "\u00bfPara que sirve?"),
        speakButton(g.desc, { lang: "es-MX" })),
      el("p", { class: "text-sm text-slate-200 leading-relaxed" }, g.desc)) : null,

    g.rule ? el("div", { class: "mt-3 border-l-2 border-emerald-400/60 bg-emerald-500/5 rounded-r-lg px-3 py-2" },
      el("div", { class: "flex items-center gap-2 mb-0.5" },
        el("p", { class: "text-[11px] uppercase tracking-wide text-emerald-300/80" }, "\u00bfC\u00f3mo funciona?"),
        speakButton(g.rule, { lang: "es-MX" })),
      el("p", { class: "text-sm text-slate-200 leading-relaxed" }, richText(g.rule))) : null,

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
