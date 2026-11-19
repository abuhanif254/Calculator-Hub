import React from 'react';
import { Globe } from 'lucide-react';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

const HEADING_BY_LOCALE: Record<string, string> = {
  en: 'Available in:',
  es: 'Disponible en:',
  fr: 'Disponible en :',
  de: 'Verfügbar auf:',
};

const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de'] as const;

function toRelativePath(urlOrPath: string): string {
  try {
    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      return new URL(urlOrPath).pathname;
    }
  } catch {
    // Fall through to raw string
  }
  return urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
}

export function LocaleSiblingLinks({
  languages,
  currentLocale,
  className = '',
}: {
  languages: Record<string, string>;
  currentLocale: string;
  className?: string;
}) {
  const heading = HEADING_BY_LOCALE[currentLocale] || HEADING_BY_LOCALE.en;

  const entries = SUPPORTED_LOCALES.map((loc) => ({
    loc,
    label: LOCALE_LABELS[loc],
    href: languages[loc] ? toRelativePath(languages[loc]) : `/${loc}`,
  }));

  return (
    <nav
      aria-label={heading}
      className={`flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-500 dark:text-slate-400">
        <Globe className="w-3.5 h-3.5 text-[#518231]" aria-hidden="true" />
        <span>{heading}</span>
      </span>
      <ul className="flex flex-wrap items-center gap-1.5">
        {entries.map(({ loc, label, href }) => {
          const isCurrent = loc === currentLocale;
          return (
            <li key={loc}>
              <a
                href={href}
                hrefLang={loc}
                aria-current={isCurrent ? 'page' : undefined}
                className={
                  isCurrent
                    ? 'inline-flex items-center px-2.5 py-1 rounded-full bg-[#518231]/15 text-[#518231] dark:text-[#7ac14d] font-bold border border-[#518231]/30'
                    : 'inline-flex items-center px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-[#518231]/10 hover:text-[#518231] dark:hover:text-[#7ac14d] border border-slate-200/80 dark:border-slate-700/80 font-medium transition-colors'
                }
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
