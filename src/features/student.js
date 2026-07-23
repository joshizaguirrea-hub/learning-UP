/**
 * features/student.js — Pantalla de INICIO (hub) del estudiante.
 *
 * Modelo "hub + pantallas": el inicio es un tablero limpio con el PERFIL y TRES
 * puertas grandes (Curso, Habla con Bymax, Entrevista laboral). Cada puerta
 * navega a su propia pantalla exclusiva (features/course-screen, speaking-screen,
 * job-screen). Los bonos viven DENTRO del curso, no sueltos. Menos ruido, mas foco.
 *
 * Los calculos viven en core/*; aqui solo se orquesta y pinta.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { countDue, srsStats } from "../services/srs.js";
import { unitsForLevel } from "../data/units/index.js";
import { CEFR_INFO } from "../data/cefr.js";
import { ICONS } from "../ui/icons.js";
import { totalXp, xpToNext } from "../core/gamification.js";
import { el, mount } from "../ui/dom.js";
import { getAccent } from "../ui/prefs.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";
import { hubCard } from "../ui/hub-ui.js";
import { REVIEW_SESSION } from "./review.js";

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
  const pct = coursePct(units, completed);

  mount(container, el("div", { class: "max-w-4xl mx-auto space-y-6" },
    el("div", {},
      el("h1", { class: "text-2xl sm:text-3xl font-extrabold" }, `Hola, ${firstName(name)}!`),
      el("p", { class: "text-slate-400" }, "Que quieres hacer hoy?")),
    profileCard(name, profile, xp, srs.learned, lessonsDone),
    continueBar(profile, units, completed, due),
    hubGrid(profile, pct),
    secondaryLinks()));
  focusMainHeading(container);
}

// --------------------------------------------------------------------------
// Perfil: avatar con anillo de XP + nivel + barra + stats
// --------------------------------------------------------------------------
function profileCard(name, profile, xp, vocab, lessons) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
  const info = CEFR_INFO[profile.cefr_level] || {};
  const { into } = xpToNext(xp);
  const accent = getAccent();

  return el("a", { href: "#/perfil", class: PANEL + " block p-5 overflow-hidden group", "aria-label": "Ver mi perfil" },
    el("div", { class: "flex items-center gap-5 flex-wrap" },
      // Avatar con anillo de XP (conic via style).
      el("div", { class: "relative w-20 h-20 rounded-full grid place-items-center shrink-0",
        style: `background:conic-gradient(#a78bfa ${into * 3.6}deg, rgba(255,255,255,.08) 0)` },
        el("div", { class: "w-[68px] h-[68px] rounded-full bg-slate-900 grid place-items-center" },
          el("div", { class: `w-14 h-14 rounded-full bg-gradient-to-br ${accent.grad} grid place-items-center text-xl font-black text-white` }, initials || "?"))),
      el("div", { class: "flex-1 min-w-[12rem]" },
        el("div", { class: "flex items-center gap-2 flex-wrap" },
          el("p", { class: "text-xl font-extrabold group-hover:text-indigo-300" }, name),
          el("span", { class: "text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30" },
            `${profile.cefr_level} - ${info.label || ""}`)),
        el("div", { class: "mt-2 flex items-center gap-2" },
          el("div", { class: "flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden", role: "progressbar",
            "aria-valuenow": String(into), "aria-valuemin": "0", "aria-valuemax": "100" },
            el("div", { class: "h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400", style: `width:${into}%` })),
          el("span", { class: "text-xs text-slate-300 font-bold whitespace-nowrap" }, `${into}/100 XP`)),
        el("div", { class: "mt-3 flex gap-5" },
          miniStat(profile.streak || 0, "racha", "text-amber-300"),
          miniStat(vocab, "palabras", "text-sky-300"),
          miniStat(lessons, "lecciones", "text-emerald-300")))));
}

function miniStat(value, label, color) {
  return el("div", {},
    el("p", { class: `text-lg font-black leading-none ${color}` }, String(value)),
    el("p", { class: "text-[10px] text-slate-400" }, label));
}

// --------------------------------------------------------------------------
// Barra "Continua" (friccion cero)
// --------------------------------------------------------------------------
function continueBar(profile, units, completed, due) {
  const action = nextAction(units, completed, due);
  return el("a", { href: action.href,
    class: "flex items-center gap-3 rounded-2xl px-4 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg " +
      "transition hover:-translate-y-0.5 focus:outline focus:outline-2 focus:outline-white/70" },
    el("span", { class: "w-9 h-9 grid place-items-center rounded-xl bg-white/20 shrink-0 text-white", html: ICONS.play }),
    el("div", { class: "flex-1 min-w-0" },
      el("p", { class: "text-[11px] uppercase tracking-wide text-white/70 font-bold" }, "Continua donde ibas"),
      el("p", { class: "font-bold text-white truncate" }, action.label)),
    el("span", { class: "text-white font-black shrink-0" }, action.cta));
}

function nextAction(units, completed, due) {
  if (due > 0) {
    const batch = Math.min(due, REVIEW_SESSION);
    return { label: `Repaso del dia: ${batch} tarjeta${batch === 1 ? "" : "s"}`, cta: "Repasar", href: "#/repaso" };
  }
  for (const u of units) {
    for (const l of u.lessons) {
      if (!completed.has(l.id)) return { label: `${u.title}: ${l.title}`, cta: "Seguir", href: `#/leccion/${l.id}` };
    }
  }
  return { label: "Vas al dia. Explora tu mapa!", cta: "Mapa", href: "#/plan" };
}

// --------------------------------------------------------------------------
// Las 3 puertas grandes
// --------------------------------------------------------------------------
function hubGrid(profile, pct) {
  return el("section", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
    hubCard({
      href: "#/curso", grad: accentGrad("brand"), icon: ICONS.book,
      title: "Tu curso", subtitle: "Unidades, lecciones y bonos",
      extra: el("div", { class: "mt-2 h-1.5 rounded-full bg-white/25 overflow-hidden" },
        el("div", { class: "h-full bg-white rounded-full transition-all", style: `width:${pct}%` })),
    }),
    hubCard({
      href: "#/hablar", grad: accentGrad("speak"), icon: ICONS.mic,
      title: "Habla con Bymax", subtitle: "Speaking, llamada y pronunciacion",
    }),
    hubCard({
      href: "#/trabajo", grad: "from-emerald-500 via-teal-600 to-teal-800", icon: ICONS.briefcase,
      title: "Prepara tu entrevista", subtitle: "Simulacro con IA + CV Coach", badge: "TOP",
    }));
}

// Accesos secundarios (para no dejar huerfanas estas secciones).
function secondaryLinks() {
  const link = (href, icon, label) =>
    el("a", { href, class: "flex flex-col items-center gap-1 py-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/5 " +
      "focus:outline focus:outline-2 focus:outline-indigo-400" },
      el("span", { class: "w-6 h-6", html: icon }),
      el("span", { class: "text-[11px] font-medium" }, label));
  return el("section", { class: PANEL + " p-2 grid grid-cols-4 gap-1" },
    link("#/plan", ICONS.map, "Mi Plan"),
    link("#/profesores", ICONS.teachers, "Profesores"),
    link("#/calendario", ICONS.calendar, "Agenda"),
    link("#/chat", ICONS.chat, "Chat"));
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function firstName(name) { return name.trim().split(/\s+/)[0] || name; }

function coursePct(units, completed) {
  let total = 0, done = 0;
  for (const u of units) for (const l of u.lessons) { total++; if (completed.has(l.id)) done++; }
  return total ? Math.round((done / total) * 100) : 0;
}

// --------------------------------------------------------------------------
// Estado sin examen: hero para hacer el examen de ubicacion
// --------------------------------------------------------------------------
function placementHero(name) {
  return el("section", { class: PANEL + " overflow-hidden max-w-2xl mx-auto" },
    el("div", { class: "h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600" }),
    el("div", { class: "p-6 -mt-8" },
      el("h1", { class: "text-2xl font-bold" }, `Hola, ${firstName(name)}`),
      el("p", { class: "mt-2 text-slate-400" },
        "Descubre tu nivel (MCER) con un examen corto y desbloquea tu curso personalizado."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-lg " +
          "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => go("/examen"),
      }, "Empezar examen de ubicacion")));
}
