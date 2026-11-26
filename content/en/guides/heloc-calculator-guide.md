---
title: "HELOC Explained: Should You Use Your House as an ATM?"
description: "Understand Home Equity Line of Credit (HELOC) CLTV limits, two-phase payment shock, variable Prime-rate mechanics, and IRS interest tracing rules with our HELOC Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "heloc-calculator"
relatedType: "calculator"
faqs:
  - question: "How do lenders calculate my maximum HELOC credit limit?"
    answer: "Lenders apply a Combined Loan-to-Value (CLTV) ceiling—typically 80% to 85% of your home's appraised value—and subtract your remaining first-mortgage balance. For example, on a $500,000 home with an 80% CLTV cap ($400,000) and a $280,000 primary mortgage, your maximum HELOC limit is $120,000."
  - question: "What causes the HELOC payment shock when the draw period ends?"
    answer: "During a typical 10-year draw period, most HELOCs require only monthly interest on the drawn balance. The day the draw period expires, the account converts to a 10- to 20-year amortizing repayment phase where you must pay both principal and interest—causing required monthly payments to jump by 40% to 90% or more, especially if variable rates rose in the meantime."
  - question: "How are variable HELOC interest rates determined?"
    answer: "Your HELOC APR equals a public benchmark index—almost always the Wall Street Journal Prime Rate—plus a fixed lender margin (such as Prime + 0.50% or +1.25%) based on your credit score and CLTV. Most contracts include periodic adjustment caps and a lifetime interest rate ceiling (commonly 18%), though initial teaser rates expire within 6 to 12 months."
  - question: "Is HELOC interest tax-deductible under federal tax rules?"
    answer: "Under IRC Section 163(h), HELOC interest is deductible only if you itemize deductions and can trace the borrowed funds directly to buying, building, or substantially improving the specific home that secures the line of credit—subject to the $750,000 combined mortgage acquisition debt cap ($375,000 married filing separately). Interest on HELOC funds spent on credit card consolidation, cars, or tuition is not deductible."
  - question: "Should I choose a HELOC, a fixed Home Equity Loan, or a cash-out refinance?"
    answer: "Choose a HELOC when you need staggered, flexible draws for multi-stage renovations and plan to repay principal aggressively. Choose a fixed Home Equity Loan if you need a single lump sum with predictable payments, and reserve a cash-out refinance only when current 30-year mortgage rates are lower than—or close to—your existing first-mortgage rate."
---

A **Home Equity Line of Credit (HELOC)** is a revolving, variable-rate second mortgage that lets you borrow against your home's equity up to a preset **Combined Loan-to-Value (CLTV)** ceiling—typically 80% to 85% of appraised market value minus your primary mortgage balance. Unlike an installment loan, a HELOC separates borrowing into an interest-only **draw period** (commonly 10 years) followed by a fully amortizing **repayment period** (commonly 10 to 20 years).

That two-stage design makes a HELOC cheaper and more flexible than unsecured personal loans or credit cards, yet hazardous for borrowers who treat their home equity as permanent cash flow. If you only pay the interest-only minimum during the draw phase, your principal never declines—creating an abrupt payment shock at reset while placing your residence at foreclosure risk as junior collateral. Model both phases and stress-test rate hikes using our [HELOC Calculator](/en/calculators/heloc-calculator).

## Credit Limit Mechanics, CLTV, and Two-Phase Payment Formulas

Underwriting starts by sizing your available credit line against total property debt, not just your equity in isolation. Lenders compute **Maximum Credit Limit (`L_max`)** from your appraised value (`V`), contractual CLTV cap (`c`), and existing first-mortgage principal (`M_1`):

```text
Maximum HELOC Limit (L_max) = (V × c) − M_1
Effective Variable APR (r)  = Index Rate (WSJ Prime) + Lender Margin
Draw Phase Payment (P_draw) = Balance (B) × (r / 12)
Repayment Payment (P_repay) = B × [r_m × (1 + r_m)^n] / [(1 + r_m)^n − 1]
```

In the repayment equation, `r_m = r / 12` is the monthly interest rate, and `n` is the remaining repayment months (`180` for 15 years or `240` for 20 years). Because a HELOC is open-end revolving credit under Regulation Z, repaid principal during the draw phase becomes available to re-borrow until the draw window closes.

### Variable Rate Architecture and Caps

Unlike a 30-year fixed mortgage, a HELOC adjusts monthly or quarterly when the Federal Reserve shifts short-term rates and banks update Prime. Contracts specify three parameters: an **introductory teaser rate** (6–12 months), a **floor rate** (often 3.50%–4.50%), and a **lifetime cap** (commonly 18.00% APR).

