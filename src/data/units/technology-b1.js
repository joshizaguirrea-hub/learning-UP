/**
 * data/units/technology-b1.js — Unidad tematica "Technology & Internet" (B1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: used to.
 */

export const TECHNOLOGY_B1 = {
  id: "technology-b1",
  language: "en",
  level: "B1",
  title: "Technology & Internet",
  subtitle: "Hablar de tecnologia y de como han cambiado las cosas",

  cando: [
    "Puedo hablar de dispositivos y del internet.",
    "Puedo usar 'used to' para habitos del pasado.",
    "Puedo comparar como era antes y como es ahora.",
    "Puedo escribir sobre mi relacion con la tecnologia.",
  ],

  vocab: [
    { id: "tech-1", term: "device", translation: "dispositivo", example: "This device is very fast." },
    { id: "tech-2", term: "screen", translation: "pantalla", example: "The screen is too bright." },
    { id: "tech-3", term: "to download", translation: "descargar", example: "I download the app." },
    { id: "tech-4", term: "app", translation: "aplicacion", example: "This app is useful." },
    { id: "tech-5", term: "password", translation: "contrasena", example: "I forgot my password." },
    { id: "tech-6", term: "to connect", translation: "conectar", example: "Connect to the wifi." },
    { id: "tech-7", term: "network", translation: "red", example: "The network is slow today." },
    { id: "tech-8", term: "to update", translation: "actualizar", example: "You should update the software." },
    { id: "tech-9", term: "online", translation: "en linea", example: "I buy things online." },
    { id: "tech-10", term: "to charge", translation: "cargar (bateria)", example: "I need to charge my phone." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "tech-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: como ha cambiado la tecnologia",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Ten years ago, life was different. People used to write letters and wait days for a reply. " +
          "They didn't use to have smartphones, so they used maps on paper. Now, everything is online. " +
          "We download apps, connect to the network and update our devices every week. My grandmother " +
          "used to call from a phone box; today she video-calls me from her tablet. Technology has " +
          "changed the way we live, work and talk to each other.",
        keyPhrases: [
          "Contrasta antes (used to) y ahora (now).",
          "Fijate en las cosas que la gente 'used to' hacer.",
        ],
        check: [
          { prompt: "What did people use to do to communicate?", choices: ["Write letters", "Send apps", "Video-call"], answer: 0 },
          { prompt: "How does the grandmother contact him now?", choices: ["Phone box", "Letters", "Video-call from a tablet"], answer: 2 },
          { prompt: "What did they use for directions before?", choices: ["Apps", "Paper maps", "GPS"], answer: 1 },
          { prompt: "What is the main idea?", choices: ["Technology changed how we live", "Letters are better", "Tablets are cheap"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "tech-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: tecnologia e internet",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "device / screen", translation: "dispositivo / pantalla" },
        { term: "to download / app", translation: "descargar / aplicacion" },
        { term: "password", translation: "contrasena" },
        { term: "to connect / network", translation: "conectar / red" },
        { term: "to update / to charge", translation: "actualizar / cargar" },
        { term: "online", translation: "en linea" },
      ],
      activities: [
        {
          id: "tech-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "device", right: "dispositivo" },
            { left: "password", right: "contrasena" },
            { left: "network", right: "red" },
          ] },
        },
        {
          id: "tech-vocab-a2", type: "cloze",
          prompt: "Completa: 'I need to ___ my phone.' (cargar la bateria)",
          payload: { answer: "charge" },
          explain: "'To charge' = cargar la bateria.",
        },
        {
          id: "tech-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'descargar'?",
          payload: { choices: ["to update", "to download", "to connect"], answer: 1 },
          explain: "'To download' = descargar.",
        },
        {
          id: "tech-vocab-a4", type: "cloze",
          prompt: "Completa: 'I forgot my ___.' (contrasena)",
          payload: { answer: "password" },
          explain: "'Password' = contrasena.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "tech-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: used to",
      intro: "Competencia de GRAMATICA. Aprende 'used to' para habitos del pasado.",
      grammar: {
        title: "used to (habitos del pasado)",
        form: "used to + verbo base (afirm) · didn't use to + base (neg)",
        examples: ["I used to write letters.", "They didn't use to have phones.", "Did you use to play outside?"],
        mistakes: [
          { wrong: "I use to write letters.", right: "I used to write letters." },
          { wrong: "She didn't used to call.", right: "She didn't use to call." },
        ],
      },
      activities: [
        {
          id: "tech-gram-a1", type: "cloze",
          prompt: "Completa: 'People ___ to write letters.' (used/use)",
          payload: { answer: "used" },
          explain: "Afirmativo: 'used to' + verbo base.",
        },
        {
          id: "tech-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["They didn't used to have phones.", "They didn't use to have phones.", "They don't used to have phones."], answer: 1 },
          explain: "En negativo: 'didn't use to' (sin -d).",
        },
        {
          id: "tech-gram-a3", type: "cloze",
          prompt: "Completa: 'Did you ___ to play outside?' (use/used)",
          payload: { answer: "use" },
          explain: "En preguntas: 'Did ... use to ...?' (sin -d).",
        },
        {
          id: "tech-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["used", "I", "letters", "to", "write"], answer: ["I", "used", "to", "write", "letters"] },
          explain: "Orden: I + used to + write + letters.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "tech-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: antes y ahora",
      intro: "Competencia de ESCRITURA. Construye frases sobre como han cambiado las cosas. Ordena cada frase.",
      activities: [
        {
          id: "tech-write-a1", type: "word_bank",
          prompt: "Di que antes usabas mapas de papel:",
          payload: { words: ["used", "I", "paper", "to", "use", "maps"], answer: ["I", "used", "to", "use", "paper", "maps"] },
        },
        {
          id: "tech-write-a2", type: "word_bank",
          prompt: "Di que ahora compras en linea:",
          payload: { words: ["online", "Now", "buy", "I", "things"], answer: ["Now", "I", "buy", "things", "online"] },
        },
        {
          id: "tech-write-a3", type: "word_bank",
          prompt: "Di que deberias actualizar el software:",
          payload: { words: ["update", "You", "the", "should", "software"], answer: ["You", "should", "update", "the", "software"] },
        },
        {
          id: "tech-write-a4", type: "multiple_choice",
          prompt: "Which sentence talks about a past habit?",
          payload: { choices: ["I use my phone daily.", "I used to write letters.", "I will download the app."], answer: 1 },
        },
      ],
    },
  ],
};
