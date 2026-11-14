import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import { MessageSquarePlus, Users, TrendingUp, Trophy } from 'lucide-react';
import { fetchPostsRest } from '../../../lib/firebase-rest';
import CommunityFeed, { Post } from './CommunityFeed';
import { Flame } from 'lucide-react';
import { COMMUNITY_CATEGORIES } from '../../../lib/categories';

// ═══════════════════════════════════════════════════════
// COMMUNITY INDEX PAGE — SERVER COMPONENT
// ═══════════════════════════════════════════════════════

export const revalidate = 86400; // ISR: revalidate every 24 hours to conserve Vercel limits

// The Post interface is now exported from CommunityFeed.tsx

const communityMetaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Community Discussions & Q&A Forum | NexusCalculator',
    description: 'Join the NexusCalculator professional community. Ask questions, share formulas, and discuss financial calculators, developer utilities, PDF tools, and engineering models.',
  },
  es: {
    title: 'Foro de la Comunidad y Preguntas Técnicas | NexusCalculator',
    description: 'Únete a la comunidad profesional de NexusCalculator. Comparte fórmulas, resuelve dudas y debate sobre calculadoras financieras, científicas y herramientas de desarrollo.',
  },
  fr: {
    title: 'Forum de la Communauté et Discussions Techniques | NexusCalculator',
    description: 'Rejoignez la communauté NexusCalculator. Posez vos questions, partagez vos formules et échangez sur les calculateurs financiers, scientifiques et outils développeurs.',
  },
  de: {
    title: 'Community-Forum & Fachdiskussionen | NexusCalculator',
    description: 'Werden Sie Teil der NexusCalculator-Community. Diskutieren Sie über Finanzrechner, mathematische Formeln, Entwickler-Tools und technische Berechnungen.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates, optimizeSerpTitle } = await import('@/lib/utils/seoUtils');
  const meta = communityMetaByLocale[locale] || communityMetaByLocale.en;

  return {
    title: optimizeSerpTitle(meta.title, locale, 'page'),
    description: meta.description,
    alternates: getCanonicalAndAlternates('/community', locale),
  };
}

const LOCALIZED_CATEGORY_LABELS: Record<string, Record<string, string>> = {
  en: {
    'image-tools': 'Image Tools',
    'pdf-tools': 'PDF Tools',
    finance: 'Finance',
    'web-dev': 'Web Dev',
    calculators: 'Calculators',
    general: 'General',
    'feature-request': 'Feature Request',
    'bug-report': 'Bug Report',
  },
  es: {
    'image-tools': 'Herramientas de Imagen',
    'pdf-tools': 'Herramientas PDF',
    finance: 'Finanzas',
    'web-dev': 'Desarrollo Web',
    calculators: 'Calculadoras',
    general: 'General',
    'feature-request': 'Solicitud de Funciones',
    'bug-report': 'Reporte de Errores',
  },
  fr: {
    'image-tools': 'Outils Image',
    'pdf-tools': 'Outils PDF',
    finance: 'Finance',
    'web-dev': 'Développement Web',
    calculators: 'Calculatrices',
    general: 'Général',
    'feature-request': 'Idées & Suggestions',
    'bug-report': 'Signalement de Bugs',
  },
  de: {
    'image-tools': 'Bild-Werkzeuge',
    'pdf-tools': 'PDF-Werkzeuge',
    finance: 'Finanzen',
    'web-dev': 'Webentwicklung',
    calculators: 'Rechner',
    general: 'Allgemein',
    'feature-request': 'Funktionswünsche',
    'bug-report': 'Fehlermeldungen',
  },
};

const COMMUNITY_EDITORIAL_COPY: Record<
  string,
  {
    channelsHeading: string;
    trendingHeading: string;
    hofTitle: string;
    hofDesc: string;
    hofCta: string;
    charterHeading: string;
    charterIntro: string;
    pillars: { title: string; body: string }[];
  }
