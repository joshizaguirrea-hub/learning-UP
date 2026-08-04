"""tools/gen_portraits.py — Genera los retratos PNG de los profes 3D.

DEV-only: abre avatar-portrait.html en un navegador headless (Playwright), carga
cada .glb, y captura el canvas como PNG transparente en assets/teachers/. Esos
PNG son los iconos ESTATICOS del profe en toda la app (robotAvatar), asi no hace
falta correr un canvas 3D por cada iconito.

Requisito: el server local corriendo en http://localhost:5500 (Live Server).
Uso:  python tools/gen_portraits.py
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "http://localhost:5500"
OUT = Path(__file__).resolve().parent.parent / "assets" / "teachers"
AVATARS = {
    "megan": "./vendor/avatars/profe-curso.glb",
    "mathias": "./vendor/avatars/profe-conversacion.glb",
    "susan": "./vendor/avatars/profe-entrevista.glb",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    # Headed (ventana visible) para usar la GPU real: el WebGL por software
    # (swiftshader) headless no renderiza bien el modelo -> retrato en blanco.
    with sync_playwright() as p:
        browser = None
        for channel in ("msedge", "chrome"):
            try:
                browser = p.chromium.launch(channel=channel, headless=False)
                print(f"[i] usando navegador del sistema: {channel} (headed)")
                break
            except Exception as e:
                print(f"[i] {channel} no disponible: {str(e)[:80]}")
        if browser is None:
            print("[X] No hay navegador. Instala Edge/Chrome o corre 'playwright install'.")
            return 1
        page = browser.new_page(viewport={"width": 512, "height": 512},
                                device_scale_factor=2)
        page.on("console", lambda m: print(f"   [console] {m.type}: {m.text}"))
        page.on("pageerror", lambda e: print(f"   [pageerror] {e}"))
        for name, glb in AVATARS.items():
            page.goto(f"{BASE}/avatar-portrait.html?glb={glb}", wait_until="load")
            try:
                page.wait_for_function("window.__ready === true || window.__error",
                                       timeout=40000)
            except Exception as ex:
                print(f"   [timeout] {name}: {str(ex)[:80]}")
            state = page.evaluate("({ready: window.__ready, error: window.__error, "
                                  "hasCanvas: !!document.querySelector('canvas'), "
                                  "px: (document.querySelector('canvas')||{}).width})")
            print(f"   [state] {name}: {state}")
            err = state.get("error")
            if err:
                print(f"[X] {name}: {err}"); continue
            page.locator("#stage").screenshot(path=str(OUT / f"{name}.png"),
                                              omit_background=True)
            print(f"[OK] {name} -> assets/teachers/{name}.png")
        browser.close()


if __name__ == "__main__":
    sys.exit(main())
