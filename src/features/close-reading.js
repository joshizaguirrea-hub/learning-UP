/**
 * features/close-reading.js — Close-reading (analisis literario C1/C2).
 *
 * Lee un pasaje avanzado con lupa y responde preguntas por LENTES (tono, dccion,
 * subtexto, recurso, tema). La IA evalua TU analisis como profe de literatura y
 * muestra el resultado en el dashboard de feedback reusable.
 *
 * Reusa: motor puro core/close-reading.js, splitTexts (reading-lab), askBymax,
 * parseFeedback + buildFeedbackDashboard. Modal autocontenido (no toca rutas).
 */
import { el } from "../ui/dom.js";
import { UNITS } from "../data/units/index.js";
import { splitTexts } from "../core/reading-lab.js";
import { buildCloseReading, buildAnalysisPrompt } from "../core/close-reading.js";
import { parseFeedback } from "../core/feedback.js";
import { buildFeedbackDashboard } from "./feedback-dashboard.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";

/** Junta pasajes de lectura de las unidades C1/C2 (los mas ricos para analizar). */
function gatherPassages() {
  const out = [];
  for (const u of UNITS) {
    if (u.level !== "C1" && u.level !== "C2") continue;
    for (const l of u.lessons || []) {
      const reading = l?.content?.reading;
      if (!reading) continue;
      for (const p of splitTexts(reading)) {
        if (p.body.length < 120) continue; // solo pasajes con sustancia
        out.push({ title: p.title || l.title, body: p.body, unit: u.title, level: u.level });
      }
    }
  }
  return out;
}

