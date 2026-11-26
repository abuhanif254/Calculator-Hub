---
title: "Ohm's Law Explained: The Foundation of Electronics"
description: "Master Ohm's Law (V = IR). Understand voltage, current, resistance, power dissipation, non-ohmic behavior, and worked circuit design examples."
category: "Math & Science"
relatedCalculator: "ohms-law-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "When does Ohm's Law NOT apply?"
    answer: "Ohm's Law applies only to linear, ohmic conductors whose resistance stays constant regardless of voltage or current at a given temperature. It does not directly govern non-ohmic components such as diodes, LEDs, transistors, varistors, or gas-discharge tubes, whose voltage-current curves are nonlinear."
  - question: "How does Ohm's Law work in AC circuits?"
    answer: "In alternating-current (AC) circuits containing inductors or capacitors, simple DC resistance (R) is replaced by total complex impedance (Z), measured in ohms. The RMS equation becomes V_rms = I_rms × Z, where Z combines resistance and frequency-dependent reactance."
  - question: "Why does resistor wattage rating matter if the resistance in Ohms is correct?"
    answer: "Every resistor converts electrical energy into heat at a rate of P = I² × R. If a circuit forces 0.5 W of heat through a 0.25 W (quarter-watt) resistor, the component will overheat, drift out of tolerance, char the PCB, or fail open even though its resistance value was mathematically correct."
  - question: "How do series and parallel resistors affect total resistance in V = IR?"
    answer: "Resistors in series add directly (R_total = R_1 + R_2 + ...), increasing total resistance and reducing circuit current. Resistors in parallel create multiple current paths, lowering total resistance according to 1/R_total = 1/R_1 + 1/R_2 + ..., so total resistance is always smaller than the smallest individual branch resistor."
  - question: "Does temperature change a wire's resistance?"
    answer: "Yes. Most metallic conductors have a positive temperature coefficient, meaning resistance increases as they heat up. Copper resistance rises by roughly 0.393% per degree Celsius above 20 °C, which is why high-current cables and incandescent filaments exhibit much lower resistance when cold than at operating temperature."
---

Formulated by German physicist Georg Simon Ohm in 1827, **Ohm's Law** defines the fundamental linear relationship between electrical pressure, charge flow, and opposition in a circuit: ``V = I × R``. When the resistance of a linear conductor remains constant, doubling the applied voltage doubles the current flowing through it, while doubling the resistance cuts that current in half.

Together with Joule's power law (`P = V × I`), this single principle underpins every circuit calculation from sizing microcontroller pull-up resistors to predicting short-circuit fault currents in building electrical panels. Use our [Ohm's Law Calculator](/en/calculators/ohms-law-calculator) to solve instantly for voltage, current, resistance, or power from any two known values.

## The Ohm's Law Equation and Power Wheel

Think of a DC circuit like a closed hydraulic loop: **Voltage (V)** acts as the pressure differential pushing charge, **Current (I)** is the volume flow rate of charge moving past a point per second, and **Resistance (R)** represents constriction inside the pipe that opposes flow and converts energy into heat.

### Three Core Algebraic Forms

```text
V = I × R       I = V / R       R = V / I
```

- **V (Voltage / Potential Difference):** Measured in **Volts (V)**, equal to joules per coulomb (`1 J/C`).
- **I (Current):** Measured in **Amperes (A)**, equal to coulombs per second (`1 C/s`).
- **R (Resistance):** Measured in **Ohms (Ω)**, equal to one volt per ampere (`1 V/A`).

### Combining Ohm's Law with Electrical Power

Because power dissipation equals `P = V × I`, substituting `V = I × R` or `I = V / R` produces the complete 12-equation Ohm's Law wheel used in practical component sizing:

- **Solve for Power (W):** `P = V × I` | `P = I² × R` | `P = V² / R`
- **Solve for Voltage (V):** `V = I × R` | `V = P / I` | `V = √(P × R)`
- **Solve for Current (A):** `I = V / R` | `I = P / V` | `I = √(P / R)`
- **Solve for Resistance (Ω):** `R = V / I` | `R = V² / P` | `R = P / I²`

At the microscopic material level, Ohm's Law reflects `J = σ × E` (current density equals conductivity times electric field), which holds strictly only when temperature and material structure remain stable.

## Step-by-Step Worked Circuit Design Examples

### Example 1: Sizing a Current-Limiting Resistor for an LED

Suppose you want to power a standard red indicator LED (`V_f = 2.0 V` forward voltage drop, target current `I = 15 mA = 0.015 A`) from a regulated `12.0 V` DC power rail. An LED is non-ohmic and would instantly burn out if wired directly across `12 V`, so a series resistor must absorb the excess voltage:

1. **Find the voltage dropped across the resistor:**
   `V_R = V_supply − V_f = 12.0 V − 2.0 V = 10.0 V`
2. **Calculate exact resistance using `R = V / I`:**
   `R = 10.0 V / 0.015 A = 666.67 Ω`
3. **Select the nearest safe standard E24 resistor value:**
   Choosing the next higher standard value, `680 Ω`, keeps current slightly under the target rather than overdriving the LED:
   `I_actual = 10.0 V / 680 Ω = 0.01471 A` (`14.71 mA`)
4. **Verify resistor thermal power rating:**
   `P_R = I_actual² × R = (0.01471 A)² × 680 Ω = 0.147 W`
   Engineering best practice applies at least a `2×` thermal derating factor (`0.147 W × 2 = 0.294 W`), so choose a `0.5 W` (`1/2 W`) resistor rather than pushing a `0.25 W` part near its thermal ceiling.

### Example 2: Analyzing a Short-Circuit Fault Surge

What happens if a wrench accidentally bridges the terminals of a `12.0 V` automotive lead-acid battery? Assume the battery's internal resistance plus cable and contact resistance totals just `0.020 Ω`:

1. **Calculate fault current:** `I_fault = 12.0 V / 0.020 Ω = 600 A`
2. **Calculate instantaneous heat generation:** `P = 600² × 0.020 = 7,200 W` (`7.2 kW`)

Delivering `7.2 kW` into a small metal contact spot melts steel, vaporizes insulation, and risks battery thermal runaway—demonstrating why fuses and circuit breakers must sit as close to the power source as possible.

## Circuit Behavior and Regime Comparison Table

| Circuit Scenario | Applied Voltage | Effective Resistance | Resulting Current | Power Dissipated | Behavioral Regime |
| --- | --- | --- | --- | --- | --- |
| Microcontroller GPIO Pull-Up | 3.3 V DC | 10,000 Ω (10 kΩ) | 0.33 mA (0.00033 A) | 1.09 mW | Linear ohmic logic biasing |
| 12 V Indicator LED + 680 Ω Resistor | 10.0 V across R | 680 Ω | 14.71 mA | 147 mW (in R) | Hybrid (non-ohmic LED + ohmic R) |
| 4–20 mA Industrial Sensor Loop | 24 V DC | 250 Ω sense resistor | 4 mA – 20 mA | 4 mW – 100 mW | Current-regulated telemetry |
| US 120 V Space Heater (High) | 120 V AC RMS | 9.6 Ω | 12.5 A | 1,500 W | Linear resistive heating |
| 60 W Incandescent Bulb (Cold vs. Hot) | 120 V AC RMS | ~17 Ω cold / 240 Ω hot | ~7 A inrush / 0.5 A steady | 60 W steady | Positive temperature coefficient (PTC) |
| Dead Short on 12 V Car Battery | 12.0 V DC | 0.020 Ω | 600 A | 7,200 W | Uncontrolled fault / arc hazard |

## Practical Caveats, AC Impedance, and Common Mistakes

### Non-Ohmic Components and Semiconductor Junctions

A common beginner mistake is dividing supply voltage directly by a diode or transistor's apparent resistance without accounting for barrier potential. Silicon diodes drop roughly `0.7 V`, Schottky diodes drop `0.2 V – 0.4 V`, and LEDs drop `1.8 V – 3.4 V` depending on semiconductor chemistry. Because current rises exponentially once forward voltage exceeds the knee threshold, always subtract `V_f` first before applying `R = V / I` to the series limiting element.

### Temperature Drift and AC Impedance

Resistance is not static under real thermal stress. The temperature dependence of a conductor follows `R(T) = R_0 × [1 + α × (T − T_0)]`, where copper has a temperature coefficient `α ≈ +0.00393 /°C`. Over a `50 °C` temperature rise inside a warm enclosure, a copper trace's resistance climbs nearly `20%`. Furthermore, in AC circuits carrying motors, transformers, or switching supplies, pure resistance `R` must be replaced by impedance `Z = √(R² + (X_L − X_C)²)` to account for inductive reactance (`X_L`) and capacitive reactance (`X_C`).

### Metric Prefix Conversion Errors

Mixing milliamps (`mA`), kilohms (`kΩ`), and volts (`V`) causes frequent order-of-magnitude errors. Always convert values to base SI units (`V`, `A`, `Ω`) before multiplying, or rely on exact prefix identities: `1 mA × 1 kΩ = 1 V` (because `10⁻³ × 10³ = 1`), whereas `1 mA × 1 Ω = 1 mV`. Verifying units at every intermediate step prevents `1,000×` errors in resistor selection and power dissipation estimates.
