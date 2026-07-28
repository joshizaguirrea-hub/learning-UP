/**
 * features/feedback-dashboard.js — Dashboard de LUJO del feedback de habla.
 *
 * Reutilizable por Speaking (Llamada) y Entrevista. Recibe el feedback YA parseado
 * (core/feedback.js -> {score, areas, sections}) y pinta:
 *   - Anillo grande con el puntaje global + etiqueta motivadora.
 *   - Comparativa vs la sesion anterior (rol de coach).
 *   - Tarjetas por AREA (gramatica, vocabulario, fluidez, coherencia...) con barra.
 *   - Secciones de texto (lo que hiciste bien / a mejorar / errores / frases / consejo).
 *   - Bloque extra opcional (p.ej. agendar cita) + botones Reintentar / Cerrar.
 *
 * Presentacion pura: no hace red ni parsing. Devuelve un nodo listo para montar.
 */
import { el } from "../ui/dom.js";
import { scoreLabel } from "../core/speaking-score.js";
import { openErrorPractice } from "./feedback-practice.js";

const TONE = {
  emerald: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  amber: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  rose: "text-rose-300 border-rose-500/30 bg-rose-500/10",
  sky: "text-sky-300 border-sky-500/30 bg-sky-500/10",
  indigo: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10",
};

/** Anillo conico con el puntaje global (0-100). */
function scoreRing(score) {
  return el("div", {
    class: "relative w-32 h-32 rounded-full grid place-items-center mx-auto shadow-[0_0_30px_-8px_rgba(56,189,248,.6)]",
    style: "background: conic-gradient(#38bdf8 " + (score * 3.6) + "deg, rgba(148,163,184,.18) 0deg)",
  },
    el("div", { class: "w-24 h-24 rounded-full bg-slate-900 grid place-items-center" },
      el("div", { class: "text-center" },
        el("p", { class: "text-4xl font-extrabold text-sky-300 leading-none" }, String(score)),
        el("p", { class: "text-[10px] text-slate-400 uppercase tracking-widest mt-1" }, "de 100"))));
}

/** Tarjeta de un area con su barra de progreso (accesible). Si recibe onClick,
 * se vuelve un boton que navega a la pestana de esa categoria. */
function areaCard(a, onClick) {
  const v = a.value;
  const inner = [
    el("div", { class: "flex items-baseline justify-between" },
      el("span", { class: "text-sm font-semibold text-slate-200" }, a.label),
      el("span", { class: "text-lg font-extrabold text-slate-100" }, v,
        el("span", { class: "text-xs text-slate-500 font-normal" }, "/100"))),
    el("div", {
      class: "mt-2 w-full bg-slate-700/60 rounded-full h-2 overflow-hidden",
      role: "progressbar", "aria-valuenow": String(v), "aria-valuemin": "0", "aria-valuemax": "100",
      "aria-label": a.label + ": " + v + " de 100",
    },
      el("div", { class: "bg-gradient-to-r " + a.grad + " h-2 rounded-full transition-all", style: "width:" + v + "%" })),
  ];
  if (!onClick) {
    return el("div", { class: "rounded-xl bg-slate-800/60 border border-slate-700 p-3" }, ...inner);
  }
  return el("button", {
    type: "button",
    class: "text-left w-full rounded-xl bg-slate-800/60 border border-slate-700 p-3 " +
      "hover:bg-slate-700/60 hover:border-slate-500 transition focus:outline focus:outline-2 focus:outline-sky-400",
    onclick: onClick,
    "aria-label": "Ver detalle de " + a.label,
  }, ...inner);
}

/** Seccion de texto con icono + tono. */
function sectionCard(s) {
  const tone = TONE[s.tone] || TONE.indigo;
  return el("div", { class: "mt-3 rounded-xl border p-3 " + tone },
    el("p", { class: "text-sm font-bold flex items-center gap-2" },
      el("span", { "aria-hidden": "true" }, s.icon || "\u2022"), s.title),
    el("div", { class: "mt-1.5 text-sm text-slate-200 whitespace-pre-line leading-relaxed" }, s.body));
}

