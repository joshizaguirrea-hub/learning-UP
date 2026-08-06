/**
 * features/listening-lab.js — "Listening Lab": ESCUCHA una historia + TEST.
 *
 * El POP de Listening del hub abre esto. Flujo:
 *   1) La IA NARRA una historia NUEVA en el idioma meta (voz real). El texto
 *      esta OCULTO: se entrena el OIDO (puedes repetir/ir mas lento).
 *   2) Test de 8 preguntas de comprension, ordenadas de FACIL a DIFICIL.
 *   3) Puntaje -> marca la leccion de listening completada + revela la
 *      transcripcion para leer/reescuchar.
 *
 * A diferencia del Reading Lab (lee un texto de la unidad), aqui NUNCA se muestra
 * el texto antes del test y la historia es GENERADA por IA -> siempre distinta a
 * la del reading. DRY: reutiliza voz, celebracion, mascota y completeLesson.
 */
import { el } from "../ui/dom.js";
import { speakSequence, speakMono } from "../ui/speech.js";
import { unitTts } from "../data/languages.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { generateListening } from "../services/comprehension-ai.js";

const PASS = 60; // % de comprension para aprobar

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);
const diffLabel = (i) => (i < 3 ? "f\u00e1cil" : i < 6 ? "media" : "dif\u00edcil");

