/**
 * features/student.js — Dashboard del estudiante (estilo "Fit Match", tema oscuro).
 *
 * Capa de feature: arma el perfil gamificado (avatar, XP, nivel), el CURSO como
 * protagonista (mosaico de temas) y el repaso. Los calculos viven en
 * core/gamification (puro); aqui solo se orquesta y pinta.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { countDue, srsStats } from "../services/srs.js";
import { unitsForLevel } from "../data/units/index.js";
import { CEFR_INFO } from "../data/cefr.js";
import { ICONS } from "../ui/icons.js";
import { didToday } from "../core/streak.js";
import { totalXp, xpToNext } from "../core/gamification.js";
import { el, mount } from "../ui/dom.js";
import { getAccent } from "../ui/prefs.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { courseCards } from "./course-cards.js";
import { bymaxCard, dailyGreeting } from "./bymax-panel.js";
import { openAntiErrors } from "./anti-errors.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

export async function renderStudent(container, user) {
  const profile = await getStudentProfile(user.id);
  const name = user.user_metadata?.full_name || "estudiante";

  if (!profile || !profile.placement_done) {
    mount(container, placementHero(name));
    focusMainHeading(container);
    return;
  }

  const [progressMap, due, srs] = await Promise.all([
    getCourseProgress(user.id), countDue(user.id), srsStats(user.id),
  ]);

  const completed = new Set(
    Object.entries(progressMap).filter(([, v]) => v.status === "done").map(([id]) => id));
  const lessonsDone = completed.size;
  const units = unitsForLevel(profile.cefr_level);
  const xp = totalXp(lessonsDone, srs.learned);

  mount(container, el("div", { class: "space-y-6" },
    dailyGreeting({ name, streak: profile.streak || 0 }),
    profileHeader(name, profile, xp),
    bymaxCard({ xp, streak: profile.streak || 0 }),
    nextActionHero(profile, units, completed, due),
    courseCards(units, progressMap),
    antiErrorBanner(),
    statsRow(profile, srs.learned, lessonsDone),
    bonusBanner()));
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Perfil (banner con gradiente + avatar + barra de XP)
// --------------------------------------------------------------------------
function profileHeader(name, profile, xp) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
  const info = CEFR_INFO[profile.cefr_level] || {};
  const { into } = xpToNext(xp);
  const accent = getAccent();

  return el("section", { class: PANEL + " overflow-hidden" },
    el("h1", { class: "sr-only" }, `Perfil de ${name}`),
    el("div", { class: `h-20 bg-gradient-to-r ${accent.grad}` }),
    el("div", { class: "px-5 pb-5" },
      el("a", { href: "#/perfil", class: "flex items-end gap-4 -mt-10 group", "aria-label": "Ver mi perfil" },
        el("div", { class: `w-20 h-20 rounded-full bg-gradient-to-br ${accent.grad} border-4 border-slate-900 flex items-center justify-center text-2xl font-extrabold text-white` }, initials || "?"),
        el("div", { class: "pb-1" },
          el("p", { class: "text-xl font-bold group-hover:text-indigo-300" }, name),
          el("p", { class: "text-sm text-slate-400" },
            `Nivel ${profile.cefr_level} - ${info.label || ""}`))),
      el("div", { class: "mt-4" },
        el("div", { class: "flex justify-between text-xs text-slate-400 mb-1" },
          el("span", {}, "Experiencia"),
          el("span", {}, `${into}/100 XP`)),
        el("div", { class: "w-full bg-slate-800 rounded-full h-2", role: "progressbar",
          "aria-valuenow": String(into), "aria-valuemin": "0", "aria-valuemax": "100" },
          el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full", style: `width:${into}%` })))));
}

// --------------------------------------------------------------------------
// Fila de estadisticas
// --------------------------------------------------------------------------
function statsRow(profile, vocab, lessons) {
  const stat = (value, label) =>
    el("div", { class: PANEL + " p-4 text-center" },
      el("p", { class: "text-2xl font-extrabold text-indigo-300" }, String(value)),
      el("p", { class: "text-xs text-slate-400 mt-1" }, label));
  return el("section", { class: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
    stat(profile.cefr_level, "Tu nivel"), stat(profile.streak || 0, "Racha (dias)"),
    stat(vocab, "Palabras"), stat(lessons, "Lecciones"));
}

/** Tarjeta "Continua aqui": friccion cero + racha + meta de hoy (retencion). */
function nextActionHero(profile, units, completed, due) {
  const action = nextAction(units, completed, due);
  const goalDone = didToday(profile.last_active);
  const streak = profile.streak || 0;

  return el("section", { class: "rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 shadow-lg" },
    el("div", { class: "p-5 flex items-center gap-4 flex-wrap" },
      el("div", { class: "flex items-center gap-2" },
        el("span", { class: "w-9 h-9 text-amber-300", html: ICONS.flame }),
        el("div", {},
          el("p", { class: "text-2xl font-extrabold text-white leading-none" }, String(streak)),
          el("p", { class: "text-[10px] text-white/80 uppercase tracking-wide" }, "dias de racha"))),
      el("div", { class: "flex-1 min-w-[12rem]" },
        el("p", { class: "text-white/80 text-sm" }, goalDone ? "Meta de hoy cumplida. Sigue asi!" : "Meta de hoy: estudia algo"),
        el("p", { class: "text-white font-bold text-lg" }, action.label)),
      el("a", { href: action.href,
        class: "flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-3 rounded-xl hover:bg-indigo-50 focus:outline focus:outline-2 focus:outline-white" },
        el("span", { class: "w-5 h-5", html: ICONS.play }), action.cta)));
}

