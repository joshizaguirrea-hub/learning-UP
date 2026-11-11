/**
 * data/units/pt12-saude.js — Unidade A2 pt-BR "A saúde" (dever + estar com
 * dor de, vocabulario de sintomas).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT12_SAUDE = {
  id: "pt12-saude",
  language: "pt",
  level: "A2",
  title: "A saúde",
  subtitle: "'Dever' para consejos/obligaciones + 'estar com dor de' para sintomas",

  cando: [
    "Puedo hablar de sintomas usando 'estar com dor de' + parte del cuerpo.",
    "Puedo usar 'dever' para dar o recibir consejos medicos (devo, deve, devemos).",
    "Puedo nombrar partes del cuerpo comunes.",
    "Puedo describir un problema de salud y pedir una consulta.",
  ],

  vocab: [
    { id: "pt12s-1", term: "estar com dor de cabeça", translation: "tener dolor de cabeza", example: "Estou com dor de cabeça." },
    { id: "pt12s-2", term: "a cabeça", translation: "la cabeza", example: "Minha cabeça dói muito." },
    { id: "pt12s-3", term: "o estômago", translation: "el estomago", example: "Estou com dor de estômago." },
    { id: "pt12s-4", term: "a garganta", translation: "la garganta", example: "Estou com dor de garganta." },
    { id: "pt12s-5", term: "a febre", translation: "la fiebre", example: "Estou com febre alta." },
    { id: "pt12s-6", term: "estar resfriado", translation: "estar resfriado", example: "Estou resfriado." },
    { id: "pt12s-7", term: "dever (devo/deve)", translation: "deber (debo/debe)", example: "Você deve ir ao médico." },
    { id: "pt12s-8", term: "o médico", translation: "el doctor", example: "O médico me examinou." },
    { id: "pt12s-9", term: "a farmácia", translation: "la farmacia", example: "Vou à farmácia comprar remédio." },
    { id: "pt12s-10", term: "descansar", translation: "descansar", example: "Você deve descansar um pouco." },
    { id: "pt12s-11", term: "tomar um remédio", translation: "tomar un medicamento", example: "Preciso tomar um remédio." },
    { id: "pt12s-12", term: "sentir-se mal", translation: "sentirse mal", example: "Estou me sentindo mal hoje." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt12s-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: no médico",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - No médico\n" +
          "\"Bom dia doutor, não estou me sentindo bem.\" \"O que você está sentindo?\" \"Estou com dor de " +
          "garganta e um pouco de febre.\" \"Você também está com dor de cabeça?\" \"Sim, um pouco.\" " +
          "\"Entendo. Você deve descansar e beber bastante água. Você também deve tomar este remédio três " +
          "vezes ao dia. Se em três dias você não melhorar, deve voltar.\" \"Obrigado, doutor!\"\n\n" +
          "TEXTO 2 - Uma mensagem para uma amiga\n" +
          "Oi Sara, hoje eu não vou trabalhar porque estou me sentindo mal. Estou com dor de estômago e " +
          "estou resfriado. Acho que devo ir à farmácia comprar um remédio. Se amanhã eu não melhorar, " +
          "devo ir ao médico. Até logo!",
        glossary: [
          { term: "estar com dor de", translation: "tener dolor de" },
          { term: "estou com febre", translation: "tengo fiebre" },
          { term: "você deve descansar", translation: "debes descansar" },
          { term: "tomar um remédio", translation: "tomar un medicamento" },
          { term: "não estou me sentindo bem", translation: "no me siento bien" },
          { term: "estar resfriado", translation: "estar resfriado" },
          { term: "melhorar", translation: "mejorar" },
          { term: "vou trabalhar", translation: "voy a trabajar" },
        ],
        keyPhrases: [
          "'Estar com dor de' + parte del cuerpo = tener dolor de X.",
          "'Dever' (devo/deve/devemos/devem) + infinitivo = deber / tener que.",
        ],
        check: [
          { prompt: "T1: O que o paciente tem?", choices: ["Dor de garganta e febre", "Dor de estômago", "Resfriado"], answer: 0 },
          { prompt: "T1: O que o paciente deve fazer?", choices: ["Descansar e beber água", "Ir ao hospital", "Fazer exercício"], answer: 0 },
          { prompt: "T1: Quantas vezes ao dia deve tomar o remédio?", choices: ["Três vezes", "Duas vezes", "Uma vez"], answer: 0 },
          { prompt: "T2: Por que ela não vai trabalhar?", choices: ["Porque está se sentindo mal", "Porque está de férias", "Porque está chovendo"], answer: 0 },
          { prompt: "T2: O que está doendo nela?", choices: ["O estômago", "A cabeça", "A garganta"], answer: 0 },
          { prompt: "T2: Onde ela deve ir se não melhorar?", choices: ["Ao médico", "À farmácia", "À escola"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt12s-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: os sintomas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "estar com dor de / a cabeça", translation: "tener dolor de / la cabeza" },
        { term: "o estômago / a garganta", translation: "el estomago / la garganta" },
        { term: "a febre / estar resfriado", translation: "la fiebre / estar resfriado" },
        { term: "dever (devo/deve)", translation: "deber (debo/debe)" },
        { term: "o médico / a farmácia", translation: "el doctor / la farmacia" },
        { term: "descansar", translation: "descansar" },
        { term: "tomar um remédio", translation: "tomar un medicamento" },
        { term: "sentir-se mal", translation: "sentirse mal" },
      ],
      activities: [
        {
          id: "pt12s-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "estar com dor de", right: "tener dolor de" },
            { left: "a cabeça", right: "la cabeza" },
            { left: "o estômago", right: "el estomago" },
            { left: "a garganta", right: "la garganta" },
          ] },
        },
        {
          id: "pt12s-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "a febre", right: "la fiebre" },
            { left: "estar resfriado", right: "estar resfriado" },
            { left: "descansar", right: "descansar" },
            { left: "o médico", right: "el doctor" },
          ] },
        },
        {
          id: "pt12s-vocab-a3", type: "cloze",
          prompt: "Completa: 'Estou com dor de ___.' (cabeza)",
          payload: { answer: "cabeça" },
          explain: "'dor de cabeça' = dolor de cabeza.",
        },
        {
          id: "pt12s-vocab-a4", type: "cloze",
          prompt: "Completa: 'Você ___ ir ao médico.' (dever, você)",
          payload: { answer: "deve" },
          explain: "dever -> você: 'deve'.",
        },
        {
          id: "pt12s-vocab-a5", type: "cloze",
          prompt: "Completa: 'Estou com ___.' (fiebre)",
          payload: { answer: "febre" },
          explain: "'a febre' = la fiebre.",
        },
        {
          id: "pt12s-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'me duele el estomago'?",
          payload: { choices: ["Estou com dor de estômago.", "Tenho o estômago.", "Sou o estômago."], answer: 0 },
          explain: "'estar com dor de' + parte del cuerpo.",
        },
        {
          id: "pt12s-vocab-a7", type: "multiple_choice",
          prompt: "O que significa 'descansar'?",
          payload: { choices: ["trabajar", "descansar", "comer"], answer: 1 },
          explain: "'descansar' = descansar.",
        },
        {
          id: "pt12s-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["de", "Estou", "cabeça", "com", "dor"], answer: ["Estou", "com", "dor", "de", "cabeça"] },
          explain: "'Estou com dor de cabeça'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt12s-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: dever + estar com dor de",
      intro: "Competencia de GRAMATICA. Aprende 'dever' (consejos/obligaciones) y como hablar de sintomas.",
      grammar: {
        title: "Dever + estar com dor de",
        chart: {
          title: "DEVER",
          maps: "+ infinitivo",
          groups: [
            {
              label: "DEVER (presente)", color: "rose",
              forms: [
                { form: "DEVO", subjects: "eu" },
                { form: "DEVE", subjects: "você / ele / ela" },
                { form: "DEVEMOS", subjects: "nós" },
                { form: "DEVEM", subjects: "vocês / eles / elas" },
              ],
            },
            {
              label: "ESTAR COM DOR DE", color: "green",
              forms: [
                { form: "ESTOU COM DOR DE + parte do corpo", subjects: "tengo dolor de..." },
              ],
            },
          ],
        },
        form: "dever (devo, deve, devemos, devem) + infinitivo = deber/tener que",
        desc: "'Dever' es un verbo regular -ER que se usa para dar consejos o hablar de obligaciones: 'você deve descansar' (debes descansar). Para hablar de sintomas se usa 'estar com dor de' + parte del cuerpo: 'estou com dor de cabeça' (tengo dolor de cabeza).",
        rule: "Dever (regular -er): eu devo, você/ele/ela deve, nós devemos, vocês/eles/elas devem + infinitivo. Estar com dor de + sustantivo (sin articulo generalmente): estou com dor de cabeça, estou com dor de estômago.",
        examples: ["Você deve beber bastante água.", "Ele deve ir ao médico.", "Estou com dor de garganta.", "Estamos com dor de cabeça."],
        explain: { tr: ["Debes beber bastante agua.", "El debe ir al doctor.", "Tengo dolor de garganta.", "Tenemos dolor de cabeza."] },
        mistakes: [
          { wrong: "Você deve a descansar.", right: "Você deve descansar." },
          { wrong: "Tenho dor de cabeça com.", right: "Estou com dor de cabeça." },
          { wrong: "Eu dever ir.", right: "Eu devo ir." },
        ],
      },
      activities: [
        {
          id: "pt12s-gram-a1", type: "cloze",
          prompt: "Completa: 'Você ___ descansar.' (dever)",
          payload: { answer: "deve" },
          explain: "dever -> você: 'deve'.",
        },
        {
          id: "pt12s-gram-a2", type: "cloze",
          prompt: "Completa: 'Ela ___ tomar um remédio.' (dever)",
          payload: { answer: "deve" },
          explain: "dever -> ela: 'deve'.",
        },
        {
          id: "pt12s-gram-a3", type: "cloze",
          prompt: "Completa: 'Estou com dor de ___.' (garganta)",
          payload: { answer: "garganta" },
          explain: "'dor de garganta' = dolor de garganta.",
        },
        {
          id: "pt12s-gram-a4", type: "multiple_choice",
          prompt: "Como se diz 'me duelen los pies' (os pés)?",
          payload: { choices: ["Estou com dor nos pés.", "Tenho dor pés.", "Sou dor nos pés."], answer: 0 },
          explain: "'estar com dor' + em + parte del cuerpo.",
        },
        {
          id: "pt12s-gram-a5", type: "multiple_choice",
          prompt: "Qual é a forma correta para 'nós'?",
          payload: { choices: ["Devemos descansar.", "Devêm descansar.", "Devamos descansar."], answer: 0 },
          explain: "dever -> nós: 'devemos'.",
        },
        {
          id: "pt12s-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Você deve ir ao médico.", "Você deve de ir ao médico.", "Você dever ir ao médico."], answer: 0 },
          explain: "'Deve' + infinito, sin preposicion.",
        },
        {
          id: "pt12s-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["água", "Você", "beber", "deve"], answer: ["Você", "deve", "beber", "água"] },
          explain: "'Você deve beber água'.",
        },
        {
          id: "pt12s-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["nos", "Estou", "pés", "com", "dor"], answer: ["Estou", "com", "dor", "nos", "pés"] },
          explain: "'Estou com dor nos pés'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt12s-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: no médico",
      intro: "Competencia de ESCRITURA. Describe un problema de salud, frase por frase.",
      activities: [
        {
          id: "pt12s-write-a1", type: "word_bank",
          prompt: "1. Di que tienes dolor de cabeza:",
          payload: { words: ["de", "Estou", "cabeça", "com", "dor"], answer: ["Estou", "com", "dor", "de", "cabeça"] },
        },
        {
          id: "pt12s-write-a2", type: "word_bank",
          prompt: "2. Di que debes descansar:",
          payload: { words: ["descansar", "Devo"], answer: ["Devo", "descansar"] },
        },
        {
          id: "pt12s-write-a3", type: "word_bank",
          prompt: "3. Di que tienes fiebre:",
          payload: { words: ["febre", "Estou", "com"], answer: ["Estou", "com", "febre"] },
        },
        {
          id: "pt12s-write-a4", type: "word_bank",
          prompt: "4. Di que debe ir al doctor (ela):",
          payload: { words: ["ao", "Ela", "médico", "deve", "ir"], answer: ["Ela", "deve", "ir", "ao", "médico"] },
        },
        {
          id: "pt12s-write-a5", type: "word_bank",
          prompt: "5. Pregunta que esta sintiendo (voce):",
          payload: { words: ["sentindo", "O", "está", "que", "você"], answer: ["O", "que", "você", "está", "sentindo"] },
        },
        {
          id: "pt12s-write-a6", type: "multiple_choice",
          prompt: "6. 'Estou com dor de estômago' significa:",
          payload: { choices: ["me duele el estomago", "tengo hambre", "estoy enfermo del corazon"], answer: 0 },
        },
        {
          id: "pt12s-write-a7", type: "multiple_choice",
          prompt: "7. A forma de 'dever' para 'eles' é:",
          payload: { choices: ["devem", "deve", "devemos"], answer: 0 },
        },
        {
          id: "pt12s-write-a8", type: "multiple_choice",
          prompt: "8. 'Você deve descansar' significa:",
          payload: { choices: ["debes trabajar", "debes descansar", "debes comer"], answer: 1 },
        },
      ],
    },
  ],
};
