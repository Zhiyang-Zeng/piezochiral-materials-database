#!/usr/bin/env python3
"""Import formula, space-group, and synthesis-status data from Materials Project.

Usage:
  MP_API_KEY=your_key python3 scripts/import_materials_project.py

The output is ../mp-materials.js, which the static website loads before app.js.
Records are deduplicated by normalized formula and normalized space-group symbol.
If any duplicate record is experimentally reported, the deduplicated record is
marked as experimentally reported.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "mp-materials.js"


def normalize_formula(value: str) -> str:
    return re.sub(r"\s+", "", str(value or ""))


def normalize_space_group(value: str) -> str:
    return (
        str(value or "")
        .strip()
        .replace(" ", "")
        .replace("_", "")
        .replace("−", "-")
        .replace("–", "-")
    )


def get_attr_or_key(obj, key):
    if isinstance(obj, dict):
        return obj.get(key)
    return getattr(obj, key, None)


def fetch_materials(api_key: str, limit: int | None = None):
    try:
        from mp_api.client import MPRester
    except ImportError as exc:
        raise SystemExit(
            "Missing mp-api. Install it with: python3 -m pip install mp-api"
        ) from exc

    fields = ["material_id", "formula_pretty", "symmetry", "theoretical"]
    with MPRester(api_key) as mpr:
        docs = mpr.materials.summary.search(
            deprecated=False,
            fields=fields,
            all_fields=False,
            chunk_size=1000,
        )

    deduped = {}
    for doc in docs:
        formula = normalize_formula(get_attr_or_key(doc, "formula_pretty"))
        symmetry = get_attr_or_key(doc, "symmetry")
        space_group = normalize_space_group(
            get_attr_or_key(symmetry, "symbol") or get_attr_or_key(doc, "spacegroup_symbol")
        )
        if not formula or not space_group:
            continue

        theoretical = get_attr_or_key(doc, "theoretical")
        synthesis = "experimental"
        if theoretical is False:
            synthesis = "experimental"
        elif theoretical is True:
            synthesis = "theoretical"

        key = (formula, space_group)
        if key in deduped:
            if synthesis == "experimental":
                deduped[key]["synthesis"] = "experimental"
            continue

        deduped[key] = {
            "formula": formula,
            "spaceGroup": space_group,
            "synthesis": synthesis,
        }
        if limit and len(deduped) >= limit:
            break

    return sorted(deduped.values(), key=lambda item: (item["spaceGroup"], item["formula"]))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--api-key", default=os.environ.get("MP_API_KEY"))
    parser.add_argument("--limit", type=int, default=None, help="Optional maximum record count for testing.")
    parser.add_argument("--out", type=Path, default=OUT)
    args = parser.parse_args()

    if not args.api_key:
        raise SystemExit("Provide a Materials Project API key with --api-key or MP_API_KEY.")

    records = fetch_materials(args.api_key, limit=args.limit)
    payload = "window.materialsProjectMaterials = "
    payload += json.dumps(records, ensure_ascii=False, indent=2)
    payload += ";\n"
    args.out.write_text(payload, encoding="utf-8")
    print(f"Wrote {len(records)} deduplicated records to {args.out}")


if __name__ == "__main__":
    main()
