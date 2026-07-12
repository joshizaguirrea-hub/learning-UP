/**
 * data/units/academic-c1.js — Unidad tematica "Academic English" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: inversion.
 */

export const ACADEMIC_C1 = {
  id: "academic-c1",
  language: "en",
  level: "C1",
  title: "Academic English",
  subtitle: "Lenguaje academico y estructuras enfaticas con inversion",

  cando: [
    "Puedo usar lenguaje academico y formal.",
    "Puedo usar la inversion para dar enfasis (Never have I...).",
    "Puedo estructurar ideas complejas con precision.",
    "Puedo escribir en un registro academico.",
  ],

  vocab: [
    { id: "c1ac-1", term: "hypothesis", translation: "hipotesis", example: "The hypothesis was tested." },
    { id: "c1ac-2", term: "to analyse", translation: "analizar", example: "We analysed the data." },
    { id: "c1ac-3", term: "significant", translation: "significativo", example: "The results were significant." },
    { id: "c1ac-4", term: "to conclude", translation: "concluir", example: "The study concludes that..." },
    { id: "c1ac-5", term: "framework", translation: "marco (teorico)", example: "A clear framework helps." },
    { id: "c1ac-6", term: "to assess", translation: "evaluar", example: "We assessed the impact." },
    { id: "c1ac-7", term: "findings", translation: "hallazgos", example: "The findings are clear." },
    { id: "c1ac-8", term: "to demonstrate", translation: "demostrar", example: "The paper demonstrates this." },
    { id: "c1ac-9", term: "methodology", translation: "metodologia", example: "The methodology was rigorous." },
    { id: "c1ac-10", term: "furthermore", translation: "asimismo / ademas", example: "Furthermore, it is efficient." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1ac-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un articulo academico",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Never before had researchers gathered so much data. Not only did the study analyse thousands " +
          "of cases, but it also proposed a new framework. Rarely do findings demonstrate such a " +
          "significant effect. The methodology was rigorous, and only after months of work did the team " +
          "conclude their analysis. Seldom has a single paper had such an impact. The authors assess " +
          "the results carefully and, furthermore, suggest directions for future research.",
        keyPhrases: [
          "Fijate en la inversion: Never before had..., Not only did..., Rarely do..., Seldom has...",
          "Tras un adverbio negativo al inicio, el orden se invierte (auxiliar + sujeto).",
        ],
        check: [
          { prompt: "What had never happened before?", choices: ["So much data gathered", "A holiday", "A failure"], answer: 0 },
          { prompt: "What did the study propose?", choices: ["A new framework", "A new law", "A product"], answer: 0 },
          { prompt: "How was the methodology?", choices: ["Rigorous", "Weak", "Missing"], answer: 0 },
          { prompt: "What do the authors suggest?", choices: ["Future research directions", "Stopping", "Nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1ac-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: lenguaje academico",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "hypothesis / findings", translation: "hipotesis / hallazgos" },
        { term: "to analyse / to assess", translation: "analizar / evaluar" },
        { term: "significant", translation: "significativo" },
        { term: "to conclude / to demonstrate", translation: "concluir / demostrar" },
        { term: "framework / methodology", translation: "marco teorico / metodologia" },
        { term: "furthermore", translation: "asimismo / ademas" },
      ],
      activities: [
        {
          id: "c1ac-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "hypothesis", right: "hipotesis" },
            { left: "findings", right: "hallazgos" },
            { left: "to assess", right: "evaluar" },
          ] },
        },
        {
          id: "c1ac-vocab-a2", type: "cloze",
          prompt: "Completa: 'The results were ___.' (significativos)",
          payload: { answer: "significant" },
          explain: "'Significant' = significativo.",
        },
        {
          id: "c1ac-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'demostrar'?",
          payload: { choices: ["to conclude", "to demonstrate", "to gather"], answer: 1 },
          explain: "'To demonstrate' = demostrar.",
        },
        {
          id: "c1ac-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ was rigorous.' (metodologia)",
          payload: { answer: "methodology" },
          explain: "'Methodology' = metodologia.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1ac-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: inversion",
      intro: "Competencia de GRAMATICA. Aprende la inversion enfatica.",
      grammar: {
        title: "Inversion (enfasis)",
        form: "adverbio negativo + auxiliar + sujeto + verbo: Never have I..., Not only did he...",
        examples: ["Never have I seen such a thing.", "Not only did she win, but she also broke a record.", "Rarely do we see this."],
        mistakes: [
          { wrong: "Never I have seen it.", right: "Never have I seen it." },
          { wrong: "Not only she won.", right: "Not only did she win." },
        ],
      },
      activities: [
        {
          id: "c1ac-gram-a1", type: "cloze",
          prompt: "Completa: 'Never ___ I seen such data.' (auxiliar)",
          payload: { answer: "have" },
          explain: "Tras 'Never' se invierte: have + I + participio.",
        },
        {
          id: "c1ac-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct inversion:",
          payload: { choices: ["Not only he studied, he also worked.", "Not only did he study, but he also worked.", "Not only studied he."], answer: 1 },
          explain: "'Not only did + sujeto + base', y 'but ... also'.",
        },
        {
          id: "c1ac-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["Rarely do we see this.", "Rarely we see this.", "Rarely we do see this."], answer: 0 },
          explain: "Tras 'Rarely' se invierte: do + we + base.",
        },
        {
          id: "c1ac-gram-a4", type: "word_bank",
          prompt: "Ordena la inversion:",
          payload: { words: ["I", "Never", "seen", "have", "it"], answer: ["Never", "have", "I", "seen", "it"] },
          explain: "Orden: Never + have + I + seen + it.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1ac-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: registro academico",
      intro: "Competencia de ESCRITURA. Construye frases academicas con inversion. Ordena cada frase.",
      activities: [
        {
          id: "c1ac-write-a1", type: "word_bank",
          prompt: "Enfatiza que nunca habias visto tantos datos:",
          payload: { words: ["I", "Never", "so", "seen", "have", "much", "data"], answer: ["Never", "have", "I", "seen", "so", "much", "data"] },
        },
        {
          id: "c1ac-write-a2", type: "word_bank",
          prompt: "Di que el estudio concluye que funciona:",
          payload: { words: ["that", "The", "concludes", "study", "it", "works"], answer: ["The", "study", "concludes", "that", "it", "works"] },
        },
        {
          id: "c1ac-write-a3", type: "word_bank",
          prompt: "Di que analizaron los datos con cuidado:",
          payload: { words: ["the", "They", "carefully", "data", "analysed"], answer: ["They", "analysed", "the", "data", "carefully"] },
        },
        {
          id: "c1ac-write-a4", type: "multiple_choice",
          prompt: "After a negative adverb at the start, the sentence...",
          payload: { choices: ["stays normal", "is inverted (auxiliary + subject)", "is deleted"], answer: 1 },
        },
      ],
    },
  ],
};
