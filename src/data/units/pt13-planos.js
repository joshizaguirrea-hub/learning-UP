/**
 * data/units/pt13-planos.js — Unidade A2 pt-BR "Fazer planos" (futuro
 * próximo: ir + infinitivo).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 *
 * POR QUE 'ir + infinitivo' e nao o futuro simples: no portugues falado
 * (especialmente no Brasil), o futuro mais usado NAO e o futuro simples
 * (formal/escrito, tipo 'estudarei'), e sim 'ir' (presente) + infinitivo --
 * a mesma logica do 'going to' em ingles. E a forma que o aluno vai ouvir e
 * precisar usar de verdade no dia a dia.
 */

export const PT13_PLANOS = {
  id: "pt13-planos",
  language: "pt",
  level: "A2",
  title: "Fazer planos",
  subtitle: "Futuro próximo: 'ir' (presente) + infinitivo para hablar de planes",

  cando: [
    "Puedo hablar de planes futuros usando 'ir' + infinitivo.",
    "Puedo conjugar 'ir' en presente para construir el futuro proximo.",
    "Puedo hacer predicciones y promesas simples.",
    "Puedo preguntar sobre los planes de otra persona.",
  ],

  vocab: [
    { id: "pt13p-1", term: "amanhã", translation: "manana", example: "Amanhã vou viajar." },
    { id: "pt13p-2", term: "a próxima semana", translation: "la proxima semana", example: "Na próxima semana vou começar um curso." },
    { id: "pt13p-3", term: "o próximo ano", translation: "el proximo ano", example: "No próximo ano vou estudar mais." },
    { id: "pt13p-4", term: "vou (ir)", translation: "voy a", example: "Vou viajar para o Brasil." },
    { id: "pt13p-5", term: "vai (ir)", translation: "vas/va a", example: "Ela vai estudar inglês." },
    { id: "pt13p-6", term: "vamos (ir)", translation: "vamos a", example: "Vamos visitar os nossos amigos." },
    { id: "pt13p-7", term: "o plano", translation: "el plan", example: "Qual é o seu plano?" },
    { id: "pt13p-8", term: "talvez", translation: "tal vez", example: "Talvez eu vá a Roma." },
    { id: "pt13p-9", term: "com certeza", translation: "seguramente", example: "Com certeza vou te ligar." },
    { id: "pt13p-10", term: "espero que...", translation: "espero que...", example: "Espero que tudo dê certo." },
    { id: "pt13p-11", term: "pretendo (pretender)", translation: "pienso/tengo intencion de", example: "Pretendo mudar de emprego." },
    { id: "pt13p-12", term: "daqui a + tempo", translation: "dentro de (periodo)", example: "Daqui a um mês vou me mudar." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt13p-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: os meus planos",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - Os planos da Elena\n" +
          "Na próxima semana, vou fazer uma viagem para a Bahia. Vou ficar lá por cinco dias e vou conhecer " +
          "todas as praias mais bonitas. No primeiro dia, vou visitar Salvador, depois vou para Porto Seguro. " +
          "Também vou ter tempo para descansar na praia. Com certeza vou comer muito acarajé! Espero que o " +
          "tempo esteja bom.\n\n" +
          "TEXTO 2 - Planos para o próximo ano\n" +
          "A: Quais são seus planos para o próximo ano? B: Vou estudar mais inglês e talvez vou fazer um " +
          "curso de culinária. E você? A: Eu vou mudar de emprego e vou ter mais tempo para a família. " +
          "B: Que ótimo! Você vai ficar mais feliz. A: Espero que sim!",
        glossary: [
          { term: "vou fazer uma viagem", translation: "voy a hacer un viaje" },
          { term: "vou ficar lá", translation: "voy a estar allí" },
          { term: "vou conhecer / vou visitar", translation: "voy a conocer / voy a visitar" },
          { term: "vou ter tempo", translation: "voy a tener tiempo" },
          { term: "os planos", translation: "los planes" },
          { term: "com certeza / talvez", translation: "seguramente / tal vez" },
          { term: "vou mudar de emprego", translation: "voy a cambiar de trabajo" },
          { term: "espero que", translation: "espero que" },
        ],
        keyPhrases: [
          "El futuro proximo en pt-BR se forma con 'ir' (presente) + INFINITIVO -- es la forma mas usada en el habla cotidiana.",
          "'Ir': eu vou, você/ele vai, nós vamos, vocês/eles vão.",
        ],
        check: [
          { prompt: "T1: Para onde vai Elena na próxima semana?", choices: ["Para a Bahia", "Para o Rio", "Para a França"], answer: 0 },
          { prompt: "T1: Quantos dias ela vai ficar lá?", choices: ["Cinco dias", "Três dias", "Uma semana"], answer: 0 },
          { prompt: "T1: O que ela vai fazer no primeiro dia?", choices: ["Vai visitar Salvador", "Vai para Porto Seguro", "Vai descansar na praia"], answer: 0 },
          { prompt: "T2: O que B vai fazer no próximo ano?", choices: ["Vai estudar inglês", "Vai mudar de emprego", "Vai fazer uma viagem"], answer: 0 },
          { prompt: "T2: O que A vai fazer no próximo ano?", choices: ["Vai mudar de emprego", "Vai estudar inglês", "Vai fazer um curso"], answer: 0 },
          { prompt: "T2: Como A vai se sentir?", choices: ["Mais feliz", "Mais cansado", "Mais triste"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt13p-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: o futuro próximo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "amanhã / a próxima semana", translation: "manana / la proxima semana" },
        { term: "o próximo ano", translation: "el proximo ano" },
        { term: "vou / vai", translation: "voy a / vas-va a" },
        { term: "vamos", translation: "vamos a" },
        { term: "o plano", translation: "el plan" },
        { term: "talvez / com certeza", translation: "tal vez / seguramente" },
        { term: "espero que...", translation: "espero que..." },
        { term: "pretendo", translation: "pienso/tengo intencion de" },
      ],
      activities: [
        {
          id: "pt13p-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "vou", right: "voy a" },
            { left: "vai", right: "vas/va a" },
            { left: "vamos", right: "vamos a" },
            { left: "o plano", right: "el plan" },
          ] },
        },
        {
          id: "pt13p-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "talvez", right: "tal vez" },
            { left: "com certeza", right: "seguramente" },
            { left: "espero que", right: "espero que" },
            { left: "pretendo", right: "pienso" },
          ] },
        },
        {
          id: "pt13p-vocab-a3", type: "cloze",
          prompt: "Completa (eu): 'Amanhã eu ___ viajar.' (ir, presente)",
          payload: { answer: "vou" },
          explain: "ir -> eu vou.",
        },
        {
          id: "pt13p-vocab-a4", type: "cloze",
          prompt: "Completa (ela): 'Ela ___ estudar inglês.' (ir, presente)",
          payload: { answer: "vai" },
          explain: "ir -> ela vai.",
        },
        {
          id: "pt13p-vocab-a5", type: "cloze",
          prompt: "Completa (nós): 'Nós ___ visitar os amigos.' (ir, presente)",
          payload: { answer: "vamos" },
          explain: "ir -> nós vamos.",
        },
        {
          id: "pt13p-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'voy a viajar'?",
          payload: { choices: ["Eu vou viajar.", "Eu vai viajar.", "Eu vamos viajar."], answer: 0 },
          explain: "'eu' + 'vou' + infinitivo.",
        },
        {
          id: "pt13p-vocab-a7", type: "multiple_choice",
          prompt: "Qual é a forma de 'ir' para 'eles'?",
          payload: { choices: ["vão", "vai", "vamos"], answer: 0 },
          explain: "ir -> eles vão.",
        },
        {
          id: "pt13p-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["para", "Vou", "Brasil", "o", "viajar"], answer: ["Vou", "viajar", "para", "o", "Brasil"] },
          explain: "'Vou viajar para o Brasil'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt13p-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: futuro próximo (ir + infinitivo)",
      intro: "Competencia de GRAMATICA. Aprende la forma de futuro mas usada en portugues hablado.",
      grammar: {
        title: "Futuro próximo: ir + infinitivo",
        chart: {
          title: "IR + INFINITIVO",
          maps: "presente de 'ir' + verbo principal",
          groups: [
            {
              label: "IR (presente)", color: "rose",
              forms: [
                { form: "VOU", subjects: "eu" },
                { form: "VAI", subjects: "você / ele / ela" },
                { form: "VAMOS", subjects: "nós" },
                { form: "VÃO", subjects: "vocês / eles / elas" },
              ],
            },
            {
              label: "ESTRUTURA", color: "green",
              forms: [
                { form: "IR + INFINITIVO", subjects: "= 'ir a hacer algo'" },
              ],
            },
          ],
        },
        form: "ir (vou, vai, vamos, vão) + infinitivo",
        desc: "El futuro mas usado en el portugues hablado (especialmente en Brasil) NO es el futuro simples (formal/escrito), sino 'ir' (presente) + infinitivo -- igual logica que el ingles 'going to'. Es la forma natural para hablar de planes: 'vou viajar', 'ela vai estudar'.",
        rule: "Ir (presente): eu vou, você/ele/ela vai, nós vamos, vocês/eles/elas vão + infinitivo del verbo principal. Ejemplo: 'Vou visitar meus pais no fim de semana' (voy a visitar a mis padres el fin de semana).",
        examples: ["Vou estudar mais.", "Ela vai viajar amanhã.", "Vamos visitar a família.", "Eles vão fazer uma festa."],
        explain: { tr: ["Voy a estudiar mas.", "Ella va a viajar manana.", "Vamos a visitar a la familia.", "Ellos van a hacer una fiesta."] },
        mistakes: [
          { wrong: "Eu vou a viajar.", right: "Eu vou viajar." },
          { wrong: "Ela vai estudiar.", right: "Ela vai estudar." },
          { wrong: "Nós vai visitar.", right: "Nós vamos visitar." },
        ],
      },
      activities: [
        {
          id: "pt13p-gram-a1", type: "cloze",
          prompt: "Completa: 'Eu ___ estudar mais.' (ir, presente)",
          payload: { answer: "vou" },
          explain: "ir -> eu vou.",
        },
        {
          id: "pt13p-gram-a2", type: "cloze",
          prompt: "Completa: 'Ela ___ viajar amanhã.' (ir, presente)",
          payload: { answer: "vai" },
          explain: "ir -> ela vai.",
        },
        {
          id: "pt13p-gram-a3", type: "cloze",
          prompt: "Completa: 'Eles ___ fazer uma festa.' (ir, presente)",
          payload: { answer: "vão" },
          explain: "ir -> eles vão.",
        },
        {
          id: "pt13p-gram-a4", type: "multiple_choice",
          prompt: "Qual é correto para 'voy a estudiar'?",
          payload: { choices: ["Vou a estudar.", "Vou estudar.", "Vou estudiar."], answer: 1 },
          explain: "Sin preposicion 'a' entre ir e infinitivo.",
        },
        {
          id: "pt13p-gram-a5", type: "multiple_choice",
          prompt: "Qual é a forma de 'ir' para 'nós'?",
          payload: { choices: ["vamos", "vai", "vão"], answer: 0 },
          explain: "ir -> nós vamos.",
        },
        {
          id: "pt13p-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Nós vai visitar a família.", "Nós vamos visitar a família.", "Nós vão visitar a família."], answer: 1 },
          explain: "'nós' -> 'vamos'.",
        },
        {
          id: "pt13p-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Vamos", "família", "visitar"], answer: ["Vamos", "visitar", "a", "família"] },
          explain: "'Vamos visitar a família'.",
        },
        {
          id: "pt13p-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["uma", "Eles", "festa", "vão", "fazer"], answer: ["Eles", "vão", "fazer", "uma", "festa"] },
          explain: "'Eles vão fazer uma festa'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt13p-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: os seus planos",
      intro: "Competencia de ESCRITURA. Cuenta tus planes futuros, frase por frase.",
      activities: [
        {
          id: "pt13p-write-a1", type: "word_bank",
          prompt: "1. Di que manana vas a viajar (eu):",
          payload: { words: ["viajar", "Amanhã", "vou"], answer: ["Amanhã", "vou", "viajar"] },
        },
        {
          id: "pt13p-write-a2", type: "word_bank",
          prompt: "2. Di que vas a ser feliz (eu):",
          payload: { words: ["feliz", "Vou", "ser"], answer: ["Vou", "ser", "feliz"] },
        },
        {
          id: "pt13p-write-a3", type: "word_bank",
          prompt: "3. Di que ellos van a hacer una fiesta:",
          payload: { words: ["uma", "Eles", "festa", "vão", "fazer"], answer: ["Eles", "vão", "fazer", "uma", "festa"] },
        },
        {
          id: "pt13p-write-a4", type: "word_bank",
          prompt: "4. Di que vas a tener mas tiempo (voce):",
          payload: { words: ["tempo", "Você", "mais", "vai", "ter"], answer: ["Você", "vai", "ter", "mais", "tempo"] },
        },
        {
          id: "pt13p-write-a5", type: "word_bank",
          prompt: "5. Pregunta cuales son sus planes (seus, informal):",
          payload: { words: ["são", "Quais", "planos", "seus"], answer: ["Quais", "são", "seus", "planos"] },
        },
        {
          id: "pt13p-write-a6", type: "multiple_choice",
          prompt: "6. El futuro con 'ir' para 'nós' es:",
          payload: { choices: ["vamos", "vai", "vão"], answer: 0 },
        },
        {
          id: "pt13p-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["Vou visitar meus amigos amanhã.", "Vou a visitar meus amigos amanhã.", "Vou visitando meus amigos amanhã."], answer: 0 },
        },
        {
          id: "pt13p-write-a8", type: "multiple_choice",
          prompt: "8. 'Vamos fazer uma viagem' significa:",
          payload: { choices: ["Vamos a hacer un viaje", "Hicimos un viaje", "Hacemos un viaje"], answer: 0 },
        },
      ],
    },
  ],
};
