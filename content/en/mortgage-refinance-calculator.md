---
title: "Mortgage Refinance Calculator"
description: "Calculate your mortgage refinance break-even point, monthly payment savings, and lifetime interest impact. Compare APR drops, closing costs, and term resets."
faqs:
  - question: "How much does an interest rate need to drop for a mortgage refinance to make sense?"
    answer: "Modern refinancing depends on your break-even horizon rather than an arbitrary 1% rule. On a $350,000 balance, even a 0.75% APR drop can pay back $5,000 in closing costs within 30 months, whereas a 1.50% drop on a $120,000 loan may take far longer if fixed title and origination fees stay high."
  - question: "What is the term reset trap in mortgage refinancing?"
    answer: "The term reset trap occurs when you replace a seasoned loan—such as a 30-year mortgage with 22 or 25 years left—with a brand-new 30-year loan. Your monthly payment falls sharply, creating the illusion of savings, while extra years of front-loaded interest can wipe out the rate reduction entirely."
  - question: "What closing costs and notary fees should I include in the break-even formula?"
    answer: "Include only true transaction fees: lender origination and underwriting charges, discount points, appraisal, credit report, title search, lender title insurance, and government recording or European notary fees. Exclude prepaid property taxes, homeowners insurance escrow deposits, and daily per-diem interest, which you owe regardless of refinancing."
  - question: "Is a no-closing-cost refinance actually free?"
    answer: "No. Lenders fund no-closing-cost refinances either by rolling fees into a higher loan principal or by charging a higher note rate (typically 0.25% to 0.50% above par) to generate a lender credit. It lowers upfront cash and eliminates break-even risk if you move soon, but costs more over the long run."
  - question: "How do CFPB disclosures protect borrowers during a refinance?"
    answer: "Under the CFPB TILA-RESPA Integrated Disclosure (TRID) rules, lenders must deliver a standardized Loan Estimate within three business days of application and a Closing Disclosure at least three business days before signing. Comparing Total Interest Percentage (TIP), APR, and Section A origination charges side by side prevents hidden fee inflation."
---

Refinancing a mortgage replaces your existing home loan with a new note carrying a different interest rate, amortization schedule, or principal balance. The single most reliable decision metric is your **break-even point**: the exact number of months it takes for your monthly principal-and-interest savings to recover the upfront closing costs required to originate the new loan.

If you plan to keep the property and hold the new mortgage past the break-even month without resetting your payoff clock unnecessarily, refinancing generates net positive wealth. If you expect to sell, pay off the home, or refinance again before crossing that threshold—or if extending back to a fresh 30-year term adds more interest than the lower APR saves—refinancing destroys value despite lower monthly payments.

## Break-Even Formula and CFPB Disclosure Methodology

A rigorous refinance evaluation pairs monthly cash-flow math with full-term amortization under **CFPB Truth in Lending Act (TILA)** and **TRID** standards:

```
Break-Even Months = Refinance Closing Costs ÷ (Old Monthly P&I − New Monthly P&I)
Monthly P&I = P × [ r(1 + r)^n ] ÷ [ (1 + r)^n − 1 ]
Net Lifetime Savings = (Old Remaining P&I Total − New Total P&I) − Closing Costs
```

- **Refinance Closing Costs:** Total non-recurring transaction expenses shown on your CFPB **Loan Estimate** (Boxes A, B, and C: origination fees, discount points, appraisal, title insurance, and recording fees—or statutory notary and land-registry fees in civil-law markets like Germany, France, and Spain). Typical US refinance closing costs run **2% to 5%** of loan principal.
- **Old vs. New Monthly P&I:** Contractual principal and interest only. Exclude property taxes and homeowners insurance escrows because tax assessments and insurance premiums do not change when you switch lenders.
- **APR vs. Note Rate:** Under CFPB Regulation Z, the **Annual Percentage Rate (APR)** amortizes lender fees, origination charges, and discount points into the effective borrowing cost, making it far more accurate than the headline note rate when comparing competing lender quotes.
- **Prepaid Items Exclusion:** Daily prepaid interest and initial escrow reserves are cash-flow timing transfers rather than transaction costs, because your existing servicer refunds your old escrow balance within 20 to 30 days of payoff.

## Step-by-Step Worked Example: $350,000 Balance at 7.00% vs. 5.75%

Consider a homeowner carrying a **$350,000** remaining principal balance at a **7.00%** fixed note rate with **25 years (300 months)** left on their current mortgage. A lender quotes **5.75%** with **$7,500** in total closing costs (about **2.14%** of principal). Compare keeping the **25-year** remaining timeline against resetting to a new **30-year (360-month)** loan.

