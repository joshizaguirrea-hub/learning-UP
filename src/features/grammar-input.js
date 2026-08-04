/**
 * features/grammar-input.js — "Input estructurado" (Processing Instruction, VanPatten).
 *
 * El POP de Grammar del hub abre la CLASE IA; el Caza-errores entrena la
 * PRODUCCION (corrige el fallo). Esto entrena lo que falta: el PROCESAMIENTO del
 * INPUT. Flujo en dos fases:
 *   1) INPUT ENRIQUECIDO: Bymax presenta la regla + la forma y lee ejemplos reales
 *      (voz), marcando el foco. Es comprensible y con la forma resaltada.
 *   2) ACTIVIDADES REFERENCIALES (core/grammar-si.js): oyes/lees una frase y, para
 *      responder bien, DEBES procesar la forma (el tiempo del verbo, o si niega).
 *      Feedback inmediato + explicacion. Al final -> marca la leccion de grammar.
 *
 * Determinista, offline y gratis. Reusa voz, sonidos, mascota y AUTOSAVE (resume).
 * Presentacion pura: la logica vive en core.
 */
import { el } from "../ui/dom.js";
import { speak, speakMono, speakRobot } from "../ui/speech.js";
import { unitTts } from "../data/languages.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { teacherFace } from "../ui/bymax-mascot.js";
import { robotName, openRobotHint } from "../ui/robot.js";
import { openDictionary } from "./dictionary.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { buildGrammarInput, scorePct } from "../core/grammar-si.js";
import { explicitInfo, buildAffectiveItems } from "../core/grammar-pi.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

const PASS = 60;
const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

/**
 * Abre el Input estructurado de una unidad.
 * @param {object} unit
 * @param {object} [opts] { userId, progressId, onComplete }
 * @returns {boolean} false si la unidad no da para generar actividades (el caller decide el fallback).
 */
