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
 * AHORA: una sola LINEA DE TIEMPO -> HOY (presente) -> AYER (pasado) -> HASTA
 * HOY (present perfect). Es la tecnica mas usada para ensenar tiempos verbales
 * en idiomas: el eje temporal es intuitivo (el alumno YA entiende "antes" y
 * "ahora"), y cada forma se ancla a SU momento en vez de flotar suelta. El
 * conector entre nodos muestra la TRANSFORMACION (+ed / irregular / have+
 * participio), que es justo la parte que mas le cuesta memorizar a un
 * hispanohablante.
 *
 * CERO logica nueva: toda la explicacion sigue saliendo de core/verb-tips.js
 * (generateTips). Este modulo solo la REACOMODA en una linea de tiempo en vez
 * de un acordeon suelto -- "verlo de otra manera", no inventar contenido.
 *
 * DOS PIEZAS, por el principio de no-spoiler:
 *   - buildVerbTeaser()   -> ANTES de revelar: solo candados, sin respuesta.
 *   - buildVerbTimeline() -> DESPUES de revelar: la linea completa.
 * generateTips() escribe la respuesta DENTRO del texto de "La regla" (a
 * proposito, es la explicacion), asi que antes de revelar NO se puede mostrar
 * ningun tip sin arruinar la practica. Por eso el teaser no usa generateTips.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speakButton } from "../ui/speech.js";
import { generateTips } from "../core/verb-tips.js";

const findTip = (tips, title) => tips.find((t) => t.title === title) || null;

/** Candado: un nodo cuya forma AUN no se revela. */
function lockedNode(label) {
  return el("div", { class: "flex flex-col items-center gap-1" },
    el("div", {
      class: "w-11 h-11 rounded-2xl bg-slate-700/50 border-2 border-dashed border-slate-500 grid place-items-center text-slate-400",
      "aria-hidden": "true",
    }, el("span", { class: "w-5 h-5", html: ICONS.lock })),
    el("p", { class: "text-[10px] uppercase tracking-wide text-slate-500" }, label));
}

function dash() {
  return el("div", { class: "w-6 sm:w-10 h-0.5 mt-5 border-t-2 border-dashed border-slate-600 shrink-0", "aria-hidden": "true" });
}

/**
 * Previa de la linea de tiempo, ANTES de tocar "Comprobar respuesta". Muestra
 * cuantas formas faltan por descubrir (1 o 2) sin dar ninguna pista de cual es.
 * @returns {HTMLElement|null} null si el verbo no tiene pasado (no es un mazo de verbos).
 */
export function buildVerbTeaser(item) {
  if (!item.past) return null;
  const children = [dash(), lockedNode("AYER")];
  if (item.participle) children.push(dash(), lockedNode("HASTA HOY"));
  return el("div", { class: "mt-4 flex items-start justify-center" }, ...children);
}

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
      class: "text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border whitespace-nowrap " +
        (tones[tone] || tones.ok),
    }, text));
}

/** Un nodo revelado: icono + etiqueta temporal + palabra (con audio) + micro-explicacion. */
function stageNode(label, word, tip, lang) {
  const grad = tip?.grad || "from-slate-500 to-slate-700";
  return el("div", { class: "flex flex-col items-center gap-1.5 w-[8.25rem] sm:w-40 shrink-0" },
    el("div", {
      class: `w-12 h-12 rounded-2xl bg-gradient-to-br ${grad} grid place-items-center text-white shadow-lg`,
      "aria-hidden": "true",
    }, el("span", { class: "w-6 h-6", html: ICONS[tip?.icon] || ICONS.clock })),
    el("p", { class: "text-[10px] font-black uppercase tracking-widest text-slate-500" }, label),
    el("div", { class: "flex items-center gap-1" },
      el("p", { class: "font-extrabold text-slate-100 text-base sm:text-lg" }, word),
      speakButton(word, { cls: "w-6 h-6", lang })),
    tip ? el("p", { class: "text-[11px] text-slate-400 text-center leading-snug" }, tip.body) : null);
}

function ruleBanner(tip) {
  return el("div", {
    class: "rounded-xl bg-indigo-500/10 border border-indigo-500/30 px-4 py-2.5 text-sm text-indigo-100 text-center",
  }, tip.body);
}

function noteBanner(tip) {
  return el("div", {
    class: "mt-4 rounded-xl bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 text-sm text-amber-100 text-center",
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
