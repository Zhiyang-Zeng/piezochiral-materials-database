const symmetryClasses = [
  {
    pointGroup: "m",
    schoenflies: "Cs",
    order: "linear",
    supports: true,
    form: "χ = a εxy + b εyz",
    note: "Linear pseudoscalar response is allowed for shear strains compatible with the single mirror.",
    exampleSpaceGroups: ["Pm", "Pc", "Cm", "Cc"]
  },
  {
    pointGroup: "mm2",
    schoenflies: "C2v",
    order: "linear",
    supports: true,
    form: "χ = a εxy",
    note: "Two mirror constraints leave one independent linear shear coupling.",
    exampleSpaceGroups: ["Pmm2", "Cmc21", "Pna21"]
  },
  {
    pointGroup: "-4",
    schoenflies: "S4",
    order: "linear",
    supports: true,
    form: "χ = a(εxx - εyy) + b εxy",
    note: "The improper fourfold axis permits two independent in-plane linear invariants.",
    exampleSpaceGroups: ["P-4", "I-4"]
  },
  {
    pointGroup: "-42m",
    aliases: ["-4m2", "4bar2m", "D2d"],
    schoenflies: "D2d",
    order: "linear",
    supports: true,
    form: "χ = a(εxx - εyy)",
    note: "Uniaxial strain along x and y produces opposite handedness.",
    exampleSpaceGroups: ["I-42d", "P-42m", "P-4m2"]
  },
  {
    pointGroup: "4mm",
    schoenflies: "C4v",
    order: "second",
    supports: true,
    form: "χ = a(εxx - εyy)εxy",
    note: "The first nonzero piezochiral term is quadratic in strain.",
    exampleSpaceGroups: ["P4mm", "P4bm", "I4cm"]
  },
  {
    pointGroup: "3m",
    schoenflies: "C3v",
    order: "second",
    supports: true,
    form: "χ = a[(εxx - εyy)εxz - 2εxyεyz]",
    note: "Trigonal mirror symmetry removes the linear term but leaves a quadratic invariant.",
    exampleSpaceGroups: ["R3m", "P3m1", "P31m"]
  },
  {
    pointGroup: "-6m2",
    aliases: ["-62m", "D3h"],
    schoenflies: "D3h",
    order: "second",
    supports: true,
    form: "χ = a[(εxx - εyy)εxz - 2εxyεyz]",
    note: "The leading response is second order; layered GaSe-type materials fall here.",
    exampleSpaceGroups: ["P-6m2", "P-62m"]
  },
  {
    pointGroup: "-6",
    schoenflies: "C3h",
    order: "second",
    supports: true,
    form: "χ = a[(εxx - εyy)εxz - 2εxyεyz] + b[(εxx - εyy)εyz + 2εxyεxz]",
    note: "Two independent quadratic invariants are symmetry allowed.",
    exampleSpaceGroups: ["P-6"]
  },
  {
    pointGroup: "-43m",
    aliases: ["4bar3m", "Td"],
    schoenflies: "Td",
    order: "third",
    supports: true,
    form: "χ = a(εxx - εyy)(εyy - εzz)(εzz - εxx) + b[(εxx - εyy)εyz² + (εyy - εzz)εxz² + (εzz - εxx)εxy²]",
    note: "Cubic tetrahedral symmetry pushes the leading piezochiral response to third order.",
    exampleSpaceGroups: ["F-43m", "I-43m", "P-43m"]
  },
  {
    pointGroup: "6mm",
    schoenflies: "C6v",
    order: "third",
    supports: true,
    form: "χ = a[εxy(εxz² - εyz²) + εxzεyz(εxx - εyy)] + b[εxy(3εxx² + 3εyy² - 6εxxεyy - 4εxy²)]",
    note: "Hexagonal polar symmetry allows chirality only through third-order strain combinations.",
    exampleSpaceGroups: ["P63mc", "P6mm"]
  }
];

const pointGroupOrder = [
  "1", "-1", "2", "m", "2/m", "222", "mm2", "mmm",
  "4", "-4", "4/m", "422", "4mm", "-42m", "4/mmm",
  "3", "-3", "32", "3m", "-3m",
  "6", "-6", "6/m", "622", "6mm", "-6m2", "6/mmm",
  "23", "m-3", "432", "-43m", "m-3m"
];

