/**
 * main.js — Punto de entrada de la app (ES Module).
 *
 * Une las capas: arranca el router, escucha la sesion de Supabase y protege
 * las rutas. Es el unico script que el HTML carga (type="module").
 */
import { isConfigured } from "./config/supabase.js";
import { currentUser, onAuthChange, logout } from "./services/auth.js";
import { getProfile } from "./services/profiles.js";
import { renderRegister, renderLogin } from "./features/auth-ui.js";
import { renderStudent } from "./features/student.js";
import { renderTeacher } from "./features/teacher.js";
import { renderPlacement } from "./features/placement.js";
import { renderLesson } from "./features/lesson.js";
import { renderUnit } from "./features/unit.js";
import { renderLessonPlayer } from "./features/lesson-player.js";
import { renderReview } from "./features/review.js";
import { on, onNotFound, startRouter, go, currentPath } from "./ui/router.js";
import { el, mount, qs } from "./ui/dom.js";

const app = qs("#app");

/** Vista simple de bienvenida cuando no hay sesion. */
function renderHome() {
  mount(app, el("section", { class: "text-center py-10" },
    el("h1", { class: "text-4xl font-extrabold" }, "Aprende ingles con un plan hecho para ti"),
    el("p", { class: "mt-4 text-lg text-slate-600 max-w-2xl mx-auto" },
      "Examen de ubicacion (MCER), plan personalizado, contenido con IA y profesores cuando los necesites."),
    el("div", { class: "mt-8 flex gap-3 justify-center" },
      el("a", { href: "#/register", class: "bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-800" }, "Empezar gratis"),
      el("a", { href: "#/login", class: "bg-white text-indigo-700 border border-indigo-200 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50" }, "Ya tengo cuenta"))));
}

/** Aviso si Supabase aun no esta configurado (evita errores confusos). */
function renderConfigWarning() {
  mount(app, el("div", { class: "max-w-xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-6" },
    el("h1", { class: "text-xl font-bold text-amber-900" }, "Falta configurar Supabase"),
    el("p", { class: "mt-2 text-amber-800 text-sm" },
      "Edita src/config/supabase.js con la URL y la anon key de tu proyecto. Ver README.md.")));
}

/** Renderiza el dashboard correcto segun el rol del usuario logueado. */
async function renderDashboard(user) {
  const profile = await getProfile(user.id);
  if (!profile) { renderHome(); return; }
  if (profile.role === "teacher") await renderTeacher(app, user);
  else await renderStudent(app, user);
}

/** Guardia: exige sesion para ver una ruta protegida. */
async function requireAuth(render) {
  const user = await currentUser();
  if (!user) { go("/login"); return; }
  await render(user);
}

function setupRoutes() {
  on("/", async () => {
    const user = await currentUser();
    if (user) await renderDashboard(user);
    else renderHome();
  });
  on("/login", () => renderLogin(app));
  on("/register", () => renderRegister(app));
  on("/student", () => requireAuth((u) => renderStudent(app, u)));
  on("/teacher", () => requireAuth((u) => renderTeacher(app, u)));
  on("/examen", () => requireAuth((u) => renderPlacement(app, u)));
  on("/modulo/:id", (params) => requireAuth(() => renderLesson(app, params)));
  on("/unidad/:id", (params) => requireAuth((u) => renderUnit(app, params, u)));
  on("/leccion/:id", (params) => requireAuth((u) => renderLessonPlayer(app, params, u)));
  on("/repaso", () => requireAuth((u) => renderReview(app, u)));
  onNotFound(renderHome);
}

/** Actualiza el boton de sesion en el header. */
function refreshHeader(user) {
  const slot = qs("#session-slot");
  if (!slot) return;
  if (user) {
    mount(slot, el("a", {
      href: "#/", class: "underline hover:no-underline cursor-pointer",
      onclick: async (e) => { e.preventDefault(); await logout(); go("/"); },
    }, "Salir"));
  } else {
    mount(slot, el("span", { class: "flex gap-4" },
      el("a", { href: "#/login", class: "underline hover:no-underline" }, "Iniciar sesion"),
      el("a", { href: "#/register", class: "bg-white text-indigo-700 font-semibold px-3 py-1.5 rounded-md" }, "Registrarme")));
  }
}

function init() {
  if (!isConfigured) { renderConfigWarning(); return; }
  setupRoutes();
  startRouter();
  currentUser().then(refreshHeader);
  onAuthChange((user) => {
    refreshHeader(user);
    // Si esta en la raiz, refresca la vista al cambiar la sesion.
    if (currentPath() === "/") startRouter();
  });
}

init();
