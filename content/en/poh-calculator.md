---
title: "pOH Calculator | Hydroxide Ion & Base Equilibrium Solver"
description: "Free online pOH Calculator. Instantly calculate pOH, hydroxide ion concentration [OH-], pH, hydrogen ion [H+], weak base quadratic equilibrium, Henderson-Hasselbalch base buffer pOH, and titration curves."
metaTitle: "pOH Calculator | Hydroxide Ion & Base Equilibrium Solver"
metaDescription: "Free online pOH Calculator. Instantly calculate pOH, hydroxide ion concentration [OH-], pH, hydrogen ion [H+], weak base quadratic equilibrium, Henderson-Hasselbalch base buffer pOH, and titration curves."
metaKeywords: "poh calculator, calculate poh, hydroxide ion concentration calculator, oh- concentration calculator, ph from poh calculator, weak base poh calculator, base buffer poh calculator, henderson hasselbalch base calculator"
features:
  - "Interactive Cockpit featuring Simple and Advanced Mode toggle"
  - "17 Feature Calculation Modes: pOH from [OH-], [OH-] from pOH, pH from pOH, pOH from pH, pH/pOH Converter with Temperature Kw, [H+] <-> [OH-] Converter, Strong Base pOH, Weak Base Equilibrium Solver, Kb/pKb Converter, Base Equilibrium ICE Table Solver, Base Buffer pOH Solver, Henderson-Hasselbalch Base Mode, Base Dilution Solver, Neutralization & Mixing, Neutralization Reaction Analyzer, Titration Analysis (pOH/pH View Toggle), and Interactive 0-14 pOH Spectrum Scale"
  - "🧪 Interactive pOH Cockpit displaying mode selector, scientific notation inputs, live pOH, pH, [OH-], [H+] cards, and solution classification (Basic, Neutral, Acidic)"
  - "📊 Recharts Titration Curve Plotter visualizing pOH / pH vs Titrant Volume (mL) with highlighted Equivalence Point and Buffer Region"
  - "🌡️ Temperature-dependent Kw Engine adjusting neutral pOH (25°C -> 7.00, 37°C -> 6.81, 0°C -> 7.47)"
  - "🎴 Chemistry Study Flashcards and Practice Quiz Generator with step-by-step mathematical derivations"
useCases:
  - "High school, AP Chemistry, and university students learning pOH, pH, hydroxide ion concentration, and base equilibrium"
  - "Analytical chemists and laboratory researchers preparing basic buffer solutions (ammonia/ammonium) and measuring base titrations"
  - "Biochemists studying alkaline enzyme environments and cellular hydroxide ion dynamics"
  - "Educators creating visual base chemistry demonstrations and pOH quizzes"
howToSteps:
  - "Select your Calculation Mode (e.g. pOH from [OH-], Weak Base Equilibrium, Base Buffer pOH, or Base Titration Analysis)."
  - "Select your Solution Temperature (°C) to load exact temperature-dependent Kw and neutral pOH values."
  - "Enter your known concentration or pOH values in scientific or decimal notation."
  - "Inspect the calculated pOH, pH, [OH-], and [H+] values along with the solution classification badge."
  - "View the dynamic 0-14 pOH spectrum bar showing where your solution falls on the logarithmic hydroxide scale."
  - "Click 'Copy Summary' or 'Print PDF' to export your complete hydroxide ion analysis report."
