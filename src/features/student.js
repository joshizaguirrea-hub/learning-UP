/**
 * features/student.js — Dashboard del estudiante.
 *
 * Capa de feature: carga el perfil y el plan via services y los muestra.
 * Enlaza el examen de ubicacion (ruta #/examen).
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCurrentPlan } from "../services/placement.js";
import { unitsForLevel } from "../data/units/index.js";
import { countDue } from "../services/srs.js";
import { CEFR_INFO } from "../data/cefr.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "bg-white rounded-xl p-6 shadow-sm border border-slate-200";

export async function renderStudent(container, user) {
  const profile = await getStudentProfile(user.id);
  const name = user.user_metadata?.full_name || "estudiante";

  const header = el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
    el("h1", { class: "text-2xl font-bold" }, `Hola, ${name}`),
    el("span", { class: "text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full" }, "Estudiante"));

  const done = profile && profile.placement_done;
  const blocks = [header, done ? levelCard(profile) : placementCta()];

  if (done) {
    const [units, due] = await Promise.all([
      Promise.resolve(unitsForLevel(profile.cefr_level)),
      countDue(user.id),
    ]);
    blocks.push(courseSection(units, due));
    const plan = await getCurrentPlan(user.id);
    if (plan) blocks.push(planSection(plan));
  }

  blocks.push(el("section", { class: "grid sm:grid-cols-2 gap-6 mt-6" },
    stub("Buscar profesor", "Marketplace de profesores (Fase 2)."),
    stub("Certificados", "Certificado MCER al completar tu nivel (proximamente).")));

  mount(container, el("div", {}, ...blocks));
  focusMainHeading(container);
}

/** Llamado a la accion para hacer el examen (si aun no lo ha hecho). */
function placementCta() {
  return el("section", { class: "mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6" },
    el("h2", { class: "font-bold text-lg text-amber-900" }, "Primer paso: examen de ubicacion"),
    el("p", { class: "mt-2 text-amber-800 text-sm" },
      "Descubre tu nivel (MCER) y generaremos tu plan de estudio personalizado. Son 8 preguntas."),
    el("button", {
      class: "mt-4 bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg " +
        "hover:bg-amber-700 focus:outline focus:outline-2 focus:outline-amber-900",
      onclick: () => go("/examen"),
    }, "Empezar examen"));
}

/** Tarjeta con el nivel actual del estudiante. */
function levelCard(profile) {
  const info = CEFR_INFO[profile.cefr_level] || {};
  return el("section", { class: "mt-6 " + CARD },
    el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
      el("div", {},
        el("h2", { class: "font-bold text-lg" }, "Tu nivel actual"),
        el("p", { class: "mt-1 text-3xl font-extrabold text-indigo-700" },
          `${profile.cefr_level} `, el("span", { class: "text-base font-semibold text-slate-600" }, info.label || "")),
        el("p", { class: "text-slate-600 text-sm" }, info.blurb || "")),
      el("button", {
        class: "text-sm text-indigo-700 underline hover:no-underline",
        onclick: () => go("/examen"),
      }, "Repetir examen")));
}

/** Seccion con los modulos del plan de estudio (clicables, con progreso). */
function planSection(plan) {
  const total = plan.modules.length;
  const done = plan.modules.filter((m) => m.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const rows = plan.modules.map((m) =>
    el("a", {
      href: `#/modulo/${m.id}`,
      class: "flex items-center gap-3 py-2 px-2 -mx-2 rounded-lg border-b border-slate-100 " +
        "last:border-0 hover:bg-indigo-50 focus:outline focus:outline-2 focus:outline-indigo-600",
    },
      el("span", { class: "text-xs font-mono bg-slate-100 px-2 py-0.5 rounded" }, m.level),
      el("span", { class: "flex-1" }, m.title),
      statusBadge(m.status)));

  return el("section", { class: "mt-6 " + CARD },
    el("div", { class: "flex items-center justify-between flex-wrap gap-2" },
      el("h2", { class: "font-bold text-lg" }, "Tu plan de estudio"),
      el("span", { class: "text-sm text-slate-600" }, `${done}/${total} completados`)),
    el("p", { class: "text-slate-600 text-sm mt-1" },
      `De ${plan.from_level} hacia ${plan.target_level}`),
    el("div", { class: "w-full bg-slate-200 rounded-full h-2 mt-3", role: "progressbar",
      "aria-valuenow": String(pct), "aria-valuemin": "0", "aria-valuemax": "100" },
      el("div", { class: "bg-emerald-500 h-2 rounded-full transition-all", style: `width:${pct}%` })),
    el("div", { class: "mt-4" }, ...rows));
}

/** Insignia de estado del modulo, con color. */
function statusBadge(status) {
  const map = {
    done: ["Completado", "bg-emerald-100 text-emerald-800"],
    in_progress: ["En progreso", "bg-amber-100 text-amber-800"],
    pending: ["Pendiente", "bg-slate-100 text-slate-600"],
  };
  const [label, cls] = map[status] || map.pending;
  return el("span", { class: `text-xs px-2 py-0.5 rounded-full ${cls}` }, label);
}

/** Seccion "Tu curso": unidades del nivel + acceso al repaso SRS del dia. */
function courseSection(units, due) {
  const unitCards = units.length
    ? units.map((u) =>
        el("a", {
          href: `#/unidad/${u.id}`,
          class: "block p-4 rounded-lg border border-slate-200 hover:bg-indigo-50 " +
            "focus:outline focus:outline-2 focus:outline-indigo-600",
        },
          el("div", { class: "flex items-center gap-2" },
            el("span", { class: "text-xs font-mono bg-slate-100 px-2 py-0.5 rounded" }, u.level),
            el("span", { class: "font-semibold" }, u.title)),
          el("p", { class: "text-sm text-slate-600 mt-1" }, u.subtitle)))
    : [el("p", { class: "text-sm text-slate-500" }, "Pronto habra mas unidades para tu nivel.")];

  const reviewBanner = due > 0
    ? el("a", {
        href: "#/repaso",
        class: "block mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 " +
          "hover:bg-emerald-100 focus:outline focus:outline-2 focus:outline-emerald-600",
      },
        el("span", { class: "font-semibold text-emerald-900" }, `Repaso del dia: ${due} tarjetas`),
        el("span", { class: "block text-sm text-emerald-800" }, "Manten tu vocabulario fresco con repaso espaciado."))
    : null;

  return el("section", { class: "mt-6 " + CARD },
    el("h2", { class: "font-bold text-lg" }, "Tu curso"),
    el("p", { class: "text-slate-600 text-sm mt-1" }, "Unidades tematicas con lecciones interactivas."),
    el("div", { class: "mt-4 grid gap-3" }, ...unitCards),
    reviewBanner);
}

function stub(title, text) {
  return el("div", { class: CARD + " opacity-60" },
    el("h3", { class: "font-bold" }, title),
    el("p", { class: "mt-2 text-slate-600 text-sm" }, text));
}
