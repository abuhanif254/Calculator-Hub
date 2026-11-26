---
title: "The Physics of Free Fall: Gravity in a Vacuum"
description: "Master vacuum free-fall kinematics, drop time, impact velocity, and nonzero initial-velocity drops, plus when air drag changes real-world fall behavior."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "free-fall-calculator"
relatedType: "calculator"
faqs:
  - question: "Why do a bowling ball and a feather hit the ground simultaneously in a vacuum?"
    answer: "Newton's second law states acceleration equals net force divided by inertial mass (a = F / m), while gravitational force equals gravitational mass times field strength (F = m × g). Because inertial and gravitational mass are equal, m cancels out completely (a = g), so every object accelerates at 9.80665 m/s² in a vacuum regardless of mass or density."
  - question: "What is the exact value of standard Earth gravity, and does it vary by location?"
    answer: "Standard Earth gravity (1 g) is defined internationally as 9.80665 m/s² (32.174 ft/s²). Actual local surface gravity varies slightly from 9.780 m/s² at the equator to 9.832 m/s² at the poles because Earth bulges at the equator and rotates, creating an outward centrifugal effect that reduces apparent downward acceleration."
  - question: "How far does an object fall in the first 1, 2, and 3 seconds from rest?"
    answer: "Using h = 0.5 × g × t² with g = 9.81 m/s², an object falls 4.91 m (16.1 ft) in 1 second, 19.62 m (64.4 ft) in 2 seconds, and 44.15 m (144.8 ft) in 3 seconds. Because distance scales with time squared, doubling the fall time quadruples the distance fallen."
  - question: "How do free-fall equations change if an object is thrown downward or upward?"
    answer: "When initial velocity v_i is nonzero, you must retain the linear velocity term in the kinematic equations: h = v_i × t + 0.5 × g × t² and v_f² = v_i² + 2 × g × h (taking downward as positive). Throwing an object upward gives v_i a negative sign, extending total flight time while producing the exact same impact speed as throwing it downward at the same speed."
  - question: "When do vacuum free-fall equations break down due to air resistance?"
    answer: "For dense compact objects such as steel spheres or stones, vacuum equations stay within roughly 5% accuracy for drops under 30 to 50 meters. For light, high-drag objects (feathers, leaves, parachutes) or high-altitude drops above 100 meters, quadratic aerodynamic drag opposes gravity until net acceleration reaches zero at terminal velocity."
---

Free fall occurs when gravity is the sole force acting on a moving body, accelerating every object downward at an identical constant rate regardless of mass or composition. On Earth under vacuum conditions, standard gravitational acceleration equals `9.80665 m/s²` (`32.174 ft/s²`), meaning a dropped object gains `9.81 m/s` (`21.9 mph`) of downward speed every second while falling a distance proportional to the square of elapsed time (`h = 0.5 × g × t²`).

In everyday air, light objects with large surface-area-to-mass ratios experience upward aerodynamic drag that slows their descent, creating the illusion that heavy objects inherently fall faster. Remove the air—as demonstrated inside NASA's Space Power Facility vacuum chamber and during Apollo 15 on the Moon—and a falcon feather and a geological hammer strike the floor at the exact same instant. Our [Free Fall Calculator](/en/calculators/free-fall-calculator) solves for fall time, impact velocity, drop height, or local gravity, supporting nonzero initial velocities and both metric and US customary units.

## Free-Fall Kinematic Equations and Parameter Definitions

Assuming constant gravitational acceleration and negligible air drag, vacuum free fall obeys four core kinematic equations:

```text
Dropped from Rest (v_i = 0):
  Drop Distance:         h = 0.5 × g × t²
  Fall Time:             t = √(2 × h / g)
  Impact Velocity:       v = g × t = √(2 × g × h)

With Initial Velocity (v_i ≠ 0, downward positive):
  Vertical Displacement: h = v_i × t + 0.5 × g × t²
  Final Velocity:        v_f = v_i + g × t
  Time-Independent:      v_f² = v_i² + 2 × g × h

Aerodynamic Limit (with Air Drag):
  Terminal Velocity:     v_t = √[(2 × m × g) / (ρ × A × C_d)]
```

* **`h` (Drop Height or Vertical Displacement, m):** Distance fallen (`1 ft = 0.3048 m`; `1 yd = 0.9144 m`).
* **`t` (Elapsed Fall Time, s):** Duration from release until impact.
* **`v_i`, `v_f` (Initial and Final Velocity, m/s):** Vertical speed at release and impact (`1 m/s = 2.23694 mph = 3.6 km/h`).
* **`g` (Gravitational Acceleration, m/s²):** Standard Earth value `9.80665 m/s²` (`9.81 m/s²` in engineering shorthand; `1.62 m/s²` on the Moon; `3.71 m/s²` on Mars).
* **`ρ`, `A`, `C_d` (Air Parameters):** Air density (`1.225 kg/m³` at sea level), cross-sectional frontal area (`m²`), and dimensionless drag coefficient (`~0.47` for a smooth sphere, `~1.0–1.3` for a flat-falling skydiver).

