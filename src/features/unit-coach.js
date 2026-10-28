/**
 * features/unit-coach.js - Megan te GUIA por la unidad, sin secuestrarte.
 *
 * POR QUE EXISTE
 * --------------
 * Tocar a Megan abria una clase 1-a-1 en una ventana modal: te sacaba de la
 * unidad, te pedia escribir en ingles y tapaba los POPs. El alumno no queria
 * una clase: queria saber QUE LE FALTA. Dos cosas distintas.
 *
 * Ahora Megan habla desde la propia pantalla, en una burbuja junto a su cara,
 * y te dice en una frase que has terminado y que te queda. Luego ofrece un par
 * de botones para ir DIRECTO a lo pendiente. Sin modal, sin teclado, sin
 * esperar a la IA.
 *
 * SIN WORKER, SIN COSTE, SIN LATENCIA
 * -----------------------------------
 * Todo sale de buildUnitReport(), que ya calcula por competencia: doneCount,
 * total, pending y weak. Una llamada a la IA para decir "te falta listening"
 * seria pagar y hacer esperar al alumno por un dato que ya esta en memoria.
 * La IA se queda para lo que SOLO ella puede hacer: conversar.
 *
 * VARIEDAD SIN MENTIR
 * -------------------
 * Los mensajes rotan para que no sea el mismo robot cada vez, pero el DATO
 * (cuantas llevas, que falta) siempre se calcula. La gracia esta en como se
 * dice, no en inventarse el progreso.
 */

import { el } from "../ui/dom.js";
import { announce } from "../ui/a11y.js";
import { buildUnitReport } from "../core/unit-report.js";
import { skillLabel } from "../data/skill-meta.js";
import { robotName } from "../ui/robot-prefs.js";

// Frases de arranque. Se elige una al azar para que Megan no suene a disco
// rayado, pero NINGUNA afirma nada sobre el progreso: eso va aparte y medido.
const SALUDOS = [
  "A ver como vamos...",
  "Dejame mirar tu avance.",
  "Vale, echemos un vistazo.",
  "Veamos por donde andas.",
];

const CELEBRA = [
  "Unidad completa. Te la has ganado.",
  "Lo tienes todo hecho. Impecable.",
  "Terminaste la unidad entera. Bravo.",
];

/**
 * Enumera competencias como habla una persona: "A", "A y B", "A, B y C".
 * Sin esto salia "Gramatica y Vocabulario y Lectura", que suena a robot --
 * justo lo contrario de lo que se busca aqui.
 */
function lista(skills) {
  const n = skills.map((s) => skillLabel(s.id, "es"));
  if (n.length <= 1) return n[0] || "";
  return n.slice(0, -1).join(", ") + " y " + n[n.length - 1];
}

/**
 * Construye el mensaje de Megan a partir del progreso REAL.
 * @returns {{texto: string, sugerencias: Array<{skill: string, label: string}>}}
 */
export function coachMessage(unit, progressMap) {
  const r = buildUnitReport(unit, progressMap);
  const hechas = r.skills.filter((s) => !s.pending && s.doneCount > 0);
  const faltan = r.skills.filter((s) => s.pending);
  const flojas = r.skills.filter((s) => s.weak && !s.pending);

  // 1) Nada empezado: invitar, no abrumar.
  if (r.doneLessons === 0) {
    return {
      texto: "Unidad nueva: " + (unit.title || "") + ". Empieza por donde " +
        "quieras, yo te voy avisando de lo que falte.",
      sugerencias: faltan.slice(0, 2).map((s) => ({
        skill: s.id, label: "Empezar " + skillLabel(s.id, "es"),
      })),
    };
  }

  // 2) Todo hecho: celebrar, y solo entonces hablar de reforzar.
  if (!faltan.length) {
    const base = CELEBRA[Math.floor(Math.random() * CELEBRA.length)];
    if (flojas.length) {
      return {
        texto: base + " Si quieres subir nota, " +
          skillLabel(flojas[0].id, "es") + " es la que mas lo agradeceria.",
        sugerencias: flojas.slice(0, 2).map((s) => ({
          skill: s.id, label: "Reforzar " + skillLabel(s.id, "es"),
        })),
      };
    }
    return { texto: base, sugerencias: [] };
  }

  // 3) A medias: el caso normal. Reconocer lo hecho ANTES de pedir mas.
  const saludo = SALUDOS[Math.floor(Math.random() * SALUDOS.length)];

  let texto = saludo + " ";
  if (hechas.length) {
    texto += "Ya tienes " + lista(hechas.slice(0, 3)) + ". ";
  }
  texto += faltan.length === 1
    ? "Solo te falta " + skillLabel(faltan[0].id, "es") + " y cierras la unidad."
    : "Te quedan " + faltan.length + ": " + lista(faltan.slice(0, 3)) + ".";

  return {
    texto,
    sugerencias: faltan.slice(0, 2).map((s) => ({
      skill: s.id,
      label: (s.doneCount > 0 ? "Seguir con " : "Empezar ") + skillLabel(s.id, "es"),
    })),
  };
}

/**
 * Burbuja de Megan: aparece junto a su cara, sin tapar la unidad.
 *
 * @param {object} unit
 * @param {object} progressMap
 * @param {object} user
 * @param {Function} onGoSkill - (skillId) => abrir esa competencia
 * @returns {HTMLElement} el contenedor (vacio hasta que se toca a Megan)
 */
export function coachBubble(unit, progressMap, user, onGoSkill) {
  const caja = el("div", { class: "mt-3 flex justify-center" });

  /** Pinta (o repinta) la burbuja con el progreso del momento. */
  function mostrar() {
    const name = robotName();
    const { texto, sugerencias } = coachMessage(unit, progressMap);

    const botones = sugerencias.map((s) => el("button", {
      type: "button",
      class: "text-sm font-semibold px-3 py-1.5 rounded-lg bg-violet-500/15 " +
        "text-violet-200 border border-violet-400/30 hover:bg-violet-500/25 " +
        "focus:outline focus:outline-2 focus:outline-violet-300 transition",
      onclick: () => onGoSkill(s.skill),
    }, s.label));

    const burbuja = el("div", {
      // SIN animate-[fadeIn]: ese keyframe NO existe en el proyecto. Tailwind
      // generaba `animation: fadeIn ...` apuntando a nada, y segun el
      // navegador la burbuja podia quedarse invisible. Una animacion bonita
      // que esconde el contenido es peor que ninguna animacion.
      class: "relative max-w-md rounded-2xl bg-slate-800/90 border " +
        "border-violet-400/25 p-4 shadow-lg",
      role: "status",
    },
      el("p", { class: "text-xs font-bold text-violet-300 mb-1" }, name),
      el("p", { class: "text-sm text-slate-100 leading-relaxed" }, texto),
      botones.length
        ? el("div", { class: "mt-3 flex flex-wrap gap-2" }, ...botones)
        : null,
      el("button", {
        type: "button",
        class: "absolute top-2 right-2 w-7 h-7 grid place-items-center " +
          "rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700 " +
          "focus:outline focus:outline-2 focus:outline-white/60",
        onclick: () => caja.replaceChildren(),
        "aria-label": "Cerrar el mensaje de " + name,
      }, "\u00d7"));

    caja.replaceChildren(burbuja);
    announce(name + " dice: " + texto);
  }

  return { caja, mostrar };
}
