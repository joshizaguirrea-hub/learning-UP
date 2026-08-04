/**
 * ui/resume.js — Tarjeta visual "¿Continuar donde quedaste?" (autosave/continuar).
 *
 * La LOGICA de persistencia (guardar/cargar/borrar el avance) es pura y vive en
 * core/resume.js (testeable). Aqui solo va la parte que toca el DOM. Re-exportamos
 * las funciones de core para que los ejercicios importen todo desde un solo lugar.
 */
import { el } from "./dom.js";
import { teacherFace } from "./bymax-mascot.js";

export { makeResumeKey, saveProgress, loadProgress, clearProgress } from "../core/resume.js";

const ACCENTS = {
  indigo: "from-indigo-500 to-fuchsia-500",
  pink: "from-pink-500 to-rose-500",
  sky: "from-sky-500 to-cyan-500",
  emerald: "from-emerald-500 to-teal-500",
};

/**
 * Tarjeta reusable "¿Continuar donde quedaste?". La coloca el ejercicio en su
 * escenario cuando detecta progreso guardado.
 * @param {object} cfg { step, total, accent, onResume, onRestart }
 *   step  = numero del paso donde se quedo (1-based)
 *   total = total de pasos (opcional; se muestra si viene)
 */
export function resumeCard({ step, total, accent = "indigo", onResume, onRestart } = {}) {
  const grad = ACCENTS[accent] || ACCENTS.indigo;
  const where = total ? `Paso ${step} de ${total}` : `Paso ${step}`;
  return el("div", { class: "text-center py-6" },
    el("div", { class: "w-24 mx-auto" }, teacherFace("lg")),
    el("h3", { class: "text-xl font-bold text-slate-100 mt-3" }, "\u00a1Bienvenido de vuelta!"),
    el("p", { class: "mt-2 text-slate-300 max-w-sm mx-auto" },
      "Dejaste este ejercicio a medias. \u00bfSeguimos donde te quedaste?"),
    el("p", { class: "mt-1 text-sm text-slate-400" }, where),
    el("div", { class: "mt-6 flex flex-col gap-2 max-w-xs mx-auto" },
      el("button", {
        type: "button",
        class: "w-full bg-gradient-to-r " + grad + " text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70",
        onclick: () => onResume?.(),
      }, "Continuar \u2192"),
      el("button", {
        type: "button",
        class: "w-full border border-white/15 bg-white/5 text-slate-300 font-semibold px-6 py-3 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white/40",
        onclick: () => onRestart?.(),
      }, "Empezar de nuevo")));
}
