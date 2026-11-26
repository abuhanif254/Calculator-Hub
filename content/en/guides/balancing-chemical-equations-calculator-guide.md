---
title: "Balancing Chemical Equations: The Law of Conservation"
description: "Master stoichiometric balancing using inspection and linear algebra, preserve atomic and charge conservation, and verify reactions with our Balancing Chemical Equations Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "balancing-chemical-equations-calculator"
relatedType: "calculator"
faqs:
  - question: "Why can you never change subscripts when balancing a chemical equation?"
    answer: "Subscripts define the fixed atomic composition and chemical identity of a compound. Changing H₂O to H₂O₂ turns harmless water into corrosive hydrogen peroxide, altering the reaction entirely. Only stoichiometric coefficients placed in front of complete formulas may be adjusted to balance atom counts."
  - question: "How does matrix algebra balance complex chemical equations?"
    answer: "Each unique element (plus net electric charge for ionic equations) forms one linear conservation equation across the unknown reaction coefficients. Arranging those atom counts into a stoichiometric matrix A and solving the homogeneous system A × x = 0 yields the null-space vector, which is then scaled to the smallest coprime positive integers."
  - question: "What should you do if balancing produces fractional coefficients like 5/2 or 11/2?"
    answer: "Multiply every coefficient across the entire equation—both reactants and products—by the least common denominator to clear all fractions. For example, multiplying C₂H₆ + (7/2) O₂ → 2 CO₂ + 3 H₂O by 2 yields the canonical integer equation 2 C₂H₆ + 7 O₂ → 4 CO₂ + 6 H₂O."
  - question: "Do ionic redox equations need balanced charge as well as balanced atoms?"
    answer: "Yes. Conservation of electric charge is strictly required alongside conservation of mass. An ionic equation such as Cu + Ag⁺ → Cu²⁺ + Ag has equal atom counts on both sides (1 Cu, 1 Ag) but fails charge balance (+1 on left vs. +2 on right); adding coefficients gives Cu + 2 Ag⁺ → Cu²⁺ + 2 Ag (+2 on both sides)."
  - question: "Why are some chemical equations flagged as having infinite balancing solutions?"
    answer: "If an input merges two independent chemical reactions into a single expression—such as H₂ + O₂ + CO + H₂O → CO₂ + H₂O₂—the system matrix has a nullity greater than one. Because the two sub-reactions can occur in arbitrary proportions, no single unique ratio of coefficients exists without separating the equations."
---

**Balancing a chemical equation** enforces the Conservation of Mass and Charge by matching every element's atom count—and total net ionic charge—between reactants and products. Because chemical reactions rearrange valence bonds without creating or destroying nuclei, balanced equations establish the exact molar ratios needed for yield calculations, limiting-reagent checks, and thermochemical balances.

While simple reactions balance quickly by inspection, multi-species redox, disproportionation, and combustion equations often create coupled dependencies. Our [Balancing Chemical Equations Calculator](/en/calculators/balancing-chemical-equations-calculator) converts molecular formulas, polyatomic groups, and ionic charges into a linear system to return minimal whole-number coefficients instantly.

## Conservation Principles, Notation Rules, and Algebraic Formulation

Every chemical formula carries two distinct numerical markers that play fundamentally different roles during stoichiometric balancing:

```text
Mass Conservation:     ∑ (x_i × a_ij)_reactants = ∑ (x_k × a_kj)_products   for every element j
Charge Conservation:   ∑ (x_i × q_i)_reactants  = ∑ (x_k × q_k)_products
Matrix Null Space:     A × x = 0   (normalized so gcd(x₁, x₂, ..., xₙ) = 1 and all x_m ∈ ℤ⁺)
```

* **Subscripts (Immutable Composition):** Small numbers inside a formula (such as the `2` and `4` in `H₂SO₄`) specify the bonded atomic stoichiometry of one molecule or formula unit. Editing a subscript changes the chemical species itself and invalidates the reaction.
* **Coefficients (Adjustable Multipliers):** Whole numbers placed before a formula (such as the `3` in `3 CO₂`) multiply every atom and charge inside that species. An omitted coefficient always equals `1`.
* **Polyatomic Ion Grouping:** When an intact polyatomic unit such as sulfate (`SO₄²⁻`), nitrate (`NO₃⁻`), or ammonium (`NH₄⁺`) appears unchanged on both sides of a double-displacement reaction, treating it as a single composite token cuts equation complexity sharply.
* **Canonical Integer Form:** Properly balanced stoichiometric equations use the smallest positive integers sharing a greatest common divisor (`gcd`) of `1`.

### Inspection Heuristic vs. Linear Null-Space Method

For routine classroom and bench stoichiometry, **balancing by inspection** follows a reliable order: balance elements appearing in only one reactant and one product first (typically metals and carbon), treat intact polyatomic ions as single units, balance hydrogen second-to-last, and finish with elemental oxygen or halogens. Whenever an element appears in three or more species—or whenever oxidation states shift across multiple products—**Gaussian elimination** on the composition matrix `A` guarantees an exact solution without trial-and-error loops.

