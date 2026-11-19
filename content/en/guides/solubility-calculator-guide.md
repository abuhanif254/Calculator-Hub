---
title: "Solubility Calculator: Dissolving Chemistry"
metaTitle: "Solubility Calculator Guide: Molar Solubility & Ksp Math"
description: "Learn how temperature affects solubility, how to calculate molar solubility, and use our free Solubility Calculator."
metaDescription: "Calculate molar solubility, gram solubility, and Ksp equilibrium constants with step-by-step stoichiometry formulas, temperature curves, and examples."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-19"
relatedCalculator: "solubility-calculator"
faqs:
  - question: "What is the difference between molar solubility and the solubility product constant (Ksp)?"
    answer: "Molar solubility (s) measures the maximum number of moles of a solute that can dissolve per liter of solution (mol/L) before reaching saturation at a specific temperature. The solubility product constant (Ksp) is a unitless thermodynamic equilibrium constant calculated by multiplying the raised molar concentrations of the dissociated ions in a saturated solution."
  - question: "How do I convert solubility from grams per 100 mL to molarity (mol/L)?"
    answer: "First multiply the mass in grams per 100 mL by 10 to obtain the concentration in grams per liter (g/L). Next, divide the grams per liter by the compound's molar mass (g/mol). For example, 36.0 g of NaCl per 100 mL equals 360 g/L; dividing by 58.44 g/mol yields 6.16 mol/L."
  - question: "Why does heating water increase the solubility of most solids but decrease the solubility of gases?"
    answer: "Dissolving most crystalline solids is an endothermic process that absorbs thermal energy to break lattice bonds, so adding heat shifts the equilibrium toward dissolution. Conversely, dissolving a gas in a liquid is typically exothermic because gas molecules lose kinetic freedom; heating the liquid gives gas molecules enough thermal energy to escape back into the vapor phase."
  - question: "What is the common-ion effect and how does it change molar solubility?"
    answer: "The common-ion effect occurs when a salt is dissolved into a solution that already contains one of its constituent ions. By Le Chatelier's Principle, the extra concentration of the shared ion pushes the dissolution equilibrium backward toward the solid precipitate, substantially decreasing the salt's molar solubility without changing its Ksp."
  - question: "How Do I know if a precipitate will form when two solutions are mixed?"
    answer: "Calculate the Reaction Quotient (Qsp) using the initial mixed concentrations of the ions in the same algebraic form as Ksp. If Qsp is greater than Ksp, the solution is supersaturated and a solid precipitate will form until the ion product drops back to Ksp."
---

Solubility measures the maximum thermodynamic quantity of a chemical substance (the **solute**) that can dissolve within a specified amount of liquid (the **solvent**) at a given temperature and pressure before reaching a state of dynamic saturation equilibrium. In a saturated solution, the rate at which solid crystal particles dissociate into solvated ions exactly matches the rate at which dissolved ions recrystallize out of solution. Whether you are converting laboratory mass measurements into molarity or solving ionic equilibrium problems from a solubility product constant ($K_{sp}$), our [Solubility Calculator](/en/calculators/solubility-calculator) automates the stoichiometry and unit conversions.

## Core Mathematical Formulas for Solubility Chemistry

Depending on whether you are working with macro-scale soluble reagents or sparingly soluble precipitates, chemists rely on three foundational equations.

### 1. Direct Molar Solubility from Dissolved Mass and Volume

When a known mass of solute dissolves to form a saturated solution of known volume, its **molar solubility ($s$)** in moles per liter ($\text{mol/L}$ or $\text{M}$) is calculated as:

$$s = \frac{n_{\text{solute}}}{V_{\text{solution}}} = \frac{m}{M \times V}$$

Where:
* **$s$** = Molar solubility ($\text{mol/L}$)
* **$m$** = Mass of the dissolved solute in grams ($\text{g}$)
* **$M$** = Molar mass (molecular weight) of the solute in grams per mole ($\text{g/mol}$)
* **$V$** = Total volume of the resulting solution in liters ($\text{L}$)

To convert molar solubility into handbook mass concentration ($\text{g/100 mL}$), multiply $s \times M$ to obtain $\text{g/L}$ and divide by $10$.

### 2. Solubility Product Constant ($K_{sp}$) and Ionic Stoichiometry

