/**
 * features/dictionary.js — Diccionario/traductor FLOTANTE, disponible en toda la app.
 *
 * Un boton flotante (FAB) discreto abre un panel para traducir palabras o frases
 * entre ESPANOL y el IDIOMA META que estas aprendiendo (Ingles / Portugues /
 * Italiano). Vive fuera de #app (colgado del body) para sobrevivir a los cambios
 * de ruta. Si seleccionas texto en la pagina y lo abres, se rellena solo.
 *
 * Widget de feature: orquesta ui (dom/speech) + servicio de traduccion. Accesible (WCAG AA).
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speakButton } from "../ui/speech.js";
import { translate, looksSpanish } from "../services/dictionary.js";
import { enabledLanguages, micCode } from "../data/languages.js";
import { currentLangCode } from "../ui/nav.js";

let mounted = false;
let openDict = null; // referencia interna para abrir el panel desde otros modulos

/**
 * Abre el diccionario (montandolo si hace falta) opcionalmente con una palabra ya
 * cargada. Sirve para el boton "Diccionario" DENTRO de cualquier curso/POP.
 * @param {string} [word] palabra o frase a precargar
 * @param {string} [lang] idioma meta a fijar (en|pt|it); por defecto, el del curso
 */
export function openDictionary(word, lang) {
  mountDictionary();
  if (openDict) openDict(word, lang);
}

/** Monta el diccionario flotante una sola vez. */
export function mountDictionary() {
  if (mounted) return;
  mounted = true;

  // Idiomas META traducibles (todo lo aprendible menos el nativo espanol).
  const L2 = enabledLanguages().filter((l) => l.code !== "es");
  const pickTarget = (code) => (L2.some((l) => l.code === code) ? code : (L2[0]?.code || "en"));

  let target = pickTarget(currentLangCode()); // idioma que se aprende
  let dir = "toEs"; // "toEs": meta->espanol (leer lo que aprendes) | "toL2": espanol->meta
  let open = false;

  const curPair = () => (dir === "toEs" ? `${target}|es` : `es|${target}`);
  const dirText = () => (dir === "toEs" ? `${target.toUpperCase()} \u2192 ES` : `ES \u2192 ${target.toUpperCase()}`);

  const input = el("input", {
    type: "text", autocomplete: "off",
    "aria-label": "Palabra o frase a traducir",
    class: "flex-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 " +
      "focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe una palabra...",
  });

  const result = el("div", { class: "mt-3 min-h-[2.5rem] text-sm", role: "status", "aria-live": "polite" });

  // Selector del IDIOMA META (Ingles / Portugues / Italiano).
  const targetSel = el("select", {
    class: "text-xs px-2 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 " +
      "focus:outline focus:outline-2 focus:outline-indigo-400",
    "aria-label": "Idioma que estas aprendiendo",
    onchange: () => { target = targetSel.value; refreshDir(); if (input.value) doTranslate(); },
  }, ...L2.map((l) => el("option", { value: l.code }, l.name)));
  targetSel.value = target;

  const dirLabel = el("span", { class: "font-semibold" }, dirText());
  const dirBtn = el("button", {
    type: "button",
    class: "text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 " +
      "hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400",
    "aria-label": "Cambiar direccion de traduccion",
    onclick: () => { dir = dir === "toEs" ? "toL2" : "toEs"; refreshDir(); if (input.value) doTranslate(); },
  }, dirLabel);

  function refreshDir() { dirLabel.textContent = dirText(); }

  const doTranslate = async () => {
    const q = input.value.trim();
    if (!q) { result.replaceChildren(); return; }
    result.replaceChildren(el("p", { class: "text-slate-400" }, "Traduciendo..."));
    try {
      const { text } = await translate(q, curPair());
      const l2Side = dir === "toEs" ? q : text; // el lado en idioma meta (para pronunciar)
      result.replaceChildren(el("div", { class: "rounded-lg bg-slate-800/70 border border-slate-700 p-3" },
        el("div", { class: "flex items-center gap-2" },
          el("p", { class: "flex-1 text-lg font-semibold text-indigo-300" }, text),
          speakButton(l2Side, { lang: micCode(target), cls: "w-8 h-8" })),
        el("p", { class: "mt-1 text-xs text-slate-500" }, `${q}  (${curPair().replace("|", " -> ")})`)));
    } catch (e) {
      result.replaceChildren(el("div", { class: "rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-amber-200" },
        el("p", {}, e.message || "No se pudo traducir."),
        isSpeakable(input.value) ? el("div", { class: "mt-2" }, speakButton(input.value, { lang: micCode(target), cls: "w-8 h-8" })) : null));
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

  const panelHeader = el("div", {
    class: "flex items-center justify-between gap-2 -mx-4 -mt-4 px-4 pt-4 pb-2 cursor-move select-none touch-none",
    title: "Arr\u00e1strame para moverme",
  },
    el("div", { class: "flex items-center gap-2" },
      el("span", { class: "text-slate-500", "aria-hidden": "true", html: GRIP }),
      el("h2", { class: "font-bold text-slate-100" }, "Diccionario")),
    el("div", { class: "flex items-center gap-2" }, targetSel, dirBtn, closeBtn));

  const panel = el("div", {
    role: "dialog", "aria-label": "Diccionario", "aria-modal": "false",
    class: "hidden fixed z-[70] bottom-40 right-4 w-[min(92vw,22rem)] rounded-2xl bg-slate-900 " +
      "border border-slate-700 shadow-2xl p-4",
  },
    panelHeader,
    el("div", { class: "mt-1 flex gap-2" }, input, goBtn),
    result);

  makeDraggable(panel, panelHeader);

  const fab = el("button", {
    type: "button",
    "aria-label": "Abrir diccionario",
    "aria-expanded": "false",
    title: "Diccionario",
    class: "fixed z-[70] bottom-24 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 " +
      "text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform " +
      "focus:outline focus:outline-2 focus:outline-white overflow-hidden",
    onclick: () => togglePanel(!open),
  },
    el("span", { class: "absolute inset-x-0 top-0 h-1/2 bg-white/25" }),
    el("span", { class: "relative w-7 h-7", html: ICONS.book }));

  function togglePanel(next, keepTarget) {
    open = next;
    panel.classList.toggle("hidden", !open);
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      // Al abrir desde el FAB, sincroniza el idioma meta con el del curso actual.
      if (!keepTarget) { target = pickTarget(currentLangCode()); targetSel.value = target; }
      const sel = String(window.getSelection?.() || "").trim();
      if (sel) { input.value = sel; dir = looksSpanish(sel) ? "toL2" : "toEs"; }
      refreshDir();
      input.focus();
      if (input.value) doTranslate();
    }
  }

  // Permite abrir el diccionario desde otros modulos (openDictionary), con una
  // palabra precargada y/o idioma meta opcional (p.ej. desde un curso italiano).
  openDict = (word, lang) => {
    if (lang && L2.some((l) => l.code === lang)) { target = lang; targetSel.value = lang; }
    const w = (word || "").trim();
    if (w) { input.value = w; dir = looksSpanish(w) ? "toL2" : "toEs"; }
    refreshDir();
    togglePanel(true, true);
  };

  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && open) togglePanel(false); });

  document.body.append(fab, panel);
}