> = {
  en: {
    channelsHeading: 'Channels',
    trendingHeading: 'Trending Now',
    hofTitle: 'Hall of Fame',
    hofDesc: 'Discover our top contributors and peer-reviewed technical discussions.',
    hofCta: 'View Hall of Fame →',
    charterHeading: 'About the NexusCalculator Engineering & Analyst Community',
    charterIntro:
      'The NexusCalculator Community is a moderated technical forum where financial analysts, software engineers, students, and researchers share mathematical derivations, verify calculator edge cases, and exchange workflow best practices across our 330+ calculators and browser utilities.',
    pillars: [
      {
        title: '1. Quantitative Formula Verification & Peer Review',
        body: 'Discuss amortization conventions (CFPB Regulation Z, Canadian semi-annual compounding, UK LTV tiers), clinical biometric equations (Mifflin-St Jeor, WHO BMI percentiles), and IEEE 754 floating-point precision across complex multi-step calculations.',
      },
      {
        title: '2. Client-Side Developer, PDF & Image Workflows',
        body: 'Exchange tips on optimizing JSON/SQL/YAML formatting pipelines, automating batch image compression (WebP/AVIF), and processing confidential PDF documents locally in your browser using WebAssembly without uploading sensitive files to external servers.',
      },
      {
        title: '3. Editorial Moderation & Quality Standards',
        body: 'To maintain a high-signal technical resource, all public threads are moderated for mathematical accuracy, constructive analysis, and spam prevention. Discussions must provide clear problem context, sample inputs, or reproducible steps.',
      },
    ],
  },
  es: {
    channelsHeading: 'Canales Temáticos',
    trendingHeading: 'Tendencias Ahora',
    hofTitle: 'Salón de la Fama',
    hofDesc: 'Descubre a nuestros principales colaboradores y los mejores debates técnicos.',
    hofCta: 'Ver Salón de la Fama →',
    charterHeading: 'Sobre la Comunidad Técnica y de Análisis de NexusCalculator',
    charterIntro:
      'La Comunidad de NexusCalculator es un foro técnico moderado donde analistas financieros, ingenieros de software, estudiantes e investigadores comparten demostraciones matemáticas, validan casos prácticos y optimizan flujos de trabajo en más de 330 calculadoras y utilidades web.',
    pillars: [
      {
        title: '1. Verificación de Fórmulas Cuantitativas y Revisión por Pares',
        body: 'Debata sobre sistemas de amortización hipotecaria (sistema francés, TAE/APR y pagos anticipados), ecuaciones biométricas clínicas (Mifflin-St Jeor, percentiles OMS) y precisión numérica IEEE 754 de doble precisión.',
      },
      {
        title: '2. Flujos de Trabajo para Desarrolladores, PDF e Imágenes',
        body: 'Comparta buenas prácticas sobre validación de esquemas JSON/SQL/YAML, compresión de imágenes para Core Web Vitals y procesamiento local de documentos PDF mediante WebAssembly con privacidad total.',
      },
      {
        title: '3. Normas de Moderación y Calidad Editorial',
        body: 'Para preservar un entorno técnico riguroso y libre de spam, todas las publicaciones se revisan conforme a criterios de exactitud matemática, claridad expositiva y utilidad práctica para la comunidad.',
      },
    ],
  },
  fr: {
    channelsHeading: 'Canaux Thématiques',
    trendingHeading: 'Tendances Actuelles',
    hofTitle: 'Temple de la Renommée',
    hofDesc: 'Découvrez nos meilleurs contributeurs et les discussions techniques de référence.',
    hofCta: 'Voir le Classement →',
    charterHeading: 'À Propos de la Communauté d’Ingénierie et d’Analyse NexusCalculator',
    charterIntro:
      'La Communauté NexusCalculator est un espace d’échange technique modéré où analystes financiers, ingénieurs logiciels, enseignants et étudiants partagent des démonstrations mathématiques, vérifient des cas limites et optimisent leurs méthodes de travail sur plus de 330 calculatrices et outils.',
    pillars: [
      {
        title: '1. Validation Mathématique et Revue par les Pairs',
        body: 'Échangez sur les modèles d’amortissement financier (TAEG, intérêts composés, remboursements anticipés), les formules biométriques (Mifflin-St Jeor, IMC OMS) et la précision de calcul en virgule flottante IEEE 754.',
      },
      {
        title: '2. Outils Développeur, PDF et Image 100 % Locaux',
        body: 'Partagez vos astuces sur le formatage JSON/SQL/YAML, l’optimisation d’images WebP/AVIF et la manipulation confidentielle de fichiers PDF directement dans le navigateur grâce à WebAssembly.',
      },
      {
        title: '3. Charte de Modération et Exigence de Qualité',
        body: 'Afin de garantir des échanges pertinents et sans spam, chaque discussion publique est modérée selon des critères de rigueur méthodologique, de clarté des données d’entrée et de reproductibilité.',
      },
    ],
  },
  de: {
    channelsHeading: 'Themenkanäle',
    trendingHeading: 'Aktuell im Trend',
    hofTitle: 'Ruhmeshalle',
    hofDesc: 'Entdecken Sie unsere Top-Mitwirkenden und die besten Fachdiskussionen.',
    hofCta: 'Zur Ruhmeshalle →',
    charterHeading: 'Über die NexusCalculator Fach- und Entwickler-Community',
    charterIntro:
      'Die NexusCalculator-Community ist ein moderiertes Fachforum, in dem Finanzanalysten, Softwareentwickler, Ingenieure und Studierende mathematische Herleitungen diskutieren, Praxisszenarien prüfen und Workflows rund um unsere über 330 Online-Rechner und Werkzeuge austauschen.',
    pillars: [
      {
        title: '1. Mathematische Formelprüfung & Fachlicher Austausch',
        body: 'Diskutieren Sie finanzmathematische Modelle (Annuitätendarlehen, Effektivzins, Sondertilgung), biometrische Referenzformeln (Mifflin-St Jeor, WHO-Perzentile) und doppelt genaue IEEE-754-Gleitkomma-Arithmetik.',
      },
      {
        title: '2. Lokale Entwickler-, PDF- und Bild-Workflows',
        body: 'Tauschen Sie Best Practices zur Validierung von JSON-, SQL- und YAML-Strukturen, zur verlustfreien Bildkomprimierung sowie zur DSGVO-konformen lokalen PDF-Bearbeitung via WebAssembly aus.',
      },
      {
        title: '3. Redaktionelle Moderation & Qualitätsstandards',
        body: 'Um eine hohe fachliche Qualität ohne Spam sicherzustellen, werden alle öffentlichen Beiträge auf nachvollziehbare Fragestellungen, konkrete Beispielwerte und sachliche Lösungswege geprüft.',
      },
    ],
  },
};

