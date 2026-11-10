/**
 * data/placement-questions.js — Banco de preguntas del examen de ubicacion.
 *
 * Datos PUROS. Cada pregunta esta etiquetada con:
 *   - level: nivel MCER que evalua (A1, A2, B1, B2, C1)
 *   - skill: competencia -> grammar | vocabulary | reading | literature |
 *            writing | speaking
 *   - prompt: enunciado (para reading/literature incluye el texto)
 *   - choices + answer: opcion multiple auto-corregible (answer = indice correcto)
 *
 * Examen mas retador: cubre las 6 competencias y llega hasta C1. El motor
 * (core/placement.js) es adaptativo y balancea competencias; se amplia agregando
 * mas objetos aqui (no toca la logica).
 */

/** Nombre visible de cada competencia (badge en la UI). */
export const SKILL_LABELS = {
  grammar: "Gramatica",
  vocabulary: "Vocabulary",
  reading: "Reading",
  literature: "Literatura",
  writing: "Writing",
  speaking: "Speaking",
};

export const PLACEMENT_QUESTIONS = [
  // ============================ A1 ============================
  { id: "a1-gr1", level: "A1", skill: "grammar",
    prompt: "___ name is Ana.", choices: ["My", "Me", "I", "Mine"], answer: 0 },
  { id: "a1-vo1", level: "A1", skill: "vocabulary",
    prompt: "The sky is ___.", choices: ["blue", "table", "run", "happy"], answer: 0 },
  { id: "a1-rd1", level: "A1", skill: "reading",
    prompt: "Read: 'Tom is eight. He has a small red bike.' What color is the bike?",
    choices: ["Red", "Blue", "Green", "Black"], answer: 0 },
  { id: "a1-sp1", level: "A1", skill: "speaking",
    prompt: "Someone says: 'Hi! How are you?' The most natural reply is:",
    choices: ["I'm fine, thanks. And you?", "Yes, I am a book.", "Goodbye, see you.", "It is raining."], answer: 0 },
  { id: "a1-wr1", level: "A1", skill: "writing",
    prompt: "Which sentence is written correctly?",
    choices: ["i live in london", "I live in London.", "I Live In London", "i Live in london."], answer: 1 },

  // ============================ A2 ============================
  { id: "a2-gr1", level: "A2", skill: "grammar",
    prompt: "Yesterday I ___ to the park.", choices: ["go", "went", "gone", "going"], answer: 1 },
  { id: "a2-vo1", level: "A2", skill: "vocabulary",
    prompt: "Opposite of 'expensive':", choices: ["cheap", "big", "fast", "old"], answer: 0 },
  { id: "a2-rd1", level: "A2", skill: "reading",
    prompt: "Read: 'The shop opens at 9 and closes at 5.' When can you go?",
    choices: ["at 8", "at 3", "at 6", "at 7"], answer: 1 },
  { id: "a2-sp1", level: "A2", skill: "speaking",
    prompt: "At a cafe: 'Would you like some coffee?' A polite reply is:",
    choices: ["Yes, please.", "No thank you very good.", "I am coffee.", "Coffee is a drink."], answer: 0 },
  { id: "a2-wr1", level: "A2", skill: "writing",
    prompt: "Which sentence has the correct punctuation?",
    choices: ["I bought apples oranges and milk.", "I bought apples, oranges, and milk.", "I bought, apples oranges milk.", "I bought apples oranges, and milk"], answer: 1 },
  { id: "a2-li1", level: "A2", skill: "literature",
    prompt: "In the rhyme 'The cat sat on the mat', which word rhymes with 'cat'?",
    choices: ["mat", "dog", "chair", "sit"], answer: 0 },

  // ============================ B1 ============================
  { id: "b1-gr1", level: "B1", skill: "grammar",
    prompt: "I have lived here ___ 2010.", choices: ["for", "since", "from", "during"], answer: 1 },
  { id: "b1-vo1", level: "B1", skill: "vocabulary",
    prompt: "She was ___ tired that she fell asleep at once.", choices: ["so", "such", "too", "very much"], answer: 0 },
  { id: "b1-rd1", level: "B1", skill: "reading",
    prompt: "Read: 'Despite the heavy rain, they still enjoyed the trip.' The trip was:",
    choices: ["cancelled", "terrible", "still good", "delayed"], answer: 2 },
  { id: "b1-sp1", level: "B1", skill: "speaking",
    prompt: "A friend suggests a plan you dislike. The most natural, polite reply is:",
    choices: ["No. Bad idea.", "I see what you mean, but I'd prefer something else.", "You are wrong always.", "Yes I hate it."], answer: 1 },
  { id: "b1-wr1", level: "B1", skill: "writing",
    prompt: "You email your boss. Which greeting is most appropriate (formal)?",
    choices: ["Hey!", "Yo, boss", "Dear Mr. Lee,", "Sup"], answer: 2 },
  { id: "b1-li1", level: "B1", skill: "literature",
    prompt: "'She was as busy as a bee.' This simile means she was:",
    choices: ["lazy", "very busy", "angry", "small"], answer: 1 },

  // ============================ B2 ============================
  { id: "b2-gr1", level: "B2", skill: "grammar",
    prompt: "I wish I ___ more time to study for the exam.", choices: ["have", "had", "will have", "would have"], answer: 1 },
  { id: "b2-gr2", level: "B2", skill: "grammar",
    prompt: "Hardly ___ arrived when the phone rang.", choices: ["I had", "had I", "I have", "have I"], answer: 1 },
  { id: "b2-vo1", level: "B2", skill: "vocabulary",
    prompt: "The word 'meticulous' most nearly means:", choices: ["careless", "very careful", "quick", "friendly"], answer: 1 },
  { id: "b2-rd1", level: "B2", skill: "reading",
    prompt: "Read: 'The proposal was met with skepticism by the board.' The board members were:",
    choices: ["excited", "doubtful", "furious", "confused"], answer: 1 },
  { id: "b2-sp1", level: "B2", skill: "speaking",
    prompt: "A colleague shares bad news. The most natural, empathetic response is:",
    choices: ["That's your problem.", "I'm so sorry to hear that. Is there anything I can do?", "OK, next topic.", "Good for you."], answer: 1 },
  { id: "b2-wr1", level: "B2", skill: "writing",
    prompt: "Choose the clearest, most concise version:",
    choices: [
      "Due to the fact that it was raining, we stayed inside.",
      "Because it was raining, we stayed inside.",
      "On account of the rain that was falling, we remained inside.",
      "It was raining and because of that reason we stayed inside."], answer: 1 },
  { id: "b2-li1", level: "B2", skill: "literature",
    prompt: "'Time is a thief.' This metaphor suggests that time:",
    choices: ["can be stopped", "steals moments from us", "is money", "is slow"], answer: 1 },

  // ============================ C1 ============================
  { id: "c1-gr1", level: "C1", skill: "grammar",
    prompt: "___ for your help, we would have failed.", choices: ["If not", "Were it not", "Had not it", "Unless"], answer: 1 },
  { id: "c1-gr2", level: "C1", skill: "grammar",
    prompt: "No sooner ___ the door than the lights went out.",
    choices: ["he closed", "had he closed", "he had closed", "did he close"], answer: 1 },
  { id: "c1-vo1", level: "C1", skill: "vocabulary",
    prompt: "'Ubiquitous' most nearly means:", choices: ["rare", "found everywhere", "ancient", "hidden"], answer: 1 },
  { id: "c1-vo2", level: "C1", skill: "vocabulary",
    prompt: "'Ephemeral' most nearly means:", choices: ["lasting forever", "short-lived", "enormous", "colorful"], answer: 1 },
  { id: "c1-rd1", level: "C1", skill: "reading",
    prompt: "Read: 'While the policy was ostensibly designed to help small firms, its real beneficiaries were large corporations.' The word 'ostensibly' implies the stated aim was:",
    choices: ["genuine and proven", "apparent but perhaps not the true one", "illegal", "widely praised"], answer: 1 },
  { id: "c1-sp1", level: "C1", skill: "speaking",
    prompt: "In a debate you want to concede a point before disagreeing. The most natural phrase is:",
    choices: ["Whatever you say.", "Granted, that's a fair point; however, the data suggests otherwise.", "You're totally wrong.", "I don't care about that."], answer: 1 },
  { id: "c1-wr1", level: "C1", skill: "writing",
    prompt: "Choose the sentence with the best cohesion and no redundancy:",
    choices: [
      "The results were good. The results showed improvement. This was good.",
      "The results were positive, showing a clear improvement over last year.",
      "The results, which were good results, improved and got better.",
      "Good results happened and improvement also happened too."], answer: 1 },
  { id: "c1-li1", level: "C1", skill: "literature",
    prompt: "'The wind whispered through the trees.' This is an example of:",
    choices: ["hyperbole", "personification", "irony", "alliteration"], answer: 1 },
  { id: "c1-li2", level: "C1", skill: "literature",
    prompt: "A character says 'Oh, wonderful' after his car breaks down in the rain. The tone is:",
    choices: ["sincere joy", "verbal irony (sarcasm)", "formal", "fearful"], answer: 1 },

  // =================================================================
  // FRANCES (fr) -- banco propio para que fr deje de saltarse el examen
  // (antes solo existian estas 33 preguntas en ingles -- ver
  // tools/check_placement_lang.py, MIN_PREGUNTAS=6 por idioma).
  // =================================================================
  // --- A1 ---
  { id: "fr-a1-gr1", lang: "fr", level: "A1", skill: "grammar",
    prompt: "___ nom est Ana.", choices: ["Mon", "Ma", "Mes", "Je"], answer: 0 },
  { id: "fr-a1-vo1", lang: "fr", level: "A1", skill: "vocabulary",
    prompt: "Le ciel est ___.", choices: ["bleu", "table", "courir", "content"], answer: 0 },
  { id: "fr-a1-rd1", lang: "fr", level: "A1", skill: "reading",
    prompt: "Lis : \u00ab Tom a huit ans. Il a un petit v\u00e9lo rouge. \u00bb De quelle couleur est le v\u00e9lo ?",
    choices: ["Rouge", "Bleu", "Vert", "Noir"], answer: 0 },
  { id: "fr-a1-sp1", lang: "fr", level: "A1", skill: "speaking",
    prompt: "Quelqu'un dit : \u00ab Salut ! Comment \u00e7a va ? \u00bb La r\u00e9ponse la plus naturelle est :",
    choices: ["\u00c7a va bien, merci. Et toi ?", "Oui, je suis un livre.", "Au revoir, \u00e0 bient\u00f4t.", "Il pleut."], answer: 0 },
  { id: "fr-a1-wr1", lang: "fr", level: "A1", skill: "writing",
    prompt: "Quelle phrase est \u00e9crite correctement ?",
    choices: ["je vis a paris", "Je vis \u00e0 Paris.", "Je Vis A Paris", "je Vis a paris."], answer: 1 },
  // --- A2 ---
  { id: "fr-a2-gr1", lang: "fr", level: "A2", skill: "grammar",
    prompt: "Hier, je ___ au parc.", choices: ["vais", "suis all\u00e9", "all\u00e9", "allant"], answer: 1 },
  { id: "fr-a2-vo1", lang: "fr", level: "A2", skill: "vocabulary",
    prompt: "Contraire de \u00ab cher \u00bb :", choices: ["bon march\u00e9", "grand", "rapide", "vieux"], answer: 0 },
  { id: "fr-a2-rd1", lang: "fr", level: "A2", skill: "reading",
    prompt: "Lis : \u00ab Le magasin ouvre \u00e0 9h et ferme \u00e0 17h. \u00bb Quand peux-tu y aller ?",
    choices: ["\u00e0 8h", "\u00e0 15h", "\u00e0 18h", "\u00e0 19h"], answer: 1 },
  { id: "fr-a2-sp1", lang: "fr", level: "A2", skill: "speaking",
    prompt: "Au caf\u00e9 : \u00ab Voulez-vous un caf\u00e9 ? \u00bb Une r\u00e9ponse polie est :",
    choices: ["Oui, s'il vous pla\u00eet.", "Non merci tr\u00e8s bon.", "Je suis caf\u00e9.", "Le caf\u00e9 est une boisson."], answer: 0 },
  { id: "fr-a2-wr1", lang: "fr", level: "A2", skill: "writing",
    prompt: "Quelle phrase a la ponctuation correcte ?",
    choices: [
      "J'ai achet\u00e9 des pommes des oranges et du lait.",
      "J'ai achet\u00e9 des pommes, des oranges et du lait.",
      "J'ai achet\u00e9, des pommes oranges lait.",
      "J'ai achet\u00e9 des pommes oranges, et du lait"], answer: 1 },
  // --- B1 ---
  { id: "fr-b1-gr1", lang: "fr", level: "B1", skill: "grammar",
    prompt: "J'habite ici ___ 2010.", choices: ["pour", "depuis", "pendant", "d\u00e8s"], answer: 1 },
  { id: "fr-b1-vo1", lang: "fr", level: "B1", skill: "vocabulary",
    prompt: "Elle \u00e9tait ___ fatigu\u00e9e qu'elle s'est endormie tout de suite.",
    choices: ["si", "tellement de", "trop", "tant de"], answer: 0 },
  { id: "fr-b1-rd1", lang: "fr", level: "B1", skill: "reading",
    prompt: "Lis : \u00ab Malgr\u00e9 la forte pluie, ils ont quand m\u00eame profit\u00e9 du voyage. \u00bb Le voyage \u00e9tait :",
    choices: ["annul\u00e9", "terrible", "quand m\u00eame bon", "retard\u00e9"], answer: 2 },
  { id: "fr-b1-sp1", lang: "fr", level: "B1", skill: "speaking",
    prompt: "Un ami propose un plan qui ne te plait pas. La r\u00e9ponse la plus naturelle et polie est :",
    choices: ["Non. Mauvaise id\u00e9e.", "Je comprends, mais je pr\u00e9f\u00e9rerais autre chose.", "Tu as toujours tort.", "Oui je d\u00e9teste \u00e7a."], answer: 1 },
  { id: "fr-b1-wr1", lang: "fr", level: "B1", skill: "writing",
    prompt: "Tu \u00e9cris un email \u00e0 ton patron. Quelle formule d'ouverture est la plus appropri\u00e9e (formelle) ?",
    choices: ["Salut !", "Yo, patron", "Cher Monsieur Lee,", "Coucou"], answer: 2 },

  // =================================================================
  // ITALIANO (it) -- banco propio, mismo criterio que fr arriba.
  // =================================================================
  // --- A1 ---
  { id: "it-a1-gr1", lang: "it", level: "A1", skill: "grammar",
    prompt: "___ nome \u00e8 Ana.", choices: ["Il mio", "La mia", "I miei", "Io"], answer: 0 },
  { id: "it-a1-vo1", lang: "it", level: "A1", skill: "vocabulary",
    prompt: "Il cielo \u00e8 ___.", choices: ["blu", "tavolo", "correre", "felice"], answer: 0 },
  { id: "it-a1-rd1", lang: "it", level: "A1", skill: "reading",
    prompt: "Leggi: \u00abTom ha otto anni. Ha una piccola bici rossa.\u00bb Di che colore \u00e8 la bici?",
    choices: ["Rossa", "Blu", "Verde", "Nera"], answer: 0 },
  { id: "it-a1-sp1", lang: "it", level: "A1", skill: "speaking",
    prompt: "Qualcuno dice: \u00abCiao! Come stai?\u00bb La risposta pi\u00f9 naturale \u00e8:",
    choices: ["Sto bene, grazie. E tu?", "S\u00ec, sono un libro.", "Arrivederci, a presto.", "Sta piovendo."], answer: 0 },
  { id: "it-a1-wr1", lang: "it", level: "A1", skill: "writing",
    prompt: "Quale frase \u00e8 scritta correttamente?",
    choices: ["vivo a roma", "Vivo a Roma.", "Vivo A Roma", "vivo A roma."], answer: 1 },
  // --- A2 ---
  { id: "it-a2-gr1", lang: "it", level: "A2", skill: "grammar",
    prompt: "Ieri ___ al parco.", choices: ["vado", "sono andato", "andato", "andando"], answer: 1 },
  { id: "it-a2-vo1", lang: "it", level: "A2", skill: "vocabulary",
    prompt: "Contrario di \u00abcaro\u00bb:", choices: ["economico", "grande", "veloce", "vecchio"], answer: 0 },
  { id: "it-a2-rd1", lang: "it", level: "A2", skill: "reading",
    prompt: "Leggi: \u00abIl negozio apre alle 9 e chiude alle 17.\u00bb Quando puoi andarci?",
    choices: ["alle 8", "alle 15", "alle 18", "alle 19"], answer: 1 },
  { id: "it-a2-sp1", lang: "it", level: "A2", skill: "speaking",
    prompt: "Al bar: \u00abVuoi un caff\u00e8?\u00bb Una risposta gentile \u00e8:",
    choices: ["S\u00ec, grazie.", "No grazie molto buono.", "Sono caff\u00e8.", "Il caff\u00e8 \u00e8 una bevanda."], answer: 0 },
  { id: "it-a2-wr1", lang: "it", level: "A2", skill: "writing",
    prompt: "Quale frase ha la punteggiatura corretta?",
    choices: [
      "Ho comprato mele arance e latte.",
      "Ho comprato mele, arance e latte.",
      "Ho comprato, mele arance latte.",
      "Ho comprato mele arance, e latte"], answer: 1 },
  // --- B1 ---
  { id: "it-b1-gr1", lang: "it", level: "B1", skill: "grammar",
    prompt: "Vivo qui ___ il 2010.", choices: ["per", "dal", "durante", "fino a"], answer: 1 },
  { id: "it-b1-vo1", lang: "it", level: "B1", skill: "vocabulary",
    prompt: "Era ___ stanca che si \u00e8 addormentata subito.",
    choices: ["cos\u00ec", "tanto di", "troppo", "molto di"], answer: 0 },
  { id: "it-b1-rd1", lang: "it", level: "B1", skill: "reading",
    prompt: "Leggi: \u00abNonostante la forte pioggia, si sono comunque goduti il viaggio.\u00bb Il viaggio \u00e8 stato:",
    choices: ["annullato", "terribile", "comunque bello", "ritardato"], answer: 2 },
  { id: "it-b1-sp1", lang: "it", level: "B1", skill: "speaking",
    prompt: "Un amico propone un piano che non ti piace. La risposta pi\u00f9 naturale e gentile \u00e8:",
    choices: ["No. Pessima idea.", "Capisco, ma preferirei qualcos'altro.", "Hai sempre torto.", "S\u00ec lo odio."], answer: 1 },
  { id: "it-b1-wr1", lang: "it", level: "B1", skill: "writing",
    prompt: "Scrivi una email al tuo capo. Quale saluto iniziale \u00e8 pi\u00f9 appropriato (formale)?",
    choices: ["Ciao!", "Ehi, capo", "Gentile Sig. Lee,", "Yo"], answer: 2 },

  // =================================================================
  // PORTUGUES (pt-BR) -- banco propio, mismo criterio que arriba.
  // =================================================================
  // --- A1 ---
  { id: "pt-a1-gr1", lang: "pt", level: "A1", skill: "grammar",
    prompt: "___ nome \u00e9 Ana.", choices: ["Meu", "Minha", "Meus", "Eu"], answer: 0 },
  { id: "pt-a1-vo1", lang: "pt", level: "A1", skill: "vocabulary",
    prompt: "O c\u00e9u \u00e9 ___.", choices: ["azul", "mesa", "correr", "feliz"], answer: 0 },
  { id: "pt-a1-rd1", lang: "pt", level: "A1", skill: "reading",
    prompt: "Leia: \u201cTom tem oito anos. Ele tem uma bicicleta vermelha pequena.\u201d De que cor \u00e9 a bicicleta?",
    choices: ["Vermelha", "Azul", "Verde", "Preta"], answer: 0 },
  { id: "pt-a1-sp1", lang: "pt", level: "A1", skill: "speaking",
    prompt: "Algu\u00e9m diz: \u201cOi! Como voc\u00ea est\u00e1?\u201d A resposta mais natural \u00e9:",
    choices: ["Estou bem, obrigado. E voc\u00ea?", "Sim, eu sou um livro.", "Tchau, at\u00e9 logo.", "Est\u00e1 chovendo."], answer: 0 },
  { id: "pt-a1-wr1", lang: "pt", level: "A1", skill: "writing",
    prompt: "Qual frase est\u00e1 escrita corretamente?",
    choices: ["eu moro em sao paulo", "Eu moro em S\u00e3o Paulo.", "Eu Moro Em Sao Paulo", "eu moro Em sao paulo."], answer: 1 },
  // --- A2 ---
  { id: "pt-a2-gr1", lang: "pt", level: "A2", skill: "grammar",
    prompt: "Ontem eu ___ ao parque.", choices: ["vou", "fui", "ido", "indo"], answer: 1 },
  { id: "pt-a2-vo1", lang: "pt", level: "A2", skill: "vocabulary",
    prompt: "Contr\u00e1rio de \u201ccaro\u201d:", choices: ["barato", "grande", "r\u00e1pido", "velho"], answer: 0 },
  { id: "pt-a2-rd1", lang: "pt", level: "A2", skill: "reading",
    prompt: "Leia: \u201cA loja abre \u00e0s 9h e fecha \u00e0s 17h.\u201d Quando voc\u00ea pode ir?",
    choices: ["\u00e0s 8h", "\u00e0s 15h", "\u00e0s 18h", "\u00e0s 19h"], answer: 1 },
  { id: "pt-a2-sp1", lang: "pt", level: "A2", skill: "speaking",
    prompt: "No caf\u00e9: \u201cVoc\u00ea quer um caf\u00e9?\u201d Uma resposta educada \u00e9:",
    choices: ["Sim, por favor.", "N\u00e3o obrigado muito bom.", "Eu sou caf\u00e9.", "Caf\u00e9 \u00e9 uma bebida."], answer: 0 },
  { id: "pt-a2-wr1", lang: "pt", level: "A2", skill: "writing",
    prompt: "Qual frase tem a pontua\u00e7\u00e3o correta?",
    choices: [
      "Comprei ma\u00e7\u00e3s laranjas e leite.",
      "Comprei ma\u00e7\u00e3s, laranjas e leite.",
      "Comprei, ma\u00e7\u00e3s laranjas leite.",
      "Comprei ma\u00e7\u00e3s laranjas, e leite"], answer: 1 },
  // --- B1 ---
  { id: "pt-b1-gr1", lang: "pt", level: "B1", skill: "grammar",
    prompt: "Moro aqui ___ 2010.", choices: ["para", "desde", "durante", "at\u00e9"], answer: 1 },
  { id: "pt-b1-vo1", lang: "pt", level: "B1", skill: "vocabulary",
    prompt: "Ela estava ___ cansada que adormeceu na hora.",
    choices: ["t\u00e3o", "tanto de", "muito", "demais de"], answer: 0 },
  { id: "pt-b1-rd1", lang: "pt", level: "B1", skill: "reading",
    prompt: "Leia: \u201cApesar da chuva forte, eles aproveitaram a viagem mesmo assim.\u201d A viagem foi:",
    choices: ["cancelada", "terr\u00edvel", "mesmo assim boa", "adiada"], answer: 2 },
  { id: "pt-b1-sp1", lang: "pt", level: "B1", skill: "speaking",
    prompt: "Um amigo sugere um plano que voc\u00ea n\u00e3o gosta. A resposta mais natural e educada \u00e9:",
    choices: ["N\u00e3o. P\u00e9ssima ideia.", "Entendo, mas eu preferiria outra coisa.", "Voc\u00ea est\u00e1 sempre errado.", "Sim, eu odeio isso."], answer: 1 },
  { id: "pt-b1-wr1", lang: "pt", level: "B1", skill: "writing",
    prompt: "Voc\u00ea escreve um email para seu chefe. Qual sauda\u00e7\u00e3o \u00e9 mais apropriada (formal)?",
    choices: ["E a\u00ed!", "Fala, chefe", "Prezado Sr. Lee,", "Oi oi"], answer: 2 },
];