const additionalPointGroups = [
  {
    pointGroup: "1",
    schoenflies: "C1",
    crystalSystem: "Triclinic",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This point group is chiral. It can host handed structures without strain-induced symmetry lowering.",
    exampleSpaceGroups: ["P1"]
  },
  {
    pointGroup: "-1",
    aliases: ["1bar"],
    schoenflies: "Ci",
    crystalSystem: "Triclinic",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "Centrosymmetry forbids a pseudoscalar chirality response to ordinary strain.",
    exampleSpaceGroups: ["P-1"]
  },
  {
    pointGroup: "2",
    schoenflies: "C2",
    crystalSystem: "Monoclinic",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This chiral group has no mirror, inversion, or rotoinversion operation.",
    exampleSpaceGroups: ["P2", "C2"]
  },
  {
    pointGroup: "2/m",
    schoenflies: "C2h",
    crystalSystem: "Monoclinic",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This achiral centrosymmetric group is outside the piezochiral set.",
    exampleSpaceGroups: ["P2/m", "C2/m", "P21/c"]
  },
  {
    pointGroup: "222",
    schoenflies: "D2",
    crystalSystem: "Orthorhombic",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "A chiral orthorhombic group; strain can tune properties but does not induce chirality from an achiral phase.",
    exampleSpaceGroups: ["P222", "P212121"]
  },
  {
    pointGroup: "mmm",
    schoenflies: "D2h",
    crystalSystem: "Orthorhombic",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This achiral centrosymmetric class is classified as trivial achiral in the paper's 32-group summary.",
    exampleSpaceGroups: ["Pmmm", "Pnma", "Cmcm"]
  },
  {
    pointGroup: "4",
    schoenflies: "C4",
    crystalSystem: "Tetragonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This tetragonal group is chiral because it contains only proper rotations.",
    exampleSpaceGroups: ["P4", "I4"]
  },
  {
    pointGroup: "4/m",
    schoenflies: "C4h",
    crystalSystem: "Tetragonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "Centrosymmetry forbids linear and higher-order piezochiral induction by ordinary strain.",
    exampleSpaceGroups: ["P4/m", "I4/m"]
  },
  {
    pointGroup: "422",
    schoenflies: "D4",
    crystalSystem: "Tetragonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This chiral class contains only proper rotations.",
    exampleSpaceGroups: ["P422", "I422", "P41212"]
  },
  {
    pointGroup: "4/mmm",
    schoenflies: "D4h",
    crystalSystem: "Tetragonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This is a trivial achiral class in the paper's classification.",
    exampleSpaceGroups: ["P4/mmm", "I4/mmm"]
  },
  {
    pointGroup: "3",
    schoenflies: "C3",
    crystalSystem: "Trigonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This trigonal point group is chiral.",
    exampleSpaceGroups: ["P3", "R3"]
  },
  {
    pointGroup: "-3",
    aliases: ["3bar"],
    schoenflies: "S6",
    crystalSystem: "Trigonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "The rotoinversion symmetry includes inversion, forbidding piezochiral induction.",
    exampleSpaceGroups: ["P-3", "R-3"]
  },
  {
    pointGroup: "32",
    schoenflies: "D3",
    crystalSystem: "Trigonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "A chiral trigonal class containing only proper rotations.",
    exampleSpaceGroups: ["P312", "P321", "R32"]
  },
  {
    pointGroup: "-3m",
    aliases: ["-3m1", "-31m", "3barm"],
    schoenflies: "D3d",
    crystalSystem: "Trigonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This centrosymmetric class is achiral and piezochiral-forbidden.",
    exampleSpaceGroups: ["R-3m", "P-3m1", "P-31m"]
  },
  {
    pointGroup: "6",
    schoenflies: "C6",
    crystalSystem: "Hexagonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This hexagonal group is chiral because it has only proper rotations.",
    exampleSpaceGroups: ["P6", "P61", "P65"]
  },
  {
    pointGroup: "6/m",
    schoenflies: "C6h",
    crystalSystem: "Hexagonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "Centrosymmetry places this group in the trivial achiral set.",
    exampleSpaceGroups: ["P6/m"]
  },
  {
    pointGroup: "622",
    schoenflies: "D6",
    crystalSystem: "Hexagonal",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "A chiral hexagonal group with only proper rotations.",
    exampleSpaceGroups: ["P622", "P6122", "P6522"]
  },
  {
    pointGroup: "6/mmm",
    schoenflies: "D6h",
    crystalSystem: "Hexagonal",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This is a centrosymmetric trivial-achiral class.",
    exampleSpaceGroups: ["P6/mmm"]
  },
  {
    pointGroup: "23",
    schoenflies: "T",
    crystalSystem: "Cubic",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "A chiral cubic point group with tetrahedral proper rotations.",
    exampleSpaceGroups: ["P23", "I23"]
  },
  {
    pointGroup: "m-3",
    aliases: ["m3bar", "m3"],
    schoenflies: "Th",
    crystalSystem: "Cubic",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This cubic centrosymmetric class is achiral and piezochiral-forbidden.",
    exampleSpaceGroups: ["Pm-3", "Im-3"]
  },
  {
    pointGroup: "432",
    schoenflies: "O",
    crystalSystem: "Cubic",
    category: "chiral",
    order: "intrinsic",
    supports: false,
    form: "Already chiral: piezochiral induction from an achiral parent is not applicable.",
    note: "This high-symmetry cubic class is chiral but not an achiral piezochiral-induction class.",
    exampleSpaceGroups: ["P432", "F432", "I432"]
  },
  {
    pointGroup: "m-3m",
    aliases: ["m3m", "m3barm"],
    schoenflies: "Oh",
    crystalSystem: "Cubic",
    category: "centrosymmetric",
    order: "forbidden",
    supports: false,
    form: "Piezochiral coupling forbidden",
    note: "This centrosymmetric cubic class belongs to the trivial achiral set.",
    exampleSpaceGroups: ["Pm-3m", "Fm-3m", "Im-3m"]
  }
];

