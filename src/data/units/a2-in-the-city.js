/**
 * data/units/a2-in-the-city.js — Unidad tematica "In the city" (A2).
 *
 * Datos PUROS. Dar y seguir direcciones con imperativos y preposiciones de
 * movimiento. Ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
 */

export const A2_IN_THE_CITY = {
  id: "a2-in-the-city",
  language: "en",
  level: "A2",
  title: "In the city",
  subtitle: "Pedir y dar direcciones para moverte por la ciudad",

  cando: [
    "Puedo pedir direcciones de forma educada.",
    "Puedo dar direcciones con imperativos (turn, go, take).",
    "Puedo nombrar lugares comunes de la ciudad.",
    "Puedo usar preposiciones de lugar y movimiento.",
  ],

  vocab: [
    { id: "a2ci-1", term: "street", translation: "calle", example: "Go down this street." },
    { id: "a2ci-2", term: "corner", translation: "esquina", example: "The shop is on the corner." },
    { id: "a2ci-3", term: "to turn", translation: "girar / doblar", example: "Turn left at the bank." },
    { id: "a2ci-4", term: "straight", translation: "recto / derecho", example: "Go straight ahead." },
    { id: "a2ci-5", term: "bank", translation: "banco", example: "The bank is next to the park." },
    { id: "a2ci-6", term: "square", translation: "plaza", example: "The square is very big." },
    { id: "a2ci-7", term: "station", translation: "estacion", example: "The train station is near." },
    { id: "a2ci-8", term: "between", translation: "entre", example: "It's between the bank and the cafe." },
    { id: "a2ci-9", term: "opposite", translation: "enfrente de", example: "The hotel is opposite the park." },
    { id: "a2ci-10", term: "to cross", translation: "cruzar", example: "Cross the street here." },
  ],

  lessons: [
    {
      id: "a2ci-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: como llegar",
      intro:
        "Lee las instrucciones y estudia los imperativos y las preposiciones. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Excuse me, how do I get to the train station? It's easy. Go straight ahead down this " +
          "street. Turn left at the bank and cross the square. The station is on the corner, " +
          "opposite the park, between a cafe and a supermarket. It takes about five minutes on foot. " +
          "You can't miss it!",
        glossary: [
          { term: "go straight ahead", translation: "sigue derecho" },
          { term: "turn left / right", translation: "gira a la izquierda / derecha" },
          { term: "cross", translation: "cruza" },
          { term: "on the corner", translation: "en la esquina" },
          { term: "opposite", translation: "enfrente de" },
          { term: "between", translation: "entre" },
        ],
        keyPhrases: [
          "How do I get to...? (Como llego a...?)",
          "Go straight / Turn left / Cross... (imperativos)",
          "It's on the corner / opposite... (Esta en la esquina / enfrente...)",
          "You can't miss it! (No tiene perdida!)",
        ],
        note:
          "Para dar direcciones usamos el IMPERATIVO (verbo base sin sujeto): 'Turn left', 'Go straight', " +
          "'Cross the street'. Las preposiciones ubican: on the corner, opposite, between, next to.",
        grammar: {
          title: "Imperativos para direcciones",
          form: "verbo base (+ complemento): Turn left. Go straight. Cross the street.",
          examples: [
            "Turn right at the bank.",
            "Go straight ahead.",
          ],
          mistakes: [
            { wrong: "You turn to left.", right: "Turn left." },
            { wrong: "Go to straight.", right: "Go straight." },
          ],
        },
        check: [
          { prompt: "Where do you turn left?", choices: ["At the park", "At the bank", "At the cafe"], answer: 1 },
          { prompt: "The station is opposite the...", choices: ["Park", "River", "School"], answer: 0 },
        ],
      },
      activities: [],
    },
    {
      id: "a2ci-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: pedir direcciones",
      intro: "Para pedir usamos 'Excuse me, how do I get to...?'. Lee el dialogo.",
      dialogue: [
        "A: Excuse me, how do I get to the museum?",
        "B: Go straight ahead and turn right at the corner.",
        "A: Is it far?",
        "B: No, it's opposite the square. About two minutes.",
      ],
      activities: [
        {
          id: "a2ci-l1-a1", type: "multiple_choice",
          prompt: "How do you ask for directions politely?",
          payload: { choices: ["Where is museum?", "Excuse me, how do I get to the museum?", "Museum where?"], answer: 1 },
          explain: "'Excuse me, how do I get to...?' es educado y natural.",
        },
        {
          id: "a2ci-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "corner", right: "esquina" },
            { left: "straight", right: "recto" },
            { left: "between", right: "entre" },
          ] },
        },
      ],
    },
    {
      id: "a2ci-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: imperativos y lugares",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2ci-l2-a1", type: "cloze",
          prompt: "Completa: '___ left at the bank.' (gira)",
          payload: { answer: "Turn" },
          explain: "Imperativo: 'Turn left'.",
        },
        {
          id: "a2ci-l2-a2", type: "cloze",
          prompt: "Completa: 'Go ___ ahead.' (recto)",
          payload: { answer: "straight" },
          explain: "'Go straight ahead' = sigue derecho.",
        },
        {
          id: "a2ci-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "Cross the street here.",
            "You crossing the street here.",
            "To cross the street here.",
          ], answer: 0 },
          explain: "El imperativo es el verbo base: 'Cross the street'.",
        },
        {
          id: "a2ci-l2-a4", type: "word_bank",
          prompt: "Ordena la instruccion:",
          payload: { words: ["right", "the", "Turn", "at", "corner"],
                     answer: ["Turn", "right", "at", "the", "corner"] },
          explain: "Orden: Turn + right + at + the + corner.",
        },
        {
          id: "a2ci-l2-a5", type: "cloze",
          prompt: "Completa: 'The hotel is ___ the park.' (enfrente de)",
          payload: { answer: "opposite" },
          explain: "'Opposite' = enfrente de.",
        },
      ],
    },
    {
      id: "a2ci-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: da direcciones",
      intro: "Tarea real: construye instrucciones para llegar a un lugar. Ordena cada frase.",
      activities: [
        {
          id: "a2ci-l3-a1", type: "word_bank",
          prompt: "Di que sigan derecho:",
          payload: { words: ["straight", "Go", "ahead"], answer: ["Go", "straight", "ahead"] },
        },
        {
          id: "a2ci-l3-a2", type: "word_bank",
          prompt: "Di que giren a la izquierda:",
          payload: { words: ["left", "Turn"], answer: ["Turn", "left"] },
        },
        {
          id: "a2ci-l3-a3", type: "word_bank",
          prompt: "Pregunta como llegar a la estacion:",
          payload: { words: ["get", "How", "do", "I", "to", "the", "station?"],
                     answer: ["How", "do", "I", "get", "to", "the", "station?"] },
        },
        {
          id: "a2ci-l3-a4", type: "multiple_choice",
          prompt: "Which word means 'cruzar'?",
          payload: { choices: ["turn", "cross", "corner"], answer: 1 },
        },
      ],
    },
  ],
};
