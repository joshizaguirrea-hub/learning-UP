/**
 * ui/banner.js — Banner de accion reutilizable (DRY para el dashboard).
 *
 * Antes cada banner (Anti-errores, Bonus, Compartir, Mi vida...) se escribia a
 * mano con su propio gradiente y estructura. Aqui hay UNO solo, con el mismo
 * lenguaje visual que las tarjetas del curso: color por acento semantico, gloss,
 * sheen al hover, scrim para contraste y elevacion. Menos codigo, mas coherencia.
 */
import { el } from "./dom.js";
import { accentGrad } from "./theme.js";

/**
 * @param {object} p
 * @param {string} [p.accent="brand"] - clave de ui/theme.js (brand|speak|practice|reward|story|share)
 * @param {string} [p.icon] - SVG (innerHTML) para el chip de icono
 * @param {string} [p.emoji] - alternativa: emoji grande de marca de agua
 * @param {string} p.title
 * @param {string} p.subtitle
 * @param {string} [p.cta="Abrir"]
 * @param {string} [p.href] - si es navegacion (#/...)
 * @param {function} [p.onClick] - si abre un modal
 */
export function actionBanner({ accent = "brand", icon, emoji, title, subtitle, cta = "Abrir", href, onClick } = {}) {
  const grad = accentGrad(accent);
  const iconChip = icon
    ? el("span", { class: "w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm grid place-items-center text-white shrink-0", html: icon })
    : emoji
      ? el("span", { class: "w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm grid place-items-center text-2xl shrink-0", "aria-hidden": "true" }, emoji)
      : null;

  const inner = [
    el("div", { class: `absolute inset-0 bg-gradient-to-r ${grad}`, "aria-hidden": "true" }),
    el("div", { class: "absolute -top-1/2 -left-10 w-1/2 h-[200%] bg-white/15 blur-2xl opacity-60", "aria-hidden": "true" }),
    el("div", { class: "card-sheen absolute inset-0", "aria-hidden": "true" }),
    el("div", { class: "absolute inset-0 bg-gradient-to-t from-black/25 to-transparent", "aria-hidden": "true" }),
    el("div", { class: "relative flex items-center gap-4 p-5" },
      iconChip,
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-white text-lg leading-tight drop-shadow" }, title),
        el("p", { class: "text-white/90 text-sm mt-0.5" }, subtitle)),
      el("span", { class: "text-white font-semibold text-sm shrink-0 flex items-center gap-1" }, cta, "\u2192")),
  ];

  const cls = "group relative block w-full text-left rounded-2xl overflow-hidden shadow-lg " +
    "transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl will-change-transform " +
    "focus:outline focus:outline-2 focus:outline-white/70";

  return href
    ? el("a", { href, class: cls, "aria-label": title }, ...inner)
    : el("button", { type: "button", class: cls, onclick: onClick, "aria-label": title }, ...inner);
}
