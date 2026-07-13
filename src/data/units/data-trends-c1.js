/**
 * data/units/data-trends-c1.js — Unidad tematica "Data & trends" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: double comparatives.
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
    { id: "c1dt-11", term: "to double", translation: "duplicar", example: "Profits doubled last year." },
    { id: "c1dt-12", term: "overall", translation: "en general", example: "Overall, sales grew." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1dt-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: leyendo los datos",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - The report\n" +
          "The report shows a clear trend. The more people used the app, the faster sales increased. " +
          "Numbers peaked in June, then declined slowly. The higher the price, the lower the demand. There " +
          "was a steady rise in a significant proportion of users. Overall, the growth rate stayed " +
          "strong.\n\n" +
          "TEXT 2 - Explaining a graph\n" +
          "A: What does the graph show? B: The more we invested, the more profits grew. A: Impressive! B: " +
          "In fact, profits doubled. A: And costs? B: The bigger the team, the higher the costs, but " +
          "overall it was worth it. A: So the figures are positive? B: Very positive.",
        glossary: [
          { term: "The more..., the faster...", translation: "Cuanto mas..., mas rapido..." },
          { term: "The higher..., the lower...", translation: "Cuanto mas alto..., mas bajo..." },
          { term: "to peak / to decline", translation: "alcanzar el maximo / disminuir" },
          { term: "steady / significant", translation: "constante / significativo" },
          { term: "proportion / rate", translation: "proporcion / tasa" },
          { term: "to double / figure", translation: "duplicar / cifra" },
          { term: "overall", translation: "en general" },
          { term: "to fluctuate", translation: "fluctuar" },
        ],
        keyPhrases: [
          "Fijate en los dobles comparativos: The more..., the faster...; The higher..., the lower...",
          "Expresan que dos cosas cambian juntas (proporcion).",
        ],
        check: [
          { prompt: "T1: What happened as more people used the app?", choices: ["Sales increased faster", "Sales fell", "Nothing"], answer: 0 },
          { prompt: "T1: When did numbers peak?", choices: ["June", "December", "March"], answer: 0 },
          { prompt: "T1: What happens when the price is higher?", choices: ["Demand is lower", "Demand rises", "No change"], answer: 0 },
          { prompt: "T2: What happened as they invested more?", choices: ["Profits grew more", "Profits fell", "Nothing"], answer: 0 },
          { prompt: "T2: What did profits do?", choices: ["Doubled", "Halved", "Disappeared"], answer: 0 },
          { prompt: "T2: Are the figures positive?", choices: ["Yes, very", "No", "Not sure"], answer: 0 },
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
        { term: "steady / significant", translation: "constante / significativo" },
        { term: "proportion / figure", translation: "proporcion / cifra" },
        { term: "to double / overall", translation: "duplicar / en general" },
      ],
      activities: [
        {
          id: "c1dt-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "trend", right: "tendencia" },
            { left: "rate", right: "tasa" },
            { left: "figure", right: "cifra" },
            { left: "proportion", right: "proporcion" },
          ] },
        },
        {
          id: "c1dt-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to increase", right: "aumentar" },
            { left: "to decline", right: "disminuir" },
            { left: "to double", right: "duplicar" },
            { left: "steady", right: "constante" },
          ] },
        },
        {
          id: "c1dt-vocab-a3", type: "cloze",
          prompt: "Completa: 'Sales ___ in June.' (alcanzar el maximo -> pasado)",
          payload: { answer: "peaked" },
          explain: "'To peak' = alcanzar el maximo; pasado: peaked.",
        },
        {
          id: "c1dt-vocab-a4", type: "cloze",
          prompt: "Completa: 'A ___ increase.' (constante)",
          payload: { answer: "steady" },
          explain: "'Steady' = constante.",
        },
        {
          id: "c1dt-vocab-a5", type: "cloze",
          prompt: "Completa: 'Profits ___ last year.' (duplicar -> pasado)",
          payload: { answer: "doubled" },
          explain: "'To double' = duplicar; pasado: doubled.",
        },
        {
          id: "c1dt-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'disminuir'?",
          payload: { choices: ["to increase", "to decline", "to peak"], answer: 1 },
          explain: "'To decline' = disminuir.",
        },
        {
          id: "c1dt-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'en general'?",
          payload: { choices: ["overall", "steady", "figure"], answer: 0 },
          explain: "'Overall' = en general.",
        },
        {
          id: "c1dt-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sharply", "Sales", "increased"], answer: ["Sales", "increased", "sharply"] },
          explain: "'Sales increased sharply' = las ventas subieron bruscamente.",
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
        explain: { tr: ["Cuanto m\u00e1s practicas, mejor te vuelves.", "Cuanto m\u00e1s alto el precio, menor la demanda."] },
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
          explain: "'The more, the merrier' es la forma correcta.",
        },
        {
          id: "c1dt-gram-a4", type: "multiple_choice",
          prompt: "Double comparatives express...",
          payload: { choices: ["one single fact", "two things changing together", "the past"], answer: 1 },
          explain: "Expresan que dos cosas cambian juntas.",
        },
        {
          id: "c1dt-gram-a5", type: "cloze",
          prompt: "Completa: 'The bigger the team, the ___ the costs.' (high -> comparativo)",
          payload: { answer: "higher" },
          explain: "Comparativo de high = higher.",
        },
        {
          id: "c1dt-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "The", "practise,", "more", "you", "better", "you", "get"], answer: ["The", "more", "you", "practise,", "the", "better", "you", "get"] },
          explain: "The + more + you + practise, + the + better + you + get.",
        },
        {
          id: "c1dt-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "The", "invested,", "more", "we", "grew", "profits", "more"], answer: ["The", "more", "we", "invested,", "the", "more", "profits", "grew"] },
          explain: "The + more + we + invested, + the + more + profits + grew.",
        },
        {
          id: "c1dt-gram-a8", type: "cloze",
          prompt: "Completa: 'The ___ you learn, the more you know.' (much -> comparativo)",
          payload: { answer: "more" },
          explain: "Comparativo de much = more.",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre tendencias.",
      activities: [
        {
          id: "c1dt-write-a1", type: "word_bank",
          prompt: "1. Di: cuanto mas practicas, mejor te vuelves:",
          payload: { words: ["the", "The", "practise,", "more", "you", "better", "you", "get"], answer: ["The", "more", "you", "practise,", "the", "better", "you", "get"] },
        },
        {
          id: "c1dt-write-a2", type: "word_bank",
          prompt: "2. Di que las ventas aumentaron bruscamente:",
          payload: { words: ["sharply", "Sales", "increased"], answer: ["Sales", "increased", "sharply"] },
        },
        {
          id: "c1dt-write-a3", type: "word_bank",
          prompt: "3. Di que las cifras son impresionantes:",
          payload: { words: ["impressive", "The", "are", "figures"], answer: ["The", "figures", "are", "impressive"] },
        },
        {
          id: "c1dt-write-a4", type: "word_bank",
          prompt: "4. Di que las ganancias se duplicaron:",
          payload: { words: ["doubled", "Profits", "year", "last"], answer: ["Profits", "doubled", "last", "year"] },
        },
        {
          id: "c1dt-write-a5", type: "word_bank",
          prompt: "5. Di que en general las ventas crecieron:",
          payload: { words: ["grew", "Overall,", "sales"], answer: ["Overall,", "sales", "grew"] },
        },
        {
          id: "c1dt-write-a6", type: "multiple_choice",
          prompt: "6. Double comparatives express...",
          payload: { choices: ["one single fact", "two things changing together", "the past"], answer: 1 },
        },
        {
          id: "c1dt-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["More you eat, more you gain.", "The more you eat, the more you gain.", "The more eat, more gain."], answer: 1 },
        },
        {
          id: "c1dt-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'alcanzar el maximo'?",
          payload: { choices: ["to peak", "to decline", "to double"], answer: 0 },
        },
      ],
    },
  ],
};
