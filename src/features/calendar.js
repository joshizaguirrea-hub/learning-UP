/**
 * features/calendar.js — "Mi calendario / Agenda" (base).
 *
 * Mostrara tus clases reservadas, recordatorios de repaso (SRS) y metas diarias.
 */
import { comingSoon } from "../ui/placeholder.js";
import { ICONS } from "../ui/icons.js";
import { mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

export function renderCalendar(container) {
  mount(container, comingSoon({
    title: "Mi agenda",
    desc: "Organiza tus clases, repasos y metas de estudio.",
    icon: ICONS.calendar,
    bullets: [
      "Clases agendadas con tus profesores",
      "Recordatorio del repaso diario (SRS)",
      "Metas y racha de estudio",
    ],
  }));
  focusMainHeading(container);
}
