'use client';

import { useState, useRef } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  }

  // ── Success state ──────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        className="flex flex-col items-center gap-4 py-4"
        style={{ animation: 'fadeInUp 0.4s ease-out forwards' }}
      >
        <div className="w-16 h-16 rounded-full bg-[#518231]/20 border-2 border-[#518231] flex items-center justify-center">
          <CheckCircle2 className="text-[#518231] w-8 h-8" />
        </div>
        <p className="text-2xl font-bold text-white">🎉 You&apos;re on the list!</p>
        <p className="text-slate-300 text-sm max-w-xs text-center">
          Thanks for subscribing. We&apos;ll notify you as soon as new tools ship.
        </p>
      </div>
    );
  }

  // ── Form state ─────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Email input */}
        <div className="relative flex-grow">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') { setStatus('idle'); setErrorMsg(''); }
            }}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className={`
              w-full bg-white/10 border text-white placeholder-slate-400
              rounded-xl pl-12 pr-4 py-4
              focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent
              transition-all disabled:opacity-60
              ${status === 'error'
                ? 'border-red-500/60 focus:ring-red-500'
                : 'border-white/20'
              }
            `}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="bg-[#518231] hover:bg-[#436a28] disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Subscribing…
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Inline error message */}
      {status === 'error' && errorMsg && (
        <div
          className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          style={{ animation: 'fadeInUp 0.3s ease-out forwards' }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <p className="text-slate-400 text-sm text-center">
        No spam, ever. Unsubscribe any time.
      </p>
    </form>
  );
}
