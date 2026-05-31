"use client";

import React, { useRef, useEffect } from 'react';
import Editor, { useMonaco, OnMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Loader2 } from 'lucide-react';

import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

interface PlaygroundEditorProps {
  language: 'html' | 'css' | 'javascript' | 'markdown' | 'scss';
  value: string;
  onChange: (value: string | undefined) => void;
  formatTrigger?: number; // Pass a counter to trigger format
  fontSize?: number;
  wordWrap?: 'on' | 'off';
}

export function PlaygroundEditor({ language, value, onChange, formatTrigger, fontSize = 14, wordWrap = 'on' }: PlaygroundEditorProps) {
  const { theme, resolvedTheme } = useTheme();
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const emmetRef = useRef<any>(null);

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Set tab size to 2 for HTML/CSS/JS
    editor.getModel()?.updateOptions({ tabSize: 2 });

    // Enable Emmet
    if (language === 'html' || language === 'markdown') emmetRef.current = emmetHTML(monaco);
    if (language === 'css' || language === 'scss') emmetRef.current = emmetCSS(monaco);
    if (language === 'javascript' || language === 'babel' as any) emmetRef.current = emmetJSX(monaco);
  };

  // Cleanup Emmet on unmount
  useEffect(() => {
    return () => {
      if (emmetRef.current) {
        emmetRef.current(); // The function returned is the dispose function
      }
    };
  }, []);

  // ATA (Automatic Type Acquisition) setup
  const ataRef = useRef<any>(null);
  
  useEffect(() => {
    if (language === 'javascript' && monaco) {
      let isMounted = true;

      const initAta = async () => {
        try {
          const [{ setupTypeAcquisition }, ts] = await Promise.all([
            import('@typescript/ata'),
            import('typescript')
          ]);

          if (!isMounted) return;

          ataRef.current = setupTypeAcquisition({
            projectName: 'NexusPlayground',
            typescript: ts,
            logger: console,
            delegate: {
              receivedFile: (code, path) => {
                if (!isMounted) return;
                // Add the fetched type definition to Monaco
                const tsLang = monaco.languages.typescript as any;
                if (tsLang && tsLang.javascriptDefaults) {
                  tsLang.javascriptDefaults.addExtraLib(code, `file://${path}`);
                  tsLang.typescriptDefaults.addExtraLib(code, `file://${path}`);
                }
              },
              started: () => console.log('ATA Start fetching...'),
              finished: () => console.log('ATA Finished fetching.')
            }
          });

          // Run initial acquisition
          if (value && ataRef.current) ataRef.current(value);
        } catch (e) {
          console.error('Failed to initialize ATA', e);
        }
      };

      initAta();

      return () => {
        isMounted = false;
        ataRef.current = null;
      };
    }
  }, [language, monaco]); // Run once when monaco is ready

  // Trigger ATA on value change (debounced)
  useEffect(() => {
    if (ataRef.current && language === 'javascript') {
      const timeout = setTimeout(() => {
        ataRef.current(value);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [value, language]);

  // Format trigger
  useEffect(() => {
    if (formatTrigger && formatTrigger > 0 && editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  }, [formatTrigger]);

  const editorOptions = React.useMemo(() => ({
    minimap: { enabled: true, scale: 0.75 },
    fontSize: fontSize,
    wordWrap: wordWrap,
    lineNumbers: 'on' as const,
    scrollBeyondLastLine: true,
    automaticLayout: true,
    fixedOverflowWidgets: true,
    padding: { top: 16, bottom: 16 },
    fontFamily: 'Consolas, "Courier New", monospace',
    tabSize: 2,
    formatOnPaste: true,
    autoClosingBrackets: 'always' as const,
    autoClosingQuotes: 'always' as const,
  }), [fontSize, wordWrap]);

  return (
    <div className="w-full h-full relative group">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme={isDark ? 'vs-dark' : 'light'}
        onMount={handleEditorMount}
        loading={
          <div className="flex items-center justify-center h-full text-slate-400">
            <Loader2 className="animate-spin mr-2" size={20} />
            Loading Editor...
          </div>
        }
        options={editorOptions}
      />
      {/* Label for the editor type */}
      <div className="absolute top-2 right-4 text-xs font-bold uppercase tracking-wider text-slate-400/50 pointer-events-none select-none z-10">
        {language}
      </div>
    </div>
  );
}
