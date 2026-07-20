/**
 * features/map.js — "Mi Plan": mapa de la ruta del nivel (estilo videojuego).
 *
 * Dibuja, por cada UNIDAD del nivel, un camino de nodos:
 *   [competencias: Grammar, Vocabulary, Reading, Writing, Listening...] ->
 *   [Speaking (pronunciacion)] -> [Conversacion IA] -> [Test final]
 *
 * Desbloqueo POR UNIDAD: la siguiente unidad se abre solo cuando completas la
 * actual (todas sus lecciones + el test). Dentro de una unidad el avance es
 * secuencial, y el Test final se habilita cuando terminas las competencias.
 * Completar todas las unidades del nivel = pasar de nivel.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { unitsForLevel } from "../data/units/index.js";
import { SKILL_META } from "../data/skill-meta.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { openConversation } from "./conversation.js";
import { openSpeaking } from "./speaking.js";
import { openStory } from "./story.js";

/** Etiqueta corta de una leccion: su competencia (o "Test final"). */
function lessonLabel(lesson) {
  if (lesson.kind === "test") return "Test final";
  const skill = (lesson.skills || [])[0];
  return (skill && SKILL_META[skill]?.label) || lesson.title;
}

/** Icono de la competencia de una leccion. */
function lessonIcon(lesson) {
  const skill = (lesson.skills || [])[0];
  return (skill && SKILL_META[skill]?.icon) || ICONS.book;
}

export async function renderMap(container, user) {
  const profile = await getStudentProfile(user.id);
  if (!profile || !profile.placement_done) {
    mount(container, el("div", { class: "text-center py-10" },
      el("p", { class: "text-slate-400" }, "Primero haz tu examen de ubicacion."),
      el("button", { class: btnClass(), onclick: () => go("/examen") }, "Ir al examen")));
    return;
  }

  const progress = await getCourseProgress(user.id);
  const done = new Set(
    Object.entries(progress).filter(([, v]) => v.status === "done").map(([id]) => id));
  const units = unitsForLevel(profile.cefr_level);

  const totalUnits = units.length;
  const doneUnits = units.filter((u) => u.lessons.every((l) => done.has(l.id))).length;

  const header = el("div", { class: "text-center mb-6" },
    el("h1", { class: "text-2xl font-bold" }, "Mi plan de trabajo"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, `Ruta del nivel ${profile.cefr_level}`),
    levelBar(doneUnits, totalUnits, profile.cefr_level));

  const sections = [];
  let prevUnitComplete = true; // la primera unidad siempre esta desbloqueada

  units.forEach((unit) => {
    const skillLessons = [...unit.lessons.filter((l) => l.kind !== "test")]
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    const testLesson = unit.lessons.find((l) => l.kind === "test");

    const unitUnlocked = prevUnitComplete;
    const reqLessons = testLesson ? [...skillLessons, testLesson] : skillLessons;
    const doneCount = reqLessons.filter((l) => done.has(l.id)).length;
    const unitComplete = doneCount === reqLessons.length && reqLessons.length > 0;

    sections.push(unitBanner(unit, unitUnlocked, doneCount, reqLessons.length));

    // --- Nodos de competencias (secuencial dentro de la unidad) -----------
    let prevDone = unitUnlocked;
    let pos = 0;
    skillLessons.forEach((lesson) => {
      const isDone = done.has(lesson.id);
      const unlocked = unitUnlocked && prevDone;
      const state = isDone ? "done" : unlocked ? "current" : "locked";
      sections.push(pathNode({
        label: lessonLabel(lesson),
        state, pos: pos++,
        icon: state === "done" ? ICONS.check : state === "locked" ? ICONS.lock : lessonIcon(lesson),
        onClick: state === "locked" ? null : () => go(`/leccion/${lesson.id}`),
      }));
      prevDone = isDone;
    });

    const allSkillsDone = skillLessons.length > 0 && skillLessons.every((l) => done.has(l.id));

    // --- Speaking (pronunciacion): disponible si la unidad esta abierta ----
    sections.push(pathNode({
      label: "Speaking", sub: "Pronunciacion",
      state: unitUnlocked ? "action" : "locked", pos: pos++,
      icon: unitUnlocked ? ICONS.mic : ICONS.lock,
      onClick: unitUnlocked ? () => openSpeaking(unit) : null,
    }));

    // --- Conversacion con la IA -------------------------------------------
    sections.push(pathNode({
      label: "Conversacion IA", sub: "Habla con el robot",
      state: unitUnlocked ? "action" : "locked", pos: pos++,
      icon: unitUnlocked ? ICONS.chat : ICONS.lock,
      onClick: unitUnlocked ? () => openConversation(unit) : null,
    }));

    // --- Cuento de la unidad (lectura + voz + IA) -------------------------
    sections.push(pathNode({
      label: "Cuento", sub: "Lee y escucha",
      state: unitUnlocked ? "action" : "locked", pos: pos++,
      icon: unitUnlocked ? ICONS.book : ICONS.lock,
      onClick: unitUnlocked ? () => openStory(unit) : null,
    }));

    // --- Test final (habilita al terminar las competencias) ---------------
    if (testLesson) {
      const isDone = done.has(testLesson.id);
      const unlocked = unitUnlocked && allSkillsDone;
      const state = isDone ? "done" : unlocked ? "test" : "locked";
      sections.push(pathNode({
        label: "Test final",
        sub: isDone ? "Aprobado" : unlocked ? "Aprueba para avanzar" : "Completa la unidad",
        state, pos: pos++,
        icon: isDone ? ICONS.check : unlocked ? ICONS.star : ICONS.lock,
        onClick: state === "locked" ? null : () => go(`/leccion/${testLesson.id}`),
      }));
    }

    prevUnitComplete = unitComplete;
  });

  if (!units.length) {
    sections.push(el("p", { class: "text-center text-slate-400" }, "Pronto habra unidades para tu nivel."));
  }

  mount(container, el("div", { class: "max-w-md mx-auto pb-10" }, header, ...sections));
  focusMainHeading(container);
}

