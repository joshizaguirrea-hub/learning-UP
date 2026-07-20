/**
 * features/profile.js — Pagina de Perfil del estudiante (el "espejo del progreso").
 *
 * Junta identidad, radar de competencias, progreso al siguiente nivel, metas,
 * mapa de calor de actividad y logros. Solo lectura; la edicion vive en
 * features/profile-edit.js (/perfil/editar).
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { srsStats, getCardsByIds } from "../services/srs.js";
import { getActiveDays } from "../services/activity.js";
import { unitsForLevel } from "../data/units/index.js";
import { SKILL_META } from "../data/skill-meta.js";
import { BONUS_DECKS } from "../data/bonus-decks.js";
import { CEFR_INFO, nextLevel } from "../data/cefr.js";
import { motivationById } from "../data/motivations.js";
import { skillProgress, totalXp, achievements, bonusMedals } from "../core/gamification.js";
import { isoDay } from "../core/srs.js";
import { radarSvg } from "../ui/radar.js";
import { heatmapNode } from "../ui/heatmap.js";
import { ICONS } from "../ui/icons.js";
import { getAccent } from "../ui/prefs.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { openShareCard } from "./share-card.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-5";
export async function renderProfile(container, user) {
  const profile = await getStudentProfile(user.id);
  if (!profile) {
    mount(container, el("div", { class: PANEL }, el("p", { class: "text-slate-400" }, "Aun no tienes perfil de estudiante.")));
    return;
  }
  const name = user.user_metadata?.full_name || "estudiante";
  const level = profile.cefr_level;

const [progress, srs] = await Promise.all([
    getCourseProgress(user.id),
    srsStats(user.id),
  ]);
  const completed = new Set(Object.entries(progress).filter(([, v]) => v.status === "done").map(([k]) => k));
  const units = unitsForLevel(level);
  const lessonsDone = completed.size;
  const unitsCompleted = units.filter((u) => u.lessons.every((l) => completed.has(l.id))).length;

  const since = new Date(); since.setDate(since.getDate() - 118);
  const activeDays = await getActiveDays(user.id, isoDay(since));

  const skills = skillProgress(units, completed);
  const radarItems = Object.keys(SKILL_META).map((key) => {
    const s = skills.find((x) => x.key === key);
    return { label: SKILL_META[key].label, value: s && !s.locked ? s.pct : 0 };
  });

  const totalLessons = units.reduce((a, u) => a + u.lessons.length, 0);
  const levelPct = totalLessons ? Math.round((lessonsDone / totalLessons) * 100) : 0;
  const xp = totalXp(lessonsDone, srs.learned);
  const logros = achievements({ placementDone: true, lessonsDone, vocabLearned: srs.learned, unitsCompleted, streak: profile.streak || 0 });

  // Medallas de los mazos Bonus (misma logica pura que /bonus).
  const bonusIds = BONUS_DECKS.flatMap((d) => d.items.map((i) => i.id));
  const bonusCards = await getCardsByIds(user.id, bonusIds);
  const medals = bonusMedals(BONUS_DECKS, bonusCards);

  mount(container, el("div", { class: "max-w-4xl mx-auto space-y-6" },
    identityCard(name, profile, user),
    el("div", { class: "grid lg:grid-cols-2 gap-6 items-start" },
      radarCard(radarItems),
      el("div", { class: "space-y-6" },
        levelProgressCard(level, levelPct),
        goalsCard(profile))),
    statsRow(profile, xp, srs.learned, lessonsDone),
    shareCard(name, level, profile, xp),
    heatmapCard(activeDays),
    medalsCard(medals),
    achievementsCard(logros)));
  focusMainHeading(container);
}

/** Banner/boton para compartir el progreso en redes (crecimiento). */
function shareCard(name, level, profile, xp) {
  return el("button", {
    type: "button",
    class: "w-full text-left rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 p-5 shadow-lg " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-fuchsia-300",
    onclick: () => openShareCard({ name, level, streak: profile.streak || 0, xp }),
  },
    el("div", { class: "flex items-center gap-4" },
      el("span", { class: "text-3xl" }, "\uD83D\uDCF8"),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-white text-lg" }, "Comparte tu progreso"),
        el("p", { class: "text-white/85 text-sm" }, "Presume tu racha y nivel con una imagen lista para redes")),
      el("span", { class: "text-white/90 text-sm font-semibold" }, "Crear \u2192")));
}

function identityCard(name, profile, user) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");  const info = CEFR_INFO[profile.cefr_level] || {};
  const accent = getAccent();
  const memberSince = user.created_at ? new Date(user.created_at).toLocaleDateString("es", { year: "numeric", month: "long" }) : null;
  const mot = motivationById(profile.goal_reason);

  const chips = [];
  if (profile.native_language) chips.push(chip(`Habla: ${profile.native_language}`));
  if (profile.country) chips.push(chip(profile.country));
  if (mot) chips.push(chip(`${mot.emoji} ${mot.label}`));

  return el("section", { class: PANEL + " overflow-hidden p-0" },
    el("div", { class: `h-24 bg-gradient-to-r ${accent.grad}` }),
    el("div", { class: "px-5 pb-5" },
      el("div", { class: "flex items-end justify-between gap-4 -mt-10 flex-wrap" },
        el("div", { class: "flex items-end gap-4" },
          el("div", { class: `w-24 h-24 rounded-full bg-gradient-to-br ${accent.grad} border-4 border-slate-900 flex items-center justify-center text-3xl font-extrabold text-white` }, initials || "?"),
          el("div", { class: "pb-1" },
            el("h1", { class: "text-2xl font-bold" }, name),
            el("p", { class: "text-sm text-slate-400" }, `Nivel ${profile.cefr_level} - ${info.label || ""}`))),
        el("button", { class: "mb-1 text-sm bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 hover:bg-slate-700",
          onclick: () => go("/perfil/editar") }, "Editar perfil")),
      profile.bio ? el("p", { class: "mt-4 text-slate-300" }, profile.bio)
        : el("p", { class: "mt-4 text-slate-500 italic" }, "Aun no tienes bio. Cuentanos algo de ti!"),
      chips.length ? el("div", { class: "mt-3 flex flex-wrap gap-2" }, ...chips) : null,
      memberSince ? el("p", { class: "mt-3 text-xs text-slate-500" }, `Miembro desde ${memberSince}`) : null));
}

