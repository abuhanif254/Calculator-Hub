---
title: "Boyle's Law Calculator: Pressure vs. Volume"
description: "Calculate isothermal pressure-volume shifts with P₁V₁ = P₂V₂, analyze diving and pneumatic compression ratios, and avoid gauge-pressure and adiabatic errors."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "boyles-law-calculator"
relatedType: "calculator"
faqs:
  - question: "What conditions must stay constant for Boyle's Law (P₁V₁ = P₂V₂) to hold true?"
    answer: "Both absolute temperature (T) and the number of gas moles (n) must remain strictly constant throughout the transition—defining a closed, isothermal process. Pressure must also stay within moderate ranges (typically under 10–20 atm) where intermolecular forces and molecular volume remain negligible."
  - question: "Do I need to convert units to atmospheres and liters before using P₁V₁ = P₂V₂?"
    answer: "No. Because P₁V₁ = P₂V₂ is a symmetric ratio equation, any consistent unit of absolute pressure (atm, bar, kPa, psia, Torr) and any consistent unit of volume (L, mL, m³, ft³) produces the exact answer, provided State 1 and State 2 share identical units."
  - question: "How does Boyle's Law explain scuba diving barotrauma?"
    answer: "Seawater adds roughly 1 atm of hydrostatic pressure for every 10 meters (33 feet) of depth. At 10 meters (2 atm total), air compresses to half its surface volume; ascending to the surface (1 atm) causes trapped lung air to double in volume unless exhaled continuously, risking arterial gas embolism."
  - question: "Why does a bicycle pump get hot if Boyle's Law assumes constant temperature?"
    answer: "Rapidly pushing a pump piston performs mechanical compression work faster than heat can conduct out through the barrel, creating a near-adiabatic process (P₁V₁^γ = P₂V₂^γ) that spikes gas temperature. Boyle's Law holds once the compressed air cools back to ambient temperature."
  - question: "What do P versus V and P versus 1/V graphs look like under Boyle's Law?"
    answer: "Plotting pressure (P) against volume (V) produces a downward-sloping rectangular hyperbola (an isotherm) where P × V equals a fixed constant at every point. Plotting P against 1/V yields a straight line passing through the origin whose slope equals nRT."
---

**Boyle's Law (`P₁ × V₁ = P₂ × V₂`)** establishes that the absolute pressure of a fixed gas mass is **inversely proportional** to its volume at constant temperature. First demonstrated by Robert Boyle in 1662 using a mercury manometer, halving a container's volume doubles wall-collision frequency and doubles internal pressure, while doubling volume cuts pressure in half.

Because `P × V` stays constant along an isotherm, Boyle's Law anchors pneumatic accumulator sizing, syringe dosing, vacuum systems, and diving air-reserve planning. Our [Boyle's Law Calculator](/en/calculators/boyles-law-calculator) isolates any missing pressure or volume across matched metric and US customary units.

## Mathematical Formulation and Parameter Definitions

Starting from the Ideal Gas Law (`PV = nRT`), holding both moles (`n`) and Kelvin temperature (`T`) constant reduces the right-hand side to a single constant `k`:

```text
Boyle's Law Identity:       P₁ × V₁ = P₂ × V₂ = k    (at constant n, T)
Solve Final Pressure:       P₂ = (P₁ × V₁) / V₂
Solve Final Volume:         V₂ = (P₁ × V₁) / P₂
Solve Initial Pressure:     P₁ = (P₂ × V₂) / V₁
Solve Initial Volume:       V₁ = (P₂ × V₂) / P₁
Isothermal Work (Joules):   W = P₁ × V₁ × ln(V₁ / V₂)   (compression: V₁ > V₂, W > 0)
Seawater Hydrostatic Head:  P_depth = P_surface + (depth_m / 10.0) atm
```

Two unit rules prevent almost all calculation mistakes:

- **`P₁`, `P₂` (Absolute Pressure):** Must be referenced to absolute zero vacuum (`psia`, `atm`, `bar`, `kPa`, `Torr`). Gauge readings (`psig`, `barg`) must be converted prior to multiplication via `P_abs = P_gauge + P_atm` (`+14.696 psi` or `+1.01325 bar` at sea level).
- **`V₁`, `V₂` (Gas Volume):** Any shared volume unit (`L`, `mL`, `m³`, `ft³`, `in³`). Notice that the product `1 L·atm` equals `101.325 J`, linking pressure-volume capacity directly to mechanical energy.

## Step-by-Step Worked Example: Scuba Cylinder Air Reserve at Depth

