import { NextResponse } from 'next/server';
import { calculators } from '@/lib/data/calculators';
import { getFormulaForCalculator } from '@/lib/data/calculatorFormulas';
import { allToolsConfig } from '@/lib/data/tools';
import { comparisons } from '@/lib/data/comparisons';
import { collections } from '@/lib/data/collections';
import { featuredGuides } from '@/lib/data/guides';

// Statically generated at build time — zero runtime serverless invocations.
export const revalidate = false;

export async function GET() {
  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

  const topCalculators = calculators.filter((c) => !c.parentSlug).slice(0, 80);
  const topTools = Object.values(allToolsConfig).slice(0, 60);

  const lines: string[] = [
    '# NexusCalculator — Quantitative Engineering, Financial & Developer Platform',
    '',
    '> Peer-reviewed financial, health, mathematical, and scientific calculators alongside 100% client-side developer, PDF, and image utilities.',
    '',
    `- **Canonical Website**: ${baseUrl}/en`,
    `- **Supported Languages (hreflang)**: English (\`${baseUrl}/en\`), Español (\`${baseUrl}/es\`), Français (\`${baseUrl}/fr\`), Deutsch (\`${baseUrl}/de\`)`,
    `- **XML Sitemap**: ${baseUrl}/sitemap.xml`,
    `- **RSS Feed**: ${baseUrl}/feed.xml`,
    '- **Founder & Lead Systems Architect**: MD Abu Hanif Mia',
    '- **Privacy Architecture**: 100% client-side browser execution (Web Crypto API, Canvas, WebAssembly) — zero server-side retention of user calculator or file inputs.',
    '',
    '## Core Hub Directories',
    '',
    `- [All Calculators Directory](${baseUrl}/en/calculators): Complete index of 345+ quantitative calculators across Finance, Health, Math, Science, Construction, and Everyday Utilities.`,
    `- [Developer, PDF & Image Tools Hub](${baseUrl}/en/tools): 135+ browser-based developer tools, cryptographic generators, PDF processors, and image converters.`,
    `- [Side-by-Side Tool & Formula Comparisons](${baseUrl}/en/compare): Objective methodology comparisons (Rent vs. Buy, Roth vs. Traditional IRA, Avalanche vs. Snowball, BMI vs. Body Fat).`,
    `- [Curated Workflow Collections](${baseUrl}/en/collections): Multi-tool role-based toolkits for homebuyers, software engineers, students, and fitness planners.`,
    `- [Technical & Financial Guides](${baseUrl}/en/guides): Long-form peer-reviewed whitepapers and step-by-step calculation guides.`,
    '',
    '## Category Pillar Hubs',
    '',
    `- [Financial Calculators](${baseUrl}/en/calculators/category/financial): Amortization, compound interest, APR/APY, tax brackets, retirement (401k, Roth IRA), and investment ROI.`,
    `- [Fitness & Health Calculators](${baseUrl}/en/calculators/category/health): Mifflin-St Jeor BMR/TDEE, WHO BMI, US Navy Body Fat, macro splits, and clinical dosage calculators.`,
    `- [Math Calculators](${baseUrl}/en/calculators/category/math): Algebra, geometry, calculus, matrix operations, probability, and standard deviation.`,
    `- [Physics Calculators](${baseUrl}/en/calculators/category/physics): Kinematics, projectile motion, Ohm's law, electrical power, voltage drop, and work/energy.`,
    `- [Chemistry Calculators](${baseUrl}/en/calculators/category/chemistry): Stoichiometry, molarity, molar mass, pH/pKa buffers, Nernst equation, and ideal gas laws.`,
    `- [Weather & Everyday Calculators](${baseUrl}/en/calculators/category/other): Concrete volume, unit conversion, age, GPA, time/date, and subnetting.`,
    `- [PDF Utilities Hub](${baseUrl}/en/pdf): Client-side PDF merge, split, compress, OCR, and format conversion.`,
    `- [Image Utilities Hub](${baseUrl}/en/image): Client-side WebP/PNG/JPG/SVG conversion, EXIF removal, and compression.`,
    '',
    '## Flagship Quantitative Calculators & Verified Mathematical Formulas',
    '',
    ...topCalculators.map((calc) => {
      const formulaDef = getFormulaForCalculator(calc.slug);
      const formulaSnippet = formulaDef?.formula ? ` — Formula: \`${formulaDef.formula.replace(/\s+/g, ' ').trim()}\`` : '';
      return `- [${calc.title}](${baseUrl}/en/calculators/${calc.slug}): ${calc.description}${formulaSnippet}`;
    }),
    '',
    '## Side-by-Side Methodology Comparisons',
    '',
    ...comparisons.map(
      (comp) =>
        `- [${comp.title}](${baseUrl}/en/compare/${comp.slug}): ${comp.seoDescription} (Verdict: ${comp.verdict})`
    ),
    '',
    '## Curated Workflow Collections',
    '',
    ...collections.map(
      (col) => `- [${col.title}](${baseUrl}/en/collections/${col.slug}): ${col.description}`
    ),
    '',
    '## Featured Peer-Reviewed Guides',
    '',
    ...featuredGuides.slice(0, 30).map(
      (guide) => `- [${guide.title}](${baseUrl}/en/guides/${guide.slug}): ${guide.description}`
    ),
    '',
    '## Client-Side Developer, Security, PDF & Image Utilities',
    '',
    ...topTools.map(
      (tool) => `- [${tool.title}](${baseUrl}/en/tools/${tool.slug}): ${tool.shortDescription}`
    ),
    '',
  ];

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
