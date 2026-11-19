---
title: "Median Calculator – Find the Median with Step-by-Step Solutions"
metaTitle: "Median Calculator – Quartiles, IQR & Five-Number Summary"
description: "Calculate the median, quartiles, interquartile range (IQR), and five-number summary for odd, even, and grouped datasets with step-by-step solutions."
metaDescription: "Calculate the median, quartiles, interquartile range (IQR), and five-number summary online. Includes odd/even formulas, grouped data, and outlier rules."
faqs:
  - question: "How do you calculate the median when there is an even number of values?"
    answer: "First sort all values from smallest to largest. When the sample size n is even, there is no single middle number; instead, take the two central values at positions n/2 and (n/2) + 1, add them together, and divide by 2 to find their arithmetic average."
  - question: "Why do economists use median household income instead of mean income?"
    answer: "Income and wealth distributions are heavily right-skewed because a small percentage of ultra-high earners pull the arithmetic mean far above what a typical household earns. The median represents the exact 50th percentile earner and remains completely unaffected even if the top earners double or triple their income."
  - question: "What does it mean that the median has a 50% breakdown point?"
    answer: "In robust statistics, the breakdown point is the maximum proportion of observations that can be replaced with arbitrarily extreme values (approaching infinity) before the estimator fails. Up to 50% of a dataset can be corrupted by extreme outliers on one side without shifting the median beyond the remaining central observations, whereas the arithmetic mean has a 0% breakdown point."
  - question: "How do quartiles and the interquartile range (IQR) relate to the median?"
    answer: "Quartiles divide an ordered dataset into four equal parts of 25% each. The first quartile (Q1) is the median of the lower half (25th percentile), the second quartile (Q2) is the overall dataset median (50th percentile), and the third quartile (Q3) is the median of the upper half (75th percentile). The IQR equals Q3 minus Q1, capturing the spread of the middle 50% of the data."
  - question: "Can you find the median of nominal categorical data?"
    answer: "No. Calculating a median requires that data can be ranked in a meaningful ascending or descending sequence. Consequently, the median can be computed for interval, ratio, and ordinal data (such as satisfaction ratings from 1 to 5), but not for unordered nominal categories (such as eye color or country names)."
---

The median ($\tilde{x}$ or $Q_2$) is the positional center of a dataset—the exact value that divides a sorted sequence of numbers into a lower $50\%$ and an upper $50\%$. Unlike the arithmetic mean, which weights every observation by its numerical magnitude, the median depends exclusively on the rank order of the data. This positional property makes it the premier robust measure of central tendency across descriptive statistics, economics, real estate valuation, and latency telemetry.

Whenever a dataset exhibits strong skewness or contains extreme outliers, the arithmetic average drifts toward the long tail of the distribution, misrepresenting what a typical observation looks like. By anchoring the 50th percentile alongside the first and third quartiles ($Q_1$ and $Q_3$), the median provides a distortion-free summary of central location and non-parametric spread.

## Mathematical Formulas for Ungrouped and Grouped Data

Before applying any median formula, the raw dataset $\{x_1, x_2, \dots, x_n\}$ must be sorted into non-decreasing order statistics:

$$x_{(1)} \le x_{(2)} \le x_{(3)} \le \dots \le x_{(n)}$$

where $x_{(1)}$ is the sample minimum and $x_{(n)}$ is the sample maximum.

### 1. Odd Number of Observations ($n$ is odd)

When the total count $n$ is odd, a single unique value occupies the exact middle rank at index $k = \frac{n + 1}{2}$:

$$\text{Median } (\tilde{x}) = x_{\left(\frac{n + 1}{2}\right)}$$

### 2. Even Number of Observations ($n$ is even)

When $n$ is even, the midpoint falls between two central observations at positions $\frac{n}{2}$ and $\frac{n}{2} + 1$. The median is defined as the arithmetic average of these two middle order statistics:

$$\text{Median } (\tilde{x}) = \frac{x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2} + 1\right)}}{2}$$

### 3. Grouped Frequency Distribution Formula

When raw observations are aggregated into continuous class intervals (such as age brackets or income tiers), the exact median is interpolated linearly across the **median class**—the first interval whose cumulative frequency reaches or exceeds $\frac{N}{2}$:

$$\text{Median} = L + \left( \frac{\frac{N}{2} - CF_{\text{prev}}}{f_m} \right) \times w$$

### Variable Definitions

* $x_{(k)}$: The $k$-th order statistic (the value at position $k$ after sorting in ascending order).
* $n$ or $N$: Total number of observations in the dataset.
* $L$: Exact lower class boundary of the median class interval.
* $CF_{\text{prev}}$: Cumulative frequency of all classes strictly preceding the median class.
* $f_m$: Frequency (count of observations) inside the median class itself.
* $w$: Class width of the median interval (upper boundary minus lower boundary).

