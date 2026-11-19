---
metaTitle: "Word Counter & Character Counter | Readability & SEO"
metaDescription: "Count words, characters, sentences, reading time, Flesch readability, and n-gram keyword density instantly in your browser—100% private, zero uploads."
metaKeywords: "word counter, character counter, online word counter, character count tool, text analysis, seo writing tools, content writing, blog writing, copywriting tools, reading time calculator, keyword density checker, content optimization"
title: "Word Counter & Character Counter"
shortDescription: "Analyze your writing in real time. Count words, characters, sentences, paragraphs, and spaces. Calculate keyword density, estimated reading time, readability scores, and platform limits."
faqs:
  - question: "How does the word counter handle contractions, hyphenated terms, and non-English scripts?"
    answer: "Instead of splitting naively on spaces, the tokenizer uses a Unicode property expression that groups letter and numeral clusters while preserving internal apostrophes—so contractions like don't and it's count as one word, accented Latin and non-Latin alphabets are counted accurately, and stray punctuation never inflates totals."
  - question: "What is the difference between Flesch Reading Ease and Flesch-Kincaid Grade Level?"
    answer: "Both formulas weigh average sentence length and syllables per word, but they express readability on inverse scales. Flesch Reading Ease scores from 0 to 100 where higher numbers mean easier prose (60–70 is plain English), whereas Flesch-Kincaid Grade Level outputs the approximate U.S. school grade needed to comprehend the draft."
  - question: "Why does filtering stop words change my keyword density rankings?"
    answer: "Function words such as the, and, of, and is naturally dominate raw English word frequency tables. Enabling the stop-word filter excludes common grammatical glue across 1-word, 2-word, and 3-word phrases so substantive topical terms surface immediately."
  - question: "How are reading, speaking, and presentation times calculated?"
    answer: "The pacing calculator divides total words across three delivery contexts and three speed tiers: silent reading (150, 230, and 300 WPM), conversational speaking (110, 140, and 170 WPM), and formal presentations (90, 120, and 150 WPM), rounding up to full minutes so scripts never run long."
  - question: "Can I export my writing statistics and keep unpublished drafts private?"
    answer: "Yes. Every calculation runs strictly inside your browser with automatic localStorage draft persistence, so unpublished articles, legal memos, or client copy never touch a remote server. You can export keyword tables as CSV, structured telemetry as JSON, or a formatted summary report as a client-generated PDF."
features:
  - "Unicode-aware word, character, letter, numeral, symbol, whitespace, sentence, and paragraph counters"
  - "Dual readability engine computing Flesch Reading Ease (0–100) and Flesch-Kincaid Grade Level in real time"
  - "Unigram, bigram, and trigram keyword density analyzer with toggleable English stop-word filtering"
  - "Writing Assistant that flags passive-voice constructions, 20+ word sentences, and dense paragraphs"
  - "Live social media character meters for X, Instagram, TikTok, LinkedIn, YouTube, and Facebook plus word goals"
  - "Built-in Markdown/HTML H1–H3 SEO structure audit, whitespace cleaners, and CSV, JSON, and PDF report exports"
useCases:
  - "Auditing long-form blog drafts for word targets, heading hierarchy, and natural 1–2.5% keyword density before publishing"
  - "Timing keynote speeches, podcast scripts, and video voiceovers accurately against 120–150 WPM speaking benchmarks"
  - "Trimming social captions, ad headlines, and YouTube descriptions to fit strict platform character ceilings"
  - "Simplifying technical documentation, policy pages, or academic abstracts to reach an 8th–9th grade plain-English target"
  - "Tracking lexical diversity and repeated words during copyediting to eliminate monotonous phrasing"
  - "Generating client-ready PDF or CSV editorial QA reports for freelance writing deliverables and content agencies"
