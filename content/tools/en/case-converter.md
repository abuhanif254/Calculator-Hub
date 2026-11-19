---
metaTitle: "Case Converter Online | AP, Chicago, camelCase & Snake"
metaDescription: "Convert text between UPPERCASE, Title Case, AP/Chicago styles, camelCase, snake_case, and kebab-case locally with whitespace cleanup and SERP audits."
metaKeywords: "case converter, text case converter, uppercase converter, lowercase converter, title case converter, sentence case converter, capitalize text online, letter case converter, writing tools, content writing tools, seo writing tools, text formatting tools"
title: "Case Converter"
shortDescription: "Transform text casing instantly. Convert between UPPERCASE, lowercase, Title Case, Sentence case, AP/Chicago styles, camelCase, snake_case, and kebab-case. Clean whitespace and audit SEO title lengths."
faqs:
  - question: "What is the exact difference between AP Title Case and Chicago Title Case?"
    answer: "Both styles always capitalize the first and last words of a headline, but they disagree on prepositions. Associated Press (AP) style lowercases only short prepositions of three letters or fewer (such as in, of, on, to, at, by, for), whereas Chicago Manual of Style (CMOS) lowercases prepositions regardless of length—including longer ones like through, between, without, and against."
  - question: "Can this converter parse existing camelCase or PascalCase identifiers into snake_case accurately?"
    answer: "Yes. Before extracting words, the tokenizer detects Unicode lowercase-to-uppercase character transitions and inserts word boundaries automatically, so strings like userProfileEndpoint or parseJsonPayload split cleanly into user_profile_endpoint and parse_json_payload without manual spacing."
  - question: "Which keyboard shortcuts let me switch casing styles without touching the mouse?"
    answer: "Four global shortcuts work directly inside the editor: Ctrl+Alt+U for UPPERCASE, Ctrl+Alt+L for lowercase, Ctrl+Alt+T for Title Case, and Ctrl+Alt+S for Sentence case. You also get a 50-step Undo/Redo stack to roll back whitespace cleanups or accidental edits."
  - question: "How does the built-in SEO Title Audit evaluate my headline length?"
    answer: "The live auditor measures total character count against Google SERP display width conventions: titles under 40 characters trigger a short-title warning, 40–60 characters pass as optimal for desktop and mobile results, and strings above 60 characters raise a truncation error."
  - question: "Does transforming sensitive code identifiers or draft copy upload data anywhere?"
    answer: "Never. Every case conversion, regex whitespace cleanup, transformation history log, and CSV or JSON report export runs locally in your browser using JavaScript and localStorage, making it safe for proprietary variable names, SQL columns, and embargoed press releases."
features:
  - "18 casing modes spanning editorial prose (Sentence, Standard/AP/Chicago Title, Capitalized, Toggle, Alternating) and code formats"
  - "Full developer identifier suite: camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case, Train-Case, dot.case, and path/case"
  - "Unicode-aware boundary splitter that cleanly re-cases camelCase, PascalCase, accented Latin, and alphanumeric strings"
  - "Three whitespace sanitizers: collapse duplicate horizontal spaces, remove blank lines, and normalize CRLF line endings"
  - "Real-time Google SERP title-length auditor (40–60 character sweet spot) alongside live character, word, sentence, and line counts"
  - "50-step Undo/Redo history, 10-entry transformation log, keyboard shortcuts (Ctrl+Alt+U/L/T/S), and CSV/JSON report exports"
useCases:
  - "Standardizing article headlines and email subject lines to strict AP Stylebook or Chicago Manual of Style rules"
  - "Refactoring PostgreSQL snake_case column lists into TypeScript camelCase DTO properties or React PascalCase components"
  - "Repairing accidental CAPS LOCK paragraphs pasted from legacy PDFs, ERP exports, or terminal logs into clean Sentence case"
  - "Generating uniform kebab-case CSS custom properties, Train-Case HTTP header names, or SCREAMING_SNAKE_CASE environment keys"
  - "Auditing meta title tags against the 60-character Google SERP truncation boundary before uploading to a CMS"
  - "Stripping stray tabs, trailing spaces, and triple blank lines out of scraped text prior to importing into spreadsheets"
