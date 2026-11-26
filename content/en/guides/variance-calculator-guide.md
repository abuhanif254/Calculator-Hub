---
title: "Understanding Variance: Population vs. Sample Formulas Explained"
description: "Learn how population and sample variance measure data dispersion, why Bessel's correction divides by n − 1, and how variance relates to standard deviation."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "variance-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does sample variance divide by n − 1 instead of n?"
    answer: "Sample variance uses the sample mean x̄ rather than the unknown true population mean μ. Because x̄ minimizes the sum of squared deviations for that specific sample, dividing by n systematically underestimates the true population variance. Dividing by n − 1 (Bessel's correction) accounts for the one degree of freedom lost when estimating the mean, making s² an unbiased estimator of σ²."
  - question: "What is the difference between variance and standard deviation?"
    answer: "Variance (s² or σ²) is the average squared deviation from the mean, so its units are squared (for example, kWh² or $²). Standard deviation (s or σ) is the positive square root of variance, restoring the original measurement units (kWh or $) so spread can be compared directly against the mean."
  - question: "When should I choose population variance over sample variance?"
    answer: "Use population variance (dividing by N) only when your dataset contains every single member of the target group—such as all 50 US state tax rates or every unit produced in a closed test batch—and you are not generalizing beyond it. Whenever your numbers are a subset measured to infer properties of a larger process or future observations, use sample variance (dividing by n − 1)."
  - question: "Why does variance react so strongly to extreme outliers?"
    answer: "Because each deviation (xᵢ − x̄) is squared before summing, an outlier located 10 units from the mean contributes 100 to the sum of squares, whereas a point 2 units away contributes only 4. When datasets contain heavy skew or measurement spikes, robust alternatives like the interquartile range (IQR) or median absolute deviation (MAD) provide a more stable measure of spread."
  - question: "Can variance ever be negative or zero?"
    answer: "Variance can never be negative because every squared deviation (xᵢ − x̄)² is zero or positive. A variance of exactly 0 indicates zero dispersion—every observation in the dataset has the exact same numerical value."
---

In statistics, **variance** measures the average squared distance of observations from their arithmetic mean, quantifying how widely a dataset is dispersed. A variance of `0` indicates identical values, whereas high variance signals wide spread or outliers. Because squared deviations penalize large departures quadratically, variance underpins standard deviation, ANOVA, regression diagnostics, and portfolio volatility modeling.

Choosing the correct denominator—`N` for a complete population versus `n − 1` for a sample—determines whether your dispersion estimate is exact or unbiased under sampling. Compute both variance types, standard deviation, and individual deviations instantly with our [Variance Calculator](/en/calculators/variance-calculator).

## Population Variance vs. Sample Variance Formulas

Although both formulas quantify spread around the mean, they apply to distinct analytical scenarios depending on whether your dataset covers an entire population or a sample drawn from a larger process.

### Population Variance (`σ²`)

Use population variance when your data includes **every** member of the target group and requires no statistical inference beyond it:

```text
μ  = (1 / N) × Σ xᵢ
σ² = [Σ (xᵢ − μ)²] / N
```

Here `N` is the population count, `xᵢ` is each observation, and `μ` is the exact population mean.

### Sample Variance (`s²`) and Bessel's Correction

In experimental testing, quality engineering, and financial analysis, you normally observe a finite sample of size `n` drawn from an ongoing process. Because the true mean `μ` is unknown, deviations must be centered around the sample mean `x̄`:

```text
x̄  = (1 / n) × Σ xᵢ
s² = [Σ (xᵢ − x̄)²] / (n − 1)
```

Replacing `μ` with `x̄` pulls the center toward the sample itself, making `Σ(xᵢ − x̄)²` smaller than `Σ(xᵢ − μ)²`. Dividing by `n − 1`—**Bessel's correction**—compensates for the `1` degree of freedom consumed when estimating `x̄`, making `s²` an unbiased estimator of `σ²`.

### Standard Deviation and Numerical Stability

Because variance reports spread in squared units (such as `ft²` or `kWh²`), analysts take its square root to compute **standard deviation** (`σ = √σ²` or `s = √s²`), restoring the original measurement units.

