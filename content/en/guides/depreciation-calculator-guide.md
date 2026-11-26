---
title: "Understanding Depreciation: How Assets Lose Value Over Time"
description: "Learn the difference between straight-line and declining balance depreciation, and use our Depreciation Calculator for your business assets."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "depreciation-calculator"
relatedType: "calculator"
faqs:
  - question: "What is the main difference between Straight-Line and Double Declining Balance depreciation?"
    answer: "Straight-Line depreciation expenses an equal dollar amount every year across an asset's useful life, keeping net income smooth. Double Declining Balance (200% DDB) multiplies the straight-line percentage by 2 and applies it to the declining book value, front-loading massive deductions into Years 1 and 2 while preserving the same total lifetime depreciation."
  - question: "Is land depreciable for business accounting or IRS taxes?"
    answer: "No. Neither GAAP accounting rules nor the IRS permit depreciation of land because land is assumed to have an unlimited useful life. When purchasing real estate (such as a warehouse or residential rental property), you must allocate the purchase price between land and building improvements—using property tax assessments or an appraisal—and depreciate only the building basis."
  - question: "How does GAAP book depreciation differ from IRS MACRS tax depreciation?"
    answer: "GAAP (ASC 360) aligns depreciation with an asset's actual economic useful life and estimated salvage value using Straight-Line, Declining Balance, or Units of Production. For U.S. federal tax returns, the IRS mandates MACRS (Modified Accelerated Cost Recovery System), which assumes zero salvage value, assigns fixed recovery periods (such as 5 years for vehicles or 27.5 years for residential rentals), and applies half-year or mid-quarter conventions."
  - question: "Why does a 5-year MACRS schedule span 6 tax years?"
    answer: "Under the standard IRS MACRS half-year convention, property placed in service during any month of Year 1 is treated as placed in service at the midpoint of the tax year, allowing only half a year of depreciation in Year 1. The remaining half-year recovery spills over into Year 6, producing standard 5-year percentages of 20.00%, 32.00%, 19.20%, 11.52%, 11.52%, and 5.76%."
  - question: "What happens when you sell a depreciated asset for more than its book value?"
    answer: "Selling a business asset above its adjusted tax basis triggers depreciation recapture. For personal property such as machinery, computers, or vehicles (Section 1245), gains attributable to prior depreciation are taxed as ordinary income rather than lower long-term capital gains rates. For depreciated real estate (Section 1250), unrecaptured depreciation is taxed up to a 25% federal cap."
---

**Depreciation** is the systematic allocation of a tangible asset's cost over its productive useful life to match expense recognition with the revenue the asset generates. While consumers experience vehicle or equipment depreciation as silent wealth erosion, businesses treat depreciation as a non-cash operating expense on financial statements and a powerful tax shield on IRS Form 4562.

Selecting between **Straight-Line**, **Declining Balance (Accelerated)**, **Sum-of-Years'-Digits (SYD)**, or **IRS MACRS** schedules does not change an asset's total lifetime write-off—it governs *when* those deductions hit your income statement and cash flow. Generate full year-by-year book value schedules across methods in our [Depreciation Calculator](/en/calculators/depreciation-calculator).

## Core Depreciation Methods and Formulas

Every standard accounting depreciation schedule operates on three core inputs: original **Asset Cost (`C`)**, estimated **Salvage Value (`S`)** at retirement, and **Useful Life (`n`)** in years (or total production units).

```text
Depreciable Base           = C − S
Straight-Line (SL)         = (C − S) / n
Declining Balance (DB)     = min(Book Value_(t−1) × (Multiplier / n), Book Value_(t−1) − S)
Sum-of-Years'-Digits (SYD) = (C − S) × [(n − t + 1) / (n × (n + 1) / 2)]
Units of Production        = (C − S) × (Units Produced in Year t / Total Lifetime Units)
```

Where:
- `C` is total capitalized acquisition cost, including purchase price, freight, sales tax, and installation (`$`).
- `S` is expected residual or scrap value at the end of useful life (`$`).
- `Multiplier` defines acceleration intensity: `2.0` for **200% Double Declining Balance (DDB)** or `1.5` for **150% Declining Balance**.
- `Book Value_(t−1)` starts at full `C` in Year 1 (`t = 1`), **not** `C − S`. However, cumulative depreciation stops once `Book Value` reaches `S`.

Under **Sum-of-Years'-Digits (SYD)**, the denominator for a 5-year asset is `5 × 6 / 2 = 15`, so Year 1 deducts `5/15` (`33.33%`) of the depreciable base, stepping down smoothly to `1/15` (`6.67%`) in Year 5.

## Step-by-Step Worked Example: $60,000 Commercial Equipment

