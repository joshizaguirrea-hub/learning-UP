/**
 * features/placement.js — Onboarding: cuestionario + examen + PLAN DE TRABAJO.
 *
 * Flujo:
 *   1) Autonivel: Basico / A2 / Intermedio (Prueba) / Avanzado (Prueba).
 *   2) Meta: por que aprendes ingles (trabajo, viajes, estudios, cultura, personal).
 *   3) Tiempo: cuantos minutos al dia (5 / 10 / 15 / 30).
 *   -> si el autonivel es "Prueba": examen adaptativo (6 competencias, A1-C1).
 *      si no: empieza directo en el nivel conocido (A1/A2).
 *   4) PLAN: el profe arma el plan (por donde empezar + orden de competencias)
 *      con core/study-plan.js y lo guarda local (ui/study-plan-store.js).
 *
 * Capa de feature: orquesta motor puro (core/placement + core/study-plan) con la
 * persistencia (services/placement + study-plan-store) y la presentacion (ui/).
 */
import { PLACEMENT_QUESTIONS, SKILL_LABELS } from "../data/placement-questions.js";
import { createSession, nextQuestion, answer, progress, result, startIndexFor } from "../core/placement.js";
import { savePlacement } from "../services/placement.js";
import { CEFR_INFO } from "../data/cefr.js";
import {
  GOALS, MINUTES, SELF_LEVELS, needsTest, cefrForSelfLevel, buildStudyPlan, SKILL_LABEL,
} from "../core/study-plan.js";
import { saveStudyPlan } from "../ui/study-plan-store.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

const LEVEL_GRAD = {
  basico: "from-emerald-500 to-teal-600", a2: "from-teal-500 to-cyan-600",
  intermedio: "from-indigo-500 to-violet-600", avanzado: "from-fuchsia-500 to-pink-600",
};
const GOAL_GRAD = {
  work: "from-emerald-500 to-teal-600", travel: "from-sky-500 to-indigo-600",
  study: "from-indigo-500 to-violet-600", culture: "from-fuchsia-500 to-pink-600",
  personal: "from-amber-500 to-orange-600",
};
const LEVEL_ORDER = ["basico", "a2", "intermedio", "avanzado"];
const MIN_ORDER = [5, 10, 15, 30];

export function renderPlacement(container, user) {
  showSelfLevel(container, user, {});
}

