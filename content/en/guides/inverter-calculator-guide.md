---
title: "Inverters: Converting Battery Power to AC Power"
description: "Learn how an inverter works, the difference between pure sine wave and modified sine wave, and use our free Inverter Calculator to size your system."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "inverter-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between Watts (W) and Volt-Amps (VA) when sizing an inverter?"
    answer: "Watts measure real power consumed as heat, light, or mechanical work, while Volt-Amps measure apparent power supplied by the inverter (VA = W / Power Factor). Resistive loads like space heaters have a Power Factor near 1.0, whereas motor-driven appliances and switch-mode power supplies often operate at 0.70 to 0.85, requiring 18% to 43% more VA capacity than their wattage label implies."
  - question: "Why do inductive appliances require surge ratings two to six times higher than running watts?"
    answer: "Electric motors in refrigerators, well pumps, air conditioners, and power tools draw locked-rotor starting current for 0.1 to 2 seconds until the rotor reaches operating speed. Even if a refrigerator runs at 150 W continuously, its compressor startup surge can reach 400 W to 900 W, tripping undersized inverters immediately."
  - question: "When should you move from a 12 V inverter system to 24 V or 48 V?"
    answer: "Above roughly 1,500 W to 2,000 W of continuous load, a 12 V bank must supply 140 A to 190 A of DC current, demanding expensive 2/0 or 4/0 AWG copper cables and heavy fuses to curb voltage drop. Stepping up to 24 V cuts DC current in half, and 48 V cuts it to one-quarter for the same AC power."
  - question: "Can a modified sine wave inverter damage modern electronics or medical devices?"
    answer: "Yes. Modified sine wave inverters output a stepped square wave with Total Harmonic Distortion often exceeding 25% to 40%. That waveform causes induction motors to run hotter and louder, creates audible hum in audio gear, and can damage variable-speed compressors, laser printers, battery tool chargers, and CPAP humidifiers."
  - question: "How does inverter idle consumption affect off-grid battery runtime?"
    answer: "Every inverter draws DC power just to keep its control board, cooling fans, and output stage energized. A 3,000 W inverter typically pulls 20 W to 50 W with zero AC load—wasting 480 Wh to 1,200 Wh every 24 hours unless switched off when unused or placed in eco-search standby mode."
---

An inverter converts low-voltage Direct Current (DC) from batteries (`12 V`, `24 V`, or `48 V`) into utility-grade Alternating Current (`120 V / 60 Hz` in North America, or `230 V / 50 Hz` internationally) via high-frequency semiconductor switching. Proper sizing requires matching three thresholds: continuous apparent power in Volt-Amps (VA), peak motor startup surge in Watts (W), and DC battery amperage across your cabling.

Summing appliance wattage labels alone causes overload trips, overheated wiring, and premature hardware wear. Our [Inverter Calculator](/en/calculators/inverter-calculator) computes power-factor-adjusted VA ratings, surge headroom, DC battery current, and system voltage tradeoffs before you purchase equipment.

## Core Inverter Sizing Equations and Electrical Parameters

Inverter sizing links real power, Power Factor, startup surge multipliers, conversion efficiency, and DC bus voltage through five engineering equations:

```text
Apparent Power (VA):       S_VA = P_W / PF
Required Inverter Rating:  S_req = S_VA × (1 + M_safety) × (1 + M_exp)
Peak Surge Demand (W):     P_surge = Σ (P_run,i × k_surge,i)
DC Input Current (A):      I_DC = P_AC / (V_DC × η_inv)
DC Cable Voltage Drop:     V_drop = 2 × L_ft × I_DC × R_per_ft
```

* **`P_W` (Continuous Real Power, W):** Sum of active wattages for simultaneous appliances, scaled by duty cycle.
* **`PF` (Power Factor):** Ratio of real to apparent power (`0.70–0.85` for inductive motors; `0.95–1.00` for resistive heaters and PFC electronics).
* **`M_safety` and `M_exp` (Headroom Margins):** Continuous thermal buffer (`20%` recommended) plus optional expansion margin (`10%–25%`).
* **`k_surge` (Surge Multiplier):** Starting-to-running power ratio (`1.0×` LED lighting, `2.5×–4.0×` fridge compressors, `5.0×–6.0×` well pumps).
* **`η_inv` (Conversion Efficiency):** Typically `0.85` to `0.93` under moderate load, falling at light loads due to fixed tare draw.

