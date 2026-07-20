/**
 * features/bymax-panel.js — Tarjeta de Bymax que EVOLUCIONA + saludo diario.
 *
 * Parte de la "Ola 2 - Vinculo": crear apego. Bymax crece contigo (aura + etapa
 * + insignia por XP) y te saluda una vez al dia como un companero. No usa BD:
 * el saludo del dia se recuerda en localStorage.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { bymaxEvolution } from "../core/bymax-evolution.js";
import { isoDay } from "../core/srs.js";

const GREET_KEY = "linguapath.greeted";

/**
 * Tarjeta del compañero Bymax: avatar con aura por etapa, titulo de etapa,
 * barra hacia la siguiente y la racha contada como "aventura juntos".
 * @param {{xp:number, streak:number}} p
 */
export function bymaxCard({ xp = 0, streak = 0 } = {}) {
  const name = robotName();
  const evo = bymaxEvolution(xp);
  const st = evo.stage;

  const aura = el("div", {
    class: `absolute -inset-2 rounded-full bg-gradient-to-br ${st.aura} opacity-60 blur-md`,
    "aria-hidden": "true",
  });
  const badge = st.badge ? el("div", {
    class: `absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br ${st.aura} ` +
      "border-2 border-slate-900 grid place-items-center text-white shadow",
    "aria-hidden": "true",
  }, el("span", { class: "w-4 h-4", html: ICONS[st.badge] || ICONS.star })) : null;

  const avatarWrap = el("div", { class: "relative shrink-0" }, aura,
    el("div", { class: "relative" }, robotAvatar("lg")), badge);

  const bar = el("div", { class: "mt-2 w-full bg-slate-800 rounded-full h-2" },
    el("div", { class: `bg-gradient-to-r ${st.aura} h-2 rounded-full transition-all`, style: `width:${evo.pct}%` }));

  const progressText = evo.isMax
    ? el("p", { class: "text-xs text-amber-300 mt-1" }, "\u00a1Etapa m\u00e1xima! " + name + " est\u00e1 en su mejor forma.")
    : el("p", { class: "text-xs text-slate-400 mt-1" }, `Faltan ${evo.toNext} XP para que ${name} evolucione a "${evo.next.name}"`);

  const adventure = streak > 0
    ? `${name} y t\u00fa llevan ${streak} d\u00eda${streak === 1 ? "" : "s"} de aventura juntos`
    : `${name} tiene ganas de empezar la aventura contigo`;

  return el("section", { class: "bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-5" },
    avatarWrap,
    el("div", { class: "flex-1 min-w-0" },
      el("div", { class: "flex items-center gap-2 flex-wrap" },
        el("p", { class: "font-bold text-lg text-slate-100" }, name),
        el("span", { class: `text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r ${st.aura} text-white` }, st.name)),
      el("p", { class: "text-sm text-slate-300 mt-0.5" }, adventure),
      bar, progressText));
}

/**
 * Saludo diario de Bymax (una sola vez al dia). Devuelve el nodo o null si ya
 * saludo hoy. Es un banner cerrable, calido, tipo "ritual" de 5 segundos.
 * @param {{name:string, streak:number}} p
 */
export function dailyGreeting({ name = "", streak = 0 } = {}) {
  const today = isoDay(new Date());
  let last = null;
  try { last = localStorage.getItem(GREET_KEY); } catch { /* ignore */ }
  if (last === today) return null;
  try { localStorage.setItem(GREET_KEY, today); } catch { /* ignore */ }

  const bot = robotName();
  const first = (name || "").trim().split(/\s+/)[0] || "";
  const line = streak >= 1
    ? `\u00a1Qu\u00e9 gusto verte, ${first}! Llevamos ${streak} d\u00eda${streak === 1 ? "" : "s"} juntos. \u00bfSeguimos?`
    : `\u00a1Hola, ${first}! Soy ${bot}. Empecemos hoy una gran racha. \u00bfList@?`;

  const banner = el("section", {
    class: "robot-pop bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-fuchsia-600/90 " +
      "border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-lg",
    role: "status",
  },
    robotAvatar("md"),
    el("p", { class: "flex-1 text-white font-medium text-sm" }, line),
    el("button", {
      class: "shrink-0 grid place-items-center w-8 h-8 rounded-full bg-white/15 text-white hover:bg-white/25 focus:outline focus:outline-2 focus:outline-white",
      "aria-label": "Cerrar saludo",
      onclick: () => banner.remove(),
    }, "\u2715"));

  return banner;
}
