// Background Service Worker for Nexus Calculator Extension (Manifest V3)

const BASE_URL = 'https://www.nexuscalculator.net';

const QUICK_TOOLS = [
  { slug: 'mortgage-calculator', title: 'Mortgage Calculator', keywords: ['mortgage', 'home', 'house', 'pmi', 'amortization'] },
  { slug: 'auto-loan-calculator', title: 'Auto Loan Calculator', keywords: ['auto', 'car', 'vehicle', 'lease'] },
  { slug: 'compound-interest-calculator', title: 'Compound Interest Calculator', keywords: ['compound', 'interest', 'investment', 'savings', 'growth'] },
  { slug: 'loan-calculator', title: 'Personal Loan Calculator', keywords: ['loan', 'personal', 'debt', 'borrow'] },
  { slug: 'bmi-calculator', title: 'BMI Calculator', keywords: ['bmi', 'body mass', 'weight', 'health', 'fitness'] },
  { slug: 'calorie-calculator', title: 'Calorie Calculator', keywords: ['calorie', 'tdee', 'diet', 'nutrition', 'macro'] },
  { slug: 'percentage-calculator', title: 'Percentage Calculator', keywords: ['percentage', 'percent', '%', 'ratio', 'fraction'] },
  { slug: 'sales-tax-calculator', title: 'Sales Tax Calculator', keywords: ['tax', 'sales', 'vat', 'gst'] },
  { slug: 'retirement-calculator', title: 'Retirement Calculator', keywords: ['retirement', '401k', 'pension', 'nest egg'] },
  { slug: 'salary-calculator', title: 'Salary / Paycheck Calculator', keywords: ['salary', 'wage', 'hourly', 'paycheck', 'income'] },
  { slug: 'json-formatter', title: 'JSON Formatter & Validator', keywords: ['json', 'formatter', 'lint', 'minify', 'pretty'] },
  { slug: 'diff-checker', title: 'Text Diff Checker', keywords: ['diff', 'compare', 'difference', 'merge'] },
];

// Safe math evaluator without eval()
function evaluateMathExpression(expr) {
  try {
    // Sanitize: allow only numbers, basic operators, parens, decimal, spaces
    const clean = expr.trim()
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**');

    if (!/^[\d\s\+\-\*\/\.\(\)\%\^]+$/.test(clean)) {
      return null;
    }

    // Evaluate using Function constructor in isolated scope
    const fn = new Function(`'use strict'; return (${clean})`);
    const val = fn();
    if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
      // Round to 8 decimal places if needed to avoid floating point anomalies (e.g. 0.1 + 0.2)
      return Math.abs(val) < 1e-12 ? 0 : Number(val.toFixed(8)).toString();
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Initialize Omnibox
chrome.runtime.onInstalled.addListener(() => {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Nexus: Type math (e.g. 1500 * 1.05^3) or tool name (e.g. mortgage)'
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  const query = text.trim().toLowerCase();
  if (!query) return;

  const suggestions = [];

  // 1. Check if it's a math calculation
  const mathResult = evaluateMathExpression(query);
  if (mathResult !== null) {
    suggestions.push({
      content: `result:${mathResult}`,
      description: `Calculation Result: <match>= ${mathResult}</match> <dim>(Press Enter to copy or view)</dim>`
    });
  }

  // 2. Search matched Nexus calculators
  const matches = QUICK_TOOLS.filter(t => 
    t.title.toLowerCase().includes(query) ||
    t.slug.includes(query) ||
    t.keywords.some(k => k.includes(query))
  ).slice(0, 4);

  matches.forEach(tool => {
    suggestions.push({
      content: `tool:${tool.slug}`,
      description: `<match>${tool.title}</match> <dim>— Open on Nexus Calculator Hub</dim>`
    });
  });

  // 3. Fallback search suggestion
  suggestions.push({
    content: `search:${encodeURIComponent(query)}`,
    description: `Search Nexus Calculator for <match>"${query}"</match>`
  });

  suggest(suggestions);
});

chrome.omnibox.onInputEntered.addListener((content, disposition) => {
  let url = `${BASE_URL}/en`;

  if (content.startsWith('tool:')) {
    const slug = content.replace('tool:', '');
    url = `${BASE_URL}/en/calculators/${slug}`;
  } else if (content.startsWith('search:')) {
    const q = content.replace('search:', '');
    url = `${BASE_URL}/en/search?q=${q}`;
  } else if (content.startsWith('result:')) {
    url = `${BASE_URL}/en/calculators/scientific-calculator`;
  } else {
    // If user hit enter directly on custom query
    const mathResult = evaluateMathExpression(content);
    if (mathResult !== null) {
      url = `${BASE_URL}/en/calculators/scientific-calculator`;
    } else {
      url = `${BASE_URL}/en/search?q=${encodeURIComponent(content)}`;
    }
  }

  if (disposition === 'currentTab') {
    chrome.tabs.update({ url });
  } else {
    chrome.tabs.create({ url });
  }
});
