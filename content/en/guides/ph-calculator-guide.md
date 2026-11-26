---
title: "pH Calculator: Measuring Acidity and Alkalinity"
description: "Understand the pH scale, learn how to calculate hydrogen ion concentration using logarithms, and use our free pH Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ph-calculator"
relatedType: "calculator"
faqs:
  - question: "What does a one-unit change on the pH scale actually mean?"
    answer: "Because pH is a negative base-10 logarithm of hydrogen ion activity, every single-unit shift corresponds to a tenfold change in acidity or alkalinity. A solution at pH 3.0 has 10 times more free H+ ions than a solution at pH 4.0, and 1,000 times more H+ ions than one at pH 6.0."
  - question: "Can pH values ever fall below 0 or exceed 14?"
    answer: "Yes. The 0–14 range applies to dilute aqueous solutions up to 1.0 M concentration at 25 °C. Concentrated strong acids—such as 6.0 M hydrochloric acid (−log10(6.0) = −0.78)—produce negative pH values, while concentrated strong bases like 10 M NaOH exceed pH 14 (reaching roughly pH 15 before activity corrections)."
  - question: "Why is pure neutral water not always pH 7.00?"
    answer: "Water autoionization (2 H2O ⇌ H3O+ + OH−) is an endothermic equilibrium, so the ion-product constant Kw increases with temperature. While Kw = 1.0 × 10⁻¹⁴ at 25 °C (giving neutral pH 7.00), at human body temperature (37 °C) Kw rises to 2.4 × 10⁻¹⁴ (neutral pH 6.81), and at 100 °C neutral water drops to pH 6.14."
  - question: "Why does calculating pH = −log10(1.0 × 10⁻⁸) for ultra-dilute HCl give the wrong answer?"
    answer: "Simply taking −log10(10⁻⁸) yields pH 8.00—an impossible basic reading for an acid. At concentrations near or below 10⁻⁶ M, water's own autoionization contributes roughly 1.0 × 10⁻⁷ M H+, requiring a quadratic charge-balance solution that correctly yields an acidic pH of 6.98."
  - question: "What is the difference between pH and titratable (total) acidity?"
    answer: "pH measures only the instantaneous free hydronium ion activity in solution, whereas titratable acidity measures both free H+ and undissociated weak acid molecules (HA) capable of neutralizing base. A 0.10 M acetic acid solution has a higher pH (2.88) than 0.10 M HCl (1.00), yet both require the exact same volume of NaOH to reach neutralization."
---

The pH scale quantifies the acidity or alkalinity of an aqueous solution on a compact base-10 logarithmic scale defined by hydrogen ion activity (`a_H+`, approximated in dilute solutions by molar concentration `[H⁺]`). Anchored at `25 °C` by water's autoionization equilibrium (`K_w = 1.0 × 10⁻¹⁴`), solutions with `pH < 7.00` are acidic, `pH = 7.00` are neutral, and `pH > 7.00` are basic (alkaline).

Because every `1.0`-unit shift represents a tenfold change in `[H⁺]`, small numerical errors in concentration or scientific notation produce dramatic swings in predicted reactivity, corrosion rate, or biological toxicity. Use our [pH Calculator](/en/calculators/ph-calculator) to convert effortlessly between `[H⁺]`, `[OH⁻]`, `pH`, and `pOH` with full scientific-notation precision.

## Logarithmic Equations, Water Autoionization, and Equilibria

In standard aqueous chemistry at `25.0 °C` (`298.15 K`), hydronium (`H₃O⁺`, written `H⁺`) and hydroxide (`OH⁻`) ions remain coupled through the ion-product constant of pure water (`K_w`):

```text
pH Definition:            pH  = −log₁₀[H⁺]        and   [H⁺]  = 10^(−pH)
pOH Definition:           pOH = −log₁₀[OH⁻]       and   [OH⁻] = 10^(−pOH)
Water Autoionization:     K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴   →   pH + pOH = 14.00
Weak Acid Buffer (H-H):   pH  = pK_a + log₁₀([A⁻] / [HA])
```

- **`[H⁺]` and `[OH⁻]` (M or mol/L):** Equilibrium molar concentrations of hydronium and hydroxide ions.
- **`K_w` (Dimensionless equilibrium constant):** `1.0 × 10⁻¹⁴` at `25 °C`; strictly temperature-dependent.
- **`pK_a` (`−log₁₀ K_a`):** Acid dissociation strength; the Henderson-Hasselbalch (`H-H`) equation applies to conjugate acid-base buffer pairs (`[HA]` and `[A⁻]`) when `pK_a` lies within `±1` unit of target `pH`.

Strictly defined by IUPAC, `pH = −log₁₀(γ_H+ × [H⁺])`, where `γ_H+` is the single-ion activity coefficient. At low ionic strength (`< 0.01 M`), `γ_H+ ≈ 1`, making molarity a reliable substitute for activity.

## Step-by-Step Worked Examples: Strong Base and Weak Acid Buffer

### Example 1: Strong Base Solution (`0.0025 M NaOH` at `25 °C`)

Sodium hydroxide (`NaOH`) dissociates completely in water, so `[OH⁻] = 2.5 × 10⁻³ M`.

