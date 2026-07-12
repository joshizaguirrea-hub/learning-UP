/**
 * data/units/a1-yesterday.js — Unidad tematica "Yesterday" (A1).
 *
 * Datos PUROS. Introduccion al pasado: was/were y past simple de verbos comunes.
 * Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
 */

export const A1_YESTERDAY = {
  id: "a1-yesterday",
  language: "en",
  level: "A1",
  title: "Yesterday",
  subtitle: "Hablar de cosas pasadas con was/were y el pasado simple",

  cando: [
    "Puedo usar 'was' y 'were' para el pasado del verbo to be.",
    "Puedo formar el pasado simple de verbos regulares comunes.",
    "Puedo contar lo que hice ayer de forma simple.",
    "Puedo usar expresiones de tiempo pasado (yesterday, last week).",
  ],

  vocab: [
    { id: "a1y-1", term: "yesterday", translation: "ayer", example: "I was busy yesterday." },
    { id: "a1y-2", term: "last week", translation: "la semana pasada", example: "We travelled last week." },
    { id: "a1y-3", term: "weekend", translation: "fin de semana", example: "The weekend was great." },
    { id: "a1y-4", term: "to watch", translation: "ver / mirar", example: "I watched a movie." },
    { id: "a1y-5", term: "to play", translation: "jugar", example: "They played football." },
    { id: "a1y-6", term: "to visit", translation: "visitar", example: "We visited our grandmother." },
    { id: "a1y-7", term: "to stay", translation: "quedarse", example: "I stayed at home." },
    { id: "a1y-8", term: "tired", translation: "cansado", example: "My parents were tired." },
    { id: "a1y-9", term: "happy", translation: "feliz / contento", example: "She was happy to see us." },
    { id: "a1y-10", term: "ago", translation: "hace (tiempo)", example: "Two days ago." },
  ],

  lessons: [
    // ---------------- APRENDE ----------------
    {
      id: "a1y-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: el fin de semana pasado",
      intro:
        "Lee lo que hizo una persona y estudia was/were y el pasado simple regular. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Last weekend was great. On Saturday, I was at home. I watched a movie and I played " +
          "video games with my brother. On Sunday, we visited our grandmother. She was very " +
          "happy to see us. In the afternoon, my parents were tired, so we stayed at home. " +
          "It was a nice and relaxing weekend.",
        glossary: [
          { term: "was", translation: "estaba / fue (I/he/she/it)" },
          { term: "were", translation: "estaban / eran (you/we/they)" },
          { term: "watched", translation: "vi / miro (pasado de watch)" },
          { term: "played", translation: "jugue / jugo (pasado de play)" },
          { term: "visited", translation: "visite / visito (pasado de visit)" },
          { term: "stayed", translation: "me quede (pasado de stay)" },
        ],
        keyPhrases: [
          "I was... / They were... (Yo estaba... / Ellos estaban...)",
          "I watched / played / visited... (Vi / jugue / visite...)",
          "Last weekend / yesterday... (El fin de semana pasado / ayer...)",
          "It was a nice day. (Fue un buen dia.)",
        ],
        note:
          "Pasado del verbo to be: I/he/she/it -> was; you/we/they -> were. Para verbos regulares " +
          "en pasado agregamos -ed: watch -> watched, play -> played, visit -> visited.",
        grammar: {
          title: "was/were y pasado regular (-ed)",
          form: "was (I/he/she/it) · were (you/we/they) · verbo + ed (regular)",
          examples: [
            "I was at home.",
            "They were happy.",
            "She watched a movie.",
          ],
          mistakes: [
            { wrong: "I were tired.", right: "I was tired." },
            { wrong: "We was happy.", right: "We were happy." },
          ],
        },
        check: [
          { prompt: "Where was the person on Saturday?", choices: ["At school", "At home", "At work"], answer: 1 },
          { prompt: "Who did they visit on Sunday?", choices: ["A friend", "Grandmother", "A teacher"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1y-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: preguntar por el pasado",
      intro:
        "Para hablar del pasado usamos 'was/were' y verbos con -ed. Lee el dialogo.",
      dialogue: [
        "A: Where were you yesterday?",
        "B: I was at home. I watched a movie.",
        "A: Nice! Was it good?",
        "B: Yes, it was great!",
      ],
      activities: [
        {
          id: "a1y-l1-a1", type: "multiple_choice",
          prompt: "Which is correct for 'I' in the past?",
          payload: { choices: ["I were happy.", "I was happy.", "I is happy."], answer: 1 },
          explain: "Con 'I' en pasado usamos 'was': I was happy.",
        },
        {
          id: "a1y-l1-a2", type: "matching",
          prompt: "Empareja el verbo con su pasado:",
          payload: { pairs: [
            { left: "watch", right: "watched" },
            { left: "play", right: "played" },
            { left: "visit", right: "visited" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1y-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: was/were y -ed",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1y-l2-a1", type: "cloze",
          prompt: "Completa: 'They ___ happy.' (estaban)",
          payload: { answer: "were" },
          explain: "Con they/we/you usamos 'were'.",
        },
        {
          id: "a1y-l2-a2", type: "cloze",
          prompt: "Completa: 'I ___ a movie last night.' (ver -> pasado)",
          payload: { answer: "watched" },
          explain: "Pasado regular: watch + ed = watched.",
        },
        {
          id: "a1y-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She were at home.",
            "She was at home.",
            "She is at home yesterday.",
          ], answer: 1 },
          explain: "Con 'she' en pasado usamos 'was'.",
        },
        {
          id: "a1y-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["football", "played", "We", "yesterday"],
                     answer: ["We", "played", "football", "yesterday"] },
          explain: "Orden: We + played + football + yesterday.",
        },
        {
          id: "a1y-l2-a5", type: "cloze",
          prompt: "Completa: 'We ___ our grandmother.' (visitar -> pasado)",
          payload: { answer: "visited" },
          explain: "Pasado regular: visit + ed = visited.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1y-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: cuenta tu fin de semana",
      intro:
        "Tarea real: construye frases sobre lo que hiciste. Ordena cada frase.",
      activities: [
        {
          id: "a1y-l3-a1", type: "word_bank",
          prompt: "Di donde estabas ayer:",
          payload: { words: ["home", "I", "at", "was", "yesterday"],
                     answer: ["I", "was", "at", "home", "yesterday"] },
        },
        {
          id: "a1y-l3-a2", type: "word_bank",
          prompt: "Di que viste una pelicula:",
          payload: { words: ["a", "I", "movie", "watched"],
                     answer: ["I", "watched", "a", "movie"] },
        },
        {
          id: "a1y-l3-a3", type: "word_bank",
          prompt: "Di que visitaste a tu abuela:",
          payload: { words: ["grandmother", "I", "my", "visited"],
                     answer: ["I", "visited", "my", "grandmother"] },
        },
        {
          id: "a1y-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'ayer'?",
          payload: { choices: ["yesterday", "tomorrow", "today"], answer: 0 },
        },
      ],
    },
  ],
};
