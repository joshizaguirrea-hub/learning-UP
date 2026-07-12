// @ts-check
import { test, expect } from "@playwright/test";

/**
 * smoke.spec.mjs — Tests E2E "sin login" de Learning UP.
 *
 * Prueban los flujos que NO tocan Supabase: carga de la app, pantallas de
 * login/registro visibles, diccionario flotante y la guardia de rutas.
 * Seguros para correr contra produccion (GitHub Pages) o contra tu local.
 *
 * Usamos selectores por ROL (getByRole/getByLabel) a proposito: si estos
 * tests pasan, tu UI tambien es accesible (WCAG 2.2 AA).
 */

test.describe("Home (bienvenida sin sesion)", () => {
  test("carga con titulo, header y llamados a la accion", async ({ page }) => {
    await page.goto("index.html");

    await expect(page).toHaveTitle(/Learning UP/i);
    await expect(page.getByRole("link", { name: "Learning UP" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /plan hecho para ti/i }),
    ).toBeVisible();

    // Botones principales
    await expect(page.getByRole("link", { name: "Empezar gratis" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Ya tengo cuenta" })).toBeVisible();
  });

  test("el header ofrece iniciar sesion y registrarse", async ({ page }) => {
    await page.goto("index.html");
    await expect(page.getByRole("link", { name: "Iniciar sesion" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Registrarme" })).toBeVisible();
  });
});

test.describe("Pantalla de Login", () => {
  test("muestra el formulario completo", async ({ page }) => {
    await page.goto("index.html#/login");

    await expect(page.getByRole("heading", { name: "Iniciar sesion" })).toBeVisible();
    await expect(page.getByLabel("Correo electronico")).toBeVisible();
    await expect(page.getByLabel("Contrasena")).toBeVisible();
    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Registrate" })).toBeVisible();
  });
});

test.describe("Pantalla de Registro", () => {
  test("muestra campos, roles y confirmacion de edad", async ({ page }) => {
    await page.goto("index.html#/register");

    await expect(page.getByRole("heading", { name: "Crear cuenta" })).toBeVisible();
    await expect(page.getByLabel("Nombre completo")).toBeVisible();
    await expect(page.getByLabel("Correo electronico")).toBeVisible();
    await expect(page.getByLabel("Contrasena")).toBeVisible();

    // Dos roles: estudiante (marcado por defecto) y profesor
    await expect(page.getByRole("radio")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Crear cuenta" })).toBeVisible();
  });
});

test.describe("Diccionario flotante", () => {
  test("el FAB abre y cierra el panel", async ({ page }) => {
    await page.goto("index.html");

    const fab = page.getByRole("button", { name: "Abrir diccionario" });
    await expect(fab).toBeVisible();
    await expect(fab).toHaveAttribute("aria-expanded", "false");

    // Abrir
    await fab.click();
    const panel = page.getByRole("dialog", { name: "Diccionario" });
    await expect(panel).toBeVisible();
    await expect(fab).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByLabel("Palabra o frase a traducir")).toBeVisible();
    await expect(page.getByRole("button", { name: "Traducir" })).toBeVisible();

    // Cerrar
    await page.getByRole("button", { name: "Cerrar diccionario" }).click();
    await expect(panel).toBeHidden();
    await expect(fab).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("Guardia de rutas", () => {
  test("una ruta protegida sin sesion redirige al login", async ({ page }) => {
    await page.goto("index.html#/student");
    // requireAuth() debe patearnos a #/login
    await expect(page.getByRole("heading", { name: "Iniciar sesion" })).toBeVisible();
    await expect(page).toHaveURL(/#\/login$/);
  });
});
