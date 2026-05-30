// Unicode-safe word matching regex. Matches letter/number clusters and respects internal apostrophes.
export const WORD_REGEX = /[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu;

// Standard English stop words for filtering in keyword density analysis
export const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", 
  "is", "was", "were", "be", "been", "being", "are", "this", "that", "it", 
  "of", "by", "from", "as", "has", "have", "had", "do", "does", "did", "not",
  "i", "you", "he", "she", "they", "we", "us", "him", "her", "them", "my", 
  "your", "his", "their", "our", "its", "so", "if", "then", "else", "than",
  "about", "into", "through", "over", "under", "again", "further", "then", "once",
  "here", "there", "when", "where", "why", "how", "all", "any", "both", "each",
  "few", "more", "most", "other", "some", "such", "no", "nor", "too", "very",
  "can", "will", "just", "should", "would", "now"
]);

export interface BasicStats {
  words: number;
  uniqueWords: number;
  repeatedWords: number;
  sentences: number;
  paragraphs: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  letters: number;
  numbers: number;
  symbols: number;
  spaces: number;
}

export interface AdvancedStats {
  averageWordLength: number;
  averageSentenceLength: number;
  averageParagraphLength: number;
  lexicalDiversity: number; // unique words / total words
  longestWord: string;
  shortestWord: string;
}

export interface ReadabilityMetrics {
  fleschEase: number;
  fleschKincaidGrade: number;
  difficultyLabel: string;
  educationLevel: string;
  description: string;
}

export interface ReadingTimes {
  reading: { slow: number; average: number; fast: number };
  speaking: { slow: number; average: number; fast: number };
  presentation: { slow: number; average: number; fast: number };
}

export interface KeywordDensity {
  phrase: string;
  count: number;
  percentage: number;
}

export interface SocialMediaLimit {
  name: string;
  limit: number;
  used: number;
  remaining: number;
  percent: number;
  status: 'ok' | 'warning' | 'danger';
}

export interface SEOAudit {
  score: number;
  issues: { id: string; label: string; status: 'good' | 'warning' | 'error'; tip: string }[];
}

export interface HighlightItem {
  text: string;
  type: 'long-sentence' | 'passive-voice';
  suggestion: string;
  index: number;
}

// ----------------------------------------------------
// Calculations
// ----------------------------------------------------

export function countSyllables(word: string): number {
  const w = word.toLowerCase().trim();
  if (w.length === 0) return 0;
  
  // If word is non-Latin, use a generic heuristic (roughly length / 2)
  if (!/^[a-z]+$/i.test(w)) {
    return Math.max(1, Math.round(w.length / 2));
  }
  
  if (w.length <= 3) return 1;
  
  // Strip non-alpha
  const cleaned = w.replace(/[^a-z]/g, '');
  if (!cleaned) return 1;

  // Syllable heuristics for English
  let formatted = cleaned;
  // Strip trailing "es", "ed", and silent "e" at end
  formatted = formatted.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  // Adjust starting 'y'
  formatted = formatted.replace(/^y/, '');

  const vowelSequences = formatted.match(/[aeiouy]{1,2}/g);
  return Math.max(1, vowelSequences ? vowelSequences.length : 0);
}

export function getBasicStats(text: string): BasicStats {
  if (!text) {
    return {
      words: 0, uniqueWords: 0, repeatedWords: 0, sentences: 0, paragraphs: 0,
      charactersWithSpaces: 0, charactersWithoutSpaces: 0, letters: 0, numbers: 0, symbols: 0, spaces: 0
    };
  }

  // Words list
  const words = text.match(WORD_REGEX) || [];
  const lowercaseWords = words.map(w => w.toLowerCase());
  
  // Word uniqueness
  const wordFrequencyMap: Record<string, number> = {};
  lowercaseWords.forEach(w => {
    wordFrequencyMap[w] = (wordFrequencyMap[w] || 0) + 1;
  });
  
  const uniqueCount = Object.keys(wordFrequencyMap).length;
  const repeatedCount = Object.values(wordFrequencyMap).filter(count => count > 1).length;

  // Sentences (split by common punctuation)
  const sentenceMatches = text.match(/[^.!?।？\n]+[.!?।？\n]*/gu) || [];
  const sentencesCount = sentenceMatches.filter(s => s.trim().length > 0).length;

  // Paragraphs
  const paragraphsCount = text.split(/\n+/).filter(p => p.trim().length > 0).length;

  // Characters
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;
  const spaces = charactersWithSpaces - charactersWithoutSpaces;

  // Letters, numbers, symbols
  const letters = (text.match(/\p{L}/gu) || []).length;
  const numbers = (text.match(/\p{N}/gu) || []).length;
  const symbols = charactersWithSpaces - letters - numbers - spaces;

  return {
    words: words.length,
    uniqueWords: uniqueCount,
    repeatedWords: repeatedCount,
    sentences: sentencesCount || (text.trim().length > 0 ? 1 : 0),
    paragraphs: paragraphsCount,
    charactersWithSpaces,
    charactersWithoutSpaces,
    letters,
    numbers,
    symbols,
    spaces
  };
}

