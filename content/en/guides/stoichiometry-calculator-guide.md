---
title: "Stoichiometry: The Math of Chemical Reactions"
description: "Master the most important concept in chemistry. Learn how to balance equations, find the limiting reactant, and use our free Stoichiometry Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "stoichiometry-calculator"
relatedType: "calculator"
faqs:
  - question: "Why must a chemical equation be balanced before performing stoichiometric calculations?"
    answer: "By the Law of Conservation of Mass, atoms are neither created nor destroyed during a chemical reaction. An unbalanced equation violates mass balance and produces invalid molar ratios. Only the stoichiometric coefficients of a balanced equation accurately relate moles of reactants consumed to moles of products formed."
  - question: "How do you identify the limiting reactant without guessing from mass?"
    answer: "Convert the starting mass of every reactant into moles using its molar mass, then divide each molar quantity by its stoichiometric coefficient from the balanced equation. The reactant with the smallest resulting reaction extent (n / ν) will be completely exhausted first and therefore limits the maximum theoretical yield."
  - question: "Can a reactant with the larger starting mass still be the limiting reactant?"
    answer: "Yes. Limiting status depends on molar ratios rather than raw gram weights. A high-molar-mass reagent or a reactant with a large stoichiometric coefficient can run out first even when it represents the majority of the initial mixture by mass."
  - question: "What is the difference between theoretical yield, actual yield, and percent yield?"
    answer: "Theoretical yield is the maximum mass of product predicted by stoichiometry assuming 100% conversion of the limiting reactant. Actual yield is the physical mass isolated after reaction workup and purification. Percent yield equals (Actual Yield / Theoretical Yield) × 100% and reflects incomplete conversion, side reactions, or mechanical transfer losses."
  - question: "How do hydrated salts affect stoichiometry calculations?"
    answer: "Water molecules locked inside a crystal lattice—such as copper(II) sulfate pentahydrate (CuSO4·5H2O, 249.68 g/mol)—contribute significantly to weighed mass without acting as the reactive anhydrous ion (CuSO4, 159.61 g/mol). Always use the full hydrated molar mass when converting weighed reagent mass to moles."
---

Stoichiometry is the quantitative accounting framework of chemistry, governing the exact mass, mole, and volume relationships between reactants and products in a chemical reaction. Grounded in the Law of Conservation of Mass and Dalton's law of definite proportions, stoichiometric calculations translate a balanced chemical equation into precise laboratory or industrial material requirements, identifying which reagent will be exhausted first and what maximum product mass is thermodynamically achievable.

Whether scaling an active pharmaceutical ingredient synthesis, sizing a catalytic converter, or verifying theoretical yield in an analytical laboratory, accurate stoichiometry eliminates reagent waste and prevents runaway side reactions. Use our [Stoichiometry Calculator](/en/calculators/stoichiometry-calculator) to automate molar mass conversions, reaction extent comparisons, and excess reagent accounting in seconds.

## Core Stoichiometric Equations and Parameter Definitions

Every stoichiometric workflow moves through moles—never directly between raw gram masses—because balanced chemical equations express particle-to-particle ratios rather than weight ratios. For a reaction `a A + b B → c C + d D`, the integer coefficients (`νᵢ`) fix exact molar proportionality:

```text
Moles from Mass:            nᵢ = mᵢ / Mᵢ
Reaction Extent (Limiting): ξ_max,i = nᵢ,₀ / νᵢ
Product Moles Formed:       n_prod = ν_prod × min(ξ_max,i)
Percent Yield:              % Yield = (m_actual / m_theoretical) × 100%
Excess Reactant Remaining:  m_rem = [n_excess,₀ − (ν_excess × ξ_lim)] × M_excess
```

- **`mᵢ` (Mass, g or kg):** Measured starting reagent mass or isolated product mass.
- **`Mᵢ` (Molar Mass, g/mol):** Sum of standard IUPAC atomic weights for the formula unit, including coordinated hydration water.
- **`νᵢ` (Stoichiometric Coefficient):** Integer multiplier preceding species `i` in the balanced equation.
- **`ξ_lim` (Limiting Extent, mol):** Minimum value of `nᵢ,₀ / νᵢ` across all reactants; fixes maximum reaction cycles.

For solutions and gases, moles enter via molarity (`n = C × V`) or the ideal gas law (`n = (P × V) / (R × T)`, with `R = 0.082057 L·atm/(mol·K)`).

## Step-by-Step Worked Example: Haber-Bosch Ammonia Synthesis