A diver carries a rigid `12.0 L` aluminum scuba cylinder charged to a gauge pressure of `200.0 bar` (`201.0 bar` absolute assuming `1.00 bar` sea-level atmospheric pressure) stabilized at `20 °C`. Calculate the total expanded breathing gas volume at a constant seawater depth of `30.0 m` (`20 °C`), determine the **usable** breathing volume before the tank reaches ambient equilibrium, and estimate dive duration at an actual lung consumption rate of `20.0 L/min`.

1. **Compute ambient absolute pressure at `30.0 m` depth:**
   - Every `10.0 m` of seawater adds `1.00 bar` of hydrostatic pressure (`ρgh ≈ 100 kPa` per `10 m`).
   - `P₂ = 1.00 bar (surface) + (30.0 m / 10.0 m/bar) = 4.00 bar` absolute.
2. **Apply Boyle's Law to find total gas volume expanded to `4.00 bar`:**
   - `V_total = (P₁ × V₁) / P₂ = (201.0 bar × 12.0 L) / 4.00 bar = 2,412.0 / 4.00 = 603.0 L`
3. **Subtract unrecoverable tank dead-space volume (`V_tank`):**
   - Once internal tank pressure drops to `4.00 bar`, zero pressure differential remains to push air through the regulator. Therefore, `12.0 L` of `4.00 bar` air remains trapped inside the cylinder:
   - `V_usable = 603.0 L − 12.0 L = 591.0 L`
4. **Estimate bottom time at `20.0 L/min` actual respiratory minute volume:**
   - `t_bottom = 591.0 L / 20.0 L/min = 29.55 min` (`~29 min 33 s` total theoretical supply—requiring standard safety reserves before ascent).

This worked check highlights why engineering gas-supply sizing must always subtract residual vessel volume (`V_tank`) when computing deliverable gas capacity.

## Isothermal Compression Profile: Pressure, Volume, and Energy Benchmark

The table below tracks `10.00 L` of dry air starting at `1.00 atm` (`101.325 kPa`) as it is compressed isothermally at `25 °C` (`P × V = 10.00 L·atm = 1,013.25 J`):

| Compression Stage | Absolute Pressure (`atm`) | Gas Volume (`L`) | `P × V` Product (`L·atm`) | Isothermal Work Input (`J`) | Remaining Volume (`%`) | Physical Benchmark |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1× (Baseline)** | `1.00` | `10.00` | `10.00` | `0.0` | `100.0%` | Sea-level ambient air |
| **2× Compression** | `2.00` | `5.00` | `10.00` | `702.3` | `50.0%` | 10 m seawater depth |
| **4× Compression** | `4.00` | `2.50` | `10.00` | `1,404.7` | `25.0%` | 30 m seawater depth |
| **5× Compression** | `5.00` | `2.00` | `10.00` | `1,630.8` | `20.0%` | Standard shop air line |
| **8× Compression** | `8.00` | `1.25` | `10.00` | `2,107.0` | `12.5%` | Industrial actuator supply |
| **10× Compression** | `10.00` | `1.00` | `10.00` | `2,333.1` | `10.0%` | Low-pressure ideal limit |

Notice the diminishing marginal volume reduction: doubling pressure from `1` to `2 atm` cuts volume by `5.00 L` for `702.3 J` of work, whereas climbing from `8` to `10 atm` removes only `0.25 L` while demanding `226.1 J`.

## Industrial Applications, Common Pitfalls, and Non-Ideal Limits

Boyle's Law governs fluid-power hardware and respiratory mechanics alike. Pulling a syringe plunger expands chamber volume and drops internal pressure below `1 atm`, allowing ambient air to push liquid into the barrel. In human breathing, diaphragm contraction expands thoracic volume by `~0.5 L`, creating a `-1` to `-2 Torr` drop that draws air into the lungs. Hydraulic bladder accumulators similarly store energy by compressing sealed nitrogen across predictable `P₁V₁ = P₂V₂` bounds.

Four pitfalls distort practical calculations:

- **Using gauge pressure directly:** Raising gauge pressure from `15 psig` to `30 psig` shifts absolute pressure from `29.7 psia` to `44.7 psia` (`1.50×`), cutting gas volume by `33%` rather than `50%`.
- **Ignoring adiabatic heating in fast strokes:** Rapid compression follows `P₁V₁^γ = P₂V₂^γ` (`γ = 1.40` for air) until heat dissipates; Boyle's Law underpredicts peak instantaneous pressure.
- **Applying gas laws to liquids:** Water and hydraulic oil compress negligibly (`~0.005%` per atm) and do not follow `P₁V₁ = P₂V₂`.
- **High-pressure compressibility departure:** Above `~20–50 atm` (`300–750 psig`), excluded molecular volume makes `PV` exceed `P₁V₁`, requiring compressibility correction (`P₁V₁/Z₁ = P₂V₂/Z₂`).
