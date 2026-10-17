import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowLeft, MessageSquarePlus } from 'lucide-react';
import { queryPostsRest } from '@/lib/firebase-rest';
import { COMMUNITY_CATEGORIES, getCategoryMeta } from '@/lib/categories';
import CommunityFeed, { Post } from '../../CommunityFeed';

export const revalidate = 86400; // Revalidate every 24 hours to conserve Vercel ISR limits
export const dynamicParams = false;

// Generate static params for all known categories
export async function generateStaticParams() {
  return COMMUNITY_CATEGORIES.map(c => ({ slug: c.slug }));
}

const CATEGORY_ENRICHMENT: Record<
  string,
  {
    subtitle: string;
    overview: string[];
    keyTopics: string[];
    featuredTools: { title: string; href: string; desc: string }[];
    faqs: { q: string; a: string }[];
  }
> = {
  'image-tools': {
    subtitle: 'Discuss client-side image compression, WebP/AVIF conversion, EXIF metadata privacy, and Canvas rendering pipelines.',
    overview: [
      'The Image Tools channel brings together frontend developers, digital designers, photographers, and SEO engineers optimizing visual assets for Core Web Vitals (LCP and CLS) and privacy-first workflows.',
      'All NexusCalculator image utilities process raster and vector graphics 100% locally in your browser via the HTML5 Canvas API, WebAssembly codecs, and OffscreenCanvas workers—meaning high-resolution photographs and proprietary design assets never leave your device.'
    ],
    keyTopics: [
      'Lossy vs. lossless compression ratios across WebP, AVIF, PNG, and JPEG formats',
      'Stripping sensitive GPS and camera EXIF metadata before publishing images online',
      'Batch resizing, aspect-ratio cropping, and DPI scaling for print and responsive web layouts',
      'Converting raster graphics to Base64 data URIs and SVG vector paths'
    ],
    featuredTools: [
      { title: 'Image Compressor', href: '/tools/image-compressor', desc: 'Reduce JPEG, PNG, and WebP file sizes by up to 80% locally in your browser.' },
      { title: 'Resize Image', href: '/tools/resize-image', desc: 'Scale pixel dimensions with exact aspect-ratio locking and custom interpolation.' },
      { title: 'Convert to WebP', href: '/tools/convert-to-webp', desc: 'Transform legacy PNG and JPG assets into next-gen WebP format for faster page loads.' },
      { title: 'EXIF Data Viewer', href: '/tools/exif-viewer', desc: 'Inspect and audit embedded camera, lens, and geolocation metadata in photos.' },
    ],
    faqs: [
      {
        q: 'Are images uploaded to a server when using NexusCalculator image tools?',
        a: 'No. Every image tool executes entirely inside your browser using native Canvas and WebAssembly APIs. Your files remain 100% private on your local machine.'
      },
      {
        q: 'Which image format offers the best balance of quality and file size for web SEO?',
        a: 'WebP and AVIF deliver 25% to 50% smaller file sizes compared to equivalent-quality JPEG and PNG files while supporting transparency and animation.'
      }
    ]
  },
  'pdf-tools': {
    subtitle: 'Share workflows for merging, splitting, compressing, encrypting, and converting PDF documents locally in the browser.',
    overview: [
      'The PDF Tools channel is dedicated to document engineering, secure client-side PDF manipulation, OCR text extraction, and automated report generation.',
      'Because financial statements, legal contracts, and medical records contain sensitive personally identifiable information (PII), our community focuses on zero-upload browser-based PDF processing powered by pdf-lib and PDF.js.'
    ],
    keyTopics: [
      'Merging, splitting, and reordering multi-page PDF packets without server uploads',
      'Reducing PDF file sizes for email attachments and government portal submissions',
      'Applying AES password protection, watermarks, and page numbering to confidential documents',
      'Converting between PDF, Word, Excel, PowerPoint, and high-resolution image formats'
    ],
    featuredTools: [
      { title: 'Merge PDF', href: '/tools/merge-pdf', desc: 'Combine multiple PDF documents into a single ordered file in seconds.' },
      { title: 'Compress PDF', href: '/tools/compress-pdf', desc: 'Optimize embedded streams and images to shrink PDF file size.' },
      { title: 'PDF to Word', href: '/tools/pdf-to-word', desc: 'Extract structured paragraphs and tables from PDF into editable DOCX files.' },
      { title: 'Protect PDF', href: '/tools/protect-pdf', desc: 'Encrypt PDF files with strong password protection directly in your browser.' },
    ],
    faqs: [
      {
        q: 'Can I process confidential legal or financial PDFs safely?',
        a: 'Yes. Client-side PDF operations run directly in your browser memory without transmitting your document contents to external cloud storage.'
      },
      {
        q: 'How do I reduce a scanned PDF size without losing text legibility?',
        a: 'Downsample embedded raster scans to 150–200 DPI and apply JPEG/JBIG2 stream compression while keeping vector fonts intact.'
      }
    ]
  },
  finance: {
    subtitle: 'Collaborate on mortgage amortization models, compound interest projections, tax optimization, and corporate finance formulas.',
    overview: [
      'The Finance channel connects financial analysts, homebuyers, accountants, and FIRE (Financial Independence, Retire Early) planners to discuss quantitative modeling and personal finance decisions.',
      'Members share real-world scenarios comparing fixed vs. adjustable-rate mortgages, debt avalanche vs. snowball payoff strategies, discounted cash flow (DCF) valuations, and tax-advantaged retirement accounts.'
    ],
    keyTopics: [
      'Mortgage amortization schedules, extra principal pre-payments, and refinancing break-even analysis',
      'Compound interest, CAGR, IRR, NPV, and inflation-adjusted retirement portfolio modeling',
      'APR vs. APY comparisons across personal loans, auto financing, and credit cards',
      'Salary gross-to-net tax calculations, VAT/sales tax, and freelance margin planning'
    ],
    featuredTools: [
      { title: 'Mortgage Calculator', href: '/calculators/mortgage-calculator', desc: 'Model monthly P&I payments, property taxes, PMI, and full amortization schedules.' },
      { title: 'Compound Interest Calculator', href: '/calculators/compound-interest-calculator', desc: 'Project long-term investment growth with recurring contributions and compounding frequencies.' },
      { title: 'Loan Calculator', href: '/calculators/loan-calculator', desc: 'Compute monthly loan installments, total interest cost, and payoff timelines.' },
      { title: 'IRR Calculator', href: '/calculators/irr-calculator', desc: 'Evaluate Internal Rate of Return and Net Present Value across irregular cash flows.' },
    ],
    faqs: [
      {
        q: 'What is the difference between nominal interest rate and APR?',
        a: 'The nominal interest rate reflects only the base cost of borrowing principal, whereas APR (Annual Percentage Rate) incorporates origination fees, points, and mandatory closing costs.'
      },
      {
        q: 'How do extra principal payments reduce mortgage duration?',
        a: 'Every dollar paid above your scheduled monthly payment directly reduces the principal balance, which lowers the interest accrued in all subsequent compounding periods.'
      }
    ]
  },
  'web-dev': {
    subtitle: 'Discuss web performance, REST API debugging, cryptography, regular expressions, DNS/subnet architecture, and developer utilities.',
    overview: [
      'The Web Dev channel is a technical hub for full-stack software engineers, DevOps architects, and cybersecurity practitioners building modern web applications.',
      'Topics span JSON/YAML schema formatting, JWT token inspection, cryptographic hashing (SHA-256, HMAC, bcrypt), CIDR subnetting, HTTP security headers, and Core Web Vitals optimization.'
    ],
    keyTopics: [
      'Formatting, validating, and diffing JSON, XML, YAML, SQL, and minified JavaScript/CSS payloads',
      'Debugging JWT authentication tokens, Base64/URL encoding, and CORS/HTTP response headers',
      'Designing IPv4/IPv6 CIDR subnet masks, VLAN segmentation, and DNS record propagation',
      'Database PII scanning, GDPR/HIPAA data masking, and UUID v4/v7 primary key generation'
    ],
    featuredTools: [
      { title: 'JSON Formatter & Validator', href: '/tools/json-formatter', desc: 'Beautify, minify, and validate complex JSON payloads with syntax error pinpointing.' },
      { title: 'JWT Decoder', href: '/tools/jwt-decoder', desc: 'Inspect JSON Web Token headers, payload claims, and expiration timestamps locally.' },
      { title: 'Subnet Calculator', href: '/calculators/subnet-calculator', desc: 'Calculate CIDR network ranges, broadcast addresses, and usable host counts.' },
      { title: 'UUID Generator', href: '/tools/uuid-generator', desc: 'Generate RFC 4122 cryptographically random UUIDs in bulk.' },
    ],
    faqs: [
      {
        q: 'Is it safe to paste production JWTs or JSON payloads into NexusCalculator developer tools?',
        a: 'Yes. All formatting, decoding, and hashing tools run 100% client-side in your browser with zero network transmission.'
      },
      {
        q: 'Why choose UUID v7 over UUID v4 for database primary keys?',
        a: 'UUID v7 embeds a millisecond Unix timestamp prefix, providing k-sortable sequential locality that dramatically reduces B-tree index fragmentation in PostgreSQL and MySQL.'
      }
    ]
  },
  calculators: {
    subtitle: 'Explore mathematical formulas, scientific equations, statistical hypothesis testing, physics kinematics, and health metrics.',
    overview: [
      'The Calculators channel covers the mathematical and scientific foundations behind our 300+ interactive calculators across mathematics, statistics, physics, chemistry, health, and construction.',
      'Educators, students, and engineers use this space to verify step-by-step derivations, discuss unit conversion standards, and compare empirical formulas.'
    ],
    keyTopics: [
      'Statistical analysis: standard deviation, Z-scores, p-values, confidence intervals, and probability distributions',
      'Physics and chemistry: ideal gas law, molarity, stoichiometry, projectile motion, and Ohm’s law',
      'Health and physiology: BMI, BMR (Mifflin-St Jeor vs. Harris-Benedict), body fat percentage, and macro targets',
      'Everyday utilities: exact age calculation, business day intervals, GPA weighting, and concrete volume estimation'
    ],
    featuredTools: [
      { title: 'Scientific Calculator', href: '/calculators/scientific-calculator', desc: 'Evaluate trigonometric, logarithmic, exponential, and factorial expressions.' },
      { title: 'Statistics Calculator', href: '/calculators/statistics-calculator', desc: 'Compute mean, median, mode, variance, and standard deviation from raw datasets.' },
      { title: 'BMI Calculator', href: '/calculators/bmi-calculator', desc: 'Calculate Body Mass Index with metric and imperial unit support.' },
      { title: 'Date Calculator', href: '/calculators/date-calculator', desc: 'Find exact calendar duration in years, months, weeks, and business days.' },
    ],
    faqs: [
      {
        q: 'How are formulas verified across NexusCalculator scientific and engineering tools?',
        a: 'Every calculator is benchmarked against NIST constants, peer-reviewed academic textbooks, and IEEE floating-point precision standards.'
      },
      {
        q: 'Can I embed NexusCalculator widgets on my own educational or business website?',
        a: 'Yes. Most calculators include an embed option that generates a responsive iframe snippet for blogs, classrooms, and documentation portals.'
      }
    ]
  },
  general: {
    subtitle: 'General community announcements, productivity workflows, cross-disciplinary Q&A, and platform tips.',
    overview: [
      'Welcome to the General discussion channel—the central town square for the NexusCalculator community. Whether you are combining multiple calculators into a workflow, sharing a spreadsheet tip, or introducing yourself, this is the place to connect.',
      'Our community brings together engineers, students, financial planners, researchers, and everyday problem solvers across four languages (English, Spanish, French, and German).'
    ],
    keyTopics: [
      'Combining financial, statistical, and document utilities into end-to-end workflows',
      'Best practices for browser-local data privacy and offline PWA usage',
      'Cross-language terminology and international unit/currency conventions',
      'Community announcements, newly launched calculators, and seasonal guides'
    ],
    featuredTools: [
      { title: 'All Calculators Directory', href: '/calculators', desc: 'Browse 300+ interactive calculators across finance, health, math, and science.' },
      { title: 'Developer & Web Tools', href: '/tools', desc: 'Explore 100+ browser-based utilities for coding, text, PDF, and image processing.' },
      { title: 'In-Depth Guides', href: '/guides', desc: 'Read comprehensive step-by-step tutorials and formula derivations.' },
      { title: 'Data Privacy Platform', href: '/database-privacy', desc: 'Discover enterprise-grade PII scanning and database anonymization.' },
    ],
    faqs: [
      {
        q: 'Do I need an account to use NexusCalculator tools and calculators?',
        a: 'No account is required to use any calculator, PDF utility, or image tool. Creating a free account is only needed if you want to post in the community forum.'
      },
      {
        q: 'In which languages is NexusCalculator available?',
        a: 'NexusCalculator is fully localized in English (EN), Spanish (ES), French (FR), and German (DE).'
      }
    ]
  },
  'feature-request': {
    subtitle: 'Propose new calculators, suggest formula enhancements, and vote on upcoming developer and document utilities.',
    overview: [
      'The Feature Request channel shapes the product roadmap of NexusCalculator. Many of our most popular regional finance calculators, engineering unit converters, and batch PDF tools started as community proposals right here.',
      'When submitting a request, share the target use case, standard mathematical formula or industry specification, expected input parameters, and desired output charts.'
    ],
    keyTopics: [
      'New calculator proposals for specialized engineering, medical, tax, or regional financial models',
      'UI/UX improvements such as CSV/PDF export tables, interactive charts, and dark-mode contrast',
      'Additional file format support in our browser-based image and document converters',
      'Localization enhancements for regional tax laws, currencies, and measurement units'
    ],
    featuredTools: [
      { title: 'All Calculators Hub', href: '/calculators', desc: 'Check our existing library of 300+ calculators before submitting a new request.' },
      { title: 'All Tools Hub', href: '/tools', desc: 'Explore current developer, PDF, and image tools.' },
      { title: 'Curated Collections', href: '/collections/best-mortgage-calculators', desc: 'See how related calculators are grouped into specialized toolkits.' },
      { title: 'Side-by-Side Comparisons', href: '/compare/apr-vs-apy', desc: 'Explore interactive financial and technical comparison guides.' },
    ],
    faqs: [
      {
        q: 'What details help get a feature request prioritized fastest?',
        a: 'Include the exact mathematical equation or authoritative reference (e.g., IRS publication, engineering standard), sample inputs, and expected outputs.'
      },
      {
        q: 'How are community feature requests evaluated?',
        a: 'Our engineering team reviews requests weekly based on community upvotes, mathematical verifiability, and ability to run 100% client-side.'
      }
    ]
  },
  'bug-report': {
    subtitle: 'Report calculation edge cases, rounding discrepancies, browser compatibility issues, or translation corrections.',
    overview: [
      'Accuracy and reliability are our highest engineering priorities. The Bug Report channel allows users and domain experts to flag floating-point edge cases, mobile layout glitches, or locale formatting issues.',
      'When reporting an issue, please include the calculator or tool URL, the exact input values entered, the expected result versus the observed output, and your browser/OS version.'
    ],
    keyTopics: [
      'Floating-point precision, significant figures, and rounding mode edge cases',
      'Browser compatibility across Chrome, Firefox, Safari, Edge, and mobile WebViews',
      'Regional number formatting (decimal commas vs. points) and translation refinements',
      'Accessibility (ARIA labels, keyboard navigation, and screen-reader announcements)'
    ],
    featuredTools: [
      { title: 'Scientific Calculator', href: '/calculators/scientific-calculator', desc: 'High-precision expression evaluator for cross-checking mathematical results.' },
      { title: 'Percentage Calculator', href: '/calculators/percentage-calculator', desc: 'Verify percentage changes, differences, and ratios.' },
      { title: 'Conversion Calculator', href: '/calculators/conversion-calculator', desc: 'Cross-check SI and imperial unit conversion factors.' },
      { title: 'Contact Engineering Team', href: '/contact-us', desc: 'Reach out directly for security disclosures or urgent platform support.' },
    ],
    faqs: [
      {
        q: 'Why can a monthly loan payment differ by a few cents from my bank statement?',
        a: 'Different lenders apply either actual/365, actual/360, or 30/360 day-count conventions and may round intermediate interest at each billing cycle.'
      },
      {
        q: 'How quickly are verified calculation bugs patched?',
        a: 'Verified formula or rounding discrepancies are prioritized immediately and typically deployed to production within 24 to 48 hours.'
      }
    ]
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const meta = getCategoryMeta(slug);
  if (!meta) return { title: 'Not Found' };
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  const enrichment = CATEGORY_ENRICHMENT[slug] || CATEGORY_ENRICHMENT.general;

  return {
    title: `${meta.emoji} ${meta.label} Discussions & Resource Hub — Community | NexusCalculator`,
    description: `${enrichment.subtitle} Browse ${meta.label} community discussions, technical guides, and curated browser tools on NexusCalculator.`,
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/community/category/[slug]', locale, slug),
  };
}

async function fetchCategoryPosts(category: string): Promise<Post[]> {
  const restPosts = await queryPostsRest({ category, limitCount: 40 });
  return restPosts.map(p => ({
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
    category: p.category,
    isPinned: p.isPinned || false,
    isLocked: p.isLocked || false,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const meta = getCategoryMeta(slug);
  if (!meta) notFound();

  const posts = await fetchCategoryPosts(slug);
  const enrichment = CATEGORY_ENRICHMENT[slug] || CATEGORY_ENRICHMENT.general;

  return (
    <div className="bg-slate-50 dark:bg-[#0B1120] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Back + Header */}
        <div className="mb-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} /> All Channels
          </Link>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border ${meta.color}`}>
                {meta.emoji}
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{meta.label} Community & Resource Hub</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-2xl">
                  {enrichment.subtitle} ({posts.length} discussion{posts.length !== 1 ? 's' : ''})
                </p>
              </div>
            </div>

            <Link
              href="/community/new"
              rel="nofollow"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold text-sm transition-colors shadow-sm"
            >
              <MessageSquarePlus size={16} />
              New Discussion
            </Link>
          </div>
        </div>

        {/* All channels quick-nav strip */}
        <div className="flex flex-wrap gap-2 mb-8">
          {COMMUNITY_CATEGORIES.map(cat => (
            <Link
              key={cat.slug}
              href={`/community/category/${cat.slug}` as any}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                cat.slug === slug
                  ? `${cat.color} ring-2 ring-offset-1 ring-current`
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center mb-10">
            <div className="text-5xl mb-4">{meta.emoji}</div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Start the First {meta.label} Discussion</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Have a technical question, workflow tip, or formula scenario related to {meta.label}? Share it with the NexusCalculator engineering and analyst community.
            </p>
            <Link
              href="/community/new"
              rel="nofollow"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-semibold transition-colors"
            >
              <MessageSquarePlus size={18} /> Start a Discussion
            </Link>
          </div>
        ) : (
          <div className="mb-10">
            <CommunityFeed initialPosts={posts} />
          </div>
        )}

        {/* Channel Technical Overview & Featured Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                About the {meta.label} Channel
              </h2>
              <div className="space-y-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {enrichment.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-6 mb-3">
                Core Discussion Topics & Engineering Themes
              </h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {enrichment.keyTopics.map((topic, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Frequently Asked Questions — {meta.label}
              </h2>
              <div className="space-y-4">
                {enrichment.faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {faq.q}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                Featured {meta.label} Utilities
              </h2>
              <div className="space-y-3">
                {enrichment.featuredTools.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href as any}
                    className="block p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] transition-colors group"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {tool.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
