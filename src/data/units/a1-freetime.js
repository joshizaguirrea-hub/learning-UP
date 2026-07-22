/**
 * data/units/a1-freetime.js — Unidad tematica "Free time & likes" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1ft-11", term: "to paint", translation: "pintar", example: "She loves painting." },
    { id: "a1ft-12", term: "sport", translation: "deporte", example: "My favourite sport is football." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1ft-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: pasatiempos",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Max's hobbies\n" +
          "Max has got a lot of hobbies. He loves reading and he likes listening to music. On weekends, " +
          "he plays the guitar with his friends. Max can swim very well, but he can't dance! He hates " +
          "cooking, so he usually eats with his family. His favourite hobby is playing video games. He " +
          "thinks games are fun.\n\n" +
          "TEXT 2 - A chat about free time\n" +
          "A: Do you like dancing? B: Yes, I love it! Can you dance? A: No, I can't. But I can play the " +
          "guitar. B: Cool! What's your favourite sport? A: Football. I play every weekend. B: Nice! I " +
          "prefer swimming.",
        glossary: [
          { term: "loves / likes / hates", translation: "le encanta / le gusta / odia" },
          { term: "can / can't", translation: "sabe / no sabe" },
          { term: "favourite", translation: "favorito" },
          { term: "on weekends", translation: "los fines de semana" },
          { term: "to play the guitar", translation: "tocar la guitarra" },
          { term: "to prefer", translation: "preferir" },
          { term: "sport", translation: "deporte" },
          { term: "fun", translation: "divertido" },
        ],
        keyPhrases: [
          "Busca lo que Max ama, le gusta y odia.",
          "Fijate en lo que puede (can) y no puede (can't) hacer.",
        ],
        check: [
          { prompt: "T1: What can Max do well?", choices: ["Dance", "Swim", "Cook"], answer: 1 },
          { prompt: "T1: What is Max's favourite hobby?", choices: ["Cooking", "Video games", "Running"], answer: 1 },
          { prompt: "T1: What does Max hate?", choices: ["Reading", "Cooking", "Music"], answer: 1 },
          { prompt: "T2: Can A dance?", choices: ["Yes", "No", "Very well"], answer: 1 },
          { prompt: "T2: What is A's favourite sport?", choices: ["Football", "Swimming", "Tennis"], answer: 0 },
          { prompt: "T2: What does B prefer?", choices: ["Football", "Swimming", "Dancing"], answer: 1 },
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
        { term: "hobby / sport", translation: "pasatiempo / deporte" },
        { term: "to read / to swim", translation: "leer / nadar" },
        { term: "to dance / to cook", translation: "bailar / cocinar" },
        { term: "to paint / to play", translation: "pintar / jugar-tocar" },
        { term: "music / movie", translation: "musica / pelicula" },
        { term: "game / fun", translation: "juego / divertido" },
      ],
      activities: [
        {
          id: "a1ft-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to swim", right: "nadar" },
            { left: "to cook", right: "cocinar" },
            { left: "to dance", right: "bailar" },
            { left: "to paint", right: "pintar" },
          ] },
        },
        {
          id: "a1ft-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "music", right: "musica" },
            { left: "movie", right: "pelicula" },
            { left: "game", right: "juego" },
            { left: "sport", right: "deporte" },
          ] },
        },
        {
          id: "a1ft-vocab-a3", type: "cloze",
          prompt: "Completa: 'I can play the ___.' (guitarra)",
          payload: { answer: "guitar" },
          explain: "'Play the guitar' = tocar la guitarra.",
        },
        {
          id: "a1ft-vocab-a4", type: "cloze",
          prompt: "Completa: 'My favourite ___ is football.' (deporte)",
          payload: { answer: "sport" },
          explain: "'Sport' = deporte.",
        },
        {
          id: "a1ft-vocab-a5", type: "cloze",
          prompt: "Completa: 'She loves ___.' (pintar -> -ing)",
          payload: { answer: "painting" },
          explain: "Despues de 'loves' va verbo + -ing: painting.",
        },
        {
          id: "a1ft-vocab-a6", type: "multiple_choice",
          prompt: "Which is a hobby?",
          payload: { choices: ["price", "cooking", "door"], answer: 1 },
          explain: "'Cooking' (cocinar) puede ser un pasatiempo.",
        },
        {
          id: "a1ft-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'pelicula'?",
          payload: { choices: ["music", "movie", "game"], answer: 1 },
          explain: "'Movie' = pelicula.",
        },
        {
          id: "a1ft-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["to", "music", "listen", "I"], answer: ["I", "listen", "to", "music"] },
          explain: "'listen to music' = escuchar musica.",
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
        form: "like/love/hate + verb-ing · can / can't + base verb",
        desc: "Sirve para decir qu\u00e9 actividades te gustan y qu\u00e9 sabes o puedes hacer.",
        rule: "Despu\u00e9s de 'like', 'love' o 'hate' el verbo lleva -ing: 'I love reading'. Con 'can' y 'can't' el verbo va en base, sin 'to' y sin -s: 'She can dance'.",
        examples: ["I love reading.", "She can play the guitar.", "He can't dance.", "They like dancing."],
        explain: { tr: ["Me encanta leer.", "Ella sabe tocar la guitarra.", "\u00c9l no sabe bailar.", "A ellos les gusta bailar."] },
        mistakes: [
          { wrong: "I like read.", right: "I like reading." },
          { wrong: "She can to swim.", right: "She can swim." },
          { wrong: "He cans dance.", right: "He can dance." },
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
          id: "a1ft-gram-a3", type: "cloze",
          prompt: "Completa: 'He ___ dance.' (no sabe)",
          payload: { answer: "can't", alt: ["cannot"] },
          explain: "'can't' = no sabe / no puede.",
        },
        {
          id: "a1ft-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He can to dance.", "He can dances.", "He can dance."], answer: 2 },
          explain: "'can' + verbo base, sin 'to' y sin -s.",
        },
        {
          id: "a1ft-gram-a5", type: "multiple_choice",
          prompt: "Which sentence is correct?",
          payload: { choices: ["I like read.", "I like reading.", "I like to reading."], answer: 1 },
          explain: "Despues de 'like' va verbo + -ing.",
        },
        {
          id: "a1ft-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["dancing", "I", "like"], answer: ["I", "like", "dancing"] },
          explain: "Orden: I + like + (verbo-ing).",
        },
        {
          id: "a1ft-gram-a7", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["dance?", "Can", "you"], answer: ["Can", "you", "dance?"] },
          explain: "Pregunta con can: Can + you + verbo base?",
        },
        {
          id: "a1ft-gram-a8", type: "cloze",
          prompt: "Completa: 'Do you like ___?' (cocinar -> -ing)",
          payload: { answer: "cooking" },
          explain: "Despues de 'like' va -ing: cooking.",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre lo que te gusta y sabes hacer.",
      activities: [
        {
          id: "a1ft-write-a1", type: "word_bank",
          prompt: "1. Di que te encanta leer:",
          payload: { words: ["reading", "I", "love"], answer: ["I", "love", "reading"] },
        },
        {
          id: "a1ft-write-a2", type: "word_bank",
          prompt: "2. Di que sabes nadar:",
          payload: { words: ["swim", "I", "can"], answer: ["I", "can", "swim"] },
        },
        {
          id: "a1ft-write-a3", type: "word_bank",
          prompt: "3. Di que no sabes bailar:",
          payload: { words: ["dance", "I", "can't"], answer: ["I", "can't", "dance"] },
        },
        {
          id: "a1ft-write-a4", type: "word_bank",
          prompt: "4. Di tu deporte favorito:",
          payload: { words: ["sport", "My", "is", "favourite", "football"], answer: ["My", "favourite", "sport", "is", "football"] },
        },
        {
          id: "a1ft-write-a5", type: "word_bank",
          prompt: "5. Pregunta a alguien si le gusta bailar:",
          payload: { words: ["like", "Do", "you", "dancing?"], answer: ["Do", "you", "like", "dancing?"] },
        },
        {
          id: "a1ft-write-a6", type: "multiple_choice",
          prompt: "6. Which sentence is correct?",
          payload: { choices: ["I like read.", "I like reading.", "I like to reading."], answer: 1 },
        },
        {
          id: "a1ft-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["She can sings.", "She can sing.", "She can to sing."], answer: 1 },
        },
        {
          id: "a1ft-write-a8", type: "multiple_choice",
          prompt: "8. 'Dancing is fun!' means dancing is...",
          payload: { choices: ["boring", "enjoyable", "difficult"], answer: 1 },
        },
      ],
    },
  ],
};
