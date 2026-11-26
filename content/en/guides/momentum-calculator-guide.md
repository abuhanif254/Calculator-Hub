---
title: "Understanding Momentum: The Physics of Collisions"
description: "Master linear momentum, the impulse-momentum theorem, and conservation in elastic vs. inelastic collisions with worked examples and unit conversions."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "momentum-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between momentum and kinetic energy?"
    answer: "Momentum (p = m × v) is a vector quantity proportional to the first power of velocity and conserved in every isolated collision, regardless of deformation or heat. Kinetic energy (KE = 0.5 × m × v²) is a scalar quantity proportional to velocity squared and is conserved only in perfectly elastic collisions. Doubling an object's speed doubles its momentum but quadruples its kinetic energy."
  - question: "How does the impulse-momentum theorem explain airbag safety?"
    answer: "Impulse equals the change in momentum (J = F_avg × Δt = Δp). In a vehicle crash, an occupant's momentum change from highway speed to zero is fixed by mass and initial velocity. An airbag and crumple zone increase the deceleration time Δt from roughly 0.02 seconds to 0.12 seconds, cutting the average impact force F_avg on the body by more than 80%."
  - question: "Why is momentum conserved in inelastic collisions even when energy is lost?"
    answer: "During an inelastic collision, internal contact forces deform metal, generate acoustic waves, and raise surface temperatures, converting macroscopic kinetic energy into thermal and vibrational energy. Because those contact forces are strictly internal action-reaction pairs (equal and opposite by Newton's third law), their impulses cancel across the two-body system, leaving total vector momentum unchanged."
  - question: "Can momentum be negative, and what does a minus sign mean?"
    answer: "Yes. Because velocity is a vector, momentum carries both magnitude and direction along a chosen coordinate axis. A negative momentum value simply indicates motion opposite to the defined positive direction—for example, a westbound car in an eastbound-positive coordinate frame. In head-on collisions, failing to assign opposite signs to opposing velocities produces large calculation errors."
  - question: "How are kg·m/s and N·s related?"
    answer: "They are mathematically identical SI units. One Newton equals 1 kg·m/s², so multiplying Newtons by seconds yields (kg·m/s²) × s = kg·m/s. Engineers typically report instantaneous state momentum in kg·m/s and collision impulse transfers in Newton-seconds (N·s), though both express the exact same physical dimension."
---

Linear momentum quantifies an object's translational motion by multiplying its mass by its velocity (`p = m × v`), expressed in standard SI units as kilogram-meters per second (`kg·m/s`) or Newton-seconds (`N·s`). Because momentum is a vector, it carries both magnitude and direction: two identical vehicles traveling at the same speed in opposite directions have equal momentum magnitudes but opposite signs, summing to zero net momentum for the pair.

In classical mechanics, momentum governs every collision, propulsion event, and impact arrest through the Law of Conservation of Momentum: inside any closed system free of net external forces, total vector momentum before an interaction equals total vector momentum afterward. Whether you are solving for momentum, mass, or velocity across SI and US customary units (`kg`, `lb`, `m/s`, `mph`, `km/h`, `ft/s`) or modeling two-body collisions, our [Momentum Calculator](/en/calculators/momentum-calculator) computes exact values and converts units automatically.

## Core Momentum Equations and Parameter Definitions

Momentum analysis links state motion (`p`), time-integrated force (`J`), and two-body collision outcomes through the following relationships:

```text
Linear Momentum:           p = m × v
Solve for Mass:            m = p / v
Solve for Velocity:        v = p / m
Impulse-Momentum Theorem:  J = F_avg × Δt = Δp = m × (v_f − v_i)
Two-Body Conservation:     m₁v₁_i + m₂v₂_i = m₁v₁_f + m₂v₂_f
Perfectly Inelastic:       v_f = (m₁v₁_i + m₂v₂_i) / (m₁ + m₂)
Elastic Final Velocity 1:  v₁_f = [(m₁ − m₂)v₁_i + 2m₂v₂_i] / (m₁ + m₂)
Elastic Final Velocity 2:  v₂_f = [(m₂ − m₁)v₂_i + 2m₁v₁_i] / (m₁ + m₂)
Momentum-Energy Link:      KE = p² / (2m)
```

* **`p` (Linear Momentum, kg·m/s or N·s):** Product of mass and velocity (`1 kg·m/s = 0.2248 lbf·s`).
* **`m` (Mass, kg):** Inertial mass resisting velocity change (`1 lb = 0.453592 kg`; `1 metric ton = 1,000 kg`).
* **`v` (Velocity, m/s):** Directional speed (`1 mph = 0.44704 m/s`; `1 m/s = 3.6 km/h = 3.28084 ft/s`).
* **`J` (Impulse, N·s):** Net external force multiplied by contact duration (`Δt`), equal to total momentum change (`Δp`).
* **`e` (Coefficient of Restitution, dimensionless):** Ratio of relative separation speed to relative approach speed (`e = 1` for perfectly elastic bounce; `e = 0` for perfectly inelastic sticking).

### Vector Sign Conventions and Momentum vs. Kinetic Energy

Before substituting velocities into any collision formula, establish a single positive axis (such as right or east `+`). An object moving left or west carries a negative velocity and negative momentum. Comparing momentum (`p = mv`) against kinetic energy (`KE = 0.5mv² = p² / 2m`) clarifies why light, fast projectiles behave differently from heavy, slow bodies: a `0.010 kg` rifle bullet at `900 m/s` and a `9.0 kg` bowling ball at `1.0 m/s` share identical momentum (`9.0 kg·m/s`), yet the bullet carries `4,050 J` of kinetic energy—`900×` more destructive energy than the bowling ball's `4.5 J`.

