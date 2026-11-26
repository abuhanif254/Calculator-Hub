---
title: "Electrical Power: Calculating Watts (P=VI)"
description: "Master Watt's Law and AC power factor. Calculate real power (W), apparent power (VA), current, and voltage safely with our Electrical Power Calculator."
category: "Math & Science"
relatedCalculator: "electrical-power-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the difference between Watts (W) and Volt-Amperes (VA)?"
    answer: "Watts measure real power—the rate at which electrical energy performs actual mechanical work, heating, or illumination. Volt-Amperes measure apparent power (V_rms × I_rms) supplied by the source. For purely resistive loads, W equals VA; for inductive motors and switching power supplies, VA exceeds W because of phase shift and harmonic current."
  - question: "How do I convert Watts to Amps on a 120 V or 240 V circuit?"
    answer: "For DC or resistive AC appliances, divide Watts by Volts: I = P / V (for example, 1,200 W / 120 V = 10.0 A). For inductive single-phase AC equipment, divide by both voltage and power factor: I = P / (V × PF). Ignoring power factor underestimates actual wire current."
  - question: "Why does running a high-power appliance at 240 V reduce wiring heat loss?"
    answer: "Because P = V × I, doubling supply voltage cuts current in half for the same power output. Since conductor heating follows I² × R, halving current reduces resistive heat loss in the cable by a factor of four (0.5² = 0.25), enabling thinner conductors for EV chargers, dryers, and ovens."
  - question: "What is the NEC 80% continuous load rule for circuit breakers?"
    answer: "Under National Electrical Code (NEC) Articles 210.19 and 210.20, continuous loads—defined as operating at maximum current for 3 hours or more—must not exceed 80% of a standard breaker's ampacity. A 15 A, 120 V circuit is therefore limited to 12.0 A (1,440 VA) continuous, and a 20 A circuit to 16.0 A (1,920 VA)."
  - question: "Why does a 1,000 W microwave oven draw around 1,500 W from the wall?"
    answer: "The 1,000 W figure printed on a microwave oven refers to magnetron RF cooking output inside the cavity, not electrical input. Magnetron efficiency, high-voltage transformer losses, cooling fans, and turntable motors require approximately 1,450 W to 1,600 W of wall input power."
---

Electrical power (`P`), measured in **Watts (`W`)**, is the instantaneous rate at which electrical energy is transferred or converted into heat, light, or mechanical work (`1 W = 1 Joule per second`). Defined by **Watt's Law** (`P = V × I`), calculating power lets engineers and electricians size branch circuits, select circuit breakers, specify uninterruptible power supplies (UPS), and verify thermal limits before energizing equipment.

While DC and resistive heating loads follow `P = V × I` directly, alternating-current (AC) motors, transformers, and power supplies introduce **power factor (`PF`)**, causing apparent power (`VA`) to exceed active wattage (`W`). You can solve instantly across voltage, current, resistance, and wattage using our [Electrical Power Calculator](/en/calculators/electrical-power-calculator).

## Core Equations: Watt's Law, Ohm's Substitutions, and AC Power

In direct-current (DC) circuits and purely resistive AC loads (such as baseboard heaters or incandescent lamps), electrical power equals the product of potential difference (`V` in Volts) and current (`I` in Amperes). Combining Watt's Law with Ohm's Law (`V = I × R`) yields three equivalent forms:

```text
P = V × I
P = I² × R
P = V² / R
```

The second expression (`I² × R`) is particularly critical in power distribution: conductor heating scales with the **square** of current, making high-amperage low-voltage runs far more lossy than high-voltage distribution.

### Single-Phase and Three-Phase AC Power

In AC systems with inductive or capacitive impedance, current waveform lags or leads voltage by a phase angle `φ`, creating three distinct power quantities:

- **Apparent Power (`S`, in Volt-Amperes, `VA`):** Total electrical capacity required from wires, breakers, and transformers: `S = V_rms × I_rms`.
- **Real (Active) Power (`P`, in Watts, `W`):** Useful work or heat delivered: `P = V_rms × I_rms × PF`, where `PF = cos(φ)` for sinusoidal loads (`0 ≤ PF ≤ 1`).
- **Reactive Power (`Q`, in `VAR`):** Energy oscillating between source and magnetic/electric fields without performing net work: `Q = V_rms × I_rms × sin(φ)`.

