/**
 * ui/placeholder.js — Panel reutilizable "proximamente" (DRY).
 *
 * Evita repetir la misma tarjeta en cada seccion aun no implementada.
 */
import { el } from "./dom.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl";

/**
 * @param {object} o - { title, desc, icon (svg string), bullets? (string[]) }
 */
export function comingSoon({ title, desc, icon, bullets = [] }) {
  return el("section", { class: PANEL + " p-8 text-center max-w-xl mx-auto" },
    el("div", { class: "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 flex items-center justify-center text-white" },
      el("span", { class: "w-8 h-8", html: icon })),
    el("h1", { class: "text-2xl font-bold mt-4" }, title),
    el("p", { class: "text-slate-400 mt-2" }, desc),
    bullets.length
      ? el("ul", { class: "mt-5 text-left space-y-2 text-sm text-slate-300 inline-block" },
          ...bullets.map((b) => el("li", { class: "flex gap-2" },
            el("span", { class: "text-indigo-400" }, "-"), b)))
      : null,
    el("span", { class: "inline-block mt-6 text-xs font-semibold uppercase tracking-wide bg-slate-800 text-slate-400 px-3 py-1 rounded-full" }, "Proximamente"));
}
