export type ContentType = 'classic' | 'developer' | 'startup' | 'marketing' | 'tech' | 'design' | 'ai';
export type GenerateUnit = 'words' | 'sentences' | 'paragraphs' | 'characters';
export type OutputFormat = 'plain' | 'html' | 'markdown';
export type MockupMode = 'none' | 'blog' | 'landing' | 'product' | 'faq';

export interface LoremOptions {
  type: ContentType;
  amount: number;
  unit: GenerateUnit;
  startWithLorem: boolean;
  format: OutputFormat;
  mockupMode: MockupMode;
  includeLineBreaks: boolean;
}

export const defaultLoremOptions: LoremOptions = {
  type: 'classic',
  amount: 3,
  unit: 'paragraphs',
  startWithLorem: true,
  format: 'plain',
  mockupMode: 'none',
  includeLineBreaks: true,
};

const dictionaries: Record<ContentType, string[]> = {
  classic: [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
    "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
    "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi",
    "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
    "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt",
    "mollit", "anim", "id", "est", "laborum"
  ],
  developer: [
    "refactor", "async", "await", "function", "promise", "callback", "kubernetes", "docker", "pipeline",
    "deploy", "repository", "commit", "merge", "conflict", "branch", "component", "state", "props",
    "hook", "context", "reducer", "interface", "type", "class", "object", "array", "string", "boolean",
    "undefined", "null", "NaN", "endpoint", "API", "REST", "GraphQL", "mutation", "query", "server",
    "client", "database", "cache", "latency", "throughput", "bandwidth", "node", "npm", "yarn", "webpack"
  ],
  startup: [
    "disrupt", "synergy", "pivot", "agile", "lean", "mvp", "traction", "scale", "unicorn", "roi",
    "b2b", "b2c", "saas", "platform", "ecosystem", "freemium", "monetize", "burn", "runway", "seed",
    "series", "venture", "capital", "incubator", "accelerator", "pitch", "deck", "equity", "valuation",
    "exit", "ipo", "acquisition", "merger", "innovate", "iterate", "growth", "hack", "viral", "engagement"
  ],
  marketing: [
    "funnel", "conversion", "lead", "generation", "campaign", "metrics", "analytics", "seo", "sem",
    "ctr", "cpc", "cpa", "roi", "organic", "paid", "social", "content", "strategy", "audience", "target",
    "demographic", "segmentation", "persona", "brand", "awareness", "loyalty", "retention", "churn",
    "influencer", "affiliate", "email", "newsletter", "automation", "drip", "nurture", "inbound", "outbound"
  ],
  tech: [
    "cloud", "edge", "quantum", "blockchain", "crypto", "web3", "metaverse", "ar", "vr", "xr", "iot",
    "5g", "fiber", "silicon", "semiconductor", "chip", "processor", "gpu", "tpu", "neural", "network",
    "algorithm", "data", "lake", "warehouse", "analytics", "insight", "predictive", "model", "train",
    "inference", "deploy", "scale", "infrastructure", "architecture", "microservices", "serverless", "lambda"
  ],
  design: [
    "pixel", "vector", "raster", "typography", "kerning", "leading", "tracking", "hierarchy", "contrast",
    "balance", "alignment", "proximity", "repetition", "whitespace", "negative", "space", "grid", "layout",
    "wireframe", "mockup", "prototype", "fidelity", "usability", "accessibility", "affordance", "signifier",
    "heuristic", "evaluation", "user", "journey", "persona", "scenario", "flow", "interaction", "animation"
  ],
  ai: [
    "intelligence", "artificial", "machine", "learning", "deep", "neural", "network", "transformer",
    "attention", "mechanism", "parameter", "weight", "bias", "activation", "function", "gradient", "descent",
    "optimizer", "loss", "epoch", "batch", "tensor", "gpu", "tpu", "dataset", "train", "validate", "test",
    "evaluate", "metric", "accuracy", "precision", "recall", "f1", "score", "generative", "adversarial", "nlp"
  ]
};

const getRandomWord = (dict: string[]) => dict[Math.floor(Math.random() * dict.length)];

const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

function generateSentence(dict: string[], minWords = 5, maxWords = 15): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  let sentence = "";
  for (let i = 0; i < wordCount; i++) {
    sentence += getRandomWord(dict);
    if (i < wordCount - 1) {
      // Add a comma randomly
      if (Math.random() < 0.1 && i > 1 && i < wordCount - 2) {
        sentence += ", ";
      } else {
        sentence += " ";
      }
    }
  }
  return capitalizeFirstLetter(sentence) + ".";
}

function generateParagraph(dict: string[], minSentences = 3, maxSentences = 7, startWithLorem = false): string {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  let paragraph = "";
  
  if (startWithLorem && dict === dictionaries.classic) {
    paragraph += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  }

  for (let i = paragraph.length > 0 ? 1 : 0; i < sentenceCount; i++) {
    paragraph += generateSentence(dict) + (i < sentenceCount - 1 ? " " : "");
  }
  return paragraph;
}

function formatOutput(content: string[], format: OutputFormat, tag: string = 'p'): string {
  if (format === 'plain') {
    return content.join("\n\n");
  }
  if (format === 'html') {
    return content.map(p => `<${tag}>${p}</${tag}>`).join("\n");
  }
  if (format === 'markdown') {
    return content.join("\n\n");
  }
  return content.join("\n\n");
}

