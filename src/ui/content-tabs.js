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
 * ellas, y las pestañas tambien son tocables directo. Es el MISMO layout en
 * PC y en celular, en vertical y en horizontal -- no depende del ancho de
 * pantalla, asi que no puede "verse distinto" entre dispositivos. Bonus:
 * tambien mata el scroll largo, que era la queja real.
 *
 * Puro en el sentido de UI: no sabe nada de vocabulario ni de verbos, solo
 * reparte nodos ya construidos en pestañas. Reutilizable en cualquier
 * pantalla que tenga este mismo problema de "3 columnas que se apilan".
 */
import { el } from "./dom.js";

/**
 * @param {Array<{label: string, content: HTMLElement|null}>} rawSteps - pasos
 *   en orden. Los que tengan `content` nulo/undefined se OMITEN (p.ej. si la
 *   IA esta apagada y no hay caja de ejemplos que mostrar).
 * @param {object} [opts]
 * @param {function} [opts.onDone] - se llama al tocar "Continuar" en el
 *   ULTIMO paso. Si no se pasa, el ultimo paso simplemente no muestra boton
 *   de continuar (ya no hay a donde ir).
 * @param {string} [opts.doneLabel] - texto del boton en el ultimo paso
 *   (default: "Listo").
 * @returns {HTMLElement|null} null si no quedo ningun paso con contenido.
 */
export function buildContentTabs(rawSteps, opts = {}) {
  const steps = rawSteps.filter((s) => s && s.content);
  if (!steps.length) return null;
  // Un solo paso: las pestañas no aportan nada, se muestra directo.
  if (steps.length === 1) return el("div", { class: "mt-4" }, steps[0].content);

  let active = 0;
  const panels = steps.map((s) =>
    el("div", { class: "mt-4", role: "tabpanel" }, s.content));

  const pillsRow = el("div", { class: "flex flex-wrap gap-2 justify-center", role: "tablist" });
  const backBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold border border-slate-700 " +
      "bg-slate-800/70 text-slate-200 hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400 " +
      "disabled:opacity-40 disabled:cursor-not-allowed",
    onclick: () => { if (active > 0) { active--; paint(); } },
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

    backBtn.disabled = active === 0 ? "" : null;
    const isLast = active === steps.length - 1;
    nextBtn.textContent = isLast ? (opts.doneLabel || "Listo") : "Continuar \u2192";
    nextBtn.classList.toggle("hidden", isLast && !opts.onDone);
  }

  paint();
  return el("div", { class: "mt-4" },
    pillsRow,
    ...panels,
    el("div", { class: "mt-5 flex items-center justify-between gap-3" }, backBtn, nextBtn));
}
