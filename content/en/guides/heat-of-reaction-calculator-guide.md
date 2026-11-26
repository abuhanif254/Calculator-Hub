---
title: "Heat of Reaction Calculator: Thermodynamics"
description: "Compute standard heat of reaction (ΔH°_rxn) from enthalpies of formation, apply stoichiometric scaling, and convert between ΔH and ΔU."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "heat-of-reaction-calculator"
relatedType: "calculator"
faqs:
  - question: "What exact conditions define a thermodynamic standard state (°)?"
    answer: "Modern IUPAC convention defines the standard state at a specified temperature (usually 298.15 K / 25 °C) with gases at 1 bar (100 kPa) ideal-gas behavior, pure solids and liquids in their most stable form at 1 bar, and aqueous solutes at 1 molal or 1 M ideal concentration. Older US textbooks use 1 atm (101.325 kPa), which shifts condensed-phase enthalpies by less than 0.01 kJ/mol."
  - question: "Why is the standard heat of formation of an element in its reference state equal to zero?"
    answer: "Absolute enthalpy has no natural zero point, so thermochemistry establishes a relative baseline by assigning ΔH°_f = 0 kJ/mol to every chemical element in its most stable allotrope at 298.15 K and 1 bar (such as O₂(g), H₂(g), N₂(g), Br₂(l), and C(graphite)). Less stable allotropes have nonzero formation enthalpies—for example, C(diamond) is +1.895 kJ/mol and ozone O₃(g) is +142.7 kJ/mol."
  - question: "How do I adjust the heat of reaction when an equation is doubled or scaled to a real sample mass?"
    answer: "Enthalpy is an extensive property, meaning it scales linearly with molar extent of reaction (ξ). If you multiply every stoichiometric coefficient in a balanced equation by 2, you multiply ΔH°_rxn by 2. For an arbitrary sample mass m with molar mass M and stoichiometric coefficient ν, compute extent ξ = (m / M) / ν, then multiply ξ by ΔH°_rxn."
  - question: "When does the heat of reaction (ΔH) differ significantly from the internal energy of reaction (ΔU)?"
    answer: "They differ whenever a reaction creates or consumes moles of gas (Δn_gas ≠ 0), because expanding or compressing gas against ambient pressure performs PΔV work equal to Δn_gas × R × T. For reactions involving only liquids and solids, Δn_gas = 0 and ΔH ≈ ΔU within 0.01%. For gas-generating detonations or high-molar combustion, the PΔV correction reaches several kilojoules per mole."
  - question: "How is ΔH°_rxn calculated when a compound is missing from standard formation tables?"
    answer: "If ΔH°_f is unavailable for a reactant or product, determine ΔH°_rxn indirectly using Hess's Law from known combustion or intermediate reactions, or estimate the gas-phase value from average bond dissociation energies. For complex organic molecules in solution, group-contribution methods (such as Benson group additivity) or bomb calorimetry on a purified sample provide reliable measurements."
---

The **standard heat of reaction (`ΔH°_rxn`)** is the net enthalpy absorbed or released when standard-state reactants convert completely into standard-state products according to a balanced chemical equation: `ΔH°_rxn = Σ(n × ΔH°_f,products) − Σ(m × ΔH°_f,reactants)`.

Because `ΔH°_rxn` is tied to exact stoichiometry, doubling an equation doubles the heat in kilojoules, while reversing it flips the algebraic sign. Our [Heat of Reaction Calculator](/en/calculators/heat-of-reaction-calculator) computes formation-enthalpy summations, stoichiometric mass scaling, bond-energy estimates, and constant-volume (`ΔU`) conversions.

## Standard States, Core Formulas, and Parameter Definitions

The superscript degree symbol (`°`) denotes IUPAC/NIST standard conditions: pure gases and condensed phases at `1 bar` (`100 kPa`), aqueous solutes at `1 M` ideal activity, and reference temperature `298.15 K` (`25.0 °C`).

```text
Standard Heat of Reaction:    ΔH°_rxn = Σ(n_i × ΔH°_f,products) − Σ(m_j × ΔH°_f,reactants)
Extent-Scaled Batch Heat:     q_rxn = ξ × ΔH°_rxn = (n_reactant / ν_reactant) × ΔH°_rxn
Enthalpy–Internal Energy:     ΔH°_rxn = ΔU°_rxn + Δn_gas × R × T
Gas Mole Change:              Δn_gas = Σ(n_gas,products) − Σ(m_gas,reactants)
Kirchhoff Temp. Correction:   ΔH°(T₂) = ΔH°(T₁) + ΔC_p × (T₂ − T₁)
```

* **`ΔH°_f` (Standard Enthalpy of Formation, kJ/mol):** Enthalpy change to form `1 mol` of a compound from reference elements at `298.15 K`. Reference allotropes (`O₂(g)`, `H₂(g)`, `C(graphite)`) carry `ΔH°_f = 0.0 kJ/mol`.
* **`n_i`, `m_j` (Stoichiometric Coefficients, mol):** Balanced equation multipliers matched to exact phase tags `(s)`, `(l)`, `(g)`, or `(aq)`.
* **`ξ` (Extent of Reaction, mol):** Moles of limiting reactant consumed divided by its stoichiometric coefficient `ν_reactant`.
* **`R` (Universal Gas Constant):** `0.0083145 kJ/(mol·K)`, paired with absolute temperature `T` (`298.15 K`).

