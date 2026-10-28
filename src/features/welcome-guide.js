/**
 * features/welcome-guide.js - Como funciona el curso, explicado UNA vez.
 *
 * POR QUE EXISTE
 * --------------
 * Un alumno nuevo ve una unidad con seis POPs de colores, una seccion "Bonos"
 * y un boton "Examen PARA PASAR", y no sabe cual es obligatorio, en que orden
 * van, ni que hace falta para avanzar. Sin esa idea, se mueve a tientas: toca
 * lo que brilla, se salta el examen y cree que la app esta rota cuando no
 * avanza.
 *
 * TODO LO QUE SE AFIRMA AQUI ESTA MEDIDO EN EL CODIGO, no redactado de
 * memoria. Si cambian las reglas, tools/check_onboarding.py falla y obliga a
 * actualizar este texto. Un tutorial que miente es peor que no tener
 * tutorial: destruye la confianza justo cuando el alumno mas la necesita.
 *   - 70% de la unidad para aprobarla    -> core/unit-report.js  (PASS)
 *   - 60% por leccion para darla por ok  -> features/lesson-player.js
 *   - fases learn/practice/produce       -> campo `phase` de cada leccion
 *   - el examen final se anade aparte    -> withTest() en units/index.js
 *
 * SE MUESTRA UNA SOLA VEZ y se puede reabrir desde Ajustes. Nada de forzar el
 * mismo tutorial cada vez: eso se convierte en un boton "cerrar" que nadie lee.
 */

import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { skillLabel } from "../data/skill-meta.js";

const SEEN_KEY = "lup.welcome.seen";

/** True si el alumno ya vio la guia alguna vez. */
export function hasSeenWelcome() {
  return localStorage.getItem(SEEN_KEY) === "1";
}

/** Marca la guia como vista (o la reabre si se pasa false). */
export function setWelcomeSeen(on = true) {
  if (on) localStorage.setItem(SEEN_KEY, "1");
  else localStorage.removeItem(SEEN_KEY);
}

// Las fases REALES por las que pasa cada unidad. MEDIDAS, no inventadas: el
// campo `phase` del contenido solo tiene learn / practice / produce (80, 161 y
// 80 lecciones respectivamente). El examen final NO es una fase: se anade
// aparte con withTest() en units/index.js. En el primer borrador de esta guia
// escribi "fase test" de memoria y check_onboarding.py lo caza.
const FASES = [
  {
    color: "from-sky-500 to-blue-600",
    titulo: "1. Aprender",
    texto: "Lees, escuchas y conoces el vocabulario nuevo. Aqui no se te " +
      "califica: es la fase de entender.",
  },
  {
    color: "from-violet-500 to-purple-600",
    titulo: "2. Practicar",
    texto: "Reconoces lo aprendido: eliges, emparejas y completas. Si fallas, " +
      "la app te lo explica y el error se guarda en tu Cuaderno.",
  },
  {
    color: "from-emerald-500 to-teal-600",
    titulo: "3. Producir",
    texto: "Ahora lo generas tu desde cero: escribes tus propias frases y " +
      "hablas en voz alta. Es la parte que de verdad fija el idioma.",
  },
  {
    color: "from-amber-500 to-orange-600",
    titulo: "4. Examen de unidad",
    texto: "Mezcla todo lo anterior. Es el unico obligatorio para dar la " +
      "unidad por terminada.",
  },
];

// Las seis competencias, con lo que el alumno HACE en cada una.
const COMPETENCIAS = [
  ["reading", "Lees textos y respondes preguntas."],
  ["listening", "Escuchas audio y reconoces lo que oiste."],
  ["vocabulary", "Memorizas palabras con repeticion espaciada."],
  ["grammar", "Entiendes la regla y la aplicas."],
  ["writing", "Escribes tus propias frases."],
  ["speaking", "Hablas en voz alta; el microfono te corrige."],
];