/** Barra de progreso del NIVEL (unidades completadas). */
function levelBar(doneUnits, total, level) {
  const pct = total ? Math.round((doneUnits / total) * 100) : 0;
  return el("div", { class: "mt-4 max-w-xs mx-auto" },
    el("div", { class: "flex justify-between text-xs text-slate-400 mb-1" },
      el("span", {}, `${doneUnits}/${total} unidades`),
      el("span", {}, pct >= 100 ? `\u00a1Nivel ${level} completo!` : `${pct}% del nivel`)),
    el("div", { class: "w-full bg-slate-800 rounded-full h-2" },
      el("div", { class: "bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all", style: `width:${pct}%` })));
}

function unitBanner(unit, unlocked, doneCount, total) {
  return el("div", { class: "mt-8 mb-2 flex items-center gap-3" },
    el("span", { class: "text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded" }, unit.level),
    el("h2", { class: "font-bold " + (unlocked ? "text-slate-200" : "text-slate-500") },
      unit.title,
      unlocked ? null : el("span", { class: "ml-2 align-middle inline-block w-3.5 h-3.5 text-slate-600", html: ICONS.lock })),
    el("span", { class: "text-xs text-slate-500" }, `${doneCount}/${total}`),
    el("span", { class: "flex-1 h-px bg-slate-800" }));
}

const NODE_STYLES = {
  done: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-900/40",
  current: "bg-gradient-to-br from-indigo-400 to-fuchsia-600 text-white shadow-lg shadow-indigo-900/50 ring-4 ring-indigo-500/30 animate-pulse",
  action: "bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/40",
  test: "bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-lg shadow-amber-900/50 ring-4 ring-amber-500/30",
  locked: "bg-slate-800 text-slate-600 border border-slate-700",
};

/** Un nodo del camino. `pos` alterna la posicion para dar sensacion de ruta. */
function pathNode({ label, sub, state, pos, icon, onClick }) {
  const offset = ["justify-center", "justify-start pl-10", "justify-center", "justify-end pr-10"][pos % 4];
  const styles = NODE_STYLES[state] || NODE_STYLES.locked;
  const locked = state === "locked";

  const circle = el(locked ? "div" : "button", {
    class: `w-16 h-16 rounded-full flex items-center justify-center ${styles} ` +
      "focus:outline focus:outline-2 focus:outline-indigo-300 transition-transform hover:scale-105",
    "aria-label": `${label}${sub ? " - " + sub : ""}${locked ? " (bloqueado)" : ""}`,
    onclick: locked ? null : onClick,
  }, el("span", { class: "w-7 h-7", html: icon }));

  return el("div", {},
    el("div", { class: "flex justify-center" }, el("div", { class: "w-1 h-6 bg-slate-800" })),
    el("div", { class: `flex ${offset}` },
      el("div", { class: "flex flex-col items-center gap-1" },
        circle,
        el("span", { class: "text-xs font-semibold " + (locked ? "text-slate-600" : "text-slate-200") + " max-w-[8rem] text-center" }, label),
        sub ? el("span", { class: "text-[10px] " + (locked ? "text-slate-700" : "text-slate-500") + " max-w-[9rem] text-center leading-tight" }, sub) : null)));
}

function btnClass() {
  return "mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg " +
    "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
}
