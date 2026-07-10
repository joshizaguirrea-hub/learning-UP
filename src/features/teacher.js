/**
 * features/teacher.js — Dashboard del profesor.
 *
 * Capa de feature: muestra estado de la cuenta (KYC, examen, nivel) y usa el
 * motor puro core/pricing.js para mostrar el techo de tarifa permitido.
 */
import { getTeacherProfile } from "../services/profiles.js";
import { priceCap } from "../core/pricing.js";
import { el, mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

const CARD = "bg-slate-900 rounded-2xl p-6 border border-slate-800";

export async function renderTeacher(container, user) {
  const profile = (await getTeacherProfile(user.id)) || {};
  const name = user.user_metadata?.full_name || "profesor";

  const header = el("div", { class: "flex items-center justify-between flex-wrap gap-3" },
    el("h1", { class: "text-2xl font-bold" }, `Hola, ${name}`),
    el("span", { class: "text-sm bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full" }, "Profesor"));

  const cap = profile.max_cefr_level
    ? `$${priceCap(profile.max_cefr_level, profile.rating_avg || 0)}/h`
    : "sin asignar";

  const status = el("section", { class: "mt-6 " + CARD },
    el("h2", { class: "font-bold text-lg" }, "Estado de tu cuenta"),
    el("ul", { class: "mt-3 space-y-2 text-sm" },
      statusRow(profile.kyc_status === "approved",
        `Verificacion de documentos (KYC): ${profile.kyc_status || "pending"}`),
      statusRow(!!profile.knowledge_exam_done,
        `Examen de conocimiento: ${profile.knowledge_exam_done ? "completado" : "pendiente"}`),
      statusRow(!!profile.max_cefr_level,
        `Nivel maximo que puedes ensenar: ${profile.max_cefr_level || "sin asignar"}`),
      statusRow(!!profile.max_cefr_level,
        `Techo de tarifa permitido: ${cap}`)));

  const cards = el("section", { class: "grid sm:grid-cols-3 gap-6 mt-6" },
    stub("Subir documentos (KYC)", "Titulos, identidad, foto (Fase 2)."),
    stub("Mi agenda", "Define tu disponibilidad (Fase 2)."),
    stub("Solicitudes de clase", "Reservas de estudiantes (Fase 2)."));

  mount(container, el("div", {}, header, status, cards));
  focusMainHeading(container);
}

function statusRow(ok, text) {
  const dot = el("span", {
    class: "inline-block w-2.5 h-2.5 rounded-full " + (ok ? "bg-emerald-500" : "bg-amber-500"),
  });
  return el("li", { class: "flex items-center gap-2" }, dot, text);
}

function stub(title, text) {
  return el("div", { class: CARD + " opacity-60" },
    el("h3", { class: "font-bold" }, title),
    el("p", { class: "mt-2 text-slate-400 text-sm" }, text));
}
