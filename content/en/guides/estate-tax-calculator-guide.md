---
title: "Estate Tax vs. Inheritance Tax: What You Need to Know"
description: "Understand the difference between federal estate tax and state inheritance tax, 2026 lifetime exemptions, portability, and how to model liability with our Estate Tax Calculator."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "estate-tax-calculator"
faqs:
  - question: "What is the primary legal difference between an estate tax and an inheritance tax?"
    answer: "An estate tax is assessed on the total net value of a deceased person's estate before any assets are distributed to heirs, and the estate itself pays the tax. An inheritance tax is levied directly on individual beneficiaries after distribution, with tax rates and exemptions determined by each heir's legal relationship to the decedent."
  - question: "What is the federal estate tax exemption in 2026?"
    answer: "For 2026, the federal estate and gift tax basic exclusion amount is $15,000,000 per individual, or $30,000,000 for married couples utilizing spousal portability. Under the One Big Beautiful Bill Act enacted in July 2025, this higher threshold became permanent and will adjust annually for inflation rather than sunsetting."
  - question: "Which US states impose both an estate tax and an inheritance tax?"
    answer: "Maryland is the only US jurisdiction that levies both a state estate tax (with a $5,000,000 exemption) and a state inheritance tax (10% on non-exempt beneficiaries). Twelve states plus the District of Columbia impose an estate tax, five states impose an inheritance tax, and 33 states levy neither."
  - question: "How does spousal portability work for married couples?"
    answer: "Portability allows a surviving spouse to elect on a timely filed IRS Form 706 to claim any unused portion of their deceased spouse's $15,000,000 federal exclusion, known as the Deceased Spousal Unused Exclusion (DSUE). Combined with their own exclusion, this shields up to $30,000,000 federally, though most state estate taxes do not recognize portability."
  - question: "Do life insurance payouts and retirement accounts count toward the taxable estate?"
    answer: "Yes. Even though life insurance death benefits are generally income-tax-free to beneficiaries, the full policy proceeds are included in the decedent's gross estate if the decedent held any incidents of ownership at death. Balances in 401(k) plans, IRAs, and brokerage accounts are likewise included at fair market value."
---

An **estate tax** and an **inheritance tax** both tax wealth transfers at death, yet they differ fundamentally in who bears the legal liability and how the bill is calculated. An estate tax is levied on the decedent's net estate before assets are distributed, whereas an inheritance tax is paid by individual heirs based on the share they receive and their familial relationship to the decedent.

At the federal level, the United States imposes only an estate tax—with a 2026 basic exclusion amount of **$15,000,000 per individual** ($30,000,000 for married couples electing portability) and a top marginal rate of **40%**. Because state thresholds drop as low as $1,000,000 in Oregon and $2,000,000 in Massachusetts, modeling both layers with our [Estate Tax Calculator](/en/calculators/estate-tax-calculator) is essential for multi-generational planning.

## Core Methodology and Tax Formulas

Federal and state transfer taxes operate on a unified net-worth accounting framework rather than on liquid cash alone. Under Internal Revenue Code (IRC) Section 2001, the IRS aggregates worldwide assets owned or controlled by the decedent at date-of-death fair market value, subtracts allowable deductions, and applies the statutory exclusion.

```text
Gross Estate = Real Estate + Financial Accounts + Business Interests + Life Insurance Proceeds + Prior Taxable Gifts
Taxable Estate = Gross Estate − (Mortgages & Debts + Administration & Funeral Expenses + Marital Deduction + Charitable Bequests)
Federal Estate Tax = max(0, Taxable Estate − Federal Exclusion) × 0.40
```

Where each parameter follows strict statutory definitions:

- **Gross Estate:** Fair market value on the date of death (or six months later under the IRC Section 2032 alternate valuation date if it lowers both gross value and tax due).
- **Marital Deduction:** Unlimited deduction for qualifying assets passing outright or via a Qualified Terminable Interest Property (QTIP) trust to a surviving US-citizen spouse.
- **Federal Exclusion ($15,000,000 in 2026):** Unified lifetime credit covering both lifetime taxable gifts above the $19,000 annual per-recipient exclusion ($38,000 for gift-splitting spouses) and transfers at death.
- **Effective 40% Flat Excess Rate:** Although IRC Section 2001(c) lists progressive brackets up to $1,000,000, the unified credit absorbs the lower brackets entirely, meaning every taxable dollar above the $15,000,000 exclusion faces a flat 40% federal rate.

### State Estate Tax Mechanics and Cliff Jurisdictions

