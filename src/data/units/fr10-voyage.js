/**
 * data/units/fr10-voyage.js — Unite A2 francais "En voyage" (le futur
 * proche: aller + infinitif).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR10_VOYAGE = {
  id: "fr10-voyage",
  language: "fr",
  level: "A2",
  title: "En voyage",
  subtitle: "Futuro proximo: 'aller' (presente) + infinitivo para hablar de planes de viaje",

  cando: [
    "Puedo hablar de planes de viaje cercanos con 'aller' + infinitivo.",
    "Puedo conjugar 'aller' en presente para el futur proche.",
    "Puedo usar vocabulario de viaje (aeroport, valise, billet, reserver).",
    "Puedo preguntar sobre los planes de viaje de alguien.",
  ],

  vocab: [
    { id: "fr10v-1", term: "je vais (aller)", translation: "voy a", example: "Je vais voyager en France." },
    { id: "fr10v-2", term: "tu vas / il va", translation: "vas a / va a", example: "Il va partir demain." },
    { id: "fr10v-3", term: "nous allons", translation: "vamos a", example: "Nous allons visiter Paris." },
    { id: "fr10v-4", term: "l'aeroport", translation: "el aeropuerto", example: "On arrive a l'aeroport a huit heures." },
    { id: "fr10v-5", term: "le billet", translation: "el boleto", example: "J'ai achete le billet en ligne." },
    { id: "fr10v-6", term: "la valise", translation: "la maleta", example: "J'ai fait ma valise hier soir." },
    { id: "fr10v-7", term: "reserver", translation: "reservar", example: "J'ai reserve un hotel." },
    { id: "fr10v-8", term: "l'avion", translation: "el avion", example: "L'avion decolle a dix heures." },
    { id: "fr10v-9", term: "le passeport", translation: "el pasaporte", example: "N'oublie pas ton passeport !" },
    { id: "fr10v-10", term: "un voyage inoubliable", translation: "un viaje inolvidable", example: "Ce sera un voyage inoubliable." },
    { id: "fr10v-11", term: "bientot", translation: "pronto", example: "On part bientot !" },
    { id: "fr10v-12", term: "dans + temps", translation: "dentro de (periodo)", example: "Dans une semaine, je pars." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr10v-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : mon prochain voyage",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Les projets de voyage de Claire\n" +
          "La semaine prochaine, je vais partir en Italie. Je vais rester la-bas pendant cinq jours et je " +
          "vais visiter toutes les plus belles villes. Le premier jour, je vais visiter Rome, puis je vais " +
          "aller a Florence. Je vais aussi avoir le temps de me reposer un peu. On va surement manger " +
          "beaucoup de pates ! J'espere qu'il va faire beau.\n\n" +
          "TEXTE 2 - Preparer le voyage\n" +
          "A : Tu as fait ta valise ? B : Pas encore, mais je vais la faire ce soir. A : Et ton passeport ? " +
          "B : Je vais le chercher maintenant. A : On a reserve le vol pour dix heures, on va devoir partir " +
          "tot ! B : Tu as raison, on y va !",
        glossary: [
          { term: "je vais partir / je vais rester", translation: "voy a partir / voy a quedarme" },
          { term: "je vais visiter / je vais aller", translation: "voy a visitar / voy a ir" },
          { term: "on va manger", translation: "vamos a comer" },
          { term: "la valise", translation: "la maleta" },
          { term: "je vais la faire", translation: "voy a hacerla" },
          { term: "le passeport", translation: "el pasaporte" },
          { term: "on va devoir partir", translation: "vamos a tener que partir" },
          { term: "tu as raison", translation: "tienes razon" },
        ],
        keyPhrases: [
          "El futur proche se forma con 'aller' en PRESENTE + infinitivo: je vais partir, tu vas visiter, il va manger.",
          "'Aller': je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont.",
        ],
        check: [
          { prompt: "T1 : Ou va partir Claire ?", choices: ["En Italie", "En Espagne", "En Grece"], answer: 0 },
          { prompt: "T1 : Combien de jours va-t-elle rester ?", choices: ["Cinq jours", "Trois jours", "Une semaine"], answer: 0 },
          { prompt: "T1 : Qu'est-ce qu'elle va visiter en premier ?", choices: ["Rome", "Florence", "Venise"], answer: 0 },
          { prompt: "T2 : Qu'est-ce que B n'a pas encore fait ?", choices: ["Sa valise", "Son billet", "Sa reservation"], answer: 0 },
          { prompt: "T2 : A quelle heure est le vol ?", choices: ["Dix heures", "Neuf heures", "Onze heures"], answer: 0 },
          { prompt: "T2 : Qu'est-ce qu'ils vont devoir faire ?", choices: ["Partir tot", "Attendre", "Rester"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr10v-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : le voyage",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "je vais / tu vas-il va", translation: "voy a / vas a-va a" },
        { term: "nous allons", translation: "vamos a" },
        { term: "l'aeroport / le billet", translation: "el aeropuerto / el boleto" },
        { term: "la valise / le passeport", translation: "la maleta / el pasaporte" },
        { term: "reserver", translation: "reservar" },
        { term: "l'avion", translation: "el avion" },
        { term: "bientot", translation: "pronto" },
        { term: "dans + temps", translation: "dentro de" },
      ],
      activities: [
        {
          id: "fr10v-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "je vais", right: "voy a" },
            { left: "tu vas", right: "vas a" },
            { left: "il va", right: "va a" },
            { left: "nous allons", right: "vamos a" },
          ] },
        },
        {
          id: "fr10v-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "l'aeroport", right: "el aeropuerto" },
            { left: "la valise", right: "la maleta" },
            { left: "le passeport", right: "el pasaporte" },
            { left: "reserver", right: "reservar" },
          ] },
        },
        {
          id: "fr10v-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je ___ voyager en France.' (aller, presente)",
          payload: { answer: "vais" },
          explain: "aller -> je vais.",
        },
        {
          id: "fr10v-vocab-a4", type: "cloze",
          prompt: "Completa: 'Elle ___ visiter Rome.' (aller, presente)",
          payload: { answer: "va" },
          explain: "aller -> elle va.",
        },
        {
          id: "fr10v-vocab-a5", type: "cloze",
          prompt: "Completa: 'Nous ___ partir demain.' (aller, presente)",
          payload: { answer: "allons" },
          explain: "aller -> nous allons.",
        },
        {
          id: "fr10v-vocab-a6", type: "multiple_choice",
          prompt: "Como se dice 'voy a viajar'?",
          payload: { choices: ["Je vais voyager.", "Je vas voyager.", "Je va voyager."], answer: 0 },
          explain: "'je' + 'vais' + infinitivo.",
        },
        {
          id: "fr10v-vocab-a7", type: "multiple_choice",
          prompt: "Cual es la forma de 'aller' para 'ils'?",
          payload: { choices: ["vont", "va", "allez"], answer: 0 },
          explain: "aller -> ils vont.",
        },
        {
          id: "fr10v-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["en", "Je", "Italie", "vais", "partir"], answer: ["Je", "vais", "partir", "en", "Italie"] },
          explain: "'Je vais partir en Italie'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr10v-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : le futur proche",
      intro: "Competencia de GRAMATICA. Aprende la forma mas usada para planes cercanos.",
      grammar: {
        title: "Le futur proche : aller + infinitif",
        chart: {
          title: "ALLER + INFINITIF",
          maps: "presente de 'aller' + verbo principal",
          groups: [
            {
              label: "ALLER (presente)", color: "rose",
              forms: [
                { form: "JE VAIS", subjects: "yo voy" },
                { form: "TU VAS / IL VA", subjects: "tu vas / el va" },
                { form: "NOUS ALLONS", subjects: "nosotros vamos" },
                { form: "VOUS ALLEZ / ILS VONT", subjects: "ustedes van / ellos van" },
              ],
            },
            {
              label: "ESTRUCTURA", color: "green",
              forms: [
                { form: "ALLER + INFINITIF", subjects: "= 'ir a hacer algo'" },
              ],
            },
          ],
        },
        form: "aller (vais, vas, va, allons, allez, vont) + infinitivo",
        desc: "El futuro mas usado para planes CERCANOS o seguros en frances es el futur proche: 'aller' en presente + infinitivo -- misma logica que el ingles 'going to'. Es la forma natural para hablar de planes: 'je vais voyager', 'elle va visiter'.",
        rule: "Aller (presente): je vais, tu vas, il/elle va, nous allons, vous allez, ils/elles vont + infinitivo del verbo principal. Ejemplo: 'Je vais visiter mes parents ce weekend' (voy a visitar a mis padres este fin de semana).",
        examples: ["Je vais etudier plus.", "Elle va voyager demain.", "Nous allons visiter la famille.", "Ils vont faire une fete."],
        explain: { tr: ["Voy a estudiar mas.", "Ella va a viajar manana.", "Vamos a visitar a la familia.", "Ellos van a hacer una fiesta."] },
        mistakes: [
          { wrong: "Je vais a voyager.", right: "Je vais voyager." },
          { wrong: "Elle va voyage.", right: "Elle va voyager." },
          { wrong: "Nous va visiter.", right: "Nous allons visiter." },
        ],
      },
      activities: [
        {
          id: "fr10v-gram-a1", type: "cloze",
          prompt: "Completa: 'Je ___ etudier plus.' (aller, presente)",
          payload: { answer: "vais" },
          explain: "aller -> je vais.",
        },
        {
          id: "fr10v-gram-a2", type: "cloze",
          prompt: "Completa: 'Elle ___ voyager demain.' (aller, presente)",
          payload: { answer: "va" },
          explain: "aller -> elle va.",
        },
        {
          id: "fr10v-gram-a3", type: "cloze",
          prompt: "Completa: 'Ils ___ faire une fete.' (aller, presente)",
          payload: { answer: "vont" },
          explain: "aller -> ils vont.",
        },
        {
          id: "fr10v-gram-a4", type: "multiple_choice",
          prompt: "Cual es correcto para 'voy a estudiar'?",
          payload: { choices: ["Je vais a etudier.", "Je vais etudier.", "Je vais etudie."], answer: 1 },
          explain: "Sin preposicion 'a' entre aller e infinitivo.",
        },
        {
          id: "fr10v-gram-a5", type: "multiple_choice",
          prompt: "Cual es la forma de 'aller' para 'nous'?",
          payload: { choices: ["allons", "va", "vont"], answer: 0 },
          explain: "aller -> nous allons.",
        },
        {
          id: "fr10v-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Nous va visiter la famille.", "Nous allons visiter la famille.", "Nous vont visiter la famille."], answer: 1 },
          explain: "'nous' -> 'allons'.",
        },
        {
          id: "fr10v-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["la", "Nous", "famille", "allons", "visiter"], answer: ["Nous", "allons", "visiter", "la", "famille"] },
          explain: "'Nous allons visiter la famille'.",
        },
        {
          id: "fr10v-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["une", "Ils", "fete", "vont", "faire"], answer: ["Ils", "vont", "faire", "une", "fete"] },
          explain: "'Ils vont faire une fete'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr10v-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : tes projets de voyage",
      intro: "Competencia de ESCRITURA. Cuenta tus planes de viaje, frase por frase.",
      activities: [
        {
          id: "fr10v-write-a1", type: "word_bank",
          prompt: "1. Di que mañana vas a viajar:",
          payload: { words: ["voyager", "Demain", "vais", "je"], answer: ["Demain", "je", "vais", "voyager"] },
        },
        {
          id: "fr10v-write-a2", type: "word_bank",
          prompt: "2. Di que vas a ser feliz:",
          payload: { words: ["heureux", "Je", "vais", "etre"], answer: ["Je", "vais", "etre", "heureux"] },
        },
        {
          id: "fr10v-write-a3", type: "word_bank",
          prompt: "3. Di que ellos van a hacer una fiesta:",
          payload: { words: ["une", "Ils", "fete", "vont", "faire"], answer: ["Ils", "vont", "faire", "une", "fete"] },
        },
        {
          id: "fr10v-write-a4", type: "word_bank",
          prompt: "4. Di que vas a tener mas tiempo (tu):",
          payload: { words: ["temps", "Tu", "plus", "vas", "avoir"], answer: ["Tu", "vas", "avoir", "plus", "temps"] },
        },
        {
          id: "fr10v-write-a5", type: "word_bank",
          prompt: "5. Pregunta cuales son sus planes (tes, informal):",
          payload: { words: ["sont", "Quels", "projets", "tes"], answer: ["Quels", "sont", "tes", "projets"] },
        },
        {
          id: "fr10v-write-a6", type: "multiple_choice",
          prompt: "6. El futuro con 'aller' para 'nous' es:",
          payload: { choices: ["allons", "va", "vont"], answer: 0 },
        },
        {
          id: "fr10v-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["Je vais visiter mes amis demain.", "Je vais a visiter mes amis demain.", "Je vais visitant mes amis demain."], answer: 0 },
        },
        {
          id: "fr10v-write-a8", type: "multiple_choice",
          prompt: "8. 'Nous allons faire un voyage' significa:",
          payload: { choices: ["Vamos a hacer un viaje", "Hicimos un viaje", "Hacemos un viaje"], answer: 0 },
        },
      ],
    },
  ],
};