symmetryClasses.push(...additionalPointGroups);
symmetryClasses.sort((a, b) => pointGroupOrder.indexOf(a.pointGroup) - pointGroupOrder.indexOf(b.pointGroup));
symmetryClasses.forEach((entry) => {
  if (!entry.category) entry.category = entry.order === "linear" ? "linear" : "higher";
  if (!entry.crystalSystem) {
    entry.crystalSystem = {
      m: "Monoclinic",
      mm2: "Orthorhombic",
      "-4": "Tetragonal",
      "-42m": "Tetragonal",
      "4mm": "Tetragonal",
      "3m": "Trigonal",
      "-6": "Hexagonal",
      "6mm": "Hexagonal",
      "-6m2": "Hexagonal",
      "-43m": "Cubic"
    }[entry.pointGroup];
  }
});

const chiralTensorForms = {
  "1": "C = a εxx + b εyy + c εzz + d εxy + e εxz + f εyz",
  "2": "C = a εxx + b εyy + c εzz + d εxz",
  "222": "C = a εxx + b εyy + c εzz",
  "4": "C = a (εxx + εyy) + b εzz",
  "422": "C = a (εxx + εyy) + b εzz",
  "3": "C = a (εxx + εyy) + b εzz",
  "32": "C = a (εxx + εyy) + b εzz",
  "6": "C = a (εxx + εyy) + b εzz",
  "622": "C = a (εxx + εyy) + b εzz",
  "23": "C = a (εxx + εyy + εzz)",
  "432": "C = a (εxx + εyy + εzz)"
};

symmetryClasses.forEach((entry) => {
  if (entry.category !== "chiral") return;
  entry.order = "linear-chiral";
  entry.supports = true;
  entry.form = chiralTensorForms[entry.pointGroup];
  entry.note = "Piezochiral coupling is symmetry-allowed in this chiral point group and modulates the existing chiral order parameter.";
});

