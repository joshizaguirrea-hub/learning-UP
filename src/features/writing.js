/**
 * features/writing.js — Hub de ESCRITURA con Bymax (perrito robot).
 *
 * En vez de un chat generico, el Writing presenta 5 familias de ejercicios
 * (guiados, funcional, creativo, academico, edicion) con sus tipos. Cada tipo
 * abre una sesion con Bymax donde el da UNA consigna, espera el texto del alumno
 * y lo corrige (lineas TIP:). El idioma de la guia se adapta al nivel. DRY: la
 * sesion reutiliza openBymaxSession (mode "class") con onFinish para el progreso.
 */
import { el } from "../ui/dom.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { isAtLeast } from "../data/cefr.js";
import { completeLesson } from "../services/course.js";
import { openBymaxSession } from "./bymax-session.js";
import { lessonForSkill } from "./skill-class.js";

// Como debe comportarse Bymax en CUALQUIER ejercicio de escritura.
const BEHAVIOR =
  "You are Bymax, a warm, encouraging writing coach for a Spanish-speaking learner. " +
  "Run the writing exercise described below. Give ONE short, clear task at a time using the unit topic. " +
  "Wait for the student's written answer. Then reply: (1) a brief praise, (2) each correction on its own " +
  "line starting with 'TIP:' (grammar, vocabulary, spelling, style). Keep guidance in SPANISH if the level " +
  "is A1-B2, and in ENGLISH if the level is C1-C2. End by offering the next task. Be concise and kind.";

// Familias de ejercicios (con nivel recomendado minimo y sus tipos).
const GROUPS = [
  {
    title: "1. Guiados y estructurados",
    note: "Base gramatical y vocabulario sin la presion de la hoja en blanco.",
    min: "A1", color: "from-sky-500 to-blue-600",
    items: [
      { label: "Completar espacios", desc: "Rellena huecos con conectores, tiempos o vocabulario.",
        instr: "Fill-in-the-blanks: give a short sentence or mini-paragraph with 3-5 blanks; the student types the missing words." },
      { label: "Reordenar oraciones", desc: "Ordena palabras desordenadas en una frase correcta.",
        instr: "Sentence reordering: give 4-8 scrambled words; the student writes the correct sentence." },
      { label: "Transformar oraciones", desc: "Reescribe cambiando la estructura, mismo significado.",
        instr: "Sentence transformation: give a sentence and a target change (active/passive, synonym, tense); student rewrites it." },
      { label: "Unir oraciones", desc: "Combina dos frases con because, although, however...",
        instr: "Sentence joining: give two simple sentences; the student combines them using a suitable connector." },
      { label: "Traducir frases", desc: "Traduce oraciones breves para fijar estructuras.",
        instr: "Translation: give a short Spanish sentence; the student translates it into English (or vice versa)." },
    ],
  },
  {
    title: "2. Funcional y practica",
    note: "Contextos reales del dia a dia y del trabajo.",
    min: "A2", color: "from-emerald-500 to-teal-600",
    items: [
      { label: "Correos y cartas", desc: "E-mails formales (empleo, quejas) e informales.",
        instr: "Emails/letters: assign a realistic email or letter task (formal or informal) related to the unit topic." },
      { label: "Mensajes y notas", desc: "Avisos, invitaciones cortas, notas de agradecimiento.",
        instr: "Short messages/notes: ask for a brief note, invitation, or thank-you message." },
      { label: "Resenas", desc: "Opiniones sobre pelicula, libro, restaurante o producto.",
        instr: "Reviews: ask the student to write a short review with an opinion and a recommendation." },
    ],
  },
  {
    title: "3. Creativa e imaginativa",
    note: "Fluidez, creatividad y lenguaje descriptivo.",
    min: "A2", color: "from-fuchsia-500 to-pink-600",
    items: [
      { label: "Diario", desc: "Escribe sobre tu rutina, pensamientos o experiencias.",
        instr: "Journaling: prompt a short diary entry about the student's day, thoughts, or a recent experience." },
      { label: "Historia con imagen", desc: "Describe una escena o cuenta lo que sucede.",
        instr: "Picture description/storytelling: describe an imagined scene/photo in words and ask the student to write what is happening." },
      { label: "Relato corto", desc: "Continua una historia a partir de un inicio dado.",
        instr: "Short story: give an opening line (e.g. 'That Tuesday, the phone rang at 3:00 AM...') and the student continues it." },
    ],
  },
  {
    title: "4. Academica y argumentativa",
    note: "Ideas complejas con tono formal (niveles avanzados/examenes).",
    min: "B2", color: "from-indigo-500 to-violet-600",
    items: [
      { label: "Ensayo argumentativo", desc: "Argumenta a favor o en contra de un tema.",
        instr: "Argumentative essay: give a debatable topic and ask for a short opinion/discursive paragraph with reasons." },
      { label: "Informe o propuesta", desc: "Analiza datos y propon soluciones con estructura formal.",
        instr: "Report/proposal: give a situation; ask for a formal short report (intro, findings, recommendation)." },
      { label: "Resumen", desc: "Sintetiza las ideas clave con tus propias palabras.",
        instr: "Summarizing: provide a short passage and ask the student to summarize its key ideas in their own words (paraphrasing)." },
    ],
  },
  {
    title: "5. Edicion y correccion",
    note: "Detectar fallos es de las mejores formas de mejorar.",
    min: "B1", color: "from-amber-500 to-orange-600",
    items: [
      { label: "Buscar errores", desc: "Identifica y corrige faltas en un texto dado.",
        instr: "Error correction: give a short text with 3-5 mistakes; the student rewrites it correctly." },
      { label: "Parafrasear", desc: "Reescribe un parrafo cambiando vocabulario y estructura.",
        instr: "Paraphrasing: give a short paragraph; the student rewrites it keeping the meaning but changing words and structure." },
    ],
  },
];