/** Tarjeta de ERRORES estructurada: cada error tachado -> correcto (+ por que) y
 * un boton para PRACTICARLOS. Es lo que pidio el usuario: errores puntuales de
 * las oraciones que uso, y practicar desde ellos. */
function errorsCard(errors) {
  const rows = errors.map((e) => el("div", { class: "rounded-lg bg-slate-900/50 border border-rose-500/20 p-2.5" },
    el("p", { class: "text-sm" },
      el("span", { class: "text-rose-400 line-through" }, e.wrong),
      el("span", { class: "mx-2 text-slate-500" }, "\u2192"),
      el("span", { class: "text-emerald-300 font-semibold" }, e.right)),
    e.why ? el("p", { class: "mt-1 text-xs text-slate-400" }, "\uD83D\uDCA1 " + e.why) : null));

  return el("div", { class: "mt-3 rounded-xl border p-3 " + TONE.rose },
    el("p", { class: "text-sm font-bold flex items-center gap-2" },
      el("span", { "aria-hidden": "true" }, "\u270F\uFE0F"), "Errores en tus oraciones"),
    el("div", { class: "mt-2 space-y-2" }, ...rows),
    el("button", {
      type: "button",
      class: "mt-3 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-300",
      onclick: () => openErrorPractice(errors),
    }, "\uD83C\uDFAF Practicar mis errores (" + errors.length + ")"));
}

/** Tarjeta de VOCABULARIO en chips (palabra + significado como subtexto). */
function vocabChipsCard(s, items, tone) {
  const chipTone = tone === "emerald"
    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-100"
    : "bg-sky-500/15 border-sky-500/30 text-sky-100";
  const chips = items.map((v) => el("span", {
    class: "inline-flex flex-col px-2.5 py-1 rounded-lg border text-left " + chipTone,
    title: v.note || "",
  },
    el("span", { class: "text-sm font-semibold" }, v.word),
    v.note ? el("span", { class: "text-[11px] opacity-80" }, v.note) : null));
  return el("div", { class: "mt-3 rounded-xl border p-3 " + (TONE[s.tone] || TONE.sky) },
    el("p", { class: "text-sm font-bold flex items-center gap-2" },
      el("span", { "aria-hidden": "true" }, s.icon || "\u2022"), s.title),
    el("div", { class: "mt-2 flex flex-wrap gap-1.5" }, ...chips));
}

/** Elige como pintar cada seccion: las especiales van estructuradas. */
function renderSection(s, data) {
  if (s.title === "Errores clave" && data.errors.length) return errorsCard(data.errors);
  if (s.title === "Vocabulario que usaste" && data.vocabUsed.length) return vocabChipsCard(s, data.vocabUsed, "emerald");
  if (s.title === "Podr\u00edas subir de nivel con" && data.vocabSuggested.length) return vocabChipsCard(s, data.vocabSuggested, "sky");
  return sectionCard(s);
}

// --- Pestanas de detalle (solo feedback de habla) ---------------------------
function findSection(sections, title) { return (sections || []).find((s) => s.title === title) || null; }
function findArea(areas, key) { return (areas || []).find((a) => a.key === key) || null; }

/** Chip con el puntaje de un area (para encabezar cada pestana). */
function scorePill(area) {
  if (!area) return null;
  return el("div", { class: "inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-sm" },
    el("span", { class: "text-slate-300" }, area.label),
    el("span", { class: "font-extrabold text-slate-100" }, String(area.value)),
    el("span", { class: "text-xs text-slate-500" }, "/100"));
}

function emptyState(msg) {
  return el("p", { class: "mt-3 text-sm text-slate-400 rounded-xl border border-white/10 bg-white/5 p-4 text-center" }, msg);
}

/** ¿Es feedback de HABLA? (tiene gramatica + fluidez/pronunciacion). Close-reading no. */
function isSpeakingFeedback(parsed) {
  const keys = new Set((parsed.areas || []).map((a) => a.key));
  return keys.has("GRAMATICA") && (keys.has("PRONUNCIACION") || keys.has("FLUIDEZ"));
}

