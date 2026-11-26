---
title: "Charles's Law Calculator: Volume vs. Temperature"
description: "Explore the direct proportionality between gas volume and absolute temperature under isobaric conditions, master Kelvin conversions, and use our free Charles's Law Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "charles-law-calculator"
relatedType: "calculator"
faqs:
  - question: "Why must temperature always be converted to Kelvin in Charles's Law?"
    answer: "Charles's Law expresses a direct ratio between gas volume and absolute thermal energy, which reaches zero only at absolute zero (0 K or -273.15 °C). Celsius and Fahrenheit have arbitrary zero points and allow negative temperatures; plugging 0 °C or -10 °C directly into V₁ / T₁ = V₂ / T₂ causes division-by-zero errors or physically impossible negative volumes."
  - question: "What variables must remain constant for Charles's Law to hold?"
    answer: "Charles's Law requires both external pressure (P) and the molar quantity of gas (n) to remain strictly constant throughout the thermal change—an isobaric closed system. If a gas is sealed inside a rigid steel tank where volume cannot expand, heating raises pressure instead of volume according to Gay-Lussac's Law (P₁ / T₁ = P₂ / T₂)."
  - question: "How does Charles's Law relate to the Ideal Gas Law?"
    answer: "Rearranging the Ideal Gas Law (PV = nRT) yields V / T = nR / P. Because R is the universal gas constant and both n (moles of gas) and P (pressure) are held fixed in an isobaric process, the entire right-hand side reduces to a single constant k, giving the standard Charles's Law form V₁ / T₁ = V₂ / T₂."
  - question: "Can you use Rankine instead of Kelvin for Charles's Law calculations?"
    answer: "Yes. Rankine (°R = °F + 459.67) is an absolute temperature scale anchored at absolute zero just like Kelvin. Because temperature appears as a ratio (T₂ / T₁), any absolute scale works identically—provided both T₁ and T₂ are in the same absolute unit—and the resulting volume retains whatever unit you used for V₁."
  - question: "When does a real gas deviate significantly from Charles's Law?"
    answer: "Real gases deviate from linear V-versus-T behavior at very high pressures or low temperatures near their condensation point. As molecules slow down and pack closer together, attractive intermolecular forces pull them inward and finite molecular volume becomes non-negligible, causing volume to drop faster than predicted before liquefying abruptly."
---

**Charles's Law** states that for a fixed mass of an ideal gas at constant pressure, volume is directly proportional to absolute temperature (`V₁ / T₁ = V₂ / T₂`). Heating increases molecular kinetic energy, pushing movable boundaries outward until internal pressure equilibrates; cooling reduces molecular velocity and contracts volume linearly toward absolute zero (`−273.15 °C`).

Every Charles's Law calculation requires **absolute temperature** in Kelvin (`K = °C + 273.15`) or Rankine (`°R = °F + 459.67`), while volume uses any consistent unit (`L`, `mL`, or `ft³`). Our [Charles's Law Calculator](/en/calculators/charles-law-calculator) converts Celsius or Fahrenheit inputs to Kelvin automatically, solves for any missing variable (`V₁`, `T₁`, `V₂`, or `T₂`), and reports thermal expansion ratios.

## Core Methodology, Formula, and Parameter Definitions

Jacques Charles and Joseph Louis Gay-Lussac established experimentally that ideal gases expand by approximately `1 / 273.15` of their `0 °C` volume for every `1 °C` temperature increase at constant pressure. In modern thermodynamics, Charles's Law emerges directly as the isobaric special case of the Ideal Gas Law (`PV = nRT`):

```text
Proportionality Form:     V / T = k  (constant P and n)
Two-State Form:           V₁ / T₁ = V₂ / T₂
Solving for Final Vol.:   V₂ = V₁ × (T₂ / T₁)
Solving for Final Temp.:  T₂ = T₁ × (V₂ / V₁)
Kelvin Conversion:        T(K) = T(°C) + 273.15
Fahrenheit to Kelvin:     T(K) = (T(°F) − 32) × (5 / 9) + 273.15
```

* **`V₁` (Initial Volume):** Gas volume at the starting thermal state, expressed in `L`, `mL`, `m³`, or `ft³`. Both `V₁` and `V₂` must share the same volume unit.
* **`T₁` (Initial Absolute Temperature):** Starting gas temperature converted strictly to Kelvin (`K`) or Rankine (`°R`). Never substitute raw `°C` or `°F`.
* **`V₂` (Final Volume):** Gas volume after heating or cooling once mechanical equilibrium at constant pressure `P` is restored.
* **`T₂` (Final Absolute Temperature):** Ending absolute temperature in `K` (or `°R`), convertible back to Celsius via `T(°C) = T(K) − 273.15`.
* **`k` (Isobaric Proportionality Constant):** Equals `nR / P` in units of `L/K` (or `m³/K`), representing the constant slope of the `V` versus `T` isobar.

