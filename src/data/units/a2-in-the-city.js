/**
 * data/units/a2-in-the-city.js — Unidad tematica "In the city" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a2ci-11", term: "traffic lights", translation: "semaforo", example: "Turn right at the traffic lights." },
    { id: "a2ci-12", term: "roundabout", translation: "rotonda / glorieta", example: "Take the second exit at the roundabout." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2ci-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: como llegar",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - To the station\n" +
          "Excuse me, how do I get to the train station? It's easy. Go straight ahead down this street. " +
          "Turn left at the bank and cross the square. The station is on the corner, opposite the park, " +
          "between a cafe and a supermarket. It takes about five minutes on foot. You can't miss it!\n\n" +
          "TEXT 2 - Getting to the museum\n" +
          "A: Excuse me, is there a museum near here? B: Yes! Go straight and turn right at the traffic " +
          "lights. A: And then? B: At the roundabout, take the first exit. The museum is opposite a big " +
          "hotel. A: Is it far? B: No, about ten minutes. A: Thank you so much! B: You're welcome.",
        glossary: [
          { term: "go straight ahead", translation: "sigue derecho" },
          { term: "turn left / right", translation: "gira a la izquierda / derecha" },
          { term: "cross / on the corner", translation: "cruza / en la esquina" },
          { term: "opposite / between", translation: "enfrente de / entre" },
          { term: "traffic lights", translation: "semaforo" },
          { term: "roundabout / exit", translation: "rotonda / salida" },
          { term: "on foot", translation: "a pie" },
          { term: "You can't miss it!", translation: "no tiene perdida!" },
        ],
        keyPhrases: [
          "Sigue la ruta paso a paso mentalmente.",
          "Ubica el lugar: esquina, enfrente de, entre que cosas.",
        ],
        check: [
          { prompt: "T1: Where do you turn left?", choices: ["At the park", "At the bank", "At the cafe"], answer: 1 },
          { prompt: "T1: The station is opposite the...", choices: ["Park", "River", "School"], answer: 0 },
          { prompt: "T1: How long does it take on foot?", choices: ["Five minutes", "Twenty minutes", "One hour"], answer: 0 },
          { prompt: "T2: Where do you turn right?", choices: ["At the traffic lights", "At the park", "At the hotel"], answer: 0 },
          { prompt: "T2: What do you take at the roundabout?", choices: ["The first exit", "The third exit", "A taxi"], answer: 0 },
          { prompt: "T2: The museum is opposite a...", choices: ["Big hotel", "Small shop", "Station"], answer: 0 },
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
        { term: "traffic lights / roundabout", translation: "semaforo / rotonda" },
        { term: "between / opposite", translation: "entre / enfrente de" },
        { term: "to cross / to turn", translation: "cruzar / girar" },
      ],
      activities: [
        {
          id: "a2ci-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "corner", right: "esquina" },
            { left: "square", right: "plaza" },
            { left: "bank", right: "banco" },
            { left: "station", right: "estacion" },
          ] },
        },
        {
          id: "a2ci-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "straight", right: "recto" },
            { left: "between", right: "entre" },
            { left: "opposite", right: "enfrente de" },
            { left: "traffic lights", right: "semaforo" },
          ] },
        },
        {
          id: "a2ci-vocab-a3", type: "cloze",
          prompt: "Completa: 'The hotel is ___ the park.' (enfrente de)",
          payload: { answer: "opposite" },
          explain: "'Opposite' = enfrente de.",
        },
        {
          id: "a2ci-vocab-a4", type: "cloze",
          prompt: "Completa: 'Turn right at the ___.' (semaforo)",
          payload: { answer: "traffic lights" },
          explain: "'Traffic lights' = semaforo.",
        },
        {
          id: "a2ci-vocab-a5", type: "cloze",
          prompt: "Completa: 'It's ___ the bank and the cafe.' (entre)",
          payload: { answer: "between" },
          explain: "'Between' = entre (dos cosas).",
        },
        {
          id: "a2ci-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'cruzar'?",
          payload: { choices: ["turn", "cross", "corner"], answer: 1 },
          explain: "'Cross' = cruzar.",
        },
        {
          id: "a2ci-vocab-a7", type: "multiple_choice",
          prompt: "Where do you catch a train?",
          payload: { choices: ["bank", "station", "square"], answer: 1 },
          explain: "'Station' = estacion.",
        },
        {
          id: "a2ci-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "on", "corner", "It's"], answer: ["It's", "on", "the", "corner"] },
          explain: "'on the corner' = en la esquina.",
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
        form: "verbo base (+ complemento): Turn left. Go straight. Cross the street. Take the first exit.",
        examples: ["Turn right at the bank.", "Go straight ahead.", "Cross the square.", "Take the second street."],
        mistakes: [
          { wrong: "You turn to left.", right: "Turn left." },
          { wrong: "Go to straight.", right: "Go straight." },
          { wrong: "To cross the street.", right: "Cross the street." },
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
          id: "a2ci-gram-a3", type: "cloze",
          prompt: "Completa: '___ the first exit.' (toma)",
          payload: { answer: "Take" },
          explain: "Imperativo: 'Take the first exit'.",
        },
        {
          id: "a2ci-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["Cross the street here.", "You crossing the street here.", "To cross the street here."], answer: 0 },
          explain: "El imperativo es el verbo base: 'Cross the street'.",
        },
        {
          id: "a2ci-gram-a5", type: "multiple_choice",
          prompt: "How do you ask for directions politely?",
          payload: { choices: ["Where is museum?", "Excuse me, how do I get to the museum?", "Museum where?"], answer: 1 },
          explain: "'Excuse me, how do I get to...?' es educado.",
        },
        {
          id: "a2ci-gram-a6", type: "word_bank",
          prompt: "Ordena la instruccion:",
          payload: { words: ["right", "the", "Turn", "at", "corner"], answer: ["Turn", "right", "at", "the", "corner"] },
          explain: "Orden: Turn + right + at + the + corner.",
        },
        {
          id: "a2ci-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["get", "How", "do", "I", "to", "the", "station?"], answer: ["How", "do", "I", "get", "to", "the", "station?"] },
          explain: "How + do + I + get + to + the + station?",
        },
        {
          id: "a2ci-gram-a8", type: "cloze",
          prompt: "Completa: '___ the square to get there.' (cruza)",
          payload: { answer: "Cross" },
          explain: "Imperativo: 'Cross the square'.",
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
      intro: "Competencia de ESCRITURA. Construye instrucciones para llegar a un lugar, frase por frase.",
      activities: [
        {
          id: "a2ci-write-a1", type: "word_bank",
          prompt: "1. Di que sigan derecho:",
          payload: { words: ["straight", "Go", "ahead"], answer: ["Go", "straight", "ahead"] },
        },
        {
          id: "a2ci-write-a2", type: "word_bank",
          prompt: "2. Di que giren a la izquierda en el banco:",
          payload: { words: ["the", "Turn", "at", "left", "bank"], answer: ["Turn", "left", "at", "the", "bank"] },
        },
        {
          id: "a2ci-write-a3", type: "word_bank",
          prompt: "3. Di que tomen la primera salida:",
          payload: { words: ["first", "Take", "exit", "the"], answer: ["Take", "the", "first", "exit"] },
        },
        {
          id: "a2ci-write-a4", type: "word_bank",
          prompt: "4. Pregunta como llegar a la estacion:",
          payload: { words: ["get", "How", "do", "I", "to", "the", "station?"], answer: ["How", "do", "I", "get", "to", "the", "station?"] },
        },
        {
          id: "a2ci-write-a5", type: "word_bank",
          prompt: "5. Di que esta enfrente del parque:",
          payload: { words: ["the", "It's", "park", "opposite"], answer: ["It's", "opposite", "the", "park"] },
        },
        {
          id: "a2ci-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'cruzar'?",
          payload: { choices: ["turn", "cross", "corner"], answer: 1 },
        },
        {
          id: "a2ci-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct imperative:",
          payload: { choices: ["You go straight.", "Go straight.", "To go straight."], answer: 1 },
        },
        {
          id: "a2ci-write-a8", type: "multiple_choice",
          prompt: "8. Someone thanks you. You reply:",
          payload: { choices: ["You're welcome.", "Turn left.", "Goodbye now."], answer: 0 },
        },
      ],
    },
  ],
};
