# NexusCalculator — Quantitative Calculators, Browser Tools & GEO-Ready Platform

<div align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="i18n" src="https://img.shields.io/badge/Locales-EN%20%7C%20ES%20%7C%20FR%20%7C%20DE-518231?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
</div>

<br />

**[NexusCalculator](https://www.nexuscalculator.net/en)** is a high-performance, 100% client-side quantitative engineering and browser-utility platform featuring **200+ peer-reviewed calculators**, **135+ browser-based developer, PDF, and image tools**, **190+ technical & financial guides**, and **26+ free embeddable website calculator widgets** across **4 languages** (`en`, `es`, `fr`, `de`).

> **Live Platform:** [www.nexuscalculator.net](https://www.nexuscalculator.net/en) · **Embeddable Widgets:** [/en/embed-widgets](https://www.nexuscalculator.net/en/embed-widgets) · **Editorial Policy:** [/en/editorial-policy](https://www.nexuscalculator.net/en/editorial-policy) · **AI Citation Index:** [/llms.txt](https://www.nexuscalculator.net/llms.txt) & [/llms-full.txt](https://www.nexuscalculator.net/llms-full.txt)

---

## Why NexusCalculator?

- **100% Zero-Cloud Client-Side Execution:** Financial inputs, clinical health measurements, JSON/JWT payloads, PDF documents, and images are processed exclusively inside your browser via IEEE 754 math, Web Crypto API, HTML5 Canvas, `pdf-lib`, and WebAssembly — zero user data is ever uploaded or stored on backend servers.
- **Verified Mathematical Rigor (78 Localized Formula Models):** Every core calculator documents its exact formula, LaTeX notation, variable legend, and step-by-step derivation aligned with CFPB Regulation Z, WHO/NIH clinical equations, NIST/ISO 80000-2 SI physics & chemistry constants, and IRS 2026 statutory caps.
- **63 Native 4-Language Featured Snippet Reference Matrices:** Instant pre-calculated lookup tables in native regional units (`$` / `€`, `lb` / `kg`, `kWh`, `m³`) covering 193 calculators across English, Spanish, French, and German.
- **Free Embeddable Calculator Widgets:** Drop any interactive calculator into WordPress, Webflow, Squarespace, Shopify, or plain HTML via lazy-loaded `<iframe>` widgets with Light, Dark, and Auto theme support at [www.nexuscalculator.net/en/embed-widgets](https://www.nexuscalculator.net/en/embed-widgets).
- **Edge-First Static Architecture & GEO Optimization:** Pure static generation (`revalidate = false`), cookieless `next-intl` Edge CDN caching, atomic 1-hop canonical 301 routing, bidirectional `hreflang` sitemaps, full JSON-LD (`SoftwareApplication`, `MathSolver`, `FAQPage`, `HowTo`, `BreadcrumbList`), and machine-readable `/llms.txt` + `/llms-full.txt` citation corpora.

---

## Core Ecosystem Links

| Hub | English | Español | Français | Deutsch |
| :--- | :--- | :--- | :--- | :--- |
| **Calculators (200+)** | [/en/calculators](https://www.nexuscalculator.net/en/calculators) | [/es/calculadoras](https://www.nexuscalculator.net/es/calculadoras) | [/fr/calculatrices](https://www.nexuscalculator.net/fr/calculatrices) | [/de/rechner](https://www.nexuscalculator.net/de/rechner) |
| **Browser Tools (135+)** | [/en/tools](https://www.nexuscalculator.net/en/tools) | [/es/herramientas](https://www.nexuscalculator.net/es/herramientas) | [/fr/outils](https://www.nexuscalculator.net/fr/outils) | [/de/werkzeuge](https://www.nexuscalculator.net/de/werkzeuge) |
| **Embeddable Widgets** | [/en/embed-widgets](https://www.nexuscalculator.net/en/embed-widgets) | [/es/incrustar-calculadoras](https://www.nexuscalculator.net/es/incrustar-calculadoras) | [/fr/integrer-calculatrices](https://www.nexuscalculator.net/fr/integrer-calculatrices) | [/de/rechner-einbetten](https://www.nexuscalculator.net/de/rechner-einbetten) |
| **Technical Guides (190+)** | [/en/guides](https://www.nexuscalculator.net/en/guides) | [/es/guias](https://www.nexuscalculator.net/es/guias) | [/fr/guides](https://www.nexuscalculator.net/fr/guides) | [/de/anleitungen](https://www.nexuscalculator.net/de/anleitungen) |
| **Comparisons** | [/en/compare](https://www.nexuscalculator.net/en/compare) | [/es/comparar](https://www.nexuscalculator.net/es/comparar) | [/fr/comparer](https://www.nexuscalculator.net/fr/comparer) | [/de/vergleichen](https://www.nexuscalculator.net/de/vergleichen) |
| **Workflow Toolkits** | [/en/collections](https://www.nexuscalculator.net/en/collections) | [/es/colecciones](https://www.nexuscalculator.net/es/colecciones) | [/fr/collections](https://www.nexuscalculator.net/fr/collections) | [/de/sammlungen](https://www.nexuscalculator.net/de/sammlungen) |

---

## Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Site Generation)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) (4 localized pathname trees with cookieless Edge caching)
- **Math & Charts:** `katex` & `chart.js`
- **Client-Side File Engines:** `pdf-lib`, `pdfjs-dist`, HTML5 Canvas, Web Crypto API
- **Content Engine:** Markdown + `gray-matter` + `react-markdown`

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, or bun

### Local Setup

```bash
git clone https://github.com/abuhanif254/Calculator-Hub.git
cd Calculator-Hub
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

---

## Project Architecture

```text
Calculator-Hub/
├── app/
│   ├── [locale]/              # Localized routes (calculators, tools, guides, embed-widgets, embed, compare, collections)
│   ├── components/            # Shared UI, DirectAnswerCard, StaticCalculationMatrix, EmbedCalculatorModal
│   ├── llms.txt/route.ts      # Compact GEO index for AI Search & LLMs
│   ├── llms-full.txt/route.ts # Full machine-readable formula & catalog corpus
│   ├── sitemap.ts             # Programmatic 4-locale hreflang XML sitemap
│   └── robots.ts              # Crawl & AdSense / AI Search / Scraper policy
├── content/                   # Localized Markdown editorial content (en, es, fr, de)
├── i18n/                      # next-intl routing & localized pathname mappings
├── lib/
│   ├── data/
│   │   ├── formulas/          # 78 verified 4-language mathematical formula definitions
│   │   ├── matrices/          # 63 localized 4-language Featured Snippet lookup matrices
│   │   ├── calculators.ts     # 200+ calculator registry
│   │   ├── tools/             # 135+ browser utility configs
│   │   └── guides.ts          # 190+ technical guide registry
│   └── utils/                 # seoUtils.ts, toolLocalization.ts, linkResolver.ts
├── messages/                  # i18n UI dictionaries (en, es, fr, de)
└── public/                    # Icons, manifest, verification files
```

---

## Contributing

Contributions, bug reports, and formula verification suggestions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Run type checking (`npx tsc --noEmit`)
4. Commit your changes and open a Pull Request

---

## Author & License

- **Founder & Lead Systems Architect:** [MD Abu Hanif Mia](https://abuhanifmia.com)
- **Live Website:** [https://www.nexuscalculator.net](https://www.nexuscalculator.net/en)
- **License:** MIT License ([LICENSE](LICENSE))
