---
title: "Molecular Formula: Finding the True Compound"
description: "Learn the difference between Empirical and Molecular formulas, how to calculate the true number of atoms, and use our Molecular Formula Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molecular-formula-calculator"
relatedType: "calculator"
faqs:
  - question: "What two pieces of data are required to determine a molecular formula?"
    answer: "You need the compound's empirical formula (from elemental analysis or combustion data) and its experimentally measured true molar mass in g/mol or Daltons (typically obtained via mass spectrometry, freezing-point depression, or gas density). Dividing true molar mass by empirical mass yields the integer multiplier n."
  - question: "Can a compound's empirical formula and molecular formula ever be identical?"
    answer: "Yes. Whenever the integer multiplier n equals 1, the empirical and molecular formulas are the same. Common examples include water (H2O), ammonia (NH3), carbon dioxide (CO2), methane (CH4), and sucrose (C12H22O11), where no common factor larger than 1 divides all subscripts."
  - question: "What is the difference between average molar mass and monoisotopic mass in mass spectrometry?"
    answer: "Average molar mass (used in gravimetric lab stoichiometry) weights every element by its natural isotopic abundance—for example, glucose is 180.156 g/mol. High-resolution mass spectrometry measures exact monoisotopic mass using the single most abundant isotope of each element (12C, 1H, 16O), giving 180.0634 Da for neutral glucose."
  - question: "What does the Index of Hydrogen Deficiency (IHD) verify about a molecular formula?"
    answer: "IHD—also called Degree of Unsaturation—counts the combined number of rings and pi bonds in a molecule using IHD = C + 1 − (H + X − N)/2. For any valid neutral, closed-shell organic molecule, IHD must evaluate to a non-negative integer; a half-integer result signals a missing atom, radical, or erroneous multiplier."
  - question: "Does knowing the molecular formula uniquely identify a chemical compound?"
    answer: "Not always. A molecular formula establishes exact atomic counts but gives zero connectivity or three-dimensional geometry. For instance, C2H6O represents both ethanol (a liquid alcohol boiling at 78.4 °C) and dimethyl ether (a gas boiling at −24 °C); NMR, IR spectroscopy, or crystallography is required to distinguish structural isomers."
---

A molecular formula specifies the exact number of atoms of each element present in a single discrete molecule of a compound. While an empirical formula reduces elemental composition to its lowest whole-number ratio, the molecular formula scales that ratio by an integer factor `n` to recover true molecular size—distinguishing formaldehyde (`CH₂O`), acetic acid (`C₂H₄O₂`), and glucose (`C₆H₁₂O₆`), which otherwise appear identical in elemental percentage tables.

Determining the molecular formula bridges quantitative analytical chemistry and structural elucidation. Use our [Molecular Formula Calculator](/en/calculators/molecular-formula-calculator) to compute empirical formula weights, solve the integer multiplier `n`, and generate verified molecular formulas alongside exact molar mass totals.

## Mathematical Relationship Between Empirical and Molecular Formulas

Every discrete molecular compound obeys a strict integer scaling law linking its empirical unit to its true molecular composition:

```text
Empirical Formula Mass:   M_emp = Σ (aᵢ × Mᵢ)
Integer Multiplier:       n = round(M_molar / M_emp)
Molecular Formula:        (Empirical Formula)ₙ  →  multiply each subscript aᵢ by n
```

- **`aᵢ` (Empirical Subscripts):** Lowest-integer atom counts from combustion or elemental analysis.
- **`Mᵢ` (Standard Atomic Weight, g/mol):** IUPAC atomic mass of element `i`.
- **`M_molar` (Experimental Molar Mass, g/mol):** True molecular weight measured independently of elemental ratios.

Three primary laboratory techniques supply `M_molar`:

1. **Mass Spectrometry (MS / HRMS):** Ionizes intact molecules and measures mass-to-charge ratio (`m/z`). High-resolution time-of-flight (TOF) or Orbitrap instruments achieve `< 5 ppm` mass accuracy, resolving isobaric formulas (such as `CO` at `27.9949 Da` vs. `N₂` at `28.0061 Da`).
2. **Dumas Vapor Density:** For volatile liquids and gases, molar mass follows the ideal gas equation `M_molar = (m × R × T) / (P × V)`, where `R = 0.082057 L·atm/(mol·K)`.
3. **Colligative Properties:** For non-volatile solutes and polymers, freezing-point depression (`ΔT_f = i × K_f × m`) or osmotic pressure (`Π = M × R × T`) yields number-average molar mass.

As an immediate chemical sanity check on any derived formula, calculate its **Index of Hydrogen Deficiency (`IHD`)**:

```text
IHD = C + 1 − (H + X − N) / 2
```

