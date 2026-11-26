---
title: "Electrical Resistance: Controlling the Flow"
description: "Understand Ohm's Law, material resistivity, series and parallel resistor networks, and how to size current-limiting resistors with our Resistance Calculator."
category: "Math & Science"
relatedCalculator: "resistance-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is electrical resistance and how is it measured?"
    answer: "Electrical resistance quantifies how strongly a material or circuit element opposes the steady flow of electric current. It is measured in Ohms (Ω), where 1 Ω allows exactly 1 Ampere of current to flow when 1 Volt of electrical potential is applied across its terminals."
  - question: "Why does an LED burn out immediately without a series resistor?"
    answer: "Light-emitting diodes are non-linear semiconductor junctions whose internal dynamic resistance collapses once forward voltage exceeds their threshold (typically 1.8 V to 3.3 V). Connecting a bare LED directly to a 9 V battery causes virtually unconstrained current surge, overheating and destroying the junction within milliseconds."
  - question: "How do temperature changes affect conductor and resistor values?"
    answer: "Pure metals such as copper and aluminum have positive temperature coefficients (around +0.39% to +0.43% per °C), meaning their resistance rises as they heat up. By contrast, carbon-composition resistors and NTC thermistors have negative coefficients, while precision metal-film resistors are engineered for near-zero thermal drift."
  - question: "What is the difference between connecting resistors in series versus parallel?"
    answer: "Resistors in series carry identical current and add directly (R_total = R₁ + R₂), increasing total resistance and dividing voltage. Resistors in parallel share identical voltage and reduce total resistance below the smallest individual branch (1/R_total = 1/R₁ + 1/R₂), dividing current and sharing heat dissipation."
  - question: "Why must you check a resistor's wattage rating in addition to its Ohm value?"
    answer: "Every resistor converts electrical energy into heat at a rate of P = I² × R = V² / R. Exceeding the component's rated power (commonly 0.25 W or 0.5 W for through-hole parts) causes thermal runaway, permanent resistance drift, charred PCB laminates, or open-circuit failure."
---

Electrical resistance is the fundamental physical property that governs how much electric current flows through a circuit for a given applied voltage. Expressed in Ohms (`Ω`) and defined by Ohm's Law (`R = V / I`), resistance turns raw electrical potential into controlled, predictable current—protecting delicate semiconductors from overcurrent, dividing reference voltages, and dissipating precise amounts of thermal energy.

Whether you are protecting an LED from a 9-volt battery, sizing a shunt resistor for current sensing, or evaluating conductor losses in power wiring, accurate resistance calculations prevent component destruction and thermal failure. You can solve directly for resistance, voltage, or current using our [Resistance Calculator](/en/calculators/resistance-calculator) alongside the engineering formulas and benchmarks below.

## Core Methodology: Ohm's Law, Geometry, and Networks

At constant temperature, linear ("ohmic") conductors obey **Ohm's Law**, which links resistance (`R` in Ohms, `Ω`), voltage (`V` in Volts, `V`), and current (`I` in Amperes, `A`):

```text
R = V / I
V = I × R
I = V / R
```

For physical wires and PCB traces, resistance is determined by **Pouillet's Law**, which relates bulk material resistivity (`ρ` in `Ω·m`), conductor length (`L` in `m`), and uniform cross-sectional area (`A` in `m²`):

```text
R = ρ × (L / A)
```

Doubling a wire's length doubles its resistance, whereas doubling its cross-sectional area cuts resistance in half. Because atomic lattice vibrations scatter drifting electrons more frequently as temperature rises, metallic resistance also shifts linearly across moderate operating ranges:

```text
R(T) = R₀ × [1 + α × (T − T₀)]
```

Here, `R₀` is the reference resistance at `T₀` (conventionally `20 °C`), and `α` is the material's temperature coefficient of resistance (`0.00393 /°C` for annealed copper).

### Series and Parallel Resistor Combinations

Discrete circuits rarely rely on a single ideal resistor. Combining multiple components alters both equivalent resistance and power-handling capacity:

- **Series Network:** Current flows sequentially through every element, so resistances add directly: `R_total = R₁ + R₂ + ... + R_n`. Total resistance always exceeds the largest individual resistor.
- **Parallel Network:** Each branch sees the full supply voltage, so conductances add: `1 / R_total = (1 / R₁) + (1 / R₂) + ... + (1 / R_n)`. For two resistors, `R_total = (R₁ × R₂) / (R₁ + R₂)`. Total resistance is always lower than the smallest branch resistor.

## Step-by-Step Worked Example: Sizing an LED Current-Limiting Resistor

