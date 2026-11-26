---
title: "How to Find the Mean: Arithmetic, Geometric, and Harmonic"
description: "Understand when to use the arithmetic, geometric, and harmonic means with exact formulas, financial compounding examples, and outlier analysis."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "mean-calculator"
relatedType: "calculator"
faqs:
  - question: "When should I use the geometric mean instead of the arithmetic mean?"
    answer: "Use the geometric mean whenever observations multiply sequentially or compound over time, such as annual investment returns, inflation factors, population growth rates, or normalized benchmark scores. The arithmetic mean ignores compounding drag and systematically overstates multi-period growth when volatility is present."
  - question: "Why is the harmonic mean required for average speed or P/E ratios?"
    answer: "Rates such as miles per hour (distance/time) or price-to-earnings ratios share a common numerator when comparing fixed blocks like identical trip segments or equal dollar allocations. Averaging rates with the arithmetic mean weights fast segments improperly, whereas the harmonic mean weights by the denominator (time or earnings) to return the exact aggregate rate."
  - question: "What is the Pythagorean mean inequality H ≤ G ≤ A?"
    answer: "For any set of strictly positive real numbers, the Harmonic Mean (H) is always less than or equal to the Geometric Mean (G), which is always less than or equal to the Arithmetic Mean (A). All three means are equal if and only if every number in the dataset is identical."
  - question: "Can I calculate a geometric or harmonic mean if my data contains zeros or negatives?"
    answer: "A standard geometric mean requires strictly positive values; a single zero collapses the product to zero, and negative values can produce undefined even roots. To average percentage returns like +20% and −40%, first convert them to positive growth multipliers (1.20 and 0.60), compute the geometric mean, and subtract 1. The harmonic mean is undefined if any value equals 0."
  - question: "How does a single extreme outlier affect each Pythagorean mean?"
    answer: "The arithmetic mean is pulled strongly toward high outliers because values add linearly. The geometric mean dampens high outliers via the nth root, and the harmonic mean is least sensitive to large values while being pulled sharply downward by values near zero."
---

While everyday language treats "mean" as simply the sum divided by count, quantitative analysis distinguishes three **Pythagorean means**: the **Arithmetic Mean (`A`)**, **Geometric Mean (`G`)**, and **Harmonic Mean (`H`)**. Using the wrong average introduces systematic bias—overstating compounded investment returns, miscalculating round-trip travel speeds, or skewing valuation ratios.

Each mean matches a specific mathematical operation: additive quantities require the arithmetic mean, multiplicative growth factors require the geometric mean, and rates over fixed numerators require the harmonic mean. Compute all three averages simultaneously for any dataset using our [Mean Calculator](/en/calculators/mean-calculator).

## Formulas and Domain Rules for the Three Means

### 1. Arithmetic Mean (`A`) and Weighted Mean

The **arithmetic mean** is the balance point of an additive dataset where every value carries equal weight `1 / n`:

```text
A = (x₁ + x₂ + ... + xₙ) / n = (Σ xᵢ) / n
```

When observations represent unequal group sizes or importance `wᵢ`, use the **weighted arithmetic mean**:

```text
x̄_w = (Σ wᵢ × xᵢ) / (Σ wᵢ)
```

Arithmetic means preserve total sums (`n × A = Σ xᵢ`) and suit symmetric, additive data such as physical heights, test scores, or daily kWh usage.

### 2. Geometric Mean (`G`)

The **geometric mean** takes the `n`th root of the product of `n` strictly positive values (`xᵢ > 0`):

```text
G = (x₁ × x₂ × ... × xₙ)^(1 / n)
```

To avoid floating-point overflow on large datasets, numerical libraries compute `G` in log space:

```text
G = exp[(1 / n) × Σ ln(xᵢ)]
```

Geometric means preserve total products (`G^n = ∏ xᵢ`), making them essential for compound annual growth rates (CAGR), inflation factors, and multi-scale performance indices.

### 3. Harmonic Mean (`H`)

The **harmonic mean** is the reciprocal of the arithmetic mean of reciprocals (`xᵢ > 0`):

```text
H = n / [(1 / x₁) + (1 / x₂) + ... + (1 / xₙ)] = n / Σ(1 / xᵢ)
```

