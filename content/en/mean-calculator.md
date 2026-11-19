---
title: "Mean Calculator – Arithmetic, Weighted, Geometric & Harmonic Mean"
metaTitle: "Mean Calculator – Arithmetic, Weighted & Geometric Mean"
description: "Calculate the arithmetic, weighted, geometric, harmonic, and quadratic mean of any dataset with step-by-step statistical breakdowns."
metaDescription: "Calculate arithmetic, weighted, geometric, and harmonic means online. Includes step-by-step formulas, trimmed mean options, and dataset analysis."
faqs:
  - question: "What is the difference between the arithmetic, geometric, and harmonic mean?"
    answer: "The arithmetic mean sums values and divides by the count, making it ideal for additive quantities. The geometric mean multiplies values and takes the n-th root, capturing multiplicative growth and compounding rates. The harmonic mean takes the reciprocal of the average of reciprocals, accurately averaging rates and ratios such as speed over equal distances."
  - question: "When should I use the geometric mean instead of the arithmetic mean?"
    answer: "Use the geometric mean whenever data points represent multiplicative growth factors, compound annual growth rates (CAGR), inflation indexes, or proportional changes over time. Because percentages compound sequentially, the arithmetic mean always overstates true multi-period compound performance whenever volatility is present."
  - question: "Why does the harmonic mean give the exact average speed for a round trip?"
    answer: "When traveling equal distances at different speeds, you spend more time traveling at the slower speed than at the faster speed. The harmonic mean automatically weights each speed by the time spent traveling that segment, whereas the arithmetic mean wrongly assumes you drove for equal durations at both speeds."
  - question: "Can you calculate the geometric or harmonic mean if a dataset contains zero or negative numbers?"
    answer: "The standard geometric and harmonic means are strictly defined for positive real numbers (x > 0). In the geometric mean, a single zero collapses the entire product to zero, and negative numbers can yield complex roots; for negative percentage returns, convert each rate r into a positive growth multiplier (1 + r) before taking the geometric mean."
  - question: "What is the AM-GM-HM inequality?"
    answer: "For any dataset of positive real numbers, the Arithmetic Mean (AM) is always greater than or equal to the Geometric Mean (GM), which in turn is always greater than or equal to the Harmonic Mean (HM): AM >= GM >= HM. The three means are equal if and only if every number in the dataset is identical."
---

In statistical analysis, the word "average" usually refers to the simple arithmetic mean, yet relying solely on an unweighted additive average can distort results across finance, physics, and data science. Depending on whether your data combines additively, compounds multiplicatively over time, expresses rates per unit of output, or carries unequal importance across observations, different mathematical formulations of the mean are required to identify the true center of the distribution.

Together, the arithmetic, geometric, and harmonic means form the classical Pythagorean means, while weighted, trimmed, and quadratic (Root Mean Square) averages extend central tendency analysis to academic grading, portfolio asset allocation, signal processing, and outlier-resistant econometrics.

## Mathematical Formulas for Core Mean Types

Each formulation of the mean corresponds to a distinct algebraic invariant across a dataset of $n$ observations $\{x_1, x_2, \dots, x_n\}$.

### 1. Arithmetic Mean ($\bar{x}$ or $\mu$)

The arithmetic mean preserves the additive total of the dataset such that replacing every observation with $\bar{x}$ leaves the total sum unchanged ($n\bar{x} = \sum x_i$):

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i = \frac{x_1 + x_2 + \dots + x_n}{n}$$

### 2. Weighted Arithmetic Mean ($\bar{x}_w$)

When individual observations carry different frequencies, probabilities, or capital allocations $w_i$, the weighted mean scales each observation by its relative weight:

$$\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i} = \frac{w_1 x_1 + w_2 x_2 + \dots + w_n x_n}{w_1 + w_2 + \dots + w_n}$$

### 3. Geometric Mean ($GM$)

The geometric mean preserves the multiplicative product of positive real numbers ($GM^n = \prod x_i$). To prevent numerical overflow on large datasets, it can also be evaluated using natural logarithms:

$$GM = \left( \prod_{i=1}^{n} x_i \right)^{\frac{1}{n}} = \sqrt[n]{x_1 \cdot x_2 \cdots x_n} = \exp\left( \frac{1}{n} \sum_{i=1}^{n} \ln(x_i) \right)$$

### 4. Harmonic Mean ($HM$)

The harmonic mean preserves the sum of reciprocals for positive observations ($x_i > 0$), defined as the reciprocal of the arithmetic mean of the reciprocals:

$$HM = \frac{n}{\sum_{i=1}^{n} \frac{1}{x_i}} = \frac{n}{\frac{1}{x_1} + \frac{1}{x_2} + \dots + \frac{1}{x_n}}$$

### 5. Quadratic Mean / Root Mean Square ($RMS$)

Used extensively in electrical engineering (AC voltage) and error evaluation (RMSE), the quadratic mean preserves the average squared magnitude:

$$RMS = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_i^2}$$

### Variable Definitions

