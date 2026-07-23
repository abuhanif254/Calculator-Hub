---
title: "Solubility Calculator | Mass, Molar & Ksp Solubility Solver"
description: "Free online Solubility Calculator. Instantly convert mass solubility (g/L) to molar solubility (mol/L), calculate solubility from Ksp, solvent volume dissolved mass, and saturation ratio."
metaTitle: "Solubility Calculator | Mass, Molar & Ksp Solubility Solver"
metaDescription: "Free online Solubility Calculator. Instantly convert mass solubility (g/L) to molar solubility (mol/L), calculate solubility from Ksp, solvent volume dissolved mass, and saturation ratio."
metaKeywords: "solubility calculator, molar solubility calculator, mass solubility calculator, calculate solubility, solubility from ksp calculator, g/L to mol/L calculator, saturation ratio calculator"
features:
  - "Interactive Cockpit featuring Simple and Advanced Mode toggle"
  - "15 Comprehensive Solubility Modes: Mass solubility (g/L) ↔ Molar solubility (mol/L), Multi-unit converter (g/L, mg/L, g/100 mL, mol/L), Solubility from Ksp, Ksp from solubility, Solvent volume maximum dissolved mass (m = S * V), Saturation ratio analyzer (Unsaturated, Saturated, Supersaturated), Temperature-solubility curves, and Common-ion effect"
  - "🧪 Interactive Compound Cockpit supporting popular chemical compound presets (KNO3, NaCl, AgCl, CaF2, Ce2(SO4)3, O2 gas)"
  - "📋 Dynamic Interactive Multi-Unit Table displaying molar mass, handbook solubility units, and saturation criteria"
  - "📊 Recharts Interactive Plotter visualizing solubility vs temperature curves (0°C to 100°C)"
  - "🎴 Chemistry Study Flashcards and Practice Quiz Generator with step-by-step mathematical derivations"
useCases:
  - "High school, AP Chemistry, and university students learning solubility concepts, molar vs mass solubility, Ksp relationships, and saturation states"
  - "Analytical chemists and laboratory researchers preparing saturated stock solutions and determining maximum solute dissolution limits"
  - "Pharmacologists and chemical engineers evaluating API drug substance solubility, crystallisation yields, and thermal dissolution profiles"
  - "Educators creating visual solubility curve demonstrations and chemistry quizzes"
howToSteps:
  - "Select your Calculation Mode (e.g. Mass ↔ Molar Solubility, Multi-Unit Converter, Maximum Dissolved Mass for Volume V, or Saturation Analyzer)."
  - "Select a Chemical Compound Preset (e.g. KNO3, NaCl, AgCl, CaF2, Ce2(SO4)3, or O2 gas)."
  - "Enter your known mass solubility (g/L), molar solubility (mol/L), molar mass (g/mol), solvent volume (L), or current concentration."
  - "Inspect the calculated molar solubility (mol/L), mass solubility (g/100 mL), maximum dissolved mass (g), and saturation state."
  - "View the interactive temperature-solubility curve and multi-unit table."
  - "Click 'Copy Summary' or 'Print PDF' to export your complete solubility analysis report."
faqs:
  - question: "What is Solubility?"
    answer: "Solubility is the maximum amount of a solute that can dissolve in a given volume of solvent at a specific temperature to achieve dynamic dissolution equilibrium."
  - question: "What is the difference between Molar Solubility and Mass Solubility?"
    answer: "Molar solubility (S_molar) is expressed in moles per liter (mol/L or M). Mass solubility (S_mass) is expressed in grams per liter (g/L) or grams per 100 mL. Convert using Molar Mass: S_mass = S_molar * M."
  - question: "How do you convert g/L to mol/L (Molarity)?"
    answer: "Divide mass solubility in g/L by the compound's molar mass M in g/mol: Molar Solubility (mol/L) = Mass Solubility (g/L) / M (g/mol)."
  - question: "How do you convert g/100 mL to g/L?"
    answer: "Multiply mass solubility in g/100 mL by 10, because 1 Liter contains ten 100 mL portions: g/L = (g/100 mL) * 10."
  - question: "What is a Saturated Solution?"
    answer: "A saturated solution contains the maximum amount of dissolved solute that can exist in dynamic equilibrium with undissolved solid at a given temperature."
  - question: "What is a Supersaturated Solution?"
    answer: "A supersaturated solution contains more dissolved solute than the equilibrium saturation limit, created by dissolving solute at high temperatures and cooling slowly without crystallization."
  - question: "How does Temperature affect Solid Solubility?"
    answer: "For most solid solutes with endothermic dissolution (e.g. KNO3), solubility increases significantly as temperature increases."
  - question: "How does Temperature affect Gas Solubility?"
    answer: "Gas solubility in water DECREASES as temperature increases because dissolving gas molecules is exothermic (Henry's Law)."
  - question: "How do you calculate Maximum Dissolved Mass for a Solvent Volume?"
    answer: "Multiply mass solubility S (g/L) by the solvent volume V (L): Maximum Mass = S * V."
  - question: "How is Solubility related to Ksp?"
    answer: "Ksp is the equilibrium constant for sparingly soluble salts. Molar solubility s can be calculated from Ksp based on stoichiometry (e.g. s = sqrt(Ksp) for 1:1 salt AgCl)."
