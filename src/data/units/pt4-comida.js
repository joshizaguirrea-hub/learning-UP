/**
 * data/units/pt4-comida.js — Unidade A1 pt-BR "A Comida" (gostar de + artigos).
 */

export const PT4_COMIDA = {
  id: "pt4-comida",
  language: "pt",
  level: "A1",
  title: "A Comida",
  subtitle: "Hablar de comida, gustos ('gostar de') y los articulos",

  cando: [
    "Puedo nombrar comidas y bebidas comunes.",
    "Puedo decir lo que me gusta con 'gostar de'.",
    "Puedo usar los articulos (o, a, os, as).",
    "Puedo pedir algo en un restaurante ('eu queria').",
  ],

  vocab: [
    { id: "pt4c-1", term: "comida", translation: "comida", example: "A comida está deliciosa." },
    { id: "pt4c-2", term: "água", translation: "agua", example: "Uma água, por favor." },
    { id: "pt4c-3", term: "café", translation: "cafe", example: "Eu bebo café de manhã." },
    { id: "pt4c-4", term: "pão", translation: "pan", example: "Eu como pão no café da manhã." },
    { id: "pt4c-5", term: "arroz / feijão", translation: "arroz / frijoles", example: "Eu gosto de arroz e feijão." },
    { id: "pt4c-6", term: "carne / peixe", translation: "carne / pescado", example: "Ela não come carne." },
    { id: "pt4c-7", term: "fruta", translation: "fruta", example: "A fruta é saudável." },
    { id: "pt4c-8", term: "legumes", translation: "verduras", example: "Nós comemos legumes." },
    { id: "pt4c-9", term: "gostar de", translation: "gustar de", example: "Eu gosto de café." },
    { id: "pt4c-10", term: "comer / beber", translation: "comer / beber", example: "Eu como e bebo devagar." },
    { id: "pt4c-11", term: "delicioso / saudável", translation: "delicioso / saludable", example: "Esta sopa é saudável." },
    { id: "pt4c-12", term: "a conta, por favor", translation: "la cuenta, por favor", example: "A conta, por favor!" },
  ],

  lessons: [
    {
      id: "pt4c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o que eu gosto de comer",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - A comida do Bruno\n" +
          "Eu gosto muito de comer bem. No café da manhã, eu como pão e bebo café. Ao almoço, eu gosto " +
          "de arroz, feijão e carne. Eu não gosto de peixe. À noite, eu como uma sopa de legumes porque é " +
          "saudável. A minha fruta preferida é a banana.\n\n" +
          "TEXTO 2 - No restaurante\n" +
          "Empregado: Boa noite! O que deseja? Cliente: Boa noite. Eu queria uma água e uma salada, por favor. " +
          "Empregado: E para comer? Cliente: Um peixe com legumes. Empregado: Com certeza. Cliente: Obrigada. " +
          "No fim: A conta, por favor!",
        glossary: [
          { term: "eu gosto de", translation: "me gusta" },
          { term: "eu não gosto de", translation: "no me gusta" },
          { term: "eu queria", translation: "yo querria / quisiera" },
          { term: "o que deseja?", translation: "que desea?" },
          { term: "com certeza", translation: "por supuesto" },
          { term: "preferida", translation: "preferida" },
          { term: "saudável", translation: "saludable" },
          { term: "a conta", translation: "la cuenta" },
        ],
        keyPhrases: [
          "Busca lo que le gusta y lo que no le gusta al Bruno.",
          "Fijate en como se pide en el restaurante ('eu queria').",
        ],
        check: [
          { prompt: "T1: O que o Bruno bebe de manhã?", choices: ["Água", "Café", "Sumo"], answer: 1 },
          { prompt: "T1: O que o Bruno NÃO gosta de comer?", choices: ["Peixe", "Carne", "Arroz"], answer: 0 },
          { prompt: "T1: Qual é a fruta preferida do Bruno?", choices: ["Maçã", "Banana", "Laranja"], answer: 1 },
          { prompt: "T2: O que o cliente pede para beber?", choices: ["Café", "Água", "Vinho"], answer: 1 },
          { prompt: "T2: O que o cliente come?", choices: ["Carne", "Peixe com legumes", "Sopa"], answer: 1 },
          { prompt: "T2: O que o cliente pede no fim?", choices: ["A conta", "Mais água", "Uma sobremesa"], answer: 0 },
        ],
      },
      activities: [],
    },

    {
      id: "pt4c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: comidas e bebidas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "água / café", translation: "agua / cafe" },
        { term: "pão", translation: "pan" },
        { term: "arroz / feijão", translation: "arroz / frijoles" },
        { term: "carne / peixe", translation: "carne / pescado" },
        { term: "fruta / legumes", translation: "fruta / verduras" },
        { term: "comer / beber", translation: "comer / beber" },
        { term: "gostar de", translation: "gustar de" },
        { term: "a conta, por favor", translation: "la cuenta, por favor" },
      ],
      activities: [
        {
          id: "pt4c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "água", right: "agua" },
            { left: "pão", right: "pan" },
            { left: "carne", right: "carne" },
            { left: "peixe", right: "pescado" },
          ] },
        },
        {
          id: "pt4c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "fruta", right: "fruta" },
            { left: "legumes", right: "verduras" },
            { left: "comer", right: "comer" },
            { left: "beber", right: "beber" },
          ] },
        },
        {
          id: "pt4c-vocab-a3", type: "cloze",
          prompt: "Completa: 'Eu bebo ___ de manhã.' (cafe)",
          payload: { answer: "café" },
          explain: "'café' = cafe.",
        },
        {
          id: "pt4c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Eu ___ de arroz e feijão.' (gusto)",
          payload: { answer: "gosto" },
          explain: "'gostar de' -> eu gosto de.",
        },
        {
          id: "pt4c-vocab-a5", type: "cloze",
          prompt: "Completa: 'A sopa de ___ é saudável.' (verduras)",
          payload: { answer: "legumes" },
          explain: "'legumes' = verduras.",
        },
        {
          id: "pt4c-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'pan'?",
          payload: { choices: ["peixe", "pão", "carne"], answer: 1 },
          explain: "'pão' = pan.",
        },
        {
          id: "pt4c-vocab-a7", type: "multiple_choice",
          prompt: "Como pides la cuenta?",
          payload: { choices: ["A conta, por favor.", "O que deseja?", "Com certeza."], answer: 0 },
          explain: "'A conta, por favor' = la cuenta, por favor.",
        },
        {
          id: "pt4c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["café", "de", "gosto", "Eu"], answer: ["Eu", "gosto", "de", "café"] },
          explain: "'Eu gosto de café' = me gusta el cafe.",
        },
      ],
    },

    {
      id: "pt4c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'gostar de' + artigos",
      intro: "Competencia de GRAMATICA. Aprende a expresar gustos y los articulos o/a/os/as.",
      grammar: {
        title: "'gostar de' e os artigos",
        chart: {
          title: "ARTIGOS",
          maps: "EL / LA / LOS / LAS",
          groups: [
            {
              label: "DEFINIDOS", color: "sky",
              forms: [
                { form: "O", subjects: "masc. singular (o café)" },
                { form: "A", subjects: "fem. singular (a fruta)" },
                { form: "OS", subjects: "masc. plural (os legumes)" },
                { form: "AS", subjects: "fem. plural (as frutas)" },
              ],
            },
            {
              label: "GOSTAR DE", color: "amber",
              forms: [
                { form: "gosto de", subjects: "eu" },
                { form: "gosta de", subjects: "você, ele, ela" },
              ],
            },
          ],
        },
        form: "eu *gosto de* café / eu *não gosto de* peixe",
        desc: "El verbo 'gostar' SIEMPRE va con 'de'. Los articulos concuerdan en genero y numero.",
        rule: "Para gustos: 'gostar de' + cosa (eu gosto de, você gosta de). Para negar: 'não gosto de'. Articulos definidos: o (masc.), a (fem.), os/as (plural).",
        examples: ["Eu gosto de café.", "Ela não gosta de peixe.", "O pão está bom.", "As frutas são saudáveis."],
        explain: { tr: ["Me gusta el cafe.", "A ella no le gusta el pescado.", "El pan esta bueno.", "Las frutas son saludables."] },
        mistakes: [
          { wrong: "Eu gosto café.", right: "Eu gosto de café." },
          { wrong: "A café está bom.", right: "O café está bom." },
          { wrong: "Ela não gosta peixe.", right: "Ela não gosta de peixe." },
        ],
      },
      activities: [
        {
          id: "pt4c-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu gosto ___ café.' (falta la preposicion)",
          payload: { answer: "de" },
          explain: "'gostar' pide 'de': gosto de café.",
        },
        {
          id: "pt4c-gram-a2", type: "cloze",
          prompt: "Completa el articulo: '___ fruta é saudável.' (la)",
          payload: { answer: "A" },
          explain: "'fruta' es femenino -> 'a fruta'.",
        },
        {
          id: "pt4c-gram-a3", type: "cloze",
          prompt: "Completa el articulo: '___ café está bom.' (el)",
          payload: { answer: "O" },
          explain: "'café' es masculino -> 'o café'.",
        },
        {
          id: "pt4c-gram-a4", type: "cloze",
          prompt: "Completa: 'Ela não ___ de peixe.' (gusta)",
          payload: { answer: "gosta" },
          explain: "Con 'ela' -> gosta de.",
        },
        {
          id: "pt4c-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu gosto café.", "Eu gosto de café.", "Eu gosta de café."], answer: 1 },
          explain: "gostar + de; con 'eu' -> gosto.",
        },
        {
          id: "pt4c-gram-a6", type: "multiple_choice",
          prompt: "Cual articulo va con 'legumes' (plural masc.)?",
          payload: { choices: ["o", "os", "as"], answer: 1 },
          explain: "plural masculino -> 'os legumes'.",
        },
        {
          id: "pt4c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["de", "peixe", "gosto", "não", "Eu"], answer: ["Eu", "não", "gosto", "de", "peixe"] },
          explain: "Negacion: Eu + não + gosto + de + peixe.",
        },
        {
          id: "pt4c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["saudáveis", "frutas", "As", "são"], answer: ["As", "frutas", "são", "saudáveis"] },
          explain: "plural femenino -> 'as frutas'.",
        },
      ],
    },

    {
      id: "pt4c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: os meus gostos",
      intro: "Competencia de ESCRITURA. Escribe sobre tus gustos, frase por frase.",
      activities: [
        {
          id: "pt4c-write-a1", type: "word_bank",
          prompt: "1. Di lo que te gusta:",
          payload: { words: ["café", "gosto", "de", "Eu"], answer: ["Eu", "gosto", "de", "café"] },
        },
        {
          id: "pt4c-write-a2", type: "word_bank",
          prompt: "2. Di lo que no te gusta:",
          payload: { words: ["de", "gosto", "não", "peixe", "Eu"], answer: ["Eu", "não", "gosto", "de", "peixe"] },
        },
        {
          id: "pt4c-write-a3", type: "word_bank",
          prompt: "3. Di lo que comes en el desayuno:",
          payload: { words: ["pão", "como", "Eu"], answer: ["Eu", "como", "pão"] },
        },
        {
          id: "pt4c-write-a4", type: "word_bank",
          prompt: "4. Pide algo en un restaurante:",
          payload: { words: ["água", "Eu", "uma", "queria"], answer: ["Eu", "queria", "uma", "água"] },
        },
        {
          id: "pt4c-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'me gusta el arroz'?",
          payload: { choices: ["Eu gosto arroz.", "Eu gosto de arroz.", "Eu gosta de arroz."], answer: 1 },
        },
        {
          id: "pt4c-write-a6", type: "multiple_choice",
          prompt: "6. Cual articulo va con 'fruta'?",
          payload: { choices: ["o", "a", "os"], answer: 1 },
        },
        {
          id: "pt4c-write-a7", type: "multiple_choice",
          prompt: "7. Como pides la cuenta?",
          payload: { choices: ["A conta, por favor.", "O que deseja?", "Bom apetite."], answer: 0 },
        },
        {
          id: "pt4c-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["O café está bom.", "A café está bom.", "Os café está bom."], answer: 0 },
        },
      ],
    },
  ],
};
