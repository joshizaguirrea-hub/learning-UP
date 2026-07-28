/**
 * features/reading-aloud.js — Lectura en voz alta con feedback de Bymax.
 *
 * El POP de Reading del hub abre esto: el alumno VE el texto de la unidad frase
 * por frase, lo ESCUCHA (modelo en ingles), lo LEE al microfono y Bymax le
 * CALIFICA la pronunciacion (palabra por palabra) y le da feedback hablado en
 * espanol. Reutiliza scoreDetail() de speaking.js (DRY) y el motor de voz/mic.
 */
import { el } from "../ui/dom.js";
import { normalize } from "../core/activities.js";
import { speakMono, speakRobot } from "../ui/speech.js";
import { unitTts, unitMic } from "../data/languages.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { bymaxMascot, setBymaxTalking } from "../ui/bymax-mascot.js";
import { bymaxEmote } from "../ui/avatars.js";
import { completeLesson } from "../services/course.js";
import { robotName } from "../ui/robot.js";
import { scoreDetail } from "./speaking.js";
import { lessonForSkill } from "./skill-class.js";

const PASS = 0.6; // proporcion de palabras acertadas para aprobar una frase

/** Divide el texto de lectura en frases limpias (quita encabezados y marcas A:/B:). */
function sentencesFrom(text) {
  return String(text || "")
    .split(/\n+/)
    .filter((line) => !/^\s*TEXT\s*\d/i.test(line)) // fuera "TEXT 1 - ..."
    .join(" ")
    .replace(/\b[A-Z]:\s*/g, " ")                    // fuera marcas de dialogo "A:" "B:"
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && /[a-z]/i.test(s))
    .slice(0, 12);
}

/**
 * Abre la lectura en voz alta de la unidad.
 * @param {object} unit - unidad { title, level, lessons }
 * @param {object} [opts] - { userId, progressId, onComplete } para guardar el check
 */
