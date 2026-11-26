---
title: "How Much House Can I Afford? The 28/36 Rule Explained"
description: "Learn how mortgage lenders evaluate your income, understand the 28/36 DTI rule, and use our House Affordability Calculator to set a safe budget."
category: "Finance"
relatedCalculator: "house-affordability-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "What is the difference between front-end and back-end DTI ratios?"
    answer: "Your front-end DTI ratio divides your total monthly housing payment (PITI plus HOA and PMI) by your gross monthly income, targeting 28% or less. Your back-end DTI ratio adds all recurring minimum debt obligations—auto loans, student loans, credit cards, and personal loans—to that housing payment, targeting 36% or less."
  - question: "Do mortgage lenders approve borrowers above the 28/36 rule?"
    answer: "Yes. Automated underwriting systems for conventional loans frequently approve back-end DTI ratios up to 45% or 50% for borrowers with high credit scores and strong cash reserves, while FHA loans sometimes permit up to 56.9%. However, lender approval measures maximum default tolerance, not comfortable household cash flow."
  - question: "Why does the 28/36 rule use gross income instead of net take-home pay?"
    answer: "Gross income creates a standardized benchmark across borrowers with different tax brackets, state income tax rates, and pre-tax payroll deductions. Because take-home pay shrinks when you fund health insurance or a 401(k) up to the $24,500 2026 limit, you should always cross-check the 28/36 output against your actual net monthly budget."
  - question: "Which monthly expenses are excluded from DTI calculations?"
    answer: "Underwriters exclude non-debt living expenses such as groceries, utilities, health insurance premiums, childcare, cell phone plans, streaming subscriptions, and payroll retirement contributions. Only contractual debt obligations appearing on your credit report—plus court-ordered alimony or child support—count toward your back-end DTI."
  - question: "How much extra cash should I budget beyond the monthly PITI payment?"
    answer: "Plan for 2% to 5% of the purchase price in upfront closing costs on top of your down payment, plus an ongoing reserve of 1% to 2% of the home's value annually for maintenance and capital repairs such as roofs, HVAC units, and water heaters."
---

The **28/36 rule** is the foundational underwriting standard for conventional home affordability: allocate no more than **28% of gross monthly income** to total housing costs (`PITI`) and no more than **36% of gross monthly income** to all recurring monthly debt obligations combined. Whichever ceiling produces the lower monthly dollar figure is your binding affordability limit.

Although automated mortgage underwriting often approves borrowers up to `45%` or even `50%` back-end debt-to-income (`DTI`), stretching to a lender's maximum leaves almost no margin for income taxes, retirement savings, childcare, or unexpected home repairs. Treating `28/36` as an upper ceiling—and comparing it against net take-home pay—prevents you from becoming house poor. Run your exact income, debt, and local tax numbers in our [House Affordability Calculator](/en/calculators/house-affordability-calculator).

## The 28/36 DTI Framework and Affordability Formula

Lenders evaluate housing affordability through two paired Debt-to-Income (`DTI`) ratios calculated from gross (pre-tax) monthly household income `G`:

```text
Front-End Cap = 0.28 × G
Back-End Cap  = (0.36 × G) − D
Max PITI      = min(Front-End Cap, Back-End Cap)
```

- **`G` (Gross Monthly Income):** Annual pre-tax salary, verified bonuses, or two-year averaged self-employment income divided by 12.
- **`D` (Existing Monthly Debt Service):** Minimum required monthly payments on auto loans, student loans, personal loans, minimum credit card balances, and court-ordered support. Utilities, groceries, and insurance premiums are excluded.
- **`PITI` (Total Housing Payment):** Principal (`P`), Interest (`I`), Property Taxes (`T`), and Homeowners Insurance (`I`), plus Private Mortgage Insurance (`PMI`) if putting under 20% down and any monthly `HOA` dues.

To translate `Max PITI` into a maximum home purchase price `H` given a down payment fraction `d` (so Loan-to-Value `LTV = 1 − d`), combine the monthly loan payment factor `f` (monthly `P&I` per `$1` borrowed) with your annual property tax and insurance rate `k` (expressed as a decimal of home value, typically `0.015` to `0.025`):

```text
f = [r(1 + r)^n] / [(1 + r)^n − 1]
H = (Max PITI − HOA) / [(LTV × f) + (k / 12) + (LTV × pmi_rate / 12)]
```

Because property taxes, insurance, and HOA fees scale directly with property location and structure type, two buyers earning identical salaries can have wildly different maximum purchase prices between a low-tax county and a high-tax metro area with `$450/month` condo dues.

