---
title: "How to Add and Subtract Time: The Ultimate Guide"
description: "Master base-60 mathematics. Learn how to accurately add hours and minutes, calculate payroll timesheets, and use our free Time Calculator."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "time-calculator"
relatedType: "calculator"
faqs:
  - question: "Why does 1.50 hours equal 1 hour 30 minutes instead of 1 hour 50 minutes?"
    answer: "Standard numbers operate in base-10 (decimal), where tenths represent fractions of 100, whereas clock minutes operate in base-60 (sexagesimal), where one hour equals 60 minutes. Multiplying 0.50 by 60 yields 30 minutes, while 50 minutes divided by 60 equals 0.8333 decimal hours. Confusing 1.50 hours with 1 hour 50 minutes creates a 20-minute error on every entry."
  - question: "How do you convert HH:MM:SS time into decimal hours for payroll and invoicing?"
    answer: "Divide minutes by 60 and seconds by 3,600, then add both quotients to the whole hours: Decimal Hours = Hours + (Minutes / 60) + (Seconds / 3,600). For example, 7 hours, 42 minutes, and 18 seconds converts to 7 + (42 / 60) + (18 / 3,600) = 7 + 0.7000 + 0.0050 = 7.7050 hours."
  - question: "How do you calculate elapsed shift duration across midnight?"
    answer: "Convert both clock times to 24-hour notation and add 24:00 to the end time before subtracting the start time. For a shift running from 21:45 (9:45 PM) to 06:15 (6:15 AM), rewrite 06:15 as 30:15, then compute 30:15 minus 21:45. Borrowing 1 hour (60 minutes) yields 29:75 minus 21:45, or 8 hours and 30 minutes."
  - question: "What is the difference between 24-hour clock time, 12-hour AM/PM time, and ISO 8601 duration?"
    answer: "A 12-hour clock restarts at 12:00 twice daily using AM and PM markers, while 24-hour notation (00:00 to 23:59) removes ambiguity for shift scheduling and aviation. Both represent a point in time. By contrast, ISO 8601 durations (such as PT4H24M23S) represent an elapsed span rather than a wall-clock timestamp."
  - question: "Do US federal labor rules allow rounding employee punch times to the nearest 15 minutes?"
    answer: "Under US Department of Labor regulation 29 CFR 785.48(b), employers may round clock-in and clock-out punches to the nearest 5 minutes, tenth of an hour (6 minutes), or quarter-hour (15 minutes), provided the practice averages out fairly over time. A rounding policy that systematically favors the employer violates the Fair Labor Standards Act."
---

Clock arithmetic breaks standard calculator rules because human timekeeping runs on a **sexagesimal (base-60)** hierarchy rather than base-10 decimals. Sixty seconds form one minute, 60 minutes form one hour, and 24 hours complete a calendar day—meaning you cannot enter `1.45 + 1.30` on a standard desk calculator to add 1 hour 45 minutes and 1 hour 30 minutes. Doing so treats minutes as hundredths of an hour and returns `2.75` (2 hours 45 minutes in decimal form) instead of the true `3 hours 15 minutes`.

Accurate time addition, subtraction, and duration conversion are essential for payroll verification, legal or consulting billing, aviation flight logs, and broadcast production. Whether you are summing multi-segment shift logs or reconciling overnight schedules, our [Time Calculator](/en/calculators/time-calculator) automates base-60 carries, borrows, and decimal conversions without arithmetic drift.

## Sexagesimal Arithmetic and Core Time Formulas

Every valid time calculation respects two distinct unit rollovers: **60** between seconds, minutes, and hours, and **24** between hours and days. When adding two durations `(H₁:M₁:S₁)` and `(H₂:M₂:S₂)`, you sum each column from right to left and carry any excess multiples of 60 to the next higher unit. When subtracting, if the subtrahend in seconds or minutes exceeds the minuend, you borrow `1` from the adjacent left column and add `60` to the column being subtracted.

```text
Total Seconds Normalization:
T_sec = (H × 3,600) + (M × 60) + S

Base-60 Addition with Carry-Over:
S_out = (S₁ + S₂) mod 60
C_min = floor((S₁ + S₂) / 60)
M_out = (M₁ + M₂ + C_min) mod 60
C_hr  = floor((M₁ + M₂ + C_min) / 60)
H_out = H₁ + H₂ + C_hr

Decimal Hours Conversion (for Payroll & Billing):
H_dec = H + (M / 60) + (S / 3,600)

Overnight Elapsed Duration (24-Hour Modulo):
ΔT = (T_end − T_start + 24:00) mod 24:00
```

In these expressions, `H`, `M`, and `S` denote integer hours, minutes (`0–59`), and seconds (`0–59`); `C_min` and `C_hr` represent carries; `floor(x)` rounds down to the nearest integer; and `mod 60` returns the remainder after dividing by 60. Converting `HH:MM:SS` inputs to integer seconds (`T_sec`) before summing—then decomposing back—prevents multi-row carry errors in spreadsheets and code.