For a sparingly soluble ionic compound $A_x B_y$ dissociating in water according to the equilibrium equation:

$$A_x B_y (s) \rightleftharpoons x A^{y+} (aq) + y B^{x-} (aq)$$

Each mole of solid $A_x B_y$ that dissolves produces $x$ moles of cation $A^{y+}$ and $y$ moles of anion $B^{x-}$. Therefore, at saturation equilibrium, the ion molarities are $[A^{y+}] = x \cdot s$ and $[B^{x-}] = y \cdot s$. Substituting these terms into the thermodynamic mass-action expression yields:

$$K_{sp} = [A^{y+}]^x [B^{x-}]^y = (x \cdot s)^x (y \cdot s)^y = x^x y^y s^{(x+y)}$$

Rearranging this formula allows you to calculate the exact molar solubility $s$ in pure water directly from a tabulated $K_{sp}$ value:

$$s = \left( \frac{K_{sp}}{x^x y^y} \right)^{\frac{1}{x+y}}$$

### 3. Henry's Law for Dissolved Gases

When the solute is a gas (such as $\text{O}_2$ or $\text{CO}_2$) dissolving into a liquid solvent at constant temperature, molar solubility is directly proportional to the partial pressure of that gas above the liquid interface:

$$C_g = k_H \times P_g$$

Where **$C_g$** is the dissolved gas concentration ($\text{mol/L}$), **$k_H$** is the temperature-dependent Henry's Law constant ($\text{mol/(L}\cdot\text{atm)}$), and **$P_g$** is the partial pressure of the gas in atmospheres ($\text{atm}$).

---

## Thermodynamic Factors Controlling Dissolution

1. **Temperature and Enthalpy of Solution ($\Delta H_{\text{soln}}$):** According to the van 't Hoff equation and Le Chatelier's Principle, if dissolution is **endothermic** ($\Delta H_{\text{soln}} > 0$, true for the vast majority of ionic solids such as $\text{KNO}_3$ and $\text{NaCl}$), increasing the temperature supplies thermal energy that drives the equilibrium forward and increases solubility. Conversely, for **exothermic** solutes—including all gases in water and a handful of retrograde salts like cerium(III) sulfate, $\text{Ce}_2(\text{SO}_4)_3$, and calcium hydroxide, $\text{Ca(OH)}_2$—raising the temperature decreases solubility.
2. **The Common-Ion Effect:** Dissolving a sparingly soluble salt like silver chloride ($\text{AgCl}$) in a $0.10\text{ M NaCl}$ solution rather than pure water introduces an initial chloride concentration of $[\text{Cl}^-] = 0.10\text{ M}$. Because $K_{sp} = [\text{Ag}^+][\text{Cl}^-]$ remains constant at a fixed temperature, the maximum silver concentration $[\text{Ag}^+]$ drops by several orders of magnitude.
3. **Solution pH and Acid-Base Coupling:** Any salt containing a basic anion (such as $\text{CO}_3^{2-}$, $\text{OH}^-$, $\text{PO}_4^{3-}$, $\text{S}^{2-}$, or $\text{F}^-$) exhibits significantly higher solubility in acidic solutions. Hydrogen ions ($\text{H}_3\text{O}^+$) react with the basic anion to form a weak acid, removing free anion from solution and pulling the dissolution equilibrium to the right.

---

## Step-by-Step Worked Numerical Calculations

### Example 1: Calculating Molar Solubility from Laboratory Mass and Volume
A chemist dissolves **$17.85\text{ g}$** of potassium bromide ($\text{KBr}$, molar mass $M = 119.00\text{ g/mol}$) in water to produce **$250.0\text{ mL}$** of solution. Find the molarity and the concentration in $\text{g/100 mL}$.

1. **Convert solution volume to liters:**
   $$V = \frac{250.0\text{ mL}}{1000\text{ mL/L}} = 0.2500\text{ L}$$
2. **Convert dissolved mass to moles of $\text{KBr}$:**
   $$n = \frac{m}{M} = \frac{17.85\text{ g}}{119.00\text{ g/mol}} = 0.1500\text{ mol}$$
3. **Calculate molar concentration ($s$):**
   $$s = \frac{0.1500\text{ mol}}{0.2500\text{ L}} = 0.6000\text{ mol/L (M)}$$
