/**
 * features/my-life-lesson.js — "Lecciones desde tu vida".
 *
 * El alumno pega texto real (un mensaje, la letra de una cancion, lo que hizo
 * hoy...) y Bymax lo convierte en una mini-leccion: palabras clave, un consejo y
 * una pregunta. Aprender con TU contenido = maximo enganche. Con IA si el Worker
 * esta activo; sin el, modo offline con palabras tocables (pronunciacion).
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { speak, speakBilingual } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { robotName } from "../ui/robot.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";

function stripMd(t) { return String(t).replace(/\*\*/g, "").replace(/[*_`]/g, "").replace(/^#+\s*/gm, ""); }

export function openMyLifeLesson() {
  const name = robotName();
  const close = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };

  const ta = el("textarea", {
    rows: "4", maxlength: "1000",
    placeholder: "Pega o escribe algo tuyo: un mensaje, lo que hiciste hoy, la letra de una canci\u00f3n...",
    class: "w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 " +
      "focus:outline focus:outline-2 focus:outline-indigo-500 resize-y",
  });
  const out = el("div", { class: "mt-3" });
  const status = el("p", { class: "mt-2 text-xs text-slate-500 min-h-[1rem]" }, "");

  /** Modo offline: muestra el texto con palabras tocables (pronuncia en ingles). */
  function offlineWords(text) {
    const words = [...new Set(String(text).toLowerCase().match(/[a-z']{3,}/g) || [])].slice(0, 24);
    out.replaceChildren(
      el("p", { class: "text-sm text-slate-300" }, "Toca una palabra para o\u00edrla en ingl\u00e9s:"),
      el("div", { class: "mt-2 flex flex-wrap gap-2" }, ...words.map((w) => el("button", {
        type: "button",
        class: "text-sm px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10",
        onclick: () => speak(w, "en-US", { rate: 0.9 }),
      }, w))));
  }

  async function build() {
    const text = ta.value.trim();
    if (!text) { status.textContent = "Escribe algo primero \uD83D\uDE42"; return; }
    if (!bymaxAiEnabled) {
      status.textContent = "Modo offline (sin IA): practica la pronunciaci\u00f3n de tus palabras.";
      offlineWords(text);
      return;
    }
    buildBtn.disabled = true;
    status.textContent = name + " est\u00e1 creando tu lecci\u00f3n...";
    const question = "Eres profe de ingl\u00e9s para hispanohablantes. A partir de ESTE texto del alumno: \"" +
      text.slice(0, 800) + "\". Devuelve TODO en espa\u00f1ol, y CADA palabra o frase en ingl\u00e9s SIEMPRE entre comillas dobles " +
      "(prohibido el spanglish: no mezcles idiomas dentro de una oraci\u00f3n). Estructura: " +
      "1) 5 palabras o frases clave en ingl\u00e9s (entre comillas) con su significado en espa\u00f1ol; 2) un consejo breve; " +
      "3) una pregunta de comprensi\u00f3n (la pregunta en ingl\u00e9s entre comillas). Sin markdown ni asteriscos, usa saltos de l\u00ednea.";
    const { answer, error } = await askBymax({ mode: "chat", topic: "personal", level: "B1", question });
    buildBtn.disabled = false;
    if (error || !answer) { status.textContent = "\u26a0\ufe0f " + (error || "No pude ahora."); offlineWords(text); return; }
    status.textContent = "Lecci\u00f3n lista \u2705";
    const clean = stripMd(answer);
    out.replaceChildren(...clean.split(/\n+/).filter(Boolean).map((p) =>
      el("p", { class: "text-slate-100 text-sm leading-relaxed mt-1.5" }, p)));
    out.append(el("button", {
      type: "button",
      class: "mt-3 inline-flex items-center gap-2 border border-indigo-500/40 bg-indigo-500/10 text-indigo-200 px-3 py-2 rounded-xl hover:bg-indigo-500/20",
      onclick: () => speakBilingual(clean),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar"));
  }

  const buildBtn = el("button", {
    type: "button",
    class: "mt-3 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: build,
  }, "Crear lecci\u00f3n con " + name);

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Lecciones desde tu vida", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-700 grid place-items-center text-white", html: ICONS.bulb }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, "Lecciones desde tu vida"),
        el("p", { class: "text-xs text-slate-400" }, "Aprende con TU propio contenido")),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "mt-3" }, ta, buildBtn, status,
      el("div", { class: "overflow-y-auto pr-1", style: "max-height:50vh" }, out)));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);
  ta.focus();
}