export function getAdvancedStats(text: string, words: string[]): AdvancedStats {
  if (words.length === 0) {
    return { averageWordLength: 0, averageSentenceLength: 0, averageParagraphLength: 0, lexicalDiversity: 0, longestWord: '', shortestWord: '' };
  }

  const cleanText = text.trim();
  const sentences = cleanText.split(/[.!?।？\n]+/).filter(s => s.trim().length > 0);
  const paragraphs = cleanText.split(/\n+/).filter(p => p.trim().length > 0);

  let longestWord = '';
  let shortestWord = words[0] || '';

  words.forEach(w => {
    if (w.length > longestWord.length) longestWord = w;
    if (w.length < shortestWord.length && w.length > 0) shortestWord = w;
  });

  const totalCharsInWords = words.reduce((acc, curr) => acc + curr.length, 0);
  const uniqueWordsSet = new Set(words.map(w => w.toLowerCase()));

  return {
    averageWordLength: parseFloat((totalCharsInWords / words.length).toFixed(1)),
    averageSentenceLength: parseFloat((words.length / Math.max(1, sentences.length)).toFixed(1)),
    averageParagraphLength: parseFloat((words.length / Math.max(1, paragraphs.length)).toFixed(1)),
    lexicalDiversity: parseFloat((uniqueWordsSet.size / words.length).toFixed(2)),
    longestWord,
    shortestWord: words.length > 0 ? shortestWord : ""
  };
}

export function calculateReadability(words: string[], sentences: number): ReadabilityMetrics {
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences);

  if (wordCount === 0) {
    return {
      fleschEase: 100,
      fleschKincaidGrade: 0,
      difficultyLabel: "N/A",
      educationLevel: "N/A",
      description: "Enter some text to generate a readability analysis."
    };
  }

  let totalSyllables = 0;
  words.forEach(w => {
    totalSyllables += countSyllables(w);
  });

  // Flesch Reading Ease
  // Score = 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  const fleschEase = parseFloat((206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount)).toFixed(1));

  // Flesch-Kincaid Grade Level
  // Grade = 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
  const grade = parseFloat((0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59).toFixed(1));
  const fleschKincaidGrade = Math.max(0, grade);

  // Map Flesch Reading Ease to qualitative metadata
  let difficultyLabel = "";
  let educationLevel = "";
  let description = "";

  if (fleschEase >= 90) {
    difficultyLabel = "Very Easy";
    educationLevel = "5th Grade (Ages 10-11)";
    description = "Extremely easy to read. Conversational and simple words.";
  } else if (fleschEase >= 80) {
    difficultyLabel = "Easy";
    educationLevel = "6th Grade (Ages 11-12)";
    description = "Easy to read. Plain language suitable for kids.";
  } else if (fleschEase >= 70) {
    difficultyLabel = "Fairly Easy";
    educationLevel = "7th Grade (Ages 12-13)";
    description = "Fairly easy to read. Normal conversational language.";
  } else if (fleschEase >= 60) {
    difficultyLabel = "Standard";
    educationLevel = "8th - 9th Grade (Ages 13-15)";
    description = "Standard reading level. Plain English, clear and concise.";
  } else if (fleschEase >= 50) {
    difficultyLabel = "Fairly Difficult";
    educationLevel = "10th - 12th Grade (Ages 15-18)";
    description = "Slightly complex. Requires focused attention.";
  } else if (fleschEase >= 30) {
    difficultyLabel = "Difficult";
    educationLevel = "College Level";
    description = "Complex language. Best suited for university graduates.";
  } else {
    difficultyLabel = "Very Difficult";
    educationLevel = "College Graduate";
    description = "Extremely complex prose. Best suited for academic or professional journals.";
  }

  return {
    fleschEase: Math.min(100, Math.max(0, fleschEase)),
    fleschKincaidGrade,
    difficultyLabel,
    educationLevel,
    description
  };
}

