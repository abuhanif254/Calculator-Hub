---
title: "Canadian Mortgages vs. US Mortgages: The Crucial Differences"
description: "Understand semi-annual compounding, 5-year renewal cycles, CMHC default insurance, and OSFI stress tests, and compute exact payments with our Canadian Mortgage Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "canadian-mortgage-calculator"
faqs:
  - question: "Why do Canadian fixed-rate mortgages cost slightly less per month than US mortgages at the same quoted rate?"
    answer: "Under Section 6 of Canada's Interest Act, fixed-rate mortgages must be compounded semi-annually (twice per year) rather than monthly. At a 5.00% quoted rate, semi-annual compounding yields a monthly periodic rate of 0.41239% instead of the US monthly rate of 0.41667%, lowering monthly payments by roughly $3.08 per $100,000 borrowed."
  - question: "Do Canadian variable-rate mortgages also use semi-annual compounding?"
    answer: "Not always. Most Canadian variable-rate and adjustable-rate mortgages compound monthly, matching US amortization math, though a few lenders (notably TD) compound variable mortgages semi-annually. Always check your commitment letter's compounding frequency before comparing variable quotes against fixed offers."
  - question: "What happens at the end of a 5-year Canadian mortgage term?"
    answer: "Your amortization schedule resets to a new contract term. You either renew the remaining principal with your existing lender or switch to a new lender at prevailing market rates without paying a prepayment penalty. If rates have risen since origination, your monthly payment jumps immediately at renewal."
  - question: "How does CMHC mortgage default insurance differ from US Private Mortgage Insurance (PMI)?"
    answer: "CMHC insurance is mandatory for down payments below 20% and is charged as a one-time premium of 2.80% to 4.00% of the base loan, typically capitalized directly into the mortgage principal for the entire amortization. US PMI is usually an ongoing monthly fee that automatically cancels once equity reaches 22%."
  - question: "Are Canadian mortgage interest payments tax-deductible like in the US?"
    answer: "No. Interest on a mortgage for a principal residence in Canada is not tax-deductible, whereas US homeowners who itemize deductions can deduct interest on up to $750,000 of qualified acquisition debt. Canadian homeowners can only deduct mortgage interest if the borrowed funds are invested directly to earn taxable income."
---

Applying standard US amortization calculators to a Canadian home purchase produces systematic payment errors, understated equity build, and misleading renewal projections. Under federal law, Canadian fixed-rate mortgages follow **semi-annual compounding**, operate on **1- to 5-year contractual terms** rather than 30-year rate locks, and capitalize **mortgage default insurance** directly into loan principal when down payments fall below 20%.

These structural differences alter both your monthly cash flow and your five-year interest-rate exposure. Use our [Canadian Mortgage Calculator](/en/calculators/canadian-mortgage-calculator) to model semi-annual compounding, CMHC insurance tiers, and accelerated bi-weekly schedules with Canadian-compliant math.

## Semi-Annual Compounding and Amortization Math

The single most important mathematical divergence lies in how lenders convert a quoted annual nominal rate `i` into a monthly periodic interest rate `r_m`. In the United States, fixed-rate mortgages compound monthly, so `r_m = i / 12`. In Canada, Section 6 of the federal **Interest Act** requires fixed-rate mortgages to compound **semi-annually (not in advance)**, even when payments are collected monthly or bi-weekly:

```text
Canadian Effective Annual Rate (EAR) = (1 + i / 2)^2 − 1
Canadian Monthly Periodic Rate (r_m) = (1 + i / 2)^(2 / 12) − 1
US Monthly Periodic Rate (r_us)      = i / 12
Monthly Payment (M)                  = P × [r_m × (1 + r_m)^n] / [(1 + r_m)^n − 1]
```

Where each parameter represents:

* **P (Total Principal):** Purchase price minus down payment, plus any capitalized mortgage default insurance premium.
* **i (Nominal Quoted Rate):** Annual contract rate quoted by the lender (e.g., `0.05` for 5.00%).
* **r_m (Periodic Rate):** Effective interest rate applied each payment period. For bi-weekly payments (26 per year), replace `2 / 12` with `2 / 26`.
* **n (Amortization Periods):** Total number of payments over the full amortization schedule (e.g., `25 × 12 = 300` months).

Because interest compounds twice a year instead of twelve times, a 5.00% Canadian fixed rate produces an **effective annual rate (EAR) of 5.0625%** (`r_m = 0.00412392`), versus a **5.1162% EAR** (`r_us = 0.00416667`) on a 5.00% US mortgage. Under **accelerated bi-weekly payments**, each bi-weekly payment is `M / 2` rather than `M × 12 / 26`. Collecting 26 half-payments equals **13 monthly payments per year**, cutting roughly 3.5 years off a 25-year schedule.

