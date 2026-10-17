"use client";

import React, { useState, useEffect, ComponentType } from "react";
import { getToolComponent } from "@/lib/toolComponentRegistry";
import { ErrorBoundary } from "./platform/ui/ErrorBoundary";

interface ToolViewWrapperProps {
  slug: string;
  title: string;
  shortDesc: string;
  locale?: string;
}

const SSR_TOOL_LABELS: Record<string, {
  workspaceTitle: string;
  inputPane: string;
  outputPane: string;
  privacyBadge: string;
  readyStatus: string;
}> = {
  en: {
    workspaceTitle: "Interactive Browser Workspace",
    inputPane: "Source Input / Configuration",
    outputPane: "Processed Output / Live Preview",
    privacyBadge: "100% Client-Side • Zero Server Upload",
    readyStatus: "Initializing local WebAssembly / JavaScript processing engine...",
  },
  es: {
    workspaceTitle: "Espacio de Trabajo Interactivo en el Navegador",
    inputPane: "Entrada de Datos / Configuración",
    outputPane: "Resultado Procesado / Vista Previa",
    privacyBadge: "100% Local en su Navegador • Sin Subida a Servidores",
    readyStatus: "Inicializando motor de procesamiento local JavaScript / WebAssembly...",
  },
  fr: {
    workspaceTitle: "Espace de Travail Interactif dans le Navigateur",
    inputPane: "Données d'Entrée / Configuration",
    outputPane: "Résultat Traité / Aperçu en Direct",
    privacyBadge: "100 % Local dans le Navigateur • Aucun Envoi Serveur",
    readyStatus: "Initialisation du moteur de traitement local JavaScript / WebAssembly...",
  },
  de: {
    workspaceTitle: "Interaktiver Browser-Arbeitsbereich",
    inputPane: "Eingabedaten / Konfiguration",
    outputPane: "Verarbeitete Ausgabe / Live-Vorschau",
    privacyBadge: "100 % Lokal im Browser • Kein Server-Upload",
    readyStatus: "Lokale JavaScript- / WebAssembly-Engine wird initialisiert...",
  },
};

export function ToolViewWrapper({
  slug,
  title,
  shortDesc,
  locale = "en",
}: ToolViewWrapperProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    const LoadedComponent = getToolComponent(slug);
    setComponent(() => LoadedComponent);
  }, [slug]);

  if (!Component) {
    const ui = SSR_TOOL_LABELS[locale] || SSR_TOOL_LABELS.en;

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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {ui.privacyBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[180px] flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {ui.inputPane}
            </span>
            <div className="space-y-2 my-4">
              <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              {ui.readyStatus}
            </span>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[180px] flex flex-col justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {ui.outputPane}
            </span>
            <div className="space-y-2 my-4">
              <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
              <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            </div>
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
