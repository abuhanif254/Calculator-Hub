---
title: "pKa Calculator: Measuring Acid Strength"
description: "Understand acid dissociation constants (Ka), how to calculate pKa, and use our free pKa Calculator to determine acid strength."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "pka-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the difference between pKa and pH?"
    answer: "pKa is an intrinsic thermodynamic constant for a specific acid molecule in a given solvent and temperature—it measures how readily that molecule donates a proton. pH is a property of an entire solution that varies with acid concentration, dilution, and added salts or bases. For example, acetic acid always has pKa = 4.76 at 25 °C, whether a bottle is 0.01 M (pH 3.38) or 1.0 M (pH 2.38)."
  - question: "Why can strong acids have negative pKa values?"
    answer: "Because pKa = −log₁₀(Ka), any acid with a dissociation constant Ka greater than 1.0 yields a negative pKa. Hydrochloric acid (pKa ≈ −6.3, Ka ≈ 2 × 10⁶) and sulfuric acid (pKa1 ≈ −3.0) lie heavily toward complete dissociation, meaning their conjugate bases (Cl⁻, HSO₄⁻) are exceedingly weak proton acceptors."
  - question: "How do you convert between pKa and the conjugate base pKb?"
    answer: "In aqueous solutions at 25 °C, a conjugate acid-base pair obeys the thermodynamic identity Ka × Kb = Kw = 1.0 × 10⁻¹⁴, which simplifies in logarithmic form to pKa + pKb = 14.00. Knowing acetic acid has pKa = 4.76 immediately gives acetate ion a pKb of 14.00 − 4.76 = 9.24 (Kb = 5.75 × 10⁻¹⁰)."
  - question: "What happens when pH equals pKa in a solution?"
    answer: "When solution pH equals the acid's pKa, the ratio of conjugate base [A⁻] to protonated acid [HA] is exactly 1:1 (50% ionized and 50% unionized). At this midpoint—seen at half-equivalence in a titration—the solution exhibits its maximum buffering capacity against added acid or base."
  - question: "Why do polyprotic acids have multiple pKa values that increase at each step?"
    answer: "Removing a positively charged proton (H⁺) from a neutral molecule (such as H₃PO₄) is easier than pulling a second proton away from a negatively charged anion (H₂PO₄⁻), and harder still from a doubly negative ion (HPO₄²⁻). Each successive dissociation therefore has a smaller Ka and a higher pKa—for phosphoric acid, pKa1 = 2.15, pKa2 = 7.20, and pKa3 = 12.35."
---

The **acid dissociation constant (`Ka`)** measures the equilibrium extent to which an acid transfers a proton to water, while **`pKa`** expresses that constant on a compact logarithmic scale: `pKa = −log₁₀(Ka)`. Because acid dissociation equilibria span more than 50 orders of magnitude—from superacids (`Ka > 10¹⁰`) down to hydrocarbons (`Ka ≈ 10⁻⁵⁰`)—`pKa` turns unwieldy scientific notation into manageable numbers where **a lower `pKa` always indicates a stronger acid**.

Unlike solution pH, which shifts whenever you dilute a sample, `pKa` is an intrinsic molecular property at a fixed temperature and solvent. Use our [pKa Calculator](/en/calculators/pka-calculator) to convert instantaneously between `Ka`, `pKa`, conjugate-base `Kb`/`pKb`, and equilibrium ionization fractions.

## Acid Dissociation Equilibrium, Formulas, and Parameter Definitions

In aqueous media, a Brønsted–Lowry acid `HA` establishes a reversible proton-transfer equilibrium with water (`HA(aq) + H₂O(l) ⇌ H₃O⁺(aq) + A⁻(aq)`). Because pure liquid water has unit activity, its concentration is omitted from the thermodynamic mass-action expression:

```text
Acid Dissociation Constant:  Ka = ([H₃O⁺] × [A⁻]) / [HA]
Logarithmic Scale:           pKa = −log₁₀(Ka)      and      Ka = 10^(−pKa)
Conjugate Base Pairing:      Ka × Kb = Kw = 1.0 × 10⁻¹⁴     (at 25 °C)
Logarithmic Pairing:         pKa + pKb = pKw = 14.00        (at 25 °C)
Percent Ionization:          % Ionization = ([H₃O⁺]_eq / [HA]₀) × 100%
Henderson Ionization Ratio:  [A⁻] / [HA] = 10^(pH − pKa)
```

* **`Ka` (Acid Dissociation Constant):** Equilibrium ratio of ionized products to unionized acid; large `Ka` (`> 1`) signifies strong dissociation, while small `Ka` (`< 10⁻²`) signifies a weak acid.
* **`pKa` (Negative Log Acid Constant):** Dimensionless strength index; each `1.0`-unit decrease in `pKa` represents a tenfold increase in `Ka`.
* **`[HA]`, `[A⁻]`, `[H₃O⁺]` (Equilibrium Molarities, M):** Concentrations measured after proton transfer reaches equilibrium, not nominal initial concentrations.
* **`Kb` and `pKb` (Conjugate Base Constants):** Strength of the deprotonated partner `A⁻`; stronger acids always yield weaker conjugate bases.

### Polyprotic Acids and Stepwise Dissociation

Acids carrying multiple ionizable protons—such as sulfuric (`H₂SO₄`), carbonic (`H₂CO₃`), and phosphoric (`H₃PO₄`) acids—dissociate in discrete steps (`Ka1 > Ka2 > Ka3`). Electrostatic attraction makes removing a second `H⁺` from an already anionic species far less favorable, typically separating consecutive `pKa` values by `4` to `5` units. When calculating the pH of a pure polyprotic weak acid solution, the first dissociation (`Ka1`) almost always dominates `[H₃O⁺]` whenever `Ka1 / Ka2 ≥ 10³`.

