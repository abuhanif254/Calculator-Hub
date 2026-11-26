---
title: "Faraday's Law of Electrolysis Calculator"
description: "Quantify deposited mass, electroplating thickness, required current duration, and Faradaic efficiency using Faraday's Laws of Electrolysis and our free calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "faradays-law-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the exact physical meaning of Faraday's constant (96,485 C/mol)?"
    answer: "Faraday's constant (F) equals the elementary charge of one electron (1.602176634 × 10⁻¹⁹ C) multiplied by Avogadro's number (6.02214076 × 10²³ mol⁻¹), yielding 96,485.33212 C/mol. It represents the exact total electric charge carried by one mole of electrons flowing through an electrochemical circuit."
  - question: "How do Faraday's First and Second Laws combine into a single equation?"
    answer: "The First Law states that mass deposited is directly proportional to total electric charge passed (m ∝ Q). The Second Law states that for a fixed charge, different substances deposit in proportion to their chemical equivalent weight (M / n). Combining both yields m = (Q × M) / (n × F)."
  - question: "Why does actual electroplated mass often fall below Faraday's theoretical prediction?"
    answer: "Faraday's equation assumes 100% Faradaic (current) efficiency—meaning every electron drives the target deposition half-reaction. In practice, parasitic side reactions such as hydrogen gas evolution (2 H⁺ + 2 e⁻ → H₂) or oxygen evolution consume part of the applied current, reducing actual mass by the current efficiency factor η (m_actual = η × m_theo)."
  - question: "How do you convert Faraday's deposited mass into electroplating thickness?"
    answer: "Divide the deposited mass m (in grams) by the product of the metal's bulk density ρ (in g/cm³) and the plated surface area A (in cm²): d = m / (ρ × A). Multiplying the resulting thickness in centimeters by 10,000 converts it directly into micrometers (µm)."
  - question: "Does changing the applied voltage directly change the mass deposited per coulomb?"
    answer: "No—mass deposited depends on total charge (Q = I × t) and electron stoichiometry (n), not voltage directly. However, raising voltage increases current (I) according to Ohm's law and electrode kinetics, which delivers charge faster while also potentially lowering Faradaic efficiency if side-reaction potentials are crossed."
---

**Faraday's Laws of Electrolysis** link electrical charge passed through a cell to the mass of substance oxidized or reduced at each electrode: `m = (I × t × M) / (n × F)`. Passing `96,485 coulombs` (one faraday) transfers one mole of electrons, depositing one chemical equivalent weight (`M / n` grams) at `100%` Faradaic efficiency.

