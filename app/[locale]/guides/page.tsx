import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  Heart,
  FlaskConical,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  allGuides,
  guidesByCategory,
  featuredGuides,
  type Guide,
  type GuideCategory,
} from '@/lib/data/guides';
import { getCanonicalAndAlternates } from '@/lib/utils/seoUtils';
import { getLocalizedGuide } from '@/lib/utils/guideLocalization';

// ─────────────────────────────────────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GuidesIndex' });
  
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: getCanonicalAndAlternates('/guides', locale),
    openGraph: {
      type: 'website',
      title: t('metaTitle'),
      description: t('metaDescription'),
      siteName: 'Nexus Calculator',
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('metaTitle'),
        description: t('metaDescription'),
        numberOfItems: allGuides.length,
        itemListElement: allGuides.map((g, idx) => {
          const locGuide = getLocalizedGuide(g, locale);
          return {
            '@type': 'ListItem',
            position: idx + 1,
            name: locGuide.title,
            description: locGuide.description,
            url: `https://nexuscalculator.net/${locale}/guides/${locGuide.slug}`,
          };
        }),
      }),
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Category visual config
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_META = {
  Finance: {
    Icon: DollarSign,
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-100 dark:border-emerald-500/20',
    accent: 'text-emerald-600',
  },
  Health: {
    Icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-100 dark:border-rose-500/20',
    accent: 'text-rose-600',
  },
  'Math & Science': {
    Icon: FlaskConical,
    color: 'text-violet-700 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    border: 'border-violet-100 dark:border-violet-500/20',
    accent: 'text-violet-600',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Guide Card Component
// ─────────────────────────────────────────────────────────────────────────────
function GuideCard({ guide, locale, readText, minReadText }: { guide: Guide; locale: string; readText: string; minReadText: string }) {
  const locGuide = getLocalizedGuide(guide, locale);
  const meta = CATEGORY_META[locGuide.category];
  
  return (
    <Link
      href={{ pathname: '/guides/[slug]', params: { slug: locGuide.slug } }}
      className="group block bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20 hover:border-[#518231]/30 dark:hover:border-[#518231]/30 hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}
        >
          <meta.Icon size={11} />
          {locGuide.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock size={11} />
          {locGuide.readingTime} {minReadText}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors duration-200">
        {locGuide.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
        {locGuide.description}
      </p>

      {/* CTA */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#518231] dark:text-[#6fa844] group-hover:gap-2.5 transition-all duration-200">
        {readText}
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function GuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('GuidesIndex');

  const categories = Object.keys(guidesByCategory) as GuideCategory[];

  return (
    <div className="max-w-4xl">
      {/* ── Breadcrumb ───────────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-8"
      >
        <Link
          href="/"
          className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors"
        >
          {t('home')}
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-700 dark:text-slate-300 font-medium">{t('guides')}</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-[#518231]/10 dark:bg-[#518231]/15">
            <BookOpen size={22} className="text-[#518231] dark:text-[#6fa844]" />
          </div>
          <span className="text-sm font-semibold text-[#518231] dark:text-[#6fa844] tracking-wide uppercase">
            {t('documentation')}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
          {t('heroTitlePart1')}{' '}
          <span className="text-[#518231] dark:text-[#6fa844]">{t('heroTitlePart2')}</span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {t('heroDescription')}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            { label: t('statGuides'), value: allGuides.length },
            { label: t('statCategories'), value: categories.length },
            { label: t('statFree'), value: '∞' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/8 rounded-xl px-4 py-2"
            >
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {value}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Featured Guides ───────────────────────────────────────────── */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={16} className="text-amber-500" />
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            {t('featuredGuides')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredGuides.map((guide) => (
            <GuideCard 
              key={guide.slug} 
              guide={guide} 
              locale={locale} 
              readText={t('readGuide')}
              minReadText={t('minRead')} 
            />
          ))}
        </div>
      </section>

      {/* ── All Guides by Category ────────────────────────────────────── */}
      {categories.map((cat) => {
        const meta = CATEGORY_META[cat];
        const guides = guidesByCategory[cat];
        
        let catDesc = '';
        if (cat === 'Finance') catDesc = t('catFinanceDesc');
        if (cat === 'Health') catDesc = t('catHealthDesc');
        if (cat === 'Math & Science') catDesc = t('catMathDesc');

        return (
          <section key={cat} className="mb-14">
            {/* Category heading */}
            <div
              className={`flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-white/5`}
            >
              <div className={`p-2 rounded-xl ${meta.bg} border ${meta.border}`}>
                <meta.Icon size={18} className={meta.color} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {cat}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {catDesc}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <GuideCard 
                  key={guide.slug} 
                  guide={guide} 
                  locale={locale}
                  readText={t('readGuide')}
                  minReadText={t('minRead')} 
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

