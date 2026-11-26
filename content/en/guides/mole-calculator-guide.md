---
title: "The Mole: Chemistry's Dozen"
description: "Master the 2019 SI definition of the mole, exact Avogadro constant (6.02214076 × 10^23), molar mass stoichiometry, and gram-to-molecule conversions."
category: "Math & Science"
relatedCalculator: "mole-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the exact official SI definition of one mole today?"
    answer: "Since the 2019 SI redefinition by the Bureau International des Poids et Mesures (BIPM), one mole is defined as containing exactly 6.02214076 × 10^23 elementary entities (atoms, molecules, ions, electrons, or formula units). This fixed numerical constant replaced the older definition tied to the mass of 12 grams of Carbon-12."
  - question: "Does one mole of every chemical element weigh the same amount?"
    answer: "No. One mole of any element always contains the exact same number of atoms (6.02214076 × 10^23), just as a dozen eggs and a dozen bowling balls both equal 12 items. However, because individual atoms have different masses, one mole of hydrogen atoms weighs 1.008 grams while one mole of gold atoms weighs 196.97 grams."
  - question: "How do I distinguish molar mass (g/mol) from molecular mass (amu or Da)?"
    answer: "Molecular mass (measured in daltons, Da, or unified atomic mass units, u) is the mass of a single molecule, whereas molar mass (g/mol) is the mass of one mole of those molecules. Numerically, the values are virtually identical: one H2O molecule has a mass of 18.015 Da, and one mole of H2O weighs 18.015 g/mol."
  - question: "How do I convert moles of an ideal gas to volume at Standard Temperature and Pressure?"
    answer: "Under the modern IUPAC STP standard (0 °C / 273.15 K and 100 kPa / 1 bar), one mole of an ideal gas occupies 22.711 liters. Under the older 1 atm (101.325 kPa) STP convention still seen in some textbooks, one mole occupies 22.414 liters. Always verify which pressure standard your protocol uses."
  - question: "Why must chemical reactions be balanced in moles rather than grams?"
    answer: "Chemical bonds rearrange discrete atoms and molecules in fixed integer ratios, not equal weights. For example, forming water (2 H2 + O2 -> 2 H2O) requires twice as many H2 molecules as O2 molecules, even though 2 moles of H2 weigh only 4.032 g compared to 32.00 g for 1 mole of O2."
---

The mole (`mol`) is the SI base unit for **amount of substance**, defined since the May 2019 SI revision as containing **exactly `6.02214076 × 10^23` elementary entities**. That fixed numerical value—the **Avogadro constant (`NA`)**—serves as the universal bridge between microscopic particle counts (atoms, molecules, ions, electrons, or photons) and macroscopic quantities measured on an analytical balance in grams or milliliters.

Because chemical reactions occur molecule-by-molecule rather than gram-by-gram, every stoichiometric yield calculation, limiting-reagent check, and concentration unit depends on converting laboratory mass into moles first. You can translate rapidly between sample mass, molar mass, moles, and exact particle counts using our [Mole Calculator](/en/calculators/mole-calculator).

## Core Formulas and the 2019 SI Redefinition

Prior to May 20, 2019, the mole was defined indirectly as the number of atoms in `0.012 kg` of unbound carbon-12 (`12C`), tying `NA` to experimental kilogram artifact uncertainty. Under the current International System of Units (BIPM), `NA` is an exact, zero-uncertainty defining constant (`6.02214076 × 10^23 mol^-1`), making the mole completely independent of mass standards.

```text
Mass to Moles Conversion:
n = m / MM

Moles to Mass Conversion:
m = n × MM

Moles to Particle Count (Atoms, Molecules, Ions):
N = n × NA    where NA = 6.02214076 × 10^23 mol^-1

Particle Count to Mass (Combined Bridge):
m = (N / NA) × MM

Ideal Gas Moles (Gas-Phase Stoichiometry):
n = (P × V) / (R × T)
```

Exact variable definitions:
- **`n` (Amount of substance):** Measured in moles (`mol`), or millimoles (`1 mmol = 10^-3 mol`) and micromoles (`1 μmol = 10^-6 mol`) in pharmaceutical synthesis.
- **`m` (Sample mass):** Measured mass in grams (`g`).
- **`MM` (Molar mass):** Sum of standard atomic weights of every atom in the chemical formula in `g/mol` (for example, `H2O = 2 × 1.008 + 15.999 = 18.015 g/mol`).
- **`N` (Particle count):** Exact dimensionless number of discrete elementary entities.
- **`NA` (Avogadro constant):** `6.02214076 × 10^23 mol^-1`.
- **`P, V, R, T`:** Absolute pressure, volume, ideal gas constant (`8.314462618 J/(mol·K)` or `0.082057 L·atm/(mol·K)`), and absolute temperature in Kelvin (`K = °C + 273.15`).

## Step-by-Step Worked Pharmaceutical & Stoichiometry Example