Suppose you need to power a standard 5 mm red indicator LED from a regulated `9.0 V` DC supply. The LED datasheet specifies a typical forward voltage drop `V_f = 2.0 V` and a maximum continuous forward current `I_f = 20 mA` (`0.020 A`).

1. **Find the Voltage Drop Across the Resistor (`V_R`):** Subtract the LED's forward voltage from the supply voltage:
   `V_R = V_supply − V_f = 9.0 V − 2.0 V = 7.0 V`
2. **Calculate Ideal Resistance via Ohm's Law:** Divide `V_R` by the target current in Amperes:
   `R_ideal = 7.0 V / 0.020 A = 350 Ω`
3. **Select a Standard E24 Commercial Value:** Standard `±5%` E24 resistor values bracketing `350 Ω` are `330 Ω` and `360 Ω`. Choosing `360 Ω` keeps current safely below the `20 mA` limit:
   `I_actual = 7.0 V / 360 Ω = 0.01944 A (19.44 mA)`
   *(By contrast, `330 Ω` yields `7.0 / 330 = 21.21 mA`, exceeding the absolute continuous rating.)*
4. **Verify Thermal Power Dissipation:** Calculate heat generated in the resistor:
   `P_R = V_R × I_actual = 7.0 V × 0.01944 A = 0.136 W` (equivalently, `I² × R = 0.01944² × 360 = 0.136 W`).
   A standard `0.25 W` (`1/4 W`) axial resistor handles `0.136 W` at `54.4%` of its nominal ceiling, though engineers applying a conservative `2×` thermal derating factor (`0.136 W × 2 = 0.272 W`) in unventilated enclosures step up to a `0.5 W` part.

## Material Resistivity and Component Benchmarks

The contrast between a conductor and an insulator spans more than 20 orders of magnitude in resistivity (`ρ`), explaining why copper carries power while PTFE or borosilicate glass isolates high voltages.

| Material / Component | Resistivity at 20 °C (Ω·m) | Temp. Coefficient α (/°C) | Typical Electrical Role | Key Engineering Trade-Off |
| :--- | :--- | :--- | :--- | :--- |
| **Silver (Ag)** | `1.59 × 10⁻⁸` | `+0.00380` | RF cavities, relay contacts | Lowest metallic resistivity; oxidizes/tarnishes in sulfur air |
| **Annealed Copper (Cu)** | `1.68 × 10⁻⁸` | `+0.00393` | Branch wiring, PCB traces, windings | Global `100% IACS` benchmark; heavier and costlier than aluminum |
| **Aluminum (Al)** | `2.82 × 10⁻⁸` | `+0.00429` | Utility transmission, heavy feeders | ~61% of copper conductivity at ~30% density; requires larger AWG |
| **Nichrome (NiCr 80/20)** | `1.10 × 10⁻⁶` | `+0.00040` | Heating coils, wire-wound resistors | High resistivity and low thermal drift keep wattage stable |
| **Carbon Film (Discrete)** | `~3.50 × 10⁻⁵` | `−0.00050` | General-purpose `±5%` resistors | Economical; higher current noise than metal-film parts |
| **PTFE / Borosilicate Glass** | `10¹² to 10¹⁸` | `N/A (Insulator)` | High-voltage standoffs, cable jackets | Fails via dielectric breakdown (`kV/mm`), not ohmic heating |

## Practical Applications, Common Pitfalls, and Precision Caveats

In real hardware design, resistance is rarely static or ideal. Avoiding four recurring field errors keeps circuits reliable:

- **Non-Linear Loads:** Incandescent filaments, diodes, DC motors, and thermistors exhibit dynamic resistance that shifts with voltage or self-heating. A cold tungsten lamp draws `8×` to `12×` steady-state current at turn-on.
- **Thermal Power Derating:** Under `IEC 60115`, resistors carry full wattage ratings at `70 °C` ambient and derate linearly toward zero by `125 °C–155 °C`. Inside a `95 °C` enclosure, a `0.25 W` part may safely handle under `0.15 W`.
- **Voltage Ceilings and Tolerance Stack-Up:** Surface-mount `0402` or `0603` resistors have `50 V–75 V` working limits regardless of Ohm value, and precision dividers need `E96` (`±1%` or `±0.1%`) metal-film parts.
- **Contact Resistance in Low-Ohmic Tests:** Two-wire multimeters add `0.1 Ω–0.5 Ω` of lead and probe resistance. Characterizing milliohm shunts or motor windings accurately requires four-wire Kelvin (`4W`) sensing.
