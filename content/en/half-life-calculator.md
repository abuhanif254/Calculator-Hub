---
title: "Half-Life Calculator"
metaTitle: "Half-Life Calculator | Radioactive Decay & Half-Life Solver"
metaDescription: "Compute remaining quantity, initial mass, decay constant, half-life duration, or elapsed decay time. Complete step-by-step math solver with interactive graphs."
metaKeywords: "half-life calculator, radioactive decay calculator, exponential decay formula, carbon-14 dating calculator, decay constant calculator, nuclear physics, isotopes, physics calculators, chemistry calculators, medical radiation, archaeological dating, half-life equations"
faqs:
  - question: "What is half-life?"
    answer: "Half-life is the amount of time required for half of the radioactive nuclei in a given sample of an unstable isotope to undergo spontaneous radioactive decay, transforming into a different isotope or element. It is a statistical constant unique to each radioactive isotope, ranging from fractions of a microsecond to trillions of years."
  - question: "How does radioactive decay work?"
    answer: "Radioactive decay is a stochastic (random) process at the level of individual atoms. Unstable atomic nuclei lose energy by emitting radiation in the form of particles (alpha, beta) or electromagnetic waves (gamma rays). While we cannot predict exactly when a specific atom will decay, we can precisely model the statistical rate of decay for a large group of atoms using exponential decay mathematics."
  - question: "What is exponential decay?"
    answer: "Exponential decay describes a process where a quantity decreases at a rate proportional to its current value. Mathematically, as time progresses linearly, the remaining quantity drops by a constant percentage rather than a constant amount. For radioactive materials, the quantity drops by exactly 50% during every successive half-life interval."
  - question: "What is Carbon-14 dating?"
    answer: "Carbon-14 dating is an archaeological technique used to estimate the age of carbon-bearing organic materials up to 50,000 years old. Unstable Carbon-14 (half-life of 5,730 years) is constantly absorbed by living organisms. When the organism dies, carbon exchange stops, and Carbon-14 decays. By measuring the remaining ratio of C-14 to stable C-12, scientists determine when the organism died."
  - question: "What is a decay constant?"
    answer: "The decay constant (denoted by lambda, λ) is the probability per unit time that a single radioactive nucleus will decay. It is inversely proportional to the half-life. The mathematical relationship is expressed as λ = ln(2) / t1/2, where ln(2) is approximately 0.69315."
  - question: "How do I calculate remaining mass?"
    answer: "To calculate remaining mass, substitute the initial mass (N₀), elapsed time (t), and half-life (t1/2) into the exponential decay formula: N(t) = N₀ * (1/2)^(t/t1/2). Alternatively, you can use the decay constant formula: N(t) = N₀ * e^(-λt)."
  - question: "Why is half-life important?"
    answer: "Half-life is critical in nuclear physics, chemistry, geology, and medicine. It allows doctors to choose short-lived isotopes for diagnostic imaging so patients aren't exposed to long-term radiation. It also helps engineers design safe containment facilities for nuclear waste and enables geologists to estimate the age of rocks and Earth."
  - question: "What are isotopes?"
    answer: "Isotopes are variants of a chemical element that share the same number of protons in their atomic nuclei (and thus have the same atomic number and chemical properties) but contain different numbers of neutrons (giving them different mass numbers and nuclear stability)."
  - question: "How is half-life used in medicine?"
    answer: "In nuclear medicine, isotopes with short half-lives are injected or ingested for diagnostics and therapy. For example, Technetium-99m (half-life of 6 hours) is used for organ scans because it decays quickly, minimizing radiation dose. Iodine-131 (half-life of 8 days) is used to target and destroy cancerous thyroid cells."
  - question: "Is this calculator mobile-friendly?"
    answer: "Yes, our Half-Life Calculator is fully responsive and optimized for all screen sizes, including smartphones, tablets, and desktops. It features interactive touch sliders and responsive charts that adapt to your device."
---

## Understanding Half-Life and Radioactive Decay

Radioactive decay is one of the most fascinating phenomena in nuclear physics and chemistry. At the core of this process is the concept of **half-life**—the time required for exactly half of the radioactive atoms in a sample to decay into a stable or different daughter isotope.

Whether you are a student solving physics homework, an archaeologist estimating the age of an artifact using radiocarbon dating, or a medical professional administering diagnostic isotopes, our **Half-Life Calculator** provides a precise, multi-mode mathematical solver to compute any variable in the exponential decay equation.

---

## The Mathematics of Exponential Decay

Radioactive decay is mathematically modeled as an **exponential decay function**. The rate of decay is strictly proportional to the number of radioactive atoms present at any given moment. This means that as the quantity of radioactive material shrinks, the number of decays per second also shrinks, resulting in a smooth, tailing curve.

### The Standard Half-Life Equation

The fundamental equation representing half-life is written as:

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}$$

Where:
*   **$N(t)$** is the remaining quantity of the radioactive isotope after elapsed time $t$.
*   **$N_0$** is the initial quantity of the radioactive substance at $t = 0$.
*   **$t$** is the total elapsed decay time.
*   **$t_{1/2}$** is the half-life of the radioactive substance (measured in matching units of time).