4. **Express in grams per $100\text{ mL}$:**
   $$\text{Concentration} = \frac{17.85\text{ g}}{2.500 \times 100\text{ mL}} = 7.14\text{ g/100 mL}$$

### Example 2: Determining Molar and Gram Solubility from $K_{sp}$
Calculate the molar solubility ($s$) and mass solubility ($\text{mg/L}$) of calcium fluoride ($\text{CaF}_2$, molar mass $M = 78.07\text{ g/mol}$) in pure water at $25^\circ\text{C}$, given $K_{sp} = 3.9 \times 10^{-11}$.

1. **Write the balanced dissociation equation and identify $x$ and $y$:**
   $$\text{CaF}_2 (s) \rightleftharpoons \text{Ca}^{2+} (aq) + 2\text{F}^- (aq) \quad (x = 1,\; y = 2)$$
2. **Build the algebraic $K_{sp}$ expression in terms of $s$:**
   $$K_{sp} = [\text{Ca}^{2+}][\text{F}^-]^2 = (s)(2s)^2 = 4s^3$$
3. **Solve for molar solubility ($s$):**
   $$s = \sqrt[3]{\frac{K_{sp}}{4}} = \sqrt[3]{\frac{3.9 \times 10^{-11}}{4}} = \sqrt[3]{9.75 \times 10^{-12}} = 2.136 \times 10^{-4}\text{ mol/L}$$
4. **Convert molar solubility to milligrams per liter ($\text{mg/L}$):**
   $$\text{Mass Solubility} = (2.136 \times 10^{-4}\text{ mol/L}) \times 78.07\text{ g/mol} = 0.01668\text{ g/L} = 16.68\text{ mg/L}$$

---

## Stoichiometry & Aqueous Solubility Reference Table (at 25 °C)

Use this benchmark reference table to verify the algebraic relationship between $K_{sp}$ and molar solubility $s$ across common salt stoichiometries:

| Compound Name & Formula | Molar Mass ($\text{g/mol}$) | Ion Ratio ($x : y$) | Algebraic $K_{sp}$ Equation | $K_{sp}$ at $25^\circ\text{C}$ | Molar Solubility $s$ ($\text{mol/L}$) | Mass Solubility ($\text{g/L}$) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Silver Chloride ($\text{AgCl}$)** | $143.32$ | $1 : 1$ | $K_{sp} = s^2$ | $1.77 \times 10^{-10}$ | $1.33 \times 10^{-5}$ | $1.91 \times 10^{-3}$ |
| **Barium Sulfate ($\text{BaSO}_4$)** | $233.39$ | $1 : 1$ | $K_{sp} = s^2$ | $1.08 \times 10^{-10}$ | $1.04 \times 10^{-5}$ | $2.43 \times 10^{-3}$ |
| **Calcium Fluoride ($\text{CaF}_2$)** | $78.07$ | $1 : 2$ | $K_{sp} = 4s^3$ | $3.90 \times 10^{-11}$ | $2.14 \times 10^{-4}$ | $1.67 \times 10^{-2}$ |
| **Silver Chromate ($\text{Ag}_2\text{CrO}_4$)** | $331.73$ | $2 : 1$ | $K_{sp} = 4s^3$ | $1.12 \times 10^{-12}$ | $6.54 \times 10^{-5}$ | $2.17 \times 10^{-2}$ |
| **Aluminum Hydroxide ($\text{Al(OH)}_3$)** | $78.00$ | $1 : 3$ | $K_{sp} = 27s^4$ | $3.00 \times 10^{-34}$ | $1.83 \times 10^{-9}$ | $1.43 \times 10^{-7}$ |
| **Calcium Phosphate ($\text{Ca}_3(\text{PO}_4)_2$)** | $310.18$ | $3 : 2$ | $K_{sp} = 108s^5$ | $2.07 \times 10^{-33}$ | $1.14 \times 10^{-7}$ | $3.54 \times 10^{-5}$ |
| **Sodium Chloride ($\text{NaCl}$, Soluble)** | $58.44$ | $1 : 1$ | Highly Soluble ($K_{sp} \approx 37.3$) | N/A (Macro Saturation) | $6.14\text{ mol/L}$ | $358.9\text{ g/L}$ |
