/**
 * ui/robot.js — "Profe Robo": mascota IA que da la clase y ayuda al alumno.
 *
 * Capa de presentacion. NO usa IA en la nube: es un profesor "por reglas" que
 * refuerza la gramatica de la unidad y da pistas segun el tipo de ejercicio.
 * El alumno elige su avatar y le pone nombre (ui/robot-prefs). La voz del profe
 * es espanol nativo en A1-A2 e ingles de B1 en adelante (inmersion).
 */
import { el } from "./dom.js";
import { ICONS } from "./icons.js";
import { speakButton, speakRobot } from "./speech.js";
import { avatarNode, AVATAR_LIST, avatarSvg } from "./avatars.js";
import { getRobot, setRobot } from "./robot-prefs.js";

/** Nombre actual del robot. */
export function robotName() {
  return getRobot().name;
}

/** Avatar del robot elegido por el alumno. size: sm | md | lg. */
export function robotAvatar(size = "md") {
  return avatarNode(getRobot().avatar, size);
}

/** Boton pequeno de altavoz con la voz (divertida) del profe. */
function robotSpeakBtn(text, lang) {
  return el("button", {
    type: "button",
    class: "inline-flex items-center justify-center w-7 h-7 rounded-full text-indigo-300 " +
      "hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400 shrink-0",
    "aria-label": "Escuchar al profe",
    title: "Escuchar",
    onclick: (e) => { e.preventDefault(); e.stopPropagation(); speakRobot(text, lang); },
    html: ICONS.sound,
  });
}

/** Burbuja de dialogo: el profe dice algo (con su voz). */
export function robotBubble(text, { lang = "es-MX" } = {}) {
  return el("div", { class: "flex items-start gap-3 robot-pop" },
    robotAvatar("md"),
    el("div", { class: "robot-bubble bg-slate-800/90 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 flex-1" },
      el("p", { class: "text-xs font-bold text-indigo-300" }, getRobot().name),
      el("div", { class: "flex items-start gap-2" },
        el("p", { class: "text-slate-200 text-sm mt-0.5 flex-1" }, text),
        robotSpeakBtn(text, lang))));
}

/** Boton grande "Que el profe lea la clase" (audio de la indicacion). */
export function robotReadButton(text, lang = "es-MX") {
  return el("button", {
    type: "button",
    class: "mt-3 flex items-center gap-2 text-sm text-indigo-200 border border-indigo-500/40 " +
      "bg-indigo-500/10 rounded-xl px-3 py-2 hover:bg-indigo-500/20 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: () => speakRobot(text, lang),
  }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Que " + getRobot().name + " lea la clase");
}

/** Boton para pedir ayuda al profe durante un ejercicio. */
export function robotHelpButton(onClick) {
  return el("button", {
    type: "button",
    class: "flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 " +
      "border border-indigo-500/40 bg-indigo-500/10 rounded-xl px-3 py-2 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: onClick,
  }, el("span", { class: "w-6 h-6 inline-block", html: avatarSvg(getRobot().avatar) }), "Ayuda de " + getRobot().name);
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
 * Abre un pop del profe con una pista que REFUERZA LA REGLA.
 * @param {object|null} grammar - gramatica de la unidad {title, form, examples}
 * @param {object} act - actividad actual (para el tip por tipo)
 * @param {string} [lang] - idioma de la voz del profe (es-MX / en-US)
 */
export function openRobotHint(grammar, act, lang = "es-MX") {
  const name = getRobot().name;
  const close = () => overlay.remove();
  const intro = "Tranqui, esto se puede. Repasemos juntos y lo resuelves.";

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl",
    role: "dialog", "aria-label": "Ayuda de " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      robotAvatar("md"),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, name),
        el("p", { class: "text-xs text-slate-400" }, "Tu profesor de bolsillo")),
      robotSpeakBtn(intro + " " + (grammar ? "Recuerda: " + grammar.title + ". " + (grammar.form || "") : typeTip(act.type)), lang)),

    el("p", { class: "mt-4 text-slate-200" }, intro),

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
  card.querySelector("button:last-child")?.focus();
}

/**
 * Modal para elegir avatar y ponerle nombre al robot.
 * @param {function} onDone - callback tras guardar (recibe la config nueva)
 */
export function openRobotSetup(onDone) {
  const current = getRobot();
  let chosen = current.avatar;
  const close = () => overlay.remove();

  const nameInput = el("input", {
    type: "text", maxlength: "20", value: current.name === "Profe Robo" ? "" : current.name,
    placeholder: "Ej: Robi, Chispas, Max...",
    class: "mt-2 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
  });

  const grid = el("div", { class: "mt-3 grid grid-cols-3 gap-3" });
  function paintGrid() {
    grid.replaceChildren(...AVATAR_LIST.map((a) => {
      const sel = a.id === chosen;
      return el("button", {
        type: "button",
        class: "flex flex-col items-center gap-1 rounded-2xl p-3 border-2 transition " +
          (sel ? "border-indigo-400 bg-indigo-500/15" : "border-slate-700 hover:bg-slate-800"),
        onclick: () => { chosen = a.id; paintGrid(); },
      }, avatarNode(a.id, "md"), el("span", { class: "text-[11px] text-slate-300" }, a.label));
    }));
  }
  paintGrid();

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl",
    role: "dialog", "aria-label": "Configura tu robot", "aria-modal": "true",
  },
    el("h2", { class: "text-xl font-bold text-slate-100" }, "Conoce a tu profesor robot"),
    el("p", { class: "mt-1 text-sm text-slate-400" }, "Elige su look y ponle el nombre que quieras. Te acompanara en cada clase."),
    el("label", { class: "block mt-4 text-sm font-semibold text-slate-200" }, "Nombre de tu robot"),
    nameInput,
    el("p", { class: "mt-4 text-sm font-semibold text-slate-200" }, "Elige su avatar"),
    grid,
    el("button", {
      class: "mt-5 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => {
        const name = nameInput.value.trim() || "Profe Robo";
        const cfg = setRobot({ name, avatar: chosen });
        close();
        if (typeof onDone === "function") onDone(cfg);
      },
    }, "Guardar y empezar"));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  nameInput.focus();
}
