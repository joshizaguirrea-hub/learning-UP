/**
 * features/unit.js — Pantalla COMPLETA de una unidad (tema) del curso.
 *
 * Capa de feature: al tocar una tarjeta cuadrada del inicio se abre esta vista,
 * con los objetivos can-do, el progreso, las COMPETENCIAS (grammar, vocabulary,
 * reading, writing, listening, speaking), los bonos de verbos y la conversacion
 * con IA (todo via unit-content.js), mas el repaso SRS del dia.
 */
import { unitById, unitsForLevel } from "../data/units/index.js";
import { getCourseProgress } from "../services/course.js";
import { countDue } from "../services/srs.js";
import { isUnitUnlocked } from "../core/progression.js";
import { el, mount } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { unitContent } from "./unit-content.js";

const CARD = "bg-slate-900 rounded-2xl p-6 border border-slate-800";

export async function renderUnit(container, params, user) {
  const unit = unitById(params.id);
  if (!unit) {
    mount(container, el("div", { class: CARD }, el("p", {}, "Unidad no encontrada.")));
    return;
  }
  const [progress, due] = await Promise.all([getCourseProgress(user.id), countDue(user.id)]);

  // Guardia del sendero: no dejar entrar a una unidad bloqueada (aunque peguen la URL).
  const completed = new Set(
    Object.entries(progress).filter(([, v]) => v?.status === "done").map(([id]) => id));
  if (!isUnitUnlocked(unit.id, unitsForLevel(unit.level, unit.language), completed)) {
    mount(container, el("div", { class: "max-w-lg mx-auto " + CARD + " text-center" },
      el("div", { class: "w-14 h-14 mx-auto rounded-full bg-slate-800 grid place-items-center text-slate-400", html: ICONS.lock }),
      el("h1", { class: "text-xl font-bold mt-4" }, "Unidad bloqueada"),
      el("p", { class: "mt-2 text-slate-400" }, `Completa la unidad anterior para desbloquear \u201c${unit.title}\u201d.`),
      el("button", {
        class: "mt-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-indigo-400 hover:to-fuchsia-400",
        onclick: () => go("/student"),
      }, "Volver al inicio")));
    focusMainHeading(container);
    return;
  }

  const doneCount = unit.lessons.filter((l) => progress[l.id]?.status === "done").length;
  const pct = Math.round((doneCount / unit.lessons.length) * 100);

  const header = el("section", { class: "rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg" },
    el("div", { class: "p-6" },
      el("a", { href: "#/student", class: "inline-flex items-center gap-1 text-sm text-white/80 hover:text-white" }, "< Volver al inicio"),
      el("div", { class: "flex items-center gap-3 mt-3" },
        el("span", { class: "text-xs font-mono font-bold bg-black/30 text-white px-2 py-0.5 rounded" }, unit.level),
        el("h1", { class: "text-2xl sm:text-3xl font-extrabold text-white" }, unit.title)),
      el("p", { class: "text-white/85 mt-1" }, unit.subtitle),
      objectivesButton(unit),
      el("div", { class: "mt-4" },
        el("div", { class: "flex justify-between text-xs text-white/80 mb-1" },
          el("span", {}, `${doneCount}/${unit.lessons.length} lecciones`),
          el("span", {}, `${pct}% completado`)),
        el("div", { class: "w-full bg-black/25 rounded-full h-2", role: "progressbar",
          "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
          el("div", { class: "bg-white h-2 rounded-full transition-all", style: `width:${pct}%` })))));

  const content = el("section", { class: CARD }, unitContent(unit, progress, user));

  const review = el("section", { class: CARD + " flex items-center justify-between flex-wrap gap-3" },
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

  mount(container, el("div", { class: "max-w-4xl mx-auto space-y-6" }, header, content, review));
  focusMainHeading(container);
}

/** Boton compacto "Objetivos del tema" (los can-do). Antes ocupaba una tarjeta
 * entera; ahora vive en el header y abre un modal ligero para no robar espacio. */
function objectivesButton(unit) {
  return el("button", {
    type: "button",
    class: "mt-3 inline-flex items-center gap-2 text-sm font-semibold bg-black/25 text-white " +
      "px-3 py-1.5 rounded-full hover:bg-black/40 focus:outline focus:outline-2 focus:outline-white/70",
    onclick: () => openObjectives(unit),
  }, el("span", { class: "w-4 h-4", html: ICONS.check }), "Objetivos del tema");
}

/** Modal ligero con la lista de objetivos can-do de la unidad. */
function openObjectives(unit) {
  const close = () => overlay.remove();
  const card = el("div", {
    role: "dialog", "aria-modal": "true", "aria-label": "Objetivos del tema",
    class: "robot-pop max-w-sm w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl",
  },
    el("div", { class: "flex items-center justify-between gap-2 mb-3" },
      el("h2", { class: "font-bold text-slate-100" }, "Al terminar este tema podr\u00e1s"),
      el("button", { class: "w-8 h-8 rounded-full text-slate-400 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("ul", { class: "space-y-1.5 text-sm text-slate-300" },
      ...(unit.cando || []).map((c) => el("li", { class: "flex gap-2" }, el("span", { class: "text-emerald-400" }, "+"), c))));
  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.addEventListener("keydown", function onEsc(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", onEsc); } });
  document.body.append(overlay);
}
