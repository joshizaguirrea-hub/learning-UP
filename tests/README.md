# Pruebas — Learning UP

## Unitarias (motores de `core/`, sin navegador)

Los modulos de `core/` son logica pura y se prueban con Node nativo (sin libs):

```bash
node tests/pricing.test.mjs
```

Deben salir todas en verde. Cada motor nuevo en `core/` agrega su archivo
`*.test.mjs` aqui.

## E2E (flujos completos, fase siguiente)

Los flujos de UI (registro, login, examen) se probaran con **Playwright**
contra la app servida en local. Se documentara aqui cuando se agregue en la
Fase 1 (examen de ubicacion).
