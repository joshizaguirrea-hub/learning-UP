/**
 * data/units/technology-b1.js — Unidad tematica "Technology & Internet" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: used to.
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
    { id: "tech-11", term: "social media", translation: "redes sociales", example: "She spends hours on social media." },
    { id: "tech-12", term: "to share", translation: "compartir", example: "I share photos with friends." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "tech-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: como ha cambiado la tecnologia",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Then and now\n" +
          "Ten years ago, life was different. People used to write letters and wait days for a reply. They " +
          "didn't use to have smartphones, so they used maps on paper. Now, everything is online. We " +
          "download apps, connect to the network and update our devices every week. My grandmother used to " +
          "call from a phone box; today she video-calls me from her tablet. Technology has changed the way " +
          "we live, work and talk.\n\n" +
          "TEXT 2 - A digital habit\n" +
          "A: You spend a lot of time on social media! B: I know. I didn't use to, but now I share photos " +
          "every day. A: I only use my phone to connect with family. B: That's healthy. I should update my " +
          "habits! A: Just remember to charge your phone and take breaks.",
        glossary: [
          { term: "used to write", translation: "solia escribir" },
          { term: "didn't use to have", translation: "no solia tener" },
          { term: "to download / to update", translation: "descargar / actualizar" },
          { term: "network / online", translation: "red / en linea" },
          { term: "social media", translation: "redes sociales" },
          { term: "to share / to charge", translation: "compartir / cargar" },
          { term: "phone box", translation: "cabina telefonica" },
          { term: "take breaks", translation: "tomar descansos" },
        ],
        keyPhrases: [
          "Contrasta antes (used to) y ahora (now).",
          "Fijate en las cosas que la gente 'used to' hacer.",
        ],
        check: [
          { prompt: "T1: What did people use to do to communicate?", choices: ["Write letters", "Send apps", "Video-call"], answer: 0 },
          { prompt: "T1: How does the grandmother contact him now?", choices: ["Phone box", "Letters", "Video-call from a tablet"], answer: 2 },
          { prompt: "T1: What did they use for directions before?", choices: ["Apps", "Paper maps", "GPS"], answer: 1 },
          { prompt: "T2: What does B do every day now?", choices: ["Share photos", "Write letters", "Read books"], answer: 0 },
          { prompt: "T2: How does A use the phone?", choices: ["To connect with family", "For games", "Never"], answer: 0 },
          { prompt: "T2: What should B update?", choices: ["The phone", "The habits", "The network"], answer: 1 },
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
        { term: "password / network", translation: "contrasena / red" },
        { term: "to connect / online", translation: "conectar / en linea" },
        { term: "to update / to charge", translation: "actualizar / cargar" },
        { term: "social media / to share", translation: "redes sociales / compartir" },
      ],
      activities: [
        {
          id: "tech-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "device", right: "dispositivo" },
            { left: "password", right: "contrasena" },
            { left: "network", right: "red" },
            { left: "screen", right: "pantalla" },
          ] },
        },
        {
          id: "tech-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to download", right: "descargar" },
            { left: "to update", right: "actualizar" },
            { left: "to share", right: "compartir" },
            { left: "online", right: "en linea" },
          ] },
        },
        {
          id: "tech-vocab-a3", type: "cloze",
          prompt: "Completa: 'I need to ___ my phone.' (cargar la bateria)",
          payload: { answer: "charge" },
          explain: "'To charge' = cargar la bateria.",
        },
        {
          id: "tech-vocab-a4", type: "cloze",
          prompt: "Completa: 'I forgot my ___.' (contrasena)",
          payload: { answer: "password" },
          explain: "'Password' = contrasena.",
        },
        {
          id: "tech-vocab-a5", type: "cloze",
          prompt: "Completa: 'She spends hours on ___ media.' (redes)",
          payload: { answer: "social" },
          explain: "'Social media' = redes sociales.",
        },
        {
          id: "tech-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'descargar'?",
          payload: { choices: ["to update", "to download", "to connect"], answer: 1 },
          explain: "'To download' = descargar.",
        },
        {
          id: "tech-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'compartir'?",
          payload: { choices: ["to share", "to charge", "to connect"], answer: 0 },
          explain: "'To share' = compartir.",
        },
        {
          id: "tech-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "to", "Connect", "wifi"], answer: ["Connect", "to", "the", "wifi"] },
          explain: "'Connect to the wifi' = conectate al wifi.",
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
        form: "used to + base (affirm) · didn't use to + base (neg) · Did ... use to...? (question)",
        examples: ["I used to write letters.", "They didn't use to have phones.", "Did you use to play outside?"],
        explain: { tr: ["Sol\u00eda escribir cartas.", "Ellos no sol\u00edan tener tel\u00e9fonos.", "\u00bfSol\u00edas jugar afuera?"] },
        mistakes: [
          { wrong: "I use to write letters.", right: "I used to write letters." },
          { wrong: "She didn't used to call.", right: "She didn't use to call." },
          { wrong: "Did you used to play?", right: "Did you use to play?" },
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
          id: "tech-gram-a2", type: "cloze",
          prompt: "Completa: 'Did you ___ to play outside?' (use/used)",
          payload: { answer: "use" },
          explain: "En preguntas: 'Did ... use to ...?' (sin -d).",
        },
        {
          id: "tech-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["They didn't used to have phones.", "They didn't use to have phones.", "They don't used to have phones."], answer: 1 },
          explain: "En negativo: 'didn't use to' (sin -d).",
        },
        {
          id: "tech-gram-a4", type: "multiple_choice",
          prompt: "Which talks about a past habit?",
          payload: { choices: ["I use my phone daily.", "I used to write letters.", "I will download the app."], answer: 1 },
          explain: "'used to' = habito del pasado que ya no ocurre.",
        },
        {
          id: "tech-gram-a5", type: "cloze",
          prompt: "Completa: 'My grandmother ___ to call from a phone box.' (solia)",
          payload: { answer: "used" },
          explain: "'used to call' = solia llamar.",
        },
        {
          id: "tech-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["used", "I", "letters", "to", "write"], answer: ["I", "used", "to", "write", "letters"] },
          explain: "I + used to + write + letters.",
        },
        {
          id: "tech-gram-a7", type: "word_bank",
          prompt: "Ordena la negacion:",
          payload: { words: ["use", "They", "to", "didn't", "phones", "have"], answer: ["They", "didn't", "use", "to", "have", "phones"] },
          explain: "They + didn't + use to + have + phones.",
        },
        {
          id: "tech-gram-a8", type: "cloze",
          prompt: "Completa: 'We ___ use to buy things online.' (negativo: didn't)",
          payload: { answer: "didn't", alt: ["did not"] },
          explain: "Negativo: didn't use to.",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre como han cambiado las cosas.",
      activities: [
        {
          id: "tech-write-a1", type: "word_bank",
          prompt: "1. Di que antes usabas mapas de papel:",
          payload: { words: ["used", "I", "paper", "to", "use", "maps"], answer: ["I", "used", "to", "use", "paper", "maps"] },
        },
        {
          id: "tech-write-a2", type: "word_bank",
          prompt: "2. Di que ahora compras en linea:",
          payload: { words: ["online", "Now", "buy", "I", "things"], answer: ["Now", "I", "buy", "things", "online"] },
        },
        {
          id: "tech-write-a3", type: "word_bank",
          prompt: "3. Di que deberias actualizar el software:",
          payload: { words: ["update", "You", "the", "should", "software"], answer: ["You", "should", "update", "the", "software"] },
        },
        {
          id: "tech-write-a4", type: "word_bank",
          prompt: "4. Di que compartes fotos con amigos:",
          payload: { words: ["friends", "I", "photos", "with", "share"], answer: ["I", "share", "photos", "with", "friends"] },
        },
        {
          id: "tech-write-a5", type: "word_bank",
          prompt: "5. Di que no solias tener un telefono:",
          payload: { words: ["use", "I", "to", "didn't", "a", "have", "phone"], answer: ["I", "didn't", "use", "to", "have", "a", "phone"] },
        },
        {
          id: "tech-write-a6", type: "multiple_choice",
          prompt: "6. Which sentence talks about a past habit?",
          payload: { choices: ["I use my phone daily.", "I used to write letters.", "I will download the app."], answer: 1 },
        },
        {
          id: "tech-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct negative:",
          payload: { choices: ["I didn't used to travel.", "I didn't use to travel.", "I don't used to travel."], answer: 1 },
        },
        {
          id: "tech-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'red' (internet)?",
          payload: { choices: ["network", "screen", "password"], answer: 0 },
        },
      ],
    },
  ],
};
