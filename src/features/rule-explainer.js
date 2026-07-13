/**
 * features/rule-explainer.js — "Yo, [robot], te explico la regla".
 *
 * Capa de feature. Abre un modo inmersivo donde el Profe Robo toma la FORMULA y
 * los EJEMPLOS, y TRAZA una linea de cada parte de la formula a su parte en el
 * ejemplo, explicando su funcion con voz, paso a paso. Sin IA en la nube:
 * empareja las clausulas por comas (o usa datos explicitos en grammar.explain).
 */
import { el } from "../ui/dom.js";
import { stripMarkup } from "../ui/richtext.js";
import { speakSequence } from "../ui/speech.js";
import { robotAvatar, robotName } from "../ui/robot.js";

const COLORS = [
  { chip: "bg-amber-400 text-slate-900", soft: "text-amber-300", line: "#fbbf24", ring: "ring-amber-400" },
  { chip: "bg-sky-400 text-slate-900", soft: "text-sky-300", line: "#38bdf8", ring: "ring-sky-400" },
  { chip: "bg-fuchsia-400 text-slate-900", soft: "text-fuchsia-300", line: "#e879f9", ring: "ring-fuchsia-400" },
  { chip: "bg-emerald-400 text-slate-900", soft: "text-emerald-300", line: "#34d399", ring: "ring-emerald-400" },
];

