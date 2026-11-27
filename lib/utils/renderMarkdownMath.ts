import katex from 'katex';

// Common prose words that indicate a dollar sign is currency (e.g. "$100 to $200"), never inline LaTeX
const PROSE_WORDS_RE =
  /\b(?:and|or|to|for|from|with|per|in|of|the|is|are|was|were|by|at|on|more|less|plus|minus|over|under|each|every|year|years|month|months|week|weeks|day|days|hour|hours|hr|mo|yr|million|billion|thousand|annual|monthly|gross|net|cap|limit|tax|interest|payment|salary|wage|cost|price|fee|fees|value|total|approx|about|up|down|saved|savings|loan|debt|credit|card|home|house|car|auto|rate|return|income|profit|loss|equity|balance|principal|deduction|contribution|threshold|euro|euros|dollars|usd|eur|gbp|para|por|con|sin|entre|hasta|desde|cada|mes|año|años|pour|avec|sans|entre|par|mois|an|ans|und|oder|bis|von|mit|pro|monat|jahr|jahre)\b/i;

const LATEX_COMMAND_RE = /\\(?:[a-zA-Z]+|[,;!%{}$])/;

function renderKatexHtml(expr: string, displayMode: boolean): string {
  // Silence benign KaTeX stderr warnings for non-ASCII symbols like € / ä / ö / ü inside \text{}
  // so Next.js static builds of 2,350+ pages keep Vercel build logs clean.
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === 'string' ? args[0] : '';
    if (first.includes('No character metrics for')) return;
    origWarn.apply(console, args);
  };
  let rendered: string;
  try {
    rendered = katex.renderToString(expr.trim(), {
      displayMode,
      throwOnError: false,
      strict: 'ignore',
      output: 'htmlAndMathml',
    });
  } finally {
    console.warn = origWarn;
  }
  // Escape literal pipe characters inside rendered HTML so Markdown GFM table rows never split on |x|
  const safeHtml = rendered.replace(/\|/g, '&#124;');
  if (displayMode) {
    return `<div class="nexus-math-block my-4 overflow-x-auto text-center">${safeHtml}</div>`;
  }
  return safeHtml;
}

function isLikelyInlineLatex(inner: string): boolean {
  const trimmed = inner.trim();
  if (!trimmed || trimmed.length > 180) return false;
  // Reject leading/trailing whitespace inside $ ... $ (Markdown currency / prose spacing)
  if (/^\s|\s$/.test(inner)) return false;

  // Strong positive: explicit LaTeX command (\frac, \text, \times, \lfloor, \, etc.)
  if (LATEX_COMMAND_RE.test(trimmed)) {
    // Still guard against accidental currency pairs containing a single escaped \$
    if (/^\d[\d,.]*\s+/.test(trimmed) && PROSE_WORDS_RE.test(trimmed)) {
      return false;
    }
    return true;
  }

  // Reject prose sentences (especially currency ranges like "$50,000 in 2026 and $60,000")
  if (PROSE_WORDS_RE.test(trimmed)) return false;

  // Reject bare currency amounts like "$100", "$24,500", "$38.50/hr", "$1.5M"
  if (/^\d[\d,.\s]*(?:k|m|b|%|\/[a-z]+)?$/i.test(trimmed)) return false;

  // Positive: subscript or superscript math expression like H_cm, x^2, r_1, 10^6, E_k
  if (/[_^]/.test(trimmed) && /^[A-Za-z0-9_^{}()[\]=+\-*/.,<>|!':;′″\s]+$/.test(trimmed)) {
    return true;
  }

  // Positive: compact single-variable or algebraic formula (e.g. $ft$, $in$, $r$, $P = V \cdot I$, $p < 0.05$, $z = -0.21$)
  if (
    trimmed.length <= 40 &&
    /^[A-Za-z(>|<±−\-]/.test(trimmed) &&
    /^[A-Za-z0-9()[\]=+\-*/.,<>|!':;′″±×÷≤≥≈≠∞−\s]+$/.test(trimmed) &&
    (trimmed.length <= 4 || /[=<>+\-*/≤≥≈≠±×÷()]/.test(trimmed))
  ) {
    return true;
  }

  return false;
}

/**
 * Safely converts display LaTeX (`$$...$$`) and true inline LaTeX (`$...$`) into
 * server-rendered KaTeX HTML + MathML while preserving fenced code blocks, inline
 * code spans, and literal currency values (e.g. `$24,500`, `$50 to $100`).
 */
export function renderMarkdownMath(markdown: string): string {
  if (!markdown) return '';

  let text = markdown;

  // Fast exit if the document has neither `$` nor raw `<script`
  if (!text.includes('$') && !/<script\b/i.test(text)) {
    return text;
  }

  const protectedBlocks: string[] = [];
  const stash = (raw: string) => {
    const idx = protectedBlocks.length;
    protectedBlocks.push(raw);
    return `@@NEXUS_CODE_STASH_${idx}@@`;
  };

  // 1. Protect fenced code blocks (```...``` and ~~~...~~~)
  text = text.replace(/(^|\r?\n)(```|~~~)[^\r\n]*\r?\n[\s\S]*?\r?\n\2(?=\r?\n|$)/g, (m) => stash(m));

  // 2. Protect inline code spans (`...`)
  text = text.replace(/`[^`\r\n]+`/g, (m) => stash(m));

  // 2.5. Strip any raw <script>...</script> tags OUTSIDE fenced/inline code blocks before rehype-raw
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

  // 3. Render display math blocks ($$...$$) — ignore escaped `\$` (e.g. `$\$$`)
  text = text.replace(/(?<!\\)\$\$([\s\S]+?)(?<!\\)\$\$/g, (match, expr: string) => {
    const clean = expr.trim();
    if (!clean) return match;
    return stash(renderKatexHtml(clean, true));
  });

  // 4. Render currency-safe inline LaTeX ($...$) on single lines (allowing escaped `\$` inside math)
  text = text.replace(/(^|[^\\$A-Za-z0-9])\$((?:\\\$|[^\r\n$])+?)\$(?!\d)/g, (match, prefix: string, inner: string) => {
    if (!isLikelyInlineLatex(inner)) {
      return match;
    }
    return `${prefix}${stash(renderKatexHtml(inner, false))}`;
  });

  // 5. Restore protected code blocks & rendered KaTeX blocks (iterate in reverse in case of nesting)
  for (let i = protectedBlocks.length - 1; i >= 0; i--) {
    text = text.replace(`@@NEXUS_CODE_STASH_${i}@@`, () => protectedBlocks[i]);
  }

  return text;
}
