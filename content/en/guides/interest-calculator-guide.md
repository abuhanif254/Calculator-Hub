---
title: "Simple vs. Compound Interest: A Complete Guide to Growth"
description: "Compare simple linear interest with exponential compound interest across deposits and loans. Explore exact formulas, Rule of 72 shortcuts, and worked benchmarks with our Interest Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "interest-calculator"
faqs:
  - question: "Where is simple interest still used in modern consumer finance?"
    answer: "Simple interest remains standard on short-term Treasury bills (T-bills), Certificates of Deposit (CDs) that pay interest out monthly rather than reinvesting it, most auto installment loans (simple daily interest on declining principal), and certain bridge loans or municipal bonds."
  - question: "Why does the gap between simple and compound interest explode after year 10?"
    answer: "Simple interest adds a constant dollar amount every year, forming a straight line (linear growth). Compound interest recalculates interest on the growing balance itself, producing an exponential curve whose slope steepens continuously as accumulated interest becomes larger than the original principal."
  - question: "Does switching from monthly compounding to daily compounding make a huge difference?"
    answer: "No. Most of the compounding advantage comes from compounding at all rather than the jump from monthly to daily. On $25,000 at 6.00% over 20 years, monthly compounding yields $82,755.11 while daily compounding yields $82,994.74—a difference of just $239.63 over two decades."
  - question: "How does simple daily interest work on an auto loan?"
    answer: "In a simple daily interest auto loan, interest accrues each day only on your remaining unpaid principal: Daily Charge = Remaining Principal × (APR / 365). Paying early or making extra principal payments immediately lowers every subsequent day's interest charge without prepayment penalties."
  - question: "How do taxes and inflation affect compound growth?"
    answer: "Annual taxes on interest or dividends create tax drag that reduces your effective compounding rate each year, while inflation erodes the purchasing power of the ending balance. Holding compounding assets inside tax-advantaged accounts—up to the 2026 IRS limits of $24,500 for 401(k)s, $7,500 for IRAs, and $4,400/$8,750 for HSAs—preserves full gross compounding."
---

Interest is the fee paid for borrowing capital or the yield earned for lending it, and its trajectory depends on a single structural rule: whether accrued interest stays separate from principal or merges into it. **Simple interest** grows linearly because every period's calculation multiplies the original principal alone. **Compound interest** grows exponentially because each period's accrued interest is capitalized into the principal base, generating interest on prior interest.

Over a 12-month horizon, simple and compound calculations differ by pennies; over 20 to 30 years, exponential compounding produces more than double the total wealth of an identical simple-interest rate. Our [Interest Calculator](/en/calculators/interest-calculator) models both regimes side by side across annual, quarterly, monthly, and daily compounding schedules, with optional recurring contributions.

## Core Methodology: Linear vs. Exponential Growth Formulas

Understanding when capital grows linearly versus exponentially requires comparing their closed-form equations and parameter definitions side by side:

```text
Simple Interest:
  I = P × r × t
  A_simple = P × (1 + r × t)

Compound Interest (Discrete Frequency n):
  A_compound = P × (1 + r / n)^(n × t)
  Total Interest = A_compound − P

Compound Interest with Recurring End-of-Period Deposits (PMT):
  A_total = P × (1 + r / n)^(n × t) + PMT × [((1 + r / n)^(n × t) − 1) / (r / n)]
```

Exact parameter definitions:
* **`P` (Principal):** Starting capital invested or borrowed at `t = 0`.
* **`r` (Annual Nominal Rate):** Stated yearly rate expressed as a decimal (`0.06` for `6.00%`).
* **`t` (Time):** Investment or loan duration in years (fractional years such as `0.5` represent 6 months).
* **`n` (Compounding Frequency):** Number of capitalization events per year (`1` = annual, `4` = quarterly, `12` = monthly, `365` = daily).
* **`PMT` (Recurring Deposit):** Additional cash added per compounding period (applicable to savings and retirement accumulation).

### The Rule of 72 Doubling Shortcut
To estimate how many years a compounded lump sum needs to double at annual rate `R` (expressed as a percentage, e.g., `6` for `6%`), divide `72` by `R`: `Doubling Years ≈ 72 / R`. At `6%` annual compounding, money doubles in roughly `12` years (`72 / 6 = 12`; exact value is `11.90` years), whereas simple interest at `6%` requires `16.67` years (`1 / 0.06`) to double once and `50` years to quadruple.

