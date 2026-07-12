// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Config de Playwright para los tests E2E de Learning UP.
 *
 * Por defecto prueba el sitio PUBLICO (GitHub Pages). Para probar tu local:
 *   1. En una terminal:  python -m http.server 5500
 *   2. En otra:          npm run test:e2e:local
 *
 * La URL base se puede sobreescribir con la variable de entorno E2E_BASE_URL.
 */
const PUBLIC_URL = "https://joshizaguirrea-hub.github.io/learning-UP/";
const baseURL = process.env.E2E_BASE_URL || PUBLIC_URL;

export default defineConfig({
  testDir: "./tests-e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