## Step-by-Step Worked Example: Rear-End Vehicle Collision

Consider a `1,500 kg` (`3,307 lb`) sedan traveling east at `v₁_i = +20.0 m/s` (`44.74 mph` or `72.0 km/h`) striking a stationary `1,000 kg` (`2,205 lb`) compact car (`v₂_i = 0 m/s`) on dry level pavement, where tire friction is negligible during the `0.12 s` impact pulse.

**Step 1 — Compute Initial System Totals:**

1. **Initial momentum:** `p_total = (1,500 × 20.0) + (1,000 × 0) = 30,000 kg·m/s` (`30.0 kN·s`).
2. **Initial kinetic energy:** `KE_i = 0.5 × 1,500 × 20.0² = 300,000 J` (`300.0 kJ`).

**Step 2 — Case A: Perfectly Inelastic Collision (`e = 0`, vehicles lock together):**

1. **Common final velocity:** `v_f = 30,000 / (1,500 + 1,000) = 30,000 / 2,500 = +12.0 m/s` (`26.84 mph`).
2. **Final kinetic energy:** `KE_f = 0.5 × 2,500 × 12.0² = 180,000 J` (`180.0 kJ`).
3. **Energy dissipated:** `300,000 − 180,000 = 120,000 J` (`40.0%` converted into structural crush, heat, and sound), while total momentum remains exactly `30,000 kg·m/s`.
4. **Average impact force on compact car:** `Δp₂ = 1,000 × (12.0 − 0) = 12,000 N·s`; dividing by `Δt = 0.12 s` yields `F_avg = 12,000 / 0.12 = 100,000 N` (`100 kN`, or `10.2 g` average acceleration).

**Step 3 — Case B: Perfectly Elastic Collision (`e = 1.0`, zero structural deformation):**

1. **Sedan post-impact velocity:** `v₁_f = [(1,500 − 1,000) × 20.0] / 2,500 = 10,000 / 2,500 = +4.0 m/s` (`8.95 mph`).
2. **Compact car post-impact velocity:** `v₂_f = (2 × 1,500 × 20.0) / 2,500 = 60,000 / 2,500 = +24.0 m/s` (`53.69 mph`).
3. **Verify both conservation laws:** Total momentum equals `1,500(4.0) + 1,000(24.0) = 30,000 kg·m/s`, and total kinetic energy equals `0.5(1,500)(4.0²) + 0.5(1,000)(24.0²) = 12,000 + 288,000 = 300,000 J`.

## Momentum Benchmarks Across Physical Systems

Momentum spans more than eight orders of magnitude from sports projectiles to heavy rail and commercial aviation. Notice how high velocity and large mass combine differently across kinetic energy and momentum.

| System or Object | Mass | Velocity | Linear Momentum | Kinetic Energy |
| :--- | :--- | :--- | :--- | :--- |
| Pitched Baseball | 0.145 kg (5.1 oz) | 40.0 m/s (89.5 mph) | 5.80 kg·m/s | 116.0 J |
| Bowling Ball | 6.00 kg (13.2 lb) | 8.00 m/s (17.9 mph) | 48.0 kg·m/s | 192.0 J |
| Sprinting Athlete | 75.0 kg (165 lb) | 10.0 m/s (22.4 mph) | 750 kg·m/s | 3.75 kJ |
| Family Sedan | 1,500 kg (3,307 lb) | 27.78 m/s (62.1 mph) | 41,670 kg·m/s | 578.8 kJ |
| Loaded Semi-Truck | 36,000 kg (79,366 lb) | 25.0 m/s (55.9 mph) | 900,000 kg·m/s | 11.25 MJ |
| High-Speed Passenger Train | 400,000 kg (400 t) | 83.33 m/s (186.4 mph) | 33.33 M kg·m/s | 1.39 GJ |

## Engineering Applications, Common Errors, and Modeling Limits

Collision forensics, spacecraft thruster sizing, robotics force control, and crashworthiness engineering all rely on momentum conservation. Accident reconstructionists measure post-crash skid distances to determine exit speeds, then work backward via `m₁v₁ + m₂v₂` to reconstruct pre-impact velocities without needing exact crush stiffness curves. In aerospace propulsion, specific impulse (`I_sp`) measures exhaust momentum delivered per unit propellant weight, directly governing orbital delta-v budgets.

Avoid four frequent errors when modeling momentum and collisions:

* **Dropping opposite velocity signs:** In a head-on collision (`+20 m/s` vs. `−15 m/s`), adding scalar speeds instead of signed vectors overstates post-impact velocity and corrupts energy-loss estimates.
* **Assuming kinetic energy stays constant:** Most macroscopic crashes have coefficients of restitution between `0.1` and `0.5`; never apply elastic formulas unless bodies rebound with negligible permanent deformation.
* **Ignoring external impulses:** Conservation strictly applies while external forces are negligible. Over multi-second braking slides, asphalt friction exerts an external impulse (`F_friction × Δt`) that continuously removes system momentum.
* **Applying classical `p = mv` near light speed:** Above roughly `10%` of the speed of light (`3 × 10⁷ m/s`), particle accelerators require the relativistic Lorentz factor (`p = γ × m × v`) to preserve conservation across subatomic collisions.
