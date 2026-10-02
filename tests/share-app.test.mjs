/**
 * tests/share-app.test.mjs — Textos y enlaces para compartir la app.
 *
 * Corre con: node tests/share-app.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  APP_URL, shareUrl, inviteText, mailtoLink, whatsappLink, qrImageUrl, installSteps,
} from "../src/core/share-app.js";

test("la URL publica es https y apunta a la app", () => {
  assert.ok(APP_URL.startsWith("https://"), "sin https el QR y el portapapeles fallan");
  assert.ok(APP_URL.includes("learning-UP"));
  assert.ok(APP_URL.endsWith("/"), "con barra final: evita un redirect de mas");
});

test("shareUrl agrega ?ref solo si se lo piden", () => {
  assert.equal(shareUrl(), APP_URL);
  assert.equal(shareUrl("invite"), APP_URL + "?ref=invite");
});

test("shareUrl sanea el ref (no se inyecta nada en la URL)", () => {
  assert.equal(shareUrl("a b&c=1"), APP_URL + "?ref=abc1");
  assert.equal(shareUrl("../../evil"), APP_URL + "?ref=evil");
  assert.equal(shareUrl("!!!"), APP_URL, "si no queda nada util, sin parametro");
  assert.ok(!shareUrl("x".repeat(99)).includes("x".repeat(21)), "recorta a 20");
});

test("la invitacion lleva el enlace y se personaliza", () => {
  const anon = inviteText();
  assert.ok(anon.includes(APP_URL), "sin enlace la invitacion no sirve de nada");
  assert.ok(anon.includes("Learning UP"));

  const mine = inviteText("Johsua");
  assert.ok(mine.startsWith("Johsua te invita"), "personalizada");
  assert.ok(mine.includes(APP_URL));
});

test("la invitacion es corta: se lee sin abrir la notificacion", () => {
  assert.ok(inviteText("Johsua").length < 320, "demasiado larga para WhatsApp");
});

test("mailto lleva asunto y cuerpo codificados", () => {
  const link = mailtoLink("Johsua");
  assert.ok(link.startsWith("mailto:?subject="));
  assert.ok(link.includes("&body="));
  assert.ok(!link.includes("\n"), "los saltos de linea van codificados");
  assert.ok(link.includes(encodeURIComponent("Johsua")));
});

test("whatsapp lleva el texto codificado", () => {
  const link = whatsappLink();
  assert.ok(link.startsWith("https://wa.me/?text="));
  assert.ok(!link.includes(" "), "los espacios van codificados");
});

test("el QR apunta a la app y acota el tamano", () => {
  assert.ok(qrImageUrl().includes(encodeURIComponent(shareUrl("qr"))));
  assert.ok(qrImageUrl(50).includes("120x120"), "minimo legible");
  assert.ok(qrImageUrl(9999).includes("600x600"), "maximo razonable");
  assert.ok(qrImageUrl("basura").includes("240x240"), "valor invalido -> default");
});

test("las instrucciones cambian de verdad segun la plataforma", () => {
  const ios = installSteps("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari");
  const android = installSteps("Mozilla/5.0 (Linux; Android 14) Chrome/120");
  const desktop = installSteps("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120");

  assert.equal(ios.platform, "ios");
  assert.equal(android.platform, "android");
  assert.equal(desktop.platform, "desktop");

  // En iOS hay que avisar que Chrome NO sirve: es la trampa clasica.
  assert.ok(ios.steps.join(" ").includes("Safari"));
  assert.ok(android.steps.join(" ").includes("Chrome"));

  for (const g of [ios, android, desktop]) {
    assert.ok(g.steps.length >= 3, "menos de 3 pasos no guia a nadie");
    assert.ok(g.title.length > 0);
  }
});

test("un userAgent desconocido cae a las instrucciones de escritorio", () => {
  assert.equal(installSteps("").platform, "desktop");
  assert.equal(installSteps("robot-raro/1.0").platform, "desktop");
});