Here `C`, `H`, `N`, and `X` (total halogens `F, Cl, Br, I`) represent molecular subscripts, while divalent `O` and `S` are omitted. Any valid neutral organic molecule must yield a non-negative integer `IHD` equal to its total rings plus pi bonds.

## Step-by-Step Worked Example: Unknown Volatile Organic Vapor

An unknown volatile compound exhibits an empirical formula of **`C₂H₃O`**. In a Dumas vapor-density experiment at `100.0 °C` (`373.15 K`) and `1.000 atm`, a `0.351 g` vapor sample fills a `125.0 mL` (`0.1250 L`) flask.

### 1. Calculate Experimental Molar Mass (`M_molar`)

```text
M_molar = (0.351 g × 0.082057 L·atm/(mol·K) × 373.15 K) / (1.000 atm × 0.1250 L)
M_molar = 10.747 / 0.1250 = 85.98 g/mol
```

### 2. Compute Empirical Formula Mass (`M_emp`)

Sum the atomic weights in `C₂H₃O` (`C = 12.011`, `H = 1.008`, `O = 15.999`):

- `M_emp = (2 × 12.011) + (3 × 1.008) + 15.999 = 24.022 + 3.024 + 15.999 = 43.045 g/mol`

### 3. Solve for the Integer Multiplier (`n`)

- `n = 85.98 g/mol / 43.045 g/mol = 1.997 ≈ 2`

### 4. Scale Subscripts and Verify with `IHD`

Multiplying `C₂H₃O` by `n = 2` yields the true molecular formula **`C₄H₆O₂`** (exact molar mass `86.090 g/mol`, consistent with 2,3-butanedione or methyl acrylate). Checking unsaturation confirms `IHD = 4 + 1 − (6 / 2) = 2`—a valid integer matching two carbonyl or alkene double bonds.

## Empirical-to-Molecular Scaling Benchmarks

| Empirical Formula | Empirical Mass (`g/mol`) | Multiplier (`n`) | True Molecular Formula | True Molar Mass (`g/mol`) | `IHD` (Rings + π) | Representative Compound |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`CH₂O`** | `30.026` | `1` | `CH₂O` | `30.03` | `1` | Formaldehyde |
| **`CH₂O`** | `30.026` | `2` | `C₂H₄O₂` | `60.05` | `1` | Acetic acid |
| **`CH₂O`** | `30.026` | `6` | `C₆H₁₂O₆` | `180.16` | `1` | D-Glucose |
| **`CH`** | `13.019` | `2` | `C₂H₂` | `26.04` | `2` | Acetylene (Ethyne) |
| **`CH`** | `13.019` | `6` | `C₆H₆` | `78.11` | `4` | Benzene |
| **`CH₂`** | `14.027` | `6` | `C₆H₁₂` | `84.16` | `1` | Cyclohexane / 1-Hexene |
| **`NH₂`** | `16.023` | `2` | `N₂H₄` | `32.05` | `0` | Hydrazine |

## Real-World Applications, Structural Isomers, and Analytical Limits

In pharmaceutical discovery, natural-product isolation, and metabolomics, high-resolution mass spectrometry routinely assigns molecular formulas from sub-milligram fractions. Combining exact mass with **isotopic fine structure** (`M+1` intensity from `¹³C` at `1.07%` natural abundance and `M+2` peaks from `³⁴S`, `³⁷Cl`, or `⁸¹Br`) narrows thousands of candidate formulas down to a single unambiguous composition.

In polymer chemistry, the empirical repeat unit (such as `C₂H₄` for polyethylene or `C₂F₄` for PTFE) is multiplied by the degree of polymerization (`DP_n`) to report number-average molecular weight (`M_n`), which governs melt viscosity, tensile strength, and glass-transition temperature.

Engineers and students should guard against four critical analytical limitations:

- **Adduct mass shifts in soft ionization MS:** Electrospray ionization (ESI) detects ions such as `[M + H]⁺` (`+1.0073 Da`), `[M + Na]⁺` (`+22.9892 Da`), or gas-phase dimers `[2M + H]⁺` rather than neutral `M`. Failing to subtract the adduct mass yields an incorrect multiplier `n`.
- **Average vs. monoisotopic mass mismatch:** Using average periodic-table atomic weights against high-resolution MS peaks introduces substantial error in chlorinated or brominated molecules (for example, `Br` has `78.9183 Da` vs. `80.9163 Da` isotopes averaging `79.904 g/mol`).
- **Non-molecular solids:** Ionic salts (`NaCl`, `CaCO₃`) and covalent network crystals (`SiO₂`, silicon carbide) lack discrete molecular boundaries and therefore have no defined `n` multiplier.
- **Isomeric ambiguity:** A molecular formula confirms elemental inventory only; resolving constitutional isomers (ethanol vs. dimethyl ether) or stereoisomers (`R/S` enantiomers) requires NMR spectroscopy, infrared absorption, or single-crystal X-ray diffraction.