function tabBtnCls(on) {
  return "shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold transition " + (on
    ? "bg-sky-500 text-white"
    : "bg-white/5 text-slate-300 hover:bg-white/10");
}

/** Contenedor de pestanas accesible (tablist). tabs = [{label, node}].
 * Devuelve { node, select } para poder cambiar de pestana desde fuera. */
function tabsView(tabs) {
  const panel = el("div", { class: "mt-3", role: "tabpanel" });
  const btns = [];
  const select = (i) => {
    btns.forEach((b, k) => { b.setAttribute("aria-selected", k === i ? "true" : "false"); b.className = tabBtnCls(k === i); });
    panel.replaceChildren(tabs[i].node);
  };
  tabs.forEach((t, i) => btns.push(el("button", { type: "button", role: "tab", onclick: () => select(i) }, t.label)));
  const bar = el("div", { class: "mt-4 flex gap-1.5 overflow-x-auto pb-1", role: "tablist" }, ...btns);
  select(0);
  return { node: el("div", {}, bar, panel), select };
}

/** Arma las pestanas de detalle del feedback de habla. La 1a (General) es la
 * parrilla de areas: al tocar una tarjeta saltas a la pestana de esa categoria. */
function buildDetailTabs({ sections, errors, vocabUsed, vocabSuggested, areas }) {
  // Grammar: puntaje + errores puntuales (con boton practicar).
  const grammar = el("div", {},
    scorePill(findArea(areas, "GRAMATICA")),
    errors.length ? errorsCard(errors) : emptyState("Sin errores gramaticales puntuales esta vez. \u00a1Muy bien!"));

  // Vocabulary: usado + sugerido.
  const vocab = el("div", {},
    scorePill(findArea(areas, "VOCABULARIO")),
    vocabUsed.length
      ? vocabChipsCard({ title: "Vocabulario que usaste", icon: "\uD83D\uDFE2", tone: "emerald" }, vocabUsed, "emerald")
      : emptyState("A\u00fan no detectamos vocabulario destacado. \u00a1Anim\u00e1te a usar palabras nuevas!"),
    vocabSuggested.length
      ? vocabChipsCard({ title: "Podr\u00edas subir de nivel con", icon: "\uD83D\uDD35", tone: "sky" }, vocabSuggested, "sky")
      : null);

  // Pronunciacion: puntaje + notas.
  const pronNote = findSection(sections, "Notas de pronunciaci\u00f3n");
  const pron = el("div", {},
    scorePill(findArea(areas, "PRONUNCIACION")),
    pronNote ? sectionCard(pronNote) : emptyState("Sin observaciones de pronunciaci\u00f3n esta vez."));

  // Recomendaciones: lo bueno + a mejorar + frases modelo + consejo.
  const recTitles = ["Lo que hiciste bien", "A mejorar", "Frases modelo", "Consejo final"];
  const recCards = recTitles.map((t) => findSection(sections, t)).filter(Boolean).map(sectionCard);
  const recs = el("div", {}, ...(recCards.length ? recCards : [emptyState("Sin recomendaciones adicionales.")]));

  // General: la parrilla de areas (contenedor vacio; lo llenamos tras crear tabs
  // para poder cablear el salto de pestana desde cada tarjeta).
  const general = el("div", {});

  const view = tabsView([
    { label: "General", node: general },
    { label: "Grammar", node: grammar },
    { label: "Vocabulary", node: vocab },
    { label: "Pronunciaci\u00f3n", node: pron },
    { label: "Recomendaciones", node: recs },
  ]);

  const keyToTab = { GRAMATICA: 1, VOCABULARIO: 2, PRONUNCIACION: 3 };
  general.append(
    el("p", { class: "text-xs uppercase tracking-wide text-sky-400 font-semibold mb-2" }, "Evaluaci\u00f3n por \u00e1rea"),
    el("div", { class: "grid grid-cols-2 gap-2" },
      ...areas.map((a) => {
        const ti = keyToTab[a.key];
        return areaCard(a, ti ? () => view.select(ti) : null);
      })));

  return view.node;
}

