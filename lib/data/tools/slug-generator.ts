import { ToolConfig } from './types';

export const slugGeneratorConfig: ToolConfig = {
  slug: "slug-generator",
  title: "SEO Slug Generator",
  shortDescription: "Instantly convert text and titles into clean, URL-friendly, and SEO-optimized slugs. Supports multi-language transliteration, bulk generation, and custom separators.",
  category: "Generators",
  keywords: ["slug generator", "URL generator", "SEO slug", "slugify", "URL friendly text", "permalink generator", "string to slug", "clean URL"],
  
  longDescription: `
A **URL slug** is the exact part of a web address that identifies a specific page on a website in an easy-to-read form. For example, in the URL \`https://example.com/blog/how-to-write-a-blog-post\`, the slug is \`how-to-write-a-blog-post\`.

Our **SEO Slug Generator** is a professional developer tool designed to instantly transform any text, title, or string into a perfectly clean, URL-safe slug. Whether you are building a custom CMS, launching an eCommerce store, or writing blog posts, having clean and consistent URLs is critical for both user experience and Search Engine Optimization (SEO).

### Why Do Slugs Matter for SEO?
Search engines like Google use the URL structure to understand what a page is about. A clean, keyword-rich slug provides a significant ranking advantage over messy or auto-generated query parameters (like \`?id=12345\`).
- **Readability:** Users are more likely to click on a clean URL in search results because they can instantly predict the page's content.
- **Keyword Relevance:** Including your primary target keywords in the slug signals relevance to search engine algorithms.
- **Link Sharing:** A short, hyphen-separated URL looks much more trustworthy when shared on social media than a long, encoded string filled with \`%20\` spaces and special characters.

### Best Practices for URL Architecture
1. **Use Hyphens, Not Underscores:** Google and other search engines treat hyphens (\`-\`) as word separators. They do not treat underscores (\`_\`) the same way. The phrase \`seo-best-practices\` is read as "seo best practices", whereas \`seo_best_practices\` might be read as a single un-separated string.
2. **Keep it Short:** Shorter URLs tend to rank better. Aim for 3 to 5 highly relevant words. Remove stop words like "a", "an", "the", "and", "or" if they don't add necessary context.
3. **Use Lowercase:** URLs can be case-sensitive depending on the server configuration. Using lowercase uniformly prevents duplicate content issues and 404 errors caused by typos.
4. **Avoid Changing Slugs:** Once a page is published and indexed, changing the slug will break existing links. If you must change a slug, ensure you set up a proper 301 redirect.

### Handling International & Unicode URLs
Generating slugs for non-English languages can be challenging. Our tool features an advanced transliteration engine that safely converts characters from Arabic, Cyrillic, Greek, German, French, Spanish, and many other languages into their closest standard ASCII equivalents. For example, \`über\` seamlessly becomes \`uber\`, and \`café\` becomes \`cafe\`. Emojis and completely unsupported characters are safely stripped out to prevent broken links.

### Slugs in Modern Frameworks
Modern frontend frameworks like **Next.js**, **Nuxt**, and **React Router** heavily rely on slugs for dynamic routing. In Next.js, a file named \`[slug].tsx\` or a folder named \`[slug]\` will dynamically match any generated slug path, making it the standard pattern for rendering content from headless CMS platforms or databases.
  `,

  features: [
    "Instant real-time string-to-slug conversion",
    "Advanced Unicode transliteration for multiple languages (French, German, Arabic, etc.)",
    "Bulk generation mode for processing hundreds of titles at once",
    "Custom separator options (Hyphen, Underscore, Dot, or Custom)",
    "Granular controls to strip numbers, special characters, and emojis",
    "Real-time SEO score and length validation",
    "One-click copy and export to TXT, JSON, or CSV",
    "Developer utility snippets for Next.js, Node.js, Python, PHP, and more"
  ],

  useCases: [
    "Generating SEO-friendly permalinks for blog posts and articles",
    "Creating clean product URLs for eCommerce platforms (Shopify, WooCommerce)",
    "Sanitizing user input for creating unique usernames or profile URLs",
    "Converting category names into database-friendly tags",
    "Standardizing URL structures across a large-scale content migration",
    "Developing dynamic routing logic in frameworks like Next.js or Laravel"
  ],

  howToSteps: [
    "Type or paste your text into the 'Input String' field. The slug will generate instantly.",
    "Choose your preferred Separator (Hyphens are highly recommended for SEO).",
    "Toggle any formatting options you need, such as removing numbers or forcing lowercase.",
    "Check the 'SEO Score' panel to see if your slug is an optimal length.",
    "Click the 'Copy' button to copy the slug to your clipboard.",
    "If you have multiple titles, switch to 'Bulk Mode' to process them all at once.",
    "Use the 'Export' options in Bulk Mode to download your slugs as a JSON, CSV, or TXT file.",
    "Visit the 'Developer Snippets' tab to see how to implement slug generation in your own codebase."
  ],

  examples: [
    {
      title: "Standard SEO Slug",
      description: "Converting a standard blog title into a lowercase, hyphen-separated slug.",
      input: "10 Ultimate Next.js Tips for 2026!",
      output: "10-ultimate-nextjs-tips-for-2026"
    },
    {
      title: "Unicode Transliteration",
      description: "Safely converting accented characters to standard ASCII.",
      input: "Le café est très bon aujourd'hui",
      output: "le-cafe-est-tres-bon-aujourdhui"
    },
    {
      title: "File Naming (Underscores)",
      description: "Using underscores instead of hyphens for system file naming.",
      input: "My Important Document Final Version",
      output: "my_important_document_final_version"
    }
  ],

  faq: [
    {
      question: "What is a slug in a URL?",
      answer: "A slug is the part of a URL that uniquely identifies a specific page on a website in an easy-to-read format. For example, in 'website.com/blog/my-post', 'my-post' is the slug."
    },
    {
      question: "Why should I use hyphens instead of underscores?",
      answer: "Search engines like Google specifically treat hyphens as word separators. If you use 'my_page', Google reads it as 'mypage'. If you use 'my-page', Google correctly reads 'my page', which helps your page rank for those individual keywords."
    },
    {
      question: "How long should a good slug be?",
      answer: "The optimal length for an SEO slug is between 3 to 5 words (roughly 50-60 characters total URL length). It should be descriptive but concise. Very long URLs get truncated in search results and look spammy."
    },
    {
      question: "Does capitalization matter in slugs?",
      answer: "Yes! While some servers (like Windows IIS) are case-insensitive, most Linux/Unix servers treat 'My-Page' and 'my-page' as two completely different URLs. This can lead to duplicate content SEO penalties or 404 errors. It is an industry standard to make all slugs lowercase."
    },
    {
      question: "Can I use emojis or special characters in a slug?",
      answer: "While modern browsers can handle encoded Unicode characters, it is highly discouraged for URLs. They encode into long, ugly strings (like '%F0%9F%98%80') when copied and pasted, which looks unprofessional and can break some third-party integrations. Our tool automatically strips or transliterates these."
    },
    {
      question: "What is the difference between a slug and a permalink?",
      answer: "A permalink is the entire permanent URL of the page (e.g., 'https://site.com/category/my-post'). The slug is just the final, specific part of that permalink ('my-post')."
    }
  ],

  relatedTools: [
    { name: "URL Encoder / Decoder", slug: "url-encoder" },
    { name: "UUID Generator", slug: "uuid-generator" },
    { name: "Meta Tag Generator", slug: "meta-tag-generator" },
    { name: "Sitemap Generator", slug: "sitemap-xml-generator" }
  ]
};
