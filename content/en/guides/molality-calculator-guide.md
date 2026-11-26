---
title: "Molality: The Temperature-Proof Concentration"
description: "Master the molality formula (m = n / kg), freezing point depression, boiling point elevation, and exact molarity-to-molality density conversions."
category: "Math & Science"
relatedCalculator: "molality-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Why does molality stay constant when temperature changes while molarity drifts?"
    answer: "Molality divides moles of solute by the mass of the solvent in kilograms (mol/kg). Because mass is invariant with thermal expansion or contraction, heating a solution from 5 °C to 95 °C does not alter its molality. Molarity depends on solution volume (L), which expands when heated and lowers the molarity value."
  - question: "What is the denominator in molality: total solution mass or pure solvent mass?"
    answer: "The denominator is strictly the mass of the pure solvent in kilograms (kg), NOT the total mass of the combined solution. Including the solute mass in the denominator yields mass fraction or weight percentage instead of molality."
  - question: "When are molarity and molality nearly identical numerical values?"
    answer: "In very dilute aqueous solutions near 20 °C—such as 0.01 M NaCl—the solute occupies negligible volume and 1.000 L of pure water weighs approximately 0.998 kg. Consequently, dilute aqueous molarity and molality agree within roughly 0.2%, though they diverge sharply in concentrated solutions or dense organic solvents."
  - question: "Why do colligative property equations require molality instead of molarity?"
    answer: "Freezing point depression (ΔTf = i × Kf × m) and boiling point elevation (ΔTb = i × Kb × m) explicitly track temperature shifts across a phase transition. Using molarity would introduce an algebraic circular dependency because the concentration denominator (volume) would itself shift as the temperature approaches freezing or boiling."
  - question: "How do I convert molarity (M) to molality (m) if I only know solution density?"
    answer: "Use the exact formula m = (1000 × M) / (1000 × ρ − M × MM), where ρ is the solution density in g/mL and MM is the solute molar mass in g/mol. The numerator equals moles per 1,000 mL, and the denominator calculates the exact grams of pure solvent remaining in that 1,000 mL."
---

Molality (`m`), also called molal concentration, is defined as the number of moles of dissolved solute divided by the mass of the **pure solvent** in kilograms (`mol/kg`). Because neither particle count (`mol`) nor solvent mass (`kg`) changes when a fluid expands or contracts under thermal stress, molality remains completely invariant across freezing, boiling, and high-pressure reaction regimes.

While routine bench dilutions rely on volumetric molarity (`mol/L`), physical chemistry, cryogenics, automotive coolant formulation, and thermodynamic modeling depend on molality whenever temperature varies or colligative properties govern phase behavior. You can compute molality directly from solute mass, solvent mass, or molarity-and-density inputs using our [Molality Calculator](/en/calculators/molality-calculator).

## Core Methodology, Formulas, and Colligative Equations

Molality separates solute quantity cleanly from thermal expansion effects by replacing solution volume with solvent mass:

```text
Fundamental Molality Equation:
m = n_solute / m_solvent(kg)

Direct Mass-Based Form:
m = m_solute(g) / [MM_solute(g/mol) × m_solvent(kg)]

Molarity (M) to Molality (m) Conversion:
m = (1000 × M) / (1000 × ρ − M × MM_solute)

Molality (m) to Molarity (M) Conversion:
M = (1000 × ρ × m) / (1000 + m × MM_solute)

Colligative Phase-Shift Equations:
ΔTf = i × Kf × m    (Freezing Point Depression)
ΔTb = i × Kb × m    (Boiling Point Elevation)
```