const spaceGroupBlocks = [
  { pointGroup: "1", symbols: ["P1"] },
  { pointGroup: "-1", symbols: ["P-1"] },
  { pointGroup: "2", symbols: ["P2", "P21", "C2"] },
  { pointGroup: "m", symbols: ["Pm", "Pc", "Cm", "Cc"] },
  { pointGroup: "2/m", symbols: ["P2/m", "P21/m", "C2/m", "P2/c", "P21/c", "C2/c"] },
  { pointGroup: "222", symbols: ["P222", "P2221", "P21212", "P212121", "C2221", "C222", "F222", "I222", "I212121"] },
  { pointGroup: "mm2", symbols: ["Pmm2", "Pmc21", "Pcc2", "Pma2", "Pca21", "Pnc2", "Pmn21", "Pba2", "Pna21", "Pnn2", "Cmm2", "Cmc21", "Ccc2", "Amm2", "Aem2", "Ama2", "Aea2", "Fmm2", "Fdd2", "Imm2", "Iba2", "Ima2"] },
  { pointGroup: "mmm", symbols: ["Pmmm", "Pnnn", "Pccm", "Pban", "Pmma", "Pnna", "Pmna", "Pcca", "Pbam", "Pccn", "Pbcm", "Pnnm", "Pmmn", "Pbcn", "Pbca", "Pnma", "Cmcm", "Cmce", "Cmmm", "Cccm", "Cmme", "Ccce", "Fmmm", "Fddd", "Immm", "Ibam", "Ibca", "Imma"] },
  { pointGroup: "4", symbols: ["P4", "P41", "P42", "P43", "I4", "I41"] },
  { pointGroup: "-4", symbols: ["P-4", "I-4"] },
  { pointGroup: "4/m", symbols: ["P4/m", "P42/m", "P4/n", "P42/n", "I4/m", "I41/a"] },
  { pointGroup: "422", symbols: ["P422", "P4212", "P4122", "P41212", "P4222", "P42212", "P4322", "P43212", "I422", "I4122"] },
  { pointGroup: "4mm", symbols: ["P4mm", "P4bm", "P42cm", "P42nm", "P4cc", "P4nc", "P42mc", "P42bc", "I4mm", "I4cm", "I41md", "I41cd"] },
  { pointGroup: "-42m", symbols: ["P-42m", "P-42c", "P-421m", "P-421c", "P-4m2", "P-4c2", "P-4b2", "P-4n2", "I-4m2", "I-4c2", "I-42m", "I-42d"] },
  { pointGroup: "4/mmm", symbols: ["P4/mmm", "P4/mcc", "P4/nbm", "P4/nnc", "P4/mbm", "P4/mnc", "P4/nmm", "P4/ncc", "P42/mmc", "P42/mcm", "P42/nbc", "P42/nnm", "P42/mbc", "P42/mnm", "P42/nmc", "P42/ncm", "I4/mmm", "I4/mcm", "I41/amd", "I41/acd"] },
  { pointGroup: "3", symbols: ["P3", "P31", "P32", "R3"] },
  { pointGroup: "-3", symbols: ["P-3", "R-3"] },
  { pointGroup: "32", symbols: ["P312", "P321", "P3112", "P3121", "P3212", "P3221", "R32"] },
  { pointGroup: "3m", symbols: ["P3m1", "P31m", "P3c1", "P31c", "R3m", "R3c"] },
  { pointGroup: "-3m", symbols: ["P-31m", "P-31c", "P-3m1", "P-3c1", "R-3m", "R-3c"] },
  { pointGroup: "6", symbols: ["P6", "P61", "P65", "P62", "P64", "P63"] },
  { pointGroup: "-6", symbols: ["P-6"] },
  { pointGroup: "6/m", symbols: ["P6/m", "P63/m"] },
  { pointGroup: "622", symbols: ["P622", "P6122", "P6522", "P6222", "P6422", "P6322"] },
  { pointGroup: "6mm", symbols: ["P6mm", "P6cc", "P63cm", "P63mc"] },
  { pointGroup: "-6m2", symbols: ["P-6m2", "P-6c2", "P-62m", "P-62c"] },
  { pointGroup: "6/mmm", symbols: ["P6/mmm", "P6/mcc", "P63/mcm", "P63/mmc"] },
  { pointGroup: "23", symbols: ["P23", "F23", "I23", "P213", "I213"] },
  { pointGroup: "m-3", symbols: ["Pm-3", "Pn-3", "Fm-3", "Fd-3", "Im-3", "Pa-3", "Ia-3"] },
  { pointGroup: "432", symbols: ["P432", "P4232", "F432", "F4132", "I432", "P4332", "P4132", "I4132"] },
  { pointGroup: "-43m", symbols: ["P-43m", "F-43m", "I-43m", "P-43n", "F-43c", "I-43d"] },
  { pointGroup: "m-3m", symbols: ["Pm-3m", "Pn-3n", "Pm-3n", "Pn-3m", "Fm-3m", "Fm-3c", "Fd-3m", "Fd-3c", "Im-3m", "Ia-3d"] }
];

const spaceGroups = spaceGroupBlocks.flatMap((block) =>
  block.symbols.map((symbol, index) => ({
    number: spaceGroupBlocks
      .slice(0, spaceGroupBlocks.indexOf(block))
      .reduce((total, item) => total + item.symbols.length, 0) + index + 1,
    symbol,
    pointGroup: block.pointGroup
  }))
);

