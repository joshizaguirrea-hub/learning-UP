/**
 * data/units/it3-routine.js — Unita A1 italiano "La routine" (presente -ARE + frequenza).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT3_ROUTINE = {
  id: "it3-routine",
  language: "it",
  level: "A1",
  title: "La routine",
  subtitle: "Contar tu dia a dia con verbos en '-are' y adverbios de frecuencia",

  cando: [
    "Puedo describir mi rutina diaria.",
    "Puedo conjugar verbos regulares en '-are' en presente.",
    "Puedo usar adverbios de frecuencia (sempre, spesso, mai).",
    "Puedo decir a que hora hago las cosas.",
  ],

  vocab: [
    { id: "it3r-1", term: "svegliarsi (mi sveglio)", translation: "despertarse (me despierto)", example: "Mi sveglio alle sette." },
    { id: "it3r-2", term: "fare colazione", translation: "desayunar", example: "Faccio colazione alle otto." },
    { id: "it3r-3", term: "lavorare", translation: "trabajar", example: "Lavoro in un ufficio." },
    { id: "it3r-4", term: "studiare", translation: "estudiar", example: "Studio l'italiano." },
    { id: "it3r-5", term: "mangiare", translation: "comer", example: "Mangio alle tredici." },
    { id: "it3r-6", term: "guardare la TV", translation: "ver la tele", example: "La sera guardo la TV." },
    { id: "it3r-7", term: "la mattina", translation: "la manana", example: "La mattina bevo un caffe." },
    { id: "it3r-8", term: "la sera", translation: "la tarde/noche", example: "La sera sono stanco." },
    { id: "it3r-9", term: "sempre", translation: "siempre", example: "Mangio sempre alle otto." },
    { id: "it3r-10", term: "spesso", translation: "a menudo", example: "Spesso lavoro molto." },
    { id: "it3r-11", term: "di solito", translation: "normalmente", example: "Di solito mi sveglio presto." },
    { id: "it3r-12", term: "mai", translation: "nunca", example: "Non guardo mai la TV la mattina." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it3r-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una giornata normale",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - La giornata di Sofia\n" +
          "Mi chiamo Sofia. Di solito mi sveglio alle sette. La mattina faccio colazione e bevo un caffe. " +
          "Poi lavoro in un ufficio. Mangio alle tredici con i colleghi. La sera studio l'italiano e " +
          "spesso guardo la TV. Non mangio mai tardi. Vado a letto alle undici.\n\n" +
          "TESTO 2 - Due amici\n" +
          "A: A che ora ti svegli? B: Mi sveglio alle sei, sempre presto. E tu? A: Io mi sveglio alle otto. " +
          "Lavori la mattina? B: Si, lavoro e poi studio. A: Anch'io studio la sera!",
        glossary: [
          { term: "mi sveglio", translation: "me despierto" },
          { term: "di solito", translation: "normalmente" },
          { term: "poi", translation: "despues/luego" },
          { term: "a che ora?", translation: "a que hora?" },
          { term: "presto / tardi", translation: "temprano / tarde" },
          { term: "vado a letto", translation: "me voy a la cama" },
          { term: "anch'io", translation: "yo tambien" },
          { term: "spesso / mai", translation: "a menudo / nunca" },
        ],
        keyPhrases: [
          "Fijate en la HORA de cada actividad.",
          "Los adverbios de frecuencia (sempre, spesso, mai) dan el ritmo del dia.",
        ],
        check: [
          { prompt: "T1: A che ora si sveglia Sofia?", choices: ["Alle sei", "Alle sette", "Alle otto"], answer: 1 },
          { prompt: "T1: Cosa beve la mattina?", choices: ["Un te", "Un caffe", "Un succo"], answer: 1 },
          { prompt: "T1: A che ora mangia?", choices: ["Alle dodici", "Alle tredici", "Alle quattordici"], answer: 1 },
          { prompt: "T1: Cosa fa la sera?", choices: ["Lavora", "Studia italiano", "Dorme subito"], answer: 1 },
          { prompt: "T2: A che ora si sveglia la persona B?", choices: ["Alle sei", "Alle sette", "Alle otto"], answer: 0 },
          { prompt: "T2: Quando studia la persona A?", choices: ["La mattina", "La sera", "Mai"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it3r-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: routine e frequenza",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "svegliarsi", translation: "despertarse" },
        { term: "fare colazione", translation: "desayunar" },
        { term: "lavorare / studiare", translation: "trabajar / estudiar" },
        { term: "mangiare", translation: "comer" },
        { term: "la mattina / la sera", translation: "la manana / la tarde-noche" },
        { term: "sempre / spesso", translation: "siempre / a menudo" },
        { term: "di solito", translation: "normalmente" },
        { term: "mai", translation: "nunca" },
      ],
      activities: [
        {
          id: "it3r-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "lavorare", right: "trabajar" },
            { left: "studiare", right: "estudiar" },
            { left: "mangiare", right: "comer" },
            { left: "svegliarsi", right: "despertarse" },
          ] },
        },
        {
          id: "it3r-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "sempre", right: "siempre" },
            { left: "spesso", right: "a menudo" },
            { left: "mai", right: "nunca" },
            { left: "la mattina", right: "la manana" },
          ] },
        },
        {
          id: "it3r-vocab-a3", type: "cloze",
          prompt: "Completa: 'La mattina faccio ___.' (desayuno -> colazione)",
          payload: { answer: "colazione" },
          explain: "'Fare colazione' = desayunar.",
        },
        {
          id: "it3r-vocab-a4", type: "cloze",
          prompt: "Completa: 'Mi ___ alle sette.' (despierto)",
          payload: { answer: "sveglio" },
          explain: "'Mi sveglio' = me despierto.",
        },
        {
          id: "it3r-vocab-a5", type: "cloze",
          prompt: "Completa: 'Non guardo ___ la TV la mattina.' (nunca)",
          payload: { answer: "mai" },
          explain: "'Non... mai' = nunca (doble negacion en italiano).",
        },
        {
          id: "it3r-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'normalmente'?",
          payload: { choices: ["sempre", "di solito", "mai"], answer: 1 },
          explain: "'Di solito' = normalmente.",
        },
        {
          id: "it3r-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'la tarde/noche'?",
          payload: { choices: ["la mattina", "la sera", "il giorno"], answer: 1 },
          explain: "'La sera' = la tarde-noche.",
        },
        {
          id: "it3r-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sempre", "alle", "Mangio", "otto"], answer: ["Mangio", "sempre", "alle", "otto"] },
          explain: "'Mangio sempre alle otto' = siempre como a las ocho.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it3r-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: presente regolare (-are)",
      intro: "Competencia de GRAMATICA. Aprende a conjugar verbos en '-are' y los adverbios de frecuencia.",
      grammar: {
        title: "Presente regolare (-are)",
        chart: {
          title: "PARLARE",
          maps: "verbos en -are (presente)",
          groups: [
            {
              label: "PARLARE (hablar)", color: "amber",
              forms: [
                { form: "PARLO", subjects: "io" },
                { form: "PARLI", subjects: "tu" },
                { form: "PARLA", subjects: "lui, lei" },
                { form: "PARLIAMO", subjects: "noi" },
                { form: "PARLATE", subjects: "voi" },
                { form: "PARLANO", subjects: "loro" },
              ],
            },
            {
              label: "FREQUENZA", color: "sky",
              forms: [
                { form: "SEMPRE / SPESSO", subjects: "siempre / a menudo" },
                { form: "NON... MAI", subjects: "nunca (doble negacion)" },
              ],
            },
          ],
        },
        form: "io parl*o* / tu parl*i* / lui parl*a* / noi parl*iamo* / voi parl*ate* / loro parl*ano*",
        desc: "Quita '-are' y anade las terminaciones: -o, -i, -a, -iamo, -ate, -ano. Igual para lavorare, mangiare, studiare.",
        rule: "Verbos regulares en '-are': se quita '-are' y se anade -o (io), -i (tu), -a (lui/lei), -iamo (noi), -ate (voi), -ano (loro). Adverbios de frecuencia: 'sempre/spesso' suelen ir DESPUES del verbo; 'mai' pide 'non' antes del verbo: 'Non mangio mai tardi'.",
        examples: ["Io lavoro in un ufficio.", "Tu studi l'italiano.", "Noi mangiamo alle otto.", "Loro parlano italiano."],
        explain: { tr: ["Yo trabajo en una oficina.", "Tu estudias italiano.", "Nosotros comemos a las ocho.", "Ellos hablan italiano."] },
        mistakes: [
          { wrong: "Io lavora molto.", right: "Io lavoro molto." },
          { wrong: "Noi mangia alle otto.", right: "Noi mangiamo alle otto." },
          { wrong: "Loro parla italiano.", right: "Loro parlano italiano." },
        ],
      },
      activities: [
        {
          id: "it3r-gram-a1", type: "cloze",
          prompt: "Completa: 'Io ___ in un ufficio.' (lavorare -> trabajo)",
          payload: { answer: "lavoro" },
          explain: "io + lavor- + o = lavoro.",
        },
        {
          id: "it3r-gram-a2", type: "cloze",
          prompt: "Completa: 'Tu ___ l'italiano.' (studiare -> estudias)",
          payload: { answer: "studi" },
          explain: "tu + stud- + i = studi.",
        },
        {
          id: "it3r-gram-a3", type: "cloze",
          prompt: "Completa: 'Noi ___ alle otto.' (mangiare -> comemos)",
          payload: { answer: "mangiamo" },
          explain: "noi + mangi- + amo = mangiamo.",
        },
        {
          id: "it3r-gram-a4", type: "cloze",
          prompt: "Completa: 'Loro ___ italiano.' (parlare -> hablan)",
          payload: { answer: "parlano" },
          explain: "loro + parl- + ano = parlano.",
        },
        {
          id: "it3r-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Lei lavora molto.", "Lei lavoro molto.", "Lei lavori molto."], answer: 0 },
          explain: "Con lui/lei -> 'lavora'.",
        },
        {
          id: "it3r-gram-a6", type: "multiple_choice",
          prompt: "Como dices 'nunca como tarde'?",
          payload: { choices: ["Mangio mai tardi.", "Non mangio mai tardi.", "Non mangio tardi mai non."], answer: 1 },
          explain: "'mai' necesita 'non' antes del verbo.",
        },
        {
          id: "it3r-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["studiamo", "sera", "la", "Noi"], answer: ["Noi", "studiamo", "la", "sera"] },
          explain: "Orden: Noi + studiamo + la + sera.",
        },
        {
          id: "it3r-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["spesso", "Loro", "italiano", "parlano"], answer: ["Loro", "parlano", "spesso", "italiano"] },
          explain: "Orden: Loro + parlano + spesso + italiano.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it3r-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: descrivi la tua routine",
      intro: "Competencia de ESCRITURA. Describe tu dia, frase por frase.",
      activities: [
        {
          id: "it3r-write-a1", type: "word_bank",
          prompt: "1. Di a que hora te despiertas:",
          payload: { words: ["sveglio", "Mi", "sette", "alle"], answer: ["Mi", "sveglio", "alle", "sette"] },
        },
        {
          id: "it3r-write-a2", type: "word_bank",
          prompt: "2. Di que haces por la manana:",
          payload: { words: ["colazione", "faccio", "La", "mattina"], answer: ["La", "mattina", "faccio", "colazione"] },
        },
        {
          id: "it3r-write-a3", type: "word_bank",
          prompt: "3. Di donde trabajas:",
          payload: { words: ["un", "Lavoro", "ufficio", "in"], answer: ["Lavoro", "in", "un", "ufficio"] },
        },
        {
          id: "it3r-write-a4", type: "word_bank",
          prompt: "4. Di que estudias por la tarde:",
          payload: { words: ["studio", "sera", "italiano", "La"], answer: ["La", "sera", "studio", "italiano"] },
        },
        {
          id: "it3r-write-a5", type: "word_bank",
          prompt: "5. Di algo que nunca haces:",
          payload: { words: ["mai", "Non", "tardi", "mangio"], answer: ["Non", "mangio", "mai", "tardi"] },
        },
        {
          id: "it3r-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Io mangia alle otto.", "Io mangio alle otto.", "Io mangiamo alle otto."], answer: 1 },
        },
        {
          id: "it3r-write-a7", type: "multiple_choice",
          prompt: "7. Como preguntas 'a que hora te despiertas?'",
          payload: { choices: ["A che ora ti svegli?", "Dove ti svegli?", "Perche ti svegli?"], answer: 0 },
        },
        {
          id: "it3r-write-a8", type: "multiple_choice",
          prompt: "8. Cual adverbio significa 'a menudo'?",
          payload: { choices: ["mai", "spesso", "presto"], answer: 1 },
        },
      ],
    },
  ],
};
