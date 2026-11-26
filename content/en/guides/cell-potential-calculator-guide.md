---
title: "Cell Potential Calculator: Predicting Spontaneous Reactions"
description: "Calculate standard and Nernst cell potentials, relate voltage to Gibbs free energy, predict galvanic versus electrolytic spontaneity, and use our Cell Potential Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "cell-potential-calculator"
relatedType: "calculator"
faqs:
  - question: "Why don't you multiply standard reduction potential (E°) by stoichiometric coefficients?"
    answer: "Cell potential is an intensive property—measured in volts (joules per coulomb of charge transferred)—independent of the total amount of substance reacting. Doubling a half-reaction doubles both Gibbs free energy (ΔG°) and the number of electrons transferred (n), leaving the ratio E° = −ΔG° / (nF) completely unchanged."
  - question: "What is the sign convention for predicting whether a redox reaction is spontaneous?"
    answer: "Under standard or non-standard conditions, a positive cell potential (E_cell > 0) corresponds to negative Gibbs free energy (ΔG < 0), indicating a spontaneous galvanic reaction capable of delivering electrical work. A negative cell potential (E_cell < 0) indicates a non-spontaneous reaction that proceeds only when driven by an external voltage source exceeding |E_cell|."
  - question: "What is the most common mistake when using E°_cell = E°_cathode − E°_anode?"
    answer: "The leading error is reversing the sign of the oxidation half-reaction from a reduction table and then subtracting it anyway, which double-negates the anode potential. When using E°_cell = E°_cathode − E°_anode, insert both values directly as standard reduction potentials without flipping either sign; alternatively, flip the anode sign and add them (E°_red + E°_ox)."
  - question: "How does changing ion concentration affect cell voltage?"
    answer: "Concentration shifts cell potential via the Nernst equation: E_cell = E°_cell − (0.05916 V / n) × log₁₀(Q) at 25 °C. Increasing reactant ion concentration (lowering Q) raises voltage above E°_cell, whereas accumulating product ions or depleting reactants raises Q and drives cell voltage downward toward zero at chemical equilibrium."
  - question: "Why is a real battery's operating voltage lower than its calculated E°_cell?"
    answer: "Thermodynamic cell potential represents open-circuit equilibrium voltage at zero current draw. Under load, real cells lose voltage to activation overpotential at electrode surfaces, concentration polarization near the electrolyte interface, and ohmic resistance (I × R_internal) across separators, tabs, and current collectors."
---

**Standard cell potential (`E°_cell`)** measures the thermodynamic driving force of a redox reaction in volts (`V = J/C`), defined from standard reduction potentials as `E°_cell = E°_cathode − E°_anode`. When `E°_cell > 0`, electrons flow spontaneously from anode to cathode (`ΔG° < 0`), forming a galvanic cell; when `E°_cell < 0`, the reaction is non-spontaneous (`ΔG° > 0`) and requires external voltage to drive electrolysis.

Because standard tables assume `1.00 M` solute activities, `1.00 bar` gas pressures, and `25.0 °C` (`298.15 K`), real batteries, corrosion cells, and sensors operate under concentration-shifted voltages governed by the Nernst equation. Our [Cell Potential Calculator](/en/calculators/cell-potential-calculator) computes standard EMF, Gibbs free energy (`ΔG°`), equilibrium constants (`K`), and Nernst-adjusted cell potentials.

## Electrochemical Equations, Sign Conventions, and Parameter Definitions

All tabulated standard half-cell potentials (`E°`) are written as **reductions** (`Ox + n e⁻ → Red`) referenced against the Standard Hydrogen Electrode (`SHE`: `2 H⁺(1 M) + 2 e⁻ → H₂(1 bar)`, defined as exactly `0.000 V` at all temperatures):

```text
Standard Cell Potential:      E°_cell = E°_cathode − E°_anode
Thermodynamic Free Energy:    ΔG° = −n × F × E°_cell
Equilibrium Constant Link:    E°_cell = (R × T / (n × F)) × ln(K)
Nernst Equation (General):    E_cell = E°_cell − (R × T / (n × F)) × ln(Q)
Nernst Equation at 25.0 °C:   E_cell = E°_cell − (0.05916 V / n) × log₁₀(Q)
```

* **`E°_cathode` (Volts, `V`):** Standard reduction potential of the species undergoing reduction (gaining electrons) at the cathode.
* **`E°_anode` (Volts, `V`):** Standard **reduction** potential of the species undergoing oxidation (losing electrons) at the anode—entered with its original table sign when subtracting.
* **`n` (dimensionless):** Total moles of electrons transferred per balanced stoichiometric reaction unit (`e.g., n = 2` for `Zn + Cu²⁺ → Zn²⁺ + Cu`).
* **`F` (Faraday Constant):** `96,485 C/mol` (exact SI value `96,485.33212 C/mol`), the electric charge carried by one mole of elementary electrons.
* **`Q` (Reaction Quotient):** Ratio of product activities/concentrations to reactant activities/concentrations raised to stoichiometric powers (pure solids and liquids equal `1`).

### Intensive Nature of Electrode Potential