Suppose a manufacturing firm purchases a CNC machine for **$60,000** (`C`, including delivery and setup), estimates a **$6,000** salvage value (`S`), and assigns a **5-year useful life** (`n = 5`). The **Depreciable Base** is `$60,000 − $6,000 = $54,000`.

1. **Straight-Line Schedule:**
   Divide the depreciable base evenly: `$54,000 / 5 = $10,800/year`. Book value drops linearly by `$10,800` annually from `$60,000` down to `$6,000` at the end of Year 5.
2. **200% Double Declining Balance (DDB) Schedule:**
   The straight-line rate is `1 / 5 = 20%`, so the 200% DDB rate is **40%**, applied each year to **beginning book value**:
   - **Year 1:** `$60,000 × 40% = $24,000` expense; Ending Book Value = `$36,000`.
   - **Year 2:** `$36,000 × 40% = $14,400` expense; Ending Book Value = `$21,600`.
   - **Year 3:** `$21,600 × 40% = $8,640` expense; Ending Book Value = `$12,960`.
   - **Year 4:** `$12,960 × 40% = $5,184` expense; Ending Book Value = `$7,776`.
   - **Year 5 (Salvage Floor Cap):** `40%` of `$7,776` would be `$3,110.40`, pushing book value below the `$6,000` salvage floor. Deduction is therefore capped at `$7,776 − $6,000 = $1,776`.
3. **Compare Front-Loaded Tax Shield:**
   Over Years 1 and 2 combined, DDB deducts **$38,400** (`71.1%` of the `$54,000` base) versus **$21,600** (`40.0%`) under Straight-Line. At a `21%` federal corporate tax rate (or `24%+` pass-through marginal rate), that `$16,800` timing acceleration keeps `$3,528` to `$4,032+` of cash inside the business early.

## 5-Year Method Comparison Table ($60,000 Cost, $6,000 Book Salvage)

Notice that all three GAAP book methods sum to exactly **$54,000** (`$6,000` ending book value), whereas **IRS MACRS (5-Year GDS, Half-Year Convention)** ignores salvage value and recovers the entire **$60,000** cost across six tax-filing years.

| Year | Straight-Line Expense | 200% DDB Expense | SYD Expense | IRS MACRS (5-Yr GDS, $0 Salvage) | Ending Book Value (DDB) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Year 1 | $10,800 | $24,000 | $18,000 | $12,000 (20.00%) | $36,000 |
| Year 2 | $10,800 | $14,400 | $14,400 | $19,200 (32.00%) | $21,600 |
| Year 3 | $10,800 | $8,640 | $10,800 | $11,520 (19.20%) | $12,960 |
| Year 4 | $10,800 | $5,184 | $7,200 | $6,912 (11.52%) | $7,776 |
| Year 5 | $10,800 | $1,776 | $3,600 | $6,912 (11.52%) | $6,000 |
| Year 6 (MACRS Half-Yr) | $0 | $0 | $0 | $3,456 (5.76%) | $6,000 |
| **Cumulative Total** | **$54,000** | **$54,000** | **$54,000** | **$60,000 (100.00%)** | **$6,000 (Book) / $0 (Tax)** |

## Practical Use Cases, Tax Elections, and Accounting Caveats

Businesses routinely maintain **two parallel depreciation ledgers**: one under **GAAP (ASC 360)** for lenders and investors—often using Straight-Line to avoid artificially depressing Year 1 EBITDA—and a second **tax basis ledger** under **IRS Publication 946 (MACRS)** to accelerate cash tax savings.

- **Section 179 and Bonus Depreciation:** Rather than waiting 5 or 7 years under MACRS, qualifying businesses often elect **IRC Section 179** immediate expensing or federal **Bonus Depreciation** on eligible equipment, heavy SUVs/trucks (`>6,000 lb` GVWR), and qualified improvement property—subject to annual statutory limits and taxable-income phaseouts. Verify current-year Form 4562 thresholds with your CPA before year-end capital purchases.
- **Units of Production for heavy usage variability:** For mining trucks, CNC spindles, or aircraft engines whose wear tracks mileage or operating hours rather than calendar months, **Units of Production** prevents over-depreciating idle machinery during slow quarters.
- **Avoid depreciating below salvage value:** A frequent spreadsheet bug under Declining Balance applies `Book Value × Rate` in the final year without a `min(..., Book Value − Salvage)` clamp, accidentally overstating cumulative expense.
- **Plan for depreciation recapture on exit:** Accelerated write-offs are an interest-free tax deferral, not permanent forgiveness if the asset retains resale value. Selling fully depreciated equipment (`$0` tax basis) for `$18,000` creates `$18,000` of **Section 1245 ordinary recapture income** in the year of sale unless offset by new capital investments or a structured trade-in where permitted.
