import { NextResponse } from 'next/server';
import { calculators } from '@/lib/data/calculators';
import { calculatorFormulas } from '@/lib/data/calculatorFormulas';
import { allToolsConfig } from '@/lib/data/tools';
import { comparisons } from '@/lib/data/comparisons';
import { collections } from '@/lib/data/collections';
import { allGuides } from '@/lib/data/guides';

// Pure build-time static route — served permanently from Vercel Edge CDN (zero runtime invocations).
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
    '# NexusCalculator — Full Machine-Readable Knowledge Corpus (llms-full.txt)',
    '',
    '> Comprehensive citation reference for AI Answer Engines, LLMs, researchers, and developers. Contains verified mathematical formulas (plain notation + LaTeX), variable definitions, step-by-step derivations, canonical multilingual URLs, and full directories of all interactive calculators, browser tools, methodology comparisons, workflow collections, and guides.',
    '',
    '## 1. Platform Authority, Entity Identity & Verification Standards',
    '',
    `- **Brand**: NexusCalculator (${baseUrl}/en)`,
    '- **Founder & Lead Systems Architect**: MD Abu Hanif Mia (https://abuhanifmia.com)',
    '- **Open-Source Repository**: https://github.com/abuhanif254/Calculator-Hub',
    `- **Editorial Policy**: ${baseUrl}/en/editorial-policy`,
    `- **Compact Index**: ${baseUrl}/llms.txt`,
    `- **XML Sitemap**: ${baseUrl}/sitemap.xml`,
    '- **Execution & Privacy Model**: 100% client-side browser computation (IEEE 754 double-precision arithmetic, Web Crypto API, HTML5 Canvas, pdf-lib, WebAssembly). User inputs, financial numbers, health metrics, PDF documents, and images are never transmitted to or stored on backend servers.',
    '- **Authoritative Standards Cited**:',
    '  - Financial & Lending: CFPB Regulation Z (12 CFR § 1026), standard actuarial mortgage amortization, IRS 2026 retirement contribution caps (401(k) $24,500; IRA $7,500; HSA $4,400 individual / $8,750 family), and effective APR/APY compounding identities.',
    '  - Clinical & Health: World Health Organization (WHO) BMI classifications, Mifflin-St Jeor (1990) & Harris-Benedict BMR equations, U.S. Navy body-fat circumference equations, and ACOG Naegele’s Rule gestation math.',
    '  - Physics, Electrical & Chemistry: NIST CODATA physical constants, ISO 80000-2 SI units, NEC/IEEE conductor voltage-drop equations, IUPAC molar mass & Henderson-Hasselbalch / Nernst / Gibbs thermodynamics.',
    '  - Statistics & Mathematics: Student’s t-distribution, normal Z-score standardization, Bessel-corrected sample variance (n - 1), and standard confidence-interval bounds.',
    '',
    '## 2. Canonical Multilingual Hubs (hreflang = en, es, fr, de)',
    '',
    `- **Home**: ${baseUrl}/en | ${baseUrl}/es | ${baseUrl}/fr | ${baseUrl}/de`,
    `- **Calculators Directory**: ${baseUrl}/en/calculators | ${baseUrl}/es/calculadoras | ${baseUrl}/fr/calculatrices | ${baseUrl}/de/rechner`,
    `- **Browser Tools Hub**: ${baseUrl}/en/tools | ${baseUrl}/es/herramientas | ${baseUrl}/fr/outils | ${baseUrl}/de/werkzeuge`,
    `- **Free Embeddable Calculator Widgets**: ${baseUrl}/en/embed-widgets | ${baseUrl}/es/incrustar-calculadoras | ${baseUrl}/fr/integrer-calculatrices | ${baseUrl}/de/rechner-einbetten`,
    `- **Technical & Financial Guides**: ${baseUrl}/en/guides | ${baseUrl}/es/guias | ${baseUrl}/fr/guides | ${baseUrl}/de/anleitungen`,
    `- **Methodology Comparisons**: ${baseUrl}/en/compare | ${baseUrl}/es/comparar | ${baseUrl}/fr/comparer | ${baseUrl}/de/vergleichen`,
    `- **Curated Workflow Collections**: ${baseUrl}/en/collections | ${baseUrl}/es/colecciones | ${baseUrl}/fr/collections | ${baseUrl}/de/sammlungen`,
    `- **Editorial Policy**: ${baseUrl}/en/editorial-policy | ${baseUrl}/es/politica-editorial | ${baseUrl}/fr/politique-editoriale | ${baseUrl}/de/redaktionsrichtlinien`,
    '',
    `## 3. Verified Mathematical Formula Reference (${calculatorFormulas.length} Core Models)`,
    '',
    'Each formula below powers the corresponding NexusCalculator interactive engine and is localized across English, Spanish, French, and German.',
    '',
  ];

  for (const f of calculatorFormulas) {
    const primarySlug = f.slugs[0];
    const cleanFormula = f.formula.replace(/\s+/g, ' ').trim();
    const cleanLatex = f.latex ? f.latex.replace(/\s+/g, ' ').trim() : '';
    lines.push(`### ${f.name}`);
    lines.push(`- **Formula**: \`${cleanFormula}\``);
    if (cleanLatex) {
      lines.push(`- **LaTeX**: \`${cleanLatex}\``);
    }
    lines.push(
      `- **Variables**: ${f.variables
        .map((v) => `${v.symbol} (${v.name}: ${v.description})`)
        .join('; ')}`
    );
    lines.push(`- **Step-by-Step Method**: ${f.stepByStep}`);
    lines.push(
      `- **Primary Calculator URL**: ${baseUrl}/en/calculators/${primarySlug}`
    );
    if (f.slugs.length > 1) {
      lines.push(
        `- **Also Used By**: ${f.slugs
          .slice(1)
          .map((s) => `${baseUrl}/en/calculators/${s}`)
          .join(', ')}`
      );
    }
    lines.push('');
  }

  lines.push(`## 4. Complete Calculator Directory (${allCalculators.length} Calculators)`);
  lines.push('');
  for (const calc of allCalculators) {
    const localePaths: string[] = [`en: ${baseUrl}/en/calculators/${calc.slug}`];
    if (calc.slugs?.es) localePaths.push(`es: ${baseUrl}/es/calculadoras/${calc.slugs.es}`);
    if (calc.slugs?.fr) localePaths.push(`fr: ${baseUrl}/fr/calculatrices/${calc.slugs.fr}`);
    if (calc.slugs?.de) localePaths.push(`de: ${baseUrl}/de/rechner/${calc.slugs.de}`);
    lines.push(`- **${calc.title}** [${calc.category}] — ${calc.description}`);
    lines.push(`  - URLs: ${localePaths.join(' | ')}`);
  }
  lines.push('');

  lines.push(`## 5. Complete Browser-Based Developer, PDF & Image Utilities (${allTools.length} Tools)`);
  lines.push('');
  for (const tool of allTools) {
    lines.push(
      `- [${tool.title}](${baseUrl}/en/tools/${tool.slug}) [${tool.category}]: ${tool.shortDescription}`
    );
  }
  lines.push('');

  lines.push(`## 6. Complete Technical & Financial Guides (${allGuides.length} Guides)`);
  lines.push('');
  for (const guide of allGuides) {
    lines.push(
      `- [${guide.title}](${baseUrl}/en/guides/${guide.slug}) [${guide.category} · ${guide.readingTime} min · Updated ${guide.lastUpdated}]: ${guide.description}`
    );
  }
  lines.push('');

  lines.push(`## 7. Methodology Comparisons (${comparisons.length}) & Workflow Collections (${collections.length})`);
  lines.push('');
  for (const comp of comparisons) {
    lines.push(`- [${comp.title}](${baseUrl}/en/compare/${comp.slug}): ${comp.seoDescription}`);
    lines.push(`  - Verdict: ${comp.verdict}`);
  }
  lines.push('');
  for (const col of collections) {
    lines.push(`- [${col.title}](${baseUrl}/en/collections/${col.slug}): ${col.description}`);
  }
  lines.push('');

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