/** Divide un texto en frases para narrarlo con pausas naturales. */
function toSentences(text) {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Abre el Listening Lab de una unidad.
 * @param {object} unit - { title, level, language, vocab, lessons }
 * @param {object} [opts] - { userId, onComplete }
 */
export function openListeningLab(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const tts = unitTts(unit); // idioma META (en usa el motor bilingue; resto mono)
  const lesson = lessonForSkill(unit, "listening");
  const progressId = opts.progressId || lesson?.id;
  const name = robotName();

  let story = null;      // { title, body, moral }
  let questions = [];     // [{ q, options:[{text,correct}], explain }]
  let qIdx = 0;
  let correct = 0;

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };

  const stage = el("div", { class: "mt-3 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-sky-400 to-cyan-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setBar = (pct) => { progress.firstChild.style.width = pct + "%"; };

  // -------- narracion (voz, texto oculto) --------
  function narrate(rate = 0.95) {
    stopAudio();
    if (!story?.body) return;
    if (tts === "en") {
      const items = toSentences(story.body).map((s) => ({ text: s, lang: "en-US", opts: { rate } }));
      if (items.length) speakSequence(items);
    } else {
      speakMono(story.body.replace(/\n+/g, ". "), tts, { rate });
    }
  }

  // -------- FASE 0: cargando (IA escribe la historia) --------
  function renderLoading() {
    setBar(5);
    stage.replaceChildren(el("div", { class: "text-center py-10" },
      el("div", { class: "w-20 mx-auto animate-pulse" }, teacherFace("lg")),
      el("h3", { class: "text-lg font-bold text-slate-100 mt-3" }, name + " est\u00e1 escribiendo tu historia..."),
      el("p", { class: "mt-1 text-sm text-slate-400" }, "Prepara tu o\u00eddo \u00b7 el texto estar\u00e1 oculto")));
  }

  function renderError(msg) {
    setBar(0);
    stage.replaceChildren(el("div", { class: "text-center py-8" },
      el("div", { class: "w-16 mx-auto opacity-70" }, teacherFace("md")),
      el("h3", { class: "text-lg font-bold text-slate-100 mt-3" }, "No pude crear la historia"),
      el("p", { class: "mt-1 text-sm text-slate-400 px-4" }, msg || "Intenta de nuevo en un momento."),
      el("button", {
        type: "button",
        class: "mt-5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-cyan-300",
        onclick: load,
      }, "Reintentar")));
  }

  // -------- FASE 1: escuchar (texto OCULTO) --------
  function renderListen() {
    setBar(15);
    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Paso 1 \u00b7 Escucha (texto oculto)"),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-center" },
        el("div", { class: "w-16 mx-auto" }, teacherFace("md")),
        el("p", { class: "text-slate-300 text-sm mt-2" },
          name + " te va a contar una historia. Esc\u00fachala con atenci\u00f3n las veces que quieras: no ver\u00e1s el texto hasta terminar el test."),
        el("div", { class: "mt-4 flex flex-wrap gap-2 justify-center" },
          el("button", {
            type: "button",
            class: "inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-cyan-300",
            onclick: () => narrate(0.95),
          }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar"),
          el("button", {
            type: "button",
            class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-3 py-2.5 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-cyan-300",
            onclick: () => narrate(0.6),
          }, "M\u00e1s lento"),
          el("button", {
            type: "button",
            class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-3 py-2.5 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-cyan-300",
            onclick: stopAudio,
          }, "Detener"))),
      el("button", {
        type: "button",
        class: "mt-5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
        onclick: () => { stopAudio(); renderQuestion(); },
      }, "Ya escuch\u00e9, ir al test (" + questions.length + " preguntas) \u2192"));

    setTimeout(() => narrate(0.95), 400); // arranca la narracion sola
  }

  // -------- FASE 2: preguntas (facil -> dificil) --------
  function renderQuestion() {
    if (qIdx >= questions.length) return renderDone();
    setBar(20 + Math.round((qIdx / questions.length) * 75));
    const q = questions[qIdx];
    let selected = null;
    let done = false;
    const feedback = el("div");

    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-cyan-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-cyan-400", "bg-cyan-500/25"));
          b.classList.add("border-cyan-400", "bg-cyan-500/25");
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    function nextBtn() {
      return el("button", {
        type: "button",
        class: "ml-auto px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-500 focus:outline focus:outline-2 focus:outline-white/70",
        onclick: () => { qIdx++; renderQuestion(); },
      }, qIdx === questions.length - 1 ? "Ver resultado" : "Siguiente \u2192");
    }

    const checkBtn = el("button", {
      type: "button",
      class: "ml-auto px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-500 focus:outline focus:outline-2 focus:outline-white/70",
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

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Pregunta " + (qIdx + 1) + " de " + questions.length + " \u00b7 " + diffLabel(qIdx)),
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, q.q),
      el("div", { class: "mt-1 flex flex-wrap gap-2" },
        el("button", {
          type: "button",
          class: "text-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
          onclick: () => narrate(0.9),
        }, el("span", { class: "w-4 h-4", html: ICONS.sound }), "Volver a o\u00edr")),
      el("div", { class: "mt-2" }, ...btns),
      feedback,
      el("div", { class: "mt-4 flex" }, checkBtn));
  }

  // -------- FASE 3: resultado + transcripcion --------
  function renderDone() {
    setBar(100);
    const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);
    if (pct >= PASS) celebrate({ title: "\u00a1O\u00eddo afinado!", subtitle: `Acertaste ${correct} de ${questions.length} (${pct}%).`, grand: pct >= 80 });

    const transcript = el("div", { class: "mt-4 rounded-2xl bg-white/5 border border-white/10 p-4 text-left" },
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-1" }, "Transcripci\u00f3n"),
      story?.title ? el("p", { class: "font-bold text-sky-300" }, story.title) : null,
      ...String(story?.body || "").split(/\n+/).map((p) => el("p", { class: "text-slate-100 leading-relaxed mt-1" }, p)),
      story?.moral ? el("p", { class: "mt-3 text-sm text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2" }, "Moraleja: " + story.moral) : null);

    stage.replaceChildren(el("div", { class: "text-center py-2" },
      el("div", { class: "w-24 mx-auto" }, teacherFace("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= PASS ? "\u00a1Buen o\u00eddo!" : "Sigue entrenando el o\u00eddo"),
      el("p", { class: "mt-2 text-slate-300" }, "Entendiste " + correct + " de " + questions.length + " (" + pct + "%)."),
      el("div", { class: "mt-4 flex flex-col sm:flex-row gap-2 justify-center" },
        el("button", {
          class: "border border-cyan-500/40 bg-cyan-500/10 text-cyan-200 font-semibold px-5 py-3 rounded-xl hover:bg-cyan-500/20",
          onclick: () => narrate(0.95),
        }, "Reescuchar historia"),
        el("button", {
          class: "bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110",
          onclick: load, // nueva historia + test
        }, "Otra historia \u2192")),
      transcript));
  }

  // -------- carga (IA) --------
  async function load() {
    stopAudio();
    qIdx = 0; correct = 0; story = null; questions = [];
    renderLoading();
    try {
      const data = await generateListening(unit);
      story = data.story;
      questions = data.questions.map((q) => ({
        q: q.q,
        explain: q.explain,
        options: shuffle(q.choices.map((text, i) => ({ text, correct: i === q.answer }))),
      }));
      renderListen();
    } catch (err) {
      renderError(err?.message);
    }
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Listening Lab con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, teacherFace("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-sky-300" }, "Listening Lab \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escucha una historia y responde \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  load();
}