howToSteps:
  - "Paste or type your source text, headlines, or code identifiers into the input pane (your latest draft persists locally in browser storage)."
  - "Choose either Standard prose modes, Developer naming conventions, or Marketing/SEO views using the workspace tabs."
  - "Click any casing button—or press Ctrl+Alt+U, Ctrl+Alt+L, Ctrl+Alt+T, or Ctrl+Alt+S—to preview the converted output in real time."
  - "Use the cleanup controls to collapse duplicate spaces, drop empty lines, or normalize CRLF line breaks; step back anytime with Undo/Redo."
  - "Review the SEO Title Audit badge and live statistics bar if you are optimizing page titles, headings, or social headlines."
  - "Copy the transformed output to your clipboard, or export a side-by-side comparison report as plain text, CSV, or structured JSON."
---

Every publishing team and software engineering codebase relies on rigid capitalization conventions—yet raw text rarely arrives in the format you need. Copy pasted from PDFs breaks into ALL CAPS headers with doubled spaces; SQL migrations return `snake_case` columns that JavaScript APIs expect in `camelCase`; and newsroom style guides draw sharp lines over whether a four-letter preposition like *from* or *over* belongs in lowercase. **Case Converter** handles 18 editorial and programming transformations locally in your browser, pairing Unicode-safe word boundary detection with whitespace sanitization, a 50-step Undo/Redo buffer, and live SEO headline length checks.

## Decomposing Mixed Identifiers with Unicode Case Boundaries

Naive case converters assume words are already separated by spaces. Feed `databaseConnectionURL2` or `billing_address-line1` into a space-splitting script and every developer format collapses into a single unbroken word. To re-case existing code identifiers cleanly, this converter runs a two-stage Unicode tokenizer before rebuilding any programmer casing style:

```javascript
// Stage 1: Insert boundary between Unicode lowercase (\p{Ll}) and uppercase (\p{Lu})
const camelSplit = str.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2');

// Stage 2: Extract contiguous Unicode letter/number tokens, discarding punctuation delimiters
const tokens = camelSplit.match(/[\p{L}\p{N}]+/gu) || [];
```

Because the expression relies on Unicode general categories (`\p{Ll}`, `\p{Lu}`, `\p{L}`, `\p{N}`) instead of ASCII ranges like `[a-z]`, accented European characters (`caféMenu` → `café_menu`) and numeric suffixes (`v2ApiKey` → `v2-api-key`) split accurately without stripping diacritics or losing version numbers. Delimiters such as underscores (`_`), hyphens (`-`), dots (`.`), and forward slashes (`/`) are treated as clean token breaks, letting you round-trip seamlessly from `path/case` to `PascalCase` or `SCREAMING_SNAKE_CASE` in a single click.

## Complete Casing Taxonomy: Editorial Styles vs. Code Conventions

Different languages, protocols, and style manuals attach strict semantic meaning to capitalization; mismatched casing can break case-sensitive Linux imports, fail CI linters, or violate editorial guidelines. The matrix below transforms the sample string `"parse user_profile from api v2"` across the primary prose and programming modes:

