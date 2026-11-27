---
title: "Rule of 72 Calculator"
description: "Calculate investment doubling time fast with the Rule of 72. Compare Rule of 70 and 69.3 accuracy, factor in inflation erosion, and see worked examples."
faqs:
  - question: "Why does the Rule of 72 use 72 instead of 69.3 for mental math?"
    answer: "Although continuous compounding mathematically centers on ln(2) = 0.693, annual compounding adds a slight upward lag. Dividing into 72 closely absorbs that lag across typical 6% to 10% investment returns while offering twelve whole-number factors (1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72) for instant mental division."
  - question: "When should I switch from the Rule of 72 to the Rule of 70 or Rule of 69.3?"
    answer: "Use the Rule of 70 for low-rate annual metrics between 1% and 4%, such as inflation erosion or high-yield savings accounts. Use the Rule of 69.3 when modeling continuous or daily compounding, such as money market funds or theoretical macroeconomic growth models."
  - question: "Does the Rule of 72 work for debt and inflation as well as investments?"
    answer: "Yes. Because compounding is symmetric, dividing 72 by a credit card APR estimates how quickly unpaid revolving debt doubles, while dividing 70 or 72 by the annual inflation rate estimates how many years it takes for purchasing power to fall by 50%."
  - question: "How do taxes and advisory fees change the Rule of 72 calculation?"
    answer: "You must subtract annual expense ratios, advisory fees, and estimated tax drag from your gross nominal return before dividing into 72. In a taxable brokerage account, ordinary dividend and short-term capital gains taxes under 2026 IRS brackets slow compounding significantly compared with tax-advantaged retirement accounts."
  - question: "At what interest rates does the Rule of 72 lose accuracy?"
    answer: "The Rule of 72 stays within roughly 1% to 3% of the exact logarithmic formula between 5% and 12%. Below 3% it overestimates doubling time slightly, and above 15% it underestimates doubling time because discrete annual jumps diverge from continuous exponential curves."
---

The **Rule of 72** is a rapid mental-math heuristic that estimates how many years an investment, debt balance, or price index takes to double at a fixed annual compounding rate. By dividing `72` by the annual percentage rate (`r`), you obtain an immediate approximation that closely tracks exact logarithmic compounding across typical equity, bond, and consumer-loan rates.

In 2026 financial planning, this shortcut remains a foundational sanity check for comparing real returns against inflation, evaluating Consumer Financial Protection Bureau (CFPB) Truth in Lending APR disclosures, and measuring long-term tax drag under 2026 IRS ordinary-income and capital-gains schedules. While exact calculators rely on natural logarithms, the Rule of 72 lets you stress-test compounding claims in seconds without a spreadsheet.

## Mathematical Formula, Variables, and Methodology

The Rule of 72 expresses exponential growth as a simple inverse proportion, whereas the exact compounding time derives from solving `(1 + r)^t = 2` for time `t`.

* **Rule of 72 Approximation:** `Doubling Years ≈ 72 ÷ r (%)`
* **Rule of 70 (Low-Rate / Inflation Variant):** `Doubling or Halving Years ≈ 70 ÷ r (%)`
* **Rule of 69.3 (Continuous Compounding Variant):** `Doubling Years ≈ 69.3 ÷ r (%)`
* **Exact Discrete Compounding Formula:** `Exact Years = ln(2) ÷ ln(1 + r_decimal)`

Here, `r (%)` represents the percentage rate as a whole or decimal number (for example, `8` for an `8%` annual return), and `r_decimal` represents the decimal equivalent (`0.08`). The constant `ln(2) ≈ 0.693147` is the exact time required to double at a 100% continuous growth rate. Because discrete annual compounding pays interest once per period rather than continuously, `ln(1 + r_decimal)` is slightly smaller than `r_decimal`. Raising the numerator from `69.3` to `72` compensates for that discrete-compounding gap right around an `8%` annual return, where `72 ÷ 8 = 9.00` years matches the exact `9.0065` years to within less than three days.

Regulatory bodies such as the CFPB require lenders to disclose standardized Annual Percentage Rates (APRs), while SEC and FINRA illustration guidelines emphasize expressing growth net of fees. Applying the Rule of 72 to **net real return**—gross return minus expense ratios, taxes, and inflation—aligns quick mental projections with statutory disclosure standards.

