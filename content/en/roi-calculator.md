---
title: "ROI Calculator (Return on Investment) — Formula, CAGR & Benchmarks"
description: "Calculate Return on Investment (ROI) and annualized CAGR for stocks, real estate, and marketing with verified formulas, 2026 benchmarks, and tax context."
faqs:
  - question: "What is the difference between simple ROI and annualized ROI (CAGR)?"
    answer: "Simple ROI measures total cumulative gain or loss relative to your initial cost regardless of how long you held the asset. Annualized ROI, calculated via Compound Annual Growth Rate (CAGR), normalizes that return to an equivalent yearly compounding rate so you can fairly compare a 9-month marketing sprint against a 5-year stock or real estate investment."
  - question: "What is considered a good ROI in 2026 across stocks, real estate, and business?"
    answer: "Benchmarks vary by asset risk and holding period. Historically, diversified US equities return roughly 7% to 10% annualized before inflation, commercial and residential real estate often target 8% to 12% cash-on-cash or total annualized returns, and high-performing digital marketing campaigns commonly target 300% to 500% gross campaign ROI (a 4:1 to 6:1 revenue-to-spend ratio before overhead)."
  - question: "Should ROI be calculated on total asset price or only cash invested?"
    answer: "For leveraged investments such as mortgaged rental properties or margin accounts, calculate ROI on your actual cash outlay—including down payment, closing costs, and upfront repairs—rather than the property sticker price. Using cash invested captures the true return on your capital at risk, whereas return on total asset value measures unlevered property performance."
  - question: "How do 2026 US capital gains taxes affect realized investment ROI?"
    answer: "Federal long-term capital gains rates of 0%, 15%, or 20%—plus the 3.8% Net Investment Income Tax for higher earners above statutory MAGI thresholds—reduce your final net proceeds when you sell in a taxable account. Short-term gains held one year or less are taxed at ordinary income brackets up to 37% under 2026 IRS schedules, sharply lowering after-tax ROI."
  - question: "Can ROI be negative, and when does ROI break down as a metric?"
    answer: "Yes. When final proceeds fall below your initial investment, ROI is negative, down to -100% for unlevered total loss (or worse with leverage). ROI breaks down when cash flows occur unevenly across years, when opportunity cost is ignored, or when initial outlay approaches zero; in those cases, use Internal Rate of Return (IRR) or Net Present Value (NPV)."
---

Return on Investment (ROI) measures how efficiently capital generates profit relative to its original cost. By dividing net gain by the initial capital outlay and expressing the result as a percentage, ROI gives investors, operators, and marketers a single, portable ratio to evaluate whether a stock position, rental property, equipment purchase, or ad campaign outperformed its alternatives.

Because simple ROI ignores time, pairing it with annualized Compound Annual Growth Rate (CAGR) is essential whenever holding periods differ. A 40% cumulative gain earned over 12 months represents extraordinary capital velocity, whereas the exact same 40% gain stretched across 10 years trails basic Treasury yields and inflation.

## Mathematical Formula, Variables & Industry Methodology

Standard simple ROI compares ending value against initial cost basis:

`ROI = [(Final − Initial) ÷ Initial] × 100`

Where `Initial` is the total upfront cost basis (purchase price, commissions, closing fees, setup costs, or ad spend) and `Final` is the ending market value or cumulative net proceeds (including dividends, rental cash flow, or attributed gross margin). An equivalent expression uses net profit directly: `ROI = (Net Gain ÷ Initial) × 100`.

To compare investments across different time horizons, convert total growth into an annualized rate using CAGR:

`Annualized CAGR = (Final ÷ Initial)^(1 ÷ n) − 1`

Here `n` denotes the holding period in years (for example, `n = 2.5` for 30 months). Standard CFA Institute performance presentation principles and SEC marketing rules emphasize time-weighted or annualized metrics whenever multi-year returns are compared, because quoting cumulative multi-year ROI without an annualized figure can overstate moderate yearly compounding.

In corporate finance and marketing, practitioners also adjust the numerator carefully. For marketing ROI, attributing profit rather than top-line revenue prevents inflated ratios: `Marketing ROI = [(Attributed Gross Profit − Campaign Cost) ÷ Campaign Cost] × 100`. Similarly, real estate investors separate **Cash-on-Cash ROI** (annual pre-tax cash flow divided by cash invested) from **Total ROI**, which adds principal amortization and property appreciation.

## Step-by-Step Worked Practical Example

Suppose a US investor allocates `$50,000` into an equipment upgrade or diversified equity position (all figures in USD) and holds the asset for exactly `4` years (`n = 4`). After accounting for reinvested distributions and selling expenses, the gross liquidation value reaches `$73,205`.

