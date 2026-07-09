/**
 * features/placement.js — UI del examen de ubicacion.
 *
 * Capa de feature: orquesta el motor puro (core/placement) con la
 * persistencia (services/placement) y la presentacion (ui/). No calcula el nivel
 * (eso es del core) ni habla con Supabase directo (eso es del service).
 */
import { PLACEMENT_QUESTIONS } from "../data/placement-questions.js";
import { createSession, nextQuestion, answer, progress, result } from "../core/placement.js";
import { savePlacement } from "../services/placement.js";
import { CEFR_INFO } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-200";

export function renderPlacement(container, user) {
  const session = createSession(PLACEMENT_QUESTIONS);
  showQuestion(container, user, session);
}

/** Pinta la pregunta actual (o pasa al resultado si ya no hay). */
function showQuestion(container, user, session) {
  const q = nextQuestion(session);
  if (!q) { showResult(container, user, session); return; }

  const pct = Math.round(progress(session) * 100);
  const num = session.answers.length + 1;

  const options = q.choices.map((text, i) =>
    el("button", {
      class: "w-full text-left px-4 py-3 rounded-lg border border-slate-300 " +
        "hover:bg-indigo-50 hover:border-indigo-400 focus:outline focus:outline-2 " +
        "focus:outline-indigo-600 transition-colors",
      onclick: () => {
        answer(session, q, i);
        showQuestion(container, user, session); // siguiente pregunta
      },
    }, text)
  );

  const view = el("div", { class: CARD },
    progressBar(pct),
    el("p", { class: "text-sm text-slate-500 mt-4" }, `Pregunta ${num} de ${session.maxQuestions}`),
    el("h1", { class: "text-xl font-bold mt-2" }, q.prompt),
    el("div", { class: "mt-6 space-y-3" }, options),
    el("p", { class: "mt-6 text-xs text-slate-400" }, "Elige la opcion correcta. El examen se adapta a tus respuestas."),
  );

  mount(container, view);
  focusMainHeading(container);
  announce(`Pregunta ${num} de ${session.maxQuestions}`);
}

/** Calcula el resultado, genera el plan, lo guarda y lo muestra. */
async function showResult(container, user, session) {
  mount(container, el("div", { class: CARD },
    el("h1", { class: "text-xl font-bold" }, "Calculando tu nivel..."),
    el("p", { class: "mt-2 text-slate-600 text-sm" }, "Un momento, guardando tu plan.")));

  const examResult = result(session);
  const saved = await savePlacement(user.id, examResult);

  const info = CEFR_INFO[examResult.cefr] || {};
  const children = [
    el("p", { class: "text-sm text-slate-500" }, "Tu nivel es"),
    el("p", { class: "text-5xl font-extrabold text-indigo-700 mt-1" }, examResult.cefr),
    el("p", { class: "text-lg font-semibold mt-1" }, info.label || ""),
    el("p", { class: "text-slate-600 mt-1" }, info.blurb || ""),
    el("p", { class: "mt-4 text-sm text-slate-500" },
      `Acertaste ${examResult.correct} de ${examResult.total} preguntas.`),
    el("div", { class: "mt-4 bg-indigo-50 rounded-lg p-4 text-sm text-indigo-900" },
      "Preparamos tu curso con unidades para tu nivel. A aprender!"),
  ];

  if (!saved.ok) {
    children.push(el("div", {
      role: "alert",
      class: "mt-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-md px-3 py-2",
    }, `No se pudo guardar: ${saved.error}`));
  }

  children.push(el("button", {
    class: "mt-6 w-full bg-indigo-700 text-white font-semibold py-2.5 rounded-lg " +
      "hover:bg-indigo-800 focus:outline focus:outline-2 focus:outline-indigo-900",
    onclick: () => go("/student"),
  }, "Ver mi curso"));

  mount(container, el("div", { class: CARD + " text-center" }, ...children));
  focusMainHeading(container);
  announce(`Tu nivel es ${examResult.cefr}, ${info.label || ""}.`);
}

function progressBar(pct) {
  return el("div", { class: "w-full bg-slate-200 rounded-full h-2", role: "progressbar",
    "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
    el("div", { class: "bg-indigo-600 h-2 rounded-full transition-all", style: `width:${pct}%` }));
}
