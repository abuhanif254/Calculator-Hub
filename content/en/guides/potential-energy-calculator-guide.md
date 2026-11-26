---
title: "Potential Energy: Stored Energy Waiting to be Released"
description: "Learn how gravitational potential energy (PE = mgh) converts to kinetic energy, choose reference datums, and calculate energy across planetary gravities."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "potential-energy-calculator"
relatedType: "calculator"
faqs:
  - question: "Can gravitational potential energy be negative?"
    answer: "Yes. Gravitational potential energy is always measured relative to an arbitrary zero-height reference datum (h = 0). If you define street level as h = 0, an object sitting in a 4-meter-deep basement has h = −4 m and negative potential energy (−mgh). In orbital astrophysics, the zero point is placed at infinite separation, making all bound planetary orbits negative under U = −GMm / r."
  - question: "When does PE = mgh stop being accurate and require universal gravitation?"
    answer: "The linear formula PE = mgh assumes constant gravitational acceleration g and remains accurate within 0.5% up to roughly 16 km (10 miles) above Earth's surface. At high altitudes or orbital distances—such as the International Space Station at 408 km where gravity drops to 8.66 m/s²—you must integrate using Newton's universal gravitation equation ΔU = GMm × (1/r₁ − 1/r₂)."
  - question: "Does the horizontal path or ramp angle change gravitational potential energy?"
    answer: "No. Gravity is a conservative force, meaning gravitational work depends solely on the vertical elevation difference Δh between start and finish, never on the path taken. Lifting a 50 kg crate 3 meters straight up or pushing it up a 10-meter frictionless ramp to the same 3-meter height stores the exact same 1,471.5 J of potential energy."
  - question: "Why does mass cancel out when converting potential energy to drop speed?"
    answer: "Setting stored potential energy equal to gained kinetic energy gives m × g × h = 0.5 × m × v². Because inertial mass on the kinetic side equals gravitational mass on the potential side, m divides out cleanly on both sides, yielding v = √(2gh). In a vacuum, a 1 kg block and a 1,000 kg boulder released from the same height reach identical speeds."
  - question: "How do Joules of potential energy convert to kilowatt-hours (kWh)?"
    answer: "One Watt equals 1 Joule per second, so 1 kilowatt-hour equals 1,000 J/s × 3,600 s = 3,600,000 J (3.6 MJ). Divide any gravitational energy result in Joules by 3,600,000 to obtain kWh—essential for sizing pumped-storage hydroelectric reservoirs and gravity-based grid batteries."
---

Gravitational potential energy (`PE`) is mechanical energy stored within an object due to its vertical position inside a gravitational field, calculated near a planetary surface as `PE = m × g × h` and measured in Joules (`J`, where `1 J = 1 kg·m²/s²`). Lifting a mass against gravity transfers work into stored potential energy; releasing that mass converts the stored energy directly back into kinetic energy of motion (`KE = 0.5 × m × v²`).

Because gravitational force is conservative, the energy stored depends exclusively on vertical elevation change (`Δh`) relative to a chosen zero-height datum, regardless of whether an object climbs a vertical shaft, a winding mountain road, or an inclined conveyor. Whether you are solving for stored energy, required mass, elevation, or local gravitational acceleration across `J`, `kJ`, `MJ`, `Wh`, `kWh`, `kg`/`lb`, and `m`/`ft`, our [Potential Energy Calculator](/en/calculators/potential-energy-calculator) handles unit conversions and planetary gravity presets automatically.

## Gravitational Potential Energy Formulas and Variables

Mechanical energy analysis combines uniform-field elevation formulas with energy conservation and deep-space orbital mechanics:

```text
Gravitational PE (Uniform Field):  PE = m × g × h
Change in Potential Energy:        ΔPE = m × g × (h_f − h_i)
Solve for Mass:                    m = PE / (g × h)
Solve for Vertical Height:         h = PE / (m × g)
Solve for Gravity:                 g = PE / (m × h)
Mechanical Energy Conservation:    PE_i + KE_i = PE_f + KE_f
Impact Speed from Rest:            v = √(2 × g × h)
Orbital Potential Energy:          U = −(G × M × m) / r
```

* **`PE` (Potential Energy, J):** Stored gravitational energy (`1 kJ = 1,000 J`; `1 MJ = 1,000,000 J`; `1 kWh = 3.6 MJ`).
* **`m` (Mass, kg):** Object mass (`1 lb = 0.453592 kg`; `1 metric ton = 1,000 kg`).
* **`g` (Gravitational Field Strength, m/s²):** Standard Earth gravity is `9.80665 m/s²` (`32.174 ft/s²`), often rounded to `9.81 m/s²`.
* **`h` (Vertical Height, m):** Elevation measured perpendicular to the horizontal reference plane (`1 ft = 0.3048 m`).
* **`G` (Universal Gravitational Constant):** `6.67430 × 10⁻¹¹ m³/(kg·s²)`, used with planetary mass `M` and center-to-center radius `r`.

### Reference Datum Selection and Negative Potential Energy

