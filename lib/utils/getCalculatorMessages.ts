import fs from 'fs';
import path from 'path';
import type { CalculatorDef } from '@/lib/types';

export const SLUG_TO_NAMESPACE: Record<string, string[]> = {
  'loan-calculator': ['LoanCalculator'],
  'auto-loan-calculator': ['AutoLoanCalculator'],
  'interest-calculator': ['InterestCalculator'],
  'payment-calculator': ['PaymentCalculator'],
  'retirement-calculator': ['RetirementCalculator'],
  'roth-ira-calculator': ['RothIraCalculator'],
  'cash-back-vs-low-interest-calculator': ['CashBackLowInterest'],
  'margin-calculator': ['calculator'],
  'real-estate-calculator': ['calculator'],
  'lease-calculator': ['calculator'],
  'amortization-calculator': ['AmortizationCalculator'],
  'investment-calculator': ['InvestmentCalculator'],
  'inflation-calculator': ['InflationCalculator'],
  'finance-calculator': ['FinanceCalculator'],
  'income-tax-calculator': ['IncomeTaxCalculator'],
  'compound-interest-calculator': ['CompoundInterestCalculator'],
  'salary-calculator': ['SalaryCalculator'],
  'interest-rate-calculator': ['InterestRateCalculator'],
  'sales-tax-calculator': ['SalesTaxCalculator'],
  'student-loan-calculator': ['StudentLoanCalculator'],
  'business-loan-calculator': ['BusinessLoanCalculator'],
  'personal-loan-calculator': ['PersonalLoanCalculator'],
  'budget-calculator': ['BudgetCalculator'],
  'apr-calculator': ['APRCalculator'],
  'heloc-calculator': ['HELOCCalculator'],
  'present-value-calculator': ['PresentValueCalculator'],
  'percent-off-calculator': ['PercentOffCalculator'],
  '401k-calculator': ['Plan401kCalculator'],
  'marriage-tax-calculator': ['MarriageTaxCalculator'],
  'annuity-calculator': ['AnnuityCalculator'],
  'annuity-payout-calculator': ['AnnuityPayoutCalculator'],
  'debt-consolidation-calculator': ['DebtConsolidationCalculator'],
  'simple-interest-calculator': ['SimpleInterestCalculator'],
  'debt-payoff-calculator': ['DebtPayoffCalculator'],
  'college-cost-calculator': ['CollegeCostCalculator'],
  'mutual-fund-calculator': ['MutualFundCalculator'],
  'vat-calculator': ['VatCalculator'],
  'bond-calculator': ['BondCalculator'],
  'rmd-calculator': ['RMDCalculator'],
  'depreciation-calculator': ['DepreciationCalculator'],
  'va-mortgage-calculator': ['VAMortgageCalculator'],
  'estate-tax-calculator': ['EstateTaxCalculator'],
  'credit-cards-payoff': ['CreditCardsPayoff'],
  'rent-calculator': ['RentCalculator'],
  'rent-vs-buy-calculator': ['RentVsBuyCalculator'],
  'commission-calculator': ['CommissionCalculator'],
  'mortgage-payoff-calculator': ['MortgagePayoffCalculator'],
  'social-security-calculator': ['SocialSecurityCalculator'],
  'currency-calculator': ['CurrencyCalculator'],
  'binary-calculator': ['BinaryCalculator'],
  'confidence-interval-calculator': ['ConfidenceIntervalCalculator'],
  'scientific-calculator': ['ScientificCalculator'],
  'fraction-calculator': ['FractionCalculator'],
  'percentage-calculator': ['PercentageCalculator'],
  'random-number-generator': ['RandomNumberGenerator'],
  'triangle-calculator': ['TriangleCalculator'],
  'standard-deviation-calculator': ['StandardDeviationCalculator', 'Calculators'],
  'variance-calculator': ['calculators.variance'],
  'mean-calculator': ['calculators.mean'],
  'median-calculator': ['calculators.median'],
  'mode-calculator': ['calculators.mode'],
  'z-score-calculator': ['ZScoreCalculator'],
  't-test-calculator': ['TTestCalculator'],
  'probability-calculator': ['ProbabilityCalculator'],
  'date-calculator': ['DateCalculator'],
  'time-calculator': ['TimeCalculator'],
  'hours-calculator': ['HoursCalculator'],
  'gpa-calculator': ['GpaCalculator'],
  'grade-calculator': ['GradeCalculator'],
  'concrete-calculator': ['ConcreteCalculator'],
  'conversion-calculator': ['ConversionCalculator'],
  'bmi-calculator': ['BmiCalculator'],
  'calorie-calculator': ['CalorieCalculator'],
  'body-fat-calculator': ['BodyFatCalculator'],
  'bmr-calculator': ['BMRCalculator'],
  'ideal-weight-calculator': ['IdealWeightCalculator'],
  'healthy-weight-calculator': ['HealthyWeightCalculator'],
  'pace-calculator': ['PaceCalculator'],
  'ovulation-calculator': ['AgeCalculator'],
  'pregnancy-calculator': ['PregnancyCalculator'],
  'pregnancy-conception-calculator': ['PregnancyConceptionCalculator'],
  'due-date-calculator': ['DueDateCalculator'],
  'advanced-sleep-cycle-calculator': ['SleepCalculator'],
  'snow-day-calculator': ['SnowDayCalculator'],
  'age-calculator': ['AgeCalculator'],
  'subnet-calculator': ['SubnetCalculator'],
  'password-generator': ['PasswordGenerator'],
};

