---
title: "Understanding Density: Why Ice Floats"
description: "Master the mass-to-volume relationship of density, learn why hydrogen bonding makes ice float on water, and compute buoyancy and specific gravity accurately."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "density-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does ice float on liquid water when most solids sink?"
    answer: "When liquid water cools below 4 °C and freezes at 0 °C, hydrogen bonds lock water molecules into an open hexagonal crystal lattice (ice Ih) with wider intermolecular spacing than liquid water. That structural expansion increases volume by roughly 9% for the same mass, lowering ice density to 0.917 g/cm³ compared to 1.000 g/cm³ for liquid water."
  - question: "What is the difference between density and specific gravity?"
    answer: "Density is an absolute physical quantity with units of mass per unit volume, such as 2,700 kg/m³ or 2.70 g/cm³. Specific gravity (SG) is a dimensionless ratio comparing a substance's density to a reference fluid—typically pure water at 4 °C (1.000 g/cm³). An alloy with a density of 7.85 g/cm³ has a specific gravity of 7.85."
  - question: "Does changing the size or shape of an object change its density?"
    answer: "No, provided the material is homogeneous and contains no internal voids. Density is an intensive property: cutting a solid copper bar in half reduces both its mass and its volume by 50%, leaving the mass-to-volume ratio unchanged at 8.96 g/cm³."
  - question: "How do you convert g/cm³ to kg/m³ and lb/ft³?"
    answer: "Multiply g/cm³ by 1,000 to obtain kg/m³, and multiply g/cm³ by 62.428 to convert to pounds per cubic foot (lb/ft³). For example, pure water at 1.000 g/cm³ equals 1,000 kg/m³ or 62.43 lb/ft³."
  - question: "How much of an iceberg sits underwater in the ocean?"
    answer: "By Archimedes' principle, the submerged fraction equals the ratio of ice density to surrounding seawater density. With glacial ice averaging 917 kg/m³ and cold surface seawater near 1,025 kg/m³, roughly 89.5% of an iceberg's total volume remains submerged while only 10.5% rises above the waterline."
---

Density measures how tightly matter is packed within a given three-dimensional space, defined mathematically as an object's mass divided by its volume. While mass quantifies the total matter inside an object and volume measures the physical space it occupies, density links both properties into a single intensive constant that identifies pure substances regardless of sample size. A single gold coin and a 400-troy-ounce bullion bar differ enormously in total mass and volume, yet both share the exact same density of `19.32 g/cm³`.

That ratio also governs buoyancy: any solid or fluid immersed in a denser medium experiences an upward buoyant force exceeding its own weight and rises to the surface. Because liquid water reaches peak density at `3.98 °C` before expanding into an open hexagonal crystal lattice upon freezing, ice becomes roughly `8.3%` less dense than cold freshwater and floats. Whether you are verifying alloy authenticity, sizing marine ballast, or calculating fluid displacement, our [Density Calculator](/en/calculators/density-calculator) solves instantly for density, mass, or volume across SI and US customary units.

## Core Density Equations and Buoyancy Mechanics

Three algebraic forms relate mass, volume, and density, while specific gravity and Archimedes' principle extend the relationship to multi-material mixtures and floating bodies:

```text
Density:             ρ = m / V
Mass from Density:   m = ρ × V
Volume from Density: V = m / ρ
Specific Gravity:    SG = ρ_material / ρ_water (1,000 kg/m³ at 4 °C)
Buoyant Force:       F_b = ρ_fluid × V_submerged × g
Submerged Fraction:  f_sub = ρ_object / ρ_fluid  (for floating equilibrium)
```

* **`ρ` (Density, kg/m³ or g/cm³):** Mass concentration per unit volume (`1 g/cm³ = 1,000 kg/m³ = 62.428 lb/ft³`).
* **`m` (Mass, kg, g, or lb):** Quantity of matter, independent of local gravity.
* **`V` (Volume, m³, cm³, L, or ft³):** Enclosed spatial volume (`1 L = 1,000 cm³ = 0.001 m³`).
* **`SG` (Specific Gravity, dimensionless):** Relative density referenced to pure water (`1.000 g/cm³`) for solids and liquids, or dry air (`1.204 kg/m³` at `20 °C`, `1 atm`) for gases.
* **`F_b` (Buoyant Force, N):** Upward hydrostatic force equal to the weight of the displaced fluid volume (`V_submerged`).

### Why Ice Expands and Floats on Water

Most materials contract steadily as thermal energy drops, packing atoms closer together so the solid phase sinks in its own melt. Liquid water follows this normal pattern only down to `3.98 °C`, where it achieves its maximum density of `0.99997 g/cm³`. Below `4 °C`, directional hydrogen bonds begin forcing adjacent `H₂O` molecules into tetrahedral arrangements that contain microscopic empty pockets.

