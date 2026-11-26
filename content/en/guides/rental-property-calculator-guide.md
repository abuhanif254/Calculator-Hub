---
title: "The Math of Real Estate: How to Analyze a Rental Property"
description: "Learn how to calculate Cash on Cash Return, the 1% Rule, Net Operating Income, and use our Rental Property Calculator to evaluate investments."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "rental-property-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does Net Operating Income (NOI) exclude the mortgage payment?"
    answer: "NOI measures a property's unleveraged operational profitability independent of how the buyer finances the purchase. Excluding Principal and Interest (P&I) lets investors compare two properties fairly using Capitalization Rate (Cap Rate = NOI / Purchase Price) whether a buyer pays all cash or uses an 80% LTV mortgage."
  - question: "What is the difference between Cap Rate and Cash-on-Cash Return?"
    answer: "Cap Rate divides annual Net Operating Income by the property's purchase price, reflecting the unleveraged yield as if purchased with cash. Cash-on-Cash Return divides annual pre-tax cash flow (NOI minus annual mortgage debt service) by your actual out-of-pocket cash invested (down payment, closing costs, and immediate rehab), measuring the return on your equity."
  - question: "Does the 1% Rule still work at 6.5% to 7% mortgage rates?"
    answer: "The 1% Rule (monthly rent equal to at least 1% of purchase price) was calibrated when mortgage rates hovered near 4% to 5%. At 6.75% interest rates and higher insurance premiums, properties below 1.0% often generate razor-thin or negative cash flow with 20% down, making a full NOI, DSCR, and vacancy stress test mandatory rather than relying on rules of thumb."
  - question: "What expenses are included in real estate operating expenses?"
    answer: "True operating expenses include property taxes, landlord hazard insurance, repairs and maintenance, a Capital Expenditures (CapEx) reserve for big-ticket replacements (roof, HVAC, water heater), property management fees (typically 8% to 10% of collected rent), HOA dues, and any owner-paid utilities. Mortgage P&I and tax depreciation are excluded from NOI."
  - question: "What Debt Service Coverage Ratio (DSCR) do rental lenders require?"
    answer: "Investment property DSCR lenders typically require a minimum ratio of 1.20 to 1.25—meaning Net Operating Income must be 20% to 25% higher than annual mortgage payments—though some non-QM lenders accept 1.00 to 1.10 at higher interest rates or larger down payments. A DSCR below 1.00 signals negative cash flow before tax benefits."
---

Evaluating a residential rental property requires stripping away appreciation hype and underwriting the asset on four sequential cash metrics: **Effective Gross Income (EGI)**, **Net Operating Income (NOI)**, **Annual Debt Service (ADS)**, and **Cash-on-Cash Return (CoC)**. Whether a deal builds long-term equity or drains your liquidity every month depends on whether collected rent comfortably exceeds fixed operating costs, capital reserves, and mortgage debt service.

Quick screening filters such as the 1% Rule or 50% Expense Rule only narrow a listing feed; final offer pricing demands line-item underwriting across vacancy, property taxes, insurance, maintenance, and financing terms. Stress-test purchase prices, down payments, and expense ratios in our [Rental Property Calculator](/en/calculators/rental-property-calculator).

## Core Rental Underwriting Formulas

Institutional and individual landlords evaluate deals using standardized formulas that separate property-level performance from financing structure:

```text
Gross Scheduled Rent (GSR) = Monthly Rent × 12
Effective Gross Income     = GSR × (1 − Vacancy Rate) + Other Income
Net Operating Income (NOI) = EGI − Operating Expenses
Capitalization Rate        = (NOI / Purchase Price) × 100%
Annual Debt Service (ADS)  = Monthly Mortgage P&I × 12
Pre-Tax Cash Flow          = NOI − ADS
Debt Service Coverage      = NOI / ADS
Total Cash Invested        = Down Payment + Closing Costs + Initial Rehab
Cash-on-Cash Return (CoC)  = (Pre-Tax Cash Flow / Total Cash Invested) × 100%
```

Where:
- `Vacancy Rate` accounts for turnover gaps and non-payment (typically `5%` to `8%` for stabilized single-family or small multifamily rentals).
- `Operating Expenses` include property taxes, landlord insurance, routine repairs, CapEx reserves, property management (`8%–10%` of EGI), HOA fees, and landlord-paid utilities—never mortgage Principal & Interest (`P&I`).
- `Monthly Mortgage P&I` uses the standard amortizing payment formula on the financed loan amount (`Purchase Price − Down Payment`).

## Step-by-Step Worked Example: Underwriting a $320,000 Rental

Consider a single-family rental listed at **$320,000** that rents for **$2,850/month**. You put **25% down ($80,000)**, finance **$240,000** at **6.75%** over 30 years (`360` months), pay **3% closing costs ($9,600)**, and budget **$10,400** for immediate make-ready repairs—putting your **Total Cash Invested** at **$100,000**.

