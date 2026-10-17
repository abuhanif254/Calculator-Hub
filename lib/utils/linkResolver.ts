import { DEV_TOOL_SLUGS, CALC_SLUGS, NON_STANDARD_TITLE_HREFS } from '@/lib/data/linkResolverMap';

// ═══════════════════════════════════════════════════════
// LINK RESOLVER — Single source of truth for title→href mapping.
// Uses lightweight 13 KB lookup sets instead of importing the 1.1 MB
// calculator/tool registries into client components like Navbar.tsx.
// ═══════════════════════════════════════════════════════

// Handle edge cases where sitemapData.ts titles don't exactly match calculator titles
const titleOverrides: Record<string, string> = {
  ...NON_STANDARD_TITLE_HREFS,
  // Developer Community Links
  "Latest Discussions": "/community",
  "Ask a Question": "/community",
  "Share Code Snippets": "/community",
  "Tool Requests": "/community",
  "Bug Reports": "/community",
  "React Discussions": "/community",
  "Next.js Discussions": "/community",
  "Firebase Discussions": "/community",
  "SEO Discussions": "/community",
  "API Discussions": "/community",

  // Trending Tools Links
  "Most Used Today": "/calculators",
  "Recently Added": "/tools",
  "Popular Among Developers": "/collections/developer-starter-pack",
  "Editor's Picks": "/sitemap",

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
  "Database Dump Anonymizer": "/tools/database-anonymizer",
  "Text to Speech": "/tools/text-to-speech",
  "Text to Speech (AI Voice Generator)": "/tools/text-to-speech",
  "Text to Voice": "/tools/text-to-speech",
  "Text to Voice Generator": "/tools/text-to-speech",
  "AI Voice Generator": "/tools/text-to-speech",
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

/**
 * Resolves a calculator/tool title string to its internal href.
 * Falls back to `/sitemap` for unrecognized titles.
 */
export function resolveHref(title: string): string {
  // Check exact title or non-standard title overrides first
  const overrideHref = titleOverrides[title];
  if (overrideHref) return overrideHref;

  if (DEV_TOOL_SLUGS.has(title)) return `/tools/${title}`;
  if (CALC_SLUGS.has(title)) return `/calculators/${title}`;

  // Auto-generate slug from title as a best-effort fallback
  const generatedSlug = title
    .toLowerCase()
    .replace(/\./g, '-')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-+/g, '-');

  if (DEV_TOOL_SLUGS.has(generatedSlug)) {
    return `/tools/${generatedSlug}`;
  }
  if (CALC_SLUGS.has(generatedSlug)) {
    return `/calculators/${generatedSlug}`;
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
