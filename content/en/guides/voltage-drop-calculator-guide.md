---
title: "Voltage Drop: Why Long Wires Lose Power"
description: "Calculate NEC-compliant conductor voltage drop across single-phase and three-phase circuits using wire gauge (AWG), resistivity, distance, and load current."
category: "Math & Science"
relatedCalculator: "voltage-drop-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the maximum acceptable voltage drop under NEC guidelines?"
    answer: "NEC Informational Notes 210.19(A) and 215.2(A)(1) recommend limiting voltage drop to 3% on any single branch circuit or feeder, and 5% combined from the service panel to the furthest outlet. For a 120 V branch circuit, 3% equals 3.6 V (delivering at least 116.4 V)."
  - question: "Why do you multiply wire length by 2 in single-phase voltage drop formulas?"
    answer: "In DC and single-phase AC circuits, current travels out to the load along the hot (or positive) conductor and returns along the neutral (or negative) conductor. Total resistive path length is therefore twice the one-way distance between panel and equipment."
  - question: "What happens to a motor or power tool when voltage drops too far?"
    answer: "Induction and universal motors attempt to maintain mechanical torque by drawing higher current as supply voltage sags. Under-voltage increases motor winding temperature (I² × R heating), slows startup acceleration, trips thermal overloads, and risks permanent insulation damage."
  - question: "How much larger must aluminum wire be compared to copper for the same voltage drop?"
    answer: "Electrical-grade aluminum has roughly 61% the conductivity of copper (resistivity 1.64× higher). To match the voltage drop of copper over identical distance and load, installers typically upsize by two American Wire Gauge (AWG) steps—for example, using 4 AWG aluminum in place of 6 AWG copper."
  - question: "Why is voltage drop far more critical in 12 V DC solar and RV wiring than in 120 V AC?"
    answer: "Percentage drop scales inversely with system voltage. Losing 1.2 V along a cable is only a 1% drop on a 120 V AC circuit, but on a 12 V battery bank it represents a 10% voltage collapse—enough to trigger low-voltage inverter shutdowns and prevent refrigerators from starting."
---

No practical conductor has zero resistance. Every foot of copper or aluminum wire introduces finite electrical impedance (`R`) that converts a portion of electrical pressure into waste heat as current flows, lowering the voltage available at the far end of the run—a phenomenon known as **voltage drop** (`V_drop`).

Over short interior runs, voltage drop is negligible. Over long outdoor trench runs, subpanel feeders, or low-voltage DC solar arrays, excessive drop dims lighting, triggers electronics brownouts, and forces motors to overheat while pulling compensatory current. You can evaluate conductor gauge, material, distance, and load current immediately with our [Voltage Drop Calculator](/en/calculators/voltage-drop-calculator).

## Core Equations: Single-Phase, Three-Phase, and AWG Geometry

In DC and single-phase AC branch circuits (`12–14 AWG` through `6 AWG`, where inductive reactance is minor), voltage drop is governed by Ohm's Law (`V_drop = I × R_loop`) across the full out-and-back conductor path (`2 × L`):

```text
V_drop (1φ / DC) = (2 × K × I × L_ft) / CM
V_drop (3φ AC)   = (1.732 × K × I × L_ft) / CM
%V_drop          = (V_drop / V_source) × 100%
```

Here, `I` is load current (`A`), `L_ft` is **one-way** run distance (`ft`), `CM` is the conductor's cross-sectional area in **circular mils**, and `K` is the material's specific resistance (`Ω·CM/ft`) at the operating temperature (`75 °C` standard rating):

- **Copper (`Cu`) at 75 °C:** `K ≈ 12.9 Ω·CM/ft` (`ρ = 1.68 × 10⁻⁸ Ω·m` at `20 °C`)
- **Aluminum (`Al`) at 75 °C:** `K ≈ 21.2 Ω·CM/ft` (`ρ = 2.82 × 10⁻⁸ Ω·m` at `20 °C`)

In balanced **three-phase AC** circuits, the round-trip factor of `2` is replaced by `√3` (`1.732`), reflecting `120°` phase symmetry across the three line conductors.

## Step-by-Step Worked Example: 150-Foot Detached Workshop Run

Suppose you are wiring a `120 V`, `15 A` branch circuit to a detached workshop `L = 150 ft` one-way from the main breaker panel using `75 °C`-rated copper (`K = 12.9`). Although `14 AWG` or `12 AWG` copper meets ampacity limits for `15 A`, let us check voltage drop against the NEC `3%` (`3.60 V`) branch guideline:

