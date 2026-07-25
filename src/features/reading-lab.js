/**
 * features/reading-lab.js — "Reading Lab": leer + ENTENDER + feedback.
 *
 * El POP de Reading del hub abre esto. A diferencia de reading-aloud.js (que
 * califica PRONUNCIACION), aqui se entrena la COMPRENSION lectora:
 *   1) LEER + ESCUCHAR el texto/cuento de la unidad (voz real, glosario tocable).
 *   2) Responder preguntas de comprension EN CAPAS con FEEDBACK inmediato:
 *      reusa las preguntas ya autoradas (content.check) + "palabra en contexto"
 *      autogenerada (core/reading-lab.js) -> DRY, deterministico, offline.
 *   3) Puntaje -> marca la leccion completada + ofrece leer en voz alta.
 *
 * Reutiliza: speech (voz), celebrate, mascota, completeLesson, y openReadingAloud
 * como capa opcional de pronunciacion. Presentacion pura: la logica esta en core.
 */
import { el } from "../ui/dom.js";
import { speak, speakSequence } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { openReadingAloud } from "./reading-aloud.js";
import { splitTexts, buildQuestions, scorePct } from "../core/reading-lab.js";

const PASS = 60; // % de comprension para aprobar

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);

/** Divide un pasaje en frases para leerlo con pausas naturales. */
function toSentences(text) {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Abre el Reading Lab de una unidad.
 * @param {object} unit - { title, level, vocab, lessons }
 * @param {object} [opts] - { userId, progressId, onComplete }
 */
export function openReadingLab(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const lesson = lessonForSkill(unit, "reading");
  const progressId = opts.progressId || lesson?.id;
  const passages = splitTexts(lesson?.content?.reading);
  const questions = buildQuestions(lesson, unit).map((q) => ({ ...q, options: shuffle(q.options) }));
  const name = robotName();

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };

  const stage = el("div", { class: "mt-3 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-500 h-2 rounded-full transition-all", style: "width:0%" }));

  let qIdx = 0;
  let correct = 0;

  // -------- FASE 1: leer + escuchar --------
  function readPassages() {
    const items = passages.flatMap((p) => toSentences(p.body).map((s) => ({ text: s, lang: "en-US", opts: { rate: 0.95 } })));
    if (items.length) speakSequence(items);
  }

  function renderRead() {
    progress.firstChild.style.width = "0%";
    const glossary = (unit.vocab || []).slice(0, 12);
    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Paso 1 \u00b7 Lee y escucha"),
      el("div", { class: "mt-2 flex flex-wrap gap-2" },
        el("button", {
          type: "button",
          class: "inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
          onclick: readPassages,
        }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar texto"),
        el("button", {
          type: "button",
          class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-3 py-2.5 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-indigo-400",
          onclick: stopAudio,
        }, "Detener")),
      ...passages.map((p) => el("div", { class: "mt-4 rounded-2xl bg-white/5 border border-white/10 p-4" },
        p.title ? el("p", { class: "font-bold text-indigo-300 mb-1" }, p.title) : null,
        ...p.body.split(/\n+/).map((para) => el("p", { class: "text-slate-100 leading-relaxed mt-1" }, para)))),
      glossary.length ? el("div", { class: "mt-4" },
        el("p", { class: "text-xs text-slate-500 mb-1" }, "Glosario (toca para o\u00edr):"),
        el("div", { class: "flex flex-wrap gap-2" }, ...glossary.map((v) => el("button", {
          type: "button",
          class: "text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10",
          onclick: () => speak(v.term, "en-US", { rate: 0.9 }),
          title: v.translation || "",
        }, v.term)))) : null,
      el("button", {
        type: "button",
        class: "mt-5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
        onclick: () => { stopAudio(); renderQuestion(); },
      }, questions.length ? "Entend\u00ed, ir a las preguntas \u2192" : "Terminar"));

    setTimeout(readPassages, 350); // arranca la lectura sola
  }

  // -------- FASE 2: preguntas con feedback --------
  function renderQuestion() {
    if (qIdx >= questions.length) return renderDone();
    progress.firstChild.style.width = Math.round((qIdx / questions.length) * 100) + "%";
    const q = questions[qIdx];
    let selected = null;
    let done = false;
    const feedback = el("div");

    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-indigo-400", "bg-indigo-500/25"));
          b.classList.add("border-indigo-400", "bg-indigo-500/25");
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    const checkBtn = el("button", {
      type: "button",
      class: "ml-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-white/70",
      onclick: () => {
        if (done || !selected) return;
        done = true;
        const ok = !!selected.correct;
        if (ok) { correct++; playCorrect(); } else playWrong();
        btns.forEach((b) => {
          if (b._opt.correct) b.className += " " + OK_CLS;
          else if (b._opt === selected) b.className += " " + BAD_CLS;
          b.disabled = true;
        });
        feedback.replaceChildren(el("p", {
          class: "mt-3 text-sm font-medium " + (ok ? "text-emerald-300" : "text-rose-300"),
        }, (ok ? "\u2714 \u00a1Correcto! " : "\u2717 Casi. ") + (q.explain || "")));
        checkBtn.replaceWith(nextBtn());
      },
    }, "Comprobar");

    function nextBtn() {
      return el("button", {
        type: "button",
        class: "ml-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-white/70",
        onclick: () => { qIdx++; renderQuestion(); },
      }, qIdx === questions.length - 1 ? "Ver resultado" : "Siguiente \u2192");
    }

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Pregunta " + (qIdx + 1) + " de " + questions.length + (q.kind === "vocab" ? " \u00b7 palabra en contexto" : " \u00b7 comprensi\u00f3n")),
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, q.q),
      el("div", { class: "mt-2" }, ...btns),
      feedback,
      el("div", { class: "mt-4 flex" }, checkBtn));
  }

  // -------- FASE 3: resultado --------
  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = scorePct(correct, questions.length);
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);
    if (pct >= PASS) celebrate({ title: "\u00a1Comprensi\u00f3n lograda!", subtitle: `Acertaste ${correct} de ${questions.length} (${pct}%).`, grand: pct >= 80 });

    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= PASS ? "\u00a1Bien le\u00eddo!" : "Sigue practicando"),
      el("p", { class: "mt-2 text-slate-300" }, "Entendiste " + correct + " de " + questions.length + " (" + pct + "%)."),
      el("div", { class: "mt-5 flex flex-col sm:flex-row gap-2 justify-center" },
        el("button", {
          class: "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110",
          onclick: () => { qIdx = 0; correct = 0; questions.forEach((q) => { q.options = shuffle(q.options); }); renderRead(); },
        }, "Leer otra vez"),
        el("button", {
          class: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200 font-semibold px-5 py-3 rounded-xl hover:bg-emerald-500/20",
          onclick: () => { close(); openReadingAloud(unit, { userId, progressId }); },
        }, "Ahora l\u00e9elo en voz alta \u2192"))));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Reading Lab con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, "Reading Lab \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Lee, entiende y responde \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!passages.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad aun no tiene un texto de lectura."));
  } else {
    renderRead();
  }
}
