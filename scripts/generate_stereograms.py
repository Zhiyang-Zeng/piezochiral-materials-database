#!/usr/bin/env python3
"""Generate crisp SVG stereograms for the website point-group panel."""

from __future__ import annotations

import math
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "stereograms"

POINT_GROUPS = [
    ("1", "C1", "Triclinic", "chiral", True),
    ("-1", "Ci", "Triclinic", "centrosymmetric", False),
    ("2", "C2", "Monoclinic", "chiral", True),
    ("m", "Cs", "Monoclinic", "linear", True),
    ("2/m", "C2h", "Monoclinic", "centrosymmetric", False),
    ("222", "D2", "Orthorhombic", "chiral", True),
    ("mm2", "C2v", "Orthorhombic", "linear", True),
    ("mmm", "D2h", "Orthorhombic", "centrosymmetric", False),
    ("4", "C4", "Tetragonal", "chiral", True),
    ("-4", "S4", "Tetragonal", "linear", True),
    ("4/m", "C4h", "Tetragonal", "centrosymmetric", False),
    ("422", "D4", "Tetragonal", "chiral", True),
    ("4mm", "C4v", "Tetragonal", "higher", True),
    ("-42m", "D2d", "Tetragonal", "linear", True),
    ("4/mmm", "D4h", "Tetragonal", "centrosymmetric", False),
    ("3", "C3", "Trigonal", "chiral", True),
    ("-3", "S6", "Trigonal", "centrosymmetric", False),
    ("32", "D3", "Trigonal", "chiral", True),
    ("3m", "C3v", "Trigonal", "higher", True),
    ("-3m", "D3d", "Trigonal", "centrosymmetric", False),
    ("6", "C6", "Hexagonal", "chiral", True),
    ("-6", "C3h", "Hexagonal", "higher", True),
    ("6/m", "C6h", "Hexagonal", "centrosymmetric", False),
    ("622", "D6", "Hexagonal", "chiral", True),
    ("6mm", "C6v", "Hexagonal", "higher", True),
    ("-6m2", "D3h", "Hexagonal", "higher", True),
    ("6/mmm", "D6h", "Hexagonal", "centrosymmetric", False),
    ("23", "T", "Cubic", "chiral", True),
    ("m-3", "Th", "Cubic", "centrosymmetric", False),
    ("432", "O", "Cubic", "chiral", True),
    ("-43m", "Td", "Cubic", "higher", True),
    ("m-3m", "Oh", "Cubic", "centrosymmetric", False),
]

FOLD_BY_GROUP = {
    "1": 1, "-1": 1,
    "2": 2, "m": 2, "2/m": 2, "222": 2, "mm2": 2, "mmm": 2,
    "4": 4, "-4": 4, "4/m": 4, "422": 4, "4mm": 4, "-42m": 4, "4/mmm": 4,
    "3": 3, "-3": 3, "32": 3, "3m": 3, "-3m": 3,
    "6": 6, "-6": 6, "6/m": 6, "622": 6, "6mm": 6, "-6m2": 6, "6/mmm": 6,
    "23": 4, "m-3": 4, "432": 4, "-43m": 4, "m-3m": 4,
}


def file_name(point_group: str) -> str:
    return point_group.replace("/", "_").replace("-", "minus").replace(" ", "")


def circle(cx, cy, r, stroke, fill="none", width=1, opacity=1):
    return f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{fill}" stroke="{stroke}" stroke-width="{width}" opacity="{opacity}"/>'


def line(x1, y1, x2, y2, stroke, width=1, opacity=1):
    return f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{stroke}" stroke-width="{width}" opacity="{opacity}" stroke-linecap="round"/>'


def text(x, y, value, size=16, weight=500, color="#f9fafb", anchor="start", opacity=1):
    return f'<text x="{x:.2f}" y="{y:.2f}" fill="{color}" font-family="Inter, Arial, sans-serif" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}" opacity="{opacity}">{value}</text>'


def make_svg(point_group, schoenflies, crystal_system, category, supports):
    width, height = 680, 420
    cx, cy, r = 340, 224, 132
    fold = FOLD_BY_GROUP.get(point_group, 1)
    marker = "#34d399" if supports else "#f59e0b"
    accent = "#f472b6" if category == "higher" else marker
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">',
        '<rect width="680" height="420" fill="#111827"/>',
        circle(cx, cy, r * 0.33, "rgba(255,255,255,0.20)"),
        circle(cx, cy, r * 0.66, "rgba(255,255,255,0.20)"),
        circle(cx, cy, r, "rgba(255,255,255,0.55)", width=2),
    ]

    axis_count = max(4, fold * 2)
    for i in range(axis_count):
        angle = 2 * math.pi * i / axis_count
        parts.append(line(cx - math.cos(angle) * r, cy - math.sin(angle) * r, cx + math.cos(angle) * r, cy + math.sin(angle) * r, "rgba(255,255,255,0.18)"))

    parts.extend([
        circle(cx, cy, 6, "none", fill="#f9fafb"),
        circle(cx, cy - r, 5, "rgba(249,250,251,0.78)", width=2),
        circle(cx, cy + r, 5, "rgba(249,250,251,0.78)", width=2),
    ])

    for i in range(fold):
        angle = 2 * math.pi * i / fold - math.pi / 2
        ox, oy = cx + math.cos(angle) * r * 0.78, cy + math.sin(angle) * r * 0.78
        ix, iy = cx + math.cos(angle + math.pi / fold) * r * 0.42, cy + math.sin(angle + math.pi / fold) * r * 0.42
        parts.append(circle(ox, oy, 7, "none", fill=marker))
        parts.append(circle(ix, iy, 4.8, "none", fill=accent))

    if category == "centrosymmetric":
        parts.append(line(cx - r * 0.45, cy - r * 0.45, cx + r * 0.45, cy + r * 0.45, "rgba(248,113,113,0.86)", width=3))
        parts.append(line(cx + r * 0.45, cy - r * 0.45, cx - r * 0.45, cy + r * 0.45, "rgba(248,113,113,0.86)", width=3))

    parts.extend([
        text(28, 50, point_group, size=26, weight=700),
        text(28, 78, f"{schoenflies} · {crystal_system}", size=15, opacity=0.72),
        text(cx, cy - r - 14, "N", size=13, anchor="middle", opacity=0.72),
        text(cx, cy + r + 28, "S", size=13, anchor="middle", opacity=0.72),
        text(cx, cy + r + 54, f"{fold}-fold stereogram", size=13, anchor="middle", opacity=0.72),
        "</svg>",
    ])
    return "\n".join(parts)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for args in POINT_GROUPS:
        point_group = args[0]
        (OUT / f"{file_name(point_group)}.svg").write_text(make_svg(*args), encoding="utf-8")
    (OUT / "placeholder.svg").write_text(make_svg("?", "search", "Point group", "centrosymmetric", False), encoding="utf-8")
    print(f"Wrote {len(POINT_GROUPS) + 1} stereograms to {OUT}")


if __name__ == "__main__":
    main()
