/**
 * data/units/literature-c1.js — Unidad tematica "Literature & interpretation" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: relativas con cuantificador/preposicion.
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
    { id: "c1lit-11", term: "author", translation: "autor", example: "The author won a prize." },
    { id: "c1lit-12", term: "chapter", translation: "capitulo", example: "The last chapter is sad." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1lit-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: capas de significado",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Layers of meaning\n" +
          "The novel has many characters, most of whom are struggling with loss. The narrator, whose voice " +
          "is unreliable, guides us through a plot in which nothing is certain. The author uses metaphors, " +
          "some of which are hard to interpret. There are several themes, all of which relate to memory. " +
          "The imagery, to which critics have devoted essays, is rich in symbolism.\n\n" +
          "TEXT 2 - A book club\n" +
          "A: What did you think of the book? B: The characters, many of whom felt real, were amazing. A: " +
          "And the ending? B: The final chapter, in which everything changes, was brilliant. A: The author, " +
          "whose style I love, is a genius. B: The themes, all of which are universal, moved me.",
        glossary: [
          { term: "most of whom", translation: "la mayoria de los cuales" },
          { term: "some of which", translation: "algunos de los cuales" },
          { term: "all of which", translation: "todos los cuales" },
          { term: "in which / to which", translation: "en el cual / al cual" },
          { term: "whose voice / whose style", translation: "cuya voz / cuyo estilo" },
          { term: "narrator / author", translation: "narrador / autor" },
          { term: "metaphor / symbolism", translation: "metafora / simbolismo" },
          { term: "theme / plot / chapter", translation: "tema / trama / capitulo" },
        ],
        keyPhrases: [
          "Fijate en relativas con cuantificador: most of whom, some of which, all of which.",
          "Fijate en relativas con preposicion: a plot in which..., to which critics...",
        ],
        check: [
          { prompt: "T1: What are most characters struggling with?", choices: ["Loss", "Money", "Time"], answer: 0 },
          { prompt: "T1: How is the narrator described?", choices: ["Reliable", "Unreliable", "Silent"], answer: 1 },
          { prompt: "T1: What do all the themes relate to?", choices: ["Memory", "War", "Love only"], answer: 0 },
          { prompt: "T2: How did B feel about the characters?", choices: ["Many felt real", "They were boring", "Too few"], answer: 0 },
          { prompt: "T2: What happens in the final chapter?", choices: ["Everything changes", "Nothing", "It repeats"], answer: 0 },
          { prompt: "T2: What does A love about the author?", choices: ["Their style", "Their fame", "Their money"], answer: 0 },
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
        { term: "novel / chapter", translation: "novela / capitulo" },
        { term: "character / narrator", translation: "personaje / narrador" },
        { term: "theme / plot", translation: "tema / trama" },
        { term: "metaphor / symbolism", translation: "metafora / simbolismo" },
        { term: "to interpret / meaning", translation: "interpretar / significado" },
        { term: "imagery / author", translation: "imagenes / autor" },
      ],
      activities: [
        {
          id: "c1lit-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "novel", right: "novela" },
            { left: "theme", right: "tema" },
            { left: "narrator", right: "narrador" },
            { left: "author", right: "autor" },
          ] },
        },
        {
          id: "c1lit-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "plot", right: "trama" },
            { left: "metaphor", right: "metafora" },
            { left: "symbolism", right: "simbolismo" },
            { left: "chapter", right: "capitulo" },
          ] },
        },
        {
          id: "c1lit-vocab-a3", type: "cloze",
          prompt: "Completa: 'It's a powerful ___.' (metafora)",
          payload: { answer: "metaphor" },
          explain: "'Metaphor' = metafora.",
        },
        {
          id: "c1lit-vocab-a4", type: "cloze",
          prompt: "Completa: 'The hidden ___ is clear.' (significado)",
          payload: { answer: "meaning" },
          explain: "'Meaning' = significado.",
        },
        {
          id: "c1lit-vocab-a5", type: "cloze",
          prompt: "Completa: 'The ___ is vivid.' (imagenes / lenguaje visual)",
          payload: { answer: "imagery" },
          explain: "'Imagery' = imagenes / lenguaje visual.",
        },
        {
          id: "c1lit-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'interpretar'?",
          payload: { choices: ["to interpret", "to read", "to write"], answer: 0 },
          explain: "'To interpret' = interpretar.",
        },
        {
          id: "c1lit-vocab-a7", type: "multiple_choice",
          prompt: "Who tells the story?",
          payload: { choices: ["the narrator", "the plot", "the theme"], answer: 0 },
          explain: "'Narrator' = narrador.",
        },
        {
          id: "c1lit-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["it", "Readers", "differently", "interpret"], answer: ["Readers", "interpret", "it", "differently"] },
          explain: "Readers + interpret + it + differently.",
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
          id: "c1lit-gram-a4", type: "multiple_choice",
          prompt: "Which is correct for people (formal)?",
          payload: { choices: ["most of which", "most of whom", "most of who"], answer: 1 },
          explain: "'most of whom' para personas.",
        },
        {
          id: "c1lit-gram-a5", type: "cloze",
          prompt: "Completa: 'The themes, all of ___ relate to memory.' (cosas)",
          payload: { answer: "which" },
          explain: "'all of which' para cosas.",
        },
        {
          id: "c1lit-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["which", "in", "house", "The", "she", "lived"], answer: ["The", "house", "in", "which", "she", "lived"] },
          explain: "The + house + in + which + she + lived.",
        },
        {
          id: "c1lit-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["whom", "team,", "The", "most", "of", "agreed"], answer: ["The", "team,", "most", "of", "whom", "agreed"] },
          explain: "The + team, + most + of + whom + agreed.",
        },
        {
          id: "c1lit-gram-a8", type: "cloze",
          prompt: "Completa: 'The imagery, to ___ critics devoted essays, is rich.' (cosa)",
          payload: { answer: "which" },
          explain: "'to which' (preposicion + which) para cosas.",
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
      intro: "Competencia de ESCRITURA. Construye frases con relativas complejas.",
      activities: [
        {
          id: "c1lit-write-a1", type: "word_bank",
          prompt: "1. Describe la casa en la que vivio:",
          payload: { words: ["which", "in", "house", "The", "she", "lived"], answer: ["The", "house", "in", "which", "she", "lived"] },
        },
        {
          id: "c1lit-write-a2", type: "word_bank",
          prompt: "2. Di que los lectores lo interpretan distinto:",
          payload: { words: ["it", "Readers", "differently", "interpret"], answer: ["Readers", "interpret", "it", "differently"] },
        },
        {
          id: "c1lit-write-a3", type: "word_bank",
          prompt: "3. Di que el simbolismo es sutil:",
          payload: { words: ["subtle", "The", "is", "symbolism"], answer: ["The", "symbolism", "is", "subtle"] },
        },
        {
          id: "c1lit-write-a4", type: "word_bank",
          prompt: "4. Describe al equipo (la mayoria estuvo de acuerdo):",
          payload: { words: ["whom", "team,", "The", "most", "of", "agreed"], answer: ["The", "team,", "most", "of", "whom", "agreed"] },
        },
        {
          id: "c1lit-write-a5", type: "word_bank",
          prompt: "5. Di que el autor gano un premio:",
          payload: { words: ["a", "The", "won", "author", "prize"], answer: ["The", "author", "won", "a", "prize"] },
        },
        {
          id: "c1lit-write-a6", type: "multiple_choice",
          prompt: "6. Which is correct for people (formal)?",
          payload: { choices: ["most of which", "most of whom", "most of who"], answer: 1 },
        },
        {
          id: "c1lit-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["The book, some of which pages were torn.", "The book, some of whose pages were torn.", "The book, some of who pages were torn."], answer: 1 },
        },
        {
          id: "c1lit-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'significado'?",
          payload: { choices: ["meaning", "plot", "theme"], answer: 0 },
        },
      ],
    },
  ],
};
