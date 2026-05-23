import { ToolConfig } from './types';

export const loremIpsumGeneratorConfig: ToolConfig = {
  slug: "lorem-ipsum-generator",
  title: "Lorem Ipsum & Dummy Text Generator",
  shortDescription: "Generate classic Lorem Ipsum, Developer Ipsum, HTML placeholders, and Markdown structures for UI/UX prototyping and web design.",
  category: "Generators",
  keywords: ["lorem ipsum generator", "dummy text", "placeholder text", "developer ipsum", "HTML placeholder", "marketing ipsum", "UI design text", "mockup content"],
  
  longDescription: `
**Lorem Ipsum** is the industry-standard placeholder text used by designers, developers, and publishers to demonstrate the visual form of a document or user interface without relying on meaningful content. 

Our **Professional Lorem Ipsum Generator** is built specifically for modern web development workflows. Instead of just generating plain blocks of Latin text, it provides granular controls to generate structured HTML templates, Markdown files, and context-specific vocabularies (like Developer Ipsum or Startup Ipsum) that fit the exact tone of your mockup.

### The History of Lorem Ipsum
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
The text is derived from sections 1.10.32 and 1.10.33 of *"de Finibus Bonorum et Malorum"* (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, *"Lorem ipsum dolor sit amet.."*, comes from a line in section 1.10.32.

### Why Use Placeholder Text?
In UI/UX design and frontend development, using placeholder text is critical because it forces reviewers to focus on the **layout, typography, and visual hierarchy** rather than getting distracted by reading the content itself. 
- **Typography Testing:** Lorem Ipsum has a relatively normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English.
- **Content-First Design:** While designing with real content is always ideal, it is rarely available in the early wireframing stages. High-quality placeholders allow developers to build responsive containers without waiting for copywriters.
- **Stress Testing:** By generating massive amounts of text, developers can test how a UI handles overflow, scrolling, and flexbox wrapping.

### Advanced Generation Modes
Our tool goes beyond the classic generator:
1. **HTML Placeholder Mode:** Need a quick blog post layout? Generate a fully structured HTML snippet complete with \`<h1>\` tags, \`<p>\` tags, lists, and blockquotes to drop directly into your CMS or React components.
2. **Markdown Mode:** Perfect for populating static site generators (like Next.js, Gatsby, or Hugo) with \`.md\` files to test your typography plugin styling.
3. **Themed Ipsums:** Building a SaaS landing page? Switch to "Startup Ipsum" for buzzword-filled placeholder text. Building a tech blog? "Developer Ipsum" provides realistic coding jargon to test code block formatting.

### Accessibility and SEO Considerations
When using Lorem Ipsum, it is vital to remember that screen readers will attempt to read it out loud, which can be highly confusing for visually impaired users. If a mockup is accidentally published to a live environment, search engines like Google may index the Lorem Ipsum, leading to a poor user experience and potential SEO penalties for thin content. Always replace dummy text with final, localized copy before deploying to production.
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
