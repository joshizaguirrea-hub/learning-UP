/**
 * features/notebook.js — "Cuaderno de la unidad": repaso y estudio POR PESTANAS.
 *
 * El cuaderno ahora tiene una PESTANA por competencia (Gramatica, Vocabulario,
 * Lectura, Listening, Escritura, Speaking) mas "Todos". La idea es TRABAJAR LOS
 * ERRORES: cada error que cometes en una clase queda etiquetado con su
 * competencia (ver core/notebook.js -> errorSkill) y cae en su pestana. Asi el
 * alumno abre la pestana de la skill que quiere reforzar y practica SOLO esos
 * errores (openErrorPractice), con el contenido exclusivo de esa competencia.
 *
 * Pestanas especiales:
 *   - Vocabulario: ademas de sus errores, muestra el vocabulario que te falto y
 *     el vocabulario de referencia del capitulo.
 *   - Gramatica: ademas de sus errores, muestra los pronombres del capitulo.
 *
 * Presentacion pura: los datos vienen de ui/notebook-store.js, core/notebook.js
 * y core/unit-language.js.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speak } from "../ui/speech.js";
import { micCode, languageName } from "../data/languages.js";
import { loadNotebook, clearNotebook } from "../ui/notebook-store.js";
import { errorSkill } from "../core/notebook.js";
import { unitPronouns, unitVocabulary } from "../core/unit-language.js";
import { openErrorPractice } from "./feedback-practice.js";

/** Pestanas del cuaderno (una por competencia + "Todos"). */
const TABS = [
  { key: "all", label: "Todos", emoji: "\uD83D\uDCD3" },
  { key: "grammar", label: "Gram\u00e1tica", emoji: "\uD83D\uDD24" },
  { key: "vocabulary", label: "Vocabulario", emoji: "\uD83D\uDCD6" },
  { key: "reading", label: "Lectura", emoji: "\uD83D\uDCD5" },
  { key: "listening", label: "Listening", emoji: "\uD83C\uDFA7" },
  { key: "writing", label: "Escritura", emoji: "\u270D\uFE0F" },
  { key: "speaking", label: "Speaking", emoji: "\uD83D\uDDE3\uFE0F" },
];

/** Encabezado de seccion con icono. */
function sectionTitle(icon, text, count) {
  return el("div", { class: "flex items-center gap-2 mt-5 mb-2" },
    el("span", { class: "w-5 h-5 text-emerald-300", html: icon }),
    el("h3", { class: "font-bold text-slate-100" }, text),
    typeof count === "number"
      ? el("span", { class: "text-[10px] font-black bg-white/10 text-slate-300 px-2 py-0.5 rounded-full" }, String(count))
      : null);
}

/** Chip clickeable que pronuncia el termino en el idioma meta. */
function speakable(text, lang) {
  return el("button", {
    type: "button",
    class: "shrink-0 grid place-items-center w-7 h-7 rounded-full text-emerald-300 hover:bg-emerald-500/20 " +
      "focus:outline focus:outline-2 focus:outline-emerald-400",
    "aria-label": "Escuchar \"" + text + "\"", title: "Escuchar",
    onclick: () => speak(text, micCode(lang), { rate: 0.9 }),
    html: ICONS.sound,
  });
}

/** Tarjeta de un error (frase mal -> correcta + por que). */
function errorCard(e) {
  return el("div", { class: "rounded-xl border border-rose-500/25 bg-rose-500/5 p-3 text-sm" },
    el("p", {},
      el("span", { class: "line-through text-rose-300" }, e.wrong),
      el("span", { class: "mx-2 text-slate-500" }, "\u2192"),
      el("span", { class: "text-emerald-300 font-semibold" }, e.right)),
    e.why ? el("p", { class: "mt-1 text-xs text-slate-400" }, "\uD83D\uDCA1 " + e.why) : null);
}

