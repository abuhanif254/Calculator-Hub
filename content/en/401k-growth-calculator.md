---
title: "401(k) Growth Calculator"
metaTitle: "401(k) Growth Calculator — 2026 Limits & Employer Match"
description: "Project long-term 401(k) balance growth with annual salary raises, tiered employer matching formulas, 2026 IRS contribution caps, and compounding."
metaDescription: "Project your 401(k) balance with salary raises, employer match, and 2026 IRS limits ($24,500 base, $8,000 catch-up, $11,250 super catch-up ages 60-63)."
metaKeywords: "401k growth calculator, 401k calculator 2026, 401k employer match calculator, 2026 401k contribution limits, secure 2.0 super catch up, traditional vs roth 401k"
faqs:
  - question: "What are the official 2026 IRS 401(k) contribution limits, including the ages 60 to 63 super catch-up?"
    answer: "For tax year 2026, the IRS standard employee elective deferral limit is $24,500. Workers turning age 50 to 59 (or 64 and older) by December 31, 2026 can add an $8,000 standard catch-up for $32,500 total. Under SECURE 2.0, employees turning 60, 61, 62, or 63 in 2026 qualify for an enhanced $11,250 super catch-up—raising their personal limit to $35,750 if their employer plan permits it."
  - question: "Does my employer match count toward my $24,500 annual employee deferral cap?"
    answer: "No. Employer matching and profit-sharing contributions do not count against your $24,500 employee deferral limit. Instead, combined employee plus employer deposits are capped by the separate IRS Section 415(c) total annual additions limit—which is $72,000 for 2026 (plus $8,000 catch-up for ages 50+ or $11,250 for ages 60–63)."
  - question: "What is the new 2026 mandatory Roth catch-up rule for earners over $150,000?"
    answer: "Beginning in 2026 under the SECURE 2.0 Act, if you are age 50 or older and your prior-year (2025) FICA wages from your sponsoring employer exceeded $150,000, any 401(k) catch-up contributions you make must go into a Roth (after-tax) account rather than pre-tax. Base deferrals up to $24,500 can still be traditional pre-tax."
  - question: "What is a 401(k) 'true-up' provision, and why can front-loading cost me employer match?"
    answer: "Many companies calculate employer match strictly on a per-paycheck basis. If you max out your $24,500 limit by August, you contribute $0 from September through December—and miss four months of company match unless your plan document includes a year-end 'true-up' reconciliation. Always verify with HR before accelerating deferrals."
  - question: "How does a 401(k) vesting schedule affect my projected balance if I change jobs?"
    answer: "You always own 100% of your personal paycheck deferrals immediately, but employer matching contributions often follow a vesting schedule—either a 3-year cliff (0% until Year 3, then 100%) or a 2-to-6-year graded schedule (20% per year starting in Year 2). Leaving a job before full vesting forfeits the unvested share of employer contributions and their accrued gains."
---

## How Payroll Deferrals, Raises, and Company Matches Compound Together

Unlike an individual brokerage account funded by static monthly transfers, a workplace **401(k)** grows through three interlocking accelerators: **your payroll deferrals**, **your employer's matching contributions**, and **annual salary increases** that automatically scale both dollar streams upward every year. Because contributions come out of every paycheck automatically before you see the cash, even modest contribution percentage bumps compound into six- and seven-figure differences over a 30- to 40-year career.

Capturing a full employer match is the closest thing to a guaranteed windfall in personal finance. A typical "50% match up to 6% of pay" hands you an instant **50% risk-free return** on those matched dollars on payday, while a dollar-for-dollar match doubles your money immediately before the stock market moves a single tick.

## The Annual 401(k) Projection Formula (With Mid-Year Payroll Timing)

Because both salary and matched contributions escalate each year, this calculator advances your retirement balance iteratively year by year from your current age to retirement age:

```text
Employee_k = Salary_k × c
Match_k    = Salary_k × min(c, MatchCap) × MatchRate
Growth_k   = (B_(k-1) × r) + (Employee_k + Match_k) × (r / 2)
B_k        = B_(k-1) + Employee_k + Match_k + Growth_k
Salary_(k+1) = Salary_k × (1 + g)
```

Here is how each variable drives the projection:

- **`B_(k-1)` (Prior Year-End Balance):** Your starting 401(k) balance entering year `k`, earning a full year's expected return `r`.
- **`Salary_k` & `g` (Annual Salary & Raise Rate):** Gross pay in year `k`, stepping up annually by `g` (e.g., `2.5%`).
- **`c` (Employee Contribution %):** Percentage of gross salary you defer each year.
- **`MatchRate` & `MatchCap`:** How your employer matches—for example, `50%` (`0.50`) on employee deferrals up to `6%` (`0.06`) of salary, using `min(c, MatchCap)` so contributing above 6% earns no extra match beyond the 3% effective cap.
- **`(r / 2)` Mid-Year Factor:** Because 401(k) deposits arrive smoothly across 24 or 26 paychecks throughout the year rather than all on January 1, new contributions earn roughly half a year of investment growth during the year they are deposited.

