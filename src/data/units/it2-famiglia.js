/**
 * data/units/it2-famiglia.js — Unita A1 italiano "La famiglia" (possessivi + AVERE).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT2_FAMIGLIA = {
  id: "it2-famiglia",
  language: "it",
  level: "A1",
  title: "La famiglia",
  subtitle: "Hablar de tu familia con posesivos y el verbo 'avere'",

  cando: [
    "Puedo hablar de los miembros de mi familia.",
    "Puedo usar posesivos (mio/mia, tuo/tua).",
    "Puedo usar el verbo 'avere' (tener) en presente.",
    "Puedo decir cuantos hermanos o hijos tengo.",
  ],

  vocab: [
    { id: "it2f-1", term: "famiglia", translation: "familia", example: "Questa e la mia famiglia." },
    { id: "it2f-2", term: "padre", translation: "padre", example: "Mio padre e medico." },
    { id: "it2f-3", term: "madre", translation: "madre", example: "Mia madre e insegnante." },
    { id: "it2f-4", term: "fratello", translation: "hermano", example: "Ho un fratello piccolo." },
    { id: "it2f-5", term: "sorella", translation: "hermana", example: "Mia sorella si chiama Giulia." },
    { id: "it2f-6", term: "figlio", translation: "hijo", example: "Loro hanno un figlio." },
    { id: "it2f-7", term: "figlia", translation: "hija", example: "La mia figlia e piccola." },
    { id: "it2f-8", term: "nonno/nonna", translation: "abuelo/a", example: "Mio nonno ha ottant'anni." },
    { id: "it2f-9", term: "marito", translation: "esposo/marido", example: "Suo marito e simpatico." },
    { id: "it2f-10", term: "moglie", translation: "esposa/mujer", example: "Sua moglie e italiana." },
    { id: "it2f-11", term: "genitori", translation: "padres (los)", example: "I miei genitori sono gentili." },
    { id: "it2f-12", term: "cane/gatto", translation: "perro/gato", example: "Abbiamo un cane." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it2f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la mia famiglia",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - La famiglia di Marco\n" +
          "Ciao! Mi chiamo Marco. Questa e la mia famiglia. Ho una sorella e un fratello. " +
          "Mia sorella si chiama Giulia ed e studentessa. Mio fratello si chiama Luca ed e piccolo. " +
          "Mio padre e medico e mia madre e insegnante. Abbiamo un cane. Siamo una famiglia felice!\n\n" +
          "TESTO 2 - Una domanda\n" +
          "A: Hai fratelli? B: Si, ho due fratelli. E tu? A: Io ho una sorella. " +
          "Come si chiama tua sorella? B: Si chiama Anna. I miei genitori hanno tre figli. " +
          "A: Che bella famiglia!",
        glossary: [
          { term: "ho / hai", translation: "tengo / tienes" },
          { term: "abbiamo / hanno", translation: "tenemos / tienen" },
          { term: "mio padre / mia madre", translation: "mi padre / mi madre (sin articulo)" },
          { term: "mia sorella / mio fratello", translation: "mi hermana / mi hermano" },
          { term: "i miei genitori", translation: "mis padres" },
          { term: "si chiama", translation: "se llama" },
          { term: "ed e", translation: "y es" },
          { term: "che bella famiglia!", translation: "que linda familia!" },
        ],
        keyPhrases: [
          "Cuenta cuantos hermanos tiene cada persona.",
          "Fijate: con familiares en singular NO se usa articulo (mio padre).",
        ],
        check: [
          { prompt: "T1: Quanti fratelli ha Marco?", choices: ["Uno", "Due", "Tre"], answer: 1 },
          { prompt: "T1: Come si chiama la sorella di Marco?", choices: ["Anna", "Giulia", "Luca"], answer: 1 },
          { prompt: "T1: Qual e la professione della madre?", choices: ["Medico", "Insegnante", "Studentessa"], answer: 1 },
          { prompt: "T1: Che animale ha la famiglia?", choices: ["Un gatto", "Un cane", "Un uccello"], answer: 1 },
          { prompt: "T2: Quanti fratelli ha la persona B?", choices: ["Uno", "Due", "Tre"], answer: 1 },
          { prompt: "T2: Quanti figli hanno i genitori di B?", choices: ["Due", "Tre", "Quattro"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it2f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: membri della famiglia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "famiglia", translation: "familia" },
        { term: "padre / madre", translation: "padre / madre" },
        { term: "fratello / sorella", translation: "hermano / hermana" },
        { term: "figlio / figlia", translation: "hijo / hija" },
        { term: "nonno / nonna", translation: "abuelo / abuela" },
        { term: "marito / moglie", translation: "esposo / esposa" },
        { term: "genitori", translation: "padres (los)" },
        { term: "cane / gatto", translation: "perro / gato" },
      ],
      activities: [
        {
          id: "it2f-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "padre", right: "padre" },
            { left: "madre", right: "madre" },
            { left: "fratello", right: "hermano" },
            { left: "sorella", right: "hermana" },
          ] },
        },
        {
          id: "it2f-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "figlio", right: "hijo" },
            { left: "nonna", right: "abuela" },
            { left: "moglie", right: "esposa" },
            { left: "genitori", right: "padres" },
          ] },
        },
        {
          id: "it2f-vocab-a3", type: "cloze",
          prompt: "Completa: 'Mia ___ si chiama Giulia.' (hermana)",
          payload: { answer: "sorella" },
          explain: "'Sorella' = hermana.",
        },
        {
          id: "it2f-vocab-a4", type: "cloze",
          prompt: "Completa: 'Mio ___ e medico.' (padre)",
          payload: { answer: "padre" },
          explain: "'Padre' = padre.",
        },
        {
          id: "it2f-vocab-a5", type: "cloze",
          prompt: "Completa: 'I miei ___ sono gentili.' (padres)",
          payload: { answer: "genitori" },
          explain: "'Genitori' = padres (los dos).",
        },
        {
          id: "it2f-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'esposa'?",
          payload: { choices: ["marito", "moglie", "figlia"], answer: 1 },
          explain: "'Moglie' = esposa; 'marito' = esposo.",
        },
        {
          id: "it2f-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'abuelo'?",
          payload: { choices: ["nonno", "nonna", "nipote"], answer: 0 },
          explain: "'Nonno' = abuelo; 'nonna' = abuela.",
        },
        {
          id: "it2f-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["famiglia", "una", "Ho", "grande"], answer: ["Ho", "una", "famiglia", "grande"] },
          explain: "'Ho una famiglia grande' = tengo una familia grande.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it2f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: possessivi + verbo 'avere'",
      intro: "Competencia de GRAMATICA. Aprende mio/mia, tuo/tua y el verbo 'avere'.",
      grammar: {
        title: "Possessivi e il verbo 'avere'",
        chart: {
          title: "AVERE",
          maps: "TENER + posesivos",
          groups: [
            {
              label: "AVERE (presente)", color: "amber",
              forms: [
                { form: "HO", subjects: "io" },
                { form: "HAI", subjects: "tu" },
                { form: "HA", subjects: "lui, lei" },
                { form: "ABBIAMO", subjects: "noi" },
                { form: "AVETE", subjects: "voi" },
                { form: "HANNO", subjects: "loro" },
              ],
            },
            {
              label: "POSSESSIVI", color: "sky",
              forms: [
                { form: "MIO / MIA", subjects: "mi (masc. / fem.)" },
                { form: "TUO / TUA", subjects: "tu (masc. / fem.)" },
              ],
            },
          ],
        },
        form: "io *ho* / *mio* padre / *mia* madre / *i miei* genitori",
        desc: "El posesivo concuerda con lo POSEIDO. Con familiares en SINGULAR va SIN articulo (mio padre); en plural SI (i miei genitori).",
        rule: "El verbo 'avere' = tener: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno (la 'h' es MUDA). Posesivos: mio/mia, tuo/tua concuerdan con la cosa poseida. Regla especial: familiar en singular SIN articulo (mio fratello); plural o con otras cosas CON articulo (i miei fratelli, la mia casa).",
        examples: ["Io ho una sorella.", "Mio padre e medico.", "La mia casa e grande.", "Loro hanno due figli."],
        explain: { tr: ["Yo tengo una hermana.", "Mi padre es medico.", "Mi casa es grande.", "Ellos tienen dos hijos."] },
        mistakes: [
          { wrong: "Io ha una sorella.", right: "Io ho una sorella." },
          { wrong: "Il mio padre e medico.", right: "Mio padre e medico." },
          { wrong: "Loro ha due figli.", right: "Loro hanno due figli." },
        ],
      },
      activities: [
        {
          id: "it2f-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ un fratello.' (tengo)",
          payload: { answer: "ho" },
          explain: "Con 'io' -> 'ho' (h muda).",
        },
        {
          id: "it2f-gram-a2", type: "cloze",
          prompt: "Completa: 'Noi ___ una casa grande.' (tenemos)",
          payload: { answer: "abbiamo" },
          explain: "Con 'noi' -> 'abbiamo'.",
        },
        {
          id: "it2f-gram-a3", type: "cloze",
          prompt: "Completa: '___ madre e insegnante.' (mi, fem., sin articulo)",
          payload: { answer: "mia" },
          explain: "Familiar singular: 'mia madre' (sin articulo).",
        },
        {
          id: "it2f-gram-a4", type: "cloze",
          prompt: "Completa: '___ padre lavora molto.' (mi, masc., sin articulo)",
          payload: { answer: "mio" },
          explain: "Familiar singular: 'mio padre' (sin articulo).",
        },
        {
          id: "it2f-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Loro ha due figli.", "Loro hanno due figli.", "Loro ho due figli."], answer: 1 },
          explain: "Con 'loro' -> 'hanno'.",
        },
        {
          id: "it2f-gram-a6", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Il mio fratello e alto.", "Mio fratello e alto.", "Mia fratello e alto."], answer: 1 },
          explain: "Familiar singular SIN articulo: 'mio fratello'.",
        },
        {
          id: "it2f-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["padre", "Mio", "medico", "e"], answer: ["Mio", "padre", "e", "medico"] },
          explain: "Orden: Mio + padre + e + medico.",
        },
        {
          id: "it2f-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["figli", "hanno", "due", "Loro"], answer: ["Loro", "hanno", "due", "figli"] },
          explain: "Orden: Loro + hanno + due + figli.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it2f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: descrivi la tua famiglia",
      intro: "Competencia de ESCRITURA. Describe tu familia, frase por frase.",
      activities: [
        {
          id: "it2f-write-a1", type: "word_bank",
          prompt: "1. Di como es tu familia:",
          payload: { words: ["famiglia", "La", "e", "mia", "grande"], answer: ["La", "mia", "famiglia", "e", "grande"] },
        },
        {
          id: "it2f-write-a2", type: "word_bank",
          prompt: "2. Di cuantos hermanos tienes:",
          payload: { words: ["due", "Ho", "fratelli"], answer: ["Ho", "due", "fratelli"] },
        },
        {
          id: "it2f-write-a3", type: "word_bank",
          prompt: "3. Habla de tu padre:",
          payload: { words: ["padre", "Mio", "lavora"], answer: ["Mio", "padre", "lavora"] },
        },
        {
          id: "it2f-write-a4", type: "word_bank",
          prompt: "4. Habla de tu madre:",
          payload: { words: ["madre", "insegnante", "Mia", "e"], answer: ["Mia", "madre", "e", "insegnante"] },
        },
        {
          id: "it2f-write-a5", type: "word_bank",
          prompt: "5. Habla de tus padres:",
          payload: { words: ["miei", "gentili", "I", "genitori", "sono"], answer: ["I", "miei", "genitori", "sono", "gentili"] },
        },
        {
          id: "it2f-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Il mio madre e alta.", "Mia madre e alta.", "Mio madre e alta."], answer: 1 },
        },
        {
          id: "it2f-write-a7", type: "multiple_choice",
          prompt: "7. Como preguntas si tiene hermanos?",
          payload: { choices: ["Hai fratelli?", "Sei fratelli?", "Hanno fratelli?"], answer: 0 },
        },
        {
          id: "it2f-write-a8", type: "multiple_choice",
          prompt: "8. Cual es 'mis padres'?",
          payload: { choices: ["mio genitori", "i miei genitori", "la mia genitori"], answer: 1 },
        },
      ],
    },
  ],
};
