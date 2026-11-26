---
title: "Combined Gas Law Calculator: Changing Conditions"
description: "Track simultaneous pressure, volume, and temperature shifts in closed gas systems using (P₁V₁)/T₁ = (P₂V₂)/T₂ with exact Kelvin conversions and state benchmarks."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "combined-gas-law-calculator"
relatedType: "calculator"
faqs:
  - question: "When should I use the Combined Gas Law instead of the Ideal Gas Law (PV = nRT)?"
    answer: "Use the Combined Gas Law when a fixed quantity of gas (constant moles n) transitions between two distinct states and pressure, volume, and temperature change together. It eliminates both n and the gas constant R. Use PV = nRT instead when evaluating a single static state or when gas is added or vented."
  - question: "Which units are valid in (P₁V₁)/T₁ = (P₂V₂)/T₂?"
    answer: "Any consistent absolute pressure unit (atm, bar, kPa, psia, Torr) and any consistent volume unit (L, mL, m³, ft³) work as long as initial and final states use the same unit. Temperature MUST be on an absolute scale—Kelvin (K = °C + 273.15) or Rankine (°R = °F + 459.67)—never Celsius or Fahrenheit."
  - question: "Why do tire and tank gauge readings give wrong answers in the Combined Gas Law?"
    answer: "Gauge pressure measures only the excess pressure above ambient air, not total thermodynamic pressure. An unpressurized container at 0 psig still holds 14.696 psia of gas. Always add local atmospheric pressure to both P₁ and P₂ before solving, then subtract it afterward if you need a final gauge reading."
  - question: "How do Boyle's, Charles's, and Gay-Lussac's laws relate to the Combined Gas Law?"
    answer: "They are direct special cases obtained by canceling whichever variable stays constant. Holding T₁ = T₂ yields Boyle's Law (P₁V₁ = P₂V₂); holding P₁ = P₂ yields Charles's Law (V₁/T₁ = V₂/T₂); holding V₁ = V₂ yields Gay-Lussac's Law (P₁/T₁ = P₂/T₂)."
  - question: "Does the Combined Gas Law still work if moisture condenses as a gas cools?"
    answer: "No. Condensation converts water vapor into liquid water, reducing the number of gas-phase moles n and breaking the constant-moles assumption. For humid gas mixtures cooled below the dew point, subtract the saturation vapor pressure of water at T₁ and T₂ separately before applying the ratio to the dry gas."
---

The **Combined Gas Law** models how a fixed quantity of gas responds when pressure (`P`), volume (`V`), and absolute temperature (`T`) change simultaneously between an initial state and a final state: **`(P₁ × V₁) / T₁ = (P₂ × V₂) / T₂`**. By linking all three macroscopic state variables into a single conserved ratio, it predicts gas expansion or compression across real environments—such as ascending weather balloons, diving cylinders, and outdoor storage tanks—where temperature and pressure rarely hold steady one at a time.

Because the number of gas moles (`n`) stays constant in a sealed system, the product `nR` cancels out completely, removing any need to know the gas species, molar mass, or universal gas constant `R`. Our [Combined Gas Law Calculator](/en/calculators/combined-gas-law-calculator) automates absolute temperature conversions, cross-multiplies the ratio, and solves for any of the six state parameters.

## Derivation, Algebraic Rearrangements, and Variable Rules

Rearranging the Ideal Gas Law (`PV = nRT`) isolates the conserved constant on the right-hand side for any sealed gas sample (`n₁ = n₂`):

```text
Conserved Ratio:   (P₁ × V₁) / T₁ = (P₂ × V₂) / T₂ = n × R = constant

Solve State 2:     P₂ = (P₁ × V₁ × T₂) / (V₂ × T₁)
                   V₂ = (P₁ × V₁ × T₂) / (P₂ × T₁)
                   T₂ = (P₂ × V₂ × T₁) / (P₁ × V₁)

Solve State 1:     P₁ = (P₂ × V₂ × T₁) / (V₁ × T₂)
                   V₁ = (P₂ × V₂ × T₁) / (P₁ × T₂)
                   T₁ = (P₁ × V₁ × T₂) / (P₂ × V₂)
```

Three strict boundary conditions govern every calculation:

- **Constant Moles (`n₁ = n₂`):** No gas may leak, enter through a valve, condense, or chemically react between states.
- **Absolute Temperature Only:** Convert via `K = °C + 273.15` or `°R = °F + 459.67`. Zero or negative Celsius temperatures break ratio scaling.
- **Absolute Pressure Consistency:** Match `P₁` and `P₂` in identical vacuum-referenced units (`P_abs = P_gauge + P_atm`), and match `V₁` and `V₂` in one volume unit (`L`, `m³`, `ft³`).