1. **Calculate Current Monthly P&I (`7.00%`, `300` months):** Using monthly rate `r = 0.07 ÷ 12 = 0.00583333`, the current monthly payment is **$2,473.73**. Over the remaining 300 months, total payments equal `$742,119.00`, meaning **$392,119.00** in remaining interest.
2. **Calculate Matched-Term Refinance P&I (`5.75%`, `300` months):** Using `r = 0.0575 ÷ 12 = 0.00479167`, a matched 25-year refinance lowers the monthly payment to **$2,201.87**.
3. **Compute Break-Even Horizon:** Monthly savings equal `$2,473.73 − $2,201.87 = $271.86`. Dividing `$7,500 ÷ $271.86` yields **27.6 months** (roughly 2 years and 4 months).
4. **Verify Lifetime Interest Savings:** Over 300 months at `5.75%`, total payments drop to `$660,561.00`, or **$310,561.00** in total interest. Subtracting the `$7,500` closing costs leaves **$74,058.00** in net lifetime savings.
5. **Test the Term Reset Trap (`5.75%`, `360` months):** Extending back to 30 years cuts the payment further to **$2,042.50** (`$431.23/month` lower, 17.4-month cash-flow break-even). However, 360 payments total `$735,300.00`—generating **$385,300.00** in interest. Adding the `$7,500` closing costs brings total cost to `$742,800.00`, resulting in a **$681.00 net loss** compared to never refinancing at all.

## Refinance Scenario Benchmarks on a $350,000 Balance

The table below benchmarks five realistic refinance structures against the same **$350,000** baseline loan (`7.00%`, 25 years remaining, `$2,473.73/month`, `$392,119` remaining interest), assuming **$7,500** in standard closing costs unless noted:

| Refinance Scenario | New Rate | New Term | New Monthly P&I | Monthly Savings | Break-Even Months | Lifetime Net Savings (After Fees) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Matched 25-Yr (-0.75%)** | 6.25% | 25 yrs | $2,308.84 | $164.89 | 45.5 mo | $41,967 |
| **Matched 25-Yr (-1.25%)** | 5.75% | 25 yrs | $2,201.87 | $271.86 | 27.6 mo | $74,058 |
| **Term Reset 30-Yr (-1.25%)** | 5.75% | 30 yrs | $2,042.50 | $431.23 | 17.4 mo* | -$681 |
| **Accelerated 20-Yr (-1.50%)** | 5.50% | 20 yrs | $2,407.61 | $66.12 | 113.4 mo* | $156,793 |
| **Zero-Cost 25-Yr (-0.875%)** | 6.125% | 25 yrs | $2,281.79 | $191.94 | Immediate | $57,582 |
| **Deep Drop 15-Yr (-1.75%)** | 5.25% | 15 yrs | $2,813.57 | -$339.84 | N/A | $228,176 |

*Cash-flow break-even ignores extra amortization years; accelerated 15- and 20-year loans build equity immediately despite higher or modestly lower monthly payments.*

## Strategic Insights, Common Mistakes, and Regulatory Caveats

- **Avoid the Term Reset Trap:** Whenever you refinance into a 30-year note for cash-flow flexibility, set an automatic extra principal payment equal to the monthly savings (or match your remaining months directly via a custom-term lender) so you capture the lower APR without stretching debt into retirement.
- **Never Roll Closing Costs Blindly Into Principal:** Financing `$7,500` of fees into a `$357,500` loan means you pay compound interest on your closing costs for decades. At `5.75%` over 25 years, that `$7,500` fee balance generates an extra **$6,655** in interest charges.
- **Evaluate PMI Elimination and LTV Thresholds:** If home appreciation or principal paydown has pushed your loan-to-value (LTV) ratio to **80% or below**, refinancing out of an FHA loan (which often carries permanent Mortgage Insurance Premiums) or a high-LTV conventional loan can add `$150–$300` in monthly insurance savings to your break-even calculation.
- **Watch Prepayment Penalties and European Notary Costs:** Standard U.S. Fannie Mae, Freddie Mac, and FHA mortgages carry zero prepayment penalties, whereas European fixed-rate mortgages may impose statutory early-repayment fees (*Vorfälligkeitsentschädigung* in Germany or *indemnités de remboursement anticipé* capped at 6 months' interest / 3% principal in France) plus notary deed registration fees.
- **Tax and Financial Disclaimer:** Mortgage interest deductibility varies by jurisdiction and filing status (for example, the U.S. `$750,000` acquisition-debt cap under IRC Section 163(h) when itemizing above the 2026 standard deduction). Figures shown are educational estimates and do not constitute mortgage underwriting, legal, or tax advice.
