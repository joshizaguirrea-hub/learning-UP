/**
 * features/skill-class.js — Clase de UNA competencia, explicada por Bymax.
 *
 * El nuevo hub de la unidad pone a Bymax al centro y las competencias en POPs
 * alrededor. Al tocar un POP, Bymax NO abre una leccion estatica: DA la clase de
 * esa competencia de forma interactiva, usando el CONTENIDO REAL de la unidad
 * (la regla de gramatica, el glosario, el texto de lectura, etc.). Reusa el motor
 * de sesion (bymax-session.js, mode "class") -> DRY: solo construye el "topic".
 */
import { openBymaxSession } from "./bymax-session.js";
import { SKILL_META } from "../data/skill-meta.js";
import { robotName } from "../ui/robot.js";
import { languageName } from "../data/languages.js";
import { completeLesson } from "../services/course.js";
import { levelFromCefr } from "../core/difficulty.js";

/** Primera leccion de la unidad que entrena la competencia `key` (o null). */
export function lessonForSkill(unit, key) {
  for (const l of unit?.lessons || []) {
    if ((l.skills || []).includes(key)) return l;
  }
  return null;
}

/**
 * Resume el CONTENIDO real de la unidad para esa competencia, en un texto corto
 * (el Worker recorta topic a ~700 chars). Asi Bymax ensena lo de la unidad, no
 * algo generico. Cada competencia toma los campos que le sirven.
 */
function skillFocus(unit, key, lesson) {
  const out = [];
  const glossary = lesson?.glossary || lesson?.content?.glossary || unit?.vocab || [];
  const langName = languageName(unit?.language || "en"); // idioma META que aprende el alumno

  if (key === "grammar") {
    const g = lesson?.grammar;
    // ORDEN IMPORTANTE: el Worker recorta `topic` a ~695 chars, asi que lo que
    // va primero es lo que sobrevive. El vocabulario va ANTES que los ejemplos
    // y los errores comunes: sin el, la IA pide producir palabras que nunca
    // presento ("di 'yo soy estudiante'" con 'etudiant' nunca visto) y el
    // alumno se atora en LEXICO, no en gramatica, que es lo que toca entrenar.
    if (g) {
      if (g.title) out.push("Tema: " + g.title + ".");
      if (g.rule) out.push("Regla: " + g.rule);
    }
    // Vocabulario de la unidad, deduplicado y acotado: el Worker recorta a ~695
    // chars y la lista entera no cabe. 12 palabras bastan para que la IA no
    // improvise lexico; mas solo empuja fuera a los ejemplos y los errores.
    const known = [...new Set((unit?.vocab || [])
      .map((v) => String(v.term).split(" / ")[0].trim()))]
      .slice(0, 12).join(", ");
    if (known) {
      out.push("Vocabulario YA visto (usa SOLO esto; si metes una palabra nueva, dala traducida ANTES de pedirla): " + known + ".");
    }
    if (g) {
      if (g.examples?.length) out.push("Ejemplos: " + g.examples.slice(0, 4).join(" / "));
      if (g.mistakes?.length) {
        out.push("Errores comunes a corregir: " +
          g.mistakes.slice(0, 3).map((m) => m.wrong + " -> " + m.right).join(" ; "));
      }
      if (g.form) out.push("Forma: " + g.form);
    }
    out.push("Explica la regla en espanol con ejemplos en " + langName + " y hazlo practicar frase por frase. Nunca en ingles (salvo que el idioma meta sea ingles).");
  } else if (key === "vocabulary") {
    const words = glossary.slice(0, 10)
      .map((v) => '"' + v.term + '" = ' + v.translation).join(" ; ");
    if (words) out.push("Vocabulario a ensenar y practicar: " + words + ".");
    out.push("Presenta las palabras, da un ejemplo de cada una y pide al alumno usarlas en frases.");
  } else if (key === "reading") {
    const rd = lesson?.content?.reading;
    if (rd) out.push("Texto de lectura: " + rd.slice(0, 380));
    out.push("Trabaja la comprension: presenta el texto por partes, aclara palabras clave y hazle preguntas al alumno.");
  } else if (key === "listening") {
    out.push("Comprension auditiva: di frases cortas en " + langName + " del tema (para que el alumno las oiga con el boton de audio) y pidele que las repita o responda que entendio.");
  } else if (key === "writing") {
    const acts = (lesson?.activities || []).filter((a) => a.prompt).slice(0, 4).map((a) => a.prompt);
    if (acts.length) out.push("Frases a construir: " + acts.join(" ; "));
    out.push("Escritura: guia al alumno a construir frases del tema paso a paso y corrige cada una.");
  } else if (key === "speaking") {
    out.push("Expresion oral: haz que el alumno HABLE. Dale una situacion del tema, modela una frase y pidele responder en voz alta; corrige la pronunciacion y el orden.");
  }

  return out.join("\n");
}

/**
 * Abre la clase interactiva de una competencia con Bymax.
 * @param {object} unit - unidad del curso { title, subtitle, level, lessons }
 * @param {string} key - competencia (grammar|vocabulary|reading|listening|writing|speaking)
 * @param {object} [opts] - { userId, onComplete } para MARCAR la leccion completada
 *   al terminar la clase (asi avanza el progreso de la unidad).
 */
export function openSkillClass(unit, key, opts = {}) {
  const meta = SKILL_META[key] || { label: key, subtitle: "" };
  const lesson = lessonForSkill(unit, key);
  const focus = skillFocus(unit, key, lesson);
  const level = unit?.level || "B1";
  const lang = unit?.language || "en";
  const langName = languageName(lang);
  const topic = (`Unidad "${unit?.title || "general"}" (${level}). El alumno APRENDE ${langName}. ` +
    `Ensena y pide traducciones/ejemplos en ${langName} (no en ingles, salvo que el idioma meta sea ingles). ` +
    `Enfoque de la clase: ${meta.label} (${meta.subtitle}).\n${focus}`).slice(0, 695);
  const name = robotName();

  // Al terminar la clase, marca la leccion como hecha (si existe y hay usuario)
  // -> el check aparece y la unidad puede completarse. DRY: usa completeLesson.
  const onFinish = (lesson?.id && opts.userId) ? () => {
    completeLesson(opts.userId, lesson.id, 100).catch(() => {});
    if (typeof opts.onComplete === "function") opts.onComplete();
  } : (typeof opts.onComplete === "function" ? opts.onComplete : null);

  openBymaxSession({
    mode: "class",
    topic,
    level,
    targetLang: lang, // idioma META -> el Worker ensena en este idioma (no ingles fijo)
    unitId: unit?.id, unitTitle: unit?.title, userId: opts.userId, // -> cuaderno de errores
    // Glosario de la unidad -> POP "Palabras" dentro de la clase. El alumno ve
    // el lexico que ya se presento sin tener que pedirlo por chat.
    vocab: unit?.vocab || [],
    skill: key, // competencia -> pestana del cuaderno de errores
    onFinish,
    // Al terminar la clase: felicitar + ofrecer mas practica eligiendo
    // dificultad 1..10. El escalon inicial se deduce del nivel MCER.
    askMore: true,
    level10: opts.level10 || levelFromCefr(level),
    endSubtitle: meta.label + " \u00b7 " + (unit?.title || ""),
    title: name + " ensena: " + meta.label,
    subtitle: (unit?.title || "") + " \u00b7 " + meta.subtitle + " \u00b7 nivel " + level,
    placeholder: "Responde a " + name + " (o mira 'Palabras')...",
    ariaLabel: "Clase de " + meta.label + " con " + name,
  });
}
