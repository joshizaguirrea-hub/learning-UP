/**
 * ui/celebrate.js — Celebracion EPICA al completar una unidad (o nivel).
 *
 * Un momento "wow" memorable: Bymax gigante festejando, anillo de colores
 * girando, confeti y fanfarria. Los picos emocionales son lo que crea apego.
 * Capa de presentacion; sin logica de negocio.
 */
import { el } from "./dom.js";
import { confettiBurst } from "./confetti.js";
import { playFanfare } from "./sound.js";
import { robotAvatar, robotName } from "./robot.js";
import { bymaxEmote } from "./avatars.js";

/**
 * Muestra la celebracion. Devuelve una promesa que se resuelve al continuar.
 * @param {object} opts
 * @param {string} opts.title    - titulo grande ("Unidad completada!")
 * @param {string} opts.subtitle - texto secundario (nombre de la unidad)
 * @param {boolean} [opts.grand] - version nivel (mas epica)
 */
export function celebrate({ title, subtitle, grand = false } = {}) {
  return new Promise((resolve) => {
    const name = robotName();
    const close = () => { overlay.remove(); resolve(); };

    const ring = el("div", {
      class: "celebrate-ring absolute -inset-3 rounded-full opacity-70 blur-[2px]",
      "aria-hidden": "true",
    });
    const avatar = el("div", { class: "relative grid place-items-center" },
      ring,
      el("div", { class: "relative" }, robotAvatar("lg")));

    const card = el("div", {
      class: "celebrate-card max-w-sm w-full bg-slate-900/90 border border-white/10 rounded-3xl p-7 text-center shadow-2xl",
      role: "dialog", "aria-modal": "true", "aria-label": title,
    },
      el("div", { class: "flex justify-center mb-4" }, avatar),
      el("p", { class: "text-xs uppercase tracking-[0.2em] text-fuchsia-300" }, grand ? "\u00a1Logro mayor!" : "\u00a1Lo lograste!"),
      el("h1", { class: "text-3xl font-extrabold mt-1 bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent" }, title),
      subtitle ? el("p", { class: "mt-2 text-slate-300" }, subtitle) : null,
      el("p", { class: "mt-3 text-sm text-slate-400" }, name + " est\u00e1 orgulloso de ti \u2728"),
      el("button", {
        class: "mt-6 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold px-6 py-3 rounded-xl " +
          "hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-300",
        onclick: close,
      }, "\u00a1Seguir! \u2192"));

    const overlay = el("div", {
      class: "celebrate-overlay",
      onclick: (e) => { if (e.target === overlay) close(); },
    }, card);

    document.body.append(overlay);
    card.querySelector("button")?.focus();

    // Fiesta: fanfarria + confeti + Bymax saltando (doble para mas emocion).
    try { playFanfare(); } catch (e) { /* audio opcional */ }
    confettiBurst({ count: grand ? 220 : 150, duration: grand ? 2800 : 2200 });
    bymaxEmote("happy");
    setTimeout(() => bymaxEmote("happy"), 850);
    if (grand) setTimeout(() => confettiBurst({ count: 160, duration: 2200 }), 700);
  });
}
