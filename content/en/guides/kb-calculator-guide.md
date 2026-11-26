---
title: "Kb Calculator: The Base Dissociation Constant"
description: "Understand the Kb constant for weak bases, the relationship between Ka, Kb, and Kw, and use our free Kb Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "kb-calculator"
relatedType: "calculator"
faqs:
  - question: "How are Kb, Ka, and Kw mathematically related?"
    answer: "For any conjugate acid-base pair in aqueous solution, multiplying the acid dissociation constant (Ka) by the base dissociation constant (Kb) equals the auto-ionization constant of water (Kw): Ka × Kb = Kw, or pKa + pKb = pKw. At 25 °C, Kw = 1.00 × 10⁻¹⁴ (pKw = 14.00), so a stronger base (higher Kb) always corresponds to a weaker conjugate acid (lower Ka)."
  - question: "Why does pH + pOH = 14.00 only apply strictly at 25 °C?"
    answer: "Water auto-ionization (2H₂O ⇌ H₃O⁺ + OH⁻) is endothermic (ΔH° = +55.8 kJ/mol), so Kw increases with temperature. At 0 °C, pKw = 14.94 (neutral pH = 7.47); at 25 °C, pKw = 14.00 (neutral pH = 7.00); and at human body temperature (37 °C), pKw = 13.62 (neutral pH = 6.81). Converting pOH to pH without adjusting pKw for temperature causes systematic pH errors."
  - question: "How do you find Kb of a weak base when only its pH is known?"
    answer: "First convert measured pH to pOH using pOH = pKw − pH (using 14.00 at 25 °C). Next calculate [OH⁻] = 10^(−pOH). Assuming 1:1 hydrolysis stoichiometry ([BH⁺] = [OH⁻] and [B] = C₀ − [OH⁻]), substitute into Kb = [OH⁻]² / (C₀ − [OH⁻])."
  - question: "Why are conjugate bases of weak acids like acetate basic in water?"
    answer: "Sodium acetate (CH₃COONa) dissociates completely into spectator Na⁺ and acetate (CH₃COO⁻). Because acetic acid is weak (Ka = 1.75 × 10⁻⁵), acetate retains significant proton affinity and hydrolyzes water: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻, with Kb = Kw / Ka = 5.71 × 10⁻¹⁰, producing a mildly alkaline solution."
  - question: "When is the small-x approximation invalid for weak base Kb problems?"
    answer: "The shortcut [OH⁻] ≈ √(Kb × C₀) fails whenever [OH⁻] exceeds 5% of initial base concentration C₀ (when C₀ / Kb < 400). This happens commonly with stronger organic amines such as methylamine or ethylamine at concentrations below 0.20 M, requiring the exact quadratic formula x² + Kb·x − Kb·C₀ = 0."
---

The base dissociation constant (`Kb`) measures the proton-accepting strength of a weak Brønsted-Lowry base (`B`) in water by quantifying the equilibrium ratio of conjugate acid (`BH⁺`) and hydroxide ions (`OH⁻`) to unprotonated base (`B`). Unlike strong alkali hydroxides such as sodium hydroxide (`NaOH`), which release hydroxide stoichiometrically upon dissolution, weak bases such as ammonia, aliphatic amines, and carboxylate anions establish a reversible hydrolysis equilibrium where `Kb` typically spans `10⁻³` to `10⁻¹¹`.

Because every weak base forms a conjugate acid upon accepting a proton, `Kb` is thermodynamically locked to the conjugate acid's `Ka` through the temperature-dependent water ion product (`Kw = Ka × Kb`). Our [Kb Calculator](/en/calculators/kb-calculator) handles `Kb` and `pKb` conversions from `pOH`, `pH`, `[OH⁻]`, percent ionization, or conjugate `Ka` across `0 °C`, `25 °C`, `37 °C`, and `60 °C`, solving exact quadratic ICE equilibria automatically.

