export interface PromptScores {
  clarity: number;
  detail: number;
  context: number;
  instruction: number;
  structure: number;
  overall: number;
}

export interface PromptStats {
  characters: number;
  words: number;
  tokens: { gpt: number; claude: number; gemini: number };
  estimatedCost: number;
}

export interface PromptTemplate {
  title: string;
  description: string;
  category: "writing" | "development" | "business" | "creative" | "education" | "image";
  prompt: string;
}

// ----------------------------------------------------
// Prompt Template Database
// ----------------------------------------------------
export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    title: "React Component Coding",
    description: "Generates reusable, accessible React components with Tailwind CSS.",
    category: "development",
    prompt: `Act as a Senior React Developer and UI/UX Specialist.
Task: Write a responsive React component for a [Describe component, e.g. Navigation Header].
Requirements:
1. Use TypeScript with explicit interface declarations for props.
2. Structure the styling using Tailwind CSS, ensuring smooth interactive hover states.
3. Align with accessibility guidelines, including ARIA attributes and screen-reader support.
4. Output should contain ONLY the complete code block in markdown fences, with no conversation.`
  },
  {
    title: "Next.js 15 API Route",
    description: "Creates clean Next.js server route handlers with Zod validation.",
    category: "development",
    prompt: `Act as a Backend Architect specializing in Next.js 15 and Node.js.
Task: Design a Next.js App Router API Route handler for [Route task, e.g., handling payment webhooks].
Requirements:
1. Implement TypeScript, standard REST request parsing, and error-handling try-catch blocks.
2. Integrate strict schema validation using Zod.
3. Return precise JSON responses alongside appropriate HTTP status codes.
4. Keep the code clean, modular, and optimized.`
  },
  {
    title: "AP Style SEO Article",
    description: "Formats highly structured marketing and SEO articles.",
    category: "writing",
    prompt: `Act as an expert Copywriter and SEO Specialist.
Task: Write an engaging article about [Describe topic].
Guidelines:
1. Target length is [e.g., 1500 words] with a professional, informative, yet approachable tone.
2. Structure the content cleanly using Markdown headers (H2, H3) and bullet lists.
3. Optimize keyword density naturally for the primary keyword: [Insert Keyword] (aim for 1.5%).
4. Include an introductory hook and a summary conclusion with action items.`
  },
  {
    title: "Cold Email Outreach",
    description: "Creates high-conversion business outreach emails.",
    category: "business",
    prompt: `Act as an expert Business Development Manager.
Task: Write a cold outreach email pitching [Product/Service] to a [Target Role, e.g., CTO].
Guidelines:
1. Keep the subject line under 45 characters, using Title Case.
2. Limit body length to 100-150 words. Focus on the prospect's pain point and state a clear value proposition.
3. End with a simple, low-friction Call to Action (CTA) like a quick chat.
4. Keep the tone friendly, professional, and personalized.`
  },
  {
    title: "Midjourney Cinematic Image",
    description: "Builds scenic photorealistic Midjourney tags.",
    category: "image",
    prompt: `[Describe Subject, e.g., A futuristic cyberpunk street at night], cinematic lighting, shot on 35mm lens, photorealistic, Unreal Engine 5 render, volumetric smoke, neon reflections, detailed texture, style depth --ar 16:9 --stylize 250 --v 6.0`
  },
  {
    title: "Product Description copy",
    description: "Structures high-converting e-commerce listings.",
    category: "business",
    prompt: `Act as an e-commerce Copywriting Specialist.
Task: Write a product description for [Product Name].
Structure:
1. Catchy headline hook.
2. Bulleted benefits explaining the unique selling proposition.
3. Technical specifications list.
4. Target buyer profile overview.
5. Final Call-to-Action.`
  },
  {
    title: "Feynman Study Guide",
    description: "Explains complex academic theories simply.",
    category: "education",
    prompt: `Act as an expert Academic Instructor.
Task: Explain the concept of [Theory Name, e.g., Quantum Entanglement] using the Feynman Technique.
Steps:
1. Explain it to an 11-year-old child using simple language, analogies, and zero technical jargon.
2. Identify gaps in the explanation and clarify the underlying core rules.
3. Conclude with a clear, concise summary table mapping terms to everyday examples.`
  }
];

