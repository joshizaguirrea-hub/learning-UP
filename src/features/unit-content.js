/**
 * features/unit-content.js — Hub de la unidad: Bymax al CENTRO, skills en POPs.
 *
 * Capa de feature (presentacion). Rediseno "vivo": la mascota de Bymax queda al
 * centro mirando al alumno, rodeada por las 6 competencias en POPs (grid 3x3).
 * Al tocar un POP, Bymax DA la clase de esa competencia con el contenido real de
 * la unidad (features/skill-class.js). Alrededor, POPs pequenos para el examen,
 * el cuento, la videollamada (llamada en vivo IA) y los bonos. Mas dinamico y personal.
 */
import { SKILL_META } from "../data/skill-meta.js";
import { VOCAB_DECKS } from "../data/vocab-decks.js";
import { bonusDecksForLanguage } from "../data/bonus-decks.js";
import { ICONS } from "../ui/icons.js";
import { robotName, teacherPortraitSrc } from "../ui/robot.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { portraitImg } from "../ui/avatars.js";
import { el } from "../ui/dom.js";
import { openClass } from "./class-tutor.js";
import { openStory } from "./story.js";
import { openSkillClass, lessonForSkill } from "./skill-class.js";
import { openReadingLab } from "./reading-lab.js";
import { openSpeaking } from "./speaking.js";
import { openVoiceCall } from "./voice-call.js";
import { openListeningLab } from "./listening-lab.js";
import { openVocabClass } from "./vocab-class.js";
import { openWriting } from "./writing.js";
import { openGrammarInput } from "./grammar-input.js";
import { openPronunciationLab, hasPronunciation } from "./pronunciation-lab.js";
import { openCheckpoint, hasCheckpoint } from "./checkpoint.js";
import { getCourseProgress } from "../services/course.js";
import { openUnitReport } from "./unit-report.js";
import { openNotebook } from "./notebook.js";
import { isUnitComplete } from "../core/unit-report.js";

// Bonos de verbos que se ofrecen en cada unidad (mazos en data/bonus-decks.js).
// Deben coincidir con lo que evalua el examen (data/test-gen.js).
const BONUS_LINKS = [
  { id: "irregular-verbs", label: "Verbos irregulares" },
  { id: "regular-past", label: "Pasado regular (-ed)" },
  { id: "past-time", label: "Expresiones de tiempo" },
  { id: "idioms", label: "Idioms (modismos)" },
];

// Orden de las 6 competencias ORBITANDO a Bymax, en el sentido del reloj desde
// arriba. Se posicionan con trigonometria sobre un circulo (ver orbit()).
const ORBIT = ["grammar", "vocabulary", "reading", "listening", "speaking", "writing"];
const ORBIT_RADIUS = 46; // radio en % del contenedor cuadrado

/**
 * Bloque de contenido de la unidad: hub central con Bymax + POPs.
 * @param {object} unit - unidad del curso
 * @param {Object} progressMap - id de leccion -> { status }
 * @param {object} [user] - usuario actual
 */