## Core `Kb` Equations and the Conjugate `Ka × Kb = Kw` Link

When a neutral weak base `B` or an anionic conjugate base `A⁻` reacts with water (`B(aq) + H₂O(l) ⇌ BH⁺(aq) + OH⁻(aq)`), the mass-action equilibrium and conjugate relationships take the following forms:

```text
Base Dissociation Constant: Kb = ([BH⁺] × [OH⁻]) / [B]
Logarithmic Scale:          pKb = −log₁₀(Kb),   Kb = 10^(−pKb)
Conjugate Pair Identity:    Ka × Kb = Kw,   pKa + pKb = pKw
pH / pOH Conversion:        pOH = −log₁₀([OH⁻]),   pH = pKw − pOH
Exact Quadratic (x=[OH⁻]):  x = (−Kb + √(Kb² + 4 × Kb × C₀)) / 2
Small-x Approximation:      x_approx = √(Kb × C₀)   [valid if x_approx / C₀ ≤ 0.05]
```

* **`C₀` (mol/L):** Initial analytical molarity of the weak base (`[B]_initial`).
* **`x` (`[OH⁻] = [BH⁺]`, mol/L):** Equilibrium hydroxide and conjugate-acid concentration produced by base hydrolysis.
* **`[B]` (`C₀ − x`, mol/L):** Unprotonated weak base remaining at equilibrium.
* **`Kw` and `pKw`:** Water auto-ionization product, equal to `1.14 × 10⁻¹⁵` (`pKw = 14.94`) at `0 °C`, `1.00 × 10⁻¹⁴` (`14.00`) at `25 °C`, `2.40 × 10⁻¹⁴` (`13.62`) at `37 °C`, and `9.60 × 10⁻¹⁴` (`13.02`) at `60 °C`.

### Why Conjugate Strength Runs Inverse

Adding the chemical equations `HA + H₂O ⇌ H₃O⁺ + A⁻` (`Ka`) and `A⁻ + H₂O ⇌ HA + OH⁻` (`Kb`) cancels both `HA` and `A⁻`, yielding `2H₂O ⇌ H₃O⁺ + OH⁻` (`Kw`). Multiplying equilibrium constants gives `Ka × Kb = Kw`: a very weak acid like cyanide (`HCN`, `Ka = 6.2 × 10⁻¹⁰`) yields a moderately basic conjugate (`CN⁻`, `Kb = 1.61 × 10⁻⁵`), whereas chloride (`Cl⁻`), the conjugate of strong `HCl`, has negligible basicity (`Kb < 10⁻²⁰`).

## Step-by-Step Worked Example: Methylamine Equilibrium and Conjugate `Ka`

Calculate `[OH⁻]`, `pOH`, `pH`, and the conjugate acid `Ka` for a `0.200 M` aqueous solution of methylamine (`CH₃NH₂`, `Kb = 4.4 × 10⁻⁴`, `pKb = 3.36`) at `25 °C` (`Kw = 1.00 × 10⁻¹⁴`).

1. **Test the 5% approximation:**
   `x_approx = √(4.4 × 10⁻⁴ × 0.200) = √(8.8 × 10⁻⁵) = 9.381 × 10⁻³ M`.
   Percent ionization check: `(9.381 × 10⁻³ / 0.200) × 100 = 4.69%`—just under `5%`, yet close enough that the exact quadratic improves precision.
2. **Solve the exact quadratic equation (`x² + Kb·x − Kb·C₀ = 0`):**
   `x = (−4.4 × 10⁻⁴ + √((4.4 × 10⁻⁴)² + 4 × 4.4 × 10⁻⁴ × 0.200)) / 2`
   `x = (−0.00044 + √(1.936 × 10⁻⁷ + 3.520 × 10⁻⁴)) / 2`
   `x = (−0.00044 + 0.018767) / 2 = 9.163 × 10⁻³ M = [OH⁻]`.
