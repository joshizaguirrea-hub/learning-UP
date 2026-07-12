/**
 * data/units/a2-comparisons.js — Unidad tematica "Comparisons" (A2).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A2_COMPARISONS = {
  id: "a2-comparisons",
  language: "en",
  level: "A2",
  title: "Comparisons",
  subtitle: "Comparar personas, lugares y cosas",

  cando: [
    "Puedo comparar dos cosas con el comparativo (-er / more).",
    "Puedo usar el superlativo (the -est / the most).",
    "Puedo usar comparativos irregulares (good/better/best).",
    "Puedo describir y comparar lugares y personas.",
  ],

  vocab: [
    { id: "a2cm-1", term: "big / bigger", translation: "grande / mas grande", example: "My city is bigger." },
    { id: "a2cm-2", term: "small / smaller", translation: "pequeno / mas pequeno", example: "This room is smaller." },
    { id: "a2cm-3", term: "expensive", translation: "caro", example: "This car is more expensive." },
    { id: "a2cm-4", term: "good / better / best", translation: "bueno / mejor / el mejor", example: "This is the best cafe." },
    { id: "a2cm-5", term: "bad / worse / worst", translation: "malo / peor / el peor", example: "The traffic is worse today." },
    { id: "a2cm-6", term: "popular", translation: "popular", example: "It's the most popular beach." },
    { id: "a2cm-7", term: "fast / faster", translation: "rapido / mas rapido", example: "The train is faster." },
    { id: "a2cm-8", term: "cheap / cheaper", translation: "barato / mas barato", example: "The bus is cheaper." },
    { id: "a2cm-9", term: "beautiful", translation: "hermoso", example: "It's the most beautiful city." },
    { id: "a2cm-10", term: "than", translation: "que (comparacion)", example: "He is taller than me." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2cm-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: dos ciudades",
      intro: "Competencia de LECTURA. Lee la comparacion y comprueba que entendiste.",
      content: {
        reading:
          "I live in a small town, but my sister lives in a big city. The city is bigger and busier " +
          "than my town. Life there is more expensive, and the traffic is worse. But the city has the " +
          "best restaurants and the most popular museums. My town is quieter and cheaper. For me, my " +
          "town is more beautiful, but the city is more exciting. Which one is better? It depends!",
        keyPhrases: [
          "Compara: que es mas grande, mas caro, mas tranquilo.",
          "Fijate en los superlativos: the best, the most popular.",
        ],
        check: [
          { prompt: "Where is life more expensive?", choices: ["The town", "The city", "Both same"], answer: 1 },
          { prompt: "What does the town have?", choices: ["The best museums", "More traffic", "A quieter life"], answer: 2 },
          { prompt: "What does the city have?", choices: ["The best restaurants", "Cheaper life", "Less traffic"], answer: 0 },
          { prompt: "Which is more exciting?", choices: ["The town", "The city", "Neither"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2cm-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: adjetivos para comparar",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "big / small", translation: "grande / pequeno" },
        { term: "cheap / expensive", translation: "barato / caro" },
        { term: "fast", translation: "rapido" },
        { term: "popular / beautiful", translation: "popular / hermoso" },
        { term: "good / bad", translation: "bueno / malo" },
        { term: "than", translation: "que (comparacion)" },
      ],
      activities: [
        {
          id: "a2cm-vocab-a1", type: "matching",
          prompt: "Empareja el adjetivo con su comparativo:",
          payload: { pairs: [
            { left: "good", right: "better" },
            { left: "bad", right: "worse" },
            { left: "fast", right: "faster" },
          ] },
        },
        {
          id: "a2cm-vocab-a2", type: "multiple_choice",
          prompt: "Which word means 'barato'?",
          payload: { choices: ["expensive", "cheap", "popular"], answer: 1 },
          explain: "'Cheap' = barato.",
        },
        {
          id: "a2cm-vocab-a3", type: "multiple_choice",
          prompt: "What is the superlative of 'bad'?",
          payload: { choices: ["baddest", "worse", "the worst"], answer: 2 },
          explain: "Irregular: bad -> worse -> the worst.",
        },
        {
          id: "a2cm-vocab-a4", type: "cloze",
          prompt: "Completa: 'He is taller ___ me.' (que)",
          payload: { answer: "than" },
          explain: "'than' conecta la comparacion.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2cm-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: comparativo y superlativo",
      intro: "Competencia de GRAMATICA. Aprende a formar comparativos y superlativos.",
      grammar: {
        title: "Comparativo y superlativo",
        form: "corto: adj+er ... than / the adj+est · largo: more adj than / the most adj",
        examples: ["The train is faster than the bus.", "It's the most popular beach."],
        mistakes: [
          { wrong: "It's more bigger.", right: "It's bigger." },
          { wrong: "She is the most tall.", right: "She is the tallest." },
        ],
      },
      activities: [
        {
          id: "a2cm-gram-a1", type: "cloze",
          prompt: "Completa: 'The train is ___ than the bus.' (fast -> comparativo)",
          payload: { answer: "faster" },
          explain: "Adjetivo corto: fast -> faster.",
        },
        {
          id: "a2cm-gram-a2", type: "cloze",
          prompt: "Completa: 'It's the ___ popular beach.' (superlativo largo)",
          payload: { answer: "most" },
          explain: "Adjetivo largo: the most popular.",
        },
        {
          id: "a2cm-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["This car is more expensiver.", "This car is more expensive.", "This car is expensiver."], answer: 1 },
          explain: "Adjetivo largo: 'more expensive'.",
        },
        {
          id: "a2cm-gram-a4", type: "word_bank",
          prompt: "Ordena la comparacion:",
          payload: { words: ["taller", "He", "than", "is", "me"], answer: ["He", "is", "taller", "than", "me"] },
          explain: "Orden: He + is + taller + than + me.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2cm-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: compara dos lugares",
      intro: "Competencia de ESCRITURA. Construye comparaciones. Ordena cada frase.",
      activities: [
        {
          id: "a2cm-write-a1", type: "word_bank",
          prompt: "Di que la ciudad es mas grande que el pueblo:",
          payload: { words: ["bigger", "The", "city", "the", "than", "is", "town"], answer: ["The", "city", "is", "bigger", "than", "the", "town"] },
        },
        {
          id: "a2cm-write-a2", type: "word_bank",
          prompt: "Di que el bus es mas barato:",
          payload: { words: ["cheaper", "The", "is", "bus"], answer: ["The", "bus", "is", "cheaper"] },
        },
        {
          id: "a2cm-write-a3", type: "word_bank",
          prompt: "Di que es el mejor restaurante:",
          payload: { words: ["best", "It's", "the", "restaurant"], answer: ["It's", "the", "best", "restaurant"] },
        },
        {
          id: "a2cm-write-a4", type: "multiple_choice",
          prompt: "Which is the correct comparative of 'big'?",
          payload: { choices: ["more big", "bigger", "biggest"], answer: 1 },
        },
      ],
    },
  ],
};
