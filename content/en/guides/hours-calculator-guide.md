---
title: "The Payroll Masterclass: Calculating Timesheets and Work Hours"
description: "Convert base-60 timesheet minutes to base-10 decimals, deduct unpaid meal breaks, compute FLSA overtime, and verify gross pay with our Hours Calculator."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "hours-calculator"
relatedType: "calculator"
faqs:
  - question: "Why is 8 hours and 30 minutes written as 8.50 hours instead of 8.30 hours in payroll?"
    answer: "Clock time uses a base-60 (sexagesimal) system where 60 minutes make one hour, whereas payroll software multiplies wages using base-10 decimal hours. Treating 8 hours 30 minutes as 8.30 drops 0.20 hours (12 minutes) of pay per shift, because 30 / 60 = 0.50 rather than 0.30."
  - question: "How does the FLSA 7-minute rounding rule work for time clocks?"
    answer: "Under US Department of Labor regulation 29 CFR 785.48(b), employers may round employee punches to the nearest quarter-hour (15 minutes), provided the policy is neutral and does not systematically underpay workers over time. Punches 1 to 7 minutes past the quarter-hour round down, while punches 8 to 14 minutes past round up to the next 15-minute mark."
  - question: "Are coffee breaks and lunch breaks both unpaid under federal law?"
    answer: "No. Under 29 CFR 785.18 and 785.19, short rest breaks lasting 5 to 20 minutes are considered compensable work time and must be paid. Bona fide meal periods of 30 minutes or longer may be unpaid only if the employee is completely relieved from duty—meaning an employee required to answer phones or monitor equipment at a desk must be paid."
  - question: "How do you calculate overtime when an employee works two different hourly rates in the same week?"
    answer: "Under the Fair Labor Standards Act, overtime for multi-rate employees normally uses the weighted-average (blended) regular rate: divide total straight-time earnings from both jobs by total hours worked across all jobs, then pay an additional 0.5x of that blended rate for every hour over 40."
  - question: "Do pre-tax 401(k) and HSA payroll deductions reduce overtime pay calculations?"
    answer: "No. Pre-tax benefit deductions—such as 401(k) deferrals (capped at $24,500 for 2026) and HSA contributions (capped at $4,400 individual or $8,750 family for 2026)—are subtracted after gross regular and overtime pay are calculated. Overtime is always computed on your full contractual hourly rate before benefit withholdings or taxes."
---

Accurate timesheet math rests on one rule: clocks count minutes in **base-60**, while payroll engines multiply wages in **base-10 decimals**. Confusing those bases causes the most frequent paycheck errors for hourly workers and bookkeepers. Working `8 hours and 45 minutes` equals `8.75` decimal hours—not `8.45`—a gap of 18 unpaid minutes on one shift.

Verifiable payroll also requires subtracting bona fide unpaid meal breaks, separating straight-time hours from Fair Labor Standards Act (FLSA) overtime tiers, and checking time-clock rounding symmetry. Our [Hours Calculator](/en/calculators/hours-calculator) handles overnight spans, break deductions, base-60 conversions, and gross pay totals so you can audit every pay stub.

## Time-to-Decimal Conversion and Overtime Formulas

Each daily entry passes through three steps before hitting gross pay: elapsed shift duration, net compensable hours, and weekly regular-versus-overtime allocation.

```text
Decimal Hours (H_dec) = Hours + (Minutes / 60)

Net Daily Hours       = (T_out − T_in) − (Unpaid_Meal_Minutes / 60)

Weekly Gross Pay (US Federal FLSA):
  If Sum(Net Hours) <= 40:  Gross = Sum(Hours) × Rate
  If Sum(Net Hours) > 40:   Gross = (40 × Rate) + [(Sum(Hours) − 40) × (Rate × 1.5)]
```

### Overnight Shifts and Blended Multi-Rate Overtime

For shifts crossing midnight—such as clocking in at `22:15` (10:15 PM) and out at `06:45` (6:45 AM)—add `24:00` before subtracting: `(24:00 + 06:45) − 22:15 = 8 hours 30 minutes`, or `8.50` gross hours. When an employee works two pay rates in one week (for example, 30 hours at `$22/hr` and 15 hours at `$30/hr`), FLSA generally requires computing the weighted-average regular rate (`$1,110 / 45 = $24.67/hr`) and adding a `0.5×` overtime premium (`5 × $24.67 × 0.5 = $61.68`) for `$1,171.68` total gross pay.

## Step-by-Step Worked Weekly Timesheet and Gross-to-Net Example

