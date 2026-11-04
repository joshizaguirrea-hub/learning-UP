/**
 * features/passport.js — "Tu pasaporte": sellos de examenes aprobados (#/pasaporte).
 *
 * Capa de feature (presentacion). Cada unidad aprobada estampa un sello
 * circular con el emoji y el color de su tema -- la MISMA identidad visual
 * que ya usa su tarjeta en "Tu curso" (features/course-cards.js), para que se
 * sienta el mismo objeto, no una pantalla nueva inventada.
 *
 * Logica de "quien tiene sello" vive en core/passport.js (pura, sin DOM).
 */
import { getCourseProgress } from "../services/course.js";
import { unitsForLanguage } from "../data/units/index.js";
import { buildPassport } from "../core/passport.js";
import { CEFR_ORDER, CEFR_INFO } from "../data/cefr.js";
import { currentLangCode } from "../ui/nav.js";
import { languageName } from "../data/languages.js";
import { TILES, topicEmoji } from "./course-cards.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { accentGrad } from "../ui/theme.js";

export async function renderPassport(container, user) {
  mount(container, el("div", { class: "max-w-3xl mx-auto" }, el("p", { class: "text-slate-400 text-center py-10" }, "Cargando tu pasaporte...")));

  const lang = currentLangCode();
  const progress = await getCourseProgress(user.id);
  const units = unitsForLanguage(lang);
  const passport = buildPassport(units, progress);
  const totalEarned = passport.filter((p) => p.earned).length;

  const byLevel = new Map();
  passport.forEach((p) => {
    const lv = p.unit.level || "Otros";
    if (!byLevel.has(lv)) byLevel.set(lv, []);
    byLevel.get(lv).push(p);
  });
  const levels = CEFR_ORDER.filter((lv) => byLevel.has(lv));

  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backHome(),
    screenHeader({
      icon: ICONS.star, grad: accentGrad("reward"),
      title: "Tu pasaporte", subtitle: languageName(lang),
    }),
    summaryCard(totalEarned, passport.length),
    ...levels.map((lv) => levelPage(lv, byLevel.get(lv))),
    passport.length === 0 ? emptyState() : null));
  focusMainHeading(container);
}

/** Tarjeta resumen: cuantos sellos llevas en total, con una frase que empuja. */
function summaryCard(earned, total) {
  const pct = total ? Math.round((earned / total) * 100) : 0;
  const msg = earned === 0
    ? "Tu primer sello esta a un examen de distancia."
    : earned === total
      ? "\u00a1Pasaporte completo! Eres de temer."
      : `Llevas ${earned} de ${total}. ${total - earned} temas mas por sellar.`;
  return el("div", { class: "rounded-2xl bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/10 border border-indigo-500/30 p-5 text-center" },
    el("p", { class: "text-4xl font-black text-white" }, `${earned}/${total}`),
    el("p", { class: "text-xs uppercase tracking-wide text-indigo-300 mt-1" }, "sellos ganados"),
    el("div", { class: "mt-3 w-full max-w-xs mx-auto bg-white/10 rounded-full h-2 overflow-hidden" },
      el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full transition-all", style: `width:${pct}%` })),
    el("p", { class: "mt-3 text-sm text-slate-300" }, msg));
}

/** Una "pagina" del pasaporte: un nivel MCER con sus sellos (ganados o no). */
function levelPage(level, entries) {
  const info = CEFR_INFO[level] || {};
  const earnedHere = entries.filter((e) => e.earned).length;
  return el("section", { class: "rounded-2xl bg-slate-900 border border-slate-800 p-5" },
    el("div", { class: "flex items-center justify-between flex-wrap gap-2 mb-4" },
      el("div", {},
        el("h2", { class: "font-bold text-lg text-slate-100" }, "Nivel " + level + (info.label ? " \u00b7 " + info.label : "")),
        info.blurb ? el("p", { class: "text-xs text-slate-500 mt-0.5" }, info.blurb) : null),
      el("span", { class: "text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 text-slate-300" }, `${earnedHere}/${entries.length}`)),
    el("div", { class: "grid grid-cols-3 sm:grid-cols-4 gap-4" }, ...entries.map((e, i) => stamp(e, i))));
}

/** Un sello circular: color + emoji + check si se gano; gris + candado si no. */
function stamp({ unit, earned, stampedAt }, i) {
  const grad = TILES[i % TILES.length];
  const tilt = i % 2 === 0 ? "-rotate-3" : "rotate-2";
  const dateTxt = stampedAt ? fmtShortDate(stampedAt) : null;

  const circle = el("div", {
    class: "relative w-16 h-16 sm:w-20 sm:h-20 rounded-full grid place-items-center border-2 border-dashed " +
      "transition-transform hover:scale-105 " + tilt + " " +
      (earned ? `bg-gradient-to-br ${grad} border-white/40 shadow-lg` : "bg-slate-800/60 border-slate-700"),
    "aria-hidden": "true",
  },
    earned
      ? el("span", { class: "text-2xl sm:text-3xl" }, topicEmoji(unit.title))
      : el("span", { class: "w-6 h-6 text-slate-600", html: ICONS.lock }),
    earned ? el("span", {
      class: "absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white grid place-items-center shadow",
    }, el("span", { class: "w-3.5 h-3.5", html: ICONS.check })) : null);

  return el("div", {
    class: "flex flex-col items-center gap-1.5 text-center",
    "aria-label": earned ? unit.title + ", sello ganado" + (dateTxt ? " el " + dateTxt : "") : unit.title + ", sin sello aun",
  },
    circle,
    el("p", { class: "text-[11px] font-semibold leading-tight max-w-[5.5rem] " + (earned ? "text-slate-200" : "text-slate-500") }, unit.title),
    dateTxt ? el("p", { class: "text-[9px] text-slate-500" }, dateTxt) : null);
}

function fmtShortDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  } catch {
    return null;
  }
}

function emptyState() {
  return el("div", { class: "text-center py-10 text-slate-400" },
    el("p", {}, "Todavia no hay unidades para este idioma. \u00a1Vuelve pronto!"));
}