const materials = [
  {
    formula: "AgGaS2",
    name: "Silver thiogallate",
    pointGroup: "-42m",
    spaceGroup: "I-42d",
    order: "linear",
    evidence: "experiment",
    tensor: "χ = a(εxx - εyy)",
    chiralSite: "S(8d)",
    note: "Prototype system from SI Table S13; strain-induced optical activity is experimentally confirmed."
  },
  {
    formula: "gamma-LiBO2",
    name: "gamma lithium metaborate",
    pointGroup: "-42m",
    spaceGroup: "I-42d",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy)",
    chiralSite: "O(8d)",
    note: "Listed in SI Table S13 with locally chiral oxygen sites."
  },
  {
    formula: "KH2PO4",
    name: "Potassium dihydrogen phosphate",
    pointGroup: "-42m",
    spaceGroup: "I-42d",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy)",
    chiralSite: "H(8d), O(16e)",
    note: "Listed in SI Table S13 with locally chiral hydrogen and oxygen sites."
  },
  {
    formula: "ZnGeP2",
    name: "Zinc germanium phosphide",
    pointGroup: "-42m",
    spaceGroup: "I-42d",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy)",
    chiralSite: "P(8d)",
    note: "Listed in SI Table S13 with locally chiral phosphorus sites."
  },
  {
    formula: "LiB3O5",
    name: "Lithium triborate",
    pointGroup: "mm2",
    spaceGroup: "Pna21",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy",
    chiralSite: "Li(4a), B(4a), O(4a)",
    note: "Listed in SI Table S13 with locally chiral Li, B, and O sites."
  },
  {
    formula: "KTiPO5",
    name: "Potassium titanyl phosphate",
    pointGroup: "mm2",
    spaceGroup: "Pna21",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy",
    chiralSite: "K(4a), Ti(4a), P(4a), O(4a)",
    note: "Listed in SI Table S13 with locally chiral K, Ti, P, and O sites."
  },
  {
    formula: "Bi2SeO5",
    name: "Bismuth selenite oxide",
    pointGroup: "mm2",
    spaceGroup: "Aem2",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy",
    chiralSite: "O(4b), Bi(8d), Se(8d), O(8d)",
    note: "Listed in SI Table S13 with locally chiral O, Bi, and Se sites."
  },
  {
    formula: "SrB4O7",
    name: "Strontium tetraborate",
    pointGroup: "mm2",
    spaceGroup: "Pmn21",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy",
    chiralSite: "B(4b), O(4b)",
    note: "Listed in SI Table S13 with locally chiral boron and oxygen sites."
  },
  {
    formula: "BPO4",
    name: "Boron phosphate",
    pointGroup: "-4",
    spaceGroup: "I-4",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy) + b εxy",
    chiralSite: "O(8g)",
    note: "Listed in SI Table S13 with locally chiral oxygen sites."
  },
  {
    formula: "CdAl2S4",
    name: "Cadmium aluminum sulfide",
    pointGroup: "-4",
    spaceGroup: "I-4",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy) + b εxy",
    chiralSite: "S(8g)",
    note: "Listed in SI Table S13 with locally chiral sulfur sites."
  },
  {
    formula: "NaI3O8",
    name: "Sodium iodine oxide",
    pointGroup: "-4",
    spaceGroup: "P-4",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy) + b εxy",
    chiralSite: "I(2g), I(4h), O(4h)",
    note: "Listed in SI Table S13 with locally chiral iodine and oxygen sites."
  },
  {
    formula: "CsAs4F13",
    name: "Cesium arsenic fluoride",
    pointGroup: "-4",
    spaceGroup: "I-4",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a(εxx - εyy) + b εxy",
    chiralSite: "As(8g), F(8g)",
    note: "Listed in SI Table S13 with locally chiral arsenic and fluorine sites."
  },
  {
    formula: "Cd(AlCl4)2",
    name: "Cadmium tetrachloroaluminate",
    pointGroup: "m",
    spaceGroup: "Pc",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy + b εyz",
    chiralSite: "Cd(2a), Al(2a), Cl(2a)",
    note: "Listed in SI Table S13 with locally chiral Cd, Al, and Cl sites."
  },
  {
    formula: "SnTa2O8",
    name: "Tin tantalum oxide",
    pointGroup: "m",
    spaceGroup: "Cc",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy + b εyz",
    chiralSite: "Sn(4a), Ta(4a), O(4a)",
    note: "Listed in SI Table S13 with locally chiral Sn, Ta, and O sites."
  },
  {
    formula: "Te2P2O9",
    name: "Tellurium phosphate oxide",
    pointGroup: "m",
    spaceGroup: "Cc",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy + b εyz",
    chiralSite: "Te(4a), P(4a), O(4a)",
    note: "Listed in SI Table S13 with locally chiral Te, P, and O sites."
  },
  {
    formula: "As2O(SO4)2",
    name: "Arsenic oxide sulfate",
    pointGroup: "m",
    spaceGroup: "Pc",
    order: "linear",
    evidence: "symmetry",
    tensor: "χ = a εxy + b εyz",
    chiralSite: "As(2a), O(2a), S(2a)",
    note: "Listed in SI Table S13 with locally chiral As, O, and S sites."
  }
];

function normalizeImportedSpaceGroup(value) {
  return String(value || "")
    .trim()
    .replaceAll(" ", "")
    .replaceAll("_", "")
    .replaceAll("−", "-")
    .replaceAll("–", "-");
}

function materialFromImportedRecord(record) {
  const formula = String(record.formula || "").trim();
  const spaceGroupSymbol = normalizeImportedSpaceGroup(record.spaceGroup);
  const spaceGroup = spaceGroups.find((item) => item.symbol === spaceGroupSymbol);
  if (!formula || !spaceGroup) return null;

  const pointGroup = symmetryClasses.find((entry) => entry.pointGroup === spaceGroup.pointGroup);
  if (!pointGroup) return null;

  return {
    formula,
    name: formula,
    pointGroup: pointGroup.pointGroup,
    spaceGroup: spaceGroup.symbol,
    order: pointGroup.order,
    evidence: "symmetry",
    tensor: pointGroup.form,
    source: "materials-project",
    note: "Imported from Materials Project and deduplicated by formula and space group."
  };
}

const importedMaterialKeys = new Set(materials.map((item) => `${item.formula}::${item.spaceGroup}`));
const importedMaterials = (window.materialsProjectMaterials || [])
  .map(materialFromImportedRecord)
  .filter(Boolean)
  .filter((item) => {
    const key = `${item.formula}::${item.spaceGroup}`;
    if (importedMaterialKeys.has(key)) return false;
    importedMaterialKeys.add(key);
    return true;
  });

