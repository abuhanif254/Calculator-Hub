import React from "react";
import { Link, resolveIntlHref } from "@/i18n/routing";
import { ArrowRight, GitBranch, Scale, Layers } from "lucide-react";

export interface NextStepItem {
  slug: string;
  title: string;
  description: string;
  href: string;
  badgeType: "step1" | "step2" | "compare" | "toolkit";
}

interface NextStepWorkflowCardProps {
  currentTitle: string;
  locale: string;
  items: NextStepItem[];
}

const workflowTranslations: Record<
  string,
  {
    eyebrow: string;
    heading: (title: string) => string;
    step1: string;
    step2: string;
    compare: string;
    toolkit: string;
    cta: string;
  }
> = {
  en: {
    eyebrow: "Continue Your Calculation Workflow",
    heading: (title) => `What to Calculate After ${title}`,
    step1: "Next Step 1",
    step2: "Next Step 2",
    compare: "Side-by-Side Comparison",
    toolkit: "Complete Toolkit",
    cta: "Open Tool",
  },
  es: {
    eyebrow: "Continúe su Flujo de Cálculo",
    heading: (title) => `Qué Calcular Después de ${title}`,
    step1: "Siguiente Paso 1",
    step2: "Siguiente Paso 2",
    compare: "Comparativa Lado a Lado",
    toolkit: "Kit Completo",
    cta: "Abrir",
  },
  fr: {
    eyebrow: "Poursuivez Votre Simulation",
    heading: (title) => `Que Calculer Après ${title}`,
    step1: "Étape Suivante 1",
    step2: "Étape Suivante 2",
    compare: "Comparatif Côte à Côte",
    toolkit: "Pack Complet",
    cta: "Ouvrir",
  },
  de: {
    eyebrow: "Berechnungs-Workflow fortsetzen",
    heading: (title) => `Nächste Schritte nach ${title}`,
    step1: "Nächster Schritt 1",
    step2: "Nächster Schritt 2",
    compare: "Direktvergleich",
    toolkit: "Komplettes Toolkit",
    cta: "Öffnen",
  },
};

export function NextStepWorkflowCard({
  currentTitle,
  locale,
  items,
}: NextStepWorkflowCardProps) {
  if (!items || items.length === 0) return null;

  const t = workflowTranslations[locale] || workflowTranslations.en;

  const getBadgeLabel = (type: NextStepItem["badgeType"]) => {
    if (type === "step1") return t.step1;
    if (type === "step2") return t.step2;
    if (type === "compare") return t.compare;
    return t.toolkit;
  };

  return (
    <section
      aria-label={t.eyebrow}
      className="my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-slate-50 dark:from-slate-900 dark:via-[#518231]/10 dark:to-slate-900 border border-[#518231]/25 dark:border-[#518231]/30 shadow-sm print:hidden"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-[#518231]/15 text-[#518231] dark:text-[#6fa844] shrink-0">
          <GitBranch className="w-4 h-4" />
        </div>
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
            {t.eyebrow}
          </span>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
            {t.heading(currentTitle)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {items.slice(0, 3).map((item) => (
          <Link
            key={`${item.badgeType}-${item.slug}`}
            href={resolveIntlHref(item.href)}
            className="group flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#6fa844] transition-all shadow-xs hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844]">
                  {item.badgeType === "compare" ? (
                    <Scale className="w-3 h-3" />
                  ) : item.badgeType === "toolkit" ? (
                    <Layers className="w-3 h-3" />
                  ) : null}
                  {getBadgeLabel(item.badgeType)}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors line-clamp-1 mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
