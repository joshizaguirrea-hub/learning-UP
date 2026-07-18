/**
 * features/course-cards.js — Unidades del nivel como tarjetas expandibles.
 *
 * Capa de feature (presentacion). Cada unidad es una tarjeta con borde degradado
 * que, al tocarla, DESPLIEGA su contenido en el sitio (acordeon, sin cambiar de
 * pantalla -> menos choque visual). Dentro muestra:
 *   - las 6 competencias (grammar, vocabulary, reading, writing, listening,
 *     speaking) enlazadas a su leccion; "speaking" abre la conversacion con IA.
 *   - los bonos de verbos (pasado regular -ed, expresiones de tiempo, idioms).
 *   - un boton estrella: CONVERSACION REAL con la IA sobre el tema de la unidad.
 *
 * La logica de progreso ya viene calculada; aqui solo se orquesta y pinta.
 */
import { SKILL_META } from "../data/skill-meta.js";
import { ICONS } from "../ui/icons.js";
import { el } from "../ui/dom.js";
import { openConversation } from "./conversation.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

// Bonos de verbos que se ofrecen en cada unidad (mazos en data/bonus-decks.js).
const BONUS_LINKS = [
  { id: "regular-past", label: "Pasado regular (-ed)" },
  { id: "past-time", label: "Expresiones de tiempo" },
  { id: "idioms", label: "Idioms (modismos)" },
];

/**
 * Seccion "Tu curso" con las unidades del nivel como tarjetas-acordeon.
 * @param {Array} units - unidades del nivel
 * @param {Object} progressMap - id de leccion -> { status }
 */
export function courseCards(units, progressMap) {
  const cards = units.length
    ? units.map((u) => unitCard(u, progressMap))
    : [el("p", { class: "text-sm text-slate-400" }, "Pronto habra mas unidades para tu nivel.")];

  return el("section", { class: PANEL + " p-5" },
    el("h2", { class: "text-lg font-bold" }, "Tu curso"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Toca una unidad para ver su contenido y conversar con la IA."),
    el("div", { class: "mt-4 grid gap-3" }, ...cards));
}

/** Una tarjeta de unidad con borde degradado y contenido plegable. */
function unitCard(unit, progressMap) {
  const total = unit.lessons.length;
  const done = unit.lessons.filter((l) => progressMap[l.id]?.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const body = el("div", { class: "hidden px-4 pb-4" }, cardBody(unit, progressMap));

  const chevron = el("span", { class: "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0", html: ICONS.chevron });
  let open = false;

  const header = el("button", {
    type: "button",
    "aria-expanded": "false",
    class: "w-full flex items-center gap-3 p-4 text-left rounded-2xl " +
      "focus:outline focus:outline-2 focus:outline-indigo-400 hover:bg-white/5 transition-colors",
    onclick: () => {
      open = !open;
      body.classList.toggle("hidden", !open);
      header.setAttribute("aria-expanded", open ? "true" : "false");
      chevron.style.transform = open ? "rotate(180deg)" : "";
    },
  },
    el("span", { class: "text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded shrink-0" }, unit.level),
    el("div", { class: "flex-1 min-w-0" },
      el("p", { class: "font-semibold text-slate-100 truncate" }, unit.title),
      el("div", { class: "w-full bg-slate-800 rounded-full h-1.5 mt-2" },
        el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-1.5 rounded-full transition-all", style: `width:${pct}%` })),
      el("p", { class: "text-xs text-slate-500 mt-1" }, `${done}/${total} lecciones`)),
    chevron);

  // Envoltura con borde degradado (look atractivo) + interior oscuro.
  return el("div", { class: "rounded-2xl p-px bg-gradient-to-r from-indigo-500/50 to-fuchsia-500/50" },
    el("div", { class: "rounded-2xl bg-slate-900" }, header, body));
}

/** Contenido desplegado: competencias + bonos + conversacion con IA. */
function cardBody(unit, progressMap) {
  // Mapa competencia -> primera leccion de la unidad que la entrena.
  const bySkill = {};
  for (const l of unit.lessons) {
    for (const s of l.skills || []) if (!bySkill[s]) bySkill[s] = l;
  }

  const skillGrid = el("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-2" },
    ...Object.keys(SKILL_META).map((key) => skillChip(key, unit, bySkill[key], progressMap)));

  const bonusRow = el("div", { class: "mt-4" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-2" }, "Bonos de verbos"),
    el("div", { class: "flex flex-wrap gap-2" },
      ...BONUS_LINKS.map((b) => el("a", {
        href: `#/bonus/${b.id}`,
        class: "text-xs px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30 " +
          "hover:bg-amber-500/25 focus:outline focus:outline-2 focus:outline-amber-400",
      }, b.label))));

  const convo = el("button", {
    type: "button",
    class: "mt-4 w-full flex items-center gap-3 rounded-xl p-4 bg-gradient-to-r from-emerald-500 to-teal-600 " +
      "text-white shadow-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
    onclick: () => openConversation(unit),
  },
    el("span", { class: "w-8 h-8 shrink-0", html: SKILL_META.speaking.icon }),
    el("div", { class: "flex-1 text-left" },
      el("p", { class: "font-bold" }, "Conversacion con la IA"),
      el("p", { class: "text-white/85 text-sm" }, `Practica hablando de "${unit.title}" en ingles`)),
    el("span", { class: "text-white/90 text-sm font-semibold" }, "Empezar ->"));

  return el("div", { class: "pt-1" },
    el("p", { class: "text-sm text-slate-400" }, unit.subtitle),
    el("div", { class: "mt-3" }, skillGrid),
    bonusRow,
    convo);
}

/**
 * Chip de una competencia. "speaking" abre la conversacion con IA; el resto
 * enlaza a su leccion. Si la unidad no tiene esa competencia, queda "proximamente".
 */
function skillChip(key, unit, lesson, progressMap) {
  const meta = SKILL_META[key];
  const iconBox = el("span", { class: "w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0", html: meta.icon });
  const label = el("span", { class: "flex-1 min-w-0 text-sm font-semibold text-white truncate" }, meta.label);

  // Speaking = conversacion real con la IA (siempre disponible).
  if (key === "speaking") {
    return el("button", {
      type: "button",
      class: `flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r ${meta.gradient} shadow ` +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60 text-left",
      onclick: () => openConversation(unit),
    }, iconBox, label);
  }

  // Competencia con leccion en esta unidad -> enlace a la leccion.
  if (lesson) {
    const done = progressMap[lesson.id]?.status === "done";
    return el("a", {
      href: `#/leccion/${lesson.id}`,
      class: `flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r ${meta.gradient} shadow ` +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60",
    },
      iconBox, label,
      done ? el("span", { class: "w-4 h-4 text-white shrink-0", html: ICONS.check }) : null);
  }

  // Sin contenido aun (ej. listening en algunas unidades).
  return el("div", { class: "flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 opacity-60" },
    el("span", { class: "w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 shrink-0", html: meta.icon }),
    el("div", { class: "flex-1 min-w-0" },
      el("span", { class: "block text-sm font-semibold text-slate-300 truncate" }, meta.label),
      el("span", { class: "block text-[10px] text-slate-500" }, "Proximamente")));
}
