/**
 * data/units/pt6-compras.js — Unidade A1 pt-BR "As Compras" (números + quanto custa).
 */

export const PT6_COMPRAS = {
  id: "pt6-compras",
  language: "pt",
  level: "A1",
  title: "As Compras",
  subtitle: "Comprar, preguntar precios y usar numeros y demostrativos",

  cando: [
    "Puedo usar los numeros para precios y cantidades.",
    "Puedo preguntar cuanto cuesta algo ('quanto custa?').",
    "Puedo usar los demostrativos (este, esse, aquele).",
    "Puedo hacer una compra sencilla en una tienda.",
  ],

  vocab: [
    { id: "pt6c-1", term: "loja", translation: "tienda", example: "A loja abre às nove." },
    { id: "pt6c-2", term: "dinheiro", translation: "dinero", example: "Eu não tenho dinheiro." },
    { id: "pt6c-3", term: "preço", translation: "precio", example: "O preço é bom." },
    { id: "pt6c-4", term: "caro / barato", translation: "caro / barato", example: "Este casaco é caro." },
    { id: "pt6c-5", term: "camisa / calça", translation: "camisa / pantalon", example: "Eu quero uma camisa azul." },
    { id: "pt6c-6", term: "sapatos", translation: "zapatos", example: "Estes sapatos são bonitos." },
    { id: "pt6c-7", term: "comprar / vender", translation: "comprar / vender", example: "Eu quero comprar isto." },
    { id: "pt6c-8", term: "quanto custa?", translation: "cuanto cuesta?", example: "Quanto custa esta camisa?" },
    { id: "pt6c-9", term: "reais / euros", translation: "reales / euros", example: "Custa vinte reais." },
    { id: "pt6c-10", term: "este / esse / aquele", translation: "este / ese / aquel", example: "Eu quero este, por favor." },
    { id: "pt6c-11", term: "tamanho / cor", translation: "talla / color", example: "Qual é o tamanho?" },
    { id: "pt6c-12", term: "cartão / troco", translation: "tarjeta / cambio", example: "Posso pagar com cartão?" },
  ],

  lessons: [
    {
      id: "pt6c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: na loja",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - Comprar uma camisa\n" +
          "Cliente: Bom dia! Quanto custa esta camisa azul? Vendedor: Custa trinta reais. Cliente: E aquela " +
          "camisa branca? Vendedor: Aquela é mais cara, custa quarenta e cinco reais. Cliente: A azul é mais " +
          "barata. Eu quero a azul. Posso pagar com cartão? Vendedor: Claro! Obrigado.\n\n" +
          "TEXTO 2 - O mercado da Sofia\n" +
          "A Sofia vai ao mercado com vinte reais. Ela compra fruta, pão e um pouco de queijo. A fruta custa " +
          "oito reais, o pão custa três e o queijo custa seis. No total, ela gasta dezassete reais. O troco é de " +
          "três reais. A Sofia gosta de comprar coisas baratas.",
        glossary: [
          { term: "quanto custa?", translation: "cuanto cuesta?" },
          { term: "custa trinta reais", translation: "cuesta treinta reales" },
          { term: "mais caro / mais barato", translation: "mas caro / mas barato" },
          { term: "eu quero", translation: "yo quiero" },
          { term: "pagar com cartão", translation: "pagar con tarjeta" },
          { term: "o troco", translation: "el cambio/vuelto" },
          { term: "gasta", translation: "gasta" },
          { term: "no total", translation: "en total" },
        ],
        keyPhrases: [
          "Fijate en los precios de cada cosa.",
          "Compara: mais caro / mais barato.",
        ],
        check: [
          { prompt: "T1: Quanto custa a camisa azul?", choices: ["Trinta reais", "Quarenta reais", "Quarenta e cinco reais"], answer: 0 },
          { prompt: "T1: Qual camisa é mais cara?", choices: ["A azul", "A branca", "As duas iguais"], answer: 1 },
          { prompt: "T1: Como o cliente quer pagar?", choices: ["Com dinheiro", "Com cartão", "Com troco"], answer: 1 },
          { prompt: "T2: Com quanto dinheiro a Sofia vai ao mercado?", choices: ["Vinte reais", "Dez reais", "Trinta reais"], answer: 0 },
          { prompt: "T2: Quanto gasta a Sofia no total?", choices: ["Oito reais", "Dezassete reais", "Vinte reais"], answer: 1 },
          { prompt: "T2: De quanto é o troco?", choices: ["Três reais", "Seis reais", "Dois reais"], answer: 0 },
        ],
      },
      activities: [],
    },

    {
      id: "pt6c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: compras e números",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "loja / mercado", translation: "tienda / mercado" },
        { term: "dinheiro / preço", translation: "dinero / precio" },
        { term: "caro / barato", translation: "caro / barato" },
        { term: "comprar / vender", translation: "comprar / vender" },
        { term: "quanto custa?", translation: "cuanto cuesta?" },
        { term: "este / esse / aquele", translation: "este / ese / aquel" },
        { term: "cartão / troco", translation: "tarjeta / cambio" },
        { term: "tamanho / cor", translation: "talla / color" },
      ],
      activities: [
        {
          id: "pt6c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "loja", right: "tienda" },
            { left: "dinheiro", right: "dinero" },
            { left: "caro", right: "caro" },
            { left: "barato", right: "barato" },
          ] },
        },
        {
          id: "pt6c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "comprar", right: "comprar" },
            { left: "preço", right: "precio" },
            { left: "cartão", right: "tarjeta" },
            { left: "troco", right: "cambio" },
          ] },
        },
        {
          id: "pt6c-vocab-a3", type: "cloze",
          prompt: "Completa la pregunta: '___ custa esta camisa?' (cuanto)",
          payload: { answer: "Quanto" },
          explain: "'Quanto custa?' = cuanto cuesta?",
        },
        {
          id: "pt6c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Este casaco é muito ___.' (caro)",
          payload: { answer: "caro" },
          explain: "'caro' = caro.",
        },
        {
          id: "pt6c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Posso pagar com ___?' (tarjeta)",
          payload: { answer: "cartão" },
          explain: "'cartão' = tarjeta.",
        },
        {
          id: "pt6c-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'barato'?",
          payload: { choices: ["caro", "barato", "preço"], answer: 1 },
          explain: "'barato' = barato.",
        },
        {
          id: "pt6c-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'troco'?",
          payload: { choices: ["precio", "cambio/vuelto", "tienda"], answer: 1 },
          explain: "'troco' = cambio/vuelto.",
        },
        {
          id: "pt6c-vocab-a8", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["custa", "isto?", "Quanto"], answer: ["Quanto", "custa", "isto?"] },
          explain: "'Quanto custa isto?' = cuanto cuesta esto?",
        },
      ],
    },

    {
      id: "pt6c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: demonstrativos + 'querer'",
      intro: "Competencia de GRAMATICA. Aprende este/esse/aquele y el verbo 'querer'.",
      grammar: {
        title: "Demonstrativos e 'querer'",
        chart: {
          title: "ESTE/ESSE/AQUELE",
          maps: "este / ese / aquel",
          groups: [
            {
              label: "DISTÂNCIA", color: "sky",
              forms: [
                { form: "ESTE / ESTA", subjects: "cerca de mi (este)" },
                { form: "ESSE / ESSA", subjects: "cerca de ti (ese)" },
                { form: "AQUELE / AQUELA", subjects: "lejos (aquel)" },
              ],
            },
            {
              label: "QUERER", color: "amber",
              forms: [
                { form: "QUERO", subjects: "eu" },
                { form: "QUER", subjects: "você, ele, ela" },
              ],
            },
          ],
        },
        form: "eu *quero* *este* / *quanto custa* *aquele*?",
        desc: "Los demostrativos concuerdan en genero: este/esta, esse/essa, aquele/aquela.",
        rule: "Demostrativos: este/esta (cerca de mi), esse/essa (cerca de ti), aquele/aquela (lejos). El verbo querer: eu quero, você/ele/ela quer. Concuerdan con el genero del objeto.",
        examples: ["Eu quero esta camisa.", "Quanto custa aquele casaco?", "Ela quer esses sapatos.", "Eu quero comprar isto."],
        explain: { tr: ["Yo quiero esta camisa.", "Cuanto cuesta aquel abrigo?", "Ella quiere esos zapatos.", "Yo quiero comprar esto."] },
        mistakes: [
          { wrong: "Eu quer esta camisa.", right: "Eu quero esta camisa." },
          { wrong: "Eu quero este camisa.", right: "Eu quero esta camisa." },
          { wrong: "Quanto custa aquela casaco?", right: "Quanto custa aquele casaco?" },
        ],
      },
      activities: [
        {
          id: "pt6c-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ esta camisa.' (quiero)",
          payload: { answer: "quero" },
          explain: "Con 'eu' -> quero.",
        },
        {
          id: "pt6c-gram-a2", type: "cloze",
          prompt: "Completa: 'Eu quero ___ camisa.' (esta, fem.)",
          payload: { answer: "esta" },
          explain: "'camisa' es femenino -> esta.",
        },
        {
          id: "pt6c-gram-a3", type: "cloze",
          prompt: "Completa: 'Quanto custa ___ casaco?' (aquel, masc.)",
          payload: { answer: "aquele" },
          explain: "'casaco' es masculino -> aquele.",
        },
        {
          id: "pt6c-gram-a4", type: "cloze",
          prompt: "Completa: 'Ela ___ esses sapatos.' (quiere)",
          payload: { answer: "quer" },
          explain: "Con 'ela' -> quer.",
        },
        {
          id: "pt6c-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu quer esta camisa.", "Eu quero esta camisa.", "Eu quero este camisa."], answer: 1 },
          explain: "eu quero + esta (fem.).",
        },
        {
          id: "pt6c-gram-a6", type: "multiple_choice",
          prompt: "Cual demostrativo usas para algo LEJOS?",
          payload: { choices: ["este", "esse", "aquele"], answer: 2 },
          explain: "'aquele' = aquel (lejos).",
        },
        {
          id: "pt6c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["esta", "quero", "camisa", "Eu"], answer: ["Eu", "quero", "esta", "camisa"] },
          explain: "Orden: Eu + quero + esta + camisa.",
        },
        {
          id: "pt6c-gram-a8", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["custa", "aquele", "Quanto", "casaco?"], answer: ["Quanto", "custa", "aquele", "casaco?"] },
          explain: "'Quanto custa aquele casaco?'",
        },
      ],
    },

    {
      id: "pt6c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: uma compra",
      intro: "Competencia de ESCRITURA. Escribe una compra sencilla, frase por frase.",
      activities: [
        {
          id: "pt6c-write-a1", type: "word_bank",
          prompt: "1. Pregunta el precio:",
          payload: { words: ["custa", "isto?", "Quanto"], answer: ["Quanto", "custa", "isto?"] },
        },
        {
          id: "pt6c-write-a2", type: "word_bank",
          prompt: "2. Di lo que quieres:",
          payload: { words: ["camisa", "quero", "esta", "Eu"], answer: ["Eu", "quero", "esta", "camisa"] },
        },
        {
          id: "pt6c-write-a3", type: "word_bank",
          prompt: "3. Pregunta si puedes pagar con tarjeta:",
          payload: { words: ["com", "Posso", "cartão?", "pagar"], answer: ["Posso", "pagar", "com", "cartão?"] },
        },
        {
          id: "pt6c-write-a4", type: "word_bank",
          prompt: "4. Di que algo es barato:",
          payload: { words: ["barata", "camisa", "é", "Esta"], answer: ["Esta", "camisa", "é", "barata"] },
        },
        {
          id: "pt6c-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'yo quiero esta camisa'?",
          payload: { choices: ["Eu quer esta camisa.", "Eu quero esta camisa.", "Eu quero este camisa."], answer: 1 },
        },
        {
          id: "pt6c-write-a6", type: "multiple_choice",
          prompt: "6. Cual usas para algo cerca de ti?",
          payload: { choices: ["este", "esse", "aquele"], answer: 1 },
        },
        {
          id: "pt6c-write-a7", type: "multiple_choice",
          prompt: "7. Como preguntas '¿cuanto cuesta?'",
          payload: { choices: ["Quanto custa?", "Quantos anos?", "Que horas?"], answer: 0 },
        },
        {
          id: "pt6c-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["Quanto custa aquele casaco?", "Quanto custa aquela casaco?", "Quanto custam aquele casaco?"], answer: 0 },
        },
      ],
    },
  ],
};
