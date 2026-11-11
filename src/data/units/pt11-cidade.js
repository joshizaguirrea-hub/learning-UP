/**
 * data/units/pt11-cidade.js — Unidade A2 pt-BR "Na cidade" (imperativo com
 * 'você' para dar indicações + preposições de lugar).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT11_CIDADE = {
  id: "pt11-cidade",
  language: "pt",
  level: "A2",
  title: "Na cidade",
  subtitle: "Imperativo (você): vire, siga, pegue para dar direcciones + preposiciones de lugar",

  cando: [
    "Puedo preguntar y dar direcciones en portugues.",
    "Puedo usar el imperativo (voce) para indicar un camino: vire, siga, pegue.",
    "Puedo usar preposiciones de lugar (à direita, em frente a, atrás de, perto de).",
    "Puedo describir donde esta algo en la ciudad con 'tem' / 'há'.",
  ],

  vocab: [
    { id: "pt11c-1", term: "vire (virar)", translation: "gira/dobla", example: "Vire à direita." },
    { id: "pt11c-2", term: "siga (seguir)", translation: "sigue", example: "Siga em frente." },
    { id: "pt11c-3", term: "pegue (pegar)", translation: "toma", example: "Pegue a primeira rua à esquerda." },
    { id: "pt11c-4", term: "à direita", translation: "a la derecha", example: "O banco fica à direita." },
    { id: "pt11c-5", term: "à esquerda", translation: "a la izquierda", example: "Vire à esquerda no sinal." },
    { id: "pt11c-6", term: "em frente", translation: "derecho (recto)", example: "Continue em frente até a praça." },
    { id: "pt11c-7", term: "o cruzamento", translation: "el cruce", example: "No cruzamento, vire à direita." },
    { id: "pt11c-8", term: "o sinal", translation: "el semaforo", example: "No sinal, siga em frente." },
    { id: "pt11c-9", term: "perto de", translation: "cerca de", example: "A farmácia fica perto do banco." },
    { id: "pt11c-10", term: "em frente a", translation: "delante de", example: "Há um parque em frente à escola." },
    { id: "pt11c-11", term: "atrás de", translation: "detras de", example: "O museu fica atrás da igreja." },
    { id: "pt11c-12", term: "com licença, onde fica...?", translation: "disculpe, donde queda...?", example: "Com licença, onde fica a estação?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt11c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: como chegar ao museu",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - Como chegar ao museu\n" +
          "\"Com licença, onde fica o museu?\" \"Então, daqui siga em frente por dois quarteirões. No " +
          "cruzamento, vire à direita. Depois, pegue a primeira rua à esquerda. O museu fica em frente à " +
          "praça, perto do banco. Você não pode errar!\" \"Muito obrigado!\" \"De nada, boa visita!\"\n\n" +
          "TEXTO 2 - Uma cidade nova\n" +
          "Hoje cheguei numa cidade nova e não conheço nada. Perto do meu hotel tem uma farmácia pequena e, " +
          "atrás do hotel, tem um parque bonito. Para ir ao centro, preciso virar à esquerda no sinal e " +
          "depois seguir em frente. Amanhã quero visitar o museu que fica em frente à estação.",
        glossary: [
          { term: "siga em frente", translation: "sigue derecho" },
          { term: "vire à direita/esquerda", translation: "gira a la derecha/izquierda" },
          { term: "o cruzamento", translation: "el cruce" },
          { term: "perto de / em frente a / atrás de", translation: "cerca de / delante de / detras de" },
          { term: "com licença, onde fica...?", translation: "disculpe, donde queda...?" },
          { term: "você não pode errar!", translation: "no puedes equivocarte!" },
          { term: "conheço", translation: "conozco" },
          { term: "preciso virar", translation: "necesito girar" },
        ],
        keyPhrases: [
          "El imperativo formal (você) usa la forma del subjuntivo: virar->vire, ir->vá, seguir->siga, pegar->pegue.",
          "'Tem' (hay, coloquial) o 'há' (hay, formal) para decir que algo EXISTE en un lugar.",
        ],
        check: [
          { prompt: "T1: O que a pessoa deve fazer no cruzamento?", choices: ["Virar à direita", "Virar à esquerda", "Seguir em frente"], answer: 0 },
          { prompt: "T1: Onde fica o museu?", choices: ["Em frente à praça", "Atrás do banco", "Perto do sinal"], answer: 0 },
          { prompt: "T1: Quantos quarteirões deve seguir em frente no início?", choices: ["Dois quarteirões", "Três quarteirões", "Um quarteirão"], answer: 0 },
          { prompt: "T2: O que tem perto do hotel?", choices: ["Uma farmácia", "Um museu", "Um banco"], answer: 0 },
          { prompt: "T2: O que tem atrás do hotel?", choices: ["Um parque", "Uma igreja", "Uma escola"], answer: 0 },
          { prompt: "T2: Onde fica o museu que a pessoa quer visitar?", choices: ["Em frente à estação", "Atrás do parque", "Perto da farmácia"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt11c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: as indicações",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "vire / siga", translation: "gira / sigue" },
        { term: "pegue", translation: "toma" },
        { term: "à direita / à esquerda", translation: "a la derecha / izquierda" },
        { term: "o cruzamento / o sinal", translation: "el cruce / el semaforo" },
        { term: "perto de / em frente a", translation: "cerca de / delante de" },
        { term: "atrás de", translation: "detras de" },
        { term: "com licença, onde fica...?", translation: "disculpe, donde queda?" },
        { term: "você não pode errar!", translation: "no puedes equivocarte!" },
      ],
      activities: [
        {
          id: "pt11c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "vire", right: "gira" },
            { left: "siga", right: "sigue" },
            { left: "pegue", right: "toma" },
            { left: "à direita", right: "a la derecha" },
          ] },
        },
        {
          id: "pt11c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "à esquerda", right: "a la izquierda" },
            { left: "o cruzamento", right: "el cruce" },
            { left: "o sinal", right: "el semaforo" },
            { left: "perto de", right: "cerca de" },
          ] },
        },
        {
          id: "pt11c-vocab-a3", type: "cloze",
          prompt: "Completa: '___ à direita no sinal.' (virar, imperativo)",
          payload: { answer: "Vire" },
          explain: "virar -> imperativo (você): 'vire'.",
        },
        {
          id: "pt11c-vocab-a4", type: "cloze",
          prompt: "Completa: '___ em frente por dois quarteirões.' (seguir, imperativo)",
          payload: { answer: "Siga" },
          explain: "seguir -> imperativo irregular: 'siga'.",
        },
        {
          id: "pt11c-vocab-a5", type: "cloze",
          prompt: "Completa: 'A farmácia fica ___ do banco.' (cerca)",
          payload: { answer: "perto" },
          explain: "'perto de' = cerca de.",
        },
        {
          id: "pt11c-vocab-a6", type: "multiple_choice",
          prompt: "Como você pergunta 'disculpe, donde queda la estacion'?",
          payload: { choices: ["Com licença, onde fica a estação?", "Onde vai a estação?", "Com licença a estação?"], answer: 0 },
          explain: "'Com licença, onde fica...?' es la forma cortes.",
        },
        {
          id: "pt11c-vocab-a7", type: "multiple_choice",
          prompt: "O que significa 'em frente a'?",
          payload: { choices: ["detras de", "delante de", "al lado de"], answer: 1 },
          explain: "'em frente a' = delante de.",
        },
        {
          id: "pt11c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["no", "Vire", "cruzamento", "direita", "à"], answer: ["Vire", "à", "direita", "no", "cruzamento"] },
          explain: "'Vire à direita no cruzamento'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt11c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: o imperativo (você)",
      intro: "Competencia de GRAMATICA. Aprende a dar indicaciones usando el imperativo con 'você'.",
      grammar: {
        title: "O imperativo afirmativo (você)",
        chart: {
          title: "IMPERATIVO (você)",
          maps: "usa la forma del subjuntivo presente",
          groups: [
            {
              label: "VERBOS -AR", color: "rose",
              forms: [
                { form: "VIRAR -> VIRE", subjects: "girar -> gira" },
                { form: "PEGAR -> PEGUE", subjects: "tomar -> toma" },
                { form: "CONTINUAR -> CONTINUE", subjects: "continuar -> continua" },
              ],
            },
            {
              label: "IRREGULARES", color: "green",
              forms: [
                { form: "IR -> VÁ", subjects: "ir -> ve" },
                { form: "SEGUIR -> SIGA", subjects: "seguir -> sigue" },
              ],
            },
          ],
        },
        form: "imperativo (você) = forma del presente del subjuntivo",
        desc: "Para dar instrucciones a alguien que tratas de 'você' (el tratamiento normal en pt-BR), se usa el IMPERATIVO AFIRMATIVO, que para 'você' toma la forma del PRESENTE DEL SUBJUNTIVO: virar->vire, pegar->pegue, continuar->continue. Hay irregulares frecuentes: ir->vá, seguir->siga.",
        rule: "Imperativo (você) = forma del subjuntivo presente para você. Verbos -AR: virar->vire, pegar->pegue, continuar->continue, atravessar->atravesse. Irregulares: ir->vá, seguir->siga, vir->venha, fazer->faça.",
        examples: ["Vire à esquerda.", "Siga em frente.", "Pegue a primeira rua.", "Continue até a praça."],
        explain: { tr: ["Gira a la izquierda.", "Sigue derecho.", "Toma la primera calle.", "Continua hasta la plaza."] },
        mistakes: [
          { wrong: "Vira à esquerda.", right: "Vire à esquerda." },
          { wrong: "Siguir em frente.", right: "Siga em frente." },
          { wrong: "Pega a primeira rua.", right: "Pegue a primeira rua." },
        ],
      },
      activities: [
        {
          id: "pt11c-gram-a1", type: "cloze",
          prompt: "Completa: '___ à esquerda.' (virar, imperativo)",
          payload: { answer: "Vire" },
          explain: "virar -> 'vire'.",
        },
        {
          id: "pt11c-gram-a2", type: "cloze",
          prompt: "Completa: '___ em frente até o sinal.' (seguir, imperativo)",
          payload: { answer: "Siga" },
          explain: "seguir -> 'siga' (irregular).",
        },
        {
          id: "pt11c-gram-a3", type: "cloze",
          prompt: "Completa: '___ a segunda rua.' (pegar, imperativo)",
          payload: { answer: "Pegue" },
          explain: "pegar -> 'pegue'.",
        },
        {
          id: "pt11c-gram-a4", type: "multiple_choice",
          prompt: "Qual é o imperativo (você) de 'ir'?",
          payload: { choices: ["vai", "vá", "vou"], answer: 1 },
          explain: "'ir' -> imperativo irregular 'vá'.",
        },
        {
          id: "pt11c-gram-a5", type: "multiple_choice",
          prompt: "Qual é o imperativo (você) de 'virar'?",
          payload: { choices: ["vira", "vire", "virar"], answer: 1 },
          explain: "-ar -> forma subjuntiva: 'vire'.",
        },
        {
          id: "pt11c-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Vire à direita e siga em frente.", "Vira à direita e segue em frente.", "Virar à direita e seguir em frente."], answer: 0 },
          explain: "Imperativo: 'vire' y 'siga'.",
        },
        {
          id: "pt11c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["primeira", "Pegue", "esquerda", "a", "à"], answer: ["Pegue", "a", "primeira", "à", "esquerda"] },
          explain: "'Pegue a primeira à esquerda'.",
        },
        {
          id: "pt11c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Continue", "praça", "até"], answer: ["Continue", "até", "a", "praça"] },
          explain: "'Continue até a praça'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt11c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: dê indicações",
      intro: "Competencia de ESCRITURA. Da indicaciones para llegar a un lugar, frase por frase.",
      activities: [
        {
          id: "pt11c-write-a1", type: "word_bank",
          prompt: "1. Di 'gira a la derecha':",
          payload: { words: ["direita", "Vire", "à"], answer: ["Vire", "à", "direita"] },
        },
        {
          id: "pt11c-write-a2", type: "word_bank",
          prompt: "2. Di 'sigue derecho':",
          payload: { words: ["frente", "Siga", "em"], answer: ["Siga", "em", "frente"] },
        },
        {
          id: "pt11c-write-a3", type: "word_bank",
          prompt: "3. Di 'toma la primera calle':",
          payload: { words: ["rua", "Pegue", "primeira", "a"], answer: ["Pegue", "a", "primeira", "rua"] },
        },
        {
          id: "pt11c-write-a4", type: "word_bank",
          prompt: "4. Pregunta donde queda el museo:",
          payload: { words: ["o", "Onde", "fica", "museu"], answer: ["Onde", "fica", "o", "museu"] },
        },
        {
          id: "pt11c-write-a5", type: "word_bank",
          prompt: "5. Di que el parque esta detras de la iglesia:",
          payload: { words: ["da", "O", "atrás", "parque", "fica", "igreja"], answer: ["O", "parque", "fica", "atrás", "da", "igreja"] },
        },
        {
          id: "pt11c-write-a6", type: "multiple_choice",
          prompt: "6. 'Perto de' significa:",
          payload: { choices: ["lejos de", "cerca de", "encima de"], answer: 1 },
        },
        {
          id: "pt11c-write-a7", type: "multiple_choice",
          prompt: "7. Qual é o imperativo correto para dar indicações?",
          payload: { choices: ["Vira à esquerda.", "Vire à esquerda.", "Virar à esquerda."], answer: 1 },
        },
        {
          id: "pt11c-write-a8", type: "multiple_choice",
          prompt: "8. O imperativo (você) de 'fazer' é:",
          payload: { choices: ["faça", "faz", "fazer"], answer: 0 },
        },
      ],
    },
  ],
};