## Step-by-Step Worked Example: $120,000 Household Income

Assume a household earns `$120,000` per year (`G = $10,000/month`), plans a `20%` down payment (`LTV = 0.80`, zero PMI, zero HOA), faces a `6.50%` 30-year fixed mortgage rate (`r = 0.065 / 12`, `f = 0.0063207`), and expects `1.25%` annual property taxes plus `0.45%` homeowners insurance (`k = 0.0170`, or `0.0014167/month`).

### Case A: Low Existing Debt ($550/Month Car & Student Loans)

1. **Compute Front-End Limit:** `0.28 × $10,000 = $2,800/month`.
2. **Compute Back-End Limit:** `(0.36 × $10,000) − $550 = $3,600 − $550 = $3,050/month`.
3. **Select Binding Constraint:** `min($2,800, $3,050) = $2,800/month` (`Front-End` binds).
4. **Solve for Max Home Price `H`:** Per `$1` of home value, monthly cost equals `(0.80 × 0.0063207) + (0.0170 / 12) = 0.0050566 + 0.0014167 = 0.0064733`. Dividing `$2,800 / 0.0064733` gives a **maximum home price of `$432,552`** (a `$346,042` mortgage plus `$86,510` down, yielding `$2,187` `P&I` and `$613` taxes/insurance).

### Case B: Higher Existing Debt ($1,100/Month Combined)

1. **Front-End Limit:** Still `$2,800/month`.
2. **Back-End Limit:** `$3,600 − $1,100 = $2,500/month` (`Back-End` binds).
3. **Solve for Max Home Price `H`:** `$2,500 / 0.0064733 = $386,207` (a `$308,966` loan plus `$77,241` down). Notice that every `$550/month` in extra consumer debt cuts purchasing power by roughly `$46,345` under identical interest rates.

## Affordability Benchmarks Across Income and Debt Tiers

The table below applies the exact `28/36` rule assuming a `6.50%` 30-year fixed rate, `20%` down payment, `1.70%` combined annual property tax and insurance, and `$0` HOA dues.

| Gross Income | Monthly Debt | Front-End Cap (28%) | Back-End Cap (36% − Debt) | Binding Max PITI | Max Home Price (20% Down) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $75,000/yr | $300/mo | $1,750 | $1,950 | $1,750 | $270,345 |
| $75,000/yr | $800/mo | $1,750 | $1,450 | $1,450 | $224,000 |
| $100,000/yr | $400/mo | $2,333 | $2,600 | $2,333 | $360,460 |
| $100,000/yr | $1,100/mo | $2,333 | $1,900 | $1,900 | $293,517 |
| $150,000/yr | $600/mo | $3,500 | $3,900 | $3,500 | $540,690 |
| $200,000/yr | $1,500/mo | $4,667 | $4,500 | $4,500 | $695,172 |

## Real-World Underwriting Caveats and Common Budgeting Mistakes

### Gross-to-Net Distortion in 2026

Relying solely on gross income overlooks major payroll deductions. In 2026, a single high-saving earner maxing out a 401(k) (`$24,500`) and an individual HSA (`$4,400`)—or a family contributing `$8,750` to an HSA plus `$7,500` to an IRA—already removes substantial cash flow before taxes. Add federal/state income taxes and FICA (`7.65%`), and a `28%` gross payment often consumes `38%` to `43%` of actual net take-home pay. Always verify that `PITI` plus utilities and a `1%` annual maintenance reserve leaves room for savings.

### Four Common Affordability Errors

- **Rent-to-Mortgage Fallacy:** Rent is the *maximum* you pay for shelter each month; a mortgage `PITI` payment is the *minimum*. Unbudgeted repairs (HVAC replacement, roof leaks, foundation drainage) routinely add `$300` to `$600` per month on an annualized basis.
- **Tax Reassessment Shock:** Property taxes listed on real estate portals reflect the *previous* owner's assessed value, often capped by homestead exemptions. After closing, counties frequently reassess taxes at the new purchase price—which can double your escrow shortage in year two.
- **Ignoring Closing Cash:** Buyers must bring `2%` to `5%` of the purchase price in cash for lender origination, title insurance, transfer taxes, and prepaid escrow funding *in addition* to the down payment.
- **Student Loan Calculation Rules:** Even if an income-driven repayment (`IDR`) plan shows `$0/month` on your credit report, conventional and FHA guidelines often impute `0.5%` to `1.0%` of the total student loan balance into your back-end DTI unless documented otherwise.
