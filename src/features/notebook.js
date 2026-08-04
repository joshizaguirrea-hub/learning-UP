/**
 * features/notebook.js — "Cuaderno de la unidad": repaso y estudio.
 *
 * Muestra, en un solo lugar por unidad:
 *   1) CUADERNO DE ERRORES (acumulado de todas tus clases/charlas): lo que dijiste
 *      mal -> como se dice bien, con boton para PRACTICARLO (reusa openErrorPractice).
 *   2) VOCABULARIO QUE TE FALTA (el que la profe detecto que no supiste).
 *   3) REFERENCIA DEL CAPITULO: los PRONOMBRES y el VOCABULARIO de la unidad
 *      (de lo que ya trae la unidad, sin IA).
 *
 * Presentacion pura: los datos vienen de ui/notebook-store.js y core/unit-language.js.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speak } from "../ui/speech.js";
import { micCode, languageName } from "../data/languages.js";
import { loadNotebook, clearNotebook } from "../ui/notebook-store.js";
import { unitPronouns, unitVocabulary } from "../core/unit-language.js";
import { openErrorPractice } from "./feedback-practice.js";

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

/**
 * Abre el Cuaderno de la unidad.
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

  const close = () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };

  const body = el("div", { class: "mt-1 overflow-y-auto pr-1", style: "max-height:74vh" });

  // --- 1) Cuaderno de errores (acumulado) -----------------------------------
  if (errors.length) {
    body.append(sectionTitle(ICONS.bulb, "Tus errores para repasar", errors.length));
    const list = el("div", { class: "flex flex-col gap-2" });
    for (const e of errors) {
      list.append(el("div", { class: "rounded-xl border border-rose-500/25 bg-rose-500/5 p-3 text-sm" },
        el("p", {},
          el("span", { class: "line-through text-rose-300" }, e.wrong),
          el("span", { class: "mx-2 text-slate-500" }, "\u2192"),
          el("span", { class: "text-emerald-300 font-semibold" }, e.right)),
        e.why ? el("p", { class: "mt-1 text-xs text-slate-400" }, "\uD83D\uDCA1 " + e.why) : null));
    }
    body.append(list);
    body.append(el("button", {
      type: "button",
      class: "mt-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold " +
        "hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
      onclick: () => openErrorPractice(errors),
    }, "Practicar mis errores"));
  }

  // --- 2) Vocabulario que te falta ------------------------------------------
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

  // Estado vacio del cuaderno (aun sin practicar).
  if (!errors.length && !vocabGaps.length) {
    body.append(el("div", { class: "mt-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300" },
      "A\u00fan no hay errores guardados. Toma una CLASE o CONVERSACI\u00d3N con la profe en esta unidad: " +
      "al terminar, ella apunta aqu\u00ed tus errores y el vocabulario que te falt\u00f3, para que los repases."));
  }

  // --- 3) Referencia del capitulo: pronombres + vocabulario -----------------
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

  // Vaciar cuaderno (solo si hay algo acumulado).
  const clearBtn = (errors.length || vocabGaps.length) ? el("button", {
    type: "button",
    class: "mt-4 text-xs text-slate-400 underline hover:text-rose-300 focus:outline-none",
    onclick: () => {
      clearNotebook(user?.id, unit?.id);
      close();
    },
  }, "Vaciar mi cuaderno de esta unidad") : null;
  if (clearBtn) body.append(el("div", { class: "text-center" }, clearBtn));

  const sub = nb.sessions
    ? (nb.sessions + " sesi\u00f3n" + (nb.sessions === 1 ? "" : "es") + " \u00b7 repaso y estudio")
    : "Repaso y estudio de la unidad";

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
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-[60] bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
}
