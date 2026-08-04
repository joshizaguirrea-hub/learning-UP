/**
 * features/voice-call.js — "Llamada con Bymax": conversacion por VOZ manos libres.
 *
 * Como una llamada: el habla, tu contestas hablando, y el ciclo sigue solo.
 * Inmersion total en ingles. Reusa askBymax (Worker), createDictation
 * (voz->texto) y speakBilingual con onDone (texto->voz) para encadenar turnos.
 *
 * Desde la PRINCIPAL el alumno ELIGE el tema (escribe, toma una sugerencia o deja
 * que Bymax le recomiende). Con {title} fijo (p.ej. desde una unidad) arranca
 * directo sin selector.
 */
import { el } from "../ui/dom.js";
import { robotAvatar, teacherName } from "../ui/robot.js";
import { bymaxEmote } from "../ui/avatars.js";
import { speakBilingual } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";
import { buildFeedbackPrompt, parseFeedback } from "../core/feedback.js";
import { buildFeedbackDashboard } from "./feedback-dashboard.js";
import { recordSpeakingScore, getSpeakingScore } from "../core/speaking-score.js";

// Temas sugeridos (en ingles: la charla es en ingles). Bymax puede recomendar uno.
const TOPIC_IDEAS = [
  "Travel & adventures", "Food & cooking", "Movies & series", "Music",
  "Technology & gadgets", "Sports", "Dreams & goals", "Your weekend",
  "Hobbies", "Family & friends", "A funny story", "Your favorite place",
];

/**
 * @param {object} [opts]
 * @param {string} [opts.title] - tema fijo (si viene, no muestra selector)
 * @param {string} [opts.level] - nivel MCER del alumno
 * @param {boolean} [opts.chooseTopic] - forzar selector de tema
 * @param {string} [opts.mode] - modo IA: "conversation" (def) o "roleplay"
 * @param {string} [opts.label] - palabra para el titulo (def "Llamada")
 * @param {string} [opts.userId] - para guardar el Speaking Score y el feedback
 */
