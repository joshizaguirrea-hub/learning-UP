/**
 * features/unit.js — Vista de una unidad tematica del curso.
 *
 * Capa de feature: muestra objetivos can-do, las lecciones (Presentacion,
 * Practica, Produccion) con su estado, y un acceso al repaso SRS del dia.
 */
import { unitById } from "../data/units/index.js";
import { getCourseProgress } from "../services/course.js";
import { countDue } from "../services/srs.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "bg-slate-900 rounded-2xl p-6 border border-slate-800";
const PHASE_LABEL = { learn: "Aprende", present: "Presentacion", practice: "Practica", produce: "Produccion" };

export async function renderUnit(container, params, user) {
  const unit = unitById(params.id);
  if (!unit) {
    mount(container, el("div", { class: CARD }, el("p", {}, "Unidad no encontrada.")));
    return;
  }
  const [progress, due] = await Promise.all([getCourseProgress(user.id), countDue(user.id)]);
  const doneCount = unit.lessons.filter((l) => progress[l.id]?.status === "done").length;
  const pct = Math.round((doneCount / unit.lessons.length) * 100);

  const header = el("div", {},
    el("a", { href: "#/student", class: "text-sm text-indigo-400 hover:text-indigo-300" }, "< Volver al inicio"),
    el("div", { class: "flex items-center gap-2 mt-3" },
      el("span", { class: "text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded" }, unit.level),
      el("h1", { class: "text-2xl font-bold" }, unit.title)),
    el("p", { class: "text-slate-400 mt-1" }, unit.subtitle));

  const cando = el("section", { class: "mt-6 " + CARD },
    el("h2", { class: "font-bold" }, "Al terminar esta unidad podras:"),
    el("ul", { class: "mt-3 space-y-1 text-sm text-slate-300" },
      ...unit.cando.map((c) => el("li", { class: "flex gap-2" }, el("span", { class: "text-emerald-400" }, "+"), c))));

  const review = el("section", { class: "mt-6 " + CARD + " flex items-center justify-between flex-wrap gap-3" },
    el("div", {},
      el("h2", { class: "font-bold" }, "Repaso del dia (SRS)"),
      el("p", { class: "text-sm text-slate-400 mt-1" },
        due > 0 ? `Tienes ${due} tarjetas de vocabulario para repasar.` : "Sin tarjetas pendientes por hoy.")),
    el("button", {
      class: (due > 0 ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110" : "bg-slate-700 text-slate-400 cursor-not-allowed") +
        " text-white font-semibold px-5 py-2.5 rounded-lg focus:outline focus:outline-2 focus:outline-emerald-400",
      disabled: due > 0 ? null : "",
      onclick: () => go("/repaso"),
    }, "Repasar ahora"));

  const lessons = el("section", { class: "mt-6 " + CARD },
    el("div", { class: "flex items-center justify-between" },
      el("h2", { class: "font-bold text-lg" }, "Lecciones"),
      el("span", { class: "text-sm text-slate-400" }, `${doneCount}/${unit.lessons.length}`)),
    el("div", { class: "w-full bg-slate-800 rounded-full h-2 mt-3", role: "progressbar",
      "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
      el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full transition-all", style: `width:${pct}%` })),
    el("div", { class: "mt-4" }, ...unit.lessons.map((l) => lessonRow(l, progress[l.id]))));

  mount(container, el("div", {}, header, cando, review, lessons));
  focusMainHeading(container);
}

function lessonRow(lesson, prog) {
  const done = prog?.status === "done";
  return el("a", {
    href: `#/leccion/${lesson.id}`,
    class: "flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg border-b border-slate-800 last:border-0 " +
      "hover:bg-slate-800 focus:outline focus:outline-2 focus:outline-indigo-500",
  },
    el("span", { class: "text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full" }, PHASE_LABEL[lesson.phase] || ""),
    el("span", { class: "flex-1 text-slate-100" }, lesson.title),
    el("span", { class: `text-xs px-2 py-0.5 rounded-full ${done ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"}` },
      done ? "Completada" : "Pendiente"));
}
