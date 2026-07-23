/**
 * ui/hub-ui.js — Piezas compartidas del modelo "hub + pantallas".
 *
 * DRY: la tarjeta grande del inicio (una por seccion), la cabecera de cada
 * subpantalla y el boton "Inicio" viven aqui, no repetidos en cada feature.
 * Mismo lenguaje visual que el curso: gradiente, gloss, sheen y scrim.
 */
import { el } from "./dom.js";
import { ICONS } from "./icons.js";
import { go } from "./router.js";

const ARROW_LEFT =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
  'stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M15 18l-6-6 6-6"/></svg>';

/**
 * Tarjeta GRANDE de seccion para el inicio (Curso / Habla / Entrevista).
 * @param {object} p
 * @param {string} [p.href] - destino (#/...)
 * @param {function} [p.onClick]
 * @param {string} p.grad - gradiente Tailwind (ej. accentGrad('brand'))
 * @param {string} p.icon - SVG (innerHTML)
 * @param {string} p.title
 * @param {string} p.subtitle
 * @param {string} [p.badge] - insignia arriba a la derecha (ej. "TOP")
 * @param {Node} [p.extra] - contenido extra bajo el subtitulo (ej. barra)
 */
export function hubCard({ href, onClick, grad, icon, title, subtitle, badge, extra } = {}) {
  const inner = [
    el("div", { class: `absolute inset-0 bg-gradient-to-br ${grad}`, "aria-hidden": "true" }),
    el("div", { class: "absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full bg-white/25 blur-2xl opacity-70", "aria-hidden": "true" }),
    el("div", { class: "absolute -bottom-12 -right-12 w-40 h-40 rounded-full border-[12px] border-white/10", "aria-hidden": "true" }),
    el("div", { class: "card-sheen absolute inset-0", "aria-hidden": "true" }),
    el("div", { class: "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent", "aria-hidden": "true" }),
    badge
      ? el("span", { class: "absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 bg-black/30 backdrop-blur px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full" },
          el("span", { class: "w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300", html: ICONS.star }),
          el("span", { class: "text-[8px] sm:text-[10px] font-black tracking-widest text-white" }, badge))
      : null,
    el("div", { class: "relative h-full p-3 sm:p-5 flex flex-col" },
      el("span", { class: "w-10 h-10 sm:w-14 sm:h-14 grid place-items-center rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur text-white shrink-0", html: icon }),
      el("div", { class: "flex-1 min-h-[0.75rem]" }),
      el("div", {},
        el("h2", { class: "text-sm sm:text-xl font-black text-white leading-tight drop-shadow" }, title),
        el("p", { class: "text-white/85 text-[11px] sm:text-sm mt-0.5 sm:mt-1 leading-snug line-clamp-2" }, subtitle),
        extra || null)),
  ];

  const cls =
    "group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl aspect-[4/5] sm:aspect-square " +
    "transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl will-change-transform " +
    "focus:outline focus:outline-2 focus:outline-white/70";

  return href
    ? el("a", { href, class: cls, "aria-label": title }, ...inner)
    : el("button", { type: "button", class: cls + " text-left w-full", onclick: onClick, "aria-label": title }, ...inner);
}

/** Cabecera de una subpantalla: icono + titulo + subtitulo. */
export function screenHeader({ icon, grad, title, subtitle } = {}) {
  return el("div", { class: "flex items-center gap-3 mb-5" },
    el("span", { class: `w-12 h-12 grid place-items-center rounded-2xl bg-gradient-to-br ${grad} text-white shrink-0`, html: icon }),
    el("div", {},
      el("h1", { class: "text-2xl font-black" }, title),
      subtitle ? el("p", { class: "text-slate-400 text-sm" }, subtitle) : null));
}

/** Boton "Inicio" para volver al hub desde cualquier subpantalla. */
export function backHome(colorCls = "text-indigo-300 hover:text-indigo-200") {
  return el("button", {
    type: "button",
    class: `mb-1 inline-flex items-center gap-1.5 font-semibold ${colorCls} ` +
      "focus:outline focus:outline-2 focus:outline-indigo-400 rounded",
    onclick: () => go("/student"),
  }, el("span", { class: "shrink-0", html: ARROW_LEFT }), "Inicio");
}