Exact variable definitions:
- **`m` (Molality):** Concentration in `mol/kg` (written lowercase `m` or `mol/kg` to avoid confusion with uppercase `M` molarity).
- **`n_solute` (Solute moles):** Dissolved solute amount (`m_solute / MM_solute`) in `mol`.
- **`m_solvent(kg)` (Solvent mass):** Mass of the pure solvent alone in kilograms (`kg`); divide grams by `1,000`. Never include `m_solute` in this denominator.
- **`ρ` (Solution density):** Bulk density of the final solution in `g/mL` at measurement temperature.
- **`i` (van 't Hoff factor):** Effective dissolved particles per formula unit (`i = 1` for non-electrolytes like ethylene glycol; ideal `i = 2` for `NaCl`; `i = 3` for `CaCl2`).
- **`Kf` and `Kb`:** Cryoscopic and ebullioscopic constants (`Kf = 1.86 °C·kg/mol` and `Kb = 0.512 °C·kg/mol` for water).

## Step-by-Step Worked Coolant & Conversion Examples

### Example 1: Antifreeze Molality and Freezing Point

Dissolve `45.0 g` of ethylene glycol (`C2H6O2`, `62.07 g/mol`, `i = 1`) in `500.0 g` (`0.5000 kg`) of water.

1. **Convert solute mass to moles:**
   `n_solute = 45.0 g / 62.07 g/mol = 0.7250 mol`.
2. **Convert solvent mass to kilograms:**
   `m_solvent = 500.0 g / 1,000 = 0.5000 kg`.
3. **Calculate molality:**
   `m = 0.7250 mol / 0.5000 kg = 1.450 mol/kg` (`1.45 m`).
4. **Calculate freezing point depression (`ΔTf`):**
   `ΔTf = 1 × 1.86 °C·kg/mol × 1.450 mol/kg = 2.697 °C ≈ 2.70 °C`.
5. **Determine new freezing point:**
   `Tf = 0.00 °C − 2.70 °C = −2.70 °C` (`27.14 °F`). This molality stays `1.45 m` from `−2 °C` up to `95 °C`.

### Example 2: Converting `2.00 M` `NaCl` to Molality

Consider `2.00 M` aqueous `NaCl` (`58.44 g/mol`) with density `ρ = 1.078 g/mL` at `20 °C`.

1. **Mass of `1,000 mL` solution:**
   `1,000 mL × 1.078 g/mL = 1,078 g`.
2. **Subtract `2.00 mol` of dissolved `NaCl`:**
   `m_solute = 2.00 mol × 58.44 g/mol = 116.88 g`, leaving `m_solvent = 1,078 − 116.88 = 961.12 g` (`0.96112 kg`).
3. **Compute molality:**
   `m = 2.00 mol / 0.96112 kg = 2.0809 mol/kg ≈ 2.08 m`—4.0% higher than molarity due to displaced solvent volume.

## Concentration Units Compared: Molality vs. Alternatives

Selecting the right concentration metric depends on whether stoichiometry, thermodynamics, or regulatory compliance drives the measurement.

| Metric | Symbol & Unit | Numerator | Denominator | Temperature-Dependent? | Primary Use Case |
| --- | --- | --- | --- | --- | --- |
| **Molality** | `m` (`mol/kg`) | Moles of solute | Mass of **pure solvent** (`kg`) | No | Freezing/boiling shifts, phase equilibria, thermodynamics |
| **Molarity** | `M` (`mol/L`) | Moles of solute | Volume of **total solution** (`L`) | Yes | Titrations, stoichiometry, volumetric bench dilutions |
| **Mole Fraction** | `χ` (dimensionless) | Moles of component `i` | Total moles of all components | No | Raoult's law vapor pressure & distillation design |
| **Mass Percent** | `% w/w` (`%`) | Mass of solute (`g`) | Mass of **total solution** (`g`) × 100 | No | Industrial reagent specs, brine & acid manufacturing |
| **Parts Per Million** | `ppm` (`mg/kg` or `mg/L`) | Milligrams of solute | `kg` of solution (or `L` dilute water) | Only if `mg/L` | Trace environmental contaminants & potable water limits |

## Real-World Applications and Common Calculation Errors

In both academic and industrial practice, errors with molality stem from denominator mix-ups and idealized electrolyte assumptions:

- **Total Solution Mass vs. Pure Solvent Mass:** The single most frequent error is dividing moles of solute by total solution mass (`solute + solvent`) instead of pure solvent mass. If you dissolve `1.00 mol` of sucrose (`342.30 g`) in `1.000 kg` of water, the total solution weighs `1.3423 kg`, yet the molality is strictly `1.00 mol / 1.000 kg = 1.00 m`—not `0.745 m`.
- **Organic Solvents with Non-Unit Density:** In water near `4 °C`, `1.00 L` weighs `1.000 kg`, masking unit errors. In ethanol (`ρ = 0.789 g/mL`) or chloroform (`ρ = 1.492 g/mL`), `1.00 L` of solvent weighs far from `1 kg`, so assuming `1 L ≈ 1 kg` produces 21% to 49% concentration errors.
- **Ion Pairing in Concentrated Electrolytes:** For dilute `NaCl` (`< 0.1 m`), `i ≈ 1.9`, approaching the ideal `2.0`. At high concentrations (`> 1.0 m`), electrostatic ion-pairing lowers the effective van 't Hoff factor and breaks linear `ΔTf = i × Kf × m` approximations unless Pitzer or Debye-Hückel activity coefficients are applied.
- **Density-Driven Gravimetric Preparation:** Pharmaceutical and battery electrolyte formulators routinely prepare molal solutions gravimetrically on calibrated balances (`±0.001 g`) rather than using volumetric flasks because mass measurement achieves higher repeatability across fluctuating cleanroom temperatures.
