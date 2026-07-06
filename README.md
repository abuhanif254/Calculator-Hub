# 🚀 Nexus Calculator Hub

<div align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
</div>

<br />

**Nexus Calculator Hub** is a highly optimized, production-ready web platform housing over **150+ interactive calculators**, **130+ professional developer tools**, **PDF processors**, and **Image utilities**. Engineered for speed, privacy, and flawless internationalization, Nexus serves as a premium zero-cloud ecosystem where all processing happens directly in the user's browser.

---

## 🌟 Why Nexus Calculator Hub?

In the modern web landscape, users demand instant results and absolute data privacy. Nexus Calculator Hub is built on a **Zero-Cloud Architecture**. Whether you are formatting sensitive JSON data, compressing PDF documents, or calculating financial mortgages, **no data is ever uploaded to a server**. Everything is processed client-side leveraging WebAssembly and modern Web APIs.

Additionally, this repository serves as a **masterclass in Next.js 15 SEO architecture**. It features programmatic localized sitemaps, robust hreflang tags, dynamic canonical mappings, and lightning-fast Static Site Generation (SSG).

## ✨ Core Features

- 🛠️ **Massive Tool Ecosystem:** Over 280+ unique tools across Finance, Math, Health, Web Development, PDF Manipulation, and Image Processing.
- 🌍 **Flawless Internationalization (i18n):** Deeply integrated with `next-intl`. Available in English (`en`), Spanish (`es`), French (`fr`), and German (`de`). Pathnames are fully localized (e.g., `/en/tools/json-formatter` vs `/es/herramientas/json-formatter`).
- ⚡ **Ultimate Performance (SSG):** All tools and calculators are statically generated at build time, ensuring sub-second page loads and passing Core Web Vitals with flying colors.
- 🔒 **Privacy-First (Zero-Cloud):** Advanced client-side processing using tools like `pdf-lib` and Canvas APIs. User data never leaves the browser.
- 🔍 **Enterprise SEO Architecture:** 
  - Dynamic, programmatic single XML sitemap generation.
  - Automated dynamic `canonical` and `hreflang` tags.
  - Detailed metadata for OpenGraph, Twitter Cards, and JSON-LD structured data (Breadcrumbs, FAQ, SoftwareApplication, HowTo).
- 📱 **Modern UI/UX:** Fully responsive, accessible, and themeable (Light/Dark mode) interface styled with Tailwind CSS and Lucide React icons. Includes Glassmorphism and modern UI paradigms.
- 🤖 **Developer Community:** Integrated community discussion board for developer interactions, code snippets, and bug reports.

## 🏗️ Technology Stack

Nexus Calculator Hub is built on the bleeding edge of the React ecosystem:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid, utility-first styling.
- **Internationalization:** [next-intl](https://next-intl-docs.vercel.app/) for robust routing and locale management.
- **Icons:** [Lucide React](https://lucide.dev/)
- **Markdown Processing:** `react-markdown` and `gray-matter` for rendering rich tool documentation.
- **Client-side Processing:** `pdf-lib` (PDFs), Web API Canvas (Images).

## 🚀 Getting Started

Follow these steps to set up the project locally for development and testing.

### Prerequisites

- Node.js (v18.17.0 or later recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abuhanif254/Calculator-Hub.git
   cd Calculator-Hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn install, pnpm install
   ```

3. **Configure Environment Variables:**
   Copy the `.env.example` file to create a `.env.local` file.
   ```bash
   cp .env.example .env.local
   ```
   *Note: If you plan on enabling Google AdSense or Firebase community features, configure the respective keys in this file.*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **View the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Architecture

The repository is structured to scale massively while maintaining maintainability:

```text
nexus-calculator/
├── app/                  # Next.js 15 App Router directory
│   ├── [locale]/         # Internationalized route groups (calculators, tools, etc.)
│   ├── api/              # Internal API endpoints
│   ├── components/       # Global React components (Navbar, Footer, Tools)
│   ├── sitemap.ts        # Programmatic XML sitemap generator
│   ├── robots.ts         # Robots.txt generator
│   └── globals.css       # Global styles
├── content/              # Markdown files containing 1500+ words of localized SEO content per tool
├── i18n/                 # next-intl configuration and localized path mappings
├── lib/                  # Core logic
│   ├── data/             # Tool configs, calculator lists, and registry
│   └── utils/            # Shared utilities (e.g., seoUtils.ts for hreflang mapping)
├── messages/             # i18n translation dictionaries (en.json, es.json, fr.json, de.json)
└── public/               # Static assets, PWA manifests, and icons
```

## 🔍 SEO & Crawlability Highlights

For developers looking to learn advanced Next.js SEO, this repository implements:
- **`seoUtils.ts`**: A centralized utility that generates absolute `x-default` and locale-specific `hreflang` tags to prevent Google duplicate content penalties.
- **Next-Intl Routing**: Resolves dynamic slugs (e.g., `[slug]`) across languages securely via Middleware.
- **Schema Markup**: Automatic injection of JSON-LD schemas (Breadcrumbs, FAQPage, HowTo, SoftwareApplication) per tool to dominate rich snippets on Google Search.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

If you find a bug or have a feature request, please [open an issue](https://github.com/abuhanif254/Calculator-Hub/issues).

## 📄 License

This project is distributed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

## 📧 Contact

**Author:** MD Abu Hanif Mia  
**Email:** mohammadbitullah@gmail.com  
**Project Link:** [https://github.com/abuhanif254/Calculator-Hub](https://github.com/abuhanif254/Calculator-Hub)  

---
<div align="center">
  <i>Built with ❤️ for developers and professionals worldwide.</i>
</div>