While hand calculations sometimes use the shortcut `s² = [Σxᵢ² − (Σxᵢ)² / n] / (n − 1)`, subtracting two large nearly equal sums in floating-point arithmetic risks **catastrophic cancellation**. Software libraries use **Welford's one-pass algorithm** to maintain running sums of squares accurately without precision loss.

## Step-by-Step Worked Example: Server Rack Power Readings

Suppose an engineer logs `n = 6` daily energy readings (in `kWh`) from a sampled server rack: `[118, 122, 125, 127, 130, 134]`.

1. **Sample mean (`x̄`):**
   `Σ xᵢ = 118 + 122 + 125 + 127 + 130 + 134 = 756 kWh` → `x̄ = 756 / 6 = 126 kWh`.
2. **Deviations `(xᵢ − 126)`:**
   `-8, -4, -1, +1, +4, +8` (signed deviations always sum to `0`).
3. **Squared deviations `(xᵢ − 126)²`:**
   `64, 16, 1, 1, 16, 64`.
4. **Sum of squares (`SS`):**
   `SS = 64 + 16 + 1 + 1 + 16 + 64 = 162 kWh²`.
5. **Sample variance (`s²`):**
   `s² = 162 / (6 − 1) = 162 / 5 = 32.4 kWh²`, giving `s = √32.4 ≈ 5.692 kWh`.
6. **Population variance (`σ²`) comparison:**
   If those 6 days were the entire closed universe, `σ² = 162 / 6 = 27.0 kWh²` and `σ = √27.0 ≈ 5.196 kWh`.

Omitting Bessel's correction on a 6-point sample underestimates variance by `1 / 6 = 16.67%`, whereas at `n = 1,000`, the discrepancy shrinks to `0.10%`.

## Dispersion Metrics Compared

Selecting the right spread metric depends on unit interpretability, sample size, and outlier prevalence.

| Metric | Formula / Definition | Output Units | Outlier Sensitivity | Best Use Case |
| :--- | :--- | :--- | :--- | :--- |
| Population Variance (`σ²`) | `Σ(xᵢ − μ)² / N` | Squared units | High (quadratic) | Complete census data, theoretical distributions |
| Sample Variance (`s²`) | `Σ(xᵢ − x̄)² / (n − 1)` | Squared units | High (quadratic) | Inferential statistics, A/B tests, ANOVA |
| Standard Deviation (`s`, `σ`) | `√s²` or `√σ²` | Original units | High | Confidence intervals, Six Sigma, volatility |
| Mean Absolute Deviation (`MAD`) | `Σ\|xᵢ − x̄\| / n` | Original units | Moderate (linear) | Error reporting without quadratic distortion |
| Interquartile Range (`IQR`) | `Q₃ − Q₁` | Original units | Very low (robust) | Skewed income, home price, or latency data |
| Coefficient of Variation (`CV`) | `(s / x̄) × 100%` | Dimensionless (%) | High | Comparing spread across different units |

## Practical Use Cases and Analytical Pitfalls

Variance informs risk and precision across three primary domains:

- **Finance and Portfolio Theory:** Two-asset portfolio variance equals `w₁²σ₁² + w₂²σ₂² + 2w₁w₂Cov(R₁, R₂)`, showing how negatively correlated assets reduce total volatility without sacrificing expected return.
- **Manufacturing Quality Control:** Process capability indices (`Cp`, `Cpk`) depend on sample standard deviation `s` from control-chart subgroups; dividing by `n` on small `5`-unit batches masks out-of-spec defect risk.
- **Experimental ANOVA:** Analysis of Variance splits total variation into between-group and within-group mean squares (`F = MS_between / MS_within`) to isolate treatment signals from random noise.

Avoid three common mistakes: never compare raw variances across variables with different units (use `CV = s / x̄`), never apply `n − 1` to discrete probability distribution variance `Σ pᵢ(xᵢ − μ)²`, and note that while `s²` is unbiased for `σ²`, `s` exhibits slight downward bias for small `n` by Jensen's inequality.
