/**
 * features/teachers.js — "Profesores disponibles" (base, Fase 2).
 *
 * Por ahora muestra la vision del marketplace. La logica real (agenda, reservas,
 * KYC, ranking) llega en la Fase 2 del roadmap.
 */
import { comingSoon } from "../ui/placeholder.js";
import { ICONS } from "../ui/icons.js";
import { mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

export function renderTeachers(container) {
  mount(container, comingSoon({
    title: "Profesores disponibles",
    desc: "Encuentra un profesor verificado para tu nivel y objetivos.",
    icon: ICONS.teachers,
    bullets: [
      "Ver agenda y disponibilidad en tiempo real",
      "Reservar clases 1 a 1 segun tu presupuesto",
      "El profesor ve tu plan y tu historial (bitacora compartida)",
      "Calificaciones y ranking de profesores",
    ],
  }));
  focusMainHeading(container);
}
