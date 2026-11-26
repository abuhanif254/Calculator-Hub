---
title: "Understanding RMDs: Don't Lose 25% of Your Retirement to the IRS"
description: "Learn what Required Minimum Distributions (RMDs) are, the new SECURE Act 2.0 age rules, and use our RMD Calculator to avoid massive IRS penalties."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "rmd-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the RMD starting age under SECURE Act 2.0 in 2026?"
    answer: "Under SECURE Act 2.0, your Required Beginning Date depends on your birth year. Individuals born from 1951 through 1959 begin Required Minimum Distributions at age 73, while those born in 1960 or later begin at age 75 (effective starting in 2033). Your first distribution can be delayed until April 1 of the year after you turn 73, though every subsequent RMD is due by December 31."
  - question: "Are Roth 401(k) and Roth IRA accounts subject to lifetime RMDs in 2026?"
    answer: "No. Roth IRAs have never required lifetime distributions for the original owner, and under SECURE Act 2.0 rules effective since 2024, designated Roth 401(k) and Roth 403(b) accounts are also exempt from lifetime RMDs for the original account holder. However, non-spouse beneficiaries who inherit Roth accounts generally remain subject to the 10-year distribution rule."
  - question: "How much is the IRS penalty for missing a Required Minimum Distribution?"
    answer: "The federal excise tax on an RMD shortfall is 25% of the amount you failed to withdraw on time. If you correct the missed distribution and file IRS Form 5329 within the statutory correction window (typically by the end of the second tax year following the missed year, before an IRS deficiency notice), the penalty drops to 10%. The IRS may waive the penalty entirely if you prove reasonable error."
  - question: "Can I combine RMDs across multiple IRAs and 401(k) accounts?"
    answer: "You can aggregate Traditional IRAs—calculating the RMD for each IRA separately and withdrawing the combined total from a single IRA—and you can do the same across multiple 403(b) plans. By contrast, employer 401(k) and 457(b) plans cannot be aggregated with IRAs or with one another; each 401(k) plan must satisfy its own separate RMD."
  - question: "How does a Qualified Charitable Distribution (QCD) satisfy an RMD?"
    answer: "IRA owners aged 70½ or older can transfer funds directly from a Traditional IRA to an eligible 501(c)(3) public charity via a Qualified Charitable Distribution. Every dollar transferred as a QCD counts toward your annual RMD dollar-for-dollar while remaining excluded from Adjusted Gross Income (AGI), which helps prevent Medicare IRMAA surcharges and Social Security taxation."
---

**Required Minimum Distributions (RMDs)** are mandatory annual withdrawals the IRS forces you to take from tax-deferred retirement accounts—including Traditional IRAs, SEP IRAs, SIMPLE IRAs, and Traditional 401(k) or 403(b) plans—once you reach statutory retirement age. Under SECURE Act 2.0 rules in effect for 2026, individuals born between 1951 and 1959 must begin RMDs at **age 73**, while those born in 1960 or later start at **age 75**. Failing to withdraw the full required amount by the annual deadline triggers a **25% excise tax** on the shortfall, reducible to **10%** only if corrected promptly.

Each year's RMD is calculated by dividing your prior December 31 account balance by an IRS life-expectancy divisor that shrinks every year, pushing your required withdrawal percentage steadily higher from `3.77%` at age 73 to `6.25%` at age 85 and `11.24%` at age 95. Use our [RMD Calculator](/en/calculators/rmd-calculator) to compute exact annual obligations across multiple accounts before year-end processing cutoffs.

## Core RMD Formula and IRS Table Mechanics

The IRS determines your minimum annual withdrawal using a single ratio derived from prior-year-end asset value and an actuarial distribution period published in IRS Publication 590-B.

```text
Annual RMD ($)            = Prior_Dec31_Balance / Distribution_Period(Age_t)
Implied Withdrawal Rate   = (1 / Distribution_Period(Age_t)) × 100%
Shortfall Penalty (25%)   = max(0, Annual_RMD − Actual_Withdrawals) × 0.25
Corrected Penalty (10%)   = max(0, Annual_RMD − Actual_Withdrawals) × 0.10
```

Where:
- `Prior_Dec31_Balance` is the prior December 31 fair market value of the tax-deferred account, adjusted for outstanding rollovers in transit.
- `Distribution_Period(Age_t)` is the IRS life expectancy factor for the age you reach in calendar year `t`.
- Most owners use the **Uniform Lifetime Table**, while owners whose **sole primary beneficiary** all year is a spouse **more than 10 years younger** use the **Joint and Last Survivor Table** for a smaller mandatory withdrawal.

Designated Roth 401(k) and Roth 403(b) balances are excluded from lifetime RMD calculations under SECURE 2.0, matching Roth IRAs.