function isSpeakable(t) {
  return typeof t === "string" && t.trim().length > 0;
}

// Asa de arrastre (grip) del diccionario.
const GRIP =
  '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">' +
  '<circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/>' +
  '<circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/>' +
  '<circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';

const POS_KEY = "learningup:dict-pos";

/**
 * Hace un panel FIJO arrastrable por su "asa" (handle). Cambia el anclaje de
 * bottom/right a top/left, mantiene el panel dentro de la pantalla y recuerda la
 * posicion (localStorage). No estorba a los botones del asa (dir/cerrar).
 */
function makeDraggable(panel, handle) {
  const applyPos = (x, y) => {
    const w = panel.offsetWidth || 320, h = panel.offsetHeight || 200;
    const nx = Math.max(4, Math.min(window.innerWidth - w - 4, x));
    const ny = Math.max(4, Math.min(window.innerHeight - h - 4, y));
    panel.style.left = nx + "px"; panel.style.top = ny + "px";
    panel.style.right = "auto"; panel.style.bottom = "auto";
  };

  // Restaura la ultima posicion guardada (si cabe en la pantalla actual).
  try {
    const saved = JSON.parse(localStorage.getItem(POS_KEY) || "null");
    if (saved && typeof saved.x === "number") requestAnimationFrame(() => applyPos(saved.x, saved.y));
  } catch { /* nada */ }

  let sx = 0, sy = 0, ox = 0, oy = 0, dragging = false;
  handle.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button, input, a, select")) return; // no robar clicks
    dragging = true;
    const r = panel.getBoundingClientRect();
    ox = r.left; oy = r.top; sx = e.clientX; sy = e.clientY;
    applyPos(ox, oy);
    try { handle.setPointerCapture(e.pointerId); } catch { /* nada */ }
    e.preventDefault();
  });
  handle.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    applyPos(ox + (e.clientX - sx), oy + (e.clientY - sy));
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    try { localStorage.setItem(POS_KEY, JSON.stringify({ x: parseFloat(panel.style.left), y: parseFloat(panel.style.top) })); } catch { /* nada */ }
  };
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
}

