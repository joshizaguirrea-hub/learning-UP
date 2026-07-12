/**
 * data/units/data-trends-c1.js — Unidad tematica "Data & trends" (C1).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: double comparatives.
 */

export const DATA_TRENDS_C1 = {
  id: "data-trends-c1",
  language: "en",
  level: "C1",
  title: "Data & trends",
  subtitle: "Describir datos y tendencias con dobles comparativos",

  cando: [
    "Puedo describir datos, graficos y tendencias.",
    "Puedo usar dobles comparativos (the more..., the more...).",
    "Puedo expresar relaciones de causa y proporcion.",
    "Puedo escribir un resumen de datos.",
  ],

  vocab: [
    { id: "c1dt-1", term: "trend", translation: "tendencia", example: "The trend is upward." },
    { id: "c1dt-2", term: "to increase", translation: "aumentar", example: "Sales increased sharply." },
    { id: "c1dt-3", term: "to decline", translation: "disminuir", example: "Numbers declined slowly." },
    { id: "c1dt-4", term: "significant", translation: "significativo", example: "A significant rise." },
    { id: "c1dt-5", term: "rate", translation: "tasa", example: "The growth rate is high." },
    { id: "c1dt-6", term: "to peak", translation: "alcanzar el maximo", example: "Sales peaked in June." },
    { id: "c1dt-7", term: "steady", translation: "constante", example: "A steady increase." },
    { id: "c1dt-8", term: "to fluctuate", translation: "fluctuar", example: "Prices fluctuate a lot." },
    { id: "c1dt-9", term: "proportion", translation: "proporcion", example: "A large proportion agreed." },
    { id: "c1dt-10", term: "figure", translation: "cifra", example: "The figures are impressive." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1dt-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: leyendo los datos",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "The report shows a clear trend. The more people used the app, the faster sales increased. " +
          "Numbers peaked in June, then declined slowly. The higher the price, the lower the demand. " +
          "There was a steady rise in a significant proportion of users. Figures fluctuated in winter, " +
          "but overall the growth rate stayed strong. In short, the better the service, the more loyal " +
          "the customers became.",
        keyPhrases: [
          "Fijate en los dobles comparativos: The more..., the faster...; The higher..., the lower...",
          "Expresan que dos cosas cambian juntas (proporcion).",
        ],
        check: [
          { prompt: "What happened as more people used the app?", choices: ["Sales increased faster", "Sales fell", "Nothing"], answer: 0 },
          { prompt: "When did numbers peak?", choices: ["June", "December", "March"], answer: 0 },
          { prompt: "What happens when the price is higher?", choices: ["Demand is lower", "Demand rises", "No change"], answer: 0 },
          { prompt: "What made customers more loyal?", choices: ["Better service", "Higher prices", "Less choice"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1dt-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: datos y tendencias",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "trend / rate", translation: "tendencia / tasa" },
        { term: "to increase / to decline", translation: "aumentar / disminuir" },
        { term: "to peak / to fluctuate", translation: "alcanzar el maximo / fluctuar" },
        { term: "steady", translation: "constante" },
        { term: "significant / proportion", translation: "significativo / proporcion" },
        { term: "figure", translation: "cifra" },
      ],
      activities: [
        {
          id: "c1dt-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "trend", right: "tendencia" },
            { left: "rate", right: "tasa" },
            { left: "figure", right: "cifra" },
          ] },
        },
        {
          id: "c1dt-vocab-a2", type: "cloze",
          prompt: "Completa: 'Sales ___ in June.' (alcanzar el maximo -> pasado)",
          payload: { answer: "peaked" },
          explain: "'To peak' = alcanzar el maximo; pasado: peaked.",
        },
        {
          id: "c1dt-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'disminuir'?",
          payload: { choices: ["to increase", "to decline", "to peak"], answer: 1 },
          explain: "'To decline' = disminuir.",
        },
        {
          id: "c1dt-vocab-a4", type: "cloze",
          prompt: "Completa: 'A ___ increase.' (constante)",
          payload: { answer: "steady" },
          explain: "'Steady' = constante.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1dt-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: dobles comparativos",
      intro: "Competencia de GRAMATICA. Aprende 'the more..., the more...'.",
      grammar: {
        title: "Double comparatives",
        form: "The + comparativo + ..., the + comparativo + ...",
        examples: ["The more you practise, the better you get.", "The higher the price, the lower the demand."],
        mistakes: [
          { wrong: "More you practise, more you improve.", right: "The more you practise, the more you improve." },
          { wrong: "The more high the price, the more low the demand.", right: "The higher the price, the lower the demand." },
        ],
      },
      activities: [
        {
          id: "c1dt-gram-a1", type: "cloze",
          prompt: "Completa: 'The more you practise, ___ better you get.' (the?)",
          payload: { answer: "the" },
          explain: "Estructura: The more..., THE better...",
        },
        {
          id: "c1dt-gram-a2", type: "cloze",
          prompt: "Completa: 'The higher the price, the ___ the demand.' (low -> comparativo)",
          payload: { answer: "lower" },
          explain: "Comparativo de low = lower.",
        },
        {
          id: "c1dt-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct double comparative:",
          payload: { choices: [
            "The more, the merrier.",
            "More, merrier.",
            "The most, the merriest.",
          ], answer: 0 },
          explain: "'The more, the merrier' es la forma correcta (dobles comparativos).",
        },
        {
          id: "c1dt-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "The", "practise,", "more", "you", "better", "the", "you", "get"], answer: ["The", "more", "you", "practise,", "the", "better", "you", "get"] },
          explain: "Orden: The + more + you + practise, + the + better + you + get.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1dt-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: resume unos datos",
      intro: "Competencia de ESCRITURA. Construye frases sobre tendencias. Ordena cada frase.",
      activities: [
        {
          id: "c1dt-write-a1", type: "word_bank",
          prompt: "Di: cuanto mas practicas, mejor te vuelves:",
          payload: { words: ["the", "The", "practise,", "more", "you", "better", "the", "you", "get"], answer: ["The", "more", "you", "practise,", "the", "better", "you", "get"] },
        },
        {
          id: "c1dt-write-a2", type: "word_bank",
          prompt: "Di que las ventas aumentaron bruscamente:",
          payload: { words: ["sharply", "Sales", "increased"], answer: ["Sales", "increased", "sharply"] },
        },
        {
          id: "c1dt-write-a3", type: "word_bank",
          prompt: "Di que las cifras son impresionantes:",
          payload: { words: ["impressive", "The", "are", "figures"], answer: ["The", "figures", "are", "impressive"] },
        },
        {
          id: "c1dt-write-a4", type: "multiple_choice",
          prompt: "Double comparatives express...",
          payload: { choices: ["one single fact", "two things changing together", "the past"], answer: 1 },
        },
      ],
    },
  ],
};