/** Boton grande para practicar un conjunto de errores. */
function practiceButton(label, errors, lang) {
  return el("button", {
    type: "button",
    class: "mt-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
    onclick: () => openErrorPractice(errors, lang),
  }, label);
}

/** Estado vacio de una pestana de competencia. */
function emptyState(label) {
  return el("div", { class: "mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300" },
    "A\u00fan no hay errores de " + label + ". Toma una clase de esta competencia en la unidad y, " +
    "al terminar, la profe apunta aqu\u00ed lo que debes corregir para que lo practiques.");
}

/**
 * Abre el Cuaderno de la unidad (con pestanas por competencia).
 * @param {object} unit - unidad del curso
 * @param {object} [user] - usuario (para leer su cuaderno guardado)
 */
export function openNotebook(unit, user) {
  const lang = unit?.language || "en";
  const langLabel = languageName(lang);
  const nb = loadNotebook(user?.id, unit?.id) || { errors: [], vocab: [], sessions: 0 };
  const errors = nb.errors || [];
  const vocabGaps = nb.vocab || [];
  const pronouns = unitPronouns(unit);
  const vocabRef = unitVocabulary(unit);

  // Agrupa los errores por competencia una sola vez (para contadores y pestanas).
  const bySkill = {};
  for (const t of TABS) bySkill[t.key] = [];
  for (const e of errors) {
    const k = errorSkill(e);
    (bySkill[k] || (bySkill[k] = [])).push(e);
    bySkill.all.push(e);
  }

  const close = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };

  const body = el("div", { class: "mt-1 overflow-y-auto pr-1", style: "max-height:64vh" });

  // --- Barra de pestanas ----------------------------------------------------
  const tabBtns = {};
  function count(key) {
    if (key === "vocabulary") return bySkill.vocabulary.length + vocabGaps.length;
    return bySkill[key].length;
  }
  const tabbar = el("div", {
    class: "flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1", role: "tablist",
    "aria-label": "Competencias del cuaderno",
  });
  for (const t of TABS) {
    const n = count(t.key);
    const btn = el("button", {
      type: "button", role: "tab", "data-key": t.key,
      class: "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition " +
        "focus:outline focus:outline-2 focus:outline-emerald-400",
      onclick: () => selectTab(t.key),
    },
      el("span", { class: "mr-1" }, t.emoji),
      t.label,
      n ? el("span", { class: "ml-1.5 text-[10px] font-black bg-white/15 px-1.5 py-0.5 rounded-full" }, String(n)) : null);
    tabBtns[t.key] = btn;
    tabbar.append(btn);
  }

  function paintTabs(active) {
    for (const t of TABS) {
      const on = t.key === active;
      tabBtns[t.key].className = "shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition " +
        "focus:outline focus:outline-2 focus:outline-emerald-400 " +
        (on
          ? "bg-emerald-500/25 border-emerald-400/60 text-emerald-100"
          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10");
      tabBtns[t.key].setAttribute("aria-selected", on ? "true" : "false");
    }
  }

  // --- Contenido de una pestana ---------------------------------------------
  function renderTab(key) {
    body.replaceChildren();
    const tab = TABS.find((t) => t.key === key) || TABS[0];
    const list = bySkill[key] || [];

    if (key === "all") {
      if (errors.length) {
        body.append(sectionTitle(ICONS.bulb, "Todos tus errores para repasar", errors.length));
        const wrap = el("div", { class: "flex flex-col gap-2" });
        for (const e of errors) wrap.append(errorCard(e));
        body.append(wrap);
        body.append(practiceButton("Practicar todos mis errores", errors, lang));
      } else {
        body.append(el("div", { class: "mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300" },
          "A\u00fan no hay errores guardados. Toma una CLASE o CONVERSACI\u00d3N con la profe: al terminar, " +
          "ella apunta aqu\u00ed tus errores por competencia, para que los repases donde toca."));
      }
      return;
    }

    // Pestana de una competencia concreta.
    if (list.length) {
      body.append(sectionTitle(ICONS.bulb, "Errores de " + tab.label, list.length));
      const wrap = el("div", { class: "flex flex-col gap-2" });
      for (const e of list) wrap.append(errorCard(e));
      body.append(wrap);
      body.append(practiceButton("Practicar mis errores de " + tab.label, list, lang));
    } else {
      body.append(emptyState(tab.label));
    }

    // Extras exclusivos de cada competencia (contenido de estudio).
    if (key === "grammar" && pronouns.length) {
      body.append(sectionTitle(ICONS.grid, "Pronombres del cap\u00edtulo (" + langLabel + ")", pronouns.length));
      const pron = el("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-2" });
      for (const p of pronouns) {
        pron.append(el("div", { class: "flex items-center gap-2 rounded-xl border border-violet-500/25 bg-violet-500/5 p-2.5" },
          speakable(p.form, lang),
          el("div", { class: "min-w-0" },
            el("p", { class: "font-semibold text-violet-200" }, p.form),
            el("p", { class: "text-xs text-slate-400" }, p.es))));
      }
      body.append(pron);
    }

    if (key === "vocabulary") {
      if (vocabGaps.length) {
        body.append(sectionTitle(ICONS.book, "Vocabulario que te falta", vocabGaps.length));
        const grid = el("div", { class: "grid sm:grid-cols-2 gap-2" });
        for (const v of vocabGaps) {
          grid.append(el("div", { class: "flex items-center gap-2 rounded-xl border border-sky-500/25 bg-sky-500/5 p-2.5 text-sm" },
            speakable(v.word, lang),
            el("div", { class: "min-w-0" },
              el("p", { class: "font-semibold text-sky-200 truncate" }, v.word),
              v.note ? el("p", { class: "text-xs text-slate-400 truncate" }, v.note) : null)));
        }
        body.append(grid);
      }
      if (vocabRef.length) {
        body.append(sectionTitle(ICONS.book, "Vocabulario del cap\u00edtulo", vocabRef.length));
        const vlist = el("div", { class: "grid sm:grid-cols-2 gap-2" });
        for (const v of vocabRef) {
          vlist.append(el("div", { class: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2.5 text-sm" },
            speakable(v.term, lang),
            el("div", { class: "min-w-0" },
              el("p", { class: "font-semibold text-slate-100 truncate" }, v.term),
              v.translation ? el("p", { class: "text-xs text-slate-400 truncate" }, v.translation) : null)));
        }
        body.append(vlist);
      }
    }
  }

  function selectTab(key) { paintTabs(key); renderTab(key); }

  // --- Pie: vaciar cuaderno --------------------------------------------------
  const footer = el("div", { class: "text-center" });
  if (errors.length || vocabGaps.length) {
    footer.append(el("button", {
      type: "button",
      class: "mt-4 text-xs text-slate-400 underline hover:text-rose-300 focus:outline-none",
      onclick: () => { clearNotebook(user?.id, unit?.id); close(); },
    }, "Vaciar mi cuaderno de esta unidad"));
  }

  const sub = nb.sessions
    ? (nb.sessions + " sesi\u00f3n" + (nb.sessions === 1 ? "" : "es") + " \u00b7 errores por competencia")
    : "Tus errores por competencia \u00b7 practica lo que falla";

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh]",
    role: "dialog", "aria-label": "Cuaderno de la unidad", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center text-white", html: ICONS.book }),
      el("div", { class: "flex-1 min-w-0" },
        el("p", { class: "font-bold text-emerald-300 truncate" }, "Cuaderno \u00b7 " + (unit?.title || "")),
        el("p", { class: "text-xs text-slate-400" }, sub)),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "mt-3" }, tabbar),
    body,
    footer);

  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  selectTab("all"); // arranca en "Todos"
}