## Step-by-Step Worked Example: `$25,000` at `6.00%` Over `20` Years

Suppose you allocate `$25,000` (`P = $25,000`) at a `6.00%` stated annual rate (`r = 0.06`) for `20` years (`t = 20`) with zero additional deposits. Compare four calculation methods:

1. **Simple Interest (`I = P × r × t`):**
   * Annual interest earned every year: `$25,000 × 0.06 = $1,500.00`
   * Total interest over 20 years: `$1,500.00 × 20 = $30,000.00`
   * Ending balance: `$25,000 + $30,000 = $55,000.00`
2. **Annual Compounding (`n = 1`):**
   * `A_annual = $25,000 × (1 + 0.06)^20 = $25,000 × 3.207135 = $80,178.39`
   * Total interest earned: `$55,178.39` (`$25,178.39` more than simple interest).
3. **Monthly Compounding (`n = 12`, `n × t = 240`):**
   * Monthly periodic rate: `0.06 / 12 = 0.005` (`0.50%`)
   * `A_monthly = $25,000 × (1.005)^240 = $25,000 × 3.310204 = $82,755.11`
   * Total interest earned: `$57,755.11` (`$27,755.11` ahead of simple interest).
4. **Daily Compounding (`n = 365`, `n × t = 7,300`):**
   * `A_daily = $25,000 × (1 + 0.06 / 365)^7300 = $82,994.74`
   * Daily compounding adds just `$239.63` over monthly compounding across 20 years—proving that time (`t`) and rate (`r`) dominate compounding frequency (`n`) once `n ≥ 12`.

## Multi-Horizon Growth Benchmark (`$25,000` at `6.00%` APR)

The table below tracks the divergence between linear simple interest and exponential compound growth from Year 1 through Year 30 on a `$25,000` initial balance at `6.00%` nominal rate.

| Horizon (`t`) | Simple Interest Balance | Annual Compound (`n = 1`) | Monthly Compound (`n = 12`) | Compound Advantage (Monthly vs. Simple) | Share of Monthly Balance from Interest |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Year 1` | `$26,500.00` | `$26,500.00` | `$26,541.95` | `+$41.95` | `5.8%` |
| `Year 5` | `$32,500.00` | `$33,455.64` | `$33,721.25` | `+$1,221.25` | `25.9%` |
| `Year 10` | `$40,000.00` | `$44,771.19` | `$45,484.92` | `+$5,484.92` | `45.0%` |
| `Year 15` | `$47,500.00` | `$59,913.95` | `$61,352.34` | `+$13,852.34` | `59.3%` |
| `Year 20` | `$55,000.00` | `$80,178.39` | `$82,755.11` | `+$27,755.11` | `69.8%` |
| `Year 30` | `$70,000.00` | `$143,587.28` | `$150,564.38` | `+$80,564.38` | `83.4%` |

By Year 30, compound interest generates `$125,564.38` in pure interest compared to `$45,000.00` under simple interest—accounting for `83.4%` of the final portfolio value.

## Real-World Applications, Pitfalls, and Precision Caveats

* **Reverse Compounding on Revolving Debt:** Compounding works identically against borrowers. Carrying a `$5,000` balance on a `22%` APR credit card compounds daily unpaid interest onto principal; paying only minimum payments stretches repayment past a decade and multiplies total interest paid.
* **Auto Loans and Simple Daily Interest:** Most US auto loans use **simple daily interest** (`Remaining Principal × APR / 365 × Days Since Last Payment`), not compound interest. Paying late increases total interest because extra days accrue charges, whereas making an extra principal payment early reduces every future day's interest charge.
* **Tax Drag on Taxable Compounding:** If your `$25,000` deposit sits in a taxable savings account earning `6.00%` and you fall in a `24%` marginal federal tax bracket, annual income tax reduces your net compounding rate to `4.56%` (`6.00% × 0.76`). Sheltering investments inside tax-deferred or tax-free vehicles—up to the 2026 IRS limits of `$24,500` for 401(k) deferrals, `$7,500` for IRAs, and `$4,400` individual / `$8,750` family for HSAs—allows uninterrupted gross compounding.
* **Bond Coupons vs. Reinvestment:** A corporate or municipal bond paying a fixed `6.00%` coupon directly to your checking account behaves like **simple interest** unless you actively reinvest those coupons at `6.00%`. Compounding only occurs when interim cash flows stay invested at the stated yield.
