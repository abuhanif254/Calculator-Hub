---
title: "Cap Rate Calculator"
description: "Calculate real estate capitalization rate, Net Operating Income (NOI), and unlevered rental yield. Compare Class A, B, and C benchmarks plus GRM vs. cap rate."
faqs:
  - question: "What is considered a good cap rate for rental real estate?"
    answer: "A good cap rate depends on asset class, market liquidity, and risk rather than a universal target. Core Class A urban multifamily properties often trade at 4.25% to 5.25%, stabilized suburban Class B assets trade around 5.50% to 6.75%, and higher-risk Class C workforce or value-add properties typically require 7.00% to 8.75%."
  - question: "Why are mortgage payments excluded from Net Operating Income (NOI)?"
    answer: "Cap rate measures the unlevered yield of the physical asset itself, independent of how an individual buyer finances the acquisition. Excluding principal and interest payments ensures an all-cash buyer, a 65% LTV borrower, and an 80% LTV investor arrive at the exact same NOI when valuing the same property."
  - question: "How is cap rate different from Gross Rent Multiplier (GRM)?"
    answer: "Gross Rent Multiplier (Purchase Price divided by Gross Scheduled Annual Rent) ignores vacancy, property taxes, insurance, management, and repairs. Cap rate uses Net Operating Income after all operating expenses, making it vastly superior when comparing properties with different expense structures, tax rates, or landlord-paid utility bills."
  - question: "Should capital expenditures (CapEx) be subtracted when calculating NOI?"
    answer: "Under Appraisal Institute and institutional commercial underwriting standards, routine repairs and maintenance belong in operating expenses, whereas major structural replacements (roofs, HVAC chillers, parking lot repaving) are below-the-line CapEx items. However, conservative investors often deduct a $250 to $500 per-unit replacement reserve before pricing a deal."
  - question: "When does a low cap rate signal overvaluation versus lower risk?"
    answer: "A compressed cap rate reflects lower perceived risk and stronger rent-growth expectations—such as newer Class A assets in supply-constrained coastal or sunbelt corridors. It signals overvaluation only when the cap rate falls below your cost of debt (negative leverage) without credible near-term NOI expansion to close the spread."
---

The **capitalization rate (cap rate)** measures a real estate property's annual **unlevered rental yield**—the percentage return the asset generates each year assuming you paid 100% cash with zero mortgage debt. Institutional appraisers, commercial brokers, and residential investors rely on cap rate to strip away financing differences and compare disparate properties on a strict apples-to-apples income basis.

Because cap rate sits inversely to valuation (`Purchase Price = NOI ÷ Cap Rate`), small shifts in operating income or market cap rates move asset prices dramatically. A `$10,000` permanent increase in Net Operating Income at a `6.25%` market cap rate adds **$160,000** to a building's implied market value, making disciplined NOI accounting essential before submitting any offer.

## Cap Rate Formula, NOI Exclusions, and Appraisal Standards

Under **USPAP (Uniform Standards of Professional Appraisal Practice)** and **Appraisal Institute** income-approach conventions, cap rate is derived in two sequential steps:

```
Effective Gross Rent (EGI) = Gross Potential Rent − Vacancy & Credit Loss + Other Income
Net Operating Income (NOI) = Effective Gross Rent − Operating Expenses (OpEx)
Cap Rate (%) = (NOI ÷ Purchase Price) × 100
Gross Rent Multiplier (GRM) = Purchase Price ÷ Gross Potential Annual Rent
```

- **Effective Gross Income (EGI):** Scheduled market rent across all units, minus realistic economic vacancy and bad-debt loss (typically **4% to 8%** for stabilized multifamily), plus ancillary income from parking, storage, pet fees, or laundry.
- **Operating Expenses (OpEx):** Recurring costs required to keep the building operating—property taxes, hazard and liability insurance, property management (typically **5% to 8%** of EGI for small multifamily), routine maintenance, turns, landscaping, and landlord-paid utilities.
- **Strict NOI Exclusions:** Never subtract **mortgage debt service** (principal and interest), **IRS MACRS depreciation** (27.5 years residential / 39 years commercial), **personal or corporate income taxes**, **loan origination points**, or **one-time capital improvements** from NOI. Including debt or tax brackets corrupts unlevered comparability.
- **Cap Rate vs. Cash-on-Cash Return:** Cap rate measures asset-level unlevered return on total purchase price. Cash-on-Cash return measures *levered* pre-tax cash flow (`NOI − Annual Debt Service`) divided by actual equity invested (down payment plus closing costs).

## Step-by-Step Worked Example: 12-Unit Class B Multifamily Acquisition