howToSteps:
  - "Paste or type your draft into the editor; your text auto-saves locally in the browser so accidental reloads never wipe progress."
  - "Set an optional target word count if you are writing to a strict editorial brief, essay requirement, or publication budget."
  - "Review core telemetry in the Stats view—including words, unique words, lexical diversity, character totals, and three-tier reading or speaking times."
  - "Switch to Readability, SEO Audit, and Writing Assistant tabs to inspect Flesch scores, Markdown/HTML heading checks, n-gram density, passive voice, and overly long sentences."
  - "Open the Social Limits panel to verify character headroom across X, LinkedIn, Instagram, TikTok, and YouTube, or apply one-click whitespace cleanup."
  - "Copy the formatted stats digest or download a CSV keyword table, JSON telemetry bundle, or styled PDF summary."
---

Accurate text telemetry is far harder than running `.split(" ")` on a string. Copy-pasted drafts carry non-breaking spaces, stray newlines, Unicode punctuation, contractions, Markdown syntax, and mixed alphanumeric tokens that cause simplistic counters to misreport totals by 5% to 15%. **Word Counter & Character Counter** runs a live lexical analysis pipeline directly inside your browser, pairing Unicode-safe tokenization with classic readability formulas, n-gram keyword extraction, passive-voice diagnostics, and social character meters—keeping unreleased manuscripts and confidential business copy strictly on your local device.

## Unicode Tokenization vs. Naive Whitespace Splitting

When a naive script counts words by splitting on ASCII spaces, double spaces create empty tokens, hyphenated breaks behave inconsistently, and punctuation glued to a newline inflates paragraph and sentence counts. This analyzer avoids those artifacts by matching lexical units with a Unicode-property regular expression:

```javascript
// Matches Unicode letter/number clusters while keeping internal apostrophes intact
const WORD_REGEX = /[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu;
```

Because `\p{L}` matches letters across every Unicode script (accented European characters, Greek, Cyrillic, Arabic, Devanagari) and `\p{N}` captures digits, multilingual drafts are tokenized cleanly without false splits on diacritics. Internal apostrophes remain bound to their parent token, so contractions (`don't`, `won't`) and possessives (`editor's`) register as single words rather than two fragments.

### Counting Letters, Numerals, Symbols, and Contractions

Alongside total words, the engine decomposes every character in your buffer into mutually exclusive categories:

- **Characters with spaces** (`text.length`): Exact UTF-16 code-unit length enforced by most CMS title fields and social APIs.
- **Characters without spaces**: Strips all `\s` whitespace (spaces, tabs, carriage returns, line feeds), which translation agencies and billing contracts frequently use to price localization work.
- **Letters, Numbers, and Symbols**: Counts `\p{L}` alphabetic characters and `\p{N}` numeric digits independently, assigning all remaining non-whitespace punctuation and emoji to **Symbols**.
- **Lexical Diversity (Type-Token Ratio)**: Computed as `uniqueWords / totalWords`. Academic prose and concise copywriting often sit between `0.55` and `0.75`, whereas repetitive drafts or keyword-stuffed landing pages drop below `0.40`.

Sentence boundaries recognize Western terminators (`.`, `!`, `?`), Devanagari dandas (`।`), full-width East Asian question marks (`？`), and hard line breaks, preventing unpunctuated bullet lists or headings from collapsing into a single giant sentence.

## Readability Formulas and Syllable Heuristics

Quantifying reading difficulty requires estimating both syntactic complexity (words per sentence) and morphological complexity (syllables per word). The analyzer implements Rudolf Flesch and J. Peter Kincaid's twin benchmarks:

$$\text{Flesch Reading Ease} = 206.835 - 1.015\left(\frac{W}{S}\right) - 84.6\left(\frac{\text{Syl}}{W}\right)$$

$$\text{Flesch-Kincaid Grade} = 0.39\left(\frac{W}{S}\right) + 11.8\left(\frac{\text{Syl}}{W}\right) - 15.59$$

