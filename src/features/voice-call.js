/**
 * features/voice-call.js — "Modo Solo Hablar": conversacion por VOZ manos libres.
 *
 * Como una llamada con Bymax: el habla, tu contestas hablando, y el ciclo sigue
 * solo. Inmersion total en ingles. Reusa askBymax (Worker), createDictation
 * (voz->texto) y speakBilingual con onDone (texto->voz) para encadenar turnos.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { bymaxEmote } from "../ui/avatars.js";
import { speakBilingual } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";

export function openVoiceCall(unit) {
  const name = robotName();
  const topic = unit?.title || "everyday life";
  const level = unit?.level || "B1";
  const history = [];
  const MAX = 10;
  let ended = false;
  let dictation = null;
  let paused = false;

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { ended = true; dictation?.abort(); stopAudio(); overlay.remove(); };

  const status = el("p", { class: "mt-4 text-sm text-slate-300 min-h-[1.25rem]", role: "status" }, "");
  const heard = el("p", { class: "mt-1 text-xs text-slate-500 italic min-h-[1rem]" }, "");
  const ring = el("div", { class: "absolute -inset-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 blur-md transition-opacity", "aria-hidden": "true" });
  const avatar = el("div", { class: "relative grid place-items-center" }, ring, el("div", { class: "relative" }, robotAvatar("lg")));

  function setState(txt, glow) {
    status.textContent = txt;
    ring.style.opacity = glow ? "0.7" : "0";
  }

  // --- Ciclo de turnos -------------------------------------------------------
  async function turn(q) {
    if (ended) return;
    setState(name + " esta pensando...", false);
    bymaxEmote("think");
    const { answer, error } = await askBymax({ mode: "conversation", topic, level, question: q, history: history.slice(-MAX) });
    if (ended) return;
    if (error || !answer) { setState("\u26a0\ufe0f " + (error || "No pude responder."), false); showRetry(); return; }
    history.push({ role: "user", text: q }, { role: "model", text: answer });
    if (history.length > MAX) history.splice(0, history.length - MAX);
    heard.textContent = "";
    setState(name + " habla...", true);
    bymaxEmote("happy");
    speakBilingual(answer, () => { if (!ended && !paused) listen(); });
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
          if (q) turn(q);
          else { setState("No te escuch\u00e9 bien. Toca \u201cHablar\u201d para intentar.", false); }
        },
        onError: (code) => {
          if (code === "not-allowed" || code === "service-not-allowed") {
            setState("Da permiso al micr\u00f3fono (candado en la barra) y toca Hablar.", false);
          } else setState("Toca \u201cHablar\u201d para responder.", false);
        },
      });
    }
    try { dictation.start(); } catch { /* ignore */ }
  }

  function showRetry() {
    talkBtn.textContent = "Reintentar";
    talkBtn.classList.remove("hidden");
  }

  // --- Controles -------------------------------------------------------------
  const talkBtn = el("button", {
    type: "button",
    class: "px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
    onclick: () => { if (history.length) listen(); else turn("[BEGIN]"); },
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
    onclick: close,
  }, "Terminar");

  const card = el("div", {
    class: "robot-pop max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-center",
    role: "dialog", "aria-label": "Modo solo hablar", "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      el("p", { class: "font-bold text-emerald-300" }, "Solo Hablar \u00b7 " + topic),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "mt-6 flex justify-center" }, avatar),
    status, heard,
    el("div", { class: "mt-6 flex items-center justify-center gap-2 flex-wrap" }, talkBtn, pauseBtn, endBtn));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!bymaxAiEnabled) {
    setState("El Modo Solo Hablar necesita a Bymax IA activo (Worker). Vuelve pronto.", false);
    talkBtn.classList.add("hidden"); pauseBtn.classList.add("hidden");
  } else if (!speechSupported()) {
    setState("Tu navegador no permite reconocer voz. Prueba Chrome en escritorio o el chat de texto.", false);
    talkBtn.classList.add("hidden"); pauseBtn.classList.add("hidden");
  } else {
    setState("Toca \u201cHablar\u201d o espera: " + name + " te saluda...", false);
    turn("[BEGIN]");
  }
}