const localeMessagesCache = new Map<string, Record<string, any>>();

function loadLocaleMessages(locale: string): Record<string, any> {
  if (localeMessagesCache.has(locale)) {
    return localeMessagesCache.get(locale)!;
  }
  try {
    const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
    if (fs.existsSync(filePath)) {
      const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      localeMessagesCache.set(locale, parsed);
      return parsed;
    }
  } catch {
    // ignore
  }
  localeMessagesCache.set(locale, {});
  return {};
}

/**
 * Resolves localized title and description from messages/{locale}.json
 * for calculators backed by bespoke i18n message namespaces.
 */
export function getMessageNamespaceCalcMeta(
  slug: string,
  locale: string,
  parentSlug?: string
): { title?: string; description?: string } {
  if (!locale || locale === 'en') return {};
  const effectiveSlug = parentSlug || slug;
  const namespaces = SLUG_TO_NAMESPACE[effectiveSlug] || SLUG_TO_NAMESPACE[slug] || [];
  if (namespaces.length === 0) return {};

  const allMessages = loadLocaleMessages(locale);
  for (const ns of namespaces) {
    let section: any;
    if (ns.includes('.')) {
      const [top, sub] = ns.split('.');
      section = allMessages[top]?.[sub];
    } else {
      section = allMessages[ns];
    }
    if (section && typeof section === 'object') {
      const title = typeof section.title === 'string' ? section.title.trim() : undefined;
      const rawDesc = section.description || section.desc || section.subtitle;
      const description = typeof rawDesc === 'string' ? rawDesc.trim() : undefined;
      if (title || description) {
        return { title, description };
      }
    }
  }
  return {};
}

/**
 * Extracts only the i18n message namespaces required by a specific calculator's
 * client component instead of serializing the entire 85 KB locale dictionary.
 */
export function pickCalculatorMessages(
  calc: Pick<CalculatorDef, 'slug' | 'parentSlug'>,
  allMessages: Record<string, any>
): Record<string, any> {
  const effectiveSlug = calc.parentSlug || calc.slug;
  const namespaces = SLUG_TO_NAMESPACE[effectiveSlug] || SLUG_TO_NAMESPACE[calc.slug] || [];
  const picked: Record<string, any> = {};

  for (const ns of namespaces) {
    if (ns.includes('.')) {
      const [top, sub] = ns.split('.');
      if (allMessages[top]?.[sub]) {
        picked[top] = { ...(picked[top] || {}), [sub]: allMessages[top][sub] };
      }
    } else if (allMessages[ns] !== undefined) {
      picked[ns] = allMessages[ns];
    }
  }

  return picked;
}

/**
 * Strips heavy server-only SEO & multi-locale translation payloads from CalculatorDef
 * before passing across the Server-to-Client component boundary.
 */
export function toClientCalcDef(calc: CalculatorDef, locale?: string): CalculatorDef {
  const nsMeta = locale ? getMessageNamespaceCalcMeta(calc.slug, locale, calc.parentSlug) : {};
  const localizedTitle = (locale && calc.translations?.[locale]?.title) || nsMeta.title || calc.title;
  const localizedDesc = (locale && calc.translations?.[locale]?.description) || nsMeta.description || calc.description;

  return {
    slug: calc.slug,
    parentSlug: calc.parentSlug,
    title: localizedTitle,
    category: calc.category,
    description: localizedDesc,
    meta: {
      title: localizedTitle,
      description: localizedDesc,
      keywords: '',
    },
    fields: calc.fields,
    logicModule: calc.logicModule,
    defaultValues: calc.defaultValues,
  };
}
