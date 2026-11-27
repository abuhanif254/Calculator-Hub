---
title: "Overtime Pay Calculator"
description: "Calculate gross overtime pay using FLSA 1.5x time-and-a-half, 2x double-time, and blended hourly rates. Compare US federal, state, and EU overtime rules."
faqs:
  - question: "Who qualifies for 1.5x overtime pay under the US FLSA?"
    answer: "Under the federal Fair Labor Standards Act (FLSA), all non-exempt hourly and salaried workers must receive at least 1.5x their regular rate for hours worked beyond 40 in a fixed 7-day workweek. Exempt executive, administrative, and professional roles must meet both strict job-duties tests and salary floors ($684/week federally, or higher state minimums like California's $70,304/year)."
  - question: "How do I calculate overtime when an employee works two different hourly rates?"
    answer: "Federal law requires a weighted-average blended hourly rate unless a specific prior agreement covers rate-in-effect overtime. Divide total straight-time pay across all jobs (plus any non-discretionary bonuses or shift differentials) by total hours worked to find the blended regular rate, then pay an extra 0.5x of that blended rate for each overtime hour."
  - question: "When does 2x double-time overtime apply in the United States?"
    answer: "Federal FLSA law never mandates double-time pay; 2x rates stem from state statutes or union collective bargaining agreements. California imposes the strictest rule: employers must pay 2x the regular rate for all hours worked beyond 12 in a single workday and for all hours beyond 8 on the 7th consecutive workday in a workweek."
  - question: "How does the 2026 IRS overtime tax deduction work under OBBBA?"
    answer: "For tax years 2025 through 2028, eligible filers can deduct strictly the half-time (0.5x) FLSA Section 7 overtime premium—capped at $12,500 single or $25,000 joint, phasing out above $150,000/$300,000 MAGI. State-only daily overtime and double-time premiums do not qualify. Beginning with 2026 W-2 forms, employers report qualified amounts in Box 12 using Code TT."
  - question: "How do European Union overtime rules differ from US FLSA law?"
    answer: "The EU Working Time Directive (2003/88/EC) caps average weekly working time at 48 hours including overtime and mandates 11 consecutive hours of daily rest. Individual member states govern pay premiums: France mandates +25% for hours 36–43 and +50% from hour 44; Spain caps annual overtime at 80 hours; Germany allows time-off-in-lieu or contractual bonuses."
---

Accurate **overtime pay calculation** requires more than multiplying a base hourly wage by 1.5. Under US federal law, state labor codes, and European Union directives, overtime pay depends on *when* hours are worked (weekly vs. daily thresholds), *which* pay rates and non-discretionary bonuses enter the regular rate of pay, and whether double-time tiers or mandatory rest caps apply.

Whether you are an hourly employee auditing your paycheck, a payroll administrator preparing **2026 Form W-2 Box 12 (Code TT)** qualified overtime reporting, or an international contractor comparing North American and EU labor protections, using exact statutory formulas prevents costly wage-and-hour miscalculations.

## Overtime Pay Formulas and Regulatory Methodology

Standard single-rate payroll calculation splits earnings across regular, time-and-a-half, and double-time tiers:

```
Total Pay = (Reg Hours × Rate) + (OT Hours × Rate × 1.5) + (DT Hours × Rate × 2.0)
Blended Regular Rate = (Total Straight-Time Earnings + Non-Discretionary Bonuses) ÷ Total Hours
FLSA Blended Overtime Pay = (Total Straight-Time Earnings + Bonuses) + (OT Hours × Blended Rate × 0.5)
```

- **US Federal FLSA Baseline (29 U.S.C. § 207):** Non-exempt employees earn **1.5× time-and-a-half** for all hours physically worked beyond **40 hours in a single 7-day workweek**. Paid vacation, sick leave, and holidays do not count toward the 40-hour overtime trigger unless explicitly granted by employer policy or union contract.
- **Daily Overtime & Double-Time States:** Several states layer daily rules over the FLSA floor. **California** mandates **1.5×** after **8 hours/day** (and for the first 8 hours on the 7th consecutive workday) and **2.0× double-time** after **12 hours/day** or past **8 hours on the 7th consecutive workday**. Alaska and Nevada also enforce 8-hour daily overtime triggers under specific conditions.
- **Blended Hourly Rate (29 CFR § 778.115 & § 778.209):** When a worker performs two jobs at different pay rates in one week—or receives non-discretionary production, attendance, or shift bonuses—you cannot compute overtime solely off the lowest rate or the base rate alone. All straight-time compensation is pooled to derive the **weighted-average blended rate**.
- **EU Working Time Directive (2003/88/EC):** Rather than relying purely on wage premiums, EU law caps maximum average weekly hours at **48 hours** (including overtime) over a reference period, guarantees **11 consecutive hours** of daily rest, and delegates overtime pay multipliers or compensatory time off (*Freizeitausgleich* / *repos compensateur*) to national laws.

