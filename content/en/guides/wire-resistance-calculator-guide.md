---
title: "Wire Resistance: Why Cables Heat Up"
description: "Learn how conductor resistivity, wire gauge (AWG), length, and temperature govern electrical resistance, voltage drop, and Joule heating in power cables."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "wire-resistance-calculator"
relatedType: "calculator"
faqs:
  - question: "Why do thin or long extension cords get hot under heavy loads?"
    answer: "Electrical resistance rises directly with wire length and inversely with cross-sectional area (R = ρ × L / A). When high current (I) flows through a thin or long cord, power converts into heat via Joule heating according to P = I² × R—meaning doubling current quadruples heat generation inside the cable."
  - question: "Why does a smaller AWG number mean a thicker wire?"
    answer: "American Wire Gauge (AWG) originated from the number of drawing dies used to pull solid wire down to its final diameter. More drawing passes produced thinner wire, so 24 AWG is thin data cabling (0.205 mm²) while 4 AWG is heavy service feeder cable (21.15 mm²). Stepping down 3 gauge numbers doubles cross-sectional area and halves resistance."
  - question: "Must I double the cable distance when calculating DC or single-phase AC voltage drop?"
    answer: "Yes. Current flows from the source down the hot conductor and returns through the neutral or negative conductor, so total wire length equals twice the one-way run distance (L = 2 × D). Omitting the return conductor underestimates both circuit resistance and voltage drop by 50%."
  - question: "How does aluminum wiring compare to copper wiring of the same gauge?"
    answer: "Electrical-grade aluminum has a resistivity of 2.82 × 10⁻⁸ Ω·m versus 1.72 × 10⁻⁸ Ω·m for annealed copper—roughly 64% higher resistance for identical cross-sectional area. To match the resistance and ampacity of copper, aluminum conductors generally require stepping up two AWG sizes (for example, using 10 AWG aluminum instead of 12 AWG copper)."
  - question: "What is the maximum recommended voltage drop under NEC guidelines?"
    answer: "National Electrical Code (NEC) informational notes recommend limiting voltage drop to 3% on individual branch circuits and 5% total across feeder plus branch circuits combined. On a 120 V circuit, a 3% limit allows at most 3.6 V of cable loss at full rated load."
---

Every metallic conductor opposes electrical current to some degree, converting a fraction of transmitted electrical energy directly into thermal energy. That opposition—**wire resistance**—explains why undersized extension cords warm up during heavy tool use, why low-voltage solar arrays suffer steep power losses over long runs, and why electric vehicle chargers require thick copper conductors.

Three physical parameters set a wire's baseline resistance at room temperature: conductor material resistivity (`ρ`), total conductor length (`L`), and cross-sectional area (`A`), while operating temperature adds a positive linear multiplier. Because wasted heat scales with the square of current (`I² × R`), small resistance miscalculations quickly produce dangerous voltage sags or melted insulation. Use our [Wire Resistance Calculator](/en/calculators/wire-resistance-calculator) to compute exact ohms, voltage drop, and thermal dissipation across standard AWG sizes and metric cross-sections.

## Core Wire Resistance and Heating Equations

Pouillet's law establishes DC resistance from geometry and material properties, while thermal and power equations quantify operating losses:

```text
DC Resistance (20 °C):   R₂₀ = ρ × L / A
Temperature Correction:  R_T = R₂₀ × [1 + α × (T − 20 °C)]
Single-Phase Loop Drop:  V_drop = I × R_T   (using L = 2 × one-way distance)
Three-Phase Line Drop:   V_drop = √3 × I × R_one_way
Joule Heating Loss:      P_loss = I² × R_T = V_drop × I
AWG Diameter Formula:    d_mm = 0.127 × 92^((36 − AWG) / 39)
```

* **`R` (Resistance, Ω):** Total electrical opposition in ohms along the specified conductor length.
* **`ρ` (Material Resistivity, Ω·m at `20 °C`):** Intrinsic constant (`1.724 × 10⁻⁸ Ω·m` for 100% IACS annealed copper; `2.82 × 10⁻⁸ Ω·m` for EC aluminum; `1.59 × 10⁻⁸ Ω·m` for silver; `2.44 × 10⁻⁸ Ω·m` for gold).
* **`L` (Total Conductor Length, m or ft):** Full current path length (`2 × D` for two-wire single-phase AC or DC circuits).
* **`A` (Cross-Sectional Area, m² or mm²):** Conductive metal area (`1 mm² = 10⁻⁶ m²`), excluding plastic insulation thickness.
* **`α` (Temperature Coefficient, /°C):** Fractional resistance rise per degree Celsius (`0.00393 /°C` for copper; `0.00403 /°C` for aluminum).

### Understanding American Wire Gauge (AWG) Scaling

