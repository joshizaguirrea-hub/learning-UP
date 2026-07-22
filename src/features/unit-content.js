/**
 * features/unit-content.js — Contenido de una unidad (competencias + bonos + IA).
 *
 * Capa de feature (presentacion). Bloque reutilizable que se muestra en la
 * pantalla completa de la unidad: las 6 competencias como chips enlazados a su
 * leccion ("speaking" abre la practica de PRONUNCIACION), los bonos de verbos y
 * el boton estrella de CONVERSACION REAL con la IA sobre el tema de la unidad.
 */
import { SKILL_META } from "../data/skill-meta.js";
import { VOCAB_DECKS } from "../data/vocab-decks.js";
import { ICONS } from "../ui/icons.js";
import { el } from "../ui/dom.js";
import { openConversation } from "./conversation.js";
import { openSpeaking } from "./speaking.js";
import { openStory } from "./story.js";
import { openAntiErrors } from "./anti-errors.js";

// Bonos de verbos que se ofrecen en cada unidad (mazos en data/bonus-decks.js).
// IMPORTANTE: deben coincidir con lo que evalua el examen (data/test-gen.js) para
// no preguntar en el examen algo que el alumno no vio ofrecido en la unidad.
const BONUS_LINKS = [
  { id: "irregular-verbs", label: "Verbos irregulares" },
  { id: "regular-past", label: "Pasado regular (-ed)" },
  { id: "past-time", label: "Expresiones de tiempo" },
  { id: "idioms", label: "Idioms (modismos)" },
];

/**
 * Bloque de contenido de la unidad: competencias + bonos + conversacion.
 * @param {object} unit - unidad del curso
 * @param {Object} progressMap - id de leccion -> { status }
 * @param {object} [user] - usuario actual (para guardar el progreso de Speaking)
 */
