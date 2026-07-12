/**
 * data/units/a2-travel-stories.js — Unidad tematica "Travel stories" (A2).
 *
 * Datos PUROS. Past continuous vs past simple para narrar. Ciclo PPP del
 * estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    {
      id: "a2ts-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: una aventura de viaje",
      intro:
        "Lee la historia y estudia el past continuous con el past simple. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Last summer, we went on a trip to Italy. When we arrived at the airport, it was raining. " +
          "While we were waiting for a taxi, I lost my map! We got lost in the city for two hours. " +
          "We were walking near the river when a kind woman helped us. Finally, we found our hotel. " +
          "It was a small adventure, but the trip was amazing.",
        glossary: [
          { term: "it was raining", translation: "estaba lloviendo" },
          { term: "while we were waiting", translation: "mientras esperabamos" },
          { term: "we were walking", translation: "estabamos caminando" },
          { term: "lost", translation: "perdi (lose)" },
          { term: "got lost", translation: "nos perdimos" },
          { term: "found", translation: "encontramos (find)" },
        ],
        keyPhrases: [
          "I was + verbo-ing (accion en progreso en el pasado)",
          "While I was ..., ... happened. (Mientras..., paso...)",
          "When we arrived... (Cuando llegamos...)",
          "It was amazing! (Fue increible!)",
        ],
        note:
          "Past continuous (was/were + verbo-ing) describe una accion EN PROGRESO en el pasado. " +
          "Suele interrumpirse por una accion corta en past simple: 'I was walking when it started to rain'.",
        grammar: {
          title: "Past continuous vs past simple",
          form: "was/were + verbo-ing (fondo) + when + past simple (accion breve)",
          examples: [
            "I was reading when you called.",
            "While we were waiting, it rained.",
          ],
          mistakes: [
            { wrong: "I was call you.", right: "I was calling you." },
            { wrong: "While I waiting.", right: "While I was waiting." },
          ],
        },
        check: [
          { prompt: "What was the weather when they arrived?", choices: ["Sunny", "Raining", "Snowing"], answer: 1 },
          { prompt: "What did they lose?", choices: ["The map", "The luggage", "The passport"], answer: 0 },
        ],
      },
      activities: [],
    },
    {
      id: "a2ts-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: contar una anecdota",
      intro: "Usamos past continuous para el 'fondo' y past simple para la accion. Lee el dialogo.",
      dialogue: [
        "A: What happened on your trip?",
        "B: Well, we were walking in the city when it started to rain.",
        "A: Oh no! What did you do?",
        "B: We ran to a cafe and waited there.",
      ],
      activities: [
        {
          id: "a2ts-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "I was walk when it rained.",
            "I was walking when it rained.",
            "I walking when it rained.",
          ], answer: 1 },
          explain: "Past continuous: was + verbo-ing (walking).",
        },
        {
          id: "a2ts-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "trip", right: "viaje" },
            { left: "luggage", right: "equipaje" },
            { left: "hotel", right: "hotel" },
          ] },
        },
      ],
    },
    {
      id: "a2ts-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: past continuous",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2ts-l2-a1", type: "cloze",
          prompt: "Completa: 'I ___ waiting for a taxi.' (was/were)",
          payload: { answer: "was" },
          explain: "Con 'I' usamos 'was' + verbo-ing.",
        },
        {
          id: "a2ts-l2-a2", type: "cloze",
          prompt: "Completa: 'They were ___ near the river.' (walk -> -ing)",
          payload: { answer: "walking" },
          explain: "Past continuous: were + walking.",
        },
        {
          id: "a2ts-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "While we waited, it started to rain.",
            "While we were waiting, it started to rain.",
            "While we waiting, it started to rain.",
          ], answer: 1 },
          explain: "El 'fondo' va en past continuous: 'were waiting'.",
        },
        {
          id: "a2ts-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["reading", "was", "I", "a", "book"], answer: ["I", "was", "reading", "a", "book"] },
          explain: "Orden: I + was + reading + a + book.",
        },
        {
          id: "a2ts-l2-a5", type: "cloze",
          prompt: "Completa: 'We ___ lost in the city.' (get -> pasado)",
          payload: { answer: "got" },
          explain: "'get lost' en pasado: 'got lost'.",
        },
      ],
    },
    {
      id: "a2ts-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: tu historia de viaje",
      intro: "Tarea real: construye frases para contar una anecdota de viaje. Ordena cada frase.",
      activities: [
        {
          id: "a2ts-l3-a1", type: "word_bank",
          prompt: "Di que estabas caminando:",
          payload: { words: ["walking", "I", "was"], answer: ["I", "was", "walking"] },
        },
        {
          id: "a2ts-l3-a2", type: "word_bank",
          prompt: "Di que empezo a llover:",
          payload: { words: ["to", "It", "rain", "started"], answer: ["It", "started", "to", "rain"] },
        },
        {
          id: "a2ts-l3-a3", type: "word_bank",
          prompt: "Di que se perdieron en la ciudad:",
          payload: { words: ["the", "We", "got", "in", "lost", "city"],
                     answer: ["We", "got", "lost", "in", "the", "city"] },
        },
        {
          id: "a2ts-l3-a4", type: "multiple_choice",
          prompt: "Which sentence describes an action in progress in the past?",
          payload: { choices: ["I walked home.", "I was walking home.", "I walk home."], answer: 1 },
        },
      ],
    },
  ],
};
