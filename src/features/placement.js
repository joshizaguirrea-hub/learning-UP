/**
 * features/placement.js — Onboarding + examen de ubicacion.
 *
 * Flujo en 3 pasos:
 *   1) Autoevaluacion: "Cuanto sabes de ingles?" (De cero / Intermedio / Avanzado)
 *      -> ajusta en que nivel EMPIEZA el examen adaptativo.
 *   2) Examen retador (6 competencias, A1-C1) que se adapta a tus respuestas.
 *   3) Resultado: nivel MCER + desglose por competencia.
 *
 * Capa de feature: orquesta el motor puro (core/placement) con la persistencia
 * (services/placement) y la presentacion (ui/).
 */
import { PLACEMENT_QUESTIONS, SKILL_LABELS } from "../data/placement-questions.js";
import { createSession, nextQuestion, answer, progress, result, startIndexFor } from "../core/placement.js";
import { savePlacement } from "../services/placement.js";
import { CEFR_INFO } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

const SELF_LEVELS = [
  { id: "basico", emoji: "\uD83C\uDF31", title: "De cero", desc: "Casi no se ingles o empiezo desde el principio.",
    grad: "from-emerald-500 to-teal-600" },
  { id: "intermedio", emoji: "\uD83D\uDE80", title: "Intermedio", desc: "Entiendo y hablo cosas del dia a dia.",
    grad: "from-indigo-500 to-violet-600" },
  { id: "avanzado", emoji: "\uD83C\uDFAF", title: "Avanzado", desc: "Me defiendo bien; quiero pulir y certificar.",
    grad: "from-fuchsia-500 to-pink-600" },
];

export function renderPlacement(container, user) {
  showIntro(container, user);
}