export function unitContent(unit, progressMap, user) {
  // Mapa competencia -> primera leccion de la unidad que la entrena.
  const bySkill = {};
  for (const l of unit.lessons) {
    for (const s of l.skills || []) if (!bySkill[s]) bySkill[s] = l;
  }

  const skillGrid = el("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" },
    ...Object.keys(SKILL_META).map((key) => skillChip(key, unit, bySkill[key], progressMap, user)));

  const bonusRow = el("section", { class: "mt-6" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-2" }, "Bonos de verbos"),
    el("div", { class: "flex flex-wrap gap-2" },
      ...BONUS_LINKS.map((b) => el("a", {
        href: `#/bonus/${b.id}`,
        class: "text-sm px-4 py-2 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30 " +
          "hover:bg-amber-500/25 focus:outline focus:outline-2 focus:outline-amber-400",
      }, b.label))));

  const convo = el("button", {
    type: "button",
    class: "mt-6 w-full flex items-center gap-3 rounded-2xl p-5 bg-gradient-to-r from-emerald-500 to-teal-600 " +
      "text-white shadow-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
    onclick: () => openConversation(unit),
  },
    el("span", { class: "w-9 h-9 shrink-0", html: SKILL_META.speaking.icon }),
    el("div", { class: "flex-1 text-left" },
      el("p", { class: "font-bold text-lg" }, "Conversacion con la IA"),
      el("p", { class: "text-white/85 text-sm" }, `Practica hablando de "${unit.title}" en ingles`)),
    el("span", { class: "text-white/90 text-sm font-semibold" }, "Empezar ->"));

  const story = el("button", {
    type: "button",
    class: "mt-3 w-full flex items-center gap-3 rounded-2xl p-5 bg-gradient-to-r from-indigo-500 to-fuchsia-600 " +
      "text-white shadow-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-300",
    onclick: () => openStory(unit),
  },
    el("span", { class: "w-9 h-9 shrink-0", html: ICONS.book }),
    el("div", { class: "flex-1 text-left" },
      el("p", { class: "font-bold text-lg" }, "Cuento de la unidad"),
      el("p", { class: "text-white/85 text-sm" }, "Lee y escucha un texto sobre \"" + unit.title + "\" (o crea uno con IA)")),
    el("span", { class: "text-white/90 text-sm font-semibold" }, "Abrir ->"));

  const antiErrors = el("button", {
    type: "button",
    class: "mt-3 w-full flex items-center gap-3 rounded-2xl p-5 bg-gradient-to-r from-rose-500 to-orange-600 " +
      "text-white shadow-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
    onclick: () => openAntiErrors(unit.level),
  },
    el("span", { class: "w-9 h-9 shrink-0", html: ICONS.bulb }),
    el("div", { class: "flex-1 text-left" },
      el("p", { class: "font-bold text-lg" }, "Modo Anti-errores"),
      el("p", { class: "text-white/85 text-sm" }, `Trampas es->en de tu nivel (${unit.level}): falsos amigos, he/she, preposiciones...`)),
    el("span", { class: "text-white/90 text-sm font-semibold" }, "Jugar ->"));

  // Bonos de VOCABULARIO cuyo nivel coincide con el de la unidad (sinonimos,
  // antonimos, y -segun el nivel- confusables y homografos). Se derivan de los
  // datos, sin listas duplicadas: DRY.
  const vocabDecks = VOCAB_DECKS.filter((d) => d.level === unit.level);
  const vocabRow = vocabDecks.length ? el("section", { class: "mt-4" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-2" }, "Bonos de vocabulario (" + unit.level + ")"),
    el("div", { class: "flex flex-wrap gap-2" },
      ...vocabDecks.map((d) => el("a", {
        href: `#/bonus/${d.id}`,
        class: "text-sm px-4 py-2 rounded-full bg-sky-500/15 text-sky-200 border border-sky-500/30 " +
          "hover:bg-sky-500/25 focus:outline focus:outline-2 focus:outline-sky-400",
      }, d.title)))) : null;

  return el("div", {},
    el("h2", { class: "font-bold text-lg mb-3" }, "Competencias"),
    skillGrid,
    bonusRow,
    vocabRow,
    convo,
    antiErrors,
    story);
}

/**
 * Chip de una competencia. "speaking" abre la practica de pronunciacion; el
 * resto enlaza a su leccion. Si la unidad no tiene esa competencia, "proximamente".
 */
function skillChip(key, unit, lesson, progressMap, user) {
  const meta = SKILL_META[key];
  const iconBox = el("span", { class: "w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0", html: meta.icon });
  const label = el("span", { class: "flex-1 min-w-0 font-bold text-white truncate" }, meta.label);

  // Speaking = practica de PRONUNCIACION (escucha y repite), distinta de la
  // conversacion libre con IA. Siempre disponible. Su progreso se guarda con un
  // id sintetico "speaking-<unidad>" (lesson_id es TEXT) para marcar su check.
  if (key === "speaking") {
    const progressId = "speaking-" + unit.id;
    const done = progressMap[progressId]?.status === "done";
    const check = el("span", { class: "w-6 h-6 text-white shrink-0" + (done ? "" : " hidden"), html: ICONS.check });
    return el("button", {
      type: "button",
      class: `flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${meta.gradient} shadow-lg ` +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60 text-left",
      onclick: () => openSpeaking(unit, {
        userId: user?.id,
        progressId,
        onComplete: () => check.classList.remove("hidden"),
      }),
    }, iconBox, label, check);
  }

  // Competencia con leccion en esta unidad -> enlace a la leccion.
  if (lesson) {
    const done = progressMap[lesson.id]?.status === "done";
    return el("a", {
      href: `#/leccion/${lesson.id}`,
      class: `flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${meta.gradient} shadow-lg ` +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60",
    },
      iconBox, label,
      done ? el("span", { class: "w-6 h-6 text-white shrink-0", html: ICONS.check }) : null);
  }

  // Sin contenido aun (ej. listening en algunas unidades).
  return el("div", { class: "flex items-center gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700 opacity-60" },
    el("span", { class: "w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 shrink-0", html: meta.icon }),
    el("div", { class: "flex-1 min-w-0" },
      el("span", { class: "block font-bold text-slate-300 truncate" }, meta.label),
      el("span", { class: "block text-[11px] text-slate-500" }, "Proximamente")));
}
