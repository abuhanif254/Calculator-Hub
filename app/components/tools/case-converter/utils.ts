// AP & Chicago Style Exceptions
const AP_LOWER = new Set(["a", "an", "the", "at", "by", "for", "in", "of", "on", "to", "up", "and", "as", "but", "or", "nor"]);
const CHICAGO_LOWER = new Set([
  "a", "an", "the", "and", "but", "for", "or", "nor", "to", "via", "by", "in", "of", "on", "up", "as",
  "about", "above", "across", "after", "against", "along", "among", "around", "before", "behind",
  "below", "beneath", "beside", "between", "beyond", "down", "during", "except", "from", "inside",
  "into", "like", "near", "off", "onto", "out", "outside", "over", "past", "since", "through",
  "throughout", "till", "toward", "under", "underneath", "until", "upon", "with", "within", "without"
]);

export interface CaseConverterStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
}

export interface SEOTitleAudit {
  status: 'good' | 'warning' | 'error';
  message: string;
}

// ----------------------------------------------------
// Word Extractor & Splitter
// ----------------------------------------------------
export function getWords(str: string): string[] {
  if (!str) return [];
  // Split lowercase to uppercase boundary for camelCase/PascalCase
  const camelSplit = str.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2');
  return camelSplit.match(/[\p{L}\p{N}]+/gu) || [];
}

// ----------------------------------------------------
// Casing Conversion Algorithms
// ----------------------------------------------------

export function toUppercase(str: string): string {
  return str.toUpperCase();
}

export function toLowercase(str: string): string {
  return str.toLowerCase();
}

