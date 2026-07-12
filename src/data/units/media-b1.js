/**
 * data/units/media-b1.js — Unidad tematica "Media & news" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: reported speech.
 */

export const MEDIA_B1 = {
  id: "media-b1",
  language: "en",
  level: "B1",
  title: "Media & news",
  subtitle: "Hablar de noticias, medios y contar lo que otros dijeron",

  cando: [
    "Puedo hablar de noticias y medios de comunicacion.",
    "Puedo usar el estilo indirecto (reported speech) basico.",
    "Puedo contar lo que otra persona dijo.",
    "Puedo escribir un resumen de una noticia.",
  ],

  vocab: [
    { id: "med-1", term: "news", translation: "noticias", example: "I watch the news every night." },
    { id: "med-2", term: "headline", translation: "titular", example: "The headline was shocking." },
    { id: "med-3", term: "journalist", translation: "periodista", example: "She is a famous journalist." },
    { id: "med-4", term: "to report", translation: "informar / reportar", example: "They reported the story." },
    { id: "med-5", term: "article", translation: "articulo", example: "I read an interesting article." },
    { id: "med-6", term: "channel", translation: "canal", example: "Change the channel, please." },
    { id: "med-7", term: "advertisement", translation: "anuncio / publicidad", example: "The advertisement was funny." },
    { id: "med-8", term: "to announce", translation: "anunciar", example: "They announced the results." },
    { id: "med-9", term: "fake news", translation: "noticias falsas", example: "Be careful with fake news." },
    { id: "med-10", term: "source", translation: "fuente", example: "Check your source." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "med-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la noticia del dia",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Yesterday, a journalist reported an important story. The headline said that a new park " +
          "would open in the city. The mayor announced that it was a gift for families. A reporter " +
          "said that the park had cost two million dollars. Some people said they were happy, but " +
          "others told journalists that they wanted a hospital instead. Always check your source, " +
          "because there is a lot of fake news online.",
        keyPhrases: [
          "Fijate en 'said that' y 'told' (estilo indirecto).",
          "Busca que anuncio el alcalde y que querian algunos.",
        ],
        check: [
          { prompt: "What did the headline say?", choices: ["A new park would open", "A hospital closed", "Taxes went up"], answer: 0 },
          { prompt: "What did the mayor announce?", choices: ["It was a gift for families", "It was a mistake", "It was expensive"], answer: 0 },
          { prompt: "What did some other people want?", choices: ["A park", "A hospital", "A school"], answer: 1 },
          { prompt: "What should you always check?", choices: ["The weather", "Your source", "The price"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "med-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: medios y noticias",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "news / headline", translation: "noticias / titular" },
        { term: "journalist", translation: "periodista" },
        { term: "to report / article", translation: "reportar / articulo" },
        { term: "channel", translation: "canal" },
        { term: "advertisement", translation: "anuncio" },
        { term: "fake news / source", translation: "noticias falsas / fuente" },
      ],
      activities: [
        {
          id: "med-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "news", right: "noticias" },
            { left: "headline", right: "titular" },
            { left: "source", right: "fuente" },
          ] },
        },
        {
          id: "med-vocab-a2", type: "cloze",
          prompt: "Completa: 'She is a famous ___.' (periodista)",
          payload: { answer: "journalist" },
          explain: "'Journalist' = periodista.",
        },
        {
          id: "med-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'anunciar'?",
          payload: { choices: ["to report", "to announce", "to check"], answer: 1 },
          explain: "'To announce' = anunciar.",
        },
        {
          id: "med-vocab-a4", type: "cloze",
          prompt: "Completa: 'Be careful with ___ news.' (falsas)",
          payload: { answer: "fake" },
          explain: "'Fake news' = noticias falsas.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "med-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: estilo indirecto",
      intro: "Competencia de GRAMATICA. Aprende a contar lo que alguien dijo (reported speech).",
      grammar: {
        title: "Reported speech (basico)",
        form: "say -> said (that) · tell -> told (someone) · el verbo retrocede en el tiempo",
        examples: ["'I am tired' -> He said he was tired.", "'I will go' -> She said she would go."],
        mistakes: [
          { wrong: "He said me he was tired.", right: "He told me he was tired." },
          { wrong: "She said that she is happy.", right: "She said that she was happy." },
        ],
      },
      activities: [
        {
          id: "med-gram-a1", type: "cloze",
          prompt: "Completa: 'He ___ that he was tired.' (say -> pasado)",
          payload: { answer: "said" },
          explain: "'say' -> 'said'.",
        },
        {
          id: "med-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ me she was happy.' (tell -> pasado)",
          payload: { answer: "told" },
          explain: "'tell' -> 'told' + persona.",
        },
        {
          id: "med-gram-a3", type: "multiple_choice",
          prompt: "'I am busy' -> He said that he ___ busy.",
          payload: { choices: ["is", "was", "will be"], answer: 1 },
          explain: "El presente retrocede a pasado: is -> was.",
        },
        {
          id: "med-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["said", "tired", "He", "he", "was"], answer: ["He", "said", "he", "was", "tired"] },
          explain: "Orden: He + said + he + was + tired.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "med-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: resume una noticia",
      intro: "Competencia de ESCRITURA. Construye frases para reportar lo que alguien dijo. Ordena cada frase.",
      activities: [
        {
          id: "med-write-a1", type: "word_bank",
          prompt: "Reporta que el dijo que estaba cansado:",
          payload: { words: ["said", "tired", "He", "he", "was"], answer: ["He", "said", "he", "was", "tired"] },
        },
        {
          id: "med-write-a2", type: "word_bank",
          prompt: "Reporta que ella te dijo que estaba feliz:",
          payload: { words: ["me", "She", "happy", "told", "she", "was"], answer: ["She", "told", "me", "she", "was", "happy"] },
        },
        {
          id: "med-write-a3", type: "word_bank",
          prompt: "Di que siempre revisas tu fuente:",
          payload: { words: ["source", "I", "check", "always", "my"], answer: ["I", "always", "check", "my", "source"] },
        },
        {
          id: "med-write-a4", type: "multiple_choice",
          prompt: "Which verb needs a person after it (told ___)?",
          payload: { choices: ["said", "told", "announced"], answer: 1 },
        },
      ],
    },
  ],
};
