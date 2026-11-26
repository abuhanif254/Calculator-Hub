---
title: "Understanding Bonds: The Foundation of a Safe Portfolio"
description: "Learn the difference between coupon rates and yield to maturity, how bond prices react to interest rates, and use our Bond Calculator."
category: "Finance"
relatedCalculator: "bond-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "Why do bond prices fall when market interest rates rise?"
    answer: "Existing bonds carry fixed coupon payments. When newly issued bonds offer higher yields, older bonds with lower fixed coupons must trade at a discount on the secondary market so their total return—combining coupon income and capital appreciation to par—matches current prevailing yields."
  - question: "What is the difference between coupon rate, current yield, and yield to maturity?"
    answer: "The coupon rate is the fixed annual interest divided by par value ($1,000). Current yield divides annual coupon income by the bond's current market price. Yield to Maturity (YTM) is the total annualized internal rate of return earned if you buy the bond at its current price, hold it to maturity, and reinvest all coupons at the same YTM rate."
  - question: "What does modified duration tell a bond investor?"
    answer: "Modified duration measures a bond's price sensitivity to interest rate changes in percentage terms. For each 1.00 percentage point (100 basis points) increase in market yields, a bond's market price drops by approximately its modified duration percentage—for example, roughly 7.8% for a bond with a modified duration of 7.8 years."
  - question: "Are individual bonds safer than bond mutual funds or ETFs?"
    answer: "Holding an individual high-grade bond to maturity guarantees repayment of the $1,000 par value regardless of interim price swings, assuming no issuer default. Bond funds maintain a constant target maturity and never mature, meaning they carry ongoing interest-rate exposure, though they provide superior diversification and liquidity."
  - question: "How are municipal, Treasury, and corporate bonds taxed differently in the US?"
    answer: "US Treasury interest is subject to federal income tax but exempt from state and local income taxes. Corporate bond interest is taxed at federal, state, and local levels. Municipal bond interest is generally exempt from federal income tax—and often state tax if issued in your state of residence—making their tax-equivalent yield attractive in higher brackets."
---

A bond is a negotiable fixed-income debt instrument in which an investor lends capital to a sovereign government, municipality, or corporation in exchange for scheduled coupon interest payments and full principal repayment at a defined maturity date. Within multi-asset portfolios, high-quality bonds dampen equity drawdowns, supply predictable cash flows, and preserve capital over known spending horizons.

Evaluating a bond on the secondary market requires looking beyond its headline coupon rate. Because market interest rates shift daily, secondary-market bond prices float above or below par value (`$1,000`) to equilibrate yields. Calculating exact present value, Yield to Maturity (YTM), and duration sensitivity—tasks streamlined by our [Bond Calculator](/en/calculators/bond-calculator)—prevents overpaying for income streams or taking unintended interest-rate risk.

## Fixed-Income Valuation: Cash Flows, Yields, and Duration

Every standard non-callable fixed-rate bond is defined by three contractual parameters: **Face Value** (`F`, typically `$1,000` par), **Annual Coupon Rate** (`c`, paid semi-annually in US corporate and Treasury markets so each payment is `C = (F × c) / 2`), and **Years to Maturity** (`T`, equaling `N = 2 × T` semi-annual periods).

### Present Value Pricing Formula

A bond's fair market price (`P`) equals the discounted present value of all remaining coupon payments plus the discounted par value at maturity, using the periodic market yield `y = YTM / m` (where `m = 2` for semi-annual compounding):

```text
P = Σ [C / (1 + y)^t] + F / (1 + y)^N   (for t = 1 to N)
P = C × [(1 − (1 + y)^(−N)) / y] + F × (1 + y)^(−N)
```

When market yield equals the coupon rate (`YTM = c`), `P` equals `$1,000` (par). When `YTM > c`, the bond trades below par (at a **discount**); when `YTM < c`, it trades above par (at a **premium**).

### Current Yield vs. Yield to Maturity

Investors routinely confuse three distinct yield metrics:

- **Coupon Rate:** `Annual Coupon / F`. Fixed at issuance; determines cash flow size, not market return.
- **Current Yield:** `Annual Coupon / P`. Captures annual cash income relative to purchase price, ignoring capital gain or loss at maturity.
- **Yield to Maturity (YTM):** The internal rate of return equating `P` to future cash flows. YTM incorporates both coupon income and the pull-to-par convergence of discount or premium pricing.

### Macaulay and Modified Duration

Duration quantifies how sensitive a bond's price is to shifts in interest rates. **Macaulay Duration** (`D_mac`) is the present-value-weighted average time (in years) to receive all cash flows. **Modified Duration** (`D_mod`) translates that into an immediate price elasticity metric:

