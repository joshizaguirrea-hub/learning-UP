"""Debug del esqueleto de un GLB (sin dependencias): posicion mundial de
LeftArm/RightArm y direccion hacia sus huesos hijos. Depura relaxArms."""
import json
import struct
import sys


def load(path):
    d = open(path, "rb").read()
    assert d[:4] == b"glTF"
    off, js = 12, None
    while off < len(d):
        clen, ctype = struct.unpack("<II", d[off:off + 8])
        if ctype == 0x4E4F534A:
            js = json.loads(d[off + 8:off + 8 + clen])
        off += 8 + clen
    return js


def mat_mul(a, b):
    r = [0.0] * 16
    for i in range(4):
        for j in range(4):
            r[i * 4 + j] = sum(a[i * 4 + k] * b[k * 4 + j] for k in range(4))
    return r


def trs(node):
    t = node.get("translation", [0, 0, 0])
    x, y, z, w = node.get("rotation", [0, 0, 0, 1])
    s = node.get("scale", [1, 1, 1])
    R = [
        [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
        [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
        [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
    ]
    return [
        R[0][0] * s[0], R[0][1] * s[1], R[0][2] * s[2], t[0],
        R[1][0] * s[0], R[1][1] * s[1], R[1][2] * s[2], t[1],
        R[2][0] * s[0], R[2][1] * s[1], R[2][2] * s[2], t[2],
        0, 0, 0, 1,
    ]


def main():
    js = load(sys.argv[1])
    nodes = js["nodes"]
    name2i = {n.get("name"): i for i, n in enumerate(nodes)}
    parent = {}
    for i, n in enumerate(nodes):
        for c in n.get("children", []):
            parent[c] = i

    def world(i):
        M = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        chain = []
        while i is not None:
            chain.append(i)
            i = parent.get(i)
        for j in reversed(chain):
            M = mat_mul(M, trs(nodes[j]))
        return (M[3], M[7], M[11])

    for arm in ["LeftArm", "RightArm"]:
        if arm not in name2i:
            print(arm, "NO EXISTE"); continue
        i = name2i[arm]
        wp = world(i)
        kids = nodes[i].get("children", [])
        print(f"\n{arm}: world=({wp[0]:.3f},{wp[1]:.3f},{wp[2]:.3f}) "
              f"hijos={[nodes[k].get('name') for k in kids]}")
        for k in kids:
            cp = world(k)
            d = (cp[0] - wp[0], cp[1] - wp[1], cp[2] - wp[2])
            print(f"   -> {nodes[k].get('name')}: dir=({d[0]:.3f},{d[1]:.3f},"
                  f"{d[2]:.3f}) |dx|={abs(d[0]):.3f} |dy|={abs(d[1]):.3f}")


if __name__ == "__main__":
    main()
