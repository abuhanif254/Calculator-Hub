import { NextResponse } from 'next/server';
import { calculators } from '@/lib/data/calculators';
import { calculatorFormulas, getFormulaForCalculator } from '@/lib/data/calculatorFormulas';
import { allToolsConfig } from '@/lib/data/tools';
import { comparisons } from '@/lib/data/comparisons';
import { collections } from '@/lib/data/collections';
import { allGuides, featuredGuides } from '@/lib/data/guides';

// Statically generated at build time — zero runtime serverless invocations.
export const revalidate = false;

export async function GET() {
  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

  const seenCalcSlugs = new Set<string>();
  const allCalculators = calculators.filter((c) => {
    if (seenCalcSlugs.has(c.slug)) return false;
    seenCalcSlugs.add(c.slug);
    return true;
  });
  const allTools = Object.values(allToolsConfig);

  const lines: string[] = [
    '# NexusCalculator — Quantitative Engineering, Financial & Developer Platform',
    '',
    '> Peer-reviewed financial, health, mathematical, physics, chemistry, and statistics calculators alongside 100% client-side developer, PDF, and image utilities in English, Spanish, French, and German.',
    '',
    `- **Canonical Website**: ${baseUrl}/en`,
    `- **Full Machine-Readable GEO Corpus**: ${baseUrl}/llms-full.txt`,
    `- **Supported Languages (hreflang)**: English (\`${baseUrl}/en\`), Español (\`${baseUrl}/es\`), Français (\`${baseUrl}/fr\`), Deutsch (\`${baseUrl}/de\`)`,
    `- **Platform Scale**: ${allCalculators.length} interactive calculators (${calculatorFormulas.length} verified 4-language formula models), ${allTools.length} browser utilities, ${allGuides.length} technical guides, ${comparisons.length} methodology comparisons, ${collections.length} workflow toolkits`,
    `- **Editorial & Verification Standards**: ${baseUrl}/en/editorial-policy (CFPB Regulation Z, WHO/NIH clinical equations, NIST/ISO 80000-2 SI standards, IRS 2026 statutory contribution caps)`,
    `- **Free Embeddable Calculator Widgets**: ${baseUrl}/en/embed-widgets (also \`/es/incrustar-calculadoras\`, \`/fr/integrer-calculatrices\`, \`/de/rechner-einbetten\`)`,
    `- **XML Sitemap**: ${baseUrl}/sitemap.xml`,
    `- **RSS Feed**: ${baseUrl}/feed.xml`,
    '- **Founder & Lead Systems Architect**: MD Abu Hanif Mia (https://abuhanifmia.com)',
    '- **Privacy Architecture**: 100% client-side browser execution (Web Crypto API, Canvas, pdf-lib, WebAssembly) — zero server-side retention of user calculator inputs or uploaded files.',
    '',
    '## Core Hub Directories',
    '',
    `- [All Calculators Directory](${baseUrl}/en/calculators): Complete index of ${allCalculators.length} quantitative calculators across Finance, Health, Math, Physics, Chemistry, Statistics, and Everyday Utilities.`,
    `- [Developer, PDF & Image Tools Hub](${baseUrl}/en/tools): ${allTools.length} browser-based developer tools, cryptographic generators, PDF processors, and image converters.`,
    `- [Free Embeddable Calculator Widgets Gallery](${baseUrl}/en/embed-widgets): Zero-API-key responsive iframe calculator widgets for WordPress, Webflow, Squarespace, Shopify, and HTML.`,
    `- [Side-by-Side Tool & Formula Comparisons](${baseUrl}/en/compare): Objective methodology comparisons (Rent vs. Buy, Roth vs. Traditional IRA, Avalanche vs. Snowball, BMI vs. Body Fat).`,
    `- [Curated Workflow Collections](${baseUrl}/en/collections): Multi-tool role-based toolkits for homebuyers, software engineers, students, and fitness planners.`,
    `- [Technical & Financial Guides](${baseUrl}/en/guides): ${allGuides.length} long-form educational guides and step-by-step calculation walkthroughs.`,
    `- [Editorial Policy & Formula Verification](${baseUrl}/en/editorial-policy): Peer-review methodology, rounding precision, and regulatory reference standards.`,
    '',
    '## Category Pillar Hubs',
    '',
    `- [Financial Calculators](${baseUrl}/en/calculators/category/financial): Amortization, compound interest, APR/APY, tax brackets, retirement (401k, Roth IRA), and investment ROI.`,
    `- [Fitness & Health Calculators](${baseUrl}/en/calculators/category/health): Mifflin-St Jeor BMR/TDEE, WHO BMI, US Navy Body Fat, macro splits, and pregnancy/due-date estimators.`,
    `- [Math Calculators](${baseUrl}/en/calculators/category/math): Algebra, geometry, graphing, scientific notation, fractions, percentages, and binary math.`,
    `- [Statistics & Probability Calculators](${baseUrl}/en/calculators/category/statistics): Z-scores, Student’s t-test, confidence intervals, p-values, variance, and standard deviation.`,
    `- [Physics & Electrical Calculators](${baseUrl}/en/calculators/category/physics): Kinematics, projectile motion, Ohm’s law, electrical power, voltage drop, solar panels, and battery runtime.`,
    `- [Chemistry Calculators](${baseUrl}/en/calculators/category/chemistry): Stoichiometry, molarity, molar mass, pH/pKa Henderson-Hasselbalch buffers, Nernst equation, Gibbs energy, and gas laws.`,
    `- [Construction & Everyday Calculators](${baseUrl}/en/calculators/category/other): Concrete volume, unit conversion, age, GPA, time/date, and IP/CIDR subnetting.`,
    `- [PDF Utilities Hub](${baseUrl}/en/pdf): Client-side PDF merge, split, compress, OCR, redact, sign, and format conversion.`,
    `- [Image Utilities Hub](${baseUrl}/en/image): Client-side WebP/PNG/JPG/SVG/HEIC conversion, EXIF removal, upscaling, and compression.`,
    '',
    `## Complete Quantitative Calculators Index (${allCalculators.length} Tools & Verified Formulas)`,
    '',
    ...allCalculators.map((calc) => {
      const formulaDef = getFormulaForCalculator(calc.slug);
      const formulaSnippet = formulaDef?.formula
        ? ` — Formula: \`${formulaDef.formula.replace(/\s+/g, ' ').trim()}\``
        : '';
      return `- [${calc.title}](${baseUrl}/en/calculators/${calc.slug}): ${calc.description}${formulaSnippet}`;
    }),
    '',
    `## Side-by-Side Methodology Comparisons (${comparisons.length})`,
    '',
    ...comparisons.map(
      (comp) =>
        `- [${comp.title}](${baseUrl}/en/compare/${comp.slug}): ${comp.seoDescription} (Verdict: ${comp.verdict})`
    ),
    '',
    `## Curated Workflow Collections (${collections.length})`,
    '',
    ...collections.map(
      (col) => `- [${col.title}](${baseUrl}/en/collections/${col.slug}): ${col.description}`
    ),
    '',
    `## Featured Peer-Reviewed Guides (See /llms-full.txt for all ${allGuides.length} Guides)`,
    '',
    ...featuredGuides.slice(0, 40).map(
      (guide) => `- [${guide.title}](${baseUrl}/en/guides/${guide.slug}): ${guide.description}`
    ),
    '',
    `## Complete Browser-Based Developer, PDF & Image Utilities (${allTools.length})`,
    '',
    ...allTools.map(
      (tool) => `- [${tool.title}](${baseUrl}/en/tools/${tool.slug}): ${tool.shortDescription}`
    ),
    '',
    '## Full Reference Corpus',
    '',
    `For full LaTeX equations, variable legends, step-by-step derivations across all ${calculatorFormulas.length} formula models, localized multilingual URL mappings (en/es/fr/de), and the complete index of all ${allGuides.length} guides, fetch: ${baseUrl}/llms-full.txt`,
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
