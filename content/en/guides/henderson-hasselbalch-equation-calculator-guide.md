---
title: "Henderson-Hasselbalch Equation: Buffer Solutions"
description: "Learn how the Henderson-Hasselbalch equation works, how buffer solutions resist pH changes, and use our free calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "henderson-hasselbalch-equation-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the effective pH range of a chemical buffer?"
    answer: "A buffer resists pH changes reliably within pKa ± 1.0 pH unit, which corresponds to a conjugate base-to-acid ratio ([A⁻]/[HA]) between 1:10 and 10:1. Outside that window, one buffer component falls below 9% of total molarity and the solution loses capacity to neutralize incoming strong acid or base."
  - question: "When does the Henderson-Hasselbalch equation break down?"
    answer: "The equation breaks down when total buffer concentration is very dilute (below ~10⁻³ M), when the weak acid is relatively strong (pKa < 3) or very weak (pKa > 11), or when |pH − pKa| exceeds 1.5. Under those conditions, equilibrium dissociation and water autoionization noticeably alter the initial [A⁻] and [HA] concentrations."
  - question: "Does diluting a buffer with pure water change its pH?"
    answer: "Moderately diluting a buffer leaves its pH nearly unchanged because both [A⁻] and [HA] scale down by the same dilution factor, keeping the ratio [A⁻]/[HA] constant. However, dilution proportionally reduces buffer capacity (β), meaning the diluted solution handles fewer moles of added acid or base before pH shifts, and extreme dilution shifts pH toward 7.00."
  - question: "Why does temperature affect Tris buffers far more than phosphate buffers?"
    answer: "Tris has a large ionization enthalpy, giving it a temperature coefficient of roughly −0.028 pH units per °C—a Tris buffer adjusted to pH 7.40 at 25 °C drops to pH 7.06 at 37 °C. Phosphate buffer (H₂PO₄⁻/HPO₄²⁻) has a much smaller enthalpy of dissociation (−0.0028 pH/°C), shifting by only −0.03 units over the same 12 °C span."
  - question: "How does the Henderson-Hasselbalch equation apply to blood gas analysis?"
    answer: "Clinicians model arterial blood pH using the bicarbonate form: pH = 6.1 + log₁₀([HCO₃⁻] / (0.03 × PaCO₂)), where [HCO₃⁻] is plasma bicarbonate in mmol/L and PaCO₂ is arterial carbon dioxide tension in mmHg. Normal physiology maintains a 20:1 ratio (24 mmol/L bicarbonate to 1.2 mmol/L dissolved CO₂), yielding pH 7.40."
---

The **Henderson-Hasselbalch equation** (`pH = pKa + log₁₀([A⁻] / [HA])`) links a buffer solution's pH directly to the acid dissociation constant (`pKa`) of a weak acid and the molar ratio of its conjugate base (`[A⁻]`) to unionized acid (`[HA]`). By pairing a proton donor (`HA`) with a proton acceptor (`A⁻`) in comparable concentrations, a buffer consumes incoming `H₃O⁺` or `OH⁻` ions through stoichiometric conversion between the two partners, holding pH nearly constant against perturbations that would swing pure water by four or more units.

Whether you are formulating a `pH 7.4` cell-culture medium, optimizing an HPLC mobile phase, or interpreting metabolic versus respiratory acid-base disorders, our [Henderson-Hasselbalch Calculator](/en/calculators/henderson-hasselbalch-equation-calculator) solves target pH, required conjugate ratios, and reagent weights cleanly.

## Buffer Equilibrium, Equations, and Parameter Definitions

Rearranging the weak-acid equilibrium law `Ka = [H₃O⁺][A⁻] / [HA]` for `[H₃O⁺]` and taking the negative base-10 logarithm yields the acid and base Henderson-Hasselbalch forms, together with the Van Slyke buffer capacity index (`β`):

```text
Acid Buffer Form:        pH = pKa + log₁₀([A⁻] / [HA])
Mole Ratio Form:         pH = pKa + log₁₀(n_base / n_acid)
Base Buffer Form:        pOH = pKb + log₁₀([BH⁺] / [B])
Required Ratio Solver:   [A⁻] / [HA] = 10^(pH − pKa)
Van Slyke Buffer Index:  β = 2.303 × C_total × (Ka × [H₃O⁺]) / (Ka + [H₃O⁺])²
```

* **`pKa` (Weak Acid Constant):** Negative log of `Ka` at the operating temperature and ionic strength; selects the center of the buffering window.
* **`[A⁻]`, `[HA]` (Conjugate Base and Weak Acid Molarities, M):** Equilibrium concentrations; for standard `0.01–0.5 M` buffers within `pKa ± 1`, analytical initial concentrations approximate equilibrium values closely.
* **`n_base / n_acid` (Mole Ratio):** Because `[A⁻]` and `[HA]` share the same solution volume `V`, molarities cancel to a pure mole ratio—simplifying solid salt weighing.
* **`β` (Buffer Capacity, mol·L⁻¹·pH⁻¹):** Moles of strong acid or base per liter required to shift solution pH by `1.0` unit.

### Effective Buffer Range and Maximum Capacity

Buffering stays effective inside **`pKa ± 1.0`**, corresponding to `[A⁻] / [HA]` ratios from `0.1` (`1:10`) to `10.0` (`10:1`). Buffer capacity `β` reaches its theoretical maximum exactly at **`pH = pKa`** (where `[A⁻] = [HA]`, `log₁₀(1) = 0`, and `β_max = 0.576 × C_total`). Doubling total buffer concentration `C_total = [HA] + [A⁻]` doubles resistance to pH drift without shifting initial pH.

