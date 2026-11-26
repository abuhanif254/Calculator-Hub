---
title: "The Ultimate Guide to Calculating Volume: Formulas for Every Shape"
description: "Master the math of 3D space. Learn the formulas for calculating the volume of cubes, cylinders, cones, and spheres, and use our free Volume Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "volume-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the relationship between the volume of a cylinder and a cone?"
    answer: "A right circular cone has exactly one-third the volume of a right circular cylinder with the same base radius and perpendicular height: V_cone = (1/3) × π × r² × h. If you fill a cone with water three times and pour it into a matching cylinder, it fills the cylinder completely."
  - question: "How do I convert cubic feet into US gallons or liters?"
    answer: "Multiply cubic feet by 7.48052 to get US liquid gallons, or by 28.31685 to get liters. Conversely, divide gallons by 7.48052 to find cubic feet. For metric volumes, 1 cubic meter equals exactly 1,000 liters (and 1 cubic centimeter equals 1 milliliter)."
  - question: "What happens to an object's volume if I double all of its dimensions?"
    answer: "Volume scales with the cube of linear dimensions (2³ = 8). Doubling the length, width, and height of a box—or doubling the radius of a sphere—increases its volume by a factor of 8, while surface area increases by a factor of 4."
  - question: "How do I calculate the volume of a tapered bucket or frustum?"
    answer: "Use the conical frustum formula: V = (1/3) × π × h × (R² + R×r + r²), where R is the larger radius, r is the smaller radius, and h is the perpendicular height between the two parallel circular faces. This is significantly more accurate than simply averaging the top and bottom radii."
  - question: "Should I use inner or outer dimensions when calculating container volume?"
    answer: "Use internal dimensions (subtracting twice the wall thickness from outer diameter, length, and width) to measure liquid capacity or storage volume. Use the difference between outer volume and inner volume (V_outer − V_inner) when estimating how much concrete, steel, or plastic is required to manufacture the vessel itself."
---

Volume measures the three-dimensional space enclosed by a solid or container, expressed in cubic units such as cubic meters (`m³`), cubic feet (`ft³`), or liters (`1 m³ = 1,000 L`). Across geometry, standard solids follow two core rules: uniform cross-section shapes use `Base Area × Height`, while tapered solids converging to an apex scale that product by one-third: `(1/3) × Base Area × Height`.

Understanding those relationships simplifies estimating concrete yardage, tank fluid capacity, shipping displacement, and part mass. Compute exact volumes and convert seamlessly among cubic inches, cubic feet, cubic meters, liters, and US gallons in our [Volume Calculator](/en/calculators/volume-calculator).

## Core 3D Volume Formulas and Geometric Principles

Under **Cavalieri's Principle**, any two solids of equal perpendicular height whose cross-sections have identical areas at every elevation share the exact same volume. Consequently, an oblique (slanted) cylinder or prism uses the same formula as a vertical one—provided you measure **perpendicular height (`h`)** rather than slanted side length.

```text
Cube                   V = a³
Rectangular Prism      V = l × w × h
Right/Oblique Cylinder V = π × r² × h
Cone                   V = (1/3) × π × r² × h
Pyramid                V = (1/3) × B × h
Sphere                 V = (4/3) × π × r³
Conical Frustum        V = (1/3) × π × h × (R² + R × r + r²)
```

Where:
- `a` is cube edge length; `l`, `w`, and `h` are length, width, and perpendicular height.
- `r` is circular or spherical radius (`diameter / 2`); `R` and `r` in a frustum are large and small end radii.
- `B` is polygon base area (`s²` for a square pyramid).
- `π` (`pi ≈ 3.14159265`) is the circumference-to-diameter ratio.

### Converting Volume to Liquid and Material Units

Construction and fluid workflows rely on standard unit equivalences:
- `1 yd³ = 27 ft³` (ready-mix concrete ordering unit)
- `1 ft³ = 1,728 in³ ≈ 7.48052 US gal ≈ 28.3168 L`
- `1 m³ = 1,000 L ≈ 35.3147 ft³ ≈ 264.172 US gal`
- `1 cm³ (cc) = 1 mL` (exact metric lab and displacement equivalence)

