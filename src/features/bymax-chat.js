/**
 * features/bymax-chat.js — Chat de "Bymax con IA".
 *
 * El alumno le escribe CUALQUIER duda de ingles y Bymax responde (en espanol),
 * llamando a un Cloudflare Worker que habla con Gemini (ver /worker). Si el
 * Worker no esta configurado (config/bymax.js), muestra un aviso amable.
 *
 * Sin dependencias raras: fetch nativo. La key vive en el Worker, no aqui.
 */
import { el } from "../ui/dom.js";
import { robotAvatar, robotName } from "../ui/robot.js";
import { speakRobot, robotChirp } from "../ui/speech.js";
import { stripMarkup } from "../ui/richtext.js";
import { ICONS } from "../ui/icons.js";
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";

/** Burbuja de mensaje (alumno o Bymax). */
function bubble(text, who) {
  const mine = who === "me";
  return el("div", { class: "flex " + (mine ? "justify-end" : "justify-start") },
    el("div", {
      class: "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
        (mine
          ? "bg-indigo-500/25 border border-indigo-500/40 text-indigo-50 rounded-br-sm"
          : "bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-sm"),
    }, text));
}

/**
 * Abre el chat de Bymax.
 * @param {object|null} grammar - gramatica de la unidad (da contexto a la IA)
 * @param {string} [lang]
 */
export function openBymaxChat(grammar, lang = "es-MX") {
  const name = robotName();
  const close = () => overlay.remove();
  robotChirp();

  const context = grammar
    ? [stripMarkup(grammar.title), stripMarkup(grammar.form || "")].filter(Boolean).join(" - ")
    : "";

  const log = el("div", { class: "flex flex-col gap-2.5 overflow-y-auto px-1 py-2", style: "max-height:48vh" });

  const input = el("input", {
    type: "text", maxlength: "800",
    placeholder: bymaxAiEnabled ? "Escribe tu duda de ingles..." : "Bymax IA no esta configurado aun",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 " +
      "focus:outline focus:outline-2 focus:outline-indigo-500 disabled:opacity-50",
  });

  const sendBtn = el("button", {
    type: "button",
    disabled: bymaxAiEnabled ? undefined : "true",
    class: "shrink-0 grid place-items-center w-12 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 " +
      "text-white text-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400 disabled:opacity-50",
    "aria-label": "Enviar",
  }, "\u27A4");

  let busy = false;
  function push(text, who) {
    log.append(bubble(text, who));
    log.scrollTop = log.scrollHeight;
  }

  async function ask() {
    const q = input.value.trim();
    if (!q || busy) return;
    push(q, "me");
    input.value = "";
    busy = true;
    sendBtn.disabled = true;
    const thinking = bubble(name + " esta pensando...", "bot");
    log.append(thinking);
    log.scrollTop = log.scrollHeight;

    try {
      const res = await fetch(BYMAX_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context }),
      });
      const data = await res.json().catch(() => ({}));
      thinking.remove();
      if (!res.ok || !data.answer) {
        // Mostramos el motivo REAL del Worker (ej: falta GEMINI_API_KEY) para poder
        // diagnosticar. Si no hay detalle, un mensaje amable generico.
        const why = data.error || data.detail;
        push(why ? ("\u26A0\uFE0F " + why) : "Ups, no pude responder ahora. Intenta de nuevo en un momento.", "bot");
      } else {
        const row = el("div", { class: "flex items-start gap-2 justify-start" },
          bubble(data.answer, "bot"),
          el("button", {
            type: "button",
            class: "shrink-0 mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full text-indigo-300 hover:bg-indigo-500/20",
            "aria-label": "Escuchar respuesta", title: "Escuchar",
            onclick: () => speakRobot(data.answer, lang), html: ICONS.sound,
          }));
        log.append(row);
        log.scrollTop = log.scrollHeight;
        speakRobot(data.answer, lang);
      }
    } catch {
      thinking.remove();
      push("No hay conexion con Bymax IA. Revisa tu internet.", "bot");
    } finally {
      busy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.onclick = ask;
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") ask(); });

  // Mensaje de bienvenida (o aviso si no esta configurado).
  if (bymaxAiEnabled) {
    push("Hola! Soy " + name + ". Preguntame lo que sea sobre ingles: gramatica, palabras, por que se dice algo... Estoy para ayudarte!", "bot");
  } else {
    push("El Bymax con IA todavia no esta activado. Cuando el administrador conecte el Worker (ver carpeta /worker), podras preguntarme lo que sea aqui.", "bot");
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col",
    role: "dialog", "aria-label": "Chat con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      robotAvatar("md"),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, name + " IA"),
        el("p", { class: "text-xs text-slate-400" }, "Preguntame lo que sea")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),

    el("div", { class: "mt-3 border-t border-slate-800 pt-2" }, log),

    el("div", { class: "mt-3 flex gap-2" }, input, sendBtn));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  if (bymaxAiEnabled) input.focus();
}
