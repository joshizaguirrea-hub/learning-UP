/**
 * features/daily-guide.js — El "coach del dia" en el inicio del estudiante.
 *
 * El profe te SALUDA por tu nombre, te dice el tema de hoy y por que competencia
 * empezar (segun tu plan de trabajo), y te lleva paso a paso:
 *   - primera vez del dia -> "Buenos dias, {nombre}. Hoy vamos a ver {tema}...".
 *   - a media meta -> "Vas X de N, avancemos a la siguiente clase".
 *   - meta cumplida -> "Ya cumpliste tu meta, ¿seguimos o descansas?".
 * Habla FLUIDO (voz ya corregida) y ofrece los botones acordes al momento.
 *
 * Logica pura en core/daily-guide.js; aqui solo presentacion + voz + navegacion.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { go } from "../ui/router.js";
import { speakRobot } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { teacherName } from "../ui/robot.js";
import { buildDailySession, countDoneToday, firstNameOf } from "../core/daily-guide.js";
import { loadStudyPlan } from "../ui/study-plan-store.js";
import { SKILL_LABEL } from "../core/study-plan.js";
import { buildStudyPlan } from "../core/study-plan.js";
import { saveStudyPlan } from "../ui/study-plan-store.js";

let lastSpoken = ""; // evita repetir el MISMO saludo al revisitar el inicio

// --- Estado "descansando por hoy" (localStorage, por usuario y dia) ----------
const REST_KEY = "learningup:rest:";
function dayStamp(now = new Date()) {
  return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
}
function isResting(userId) {
  try { return localStorage.getItem(REST_KEY + (userId || "anon")) === dayStamp(); }
  catch { return false; }
}
function setResting(userId, on) {
  try {
    if (on) localStorage.setItem(REST_KEY + (userId || "anon"), dayStamp());
    else localStorage.removeItem(REST_KEY + (userId || "anon"));
  } catch { /* nada */ }
}

/**
 * Devuelve la tarjeta del coach, o null si no hay plan (aun no hizo onboarding).
 * @param {object} user  @param {string} name  @param {Array} units
 * @param {object} progressMap - id -> { status, completedAt }
 */
export function coachCard(user, name, units, progressMap, cefr) {
  let plan = loadStudyPlan(user.id);
  if (!plan) {
    // Cuenta creada ANTES del cuestionario: generamos un plan por defecto desde
    // su nivel (meta general "personal", 10 min/dia) y lo guardamos, para que el
    // coach aparezca sin obligar a rehacer el onboarding. Podra afinarlo luego.
    plan = buildStudyPlan({ selfLevel: "intermedio", goal: "personal", minutes: 10, cefr: cefr || "A1" });
    saveStudyPlan(user.id, plan);
  }

  const completed = new Set(
    Object.entries(progressMap).filter(([, v]) => v?.status === "done").map(([id]) => id));
  const timestamps = Object.values(progressMap)
    .filter((v) => v?.status === "done").map((v) => v.completedAt);
  const doneToday = countDoneToday(timestamps, new Date());

  const session = buildDailySession({ name, plan, units, completed, doneToday });
  const resting = isResting(user.id);

  const card = el("section", {
    class: "relative overflow-hidden rounded-2xl border border-indigo-500/30 " +
      "bg-gradient-to-br from-indigo-600/25 via-slate-900 to-fuchsia-600/15 p-5 sm:p-6",
  });
  renderInto(card, user, session, plan, resting);
  return card;
}

