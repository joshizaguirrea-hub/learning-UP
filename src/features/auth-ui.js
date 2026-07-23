/**
 * features/auth-ui.js — Formularios de registro e inicio de sesion.
 *
 * Capa de feature: orquesta el servicio de auth con la UI. No habla con
 * Supabase directamente (eso es responsabilidad de services/auth.js).
 */
import { register, login } from "../services/auth.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const INPUT = "mt-1 w-full rounded-md bg-slate-800 border border-slate-700 text-slate-100 px-3 py-2 " +
  "focus:outline focus:outline-2 focus:outline-indigo-500";
const CARD = "max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8";
const PRIMARY = "w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

/** Muestra un error accesible dentro del formulario. */
function errorBox(message) {
  return el("div", {
    role: "alert",
    class: "mt-4 bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-md px-3 py-2",
  }, message);
}

/** Vista de registro. */
export function renderRegister(container) {
  const errSlot = el("div");

  const form = el("form", {
    class: "mt-6 space-y-4",
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const result = await register({
        fullName: fd.get("full_name").trim(),
        email: fd.get("email").trim().toLowerCase(),
        password: fd.get("password"),
        role: fd.get("role"),
        isAdult: fd.get("is_adult") === "on",
      });
      if (!result.ok) {
        mount(errSlot, errorBox(result.error));
        announce(result.error);
        return;
      }
      if (result.pendingConfirmation) {
        mount(errSlot, el("div", {
          class: "mt-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 " +
            "text-sm rounded-md px-3 py-2",
        }, "Revisa tu correo para confirmar la cuenta."));
        return;
      }
      go(fd.get("role") === "student" ? "/examen" : "/teacher");
    },
  },
    field("Nombre completo", el("input", { id: "full_name", name: "full_name", type: "text", required: "", class: INPUT })),
    field("Correo electronico", el("input", { id: "email", name: "email", type: "email", required: "", class: INPUT })),
    field("Contrasena", el("input", { id: "password", name: "password", type: "password", required: "", minlength: "6", class: INPUT })),
    roleFieldset(),
    adultCheckbox(),
    el("button", { type: "submit", class: PRIMARY }, "Crear cuenta"),
  );

  const view = el("div", { class: CARD },
    el("h1", { class: "text-2xl font-bold" }, "Crear cuenta"),
    el("p", { class: "text-slate-400 text-sm mt-1" }, "Empieza a aprender ingles hoy."),
    errSlot,
    form,
    el("p", { class: "mt-4 text-sm text-slate-400" },
      "Ya tienes cuenta? ",
      el("a", { href: "#/login", class: "text-indigo-400 hover:text-indigo-300" }, "Inicia sesion")),
  );

  mount(container, view);
  focusMainHeading(container);
}

/** Vista de inicio de sesion. */
export function renderLogin(container) {
  const errSlot = el("div");

  const form = el("form", {
    class: "mt-6 space-y-4",
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const result = await login({
        email: fd.get("email").trim().toLowerCase(),
        password: fd.get("password"),
      });
      if (!result.ok) {
        mount(errSlot, errorBox(result.error));
        announce(result.error);
        return;
      }
      go("/"); // main.js redirige al dashboard segun el rol.
    },
  },
    field("Correo electronico", el("input", { id: "email", name: "email", type: "email", required: "", class: INPUT })),
    field("Contrasena", el("input", { id: "password", name: "password", type: "password", required: "", class: INPUT })),
    el("button", { type: "submit", class: PRIMARY }, "Entrar"),
  );

  const view = el("div", { class: CARD },
    el("h1", { class: "text-2xl font-bold" }, "Iniciar sesion"),
    errSlot,
    form,
    el("p", { class: "mt-4 text-sm text-slate-400" },
      "No tienes cuenta? ",
      el("a", { href: "#/register", class: "text-indigo-400 hover:text-indigo-300" }, "Registrate")),
  );

  mount(container, view);
  focusMainHeading(container);
}

// --- helpers de campos ------------------------------------------------------

function field(labelText, input) {
  return el("div", {},
    el("label", { for: input.id, class: "block text-sm font-medium" }, labelText),
    input);
}

function roleFieldset() {
  return el("fieldset", {},
    el("legend", { class: "block text-sm font-medium" }, "Quiero registrarme como"),
    el("div", { class: "mt-2 flex gap-4" },
      el("label", { class: "flex items-center gap-2 text-sm" },
        el("input", { type: "radio", name: "role", value: "student", checked: "" }), " Estudiante"),
      el("label", { class: "flex items-center gap-2 text-sm" },
        el("input", { type: "radio", name: "role", value: "teacher" }), " Profesor")));
}

function adultCheckbox() {
  return el("label", { class: "flex items-start gap-2 text-sm text-slate-300" },
    el("input", { type: "checkbox", name: "is_adult", class: "mt-1 accent-indigo-500", required: "" }),
    el("span", {}, "Confirmo que soy mayor de 18 anos."));
}
