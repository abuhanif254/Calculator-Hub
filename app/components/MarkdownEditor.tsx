"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const MarkdownEditor = ({ content, onChange }: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `community-uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // Insert markdown image syntax at cursor position
      const textarea = textareaRef.current;
      if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const imageMarkdown = `\n![${file.name}](${downloadURL})\n`;
        
        const newContent = content.substring(0, startPos) + imageMarkdown + content.substring(endPos);
        onChange(newContent);
        
        // Reset cursor position
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(startPos + imageMarkdown.length, startPos + imageMarkdown.length);
        }, 0);
      } else {
        onChange(content + `\n![${file.name}](${downloadURL})\n`);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset input
      }
    }
  };

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm focus-within:border-[#518231] focus-within:ring-1 focus-within:ring-[#518231] transition-all flex flex-col">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-t-xl">
        <button
          type="button"
          onClick={() => setIsPreview(false)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${!isPreview ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setIsPreview(true)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${isPreview ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          Preview
        </button>
        
        {!isPreview && (
          <div className="ml-auto flex items-center">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
              title="Upload Image (Max 5MB)"
            >
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
              <span className="hidden sm:inline">{isUploading ? 'Uploading...' : 'Add Image'}</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4 min-h-[300px] flex flex-col">
        {isPreview ? (
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-[#518231] hover:prose-a:text-[#436a28] prose-p:leading-relaxed prose-pre:bg-[#0d1117] dark:prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-pre:text-slate-200 prose-blockquote:border-l-[#518231] prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg">
            {content.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-slate-400 italic">Nothing to preview</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Use Markdown to format your post. e.g. **bold**, *italic*, `code`. Drag & drop images or use the toolbar button to upload."
            className="w-full flex-1 min-h-[300px] resize-y bg-transparent outline-none text-slate-900 dark:text-white font-mono text-sm leading-relaxed"
          />
        )}
      </div>
    </div>
  );
};