### Quadratic Time Scaling and Local Gravity Variations

Because `h = 0.5 × g × t²`, distance grows rapidly during later seconds of a drop: an object covers `4.91 m` during its first second, `14.72 m` during its second second (`19.62 m` cumulative), and `24.53 m` during its third second (`44.15 m` cumulative). Meanwhile, Earth's sea-level `g` varies by roughly `0.53%` globally—from `9.780 m/s²` at the equator to `9.832 m/s²` at the poles—because equatorial bulge increases distance from Earth's center while axial rotation adds outward centrifugal relief.

## Step-by-Step Worked Example: Drop Tower vs. Thrown Payloads

Consider testing an impact sensor dropped from a `45.0 m` (`147.6 ft`) tower under `g = 9.81 m/s²` across three release conditions.

**Case A — Dropped from Rest (`v_i = 0 m/s`):**

1. **Compute fall time:** `t = √(2 × 45.0 / 9.81) = √(90.0 / 9.81) = √9.1743 = 3.029 s`.
2. **Compute impact velocity:** `v_f = 9.81 × 3.029 = 29.71 m/s` (`66.47 mph` or `107.0 km/h`).
3. **Cross-check via energy equation:** `v_f = √(2 × 9.81 × 45.0) = √882.9 = 29.71 m/s`.

**Case B — Thrown Downward (`v_i = +5.00 m/s`):**

1. **Solve impact speed directly:** `v_f = √(5.00² + 2 × 9.81 × 45.0) = √(25.0 + 882.9) = √907.9 = 30.13 m/s` (`67.40 mph`).
2. **Solve fall time:** `t = (30.13 − 5.00) / 9.81 = 25.13 / 9.81 = 2.562 s`. Adding `5.00 m/s` of downward launch speed cuts drop duration by `0.467 s` (`15.4%`) while raising impact speed by only `0.42 m/s` (`1.4%`).

**Case C — Thrown Upward (`v_i = −5.00 m/s`, upward negative):**

1. **Impact speed:** `v_f = √((−5.00)² + 882.9) = 30.13 m/s`—identical to Case B because the sensor returns past the tower ledge at `+5.00 m/s` downward.
2. **Total flight time:** `t = (30.13 − (−5.00)) / 9.81 = 35.13 / 9.81 = 3.581 s`.

## Vacuum Free-Fall Time and Velocity by Drop Height

The benchmark table below compares vacuum drop times and impact speeds on Earth (`g = 9.81 m/s²`) against lunar gravity (`g = 1.62 m/s²`) for objects released from rest.

| Drop Height | Earth Fall Time | Earth Impact Velocity | Earth Impact Speed | Moon Fall Time (`1.62 m/s²`) |
| :--- | :--- | :--- | :--- | :--- |
| 1.50 m (4.9 ft) | 0.553 s | 5.42 m/s | 12.1 mph | 1.361 s |
| 10.0 m (32.8 ft) | 1.428 s | 14.01 m/s | 31.3 mph | 3.514 s |
| 30.0 m (98.4 ft) | 2.473 s | 24.26 m/s | 54.3 mph | 6.086 s |
| 120.0 m (393.7 ft) | 4.946 s | 48.52 m/s | 108.5 mph | 12.172 s |
| 300.0 m (984.3 ft) | 7.821 s | 76.72 m/s | 171.6 mph | 19.245 s |
| 500.0 m (1,640 ft) | 10.096 s | 99.04 m/s | 221.6 mph | 24.845 s |

## Engineering Applications, Air Drag, and Accuracy Limits

Vacuum free-fall modeling underpins microgravity drop-tower experiments (such as the `2.2 s` and `5.18 s` evacuated shafts at NASA Glenn Research Center), industrial drop-test certification for electronics and hazardous packaging, and construction fall-clearance calculations. Field engineers also estimate deep vertical shaft or well depths by timing a dropped stone (`h ≈ 0.5 × g × t²`), adjusting for sound return speed (`343 m/s`).

Guard against four recurring mistakes when applying free-fall equations:

* **Neglecting terminal velocity in long drops:** A belly-to-earth skydiver reaches terminal velocity near `54 m/s` (`121 mph`) within roughly `12 s` (`~450 m`). Vacuum formulas predict `117.7 m/s` at `12 s`, overstating actual air-drag speed by more than double.
* **Forgetting acoustic return delay:** When estimating cliff or well depth by sound, total stopwatch time equals fall time (`√(2h/g)`) plus sound travel time (`h / 343`); omitting acoustic lag overestimates a `100 m` shaft by `0.29 s` (`~13 m` error).
* **Reversing signs on `v_i` and `g`:** Keep a consistent axis. If upward is positive, set `g = −9.81 m/s²` and `h = −45.0 m` for a downward drop so the square-root argument stays positive.
* **Using surface `g` for suborbital re-entry:** Rocket stages and weather balloons descending from `30–100 km` altitude experience both lower gravity (`~9.5–9.7 m/s²`) and exponentially changing air density, requiring numerical step integration rather than closed-form vacuum formulas.
