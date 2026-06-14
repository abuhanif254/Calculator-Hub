import { ToolConfig } from './types';

export const mortgageCalculatorUkConfig: ToolConfig = {
  slug: "mortgage-calculator-uk",
  title: "Mortgage Calculator UK",
  shortDescription: "Calculate your monthly mortgage payments in the UK with our advanced calculator. Supports repayment and interest-only mortgages, loan-to-value (LTV) tier analysis, overpayments, added fees, salary affordability checks, and a full amortization schedule.",
  category: "Financial Calculators",
  keywords: [
    "mortgage calculator uk",
    "uk mortgage guide",
    "mortgage payments explained",
    "first-time buyer mortgage",
    "buy-to-let mortgage",
    "mortgage interest rates",
    "loan-to-value ltv",
    "mortgage overpayments",
    "fixed vs variable mortgages",
    "mortgage affordability"
  ],
  features: [
    "Accurate UK mortgage calculations for standard Repayment (Capital & Interest) and Interest-Only mortgages",
    "Real-time Loan-to-Value (LTV) tier analyzer highlighting your position across major UK lending brackets (<60%, 75%, 80%, etc.)",
    "Advanced Overpayment Simulator supporting monthly overpayments, annual lump sums, and one-off payments to calculate interest and years saved",
    "Flexible Mortgage Fees editor to compute upfront arrangement, broker, product, and legal fees, with options to add them to the loan balance",
    "Salary-based affordability estimate checking borrowing multiples against the typical UK 4.5x - 5x income constraints",
    "Interactive charts illustrating mortgage composition (principal, interest, fees) and comparison curves showing balance over time",
    "Complete dynamic amortization schedule table showing monthly payments, breakdown, and remaining balances with pagination",
    "Multiple export choices: instantly print reports, copy sharing URLs, or export schedule data directly as CSV / Excel"
  ],
  useCases: [
    "UK First-Time Buyers trying to estimate monthly repayments and deposit percentages needed to buy a home",
    "Existing homeowners planning to remortgage and compare fixed vs tracker rate structures",
    "Property investors evaluating Buy-to-Let (BTL) interest-only mortgage payments against rental yields",
    "Borrowers wanting to assess how making extra overpayments will accelerate their payoff date and save interest costs",
    "Mortgage advisors creating comprehensive scenarios and printable payment sheets for their clients"
  ],
  howToSteps: [
    "Enter the Property Value and your Deposit amount. The calculator will instantly determine your Loan-to-Value (LTV) percentage.",
    "Input the annual Interest Rate and choose a Mortgage Term (e.g., 25 years or 30 years).",
    "Select your Repayment Type (Repayment or Interest Only) and Payment Frequency (Monthly, Fortnightly, or Weekly).",
    "Optional: Expand the Advanced Options to add broker/product fees, input monthly/yearly overpayments, or perform income affordability stress tests.",
    "Review your monthly repayment summary, amortization graphs, and LTV savings suggestions in the Results Dashboard.",
    "Use the export tools to print a clean PDF report, download the amortization schedule as a CSV spreadsheet, or share your scenario via a custom link."
  ],
  relatedTools: [
    { name: "Mortgage Calculator", slug: "mortgage-calculator" },
    { name: "Loan Calculator", slug: "loan-calculator" },
    { name: "Interest Calculator", slug: "interest-calculator" },
    { name: "Compound Interest Calculator", slug: "compound-interest-calculator" },
    { name: "Savings Calculator", slug: "savings-calculator" }
  ],
  examples: [
    {
      title: "Standard UK First-Time Buyer",
      description: "A standard purchase scenario with a 10% deposit (£25,000) on a £250,000 property at 4.5% interest over 25 years.",
      input: "Property Value: £250,000\nDeposit: £25,000 (10%)\nInterest Rate: 4.5%\nTerm: 25 Years\nType: Repayment",
      output: "Loan Amount: £225,000\nLTV: 90.0%\nMonthly Payment: £1,250.70\nTotal Interest Paid: £150,210.45\nTotal Cost: £375,210.45"
    },
    {
      title: "Buy-to-Let Investor (Interest Only)",
      description: "An interest-only mortgage on a £400,000 property with a 25% deposit (£100,000) at 5.2% interest over 30 years.",
      input: "Property Value: £400,000\nDeposit: £100,000 (25%)\nInterest Rate: 5.2%\nTerm: 30 Years\nType: Interest Only",
      output: "Loan Amount: £300,000\nLTV: 75.0%\nMonthly Payment: £1,300.00\nTotal Interest Paid: £468,000.00\nRemaining Principal: £300,000"
    }
  ],
  longDescription: `
## Comprehensive Guide to UK Mortgages and Repayments

Buying a home is one of the most significant financial milestones in life. In the United Kingdom, navigating the mortgage market can be complex due to the variety of products, fee structures, regulatory requirements, and local tax rules. This guide provides a deep dive into how mortgages are calculated in the UK, how interest rates affect payments, how to assess affordability, and how overpayments can save you thousands of pounds over the life of your loan.

---

## How to Calculate Mortgage Payments in the UK

A mortgage is a loan secured against a property. In the UK, most residential mortgages are calculated on a monthly compounding basis. The math behind the repayments depends on whether you choose a **Repayment Mortgage** or an **Interest-Only Mortgage**.

### 1. Repayment Mortgages (Capital and Interest)

Under a repayment mortgage, your monthly payment consists of two parts: interest on the outstanding balance and a portion of the original capital (principal). Over time, the principal portion grows, and the interest portion shrinks.

The monthly repayment ($M$) is calculated using the standard amortization formula:

$$M = P \\frac{r(1+r)^n}{(1+r)^n - 1}$$

Where:
- **$P$** = Principal loan amount (Property Value minus Deposit, plus any capitalized fees)
- **$r$** = Monthly interest rate (Annual interest rate divided by 12, then divided by 100)
- **$n$** = Total number of monthly payments (Mortgage Term in years multiplied by 12)

For example, on a loan of £200,000 at a 4.5% annual interest rate over a 25-year term:
- $P$ = £200,000
- $r$ = $4.5 / 12 / 100 = 0.00375$
- $n$ = $25 \\times 12 = 300$
- $M = 200,000 \\times \\frac{0.00375(1.00375)^{300}}{(1.00375)^{300} - 1} \\approx \\text{£1,111.66}$ per month.

At the start, most of this £1,111.66 goes toward interest. As the balance decreases, more of the payment goes toward reducing the principal.

### 2. Interest-Only Mortgages

With an interest-only mortgage, your monthly payment only covers the interest charged on the loan. The original capital balance remains unchanged. At the end of the term, you must repay the full loan amount in one lump sum, usually through an investment plan, savings, or by selling the property.

The monthly interest-only payment ($M$) is calculated as:

$$M = P \\times r$$

For the same £200,000 loan at 4.5% interest:
- $M = 200,000 \\times 0.00375 = \\text{£750.00}$ per month.

Interest-only mortgages are common for Buy-to-Let (BTL) property investments in the UK, as they maximize monthly cash flow. However, they are highly regulated for residential buyers, who must demonstrate a credible repayment strategy to the lender.

---

## Understanding Loan-to-Value (LTV) Ratio in the UK

The **Loan-to-Value (LTV)** ratio represents the size of the mortgage compared to the value of the property, expressed as a percentage.

$$LTV = \\frac{\\text{Loan Amount}}{\\text{Property Value}} \\times 100$$

For example, if you buy a house for £300,000, put down a £30,000 deposit (10%), and take out a mortgage of £270,000, your LTV is:

$$LTV = \\frac{270,000}{300,000} \\times 100 = 90\%$$

### LTV Pricing Brackets

In the UK mortgage market, interest rates are priced in tiers based on LTV. Lenders view lower LTVs as lower risk, and offer lower interest rates to borrowers who have larger deposits. The key LTV tiers in the UK are:
- **Under 60% LTV**: Typically unlocks the absolute lowest interest rates.
- **60% - 75% LTV**: Standard competitive interest rates.
- **75% - 80% LTV**: Moderate rates.
- **80% - 85% LTV**: Higher rates.
- **85% - 90% LTV**: Higher interest rates, common for first-time buyers.
- **90% - 95% LTV**: The highest interest rates, often requiring specific government-backed schemes or indemnity insurance.

*Strategy Tip:* If your calculated LTV is close to a tier boundary (e.g., 80.5%), adding a small amount to your deposit to drop to the next lower tier (e.g., 79.9%) can unlock lower interest rates, saving you thousands of pounds over the term of the mortgage.

---

## Mortgage Affordability: How Lenders Evaluate You

In the UK, mortgage affordability is regulated by the **Financial Conduct Authority (FCA)**. Lenders do not rely solely on salary multiples; they perform detailed affordability assessments.

### 1. The Income Multiple (Salary Multiples)

Lenders use income multiples as a starting point. As a rule of thumb, most lenders limit borrowing to:
- **Single Income**: Up to **4.5 times** your annual gross income.
- **Joint Income**: Up to **4.5 times** your combined annual gross income.

Some lenders may offer up to **5.0 or 5.5 times** salary to high earners, professionals (e.g., doctors, lawyers), or through specific schemes.

### 2. Debt-to-Income (DTI) and Debt Stress Testing

Lenders review your net monthly income and subtract regular outgoings (credit card payments, car loans, childcare, insurance). The remaining cash flow must comfortably cover the proposed mortgage payment.

Lenders also perform **stress testing**. They evaluate whether you could still afford the monthly payments if interest rates rose to a higher stress rate (often 1% to 3% above the lender's Standard Variable Rate). This ensures borrowers do not default if rates fluctuate.

---

## Fixed vs Variable Mortgages in the UK

When choosing a mortgage deal in the UK, you typically select from these common structures:

| Mortgage Type | How It Works | Pros | Cons |
|:---|:---|:---|:---|
| **Fixed-Rate** | The interest rate is locked for a set period (usually 2, 5, or 10 years). Payments remain identical. | Complete budget security; protection against rate hikes. | If market rates fall, you remain locked in. Early exit fees apply. |
| **Tracker (Variable)** | The interest rate tracks the Bank of England Base Rate plus a set percentage. | Payments drop if the base rate falls. Often lower fees. | Payments increase instantly if base rates rise. |
| **Standard Variable Rate (SVR)** | The lender's default interest rate. You fall onto this once your fixed or tracker deal ends. | No early repayment charges; freedom to switch anytime. | SVRs are usually the highest interest rates in the market. |

---

## The Power of Mortgage Overpayments

Making overpayments means paying more than your required monthly mortgage payment. This extra money goes directly toward reducing the principal balance of the loan, which reduces the amount of interest charged in subsequent months.

### Types of Overpayments
1. **Monthly Overpayment**: Adding a set amount (e.g., £100) to your regular payment.
2. **Annual Lump Sum**: Making a yearly payment (e.g., using a work bonus).
3. **One-Off Lump Sum**: Making a single large payment at a specific point in time.

### The Overpayment Limit (The 10% Rule)
Most fixed-rate mortgages in the UK allow you to overpay up to **10% of the outstanding loan balance each year** without penalty. Overpaying beyond this limit triggers **Early Repayment Charges (ERCs)**, which can be expensive (ranging from 1% to 5% of the overpaid amount). Always check your mortgage terms before making large overpayments.

### Interest and Term Savings
By reducing the principal faster, you save interest over the remaining term of the mortgage. This also shortens the time it takes to pay off the mortgage, helping you become debt-free years ahead of schedule.

---

## Extra Costs of Buying a Property in the UK

When budgeting for a home purchase, you must account for several transaction costs in addition to your deposit:

1. **Stamp Duty Land Tax (SDLT)**:
   - A property transfer tax in England and Northern Ireland. (Scotland has LBTT; Wales has LTT).
   - First-time buyers in the UK often benefit from relief thresholds, exempting them from stamp duty on properties up to a certain value.
2. **Lender Product Fees**:
   - Arrangement or application fees charged by the lender to secure a specific interest rate. These typically range from £0 to £1,999.
   - Borrowers can pay this fee upfront or add (capitalize) it to the mortgage balance. Note that capitalizing fees means paying interest on them over the term.
3. **Broker Fees**:
   - Fees charged by an independent mortgage broker to find and secure your loan. Range from £0 (commission-only) to £500+.
4. **Valuation and Legal Fees**:
   - Solicitor costs for conveying and searching, and valuation surveys to confirm the property value. Expect to budget £1,500 to £3,000 in total.
`,
  faq: [
    {
      question: "What is a Mortgage Calculator UK?",
      answer: "A Mortgage Calculator UK is a tool designed to estimate monthly payments, interest charges, LTV ratios, and payoff terms for properties in the United Kingdom, using local fee structures and standard monthly compounding formulas."
    },
    {
      question: "How is the monthly mortgage payment calculated in the UK?",
      answer: "For repayment mortgages, payments are calculated using the amortization formula: monthly repayment = P * [r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly payments."
    },
    {
      question: "What is the difference between a repayment and interest-only mortgage?",
      answer: "With a repayment mortgage, you pay back both the interest and the principal capital, ensuring you own the property outright at the end of the term. With an interest-only mortgage, you pay only the interest, leaving the original principal balance to be repaid in full at the end of the term."
    },
    {
      question: "What does Loan-to-Value (LTV) mean?",
      answer: "LTV stands for Loan-to-Value. It is the percentage size of your mortgage compared to the total value of the property. For example, if a house is worth £200,000 and your mortgage is £180,000, your LTV is 90%."
    },
    {
      question: "Why does LTV matter for UK mortgages?",
      answer: "LTV determines the interest rates you qualify for. Lenders price mortgages in tiers (e.g. 60%, 75%, 80%, 90% LTV). A lower LTV represents lower risk for the lender, which translates to cheaper interest rates for the borrower."
    },
    {
      question: "What is a good LTV ratio for a mortgage in the UK?",
      answer: "An LTV of 60% or lower is ideal, as it unlocks the lowest interest rates available. However, most first-time buyers start with an LTV of 90% or 95%."
    },
    {
      question: "How much deposit do I need to get a mortgage in the UK?",
      answer: "Generally, you need a minimum deposit of 5% of the property value (a 95% LTV). A larger deposit, such as 10% or 20%, will unlock better interest rates and lower monthly payments."
    },
    {
      question: "How much mortgage can I borrow based on my income?",
      answer: "Lenders typically limit borrowing to 4.5 times your gross annual income (or combined income for joint applications). High earners or professionals may sometimes borrow up to 5.0 or 5.5 times their salary."
    },
    {
      question: "What is the 4.5 times salary rule in the UK?",
      answer: "It is a standard borrowing limit set by lenders to ensure affordability. If your annual salary is £50,000, you can generally borrow up to £225,000 (4.5 * £50,000) for a mortgage."
    },
    {
      question: "What are the common mortgage terms in the UK?",
      answer: "The most common mortgage terms are 25 or 30 years. However, terms can range from 5 to 40 years depending on your age and affordability."
    },
    {
      question: "Should I choose a 25-year or 30-year mortgage term?",
      answer: "A 30-year term results in lower monthly payments, which can help with affordability. However, a 25-year term will result in less interest paid over the life of the loan and a faster payoff date."
    },
    {
      question: "What is a fixed-rate mortgage?",
      answer: "A fixed-rate mortgage has a locked interest rate for a set period (commonly 2, 5, or 10 years). Your monthly payments remain identical during this period, protecting you from rate hikes."
    },
    {
      question: "What is a variable or tracker mortgage?",
      answer: "A tracker mortgage is a variable-rate loan that tracks a reference rate—typically the Bank of England Base Rate—plus a set percentage. Your payments will increase or decrease in line with rate changes."
    },
    {
      question: "What happens when my fixed-rate deal ends?",
      answer: "When your deal ends, you will automatically move onto the lender's Standard Variable Rate (SVR), which is typically higher. It is best to arrange a remortgage or switch to a new deal 3 to 6 months before your fixed term ends."
    },
    {
      question: "What is a Standard Variable Rate (SVR)?",
      answer: "SVR is the default interest rate charged by a lender. It is variable and determined by the lender. SVRs are usually significantly higher than fixed or tracker rates, and do not carry early exit fees."
    },
    {
      question: "Can I overpay my mortgage in the UK?",
      answer: "Yes. Most lenders allow you to overpay up to 10% of your outstanding mortgage balance per calendar year without penalty. Overpaying beyond this limit will trigger Early Repayment Charges (ERCs)."
    },
    {
      question: "What are the benefits of making mortgage overpayments?",
      answer: "Overpayments reduce your mortgage principal balance. This reduces the amount of interest charged in subsequent months, saving you money on interest and shortening the overall term of the loan."
    },
    {
      question: "How does a monthly overpayment compare to a lump sum overpayment?",
      answer: "A monthly overpayment gradually reduces your balance each month. A lump sum overpayment reduces the balance immediately, saving more interest if paid early in the year. Both methods help reduce the overall term and interest paid."
    },
    {
      question: "What are Early Repayment Charges (ERCs)?",
      answer: "ERCs are fees charged by lenders if you pay off your mortgage early, exit a fixed deal before it ends, or overpay beyond the allowed limit (typically 10% per year). ERCs are calculated as a percentage of the loan balance (often 1% to 5%)."
    },
    {
      question: "What is Stamp Duty Land Tax (SDLT)?",
      answer: "Stamp Duty is a tax paid when buying property or land in England and Northern Ireland. First-time buyers are exempt from paying stamp duty on properties up to a certain value."
    },
    {
      question: "Do first-time buyers pay Stamp Duty in the UK?",
      answer: "First-time buyers do not pay Stamp Duty on properties valued up to £425,000, and pay a discounted rate on properties valued up to £625,000."
    },
    {
      question: "What are mortgage product fees?",
      answer: "Product fees (also called arrangement fees) are charged by lenders to secure a specific mortgage deal. These fees can range from £0 to £2,000, and can be paid upfront or added to the loan balance."
    },
    {
      question: "Is it better to pay mortgage fees upfront or add them to the loan?",
      answer: "Paying fees upfront is cheaper in the long run because adding them to the mortgage balance means you pay interest on them over the entire term of the loan."
    },
    {
      question: "What is an agreement in principle (AIP)?",
      answer: "An AIP (also called a Decision in Principle) is a document from a lender indicating how much they are willing to lend you based on a basic review of your income and credit score. It is useful to have when viewing properties."
    },
    {
      question: "How does a broker fee affect my mortgage costs?",
      answer: "Broker fees are paid to independent mortgage advisors for finding and managing your loan application. While it adds to your upfront costs, a broker can help you secure better rates and deals."
    },
    {
      question: "What is mortgage stress testing?",
      answer: "Lenders stress-test your finances by evaluating whether you can still afford monthly mortgage payments if interest rates rise by 1% to 3% above the standard rate. This is required by UK regulations."
    },
    {
      question: "What is a buy-to-let (BTL) mortgage?",
      answer: "A BTL mortgage is a loan secured on a property that is purchased specifically to be rented out to tenants. These mortgages are typically interest-only and require a larger deposit (minimum 20% to 25%)."
    },
    {
      question: "How do interest rates affect Buy-to-Let mortgages?",
      answer: "Because most BTL mortgages are interest-only, higher interest rates directly reduce your monthly rental profit margins. Lenders require rental income to cover the interest payment by 125% to 145%."
    },
    {
      question: "What is a first-time buyer mortgage?",
      answer: "It is a mortgage product tailored for individuals purchasing their first property. These deals often feature lower deposit requirements, fee discounts, or cash-back incentives."
    },
    {
      question: "What is the mortgage term length limit in the UK?",
      answer: "The maximum term length is typically 40 years. Lenders limit terms to ensure the mortgage is paid off before the borrower reaches retirement age (usually 70 or 75)."
    },
    {
      question: "Can I get a mortgage if I am self-employed in the UK?",
      answer: "Yes. Lenders require self-employed applicants to provide 2 to 3 years of certified accounts or tax returns (SA302 forms) to assess their average income."
    },
    {
      question: "What is the Bank of England Base Rate?",
      answer: "The Base Rate is the benchmark interest rate set by the Bank of England. It influences the rates commercial banks offer for mortgages, savings, and loans."
    },
    {
      question: "How does the Base Rate affect my monthly mortgage payments?",
      answer: "If you have a tracker or standard variable mortgage, your rate and monthly payments will change in line with Base Rate adjustments. If you have a fixed-rate mortgage, your payments will remain unchanged until the deal ends."
    },
    {
      question: "What is an offset mortgage?",
      answer: "An offset mortgage links your mortgage loan to your savings account. The savings balance is subtracted from the mortgage balance, and you only pay interest on the difference, helping you pay off the loan faster."
    },
    {
      question: "Can I get a mortgage with bad credit in the UK?",
      answer: "Yes, but you may need to use a specialist lender, pay a larger deposit (e.g. 15% to 25%), and accept higher interest rates."
    },
    {
      question: "What is the difference between valuation fees and survey fees?",
      answer: "A valuation fee covers the lender's check to ensure the property is worth the loan amount. A homebuyer survey is a detailed report you pay for to check the structural condition of the property."
    },
    {
      question: "What is conveyancing?",
      answer: "Conveyancing is the legal process of transferring property ownership from the seller to the buyer, managed by a solicitor or licensed conveyancer."
    },
    {
      question: "What is a guarantor mortgage?",
      answer: "A guarantor mortgage is a deal where a relative (typically a parent) agrees to cover the mortgage payments if the borrower defaults, using their own income or property as security."
    },
    {
      question: "How does the help-to-buy scheme work?",
      answer: "The government Help to Buy equity loan scheme closed to new applications in 2022. It allowed buyers to secure a property with a 5% deposit and a 20% interest-free equity loan (40% in London)."
    },
    {
      question: "What is a shared ownership mortgage?",
      answer: "Shared ownership allows you to buy a share of a property (between 10% and 75%) and pay rent on the remaining share to a housing association. You can purchase larger shares over time (staircasing)."
    },
    {
      question: "What does staircasing mean in shared ownership?",
      answer: "Staircasing is the process of buying additional shares in your shared ownership property. As your share increases, the rent you pay to the housing association decreases."
    },
    {
      question: "How much deposit is needed for Buy-to-Let?",
      answer: "Most lenders require a minimum deposit of 20% to 25% for Buy-to-Let mortgages, which is higher than the requirement for residential mortgages."
    },
    {
      question: "Do mortgage interest rates compound daily or monthly in the UK?",
      answer: "Most UK mortgages calculate and compound interest monthly. Some calculate interest daily, which is slightly cheaper if you make regular overpayments."
    },
    {
      question: "What is the Standard Variable Rate (SVR) average?",
      answer: "SVRs are variable and vary by lender, but they are typically 2% to 4% higher than fixed-rate or tracker products."
    },
    {
      question: "Is there an age limit for getting a mortgage in the UK?",
      answer: "Yes. Most lenders require the mortgage term to end before the borrower reaches age 70 or 75. Some specialist lenders will lend up to age 80 or 85."
    },
    {
      question: "What happens if I cannot pay my mortgage?",
      answer: "If you struggle to make payments, contact your lender immediately. Lenders are required to offer support, which can include temporary payment holidays, switching to interest-only, or extending the term."
    },
    {
      question: "What is a mortgage payment holiday?",
      answer: "A payment holiday is a temporary agreement with your lender to pause or reduce your monthly mortgage payments. Interest continues to accrue during this period, which will increase your remaining balance."
    },
    {
      question: "How do mortgage brokers get paid?",
      answer: "Mortgage brokers are paid either through fees charged to the borrower, commission paid by the lender, or a combination of both."
    },
    {
      question: "Can I transfer my mortgage to a new property when I move?",
      answer: "Yes, this is known as porting. Most fixed-rate mortgages are portable, allowing you to move the deal to your new property, subject to meeting the lender's affordability criteria."
    },
    {
      question: "What does the term 'amortization' mean?",
      answer: "Amortization is the process of paying off a debt over time through regular payments. Each payment covers a portion of the interest and a portion of the principal balance."
    },
    {
      question: "How do arrangement fees affect the cost of a mortgage?",
      answer: "Arrangement fees are charged by lenders to set up the mortgage. Adding these fees to the loan balance increases your total interest paid, as you pay interest on the fees over the term."
    },
    {
      question: "What is a mortgage redomestication or remortgaging?",
      answer: "Remortgaging is switching your mortgage to a new lender or deal without moving house. This is typically done to secure a lower interest rate when a fixed-rate deal ends."
    }
  ]
};