---

# Laboratory & Analytical Chemistry Guide to Solubility Equilibrium

In analytical, environmental, physical, and pharmaceutical chemistry, **solubility** quantifies the maximum equilibrium concentration of a solute dissolved in a solvent at a given temperature and pressure:

$$\text{Mass Solubility } S_{\text{mass}} \, (\text{g/L}) = S_{\text{molar}} \, (\text{mol/L}) \times M \, (\text{g/mol})$$

$$S_{\text{g/100 mL}} = \frac{S_{\text{g/L}}}{10}$$

$$\text{Maximum Dissolved Mass } m_{\text{max}} = S_{\text{mass}} \, (\text{g/L}) \times V \, (\text{L})$$

$$\text{Saturation Ratio } R_{\text{sat}} = \frac{C_{\text{current}}}{S_{\text{max}}} \quad \begin{cases} R_{\text{sat}} < 1 & \implies \text{Unsaturated (Dissolves completely)} \\ R_{\text{sat}} = 1 & \implies \text{Saturated (Equilibrium)} \\ R_{\text{sat}} > 1 & \implies \text{Supersaturated (Precipitation Favored)} \end{cases}$$

---

## 1. Classical Chemical Compound Solubility Reference Matrix

| Compound | Formula | Molar Mass | $20^\circ\text{C}$ Mass Solubility | $20^\circ\text{C}$ Molar Solubility | Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Potassium Nitrate** | $\text{KNO}_3$ | **101.10 g/mol** | **$316 \text{ g/L}$ ($31.6 \text{ g/100 mL}$)** | **$3.125 \text{ mol/L}$** | Endothermic Solid |
| **Sodium Chloride** | $\text{NaCl}$ | **58.44 g/mol** | **$360 \text{ g/L}$ ($36.0 \text{ g/100 mL}$)** | **$6.160 \text{ mol/L}$** | Flat Solid |
| **Silver Chloride** | $\text{AgCl}$ | **143.32 g/mol** | **$0.00191 \text{ g/L}$** | **$1.33 \cdot 10^{-5} \text{ mol/L}$** | Sparingly Soluble ($K_{sp}$) |
| **Calcium Fluoride** | $\text{CaF}_2$ | **78.07 g/mol** | **$0.0160 \text{ g/L}$** | **$2.05 \cdot 10^{-4} \text{ mol/L}$** | Sparingly Soluble ($K_{sp}$) |
| **Cerium(III) Sulfate**| $\text{Ce}_2(\text{SO}_4)_3$| **568.42 g/mol** | **$101 \text{ g/L}$** | **$0.178 \text{ mol/L}$** | Retrograde Solid |
| **Oxygen Gas** | $\text{O}_2$ | **32.00 g/mol** | **$0.0091 \text{ g/L}$ ($9.1 \text{ mg/L}$)** | **$2.84 \cdot 10^{-4} \text{ mol/L}$** | Gas (Henry's Law) |

---

## 2. Standard Solubility Calculation Protocols

```
1. Convert g/L to mol/L: S_molar = S_mass / MolarMass
2. Convert mol/L to g/L: S_mass = S_molar * MolarMass
3. Convert g/100 mL to g/L: g/L = (g/100 mL) * 10
4. Max Dissolved Mass: m_max = S_mass * SolventVolume (L)
5. Saturation Ratio: R = CurrentConc / MaxSolubility (R > 1 -> Supersaturated)
```

---

## 3. Educational & Laboratory Safety Disclaimer
*This solubility calculator provides theoretical equilibrium calculations for educational, laboratory research, and AP chemistry applications. Experimental solubility depends on temperature, pressure for gases, pH, ionic strength, and solvent composition.*
