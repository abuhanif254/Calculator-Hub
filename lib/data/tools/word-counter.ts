import { ToolConfig } from './types';

export const wordCounterConfig: ToolConfig = {
  slug: "word-counter",
  title: "Word Counter & Character Counter",
  shortDescription: "Analyze your writing in real time. Count words, characters, sentences, paragraphs, and spaces. Calculate keyword density, estimated reading time, readability scores, and platform limits.",
  category: "Text & Formatting",
  keywords: [
    "word counter",
    "character counter",
    "online word counter",
    "character count tool",
    "text analysis",
    "seo writing tools",
    "content writing",
    "blog writing",
    "copywriting tools",
    "reading time calculator",
    "keyword density checker",
    "content optimization",
    "writing productivity",
    "text statistics",
    "readability analysis",
    "seo content creation",
    "content marketing",
    "social media writing",
    "academic writing",
    "student writing tools",
    "professional writing",
    "website content optimization",
    "text editor tools",
    "content quality improvement",
    "writing analytics",
    "grammar and readability",
    "long-form content writing",
    "digital marketing writing",
    "search engine optimization writing",
    "content performance improvement"
  ],

  longDescription: `
## What is a Word Counter and Character Counter?

A **word counter** and **character counter** is an essential digital tool designed for writers, editors, students, SEO professionals, and content creators. At its core, the tool scans any input text and calculates numerical statistics, including the total number of words, characters (with or without spaces), letters, numbers, symbols, sentences, and paragraphs. 

While simple counting is straightforward, our **Online Word Counter** serves as a comprehensive **Text Statistics Tool** and **Text Analyzer**. It calculates advanced metrics such as reading level scores (Flesch Reading Ease and Flesch-Kincaid Grade Level), lexical diversity, speaking time, and keyword density. This data enables you to fine-tune your messaging, optimize content for search engines, and satisfy strict length requirements.

---

## Why Word Count and Character Count Matter

Length constraints govern almost every type of writing. Understanding these limits is critical to ensuring your text is accepted, indexed, or read.

### 1. SEO Content Optimization and Marketing
Search engines like Google use content length and quality signals to rank pages. 
- **Blog Posts:** Long-form content (generally 1,500 to 2,500 words) tends to cover topics comprehensively. This increases topical authority and backlinks.
- **Title Tags:** Main title elements should remain between 50 and 60 characters to avoid truncation in Search Engine Results Pages (SERPs).
- **Meta Descriptions:** These snippets should stay within 120 to 160 characters. A descriptive meta description attracts organic clicks.

### 2. Academic and Student Standards
Students and academics write under strict word budgets.
- **Essays:** Ranging from 500-word admission essays to 5,000-word term papers.
- **Abstracts:** Academic journals usually limit abstracts to 150–250 words.
- **Dissertations:** Can exceed 50,000 words, requiring structured content tracking.

### 3. Professional and Business Communications
In corporate settings, brevity is key.
- **Emails:** An email length of 50 to 125 words yields response rates over 50%.
- **Press Releases:** Typically range between 400 and 600 words to keep journalists engaged.
- **Reports:** Summaries need to convey key facts in limited space.

### 4. Social Media and Advertising Platforms
Social media channels restrict character counts to protect feeds:
- **X (Twitter):** 280 characters for standard accounts.
- **Instagram:** 2,200 characters for captions, with truncation occurring after 125 characters.
- **LinkedIn:** Posts are limited to 3,000 characters.
- **YouTube:** Descriptions allow up to 5,000 characters.

---

## Detailed Breakdown of Text Analysis Metrics

Our advanced text analyzer calculates specific statistics to help evaluate your writing:

### Words, Sentences, and Paragraphs
- **Total Words:** Counted using spaces and Unicode punctuation boundaries.
- **Unique Words:** The total number of distinct words. A higher ratio indicates a richer vocabulary.
- **Repeated Words:** Words used multiple times. High repetition can indicate weak vocabulary.
- **Average Word Length:** Calculated by dividing total letters by total words. Lower averages (4–5 characters) indicate readable text.
- **Average Sentence Length:** Long sentences (over 20–25 words) increase reading difficulty.
- **Average Paragraph Length:** Shorter paragraphs (2–4 sentences) improve digital readability.

### Reading and Speaking Estimates
The tool translates word counts into time durations using standard pacing models:
- **Silent Reading:** Average silent reading speed is about 230 words per minute (WPM).
- **Speaking Speed:** Presentation and public speaking average 130 to 150 WPM.
- **Presenter Controls:** Adjust reading speeds for slow, average, or fast readers. This helps scriptwriters budget time for videos or audio tracks.

---

## SEO Optimization & Keyword Density Best Practices

Writing content that ranks involves tracking **Keyword Density** and maintaining an optimal keyword frequency.

### What is Keyword Density?
Keyword density measures the percentage of times a specific keyword or phrase appears in your text relative to the total word count.
$$\\text{Keyword Density} = \\left( \\frac{\\text{Keyword Count}}{\\text{Total Words}} \\right) \\times 100$$

### Avoiding Keyword Stuffing
Search engines penalize pages that unnaturally stuff keywords to manipulate rankings. Modern search algorithms rely on Semantic Search and Natural Language Processing (NLP).
- **Optimal Range:** Aim for a density between **1% and 2.5%** for your primary keyword.
- **Distribution:** Distribute keywords naturally across your intro, subheadings (H2/H3), body copy, and conclusion.
- **Variations:** Incorporate Latent Semantic Indexing (LSI) keywords — synonyms and related terms — to signal topical depth without repetition.

---

## Reading Level & Readability Analysis

Readability scores estimate the education level required to understand a piece of writing. The tool provides two primary scoring indexes:

### Flesch Reading Ease
This score ranges from 0 to 100. Higher scores indicate text that is easier to read, while lower scores indicate more complex academic prose.
- **90–100 (5th Grade):** Very easy. Easy to read for an average 11-year-old student.
- **60–70 (8th–9th Grade):** Standard. Plain English, easily understood by the general public.
- **0–30 (College Graduate):** Very difficult. Academic journals, legal contracts, or scientific treatises.

The formula is:
$$\\text{Score} = 206.835 - 1.015 \\times \\left( \\frac{\\text{Total Words}}{\\text{Total Sentences}} \\right) - 84.6 \\times \\left( \\frac{\\text{Total Syllables}}{\\text{Total Words}} \\right)$$

### Flesch-Kincaid Grade Level
This index translates the Flesch Reading Ease score into a US school grade level. A score of 8.0 indicates an 8th-grade reading level (ages 13–14), which is the target for general audience writing.
The formula is:
$$\\text{Grade} = 0.39 \\times \\left( \\frac{\\text{Total Words}}{\\text{Total Sentences}} \\right) + 11.8 \\times \\left( \\frac{\\text{Total Syllables}}{\\text{Total Words}} \\right) - 15.59$$

---

## Social Media Character Limits Cheat Sheet

When preparing copy for digital marketing campaigns, use this quick reference table to check character limits and optimal ranges:

| Platform | Absolute Limit | Recommended Length for Engagement |
| :--- | :--- | :--- |
| **X (Twitter)** | 280 characters | 70 – 120 characters |
| **Facebook Post** | 63,206 characters | 40 – 150 characters |
| **Instagram Caption** | 2,200 characters | Under 150 characters (for quick reading) |
| **LinkedIn Update** | 3,000 characters | 1,000 – 2,000 characters |
| **TikTok Caption** | 2,200 characters | 100 – 500 characters |
| **YouTube Description** | 5,000 characters | 1,000 – 1,500 characters (focus on top 3 lines) |
| **Pinterest Description** | 500 characters | 100 – 200 characters |

---

## Writing Improvement and Style Recommendations

A readability analyzer assists by acting as a virtual **Writing Assistant**:
1. **Reduce Sentence Length:** Keep sentences under 20 words where possible. Long sentences force readers to store too much information in working memory.
2. **Limit Passive Voice:** Passive phrasing (e.g., *"The essay was written by the student"*) is often less direct than active phrasing (e.g., *"The student wrote the essay"*).
3. **Structure with Headings:** Break up text using hierarchical headings (\`H2\`, \`H3\`). This makes the page skimmable for readers and search engines.
4. **Vary Sentence Starts:** Avoid starting consecutive sentences with the same word (e.g., *"The"*, *"We"*).

---

## Multilingual and Unicode Text Processing

Many basic counting utilities use standard regular expressions that only match Western Latin alphabets (\`A-Z\`). These tools can fail when processing Unicode-rich scripts, such as:
- **Bengali (বাংলা):** Character clusters and spacing require specific Unicode matching.
- **Arabic (العربية):** Read from right to left, where characters change shape depending on their position in a word.
- **Hindi (हिन्दी):** Syllable boundaries follow specific vowel markers (Matras) and conjunct consonants.

Our tool uses **Unicode-aware regular expressions** to identify word boundaries, letters, and numbers across different language scripts. This ensures accurate counts for global writers.
  `,

  features: [
    "Real-time calculations for words, characters (with/without spaces), letters, numbers, and symbols.",
    "Comprehensive Readability analysis using Flesch Reading Ease and Flesch-Kincaid Grade Level.",
    "Estimated Reading, Speaking, and Presentation times tailored to reader speed.",
    "Keyword density analyzer identifying 1, 2, and 3-word repetitions.",
    "Social media character checker showing live limits for Twitter, Facebook, Instagram, LinkedIn, and YouTube.",
    "Text cleanup tools to remove extra spaces, remove blank lines, and convert character casing.",
    "Interactive SEO checklist auditing titles, descriptions, headings, and overall word length.",
    "Local draft auto-save using localStorage to prevent data loss.",
    "Export options supporting plain text, CSV, JSON, and print-ready PDF reports."
  ],

  useCases: [
    "Bloggers and SEO copywriters optimizing articles to reach target word counts and keyword percentages.",
    "Students formatting essays, theses, or statements of purpose to fit academic limits.",
    "Social media managers drafting updates for Twitter, LinkedIn, or Instagram captions.",
    "Public speakers, podcasters, and video producers timing scripts based on speaking pacing.",
    "Web designers testing line lengths, word distributions, and container text overflows."
  ],

  howToSteps: [
    "Paste your draft into the writing editor panel, or type directly into the workspace.",
    "Review the top statistics card for real-time word, character, and sentence counts.",
    "Navigate to the Reading & Readability tab to check the Flesch Reading Ease and estimated reading times.",
    "Inspect the Keyword Density widget to identify repetitive terms and check density percentages.",
    "Check the Social Media limits dashboard to see if your text fits platform limits.",
    "Use the Casing and Cleanup buttons to format whitespace or adjust text case.",
    "Click the Export button to download your analysis as a text file, CSV sheet, JSON object, or PDF report."
  ],

  examples: [
    {
      title: "Short SEO Article Draft",
      description: "A short, optimized paragraph showcasing text analysis results.",
      input: "SEO writing tools help digital marketers optimize content. Word counters are useful for tracking length and keyword density. Copywriters should focus on readability to improve search rankings.",
      output: "Words: 27 | Characters: 194 | Sentences: 3 | Paragraphs: 1 | Readability: Plain English (68.5) | Grade Level: 8.4"
    },
    {
      title: "Social Media Post Draft",
      description: "Checking limits for an interactive post.",
      input: "Writing great copy takes practice! Check out our new online word counter and character counter. It is fast, free, and runs entirely in your web browser. 🚀 #SEO #WritingTools",
      output: "Words: 30 | Characters: 172 | Remaining Twitter Space: 108 characters | Active Hashtags: 2"
    }
  ],

  faq: [
    {
      question: "What is a word counter?",
      answer: "A word counter is a digital utility that analyzes text to count individual words, characters, sentences, paragraphs, and punctuation marks. It is used to stay within writing limits and analyze text statistics."
    },
    {
      question: "How is word count calculated?",
      answer: "Word count is calculated by scanning text and identifying word boundaries, typically separated by spaces or punctuation. Our counter uses Unicode-aware boundary rules to handle international characters."
    },
    {
      question: "What is a character counter?",
      answer: "A character counter displays the total number of characters in a text. This includes letters, numbers, spaces, punctuation marks, and symbols, which is useful for checking social media or code limits."
    },
    {
      question: "Why is character count important?",
      answer: "Many platforms set strict character limits. Meta titles must fit within search result snippets, and SMS messages, Twitter posts, and app metadata have fixed layout boundaries."
    },
    {
      question: "How do I calculate reading time?",
      answer: "Reading time is calculated by dividing total words by the average reading speed (roughly 230 WPM). Speaking speed is calculated at a slower rate of 130 to 150 WPM."
    },
    {
      question: "What is keyword density?",
      answer: "Keyword density is the percentage of times a specific keyword or phrase appears in a text relative to the total word count. Maintaining a density of 1% to 2% helps search engines understand the topic without stuffing."
    },
    {
      question: "Is this word counter free?",
      answer: "Yes, this tool is free. It runs entirely in your web browser, meaning your text is processed locally and is never uploaded to external servers."
    },
    {
      question: "Can I count words in Bengali (বাংলা)?",
      answer: "Yes, our tool uses Unicode regular expressions to support Bengali, Hindi, Arabic, and other non-Latin scripts, ensuring accurate word and character counts."
    },
    {
      question: "How many words should a blog post contain?",
      answer: "For search engine optimization, blog posts usually perform best when they contain 1,500 to 2,500 words. Short answer posts can target 800 to 1,200 words depending on search competition."
    },
    {
      question: "What is a good readability score?",
      answer: "For general audiences, aim for a Flesch Reading Ease score of 60 to 70 (equivalent to an 8th or 9th-grade reading level). This ensures the text is easy to read for most adults."
    },
    {
      question: "Does this tool support Unicode languages?",
      answer: "Yes, the tool is fully Unicode-compliant. It correctly counts words, letters, and numbers for languages like Arabic, Hindi, Bengali, Spanish, French, and German."
    },
    {
      question: "Can I use this for SEO writing?",
      answer: "Yes, it includes real-time keyword density calculations, content length recommendations, and meta tag checklists to support SEO writing workflows."
    },
    {
      question: "How accurate is the word count?",
      answer: "The word count is highly accurate. It matches standard word counting rules used by major editors like Microsoft Word and Google Docs, and includes corrections for symbols and spaces."
    },
    {
      question: "Does the tool save my text?",
      answer: "Yes, it automatically saves your draft locally using browser localStorage. If you refresh the page or close the tab, your text is restored when you return."
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes, the interface is fully responsive. It is optimized for mobile phones, tablets, and desktop displays."
    },
    {
      question: "What is lexical diversity?",
      answer: "Lexical diversity is the ratio of unique words to the total word count. A higher ratio indicates a rich vocabulary with less repetition, while a lower ratio suggests repetitive language."
    },
    {
      question: "How do I improve readability?",
      answer: "You can improve readability by shortening long sentences, breaking up large paragraphs, using simpler words, and replacing passive voice constructions with active verbs."
    },
    {
      question: "What is the ideal meta description length?",
      answer: "The ideal length for a meta description is between 120 and 160 characters. Keeping it within this range ensures search engines display the snippet without truncating it."
    },
    {
      question: "What is the ideal title length?",
      answer: "The ideal title length for search engines is 50 to 60 characters. Titles within this range are less likely to be cut off in search results."
    },
    {
      question: "Is this tool browser-based?",
      answer: "Yes, the tool runs entirely in your browser. All text processing and file generation are handled locally on your device, ensuring privacy and speed."
    }
  ],

  relatedTools: [
    { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator" },
    { name: "Slug Generator", slug: "slug-generator" },
    { name: "Markdown Previewer", slug: "markdown-previewer" },
    { name: "HTML Formatter", slug: "html-formatter" }
  ]
};