function radarCard(items) {
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Dominio de competencias"),
    el("p", { class: "text-xs text-slate-400 mt-0.5" }, "Tu nivel en cada habilidad."),
    el("div", { class: "mt-2 mx-auto", style: "max-width:280px", html: radarSvg(items) }));
}

function levelProgressCard(level, pct) {
  const next = nextLevel(level);
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Progreso de nivel"),
    el("div", { class: "flex items-center justify-between mt-3 text-sm" },
      el("span", { class: "font-mono text-slate-200" }, level),
      el("span", { class: "font-mono text-slate-400" }, next || "Nivel maximo")),
    el("div", { class: "w-full bg-slate-800 rounded-full h-3 mt-2" },
      el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-3 rounded-full", style: `width:${pct}%` })),
    el("p", { class: "mt-2 text-sm text-slate-400" },
      next ? `${pct}% del nivel ${level} completado. Sigue asi para llegar a ${next}!`
           : `${pct}% completado. Estas en el nivel maximo!`));
}

function goalsCard(profile) {
  const mot = motivationById(profile.goal_reason);
  const rows = [
    ["Aprendo para", mot ? `${mot.emoji} ${mot.label}` : "Sin definir"],
    ["Meta diaria", `${profile.daily_goal || 1} leccion(es) / dia`],
    ["Nivel objetivo", profile.target_level || "Sin definir"],
  ];
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Mis metas"),
    el("dl", { class: "mt-3 space-y-2" }, ...rows.map(([k, v]) =>
      el("div", { class: "flex justify-between gap-4 text-sm" },
        el("dt", { class: "text-slate-400" }, k),
        el("dd", { class: "text-slate-100 font-medium text-right" }, v)))),
    el("button", { class: "mt-4 text-sm text-indigo-400 hover:text-indigo-300",
      onclick: () => go("/perfil/editar") }, "Ajustar mis metas ->"));
}

function statsRow(profile, xp, words, lessons) {
  const stat = (v, l) => el("div", { class: PANEL + " p-4 text-center" },
    el("p", { class: "text-2xl font-extrabold text-indigo-300" }, String(v)),
    el("p", { class: "text-xs text-slate-400 mt-1" }, l));
  return el("section", { class: "grid grid-cols-2 sm:grid-cols-5 gap-3" },
    stat(profile.streak || 0, "Racha"),
    stat(profile.best_streak || 0, "Mejor racha"),
    stat(xp, "XP total"),
    stat(words, "Palabras"),
    stat(lessons, "Lecciones"));
}

function heatmapCard(activeDays) {
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Tu actividad"),
    el("p", { class: "text-xs text-slate-400 mt-0.5 mb-3" }, "Ultimas 17 semanas. Cada cuadro verde es un dia que estudiaste."),
    heatmapNode(activeDays));
}

function medalsCard(medals) {
  const earned = medals.filter((m) => m.mastered).length;
  const cards = medals.map((m) =>
    el("div", {
      class: "p-3 rounded-xl border text-center " +
        (m.mastered ? "bg-amber-500/10 border-amber-500/40" : "bg-slate-800/40 border-slate-700 opacity-60"),
    },
      el("div", { class: "mx-auto w-10 h-10 rounded-full flex items-center justify-center " +
        (m.mastered ? "bg-amber-500/20 text-amber-300" : "bg-slate-700 text-slate-500"), html: ICONS.star }),
      el("p", { class: "mt-2 text-sm font-semibold " + (m.mastered ? "text-amber-300" : "text-slate-400") }, m.deck.medalTitle),
      el("p", { class: "text-xs text-slate-500 mt-1" },
        m.mastered ? m.deck.medalDesc : `${m.done}/${m.total} para ganarla`)));

  return el("section", { class: PANEL },
    el("div", { class: "flex items-center justify-between gap-2" },
      el("h2", { class: "font-bold" }, "Medallas Bonus"),
      el("span", { class: "text-xs text-slate-400" }, `${earned}/${medals.length} ganadas`)),
    el("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...cards),
    el("button", { class: "mt-4 text-sm text-indigo-400 hover:text-indigo-300",
      onclick: () => go("/bonus") }, "Ir a los mazos Bonus ->"));
}

function achievementsCard(logros) {
  const cards = logros.map((a) =>
    el("div", { class: "p-3 rounded-xl border text-center " +
        (a.unlocked ? "bg-amber-500/10 border-amber-500/40" : "bg-slate-800/40 border-slate-700 opacity-60") },
      el("p", { class: "text-sm font-semibold " + (a.unlocked ? "text-amber-300" : "text-slate-400") }, a.title),
      el("p", { class: "text-xs text-slate-500 mt-1" }, a.desc)));
  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Logros"),
    el("div", { class: "mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...cards));
}

function chip(text) {
  return el("span", { class: "text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-full" }, text);
}