1. **Compute Net Dollar Gain:**
   `Net Gain = $73,205 − $50,000 = $23,205`

2. **Compute Simple Cumulative ROI:**
   `ROI = ($23,205 ÷ $50,000) × 100 = 0.4641 × 100 = 46.41%`

3. **Convert to Annualized CAGR:**
   `Annualized CAGR = ($73,205 ÷ $50,000)^(1 ÷ 4) − 1`
   `Annualized CAGR = (1.4641)^0.25 − 1 = 1.10 − 1 = 0.1000` or `10.00%` per year

4. **Apply 2026 After-Tax Adjustment (Taxable Account Example):**
   Assume the investor falls into the 15% federal long-term capital gains bracket under 2026 IRS schedules (no state tax or NIIT assumed for illustration). Federal tax due on the realized gain is `$23,205 × 0.15 = $3,480.75`.
   - After-Tax Final Value = `$73,205 − $3,480.75 = $69,724.25`
   - After-Tax Net Gain = `$19,724.25`
   - After-Tax Cumulative ROI = `($19,724.25 ÷ $50,000) × 100 = 39.45%`
   - After-Tax Annualized CAGR = `(69,724.25 ÷ 50,000)^0.25 − 1 = 8.67%` per year

Notice how tax drag reduces cumulative ROI by nearly 7 percentage points and trims annualized compounding by 1.33 percentage points annually. Modeling after-tax proceeds before redeploying capital helps avoid overestimating real spendable wealth.

## ROI Benchmarks Across Asset Classes & Use Cases

The table below illustrates realistic gross ROI and annualized return profiles across common investment categories, alongside typical risk and liquidity trade-offs.

| Investment Category | Typical Time Horizon | Target Simple ROI | Target Annualized CAGR | Primary Risk / Cost Driver |
| :--- | :--- | :--- | :--- | :--- |
| US Treasury Bills / Money Market | 3–12 months | 3.5%–5.0% | 3.5%–5.0% | Reinvestment & inflation drag |
| Investment-Grade Corporate Bonds | 3–7 years | 15%–40% | 4.5%–6.0% | Interest-rate duration & credit risk |
| Diversified US Equity Index (S&P 500) | 5–20 years | 60%–300%+ | 7.0%–10.0% | Market drawdowns & sequence risk |
| Residential Rental Real Estate | 5–10 years | 50%–150% | 8.0%–12.0% | Vacancy, capex, & mortgage leverage |
| Small Business Equipment / Capex | 2–5 years | 40%–120% | 15.0%–25.0% | Obsolescence & utilization shortfalls |
| Paid Digital Marketing Campaign | 1–6 months | 200%–500% | N/A (short cycle) | Attribution leakage & rising CAC |

For short-cycle marketing campaigns, annualizing a 30-day return produces absurdly large exponential percentages because the capital cannot be infinitely redeployed at the same marginal customer acquisition cost (CAC). Always report short-term campaigns in simple ROI or Return on Ad Spend (ROAS), reserving CAGR for multi-year capital commitments. When evaluating business equipment or rental real estate, remember that tax depreciation deductions and subsequent depreciation recapture upon sale can meaningfully alter net after-tax proceeds.

## Strategic Insights, Common Mistakes & Risk Caveats

Even seasoned operators misread ROI when key inputs are omitted. Watch for four recurring pitfalls:

- **Comparing Revenue to Profit:** Marketing teams frequently quote ROAS (`Revenue ÷ Ad Spend`) as ROI. If a campaign generates `$40,000` in revenue on `$10,000` of ad spend (a 4.0x ROAS) at a 35% gross margin, gross profit is `$14,000` and net campaign profit is `$4,000`—yielding a true Marketing ROI of `40%`, not `300%`.
- **Ignoring Ongoing Holding Costs:** In real estate and equipment investments, failing to deduct property taxes, insurance, HOA fees, routine repairs, and financing interest from `Final` artificially inflates ROI.
- **Overlooking Leverage Risk:** Borrowing 80% of an asset's value magnifies positive ROI during rising markets, but amplifies downside losses just as quickly if asset prices dip or debt service exceeds operating income.
- **Neglecting Inflation and Opportunity Cost:** A 4.0% nominal ROI during a 3.0% inflation year yields roughly 1.0% in real purchasing-power growth. Always benchmark proposed projects against a low-risk baseline such as short-term US Treasuries.

*Disclaimer: This article and the accompanying ROI calculator are provided strictly for educational and informational purposes and do not constitute personalized investment, tax, legal, or financial advice. Consult a qualified CPA, CFP, or fiduciary advisor regarding your specific 2026 tax situation and risk tolerance.*