## Step-by-Step Worked Practical Example

Suppose an investor allocates `$25,000` into a diversified index portfolio inside a tax-advantaged retirement account earning an expected `8.0%` nominal annual return, while long-term inflation runs at `2.5%` per year.

1. **Estimate nominal doubling time with the Rule of 72:**
   Divide `72` by `8`: `72 ÷ 8 = 9.00 years`. The `$25,000` balance is projected to reach `$50,000` in roughly `9` years and `$100,000` in `18` years.
2. **Verify against the exact logarithmic formula:**
   Compute `ln(2) ÷ ln(1 + 0.08) = 0.693147 ÷ 0.076961 = 9.01 years`. The Rule of 72 differs from exact math by just `0.0065` years (about `2.4` days).
3. **Adjust for inflation erosion (real purchasing power):**
   Calculate the exact real return using the Fisher equation: `((1 + 0.08) ÷ (1 + 0.025)) − 1 = (1.08 ÷ 1.025) − 1 = 0.053659`, or `5.37%`. Applying the Rule of 72 gives `72 ÷ 5.37 = 13.41 years`, compared with the exact real doubling time of `ln(2) ÷ ln(1.053659) = 13.26 years`.
4. **Check purchasing-power halving time at 2.5% inflation:**
   At `2.5%`, the Rule of 72 predicts `72 ÷ 2.5 = 28.80 years` to halve purchasing power, whereas the Rule of 70 gives `70 ÷ 2.5 = 28.00 years`—virtually identical to the exact `ln(2) ÷ ln(1.025) = 28.07 years`.

## Rule of 72 vs. Rule of 70 vs. Rule of 69.3 Benchmark Table

The table below compares all three mental-math heuristics against exact annual compounding across common inflation, savings, equity, and consumer-debt rates.

| Annual Rate (`r`) | Rule of 72 (Years) | Rule of 70 (Years) | Rule of 69.3 (Years) | Exact `ln(2) ÷ ln(1+r)` | Most Accurate Shortcut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2.0%** (Inflation / Cash) | 36.00 | 35.00 | 34.65 | 35.00 | Rule of 70 |
| **4.0%** (Treasury / HYSA) | 18.00 | 17.50 | 17.33 | 17.67 | Rule of 70 |
| **6.0%** (Balanced Portfolio) | 12.00 | 11.67 | 11.55 | 11.90 | Rule of 72 |
| **8.0%** (Equity Benchmark) | 9.00 | 8.75 | 8.66 | 9.01 | Rule of 72 |
| **10.0%** (High-Growth Equity) | 7.20 | 7.00 | 6.93 | 7.27 | Rule of 72 |
| **12.0%** (Aggressive Target) | 6.00 | 5.83 | 5.78 | 6.12 | Rule of 72 |
| **18.0%** (Credit Card APR) | 4.00 | 3.89 | 3.85 | 4.19 | Rule of 72 (Exact preferred) |

## Strategic Insights, Common Mistakes, and Financial Caveats

* **Adjust the numerator for extreme rates:** For rates far above `8%`, analysts sometimes add `1` to `72` for every `3` percentage points above `8%` (for example, using `73` at `11%` or `75` at `17%`). At `18%`, `75 ÷ 18 = 4.17 years`, slashing the error against the exact `4.19` years.
* **Never plug gross returns into taxable scenarios:** Failing to deduct fund expense ratios and 2026 IRS tax drag is the most common planning mistake. A `7%` bond yield taxed at a `24%` federal marginal rate nets `5.32%` after federal tax, extending doubling time from `10.3` years to `13.5` years.
* **Watch sequence-of-returns risk:** The Rule of 72 assumes a constant compound annual growth rate (CAGR). Volatile markets with identical arithmetic averages compound more slowly due to variance drag, especially when withdrawing income in retirement.
* **Recognize debt symmetry:** Carrying an `18%` APR balance doubles unpaid principal in roughly `4.19` years if interest is left to capitalize, making high-interest debt repayment a guaranteed risk-free return.

*Disclaimer: This article and the accompanying Rule of 72 Calculator are provided for educational and illustrative purposes only and do not constitute personalized investment, tax, or legal advice. Consult a qualified financial planner or tax professional before making portfolio or borrowing decisions.*
