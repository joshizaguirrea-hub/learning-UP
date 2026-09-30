/**
 * ui/session-end.js — Cierre de practica reusable: felicita, pregunta si el
 * alumno quiere otra ronda y le deja elegir la dificultad (1..10).
 *
 * Por que aqui y no en cada feature: hasta ahora CADA ejercicio pintaba su
 * propia pantalla de "terminaste" con su propio boton de repetir (ocho copias
 * distintas). Esta es UNA sola, para todas las competencias. La logica de que
 * significa cada nivel es pura y vive en core/difficulty.js.
 *
 * Capa de presentacion: sin red, sin persistencia, sin reglas de negocio.
 */
import { el } from "./dom.js";
import { teacherFace } from "./bymax-mascot.js";
import { celebrate } from "./celebrate.js";
import { allLevels, clampLevel, levelInfo, suggestNext } from "../core/difficulty.js";

/** Selector 1..10: diez botones redondos + la descripcion del elegido debajo. */
function levelPicker(initial, onChange) {
  let current = clampLevel(initial);
  const hint = el("p", { class: "mt-3 text-sm text-slate-300 min-h-[2.5rem]" });
  const group = el("div", {
    class: "mt-3 grid grid-cols-5 gap-2",
    role: "radiogroup",
    "aria-label": "Nivel de dificultad, del 1 al 10",
  });

  const paint = () => {
    const lv = levelInfo(current);
    hint.replaceChildren(
      el("span", { class: "font-semibold text-violet-200" }, lv.n + " \u00b7 " + lv.label),
      el("span", { class: "text-slate-400" }, " \u2014 " + lv.hint));
    btns.forEach((b, i) => {
      const on = i + 1 === current;
      b.className = "h-11 rounded-xl font-bold text-sm transition focus:outline focus:outline-2 focus:outline-violet-300 " +
        (on
          ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg scale-105"
          : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10");
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    onChange?.(current);
  };

  const move = (delta) => {
    const next = clampLevel(current + delta);
    if (next === current) return;
    current = next;
    paint();
    btns[current - 1].focus();
  };

  const btns = allLevels().map((lv) => el("button", {
    type: "button",
    role: "radio",
    "aria-label": "Nivel " + lv.n + ": " + lv.label + ". " + lv.hint,
    onclick: () => { current = lv.n; paint(); },
    onkeydown: (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Home") { e.preventDefault(); current = 1; paint(); btns[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); current = 10; paint(); btns[9].focus(); }
    },
  }, String(lv.n)));

  group.append(...btns);
  paint();
  return { node: el("div", {}, group, hint), get level() { return current; } };
}

/**
 * Muestra el cierre de una practica.
 *
 * @param {object} cfg
 * @param {string}  cfg.title     - titulo grande ("Clase completada")
 * @param {string} [cfg.subtitle] - linea de detalle (resultado, unidad...)
 * @param {number} [cfg.pct]      - % de acierto; si viene, presugiere el nivel
 * @param {number} [cfg.level]    - nivel de practica actual (1..10)
 * @param {boolean}[cfg.party]    - lanza la celebracion epica (confeti) antes
 * @param {string} [cfg.againLabel] - texto del boton de otra ronda
 * @param {string} [cfg.doneLabel]  - texto del boton de salir
 * @returns {Promise<{again: boolean, level: number}>} que eligio el alumno.
 *   again=false -> se va; again=true -> otra ronda con `level`.
 */
export function sessionEnd(cfg = {}) {
  const {
    title = "\u00a1Practica completada!",
    subtitle = "",
    pct,
    level,
    party = true,
    againLabel = "S\u00ed, otra ronda \u2192",
    doneLabel = "Terminar por hoy",
  } = cfg;

  return new Promise((resolve) => {
    // Presugerimos el escalon segun como le fue, pero manda el alumno.
    const suggested = Number.isFinite(Number(pct))
      ? suggestNext(level, pct)
      : clampLevel(level);

    let settled = false;
    const finish = (again) => {
      if (settled) return;
      settled = true;
      document.removeEventListener("keydown", onEsc);
      overlay.remove();
      resolve({ again, level: picker.level });
    };
    const onEsc = (e) => { if (e.key === "Escape") finish(false); };

    const picker = levelPicker(suggested, null);

    const nudge = suggested !== clampLevel(level)
      ? el("p", { class: "mt-2 text-xs text-violet-300/90" },
          suggested > clampLevel(level)
            ? "Te fue muy bien: te suger\u00ed subir a " + suggested + "."
            : "Te costo un poco: te suger\u00ed bajar a " + suggested + ".")
      : null;

    const card = el("div", {
      class: "max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl " +
        "max-h-[92dvh] overflow-y-auto",
      role: "dialog", "aria-modal": "true", "aria-label": title,
    },
      el("div", { class: "text-center" },
        el("div", { class: "w-20 mx-auto" }, teacherFace("lg")),
        el("h3", { class: "text-2xl font-extrabold text-slate-100 mt-2" }, title),
        subtitle ? el("p", { class: "mt-1 text-slate-300" }, subtitle) : null),

      el("div", { class: "mt-5 pt-5 border-t border-white/10" },
        el("p", { class: "font-semibold text-slate-100" }, "\u00bfQuieres seguir practicando?"),
        el("p", { class: "text-xs text-slate-400 mt-0.5" },
          "Elige que tan dificiles quieres los ejercicios de la siguiente ronda."),
        picker.node,
        nudge),

      el("div", { class: "mt-6 flex flex-col sm:flex-row gap-2" },
        el("button", {
          type: "button",
          class: "flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold px-5 py-3 " +
            "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70",
          onclick: () => finish(true),
        }, againLabel),
        el("button", {
          type: "button",
          class: "flex-1 border border-white/15 bg-white/5 text-slate-300 font-semibold px-5 py-3 " +
            "rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white/40",
          onclick: () => finish(false),
        }, doneLabel)));

    const overlay = el("div", {
      class: "fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
      onclick: (e) => { if (e.target === overlay) finish(false); },
    }, card);

    const show = () => {
      document.body.append(overlay);
      document.addEventListener("keydown", onEsc);
      card.querySelector("button")?.focus();
    };

    // La fiesta primero (confeti + fanfarria), y al cerrarla aparece la eleccion.
    if (party) celebrate({ title, subtitle }).then(show);
    else show();
  });
}