faqs:
  - question: "What is pOH?"
    answer: "pOH is a logarithmic measure of the hydroxide ion concentration [OH-] in an aqueous solution: pOH = -log10[OH-]."
  - question: "What is the relationship between pH and pOH?"
    answer: "At 25°C, pH + pOH = pKw = 14.00. For any temperature, pH + pOH = pKw."
  - question: "How do you calculate pOH from Hydroxide Ion Concentration [OH-]?"
    answer: "pOH = -log10[OH-]. For example, if [OH-] = 1.0 × 10⁻³ M, then pOH = -log10(10⁻³) = 3.00."
  - question: "How do you calculate [OH-] from pOH?"
    answer: "[OH-] = 10^(-pOH). For example, if pOH = 4.00, then [OH-] = 10⁻⁴ = 1.0 × 10⁻⁴ M."
  - question: "Is neutral pOH always 7.00?"
    answer: "No! Neutral pOH equals 1/2 pKw. While neutral pOH is 7.00 at 25°C, at human body temperature (37°C), neutral pOH is 6.81 because Kw increases with temperature."
  - question: "How do you calculate pOH for a Strong Base?"
    answer: "Strong bases (NaOH, KOH) dissociate completely in water. For monohydroxide bases, [OH-] = C_base, so pOH = -log10[C_base]. For dihydroxide bases like Ca(OH)2, [OH-] = 2 × C_base."
  - question: "How do you calculate pOH for a Weak Base?"
    answer: "Weak bases (NH3) dissociate partially. Solve the quadratic equilibrium equation Kb = x^2 / (C - x) where x = [OH-]."
  - question: "What is the Henderson-Hasselbalch Base Equation?"
    answer: "pOH = pKb + log10([BH+]/[B]), where [BH+] is conjugate acid concentration and [B] is weak base concentration."
  - question: "What is Kb and pKb?"
    answer: "Kb is the base dissociation constant measuring base strength. pKb = -log10(Kb). Smaller pKb values indicate stronger bases."
  - question: "How does Dilution affect pOH?"
    answer: "Diluting a basic solution increases its pOH toward neutral (7.00), while diluting an acidic solution decreases its pOH toward neutral (7.00)."
  - question: "How accurate is this pOH Calculator?"
    answer: "This calculator uses exact logarithmic formulas, quadratic base equilibrium solvers, and temperature-dependent Kw models to guarantee analytical precision."
---

# Laboratory & Analytical Chemistry Guide to pOH & Base Equilibrium

In analytical chemistry and base equilibria, **pOH** measures the hydroxide ion activity in aqueous solutions:

$$\text{pOH} = -\log_{10}[\text{OH}^-] \quad \iff \quad [\text{OH}^-] = 10^{-\text{pOH}}$$

$$\text{pH} + \text{pOH} = \text{p}K_w \quad \text{where } K_w = [\text{H}^+][\text{OH}^-]$$

---

## 1. Temperature-Dependent $K_w$ & Neutral pOH Reference Matrix

| Temperature (°C) | Water Autoionization ($K_w$) | $\text{p}K_w$ | Neutral pOH ($\frac{1}{2}\text{p}K_w$) | Physiological / Context Note |
| :--- | :--- | :--- | :--- | :--- |
| **$0^\circ\text{C}$** | $1.14 \times 10^{-15}$ | $14.94$ | **$7.47$** | Freezing water point |
| **$25^\circ\text{C}$** | $1.00 \times 10^{-14}$ | $14.00$ | **$7.00$** | Standard laboratory reference |
| **$37^\circ\text{C}$** | $2.40 \times 10^{-14}$ | $13.62$ | **$6.81$** | Normal human body temperature |
| **$60^\circ\text{C}$** | $9.60 \times 10^{-14}$ | $13.02$ | **$6.51$** | Heated process water |

---

## 2. Standard Base Equilibrium Calculation Protocols

```
1. Strong Base (monohydroxide): [OH-] = C_base  ===>  pOH = -log10[C_base]
2. Strong Base (dihydroxide e.g. Ca(OH)2): [OH-] = 2 * C_base  ===>  pOH = -log10[2 * C_base]
3. Weak Base (B + H2O <==> BH+ + OH-): Solve x^2 + Kb*x - Kb*C = 0  ===>  pOH = -log10(x)
4. Base Buffer Solution: pOH = pKb + log10([Conjugate Acid BH+] / [Weak Base B])
```

---

## 3. Educational & Laboratory Safety Disclaimer
*This pOH calculator provides theoretical base equilibrium calculations for educational, laboratory research, and AP chemistry applications. Concentrated non-ideal solutions and precise analytical buffers should account for ionic strength and activity coefficients using calibrated laboratory equipment.*