### The Decay Constant Equation

Alternatively, physicists and chemists frequently express exponential decay using the **decay constant** (denoted by the Greek letter lambda, $\lambda$):

$$N(t) = N_0 \cdot e^{-\lambda t}$$

Here, **$e$** is Euler's number (approximately $2.71828$), and the relationship between the decay constant and the half-life is defined by the following expression:

$$\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0.69315}{t_{1/2}}$$

---

## Step-by-Step Calculation Examples

Our calculator supports five separate calculation modes to solve for any unknown variable in these decay relationships. Below are examples of how to solve these problems by hand.

### Example 1: Solving for Remaining Quantity ($N(t)$)
Suppose you start with a $100\text{ g}$ sample of Iodine-131, which has a known half-life of $8.02\text{ days}$. How much Iodine-131 remains after $24.06\text{ days}$?

1.  **Identify parameters:** $N_0 = 100$, $t_{1/2} = 8.02$, $t = 24.06$.
2.  **Calculate the number of elapsed half-lives:**
    $$\frac{t}{t_{1/2}} = \frac{24.06}{8.02} = 3$$
3.  **Substitute into the equation:**
    $$N(t) = 100 \cdot (0.5)^3$$
    $$N(t) = 100 \cdot 0.125 = 12.5\text{ grams}$$
4.  **Result:** Exactly $12.5\text{ grams}$ remain. The sample is $12.5\%$ parent isotope and $87.5\%$ decayed daughter isotope.

### Example 2: Solving for Elapsed Time ($t$)
How long does it take for a sample of Carbon-14 to decay from $500\text{ atoms}$ to $125\text{ atoms}$? (Carbon-14 half-life is $5,730\text{ years}$).

1.  **Identify parameters:** $N_0 = 500$, $N(t) = 125$, $t_{1/2} = 5730$.
2.  **Use the isolated elapsed time equation:**
    $$t = t_{1/2} \cdot \frac{\ln(N_0 / N(t))}{\ln(2)}$$
3.  **Substitute the quantities:**
    $$t = 5730 \cdot \frac{\ln(500 / 125)}{\ln(2)}$$
    $$t = 5730 \cdot \frac{\ln(4)}{\ln(2)} = 5730 \cdot 2 = 11,460\text{ years}$$
4.  **Result:** It will take exactly $11,460\text{ years}$.

---

## Unstable Isotopes and Their Real-World Uses

Isotopes are variants of chemical elements that possess matching proton counts but differing numbers of neutrons. While many isotopes are stable, unstable isotopes undergo radioactive decay. Here are some of the most critical isotopes featured in our calculator's preset database:

| Isotope | Symbol | Half-Life | Primary Application |
| :--- | :---: | :--- | :--- |
| **Carbon-14** | $^{14}\text{C}$ | $5,730\text{ years}$ | Radiocarbon dating of bones, wood, and organic artifacts. |
| **Uranium-238** | $^{238}\text{U}$ | $4.468 \times 10^9\text{ years}$ | Uranium-Lead dating of geological formations and mineral crystals. |
| **Radon-222** | $^{222}\text{Rn}$ | $3.82\text{ days}$ | Indoor air quality safety tracking (basement gas hazard). |
| **Iodine-131** | $^{131}\text{I}$ | $8.02\text{ days}$ | Targeting and ablating thyroid cancer cells in nuclear oncology. |
| **Cesium-137** | $^{137}\text{Cs}$ | $30.17\text{ years}$ | Industrial radiation gauges and radiological waste tracking. |

---

## Archaeological and Medical Applications

### Archaeological Dating (Carbon-14)
Radiocarbon dating utilizes the isotope Carbon-14 to trace the age of organic specimens. Cosmic rays in the upper atmosphere continually convert Nitrogen into Carbon-14, which enters the food chain. 

Living tissues maintain a constant ratio of Carbon-14 to stable Carbon-12. Upon death, metabolism halts, and Carbon-14 is no longer replenished. By measuring the remaining activity ratio, geophysicists apply the half-life formula to date fossils, ancient manuscripts, and organic remains.

### Nuclear Medicine and Radiology
In diagnostic imaging, radiologists inject radioactive tracers with extremely short half-lives. This ensures the tracer remains active long enough to complete the scan (e.g., Technetium-99m with a 6-hour half-life) but decays rapidly thereafter, minimizing the total radiation dose absorbed by the patient. 

In radiation therapy, longer-lived therapeutic isotopes are strategically sealed inside implants to destroy malignant tumor cells locally over a calculated period.

---

## How to Input Scientific Notation

In physics and chemistry, quantity values are often astronomically large (number of atoms) or microscopically small. Our calculator fully supports **Scientific Notation** and computer-friendly **E-Notation** to save you from typing long strings of zeros.

*   To enter Avogadro's number ($6.022 \times 10^{23}$), simply type `6.022e23` or `6.022 x 10^23` into the quantity field.
*   To enter microscopic quantities like a tiny activity level ($1.5 \times 10^{-6}\text{ Curies}$), type `1.5e-6` or `1.5 x 10^-6`.

The calculation engine automatically parses these values, computes the exponential ratios with absolute precision, and formats the output into readable scientific notation.