## Quartiles, Interquartile Range (IQR), and Outlier Fences

In exploratory data analysis, John Tukey introduced the **Five-Number Summary**—Minimum ($x_{(1)}$), First Quartile ($Q_1$), Median ($Q_2$), Third Quartile ($Q_3$), and Maximum ($x_{(n)}$)—which forms the structural basis of a box-and-whisker plot.

1. **First Quartile ($Q_1$, 25th Percentile)**: The median of the lower half of the sorted data.
2. **Second Quartile ($Q_2$, 50th Percentile)**: The overall dataset median $\tilde{x}$.
3. **Third Quartile ($Q_3$, 75th Percentile)**: The median of the upper half of the sorted data.
4. **Interquartile Range ($IQR$)**: The spread of the middle $50\%$ of observations, $IQR = Q_3 - Q_1$.

Using the $IQR$, statisticians establish objective non-parametric boundaries (Tukey Fences) to flag outliers without assuming a normal distribution:

$$\text{Lower Fence} = Q_1 - 1.5 \times IQR, \qquad \text{Upper Fence} = Q_3 + 1.5 \times IQR$$

Additionally, the **Median Absolute Deviation** ($\text{MAD} = \text{median}(|x_i - \tilde{x}|)$) quantifies typical distance from the median as an outlier-proof alternative to standard deviation.

## Step-by-Step Worked Calculation Examples

### Example 1: Odd and Even Samples with Outlier Resistance

Suppose a real estate analyst records $n = 9$ recent residential sales (in thousands of dollars) on a residential street:

$$\text{Raw Prices} = \{310, 275, 340, 290, 1450, 325, 280, 360, 300\}$$

1. **Sort in Ascending Order**: $\{275, 280, 290, 300, 310, 325, 340, 360, 1450\}$.
2. **Locate the Median Position ($n = 9$, Odd)**: At rank index $k = \frac{9 + 1}{2} = 5$, the 5th sorted value is $\tilde{x} = x_{(5)} = \$310\text{k}$. Compare this with the arithmetic mean ($\bar{x} = \frac{3930}{9} = \$436.67\text{k}$), where the single $\$1,450\text{k}$ mansion pulls the average above eight of the nine homes.
3. **Compute Quartiles ($Q_1, Q_3$), $IQR$, and Outlier Fences**:
   * **Lower Half** $\{275, 280, 290, 300\}$: $Q_1 = \frac{280 + 290}{2} = \$285\text{k}$.
   * **Upper Half** $\{325, 340, 360, 1450\}$: $Q_3 = \frac{340 + 360}{2} = \$350\text{k}$.
   * **Interquartile Range**: $IQR = 350 - 285 = \$65\text{k}$.
   * **Upper Outlier Fence**: $350 + 1.5(65) = \$447.5\text{k}$, confirming $\$1,450\text{k}$ is a mathematical outlier.
4. **Even Sample ($n = 8$)**: Evaluating only the eight standard homes $\{275, 280, 290, 300, 310, 325, 340, 360\}$ averages positions $4$ and $5$: $\tilde{x}_{\text{even}} = \frac{300 + 310}{2} = \$305\text{k}$.

### Example 2: Grouped Frequency Table Median

Suppose $N = 50$ server response times (in ms) are grouped into class intervals, where $18$ requests fall below $40\text{ ms}$ ($CF_{\text{prev}} = 18$) and $14$ requests fall within the $40\text{--}50\text{ ms}$ bracket ($L = 40, f_m = 14, w = 10$). Since $\frac{N}{2} = 25$ lands inside $40\text{--}50\text{ ms}$:

$$\text{Median} = 40 + \left(\frac{25 - 18}{14}\right) \times 10 = 45.0\text{ ms}$$

## Reference Comparison: Distribution Shape & Central Tendency

| Distribution Shape | Mathematical Relationship | Optimal Center | Optimal Spread | Typical Domain Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Symmetric (Normal)** | $\text{Mean} = \text{Median} = \text{Mode}$ | Arithmetic Mean ($\bar{x}$) | Standard Deviation ($s$) | Human stature, manufacturing tolerances |
| **Right-Skewed (Positive)** | $\text{Mode} < \text{Median} < \text{Mean}$ | **Median ($\tilde{x}$)** | Interquartile Range ($IQR$) | Household income, home prices, API latency |
| **Left-Skewed (Negative)** | $\text{Mean} < \text{Median} < \text{Mode}$ | **Median ($\tilde{x}$)** | Interquartile Range ($IQR$) | Age at retirement, easy exam scores |
| **Ordinal / Ranked Scales** | Non-metric rank order | **Median ($\tilde{x}$)** | $IQR$ or Percentile Range | Likert survey ratings, clinical pain scales |
| **Heavy-Tailed / Cauchy** | Population mean undefined | **Median ($\tilde{x}$)** | Median Absolute Deviation | High-frequency financial tick returns |