This stoichiometric law governs industrial electroplating, metal refining, chlor-alkali brine electrolysis, and hydrogen production. Our [Faraday's Law Calculator](/en/calculators/faradays-law-calculator) computes deposited mass, molar yield, total charge (`Q`), or required plating time from current (`I`), duration (`t`), molar mass (`M`), and valence change (`n`), with optional current-efficiency adjustments.

## Faraday's Two Laws, Core Equations, and Parameter Definitions

Michael Faraday's two empirical laws unify into a single conservation relation linking circuit amperage directly to molar stoichiometry:

```text
Total Electric Charge:      Q = I × t
Moles of Substance:         n_mol = Q / (n × F) = (I × t) / (n × F)
Theoretical Mass:           m_theo = (Q × M) / (n × F) = (I × t × M) / (n × F)
Actual Mass (w/ Efficiency): m_actual = η × (I × t × M) / (n × F)
Required Plating Time:      t = (m_target × n × F) / (η × I × M)
Average Plating Thickness:  d = m_actual / (ρ × A)
```

* **`m` (Mass, `g`):** Mass of solid deposited, anode dissolved, or gas evolved at the working electrode.
* **`Q` (Electric Charge, `C`):** Total coulombs passed (`1 C = 1 A × 1 s`). One ampere-hour (`1 Ah`) equals exactly `3,600 C`.
* **`I` (Direct Current, `A`):** Steady DC current flowing through the electrolytic cell in amperes.
* **`t` (Duration, `s`):** Total electrolysis time converted strictly into **seconds** before multiplying by current.
* **`M` (Molar Mass, `g/mol`):** Standard atomic or molecular weight of the target species (`e.g., 63.546 g/mol` for `Cu`).
* **`n` (Electrons Transferred):** Stoichiometric electron count per mole of product formed (`1` for `Ag⁺`, `2` for `Cu²⁺` or `H₂`, `3` for `Al³⁺`).
* **`F` (Faraday Constant):** `96,485 C/mol` (`96,485.33212 C/mol` SI exact).
* **`η` (Faradaic / Current Efficiency):** Dimensionless fraction (`0 < η ≤ 1`) of total charge consumed by the intended reaction rather than side reactions.

## Step-by-Step Worked Examples

### Example 1: Copper Electroplating Mass and Coating Thickness

An electronics manufacturer electroplates copper (`Cu²⁺ + 2 e⁻ → Cu`, `M = 63.546 g/mol`, `n = 2`, density `ρ = 8.96 g/cm³`) onto a printed circuit panel of total active area `A = 200 cm²`. The rectifier supplies `12.5 A` for `45.0 minutes` at `95.0%` Faradaic efficiency (`η = 0.950`). Calculate the plated copper mass and average layer thickness.

1. **Convert Time to Seconds and Compute Total Charge `Q`:**
   `t = 45.0 min × 60 s/min = 2,700 s`
   `Q = 12.5 A × 2,700 s = 33,750 C`
2. **Calculate Theoretical Copper Mass (`100%` Efficiency):**
   `m_theo = (33,750 × 63.546) / (2 × 96,485) = 2,144,677.5 / 192,970 = 11.114 g`
3. **Apply `95.0%` Current Efficiency:**
   `m_actual = 0.950 × 11.114 g = 10.558 g ≈ 10.56 g`
4. **Compute Average Plating Thickness:**
   `d = 10.558 g / (8.96 g/cm³ × 200 cm²) = 10.558 / 1,792 = 0.005892 cm = 58.9 µm`

### Example 2: Calculating Required Electrolysis Time for Silver Plating

A jeweler needs to deposit `25.0 g` of pure silver from an `Ag⁺` bath (`M = 107.868 g/mol`, `n = 1`) using a steady `8.00 A` current at `100%` current efficiency (`η = 1.00`). How long must the bath run?

1. **Rearrange Faraday's Equation for `t`:**
   `t = (m × n × F) / (η × I × M)`
   `t = (25.0 × 1 × 96,485) / (1.00 × 8.00 × 107.868) = 2,412,125 / 862.944 = 2,795.23 s`
2. **Convert Seconds to Minutes:**
   `t = 2,795.23 s / 60 = 46.59 minutes` (approximately `46 minutes, 35 seconds`).

## Electrochemical Equivalents Across Industrial Species

The electrochemical equivalent `Z = M / (n × F)` measures exact mass produced per coulomb of charge at `100%` Faradaic efficiency:

| Target Species & Half-Reaction | Electrons (`n`) | Molar Mass `M` (`g/mol`) | `Z` (`mg/C`) | Mass per `10,000 C` (`g`) | Primary Industrial Process |
| :--- | :---: | :---: | :---: | :---: | :--- |
| Silver (`Ag⁺ + e⁻ → Ag`) | `1` | `107.868` | `1.118` | `11.18` | Decorative & RF contact plating |
| Copper (`Cu²⁺ + 2 e⁻ → Cu`) | `2` | `63.546` | `0.329` | `3.29` | Cathode electrorefining & PCBs |
| Nickel (`Ni²⁺ + 2 e⁻ → Ni`) | `2` | `58.693` | `0.304` | `3.04` | Corrosion barrier undercoats |
| Chromium (`Cr(VI) + 6 e⁻ → Cr`) | `6` | `51.996` | `0.0898` | `0.898` | Hard chrome wear coatings |
| Aluminum (`Al³⁺ + 3 e⁻ → Al`) | `3` | `26.982` | `0.0932` | `0.932` | Hall-Héroult primary smelting |
| Hydrogen (`2 H⁺ + 2 e⁻ → H₂`) | `2` | `2.016` | `0.0104` | `0.104` | PEM & alkaline water electrolysis |

## Process Engineering Applications, Pitfalls, and Caveats

Beyond plating, Faraday's Law governs energy demand in primary smelting and gas synthesis. Producing `1 metric ton (1,000,000 g)` of aluminum (`Z = 0.0932 mg/C`) requires `1.073 × 10¹⁰ C` (`2.980 × 10⁶ Ah`); at a Hall-Héroult cell potential of `4.5 V` and `92%` efficiency, minimum electricity use reaches `14,576 kWh` (`14.6 MWh`) per ton.

* **Time-Unit Mismatch:** Plugging minutes or hours directly into `Q = I × t` causes a `60×` or `3,600×` error. Always convert to seconds (`min × 60`, `h × 3,600`) or use `1 Ah = 3,600 C`.
* **Wrong Oxidation State (`n`):** Copper uses `Cu⁺` (`n = 1`, `Z = 0.659 mg/C`) in cyanide baths versus `Cu²⁺` (`n = 2`, `Z = 0.329 mg/C`) in sulfate baths, while `Cr³⁺` deposits double the mass per coulomb of `Cr⁶⁺`. Confirm ionic valence before setting `n`.
* **Low-Efficiency Baths and Edge Build-Up:** Hexavalent chrome plating typically runs at `12%–20%` current efficiency due to hydrogen evolution. Furthermore, Faraday's Law yields *average* thickness; sharp corners draw higher current density than recessed cavities without thief electrodes.
