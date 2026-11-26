---
title: "Hess's Law Calculator: Adding Up Enthalpy"
description: "Apply Hess's Law to combine intermediate reactions, reverse and scale enthalpy steps, and verify net thermodynamic cycles without laboratory guesswork."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "hess-law-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does Hess's Law work even when the intermediate reactions never actually happen in sequence?"
    answer: "Enthalpy (H) is a thermodynamic state function, meaning its value depends solely on the current chemical composition, temperature, pressure, and physical state—never on the reaction mechanism or path taken. As long as the initial reactants and final products match in identity and phase, any mathematically valid chain of balanced equations yields the exact same net ΔH as a hypothetical single-step reaction."
  - question: "What happens to ΔH when you reverse or multiply an intermediate chemical equation?"
    answer: "Reversing an equation exchanges reactants and products, so you must invert the algebraic sign of ΔH (multiplying by −1). Multiplying or dividing all stoichiometric coefficients by a positive constant k scales the extensive enthalpy change by that same factor k. Both operations can be combined cleanly—for example, reversing and doubling a step multiplies its ΔH by −2."
  - question: "Can Hess's Law steps cancel out if the physical states do not match?"
    answer: "No. Species cancel across intermediate steps only when both their chemical formula and physical phase tag are identical. For instance, H₂O(l) on the product side of one step will not cancel H₂O(g) on the reactant side of another step unless you insert the phase-change bridge H₂O(l) → H₂O(g) with ΔH_vap = +44.0 kJ/mol at 298 K."
  - question: "How do I choose which intermediate step to anchor first in a multi-step Hess's Law problem?"
    answer: "Start with species that appear in only one intermediate equation and in the target equation (unique anchors). Flip and scale each anchor step so its unique reactant or product lands on the correct side of the arrow with the exact target coefficient. Once all unique species are locked in, adjust the remaining auxiliary steps (often O₂, H₂O, or CO₂ combustion reactions) to cancel leftover intermediates."
  - question: "Does Hess's Law apply to Gibbs free energy (ΔG) and entropy (ΔS) as well as enthalpy (ΔH)?"
    answer: "Yes. Because U, H, S, and G are all state functions evaluated at fixed temperature and pressure, the exact same reversal, scaling, and summation rules apply to ΔG° and ΔS°. By contrast, work (w) and heat (q) along an arbitrary non-constant-pressure path are path functions and cannot be summed using Hess's Law."
---

**Hess's Law of Constant Heat Summation** states that the total enthalpy change (`ΔH_total`) of a reaction is identical whether it proceeds in one direct step or across multiple intermediate steps at the same temperature and pressure: `ΔH_total = Σ(s_i × k_i × ΔH_i)`.

