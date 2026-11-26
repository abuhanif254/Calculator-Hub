---
title: "Molarity Calculator: Measuring Chemical Concentration"
description: "Learn the molarity formula (M = n / V), mass-to-molarity conversions, serial dilution math (C1V1 = C2V2), and temperature precision rules for chemistry labs."
category: "Math & Science"
relatedCalculator: "molarity-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the exact difference between molarity (M) and molality (m)?"
    answer: "Molarity (uppercase M) equals moles of solute divided by total liters of final solution (mol/L), whereas molality (lowercase m) equals moles of solute divided by kilograms of pure solvent (mol/kg). Because liquid solution volume expands or contracts with temperature, molarity varies slightly with heat while molality remains completely temperature-independent."
  - question: "Why should I never add solute directly to 1.00 L of water to make a 1.00 L molar solution?"
    answer: "Dissolved solutes occupy physical partial molar volume and alter intermolecular packing. Adding 1 mole of salt or sugar to 1.00 L of water yields a final volume greater than 1.00 L, lowering the actual molarity. Always dissolve the solute in roughly 70–80% of the solvent first, then dilute precisely to the calibration mark in a volumetric flask."
  - question: "How do I convert percent weight-by-volume (% w/v) or percent weight-by-weight (% w/w) to molarity?"
    answer: "For % w/v (grams of solute per 100 mL of solution), multiply by 10 to get grams per liter and divide by molar mass: M = (% w/v × 10) / MM. For % w/w commercial reagents, you also need solution density (ρ in g/mL): M = (% w/w × ρ × 10) / MM."
  - question: "Does dilution change the number of moles of solute in a flask?"
    answer: "No. Adding pure solvent increases total solution volume (V) and decreases molarity (M), while the total amount of dissolved solute (n = M × V) remains conserved. That conservation law is why C1 × V1 = C2 × V2 works for diluting stock solutions."
  - question: "When is normality (N) different from molarity (M)?"
    answer: "Normality measures gram-equivalent concentration per liter (N = n_eq × M), accounting for reactive stoichiometry such as protons donated by polyprotic acids or electrons transferred in redox reactions. For monoprotic HCl, 1.0 M equals 1.0 N; for diprotic H2SO4 in full neutralization, 1.0 M equals 2.0 N."
---

Molarity (`M`), formally defined as molar concentration (`c`), expresses the number of moles of dissolved solute per unit liter of **total solution** (`mol/L` or `mol/dm^3`). Unlike informal ratios or weight percentages, molarity encodes particle count directly inside liquid volume, allowing chemists, biochemists, and process engineers to meter exact stoichiometric equivalents using pipettes, burettes, and volumetric flasks.

Because solution preparation frequently starts from dry solids (measured in grams) or concentrated commercial stocks (labeled in `% w/w` or higher molarity), accurate benchwork requires converting between mass, molar mass, and final volumetric capacity. You can automate mass-to-molarity, volume-required, and stock dilution calculations with our [Molarity Calculator](/en/calculators/molarity-calculator).

## Core Formulas and Parameter Definitions

Molarity links three quantities: solute amount in moles (`n`), solute mass (`m_solute`), and final mixed solution volume (`V`).

```text
Fundamental Molarity Equation:
M = n / V

Direct Mass-to-Molarity Form:
M = m_solute / (MM × V)

Mass Required for Target Volume & Molarity:
m_solute = M × V × MM

Stock Dilution Equation (Conservation of Moles):
C1 × V1 = C2 × V2

Commercial Reagent (% w/w) to Molarity:
M = (% w/w × ρ × 10) / MM
```

Exact variable definitions and laboratory units:
- **`M` (Molarity):** Concentration in `mol/L` (e.g., `0.500 M`), plus millimolar (`1 mM = 10^-3 M`) and micromolar (`1 μM = 10^-6 M`) scales in biochemistry.
- **`n` (Amount of substance):** Moles of solute (`mol`), computed as `m_solute / MM`.
- **`m_solute` (Solute mass):** Dry mass weighed on an analytical balance in grams (`g`).
- **`MM` (Molar mass):** Formula weight in `g/mol`, including waters of hydration for hydrated salts (`CuSO4·5H2O`, `249.68 g/mol`, vs. anhydrous `CuSO4`, `159.61 g/mol`).
- **`V` (Total solution volume):** Final combined volume in liters (`L`), converting milliliters via `V_L = V_mL / 1000`.
- **`ρ` (Density):** Bulk solution density in `g/mL` at reference temperature (`20 °C` or `25 °C`).

## Step-by-Step Worked Laboratory Preparation Examples

### Example 1: Preparing a Solution from Solid Solute

Suppose you need `500.0 mL` (`0.5000 L`) of `0.500 M` aqueous sodium chloride (`NaCl`, `58.44 g/mol`).

