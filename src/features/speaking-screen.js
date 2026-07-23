/**
 * features/speaking-screen.js — Pantalla exclusiva "Habla con Bymax" (#/hablar).
 *
 * Todo lo de practicar speaking en un solo lugar, en tarjetas UNIFORMES (2x2):
 * llamada por voz, pronunciacion (escucha y repite), lecciones desde tu vida y
 * chat con Bymax. Reusa hubCard (mismo tamano/estilo que el inicio) -> DRY y sin
 * tarjetas de alturas distintas.
 */
import { getStudentProfile } from "../services/profiles.js";
import { getCourseProgress } from "../services/course.js";
import { unitsForLevel } from "../data/units/index.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { accentGrad } from "../ui/theme.js";
import { focusMainHeading } from "../ui/a11y.js";
import { backHome, screenHeader, hubCard } from "../ui/hub-ui.js";
import { openVoiceCall } from "./voice-call.js";
import { openMyLifeLesson } from "./my-life-lesson.js";
import { openSpeaking } from "./speaking.js";

export async function renderSpeaking(container, user) {
  const [profile, progressMap] = await Promise.all([
    getStudentProfile(user.id), getCourseProgress(user.id),
  ]);
  const level = profile?.cefr_level || "A1";
  const units = unitsForLevel(level);
  const pronUnit = currentUnit(units, progressMap);

  mount(container, el("div", { class: "max-w-5xl mx-auto space-y-4" },
    backHome("text-sky-300 hover:text-sky-200"),
    screenHeader({
      icon: ICONS.mic, grad: accentGrad("speak"),
      title: "Habla con Bymax", subtitle: "Practica tu speaking en ingles",
    }),
    el("section", { class: "grid grid-cols-2 gap-2 sm:gap-4" },
      hubCard({
        grad: accentGrad("speak"), icon: ICONS.mic,
        title: "Llamada con Bymax", subtitle: "Manos libres: tu eliges el tema",
        onClick: () => openVoiceCall({ level, chooseTopic: true }),
      }),
      hubCard({
        grad: accentGrad("reward"), icon: ICONS.sound,
        title: "Pronunciacion",
        subtitle: pronUnit ? "Escucha y repite frases" : "Avanza en tu curso para desbloquear",
        onClick: pronUnit ? () => openSpeaking(pronUnit) : undefined,
      }),
      hubCard({
        grad: accentGrad("brand"), icon: ICONS.bulb,
        title: "Lecciones de tu vida", subtitle: "Pega un texto y practicalo",
        onClick: () => openMyLifeLesson(),
      }),
      hubCard({
        href: "#/chat", grad: accentGrad("share"), icon: ICONS.chat,
        title: "Chat con Bymax", subtitle: "Escribe cuando prefieras teclado",
      }))));
  focusMainHeading(container);
}

/** Unidad "actual": la primera con alguna leccion sin completar (o la primera). */
function currentUnit(units, progressMap) {
  for (const u of units) {
    const hasPhrases = (u.vocab || []).some((v) => v.example);
    if (!hasPhrases) continue;
    const incomplete = u.lessons.some((l) => progressMap[l.id]?.status !== "done");
    if (incomplete) return u;
  }
  // Todo completo: usa la ultima unidad con frases para seguir practicando.
  return [...units].reverse().find((u) => (u.vocab || []).some((v) => v.example)) || null;
}
