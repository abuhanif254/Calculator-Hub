"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { v4 as uuidv4 } from "uuid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
  fontFamily: "inherit",
});

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  // Generating a stable ID for this instance based on a short UUID
  const [id] = useState(`mermaid-${uuidv4().replace(/-/g, '').substring(0, 8)}`);

  useEffect(() => {
    let isMounted = true;
    const renderChart = async () => {
      try {
        if (containerRef.current) {
          const { svg } = await mermaid.render(id, chart);
          if (isMounted) {
            setSvgContent(svg);
          }
        }
      } catch (e) {
        console.error("Mermaid parsing error:", e);
        if (isMounted) {
          setSvgContent(`<div class="text-red-500 p-4 border border-red-500 rounded bg-red-50">Error rendering diagram</div>`);
        }
      }
    };
    renderChart();
    
    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div 
      className="mermaid-container flex justify-center my-6 overflow-x-auto p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svgContent || `<div class="animate-pulse flex space-x-4"><div class="flex-1 space-y-6 py-1"><div class="h-2 bg-slate-200 rounded"></div><div class="space-y-3"><div class="grid grid-cols-3 gap-4"><div class="h-2 bg-slate-200 rounded col-span-2"></div><div class="h-2 bg-slate-200 rounded col-span-1"></div></div><div class="h-2 bg-slate-200 rounded"></div></div></div></div>` }} 
    />
  );
}