Consider ammonia synthesis: `N₂(g) + 3 H₂(g) → 2 NH₃(g)`. Suppose a reactor receives `50.0 g` of nitrogen (`N₂`, `M = 28.014 g/mol`) and `15.0 g` of hydrogen (`H₂`, `M = 2.016 g/mol`), recovering `51.8 g` of ammonia (`NH₃`, `M = 17.031 g/mol`).

### 1. Convert Reactant Masses to Moles

- `n(N₂) = 50.0 g / 28.014 g/mol = 1.7848 mol`
- `n(H₂) = 15.0 g / 2.016 g/mol = 7.4405 mol`

### 2. Determine Limiting Reactant via Reaction Extent

- `ξ_max(N₂) = 1.7848 mol / 1 = 1.7848 mol`
- `ξ_max(H₂) = 7.4405 mol / 3 = 2.4802 mol`

Since `1.7848 mol < 2.4802 mol`, **nitrogen (`N₂`) is the limiting reactant** and `H₂` is in excess—despite `N₂` comprising `76.9%` of initial mass.

### 3. Compute Theoretical Yield, Excess Mass, and Percent Yield

- **Theoretical `NH₃`:** `2 × 1.7848 mol = 3.5696 mol` → `3.5696 mol × 17.031 g/mol = 60.79 g`
- **Remaining `H₂`:** `[7.4405 − (3 × 1.7848)] mol × 2.016 g/mol = 2.0861 mol × 2.016 g/mol = 4.21 g`
- **Mass check:** `50.0 g + 15.0 g = 65.0 g` input; `60.79 g + 4.21 g = 65.00 g` output.
- **Percent yield:** `(51.8 g / 60.79 g) × 100% = 85.2%`

## Stoichiometric Benchmark Scenarios Across Reaction Types

| Reaction System | Balanced Ratio | Limiting Risk Factor | Yield Basis | Typical Process Target |
| :--- | :--- | :--- | :--- | :--- |
| **Methane Combustion** (`CH₄ + 2 O₂ → CO₂ + 2 H₂O`) | `1 : 2 : 1 : 2` | Low `O₂` causes toxic CO formation | Gas volume (`P, V, T`) | `10–20%` excess air |
| **Thermite Reduction** (`Fe₂O₃ + 2 Al → 2 Fe + Al₂O₃`) | `1 : 2 : 2 : 1` | Oxide moisture or Al passivation | Solid mass (`g` or `kg`) | Near-stoichiometric `1 : 2` |
| **Neutralization** (`H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O`) | `1 : 2 : 1 : 2` | Diprotic acid requires `2×` molar base | Solution `C × V` | Equivalence at `pH 7.0` |
| **Aspirin Synthesis** (`C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + C₂H₄O₂`) | `1 : 1 : 1 : 1` | Anhydride hydrolysis by ambient water | Limiting salicylic acid | `75–90%` recrystallized |
| **Halide Precipitation** (`AgNO₃ + NaCl → AgCl↓ + NaNO₃`) | `1 : 1 : 1 : 1` | Excess `Cl⁻` forms soluble `[AgCl₂]⁻` | Dried precipitate mass | `99.5%+` recovery |
| **Ammonia Synthesis** (`N₂ + 3 H₂ ⇌ 2 NH₃`) | `1 : 3 : 2` | Reversible `K_eq` caps single pass | Recycle loop mass balance | `15–20%` pass; `>97%` total |

## Industrial Applications, Common Errors, and Analytical Precision

In chemical engineering and green chemistry, stoichiometry pairs with **atom economy** (`(M_desired / Σ M_reactants) × 100%`) and the **E-factor** (waste mass per unit product mass) to benchmark synthetic efficiency before pilot-plant scale-up.

Four recurring calculation errors explain most coursework and bench discrepancies:

1. **Comparing masses instead of moles:** Raw weights ignore molar mass spreads (`H₂` at `2.016 g/mol` vs. `I₂` at `253.81 g/mol`).
2. **Omitting coefficients during limiting checks:** Comparing `n_A` to `n_B` directly without dividing by `ν_A` and `ν_B` fails whenever ratios differ from `1:1`.
3. **Confusing monatomic and diatomic masses:** Using `16.00 g/mol` instead of `32.00 g/mol` for `O₂` halves calculated oxygen demand.
4. **Premature rounding:** Truncating intermediate moles to two significant figures introduces `1–3%` yield drift; carry at least four digits until reporting.

Experimental theoretical yield assumes anhydrous reagents and full conversion; in practice, absorbed moisture, catalyst poisoning, and thermodynamic equilibrium (`K_eq`) reduce isolated output.
