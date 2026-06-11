---
title: "How the Half-Life Calculator Works (Radioactive Decay Explained)"
description: "A complete guide to radioactive half-life: the exponential decay formula, how to find remaining quantity or elapsed time, real-world examples in nuclear medicine and archaeology."
category: "Math & Science"
readingTime: 6
lastUpdated: "2026-06-11"
relatedCalculator: "half-life-calculator"
---

## What Is Half-Life?

**Half-life** (symbol: t½) is the time required for exactly half of a quantity of a radioactive substance to undergo nuclear decay. It is a characteristic property of each radioactive isotope — constant and independent of temperature, pressure, chemical form, or how much of the substance is present.

After one half-life, 50% remains. After two half-lives, 25% remains. After three, 12.5% — and so on. This is **exponential decay**: the quantity never reaches zero mathematically, but becomes negligibly small after many half-lives (typically considered safe after 10 half-lives, when less than 0.1% remains).

---

## The Formulas

### Primary Exponential Decay Formula

$$
N(t) = N_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}
$$

Where:
- **N(t)** = quantity remaining at time *t*
- **N₀** = initial quantity
- **t** = elapsed time
- **t½** = half-life of the isotope

### Alternative Form Using the Decay Constant

The decay constant **λ (lambda)** represents the probability per unit time that a given atom will decay.

$$
\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0.6931}{t_{1/2}}
$$

The formula then becomes:

$$
N(t) = N_0 \times e^{-\lambda t}
$$

Both forms are mathematically equivalent and will yield identical results.

---

## Solving for Each Variable

### Finding Remaining Quantity N(t)

Given N₀, t, and t½, plug directly into the primary formula:

$$
N(t) = N_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}
$$

### Finding Elapsed Time t

Rearrange using logarithms:

$$
t = t_{1/2} \times \frac{\ln\left(\frac{N(t)}{N_0}\right)}{\ln\left(\frac{1}{2}\right)} = t_{1/2} \times \log_2\left(\frac{N_0}{N(t)}\right)
$$

### Finding Initial Quantity N₀

$$
N_0 = \frac{N(t)}{\left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}}
$$

---

## Step-by-Step Guide

### Step 1 — Identify the Isotope and Its Half-Life

Look up the half-life of your isotope from literature, a reference table, or the calculator's built-in presets. Ensure time units are consistent throughout your calculation.

### Step 2 — Determine What You Know

Identify which three of the four variables (N₀, N(t), t, t½) you have. The fourth is what you are solving for.

### Step 3 — Select the Solve-For Mode

In the Nexus Half-Life Calculator, select the tab for what you want to find: *Remaining Amount*, *Elapsed Time*, or *Initial Amount*.

### Step 4 — Enter Your Values

Input the known values. The calculator accepts any time unit (seconds, minutes, hours, days, years) — just be consistent between the elapsed time and half-life inputs.

### Step 5 — Read and Interpret the Result

The result is displayed in both absolute quantity and as a percentage of the original. The decay curve graph shows the complete decay trajectory.

---

## Reference Table — Common Isotopes

| Isotope | Symbol | Half-Life | Primary Use |
|---|---|---|---|
| Carbon-14 | ¹⁴C | 5,730 years | Archaeological dating (radiocarbon) |
| Uranium-238 | ²³⁸U | 4.47 billion years | Geological age dating |
| Potassium-40 | ⁴⁰K | 1.25 billion years | Geological age dating |
| Cesium-137 | ¹³⁷Cs | 30.17 years | Nuclear fallout monitoring |
| Strontium-90 | ⁹⁰Sr | 28.8 years | Nuclear medicine, power sources |
| Tritium (H-3) | ³H | 12.32 years | Nuclear weapons, luminescent paint |
| Iodine-131 | ¹³¹I | 8.02 days | Thyroid cancer treatment |
| Technetium-99m | ⁹⁹ᵐTc | 6.0 hours | Medical imaging (SPECT) |
| Fluorine-18 | ¹⁸F | 109.77 minutes | PET scan imaging |
| Radon-222 | ²²²Rn | 3.82 days | Indoor air quality concern |

---

## Real-World Example 1 — Radiocarbon Dating

A sample of ancient wood charcoal contains **340 grams** of Carbon-14. A living tree today would contain **1,200 grams** of C-14 in an equivalent sample. How old is the charcoal?

**Known values:**
- N₀ = 1,200 g (C-14 in a living equivalent)
- N(t) = 340 g (C-14 remaining)
- t½ = 5,730 years

**Apply the elapsed-time formula:**

$$
t = 5730 \times \log_2\left(\frac{1200}{340}\right) = 5730 \times \log_2(3.529) = 5730 \times 1.819 \approx 10{,}423 \text{ years}
$$

The charcoal is approximately **10,400 years old** — placing it in the early Holocene period.

---

## Real-World Example 2 — Medical Imaging (Technetium-99m)

A patient is administered **400 MBq** of Technetium-99m for a bone scan. How much radioactivity remains after **18 hours**?

**Known values:**
- N₀ = 400 MBq
- t = 18 hours
- t½ = 6 hours

$$
N(18) = 400 \times \left(\frac{1}{2}\right)^{\frac{18}{6}} = 400 \times \left(\frac{1}{2}\right)^3 = 400 \times 0.125 = 50 \text{ MBq}
$$

After 18 hours (3 half-lives), only **50 MBq** remains — just 12.5% of the administered dose. This short half-life is why Tc-99m is ideal for medical imaging: it delivers the diagnostic scan with minimal long-term radiation exposure to the patient.

---

## Frequently Asked Questions

**Q: Does half-life change with temperature or chemical environment?**
A: No. Nuclear decay is a property of the nucleus and is unaffected by chemical bonding, temperature, or pressure (with extremely rare exceptions in specific electron-capture isotopes under extraordinary conditions).

**Q: Why is "half-life" used instead of "full decay time"?**
A: Because radioactive substances never fully reach zero — the decay is asymptotic. Half-life is a constant, measurable property that makes calculations predictable. Each successive half-life reduces the quantity by half, regardless of the current amount.

**Q: What is the relationship between half-life and the decay constant?**
A: They are inversely related: λ = ln(2) / t½ ≈ 0.6931 / t½. A shorter half-life means a larger decay constant, meaning atoms decay faster.

**Q: How many half-lives until a substance is considered safe?**
A: A general rule of thumb in radiation safety is **10 half-lives**, after which less than 0.1% of the original activity remains. For Iodine-131 (t½ = 8 days), this is about 80 days.

**Q: Can half-life be used for things other than radioactive decay?**
A: Yes. The half-life concept applies to any exponential decay process, including drug elimination from the bloodstream (pharmacokinetics), population decline, and capacitor discharge in electronics.
