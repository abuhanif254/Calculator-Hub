import { ToolConfig } from './types';

export const yamlFormatterConfig: ToolConfig = {
  slug: "yaml-formatter",
  title: "YAML Formatter & Beautifier",
  shortDescription: "Format, beautify, minify, validate, and convert YAML documents instantly. Supports Kubernetes YAML, Docker Compose, GitHub Actions, YAML-to-JSON conversion, diff comparison, and linting — all client-side.",
  category: "Text & Formatting",
  keywords: [
    "yaml formatter", "yaml beautifier", "yaml pretty print", "yaml minifier", "format yaml online",
    "yaml parser", "yaml validator", "beautify yaml", "minify yaml", "yaml syntax checker",
    "yaml linter", "yaml lint online", "yaml to json", "json to yaml", "yaml converter",
    "kubernetes yaml formatter", "docker compose yaml", "github actions yaml", "yaml editor online",
    "yaml indentation fixer", "yaml validation tool", "yaml diff checker", "yaml compare",
    "yaml config formatter", "yml formatter", "free yaml formatter", "yaml beautify online"
  ],

  longDescription: `
## What Is YAML?

**YAML** (YAML Ain't Markup Language) is a human-readable data serialization language. Originally designed as "Yet Another Markup Language," it was later re-branded to emphasize its focus on data rather than document markup. YAML uses indentation-based nesting, making it visually clean but syntactically strict — a single misplaced space can break an entire configuration file.

YAML has become the de facto configuration language for modern infrastructure. Kubernetes manifests, Docker Compose files, GitHub Actions workflows, Ansible playbooks, Helm charts, and countless CI/CD pipelines all rely on YAML. Its readability advantage over JSON (no curly braces, no commas, supports comments) makes it the preferred choice for human-edited configuration, but that same flexibility makes proper formatting essential.

---

## What Is a YAML Formatter?

A **YAML Formatter** (also called a YAML Beautifier or YAML Pretty Printer) is a tool that takes raw, messy, or inconsistently indented YAML and restructures it with consistent indentation, normalized spacing, and proper alignment. It does not change the data's meaning — only its visual presentation.

Our YAML Formatter parses your document into an abstract syntax tree, then serializes it back with your chosen indentation width, producing clean, deterministic output every time. Comments are preserved, anchors and aliases are maintained, and multi-document YAML is handled correctly.

---

## Why YAML Readability Matters

YAML's whitespace sensitivity means that formatting isn't just aesthetic — it's functional:

- **A tab character instead of spaces** silently breaks the document in most parsers.
- **Inconsistent indentation** (mixing 2-space and 4-space) causes confusing parse errors with unhelpful messages.
- **Misaligned list items** change the data structure entirely — a key-value pair can accidentally become a list element or vice versa.

When a Kubernetes deployment fails because of a YAML indentation error, the error message rarely points to the actual problem. A formatter prevents these issues by ensuring consistent, valid structure before deployment.

---

## YAML Formatting Best Practices

Professional YAML formatting follows these conventions:

### Consistent Indentation
Choose 2 spaces (most common), 4 spaces, or another width, and apply it universally. Never mix indentation sizes within a file. Never use tabs — the YAML specification explicitly forbids them for indentation.

### One Key Per Line
Each key-value pair belongs on its own line. Avoid flow-style mappings (\`{key: value}\`) in configuration files unless the mapping is very short and self-contained.

### Comment Alignment
Align inline comments vertically when they appear on consecutive lines. Place block comments above the key they describe, at the same indentation level.

### Quoting Strings
Only quote strings when necessary — when they contain special characters (\`:\`, \`#\`, \`[\`, \`]\`), start with a number, or could be interpreted as a boolean (\`yes\`, \`no\`, \`true\`, \`false\`). Unnecessary quoting adds visual noise.

### Blank Lines Between Sections
Use a single blank line to separate logical sections of a configuration file. This creates visual grouping without changing semantics.

---

## YAML Indentation Rules

YAML indentation has precise rules that differ from most programming languages:

- **Spaces only** — tabs are not allowed for indentation.
- **Consistent width** — every nested level must use the same number of spaces.
- **Minimum 1 space** — at least one space is required for each nesting level, though 2 is standard.
- **Relative, not absolute** — indentation is measured relative to the parent key, not from column 0.
- **Block sequences** — the \`-\` indicator for list items counts as part of the indentation.

This formatter lets you normalize all indentation to your chosen width (2, 4, or 8 spaces), eliminating mixed-indentation bugs instantly.

---

## YAML vs JSON Comparison

YAML and JSON serve similar purposes but have important differences:

| Feature | YAML | JSON |
|---------|------|------|
| Comments | ✅ Supported (\`#\`) | ❌ Not supported |
| Readability | More human-readable | More machine-readable |
| Quoting | Optional for most strings | Required for all keys and strings |
| Data types | Rich (dates, nulls, booleans) | Limited (string, number, boolean, null) |
| Anchors/Aliases | ✅ Supported | ❌ Not supported |
| Multi-document | ✅ Supported (\`---\`) | ❌ Single document only |
| Whitespace | Significant | Insignificant |
| Parsing speed | Slower | Faster |

Our built-in converter lets you transform between YAML and JSON in both directions, with error handling and pretty-printed output.

---

## Common YAML Mistakes

Even experienced developers make these YAML errors regularly:

1. **Using tabs** — YAML forbids tab characters for indentation. This is the single most common YAML error.
2. **Inconsistent indentation** — Mixing 2-space and 4-space indentation within the same file.
3. **Unquoted special characters** — Values containing \`:\`, \`#\`, \`{\`, \`}\`, \`[\`, \`]\` must be quoted.
4. **Boolean ambiguity** — The strings \`yes\`, \`no\`, \`on\`, \`off\`, \`true\`, \`false\` are parsed as booleans in YAML 1.1. Quote them if you mean the string literal.
5. **Duplicate keys** — YAML allows duplicate keys but only preserves the last value, silently discarding earlier ones.
6. **Missing space after colon** — \`key:value\` is invalid; it must be \`key: value\` with a space.
7. **Wrong list indentation** — List items must be indented relative to their parent key.

---

## YAML for Kubernetes

Kubernetes is the largest consumer of YAML in the infrastructure world. Every Kubernetes resource — Deployments, Services, ConfigMaps, Ingresses, CronJobs — is defined in YAML. A typical production cluster has hundreds or thousands of YAML files.

Common Kubernetes YAML challenges:
- Deep nesting (spec → template → spec → containers → env)
- Long value strings (base64-encoded secrets, annotations)
- Multi-document files separated by \`---\`
- Helm template syntax mixed with YAML

This formatter handles all these patterns, including multi-document YAML with proper \`---\` separator preservation.

---

## YAML for Docker Compose

Docker Compose files define multi-container applications in YAML. They typically include services, networks, volumes, and environment variables. Proper formatting makes it easy to:
- Scan which ports are exposed
- Identify volume mounts at a glance
- Spot missing environment variables
- Review service dependencies

---

## YAML for CI/CD Pipelines

GitHub Actions, GitLab CI, CircleCI, and Azure Pipelines all use YAML for pipeline configuration. These files tend to be complex, with:
- Matrix build strategies
- Conditional step execution
- Artifact passing between jobs
- Environment variable interpolation

A formatter ensures these complex configurations remain readable as they grow over time.

---

## YAML Linting Explained

YAML linting goes beyond basic validation. While validation checks if a document is syntactically correct, linting enforces style rules:

- **Indentation width** — Is it consistently 2 spaces?
- **Quote style** — Are strings using single or double quotes consistently?
- **Trailing spaces** — Are there invisible spaces at the end of lines?
- **Duplicate keys** — Are any keys defined more than once?
- **Line length** — Are any lines excessively long?

This tool includes configurable linting options to match your team's YAML style guide.

---

## YAML Multiline Strings

YAML supports several multiline string syntaxes, each with different behavior:

- **Literal block (\`|\`)** — Preserves line breaks exactly as written.
- **Folded block (\`>\`)** — Folds line breaks into spaces, creating a single paragraph.
- **Block chomping** — \`|+\` keeps trailing newlines, \`|-\` strips them, \`|\` keeps one.

These are essential for embedding shell scripts, SQL queries, or HTML templates in YAML configuration files.

---

## YAML Anchors and Aliases

Anchors (\`&\`) and aliases (\`*\`) let you define a value once and reuse it throughout the document. Combined with merge keys (\`<<\`), they enable DRY (Don't Repeat Yourself) configuration:

\`\`\`yaml
defaults: &defaults
  timeout: 30
  retries: 3

production:
  <<: *defaults
  timeout: 60
\`\`\`

This formatter preserves anchors and aliases correctly, maintaining the reference structure.

---

## Difference Between Beautifying and Minifying YAML

**Beautifying** adds consistent indentation, line breaks, and spacing to make YAML human-readable. Use it during development, code review, and debugging.

**Minifying** removes all unnecessary whitespace, compressing the YAML into fewer lines. While YAML minification is less common than JSON minification (since YAML is whitespace-sensitive), it can reduce file size for transmission while preserving validity.

Both operations preserve the document's data structure. Neither changes what the YAML represents — only how it looks.
  `,

  features: [
    "Instant YAML beautification with configurable indentation (2, 4, or 8 spaces)",
    "YAML Minification to compress documents while preserving validity",
    "Real-time YAML validation with exact line and column error reporting",
    "Professional code editor with YAML syntax highlighting (Monaco Editor)",
    "Bidirectional YAML ↔ JSON conversion with pretty-printed output",
    "Side-by-side diff comparison with added/removed/changed highlighting",
    "Configurable linting: indentation, trailing spaces, duplicate key detection",
    "Multi-document YAML support with --- separator handling",
    "Example presets: Kubernetes, Docker Compose, GitHub Actions, API Config",
    "File upload (.yaml, .yml, .txt) and download capabilities",
    "Auto-save with localStorage session persistence",
    "Undo/Redo support and Word Wrap toggle",
    "Dark mode and light mode support",
    "Keyboard accessible with ARIA labels",
    "100% Client-side processing for absolute data privacy and security"
  ],

  useCases: [
    "Formatting Kubernetes manifests and Helm values files for readability",
    "Validating Docker Compose files before running docker-compose up",
    "Cleaning up GitHub Actions workflow files after manual editing",
    "Converting YAML configuration to JSON for API consumption",
    "Detecting indentation errors in Ansible playbooks before deployment",
    "Comparing original and formatted YAML to verify structural integrity",
    "Standardizing YAML style across a DevOps team with consistent presets",
    "Debugging CI/CD pipeline failures caused by YAML syntax errors"
  ],

  howToSteps: [
    "Paste your raw YAML into the editor on the left, or use the 'Upload' button to load a .yaml or .yml file.",
    "The tool instantly validates your YAML and displays a status badge — green for valid, red for errors with line details.",
    "Select your preferred indentation width from the toolbar dropdown.",
    "Click 'Format' to beautify or 'Minify' to compress the YAML.",
    "Switch to 'YAML → JSON' tab to convert your document to JSON format.",
    "Switch to 'JSON → YAML' tab to convert JSON back to YAML.",
    "Use the 'Diff' tab to compare original vs formatted YAML side-by-side.",
    "Copy or download the output using the toolbar buttons."
  ],

  examples: [
    {
      title: "Beautify Messy YAML",
      description: "Fix inconsistent indentation in a configuration file.",
      input: "server:\n  host: localhost\n  port: 8080\n  database:\n      name: mydb\n      host: db.example.com\n      port: 5432",
      output: "server:\n  host: localhost\n  port: 8080\n  database:\n    name: mydb\n    host: db.example.com\n    port: 5432"
    },
    {
      title: "YAML to JSON Conversion",
      description: "Convert a YAML configuration to JSON format.",
      input: "name: my-app\nversion: 1.0.0\ndependencies:\n  - express\n  - lodash\nconfig:\n  debug: true\n  port: 3000",
      output: `{\n  "name": "my-app",\n  "version": "1.0.0",\n  "dependencies": ["express", "lodash"],\n  "config": {\n    "debug": true,\n    "port": 3000\n  }\n}`
    }
  ],

  faq: [
    {
      question: "What is YAML formatting?",
      answer: "YAML formatting is the process of restructuring YAML documents with consistent indentation, proper spacing, and normalized alignment. It does not change the data's meaning — only its visual presentation. A well-formatted YAML file is easier to read, debug, review, and maintain."
    },
    {
      question: "Is this YAML formatter free?",
      answer: "Yes, this YAML formatter is completely free with no limits. There are no sign-ups, no usage caps, and no premium tiers. Format as many YAML files as you need, of any size."
    },
    {
      question: "Can I validate YAML files?",
      answer: "Yes. The tool validates your YAML in real-time as you type. If any syntax errors are found — such as bad indentation, invalid mappings, or malformed arrays — a detailed error message is displayed with the exact line number and description of the issue."
    },
    {
      question: "Does this tool support Kubernetes YAML?",
      answer: "Yes. This formatter handles Kubernetes manifests including Deployments, Services, ConfigMaps, Ingresses, and multi-document YAML files separated by --- delimiters. It also handles deeply nested structures common in Kubernetes specs."
    },
    {
      question: "Is my YAML processed locally?",
      answer: "Yes, absolutely. All formatting, validation, conversion, and linting are performed entirely in your browser using client-side JavaScript. Your YAML data is never sent to any server, ensuring complete privacy and security."
    },
    {
      question: "Can I convert YAML to JSON?",
      answer: "Yes. The tool includes bidirectional YAML ↔ JSON conversion. Switch to the 'YAML → JSON' tab to convert your YAML document to pretty-printed JSON, or use 'JSON → YAML' to go the other direction. Both conversions include validation and error handling."
    },
    {
      question: "Does this tool support multi-document YAML?",
      answer: "Yes. Multi-document YAML files separated by --- delimiters are fully supported. Each document is parsed, validated, and formatted independently, then reassembled with proper separators."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "XML Formatter", slug: "xml-formatter" },
    { name: "SQL Formatter", slug: "sql-formatter" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "CSS Beautifier", slug: "css-beautifier" },
    { name: "JavaScript Beautifier", slug: "js-beautifier" },
    { name: "Markdown Previewer", slug: "markdown-previewer" }
  ]
};
