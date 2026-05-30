import { ToolConfig } from './types';

export const aiPromptHelperConfig: ToolConfig = {
  slug: "ai-prompt-helper",
  title: "AI Prompt Helper & Optimizer",
  shortDescription: "Optimize and generate high-quality prompts for ChatGPT, GPT-5, Claude, Gemini, DeepSeek, and image AIs. Analyze tokens, structure reasoning steps, and build reusable templates.",
  category: "Generators",
  keywords: [
    "ai prompt engineering",
    "prompt optimization",
    "chatgpt prompts",
    "claude prompts",
    "gemini prompts",
    "prompt writing",
    "ai prompt generator",
    "prompt templates",
    "prompt engineering guide",
    "better ai prompts",
    "ai productivity",
    "ai workflows",
    "generative ai tools",
    "llm prompts",
    "prompt design",
    "prompt structures",
    "ai automation",
    "ai content creation",
    "ai coding prompts",
    "ai writing prompts",
    "ai image generation prompts",
    "ai assistant prompts",
    "prompt best practices",
    "prompt examples",
    "advanced prompt engineering",
    "professional prompt design",
    "ai instruction writing",
    "large language models",
    "future of prompt engineering",
    "ai optimization tools"
  ],

  longDescription: `
## Introduction to AI Prompt Engineering

**Prompt engineering** is the process of structuring, refining, and designing textual inputs to ensure that Large Language Models (LLMs) and Generative AI systems deliver accurate, relevant, and high-quality responses. Think of it as programming in natural language. Instead of writing compile-ready code, a prompt engineer writes detailed directives, provides contextual boundaries, and specifies output formats to guide the model's reasoning path.

While modern models like GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro are highly capable, they are fundamentally probabilistic prediction engines. Their outputs are highly sensitive to phrasing, formatting, and instruction details. Our **AI Prompt Helper & Optimizer** acts as an online **Prompt Enhancer** and **AI Prompt Generator**, helping both beginners and professionals translate basic ideas into structured, high-performing prompts that reduce hallucinations and maximize output quality.

---

## Why Prompt Quality Matters

A poorly written prompt (such as *"write a blog post about marketing"*) forces the AI to make assumptions about tone, target audience, format, length, and content focus. This inevitably leads to generic, surface-level text that requires heavy rewriting.

### 1. Reducing Hallucinations & Output Errors
Language models can generate plausible-sounding but completely fabricated facts (hallucinations) when they lack context or boundaries. By specifying constraints (e.g., *"If you do not know the answer based on the provided document, state 'I do not have this information'"*), you establish guardrails that maintain factual integrity.

### 2. Controlling API Token Budgets & Computational Cost
In developer workflows, prompt length directly impacts billing. 
- **Input Tokens:** Longer prompts increase cost.
- **Output Tokens:** Verbose, unconstrained outputs consume budget.
- **Optimization:** An optimized prompt is concise yet detailed, using structured formats like XML tags or JSON schemas to keep token usage within strict boundaries.

### 3. Scaling Automated Agent Workflows
When integrating LLMs into software agents, prompt formatting must be deterministic. If a prompt instructs the model to return data in a specific JSON format, a minor syntax variation can break the backend parser. Prompt engineering establishes the schemas, rules, and error-handling steps to ensure consistent outputs.

---

## Foundational Frameworks of Prompt Design

High-performing prompts are built using structured frameworks that divide the instruction block into readable components. One of the most popular is the **RICIO Model**:

### 1. The RICIO Framework
- **Role:** Establish who the AI is (e.g., *"Act as a Senior React Developer"*). This primes the model's parameter weights for specific vocabularies and approaches.
- **Instruction:** Clarify the core task (e.g., *"Refactor the dynamic component to utilize React.memo"*).
- **Context:** Provide background facts, documents, constraints, or datasets (e.g., *"The project uses Tailwind CSS and needs to maintain WCAG accessibility guidelines"*).
- **Input Data:** The raw material for the task (e.g., the code block to be refactored).
- **Output Indicator:** Specify the format, length, tone, or style of the response (e.g., *"Return ONLY the code block within markdown fences, with no conversational introduction"*).

### 2. Chain-of-Thought (CoT) Prompting
Chain-of-thought prompting instructs the AI to break down complex problems into step-by-step reasoning sequences before stating the final answer. This mimics human analysis and significantly improves performance on mathematical, logical, and coding tasks.
- **Implementation:** Add directives like *"Think step-by-step before answering. List your assumptions, evaluate alternative approaches, and then write your final code."*

### 3. Zero-Shot vs. Few-Shot Prompting
- **Zero-Shot:** Asking the AI to perform a task without providing examples. Useful for simple tasks.
- **Few-Shot:** Providing one or more complete examples of the input and expected output within the prompt. This establishes the formatting, tone, and logic patterns without needing complex instructions.

---

## Writing Prompts for Specific LLM Architectures

Different AI models are trained on distinct datasets and respond to specific syntactic triggers.

### 1. ChatGPT & GPT-4o
OpenAI's models respond exceptionally well to explicit rules, markdown headers, and system role commands.
- **Directives:** Use CAPITALIZED keywords for emphasis (e.g., *"DO NOT rewrite existing imports"*).
- **Structure:** Break prompts down using Markdown headers (\`# Context\`, \`# Instructions\`).

### 2. Claude (Anthropic)
Claude is highly sensitive to the order of instructions and structures content best using XML tags.
- **XML Tags:** Wrap data and instructions in XML-like tags (e.g., \`<context>\` or \`<rules>\`). Claude is trained to identify and parse these boundaries cleanly.
- **System Placement:** Anthropic recommends putting the system role and instructions first, followed by documents, and finally user inputs.

### 3. Gemini (Google)
Gemini features massive context windows and is designed for multimodal inputs (text, image, audio, video).
- **Context Integration:** You can feed massive volumes of documentation (up to 2 million tokens) and prompt Gemini to cross-reference details.
- **Task Ordering:** Place the core prompt task and output format instructions at the end of the text.

### 4. DeepSeek & Open-Source LLMs (Llama, Mistral)
Open-source models require precise prompt boundaries (such as llama's special tokens: \`[INST]\` and \`[/INST]\`). When using standard interfaces, keep instructions explicit, simple, and avoid ambiguous formatting.

---

## Optimizing Image Generation Prompts

AI image generators (like Midjourney, DALL-E 3, and Flux) require a completely different prompting style focused on visual descriptions, composition, and parameter flags.

### 1. Midjourney Prompts
Midjourney translates keywords and descriptive phrases rather than complex logical instructions.
- **Structure:** Subject, environment, lighting details, color palette, camera angle, style references, followed by parameters.
- **Parameters:**
  - \`--ar 16:9\`: Sets the aspect ratio.
  - \`--v 6.0\`: Specifies version.
  - \`--stylize 250\`: Controls how artistic the output is.
  - \`--no text, watermark\`: Negative prompts.

### 2. DALL-E 3
DALL-E 3 (integrated inside ChatGPT) excels at natural language understanding. It converts your prompt into a highly descriptive paragraph before generating the image.
- **Approach:** Write complete, descriptive sentences specifying subject relationships, moods, and textures.

---

## Token Economics and Budget Estimation

When building AI applications, tracking **Token Usage** is essential.

### What is a Token?
A token is a fraction of a word. LLMs read text in pieces rather than character-by-character.
- **Rule of Thumb:**
  - 1 token is approximately **4 characters** in English.
  - 100 tokens are roughly **75 words**.
  - Non-Latin scripts (like Bengali, Hindi, Arabic) consume significantly more tokens per word because they are split into multiple sub-word characters by tokenizers.

### Context Window & Memory
Every model has a maximum context limit (e.g. 128k tokens for GPT-4). This includes both input prompt and output response. If your prompt exceeds this limit, the model will forget the beginning of the conversation. Our tool estimates token counts and approximate costs to help developers budget APIs.
  `,

  features: [
    "Automatic prompt optimization that expands simple ideas into detailed, structured instructions.",
    "Multi-model optimization tailoring prompts for ChatGPT, Claude, Gemini, DeepSeek, and Llama.",
    "Analysis scorecards grading prompt clarity, detail, context, structure, and instructions.",
    "Token estimation widgets for GPT, Claude, and Gemini with approximate API cost calculations.",
    "Built-in template library covering writing, coding, marketing, strategy, and creative prompts.",
    "Image prompt designer formatting styles, angles, camera configurations, and parameters for Midjourney & Flux.",
    "Style filters to adjust prompt tone: Professional, Technical, Academic, Creative, or Executive.",
    "Role-based prompt generator simulating engineers, SEO experts, copywriters, and consultants.",
    "Export modes supporting markdown downloads, plain text files, and JSON templates.",
    "Local draft auto-save and history manager for quick retrieval of previous designs."
  ],

  useCases: [
    "Content writers drafting articles, emails, or SEO copies looking for structured AI guidelines.",
    "Software developers designing prompt scripts for Next.js, React, or API integration pipelines.",
    "Digital marketers generating high-converting ad copy and social headlines using role play.",
    "UI/UX designers creating detailed visual mockups using Midjourney and DALL-E parameters.",
    "Students and researchers formatting prompts for study guides, complex explanations, or literature analysis."
  ],

  howToSteps: [
    "Paste your rough prompt idea or request into the editor panel.",
    "Select your target AI Model (e.g., Claude or ChatGPT) and active Tone Style (e.g. Technical).",
    "Choose your prompt mode: Beginner (adds basic structure), Advanced (adds context), or Expert (adds reasoning steps).",
    "Click the Optimize Prompt button to run the AI Prompt Enhancer.",
    "Review the Prompt Quality Scorecard and check token weight/cost estimates.",
    "Toggle Comparison Mode to review the original draft side-by-side with the optimized output.",
    "Click the Copy button to copy your prompt, or download it as Markdown or TXT format."
  ],

  examples: [
    {
      title: "Simple Web Design Idea",
      description: "Optimizing a short coding idea into a professional prompt.",
      input: "Write a React component for a landing page.",
      output: "Act as a Senior Frontend Developer specializing in React, Tailwind CSS, and accessible web standards. Write a modern, responsive React landing page component. Requirements: Integrate a hero section with a call-to-action, a features grid, and a contact footer. Code guidelines: Use TypeScript, functional components, hooks, semantic HTML elements, and include ARIA labels. Provide only the complete, clean code block without introductory conversational text."
    },
    {
      title: "SEO Content Prompt Optimization",
      description: "Structuring a marketing request for better writing outputs.",
      input: "Write an article about email marketing.",
      output: "Act as a Digital Marketing Expert and professional SEO Copywriter. Write an in-depth, 1500-word guide on 'Email Marketing Best Practices for SaaS in 2026'. Structure the guide using hierarchical Markdown headers (H2/H3). Focus topics: building high-converting landing opt-ins, avoiding spam filters, and writing subject lines. Tone should be professional, authoritative, yet approachable. Add a concluding checklist of execution steps."
    }
  ],

  faq: [
    {
      question: "What is prompt engineering?",
      answer: "Prompt engineering is the practice of designing, formatting, and refining natural language instructions (prompts) to guide Large Language Models (LLMs) to produce accurate, high-quality, and structured answers."
    },
    {
      question: "What makes a good AI prompt?",
      answer: "A high-quality prompt is specific, structured, and contains clear role definitions, instructions, context, input data, and output format indicators."
    },
    {
      question: "How can I improve ChatGPT prompts?",
      answer: "Improve ChatGPT prompts by assigning a clear persona, breaking down complex instructions using bullet points or headings, and formatting input data inside brackets or markdown fences."
    },
    {
      question: "What is prompt optimization?",
      answer: "Prompt optimization is the process of enriching a simple, vague idea with context, formatting boundaries, constraints, and instructions so that an AI model can execute the task successfully."
    },
    {
      question: "Does prompt quality affect AI results?",
      answer: "Yes, significantly. Vague prompts lead to generic, repetitive, and often incorrect answers, while precise prompts extract focused, highly detailed responses and minimize errors."
    },
    {
      question: "What is the ideal prompt length?",
      answer: "The ideal prompt length depends on the task. A simple task might need 50 words, while complex code refactoring or writing projects can benefit from detailed prompts spanning 300 to 1,000 words."
    },
    {
      question: "Can I use this with Claude?",
      answer: "Yes, this tool includes specific optimization settings tailored for Claude, adding XML tags (like <context>) which Claude uses to structure and parse inputs."
    },
    {
      question: "Can I use this with Gemini?",
      answer: "Yes. The tool formats prompts for Gemini, ensuring that core tasks and instructions are placed correctly at the bottom of the input, which Gemini handles best."
    },
    {
      question: "Is this prompt helper tool free?",
      answer: "Yes, the tool is completely free. It runs in your browser, utilizing a local scoring engine and a free generative API fallback, requiring no payment."
    },
    {
      question: "How accurate is the prompt analysis?",
      answer: "The analysis is highly accurate. It grades your input based on standard prompt engineering principles (role play, instruction metrics, output constraints, and formatting clarity)."
    },
    {
      question: "Does the tool store my prompts?",
      answer: "No. All text processing is performed locally in your web browser. Your prompts are saved inside your device's localStorage for session recovery, and are never uploaded to any analytics servers."
    },
    {
      question: "Can developers use this tool?",
      answer: "Yes. Developers can generate prompts for coding components, debugging, code reviews, writing API routes, and formatting database scripts."
    },
    {
      question: "Can marketers use this tool?",
      answer: "Yes. Marketers can build prompts for email subject lines, blog outlines, social media headlines, copywriting frameworks, and target demographic research."
    },
    {
      question: "How do token estimates work?",
      answer: "Tokens are calculated based on the character count of the text. In English, 1 token is approximately 4 characters. Our estimator maps this ratio to give you a close approximation for major models."
    },
    {
      question: "What is a role-based prompt?",
      answer: "A role-based prompt assigns a persona to the AI (e.g. 'Act as an SEO Specialist') to align the model's tone, vocabulary, and expertise with the target task."
    },
    {
      question: "What is a structured prompt?",
      answer: "A structured prompt is divided into clean, readable sections using tags, headings, or bullet points to isolate instructions, rules, and input data."
    },
    {
      question: "Can I create image-generation prompts?",
      answer: "Yes, the tool features a dedicated Image Prompt panel that helps you construct prompts for Midjourney, DALL-E, and Flux by setting style, camera, and lighting variables."
    },
    {
      question: "Is this tool browser-based?",
      answer: "Yes. All scripts, template styling, exports, and history tracking run locally on your device within your web browser."
    },
    {
      question: "Can I save my prompts?",
      answer: "Yes, your optimized prompts and favorite templates are saved locally in your browser's localStorage, allowing you to access them whenever you open the page."
    },
    {
      question: "How do I write professional prompts?",
      answer: "To write professional prompts, clearly state the AI's role, define the task constraints, provide references or context, and specify how the final output should be formatted."
    },
    {
      question: "What is the token cost calculation?",
      answer: "Token cost is estimated using average API prices per 1 million input tokens for standard models, helping you forecast API expenses for large-scale operations."
    },
    {
      question: "Can I use this for Midjourney?",
      answer: "Yes, the image prompt builder formats prompt tags, aspect ratios, versions, and stylization parameters for Midjourney."
    },
    {
      question: "What is Chain-of-Thought in prompts?",
      answer: "Chain-of-Thought is a prompt technique that instructs the AI to show its step-by-step logic and thinking before printing the final answer, which increases reasoning accuracy."
    },
    {
      question: "How do XML tags help in prompts?",
      answer: "XML tags (like <rules>...</rules>) act as clean visual containers that separate rules, examples, and data, preventing the AI from confusing instructions with inputs."
    },
    {
      question: "Does the optimizer support Spanish?",
      answer: "Yes, the tool is fully Unicode-compliant and can analyze and optimize prompts written in Spanish, French, German, Bengali, Hindi, Arabic, and other languages."
    }
  ],

  relatedTools: [
    { name: "Word Counter & Character Counter", slug: "word-counter" },
    { name: "Case Converter", slug: "case-converter" },
    { name: "Markdown Previewer", slug: "markdown-previewer" },
    { name: "JSON Formatter", slug: "json-formatter" }
  ]
};