function tarjetaFase(f, i) {
  return el("div", { class: "flex gap-3 items-start" },
    el("div", {
      class: "shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br " + f.color +
        " grid place-items-center text-white font-bold text-sm",
      "aria-hidden": "true",
    }, String(i + 1)),
    el("div", {},
      el("p", { class: "font-bold text-slate-100" }, f.titulo),
      el("p", { class: "text-sm text-slate-400 mt-0.5" }, f.texto)));
}

function filaCompetencia([skill, que]) {
  return el("li", { class: "flex gap-2 text-sm" },
    el("span", { class: "font-semibold text-slate-200 shrink-0" },
      skillLabel(skill, "es") + ":"),
    el("span", { class: "text-slate-400" }, que));
}

function bloque(titulo, ...hijos) {
  return el("section", { class: "mt-6" },
    el("h2", { class: "font-bold text-slate-100" }, titulo), ...hijos);
}

/**
 * Pinta la guia de bienvenida.
 * @param {HTMLElement} container
 * @param {Function} onClose - que hacer al cerrar (seguir a donde iba)
 */
export function renderWelcomeGuide(container, onClose) {
  const card = "bg-slate-900/70 border border-slate-800 rounded-2xl p-5";

  const vista = el("div", { class: "max-w-2xl mx-auto" },
    el("div", { class: card },
      el("p", { class: "text-xs uppercase tracking-wide text-indigo-400" },
        "Antes de empezar"),
      el("h1", { class: "text-2xl font-extrabold text-white mt-1" },
        "Como funciona tu curso"),
      el("p", { class: "text-slate-400 mt-2 text-sm" },
        "Dos minutos de lectura para que no vayas a ciegas. Puedes volver a " +
        "abrir esto cuando quieras desde Ajustes."),

      bloque("Cada unidad sigue cuatro pasos",
        el("div", { class: "mt-3 space-y-4" }, ...FASES.map(tarjetaFase))),

      bloque("Las seis competencias",
        el("p", { class: "text-sm text-slate-400 mt-1" },
          "Dentro de las fases practicas estas seis destrezas. Cada una lleva " +
          "su propio nivel de dificultad, que ajustas en Ajustes."),
        el("ul", { class: "mt-3 space-y-1.5" }, ...COMPETENCIAS.map(filaCompetencia))),

      bloque("Para aprobar una unidad",
        el("div", { class: "mt-2 rounded-xl bg-slate-800/60 p-4" },
          el("p", { class: "text-sm text-slate-300" },
            el("b", {}, "Termina todas las lecciones"),
            " y aprueba el examen final de la unidad."),
          el("ul", { class: "mt-2 text-sm text-slate-400 space-y-1" },
            el("li", {}, "- Cada leccion se da por buena con un 60% de aciertos."),
            el("li", {}, "- La unidad queda APROBADA con un 70% global."),
            el("li", {}, "- Por debajo de eso sale A REFORZAR: no se pierde nada, " +
              "solo te decimos que competencia repasar.")))),

      bloque("Bonos y contenido extra",
        el("p", { class: "text-sm text-slate-400 mt-1" },
          "Las pastillas de abajo de cada unidad son ", el("b", {}, "opcionales"),
          ". No hacen falta para avanzar: son mazos extra (verbos irregulares, " +
          "falsos amigos, modismos...) para cuando quieras profundizar. " +
          "Varian segun el idioma.")),

      bloque("Tu Cuaderno de errores",
        el("p", { class: "text-sm text-slate-400 mt-1" },
          "Cada fallo se guarda con su explicacion. No es un castigo: es tu " +
          "lista personal de lo que toca repasar, y la app te lo devuelve en " +
          "los repasos.")),

      el("button", {
        class: "mt-7 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 " +
          "text-white font-bold transition",
        onclick: () => { setWelcomeSeen(true); onClose(); },
      }, "Entendido, empezar")));

  mount(container, vista);
  focusMainHeading(container);
  announce("Guia de bienvenida: como funciona el curso.");
}