importedMaterials.forEach((item) => materials.push(item));

const spaceGroupIndex = new Map();
spaceGroups.forEach((spaceGroup) => {
  spaceGroupIndex.set(normalize(spaceGroup.symbol), spaceGroup);
});
materials.forEach((material) => {
  const existing = spaceGroupIndex.get(normalize(material.spaceGroup));
  if (existing) return;
  spaceGroupIndex.set(normalize(material.spaceGroup), {
    number: null,
    symbol: material.spaceGroup,
    pointGroup: material.pointGroup
  });
});
symmetryClasses.forEach((entry) => {
  entry.exampleSpaceGroups.forEach((sg) => {
    if (spaceGroupIndex.has(normalize(sg))) return;
    spaceGroupIndex.set(normalize(sg), {
      number: null,
      symbol: sg,
      pointGroup: entry.pointGroup
    });
  });
});

const queryInput = document.querySelector("#query");
const lookupResult = document.querySelector("#lookupResult");
const materialRows = document.querySelector("#materialRows");
const orderFilter = document.querySelector("#orderFilter");
const evidenceFilter = document.querySelector("#evidenceFilter");
const pointGroupSelect = document.querySelector("#pointGroupSelect");
const spaceGroupSelect = document.querySelector("#spaceGroupSelect");
const activeGroupFilter = document.querySelector("#activeGroupFilter");
const classGrid = document.querySelector("#classGrid");
const tableMeta = document.querySelector("#tableMeta");
const stereogramImage = document.querySelector("#stereogramImage");
const materialStatus = document.querySelector("#materialStatus");
let searchMode = "point";
let groupFilter = null;
let currentPage = 1;
const rowsPerPage = 25;
const pagination = document.querySelector("#pagination");

function normalize(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("_", "")
    .replaceAll("−", "-")
    .replaceAll("–", "-")
    .replaceAll("₂", "2")
    .replaceAll("₃", "3")
    .replaceAll("₄", "4")
    .replaceAll("₆", "6");
}

function findClass(query) {
  const key = normalize(query);
  const direct = symmetryClasses.find((entry) => {
    const names = [entry.pointGroup, entry.schoenflies, ...(entry.aliases || [])].map(normalize);
    return names.includes(key);
  });
  if (direct) return { entry: direct, matchedBy: "point group" };

  const spaceGroupMatch = spaceGroupIndex.get(key);
  if (spaceGroupMatch) {
    return {
      entry: symmetryClasses.find((entry) => entry.pointGroup === spaceGroupMatch.pointGroup),
      matchedBy: "space group",
      spaceGroup: spaceGroupMatch
    };
  }

  const material = materials.find((item) => {
    const names = [item.formula, item.name, item.spaceGroup].map(normalize);
    return names.includes(key);
  });
  if (material) {
    return {
      entry: symmetryClasses.find((entry) => entry.pointGroup === material.pointGroup),
      matchedBy: "material",
      material
    };
  }

  return null;
}

function responseLabel(order) {
  if (order === "linear") return "Linear piezochiral";
  if (order === "linear-chiral") return "Linear piezochiral";
  if (order === "second") return "Second-order piezochiral";
  if (order === "third") return "Third-order piezochiral";
  if (order === "forbidden") return "Piezochiral forbidden";
  return "Unknown";
}

function couplingOrderLabel(order) {
  if (order === "linear" || order === "linear-chiral") return "Linear";
  if (order === "second") return "Second order";
  if (order === "third") return "Third order";
  if (order === "forbidden") return "Piezochiral forbidden";
  return "Unknown";
}

function classificationLabel(entry) {
  if (entry.category === "chiral") return "Linear piezochiral";
  if (entry.category === "centrosymmetric") return "Non-piezochiral";
  if (entry.category === "linear") return "Linear piezochiral";
  if (entry.category === "higher") return "Higher-order piezochiral";
  return "Unclassified";
}

function evidenceLabel(evidence) {
  if (evidence === "experiment") return "Experimentally confirmed";
  if (evidence === "symmetry") return "Symmetry-based";
  return evidence;
}

function badgeClass(entry) {
  if (entry.supports) return "yes";
  if (entry.category === "chiral") return "neutral";
  return "no";
}

function setGroupFilter(result) {
  if (!result?.entry) return;
  if (result.matchedBy === "space group" && result.spaceGroup) {
    groupFilter = {
      type: "space",
      value: normalize(result.spaceGroup.symbol),
      label: `Space group ${result.spaceGroup.number ? `${result.spaceGroup.number} ` : ""}${result.spaceGroup.symbol}`
    };
  } else if (result.matchedBy === "point group") {
    groupFilter = {
      type: "point",
      value: result.entry.pointGroup,
      label: `Point group ${result.entry.pointGroup}`
    };
  } else if (result.matchedBy === "material" && result.material) {
    groupFilter = {
      type: "space",
      value: normalize(result.material.spaceGroup),
      label: `Space group ${result.material.spaceGroup}`
    };
  }
}

