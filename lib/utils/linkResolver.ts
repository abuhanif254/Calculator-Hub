import { allTools } from '@/lib/registry';

// ═══════════════════════════════════════════════════════
// LINK RESOLVER — Single source of truth for title→href mapping.
// Replaces the 170+ hardcoded if-statements duplicated across
// Navbar.tsx (desktop + mobile) and Footer.tsx.
// ═══════════════════════════════════════════════════════

// Build the slug map once at module load time
const titleToHrefMap = new Map<string, string>();

allTools.forEach((tool) => {
  titleToHrefMap.set(tool.title, tool.href);
  titleToHrefMap.set(tool.slug, tool.href);
});

// Handle edge cases where sitemapData.ts titles don't exactly match calculator titles
const titleOverrides: Record<string, string> = {
  "Credit Cards Payoff Calculator": "/calculators/credit-cards-payoff",
  "Credit Cards Payoff": "/calculators/credit-cards-payoff",
  "Cash Back or Low Interest Calculator": "/calculators/cash-back-vs-low-interest-calculator",
  "401K Calculator": "/calculators/401k-calculator",
  "Roth IRA Calculator": "/calculators/roth-ira-calculator",
  "Remove Background": "/tools/background-remover",
  "QR Code Studio": "/tools/qr-code-studio",
  "PDF to Excel": "/tools/pdf-to-excel",
  "PDF to PowerPoint Converter": "/tools/pdf-to-powerpoint",
  "PDF to PPT": "/tools/pdf-to-powerpoint",
  "TXT to PDF": "/tools/text-to-pdf",
  "EPUB to PDF": "/tools/epub-to-pdf",
  "PDF to EPUB": "/tools/pdf-to-epub",
};

Object.entries(titleOverrides).forEach(([title, href]) => {
  titleToHrefMap.set(title, href);
});

/**
 * Resolves a calculator/tool title string to its internal href.
 * Falls back to `/sitemap` for unrecognized titles.
 *
 * Usage:
 *   resolveHref("Mortgage Calculator") → "/calculators/mortgage-calculator"
 *   resolveHref("JSON Formatter")      → "/tools/json-formatter" (via toolTitles)
 *   resolveHref("Unknown Tool")        → "/sitemap"
 */
export function resolveHref(title: string): string {
  // Check calculator map first
  const calcHref = titleToHrefMap.get(title);
  if (calcHref) return calcHref;

  // Check title overrides
  const overrideHref = titleOverrides[title];
  if (overrideHref) return overrideHref;

  // Auto-generate slug from title as a best-effort fallback
  // This handles cases where sitemapData.ts has titles like "BMI Calculator"
  // that we haven't manually mapped.
  // We replace dots with dashes first to correctly handle robots.txt and sitemap.xml.
  const generatedSlug = title
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-+/g, '-');

  // Check if a tool exists with this generated slug
  const toolBySlug = allTools.find((t) => t.slug === generatedSlug);
  if (toolBySlug) {
    return toolBySlug.href;
  }

  return '/sitemap';
}

/**
 * Batch-resolve an array of titles. Useful for rendering nav/footer link lists.
 */
export function resolveHrefs(titles: string[]): { title: string; href: string }[] {
  return titles.map((title) => ({
    title,
    href: resolveHref(title),
  }));
}
