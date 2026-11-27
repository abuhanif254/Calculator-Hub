---
title: "CAGR Calculator — Compound Annual Growth Rate Formula & Benchmarks"
description: "Calculate Compound Annual Growth Rate (CAGR) for multi-year stock portfolios, ETFs, and SaaS ARR with step-by-step math, benchmarks, and 2026 market context."
faqs:
  - question: "Why does CAGR differ from the average (arithmetic mean) annual return?"
    answer: "Arithmetic average adds yearly percentage returns and divides by the number of years, ignoring the asymmetric math of compounding. Because a 50% drop requires a 100% gain just to break even, volatile sequences cause the arithmetic mean to exceed actual compounded wealth growth. CAGR captures the true geometric rate linking beginning and ending balances."
  - question: "What is a good CAGR for a stock or ETF portfolio over 10 years?"
    answer: "For a broad, low-cost US equity index ETF, a nominal long-term CAGR between 8% and 10% (roughly 5% to 7% inflation-adjusted) aligns with historical equity risk premiums. Outperforming 12% CAGR consistently over a full decade typically requires concentrated growth exposure, higher drawdown tolerance, or exceptional active security selection."
  - question: "What CAGR benchmarks apply to SaaS ARR and private businesses in 2026?"
    answer: "Early-stage SaaS companies below $5 million in Annual Recurring Revenue (ARR) often target 60% to 100%+ CAGR to justify venture valuations, whereas mature public SaaS leaders between $500 million and $2 billion ARR typically sustain 15% to 25% CAGR while shifting focus toward free-cash-flow margin and Rule of 40 efficiency."
  - question: "Can CAGR handle mid-year deposits, withdrawals, or negative ending values?"
    answer: "No. Standard CAGR assumes a single lump-sum starting balance and a single ending balance with all intermediate gains reinvested. If you add or withdraw cash during the period, use Money-Weighted Return (XIRR) or Time-Weighted Return (TWR). Furthermore, CAGR is mathematically undefined when Beginning Value is zero or Ending Value is negative."
  - question: "How can I estimate doubling time from CAGR without a calculator?"
    answer: "Use the Rule of 72 by dividing 72 by your annual CAGR percentage. For example, a portfolio compounding at 9% CAGR doubles roughly every 8 years (72 divided by 9), whereas a SaaS revenue line compounding at 24% CAGR doubles approximately every 3 years. For precise multi-decimal results, divide ln(2) by ln(1 + CAGR)."
---

Compound Annual Growth Rate (CAGR) measures the constant annual rate at which an investment, portfolio, or business metric would have grown from its starting value to its ending value if growth occurred smoothly every year. By compressing volatile multi-year ups and downs into one standardized annualized figure, CAGR lets you compare an equity ETF, a private company's Annual Recurring Revenue (ARR), and a real-asset portfolio on equal footing.

Unlike a simple arithmetic average of yearly returns, CAGR reflects the geometric reality of compounding and sequence drag. Whether you are auditing a 5-year brokerage track record, projecting retirement balances under 2026 contribution limits, or benchmarking SaaS revenue velocity, CAGR reveals how fast capital or top-line revenue actually multiplied.

## Mathematical Formula, Variables & Analytical Methodology

The standard CAGR formula requires only three inputs:

`CAGR = (Ending ÷ Beginning)^(1 ÷ n) − 1`

Where:
- `Beginning` is the initial asset value, portfolio balance, or base-year revenue (`Beginning > 0`).
- `Ending` is the final value at the close of the measurement period (`Ending ≥ 0`).
- `n` is the total number of compounding periods in years (for partial years, express `n` as a decimal, such as `n = 3.5` for 42 months, or `days ÷ 365.25`).

To express the result as a percentage, multiply the decimal output by `100`. Conversely, if you already know a target CAGR and want to project future scale, rearrange the identity to `Ending = Beginning × (1 + CAGR)^n`.

Under CFA Institute Global Investment Performance Standards (GIPS) and SEC Marketing Rule guidance, multi-year performance disclosures rely on annualized geometric returns rather than simple averages because geometric returns preserve exact dollar outcomes. Note, however, that CAGR is strictly a **point-to-point** metric: it uses only the starting and ending values, treating intermediate cash inflows or outflows as zero. When evaluating an IRA or 401(k) receiving monthly payroll contributions—such as maximizing 2026 IRS elective deferral thresholds—investors should pair portfolio CAGR (or Time-Weighted Return) with XIRR to separate asset performance from savings behavior.

## Step-by-Step Worked Practical Example

Suppose an investor deploys `$125,000` into a growth-oriented ETF sleeve (or tracks a B2B software product starting at `$125,000` ARR) over `5` full years (`n = 5`). Performance fluctuates sharply across market cycles:

- **Year 1 (+25%):** `$125,000 × 1.25 = $156,250`
- **Year 2 (−20%):** `$156,250 × 0.80 = $125,000`
- **Year 3 (+25%):** `$125,000 × 1.25 = $156,250`
- **Year 4 (+28%):** `$156,250 × 1.28 = $200,000`
- **Year 5 (+25%):** `$200,000 × 1.25 = $250,000`

Notice what happens if you take a naive arithmetic average of those five yearly percentages:
`Arithmetic Mean = (25 − 20 + 25 + 28 + 25) ÷ 5 = 83 ÷ 5 = 16.60%`

Now compute the true CAGR using `Beginning = $125,000`, `Ending = $250,000`, and `n = 5`:

1. **Calculate the Growth Multiple:**
   `Ending ÷ Beginning = $250,000 ÷ $125,000 = 2.00` (a `100.00%` cumulative doubling)

2. **Raise the Multiple to the `(1 ÷ n)` Power:**
   `2.00^(1 ÷ 5) = 2.00^0.20 = 1.148698`

3. **Subtract `1` and Convert to Percentage:**
   `CAGR = 1.148698 − 1 = 0.148698` or `14.87%` per year

Even though the arithmetic average looked like `16.60%`, actual compounded wealth grew at `14.87%` annually—a `1.73` percentage-point gap caused purely by Year 2's 20% drawdown. Checking the Rule of 72 confirms the intuition: `72 ÷ 14.87 ≈ 4.84 years` to double, aligning closely with the actual 5-year doubling.

## Multi-Year CAGR Benchmarks & Doubling Horizon Table

Use the table below to contextualize annualized growth rates across public markets, private SaaS scaling stages, and long-term wealth targets.

| CAGR Rate | 5-Year Multiple (`$100k` Base) | 10-Year Multiple (`$100k` Base) | Approx. Doubling Time (Rule of 72) | Representative Asset / Business Benchmark |
| :--- | :--- | :--- | :--- | :--- |
| 4.5% | 1.25x (`$124,618`) | 1.55x (`$155,297`) | 16.0 years | High-grade fixed income / cash equivalents |
| 8.0% | 1.47x (`$146,933`) | 2.16x (`$215,892`) | 9.0 years | Balanced 60/40 stock-bond portfolio |
| 10.0% | 1.61x (`$161,051`) | 2.59x (`$259,374`) | 7.2 years | Broad US large-cap equity ETF (long-run nominal) |
| 15.0% | 2.01x (`$201,136`) | 4.05x (`$404,556`) | 4.8 years | Mature public SaaS / high-conviction growth equity |
| 25.0% | 3.05x (`$305,176`) | 9.31x (`$931,323`) | 2.9 years | Mid-market SaaS expansion (`$50M–$250M` ARR) |
| 50.0% | 7.59x (`$759,375`) | 57.67x (`$5,766,504`) | 1.4 years | Early-stage venture SaaS (`$1M–$10M` ARR) |

Small differences in CAGR compound dramatically over a decade. Moving from an `8.0%` CAGR to a `10.0%` CAGR adds `$43,482` on a `$100,000` initial investment over 10 years—demonstrating why expense ratios, advisory fees, and annual tax drag matter disproportionately over long horizons. For equity ETFs, always verify whether historical CAGR reflects **total return** (dividends reinvested) rather than price return alone, because reinvested dividends routinely account for two to three percentage points of long-term annualized compounding.

## Strategic Insights, Common Mistakes & Risk Caveats

While CAGR is indispensable for multi-year comparisons, relying on it blindly creates blind spots:

- **Endpoint Sensitivity (Cherry-Picking Dates):** Because CAGR only inspects `Beginning` and `Ending`, shifting a start date from a market peak to a market trough can swing a 5-year CAGR by 5 to 10 percentage points. Always test rolling 3-year or 5-year CAGRs to verify consistency.
- **Hidden Drawdown Volatility:** Two portfolios can post identical `10.0%` 5-year CAGRs while delivering completely different investor experiences—one compounding steadily, the other suffering a 45% mid-cycle crash. Pair CAGR with maximum drawdown and Sharpe ratio before committing capital.
- **Gross vs. Net-of-Fee & Inflation-Adjusted CAGR:** Mutual fund and ETF expense ratios, trading spreads, and 2026 federal/state capital gains taxes directly reduce realized CAGR. Subtracting annual CPI inflation from nominal CAGR gives **Real CAGR**, which measures true purchasing-power expansion.
- **Unsustainable Extrapolation:** Early-stage SaaS ARR compounding at 60% CAGR almost always decelerates as market penetration rises; linear extrapolation of peak historical CAGR leads to distorted valuation models.

*Disclaimer: This content is for educational and analytical illustration only and does not represent personalized investment, accounting, or tax advice. Past compound growth rates do not guarantee future market returns.*
