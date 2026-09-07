import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface StaticMathFormulaProps {
  latex: string;
  fallback?: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Server-rendered KaTeX formula component.
 * Produces semantic MathML and KaTeX HTML synchronously during SSG/SSR,
 * allowing search engine crawlers (Googlebot) to index mathematical
 * notation directly from raw HTML.
 */
export function StaticMathFormula({
  latex,
  fallback,
  className = "",
  displayMode = true,
}: StaticMathFormulaProps) {
  try {
    const html = katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
    });

    return (
      <div
        className={`overflow-x-auto py-2 px-1 text-slate-900 dark:text-slate-100 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (err) {
    return (
      <div className={`overflow-x-auto py-2 font-mono text-center text-sm ${className}`}>
        {fallback || latex}
      </div>
    );
  }
}
