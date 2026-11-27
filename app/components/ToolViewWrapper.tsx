"use client";

import React, { useState, useEffect, ComponentType } from "react";
import { getToolComponent } from "@/lib/toolComponentRegistry";
import { ErrorBoundary } from "./platform/ui/ErrorBoundary";

interface ToolViewWrapperProps {
  slug: string;
  title: string;
  shortDesc: string;
  locale?: string;
  features?: string[];
  sampleExample?: {
    title?: string;
    description?: string;
    input?: string;
    output?: string;
  };
}

const SSR_TOOL_LABELS: Record<string, {
  workspaceTitle: string;
  inputPane: string;
  outputPane: string;
  featuresHeading: string;
  privacyBadge: string;
  readyStatus: string;
}> = {
  en: {
    workspaceTitle: "Interactive Browser Workspace",
    inputPane: "Sample Input / Parameters",
    outputPane: "Expected Output / Live Result",
    featuresHeading: "Instant In-Browser Capabilities",
    privacyBadge: "100% Client-Side • Zero Server Upload",
    readyStatus: "Ready locally via WebAssembly & JavaScript",
  },
  es: {
    workspaceTitle: "Espacio de Trabajo Interactivo en el Navegador",
    inputPane: "Entrada de Ejemplo / Parámetros",
    outputPane: "Resultado Esperado / Vista Previa",
    featuresHeading: "Capacidades Locales Instantáneas",
    privacyBadge: "100% Local en su Navegador • Sin Subida a Servidores",
    readyStatus: "Listo localmente mediante JavaScript y WebAssembly",
  },
  fr: {
    workspaceTitle: "Espace de Travail Interactif dans le Navigateur",
    inputPane: "Exemple d'Entrée / Paramètres",
    outputPane: "Résultat Attendu / Aperçu Direct",
    featuresHeading: "Fonctionnalités Locales Instantanées",
    privacyBadge: "100 % Local dans le Navigateur • Aucun Envoi Serveur",
    readyStatus: "Prêt localement via JavaScript et WebAssembly",
  },
  de: {
    workspaceTitle: "Interaktiver Browser-Arbeitsbereich",
    inputPane: "Beispieleingabe / Parameter",
    outputPane: "Erwartete Ausgabe / Live-Vorschau",
    featuresHeading: "Direkte Browser-Funktionen",
    privacyBadge: "100 % Lokal im Browser • Kein Server-Upload",
    readyStatus: "Lokal bereit per JavaScript & WebAssembly",
  },
};

export function ToolViewWrapper({
  slug,
  title,
  shortDesc,
  locale = "en",
  features = [],
  sampleExample,
}: ToolViewWrapperProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    const LoadedComponent = getToolComponent(slug);
    setComponent(() => LoadedComponent);
  }, [slug]);

  if (!Component) {
    const ui = SSR_TOOL_LABELS[locale] || SSR_TOOL_LABELS.en;
    const topFeatures = features.slice(0, 3);
    const hasSample = Boolean(sampleExample?.input || sampleExample?.output);

    return (
      <div
        className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 sm:p-6"
        aria-busy="true"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-200/70 dark:border-slate-800">
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 block">
              {title} — {ui.workspaceTitle}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {shortDesc}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {ui.privacyBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[160px] flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {hasSample && sampleExample?.title ? `${ui.inputPane} — ${sampleExample.title}` : ui.inputPane}
            </span>
            {hasSample && sampleExample?.input ? (
              <pre className="my-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words font-mono max-h-28 overflow-hidden">
                {sampleExample.input}
              </pre>
            ) : (
              <p className="my-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {shortDesc}
              </p>
            )}
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {ui.readyStatus}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[160px] flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {hasSample && sampleExample?.output ? ui.outputPane : ui.featuresHeading}
            </span>
            {hasSample && sampleExample?.output ? (
              <pre className="my-3 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 whitespace-pre-wrap break-words font-mono max-h-28 overflow-hidden">
                {sampleExample.output}
              </pre>
            ) : topFeatures.length > 0 ? (
              <ul className="my-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {topFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#518231] font-bold">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="my-3 text-xs text-slate-500 dark:text-slate-400">{ui.privacyBadge}</p>
            )}
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              {ui.privacyBadge}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </div>
  );
}
