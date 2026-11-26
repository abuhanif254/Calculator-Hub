---
title: "Molarity Dilution: The M1V1 = M2V2 Formula"
description: "Learn how to prepare lab solutions from concentrated stock. Understand the M1V1 = M2V2 formula and use our free Molarity Dilution Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "molarity-dilution-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does M1V1 = M2V2 hold true when you dilute a solution?"
    answer: "Adding pure solvent increases total solution volume without adding or removing dissolved solute molecules. Because total moles of solute remain invariant before and after dilution (n₁ = n₂), and moles equal molarity multiplied by volume in liters (n = M × V), the product M₁V₁ must equal M₂V₂."
  - question: "Do I have to convert milliliters to liters before using M1V1 = M2V2?"
    answer: "No, as long as V₁ and V₂ use the exact same volume unit and M₁ and M₂ use the exact same concentration unit. If M₁ and M₂ are both in mol/L and V₂ is entered in milliliters, V₁ is returned directly in milliliters because unit conversion factors cancel across both sides."
  - question: "Can M1V1 = M2V2 be used for acid-base titration calculations?"
    answer: "Only when the acid and base react in a strict 1:1 stoichiometric ratio, such as HCl with NaOH. For polyprotic reactions like H₂SO₄ titrated with NaOH, each mole of acid neutralizes two moles of base, requiring the stoichiometric relation n₁M₁V₁ = n₂M₂V₂ (or normality N₁V₁ = N₂V₂)."
  - question: "Why should I dilute to the volumetric flask mark instead of simply adding V2 minus V1 of water?"
    answer: "Real liquids do not always conserve volume upon mixing due to intermolecular interactions and thermal effects. Mixing ethanol and water contracts total volume by roughly 3.5%, while diluting concentrated sulfuric acid releases substantial heat that expands the liquid. Always use a volumetric flask and bring to the calibration mark after cooling to 20 °C."
  - question: "How do you find the molarity of a commercial reagent bottle listed only in % w/w and density?"
    answer: "Multiply the reagent density (g/mL) by its weight percentage (% w/w) and by 10, then divide by the solute's molar mass (g/mol). For 37% w/w hydrochloric acid with a density of 1.19 g/mL and molar mass 36.46 g/mol, M = (1.19 × 37 × 10) / 36.46 = 12.08 M."
---

Molarity dilution reduces the molar concentration of a concentrated stock solution by adding measured solvent so that `M₁V₁ = M₂V₂`, where `M` is molarity (`mol/L`) and `V` is solution volume. Because adding pure water leaves the total number of dissolved solute moles unchanged (`n₁ = n₂`), increasing total volume lowers molarity in exact inverse proportion.

Chemical suppliers ship acids, bases, and buffer concentrates at maximum commercial density to reduce container weight, shipping costs, and storage footprint. Whether you are preparing `0.10 M` titration standards, adjusting PCR buffer stocks, or diluting concentrated mineral acids safely, our [Molarity Dilution Calculator](/en/calculators/molarity-dilution-calculator) solves for any unknown concentration or volume across metric units.

## Core Principles: Conservation of Moles and Stock Assay Conversion

Because molarity defines moles of solute per liter of total solution (`M = n / V`), total moles remain constant during simple solvent dilution:

```text
Conservation of Moles:  n_initial = n_final
Dilution Equation:      M₁ × V₁ = M₂ × V₂
Required Stock Volume:  V₁ = (M₂ × V₂) / M₁
Approximate Solvent:    V_solvent ≈ V₂ − V₁   (ideal aqueous dilute limit)
Commercial Stock M₁:    M₁ = (ρ × %w/w × 10) / M_w
```

* **`M₁` (Stock Molarity, mol/L):** Concentration of the starting concentrated reagent.
* **`V₁` (Aliquot Volume, mL or L):** Volume of stock solution transferred into the preparation vessel.
* **`M₂` (Target Molarity, mol/L):** Desired final working concentration (`M₂ < M₁`).
* **`V₂` (Final Solution Volume, mL or L):** Total volume of the prepared solution after diluting to the calibration mark.
* **`ρ` and `%w/w`:** Reagent bottle specific density (`g/mL`) and weight-percent assay used to compute `M₁` when bottles omit molarity.

### Unit Invariance and Safe Preparation Protocol

As long as `M₁` and `M₂` share identical concentration units (such as `M`, `mM`, or `µM`) and `V₁` and `V₂` share identical volume units (`L`, `mL`, or `µL`), conversion factors cancel automatically. When diluting strong acids or exothermic bases, never pour water into concentrated acid: rapid localized boiling can eject corrosive droplets. Always pre-fill the volumetric flask with roughly `60%–75%` of the required deionized water, slowly add `V₁` of acid while swirling, let the flask cool back to `20 °C`, and finally bring the meniscus to the `V₂` mark.

