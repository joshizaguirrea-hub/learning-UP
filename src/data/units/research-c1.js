/**
 * data/units/research-c1.js — Unidad tematica "Research & synthesis" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: nominalisation.
 */

export const RESEARCH_C1 = {
  id: "research-c1",
  language: "en",
  level: "C1",
  title: "Research & synthesis",
  subtitle: "Investigar y sintetizar con estilo academico (nominalizacion)",

  cando: [
    "Puedo investigar y sintetizar informacion de varias fuentes.",
    "Puedo usar la nominalizacion para un estilo academico.",
    "Puedo citar y resumir ideas con precision.",
    "Puedo escribir un texto academico conciso.",
  ],

  vocab: [
    { id: "c1re-1", term: "source", translation: "fuente", example: "Cite your sources." },
    { id: "c1re-2", term: "to summarise", translation: "resumir", example: "Summarise the main points." },
    { id: "c1re-3", term: "to cite", translation: "citar", example: "Always cite the author." },
    { id: "c1re-4", term: "evidence", translation: "evidencia", example: "The evidence is strong." },
    { id: "c1re-5", term: "reliable", translation: "confiable", example: "Use reliable sources." },
    { id: "c1re-6", term: "to synthesise", translation: "sintetizar", example: "Synthesise the findings." },
    { id: "c1re-7", term: "bias", translation: "sesgo", example: "Watch out for bias." },
    { id: "c1re-8", term: "conclusion", translation: "conclusion", example: "The conclusion is clear." },
    { id: "c1re-9", term: "to review", translation: "revisar", example: "Review the literature." },
    { id: "c1re-10", term: "objective", translation: "objetivo / imparcial", example: "Stay objective." },
    { id: "c1re-11", term: "analysis", translation: "analisis", example: "The analysis was thorough." },
    { id: "c1re-12", term: "accuracy", translation: "precision / exactitud", example: "Accuracy matters in research." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1re-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: sintetizar fuentes",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Good research\n" +
          "The analysis of reliable sources is essential in research. The synthesis of different studies " +
          "leads to stronger conclusions. Careful evaluation reduces bias, and the citation of authors " +
          "shows objectivity. A review of the literature revealed a clear improvement in results. The " +
          "identification of patterns is the key to good academic writing.\n\n" +
          "TEXT 2 - A study tip\n" +
          "A: How do I write an academic essay? B: Start with the analysis of your sources. A: And then? " +
          "B: The synthesis of ideas is important. A: How do I avoid bias? B: Through careful evaluation " +
          "and the citation of reliable authors. A: Got it. So accuracy matters. B: Exactly. Objectivity " +
          "is everything.",
        glossary: [
          { term: "the analysis of", translation: "el analisis de" },
          { term: "the synthesis of", translation: "la sintesis de" },
          { term: "the citation of", translation: "la citacion de" },
          { term: "source / evidence", translation: "fuente / evidencia" },
          { term: "to summarise / to synthesise", translation: "resumir / sintetizar" },
          { term: "bias / objective", translation: "sesgo / imparcial" },
          { term: "reliable / accuracy", translation: "confiable / precision" },
          { term: "conclusion / analysis", translation: "conclusion / analisis" },
        ],
        keyPhrases: [
          "Fijate en la nominalizacion: the analysis of..., the synthesis of..., the citation of...",
          "Convertir verbos en sustantivos da un tono academico y conciso.",
        ],
        check: [
          { prompt: "T1: What is essential in research?", choices: ["Analysis of reliable sources", "Guessing", "Speed"], answer: 0 },
          { prompt: "T1: What reduces bias?", choices: ["Careful evaluation", "Ignoring data", "Opinion"], answer: 0 },
          { prompt: "T1: What does citation show?", choices: ["Objectivity", "Weakness", "Bias"], answer: 0 },
          { prompt: "T2: How should you start an academic essay?", choices: ["Analysis of your sources", "A joke", "A conclusion"], answer: 0 },
          { prompt: "T2: How do you avoid bias?", choices: ["Careful evaluation and citation", "Guessing", "Copying"], answer: 0 },
          { prompt: "T2: What is everything, according to B?", choices: ["Objectivity", "Speed", "Length"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1re-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: investigacion",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "source / evidence", translation: "fuente / evidencia" },
        { term: "to summarise / to synthesise", translation: "resumir / sintetizar" },
        { term: "to cite / to review", translation: "citar / revisar" },
        { term: "reliable / objective", translation: "confiable / imparcial" },
        { term: "bias / conclusion", translation: "sesgo / conclusion" },
        { term: "analysis / accuracy", translation: "analisis / precision" },
      ],
      activities: [
        {
          id: "c1re-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "source", right: "fuente" },
            { left: "bias", right: "sesgo" },
            { left: "reliable", right: "confiable" },
            { left: "analysis", right: "analisis" },
          ] },
        },
        {
          id: "c1re-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to cite", right: "citar" },
            { left: "to review", right: "revisar" },
            { left: "objective", right: "imparcial" },
            { left: "accuracy", right: "precision" },
          ] },
        },
        {
          id: "c1re-vocab-a3", type: "cloze",
          prompt: "Completa: 'Always ___ the author.' (citar)",
          payload: { answer: "cite" },
          explain: "'To cite' = citar.",
        },
        {
          id: "c1re-vocab-a4", type: "cloze",
          prompt: "Completa: 'Stay ___.' (objetivo/imparcial)",
          payload: { answer: "objective" },
          explain: "'Objective' = objetivo / imparcial.",
        },
        {
          id: "c1re-vocab-a5", type: "cloze",
          prompt: "Completa: '___ matters in research.' (precision)",
          payload: { answer: "Accuracy" },
          explain: "'Accuracy' = precision / exactitud.",
        },
        {
          id: "c1re-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'sintetizar'?",
          payload: { choices: ["to summarise", "to synthesise", "to review"], answer: 1 },
          explain: "'To synthesise' = sintetizar (combinar ideas).",
        },
        {
          id: "c1re-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'sesgo'?",
          payload: { choices: ["bias", "source", "evidence"], answer: 0 },
          explain: "'Bias' = sesgo.",
        },
        {
          id: "c1re-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sources", "Cite", "your"], answer: ["Cite", "your", "sources"] },
          explain: "'Cite your sources' = cita tus fuentes.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1re-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: nominalizacion",
      intro: "Competencia de GRAMATICA. Aprende a convertir verbos en sustantivos (estilo academico).",
      grammar: {
        title: "Nominalisation",
        form: "verbo -> sustantivo: analyse -> the analysis · evaluate -> the evaluation · decide -> the decision",
        desc: "Sirve para escribir de forma m\u00e1s formal y densa convirtiendo verbos en sustantivos.",
        rule: "Transforma el verbo en sustantivo: 'analyse -> the analysis', 'evaluate -> the evaluation', 'decide -> the decision'. As\u00ed la idea suena m\u00e1s acad\u00e9mica y objetiva.",
        examples: ["They analysed the data -> The analysis of the data...", "We evaluated it -> The evaluation showed..."],
        explain: { tr: ["Analizaron los datos -> El an\u00e1lisis de los datos...", "Lo evaluamos -> La evaluaci\u00f3n mostr\u00f3..."] },
        mistakes: [
          { wrong: "The analyse of the data was clear.", right: "The analysis of the data was clear." },
          { wrong: "The evaluate reduced bias.", right: "The evaluation reduced bias." },
        ],
      },
      activities: [
        {
          id: "c1re-gram-a1", type: "cloze",
          prompt: "Nominaliza 'analyse': 'The ___ of the data was clear.'",
          payload: { answer: "analysis" },
          explain: "analyse (verbo) -> analysis (sustantivo).",
        },
        {
          id: "c1re-gram-a2", type: "cloze",
          prompt: "Nominaliza 'evaluate': 'The ___ reduced bias.'",
          payload: { answer: "evaluation" },
          explain: "evaluate -> evaluation.",
        },
        {
          id: "c1re-gram-a3", type: "multiple_choice",
          prompt: "Which is the noun form of 'decide'?",
          payload: { choices: ["deciding", "decision", "decisive"], answer: 1 },
          explain: "decide -> decision (sustantivo).",
        },
        {
          id: "c1re-gram-a4", type: "multiple_choice",
          prompt: "Nominalisation gives your writing a...",
          payload: { choices: ["casual tone", "concise academic tone", "confusing tone"], answer: 1 },
          explain: "Da un tono academico y conciso.",
        },
        {
          id: "c1re-gram-a5", type: "cloze",
          prompt: "Nominaliza 'cite': 'The ___ of authors shows objectivity.'",
          payload: { answer: "citation" },
          explain: "cite -> citation.",
        },
        {
          id: "c1re-gram-a6", type: "word_bank",
          prompt: "Ordena la frase nominalizada:",
          payload: { words: ["of", "The", "was", "the", "analysis", "data", "clear"], answer: ["The", "analysis", "of", "the", "data", "was", "clear"] },
          explain: "The + analysis + of + the + data + was + clear.",
        },
        {
          id: "c1re-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["bias", "The", "reduced", "evaluation"], answer: ["The", "evaluation", "reduced", "bias"] },
          explain: "The + evaluation + reduced + bias.",
        },
        {
          id: "c1re-gram-a8", type: "cloze",
          prompt: "Nominaliza 'synthesise': 'The ___ of ideas is important.'",
          payload: { answer: "synthesis" },
          explain: "synthesise -> synthesis.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1re-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: texto academico",
      intro: "Competencia de ESCRITURA. Construye frases nominalizadas.",
      activities: [
        {
          id: "c1re-write-a1", type: "word_bank",
          prompt: "1. Escribe con nominalizacion (el analisis de los datos):",
          payload: { words: ["of", "The", "was", "the", "analysis", "data", "clear"], answer: ["The", "analysis", "of", "the", "data", "was", "clear"] },
        },
        {
          id: "c1re-write-a2", type: "word_bank",
          prompt: "2. Di que la evaluacion redujo el sesgo:",
          payload: { words: ["bias", "The", "reduced", "evaluation"], answer: ["The", "evaluation", "reduced", "bias"] },
        },
        {
          id: "c1re-write-a3", type: "word_bank",
          prompt: "3. Aconseja usar fuentes confiables:",
          payload: { words: ["sources", "Use", "reliable"], answer: ["Use", "reliable", "sources"] },
        },
        {
          id: "c1re-write-a4", type: "word_bank",
          prompt: "4. Di que la sintesis de ideas es importante:",
          payload: { words: ["important", "The", "of", "synthesis", "ideas", "is"], answer: ["The", "synthesis", "of", "ideas", "is", "important"] },
        },
        {
          id: "c1re-write-a5", type: "word_bank",
          prompt: "5. Di que la precision importa:",
          payload: { words: ["matters", "Accuracy", "research", "in"], answer: ["Accuracy", "matters", "in", "research"] },
        },
        {
          id: "c1re-write-a6", type: "multiple_choice",
          prompt: "6. Nominalisation gives your writing a...",
          payload: { choices: ["casual tone", "concise academic tone", "confusing tone"], answer: 1 },
        },
        {
          id: "c1re-write-a7", type: "multiple_choice",
          prompt: "7. What is the noun of 'evaluate'?",
          payload: { choices: ["evaluation", "evaluating", "evaluative"], answer: 0 },
        },
        {
          id: "c1re-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'imparcial'?",
          payload: { choices: ["reliable", "objective", "biased"], answer: 1 },
        },
      ],
    },
  ],
};