/** Parte un texto en clausulas por coma (respetando el punto medio). */
function splitClauses(text) {
  return stripMarkup(String(text))
    .replace(/\u00B7/g, ",")
    .replace(/[.]+\s*$/, "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Abre el explicador de una regla.
 * @param {object} grammar - { title, form, examples, explain? }
 * @param {string} robotLang - idioma de la voz del profe (es-MX / en-US)
 */
export function openRuleExplainer(grammar, robotLang = "es-MX") {
  const name = robotName();
  const explainLang = "es-MX"; // la EXPLICACION siempre en espanol (idioma del alumno)
  const contentLang = "en-US"; // el TEXTO/ejemplos se leen en ingles
  const isEs = true;           // toda la UI del explicador va en espanol
  // Tonos: ejemplo en ingles CLARO; explicacion en espanol DINAMICA y alegre.
  const EX_OPTS = { rate: 1.0, pitch: 1.0 };
  const FUN_OPTS = { rate: 1.12, pitch: 1.18 };

  // Partes de la formula.
  const explicit = grammar.explain;
  const parts = explicit?.parts?.length
    ? explicit.parts.map((p) => stripMarkup(p.label))
    : splitClauses(grammar.form || grammar.title || "");

  // Ejemplos con su traduccion (si existe). `examples` = los que mapean por partes.
  const trs = explicit?.tr || [];
  const rawExamples = (grammar.examples || [])
    .map((ex, i) => ({ text: stripMarkup(ex), tr: trs[i] ? stripMarkup(trs[i]) : "" }));
  const examples = (grammar.examples || [])
    .map((ex, i) => ({ text: stripMarkup(ex), spans: splitClauses(ex), tr: trs[i] ? stripMarkup(trs[i]) : "" }))
    .filter((e) => e.spans.length === parts.length && parts.length >= 1);

  let cancel = () => {};
  const close = () => { cancel(); overlay.remove(); };

  // ----- Estructura visual -------------------------------------------------
  const chipsRow = el("div", { class: "flex flex-wrap justify-center gap-2 relative z-10" });
  const chipEls = parts.map((p, i) => {
    const c = COLORS[i % COLORS.length];
    return el("span", {
      class: "px-3 py-1.5 rounded-lg font-bold text-sm transition-all duration-300 opacity-40 " + c.chip,
    }, p);
  });
  chipEls.forEach((c) => chipsRow.append(c));

  const exampleRow = el("div", { class: "flex flex-wrap justify-center gap-x-1 gap-y-1 text-xl sm:text-2xl font-semibold relative z-10" });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "absolute inset-0 w-full h-full pointer-events-none z-0");
  svg.setAttribute("aria-hidden", "true");

  const stage = el("div", { class: "relative mt-6 rounded-2xl bg-slate-950/40 border border-white/10 p-5 sm:p-8 space-y-10 overflow-hidden" },
    svg, chipsRow, exampleRow);

  const caption = el("p", { class: "mt-4 text-center text-slate-300 min-h-[4rem] text-sm sm:text-base" });

  const exCounter = el("span", { class: "text-xs text-slate-500" });
  const replayBtn = el("button", {
    class: "hidden bg-white/5 border border-white/15 text-slate-200 rounded-xl px-4 py-2.5 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: () => playExample(exIndex),
  }, "Repetir");
  const nextBtn = el("button", {
    class: "hidden bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold rounded-xl px-4 py-2.5 hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: () => { exIndex = (exIndex + 1) % examples.length; playExample(exIndex); },
  }, "Siguiente ejemplo");

  const card = el("div", {
    class: "robot-pop max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl",
    role: "dialog", "aria-label": "Explicacion de " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      robotAvatar("md"),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, name),
        el("p", { class: "text-xs text-slate-400" }, isEs ? "Te explico la regla" : "Let me explain the rule")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("h2", { class: "mt-3 text-center font-bold text-lg text-indigo-100" }, grammar.title),
    stage,
    caption,
    el("div", { class: "mt-4 flex items-center justify-between gap-2" },
      exCounter,
      el("div", { class: "flex gap-2" }, replayBtn, nextBtn)));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  // Si la formula no mapea por partes -> MODO LECTOR: cada ejemplo + su significado.
  if (!examples.length) {
    chipsRow.remove();
    svg.remove();
    let rIdx = 0;
    const playReader = (idx) => {
      const ex = rawExamples[idx];
      exCounter.textContent = "Ejemplo " + (idx + 1) + "/" + rawExamples.length;
      exampleRow.replaceChildren(el("span", { class: "text-slate-100 text-center" }, ex.text));
      caption.replaceChildren(ex.tr
        ? el("span", { class: "block text-indigo-200 font-semibold text-lg" }, "= " + ex.tr)
        : el("span", { class: "text-slate-300" }, "Escucha y repite en voz alta."));
      replayBtn.classList.add("hidden");
      nextBtn.classList.add("hidden");
      const items = [{ text: ex.text, lang: contentLang, opts: EX_OPTS }];
      if (ex.tr) items.push({ text: "Significa: " + ex.tr, lang: explainLang, opts: FUN_OPTS });
      cancel = speakSequence(items, null, () => {
        replayBtn.classList.remove("hidden");
        if (rawExamples.length > 1) nextBtn.classList.remove("hidden");
      });
    };
    replayBtn.onclick = () => playReader(rIdx);
    nextBtn.onclick = () => { rIdx = (rIdx + 1) % rawExamples.length; playReader(rIdx); };
    if (rawExamples.length) playReader(0);
    else { caption.textContent = "Escucha la regla."; cancel = speakSequence([{ text: stripMarkup(grammar.form || grammar.title), lang: contentLang }]); }
    return;
  }

  // ----- Reproduccion paso a paso -----------------------------------------
  let exIndex = 0;
  let spanEls = [];

  function renderExample(idx) {
    const ex = examples[idx];
    exCounter.textContent = (isEs ? "Ejemplo " : "Example ") + (idx + 1) + "/" + examples.length;
    exampleRow.replaceChildren();
    spanEls = ex.spans.map((s, i) => {
      const span = el("span", { class: "px-2 py-1 rounded-lg transition-all duration-300 opacity-40 text-slate-100" }, s);
      exampleRow.append(span);
      if (i < ex.spans.length - 1) exampleRow.append(el("span", { class: "text-slate-500 self-center" }, ","));
      return span;
    });
    chipEls.forEach((c) => { c.classList.add("opacity-40"); c.classList.remove("ring-2", "scale-110"); });
    svg.replaceChildren();
    replayBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }

  function drawLine(i) {
    const c = COLORS[i % COLORS.length];
    const stageR = stage.getBoundingClientRect();
    const a = chipEls[i].getBoundingClientRect();
    const b = spanEls[i].getBoundingClientRect();
    const x1 = a.left + a.width / 2 - stageR.left;
    const y1 = a.bottom - stageR.top;
    const x2 = b.left + b.width / 2 - stageR.left;
    const y2 = b.top - stageR.top;
    const midY = (y1 + y2) / 2;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", c.line);
    path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    const len = path.getTotalLength ? path.getTotalLength() : 300;
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.style.transition = "stroke-dashoffset .5s ease";
    svg.append(path);
    requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; });
  }

  function highlight(i) {
    chipEls.forEach((c, k) => {
      const on = k === i;
      c.classList.toggle("opacity-40", !on);
      c.classList.toggle("ring-2", on);
      c.classList.toggle("scale-110", on);
      if (on) c.classList.add(COLORS[i % COLORS.length].ring);
    });
    spanEls.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle("opacity-40", !on);
      s.classList.toggle("bg-white/10", on);
      s.style.color = on ? COLORS[i % COLORS.length].line : "";
    });
    drawLine(i);
  }

  function stepText(i) {
    if (explicit?.parts?.[i]?.fn) return explicit.parts[i].fn;
    // Generico: en ESPANOL limpio (no leemos la formula en ingles con voz espanola).
    const esOrd = ["la primera", "la segunda", "la tercera", "la cuarta", "la quinta"];
    if (isEs) return "Observa c\u00f3mo " + (esOrd[i] || ("la parte " + (i + 1))) + " parte se conecta con la f\u00f3rmula de arriba.";
    return "This is part " + (i + 1) + " of the structure. See how it connects to the formula above.";
  }

  // Tonos de voz: ejemplo en ingles CLARO; explicacion en espanol DINAMICA y alegre.
  function playExample(idx) {
    renderExample(idx);
    const ex = examples[idx];
    // 1) Intro: muestra el ejemplo COMPLETO y dice su significado (unico por ejemplo).
    spanEls.forEach((s) => s.classList.remove("opacity-40"));
    caption.replaceChildren(
      el("span", { class: "block text-slate-100 leading-snug" }, ex.text),
      ex.tr ? el("span", { class: "block mt-1 text-indigo-200 font-semibold" }, "= " + ex.tr) : el("span", {})
    );
    const intro = [{ text: ex.text, lang: contentLang, opts: EX_OPTS }];
    if (ex.tr) intro.push({ text: "Significa: " + ex.tr, lang: explainLang, opts: FUN_OPTS });

    cancel = speakSequence(intro, null, () => {
      // 2) Desglose parte por parte.
      let k = 0;
      function playStep() {
        if (k >= parts.length) {
          caption.replaceChildren(el("span", { class: "text-emerald-300 font-semibold" },
            "\u00a1Eso es! Ya viste c\u00f3mo se arma."));
          replayBtn.classList.remove("hidden");
          if (examples.length > 1) nextBtn.classList.remove("hidden");
          return;
        }
        highlight(k);
        caption.replaceChildren(
          el("span", { class: "block text-slate-100 leading-snug" }, stepText(k)),
          el("span", { class: "block mt-1.5 text-xs text-slate-400" }, examples[idx].spans[k] + "  \u2192  " + parts[k])
        );
        cancel = speakSequence([
          { text: examples[idx].spans[k], lang: contentLang, opts: EX_OPTS },
          { text: stepText(k), lang: explainLang, opts: FUN_OPTS },
        ], null, () => { k++; setTimeout(playStep, 200); });
      }
      requestAnimationFrame(() => requestAnimationFrame(playStep));
    });
  }

  playExample(0);
}