export function openGrammarInput(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const tts = unitTts(unit); // idioma META de la unidad
  const lesson = lessonForSkill(unit, "grammar");
  const progressId = opts.progressId || lesson?.id;
  const si = buildGrammarInput(unit);
  if (!si.items.length) return false; // sin variedad suficiente -> el caller hace fallback
  const ei = explicitInfo(si);            // Explicit Information (aviso de estrategia)
  const affective = buildAffectiveItems(unit); // actividades afectivas (cierre PI)

  const name = robotName();
  const rkey = makeResumeKey(userId, unit.id, "grammarinput");

  // Objeto de gramatica para la PISTA (reusa el pop de ayuda del lesson-player:
  // recuerda la regla + "Preguntale a la IA"). Asi el alumno nunca se queda sin
  // saber que contestar.
  const grammarHint = { title: si.focus, form: si.form, examples: si.examples || [], mistakes: [] };

  // Barra de ayuda SIEMPRE visible: Pista (regla + IA) y Diccionario (palabra que
  // no conoces). Disponible en las dos fases (input y actividades).
  const helpRow = el("div", { class: "mt-3 flex flex-wrap gap-2" },
    el("button", {
      type: "button",
      class: "text-xs inline-flex items-center gap-1 border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-200 px-3 py-1.5 rounded-full hover:bg-fuchsia-500/20 focus:outline focus:outline-2 focus:outline-fuchsia-400",
      onclick: () => openRobotHint(grammarHint, { type: "choose" }, "es-MX", unit.level),
    }, "\uD83D\uDCA1 Pista / preg\u00fantale a " + name),
    el("button", {
      type: "button",
      class: "text-xs inline-flex items-center gap-1 border border-indigo-500/40 bg-indigo-500/10 text-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => openDictionary(),
    }, el("span", { class: "w-3.5 h-3.5", html: ICONS.book }), "Diccionario"));

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };

  const stage = el("div", { class: "mt-3 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-violet-400 to-fuchsia-500 h-2 rounded-full transition-all", style: "width:0%" }));

  let idx = 0;
  let correct = 0;

  // -------- FASE 1: input enriquecido (presentacion) --------
  // Caja de Explicit Information: nombra la "trampa" de procesamiento y el truco.
  function eiBox() {
    if (!ei.length) return null;
    return el("div", { class: "mt-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4" },
      el("p", { class: "text-xs uppercase tracking-wide text-amber-300 font-semibold" }, "El truco para no caer en la trampa"),
      ...ei.map((e) => el("div", { class: "mt-2" },
        el("p", { class: "text-sm text-rose-300" }, "\u26a0\ufe0f " + e.trap),
        el("p", { class: "text-sm text-emerald-300 mt-0.5" }, "\u2714 " + e.fix),
        el("p", { class: "text-xs text-slate-400 mt-0.5 italic" }, e.focus))));
  }

  function renderInput() {
    progress.firstChild.style.width = "0%";
    const listenAll = () => si.examples.forEach((ex, i) => setTimeout(() => speakMono(ex, tts), i * 1400));
    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Paso 1 \u00b7 Escucha y fíjate en la forma"),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" },
        el("p", { class: "font-bold text-violet-300" }, si.focus),
        si.form ? el("p", { class: "mt-1 text-sm text-slate-300" }, el("span", { class: "text-slate-500" }, "Forma: "), si.form) : null,
        si.rule ? el("p", { class: "mt-2 text-slate-100 leading-relaxed" }, si.rule) : null),
      eiBox(),
      si.examples.length ? el("div", { class: "mt-4" },
        el("div", { class: "flex items-center justify-between gap-2" },
          el("p", { class: "text-xs text-slate-500" }, "Ejemplos (toca para o\u00edr):"),
          el("button", {
            type: "button",
            class: "text-xs inline-flex items-center gap-1 border border-white/15 bg-white/5 text-slate-200 px-3 py-1.5 rounded-full hover:bg-white/10",
            onclick: listenAll,
          }, el("span", { class: "w-4 h-4", html: ICONS.sound }), "Escuchar todo")),
        el("div", { class: "mt-2 space-y-2" }, ...si.examples.map((ex) => el("button", {
          type: "button",
          class: "block w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-100 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-violet-400",
          onclick: () => speakMono(ex, tts),
        }, ex)))) : null,
      el("button", {
        type: "button",
        class: "mt-5 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
        onclick: () => { stopAudio(); renderItem(); },
      }, "Entend\u00ed, a practicar \u2192"));
    speakRobot("Escucha y f\u00edjate bien en la forma del verbo.", "es-MX");
  }

  // -------- FASE 2: actividades referenciales --------
  function renderItem() {
    if (idx >= si.items.length) return startAffective();
    saveProgress(rkey, { idx, correct }); // autosave: sobrevive a un desliz
    progress.firstChild.style.width = Math.round((idx / si.items.length) * 100) + "%";
    const item = si.items[idx];
    let done = false;
    const feedback = el("div");

    const btns = item.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-violet-400",
        onclick: () => {
          if (done) return;
          done = true;
          const ok = !!opt.correct;
          if (ok) { correct++; playCorrect(); } else playWrong();
          btns.forEach((x) => {
            if (x._opt.correct) x.className += " " + OK_CLS;
            else if (x._opt === opt) x.className += " " + BAD_CLS;
            x.disabled = true;
          });
          feedback.replaceChildren(el("p", {
            class: "mt-3 text-sm font-medium " + (ok ? "text-emerald-300" : "text-rose-300"),
          }, (ok ? "\u2714 \u00a1Correcto! " : "\u2717 Casi. ") + item.explain));
          nextRow.replaceChildren(nextBtn());
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    function nextBtn() {
      return el("button", {
        type: "button",
        class: "ml-auto px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 focus:outline focus:outline-2 focus:outline-white/70",
        onclick: () => { idx++; renderItem(); },
      }, idx === si.items.length - 1 ? (affective.length ? "Con\u00e9ctalo contigo \u2192" : "Ver resultado") : "Siguiente \u2192");
    }
    const nextRow = el("div", { class: "mt-4 flex" });

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Frase " + (idx + 1) + " de " + si.items.length + (item.family === "tense" ? " \u00b7 tiempo" : " \u00b7 afirma/niega")),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-3" },
        el("p", { class: "text-xl font-semibold text-slate-100 leading-relaxed flex-1" }, item.sentence),
        el("button", {
          type: "button",
          class: "shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/10 text-slate-200 hover:bg-white/20 focus:outline focus:outline-2 focus:outline-violet-400",
          "aria-label": "Escuchar la frase",
          onclick: () => speakMono(item.sentence, tts),
        }, el("span", { class: "w-5 h-5", html: ICONS.sound }))),
      el("p", { class: "font-semibold text-slate-100 mt-3" }, item.question),
      el("div", { class: "mt-1" }, ...btns),
      feedback, nextRow);
    setTimeout(() => speakMono(item.sentence, tts), 300); // oye la frase al aparecer
  }

  // -------- FASE 2.5: actividades AFECTIVAS (cierre Processing Instruction) --------
  // Sin respuesta correcta: el alumno reacciona sobre si mismo, pero para hacerlo
  // con sentido DEBE procesar la forma. No cuenta para el puntaje.
  let affIdx = 0;
  function startAffective() { affIdx = 0; renderAffective(); }
  function renderAffective() {
    if (!affective.length || affIdx >= affective.length) return renderDone();
    const item = affective[affIdx];
    const note = el("div");
    const nextRow = el("div", { class: "mt-4 flex" });
    let done = false;

    const btns = item.options.map((opt) => el("button", {
      type: "button",
      class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-violet-400",
      onclick: (e) => {
        if (done) return;
        done = true;
        e.currentTarget.className += " border-violet-400 bg-violet-500/25 text-violet-100";
        btns.forEach((x) => { x.disabled = true; });
        note.replaceChildren(el("p", { class: "mt-3 text-sm text-violet-200" }, "\uD83D\uDCA1 " + item.note));
        nextRow.replaceChildren(el("button", {
          type: "button",
          class: "ml-auto px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 focus:outline focus:outline-2 focus:outline-white/70",
          onclick: () => { affIdx++; renderAffective(); },
        }, affIdx === affective.length - 1 ? "Ver resultado" : "Siguiente \u2192"));
      },
    }, opt.text));

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-fuchsia-400 font-semibold" },
        "Con\u00e9ctalo contigo \u00b7 " + (affIdx + 1) + " de " + affective.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-3" },
        el("p", { class: "text-xl font-semibold text-slate-100 leading-relaxed flex-1" }, item.sentence),
        el("button", {
          type: "button",
          class: "shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/10 text-slate-200 hover:bg-white/20 focus:outline focus:outline-2 focus:outline-violet-400",
          "aria-label": "Escuchar la frase",
          onclick: () => speakMono(item.sentence, tts),
        }, el("span", { class: "w-5 h-5", html: ICONS.sound }))),
      el("p", { class: "font-semibold text-slate-100 mt-3" }, item.question),
      el("p", { class: "text-xs text-slate-500 mt-0.5" }, "No hay respuesta correcta \u2014 pero lee bien la forma para contestar."),
      el("div", { class: "mt-1" }, ...btns),
      note, nextRow);
    setTimeout(() => speakMono(item.sentence, tts), 300);
  }

  // -------- FASE 3: resultado --------
  function renderDone() {
    clearProgress(rkey);
    progress.firstChild.style.width = "100%";
    const pct = scorePct(correct, si.items.length);
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);
    if (pct >= PASS) celebrate({ title: "\u00a1Gram\u00e1tica procesada!", subtitle: `Acertaste ${correct} de ${si.items.length} (${pct}%).`, grand: pct >= 80 });

    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, teacherFace("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= PASS ? "\u00a1Bien procesado!" : "Sigue practicando"),
      el("p", { class: "mt-2 text-slate-300" }, "Entendiste " + correct + " de " + si.items.length + " (" + pct + "%)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; renderItem(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Input estructurado con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, teacherFace("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-violet-300" }, "Input estructurado \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Procesa la forma para captar el significado \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, helpRow, stage);
  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  const saved = loadProgress(rkey);
  if (saved && saved.idx > 0 && saved.idx < si.items.length) {
    stage.replaceChildren(resumeCard({
      step: saved.idx + 1, total: si.items.length, accent: "indigo",
      onResume: () => { idx = saved.idx; correct = saved.correct || 0; renderItem(); },
      onRestart: () => { clearProgress(rkey); renderInput(); },
    }));
  } else {
    renderInput();
  }
  return true;
}