## Step-by-Step Worked Examples: Buffer Design and Strong-Acid Perturbation

### Example 1: Formulating `1.00 L` of `0.200 M` Phosphate Buffer at `pH 7.40`

Select the `H₂PO₄⁻ / HPO₄²⁻` pair (`pKa₂ = 7.20` at `25 °C`), using `NaH₂PO₄` (`HA`, `119.98 g/mol`) and `Na₂HPO₄` (`A⁻`, `141.96 g/mol`).

1. **Solve the Required Conjugate Ratio:**
   `[A⁻] / [HA] = 10^(7.40 − 7.20) = 10^(0.20) = 1.5849`
2. **Enforce Total Molarity (`[HA] + [A⁻] = 0.200 M`):**
   `[HA] × (1 + 1.5849) = 0.200 M` → `[HA] = 0.200 / 2.5849 = 0.07737 M`
   `[A⁻] = 0.200 − 0.07737 = 0.12263 M`
3. **Convert to Reagent Masses for `1.00 L`:**
   `NaH₂PO₄`: `0.07737 mol × 119.98 g/mol = 9.28 g`
   `Na₂HPO₄`: `0.12263 mol × 141.96 g/mol = 17.41 g`

### Example 2: Challenging the Buffer with `0.010 mol HCl`

Add `0.0100 mol` of strong acid (`HCl`) to `1.00 L` of the buffer above (assuming negligible volume change). Strong `H₃O⁺` reacts quantitatively with `HPO₄²⁻` (`A⁻`) to form `H₂PO₄⁻` (`HA`):

1. **Update Moles After Stoichiometric Reaction:**
   `n_A⁻ = 0.12263 − 0.01000 = 0.11263 mol`
   `n_HA = 0.07737 + 0.01000 = 0.08737 mol`
2. **Recalculate Buffer pH:**
   `pH = 7.20 + log₁₀(0.11263 / 0.08737) = 7.20 + log₁₀(1.2891) = 7.20 + 0.110 = 7.31`
   Adding `0.0100 mol` of `HCl` shifts the buffered solution by only **`−0.09` pH units**, whereas adding the same `0.0100 mol HCl` to `1.00 L` of pure water plunges pH from `7.00` to `2.00` (`−5.00` units).

## Common Laboratory and Physiological Buffer Systems

Selecting a buffer requires matching `pKa` to the target pH while accounting for temperature sensitivity and biochemical compatibility:

| Buffer System | Conjugate Acid / Base Pair | `pKa` (`25 °C`) | Effective `pH` Range | Temp Drift (`ΔpKa / °C`) | Primary Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Acetate | `CH₃COOH / CH₃COO⁻` | `4.76` | `3.76–5.76` | `−0.0002` | Enzyme assays, HPLC acidic phases |
| MES | `MES-H⁺ / MES` | `6.15` | `5.50–6.70` | `−0.011` | Plant biology, low-metal-binding media |
| Phosphate | `H₂PO₄⁻ / HPO₄²⁻` | `7.20` | `6.20–8.20` | `−0.0028` | PBS cell washes, protein purification |
| HEPES | `HEPES-H⁺ / HEPES` | `7.55` | `6.80–8.20` | `−0.014` | Mammalian cell culture (`CO₂`-independent) |
| Tris | `Tris-H⁺ / Tris` | `8.07` | `7.07–9.07` | `−0.028` | DNA/RNA electrophoresis, protein lysis |
| Bicarbonate | `H₂CO₃ / HCO₃⁻` | `6.10` (`37 °C` plasma) | `5.10–7.10` (open `CO₂` at `7.4`) | Temperature & `pCO₂` linked | Arterial blood buffering, `CO₂` incubators |

## Approximation Boundaries, Ionic Strength, and Clinical Caveats

* **Ionic Strength and Activity Corrections:** The textbook Henderson-Hasselbalch equation uses concentrations rather than thermodynamic activities (`pH = pKa° + log₁₀([A⁻]/[HA]) + log₁₀(γ_A⁻ / γ_HA)`). In `0.1–0.5 M` phosphate buffers or high-salt physiological media, multivalent ions like `HPO₄²⁻` have activity coefficients well below `1.0`, shifting apparent `pKa₂` from `7.20` down toward `6.8–6.9`. Standardize critical buffers against a calibrated pH meter at exact working ionic strength.
* **Temperature Drift Pitfalls:** Never adjust a Tris buffer at `22 °C` benchtop temperature for use in a `37 °C` incubator without correction. Because `ΔpKa / ΔT ≈ −0.028 °C⁻¹`, a Tris solution titrated to `pH 7.40` at `25 °C` drops to `pH 7.06` at `37 °C`.
* **Breakdown at Low Concentration or Extreme `pKa`:** When `C_total < 10⁻³ M`, `pKa < 3`, or `pKa > 11`, partial dissociation of `HA` or hydrolysis of `A⁻` breaks the `[A⁻] ≈ C_base` assumption; solve the exact charge-balance polynomial instead.
* **Clinical Blood-Gas Interpretation:** In arterial blood (`pH 7.35–7.45`), the open bicarbonate system operates beyond `pKa + 1` (`pH 7.40` vs. `pKa 6.1`) solely because pulmonary ventilation continuously regulates `PaCO₂` (`40 mmHg`, `0.03 × 40 = 1.2 mmol/L` dissolved `CO₂`) while the kidneys regulate `[HCO₃⁻]` (`24 mmol/L`).