An absolute potential energy number has physical meaning only once you declare where `h = 0` sits—typically ground level, sea level, or the lowest point of travel. Only energy differences (`ΔPE = m × g × Δh`) drive motion or generate power. If ground level is `h = 0`, an elevator descending to `-12.0 m` below grade holds negative potential energy relative to the lobby, yet climbing back to `0 m` still absorbs positive work (`+12.0 × m × g`).

## Step-by-Step Worked Example: Pumped Hydro Storage and Coaster Drop

Two contrasting engineering problems illustrate both large-scale energy storage (`kWh`) and rapid kinetic conversion (`m/s`).

**Part 1 — Pumped-Storage Hydroelectric Reservoir:** An upper basin stores `250,000 kg` (`250 metric tons`, `551,156 lb`) of water at a net hydraulic head of `h = 120.0 m` (`393.7 ft`) under standard Earth gravity `g = 9.80665 m/s²`.

1. **Compute gravitational potential energy:** `PE = 250,000 × 9.80665 × 120.0 = 294,199,500 J` (`294.20 MJ`).
2. **Convert to electrical energy units:** `294,199,500 J / 3,600,000 J/kWh = 81.72 kWh` of raw mechanical potential.
3. **Apply turbine-generator efficiency (`85%`):** Deliverable grid output equals `81.72 × 0.85 = 69.46 kWh`—enough to power an average US home for roughly two days, demonstrating why hydro plants require massive water volumes and tall head heights.

**Part 2 — Roller Coaster Crest-to-Valley Conversion:** An `800 kg` coaster car passes a `45.0 m` peak at `2.00 m/s` (`KE_i = 0.5 × 800 × 2.00² = 1,600 J`), using `g = 9.81 m/s²`:

1. **Initial potential energy:** `PE_i = 800 × 9.81 × 45.0 = 353,160 J` (`353.16 kJ`).
2. **Total mechanical energy:** `E_total = 353,160 + 1,600 = 354,760 J`.
3. **Energy at a secondary `15.0 m` crest:** `PE_f = 800 × 9.81 × 15.0 = 117,720 J`, leaving `KE_f = 354,760 − 117,720 = 237,040 J`.
4. **Frictionless speed at `15.0 m`:** `v_f = √(2 × 237,040 / 800) = √592.6 = 24.34 m/s` (`54.45 mph`).

## Planetary Gravity and Elevation Energy Comparison

Because `PE` scales linearly with `g`, elevating an identical `100 kg` (`220.5 lb`) payload by `10.0 m` (`32.8 ft`) stores dramatically different amounts of energy across solar-system bodies, producing correspondingly different vacuum drop speeds (`v = √(2gh)`).

| Celestial Body | Surface Gravity (`g`) | Stored PE (`100 kg @ 10 m`) | Relative to Earth | Vacuum Drop Speed (`10 m`) |
| :--- | :--- | :--- | :--- | :--- |
| Pluto | 0.62 m/s² | 620 J (0.62 kJ) | 6.3% | 3.52 m/s (7.9 mph) |
| Moon | 1.62 m/s² | 1,620 J (1.62 kJ) | 16.5% | 5.69 m/s (12.7 mph) |
| Mars | 3.71 m/s² | 3,710 J (3.71 kJ) | 37.8% | 8.61 m/s (19.3 mph) |
| Earth | 9.81 m/s² | 9,810 J (9.81 kJ) | 100.0% | 14.01 m/s (31.3 mph) |
| Saturn | 10.44 m/s² | 10,440 J (10.44 kJ) | 106.4% | 14.45 m/s (32.3 mph) |
| Jupiter | 24.79 m/s² | 24,790 J (24.79 kJ) | 252.7% | 22.27 m/s (49.8 mph) |

## Engineering Applications, Common Errors, and Modeling Limits

Gravitational potential energy underpins utility-scale pumped-storage hydropower (accounting for over `90%` of global grid energy storage capacity), tower-crane counterweight balancing, mine-shaft gravity batteries, and fall-arrest energy absorber ratings. Under OSHA fall-protection design rules, knowing a `100 kg` worker's free-fall potential energy across a `1.8 m` (`6 ft`) lanyard drop (`1,766 J`) sets minimum deceleration stroke lengths to keep peak arresting forces below `8.0 kN`.

Guard against four frequent mistakes when calculating potential energy:

* **Mixing pounds and SI gravity:** Entering weight in pounds (`lb`) directly into `PE = m × 9.81 × h` without converting `lb` to `kg` (`× 0.453592`) overstates energy by `2.205×`.
* **Using ramp length instead of vertical rise:** On an inclined plane, always multiply total slope length by `sin(θ)` to isolate vertical elevation `Δh`.
* **Using constant `g` for high-altitude flight:** Above `16 km` altitude, inverse-square gravity decay becomes significant; at `408 km` low Earth orbit, `g` falls to `8.66 m/s²` (`11.7%` below surface gravity).
* **Omitting dissipative losses:** Real hydraulic turbines, roller coaster wheels, and cranes lose `5%` to `30%` of mechanical energy to fluid drag, bearing friction, and thermal heating, reducing actual kinetic recovery below theoretical `mgh`.
