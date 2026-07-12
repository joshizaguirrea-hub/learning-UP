/**
 * data/units/persuasion-c1.js — Unidad tematica "Persuasion & rhetoric" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: cleft sentences.
 */

export const PERSUASION_C1 = {
  id: "persuasion-c1",
  language: "en",
  level: "C1",
  title: "Persuasion & rhetoric",
  subtitle: "Persuadir y enfatizar con cleft sentences",

  cando: [
    "Puedo persuadir y estructurar un argumento convincente.",
    "Puedo enfatizar con cleft sentences (It was... that / What I need is...).",
    "Puedo destacar la informacion clave de una idea.",
    "Puedo escribir un texto persuasivo.",
  ],

  vocab: [
    { id: "c1per-1", term: "to persuade", translation: "persuadir", example: "She persuaded the board." },
    { id: "c1per-2", term: "to convince", translation: "convencer", example: "He convinced me." },
    { id: "c1per-3", term: "claim", translation: "afirmacion", example: "Support your claim." },
    { id: "c1per-4", term: "to emphasise", translation: "enfatizar", example: "Let me emphasise this." },
    { id: "c1per-5", term: "audience", translation: "audiencia", example: "Know your audience." },
    { id: "c1per-6", term: "compelling", translation: "convincente", example: "A compelling argument." },
    { id: "c1per-7", term: "to appeal to", translation: "apelar a", example: "It appeals to emotion." },
    { id: "c1per-8", term: "credibility", translation: "credibilidad", example: "Facts build credibility." },
    { id: "c1per-9", term: "to highlight", translation: "resaltar", example: "Highlight the benefits." },
    { id: "c1per-10", term: "bias", translation: "sesgo", example: "Avoid bias in your writing." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1per-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el arte de persuadir",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "What makes a speech memorable is not the volume, but the message. It was Martin Luther King " +
          "who showed how words can change history. What great speakers do is appeal to both reason and " +
          "emotion. It is credibility that convinces an audience, not tricks. The thing that highlights " +
          "a strong argument is clear evidence. What we need is honesty, because it is trust that " +
          "persuades people in the end. Avoid bias, and your message will be compelling.",
        keyPhrases: [
          "Fijate en cleft sentences: What makes... is..., It was X who..., What we need is...",
          "Sirven para ENFATIZAR una parte de la oracion.",
        ],
        check: [
          { prompt: "What makes a speech memorable?", choices: ["The volume", "The message", "The length"], answer: 1 },
          { prompt: "What convinces an audience?", choices: ["Tricks", "Credibility", "Speed"], answer: 1 },
          { prompt: "What highlights a strong argument?", choices: ["Clear evidence", "Loud voice", "Long words"], answer: 0 },
          { prompt: "What persuades people in the end?", choices: ["Trust", "Money", "Fear"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1per-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: persuasion y retorica",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to persuade / to convince", translation: "persuadir / convencer" },
        { term: "claim / bias", translation: "afirmacion / sesgo" },
        { term: "to emphasise / to highlight", translation: "enfatizar / resaltar" },
        { term: "audience / credibility", translation: "audiencia / credibilidad" },
        { term: "compelling", translation: "convincente" },
        { term: "to appeal to", translation: "apelar a" },
      ],
      activities: [
        {
          id: "c1per-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "to persuade", right: "persuadir" },
            { left: "credibility", right: "credibilidad" },
            { left: "bias", right: "sesgo" },
          ] },
        },
        {
          id: "c1per-vocab-a2", type: "cloze",
          prompt: "Completa: 'A ___ argument.' (convincente)",
          payload: { answer: "compelling" },
          explain: "'Compelling' = convincente.",
        },
        {
          id: "c1per-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'resaltar'?",
          payload: { choices: ["to appeal", "to highlight", "to claim"], answer: 1 },
          explain: "'To highlight' = resaltar.",
        },
        {
          id: "c1per-vocab-a4", type: "cloze",
          prompt: "Completa: 'Facts build ___.' (credibilidad)",
          payload: { answer: "credibility" },
          explain: "'Credibility' = credibilidad.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1per-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: cleft sentences",
      intro: "Competencia de GRAMATICA. Aprende a enfatizar con cleft sentences.",
      grammar: {
        title: "Cleft sentences",
        form: "What + clausula + is/was + enfasis · It + is/was + enfasis + that/who + resto",
        examples: ["What I need is time.", "It was John who called.", "What she did was apologise."],
        mistakes: [
          { wrong: "What I need is to time.", right: "What I need is time." },
          { wrong: "It was John which called.", right: "It was John who called." },
        ],
      },
      activities: [
        {
          id: "c1per-gram-a1", type: "cloze",
          prompt: "Completa: '___ I need is more time.' (What/Which)",
          payload: { answer: "What" },
          explain: "Cleft con 'What ... is ...'.",
        },
        {
          id: "c1per-gram-a2", type: "cloze",
          prompt: "Completa: 'It was John ___ called.' (persona)",
          payload: { answer: "who", alt: ["that"] },
          explain: "Cleft con 'It was X who/that ...'.",
        },
        {
          id: "c1per-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct cleft sentence:",
          payload: { choices: ["What matters is honesty.", "What matters honesty is.", "Honesty what matters is."], answer: 0 },
          explain: "What + clausula + is + enfasis.",
        },
        {
          id: "c1per-gram-a4", type: "word_bank",
          prompt: "Ordena la cleft sentence:",
          payload: { words: ["is", "What", "trust", "need", "we"], answer: ["What", "we", "need", "is", "trust"] },
          explain: "Orden: What + we + need + is + trust.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1per-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: un texto persuasivo",
      intro: "Competencia de ESCRITURA. Construye cleft sentences persuasivas. Ordena cada frase.",
      activities: [
        {
          id: "c1per-write-a1", type: "word_bank",
          prompt: "Enfatiza lo que importa:",
          payload: { words: ["is", "What", "honesty", "matters"], answer: ["What", "matters", "is", "honesty"] },
        },
        {
          id: "c1per-write-a2", type: "word_bank",
          prompt: "Enfatiza quien lo mostro:",
          payload: { words: ["who", "It", "King", "was", "showed", "it"], answer: ["It", "was", "King", "who", "showed", "it"] },
        },
        {
          id: "c1per-write-a3", type: "word_bank",
          prompt: "Di que un buen orador apela a la emocion:",
          payload: { words: ["emotion", "speakers", "Good", "to", "appeal"], answer: ["Good", "speakers", "appeal", "to", "emotion"] },
        },
        {
          id: "c1per-write-a4", type: "multiple_choice",
          prompt: "Cleft sentences are used to...",
          payload: { choices: ["ask questions", "emphasise part of a sentence", "report speech"], answer: 1 },
        },
      ],
    },
  ],
};
