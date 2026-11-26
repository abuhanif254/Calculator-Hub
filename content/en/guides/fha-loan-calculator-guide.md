---
title: "The Ultimate Guide to FHA Loans: Requirements and Calculations"
description: "Learn how FHA loans work, 2026 loan limits and credit thresholds, how Upfront and Annual MIP affect total borrowing cost, and how to calculate your PITI + MIP payment."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "fha-loan-calculator"
relatedType: "calculator"
faqs:
  - question: "What are the 2026 FHA loan limits for a single-family home?"
    answer: "For 2026, the FHA baseline floor limit for a 1-unit property in standard-cost counties is $541,287 (65% of the $832,750 FHFA conforming baseline). In high-cost counties, the FHA ceiling rises to $1,249,125, with special statutory exceptions up to $1,873,675 in Alaska, Hawaii, Guam, and the U.S. Virgin Islands."
  - question: "How does Upfront MIP change my FHA loan balance and monthly payment?"
    answer: "The FHA charges a mandatory 1.75% Upfront Mortgage Insurance Premium (UFMIP) on the base loan amount. Most borrowers roll UFMIP into their principal balance rather than paying it in cash at closing, increasing both the amortized Principal and Interest payment and initial Loan-to-Value ratio."
  - question: "When can I cancel FHA Annual MIP without refinancing?"
    answer: "If your down payment is less than 10% (LTV above 90%), FHA Annual MIP remains active for the entire life of the loan. Only borrowers who put 10% or more down at origination qualify to have Annual MIP automatically removed after 11 years."
  - question: "What credit score and Debt-to-Income (DTI) ratio do FHA lenders require?"
    answer: "FHA guidelines permit a 3.5% down payment with a minimum FICO score of 580, or a 10% down payment for scores between 500 and 579. Standard front-end/back-end DTI caps sit at 31%/43%, though Automated Underwriting System (AUS) approvals often allow back-end DTI ratios up to 50%–56.9% with compensating factors."
  - question: "Are FHA loans limited to first-time homebuyers?"
    answer: "No. Repeat buyers can use FHA financing as long as the property will serve as their primary residence within 60 days of closing and they generally hold no more than one active FHA-insured mortgage at a time."
---

A Federal Housing Administration (FHA) loan allows buyers to finance up to `96.5%` of a primary residence's purchase price (`3.5%` down payment) with a credit score of `580` or higher. Because the federal government insures lenders against default, FHA underwriting accommodates lower credit scores and higher Debt-to-Income (DTI) ratios than standard conventional mortgages.

Calculating an FHA mortgage requires more than standard Principal and Interest (P&I) amortization. Every FHA loan includes two Mortgage Insurance Premium (MIP) layers—a `1.75%` Upfront MIP typically financed into the loan balance, plus an Annual MIP billed monthly—alongside escrowed property taxes and homeowners insurance. Model your exact monthly obligation with our [FHA Loan Calculator](/en/calculators/fha-loan-calculator).

## FHA Core Qualification Rules and 2026 Loan Limits

HUD sets four baseline eligibility requirements for FHA-insured mortgages:

* **Credit Score and Down Payment:** A `580+` FICO score qualifies for `3.5%` down (`96.5%` Loan-to-Value, or LTV). Scores from `500` to `579` require `10%` down (`90%` LTV), while scores under `500` are ineligible.
* **2026 County Loan Limits:** Anchored to the 2026 FHFA conforming baseline of `$832,750`, the 1-unit FHA floor is **$541,287** in standard counties and reaches **$1,249,125** in high-cost metros (`$1,873,675` in Alaska, Hawaii, Guam, and the U.S. Virgin Islands). Owner-occupied `2–4` unit properties scale higher, starting at `$693,050` (2-unit floor) to `$1,041,125` (4-unit floor).
* **Debt-to-Income (DTI) Ratios:** Manual underwriting caps housing (front-end) DTI at `31%` and total monthly debt (back-end) DTI at `43%`. Automated Underwriting System (AUS) approvals frequently permit back-end DTI ratios up to `50%–56.9%` with strong reserves.
* **Occupancy and Property Standards:** Borrowers must occupy the home as a primary residence within `60` days of closing, and the property must clear an FHA safety and structural appraisal.

## Exact FHA Payment and MIP Formulas

FHA amortization applies interest to the **Base Loan plus Financed Upfront MIP**, while Annual MIP is assessed strictly on the **Base Loan Amount**:

