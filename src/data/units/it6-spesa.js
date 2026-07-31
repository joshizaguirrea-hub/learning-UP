/**
 * data/units/it6-spesa.js — Unita A1 italiano "Fare la spesa" (numeri + volere).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT6_SPESA = {
  id: "it6-spesa",
  language: "it",
  level: "A1",
  title: "Fare la spesa",
  subtitle: "Comprar: numeros, precios, 'questo/quello' y el verbo 'volere'",

  cando: [
    "Puedo usar los numeros y preguntar 'quanto costa?'.",
    "Puedo pedir cosas con 'voglio / vorrei'.",
    "Puedo usar 'questo/quello' (este/ese).",
    "Puedo hacer una compra sencilla en una tienda.",
  ],

  vocab: [
    { id: "it6s-1", term: "il negozio", translation: "la tienda", example: "Il negozio e aperto." },
    { id: "it6s-2", term: "il supermercato", translation: "el supermercado", example: "Vado al supermercato." },
    { id: "it6s-3", term: "il mercato", translation: "el mercado", example: "Il mercato e il sabato." },
    { id: "it6s-4", term: "i soldi", translation: "el dinero", example: "Non ho soldi." },
    { id: "it6s-5", term: "l'euro", translation: "el euro", example: "Costa cinque euro." },
    { id: "it6s-6", term: "quanto costa?", translation: "cuanto cuesta?", example: "Quanto costa il pane?" },
    { id: "it6s-7", term: "caro", translation: "caro", example: "E' troppo caro." },
    { id: "it6s-8", term: "economico", translation: "barato/economico", example: "E' molto economico." },
    { id: "it6s-9", term: "comprare", translation: "comprar", example: "Voglio comprare il pane." },
    { id: "it6s-10", term: "il conto", translation: "la cuenta", example: "Il conto, per favore." },
    { id: "it6s-11", term: "un chilo di", translation: "un kilo de", example: "Un chilo di mele." },
    { id: "it6s-12", term: "un po' di", translation: "un poco de", example: "Un po' di formaggio." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it6s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: al mercato",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - La spesa di Marco\n" +
          "Oggi Marco va al mercato. Vuole comprare frutta e verdura. Compra un chilo di mele e un po' di pomodori. " +
          "Le mele costano tre euro, i pomodori due euro. Marco vuole anche il pane, ma il negozio del pane e chiuso. " +
          "Al mercato tutto e fresco ed economico!\n\n" +
          "TESTO 2 - Al negozio\n" +
          "A: Buongiorno! Quanto costa questo formaggio? B: Sei euro al chilo. A: E quello? B: Quello costa otto euro, e piu caro. " +
          "A: Vorrei mezzo chilo di questo, per favore. B: Ecco a lei. Altro? A: No, grazie. Quant'e il conto? B: Tre euro.",
        glossary: [
          { term: "volere (voglio / vuole)", translation: "querer (quiero / quiere)" },
          { term: "vorrei", translation: "quisiera (cortes)" },
          { term: "questo / quello", translation: "este / ese-aquel" },
          { term: "quanto costa? / quant'e?", translation: "cuanto cuesta? / cuanto es?" },
          { term: "un chilo / mezzo chilo", translation: "un kilo / medio kilo" },
          { term: "piu caro / economico", translation: "mas caro / barato" },
          { term: "ecco a lei", translation: "aqui tiene (usted)" },
          { term: "altro?", translation: "algo mas?" },
        ],
        keyPhrases: [
          "Ojo: 'costa' (1 cosa) vs 'costano' (varias cosas).",
          "'Vorrei' es mas educado que 'voglio' para pedir.",
        ],
        check: [
          { prompt: "T1: Dove va Marco oggi?", choices: ["Al supermercato", "Al mercato", "Al ristorante"], answer: 1 },
          { prompt: "T1: Cosa compra Marco?", choices: ["Carne e pesce", "Mele e pomodori", "Pane e vino"], answer: 1 },
          { prompt: "T1: Perche non compra il pane?", choices: ["E' caro", "Il negozio e chiuso", "Non gli piace"], answer: 1 },
          { prompt: "T2: Quanto costa il primo formaggio?", choices: ["Sei euro", "Otto euro", "Tre euro"], answer: 0 },
          { prompt: "T2: Quale formaggio e piu caro?", choices: ["Questo", "Quello", "Costano uguale"], answer: 1 },
          { prompt: "T2: Quant'e il conto?", choices: ["Sei euro", "Otto euro", "Tre euro"], answer: 2 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it6s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: fare la spesa",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "il negozio / il mercato", translation: "la tienda / el mercado" },
        { term: "il supermercato", translation: "el supermercado" },
        { term: "i soldi / l'euro", translation: "el dinero / el euro" },
        { term: "quanto costa?", translation: "cuanto cuesta?" },
        { term: "caro / economico", translation: "caro / barato" },
        { term: "comprare / il conto", translation: "comprar / la cuenta" },
        { term: "un chilo di / un po' di", translation: "un kilo de / un poco de" },
        { term: "voglio / vorrei", translation: "quiero / quisiera" },
      ],
      activities: [
        {
          id: "it6s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "negozio", right: "tienda" },
            { left: "mercato", right: "mercado" },
            { left: "soldi", right: "dinero" },
            { left: "conto", right: "cuenta" },
          ] },
        },
        {
          id: "it6s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "caro", right: "caro" },
            { left: "economico", right: "barato" },
            { left: "comprare", right: "comprar" },
            { left: "chilo", right: "kilo" },
          ] },
        },
        {
          id: "it6s-vocab-a3", type: "cloze",
          prompt: "Completa: '___ costa il pane?' (cuanto)",
          payload: { answer: "Quanto", alt: ["quanto"] },
          explain: "'Quanto costa?' = cuanto cuesta?",
        },
        {
          id: "it6s-vocab-a4", type: "cloze",
          prompt: "Completa: 'Voglio ___ un chilo di mele.' (comprar)",
          payload: { answer: "comprare" },
          explain: "Tras 'voglio' -> infinitivo: 'comprare'.",
        },
        {
          id: "it6s-vocab-a5", type: "cloze",
          prompt: "Completa: 'E' troppo ___.' (caro)",
          payload: { answer: "caro" },
          explain: "'Caro' = caro.",
        },
        {
          id: "it6s-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'medio kilo'?",
          payload: { choices: ["un chilo", "mezzo chilo", "un po'"], answer: 1 },
          explain: "'Mezzo chilo' = medio kilo.",
        },
        {
          id: "it6s-vocab-a7", type: "multiple_choice",
          prompt: "Como pides algo educadamente?",
          payload: { choices: ["Voglio il pane!", "Vorrei il pane, per favore.", "Dammi il pane!"], answer: 1 },
          explain: "'Vorrei... per favore' es cortes.",
        },
        {
          id: "it6s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["costa", "Quanto", "formaggio", "il"], answer: ["Quanto", "costa", "il", "formaggio"] },
          explain: "'Quanto costa il formaggio?'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it6s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: numeri, 'questo/quello' e 'volere'",
      intro: "Competencia de GRAMATICA. Aprende los numeros, 'questo/quello' y el verbo 'volere'.",
      grammar: {
        title: "Numeri, 'questo/quello' e 'volere'",
        chart: {
          title: "VOLERE",
          maps: "querer",
          groups: [
            {
              label: "VOLERE", color: "violet",
              forms: [
                { form: "VOGLIO / VUOI", subjects: "io / tu" },
                { form: "VUOLE", subjects: "lui / lei" },
                { form: "VOGLIAMO", subjects: "noi" },
                { form: "VOLETE / VOGLIONO", subjects: "voi / loro" },
              ],
            },
            {
              label: "QUESTO / QUELLO", color: "sky",
              forms: [
                { form: "QUESTO / QUESTA", subjects: "este / esta" },
                { form: "QUESTI / QUESTE", subjects: "estos / estas" },
                { form: "QUELLO / QUELLA", subjects: "ese / esa" },
              ],
            },
          ],
        },
        form: "*voglio* + infinitivo / *questo* + nome",
        desc: "'Volere' = querer (voglio, vuoi, vuole...). Tras 'voglio' va un INFINITIVO (voglio comprare) o un nombre (voglio il pane). 'Questo' (este) y 'quello' (ese) concuerdan en genero y numero.",
        rule: "Volere: io voglio, tu vuoi, lui/lei vuole, noi vogliamo, voi volete, loro vogliono. 'Vorrei' = quisiera (mas cortes). Demostrativos: questo/questa (este/esta), questi/queste (estos/estas), quello/quella (ese/esa). Numeri: uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci. Precios: 'costa' (1 cosa) / 'costano' (varias).",
        examples: ["Voglio comprare il pane.", "Quanto costano le mele?", "Vorrei questo formaggio.", "Quello e piu caro."],
        explain: { tr: ["Quiero comprar el pan.", "Cuanto cuestan las manzanas?", "Quisiera este queso.", "Ese es mas caro."] },
        mistakes: [
          { wrong: "Io volo il pane.", right: "Io voglio il pane." },
          { wrong: "Quanto costano il pane?", right: "Quanto costa il pane?" },
          { wrong: "Voglio compro il pane.", right: "Voglio comprare il pane." },
        ],
      },
      activities: [
        {
          id: "it6s-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ un caffe.' (querer)",
          payload: { answer: "voglio" },
          explain: "io -> 'voglio'.",
        },
        {
          id: "it6s-gram-a2", type: "cloze",
          prompt: "Completa: 'Tu ___ comprare il pane?' (querer)",
          payload: { answer: "vuoi" },
          explain: "tu -> 'vuoi'.",
        },
        {
          id: "it6s-gram-a3", type: "cloze",
          prompt: "Completa: 'Quanto ___ le mele?' (costar, plural)",
          payload: { answer: "costano" },
          explain: "Varias cosas -> 'costano'.",
        },
        {
          id: "it6s-gram-a4", type: "cloze",
          prompt: "Completa: 'Vorrei ___ formaggio.' (este)",
          payload: { answer: "questo" },
          explain: "Masc. sing. -> 'questo'.",
        },
        {
          id: "it6s-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Noi vogliono il pane.", "Noi vogliamo il pane.", "Noi voglio il pane."], answer: 1 },
          explain: "noi -> 'vogliamo'.",
        },
        {
          id: "it6s-gram-a6", type: "multiple_choice",
          prompt: "Como dices 'ese es mas caro'?",
          payload: { choices: ["Questo e piu caro.", "Quello e piu caro.", "Quella e piu caro."], answer: 1 },
          explain: "Ese (masc.) -> 'quello'.",
        },
        {
          id: "it6s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["comprare", "Voglio", "pane", "il"], answer: ["Voglio", "comprare", "il", "pane"] },
          explain: "'Voglio comprare il pane'.",
        },
        {
          id: "it6s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["costano", "Quanto", "mele", "le"], answer: ["Quanto", "costano", "le", "mele"] },
          explain: "'Quanto costano le mele?'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it6s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: fai la spesa",
      intro: "Competencia de ESCRITURA. Haz una compra, frase por frase.",
      activities: [
        {
          id: "it6s-write-a1", type: "word_bank",
          prompt: "1. Di que quieres comprar pan:",
          payload: { words: ["comprare", "Voglio", "pane", "il"], answer: ["Voglio", "comprare", "il", "pane"] },
        },
        {
          id: "it6s-write-a2", type: "word_bank",
          prompt: "2. Pregunta cuanto cuesta el queso:",
          payload: { words: ["costa", "Quanto", "formaggio", "il"], answer: ["Quanto", "costa", "il", "formaggio"] },
        },
        {
          id: "it6s-write-a3", type: "word_bank",
          prompt: "3. Pide (cortes) este queso:",
          payload: { words: ["questo", "Vorrei", "formaggio"], answer: ["Vorrei", "questo", "formaggio"] },
        },
        {
          id: "it6s-write-a4", type: "word_bank",
          prompt: "4. Di que ese es muy caro:",
          payload: { words: ["troppo", "Quello", "caro", "e"], answer: ["Quello", "e", "troppo", "caro"] },
        },
        {
          id: "it6s-write-a5", type: "word_bank",
          prompt: "5. Pide un kilo de manzanas:",
          payload: { words: ["mele", "Un", "di", "chilo"], answer: ["Un", "chilo", "di", "mele"] },
        },
        {
          id: "it6s-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Io voglio il pane.", "Io volo il pane.", "Io vuoi il pane."], answer: 0 },
        },
        {
          id: "it6s-write-a7", type: "multiple_choice",
          prompt: "7. 'cuanto cuestan las manzanas?' es...",
          payload: { choices: ["Quanto costa le mele?", "Quanto costano le mele?", "Quanto costi le mele?"], answer: 1 },
        },
        {
          id: "it6s-write-a8", type: "multiple_choice",
          prompt: "8. 'estos tomates' se dice...",
          payload: { choices: ["questo pomodori", "questi pomodori", "queste pomodori"], answer: 1 },
        },
      ],
    },
  ],
};