1. **Compute `pOH`:** `pOH = −log₁₀(2.5 × 10⁻³) = −(−2.602) = 2.602`
2. **Convert to `pH`:** `pH = 14.00 − 2.602 = 11.40`
3. **Verify `[H⁺]`:** `[H⁺] = 10^(−11.40) = 4.0 × 10⁻¹² M` (`4.0 × 10⁻¹² × 2.5 × 10⁻³ = 1.0 × 10⁻¹⁴`)

### Example 2: Acetate Buffer (`0.15 M CH₃COOH` + `0.25 M CH₃COONa`)

Acetic acid has `pK_a = 4.756` at `25 °C`. Applying the Henderson-Hasselbalch equation:

1. **Compute base-to-acid ratio:** `[A⁻] / [HA] = 0.25 M / 0.15 M = 1.6667`
2. **Evaluate logarithm:** `log₁₀(1.6667) = +0.222`
3. **Solve `pH`:** `pH = 4.756 + 0.222 = 4.98`

Because conjugate base exceeds weak acid (`0.25 M > 0.15 M`), buffer `pH` sits `0.22` units above `pK_a`.

## Reference pH Scale and Ion Concentration Benchmarks (`25 °C`)

| pH | `[H⁺]` Concentration (`M`) | `[OH⁻]` Concentration (`M`) | `pOH` | Classification | Representative Chemical / Environmental Benchmark |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`0.0`** | `1.0 × 10⁰` (`1.0 M`) | `1.0 × 10⁻¹⁴` | `14.0` | Strongly Acidic | `1.0 M HCl` / lead-acid battery electrolyte |
| **`2.0`** | `1.0 × 10⁻²` | `1.0 × 10⁻¹²` | `12.0` | Acidic | Human gastric acid / fresh lemon juice (`2.0–2.4`) |
| **`4.5`** | `3.16 × 10⁻⁵` | `3.16 × 10⁻¹⁰` | `9.5` | Moderately Acidic | Tomato juice / acid rain threshold (`< 5.6`) |
| **`7.0`** | `1.0 × 10⁻⁷` | `1.0 × 10⁻⁷` | `7.0` | Neutral | Pure distilled water at `25.0 °C` |
| **`7.4`** | `3.98 × 10⁻⁸` | `2.51 × 10⁻⁷` | `6.6` | Slightly Alkaline | Human arterial blood (`7.35–7.45` physiological range) |
| **`10.5`** | `3.16 × 10⁻¹¹` | `3.16 × 10⁻⁴` | `3.5` | Alkaline | Milk of magnesia (`Mg(OH)₂` suspension) |
| **`13.0`** | `1.0 × 10⁻¹³` | `1.0 × 10⁻¹` (`0.10 M`) | `1.0` | Strongly Alkaline | `0.10 M NaOH` / industrial caustic cleaner |

## Clinical, Environmental, and Analytical Precision Caveats

Tight pH control is mission-critical across medicine, civil infrastructure, and agriculture:

- **Clinical Acid-Base Homeostasis:** Human arterial blood is buffered between `pH 7.35` and `7.45` via the bicarbonate-carbonic acid system (`pK_a ≈ 6.1` at `37 °C`). Values below `7.35` indicate acidemia; values above `7.45` indicate alkalemia, with survival boundaries near `6.8` and `7.8`.
- **Municipal Drinking Water Compliance:** The US EPA Secondary Drinking Water Regulation specifies an acceptable `pH` window of `6.5–8.5`. Low-pH water accelerates copper and lead pipe leaching, whereas `pH > 8.5` precipitates calcium carbonate scale and diminishes chlorine disinfection efficacy.
- **Hydroponic & Soil Chemistry:** Most crops achieve optimal micronutrient solubility (`Fe`, `Mn`, `Zn`, `P`) between `pH 5.5` and `6.5` in hydroponic reservoirs and `6.0–7.0` in mineral soils.

Four analytical pitfalls frequently distort calculated or measured pH values:

1. **Ignoring water autoionization in ultra-dilute solutions:** For `1.0 × 10⁻⁸ M HCl`, solving the exact charge-balance quadratic `[H⁺]² − 10⁻⁸[H⁺] − 10⁻¹⁴ = 0` yields `[H⁺] = 1.05 × 10⁻⁷ M` (`pH 6.98`), preventing the nonsensical `pH 8.00` obtained from naive `-log₁₀` substitution.
2. **Omitting temperature compensation:** Applying `pH + pOH = 14.00` outside `25 °C` introduces systematic bias; at `37 °C`, `pK_w = 13.62`, shifting neutral water to `pH 6.81`.
3. **Confusing natural log (`ln`) with base-10 log (`log₁₀`):** Using `−ln[H⁺]` inflates pH values by a factor of `2.303` (`−ln(10⁻⁷) = 16.12`).
4. **High-ionic-strength & sodium electrode error:** Above `0.1 M` dissolved salt or `pH > 12`, ionic activity diverges sharply from molarity (`γ_H+ ≠ 1`), and standard glass electrodes exhibit alkaline sodium error unless corrected with low-Na⁺ glass formulations.
