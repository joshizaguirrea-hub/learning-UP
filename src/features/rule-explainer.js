/**
 * features/rule-explainer.js — "Yo, [robot], te explico la regla".
 *
 * Modo inmersivo: toma la FORMULA y los EJEMPLOS, dibuja las fichas de la formula
 * y TRAZA una linea de cada ficha a su(s) palabra(s) clave en el ejemplo, mientras
 * el profe lo explica con voz, paso a paso. Sin IA en la nube.
 *
 * Funciona en TODAS las unidades: primero intenta anclar cada ficha a su palabra
 * clave dentro del ejemplo; si no encuentra ancla, reparte las palabras del
 * ejemplo entre las fichas por bloques -> SIEMPRE hay fichas y lineas.
 */
import { el } from "../ui/dom.js";
import { stripMarkup } from "../ui/richtext.js";
import { speakSequence } from "../ui/speech.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { isAtLeast } from "../data/cefr.js";

const COLORS = [
  { chip: "bg-amber-400 text-slate-900", line: "#fbbf24", ring: "ring-amber-400" },
  { chip: "bg-sky-400 text-slate-900", line: "#38bdf8", ring: "ring-sky-400" },
  { chip: "bg-fuchsia-400 text-slate-900", line: "#e879f9", ring: "ring-fuchsia-400" },
  { chip: "bg-emerald-400 text-slate-900", line: "#34d399", ring: "ring-emerald-400" },
  { chip: "bg-rose-400 text-slate-900", line: "#fb7185", ring: "ring-rose-400" },
  { chip: "bg-violet-400 text-slate-900", line: "#a78bfa", ring: "ring-violet-400" },
];

// Terminos gramaticales en espanol (descriptores): NO son palabras que anclar
// dentro del ejemplo, solo describen la formula.
const DESCRIPTORS = new Set([
  "sujeto", "verbo", "verbos", "base", "participio", "gerundio", "infinitivo",
  "adjetivo", "adverbio", "sustantivo", "complemento", "objeto", "singular",
  "plural", "afirmativo", "negativo", "afirm", "neg", "preg", "pregunta",
  "respuesta", "opcional", "agente", "persona", "personas", "cosas", "cosa",
  "presente", "pasado", "futuro", "punto", "periodo", "inicio", "adj", "adv",
  "part", "real", "imaginario", "decision", "momento", "oferta", "fondo",
  "accion", "breve", "cerca", "lejos", "antes", "medio", "corto", "largo",
  "irregular", "ahora", "resto", "clausula", "enfasis", "extra", "informacion",
  // conectores/articulos es (glue)
  "y", "o", "de", "la", "el", "los", "las", "un", "una", "con", "sin", "en",
  "mas", "como", "que", "del", "por", "para", "ly", "ing", "ed",
]);

