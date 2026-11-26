---
title: "Simple vs. Compound Interest: What is the Difference?"
description: "Compare linear simple interest against exponential compound interest, understand daily auto-loan accrual and day-count conventions, and model exact totals with our Simple Interest Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "simple-interest-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the core mathematical difference between simple and compound interest?"
    answer: "Simple interest is calculated exclusively on the original principal balance (I = P × r × t), producing linear growth where each period generates the same dollar interest. Compound interest is calculated on principal plus previously accrued unpaid interest (A = P × (1 + r / n)^(n × t)), producing exponential growth."
  - question: "Are most auto loans simple interest or compound interest?"
    answer: "Most U.S. consumer auto loans are daily simple-interest loans. Each day, the lender multiplies your current unpaid principal balance by (APR / 365). Paying a few days early or making extra principal-only payments reduces your remaining principal immediately, shrinking future daily interest charges and lowering total loan cost."
  - question: "What is a precomputed or Rule of 78s loan, and why should I avoid it?"
    answer: "A precomputed loan locks total interest into the contract upfront rather than recalculating daily on remaining principal. Worse, loans using the Rule of 78s allocate disproportionate interest to the earliest months, penalizing early payoff. Federal law bans the Rule of 78s on consumer loans longer than 61 months, but borrowers should always confirm their contract uses simple interest with zero prepayment penalty."
  - question: "When does daily simple interest equal annual compound interest?"
    answer: "Exactly once: at the end of Year 1 when interest compounds annually (n = 1). Over a single annual period with no intra-year compounding, both P × (1 + r × 1) and P × (1 + r)^1 yield the identical balance. From Year 2 onward—or whenever compounding occurs quarterly, monthly, or daily—compound interest pulls progressively ahead."
  - question: "What is the difference between Actual/365 and Actual/360 day-count conventions?"
    answer: "In consumer auto loans, lenders typically divide the nominal rate by 365 (Actual/365). In commercial banking and short-term corporate loans, lenders often use Actual/360 (the banker's year) while charging interest for all 365 days—effectively raising your annual interest cost by 365 / 360, or 1.39% relative to the stated rate."
---

**Simple interest** grows linearly because interest is assessed solely on your original principal (`I = P × r × t`), whereas **compound interest** grows exponentially because previously accrued interest joins the principal base (`A = P × (1 + r / n)^(n × t)`). Over short terms of 12 months or less, the dollar gap between the two methods is small; over 10 to 30 years, compounding generates massive divergence—rewarding savers and penalizing revolving borrowers.

Knowing which formula governs your contract directly changes how you manage debt and cash. On a **daily simple-interest auto loan**, paying a few days early or adding extra principal cuts total interest immediately, whereas **precomputed loans** erase that advantage. Run exact linear interest, maturity values, and time-unit conversions in our [Simple Interest Calculator](/en/calculators/simple-interest-calculator).

## Mathematical Mechanics: Linear Growth vs. Exponential Compounding

In a pure simple-interest contract, unpaid interest never earns or accrues additional interest. Given starting principal `P`, annual nominal interest rate `r` (as a decimal), and time `t` in years (or `Days / 365` and `Months / 12`), total interest (`I`) and maturity balance (`A_simple`) are:

```text
Simple Interest (I)          = P × r × t
Simple Final Balance (A)     = P × (1 + r × t)
Daily Simple Per Diem (d)    = Current Principal × (r / 365)
Compound Final Balance (A_c) = P × (1 + r / n)^(n × t)
Effective Annual Rate (EAR)  = (1 + r / n)^n − 1
```

In the compounding formulas, `n` denotes compounding periods per year (`1` = annual, `4` = quarterly, `12` = monthly, `365` = daily). For **continuous compounding**, the limit as `n → ∞` becomes `A_cont = P × e^(r × t)`, where `e ≈ 2.7182818`.

### Why Daily Simple-Interest Loans Behave Differently from Fixed Bonds

Pure textbook simple interest keeps `P` constant until maturity (common in short-term U.S. Treasury bills, promissory notes, and non-compounding CDs). By contrast, an **amortizing daily simple-interest auto or personal loan** recalculates `Per Diem = Current Balance × (r / 365)` every single night. Each monthly payment first covers the exact days of interest accrued since your previous payment date, and every remaining cent reduces `Current Balance`.

## Worked Numerical Example: `$10,000` Over 5 Years and Daily Auto Accrual

Compare two benchmarks at a **6.00% annual rate (`r = 0.06`)**: first, a `$10,000` static balance held for **5 years** (`t = 5`); second, a `$25,000` daily simple-interest auto loan at **6.50% APR**.

