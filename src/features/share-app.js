/**
 * features/share-app.js — "Invita a alguien": comparte la app y explica como
 * instalarla.
 *
 * Problema que resuelve: la app es una PWA y se INSTALA desde el navegador, no
 * desde una tienda. Eso confunde a quien espera buscarla en Play Store. Aqui se
 * entrega el enlace + un QR + instrucciones concretas de SU plataforma.
 *
 * Reusa: core/share-app.js (textos puros), ui/dom, ui/icons. El QR es un <img>
 * de un servicio publico: cero dependencias y cero peso si nadie abre el modal.
 */
import { el } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import {
  shareUrl, inviteText, mailtoLink, whatsappLink, qrImageUrl, installSteps,
} from "../core/share-app.js";

const BTN = "inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-xl " +
  "transition focus:outline focus:outline-2 focus:outline-indigo-400";

/**
 * Abre el modal para compartir la app.
 * @param {object} [opts] - { name: quien invita (para personalizar el mensaje) }
 */
export function openShareApp(opts = {}) {
  const name = opts.name || "";
  const url = shareUrl("invite");
  const guide = installSteps(navigator.userAgent);

  const close = () => { document.removeEventListener("keydown", onEsc); overlay.remove(); };
  const onEsc = (e) => { if (e.key === "Escape") close(); };

  // --- Enlace + copiar -----------------------------------------------------
  const urlBox = el("input", {
    type: "text", value: url, readonly: "true",
    class: "flex-1 min-w-0 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 " +
      "text-sm text-slate-200 font-mono",
    "aria-label": "Enlace de la app",
    onclick: (e) => e.target.select(),
  });

  // OJO: `hint` se declara ANTES que copyBtn porque el onclick lo usa en su
  // rama de error. Declararlo despues compila igual, pero al fallar el
  // portapapeles el catch reventaba por TDZ y el usuario no veia NADA.
  const hint = el("p", { class: "hidden mt-2 text-xs text-amber-300", role: "status" });

  const copyBtn = el("button", {
    type: "button",
    class: BTN + " bg-indigo-500 text-white hover:bg-indigo-400 shrink-0",
    onclick: async () => {
      // El portapapeles necesita HTTPS (o localhost) y permiso del navegador.
      // Si falla, el plan B es seleccionar el texto y decirlo claramente.
      try {
        if (!navigator.clipboard) throw new Error("sin portapapeles");
        await navigator.clipboard.writeText(url);
        copyBtn.replaceChildren(el("span", { class: "w-5 h-5", html: ICONS.check }), "Copiado");
        hint.classList.add("hidden");
        setTimeout(() => copyBtn.replaceChildren("Copiar"), 1800);
      } catch {
        urlBox.select();
        urlBox.setSelectionRange(0, url.length); // en movil, select() no basta
        hint.textContent = "No pude copiarlo solo. Ya te lo deje seleccionado: usa Ctrl+C (o Cmd+C).";
        hint.classList.remove("hidden");
      }
    },
  }, "Copiar");

  // --- Botones de envio ----------------------------------------------------
  // navigator.share solo existe en movil (y requiere HTTPS). Si no esta, se
  // muestran WhatsApp y correo, que funcionan en todos lados.
  const canNativeShare = typeof navigator.share === "function";

  const nativeBtn = canNativeShare ? el("button", {
    type: "button",
    class: BTN + " w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:brightness-110",
    onclick: async () => {
      try {
        await navigator.share({ title: "Learning UP", text: inviteText(name), url });
      } catch { /* el usuario cancelo: no es un error */ }
    },
  }, el("span", { class: "w-5 h-5", html: ICONS.share }), "Compartir...") : null;

  const sendRow = el("div", { class: "mt-3 grid grid-cols-2 gap-2" },
    el("a", {
      href: whatsappLink(name), target: "_blank", rel: "noopener",
      class: BTN + " bg-emerald-600 text-white hover:bg-emerald-500",
    }, "WhatsApp"),
    el("a", {
      href: mailtoLink(name),
      class: BTN + " border border-slate-600 bg-white/5 text-slate-200 hover:bg-white/10",
    }, "Correo"));

  // --- QR ------------------------------------------------------------------
  // Se descarga solo al abrir el modal. Si no hay red, se oculta y queda el
  // enlace: la funcion principal nunca depende del QR.
  const qrImg = el("img", {
    src: qrImageUrl(200), alt: "Codigo QR con el enlace de Learning UP",
    width: "200", height: "200",
    class: "rounded-xl bg-white p-2",
    onerror: () => { qrWrap.classList.add("hidden"); },
  });
  const qrWrap = el("div", { class: "mt-5 flex flex-col items-center" },
    qrImg,
    el("p", { class: "mt-2 text-xs text-slate-400 text-center" },
      "Apunta la camara del celular para abrirla al instante"));

  // --- Como instalar -------------------------------------------------------
  const steps = el("ol", { class: "mt-2 space-y-1.5 text-sm text-slate-300 list-decimal list-inside" },
    ...guide.steps.map((s) => el("li", {}, s)));

  const card = el("div", {
    class: "max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl " +
      "max-h-[92dvh] overflow-y-auto",
    role: "dialog", "aria-modal": "true", "aria-label": "Compartir Learning UP",
  },
    el("div", { class: "flex items-start gap-3" },
      el("span", { class: "w-11 h-11 shrink-0 grid place-items-center rounded-xl " +
        "bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white", html: ICONS.share }),
      el("div", { class: "flex-1" },
        el("h2", { class: "text-xl font-bold text-slate-100" }, "Comparte Learning UP"),
        el("p", { class: "text-sm text-slate-400 mt-0.5" },
          "Mandales el enlace. Se abre en el navegador y pueden instalarla en su pantalla de inicio.")),
      el("button", {
        type: "button", "aria-label": "Cerrar",
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg",
        onclick: close,
      }, "\u2715")),

    el("div", { class: "mt-5 flex gap-2" }, urlBox, copyBtn),
    hint,
    nativeBtn ? el("div", { class: "mt-3" }, nativeBtn) : null,
    sendRow,
    qrWrap,

    el("div", { class: "mt-5 pt-5 border-t border-white/10" },
      el("div", { class: "flex items-center gap-2" },
        el("span", { class: "w-5 h-5 text-indigo-300", html: ICONS.download }),
        el("h3", { class: "font-bold text-slate-100" }, "Como instalarla \u00b7 " + guide.title)),
      el("p", { class: "mt-1 text-xs text-slate-400" },
        "No esta en Play Store ni App Store: se instala desde el navegador, y pesa casi nada."),
      steps));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.addEventListener("keydown", onEsc);
  document.body.appendChild(overlay);
  copyBtn.focus();
  return close;
}