```text
Base Loan Amount       = Purchase Price × (1 − Down Payment %)
Financed Upfront MIP   = Base Loan Amount × 0.0175
Total Loan Principal P = Base Loan Amount + Financed Upfront MIP
Monthly P&I            = P × [r(1 + r)^n] / [(1 + r)^n − 1]
Monthly Annual MIP     = (Base Loan Amount × Annual MIP Rate) ÷ 12
Total Payment (PITI)   = Monthly P&I + Monthly Tax + Monthly Insurance + Monthly Annual MIP
```

Here `r = Annual Interest Rate ÷ 12` and `n = Loan Term × 12`. For 30-year loans at or below `$726,200`, HUD charges `0.55%` Annual MIP above `95%` LTV (`3.5%` down) and `0.50%` at `95%` LTV or lower (`5%+` down).

## Step-by-Step Worked Example: $400,000 Purchase at 3.5% Down

Assume a **$400,000** home purchase with **3.5% down** (`$14,000`), a **6.25% fixed rate** over **30 years** (`n = 360`), **1.20%** annual property taxes (`$4,800/year`), and **$1,800/year** homeowners insurance:

1. **Base Loan Amount:** `$400,000 × 0.965 = $386,000.00`.
2. **Financed Upfront MIP (1.75%):** `$386,000 × 0.0175 = $6,755.00`.
3. **Total Financed Principal (P):** `$386,000 + $6,755 = $392,755.00`.
4. **Monthly Rate (r):** `0.0625 ÷ 12 = 0.005208333`.
5. **Monthly P&I:** `$392,755 × [0.005208333 × (1.005208333)^360] ÷ [(1.005208333)^360 − 1] = $2,418.26`.
6. **Monthly Annual MIP (0.55%):** `($386,000 × 0.0055) ÷ 12 = $176.92`.
7. **Monthly Tax & Insurance Escrow:** `($4,800 ÷ 12) + ($1,800 ÷ 12) = $550.00`.
8. **Total Monthly Payment (PITI + MIP):** `$2,418.26 + $176.92 + $550.00 = $3,145.18`.

Financing the `$6,755` UFMIP adds `$41.59/month` to P&I, and putting under `10%` down locks in the `$176.92/month` Annual MIP for all `360` months unless refinanced.

## FHA Down Payment and Term Scenario Benchmarks

The table compares P&I and MIP on a **$400,000 purchase at 6.25% APR** across six down-payment and term combinations (excluding taxes and insurance):

| Scenario | Base Loan | Financed UFMIP | Annual MIP | Monthly P&I | Monthly MIP | Combined P&I + MIP | MIP Duration |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **3.5% Down (30-Yr)** | $386,000 | $6,755 | 0.55% | $2,418.26 | $176.92 | **$2,595.18** | Life of loan |
| **5.0% Down (30-Yr)** | $380,000 | $6,650 | 0.50% | $2,380.67 | $158.33 | **$2,539.00** | Life of loan |
| **10.0% Down (30-Yr)** | $360,000 | $6,300 | 0.50% | $2,255.37 | $150.00 | **$2,405.37** | 11 years |
| **3.5% Down (15-Yr)** | $386,000 | $6,755 | 0.40% | $3,367.57 | $128.67 | **$3,496.24** | Life of loan |
| **5.0% Down (15-Yr)** | $380,000 | $6,650 | 0.40% | $3,315.23 | $126.67 | **$3,441.90** | Life of loan |
| **10.0% Down (15-Yr)** | $360,000 | $6,300 | 0.15% | $3,140.74 | $45.00 | **$3,185.74** | 11 years |

## Real-World Strategy and Common Borrowing Pitfalls

* **FHA vs. Conventional Break-Even:** Borrowers with `720+` FICO scores often access conventional `3%–5%` down loans with `0.25%–0.45%` PMI, zero upfront fee, and automatic PMI removal at `78%` LTV. Compare both options in our [Mortgage Calculator](/en/calculators/mortgage-calculator) before accepting FHA's `1.75%` UFMIP.
* **The Refinance Exit Strategy:** Buyers using FHA's `3.5%` down option to enter the market sooner often refinance into a conventional mortgage once equity reaches `20%` (`80%` LTV), permanently eliminating lifetime Annual MIP.
* **House-Hacking 2–4 Unit Buildings:** FHA allows `3.5%` down on owner-occupied duplexes, triplexes, and fourplexes, though `3–4` unit properties must pass FHA's **Self-Sufficiency Test** (`75%` of total gross market rent must equal or exceed PITI + MIP).
* **Underestimating Closing Cash:** Beyond the `3.5%` down payment, buyers still face `2%–5%` in closing costs and prepaid escrow reserves, though FHA permits sellers to credit up to `6%` of the purchase price toward closing expenses.
