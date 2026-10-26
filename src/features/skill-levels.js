/**
 * features/skill-levels.js — Panel de niveles 1..10 por competencia.
 *
 * Por que existe: la dificultad es POR COMPETENCIA (puedes ir en 7 de Reading y
 * en 3 de Listening), pero hasta ahora el nivel SOLO se podia tocar al TERMINAR
 * una practica. Si querias bajarle a Listening tenias que hacer una clase
 * entera de Listening para llegar a la pantalla de cierre. Esto lo pone todo a
 * la vista y editable sin tener que jugar una ronda.
 *
 * Capa de feature: lee y escribe via core/difficulty.js (logica pura), pinta
 * con ui/dom.js. No toca red: los niveles viven en localStorage.
 */
import { el } from "../ui/dom.js";
import { announce } from "../ui/a11y.js";
import { skillLabel, SKILL_META } from "../data/skill-meta.js";
import { getImmersion } from "../ui/prefs.js";
import { currentLangCode } from "../ui/nav.js";
import { languageName } from "../data/languages.js";
import {
  allSkillLevels, makeSkillKey, setSkillLevel,
  levelLabel, levelInfo, MIN_LEVEL, MAX_LEVEL,
} from "../core/difficulty.js";

/**
 * Pinta la tarjeta "Nivel de practica por competencia".
 * @param {string} userId - id del alumno (los niveles son suyos)
 * @param {string} panelCls - clases de la tarjeta, para que combine con Ajustes
 * @returns {HTMLElement}
 */
export function skillLevelsCard(userId, panelCls) {
  const lang = currentLangCode();
  const niveles = allSkillLevels(userId, lang);
  // El nombre de la competencia sigue el mismo interruptor que el resto de la
  // app (ver data/ui-labels.js): o todo en inmersion, o nada.
  const etiqueta = (skill) => skillLabel(skill, getImmersion() ? lang : "es");

  const filas = Object.keys(SKILL_META).map((skill) =>
    filaNivel(skill, niveles[skill], userId, lang, etiqueta(skill)));

  return el("section", { class: panelCls + " mt-6" },
    el("h2", { class: "font-bold text-lg" }, "Nivel de practica"),
    el("p", { class: "text-sm text-slate-400 mt-1" },
      "Cada competencia guarda SU propio nivel, del 1 al 10. Puedes ir fuerte en " +
      "una y suave en otra. Esto no cambia tu nivel MCER: solo cuanto quieres sudar hoy."),
    el("p", { class: "text-xs text-slate-500 mt-1" }, "Idioma: " + languageName(lang)),
    el("div", { class: "mt-4 space-y-4" }, ...filas));
}

/** Una fila: competencia + deslizador 1..10 + etiqueta del escalon. */
function filaNivel(skill, nivel, userId, lang, nombre) {
  const key = makeSkillKey(userId, lang, skill);
  const meta = SKILL_META[skill];

  const valor = el("span", {
    class: "text-xs font-bold text-indigo-300 tabular-nums",
  }, nivel + " \u00b7 " + levelLabel(nivel));

  const pista = el("p", { class: "text-xs text-slate-500 mt-1" }, levelInfo(nivel).hint || "");

  const slider = el("input", {
    type: "range",
    min: String(MIN_LEVEL), max: String(MAX_LEVEL), step: "1",
    value: String(nivel),
    class: "w-full accent-indigo-500 focus:outline focus:outline-2 focus:outline-indigo-400",
    "aria-label": "Nivel de " + nombre,
    // El input cambia el texto en vivo; el guardado va en 'change' para no
    // escribir en localStorage en cada pixel que mueve el dedo.
    oninput: (e) => {
      const n = Number(e.target.value);
      valor.textContent = n + " \u00b7 " + levelLabel(n);
      pista.textContent = levelInfo(n).hint || "";
    },
    onchange: (e) => {
      const n = setSkillLevel(key, Number(e.target.value));
      announce("Nivel de " + nombre + ": " + n + ", " + levelLabel(n) + ".");
    },
  });

  return el("div", {},
    el("div", { class: "flex items-center gap-2" },
      el("span", {
        class: "w-7 h-7 grid place-items-center rounded-lg bg-gradient-to-br " +
          meta.gradient + " text-white shrink-0",
        html: meta.icon, "aria-hidden": "true",
      }),
      el("span", { class: "flex-1 font-semibold text-sm" }, nombre),
      valor),
    slider,
    pista);
}
