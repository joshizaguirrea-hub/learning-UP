/**
 * data/vocab-decks.js — Mazos "Bonus" de VOCABULARIO por nivel.
 *
 * Datos PUROS. Cuatro familias, gateadas por nivel CEFR (campo `level`):
 *   - synonyms  (A1..C2)  palabras con el mismo significado
 *   - antonyms  (A1..C2)  palabras opuestas
 *   - paronyms  (B1..C2)  palabras que se confunden (affect/effect, its/it's)
 *   - homographs(B2..C2)  misma escritura, distinto significado/pronunciacion
 *
 * Reutilizan el motor de bonos (SRS + medallas + flashcards). Son mazos de
 * RECUERDO (practice falsy): se piensa la respuesta y se comprueba.
 *
 * item: { id, front, back, examples:[{en,es}] }
 *   synonyms/antonyms -> back = el sinonimo/opuesto en ingles.
 *   paronyms          -> front = "A vs B"; back = la diferencia en espanol.
 *   homographs        -> front = la palabra; back = los 2 sentidos + pronunciacion.
 *
 * NOTA homografos: el audio util va en los EJEMPLOS (el contexto desambigua la
 * pronunciacion); la palabra suelta solo tiene una lectura posible en el TTS.
 */

const SYN_GRAD = "from-sky-500 to-cyan-600";
const ANT_GRAD = "from-rose-500 to-pink-600";
const PAR_GRAD = "from-amber-500 to-yellow-600";
const HOM_GRAD = "from-violet-500 to-purple-700";

const SYN_RECALL = "Di un SINONIMO en ingles";
const ANT_RECALL = "Di el OPUESTO en ingles";
const PAR_RECALL = "Di la DIFERENCIA";
const HOM_RECALL = "Di los 2 SIGNIFICADOS";