## Step-by-Step Worked Example: Weather Balloon Ascent to the Stratosphere

A meteorological latex balloon is filled with helium at sea level (`P₁ = 101.325 kPa`, `T₁ = 20.0 °C`) to an initial volume of `V₁ = 4.20 m³` (`4,200 L`). It rises into the lower stratosphere to an altitude of `25 km`, where ambient barometric pressure falls to `P₂ = 2.55 kPa` and air temperature drops to `T₂ = −52.0 °C`. Neglecting latex wall tension and gas permeation, determine the balloon's expanded volume `V₂`.

1. **Convert initial and final temperatures to Kelvin:**
   - `T₁ = 20.0 + 273.15 = 293.15 K`
   - `T₂ = −52.0 + 273.15 = 221.15 K`
2. **Isolate the unknown final volume (`V₂`):**
   - `V₂ = (P₁ × V₁ × T₂) / (P₂ × T₁)`
3. **Substitute verified values:**
   - Numerator: `101.325 kPa × 4.20 m³ × 221.15 K = 94,113.70 kPa·m³·K`
   - Denominator: `2.55 kPa × 293.15 K = 747.5325 kPa·K`
   - `V₂ = 94,113.70 / 747.5325 = 125.90 m³` (`125,900 L`)

Decomposing the result illustrates how competing physical effects interact: the `39.74×` drop in external pressure (`101.325 / 2.55`) drives massive expansion, while atmospheric cooling (`221.15 / 293.15 = 0.7544×`) shrinks the gas by roughly `24.6%`. Their combined effect expands the balloon to nearly `30×` its launch volume—explaining why high-altitude sounding balloons burst at design diameter near `30–35 km`.

## Special-Case Gas Laws and Real-World Operating Regimes

Knowing which variables remain fixed determines whether the full Combined Gas Law or a simplified subset applies to an engineering problem:

| Gas Law / Model | Held Constant | Governing Formula | Scaling Behavior | Typical Engineering Use Case | Common Modeling Trap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Combined Gas Law** | `n` (moles) | `(P₁V₁)/T₁ = (P₂V₂)/T₂` | Joint `P, V, T` transition | Weather balloons, gas transport | Using Celsius or gauge pressure |
| **Boyle's Law** | `n, T` | `P₁V₁ = P₂V₂` | `P ∝ 1/V` (isothermal) | Syringes, diving air reserves | Rapid compression heats gas |
| **Charles's Law** | `n, P` | `V₁/T₁ = V₂/T₂` | `V ∝ T` (isobaric) | Flexible bladders, hot-air lift | Applying to rigid steel tanks |
| **Gay-Lussac's Law** | `n, V` | `P₁/T₁ = P₂/T₂` | `P ∝ T` (isochoric) | Aerosol cans, rigid pressure vessels | Ignoring thermal expansion of tank |
| **Ideal Gas Law** | None (single state) | `PV = nRT` | Static state equation | Stoichiometry, tank mass inventory | Mismatching `R` to `P` or `V` units |
| **Adiabatic Ideal Gas** | `n`, no heat loss (`Q = 0`) | `P₁V₁^γ = P₂V₂^γ` | Polytropic (`γ = c_p/c_v`) | Diesel cylinders, rapid valve fills | Assuming `T₂ = T₁` during fast stroke |

## Practical Engineering Pitfalls and Thermodynamic Limits

In automotive diagnostics, gauge-pressure mistakes skew seasonal tire checks. Inflating a tire at `25 °C` (`298.15 K`) to `35.0 psig` (`49.70 psia` at `14.70 psi` sea-level atmospheric pressure) and cooling it overnight to `−15 °C` (`258.15 K`) at roughly constant volume yields `P₂ = 49.70 × (258.15 / 298.15) = 43.03 psia`, or `28.3 psig`—a `6.7 psi` drop. Using gauge pressure directly (`35.0 × 258.15 / 298.15`) falsely predicts `30.3 psig`, underestimating the loss by `2.0 psi`.

Three additional limits govern high-accuracy applications:

- **Thermal equilibrium lag:** Rapid piston compression heats gas via mechanical work (`ΔU = W`); `T₂` equals ambient temperature only after heat dissipates.
- **Moisture condensation:** Air cooled below its dew point precipitates liquid water, reducing gas moles; subtract `P_H₂O(T)` at each state to track dry air accurately.
- **High-pressure compressibility (`Z ≠ 1`):** Above `~20 atm`, real gases require compressibility correction: `(P₁V₁) / (Z₁T₁) = (P₂V₂) / (Z₂T₂)`.