export function getReadingTimes(wordCount: number): ReadingTimes {
  return {
    reading: {
      slow: Math.ceil(wordCount / 150),
      average: Math.ceil(wordCount / 230),
      fast: Math.ceil(wordCount / 300)
    },
    speaking: {
      slow: Math.ceil(wordCount / 110),
      average: Math.ceil(wordCount / 140),
      fast: Math.ceil(wordCount / 170)
    },
    presentation: {
      slow: Math.ceil(wordCount / 90),
      average: Math.ceil(wordCount / 120),
      fast: Math.ceil(wordCount / 150)
    }
  };
}

export function getKeywordDensity(words: string[], phraseSize: number, filterStopWords: boolean): KeywordDensity[] {
  if (words.length === 0 || phraseSize < 1 || phraseSize > 3) return [];

  const counts: Record<string, number> = {};
  
  // Format words
  let formattedWords = words.map(w => w.toLowerCase());
  
  if (phraseSize === 1) {
    if (filterStopWords) {
      formattedWords = formattedWords.filter(w => !STOP_WORDS.has(w));
    }
    formattedWords.forEach(w => {
      counts[w] = (counts[w] || 0) + 1;
    });
  } else {
    // Generate phrases of size 2 or 3
    for (let i = 0; i <= formattedWords.length - phraseSize; i++) {
      // Check if any word in the phrase is a stop word (optional filter)
      const subSlice = formattedWords.slice(i, i + phraseSize);
      if (filterStopWords && subSlice.some(w => STOP_WORDS.has(w))) {
        continue;
      }
      const phrase = subSlice.join(" ");
      counts[phrase] = (counts[phrase] || 0) + 1;
    }
  }

  const list = Object.entries(counts).map(([phrase, count]) => ({
    phrase,
    count,
    percentage: parseFloat(((count / (words.length || 1)) * 100).toFixed(1))
  }));

  // Sort by count desc, then percentage desc
  return list.sort((a, b) => b.count - a.count || b.percentage - a.percentage).slice(0, 15);
}

export function getSocialMediaLimits(charCount: number): SocialMediaLimit[] {
  const configs = [
    { name: "X (Twitter) Post", limit: 280 },
    { name: "Facebook Post limit", limit: 63206 },
    { name: "Instagram Caption limit", limit: 2200 },
    { name: "LinkedIn Update", limit: 3000 },
    { name: "TikTok Caption", limit: 2200 },
    { name: "YouTube Description", limit: 5000 }
  ];

  return configs.map(cfg => {
    const remaining = cfg.limit - charCount;
    const percent = Math.min(100, Math.round((charCount / cfg.limit) * 100));
    
    let status: 'ok' | 'warning' | 'danger' = 'ok';
    if (remaining < 0) {
      status = 'danger';
    } else if (percent > 85) {
      status = 'warning';
    }

    return {
      name: cfg.name,
      limit: cfg.limit,
      used: charCount,
      remaining,
      percent,
      status
    };
  });
}

// Basic passive voice detector
// am/is/are/was/were/be/been/being/get/gets/got/gotten + past participle (standard irregulars or ending in ed/en)
const PASSIVE_VOICE_REGEX = /\b(am|is|are|was|were|be|been|being|get|gets|got|gotten)\s+([a-z]+ed|[a-z]+en|done|made|seen|written|taken|found|built|given|kept|known|shown|told|held|brought|met|run|read|set|lost|sold|bought|sent|understood|chosen|spoken)\b/gi;