| Casing Mode | Output (`"parse user_profile from api v2"`) | Ecosystem / Authority | Rule Summary |
| :--- | :--- | :--- | :--- |
| **Sentence case** | `Parse user_profile from api v2` | Web UX copy, docs | Lowercases string; capitalizes letter after start or `. ! ? । ？ \n` |
| **UPPERCASE** | `PARSE USER_PROFILE FROM API V2` | Legal notices, SQL | Uppercases every cased Unicode character |
| **lowercase** | `parse user_profile from api v2` | Email keys, tags | Lowercases every cased Unicode character |
| **Capitalized Case** | `Parse User_Profile From Api V2` | UI buttons, labels | Capitalizes the first character of every word |
| **AP Title Case** | `Parse User_Profile From Api V2` | AP Stylebook, PR | Lowercases 16 minor words and ≤3-letter prepositions (except ends) |
| **Chicago Title Case** | `Parse User_Profile from Api V2` | Books, academia | Lowercases all articles, conjunctions, and 40+ prepositions of any length |
| **Toggle / Inverse** | `PARSE USER_PROFILE FROM API V2` | Caps Lock repair | Swaps uppercase and lowercase per character |
| **Alternating Case** | `PaRsE uSeR_pRoFiLe FrOm ApI v2` | Stylized copy, QA | Alternates letter case while skipping spaces and digits |
| **camelCase** | `parseUserProfileFromApiV2` | JS, TS, Java, JSON | First token lowercase; remaining tokens capitalized |
| **PascalCase** | `ParseUserProfileFromApiV2` | React, C#, Go | Every token capitalized with no separator |
| **snake_case** | `parse_user_profile_from_api_v2` | Python, Rust, SQL | Lowercase tokens joined by `_` |
| **SCREAMING_SNAKE** | `PARSE_USER_PROFILE_FROM_API_V2` | Env vars, macros | Uppercase tokens joined by `_` |
| **kebab-case** | `parse-user-profile-from-api-v2` | CSS, HTML, URLs | Lowercase tokens joined by `-` |
| **Train-Case** | `Parse-User-Profile-From-Api-V2` | HTTP headers | Capitalized tokens joined by `-` |
| **dot.case** | `parse.user.profile.from.api.v2` | Java packages | Lowercase tokens joined by `.` |
| **path/case** | `parse/user/profile/from/api/v2` | REST routes, paths | Lowercase tokens joined by `/` |

## AP Stylebook vs. Chicago Manual of Style Title Case

Simple "Capitalize Every Word" utilities fail formal publishing guidelines because English title case reserves lowercase for minor function words—except when opening or closing a headline. Yet major manuals disagree on prepositions:

### Why Headline Capitalization Rules Diverge on Prepositions

Notice *from* in the matrix above:

- **AP Stylebook** uses a strict **length threshold**. Articles (`a`, `an`, `the`), short coordinating conjunctions (`and`, `as`, `but`, `for`, `nor`, `or`), and prepositions of **three letters or fewer** (`at`, `by`, `for`, `in`, `of`, `on`, `to`, `up`) stay lowercase, while four-letter prepositions (*From*, *With*, *Over*, *Into*, *Through*) are capitalized.
- **Chicago Manual of Style (CMOS)** classifies by **part of speech** regardless of length. Every preposition—from `in` to `throughout` and `without`—remains lowercase unless positioned first or last. Thus `"Walking Through the Forest Without a Map"` becomes `"Walking through the Forest without a Map"` in Chicago style versus `"Walking Through the Forest Without a Map"` in AP style.

Because the engine locates the exact first and last alphanumeric tokens before checking the exception set, trailing prepositions like `"What to Look For"` capitalize accurately under both manuals.

## Whitespace Hygiene, SERP Title Widths, and Keyboard Workflows

Text copied from PDFs or OCR scans often mixes Windows `CRLF` (`\r\n`) and Unix `LF` (`\n`) breaks alongside doubled spaces and empty rows. Three sanitizers—**Remove Extra Spaces** (collapsing `[ \t]+` and trimming line edges), **Remove Blank Lines**, and **Normalize Whitespace** (normalizing `\r\n` to `\n` and capping consecutive breaks at `\n\n`)—clean raw drafts before case conversion, backed by a 50-state Undo/Redo stack.

For SEO editors, the **SEO Title Audit** evaluates headline lengths live: under `40` characters warns of sparse SERP coverage, `40–60` characters passes for desktop and mobile Google snippets, and over `60` characters flags ellipsis truncation. Keyboard shortcuts (`Ctrl+Alt+U`, `Ctrl+Alt+L`, `Ctrl+Alt+T`, `Ctrl+Alt+S`) toggle core prose modes instantly, and side-by-side transformation metrics export directly as CSV or JSON.

## Choosing the Right Case Across Databases, APIs, and Frontend Code

Full-stack projects routinely map one field across four conventions: a PostgreSQL `snake_case` column (`billing_postal_code`), a JSON `camelCase` key (`billingPostalCode`), a React `PascalCase` component (`BillingPostalCode`), and a CSS `kebab-case` class (`billing-postal-code`). For ASCII-transliterated URL slugs with stop-word filtering, pair this workflow with our [Slug Generator](/en/tools/slug-generator). For readability scoring and keyword density on long drafts, switch to the [Word Counter](/en/tools/word-counter), or inspect exact character changes inside the [Diff Checker](/en/tools/diff-checker).
