/**
 * features/shadowing.js — Practica de SHADOWING (eco imitativo) determinista.
 *
 * Shadowing = la tecnica reina para fluidez y acento: escuchas una frase modelo
 * (voz OpenAI nativa), la repites como un ECO imitando ritmo y entonacion, y te
 * puntuan. A diferencia de "Pronunciacion" (una sola pasada), aqui se practica
 * en CAPAS: escuchar -> escuchar lento -> escuchar POR PARTES (chunks) -> sombrear.
 *
 * DRY total:
 *  - Frases y coach visual: phrasesOf() + coachView() de speaking.js.
 *  - Chunking y puntaje de sesion: core/shadowing.js (logica pura, testeada).
 *  - Voz: speakMono/speakSequence (OpenAI TTS con fallback), como el resto.
 *  - Mic: mic.js. Puntaje ESTRELLA: recordSpeakingScore() (que la practica de
 *    pronunciacion NO registraba -> este modo SI alimenta el Speaking Score).
 */
import { el } from "../ui/dom.js";
import { phrasesOf, coachView } from "./speaking.js";
import { chunkPhrase, sessionScore } from "../core/shadowing.js";
import { speakMono, speakSequence } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { completeLesson } from "../services/course.js";
import { robotName } from "../ui/robot.js";
import { recordSpeakingScore, scoreLabel } from "../core/speaking-score.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

const SELF_OK = 0.85; // puntaje generoso cuando el alumno se autoevalua "la dije bien"

/**
 * Abre la practica de shadowing para una unidad.
 * @param {object} unit - { title, level, vocab }
 * @param {object} [opts] - { userId, progressId, onComplete }
 */
