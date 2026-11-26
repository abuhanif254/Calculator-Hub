---
title: "Physics of Power: The Rate of Doing Work"
description: "Master the relationship between Work, Time, and Power. Learn mechanical and electrical power formulas, unit conversions, and real-world efficiency limits."
category: "Math & Science"
relatedCalculator: "power-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the difference between power (kW) and energy (kWh)?"
    answer: "Power, measured in watts (W) or kilowatts (kW), is the instantaneous rate at which energy is transferred or work is performed. Energy, measured in joules (J) or kilowatt-hours (kWh), is the total cumulative work done over a period of time. Running a 2 kW heater for 3 hours consumes 6 kWh of energy."
  - question: "How many watts are in one horsepower?"
    answer: "One mechanical (imperial) horsepower equals exactly 745.7 watts (550 foot-pounds per second). One metric horsepower (PS or CV), commonly used in European automotive specifications, equals 735.5 watts, while electrical motor nameplate ratings often round one horsepower to 746 watts."
  - question: "How does efficiency change the power needed from a motor or power supply?"
    answer: "No real-world machine converts 100% of its input power into useful output. You divide the required mechanical or output power by the system efficiency (η) expressed as a decimal: P_in = P_out / η. For example, delivering 4,000 W of output at 80% efficiency requires 5,000 W of input power, with 1,000 W lost as heat."
  - question: "What is the difference between average power and instantaneous power?"
    answer: "Average power equals total work divided by total elapsed time (W / Δt) across an interval. Instantaneous power measures the rate of work at an exact moment in time, calculated as force multiplied by instantaneous velocity (F × v) in mechanics or instantaneous voltage times current in electronics."
  - question: "How do you calculate power in an AC electrical circuit compared to DC?"
    answer: "In DC circuits, real power is simply voltage multiplied by current (P = V × I). In single-phase AC circuits with inductive or capacitive loads like motors, you must multiply by the power factor: P = V_rms × I_rms × cos(φ), where cos(φ) accounts for the phase shift between voltage and current."
---

Power quantifies how fast energy is transferred, converted, or used to perform physical work. Carrying a 50 lb crate up a 12 ft staircase requires the exact same mechanical work whether you walk slowly or sprint, because the mass and vertical displacement do not change. Sprinting demands dramatically higher power because you complete that identical work in a fraction of the time.

In both physics and electrical engineering, the fundamental relationship is ``P = W / t``, measured in watts (W), where 1 watt equals 1 joule of energy transferred per second (`1 J/s`). Use our [Power Calculator](/en/calculators/power-calculator) to solve instantly for power, work, or elapsed time across mechanical and electrical systems.

## Core Power Formulas and Unit Definitions

Because power expresses a rate of energy change (`P = ΔE / Δt`), its algebraic form adapts to linear mechanics, rotational machinery, and electrical circuits while preserving identical physical dimensions (`kg·m²/s³`).

### Mechanical and Rotational Power

When a constant force pushes an object across a displacement, average mechanical power is:

```text
P_avg = W / t = (F × d × cos(θ)) / t
```

- **P:** Power in watts (`W`) or kilowatts (`1 kW = 1,000 W`).
- **W:** Mechanical work in joules (`J`), where `1 J = 1 N·m`.
- **F:** Applied force in newtons (`N`).
- **d:** Displacement in meters (`m`).
- **θ:** Angle between the force vector and direction of motion (`cos(0°) = 1` when aligned).
- **t:** Elapsed time in seconds (`s`).

Because `d / t` defines velocity (`v`), instantaneous linear power simplifies to `P = F × v × cos(θ)`. For rotating shafts—such as electric motors, turbines, and internal combustion engines—power equals torque (`τ` in `N·m`) multiplied by angular velocity (`ω` in `rad/s`), or in terms of revolutions per minute (`N` in RPM):

```text
P_rot = τ × ω = (2π × N × τ) / 60
```

### Electrical Power and Unit Conversions

In direct-current (DC) circuits, power equals the product of voltage and current, which combines with Ohm's Law (`V = I × R`) to yield three equivalent forms:

```text
P = V × I = I² × R = V² / R
```

In alternating-current (AC) systems, resistive heating still follows RMS values, but inductive loads (motors, transformers) introduce a phase angle `φ`. Active (real) AC power is `P = V_rms × I_rms × cos(φ)` in watts, distinguishing usable work from apparent power (`S = V_rms × I_rms` in volt-amperes, VA).

Key conversion constants used in engineering specs:
- **1 Watt (W):** `1 J/s` (`0.001 kW`).
- **1 Mechanical Horsepower (hp):** `745.7 W` (`550 ft·lbf/s`).
- **1 Metric Horsepower (PS / CV):** `735.5 W`.
- **1 Kilowatt-hour (kWh):** `3,600,000 J` (`3.6 MJ` of total energy, not power).

## Step-by-Step Worked Engineering Examples

### Example 1: Sizing a Hoist Motor for a Mechanical Lift

