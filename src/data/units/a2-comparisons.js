/**
 * data/units/a2-comparisons.js — Unidad tematica "Comparisons" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a2cm-11", term: "quiet / quieter", translation: "tranquilo / mas tranquilo", example: "The town is quieter." },
    { id: "a2cm-12", term: "busy / busier", translation: "concurrido / mas concurrido", example: "The city is busier." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2cm-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: dos ciudades",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Town vs city\n" +
          "I live in a small town, but my sister lives in a big city. The city is bigger and busier than " +
          "my town. Life there is more expensive, and the traffic is worse. But the city has the best " +
          "restaurants and the most popular museums. My town is quieter and cheaper. For me, my town is " +
          "more beautiful, but the city is more exciting. Which one is better? It depends!\n\n" +
          "TEXT 2 - Choosing transport\n" +
          "A: Should we take the bus or the train? B: The train is faster than the bus. A: But the bus is " +
          "cheaper, right? B: Yes, the bus is the cheapest option. A: And which is more comfortable? " +
          "B: The train, definitely. It's the best choice for a long trip.",
        glossary: [
          { term: "bigger / busier than", translation: "mas grande / concurrido que" },
          { term: "more expensive", translation: "mas caro" },
          { term: "worse / the best", translation: "peor / el mejor" },
          { term: "the most popular", translation: "el/la mas popular" },
          { term: "quieter / cheaper", translation: "mas tranquilo / mas barato" },
          { term: "the cheapest", translation: "el/la mas barato" },
          { term: "comfortable", translation: "comodo" },
          { term: "It depends!", translation: "depende!" },
        ],
        keyPhrases: [
          "Compara: que es mas grande, mas caro, mas tranquilo.",
          "Fijate en los superlativos: the best, the most popular, the cheapest.",
        ],
        check: [
          { prompt: "T1: Where is life more expensive?", choices: ["The town", "The city", "Both same"], answer: 1 },
          { prompt: "T1: What does the town have?", choices: ["The best museums", "More traffic", "A quieter life"], answer: 2 },
          { prompt: "T1: Which is more exciting?", choices: ["The town", "The city", "Neither"], answer: 1 },
          { prompt: "T2: Which is faster?", choices: ["The bus", "The train", "Both same"], answer: 1 },
          { prompt: "T2: Which is the cheapest option?", choices: ["The bus", "The train", "A taxi"], answer: 0 },
          { prompt: "T2: What is the best choice for a long trip?", choices: ["The bus", "The train", "Walking"], answer: 1 },
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
        { term: "fast / quiet", translation: "rapido / tranquilo" },
        { term: "busy / popular", translation: "concurrido / popular" },
        { term: "good / bad", translation: "bueno / malo" },
        { term: "beautiful / than", translation: "hermoso / que" },
      ],
      activities: [
        {
          id: "a2cm-vocab-a1", type: "matching",
          prompt: "Empareja adjetivo y comparativo (1/2):",
          payload: { pairs: [
            { left: "good", right: "better" },
            { left: "bad", right: "worse" },
            { left: "fast", right: "faster" },
            { left: "big", right: "bigger" },
          ] },
        },
        {
          id: "a2cm-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "cheap", right: "barato" },
            { left: "expensive", right: "caro" },
            { left: "quiet", right: "tranquilo" },
            { left: "busy", right: "concurrido" },
          ] },
        },
        {
          id: "a2cm-vocab-a3", type: "cloze",
          prompt: "Completa: 'He is taller ___ me.' (que)",
          payload: { answer: "than" },
          explain: "'than' conecta la comparacion.",
        },
        {
          id: "a2cm-vocab-a4", type: "cloze",
          prompt: "Completa: 'The town is ___ than the city.' (quiet -> comparativo)",
          payload: { answer: "quieter" },
          explain: "quiet -> quieter.",
        },
        {
          id: "a2cm-vocab-a5", type: "cloze",
          prompt: "Completa: 'The city is ___ than the town.' (busy -> comparativo)",
          payload: { answer: "busier" },
          explain: "busy -> busier (y -> i + er).",
        },
        {
          id: "a2cm-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'barato'?",
          payload: { choices: ["expensive", "cheap", "popular"], answer: 1 },
          explain: "'Cheap' = barato.",
        },
        {
          id: "a2cm-vocab-a7", type: "multiple_choice",
          prompt: "What is the superlative of 'bad'?",
          payload: { choices: ["baddest", "worse", "the worst"], answer: 2 },
          explain: "Irregular: bad -> worse -> the worst.",
        },
        {
          id: "a2cm-vocab-a8", type: "word_bank",
          prompt: "Ordena la comparacion:",
          payload: { words: ["cheaper", "The", "is", "bus"], answer: ["The", "bus", "is", "cheaper"] },
          explain: "The + bus + is + cheaper.",
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
        form: "corto: adj+er ... than / the adj+est · largo: more adj than / the most adj · irregular: good/better/best",
        examples: ["The train is faster than the bus.", "It's the most popular beach.", "This is the best cafe."],
        explain: { tr: ["El tren es m\u00e1s r\u00e1pido que el autob\u00fas.", "Es la playa m\u00e1s popular.", "Este es el mejor caf\u00e9."] },
        mistakes: [
          { wrong: "It's more bigger.", right: "It's bigger." },
          { wrong: "She is the most tall.", right: "She is the tallest." },
          { wrong: "This car is more expensiver.", right: "This car is more expensive." },
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
          id: "a2cm-gram-a3", type: "cloze",
          prompt: "Completa: 'This is the ___ cafe in town.' (good -> superlativo)",
          payload: { answer: "best" },
          explain: "Irregular: good -> the best.",
        },
        {
          id: "a2cm-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["This car is more expensiver.", "This car is more expensive.", "This car is expensiver."], answer: 1 },
          explain: "Adjetivo largo: 'more expensive'.",
        },
        {
          id: "a2cm-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct comparative of 'big':",
          payload: { choices: ["more big", "bigger", "biggest"], answer: 1 },
          explain: "Adjetivo corto: big -> bigger.",
        },
        {
          id: "a2cm-gram-a6", type: "word_bank",
          prompt: "Ordena la comparacion:",
          payload: { words: ["taller", "He", "than", "is", "me"], answer: ["He", "is", "taller", "than", "me"] },
          explain: "He + is + taller + than + me.",
        },
        {
          id: "a2cm-gram-a7", type: "word_bank",
          prompt: "Ordena el superlativo:",
          payload: { words: ["best", "It's", "the", "restaurant"], answer: ["It's", "the", "best", "restaurant"] },
          explain: "It's + the + best + restaurant.",
        },
        {
          id: "a2cm-gram-a8", type: "cloze",
          prompt: "Completa: 'The bus is the ___ option.' (cheap -> superlativo)",
          payload: { answer: "cheapest" },
          explain: "Adjetivo corto: cheap -> the cheapest.",
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
      intro: "Competencia de ESCRITURA. Construye comparaciones, frase por frase.",
      activities: [
        {
          id: "a2cm-write-a1", type: "word_bank",
          prompt: "1. Di que la ciudad es mas grande que el pueblo:",
          payload: { words: ["bigger", "The", "city", "the", "than", "is", "town"], answer: ["The", "city", "is", "bigger", "than", "the", "town"] },
        },
        {
          id: "a2cm-write-a2", type: "word_bank",
          prompt: "2. Di que el bus es mas barato:",
          payload: { words: ["cheaper", "The", "is", "bus"], answer: ["The", "bus", "is", "cheaper"] },
        },
        {
          id: "a2cm-write-a3", type: "word_bank",
          prompt: "3. Di que es el mejor restaurante:",
          payload: { words: ["best", "It's", "the", "restaurant"], answer: ["It's", "the", "best", "restaurant"] },
        },
        {
          id: "a2cm-write-a4", type: "word_bank",
          prompt: "4. Di que el pueblo es mas tranquilo:",
          payload: { words: ["quieter", "The", "is", "town"], answer: ["The", "town", "is", "quieter"] },
        },
        {
          id: "a2cm-write-a5", type: "word_bank",
          prompt: "5. Di que es la playa mas popular:",
          payload: { words: ["popular", "It's", "most", "the", "beach"], answer: ["It's", "the", "most", "popular", "beach"] },
        },
        {
          id: "a2cm-write-a6", type: "multiple_choice",
          prompt: "6. What is the superlative of 'good'?",
          payload: { choices: ["gooder", "the best", "the most good"], answer: 1 },
        },
        {
          id: "a2cm-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["more cheaper", "cheaper", "cheapest than"], answer: 1 },
        },
        {
          id: "a2cm-write-a8", type: "multiple_choice",
          prompt: "8. Long adjectives use...",
          payload: { choices: ["-er / -est", "more / the most", "nothing"], answer: 1 },
        },
      ],
    },
  ],
};
