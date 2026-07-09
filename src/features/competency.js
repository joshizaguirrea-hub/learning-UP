/**
 * features/competency.js — Plan de UNA competencia segun el nivel del estudiante.
 *
 * Capa de feature: muestra el foco y objetivos can-do de la competencia a tu
 * nivel, tu dominio, y el plan de lecciones (filtradas del curso) que la
 * entrenan. Si la competencia aun no tiene contenido, muestra "proximamente".
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { unitsForLevel } from "../data/units/index.js";
import { SKILL_META } from "../data/skill-meta.js";
import { skillPlan } from "../data/skill-plans.js";
import { comingSoon } from "../ui/placeholder.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-5";
const PHASE_LABEL = { learn: "Aprende", present: "Presentacion", practice: "Practica", produce: "Produccion" };

export async function renderCompetency(container, params, user) {
  const skill = params.skill;
  const meta = SKILL_META[skill];
  if (!meta) { mount(container, el("div", { class: PANEL }, el("p", {}, "Competencia no encontrada."))); return; }

  const profile = await getStudentProfile(user.id);
  if (!profile || !profile.placement_done) {
    mount(container, el("div", { class: PANEL + " text-center" },
      el("p", { class: "text-slate-400" }, "Primero haz tu examen de ubicacion."),
      el("button", { class: primaryBtn(), onclick: () => go("/examen") }, "Ir al examen")));
    return;
  }

  const level = profile.cefr_level;
  const progress = await getCourseProgress(user.id);
  const units = unitsForLevel(level);

  // Lecciones (de cualquier unidad del nivel) que entrenan esta competencia.
  const lessons = [];
  for (const u of units) {
    for (const l of u.lessons) {
      if ((l.skills || []).includes(skill)) lessons.push({ ...l, unitTitle: u.title });
    }
  }

  if (lessons.length === 0) {
    mount(container, el("div", {},
      backLink(),
      comingSoon({
        title: `${meta.label} - ${level}`,
        desc: skillPlan(skill, level)?.focus || "Contenido en preparacion para tu nivel.",
        icon: meta.icon,
      })));
    focusMainHeading(container);
    return;
  }

  const done = lessons.filter((l) => progress[l.id]?.status === "done").length;
  const pct = Math.round((done / lessons.length) * 100);
  const plan = skillPlan(skill, level);

  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backLink(),
    hero(meta, level, pct, done, lessons.length),
    plan ? focusCard(plan) : null,
    lessonsCard(lessons, progress)));
  focusMainHeading(container);
}

function hero(meta, level, pct, done, total) {
  return el("section", { class: `rounded-2xl overflow-hidden bg-gradient-to-r ${meta.gradient} shadow-lg` },
    el("div", { class: "p-6" },
      el("div", { class: "flex items-center gap-3" },
        el("div", { class: "w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white", html: meta.icon }),
        el("div", {},
          el("h1", { class: "text-2xl font-extrabold text-white" }, `${meta.label} - ${level}`),
          el("p", { class: "text-white/80 text-sm" }, meta.subtitle))),
      el("div", { class: "mt-4" },
        el("div", { class: "flex justify-between text-xs text-white/80 mb-1" },
          el("span", {}, `${done}/${total} lecciones`),
          el("span", {}, `${pct}% dominio`)),
        el("div", { class: "w-full bg-black/25 rounded-full h-2" },
          el("div", { class: "bg-white h-2 rounded-full", style: `width:${pct}%` })))));
}

function focusCard(plan) {
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Que vas a lograr en este nivel"),
    el("p", { class: "text-slate-300 text-sm mt-1" }, plan.focus),
    plan.canDo?.length
      ? el("ul", { class: "mt-3 space-y-1 text-sm text-slate-300" },
          ...plan.canDo.map((c) => el("li", { class: "flex gap-2" },
            el("span", { class: "text-emerald-400" }, "+"), c)))
      : null);
}

function lessonsCard(lessons, progress) {
  const rows = lessons.map((l) => {
    const isDone = progress[l.id]?.status === "done";
    return el("a", {
      href: `#/leccion/${l.id}`,
      class: "flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700 " +
        "hover:border-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-500",
    },
      el("span", { class: "text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300" }, PHASE_LABEL[l.phase] || ""),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-semibold text-slate-100 truncate" }, l.title),
        el("p", { class: "text-xs text-slate-500 truncate" }, l.unitTitle)),
      el("span", { class: `text-xs px-2 py-0.5 rounded-full ${isDone ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-700 text-slate-400"}` },
        isDone ? "Completada" : "Pendiente"));
  });
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Tu plan de lecciones"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Lecciones que entrenan esta competencia a tu nivel."),
    el("div", { class: "mt-4 space-y-2" }, ...rows));
}

function backLink() {
  return el("a", { href: "#/student", class: "inline-block text-sm text-indigo-400 hover:text-indigo-300" }, "< Volver al inicio");
}
function primaryBtn() {
  return "mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-400 hover:to-fuchsia-400";
}
