import { CategorySlug } from '@/lib/categories';

/**
 * Maps calculator category names to canonical community category slugs
 */
export function mapCalculatorCategoryToCommunity(calcCategory?: string): CategorySlug {
  if (!calcCategory) return 'calculators';
  const cat = calcCategory.toLowerCase();

  if (
    cat.includes('financ') ||
    cat.includes('invest') ||
    cat.includes('money') ||
    cat.includes('loan') ||
    cat.includes('mortgage') ||
    cat.includes('tax') ||
    cat.includes('debt') ||
    cat.includes('retirement') ||
    cat.includes('interest')
  ) {
    return 'finance';
  }

  if (cat.includes('pdf')) {
    return 'pdf-tools';
  }

  if (cat.includes('image') || cat.includes('photo') || cat.includes('picture')) {
    return 'image-tools';
  }

  if (
    cat.includes('dev') ||
    cat.includes('code') ||
    cat.includes('web') ||
    cat.includes('programming') ||
    cat.includes('tech')
  ) {
    return 'web-dev';
  }

  // Math, Science, Health & Fitness, Everyday, Conversion, Engineering default to calculators
  return 'calculators';
}

/**
 * Contextual question starters tailored by category or calculator slug.
 * These give users instant inspiration to ask questions, kickstarting UGC.
 */
export interface ContextualPrompt {
  title: string;
  placeholderBody: string;
}

export function getContextualQuestionPrompts(
  calcSlug: string,
  calcTitle: string,
  calcCategory?: string
): ContextualPrompt[] {
  const slug = calcSlug.toLowerCase();
  const cat = (calcCategory || '').toLowerCase();

  // 1. Specific high-traffic calculator starters
  if (slug.includes('mortgage')) {
    return [
      {
        title: `What is a realistic down payment percentage in today's housing market?`,
        placeholderBody: `I am using the ${calcTitle} to calculate my monthly payment. I am debating between putting 5%, 10%, or 20% down. How does PMI compare against keeping extra cash in high-yield savings?`,
      },
      {
        title: `Should I buy mortgage discount points or keep the higher interest rate?`,
        placeholderBody: `Looking at my numbers on the ${calcTitle}, buying 1 discount point costs upfront but lowers my monthly interest. Has anyone done the break-even math on this recently?`,
      },
      {
        title: `15-Year Fixed vs. 30-Year Fixed: Which makes more financial sense right now?`,
        placeholderBody: `Comparing the two loan terms with this calculator shows huge total interest savings on the 15-year, but the monthly payment is significantly higher. How do you decide?`,
      },
    ];
  }

  if (slug.includes('bmi') || slug.includes('calorie') || slug.includes('body-fat')) {
    return [
      {
        title: `How accurate is this calculation for athletic builds with high muscle mass?`,
        placeholderBody: `I just calculated my results with the ${calcTitle}. Because of heavy strength training, my number seems high. What additional measurements should I look at?`,
      },
      {
        title: `What is a sustainable calorie deficit or surplus to target from here?`,
        placeholderBody: `Based on my maintenance calculation on the ${calcTitle}, what weekly rate of change has been most sustainable for your energy and fitness goals?`,
      },
      {
        title: `How frequently should I recalculate to account for metabolic adaptation?`,
        placeholderBody: `As my weight and body composition change, how often should I update the inputs on this ${calcTitle} to maintain progress?`,
      },
    ];
  }

  if (slug.includes('auto-loan') || slug.includes('car-loan') || slug.includes('car-lease')) {
    return [
      {
        title: `Is a 60-month or 72-month auto loan better if I plan to pay extra each month?`,
        placeholderBody: `Using the ${calcTitle}, I see the difference in total interest paid across loan terms. Does anyone have experience with early payoff penalties or interest amortization?`,
      },
      {
        title: `Buying vs. Leasing: How do you interpret the total cost of ownership here?`,
        placeholderBody: `When evaluating depreciation and residual values with this ${calcTitle}, what factors are people using to choose between purchasing and leasing?`,
      },
      {
        title: `What is considered a competitive interest rate for new vs. used auto loans?`,
        placeholderBody: `I am plugging my credit profile into the ${calcTitle}. What rates are lenders currently approving for tier 1 vs tier 2 borrowers?`,
      },
    ];
  }

  if (slug.includes('compound-interest') || slug.includes('investment') || slug.includes('401k') || slug.includes('roth-ira')) {
    return [
      {
        title: `What annual rate of return is safe to project for long-term index funds?`,
        placeholderBody: `I am running scenarios on the ${calcTitle} with 7%, 8%, and 10% expected return. Should I adjust these numbers for historical inflation (real vs nominal)?`,
      },
      {
        title: `Lump Sum vs. Dollar Cost Averaging (DCA): What does the math favor?`,
        placeholderBody: `I am simulating periodic contributions with the ${calcTitle}. For windfalls or bonus allocations, what strategy has worked best for your portfolio?`,
      },
      {
        title: `Roth vs. Traditional: At what tax bracket does the advantage switch?`,
        placeholderBody: `Analyzing my retirement projections with the ${calcTitle}. When does paying taxes today beat tax deferral upon withdrawal?`,
      },
    ];
  }

  // 2. Category-level defaults
  if (cat.includes('financ') || cat.includes('invest') || cat.includes('money') || cat.includes('loan')) {
    return [
      {
        title: `What hidden fees, taxes, or adjustments should I factor into this calculation?`,
        placeholderBody: `I have entered my baseline figures into the ${calcTitle}. What secondary expenses or nuances frequently get overlooked in real-world scenarios?`,
      },
      {
        title: `How do current economic interest rates impact the optimal strategy here?`,
        placeholderBody: `Running calculations with the ${calcTitle} under current rate conditions. How are other community members adjusting their targets?`,
      },
      {
        title: `Can someone review these numbers and sanity check my scenario?`,
        placeholderBody: `Here is the scenario I am evaluating with the ${calcTitle}. Are there any edge cases or alternative approaches I should consider?`,
      },
    ];
  }

  if (cat.includes('health') || cat.includes('fitness')) {
    return [
      {
        title: `How do individual factors (age, lifestyle, genetics) influence this metric?`,
        placeholderBody: `The ${calcTitle} gives a great mathematical baseline. How do you tailor the practical application to individual daily routines?`,
      },
      {
        title: `What are the best complementary tracking methods alongside this calculator?`,
        placeholderBody: `To track progress over time using the ${calcTitle}, what apps, metrics, or physical measurements provide the best correlation?`,
      },
      {
        title: `Tips for staying consistent with the targets calculated here?`,
        placeholderBody: `Now that I have my baseline numbers from the ${calcTitle}, what habits or tracking strategies worked best for you to maintain them?`,
      },
    ];
  }

  // 3. Universal fallback
  return [
    {
      title: `What is the best way to interpret these calculation results for decision making?`,
      placeholderBody: `I just ran my numbers through the ${calcTitle}. What are the primary benchmarks or thresholds people look for when making decisions from this?`,
    },
    {
      title: `Has anyone tested an edge-case scenario with this calculation formula?`,
      placeholderBody: `When evaluating extreme or boundary values in the ${calcTitle}, how does the underlying formula behave and are there practical caveats?`,
    },
    {
      title: `What real-world variables should be considered alongside this output?`,
      placeholderBody: `The ${calcTitle} calculates a precise mathematical estimate. What practical factors in everyday application could cause slight variance?`,
    },
  ];
}