## Worked Multi-Year Walkthrough: Age 28 to 65 With a 50% Match

Trace a realistic career trajectory for a **28-year-old** planning to retire at **65** (`37` years) with a **$25,000** existing 401(k), **$85,000** salary, **2.5%** annual raises, **9%** employee deferral, a **50% employer match up to 6%**, and an **8.0%** average annual return.

**Year 1 Calculation (Age 28 → 29):**

1. Employee contribution: `$85,000 × 9% = $7,650.00`.
2. Employer match (capped at 6% of pay): `$85,000 × min(9%, 6%) × 50% = $2,550.00` (3% effective match).
3. Investment growth: `($25,000 × 0.08) + [($7,650 + $2,550) × 0.04] = $2,000.00 + $408.00 = $2,408.00`.
4. **End of Year 1 Balance:** `$25,000 + $7,650 + $2,550 + $2,408 = $37,608.00`.
5. Year 2 salary adjusts to `$85,000 × 1.025 = $87,125.00`, lifting Year 2 employee contributions to `$7,841.25`, company match to `$2,613.75`, and Year 2 ending balance to `$51,489.84`.

**Full 37-Year Outcome (Age 65):**

- **Starting Balance:** `$25,000`
- **Total Employee Contributions:** `$456,965`
- **Total Employer Match Deposited:** `$152,322`
- **Compounded Investment Growth:** `$2,642,166`
- **Projected Age-65 Balance:** **`$3,276,453`**

Strip out the employer match while keeping every other assumption identical, and the Age-65 balance falls to **`$2,565,125`**. That seemingly modest 3% company match—just `$152,322` in direct deposits—compounds into **`$711,328`** of extra retirement wealth.

## 2026 IRS 401(k) Contribution & Catch-Up Limits

When modeling high incomes or aggressive savings rates, check your projected annual employee dollar deferral against official **2026 IRS statutory caps** (since percentage-based calculators do not automatically enforce annual IRS ceilings):

| Age Tier (as of Dec 31, 2026) | Base Employee Deferral | Catch-Up Allowance | Max Employee Total | Combined Sec. 415(c) Limit (Employee + Employer) |
| :--- | :--- | :--- | :--- | :--- |
| **Under Age 50** | $24,500 | $0 | $24,500 | $72,000 |
| **Ages 50–59 & 64+** | $24,500 | $8,000 | $32,500 | $80,000 |
| **Ages 60–63 (SECURE 2.0 Super)** | $24,500 | $11,250 | $35,750 | $83,250 |

Notice the special **Ages 60–63** window created by SECURE 2.0: employees turning 60 through 63 in 2026 can contribute up to **$35,750** (if adopted by their employer plan), before reverting to the standard catch-up tier at age 64.

## Five High-Cost 401(k) Traps to Check in Your Plan Summary

1. **Missing a Per-Paycheck True-Up:** If you expect to hit the **$24,500** deferral cap early in the year, confirm in your Summary Plan Description whether your employer performs a year-end **true-up**. Without one, pace your percentage evenly across all 26 pay periods so you never forfeit late-year matching dollars.
2. **2026 Mandatory Roth Catch-Up Compliance:** Workers age 50+ whose 2025 FICA wages from their employer topped **$150,000** must direct all 2026 catch-up deferrals into a **Roth 401(k)** bucket—adjust your tax withholding accordingly because those catch-up dollars will not reduce current-year taxable income.
3. **Leaving Just Before a Vesting Cliff:** Before accepting a new job offer, check your vesting anniversary date. Walking away two months before a 3-year cliff can surrender $10,000+ in unvested company match—worth negotiating as a signing bonus with your next employer.
4. **High Plan & Target-Date Fund Fees:** Small-company 401(k)s sometimes stack 0.50% to 1.00% in record-keeping and actively managed fund fees. Favor institutional S&P 500 or total-market index options priced at **0.02% to 0.08%** whenever available inside your plan menu.
5. **Ignoring Traditional vs. Roth Tax Diversification:** Pre-tax contributions deduct at your top **marginal** bracket today (24% or 32%+) while withdrawals in retirement fill lower brackets starting at 0% (standard deduction), 10%, and 12%. Pairing pre-tax deferrals during peak earning years with Roth contributions early in your career—or during lower-income years—gives you tax flexibility before Required Minimum Distributions begin at age 73 (or 75 for those born in 1960 or later).
