---
title: "Understanding Voltage: The Pressure of Electricity"
description: "Learn what voltage really is, how electric potential difference works, DC vs. AC RMS voltage, wire voltage drop, and loaded battery sag."
category: "Math & Science"
relatedCalculator: "voltage-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Why is voltage always measured between two points?"
    answer: "Voltage is a potential difference, not an absolute property at a single point. Measuring 12 V means one point has 12 joules per coulomb more electrical potential energy than the chosen reference point (often ground or the negative battery terminal). Without a reference point, a single wire's voltage is undefined."
  - question: "What is the difference between RMS voltage and peak voltage in AC power?"
    answer: "A standard US 120 V wall outlet supplies 120 V RMS (Root Mean Square), which delivers the same heating power as 120 V DC. Because household AC oscillates as a sine wave, its actual peak amplitude reaches 120 × √2 ≈ 169.7 V (+169.7 V to −169.7 V, or 339.4 V peak-to-peak)."
  - question: "Why does a battery's terminal voltage drop when a heavy load turns on?"
    answer: "Every battery has internal chemical and conductor resistance (r_int). When current (I) flows, part of the cell's open-circuit electromotive force (E) is lost internally according to V_terminal = E − (I × r_int). Heavy loads like starter motors draw hundreds of amps, causing noticeable voltage sag."
  - question: "Why do utility power lines transmit electricity at hundreds of thousands of volts?"
    answer: "Power equals voltage times current (P = V × I), while resistive line heat losses scale with the square of current (P_loss = I² × R). Stepping transmission voltage up to 230 kV or 500 kV lets utilities deliver the same megawatts using dramatically lower current, slashing I²R heat loss across long distances."
  - question: "At what voltage level does electricity become dangerous to humans?"
    answer: "Safety standards such as OSHA and IEC 60479 treat voltages above 50 V AC or 120 V DC in dry conditions (and lower in wet environments) as hazardous touch potentials. Once voltage exceeds skin breakdown resistance, it can push lethal current (>50 mA) across the chest, whereas static shocks at 15,000 V carry too little total energy to sustain current."
---

**Voltage**—formally defined as **electric potential difference**—measures how much potential energy exists to move electric charge between two points in a circuit. One **Volt (V)** equals one joule of energy available per coulomb of electric charge (`1 V = 1 J/C`). Just as water pressure in a pressurized pipe determines how forcefully water can move when a valve opens, voltage provides the electrical driving force that pushes electrons through a conductive load.

Crucially, voltage can exist even when zero current flows—such as across the terminals of an unplugged `9 V` battery—because potential difference is stored readiness to do work. When current (`I`) flows through a resistance (`R`), Ohm's Law determines the exact voltage drop across that element (`V = I × R`). Use our [Voltage Calculator](/en/calculators/voltage-calculator) to compute voltage from current, resistance, or power in seconds.

## Potential Difference, EMF, and Core Voltage Equations

Because voltage always compares two electrical states (`ΔV = V_B − V_A`), engineers define one node as `0 V` reference ("ground" or common return) and express every other node relative to it.

### Fundamental Formulas

```text
V = W / Q       V = I × R       V = P / I       V = √(P × R)
```

- **V:** Electric potential difference in **Volts (V)**.
- **W:** Work or energy transferred in **Joules (J)**.
- **Q:** Electric charge in **Coulombs (C)**.
- **I:** Current in **Amperes (A)**.
- **R:** Resistance in **Ohms (Ω)**, or impedance `Z` in AC circuits.
- **P:** Electrical power in **Watts (W)**.

### Open-Circuit EMF vs. Loaded Terminal Voltage

An ideal voltage source maintains constant voltage at any current, whereas real batteries and power supplies possess internal resistance (`r_int`). Open-circuit voltage equals the chemical **Electromotive Force (EMF, `E`)**, while loaded terminal voltage sags proportionally to current draw:

```text
V_terminal = E − (I × r_int)
```

### DC vs. AC RMS and Peak Voltage

Direct current (`DC`) maintains constant polarity over time. Alternating current (`AC`) reverses polarity sinusoidally (60 Hz in North America, 50 Hz in Europe). Household ratings state **RMS (Root Mean Square)** voltage, representing the equivalent DC heating value. For a pure sine wave:

```text
V_peak = V_rms × √2 ≈ V_rms × 1.4142
```

A `120 V RMS` US outlet peaks at `±169.7 V` (`339.4 V` peak-to-peak), while a `230 V RMS` European outlet peaks at `±325.3 V`.

## Step-by-Step Worked Voltage Calculations

### Example 1: Calculating Wire Voltage Drop on a Long Cable Run