/** Decide la mejor accion siguiente (friccion cero). */
function nextAction(units, completed, due) {
  if (due > 0) return { label: `Repaso del dia: ${due} tarjetas`, cta: "Repasar", href: "#/repaso" };
  for (const u of units) {
    for (const l of u.lessons) {
      if (!completed.has(l.id)) return { label: `${u.title}: ${l.title}`, cta: "Continuar", href: `#/leccion/${l.id}` };
    }
  }
  return { label: "Vas al dia. Explora tu mapa!", cta: "Ver mapa", href: "#/plan" };
}

// --------------------------------------------------------------------------
// Tarjetas de dominio por competencia (estilo Fit Match)
// --------------------------------------------------------------------------

/** Banner del Modo Anti-errores (diferencial: trampas es->en). */
function antiErrorBanner() {
  return el("button", {
    type: "button",
    class: "w-full text-left block rounded-2xl bg-gradient-to-r from-rose-500 to-orange-600 p-5 shadow-lg " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
    onclick: () => openAntiErrors(),
  },
    el("div", { class: "flex items-center gap-4" },
      el("span", { class: "w-10 h-10 text-white shrink-0", html: ICONS.bulb }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-white text-lg" }, "Modo Anti-errores"),
        el("p", { class: "text-white/85 text-sm" }, "Vence las trampas t\u00edpicas del espa\u00f1ol al ingl\u00e9s (he/she, falsos amigos...)")),
      el("span", { class: "text-white/90 text-sm font-semibold" }, "Jugar \u2192")));
}

/** Banner de acceso a los mazos Bonus + medallas. */
function bonusBanner() {
  return el("a", {
    href: "#/bonus",
    class: "block rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-5 shadow-lg " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-amber-300",
  },
    el("div", { class: "flex items-center gap-4" },
      el("span", { class: "w-10 h-10 text-white shrink-0", html: ICONS.star }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-white text-lg" }, "Bonus: gana medallas"),
        el("p", { class: "text-white/85 text-sm" }, "Domina verbos irregulares, pasados y mas. Contenido de memorizar.")),
      el("span", { class: "text-white/90 text-sm font-semibold" }, "Ir ->")));
}

// --------------------------------------------------------------------------
// Estado sin examen: hero para hacer el examen de ubicacion
// --------------------------------------------------------------------------
function placementHero(name) {
  return el("section", { class: PANEL + " overflow-hidden" },
    el("div", { class: "h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600" }),
    el("div", { class: "p-6 -mt-8" },
      el("h1", { class: "text-2xl font-bold" }, `Hola, ${name}`),
      el("p", { class: "mt-2 text-slate-400" },
        "Descubre tu nivel (MCER) con un examen corto y desbloquea tu curso personalizado."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg " +
          "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => go("/examen"),
      }, "Empezar examen de ubicacion")));
}