// ----------------------------------------------------
// Role-based presets
// ----------------------------------------------------
export const ROLE_PRESETS = [
  { name: "Software Engineer", role: "Act as an experienced Staff Software Engineer specializing in scalable architectures, algorithms, and clean code guidelines." },
  { name: "Senior React Developer", role: "Act as a Senior React Developer and Frontend Architect expert in React hooks, state management, and semantic JSX markup." },
  { name: "SEO Specialist", role: "Act as an SEO Consultant and Digital Marketer expert in keyword density, SERP layout optimization, and topical authority." },
  { name: "Copywriter", role: "Act as a professional Marketing Copywriter skilled in writing engaging, high-conversion subject lines, headlines, and call-to-actions." },
  { name: "Academic Teacher", role: "Act as an educational educator and academic tutor focused on clarifying complex topics using analogies, simple breakdowns, and test guides." },
  { name: "Business Consultant", role: "Act as a McKinsey Strategy Consultant specializing in SWOT analysis, e-commerce growth strategies, and market distributions." }
];

// ----------------------------------------------------
// Token & Cost Estimates
// ----------------------------------------------------
export function getPromptStats(text: string, activeModel: string): PromptStats {
  if (!text) {
    return { characters: 0, words: 0, tokens: { gpt: 0, claude: 0, gemini: 0 }, estimatedCost: 0 };
  }

  const characters = text.length;
  const words = (text.match(/[\p{L}\p{N}]+/gu) || []).length;

  // Heuristics: English maps to ~4 chars per token, Claude/Gemini slightly different
  const gpt = Math.max(1, Math.round(characters / 4.0));
  const claude = Math.max(1, Math.round(characters / 3.8));
  const gemini = Math.max(1, Math.round(characters / 3.8));

  // Pricing per 1M inputs:
  // ChatGPT-4o: $2.50 ($0.0000025 per token)
  // Claude Sonnet: $3.00 ($0.000003 per token)
  // Gemini Pro: $1.25 ($0.00000125 per token)
  // DeepSeek-V3: $0.14 ($0.00000014 per token)
  let rate = 0.0000025;
  if (activeModel.includes("Claude")) rate = 0.000003;
  else if (activeModel.includes("Gemini")) rate = 0.00000125;
  else if (activeModel.includes("DeepSeek")) rate = 0.00000014;

  const estimatedCost = parseFloat((gpt * rate).toFixed(6));

  return {
    characters,
    words,
    tokens: { gpt, claude, gemini },
    estimatedCost
  };
}

// ----------------------------------------------------
// Local Prompt Scoring Engine
// ----------------------------------------------------
export function analyzePromptQuality(text: string): PromptScores {
  if (!text.trim()) {
    return { clarity: 0, detail: 0, context: 0, instruction: 0, structure: 0, overall: 0 };
  }

  const lower = text.toLowerCase();
  const wordsCount = (text.match(/[\p{L}\p{N}]+/gu) || []).length;

  // 1. Clarity Check
  let clarity = 40;
  if (wordsCount > 10) clarity += 20;
  if (wordsCount > 30) clarity += 20;
  if (lower.includes("clear") || lower.includes("specific") || lower.includes("explicit")) clarity += 20;
  clarity = Math.min(100, clarity);

  // 2. Detail Check (Length & vocabulary scale)
  let detail = 20;
  if (wordsCount > 25) detail += 20;
  if (wordsCount > 75) detail += 30;
  if (wordsCount > 150) detail += 30;
  detail = Math.min(100, detail);

  // 3. Context check
  let context = 30;
  const contextTriggers = ["context", "background", "guideline", "requirement", "specification", "avoid", "must", "scenario", "target"];
  contextTriggers.forEach(t => {
    if (lower.includes(t)) context += 10;
  });
  context = Math.min(100, context);

  // 4. Instruction check (Action verbs / system rules)
  let instruction = 30;
  const actionVerbs = ["write", "create", "build", "analyze", "explain", "review", "refactor", "generate", "code", "design", "act as", "role"];
  actionVerbs.forEach(v => {
    if (lower.includes(v)) instruction += 10;
  });
  instruction = Math.min(100, instruction);

  // 5. Structure Check (XML tags, headers, json schemas, formatting directives)
  let structure = 20;
  if (lower.includes("format") || lower.includes("output") || lower.includes("structure")) structure += 20;
  if (lower.includes("markdown") || lower.includes("headers") || lower.includes("json") || lower.includes("table")) structure += 30;
  if (/<[a-z0-9_-]+>/i.test(text)) structure += 30; // xml tag detection
  structure = Math.min(100, structure);

  const overall = Math.round((clarity + detail + context + instruction + structure) / 5);

  return { clarity, detail, context, instruction, structure, overall };
}

