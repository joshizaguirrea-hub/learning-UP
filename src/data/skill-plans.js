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
    A2: {
      focus: "Narrar en pasado, comparar y hablar del futuro con going to y will.",
      canDo: [
        "Uso el pasado simple (regular e irregular) y el past continuous.",
        "Comparo con comparativos y superlativos (-er, the -est, more).",
        "Hablo del futuro con 'going to' y 'will'; doy consejos con 'should'.",
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
    B2: {
      focus: "Dominar estructuras complejas: pasiva avanzada, condicionales y estilo indirecto.",
      canDo: [
        "Uso la pasiva en varios tiempos y el causative (have something done).",
        "Reporto preguntas y ordenes; uso relativas explicativas.",
        "Manejo condicionales (3ro y mixtos) y modales perfectos.",
      ],
    },
    C1: {
      focus: "Estructuras avanzadas para dar enfasis y matiz: inversion, cleft y subjuntivo.",
      canDo: [
        "Uso la inversion (Never have I...) y las cleft sentences.",
        "Empleo el subjuntivo en propuestas y demandas formales.",
        "Manejo el idioma con flexibilidad y precision.",
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
    A2: {
      focus: "Manejar temas cotidianos: viajes, ciudad, salud, deporte y trabajo.",
      canDo: [
        "Uso vocabulario de viajes, transporte y la ciudad.",
        "Hablo de salud, sintomas y consejos.",
        "Uso vocabulario de deporte, tiempo libre y oficios.",
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
    B2: {
      focus: "Vocabulario de temas abstractos: ciencia, arte, sociedad y economia, con colocaciones.",
      canDo: [
        "Uso vocabulario de trabajo, ciencia, arte y sociedad.",
        "Empleo colocaciones y expresiones mas naturales.",
        "Distingo registro formal e informal.",
      ],
    },
    C1: {
      focus: "Vocabulario academico y de especialidad, con matices y lenguaje figurado.",
      canDo: [
        "Uso vocabulario academico y tecnico con precision.",
        "Manejo colocaciones sofisticadas y matices semanticos.",
        "Reconozco lenguaje figurado y registro.",
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
    A2: {
      focus: "Entender textos cortos, anuncios, correos personales e historias simples.",
      canDo: [
        "Entiendo correos personales y anuncios cortos.",
        "Sigo una historia narrada en pasado.",
        "Identifico ideas principales y detalles simples.",
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
    B2: {
      focus: "Leer articulos de opinion e inferir tono, actitud e intencion.",
      canDo: [
        "Entiendo articulos y textos semi-tecnicos.",
        "Infiero el tono y la actitud del autor.",
        "Sigo argumentos con pros y contras.",
      ],
    },
    C1: {
      focus: "Interpretar textos largos y exigentes, incluido el sentido implicito.",
      canDo: [
        "Interpreto textos academicos, tecnicos y de opinion complejos.",
        "Capto el sentido implicito y la actitud del autor.",
        "Sintetizo informacion de varias fuentes.",
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
    A2: {
      focus: "Escribir notas, correos personales y descripciones cortas.",
      canDo: [
        "Escribo una nota o mensaje personal simple.",
        "Describo una experiencia pasada por escrito.",
        "Escribo sobre mis planes con going to / will.",
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
    B2: {
      focus: "Escribir textos claros y detallados: ensayos de opinion e informes.",
      canDo: [
        "Escribo un ensayo de opinion con estructura.",
        "Defiendo un punto de vista con argumentos.",
        "Uso conectores del discurso con soltura.",
      ],
    },
    C1: {
      focus: "Producir textos bien estructurados: ensayos, informes y propuestas.",
      canDo: [
        "Escribo textos extensos con cohesion avanzada.",
        "Adapto el registro al proposito y la audiencia.",
        "Uso estructuras enfaticas por efecto estilistico.",
      ],
    },
  },
  listening: {
    A1: {
      focus: "Captar numeros, horas y preguntas personales dichas despacio. (Requiere audio: proximamente)",
      canDo: [],
    },
    A2: {
      focus: "Seguir conversaciones simples y mensajes claros. (Requiere audio: proximamente)",
      canDo: [],
    },
    B1: {
      focus: "Comprender audios cortos de situaciones cotidianas. (Requiere audio: proximamente)",
      canDo: [],
    },
    B2: {
      focus: "Seguir debates, conferencias y contenido nativo semi-rapido. (Requiere audio: proximamente)",
      canDo: [],
    },
    C1: {
      focus: "Entender casi todo, incluido lo implicito y actitudinal. (Requiere audio: proximamente)",
      canDo: [],
    },
  },
  speaking: {
    A1: {
      focus: "Presentarse y responder preguntas personales basicas. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
    A2: {
      focus: "Describir experiencias, planes y dar opiniones simples. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
    B1: {
      focus: "Mantener conversaciones sencillas sobre temas conocidos. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
    B2: {
      focus: "Debatir, matizar y sostener un discurso extendido. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
    C1: {
      focus: "Discurso fluido, flexible y apropiado al contexto. (Requiere IA/voz: proximamente)",
      canDo: [],
    },
  },
};

/** Descriptor de una competencia en un nivel (o null). */
export function skillPlan(skill, level) {
  return SKILL_PLANS[skill]?.[level] || null;
}