## Step-by-Step Worked Numerical Example

Consider buying a **$700,000** home with **10% down ($70,000)** at a **5.00% quoted fixed rate** over a **25-year amortization (`n = 300`)**:

1. **Base Loan and CMHC Premium:** Base loan is `$700,000 − $70,000 = $630,000`. A 10% down payment triggers the **3.10%** CMHC tier (`$630,000 × 0.031 = $19,530`), bringing total principal to **$649,530**.
2. **Canadian Monthly Periodic Rate:** `r_m = (1 + 0.05 / 2)^(1 / 6) − 1 = 0.00412392`.
3. **Monthly Payment:** `M_can = $649,530 × [0.00412392 × (1.00412392)^300] / [(1.00412392)^300 − 1] = $3,777.70/month`.
4. **US Compounding Comparison:** Using US monthly compounding (`r_us = 0.05 / 12 = 0.00416667`) on the identical `$649,530` principal gives **$3,797.09/month**—overstating payments by **$19.39/month** and 25-year interest by **$5,816.65** (`$489,596.31` vs. `$483,779.66`).
5. **5-Year Renewal and Accelerated Bi-Weekly:** After 60 monthly payments, remaining Canadian principal is **$574,882.81** (`$152,014.74` interest paid). Switching to **accelerated bi-weekly payments of $1,888.85** lowers the 5-year balance to **$553,193.64**, shrinks payoff time to **21.48 years**, and saves **$78,510.25** in total interest.

## Canadian vs. US Scenarios ($700,000 Home, 5.00% Fixed, 25-Year Amortization)

The benchmark table below compares how Canadian down-payment insurance tiers, compounding conventions, and payment frequencies reshape loan principal, monthly cash flow, and five-year renewal balances on the same **$700,000** purchase:

| Scenario (5.00% Rate, 25-Yr Amort.) | Down Payment | Insurance Capitalized | Starting Principal | Periodic Payment | 5-Year Balance | Total 25-Yr Interest |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Canada 5% Down (Monthly)** | $35,000 | $26,600 (4.00%) | $691,600 | $4,022.38 / mo | $612,117.92 | $515,114.02 |
| **Canada 10% Down (Monthly)** | $70,000 | $19,530 (3.10%) | $649,530 | $3,777.70 / mo | $574,882.81 | $483,779.66 |
| **Canada 10% Down (Accel. BW)** | $70,000 | $19,530 (3.10%) | $649,530 | $1,888.85 / 2 wks | $553,193.64 | $405,269.41 |
| **Canada 15% Down (Monthly)** | $105,000 | $16,660 (2.80%) | $611,660 | $3,557.45 / mo | $541,365.02 | $455,573.52 |
| **Canada 20% Down (Semi-Annual)** | $140,000 | $0 (Uninsured) | $560,000 | $3,256.99 / mo | $495,642.04 | $417,096.37 |
| **US 20% Down (Monthly Comp.)** | $140,000 | $0 (No PMI) | $560,000 | $3,273.70 / mo | $496,049.06 | $422,111.27 |

## Regulatory Rules, Prepayment Traps, and Structural Pitfalls

Four Canadian legal and underwriting rules regularly catch cross-border buyers off guard:

* **Renewal Rate Shock and OSFI Stress Test:** Most Canadian mortgages lock rates for 3- or 5-year terms over a 25-year amortization (30 years for eligible first-time buyers and new builds on insured loans). Under **OSFI Guideline B-20**, federally regulated lenders qualify borrowers at the **greater of 5.25% or the contract rate plus 2.00%**. Uninsured switches between lenders must re-pass this test, whereas straight renewals with your existing lender skip it.
* **Severe Prepayment Penalties (IRD):** Unlike US mortgages that allow penalty-free refinancing, closed fixed-rate Canadian mortgages charge the greater of **three months' interest** or the **Interest Rate Differential (IRD)**. Major banks calculate IRD against inflated posted rates rather than discounted contract rates, often creating penalties of 3%–5% of remaining principal.
* **Down Payment Tiers and Provincial Taxes:** Federal rules require 5% down on the first $500,000 and 10% on the slice from $500,000 to $1,500,000; homes at $1,500,000+ require 20% down and cannot obtain CMHC insurance. Ontario, Quebec, Saskatchewan, and Manitoba also charge provincial sales tax on the CMHC premium, payable in cash at closing.
* **Non-Deductible Primary Residence Interest:** Unlike US itemized mortgage interest deductions, primary-residence mortgage interest is not tax-deductible in Canada unless equity is re-borrowed strictly to invest in income-producing assets (the **Smith Manoeuvre**).
