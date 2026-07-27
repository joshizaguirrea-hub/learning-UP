/**
 * features/vocab-class.js — Clase de PRESENTACION de vocabulario con Bymax.
 *
 * El POP de Vocabulary del hub ya no salta directo a la practica: primero Bymax
 * DA LA CLASE (fase de input comprensible). Se presenta, y va palabra por palabra
 * diciendola en ingles (voz nativa), mostrando su traduccion y un ejemplo real, y
 * poniendo al alumno a REPETIRLA en voz alta (mic si el navegador lo soporta;
 * autoevaluacion honesta si no). Al terminar, encadena con la ESCALERA de
 * practica (openVocabLab) -> input primero, output despues.
 *
 * DRY total: voz (speakMono/speakSequence), mic (mic.js), coach visual palabra
 * por palabra (coachView de speaking.js), y la lista de palabras (vocabTeachList,
 * logica pura de core/vocab-lab.js).
 */
import { el } from "../ui/dom.js";
import { speakMono, speakSequence } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { coachView } from "./speaking.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect } from "../ui/sound.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { vocabTeachList } from "../core/vocab-lab.js";
import { openVocabLab } from "./vocab-lab.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

/**
 * Abre la clase de presentacion de vocabulario de una unidad.
 * @param {object} unit - { title, level, vocab }
 * @param {object} [opts] - { userId, progressId, onComplete } (se PASAN tal cual
 *   a openVocabLab al terminar la clase, que es quien marca la leccion completa).
 */
