/**
 * features/student.js — Dashboard del estudiante (estilo "Fit Match", tema oscuro).
 *
 * Capa de feature: arma el perfil gamificado (avatar, XP, nivel), las tarjetas
 * de dominio por competencia (gradientes), el curso, el repaso y los logros.
 * Los calculos viven en core/gamification (puro); aqui solo se orquesta y pinta.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { countDue, srsStats } from "../services/srs.js";
import { unitsForLevel } from "../data/units/index.js";
import { SKILL_META } from "../data/skill-meta.js";
import { CEFR_INFO } from "../data/cefr.js";
import { ICONS } from "../ui/icons.js";
import { didToday } from "../core/streak.js";
import {
  skillProgress, totalXp, xpToNext, achievements,
} from "../core/gamification.js";
import { el, mount } from "../ui/dom.js";
import { getAccent } from "../ui/prefs.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

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
  const unitsCompleted = units.filter((u) => u.lessons.every((l) => completed.has(l.id))).length;

  const skills = skillProgress(units, completed);
  const xp = totalXp(lessonsDone, srs.learned);
  const logros = achievements({
    placementDone: true, lessonsDone, vocabLearned: srs.learned, unitsCompleted, streak: profile.streak || 0,
  });

  mount(container, el("div", { class: "space-y-6" },
    profileHeader(name, profile, xp),
    nextActionHero(profile, units, completed, due),
    statsRow(profile, srs.learned, lessonsDone),
    skillsSection(skills),
    el("div", { class: "grid lg:grid-cols-2 gap-6 items-start" },
      courseSection(units, progressMap),
      achievementsSection(logros))));
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
function skillsSection(skills) {
  return el("section", {},
    el("h2", { class: "text-lg font-bold mb-3" }, "Tus competencias"),
    el("div", { class: "grid sm:grid-cols-2 gap-3" }, ...skills.map(skillCard)));
}

function skillCard(s) {
  const meta = SKILL_META[s.key];
  const gradient = s.locked ? "from-slate-700 to-slate-800" : meta.gradient;
  const iconBox = el("div", { class: "w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0", html: meta.icon });

  const right = s.locked
    ? el("span", { class: "text-xs font-semibold text-white/70 uppercase tracking-wide" }, "Proximamente")
    : el("div", { class: "text-right" },
        el("p", { class: "text-2xl font-extrabold text-white leading-none" }, `${s.pct}%`),
        el("p", { class: "text-[10px] text-white/70 uppercase tracking-wide mt-1" }, "Dominio"));

  return el(s.locked ? "div" : "a", {
    href: s.locked ? null : `#/competencia/${s.key}`,
    class: `block relative overflow-hidden rounded-xl bg-gradient-to-r ${gradient} shadow-lg ` +
      (s.locked ? "opacity-60" : "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60"),
  },
    el("div", { class: "flex items-center gap-4 p-4" },
      iconBox,
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-white text-lg leading-tight" }, meta.label),
        el("p", { class: "text-white/70 text-sm truncate" }, meta.subtitle)),
      right),
    s.locked ? null
      : el("div", { class: "h-1 bg-black/20" },
          el("div", { class: "h-1 bg-white/80", style: `width:${s.pct}%` })));
}

// --------------------------------------------------------------------------
// Curso (unidades) + repaso + logros
// --------------------------------------------------------------------------
function courseSection(units, progressMap) {
  const cards = units.length
    ? units.map((u) => {
        const done = u.lessons.filter((l) => progressMap[l.id]?.status === "done").length;
        const pct = Math.round((done / u.lessons.length) * 100);
        return el("a", {
          href: `#/unidad/${u.id}`,
          class: "block p-4 rounded-xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500 " +
            "focus:outline focus:outline-2 focus:outline-indigo-500 transition-colors",
        },
          el("div", { class: "flex items-center gap-2" },
            el("span", { class: "text-xs font-mono bg-slate-700 text-slate-200 px-2 py-0.5 rounded" }, u.level),
            el("span", { class: "font-semibold text-slate-100" }, u.title)),
          el("p", { class: "text-sm text-slate-400 mt-1" }, u.subtitle),
          el("div", { class: "w-full bg-slate-700 rounded-full h-1.5 mt-3" },
            el("div", { class: "bg-emerald-400 h-1.5 rounded-full", style: `width:${pct}%` })),
          el("p", { class: "text-xs text-slate-500 mt-1" }, `${done}/${u.lessons.length} lecciones`));
      })
    : [el("p", { class: "text-sm text-slate-400" }, "Pronto habra mas unidades para tu nivel.")];

  return el("section", { class: PANEL + " p-5" },
    el("h2", { class: "text-lg font-bold" }, "Tu curso"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Unidades tematicas con lecciones interactivas."),
    el("div", { class: "mt-4 grid gap-3" }, ...cards));
}

function achievementsSection(logros) {
  const cards = logros.map((a) =>
    el("div", {
      class: "p-4 rounded-xl border text-center " +
        (a.unlocked ? "bg-slate-800 border-amber-500/40" : "bg-slate-900 border-slate-800 opacity-50"),
    },
      el("div", { class: "w-10 h-10 mx-auto rounded-full flex items-center justify-center text-lg font-bold " +
        (a.unlocked ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-600") },
        a.unlocked ? "*" : "-"),
      el("p", { class: "mt-2 text-sm font-semibold " + (a.unlocked ? "text-slate-100" : "text-slate-500") }, a.title),
      el("p", { class: "text-xs text-slate-500 mt-0.5" }, a.desc)));

  return el("section", { class: PANEL + " p-5" },
    el("h2", { class: "text-lg font-bold" }, "Logros"),
    el("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...cards));
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