Suppose a rooftop crane must lift a `450 kg` HVAC condenser unit vertically by `18 m` in `24 seconds`, and the hoist gearbox operates at `82%` overall mechanical efficiency (`η = 0.82`). Using gravitational acceleration `g = 9.81 m/s²`:

1. **Calculate lifting force (weight):**
   `F = m × g = 450 kg × 9.81 m/s² = 4,414.5 N`
2. **Calculate total gravitational work:**
   `W = F × d = 4,414.5 N × 18 m = 79,461 J` (`79.46 kJ`)
3. **Calculate useful mechanical output power:**
   `P_out = W / t = 79,461 J / 24 s = 3,310.88 W` (`3.31 kW`, or `4.44 hp`)
4. **Account for drivetrain efficiency to find required electrical input:**
   `P_in = P_out / η = 3,310.88 W / 0.82 = 4,037.65 W` (`4.04 kW`)

The remaining `726.77 W` (`P_in − P_out`) dissipates as friction and heat inside the gearbox and motor windings.

### Example 2: Converting Appliance Power to Monthly Energy Cost

Suppose an electric space heater draws `1,800 W` (`1.8 kW`) for `4.5 hours` per day over a `30-day` billing cycle at an electricity rate of `$0.16 per kWh`:

1. **Daily energy consumption:** `E_day = 1.8 kW × 4.5 h = 8.1 kWh` (`29.16 MJ`)
2. **Monthly energy consumption:** `E_month = 8.1 kWh/day × 30 days = 243 kWh`
3. **Monthly operating cost:** `243 kWh × $0.16/kWh = $38.88`

## Power Output Benchmarks Across Physical Systems

| System or Device | Typical Power Output | Energy Transferred per Hour | Primary Domain & Limiting Factor |
| --- | --- | --- | --- |
| USB-PD Smartphone Charger | 20 W – 45 W | 72 kJ – 162 kJ (0.02–0.045 kWh) | Regulated DC conversion; thermal dissipation |
| Human Sustained Cycling | 150 W – 400 W | 0.54 MJ – 1.44 MJ | Aerobic metabolic rate (VO2 max) |
| Residential Microwave / Hair Dryer | 1,200 W – 1,800 W | 4.32 MJ – 6.48 MJ (1.2–1.8 kWh) | 120 V / 15 A US branch circuit ceiling |
| Level 2 Home EV Charger (240 V, 40 A) | 9.6 kW | 34.56 MJ (9.6 kWh) | NEC 80% continuous rating on 50 A breaker |
| Compact Sedan at 65 mph Highway Cruise | 15 kW – 25 kW (20–34 hp) | 54 MJ – 90 MJ | Aerodynamic drag (`P ∝ v³`) + rolling resistance |
| Mid-Size Electric Sedan Peak Output | 220 kW (~295 hp) | 792 MJ (theoretical 1 h peak) | Inverter current limit & battery C-rate |
| Utility Onshore Wind Turbine (Rated) | 3.6 MW (3,600 kW) | 12,960 MJ (3,600 kWh) | Rotor swept area (`P ∝ v_wind³`) & generator rating |

## Real-World Pitfalls, Safety Limits, and Precision Caveats

### Confusing Power (kW) with Energy (kWh)

The single most frequent error in residential solar, EV charging, and utility billing analysis is conflating power with energy. A `10 kWh` home battery stores a fixed energy volume, whereas its `5 kW` inverter caps the instantaneous power it can push to appliances. Running a `5 kW` load drains that `10 kWh` battery in `2 hours`; running a `500 W` (`0.5 kW`) load extends runtime to `20 hours`. Commercial electricity tariffs also bill both separately: an energy charge per `kWh` consumed and a demand charge based on the single highest `15-minute` average `kW` peak during the month.

### Peak vs. Continuous Ratings and NEC Safety Margins

Nameplate ratings often advertise short-duration peak power rather than sustainable continuous power. Induction motors draw `5×` to `7×` their running power as inrush current during the first fraction of a second at startup, and audio amplifiers rate brief millisecond transients far above RMS continuous output. In North American residential and commercial wiring, the National Electrical Code (NEC) mandates an `80%` continuous load ceiling for circuits operating three hours or longer. A standard `120 V`, `15 A` branch circuit has a theoretical maximum of `1,800 W` (`120 × 15`), but its safe continuous limit is `1,440 W` (`1,800 × 0.80`) to prevent nuisance breaker trips and conductor overheating.

### Aerodynamic and Thermal Scaling Laws

In transportation and fluid mechanics, resistive power does not scale linearly with speed. Aerodynamic drag force rises with the square of velocity (`F_d ∝ v²`), meaning the mechanical power required to overcome wind resistance scales with the **cube** of velocity (`P = F_d × v ∝ v³`). Doubling highway speed or wind turbine flow speed demands eight times more power, explaining why electric vehicle range drops sharply above `70 mph` and why slight increases in rotor airflow dramatically boost wind-farm output.