Because enthalpy (`H`) is a **state function**, intermediate species cancel algebraically without altering the net energy difference between initial reactants and final products. Our [Hess's Law Calculator](/en/calculators/hess-law-calculator) validates species cancellation, tracks sign inversions and scalar multipliers, and computes net enthalpies across multi-step cycles.

## State-Function Principles and Algebraic Rules

Path independence (`∮ dH = 0` around any closed cycle) lets chemists determine enthalpies for reactions that are too slow, explosive, or side-product-prone to measure directly—such as partial carbon oxidation or diamond conversion—by combining clean combustion steps.

```text
Target Summation:             ΔH_target = Σ(s_i × k_i × ΔH_i)
Reversal Rule (s_i = −1):     If A → B has ΔH, then B → A has −ΔH
Scaling Rule (k_i > 0):       If A → B has ΔH, then kA → kB has k × ΔH
Phase-Bridge Rule:            H₂O(l) → H₂O(g) adds +44.0 kJ/mol at 298.15 K
Closed Cycle Identity:        ΔH_1 + ΔH_2 + ... + ΔH_n = 0  (when net equation = 0)
```

* **`ΔH_i` (Step Enthalpy, kJ):** Experimental or tabulated enthalpy change for intermediate step `i` as written.
* **`s_i` (Direction Sign, `+1` or `−1`):** Keep `+1` for forward use, or set `−1` when reversing reactants and products.
* **`k_i` (Stoichiometric Multiplier):** Positive factor (`0.5`, `1`, `2`, `3`) matching target coefficients or cancelling intermediates.
* **Phase Consistency:** Cancelled species must match in both formula and state tag (`(s)`, `(l)`, `(g)`, `(aq)`), because latent heat (`ΔH_fus`, `ΔH_vap`) alters `ΔH`.

### Systematic Anchor Strategy

To avoid circular algebra in multi-step cycles, lock **unique species** first—compounds appearing in the target equation and only one intermediate step. Flip and scale each anchor step to match the target side and coefficient, then adjust shared combustion species (`O₂`, `CO₂`, `H₂O`) last so remaining intermediates cancel cleanly.

## Step-by-Step Worked Example: Indirect Synthesis of Methane

Calculate `ΔH°_f` for `C(graphite) + 2 H₂(g) → CH₄(g)` at `298.15 K` from three combustion reactions:

* **Step 1:** `C(graphite) + O₂(g) → CO₂(g)` | `ΔH₁ = −393.5 kJ`
* **Step 2:** `H₂(g) + 0.5 O₂(g) → H₂O(l)` | `ΔH₂ = −285.8 kJ`
* **Step 3:** `CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)` | `ΔH₃ = −890.3 kJ`

1. **Anchor `C(graphite)` (Step 1, `s₁ = +1`, `k₁ = 1`):** `C(graphite) + O₂(g) → CO₂(g)` | `ΔH₁' = −393.5 kJ`.
2. **Anchor `2 H₂(g)` (Step 2, `s₂ = +1`, `k₂ = 2`):** `2 H₂(g) + O₂(g) → 2 H₂O(l)` | `ΔH₂' = 2 × (−285.8) = −571.6 kJ`.
3. **Anchor `CH₄(g)` on product side (Step 3, `s₃ = −1`, `k₃ = 1`):** `CO₂(g) + 2 H₂O(l) → CH₄(g) + 2 O₂(g)` | `ΔH₃' = +890.3 kJ`.
4. **Sum equations and cancel intermediates:** Left-side `CO₂(g)`, `2 H₂O(l)`, and `2 O₂(g)` cancel identically against the right side, leaving `C(graphite) + 2 H₂(g) → CH₄(g)`.
5. **Sum adjusted enthalpies:** `ΔH_target = −393.5 + (−571.6) + 890.3 = −74.8 kJ/mol`.

## Hess's Law Operations and Benchmark Thermochemical Cycles

| Target Reaction / Cycle | Intermediate Steps Combined | Manipulation Applied | Net `ΔH°` (kJ) | Why Indirect Calculation Is Used |
| :--- | :--- | :--- | :---: | :--- |
| Carbon Monoxide (`C + 0.5 O₂ → CO`) | `C + O₂ → CO₂` (`−393.5`); `CO + 0.5 O₂ → CO₂` (`−283.0`) | Step 1 (`×1`); Reverse Step 2 (`×−1`) | `−110.5` | Direct oxidation co-produces `CO₂` |
| Methane Synthesis (`C + 2 H₂ → CH₄`) | Combustions of `C`, `H₂`, `CH₄` | Step 1 (`×1`); Step 2 (`×2`); Rev. Step 3 | `−74.8` | Direct reaction forms mixed alkanes |
| Contact Process (`2 SO₂ + O₂ → 2 SO₃`) | `S + O₂ → SO₂` (`−296.8`); `S + 1.5 O₂ → SO₃` (`−395.7`) | Reverse Step 1 (`×−2`); Step 2 (`×2`) | `−197.8` | Uncatalyzed oxidation stalls at `298 K` |
| Graphite-to-Diamond (`C(gr) → C(dia)`) | `C(gr) + O₂ → CO₂` (`−393.51`); `C(dia) + O₂ → CO₂` (`−395.40`) | Step 1 (`×1`); Reverse Step 2 (`×−1`) | `+1.89` | Conversion requires GPa pressure |
| Acetylene Hydrogenation (`C₂H₂ + 2 H₂ → C₂H₆`) | Combustions of `C₂H₂` (`−1,301.1`), `H₂`, `C₂H₆` (`−1,560.8`) | Step 1 (`×1`); Step 2 (`×2`); Rev. Step 3 | `−311.9` | Isolates stepwise hydrogenation heat |
| Steam Formation (`H₂ + 0.5 O₂ → H₂O(g)`) | `H₂ + 0.5 O₂ → H₂O(l)` (`−285.8`); `H₂O(l) → H₂O(g)` (`+44.0`) | Step 1 (`×1`); Step 2 (`×1`) | `−241.8` | Bridges liquid product to vapor |

## Practical Engineering Applications and Common Pitfalls

Hess's Law underpins **Born–Haber ionic lattice cycles**, **fuel-reforming energy balances**, and **biochemical ATP pathways**. In syngas plants, engineers combine steam-methane reforming (`+206.1 kJ/mol`) with the water-gas shift (`−41.2 kJ/mol`) to establish a net reactor duty of `+164.9 kJ/mol` without testing every intermediate mixture.

Watch for four recurring mistakes when building cycles:

* **Reversing an equation without flipping `ΔH`:** Keeping `−890.3 kJ` after flipping methane combustion creates a `1,780.6 kJ` error.
* **Scaling stoichiometry without scaling `ΔH`:** Halving `2 H₂ + O₂ → 2 H₂O(l)` (`−571.6 kJ`) must also halve `ΔH` to `−285.8 kJ/mol`.
* **Mixing temperatures across steps:** Combining `298 K` combustion steps with `373 K` `ΔH_vap` (`+40.7 kJ/mol` instead of `+44.0 kJ/mol`) breaks isothermal path closure.
* **Ignoring phase mismatches:** Cancelling `H₂O(l)` against `H₂O(g)` omits `44.0 kJ/mol` of latent vaporization enthalpy.

Load a preset cycle or input custom equations into the [Hess's Law Calculator](/en/calculators/hess-law-calculator) to verify cancellation and inspect cumulative enthalpy steps.