## Step-by-Step Worked Examples: Determining `pKa` and Ionization

### Example 1: Deriving `Ka` and `pKa` from Measured Solution pH

Suppose a `0.0500 M` aqueous solution of benzoic acid (`C₆H₅COOH`) records an equilibrium `pH` of `2.75` at `25 °C`.

1. **Calculate Equilibrium `[H₃O⁺]` and `[A⁻]`:** Neglecting water's `10⁻⁷ M` autoionization contribution (`[H₃O⁺] >> 10⁻⁶ M`), every dissociated benzoic acid molecule produces one `H₃O⁺` and one benzoate ion (`C₆H₅COO⁻`):
   `[H₃O⁺] = [A⁻] = 10^(−2.75) = 1.778 × 10⁻³ M`
2. **Determine Remaining Unionized Acid `[HA]`:** Subtract the dissociated amount from the initial `0.0500 M` concentration:
   `[HA]_eq = 0.0500 − 0.001778 = 0.04822 M`
3. **Solve for `Ka`, `pKa`, and Percent Ionization:**
   `Ka = (1.778 × 10⁻³)² / 0.04822 = 3.162 × 10⁻⁶ / 0.04822 = 6.56 × 10⁻⁵`
   `pKa = −log₁₀(6.56 × 10⁻⁵) = 4.18`
   `% Ionization = (1.778 × 10⁻³ / 0.0500) × 100% = 3.56%`

### Example 2: Conjugate Base `pKb` and Physiological Ionization Fraction

Using `pKa = 4.18` for benzoic acid at `25 °C`:
1. **Find Conjugate Base `pKb`:** `pKb = 14.00 − 4.18 = 9.82`, giving `Kb = 10^(−9.82) = 1.51 × 10⁻¹⁰` for benzoate (`C₆H₅COO⁻`).
2. **Compute Ionization Ratio in Blood (`pH = 7.40`):**
   `[A⁻] / [HA] = 10^(7.40 − 4.18) = 10^(3.22) = 1,660 : 1`
   Over `99.94%` of benzoic acid molecules exist in the water-soluble anionic benzoate form at physiological blood pH.

## Reference `pKa` Benchmarks Across Inorganic and Organic Acids

The table below lists benchmark thermodynamic `Ka` and `pKa` values in water at `25 °C` alongside their conjugate base `pKb` values:

| Acid Name & Formula | `Ka` (`25 °C`) | `pKa` | Conjugate Base `pKb` | Acid Class & Practical Role |
| :--- | :--- | :--- | :--- | :--- |
| Hydrochloric acid (`HCl`) | `~2.0 × 10⁶` | `−6.3` | `20.3` | Strong mineral acid; complete aqueous dissociation |
| Phosphoric acid (`H₃PO₄`, step 1) | `7.1 × 10⁻³` | `2.15` | `11.85` | Moderately strong polyprotic acid; food acidulant |
| Formic acid (`HCOOH`) | `1.8 × 10⁻⁴` | `3.75` | `10.25` | Weak carboxylic acid; LC-MS volatile buffer |
| Acetic acid (`CH₃COOH`) | `1.75 × 10⁻⁵` | `4.76` | `9.24` | Standard weak organic acid; vinegar & buffers |
| Carbonic acid (`H₂CO₃`, step 1) | `4.3 × 10⁻⁷` | `6.37` (apparent `6.1` in blood) | `7.63` | Primary physiological blood buffer acid |
| Ammonium ion (`NH₄⁺`) | `5.6 × 10⁻¹⁰` | `9.25` | `4.75` | Conjugate acid of ammonia; nitrogen assay control |
| Phenol (`C₆H₅OH`) | `1.0 × 10⁻¹⁰` | `9.99` | `4.01` | Very weak aromatic alcohol; resin synthesis |

## Pharmaceutical, Analytical, and Thermodynamic Caveats

Accurate `pKa` interpretation underpins drug discovery, chromatography, and synthetic chemistry:

* **Drug Absorption and pH-Partitioning:** Small-molecule drugs cross lipid cell membranes primarily in their uncharged state. Weakly acidic drugs with `pKa` between `3` and `5` (such as aspirin, `pKa 3.5`) remain largely neutral and absorbable in gastric fluid (`pH 1.5–2.0`), whereas weak bases ionize in the stomach and absorb preferentially in the small intestine (`pH 6.5–7.5`).
* **Chromatographic Method Development:** In reversed-phase HPLC, setting mobile-phase pH within `±1.0` unit of an analyte's `pKa` causes coexisting neutral and ionized species to elute at different rates, producing split or tailing peaks. Analysts therefore buffer mobile phases at least `1.5` to `2.0` pH units away from the analyte `pKa`.
* **Water Leveling Effect:** Water cannot differentiate strong acids with `pKa < −1.74` (the `pKa` of `H₃O⁺`), because `HCl` (`−6.3`), `HBr` (`−9.0`), and `HClO₄` (`−10`) all convert quantitatively to `H₃O⁺`. Measuring true relative acidity among strong acids requires aprotic solvents such as DMSO or glacial acetic acid—and solvent-specific `pKa` values must never be mixed with aqueous tables.
* **Approximation Breakdown:** Solving `[H₃O⁺] ≈ √(Ka × C₀)` assumes minimal dissociation (`C₀ / Ka ≥ 400`). For dilute or moderately strong weak acids like `0.01 M` chloroacetic acid (`pKa = 2.87`), skipping the full quadratic equation introduces errors exceeding `25%`.
