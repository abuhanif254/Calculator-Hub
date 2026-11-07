import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { fetchTopUsersRest, queryPostsRest } from '@/lib/firebase-rest';
import { Link } from '@/i18n/routing';
import { Trophy, Star, Crown, MessageSquare, ArrowRight, ChevronRight, User as UserIcon } from 'lucide-react';
import { BADGES } from '@/lib/badges';
import { getCanonicalAndAlternates } from '@/lib/utils/seoUtils';

export const revalidate = 86400; // ISR: revalidate every 24 hours

interface HallOfFameLocaleCopy {
  metaTitle: string;
  metaDescription: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  topContributorsHeading: string;
  repLabel: string;
  postsLabel: string;
  answersLabel: string;
  goldenThreadsHeading: string;
  topBadge: string;
  readDiscussion: string;
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  methodologyHeading: string;
  methodologyP1: string;
  methodologyP2: string;
}

const HALL_OF_FAME_I18N: Record<string, HallOfFameLocaleCopy> = {
  en: {
    metaTitle: 'Community Hall of Fame — Top Contributors & Discussions | NexusCalculator',
    metaDescription: 'Discover the highest-ranked contributors, quantitative researchers, and peer-reviewed technical discussions in the NexusCalculator Community Hall of Fame.',
    titlePrefix: 'Hall of ',
    titleHighlight: 'Fame',
    subtitle: 'Celebrating our most helpful community members and the peer-reviewed technical discussions that shaped NexusCalculator.',
    topContributorsHeading: 'Top Contributors',
    repLabel: 'Rep',
    postsLabel: 'posts',
    answersLabel: 'answers',
    goldenThreadsHeading: 'Golden Threads',
    topBadge: 'Top',
    readDiscussion: 'Read Discussion',
    ctaHeading: 'Want to join the Hall of Fame?',
    ctaBody: 'Help fellow engineers and analysts by answering calculation questions, sharing verified formulas, and participating in technical discussions to earn reputation points.',
    ctaButton: 'Go to Community',
    methodologyHeading: 'How Community Reputation & Recognition Works',
    methodologyP1: 'The NexusCalculator Hall of Fame recognizes domain experts, financial analysts, software engineers, and educators who contribute accurate, well-documented explanations across our calculator and developer utility categories.',
    methodologyP2: 'Reputation points are awarded when community members upvote verified mathematical derivations, benchmarked code snippets, or practical workflow solutions.',
  },
  es: {
    metaTitle: 'Salón de la Fama de la Comunidad — Mejores Colaboradores | NexusCalculator',
    metaDescription: 'Descubre a los colaboradores mejor valorados, analistas cuantitativos y debates técnicos destacados en el Salón de la Fama de la Comunidad de NexusCalculator.',
    titlePrefix: 'Salón de la ',
    titleHighlight: 'Fama',
    subtitle: 'Celebrando a los miembros más colaboradores de nuestra comunidad y los debates técnicos que han dado forma a NexusCalculator.',
    topContributorsHeading: 'Principales Colaboradores',
    repLabel: 'Rep.',
    postsLabel: 'publicaciones',
    answersLabel: 'respuestas',
    goldenThreadsHeading: 'Debates Destacados',
    topBadge: 'Top',
    readDiscussion: 'Leer Debate',
    ctaHeading: '¿Quieres unirte al Salón de la Fama?',
    ctaBody: 'Ayuda a otros usuarios respondiendo preguntas técnicas, publicando guías detalladas y participando activamente en la comunidad para ganar puntos de reputación.',
    ctaButton: 'Ir a la Comunidad',
    methodologyHeading: 'Cómo Funciona el Sistema de Reputación y Reconocimiento',
    methodologyP1: 'El Salón de la Fama de NexusCalculator reconoce a ingenieros, analistas financieros, científicos de datos y educadores que aportan explicaciones verificadas y casos prácticos en nuestras categorías de calculadoras y herramientas.',
    methodologyP2: 'Los puntos de reputación se otorgan cuando la comunidad valora positivamente demostraciones matemáticas, fragmentos de código probados o soluciones técnicas de alto impacto.',
  },
  fr: {
    metaTitle: 'Temple de la Renommée de la Communauté — Meilleurs Contributeurs | NexusCalculator',
    metaDescription: 'Découvrez les principaux contributeurs, analystes quantitatifs et discussions techniques de référence dans le Temple de la Renommée de la communauté NexusCalculator.',
    titlePrefix: 'Temple de la ',
    titleHighlight: 'Renommée',
    subtitle: 'Célébrons les membres les plus actifs de notre communauté et les discussions techniques de référence qui façonnent NexusCalculator.',
    topContributorsHeading: 'Meilleurs Contributeurs',
    repLabel: 'Rép.',
    postsLabel: 'publications',
    answersLabel: 'réponses',
    goldenThreadsHeading: 'Discussions d’Or',
    topBadge: 'Top',
    readDiscussion: 'Lire la Discussion',
    ctaHeading: 'Envie de rejoindre le Temple de la Renommée ?',
    ctaBody: 'Aidez les autres utilisateurs en répondant aux questions méthodologiques, en partageant des guides précis et en participant aux discussions pour gagner des points de réputation.',
    ctaButton: 'Accéder à la Communauté',
    methodologyHeading: 'Fonctionnement de la Réputation et des Distinctions Communautaires',
    methodologyP1: 'Le Temple de la Renommée de NexusCalculator met à l’honneur les ingénieurs, analystes financiers, chercheurs et enseignants qui partagent des formules vérifiées et des résolutions concrètes.',
    methodologyP2: 'Les points de réputation sont attribués lorsque la communauté vote pour des démonstrations rigoureuses, des exemples de configuration ou des bonnes pratiques d’ingénierie.',
  },
  de: {
    metaTitle: 'Ruhmeshalle der Community — Top-Mitwirkende & Diskussionen | NexusCalculator',
    metaDescription: 'Entdecken Sie die führenden Mitwirkenden, Fachanalysten und wertvollsten technischen Diskussionen in der NexusCalculator Community-Ruhmeshalle.',
    titlePrefix: 'Ruhmes',
    titleHighlight: 'halle',
    subtitle: 'Wir ehren unsere engagiertesten Community-Mitglieder und die herausragenden Fachdiskussionen, die NexusCalculator geprägt haben.',
    topContributorsHeading: 'Top-Mitwirkende',
    repLabel: 'Rep.',
    postsLabel: 'Beiträge',
    answersLabel: 'Antworten',
    goldenThreadsHeading: 'Legendäre Diskussionen',
    topBadge: 'Top',
    readDiscussion: 'Diskussion lesen',
    ctaHeading: 'Möchten Sie in die Ruhmeshalle aufgenommen werden?',
    ctaBody: 'Unterstützen Sie andere Nutzer durch präzise Fachantworten, praxisnahe Rechenbeispiele und aktive Teilnahme in der Community, um Reputationspunkte zu sammeln.',
    ctaButton: 'Zur Community',
    methodologyHeading: 'Wie das Reputations- und Auszeichnungssystem funktioniert',
    methodologyP1: 'Die Ruhmeshalle von NexusCalculator würdigt Ingenieure, Finanzanalysten, Naturwissenschaftler und Entwickler, die fundierte Lösungswege und geprüfte Formeln zu unseren Rechnern und Entwickler-Tools beitragen.',
    methodologyP2: 'Reputationspunkte werden vergeben, wenn Mitglieder hilfreiche mathematische Herleitungen, geprüfte Codebeispiele oder nachvollziehbare Praxislösungen positiv bewerten.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = HALL_OF_FAME_I18N[locale] || HALL_OF_FAME_I18N.en;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/community/hall-of-fame', locale),
  };
}

