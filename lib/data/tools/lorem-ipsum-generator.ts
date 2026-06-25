import { ToolConfig } from './types';

export const loremIpsumGeneratorConfig: ToolConfig = {
  slug: "lorem-ipsum-generator",
  title: "Lorem Ipsum & Dummy Text Generator",
  shortDescription: "Generate classic Lorem Ipsum, Developer Ipsum, HTML placeholders, and Markdown structures for UI/UX prototyping and web design.",
  category: "Generators",
  keywords: ["lorem ipsum generator", "dummy text", "placeholder text", "developer ipsum", "HTML placeholder", "marketing ipsum", "UI design text", "mockup content"],
  
  longDescription: `
**Lorem Ipsum** is the global industry-standard placeholder text used by UI/UX designers, frontend developers, typographers, and publishers to demonstrate the visual layout, typographic hierarchy, and structural form of a document or web interface without relying on actual meaningful content.

Our **Professional Lorem Ipsum Generator** is not just a standard copy-paste tool. It is built specifically for modern web development and design workflows. Instead of merely generating plain blocks of Latin text, it provides granular controls to generate structured HTML templates, Markdown files, and context-specific vocabularies (like Developer Ipsum or Startup Ipsum) that precisely fit the tone and technical requirements of your mockup.

### The Fascinating History of Lorem Ipsum

Lorem Ipsum has been the industry's standard dummy text for over five centuries. Its origins trace back to the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Incredibly, it has survived not only five centuries of mechanical printing but also the leap into modern electronic typesetting and web design, remaining essentially unchanged.

Contrary to popular belief, Lorem Ipsum is not simply random text. Its roots are firmly planted in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, *consectetur*, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 

The text is derived from sections 1.10.32 and 1.10.33 of *"de Finibus Bonorum et Malorum"* (The Extremes of Good and Evil) by Cicero. This book was a highly popular treatise on the theory of ethics during the Renaissance. The first line of Lorem Ipsum, *"Lorem ipsum dolor sit amet.."*, comes from a line in section 1.10.32.

### Why is Placeholder Text So Critical in UI/UX Design?

In the early stages of UI/UX design, wireframing, and frontend development, using placeholder text is an absolute necessity. It forces stakeholders, clients, and reviewers to focus entirely on the **layout, typography, and visual hierarchy** rather than getting distracted by reading the content itself.

#### 1. Preventing "Content Distraction"
When designers use real English text (like a drafted paragraph about a company's mission statement) in a design mockup, clients inevitably begin proofreading the text instead of evaluating the design. They will argue over word choices, grammar, and marketing tone. Lorem Ipsum bypasses this psychological hurdle. Because the Latin text is unreadable to the average client, their brain immediately categorizes it as "placeholder," allowing them to focus on the balance of the page, the weight of the fonts, and the use of negative space.

#### 2. Accurate Typographic Testing
You might ask, "Why not just type 'Content goes here. Content goes here' over and over?" The problem with that approach is that it creates unnatural repeating patterns that do not accurately represent real language. 

Lorem Ipsum has a relatively normal, natural distribution of letters and word lengths. It contains a standard mix of vowels, consonants, short words, and long words. This ensures that when you test a specific font family, line-height, and kerning, the text block looks exactly like a real English paragraph, providing a highly accurate representation of the final typographic design.

#### 3. Stress-Testing Layouts and Components
Frontend developers often build responsive components (like CSS Grid cards or Flexbox navigation menus) before the final copy is ready. By generating massive amounts of Lorem Ipsum—ranging from a single sentence to 10 massive paragraphs—developers can stress-test how a UI component handles overflow, scrolling, word-wrapping, and dynamic height adjustments on mobile devices.

### Advanced Generation Modes for Modern Developers

While standard Lorem Ipsum is great for Figma or Adobe XD, frontend engineers building React, Vue, or Next.js applications need placeholder text formatted for code. Our tool goes far beyond the classic generator:

#### 1. HTML Placeholder Mode
If you are building a blog template, a CMS backend, or a rich-text article layout, pasting raw text is insufficient. You need to test how the browser renders different structural tags. Our generator can output a fully structured **HTML template** complete with \`<h1>\` through \`<h3>\` heading tags, \`<p>\` paragraphs, \`<ul>\` unordered lists, \`<strong>\` tags for bolding, and \`<blockquote>\` elements. You can copy this HTML snippet and drop it directly into your React components or Vue templates to test global CSS resets and typography styling instantly.

#### 2. Markdown Mode
Static site generators (like Next.js, Gatsby, Astro, or Hugo) rely heavily on Markdown (\`.md\` or \`.mdx\`) files for content. Testing how your site's Markdown parser (like remark or marked) renders content requires populated files. Switch our generator to Markdown mode to instantly create a perfectly formatted \`.md\` document filled with placeholder text, headers, and lists.

#### 3. Themed "Ipsums" for Specific Niches
Sometimes classic Latin feels out of place, especially in modern tech mockups. Our tool allows you to switch vocabularies:
- **Developer Ipsum:** Generates paragraphs filled with coding jargon, API references, and DevOps terminology. Perfect for populating a mock technical documentation site or a SaaS dashboard.
- **Startup Ipsum:** Generates text using modern Silicon Valley buzzwords (e.g., "synergy", "blockchain", "disruptive", "pivot"). Excellent for designing landing pages for tech startups.

### Best Practices for Using Lorem Ipsum

1. **Never Deploy to Production:** This sounds obvious, but countless websites have gone live with "Lorem Ipsum" still sitting in their footer or About Us page. Always run a search query across your codebase for the word "lorem" before pushing to production.
2. **Use Realistic Lengths:** If you are designing a user profile card, don't generate 5 paragraphs of text. Generate a 20-word sentence that accurately mimics the length of a real user bio. 
3. **Transition to Real Content Quickly:** While Lorem Ipsum is essential for wireframing, "Content-First Design" is the ultimate goal. Once the layout is approved, replace the placeholder text with actual draft copy as soon as possible, as real content often breaks layouts in unpredictable ways.

### Conclusion

A reliable placeholder text generator is a fundamental utility in any digital creator's toolbox. Whether you are a UI designer sketching a wireframe in Figma, a frontend developer styling a complex CSS Grid layout, or a QA engineer testing text overflow limits, our Lorem Ipsum Generator provides the flexibility, formatting options, and vocabulary themes you need to build better interfaces faster.
  `,

  features: [
    "Generate text by Words, Sentences, Paragraphs, or exact Character count",
    "Toggle structured outputs including raw text, Markdown, or HTML tags",
    "Generate complete SEO Mockup layouts (Blog Posts, Landing Pages, FAQs)",
    "Multiple vocabulary themes: Classic, Developer, Startup, Marketing, and Tech Ipsum",
    "Live typography preview panel (test font sizes, line heights, and container widths)",
    "Instant real-time reading time and character count statistics",
    "One-click copy and export to TXT, JSON, HTML, or Markdown",
    "Persistent local history to restore previous generation templates"
  ],

  useCases: [
    "Populating wireframes and Figma designs with realistic text lengths",
    "Testing CSS typography (line-height, letter-spacing, and responsive font sizes) in frontend development",
    "Generating structural HTML to test CMS rich text renderer components",
    "Filling database seeds with dummy data during local development",
    "Testing UI layout shifts and container flex-wrapping under heavy content loads"
  ],

  howToSteps: [
    "Select your preferred 'Content Type' (e.g., Classic Lorem Ipsum or Developer Ipsum).",
    "Choose whether you want to generate by Paragraphs, Sentences, Words, or Characters.",
    "Adjust the amount slider or number input to set the exact volume of text.",
    "If you are mocking up a webpage, switch the Output Format to 'HTML' to generate structured tags.",
    "Use the Typography Preview panel to see how the text reads at different font sizes and line heights.",
    "Click the 'Copy' button to copy your text, or use the 'Download' button to save it as a file."
  ],

  examples: [
    {
      title: "Classic Paragraph",
      description: "A standard paragraph of traditional Lorem Ipsum.",
      input: "Classic | 1 Paragraph",
      output: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      title: "Developer Ipsum",
      description: "Tech-focused vocabulary for developer tool mockups.",
      input: "Developer Ipsum | 2 Sentences",
      output: "Refactor the asynchronous microservices using typed interfaces. The continuous integration pipeline deployed the kubernetes clusters perfectly."
    },
    {
      title: "HTML Structure",
      description: "Generating a semantic HTML block.",
      input: "Classic | HTML Mode",
      output: "<h2>Lorem ipsum dolor</h2><p>Consectetur adipiscing elit...</p><ul><li>Item 1</li><li>Item 2</li></ul>"
    }
  ],

  faq: [
    {
      question: "What is Lorem Ipsum?",
      answer: "Lorem Ipsum is dummy text used in the printing and typesetting industry. It is used as a placeholder to demonstrate the visual layout of a document without being distracted by readable content."
    },
    {
      question: "Why do designers use Lorem Ipsum?",
      answer: "Designers use it because it has a relatively normal distribution of letters, making it look like standard English text. If a designer uses 'Insert text here' repeatedly, the pattern draws the eye and distracts from the overall layout design."
    },
    {
      question: "Is Lorem Ipsum SEO friendly?",
      answer: "No. Lorem Ipsum has no semantic meaning. If you accidentally publish a page with Lorem Ipsum on a live website, search engines will index it, which looks unprofessional to users and provides zero SEO value. Always replace it before going live."
    },
    {
      question: "What language is Lorem Ipsum?",
      answer: "It is based on scrambled Latin words derived from a 1st-century BC text by Cicero. However, because words have been altered, added, and removed over centuries, it is not proper, translatable Latin."
    },
    {
      question: "Can I generate HTML placeholder content?",
      answer: "Yes! Our generator features an HTML mode that wraps the generated text in proper semantic tags like paragraphs, headings, blockquotes, and lists."
    },
    {
      question: "What is Developer Ipsum?",
      answer: "Developer Ipsum is a themed variant of dummy text that uses programming terminology (e.g., APIs, async, containers, refactoring) instead of Latin. It's often preferred when mocking up developer tools or tech blogs."
    }
  ],

  relatedTools: [
    { name: "Markdown Previewer", slug: "markdown-previewer" },
    { name: "HTML Formatter", slug: "html-formatter" },
    { name: "Slug Generator", slug: "slug-generator" },
    { name: "UUID Generator", slug: "uuid-generator" }
  ]
};