export function unitContent(unit, progressMap, user) {
  const name = robotName();

  // Al terminar la ULTIMA competencia de la unidad, abrimos el boletin solo.
  // Releemos el progreso fresco (para tener las notas recien guardadas).
  let reportShown = false;
  const onSkillDone = async () => {
    if (reportShown || !user?.id) return;
    const fresh = await getCourseProgress(user.id);
    if (isUnitComplete(unit, fresh)) { reportShown = true; openUnitReport(unit, fresh, user); }
  };

  // POP central: el profe mirando al alumno. En modo humano (default) llena el
  // circulo con su RETRATO (Megan, rol course); en modo robot, la mascota Bymax.
  // Al tocarlo, abre la clase 1 a 1.
  const faceSrc = teacherPortraitSrc("course");
  const face = faceSrc
    ? el("div", { class: "w-full h-full" }, portraitImg(faceSrc))
    : el("div", { class: "translate-y-1" }, bymaxMascot("lg"));
  const center = el("button", {
    type: "button",
    class: "grid place-items-center rounded-full overflow-hidden w-[150px] h-[150px] sm:w-[176px] sm:h-[176px] " +
      "bg-[radial-gradient(circle_at_50%_42%,rgba(167,139,250,0.35),rgba(139,92,246,0.12)_62%,transparent_72%)] " +
      "ring-2 ring-violet-400/40 hover:ring-violet-300/70 " +
      "focus:outline focus:outline-2 focus:outline-white/80",
    onclick: () => openClass(unit, user),
    "aria-label": "Hablar con " + name + " para elegir que practicar",
  }, face);

  // Las 6 competencias ORBITANDO a Bymax en un circulo real (posicion absoluta
  // calculada con seno/coseno). Contenedor cuadrado y responsivo.
  const ring = orbit(center,
    ORBIT.map((key) => skillPop(key, unit, progressMap, user, onSkillDone)));

  // Fila de POPs pequenos: examen, cuento, videollamada (llamada EN VIVO con la
  // IA, manos libres), input gramatical y -si el idioma tiene guia- pronunciacion.
  const extraPops = [
    examPop(unit, progressMap),
    miniPop("Cuento", "Lee y escucha", ICONS.book, "from-indigo-500 to-fuchsia-600", () => openStory(unit)),
    miniPop("Videollamada", "Llamada en vivo IA", SKILL_META.speaking.icon, "from-sky-500 to-cyan-600",
      () => openVoiceCall({ title: unit.title, level: unit.level, label: "Videollamada", targetLang: unit.language || "en", userId: user?.id })),
    grammarInputPop(unit, user),
  ];
  if (hasPronunciation(unit.language || "en")) {
    extraPops.push(miniPop("Pronuncia", "Afina el oido", ICONS.sound, "from-cyan-500 to-sky-600",
      () => openPronunciationLab(unit)));
  }
  if (hasCheckpoint(unit)) {
    extraPops.push(miniPop("Repaso", "Mezcla unidades", ICONS.target, "from-rose-500 to-pink-600",
      () => openCheckpoint(unit, { userId: user?.id })));
  }
  const extras = el("div", { class: "mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3" }, ...extraPops);

  // Bonos como POPs pequenos tipo pastilla. En INGLES: la lista curada
  // (gramatica + vocabulario del nivel). En otros idiomas: sus mazos propios
  // (ej. portugues -> falsos amigos + verbos irregulares).
  const lang = unit.language || "en";
  let pills;
  if (lang === "en") {
    const vocabDecks = VOCAB_DECKS.filter((d) => d.level === unit.level);
    pills = [
      ...BONUS_LINKS.map((b) => bonusPill(b.id, b.label, "amber")),
      ...vocabDecks.map((d) => bonusPill(d.id, d.title, "sky")),
    ];
  } else {
    pills = bonusDecksForLanguage(lang).map((d) => bonusPill(d.id, d.title, "amber"));
  }
  const bonusPops = pills.length ? el("section", { class: "mt-6" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-2" }, "Bonos"),
    el("div", { class: "flex flex-wrap gap-2" }, ...pills)) : null;

  return el("div", {},
    el("div", { class: "flex items-center gap-2 mb-3" },
      el("h2", { class: "font-bold text-lg" }, "Tu clase con " + name),
      el("span", { class: "text-[10px] font-black tracking-widest bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full" }, "NUEVO")),
    el("p", { class: "text-sm text-slate-400 mb-4" },
      "Toca a " + name + " para que te guie, o elige una competencia y te la explica al momento."),
    ring,
    extras,
    boletinButton(unit, progressMap, user),
    notebookButton(unit, user),
    bonusPops);
}

/** Boton "Cuaderno de la unidad": errores acumulados + vocabulario + pronombres
 * del capitulo (repaso y estudio). La profe lo llena al terminar cada clase. */
function notebookButton(unit, user) {
  return el("button", {
    type: "button",
    class: "mt-3 w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white shadow-lg " +
      "bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70",
    onclick: () => openNotebook(unit, user),
    "aria-label": "Abrir el cuaderno de la unidad (errores, vocabulario y pronombres)",
  },
    el("span", { class: "w-6 h-6", html: ICONS.book }),
    el("span", {}, "Cuaderno de la unidad"));
}

/** Boton "Boletin de la unidad": abre el resumen/calificacion. Relee el progreso
 * fresco para reflejar lo recien hecho. Se resalta si la unidad ya esta completa. */
function boletinButton(unit, progressMap, user) {
  const complete = isUnitComplete(unit, progressMap);
  const open = async () => {
    const fresh = user?.id ? await getCourseProgress(user.id) : progressMap;
    openUnitReport(unit, fresh, user);
  };
  return el("button", {
    type: "button",
    class: "mt-5 w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white shadow-lg " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70 " +
      (complete ? "bg-gradient-to-r from-emerald-500 to-teal-600" : "bg-gradient-to-r from-sky-600 to-indigo-700"),
    onclick: open,
    "aria-label": "Ver el boletin de resultados de la unidad",
  },
    el("span", { class: "w-6 h-6", html: ICONS.star }),
    el("span", {}, complete ? "Ver bolet\u00edn de la unidad" : "Bolet\u00edn de la unidad (resumen)"));
}

/**
 * Coloca los POPs de competencia en un CIRCULO real alrededor del centro.
 * Contenedor cuadrado y responsivo; cada POP se posiciona con seno/coseno.
 * @param {HTMLElement} center - POP central (Bymax)
 * @param {HTMLElement[]} pops - POPs de competencia (en orden horario desde arriba)
 */
function orbit(center, pops) {
  const n = pops.length;
  const placed = pops.map((pop, i) => {
    // Arranca arriba (-90 grados) y avanza en sentido horario.
    const ang = (-90 + (360 / n) * i) * (Math.PI / 180);
    const x = 50 + ORBIT_RADIUS * Math.cos(ang);
    const y = 50 + ORBIT_RADIUS * Math.sin(ang);
    return el("div", {
      class: "absolute -translate-x-1/2 -translate-y-1/2",
      style: `left:${x.toFixed(2)}%;top:${y.toFixed(2)}%`,
    }, pop);
  });
  const centerWrap = el("div", {
    class: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  }, center);
  return el("div", { class: "relative mx-auto w-full max-w-[460px] aspect-square my-2" },
    centerWrap, ...placed);
}

/**
 * POP de una competencia. Al tocarlo, Bymax da la clase de esa skill con el
 * contenido real de la unidad. Muestra un check si ya se completo su leccion.
 */
function skillPop(key, unit, progressMap, user, onSkillDone) {
  const meta = SKILL_META[key];
  const lesson = lessonForSkill(unit, key);
  // Al terminar una competencia: dispara el enganche de la unidad (revisa si ya
  // esta completa para abrir el boletin). Sin esto, el clic moria con
  // ReferenceError (markDone no existia) -> "no pasa nada".
  const markDone = () => onSkillDone?.();
  // Check: speaking usa id sintetico; el resto, el id de su leccion.
  const doneId = key === "speaking" ? "speaking-" + unit.id : lesson?.id;
  const done = doneId ? progressMap[doneId]?.status === "done" : false;
  const check = el("span", { class: "absolute top-1 right-1 w-5 h-5 text-white bg-emerald-600/80 rounded-full p-0.5" + (done ? "" : " hidden"), html: ICONS.check });

  // Reading = lectura en voz alta con feedback de pronunciacion de Bymax.
  // Speaking = escucha y repite (Bymax dice, tu repites; autoevaluacion sin mic).
  // El resto de competencias = clase interactiva con Bymax.
  let onclick;
  if (key === "reading") {
    onclick = () => openReadingLab(unit, {
      userId: user?.id, progressId: lesson?.id,
      onComplete: markDone,
    });
  } else if (key === "speaking") {
    onclick = () => openSpeaking(unit, {
      repeat: true, userId: user?.id, progressId: "speaking-" + unit.id,
      onComplete: markDone,
    });
  } else if (key === "listening") {
    onclick = () => openListeningLab(unit, {
      userId: user?.id,
      onComplete: markDone,
    });
  } else if (key === "writing") {
    onclick = () => openWriting(unit, {
      userId: user?.id,
      onComplete: markDone,
    });
  } else if (key === "vocabulary") {
    onclick = () => openVocabClass(unit, {
      userId: user?.id, progressId: lesson?.id,
      onComplete: markDone,
    });
  } else {
    onclick = () => openSkillClass(unit, key, {
      userId: user?.id,
      onComplete: markDone,
    });
  }

  return el("button", {
    type: "button",
    class: `relative flex flex-col items-center justify-center gap-0.5 rounded-full ` +
      `w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] px-1 text-center ` +
      `bg-gradient-to-br ${meta.gradient} shadow-lg text-white ` +
      "hover:brightness-110 hover:scale-105 transition-transform " +
      "focus:outline focus:outline-2 focus:outline-white/80",
    onclick,
    "aria-label": (key === "reading" ? "Reading Lab (comprensi\u00f3n) de " : key === "speaking" ? "Escucha y repite: " : key === "listening" ? "Listening Lab (escucha una historia): " : key === "writing" ? "Escritura: " : key === "vocabulary" ? "Vocab Lab: " : "Clase de ") + meta.label + " con " + robotName(),
  },
    check,
    el("span", { class: "w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/15 grid place-items-center", html: meta.icon }),
    el("span", { class: "font-bold text-[10px] sm:text-xs leading-none" }, meta.label));
}

/** POP del examen de unidad (paso final para desbloquear la siguiente). */
function examPop(unit, progressMap) {
  const test = (unit.lessons || []).find((l) => l.kind === "test");
  if (!test) return el("div");
  const done = progressMap[test.id]?.status === "done";
  return el("a", {
    href: `#/leccion/${test.id}`,
    class: "flex flex-col items-center justify-center gap-1 rounded-2xl p-3 min-h-[92px] text-white shadow-lg " +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70 text-center " +
      (done ? "bg-gradient-to-br from-emerald-500 to-teal-600" : "bg-gradient-to-br from-amber-500 to-orange-600"),
    "aria-label": done ? "Examen de unidad aprobado, repasar" : "Examen de unidad, necesario para pasar",
  },
    el("span", { class: "w-7 h-7", html: done ? ICONS.check : ICONS.star }),
    el("span", { class: "font-bold text-sm leading-tight" }, "Examen"),
    el("span", { class: "text-[10px] font-black tracking-widest bg-black/25 px-2 py-0.5 rounded-full" },
      done ? "APROBADO" : "PARA PASAR"));
}

/** POP de INPUT ESTRUCTURADO (Structured Input, VanPatten): procesar la forma
 * para captar el significado. Determinista (core/grammar-si.js). Si la unidad no
 * da variedad suficiente, cae a la clase de gramática con Bymax. */
function grammarInputPop(unit, user) {
  const grammarLesson = lessonForSkill(unit, "grammar");
  const onclick = () => {
    const ok = openGrammarInput(unit, { userId: user?.id, progressId: grammarLesson?.id });
    if (!ok) openSkillClass(unit, "grammar", { userId: user?.id });
  };
  return miniPop("Input gram.", "Procesa la forma", ICONS.grid, "from-violet-500 to-purple-600", onclick);
}

/** POP pequeno generico (cuento, conversacion, anti-errores). */
function miniPop(label, sub, icon, gradient, onclick) {
  return el("button", {
    type: "button",
    class: `flex flex-col items-center justify-center gap-1 rounded-2xl p-3 min-h-[92px] text-white shadow-lg ` +
      `bg-gradient-to-br ${gradient} hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/70 text-center`,
    onclick,
    "aria-label": label + ": " + sub,
  },
    el("span", { class: "w-7 h-7", html: icon }),
    el("span", { class: "font-bold text-sm leading-tight" }, label),
    el("span", { class: "text-[10px] text-white/80 leading-tight" }, sub));
}

/** Pastilla de bono (verbos = ambar, vocabulario = azul). */
function bonusPill(id, label, tone) {
  const tones = {
    amber: "bg-amber-500/15 text-amber-200 border-amber-500/30 hover:bg-amber-500/25 focus:outline-amber-400",
    sky: "bg-sky-500/15 text-sky-200 border-sky-500/30 hover:bg-sky-500/25 focus:outline-sky-400",
  };
  return el("a", {
    href: `#/bonus/${id}`,
    class: "text-sm px-4 py-2 rounded-full border focus:outline focus:outline-2 " + (tones[tone] || tones.amber),
  }, label);
}
