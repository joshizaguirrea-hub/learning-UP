"""tools/glb_textures.py — Extrae las texturas embebidas de un .glb.

Uso: python tools/glb_textures.py <archivo.glb> [carpeta_salida]

Sirve para "ver" un avatar sin renderizarlo en 3D: guarda las imagenes (piel,
pelo, ropa) que trae dentro el GLB y dice a que material pertenece cada una, para
poder confirmar tono de piel / rasgos antes de asignarlo a un rol.
"""
import json
import os
import struct
import sys


def load_glb(path):
    with open(path, "rb") as f:
        data = f.read()
    assert data[:4] == b"glTF", "no es un GLB"
    _ver, _len = struct.unpack("<II", data[4:12])
    off, js, bin_chunk = 12, None, b""
    while off < len(data):
        clen, ctype = struct.unpack("<II", data[off:off + 8])
        chunk = data[off + 8:off + 8 + clen]
        if ctype == 0x4E4F534A:      # "JSON"
            js = json.loads(chunk)
        elif ctype == 0x004E4942:    # "BIN\0"
            bin_chunk = chunk
        off += 8 + clen
    return js, bin_chunk


def image_bytes(js, bin_chunk, img):
    if "bufferView" in img:
        bv = js["bufferViews"][img["bufferView"]]
        start = bv.get("byteOffset", 0)
        return bin_chunk[start:start + bv["byteLength"]]
    return None


def material_of_image(js, img_index):
    """Devuelve nombres de materiales que usan esta imagen como baseColor."""
    hits = []
    for m in js.get("materials", []):
        tex = m.get("pbrMetallicRoughness", {}).get("baseColorTexture")
        if tex is not None:
            src = js["textures"][tex["index"]].get("source")
            if src == img_index:
                hits.append(m.get("name", "?"))
    return hits


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return
    path = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else "_glb_peek"
    os.makedirs(out, exist_ok=True)
    js, bin_chunk = load_glb(path)
    imgs = js.get("images", [])
    print("imagenes:", len(imgs))
    for i, img in enumerate(imgs):
        raw = image_bytes(js, bin_chunk, img)
        if not raw:
            continue
        ext = "png" if img.get("mimeType", "").endswith("png") else "jpg"
        mats = material_of_image(js, i) or ["(sin baseColor)"]
        safe = "-".join(mats).replace("/", "_")[:40]
        fn = os.path.join(out, f"{i:02d}_{safe}.{ext}")
        with open(fn, "wb") as f:
            f.write(raw)
        print(f"  [{i}] {len(raw)//1024:5d} KB  materiales={mats}  -> {fn}")


if __name__ == "__main__":
    main()
