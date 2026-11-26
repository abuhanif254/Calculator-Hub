---
title: "Ideal Gas Law Calculator: PV = nRT"
description: "Solve pressure, volume, moles, and absolute temperature using PV = nRT, match the exact gas constant R, and evaluate real-gas compressibility limits."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ideal-gas-law-calculator"
relatedType: "calculator"
faqs:
  - question: "Why must temperature T always be converted to Kelvin in PV = nRT?"
    answer: "The Ideal Gas Law requires an absolute thermodynamic temperature scale where zero corresponds to zero molecular kinetic energy. Using Celsius or Fahrenheit introduces arbitrary offsets that produce false negative pressures or volumes below 0 °C and cause division-by-zero errors right at the freezing point of water."
  - question: "Which value of the ideal gas constant R should I use?"
    answer: "Your choice of R depends strictly on the units of pressure and volume. Use 0.082057 L·atm/(mol·K) for atmospheres and liters, 8.31446 J/(mol·K) for Pascals and cubic meters (or kPa and liters), 62.3637 L·Torr/(mol·K) for vacuum manometry, and 10.7316 ft³·psi/(lbmol·°R) for US engineering."
  - question: "What is the difference between modern IUPAC STP and older standard temperature and pressure?"
    answer: "Since 1982, IUPAC defines Standard Temperature and Pressure (STP) as 273.15 K (0 °C) and 100 kPa (1 bar), giving an ideal molar volume of 22.711 L/mol. Many textbooks still use the legacy 1 atm (101.325 kPa) standard, which yields 22.414 L/mol. SATP (298.15 K, 100 kPa) equals 24.789 L/mol."
  - question: "When does the Ideal Gas Law stop being accurate for real gases?"
    answer: "Deviations grow significant at high pressures (typically above 10–20 atm) where finite molecular volume prevents compression, or at low temperatures near condensation where intermolecular attractions pull molecules inward. Engineers track this departure with the compressibility factor Z = PV / (nRT), which equals 1.00 for an ideal gas."
  - question: "How can PV = nRT calculate gas density or an unknown molar mass?"
    answer: "Substituting moles n = m / M into PV = nRT yields P × M = (m / V) × R × T = ρ × R × T. Rearranging gives gas density ρ = (P × M) / (R × T) or molar mass M = (m × R × T) / (P × V) from a measured sample mass."
---

The **Ideal Gas Law (`PV = nRT`)** is the foundational equation of state linking a gas's absolute pressure (`P`), container volume (`V`), molar quantity (`n`), and absolute temperature (`T`) via the universal gas constant (`R`). It synthesizes Boyle's, Charles's, Gay-Lussac's, and Avogadro's empirical laws into one unified thermodynamic model applicable across chemistry, pneumatics, and process engineering.

The model rests on kinetic molecular theory assumptions: gas particles occupy negligible volume relative to their container, exert zero intermolecular forces except during elastic collisions, and possess average kinetic energy directly proportional to Kelvin temperature. Whenever one of the four state variables is unknown, our [Ideal Gas Law Calculator](/en/calculators/ideal-gas-law-calculator) automatically converts temperature and pressure scales, applies the exact `R` constant, and computes the missing property.

## The Ideal Gas Equation, Gas Constants, and Derived Forms

Algebraic rearrangements of `PV = nRT` isolate any single state variable or extend the equation to gas density (`ρ`), molar mass (`M`), and multi-component mixtures via Dalton's Law of Partial Pressures:

```text
Standard Ideal Gas Law:   P × V = n × R × T
Solve for Pressure:       P = (n × R × T) / V
Solve for Volume:         V = (n × R × T) / P
Solve for Moles:          n = (P × V) / (R × T)
Solve for Temperature:    T = (P × V) / (n × R)
Gas Density Form:         ρ = (P × M) / (R × T)    (where ρ = m / V)
Dalton Mixture Total:     P_total = (n_1 + n_2 + ... + n_k) × R × T / V
```

Strict adherence to absolute scales is mandatory:

- **`P` (Absolute Pressure):** Force per unit area relative to vacuum (`psia`, `atm`, `bar`, `kPa`, `Pa`, `Torr`). Convert gauge readings (`psig`, `barg`) by adding atmospheric pressure (`+14.696 psi` or `+101.325 kPa` at sea level).
- **`V` (Volume):** Container volume in `L`, `m³`, `mL`, or `ft³`.
- **`n` (Amount of Substance):** Moles (`mol = m / M`) or pound-moles (`lbmol`).
- **`T` (Absolute Temperature):** Kelvin (`K = °C + 273.15`) or Rankine (`°R = °F + 459.67`).
- **`R` (Universal Gas Constant):** Exact CODATA constant `8.314462618 J/(mol·K)`, expressed in unit-matched equivalents.

