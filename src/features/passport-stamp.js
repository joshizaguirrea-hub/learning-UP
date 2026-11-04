/**
 * features/passport-stamp.js — Revelacion del sello al aprobar un examen.
 *
 * Se muestra justo DESPUES de la celebracion grande (ui/celebrate.js), como
 * remate: un sello que cae y "golpea" la pantalla, con el MISMO color y
 * emoji que ya usa esa unidad en su pasaporte (features/passport.js) y en su
 * tarjeta de "Tu curso" (features/course-cards.js) -- una sola identidad
 * visual para "aprobaste este tema", no tres disenos distintos.
 */
import { el } from "../ui/dom.js";
import { TILES, topicEmoji } from "./course-cards.js";
import { playFanfare } from "../ui/sound.js";

/**
 * @param {object} unit
 * @param {number} [tileIndex] - posicion de la unidad en su nivel, para que el
 *   color coincida con su tarjeta en "Tu curso" y su sello en el pasaporte.
 * @returns {Promise<void>} se resuelve al cerrar
 */
export function showStampReveal(unit, tileIndex = 0) {
  return new Promise((resolve) => {
    const close = () => { overlay.remove(); resolve(); };
    const grad = TILES[tileIndex % TILES.length];

    const stampEl = el("div", {
      class: "stamp-slam w-28 h-28 sm:w-32 sm:h-32 rounded-full grid place-items-center border-4 border-dashed " +
        `border-white/60 bg-gradient-to-br ${grad} shadow-2xl`,
    }, el("span", { class: "text-5xl sm:text-6xl" }, topicEmoji(unit.title)));

    const card = el("div", {
      class: "max-w-xs w-full text-center",
      role: "dialog", "aria-modal": "true", "aria-label": "Sello de pasaporte ganado: " + unit.title,
    },
      el("p", { class: "text-xs uppercase tracking-[0.2em] text-amber-300" }, "\u00a1Sello ganado!"),
      el("div", { class: "flex justify-center my-5" }, stampEl),
      el("p", { class: "text-lg font-bold text-white" }, unit.title),
      el("p", { class: "mt-1 text-sm text-slate-400" }, "Ya qued\u00f3 en tu pasaporte."),
      el("div", { class: "mt-5 flex items-center gap-4 justify-center" },
        el("a", {
          href: "#/pasaporte",
          class: "text-sm font-semibold text-indigo-300 hover:text-indigo-200 underline focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
          onclick: close,
        }, "Ver mi pasaporte"),
        el("button", {
          type: "button",
          class: "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold px-5 py-2.5 rounded-xl " +
            "hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-300",
          onclick: close,
        }, "Seguir")));

    const overlay = el("div", {
      class: "fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4",
      onclick: (e) => { if (e.target === overlay) close(); },
    }, card);

    document.body.append(overlay);
    try { playFanfare(); } catch { /* audio opcional */ }
  });
}