## Step-by-Step Worked Example: Age 73 Through Age 74

Assume a retiree born in 1953 turns **73** in 2026 with a single Traditional IRA valued at **`$800,000`** on December 31, 2025. The portfolio earns **`6.0%`** net in 2026, and the retiree withdraws the RMD in December.

1. **Look up the 2026 IRS Uniform Lifetime Factor:** At age 73, the divisor is **`26.5`**.
2. **Calculate the 2026 RMD:**
   ```text
   RMD_2026 = $800,000 / 26.5 = $30,188.68
   ```
   This equals **`3.77%`** of the prior year-end balance. Taking it in 2026 avoids pushing two RMDs onto the 2027 tax return.
3. **Model a hypothetical shortfall penalty:** Withdrawing only `$10,188.68` by December 31 leaves a `$20,000.00` shortfall. The 25% excise tax costs **`$5,000.00`**, dropping to **`$2,000.00`** (`10%`) if corrected within the two-year window via Form 5329.
4. **Compute the 2027 RMD:** After 6.0% growth (`+$48,000.00`) minus the `$30,188.68` withdrawal, the December 31, 2026 balance is **`$817,811.32`**. At age 74, the divisor drops to **`25.5`**, raising the 2027 obligation to:
   ```text
   RMD_2027 = $817,811.32 / 25.5 = $32,071.03
   ```

## IRS Uniform Lifetime Table Benchmarks by Age

The table below illustrates how mandatory withdrawal percentages accelerate with age under the current IRS Uniform Lifetime Table across two benchmark account sizes.

| Owner Age | Uniform Lifetime Factor | Mandatory Withdrawal % | Annual RMD ($500,000 Balance) | Annual RMD ($1,000,000 Balance) | Strategic Tax Implication |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **73** | 26.5 | 3.77% | $18,867.92 | $37,735.85 | Initial RMD year for 1951–1959 birth cohorts |
| **75** | 24.6 | 4.07% | $20,325.20 | $40,650.41 | Initial RMD year for 1960+ cohorts; rising AGI floor |
| **80** | 20.2 | 4.95% | $24,752.48 | $49,504.95 | Often triggers higher Medicare Part B/D IRMAA tiers |
| **85** | 16.0 | 6.25% | $31,250.00 | $62,500.00 | Outpaces conservative 4%–5% bond portfolio yields |
| **90** | 12.2 | 8.20% | $40,983.61 | $81,967.21 | Rapid principal drawdown if equity returns lag |
| **95** | 8.9 | 11.24% | $56,179.78 | $112,359.55 | Over one-ninth of account taxed as ordinary income |

## Real-World Pitfalls, Exceptions, and Tax Mitigation

### The April 1 Double-RMD Trap
Taxpayers are permitted to delay their *very first* RMD until April 1 of the following year, yet doing so forces **two full RMDs into a single tax year** (the delayed first-year RMD by April 1 plus the second-year RMD by December 31). That income spike frequently pushes households across marginal federal tax brackets and triggers Income-Related Monthly Adjustment Amounts (IRMAA) on Medicare premiums two years later.

### Aggregation Rules Across Account Types
Mistaking account aggregation rules causes unintentional shortfalls:
- **Traditional, SEP, and SIMPLE IRAs:** Calculate each IRA's RMD separately, then withdraw the summed total from any one or combination of those IRAs.
- **401(k) and 457(b) Plans:** Aggregation is prohibited. If you hold three separate former-employer 401(k) balances, each plan must distribute its own exact RMD.
- **Still-Working Exception:** If you remain employed past age 73 and own **5% or less** of the sponsoring company, most 401(k) plans allow you to defer RMDs on that *current* employer plan until April 1 after retirement—while still contributing up to the 2026 `$24,500` elective deferral cap (plus `$8,000` age-50+ catch-up, or `$11,250` for ages 60–63, subject to mandatory Roth catch-up rules if prior-year FICA wages exceeded `$150,000`).

### Proactive Tax Reduction: Roth Conversions and QCDs
Retirees in their 60s can shrink future RMD exposure by converting Traditional IRA assets to Roth IRAs in lower-tax gap years before RMDs begin, and by maintaining tax-free savings limits such as the 2026 IRA cap (`$7,500`) or HSA limits (`$4,400` individual / `$8,750` family) while still eligible. Once aged **70½ or older**, directing **Qualified Charitable Distributions (QCDs)** straight from an IRA custodian to a 501(c)(3) charity satisfies your RMD while keeping those dollars completely out of Adjusted Gross Income. Remember that RMD rules apply solely to US tax-qualified retirement plans and depend on accurate custodian Form 5498 year-end valuations; consult a CPA or fiduciary advisor before executing complex inherited-IRA or spousal rollover elections.
