/**
 * ui/robot.js — "Profe Robo": mascota IA que da la clase y ayuda al alumno.
 *
 * Capa de presentacion. NO usa IA en la nube: es un profesor "por reglas" que
 * refuerza la gramatica de la unidad y da pistas segun el tipo de ejercicio.
 * Funciona offline y es instantaneo.
 */
import { el } from "./dom.js";
import { speakButton } from "./speech.js";

const ROBOT = "\uD83E\uDD16"; // 

/** Avatar circular del robot. size: "sm" | "md" | "lg". */
export function robotAvatar(size = "md") {
  const dims = { sm: "w-9 h-9 text-xl", md: "w-12 h-12 text-2xl", lg: "w-20 h-20 text-5xl" }[size] || "w-12 h-12 text-2xl";
  return el("div", {
    class: "shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 " +
      "flex items-center justify-center shadow-lg robot-float " + dims,
    "aria-hidden": "true",
  }, ROBOT);
}

/** Burbuja de dialogo: el robot dice algo. */
export function robotBubble(text, { speak = true } = {}) {
  return el("div", { class: "flex items-start gap-3 robot-pop" },
    robotAvatar("md"),
    el("div", { class: "robot-bubble bg-slate-800/90 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex-1" },
      el("p", { class: "text-xs font-bold text-indigo-300" }, "Profe Robo"),
      el("div", { class: "flex items-start gap-2" },
        el("p", { class: "text-slate-200 text-sm mt-0.5" }, text),
        speak ? speakButton(text) : null)));
}

/** Boton pequeno para pedir ayuda al profe durante un ejercicio. */
export function robotHelpButton(onClick) {
  return el("button", {
    type: "button",
    class: "flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 " +
      "border border-indigo-500/40 bg-indigo-500/10 rounded-xl px-3 py-2 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: onClick,
  }, el("span", { class: "text-lg" }, ROBOT), "Ayuda del Profe Robo");
}

/** Pista segun el tipo de ejercicio (nudge, NO la respuesta). */
function typeTip(type) {
  return {
    multiple_choice: "Lee todas las opciones y descarta las que rompen la regla.",
    cloze: "Piensa que palabra encaja: fijate en el sujeto y el tiempo verbal.",
    word_bank: "Arma la frase en orden: normalmente sujeto + verbo + complemento.",
    matching: "Empareja lo que ya conoces primero; lo demas sale por descarte.",
  }[type] || "Vuelve a leer la pregunta con calma; la pista esta en la regla.";
}

/**
 * Abre un pop del Profe Robo con una pista que REFUERZA LA REGLA.
 * @param {object|null} grammar - objeto de gramatica de la unidad {title, form, examples}
 * @param {object} act - actividad actual (para el tip por tipo)
 */
export function openRobotHint(grammar, act) {
  const close = () => overlay.remove();

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl",
    role: "dialog", "aria-label": "Ayuda del Profe Robo", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      robotAvatar("md"),
      el("div", {},
        el("p", { class: "font-bold text-indigo-300" }, "Profe Robo"),
        el("p", { class: "text-xs text-slate-400" }, "Tu profesor de bolsillo"))),

    el("p", { class: "mt-4 text-slate-200" },
      "Tranqui, esto se puede. Repasemos juntos y lo resuelves."),

    grammar ? el("div", { class: "mt-4 border border-indigo-500/30 bg-indigo-500/10 rounded-xl p-4" },
      el("p", { class: "text-xs uppercase tracking-wide text-indigo-300/80" }, "Recuerda la regla"),
      el("p", { class: "font-bold text-indigo-200 mt-0.5" }, grammar.title),
      grammar.form ? el("p", { class: "mt-2 font-mono text-sm text-indigo-100 bg-slate-900/60 rounded px-3 py-2" }, grammar.form) : null,
      grammar.examples?.length
        ? el("p", { class: "mt-2 text-sm text-slate-200 flex items-center gap-2" }, speakButton(grammar.examples[0]), "Ej: " + grammar.examples[0])
        : null) : null,

    el("div", { class: "mt-4 flex items-start gap-2 text-sm text-slate-300" },
      el("span", { class: "text-lg" }, "\uD83D\uDCA1"),
      el("p", {}, typeTip(act.type))),

    el("button", {
      class: "mt-5 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: close,
    }, "Ya entendi, gracias!"));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  card.querySelector("button")?.focus();
}
