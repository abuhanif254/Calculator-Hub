"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { LinkRenderer } from "@/app/components/LinkRenderer";

export function PostMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        a: ({ node, ...props }) => <LinkRenderer {...props} />
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
