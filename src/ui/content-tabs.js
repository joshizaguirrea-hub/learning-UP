/**
 * ui/content-tabs.js — Navegador de contenido por PESTAÑAS, con Atrás/Continuar.
 *
 * POR QUE
 * -------
 * Las pantallas de "Clase de vocabulario" y "Verbos" mostraban SIEMPRE las 3
 * piezas de contenido desplegadas (presentación / ejemplos IA / gramática +
 * producción libre). En PC, con ancho de sobra, caben lado a lado y no se
 * nota nada raro. En celular se apilan una debajo de otra -> la pantalla se
 * vuelve larguísima y hay que scrollear mucho para llegar al final. Mismo
 * contenido, experiencia MUY distinta según el dispositivo (justo la queja
 * del alumno).
 *
 * SOLUCION (pedida por Johsua): pestañas. Se ve SOLO una sección de
 * contenido a la vez, con botones Atrás / Continuar para moverse entre
 * ellas, y las pestañas tambien son tocables directo.
 *
 * NAVEGACION UNICA (fix de un bug real): al principio este componente solo
 * se movia DENTRO de sus propias pestañas, y las pantallas que lo usaban
 * dejaban SU PROPIO boton de "Siguiente palabra/verbo" pegado justo debajo
 * -- dos pares de botones "ir hacia atras/adelante" uno encima del otro, que
 * Johsua correctamente señaló como "un duplicado". Ahora este componente
 * puede encargarse TAMBIEN de ese salto hacia la siguiente tarjeta via
 * opts.onBack/opts.onDone: en el PRIMER paso, "Atrás" llama a onBack (si se
 * dio) en vez de deshabilitarse; en el ULTIMO paso, "Continuar" llama a
 * onDone. Asi queda un SOLO par de botones que sirve para las dos cosas
 * (moverse entre secciones Y moverse entre tarjetas), sin plantar nada mas
 * debajo.
 *
 * Puro en el sentido de UI: no sabe nada de vocabulario ni de verbos, solo
 * reparte nodos ya construidos en pestañas. Reutilizable en cualquier
 * pantalla que tenga este mismo problema de "columnas que se apilan".
 */
import { el } from "./dom.js";

/**
 * @param {Array<{label: string, content: HTMLElement|null}>} rawSteps - pasos
 *   en orden. Los que tengan `content` nulo/undefined se OMITEN (p.ej. si la
 *   IA esta apagada y no hay caja de ejemplos que mostrar).
 * @param {object} [opts]
 * @param {function} [opts.onBack] - se llama al tocar "Atrás" estando en el
 *   PRIMER paso (en vez de deshabilitar el boton). Para encadenar con "ir a
 *   la tarjeta anterior" y no duplicar navegacion.
 * @param {function} [opts.onDone] - se llama al tocar "Continuar" en el
 *   ULTIMO paso. Si no se pasa, el ultimo paso simplemente no muestra boton
 *   de continuar (ya no hay a donde ir).
 * @param {string} [opts.doneLabel] - texto del boton en el ultimo paso
 *   (default: "Listo").
 * @param {string} [opts.backLabel] - texto del boton "Atrás" en el PRIMER
 *   paso cuando hay onBack (default: "\u2190 Atrás", igual que siempre).
 * @returns {HTMLElement|null} null si no quedo ningun paso con contenido.
 */
export function buildContentTabs(rawSteps, opts = {}) {
  const steps = rawSteps.filter((s) => s && s.content);
  if (!steps.length) return null;
  // Un solo paso: las pestañas no aportan nada, se muestra directo. OJO: si
  // de todos modos hay onBack/onDone (navegacion entre tarjetas), igual hace
  // falta un nav -- construimos un wrap minimo sin pestañas.
  if (steps.length === 1) {
    if (!opts.onBack && !opts.onDone) return el("div", { class: "mt-4" }, steps[0].content);
    return el("div", { class: "mt-4" }, steps[0].content, singleStepNav(opts));
  }

  let active = 0;
  const panels = steps.map((s) =>
    el("div", { class: "mt-4", role: "tabpanel" }, s.content));

  const pillsRow = el("div", { class: "flex flex-wrap gap-2 justify-center", role: "tablist" });
  const backBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold border border-slate-700 " +
      "bg-slate-800/70 text-slate-200 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      "disabled:opacity-40 disabled:cursor-not-allowed",
    onclick: () => {
      if (active > 0) { active--; paint(); }
      else opts.onBack?.();
    },
  }, "\u2190 Atr\u00e1s");
  const nextBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white " +
      "bg-gradient-to-r from-indigo-500 to-violet-500 hover:brightness-110 " +
      "focus:outline focus:outline-2 focus:outline-indigo-300",
    onclick: () => {
      if (active < steps.length - 1) { active++; paint(); }
      else opts.onDone?.();
    },
  }, "Continuar \u2192");

  function paint() {
    pillsRow.replaceChildren(...steps.map((s, i) => el("button", {
      type: "button",
      role: "tab",
      "aria-selected": i === active ? "true" : "false",
      onclick: () => { active = i; paint(); },
      class: "px-3.5 py-1.5 rounded-full text-sm font-bold border transition " +
        "focus:outline focus:outline-2 focus:outline-indigo-400 " +
        (i === active
          ? "bg-indigo-500 text-white border-indigo-400"
          : "bg-slate-800/60 text-slate-300 border-slate-700 hover:border-indigo-400/60"),
    }, (i + 1) + ". " + s.label)));

    panels.forEach((p, i) => p.classList.toggle("hidden", i !== active));

    const isFirst = active === 0;
    const isLast = active === steps.length - 1;
    backBtn.textContent = (isFirst && opts.onBack) ? (opts.backLabel || "\u2190 Atr\u00e1s") : "\u2190 Atr\u00e1s";
    backBtn.disabled = (isFirst && !opts.onBack) ? "" : null;
    nextBtn.textContent = isLast ? (opts.doneLabel || "Listo") : "Continuar \u2192";
    nextBtn.classList.toggle("hidden", isLast && !opts.onDone);
  }

  paint();
  return el("div", { class: "mt-4" },
    pillsRow,
    ...panels,
    el("div", { class: "mt-5 flex items-center justify-between gap-3" }, backBtn, nextBtn));
}

/** Nav minimo cuando hay un solo paso pero igual hace falta ir a la tarjeta anterior/siguiente. */
function singleStepNav(opts) {
  const backBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold border border-slate-700 " +
      "bg-slate-800/70 text-slate-200 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      "disabled:opacity-40 disabled:cursor-not-allowed",
    disabled: opts.onBack ? null : "",
    onclick: () => opts.onBack?.(),
  }, opts.backLabel || "\u2190 Atr\u00e1s");
  const nextBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white " +
      "bg-gradient-to-r from-indigo-500 to-violet-500 hover:brightness-110 " +
      "focus:outline focus:outline-2 focus:outline-indigo-300",
    onclick: () => opts.onDone?.(),
  }, opts.doneLabel || "Listo");
  if (!opts.onDone) nextBtn.classList.add("hidden");
  return el("div", { class: "mt-5 flex items-center justify-between gap-3" }, backBtn, nextBtn);
}