export function openShadowing(unit, opts = {}) {
  const { userId, progressId, onComplete } = opts;
  const phrases = phrasesOf(unit);
  const supported = speechSupported();
  const rkey = makeResumeKey(userId, unit.id, "shadowing");

  let idx = 0;
  const scores = [];       // proporciones 0..1 por frase
  let dictation = null;
  let listening = false;
  let cancelSay = null;    // corta la voz en curso (escuchar/por partes)

  const stopVoice = () => { try { cancelSay?.(); } catch { /* nada */ } cancelCloud(); };
  const close = () => { dictation?.abort(); stopVoice(); overlay.remove(); };

  // --- Progreso -----------------------------------------------------------
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = () => {
    progress.firstChild.style.width = Math.round((idx / Math.max(1, phrases.length)) * 100) + "%";
  };

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto" });

  function say(text, rate) {
    stopVoice();
    cancelSay = speakMono(text, "en", { rate });
  }

  function renderPhrase() {
    setProgress();
    if (idx >= phrases.length) return renderDone();
    saveProgress(rkey, { idx, scores }); // autosave: sobrevive a un desliz
    const target = phrases[idx];
    const chunks = chunkPhrase(target);
    let recorded = false; // evita puntuar la misma frase dos veces

    const phraseText = el("p", { class: "text-xl font-semibold text-slate-100 leading-relaxed" }, target);

    // Chips de chunks (tocar = oir ese trozo lento). Solo si vale la pena partir.
    const chunked = chunks.length > 1;
    const chips = chunked ? el("div", { class: "mt-3 flex flex-wrap gap-1.5" },
      ...chunks.map((c, i) => el("button", {
        type: "button",
        class: "chunk-chip text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 " +
          "text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-teal-400 transition",
        "data-i": String(i),
        onclick: () => say(c, 0.7),
      }, c))) : null;

    const heardBox = el("p", { class: "mt-3 text-sm text-slate-400 min-h-[1.5rem]" }, "");
    const fb = el("div", { class: "mt-3" });

    const btn = (label, icon, cls, onclick) => el("button", {
      type: "button", onclick,
      class: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition " +
        "focus:outline focus:outline-2 focus:outline-teal-300 " + cls,
    }, el("span", { class: "w-5 h-5", html: icon }), label);

    const listenBtn = btn("Escuchar", ICONS.sound,
      "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(target));
    const slowBtn = btn("Lento", ICONS.clock,
      "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(target, 0.6));

    // "Por partes": reproduce chunk por chunk resaltando el activo (sincronizado).
    const partsBtn = chunked ? btn("Por partes", ICONS.grid,
      "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => playChunks(0)) : null;

    function highlight(active) {
      if (!chips) return;
      [...chips.children].forEach((c, i) => {
        c.classList.toggle("bg-teal-500/30", i === active);
        c.classList.toggle("border-teal-400/60", i === active);
      });
    }
    function playChunks(i) {
      if (i === 0) stopVoice();
      if (i >= chunks.length) { highlight(-1); return; }
      highlight(i);
      cancelSay = speakSequence([{ text: chunks[i], lang: "en-US", opts: { rate: 0.8 } }], null,
        () => { if (i + 1 < chunks.length) setTimeout(() => playChunks(i + 1), 380); else highlight(-1); });
    }

    const nextBtn = el("button", {
      type: "button",
      class: "hidden mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold " +
        "px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400",
      onclick: () => { stopVoice(); idx++; renderPhrase(); },
    }, idx === phrases.length - 1 ? "Terminar" : "Siguiente frase \u2192");

    function finishPhrase(score) {
      if (recorded) return;
      recorded = true;
      scores.push(score);
      nextBtn.classList.remove("hidden");
    }

    // --- Sombrear con microfono -------------------------------------------
    function shadowMic() {
      if (listening) { dictation?.stop(); return; }
      heardBox.textContent = "";
      // Oye el modelo UNA vez y de inmediato abre el mic para el eco.
      say(target);
      dictation = createDictation({
        lang: "en-US",
        onStart: () => { listening = true; shadowBtn.classList.add("animate-pulse"); shadowBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
        onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
        onEnd: (finalText) => {
          listening = false; shadowBtn.classList.remove("animate-pulse"); shadowBtn.lastChild.textContent = "Sombrear";
          if (finalText) {
            heardBox.textContent = "T\u00fa dijiste: \u201c" + finalText + "\u201d";
            const { score, ok, node } = coachView(target, finalText);
            ok ? playCorrect() : playWrong();
            fb.replaceChildren(node);
            finishPhrase(score);
          } else {
            heardBox.textContent = "No te escuch\u00e9. Toca y repite el eco.";
          }
        },
        onError: () => { listening = false; shadowBtn.classList.remove("animate-pulse"); shadowBtn.lastChild.textContent = "Sombrear"; heardBox.textContent = "No pude usar el micr\u00f3fono (\u00bfpermiso denegado?)."; },
      });
      // Deja ~900ms para escuchar antes de empezar a captar el eco.
      setTimeout(() => dictation?.start(), 900);
    }

    const shadowBtn = supported
      ? btn("Sombrear", ICONS.mic,
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", shadowMic)
      : null;

    // Sin mic: autoevaluacion honesta (no penaliza; el reconocimiento falla mucho).
    const selfOkBtn = !supported ? btn("La dije bien", ICONS.check,
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", () => {
        playCorrect();
        fb.replaceChildren(el("div", { class: "rounded-xl px-4 py-3 text-sm bg-emerald-500/15 border border-emerald-500/40 text-emerald-200" },
          el("p", { class: "font-semibold" }, "\u00a1Bien hecho! Sigue con la siguiente.")));
        finishPhrase(SELF_OK);
      }) : null;

    const controls = [listenBtn, slowBtn, partsBtn, shadowBtn, selfOkBtn].filter(Boolean);

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Frase " + (idx + 1) + " de " + phrases.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" },
        phraseText,
        chips,
        el("p", { class: "mt-2 text-sm text-slate-400" },
          "Escucha a " + robotName() + ", repite como un eco imitando el ritmo" +
          (chunked ? " \u00b7 usa \u201cPor partes\u201d si es larga." : ".")),
        heardBox),
      el("div", { class: "mt-4 flex flex-wrap gap-2" }, ...controls),
      supported ? null : el("p", { class: "mt-3 text-sm text-amber-300" },
        "Tu navegador no soporta micr\u00f3fono. Usa Chrome en PC o Android para que el eco se puntue solo. Igual puedes sombrear en voz alta y marcar c\u00f3mo te sali\u00f3."),
      fb, nextBtn);

    // Escucha el modelo automaticamente al mostrar la frase.
    setTimeout(() => say(target), 300);
  }

  function renderDone() {
    clearProgress(rkey);
    progress.firstChild.style.width = "100%";
    const score100 = sessionScore(scores);
    const info = scoreLabel(score100);
    const saved = userId ? recordSpeakingScore(userId, score100) : { best: score100, sessions: 1 };
    if (userId && progressId) completeLesson(userId, progressId, score100).catch(() => {});
    if (typeof onComplete === "function") onComplete(score100);

    const tone = {
      emerald: "from-emerald-500 to-teal-500", teal: "from-teal-500 to-cyan-500",
      indigo: "from-indigo-500 to-fuchsia-500", amber: "from-amber-500 to-orange-500",
      rose: "from-rose-500 to-orange-500",
    }[info.tone] || "from-emerald-500 to-teal-500";

    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "text-5xl mb-2" }, score100 >= 60 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
      el("h3", { class: "text-xl font-bold text-slate-100" }, "\u00a1Shadowing terminado!"),
      el("div", { class: "mt-4 inline-flex flex-col items-center gap-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10" },
        el("span", { class: "text-xs uppercase tracking-wide text-slate-400" }, "Speaking Score de esta sesi\u00f3n"),
        el("span", { class: "text-4xl font-black bg-gradient-to-r " + tone + " bg-clip-text text-transparent" }, String(score100)),
        el("span", { class: "text-sm font-semibold text-slate-200" }, info.label)),
      el("p", { class: "mt-3 text-sm text-slate-400" },
        "Tu mejor Speaking Score: " + (saved.best ?? score100) + " \u00b7 sesiones: " + (saved.sessions ?? 1)),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; scores.length = 0; renderPhrase(); },
      }, "Practicar otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Practica de shadowing", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center text-white", html: ICONS.mic }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-teal-300" }, "Shadowing \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escucha y haz eco \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!phrases.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad a\u00fan no tiene frases para practicar."));
  } else {
    const saved = loadProgress(rkey);
    if (saved && saved.idx > 0 && saved.idx < phrases.length) {
      stage.replaceChildren(resumeCard({
        step: saved.idx + 1, total: phrases.length, accent: "emerald",
        onResume: () => { idx = saved.idx; scores.push(...(saved.scores || [])); renderPhrase(); },
        onRestart: () => { clearProgress(rkey); renderPhrase(); },
      }));
    } else {
      renderPhrase();
    }
  }
}
