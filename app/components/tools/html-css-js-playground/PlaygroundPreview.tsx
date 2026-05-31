"use client";

import React, { useEffect, useState, useRef } from 'react';

import { compileCode, HtmlMode, CssMode, JsMode } from './compiler';

export interface ConsoleMessage {
  method: string;
  data: any[];
}

interface PlaygroundPreviewProps {
  html: string;
  css: string;
  js: string;
  htmlMode: HtmlMode;
  cssMode: CssMode;
  jsMode: JsMode;
  autoRun: boolean;
  runTrigger: number;
  useTailwind: boolean;
  useBootstrap: boolean;
  externalStylesheets?: string[];
  externalScripts?: string[];
  onConsoleMessage: (msg: ConsoleMessage) => void;
  onClearConsole: () => void;
}

export function PlaygroundPreview({
  html,
  css,
  js,
  htmlMode,
  cssMode,
  jsMode,
  autoRun,
  runTrigger,
  useTailwind,
  useBootstrap,
  externalStylesheets = [],
  externalScripts = [],
  onConsoleMessage,
  onClearConsole,
}: PlaygroundPreviewProps) {
  const [srcDoc, setSrcDoc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return;
      
      const { type, payload } = event.data;
      if (type === 'console') {
        onConsoleMessage({
          method: payload.method,
          data: payload.data,
        } as any);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsoleMessage]);

  const buildPreview = async () => {
    try {
      onClearConsole();

      // The script to intercept console logs inside the iframe and send them to the parent window
      const consoleInterceptor = `
        <script>
          (function() {
            const originalConsole = {
              log: console.log,
              error: console.error,
              warn: console.warn,
              info: console.info
            };

            function sendMsg(type, args) {
              try {
                // Try to post raw args so console-feed can render expandable objects
                window.parent.postMessage({ type: 'console', payload: { method: type, data: Array.from(args) } }, '*');
              } catch (e) {
                // Fallback if DataCloneError (e.g. DOM nodes, circular refs)
                const content = Array.from(args).map(a => 
                  typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' ');
                window.parent.postMessage({ type: 'console', payload: { method: type, data: [content] } }, '*');
              }
            }

            console.log = function(...args) { originalConsole.log.apply(console, args); sendMsg('log', args); };
            console.error = function(...args) { originalConsole.error.apply(console, args); sendMsg('error', args); };
            console.warn = function(...args) { originalConsole.warn.apply(console, args); sendMsg('warn', args); };
            console.info = function(...args) { originalConsole.info.apply(console, args); sendMsg('info', args); };

            window.onerror = function(message, source, lineno, colno, error) {
              sendMsg('error', [message + ' at line ' + lineno]);
              return false;
            };
          })();
        </script>
      `;

      const tailwindScript = useTailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : '';
      const bootstrapCss = useBootstrap ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' : '';
      const bootstrapJs = useBootstrap ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>' : '';
      
      const customCss = externalStylesheets.map(url => `<link href="${url}" rel="stylesheet">`).join('\n');
      const customJs = externalScripts.map(url => `<script src="${url}"></script>`).join('\n');

      const { compiledHtml, compiledCss, compiledJs, error } = await compileCode(html, css, js, htmlMode, cssMode, jsMode);

      if (error) {
        onConsoleMessage({ method: 'error', data: [error] });
        return;
      }

      const doc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${tailwindScript}
            ${bootstrapCss}
            ${customCss}
            <style>
              /* Base reset to match modern apps if no libs used, otherwise libs handle it */
              body { margin: 0; padding: 0; font-family: sans-serif; }
              ${compiledCss}
            </style>
          </head>
          <body>
            ${compiledHtml}
            ${consoleInterceptor}
            ${bootstrapJs}
            ${customJs}
            <script>
              ${compiledJs}
            </script>
          </body>
        </html>
      `;

      setSrcDoc(doc);
    } catch (e: any) {
      console.error(e);
      onConsoleMessage({ method: 'error', data: [e?.message || 'Build Error'] });
    }
  };

  useEffect(() => {
    if (autoRun) {
      const timeout = setTimeout(() => {
        buildPreview();
      }, 800); // 800ms debounce
      return () => clearTimeout(timeout);
    }
  }, [html, css, js, htmlMode, cssMode, jsMode, autoRun, useTailwind, useBootstrap]);

  useEffect(() => {
    if (runTrigger > 0) {
      buildPreview();
    }
  }, [runTrigger]);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      title="Live Preview"
      sandbox="allow-scripts allow-modals allow-popups allow-forms"
      className="w-full h-full bg-white border-0"
    />
  );
}
