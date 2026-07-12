/**
 * data/units/a2-travel-stories.js — Unidad tematica "Travel stories" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_TRAVEL_STORIES = {
  id: "a2-travel-stories",
  language: "en",
  level: "A2",
  title: "Travel stories",
  subtitle: "Contar anecdotas de viaje con past continuous y past simple",

  cando: [
    "Puedo describir acciones en progreso en el pasado (past continuous).",
    "Puedo combinar past continuous y past simple en una historia.",
    "Puedo usar vocabulario de viajes y experiencias.",
    "Puedo narrar una anecdota corta de un viaje.",
  ],

  vocab: [
    { id: "a2ts-1", term: "trip", translation: "viaje", example: "Our trip was amazing." },
    { id: "a2ts-2", term: "airport", translation: "aeropuerto", example: "We waited at the airport." },
    { id: "a2ts-3", term: "to arrive", translation: "llegar", example: "We arrived late at night." },
    { id: "a2ts-4", term: "to lose (lost)", translation: "perder (perdio)", example: "I lost my passport." },
    { id: "a2ts-5", term: "luggage", translation: "equipaje", example: "My luggage was heavy." },
    { id: "a2ts-6", term: "hotel", translation: "hotel", example: "The hotel was near the beach." },
    { id: "a2ts-7", term: "map", translation: "mapa", example: "We looked at the map." },
    { id: "a2ts-8", term: "to get lost", translation: "perderse", example: "We got lost in the city." },
    { id: "a2ts-9", term: "adventure", translation: "aventura", example: "It was a real adventure." },
    { id: "a2ts-10", term: "amazing", translation: "increible", example: "The view was amazing." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2ts-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una aventura de viaje",
      intro: "Competencia de LECTURA. Lee la historia y comprueba que entendiste.",
      content: {
        reading:
          "Last summer, we went on a trip to Italy. When we arrived at the airport, it was raining. " +
          "While we were waiting for a taxi, I lost my map! We got lost in the city for two hours. " +
          "We were walking near the river when a kind woman helped us. Finally, we found our hotel. " +
          "It was a small adventure, but the trip was amazing.",
        keyPhrases: [
          "Distingue el 'fondo' (was raining) de la accion (I lost).",
          "Busca donde se perdieron y quien los ayudo.",
        ],
        check: [
          { prompt: "What was the weather when they arrived?", choices: ["Sunny", "Raining", "Snowing"], answer: 1 },
          { prompt: "What did they lose?", choices: ["The map", "The luggage", "The passport"], answer: 0 },
          { prompt: "How long were they lost?", choices: ["One hour", "Two hours", "All day"], answer: 1 },
          { prompt: "Who helped them?", choices: ["A taxi driver", "A kind woman", "A police officer"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2ts-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: viajes y aventuras",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "trip / adventure", translation: "viaje / aventura" },
        { term: "airport / hotel", translation: "aeropuerto / hotel" },
        { term: "to arrive", translation: "llegar" },
        { term: "luggage / map", translation: "equipaje / mapa" },
        { term: "to get lost", translation: "perderse" },
        { term: "amazing", translation: "increible" },
      ],
      activities: [
        {
          id: "a2ts-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "trip", right: "viaje" },
            { left: "luggage", right: "equipaje" },
            { left: "hotel", right: "hotel" },
          ] },
        },
        {
          id: "a2ts-vocab-a2", type: "cloze",
          prompt: "Completa: 'We ___ lost in the city.' (get -> pasado)",
          payload: { answer: "got" },
          explain: "'get lost' en pasado: 'got lost'.",
        },
        {
          id: "a2ts-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'increible'?",
          payload: { choices: ["amazing", "tired", "cheap"], answer: 0 },
          explain: "'Amazing' = increible.",
        },
        {
          id: "a2ts-vocab-a4", type: "multiple_choice",
          prompt: "Where do you catch a plane?",
          payload: { choices: ["hotel", "airport", "map"], answer: 1 },
          explain: "'Airport' = aeropuerto.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2ts-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: past continuous",
      intro: "Competencia de GRAMATICA. Aprende el past continuous con el past simple.",
      grammar: {
        title: "Past continuous vs past simple",
        form: "was/were + verbo-ing (fondo) + when + past simple (accion breve)",
        examples: ["I was reading when you called.", "While we were waiting, it rained."],
        mistakes: [
          { wrong: "I was call you.", right: "I was calling you." },
          { wrong: "While I waiting.", right: "While I was waiting." },
        ],
      },
      activities: [
        {
          id: "a2ts-gram-a1", type: "cloze",
          prompt: "Completa: 'I ___ waiting for a taxi.' (was/were)",
          payload: { answer: "was" },
          explain: "Con 'I': 'was' + verbo-ing.",
        },
        {
          id: "a2ts-gram-a2", type: "cloze",
          prompt: "Completa: 'They were ___ near the river.' (walk -> -ing)",
          payload: { answer: "walking" },
          explain: "Past continuous: were + walking.",
        },
        {
          id: "a2ts-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["While we waited, it started to rain.", "While we were waiting, it started to rain.", "While we waiting, it started to rain."], answer: 1 },
          explain: "El 'fondo' va en past continuous: 'were waiting'.",
        },
        {
          id: "a2ts-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["reading", "was", "I", "a", "book"], answer: ["I", "was", "reading", "a", "book"] },
          explain: "Orden: I + was + reading + a + book.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2ts-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tu historia de viaje",
      intro: "Competencia de ESCRITURA. Construye frases para contar una anecdota. Ordena cada frase.",
      activities: [
        {
          id: "a2ts-write-a1", type: "word_bank",
          prompt: "Di que estabas caminando:",
          payload: { words: ["walking", "I", "was"], answer: ["I", "was", "walking"] },
        },
        {
          id: "a2ts-write-a2", type: "word_bank",
          prompt: "Di que empezo a llover:",
          payload: { words: ["to", "It", "rain", "started"], answer: ["It", "started", "to", "rain"] },
        },
        {
          id: "a2ts-write-a3", type: "word_bank",
          prompt: "Di que se perdieron en la ciudad:",
          payload: { words: ["the", "We", "got", "in", "lost", "city"], answer: ["We", "got", "lost", "in", "the", "city"] },
        },
        {
          id: "a2ts-write-a4", type: "multiple_choice",
          prompt: "Which sentence describes an action in progress in the past?",
          payload: { choices: ["I walked home.", "I was walking home.", "I walk home."], answer: 1 },
        },
      ],
    },
  ],
};