export function generateText(options: LoremOptions): string {
  const dict = dictionaries[options.type] || dictionaries.classic;
  
  // Handling standard generation
  if (options.mockupMode === 'none') {
    let result: string[] = [];
    
    if (options.unit === 'paragraphs') {
      for (let i = 0; i < options.amount; i++) {
        result.push(generateParagraph(dict, 3, 7, options.startWithLorem && i === 0));
      }
      return formatOutput(result, options.format);
    } 
    else if (options.unit === 'sentences') {
      let sentenceBuffer = "";
      if (options.startWithLorem && dict === dictionaries.classic) {
        sentenceBuffer = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      }
      for (let i = sentenceBuffer.length > 0 ? 1 : 0; i < options.amount; i++) {
        sentenceBuffer += generateSentence(dict) + (i < options.amount - 1 ? " " : "");
      }
      return formatOutput([sentenceBuffer], options.format);
    }
    else if (options.unit === 'words') {
      let wordBuffer: string[] = [];
      if (options.startWithLorem && dict === dictionaries.classic) {
        wordBuffer = ["Lorem", "ipsum", "dolor", "sit", "amet,"];
      }
      while (wordBuffer.length < options.amount) {
        wordBuffer.push(getRandomWord(dict));
      }
      // Trim if over
      wordBuffer = wordBuffer.slice(0, options.amount);
      const text = capitalizeFirstLetter(wordBuffer.join(" ")) + ".";
      return formatOutput([text], options.format);
    }
    else if (options.unit === 'characters') {
      let charBuffer = "";
      if (options.startWithLorem && dict === dictionaries.classic) {
        charBuffer = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
      }
      while (charBuffer.length < options.amount) {
        charBuffer += generateSentence(dict) + " ";
      }
      return formatOutput([charBuffer.slice(0, options.amount).trim() + (charBuffer[options.amount-1] !== '.' ? '.' : '')], options.format);
    }
  }
  
  // Handling Structured SEO Mockup Modes
  return generateStructuredMockup(dict, options.mockupMode, options.format);
}

function generateStructuredMockup(dict: string[], mode: MockupMode, format: OutputFormat): string {
  const isHtml = format === 'html';
  const isMd = format === 'markdown';
  
  const h1 = (text: string) => isHtml ? `<h1>${text}</h1>` : isMd ? `# ${text}` : text;
  const h2 = (text: string) => isHtml ? `<h2>${text}</h2>` : isMd ? `## ${text}` : text;
  const h3 = (text: string) => isHtml ? `<h3>${text}</h3>` : isMd ? `### ${text}` : text;
  const p = (text: string) => isHtml ? `<p>${text}</p>` : text;
  const li = (text: string) => isHtml ? `<li>${text}</li>` : isMd ? `- ${text}` : `• ${text}`;
  const ul = (items: string[]) => isHtml ? `<ul>\n${items.map(i => `  ${li(i)}`).join("\n")}\n</ul>` : items.map(i => li(i)).join("\n");
  const blockquote = (text: string) => isHtml ? `<blockquote>${text}</blockquote>` : isMd ? `> ${text}` : `"${text}"`;
  
  let parts: string[] = [];

  if (mode === 'blog') {
    parts.push(h1(capitalizeFirstLetter(generateSentence(dict, 3, 6).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 2, 4, true)));
    parts.push(h2(capitalizeFirstLetter(generateSentence(dict, 2, 4).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 3, 5)));
    parts.push(ul([generateSentence(dict, 4, 8), generateSentence(dict, 4, 8), generateSentence(dict, 4, 8)]));
    parts.push(h3(capitalizeFirstLetter(generateSentence(dict, 2, 3).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 2, 4)));
    parts.push(blockquote(generateSentence(dict, 8, 15)));
    parts.push(p(generateParagraph(dict, 3, 5)));
  } 
  else if (mode === 'landing') {
    parts.push(h1(capitalizeFirstLetter(generateSentence(dict, 4, 8).replace('.', ''))));
    parts.push(p(generateSentence(dict, 8, 15)));
    parts.push(h2(capitalizeFirstLetter(generateSentence(dict, 3, 5).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 2, 3)));
    parts.push(ul([generateSentence(dict, 2, 4), generateSentence(dict, 2, 4), generateSentence(dict, 2, 4)]));
    parts.push(h2(capitalizeFirstLetter(generateSentence(dict, 2, 4).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 4, 6)));
  }
  else if (mode === 'product') {
    parts.push(h1(capitalizeFirstLetter(generateSentence(dict, 2, 4).replace('.', ''))));
    parts.push(p(generateParagraph(dict, 2, 3)));
    parts.push(h3("Features"));
    parts.push(ul([generateSentence(dict, 3, 5), generateSentence(dict, 3, 5), generateSentence(dict, 3, 5), generateSentence(dict, 3, 5)]));
    parts.push(h3("Specifications"));
    parts.push(p(generateParagraph(dict, 1, 2)));
  }
  else if (mode === 'faq') {
    parts.push(h2("Frequently Asked Questions"));
    for (let i = 0; i < 4; i++) {
      parts.push(h3(capitalizeFirstLetter(generateSentence(dict, 4, 8).replace('.', '?'))));
      parts.push(p(generateParagraph(dict, 2, 4)));
    }
  }

  return parts.join(isHtml ? "\n" : "\n\n");
}

export function calculateTextStats(text: string) {
  if (!text) return { words: 0, characters: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
  
  // strip html tags for counting
  const plainText = text.replace(/<[^>]*>?/gm, '');
  
  const words = plainText.split(/\s+/).filter(Boolean).length;
  const characters = plainText.length;
  const sentences = plainText.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\n|<p>/).filter(Boolean).length;
  
  // Average reading speed 200 words per minute
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return { words, characters, sentences, paragraphs, readingTime };
}

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