Never multiply `E°` values by stoichiometric balancing coefficients. If a half-reaction like `Ag⁺ + e⁻ → Ag(s)` (`E° = +0.800 V`) is doubled to `2 Ag⁺ + 2 e⁻ → 2 Ag(s)` to match a divalent anode, its reduction potential remains `+0.800 V`. Potential measures energy **per unit charge** (`J/C`), so scaling the reaction scales both `ΔG°` and `n` proportionally while leaving `E°` invariant.

## Step-by-Step Worked Examples

### Example 1: Standard Daniell Cell (`Zn | Zn²⁺ || Cu²⁺ | Cu`)

Determine the standard cell potential and standard Gibbs free energy of a galvanic cell pairing a zinc anode in `1.00 M ZnSO₄` with a copper cathode in `1.00 M CuSO₄` at `25.0 °C`.

1. **Identify Half-Reactions and Tabulated Reduction Potentials:**
   * Cathode (reduction, higher `E°`): `Cu²⁺(aq) + 2 e⁻ → Cu(s)`, `E°_cathode = +0.340 V`
   * Anode (oxidation, lower `E°`): `Zn²⁺(aq) + 2 e⁻ → Zn(s)`, `E°_anode = −0.763 V`
2. **Compute `E°_cell`:**
   `E°_cell = +0.340 V − (−0.763 V) = +1.103 V`
   Because `E°_cell > 0`, the net reaction `Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)` is spontaneous.
3. **Compute Standard Gibbs Free Energy (`n = 2`):**
   `ΔG° = −(2) × (96,485 C/mol) × (+1.103 J/C) = −212,845.9 J/mol ≈ −212.85 kJ/mol`

### Example 2: Non-Standard Voltage Using the Nernst Equation

Suppose the Daniell cell above runs at `25.0 °C` with elevated zinc product (`[Zn²⁺] = 1.50 M`) and depleted copper reactant (`[Cu²⁺] = 0.050 M`).

1. **Compute Reaction Quotient `Q` (excluding solids `Zn` and `Cu`):**
   `Q = [Zn²⁺] / [Cu²⁺] = 1.50 / 0.050 = 30.0`
2. **Apply the `25.0 °C` Nernst Equation (`n = 2`):**
   `E_cell = 1.103 − (0.05916 / 2) × log₁₀(30.0)`
   `E_cell = 1.103 − 0.02958 × 1.47712 = 1.103 − 0.04369 = +1.059 V`
   Depleting `Cu²⁺` and accumulating `Zn²⁺` drops cell output by `44 mV` below standard potential.

## Electrochemical Cell Benchmarks and Spontaneity Regimes

| Electrochemical System | Cathode `E°` (`V`) | Anode `E°` (`V`) | Electrons (`n`) | `E°_cell` (`V`) | `ΔG°` (`kJ/mol`) | Regime |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Daniell (`Zn \| Zn²⁺ \|\| Cu²⁺ \| Cu`) | `+0.340` | `−0.763` | `2` | `+1.103` | `−212.8` | Galvanic (spontaneous) |
| Copper-Silver (`Cu \| Cu²⁺ \|\| Ag⁺ \| Ag`) | `+0.800` | `+0.340` | `2` | `+0.460` | `−88.8` | Galvanic (spontaneous) |
| Lead-Acid cell (`Pb \| PbSO₄ \|\| PbO₂`) | `+1.685` | `−0.356` | `2` | `+2.041` | `−393.9` | Galvanic (rechargeable) |
| Sacrificial Al-Zn (`Al \| Al³⁺ \|\| Zn²⁺ \| Zn`) | `−0.763` | `−1.662` | `6` | `+0.899` | `−520.4` | Galvanic (corrosion guard) |
| Iron rusting in acid (`Fe \| Fe²⁺ \|\| O₂/H⁺`) | `+1.229` | `−0.447` | `4` | `+1.676` | `−646.8` | Galvanic (corrosion) |
| Acidic water electrolysis (`H₂O → H₂ + ½ O₂`) | `0.000` | `+1.229` | `4` | `−1.229` | `+474.3` | Electrolytic (driven) |

## Engineering Applications, Pitfalls, and Precision Caveats

Standard and Nernst potentials guide battery design, cathodic pipeline protection, potentiometric `pH` probes, and water electrolyzers. In copper electrorefining, controlling voltage between adjacent reduction potentials plates pure copper (`+0.340 V`) while leaving less noble iron and zinc impurities dissolved.

* **Double-Negation Errors:** Never flip the sign of `E°_anode` when using `E°_cathode − E°_anode`; flipping *and* subtracting turns `+1.103 V` into an erroneous negative or offset figure.
* **Activity vs. Concentration:** Above `0.5 M`, ionic activity coefficients (`γ_i`) diverge from `1.0`, shifting real open-circuit voltages by tens of millivolts from ideal Nernst predictions.
* **Kinetic Overpotential and Passivation:** Positive `E_cell` guarantees thermodynamic spontaneity, not fast kinetics. Aluminum (`E° = −1.662 V`) resists corrosion via a passivating `Al₂O₃` film, while water electrolyzers need `1.6–2.0 V` rather than `1.229 V` to overcome overpotential and ohmic losses.