export const VOCAB_DECKS = [
  // ---------------------- SYNONYMS ----------------------------------------
  {
    id: "syn-a1", level: "A1", title: "Sinonimos (A1)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos A1", medalDesc: "Dominaste los sinonimos basicos",
    items: [
      { id: "sy-a1-big", front: "big", back: "large / huge", examples: [{ en: "They live in a big house.", es: "Viven en una casa grande." }] },
      { id: "sy-a1-small", front: "small", back: "little", examples: [{ en: "I have a small dog.", es: "Tengo un perro pequeno." }] },
      { id: "sy-a1-happy", front: "happy", back: "glad", examples: [{ en: "I'm happy to see you.", es: "Estoy feliz de verte." }] },
      { id: "sy-a1-fast", front: "fast", back: "quick", examples: [{ en: "He is a fast runner.", es: "El es un corredor rapido." }] },
      { id: "sy-a1-pretty", front: "pretty", back: "beautiful", examples: [{ en: "What a pretty flower!", es: "Que flor tan bonita!" }] },
      { id: "sy-a1-start", front: "start", back: "begin", examples: [{ en: "Let's start now.", es: "Empecemos ahora." }] },
    ],
  },
  {
    id: "syn-a2", level: "A2", title: "Sinonimos (A2)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos A2", medalDesc: "Dominaste los sinonimos de nivel A2",
    items: [
      { id: "sy-a2-smart", front: "smart", back: "clever", examples: [{ en: "She is very smart.", es: "Ella es muy lista." }] },
      { id: "sy-a2-easy", front: "easy", back: "simple", examples: [{ en: "The test was easy.", es: "El examen fue facil." }] },
      { id: "sy-a2-hard", front: "hard", back: "difficult", examples: [{ en: "This job is hard.", es: "Este trabajo es dificil." }] },
      { id: "sy-a2-angry", front: "angry", back: "mad", examples: [{ en: "He was angry with me.", es: "Estaba enojado conmigo." }] },
      { id: "sy-a2-tired", front: "tired", back: "sleepy", examples: [{ en: "I'm tired tonight.", es: "Estoy cansado esta noche." }] },
      { id: "sy-a2-close", front: "close", back: "shut", examples: [{ en: "Please close the door.", es: "Por favor cierra la puerta." }] },
    ],
  },
  {
    id: "syn-b1", level: "B1", title: "Sinonimos (B1)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos B1", medalDesc: "Dominaste los sinonimos de nivel B1",
    items: [
      { id: "sy-b1-important", front: "important", back: "significant", examples: [{ en: "This is an important change.", es: "Este es un cambio importante." }] },
      { id: "sy-b1-help", front: "help", back: "assist", examples: [{ en: "Can you help me with this?", es: "Puedes ayudarme con esto?" }] },
      { id: "sy-b1-show", front: "show", back: "demonstrate", examples: [{ en: "Let me show you how it works.", es: "Dejame mostrarte como funciona." }] },
      { id: "sy-b1-get", front: "get", back: "obtain", examples: [{ en: "How did you get the tickets?", es: "Como conseguiste los boletos?" }] },
      { id: "sy-b1-rich", front: "rich", back: "wealthy", examples: [{ en: "Her family is very rich.", es: "Su familia es muy rica." }] },
      { id: "sy-b1-need", front: "need", back: "require", examples: [{ en: "We need more time.", es: "Necesitamos mas tiempo." }] },
    ],
  },
  {
    id: "syn-b2", level: "B2", title: "Sinonimos (B2)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos B2", medalDesc: "Dominaste los sinonimos de nivel B2",
    items: [
      { id: "sy-b2-improve", front: "improve", back: "enhance", examples: [{ en: "We must improve the design.", es: "Debemos mejorar el diseno." }] },
      { id: "sy-b2-reduce", front: "reduce", back: "decrease", examples: [{ en: "They want to reduce costs.", es: "Quieren reducir costos." }] },
      { id: "sy-b2-crucial", front: "important", back: "crucial", examples: [{ en: "Timing is crucial here.", es: "El momento es crucial aqui." }] },
      { id: "sy-b2-delighted", front: "happy", back: "delighted", examples: [{ en: "I'm delighted with the result.", es: "Estoy encantado con el resultado." }] },
      { id: "sy-b2-strange", front: "strange", back: "peculiar", examples: [{ en: "That's a strange habit.", es: "Ese es un habito raro." }] },
      { id: "sy-b2-huge", front: "huge", back: "enormous", examples: [{ en: "It was a huge success.", es: "Fue un exito enorme." }] },
    ],
  },
  {
    id: "syn-c1", level: "C1", title: "Sinonimos (C1)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos C1", medalDesc: "Dominaste los sinonimos de nivel C1",
    items: [
      { id: "sy-c1-clear", front: "clear", back: "evident", examples: [{ en: "It's clear that we disagree.", es: "Es evidente que no estamos de acuerdo." }] },
      { id: "sy-c1-start", front: "start", back: "commence", examples: [{ en: "The ceremony will commence at noon.", es: "La ceremonia comenzara al mediodia." }] },
      { id: "sy-c1-end", front: "end", back: "conclude", examples: [{ en: "Let me conclude my point.", es: "Dejame concluir mi punto." }] },
      { id: "sy-c1-rich", front: "rich", back: "affluent", examples: [{ en: "It's an affluent neighborhood.", es: "Es un barrio adinerado." }] },
      { id: "sy-c1-angry", front: "angry", back: "furious", examples: [{ en: "She was furious about the delay.", es: "Estaba furiosa por el retraso." }] },
      { id: "sy-c1-key", front: "essential", back: "paramount", examples: [{ en: "Safety is paramount.", es: "La seguridad es primordial." }] },
    ],
  },
  {
    id: "syn-c2", level: "C2", title: "Sinonimos (C2)", subtitle: "Mismo significado",
    recall: SYN_RECALL, gradient: SYN_GRAD,
    medalTitle: "Sinonimos C2", medalDesc: "Dominaste los sinonimos de nivel C2",
    items: [
      { id: "sy-c2-brief", front: "brief", back: "succinct", examples: [{ en: "Please keep it succinct.", es: "Por favor se conciso." }] },
      { id: "sy-c2-honest", front: "honest", back: "candid", examples: [{ en: "I'll be candid with you.", es: "Sere franco contigo." }] },
      { id: "sy-c2-praise", front: "praise", back: "laud / extol", examples: [{ en: "Critics lauded the film.", es: "Los criticos elogiaron la pelicula." }] },
      { id: "sy-c2-stubborn", front: "stubborn", back: "obstinate", examples: [{ en: "He is remarkably obstinate.", es: "Es notablemente obstinado." }] },
      { id: "sy-c2-puzzling", front: "puzzling", back: "enigmatic", examples: [{ en: "She gave an enigmatic smile.", es: "Dio una sonrisa enigmatica." }] },
      { id: "sy-c2-lasting", front: "lasting", back: "enduring", examples: [{ en: "They built an enduring legacy.", es: "Construyeron un legado duradero." }] },
    ],
  },

  // ---------------------- ANTONYMS ----------------------------------------
  {
    id: "ant-a1", level: "A1", title: "Antonimos (A1)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos A1", medalDesc: "Dominaste los antonimos basicos",
    items: [
      { id: "an-a1-big", front: "big", back: "small", examples: [{ en: "An elephant is big; a mouse is small.", es: "Un elefante es grande; un raton es pequeno." }] },
      { id: "an-a1-hot", front: "hot", back: "cold", examples: [{ en: "Summer is hot; winter is cold.", es: "El verano es caluroso; el invierno es frio." }] },
      { id: "an-a1-happy", front: "happy", back: "sad", examples: [{ en: "She feels happy, not sad.", es: "Ella se siente feliz, no triste." }] },
      { id: "an-a1-fast", front: "fast", back: "slow", examples: [{ en: "A car is fast; a turtle is slow.", es: "Un carro es rapido; una tortuga es lenta." }] },
      { id: "an-a1-open", front: "open", back: "closed", examples: [{ en: "The shop is open, not closed.", es: "La tienda esta abierta, no cerrada." }] },
      { id: "an-a1-new", front: "new", back: "old", examples: [{ en: "I bought a new phone; I sold the old one.", es: "Compre un telefono nuevo; vendi el viejo." }] },
    ],
  },
  {
    id: "ant-a2", level: "A2", title: "Antonimos (A2)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos A2", medalDesc: "Dominaste los antonimos de nivel A2",
    items: [
      { id: "an-a2-easy", front: "easy", back: "difficult", examples: [{ en: "The first task was easy, the second difficult.", es: "La primera tarea fue facil, la segunda dificil." }] },
      { id: "an-a2-cheap", front: "cheap", back: "expensive", examples: [{ en: "This one is cheap; that one is expensive.", es: "Este es barato; ese es caro." }] },
      { id: "an-a2-clean", front: "clean", back: "dirty", examples: [{ en: "Keep your room clean, not dirty.", es: "Manten tu cuarto limpio, no sucio." }] },
      { id: "an-a2-early", front: "early", back: "late", examples: [{ en: "I arrived early; she arrived late.", es: "Llegue temprano; ella llego tarde." }] },
      { id: "an-a2-full", front: "full", back: "empty", examples: [{ en: "The glass is full, not empty.", es: "El vaso esta lleno, no vacio." }] },
      { id: "an-a2-strong", front: "strong", back: "weak", examples: [{ en: "The coffee is strong, the tea is weak.", es: "El cafe es fuerte, el te es debil." }] },
    ],
  },
  {
    id: "ant-b1", level: "B1", title: "Antonimos (B1)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos B1", medalDesc: "Dominaste los antonimos de nivel B1",
    items: [
      { id: "an-b1-increase", front: "increase", back: "decrease", examples: [{ en: "Sales increase in summer and decrease in winter.", es: "Las ventas suben en verano y bajan en invierno." }] },
      { id: "an-b1-accept", front: "accept", back: "reject", examples: [{ en: "They accepted my offer but rejected his.", es: "Aceptaron mi oferta pero rechazaron la de el." }] },
      { id: "an-b1-success", front: "success", back: "failure", examples: [{ en: "Learn from failure to reach success.", es: "Aprende del fracaso para lograr el exito." }] },
      { id: "an-b1-allow", front: "allow", back: "forbid", examples: [{ en: "The rules allow this but forbid that.", es: "Las reglas permiten esto pero prohiben aquello." }] },
      { id: "an-b1-brave", front: "brave", back: "cowardly", examples: [{ en: "He was brave, never cowardly.", es: "Fue valiente, nunca cobarde." }] },
      { id: "an-b1-generous", front: "generous", back: "stingy", examples: [{ en: "She is generous, not stingy.", es: "Ella es generosa, no tacana." }] },
    ],
  },
  {
    id: "ant-b2", level: "B2", title: "Antonimos (B2)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos B2", medalDesc: "Dominaste los antonimos de nivel B2",
    items: [
      { id: "an-b2-expand", front: "expand", back: "shrink", examples: [{ en: "The market can expand or shrink quickly.", es: "El mercado puede expandirse o encogerse rapido." }] },
      { id: "an-b2-praise", front: "praise", back: "criticize", examples: [{ en: "A good boss praises more than they criticize.", es: "Un buen jefe elogia mas de lo que critica." }] },
      { id: "an-b2-temporary", front: "temporary", back: "permanent", examples: [{ en: "It's a temporary fix, not a permanent one.", es: "Es un arreglo temporal, no permanente." }] },
      { id: "an-b2-flexible", front: "flexible", back: "rigid", examples: [{ en: "Be flexible, not rigid, with the plan.", es: "Se flexible, no rigido, con el plan." }] },
      { id: "an-b2-optimist", front: "optimist", back: "pessimist", examples: [{ en: "An optimist sees hope where a pessimist sees doom.", es: "Un optimista ve esperanza donde un pesimista ve ruina." }] },
      { id: "an-b2-ancient", front: "ancient", back: "modern", examples: [{ en: "The city mixes ancient ruins with modern towers.", es: "La ciudad mezcla ruinas antiguas con torres modernas." }] },
    ],
  },
  {
    id: "ant-c1", level: "C1", title: "Antonimos (C1)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos C1", medalDesc: "Dominaste los antonimos de nivel C1",
    items: [
      { id: "an-c1-abundant", front: "abundant", back: "scarce", examples: [{ en: "Water was abundant here, now it's scarce.", es: "El agua era abundante aqui, ahora es escasa." }] },
      { id: "an-c1-transparent", front: "transparent", back: "opaque", examples: [{ en: "The glass is transparent; the wall is opaque.", es: "El vidrio es transparente; la pared es opaca." }] },
      { id: "an-c1-humble", front: "humble", back: "arrogant", examples: [{ en: "Stay humble; arrogance pushes people away.", es: "Se humilde; la arrogancia aleja a la gente." }] },
      { id: "an-c1-deliberate", front: "deliberate", back: "accidental", examples: [{ en: "It was deliberate, not accidental.", es: "Fue deliberado, no accidental." }] },
      { id: "an-c1-expand", front: "expand", back: "contract", examples: [{ en: "Metals expand with heat and contract with cold.", es: "Los metales se expanden con el calor y se contraen con el frio." }] },
      { id: "an-c1-coherent", front: "coherent", back: "incoherent", examples: [{ en: "A coherent argument beats an incoherent one.", es: "Un argumento coherente vence a uno incoherente." }] },
    ],
  },
  {
    id: "ant-c2", level: "C2", title: "Antonimos (C2)", subtitle: "Palabras opuestas",
    recall: ANT_RECALL, gradient: ANT_GRAD,
    medalTitle: "Antonimos C2", medalDesc: "Dominaste los antonimos de nivel C2",
    items: [
      { id: "an-c2-benevolent", front: "benevolent", back: "malevolent", examples: [{ en: "A benevolent leader, never malevolent.", es: "Un lider benevolo, nunca malevolo." }] },
      { id: "an-c2-concise", front: "concise", back: "verbose", examples: [{ en: "Aim to be concise, not verbose.", es: "Busca ser conciso, no verboso." }] },
      { id: "an-c2-overt", front: "overt", back: "covert", examples: [{ en: "The support was covert, not overt.", es: "El apoyo fue encubierto, no abierto." }] },
      { id: "an-c2-diligent", front: "diligent", back: "negligent", examples: [{ en: "Diligent staff avoid negligent mistakes.", es: "El personal diligente evita errores negligentes." }] },
      { id: "an-c2-praise", front: "extol", back: "vilify", examples: [{ en: "The press extolled her today and vilified her yesterday.", es: "La prensa la ensalzo hoy y la vilipendio ayer." }] },
      { id: "an-c2-unite", front: "unite", back: "sever", examples: [{ en: "The deal united the firms; the scandal severed ties.", es: "El acuerdo unio a las firmas; el escandalo rompio los lazos." }] },
    ],
  },

  // ---------------------- PARONYMS (confusables) --------------------------
  {
    id: "par-b1", level: "B1", title: "Se confunden (B1)", subtitle: "Palabras parecidas",
    recall: PAR_RECALL, gradient: PAR_GRAD,
    medalTitle: "Sin confusiones B1", medalDesc: "Dominaste los confusables de nivel B1",
    items: [
      { id: "pa-b1-its", front: "its vs it's", back: "its = posesivo (su); it's = it is / it has", examples: [
        { en: "The dog wags its tail.", es: "El perro mueve su cola." },
        { en: "It's raining again.", es: "Esta lloviendo otra vez." }] },
      { id: "pa-b1-your", front: "your vs you're", back: "your = tu (posesivo); you're = you are", examples: [
        { en: "Is this your book?", es: "Es este tu libro?" },
        { en: "You're very kind.", es: "Eres muy amable." }] },
      { id: "pa-b1-their", front: "their vs there vs they're", back: "their = su; there = alli; they're = they are", examples: [
        { en: "Their car is over there, and they're inside.", es: "Su carro esta alli, y ellos estan adentro." }] },
      { id: "pa-b1-to", front: "to vs too vs two", back: "to = a/para; too = tambien/demasiado; two = dos", examples: [
        { en: "I want to go too, but it's two hours away.", es: "Yo tambien quiero ir, pero esta a dos horas." }] },
      { id: "pa-b1-then", front: "then vs than", back: "then = entonces/luego; than = que (comparacion)", examples: [
        { en: "She is taller than me, so then she goes first.", es: "Ella es mas alta que yo, entonces va primero." }] },
      { id: "pa-b1-lose", front: "lose vs loose", back: "lose = perder (verbo); loose = suelto/flojo (adj)", examples: [
        { en: "Don't lose the screw; it's already loose.", es: "No pierdas el tornillo; ya esta flojo." }] },
    ],
  },
  {
    id: "par-b2", level: "B2", title: "Se confunden (B2)", subtitle: "Palabras parecidas",
    recall: PAR_RECALL, gradient: PAR_GRAD,
    medalTitle: "Sin confusiones B2", medalDesc: "Dominaste los confusables de nivel B2",
    items: [
      { id: "pa-b2-affect", front: "affect vs effect", back: "affect = verbo (influir en); effect = sustantivo (el efecto)", examples: [
        { en: "The noise affects my focus.", es: "El ruido afecta mi concentracion." },
        { en: "The medicine had no effect.", es: "La medicina no tuvo efecto." }] },
      { id: "pa-b2-advice", front: "advice vs advise", back: "advice = consejo (sust); advise = aconsejar (verbo)", examples: [
        { en: "Let me give you some advice.", es: "Dejame darte un consejo." },
        { en: "I advise you to wait.", es: "Te aconsejo esperar." }] },
      { id: "pa-b2-accept", front: "accept vs except", back: "accept = aceptar; except = excepto", examples: [
        { en: "Everyone came except Ana.", es: "Todos vinieron excepto Ana." },
        { en: "I accept your apology.", es: "Acepto tu disculpa." }] },
      { id: "pa-b2-principal", front: "principal vs principle", back: "principal = director/principal; principle = principio (regla)", examples: [
        { en: "The principal called a meeting.", es: "El director convoco una reunion." },
        { en: "It's a matter of principle.", es: "Es cuestion de principios." }] },
      { id: "pa-b2-desert", front: "desert vs dessert", back: "desert = desierto; dessert = postre", examples: [
        { en: "The Sahara is a huge desert.", es: "El Sahara es un desierto enorme." },
        { en: "We had cake for dessert.", es: "Comimos pastel de postre." }] },
      { id: "pa-b2-quiet", front: "quiet vs quite", back: "quiet = callado/silencioso; quite = bastante", examples: [
        { en: "Please be quiet.", es: "Por favor guarda silencio." },
        { en: "It's quite cold today.", es: "Hace bastante frio hoy." }] },
    ],
  },
  {
    id: "par-c1", level: "C1", title: "Se confunden (C1)", subtitle: "Palabras parecidas",
    recall: PAR_RECALL, gradient: PAR_GRAD,
    medalTitle: "Sin confusiones C1", medalDesc: "Dominaste los confusables de nivel C1",
    items: [
      { id: "pa-c1-complement", front: "complement vs compliment", back: "complement = complementar/completar; compliment = cumplido/halago", examples: [
        { en: "The wine complements the meal.", es: "El vino complementa la comida." },
        { en: "She paid me a nice compliment.", es: "Me hizo un lindo cumplido." }] },
      { id: "pa-c1-stationary", front: "stationary vs stationery", back: "stationary = quieto/inmovil; stationery = articulos de papeleria", examples: [
        { en: "The car was stationary at the light.", es: "El carro estaba detenido en el semaforo." },
        { en: "I bought stationery for the office.", es: "Compre articulos de papeleria para la oficina." }] },
      { id: "pa-c1-elicit", front: "elicit vs illicit", back: "elicit = provocar/obtener (verbo); illicit = ilicito (adj)", examples: [
        { en: "The question elicited a strong reaction.", es: "La pregunta provoco una fuerte reaccion." },
        { en: "They ran an illicit business.", es: "Manejaban un negocio ilicito." }] },
      { id: "pa-c1-discreet", front: "discreet vs discrete", back: "discreet = discreto/prudente; discrete = separado/distinto", examples: [
        { en: "Please be discreet about this.", es: "Por favor se discreto con esto." },
        { en: "There are three discrete steps.", es: "Hay tres pasos separados." }] },
      { id: "pa-c1-ensure", front: "assure vs ensure vs insure", back: "assure = asegurar a alguien; ensure = garantizar; insure = asegurar (poliza)", examples: [
        { en: "I assure you it's fine, we ensure quality, and we insure the car.", es: "Te aseguro que esta bien, garantizamos calidad y aseguramos el auto." }] },
      { id: "pa-c1-council", front: "council vs counsel", back: "council = consejo (grupo); counsel = asesorar/asesor legal", examples: [
        { en: "The city council met today.", es: "El consejo municipal se reunio hoy." },
        { en: "She sought legal counsel.", es: "Busco asesoria legal." }] },
    ],
  },
  {
    id: "par-c2", level: "C2", title: "Se confunden (C2)", subtitle: "Palabras parecidas",
    recall: PAR_RECALL, gradient: PAR_GRAD,
    medalTitle: "Sin confusiones C2", medalDesc: "Dominaste los confusables de nivel C2",
    items: [
      { id: "pa-c2-adverse", front: "adverse vs averse", back: "adverse = adverso/desfavorable; averse = reacio a", examples: [
        { en: "Adverse weather delayed the flight.", es: "El clima adverso retraso el vuelo." },
        { en: "I'm not averse to change.", es: "No soy reacio al cambio." }] },
      { id: "pa-c2-cite", front: "cite vs site vs sight", back: "cite = citar; site = sitio/lugar; sight = vista", examples: [
        { en: "Cite the source, visit the site, enjoy the sight.", es: "Cita la fuente, visita el sitio, disfruta la vista." }] },
      { id: "pa-c2-flout", front: "flout vs flaunt", back: "flout = incumplir (una regla); flaunt = presumir/ostentar", examples: [
        { en: "They flout the rules openly.", es: "Incumplen las reglas abiertamente." },
        { en: "He loves to flaunt his wealth.", es: "Le encanta ostentar su riqueza." }] },
      { id: "pa-c2-prescribe", front: "prescribe vs proscribe", back: "prescribe = recetar/prescribir; proscribe = prohibir", examples: [
        { en: "The doctor prescribed rest.", es: "El medico receto descanso." },
        { en: "The law proscribes such acts.", es: "La ley prohibe tales actos." }] },
      { id: "pa-c2-ingenious", front: "ingenious vs ingenuous", back: "ingenious = ingenioso; ingenuous = ingenuo/candido", examples: [
        { en: "It was an ingenious solution.", es: "Fue una solucion ingeniosa." },
        { en: "Her ingenuous smile won them over.", es: "Su sonrisa candida los conquisto." }] },
      { id: "pa-c2-eminent", front: "eminent vs imminent", back: "eminent = eminente/destacado; imminent = inminente", examples: [
        { en: "An eminent scientist spoke.", es: "Hablo un cientifico eminente." },
        { en: "A storm is imminent.", es: "Una tormenta es inminente." }] },
    ],
  },

  // ---------------------- HOMOGRAPHS --------------------------------------
  {
    id: "hom-b2", level: "B2", title: "Homografos (B2)", subtitle: "Misma escritura, distinto sentido",
    recall: HOM_RECALL, gradient: HOM_GRAD,
    medalTitle: "Homografos B2", medalDesc: "Dominaste los homografos de nivel B2",
    items: [
      { id: "ho-b2-lead", front: "lead", back: "/liid/ dirigir, liderar  -  /led/ plomo (metal)", examples: [
        { en: "She will lead the team.", es: "Ella dirigira al equipo." },
        { en: "The old pipes are made of lead.", es: "Las tuberias viejas son de plomo." }] },
      { id: "ho-b2-tear", front: "tear", back: "/tir/ lagrima  -  /ter/ rasgar, romper", examples: [
        { en: "A tear ran down her face.", es: "Una lagrima corrio por su cara." },
        { en: "Don't tear the paper.", es: "No rompas el papel." }] },
      { id: "ho-b2-wind", front: "wind", back: "/wind/ viento  -  /waind/ enrollar, dar cuerda", examples: [
        { en: "The wind is very strong today.", es: "El viento esta muy fuerte hoy." },
        { en: "Wind the old clock every night.", es: "Dale cuerda al reloj viejo cada noche." }] },
      { id: "ho-b2-bow", front: "bow", back: "/bau/ inclinarse (reverencia)  -  /bou/ lazo, arco", examples: [
        { en: "The actors bow at the end.", es: "Los actores hacen una reverencia al final." },
        { en: "She tied a red bow on the gift.", es: "Ato un lazo rojo en el regalo." }] },
      { id: "ho-b2-live", front: "live", back: "/liv/ vivir (verbo)  -  /laiv/ en vivo (adjetivo)", examples: [
        { en: "I live in Mexico City.", es: "Vivo en la Ciudad de Mexico." },
        { en: "It was a live concert.", es: "Fue un concierto en vivo." }] },
      { id: "ho-b2-close", front: "close", back: "/klouz/ cerrar (verbo)  -  /klous/ cerca (adjetivo)", examples: [
        { en: "Please close the window.", es: "Por favor cierra la ventana." },
        { en: "The station is quite close.", es: "La estacion esta bastante cerca." }] },
    ],
  },
  {
    id: "hom-c1", level: "C1", title: "Homografos (C1)", subtitle: "Misma escritura, distinto sentido",
    recall: HOM_RECALL, gradient: HOM_GRAD,
    medalTitle: "Homografos C1", medalDesc: "Dominaste los homografos de nivel C1",
    items: [
      { id: "ho-c1-content", front: "content", back: "CON-tent = contenido (sust)  -  con-TENT = satisfecho (adj)", examples: [
        { en: "The content of the report is useful.", es: "El contenido del informe es util." },
        { en: "I'm content with my life.", es: "Estoy satisfecho con mi vida." }] },
      { id: "ho-c1-object", front: "object", back: "OB-ject = objeto (sust)  -  ob-JECT = objetar (verbo)", examples: [
        { en: "Pick up that object.", es: "Recoge ese objeto." },
        { en: "I object to that idea.", es: "Me opongo a esa idea." }] },
      { id: "ho-c1-present", front: "present", back: "PRE-sent = regalo/presente  -  pre-SENT = presentar", examples: [
        { en: "Thank you for the present.", es: "Gracias por el regalo." },
        { en: "I'll present the plan tomorrow.", es: "Presentare el plan manana." }] },
      { id: "ho-c1-desert", front: "desert", back: "DE-sert = desierto (sust)  -  de-SERT = abandonar (verbo)", examples: [
        { en: "The Sahara is a vast desert.", es: "El Sahara es un vasto desierto." },
        { en: "Don't desert your friends.", es: "No abandones a tus amigos." }] },
      { id: "ho-c1-refuse", front: "refuse", back: "re-FUSE = rechazar (verbo)  -  RE-fuse = basura (sust)", examples: [
        { en: "They refuse to pay the fee.", es: "Se niegan a pagar la cuota." },
        { en: "Put the refuse in the bin.", es: "Pon la basura en el bote." }] },
      { id: "ho-c1-record", front: "record", back: "RE-cord = registro/disco (sust)  -  re-CORD = grabar (verbo)", examples: [
        { en: "She set a new world record.", es: "Establecio un nuevo record mundial." },
        { en: "Let's record the song today.", es: "Grabemos la cancion hoy." }] },
    ],
  },
  {
    id: "hom-c2", level: "C2", title: "Homografos (C2)", subtitle: "Misma escritura, distinto sentido",
    recall: HOM_RECALL, gradient: HOM_GRAD,
    medalTitle: "Homografos C2", medalDesc: "Dominaste los homografos de nivel C2",
    items: [
      { id: "ho-c2-invalid", front: "invalid", back: "in-VA-lid = no valido (adj)  -  IN-va-lid = persona invalida (sust)", examples: [
        { en: "Your ticket is invalid.", es: "Tu boleto no es valido." },
        { en: "The nurse cared for the invalid.", es: "La enfermera cuido al invalido." }] },
      { id: "ho-c2-minute", front: "minute", back: "MIN-ute = minuto (sust)  -  my-NUTE = diminuto (adj)", examples: [
        { en: "Wait a minute, please.", es: "Espera un minuto, por favor." },
        { en: "There was a minute amount of dust.", es: "Habia una cantidad diminuta de polvo." }] },
      { id: "ho-c2-wound", front: "wound", back: "/wuund/ herida (sust)  -  /waund/ pasado de 'wind' (enrollo)", examples: [
        { en: "He has a deep wound.", es: "Tiene una herida profunda." },
        { en: "She wound the rope around the post.", es: "Enrollo la cuerda alrededor del poste." }] },
      { id: "ho-c2-entrance", front: "entrance", back: "EN-trance = entrada (sust)  -  en-TRANCE = cautivar (verbo)", examples: [
        { en: "Use the main entrance.", es: "Usa la entrada principal." },
        { en: "The music will entrance you.", es: "La musica te cautivara." }] },
      { id: "ho-c2-polish", front: "polish", back: "PO-lish = pulir (verbo)  -  POH-lish = polaco (Polish)", examples: [
        { en: "Polish your shoes before the interview.", es: "Pule tus zapatos antes de la entrevista." },
        { en: "She also speaks Polish.", es: "Ella tambien habla polaco." }] },
      { id: "ho-c2-sewer", front: "sewer", back: "/soo-er/ alcantarilla (sust)  -  /soh-er/ persona que cose (sust)", examples: [
        { en: "The sewer was blocked after the storm.", es: "La alcantarilla se tapo tras la tormenta." },
        { en: "The sewer mended the torn dress.", es: "El costurero remendo el vestido roto." }] },
    ],
  },
];

/** Devuelve un mazo de vocabulario por id (o null). */
export function vocabDeckById(id) {
  return VOCAB_DECKS.find((d) => d.id === id) || null;
}