async function fetchPosts(): Promise<Post[]> {
  const restPosts = await fetchPostsRest();
  return restPosts
    .filter((p) => {
      if (!p.slug || p.slug === 'hello-cca921ec' || p.slug.startsWith('to-use-a-')) return false;
      const plainLen = (p.content || '').replace(/<[^>]+>/g, ' ').trim().length;
      return plainLen >= 40;
    })
    .map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      content: p.content,
      authorId: p.authorId,
      authorName: p.authorName,
      authorRole: p.authorRole,
      authorBadges: p.authorBadges,
      createdAt: p.createdAt,
      upvotes: p.upvotes,
      replyCount: p.replyCount,
      tags: p.tags,
      category: (p as any).category,
      viewCount: (p as any).viewCount || 0,
      isPinned: p.isPinned || false,
      isLocked: p.isLocked || false
    }));
}



export default async function CommunityIndex({ 
  params
}: { 
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const initialQuery = '';

  const posts = await fetchPosts();
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Community' });
  const copy = COMMUNITY_EDITORIAL_COPY[resolvedParams.locale] || COMMUNITY_EDITORIAL_COPY.en;
  const catLabels = LOCALIZED_CATEGORY_LABELS[resolvedParams.locale] || LOCALIZED_CATEGORY_LABELS.en;

  // Compute trending sidebar data directly from already-fetched posts (avoids duplicate Firestore query)
  const now = Date.now();
  const trendingPosts = [...posts]
    .map(p => {
      const ageDays = Math.max(0.1, (now - p.createdAt) / (1000 * 60 * 60 * 24));
      const score = ((p.upvotes || 0) * 3 + (p.replyCount || 0) * 2) / Math.pow(ageDays + 2, 1.5);
      return { post: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.post);

  const forumSchema = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: 'NexusCalculator Community Discussions',
    url: (await import('@/lib/utils/seoUtils')).getCanonicalUrl('/community', resolvedParams.locale),
    description: 'Global community forum for developers, designers, financial planners, and everyday users. Discuss web tools, image processing, PDF utilities, and high-precision calculators.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forumSchema) }}
      />

      <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen py-6 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('title')}
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href="/community/new"
              rel="nofollow"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#518231]/20 hover:shadow-[#518231]/40 transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquarePlus size={20} />
              {t('startDiscussion')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Feed Column (Client Component) */}
            <CommunityFeed initialPosts={posts} initialSearchQuery={initialQuery} />

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              <div className="bg-gradient-to-br from-[#518231] to-[#3a5e23] rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">{t('welcomeTitle')}</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  {t('welcomeText')}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Users size={18} />
                  <span>{t('joinConversation')}</span>
                </div>
              </div>

              {/* Channels Widget */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#518231]" />
                  {copy.channelsHeading}
                </h3>
                <div className="space-y-1">
                  {COMMUNITY_CATEGORIES.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/community/category/${cat.slug}` as any}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">{cat.emoji}</span>
                      {catLabels[cat.slug] || cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">{t('guidelinesTitle')}</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#518231] flex-shrink-0"></div>
                    {t('guideline3')}
                  </li>
                </ul>
              </div>

              {/* 🔥 Trending Now Widget */}
              {trendingPosts.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Flame size={18} className="text-orange-500" />
                    {copy.trendingHeading}
                  </h3>
                  <ol className="space-y-3">
                    {trendingPosts.map((post, i) => {
                      const plainWords = (post.content || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
                      const isIndexable = plainWords >= 100 && post.slug !== 'hello-cca921ec' && !post.slug.startsWith('to-use-a-');
                      return (
                      <li key={post.id}>
                        <Link 
                          href={`/community/${post.slug}` as any}
                          rel={isIndexable ? undefined : 'nofollow'}
                          className="flex items-start gap-3 group"
                        >
                          <span className={`flex-shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center rounded-full text-[10px] font-black ${
                            i === 0 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                            i === 1 ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' :
                            'bg-slate-50 text-slate-400 dark:bg-slate-800/50 dark:text-slate-500'
                          }`}>{i + 1}</span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight line-clamp-2">
                              {post.title}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              ❤️ {post.upvotes} &nbsp;·&nbsp; 💬 {post.replyCount}
                            </p>
                          </div>
                        </Link>
                      </li>
                      );
                    })}
                  </ol>
                </div>
              )}

              {/* Hall of Fame link */}
              <Link
                href="/community/hall-of-fame" 
                className="block bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/50 p-6 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                    <Trophy size={20} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{copy.hofTitle}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {copy.hofDesc}
                </p>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-500 flex items-center gap-1">
                  {copy.hofCta}
                </span>
              </Link>

            </div>

          </div>

          {/* Server-Rendered Publisher Charter & Technical Domain Overview */}
          <section className="mt-14 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
              {copy.charterHeading}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-4xl">
              {copy.charterIntro}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 p-5"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
