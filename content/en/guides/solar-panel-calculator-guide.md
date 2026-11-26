---
title: "Solar Panels: Sizing Your Off-Grid System"
description: "Learn how solar panels generate electricity, how to account for Peak Sun Hours, and use our free Solar Panel Calculator to size your system."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "solar-panel-calculator"
relatedType: "calculator"
faqs:
  - question: "What is a Peak Sun Hour (PSH), and how does it differ from total daylight hours?"
    answer: "One Peak Sun Hour equals 1,000 Watts of solar irradiance per square meter sustained for one hour—matching Standard Test Conditions. Even when the sun stays above the horizon for 12 hours, low morning and afternoon angles reduce irradiance, so most US locations average only 3.5 to 6.0 Peak Sun Hours daily."
  - question: "Why do off-grid solar systems lose 15% to 25% of nameplate panel wattage?"
    answer: "Solar modules lose efficiency as cell temperatures rise above 77°F (25°C) on sunny roofs, often shedding 10% to 14% in summer heat alone. Combining DC wire resistance, MPPT charge controller conversion, battery round-trip charging inefficiency, and inverter losses yields an overall system derating factor near 0.78 to 0.85."
  - question: "Why must you calculate cold-weather Open-Circuit Voltage (Voc) before wiring panels in series?"
    answer: "Photovoltaic cell voltage increases as temperatures fall, typically by 0.30% to 0.40% per degree Celsius below 25°C. On a 14°F (−10°C) morning, a series string's Voc rises 11% to 14% above its datasheet label; exceeding your MPPT controller's maximum input voltage causes immediate, permanent damage."
  - question: "How many days of battery autonomy should an off-grid solar system include?"
    answer: "Seasonal cabins and weekend RVs commonly budget 1.5 to 2.0 days of battery autonomy to bridge brief overcast spells. Full-time off-grid homes generally size for 2.5 to 4.0 days of reserve storage, or pair a 2-day battery bank with a backup generator for prolonged winter storms."
  - question: "What is the practical advantage of an MPPT charge controller over a PWM controller?"
    answer: "A PWM controller pulls solar panel voltage down near battery voltage, discarding excess voltage headroom as lost power. An MPPT controller tracks the array's true Maximum Power Point (Vmp × Imp) and converts high string voltage down to battery charging voltage, harvesting 15% to 30% more daily energy in cool weather or high-voltage arrays."
---

Sizing an off-grid solar array begins by dividing daily energy consumption in Watt-hours (Wh) by your site's Peak Sun Hours (PSH) and an overall system derating factor (`0.78` to `0.82`). Because solar modules rarely operate under laboratory Standard Test Conditions (`1,000 W/m²` at `77°F / 25°C`), dividing directly by total daylight hours routinely undersizes an array by `50%` or more.

Reliable photovoltaic design integrates four steps: daily load auditing, worst-month solar irradiance, cold-weather MPPT stringing checks, and battery autonomy sizing. Our [Solar Panel Calculator](/en/calculators/solar-panel-calculator) automates load tallying, panel counts, string `Voc` validation, battery capacity, and payback modeling in one place.

## Core Solar Array Sizing and Stringing Formulas

Every off-grid photovoltaic design starts with daily energy balance and ends with voltage verification against charge-controller limits:

```text
Daily Energy Load (kWh):   E_day = Σ (P_i × h_i × qty_i × duty_i) / 1,000
Required Array Power (W):  P_array = (E_day × 1,000) / (PSH × η_derate)
Panel Count:               N_panels = ceil(P_array / P_module)
Cold-Weather String Voc:   V_oc,cold = N_s × V_oc × [1 + β_Voc × (T_min − 25)]
Battery Bank Size (Ah):    C_bank = (E_day × 1,000 × D_autonomy) / (V_bank × DoD)
```

* **`E_day` (Daily Load, kWh/day):** Total 24-hour energy demand weighted by appliance duty cycles (`e.g., 50%` for cycling refrigerators).
* **`PSH` (Peak Sun Hours, h/day):** Equivalent hours at `1,000 W/m²` irradiance for your tilt angle and target season.
* **`η_derate` (System Derating Factor):** Combined efficiency across module heat, wiring, MPPT conversion, battery charging, and inverter losses (`0.80` standard baseline).
* **`N_s`, `V_oc`, `β_Voc` (Series Stringing):** Series panel count (`N_s`), Open-Circuit Voltage (`V_oc`), and temperature coefficient (`β_Voc`, typically `−0.0030` to `−0.0040 / °C`).
* **`D_autonomy` and `DoD`:** Backup days (`1.5–3.0`) and usable Depth of Discharge (`0.80` LiFePO4; `0.50` lead-acid).