/**
 * Abre el hub de escritura para una unidad.
 * @param {object} unit - unidad { title, level, lessons }
 * @param {object} [opts] - { userId, onComplete } para marcar la leccion de writing
 */
export function openWriting(unit, opts = {}) {
  const name = robotName();
  const level = unit?.level || "B1";
  const title = unit?.title || "general";
  const lesson = lessonForSkill(unit, "writing");
  const close = () => overlay.remove();

  function launch(item) {
    const topic = (`${BEHAVIOR}\nUnit: "${title}" (level ${level}).\n` +
      `EXERCISE: ${item.label} - ${item.instr}`).slice(0, 695);
    const onFinish = (lesson?.id && opts.userId) ? () => {
      completeLesson(opts.userId, lesson.id, 100).catch(() => {});
      if (typeof opts.onComplete === "function") opts.onComplete();
    } : (typeof opts.onComplete === "function" ? opts.onComplete : null);
    close();
    openBymaxSession({
      mode: "class",
      topic, level,
      onFinish,
      finishGoal: 3,
      title: name + " \u00b7 Writing: " + item.label,
      subtitle: title + " \u00b7 escribe y " + name + " te corrige \u00b7 nivel " + level,
      placeholder: "Escribe tu respuesta aqui...",
      ariaLabel: "Ejercicio de escritura (" + item.label + ") con " + name,
    });
  }

  const list = el("div", { class: "mt-4 space-y-5" }, ...GROUPS.map((g) => {
    const rec = isAtLeast(level, g.min);
    return el("section", {},
      el("div", { class: "flex items-center gap-2" },
        el("h3", { class: "font-bold text-slate-100" }, g.title),
        rec ? el("span", { class: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-200" }, "Ideal para tu nivel") : null),
      el("p", { class: "text-xs text-slate-400 mt-0.5" }, g.note),
      el("div", { class: "mt-2 grid sm:grid-cols-2 gap-2" }, ...g.items.map((item) =>
        el("button", {
          type: "button",
          class: `text-left rounded-xl p-3 bg-gradient-to-br ${g.color} text-white shadow ` +
            "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/80 transition",
          onclick: () => launch(item),
          "aria-label": "Ejercicio: " + item.label,
        },
          el("p", { class: "font-semibold text-sm" }, item.label),
          el("p", { class: "text-xs text-white/85 mt-0.5 leading-snug" }, item.desc)))));
  }));

  const card = el("div", {
    class: "robot-pop max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden",
    role: "dialog", "aria-label": "Escritura con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3 p-4 sm:p-5 border-b border-slate-800" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, "Writing con " + name),
        el("p", { class: "text-xs text-slate-400" }, "Elige un tipo de ejercicio \u00b7 " + title + " \u00b7 nivel " + level)),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "p-4 sm:p-5 overflow-y-auto" },
      el("p", { class: "text-sm text-slate-300" },
        name + " te dar\u00e1 una consigna, escribes tu respuesta y \u00e9l te corrige con tips. \u00a1Sin miedo a la hoja en blanco!"),
      list));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
}
