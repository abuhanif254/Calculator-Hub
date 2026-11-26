---
title: "Descriptive Statistics Explained: How to Analyze Any Dataset"
description: "A complete guide to descriptive statistics. Learn how to calculate mean, median, mode, variance, and standard deviation using our comprehensive Statistics Calculator."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "statistics-calculator"
relatedType: "calculator"
faqs:
  - question: "When should I use sample standard deviation (n - 1) instead of population standard deviation (N)?"
    answer: "Use sample standard deviation (dividing by n - 1, known as Bessel's correction) whenever your dataset is a subset drawn from a larger process or population—such as 30 daily production readings or 500 survey respondents. Use population standard deviation (dividing by N) only when you possess every single observation in the entire target group."
  - question: "Why is the median preferred over the mean for skewed data like income or home prices?"
    answer: "The arithmetic mean incorporates every magnitude directly, so a handful of extreme upper-tail values pulls the average far above what is typical. The median depends only on rank order, meaning even a tenfold increase in the highest value leaves the median unchanged."
  - question: "What is the difference between arithmetic, geometric, and harmonic means?"
    answer: "The arithmetic mean averages additive quantities like test scores or daily kilowatt-hours. The geometric mean multiplies positive growth factors and takes the nth root, making it exact for compounded annual investment returns. The harmonic mean averages rates with fixed numerators, such as speeds over equal distances."
  - question: "How do I mathematically identify outliers using standard deviation or IQR?"
    answer: "For roughly normal distributions, observations with z-scores |x - mean| / s greater than 3.0 are flagged as extreme outliers. For skewed or small datasets, Tukey's interquartile fence rule is safer: any value below Q1 - 1.5 × IQR or above Q3 + 1.5 × IQR is flagged as an outlier."
  - question: "Can standard deviation be larger than the mean, and does that indicate an error?"
    answer: "Yes, standard deviation can exceed the mean without any calculation error. This occurs whenever data spans positive and negative numbers around zero, or in heavily right-skewed positive datasets—such as insurance claims or venture returns—producing a Coefficient of Variation (s / mean) above 100%."
---

**Descriptive statistics** summarize the empirical structure of an observed dataset without extrapolating beyond it, organizing raw numbers into three quantitative dimensions: central tendency (mean, median, mode), dispersion (range, interquartile range, variance, standard deviation), and distributional shape (skewness and outliers). Together, these metrics reveal both the typical magnitude of a measurement and how tightly observations cluster around that center.

Before interpreting any dispersion metric, you must verify whether your observations represent an entire **population** (`N`) or a **sample** (`n`) drawn from a broader process, and check whether extreme values skew the arithmetic mean. Compute complete parametric and robust summary reports instantly—including Bessel-corrected variance, quartiles, and geometric or harmonic means—with our [Statistics Calculator](/en/calculators/statistics-calculator).

## Core Statistical Formulas and Estimator Definitions

Central location establishes a single representative benchmark, while dispersion measures spread in either squared or original measurement units.

```text
Arithmetic Mean (x̄)           = Σx_i / n
Geometric Mean (G)            = (Π x_i)^(1/n)               [for x_i > 0]
Harmonic Mean (H)             = n / Σ(1 / x_i)              [for x_i > 0]
Population Variance (σ²)      = Σ(x_i − μ)² / N
Sample Variance (s²)          = Σ(x_i − x̄)² / (n − 1)
Standard Deviation (s or σ)   = √Variance
Coefficient of Variation (CV) = (s / x̄) × 100%
Interquartile Range (IQR)     = Q3 − Q1
```

Where:
- `x_i` is each individual observation (`i = 1, ..., n`).
- `N` is the total population count, whereas `n − 1` represents degrees of freedom for a sample.
- `Q1` and `Q3` denote the 25th and 75th percentiles of the sorted dataset.

### Why Sample Variance Divides by `n − 1` (Bessel's Correction)

When estimating variance from a sample, `x̄` is derived from those same observations, forcing deviations to sum to zero (`Σ(x_i − x̄) = 0`). Because sample points cluster closer to `x̄` than to the unknown population mean `μ`, dividing by `n` underestimates `σ²`. Dividing by `n − 1` removes this bias—shifting `s` up `11.8%` vs. `σ` at `n = 5`.

## Step-by-Step Worked Dataset Analysis

