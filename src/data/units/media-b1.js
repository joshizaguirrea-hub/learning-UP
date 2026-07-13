/**
 * data/units/media-b1.js — Unidad tematica "Media & news" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: reported speech.
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
    { id: "med-11", term: "broadcast", translation: "transmision / emitir", example: "The match was broadcast live." },
    { id: "med-12", term: "reporter", translation: "reportero", example: "The reporter asked questions." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "med-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la noticia del dia",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A new park\n" +
          "Yesterday, a journalist reported an important story. The headline said that a new park would " +
          "open in the city. The mayor announced that it was a gift for families. A reporter said that " +
          "the park had cost two million dollars. Some people said they were happy, but others told " +
          "journalists that they wanted a hospital instead. Always check your source, because there is a " +
          "lot of fake news online.\n\n" +
          "TEXT 2 - Talking about the news\n" +
          "A: Did you see the news last night? B: Yes! They said the storm would arrive on Sunday. A: The " +
          "reporter told people to stay at home. B: I know. My neighbour said she had bought food for a " +
          "week. A: Good idea. I read an article that gave safety tips too.",
        glossary: [
          { term: "said that / told", translation: "dijo que / le dijo a" },
          { term: "would open / would arrive", translation: "abriria / llegaria" },
          { term: "announced / reported", translation: "anuncio / reporto" },
          { term: "headline / article", translation: "titular / articulo" },
          { term: "journalist / reporter", translation: "periodista / reportero" },
          { term: "fake news / source", translation: "noticias falsas / fuente" },
          { term: "to broadcast", translation: "emitir / transmitir" },
          { term: "safety tips", translation: "consejos de seguridad" },
        ],
        keyPhrases: [
          "Fijate en 'said that' y 'told' (estilo indirecto).",
          "Busca lo que anuncio el alcalde y lo que dijo el reportero.",
        ],
        check: [
          { prompt: "T1: What did the headline say?", choices: ["A new park would open", "A hospital closed", "Taxes went up"], answer: 0 },
          { prompt: "T1: What did the mayor announce?", choices: ["It was a gift for families", "It was a mistake", "It was expensive"], answer: 0 },
          { prompt: "T1: What should you always check?", choices: ["The weather", "Your source", "The price"], answer: 1 },
          { prompt: "T2: What did they say about the storm?", choices: ["It would arrive on Sunday", "It was over", "It was fake"], answer: 0 },
          { prompt: "T2: What did the reporter tell people to do?", choices: ["Stay at home", "Go out", "Travel"], answer: 0 },
          { prompt: "T2: What did the neighbour say she had done?", choices: ["Bought food", "Left the city", "Called the mayor"], answer: 0 },
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
        { term: "journalist / reporter", translation: "periodista / reportero" },
        { term: "to report / article", translation: "reportar / articulo" },
        { term: "channel / broadcast", translation: "canal / transmision" },
        { term: "advertisement / to announce", translation: "anuncio / anunciar" },
        { term: "fake news / source", translation: "noticias falsas / fuente" },
      ],
      activities: [
        {
          id: "med-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "news", right: "noticias" },
            { left: "headline", right: "titular" },
            { left: "source", right: "fuente" },
            { left: "article", right: "articulo" },
          ] },
        },
        {
          id: "med-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "journalist", right: "periodista" },
            { left: "reporter", right: "reportero" },
            { left: "channel", right: "canal" },
            { left: "advertisement", right: "anuncio" },
          ] },
        },
        {
          id: "med-vocab-a3", type: "cloze",
          prompt: "Completa: 'She is a famous ___.' (periodista)",
          payload: { answer: "journalist" },
          explain: "'Journalist' = periodista.",
        },
        {
          id: "med-vocab-a4", type: "cloze",
          prompt: "Completa: 'Be careful with ___ news.' (falsas)",
          payload: { answer: "fake" },
          explain: "'Fake news' = noticias falsas.",
        },
        {
          id: "med-vocab-a5", type: "cloze",
          prompt: "Completa: 'The match was ___ live.' (transmitido)",
          payload: { answer: "broadcast" },
          explain: "'Broadcast' = emitir / transmitir (igual en pasado).",
        },
        {
          id: "med-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'anunciar'?",
          payload: { choices: ["to report", "to announce", "to check"], answer: 1 },
          explain: "'To announce' = anunciar.",
        },
        {
          id: "med-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'fuente'?",
          payload: { choices: ["source", "channel", "headline"], answer: 0 },
          explain: "'Source' = fuente.",
        },
        {
          id: "med-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["source", "your", "Check"], answer: ["Check", "your", "source"] },
          explain: "'Check your source' = revisa tu fuente.",
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
          id: "med-gram-a4", type: "multiple_choice",
          prompt: "'I will go' -> She said she ___ go.",
          payload: { choices: ["will", "would", "goes"], answer: 1 },
          explain: "will -> would en estilo indirecto.",
        },
        {
          id: "med-gram-a5", type: "multiple_choice",
          prompt: "Which verb needs a person after it?",
          payload: { choices: ["said", "told", "announced"], answer: 1 },
          explain: "'told' + persona: told me / told him.",
        },
        {
          id: "med-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["said", "tired", "He", "he", "was"], answer: ["He", "said", "he", "was", "tired"] },
          explain: "He + said + he + was + tired.",
        },
        {
          id: "med-gram-a7", type: "word_bank",
          prompt: "Ordena con 'told':",
          payload: { words: ["me", "She", "happy", "told", "she", "was"], answer: ["She", "told", "me", "she", "was", "happy"] },
          explain: "She + told + me + she + was + happy.",
        },
        {
          id: "med-gram-a8", type: "cloze",
          prompt: "Completa: 'The reporter told people ___ stay at home.' (particula)",
          payload: { answer: "to" },
          explain: "Ordenes reportadas: told + persona + to + base.",
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
      intro: "Competencia de ESCRITURA. Construye frases para reportar lo que alguien dijo.",
      activities: [
        {
          id: "med-write-a1", type: "word_bank",
          prompt: "1. Reporta que el dijo que estaba cansado:",
          payload: { words: ["said", "tired", "He", "he", "was"], answer: ["He", "said", "he", "was", "tired"] },
        },
        {
          id: "med-write-a2", type: "word_bank",
          prompt: "2. Reporta que ella te dijo que estaba feliz:",
          payload: { words: ["me", "She", "happy", "told", "she", "was"], answer: ["She", "told", "me", "she", "was", "happy"] },
        },
        {
          id: "med-write-a3", type: "word_bank",
          prompt: "3. Di que siempre revisas tu fuente:",
          payload: { words: ["source", "I", "check", "always", "my"], answer: ["I", "always", "check", "my", "source"] },
        },
        {
          id: "med-write-a4", type: "word_bank",
          prompt: "4. Reporta que dijeron que la tormenta llegaria:",
          payload: { words: ["arrive", "They", "the", "said", "would", "storm"], answer: ["They", "said", "the", "storm", "would", "arrive"] },
        },
        {
          id: "med-write-a5", type: "word_bank",
          prompt: "5. Di que leiste un articulo interesante:",
          payload: { words: ["an", "I", "article", "interesting", "read"], answer: ["I", "read", "an", "interesting", "article"] },
        },
        {
          id: "med-write-a6", type: "multiple_choice",
          prompt: "6. Which verb is used for reported commands?",
          payload: { choices: ["said", "told", "asked"], answer: 1 },
        },
        {
          id: "med-write-a7", type: "multiple_choice",
          prompt: "7. 'I am happy' becomes: He said he ___ happy.",
          payload: { choices: ["is", "was", "will be"], answer: 1 },
        },
        {
          id: "med-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'noticias falsas'?",
          payload: { choices: ["headline", "fake news", "channel"], answer: 1 },
        },
      ],
    },
  ],
};