1. **Convert volume to liters:**
   `V = 500.0 mL / 1,000 = 0.5000 L`.
2. **Calculate required moles of `NaCl`:**
   `n = 0.500 mol/L × 0.5000 L = 0.2500 mol`.
3. **Convert moles to grams:**
   `m_solute = 0.2500 mol × 58.44 g/mol = 14.61 g`.
4. **Verify back to molarity:**
   `M = 14.61 g / (58.44 g/mol × 0.5000 L) = 0.500 M`.
5. **Bench execution:**
   Weigh `14.61 g` of dry `NaCl`, dissolve it in ~`350 mL` of deionized water inside a `500 mL` Class A volumetric flask, equilibrate to `20 °C`, and dilute precisely to the `500.0 mL` mark.

### Example 2: Diluting a Concentrated Stock Solution

Next, prepare `250.0 mL` of `0.400 M` `HCl` from a `12.1 M` stock bottle.

1. **Apply mole conservation (`C1 × V1 = C2 × V2`):**
   `12.1 M × V1 = 0.400 M × 250.0 mL`.
2. **Solve for stock volume `V1`:**
   `V1 = (0.400 × 250.0) / 12.1 = 8.26 mL`.
3. **Safety execution:**
   Always add acid to water. Fill the `250 mL` volumetric flask halfway with cold deionized water, pipette `8.26 mL` of `12.1 M HCl`, let the exothermic mixture cool to `20 °C`, and bring to the mark.

## Benchmark Molarities of Common Laboratory Solutions

The reference table below summarizes exact molarities, compositions, and standard densities (`20–25 °C`) for widely used aqueous and neat reagents.

| Solution / Reagent | Typical Label Strength | Molar Mass (`g/mol`) | Density (`g/mL`) | Calculated Molarity (`M`) | Primary Application |
| --- | --- | --- | --- | --- | --- |
| Isotonic Saline (`NaCl`) | `0.90% w/v` | `58.44` | `~1.005` | `0.154 M` | Cell washing, IV fluids, mammalian osmolality |
| `1×` PBS Buffer (`NaCl` component) | `8.00 g/L NaCl` | `58.44` | `~1.006` | `0.137 M` | Physiological pH `7.4` biological assays |
| Concentrated Hydrochloric Acid (`HCl`) | `37.0% w/w` | `36.46` | `1.190` | `12.08 M` | Acid digestion, pH titration stocks |
| Concentrated Sulfuric Acid (`H2SO4`) | `98.0% w/w` | `98.08` | `1.840` | `18.38 M` | Strong dehydrating reagent & acid catalysis |
| Glacial Acetic Acid (`CH3COOH`) | `100% w/w` | `60.05` | `1.049` | `17.47 M` | Acetate buffer preparation & mobile phases |
| Pure Liquid Water (`H2O`, at `25 °C`) | `99.7%` pure density | `18.015` | `0.997` | `55.34 M` | Theoretical solvent reference concentration |

## Real-World Pitfalls, Temperature Drift, and Lab Precision

Even experienced analysts introduce systematic concentration errors when ignoring physical and volumetric constraints:

- **Thermal Volume Expansion:** Class A volumetric glassware is calibrated at `20 °C` (`68 °F`). Water's volumetric thermal expansion coefficient near room temperature is roughly `2.1 × 10^-4 /°C`, while organic solvents such as ethanol (`1.09 × 10^-3 /°C`) and acetone (`1.43 × 10^-3 /°C`) expand five to seven times faster. Preparing a `1.000 M` organic solution at `30 °C` and cooling it to `15 °C` noticeably shifts its molarity; for variable-temperature thermodynamics, switch to **molality (`mol/kg`)**.
- **Hydrated vs. Anhydrous Salts:** Weighing `15.96 g` of `CuSO4·5H2O` while using the anhydrous molar mass (`159.61 g/mol`) instead of the pentahydrate molar mass (`249.68 g/mol`) leaves your solution 36% under-concentrated (`0.0639 M` instead of `0.100 M`). Always verify the exact chemical formula printed on the reagent bottle.
- **Exothermic Mixing Contraction:** Mixing strong acids, strong bases (`NaOH`), or ethanol with water releases heat and causes non-additive volume contraction (mixing `50.0 mL` pure ethanol with `50.0 mL` water yields roughly `96.4 mL`, not `100.0 mL`). Always equilibrate exothermic mixtures to `20 °C` before making the final volume mark.
- **Titration and Glassware Tolerance:** A `500 mL` Class A volumetric flask holds a certified tolerance of `±0.20 mL` (`±0.04%`), whereas a `500 mL` graduated beaker is accurate only to `±5%`. Never use beaker markings for analytical molarity standards.
