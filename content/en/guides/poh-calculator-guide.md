---
title: "pOH Calculator: The Inverse of pH"
description: "Learn how the pOH scale measures alkalinity, the relationship between pH and pOH (pH + pOH = 14), and use our free pOH Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "poh-calculator"
relatedType: "calculator"
faqs:
  - question: "Does pH + pOH = 14.00 hold at all water temperatures?"
    answer: "No. The identity pH + pOH = 14.00 applies specifically at 25 °C (298.15 K), where the autoionization constant of water (Kw) equals 1.008 × 10⁻¹⁴. Because water autoionization is endothermic, Kw increases with temperature: at 0 °C, pKw is 14.94 (neutral pOH = 7.47), while at 50 °C, pKw drops to 13.26 (neutral pOH = 6.63). Pure water remains chemically neutral whenever [H₃O⁺] equals [OH⁻], even when pOH differs from 7.00."
  - question: "What is the pOH of a 1.0 × 10⁻⁸ M NaOH solution?"
    answer: "It is 6.98, not 8.00. At extreme dilution below 10⁻⁶ M, hydroxide ions contributed by the autoionization of water (1.0 × 10⁻⁷ M in pure water) cannot be ignored. Solving the charge-balance quadratic equation [OH⁻]² − (1.0 × 10⁻⁸)[OH⁻] − 1.0 × 10⁻¹⁴ = 0 yields [OH⁻] = 1.05 × 10⁻⁷ M, giving pOH = 6.98 and pH = 7.02."
  - question: "Why can pOH be negative for concentrated strong bases?"
    answer: "Because pOH is defined as −log₁₀([OH⁻]), any aqueous solution with a hydroxide ion molarity greater than 1.0 M yields a negative pOH. For example, an idealized 2.0 M sodium hydroxide solution gives pOH = −log₁₀(2.0) = −0.30. In real concentrated solutions above 0.1 M, however, interionic interactions reduce effective hydroxide activity below stoichiometric molarity."
  - question: "How do you calculate pOH for a polyprotic strong base like Ba(OH)₂?"
    answer: "Multiply the nominal molarity of the base by the number of dissociable hydroxide ions per formula unit before taking the negative logarithm. Complete dissociation of 0.0050 M barium hydroxide (Ba(OH)₂) yields 2 × 0.0050 = 0.010 M OH⁻, giving pOH = −log₁₀(0.010) = 2.00 rather than 2.30."
  - question: "When should chemists use pOH instead of pH?"
    answer: "Chemists use pOH when analyzing basic equilibria directly—such as weak base dissociation constants (Kb), hydroxide precipitation thresholds for metal ions, or caustic scrubbing streams—because [OH⁻] = 10^(−pOH) avoids an extra subtraction step against pKw and minimizes rounding drift when temperature varies."
---

The **pOH scale** quantifies the basicity (alkalinity) of an aqueous solution by measuring the negative base-10 logarithm of its molar hydroxide ion concentration, `[OH⁻]`. Just as pH expresses hydronium abundance on a compressed logarithmic axis, pOH expresses hydroxide abundance directly: lower pOH values correspond to higher `[OH⁻]` and stronger alkalinity, whereas higher pOH values indicate depleted `[OH⁻]` and acidic conditions. At standard laboratory temperature (`25 °C` / `298.15 K`), the autoionization of water locks the two scales into an exact inverse complement: `pH + pOH = 14.00`.

Whether you are converting a measured meter reading into hydroxide molarity, solving weak-base equilibrium expressions, or verifying caustic dosing rates in water treatment, our [pOH Calculator](/en/calculators/poh-calculator) performs bidirectional conversions across `[OH⁻]`, `[H₃O⁺]`, pOH, and pH without manual log-table errors.

## Core Formulas, Water Autoionization, and Parameter Definitions

Pure liquid water undergoes continuous self-ionization (`2 H₂O(l) ⇌ H₃O⁺(aq) + OH⁻(aq)`), maintaining a thermodynamic equilibrium product `Kw` between hydronium and hydroxide concentrations. Taking the negative logarithm of both sides of the ion-product law generates the governing pOH relationships:

```text
pOH Definition:          pOH = −log₁₀([OH⁻])
Hydroxide Concentration: [OH⁻] = 10^(−pOH)
Water Ion Product:       Kw = [H₃O⁺] × [OH⁻] = 1.008 × 10⁻¹⁴  (at 25 °C)
Scale Complementarity:   pKw = −log₁₀(Kw) = pH + pOH = 14.00    (at 25 °C)
Strong Base (n-protic):  [OH⁻] = n × C_base
Weak Base Equilibrium:   Kb = ([BH⁺] × [OH⁻]) / [B]
```

* **`[OH⁻]` (Hydroxide Ion Molarity, mol/L or M):** Equilibrium molar concentration of dissolved hydroxide ions; strictly positive.
* **`[H₃O⁺]` (Hydronium Ion Molarity, mol/L or M):** Equilibrium hydrogen/hydronium ion concentration paired inversely with `[OH⁻]` through `Kw`.
* **`Kw` (Water Autoionization Constant, dimensionless):** Temperature-dependent equilibrium constant equal to `1.0 × 10⁻¹⁴` at `25 °C`.
* **`n` (Stoichiometric Hydroxide Equivalents):** Number of `OH⁻` ions released per formula unit (`1` for `NaOH` and `KOH`; `2` for `Ba(OH)₂` and `Sr(OH)₂`).
* **`Kb` (Base Dissociation Constant):** Equilibrium constant governing partial protonation of a weak base `B` (`pKb = −log₁₀(Kb)`).

### Temperature Dependence of Neutrality