## Step-by-Step Worked Payroll and Duration Examples

### Adding Multi-Segment Task Durations

Suppose an audio engineer logs two editing sessions: `2h 47m 38s` and `1h 36m 45s`.

1. **Add seconds:** `38 + 45 = 83 s`. Since `83 ≥ 60`, subtract `60` to leave `23 s` and carry `1 m` (`C_min = 1`).
2. **Add minutes with carry:** `47 + 36 + 1 = 84 m`. Subtract `60` to leave `24 m` and carry `1 h` (`C_hr = 1`).
3. **Add hours with carry:** `2 + 1 + 1 = 4 h`, yielding `4h 24m 23s`.
4. **Convert to decimal hours:** `4 + (24 / 60) + (23 / 3,600) = 4 + 0.4000 + 0.0064 = 4.4064 hours`. At `$95.00/hr`, billable revenue equals `$418.61`.

### Subtracting an Overnight Shift with an Unpaid Break

Consider a technician who clocks in at `9:45 PM` (`21:45`), takes a `30-minute` unpaid meal break, and clocks out at `6:15 AM` (`06:15`) the next day.

1. **Adjust across midnight:** Add `24:00` to the clock-out time: `06:15 + 24:00 = 30:15`.
2. **Borrow 1 hour:** Because `15 < 45`, borrow `1 hour` (`60 minutes`) from `30`, turning `30:15` into `29:75`.
3. **Subtract columns:** `75 − 45 = 30 m`; `29 − 21 = 8 h`, giving `8h 30m` gross span.
4. **Deduct the unpaid break:** `8h 30m − 0h 30m = 8h 00m` (`8.00` payable hours), or `$260.00` at `$32.50/hr`.

## Minute-to-Decimal Hour Conversion Benchmarks

Payroll platforms and billing systems multiply hourly rates by decimal hours (`H_dec`), not clock minutes. The table below maps common minute increments to their decimal equivalents.

| Clock Minutes (`MM`) | Exact Fraction | Decimal Hours (4 d.p.) | Nearest Hundredth | Common Operational / Billing Use |
| :--- | :--- | :--- | :--- | :--- |
| `05 min` | `1/12 hr` | `0.0833 hr` | `0.08 hr` | Five-minute manufacturing & labor rounding |
| `06 min` | `1/10 hr` | `0.1000 hr` | `0.10 hr` | Legal & consulting 6-minute (`0.1`) billing unit |
| `10 min` | `1/6 hr` | `0.1667 hr` | `0.17 hr` | Short clinical appointments & transit legs |
| `15 min` | `1/4 hr` | `0.2500 hr` | `0.25 hr` | Standard FLSA quarter-hour timesheet block |
| `20 min` | `1/3 hr` | `0.3333 hr` | `0.33 hr` | Agile sprint ceremonies & recurring check-ins |
| `30 min` | `1/2 hr` | `0.5000 hr` | `0.50 hr` | Standard unpaid meal break deduction |
| `45 min` | `3/4 hr` | `0.7500 hr` | `0.75 hr` | Three-quarter-hour therapy or tutoring block |

Only multiples of `6 minutes` and `15 minutes` terminate cleanly within two decimal places; non-terminating fractions like `20 minutes` (`0.3333...`) accumulate rounding drift if truncated prematurely across large timesheets.

## Practical Applications, Pitfalls, and Compliance Caveats

### Common Arithmetic and Data-Entry Pitfalls

The most expensive timesheet mistake is typing `8.30` into a decimal payroll cell for `8 hours 30 minutes`. Payroll engines interpret `8.30` as `8 hours 18 minutes` (`0.30 × 60`), underpaying by `12 minutes` per shift—one full hour lost per five-day week. Another common error involves `12:00 AM` (`00:00`) and `12:00 PM` (`12:00`): mistakenly adding `12` to `12:30 PM` yields `24:30` instead of `12:30`.

### Regulatory and Calendar Caveats

Under US federal regulation **29 CFR § 785.48(b)**, employers may round punches to 5-minute, tenth-hour (`6-minute`), or quarter-hour (`15-minute`) increments only when neutral—such as the 7-minute rule (`1–7` minutes round down, `8–14` round up). State labor courts (including California) increasingly disallow rounding when exact electronic timestamps are captured. Finally, pure `HH:MM` subtraction ignores Daylight Saving Time (DST): on spring-forward Sunday (`2:00 AM` to `3:00 AM`), `23:00` to `07:00` spans `7` elapsed hours rather than `8`, and `9` hours on fall-back Sunday. Always convert local timestamps to UTC before subtracting intervals across DST or timezone borders.
