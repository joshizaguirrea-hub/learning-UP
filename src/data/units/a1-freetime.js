/**
 * data/units/a1-freetime.js — Unidad tematica "Free time & likes" (A1).
 *
 * Datos PUROS. Tiempo libre con like/love/hate + -ing y 'can' (habilidad).
 * Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    // ---------------- APRENDE ----------------
    {
      id: "a1ft-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: pasatiempos",
      intro:
        "Lee sobre los gustos de una persona y estudia like + -ing y 'can'. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Max has got a lot of hobbies. He loves reading and he likes listening to music. " +
          "On weekends, he plays the guitar with his friends. Max can swim very well, but he " +
          "can't dance! He hates cooking, so he usually eats with his family. His favourite " +
          "hobby is playing video games. He thinks games are fun.",
        glossary: [
          { term: "loves reading", translation: "le encanta leer" },
          { term: "likes listening", translation: "le gusta escuchar" },
          { term: "can swim", translation: "sabe nadar" },
          { term: "can't dance", translation: "no sabe bailar" },
          { term: "favourite", translation: "favorito" },
          { term: "on weekends", translation: "los fines de semana" },
        ],
        keyPhrases: [
          "I like/love/hate + verbo-ing (reading, dancing).",
          "I can... / I can't... (Se... / No se...)",
          "My favourite hobby is... (Mi pasatiempo favorito es...)",
          "Do you like...? (Te gusta...?)",
        ],
        note:
          "Despues de like/love/hate usamos el verbo con -ing: 'I like reading', 'She hates " +
          "cooking'. 'can' + verbo base para habilidad: 'I can swim' (no 'I can to swim').",
        grammar: {
          title: "like + -ing / can",
          form: "like/love/hate + verbo-ing · can / can't + verbo base",
          examples: [
            "I love reading.",
            "She can play the guitar.",
            "He can't dance.",
          ],
          mistakes: [
            { wrong: "I like read.", right: "I like reading." },
            { wrong: "She can to swim.", right: "She can swim." },
          ],
        },
        check: [
          { prompt: "What can Max do well?", choices: ["Dance", "Swim", "Cook"], answer: 1 },
          { prompt: "What is Max's favourite hobby?", choices: ["Cooking", "Video games", "Running"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1ft-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: hablar de gustos",
      intro:
        "Para hablar de pasatiempos usamos like + -ing y 'can'. Lee el dialogo.",
      dialogue: [
        "A: Do you like dancing?",
        "B: Yes, I love dancing! Can you dance?",
        "A: No, I can't. But I can play the guitar.",
        "B: Cool! Music is fun.",
      ],
      activities: [
        {
          id: "a1ft-l1-a1", type: "multiple_choice",
          prompt: "Which sentence is correct?",
          payload: { choices: ["I like read.", "I like reading.", "I like to reading."], answer: 1 },
          explain: "Despues de 'like' usamos verbo + -ing: 'like reading'.",
        },
        {
          id: "a1ft-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "to swim", right: "nadar" },
            { left: "to cook", right: "cocinar" },
            { left: "music", right: "musica" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1ft-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: like + -ing y can",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1ft-l2-a1", type: "cloze",
          prompt: "Completa: 'I love ___ books.' (leer -> forma -ing)",
          payload: { answer: "reading" },
          explain: "Despues de 'love' va verbo + -ing: reading.",
        },
        {
          id: "a1ft-l2-a2", type: "cloze",
          prompt: "Completa: 'She ___ swim very well.' (sabe)",
          payload: { answer: "can" },
          explain: "'Can' + verbo base para habilidad: can swim.",
        },
        {
          id: "a1ft-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "He can to dance.",
            "He can dances.",
            "He can dance.",
          ], answer: 2 },
          explain: "'can' + verbo base, sin 'to' y sin -s: can dance.",
        },
        {
          id: "a1ft-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["dancing", "I", "like"], answer: ["I", "like", "dancing"] },
          explain: "Orden: I + like + (verbo-ing).",
        },
        {
          id: "a1ft-l2-a5", type: "cloze",
          prompt: "Completa: 'I can play the ___.' (guitarra)",
          payload: { answer: "guitar" },
          explain: "'Guitar' = guitarra. 'Play the guitar' = tocar la guitarra.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1ft-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: tus pasatiempos",
      intro:
        "Tarea real: construye frases sobre lo que te gusta y lo que sabes hacer. Ordena cada frase.",
      activities: [
        {
          id: "a1ft-l3-a1", type: "word_bank",
          prompt: "Di que te encanta leer:",
          payload: { words: ["reading", "I", "love"], answer: ["I", "love", "reading"] },
        },
        {
          id: "a1ft-l3-a2", type: "word_bank",
          prompt: "Di que sabes nadar:",
          payload: { words: ["swim", "I", "can"], answer: ["I", "can", "swim"] },
        },
        {
          id: "a1ft-l3-a3", type: "word_bank",
          prompt: "Pregunta a alguien si le gusta bailar:",
          payload: { words: ["like", "Do", "you", "dancing?"],
                     answer: ["Do", "you", "like", "dancing?"] },
        },
        {
          id: "a1ft-l3-a4", type: "multiple_choice",
          prompt: "Which is a hobby?",
          payload: { choices: ["price", "cooking", "door"], answer: 1 },
        },
      ],
    },
  ],
};
