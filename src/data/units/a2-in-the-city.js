/**
 * data/units/a2-in-the-city.js — Unidad tematica "In the city" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
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
    // ================= READING =================
    {
      id: "a2ci-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: como llegar",
      intro: "Competencia de LECTURA. Lee las instrucciones y comprueba que entendiste.",
      content: {
        reading:
          "Excuse me, how do I get to the train station? It's easy. Go straight ahead down this " +
          "street. Turn left at the bank and cross the square. The station is on the corner, " +
          "opposite the park, between a cafe and a supermarket. It takes about five minutes on foot. " +
          "You can't miss it!",
        keyPhrases: [
          "Sigue la ruta paso a paso mentalmente.",
          "Ubica la estacion: esquina, enfrente, entre que cosas.",
        ],
        check: [
          { prompt: "Where do you turn left?", choices: ["At the park", "At the bank", "At the cafe"], answer: 1 },
          { prompt: "The station is opposite the...", choices: ["Park", "River", "School"], answer: 0 },
          { prompt: "How long does it take on foot?", choices: ["Five minutes", "Twenty minutes", "One hour"], answer: 0 },
          { prompt: "The station is between a cafe and a...", choices: ["Bank", "Supermarket", "Hotel"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2ci-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: lugares y ubicacion",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "street / corner", translation: "calle / esquina" },
        { term: "bank / square", translation: "banco / plaza" },
        { term: "station", translation: "estacion" },
        { term: "between", translation: "entre" },
        { term: "opposite", translation: "enfrente de" },
        { term: "to cross / to turn", translation: "cruzar / girar" },
      ],
      activities: [
        {
          id: "a2ci-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "corner", right: "esquina" },
            { left: "straight", right: "recto" },
            { left: "between", right: "entre" },
          ] },
        },
        {
          id: "a2ci-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'cruzar'?",
          payload: { choices: ["turn", "cross", "corner"], answer: 1 },
          explain: "'Cross' = cruzar.",
        },
        {
          id: "a2ci-vocab-a3", type: "cloze",
          prompt: "Completa: 'The hotel is ___ the park.' (enfrente de)",
          payload: { answer: "opposite" },
          explain: "'Opposite' = enfrente de.",
        },
        {
          id: "a2ci-vocab-a4", type: "multiple_choice",
          prompt: "Where do you catch a train?",
          payload: { choices: ["bank", "station", "square"], answer: 1 },
          explain: "'Station' = estacion.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2ci-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: imperativos",
      intro: "Competencia de GRAMATICA. Aprende los imperativos para dar direcciones.",
      grammar: {
        title: "Imperativos para direcciones",
        form: "verbo base (+ complemento): Turn left. Go straight. Cross the street.",
        examples: ["Turn right at the bank.", "Go straight ahead."],
        mistakes: [
          { wrong: "You turn to left.", right: "Turn left." },
          { wrong: "Go to straight.", right: "Go straight." },
        ],
      },
      activities: [
        {
          id: "a2ci-gram-a1", type: "cloze",
          prompt: "Completa: '___ left at the bank.' (gira)",
          payload: { answer: "Turn" },
          explain: "Imperativo: 'Turn left'.",
        },
        {
          id: "a2ci-gram-a2", type: "cloze",
          prompt: "Completa: 'Go ___ ahead.' (recto)",
          payload: { answer: "straight" },
          explain: "'Go straight ahead' = sigue derecho.",
        },
        {
          id: "a2ci-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["Cross the street here.", "You crossing the street here.", "To cross the street here."], answer: 0 },
          explain: "El imperativo es el verbo base: 'Cross the street'.",
        },
        {
          id: "a2ci-gram-a4", type: "word_bank",
          prompt: "Ordena la instruccion:",
          payload: { words: ["right", "the", "Turn", "at", "corner"], answer: ["Turn", "right", "at", "the", "corner"] },
          explain: "Orden: Turn + right + at + the + corner.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2ci-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: da direcciones",
      intro: "Competencia de ESCRITURA. Construye instrucciones para llegar a un lugar. Ordena cada frase.",
      activities: [
        {
          id: "a2ci-write-a1", type: "word_bank",
          prompt: "Di que sigan derecho:",
          payload: { words: ["straight", "Go", "ahead"], answer: ["Go", "straight", "ahead"] },
        },
        {
          id: "a2ci-write-a2", type: "word_bank",
          prompt: "Di que giren a la izquierda:",
          payload: { words: ["left", "Turn"], answer: ["Turn", "left"] },
        },
        {
          id: "a2ci-write-a3", type: "word_bank",
          prompt: "Pregunta como llegar a la estacion:",
          payload: { words: ["get", "How", "do", "I", "to", "the", "station?"], answer: ["How", "do", "I", "get", "to", "the", "station?"] },
        },
        {
          id: "a2ci-write-a4", type: "multiple_choice",
          prompt: "How do you ask for directions politely?",
          payload: { choices: ["Where is museum?", "Excuse me, how do I get to the museum?", "Museum where?"], answer: 1 },
        },
      ],
    },
  ],
};