1. **Test `12 AWG` Copper (`6,530 CM`):**
   `V_drop = (2 × 12.9 × 15 A × 150 ft) / 6,530 CM = 58,050 / 6,530 = 8.89 V`
   `%V_drop = (8.89 V / 120 V) × 100% = 7.41%` — Fails (`111.11 V` delivered; more than double the `3%` target).
2. **Test `10 AWG` Copper (`10,380 CM`):**
   `V_drop = 58,050 / 10,380 = 5.59 V`
   `%V_drop = (5.59 V / 120 V) × 100% = 4.66%` — Still exceeds `3.0%` (`114.41 V` delivered).
3. **Test `8 AWG` Copper (`16,510 CM`):**
   `V_drop = 58,050 / 16,510 = 3.52 V`
   `%V_drop = (3.52 V / 120 V) × 100% = 2.93%` — Passes (`116.48 V` delivered, comfortably inside `3.0%`).
4. **Evaluate Doubling Voltage to `240 V` (`1,800 W` at `7.5 A`) on `12 AWG`:**
   `V_drop = (2 × 12.9 × 7.5 A × 150 ft) / 6,530 CM = 29,025 / 6,530 = 4.44 V`
   `%V_drop = (4.44 V / 240 V) × 100% = 1.85%`
   Switching to `240 V` halves current and doubles the reference voltage, reducing **percentage voltage drop by `4×`** (`7.41%` down to `1.85%`) using thinner `12 AWG` wire.

## Copper AWG Voltage Drop Benchmarks (15 A, 120 V Single-Phase, 75 °C)

Each decrease of three AWG numbers roughly doubles conductor cross-sectional area (`CM`) and halves DC resistance. The benchmarks below use `K = 12.9 Ω·CM/ft` for a `15 A` load at `120 V`.

| Wire Gauge (AWG) | Cross-Section (CM / mm²) | Max 3% Run (ft, 15 A @ 120 V) | Drop at 100 ft (V) | Drop % at 100 ft | Common Wiring Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **14 AWG** | `4,110 CM (2.08 mm²)` | `38.2 ft` | `9.42 V` | `7.85%` | Short interior `15 A` lighting circuits |
| **12 AWG** | `6,530 CM (3.31 mm²)` | `60.7 ft` | `5.93 V` | `4.94%` | Standard `20 A` interior receptacles |
| **10 AWG** | `10,380 CM (5.26 mm²)` | `96.6 ft` | `3.73 V` | `3.11%` | Medium outdoor runs, `30 A` dryers |
| **8 AWG** | `16,510 CM (8.37 mm²)` | `153.6 ft` | `2.34 V` | `1.95%` | Long `120 V` shed circuits, `40 A` ranges |
| **6 AWG** | `26,240 CM (13.30 mm²)` | `244.1 ft` | `1.47 V` | `1.23%` | Detached garage subpanels, EVSE lines |
| **4 AWG** | `41,740 CM (21.15 mm²)` | `388.3 ft` | `0.93 V` | `0.77%` | Long-distance `100 A` service feeders |

## Regulatory Thresholds, AC Impedance, and Design Pitfalls

To keep installations safe, code-compliant, and reliable under full load, verify four critical field constraints before pulling wire:

- **NEC Guidelines vs. Mandatory Limits:** Under `NEC 210.19(A)` Informational Note No. 4 and `215.2(A)(1)`, the `3%` branch / `5%` combined drop limits are engineering recommendations—except where local codes enforce them or specific articles apply (such as fire pumps under `NEC 695.7`, capped at `15%` starting drop).
- **AC Reactance in Heavy Feeders (`> 2 AWG`):** Below `4 AWG`, DC resistance dominates. Above `2 AWG` in AC feeders, inductive reactance (`X_L`, higher in steel conduit than PVC) raises total impedance (`Z = R × cos φ + X_L × sin φ`); verify large runs against NEC Chapter 9 Table 9.
- **Terminal Lugs After Upsizing:** Oversized `8 AWG` or `6 AWG` conductors pulled for voltage drop may not fit `15 A`/`20 A` breaker or receptacle lugs. Transition via listed splices inside a junction box to short `12 AWG` pigtails, and upsize the equipment ground per `NEC 250.122(B)`.
- **Low-Voltage DC and Extension Cord Traps:** Stringing `200 ft` of `16 AWG` (`2,580 CM`) extension cord for a `12 A` saw drops `(2 × 12.9 × 12 × 200) / 2,580 = 24.0 V` (`20%`), starving the motor at `96 V` and melting plugs. Similarly, `12 V–24 V` off-grid solar circuits demand heavy `6–2/0 AWG` cable.
