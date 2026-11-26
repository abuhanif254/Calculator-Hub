---
title: "Calorimetry Calculator: Measuring Heat Transfer"
description: "Calculate sensible heat (q = m × c × ΔT), thermal equilibrium temperatures, calorimeter constants, and latent phase changes across lab and industrial systems."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "calorimetry-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between specific heat capacity (c) and heat capacity (C_cal)?"
    answer: "Specific heat capacity (c) is an intensive material property measured per unit mass—typically J/(g·°C) or J/(kg·K)—such as 4.184 J/(g·°C) for liquid water. Total heat capacity (C_cal) is an extensive property of an entire assembled device (such as a steel bomb calorimeter plus its water jacket), measured in J/°C or kJ/°C so you multiply directly by ΔT without multiplying by mass."
  - question: "Why does coffee-cup calorimetry measure ΔH while bomb calorimetry measures ΔU?"
    answer: "A nested polystyrene coffee-cup calorimeter sits open to atmospheric pressure, making it a constant-pressure system where heat exchanged equals enthalpy change (q_p = ΔH). A sealed stainless-steel bomb calorimeter holds volume fixed during high-temperature combustion, preventing PΔV expansion work so the measured heat equals internal energy change (q_v = ΔU)."
  - question: "How do you convert food energy measured in bomb calorimetry (joules) to nutritional Calories?"
    answer: "One dietary Calorie (capital C, equivalent to 1 kilocalorie or 1 kcal) equals exactly 4,184 J (4.184 kJ). After measuring total combustion heat in kilojoules, divide by 4.184 to obtain dietary Calories—keeping in mind that FDA nutrition labels further apply Atwater digestibility corrections for protein, carbohydrate, fat, and indigestible fiber."
  - question: "Why must the calorimeter constant (C_cal) be included in accurate lab calculations?"
    answer: "Even well-insulated calorimeters absorb part of the reaction heat through their inner walls, thermometer probe, and magnetic stirrer. Ignoring C_cal attributes all heat solely to the solution, systematically underestimating exothermic |ΔH| by 2% to 10% in student coffee-cup trials and making bomb calorimetry impossible."
  - question: "How do you handle a calorimetry problem where a substance crosses a melting or boiling point?"
    answer: "Temperature remains constant while a pure substance changes phase, so q = m × c × ΔT cannot span a phase boundary in one step. Split the heating curve into sequential segments: sensible heating of the initial phase, isothermal latent heat (q = m × L_f for melting or m × L_v for vaporization), and sensible heating of the new phase, then sum every segment."
---

**Calorimetry** quantifies thermal energy (`q`) exchanged during a temperature change, phase transition, or chemical reaction inside an insulated vessel. Under the First Law of Thermodynamics, an adiabatic calorimeter traps all energy inside its boundary so heat lost by one component equals heat gained by the surroundings (`q_rxn = −(q_solution + q_cal)`).

For single-phase heating or cooling without a phase transition, sensible heat obeys `q = m × c × ΔT`, where `m` is mass, `c` is specific heat capacity, and `ΔT = T_final − T_initial`. Our [Calorimetry Calculator](/en/calculators/calorimetry-calculator) solves `q = m × c × ΔT` equations, two-body thermal equilibrium mixtures, coffee-cup and bomb calorimetry trials, and multi-stage phase heating curves.

## Calorimetry Equations, Modes, and Parameter Definitions

Depending on vessel geometry and phase transitions, calorimetry relies on four energy-balance expressions:

```text
Sensible Heat Transfer:       q = m × c × ΔT = m × c × (T_final − T_initial)
Total Calorimeter Balance:    q_rxn = −(m_sol × c_sol × ΔT + C_cal × ΔT)
Bomb Calorimetry (Const. V):  q_v = ΔU = −C_cal × ΔT
Two-Body Equilibrium Temp.:   T_eq = (m₁ × c₁ × T₁ + m₂ × c₂ × T₂) / (m₁ × c₁ + m₂ × c₂)
Latent Phase Transition:      q_phase = ± m × L   (L_f = 334 J/g; L_v = 2,260 J/g for water)
```

* **`q` (Thermal Energy, J or kJ):** Positive when a body absorbs heat (`T_final > T_initial`); negative when it releases heat (`T_final < T_initial`).
* **`m` (Mass, g or kg):** Mass of the absorbing or releasing medium (`~1.00 g/mL` for dilute aqueous solutions).
* **`c` (Specific Heat Capacity, J/(g·°C)):** Energy needed to raise `1 g` of material by `1 °C` (`4.184 J/(g·°C)` for liquid water).
* **`C_cal` (Calorimeter Constant, J/°C or kJ/°C):** Combined heat capacity of calorimeter hardware, probe, and jacket, calibrated via electrical pulse or NIST benzoic acid (`−26.434 kJ/g`).
* **`L` (Specific Latent Heat, J/g):** Isothermal energy for melting (`L_f`) or vaporization (`L_v`).

### Coffee-Cup vs. Bomb Calorimetry

