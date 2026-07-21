/**
 * features/speaking-coach.js — "Coach de Habla": el HUB de la estrella.
 *
 * Reune TODO lo de hablar en un solo lugar y lo corona con el Speaking Score:
 *   - Entrevista de trabajo con IA (el diferenciador estrella)
 *   - Roleplay de escenas reales (mesero, aeropuerto, doctor...)
 *   - Practica de pronunciacion (frases de supervivencia)
 *
 * Reutiliza openInterview, openVoiceCall (modo roleplay) y openSpeaking. La meta
 * es que HABLAR sea el producto: un numero que sube y practica sin miedo.
 */
import { el, mount } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { focusMainHeading } from "../ui/a11y.js";
import { getStudentProfile } from "../services/profiles.js";
import { getSpeakingScore, scoreLabel } from "../core/speaking-score.js";
import { openInterview } from "./interview.js";
import { openVoiceCall } from "./voice-call.js";
import { openSpeaking } from "./speaking.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

// Escenas de roleplay: la vida real donde la gente teme hablar en ingles.
const SCENES = [
  { emoji: "\uD83C\uDF7D\ufe0f", title: "En un restaurante", scene: "You are a friendly waiter at a restaurant in the US. The student is a customer ordering food and drinks." },
  { emoji: "\u2708\ufe0f", title: "En el aeropuerto", scene: "You are an airport check-in agent. The student is a traveler checking in for an international flight." },
  { emoji: "\uD83C\uDFE8", title: "En el hotel", scene: "You are a hotel receptionist. The student is a guest checking in and asking about the room and services." },
  { emoji: "\uD83D\uDC8A", title: "En el doctor", scene: "You are a doctor at a clinic. The student is a patient describing symptoms and asking questions." },
  { emoji: "\uD83D\uDED2", title: "De compras", scene: "You are a shop assistant in a clothing store. The student is a customer asking for sizes, colors and prices." },
  { emoji: "\uD83E\uDD1D", title: "Conociendo gente", scene: "You are a friendly person at a social event. The student is meeting you for the first time and making small talk." },
];

// Frases de supervivencia para la practica de pronunciacion (sin depender de una unidad).
const SURVIVAL = {
  title: "Frases esenciales",
  level: "A2",
  vocab: [
    { example: "Nice to meet you. How are you?" },
    { example: "Could you help me, please?" },
    { example: "I would like a coffee, please." },
    { example: "How much does this cost?" },
    { example: "Where is the bathroom?" },
    { example: "Can you say that again, please?" },
    { example: "I don't understand. Speak slowly, please." },
    { example: "Thank you very much. Have a nice day!" },
  ],
};

export async function renderSpeakingCoach(container, user) {
  const profile = await getStudentProfile(user.id).catch(() => null);
  const level = profile?.cefr_level || "B1";
  const score = getSpeakingScore(user.id);

  mount(container, el("div", { class: "space-y-6 max-w-3xl mx-auto" },
    header(),
    scoreCard(score),
    interviewHero(level, user.id),
    scenesSection(level),
    pronunciationCard(level)));
  focusMainHeading(container);
}

function header() {
  return el("section", { class: "text-center pt-2" },
    el("h1", { class: "text-2xl sm:text-3xl font-extrabold" },
      el("span", { class: "bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent" }, "Coach de Habla")),
    el("p", { class: "mt-2 text-slate-400 max-w-xl mx-auto text-sm" },
      "Aprende a HABLAR ingl\u00e9s sin miedo. Practica con la IA, sube tu Speaking Score y prep\u00e1rate para lo que de verdad importa."));
}

