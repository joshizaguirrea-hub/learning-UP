/**
 * features/chat.js — "Chat" con profesor o companeros del mismo nivel (base).
 *
 * Mostrara conversaciones con tu profesor y con estudiantes de tu mismo nivel.
 */
import { comingSoon } from "../ui/placeholder.js";
import { ICONS } from "../ui/icons.js";
import { mount } from "../ui/dom.js";
import { focusMainHeading } from "../ui/a11y.js";

export function renderChat(container) {
  mount(container, comingSoon({
    title: "Chat",
    desc: "Practica y resuelve dudas conversando.",
    icon: ICONS.chat,
    bullets: [
      "Habla con tu profesor entre clases",
      "Grupos de estudiantes de tu mismo nivel",
      "Comparte audios y correcciones",
    ],
  }));
  focusMainHeading(container);
}
