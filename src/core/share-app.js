/**
 * core/share-app.js — Textos e invitacion para compartir la app (logica PURA).
 *
 * Sin DOM ni navigator: solo arma la URL y los mensajes -> testeable en Node.
 * La UI (modal, QR, botones) vive en features/share-app.js.
 *
 * Por que separado: el mensaje de invitacion es contenido, y el contenido se
 * revisa y se traduce. Mezclarlo con el DOM lo vuelve intocable.
 */

/** URL publica de la app (produccion). Fuente unica de verdad. */
export const APP_URL = "https://joshizaguirrea-hub.github.io/learning-UP/";

/**
 * URL para compartir, con parametro de origen opcional (?ref=) para saber por
 * donde llego la gente. No rastrea personas: solo el canal.
 */
export function shareUrl(ref = "") {
  const clean = String(ref).replace(/[^\w-]/g, "").slice(0, 20);
  return clean ? `${APP_URL}?ref=${clean}` : APP_URL;
}

/**
 * Mensaje de invitacion. Corto a proposito: se lee en una notificacion de
 * WhatsApp sin tener que abrirla.
 * @param {string} [name] - quien invita ("Johsua") para personalizar
 */
export function inviteText(name = "") {
  const who = String(name).trim();
  const intro = who
    ? `${who} te invita a aprender idiomas con Learning UP.`
    : "Te invito a aprender idiomas con Learning UP.";
  return `${intro}\n\n` +
    "Examen de ubicacion, plan a tu medida y profes con IA que te corrigen.\n" +
    "Gratis y funciona sin instalar nada: se abre en el navegador.\n\n" +
    shareUrl("invite");
}

/** Asunto para compartir por correo. */
export const MAIL_SUBJECT = "Learning UP - aprende idiomas gratis";

/** Enlace mailto listo (asunto + cuerpo ya codificados). */
export function mailtoLink(name = "") {
  return `mailto:?subject=${encodeURIComponent(MAIL_SUBJECT)}` +
    `&body=${encodeURIComponent(inviteText(name))}`;
}

/** Enlace de WhatsApp con el mensaje precargado. */
export function whatsappLink(name = "") {
  return `https://wa.me/?text=${encodeURIComponent(inviteText(name))}`;
}

/**
 * URL de un QR de la app usando un servicio publico de imagenes.
 * Se usa <img>, no una libreria: cero peso extra y cero dependencias.
 * Si no hay internet el <img> falla y la UI muestra el enlace igual.
 */
export function qrImageUrl(size = 240) {
  const px = Math.max(120, Math.min(600, Number(size) || 240));
  return "https://api.qrserver.com/v1/create-qr-code/" +
    `?size=${px}x${px}&margin=8&data=${encodeURIComponent(shareUrl("qr"))}`;
}

/**
 * Instrucciones de instalacion por plataforma. El texto cambia de verdad entre
 * sistemas: en iOS NO existe el dialogo nativo y hay que guiar a mano.
 * @param {string} ua - navigator.userAgent
 */
export function installSteps(ua = "") {
  const s = String(ua).toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(s);
  const isAndroid = /android/.test(s);

  if (isIOS) {
    return {
      platform: "ios",
      title: "En iPhone o iPad",
      steps: [
        "Abre el enlace en Safari (no funciona desde Chrome en iOS).",
        "Toca el boton Compartir: el cuadrito con la flecha hacia arriba.",
        "Baja y elige \u201cAgregar a pantalla de inicio\u201d.",
        "Listo: queda como una app mas, con su icono.",
      ],
    };
  }
  if (isAndroid) {
    return {
      platform: "android",
      title: "En Android",
      steps: [
        "Abre el enlace en Chrome.",
        "Te saldra un aviso de \u201cInstalar app\u201d: tocalo.",
        "Si no sale, abre el menu (\u22ee) y elige \u201cInstalar app\u201d.",
        "Listo: queda en tu pantalla de inicio.",
      ],
    };
  }
  return {
    platform: "desktop",
    title: "En computadora",
    steps: [
      "Abre el enlace en Chrome, Edge o Brave.",
      "En la barra de direcciones aparece un icono de instalar; hazle clic.",
      "Tambien puedes ir al menu (\u22ee) y elegir \u201cInstalar Learning UP\u201d.",
      "Se abre en su propia ventana, como un programa.",
    ],
  };
}
