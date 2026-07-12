/**
 * data/units/a2-comparisons.js — Unidad tematica "Comparisons" (A2).
 *
 * Datos PUROS. Comparativos y superlativos para comparar personas y lugares.
 * Ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    {
      id: "a2cm-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: dos ciudades",
      intro:
        "Lee la comparacion y estudia comparativos y superlativos. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "I live in a small town, but my sister lives in a big city. The city is bigger and busier " +
          "than my town. Life there is more expensive, and the traffic is worse. But the city has the " +
          "best restaurants and the most popular museums. My town is quieter and cheaper. For me, my " +
          "town is more beautiful, but the city is more exciting. Which one is better? It depends!",
        glossary: [
          { term: "bigger than", translation: "mas grande que" },
          { term: "more expensive", translation: "mas caro" },
          { term: "worse", translation: "peor (bad)" },
          { term: "the best", translation: "el/la mejor" },
          { term: "the most popular", translation: "el/la mas popular" },
          { term: "quieter", translation: "mas tranquilo" },
        ],
        keyPhrases: [
          "X is bigger than Y. (X es mas grande que Y.)",
          "X is more expensive than Y. (X es mas caro que Y.)",
          "It's the best / the most... (Es el mejor / el mas...)",
          "It depends! (Depende!)",
        ],
        note:
          "Adjetivos cortos: +er (big->bigger) y the +est (the biggest). Adjetivos largos: more + adj " +
          "(more expensive) y the most + adj. Irregulares: good/better/best, bad/worse/worst.",
        grammar: {
          title: "Comparativo y superlativo",
          form: "corto: adj+er ... than / the adj+est · largo: more adj than / the most adj",
          examples: [
            "The train is faster than the bus.",
            "It's the most popular beach.",
          ],
          mistakes: [
            { wrong: "It's more bigger.", right: "It's bigger." },
            { wrong: "She is the most tall.", right: "She is the tallest." },
          ],
        },
        check: [
          { prompt: "Where is life more expensive?", choices: ["The town", "The city", "Both same"], answer: 1 },
          { prompt: "What does the town have?", choices: ["The best museums", "More traffic", "A quieter life"], answer: 2 },
        ],
      },
      activities: [],
    },
    {
      id: "a2cm-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: comparar",
      intro: "Usamos -er/more + 'than' para comparar. Lee el dialogo.",
      dialogue: [
        "A: Is the bus faster than the train?",
        "B: No, the train is faster and more comfortable.",
        "A: But the bus is cheaper, right?",
        "B: Yes, the bus is the cheapest option.",
      ],
      activities: [
        {
          id: "a2cm-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct comparative:",
          payload: { choices: ["more big", "bigger", "biggest"], answer: 1 },
          explain: "Adjetivo corto 'big' -> 'bigger'.",
        },
        {
          id: "a2cm-l1-a2", type: "matching",
          prompt: "Empareja el adjetivo con su comparativo:",
          payload: { pairs: [
            { left: "good", right: "better" },
            { left: "bad", right: "worse" },
            { left: "fast", right: "faster" },
          ] },
        },
      ],
    },
    {
      id: "a2cm-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: comparativos y superlativos",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2cm-l2-a1", type: "cloze",
          prompt: "Completa: 'The train is ___ than the bus.' (fast -> comparativo)",
          payload: { answer: "faster" },
          explain: "Adjetivo corto: fast -> faster.",
        },
        {
          id: "a2cm-l2-a2", type: "cloze",
          prompt: "Completa: 'It's the ___ popular beach.' (superlativo largo)",
          payload: { answer: "most" },
          explain: "Adjetivo largo: the most popular.",
        },
        {
          id: "a2cm-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "This car is more expensiver.",
            "This car is more expensive.",
            "This car is expensiver.",
          ], answer: 1 },
          explain: "Adjetivo largo: 'more expensive' (no se combina con -er).",
        },
        {
          id: "a2cm-l2-a4", type: "word_bank",
          prompt: "Ordena la comparacion:",
          payload: { words: ["taller", "He", "than", "is", "me"],
                     answer: ["He", "is", "taller", "than", "me"] },
          explain: "Orden: He + is + taller + than + me.",
        },
        {
          id: "a2cm-l2-a5", type: "cloze",
          prompt: "Completa: 'This is the ___ cafe in town.' (good -> superlativo)",
          payload: { answer: "best" },
          explain: "Irregular: good -> the best.",
        },
      ],
    },
    {
      id: "a2cm-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: compara dos lugares",
      intro: "Tarea real: construye comparaciones. Ordena cada frase.",
      activities: [
        {
          id: "a2cm-l3-a1", type: "word_bank",
          prompt: "Di que la ciudad es mas grande que el pueblo:",
          payload: { words: ["bigger", "The", "city", "the", "than", "is", "town"],
                     answer: ["The", "city", "is", "bigger", "than", "the", "town"] },
        },
        {
          id: "a2cm-l3-a2", type: "word_bank",
          prompt: "Di que el bus es mas barato:",
          payload: { words: ["cheaper", "The", "is", "bus"],
                     answer: ["The", "bus", "is", "cheaper"] },
        },
        {
          id: "a2cm-l3-a3", type: "word_bank",
          prompt: "Di que es el mejor restaurante:",
          payload: { words: ["best", "It's", "the", "restaurant"],
                     answer: ["It's", "the", "best", "restaurant"] },
        },
        {
          id: "a2cm-l3-a4", type: "multiple_choice",
          prompt: "What is the superlative of 'bad'?",
          payload: { choices: ["baddest", "worse", "the worst"], answer: 2 },
        },
      ],
    },
  ],
};