export default async function HallOfFamePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  setRequestLocale(locale);
  const copy = HALL_OF_FAME_I18N[locale] || HALL_OF_FAME_I18N.en;

  // Fetch top 10 users by reputation
  const topUsers = await fetchTopUsersRest(10);

  // Fetch top 5 posts of all time by upvotes
  const goldenPosts = await queryPostsRest({ sortMethod: 'top', limitCount: 5 });

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
            <Trophy size={200} className="text-amber-500" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-6 shadow-sm">
              <Crown size={32} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {copy.titlePrefix}<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">{copy.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Top Contributors Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <Star className="text-amber-500" size={28} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{copy.topContributorsHeading}</h2>
            </div>

            <div className="space-y-4">
              {topUsers.map((user, index) => {
                const isTop3 = index < 3;
                const rankColors = [
                  'bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-amber-500/30',
                  'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800 shadow-slate-400/30',
                  'bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-amber-800/30',
                ];

                return (
                  <Link
                    key={user.id}
                    href={`/community/user/${user.id}` as any}
                    className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full font-black text-xl md:text-2xl shadow-lg ${isTop3 ? rankColors[index] : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      #{index + 1}
                    </div>

                    <div className="relative">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm" />
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm">
                          <UserIcon size={28} className="text-slate-400" />
                        </div>
                      )}
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-amber-500 text-white p-1 rounded-full shadow-sm">
                          <Crown size={14} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {user.displayName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Star size={14} className="fill-current" /> {user.reputation.toLocaleString()} {copy.repLabel}
                        </span>
                        <span>•</span>
                        <span>{user.postCount || 0} {copy.postsLabel}</span>
                        <span>•</span>
                        <span>{user.commentCount || 0} {copy.answersLabel}</span>
                      </div>
                    </div>

                    {/* Badges Preview */}
                    <div className="hidden sm:flex items-center -space-x-2 mr-2">
                      {user.badges?.slice(0, 3).map((badgeId: string) => {
                        const badgeDef = BADGES[badgeId];
                        if (!badgeDef) return null;
                        const BadgeIcon = badgeDef.icon;
                        return (
                          <div
                            key={badgeId}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${badgeDef.bgClass} shadow-sm border border-white/20`}
                            title={badgeDef.name}
                          >
                            <BadgeIcon size={14} className={badgeDef.colorClass} />
                          </div>
                        );
                      })}
                      {(user.badges?.length || 0) > 3 && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400">
                          +{user.badges.length - 3}
                        </div>
                      )}
                    </div>

                    <ChevronRight className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors ml-2 flex-shrink-0" size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Golden Posts Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <MessageSquare className="text-amber-500" size={28} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{copy.goldenThreadsHeading}</h2>
            </div>

            <div className="space-y-4">
              {goldenPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/${post.slug}` as any}
                  className="block bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-slate-900 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 shadow-sm hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 dark:bg-amber-500/5 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>

                  <div className="flex items-start justify-between gap-4 mb-3 relative z-10">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-col items-center flex-shrink-0 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/50">
                      <span className="text-xs uppercase tracking-wider font-extrabold mb-0.5">{copy.topBadge}</span>
                      <span className="font-black text-lg leading-none">+{post.upvotes}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 relative z-10">
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>

                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-500 relative z-10">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                      <UserIcon size={12} />
                      {post.authorName}
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500 group-hover:underline">
                      {copy.readDiscussion} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 bg-[#518231] rounded-2xl p-8 text-white shadow-lg text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none -mr-4 -mt-4"></div>
              <h3 className="text-xl font-bold mb-3 relative z-10">{copy.ctaHeading}</h3>
              <p className="text-white/90 text-sm mb-6 relative z-10 max-w-sm mx-auto">
                {copy.ctaBody}
              </p>
              <Link
                href="/community"
                className="inline-block bg-white text-[#518231] hover:bg-slate-50 font-bold px-6 py-2.5 rounded-xl shadow-sm transition-colors relative z-10"
              >
                {copy.ctaButton}
              </Link>
            </div>

          </div>

        </div>

        {/* Localized Editorial Methodology Section */}
        <section className="mt-16 bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {copy.methodologyHeading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {copy.methodologyP1}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {copy.methodologyP2}
          </p>
        </section>
      </div>
    </div>
  );
}