3. **Compute `pOH`, `pH`, and percent ionization:**
   `pOH = −log₁₀(9.163 × 10⁻³) = 2.04`.
   `pH = 14.00 − 2.04 = 11.96`.
   Actual percent ionization `= (9.163 × 10⁻³ / 0.200) × 100 = 4.58%`.
4. **Determine the conjugate acid (`CH₃NH₃⁺`) constant:**
   `Ka = Kw / Kb = (1.00 × 10⁻¹⁴) / (4.4 × 10⁻⁴) = 2.27 × 10⁻¹¹` (`pKa = 14.00 − 3.36 = 10.64`).

If this same `0.200 M` methylamine assay is run in a `37 °C` bioreactor (`pKw = 13.62`), even before considering minor `Kb` drift with temperature, `pKw` alone shifts the corresponding `pH` scale downward by `0.38` units.

## Benchmark Reference: Common Weak Bases and Conjugate Acids (`25 °C`)

The table below benchmarks six representative bases at `0.100 M` using exact quadratic solutions (`25 °C`, `pKw = 14.00`), illustrating how electron-donating alkyl groups boost basicity relative to ammonia while resonance-delocalized aromatic amines suppress it.

| Weak Base | Formula | `Kb` (`25 °C`) | `pKb` | Conjugate Acid `pKa` | `0.10 M` Exact pH | Chemical Class |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Diethylamine | `(C₂H₅)₂NH` | `6.9 × 10⁻⁴` | `3.16` | `10.84` | `11.90` | Secondary aliphatic amine |
| Methylamine | `CH₃NH₂` | `4.4 × 10⁻⁴` | `3.36` | `10.64` | `11.81` | Primary aliphatic amine |
| Ammonia | `NH₃` | `1.8 × 10⁻⁵` | `4.74` | `9.26` | `11.12` | Inorganic base |
| Acetate Ion | `CH₃COO⁻` | `5.71 × 10⁻¹⁰` | `9.24` | `4.76` | `8.88` | Carboxylate conjugate base |
| Pyridine | `C₅H₅N` | `1.7 × 10⁻⁹` | `8.77` | `5.23` | `9.12` | Heteroaromatic amine |
| Aniline | `C₆H₅NH₂` | `4.3 × 10⁻¹⁰` | `9.37` | `4.63` | `8.82` | Resonance-stabilized arylamine |

## Industrial Applications, Common Pitfalls, and Precision Caveats

Weak base equilibria govern pharmaceutical salt formation, ammonia stripping, and reversed-phase chromatography. Over `40%` of small-molecule drugs contain basic amine groups (`pKa_conj = 7–10`); converting the free base into a hydrochloride or mesylate salt boosts aqueous solubility in gastric fluid (`pH 1.5–2.0`). In wastewater treatment, controlling pH relative to ammonia's conjugate `pKa` (`9.26` at `25 °C`) dictates whether volatile `NH₃` strips out or remains protonated as `NH₄⁺`.

Avoid four common calculation and experimental traps:

* **Using `14.00` for `pKw` outside `25 °C`:** At `37 °C`, `pKw = 13.62`; applying `14.00 − pOH` introduces a `+0.38` pH unit bias in physiological assays.
* **Forgetting salt stoichiometry:** Dissolving `0.10 M` calcium acetate (`Ca(CH₃COO)₂`) yields `0.20 M` acetate (`[A⁻]_0 = 2 × C_salt`), doubling the effective base concentration.
* **Ignoring atmospheric `CO₂` absorption:** Open weak-base solutions absorb `CO₂` to form bicarbonate (`HCO₃⁻`), lowering measured pH and skewing apparent `pKb`.
* **Applying `Kb` directly to a conjugate acid:** For ammonium chloride (`NH₄Cl`), `NH₄⁺` acts as an acid; convert `Ka = Kw / Kb` (`5.56 × 10⁻¹⁰`) before solving the ICE table.
