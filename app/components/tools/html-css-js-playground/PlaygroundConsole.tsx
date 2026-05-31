"use client";

import React, { useRef, useEffect } from 'react';
import { ConsoleMessage } from './PlaygroundPreview';
import { Terminal, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Console, Hook, Unhook } from 'console-feed';

interface PlaygroundConsoleProps {
  messages: any[];
  onClear: () => void;
}

export function PlaygroundConsole({ messages, onClear }: PlaygroundConsoleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-slate-300 font-mono text-sm border-t border-slate-700/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#252526] shrink-0">
        <div className="flex items-center gap-2 font-semibold text-slate-400">
          <Terminal size={14} />
          Console
        </div>
        <button
          onClick={onClear}
          className="text-slate-400 hover:text-slate-200 transition-colors"
          title="Clear Console"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div ref={containerRef} className="flex-1 overflow-y-auto custom-scrollbar relative">
        <div className="absolute min-w-full">
          <Console logs={messages as any} variant="dark" />
        </div>
      </div>
    </div>
  );
}
