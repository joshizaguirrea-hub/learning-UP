/**
 * data/units/pt10-viagem.js — Unidade A2 pt-BR "Viagem" (mais verbos
 * irregulares no preterito: vir, poder, querer, dizer, ter).
 *
 * Dados PUROS. term = portugues (meta), translation = espanhol (L1 do aluno).
 */

export const PT10_VIAGEM = {
  id: "pt10-viagem",
  language: "pt",
  level: "A2",
  title: "Viagem",
  subtitle: "Mas verbos irregulares en preterito (vim, pude, quis, disse, tive) + vocabulario de viaje",

  cando: [
    "Puedo hablar de un viaje usando mas verbos irregulares en preterito.",
    "Puedo usar 'poder', 'querer', 'dizer', 'vir', 'ter' en preterito.",
    "Puedo usar vocabulario de viajes (aeroporto, mala, passagem, reservar).",
    "Puedo contar una experiencia de viaje con detalles.",
  ],

  vocab: [
    { id: "pt10v-1", term: "vir (vim)", translation: "venir (vine)", example: "Vim de avião." },
    { id: "pt10v-2", term: "poder (pude)", translation: "poder (pude)", example: "Não pude dormir no avião." },
    { id: "pt10v-3", term: "querer (quis)", translation: "querer (quise)", example: "Quis visitar o museu." },
    { id: "pt10v-4", term: "dizer (disse)", translation: "decir (dije)", example: "Ele disse que foi ótimo." },
    { id: "pt10v-5", term: "ter (tive)", translation: "tener (tuve)", example: "Tive um problema com a mala." },
    { id: "pt10v-6", term: "o aeroporto", translation: "el aeropuerto", example: "Chegamos ao aeroporto cedo." },
    { id: "pt10v-7", term: "a passagem", translation: "el boleto/billete", example: "Comprei a passagem online." },
    { id: "pt10v-8", term: "a mala", translation: "la maleta", example: "Fiz a mala ontem à noite." },
    { id: "pt10v-9", term: "reservar", translation: "reservar", example: "Reservei um hotel." },
    { id: "pt10v-10", term: "o avião", translation: "el avion", example: "O avião atrasou duas horas." },
    { id: "pt10v-11", term: "o passaporte", translation: "el pasaporte", example: "Esqueci o passaporte!" },
    { id: "pt10v-12", term: "uma viagem inesquecível", translation: "un viaje inolvidable", example: "Foi uma viagem inesquecível." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "pt10v-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: a minha última viagem",
      intro: "Competencia de LECTURA. Lee DOS textos en portugues y responde las preguntas.",
      content: {
        reading:
          "TEXTO 1 - A viagem do Marcos\n" +
          "No mês passado, fiz uma viagem para a Argentina. Vim de avião e tive um pequeno problema: a minha " +
          "mala não chegou! Mas não quis ficar triste e fui passear pela cidade. Pude visitar muitos lugares " +
          "lindos e disse para todos os amigos que foi uma viagem inesquecível.\n\n" +
          "TEXTO 2 - No aeroporto\n" +
          "A: Você fez a mala? B: Sim, mas não pude encontrar o meu passaporte! A: O quê?! Onde você " +
          "colocou? B: Não sei, talvez em casa. A: Eu disse para você verificar ontem! Reservamos o voo " +
          "para as dez, temos que voltar agora! B: Você tem razão, vamos!",
        glossary: [
          { term: "vim / tive", translation: "vine / tuve" },
          { term: "não pude", translation: "no pude" },
          { term: "quis / não quis", translation: "quise / no quise" },
          { term: "disse", translation: "dije" },
          { term: "a mala", translation: "la maleta" },
          { term: "esqueci", translation: "olvidé" },
          { term: "reservamos", translation: "reservamos" },
          { term: "você tem razão", translation: "tienes razón" },
        ],
        keyPhrases: [
          "Verbos irregulares clave en preterito: vir->vim, poder->pude, querer->quis, dizer->disse, ter->tive.",
          "'Não pude' + infinitivo = no pude hacer algo (negacion con poder).",
        ],
        check: [
          { prompt: "T1: Para onde foi Marcos?", choices: ["Argentina", "Brasil", "Chile"], answer: 0 },
          { prompt: "T1: Qual foi o problema de Marcos?", choices: ["A mala não chegou", "Perdeu o passaporte", "O voo atrasou"], answer: 0 },
          { prompt: "T1: O que ele fez apesar do problema?", choices: ["Foi passear pela cidade", "Ficou no hotel", "Voltou para casa"], answer: 0 },
          { prompt: "T2: O que B não conseguiu encontrar?", choices: ["O passaporte", "A mala", "A passagem"], answer: 0 },
          { prompt: "T2: A que horas é o voo?", choices: ["Às dez", "Às nove", "Às onze"], answer: 0 },
          { prompt: "T2: O que A disse ontem?", choices: ["Para verificar", "Para comprar", "Para esperar"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "pt10v-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: a viagem",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "vir / vim", translation: "venir / vine" },
        { term: "poder / pude", translation: "poder / pude" },
        { term: "querer / quis", translation: "querer / quise" },
        { term: "dizer / disse", translation: "decir / dije" },
        { term: "ter / tive", translation: "tener / tuve" },
        { term: "o aeroporto / a passagem", translation: "el aeropuerto / el boleto" },
        { term: "a mala / o passaporte", translation: "la maleta / el pasaporte" },
        { term: "reservar", translation: "reservar" },
      ],
      activities: [
        {
          id: "pt10v-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "vir", right: "venir" },
            { left: "poder", right: "poder" },
            { left: "querer", right: "querer" },
            { left: "dizer", right: "decir" },
          ] },
        },
        {
          id: "pt10v-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "a mala", right: "la maleta" },
            { left: "o passaporte", right: "el pasaporte" },
            { left: "reservar", right: "reservar" },
            { left: "o aeroporto", right: "el aeropuerto" },
          ] },
        },
        {
          id: "pt10v-vocab-a3", type: "cloze",
          prompt: "Completa (eu): 'Eu ___ de avião.' (vir, pasado)",
          payload: { answer: "vim" },
          explain: "vir -> eu vim.",
        },
        {
          id: "pt10v-vocab-a4", type: "cloze",
          prompt: "Completa (eu): 'Eu não ___ dormir.' (poder, pasado)",
          payload: { answer: "pude" },
          explain: "poder -> eu pude.",
        },
        {
          id: "pt10v-vocab-a5", type: "cloze",
          prompt: "Completa (ele): 'Ele ___ que foi ótimo.' (dizer, pasado)",
          payload: { answer: "disse" },
          explain: "dizer -> ele disse.",
        },
        {
          id: "pt10v-vocab-a6", type: "multiple_choice",
          prompt: "Como se diz 'yo quise visitar el museo'?",
          payload: { choices: ["Eu quis visitar o museu.", "Eu queri visitar o museu.", "Eu querou visitar o museu."], answer: 0 },
          explain: "querer -> eu quis (irregular).",
        },
        {
          id: "pt10v-vocab-a7", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'ter' para 'eu'?",
          payload: { choices: ["tive", "tenho", "terei"], answer: 0 },
          explain: "ter -> eu tive.",
        },
        {
          id: "pt10v-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["de", "Eu", "avião", "vim"], answer: ["Eu", "vim", "de", "avião"] },
          explain: "'Eu vim de avião'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "pt10v-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: mais verbos irregulares",
      intro: "Competencia de GRAMATICA. Memoriza mas raices irregulares del preterito.",
      grammar: {
        title: "Mais verbos irregulares no pretérito",
        chart: {
          title: "IRREGULARES",
          maps: "raiz especial, no sigue -ei/-i regular",
          groups: [
            {
              label: "GRUPO 1", color: "rose",
              forms: [
                { form: "VIR -> VIM", subjects: "venir -> vine" },
                { form: "TER -> TIVE", subjects: "tener -> tuve" },
              ],
            },
            {
              label: "GRUPO 2", color: "green",
              forms: [
                { form: "PODER -> PUDE", subjects: "poder -> pude" },
                { form: "QUERER -> QUIS", subjects: "querer -> quise" },
                { form: "DIZER -> DISSE", subjects: "decir -> dije" },
              ],
            },
          ],
        },
        form: "raiz especial + terminacion propia (no sigue -ei/-i regular)",
        desc: "Varios verbos muy frecuentes tienen una raiz COMPLETAMENTE distinta en preterito, que hay que memorizar: vir->vim, ter->tive, poder->pude, querer->quis, dizer->disse. No siguen ningun patron regular, pero aparecen constantemente al hablar de experiencias pasadas.",
        rule: "Pretérito irregular: vir -> vim, veio, viemos, vieram. ter -> tive, teve, tivemos, tiveram. poder -> pude, pôde, pudemos, puderam. querer -> quis, quis, quisemos, quiseram. dizer -> disse, disse, dissemos, disseram.",
        examples: ["Eu vim de ônibus.", "Ela teve um problema.", "Nós não pudemos ir.", "Eles disseram a verdade."],
        explain: { tr: ["Yo vine en autobus.", "Ella tuvo un problema.", "Nosotros no pudimos ir.", "Ellos dijeron la verdad."] },
        mistakes: [
          { wrong: "Eu vi de avião.", right: "Eu vim de avião." },
          { wrong: "Ela podeu ir.", right: "Ela pôde ir." },
          { wrong: "Eles dizeram a verdade.", right: "Eles disseram a verdade." },
        ],
      },
      activities: [
        {
          id: "pt10v-gram-a1", type: "cloze",
          prompt: "Completa: 'Ela ___ um problema.' (ter, pasado)",
          payload: { answer: "teve" },
          explain: "ter -> ela teve.",
        },
        {
          id: "pt10v-gram-a2", type: "cloze",
          prompt: "Completa: 'Nós não ___ ir.' (poder, pasado)",
          payload: { answer: "pudemos" },
          explain: "poder -> nós pudemos.",
        },
        {
          id: "pt10v-gram-a3", type: "cloze",
          prompt: "Completa: 'Eles ___ a verdade.' (dizer, pasado)",
          payload: { answer: "disseram" },
          explain: "dizer -> eles disseram.",
        },
        {
          id: "pt10v-gram-a4", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'vir' para 'ele'?",
          payload: { choices: ["veio", "vim", "vieram"], answer: 0 },
          explain: "vir -> ele veio.",
        },
        {
          id: "pt10v-gram-a5", type: "multiple_choice",
          prompt: "Qual é o pretérito de 'querer' para 'eu'?",
          payload: { choices: ["quis", "queri", "querou"], answer: 0 },
          explain: "querer -> eu quis.",
        },
        {
          id: "pt10v-gram-a6", type: "multiple_choice",
          prompt: "Escolha a frase correta:",
          payload: { choices: ["Eu vi de avião.", "Eu vim de avião.", "Eu vindo de avião."], answer: 1 },
          explain: "'vim' (vir), no confundir con 'vi' (ver).",
        },
        {
          id: "pt10v-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["um", "Ela", "problema", "teve"], answer: ["Ela", "teve", "um", "problema"] },
          explain: "'Ela teve um problema'.",
        },
        {
          id: "pt10v-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "Eles", "verdade", "disseram"], answer: ["Eles", "disseram", "a", "verdade"] },
          explain: "'Eles disseram a verdade'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "pt10v-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: conte uma viagem",
      intro: "Competencia de ESCRITURA. Cuenta un viaje, frase por frase.",
      activities: [
        {
          id: "pt10v-write-a1", type: "word_bank",
          prompt: "1. Di que viniste en avion:",
          payload: { words: ["de", "Eu", "avião", "vim"], answer: ["Eu", "vim", "de", "avião"] },
        },
        {
          id: "pt10v-write-a2", type: "word_bank",
          prompt: "2. Di que tuviste un problema:",
          payload: { words: ["um", "Eu", "problema", "tive"], answer: ["Eu", "tive", "um", "problema"] },
        },
        {
          id: "pt10v-write-a3", type: "word_bank",
          prompt: "3. Di que no pudiste dormir:",
          payload: { words: ["dormir", "Eu", "não", "pude"], answer: ["Eu", "não", "pude", "dormir"] },
        },
        {
          id: "pt10v-write-a4", type: "word_bank",
          prompt: "4. Di que ellos dijeron la verdad:",
          payload: { words: ["a", "Eles", "verdade", "disseram"], answer: ["Eles", "disseram", "a", "verdade"] },
        },
        {
          id: "pt10v-write-a5", type: "word_bank",
          prompt: "5. Pregunta si hizo la maleta (voce):",
          payload: { words: ["mala", "Você", "a", "fez"], answer: ["Você", "fez", "a", "mala"] },
        },
        {
          id: "pt10v-write-a6", type: "multiple_choice",
          prompt: "6. O pretérito de 'querer' é:",
          payload: { choices: ["quis", "queri", "querei"], answer: 0 },
        },
        {
          id: "pt10v-write-a7", type: "multiple_choice",
          prompt: "7. Qual é correto?",
          payload: { choices: ["Eu vi de ônibus.", "Eu vim de ônibus.", "Eu vindo de ônibus."], answer: 1 },
        },
        {
          id: "pt10v-write-a8", type: "multiple_choice",
          prompt: "8. 'O passaporte' significa:",
          payload: { choices: ["el salario", "el pasaporte", "la oficina"], answer: 1 },
        },
      ],
    },
  ],
};
