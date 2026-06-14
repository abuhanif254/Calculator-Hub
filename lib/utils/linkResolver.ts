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
  // Developer Community Links
  "Latest Discussions": "/community",
  "Ask a Question": "/community/new",
  "Share Code Snippets": "/community/category/web-dev",
  "Tool Requests": "/community/category/feature-request",
  "Bug Reports": "/community/category/bug-report",
  "React Discussions": "/community?q=react",
  "Next.js Discussions": "/community?q=next.js",
  "Firebase Discussions": "/community?q=firebase",
  "SEO Discussions": "/community?q=seo",
  "API Discussions": "/community?q=api",

  // Trending Tools Links
  "Most Used Today": "/#trending-today",
  "Recently Added": "/#recently-updated",
  "Popular Among Developers": "/collections/developer-starter-pack",
  "Editor's Picks": "/search",

  "Credit Cards Payoff Calculator": "/calculators/credit-cards-payoff",
  "Credit Cards Payoff": "/calculators/credit-cards-payoff",
  "Cash Back or Low Interest Calculator": "/calculators/cash-back-vs-low-interest-calculator",
  "401K Calculator": "/calculators/401k-calculator",
  "Roth IRA Calculator": "/calculators/roth-ira-calculator",
  "Mortgage Calculator UK": "/tools/mortgage-calculator-uk",
  "Remove Background": "/tools/background-remover",
  "QR Code Studio": "/tools/qr-code-studio",
  "PDF to Excel": "/tools/pdf-to-excel",
  "PDF to PowerPoint Converter": "/tools/pdf-to-powerpoint",
  "PDF to PPT": "/tools/pdf-to-powerpoint",
  "TXT to PDF": "/tools/text-to-pdf",
  "EPUB to PDF": "/tools/epub-to-pdf",
  "PDF to EPUB": "/tools/pdf-to-epub",
  "Image Metadata Remover": "/tools/image-metadata-remover",
  "Color Picker From Image": "/tools/color-picker-from-image",
  "Color Palette Generator From Image": "/tools/color-palette-generator-from-image",
  "AI Image Upscaler": "/tools/ai-image-upscaler",
  "Blur Faces in Image": "/tools/blur-faces-in-image",
  "Blur Image": "/tools/blur-image",
  "HEIC to JPG": "/tools/heic-to-jpg",
  "SVG to PNG": "/tools/svg-to-png",
  "Favicon Generator": "/tools/favicon-generator",
  "PNG to SVG": "/tools/png-to-svg",
  "PNG to SVG Converter": "/tools/png-to-svg",
  "SVG Optimizer": "/tools/svg-optimizer",
  "SVG Compressor": "/tools/svg-optimizer",
  "SVG Minifier": "/tools/svg-optimizer",
  "SVG Cleaner": "/tools/svg-optimizer",
  "Optimize SVG": "/tools/svg-optimizer",
  "Reduce SVG File Size": "/tools/svg-optimizer",
  "SVG Code Optimizer": "/tools/svg-optimizer",
  "Convert to WebP": "/tools/convert-to-webp",
  "Convert to WEBP": "/tools/convert-to-webp",
  "Image to WebP": "/tools/convert-to-webp",
  "WebP Converter": "/tools/convert-to-webp",
  "JPG to WebP": "/tools/convert-to-webp",
  "PNG to WebP": "/tools/convert-to-webp",
  "Convert to PNG": "/tools/convert-to-png",
  "Image to PNG": "/tools/convert-to-png",
  "PNG Converter": "/tools/convert-to-png",
  "JPG to PNG": "/tools/convert-to-png",
  "WEBP to PNG": "/tools/convert-to-png",
  "Convert Image to PNG": "/tools/convert-to-png",
  "Transparent PNG Converter": "/tools/convert-to-png",
  "Convert to JPG": "/tools/convert-to-jpg",
  "Convert to JPEG": "/tools/convert-to-jpg",
  "Image to JPG": "/tools/convert-to-jpg",
  "PNG to JPG": "/tools/convert-to-jpg",
  "WEBP to JPG": "/tools/convert-to-jpg",
  "AVIF to JPG": "/tools/convert-to-jpg",
  "JPG Converter": "/tools/convert-to-jpg",
  "JPEG Converter": "/tools/convert-to-jpg",
  "Online Image Converter": "/tools/convert-to-jpg",
  "Convert to SVG": "/tools/convert-to-svg",
  "Image to SVG": "/tools/convert-to-svg",
  "SVG Converter": "/tools/convert-to-svg",
  "JPG to SVG": "/tools/convert-to-svg",
  "WEBP to SVG": "/tools/convert-to-svg",
  "Raster to SVG": "/tools/convert-to-svg",
  "Vector Converter": "/tools/convert-to-svg",
  "Vectorize Image": "/tools/convert-to-svg",
  "Online SVG Converter": "/tools/convert-to-svg",
  "SVG Generator": "/tools/convert-to-svg",
  "Convert to GIF": "/tools/convert-to-gif",
  "Image to GIF": "/tools/convert-to-gif",
  "GIF Converter": "/tools/convert-to-gif",
  "GIF Creator": "/tools/convert-to-gif",
  "GIF Maker": "/tools/convert-to-gif",
  "JPG to GIF": "/tools/convert-to-gif",
  "PNG to GIF": "/tools/convert-to-gif",
  "WEBP to GIF": "/tools/convert-to-gif",
  "Animated GIF Creator": "/tools/convert-to-gif",
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
