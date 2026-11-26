---
title: "P-Values: Is Your Data Statistically Significant?"
description: "Understand null hypothesis testing, exact p-value interpretation, one-tailed vs. two-tailed tests, and statistical significance thresholds for experimental data."
category: "Math & Science"
relatedCalculator: "p-value-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Does a p-value of 0.03 mean there is a 97% probability that my hypothesis is true?"
    answer: "No. A p-value is calculated assuming the null hypothesis is true: it states that if no real effect existed, random sampling alone would produce a result at least as extreme as yours 3% of the time. It does not measure the posterior probability that either hypothesis is true, which requires Bayesian updating with prior probabilities."
  - question: "When should I choose a one-tailed test instead of a two-tailed test?"
    answer: "Use a two-tailed test by default whenever an effect could plausibly occur in either direction—for example, a drug might either lower or raise blood pressure. Only use a one-tailed test if you pre-specify a strict directional hypothesis before collecting data and an effect in the opposite direction is scientifically or operationally irrelevant."
  - question: "Why is p < 0.05 used so widely, and when is a stricter alpha required?"
    answer: "Ronald Fisher popularized p = 0.05 (a 1-in-20 false-positive rate) as a convenient screening benchmark for agricultural experiments. Modern genomics routinely enforces alpha = 5 × 10^-8 to control family-wise error across millions of SNPs, while particle physics requires five-sigma (p ≈ 5.7 × 10^-7) before declaring a discovery."
  - question: "What is the difference between statistical significance and practical significance?"
    answer: "Statistical significance depends heavily on sample size: with 100,000 observations, a clinically trivial difference of 0.1 mmHg in blood pressure can yield p < 0.001. Practical significance evaluates whether the absolute effect size, confidence interval, and cost-benefit profile actually matter in real-world decision-making."
  - question: "How do I avoid p-hacking when analyzing experimental data?"
    answer: "Pre-register your primary endpoint, sample size, statistical test, and outlier-exclusion criteria before looking at outcomes. Never stop data collection early just because p drops below 0.05, and apply multiple-testing corrections such as Bonferroni or Benjamini-Hochberg FDR whenever evaluating multiple hypotheses simultaneously."
---

A p-value is the conditional probability of observing a test statistic at least as extreme as the one measured in your dataset, assuming the null hypothesis (`H0`) is strictly true. Mathematically written as `p = P(|T| ≥ |t_obs| | H0)`, a small p-value indicates that your observed data is incompatible with pure sampling noise under the null model, whereas a large p-value means the data offers insufficient evidence to reject `H0`. Crucially, a p-value is **not** the probability that `H0` is true, nor is `1 − p` the probability that your alternative hypothesis (`H1`) is correct.

In applied research, engineering A/B testing, and clinical trials, p-values serve as a standardized filter against false-positive conclusions—when paired with effect sizes, confidence intervals, and pre-specified significance thresholds (`α`). Convert any Z-score or t-statistic into an exact probability using our [P-Value Calculator](/en/calculators/p-value-calculator).

## Core Methodology and Test Statistic Formulas

Null hypothesis significance testing (NHST) begins with two mutually exclusive statements defined before data collection: the null hypothesis (`H0`), positing zero effect or difference, and the alternative hypothesis (`H1`), positing a non-zero effect. You also fix a Type I error rate `α`—the maximum false-positive probability tolerated if `H0` is true.

### Z-Test vs. Student's t-Test Formulas

Selecting the reference distribution depends on whether population standard deviation (`σ`) is known and sample size (`n`):

```text
One-sample Z-statistic (known σ or large n):
Z = (x̄ − μ0) / (σ / √n)

One-sample t-statistic (estimated sample standard deviation s):
t = (x̄ − μ0) / (s / √n)   with degrees of freedom df = n − 1

Standard Error of the Mean:
SE = s / √n
```

Here `x̄` is the sample mean, `μ0` is the hypothesized population mean under `H0`, `s` is the sample standard deviation using Bessel's correction (`n − 1`), and `n` is the count of independent observations. Beyond roughly `df = 30–50`, Student's t-distribution converges toward the normal Z-distribution; at smaller samples, its heavier tails reflect uncertainty in `s`.

### One-Tailed vs. Two-Tailed P-Values

The p-value integrates the tail area of the null distribution beyond the observed statistic:

```text
Two-tailed p-value (tests H1: μ ≠ μ0):
p = 2 × P(T ≥ |t_obs|)   or   p = 2 × [1 − Φ(|Z_obs|)]

Right-tailed p-value (tests H1: μ > μ0):
p = P(T ≥ t_obs)

Left-tailed p-value (tests H1: μ < μ0):
p = P(T ≤ t_obs)
```

Here `Φ(z)` denotes the standard normal cumulative distribution function (CDF). A two-tailed test splits `α` equally across both tails (`α/2` in each tail), requiring a more extreme test statistic to cross the significance threshold than a one-tailed test at the same `α`.

## Step-by-Step Worked Clinical Trial Example

Suppose a clinical research team evaluates a new antihypertensive protocol against an established standard-of-care mean systolic blood pressure reduction of `μ0 = 4.0 mmHg`. They enroll `n = 25` independent patients and record a sample mean reduction of `x̄ = 6.4 mmHg` with a sample standard deviation of `s = 5.0 mmHg`. They set a pre-specified two-tailed significance level of `α = 0.05`.

1. **Compute the standard error (`SE`):**
   `SE = 5.0 / √25 = 5.0 / 5 = 1.0 mmHg`.
2. **Compute the t-statistic:**
   `t = (6.4 − 4.0) / 1.0 = 2.40`.
3. **Determine degrees of freedom (`df`):**
   `df = 25 − 1 = 24`.
4. **Evaluate the two-tailed p-value:**
   For `t = 2.40` with `df = 24`, the upper-tail probability is `P(T ≥ 2.40) = 0.01225`. Doubling both tails gives `p = 2 × 0.01225 = 0.0245`.
5. **Draw the statistical decision:**
   Because `p = 0.0245 < 0.05`, the team rejects `H0` at the 5% significance level. Note that the 95% confidence interval for the true mean reduction is `6.4 ± (2.0639 × 1.0) = [4.34 mmHg, 8.46 mmHg]`, confirming both statistical significance and a clinically relevant improvement above `4.0 mmHg`.

## Significance Thresholds and Z-Score Benchmarks

Different scientific and engineering disciplines calibrate `α` based on the cost of a false positive versus the volume of simultaneous hypothesis tests. The table below maps standard two-tailed p-values to their exact standard normal critical `Z` thresholds and typical domain applications.

| Significance Level (`α`) | Critical `|Z|` (Two-Tailed) | Critical `|Z|` (One-Tailed) | Odds Against Random Chance (Under `H0`) | Typical Domain Standard |
| --- | --- | --- | --- | --- | --- |
| `0.10` (10%) | `1.6449` | `1.2816` | 10 to 1 | Exploratory pilot screening & early UX prototypes |
| `0.05` (5%) | `1.9600` | `1.6449` | 20 to 1 | Conventional biomedical, behavioral, & product A/B tests |
| `0.01` (1%) | `2.5758` | `2.3263` | 100 to 1 | High-stakes manufacturing QA & confirmatory A/B holds |
| `0.001` (0.1%) | `3.2905` | `3.0902` | 1,000 to 1 | Sequential interim clinical monitoring boundaries |
| `5 × 10^-8` | `5.4513` | `5.3267` | 20,000,000 to 1 | Genome-Wide Association Studies (GWAS) |
| `5.73 × 10^-7` (5-sigma) | `5.0000` | `4.8916` | ~1,744,000 to 1 | High-energy particle physics discovery standard |

## Common Statistical Pitfalls and Precision Caveats

Even mathematically exact p-values produce misleading conclusions when underlying model assumptions fail or multiple comparisons go uncorrected:

- **Multiple Comparisons and Family-Wise Error:** Running 20 independent tests at `α = 0.05` when all null hypotheses are true yields a `1 − (0.95)^20 = 0.6415` (64.2%) probability of at least one false positive. Apply Bonferroni (`α_adj = α / m`) or Benjamini-Hochberg FDR adjustments.
- **Confusing `p > 0.05` with Proof of Zero Effect:** Failing to reject `H0` often reflects low statistical power (`1 − β`) from small samples or high variance, not proof of equivalence. Always check the minimum detectable effect.
- **Data Peeking and Optional Stopping:** Checking live A/B tests daily and stopping once `p < 0.05` inflates false positives above 25%. Use fixed sample horizons or alpha-spending boundaries (such as O'Brien-Fleming).
- **Violated Independence or Normality Assumptions:** Autocorrelated series, clustered data, or skewed distributions distort parametric p-values. Verify residual diagnostics or switch to Mann-Whitney U, Wilcoxon signed-rank, or bootstrap resampling.