/** Abre el close-reading en un overlay. */
export function openCloseReading() {
  const passages = gatherPassages();

  const close = () => overlay.remove();
  const body = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const heading = el("p", { class: "font-bold text-violet-300" }, "Close-reading");

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Close-reading literario", "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      heading,
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  if (!bymaxAiEnabled) { renderNoAi(); return; }
  if (!passages.length) { renderEmpty(); return; }
  renderPicker();

  // --- IA apagada ------------------------------------------------------------
  function renderNoAi() {
    body.replaceChildren(el("div", { class: "text-center py-6" },
      el("p", { class: "text-4xl", "aria-hidden": "true" }, "\uD83E\uDD16"),
      el("p", { class: "mt-3 text-slate-200 font-semibold" }, "El an\u00e1lisis necesita a Bymax IA"),
      el("p", { class: "mt-1 text-sm text-slate-400" }, "Activa el asistente de IA para que eval\u00fae tu close-reading."),
      el("button", { class: "mt-5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10", onclick: close }, "Cerrar")));
  }

  function renderEmpty() {
    body.replaceChildren(el("p", { class: "text-sm text-slate-300 py-6 text-center" },
      "A\u00fan no hay pasajes C1/C2 para analizar. Avanza en tu curso y vuelve."));
  }

  // --- Paso 1: elegir pasaje -------------------------------------------------
  function renderPicker() {
    heading.textContent = "Close-reading";
    const rows = passages.map((p) => el("button", {
      type: "button",
      class: "w-full text-left px-3 py-3 rounded-xl bg-slate-800/70 border border-slate-700 hover:bg-slate-700/70 focus:outline focus:outline-2 focus:outline-violet-400",
      onclick: () => renderPassage(p),
    },
      el("div", { class: "flex items-center gap-2" },
        el("span", { class: "text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 shrink-0" }, p.level),
        el("span", { class: "text-sm font-semibold text-slate-100" }, p.title)),
      el("p", { class: "text-xs text-slate-400 mt-0.5 line-clamp-1" }, p.unit)));

    body.replaceChildren(
      el("div", { class: "rounded-2xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border border-violet-500/30 p-4" },
        el("p", { class: "text-sm text-slate-200 leading-relaxed" },
          "Lee ", el("b", {}, "despacio y con lupa"), ": no solo ", el("i", {}, "qu\u00e9 dice"),
          " el texto, sino ", el("i", {}, "c\u00f3mo"), " y ", el("i", {}, "por qu\u00e9"),
          ". Bymax evaluar\u00e1 tu an\u00e1lisis como un profe de literatura.")),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-violet-400 font-semibold" }, "Elige un pasaje"),
      el("div", { class: "mt-2 space-y-2" }, ...rows));
  }

  // --- Paso 2: leer + analizar ----------------------------------------------
  function renderPassage(passage) {
    const cr = buildCloseReading(passage, { max: 4 });
    heading.textContent = cr.title || "Pasaje";
    const inputs = [];

    const questionCards = cr.questions.map((q, i) => {
      const ta = el("textarea", {
        rows: "2",
        class: "mt-2 w-full rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-sm p-2 " +
          "focus:outline focus:outline-2 focus:outline-violet-400 placeholder:text-slate-500",
        placeholder: "Escribe tu an\u00e1lisis en ingl\u00e9s...",
        "aria-label": q.lens + ": " + q.q,
      });
      inputs.push({ q: q.q, ta });
      return el("div", { class: "rounded-xl bg-slate-800/50 border border-slate-700 p-3" },
        el("p", { class: "text-xs font-bold text-violet-300 uppercase tracking-wide" }, (i + 1) + " \u00b7 " + q.lens),
        el("p", { class: "text-sm text-slate-100 mt-1" }, q.q),
        el("p", { class: "text-xs text-slate-400 mt-0.5 italic" }, q.hint),
        ta);
    });

    const status = el("p", { class: "mt-2 text-sm text-amber-400 hidden" });
    const sendBtn = el("button", {
      type: "button",
      class: "mt-4 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-violet-300",
      onclick: () => submit(passage, inputs, status, sendBtn),
    }, "Enviar an\u00e1lisis");

    body.replaceChildren(
      el("div", { class: "rounded-xl bg-slate-950/60 border border-slate-700 p-3 max-h-52 overflow-y-auto" },
        el("p", { class: "text-sm text-slate-200 whitespace-pre-line leading-relaxed" }, cr.body)),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-violet-400 font-semibold" }, "Analiza por lentes"),
      el("div", { class: "mt-2 space-y-2" }, ...questionCards),
      status,
      sendBtn,
      el("button", {
        type: "button",
        class: "mt-2 w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10",
        onclick: renderPicker,
      }, "\u2190 Otro pasaje"));
  }

  // --- Paso 3: enviar a la IA + dashboard ------------------------------------
  async function submit(passage, inputs, status, sendBtn) {
    const qa = inputs.map((x) => ({ q: x.q, answer: x.ta.value.trim() }));
    if (!qa.some((x) => x.answer)) {
      status.textContent = "Responde al menos una lente para recibir feedback.";
      status.classList.remove("hidden");
      return;
    }
    status.classList.add("hidden");
    sendBtn.disabled = true;
    renderLoading();

    const prompt = buildAnalysisPrompt({ passage, qa });
    const { answer, error } = await askBymax({
      mode: "interview", topic: "literature", level: passage.level || "C1", question: prompt,
    });

    if (error || !answer) { renderError(passage, inputs, error); return; }
    const parsed = parseFeedback(answer);
    body.replaceChildren(buildFeedbackDashboard({
      parsed,
      title: "Tu an\u00e1lisis literario",
      onRetry: renderPicker,
      onClose: close,
      retryLabel: "Analizar otro pasaje",
    }));
  }

  function renderLoading() {
    heading.textContent = "Bymax est\u00e1 leyendo...";
    body.replaceChildren(el("div", { class: "text-center py-10" },
      el("div", { class: "w-10 h-10 mx-auto rounded-full border-2 border-violet-400 border-t-transparent animate-spin" }),
      el("p", { class: "mt-4 text-sm text-slate-300" }, "Evaluando tu an\u00e1lisis literario...")));
  }

  function renderError(passage, inputs, error) {
    body.replaceChildren(el("div", { class: "text-center py-8" },
      el("p", { class: "text-amber-300 text-sm" }, "\u26a0\ufe0f " + (error || "No pude evaluar ahora.")),
      el("button", {
        class: "mt-4 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold hover:brightness-110",
        onclick: () => renderPassage(passage),
      }, "Reintentar")));
  }
}
