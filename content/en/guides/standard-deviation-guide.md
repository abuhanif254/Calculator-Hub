---
title: "Understanding Standard Deviation with Examples"
description: "A clear explanation of standard deviation and variance: the difference between population and sample formulas, what σ tells you about data spread, and how to read output from our statistics calculator."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "standard-deviation-calculator"
---

## What Is Standard Deviation?

**Standard deviation** is a measure of how spread out the values in a dataset are around the mean (average). A small standard deviation means values cluster tightly around the mean; a large standard deviation means values are widely scattered.

It answers the fundamental question: *"How typical is the average?"* If you're told a class averages 75 on an exam, a standard deviation of 3 (most scores between 72–78) tells a completely different story than a standard deviation of 20 (scores ranging from 35 to 100+).

Standard deviation is represented by the Greek letter **σ (sigma)** for a population and **s** for a sample.

## The Formulas

### Population Standard Deviation (σ)

Use this when you have data for an **entire population** — every possible member of the group you're studying.

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{N}(x_i - \mu)^2}{N}}
$$

### Sample Standard Deviation (s)

Use this when your data is a **sample drawn from a larger population** — which is true for almost all real-world data collection.

$$
s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
$$

**The critical difference:** Sample formula divides by **(n − 1)** instead of **n**. This is called **Bessel's correction** — it compensates for the fact that a sample systematically underestimates population variance when dividing by n. Using (n − 1) gives an unbiased estimator of the true population standard deviation.

**Variance** is simply the square of standard deviation — the intermediate value before taking the square root:

$$
\text{Variance} (\sigma^2 \text{ or } s^2) = \frac{\sum(x_i - \mu)^2}{N} \quad \text{or} \quad \frac{\sum(x_i - \bar{x})^2}{n-1}
$$

## Step-by-Step Guide: Worked Example

**Dataset: [4, 7, 13, 2, 1]** — Treat this as a sample (n = 5).

### Step 1: Calculate the Mean

$$
\bar{x} = \frac{4 + 7 + 13 + 2 + 1}{5} = \frac{27}{5} = 5.4
$$

### Step 2: Find Each Deviation from the Mean

$$
(4 - 5.4) = -1.4 \qquad (7 - 5.4) = 1.6 \qquad (13 - 5.4) = 7.6
$$
$$
(2 - 5.4) = -3.4 \qquad (1 - 5.4) = -4.4
$$

### Step 3: Square Each Deviation

$$
(-1.4)^2 = 1.96 \qquad (1.6)^2 = 2.56 \qquad (7.6)^2 = 57.76
$$
$$
(-3.4)^2 = 11.56 \qquad (-4.4)^2 = 19.36
$$

### Step 4: Sum the Squared Deviations

$$
\sum(x_i - \bar{x})^2 = 1.96 + 2.56 + 57.76 + 11.56 + 19.36 = \textbf{93.2}
$$

### Step 5: Divide by (n − 1) for Sample Variance

$$
s^2 = \frac{93.2}{5-1} = \frac{93.2}{4} = \textbf{23.3}
$$

### Step 6: Take the Square Root

$$
s = \sqrt{23.3} \approx \textbf{4.83}
$$

**Interpretation:** The average value in this dataset is 5.4, and a typical data point deviates from that mean by approximately **±4.83 units**. Notice that the value 13 is a large outlier — it contributes 57.76 out of 93.2 total squared deviation (62% of total variance by itself).

**For comparison, the population standard deviation would be:**
$$
\sigma = \sqrt{\frac{93.2}{5}} = \sqrt{18.64} \approx 4.32
$$

## The Empirical Rule (68-95-99.7 Rule)

For datasets that follow a **normal (bell-curve) distribution**, standard deviation defines precise probability intervals:

| Range | Contains Approximately |
|---|---|
| μ ± 1σ | **68.27%** of values |
| μ ± 2σ | **95.45%** of values |
| μ ± 3σ | **99.73%** of values |

**Example:** Adult male heights in the US are normally distributed with μ = 69.1 inches and σ = 2.9 inches:
- 68% of men are between **66.2 and 72.0 inches** (5'6" – 6'0")
- 95% are between **63.3 and 74.9 inches** (5'3" – 6'3")
- 99.7% are between **60.4 and 77.8 inches** (5'0" – 6'6")

## Z-Score: Standard Deviation in Context

A **z-score** expresses any individual value in terms of how many standard deviations it lies above or below the mean:

$$
z = \frac{x - \mu}{\sigma}
$$

**Example:** A man who is 74 inches tall (6'2"):
$$
z = \frac{74 - 69.1}{2.9} = \frac{4.9}{2.9} \approx 1.69
$$

He is **1.69 standard deviations above average** — taller than approximately 95.5% of men.

## When to Use Population vs. Sample Formula

| Situation | Formula | Why |
|---|---|---|
| Testing all students in a single class | Population (σ) | You have the complete dataset |
| Survey of 500 voters from a country of millions | Sample (s) | Data is a sample; inferring the population |
| Quality control testing every unit in a batch | Population (σ) | Complete set |
| Medical trial with 200 patients from millions | Sample (s) | Sample; generalizing to all patients |
| All historical prices for a specific stock | Population (σ) | You have all data for that security's history |

**Rule of thumb:** If there are values that exist but weren't measured, use the sample formula.

## Key Concepts

| Term | Definition |
|---|---|
| Mean (μ / x̄) | The arithmetic average of all values |
| Variance | Average of squared deviations from the mean |
| Standard Deviation | Square root of variance; same units as original data |
| Bessel's Correction | Using (n−1) instead of n; corrects sample variance underestimation |
| Normal Distribution | Bell-shaped curve where the empirical rule applies |
| Z-Score | Number of standard deviations a value is from the mean |
| Outlier | A value far from the mean; disproportionately inflates variance |

## Frequently Asked Questions

**Why is standard deviation more useful than variance?**
Variance is in squared units (e.g., kg², inches²), making it hard to interpret alongside the original data. Standard deviation returns the spread to the original unit of measurement, making it directly comparable to the mean and individual values.

**Can standard deviation be zero or negative?**
Standard deviation can equal zero — this means every value in the dataset is identical (no spread whatsoever). It can **never** be negative, because it's a square root of a sum of squares, which is always non-negative.

**Does standard deviation work for non-normal distributions?**
Yes — standard deviation can be calculated for any dataset. However, the empirical rule (68-95-99.7%) only applies to normally distributed data. For skewed distributions, the standard deviation still measures spread, but the percentages at each interval differ.

**What's a "good" standard deviation?**
There is no universal good or bad value — it depends entirely on the context and scale of measurement. A standard deviation of $5 is excellent for a restaurant meal but enormous for a gumball machine. Always interpret standard deviation relative to the mean, using the coefficient of variation (CV = σ/μ × 100%) for scale-independent comparison.