```text
D_mod = D_mac / (1 + YTM / m)
ΔP / P ≈ −D_mod × ΔYTM
```

Longer maturities and lower coupons increase duration, amplifying price swings for every 100-basis-point (`1.00%`) move in interest rates.

## Worked Example: Discount vs. Premium Pricing on a 5-Year Note

Suppose you evaluate a corporate bond with `$1,000` par value (`F = 1,000`), a `5.00%` annual coupon paid semi-annually (`C = $25.00` every 6 months), and exactly `5 years` remaining to maturity (`N = 10` periods).

1. **Discount Scenario (`YTM = 6.40%`, `y = 0.032`):**
   - Present value of 10 coupons: `$25 × [(1 − 1.032^(−10)) / 0.032] = $211.11`.
   - Present value of `$1,000` par: `$1,000 × 1.032^(−10) = $729.78`.
   - Fair Market Price: `P = $211.11 + $729.78 = $940.89`.
   - Current Yield is `$50 / $940.89 = 5.31%`, while true YTM is `6.40%` because the buyer also locks in `$59.11` of capital appreciation by holding to `$1,000` par. Modified Duration is `4.33 years`.

2. **Premium Scenario (`YTM = 3.60%`, `y = 0.018`):**
   - Present value of 10 coupons: `$25 × [(1 − 1.018^(−10)) / 0.018] = $226.86`.
   - Present value of `$1,000` par: `$1,000 × 1.018^(−10) = $836.68`.
   - Fair Market Price: `P = $226.86 + $836.68 = $1,063.54`.
   - Current Yield reads `4.70%`, yet true YTM is `3.60%` because the `$63.54` premium amortizes away as the bond approaches `$1,000` par at maturity. Modified Duration is `4.42 years`.

## Benchmark Yield Sensitivity Table (10-Year, 5% Semi-Annual Bond)

Longer maturities magnify rate sensitivity. The table below benchmarks a `10-year`, `5.00%` semi-annual `$1,000` par bond (`$50` annual coupon, `N = 20`) across prevailing market yields:

| Market YTM | Pricing Status | Market Price (`P`) | Current Yield | Premium / Discount vs. Par | Modified Duration (`D_mod`) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `3.00%` | Premium | `$1,171.69` | `4.27%` | `+$171.69` (`+17.2%`) | `8.05 years` |
| `4.00%` | Premium | `$1,081.76` | `4.62%` | `+$81.76` (`+8.2%`) | `7.92 years` |
| `5.00%` | Par | `$1,000.00` | `5.00%` | `$0.00` (`0.0%`) | `7.79 years` |
| `6.00%` | Discount | `$925.61` | `5.40%` | `−$74.39` (`−7.4%`) | `7.67 years` |
| `7.00%` | Discount | `$857.88` | `5.83%` | `−$142.12` (`−14.2%`) | `7.53 years` |
| `8.00%` | Discount | `$796.15` | `6.28%` | `−$203.85` (`−20.4%`) | `7.40 years` |

Notice the convexity effect: a `200 bps` yield drop from `5.00%` to `3.00%` lifts price by `+$171.69`, whereas a `200 bps` hike to `7.00%` lowers price by `−$142.12`. Bond prices rise faster when rates fall than they drop when rates climb.

## Portfolio Roles, Credit Risk, and Tax Considerations

When constructing fixed-income allocations, evaluate four structural factors beyond headline YTM:

- **Call Risk and Yield to Worst:** Many corporate and municipal bonds allow issuers to redeem debt early when rates fall, capping investor upside. For callable issues, inspect **Yield to Call (YTC)** and rely on **Yield to Worst (YTW)**—the lowest yield across maturity and all call dates.
- **Tax-Equivalent Yield:** Compare municipal bonds against taxable Treasuries or corporates using `Tax-Equivalent Yield = Muni Yield / (1 − Marginal Federal Tax Rate)`. A `3.80%` federally tax-free municipal bond equals a `6.03%` taxable yield in the `37%` federal bracket.
- **Credit Spreads and Default Risk:** US Treasuries carry virtually zero default risk, whereas investment-grade (`BBB/Baa` or higher) and high-yield corporate bonds offer wider credit spreads that can expand sharply during recessions, reducing diversification when equities fall.
- **Reinvestment and Inflation Risk:** YTM assumes coupons reinvest at the YTM rate; falling rates lower actual realized returns. Pair nominal bonds with Treasury Inflation-Protected Securities (TIPS) or staggered bond ladders to match scheduled cash-flow obligations.
