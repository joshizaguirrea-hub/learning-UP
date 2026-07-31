/**
 * data/units/it5-casa.js — Unita A1 italiano "La casa" (c'e/ci sono + preposizioni).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT5_CASA = {
  id: "it5-casa",
  language: "it",
  level: "A1",
  title: "La casa",
  subtitle: "Describir la casa con 'c'e / ci sono', preposiciones y el verbo 'stare'",

  cando: [
    "Puedo nombrar las habitaciones y los muebles de una casa.",
    "Puedo decir que hay con 'c'e' (singular) y 'ci sono' (plural).",
    "Puedo ubicar cosas con preposiciones (in, su, sotto, accanto a...).",
    "Puedo usar el verbo 'stare' y preguntar 'dov'e?'.",
  ],

  vocab: [
    { id: "it5c-1", term: "la casa", translation: "la casa", example: "La mia casa e piccola." },
    { id: "it5c-2", term: "la camera", translation: "la habitacion/el dormitorio", example: "La camera e grande." },
    { id: "it5c-3", term: "la cucina", translation: "la cocina", example: "In cucina c'e il tavolo." },
    { id: "it5c-4", term: "il bagno", translation: "el bano", example: "Il bagno e piccolo." },
    { id: "it5c-5", term: "il salotto", translation: "la sala/el salon", example: "In salotto c'e il divano." },
    { id: "it5c-6", term: "il letto", translation: "la cama", example: "Il letto e in camera." },
    { id: "it5c-7", term: "il tavolo", translation: "la mesa", example: "Il tavolo e in cucina." },
    { id: "it5c-8", term: "la sedia", translation: "la silla", example: "Ci sono quattro sedie." },
    { id: "it5c-9", term: "la finestra", translation: "la ventana", example: "La finestra e grande." },
    { id: "it5c-10", term: "la porta", translation: "la puerta", example: "La porta e chiusa." },
    { id: "it5c-11", term: "il divano", translation: "el sofa", example: "Il gatto e sul divano." },
    { id: "it5c-12", term: "l'armadio", translation: "el armario", example: "I vestiti sono nell'armadio." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it5c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la mia casa",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - La casa di Anna\n" +
          "Ciao! La mia casa e piccola ma bella. C'e una cucina, un salotto, una camera e un bagno. " +
          "In cucina c'e un tavolo con quattro sedie. In salotto c'e un divano e una grande finestra. " +
          "In camera c'e il letto e un armadio. Il gatto sta sempre sul divano!\n\n" +
          "TESTO 2 - Dov'e il gatto?\n" +
          "A: Dov'e il gatto? B: Non lo so. Non e in salotto. A: E' in cucina? B: No, in cucina non c'e. " +
          "A: Forse e sotto il letto. B: Si! Il gatto e sotto il letto, accanto all'armadio. A: Che furbo!",
        glossary: [
          { term: "c'e / ci sono", translation: "hay (singular / plural)" },
          { term: "dov'e?", translation: "donde esta?" },
          { term: "in / su (sul) / sotto", translation: "en / sobre / debajo de" },
          { term: "accanto a", translation: "al lado de" },
          { term: "davanti a / dietro", translation: "delante de / detras de" },
          { term: "non lo so", translation: "no lo se" },
          { term: "forse", translation: "quiza/tal vez" },
          { term: "che furbo!", translation: "que astuto!" },
        ],
        keyPhrases: [
          "Ojo: 'c'e' + una cosa (singular); 'ci sono' + varias cosas (plural).",
          "Fijate DONDE esta cada cosa (preposiciones de lugar).",
        ],
        check: [
          { prompt: "T1: Com'e la casa di Anna?", choices: ["Grande", "Piccola ma bella", "Vecchia"], answer: 1 },
          { prompt: "T1: Cosa c'e in cucina?", choices: ["Un divano", "Un tavolo con quattro sedie", "Un letto"], answer: 1 },
          { prompt: "T1: Dove sta sempre il gatto?", choices: ["Sul divano", "In bagno", "Nell'armadio"], answer: 0 },
          { prompt: "T2: Il gatto e in salotto?", choices: ["Si", "No", "Forse"], answer: 1 },
          { prompt: "T2: Dov'e il gatto?", choices: ["In cucina", "Sotto il letto", "Sul tavolo"], answer: 1 },
          { prompt: "T2: Accanto a cosa e il gatto?", choices: ["Alla finestra", "All'armadio", "Alla porta"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it5c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: stanze e mobili",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "la casa / la camera", translation: "la casa / la habitacion" },
        { term: "la cucina / il bagno", translation: "la cocina / el bano" },
        { term: "il salotto / il divano", translation: "la sala / el sofa" },
        { term: "il letto / l'armadio", translation: "la cama / el armario" },
        { term: "il tavolo / la sedia", translation: "la mesa / la silla" },
        { term: "la finestra / la porta", translation: "la ventana / la puerta" },
        { term: "c'e / ci sono", translation: "hay (sing. / pl.)" },
        { term: "dov'e?", translation: "donde esta?" },
      ],
      activities: [
        {
          id: "it5c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "cucina", right: "cocina" },
            { left: "bagno", right: "bano" },
            { left: "camera", right: "habitacion" },
            { left: "salotto", right: "sala" },
          ] },
        },
        {
          id: "it5c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "letto", right: "cama" },
            { left: "tavolo", right: "mesa" },
            { left: "sedia", right: "silla" },
            { left: "finestra", right: "ventana" },
          ] },
        },
        {
          id: "it5c-vocab-a3", type: "cloze",
          prompt: "Completa: 'In cucina ___ un tavolo.' (hay, singular)",
          payload: { answer: "c'e", alt: ["ce", "c\u2019e"] },
          explain: "Una cosa -> 'c'e'.",
        },
        {
          id: "it5c-vocab-a4", type: "cloze",
          prompt: "Completa: 'In salotto ___ due divani.' (hay, plural)",
          payload: { answer: "ci sono" },
          explain: "Varias cosas -> 'ci sono'.",
        },
        {
          id: "it5c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Il gatto e ___ il divano.' (sobre)",
          payload: { answer: "su", alt: ["sul"] },
          explain: "Sobre = 'su' (su + il = sul).",
        },
        {
          id: "it5c-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'el armario'?",
          payload: { choices: ["l'armadio", "la sedia", "la porta"], answer: 0 },
          explain: "'L'armadio' = el armario.",
        },
        {
          id: "it5c-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'donde esta la cama?'",
          payload: { choices: ["Cos'e il letto?", "Dov'e il letto?", "Chi e il letto?"], answer: 1 },
          explain: "'Dov'e...?' = donde esta...?",
        },
        {
          id: "it5c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cucina", "In", "un", "c'e", "tavolo"], answer: ["In", "cucina", "c'e", "un", "tavolo"] },
          explain: "'In cucina c'e un tavolo' = en la cocina hay una mesa.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it5c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'c'e/ci sono' + preposizioni",
      intro: "Competencia de GRAMATICA. Aprende 'c'e/ci sono', las preposiciones y 'stare'.",
      grammar: {
        title: "'C'e / ci sono' e le preposizioni",
        chart: {
          title: "C'E' / CI SONO",
          maps: "hay (singular / plural)",
          groups: [
            {
              label: "ESISTENZA", color: "amber",
              forms: [
                { form: "C'E'", subjects: "+ 1 cosa (hay)" },
                { form: "CI SONO", subjects: "+ 2+ cosas (hay)" },
                { form: "NON C'E'", subjects: "no hay (sing.)" },
                { form: "DOV'E'?", subjects: "donde esta?" },
              ],
            },
            {
              label: "PREPOSIZIONI", color: "sky",
              forms: [
                { form: "IN / SU (SUL)", subjects: "en / sobre" },
                { form: "SOTTO / DIETRO", subjects: "debajo / detras" },
                { form: "DAVANTI A / ACCANTO A", subjects: "delante de / al lado de" },
              ],
            },
          ],
        },
        form: "*c'e* + singular / *ci sono* + plural",
        desc: "'C'e' y 'ci sono' significan 'hay'. Usa 'c'e' con UNA cosa y 'ci sono' con VARIAS. Para preguntar donde: 'dov'e?' (singular) / 'dove sono?' (plural).",
        rule: "'C'e' = hay (1 cosa): 'C'e un tavolo'. 'Ci sono' = hay (2+ cosas): 'Ci sono due sedie'. Negativo: 'Non c'e / non ci sono'. Preposiciones de lugar: in (en), su -> sul/sulla (sobre), sotto (debajo), dietro (detras), davanti a (delante de), accanto a (al lado de). 'Su' y 'in' se juntan con el articulo: su+il=sul, in+il=nel.",
        examples: ["C'e un divano in salotto.", "Ci sono quattro sedie.", "Non c'e il letto qui.", "Il gatto e sotto il tavolo."],
        explain: { tr: ["Hay un sofa en la sala.", "Hay cuatro sillas.", "No esta la cama aqui.", "El gato esta debajo de la mesa."] },
        mistakes: [
          { wrong: "Ci sono un tavolo.", right: "C'e un tavolo." },
          { wrong: "C'e due sedie.", right: "Ci sono due sedie." },
          { wrong: "Il gatto e su tavolo.", right: "Il gatto e sul tavolo." },
        ],
      },
      activities: [
        {
          id: "it5c-gram-a1", type: "cloze",
          prompt: "Completa: '___ un divano.' (hay, 1 cosa)",
          payload: { answer: "c'e", alt: ["ce", "c\u2019e"] },
          explain: "1 cosa -> 'c'e'.",
        },
        {
          id: "it5c-gram-a2", type: "cloze",
          prompt: "Completa: '___ tre finestre.' (hay, plural)",
          payload: { answer: "ci sono" },
          explain: "2+ cosas -> 'ci sono'.",
        },
        {
          id: "it5c-gram-a3", type: "cloze",
          prompt: "Completa: 'Il libro e ___ tavolo.' (sobre el)",
          payload: { answer: "sul" },
          explain: "su + il = 'sul'.",
        },
        {
          id: "it5c-gram-a4", type: "cloze",
          prompt: "Completa: 'Il gatto e ___ il letto.' (debajo de)",
          payload: { answer: "sotto" },
          explain: "Debajo = 'sotto'.",
        },
        {
          id: "it5c-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Ci sono un bagno.", "C'e un bagno.", "C'e due bagni."], answer: 1 },
          explain: "1 cosa -> 'c'e un bagno'.",
        },
        {
          id: "it5c-gram-a6", type: "multiple_choice",
          prompt: "Como preguntas 'donde estan las sillas?'",
          payload: { choices: ["Dov'e le sedie?", "Dove sono le sedie?", "Cosa sono le sedie?"], answer: 1 },
          explain: "Plural -> 'dove sono le sedie?'.",
        },
        {
          id: "it5c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sono", "sedie", "Ci", "due"], answer: ["Ci", "sono", "due", "sedie"] },
          explain: "'Ci sono due sedie' = hay dos sillas.",
        },
        {
          id: "it5c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["e", "gatto", "Il", "il", "sotto", "letto"], answer: ["Il", "gatto", "e", "sotto", "il", "letto"] },
          explain: "'Il gatto e sotto il letto' = el gato esta debajo de la cama.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it5c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: descrivi la tua casa",
      intro: "Competencia de ESCRITURA. Describe tu casa, frase por frase.",
      activities: [
        {
          id: "it5c-write-a1", type: "word_bank",
          prompt: "1. Di que hay en la sala (1 cosa):",
          payload: { words: ["divano", "c'e", "In", "un", "salotto"], answer: ["In", "salotto", "c'e", "un", "divano"] },
        },
        {
          id: "it5c-write-a2", type: "word_bank",
          prompt: "2. Di que hay en la cocina (varias cosas):",
          payload: { words: ["sedie", "cucina", "In", "ci", "sono", "quattro"], answer: ["In", "cucina", "ci", "sono", "quattro", "sedie"] },
        },
        {
          id: "it5c-write-a3", type: "word_bank",
          prompt: "3. Ubica el gato (sobre el sofa):",
          payload: { words: ["e", "gatto", "Il", "divano", "sul"], answer: ["Il", "gatto", "e", "sul", "divano"] },
        },
        {
          id: "it5c-write-a4", type: "word_bank",
          prompt: "4. Di que NO hay (la cama):",
          payload: { words: ["c'e", "Non", "letto", "il"], answer: ["Non", "c'e", "il", "letto"] },
        },
        {
          id: "it5c-write-a5", type: "word_bank",
          prompt: "5. Pregunta donde esta el bano:",
          payload: { words: ["bagno", "Dov'e", "il"], answer: ["Dov'e", "il", "bagno"] },
        },
        {
          id: "it5c-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["C'e due finestre.", "Ci sono due finestre.", "Ci sono una finestra."], answer: 1 },
        },
        {
          id: "it5c-write-a7", type: "multiple_choice",
          prompt: "7. Como dices 'la silla esta al lado del armario'?",
          payload: { choices: ["La sedia e accanto all'armadio.", "La sedia e sotto l'armadio.", "La sedia e su armadio."], answer: 0 },
        },
        {
          id: "it5c-write-a8", type: "multiple_choice",
          prompt: "8. 'sobre la mesa' se dice...",
          payload: { choices: ["su tavolo", "sul tavolo", "in tavolo"], answer: 1 },
        },
      ],
    },
  ],
};