// --------------------------------------------------------------------------
// Paso 1: autoevaluacion
// --------------------------------------------------------------------------
function showIntro(container, user) {
  const cards = SELF_LEVELS.map((lv) =>
    el("button", { type: "button",
      class: "group text-left rounded-2xl border border-slate-700 bg-slate-800/50 p-5 " +
        "hover:-translate-y-1 hover:border-indigo-500 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => startExam(container, user, lv.id) },
      el("div", { class: `w-12 h-12 rounded-xl bg-gradient-to-br ${lv.grad} grid place-items-center text-2xl mb-3` }, lv.emoji),
      el("p", { class: "text-lg font-bold text-slate-100" }, lv.title),
      el("p", { class: "text-sm text-slate-400 mt-1" }, lv.desc));

  const view = el("div", { class: CARD },
    el("h1", { class: "text-2xl font-extrabold" }, "Cuanto sabes de ingles?"),
    el("p", { class: "text-slate-400 mt-1" },
      "Elige como te sientes hoy. Ajustamos el examen a tu nivel para no aburrirte ni asustarte."),
    el("div", { class: "mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3" }, ...cards),
    el("div", { class: "mt-6 rounded-xl bg-indigo-500/10 border border-indigo-500/30 p-4" },
      el("p", { class: "text-sm text-indigo-200 font-semibold" }, "El examen evalua 6 competencias:"),
      el("p", { class: "text-sm text-indigo-200/90 mt-1" },
        "Gramatica \u00b7 Vocabulary \u00b7 Reading \u00b7 Literatura \u00b7 Writing \u00b7 Speaking")),
    el("button", { type: "button",
      class: "mt-5 text-sm text-slate-400 hover:text-slate-200 underline focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
      onclick: () => skipAsBeginner(container, user) },
      "Soy principiante total, saltar el examen y empezar en A1"));

  mount(container, view);
  focusMainHeading(container);
}

function startExam(container, user, selfLevel) {
  const session = createSession(PLACEMENT_QUESTIONS, { startIndex: startIndexFor(selfLevel) });
  showQuestion(container, user, session);
}

/** Atajo: principiante total -> guarda A1 sin examen. */
async function skipAsBeginner(container, user) {
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-300" }, "Preparando tu curso...")));
  await savePlacement(user.id, { cefr: "A1", correct: 0, total: 0, byLevel: {}, bySkill: {} });
  go("/student");
}

// --------------------------------------------------------------------------
// Paso 2: examen
// --------------------------------------------------------------------------
function showQuestion(container, user, session) {
  const q = nextQuestion(session);
  if (!q) { showResult(container, user, session); return; }

  const pct = Math.round(progress(session) * 100);
  const num = session.answers.length + 1;

  const options = q.choices.map((text, i) =>
    el("button", {
      class: "w-full text-left px-4 py-3 rounded-lg border border-slate-700 text-slate-200 " +
        "hover:bg-slate-800 hover:border-indigo-500 focus:outline focus:outline-2 " +
        "focus:outline-indigo-500 transition-colors",
      onclick: () => { answer(session, q, i); showQuestion(container, user, session); },
    }, text));

  const view = el("div", { class: CARD },
    progressBar(pct),
    el("div", { class: "flex items-center justify-between mt-4" },
      el("p", { class: "text-sm text-slate-400" }, `Pregunta ${num} de ${session.maxQuestions}`),
      skillBadge(q.skill)),
    el("h1", { class: "text-lg sm:text-xl font-bold mt-3 leading-relaxed" }, q.prompt),
    el("div", { class: "mt-6 space-y-3" }, ...options),
    el("p", { class: "mt-6 text-xs text-slate-500" }, "El examen se adapta a tus respuestas."));

  mount(container, view);
  focusMainHeading(container);
  announce(`Pregunta ${num} de ${session.maxQuestions}, ${SKILL_LABELS[q.skill] || q.skill}`);
}

function skillBadge(skill) {
  return el("span", { class: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30" },
    SKILL_LABELS[skill] || skill);
}

// --------------------------------------------------------------------------
// Paso 3: resultado
// --------------------------------------------------------------------------
async function showResult(container, user, session) {
  mount(container, el("div", { class: CARD },
    el("h1", { class: "text-xl font-bold" }, "Calculando tu nivel..."),
    el("p", { class: "mt-2 text-slate-400 text-sm" }, "Un momento, guardando tu plan.")));

  const examResult = result(session);
  const saved = await savePlacement(user.id, examResult);
  const info = CEFR_INFO[examResult.cefr] || {};

  const skillRows = Object.entries(examResult.bySkill).map(([skill, s]) => {
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    return el("div", { class: "flex items-center gap-3" },
      el("span", { class: "w-24 text-sm text-slate-300 shrink-0" }, SKILL_LABELS[skill] || skill),
      el("div", { class: "flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden" },
        el("div", { class: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400", style: `width:${pct}%` })),
      el("span", { class: "text-xs text-slate-400 w-14 text-right shrink-0" }, `${s.correct}/${s.total}`));
  });

  const children = [
    el("p", { class: "text-sm text-slate-400" }, "Tu nivel es"),
    el("p", { class: "text-5xl font-extrabold text-indigo-300 mt-1" }, examResult.cefr),
    el("p", { class: "text-lg font-semibold mt-1" }, info.label || ""),
    el("p", { class: "text-slate-400 mt-1" }, info.blurb || ""),
    el("p", { class: "mt-4 text-sm text-slate-400" }, `Acertaste ${examResult.correct} de ${examResult.total} preguntas.`),
    skillRows.length
      ? el("div", { class: "mt-5 text-left" },
          el("p", { class: "text-sm font-semibold text-slate-200 mb-3" }, "Por competencia:"),
          el("div", { class: "space-y-2.5" }, ...skillRows))
      : null,
    el("div", { class: "mt-5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 text-sm text-indigo-200" },
      "Preparamos tu curso con unidades para tu nivel. A aprender!"),
  ];

  if (!saved.ok) {
    children.push(el("div", { role: "alert",
      class: "mt-4 bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-md px-3 py-2" },
      `No se pudo guardar: ${saved.error}`));
  }

  children.push(el("button", { class: "mt-6 w-full py-2.5 " + BTN, onclick: () => go("/student") }, "Ver mi curso"));

  mount(container, el("div", { class: CARD + " text-center" }, ...children));
  focusMainHeading(container);
  announce(`Tu nivel es ${examResult.cefr}, ${info.label || ""}.`);
}

function progressBar(pct) {
  return el("div", { class: "w-full bg-slate-800 rounded-full h-2", role: "progressbar",
    "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
    el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full transition-all", style: `width:${pct}%` }));
}
