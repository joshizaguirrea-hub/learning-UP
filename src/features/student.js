/**
 * features/student.js — Dashboard del estudiante.
 *
 * Capa de feature: carga el perfil y el plan via services y los muestra.
 * Enlaza el examen de ubicacion (ruta #/examen).
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCurrentPlan } from "../services/placement.js";
import { CEFR_INFO } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "bg-white rounded-xl p-6 shadow-sm border border-slate-200";

export async function renderStudent(container, user) {
  const profile = await getStudentProfile(user.id);
  const name = user.user_metadata?.full_name || "estudiante";

  const header = el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
    el("h1", { class: "text-2xl font-bold" }, `Hola, ${name}`),
    el("span", { class: "text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full" }, "Estudiante"));

  const done = profile && profile.placement_done;
  const blocks = [header, done ? levelCard(profile) : placementCta()];

  if (done) {
    const plan = await getCurrentPlan(user.id);
    if (plan) blocks.push(planSection(plan));
  }

  blocks.push(el("section", { class: "grid sm:grid-cols-2 gap-6 mt-6" },
    stub("Contenido y practicas", "Libros, audios y ejercicios (proximamente)."),
    stub("Buscar profesor", "Marketplace de profesores (Fase 2).")));

  mount(container, el("div", {}, ...blocks));
  focusMainHeading(container);
}

/** Llamado a la accion para hacer el examen (si aun no lo ha hecho). */
function placementCta() {
  return el("section", { class: "mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6" },
    el("h2", { class: "font-bold text-lg text-amber-900" }, "Primer paso: examen de ubicacion"),
    el("p", { class: "mt-2 text-amber-800 text-sm" },
      "Descubre tu nivel (MCER) y generaremos tu plan de estudio personalizado. Son 8 preguntas."),
    el("button", {
      class: "mt-4 bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg " +
        "hover:bg-amber-700 focus:outline focus:outline-2 focus:outline-amber-900",
      onclick: () => go("/examen"),
    }, "Empezar examen"));
}

/** Tarjeta con el nivel actual del estudiante. */
function levelCard(profile) {
  const info = CEFR_INFO[profile.cefr_level] || {};
  return el("section", { class: "mt-6 " + CARD },
    el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
      el("div", {},
        el("h2", { class: "font-bold text-lg" }, "Tu nivel actual"),
        el("p", { class: "mt-1 text-3xl font-extrabold text-indigo-700" },
          `${profile.cefr_level} `, el("span", { class: "text-base font-semibold text-slate-600" }, info.label || "")),
        el("p", { class: "text-slate-600 text-sm" }, info.blurb || "")),
      el("button", {
        class: "text-sm text-indigo-700 underline hover:no-underline",
        onclick: () => go("/examen"),
      }, "Repetir examen")));
}

/** Seccion con los modulos del plan de estudio. */
function planSection(plan) {
  const preview = plan.modules.slice(0, 6).map((m) =>
    el("li", { class: "flex items-center gap-3 py-2 border-b border-slate-100 last:border-0" },
      el("span", { class: "text-xs font-mono bg-slate-100 px-2 py-0.5 rounded" }, m.level),
      el("span", { class: "flex-1" }, m.title),
      el("span", { class: "text-xs text-slate-400" }, m.status)));

  return el("section", { class: "mt-6 " + CARD },
    el("h2", { class: "font-bold text-lg" }, "Tu plan de estudio"),
    el("p", { class: "text-slate-600 text-sm mt-1" },
      `De ${plan.from_level} hacia ${plan.target_level} - ${plan.modules.length} modulos`),
    el("ul", { class: "mt-4" }, preview),
    plan.modules.length > 6
      ? el("p", { class: "mt-3 text-sm text-slate-500" }, `y ${plan.modules.length - 6} modulos mas...`)
      : null);
}

function stub(title, text) {
  return el("div", { class: CARD + " opacity-60" },
    el("h3", { class: "font-bold" }, title),
    el("p", { class: "mt-2 text-slate-600 text-sm" }, text));
}
