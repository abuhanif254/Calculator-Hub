---
title: "Kb Calculator | Base Dissociation Constant & ICE Table Solver"
description: "Free online Kb Calculator. Instantly calculate base dissociation constant Kb, pKb, hydroxide ion concentration [OH-], pOH, pH, equilibrium concentrations, percent ionization, conjugate acid Ka, and ICE tables."
metaTitle: "Kb Calculator | Base Dissociation Constant & ICE Table Solver"
metaDescription: "Free online Kb Calculator. Instantly calculate base dissociation constant Kb, pKb, hydroxide ion concentration [OH-], pOH, pH, equilibrium concentrations, percent ionization, conjugate acid Ka, and ICE tables."
metaKeywords: "kb calculator, base dissociation constant calculator, calculate kb, kb to pkb calculator, pkb to kb calculator, weak base equilibrium calculator, percent ionization calculator, ice table calculator"
features:
  - "Interactive Cockpit featuring Simple and Advanced Mode toggle"
  - "14 Comprehensive Kb Modes: Kb from Equilibrium Concentrations, Kb from pOH, Kb from pH, Kb from [OH-], Kb from [H+], Kb from Percent Ionization, Kb from Degree of Ionization (alpha), Kb <-> pKb Converter, Kb from Conjugate Acid Ka, Kb from Conjugate Acid pKa, Equilibrium Concentrations from Kb (Exact Quadratic), pOH/pH from Kb, Base Strength Analysis, and 5% Rule Checker"
  - "🧪 Interactive Kb Cockpit displaying mode selector, scientific/decimal inputs, live Kb, pKb, pOH, pH, [OH-], [BH+], [B], % Ionization cards, and 5% approximation validity status"
  - "📋 Dynamic Interactive ICE Table displaying Initial, Change, and Equilibrium concentrations for B + H2O <-> BH+ + OH-"
  - "📊 Recharts Interactive Plotter visualizing species distribution fraction (% B vs % BH+) across pH 0-14"
  - "🌡️ Temperature-dependent Kw Engine adjusting neutral pH (25°C -> 7.00, 37°C -> 6.81, 0°C -> 7.47)"
  - "🎴 Chemistry Study Flashcards and Practice Quiz Generator with step-by-step mathematical derivations"
useCases:
  - "High school, AP Chemistry, and university students learning base dissociation, pKb, ICE tables, and weak base equilibrium"
  - "Analytical chemists, pharmacologists, and laboratory researchers calculating weak base dissociation constants and solution equilibrium concentrations"
  - "Biochemists studying weak organic bases (ammonia, amine drugs, alkaloids) and protonation equilibria"
  - "Educators creating visual base equilibrium demonstrations and chemistry quizzes"
howToSteps:
  - "Select your Calculation Mode (e.g. Kb from pOH, Kb from pH, Kb from [OH-], Kb <-> pKb Converter, or Kb from Conjugate Acid Ka)."
  - "Select your Solution Temperature (°C) to load exact temperature-dependent Kw and pKw values."
  - "Enter your known initial weak base concentration (C), pOH, pH, [OH-], percent ionization, or Kb in scientific or decimal notation."
  - "Inspect the calculated Kb, pKb, equilibrium pOH, equilibrium pH, hydroxide ion [OH-], equilibrium [B], equilibrium [BH+], and 5% approximation validity status."
  - "View the interactive ICE table and dynamic species distribution chart."
  - "Click 'Copy Summary' or 'Print PDF' to export your complete base dissociation analysis report."