Where $W$ is total words, $S$ is total sentences, and $\text{Syl}$ is estimated syllables. Because English orthography lacks a one-to-one mapping between vowels and spoken syllables, the syllable estimator applies targeted phonetic rules: words of three or fewer letters default to `1` syllable; silent trailing `-e`, `-ed`, and non-liquid `-es` endings are stripped (`/(?:[^laeiouy]es|ed|[^laeiouy]e)$/`), leading `y` is trimmed, and contiguous 1–2 character vowel groups (`[aeiouy]{1,2}`) are tallied. For non-Latin tokens, the estimator falls back to a proportional length heuristic (`Math.max(1, Math.round(length / 2))`).

| Flesch Ease | Band | Grade Level | Typical Use Case |
| :--- | :--- | :--- | :--- |
| **90–100** | Very Easy | 5th Grade | UX microcopy, onboarding tooltips, consumer ads |
| **80–89** | Easy | 6th Grade | Help-center answers, email newsletters |
| **70–79** | Fairly Easy | 7th Grade | Conversational blog tutorials, lifestyle posts |
| **60–69** | Standard | 8th–9th Grade | Plain-English journalism, SaaS pages, SEO guides |
| **50–59** | Fairly Difficult | 10th–12th Grade | Trade publications, financial briefings |
| **30–49** | Difficult | College | Engineering RFCs, legal summaries, white papers |
| **0–29** | Very Difficult | Graduate | Peer-reviewed journals, academic theses |

A single 45-word run-on sentence can drag an otherwise readable section down an entire grade level. Whenever your score dips below `60`, check the **Writing Assistant** tab: it highlights sentences exceeding **20 words**, paragraphs exceeding **150 words**, and common passive-voice patterns (auxiliary forms of *be* or *get* plus `-ed`/`-en` or irregular past participles such as *written*, *built*, or *shown*).

## Pacing Models: Silent Reading vs. Live Delivery

Silent scanning and spoken narration move at very different speeds. The pacing panel computes slow, average, and fast minute estimates across three contexts using `Math.ceil(words / wpm)`:

- **Silent Reading (`150 / 230 / 300 WPM`)**: Ideal for blog read-time badges (`230 WPM` models typical adult screen reading).
- **Conversational Speaking (`110 / 140 / 170 WPM`)**: Calibrated for YouTube scripts, podcasts, and product demos.
- **Formal Presentation (`90 / 120 / 150 WPM`)**: Accounts for slide transitions and rhetorical pauses during talks or webinars.

## N-Gram Keyword Density, Passive Voice, and On-Page SEO Audits

Search algorithms penalize repetition more quickly than they reward raw frequency. The **Keyword Density** panel scans **1-word (unigram)**, **2-word (bigram)**, and **3-word (trigram)** sliding windows across lowercased tokens, ranking the top 15 phrases by count and percentage share. Enabling **Filter Stop Words** drops grammatical glue (`the`, `and`, `with`, `for`)—and in bigram/trigram mode omits phrases containing stop words—so topical clusters stand out immediately.

For Markdown or HTML drafts, the **SEO Audit** evaluates four signals simultaneously: word depth (`300+` baseline, `1,500+` for pillar content), `H1` presence and `40–60` character SERP width, `H2`/`H3` subheading coverage, and primary keyword share (flagging over-optimization above `3.5%` or thin focus below `1.0%`). Pair these diagnostics with our [Markdown Previewer](/en/tools/markdown-previewer) to verify rendered heading hierarchy and the [Meta Tag Generator](/en/tools/meta-tag-generator) to polish search snippets.

## Platform Character Envelopes and Multi-Format Reporting

Social networks enforce hard ceilings that truncate copy mid-sentence. **Social Limits** tracks live usage, remaining headroom, and warning states (amber past `85%`, red on overflow) across **X (280)**, **Instagram (2,200)**, **TikTok (2,200)**, **LinkedIn (3,000)**, **YouTube Descriptions (5,000)**, and **Facebook (63,206)**. Built-in whitespace cleaners strip stray spaces, blank lines, and CRLF breaks; for full AP, Chicago, or code casing workflows, switch to the [Case Converter](/en/tools/case-converter). Export finished audits as **CSV**, **JSON**, or a client-generated **PDF** via `jsPDF`.