### Why Absolute Zero Anchors the Equation

Extrapolating any ideal-gas volume-versus-temperature line on a Celsius plot intercepts zero volume at `−273.15 °C`, regardless of gas identity. Setting that intercept to `0 K` turns an offset line into a pure origin ratio (`V = k × T_K`). Doubling Kelvin temperature from `200 K` (`−73.15 °C`) to `400 K` (`126.85 °C`) doubles volume, whereas doubling Celsius from `20 °C` to `40 °C` expands volume by just `6.8%` (`313.15 / 293.15 = 1.0682`).

## Step-by-Step Worked Examples

### Example 1: Thermal Expansion of a Flexible Gas Sample

A weather balloon holds `4.50 L` of helium at `20.0 °C` and `1.00 atm`. Warming to `85.0 °C` at constant pressure yields what final volume `V₂`?

1. **Convert to Kelvin:** `T₁ = 20.0 + 273.15 = 293.15 K`; `T₂ = 85.0 + 273.15 = 358.15 K`.
2. **Solve for `V₂`:** `V₂ = V₁ × (T₂ / T₁) = 4.50 L × (358.15 / 293.15) = 5.4978 L ≈ 5.50 L`.
   A `65.0 °C` temperature rise causes a `22.2%` expansion, whereas an erroneous Celsius ratio (`4.50 × 85.0 / 20.0 = 19.1 L`) overpredicts by more than threefold.

### Example 2: Target Cooling Temperature

A frictionless piston traps `2.40 L` of dry nitrogen at `25.0 °C`. To what Celsius temperature must it cool at constant pressure to reach `1.80 L`?

1. **Convert Initial Temperature:** `T₁ = 25.0 + 273.15 = 298.15 K`.
2. **Solve for `T₂`:** `T₂ = 298.15 K × (1.80 L / 2.40 L) = 223.6125 K`.
3. **Convert to Celsius:** `T₂(°C) = 223.6125 − 273.15 = −49.5375 °C ≈ −49.54 °C`.

## Thermal Expansion Benchmarks Across Operating Regimes

The table below tracks a `10.00 L` ideal gas sample anchored at standard temperature (`0.00 °C`, `273.15 K`) and constant `1.00 atm` pressure across six real-world thermal conditions:

| Thermal Regime | Temp (`°C`) | Absolute Temp (`K`) | Expansion Ratio (`T₂ / T₁`) | Resulting Volume (`L`) | Relative Change |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Liquid nitrogen bath | `−196.00` | `77.15` | `0.2824` | `2.82` | `−71.8%` |
| Arctic winter ambient | `−40.00` | `233.15` | `0.8536` | `8.54` | `−14.6%` |
| Standard temperature (`STP`) | `0.00` | `273.15` | `1.0000` | `10.00` | `0.0%` |
| Controlled lab ambient | `25.00` | `298.15` | `1.0915` | `10.92` | `+9.2%` |
| Boiling water / steam | `100.00` | `373.15` | `1.3661` | `13.66` | `+36.6%` |
| Industrial flue exhaust | `500.00` | `773.15` | `2.8305` | `28.30` | `+183.0%` |

## Real-World Applications, Pitfalls, and Precision Caveats

In aerospace, HVAC, and chemical process engineering, Charles's Law governs thermal buoyancy in hot-air balloons, volumetric air-handling corrections across heating coils, and gas-flow meter calibration when process streams deviate from standard reference temperature (`0 °C` or `20 °C`). In respiratory physiology and pulmonary spirometry, exhaled gas cooled inside unheated spirometer tubing shrinks in volume and must be corrected from ambient temperature (`ATPS`) back to body temperature (`BTPS`, `37.0 °C` / `310.15 K`).

* **Rigid Container Confusion:** Charles's Law applies strictly when a movable boundary (piston, flexible bladder, soap film, or open vent) keeps pressure constant. Rigid pressure vessels—including scuba tanks and aerosol cans—cannot expand significantly, so temperature swings change internal pressure via Gay-Lussac's Law (`P₁ / T₁ = P₂ / T₂`) or require the Combined Gas Law (`P₁V₁ / T₁ = P₂V₂ / T₂`) when both volume and pressure shift simultaneously.
* **Phase-Change Boundaries:** Do not apply Charles's Law across a gas's condensation or sublimation point. Water vapor cooled below `100 °C` at `1 atm` condenses into liquid water (`~1,600×` denser), and carbon dioxide cooled to `−78.5 °C` freezes directly into dry ice; molar gas count `n` drops precipitously and ideal-gas equations break down.
* **Moisture and Vapor Pressure:** When gas is collected over water or contains appreciable humidity, cooling condenses water vapor out of the gas phase, reducing `n` while altering partial pressures. Accurate engineering calculations must first subtract saturation water vapor pressure (`P_H₂O`) at each temperature before computing dry-gas expansion ratios.
