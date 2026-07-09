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
import {
  skillProgress, totalXp, playerLevel, xpToNext, achievements,
} from "../core/gamification.js";
import { el, mount } from "../ui/dom.js";
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
  const level = playerLevel(xp);
  const logros = achievements({
    placementDone: true, lessonsDone, vocabLearned: srs.learned, unitsCompleted,
  });

  mount(container, el("div", { class: "space-y-6" },
    profileHeader(name, profile, xp, level),
    statsRow(xp, level, srs.learned, lessonsDone),
    due > 0 ? reviewBanner(due) : null,
    skillsSection(skills),
    courseSection(units, progressMap),
    achievementsSection(logros)));
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Perfil (banner con gradiente + avatar + barra de XP)
// --------------------------------------------------------------------------
function profileHeader(name, profile, xp, level) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
  const info = CEFR_INFO[profile.cefr_level] || {};
  const { into } = xpToNext(xp);

  return el("section", { class: PANEL + " overflow-hidden" },
    el("h1", { class: "sr-only" }, `Perfil de ${name}`),
    el("div", { class: "h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600" }),
    el("div", { class: "px-5 pb-5" },
      el("div", { class: "flex items-end gap-4 -mt-10" },
        el("div", { class: "w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-2xl font-extrabold text-indigo-300" }, initials || "?"),
        el("div", { class: "pb-1" },
          el("p", { class: "text-xl font-bold" }, name),
          el("p", { class: "text-sm text-slate-400" },
            `Nivel ${profile.cefr_level} - ${info.label || ""}`))),
      el("div", { class: "mt-4" },
        el("div", { class: "flex justify-between text-xs text-slate-400 mb-1" },
          el("span", {}, `Nivel de jugador ${level}`),
          el("span", {}, `${into}/100 XP`)),
        el("div", { class: "w-full bg-slate-800 rounded-full h-2", role: "progressbar",
          "aria-valuenow": String(into), "aria-valuemin": "0", "aria-valuemax": "100" },
          el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full", style: `width:${into}%` })))));
}

// --------------------------------------------------------------------------
// Fila de estadisticas
// --------------------------------------------------------------------------
function statsRow(xp, level, vocab, lessons) {
  const stat = (value, label) =>
    el("div", { class: PANEL + " p-4 text-center" },
      el("p", { class: "text-2xl font-extrabold text-indigo-300" }, String(value)),
      el("p", { class: "text-xs text-slate-400 mt-1" }, label));
  return el("section", { class: "grid grid-cols-2 sm:grid-cols-4 gap-3" },
    stat(xp, "XP total"), stat(level, "Nivel"), stat(vocab, "Palabras"), stat(lessons, "Lecciones"));
}

// --------------------------------------------------------------------------
// Tarjetas de dominio por competencia (estilo Fit Match)
// --------------------------------------------------------------------------
function skillsSection(skills) {
  return el("section", {},
    el("h2", { class: "text-lg font-bold mb-3" }, "Tus competencias"),
    el("div", { class: "space-y-3" }, ...skills.map(skillCard)));
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

  return el("div", {
    class: `relative overflow-hidden rounded-xl bg-gradient-to-r ${gradient} shadow-lg ` +
      (s.locked ? "opacity-60" : ""),
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

function reviewBanner(due) {
  return el("a", {
    href: "#/repaso",
    class: "block p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 shadow-lg " +
      "hover:from-emerald-500 hover:to-teal-600 focus:outline focus:outline-2 focus:outline-emerald-400",
  },
    el("p", { class: "font-bold text-white" }, `Repaso del dia: ${due} tarjetas`),
    el("p", { class: "text-sm text-white/80" }, "Manten tu vocabulario fresco con repaso espaciado (SRS)."));
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
