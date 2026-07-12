/**
 * data/units/opinion-essays-b2.js — Unidad tematica "Opinion essays" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: linkers de argumentacion.
 */

export const OPINION_ESSAYS_B2 = {
  id: "opinion-essays-b2",
  language: "en",
  level: "B2",
  title: "Opinion essays",
  subtitle: "Argumentar por escrito con conectores del discurso",

  cando: [
    "Puedo estructurar un ensayo de opinion.",
    "Puedo usar conectores para argumentar (however, therefore, although).",
    "Puedo presentar pros, contras y una conclusion.",
    "Puedo defender un punto de vista por escrito.",
  ],

  vocab: [
    { id: "b2op-1", term: "however", translation: "sin embargo", example: "It's cheap; however, it's slow." },
    { id: "b2op-2", term: "therefore", translation: "por lo tanto", example: "It rained; therefore, we stayed." },
    { id: "b2op-3", term: "although", translation: "aunque", example: "Although it's hard, it's worth it." },
    { id: "b2op-4", term: "furthermore", translation: "ademas", example: "Furthermore, it saves money." },
    { id: "b2op-5", term: "on the other hand", translation: "por otro lado", example: "On the other hand, it's risky." },
    { id: "b2op-6", term: "in conclusion", translation: "en conclusion", example: "In conclusion, I agree." },
    { id: "b2op-7", term: "argument", translation: "argumento", example: "It's a strong argument." },
    { id: "b2op-8", term: "to argue", translation: "argumentar", example: "Some people argue that..." },
    { id: "b2op-9", term: "advantage", translation: "ventaja", example: "The main advantage is speed." },
    { id: "b2op-10", term: "drawback", translation: "desventaja", example: "The main drawback is cost." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2op-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un ensayo de opinion",
      intro: "Competencia de LECTURA. Lee el ensayo y comprueba que entendiste.",
      content: {
        reading:
          "Should students use phones at school? On the one hand, phones are useful tools. Furthermore, " +
          "they help students find information quickly. On the other hand, they can be a distraction. " +
          "Although phones have advantages, the main drawback is that students lose focus. Some people " +
          "argue that a total ban is unfair; however, clear rules could help. Therefore, in my opinion, " +
          "phones should be allowed only for schoolwork. In conclusion, balance is the best solution.",
        keyPhrases: [
          "Fijate en la estructura: introduccion, pros, contras, opinion, conclusion.",
          "Fijate en los conectores: on the one hand, furthermore, however, therefore, in conclusion.",
        ],
        check: [
          { prompt: "What is the essay about?", choices: ["Phones at school", "School food", "Homework"], answer: 0 },
          { prompt: "What is the main drawback mentioned?", choices: ["Students lose focus", "Phones are cheap", "No wifi"], answer: 0 },
          { prompt: "What does the writer suggest?", choices: ["A total ban", "Phones only for schoolwork", "No rules"], answer: 1 },
          { prompt: "What is the best solution, in conclusion?", choices: ["Balance", "Ban everything", "Free use"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2op-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: argumentacion",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "however / therefore", translation: "sin embargo / por lo tanto" },
        { term: "although / furthermore", translation: "aunque / ademas" },
        { term: "on the other hand", translation: "por otro lado" },
        { term: "in conclusion", translation: "en conclusion" },
        { term: "argument / to argue", translation: "argumento / argumentar" },
        { term: "advantage / drawback", translation: "ventaja / desventaja" },
      ],
      activities: [
        {
          id: "b2op-vocab-a1", type: "matching",
          prompt: "Empareja el conector con su significado:",
          payload: { pairs: [
            { left: "however", right: "sin embargo" },
            { left: "therefore", right: "por lo tanto" },
            { left: "although", right: "aunque" },
          ] },
        },
        {
          id: "b2op-vocab-a2", type: "cloze",
          prompt: "Completa: 'The main ___ is speed.' (ventaja)",
          payload: { answer: "advantage" },
          explain: "'Advantage' = ventaja.",
        },
        {
          id: "b2op-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'desventaja'?",
          payload: { choices: ["advantage", "drawback", "argument"], answer: 1 },
          explain: "'Drawback' = desventaja.",
        },
        {
          id: "b2op-vocab-a4", type: "cloze",
          prompt: "Completa: 'In ___, I agree.' (conclusion)",
          payload: { answer: "conclusion" },
          explain: "'In conclusion' = en conclusion.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2op-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: conectores del discurso",
      intro: "Competencia de GRAMATICA. Aprende a conectar ideas al argumentar.",
      grammar: {
        title: "Linkers (contraste, causa, adicion)",
        form: "contraste: however / although · causa-efecto: therefore / so · adicion: furthermore / moreover",
        examples: ["Although it's hard, it's worth it.", "It rained; therefore, we stayed.", "It's cheap. Furthermore, it's fast."],
        mistakes: [
          { wrong: "Although it's hard but it's worth it.", right: "Although it's hard, it's worth it." },
          { wrong: "It rained, therefore we stayed home (no punctuation).", right: "It rained; therefore, we stayed home." },
        ],
      },
      activities: [
        {
          id: "b2op-gram-a1", type: "cloze",
          prompt: "Completa (contraste): 'It's useful; ___, it can distract.' (sin embargo)",
          payload: { answer: "however" },
          explain: "'however' introduce un contraste.",
        },
        {
          id: "b2op-gram-a2", type: "cloze",
          prompt: "Completa (causa-efecto): 'It rained; ___, we stayed home.' (por lo tanto)",
          payload: { answer: "therefore" },
          explain: "'therefore' indica consecuencia.",
        },
        {
          id: "b2op-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "Although it's expensive, it's worth it.",
            "Although it's expensive but it's worth it.",
            "Although but it's expensive, it's worth it.",
          ], answer: 0 },
          explain: "'Although' NO se combina con 'but'.",
        },
        {
          id: "b2op-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["hard,", "Although", "worth", "it's", "it's", "it"], answer: ["Although", "it's", "hard,", "it's", "worth", "it"] },
          explain: "Orden: Although + it's + hard, + it's + worth + it.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2op-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: arma tu ensayo",
      intro: "Competencia de ESCRITURA. Construye frases de un ensayo de opinion. Ordena cada frase.",
      activities: [
        {
          id: "b2op-write-a1", type: "word_bank",
          prompt: "Presenta un contraste:",
          payload: { words: ["the", "On", "hand,", "other", "it's", "risky"], answer: ["On", "the", "other", "hand,", "it's", "risky"] },
        },
        {
          id: "b2op-write-a2", type: "word_bank",
          prompt: "Cierra con una conclusion:",
          payload: { words: ["conclusion,", "In", "agree", "I"], answer: ["In", "conclusion,", "I", "agree"] },
        },
        {
          id: "b2op-write-a3", type: "word_bank",
          prompt: "Da tu opinion con conector de consecuencia:",
          payload: { words: ["opinion", "Therefore,", "my", "it", "in", "helps"], answer: ["Therefore,", "in", "my", "opinion", "it", "helps"] },
        },
        {
          id: "b2op-write-a4", type: "multiple_choice",
          prompt: "Which linker shows contrast?",
          payload: { choices: ["furthermore", "however", "therefore"], answer: 1 },
        },
      ],
    },
  ],
};