* $x_i$: The $i$-th numerical observation in the sample or population.
* $n$: Total number of observations in the dataset.
* $w_i$: Non-negative weight or frequency assigned to observation $x_i$.
* $\prod_{i=1}^{n}$: Product operator indicating multiplication across all $n$ terms.
* $\ln(x_i)$: Natural logarithm (base $e$) of observation $x_i$ for $x_i > 0$.

## The Generalized Power Mean Hierarchy (AM-GM-HM Inequality)

All of the classical means belong to the family of generalized power means $M_p(x_1, \dots, x_n) = \left(\frac{1}{n}\sum x_i^p\right)^{1/p}$, where $p = 2$ yields the Quadratic Mean, $p = 1$ yields the Arithmetic Mean, the limit $p \to 0$ yields the Geometric Mean, and $p = -1$ yields the Harmonic Mean. For any set of positive real numbers, these statistics obey a strict mathematical ordering:

$$RMS \ge AM \ge GM \ge HM$$

Equality holds across all four metrics ($RMS = AM = GM = HM$) if and only if every observation in the dataset is identical ($x_1 = x_2 = \dots = x_n$). The wider the variance of the dataset, the larger the gap between the arithmetic mean and the geometric mean—a phenomenon known in financial economics as **volatility drag** ($GM \approx AM - \frac{\sigma^2}{2}$).

## Step-by-Step Worked Calculation Examples

### Example 1: Comparing AM, GM, and HM on an Exponential Dataset

Consider a dataset of five doubling measurements: $\{4, 8, 16, 32, 64\}$.

1. **Arithmetic Mean ($AM$)**:
   $$\bar{x} = \frac{4 + 8 + 16 + 32 + 64}{5} = \frac{124}{5} = 24.80$$
2. **Geometric Mean ($GM$)**:
   Expressing each number as a power of $2$ ($2^2, 2^3, 2^4, 2^5, 2^6$):
   $$GM = (4 \times 8 \times 16 \times 32 \times 64)^{\frac{1}{5}} = \left(2^{20}\right)^{\frac{1}{5}} = 2^4 = 16.00$$
3. **Harmonic Mean ($HM$)**:
   Convert all reciprocals to a common denominator of $64$:
   $$HM = \frac{5}{\frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \frac{1}{32} + \frac{1}{64}} = \frac{5}{\frac{31}{64}} = \frac{320}{31} \approx 10.3226$$

Notice the strict inequality ordering: $24.80 > 16.00 > 10.3226$.

### Example 2: Compound Investment Returns and Equal-Distance Speeds

Suppose a $\$10,000$ investment surges by $+50\%$ in Year 1 (growing to $\$15,000$) and drops by $-50\%$ in Year 2 (falling to $\$7,500$). Averaging $+50\%$ and $-50\%$ arithmetically gives $0.00\%$, falsely implying the investor broke even. Converting each return $r_i$ into a positive growth multiplier $(1 + r_i)$ yields $1.50$ and $0.50$:

$$GM_{\text{return}} = \sqrt{1.50 \times 0.50} - 1 = \sqrt{0.75} - 1 \approx -13.40\%\text{ per year}$$

Compounding $\$10,000$ at $-13.40\%$ annually for two years $(\$10,000 \times 0.75 = \$7,500)$ reproduces the exact ending balance. Similarly, if a vehicle drives $120\text{ km}$ outbound at $40\text{ km/h}$ and returns $120\text{ km}$ at $60\text{ km/h}$, the harmonic mean gives the true round-trip speed: $HM = \frac{2}{1/40 + 1/60} = 48.0\text{ km/h}$.

## Benchmark Comparison of Mean Formulations

| Mean Type | Mathematical Formula | Input Domain | Outlier Behavior | Primary Practical Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Arithmetic Mean ($AM$)** | $\frac{1}{n}\sum x_i$ | All reals ($\mathbb{R}$) | Sensitive to outliers | Sample means, physical measurements |
| **Weighted Mean ($\bar{x}_w$)** | $\frac{\sum w_i x_i}{\sum w_i}$ | $x_i \in \mathbb{R},\ w_i \ge 0$ | Driven by high weights | Course GPA, WACC, grouped frequencies |
| **Geometric Mean ($GM$)** | $\left(\prod x_i\right)^{1/n}$ | Positive reals ($x_i > 0$) | Dampens large spikes | Compound annual growth rate (CAGR) |
| **Harmonic Mean ($HM$)** | $\frac{n}{\sum (1/x_i)}$ | Positive reals ($x_i > 0$) | Weighted toward minimums | Equal-distance speeds, P/E ratios, F1-score |
| **Quadratic Mean ($RMS$)** | $\sqrt{\frac{1}{n}\sum x_i^2}$ | All reals ($\mathbb{R}$) | Amplifies large values | AC voltage/current, RMSE error tracking |
| **Trimmed Mean** | Mean dropping outer $k\%$ | All reals ($\mathbb{R}$) | Outlier resistant | Judging scores, financial rate benchmarks |