## Step-by-Step Worked Examples: Multi-Tier and Blended Pay

### Example A: Single-Rate Week with 1.5× Overtime and 2× Double-Time
Suppose a non-exempt California technician earning **$28.00/hour** logs **54 hours** in one workweek: **40 regular hours**, **10 overtime hours** at `1.5×`, and **4 double-time hours** at `2.0×`.

1. **Regular Pay:** `40 hours × $28.00 = $1,120.00`.
2. **Time-and-a-Half Overtime Pay (`1.5×`):** `10 hours × ($28.00 × 1.5 = $42.00) = $420.00`.
3. **Double-Time Pay (`2.0×`):** `4 hours × ($28.00 × 2.0 = $56.00) = $224.00`.
4. **Total Gross Pay:** `$1,120.00 + $420.00 + $224.00 = $1,764.00`.
5. **2026 IRS Code TT Isolation Check:** For the 2026 federal **qualified overtime deduction** (up to `$12,500` single / `$25,000` joint), only the **0.5× FLSA Section 7 weekly overtime premium** qualifies (`14 hours above 40 × $28.00 × 0.5 = $196.00`)—state-mandated daily or extra `0.5×` double-time premiums are excluded.

### Example B: Weighted-Average Blended Hourly Rate (48 Hours)
Now suppose a dual-role employee works **30 hours** at **$24.00/hr** (`$720.00`) and **18 hours** at **$30.00/hr** (`$540.00`) in one 48-hour FLSA workweek:

1. **Total Straight-Time Pay:** `$720.00 + $540.00 = $1,260.00`.
2. **Blended Regular Rate:** `$1,260.00 ÷ 48 total hours = $26.25/hour`.
3. **FLSA Half-Time Premium (`8 OT hours`):** `8 × $26.25 × 0.5 = $105.00`.
4. **Total Gross Pay:** `$1,260.00 + $105.00 = $1,365.00` (identical to `40 × $26.25 + 8 × $39.375`).

## US & European Overtime Law Benchmarks (2026)

| Jurisdiction | Standard Workweek / Day | 1.5x / First OT Tier | 2x / Upper OT Tier | Key Statutory Cap or Rule |
| :--- | :--- | :--- | :--- | :--- |
| **US Federal (FLSA)** | 40 hrs/week | 1.5× over 40 hrs/week | None mandated | $684/wk ($35,568/yr) EAP salary floor; Code TT W-2 |
| **California (USA)** | 8 hrs/day, 40 hrs/week | 1.5× >8–12 hrs/day or >40 hrs/wk | 2.0× >12 hrs/day or >8 hrs 7th day | $70,304/yr state exempt salary minimum |
| **France (Code du Travail)** | 35 hrs/week | +25% (1.25×) hours 36–43 | +50% (1.50×) hour 44+ | 220-hour annual *contingent* benchmark |
| **Germany (ArbZG)** | 8 hrs/day (48 hrs/wk max) | Contractual (often +25% or TOIL) | Contractual night/holiday tiers | Max 10 hrs/day if averaged to 8 hrs/24 wks |
| **Spain (Estatuto)** | 40 hrs/week avg | ≥1.0× or paid compensatory rest | Collective agreement dependent | Strict **80-hour** annual overtime cap |
| **UK (Working Time Regs)** | 48 hrs/week avg cap | Contractual (no statutory premium) | Contractual | Workers may voluntarily opt out of 48-hr cap |

## Strategic Insights, Common Mistakes, and Compliance Caveats

- **Never Average Hours Across Two Weeks of a Biweekly Pay Period:** Under FLSA rules, working 50 hours in Week 1 and 30 hours in Week 2 equals **80 total hours—but owes 10 hours of overtime**, not zero. Each 7-day workweek stands completely alone.
- **Include Non-Discretionary Bonuses in the Regular Rate:** Attendance bonuses, safety incentives, and commission payouts promised in advance *must* be folded into the regular rate before computing overtime; omitting them is one of the most frequent Department of Labor (DOL) audit violations.
- **Avoid Misclassifying Salaried Workers as Exempt:** Paying an employee a flat weekly salary does *not* waive overtime. Unless the role satisfies both the statutory **duties test** and the applicable federal (`$35,568/yr`) or higher state salary threshold (such as California's `$70,304/yr` or New York's regional minimums), overtime remains legally mandatory.
- **Separate FLSA Half-Time for 2026 Tax Reporting:** Remember that federal "no tax on overtime" relief under OBBBA is a year-end income tax *deduction*, not a FICA or paycheck withholding exemption. Payroll still withholds Social Security (`6.2%`) and Medicare (`1.45%`) on every dollar of overtime pay.
- **Payroll & Legal Disclaimer:** Overtime rules vary sharply by industry exemptions (motor carriers, healthcare 8-and-80 plans, agricultural workers), union CBAs, and local ordinances. This guide is informational only and does not constitute legal, payroll, or tax advice.
