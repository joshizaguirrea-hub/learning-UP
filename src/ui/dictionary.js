/**
 * ui/dictionary.js — Diccionario/traductor FLOTANTE, disponible en toda la app.
 *
 * Un boton flotante (FAB) discreto abre un panel para traducir palabras o frases
 * ES <-> EN. Vive fuera de #app (colgado del body) para sobrevivir a los cambios
 * de ruta. Si seleccionas texto en la pagina y lo abres, se rellena solo.
 *
 * Presentacion pura + llamada al servicio de traduccion. Accesible (WCAG AA).
 */
import { el } from "./dom.js";
import { ICONS } from "./icons.js";
import { speakButton } from "./speech.js";
import { translate, looksEnglish } from "../services/dictionary.js";

let mounted = false;

/** Monta el diccionario flotante una sola vez. */
export function mountDictionary() {
  if (mounted) return;
  mounted = true;

  let pair = "en|es"; // direccion actual
  let open = false;

  const input = el("input", {
    type: "text", autocomplete: "off",
    "aria-label": "Palabra o frase a traducir",
    class: "flex-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 " +
      "focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe una palabra...",
  });

  const result = el("div", { class: "mt-3 min-h-[2.5rem] text-sm", role: "status", "aria-live": "polite" });

  const dirLabel = el("span", { class: "font-semibold" }, "EN -> ES");
  const dirBtn = el("button", {
    type: "button",
    class: "text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 " +
      "hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400",
    "aria-label": "Cambiar direccion de traduccion",
    onclick: () => { pair = pair === "en|es" ? "es|en" : "en|es"; dirLabel.textContent = pair === "en|es" ? "EN -> ES" : "ES -> EN"; },
  }, dirLabel);

  const doTranslate = async () => {
    const q = input.value.trim();
    if (!q) { result.replaceChildren(); return; }
    result.replaceChildren(el("p", { class: "text-slate-400" }, "Traduciendo..."));
    try {
      const { text } = await translate(q, pair);
      const english = pair === "en|es" ? q : text; // que lado es ingles
      result.replaceChildren(el("div", { class: "rounded-lg bg-slate-800/70 border border-slate-700 p-3" },
        el("div", { class: "flex items-center gap-2" },
          el("p", { class: "flex-1 text-lg font-semibold text-indigo-300" }, text),
          speakButton(english, { cls: "w-8 h-8" })),
        el("p", { class: "mt-1 text-xs text-slate-500" }, `${q}  (${pair.replace("|", " -> ")})`)));
    } catch (e) {
      result.replaceChildren(el("div", { class: "rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-amber-200" },
        el("p", {}, e.message || "No se pudo traducir."),
        isSpeakable(input.value) ? el("div", { class: "mt-2" }, speakButton(input.value, { cls: "w-8 h-8" })) : null));
    }
  };

  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); doTranslate(); } });

  const goBtn = el("button", {
    type: "button",
    class: "px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold " +
      "focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: doTranslate,
  }, "Traducir");

  const closeBtn = el("button", {
    type: "button",
    class: "w-8 h-8 inline-flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-700 " +
      "focus:outline focus:outline-2 focus:outline-indigo-400",
    "aria-label": "Cerrar diccionario",
    onclick: () => togglePanel(false),
  }, "x");

  const panel = el("div", {
    role: "dialog", "aria-label": "Diccionario", "aria-modal": "false",
    class: "hidden fixed z-50 bottom-40 right-4 w-[min(92vw,22rem)] rounded-2xl bg-slate-900 " +
      "border border-slate-700 shadow-2xl p-4",
  },
    el("div", { class: "flex items-center justify-between gap-2" },
      el("h2", { class: "font-bold text-slate-100" }, "Diccionario"),
      el("div", { class: "flex items-center gap-2" }, dirBtn, closeBtn)),
    el("div", { class: "mt-3 flex gap-2" }, input, goBtn),
    result);

  const fab = el("button", {
    type: "button",
    "aria-label": "Abrir diccionario",
    "aria-expanded": "false",
    title: "Diccionario",
    class: "fixed z-50 bottom-24 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 " +
      "text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform " +
      "focus:outline focus:outline-2 focus:outline-white overflow-hidden",
    onclick: () => togglePanel(!open),
  },
    el("span", { class: "absolute inset-x-0 top-0 h-1/2 bg-white/25" }),
    el("span", { class: "relative w-7 h-7", html: ICONS.book }));

  function togglePanel(next) {
    open = next;
    panel.classList.toggle("hidden", !open);
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      const sel = String(window.getSelection?.() || "").trim();
      if (sel) { input.value = sel; pair = looksEnglish(sel) ? "en|es" : "es|en"; dirLabel.textContent = pair === "en|es" ? "EN -> ES" : "ES -> EN"; }
      input.focus();
      if (input.value) doTranslate();
    }
  }

  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) togglePanel(false); });

  document.body.append(fab, panel);
}

function isSpeakable(t) {
  return typeof t === "string" && t.trim().length > 0;
}