Whenever observations are rates `Numerator / Denominator` (such as `miles / hour` or `Price / Earnings`) with a **constant numerator** across samples, `H` yields the exact aggregate rate.

### The Fundamental Pythagorean Inequality

For any strictly positive dataset, the three means satisfy:

```text
min(x) ≤ H ≤ G ≤ A ≤ max(x)
```

Equality `H = G = A` occurs if and only if all observations are identical; greater spread widens the gap among them.

## Step-by-Step Worked Examples: Finance and Kinematics

### Example A: Compound Returns (Geometric vs. Arithmetic)

Suppose a `$10,000` portfolio records three annual returns: `+20%`, `+50%`, and `-40%`. Convert these to positive growth multipliers: `1.20`, `1.50`, and `0.60`.

1. **Arithmetic Mean:** `(20% + 50% − 40%) / 3 = +10.00%` per year (multiplier `1.10`).
2. **Geometric Mean:** `(1.20 × 1.50 × 0.60)^(1 / 3) = (1.08)^(1 / 3) ≈ 1.025986`, giving a true CAGR of **+2.60%**.
3. **Balance check:** Actual ending balance is `$10,000 × 1.20 × 1.50 × 0.60 = $10,800.00`, matching `$10,000 × (1.025986)³ = $10,800.00`. The arithmetic mean falsely implies `$10,000 × 1.10³ = $13,310.00`—an overstatement of `$2,510` (`23.24%`) caused by volatility drag.

### Example B: Round-Trip Speed (Harmonic vs. Arithmetic)

A truck drives `60` miles outbound at `60 mph` and returns `60` miles at `30 mph`.

1. **Arithmetic Mean:** `(60 + 30) / 2 = 45.00 mph` (incorrect because double the time is spent at `30 mph`).
2. **Harmonic Mean:** `2 / (1/60 + 1/30) = 2 / (3/60) = 40.00 mph`.
3. **Time verification:** Outbound takes `1.0` hour; return takes `2.0` hours. Total `120 miles / 3.0 hours = 40.00 mph`.
4. **Pythagorean check on `[60, 30]`:** `G = √(60 × 30) ≈ 42.43 mph`, verifying `H (40.00) < G (42.43) < A (45.00)`.

## Comparison of Central Tendency Measures

Match the averaging method to the underlying data structure and tail behavior.

| Measure | Mathematical Definition | Valid Input Domain | Outlier Behavior | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| Arithmetic Mean (`A`) | `(Σ xᵢ) / n` | Any real numbers | Pulled strongly by extremes | Additive totals, symmetric lab metrics |
| Weighted Mean (`x̄_w`) | `(Σ wᵢ xᵢ) / (Σ wᵢ)` | Real numbers; `wᵢ ≥ 0` | Scaled by weights `wᵢ` | GPA, portfolio weights, surveys |
| Geometric Mean (`G`) | `(∏ xᵢ)^(1/n)` | Strictly positive (`xᵢ > 0`) | Dampens large spikes | Compound returns, growth rates, indices |
| Harmonic Mean (`H`) | `n / Σ(1 / xᵢ)` | Non-zero (`xᵢ > 0`) | Pulled by near-zero values | Speed over equal distance, P/E, F1 score |
| Median (`Q₂`) | Middle value (`50th` pct) | Ordered real values | Immune to extreme tails | Skewed income, home prices, latency |
| Trimmed Mean | Mean after dropping `k%` tails | Any real numbers | Removes tail noise | Judging panels, sensor spike filtering |

## Real-World Applications and Pitfalls

Beyond finance and travel kinematics, choosing the right mean prevents distortion in machine learning and systems engineering:

- **Classification F1 Score:** Precision and Recall share true positives in their numerators. Their harmonic mean `F1 = 2 × (Precision × Recall) / (Precision + Recall)` penalizes extreme imbalance: a model with `100%` recall and `2%` precision scores `F1 = 3.92%` rather than a misleading `51%` arithmetic mean.
- **Hardware Benchmarks:** Aggregating normalized speedup ratios across reference machines with `G` ensures system rankings remain invariant regardless of which machine is chosen as the baseline.
- **Input Validation Pitfalls:** Always check for zeros or negative numbers before applying `G` or `H`. Convert percentage changes into positive multipliers (`1 + r`) for `G`, and never evaluate `H` if any value equals `0`, where `1 / 0` diverges.