export function toCapitalizedCase(str: string): string {
  // Capitalize first letter of every word, leave other characters as is or lowercase?
  // Standard capitalized case capitalizes the first letter of each word and downcases the rest.
  return str.replace(/[\p{L}\p{N}]+/gu, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

export function toSentenceCase(str: string): string {
  // Lowercase the entire text first, then capitalize the first letter of sentences
  const lower = str.toLowerCase();
  return lower.replace(/(^\s*|[.!?।？\n]\s*)(\p{L})/gu, (match, separator, char) => {
    return separator + char.toUpperCase();
  });
}

export function toTitleCase(str: string, style: 'standard' | 'ap' | 'chicago' = 'standard'): string {
  if (!str) return "";
  const lowercaseSet = style === 'ap' ? AP_LOWER : style === 'chicago' ? CHICAGO_LOWER : null;
  const words = str.split(/(\s+)/); // Keep whitespace separators
  
  // Find first and last word indices
  let firstWordIdx = -1;
  let lastWordIdx = -1;
  for (let i = 0; i < words.length; i++) {
    if (/[\p{L}\p{N}]/u.test(words[i])) {
      if (firstWordIdx === -1) firstWordIdx = i;
      lastWordIdx = i;
    }
  }

  return words.map((word, idx) => {
    if (!/[\p{L}\p{N}]/u.test(word)) return word;

    const pureWordMatch = word.match(/[\p{L}\p{N}]+/gu);
    if (!pureWordMatch) return word;
    const pureWord = pureWordMatch[0].toLowerCase();

    // Capitalize first/last word or words not in lowercase list
    if (idx === firstWordIdx || idx === lastWordIdx || !lowercaseSet || !lowercaseSet.has(pureWord)) {
      return word.replace(/[\p{L}\p{N}]+/gu, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    }
    return word.toLowerCase();
  }).join('');
}

export function toToggleCase(str: string): string {
  return str.split('').map(char => {
    if (char === char.toUpperCase()) return char.toLowerCase();
    return char.toUpperCase();
  }).join('');
}

export function toAlternatingCase(str: string): string {
  let upper = true;
  return str.split('').map(char => {
    if (/\p{L}/u.test(char)) {
      const newChar = upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
      return newChar;
    }
    return char;
  }).join('');
}

export function toInverseCase(str: string): string {
  // Similar to toggle case but is standard implementation in conversion utilities
  return toToggleCase(str);
}

// ----------------------------------------------------
// Developer Casing Algorithms
// ----------------------------------------------------

export function toCamelCase(str: string): string {
  const words = getWords(str);
  if (words.length === 0) return "";
  return words[0].toLowerCase() + words.slice(1).map(w => {
    const wClean = w.toLowerCase();
    return wClean.charAt(0).toUpperCase() + wClean.slice(1);
  }).join('');
}

export function toPascalCase(str: string): string {
  const words = getWords(str);
  return words.map(w => {
    const wClean = w.toLowerCase();
    return wClean.charAt(0).toUpperCase() + wClean.slice(1);
  }).join('');
}

export function toSnakeCase(str: string): string {
  const words = getWords(str);
  return words.map(w => w.toLowerCase()).join('_');
}

export function toScreamingSnakeCase(str: string): string {
  const words = getWords(str);
  return words.map(w => w.toUpperCase()).join('_');
}

export function toKebabCase(str: string): string {
  const words = getWords(str);
  return words.map(w => w.toLowerCase()).join('-');
}

export function toTrainCase(str: string): string {
  const words = getWords(str);
  return words.map(w => {
    const wClean = w.toLowerCase();
    return wClean.charAt(0).toUpperCase() + wClean.slice(1);
  }).join('-');
}

export function toDotCase(str: string): string {
  const words = getWords(str);
  return words.map(w => w.toLowerCase()).join('.');
}

export function toPathCase(str: string): string {
  const words = getWords(str);
  return words.map(w => w.toLowerCase()).join('/');
}

// ----------------------------------------------------
// Cleanups
// ----------------------------------------------------

export function cleanRemoveExtraSpaces(text: string): string {
  return text.replace(/[ \t]+/g, ' ').replace(/^ +| +$/gm, '');
}

export function cleanRemoveBlankLines(text: string): string {
  return text.split('\n').filter(line => line.trim().length > 0).join('\n');
}

export function cleanNormalizeWhitespace(text: string): string {
  return text.trim().replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
}

// ----------------------------------------------------
// Stats & SEO Audit
// ----------------------------------------------------

export function getStats(text: string): CaseConverterStats {
  if (!text) {
    return { characters: 0, charactersNoSpaces: 0, words: 0, sentences: 0, paragraphs: 0, lines: 0 };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;
  const sentences = (text.match(/[^.!?।？\n]+([.!?।？\n]|$)+/gu) || []).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
  const lines = text.split('\n').length;

  return { characters, charactersNoSpaces, words, sentences, paragraphs, lines };
}

export function auditSEOTitle(text: string): SEOTitleAudit {
  const charLength = text.length;
  if (charLength === 0) {
    return { status: 'warning', message: 'Enter title text to check SEO dimensions.' };
  }

  if (charLength < 40) {
    return {
      status: 'warning',
      message: `Short Title (${charLength} chars). Optimal title length for Google search results is 50-60 characters.`
    };
  }
  
  if (charLength > 60) {
    return {
      status: 'error',
      message: `Long Title (${charLength} chars). Titles over 60 characters are truncated (cut off with ...) in search results.`
    };
  }

  return {
    status: 'good',
    message: `Perfect SEO Title (${charLength} characters). Fits standard desktop and mobile SERPs layout.`
  };
}

// ----------------------------------------------------
// Exports
// ----------------------------------------------------

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateCSVReport(original: string, converted: string, activeCase: string): string {
  const headers = "Metric,Original Value,Converted Value\n";
  const originalStats = getStats(original);
  const convertedStats = getStats(converted);
  
  const rows = [
    `Casing Type,Original,${activeCase}`,
    `Words,${originalStats.words},${convertedStats.words}`,
    `Characters (with spaces),${originalStats.characters},${convertedStats.characters}`,
    `Characters (no spaces),${originalStats.charactersNoSpaces},${convertedStats.charactersNoSpaces}`,
    `Sentences,${originalStats.sentences},${convertedStats.sentences}`,
    `Paragraphs,${originalStats.paragraphs},${convertedStats.paragraphs}`,
    `Lines,${originalStats.lines},${convertedStats.lines}`
  ];

  return headers + rows.join("\n");
}

export function generateJSONReport(original: string, converted: string, activeCase: string): string {
  const report = {
    generatedAt: new Date().toISOString(),
    configuration: {
      activeCaseStyle: activeCase
    },
    statistics: {
      original: getStats(original),
      converted: getStats(converted)
    },
    data: {
      originalText: original,
      convertedText: converted
    }
  };
  return JSON.stringify(report, null, 2);
}
