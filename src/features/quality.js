/**
 * features/quality.js — Reporte de calidad y robustez del contenido.
 *
 * Capa de feature: ejecuta el auditor puro (core/content-audit) sobre TODO el
 * catalogo y lo presenta: puntaje, integridad, matriz de cobertura y checklist
 * por unidad. Es la "prueba" objetiva de que el plan es solido.
 */
import { UNITS } from "../data/units/index.js";
import { auditContent } from "../core/content-audit.js";
import { SKILL_META } from "../data/skill-meta.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-5";

export function renderQuality(container) {
  const r = auditContent(UNITS);

  mount(container, el("div", { class: "space-y-6" },
    el("div", {},
      el("h1", { class: "text-2xl font-bold" }, "Calidad del contenido"),
      el("p", { class: "text-slate-400 text-sm mt-1" },
        "Auditoria automatica del curso: integridad, cobertura y completitud.")),
    el("div", { class: "grid lg:grid-cols-3 gap-6 items-start" },
      scoreCard(r.score),
      el("div", { class: "lg:col-span-2" }, integrityCard(r.integrity))),
    coverageCard(r.coverage),
    unitsCard(r.units)));
  focusMainHeading(container);
}

function scoreCard(score) {
  const color = score.pct >= 80 ? "text-emerald-400" : score.pct >= 60 ? "text-amber-400" : "text-red-400";
  const grade = score.pct >= 80 ? "Solido" : score.pct >= 60 ? "Aceptable" : "En construccion";
  return el("section", { class: PANEL + " text-center" },
    el("h2", { class: "font-bold" }, "Puntaje de calidad"),
    el("p", { class: `text-6xl font-extrabold mt-3 ${color}` }, `${score.pct}`),
    el("p", { class: "text-slate-400 text-sm" }, "de 100"),
    el("p", { class: `mt-2 font-semibold ${color}` }, grade),
    el("p", { class: "text-xs text-slate-500 mt-3" },
      score.errorCount === 0 ? "Sin errores de integridad" : `${score.errorCount} errores de integridad`));
}

function integrityCard(issues) {
  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");

  const rows = [];
  if (!issues.length) {
    rows.push(el("p", { class: "text-emerald-400 text-sm" }, "Todo el contenido paso las validaciones. Sin problemas."));
  } else {
    for (const e of errors) rows.push(line("error", e.msg));
    for (const w of warns) rows.push(line("warn", w.msg));
  }

  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Integridad"),
    el("p", { class: "text-sm text-slate-400 mt-1" },
      `${errors.length} errores, ${warns.length} advertencias.`),
    el("div", { class: "mt-3 space-y-1.5 max-h-64 overflow-auto" }, ...rows));
}

function line(level, msg) {
  const dot = level === "error" ? "bg-red-500" : "bg-amber-500";
  return el("div", { class: "flex items-start gap-2 text-sm" },
    el("span", { class: `mt-1.5 w-2 h-2 rounded-full shrink-0 ${dot}` }),
    el("span", { class: "text-slate-300" }, msg));
}

function coverageCard(coverage) {
  const skills = coverage.allSkills;
  const levels = Object.keys(coverage.byLevel);

  const head = el("tr", { class: "text-slate-400 text-xs" },
    el("th", { class: "text-left py-2 pr-3" }, "Nivel"),
    ...skills.map((s) => el("th", { class: "px-2 py-2 text-center" }, SKILL_META[s].label)));

  const body = levels.length
    ? levels.map((lvl) => {
        const data = coverage.byLevel[lvl];
        return el("tr", { class: "border-t border-slate-800" },
          el("td", { class: "py-2 pr-3 font-mono text-slate-200" }, `${lvl} (${data.unitCount}u)`),
          ...skills.map((s) => {
            const n = data.skills[s] || 0;
            return el("td", { class: "px-2 py-2 text-center" },
              el("span", {
                class: "inline-block min-w-6 px-2 py-0.5 rounded text-xs font-semibold " +
                  (n > 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-600"),
              }, n > 0 ? String(n) : "-"));
          }));
      })
    : [el("tr", {}, el("td", { class: "py-2 text-slate-500" }, "Aun no hay unidades."))];

  const missing = skills.filter((s) => !coverage.skillsCovered.includes(s));

  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Cobertura por nivel y competencia"),
    el("p", { class: "text-sm text-slate-400 mt-1" }, "Numero de lecciones que entrenan cada competencia."),
    el("div", { class: "mt-3 overflow-x-auto" },
      el("table", { class: "w-full text-sm" }, el("thead", {}, head), el("tbody", {}, ...body))),
    missing.length
      ? el("p", { class: "mt-3 text-xs text-amber-400" },
          "Competencias sin contenido aun: " + missing.map((s) => SKILL_META[s].label).join(", ") +
          " (Listening/Speaking requieren audio/IA).")
      : null);
}

function unitsCard(units) {
  const cards = units.map((u) =>
    el("div", { class: "p-4 rounded-xl bg-slate-800/60 border border-slate-700" },
      el("div", { class: "flex items-center gap-2" },
        el("span", { class: "text-xs font-mono bg-slate-700 px-2 py-0.5 rounded" }, u.level),
        el("span", { class: "font-semibold" }, u.title),
        el("span", { class: "ml-auto text-xs text-slate-400" }, `${u.activityCount} actividades`)),
      el("ul", { class: "mt-3 space-y-1" },
        ...u.checks.map((c) => el("li", { class: "flex items-center gap-2 text-sm" },
          el("span", { class: c.ok ? "text-emerald-400" : "text-red-400" }, c.ok ? "+" : "x"),
          el("span", { class: c.ok ? "text-slate-300" : "text-slate-400" }, c.label))))));

  return el("section", { class: PANEL },
    el("h2", { class: "font-bold" }, "Detalle por unidad"),
    el("div", { class: "mt-4 grid md:grid-cols-2 gap-4" }, ...cards));
}