// ----------------------------------------------------
// Local Prompt Optimizer Fallback
// ----------------------------------------------------
export function optimizePromptLocal(text: string, activeModel: string, toneStyle: string, mode: 'beginner' | 'advanced' | 'expert'): string {
  if (!text.trim()) return "";

  // Topic analysis to determine suitable role play
  let inferredRole = "Expert AI Assistant";
  const lower = text.toLowerCase();

  if (lower.includes("react") || lower.includes("nextjs") || lower.includes("js") || lower.includes("javascript") || lower.includes("typescript")) {
    inferredRole = "Senior Frontend Architect and TypeScript Developer";
  } else if (lower.includes("python") || lower.includes("django") || lower.includes("flask") || lower.includes("database") || lower.includes("api") || lower.includes("sql")) {
    inferredRole = "Senior Backend Software Engineer";
  } else if (lower.includes("seo") || lower.includes("keyword") || lower.includes("article") || lower.includes("blog")) {
    inferredRole = "SEO Consultant and Content Strategist";
  } else if (lower.includes("marketing") || lower.includes("sale") || lower.includes("product description") || lower.includes("email")) {
    inferredRole = "E-commerce Copywriter and Marketing Specialist";
  } else if (lower.includes("explain") || lower.includes("study") || lower.includes("what is") || lower.includes("learn")) {
    inferredRole = "Expert Academic Educator";
  }

  // Model-specific structure guidelines
  let structuralNotes = "";
  if (activeModel.includes("Claude")) {
    structuralNotes = `
<rules>
- Present the final answer inside clean visual blocks.
- Wrap primary outputs inside a tags context if applicable.
</rules>`;
  } else if (activeModel.includes("Gemini")) {
    structuralNotes = `
- Ensure complex requirements are detailed in step sequence.
- Provide a summary table mapping outcomes at the end.`;
  } else {
    structuralNotes = `
- Use hierarchical Markdown headings to break up sections.
- Keep responses focused, avoiding verbose introductory fluff.`;
  }

  // Reason instructions (CoT) based on engineering modes
  let engineeringDirectives = "";
  if (mode === "advanced") {
    engineeringDirectives = `
## Formatting Context
- Maintain a **${toneStyle}** tone throughout the answer.
- Focus on practical, real-world execution.`;
  } else if (mode === "expert") {
    engineeringDirectives = `
## Reasoning Framework
- Think step-by-step prior to writing the final output.
- Discuss alternative approaches and justify the final selection.
- List any boundary constraints or warnings.
- Maintain a strictly **${toneStyle}** tone.`;
  }

  // Assemble structural template (enriches the prompt significantly)
  const optimized = `Act as an expert **${inferredRole}**.

## Core Objective
${text.trim()}
${structuralNotes}
${engineeringDirectives}

## Negative Constraints
- DO NOT provide generic, surface-level explanations.
- DO NOT hallucinate facts; state assumptions clearly.`;

  return optimized;
}

// ----------------------------------------------------
// Gemini API optimizer call
// ----------------------------------------------------
export async function optimizePromptGemini(
  promptText: string,
  modelType: string,
  style: string,
  mode: string,
  apiKey: string
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const instruction = `Act as a professional prompt engineer and AI optimizer.
Task: Redraft, optimize, and expand the raw input prompt to yield the highest quality, most accurate, and structured output when executing on the target model: ${modelType}.
Rules:
1. Retain the user's original goal, but add role-play parameters, clear boundaries, negative constraints, and output format requirements.
2. Apply Style guidelines: Tone must be ${style}. Formatting mode: ${mode}.
3. If the raw input is a developer request, expand into developer guidelines (e.g. interfaces, typescript, error bounds). If writing, add SEO outlines.
4. Output ONLY the complete, optimized prompt. No chat, no introductory conversational explanation. Just write the prompt.

Raw Input Prompt:
"""
${promptText}
"""`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: instruction }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!result) {
    throw new Error("Invalid API response format");
  }
  
  return result.trim();
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateJSONReport(original: string, optimized: string, model: string): string {
  const report = {
    generatedAt: new Date().toISOString(),
    model: model,
    stats: {
      original: getPromptStats(original, model),
      optimized: getPromptStats(optimized, model)
    },
    qualityScores: {
      original: analyzePromptQuality(original),
      optimized: analyzePromptQuality(optimized)
    },
    prompts: {
      originalText: original,
      optimizedText: optimized
    }
  };
  return JSON.stringify(report, null, 2);
}
