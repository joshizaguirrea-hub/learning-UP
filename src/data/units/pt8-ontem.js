/**
 * data/units/pt8-ontem.js — Unidade A1 pt-BR "Ontem" (pretérito perfeito regular).
 */

export const PT8_ONTEM = {
  id: "pt8-ontem",
  language: "pt",
  level: "A1",
  title: "Ontem",
  subtitle: "Contar lo que hiciste ayer con el preterito (pasado)",

  cando: [
    "Puedo contar acciones pasadas con el preterito perfeito.",
    "Puedo conjugar verbos regulares -ar en pasado.",
    "Puedo usar marcadores de tiempo (ontem, na semana passada).",
    "Puedo narrar un dia sencillo en pasado.",
  ],

  vocab: [
    { id: "pt8o-1", term: "ontem", translation: "ayer", example: "Ontem eu trabalhei muito." },
    { id: "pt8o-2", term: "hoje / amanhã", translation: "hoy / manana", example: "Hoje estou cansado." },
    { id: "pt8o-3", term: "na semana passada", translation: "la semana pasada", example: "Na semana passada viajei." },
    { id: "pt8o-4", term: "de manhã / à noite", translation: "por la manana / noche", example: "Ontem à noite jantei fora." },
    { id: "pt8o-5", term: "trabalhei", translation: "trabaje", example: "Eu trabalhei ontem." },
    { id: "pt8o-6", term: "estudei", translation: "estudie", example: "Eu estudei português." },
    { id: "pt8o-7", term: "visitei", translation: "visite", example: "Eu visitei a minha avó." },
    { id: "pt8o-8", term: "comprei", translation: "compre", example: "Eu comprei uma camisa." },
    { id: "pt8o-9", term: "cheguei", translation: "llegue", example: "Cheguei tarde a casa." },
    { id: "pt8o-10", term: "gostei", translation: "me gusto", example: "Eu gostei muito do filme." },
    { id: "pt8o-11", term: "cansado / feliz", translation: "cansado / feliz", example: "Fiquei feliz ontem." },
    { id: "pt8o-12", term: "depois / então", translation: "despues / entonces", example: "Depois, fui para casa." },
  ],

  lessons: [
    {
      id: "pt8o-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: o dia de ontem",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - O sábado do Hugo\n" +
          "Ontem foi sábado. De manhã, eu acordei tarde e tomei café da manhã com calma. Depois, visitei a " +
          "minha avó e almocei com ela. À tarde, comprei uns sapatos novos numa loja. À noite, jantei num " +
          "restaurante com os meus amigos. Gostei muito do dia!\n\n" +
          "TEXTO 2 - A semana passada da Rita\n" +
          "Na semana passada, eu estudei muito para um exame. Trabalhei de segunda a sexta e à noite estudei " +
          "português. No sábado, descansei e visitei a família. No domingo, cheguei cedo ao parque e caminhei " +
          "muito. Foi uma semana cansativa, mas boa.",
        glossary: [
          { term: "ontem", translation: "ayer" },
          { term: "na semana passada", translation: "la semana pasada" },
          { term: "acordei / tomei", translation: "me desperte / tome" },
          { term: "visitei / almocei", translation: "visite / almorce" },
          { term: "comprei / jantei", translation: "compre / cene" },
          { term: "gostei muito", translation: "me gusto mucho" },
          { term: "depois", translation: "despues" },
          { term: "cansativa", translation: "cansada (jornada)" },
        ],
        keyPhrases: [
          "Fijate en las terminaciones del pasado: -ei, -ou.",
          "Ordena las acciones del dia del Hugo.",
        ],
        check: [
          { prompt: "T1: Quando o Hugo acordou?", choices: ["Cedo", "Tarde", "Ao meio-dia"], answer: 1 },
          { prompt: "T1: Quem o Hugo visitou?", choices: ["A avó", "O amigo", "O pai"], answer: 0 },
          { prompt: "T1: O que o Hugo comprou?", choices: ["Uma camisa", "Uns sapatos", "Um livro"], answer: 1 },
          { prompt: "T2: Para que a Rita estudou?", choices: ["Para um exame", "Para o trabalho", "Para uma viagem"], answer: 0 },
          { prompt: "T2: O que a Rita fez no sábado?", choices: ["Trabalhou", "Descansou e visitou a família", "Estudou"], answer: 1 },
          { prompt: "T2: Como foi a semana da Rita?", choices: ["Fácil", "Cansativa mas boa", "Aborrecida"], answer: 1 },
        ],
      },
      activities: [],
    },

    {
      id: "pt8o-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: ações no passado",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "ontem / hoje / amanhã", translation: "ayer / hoy / manana" },
        { term: "na semana passada", translation: "la semana pasada" },
        { term: "trabalhei / estudei", translation: "trabaje / estudie" },
        { term: "visitei / comprei", translation: "visite / compre" },
        { term: "cheguei / gostei", translation: "llegue / me gusto" },
        { term: "depois / então", translation: "despues / entonces" },
        { term: "cansado / feliz", translation: "cansado / feliz" },
        { term: "de manhã / à noite", translation: "por la manana / noche" },
      ],
      activities: [
        {
          id: "pt8o-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "ontem", right: "ayer" },
            { left: "hoje", right: "hoy" },
            { left: "amanhã", right: "manana" },
            { left: "depois", right: "despues" },
          ] },
        },
        {
          id: "pt8o-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "trabalhei", right: "trabaje" },
            { left: "estudei", right: "estudie" },
            { left: "comprei", right: "compre" },
            { left: "gostei", right: "me gusto" },
          ] },
        },
        {
          id: "pt8o-vocab-a3", type: "cloze",
          prompt: "Completa: '___ eu trabalhei muito.' (ayer)",
          payload: { answer: "Ontem" },
          explain: "'ontem' = ayer.",
        },
        {
          id: "pt8o-vocab-a4", type: "cloze",
          prompt: "Completa: 'Eu ___ uns sapatos.' (compre)",
          payload: { answer: "comprei" },
          explain: "comprar -> eu comprei.",
        },
        {
          id: "pt8o-vocab-a5", type: "cloze",
          prompt: "Completa: 'Eu ___ muito do filme.' (me gusto)",
          payload: { answer: "gostei" },
          explain: "gostar -> eu gostei.",
        },
        {
          id: "pt8o-vocab-a6", type: "multiple_choice",
          prompt: "Como dices 'la semana pasada'?",
          payload: { choices: ["ontem", "na semana passada", "amanhã"], answer: 1 },
          explain: "'na semana passada' = la semana pasada.",
        },
        {
          id: "pt8o-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'depois'?",
          payload: { choices: ["antes", "despues", "ahora"], answer: 1 },
          explain: "'depois' = despues.",
        },
        {
          id: "pt8o-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["ontem", "trabalhei", "Eu"], answer: ["Eu", "trabalhei", "ontem"] },
          explain: "'Eu trabalhei ontem' = yo trabaje ayer.",
        },
      ],
    },

    {
      id: "pt8o-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: pretérito perfeito (-ar)",
      intro: "Competencia de GRAMATICA. Conjuga los verbos regulares -ar en pasado.",
      grammar: {
        title: "Pretérito perfeito: verbos em -AR",
        chart: {
          title: "TRABALHAR (passado)",
          maps: "pasado (yo trabaje...)",
          groups: [
            {
              label: "PRESENTE", color: "amber",
              forms: [
                { form: "-O / -A", subjects: "eu trabalho / ele trabalha" },
              ],
            },
            {
              label: "PASSADO (-AR)", color: "green",
              forms: [
                { form: "-EI", subjects: "eu (trabalhei)" },
                { form: "-OU", subjects: "você, ele, ela (trabalhou)" },
                { form: "-AMOS", subjects: "nós (trabalhámos)" },
                { form: "-ARAM", subjects: "vocês, eles, elas (trabalharam)" },
              ],
            },
          ],
        },
        form: "eu trabalh*ei* / ele trabalh*ou* / eles trabalh*aram*",
        desc: "Quita '-ar' y agrega la terminacion de pasado. Sirve para estudar, visitar, comprar...",
        rule: "Preterito perfeito de verbos -ar: eu -ei, você/ele/ela -ou, nós -amos, vocês/eles/elas -aram. Ej: estudar -> estudei, estudou, estudámos, estudaram.",
        examples: ["Eu estudei ontem.", "Ela visitou a avó.", "Nós comprámos comida.", "Eles trabalharam muito."],
        explain: { tr: ["Yo estudie ayer.", "Ella visito a la abuela.", "Nosotros compramos comida.", "Ellos trabajaron mucho."] },
        mistakes: [
          { wrong: "Eu trabalhou ontem.", right: "Eu trabalhei ontem." },
          { wrong: "Ela estudei muito.", right: "Ela estudou muito." },
          { wrong: "Eles comprou comida.", right: "Eles compraram comida." },
        ],
      },
      activities: [
        {
          id: "pt8o-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ ontem.' (trabajar, pasado)",
          payload: { answer: "trabalhei" },
          explain: "eu + trabalhar (pasado) -> trabalhei.",
        },
        {
          id: "pt8o-gram-a2", type: "cloze",
          prompt: "Completa: 'Ela ___ a avó.' (visitar, pasado)",
          payload: { answer: "visitou" },
          explain: "ela + visitar (pasado) -> visitou.",
        },
        {
          id: "pt8o-gram-a3", type: "cloze",
          prompt: "Completa: 'Eu ___ português.' (estudiar, pasado)",
          payload: { answer: "estudei" },
          explain: "eu + estudar (pasado) -> estudei.",
        },
        {
          id: "pt8o-gram-a4", type: "cloze",
          prompt: "Completa: 'Eles ___ muito.' (trabajar, pasado)",
          payload: { answer: "trabalharam" },
          explain: "eles + trabalhar (pasado) -> trabalharam.",
        },
        {
          id: "pt8o-gram-a5", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu trabalhou ontem.", "Eu trabalhei ontem.", "Eu trabalharam ontem."], answer: 1 },
          explain: "Con 'eu' (pasado) -> -ei.",
        },
        {
          id: "pt8o-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Ela estudei muito.", "Ela estudou muito.", "Ela estudaram muito."], answer: 1 },
          explain: "Con 'ela' (pasado) -> -ou.",
        },
        {
          id: "pt8o-gram-a7", type: "word_bank",
          prompt: "Ordena la frase (pasado):",
          payload: { words: ["ontem", "comprei", "sapatos", "Eu"], answer: ["Eu", "comprei", "sapatos", "ontem"] },
          explain: "Orden: Eu + comprei + sapatos + ontem.",
        },
        {
          id: "pt8o-gram-a8", type: "word_bank",
          prompt: "Ordena la frase (pasado):",
          payload: { words: ["avó", "visitou", "a", "Ela"], answer: ["Ela", "visitou", "a", "avó"] },
          explain: "Orden: Ela + visitou + a + avó.",
        },
      ],
    },

    {
      id: "pt8o-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: o que fiz ontem",
      intro: "Competencia de ESCRITURA. Cuenta tu dia de ayer en pasado, frase por frase.",
      activities: [
        {
          id: "pt8o-write-a1", type: "word_bank",
          prompt: "1. Di que trabajaste o estudiaste ayer:",
          payload: { words: ["ontem", "estudei", "Eu"], answer: ["Eu", "estudei", "ontem"] },
        },
        {
          id: "pt8o-write-a2", type: "word_bank",
          prompt: "2. Di a quien visitaste:",
          payload: { words: ["a", "visitei", "avó", "Eu", "minha"], answer: ["Eu", "visitei", "a", "minha", "avó"] },
        },
        {
          id: "pt8o-write-a3", type: "word_bank",
          prompt: "3. Di que compraste:",
          payload: { words: ["sapatos", "comprei", "Eu"], answer: ["Eu", "comprei", "sapatos"] },
        },
        {
          id: "pt8o-write-a4", type: "word_bank",
          prompt: "4. Di si te gusto el dia:",
          payload: { words: ["dia", "do", "gostei", "Eu"], answer: ["Eu", "gostei", "do", "dia"] },
        },
        {
          id: "pt8o-write-a5", type: "multiple_choice",
          prompt: "5. Como dices 'yo trabaje ayer'?",
          payload: { choices: ["Eu trabalho ontem.", "Eu trabalhei ontem.", "Eu trabalhou ontem."], answer: 1 },
        },
        {
          id: "pt8o-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'ella visito a la abuela'?",
          payload: { choices: ["Ela visitei a avó.", "Ela visitou a avó.", "Ela visitaram a avó."], answer: 1 },
        },
        {
          id: "pt8o-write-a7", type: "multiple_choice",
          prompt: "7. Cual marcador indica pasado?",
          payload: { choices: ["amanhã", "ontem", "hoje"], answer: 1 },
        },
        {
          id: "pt8o-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase es correcta?",
          payload: { choices: ["Eles compraram comida.", "Eles comprou comida.", "Eles comprei comida."], answer: 0 },
        },
      ],
    },
  ],
};