## Step-by-Step Worked Example: Preparing 1.50 M HCl From Concentrated Stock

Suppose an analytical procedure requires `500.0 mL` (`0.5000 L`) of `1.50 M` hydrochloric acid (`HCl`), and your chemical cabinet holds standard reagent-grade `37.0% w/w` HCl (`ρ = 1.19 g/mL`, `M_w = 36.46 g/mol`).

1. **Verify Stock Molarity (`M₁`):**
   `M₁ = (1.19 × 37.0 × 10) / 36.46 = 440.3 / 36.46 = 12.08 M` (commonly rounded to `12.1 M` on lab labels).
2. **Assign Known Dilution Parameters:**
   `M₁ = 12.08 M`, `M₂ = 1.50 M`, `V₂ = 500.0 mL`.
3. **Solve for Required Stock Volume (`V₁`):**
   `V₁ = (1.50 M × 500.0 mL) / 12.08 M = 750.0 / 12.08 = 62.09 mL` (`62.1 mL`).
4. **Verify Conserved Moles:**
   * Stock moles transferred: `12.08 mol/L × 0.06209 L = 0.7500 mol`.
   * Final solution moles: `1.50 mol/L × 0.5000 L = 0.7500 mol`.
5. **Execute Safe Volumetric Mixing:**
   Add `~300 mL` of deionized water to a `500 mL` Class A volumetric flask inside a fume hood, pipette `62.1 mL` of concentrated HCl slowly down the flask wall, swirl to mix, equilibrate to room temperature, and fill to the `500.0 mL` graduation mark (`~437.9 mL` total water added).

## Benchmark Stock Molarities of Common Laboratory Reagents

The reference table below summarizes standard commercial reagent concentrates and the exact stock volume `V₁` required to prepare `1.000 L` (`1,000 mL`) of `1.00 M` working solution.

| Reagent | Commercial Assay (`% w/w`) | Density (`g/mL`) | Stock Molarity `M₁` (`mol/L`) | `V₁` for `1.0 L` of `1.0 M` (`mL`) | Primary Mixing Hazard |
| :--- | :---: | :---: | :---: | :---: | :--- |
| Hydrochloric Acid (`HCl`) | 37.0% | 1.190 | 12.08 M | 82.8 mL | Fuming corrosive vapor |
| Sulfuric Acid (`H₂SO₄`) | 98.0% | 1.840 | 18.38 M | 54.4 mL | Extreme exothermic heat |
| Nitric Acid (`HNO₃`) | 70.0% | 1.413 | 15.70 M | 63.7 mL | Strong oxidizer; toxic NOₓ |
| Glacial Acetic Acid (`CH₃COOH`) | 99.7% | 1.049 | 17.42 M | 57.4 mL | Flammable vapor; freezes at `16.6 °C` |
| Phosphoric Acid (`H₃PO₄`) | 85.0% | 1.685 | 14.61 M | 68.4 mL | High viscosity slows pouring |
| Aqueous Ammonia (`NH₃`) | 28.0% | 0.900 | 14.80 M | 67.6 mL | Volatile irritant gas |

## Practical Use Cases, Common Errors, and Precision Caveats

In analytical labs, `M₁V₁ = M₂V₂` governs calibration curve preparation, HPLC mobile-phase acidification, and molecular biology buffer assembly (such as diluting `10×` or `50×` TAE/TBE electrophoresis concentrates). Note that a `"10×"` stock behaves identically under a generalized dilution equation (`C₁V₁ = C₂V₂`): preparing `1.0 L` of `1×` buffer requires `V₁ = (1 × 1,000 mL) / 10 = 100 mL` of concentrate brought to `1,000 mL`.

Four technical pitfalls routinely cause concentration drift:

* **Non-Additive Liquid Volumes:** Mixing `50.0 mL` of ethanol with `50.0 mL` of water yields roughly `96.4 mL` rather than `100.0 mL` due to hydrogen-bond packing contraction. Never estimate `V_solvent = V₂ − V₁` for concentrated organic or high-ionic-strength solutions; always dilute to the calibrated `V₂` mark.
* **Thermal Expansion Error:** Volumetric glassware is calibrated at `20 °C`. Filling a flask to the mark while an exothermic acid dilution is still hot (`45–60 °C`) causes the liquid meniscus to drop below the mark upon cooling, leaving the final molarity higher than calculated.
* **Titration Stoichiometry Misapplication:** Applying `M₁V₁ = M₂V₂` directly to a neutralization reaction between diprotic `H₂SO₄` and `NaOH` undercounts `NaOH` volume by half. Account for reaction coefficients whenever chemical transformation occurs.
* **Single-Step Extreme Ratios:** Attempting to measure `< 1 mL` directly into `1,000 mL` exceeds the precision tolerance of standard pipettes and cylinders; switch to multi-step serial dilution whenever the required `V₁` drops below your calibrated pipette's reliable range.
