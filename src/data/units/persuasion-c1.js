/**
 * data/units/persuasion-c1.js — Unidad tematica "Persuasion & rhetoric" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: cleft sentences.
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
    { id: "c1per-11", term: "rhetoric", translation: "retorica", example: "Political rhetoric can be powerful." },
    { id: "c1per-12", term: "tone", translation: "tono", example: "Adjust your tone to persuade." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1per-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el arte de persuadir",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Memorable speeches\n" +
          "What makes a speech memorable is not the volume, but the message. It was Martin Luther King who " +
          "showed how words can change history. What great speakers do is appeal to both reason and " +
          "emotion. It is credibility that convinces an audience, not tricks. The thing that highlights a " +
          "strong argument is clear evidence. What we need is honesty.\n\n" +
          "TEXT 2 - A writing tip\n" +
          "A: How can I sound more persuasive? B: What you need is a compelling argument. A: How do I " +
          "emphasise it? B: It is the evidence that convinces people. A: And the tone? B: What matters most " +
          "is honesty. Avoid bias, and your rhetoric will work.",
        glossary: [
          { term: "What makes... is...", translation: "Lo que hace... es..." },
          { term: "It was X who...", translation: "Fue X quien..." },
          { term: "What we need is...", translation: "Lo que necesitamos es..." },
          { term: "to persuade / to convince", translation: "persuadir / convencer" },
          { term: "compelling / credibility", translation: "convincente / credibilidad" },
          { term: "to appeal to / to highlight", translation: "apelar a / resaltar" },
          { term: "bias / rhetoric", translation: "sesgo / retorica" },
          { term: "tone / audience", translation: "tono / audiencia" },
        ],
        keyPhrases: [
          "Fijate en cleft sentences: What makes... is..., It was X who..., What we need is...",
          "Sirven para ENFATIZAR una parte de la oracion.",
        ],
        check: [
          { prompt: "T1: What makes a speech memorable?", choices: ["The volume", "The message", "The length"], answer: 1 },
          { prompt: "T1: What convinces an audience?", choices: ["Tricks", "Credibility", "Speed"], answer: 1 },
          { prompt: "T1: What highlights a strong argument?", choices: ["Clear evidence", "Loud voice", "Long words"], answer: 0 },
          { prompt: "T2: What does B say you need?", choices: ["A compelling argument", "Money", "Time"], answer: 0 },
          { prompt: "T2: What convinces people?", choices: ["The evidence", "The volume", "The speed"], answer: 0 },
          { prompt: "T2: What matters most?", choices: ["Honesty", "Bias", "Length"], answer: 0 },
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
        { term: "compelling / rhetoric", translation: "convincente / retorica" },
        { term: "to appeal to / tone", translation: "apelar a / tono" },
      ],
      activities: [
        {
          id: "c1per-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to persuade", right: "persuadir" },
            { left: "credibility", right: "credibilidad" },
            { left: "bias", right: "sesgo" },
            { left: "rhetoric", right: "retorica" },
          ] },
        },
        {
          id: "c1per-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to convince", right: "convencer" },
            { left: "to highlight", right: "resaltar" },
            { left: "compelling", right: "convincente" },
            { left: "tone", right: "tono" },
          ] },
        },
        {
          id: "c1per-vocab-a3", type: "cloze",
          prompt: "Completa: 'A ___ argument.' (convincente)",
          payload: { answer: "compelling" },
          explain: "'Compelling' = convincente.",
        },
        {
          id: "c1per-vocab-a4", type: "cloze",
          prompt: "Completa: 'Facts build ___.' (credibilidad)",
          payload: { answer: "credibility" },
          explain: "'Credibility' = credibilidad.",
        },
        {
          id: "c1per-vocab-a5", type: "cloze",
          prompt: "Completa: 'It appeals ___ emotion.' (particula)",
          payload: { answer: "to" },
          explain: "'To appeal to' = apelar a.",
        },
        {
          id: "c1per-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'resaltar'?",
          payload: { choices: ["to appeal", "to highlight", "to claim"], answer: 1 },
          explain: "'To highlight' = resaltar.",
        },
        {
          id: "c1per-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'sesgo'?",
          payload: { choices: ["bias", "tone", "claim"], answer: 0 },
          explain: "'Bias' = sesgo.",
        },
        {
          id: "c1per-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["audience", "Know", "your"], answer: ["Know", "your", "audience"] },
          explain: "'Know your audience' = conoce a tu audiencia.",
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
        form: "What + clause + is/was + emphasis · It + is/was + emphasis + that/who + rest",
        desc: "Sirve para resaltar una parte de la frase y persuadir con \u00e9nfasis.",
        rule: "Oraciones hendidas: 'What + cl\u00e1usula + is/was + \u00e9nfasis' (What I need is time) e 'It + is/was + \u00e9nfasis + that/who + resto' (It was Ana who called).",
        examples: ["What I need is time.", "It was John who called.", "What she did was apologise."],
        explain: { tr: ["Lo que necesito es tiempo.", "Fue John quien llam\u00f3.", "Lo que ella hizo fue disculparse."] },
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
          id: "c1per-gram-a4", type: "multiple_choice",
          prompt: "Cleft sentences are used to...",
          payload: { choices: ["ask questions", "emphasise part of a sentence", "report speech"], answer: 1 },
          explain: "Sirven para dar enfasis a una parte.",
        },
        {
          id: "c1per-gram-a5", type: "cloze",
          prompt: "Completa: 'It is the evidence ___ convinces people.' (that/who)",
          payload: { answer: "that", alt: ["which"] },
          explain: "Cleft con cosa: 'It is X that ...'.",
        },
        {
          id: "c1per-gram-a6", type: "word_bank",
          prompt: "Ordena la cleft sentence:",
          payload: { words: ["is", "What", "trust", "need", "we"], answer: ["What", "we", "need", "is", "trust"] },
          explain: "What + we + need + is + trust.",
        },
        {
          id: "c1per-gram-a7", type: "word_bank",
          prompt: "Ordena la cleft con 'It was':",
          payload: { words: ["who", "It", "King", "was", "spoke"], answer: ["It", "was", "King", "who", "spoke"] },
          explain: "It + was + King + who + spoke.",
        },
        {
          id: "c1per-gram-a8", type: "cloze",
          prompt: "Completa: '___ matters most is honesty.' (What)",
          payload: { answer: "What" },
          explain: "'What matters most is ...' (cleft).",
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
      intro: "Competencia de ESCRITURA. Construye cleft sentences persuasivas.",
      activities: [
        {
          id: "c1per-write-a1", type: "word_bank",
          prompt: "1. Enfatiza lo que importa:",
          payload: { words: ["is", "What", "honesty", "matters"], answer: ["What", "matters", "is", "honesty"] },
        },
        {
          id: "c1per-write-a2", type: "word_bank",
          prompt: "2. Enfatiza quien lo mostro:",
          payload: { words: ["who", "It", "King", "was", "showed", "it"], answer: ["It", "was", "King", "who", "showed", "it"] },
        },
        {
          id: "c1per-write-a3", type: "word_bank",
          prompt: "3. Di que un buen orador apela a la emocion:",
          payload: { words: ["emotion", "speakers", "Good", "to", "appeal"], answer: ["Good", "speakers", "appeal", "to", "emotion"] },
        },
        {
          id: "c1per-write-a4", type: "word_bank",
          prompt: "4. Enfatiza lo que necesitas:",
          payload: { words: ["is", "What", "argument", "need", "a", "you", "compelling"], answer: ["What", "you", "need", "is", "a", "compelling", "argument"] },
        },
        {
          id: "c1per-write-a5", type: "word_bank",
          prompt: "5. Aconseja conocer a tu audiencia:",
          payload: { words: ["audience", "Know", "your"], answer: ["Know", "your", "audience"] },
        },
        {
          id: "c1per-write-a6", type: "multiple_choice",
          prompt: "6. Cleft sentences are used to...",
          payload: { choices: ["ask questions", "emphasise part of a sentence", "report speech"], answer: 1 },
        },
        {
          id: "c1per-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["It was her who helped.", "It was her which helped.", "It her was who helped."], answer: 0 },
        },
        {
          id: "c1per-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'convincente'?",
          payload: { choices: ["compelling", "biased", "loud"], answer: 0 },
        },
      ],
    },
  ],
};
