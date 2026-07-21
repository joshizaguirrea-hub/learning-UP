/**
 * features/interview.js — ENTREVISTA DE TRABAJO con IA (el diferenciador estrella).
 *
 * Bymax hace de RECLUTADOR experimentado: el usuario detalla el puesto y la
 * empresa, y la IA conduce una entrevista SERIA en ingles para prepararlo.
 * Al terminar, entrega un FEEDBACK en espanol con puntaje (Speaking Score),
 * fortalezas, areas de mejora y frases modelo.
 *
 * Reutiliza el motor de voz (askBymax + createDictation + speakBilingual) y el
 * motor anti-spanglish, igual que la Llamada con Bymax. Soporta voz y texto.
 */
import { el } from "../ui/dom.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { bymaxEmote } from "../ui/avatars.js";
import { speakBilingual } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";
import { ICONS } from "../ui/icons.js";
import { recordSpeakingScore, scoreLabel } from "../core/speaking-score.js";

const MAX_TURNS = 12; // memoria: ultimos turnos que viajan al Worker

/**
 * Abre el simulador de entrevista.
 * @param {object} [opts]
 * @param {string} [opts.level] - nivel MCER (def B1)
 * @param {string} [opts.userId] - para guardar el Speaking Score
 */
export function openInterview(opts = {}) {
  const name = robotName();
  const level = opts.level || "B1";
  const userId = opts.userId || "anon";

  let ended = false;
  let dictation = null;

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { ended = true; dictation?.abort(); stopAudio(); overlay.remove(); };

  const heading = el("p", { class: "font-bold text-sky-300" }, "Entrevista con " + name);
  const body = el("div", { class: "mt-4" });

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[92vh]",
    role: "dialog", "aria-label": "Entrevista de trabajo con Bymax", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-700 grid place-items-center text-white", html: ICONS.briefcase || ICONS.teachers || ICONS.chat }),
      el("div", { class: "flex-1 min-w-0" },
        heading,
        el("p", { class: "text-xs text-slate-400" }, "Simulador de entrevista laboral \u00b7 nivel " + level)),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  if (!bymaxAiEnabled) {
    body.replaceChildren(el("p", { class: "text-slate-300 text-sm py-6 text-center" },
      "La entrevista necesita a " + name + " IA activo (Worker). Vuelve pronto."));
    return;
  }

  renderSetup();

  // ---- Paso 1: configurar la entrevista ------------------------------------
  function renderSetup() {
    const input = (id, ph, req) => el("input", {
      id, type: "text", maxlength: "80", autocomplete: "off",
      class: "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 " +
        "placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-sky-400",
      placeholder: ph, ...(req ? { required: "" } : {}),
    });
    const roleInput = input("iv-role", "Puesto (ej. Asistente administrativo)", true);
    const companyInput = input("iv-company", "Empresa (opcional, ej. Amazon)");

    const canVoice = speechSupported();
    let modeVoice = canVoice;
    const voiceBtn = choicePill("\uD83C\uDF99\ufe0f Hablar (voz)", modeVoice, () => { modeVoice = true; syncMode(); });
    const textBtn = choicePill("\u2328\ufe0f Escribir (texto)", !modeVoice, () => { modeVoice = false; syncMode(); });
    function syncMode() {
      voiceBtn.dataset.on = String(modeVoice);
      textBtn.dataset.on = String(!modeVoice);
      paintPills([voiceBtn, textBtn]);
    }

    const err = el("p", { class: "text-rose-400 text-sm mt-1 hidden" }, "Escribe al menos el puesto.");

    const startBtn = el("button", {
      type: "button",
      class: "mt-5 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
      onclick: () => {
        const role = roleInput.value.trim();
        if (!role) { err.classList.remove("hidden"); roleInput.focus(); return; }
        startInterview(role, companyInput.value.trim(), modeVoice && canVoice);
      },
    }, "Comenzar entrevista \u2192");

    roleInput.addEventListener("keydown", (e) => { if (e.key === "Enter") companyInput.focus(); });

    body.replaceChildren(
      el("p", { class: "text-sm text-slate-400" },
        "Cu\u00e9ntame a qu\u00e9 puesto aspiras. " + name + " har\u00e1 de reclutador y te entrevistar\u00e1 en ingl\u00e9s, en serio, para prepararte."),
      el("label", { class: "block mt-4 text-xs uppercase tracking-wide text-slate-500 mb-1" }, "Puesto"),
      roleInput,
      el("label", { class: "block mt-3 text-xs uppercase tracking-wide text-slate-500 mb-1" }, "Empresa"),
      companyInput,
      err,
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-slate-500 mb-1" }, "\u00bfC\u00f3mo quieres responder?"),
      el("div", { class: "flex gap-2" }, voiceBtn, textBtn),
      canVoice ? null : el("p", { class: "mt-1 text-xs text-amber-300" }, "Tu navegador no permite micr\u00f3fono; usar\u00e1s texto. (Chrome en PC/Android para voz.)"),
      startBtn);
    setTimeout(() => roleInput.focus(), 50);
    syncMode();
  }

  // ---- Paso 2: la entrevista ------------------------------------------------
  function startInterview(role, company, useVoice) {
    const history = [];
    const topic = "Puesto: " + role + (company ? " | Empresa: " + company : "") +
      " | Objetivo: simulacro de entrevista de trabajo real para preparar al candidato.";

    let paused = false;
    let waiting = false; // esperando respuesta de la IA

    const transcript = el("div", {
      class: "mt-1 space-y-3 overflow-y-auto pr-1", style: "max-height: 38vh",
      role: "log", "aria-live": "polite", "aria-label": "Transcripci\u00f3n de la entrevista",
    });
    const status = el("p", { class: "mt-3 text-sm text-slate-300 min-h-[1.25rem]", role: "status" }, "");
    const heard = el("p", { class: "mt-0.5 text-xs text-slate-500 italic min-h-[1rem]" }, "");

    function bubble(text, who) {
      const mine = who === "me";
      return el("div", { class: "flex " + (mine ? "justify-end" : "justify-start") },
        el("div", {
          class: "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed " +
            (mine ? "bg-indigo-600 text-white rounded-br-sm" : "bg-slate-800 text-slate-100 rounded-bl-sm border border-slate-700"),
        }, text));
    }
    function addMsg(text, who) {
      transcript.append(bubble(text, who));
      transcript.scrollTop = transcript.scrollHeight;
    }

    async function turn(q, showMine) {
      if (ended) return;
      if (showMine) addMsg(showMine, "me");
      waiting = true;
      status.textContent = name + " est\u00e1 pensando...";
      bymaxEmote("think");
      const { answer, error } = await askBymax({ mode: "interview", topic, level, question: q, history: history.slice(-MAX_TURNS) });
      waiting = false;
      if (ended) return;
      if (error || !answer) { status.textContent = "\u26a0\ufe0f " + (error || "No pude responder."); return; }
      history.push({ role: "user", text: q }, { role: "model", text: answer });
      if (history.length > MAX_TURNS) history.splice(0, history.length - MAX_TURNS);
      addMsg(answer, "them");
      if (useVoice) {
        status.textContent = name + " habla...";
        bymaxEmote("happy");
        speakBilingual(answer, () => { if (!ended && !paused) listen(); });
      } else {
        status.textContent = "Tu turno: escribe tu respuesta.";
        bymaxEmote("happy");
      }
    }

    // --- Entrada por VOZ ---
    function listen() {
      if (ended || paused || waiting) return;
      stopAudio();
      if (!dictation) {
        dictation = createDictation({
          lang: "en-US",
          onStart: () => { status.textContent = "Te escucho... responde en ingl\u00e9s"; },
          onInterim: (t) => { heard.textContent = t; },
          onFinal: (t) => { heard.textContent = t; },
          onEnd: (finalText) => {
            const q = (finalText || "").trim();
            heard.textContent = "";
            if (ended || paused) return;
            if (q) turn(q, q);
            else status.textContent = "No te escuch\u00e9 bien. Toca \u201cHablar\u201d para intentar.";
          },
          onError: (code) => {
            if (code === "not-allowed" || code === "service-not-allowed") status.textContent = "Da permiso al micr\u00f3fono y toca Hablar.";
            else status.textContent = "Toca \u201cHablar\u201d para responder.";
          },
        });
      }
      try { dictation.start(); } catch { /* ignore */ }
    }

    // --- Controles ---
    const controls = el("div", { class: "mt-4 flex items-center justify-center gap-2 flex-wrap" });

    const finishBtn = el("button", {
      type: "button",
      class: "px-4 py-2.5 rounded-xl bg-amber-500 text-slate-900 font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-amber-300",
      onclick: requestFeedback,
    }, "Terminar y ver feedback");

    const exitBtn = el("button", {
      type: "button",
      class: "px-4 py-2.5 rounded-xl bg-red-500/90 text-white font-semibold hover:bg-red-500 focus:outline focus:outline-2 focus:outline-red-300",
      onclick: close,
    }, "Salir");

    if (useVoice) {
      const talkBtn = el("button", {
        type: "button",
        class: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
        onclick: () => { if (history.length) listen(); },
      }, "\uD83C\uDF99\ufe0f Hablar");
      const pauseBtn = el("button", {
        type: "button",
        class: "px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
        onclick: () => {
          paused = !paused;
          pauseBtn.textContent = paused ? "Reanudar" : "Pausar";
          if (paused) { dictation?.abort(); stopAudio(); status.textContent = "En pausa"; }
          else listen();
        },
      }, "Pausar");
      controls.append(talkBtn, pauseBtn, finishBtn, exitBtn);
    } else {
      const answerInput = el("input", {
        type: "text", maxlength: "400", autocomplete: "off",
        class: "flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 " +
          "placeholder:text-slate-500 focus:outline focus:outline-2 focus:outline-sky-400",
        placeholder: "Escribe tu respuesta en ingl\u00e9s...",
      });
      const sendBtn = el("button", {
        type: "button",
        class: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
        onclick: send,
      }, "Enviar");
      function send() {
        const q = answerInput.value.trim();
        if (!q || waiting) return;
        answerInput.value = "";
        turn(q, q);
      }
      answerInput.addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
      controls.append(
        el("div", { class: "w-full flex gap-2" }, answerInput, sendBtn),
        el("div", { class: "flex gap-2 mt-1" }, finishBtn, exitBtn));
    }

    async function requestFeedback() {
      if (history.length < 2) { status.textContent = "Responde al menos una pregunta antes de terminar."; return; }
      dictation?.abort(); stopAudio(); paused = true;
      renderFeedbackLoading();
      const { answer, error } = await askBymax({ mode: "interview", topic, level, question: "[FEEDBACK]", history: history.slice(-MAX_TURNS) });
      if (ended) return;
      if (error || !answer) { status.textContent = "\u26a0\ufe0f No pude generar el feedback: " + (error || ""); return; }
      renderFeedback(answer, () => startInterview(role, company, useVoice));
    }

    body.replaceChildren(
      el("div", { class: "flex items-center gap-3" },
        el("div", { class: "shrink-0" }, robotAvatar("sm")),
        el("p", { class: "text-xs text-slate-400" }, "Responde como en una entrevista real. Cuando quieras, toca \u201cTerminar y ver feedback\u201d.")),
      transcript, status, heard, controls);

    // Arranca: Bymax saluda y hace la primera pregunta.
    turn("[BEGIN]");
  }

  function renderFeedbackLoading() {
    body.replaceChildren(el("div", { class: "text-center py-10" },
      el("div", { class: "w-10 h-10 mx-auto border-4 border-slate-700 border-t-sky-400 rounded-full", style: "animation: spin 1s linear infinite" }),
      el("p", { class: "mt-4 text-slate-300" }, name + " est\u00e1 evaluando tu entrevista...")));
  }

  // ---- Paso 3: feedback + Speaking Score -----------------------------------
  function renderFeedback(raw, onRetry) {
    const { score, sections } = parseFeedback(raw);
    const info = scoreLabel(score);
    const saved = recordSpeakingScore(userId, score);

    const ring = el("div", {
      class: "relative w-28 h-28 rounded-full grid place-items-center mx-auto",
      style: "background: conic-gradient(#38bdf8 " + (score * 3.6) + "deg, rgba(148,163,184,.2) 0deg)",
    },
      el("div", { class: "w-24 h-24 rounded-full bg-slate-900 grid place-items-center" },
        el("div", { class: "text-center" },
          el("p", { class: "text-3xl font-extrabold text-sky-300 leading-none" }, String(score)),
          el("p", { class: "text-[10px] text-slate-400 uppercase tracking-wide mt-0.5" }, "de 100"))));

    const sectionEls = sections.map((s) =>
      el("div", { class: "mt-3" },
        el("p", { class: "text-xs uppercase tracking-wide text-sky-400 font-semibold" }, s.title),
        el("div", { class: "mt-1 text-sm text-slate-200 whitespace-pre-line" }, s.body)));

    body.replaceChildren(el("div", { class: "overflow-y-auto pr-1", style: "max-height: 74vh" },
      el("div", { class: "text-center" },
        ring,
        el("p", { class: "mt-3 text-lg font-bold text-slate-100" }, info.label),
        el("p", { class: "text-xs text-slate-400 mt-1" },
          "Speaking Score \u00b7 mejor: " + saved.best + " \u00b7 promedio: " + saved.avg + " \u00b7 sesiones: " + saved.sessions)),
      el("div", { class: "mt-5 rounded-2xl bg-slate-800/60 border border-slate-700 p-4" },
        sectionEls.length ? sectionEls : el("p", { class: "text-sm text-slate-200 whitespace-pre-line" }, raw)),
      el("div", { class: "mt-5 flex gap-2" },
        el("button", {
          type: "button",
          class: "flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-sky-300",
          onclick: onRetry,
        }, "Practicar otra vez"),
        el("button", {
          type: "button",
          class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
          onclick: close,
        }, "Cerrar"))));
  }
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

/** Pill de eleccion (voz/texto) con estado on/off por data-on. */
function choicePill(label, on, onClick) {
  const b = el("button", { type: "button", class: "flex-1 px-3 py-2 rounded-xl border text-sm font-semibold transition", onclick: onClick }, label);
  b.dataset.on = String(on);
  return b;
}
function paintPills(pills) {
  pills.forEach((p) => {
    const on = p.dataset.on === "true";
    p.className = "flex-1 px-3 py-2 rounded-xl border text-sm font-semibold transition " +
      (on ? "bg-sky-500/20 border-sky-400 text-sky-200" : "bg-white/5 border-white/15 text-slate-300 hover:bg-white/10");
  });
}

/**
 * Interpreta el feedback del Worker. Extrae PUNTAJE y separa secciones por sus
 * encabezados conocidos. Si el formato cambia, cae a texto plano (score 60).
 * @returns {{score:number, sections:Array<{title,body}>}}
 */
function parseFeedback(text) {
  const raw = String(text || "");
  const m = raw.match(/PUNTAJE:\s*(\d{1,3})/i);
  const score = m ? Math.max(0, Math.min(100, parseInt(m[1], 10))) : 60;

  const HEADERS = [
    { key: "LO QUE HICISTE BIEN", title: "Lo que hiciste bien" },
    { key: "A MEJORAR", title: "A mejorar" },
    { key: "FRASES MODELO", title: "Frases modelo" },
    { key: "CONSEJO FINAL", title: "Consejo final" },
  ];
  const sections = [];
  for (let i = 0; i < HEADERS.length; i++) {
    const start = raw.toUpperCase().indexOf(HEADERS[i].key);
    if (start === -1) continue;
    const from = start + HEADERS[i].key.length;
    // Fin = inicio del siguiente header presente, o fin del texto.
    let end = raw.length;
    for (let j = i + 1; j < HEADERS.length; j++) {
      const nx = raw.toUpperCase().indexOf(HEADERS[j].key, from);
      if (nx !== -1) { end = nx; break; }
    }
    const bodyTxt = raw.slice(from, end).replace(/^[:\s]+/, "").trim();
    if (bodyTxt) sections.push({ title: HEADERS[i].title, body: bodyTxt });
  }
  return { score, sections };
}