function renderActiveGroupFilter() {
  if (!groupFilter) {
    activeGroupFilter.hidden = true;
    activeGroupFilter.innerHTML = "";
    return;
  }
  activeGroupFilter.hidden = false;
  activeGroupFilter.innerHTML = `
    <span>Showing materials for ${groupFilter.label}</span>
    <button type="button" id="clearGroupFilter">Clear</button>
  `;
}

function renderLookup(query, options = {}) {
  const shouldFilterMaterials = options.filterMaterials !== false;
  const result = findClass(query);

  if (!result) {
    lookupResult.innerHTML = `
      <div class="result-head">
        <div>
          <h2>No direct match yet</h2>
          <p>Try a point group such as <strong>-42m</strong>, a known space group such as <strong>I-42d</strong>, or a seeded material formula.</p>
        </div>
        <span class="badge neutral">Needs data</span>
      </div>
      <p>This app is structured so additional space-group mappings and material records can be added cleanly as the database grows.</p>
    `;
    drawTensor(null);
    return;
  }

  const { entry, material, matchedBy } = result;
  currentPage = 1;
  if (shouldFilterMaterials) setGroupFilter(result);
  const relatedMaterials = materials.filter((item) => {
    if (result.spaceGroup) return normalize(item.spaceGroup) === normalize(result.spaceGroup.symbol);
    return item.pointGroup === entry.pointGroup;
  });
  const matchSummary = result.spaceGroup
    ? `The space group <strong>${result.spaceGroup.symbol}${result.spaceGroup.number ? ` (No. ${result.spaceGroup.number})` : ""}</strong> corresponds to the point group <strong>${entry.pointGroup} (${entry.schoenflies})</strong>.`
    : material
      ? `Material <strong>${material.formula}</strong> belongs to point group <strong>${entry.pointGroup} (${entry.schoenflies})</strong>.`
      : `Point group <strong>${entry.pointGroup} (${entry.schoenflies})</strong> selected.`;
  lookupResult.innerHTML = `
    <div class="result-head">
      <div>
        <h2>${entry.pointGroup} <span class="muted">(${entry.schoenflies})</span></h2>
        <p>${matchSummary}</p>
      </div>
      <span class="badge ${badgeClass(entry)}">${responseLabel(entry.order)}</span>
    </div>
    <div class="tensor-form">${entry.form}</div>
    <div class="detail-grid">
      <div class="detail"><span>Point group</span><strong>${entry.pointGroup}</strong></div>
      <div class="detail"><span>Class</span><strong>${classificationLabel(entry)}</strong></div>
      <div class="detail"><span>Crystal system</span><strong>${entry.crystalSystem}</strong></div>
      <div class="detail"><span>Piezochiral coupling order</span><strong>${couplingOrderLabel(entry.order)}</strong></div>
      <div class="detail"><span>Piezochiral</span><strong>${entry.supports ? "Supported" : "Not supported"}</strong></div>
      <div class="detail"><span>Materials</span><strong>${relatedMaterials.length}</strong></div>
    </div>
  `;
  drawTensor(entry);
  if (shouldFilterMaterials) renderMaterials();
}

function renderMaterials() {
  const order = orderFilter.value;
  const evidence = evidenceFilter.value;
  const visible = materials.filter((item) => {
    const orderMatches = order === "all"
      || item.order === order
      || (order === "linear" && item.order === "linear-chiral");
    const evidenceMatches = evidence === "all" || item.evidence === evidence;
    const groupMatches = !groupFilter
      || (groupFilter.type === "point" && item.pointGroup === groupFilter.value)
      || (groupFilter.type === "space" && normalize(item.spaceGroup) === groupFilter.value);
    return orderMatches && evidenceMatches && groupMatches;
  });

  const pageCount = Math.max(1, Math.ceil(visible.length / rowsPerPage));
  currentPage = Math.min(Math.max(1, currentPage), pageCount);
  const start = (currentPage - 1) * rowsPerPage;
  const displayed = visible.slice(start, start + rowsPerPage);
  const rangeStart = visible.length ? start + 1 : 0;
  const rangeEnd = visible.length ? start + displayed.length : 0;
  tableMeta.textContent = `${visible.length} of ${materials.length} records matched. Showing ${rangeStart}-${rangeEnd}.`;
  renderActiveGroupFilter();
  materialRows.innerHTML = displayed.length ? displayed.map((item) => `
    <tr>
      <td>${item.formula}</td>
      <td>${item.pointGroup}</td>
      <td>${item.spaceGroup}</td>
      <td>${responseLabel(item.order)}</td>
      <td>${item.tensor}</td>
      <td><span class="badge neutral">${evidenceLabel(item.evidence)}</span></td>
    </tr>
  `).join("") : `
    <tr>
      <td colspan="6" class="empty-row">No SI material records match this group yet.</td>
    </tr>
  `;
  renderPagination(pageCount);
}

