"use client";

import dynamic from 'next/dynamic';
import React from 'react';

export const HtmlCssJsPlaygroundToolBase = dynamic(
  () => import('./HtmlCssJsPlaygroundTool').then((mod) => mod.HtmlCssJsPlaygroundToolBase),
  { ssr: false, loading: () => <div className="p-12 text-center text-slate-500">Loading Editor...</div> }
);

export const PlaygroundEmbedClient = dynamic(
  () => import('./html-css-js-playground/PlaygroundEmbedClient').then((mod) => mod.PlaygroundEmbedClient),
  { ssr: false, loading: () => <div className="p-4 text-center text-slate-500 text-sm">Loading Embed...</div> }
);

export const HtmlCssJsPlaygroundTool = dynamic(
  () => import('./HtmlCssJsPlaygroundTool').then(m => m.HtmlCssJsPlaygroundTool), 
  { ssr: false }
);

export const BlurFacesInImageTool = dynamic(
  () => import('./BlurFacesInImageTool').then(m => m.default), 
  { ssr: false }
);

export const BackgroundRemoverTool = dynamic(
  () => import('./BackgroundRemoverTool').then(m => m.BackgroundRemoverTool), 
  { ssr: false }
);
