"""tools/make_icons.py — Genera los iconos PWA de Learning UP.

Dibuja un icono de marca (gradiente indigo->fucsia, esquinas suaves y "UP" en
blanco) en los tamanos que piden Android/iOS para que la app sea INSTALABLE.
Salida: assets/icons/*.png. Se corre una sola vez (o cuando cambie la marca).
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

C1 = (79, 70, 229)    # indigo-600
C2 = (217, 70, 239)   # fuchsia-500


def gradient(size):
    """Gradiente diagonal C1->C2."""
    img = Image.new("RGB", (size, size), C1)
    px = img.load()
    for y in range(size):
        for x in range(size):
            t = (x + y) / (2 * (size - 1))
            px[x, y] = tuple(int(C1[i] + (C2[i] - C1[i]) * t) for i in range(3))
    return img


def load_font(size):
    for name in ("segoeuib.ttf", "arialbd.ttf", "Arialbd.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_up(img, size, pad_ratio=0.0):
    """Escribe 'UP' centrado. pad_ratio deja aire (para maskable safe-zone)."""
    d = ImageDraw.Draw(img)
    font = load_font(int(size * (0.42 - pad_ratio)))
    text = "UP"
    box = d.textbbox((0, 0), text, font=font)
    w, h = box[2] - box[0], box[3] - box[1]
    d.text(((size - w) / 2 - box[0], (size - h) / 2 - box[1]), text,
           font=font, fill=(255, 255, 255))
    return img


def rounded(img, size, radius_ratio=0.22):
    """Aplica esquinas redondeadas (icono normal)."""
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size, size], radius=int(size * radius_ratio), fill=255)
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def make(size, maskable=False):
    base = gradient(size)
    if maskable:
        # Maskable: fondo hasta el borde (el sistema recorta); texto mas al centro.
        img = draw_up(base, size, pad_ratio=0.08).convert("RGBA")
        name = f"maskable-{size}.png"
    else:
        img = rounded(draw_up(base, size), size)
        name = f"icon-{size}.png"
    img.save(OUT / name)
    print("ok", name)


for s in (192, 512):
    make(s)
    make(s, maskable=True)
# Apple touch icon (sin transparencia, 180).
gradient(180).convert("RGB").resize((180, 180))
apple = rounded(draw_up(gradient(180), 180), 180)
apple.save(OUT / "apple-touch-icon.png")
print("ok apple-touch-icon.png")