For balanced **three-phase AC systems** with line-to-line voltage `V_LL` and line current `I_L`, active power scales by `√3` (`≈ 1.732`):

```text
P_3phase = √3 × V_LL × I_L × PF
```

## Step-by-Step Worked Example: Breaker and Circuit Sizing for an Inductive Load

Consider a workshop miter saw or air compressor motor drawing `1,440 W` of steady real power with an inductive power factor `PF = 0.80` on a standard `120 V` North American single-phase supply.

1. **Convert Real Power (`W`) to Apparent Power (`VA`):** Divide active wattage by power factor to find total volt-ampere demand:
   `S = P / PF = 1,440 W / 0.80 = 1,800 VA`
2. **Calculate Actual Line Current (`I`):** Divide apparent power by line voltage:
   `I = S / V = 1,800 VA / 120 V = 15.0 A`
   *(Note: Using `1,440 / 120 = 12.0 A` without power factor would understate wire current by 20%.)*
3. **Apply the NEC 80% Continuous Load Threshold:** A standard `15 A`, `120 V` circuit breaker allows `15 A × 0.80 = 12.0 A` (`1,440 VA`) for continuous operation. Because `15.0 A` exceeds `12.0 A`—and inductive motors pull `3×` to `5×` locked-rotor inrush current during startup—this load requires a dedicated `20 A` branch circuit (`20 A × 0.80 = 16.0 A` continuous rating).
4. **Compare Against a `240 V` Supply:** Wiring an equivalent `1,440 W` (`1,800 VA`) motor for `240 V` cuts line current in half:
   `I_240V = 1,800 VA / 240 V = 7.5 A`
   Not only does `7.5 A` fit comfortably on a `15 A` `240 V` circuit, it reduces `I² × R` conductor heat loss along identical wiring by `75%`.

## Typical Appliance Power, Power Factor, and Current Benchmarks

The table below illustrates how voltage, active wattage, and power factor interact across common residential and commercial equipment.

| Equipment / Load | Supply Voltage | Real Power (W) | Typical Power Factor | Line Current (A) | Circuit & Sizing Implication |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **LED Desk Lamp** | `120 V AC` | `12 W` | `0.85` | `0.12 A` | Negligible branch load |
| **Workstation PC + Display** | `120 V AC` | `550 W` | `0.95 (Active PFC)` | `4.82 A` | Size UPS for `≥ 650–750 VA` headroom |
| **Microwave Oven (1,000 W cook)** | `120 V AC` | `1,500 W` | `0.90` | `13.89 A` | Requires dedicated `20 A` kitchen circuit |
| **Portable Space Heater** | `120 V AC` | `1,500 W` | `1.00 (Resistive)` | `12.50 A` | Exceeds `12.0 A` continuous limit on `15 A` breaker |
| **Level 2 EV Charger (32 A)** | `240 V AC` | `7,680 W` | `0.99` | `32.32 A` | Requires `40 A` breaker (`32 A / 0.80`) |
| **Commercial HVAC Scroll Unit** | `480 V AC (3φ)` | `12,000 W` | `0.85` | `16.98 A` | Computed via `12,000 / (1.732 × 480 × 0.85)` |

## Practical Caveats, Efficiency Losses, and Safety Margins

Even straightforward `P = V × I` calculations fail in practice if four field nuances are overlooked:

- **Watts vs. VA Backup Limits:** Generators and UPS units carry dual limits (e.g., `1,500 VA / 900 W`). A `1,200 W` resistive load overloads that UPS because active power saturates at `900 W`; verify that **both** `W` and `VA` exceed your load.
- **Harmonic Distortion (`THD`):** Non-linear switching loads (older LED drivers, VFDs) draw pulsed current, degrading true power factor (`PF_true = PF_disp / √(1 + THD²)`) and heating shared neutral conductors.
- **Output vs. Input Power:** Nameplates often state *output* power. A `1 HP` motor (`746 W` shaft output) at `82%` efficiency pulls `910 W` (`1,070 VA` at `0.85 PF`) from the wall, plus brief startup surge current.
- **Continuous Duty Derating:** Standard North American breakers are 80%-rated assemblies. Running a `1,500 W` heater (`12.5 A`) for hours on a shared `15 A` branch circuit causes terminal heating and nuisance trips.
