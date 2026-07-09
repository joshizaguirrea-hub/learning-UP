/**
 * features/lesson.js — Vista de un modulo: leccion + practica + completado.
 *
 * Capa de feature: orquesta core/lesson (contenido + calificacion) con
 * services/progress (persistencia) y la UI. No calcula ni habla con Supabase
 * directamente fuera de los servicios.
 */
import { getModule, setModuleStatus } from "../services/progress.js";
import { getLesson, scorePractice } from "../core/lesson.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-200";
const PRIMARY = "bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg " +
  "hover:bg-indigo-800 focus:outline focus:outline-2 focus:outline-indigo-900";

export async function renderLesson(container, params) {
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-500" }, "Cargando leccion...")));

  const module = await getModule(params.id);
  if (!module) {
    mount(container, el("div", { class: CARD },
      el("p", { class: "text-red-700" }, "No se encontro el modulo."),
      el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver")));
    return;
  }

  // Al abrir, marca en progreso si estaba pendiente (no bloquea la vista).
  if (module.status === "pending") setModuleStatus(module.id, "in_progress");

  const lesson = getLesson(module.level, module.skill);
  const selected = new Array(lesson.practice.length).fill(null);
  const resultSlot = el("div");

  const header = el("div", {},
    el("a", { href: "#/student", class: "text-sm text-indigo-700 underline" }, "< Volver a mi plan"),
    el("div", { class: "flex items-center gap-2 mt-3" },
      el("span", { class: "text-xs font-mono bg-slate-100 px-2 py-0.5 rounded" }, module.level),
      el("h1", { class: "text-2xl font-bold" }, lesson.title)));

  const theory = el("section", { class: "mt-5" },
    el("p", { class: "text-slate-700" }, lesson.intro),
    lesson.examples.length
      ? el("ul", { class: "mt-4 space-y-1 bg-slate-50 rounded-lg p-4 text-slate-700" },
          ...lesson.examples.map((ex) => el("li", { class: "text-sm" }, "- " + ex)))
      : null);

  const children = [header, theory];

  if (!lesson.available) {
    children.push(el("div", { class: "mt-6 bg-amber-50 border border-amber-200 text-amber-900 text-sm rounded-lg p-4" },
      "Contenido interactivo proximamente para esta competencia."));
    children.push(el("button", { class: "mt-6 " + PRIMARY, onclick: () => go("/student") }, "Volver a mi plan"));
    mount(container, el("div", { class: CARD }, ...children));
    focusMainHeading(container);
    return;
  }

  // Practica interactiva.
  const practiceEl = el("section", { class: "mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Practica"),
    ...lesson.practice.map((q, qi) => practiceQuestion(q, qi, selected)));

  const submitBtn = el("button", {
    class: "mt-6 " + PRIMARY,
    onclick: async () => {
      if (selected.includes(null)) {
        mount(resultSlot, feedback(false, "Responde todas las preguntas antes de revisar."));
        return;
      }
      const score = scorePractice(lesson, selected);
      if (score.passed) {
        await setModuleStatus(module.id, "done");
        mount(resultSlot, el("div", {},
          feedback(true, `Muy bien! ${score.correct}/${score.total} correctas. Modulo completado.`),
          el("button", { class: "mt-4 " + PRIMARY, onclick: () => go("/student") }, "Volver a mi plan")));
        announce("Modulo completado.");
      } else {
        mount(resultSlot, feedback(false,
          `Tuviste ${score.correct}/${score.total}. Necesitas al menos 60%. Repasa e intenta de nuevo.`));
        announce("Practica no aprobada, intenta de nuevo.");
      }
    },
  }, "Revisar respuestas");

  children.push(practiceEl, submitBtn, resultSlot);
  mount(container, el("div", { class: CARD }, ...children));
  focusMainHeading(container);
}

/** Una pregunta de practica con opciones seleccionables (tipo radio accesible). */
function practiceQuestion(q, qi, selected) {
  const options = q.choices.map((text, ci) => {
    const id = `q${qi}-c${ci}`;
    const input = el("input", {
      type: "radio", name: `q${qi}`, id, class: "mr-2",
      onchange: () => { selected[qi] = ci; },
    });
    return el("label", { for: id, class: "flex items-center px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 cursor-pointer" },
      input, text);
  });
  return el("fieldset", { class: "mt-4" },
    el("legend", { class: "font-medium text-slate-800" }, `${qi + 1}. ${q.prompt}`),
    el("div", { class: "mt-2 space-y-2" }, ...options));
}

function feedback(ok, msg) {
  return el("div", {
    role: "alert",
    class: "mt-4 text-sm rounded-md px-3 py-2 " +
      (ok ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
          : "bg-amber-50 border border-amber-200 text-amber-900"),
  }, msg);
}