1. **Screen with the 1% Rule:**
   `$2,850 / $320,000 = 0.89%`. Because it falls below `1.00%`, you know margins will be tight at `6.75%` debt cost.
2. **Calculate Effective Gross Income (EGI):**
   Gross Scheduled Rent = `$2,850 × 12 = $34,200`. Applying a `5%` vacancy allowance (`$1,710`) leaves **EGI = $32,490**.
3. **Subtract Operating Expenses to find NOI:**
   - Property taxes: `$4,200`
   - Landlord insurance: `$1,800`
   - Repairs & CapEx reserve (10% of GSR): `$3,420`
   - Property management (8% of EGI): `$2,599.20`
   - Administrative / lawn / misc: `$470.80`
   Total Operating Expenses = **$12,490** (`38.4%` of EGI). Subtracting from EGI yields **NOI = $20,000/year** (`$1,666.67/month`) and a **6.25% Cap Rate** (`$20,000 / $320,000`).
4. **Calculate Debt Service, Cash Flow, DSCR, and CoC:**
   At `6.75%` for 30 years, monthly P&I on `$240,000` is **$1,556.64**, or **$18,679.63/year** (`ADS`).
   - **Pre-Tax Cash Flow:** `$20,000 − $18,679.63 = $1,320.37/year` (**$110.03/month**).
   - **DSCR:** `$20,000 / $18,679.63 = 1.07` (below the `1.20–1.25` threshold most commercial DSCR lenders prefer).
   - **Cash-on-Cash Return:** `$1,320.37 / $100,000 = 1.32%`.

This calculation exposes why the `0.89%` rent-to-price ratio struggles at `6.75%` interest: positive leverage only occurs when the Cap Rate (`6.25%`) exceeds the borrowing cost (`6.75%`) plus amortization drag. Here, borrowing at `6.75%` on a `6.25%` cap-rate asset produces **negative leverage**, compressing equity cash yield to `1.32%` even though the property barely stays cash-flow positive.

## Scenario Comparison: How Financing and Operations Shift Returns

Using the same **$320,000** baseline asset (`$9,600` financed closing costs / `$4,500` cash closing costs, `$10,400` make-ready), the table below shows how down payment, management structure, vacancy shocks, and rent level transform deal viability.

| Scenario | EGI | NOI | Cap Rate | Annual Debt Service | Pre-Tax Cash Flow | Cash Invested | Cash-on-Cash | DSCR |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Base Case (25% Down, 6.75%) | $32,490 | $20,000 | 6.25% | $18,680 | $1,320 | $100,000 | 1.32% | 1.07 |
| 20% Down (Higher Leverage) | $32,490 | $20,000 | 6.25% | $19,925 | $75 | $84,000 | 0.09% | 1.00 |
| Self-Managed (0% PM Fee) | $32,490 | $22,599 | 7.06% | $18,680 | $3,920 | $100,000 | 3.92% | 1.21 |
| High Vacancy Stress (10%) | $30,780 | $18,427 | 5.76% | $18,680 | -$253 | $100,000 | -0.25% | 0.99 |
| 1% Rule Rent ($3,200/mo) | $36,480 | $23,251 | 7.27% | $18,680 | $4,571 | $100,000 | 4.57% | 1.24 |
| All-Cash Purchase (0% Debt) | $32,490 | $20,000 | 6.25% | $0 | $20,000 | $334,900 | 5.97% | N/A |

## Real-World Pitfalls, Taxes, and Underwriting Safeguards

When moving from calculator projections to a binding purchase contract, protect your downside against four recurring underwriting mistakes:

- **Property tax reassessment upon sale:** Listing sites display the seller's historical property taxes, which are often capped under homestead exemptions or Proposition 13-style assessment limits. Always calculate property taxes using your **new purchase price** multiplied by the local millage rate; a sudden `$2,400/year` reassessment wipes out `$200/month` of projected cash flow overnight.
- **Omitting Capital Expenditures (CapEx):** Treating cash flow without setting aside `5%` to `8%` of gross rent for long-lived components creates phantom yield. A single `$12,000` roof replacement or `$7,500` HVAC failure erases years of `$110/month` net surplus.
- **Self-management illusion:** Zeroing out the `8%–10%` management fee inflates Cash-on-Cash Return on paper (`3.92%` vs. `1.32%`), but conflates **labor income** with **investment yield**. Always underwrite with management included so the deal still works if you relocate or scale.
- **Tax depreciation and passive loss rules:** Under IRS rules, residential rental structures (excluding land value) depreciate over **27.5 years**, frequently shielding early-year cash flow from income tax. However, passive activity loss deductions phase out above `$100,000`–`$150,000` Modified Adjusted Gross Income unless you qualify as a Real Estate Professional, and accumulated depreciation is subject to **Section 1250 recapture** (up to `25%`) upon sale unless deferred via a **Section 1031 exchange**.