Consider a standard `325 mg` tablet of pure aspirin (acetylsalicylic acid, chemical formula `C9H8O4`). How many moles and how many individual aspirin molecules does a single tablet contain?

1. **Compute the molar mass (`MM`) of `C9H8O4` from IUPAC atomic weights:**
   - Carbon (`C`): `9 × 12.011 g/mol = 108.099 g/mol`
   - Hydrogen (`H`): `8 × 1.008 g/mol = 8.064 g/mol`
   - Oxygen (`O`): `4 × 15.999 g/mol = 63.996 g/mol`
   - Total molar mass: `MM = 108.099 + 8.064 + 63.996 = 180.159 g/mol`.
2. **Convert tablet mass from milligrams to grams:**
   `m = 325 mg / 1,000 = 0.325 g`.
3. **Calculate moles (`n`):**
   `n = 0.325 g / 180.159 g/mol = 0.001804 mol` (`1.804 mmol`).
4. **Calculate exact molecule count (`N`):**
   `N = 0.001804 mol × 6.02214076 × 10^23 molecules/mol = 1.086 × 10^21` molecules.

If that `0.325 g` of aspirin is dissolved in `100.0 mL` (`0.1000 L`) of aqueous ethanol, its resulting molarity is `0.001804 mol / 0.1000 L = 0.01804 M` (`18.04 mM`)—demonstrating how the mole acts as the mandatory intermediate unit between solid weighing and liquid concentration.

## Molar Mass and Mole Reference Benchmarks

The table below compares one mole (`6.02214076 × 10^23` entities) across common pure elements, solvents, salts, and biochemical molecules to illustrate how identical particle counts span dramatically different physical weights and volumes.

| Substance | Chemical Formula | Elementary Entity | Molar Mass (`g/mol`) | Mass of `1.000 mol` (`g`) | Density / State (`25 °C`, `1 bar`) | Volume of `1.000 mol` |
| --- | --- | --- | --- | --- | --- | --- |
| Hydrogen gas | `H2` | Diatomic molecule | `2.016` | `2.016 g` | Gas (`0.0813 g/L`) | `24.79 L` |
| Helium | `He` | Single atom | `4.0026` | `4.003 g` | Gas (`0.1614 g/L`) | `24.79 L` |
| Water | `H2O` | Molecule | `18.015` | `18.015 g` | Liquid (`0.997 g/mL`) | `18.07 mL` |
| Sodium chloride | `NaCl` | Formula unit (`Na+Cl−`) | `58.44` | `58.44 g` | Crystal (`2.165 g/cm^3`) | `26.99 cm^3` |
| Glucose | `C6H12O6` | Molecule | `180.156` | `180.16 g` | Solid (`1.54 g/cm^3`) | `117.0 cm^3` |
| Gold | `Au` | Single atom | `196.967` | `196.97 g` | Metal (`19.30 g/cm^3`) | `10.21 cm^3` |

## Practical Applications, Limiting Reagents, and Common Errors

Accurate mole accounting prevents costly errors across synthetic chemistry, materials science, and clinical assay preparation:

- **Diatomic Elements vs. Monoatomic Atoms:** Oxygen gas (`O2`, `32.00 g/mol`), nitrogen (`N2`, `28.01 g/mol`), and chlorine (`Cl2`, `70.91 g/mol`) exist as diatomic molecules under ambient conditions. Dividing `32.00 g` of oxygen gas by `16.00 g/mol` (atomic `O`) instead of `32.00 g/mol` (`O2`) doubles the calculated molar quantity and ruins reaction stoichiometry.
- **Limiting Reagent Identification:** You cannot identify the limiting reactant by comparing gram weights. Reacting `10.0 g` of `H2` (`4.96 mol`) with `32.0 g` of `O2` (`1.00 mol`) in `2 H2 + O2 -> 2 H2O` shows that `O2` is the limiting reagent despite weighing more than three times as much as `H2`: only `2.00 mol` of `H2` reacts, leaving `2.96 mol` (`5.97 g`) of unreacted hydrogen.
- **Always Specify the Elementary Entity:** Saying "one mole of sulfuric acid" is unambiguous (`H2SO4`, `98.08 g`), whereas saying "one mole of hydrogen" is ambiguous between `H` atoms (`1.008 g`) and `H2` molecules (`2.016 g`). Similarly, `1.00 mol` of dissolved `CaCl2` yields `1.00 mol` of `Ca^2+` ions and `2.00 mol` of `Cl^−` ions (`3.00 mol` total ions).
- **Molar Gas Volume Standard Mismatch:** Never assume `22.4 L/mol` applies at room temperature (`25 °C`). At `25 °C` (`298.15 K`) and `1 bar`, one mole of ideal gas occupies `24.79 L`—roughly 10.7% larger than at `0 °C` (`22.71 L` at `1 bar`, or `22.41 L` at `1 atm`).