export function openVocabClass(unit, opts = {}) {
  const words = vocabTeachList(unit);
  const name = robotName();
  const supported = speechSupported();
  const rkey = makeResumeKey(opts.userId, unit.id, "vocabclass");
  let idx = 0;               // -1 = intro; 0..n-1 = palabras
  let cancelSay = null;      // corta la voz en curso
  let dictation = null;
  let listening = false;

  const stopVoice = () => { try { cancelSay?.(); } catch { /* nada */ } cancelCloud(); };
  const close = () => { dictation?.abort(); stopVoice(); overlay.remove(); };

  function say(text, rate) {
    stopVoice();
    cancelSay = speakMono(text, "en", { rate });
  }

  // Al terminar la clase: cierra este POP y abre la ESCALERA de practica.
  function goPractice() {
    close();
    openVocabLab(unit, opts);
  }

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = (n) => { progress.firstChild.style.width = Math.round(n * 100) + "%"; };

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });

  const btn = (label, icon, cls, onclick) => el("button", {
    type: "button", onclick,
    class: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition " +
      "focus:outline focus:outline-2 focus:outline-pink-300 " + cls,
  }, el("span", { class: "w-5 h-5", html: icon }), label);

  // --- INTRO: Bymax se presenta -----------------------------------------
  function renderIntro() {
    setProgress(0);
    const greeting = `Hi! I'm ${name}. Let's learn ${words.length} new words together. Listen and repeat after me!`;
    stage.replaceChildren(el("div", { class: "text-center py-4" },
      el("div", { class: "w-28 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-3" }, "\u00a1Hola! Soy " + name),
      el("p", { class: "mt-2 text-slate-300 max-w-sm mx-auto" },
        "Hoy te ense\u00f1o " + words.length + " palabras nuevas de \u201c" + (unit.title || "") + "\u201d. " +
        "Yo las digo en ingl\u00e9s, t\u00fa las repites. \u00a1As\u00ed se te pegan de verdad!"),
      el("div", { class: "mt-5 flex flex-wrap gap-2 justify-center" },
        btn("Escuchar a " + name, ICONS.sound,
          "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(greeting, 0.95)),
        btn("Empezar la clase →", ICONS.play,
          "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:brightness-110",
          () => { idx = 0; renderWord(); }))));
    setTimeout(() => say(greeting, 0.95), 350);
  }

  // --- UNA PALABRA: escuchar + traduccion + ejemplo + repetir -----------
  function renderWord() {
    if (idx >= words.length) return renderDone();
    saveProgress(rkey, { idx }); // autosave: si sales, retomas en esta palabra
    setProgress((idx) / words.length);
    const w = words[idx];
    let repeated = false;

    const heardBox = el("p", { class: "mt-3 text-sm text-slate-400 min-h-[1.5rem]" }, "");
    const fb = el("div", { class: "mt-3" });

    const nextBtn = el("button", {
      type: "button",
      class: "mt-5 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold " +
        "px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-pink-400",
      onclick: () => { stopVoice(); idx++; renderWord(); },
    }, idx === words.length - 1 ? "Terminar clase \u2192" : "Siguiente palabra \u2192");

    // --- Repetir con microfono (una toma) --------------------------------
    function repeatMic() {
      if (listening) { dictation?.stop(); return; }
      heardBox.textContent = "";
      say(w.clean); // oye el modelo antes de repetir
      dictation = createDictation({
        lang: "en-US",
        onStart: () => { listening = true; repeatBtn.classList.add("animate-pulse"); repeatBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
        onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
        onEnd: (finalText) => {
          listening = false; repeatBtn.classList.remove("animate-pulse"); repeatBtn.lastChild.textContent = "Repetir palabra";
          if (finalText) {
            heardBox.textContent = "T\u00fa dijiste: \u201c" + finalText + "\u201d";
            const { node } = coachView(w.clean, finalText);
            fb.replaceChildren(node);
          } else {
            heardBox.textContent = "No te escuch\u00e9. Toca y repite la palabra.";
          }
          repeated = true;
        },
        onError: () => {
          listening = false; repeatBtn.classList.remove("animate-pulse"); repeatBtn.lastChild.textContent = "Repetir palabra";
          heardBox.textContent = "No pude usar el micr\u00f3fono (\u00bfpermiso denegado?).";
        },
      });
      setTimeout(() => dictation?.start(), 800);
    }

    const repeatBtn = supported
      ? btn("Repetir palabra", ICONS.mic,
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", repeatMic)
      : btn("La dije en voz alta", ICONS.check,
          "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-110", () => {
            playCorrect();
            fb.replaceChildren(el("div", { class: "rounded-xl px-4 py-3 text-sm bg-emerald-500/15 border border-emerald-500/40 text-emerald-200" },
              el("p", { class: "font-semibold" }, "\u00a1Bien! Repetir en voz alta fija la pronunciaci\u00f3n.")));
            repeated = true;
          });

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Palabra " + (idx + 1) + " de " + words.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-center" },
        el("p", { class: "text-3xl font-black text-slate-100 tracking-tight" }, w.clean),
        el("p", { class: "mt-1 text-lg text-pink-300 font-semibold" }, w.translation),
        el("div", { class: "mt-3 flex flex-wrap gap-2 justify-center" },
          btn("Escuchar", ICONS.sound,
            "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(w.clean)),
          btn("Lento", ICONS.clock,
            "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(w.clean, 0.55))),
        w.example ? el("div", { class: "mt-4 pt-3 border-t border-white/10" },
          el("p", { class: "text-slate-200 italic" }, "\u201c" + w.example + "\u201d"),
          el("div", { class: "mt-2 flex justify-center" },
            btn("Escuchar ejemplo", ICONS.sound,
              "text-sm border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10", () => say(w.example, 0.9)))) : null),
      el("p", { class: "mt-4 text-sm text-slate-400 text-center" },
        "Ahora rep\u00edtela como " + name + " \u00b7 imita el sonido."),
      el("div", { class: "mt-2 flex justify-center" }, repeatBtn),
      supported ? null : el("p", { class: "mt-2 text-xs text-amber-300 text-center" },
        "Tu navegador no tiene micr\u00f3fono. Usa Chrome (PC/Android) para que califique tu pronunciaci\u00f3n."),
      heardBox, fb, nextBtn);

    // Al mostrar la palabra, la dice sola (input inmediato).
    setTimeout(() => say(w.clean), 300);
  }

  // --- FIN de la clase -> a practicar -----------------------------------
  function renderDone() {
    clearProgress(rkey);
    setProgress(1);
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, "\u00a1Terminamos la clase!"),
      el("p", { class: "mt-2 text-slate-300 max-w-sm mx-auto" },
        "Ya escuchaste y repetiste las " + words.length + " palabras. " +
        "Ahora vamos a FIJARLAS con la escalera de pr\u00e1ctica."),
      el("button", {
        class: "mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-pink-400",
        onclick: goPractice,
      }, "Practicar lo aprendido \u2192"),
      el("button", {
        class: "mt-3 text-sm text-slate-400 hover:text-slate-200 underline",
        onclick: () => { idx = -1; renderIntro(); },
      }, "Repasar la clase otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Clase de vocabulario con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-pink-300" }, "Clase de vocabulario \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escucha y repite \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!words.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad a\u00fan no tiene vocabulario para ense\u00f1ar."));
  } else {
    const saved = loadProgress(rkey);
    if (saved && saved.idx > 0 && saved.idx < words.length) {
      stage.replaceChildren(resumeCard({
        step: saved.idx + 1, total: words.length, accent: "pink",
        onResume: () => { idx = saved.idx; renderWord(); },
        onRestart: () => { clearProgress(rkey); idx = -1; renderIntro(); },
      }));
    } else {
      renderIntro();
    }
  }
}