export function analyzeWritingAssistant(text: string): { highlights: HighlightItem[]; score: number; recommendations: string[] } {
  const highlights: HighlightItem[] = [];
  const recommendations: string[] = [];
  
  if (!text) {
    return { highlights, score: 100, recommendations };
  }

  // 1. Analyze sentence lengths
  const sentenceMatches = text.match(/[^.!?।？\n]+([.!?।？\n]|$)+/gu) || [];
  let longSentences = 0;
  let passiveVerbs = 0;

  sentenceMatches.forEach((s, idx) => {
    const wordMatches = s.match(WORD_REGEX) || [];
    if (wordMatches.length > 20) {
      longSentences++;
      highlights.push({
        text: s.trim().substring(0, 80) + (s.length > 80 ? '...' : ''),
        type: 'long-sentence',
        suggestion: `Shorten sentence (${wordMatches.length} words). Split it to improve readability.`,
        index: idx
      });
    }
  });

  // 2. Analyze passive voice
  let passiveMatch;
  let matchIndex = 0;
  while ((passiveMatch = PASSIVE_VOICE_REGEX.exec(text)) !== null) {
    passiveVerbs++;
    highlights.push({
      text: passiveMatch[0],
      type: 'passive-voice',
      suggestion: `Passive phrasing detected: "${passiveMatch[0]}". Consider active voice.`,
      index: matchIndex++
    });
  }

  // Scoring
  // Simple deduction: 4 points per long sentence, 3 points per passive voice occurrence.
  const rawScore = 100 - (longSentences * 5) - (passiveVerbs * 3);
  const score = Math.max(10, rawScore);

  // Recommendations
  if (longSentences > 0) {
    recommendations.push(`Shorten the ${longSentences} long sentence(s) highlighted. Keeping sentences under 20 words keeps readers engaged.`);
  }
  if (passiveVerbs > 0) {
    recommendations.push(`Convert the ${passiveVerbs} passive verbs to active voice. This makes your writing punchier and more direct.`);
  }
  
  const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
  let longParagraphs = 0;
  paragraphs.forEach(p => {
    const wCount = (p.match(WORD_REGEX) || []).length;
    if (wCount > 150) {
      longParagraphs++;
    }
  });

  if (longParagraphs > 0) {
    recommendations.push(`Split up the ${longParagraphs} long paragraph(s). Ideal blog/web paragraphs are under 100-150 words.`);
  }

  if (recommendations.length === 0) {
    recommendations.push("Excellent text flow! Your sentence structuring and styling conform to professional writing guidelines.");
  }

  return {
    highlights,
    score,
    recommendations
  };
}

