/**
 * features/conversation.js — Conversacion REAL con la IA (por unidad/tema).
 *
 * Abre un modal donde Bymax hace de companero de charla en INGLES, guiado por el
 * TEMA de la unidad (ej. "Making decisions", B1) y el NIVEL MCER del alumno.
 * Inmersion real con ayuda en espanol si el alumno se traba. Reutiliza el mismo
 * Cloudflare Worker (endpoint de chat) en modo "conversation" y la MEMORIA de
 * conversacion (se mandan los turnos previos).
 *
 * Sin dependencias raras: fetch nativo. La key vive en el Worker, no aqui.
 */
import { el } from "../ui/dom.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { speakBilingual, robotChirp } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import { ICONS } from "../ui/icons.js";
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";

/** Burbuja de mensaje (alumno o Bymax). */
function bubble(text, who) {
  const mine = who === "me";
  return el("div", { class: "flex " + (mine ? "justify-end" : "justify-start") },
    el("div", {
      class: "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line " +
        (mine
          ? "bg-emerald-500/25 border border-emerald-500/40 text-emerald-50 rounded-br-sm"
          : "bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-sm"),
    }, text));
}

/**
 * Abre la conversacion con la IA para una unidad.
 * @param {object} unit - unidad del curso { title, subtitle, level }
 */
