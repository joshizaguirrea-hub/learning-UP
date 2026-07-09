/**
 * ui/heatmap.js — Mapa de calor de dias activos (estilo GitHub/Duolingo).
 *
 * Recibe un Set de dias ISO ('YYYY-MM-DD') activos y pinta una cuadricula de
 * las ultimas ~17 semanas. Puro respecto a datos (solo construye DOM).
 */
import { el } from "./dom.js";
import { isoDay } from "../core/srs.js";

/**
 * @param {Set<string>} activeDays
 * @param {object} [opts] { weeks=17, today=Date }
 * @returns {HTMLElement}
 */
export function heatmapNode(activeDays, opts = {}) {
  const weeks = opts.weeks || 17;
  const today = opts.today || new Date();
  const totalDays = weeks * 7;

  // Empieza al inicio de la semana (domingo) hace `weeks` semanas.
  const start = new Date(today);
  start.setDate(start.getDate() - (totalDays - 1));
  start.setDate(start.getDate() - start.getDay()); // retrocede al domingo

  const cells = [];
  const cursor = new Date(start);
  const todayIso = isoDay(today);
  // Recorremos semana por semana (columna), dia por dia (fila) => grid-flow-col.
  const totalCells = weeks * 7;
  for (let i = 0; i < totalCells; i++) {
    const iso = isoDay(cursor);
    const future = iso > todayIso;
    const active = activeDays.has(iso);
    const color = future ? "bg-transparent"
      : active ? "bg-emerald-500" : "bg-slate-800";
    cells.push(el("div", {
      class: `w-3 h-3 rounded-sm ${color}`,
      title: future ? "" : `${iso}${active ? " - activo" : ""}`,
    }));
    cursor.setDate(cursor.getDate() + 1);
  }

  return el("div", { class: "overflow-x-auto" },
    el("div", {
      class: "grid grid-rows-7 grid-flow-col gap-1 w-max",
    }, ...cells));
}