Unlike the federal regime, state estate taxes apply independent exemptions, progressive schedules (typically 8% to 20%), and distinct rules on portability. Most state estate tax jurisdictions do not grant spousal portability, meaning an unplanned transfer of all assets to a surviving spouse can waste the first spouse's state-level exemption.

## Step-by-Step Worked Numerical Example

Consider a single resident of a zero-tax state (such as Florida or Texas) who passes away in 2026 leaving an estate with **$500,000** in prior lifetime taxable gifts above the annual exclusion:

1. **Sum the Gross Estate:** Primary residence and rentals ($7,200,000) + taxable brokerage and 401(k) accounts ($8,800,000) + business equity ($2,000,000) + life insurance proceeds ($1,000,000) = **$19,000,000**.
2. **Subtract Allowable Deductions:** Mortgages ($650,000) + probate, legal, and funeral expenses ($150,000) + charitable bequest ($200,000) = **$1,000,000**.
3. **Compute Taxable Estate:** `$19,000,000 − $1,000,000 = $18,000,000`.
4. **Adjust Remaining Exclusion:** `$15,000,000 − $500,000 = $14,500,000`.
5. **Calculate Federal Estate Tax Due:** `($18,000,000 − $14,500,000) × 0.40 = $1,400,000`.

The estate pays **$1,400,000** within nine months via Form 706, leaving **$16,600,000** net for heirs. Placing the $1,000,000 policy inside an Irrevocable Life Insurance Trust (ILIT) more than three years before death would lower the taxable estate to $17,000,000 and save **$400,000**.

## 2026 Federal vs. State Transfer Tax Comparison

Seventeen states plus Washington, D.C. impose state-level estate or inheritance taxes in 2026, while 33 states impose neither. The table below benchmarks the most consequential regimes for estate planning:

| Jurisdiction | Tax Type | 2026 Exemption Threshold | Marginal Rate Range | Spousal Portability | Key Planning Feature |
|---|---|---|---|---|---|
| **Federal (IRS)** | Estate Tax | $15,000,000 ($30M married) | 40% above exemption | Yes (Form 706) | Permanent under 2025 OBBBA; inflation-indexed |
| **Oregon** | Estate Tax | $1,000,000 | 10% – 16% | No | Lowest estate threshold in the US |
| **Massachusetts** | Estate Tax | $2,000,000 | 0.8% – 16% | No | True credit eliminates tax below $2M |
| **New York** | Estate Tax | ~$7,350,000 (indexed) | 3.06% – 16% | No | Estate tax cliff above 105% of threshold |
| **Maryland** | Both Estate & Inheritance | $5,000,000 (estate); $0 (non-exempt heirs) | Up to 16% estate; 10% inheritance | Yes (state estate) | Only state imposing both taxes |
| **Pennsylvania** | Inheritance Tax | $0 (0% spouse; varies by class) | 4.5% (children), 12% (siblings), 15% (other) | N/A | Taxes direct descendants from first dollar |
| **New Jersey** | Inheritance Tax | $0 for Class C/D/E; Class A exempt | 11% – 16% (siblings & unrelated) | N/A | Children, parents, and spouses pay 0% |

## Common Pitfalls, Valuation Risks, and Regulatory Caveats

* **The New York Estate Tax Cliff:** If a New York taxable estate exceeds 105% of the basic exclusion, the entire exclusion vanishes retroactively—taxing the estate from dollar one rather than only the excess, creating marginal rates exceeding 100%.
* **Income-Tax-Free vs. Estate-Tax-Free:** Beneficiaries receive life insurance proceeds and Roth IRA balances free of federal income tax, yet both assets count dollar-for-dollar in the decedent's gross estate unless held outside estate ownership (such as in an ILIT).
* **Illiquid Estate Deadlines:** IRS Form 706 and tax payment are due **nine months** after death (with a six-month filing extension available, though unpaid tax accrues interest unless deferred under IRC Section 6166 for qualifying businesses). Real estate or private equity estates without cash liquidity risk forced asset sales.
* **Step-Up in Cost Basis Trade-Offs:** Assets held until death generally receive a stepped-up basis to fair market value under IRC Section 1014, erasing unrealized capital gains. Gifting appreciated stock early removes future growth from the estate but transfers embedded capital gains tax to the recipient.
* **Non-Resident Situs Property:** Residents of zero-tax states still owe non-resident state estate or inheritance tax on real estate or tangible business assets physically located in states such as Massachusetts, Oregon, or Pennsylvania.