Consider an 8-day electricity log in kilowatt-hours (`kWh`): `[18, 20, 22, 22, 24, 26, 28, 40]`, where `40 kWh` reflects a peak cooling spike.

1. **Center:** `n = 8`, `Sum = 200 kWh`, `x̄ = 200 / 8 = 25.00 kWh`. Averaging the middle pair gives `Median = (22 + 24) / 2 = 23.00 kWh`; `Mode = 22 kWh`.
2. **Range and Quartiles:** `Range = 40 − 18 = 22 kWh`. From `[18, 20, 22, 22]` and `[24, 26, 28, 40]`, `Q1 = 21.00 kWh`, `Q3 = 27.00 kWh`, and `IQR = 6.00 kWh`.
3. **Sum of Squares (`SS`):** Squaring deviations from `25` gives `49 + 25 + 9 + 9 + 1 + 1 + 9 + 225 = 328 kWh²`.
4. **Variance & Std Dev:** Sample `s² = 328 / 7 = 46.8571 kWh²`, so `s = 6.8452 kWh` (`CV = 27.38%`). Closed-population `σ² = 328 / 8 = 41.00 kWh²`, so `σ = 6.4031 kWh`.
5. **Outlier Check:** Tukey's upper fence `Q3 + 1.5 × IQR = 36 kWh` flags `40 kWh` as an outlier, explaining why `x̄` (`25.00`) exceeds the median (`23.00`).

## Parametric vs. Non-Parametric Metric Selection

| Metric | Mathematical Basis | Units | Outlier Sensitivity | Best Analytical Use Case | Key Limitation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Arithmetic Mean** | Equal-weighted sum / `n` | Original (`kWh`, `USD`) | High (unbounded) | Symmetric, additive measurements | Distorted by heavy skew or spikes |
| **Median** | 50th percentile rank | Original | Very low (50% breakdown) | Income, housing, skewed latencies | Ignores tail severity and magnitude |
| **Geometric Mean** | `n`th root of product | Original (positive) | Moderate | Multi-period investment CAGRs, ratios | Fails if any observation is `≤ 0` |
| **Harmonic Mean** | Reciprocal of mean reciprocals | Rate (`mph`, `km/h`) | Sensitive to near-zero | Averaging speeds or P/E multiples | Undefined when any value equals `0` |
| **Standard Deviation (`s`)** | Root mean squared deviation | Original | High (squares errors) | Normal process control (`±2s`, `±3s`) | Misleading alone on skewed data |
| **IQR (`Q3 − Q1`)** | Middle 50% rank span | Original | Very low (25% breakdown) | Boxplots, outlier fencing, skewed spread | Discards behavior in top/bottom 25% |

## Analytical Applications, Pitfalls, and Precision Caveats

In financial risk modeling, `s` quantifies annualized return volatility while the geometric mean measures true compounded portfolio growth (`CAGR`). In manufacturing quality assurance, Six Sigma control charts track whether process spread stays inside engineering tolerances (`±3σ` covers `99.73%` of a normal distribution). In clinical trials, healthcare analytics, and public policy, pairing the median with `IQR` prevents extreme patient lengths of stay or outlier household incomes from distorting typical baseline benchmarks.

Avoid four recurring analytical mistakes when interpreting summary tables:

- **Averaging Percentages Arithmetically:** A portfolio rising `+50%` (`×1.5`) then falling `-50%` (`×0.5`) has a `0%` arithmetic average return, yet its true geometric return per period is `√(1.5 × 0.5) − 1 = -13.4%`. Always use geometric means for sequential compounding rates and harmonic means for equal-distance travel speeds.
- **Mixing `N` and `n − 1` Across Reports:** Switching between population and sample formulas changes dispersion estimates drastically on small sample sizes (`n < 30`). State your divisor explicitly in every technical report or audit log.
- **Simpson's Paradox in Aggregated Means:** Pooling subgroups of unequal size can reverse a trend seen in every subgroup individually; always stratify metrics by segment before drawing causal or operational conclusions.
- **Numerical Cancellation in One-Pass Variance:** Computing `Σx_i² − (Σx_i)² / n` on large numbers with tiny variance loses floating-point precision. High-accuracy calculators use centered two-pass formulas or Welford's online recurrence to eliminate cancellation error.
