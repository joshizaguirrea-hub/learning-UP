/**
 * features/dictogloss.js — "Dictogloss": el metodo estrella de LISTENING.
 *
 * El POP de Listening del hub abre esto. Flujo por frase:
 *   1) ESCUCHAR (voz real; texto OCULTO) - normal o mas lento.
 *   2) ESCRIBIR lo que se entendio.
 *   3) FEEDBACK palabra por palabra (verde=acertaste, ambar=te falto) + chips
 *      de las palabras que faltaron (se oyen lento al tocarlas) + transcripcion.
 *   4) Puntaje de la sesion -> marca la leccion de listening completada.
 *
 * Deterministico y offline (no depende del Worker). Reutiliza la logica pura de
 * core/dictogloss.js y el motor de voz/celebracion. Presentacion pura.
 */
import { el } from "../ui/dom.js";
import { speakMono } from "../ui/speech.js";
import { unitTts } from "../data/languages.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { dictationSentences, gradeDictation, sessionScore } from "../core/dictogloss.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

const PASS = 0.6; // proporcion de palabras para aprobar una frase

/**
 * Abre el Dictogloss (dictado de comprension) de una unidad.
 * @param {object} unit - { title, level, vocab, lessons }
 * @param {object} [opts] - { userId, progressId, onComplete }
 */
export function openDictogloss(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const tts = unitTts(unit); // voz del idioma META de la unidad (en | pt...)
  const lesson = lessonForSkill(unit, "listening");
  const progressId = opts.progressId || lesson?.id;
  const sentences = dictationSentences(unit);
  const name = robotName();
  const rkey = makeResumeKey(userId, unit.id, "dictogloss");
  let idx = 0;
  const scores = [];

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-sky-400 to-cyan-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = () => { progress.firstChild.style.width = Math.round((idx / sentences.length) * 100) + "%"; };

  function renderSentence() {
    setProgress();
    if (idx >= sentences.length) return renderDone();
    saveProgress(rkey, { idx, scores }); // autosave por si sales sin querer
    const target = sentences[idx];

    const listenBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-cyan-300",
      onclick: () => speakMono(target, tts),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar");

    const slowBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-3 py-2.5 rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-cyan-300",
      onclick: () => speakMono(target, tts, { rate: 0.6 }),
    }, "M\u00e1s lento");

    const input = el("textarea", {
      rows: "2",
      class: "mt-4 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-cyan-500",
      placeholder: "Escribe lo que entendiste...",
    });

    const fb = el("div", { class: "mt-3" });

    const nextBtn = el("button", {
      type: "button",
      class: "hidden mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; renderSentence(); },
    }, idx === sentences.length - 1 ? "Ver resultado" : "Siguiente frase \u2192");

    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => {
        if (!input.value.trim()) { input.focus(); return; }
        const { score, marks, missing } = gradeDictation(target, input.value);
        scores.push(score);
        const ok = score >= PASS;
        ok ? playCorrect() : playWrong();
        input.disabled = true;
        checkBtn.classList.add("hidden");

        const colored = el("p", { class: "mt-2 leading-relaxed" }, ...marks.map((m) => el("span", {
          class: (m.hit ? "text-emerald-300" : "text-amber-300 underline decoration-amber-400/70") + " mr-1",
        }, m.word + " ")));

        const chips = missing.length ? el("div", { class: "mt-2" },
          el("p", { class: "text-xs opacity-90" }, "Te faltaron (toca para o\u00edrlas lento):"),
          el("div", { class: "mt-1 flex flex-wrap gap-1.5" }, ...missing.slice(0, 8).map((w) => el("button", {
            type: "button",
            class: "text-xs px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-100 hover:bg-amber-500/30",
            onclick: () => speakMono(w, tts, { rate: 0.55 }),
          }, w)))) : null;

        fb.replaceChildren(el("div", {
          class: "rounded-xl px-4 py-3 text-sm " + (ok
            ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
            : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
        },
          el("p", { class: "font-semibold" }, (ok ? "\u00a1Muy bien! " : "Casi... ") + Math.round(score * 100) + "% de las palabras"),
          el("p", { class: "mt-1 text-xs text-slate-400" }, "Transcripci\u00f3n:"),
          colored,
          chips || el("p", { class: "mt-1 opacity-90" }, "\u00a1Entendiste toda la frase!")));
        nextBtn.classList.remove("hidden");
      },
    }, "Comprobar");

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Dictado " + (idx + 1) + " de " + sentences.length + " \u00b7 texto oculto"),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" },
        el("p", { class: "text-slate-300 text-sm" }, "Escucha y escribe lo que oigas. Puedes repetir las veces que quieras."),
        el("div", { class: "mt-3 flex flex-wrap gap-2" }, listenBtn, slowBtn)),
      input, checkBtn, fb, nextBtn);

    setTimeout(() => speakMono(target, tts), 350); // reproduce al mostrar
  }

  function renderDone() {
    clearProgress(rkey);
    progress.firstChild.style.width = "100%";
    const pct = sessionScore(scores);
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);
    if (pct >= 60) celebrate({ title: "\u00a1O\u00eddo afinado!", subtitle: `Entendiste el ${pct}% de las palabras.`, grand: pct >= 80 });

    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, teacherFace("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= 60 ? "\u00a1Buen o\u00eddo!" : "Sigue entrenando el o\u00eddo"),
      el("p", { class: "mt-2 text-slate-300" }, "Entendiste el " + pct + "% de las palabras en " + sentences.length + " frases."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; scores.length = 0; renderSentence(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Dictogloss (listening) con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, teacherFace("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-sky-300" }, "Dictogloss \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escucha y escribe \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!sentences.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad aun no tiene frases para dictado."));
  } else {
    const saved = loadProgress(rkey);
    if (saved && saved.idx > 0 && saved.idx < sentences.length) {
      stage.replaceChildren(resumeCard({
        step: saved.idx + 1, total: sentences.length, accent: "sky",
        onResume: () => { idx = saved.idx; scores.push(...(saved.scores || [])); renderSentence(); },
        onRestart: () => { clearProgress(rkey); renderSentence(); },
      }));
    } else {
      renderSentence();
    }
  }
}
