---
title: "Battery Runtime: How Long Will It Last?"
description: "Learn how to read battery capacity ratings (mAh and Ah), calculate exact discharge times, and use our free Battery Runtime Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "battery-runtime-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does amp-hour (Ah) capacity alone fail to compare batteries at different voltages?"
    answer: "Amp-hours measure electrical charge rather than total energy. Multiplying amp-hours by nominal voltage gives Watt-hours (Wh), the true measure of stored work. A 100 Ah 12.8 V LiFePO4 pack stores 1,280 Wh, whereas a 100 Ah 48 V pack stores 4,800 Wh—nearly four times the runtime for the same wattage load."
  - question: "How does Peukert's Law affect lead-acid versus lithium (LiFePO4) batteries?"
    answer: "Peukert's Law describes how high discharge currents reduce effective battery capacity. Traditional flooded or AGM lead-acid batteries carry a Peukert exponent between 1.15 and 1.30, meaning pulling 100 A from a 100 Ah battery can cut runtime to roughly 33 minutes. LiFePO4 cells have an exponent near 1.02 to 1.05 and retain almost full rated capacity under heavy loads."
  - question: "What is the safe Depth of Discharge (DoD) for different battery chemistries?"
    answer: "Routinely discharging flooded or AGM lead-acid batteries below 50% Depth of Discharge accelerates plate sulfation and sharply shortens cycle life. Lithium iron phosphate (LiFePO4) batteries tolerate 80% to 90% DoD for thousands of cycles, while standard NMC lithium-ion packs generally target 80% DoD to balance longevity and usable range."
  - question: "Why must inverter efficiency and standby tare draw be included in AC runtime estimates?"
    answer: "Converting low-voltage DC battery power to 120 V or 240 V AC wastes 7% to 15% of energy as heat inside the inverter. In addition, the inverter's own control circuitry draws 10 W to 30 W continuously whenever switched on—consuming 240 Wh to 720 Wh per day even when connected AC appliances sit idle."
  - question: "How does cold ambient temperature change usable battery runtime?"
    answer: "Lower temperatures slow electrolyte ion mobility and raise internal resistance, causing voltage to sag earlier under load. At 32°F (0°C), lead-acid batteries lose roughly 20% to 35% of usable capacity, and LiFePO4 batteries typically experience a 10% to 15% temporary dip while requiring BMS low-temperature charge protection below freezing."
---

Battery runtime equals usable stored energy in Watt-hours (Wh) divided by total power draw in Watts (W), adjusted for chemistry-specific Depth of Discharge (DoD) limits, Peukert high-rate losses, and inverter conversion efficiency. Dividing nameplate Amp-hours (Ah) directly by load Amps routinely overestimates operating time by 25% to 60% because batteries cannot safely deliver 100% of their charge under sustained loads.

Accurate runtime modeling starts by converting capacity into Watt-hours and tracing every loss between battery terminals and the load. Whether you are sizing a camper van house bank, an uninterruptible power supply (UPS), or a portable field pack, our [Battery Runtime Calculator](/en/calculators/battery-runtime-calculator) computes voltage, safe DoD limits, conversion efficiency, and Peukert derating automatically.

## Core Battery Capacity and Runtime Formulas

Battery labels list charge in milliampere-hours (mAh) or Ampere-hours (Ah), while usable work depends on terminal voltage. Use these core equations to calculate realistic operating hours:

```text
Stored Energy (Wh):        E_rated = C_Ah × V_nom   (or C_mAh × V_nom / 1,000)
Usable Energy (Wh):        E_usable = E_rated × DoD
DC-Only Runtime (hours):   t_DC = E_usable / P_load
AC-Side Runtime (hours):   t_AC = E_usable / [(P_AC / η_inv) + P_idle]
Peukert Total Time (h):    t_p = H × [C_Ah / (I_load × H)]^k
C-Rate (discharge speed):  C_rate = I_load / C_Ah
```

* **`C_Ah` and `C_mAh` (Rated Capacity):** Charge rating (`1 Ah = 1,000 mAh`), typically specified at a slow 20-hour (`C/20`) test rate.
* **`V_nom` (Nominal Voltage, V):** Reference bus voltage (`3.7 V` for single Li-ion cells, `12.0 V` lead-acid, `12.8 V` LiFePO4, `51.2 V` 48 V-class banks).
* **`DoD` (Safe Depth of Discharge):** Routine discharge ceiling (`0.50` lead-acid; `0.80–0.90` LiFePO4).
* **`η_inv` and `P_idle` (Inverter Efficiency and Tare Draw):** DC-to-AC conversion efficiency (`0.85–0.93`) plus continuous no-load standby draw (`10–30 W`).
* **`k` (Peukert Exponent) and `H` (Hour Base):** Empirical high-rate loss factor (`k ≈ 1.15–1.30` lead-acid; `1.02–1.05` LiFePO4; `H = 20 h`).