A **coffee-cup calorimeter** runs open to atmospheric pressure (`P = constant`), directly yielding enthalpy (`q_p = ΔH`). A **bomb calorimeter** burns fuel or food in pressurized `O₂` (`25–30 atm`) inside a rigid steel vessel submerged in water; constant volume yields internal energy (`q_v = ΔU`), convertible via `ΔH = ΔU + Δn_gas × R × T`.

## Step-by-Step Worked Examples

### Example 1: Coffee-Cup Neutralization with `C_cal` Correction

Mix `50.0 mL` of `1.00 M HCl` and `50.0 mL` of `1.00 M NaOH` (both at `20.00 °C`) in a calorimeter with `C_cal = 15.0 J/°C`. Peak temperature reaches `26.75 °C` (`m_sol = 100.0 g`, `c_sol = 4.184 J/(g·°C)`):

1. **Temperature rise:** `ΔT = 26.75 − 20.00 = +6.75 °C`.
2. **Solution heat absorbed:** `q_sol = 100.0 × 4.184 × 6.75 = +2,824.2 J`.
3. **Hardware heat absorbed:** `q_cal = 15.0 × 6.75 = +101.25 J`.
4. **Reaction heat:** `q_rxn = −(2,824.2 + 101.25) = −2,925.45 J = −2.925 kJ`.
5. **Molar enthalpy:** With `n = 0.0500 mol H₂O`, `ΔH_neut = −2.92545 / 0.0500 = −58.5 kJ/mol` (near the `−57.3 kJ/mol` infinite-dilution reference).

### Example 2: Hot Copper in Water (Thermal Equilibrium)

Drop `100.0 g` copper (`c₁ = 0.385 J/(g·°C)`, `100.0 °C`) into `200.0 g` water (`c₂ = 4.184 J/(g·°C)`, `20.0 °C`, ignoring `C_cal`):

1. **Heat capacities:** `m₁c₁ = 38.5 J/°C`; `m₂c₂ = 836.8 J/°C`.
2. **Equilibrium temperature:** `T_eq = [(38.5 × 100.0) + (836.8 × 20.0)] / (38.5 + 836.8) = 20,586 / 875.3 = 23.52 °C`.

## Specific Heat Capacities and Calorimetry Reference Benchmarks

| Substance / System | Property Value | Phase / Operating Mode | Thermal Behavior | Common Engineering or Lab Use |
| :--- | :---: | :--- | :--- | :--- |
| Liquid Water (`H₂O`) | `4.184 J/(g·°C)` | Liquid (`0–100 °C`, `1 atm`) | Very high thermal inertia | Calorimetry bath & coolant |
| Water Ice (`H₂O`) | `2.09 J/(g·°C)` | Solid (`<0 °C`); `L_f = 334 J/g` | Half the `c` of liquid water | Cold-chain & phase curves |
| Aluminum (`Al`) | `0.897 J/(g·°C)` | Solid metal (`25 °C`) | Moderate `c`, high conductivity | Heat sinks, calorimeter blocks |
| Copper (`Cu`) | `0.385 J/(g·°C)` | Solid metal (`25 °C`) | Low `c`, rapid equilibration | Heat exchangers, metal drops |
| Ethanol (`C₂H₅OH`) | `2.44 J/(g·°C)` | Liquid (`25 °C`) | Heats `1.7×` faster than water | Organic solvent calorimetry |
| Benzoic Acid Standard | `−26.434 kJ/g` | Pressurized `O₂` (`30 atm`, `25 °C`) | Fixed-volume `ΔU` calibration | Bomb `C_cal` (`~10.35 kJ/°C`) |

## Practical Applications, Experimental Errors, and Calibration Caveats

Calorimetry underpins **ASTM D240 / ISO 1928** fuel gross calorific value testing, **differential scanning calorimetry (DSC)** for polymer transitions, and **FDA nutrition-label testing**. In chemical safety, **accelerating rate calorimetry (ARC)** detects exothermic runaway onset temperatures before pilot scale-up.

Four systematic errors frequently bias lab measurements:

* **Using pure-water `c` for concentrated solutions:** `2 M NaCl` lowers `c` near `3.75 J/(g·°C)`, inflating calculated `|q|` by up to `10%` if uncorrected.
* **Omitting cooling-curve extrapolation:** Heat leaks through cup lids; extrapolating post-peak cooling back to mixing time removes heat-loss bias.
* **Neglecting `C_cal` or fuse-wire energy:** Uncalibrated vessels underestimate `|ΔH|` by `2%` to `10%`, and ASTM bomb runs must subtract ignition-wire heat (`~2.3 cal/cm`).
* **Spanning a phase boundary in one `m × c × ΔT` step:** Warming `-10 °C` ice to `25 °C` water fails unless `q_melt = m × 334 J/g` is added at `0 °C`.

Use the [Calorimetry Calculator](/en/calculators/calorimetry-calculator) to solve for heat transfer, equilibrium temperatures, `C_cal`-corrected reaction heats, or multi-stage phase heating curves.
