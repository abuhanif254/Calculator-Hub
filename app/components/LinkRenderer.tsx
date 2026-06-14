import React from 'react';
import { ExternalLink, PlayCircle, Code2, Link as LinkIcon } from 'lucide-react';

interface LinkRendererProps {
  href?: string;
  children?: React.ReactNode;
}

export function LinkRenderer({ href, children }: LinkRendererProps) {
  if (!href) return <span>{children}</span>;

  // 1. YouTube Embed
  const ytMatch = href.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return (
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-900 max-w-3xl">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <PlayCircle size={16} className="text-red-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">YouTube Video</span>
          <a href={href} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-slate-500 hover:text-[#518231] flex items-center gap-1">
            Watch on YouTube <ExternalLink size={12} />
          </a>
        </div>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  // 2. CodePen Embed
  const cpMatch = href.match(/codepen\.io\/([^\/]+)\/pen\/([a-zA-Z0-9]+)/i);
  if (cpMatch && cpMatch[1] && cpMatch[2]) {
    const user = cpMatch[1];
    const hash = cpMatch[2];
    return (
      <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-900 max-w-3xl">
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
          <Code2 size={16} className="text-blue-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">CodePen Embed</span>
          <a href={href} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-slate-500 hover:text-[#518231] flex items-center gap-1">
            Open in CodePen <ExternalLink size={12} />
          </a>
        </div>
        <iframe
          height="400"
          style={{ width: '100%' }}
          scrolling="no"
          title="CodePen Embed"
          src={`https://codepen.io/${user}/embed/${hash}?default-tab=result&theme-id=dark`}
          frameBorder="no"
          loading="lazy"
          allowTransparency
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // 3. Fallback: Styled Card/Pill for normal links
  // If the link text is just the URL itself, render a pill. 
  // If it's descriptive text (e.g., [My Link](http...)), render a nice inline link.
  
  const isRawUrl = typeof children === 'string' && children === href;
  
  if (isRawUrl) {
    try {
      const url = new URL(href);
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 my-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 transition-colors no-underline group"
        >
          <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shrink-0">
            <LinkIcon size={12} className="text-slate-400 group-hover:text-[#518231] transition-colors" />
          </div>
          <span className="truncate max-w-[200px] sm:max-w-xs">{url.hostname.replace('www.', '')}</span>
          <ExternalLink size={12} className="text-slate-400 ml-1 shrink-0" />
        </a>
      );
    } catch (e) {
      // Invalid URL fallback
    }
  }

  // Regular descriptive markdown link
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[#518231] hover:text-[#436a28] hover:underline transition-colors font-medium decoration-2 underline-offset-2"
    >
      {children}
    </a>
  );
}