## Step-by-Step Worked Example: Compressed Nitrogen Cylinder

Suppose a `50.0 L` (`0.0500 m³`) high-pressure steel cylinder is charged with `14.0 kg` of dry nitrogen gas (`N₂`, molar mass `M = 28.014 g/mol`) and stabilized at an ambient warehouse temperature of `22.0 °C`. Calculate the internal absolute pressure in `atm`, `bar`, and `psi`, and assess whether real-gas deviation is material.

1. **Convert gas mass to moles (`n`):**
   - `n = 14,000 g / 28.014 g/mol = 499.750 mol`
2. **Convert temperature to Kelvin (`T`):**
   - `T = 22.0 + 273.15 = 295.15 K`
3. **Select `R` matching liters and atmospheres (`0.082057 L·atm/(mol·K)`) and solve for `P`:**
   - `P = (499.750 mol × 0.082057 L·atm/(mol·K) × 295.15 K) / 50.0 L`
   - `P = 12,103.51 L·atm / 50.0 L = 242.07 atm`
4. **Convert absolute pressure to industrial units:**
   - Bar: `242.07 atm × 1.01325 bar/atm = 245.28 bar` (`24.53 MPa`)
   - Pounds per square inch: `242.07 atm × 14.6959 psi/atm = 3,557.4 psia` (`3,542.7 psig` gauge)
5. **Perform a real-gas safety check:**
   - At `~242 atm` and `295 K`, nitrogen's compressibility factor `Z` rises to roughly `1.07` because finite molecular volume restricts free space. Actual cylinder pressure will sit closer to `242.07 × 1.07 ≈ 259 atm` (`~3,806 psia`)—an essential `7%` correction when verifying hydrostatic burst margins.

## Gas Constant (`R`) Reference Table by Unit System

Choosing the wrong value of `R` is the single most frequent calculation error in gas-phase engineering. Match your `P`, `V`, `n`, and `T` units exactly to one row below:

| Unit System | Pressure (`P`) | Volume (`V`) | Amount (`n`) | Temperature (`T`) | Gas Constant (`R`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SI Fundamental** | `Pa` (`N/m²`) | `m³` | `mol` | `K` | `8.31446 J/(mol·K)` |
| **Metric Lab (kPa)** | `kPa` | `L` (`dm³`) | `mol` | `K` | `8.31446 L·kPa/(mol·K)` |
| **Chemistry Standard** | `atm` | `L` | `mol` | `K` | `0.082057 L·atm/(mol·K)` |
| **European Industrial** | `bar` | `L` | `mol` | `K` | `0.083145 L·bar/(mol·K)` |
| **Vacuum / Manometry** | `Torr` (`mmHg`) | `L` | `mol` | `K` | `62.3637 L·Torr/(mol·K)` |
| **US Customary** | `psi` (`psia`) | `ft³` | `lbmol` | `°R` | `10.7316 ft³·psi/(lbmol·°R)` |

Note that `8.31446 J/(mol·K)` works identically for `Pa·m³` and `kPa·L` because `1 kPa × 1 L = 1,000 Pa × 0.001 m³ = 1 Pa·m³ = 1 J`.

## Real-World Applications, Pitfalls, and Non-Ideal Behavior

Across chemistry and mechanical engineering, `PV = nRT` underpins airbag propellant sizing (`NaN₃` to `N₂`), reactor relief venting, and air-density corrections for aviation and wind turbines (`ρ_air` at `25 °C`, `101.325 kPa`, `M_air = 28.9647 g/mol` is `1.184 kg/m³`).

Keep four practical caveats in mind to avoid systematic errors:

- **Wet-gas collection over water:** Water vapor adds saturation vapor pressure (`P_H₂O = 3.169 kPa` or `23.76 Torr` at `25 °C`). Subtract `P_H₂O` from total pressure (`P_dry = P_total − P_H₂O`) before solving for dry gas moles.
- **Gauge vs. absolute pressure:** Entering `0 psig` into `PV = nRT` falsely predicts zero moles inside a vented tank holding `1 atm` of air.
- **High-pressure and cryogenic limits:** Above `~10–20 atm` or near condensation (e.g., `CO₂` near `31 °C`), use the Van der Waals equation `(P + a(n/V)²)(V − nb) = nRT` to correct for molecular attraction (`a`) and excluded volume (`b`).
- **Reacting or dissociating gases:** Equilibria like `N₂O₄ ⇌ 2 NO₂` alter `n` dynamically with temperature, invalidating single-`n` assumptions.
