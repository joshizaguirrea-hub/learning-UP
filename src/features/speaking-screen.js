/**
 * features/speaking-screen.js — Pantalla exclusiva "Habla con Bymax" (#/hablar).
 *
 * Todo lo de practicar speaking en un solo lugar: llamada por voz (manos libres),
 * lecciones desde tu vida y chat con Bymax. Reusa los modales existentes (DRY).
 */
import { getStudentProfile } from "../services/profiles.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { actionBanner } from "../ui/banner.js";
import { openVoiceCall } from "./voice-call.js";
import { openMyLifeLesson } from "./my-life-lesson.js";

export async function renderSpeaking(container, user) {
  const profile = await getStudentProfile(user.id);
  const level = profile?.cefr_level || "A1";

  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-6" },
    backHome("text-sky-300 hover:text-sky-200"),
    screenHeader({
      icon: ICONS.mic, grad: accentGrad("speak"),
      title: "Habla con Bymax", subtitle: "Practica tu speaking en ingles",
    }),
    el("div", { class: "space-y-3" },
      actionBanner({
        accent: "speak", icon: ICONS.mic, cta: "Llamar",
        onClick: () => openVoiceCall({ level, chooseTopic: true }),
        title: "Llamada con Bymax",
        subtitle: "Manos libres: tu eliges el tema (o Bymax te recomienda uno) y hablan en ingles",
      }),
      actionBanner({
        accent: "brand", icon: ICONS.bulb, cta: "Probar",
        onClick: () => openMyLifeLesson(),
        title: "Lecciones desde tu vida",
        subtitle: "Pega un mensaje o la letra de una cancion y Bymax lo vuelve tu leccion",
      }),
      actionBanner({
        accent: "share", icon: ICONS.chat, cta: "Abrir", href: "#/chat",
        title: "Chat con Bymax",
        subtitle: "Escribe con Bymax cuando prefieras teclado en vez de voz",
      }))));
  focusMainHeading(container);
}
