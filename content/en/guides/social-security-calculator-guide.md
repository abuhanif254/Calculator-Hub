---
title: "When Should I Take Social Security? Maximizing Your Benefits"
description: "Learn the exact SSA reduction and delayed credit formulas, compute your breakeven age between 62, 67, and 70, and model payouts with our Social Security Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "social-security-calculator"
faqs:
  - question: "How much does claiming Social Security at 62 permanently reduce my benefit?"
    answer: "If your Full Retirement Age (FRA) is 67 (anyone born in 1960 or later), claiming 60 months early at age 62 permanently reduces your monthly check by 30%. You lose 5/9 of 1% for each of the first 36 early months (20%) plus 5/12 of 1% for each of the remaining 24 months (10%)."
  - question: "Why is age 70 the maximum claiming age for Social Security?"
    answer: "Delayed Retirement Credits (DRCs) accrue at 2/3 of 1% per month—exactly 8.00% per full year—between your FRA and age 70, raising a 67-FRA benefit to 124% of your Primary Insurance Amount. Credits stop accruing in the month you turn 70, so waiting past 70 forfeits checks with zero increase in payout."
  - question: "What is the typical breakeven age between claiming at 62 versus 70?"
    answer: "On a nominal, pre-tax basis without discounting investment opportunity cost, the cumulative lifetime payout from waiting until 70 surpasses claiming at 62 at roughly age 80.4 (80 years and 4 months). Comparing age 67 versus age 70 yields a breakeven age of exactly 82.5."
  - question: "Should I still enroll in Medicare at 65 if I delay Social Security until 70?"
    answer: "Yes. Delaying Social Security does not delay Medicare eligibility, and failing to sign up for Medicare Part B during your 7-month Initial Enrollment Period around age 65 triggers a permanent 10% late-enrollment penalty per 12-month delay unless you have qualifying active employer coverage."
  - question: "How does the higher earner's claiming age affect a surviving spouse?"
    answer: "When one spouse dies, the survivor keeps the larger of the two benefits and drops the smaller one—and the survivor benefit includes all Delayed Retirement Credits the deceased earned. For married couples, having the higher earner delay to 70 acts as inflation-adjusted longevity insurance for whichever spouse lives longest."
---

Deciding when to claim Social Security between **age 62** and **age 70** permanently locks in your baseline inflation-adjusted retirement annuity. For workers born in 1960 or later—whose **Full Retirement Age (FRA) is 67**—claiming at 62 cuts your monthly check by **30%**, whereas delaying until 70 boosts it to **124%** of your full benefit, making the age-70 check **77.14% larger** every month for life.

Because total lifetime payouts depend on longevity, spousal survivor rules, and taxation, there is no universal claiming age. Use our [Social Security Calculator](/en/calculators/social-security-calculator) to compare exact monthly checks and cumulative breakeven ages across your target retirement dates.

## Core SSA Benefit Formula and Adjustment Rules

The Social Security Administration (SSA) calculates your baseline benefit in two stages before applying your claiming-age multiplier:

1. **Average Indexed Monthly Earnings (AIME):** The SSA indexes your historical covered earnings for national wage growth, selects your **highest 35 earning years**, sums them, and divides by `420` months (`35 × 12`). Any year short of 35 enters as `$0`.
2. **Primary Insurance Amount (PIA):** A progressive three-tier formula applies **90%**, **32%**, and **15%** factors across statutory monthly bend points to convert AIME into your PIA—the exact monthly amount payable at your FRA.

Claiming before or after FRA modifies your PIA by fixed statutory monthly fractions:

```text
Early Reduction (≤ 36 months before FRA)  = m_early × (5 / 9)%     [= 0.5556% per month]
Early Reduction (> 36 months before FRA)  = 20% + (m_early − 36) × (5 / 12)%  [= 0.4167% per month]
Delayed Credit (per month past FRA to 70) = m_late × (2 / 3)%      [= 8.00% per full year]
Adjusted Monthly Benefit                  = PIA × Adjustment Multiplier
```

Where `m_early` is the number of months claimed prior to FRA (maximum 60 months for FRA 67) and `m_late` is the number of months delayed past FRA up to age 70 (maximum 36 months for FRA 67). Cost-of-Living Adjustments (COLAs) apply multiplicatively to your adjusted benefit regardless of when you file, compounding the dollar advantage of waiting.

## Step-by-Step Worked Numerical Example