### Pure Sine Wave vs. Modified Sine Wave Topology

Modified sine wave inverters step DC through positive, zero, and negative plateaus via a simple H-bridge, yielding `25%–40%` Total Harmonic Distortion (THD). Those abrupt voltage edges overheat induction motors and stress switching power supplies. Pure sine wave inverters use high-frequency Pulse-Width Modulation (PWM) and LC filtering to synthesize a clean sine wave (`<3%` THD), ensuring cool, quiet operation for CPAP machines, induction cooktops, variable-speed compressors, and audio gear.

## Step-by-Step Worked Example: Camper Van Multi-Appliance Sizing

Consider a camper van running three simultaneous AC loads: a `150 W` compressor fridge (`PF = 0.80`, `2.5×` surge), a `1,000 W` compact induction burner (`PF = 0.95`, `1.2×` surge), and a `120 W` workstation plus router (`PF = 0.90`, `1.0×` surge), at `90%` efficiency (`η_inv = 0.90`).

1. **Sum continuous real power:** `P_total = 150 + 1,000 + 120 = 1,270 W`.
2. **Compute apparent power (VA):** `S_VA = (150 / 0.80) + (1,000 / 0.95) + (120 / 0.90) = 187.50 + 1,052.63 + 133.33 = 1,373.46 VA` (blended `PF = 0.925`).
3. **Apply a 20% safety margin:** `P_req = 1,270 × 1.20 = 1,524 W` and `S_req = 1,373.46 × 1.20 = 1,648.15 VA`. Round up to a standard `2,000 W / 2,000 VA` pure sine wave inverter.
4. **Verify peak startup surge:** `P_surge = (150 × 2.5) + (1,000 × 1.2) + (120 × 1.0) = 1,695 W`, well inside a `2,000 W` inverter's typical `4,000 W` surge rating.
5. **Compare DC battery current:** At `12 V` nominal, `I_DC = 1,270 / (12 × 0.90) = 117.59 A` (reaching `134.39 A` near a `10.5 V` cutoff). Stepping up to `24 V` cuts current to `58.80 A`, and `48 V` lowers it to `29.40 A`.

## System Voltage and DC Current Benchmark Table

Raising DC bus voltage slashes cable gauge requirements, terminal heat, and resistive voltage drop (`I²R`) as AC output increases.

| Continuous AC Load | 12 V Current (90% Eff) | 24 V Current (90% Eff) | 48 V Current (90% Eff) | Recommended Bus | Min Copper AWG (<6 ft Run) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 300 W | 27.8 A | 13.9 A | 6.9 A | 12 V | 10 AWG (12 V) |
| 1,000 W | 92.6 A | 46.3 A | 23.1 A | 12 V or 24 V | 2 AWG (12 V) / 6 AWG (24 V) |
| 1,500 W | 138.9 A | 69.4 A | 34.7 A | 12 V or 24 V | 1/0 AWG (12 V) / 4 AWG (24 V) |
| 2,000 W | 185.2 A | 92.6 A | 46.3 A | 24 V | 2/0 AWG (12 V) / 2 AWG (24 V) |
| 3,000 W | 277.8 A | 138.9 A | 69.4 A | 24 V or 48 V | 4/0 AWG (12 V) / 1/0 AWG (24 V) |
| 5,000 W | 463.0 A | 231.5 A | 115.7 A | 48 V | 1 AWG (48 V) |

## Real-World Applications, Sizing Pitfalls, and Safety Standards

Inverters power off-grid cabins, utility service trucks, marine house banks, and solar-plus-storage backups. Four common installation mistakes cause voltage trips or hazards:

* **Undersizing DC cables and fuses:** High `12 V` currents cause excessive voltage drop, tripping low-battery cutoffs prematurely. Size cables for `<3%` round-trip drop and place a Class-T or ANL fuse within `7–18 inches` of the battery positive post.
* **Ignoring thermal derating:** Rated watts assume `77°F (25°C)` ambient air; enclosed utility compartments above `104°F (40°C)` derate continuous output by `15%–30%`.
* **Omitting UL certification and ground bonding:** Use `UL 1741` (stationary) or `UL 458` (mobile/marine) inverters with proper neutral-to-ground bonding so GFCI breakers trip reliably.
* **Leaving large inverters idling continuously:** Power small DC devices via buck converters instead of burning `20–50 W` in inverter idle draw overnight.
