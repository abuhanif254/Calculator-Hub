---
title: "Watts to Amps Converter: Exact DC & AC Formulas (12V–400V)"
description: "Convert watts to amps for DC, single-phase AC, and three-phase circuits using exact Ohm's law formulas, voltage tables, power factor tips, and breaker sizing."
faqs:
  - question: "How do you convert watts to amps?"
    answer: "For direct current (DC) and purely resistive AC loads, divide power in watts by voltage in volts: Amps = Watts ÷ Volts. For inductive AC loads, divide by voltage multiplied by power factor: Amps = Watts ÷ (Volts × PF)."
  - question: "How many amps is 1,500 watts at 120 volts?"
    answer: "A 1,500-watt resistive heater on a 120-volt North American circuit draws 1,500 ÷ 120 = 12.5 amps. Because continuous loads cannot exceed 80% of a breaker rating (12A on a 15A breaker), a dedicated 20A circuit is recommended for prolonged use."
  - question: "How does power factor change watts-to-amps conversion?"
    answer: "Power factor (PF, ranging from 0 to 1) measures how efficiently an AC load converts supplied current into real work. Lower power factor increases current draw for the same wattage; for example, 1,200W at 120V draws 10A at PF 1.0 but 12.5A at PF 0.80."
  - question: "Why do 12V solar systems require much thicker cables than 48V systems?"
    answer: "Because current equals watts divided by volts, lowering system voltage by 4x increases amperage by 4x. A 2,400W inverter draws 200 amps at 12V DC compared to only 50 amps at 48V DC, demanding heavier copper conductors and larger fuses."
  - question: "What is the formula for three-phase watts to amps?"
    answer: "Using line-to-line voltage (V_L-L), three-phase current equals Watts ÷ (√3 × V_L-L × PF), where √3 is approximately 1.73205. A 10,000W motor on a 400V line at PF 0.85 draws roughly 16.98 amps per phase."
---

To convert electrical power in watts (`W`) to current in amperes (`A`), divide power by voltage (`V`): **`I (A) = P (W) ÷ V (V)`** for direct current (DC) and resistive alternating current (AC) loads. For inductive or capacitive AC appliances—such as motors, compressors, and switch-mode power supplies—you must include the circuit's power factor (`PF`): **`I (A) = P (W) ÷ (V × PF)`**.

Because amperage determines heat buildup in copper wiring and triggers circuit breaker trips, accurate watts-to-amps conversion is critical when sizing residential branch circuits, 12V–48V off-grid solar battery banks, RV shore power hookups, and commercial industrial equipment.

## Exact Conversion Formulas & International Standards

Electric power, potential, and current are coherent derived and base units in the International System of Units (**NIST Special Publication 330** and **ISO 80000-2 / IEC 80000-6**). One watt equals one joule per second (`1 W = 1 V × 1 A` in DC circuits). Depending on the electrical topology, three exact equations apply:

- **Direct Current (DC) Circuits (12V, 24V, 48V solar & automotive):**
  `I (A) = P (W) ÷ V (V)`
- **Single-Phase Alternating Current (AC) Circuits (120V North America, 230V Europe/UK/Asia):**
  `I (A) = P (W) ÷ (V (V) × PF)`
- **Three-Phase AC Circuits (208V, 400V, 480V line-to-line voltage `V_L-L`):**
  `I (A) = P (W) ÷ (√3 × V_L-L × PF)`, where `√3 ≈ 1.73205`

Power factor (`PF = cos φ` for sinusoidal waveforms) is a dimensionless ratio between `0` and `1` representing real power (`W`) divided by apparent power (`VA`). Resistive heating elements and incandescent bulbs have `PF = 1.0`, whereas induction motors and HVAC compressors typically operate between `PF = 0.75` and `0.90`.

## Step-by-Step Worked Practical Examples

### 1. Off-Grid 24V vs. 12V Solar Inverter Draw (DC)
An off-grid cabin uses a 24V LiFePO₄ battery bank powering a `1,200 W` DC load (`PF = 1` in DC).
1. At `24V DC`: `I = 1,200 ÷ 24 = 50 A`.
2. Compare with `12V DC`: `I = 1,200 ÷ 12 = 100 A`.
3. Note: If feeding an AC appliance through a `90%` efficient inverter, divide the AC wattage by `0.90` first (`1,200 ÷ 0.90 = 1,333.3 W` DC input), yielding `55.56 A` at `24V` or `111.11 A` at `12V`.