## Step-by-Step Worked Examples

Standardizing input units before multiplying eliminates the most frequent estimation mistakes on job sites.

### Example 1: Ordering Concrete for a Patio Slab

Suppose you pour a rectangular concrete patio measuring `24 ft` by `12 ft` at `4 inches` thick. Concrete is ordered in **cubic yards (`yd³`)**.

1. **Standardize units to feet:** `4 in / 12 = 0.33333 ft` (`1/3 ft`).
2. **Apply `V = l × w × h`:** `24 ft × 12 ft × (1/3) ft = 96.0 ft³`.
3. **Convert to cubic yards:** `96.0 / 27 = 3.5556 yd³`.
4. **Add a `10%` waste allowance:** `3.5556 × 1.10 = 3.91 yd³` (order `4.0 yd³` to cover subgrade dips).

### Example 2: Cylindrical Water Storage Cistern

Consider a vertical cylindrical rainwater tank with an internal diameter of `6 ft` and fill depth of `8 ft`.

1. **Convert diameter to radius:** `r = 6 / 2 = 3.0 ft`.
2. **Apply `V = π × r² × h`:** `3.14159265 × (3.0)² × 8.0 = 226.195 ft³`.
3. **Convert to US gallons:** `226.195 × 7.48052 = 1,692.06 US gal` (`6,405.1 L`).
4. **Check static water load:** At `8.345 lb/gal`, full water weight reaches `14,120 lb` (`7.06` short tons) for pad design.

## Quick-Reference Volume Formulas and Scaling Comparison

Because volume scales cubically (`L³`), doubling every linear dimension multiplies enclosed capacity eightfold (`2³ = 8`).

| Shape | Volume Formula | Inputs | 2× Size Multiplier | Common Application |
| :--- | :--- | :--- | :--- | :--- |
| Cube | `a³` | Side (`a`) | `8×` | Packaging boxes, density blocks |
| Rectangular Prism | `l × w × h` | `l`, `w`, `h` | `8×` | Slabs, HVAC room air, cargo |
| Cylinder | `π × r² × h` | `r`, `h` | `8×` | Pipes, silos, engine bores |
| Cone | `(1/3) × π × r² × h` | `r`, `h` | `8×` | Grain piles, hopper bottoms |
| Square Pyramid | `(1/3) × s² × h` | `s`, `h` | `8×` | Hip roofs, earthwork piles |
| Sphere | `(4/3) × π × r³` | `r` | `8×` | Pressure tanks, bearings |
| Conical Frustum | `(1/3) × π × h × (R² + Rr + r²)` | `R`, `r`, `h` | `8×` | Tapered buckets, nozzles |

## Measurement Pitfalls, Wall Thickness, and Precision Guidelines

Physical containers deviate from idealized geometry. Verify these five checks before finalizing material orders:

- **Diameter vs. radius (`4×` or `8×` error):** Entering diameter directly into `π × r² × h` inflates cylinders fourfold (`2²`) and spheres eightfold (`2³`). Always halve diameter first, or use `(π / 4) × d² × h` and `(π / 6) × d³`.
- **Mixed measurement units:** Multiplying `24 ft × 12 ft × 4 in` produces invalid hybrid units. Convert every dimension to one common unit first.
- **Slant height (`l`) vs. perpendicular height (`h`):** On cones and pyramids, measuring along the sloping wall yields slant height `l`. Recover vertical height via `h = √(l² − r²)`.
- **Pipe and tank wall thickness:** Outer diameter (`OD`) overstates internal fluid capacity. Subtract twice wall thickness (`ID = OD − 2t`), or compute shell material volume via `V_shell = π × (R_outer² − r_inner²) × h`.
- **Horizontal cylindrical partial fills:** Unlike vertical tanks, a horizontal cylinder's fluid volume varies nonlinearly with dipstick depth via the circular segment area formula.