When water freezes at `0 °C`, the resulting hexagonal crystal lattice (ice Ih) occupies roughly `9%` more space than the same mass of liquid water, dropping density to `0.9167 g/cm³` (`916.7 kg/m³`). Because `0.9167` is less than liquid water's `0.9998 g/cm³` at the freezing point, ice floats. Without this anomaly, winter ice would sink to lakebeds and ocean floors, insulating deeper layers from solar warmth and freezing aquatic ecosystems from the bottom up.

## Step-by-Step Worked Examples: Buoyancy and Alloy Verification

Applying density equations accurately requires matching mass and volume units before dividing. Two practical engineering calculations illustrate how density governs both marine floatation and quality inspection.

**Example 1 — Arctic Iceberg Draft in Seawater:** Suppose a tabular iceberg measures `12,000 m³` in total volume with a mean glacial ice density of `917 kg/m³`, floating in cold polar seawater of density `1,025 kg/m³`.

1. **Compute total iceberg mass:** `m = 917 kg/m³ × 12,000 m³ = 11,004,000 kg` (`11,004 metric tons`).
2. **Determine displaced seawater volume:** At static equilibrium, the iceberg displaces a mass of seawater equal to its own mass: `V_sub = 11,004,000 kg / 1,025 kg/m³ = 10,735.6 m³`.
3. **Calculate submerged and exposed percentages:** `f_sub = 10,735.6 / 12,000 = 0.8946` (`89.46%` underwater), leaving `10.54%` (`1,264.4 m³`) protruding above the sea surface.

**Example 2 — Identifying a Machined Metal Billet:** A precision-turned cylindrical shaft measures `r = 2.50 cm` in radius and `h = 8.00 cm` in length, with an analytical balance mass of `424.1 g`.

1. **Calculate geometric volume:** `V = π × r² × h = 3.14159 × (2.50 cm)² × 8.00 cm = 157.08 cm³`.
2. **Compute material density:** `ρ = 424.1 g / 157.08 cm³ = 2.700 g/cm³` (`2,700 kg/m³`).
3. **Verify alloy grade:** Comparing `2.70 g/cm³` against standard engineering tables positively identifies 6061 aluminum alloy rather than titanium (`4.51 g/cm³`) or 304 stainless steel (`7.93 g/cm³`).

## Density Benchmarks Across Gases, Liquids, and Solids

Reference densities at standard temperature and pressure (`20 °C`, `1 atm` unless noted) span nearly five orders of magnitude from atmospheric gases to dense heavy metals.

| Substance | Density (g/cm³) | Density (kg/m³) | Density (lb/ft³) | Specific Gravity | Freshwater Behavior (`1.00 g/cm³`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Dry Air (20 °C, 1 atm) | 0.001204 | 1.204 | 0.075 | 0.0012 | Rises rapidly as bubbles |
| Natural Cork | 0.24 | 240 | 15.0 | 0.24 | Floats (`24%` submerged) |
| Pure Ice (0 °C) | 0.917 | 917 | 57.2 | 0.917 | Floats (`91.7%` submerged) |
| Freshwater (4 °C) | 1.000 | 1,000 | 62.4 | 1.000 | Reference baseline |
| Seawater (Surface, 35 PSU) | 1.025 | 1,025 | 64.0 | 1.025 | Sinks beneath freshwater |
| Aluminum (6061 Alloy) | 2.70 | 2,700 | 168.6 | 2.70 | Sinks rapidly |
| Pure Lead | 11.34 | 11,340 | 707.9 | 11.34 | Sinks rapidly |

## Industrial Applications, Measurement Pitfalls, and Precision Caveats

Accurate density control underpins naval architecture, civil concrete batching, battery electrolyte diagnostics, and petrochemical custody transfer. Ships carry Plimsoll load-line markings specifically because hull draft increases when transitioning from dense cold seawater (`1,025 kg/m³`) into brackish or freshwater river ports (`1,000 kg/m³`), reducing reserve buoyancy by `2.4%`. In meteorology and aviation, lower air density on hot summer days or high-elevation runways reduces aerodynamic lift and engine mass flow, lengthening required takeoff distances.

Avoid four frequent errors when measuring or applying density values:

* **Confusing bulk density with particle density:** Granular materials such as sand, soil, coffee beans, or pharmaceutical powders trap air between grains. Bulk density (`~1,500–1,600 kg/m³` for dry quartz sand) is substantially lower than true mineral grain density (`2,650 kg/m³`).
* **Ignoring thermal expansion:** Because volume expands as temperature rises while mass stays fixed, density decreases with heat. Gasoline expands roughly `0.1%` per `1 °C`, requiring temperature-corrected volume metering at `60 °F` (`15.6 °C`) in fuel logistics.
* **Neglecting internal porosity or trapped air:** A hollow steel ship floats because its *average* bulk density—total steel plus enclosed cabin air divided by hull volume—is far lower than solid steel's `7.85 g/cm³`. Submerging a porous sample without vacuum degassing underestimates true material density.
* **Mixing fluid volume and mass units:** Never divide grams by liters or pounds by cubic inches without converting first; mixing metric and customary bases introduces `1,000×` or `1,728×` errors instantly.