export function openVoiceCall(opts = {}) {
  const name = teacherName("speaking");
  const level = opts.level || "B1";
  const userId = opts.userId || "anon";
  const fixedTopic = opts.title;
  const chooseTopic = opts.chooseTopic || !fixedTopic;
  const mode = opts.mode || "conversation";
  const callWord = opts.label || "Llamada";
  const targetLang = opts.targetLang || "en"; // idioma META (en | pt...)

  let ended = false;
  let dictation = null;
  let paused = false;

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { ended = true; dictation?.abort(); stopAudio(); overlay.remove(); };

  // Contenedor de la tarjeta: primero el selector (o directo la llamada).
  const body = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto" });
  const heading = el("p", { class: "font-bold text-emerald-300" }, callWord + " con " + name);

  const card = el("div", {
    class: "robot-pop max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-center flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": callWord + " con " + name, "aria-modal": "true",
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

  if (chooseTopic) renderTopicPicker();
  else startCall(fixedTopic);

  // --- Paso 1: elegir tema ---------------------------------------------------
  function renderTopicPicker() {
    heading.textContent = "\u00bfDe qu\u00e9 quieres hablar?";
    const input = el("input", {
      type: "text", maxlength: "60",
      class: "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 " +
        "placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-emerald-400",
      placeholder: "Escribe un tema... (viajes, comida, tu fin de semana)",
      "aria-label": "Tema de la conversacion",
    });
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") begin(); });

    const chips = el("div", { class: "mt-3 flex flex-wrap gap-2 justify-center" },
      ...TOPIC_IDEAS.slice(0, 8).map((t) => el("button", {
        type: "button",
        class: "text-sm px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/25 focus:outline focus:outline-2 focus:outline-emerald-400",
        onclick: () => { input.value = t; input.focus(); },
      }, t)));

    const recommend = el("button", {
      type: "button",
      class: "mt-4 w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
      onclick: () => {
        const pick = TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];
        input.value = pick;
        input.focus();
      },
    }, "\uD83C\uDFB2 " + name + " me recomienda un tema");

    const startBtn = el("button", {
      type: "button",
      class: "mt-3 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: begin,
    }, "Empezar llamada \u2192");

    function begin() {
      const topic = (input.value || "").trim() || TOPIC_IDEAS[Math.floor(Math.random() * TOPIC_IDEAS.length)];
      startCall(topic);
    }

    if (!bymaxAiEnabled) {
      body.replaceChildren(el("p", { class: "text-slate-300 text-sm py-6" },
        "La llamada necesita a " + name + " IA activo (Worker). Vuelve pronto."));
      return;
    }

    body.replaceChildren(
      el("p", { class: "text-sm text-slate-400 mb-3" }, "T\u00fa eliges. Bymax te habla en ingl\u00e9s de lo que quieras practicar."),
      input, chips, recommend, startBtn);
    setTimeout(() => input.focus(), 50);
  }

  // --- Paso 2: la llamada ----------------------------------------------------
  function startCall(topic) {
    const history = [];
    const allTurns = []; // transcripcion completa (para evaluar al final)
    const MAX = 10;

    heading.textContent = callWord + " \u00b7 " + topic;

    const status = el("p", { class: "mt-4 text-sm text-slate-300 min-h-[1.25rem]", role: "status" }, "");
    const heard = el("p", { class: "mt-1 text-xs text-slate-500 italic min-h-[1rem]" }, "");
    const ring = el("div", { class: "absolute -inset-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 blur-md transition-opacity", "aria-hidden": "true" });
    const avatar = el("div", { class: "relative grid place-items-center" }, ring, el("div", { class: "relative" }, robotAvatar("lg", "speaking")));

    function setState(txt, glow) { status.textContent = txt; ring.style.opacity = glow ? "0.7" : "0"; }

    async function turn(q) {
      if (ended) return;
      setState(name + " esta pensando...", false);
      bymaxEmote("think");
      const { answer, error } = await askBymax({ mode, topic, level, question: q, history: history.slice(-MAX), targetLang });
      if (ended) return;
      if (error || !answer) { setState("\u26a0\ufe0f " + (error || "No pude responder."), false); showRetry(); return; }
      history.push({ role: "user", text: q }, { role: "model", text: answer });
      if (history.length > MAX) history.splice(0, history.length - MAX);
      if (q !== "[BEGIN]") allTurns.push({ role: "user", text: q });
      allTurns.push({ role: "model", text: answer });
      heard.textContent = "";
      setState(name + " habla...", true);
      bymaxEmote("happy");
      speakBilingual(answer, () => { if (!ended && !paused) listen(); });
    }

    // Llamada EN VIVO manos libres: tras hablar el bot, se escucha sola y vuelve
    // a escuchar en cada pausa. Solo se detiene si falta permiso del microfono.
    let micBlocked = false;
    function restartListen(delay) {
      if (ended || paused || micBlocked) return;
      setTimeout(() => { if (!ended && !paused && !micBlocked) listen(); }, delay);
    }

    function listen() {
      if (ended || paused) return;
      if (!speechSupported()) { setState("Tu navegador no permite hablar. Usa el chat de texto.", false); return; }
      stopAudio();
      if (!dictation) {
        dictation = createDictation({
          lang: "en-US",
          onStart: () => setState("Te escucho... habla en ingl\u00e9s", true),
          onInterim: (t) => { heard.textContent = t; },
          onFinal: (t) => { heard.textContent = t; },
          onEnd: (finalText) => {
            const q = (finalText || "").trim();
            if (ended || paused) return;
            // Si dijo algo, contesta; si hubo silencio, SIGUE escuchando sola.
            if (q) turn(q);
            else { setState(name + " te escucha... (sigue hablando)", true); restartListen(400); }
          },
          onError: (code) => {
            if (ended || paused) return;
            if (code === "not-allowed" || code === "service-not-allowed") {
              // Unico caso que corta el manos-libres: falta permiso del microfono.
              micBlocked = true;
              setState("Da permiso al micr\u00f3fono (candado en la barra) y toca \u201cReactivar\u201d.", false);
              talkBtn.textContent = "Reactivar micr\u00f3fono";
              talkBtn.classList.remove("hidden");
            } else {
              // no-speech, aborted, network... reintenta sola sin molestar al alumno.
              restartListen(600);
            }
          },
        });
      }
      try { dictation.start(); } catch { /* ignore */ }
    }

    function showRetry() { talkBtn.textContent = "Reintentar"; talkBtn.classList.remove("hidden"); }

    const talkBtn = el("button", {
      type: "button",
      class: "hidden px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => { micBlocked = false; talkBtn.classList.add("hidden"); if (history.length) listen(); else turn("[BEGIN]"); },
    }, "Hablar");

    const pauseBtn = el("button", {
      type: "button",
      class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
      onclick: () => {
        paused = !paused;
        pauseBtn.textContent = paused ? "Reanudar" : "Pausar";
        if (paused) { dictation?.abort(); stopAudio(); setState("En pausa", false); }
        else listen();
      },
    }, "Pausar");

    const endBtn = el("button", {
      type: "button",
      class: "px-5 py-3 rounded-xl bg-red-500/90 text-white font-semibold hover:bg-red-500 focus:outline focus:outline-2 focus:outline-red-300",
      onclick: finishCall,
    }, "Terminar y ver feedback");

    // -- Feedback al colgar: un profe evalua gramatica, vocabulario, etc. --------
    async function finishCall() {
      const spoke = allTurns.some((t) => t.role === "user");
      if (!spoke) { close(); return; } // no hablaste nada -> nada que evaluar
      ended = true; dictation?.abort(); stopAudio();
      renderFeedbackLoading();
      const { answer, error } = await askBymax({
        mode: "interview", topic, level, targetLang,
        question: buildFeedbackPrompt("speaking"),
        history: allTurns.slice(-24),
      });
      if (error || !answer) {
        body.replaceChildren(el("div", { class: "text-center py-8" },
          el("p", { class: "text-amber-300 text-sm" }, "\u26a0\ufe0f No pude generar el feedback: " + (error || "")),
          el("button", {
            class: "mt-4 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10",
            onclick: close,
          }, "Cerrar")));
        return;
      }
      const parsed = parseFeedback(answer);
      const stats = recordSpeakingScore(userId, parsed.score);
      body.replaceChildren(buildFeedbackDashboard({
        parsed,
        title: "Tu feedback de la llamada",
        stats,
        onRetry: () => { ended = false; if (fixedTopic) startCall(fixedTopic); else renderTopicPicker(); },
        onClose: close,
        retryLabel: "Otra llamada",
      }));
    }

    function renderFeedbackLoading() {
      body.replaceChildren(el("div", { class: "text-center py-10" },
        el("div", { class: "w-10 h-10 mx-auto border-4 border-slate-700 border-t-emerald-400 rounded-full", style: "animation: spin 1s linear infinite" }),
        el("p", { class: "mt-4 text-slate-300" }, name + " est\u00e1 evaluando tu conversaci\u00f3n...")));
    }

    body.replaceChildren(
      el("div", { class: "mt-6 flex justify-center" }, avatar),
      status, heard,
      el("div", { class: "mt-6 flex items-center justify-center gap-2 flex-wrap" }, talkBtn, pauseBtn, endBtn));

    if (!bymaxAiEnabled) {
      setState("La llamada necesita a " + name + " IA activo (Worker). Vuelve pronto.", false);
      talkBtn.classList.add("hidden"); pauseBtn.classList.add("hidden");
    } else if (!speechSupported()) {
      setState("Tu navegador no permite reconocer voz. Prueba Chrome en escritorio o el chat de texto.", false);
      talkBtn.classList.add("hidden"); pauseBtn.classList.add("hidden");
    } else {
      setState(name + " te saluda... la llamada es EN VIVO, solo habla \uD83C\uDF99\uFE0F", false);
      turn("[BEGIN]");
    }
  }
}
