'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useAuth } from '@/app/components/AuthProvider';
import { X, Command, Search, User as UserIcon, Plus, Info, LayoutTemplate } from 'lucide-react';

export function KeyboardShortcuts({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { appUser } = useAuth();
  const [showHelp, setShowHelp] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === '?') {
        setShowHelp(prev => !prev);
        e.preventDefault();
        return;
      }
      
      if (e.key === 'Escape') {
        setShowHelp(false);
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('community-search-input');
        if (searchInput) {
          searchInput.focus();
        } else {
          // If search input isn't rendered, maybe go to feed page and focus?
          router.push('/community' as any);
        }
        return;
      }
      
      if (e.key === 'n') {
        router.push('/community/new' as any);
        e.preventDefault();
        return;
      }

      const key = e.key.toLowerCase();
      if (['g', 'h', 'p'].includes(key)) {
        const newBuffer = (keyBuffer + key).slice(-2);
        setKeyBuffer(newBuffer);
        
        if (newBuffer === 'gh') {
          router.push('/community' as any); // Navigates to Community home / Hall of Fame
          setKeyBuffer('');
        } else if (newBuffer === 'gp') {
          if (appUser) {
            router.push(`/community/user/${appUser.uid}` as any);
          } else {
            router.push('/login' as any);
          }
          setKeyBuffer('');
        }
      } else {
        setKeyBuffer('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, appUser, keyBuffer]);

  return (
    <>
      {children}
      
      {showHelp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Command className="text-[#518231]" /> Keyboard Shortcuts
              </h2>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                
                {/* General Actions */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Global Actions</h3>
                  <div className="space-y-2">
                    <ShortcutRow label="Show keyboard shortcuts" keys={['?']} icon={<Info size={16} />} />
                    <ShortcutRow label="Search community" keys={['/']} icon={<Search size={16} />} />
                    <ShortcutRow label="Create new post" keys={['n']} icon={<Plus size={16} />} />
                  </div>
                </div>

                {/* Navigation */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Navigation</h3>
                  <div className="space-y-2">
                    <ShortcutRow label="Go to Community Feed" keys={['g', 'h']} icon={<LayoutTemplate size={16} />} />
                    <ShortcutRow label="Go to your Profile" keys={['g', 'p']} icon={<UserIcon size={16} />} />
                  </div>
                </div>

              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-500 flex items-center justify-center gap-1.5">
              Press <Kbd>Esc</Kbd> to close this dialog
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ShortcutRow({ label, keys, icon }: { label: string; keys: string[]; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        <div className="text-slate-400 group-hover:text-[#518231] transition-colors">{icon}</div>
        {label}
      </div>
      <div className="flex items-center gap-1.5">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <Kbd>{key}</Kbd>
            {i < keys.length - 1 && <span className="text-slate-300 dark:text-slate-600 text-xs font-medium px-0.5">then</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="min-w-[24px] h-7 px-2 inline-flex items-center justify-center font-sans text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-b-2 rounded-md shadow-sm uppercase">
      {children}
    </kbd>
  );
}
