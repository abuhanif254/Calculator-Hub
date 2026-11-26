---
title: "Electrical Current: The Flow of Electrons"
description: "Learn what electrical current is, how amperage is measured, DC vs. AC current equations, wire ampacity limits, and physiological shock thresholds."
category: "Math & Science"
relatedCalculator: "current-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "How many electrons flow per second in 1 Ampere of current?"
    answer: "One Ampere equals one Coulomb of electric charge passing a cross-section every second (1 C/s). Because a single electron carries 1.602 × 10⁻¹⁹ Coulombs of charge, 1 Ampere corresponds to approximately 6.2415 × 10¹⁸ (6.24 quintillion) electrons moving past a point each second."
  - question: "What is the difference between conventional current and physical electron flow?"
    answer: "Conventional current is defined as flowing from positive (+) to negative (−), a convention established by Benjamin Franklin before the electron was discovered. In metallic wires, negatively charged electrons actually drift from negative (−) to positive (+). Both conventions produce identical Ohm's Law and circuit calculations."
  - question: "Why does doubling the current produce four times as much heat in a wire?"
    answer: "Resistive heating follows Joule's Law: P_loss = I² × R. Because heat power scales with the square of current (I²), doubling amperage through the same wire resistance multiplies wasted heat by 2² = 4×, which is why undersized extension cords overheat rapidly under heavy appliance loads."
  - question: "How do you calculate battery runtime from Amp-hours (Ah) and current draw (A)?"
    answer: "Divide the battery's usable capacity in Amp-hours by the load's steady current draw in Amperes: Runtime (hours) = Capacity (Ah) / Current (A). A 100 Ah lithium battery powering a continuous 20 A load runs for roughly 5 hours (100 / 20), though lead-acid batteries lose usable capacity at high discharge rates due to Peukert's effect."
  - question: "Why does a clamp meter read zero when clamped around an entire power cord?"
    answer: "A standard two- or three-wire power cord carries equal current in opposite directions along the hot and neutral conductors. Their opposing magnetic fields cancel each other out inside the clamp jaws, yielding a net reading of 0 A. To measure load current, clamp around a single conductor only using a line splitter."
---

**Electrical current** measures the rate at which electric charge moves past a specific cross-section in a conductor, expressed in **Amperes (A)**—commonly shortened to **Amps** and denoted by the symbol **I** (from the French *intensité du courant*). One Ampere equals one Coulomb of charge passing per second (`1 C/s`), or approximately `6.2415 × 10¹⁸` elementary charges every second.

While voltage provides the electrical pressure across a circuit, current determines the physical engineering constraints of nearly every real installation: conductor wire gauge, fuse and breaker ratings, battery runtime, and human shock lethality. Use our [Current Calculator](/en/calculators/current-calculator) to solve for amperage immediately from voltage, resistance, or power.

## Core Current Equations and Charge Transport

Circuit current depends directly on the driving voltage and total opposition in the path, governed by charge conservation (`I = Q / t`) and Ohm's Law (`I = V / R`).

### Primary DC and AC Current Formulas

```text
I = Q / t       I = V / R       I = P / V       I = √(P / R)
```

For alternating-current (`AC`) loads containing motors, compressors, or power electronics, current also accounts for **Power Factor (`PF`)**, the ratio of real working power to apparent power:

- **Single-Phase AC Current:** `I = P / (V_rms × PF)`
- **Three-Phase AC Line Current:** `I = P / (√3 × V_L-L × PF)` (where `√3 ≈ 1.73205` and `V_L-L` is line-to-line voltage).

### Direct vs. Alternating Current and Drift Velocity

In **Direct Current (DC)**—supplied by batteries, solar panels, and USB chargers—charge flows continuously in a single direction. In **Alternating Current (AC)**—delivered by utility grids at `60 Hz` (North America) or `50 Hz` (Europe/Asia)—electrons oscillate back and forth `120` or `100` times per second without net forward travel. Even in a DC copper wire carrying `10 A`, individual electrons physically drift at roughly `0.25 mm/s` (slower than a snail), while the electromagnetic energy wave propagates along the circuit near the speed of light.

## Step-by-Step Worked Amperage Examples

### Example 1: Branch Circuit Breaker Sizing for a Water Heater

Suppose a `3,600 W` resistive electric water heater operates continuously on a `240 V` single-phase residential circuit (`PF = 1.0`). Determine its operating current and minimum circuit breaker size:

