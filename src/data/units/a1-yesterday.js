/**
 * data/units/a1-yesterday.js — Unidad tematica "Yesterday" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1y-11", term: "to cook", translation: "cocinar", example: "We cooked dinner." },
    { id: "a1y-12", term: "to travel", translation: "viajar", example: "They travelled to Peru." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1y-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el fin de semana pasado",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - My weekend\n" +
          "Last weekend was great. On Saturday, I was at home. I watched a movie and I played video games " +
          "with my brother. On Sunday, we visited our grandmother. She was very happy to see us. In the " +
          "afternoon, my parents were tired, so we stayed at home and cooked dinner. It was a nice and " +
          "relaxing weekend.\n\n" +
          "TEXT 2 - Two friends\n" +
          "A: What did you do yesterday? B: I stayed at home. I was tired. A: Oh! I visited my cousins. We " +
          "played football. B: Nice! Was it fun? A: Yes, it was great! And last week we travelled to the " +
          "beach. B: Lucky you!",
        glossary: [
          { term: "was / were", translation: "estaba / estaban" },
          { term: "watched / played / visited", translation: "vi / jugue / visite" },
          { term: "stayed / cooked", translation: "me quede / cocine" },
          { term: "yesterday / last week", translation: "ayer / la semana pasada" },
          { term: "tired / happy", translation: "cansado / feliz" },
          { term: "to travel", translation: "viajar" },
          { term: "Was it fun?", translation: "fue divertido?" },
          { term: "Lucky you!", translation: "que suerte!" },
        ],
        keyPhrases: [
          "Busca lo que hizo cada persona el sabado y el domingo.",
          "Fijate en was/were y en los verbos con -ed.",
        ],
        check: [
          { prompt: "T1: Where was the person on Saturday?", choices: ["At school", "At home", "At work"], answer: 1 },
          { prompt: "T1: Who did they visit on Sunday?", choices: ["A friend", "Grandmother", "A teacher"], answer: 1 },
          { prompt: "T1: How were the parents in the afternoon?", choices: ["Happy", "Tired", "Angry"], answer: 1 },
          { prompt: "T2: What did B do yesterday?", choices: ["Stayed at home", "Played football", "Travelled"], answer: 0 },
          { prompt: "T2: What did A do with the cousins?", choices: ["Watched TV", "Played football", "Cooked"], answer: 1 },
          { prompt: "T2: Where did A travel last week?", choices: ["The beach", "The mountains", "The city"], answer: 0 },
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
        { term: "to cook / to travel", translation: "cocinar / viajar" },
        { term: "tired / happy / ago", translation: "cansado / feliz / hace (tiempo)" },
      ],
      activities: [
        {
          id: "a1y-vocab-a1", type: "matching",
          prompt: "Empareja el verbo con su pasado (1/2):",
          payload: { pairs: [
            { left: "watch", right: "watched" },
            { left: "play", right: "played" },
            { left: "visit", right: "visited" },
            { left: "stay", right: "stayed" },
          ] },
        },
        {
          id: "a1y-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "yesterday", right: "ayer" },
            { left: "weekend", right: "fin de semana" },
            { left: "tired", right: "cansado" },
            { left: "happy", right: "feliz" },
          ] },
        },
        {
          id: "a1y-vocab-a3", type: "cloze",
          prompt: "Completa: 'My parents were ___.' (cansados)",
          payload: { answer: "tired" },
          explain: "'Tired' = cansado.",
        },
        {
          id: "a1y-vocab-a4", type: "cloze",
          prompt: "Completa: 'We ___ dinner.' (cocinar -> pasado)",
          payload: { answer: "cooked" },
          explain: "Pasado regular: cook + ed = cooked.",
        },
        {
          id: "a1y-vocab-a5", type: "cloze",
          prompt: "Completa: 'They ___ to Peru.' (viajar -> pasado)",
          payload: { answer: "travelled", alt: ["traveled"] },
          explain: "Pasado: travel -> travelled.",
        },
        {
          id: "a1y-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'ayer'?",
          payload: { choices: ["yesterday", "tomorrow", "today"], answer: 0 },
          explain: "'Yesterday' = ayer.",
        },
        {
          id: "a1y-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'fin de semana'?",
          payload: { choices: ["weekend", "week", "day"], answer: 0 },
          explain: "'Weekend' = fin de semana.",
        },
        {
          id: "a1y-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["ago", "days", "Two"], answer: ["Two", "days", "ago"] },
          explain: "'Two days ago' = hace dos dias.",
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
        form: "was (I/he/she/it) · were (you/we/they) · verb + ed (regular)",
        desc: "Sirve para contar lo que hiciste o lo que pas\u00f3 en el pasado.",
        rule: "Para el pasado del verbo 'to be' usa 'was' (I/he/she/it) y 'were' (you/we/they). Los verbos regulares forman el pasado a\u00f1adiendo -ed: 'work' -> 'worked'.",
        examples: ["I was at home.", "They were happy.", "She watched a movie.", "We played football."],
        explain: { tr: ["Yo estaba en casa.", "Ellos estaban felices.", "Ella vio una pel\u00edcula.", "Nosotros jugamos f\u00fatbol."] },
        mistakes: [
          { wrong: "I were tired.", right: "I was tired." },
          { wrong: "We was happy.", right: "We were happy." },
          { wrong: "She watch a movie.", right: "She watched a movie." },
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
          prompt: "Completa: 'I ___ at home.' (estaba)",
          payload: { answer: "was" },
          explain: "Con I/he/she/it: 'was'.",
        },
        {
          id: "a1y-gram-a3", type: "cloze",
          prompt: "Completa: 'I ___ a movie last night.' (ver -> pasado)",
          payload: { answer: "watched" },
          explain: "Pasado regular: watch + ed = watched.",
        },
        {
          id: "a1y-gram-a4", type: "cloze",
          prompt: "Completa: 'We ___ our grandmother.' (visitar -> pasado)",
          payload: { answer: "visited" },
          explain: "Pasado regular: visit + ed = visited.",
        },
        {
          id: "a1y-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She were at home.", "She was at home.", "She is at home yesterday."], answer: 1 },
          explain: "Con 'she' en pasado: 'was'.",
        },
        {
          id: "a1y-gram-a6", type: "multiple_choice",
          prompt: "Choose the correct past:",
          payload: { choices: ["We playd football.", "We played football.", "We play football yesterday."], answer: 1 },
          explain: "Pasado regular: play -> played.",
        },
        {
          id: "a1y-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["football", "played", "We", "yesterday"], answer: ["We", "played", "football", "yesterday"] },
          explain: "Orden: We + played + football + yesterday.",
        },
        {
          id: "a1y-gram-a8", type: "word_bank",
          prompt: "Ordena la frase con 'was':",
          payload: { words: ["home", "I", "at", "was"], answer: ["I", "was", "at", "home"] },
          explain: "Orden: I + was + at + home.",
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
      intro: "Competencia de ESCRITURA. Construye lo que hiciste, frase por frase.",
      activities: [
        {
          id: "a1y-write-a1", type: "word_bank",
          prompt: "1. Di donde estabas ayer:",
          payload: { words: ["home", "I", "at", "was", "yesterday"], answer: ["I", "was", "at", "home", "yesterday"] },
        },
        {
          id: "a1y-write-a2", type: "word_bank",
          prompt: "2. Di que viste una pelicula:",
          payload: { words: ["a", "I", "movie", "watched"], answer: ["I", "watched", "a", "movie"] },
        },
        {
          id: "a1y-write-a3", type: "word_bank",
          prompt: "3. Di que visitaste a tu abuela:",
          payload: { words: ["grandmother", "I", "my", "visited"], answer: ["I", "visited", "my", "grandmother"] },
        },
        {
          id: "a1y-write-a4", type: "word_bank",
          prompt: "4. Di que jugaste futbol:",
          payload: { words: ["football", "I", "played"], answer: ["I", "played", "football"] },
        },
        {
          id: "a1y-write-a5", type: "word_bank",
          prompt: "5. Di que fue un fin de semana genial:",
          payload: { words: ["great", "It", "a", "was", "weekend"], answer: ["It", "was", "a", "great", "weekend"] },
        },
        {
          id: "a1y-write-a6", type: "multiple_choice",
          prompt: "6. Which is the past of 'to be' for 'they'?",
          payload: { choices: ["was", "were", "is"], answer: 1 },
        },
        {
          id: "a1y-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct sentence:",
          payload: { choices: ["I stay at home yesterday.", "I stayed at home yesterday.", "I staying at home yesterday."], answer: 1 },
        },
        {
          id: "a1y-write-a8", type: "multiple_choice",
          prompt: "8. 'Two days ago' means...",
          payload: { choices: ["in two days", "two days before now", "today"], answer: 1 },
        },
      ],
    },
  ],
};