function renderPagination(pageCount) {
  if (pageCount <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const pages = new Set([1, pageCount, currentPage, currentPage - 1, currentPage + 1]);
  const pageButtons = [...pages]
    .filter((page) => page >= 1 && page <= pageCount)
    .sort((a, b) => a - b)
    .map((page, index, sorted) => {
      const gap = index > 0 && page - sorted[index - 1] > 1 ? `<span class="page-gap">...</span>` : "";
      return `${gap}<button type="button" class="${page === currentPage ? "active" : ""}" data-page="${page}">${page}</button>`;
    })
    .join("");

  pagination.innerHTML = `
    <button type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    ${pageButtons}
    <button type="button" data-page="${currentPage + 1}" ${currentPage === pageCount ? "disabled" : ""}>Next</button>
  `;
}

function renderClasses() {
  const documentedPiezochiralMaterials = materials.filter((item) => {
    const entry = symmetryClasses.find((group) => group.pointGroup === item.pointGroup);
    return entry?.supports;
  }).length;
  materialStatus.textContent = `${documentedPiezochiralMaterials.toLocaleString()} piezochiral materials documented`;
  classGrid.innerHTML = symmetryClasses.map((entry) => `
    <button class="class-card ${entry.category}" type="button" data-query="${entry.pointGroup}">
      <strong>${entry.pointGroup} (${entry.schoenflies})</strong>
      <span>${entry.crystalSystem}</span>
      <span>${classificationLabel(entry)}</span>
    </button>
  `).join("");
}

function renderGroupPickers() {
  pointGroupSelect.innerHTML = symmetryClasses.map((entry) => `
    <option value="${entry.pointGroup}">${entry.pointGroup} (${entry.schoenflies}) - ${classificationLabel(entry)}</option>
  `).join("");

  spaceGroupSelect.innerHTML = spaceGroups.map((entry) => `
    <option value="${entry.symbol}">No. ${entry.number} ${entry.symbol} -> ${entry.pointGroup}</option>
  `).join("");
}

function setSearchMode(mode) {
  searchMode = mode;
  queryInput.placeholder = mode === "space"
    ? "Try I-42d, Pna21, P-4"
    : "Try -42m, 432, mmm, 4mm";
}

function stereogramFileName(pointGroup) {
  return String(pointGroup)
    .replaceAll("/", "_")
    .replaceAll("-", "minus")
    .replaceAll(" ", "");
}

function drawTensor(entry) {
  const fileName = entry ? stereogramFileName(entry.pointGroup) : "placeholder";
  stereogramImage.src = `assets/stereograms/${fileName}.svg`;
  stereogramImage.alt = entry
    ? `Stereographic projection for point group ${entry.pointGroup} (${entry.schoenflies})`
    : "Stereographic projection placeholder";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  })[char]);
}

document.querySelector("#searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  currentPage = 1;
  renderLookup(queryInput.value);
});

document.querySelectorAll("[data-picker]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.picker;
    document.querySelector("#pointPicker").hidden = target !== "point" || !document.querySelector("#pointPicker").hidden;
    document.querySelector("#spacePicker").hidden = target !== "space" || !document.querySelector("#spacePicker").hidden;
  });
});

pointGroupSelect.addEventListener("change", () => {
  setSearchMode("point");
  queryInput.value = pointGroupSelect.value;
  currentPage = 1;
  renderLookup(pointGroupSelect.value);
});

spaceGroupSelect.addEventListener("change", () => {
  setSearchMode("space");
  queryInput.value = spaceGroupSelect.value;
  currentPage = 1;
  renderLookup(spaceGroupSelect.value);
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    queryInput.value = button.dataset.query;
    currentPage = 1;
    renderLookup(button.dataset.query);
  });
});

classGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-query]");
  if (!button) return;
  setSearchMode("point");
  queryInput.value = button.dataset.query;
  currentPage = 1;
  renderLookup(button.dataset.query);
});

activeGroupFilter.addEventListener("click", (event) => {
  if (!event.target.closest("#clearGroupFilter")) return;
  groupFilter = null;
  currentPage = 1;
  renderMaterials();
});

pagination.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button || button.disabled) return;
  currentPage = Number(button.dataset.page);
  renderMaterials();
});

orderFilter.addEventListener("change", () => {
  currentPage = 1;
  renderMaterials();
});

evidenceFilter.addEventListener("change", () => {
  currentPage = 1;
  renderMaterials();
});

renderClasses();
renderGroupPickers();
renderMaterials();
renderLookup("-42m", { filterMaterials: false });