1. **Calculate steady operating current (`I = P / V`):**
   `I = 3,600 W / 240 V = 15.0 A`
2. **Apply the NEC 80% continuous load rule (125% sizing factor):**
   Because water heating is treated as a continuous load (`≥ 3 hours`), overcurrent protection must be sized to at least `125%` of load current:
   `I_breaker_min = 15.0 A × 1.25 = 18.75 A`
3. **Select standard breaker and wire gauge:**
   Round up to the next standard breaker size: a **`20 A` double-pole breaker** paired with **`12 AWG` copper conductors** (rated for `20 A` under NEC `60 °C` / `75 °C` residential terminations).

### Example 2: Three-Phase Industrial Motor Line Current

Suppose a `15 kW` (`15,000 W` shaft output) three-phase induction motor operates on a `480 V` line-to-line industrial supply with `91%` motor efficiency (`η = 0.91`) and `0.85` power factor:

1. **Convert mechanical shaft output to electrical input power:**
   `P_in = 15,000 W / 0.91 = 16,483.5 W`
2. **Compute three-phase line current:**
   `I_line = 16,483.5 W / (1.73205 × 480 V × 0.85) = 16,483.5 / 706.68 = 23.33 A`

Neglecting motor efficiency (`η`) or power factor (`PF`) would falsely yield `18.04 A`, undersizing the motor starter and feeder wires by nearly `23%`.

## Current Magnitude, Wire Ampacity, and Physiological Effects

| Current Level | Context or Threshold | Physiological / Engineering Impact | Typical Conductor or Protection |
| --- | --- | --- | --- |
| 1 mA (0.001 A) | Faint perception threshold | Barely perceptible skin tingle | PCB signal trace |
| 4 mA – 6 mA | North American GFCI trip band | Trips safety outlet in ~25 ms | Class A GFCI protection |
| 10 mA – 20 mA | Muscular "let-go" threshold | Painful shock; involuntary grip lock | Hazardous hand-to-hand path |
| 50 mA – 100 mA | Ventricular fibrillation zone | Potentially fatal cardiac arrest (>1 s) | Exceeds lethal body current limit |
| 2.4 A – 5.0 A | USB / USB-PD charging cable | 12 W to 240 W device charging | 20–24 AWG stranded copper |
| 15 A – 20 A | US residential wall outlet circuit | 1,800 W – 2,400 W peak (80% continuous) | 14 AWG (15 A) / 12 AWG (20 A) copper |
| 50 A | Residential electric range / EVSE | 12 kW at 240 V (9.6 kW continuous) | 6 AWG copper / 4 AWG aluminum |
| 200 A – 400 A | Automotive starter / main service | High torque cranking or whole-home main | 2/0 AWG – 400 kcmil heavy cable |

## Conductor Heating, Inrush Surge, and Measurement Pitfalls

### Joule Heating (`I²R`) and Ampacity Derating

Every conductor possesses small but nonzero resistance. Because resistive heat loss follows `P_heat = I² × R`, heat scales quadratically with current: pushing `20 A` instead of `10 A` through an undersized `16 AWG` extension cord creates **four times** more heat per foot, rapidly melting PVC insulation and igniting nearby materials. Real-world conductor ampacity tables (such as NEC Table 310.16) further require downward derating when ambient temperatures exceed `30 °C` (`86 °F`) or when more than three current-carrying conductors are bundled together inside the same conduit.

### Motor Inrush Current vs. Steady-State Running Current

Electric motors, compressors, and large switching power supplies draw **inrush current** (Locked Rotor Amps, or LRA) equal to `5×` to `8×` their steady Full-Load Amps (`FLA`) during the first `0.1` to `2 seconds` of startup. A `12 A` table saw may momentarily spike above `60 A` before spinning up. Circuit breakers use inverse-time thermal-magnetic trip curves specifically to tolerate brief startup spikes while tripping instantly on sustained overloads or short circuits.

### Safe Current Measurement Techniques

Unlike voltage—which is measured in parallel—direct multimeter current measurement requires **breaking the circuit and wiring the ammeter in series** so all current passes through the meter's internal shunt resistor and fuse. Failing to move the test leads back to the voltage jack afterward is the most common cause of blown multimeter fuses. For circuits above `10 A` or live panels where breaking the wire is unsafe, use a non-contact **clamp meter** around a single hot conductor (using a line splitter for standard cords) so opposing neutral currents do not cancel the magnetic field.
