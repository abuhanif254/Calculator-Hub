export interface CalculatorField {
  id: string;
  label: string;
  type: "number" | "select" | "currency" | "percent" | "years";
  defaultValue: string | number;
  options?: { label: string; value: string }[]; // For select types
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export interface CalculatorDef {
  slug: string;
  slugs?: Record<string, string>;
  title: string;
  category: string;
  description: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  fields: CalculatorField[];
  logicModule: string; // to dynamically import the logic
  seoContent?: string; // Markdown or HTML for the bottom section
}
