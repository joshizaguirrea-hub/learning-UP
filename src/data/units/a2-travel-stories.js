/**
 * data/units/a2-travel-stories.js — Unidad tematica "Travel stories" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a2ts-11", term: "flight", translation: "vuelo", example: "The flight was delayed." },
    { id: "a2ts-12", term: "to explore", translation: "explorar", example: "We explored the old town." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2ts-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una aventura de viaje",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A trip to Italy\n" +
          "Last summer, we went on a trip to Italy. When we arrived at the airport, it was raining. While " +
          "we were waiting for a taxi, I lost my map! We got lost in the city for two hours. We were " +
          "walking near the river when a kind woman helped us. Finally, we found our hotel. It was a small " +
          "adventure, but the trip was amazing.\n\n" +
          "TEXT 2 - At the airport\n" +
          "A: How was your flight? B: Terrible! It was delayed for three hours. A: Oh no! What did you do? " +
          "B: I was reading a book when they finally called us. And when I arrived, my luggage was lost! " +
          "A: That's awful. B: Yes, but the hotel was lovely, so I explored the old town and relaxed.",
        glossary: [
          { term: "it was raining", translation: "estaba lloviendo" },
          { term: "while we were waiting", translation: "mientras esperabamos" },
          { term: "we were walking", translation: "estabamos caminando" },
          { term: "lost / got lost", translation: "perdi / nos perdimos" },
          { term: "found", translation: "encontramos" },
          { term: "flight / delayed", translation: "vuelo / retrasado" },
          { term: "to explore", translation: "explorar" },
          { term: "awful / lovely", translation: "horrible / encantador" },
        ],
        keyPhrases: [
          "Distingue el 'fondo' (was raining) de la accion breve (I lost).",
          "Busca los problemas del viaje y como se resolvieron.",
        ],
        check: [
          { prompt: "T1: What was the weather when they arrived?", choices: ["Sunny", "Raining", "Snowing"], answer: 1 },
          { prompt: "T1: What did they lose?", choices: ["The map", "The luggage", "The passport"], answer: 0 },
          { prompt: "T1: Who helped them?", choices: ["A taxi driver", "A kind woman", "A police officer"], answer: 1 },
          { prompt: "T2: Why was the flight terrible?", choices: ["It was delayed", "It was cold", "It was full"], answer: 0 },
          { prompt: "T2: What was B doing when they called?", choices: ["Sleeping", "Reading a book", "Eating"], answer: 1 },
          { prompt: "T2: What happened to B's luggage?", choices: ["It was lost", "It was heavy", "It was stolen"], answer: 0 },
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
        { term: "trip / flight", translation: "viaje / vuelo" },
        { term: "airport / hotel", translation: "aeropuerto / hotel" },
        { term: "to arrive / to explore", translation: "llegar / explorar" },
        { term: "luggage / map", translation: "equipaje / mapa" },
        { term: "to get lost", translation: "perderse" },
        { term: "adventure / amazing", translation: "aventura / increible" },
      ],
      activities: [
        {
          id: "a2ts-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "trip", right: "viaje" },
            { left: "luggage", right: "equipaje" },
            { left: "hotel", right: "hotel" },
            { left: "flight", right: "vuelo" },
          ] },
        },
        {
          id: "a2ts-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "airport", right: "aeropuerto" },
            { left: "map", right: "mapa" },
            { left: "adventure", right: "aventura" },
            { left: "amazing", right: "increible" },
          ] },
        },
        {
          id: "a2ts-vocab-a3", type: "cloze",
          prompt: "Completa: 'We ___ lost in the city.' (get -> pasado)",
          payload: { answer: "got" },
          explain: "'get lost' en pasado: 'got lost'.",
        },
        {
          id: "a2ts-vocab-a4", type: "cloze",
          prompt: "Completa: 'We ___ the old town.' (explorar -> pasado)",
          payload: { answer: "explored" },
          explain: "'explore' -> 'explored'.",
        },
        {
          id: "a2ts-vocab-a5", type: "cloze",
          prompt: "Completa: 'The flight was ___.' (retrasado)",
          payload: { answer: "delayed" },
          explain: "'delayed' = retrasado.",
        },
        {
          id: "a2ts-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'increible'?",
          payload: { choices: ["amazing", "tired", "cheap"], answer: 0 },
          explain: "'Amazing' = increible.",
        },
        {
          id: "a2ts-vocab-a7", type: "multiple_choice",
          prompt: "Where do you catch a plane?",
          payload: { choices: ["hotel", "airport", "map"], answer: 1 },
          explain: "'Airport' = aeropuerto.",
        },
        {
          id: "a2ts-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "at", "map", "looked", "We"], answer: ["We", "looked", "at", "the", "map"] },
          explain: "'look at the map' = mirar el mapa.",
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
        form: "was/were + verb-ing (background) + when + past simple (short action)",
        desc: "Sirve para contar qu\u00e9 estaba pasando cuando otra acci\u00f3n lo interrumpi\u00f3.",
        rule: "'was/were + verbo-ing' describe la acci\u00f3n larga de fondo (I was sleeping) y 'when + pasado simple' marca la acci\u00f3n breve que la corta (when the phone rang).",
        examples: ["I was reading when you called.", "While we were waiting, it rained.", "They were walking when it started."],
        explain: { tr: ["Estaba leyendo cuando llamaste.", "Mientras esper\u00e1bamos, llovi\u00f3.", "Estaban caminando cuando empez\u00f3."] },
        mistakes: [
          { wrong: "I was call you.", right: "I was calling you." },
          { wrong: "While I waiting.", right: "While I was waiting." },
          { wrong: "We was walking.", right: "We were walking." },
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
          id: "a2ts-gram-a3", type: "cloze",
          prompt: "Completa: 'We ___ waiting when it rained.' (was/were)",
          payload: { answer: "were" },
          explain: "Con 'we': 'were' + verbo-ing.",
        },
        {
          id: "a2ts-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["While we waited, it started to rain.", "While we were waiting, it started to rain.", "While we waiting, it started to rain."], answer: 1 },
          explain: "El 'fondo' va en past continuous: 'were waiting'.",
        },
        {
          id: "a2ts-gram-a5", type: "multiple_choice",
          prompt: "Which describes an action in progress in the past?",
          payload: { choices: ["I walked home.", "I was walking home.", "I walk home."], answer: 1 },
          explain: "Past continuous: was + verbo-ing.",
        },
        {
          id: "a2ts-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["reading", "was", "I", "a", "book"], answer: ["I", "was", "reading", "a", "book"] },
          explain: "Orden: I + was + reading + a + book.",
        },
        {
          id: "a2ts-gram-a7", type: "word_bank",
          prompt: "Ordena la frase (fondo + accion):",
          payload: { words: ["rained", "walking,", "it", "were", "While", "we"], answer: ["While", "we", "were", "walking,", "it", "rained"] },
          explain: "While + we + were + walking, + it + rained.",
        },
        {
          id: "a2ts-gram-a8", type: "cloze",
          prompt: "Completa: 'It was ___ when we arrived.' (rain -> -ing)",
          payload: { answer: "raining" },
          explain: "Past continuous: was + raining.",
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
      intro: "Competencia de ESCRITURA. Construye una anecdota de viaje, frase por frase.",
      activities: [
        {
          id: "a2ts-write-a1", type: "word_bank",
          prompt: "1. Di que estabas caminando:",
          payload: { words: ["walking", "I", "was"], answer: ["I", "was", "walking"] },
        },
        {
          id: "a2ts-write-a2", type: "word_bank",
          prompt: "2. Di que empezo a llover:",
          payload: { words: ["to", "It", "rain", "started"], answer: ["It", "started", "to", "rain"] },
        },
        {
          id: "a2ts-write-a3", type: "word_bank",
          prompt: "3. Di que se perdieron en la ciudad:",
          payload: { words: ["the", "We", "got", "in", "lost", "city"], answer: ["We", "got", "lost", "in", "the", "city"] },
        },
        {
          id: "a2ts-write-a4", type: "word_bank",
          prompt: "4. Di que finalmente encontraron el hotel:",
          payload: { words: ["the", "we", "Finally,", "hotel", "found"], answer: ["Finally,", "we", "found", "the", "hotel"] },
        },
        {
          id: "a2ts-write-a5", type: "word_bank",
          prompt: "5. Di que el viaje fue increible:",
          payload: { words: ["amazing", "The", "was", "trip"], answer: ["The", "trip", "was", "amazing"] },
        },
        {
          id: "a2ts-write-a6", type: "multiple_choice",
          prompt: "6. Which sentence uses past continuous?",
          payload: { choices: ["I walked home.", "I was walking home.", "I walk home."], answer: 1 },
        },
        {
          id: "a2ts-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I was read a book.", "I was reading a book.", "I were reading a book."], answer: 1 },
        },
        {
          id: "a2ts-write-a8", type: "multiple_choice",
          prompt: "8. The past continuous describes an action that was...",
          payload: { choices: ["finished quickly", "in progress", "in the future"], answer: 1 },
        },
      ],
    },
  ],
};
