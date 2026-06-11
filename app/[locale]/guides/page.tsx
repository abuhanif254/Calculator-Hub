import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
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

// ─────────────────────────────────────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Calculator Guides & How-To Articles',
    description:
      'Step-by-step guides, formulas, and expert walkthroughs for every calculator on Nexus. Learn finance, health, and math calculation methods trusted globally.',
    alternates: getCanonicalAndAlternates('/guides', locale),
    openGraph: {
      type: 'website',
      title: 'Calculator Guides & How-To Articles | Nexus Calculator',
      description:
        'Expert walkthroughs for finance, health, and math calculators. Learn compound interest, BMI, loan amortization, and more with real-world examples.',
      siteName: 'Nexus Calculator',
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Nexus Calculator Guides',
        description:
          'A comprehensive documentation hub of calculator how-to guides and educational articles.',
        numberOfItems: allGuides.length,
        itemListElement: allGuides.map((guide, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: guide.title,
          description: guide.description,
          url: `https://nexuscalculator.net/en/guides/${guide.slug}`,
        })),
      }),
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Category visual config
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_META: Record<
  GuideCategory,
  {
    Icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
    accent: string;
    description: string;
  }
> = {
  Finance: {
    Icon: DollarSign,
    color: 'text-emerald-700 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-100 dark:border-emerald-500/20',
    accent: 'text-emerald-600',
    description: 'Mortgages, loans, investments, and personal finance',
  },
  Health: {
    Icon: Heart,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
    border: 'border-rose-100 dark:border-rose-500/20',
    accent: 'text-rose-600',
    description: 'BMI, calorie needs, body fat, pregnancy tracking',
  },
  'Math & Science': {
    Icon: FlaskConical,
    color: 'text-violet-700 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    border: 'border-violet-100 dark:border-violet-500/20',
    accent: 'text-violet-600',
    description: 'Percentages, statistics, unit conversions, and more',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Guide Card Component
// ─────────────────────────────────────────────────────────────────────────────
function GuideCard({ guide }: { guide: Guide }) {
  const meta = CATEGORY_META[guide.category];
  return (
    <Link
      href={{ pathname: '/guides/[slug]', params: { slug: guide.slug } }}
      className="group block bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-white/8 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/20 hover:border-[#518231]/30 dark:hover:border-[#518231]/30 hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}
        >
          <meta.Icon size={11} />
          {guide.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock size={11} />
          {guide.readingTime} min read
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors duration-200">
        {guide.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
        {guide.description}
      </p>

      {/* CTA */}
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#518231] dark:text-[#6fa844] group-hover:gap-2.5 transition-all duration-200">
        Read guide
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
          Home
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-700 dark:text-slate-300 font-medium">Guides</span>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-[#518231]/10 dark:bg-[#518231]/15">
            <BookOpen size={22} className="text-[#518231] dark:text-[#6fa844]" />
          </div>
          <span className="text-sm font-semibold text-[#518231] dark:text-[#6fa844] tracking-wide uppercase">
            Documentation
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
          Calculator Guides &amp;{' '}
          <span className="text-[#518231] dark:text-[#6fa844]">How-To Articles</span>
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Expert-written walkthroughs for every calculator on Nexus. Learn the formulas
          behind each tool, understand your results, and apply them to real-world
          decisions — whether you&apos;re managing finances, tracking health, or solving
          math problems.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mt-6">
          {[
            { label: 'Guides', value: allGuides.length },
            { label: 'Categories', value: categories.length },
            { label: 'Free & Open', value: '∞' },
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
            Featured Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* ── All Guides by Category ────────────────────────────────────── */}
      {categories.map((cat) => {
        const meta = CATEGORY_META[cat];
        const guides = guidesByCategory[cat];

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
                  {meta.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
