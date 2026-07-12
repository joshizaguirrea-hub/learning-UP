/**
 * data/units/a1-freetime.js — Unidad tematica "Free time & likes" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A1_FREETIME = {
  id: "a1-freetime",
  language: "en",
  level: "A1",
  title: "Free time & likes",
  subtitle: "Hablar de tus pasatiempos y de lo que sabes hacer",

  cando: [
    "Puedo hablar de mis pasatiempos.",
    "Puedo usar like/love/hate + verbo-ing.",
    "Puedo usar 'can' para decir lo que se hacer.",
    "Puedo preguntar a otros por sus gustos.",
  ],

  vocab: [
    { id: "a1ft-1", term: "hobby", translation: "pasatiempo", example: "My hobby is painting." },
    { id: "a1ft-2", term: "to read", translation: "leer", example: "I love reading books." },
    { id: "a1ft-3", term: "to swim", translation: "nadar", example: "She can swim very well." },
    { id: "a1ft-4", term: "to dance", translation: "bailar", example: "They like dancing." },
    { id: "a1ft-5", term: "to cook", translation: "cocinar", example: "He hates cooking." },
    { id: "a1ft-6", term: "music", translation: "musica", example: "I listen to music every day." },
    { id: "a1ft-7", term: "movie", translation: "pelicula", example: "We watch a movie on Friday." },
    { id: "a1ft-8", term: "game", translation: "juego", example: "Video games are fun." },
    { id: "a1ft-9", term: "to play", translation: "jugar / tocar", example: "I can play the guitar." },
    { id: "a1ft-10", term: "fun", translation: "divertido", example: "Dancing is fun!" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1ft-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: pasatiempos",
      intro: "Competencia de LECTURA. Lee sobre Max y comprueba que entendiste.",
      content: {
        reading:
          "Max has got a lot of hobbies. He loves reading and he likes listening to music. " +
          "On weekends, he plays the guitar with his friends. Max can swim very well, but he " +
          "can't dance! He hates cooking, so he usually eats with his family. His favourite " +
          "hobby is playing video games. He thinks games are fun.",
        keyPhrases: [
          "Busca lo que Max ama, le gusta y odia.",
          "Fijate en lo que 'can' y 'can't' hacer.",
        ],
        check: [
          { prompt: "What can Max do well?", choices: ["Dance", "Swim", "Cook"], answer: 1 },
          { prompt: "What is Max's favourite hobby?", choices: ["Cooking", "Video games", "Running"], answer: 1 },
          { prompt: "What does Max hate?", choices: ["Reading", "Cooking", "Music"], answer: 1 },
          { prompt: "What can't Max do?", choices: ["Swim", "Dance", "Read"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1ft-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: pasatiempos",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "hobby", translation: "pasatiempo" },
        { term: "to read / to swim", translation: "leer / nadar" },
        { term: "to dance / to cook", translation: "bailar / cocinar" },
        { term: "music / movie", translation: "musica / pelicula" },
        { term: "game / to play", translation: "juego / jugar-tocar" },
        { term: "fun", translation: "divertido" },
      ],
      activities: [
        {
          id: "a1ft-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "to swim", right: "nadar" },
            { left: "to cook", right: "cocinar" },
            { left: "music", right: "musica" },
          ] },
        },
        {
          id: "a1ft-vocab-a2", type: "cloze",
          prompt: "Completa: 'I can play the ___.' (guitarra)",
          payload: { answer: "guitar" },
          explain: "'Play the guitar' = tocar la guitarra.",
        },
        {
          id: "a1ft-vocab-a3", type: "multiple_choice",
          prompt: "Which is a hobby?",
          payload: { choices: ["price", "cooking", "door"], answer: 1 },
          explain: "'Cooking' (cocinar) puede ser un pasatiempo.",
        },
        {
          id: "a1ft-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'pelicula'?",
          payload: { choices: ["music", "movie", "game"], answer: 1 },
          explain: "'Movie' = pelicula.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1ft-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: like + -ing y can",
      intro: "Competencia de GRAMATICA. Aprende like + -ing y 'can' y practicalos.",
      grammar: {
        title: "like + -ing / can",
        form: "like/love/hate + verbo-ing · can / can't + verbo base",
        examples: ["I love reading.", "She can play the guitar.", "He can't dance."],
        mistakes: [
          { wrong: "I like read.", right: "I like reading." },
          { wrong: "She can to swim.", right: "She can swim." },
        ],
      },
      activities: [
        {
          id: "a1ft-gram-a1", type: "cloze",
          prompt: "Completa: 'I love ___ books.' (leer -> forma -ing)",
          payload: { answer: "reading" },
          explain: "Despues de 'love' va verbo + -ing.",
        },
        {
          id: "a1ft-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ swim very well.' (sabe)",
          payload: { answer: "can" },
          explain: "'Can' + verbo base para habilidad.",
        },
        {
          id: "a1ft-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He can to dance.", "He can dances.", "He can dance."], answer: 2 },
          explain: "'can' + verbo base, sin 'to' y sin -s.",
        },
        {
          id: "a1ft-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["dancing", "I", "like"], answer: ["I", "like", "dancing"] },
          explain: "Orden: I + like + (verbo-ing).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1ft-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tus pasatiempos",
      intro: "Competencia de ESCRITURA. Construye frases sobre lo que te gusta y sabes hacer. Ordena cada frase.",
      activities: [
        {
          id: "a1ft-write-a1", type: "word_bank",
          prompt: "Di que te encanta leer:",
          payload: { words: ["reading", "I", "love"], answer: ["I", "love", "reading"] },
        },
        {
          id: "a1ft-write-a2", type: "word_bank",
          prompt: "Di que sabes nadar:",
          payload: { words: ["swim", "I", "can"], answer: ["I", "can", "swim"] },
        },
        {
          id: "a1ft-write-a3", type: "word_bank",
          prompt: "Pregunta a alguien si le gusta bailar:",
          payload: { words: ["like", "Do", "you", "dancing?"], answer: ["Do", "you", "like", "dancing?"] },
        },
        {
          id: "a1ft-write-a4", type: "multiple_choice",
          prompt: "Which sentence is correct?",
          payload: { choices: ["I like read.", "I like reading.", "I like to reading."], answer: 1 },
        },
      ],
    },
  ],
};