export function openReadingAloud(unit, opts = {}) {
  const { userId, progressId, onComplete } = opts;
  const tts = unitTts(unit); const mic = unitMic(unit); // idioma META de la unidad
  const lesson = lessonForSkill(unit, "reading");
  const sentences = sentencesFrom(lesson?.content?.reading);
  const supported = speechSupported();
  const name = robotName();
  let idx = 0;
  let passed = 0;
  let dictation = null;
  let listening = false;

  function stopAudio() { cancelCloud(); setBymaxTalking(false); }
  const close = () => { dictation?.abort(); stopAudio(); overlay.remove(); };

  // Bymax dice un feedback hablado en espanol (sin romper la fluidez: es 1 idioma).
  function bymaxSay(text) {
    setBymaxTalking(true);
    speakRobot(text, "es-MX");
    setTimeout(() => setBymaxTalking(false), Math.min(9000, Math.max(1600, text.length * 60)));
  }

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto" });

  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all", style: "width:0%" }));
  const setProgress = () => {
    progress.firstChild.style.width = Math.round((idx / sentences.length) * 100) + "%";
  };

  function renderSentence() {
    setProgress();
    if (idx >= sentences.length) return renderDone();
    const target = sentences[idx];

    const phraseText = el("p", { class: "text-lg sm:text-xl font-semibold text-slate-100 leading-relaxed" }, target);
    const heardBox = el("p", { class: "mt-3 text-sm text-slate-400 min-h-[1.5rem]" }, "");
    const fb = el("div", { class: "mt-3" });

    const listenBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-4 py-2.5 " +
        "rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-emerald-400 transition",
      onclick: () => speakMono(target, tts),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar modelo");

    const micBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white " +
        "font-semibold px-5 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300 transition",
    }, el("span", { class: "w-5 h-5", html: ICONS.mic || ICONS.sound }), "Leer en voz alta");

    const nextBtn = el("button", {
      type: "button",
      class: "hidden mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold " +
        "px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; renderSentence(); },
    }, idx === sentences.length - 1 ? "Terminar" : "Siguiente frase ->");

    function grade(heard) {
      const { score: s, marks } = scoreDetail(target, heard);
      const ok = s >= PASS;
      if (ok) passed++;
      ok ? playCorrect() : playWrong();
      bymaxEmote(ok ? "happy" : "sad");

      const colored = el("p", { class: "mt-2 leading-relaxed" }, ...marks.map((m) => el("span", {
        class: (m.hit ? "text-emerald-300" : "text-amber-300 underline decoration-amber-400/70") + " mr-1",
      }, m.word + " ")));

      const missed = marks.filter((m) => !m.hit && normalize(m.word));
      const drill = missed.length ? el("div", { class: "mt-2" },
        el("p", { class: "text-xs opacity-90" }, "Toca para o\u00edrlas lento:"),
        el("div", { class: "mt-1 flex flex-wrap gap-1.5" }, ...missed.slice(0, 6).map((m) => el("button", {
          type: "button",
          class: "text-xs px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-100 hover:bg-amber-500/30",
          onclick: () => speakMono(m.word, tts, { rate: 0.6 }),
        }, m.word)))) : null;

      fb.replaceChildren(el("div", {
        class: "rounded-xl px-4 py-3 text-sm " + (ok
          ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
          : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
      },
        el("p", { class: "font-semibold" }, ok ? "\u00a1Muy bien! " + Math.round(s * 100) + "% de pronunciacion" : "Casi... " + Math.round(s * 100) + "% de pronunciacion"),
        colored,
        drill || el("p", { class: "mt-1 opacity-90" }, "Se te entendio muy claro.")));
      nextBtn.classList.remove("hidden");

      // Feedback HABLADO de Bymax en espanol (coincide con el texto -> sin mezcla).
      const words = missed.slice(0, 3).map((m) => m.word).join(", ");
      bymaxSay(ok
        ? "Muy bien, sonaste natural."
        : (words ? "Casi. Cuida la pronunciacion de: " + words + "." : "Casi. Intenta leerlo un poco mas claro."));
    }

    if (supported) {
      micBtn.onclick = () => {
        if (listening) { dictation?.stop(); return; }
        stopAudio(); // que el mic no capture la voz de Bymax
        heardBox.textContent = "";
        dictation = createDictation({
          lang: mic,
          onStart: () => { listening = true; micBtn.classList.add("animate-pulse"); micBtn.lastChild.textContent = "Escuchando... (toca para parar)"; },
          onInterim: (t) => { heardBox.textContent = "\u201c" + t + "\u201d"; },
          onEnd: (finalText) => {
            listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Leer en voz alta";
            if (finalText) { heardBox.textContent = "Le\u00edste: \u201c" + finalText + "\u201d"; grade(finalText); }
            else heardBox.textContent = "No te escuche. Intenta de nuevo.";
          },
          onError: () => { listening = false; micBtn.classList.remove("animate-pulse"); micBtn.lastChild.textContent = "Leer en voz alta"; heardBox.textContent = "No pude usar el microfono (permiso denegado?)."; },
        });
        dictation.start();
      };
    }

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, "Frase " + (idx + 1) + " de " + sentences.length),
      el("div", { class: "mt-2 rounded-2xl bg-white/5 border border-white/10 p-4" }, phraseText, heardBox),
      el("div", { class: "mt-4 flex flex-wrap gap-2" }, listenBtn, ...(supported ? [micBtn] : [])),
      supported ? null : el("p", { class: "mt-3 text-sm text-amber-300" }, "Tu navegador no soporta microfono. Usa Chrome en PC o Android. Igual puedes escuchar el modelo y leer en voz alta."),
      fb, nextBtn);
    // Escucha el modelo automaticamente al mostrar la frase.
    setTimeout(() => speakMono(target, tts), 300);
  }

  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = Math.round((passed / Math.max(1, sentences.length)) * 100);
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);
    bymaxSay(pct >= 60 ? "Excelente lectura, lo hiciste muy bien." : "Buen esfuerzo, sigue practicando y mejoraras.");
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, "\u00a1Lectura terminada!"),
      el("p", { class: "mt-2 text-slate-300" }, "Leiste bien " + passed + " de " + sentences.length + " frases (" + pct + "%)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; passed = 0; renderSentence(); },
      }, "Leer otra vez")));
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Lectura en voz alta con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-emerald-300" }, "Reading \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, name + " te califica la pronunciacion \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!sentences.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad aun no tiene un texto de lectura para practicar."));
  } else {
    renderSentence();
  }
}
