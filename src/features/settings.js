/**
 * features/settings.js — Ajustes y personalizacion del perfil.
 *
 * Capa de feature: editar nombre visible (Supabase auth) y elegir color de
 * acento del perfil (preferencia local). Tambien acceso a cerrar sesion.
 */
import { updateDisplayName, logout, currentUser } from "../services/auth.js";
import { resetCourseProgress } from "../services/course.js";
import { resetSrsCards } from "../services/srs.js";
import { updateStudentProfile } from "../services/profiles.js";
import { getAccent, setAccent, ACCENTS, getTextSize, setTextSize, TEXT_SIZES,
  getHighContrast, setHighContrast, getAutoplay, setAutoplay,
  getTheme, setTheme, THEMES } from "../ui/prefs.js";
import { el, mount } from "../ui/dom.js";
import { robotAvatar, robotName, openRobotSetup } from "../ui/robot.js";
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

  // Selector de tema (apariencia claro/oscuro/sistema).
  const currentTheme = getTheme();
  const themeButtons = el("div", { class: "mt-4 flex flex-wrap gap-3" }, ...THEMES.map((t) => {
    const selected = t.id === currentTheme;
    return el("button", {
      class: "px-5 py-3 rounded-lg border font-bold text-left " +
        (selected ? "bg-indigo-500/20 border-indigo-400 text-indigo-200" : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700") +
        " focus:outline focus:outline-2 focus:outline-indigo-400",
      "aria-pressed": selected ? "true" : "false",
      "aria-label": `Tema ${t.label}${selected ? " (seleccionado)" : ""}`,
      onclick: () => { setTheme(t.id); announce(`Tema: ${t.label}.`); renderSettings(container, user); },
    }, el("span", { class: "block" }, t.label), el("span", { class: "text-xs font-normal text-slate-400" }, t.desc));
  }));

  const themeCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Apariencia"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Elige tema claro u oscuro. Colores pensados para estudiar comodo."),
    themeButtons);

  // Selector de tamano de texto (accesibilidad).
  const currentSize = getTextSize();
  const sizeButtons = el("div", { class: "mt-4 flex flex-wrap gap-3" }, ...TEXT_SIZES.map((t) => {
    const selected = t.id === currentSize;
    return el("button", {
      class: "px-5 py-3 rounded-lg border font-bold " +
        (selected ? "bg-indigo-500/20 border-indigo-400 text-indigo-200" : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700") +
        " focus:outline focus:outline-2 focus:outline-indigo-400",
      "aria-pressed": selected ? "true" : "false",
      "aria-label": `Tamano de texto ${t.desc}${selected ? " (seleccionado)" : ""}`,
      onclick: () => { setTextSize(t.id); announce(`Tamano de texto: ${t.desc}.`); renderSettings(container, user); },
    }, el("span", { class: "mr-2" }, t.label), el("span", { class: "text-xs font-normal text-slate-400" }, t.desc));
  }));

  const sizeCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Tamano de texto"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Agranda la letra de toda la app para leer mas comodo."),
    sizeButtons);

  // Accesibilidad: alto contraste y auto-audio.
  const a11yCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Accesibilidad"),
    toggleRow("Alto contraste", "Aclara los textos y refuerza bordes para ver mejor.",
      getHighContrast(), (on) => { setHighContrast(on); announce(on ? "Alto contraste activado." : "Alto contraste desactivado."); renderSettings(container, user); }),
    toggleRow("Reproducir audio automatico", "Escucha la palabra en cuanto aparece (repaso y bonus).",
      getAutoplay(), (on) => { setAutoplay(on); announce(on ? "Audio automatico activado." : "Audio automatico desactivado."); renderSettings(container, user); }));

  // Zona de reinicio: borra progreso del curso + SRS + racha (empezar de cero).
  const resetMsg = el("div", { class: "text-sm mt-3" });
  const resetActions = el("div", { class: "mt-4" });
  const DANGER = "bg-red-500/90 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-red-500 focus:outline focus:outline-2 focus:outline-red-300";

  function resetIdle() {
    resetActions.replaceChildren(el("button", {
      class: "border border-red-500/50 text-red-300 font-semibold px-5 py-2.5 rounded-lg hover:bg-red-500/10 focus:outline focus:outline-2 focus:outline-red-400",
      onclick: resetConfirm,
    }, "Reiniciar mi progreso"));
  }

  function resetConfirm() {
    resetActions.replaceChildren(
      el("p", { class: "text-sm text-amber-300 font-semibold" }, "\u00bfSeguro? Se borrar\u00e1n tus lecciones completadas, el repaso y tu racha. Tu nivel seguir\u00e1 en \u201cB1\u201d."),
      el("div", { class: "mt-3 flex gap-2 flex-wrap" },
        el("button", { class: DANGER, onclick: doReset }, "S\u00ed, borrar todo"),
        el("button", {
          class: "bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-700",
          onclick: resetIdle,
        }, "Cancelar")));
  }

  async function doReset() {
    resetActions.replaceChildren(el("p", { class: "text-sm text-slate-400" }, "Reiniciando..."));
    const [c, s] = await Promise.all([resetCourseProgress(user.id), resetSrsCards(user.id)]);
    await updateStudentProfile(user.id, { streak: 0, last_active: null });
    if (!c.ok || !s.ok) {
      mount(resetMsg, msg(false, (c.error || s.error || "No se pudo reiniciar.")));
      resetIdle();
      return;
    }
    const total = (c.count || 0) + (s.count || 0);
    if (total === 0) {
      // No hubo error pero no se borro nada -> casi siempre falta politica DELETE (RLS).
      mount(resetMsg, msg(false,
        "No se borro ninguna fila. Falta el permiso de BORRADO (RLS) en Supabase. Corre el SQL que te paso y reintenta."));
      resetIdle();
      return;
    }
    mount(resetMsg, msg(true, `Progreso reiniciado (${c.count} lecciones, ${s.count} tarjetas). \u00a1A empezar el B1 desde la unidad 1!`));
    announce("Progreso reiniciado.");
    resetActions.replaceChildren(el("button", { class: PRIMARY, onclick: () => go("/student") }, "Ir a mi curso"));
  }

  resetIdle();
  const resetCard = el("section", { class: PANEL + " mt-6 border-red-500/30" },
    el("h2", { class: "font-bold text-lg text-red-300" }, "Reiniciar progreso"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Empieza el curso de cero: borra lecciones completadas, tarjetas de repaso y racha. Mantiene tu nivel y tu cuenta."),
    resetActions, resetMsg);

  const sessionCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Sesion"),
    el("button", {
      class: "mt-4 bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-700",
      onclick: async () => { await logout(); go("/"); },
    }, "Cerrar sesion"));

  const toolsCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Herramientas"),
    el("button", {
      class: "mt-4 " + PRIMARY,
      onclick: () => go("/calidad"),
    }, "Ver reporte de calidad"));

  const robotCard = el("section", { class: PANEL + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Tu profesor robot"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Personaliza el avatar y el nombre de tu profe de clase."),
    el("div", { class: "mt-4 flex items-center gap-3" },
      robotAvatar("md"),
      el("p", { class: "font-semibold text-slate-100" }, robotName())),
    el("button", {
      class: "mt-4 " + PRIMARY,
      onclick: () => openRobotSetup(() => renderSettings(container, user)),
    }, "Cambiar mi robot"));

  mount(container, el("div", { class: "max-w-xl mx-auto" },
    el("h1", { class: "text-2xl font-bold mb-4" }, "Ajustes"),
    nameCard, robotCard, themeCard, sizeCard, a11yCard, accentCard, toolsCard, resetCard, sessionCard));
  focusMainHeading(container);
}

/** Fila con etiqueta, descripcion y un switch accesible. */
function toggleRow(title, desc, on, onChange) {
  const btn = el("button", {
    type: "button",
    role: "switch",
    "aria-checked": on ? "true" : "false",
    "aria-label": title,
    class: "relative w-14 h-8 rounded-full transition-colors shrink-0 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      (on ? "bg-indigo-500" : "bg-slate-700"),
    onclick: () => onChange(!on),
  }, el("span", { class: "absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform " + (on ? "translate-x-6" : "") }));
  return el("div", { class: "flex items-center justify-between gap-4 mt-4" },
    el("div", {},
      el("p", { class: "font-semibold" }, title),
      el("p", { class: "text-sm text-slate-400" }, desc)),
    btn);
}

function msg(ok, text) {
  return el("span", { role: "alert",
    class: ok ? "text-emerald-400" : "text-amber-400" }, text);
}
