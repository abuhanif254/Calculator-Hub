import { ToolConfig } from './types';

export const diffCheckerConfig: ToolConfig = {
  slug: "diff-checker",
  title: "Diff Checker & Text Compare",
  shortDescription: "Compare two text, JSON, or code files instantly to find differences. A fast, local, browser-based diff tool for developers.",
  category: "Text & Formatting",
  keywords: ["diff checker", "text compare", "json compare", "find differences", "compare code", "online diff tool"],
  
  longDescription: `
Finding exactly what changed between two blocks of text or code can be incredibly tedious. Our **Diff Checker** automates this process by instantly comparing two text inputs side-by-side and visually highlighting the differences line-by-line.

Whether you are trying to find a missing comma in a JSON payload, reviewing code changes before committing, or just comparing two paragraphs of text, our Diff Checker gives you a clear, color-coded visual output of what was added, removed, or modified.

### 100% Secure & Local
Because this tool is built entirely on client-side technology, your data never leaves your browser. You can confidently compare private API keys, secure source code, and sensitive customer data without worrying about server leaks or privacy breaches.
  `,

  features: [
    "Side-by-side line-by-line comparison engine",
    "Instant detection of additions, deletions, and modifications",
    "100% Client-side processing for ultimate privacy",
    "Seamless integration with our JSON Formatter tool",
    "Dark mode support for reduced eye strain"
  ],

  useCases: [
    "Comparing two API JSON responses to spot missing fields",
    "Checking differences between two versions of source code",
    "Reviewing content changes in markdown or documentation files",
    "Verifying that minified code accurately matches the original source"
  ],

  howToSteps: [
    "Paste your original text in the 'Original Text' editor on the left.",
    "Paste your modified text in the 'Modified Text' editor on the right.",
    "Click the 'Run Compare' button to execute the difference algorithm.",
    "Lines that were added will appear in green on the right side.",
    "Lines that were removed or changed will appear in red on the left side."
  ],

  examples: [],
  faq: [
    {
      question: "Is my code sent to your servers for comparison?",
      answer: "No. The Diff Checker runs entirely within your browser. We do not store, track, or intercept any of the text or code you compare."
    },
    {
      question: "Can I compare minified JSON?",
      answer: "Yes, but it is highly recommended that you format your JSON using our JSON Formatter tool first. Comparing minified single-line code makes it impossible to see line-by-line differences."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "JSON Validator", slug: "json-validator" },
    { name: "CSS Beautifier", slug: "css-beautifier" }
  ],
  lastUpdated: "2024-05-17"
};