export function openConversation(unit) {
  const name = robotName();
  const topic = unit?.title || "general";
  const level = unit?.level || "B1";
  const close = () => { dictation?.abort(); stopAudio(); overlay.remove(); };
  // Corta cualquier voz en curso (nube + navegador) al cerrar.
  function stopAudio() {
    cancelCloud();
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }
  robotChirp();

  // MEMORIA: turnos previos { role:"user"|"model", text }. Cap 10 (5 intercambios).
  const history = [];
  const MAX_TURNS = 10;
  let busy = false;

  const log = el("div", { class: "flex flex-col gap-2.5 overflow-y-auto px-1 py-2", style: "max-height:48vh" });

  const input = el("input", {
    type: "text", maxlength: "800", autocomplete: "off",
    placeholder: bymaxAiEnabled ? "Type in English (or ask for help)..." : "Bymax IA no esta configurado aun",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 " +
      "focus:outline focus:outline-2 focus:outline-emerald-500 disabled:opacity-50",
  });

  const sendBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "shrink-0 grid place-items-center w-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 " +
      "text-white text-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50",
    "aria-label": "Enviar",
  }, "\u27A4");

  function push(text, who) {
    log.append(bubble(text, who));
    log.scrollTop = log.scrollHeight;
  }

  /** Muestra la respuesta del bot con boton de audio (voz inglesa). */
  function pushBot(text) {
    const row = el("div", { class: "flex items-start gap-2 justify-start" },
      bubble(text, "bot"),
      el("button", {
        type: "button",
        class: "shrink-0 mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-emerald-300 hover:bg-emerald-500/20",
        "aria-label": "Escuchar respuesta", title: "Escuchar",
        onclick: () => speakBilingual(text), html: ICONS.sound,
      }));
    log.append(row);
    log.scrollTop = log.scrollHeight;
    // La IA suele hablar en ingles, pero la ayuda va en espanol con ejemplos en
    // ingles entre comillas -> speakBilingual da a cada frase su voz correcta.
    speakBilingual(text);
  }

  /**
   * Envia un turno al Worker en modo conversacion.
   * @param {string} q - texto del alumno ("[BEGIN]" para arrancar)
   * @param {boolean} show - si se pinta la burbuja del alumno
   */
  async function send(q, show) {
    if (!q || busy) return;
    if (show) push(q, "me");
    busy = true;
    sendBtn.disabled = true;
    const thinking = bubble(name + " is thinking...", "bot");
    log.append(thinking);
    log.scrollTop = log.scrollHeight;

    try {
      const res = await fetch(BYMAX_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "conversation", topic, level,
          question: q, history: history.slice(-MAX_TURNS),
        }),
      });
      const data = await res.json().catch(() => ({}));
      thinking.remove();
      if (!res.ok || !data.answer) {
        const why = [data.error, data.detail].filter(Boolean).join(" | ");
        push(why ? ("\u26A0\uFE0F " + why) : "Ups, no pude responder ahora. Intenta de nuevo.", "bot");
      } else {
        pushBot(data.answer);
        // Guardamos el intercambio (el "[BEGIN]" no ensucia el hilo visible,
        // pero SI viaja en el historial para que la IA recuerde que ya arranco).
        history.push({ role: "user", text: q }, { role: "model", text: data.answer });
        if (history.length > MAX_TURNS) history.splice(0, history.length - MAX_TURNS);
      }
    } catch (err) {
      thinking.remove();
      // No mentimos con "revisa tu internet": si el fetch falla suele ser el
      // Worker (caido, sin CORS o cuota agotada). Mostramos la pista real.
      const hint = String(err && err.message ? err.message : err);
      push("\u26A0\uFE0F No pude contactar a Bymax IA (" + hint + "). " +
        "Puede ser el servidor de IA, no tu internet. Intenta de nuevo en un momento.", "bot");
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  const ask = () => {
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    send(q, true);
  };
  sendBtn.onclick = ask;
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") ask(); });

  // --- MICROFONO (speech-to-text): habla en ingles y se transcribe ---------
  const TYPE_PH = bymaxAiEnabled ? "Type in English (or ask for help)..." : "Bymax IA no esta configurado aun";
  const MIC_IDLE = "shrink-0 grid place-items-center w-12 rounded-xl bg-slate-800 border border-slate-700 " +
    "text-emerald-300 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50";
  const MIC_LIVE = "shrink-0 grid place-items-center w-12 rounded-xl bg-red-500 text-white " +
    "animate-pulse focus:outline focus:outline-2 focus:outline-red-300";
  let listening = false;
  let dictation = null;
  const micBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: MIC_IDLE, "aria-label": "Hablar (microfono)", title: "Hablar", html: ICONS.mic,
  });

  function setMic(on) {
    listening = on;
    micBtn.className = on ? MIC_LIVE : MIC_IDLE;
    micBtn.setAttribute("aria-label", on ? "Detener microfono" : "Hablar (microfono)");
    micBtn.innerHTML = on ? ICONS.micOff : ICONS.mic;
    input.placeholder = on ? "Escuchando... habla en ingles" : TYPE_PH;
  }

  function startMic() {
    if (busy) return;
    stopAudio(); // que el microfono NO capture la voz de Bymax
    if (!dictation) {
      dictation = createDictation({
        lang: "en-US",
        onStart: () => setMic(true),
        onInterim: (t) => { input.value = t; },
        onFinal: (t) => { input.value = t; },
        onEnd: (finalText) => {
          setMic(false);
          const q = (finalText || input.value).trim();
          if (q) { input.value = ""; send(q, true); }  // envia solo al terminar de hablar
        },
        onError: (code) => {
          setMic(false);
          if (code === "not-allowed" || code === "service-not-allowed") {
            push("No pude usar el microfono. Da permiso desde el candado de la barra de direcciones y vuelve a intentar.", "bot");
          }
        },
      });
    }
    dictation.start();
  }

  micBtn.onclick = () => {
    if (!bymaxAiEnabled) return;
    if (listening) dictation?.stop();
    else startMic();
  };

  // Boton de ayuda rapida: pide una mano en espanol sin escribir.
  const helpBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 " +
      "hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-emerald-400 disabled:opacity-50",
    onclick: () => send("I'm stuck. Can you help me in Spanish and give me an example answer?", true),
  }, "Ayuda (en espanol)");

  // Arranque: la IA saluda y hace la primera pregunta (no mostramos "[BEGIN]").
  if (bymaxAiEnabled) {
    send("[BEGIN]", false);
  } else {
    push("La conversacion con IA todavia no esta activada. Cuando el administrador conecte el Worker (ver carpeta /worker), podras practicar aqui.", "bot");
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col",
    role: "dialog", "aria-label": "Conversacion con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      robotAvatar("md"),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-emerald-300" }, "Conversation \u00b7 " + topic),
        el("p", { class: "text-xs text-slate-400" }, "Practica hablando en ingles \u00b7 nivel " + level)),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),

    el("div", { class: "mt-3 border-t border-slate-800 pt-2" }, log),

    el("div", { class: "mt-2 flex justify-end" }, helpBtn),
    el("div", { class: "mt-2 flex gap-2" }, ...(speechSupported() ? [micBtn] : []), input, sendBtn));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  if (bymaxAiEnabled) input.focus();
}