## Worked Numerical Example: Quantifying the 10-Year Payment Shock

Consider a homeowner whose property appraises at **`$500,000`** with a **`$300,000`** first mortgage at 3.75% fixed. At an **80% CLTV cap**, total allowable debt is `$400,000`, leaving a **`$100,000` HELOC credit limit**. Suppose the homeowner draws **`$80,000`** on day one for a structural kitchen and roof addition at **7.50% APR** (`r_m = 0.075 / 12 = 0.00625`), under a 10-year draw / 20-year repayment contract:

1. **Draw Period Interest-Only Minimum (Years 1–10):**
   `P_draw = $80,000 × 0.00625 = $500.00 per month`.
   If the borrower pays only `$500.00` monthly for all 120 months, cumulative interest equals **`$60,000.00`**, yet the principal balance on Day 1 of Year 11 remains **`$80,000.00`**.
2. **Repayment Period Reset at Constant 7.50% APR (Years 11–30):**
   At month 121, the line freezes and amortizes over `n = 240` months:
   `P_repay = $80,000 × [0.00625 × (1.00625)^240] / [(1.00625)^240 − 1] = $644.47 per month`.
   The required payment rises by **`$144.47/month` (+28.9%)** even if interest rates never move.
3. **Combined Rate-Hike Shock (+200 bps to 9.50% APR) on a 15-Year Repayment Term:**
   If Prime climbs 2.00% (`r_m = 0.095 / 12 = 0.007917`) and the contract uses a 15-year (`n = 180`) repayment window, the monthly obligation jumps to **`$835.38/month`**—a **67.1% surge** over the original `$500.00` draw payment.

## HELOC Payment Shock Across Rate and Repayment Scenarios

The table below isolates how an **`$80,000` unpaid balance** behaves when transitioning from interest-only draw payments to full amortization across common APRs and repayment durations:

| Variable APR | Monthly Draw (Interest-Only) | 10-Yr Amortizing Repayment | 15-Yr Amortizing Repayment | 20-Yr Amortizing Repayment | Jump vs. Draw (15-Yr Term) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **7.50% APR** | `$500.00` | `$949.61` | `$741.61` | `$644.47` | `+48.3% (+$241.61/mo)` |
| **8.50% APR** | `$566.67` | `$991.89` | `$787.79` | `$694.26` | `+39.0% (+$221.12/mo)` |
| **9.50% APR** | `$633.33` | `$1,035.18` | `$835.38` | `$745.70` | `+31.9% (+$202.05/mo)` |
| **10.50% APR** | `$700.00` | `$1,079.48` | `$884.32` | `$798.70` | `+26.3% (+$184.32/mo)` |
| **8.50% → 10.50% Shock** | `$566.67` (initial) | `$1,079.48` (reset) | `$884.32` (reset) | `$798.70` (reset) | `+56.1% (+$317.65/mo)` |

Notice the asymmetric danger in the bottom row: a borrower anchored to an initial `$566.67` payment at 8.50% who faces both a +200 bps rate increase and a 15-year repayment reset must absorb `$884.32/month`—more than `$3,800` in extra annual after-tax cash flow.

## Strategic Use Cases, Pitfalls, and Tax/Regulatory Caveats

Using home equity as a revolving line works best for **staged, value-accretive projects**—such as phased renovation draws or short-term bridge liquidity—where you preserve a low-rate first mortgage instead of refinancing at higher market rates. Rolling recurring deficits, vehicles, or credit card debt into a HELOC without fixing cash flow converts dischargeable unsecured debt into a **foreclosable lien** on your residence.

* **IRS Section 163(h) Interest Tracing:** HELOC interest is tax-deductible only if you itemize and trace funds directly to **buying, building, or substantially improving** the secured residence, within the `$750,000` combined acquisition debt cap (`$375,000` married filing separately).
* **Lender Freeze Clauses (Regulation Z):** Under 12 CFR § 1026.40, lenders can freeze or cut unused limits if property values drop or your credit deteriorates—never treat an undrawn HELOC as your sole emergency reserve.
* **Hidden Closing and Early-Closure Fees:** Many "no-closing-cost" HELOCs charge a `$350–$1,000` clawback if closed within 24–36 months, plus `$50–$95` annual maintenance fees.
* **Fixed-Rate Conversion Locks:** Many lenders let you lock drawn balances into a fixed-rate amortizing sub-account to neutralize Prime-rate volatility.

Treat a HELOC as disciplined project financing with a self-imposed principal schedule—never an open-ended ATM. Stress-test your capped payment and exit timeline in our [HELOC Calculator](/en/calculators/heloc-calculator).
