# PiezoChiral Materials Database

A static website for exploring piezochiral materials by crystallographic point group, space group, and material formula.

The database maps the 32 crystallographic point groups into:

- Linear piezochiral
- Higher-order piezochiral
- Non-piezochiral

It also includes Materials Project-derived formula and space-group records deduplicated by `(formula, space group)`.

## Local Preview

Run a local static server from the repository root:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://localhost:4173
```

## Data Source

Materials records are sourced from the Materials Project and stored locally in `mp-materials.js`.

To regenerate the Materials Project export:

```bash
MP_API_KEY=your_materials_project_key python3 scripts/import_materials_project.py
```

The importer deduplicates records by formula and space group.

## Citation

The PiezoChiral Materials Database is based on the first work introducing the piezochiral effect and establishing the symmetry classification of piezochiral materials:

Z. Zeng, M. Först, M. Fechner, X. Deng, A. Cavalleri, and P. G. Radaelli  
**The Piezochiral Effect**  
DOI: [10.48550/arXiv.2510.21674](https://doi.org/10.48550/arXiv.2510.21674)

Please cite this work when using data or classifications from this database.

