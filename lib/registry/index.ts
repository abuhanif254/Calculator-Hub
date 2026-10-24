// ═══════════════════════════════════════════════════════
// UNIFIED TOOL REGISTRY
// ═══════════════════════════════════════════════════════
// Single source of truth for ALL platform tools —
// calculators, developer tools, comparisons, and collections.
// ═══════════════════════════════════════════════════════

import { calculators } from '@/lib/data/calculators';
import { allToolsConfig } from '@/lib/data/tools';
import { comparisons } from '@/lib/data/comparisons';
import { collections } from '@/lib/data/collections';
import { getCategoryForCalculator } from '@/lib/data/categories';

export type ToolType = 'calculator' | 'developer-tool' | 'comparison' | 'collection';

export interface UnifiedToolEntry {
  slug: string;
  type: ToolType;
  title: string;
  description: string;
  category: string;
  categoryId: string;       // URL-safe category slug
  keywords: string;
  href: string;             // Full internal href
  status: 'published';
  lastUpdated?: string;
}

// ─── Build the registry once at module load time ─────
const registry: UnifiedToolEntry[] = [];

// 1) Register all calculators
calculators.forEach((calc) => {
  const catDef = getCategoryForCalculator(calc.category);
  const trTitles = Object.values(calc.translations || {})
    .map((t) => t.title)
    .join(', ');
  registry.push({
    slug: calc.slug,
    type: 'calculator',
    title: calc.title,
    description: calc.description,
    category: calc.category,
    categoryId: catDef?.id ?? 'other',
    keywords: [calc.meta.keywords, trTitles].filter(Boolean).join(', '),
    href: `/calculators/${calc.slug}`,
    status: 'published',
    lastUpdated: calc.meta.lastUpdated,
  });
});

// 2) Register all implemented developer tools
Object.values(allToolsConfig).forEach((tool) => {
  registry.push({
    slug: tool.slug,
    type: 'developer-tool',
    title: tool.title,
    description: tool.shortDescription,
    category: tool.category,
    categoryId: 'developer-tools',
    keywords: tool.keywords.join(', '),
    href: `/tools/${tool.slug}`,
    status: 'published',
    lastUpdated: tool.lastUpdated,
  });
});

// 3) Register all side-by-side comparisons
comparisons.forEach((comp) => {
  const trTitles = Object.values(comp.translations || {})
    .map((t) => t.title)
    .join(', ');
  registry.push({
    slug: comp.slug,
    type: 'comparison',
    title: comp.title,
    description: comp.seoDescription,
    category: 'Comparisons',
    categoryId: 'comparisons',
    keywords: [comp.title, trTitles, comp.toolA, comp.toolB].filter(Boolean).join(', '),
    href: `/compare/${comp.slug}`,
    status: 'published',
  });
});

// 4) Register all curated workflow collections
collections.forEach((col) => {
  const trTitles = Object.values(col.translations || {})
    .map((t) => t.title)
    .join(', ');
  registry.push({
    slug: col.slug,
    type: 'collection',
    title: col.title,
    description: col.description,
    category: 'Collections',
    categoryId: 'collections',
    keywords: [col.title, trTitles, 'toolkit', 'collection'].filter(Boolean).join(', '),
    href: `/collections/${col.slug}`,
    status: 'published',
  });
});

// ═══════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════

/** All registered tools (calculators + dev tools + comparisons + collections) */
export const allTools: readonly UnifiedToolEntry[] = Object.freeze(registry);

/** Get a tool by slug */
export function getToolBySlug(slug: string): UnifiedToolEntry | undefined {
  return registry.find((t) => t.slug === slug);
}

/** Search across all tools by query string */
export function searchTools(query: string, limit = 20): UnifiedToolEntry[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return registry
    .filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

/** Get tools by type */
export function getToolsByType(type: ToolType): UnifiedToolEntry[] {
  return registry.filter((t) => t.type === type);
}

/** Get tools by category ID */
export function getToolsByCategory(categoryId: string): UnifiedToolEntry[] {
  return registry.filter((t) => t.categoryId === categoryId);
}

/** Total counts */
export const toolCounts = {
  total: registry.length,
  calculators: registry.filter((t) => t.type === 'calculator').length,
  developerTools: registry.filter((t) => t.type === 'developer-tool').length,
} as const;
