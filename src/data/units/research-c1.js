/**
 * data/units/research-c1.js — Unidad tematica "Research & synthesis" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: nominalisation.
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
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1re-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: sintetizar fuentes",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "The analysis of reliable sources is essential in research. The synthesis of different studies " +
          "leads to stronger conclusions. Careful evaluation reduces bias, and the citation of authors " +
          "shows objectivity. A review of the literature revealed a clear improvement in results. The " +
          "identification of patterns, followed by a summary of the evidence, is the key to good academic " +
          "writing. In short, the combination of accuracy and clarity produces reliable knowledge.",
        keyPhrases: [
          "Fijate en la nominalizacion: the analysis of..., the synthesis of..., the citation of..., the identification of...",
          "Convertir verbos en sustantivos da un tono academico y conciso.",
        ],
        check: [
          { prompt: "What is essential in research?", choices: ["Analysis of reliable sources", "Guessing", "Speed"], answer: 0 },
          { prompt: "What reduces bias?", choices: ["Careful evaluation", "Ignoring data", "Opinion"], answer: 0 },
          { prompt: "What does citation show?", choices: ["Objectivity", "Weakness", "Bias"], answer: 0 },
          { prompt: "What produces reliable knowledge?", choices: ["Accuracy and clarity", "Speed and noise", "Luck"], answer: 0 },
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
        { term: "bias", translation: "sesgo" },
        { term: "conclusion", translation: "conclusion" },
      ],
      activities: [
        {
          id: "c1re-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "source", right: "fuente" },
            { left: "bias", right: "sesgo" },
            { left: "reliable", right: "confiable" },
          ] },
        },
        {
          id: "c1re-vocab-a2", type: "cloze",
          prompt: "Completa: 'Always ___ the author.' (citar)",
          payload: { answer: "cite" },
          explain: "'To cite' = citar.",
        },
        {
          id: "c1re-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'sintetizar'?",
          payload: { choices: ["to summarise", "to synthesise", "to review"], answer: 1 },
          explain: "'To synthesise' = sintetizar (combinar ideas).",
        },
        {
          id: "c1re-vocab-a4", type: "cloze",
          prompt: "Completa: 'Stay ___.' (objetivo/imparcial)",
          payload: { answer: "objective" },
          explain: "'Objective' = objetivo / imparcial.",
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
        examples: ["They analysed the data -> The analysis of the data...", "We evaluated it -> The evaluation showed..."],
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
          id: "c1re-gram-a4", type: "word_bank",
          prompt: "Ordena la frase nominalizada:",
          payload: { words: ["of", "The", "was", "the", "analysis", "data", "clear"], answer: ["The", "analysis", "of", "the", "data", "was", "clear"] },
          explain: "Orden: The + analysis + of + the + data + was + clear.",
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
      intro: "Competencia de ESCRITURA. Construye frases nominalizadas. Ordena cada frase.",
      activities: [
        {
          id: "c1re-write-a1", type: "word_bank",
          prompt: "Escribe con nominalizacion (el analisis de los datos):",
          payload: { words: ["of", "The", "was", "the", "analysis", "data", "clear"], answer: ["The", "analysis", "of", "the", "data", "was", "clear"] },
        },
        {
          id: "c1re-write-a2", type: "word_bank",
          prompt: "Di que la evaluacion redujo el sesgo:",
          payload: { words: ["bias", "The", "reduced", "evaluation"], answer: ["The", "evaluation", "reduced", "bias"] },
        },
        {
          id: "c1re-write-a3", type: "word_bank",
          prompt: "Aconseja usar fuentes confiables:",
          payload: { words: ["sources", "Use", "reliable"], answer: ["Use", "reliable", "sources"] },
        },
        {
          id: "c1re-write-a4", type: "multiple_choice",
          prompt: "Nominalisation gives your writing a...",
          payload: { choices: ["casual tone", "concise academic tone", "confusing tone"], answer: 1 },
        },
      ],
    },
  ],
};