Water autoionization is endothermic (`ΔH° = +55.8 kJ/mol`), so heating water shifts equilibrium toward higher ion concentrations and lowers `pKw`. At `0 °C`, `Kw = 0.114 × 10⁻¹⁴` (`pKw = 14.94`), placing neutral water (`[H₃O⁺] = [OH⁻]`) at `pOH = 7.47`. At `37 °C`, `Kw = 2.38 × 10⁻¹⁴` (`pKw = 13.62`, neutral `pOH = 6.81`), and by `50 °C` (`Kw = 5.48 × 10⁻¹⁴`, `pKw = 13.26`), neutral `pOH` drops to `6.63`. Consequently, a `50 °C` sample at `pOH = 7.00` is mildly acidic because `[H₃O⁺]` (`5.48 × 10⁻⁷ M`) exceeds `[OH⁻]` (`1.00 × 10⁻⁷ M`).

## Step-by-Step Worked Examples: Strong and Weak Bases

### Example 1: Diprotic Strong Base (`0.0025 M Ba(OH)₂` at `25 °C`)

1. **Apply Dissociation Stoichiometry:** `Ba(OH)₂` dissociates completely into one `Ba²⁺` and two `OH⁻` ions (`n = 2`), so `[OH⁻] = 2 × 0.0025 M = 5.0 × 10⁻³ M`.
2. **Compute pOH and pH:** `pOH = −log₁₀(5.0 × 10⁻³) = 2.301`, and `pH = 14.000 − 2.301 = 11.699`.

### Example 2: Weak Monoprotic Base (`0.10 M` Ammonia, `Kb = 1.8 × 10⁻⁵`)

1. **Set Up the ICE Equilibrium:** `NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)` yields `x² / (0.10 − x) = 1.8 × 10⁻⁵`, where `x = [OH⁻]`.
2. **Verify and Solve:** Since `C₀ / Kb = 5,556` exceeds `400`, `x ≈ √(0.10 × 1.8 × 10⁻⁵) = 1.342 × 10⁻³ M` (exact quadratic root: `1.333 × 10⁻³ M`).
3. **Compute pOH and pH:** `pOH = −log₁₀(1.333 × 10⁻³) = 2.88`, giving `pH = 14.00 − 2.88 = 11.12`.

## pOH, Hydroxide Concentration, and pH Reference Benchmarks

The table below maps representative aqueous solutions at `25 °C` (`pKw = 14.00`), showing the tenfold change in `[OH⁻]` per unit pOH shift:

| Aqueous Solution (`25 °C`) | `[OH⁻]` (M) | `pOH` | `pH` | `[H₃O⁺]` (M) | Chemical Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0.10 M NaOH` (Caustic soda) | `1.00 × 10⁻¹` | `1.00` | `13.00` | `1.00 × 10⁻¹³` | Strong base |
| `0.10 M NH₃` (Household ammonia) | `1.33 × 10⁻³` | `2.88` | `11.12` | `7.50 × 10⁻¹²` | Weak base (`Kb = 1.8×10⁻⁵`) |
| Saturated `Mg(OH)₂` (Milk of magnesia) | `2.24 × 10⁻⁴` | `3.65` | `10.35` | `4.47 × 10⁻¹¹` | Sparingly soluble base |
| Surface Seawater | `1.26 × 10⁻⁶` | `5.90` | `8.10` | `7.94 × 10⁻⁹` | Mildly alkaline natural water |
| Pure Deionized Water | `1.00 × 10⁻⁷` | `7.00` | `7.00` | `1.00 × 10⁻⁷` | Neutral reference point |
| Black Coffee | `1.00 × 10⁻⁹` | `9.00` | `5.00` | `1.00 × 10⁻⁵` | Weakly acidic solution |
| `0.10 M HCl` (Stomach-strength acid) | `1.00 × 10⁻¹³` | `13.00` | `1.00` | `1.00 × 10⁻¹` | Strong acid |

## Industrial Applications, Precision Limits, and Common Errors

Process engineers track `[OH⁻]` and pOH across regulated workflows. In **heavy-metal wastewater precipitation**, metal hydroxide solubility products (`Ksp` for `Fe(OH)₃`, `Cu(OH)₂`, `Zn(OH)₂`) depend on `[OH⁻]²` or `[OH⁻]³`, while U.S. EPA discharge permits require final effluent within `pH 6.0–9.0` (`pOH 5.0–8.0` at `25 °C`). **Boiler water treatment** maintains `pOH 2.0–3.5` to suppress corrosion without triggering caustic embrittlement, and **clean-in-place (CIP)** food sanitation targets `pOH 1.5–2.5` caustic washes.

Four pitfalls commonly distort pOH calculations:
1. **Ignoring Water Autoionization Below `10⁻⁶ M`:** Applying `pOH = −log₁₀(C_base)` to `1.0 × 10⁻⁸ M NaOH` falsely gives `pOH = 8.00` (`pH = 6.00`); charge balance must include water's `1.0 × 10⁻⁷ M` hydroxide background.
2. **Omitting Activity Coefficients:** Above `0.1 M` ionic strength, electrostatic shielding lowers thermodynamic activity (`a_OH⁻ = γ_OH⁻ × [OH⁻]`) below nominal molarity.
3. **Alkaline Sodium Error:** Above `pH 12.0` (`pOH < 2.0`), standard glass electrodes cross-respond to `Na⁺` ions, underreporting pH unless low-sodium electrodes or titration are used.
4. **Assuming `pKw = 14.00` in Hot Streams:** Evaluating `80 °C` CIP rinses or `37 °C` bioreactors at `pKw = 14.00` introduces a `0.38–1.40` unit error.