// --------------------------------------------------------------------------
// Paso 1: autonivel
// --------------------------------------------------------------------------
function showSelfLevel(container, user, prefs) {
  const cards = LEVEL_ORDER.map((id) => {
    const lv = SELF_LEVELS[id];
    return el("button", { type: "button",
      class: "group text-left rounded-2xl border border-slate-700 bg-slate-800/50 p-5 " +
        "hover:-translate-y-1 hover:border-indigo-500 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => showGoal(container, user, { ...prefs, selfLevel: id }) },
      el("div", { class: `w-12 h-12 rounded-xl bg-gradient-to-br ${LEVEL_GRAD[id]} grid place-items-center text-2xl mb-3` }, lv.emoji),
      el("p", { class: "text-lg font-bold text-slate-100" }, lv.label),
      el("p", { class: "text-sm text-slate-400 mt-1" }, lv.desc));
  });

  const view = el("div", { class: CARD },
    stepDots(1),
    el("h1", { class: "text-2xl font-extrabold mt-3" }, "\u00bfCu\u00e1nto sabes de ingl\u00e9s?"),
    el("p", { class: "text-slate-400 mt-1" },
      "Elige c\u00f3mo te sientes hoy. Con \u201cPrueba\u201d haremos un examen corto para ubicarte mejor."),
    el("div", { class: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3" }, ...cards));
  mount(container, view);
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Paso 2: meta
// --------------------------------------------------------------------------
function showGoal(container, user, prefs) {
  const cards = Object.entries(GOALS).map(([id, g]) =>
    el("button", { type: "button",
      class: "group text-left rounded-2xl border border-slate-700 bg-slate-800/50 p-5 " +
        "hover:-translate-y-1 hover:border-indigo-500 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => showMinutes(container, user, { ...prefs, goal: id }) },
      el("div", { class: `w-12 h-12 rounded-xl bg-gradient-to-br ${GOAL_GRAD[id]} grid place-items-center text-2xl mb-3` }, g.emoji),
      el("p", { class: "text-lg font-bold text-slate-100" }, g.label),
      el("p", { class: "text-sm text-slate-400 mt-1" }, g.desc)));

  const view = el("div", { class: CARD },
    stepDots(2),
    el("h1", { class: "text-2xl font-extrabold mt-3" }, "\u00bfPara qu\u00e9 quieres el ingl\u00e9s?"),
    el("p", { class: "text-slate-400 mt-1" }, "Tu meta decide por d\u00f3nde empezamos y qu\u00e9 practicar primero."),
    el("div", { class: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3" }, ...cards),
    backLink(() => showSelfLevel(container, user, prefs)));
  mount(container, view);
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Paso 3: tiempo diario
// --------------------------------------------------------------------------
function showMinutes(container, user, prefs) {
  const cards = MIN_ORDER.map((m) => {
    const info = MINUTES[m];
    return el("button", { type: "button",
      class: "group text-left rounded-2xl border border-slate-700 bg-slate-800/50 p-5 " +
        "hover:-translate-y-1 hover:border-indigo-500 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => afterQuestionnaire(container, user, { ...prefs, minutes: m }) },
      el("p", { class: "text-2xl font-black text-indigo-300" }, info.label),
      el("p", { class: "text-sm text-slate-400 mt-1" }, info.blurb),
      el("p", { class: "text-xs text-slate-500 mt-1" }, info.perSession + (info.perSession === 1 ? " actividad/d\u00eda" : " actividades/d\u00eda")));
  });

  const view = el("div", { class: CARD },
    stepDots(3),
    el("h1", { class: "text-2xl font-extrabold mt-3" }, "\u00bfCu\u00e1nto tiempo al d\u00eda?"),
    el("p", { class: "text-slate-400 mt-1" }, "Poco y constante gana. Ajustamos la sesi\u00f3n diaria a tu tiempo."),
    el("div", { class: "mt-6 grid grid-cols-2 gap-3" }, ...cards),
    backLink(() => showGoal(container, user, prefs)));
  mount(container, view);
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Router: prueba o nivel conocido
// --------------------------------------------------------------------------
function afterQuestionnaire(container, user, prefs) {
  if (needsTest(prefs.selfLevel)) {
    const session = createSession(PLACEMENT_QUESTIONS, { startIndex: startIndexFor(prefs.selfLevel) });
    showQuestion(container, user, session, prefs);
  } else {
    finishKnownLevel(container, user, prefs);
  }
}

async function finishKnownLevel(container, user, prefs) {
  const cefr = cefrForSelfLevel(prefs.selfLevel) || "A1";
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-300" }, "Preparando tu plan...")));
  await savePlacement(user.id, { cefr, correct: 0, total: 0, byLevel: {}, bySkill: {} });
  showPlan(container, user, prefs, cefr, null);
}

// --------------------------------------------------------------------------
// Examen (solo para autoniveles "Prueba")
// --------------------------------------------------------------------------
function showQuestion(container, user, session, prefs) {
  const q = nextQuestion(session);
  if (!q) { showResult(container, user, session, prefs); return; }

  const pct = Math.round(progress(session) * 100);
  const num = session.answers.length + 1;

  const options = q.choices.map((text, i) =>
    el("button", {
      class: "w-full text-left px-4 py-3 rounded-lg border border-slate-700 text-slate-200 " +
        "hover:bg-slate-800 hover:border-indigo-500 focus:outline focus:outline-2 " +
        "focus:outline-indigo-500 transition-colors",
      onclick: () => { answer(session, q, i); showQuestion(container, user, session, prefs); },
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

async function showResult(container, user, session, prefs) {
  mount(container, el("div", { class: CARD },
    el("h1", { class: "text-xl font-bold" }, "Calculando tu nivel..."),
    el("p", { class: "mt-2 text-slate-400 text-sm" }, "Un momento, guardando tu plan.")));

  const examResult = result(session);
  await savePlacement(user.id, examResult);
  showPlan(container, user, prefs, examResult.cefr, examResult);
}

// --------------------------------------------------------------------------
// Plan de trabajo final
// --------------------------------------------------------------------------
function showPlan(container, user, prefs, cefr, examResult) {
  const plan = buildStudyPlan({ selfLevel: prefs.selfLevel, goal: prefs.goal, minutes: prefs.minutes, cefr });
  const saved = saveStudyPlan(user.id, plan);
  const info = CEFR_INFO[cefr] || {};

  // Desglose por competencia (solo si hubo examen).
  const skillRows = examResult ? Object.entries(examResult.bySkill).map(([skill, s]) => {
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    return el("div", { class: "flex items-center gap-3" },
      el("span", { class: "w-24 text-sm text-slate-300 shrink-0" }, SKILL_LABELS[skill] || skill),
      el("div", { class: "flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden" },
        el("div", { class: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400", style: `width:${pct}%` })),
      el("span", { class: "text-xs text-slate-400 w-14 text-right shrink-0" }, `${s.correct}/${s.total}`));
  }) : [];

  // Orden de competencias del plan (la de arranque, resaltada).
  const orderRows = plan.skillOrder.map((sk, i) =>
    el("div", { class: "flex items-center gap-3 rounded-xl px-3 py-2 " +
      (i === 0 ? "bg-indigo-500/15 border border-indigo-400/40" : "bg-white/5 border border-white/10") },
      el("span", { class: "w-6 h-6 shrink-0 grid place-items-center rounded-full text-xs font-bold " +
        (i === 0 ? "bg-indigo-500 text-white" : "bg-white/10 text-slate-300") }, String(i + 1)),
      el("span", { class: "text-sm " + (i === 0 ? "text-indigo-100 font-semibold" : "text-slate-300") }, SKILL_LABEL[sk] || sk),
      i === 0 ? el("span", { class: "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200" }, "EMPIEZA AQU\u00cd") : null));

  const children = [
    el("p", { class: "text-sm text-slate-400" }, "Tu nivel es"),
    el("p", { class: "text-5xl font-extrabold text-indigo-300 mt-1" }, cefr),
    el("p", { class: "text-lg font-semibold mt-1" }, info.label || ""),
    examResult ? el("p", { class: "mt-2 text-sm text-slate-400" }, `Acertaste ${examResult.correct} de ${examResult.total} preguntas.`) : null,
    skillRows.length
      ? el("div", { class: "mt-5 text-left" },
          el("p", { class: "text-sm font-semibold text-slate-200 mb-3" }, "Tu examen por competencia:"),
          el("div", { class: "space-y-2.5" }, ...skillRows))
      : null,
    // El plan.
    el("div", { class: "mt-6 text-left rounded-2xl bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/10 border border-indigo-500/30 p-5" },
      el("p", { class: "text-xs uppercase tracking-wide text-indigo-300 font-bold" }, "Tu plan de trabajo"),
      el("p", { class: "mt-1 text-slate-100 leading-relaxed" }, plan.summary),
      el("p", { class: "mt-2 text-sm text-slate-300" }, plan.goalTip),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-slate-400 font-semibold" }, "Orden recomendado"),
      el("div", { class: "mt-2 space-y-2" }, ...orderRows)),
  ];

  if (!saved) {
    children.push(el("p", { class: "mt-3 text-xs text-amber-400" },
      "(No pude guardar el plan en este dispositivo, pero igual puedes empezar.)"));
  }

  children.push(el("button", { class: "mt-6 w-full py-2.5 " + BTN, onclick: () => go("/student") }, "Empezar mi plan"));

  mount(container, el("div", { class: CARD + " text-center" }, ...children));
  focusMainHeading(container);
  announce(`Tu nivel es ${cefr}. ${plan.summary}`);
}

// --------------------------------------------------------------------------
// UI helpers
// --------------------------------------------------------------------------
function stepDots(step) {
  return el("div", { class: "flex items-center gap-2" },
    ...[1, 2, 3].map((n) => el("span", {
      class: "h-1.5 rounded-full transition-all " + (n === step
        ? "w-8 bg-indigo-400" : n < step ? "w-4 bg-indigo-500/60" : "w-4 bg-white/15"),
    })),
    el("span", { class: "ml-2 text-xs text-slate-500" }, `Paso ${step} de 3`));
}

function backLink(onClick) {
  return el("button", { type: "button",
    class: "mt-5 text-sm text-slate-400 hover:text-slate-200 underline focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
    onclick: onClick }, "\u2190 Volver");
}

function progressBar(pct) {
  return el("div", { class: "w-full bg-slate-800 rounded-full h-2", role: "progressbar",
    "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
    el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full transition-all", style: `width:${pct}%` }));
}
