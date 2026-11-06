/**
 * features/verb-timeline.js — Linea de tiempo visual para un verbo (bonus decks).
 *
 * POR QUE
 * -------
 * Antes: el verbo se mostraba como palabra suelta + una fila plana de "chips"
 * (Base/Pasado/Participio) y las explicaciones de cada tiempo vivian en un
 * ACORDEON APARTE, en la columna derecha, sin ninguna conexion visual con el
 * verbo. El alumno tenia que saltar la vista entre "la palabra" y "la teoria".
 *
 * Primer intento (descartado): esconder pasado/participio detras de un boton
 * "Comprobar respuesta", como reto de memoria. Feedback directo del alumno:
 * eso no sirve para APRENDER un verbo nuevo, solo para poner a prueba algo que
 * ya viste. Aqui la meta es ENSENAR, no examinar: todo el contenido se muestra
 * de una sola vez. El "comprobar" de verdad vive en los 3 ejercicios de
 * core/verb-practice.js (cada uno con su propio boton), que SI exigen recordar.
 *
 * AHORA: una sola LINEA DE TIEMPO, siempre visible -> HOY (presente) -> AYER
 * (pasado) -> HASTA HOY (present perfect). Es la tecnica mas usada para
 * ensenar tiempos verbales: el eje temporal es intuitivo (el alumno YA
 * entiende "antes" y "ahora"), y cada forma se ancla a SU momento en vez de
 * flotar suelta. El conector entre nodos muestra la TRANSFORMACION (+ed /
 * irregular / have+participio), que es justo la parte que mas le cuesta
 * memorizar a un hispanohablante.
 *
 * CERO logica nueva: toda la explicacion sigue saliendo de core/verb-tips.js
 * (generateTips). Este modulo solo la REACOMODA en una linea de tiempo en vez
 * de un acordeon suelto -- "verlo de otra manera", no inventar contenido.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speakButton } from "../ui/speech.js";
import { generateTips } from "../core/verb-tips.js";

const findTip = (tips, title) => tips.find((t) => t.title === title) || null;

/** Chip de la flecha entre dos nodos: explica la TRANSFORMACION, no solo conecta. */
function transformChip(text, tone) {
  const tones = {
    warn: "bg-rose-500/15 text-rose-200 border-rose-500/30",
    ok: "bg-amber-500/15 text-amber-200 border-amber-500/30",
    perfect: "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/30",
  };
  return el("div", { class: "flex flex-col items-center gap-1 px-0.5 pt-3 shrink-0" },
    el("span", { class: "text-slate-600 text-lg leading-none", "aria-hidden": "true" }, "\u2192"),
    el("span", {
      class: "text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full border whitespace-nowrap " +
        (tones[tone] || tones.ok),
    }, text));
}

/** Un nodo revelado: icono + etiqueta temporal + palabra (con audio) + micro-explicacion. */
function stageNode(label, word, tip, lang) {
  const grad = tip?.grad || "from-slate-500 to-slate-700";
  return el("div", { class: "flex flex-col items-center gap-1.5 w-[9rem] sm:w-44 shrink-0" },
    el("div", {
      class: `w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} grid place-items-center text-white shadow-lg`,
      "aria-hidden": "true",
    }, el("span", { class: "w-6 h-6", html: ICONS[tip?.icon] || ICONS.clock })),
    el("p", { class: "text-xs font-black uppercase tracking-widest text-slate-500" }, label),
    el("div", { class: "flex items-center gap-1" },
      el("p", { class: "font-extrabold text-slate-100 text-lg sm:text-xl" }, word),
      speakButton(word, { cls: "w-6 h-6", lang })),
    tip ? el("p", { class: "text-sm text-slate-400 text-center leading-snug" }, tip.body) : null);
}

function ruleBanner(tip) {
  return el("div", {
    class: "rounded-xl bg-indigo-500/10 border border-indigo-500/30 px-4 py-3 text-base text-slate-100 text-center",
  }, tip.body);
}

function noteBanner(tip) {
  return el("div", {
    class: "mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-3 text-base text-slate-100 text-center",
  }, el("span", { class: "font-bold" }, "Tip: "), tip.body);
}

/**
 * Linea de tiempo completa, DESPUES de revelar. HOY -> AYER -> [HASTA HOY].
 * @param {object} item - { front, past?, participle?, back }
 * @param {object} [opts]
 * @param {string} [opts.lang] - idioma de la voz (audio de cada forma)
 * @returns {HTMLElement|null} null si el verbo no tiene pasado.
 */
export function buildVerbTimeline(item, { lang = "en-US" } = {}) {
  if (!item.past) return null;
  const tips = generateTips(item);
  const rule = findTip(tips, "La regla");
  const presente = findTip(tips, "Presente simple");
  const pasado = findTip(tips, "Pasado simple");
  const perfecto = findTip(tips, "Present perfect");
  const nota = findTip(tips, "Tip");
  const irregular = !!item.participle;

  const nodes = [
    stageNode("HOY", item.front, presente, lang),
    stageNode("AYER", item.past, pasado, lang),
  ];
  const connectors = [transformChip(irregular ? "No sigue -ed" : "Regla: + ed", irregular ? "warn" : "ok")];
  if (item.participle) {
    nodes.push(stageNode("HASTA HOY", item.participle, perfecto, lang));
    connectors.push(transformChip("have / has +", "perfect"));
  }

  const rowChildren = [];
  nodes.forEach((node, i) => {
    if (i > 0) rowChildren.push(connectors[i - 1]);
    rowChildren.push(node);
  });
  const row = el("div", { class: "mt-5 flex items-start justify-center gap-0.5 sm:gap-1.5 overflow-x-auto pb-1" }, ...rowChildren);

  return el("div", { class: "mt-2" },
    rule ? ruleBanner(rule) : null,
    row,
    nota ? noteBanner(nota) : null);
}
