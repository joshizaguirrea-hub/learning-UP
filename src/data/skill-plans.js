/**
 * data/skill-plans.js — Descriptores de cada competencia por nivel (datos puros).
 *
 * Define QUE se aprende en cada competencia segun el nivel MCER: el foco y los
 * objetivos "can-do". El plan concreto (lecciones) se arma filtrando las
 * lecciones del curso que entrenan esa competencia (ver features/competency.js).
 *
 * Estructura: SKILL_PLANS[skill][level] = { focus, canDo[] }
 */
export const SKILL_PLANS = {
  grammar: {
    A1: {
      focus: "Construir frases simples con el verbo 'to be', present simple y have got.",
      canDo: [
        "Uso el verbo 'to be' (I am, you are, he is).",
        "Formo el present simple para rutinas (I work, she works).",
        "Uso 'have got' y los adjetivos posesivos (my, your, her).",
      ],
    },
    B1: {
      focus: "Consolidar tiempos verbales y estructuras para expresar planes, condiciones y responsabilidades.",
      canDo: [
        "Uso 'going to' y 'will' para hablar del futuro.",
        "Formo el primer condicional (If + presente, will + verbo).",
        "Describo responsabilidades con 'in charge of / responsible for'.",
      ],
    },
  },
  vocabulary: {
    A1: {
      focus: "Aprender palabras de alta frecuencia: saludos, familia, rutinas, numeros y colores.",
      canDo: [
        "Reconozco y uso saludos y datos personales.",
        "Nombro a los miembros de la familia.",
        "Uso vocabulario de la rutina diaria y la hora.",
      ],
    },
    B1: {
      focus: "Ampliar vocabulario de trabajo y viajes, con conectores para dar fluidez.",
      canDo: [
        "Uso vocabulario de trabajo (deadline, colleague, promotion...).",
        "Uso vocabulario de viajes (flight, to book, luggage...).",
        "Conecto ideas con however, although, so, because.",
      ],
    },
  },
  reading: {
    A1: {
      focus: "Entender textos muy cortos: letreros, formularios y descripciones simples.",
      canDo: [
        "Entiendo presentaciones y descripciones personales cortas.",
        "Reconozco palabras clave en textos muy simples.",
        "Identifico datos concretos (nombre, pais, hora).",
      ],
    },
    B1: {
      focus: "Leer textos cortos reales e inferir significado por contexto.",
      canDo: [
        "Entiendo historias y correos de nivel intermedio.",
        "Deduzco el significado de palabras nuevas por el contexto.",
        "Identifico la idea principal y detalles.",
      ],
    },
  },
  writing: {
    A1: {
      focus: "Escribir frases muy simples para presentarse y describir personas.",
      canDo: [
        "Escribo frases para presentarme (name, country, job).",
        "Describo a mi familia con frases simples.",
        "Completo formularios con datos personales.",
      ],
    },
    B1: {
      focus: "Escribir correos y mensajes claros y bien estructurados.",
      canDo: [
        "Escribo un correo profesional sencillo.",
        "Escribo un correo para reservar o pedir informacion.",
        "Uso saludos y despedidas apropiados.",
      ],
    },
  },
  listening: {
    A1: {
      focus: "Captar numeros, horas y preguntas personales dichas despacio. (Requiere audio: proximamente)",
      canDo: [],
    },
    B1: {
      focus: "Comprender audios cortos de situaciones cotidianas. (Requiere audio: proximamente)",
      canDo: [],
    },
  },
  speaking: {
    A1: {
      focus: "Presentarse y responder preguntas personales basicas. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
    B1: {
      focus: "Mantener conversaciones sencillas sobre temas conocidos. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
  },
};

/** Descriptor de una competencia en un nivel (o null). */
export function skillPlan(skill, level) {
  return SKILL_PLANS[skill]?.[level] || null;
}
