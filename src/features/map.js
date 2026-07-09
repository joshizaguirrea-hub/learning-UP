/**
 * features/map.js — "Mi Plan": mapa de la ruta del nivel (estilo videojuego).
 *
 * Capa de feature: dibuja la secuencia de lecciones del nivel como un camino de
 * nodos (completado / actual / bloqueado). El desbloqueo es secuencial: una
 * leccion se abre cuando completas la anterior. Al tocar un nodo abierto, vas a
 * la leccion.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { unitsForLevel } from "../data/units/index.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PHASE_LABEL = { learn: "Aprende", present: "Presentacion", practice: "Practica", produce: "Produccion" };

export async function renderMap(container, user) {
  const profile = await getStudentProfile(user.id);
  if (!profile || !profile.placement_done) {
    mount(container, el("div", { class: "text-center py-10" },
      el("p", { class: "text-slate-400" }, "Primero haz tu examen de ubicacion."),
      el("button", { class: btnClass(), onclick: () => go("/examen") }, "Ir al examen")));
    return;
  }

  const progress = await getCourseProgress(user.id);
  const completed = new Set(
    Object.entries(progress).filter(([, v]) => v.status === "done").map(([id]) => id));
  const units = unitsForLevel(profile.cefr_level);

  const header = el("div", { class: "text-center mb-6" },
    el("h1", { class: "text-2xl font-bold" }, "Mi plan de trabajo"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, `Ruta del nivel ${profile.cefr_level}`));

  const sections = [];
  let prevDone = true; // la primera leccion siempre esta desbloqueada

  for (const unit of units) {
    sections.push(unitBanner(unit));
    unit.lessons.forEach((lesson, i) => {
      const done = completed.has(lesson.id);
      const unlocked = prevDone;
      const state = done ? "done" : unlocked ? "current" : "locked";
      sections.push(node(lesson, state, i));
      prevDone = done;
    });
  }

  if (!units.length) {
    sections.push(el("p", { class: "text-center text-slate-400" }, "Pronto habra unidades para tu nivel."));
  }

  mount(container, el("div", { class: "max-w-md mx-auto" }, header, ...sections));
  focusMainHeading(container);
}

function unitBanner(unit) {
  return el("div", { class: "mt-8 mb-2 flex items-center gap-3" },
    el("span", { class: "text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded" }, unit.level),
    el("h2", { class: "font-bold text-slate-200" }, unit.title),
    el("span", { class: "flex-1 h-px bg-slate-800" }));
}

/** Un nodo del camino, alternando posicion para dar sensacion de ruta. */
function node(lesson, state, i) {
  const offset = ["justify-center", "justify-start pl-10", "justify-center", "justify-end pr-10"][i % 4];

  const styles = {
    done: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-900/40",
    current: "bg-gradient-to-br from-indigo-400 to-fuchsia-600 text-white shadow-lg shadow-indigo-900/50 ring-4 ring-indigo-500/30 animate-pulse",
    locked: "bg-slate-800 text-slate-600 border border-slate-700",
  }[state];

  const icon = { done: ICONS.check, current: ICONS.star, locked: ICONS.lock }[state];

  const circle = el(state === "locked" ? "div" : "button", {
    class: `w-16 h-16 rounded-full flex items-center justify-center ${styles} ` +
      "focus:outline focus:outline-2 focus:outline-indigo-300 transition-transform hover:scale-105",
    "aria-label": `${PHASE_LABEL[lesson.phase] || ""}: ${lesson.title}${state === "locked" ? " (bloqueada)" : ""}`,
    onclick: state === "locked" ? null : () => go(`/leccion/${lesson.id}`),
  }, el("span", { class: "w-7 h-7", html: icon }));

  return el("div", {},
    el("div", { class: "flex justify-center" },
      el("div", { class: "w-1 h-6 bg-slate-800" })),
    el("div", { class: `flex ${offset}` },
      el("div", { class: "flex flex-col items-center gap-1" },
        circle,
        el("span", { class: "text-xs " + (state === "locked" ? "text-slate-600" : "text-slate-300") + " max-w-[8rem] text-center" },
          PHASE_LABEL[lesson.phase] || lesson.title))));
}

function btnClass() {
  return "mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg " +
    "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
}
