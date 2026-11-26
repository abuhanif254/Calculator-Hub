---
title: "PSI to Bar Converter: Exact Formula, Tire Pressure & Hydraulic Tables"
description: "Convert PSI to bar using the exact NIST factor of 0.06894757. Includes car and bike tire examples, hydraulic tables, kPa equivalents, and gauge pitfalls."
faqs:
  - question: "What is the exact formula to convert PSI to bar?"
    answer: "Multiply pounds per square inch by 0.06894757 to get bar: bar = PSI × 0.06894757. Conversely, 1 bar equals approximately 14.5038 PSI (specifically 14.5037738 PSI)."
  - question: "What is 35 PSI in bar for car tires?"
    answer: "A tire pressure of 35 PSI equals 2.41 bar (precisely 2.41316 bar, or 241.3 kPa). Most European digital forecourt air pumps display pressure in bar or kPa, so 2.4 bar is the closest standard setting for a 35 PSI placard."
  - question: "Is bar an official SI unit for pressure?"
    answer: "No. The official SI unit of pressure under ISO 80000-4 is the pascal (Pa) or kilopascal (kPa). However, NIST and BIPM accept the bar as a non-SI metric unit because 1 bar equals exactly 100,000 Pa (100 kPa), making conversion effortless."
  - question: "What is the difference between PSI (psig) and PSIA?"
    answer: "PSIG (gauge pressure) measures pressure relative to surrounding ambient air—so a flat tire reads 0 psig. PSIA (absolute pressure) includes atmospheric pressure (~14.7 psi at sea level), meaning 0 psig equals roughly 14.7 psia or 1.01325 bar absolute."
  - question: "How many bar is 100 PSI on a road bicycle tire or air compressor?"
    answer: "100 PSI equals 6.89 bar (precisely 6.894757 bar, or 689.48 kPa). Most workshop air lines and high-pressure road bike tires operate between 6.0 and 7.5 bar."
---

To convert pounds per square inch (`PSI`) to bar (`bar`), multiply the pressure in `PSI` by `0.06894757`. Using the formula `bar = PSI × 0.06894757`, a standard `35 PSI` car tire equals `2.41 bar`, while `1 bar` equals `14.5038 PSI`.

Because US tire placards, bicycle sidewalls, and hydraulic manifolds routinely specify `PSI` while European gas-station pumps, industrial DIN gauges, and SCUBA regulators read in `bar` or kilopascals (`kPa`), reliable pressure conversion protects tire wear, equipment seals, and system safety margins.

## Exact Conversion Formula & International Standard

Pressure is defined in ISO 80000-4 (Mechanics) and NIST Special Publication 811 as force per unit area, with the SI derived unit being the **pascal** (`1 Pa = 1 N/m²`). Both `PSI` (`lbf/in²`) and `bar` link cleanly to the pascal through internationally standardized constants:

- **1 bar (exact):** `100,000 Pa` = `100 kPa` = `0.1 MPa` (accepted alongside SI for industrial pressure gauges).
- **1 PSI (NIST SP 811):** Defined using standard gravity (`9.80665 m/s²`), the international pound (`0.45359237 kg`), and the international inch (`0.0254 m`), yielding `1 PSI = 6,894.757293168 Pa` (`≈ 6.894757 kPa`).

Dividing `6,894.757293168 Pa` by `100,000 Pa/bar` establishes the exact working conversion equations:

- **PSI to Bar:** `bar = PSI × 0.06894757` (full NIST precision: `0.06894757293168`)
- **Bar to PSI:** `PSI = bar × 14.503773773` (commonly rounded to `14.5038 PSI`)
- **PSI to kPa:** `kPa = PSI × 6.894757` (multiply bar by `100` to obtain `kPa`)

## Step-by-Step Worked Practical Examples

The three examples below walk through exact conversions for passenger vehicles, road cycling, and industrial hydraulics.

### 1. Passenger SUV Cold Tire Pressure (35 PSI)

Your vehicle door-jamb sticker specifies `35 PSI` cold, and you are using a European service-station inflator calibrated only in `bar`.

1. Identify the target pressure: `35 PSI`.
2. Multiply by the conversion factor: `35 × 0.06894757 = 2.41316495 bar`.
3. Set the digital pump to `2.4 bar` (or `2.41 bar` / `241 kPa` if the display supports hundredths).

### 2. Road Bicycle Tire Inflation (100 PSI)