### Standard Test Conditions (STC) vs. Real-World Losses

Module ratings reflect a brief flash test at `25°C` cell temperature. On an `85°F (29°C)` roof, cells reach `135°F–149°F (57°C–65°C)`, cutting output by `11%` to `15%` from heat alone before wiring, MPPT, and inverter losses. Designing around `η_derate = 0.80` prevents chronic afternoon battery deficits.

## Step-by-Step Worked Example: Off-Grid Cabin Array and Storage

Suppose an off-grid cabin uses `6.0 kWh/day` (`6,000 Wh/day`) at a site receiving `4.5 Peak Sun Hours` daily. We select `400 W` panels (`V_mp = 34.0 V`, `V_oc = 41.2 V`, `β_Voc = −0.30%/°C`), a `150 V` max-input MPPT controller, and a `48 V` LiFePO4 battery bank (`80%` DoD) for `2.0 days` of autonomy.

1. **Calculate required array wattage:** With `η_derate = 0.80`, `P_array = 6,000 / (4.5 × 0.80) = 6,000 / 3.60 = 1,666.7 W`.
2. **Determine panel count and string layout:** `1,666.7 / 400 = 4.17`, rounding up to `5 panels` (`2,000 W`), or `6 panels` (`2,400 W`) wired as two parallel strings of three panels in series (`3S2P`).
3. **Verify cold-weather string Voc:** At `14°F (−10°C)`, `ΔT = −35°C`. For a `3S` string, `V_oc,cold = 3 × 41.2 × [1 + (−0.0030 × −35)] = 123.6 × 1.105 = 136.58 V`, safely below the `150 V` controller limit (`4S` hits `182.1 V` and fails).
4. **Size the 48 V battery bank:** `C_bank = (6,000 × 2.0) / (48 × 0.80) = 12,000 / 38.4 = 312.5 Ah`. Three `48 V, 100 Ah` (`51.2 V` nominal) modules provide `15.36 kWh` nominal (`12.29 kWh` usable).

## Regional Peak Sun Hours and Array Output Benchmark Table

Location dictates array size as strongly as load. Benchmarks below assume south-facing tilt near latitude and `0.80` derating.

| US City | Annual PSH | Winter Worst PSH | Daily Yield / 1 kW (Annual) | 400 W Panels for 10 kWh/Day (Annual) | 400 W Panels for 10 kWh/Day (Winter) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Seattle, WA | 3.7 h | 1.5 h | 2.96 kWh | 9 panels (3.6 kW) | 21 panels (8.4 kW) |
| Boston, MA | 4.2 h | 2.4 h | 3.36 kWh | 8 panels (3.2 kW) | 14 panels (5.6 kW) |
| Chicago, IL | 4.3 h | 2.3 h | 3.44 kWh | 8 panels (3.2 kW) | 14 panels (5.6 kW) |
| Denver, CO | 5.4 h | 3.8 h | 4.32 kWh | 6 panels (2.4 kW) | 9 panels (3.6 kW) |
| Austin, TX | 5.3 h | 3.7 h | 4.24 kWh | 6 panels (2.4 kW) | 9 panels (3.6 kW) |
| Phoenix, AZ | 6.6 h | 4.9 h | 5.28 kWh | 5 panels (2.0 kW) | 7 panels (2.8 kW) |

## System Applications, Sizing Pitfalls, and NEC Compliance

Solar sizing governs off-grid homesteads, overland RVs, remote water pumping, and hybrid home backup. Guard against four frequent errors:

* **Sizing to summer or annual PSH for winter occupancy:** Northern sites drop by `50%+` in December; size to worst-month PSH or include generator backup.
* **Ignoring partial shading on series strings:** Shading one module collapses un-optimized series string current unless bypass diodes, parallel wiring, or MLPE hardware isolate the shaded panel.
* **Underestimating roof clearance:** Each `400 W–450 W` panel spans `~21 sq ft` (`1.95 m²`); add `15%–20%` area for mounting rails and fire setbacks.
* **Omitting NEC Article 690 protection:** US installations require string fusing (`3+` parallel strings), DC arc-fault interruption, equipment grounding, and rapid shutdown on dwellings.