### 2. North American 120V Circuit & Power Factor Check (Single-Phase AC)
Compare a `1,500 W` resistive space heater (`PF = 1.0`) and a `1,200 W` inductive air compressor (`PF = 0.80`) on standard `120V` outlets.
1. Space heater: `I = 1,500 ÷ (120 × 1.0) = 12.5 A`. Under the National Electrical Code (NEC) `80%` continuous-load rule, a `15 A` breaker supports `15 × 0.80 = 12 A` continuously, so `12.5 A` pushes it into `20 A` circuit territory.
2. Air compressor: `I = 1,200 ÷ (120 × 0.80) = 1,200 ÷ 96 = 12.5 A` (requiring `1,500 VA` apparent capacity).

### 3. European 230V Kettle & Commercial 400V Motor (Single & Three-Phase AC)
1. A `2,300 W` UK/EU electric kettle at `230V` (`PF = 1.0`): `I = 2,300 ÷ (230 × 1.0) = 10 A`.
2. A `10,000 W` (`10 kW`) three-phase workshop motor at `400V` line-to-line with `PF = 0.85`:
   `I = 10,000 ÷ (1.73205 × 400 × 0.85) = 10,000 ÷ 588.897 = 16.98 A` per phase.

## Quick Reference Conversion Table

Amperage values below assume unity power factor (`PF = 1.0`) across common DC solar and AC mains voltages.

| Power | `12V DC` | `48V DC` | `120V AC` | `230V AC` | Typical Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 100 W | 8.33 A | 2.08 A | 0.83 A | 0.43 A | Laptop charger / LED array |
| 300 W | 25.00 A | 6.25 A | 2.50 A | 1.30 A | Desktop workstation / OLED TV |
| 500 W | 41.67 A | 10.42 A | 4.17 A | 2.17 A | Gaming PC / sump pump |
| 1,000 W | 83.33 A | 20.83 A | 8.33 A | 4.35 A | Microwave / 1 kW solar string |
| 1,200 W | 100.00 A | 25.00 A | 10.00 A | 5.22 A | Coffee brewer / toaster |
| 1,500 W | 125.00 A | 31.25 A | 12.50 A | 6.52 A | Hair dryer / 120V heater |
| 1,800 W | 150.00 A | 37.50 A | 15.00 A | 7.83 A | Max 15A 120V circuit (peak) |
| 2,400 W | 200.00 A | 50.00 A | 20.00 A | 10.43 A | Max 20A 120V circuit (peak) |
| 3,600 W | 300.00 A | 75.00 A | 30.00 A | 15.65 A | RV 30A shore power / water heater |

## Industry Use Cases, Regional Pitfalls & Common Mistakes

Technicians and solar installers frequently make costly sizing errors when overlooking real-world AC and DC conditions.

- **Ignoring the 80% Continuous-Duty Rule:** Standard circuit breakers (`15 A`, `20 A`, `30 A`) handle brief peaks, not continuous operation above `80%` capacity. Under North American NEC rules, multiply continuous amps by `1.25`: a `15 A` `120V` breaker safely supports `1,440 W` continuously (`12 A`), not `1,800 W`.
- **Regional Mains Voltage Variations:** North America uses `120V / 240V` (`60 Hz`), whereas Europe, the UK, and Australia standardize on `230V` (`50 Hz`). Japan uses `100V` (`50/60 Hz`), meaning a `1,500 W` appliance draws `15 A` in Tokyo versus `6.52 A` in London. Always verify nameplate ratings before assuming grid voltage.
- **Omitting Power Factor & Startup Surge:** Omitting `PF` underestimates current on inductive tools and refrigerators. Moreover, induction motors pull `3× to 6×` running amperage during startup, so a `1,000 W` compressor can briefly demand `3,000+ W`.
- **Forgetting Battery Voltage Sag:** A `12V` lead-acid bank can sag to `11.0V` under heavy load. Dividing by cutoff voltage (`11V`) rather than nominal `12V` keeps fuses and wire gauges safe during peak discharge.
