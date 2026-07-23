/**
 * features/more-screen.js — Pantalla "Mas" (#/mas): menu unico secundario.
 *
 * Agrupa lo que no son las 4 puertas principales (Plan, Profesores, Agenda,
 * Chat, Perfil, Ajustes) en UN solo lugar accesible desde la barra inferior.
 * Asi no hay "doble menu" (antes: fila en el inicio + barra abajo).
 */
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { screenHeader } from "../ui/hub-ui.js";
import { logout } from "../services/auth.js";
import { go } from "../ui/router.js";

const ITEMS = [
  { href: "#/perfil", icon: ICONS.user, title: "Mi perfil", desc: "Avatar, nivel y progreso" },
  { href: "#/plan", icon: ICONS.map, title: "Mi Plan", desc: "Tu ruta de aprendizaje" },
  { href: "#/profesores", icon: ICONS.teachers, title: "Profesores", desc: "Encuentra un profe" },
  { href: "#/calendario", icon: ICONS.calendar, title: "Agenda", desc: "Tus clases y recordatorios" },
  { href: "#/chat", icon: ICONS.chat, title: "Chat con Bymax", desc: "Escribe con Bymax" },
  { href: "#/ajustes", icon: ICONS.settings, title: "Ajustes", desc: "Texto, contraste, voz y mas" },
];

export async function renderMore(container) {
  const rows = ITEMS.map((it) =>
    el("a", { href: it.href,
      class: "flex items-center gap-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 " +
        "hover:bg-slate-800/70 transition focus:outline focus:outline-2 focus:outline-indigo-400" },
      el("span", { class: "w-11 h-11 grid place-items-center rounded-xl bg-white/5 text-indigo-300 shrink-0", html: it.icon }),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-slate-100" }, it.title),
        el("p", { class: "text-sm text-slate-400" }, it.desc)),
      el("span", { class: "w-5 h-5 text-slate-500 -rotate-90 shrink-0", html: ICONS.chevron })));

  const salir = el("button", {
    type: "button",
    class: "w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-rose-500/10 border border-rose-500/30 " +
      "text-rose-300 font-semibold p-4 hover:bg-rose-500/20 focus:outline focus:outline-2 focus:outline-rose-400",
    onclick: async () => { await logout(); go("/"); },
  }, "Cerrar sesion");

  mount(container, el("div", { class: "max-w-2xl mx-auto space-y-3" },
    screenHeader({ icon: ICONS.grid, grad: accentGrad("brand"), title: "Mas", subtitle: "Todo lo demas, en un solo lugar" }),
    ...rows, salir));
  focusMainHeading(container);
}
