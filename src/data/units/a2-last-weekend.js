/**
 * data/units/a2-last-weekend.js — Unidad tematica "Last weekend" (A2).
 *
 * Datos PUROS. Pasado simple (regular e irregular) para narrar. Ciclo PPP del
 * estandar de calidad (ver PLAN-DE-ESTUDIO.md).
 */

export const A2_LAST_WEEKEND = {
  id: "a2-last-weekend",
  language: "en",
  level: "A2",
  title: "Last weekend",
  subtitle: "Narrar lo que hiciste en pasado (regular e irregular)",

  cando: [
    "Puedo narrar acciones pasadas con el pasado simple.",
    "Puedo usar verbos irregulares comunes (go/went, have/had).",
    "Puedo hacer preguntas y negaciones con 'did/didn't'.",
    "Puedo contar una anecdota corta de mi fin de semana.",
  ],

  vocab: [
    { id: "a2lw-1", term: "to go (went)", translation: "ir (fue)", example: "I went to the beach." },
    { id: "a2lw-2", term: "to have (had)", translation: "tener (tuvo)", example: "We had a great time." },
    { id: "a2lw-3", term: "to meet (met)", translation: "conocer/encontrar (conocio)", example: "I met my friends." },
    { id: "a2lw-4", term: "to buy (bought)", translation: "comprar (compro)", example: "She bought a new phone." },
    { id: "a2lw-5", term: "to eat (ate)", translation: "comer (comio)", example: "We ate pizza." },
    { id: "a2lw-6", term: "to see (saw)", translation: "ver (vio)", example: "I saw a good film." },
    { id: "a2lw-7", term: "to take (took)", translation: "tomar (tomo)", example: "He took many photos." },
    { id: "a2lw-8", term: "to come (came)", translation: "venir (vino)", example: "My cousin came home." },
    { id: "a2lw-9", term: "beach", translation: "playa", example: "The beach was beautiful." },
    { id: "a2lw-10", term: "party", translation: "fiesta", example: "There was a party on Saturday." },
  ],

  lessons: [
    {
      id: "a2lw-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: un fin de semana ocupado",
      intro:
        "Lee la historia y estudia los verbos irregulares en pasado. Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Last weekend was very busy. On Saturday morning, I went to the beach with my friends. " +
          "We took a lot of photos and ate ice cream. In the evening, we had a party at Ana's house. " +
          "I met her cousin, who came from Spain. On Sunday, I bought a new book and saw a great film " +
          "at the cinema. I didn't study, but I relaxed a lot. It was a perfect weekend!",
        glossary: [
          { term: "went", translation: "fui/fue (go)" },
          { term: "took", translation: "tome/tomo (take)" },
          { term: "ate", translation: "comi/comio (eat)" },
          { term: "had", translation: "tuve/tuvo (have)" },
          { term: "met", translation: "conoci/conocio (meet)" },
          { term: "didn't study", translation: "no estudie" },
        ],
        keyPhrases: [
          "I went / had / met / saw... (verbos irregulares en pasado)",
          "Did you...? (Preguntas en pasado)",
          "I didn't... (Negacion en pasado)",
          "It was a perfect weekend. (Fue un fin de semana perfecto.)",
        ],
        note:
          "El pasado simple regular agrega -ed. Pero muchos verbos comunes son IRREGULARES y hay " +
          "que memorizarlos: go->went, have->had, see->saw, eat->ate, buy->bought.",
        grammar: {
          title: "Pasado simple (afirmativo, negativo, pregunta)",
          form: "afirm: verbo pasado · neg: didn't + base · preg: Did + sujeto + base?",
          examples: [
            "I went to the beach.",
            "I didn't go to work.",
            "Did you see the film?",
          ],
          mistakes: [
            { wrong: "I didn't went home.", right: "I didn't go home." },
            { wrong: "Did you saw it?", right: "Did you see it?" },
          ],
        },
        check: [
          { prompt: "Where did the person go on Saturday?", choices: ["The office", "The beach", "The gym"], answer: 1 },
          { prompt: "Did the person study on Sunday?", choices: ["Yes", "No", "Only math"], answer: 1 },
        ],
      },
      activities: [],
    },
    {
      id: "a2lw-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: preguntar por el pasado",
      intro: "Para preguntar en pasado usamos 'Did + sujeto + verbo base'. Lee el dialogo.",
      dialogue: [
        "A: What did you do last weekend?",
        "B: I went to a party and met new people.",
        "A: Nice! Did you have a good time?",
        "B: Yes, I did. We ate a lot and danced!",
      ],
      activities: [
        {
          id: "a2lw-l1-a1", type: "multiple_choice",
          prompt: "Choose the correct question:",
          payload: { choices: ["Did you went home?", "Did you go home?", "Do you went home?"], answer: 1 },
          explain: "Con 'Did', el verbo va en BASE: 'Did you go?'.",
        },
        {
          id: "a2lw-l1-a2", type: "matching",
          prompt: "Empareja el verbo con su pasado irregular:",
          payload: { pairs: [
            { left: "go", right: "went" },
            { left: "have", right: "had" },
            { left: "see", right: "saw" },
          ] },
        },
      ],
    },
    {
      id: "a2lw-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: verbos irregulares",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a2lw-l2-a1", type: "cloze",
          prompt: "Completa: 'I ___ to the beach.' (ir -> pasado)",
          payload: { answer: "went" },
          explain: "'go' en pasado es 'went' (irregular).",
        },
        {
          id: "a2lw-l2-a2", type: "cloze",
          prompt: "Completa: 'We ___ pizza last night.' (comer -> pasado)",
          payload: { answer: "ate" },
          explain: "'eat' en pasado es 'ate' (irregular).",
        },
        {
          id: "a2lw-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "She didn't bought a phone.",
            "She didn't buy a phone.",
            "She don't buy a phone.",
          ], answer: 1 },
          explain: "Con 'didn't' el verbo va en base: 'didn't buy'.",
        },
        {
          id: "a2lw-l2-a4", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["did", "What", "do?", "you"], answer: ["What", "did", "you", "do?"] },
          explain: "Orden: What + did + you + do?",
        },
        {
          id: "a2lw-l2-a5", type: "cloze",
          prompt: "Completa: 'I ___ my friends at the party.' (conocer/encontrar -> pasado)",
          payload: { answer: "met" },
          explain: "'meet' en pasado es 'met' (irregular).",
        },
      ],
    },
    {
      id: "a2lw-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: cuenta tu finde",
      intro: "Tarea real: construye frases sobre tu fin de semana. Ordena cada frase.",
      activities: [
        {
          id: "a2lw-l3-a1", type: "word_bank",
          prompt: "Di que fuiste a la playa:",
          payload: { words: ["the", "I", "to", "went", "beach"], answer: ["I", "went", "to", "the", "beach"] },
        },
        {
          id: "a2lw-l3-a2", type: "word_bank",
          prompt: "Di que la pasaste bien:",
          payload: { words: ["a", "I", "time", "had", "great"], answer: ["I", "had", "a", "great", "time"] },
        },
        {
          id: "a2lw-l3-a3", type: "word_bank",
          prompt: "Di que no estudiaste:",
          payload: { words: ["study", "I", "didn't"], answer: ["I", "didn't", "study"] },
        },
        {
          id: "a2lw-l3-a4", type: "multiple_choice",
          prompt: "Which is the past of 'buy'?",
          payload: { choices: ["buyed", "bought", "buys"], answer: 1 },
        },
      ],
    },
  ],
};
