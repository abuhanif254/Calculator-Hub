// Canonical category definitions for the community
// slug → display metadata

export const COMMUNITY_CATEGORIES = [
  { slug: 'general',         label: 'General',         emoji: '💬', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
  { slug: 'web-dev',         label: 'Web Dev',         emoji: '🌐', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
  { slug: 'finance',         label: 'Finance',         emoji: '💰', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  { slug: 'image-tools',     label: 'Image Tools',     emoji: '🖼️', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
  { slug: 'pdf-tools',       label: 'PDF Tools',       emoji: '📄', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800' },
  { slug: 'calculators',     label: 'Calculators',     emoji: '🧮', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  { slug: 'feature-request', label: 'Feature Request', emoji: '🚀', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' },
  { slug: 'bug-report',      label: 'Bug Report',      emoji: '🐛', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
] as const;

export type CategorySlug = typeof COMMUNITY_CATEGORIES[number]['slug'];

export function getCategoryMeta(slug: string) {
  return COMMUNITY_CATEGORIES.find(c => c.slug === slug) ?? null;
}

export function CategoryPill({ slug, className = '' }: { slug: string; className?: string }) {
  const meta = getCategoryMeta(slug);
  if (!meta) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${meta.color} ${className}`}>
      <span>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
