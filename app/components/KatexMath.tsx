"use client";

import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathProps {
  math: string;
}

export function InlineMath({ math }: MathProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: false,
          throwOnError: false,
        });
      } catch (err) {
        console.error("Error rendering inline math:", err);
      }
    }
  }, [math]);

  // Fallback to plain text container that will be replaced on mount
  return <span ref={containerRef}>{math}</span>;
}

export function BlockMath({ math }: MathProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: true,
          throwOnError: false,
        });
      } catch (err) {
        console.error("Error rendering block math:", err);
      }
    }
  }, [math]);

  // Fallback to plain text container that will be replaced on mount
  return <div ref={containerRef} className="overflow-x-auto my-2 py-1 text-center font-mono">{math}</div>;
}