### Peukert's Law and High C-Rate Derating

A `100 Ah` AGM battery rated at `20 hours` delivers `5 A` for `20 h`. Pulling `100 A` (`1.0 C`) triggers heavy internal resistance losses and localized acid depletion. Applying Peukert's equation with `k = 1.20` gives `t_p = 20 × (100 / 2,000)^1.20 = 0.549 h`, or `33 minutes` to full exhaustion—nearly half of a naive one-hour estimate. LiFePO4 cells maintain flat voltage and minimal Peukert loss across normal loads.

## Step-by-Step Worked Example: AGM vs. LiFePO4 Off-Grid Load

Suppose a mobile workstation and refrigerator draw an average AC load of `240 W` through an inverter at `90%` efficiency (`η_inv = 0.90`) with `15 W` idle draw. Compare a `12.8 V, 100 Ah` LiFePO4 battery (`DoD = 80%`) against a `12.0 V, 100 Ah` AGM lead-acid battery (`DoD = 50%`, `k = 1.20`, `H = 20 h`).

1. **Compute effective DC power draw:** `P_DC = (240 / 0.90) + 15 = 266.67 + 15 = 281.67 W`.
2. **Calculate LiFePO4 usable energy:** `E_rated = 100 × 12.8 = 1,280 Wh`; at `80%` DoD, `E_usable = 1,280 × 0.80 = 1,024 Wh`.
3. **Solve LiFePO4 runtime:** `t_LiFePO4 = 1,024 / 281.67 = 3.64 hours` (`3 h 38 min`). At `22.0 A` (`0.22 C`), Peukert loss is negligible.
4. **Calculate AGM Peukert-adjusted runtime:** Nameplate energy is `100 × 12.0 = 1,200 Wh`. At `I_load = 281.67 / 12.0 = 23.47 A`, Peukert total time to 0% is `20 × [100 / (23.47 × 20)]^1.20 = 20 × (0.2130)^1.20 = 3.13 hours`. Stopping at `50%` DoD yields `3.13 × 0.50 = 1.56 hours` (`1 h 34 min`).

Despite identical `100 Ah` labels, LiFePO4 provides `2.3×` the usable runtime under the same load.

## Battery Chemistry and Runtime Benchmark Table

Comparing common battery formats clarifies how chemistry, voltage, and DoD reshape real-world energy reserves.

| Chemistry & Format | Nominal Voltage | Safe DoD | Peukert Exponent | Usable Energy per 100 Ah | Cycle Life |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Alkaline AA (2.5 Ah) | 1.5 V | 80%–90% | 1.25–1.35 | 3.2 Wh (per cell) | Single-use |
| Li-Ion 18650 (NMC/NCA) | 3.6–3.7 V | 80% | 1.03–1.06 | 292 Wh | 500–1,000 |
| Flooded Lead-Acid | 12.0 V | 50% | 1.20–1.30 | 600 Wh (before Peukert) | 400–700 |
| AGM Deep-Cycle | 12.0 V | 50% | 1.15–1.25 | 600 Wh (before Peukert) | 500–800 |
| LiFePO4 (12.8 V) | 12.8 V | 80%–90% | 1.02–1.05 | 1,024–1,152 Wh | 3,000–5,000+ |
| LiFePO4 (51.2 V Rack) | 51.2 V | 80%–90% | 1.01–1.03 | 4,096–4,608 Wh | 4,000–6,000+ |

## Real-World Applications, Common Errors, and Precision Caveats

Runtime analysis guides off-grid solar storage, telecom UPS backups, marine banks, medical mobility scooters, and UAV mission planning. Avoid four recurring errors:

* **Misreading USB power bank ratings:** A `20,000 mAh` label reflects internal `3.7 V` cells (`74 Wh`), not `5 V` output. After boost-converter losses (`~85%`), deliverable output is roughly `63 Wh`, or `12,600 mAh` at `5 V`.
* **Ignoring BMS continuous current limits:** A `100 Ah` LiFePO4 pack with a `100 A` BMS trips immediately if a `2,000 W` inverter pulls `170+ A` at `12 V`, regardless of remaining charge.
* **Neglecting voltage sag and low-voltage disconnect:** Under surge, internal resistance drops terminal voltage (`V_term = V_ocv − I × R_int`), triggering inverter cutoffs early.
* **Omitting cold-weather derating and standby loads:** Freezing temperatures raise internal impedance while idle inverters, BMS balancers, and routers drain multi-day reserves.
