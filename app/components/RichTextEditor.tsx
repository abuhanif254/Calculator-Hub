"use client";

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('bold') ? 'bg-slate-200 dark:bg-slate-700 text-[#518231]' : 'text-slate-600 dark:text-slate-400'}`}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('italic') ? 'bg-slate-200 dark:bg-slate-700 text-[#518231]' : 'text-slate-600 dark:text-slate-400'}`}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      
      <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('bulletList') ? 'bg-slate-200 dark:bg-slate-700 text-[#518231]' : 'text-slate-600 dark:text-slate-400'}`}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('orderedList') ? 'bg-slate-200 dark:bg-slate-700 text-[#518231]' : 'text-slate-600 dark:text-slate-400'}`}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1" />

      <button
        type="button"
        onClick={setLink}
        className={`p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${editor.isActive('link') ? 'bg-slate-200 dark:bg-slate-700 text-[#518231]' : 'text-slate-600 dark:text-slate-400'}`}
        title="Insert Link"
      >
        <LinkIcon size={18} />
      </button>
    </div>
  );
};

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none dark:prose-invert min-h-[300px] p-4 max-w-none',
      },
    },
  });

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm focus-within:border-[#518231] focus-within:ring-1 focus-within:ring-[#518231] transition-all">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