Suppose a `120 V` workshop compressor draws `16.0 A` at the end of a `120 ft` branch circuit wired with `12 AWG` copper (`1.588 Ω` per `1,000 ft` at `20 °C`). Because current travels out through the hot conductor and returns through the neutral conductor, the total wire path length is `2 × 120 ft = 240 ft`:

1. **Compute total round-trip conductor resistance:**
   `R_wire = (240 ft / 1,000 ft) × 1.588 Ω = 0.3811 Ω`
2. **Calculate voltage drop along the cable (`V = I × R`):**
   `V_drop = 16.0 A × 0.3811 Ω = 6.10 V`
3. **Evaluate percentage voltage drop:**
   `% Drop = (6.10 V / 120 V) × 100 = 5.08%`
4. **Find voltage actually delivered to the compressor:**
   `V_load = 120.0 V − 6.10 V = 113.90 V`

Because the National Electrical Code (NEC) recommends keeping branch-circuit voltage drop at or below `3%` (`3.6 V` on a `120 V` line), a `5.08%` drop wastes `97.6 W` heating the wire and can stall the compressor motor under startup torque. Upgrading to `10 AWG` copper (`0.999 Ω/1,000 ft`) cuts the drop to `3.84 V` (`3.20%`), or `8 AWG` reduces it safely below `3%`.

### Example 2: Battery Terminal Sag Under Cranking Load

A healthy `12 V` automotive AGM battery sits at `12.6 V` open-circuit (`E`) and has an internal resistance of `0.012 Ω` (`12 mΩ`). While cranking an engine starter motor drawing `250 A`:

1. **Internal voltage loss:** `V_int = 250 A × 0.012 Ω = 3.0 V`
2. **Terminal voltage under load:** `V_terminal = 12.6 V − 3.0 V = 9.6 V`

As a battery ages and sulfates, `r_int` climbs (e.g., to `0.030 Ω`), pulling terminal voltage down to `5.1 V` under the same load and preventing ignition.

## Standard Voltage Systems and Reference Levels

| System or Application | Nominal Voltage | Peak / Tolerance Range | Engineering Rationale & Caveats |
| --- | --- | --- | --- |
| Modern Microcontroller / SoC Logic | 1.8 V / 3.3 V DC | ±5% strict regulation | Minimizes dynamic switching heat (`P ∝ C·V²·f`) |
| USB Standard & USB-PD Rev 3.1 | 5 V – 48 V DC | Negotiated up to 240 W (5 A) | Higher voltage reduces cable `I²R` losses |
| Automotive 12 V Nominal System | 12.6 V resting / 14.4 V charging | 9.5 V – 14.8 V DC | Heavy current needed for cranking & accessories |
| North American Residential Split-Phase | 120 V / 240 V AC RMS | ±5% (114 V – 126 V); 170 V peak | 60 Hz; 240 V feeds HVAC, ranges, EVSE |
| European / UK / Asian Residential | 230 V AC RMS | ±10% (207 V – 253 V); 325 V peak | 50 Hz; halves current for equivalent power |
| Electric Vehicle Traction Battery | 400 V – 800 V DC | Up to ~920 V charged | Enables >250 kW fast charging with lighter copper cables |
| Utility Transmission Grid | 115 kV – 500 kV AC | Step-down via substations | Minimizes regional `I²R` transmission losses |

## Measurement Best Practices, Safety Thresholds, and Pitfalls

### Parallel Connection and True-RMS Meters

A voltmeter must always be connected **in parallel** across two points so its high internal input impedance (`10 MΩ` or higher on digital multimeters) draws negligible current and avoids altering circuit behavior. Connecting an ammeter in parallel instead creates a direct short circuit that blows the meter fuse. Additionally, standard average-responding multimeters accurately measure only pure sine waves; variable-frequency drives (VFDs), LED dimmers, and modified-sine inverters require a **True-RMS** meter to read distorted AC waveforms accurately.

### The "Volts vs. Amps" Safety Distinction

High voltage alone does not guarantee lethal injury—electrostatic discharge from walking across carpet can exceed `20,000 V`, yet transfers only microjoules of energy over nanoseconds without sustaining harmful current. Conversely, **sufficient voltage is required to break down skin resistance** so dangerous current can flow. Dry intact human skin exhibits roughly `10,000 Ω` to `100,000 Ω` of resistance, whereas wet or broken skin drops closer to `500 Ω – 1,000 Ω`. Under wet conditions, even `50 V AC` can drive `50 mA – 100 mA` across the chest, crossing the ventricular fibrillation threshold. Always treat circuits above `50 V AC` or `120 V DC` (or lower in damp locations) as energized hazards requiring lockout/tagout and insulated tools.