faqs:
  - question: "What is Kb (Base Dissociation Constant)?"
    answer: "Kb is the equilibrium constant for the reaction of a weak base with water: B + H2O <-> BH+ + OH-. It is defined as Kb = [BH+][OH-] / [B]."
  - question: "What does a larger Kb value indicate?"
    answer: "A larger Kb value indicates greater base ionization in water (a stronger weak base), yielding higher [OH-] and lower equilibrium pOH (higher pH)."
  - question: "How are Kb and pKb related?"
    answer: "pKb is the negative decimal logarithm of Kb: pKb = -log10(Kb) and Kb = 10^(-pKb). Smaller pKb values correspond to larger Kb values."
  - question: "How are Ka and Kb related for a Conjugate Pair?"
    answer: "For any conjugate acid-base pair in aqueous solution: Ka * Kb = Kw (1.0 * 10^-14 at 25°C), and pKa + pKb = pKw (14.00 at 25°C)."
  - question: "How do you calculate Kb from pOH?"
    answer: "Calculate hydroxide ion concentration x = 10^(-pOH). For a weak base B, Kb = x^2 / (C - x) where C is the initial concentration."
  - question: "How do you calculate Kb from pH?"
    answer: "First calculate pOH = pKw - pH. Then x = 10^(-pOH), and Kb = x^2 / (C - x)."
  - question: "What is an ICE Table for a Weak Base?"
    answer: "An ICE table tracks the Initial concentrations, Changes during ionization, and Equilibrium concentrations for B + H2O <-> BH+ + OH-."
  - question: "What is the 5% Rule for Weak Base Approximations?"
    answer: "The small-x approximation x ~ sqrt(Kb * C) is valid only if x / C * 100% <= 5%. If ionization exceeds 5%, the exact quadratic equation x^2 + Kb*x - Kb*C = 0 must be used."
  - question: "Does Initial Concentration change Kb?"
    answer: "No. Kb is a thermodynamic constant at a given temperature and solvent. Diluting a base increases percent ionization, but Kb remains constant."
  - question: "How accurate is this Kb Calculator?"
    answer: "This calculator uses exact logarithmic formulas, quadratic equilibrium solvers, and 5% rule validators to guarantee analytical precision."
---

# Laboratory & Analytical Chemistry Guide to Kb & Weak Base Equilibrium

In analytical, physical, and pharmaceutical chemistry, the **base dissociation constant** ($K_b$) measures the quantitative strength of a weak base in aqueous solution:

$$K_b = \frac{[\text{BH}^+][\text{OH}^-]}{[\text{B}]} \quad \iff \quad \text{p}K_b = -\log_{10}(K_b)$$

$$K_a \times K_b = K_w \quad \iff \quad \text{p}K_a + \text{p}K_b = \text{p}K_w \quad (14.00 \text{ at } 25^\circ\text{C})$$

$$x^2 + K_b x - K_b C = 0 \quad \implies \quad [\text{OH}^-] = \frac{-K_b + \sqrt{K_b^2 + 4 K_b C}}{2}$$

$$\text{Percent Ionization} = \frac{[\text{OH}^-]_{\text{eq}}}{C_{\text{initial}}} \times 100\% \le 5\% \quad (\text{5\% Approximation Rule})$$

---

## 1. Common Weak Base Dissociation Constants Reference Matrix

| Weak Base | Formula | $K_b$ ($25^\circ\text{C}$) | $\text{p}K_b$ | Conjugate Acid $\text{p}K_a$ | Percent Ionization ($0.10\,\text{M}$) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ethylamine** | $\text{C}_2\text{H}_5\text{NH}_2$ | **$5.6 \cdot 10^{-4}$** | **$3.25$** | **$10.75$** | $\sim 7.2\%$ |
| **Methylamine** | $\text{CH}_3\text{NH}_2$ | **$4.4 \cdot 10^{-4}$** | **$3.36$** | **$10.64$** | $\sim 6.4\%$ |
| **Ammonia** | $\text{NH}_3$ | **$1.8 \cdot 10^{-5}$** | **$4.75$** | **$9.25$** | $\sim 1.3\%$ |
| **Pyridine** | $\text{C}_5\text{H}_5\text{N}$ | **$1.7 \cdot 10^{-9}$** | **$8.77$** | **$5.23$** | $\sim 0.013\%$ |
| **Aniline** | $\text{C}_6\text{H}_5\text{NH}_2$ | **$4.3 \cdot 10^{-10}$** | **$9.37$** | **$4.63$** | $\sim 0.0065\%$ |

---

## 2. Standard $K_b$ Calculation Protocols

```
1. Kb from pOH: x = 10^(-pOH), Kb = x^2 / (C - x)
2. Kb from pH: pOH = pKw - pH, x = 10^(-pOH), Kb = x^2 / (C - x)
3. Kb from [OH-]: x = [OH-], Kb = x^2 / (C - x)
4. Kb from Conjugate Ka: Kb = Kw / Ka & pKb = pKw - pKa
5. Equilibrium Concentrations from Kb: Solve quadratic x^2 + Kb*x - Kb*C = 0
```

---

## 3. Educational & Laboratory Safety Disclaimer
*This Kb calculator provides theoretical equilibrium calculations for educational, laboratory research, and AP chemistry applications. Concentrated non-ideal solutions at high ionic strengths should account for activity coefficients using Debye-Hückel or Pitzer equations.*
