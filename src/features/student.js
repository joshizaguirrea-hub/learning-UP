/**
 * features/student.js — Dashboard del estudiante.
 *
 * Capa de feature: carga el perfil via services y lo muestra. Los recuadros
 * de examen/plan/marketplace son ganchos para fases siguientes.
 */
import { getStudentProfile } from "../services/profiles.js";
import { CEFR_INFO } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

const CARD = "bg-white rounded-xl p-6 shadow-sm border border-slate-200";

export async function renderStudent(container, user) {
  const profile = await getStudentProfile(user.id);

  const header = el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
    el("h1", { class: "text-2xl font-bold" }, `Hola, ${user.user_metadata?.full_name || "estudiante"}`),
    el("span", { class: "text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full" }, "Estudiante"));

  const placement = !profile || !profile.placement_done
    ? el("section", { class: "mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6" },
        el("h2", { class: "font-bold text-lg text-amber-900" }, "Primer paso: examen de ubicacion"),
        el("p", { class: "mt-2 text-amber-800 text-sm" },
          "Todavia no conocemos tu nivel. Haz el examen (MCER) para generar tu plan."),
        el("button", {
          class: "mt-4 bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg " +
            "hover:bg-amber-700 focus:outline focus:outline-2 focus:outline-amber-900",
          disabled: "", title: "Proximamente (Fase 1)",
        }, "Hacer examen (proximamente)"))
    : el("section", { class: "mt-6 " + CARD },
        el("h2", { class: "font-bold text-lg" }, "Tu nivel actual"),
        el("p", { class: "mt-2 text-3xl font-extrabold text-indigo-700" }, profile.cefr_level),
        el("p", { class: "text-slate-600 text-sm" }, CEFR_INFO[profile.cefr_level]?.blurb || ""));

  const cards = el("section", { class: "grid sm:grid-cols-3 gap-6 mt-6" },
    stub("Mi plan de estudio", "Disponible tras el examen de ubicacion."),
    stub("Contenido y practicas", "Libros, audios y ejercicios (Fase 1)."),
    stub("Buscar profesor", "Marketplace de profesores (Fase 2)."));

  mount(container, el("div", {}, header, placement, cards));
  focusMainHeading(container);
}

function stub(title, text) {
  return el("div", { class: CARD + " opacity-60" },
    el("h3", { class: "font-bold" }, title),
    el("p", { class: "mt-2 text-slate-600 text-sm" }, text));
}