function scoreCard(score) {
  const info = scoreLabel(score.best);
  const stat = (v, l) => el("div", { class: "text-center" },
    el("p", { class: "text-2xl font-extrabold text-sky-300" }, String(v)),
    el("p", { class: "text-[11px] text-slate-400 uppercase tracking-wide mt-0.5" }, l));
  const ring = el("div", {
    class: "relative w-24 h-24 rounded-full grid place-items-center shrink-0",
    style: "background: conic-gradient(#38bdf8 " + (score.best * 3.6) + "deg, rgba(148,163,184,.2) 0deg)",
  },
    el("div", { class: "w-20 h-20 rounded-full bg-slate-900 grid place-items-center" },
      el("div", { class: "text-center" },
        el("p", { class: "text-2xl font-extrabold text-sky-300 leading-none" }, String(score.best)),
        el("p", { class: "text-[9px] text-slate-400 uppercase tracking-wide" }, "Speaking"))));

  return el("section", { class: PANEL + " p-5 flex items-center gap-5 flex-wrap" },
    ring,
    el("div", { class: "flex-1 min-w-[10rem]" },
      el("p", { class: "text-lg font-bold text-slate-100" }, score.sessions ? info.label : "A\u00fan sin practicar"),
      el("p", { class: "text-sm text-slate-400 mt-0.5" },
        score.sessions ? "Tu mejor Speaking Score. \u00a1S\u00fabelo hablando m\u00e1s!" : "Haz tu primera pr\u00e1ctica y estrena tu Speaking Score."),
      el("div", { class: "mt-3 flex gap-5" },
        stat(score.avg, "Promedio"), stat(score.sessions, "Sesiones"), stat(score.last, "\u00daltima"))));
}

function interviewHero(level, userId) {
  return el("section", {
    class: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-indigo-600 to-fuchsia-600 shadow-lg",
  },
    el("div", { class: "absolute -top-1/2 -left-10 w-1/2 h-[200%] bg-white/15 blur-2xl opacity-60", "aria-hidden": "true" }),
    el("div", { class: "relative p-6" },
      el("div", { class: "flex items-center gap-3" },
        el("span", { class: "w-12 h-12 rounded-xl bg-white/15 grid place-items-center text-white shrink-0", html: ICONS.briefcase }),
        el("div", {},
          el("p", { class: "text-white font-extrabold text-xl leading-tight" }, "Entrevista de trabajo con IA"),
          el("p", { class: "text-white/85 text-sm mt-0.5" }, "Bymax hace de reclutador. T\u00fa detallas el puesto; \u00e9l te entrevista en serio y te da feedback."))),
      el("button", {
        type: "button",
        class: "mt-5 inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 focus:outline focus:outline-2 focus:outline-white",
        onclick: () => openInterview({ level, userId }),
      }, el("span", { class: "w-5 h-5", html: ICONS.play }), "Empezar entrevista"),
      el("span", { class: "ml-3 text-white/80 text-xs" }, "\u2b50 Lo que la gente busca")));
}

function scenesSection(level) {
  const cards = SCENES.map((s) => el("button", {
    type: "button",
    class: PANEL + " p-4 text-left hover:bg-slate-800/70 transition hover:-translate-y-0.5 focus:outline focus:outline-2 focus:outline-sky-400",
    onclick: () => openVoiceCall({ level, title: s.scene, mode: "roleplay", label: "Escena" }),
  },
    el("div", { class: "text-3xl", "aria-hidden": "true" }, s.emoji),
    el("p", { class: "mt-2 font-semibold text-slate-100" }, s.title),
    el("p", { class: "text-xs text-slate-400 mt-0.5" }, "Habla con la IA en esta escena")));

  return el("section", {},
    el("h2", { class: "text-lg font-bold text-slate-100 mb-1" }, "Roleplay: escenas reales"),
    el("p", { class: "text-sm text-slate-400 mb-3" }, "Practica esos momentos que dan nervios, con una IA que te sigue la corriente."),
    el("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...cards));
}

function pronunciationCard(level) {
  return el("section", { class: PANEL + " p-5 flex items-center gap-4 flex-wrap" },
    el("span", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-700 grid place-items-center text-white shrink-0", html: ICONS.mic }),
    el("div", { class: "flex-1 min-w-[10rem]" },
      el("p", { class: "font-bold text-slate-100" }, "Pronunciaci\u00f3n: frases esenciales"),
      el("p", { class: "text-sm text-slate-400 mt-0.5" }, "Escucha y repite frases de supervivencia. Puntaje palabra por palabra.")),
    el("button", {
      type: "button",
      class: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-fuchsia-300",
      onclick: () => openSpeaking({ ...SURVIVAL, level }),
    }, "Practicar"));
}
