/**
 * data/units/a1-yesterday.js — Unidad tematica "Yesterday" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
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
    // ================= READING =================
    {
      id: "a1y-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el fin de semana pasado",
      intro: "Competencia de LECTURA. Lee lo que hizo la persona y comprueba que entendiste.",
      content: {
        reading:
          "Last weekend was great. On Saturday, I was at home. I watched a movie and I played " +
          "video games with my brother. On Sunday, we visited our grandmother. She was very " +
          "happy to see us. In the afternoon, my parents were tired, so we stayed at home. " +
          "It was a nice and relaxing weekend.",
        keyPhrases: [
          "Busca lo que hizo el sabado y el domingo.",
          "Fijate en was/were y en los verbos con -ed.",
        ],
        check: [
          { prompt: "Where was the person on Saturday?", choices: ["At school", "At home", "At work"], answer: 1 },
          { prompt: "Who did they visit on Sunday?", choices: ["A friend", "Grandmother", "A teacher"], answer: 1 },
          { prompt: "How were the parents in the afternoon?", choices: ["Happy", "Tired", "Angry"], answer: 1 },
          { prompt: "How was the weekend?", choices: ["Boring", "Nice and relaxing", "Terrible"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1y-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: pasado y tiempo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "yesterday / last week", translation: "ayer / la semana pasada" },
        { term: "weekend", translation: "fin de semana" },
        { term: "to watch / to play", translation: "ver / jugar" },
        { term: "to visit / to stay", translation: "visitar / quedarse" },
        { term: "tired / happy", translation: "cansado / feliz" },
        { term: "ago", translation: "hace (tiempo)" },
      ],
      activities: [
        {
          id: "a1y-vocab-a1", type: "matching",
          prompt: "Empareja el verbo con su pasado:",
          payload: { pairs: [
            { left: "watch", right: "watched" },
            { left: "play", right: "played" },
            { left: "visit", right: "visited" },
          ] },
        },
        {
          id: "a1y-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'ayer'?",
          payload: { choices: ["yesterday", "tomorrow", "today"], answer: 0 },
          explain: "'Yesterday' = ayer.",
        },
        {
          id: "a1y-vocab-a3", type: "cloze",
          prompt: "Completa: 'My parents were ___.' (cansados)",
          payload: { answer: "tired" },
          explain: "'Tired' = cansado.",
        },
        {
          id: "a1y-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'fin de semana'?",
          payload: { choices: ["weekend", "week", "day"], answer: 0 },
          explain: "'Weekend' = fin de semana.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1y-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: was/were y pasado -ed",
      intro: "Competencia de GRAMATICA. Aprende was/were y el pasado regular y practicalos.",
      grammar: {
        title: "was/were y pasado regular (-ed)",
        form: "was (I/he/she/it) · were (you/we/they) · verbo + ed (regular)",
        examples: ["I was at home.", "They were happy.", "She watched a movie."],
        mistakes: [
          { wrong: "I were tired.", right: "I was tired." },
          { wrong: "We was happy.", right: "We were happy." },
        ],
      },
      activities: [
        {
          id: "a1y-gram-a1", type: "cloze",
          prompt: "Completa: 'They ___ happy.' (estaban)",
          payload: { answer: "were" },
          explain: "Con they/we/you: 'were'.",
        },
        {
          id: "a1y-gram-a2", type: "cloze",
          prompt: "Completa: 'I ___ a movie last night.' (ver -> pasado)",
          payload: { answer: "watched" },
          explain: "Pasado regular: watch + ed = watched.",
        },
        {
          id: "a1y-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She were at home.", "She was at home.", "She is at home yesterday."], answer: 1 },
          explain: "Con 'she' en pasado: 'was'.",
        },
        {
          id: "a1y-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["football", "played", "We", "yesterday"], answer: ["We", "played", "football", "yesterday"] },
          explain: "Orden: We + played + football + yesterday.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1y-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: cuenta tu fin de semana",
      intro: "Competencia de ESCRITURA. Construye frases sobre lo que hiciste. Ordena cada frase.",
      activities: [
        {
          id: "a1y-write-a1", type: "word_bank",
          prompt: "Di donde estabas ayer:",
          payload: { words: ["home", "I", "at", "was", "yesterday"], answer: ["I", "was", "at", "home", "yesterday"] },
        },
        {
          id: "a1y-write-a2", type: "word_bank",
          prompt: "Di que viste una pelicula:",
          payload: { words: ["a", "I", "movie", "watched"], answer: ["I", "watched", "a", "movie"] },
        },
        {
          id: "a1y-write-a3", type: "word_bank",
          prompt: "Di que visitaste a tu abuela:",
          payload: { words: ["grandmother", "I", "my", "visited"], answer: ["I", "visited", "my", "grandmother"] },
        },
        {
          id: "a1y-write-a4", type: "multiple_choice",
          prompt: "Which is the past of 'to be' for 'they'?",
          payload: { choices: ["was", "were", "is"], answer: 1 },
        },
      ],
    },
  ],
};