/**
 * Construye el nodo del dashboard.
 * @param {object} p
 * @param {{score,areas,sections,raw}} p.parsed - feedback parseado
 * @param {string} [p.title] - titulo grande (p.ej. "Tu feedback de la llamada")
 * @param {object} [p.stats] - { best, avg, sessions } del Speaking Score
 * @param {object|null} [p.prev] - sesion anterior { score } para comparar
 * @param {Node|null} [p.extra] - bloque extra al final (p.ej. agendar cita)
 * @param {Function} [p.onRetry] - callback "Practicar otra vez"
 * @param {Function} [p.onClose] - callback "Cerrar"
 * @param {string} [p.retryLabel]
 * @returns {HTMLElement}
 */
export function buildFeedbackDashboard(p = {}) {
  const { parsed, title = "Tu feedback", stats, prev, extra, onRetry, onClose, retryLabel = "Practicar otra vez" } = p;
  const { score, areas, sections, errors = [], vocabUsed = [], vocabSuggested = [], raw } = parsed;
  const info = scoreLabel(score);

  // Comparativa vs sesion anterior (coach).
  let progress = null;
  if (prev && typeof prev.score === "number") {
    const diff = score - prev.score;
    const up = diff >= 0;
    progress = el("p", { class: "mt-1 text-sm font-semibold " + (up ? "text-emerald-400" : "text-amber-400") },
      (up ? "\u25b2 +" : "\u25bc ") + diff + " pts vs tu sesi\u00f3n anterior (" + prev.score + ")");
  }

  const statsLine = stats
    ? el("p", { class: "text-xs text-slate-400 mt-1" },
      "Speaking Score \u00b7 mejor: " + stats.best + " \u00b7 promedio: " + stats.avg + " \u00b7 sesiones: " + stats.sessions)
    : null;

  // En feedback de HABLA la parrilla de areas vive dentro de la pestana General;
  // en close-reading (plano) se muestra arriba como antes.
  const speaking = isSpeakingFeedback(parsed);
  const areasGrid = (!speaking && areas.length)
    ? el("div", { class: "mt-5" },
      el("p", { class: "text-xs uppercase tracking-wide text-sky-400 font-semibold mb-2" }, "Evaluaci\u00f3n por \u00e1rea"),
      el("div", { class: "grid grid-cols-2 gap-2" }, ...areas.map((a) => areaCard(a))))
    : null;

  const sectionEls = sections.length
    ? sections.map((s) => renderSection(s, { errors, vocabUsed, vocabSuggested }))
    : [el("p", { class: "mt-4 text-sm text-slate-200 whitespace-pre-line" }, raw)];

  // Feedback de habla -> pestanas (General/Grammar/Vocabulary/Pronunciacion/Recomendaciones).
  // Close-reading (u otro) -> secciones planas como antes.
  const detail = speaking
    ? buildDetailTabs({ sections, errors, vocabUsed, vocabSuggested, areas })
    : el("div", { class: "mt-2" }, ...sectionEls);

  const buttons = el("div", { class: "mt-6 flex gap-2" },
    onRetry ? el("button", {
      type: "button",
      class: "flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
      onclick: onRetry,
    }, retryLabel) : null,
    onClose ? el("button", {
      type: "button",
      class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
      onclick: onClose,
    }, "Cerrar") : null);

  return el("div", { class: "overflow-y-auto pr-1", style: "max-height: 76vh" },
    el("div", { class: "text-center" },
      el("p", { class: "text-xs uppercase tracking-widest text-slate-500 mb-3" }, title),
      scoreRing(score),
      el("p", { class: "mt-3 text-xl font-extrabold text-slate-100" }, info.label),
      progress,
      statsLine),
    areasGrid,
    detail,
    extra || null,
    buttons);
}