Suppose a technician earns **$28.00/hour** under federal FLSA weekly overtime rules with a **30-minute (0.50 hr)** unpaid lunch break each day:

1. **Monday (8:00 AM – 5:12 PM, 30 min break):** Elapsed `9h 12m = 9.20` hrs minus `0.50` = **8.70 net hours**.
2. **Tuesday (7:54 AM – 5:24 PM, 30 min break):** Elapsed `9h 30m = 9.50` hrs minus `0.50` = **9.00 net hours**.
3. **Wednesday (8:06 AM – 5:48 PM, 30 min break):** Elapsed `9h 42m = 9.70` hrs minus `0.50` = **9.20 net hours**.
4. **Thursday (8:00 AM – 5:30 PM, 30 min break):** Elapsed `9h 30m = 9.50` hrs minus `0.50` = **9.00 net hours**.
5. **Friday (8:15 AM – 5:21 PM, 30 min break):** Elapsed `9h 06m = 9.10` hrs minus `0.50` = **8.60 net hours**.
6. **Weekly Gross Pay:** Total hours equal `8.70 + 9.00 + 9.20 + 9.00 + 8.60 = 44.50 hours`. With a `1.5×` overtime rate of `$42.00/hr`, regular pay is `40.00 × $28.00 = $1,120.00` and overtime pay is `4.50 × $42.00 = $189.00`, totaling **$1,309.00 gross**.
7. **2026 Pre-Tax Deduction Sequencing:** A 6% traditional 401(k) deferral (`$78.54/wk`, or `$4,084/yr` under the 2026 IRS `$24,500` cap) and a `$50/wk` HSA contribution (`$2,600/yr` under the 2026 `$4,400` individual / `$8,750` family cap) are deducted after gross pay is fixed. HSA deferrals via Section 125 reduce FICA-taxable wages (`$1,309 − $50 = $1,259`), while 401(k) deferrals remain subject to `7.65%` FICA.

## Minute-to-Decimal Conversion and Rounding Reference

This reference compares exact base-10 decimals against FLSA 15-minute (7-minute rule) rounding and shows the dollar value per occurrence at **$28.00/hour**.

| Clock Minutes | Exact Decimal (`M / 60`) | FLSA 15-Min Rounded | Rounding Delta | Exact Pay (@ $28/hr) | Rounded Pay (@ $28/hr) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 5 min | 0.0833 hr (0.08) | 0.00 hr | −5 min | $2.33 | $0.00 |
| 10 min | 0.1667 hr (0.17) | 0.25 hr | +5 min | $4.67 | $7.00 |
| 15 min | 0.2500 hr (0.25) | 0.25 hr | 0 min | $7.00 | $7.00 |
| 22 min | 0.3667 hr (0.37) | 0.25 hr | −7 min | $10.27 | $7.00 |
| 30 min | 0.5000 hr (0.50) | 0.50 hr | 0 min | $14.00 | $14.00 |
| 42 min | 0.7000 hr (0.70) | 0.75 hr | +3 min | $19.60 | $21.00 |
| 45 min | 0.7500 hr (0.75) | 0.75 hr | 0 min | $21.00 | $21.00 |

## FLSA Compliance, Multi-State Overtime, and Payroll Pitfalls

Even digital timeclocks produce wage errors when employers misapply statutory break, recordkeeping, or rounding rules:

- **The 8.30 vs. 8.50 Formatting Error:** Typing `8:30` as `8.30` in a spreadsheet drops `0.20` hours (12 minutes) every half-hour shift—costing `$1,400/year` across 250 shifts at `$28/hr`. Always divide clock minutes by 60 before multiplying hourly wages.
- **Asymmetric Time-Clock Rounding:** Under `29 CFR 785.48(b)`, rounding is unlawful if clock-ins always round up while clock-outs round down; net rounding variance across a pay period must remain neutral and average near zero over time.
- **Interrupted Meal Deductions:** Automatic 30-minute lunch deductions violate federal law whenever workers monitor radios, answer phones, or stay on call at their station. Any interrupted meal break under 30 duty-free minutes must be restored as paid time.
- **State Daily Overtime Triggers:** Unlike federal FLSA weekly thresholds, California mandates `1.5×` overtime after **8 hours in a single workday** and `2.0×` double-time after **12 hours** (plus seventh-consecutive-day premiums), regardless of whether total weekly hours exceed 40.

Cross-check every pay period's punches and meal breaks with our [Hours Calculator](/en/calculators/hours-calculator) before approving timesheets.
