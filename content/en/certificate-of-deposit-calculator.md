---
title: "Certificate of Deposit (CD) Calculator"
metaTitle: "CD Calculator — Certificate of Deposit Maturity & Interest"
description: "Compute exact maturity payout, total interest earned, and early withdrawal trade-offs on fixed-rate bank and credit union certificates of deposit."
metaDescription: "Calculate exact CD maturity value and compounded interest for 6-month to 5-year terms. Compare 2026 CD yields, early withdrawal penalties, and ladders."
metaKeywords: "cd calculator, certificate of deposit calculator, cd maturity calculator, cd interest calculator, cd ladder strategy 2026, cd early withdrawal penalty"
faqs:
  - question: "When do I owe taxes on a multi-year CD—every year or only at maturity?"
    answer: "For standard bank CDs with terms longer than one year, the IRS taxes interest each calendar year as it is credited or made available—even if you leave the earnings compounding inside the certificate until maturity. Your bank issues Form 1099-INT annually. The exception is a short-term CD (12 months or less) that pays all interest only upon maturity in the following tax year."
  - question: "How do early withdrawal penalties work, and can a penalty eat into my original principal?"
    answer: "Most U.S. banks assess a fixed number of days of simple interest on the amount withdrawn—commonly 60 to 90 days on 6- to 12-month CDs, and 180 to 365 days on 2- to 5-year CDs. If you redeem a CD before earning enough accrued interest to cover the penalty, federal rules allow banks to deduct the shortfall directly from your original principal deposit."
  - question: "What happens during the 7-to-10-day grace period when my CD matures?"
    answer: "When your term ends, your bank opens a short grace window—typically 7 to 10 calendar days—during which you can withdraw your balance penalty-free, transfer funds, or select a new term. If you miss that window, most institutions automatically roll your entire balance into a new CD of the same length at whatever standard renewal rate is posted that day, which is often far below promotional rates."
  - question: "What is the difference between a standard bank CD, a no-penalty CD, and a brokered CD?"
    answer: "A standard bank CD locks your rate and charges an interest penalty for early redemption. A no-penalty CD allows full withdrawal after an initial waiting period (usually 6 to 7 days) at zero fee, in exchange for a slightly lower APY. A brokered CD—purchased through a brokerage like Fidelity, Schwab, or Vanguard—cannot be redeemed early at the bank; instead, you sell it on the secondary market where prices fluctuate with prevailing interest rates."
  - question: "When does breaking an older lower-rate CD to open a higher-rate CD actually pay off?"
    answer: "Breaking an existing CD makes mathematical sense whenever the extra interest earned at the higher new rate over your remaining term exceeds the early withdrawal penalty. As a quick test, divide the penalty days' interest cost by the annual rate improvement to find your break-even months; if more months remain on your CD than that break-even figure, switching produces a net gain."
---

## Why Fixed-Rate CD Math Differs From Open-Ended Savings

Unlike a high-yield savings account where your interest rate can drop overnight following a Federal Reserve policy shift, a **Certificate of Deposit (CD)** is a binding fixed-rate contract. You commit a single lump-sum deposit—leaving recurring monthly additions at `$0` unless you hold a rare add-on CD—for a defined term ranging from 3 months to 5 years. In exchange for giving up penalty-free access during that window, the bank or credit union guarantees your interest rate until maturity, backed by FDIC or NCUA deposit insurance up to **$250,000 per depositor, per institution**.

In 2026, that contractual rate lock carries substantial dollar value. While FDIC national average CD yields hover between **1.14% and 1.76% APY** due to legacy branch banks, competitive online banks and credit unions continue offering **4.35% to 5.10% APY** across 6-month to 5-year maturities—letting conservative savers lock in strong yields ahead of potential future rate cuts.

## Exact CD Maturity and Early-Break Formulas

Because standard certificates accept one upfront deposit `P` with zero subsequent contributions (`PMT = 0`), maturity value depends purely on your nominal annual interest rate `r`, compounding frequency `n`, and term length `t` in years:

```text
FV  = P × (1 + r / n)^(n × t)
APY = (1 + r / n)^n - 1
Total Interest = FV - P
```

Key parameter definitions:

- **`P` (Initial Deposit):** The fixed principal locked into the certificate on opening day.
- **`r` (Nominal Annual Interest Rate):** The stated annual rate before compounding (expressed as a decimal, e.g., `0.048` for 4.8%). Note: If entering an already-advertised **APY**, select `Annually (1)` compounding so the calculator does not compound the rate a second time.
- **`n` (Compounding Frequency):** Usually `365` (daily) or `12` (monthly) at U.S. online banks; some credit unions compound quarterly (`4`).
- **`t` (Term in Years):** Express sub-year CDs as fractions (e.g., `0.5` for a 6-month CD, `1.5` for an 18-month CD).

If you ever consider redeeming an older CD early to capture a higher market rate, calculate the exact **break-even horizon** before calling your bank:

```text
Break-Even Months = [ (Penalty Days / 365) × Old Rate ÷ (New Rate - Old Rate) ] × 12
```

For instance, breaking a **3.0% CD** with a **180-day simple-interest penalty** to move into a **4.8% CD** takes `[ (180 / 365) × 3.0% ÷ 1.8% ] × 12 = 9.9 months` to recoup the penalty. If more than 10 months remain on the old certificate, switching leaves you ahead.

## Worked Example: $10,000 in a 3-Year CD at 4.8%

Suppose you lock **$10,000** into a **3-year (36-month) CD** carrying a **4.80% nominal interest rate** (`r = 0.048`) with monthly compounding (`n = 12`) and zero additional deposits:

1. Calculate the monthly periodic rate: `0.048 / 12 = 0.004` (`0.40%` per month).
2. Raise `(1 + 0.004)` to the `36` total months: `(1.004)^36 = 1.154552`.
3. Multiply by your $10,000 deposit: **`$11,545.52`** at maturity.
4. Subtract principal to find total interest: **`$1,545.52`** (`APY = 4.91%`).

Under **daily compounding (`n = 365`)**, the same 4.80% nominal rate yields **`$11,548.73`** (`$1,548.73` interest—just `$3.21` more over three full years).

Now look at the cost of breaking that exact 3-year CD halfway through at **Month 18**. After 18 monthly cycles, your balance stands at `$10,000 × (1.004)^18 = $10,745.01` (`$745.01` accrued interest). Applying a standard **180-day simple-interest penalty** on the $10,000 deposit deducts `$10,000 × 0.048 × (180 / 365) = $236.71`, reducing your net payout to **`$10,508.30`**. Nearly a third of your 18 months of earnings vanishes in one afternoon—which is why matching term length to true liquidity needs matters so much.

## 2026 CD Term Benchmark & Penalty Schedule

The table below contrasts **2026 FDIC national averages** against competitive online CD rates on a **$10,000 deposit** (monthly compounding) alongside typical bank early-withdrawal penalties.

| CD Term | 2026 FDIC National Avg | Competitive Online Rate | Maturity Value ($10,000) | Total Interest Earned | Typical Early Penalty |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **6-Month** | 1.39% APY | 4.45% | $10,225 | $225 | 60–90 days interest |
| **12-Month** | 1.76% APY | 4.75% | $10,485 | $485 | 90 days interest |
| **24-Month** | 1.55% APY | 4.80% | $11,005 | $1,005 | 180 days interest |
| **36-Month** | 1.39% APY | 4.85% | $11,563 | $1,563 | 180–270 days interest |
| **60-Month** | 1.41% APY | 4.90% | $12,770 | $2,770 | 270–365 days interest |

## Structuring a CD Ladder and Dodging Auto-Renewal Traps

### Build a 5-Rung CD Ladder for Liquidity Plus Yield

Instead of locking $50,000 into a single 5-year CD, split it into five **$10,000 rungs** maturing in **1, 2, 3, 4, and 5 years**. Each year, one $10,000 certificate matures penalty-free—either covering planned spending or rolling into a fresh 5-year CD at the top of the ladder. Once the ladder is established, you capture long-term yields while regaining access to 20% of your cash every 12 months.

### Calendar Your Grace Period to Beat Auto-Rollover

Banks count on savers forgetting maturity dates. Set a calendar reminder **14 days before maturity** so you can instruct the institution to disburse or reinvest at a promotional yield rather than auto-renewing at a 0.25% standard renewal tier.

### Scrutinize Callable Brokered CDs and Annual Taxes

Brokered CDs occasionally advertise yields 0.25% to 0.50% above direct bank CDs because they are **callable**—meaning the issuing bank can cancel the CD early if market rates fall, forcing you to reinvest at lower yields right when you wanted protection most. Always verify a brokered CD is labeled **non-callable**, and remember to budget for annual federal and state taxes on multi-year Form 1099-INT interest even when cash remains locked inside the CD.