### Molar Heat of Combustion vs. Equation Reaction Enthalpy

Standard **heat of combustion (`ΔH°_c`)** is defined strictly per `1.0 mol` of fuel burned completely to `CO₂(g)` and `H₂O(l)`. If a balanced equation uses a fuel coefficient of `2` (such as `2 C₂H₆(g) + 7 O₂(g) → 4 CO₂(g) + 6 H₂O(l)`), its `ΔH°_rxn` (`−3,121.6 kJ`) is twice ethane's molar `ΔH°_c` (`−1,560.8 kJ/mol`). Similarly, when reactors operate far above `298.15 K`, Kirchhoff's Law (`ΔH°(T₂) = ΔH°(T₁) + ΔC_p × (T₂ − T₁)`) adjusts `ΔH°_rxn` using the difference in molar heat capacities between products and reactants.

## Step-by-Step Worked Example: Propane Combustion and `ΔU` Conversion

Determine `ΔH°_rxn`, `ΔU°_rxn`, and total heat released by burning `100.0 g` of propane (`C₃H₈`, `44.10 g/mol`) at `298.15 K`:

```text
Balanced Equation: C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l)
```

1. **Gather `ΔH°_f` values:** `C₃H₈(g) = −103.8`, `O₂(g) = 0.0`, `CO₂(g) = −393.5`, `H₂O(l) = −285.8 kJ/mol`.
2. **Sum products:** `[3 × (−393.5)] + [4 × (−285.8)] = −1,180.5 − 1,143.2 = −2,323.7 kJ/mol`.
3. **Sum reactants:** `[1 × (−103.8)] + [5 × 0.0] = −103.8 kJ/mol`.
4. **Compute `ΔH°_rxn`:** `−2,323.7 − (−103.8) = −2,219.9 kJ/mol`.
5. **Convert to `ΔU°_rxn`:** Counting gases only (`H₂O(l)` omitted), `Δn_gas = 3 − (1 + 5) = −3 mol`. Then `Δn_gas × R × T = (−3) × 0.0083145 × 298.15 = −7.44 kJ/mol`, yielding `ΔU°_rxn = −2,219.9 − (−7.44) = −2,212.5 kJ/mol`.
6. **Scale to `100.0 g` propane:** `n = 100.0 / 44.10 = 2.2676 mol`; `q_rxn = 2.2676 × (−2,219.9) = −5,033.8 kJ` (`−5.03 MJ`).

## Benchmark Thermodynamic Values Across Reaction Classes

| Reaction Class | Balanced Equation | `ΔH°_rxn` (kJ/mol) | `Δn_gas` (mol) | `ΔH° − ΔU°` (kJ/mol) | Engineering / Lab Role |
| :--- | :--- | :---: | :---: | :---: | :--- |
| Propane Combustion | `C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l)` | `−2,219.9` | `−3.0` | `−7.44` | LPG burner & boiler sizing |
| Benzoic Acid Standard | `C₇H₆O₂(s) + 7.5 O₂(g) → 7 CO₂(g) + 3 H₂O(l)` | `−3,227.0` | `−0.5` | `−1.24` | Bomb calorimeter `C_cal` check |
| Aluminothermic Thermite | `Fe₂O₃(s) + 2 Al(s) → 2 Fe(l) + Al₂O₃(s)` | `−851.5` | `0.0` | `0.00` | Rail welding, reduction heat |
| Limestone Calcination | `CaCO₃(s) → CaO(s) + CO₂(g)` | `+178.3` | `+1.0` | `+2.48` | Cement kiln heat duty |
| Strong Neutralization | `HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)` | `−57.1` | `0.0` | `0.00` | Reactor cooling load |
| Ammonium Nitrate Solution | `NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)` | `+25.7` | `0.0` | `0.00` | Endothermic cold packs |

## Practical Applications, Pitfalls, and Safety Considerations

Process engineers use `ΔH°_rxn` to compute **adiabatic temperature rise (`ΔT_ad = −ΔH_rxn / C_p,mixture`)** during OSHA Process Safety Management and AIChE DIERS runaway screenings. Underestimating exothermic `ΔH°_rxn` risks cooling-jacket saturation and overpressurization.

Avoid four recurring thermochemical mistakes:

* **Assigning `0` to non-reference states:** Treating `Br₂(g)` instead of `Br₂(l)`, or `C(diamond)` instead of `C(graphite)`, as zero introduces `+30.9 kJ/mol` and `+1.9 kJ/mol` errors.
* **Omitting stoichiometric multipliers:** Leaving out the `3` on `CO₂` or `4` on `H₂O` corrupts both magnitude and sign.
* **Confusing `(aq)` and `(g)` states:** Hydrating `HCl(g)` (`−92.3 kJ/mol`) to `HCl(aq)` (`−167.2 kJ/mol`) releases `−74.9 kJ/mol` of extra solution enthalpy.
* **Ignoring limiting-reagent extent `ξ`:** Excess reactants act as thermal ballast and do not generate additional reaction heat.

Open the [Heat of Reaction Calculator](/en/calculators/heat-of-reaction-calculator) to compute formation balances, switch between constant-pressure (`ΔH`) and constant-volume (`ΔU`) modes, and scale batch heat duties.