Suppose a retiree born in 1962 has an **FRA of 67** and an estimated **PIA of $2,500/month** (`$30,000/year` at 67). Let us compare claiming at **62**, **65**, **67**, and **70**:

1. **Claiming at Age 62 (`m_early = 60`):**
   * Reduction = `(36 × 5/9)% + (24 × 5/12)% = 20.00% + 10.00% = 30.00%`.
   * Monthly payout = `$2,500 × 0.70 = $1,750.00/month` (`$21,000/year`).
2. **Claiming at Age 65 (`m_early = 24`):**
   * Reduction = `24 × (5/9)% = 13.33%`.
   * Monthly payout = `$2,500 × (1 − 0.133333) = $2,166.67/month` (`$26,000/year`).
3. **Claiming at Age 67 (`FRA`):**
   * Multiplier = `100.00%` → **$2,500.00/month** (`$30,000/year`).
4. **Claiming at Age 70 (`m_late = 36`):**
   * Credit = `36 × (2/3)% = +24.00%`.
   * Monthly payout = `$2,500 × 1.24 = $3,100.00/month` (`$37,200/year`).
5. **Compute Nominal Breakeven Ages:**
   * **62 vs. 67:** Solve `$1,750 × 12 × (T − 62) = $2,500 × 12 × (T − 67)` → `T = 78.67` (**78 years, 8 months**).
   * **62 vs. 70:** Solve `$1,750 × 12 × (T − 62) = $3,100 × 12 × (T − 70)` → `T = 80.37` (**80 years, 4 months**).
   * **67 vs. 70:** Solve `$2,500 × 12 × (T − 67) = $3,100 × 12 × (T − 70)` → `T = 82.50` (**82 years, 6 months**).

## Claiming Age Benchmark Table ($2,500 PIA, FRA = 67)

The table below shows how each claiming age scales monthly income, cumulative pre-tax payouts by ages 80 and 85, and nominal breakeven thresholds (excluding future COLAs and investment opportunity cost):

| Claiming Age | % of PIA | Monthly Check | Annual Benefit | Cumulative by Age 80 | Cumulative by Age 85 | Breakeven vs. Age 62 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **62** | 70.00% | $1,750.00 | $21,000 | $378,000 | $483,000 | Baseline |
| **63** | 75.00% | $1,875.00 | $22,500 | $382,500 | $495,000 | 77.0 yrs |
| **64** | 80.00% | $2,000.00 | $24,000 | $384,000 | $504,000 | 78.0 yrs |
| **65** | 86.67% | $2,166.67 | $26,000 | $390,000 | $520,000 | 77.6 yrs |
| **66** | 93.33% | $2,333.33 | $28,000 | $392,000 | $532,000 | 78.0 yrs |
| **67 (FRA)** | 100.00% | $2,500.00 | $30,000 | $390,000 | $540,000 | 78.7 yrs |
| **70 (Max)** | 124.00% | $3,100.00 | $37,200 | $372,000 | $558,000 | 80.4 yrs |

## Spousal Rules, Tax Traps, and Real-World Caveats

Pure nominal breakeven math overlooks four statutory rules that often flip the optimal claiming age:

* **Retirement Earnings Test Before FRA:** Claiming before FRA while working triggers temporary withholding of **$1 for every $2 earned** above the annual earnings limit (with a higher limit and $1-for-$3 withholding in your FRA year). Withheld checks are recalculated upward at FRA, but early claiming alongside a full salary causes avoidable tax drag.
* **Federal Taxation (Provisional Income):** Up to **50%** of benefits become taxable once provisional income (`AGI + nontaxable interest + 50% of Social Security`) exceeds **$25,000 (single) / $32,000 (married filing jointly)**, and up to **85%** above **$34,000 / $44,000**. Because thresholds are not inflation-indexed, delaying Social Security while drawing down traditional IRA/401(k) assets between 62 and 70 often trims lifetime taxes and future RMDs.
* **Spousal vs. Survivor Asymmetry:** Spousal benefits cap at **50% of the worker's PIA** at the spouse's FRA and earn no Delayed Retirement Credits. However, a **survivor benefit** inherits up to **100% of the deceased spouse's actual check, including DRCs**—making age-70 deferral by the higher earner crucial longevity protection for married couples.
* **Opportunity Cost and Health:** Nominal breakeven assumes a 0% real return on early checks invested. A 3% real return pushes the 62-vs-70 breakeven into the mid-to-late 80s, while poor health or urgent liquidity favors claiming earlier.
