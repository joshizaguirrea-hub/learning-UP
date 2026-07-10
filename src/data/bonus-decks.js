/**
 * data/bonus-decks.js — Mazos "Bonus" de conocimiento para memorizar.
 *
 * Datos PUROS. Cada mazo es una coleccion tematica con su MEDALLA. Se estudian
 * como flashcards enriquecidas y reutilizan el motor SRS (ids con prefijo
 * 'bv-'/'br-'/'bt-' para no chocar con el vocabulario de las unidades).
 *
 * item irregular: { id, front, past, participle, back, examples:[{en,es}] }
 * item regular/tiempo: { id, front, back, examples:[{en,es}] }
 *
 * Los ejemplos son nivel B1-B2 (frases reales, phrasal verbs, modismos) para
 * que el estudiante vea el verbo en uso autentico, no en frases de juguete.
 */

export const BONUS_DECKS = [
  {
    id: "irregular-verbs",
    title: "Verbos irregulares",
    subtitle: "Base - pasado - participio",
    recall: "Di el PASADO y el PARTICIPIO",
    gradient: "from-indigo-500 to-blue-600",
    practice: true,
    medalTitle: "Maestro de irregulares",
    medalDesc: "Dominaste los verbos irregulares clave",
    items: [
      { id: "bv-go", front: "go", past: "went", participle: "gone", back: "went / gone", examples: [
        { en: "I always go over the report before a meeting.", es: "Siempre reviso el informe antes de una reunion." },
        { en: "She went out of her way to help a new coworker.", es: "Hizo un gran esfuerzo por ayudar a un companero nuevo." },
        { en: "By the time we arrived, most of the food had gone.", es: "Para cuando llegamos, casi toda la comida se habia acabado." }] },
      { id: "bv-eat", front: "eat", past: "ate", participle: "eaten", back: "ate / eaten", examples: [
        { en: "We rarely eat out during the week.", es: "Rara vez comemos fuera entre semana." },
        { en: "He ate his words after the project succeeded.", es: "Se trago sus palabras cuando el proyecto tuvo exito." },
        { en: "I've never eaten anything as spicy as that.", es: "Nunca he comido algo tan picante como eso." }] },
      { id: "bv-see", front: "see", past: "saw", participle: "seen", back: "saw / seen", examples: [
        { en: "I don't see the point in arguing now.", es: "No le veo sentido a discutir ahora." },
        { en: "The manager saw through his weak excuse.", es: "El gerente se dio cuenta de su excusa floja." },
        { en: "Have you seen the latest figures?", es: "Has visto las cifras mas recientes?" }] },
      { id: "bv-come", front: "come", past: "came", participle: "come", back: "came / come", examples: [
        { en: "Great opportunities don't come around often.", es: "Las buenas oportunidades no aparecen a menudo." },
        { en: "The idea came to me while stuck in traffic.", es: "La idea se me ocurrio atascado en el trafico." },
        { en: "Your hard work has finally come to fruition.", es: "Tu esfuerzo por fin ha dado frutos." }] },
      { id: "bv-take", front: "take", past: "took", participle: "taken", back: "took / taken", examples: [
        { en: "It can take months to build a reputation.", es: "Puede tomar meses construir una reputacion." },
        { en: "She took charge of the situation right away.", es: "Ella tomo el mando de la situacion de inmediato." },
        { en: "He has taken on far too many tasks.", es: "Se ha echado encima demasiadas tareas." }] },
      { id: "bv-make", front: "make", past: "made", participle: "made", back: "made / made", examples: [
        { en: "Try to make the most of every chance.", es: "Trata de aprovechar al maximo cada oportunidad." },
        { en: "They made up their minds after a debate.", es: "Se decidieron tras un debate." },
        { en: "We've made real progress this quarter.", es: "Hemos hecho un progreso real este trimestre." }] },
      { id: "bv-know", front: "know", past: "knew", participle: "known", back: "knew / known", examples: [
        { en: "You never know what life has in store.", es: "Nunca sabes lo que la vida te tiene guardado." },
        { en: "Deep down, she knew it wouldn't work.", es: "En el fondo, sabia que no funcionaria." },
        { en: "He has known his partner for a decade.", es: "Conoce a su socio desde hace una decada." }] },
      { id: "bv-get", front: "get", past: "got", participle: "gotten", back: "got / gotten", examples: [
        { en: "It takes time to get used to a new routine.", es: "Cuesta acostumbrarse a una rutina nueva." },
        { en: "We got off to a rocky start last year.", es: "Empezamos con mal pie el ano pasado." },
        { en: "The situation has gotten out of hand.", es: "La situacion se ha salido de control." }] },
      { id: "bv-give", front: "give", past: "gave", participle: "given", back: "gave / given", examples: [
        { en: "Don't give up when things get tough.", es: "No te rindas cuando las cosas se ponen dificiles." },
        { en: "The teacher gave us a heads-up about it.", es: "El profesor nos aviso con anticipacion." },
        { en: "I've given it a lot of thought.", es: "Le he dado muchas vueltas." }] },
      { id: "bv-find", front: "find", past: "found", participle: "found", back: "found / found", examples: [
        { en: "It's hard to find time to exercise.", es: "Es dificil encontrar tiempo para hacer ejercicio." },
        { en: "After months searching, she found a job.", es: "Tras meses buscando, encontro trabajo." },
        { en: "We've found ourselves in a tricky spot.", es: "Nos hemos metido en un aprieto." }] },
      { id: "bv-think", front: "think", past: "thought", participle: "thought", back: "thought / thought", examples: [
        { en: "I can't think straight with all this noise.", es: "No puedo pensar con claridad con tanto ruido." },
        { en: "He thought twice before signing.", es: "Lo penso dos veces antes de firmar." },
        { en: "I've thought about it and I'd rather wait.", es: "Lo he pensado y prefiero esperar." }] },
      { id: "bv-tell", front: "tell", past: "told", participle: "told", back: "told / told", examples: [
        { en: "It's hard to tell if he's joking.", es: "Es dificil saber si esta bromeando." },
        { en: "She told him off for being late again.", es: "Lo regano por llegar tarde otra vez." },
        { en: "I've told you time and again to be careful.", es: "Te he dicho una y otra vez que tengas cuidado." }] },
      { id: "bv-buy", front: "buy", past: "bought", participle: "bought", back: "bought / bought", examples: [
        { en: "I wouldn't buy into every rumor you hear.", es: "Yo no me creeria cada rumor que escuchas." },
        { en: "They bought the house despite the price.", es: "Compraron la casa a pesar del precio." },
        { en: "She has bought into the company's vision.", es: "Ella ha comprado la vision de la empresa." }] },
      { id: "bv-bring", front: "bring", past: "brought", participle: "brought", back: "brought / brought", examples: [
        { en: "New technology can bring about big changes.", es: "La nueva tecnologia puede provocar grandes cambios." },
        { en: "The scandal brought down the whole team.", es: "El escandalo derribo a todo el equipo." },
        { en: "His comments have brought up a key issue.", es: "Sus comentarios han sacado a relucir un tema clave." }] },
      { id: "bv-write", front: "write", past: "wrote", participle: "written", back: "wrote / written", examples: [
        { en: "Make sure you write down the main points.", es: "Asegurate de anotar los puntos principales." },
        { en: "She wrote off the loss and moved on.", es: "Dio la perdida por perdida y siguio adelante." },
        { en: "The report is poorly written.", es: "El informe esta mal redactado." }] },
      { id: "bv-read", front: "read", past: "read", participle: "read", back: "read / read (suena 'red')", examples: [
        { en: "Try to read between the lines of his message.", es: "Trata de leer entre lineas su mensaje." },
        { en: "I read the contract carefully before signing.", es: "Lei el contrato con cuidado antes de firmar." },
        { en: "Once you've read the guidelines, let me know.", es: "Cuando hayas leido las pautas, avisame." }] },
      { id: "bv-run", front: "run", past: "ran", participle: "run", back: "ran / run", examples: [
        { en: "We're starting to run out of time.", es: "Estamos empezando a quedarnos sin tiempo." },
        { en: "The meeting ran over by almost an hour.", es: "La reunion se alargo casi una hora." },
        { en: "She has run the department for years.", es: "Ha dirigido el departamento por anos." }] },
      { id: "bv-speak", front: "speak", past: "spoke", participle: "spoken", back: "spoke / spoken", examples: [
        { en: "Actions speak louder than words.", es: "Las acciones hablan mas que las palabras." },
        { en: "He spoke up when nobody else would.", es: "Alzo la voz cuando nadie mas lo hacia." },
        { en: "I've spoken to the client about the delay.", es: "He hablado con el cliente sobre el retraso." }] },
      { id: "bv-drink", front: "drink", past: "drank", participle: "drunk", back: "drank / drunk", examples: [
        { en: "You should drink plenty of water when you travel.", es: "Deberias beber mucha agua cuando viajas." },
        { en: "They drank a toast to the newlyweds.", es: "Brindaron por los recien casados." },
        { en: "He has drunk nothing but coffee all day.", es: "No ha bebido mas que cafe en todo el dia." }] },
      { id: "bv-become", front: "become", past: "became", participle: "become", back: "became / become", examples: [
        { en: "With practice, it can become second nature.", es: "Con practica, puede volverse algo natural." },
        { en: "The situation became increasingly complex.", es: "La situacion se volvio cada vez mas compleja." },
        { en: "Remote work has become the norm for many.", es: "El trabajo remoto se ha vuelto la norma para muchos." }] },
    ],
  },
  {
    id: "regular-past",
    title: "Pasado regular (-ed)",
    subtitle: "Verbos regulares en pasado",
    recall: "Di el PASADO (-ed)",
    gradient: "from-emerald-500 to-teal-600",
    practice: true,
    medalTitle: "Rey del -ed",
    medalDesc: "Dominaste el pasado de verbos regulares",
    items: [
      { id: "br-work", front: "work", back: "worked", examples: [
        { en: "I work from home most of the week.", es: "Trabajo desde casa casi toda la semana." },
        { en: "We worked around the clock to meet the deadline.", es: "Trabajamos sin parar para cumplir el plazo." }] },
      { id: "br-play", front: "play", back: "played", examples: [
        { en: "They play a key role in the project.", es: "Juegan un papel clave en el proyecto." },
        { en: "She played it safe and kept her old job.", es: "Fue precavida y conservo su antiguo trabajo." }] },
      { id: "br-study", front: "study", back: "studied", examples: [
        { en: "I study English to boost my career.", es: "Estudio ingles para impulsar mi carrera." },
        { en: "He studied the market before investing.", es: "Estudio el mercado antes de invertir." }] },
      { id: "br-watch", front: "watch", back: "watched", examples: [
        { en: "You should watch your spending this month.", es: "Deberias vigilar tus gastos este mes." },
        { en: "We watched the situation closely for weeks.", es: "Observamos la situacion de cerca por semanas." }] },
      { id: "br-live", front: "live", back: "lived", examples: [
        { en: "I try to live within my means.", es: "Trato de vivir segun mis posibilidades." },
        { en: "They lived abroad for several years.", es: "Vivieron en el extranjero varios anos." }] },
      { id: "br-travel", front: "travel", back: "traveled", examples: [
        { en: "News travels fast in a small office.", es: "Las noticias vuelan en una oficina pequena." },
        { en: "I traveled extensively for work last year.", es: "Viaje mucho por trabajo el ano pasado." }] },
      { id: "br-cook", front: "cook", back: "cooked", examples: [
        { en: "She cooks under pressure without stress.", es: "Cocina bajo presion sin estresarse." },
        { en: "He cooked up an excuse on the spot.", es: "Se invento una excusa al instante." }] },
      { id: "br-call", front: "call", back: "called", examples: [
        { en: "I'll call the shots on this decision.", es: "Yo tomare las decisiones en esto." },
        { en: "They called off the meeting at the last minute.", es: "Cancelaron la reunion a ultima hora." }] },
      { id: "br-want", front: "want", back: "wanted", examples: [
        { en: "I want to make a good impression.", es: "Quiero causar una buena impresion." },
        { en: "She wanted nothing to do with the plan.", es: "No queria saber nada del plan." }] },
      { id: "br-start", front: "start", back: "started", examples: [
        { en: "Let's start from scratch on this design.", es: "Empecemos desde cero con este diseno." },
        { en: "The project started off on the wrong foot.", es: "El proyecto empezo con mal pie." }] },
      { id: "br-finish", front: "finish", back: "finished", examples: [
        { en: "We need to finish up before Friday.", es: "Tenemos que terminar antes del viernes." },
        { en: "She finished the task ahead of schedule.", es: "Termino la tarea antes de lo previsto." }] },
      { id: "br-stop", front: "stop", back: "stopped", examples: [
        { en: "We can't stop halfway through now.", es: "No podemos parar a medio camino ahora." },
        { en: "He stopped by the office to sign the papers.", es: "Paso por la oficina a firmar los papeles." }] },
    ],
  },
  {
    id: "past-time",
    title: "Expresiones de tiempo (pasado)",
    subtitle: "Cuando paso algo",
    recall: "Di el SIGNIFICADO en espanol",
    gradient: "from-amber-500 to-orange-600",
    medalTitle: "Viajero del tiempo",
    medalDesc: "Dominaste las expresiones de tiempo pasado",
    items: [
      { id: "bt-yesterday", front: "yesterday", back: "ayer", examples: [
        { en: "I only found out about it yesterday.", es: "Me entere de eso apenas ayer." }] },
      { id: "bt-lastnight", front: "last night", back: "anoche", examples: [
        { en: "We stayed up late working last night.", es: "Nos quedamos hasta tarde trabajando anoche." }] },
      { id: "bt-lastweek", front: "last week", back: "la semana pasada", examples: [
        { en: "She handed in her notice last week.", es: "Presento su renuncia la semana pasada." }] },
      { id: "bt-lastyear", front: "last year", back: "el ano pasado", examples: [
        { en: "The company doubled its sales last year.", es: "La empresa duplico sus ventas el ano pasado." }] },
      { id: "bt-ago", front: "two days ago", back: "hace dos dias", examples: [
        { en: "They wrapped up the deal two days ago.", es: "Cerraron el trato hace dos dias." }] },
      { id: "bt-thismorning", front: "this morning", back: "esta manana", examples: [
        { en: "I caught up on my emails this morning.", es: "Me puse al dia con mis correos esta manana." }] },
      { id: "bt-lastweekend", front: "last weekend", back: "el fin de semana pasado", examples: [
        { en: "We unplugged completely last weekend.", es: "Desconectamos por completo el fin de semana pasado." }] },
      { id: "bt-anhourago", front: "an hour ago", back: "hace una hora", examples: [
        { en: "The client called back an hour ago.", es: "El cliente devolvio la llamada hace una hora." }] },
      { id: "bt-theotherday", front: "the other day", back: "el otro dia", examples: [
        { en: "I ran into an old colleague the other day.", es: "Me encontre con un antiguo colega el otro dia." }] },
      { id: "bt-in2010", front: "back in 2010", back: "alla por 2010", examples: [
        { en: "The firm was founded back in 2010.", es: "La empresa se fundo alla por 2010." }] },
    ],
  },
];

/** Devuelve un mazo por id (o null). */
export function bonusDeckById(id) {
  return BONUS_DECKS.find((d) => d.id === id) || null;
}
