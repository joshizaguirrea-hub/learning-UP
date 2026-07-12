/**
 * data/units/literature-c1.js — Unidad tematica "Literature & interpretation" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: relativas con cuantificador/preposicion.
 */

export const LITERATURE_C1 = {
  id: "literature-c1",
  language: "en",
  level: "C1",
  title: "Literature & interpretation",
  subtitle: "Interpretar textos literarios con estructuras relativas complejas",

  cando: [
    "Puedo interpretar textos literarios y su significado.",
    "Puedo usar relativas con cuantificador y preposicion (most of which, to whom).",
    "Puedo dar informacion precisa y elegante sobre personas y cosas.",
    "Puedo escribir un analisis literario breve.",
  ],

  vocab: [
    { id: "c1lit-1", term: "novel", translation: "novela", example: "The novel is a masterpiece." },
    { id: "c1lit-2", term: "character", translation: "personaje", example: "The main character is complex." },
    { id: "c1lit-3", term: "theme", translation: "tema", example: "The theme is loss." },
    { id: "c1lit-4", term: "metaphor", translation: "metafora", example: "It's a powerful metaphor." },
    { id: "c1lit-5", term: "narrator", translation: "narrador", example: "The narrator is unreliable." },
    { id: "c1lit-6", term: "plot", translation: "trama", example: "The plot twists at the end." },
    { id: "c1lit-7", term: "to interpret", translation: "interpretar", example: "Readers interpret it differently." },
    { id: "c1lit-8", term: "symbolism", translation: "simbolismo", example: "The symbolism is subtle." },
    { id: "c1lit-9", term: "imagery", translation: "imagenes / lenguaje visual", example: "The imagery is vivid." },
    { id: "c1lit-10", term: "meaning", translation: "significado", example: "The hidden meaning is clear." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1lit-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: capas de significado",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "The novel has many characters, most of whom are struggling with loss. The narrator, whose " +
          "voice is unreliable, guides us through a plot in which nothing is certain. The author uses " +
          "metaphors, some of which are hard to interpret. There are several themes, all of which relate " +
          "to memory. The imagery, to which critics have devoted essays, is rich in symbolism. It is a " +
          "book whose meaning changes with every reading.",
        keyPhrases: [
          "Fijate en relativas con cuantificador: most of whom, some of which, all of which.",
          "Fijate en relativas con preposicion: a plot in which..., to which critics...",
        ],
        check: [
          { prompt: "What are most characters struggling with?", choices: ["Loss", "Money", "Time"], answer: 0 },
          { prompt: "How is the narrator described?", choices: ["Reliable", "Unreliable", "Silent"], answer: 1 },
          { prompt: "What do all the themes relate to?", choices: ["Memory", "War", "Love only"], answer: 0 },
          { prompt: "What changes with every reading?", choices: ["The meaning", "The cover", "The length"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1lit-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: literatura",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "novel / character", translation: "novela / personaje" },
        { term: "theme / plot", translation: "tema / trama" },
        { term: "metaphor / symbolism", translation: "metafora / simbolismo" },
        { term: "narrator", translation: "narrador" },
        { term: "to interpret / meaning", translation: "interpretar / significado" },
        { term: "imagery", translation: "imagenes / lenguaje visual" },
      ],
      activities: [
        {
          id: "c1lit-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "novel", right: "novela" },
            { left: "theme", right: "tema" },
            { left: "narrator", right: "narrador" },
          ] },
        },
        {
          id: "c1lit-vocab-a2", type: "cloze",
          prompt: "Completa: 'It's a powerful ___.' (metafora)",
          payload: { answer: "metaphor" },
          explain: "'Metaphor' = metafora.",
        },
        {
          id: "c1lit-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'interpretar'?",
          payload: { choices: ["to interpret", "to read", "to write"], answer: 0 },
          explain: "'To interpret' = interpretar.",
        },
        {
          id: "c1lit-vocab-a4", type: "cloze",
          prompt: "Completa: 'The hidden ___ is clear.' (significado)",
          payload: { answer: "meaning" },
          explain: "'Meaning' = significado.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1lit-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: relativas complejas",
      intro: "Competencia de GRAMATICA. Aprende relativas con cuantificador y preposicion.",
      grammar: {
        title: "Relative clauses with quantifiers / prepositions",
        form: "quantifier + of + which/whom: most of whom, some of which · prep + which/whom: in which, to whom",
        examples: ["The students, most of whom passed, celebrated.", "The house in which she lived is old.", "The person to whom I spoke."],
        mistakes: [
          { wrong: "The students, most of them passed, celebrated.", right: "The students, most of whom passed, celebrated." },
          { wrong: "The house which she lived in it is old.", right: "The house in which she lived is old." },
        ],
      },
      activities: [
        {
          id: "c1lit-gram-a1", type: "cloze",
          prompt: "Completa: 'The team, most of ___ agreed, voted yes.' (personas)",
          payload: { answer: "whom" },
          explain: "'most of whom' para personas.",
        },
        {
          id: "c1lit-gram-a2", type: "cloze",
          prompt: "Completa: 'The ideas, some of ___ were new, helped.' (cosas)",
          payload: { answer: "which" },
          explain: "'some of which' para cosas.",
        },
        {
          id: "c1lit-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "The person to whom I spoke was kind.",
            "The person to who I spoke was kind.",
            "The person which I spoke to whom was kind.",
          ], answer: 0 },
          explain: "Formal: preposicion + whom ('to whom').",
        },
        {
          id: "c1lit-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["which", "in", "house", "The", "she", "lived"], answer: ["The", "house", "in", "which", "she", "lived"] },
          explain: "Orden: The + house + in + which + she + lived.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1lit-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: un analisis literario",
      intro: "Competencia de ESCRITURA. Construye frases con relativas complejas. Ordena cada frase.",
      activities: [
        {
          id: "c1lit-write-a1", type: "word_bank",
          prompt: "Describe la casa en la que vivio:",
          payload: { words: ["which", "in", "house", "The", "she", "lived"], answer: ["The", "house", "in", "which", "she", "lived"] },
        },
        {
          id: "c1lit-write-a2", type: "word_bank",
          prompt: "Di que los lectores lo interpretan distinto:",
          payload: { words: ["it", "Readers", "differently", "interpret"], answer: ["Readers", "interpret", "it", "differently"] },
        },
        {
          id: "c1lit-write-a3", type: "word_bank",
          prompt: "Di que el simbolismo es sutil:",
          payload: { words: ["subtle", "The", "is", "symbolism"], answer: ["The", "symbolism", "is", "subtle"] },
        },
        {
          id: "c1lit-write-a4", type: "multiple_choice",
          prompt: "Which is correct for people (formal)?",
          payload: { choices: ["most of which", "most of whom", "most of who"], answer: 1 },
        },
      ],
    },
  ],
};
