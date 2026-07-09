/**
 * features/settings.js — Ajustes y personalizacion del perfil.
 *
 * Capa de feature: editar nombre visible (Supabase auth) y elegir color de
 * acento del perfil (preferencia local). Tambien acceso a cerrar sesion.
 */
import { updateDisplayName, logout, currentUser } from "../services/auth.js";
import { getAccent, setAccent, ACCENTS } from "../ui/prefs.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-6";
const INPUT = "w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 " +
  "focus:outline focus:outline-2 focus:outline-indigo-500";
const PRIMARY = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

export function renderSettings(container, user) {
  const currentName = user.user_metadata?.full_name || "";
  const nameInput = el("input", { class: INPUT, type: "text", value: currentName, "aria-label": "Nombre visible" });
  const nameMsg = el("div", { class: "text-sm mt-2" });

  const nameCard = el("section", { class: PANEL },
    el("h2", { class: "font-bold text-lg" }, "Tu perfil"),
    el("label", { class: "block text-sm text-slate-400 mt-4 mb-1", for: "" }, "Nombre visible"),
    nameInput,
    el("button", {
      class: "mt-4 " + PRIMARY,
      onclick: async () => {
        const value = nameInput.value.trim();
        if (!value) { mount(nameMsg, msg(false, "El nombre no puede estar vacio.")); return; }
        const r = await updateDisplayName(value);
        if (r.ok) { mount(nameMsg, msg(true, "Nombre actualizado.")); announce("Nombre actualizado."); }
        else mount(nameMsg, msg(false, r.error));
      },
    }, "Guardar nombre"),
    nameMsg);

  // Selector de color de acento.
  const accent = getAccent();
  const swatches = el("div", { class: "mt-4 flex flex-wrap gap-3" }, ...ACCENTS.map((a) => {
    const selected = a.id === accent.id;
    return el("button", {
      class: `w-12 h-12 rounded-full bg-gradient-to-br ${a.grad} ` +
        (selected ? "ring-4 ring-white/70" : "ring-2 ring-transparent hover:ring-white/30") +
        " focus:outline focus:outline-2 focus:outline-indigo-300",
      "aria-label": `Acento ${a.label}${selected ? " (seleccionado)" : ""}`,
      onclick: () => { setAccent(a.id); renderSettings(container, user); },
    });
  }));

  const accentCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Color de tu perfil"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Elige el color de tu avatar y detalles."),
    swatches);

  const sessionCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Sesion"),
    el("button", {
      class: "mt-4 bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-700",
      onclick: async () => { await logout(); go("/"); },
    }, "Cerrar sesion"));

  mount(container, el("div", { class: "max-w-xl mx-auto" },
    el("h1", { class: "text-2xl font-bold mb-4" }, "Ajustes"),
    nameCard, accentCard, sessionCard));
  focusMainHeading(container);
}

function msg(ok, text) {
  return el("span", { role: "alert",
    class: ok ? "text-emerald-400" : "text-amber-400" }, text);
}