## Step-by-Step Worked Examples

### Example 1: Inspection Balancing of Propane Combustion

Balance the complete combustion of propane in oxygen: `C₃H₈ + O₂ → CO₂ + H₂O`.

1. **Balance Carbon:** Propane supplies `3 C` atoms, so set `CO₂` to `3`: `C₃H₈ + O₂ → 3 CO₂ + H₂O`.
2. **Balance Hydrogen:** Propane supplies `8 H` atoms (`4 H₂O` gives `8 H`): `C₃H₈ + O₂ → 3 CO₂ + 4 H₂O`.
3. **Balance Oxygen Last:** Products hold `(3 × 2) + 4 = 10 O` atoms, requiring `5 O₂`: `C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O`.
4. **Verify Mass:** Reactants total `44.097 + 5 × 31.998 = 204.087 g/mol`; products total `3 × 44.009 + 4 × 18.015 = 204.087 g/mol`.

### Example 2: Matrix Algebra for Iron Pyrite Roasting

Balance pyrite roasting: `a FeS₂ + b O₂ → c Fe₂O₃ + d SO₂`.

1. **Conservation Equations:** `Fe: a = 2c`; `S: 2a = d`; `O: 2b = 3c + 2d`.
2. **Set `c = 2`:** `a = 4`, `d = 8`, and `2b = 3(2) + 2(8) = 22` → `b = 11`.
3. **Verify:** `4 FeS₂ + 11 O₂ → 2 Fe₂O₃ + 8 SO₂` (`gcd(4, 11, 2, 8) = 1`; `4 Fe`, `8 S`, `22 O` per side).

## Benchmark Reaction Types and Balancing Profiles

| Reaction Class | Unbalanced Skeleton | Balanced Stoichiometry | Coefficient Vector | Key Balancing Constraint |
| :--- | :--- | :--- | :---: | :--- |
| Alkane combustion | `C₃H₈ + O₂ → CO₂ + H₂O` | `C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O` | `[1, 5, 3, 4]` | Leave free `O₂` until last |
| Haber-Bosch synthesis | `N₂ + H₂ → NH₃` | `N₂ + 3 H₂ → 2 NH₃` | `[1, 3, 2]` | Odd-even `H` parity (`2` vs. `3`) |
| Thermite reduction | `Al + Fe₂O₃ → Al₂O₃ + Fe` | `2 Al + Fe₂O₃ → Al₂O₃ + 2 Fe` | `[2, 1, 1, 2]` | Conserved `O₃` oxide frame |
| Sulfide roasting | `FeS₂ + O₂ → Fe₂O₃ + SO₂` | `4 FeS₂ + 11 O₂ → 2 Fe₂O₃ + 8 SO₂` | `[4, 11, 2, 8]` | Even `O₂` vs. odd `Fe₂O₃` |
| Cellular respiration | `C₆H₁₂O₆ + O₂ → CO₂ + H₂O` | `C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O` | `[1, 6, 6, 6]` | Internal oxygen in glucose |
| Acidic redox titration | `MnO₄⁻ + Fe²⁺ + H⁺ → Mn²⁺ + Fe³⁺ + H₂O` | `MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O` | `[1, 5, 8, 1, 5, 4]` | Both mass and `+17` net charge |

## Process Applications, Common Pitfalls, and Precision Caveats

Stoichiometrically balanced equations underpin chemical reactor sizing, flue-gas excess-air control, pharmaceutical synthesis batch records, and emissions accounting. In combustion engineering, balancing the hydrocarbon fuel equation directly determines the stoichiometric air-to-fuel mass ratio (`AFR`), whereas industrial ammonia synthesis and sulfuric acid contact plants rely on balanced coefficients to compute theoretical conversion ceilings and heat-exchanger duties.

* **Leaving Fractional Coefficients Unscaled:** Standard enthalpy of formation (`ΔH°_f`) and combustion tables occasionally write `(1/2) O₂` or `(15/2) O₂` to normalize one mole of a target compound. Unless you are explicitly writing a per-mole thermochemical reference equation, always clear fractions by multiplying through so every coefficient is an integer.
* **Neglecting Net Ionic Charge:** In net ionic redox reactions, balancing only atoms often produces plausible-looking but chemically false equations. Always include an extra charge-balance row (`∑ q_reactants = ∑ q_products`) when species carry `+` or `−` charges.
* **Misinterpreting Spectator Ions and States:** Including inactive counter-ions (`Na⁺`, `NO₃⁻`) on one side only—or omitting required aqueous acid/base species (`H⁺`, `OH⁻`, `H₂O`) in aqueous redox reactions—makes an equation mathematically unsolvable (`x = 0` trivial solution). Ensure every participating atom and solvent proton/oxygen source is listed before running a matrix solver.