export function runSEOAudit(text: string, stats: BasicStats, keywordDensity: KeywordDensity[]): SEOAudit {
  const issues: SEOAudit["issues"] = [];
  let scorePoints = 100;

  if (!text) {
    return { score: 100, issues };
  }

  // 1. Content Length Auditor
  if (stats.words < 300) {
    scorePoints -= 15;
    issues.push({
      id: 'length',
      label: 'Content is too short',
      status: 'error',
      tip: `Your text has ${stats.words} words. Aim for at least 300 words for simple copy, or 1000+ words for SEO rankings.`
    });
  } else if (stats.words >= 1500) {
    issues.push({
      id: 'length',
      label: 'Excellent content depth',
      status: 'good',
      tip: `Your content spans ${stats.words} words, which search engines favor for high-authority indexing.`
    });
  } else {
    issues.push({
      id: 'length',
      label: 'Good content length',
      status: 'good',
      tip: `Your content has ${stats.words} words. Good for general audience blogs.`
    });
  }

  // 2. Title length auditor (simulated if header H1 is present)
  const h1Match = text.match(/^#\s+(.+)$/m) || text.match(/<h1>(.+?)<\/h1>/i);
  if (h1Match) {
    const titleText = h1Match[1].trim();
    if (titleText.length < 40) {
      scorePoints -= 5;
      issues.push({
        id: 'title-length',
        label: 'Heading 1 is very short',
        status: 'warning',
        tip: `The title length is ${titleText.length} characters. Expand it to 50-60 characters for optimal click-through details.`
      });
    } else if (titleText.length > 60) {
      scorePoints -= 5;
      issues.push({
        id: 'title-length',
        label: 'Heading 1 is too long',
        status: 'warning',
        tip: `The title length is ${titleText.length} characters. Shorten to under 60 characters to prevent SERP truncation.`
      });
    } else {
      issues.push({
        id: 'title-length',
        label: 'Optimal Title / H1 size',
        status: 'good',
        tip: `Your main title is ${titleText.length} characters. Fits search layout snippets perfectly.`
      });
    }
  } else {
    scorePoints -= 10;
    issues.push({
      id: 'title-length',
      label: 'No Title / H1 found',
      status: 'error',
      tip: 'Add a main Heading 1 (e.g. "# Main Header" in markdown or <h1> tags) to establish page hierarchy.'
    });
  }

  // 3. Subheading hierarchy auditor
  const headings = text.match(/^(##|###)\s+(.+)$/gm) || text.match(/<h[23]>(.+?)<\/h[2-3]>/gi) || [];
  if (headings.length === 0) {
    scorePoints -= 10;
    issues.push({
      id: 'subheading-hierarchy',
      label: 'No subheadings (H2/H3) found',
      status: 'warning',
      tip: 'Split up your text using H2 and H3 subheadings to structure your article for crawler engines and readability.'
    });
  } else {
    issues.push({
      id: 'subheading-hierarchy',
      label: 'Good subheading density',
      status: 'good',
      tip: `Found ${headings.length} subheadings, which breaks up your draft nicely.`
    });
  }

  // 4. Keyword Stuffing/Density Auditor
  if (keywordDensity.length > 0) {
    const topK = keywordDensity[0];
    if (topK.percentage > 3.5) {
      scorePoints -= 15;
      issues.push({
        id: 'keyword-density',
        label: `Keyword density is high ("${topK.phrase}")`,
        status: 'error',
        tip: `Your top keyword occupies ${topK.percentage}% of the text. Lower it to under 2.5% to avoid keyword stuffing flags.`
      });
    } else if (topK.percentage < 1.0) {
      scorePoints -= 5;
      issues.push({
        id: 'keyword-density',
        label: 'Low primary keyword density',
        status: 'warning',
        tip: `Your main keyword frequency is low (${topK.percentage}%). Focus your terminology to align with targeted search queries.`
      });
    } else {
      issues.push({
        id: 'keyword-density',
        label: `Excellent keyword density ("${topK.phrase}")`,
        status: 'good',
        tip: `Your primary keyword has a density of ${topK.percentage}%, which represents natural keyword prominence.`
      });
    }
  }

  return {
    score: Math.max(20, scorePoints),
    issues
  };
}

// ----------------------------------------------------
// Formatting Cleanup Tools
// ----------------------------------------------------

export function cleanRemoveExtraSpaces(text: string): string {
  return text.replace(/[ \t]+/g, ' ').replace(/^ +| +$/gm, '');
}

export function cleanRemoveBlankLines(text: string): string {
  return text.split('\n').filter(line => line.trim().length > 0).join('\n');
}

export function cleanNormalizeText(text: string): string {
  // Strip trailing spaces, collapse multiple newlines into double-newlines
  return text.trim().replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
}

export function convertCase(text: string, style: 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase'): string {
  if (!text) return "";
  
  switch (style) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'titlecase':
      return text.replace(/\b\p{L}+/gu, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    case 'sentencecase':
      return text.toLowerCase().replace(/(^\s*|[.!?।？\n]\s*)(\p{L})/gu, (match, separator, char) => {
        return separator + char.toUpperCase();
      });
    default:
      return text;
  }
}

// ----------------------------------------------------
// Export utilities
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

export function generateCSVReport(keywordDensity: KeywordDensity[]): string {
  const headers = "Phrase,Occurrence Count,Density Percentage\n";
  const rows = keywordDensity.map(k => `"${k.phrase.replace(/"/g, '""')}",${k.count},${k.percentage}%`).join("\n");
  return headers + rows;
}

export function generateJSONReport(text: string, stats: BasicStats, readability: ReadabilityMetrics, density1: KeywordDensity[]): string {
  const report = {
    generatedAt: new Date().toISOString(),
    textSummary: {
      totalWords: stats.words,
      uniqueWords: stats.uniqueWords,
      sentences: stats.sentences,
      paragraphs: stats.paragraphs,
      charactersWithSpaces: stats.charactersWithSpaces,
      charactersWithoutSpaces: stats.charactersWithoutSpaces
    },
    readabilityScore: {
      fleschEase: readability.fleschEase,
      fleschKincaidGradeLevel: readability.fleschKincaidGrade,
      educationLevel: readability.educationLevel,
      difficultyLabel: readability.difficultyLabel
    },
    topKeywords: density1.slice(0, 10).map(k => ({ phrase: k.phrase, count: k.count, density: `${k.percentage}%` })),
    sourceText: text
  };
  return JSON.stringify(report, null, 2);
}

export function generatePDFReport(text: string, stats: BasicStats, readability: ReadabilityMetrics, keywords: KeywordDensity[]) {
  // dynamic import of jsPDF to save client Bundle Size
  import("jspdf").then(({ default: jsPDF }) => {
    const doc = new jsPDF();
    
    // Theme Colors
    doc.setFillColor(81, 130, 49); // Brand Green #518231
    doc.rect(0, 0, 210, 30, "F");
    
    // Document Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Word Counter Analytics Report", 15, 20);
    
    // Metadata block
    doc.setTextColor(80, 80, 80);
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} | Nexus Calculator`, 15, 38);
    
    // Draw Border Lines
    doc.setDrawColor(220, 220, 220);
    doc.line(15, 42, 195, 42);
    
    // Core Counts Section
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Core Statistics", 15, 52);
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    
    const statsData = [
      `Total Words: ${stats.words}`,
      `Total Characters: ${stats.charactersWithSpaces} (without spaces: ${stats.charactersWithoutSpaces})`,
      `Total Sentences: ${stats.sentences}`,
      `Total Paragraphs: ${stats.paragraphs}`,
      `Unique Words: ${stats.uniqueWords} (${stats.words > 0 ? Math.round((stats.uniqueWords / stats.words) * 100) : 0}% lexical diversity)`
    ];
    
    let y = 60;
    statsData.forEach(s => {
      doc.text(s, 20, y);
      y += 7;
    });
    
    // Readability Analysis
    y += 5;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Readability & Grades", 15, y);
    y += 8;
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    
    const readabilityData = [
      `Flesch Reading Ease Score: ${readability.fleschEase} / 100`,
      `Flesch-Kincaid Grade Level: Grade ${readability.fleschKincaidGrade}`,
      `Difficulty Level: ${readability.difficultyLabel} (${readability.educationLevel})`,
      `Analysis: ${readability.description}`
    ];
    
    readabilityData.forEach(r => {
      // Handle word wrap for long description lines
      if (r.startsWith("Analysis:")) {
        const splitText = doc.splitTextToSize(r, 170);
        splitText.forEach((line: string) => {
          doc.text(line, 20, y);
          y += 7;
        });
      } else {
        doc.text(r, 20, y);
        y += 7;
      }
    });

    // Keyword Density (Top 5)
    y += 5;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Top Keyword Density", 15, y);
    y += 8;
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(11);
    
    const topKeywords = keywords.slice(0, 5);
    if (topKeywords.length > 0) {
      topKeywords.forEach((k, index) => {
        doc.text(`${index + 1}. "${k.phrase}" - Count: ${k.count} (${k.percentage}%)`, 20, y);
        y += 7;
      });
    } else {
      doc.text("No keywords extracted.", 20, y);
      y += 7;
    }
    
    // Short Text Excerpt
    y += 8;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Text Excerpt", 15, y);
    y += 8;
    
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    const excerpt = text.substring(0, 600) + (text.length > 600 ? "..." : "");
    const splitExcerpt = doc.splitTextToSize(excerpt, 175);
    splitExcerpt.forEach((line: string) => {
      if (y < 280) {
        doc.text(line, 20, y);
        y += 6;
      }
    });
    
    // Save PDF
    doc.save("Writing-Statistics-Report.pdf");
  }).catch(e => {
    console.error("jsPDF loading failed", e);
  });
}