Suppose you are underwriting a stabilized **12-unit Class B apartment building** listed at **$2,400,000** (`$200,000` per unit) with average market rents of `$1,750/month`. Follow the underwriting sequence carefully:

1. **Compute Gross Potential Rent (GPR):** `12 units × $1,750 × 12 months = $252,000` per year.
2. **Adjust for Vacancy and Ancillary Income:** Subtract a **5% vacancy allowance** (`$12,600`) and add **$6,600** in annual covered-parking and laundry fees: `EGI = $252,000 − $12,600 + $6,600 = $246,000`.
3. **Total Operating Expenses (OpEx):** Sum annual property taxes (`$31,200`), commercial insurance (`$14,400`), 6% off-site management (`$14,760`), routine maintenance and unit turns (`$18,000`), and common utilities/grounds (`$14,040`). Total OpEx equals **$92,400** (an **OpEx ratio of 37.56%** of EGI).
4. **Calculate Net Operating Income (NOI):** `NOI = $246,000 − $92,400 = $153,600`.
5. **Compute Cap Rate and GRM:**
   - `Cap Rate = ($153,600 ÷ $2,400,000) × 100 = 6.40%`
   - `GRM = $2,400,000 ÷ $252,000 = 9.52x`
6. **Check Leverage Spread (Sensitivity Check):** If financed at 70% LTV (`$1,680,000` loan at 6.50% over 30 years), annual debt service equals `$127,424`, leaving `$26,176` in pre-tax levered cash flow on `$720,000` down (**3.64% Cash-on-Cash**)—confirming slight **negative leverage** because the `6.40%` cap rate sits below the `7.58%` annual loan constant.

## Real Estate Cap Rate Benchmarks by Asset Class (2026)

Institutional valuation spreads reflect tenant credit quality, building vintage, CapEx intensity, and local rent growth expectations across North American and European metro markets:

| Property Class & Sector | Typical Cap Rate Range | Typical OpEx Ratio (% of EGI) | Typical GRM Range | Risk & CapEx Profile |
| :--- | :--- | :--- | :--- | :--- |
| **Class A Urban Multifamily** | 4.25% – 5.25% | 32% – 38% | 12.0x – 15.5x | Modern build, prime location, low near-term CapEx |
| **Class B Suburban Multifamily** | 5.50% – 6.75% | 36% – 44% | 9.0x – 12.0x | 15–30 yr vintage, middle-income tenants, value-add upside |
| **Class C Workforce / Value-Add** | 7.00% – 8.75% | 45% – 55% | 6.5x – 9.0x | Older systems, higher turnover, heavy CapEx reserves |
| **Single-Family Rental (SFR)** | 5.00% – 6.50% | 30% – 40% | 10.5x – 14.0x | No economies of scale; exit pricing driven by owner-occupants |
| **Industrial / Logistics (NNN)** | 5.25% – 6.50% | 5% – 15% (Net) | 13.0x – 16.5x | Tenant reimburses taxes, insurance, and maintenance |
| **Neighborhood Strip Retail** | 6.50% – 8.00% | 20% – 30% | 8.5x – 11.5x | Sensitive to e-commerce disruption and tenant credit |

## Strategic Insights, Common Mistakes, and Valuation Caveats

- **Beware Seller Pro-Forma Cap Rates:** Listing brokers frequently market an *offering cap rate* built on projected market rents, 2% vacancy, and last year's property taxes. Always re-underwrite using **trailing 12-month (T-12)** actual expenses and reset property taxes to the post-sale reassessed purchase price.
- **Avoid the Negative Leverage Trap:** When your mortgage interest rate exceeds the property's going-in cap rate (`Cap Rate < Loan Constant`), adding debt reduces your Cash-on-Cash return below the unlevered yield. Only accept negative leverage if verifiable below-market rents or expense cuts lift your stabilized yield above your debt cost within 12–24 months.
- **Account for Going-In vs. Exit Cap Rate Expansion:** Conservative underwriting assumes your **exit cap rate** at Year 5 or Year 7 expands by **25 to 75 basis points** above your entry cap rate to reflect an aging physical asset and potential interest-rate normalization.
- **Verify Triple-Net (NNN) vs. Gross Lease Structures:** Never compare a NNN industrial cap rate (where tenants reimburse property taxes, insurance, and common-area maintenance) directly against a modified-gross residential cap rate without adjusting for vacancy risk and landlord structural obligations.
- **Investment Disclaimer:** Cap rate projections model static Year-1 income snapshots and exclude financing amortization, tax depreciation, closing fees, and capital call risks. Always consult a licensed commercial appraiser, CPA, or real estate counsel before committing capital.