### Part A: Static `$10,000` Balance at 6.00% Over 5 Years

* **Simple Interest:** `I = $10,000 × 0.06 × 5 = $3,000.00` (`$600.00` every year). Final balance = **`$13,000.00`**.
* **Annual Compounding (`n = 1`):** `A = $10,000 × (1.06)^5 = $13,382.26`. Interest earned = **`$3,382.26`** (`+$382.26` extra).
* **Monthly Compounding (`n = 12`):** `A = $10,000 × (1 + 0.06 / 12)^60 = $13,488.50`. Interest earned = **`$3,488.50`** (`+$488.50` extra).

### Part B: Payment Timing on a `$25,000` Daily Simple-Interest Auto Loan (6.50% APR)

On Day 1, daily per-diem interest equals `$25,000 × (0.065 / 365) = $4.4521 per day`, and the scheduled 60-month payment is `$489.15`.
* If you pay on **Day 30**, accrued interest is `$4.4521 × 30 = $133.56`, so **`$355.59`** goes directly toward principal reduction.
* If you pay **5 days late (Day 35)**—even inside a lender's "10-day grace period" before late fees apply—accrued interest rises to `$4.4521 × 35 = $155.82`, shrinking your principal reduction to **`$333.33`**. Those 5 delayed days permanently increase your remaining principal base for the rest of the loan.

## Compounding Frequency and Horizon Benchmark Table (`$10,000` at 6.00% Rate)

The table below illustrates how compounding frequency accelerates balance separation over 1, 5, 10, and 20 years on an identical `$10,000` starting amount at 6.00%:

| Interest Method | Effective Annual Rate (EAR) | Balance at Year 1 | Balance at Year 5 | Balance at Year 10 | Balance at Year 20 | 20-Yr Gain vs. Simple |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Simple Interest** | `6.0000%` | `$10,600.00` | `$13,000.00` | `$16,000.00` | `$22,000.00` | Baseline (`$0.00`) |
| **Annual Compounding** | `6.0000%` | `$10,600.00` | `$13,382.26` | `$17,908.48` | `$32,071.35` | `+$10,071.35` |
| **Quarterly Compounding** | `6.1364%` | `$10,613.64` | `$13,468.55` | `$18,140.18` | `$32,906.63` | `+$10,906.63` |
| **Monthly Compounding** | `6.1678%` | `$10,616.78` | `$13,488.50` | `$18,193.97` | `$33,102.04` | `+$11,102.04` |
| **Daily Compounding** | `6.1831%` | `$10,618.31` | `$13,498.26` | `$18,220.29` | `$33,197.90` | `+$11,197.90` |
| **Continuous Compounding** | `6.1837%` | `$10,618.37` | `$13,498.59` | `$18,221.19` | `$33,201.17` | `+$11,201.17` |

Two structural insights stand out: first, **time horizon dominates compounding frequency**—moving from Simple to Annual adds `$10,071.35` over 20 years, whereas moving from Monthly to Continuous adds just `$99.13`. Second, at Year 1, Simple and Annual Compounding produce the exact same `$10,600.00`.

## Real-World Instruments, Pitfalls, and Regulatory Protections

* **Where Simple Interest Applies:** Consumer **auto loans**, short-term **Certificates of Deposit (CDs)** that pay simple interest at maturity, **bridge notes**, **U.S. Treasury bills** (discount yield basis), and **family or peer promissory notes**. Always favor simple interest when borrowing.
* **Where Compound Interest Applies:** **High-yield savings accounts**, **credit cards** (which compound daily on average daily balances when you carry a balance past the grace period), **revolving HELOCs**, and **investment portfolios**. Always favor compounding when saving or investing.
* **Beware Precomputed & Rule of 78s Contracts:** Some subprime auto dealers write precomputed contracts where paying off early yields smaller rebates than true simple interest. Under 15 U.S.C. § 1615, the **Rule of 78s** is prohibited on consumer loans exceeding 61 months, and the **Truth in Lending Act (Regulation Z)** mandates transparent **APR** disclosure so borrowers can compare contracts apples-to-apples.
* **Check Day-Count Clauses (`365` vs. `360`):** Commercial business lines of credit frequently quote **Actual/360**, multiplying your daily interest factor by `1/360` across 365 calendar days—adding an invisible `1.39%` surcharge on top of the stated rate.

Verify your exact linear interest cost, check lender disclosures before signing promissory notes, and model short-term payment savings in our [Simple Interest Calculator](/en/calculators/simple-interest-calculator).
