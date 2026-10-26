/**
 * data/units/fr8-hier.js — Unidad A1 fr-FR "Hier" (pasado: passe compose).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 * Cierra el arco A1: es la primera vez que el alumno habla del pasado.
 */

export const FR8_HIER = {
  id: "fr8-hier",
  language: "fr",
  level: "A1",
  title: "Hier",
  subtitle: "Contar lo que hiciste con el passe compose",

  cando: [
    "Puedo contar lo que hice ayer o el fin de semana.",
    "Puedo formar el passe compose con 'avoir'.",
    "Puedo usar 'etre' con los verbos de movimiento.",
    "Puedo situar acciones en el pasado con expresiones de tiempo.",
  ],

  vocab: [
    { id: "fr8h-1", term: "hier", translation: "ayer", example: "Hier, j'ai travaille." },
    { id: "fr8h-2", term: "avant-hier", translation: "anteayer", example: "Avant-hier, j'etais malade." },
    { id: "fr8h-3", term: "la semaine derniere", translation: "la semana pasada", example: "La semaine derniere, j'ai voyage." },
    { id: "fr8h-4", term: "deja", translation: "ya", example: "J'ai deja mange." },
    { id: "fr8h-5", term: "manger", translation: "comer", example: "J'ai mange une pizza." },
    { id: "fr8h-6", term: "regarder", translation: "ver / mirar", example: "J'ai regarde un film." },
    { id: "fr8h-7", term: "visiter", translation: "visitar", example: "J'ai visite le musee." },
    { id: "fr8h-8", term: "aller", translation: "ir", example: "Je suis alle au parc." },
    { id: "fr8h-9", term: "partir", translation: "irse / salir", example: "Elle est partie a huit heures." },
    { id: "fr8h-10", term: "rester", translation: "quedarse", example: "Je suis reste a la maison." },
    { id: "fr8h-11", term: "c'etait", translation: "fue / era", example: "C'etait super !" },
    { id: "fr8h-12", term: "ensuite / apres", translation: "luego / despues", example: "Ensuite, je suis rentre." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr8h-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : mon week-end",
      intro: "Competencia de LECTURA. Lee DOS textos en PASADO y responde.",
      content: {
        reading:
          "TEXTE 1 - Le week-end de Thomas\n" +
          "Samedi, j'ai visite le musee du Louvre avec ma soeur. Nous avons marche pendant trois " +
          "heures ! Ensuite, nous avons mange dans un petit restaurant. L'apres-midi, je suis alle " +
          "au parc et j'ai lu un livre. Le soir, je suis rentre tard. C'etait une journee parfaite.\n\n" +
          "TEXTE 2 - Une conversation\n" +
          "A : Qu'est-ce que tu as fait hier ? B : J'ai travaille le matin et l'apres-midi je suis " +
          "allee au cinema. A : Tu as aime le film ? B : Oui, c'etait tres bien ! Et toi ? " +
          "A : Moi, je suis reste a la maison. J'ai regarde la tele et j'ai dormi.",
        glossary: [
          { term: "j'ai visite", translation: "visite (yo)" },
          { term: "nous avons mange", translation: "comimos" },
          { term: "je suis alle(e)", translation: "fui" },
          { term: "je suis rentre", translation: "volvi (a casa)" },
          { term: "qu'est-ce que tu as fait ?", translation: "que hiciste?" },
          { term: "c'etait", translation: "fue / estuvo" },
          { term: "pendant", translation: "durante" },
          { term: "j'ai dormi", translation: "dormi" },
        ],
        keyPhrases: [
          "Fijate en que verbos usan 'ai/avons' y cuales 'suis/est'.",
          "En el Texto 2, compara lo que hizo cada persona.",
        ],
        check: [
          { prompt: "T1 : Qu'est-ce que Thomas a visite ?", choices: ["Le parc", "Le musee du Louvre", "Un restaurant"], answer: 1 },
          { prompt: "T1 : Avec qui ?", choices: ["Avec sa soeur", "Avec ses amis", "Seul"], answer: 0 },
          { prompt: "T1 : Qu'a-t-il fait au parc ?", choices: ["Il a mange", "Il a lu un livre", "Il a dormi"], answer: 1 },
          { prompt: "T2 : Qu'a fait la personne B l'apres-midi ?", choices: ["Elle a travaille", "Elle est allee au cinema", "Elle est restee a la maison"], answer: 1 },
          { prompt: "T2 : A-t-elle aime le film ?", choices: ["Oui, c'etait tres bien", "Non, c'etait mauvais", "Elle ne dit pas"], answer: 0 },
          { prompt: "T2 : Qu'a fait la personne A ?", choices: ["Elle est sortie", "Elle est restee a la maison", "Elle a travaille"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr8h-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : parler du passe",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "hier / avant-hier", translation: "ayer / anteayer" },
        { term: "la semaine derniere", translation: "la semana pasada" },
        { term: "deja", translation: "ya" },
        { term: "manger / regarder", translation: "comer / ver" },
        { term: "visiter / voyager", translation: "visitar / viajar" },
        { term: "aller / partir / rester", translation: "ir / irse / quedarse" },
        { term: "c'etait", translation: "fue / estuvo" },
        { term: "ensuite / apres", translation: "luego / despues" },
      ],
      activities: [
        {
          id: "fr8h-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "hier", right: "ayer" },
            { left: "avant-hier", right: "anteayer" },
            { left: "deja", right: "ya" },
            { left: "ensuite", right: "luego" },
          ] },
        },
        {
          id: "fr8h-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "visiter", right: "visitar" },
            { left: "regarder", right: "ver" },
            { left: "rester", right: "quedarse" },
            { left: "partir", right: "irse" },
          ] },
        },
        {
          id: "fr8h-vocab-a3", type: "cloze",
          prompt: "Completa: '___, j'ai travaille.' (ayer)",
          payload: { answer: "hier" },
          explain: "'Hier' = ayer.",
        },
        {
          id: "fr8h-vocab-a4", type: "cloze",
          prompt: "Completa: '___ super !' (fue, para valorar algo)",
          payload: { answer: "c'etait" },
          explain: "'C'etait' = fue / estuvo. Sirve para dar tu opinion del pasado.",
        },
        {
          id: "fr8h-vocab-a5", type: "cloze",
          prompt: "Completa: 'J'ai ___ mange.' (ya)",
          payload: { answer: "deja" },
          explain: "'Deja' va ENTRE el auxiliar y el participio: j'ai deja mange.",
        },
        {
          id: "fr8h-vocab-a6", type: "multiple_choice",
          prompt: "Que significa 'la semaine derniere'?",
          payload: { choices: ["la semana que viene", "la semana pasada", "esta semana"], answer: 1 },
          explain: "'Derniere' aqui es 'pasada', no 'ultima'.",
        },
        {
          id: "fr8h-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'que hiciste?'",
          payload: { choices: ["Qu'est-ce que tu fais ?", "Qu'est-ce que tu as fait ?", "Qu'est-ce que tu vas faire ?"], answer: 1 },
          explain: "'Tu as fait' es pasado; 'tu fais' es presente.",
        },
        {
          id: "fr8h-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["travaille", "ai", "Hier,", "j'"], answer: ["Hier,", "j'", "ai", "travaille"] },
          explain: "La expresion de tiempo suele ir al principio.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr8h-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : le passe compose",
      intro: "Competencia de GRAMATICA. El pasado frances son DOS palabras: auxiliar + participio.",
      grammar: {
        title: "Le passe compose (AVOIR / ETRE)",
        chart: {
          title: "AUXILIAIRE + PARTICIPE",
          maps: "Hablar de acciones terminadas",
          groups: [
            {
              label: "AVEC AVOIR (la mayoria)", color: "amber",
              forms: [
                { form: "j'AI mange", subjects: "tu AS mange" },
                { form: "il A mange", subjects: "nous AVONS mange" },
                { form: "ils ONT mange", subjects: "participio invariable" },
              ],
            },
            {
              label: "AVEC ETRE (movimiento)", color: "emerald",
              forms: [
                { form: "je SUIS alle", subjects: "aller, partir, venir" },
                { form: "elle EST allee", subjects: "+E si es mujer" },
                { form: "ils SONT alles", subjects: "+S si es plural" },
                { form: "rester, entrer, sortir", subjects: "tambien con etre" },
              ],
            },
          ],
        },
        form: "j'*ai* mang*e*  ·  je *suis* all*e*  ·  elle *est* all*ee*",
        desc: "Para contar lo que hiciste: ayer, el fin de semana, la semana pasada.",
        rule: "El passe compose son DOS palabras: auxiliar (avoir o etre) + participio. La mayoria usa 'avoir'. Un grupo pequeno de verbos de MOVIMIENTO o cambio de estado (aller, partir, venir, rester, entrer, sortir, naitre, mourir) usa 'etre', y ahi el participio CONCUERDA: 'elle est allee' lleva -e porque es mujer. Los verbos en -ER hacen el participio en -E: manger -> mange.",
        examples: ["J'ai mange une pizza.", "Nous avons visite le musee.", "Je suis alle au parc.", "Elle est partie tot."],
        explain: { tr: ["Comi una pizza.", "Visitamos el museo.", "Fui al parque.", "Ella se fue temprano."] },
        mistakes: [
          { wrong: "J'ai alle au parc.", right: "Je suis alle au parc." },
          { wrong: "Je suis mange une pizza.", right: "J'ai mange une pizza." },
          { wrong: "Elle est alle au cinema.", right: "Elle est allee au cinema." },
        ],
      },
      activities: [
        {
          id: "fr8h-gram-a1", type: "cloze",
          prompt: "Completa: 'J'___ mange une pizza.' (auxiliar avoir)",
          payload: { answer: "ai" },
          explain: "'Manger' usa AVOIR: j'ai mange.",
        },
        {
          id: "fr8h-gram-a2", type: "cloze",
          prompt: "Completa: 'Je ___ alle au parc.' (auxiliar etre)",
          payload: { answer: "suis" },
          explain: "'Aller' es de movimiento: usa ETRE.",
        },
        {
          id: "fr8h-gram-a3", type: "cloze",
          prompt: "Completa el participio: 'Nous avons ___ le musee.' (visiter)",
          payload: { answer: "visite" },
          explain: "Los verbos en -ER hacen el participio en -E.",
        },
        {
          id: "fr8h-gram-a4", type: "cloze",
          prompt: "Completa con CONCORDANCIA: 'Elle est ___ au cinema.' (aller, mujer)",
          payload: { answer: "allee" },
          explain: "Con ETRE el participio concuerda: mujer -> allee.",
        },
        {
          id: "fr8h-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["J'ai alle au parc.", "Je suis alle au parc.", "Je vais alle au parc."], answer: 1 },
          explain: "'Aller' va con ETRE, no con avoir.",
        },
        {
          id: "fr8h-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je suis mange une pizza.", "J'ai mange une pizza.", "J'ai mange une pizza hier soir deja."], answer: 1 },
          explain: "'Manger' va con AVOIR.",
        },
        {
          id: "fr8h-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["film", "ai", "un", "J'", "regarde"], answer: ["J'", "ai", "regarde", "un", "film"] },
          explain: "Orden: sujeto + auxiliar + participio + complemento.",
        },
        {
          id: "fr8h-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["maison", "reste", "a", "Je", "la", "suis"], answer: ["Je", "suis", "reste", "a", "la", "maison"] },
          explain: "'Rester' tambien va con ETRE.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr8h-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : raconte ton week-end",
      intro: "Competencia de ESCRITURA. Cuenta lo que hiciste, frase por frase.",
      activities: [
        {
          id: "fr8h-write-a1", type: "word_bank",
          prompt: "1. Di que hiciste ayer:",
          payload: { words: ["travaille", "ai", "Hier,", "j'"], answer: ["Hier,", "j'", "ai", "travaille"] },
        },
        {
          id: "fr8h-write-a2", type: "word_bank",
          prompt: "2. Di adonde fuiste:",
          payload: { words: ["parc", "suis", "au", "Je", "alle"], answer: ["Je", "suis", "alle", "au", "parc"] },
        },
        {
          id: "fr8h-write-a3", type: "word_bank",
          prompt: "3. Di que comiste:",
          payload: { words: ["pizza", "ai", "une", "J'", "mange"], answer: ["J'", "ai", "mange", "une", "pizza"] },
        },
        {
          id: "fr8h-write-a4", type: "word_bank",
          prompt: "4. Di que viste:",
          payload: { words: ["film", "ai", "un", "J'", "regarde"], answer: ["J'", "ai", "regarde", "un", "film"] },
        },
        {
          id: "fr8h-write-a5", type: "word_bank",
          prompt: "5. Da tu opinion:",
          payload: { words: ["super", "etait", "C'"], answer: ["C'", "etait", "super"] },
        },
        {
          id: "fr8h-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'fui al cine'?",
          payload: { choices: ["J'ai alle au cinema.", "Je suis alle au cinema.", "Je vais au cinema."], answer: 1 },
        },
        {
          id: "fr8h-write-a7", type: "multiple_choice",
          prompt: "7. Te preguntan 'Qu'est-ce que tu as fait hier ?' Respondes:",
          payload: { choices: ["J'ai visite le musee.", "Je visite le musee.", "Je vais visiter le musee."], answer: 0 },
        },
        {
          id: "fr8h-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase usa bien la concordancia?",
          payload: { choices: ["Elle est alle au parc.", "Elle est allee au parc.", "Elle a allee au parc."], answer: 1 },
        },
      ],
    },
  ],
};
