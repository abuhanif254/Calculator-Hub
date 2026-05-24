export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  description: string;
  input: string;
  output: string;
}

export interface ToolConfig {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string; // The SEO Explanation Article
  category: string;
  keywords: string[];
  faq: ToolFAQ[];
  relatedTools: { name: string; slug: string }[];
  features: string[];
  useCases: string[];
  howToSteps: string[];
  examples: ToolExample[];
  lastUpdated?: string;
}