AWG is logarithmic rather than linear: every `3` gauge steps doubles cross-sectional area (`2×`) and halves resistance, while every `6` gauge steps doubles wire diameter (`2×`) and quarters resistance (`1/4×`). Consequently, `10 AWG` copper carries twice the cross-section and half the resistance of `13 AWG` (or nearly `2.5×` the area of `14 AWG`).

## Step-by-Step Worked Example: 100-Foot Power Tool Circuit

Suppose a contractor runs a `15.0 A`, `120 V` radial saw through a `100 ft` (`30.48 m`) `14 AWG` annealed copper extension cord (`A = 2.08 mm² = 2.08 × 10⁻⁶ m²`, `ρ = 1.724 × 10⁻⁸ Ω·m`), and steady current warms the copper core to `45 °C`.

1. **Determine round-trip conductor length:** `L = 2 × 30.48 m = 60.96 m` (`200 ft` hot plus neutral).
2. **Compute `20 °C` loop resistance:**
   `R₂₀ = (1.724 × 10⁻⁸ Ω·m × 60.96 m) / (2.08 × 10⁻⁶ m²) = 0.5053 Ω`.
3. **Adjust for `45 °C` conductor temperature:**
   `R₄₅ = 0.5053 × [1 + 0.00393 × (45 − 20)] = 0.5053 × 1.09825 = 0.555 Ω`.
4. **Calculate voltage drop and thermal loss:**
   `V_drop = 15.0 A × 0.555 Ω = 8.32 V` (`6.94%` drop on `120 V`), leaving only `111.7 V` at the saw.
   `P_loss = (15.0 A)² × 0.555 Ω = 124.9 W` dissipated as continuous cable heat.
5. **Evaluate upgrading to `10 AWG` (`5.26 mm²`):** Substituting `5.26 mm²` cuts `R₄₅` to `0.219 Ω`, reducing voltage drop to `3.29 V` (`2.74%`, meeting NEC's `3%` guideline) and lowering wasted heat by `60.5%` to `49.3 W`.

## Standard Copper Wire Gauge Benchmarks (`20 °C`)

The reference table lists solid/standard annealed copper properties (`100% IACS`, `1.724 × 10⁻⁸ Ω·m` at `20 °C`) across common residential, data, and power gauges.

| Wire Gauge (AWG) | Diameter (mm) | Area (mm²) | Resistance per 1,000 m (Ω/km) | Resistance per 1,000 ft (Ω/kft) | Typical Engineering & Building Uses |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 24 AWG | 0.511 mm | 0.205 mm² | 84.1 Ω/km | 25.6 Ω/kft | Cat5e/Cat6 Ethernet, USB data lines |
| 18 AWG | 1.024 mm | 0.823 mm² | 20.9 Ω/km | 6.39 Ω/kft | Thermostat control, LED lighting feeds |
| 14 AWG | 1.628 mm | 2.08 mm² | 8.29 Ω/km | 2.53 Ω/kft | 15 A residential lighting and receptacles |
| 12 AWG | 2.053 mm | 3.31 mm² | 5.21 Ω/km | 1.59 Ω/kft | 20 A kitchen, bathroom, and shop circuits |
| 10 AWG | 2.588 mm | 5.26 mm² | 3.28 Ω/km | 1.00 Ω/kft | 30 A dryers, water heaters, long runs |
| 6 AWG | 4.115 mm | 13.30 mm² | 1.30 Ω/km | 0.395 Ω/kft | 50–60 A EV chargers and subpanels |
| 4 AWG | 5.189 mm | 21.15 mm² | 0.815 Ω/km | 0.248 Ω/kft | 70–85 A feeders, solar battery banks |

## Applications, Common Errors, and Safety Caveats

Wire resistance calculations protect off-grid solar installations, data-center DC busbars, automotive starter harnesses, and residential branch circuits from excessive voltage sag and insulation degradation. NEC Article 210 and 215 informational notes recommend keeping branch-circuit voltage drop at or below `3%` (and `5%` total including feeders) to preserve motor torque and lighting efficiency.

Avoid four critical mistakes when sizing conductors:

* **Forgetting the return path (`2 × D`):** Calculating resistance from one-way distance cuts true loop resistance in half on DC and single-phase AC runs, masking dangerous voltage drops.
* **Ignoring coiled-cable thermal runaway:** Because copper's resistance rises `~0.39%` per `°C`, leaving a loaded extension cord tightly wound on a reel traps heat, raising `R`, which increases `I² × R` heating further until PVC insulation melts. Always uncoil power reels under high load.
* **Confusing geometric resistance with code ampacity:** A wire that satisfies a `3%` voltage-drop target over a short `10 ft` run can still exceed NEC Table `310.16` ampacity limits based on insulation temperature ratings (`60 °C`, `75 °C`, or `90 °C`).
* **Overlooking AC skin effect and reactance:** Above `2/0 AWG` at `60 Hz` or in high-frequency RF and switching circuits, current crowds toward the conductor surface (skin effect) and inductive reactance increases effective AC impedance beyond pure DC resistance.
