/**
 * ui/nav.js — Navegacion principal: barra inferior + selector de idioma.
 *
 * Capa de presentacion. La barra inferior es el "menu 1"; el selector de idioma
 * (header) es el "menu 2". Se muestran solo con sesion iniciada.
 */
import { el, qs, mount } from "./dom.js";
import { ICONS } from "./icons.js";
import { currentPath, go } from "./router.js";
import { LANGUAGES } from "../data/languages.js";

const NAV_ITEMS = [
  { path: "/student", label: "Inicio", icon: ICONS.home },
  { path: "/plan", label: "Mi Plan", icon: ICONS.map },
  { path: "/profesores", label: "Profesores", icon: ICONS.teachers },
  { path: "/calendario", label: "Agenda", icon: ICONS.calendar },
  { path: "/chat", label: "Chat", icon: ICONS.chat },
  { path: "/ajustes", label: "Ajustes", icon: ICONS.settings },
];

/** Muestra u oculta la barra inferior (segun haya sesion). */
export function setNavVisible(visible) {
  const nav = qs("#bottom-nav");
  if (nav) nav.classList.toggle("hidden", !visible);
}

/** Renderiza la barra inferior marcando la ruta activa. */
export function renderBottomNav() {
  const nav = qs("#bottom-nav");
  if (!nav) return;
  const here = currentPath();

  const items = NAV_ITEMS.map((it) => {
    const active = here === it.path || here.startsWith(it.path + "/");
    return el("button", {
      class: "flex-1 flex flex-col items-center gap-0.5 py-2 min-w-0 " +
        (active ? "text-indigo-400" : "text-slate-400 hover:text-slate-200") +
        " focus:outline focus:outline-2 focus:outline-indigo-500 rounded-lg",
      "aria-current": active ? "page" : null,
      onclick: () => go(it.path),
    },
      el("span", { class: "w-6 h-6", html: it.icon }),
      el("span", { class: "text-[10px] font-medium truncate" }, it.label));
  });

  nav.replaceChildren(
    el("div", { class: "max-w-5xl mx-auto px-2 flex items-stretch" }, ...items));
}

// --------------------------------------------------------------------------
// Selector de idioma (menu 2)
// --------------------------------------------------------------------------
const LS_KEY = "linguapath.lang";

/** Idioma que el usuario esta aprendiendo (solo 'en' activo por ahora). */
export function currentLangCode() {
  return localStorage.getItem(LS_KEY) || "en";
}

/** Renderiza el selector de idioma en el header. */
export function renderLangSelector() {
  const slot = qs("#lang-slot");
  if (!slot) return;
  const active = LANGUAGES.find((l) => l.code === currentLangCode()) || LANGUAGES[0];

  const menu = el("div", {
    class: "hidden absolute left-0 mt-2 w-52 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-30",
  }, ...LANGUAGES.map((l) => langOption(l)));

  const btn = el("button", {
    class: "flex items-center gap-1.5 text-sm text-slate-200 bg-slate-800 border border-slate-700 " +
      "rounded-lg px-2.5 py-1.5 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-500",
    "aria-haspopup": "true",
    onclick: (e) => { e.stopPropagation(); menu.classList.toggle("hidden"); },
  },
    el("span", { class: "w-4 h-4 text-indigo-400", html: ICONS.globe }),
    el("span", { class: "font-semibold" }, active.name),
    el("span", { class: "text-slate-500 text-xs" }, "v"));

  // Cierra el menu al hacer click fuera.
  document.addEventListener("click", () => menu.classList.add("hidden"));

  mount(slot, el("div", { class: "relative" }, btn, menu));
}

function langOption(l) {
  if (l.enabled) {
    return el("button", {
      class: "w-full flex items-center justify-between px-3 py-2 text-sm text-slate-200 hover:bg-indigo-600/30",
      onclick: () => {
        localStorage.setItem(LS_KEY, l.code);
        renderLangSelector();
      },
    }, el("span", { class: "font-medium" }, l.name),
       currentLangCode() === l.code ? el("span", { class: "w-4 h-4 text-emerald-400", html: ICONS.check }) : null);
  }
  return el("div", {
    class: "w-full flex items-center justify-between px-3 py-2 text-sm text-slate-500 cursor-not-allowed",
  }, el("span", {}, l.name),
     el("span", { class: "flex items-center gap-1 text-xs" },
       el("span", { class: "w-3.5 h-3.5", html: ICONS.lock }), "Pronto"));
}
