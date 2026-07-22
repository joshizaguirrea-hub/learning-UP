/**
 * data/units/academic-c1.js — Unidad tematica "Academic English" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: inversion.
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
    { id: "c1ac-11", term: "to gather", translation: "recopilar", example: "They gathered a lot of data." },
    { id: "c1ac-12", term: "rigorous", translation: "riguroso", example: "The study was rigorous." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1ac-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un articulo academico",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A rigorous study\n" +
          "Never before had researchers gathered so much data. Not only did the study analyse thousands of " +
          "cases, but it also proposed a new framework. Rarely do findings demonstrate such a significant " +
          "effect. The methodology was rigorous, and only after months of work did the team conclude their " +
          "analysis. Seldom has a single paper had such an impact.\n\n" +
          "TEXT 2 - Discussing research\n" +
          "A: Have you read the new paper? B: Yes. Never have I seen such clear findings. A: The " +
          "methodology is impressive. B: Not only did they gather huge data, but they also assessed it " +
          "carefully. A: Do they conclude anything new? B: Yes, and furthermore, they suggest future " +
          "research.",
        glossary: [
          { term: "Never before had...", translation: "Nunca antes habian..." },
          { term: "Not only did..., but also...", translation: "No solo..., sino tambien..." },
          { term: "Rarely do / Seldom has", translation: "Rara vez / Pocas veces ha" },
          { term: "hypothesis / findings", translation: "hipotesis / hallazgos" },
          { term: "to analyse / to assess", translation: "analizar / evaluar" },
          { term: "framework / methodology", translation: "marco teorico / metodologia" },
          { term: "to gather / rigorous", translation: "recopilar / riguroso" },
          { term: "to conclude / to demonstrate", translation: "concluir / demostrar" },
        ],
        keyPhrases: [
          "Fijate en la inversion: Never before had..., Not only did..., Rarely do..., Seldom has...",
          "Tras un adverbio negativo al inicio, el orden se invierte (auxiliar + sujeto).",
        ],
        check: [
          { prompt: "T1: What had never happened before?", choices: ["So much data gathered", "A holiday", "A failure"], answer: 0 },
          { prompt: "T1: What did the study propose?", choices: ["A new framework", "A new law", "A product"], answer: 0 },
          { prompt: "T1: How was the methodology?", choices: ["Rigorous", "Weak", "Missing"], answer: 0 },
          { prompt: "T2: What has B never seen before?", choices: ["Such clear findings", "A bad paper", "A short study"], answer: 0 },
          { prompt: "T2: What did the researchers do with the data?", choices: ["Gathered and assessed it", "Ignored it", "Lost it"], answer: 0 },
          { prompt: "T2: What do they suggest?", choices: ["Future research", "Stopping", "A holiday"], answer: 0 },
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
        { term: "significant / rigorous", translation: "significativo / riguroso" },
        { term: "to conclude / to demonstrate", translation: "concluir / demostrar" },
        { term: "framework / methodology", translation: "marco teorico / metodologia" },
        { term: "to gather / furthermore", translation: "recopilar / asimismo" },
      ],
      activities: [
        {
          id: "c1ac-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "hypothesis", right: "hipotesis" },
            { left: "findings", right: "hallazgos" },
            { left: "to assess", right: "evaluar" },
            { left: "rigorous", right: "riguroso" },
          ] },
        },
        {
          id: "c1ac-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to analyse", right: "analizar" },
            { left: "to conclude", right: "concluir" },
            { left: "framework", right: "marco teorico" },
            { left: "to gather", right: "recopilar" },
          ] },
        },
        {
          id: "c1ac-vocab-a3", type: "cloze",
          prompt: "Completa: 'The results were ___.' (significativos)",
          payload: { answer: "significant" },
          explain: "'Significant' = significativo.",
        },
        {
          id: "c1ac-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ was rigorous.' (metodologia)",
          payload: { answer: "methodology" },
          explain: "'Methodology' = metodologia.",
        },
        {
          id: "c1ac-vocab-a5", type: "cloze",
          prompt: "Completa: 'They ___ a lot of data.' (recopilar -> pasado)",
          payload: { answer: "gathered" },
          explain: "'To gather' = recopilar; pasado: gathered.",
        },
        {
          id: "c1ac-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'demostrar'?",
          payload: { choices: ["to conclude", "to demonstrate", "to gather"], answer: 1 },
          explain: "'To demonstrate' = demostrar.",
        },
        {
          id: "c1ac-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'hallazgos'?",
          payload: { choices: ["findings", "framework", "hypothesis"], answer: 0 },
          explain: "'Findings' = hallazgos.",
        },
        {
          id: "c1ac-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "We", "data", "analysed"], answer: ["We", "analysed", "the", "data"] },
          explain: "'We analysed the data' = analizamos los datos.",
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
        form: "negative adverb + auxiliary + subject + verb: Never have I..., Not only did he...",
        desc: "Sirve para dar \u00e9nfasis formal al inicio de una frase en registro culto o escrito.",
        rule: "Al empezar con un adverbio negativo, el orden se INVIERTE como en pregunta: 'adverbio negativo + auxiliar + sujeto + verbo'. Ej: 'Never have I seen...', 'Not only did he...'.",
        examples: ["Never have I seen such a thing.", "Not only did she win, but she also broke a record.", "Rarely do we see this."],
        explain: { tr: ["Nunca he visto algo as\u00ed.", "No solo gan\u00f3, sino que tambi\u00e9n rompi\u00f3 un r\u00e9cord.", "Rara vez vemos esto."] },
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
          id: "c1ac-gram-a4", type: "multiple_choice",
          prompt: "After a negative adverb at the start, the sentence...",
          payload: { choices: ["stays normal", "is inverted (auxiliary + subject)", "is deleted"], answer: 1 },
          explain: "Se invierte: auxiliar + sujeto.",
        },
        {
          id: "c1ac-gram-a5", type: "cloze",
          prompt: "Completa: 'Seldom ___ a paper had such impact.' (auxiliar: has)",
          payload: { answer: "has" },
          explain: "Tras 'Seldom' se invierte: has + sujeto + participio.",
        },
        {
          id: "c1ac-gram-a6", type: "word_bank",
          prompt: "Ordena la inversion:",
          payload: { words: ["I", "Never", "seen", "have", "it"], answer: ["Never", "have", "I", "seen", "it"] },
          explain: "Never + have + I + seen + it.",
        },
        {
          id: "c1ac-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["do", "Rarely", "this", "we", "see"], answer: ["Rarely", "do", "we", "see", "this"] },
          explain: "Rarely + do + we + see + this.",
        },
        {
          id: "c1ac-gram-a8", type: "cloze",
          prompt: "Completa: 'Not only ___ they gather data, but they also assessed it.' (auxiliar pasado)",
          payload: { answer: "did" },
          explain: "'Not only did + sujeto + base'.",
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
      intro: "Competencia de ESCRITURA. Construye frases academicas con inversion.",
      activities: [
        {
          id: "c1ac-write-a1", type: "word_bank",
          prompt: "1. Enfatiza que nunca habias visto tantos datos:",
          payload: { words: ["I", "Never", "so", "seen", "have", "much", "data"], answer: ["Never", "have", "I", "seen", "so", "much", "data"] },
        },
        {
          id: "c1ac-write-a2", type: "word_bank",
          prompt: "2. Di que el estudio concluye que funciona:",
          payload: { words: ["that", "The", "concludes", "study", "it", "works"], answer: ["The", "study", "concludes", "that", "it", "works"] },
        },
        {
          id: "c1ac-write-a3", type: "word_bank",
          prompt: "3. Di que analizaron los datos con cuidado:",
          payload: { words: ["the", "They", "carefully", "data", "analysed"], answer: ["They", "analysed", "the", "data", "carefully"] },
        },
        {
          id: "c1ac-write-a4", type: "word_bank",
          prompt: "4. Usa 'Rarely' con inversion:",
          payload: { words: ["do", "Rarely", "this", "we", "see"], answer: ["Rarely", "do", "we", "see", "this"] },
        },
        {
          id: "c1ac-write-a5", type: "word_bank",
          prompt: "5. Di que la metodologia fue rigurosa:",
          payload: { words: ["rigorous", "The", "was", "methodology"], answer: ["The", "methodology", "was", "rigorous"] },
        },
        {
          id: "c1ac-write-a6", type: "multiple_choice",
          prompt: "6. After a negative adverb at the start, the sentence...",
          payload: { choices: ["stays normal", "is inverted (auxiliary + subject)", "is deleted"], answer: 1 },
        },
        {
          id: "c1ac-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct inversion:",
          payload: { choices: ["Never I have failed.", "Never have I failed.", "Never failed I have."], answer: 1 },
        },
        {
          id: "c1ac-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'evaluar'?",
          payload: { choices: ["to gather", "to assess", "to conclude"], answer: 1 },
        },
      ],
    },
  ],
};
