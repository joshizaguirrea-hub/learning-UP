/**
 * data/units/register-c2.js — Unidad tematica "Mastering register" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: fronting (orden marcado).
 */

export const REGISTER_C2 = {
  id: "register-c2",
  language: "en",
  level: "C2",
  title: "Mastering register",
  subtitle: "Dominar el registro y el enfasis con fronting",

  cando: [
    "Puedo adaptar el registro con total control.",
    "Puedo usar el fronting para dar enfasis estilistico.",
    "Puedo elegir la estructura por su efecto.",
    "Puedo escribir con precision de nivel casi nativo.",
  ],

  vocab: [
    { id: "c2reg-1", term: "register", translation: "registro", example: "Match the register to the context." },
    { id: "c2reg-2", term: "formal", translation: "formal", example: "Use a formal tone here." },
    { id: "c2reg-3", term: "colloquial", translation: "coloquial", example: "That's too colloquial." },
    { id: "c2reg-4", term: "emphasis", translation: "enfasis", example: "Put emphasis on the key word." },
    { id: "c2reg-5", term: "to convey", translation: "transmitir", example: "Words convey attitude." },
    { id: "c2reg-6", term: "connotation", translation: "connotacion", example: "The word has a negative connotation." },
    { id: "c2reg-7", term: "eloquent", translation: "elocuente", example: "She is an eloquent speaker." },
    { id: "c2reg-8", term: "appropriate", translation: "apropiado", example: "Choose an appropriate style." },
    { id: "c2reg-9", term: "understatement", translation: "atenuacion", example: "British humour loves understatement." },
    { id: "c2reg-10", term: "subtle", translation: "sutil", example: "A subtle change of tone." },
    { id: "c2reg-11", term: "nuance", translation: "matiz", example: "Every word has a nuance." },
    { id: "c2reg-12", term: "audience", translation: "audiencia", example: "Consider your audience." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2reg-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el poder del registro",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - The power of register\n" +
          "Rarely is register given the attention it deserves. So subtle are its effects that few notice " +
          "them. Down came the formal tone, and up rose a warmer voice. Never before had she conveyed such " +
          "authority with so few words. Little did the audience know how carefully each phrase had been " +
          "chosen. What an eloquent speaker she was!\n\n" +
          "TEXT 2 - A style lesson\n" +
          "A: My emails sound too stiff. B: Match the register to the reader. A: How? B: In formal contexts, " +
          "avoid anything too colloquial. A: And with friends? B: A relaxed tone works. Never underestimate " +
          "the power of nuance. A: So every word conveys attitude? B: Exactly. Only then will you master it.",
        glossary: [
          { term: "Rarely is register given...", translation: "Rara vez se le da al registro..." },
          { term: "So subtle are its effects...", translation: "Tan sutiles son sus efectos..." },
          { term: "Little did they know", translation: "Poco sabian" },
          { term: "Only then will you...", translation: "Solo entonces..." },
          { term: "register / formal / colloquial", translation: "registro / formal / coloquial" },
          { term: "to convey / nuance", translation: "transmitir / matiz" },
          { term: "eloquent / subtle", translation: "elocuente / sutil" },
          { term: "understatement / audience", translation: "atenuacion / audiencia" },
        ],
        keyPhrases: [
          "Fijate en el fronting: Rarely is..., So subtle are..., Little did they know..., Only then will you...",
          "Colocar al inicio un elemento inusual crea enfasis estilistico.",
        ],
        check: [
          { prompt: "T1: What is rarely given attention?", choices: ["Register", "Money", "Time"], answer: 0 },
          { prompt: "T1: How were the effects of register?", choices: ["Loud", "Subtle", "Absent"], answer: 1 },
          { prompt: "T1: What did the audience not know?", choices: ["How carefully phrases were chosen", "The time", "The topic"], answer: 0 },
          { prompt: "T2: Why do A's emails sound bad?", choices: ["Too stiff", "Too short", "Too funny"], answer: 0 },
          { prompt: "T2: What should you avoid in formal contexts?", choices: ["Anything too colloquial", "Any greeting", "Full stops"], answer: 0 },
          { prompt: "T2: What does every word convey?", choices: ["Attitude", "Nothing", "Numbers"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2reg-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: registro y estilo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "register / emphasis", translation: "registro / enfasis" },
        { term: "formal / colloquial", translation: "formal / coloquial" },
        { term: "connotation / understatement", translation: "connotacion / atenuacion" },
        { term: "to convey / nuance", translation: "transmitir / matiz" },
        { term: "appropriate / eloquent", translation: "apropiado / elocuente" },
        { term: "subtle / audience", translation: "sutil / audiencia" },
      ],
      activities: [
        {
          id: "c2reg-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "register", right: "registro" },
            { left: "subtle", right: "sutil" },
            { left: "eloquent", right: "elocuente" },
            { left: "nuance", right: "matiz" },
          ] },
        },
        {
          id: "c2reg-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "formal", right: "formal" },
            { left: "colloquial", right: "coloquial" },
            { left: "emphasis", right: "enfasis" },
            { left: "audience", right: "audiencia" },
          ] },
        },
        {
          id: "c2reg-vocab-a3", type: "cloze",
          prompt: "Completa: 'That's too ___.' (coloquial)",
          payload: { answer: "colloquial" },
          explain: "'Colloquial' = coloquial / informal.",
        },
        {
          id: "c2reg-vocab-a4", type: "cloze",
          prompt: "Completa: 'Choose an ___ style.' (apropiado)",
          payload: { answer: "appropriate" },
          explain: "'Appropriate' = apropiado.",
        },
        {
          id: "c2reg-vocab-a5", type: "cloze",
          prompt: "Completa: 'Every word has a ___.' (matiz)",
          payload: { answer: "nuance" },
          explain: "'Nuance' = matiz.",
        },
        {
          id: "c2reg-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'transmitir'?",
          payload: { choices: ["to convey", "to choose", "to notice"], answer: 0 },
          explain: "'To convey' = transmitir.",
        },
        {
          id: "c2reg-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'atenuacion'?",
          payload: { choices: ["understatement", "emphasis", "register"], answer: 0 },
          explain: "'Understatement' = atenuacion.",
        },
        {
          id: "c2reg-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["audience", "Consider", "your"], answer: ["Consider", "your", "audience"] },
          explain: "'Consider your audience' = considera a tu audiencia.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2reg-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: fronting",
      intro: "Competencia de GRAMATICA. Aprende el fronting para enfasis estilistico.",
      grammar: {
        title: "Fronting (marked word order)",
        form: "elemento inusual al inicio (+ inversion si es negativo/adverbial)",
        examples: ["So beautiful was the view that we stayed.", "Down came the rain.", "Little did they know."],
        explain: { tr: ["Tan hermosa era la vista que nos quedamos.", "Cay\u00f3 la lluvia.", "Poco sab\u00edan."] },
        mistakes: [
          { wrong: "So the view was beautiful that we stayed.", right: "So beautiful was the view that we stayed." },
          { wrong: "Little they knew.", right: "Little did they know." },
        ],
      },
      activities: [
        {
          id: "c2reg-gram-a1", type: "cloze",
          prompt: "Completa: 'So subtle ___ its effects that few notice.' (auxiliar)",
          payload: { answer: "are" },
          explain: "Tras 'So + adjetivo' fronteado se invierte: are its effects.",
        },
        {
          id: "c2reg-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct fronting:",
          payload: { choices: ["Little did they know the truth.", "Little they did know the truth.", "Little they knew did the truth."], answer: 0 },
          explain: "'Little did + sujeto + base' (inversion tras adverbio negativo fronteado).",
        },
        {
          id: "c2reg-gram-a3", type: "multiple_choice",
          prompt: "Choose the emphatic (fronted) sentence:",
          payload: { choices: ["The rain came down.", "Down came the rain.", "Rain the down came."], answer: 1 },
          explain: "'Down came the rain' fronteando el adverbio para efecto dramatico.",
        },
        {
          id: "c2reg-gram-a4", type: "multiple_choice",
          prompt: "Fronting is used for...",
          payload: { choices: ["grammar errors", "stylistic emphasis", "asking questions"], answer: 1 },
          explain: "Para dar enfasis estilistico.",
        },
        {
          id: "c2reg-gram-a5", type: "cloze",
          prompt: "Completa: 'Only then ___ you master it.' (auxiliar futuro invertido)",
          payload: { answer: "will" },
          explain: "'Only then will + sujeto + base' (inversion).",
        },
        {
          id: "c2reg-gram-a6", type: "word_bank",
          prompt: "Ordena el fronting:",
          payload: { words: ["did", "know", "Little", "they"], answer: ["Little", "did", "they", "know"] },
          explain: "Little + did + they + know.",
        },
        {
          id: "c2reg-gram-a7", type: "word_bank",
          prompt: "Ordena la inversion:",
          payload: { words: ["the", "Down", "came", "rain"], answer: ["Down", "came", "the", "rain"] },
          explain: "Down + came + the + rain.",
        },
        {
          id: "c2reg-gram-a8", type: "cloze",
          prompt: "Completa: 'Rarely ___ register given such attention.' (auxiliar: is)",
          payload: { answer: "is" },
          explain: "'Rarely is register given...' (inversion pasiva).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2reg-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: enfasis con estilo",
      intro: "Competencia de ESCRITURA. Construye frases con fronting.",
      activities: [
        {
          id: "c2reg-write-a1", type: "word_bank",
          prompt: "1. Frasea con enfasis (poco sabian):",
          payload: { words: ["did", "know", "Little", "they"], answer: ["Little", "did", "they", "know"] },
        },
        {
          id: "c2reg-write-a2", type: "word_bank",
          prompt: "2. Di que ella es una oradora elocuente:",
          payload: { words: ["eloquent", "She", "an", "is", "speaker"], answer: ["She", "is", "an", "eloquent", "speaker"] },
        },
        {
          id: "c2reg-write-a3", type: "word_bank",
          prompt: "3. Aconseja igualar el registro al contexto:",
          payload: { words: ["the", "Match", "context", "register", "the", "to"], answer: ["Match", "the", "register", "to", "the", "context"] },
        },
        {
          id: "c2reg-write-a4", type: "word_bank",
          prompt: "4. Usa fronting con 'Down':",
          payload: { words: ["the", "Down", "came", "rain"], answer: ["Down", "came", "the", "rain"] },
        },
        {
          id: "c2reg-write-a5", type: "word_bank",
          prompt: "5. Aconseja considerar a tu audiencia:",
          payload: { words: ["audience", "Consider", "your"], answer: ["Consider", "your", "audience"] },
        },
        {
          id: "c2reg-write-a6", type: "multiple_choice",
          prompt: "6. Fronting is used for...",
          payload: { choices: ["grammar errors", "stylistic emphasis", "asking questions"], answer: 1 },
        },
        {
          id: "c2reg-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct fronted sentence:",
          payload: { choices: ["Never have I seen such style.", "Never I have seen such style.", "Never seen I have such style."], answer: 0 },
        },
        {
          id: "c2reg-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'sutil'?",
          payload: { choices: ["subtle", "formal", "eloquent"], answer: 0 },
        },
      ],
    },
  ],
};
