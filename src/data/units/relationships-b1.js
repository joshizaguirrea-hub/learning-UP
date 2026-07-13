/**
 * data/units/relationships-b1.js — Unidad tematica "Relationships" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: gerund vs infinitive.
 */

export const RELATIONSHIPS_B1 = {
  id: "relationships-b1",
  language: "en",
  level: "B1",
  title: "Relationships",
  subtitle: "Hablar de amistad, familia y personas importantes",

  cando: [
    "Puedo describir relaciones y sentimientos.",
    "Puedo usar verbos + gerundio o infinitivo.",
    "Puedo hablar de lo que me gusta y quiero hacer con otros.",
    "Puedo escribir sobre una persona importante para mi.",
  ],

  vocab: [
    { id: "rel-1", term: "friend", translation: "amigo/a", example: "She is my best friend." },
    { id: "rel-2", term: "to trust", translation: "confiar", example: "I trust my brother." },
    { id: "rel-3", term: "to argue", translation: "discutir", example: "They argue sometimes." },
    { id: "rel-4", term: "to get on with", translation: "llevarse bien con", example: "I get on with my sister." },
    { id: "rel-5", term: "couple", translation: "pareja", example: "They are a lovely couple." },
    { id: "rel-6", term: "to miss", translation: "extranar", example: "I miss my old friends." },
    { id: "rel-7", term: "honest", translation: "honesto", example: "A good friend is honest." },
    { id: "rel-8", term: "to support", translation: "apoyar", example: "My family supports me." },
    { id: "rel-9", term: "to fall in love", translation: "enamorarse", example: "They fell in love last year." },
    { id: "rel-10", term: "close", translation: "cercano / unido", example: "We are very close." },
    { id: "rel-11", term: "to forgive", translation: "perdonar", example: "It's important to forgive." },
    { id: "rel-12", term: "loyal", translation: "leal", example: "A loyal friend is a treasure." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "rel-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una buena amistad",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Ana and Sara\n" +
          "Ana and Sara enjoy spending time together. They have been close friends for ten years. Ana " +
          "loves talking about everything, and Sara always agrees to listen. They rarely argue, and when " +
          "they do, they decide to talk honestly. Sara wants to travel with Ana next year. 'A good friend " +
          "keeps supporting you,' says Ana. 'I can't imagine living without her.'\n\n" +
          "TEXT 2 - Advice about friends\n" +
          "A: I argued with my best friend. B: You should try to forgive him. Real friends learn to " +
          "forgive. A: But he wasn't honest with me. B: Then you need to talk to him. A loyal friend is worth " +
          "keeping. A: You're right. I'll stop being angry and start listening.",
        glossary: [
          { term: "enjoy spending / love talking", translation: "disfrutan pasar / aman hablar" },
          { term: "agree to listen / decide to talk", translation: "aceptan escuchar / deciden hablar" },
          { term: "to trust / to argue", translation: "confiar / discutir" },
          { term: "to forgive / loyal", translation: "perdonar / leal" },
          { term: "to support / to miss", translation: "apoyar / extranar" },
          { term: "honest / close", translation: "honesto / unido" },
          { term: "worth keeping", translation: "vale la pena conservar" },
          { term: "I can't imagine", translation: "no puedo imaginar" },
        ],
        keyPhrases: [
          "Fijate en verbos + gerundio (enjoy spending) e infinitivo (agree to listen).",
          "Busca el consejo sobre perdonar a un amigo.",
        ],
        check: [
          { prompt: "T1: How long have they been friends?", choices: ["Ten years", "Two years", "One month"], answer: 0 },
          { prompt: "T1: What does Ana love?", choices: ["Arguing", "Talking about everything", "Being alone"], answer: 1 },
          { prompt: "T1: What does Sara want to do next year?", choices: ["Travel with Ana", "Move away", "Stop talking"], answer: 0 },
          { prompt: "T2: What does B advise A to do?", choices: ["Forgive the friend", "Ignore him", "Get angry"], answer: 0 },
          { prompt: "T2: What kind of friend is worth keeping?", choices: ["A loyal one", "A rich one", "A famous one"], answer: 0 },
          { prompt: "T2: What will A start doing?", choices: ["Listening", "Shouting", "Leaving"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "rel-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: relaciones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "friend / couple", translation: "amigo / pareja" },
        { term: "to trust / honest", translation: "confiar / honesto" },
        { term: "to argue / to forgive", translation: "discutir / perdonar" },
        { term: "to get on with / loyal", translation: "llevarse bien / leal" },
        { term: "to miss / to support", translation: "extranar / apoyar" },
        { term: "to fall in love / close", translation: "enamorarse / unido" },
      ],
      activities: [
        {
          id: "rel-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to trust", right: "confiar" },
            { left: "to argue", right: "discutir" },
            { left: "to miss", right: "extranar" },
            { left: "loyal", right: "leal" },
          ] },
        },
        {
          id: "rel-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to support", right: "apoyar" },
            { left: "to forgive", right: "perdonar" },
            { left: "honest", right: "honesto" },
            { left: "couple", right: "pareja" },
          ] },
        },
        {
          id: "rel-vocab-a3", type: "cloze",
          prompt: "Completa: 'I ___ on with my sister.' (me llevo bien)",
          payload: { answer: "get" },
          explain: "'to get on with' = llevarse bien con.",
        },
        {
          id: "rel-vocab-a4", type: "cloze",
          prompt: "Completa: 'We are very ___.' (unidos)",
          payload: { answer: "close" },
          explain: "'Close' = cercano / unido.",
        },
        {
          id: "rel-vocab-a5", type: "cloze",
          prompt: "Completa: 'It's important to ___.' (perdonar)",
          payload: { answer: "forgive" },
          explain: "'To forgive' = perdonar.",
        },
        {
          id: "rel-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'apoyar'?",
          payload: { choices: ["to argue", "to support", "to miss"], answer: 1 },
          explain: "'To support' = apoyar.",
        },
        {
          id: "rel-vocab-a7", type: "multiple_choice",
          prompt: "A friend you can rely on is...",
          payload: { choices: ["loyal", "busy", "expensive"], answer: 0 },
          explain: "'Loyal' = leal.",
        },
        {
          id: "rel-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["brother", "I", "my", "trust"], answer: ["I", "trust", "my", "brother"] },
          explain: "'I trust my brother' = confio en mi hermano.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "rel-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: gerundio o infinitivo",
      intro: "Competencia de GRAMATICA. Aprende que verbos van con -ing y cuales con 'to'.",
      grammar: {
        title: "Verbos + gerundio / infinitivo",
        form: "enjoy/love/hate/keep + -ing · want/decide/agree/hope/learn + to + base",
        examples: ["I enjoy talking.", "She wants to travel.", "They decided to stay.", "He keeps studying."],
        explain: { tr: ["Disfruto conversar.", "Ella quiere viajar.", "Ellos decidieron quedarse.", "\u00c9l sigue estudiando."] },
        mistakes: [
          { wrong: "I enjoy to talk.", right: "I enjoy talking." },
          { wrong: "She wants traveling.", right: "She wants to travel." },
          { wrong: "They decided staying.", right: "They decided to stay." },
        ],
      },
      activities: [
        {
          id: "rel-gram-a1", type: "cloze",
          prompt: "Completa: 'I enjoy ___ with friends.' (talk -> forma correcta)",
          payload: { answer: "talking" },
          explain: "Despues de 'enjoy' va -ing.",
        },
        {
          id: "rel-gram-a2", type: "cloze",
          prompt: "Completa: 'She wants ___ travel.' (particula)",
          payload: { answer: "to" },
          explain: "Despues de 'want' va 'to' + base.",
        },
        {
          id: "rel-gram-a3", type: "cloze",
          prompt: "Completa: 'He keeps ___.' (study -> forma correcta)",
          payload: { answer: "studying" },
          explain: "Despues de 'keep' va -ing.",
        },
        {
          id: "rel-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["They decided to stay.", "They decided staying.", "They decided stay."], answer: 0 },
          explain: "'decide' + to + base: 'decided to stay'.",
        },
        {
          id: "rel-gram-a5", type: "multiple_choice",
          prompt: "Which verb is followed by '-ing'?",
          payload: { choices: ["want", "enjoy", "decide"], answer: 1 },
          explain: "'enjoy' + verbo-ing.",
        },
        {
          id: "rel-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["reading", "I", "enjoy", "books"], answer: ["I", "enjoy", "reading", "books"] },
          explain: "I + enjoy + reading + books.",
        },
        {
          id: "rel-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["travel", "to", "want", "I"], answer: ["I", "want", "to", "travel"] },
          explain: "I + want + to + travel.",
        },
        {
          id: "rel-gram-a8", type: "cloze",
          prompt: "Completa: 'They agreed ___ help us.' (particula)",
          payload: { answer: "to" },
          explain: "'agree' + to + base.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "rel-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: una persona importante",
      intro: "Competencia de ESCRITURA. Construye frases sobre una persona importante.",
      activities: [
        {
          id: "rel-write-a1", type: "word_bank",
          prompt: "1. Di que disfrutas pasar tiempo con ella:",
          payload: { words: ["time", "I", "spending", "enjoy", "with", "her"], answer: ["I", "enjoy", "spending", "time", "with", "her"] },
        },
        {
          id: "rel-write-a2", type: "word_bank",
          prompt: "2. Di que quieres viajar con tu amigo:",
          payload: { words: ["travel", "I", "to", "want", "with", "my", "friend"], answer: ["I", "want", "to", "travel", "with", "my", "friend"] },
        },
        {
          id: "rel-write-a3", type: "word_bank",
          prompt: "3. Di que confias en tu hermano:",
          payload: { words: ["brother", "I", "my", "trust"], answer: ["I", "trust", "my", "brother"] },
        },
        {
          id: "rel-write-a4", type: "word_bank",
          prompt: "4. Di que es importante perdonar:",
          payload: { words: ["forgive", "It's", "to", "important"], answer: ["It's", "important", "to", "forgive"] },
        },
        {
          id: "rel-write-a5", type: "word_bank",
          prompt: "5. Di que un buen amigo te apoya:",
          payload: { words: ["you", "A", "friend", "good", "supports"], answer: ["A", "good", "friend", "supports", "you"] },
        },
        {
          id: "rel-write-a6", type: "multiple_choice",
          prompt: "6. Which verb is followed by '-ing'?",
          payload: { choices: ["want", "enjoy", "decide"], answer: 1 },
        },
        {
          id: "rel-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I hope to see you.", "I hope seeing you.", "I hope see you."], answer: 0 },
        },
        {
          id: "rel-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'leal'?",
          payload: { choices: ["honest", "loyal", "close"], answer: 1 },
        },
      ],
    },
  ],
};