function renderInto(card, user, session, plan, resting) {
  cancelCloud();
  if (resting && !session.courseDone) { renderResting(card, user, session); return; }

  const goToUnit = () => {
    cancelCloud();
    if (session.unit) go("/unidad/" + session.unit.id);
    else go("/curso");
  };

  // Botones segun el momento del dia.
  const actions = [];
  if (session.courseDone) {
    actions.push(primaryBtn("Repasar mi curso", () => { cancelCloud(); go("/curso"); }));
  } else if (session.metGoal) {
    actions.push(primaryBtn("Seguir otra clase \u2192", goToUnit));
    actions.push(ghostBtn("Terminar por hoy", () => { setResting(user.id, true); renderInto(card, user, session, plan, true); }));
  } else {
    actions.push(primaryBtn(session.doneToday > 0 ? "Avanzar a la siguiente \u2192" : "Empezar la clase de hoy \u2192", goToUnit));
  }
  actions.push(iconBtn(ICONS.sound, "Escuchar de nuevo", () => speakRobot(session.speech, "es-MX")));

  // Ruta de competencias del plan (la de arranque resaltada).
  const chips = (session.order || []).map((sk, i) => el("span", {
    class: "text-[11px] px-2.5 py-1 rounded-full border " + (i === 0
      ? "bg-indigo-500/30 text-indigo-100 border-indigo-400/50 font-semibold"
      : "bg-white/5 text-slate-300 border-white/10"),
  }, SKILL_LABEL[sk] || sk));

  card.replaceChildren(
    el("div", { class: "flex items-start gap-4" },
      el("div", { class: "w-14 shrink-0" }, bymaxMascot("md")),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "text-[11px] uppercase tracking-wide text-indigo-300 font-bold" },
          "Tu profe " + teacherName("course")),
        el("h2", { class: "text-xl font-extrabold text-slate-50 mt-0.5 leading-tight" }, session.headline),
        el("p", { class: "text-slate-300 mt-1 leading-relaxed" }, session.subline),
        session.metGoal && !session.courseDone
          ? progressPills(session.budget, session.doneToday)
          : (session.doneToday > 0 && !session.courseDone ? progressPills(session.budget, session.doneToday) : null))),
    chips.length && !session.courseDone
      ? el("div", { class: "mt-4" },
        el("p", { class: "text-[11px] text-slate-400 mb-1.5" }, "Ruta de hoy en adelante:"),
        el("div", { class: "flex flex-wrap gap-1.5" }, ...chips))
      : null,
    el("div", { class: "mt-5 flex flex-wrap items-center gap-2" }, ...actions));

  // El profe saluda en voz (fluida) SOLO si el mensaje cambio (no repite lo
  // mismo al revisitar el inicio; si cambio -p.ej. "avancemos"- si lo dice).
  // Si el navegador bloquea el autoplay, queda el boton de "escuchar de nuevo".
  if (session.speech !== lastSpoken) {
    lastSpoken = session.speech;
    speakRobot(session.speech, "es-MX");
  }
}

function renderResting(card, user, session) {
  cancelCloud();
  card.replaceChildren(
    el("div", { class: "flex items-center gap-4" },
      el("div", { class: "text-4xl", "aria-hidden": "true" }, "\uD83D\uDE34"),
      el("div", { class: "flex-1" },
        el("h2", { class: "text-lg font-bold text-slate-100" }, "\u00a1Buen trabajo hoy, " + firstNameOf(session.name) + "!"),
        el("p", { class: "text-slate-400 text-sm mt-0.5" }, "Descansa; ma\u00f1ana seguimos. La constancia es la que gana.")),
      el("button", {
        type: "button",
        class: "shrink-0 text-sm px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => { setResting(user.id, false); location.reload(); },
      }, "Retomar")));
}

// --- botones/pildoras -------------------------------------------------------
function primaryBtn(label, onclick) {
  return el("button", { type: "button", onclick,
    class: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-300" }, label);
}
function ghostBtn(label, onclick) {
  return el("button", { type: "button", onclick,
    class: "px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-slate-200 " +
      "hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white" }, label);
}
function iconBtn(html, aria, onclick) {
  return el("button", { type: "button", onclick, "aria-label": aria, title: aria,
    class: "ml-auto grid place-items-center w-10 h-10 rounded-full bg-white/10 text-slate-200 " +
      "hover:bg-white/20 focus:outline focus:outline-2 focus:outline-indigo-400" },
    el("span", { class: "w-5 h-5", html }));
}
function progressPills(budget, done) {
  return el("div", { class: "mt-2 flex items-center gap-1.5" },
    ...Array.from({ length: budget }, (_, i) => el("span", {
      class: "h-2 w-6 rounded-full " + (i < done ? "bg-emerald-400" : "bg-white/15"),
    })),
    el("span", { class: "ml-1 text-[11px] text-slate-400" }, done + "/" + budget + " hoy"));
}