A narrow `25 mm` clincher road tire sidewall lists a recommended inflation of `100 PSI`, and your floor pump gauge displays `bar`.

1. Identify the target pressure: `100 PSI`.
2. Multiply by `0.06894757`: `100 × 0.06894757 = 6.894757 bar`.
3. Pump to `6.9 bar` (avoid rounding up past `7.0 bar` if `100 PSI` is close to the rim hook limit).

### 3. Industrial Hydraulic Relief Valve (3,000 PSI)

A hydraulic cylinder assembly is rated for a maximum working pressure of `3,000 PSI`, and an international engineering spec requires `bar` and `MPa`.

1. Identify the rated pressure: `3,000 PSI`.
2. Multiply by `0.06894757`: `3,000 × 0.06894757 = 206.84271 bar`.
3. Result: `206.84 bar` (equivalently `20.68 MPa`).

## Quick Reference Conversion Table

The table covers common automotive, cycling, pneumatic, and hydraulic pressure benchmarks with exact `bar` and `kPa` equivalents.

| Pressure (PSI) | Pressure (bar) | Pressure (kPa) | Practical Context |
| :--- | :--- | :--- | :--- |
| `1 PSI` | `0.06895 bar` | `6.89 kPa` | Base conversion factor |
| `14.50 PSI` | `1.00 bar` | `100.00 kPa` | Exact `1 bar` benchmark (`~0.987 atm`) |
| `28 PSI` | `1.93 bar` | `193.05 kPa` | Motorcycle or light trailer tire |
| `32 PSI` | `2.21 bar` | `220.63 kPa` | Standard passenger sedan cold tire |
| `35 PSI` | `2.41 bar` | `241.32 kPa` | Crossover / SUV cold tire placard |
| `45 PSI` | `3.10 bar` | `310.26 kPa` | Gravel bike or light-truck load tire |
| `60 PSI` | `4.14 bar` | `413.69 kPa` | Hybrid bike or compact spare tire |
| `100 PSI` | `6.89 bar` | `689.48 kPa` | Road bike tire / shop air compressor |
| `500 PSI` | `34.47 bar` | `3,447.38 kPa` | High-side HVAC refrigerant line |
| `3,000 PSI` | `206.84 bar` | `20,684.27 kPa` | SCUBA cylinder / hydraulic circuit |

## Industry Use Cases, Regional Pitfalls & Common Conversion Mistakes

Pressure errors in mechanical systems rarely happen because someone forgot `0.06895`; instead, they stem from mixing gauge references, misreading metric prefixes, or overlooking temperature effects.

- **Gauge Pressure (`psig` / `barg`) vs. Absolute Pressure (`psia` / `bara`):** Tire gauges, air compressors, and hydraulic manifolds measure **gauge pressure** relative to local atmospheric air (`0 psig = 0 barg` when open to the room). Vacuum systems, barometers, and thermodynamic gas-law calculations require **absolute pressure**, which adds roughly `14.696 PSI` (`1.01325 bar`) at sea level. Converting a `psia` reading as if it were `psig` shifts equipment thresholds by over `1 bar`.
- **Confusing `bar` with `atm` (Standard Atmosphere):** Although `1 bar` (`100 kPa`) and `1 standard atmosphere` (`101.325 kPa`, or `14.6959 PSI`) are within `1.3%` of each other, they are not identical. Scientific and diving gas-blending tables treat `1.01325 bar = 1 atm` strictly.
- **Misreading `kPa` vs. `bar` on Tire Pumps:** Some modern vehicles and Asian/Canadian service gauges display **kilopascals (`kPa`)** rather than `bar`. Remember that `1 bar = 100 kPa` (`2.41 bar = 241 kPa`). Confusing `240 kPa` with `2.4 bar` is harmless, but reading `35 PSI` and entering `35 kPa` (`0.35 bar`) leaves a tire dangerously underinflated.
- **Hot vs. Cold Tire Pressure Drift:** Vehicle manufacturers specify cold inflation pressures measured after a car has been parked for at least three hours. Driving heats air inside the tire, typically raising pressure by `3–5 PSI` (`0.21–0.34 bar`). Bleeding air down to `2.4 bar` while tires are hot results in underinflation once they cool overnight.
- **Maximum Sidewall Pressure vs. Vehicle Placard:** The `PSI` or `bar` stamped on a car tire sidewall is the tire's **maximum safe cold inflation limit**, not the recommended driving pressure—always convert the number on the vehicle's door-jamb placard.