/** Parte la FORMULA en partes visibles (por punto medio y coma). */
function splitParts(form) {
  return stripMarkup(String(form))
    .replace(/\u00B7/g, ",")
    .replace(/[.]+\s*$/, "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Palabras "ancla" de una parte (tokens ingleses, sin descriptores ni simbolos). */
function anchorWords(part) {
  return String(part)
    .toLowerCase()
    .replace(/[+*_()[\]{}|]/g, " ")
    .split(/[\s/]+/) // separa por espacio y por "/"
    .map((w) => w.replace(/[^a-z']/g, ""))
    .filter((w) => w && !DESCRIPTORS.has(w));
}

/** Divide un ejemplo en tokens { text (visible), key (para comparar) }. */
function tokenize(example) {
  return stripMarkup(String(example))
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => ({ text: t, key: t.toLowerCase().replace(/[^a-z']/g, "") }));
}

/**
 * Asigna cada token del ejemplo a una parte (indice de ficha). Ancla por palabra
 * clave; los huecos se rellenan hacia la derecha; si no hubo NINGUNA ancla,
 * reparte por bloques iguales. Garantiza que cada ficha tenga a que apuntar.
 */
function mapTokensToParts(tokens, parts) {
  const owner = new Array(tokens.length).fill(-1);
  parts.forEach((p, pi) => {
    const keys = anchorWords(p);
    if (!keys.length) return;
    tokens.forEach((tk, ti) => {
      if (owner[ti] === -1 && keys.includes(tk.key)) owner[ti] = pi;
    });
  });
  const anyAssigned = owner.some((o) => o !== -1);
  if (!anyAssigned) {
    const per = Math.max(1, Math.ceil(tokens.length / parts.length));
    tokens.forEach((_, ti) => { owner[ti] = Math.min(parts.length - 1, Math.floor(ti / per)); });
    return owner;
  }
  // Rellena huecos con el ultimo dueno visto (bloques contiguos naturales).
  let last = owner.find((o) => o !== -1);
  for (let ti = 0; ti < owner.length; ti++) {
    if (owner[ti] === -1) owner[ti] = last;
    else last = owner[ti];
  }
  return owner;
}

/**
 * Abre el explicador de una regla.
 * @param {object} grammar - { title, form, examples, rule?, explain? }
 * @param {string} [level] - nivel CEFR de la unidad (A1..C2). En AVANZADO (C1/C2)
 *   la explicacion va SOLO en ingles (inmersion): sin voz ni caption en espanol.
 */
export function openRuleExplainer(grammar, level) {
  const name = robotName();
  // AVANZADO = C1 o superior: inmersion total, sin muleta de espanol.
  const advanced = isAtLeast(level || "A1", "C1");
  const explainLang = "es-MX"; // la EXPLICACION en espanol (idioma del alumno)
  const contentLang = "en-US"; // el ejemplo se lee en ingles
  const EX_OPTS = { rate: 0.88, pitch: 1.0 }; // ingles PAUSADO (no atropellado)
  const FUN_OPTS = { rate: 1.08, pitch: 1.14 };

  // Partes de la formula (labels explicitos o troceo de la formula).
  const explicit = grammar.explain;
  const parts = explicit?.parts?.length
    ? explicit.parts.map((p) => stripMarkup(p.label))
    : splitParts(grammar.form || grammar.title || "");
  if (!parts.length) parts.push(stripMarkup(grammar.title || "Formula"));
  const partFns = explicit?.parts?.length ? explicit.parts.map((p) => p.fn) : [];

  // TODOS los ejemplos sirven ahora (con su traduccion si existe).
  const trs = explicit?.tr || [];
  const examples = (grammar.examples || []).map((ex, i) => ({
    text: stripMarkup(ex),
    tokens: tokenize(ex),
    tr: trs[i] ? stripMarkup(trs[i]) : "",
  }));

  let cancel = () => {};
  const close = () => { cancel(); overlay.remove(); };

  // ----- Estructura visual -------------------------------------------------
  const chipsRow = el("div", { class: "flex flex-wrap justify-center gap-2 relative z-10" });
  const chipEls = parts.map((p, i) => el("span", {
    class: "px-3 py-1.5 rounded-lg font-bold text-sm transition-all duration-300 opacity-40 " + COLORS[i % COLORS.length].chip,
  }, p));
  chipEls.forEach((c) => chipsRow.append(c));

  const exampleRow = el("div", { class: "flex flex-wrap justify-center gap-x-2 gap-y-1 text-xl sm:text-2xl font-semibold relative z-10" });
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
        el("p", { class: "text-xs text-slate-400" }, "Te explico la regla")),
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

  // Sin ejemplos: solo lee la formula.
  if (!examples.length) {
    exampleRow.replaceChildren(el("span", { class: "text-slate-100 text-center" }, grammar.form || grammar.title || ""));
    caption.textContent = advanced ? "Listen to the rule." : "Escucha la regla.";
    cancel = speakSequence([{ text: stripMarkup(grammar.form || grammar.title || ""), lang: contentLang }]);
    return;
  }

  // ----- Reproduccion paso a paso -----------------------------------------
  let exIndex = 0;
  let tokenEls = [];
  let owner = [];

  function renderExample(idx) {
    const ex = examples[idx];
    owner = mapTokensToParts(ex.tokens, parts);
    exCounter.textContent = "Ejemplo " + (idx + 1) + "/" + examples.length;
    exampleRow.replaceChildren();
    tokenEls = ex.tokens.map((tk) => {
      const span = el("span", { class: "px-1 py-0.5 rounded-lg transition-all duration-300 opacity-40 text-slate-100" }, tk.text);
      exampleRow.append(span);
      return span;
    });
    chipEls.forEach((c) => { c.classList.add("opacity-40"); c.classList.remove("ring-2", "scale-110"); });
    svg.replaceChildren();
    replayBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }

  /** Centro (x,y) del grupo de tokens que pertenecen a la parte pi. */
  function groupCenter(pi) {
    const idxs = owner.map((o, i) => (o === pi ? i : -1)).filter((i) => i >= 0);
    if (!idxs.length) return null;
    const stageR = stage.getBoundingClientRect();
    let left = Infinity, right = -Infinity, top = Infinity;
    idxs.forEach((i) => {
      const r = tokenEls[i].getBoundingClientRect();
      left = Math.min(left, r.left); right = Math.max(right, r.right); top = Math.min(top, r.top);
    });
    return { x: (left + right) / 2 - stageR.left, y: top - stageR.top, idxs };
  }

  function drawLine(pi) {
    const c = COLORS[pi % COLORS.length];
    const g = groupCenter(pi);
    if (!g) return;
    const stageR = stage.getBoundingClientRect();
    const a = chipEls[pi].getBoundingClientRect();
    const x1 = a.left + a.width / 2 - stageR.left;
    const y1 = a.bottom - stageR.top;
    const x2 = g.x;
    const y2 = g.y;
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

  function highlight(pi) {
    chipEls.forEach((c, k) => {
      const on = k === pi;
      c.classList.toggle("opacity-40", !on);
      c.classList.toggle("ring-2", on);
      c.classList.toggle("scale-110", on);
      if (on) c.classList.add(COLORS[pi % COLORS.length].ring);
    });
    tokenEls.forEach((s, k) => {
      const on = owner[k] === pi;
      s.classList.toggle("opacity-40", !on);
      s.classList.toggle("bg-white/10", on);
      s.style.color = on ? COLORS[pi % COLORS.length].line : "";
    });
    drawLine(pi);
  }

  /** Texto (voz + caption) del paso pi: usa fn explicita o un generico util. */
  function stepText(pi) {
    if (partFns[pi]) return partFns[pi];
    const ord = ["la primera", "la segunda", "la tercera", "la cuarta", "la quinta", "la sexta"];
    return "Fijate en " + (ord[pi] || ("la parte " + (pi + 1))) + " parte de la formula y como aparece en el ejemplo.";
  }

  /** Palabras (visibles) del ejemplo que pertenecen a la parte pi. */
  function groupText(pi) {
    return examples[exIndex].tokens.filter((_, i) => owner[i] === pi).map((t) => t.text).join(" ");
  }

  function playExample(idx) {
    renderExample(idx);
    const ex = examples[idx];
    // 1) Intro: ejemplo completo + (solo en niveles no avanzados) su regla/traduccion.
    tokenEls.forEach((s) => s.classList.remove("opacity-40"));
    caption.replaceChildren(
      el("span", { class: "block text-slate-100 leading-snug" }, ex.text),
      // AVANZADO: nada de espanol (inmersion). Otros niveles: regla o traduccion.
      advanced
        ? el("span", {})
        : (idx === 0 && grammar.rule)
          ? el("span", { class: "block mt-1 text-emerald-200" }, stripMarkup(grammar.rule))
          : (ex.tr ? el("span", { class: "block mt-1 text-indigo-200 font-semibold" }, "= " + ex.tr) : el("span", {}))
    );
    const intro = [{ text: ex.text, lang: contentLang, opts: EX_OPTS }];
    // La voz en espanol NO traduce: solo explica la LOGICA de la formula (la regla
    // en el 1er ejemplo). La traduccion queda visible en pantalla, pero no se lee.
    // En AVANZADO no hay voz en espanol en absoluto.
    if (!advanced && idx === 0 && grammar.rule) intro.push({ text: stripMarkup(grammar.rule), lang: explainLang, opts: FUN_OPTS });

    cancel = speakSequence(intro, null, () => {
      // 2) Desglose ficha por ficha.
      let k = 0;
      const owns = (pi) => ex.tokens.some((_, i) => owner[i] === pi);
      function playStep() {
        // Salta fichas que no anclan a ninguna palabra (no dibujar lineas al vacio).
        while (k < parts.length && !owns(k)) k++;
        if (k >= parts.length) {
          caption.replaceChildren(el("span", { class: "text-emerald-300 font-semibold" },
            advanced ? "That's it! See how it's built." : "\u00a1Eso es! Ya viste como se arma."));
          replayBtn.classList.remove("hidden");
          if (examples.length > 1) nextBtn.classList.remove("hidden");
          return;
        }
        highlight(k);
        // AVANZADO: caption solo con el mapeo visual (sin la frase en espanol).
        caption.replaceChildren(
          advanced
            ? el("span", {})
            : el("span", { class: "block text-slate-100 leading-snug" }, stepText(k)),
          el("span", { class: "block mt-1.5 text-xs text-slate-400" }, (groupText(k) || parts[k]) + "  \u2192  " + parts[k])
        );
        const spoken = [];
        const gt = groupText(k);
        if (gt) spoken.push({ text: gt, lang: contentLang, opts: EX_OPTS });
        // La explicacion en espanol de cada parte solo en niveles no avanzados.
        if (!advanced) spoken.push({ text: stepText(k), lang: explainLang, opts: FUN_OPTS });
        cancel = speakSequence(spoken, null, () => { k++; setTimeout(playStep, 200); });
      }
      requestAnimationFrame(() => requestAnimationFrame(playStep));
    });
  }

  playExample(0);
}
