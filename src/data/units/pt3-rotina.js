/**
 * data/units/pt3-rotina.js — Unidade A1 pt-BR "A Rotina" (presente regular + advérbios).
 */

export const PT3_ROTINA = {
  id: "pt3-rotina",
  language: "pt",
  level: "A1",
  title: "A Rotina",
  subtitle: "Contar tu dia a dia con verbos en presente y adverbios de frecuencia",

  cando: [
    "Puedo describir mi rutina diaria.",
    "Puedo conjugar verbos regulares en presente (-ar).",
    "Puedo usar adverbios de frecuencia (sempre, nunca, às vezes).",
    "Puedo decir las horas del dia (de manha, à tarde, à noite).",
  ],

  vocab: [
    { id: "pt3r-1", term: "acordar", translation: "despertar", example: "Eu acordo às sete." },
    { id: "pt3r-2", term: "tomar café da manhã", translation: "desayunar", example: "Eu tomo café da manhã em casa." },
    { id: "pt3r-3", term: "trabalhar", translation: "trabajar", example: "Ela trabalha num escritório." },
    { id: "pt3r-4", term: "estudar", translation: "estudiar", example: "Nós estudamos português." },
    { id: "pt3r-5", term: "almoçar", translation: "almorzar", example: "Eu almoço ao meio-dia." },
    { id: "pt3r-6", term: "voltar para casa", translation: "volver a casa", example: "Ele volta para casa às seis." },
    { id: "pt3r-7", term: "jantar", translation: "cenar", example: "Nós jantamos às oito." },
    { id: "pt3r-8", term: "dormir", translation: "dormir", example: "Eu durmo às onze." },
    { id: "pt3r-9", term: "sempre", translation: "siempre", example: "Eu sempre acordo cedo." },
    { id: "pt3r-10", term: "nunca", translation: "nunca", example: "Ela nunca chega tarde." },
    { id: "pt3r-11", term: "às vezes", translation: "a veces", example: "Às vezes eu estudo à noite." },
    { id: "pt3r-12", term: "de manhã / à tarde / à noite", translation: "por la manana / tarde / noche", example: "Eu trabalho de manhã." },
  ],

  lessons: [
    {
      id: "pt3r-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: um dia normal",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - O dia do Marco\n" +
          "Eu acordo sempre às sete da manhã. Tomo café da manhã e trabalho num escritório. " +
          "Ao meio-dia eu almoço com os meus colegas. À tarde, continuo a trabalhar. Volto para casa " +
          "às seis. À noite, eu janto e às vezes estudo português. Durmo sempre às onze.\n\n" +
          "TEXTO 2 - A rotina da Lena\n" +
          "A Lena é estudante. Ela nunca acorda tarde: acorda às seis. De manhã ela estuda na universidade " +
          "e à tarde trabalha num café. Ela gosta da rotina dela. Aos fins de semana, ela descansa e visita a família.",
        glossary: [
          { term: "eu acordo", translation: "yo me despierto" },
          { term: "eu trabalho", translation: "yo trabajo" },
          { term: "ao meio-dia", translation: "al mediodia" },
          { term: "volto para casa", translation: "vuelvo a casa" },
          { term: "aos fins de semana", translation: "los fines de semana" },
          { term: "descansa", translation: "descansa" },
          { term: "colegas", translation: "companeros" },
          { term: "cedo / tarde", translation: "temprano / tarde" },
        ],
        keyPhrases: [
          "Fijate en la hora de cada actividad.",
          "Busca los adverbios: sempre, nunca, às vezes.",
        ],
        check: [
          { prompt: "T1: A que horas o Marco acorda?", choices: ["Às seis", "Às sete", "Às onze"], answer: 1 },
          { prompt: "T1: Onde o Marco trabalha?", choices: ["Num café", "Num escritório", "Numa escola"], answer: 1 },
          { prompt: "T1: O que o Marco faz às vezes à noite?", choices: ["Estuda português", "Trabalha", "Dorme cedo"], answer: 0 },
          { prompt: "T2: A Lena acorda tarde?", choices: ["Sim, sempre", "Não, nunca", "Às vezes"], answer: 1 },
          { prompt: "T2: O que a Lena faz à tarde?", choices: ["Estuda", "Trabalha num café", "Dorme"], answer: 1 },
          { prompt: "T2: O que a Lena faz aos fins de semana?", choices: ["Trabalha", "Descansa e visita a família", "Estuda"], answer: 1 },
        ],
      },
      activities: [],
    },

    {
      id: "pt3r-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: ações do dia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "acordar / dormir", translation: "despertar / dormir" },
        { term: "tomar café da manhã", translation: "desayunar" },
        { term: "almoçar / jantar", translation: "almorzar / cenar" },
        { term: "trabalhar / estudar", translation: "trabajar / estudiar" },
        { term: "voltar para casa", translation: "volver a casa" },
        { term: "sempre / nunca / às vezes", translation: "siempre / nunca / a veces" },
        { term: "de manhã / à tarde / à noite", translation: "por la manana / tarde / noche" },
        { term: "cedo / tarde", translation: "temprano / tarde" },
      ],
      activities: [
        {
          id: "pt3r-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "acordar", right: "despertar" },
            { left: "dormir", right: "dormir" },
            { left: "almoçar", right: "almorzar" },
            { left: "jantar", right: "cenar" },
          ] },
        },
        {
          id: "pt3r-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "trabalhar", right: "trabajar" },
            { left: "estudar", right: "estudiar" },
            { left: "sempre", right: "siempre" },
            { left: "nunca", right: "nunca" },
          ] },
        },
        {
          id: "pt3r-vocab-a3", type: "cloze",
          prompt: "Completa: 'Eu ___ às sete da manhã.' (me despierto)",
          payload: { answer: "acordo" },
          explain: "'acordar' -> eu acordo.",
        },
        {
          id: "pt3r-vocab-a4", type: "cloze",
          prompt: "Completa: 'Nós ___ às oito.' (cenamos)",
          payload: { answer: "jantamos" },
          explain: "'jantar' -> nós jantamos.",
        },
        {
          id: "pt3r-vocab-a5", type: "cloze",
          prompt: "Completa: 'Ela ___ chega tarde.' (nunca)",
          payload: { answer: "nunca" },
          explain: "'nunca' = nunca.",
        },
        {
          id: "pt3r-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'a veces'?",
          payload: { choices: ["sempre", "às vezes", "nunca"], answer: 1 },
          explain: "'às vezes' = a veces.",
        },
        {
          id: "pt3r-vocab-a7", type: "multiple_choice",
          prompt: "Cual significa 'desayunar'?",
          payload: { choices: ["almoçar", "tomar café da manhã", "jantar"], answer: 1 },
          explain: "'tomar café da manhã' = desayunar.",
        },
        {
          id: "pt3r-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cedo", "acordo", "sempre", "Eu"], answer: ["Eu", "sempre", "acordo", "cedo"] },
          explain: "El adverbio 'sempre' va antes del verbo.",
        },
      ],
    },

    {
      id: "pt3r-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: presente regular (-ar)",
      intro: "Competencia de GRAMATICA. Conjuga los verbos regulares terminados en -ar.",
      grammar: {
        title: "Presente do indicativo: verbos em -AR",
        chart: {
          title: "TRABALHAR",
          maps: "verbos regulares -AR",
          groups: [
            {
              label: "PRESENTE (-AR)", color: "amber",
              forms: [
                { form: "-O", subjects: "eu (trabalho)" },
                { form: "-A", subjects: "você, ele, ela (trabalha)" },
                { form: "-AMOS", subjects: "nós (trabalhamos)" },
                { form: "-AM", subjects: "vocês, eles, elas (trabalham)" },
              ],
            },
          ],
        },
        form: "eu trabalh*o* / você trabalh*a* / nós trabalh*amos* / eles trabalh*am*",
        desc: "Quita '-ar' y agrega la terminacion segun la persona. Funciona con estudar, almoçar, acordar...",
        rule: "Los verbos regulares en -ar forman el presente asi: eu -o, você/ele/ela -a, nós -amos, vocês/eles/elas -am. Ej: trabalhar -> trabalho, trabalha, trabalhamos, trabalham.",
        examples: ["Eu estudo português.", "Ela trabalha num café.", "Nós almoçamos ao meio-dia.", "Eles acordam cedo."],
        explain: { tr: ["Yo estudio portugues.", "Ella trabaja en un cafe.", "Nosotros almorzamos al mediodia.", "Ellos se despiertan temprano."] },
        mistakes: [
          { wrong: "Eu trabalha muito.", right: "Eu trabalho muito." },
          { wrong: "Nós estuda português.", right: "Nós estudamos português." },
          { wrong: "Eles acorda cedo.", right: "Eles acordam cedo." },
        ],
      },
      activities: [
        {
          id: "pt3r-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ português.' (estudiar)",
          payload: { answer: "estudo" },
          explain: "estudar -> eu estudo.",
        },
        {
          id: "pt3r-gram-a2", type: "cloze",
          prompt: "Completa: 'Ela ___ num escritório.' (trabajar)",
          payload: { answer: "trabalha" },
          explain: "trabalhar -> ela trabalha.",
        },
        {
          id: "pt3r-gram-a3", type: "cloze",
          prompt: "Completa: 'Nós ___ ao meio-dia.' (almorzar)",
          payload: { answer: "almoçamos" },
          explain: "almoçar -> nós almoçamos.",
        },
        {
          id: "pt3r-gram-a4", type: "cloze",
          prompt: "Completa: 'Eles ___ cedo.' (despertar)",
          payload: { answer: "acordam" },
          explain: "acordar -> eles acordam.",
        },
        {
          id: "pt3r-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu trabalha muito.", "Eu trabalho muito.", "Eu trabalhamos muito."], answer: 1 },
          explain: "Con 'eu' -> terminacion -o.",
        },
        {
          id: "pt3r-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Nós estudam português.", "Nós estuda português.", "Nós estudamos português."], answer: 2 },
          explain: "Con 'nós' -> terminacion -amos.",
        },
        {
          id: "pt3r-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["português", "estudo", "Eu"], answer: ["Eu", "estudo", "português"] },
          explain: "Orden: Eu + estudo + português.",
        },
        {
          id: "pt3r-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["cedo", "acordam", "Eles"], answer: ["Eles", "acordam", "cedo"] },
          explain: "Orden: Eles + acordam + cedo.",
        },
      ],
    },

    {
      id: "pt3r-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: a minha rotina",
      intro: "Competencia de ESCRITURA. Escribe tu rutina, frase por frase.",
      activities: [
        {
          id: "pt3r-write-a1", type: "word_bank",
          prompt: "1. Di a que hora te despiertas:",
          payload: { words: ["às", "acordo", "Eu", "sete"], answer: ["Eu", "acordo", "às", "sete"] },
        },
        {
          id: "pt3r-write-a2", type: "word_bank",
          prompt: "2. Di donde trabajas o estudias:",
          payload: { words: ["num", "trabalho", "Eu", "escritório"], answer: ["Eu", "trabalho", "num", "escritório"] },
        },
        {
          id: "pt3r-write-a3", type: "word_bank",
          prompt: "3. Di cuando almuerzas:",
          payload: { words: ["meio-dia", "almoço", "ao", "Eu"], answer: ["Eu", "almoço", "ao", "meio-dia"] },
        },
        {
          id: "pt3r-write-a4", type: "word_bank",
          prompt: "4. Usa un adverbio de frecuencia:",
          payload: { words: ["estudo", "Às vezes", "à noite", "eu"], answer: ["Às vezes", "eu", "estudo", "à noite"] },
        },
        {
          id: "pt3r-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'yo ceno a las ocho'?",
          payload: { choices: ["Eu janto às oito.", "Eu jantam às oito.", "Eu jantar às oito."], answer: 0 },
        },
        {
          id: "pt3r-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Nós estudamos português.", "Nós estuda português.", "Nós estudo português."], answer: 0 },
        },
        {
          id: "pt3r-write-a7", type: "multiple_choice",
          prompt: "7. Como dices 'ella nunca llega tarde'?",
          payload: { choices: ["Ela nunca chega tarde.", "Ela chega nunca tarde.", "Ela nunca chegam tarde."], answer: 0 },
        },
        {
          id: "pt3r-write-a8", type: "multiple_choice",
          prompt: "8. Como dices 'yo duermo a las once'?",
          payload: { choices: ["Eu durmo às onze.", "Eu dorme às onze.", "Eu dormimos às onze."], answer: 0 },
        },
      ],
    },
  ],
};
