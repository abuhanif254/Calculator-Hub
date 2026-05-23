import slugify from 'slugify';

export interface SlugOptions {
  separator: string;
  lowercase: boolean;
  uppercase: boolean;
  removeSpecialChars: boolean;
  removeNumbers: boolean;
  removeEmojis: boolean;
  trim: boolean;
  collapseSeparators: boolean;
}

export const defaultSlugOptions: SlugOptions = {
  separator: '-',
  lowercase: true,
  uppercase: false,
  removeSpecialChars: true,
  removeNumbers: false,
  removeEmojis: true,
  trim: true,
  collapseSeparators: true
};

const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu;

export function generateSlug(input: string, options: SlugOptions): string {
  if (!input) return "";

  let processed = input;

  if (options.removeEmojis) {
    processed = processed.replace(EMOJI_REGEX, '');
  }

  if (options.removeNumbers) {
    processed = processed.replace(/[0-9]/g, '');
  }

  // Define regex to strip out based on special chars requirement. 
  // slugify handles a lot of this, but we can be explicit.
  const removeRegex = options.removeSpecialChars ? /[*+~.()'"!:@^[\\]{}`]/g : undefined;

  let result = slugify(processed, {
    replacement: options.separator,
    remove: removeRegex,
    lower: options.lowercase,
    strict: options.removeSpecialChars, // strip special characters entirely
    trim: options.trim,
  });

  if (options.uppercase && !options.lowercase) {
    result = result.toUpperCase();
  }

  if (options.collapseSeparators && options.separator) {
    // Regex to match 2 or more of the separator (escaped to avoid issues if separator is something like '.')
    const escapeRegex = (s: string) => s.replace(/[-/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&');
    const separatorRegex = new RegExp(`(${escapeRegex(options.separator)}){2,}`, 'g');
    result = result.replace(separatorRegex, options.separator);
  }

  return result;
}

export function generateBulkSlugs(input: string, options: SlugOptions): string[] {
  if (!input.trim()) return [];
  // Split by newline, filter empty
  const lines = input.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
  return lines.map(line => generateSlug(line, options));
}

export function calculateSeoScore(slug: string): { score: number, length: number, words: number, status: 'good' | 'warning' | 'poor', message: string } {
  if (!slug) return { score: 0, length: 0, words: 0, status: 'poor', message: 'No slug generated.' };

  const length = slug.length;
  // If separated by typical separators
  const words = slug.split(/[-_.]/).filter(Boolean).length;
  
  let score = 100;
  let status: 'good' | 'warning' | 'poor' = 'good';
  let message = 'Perfect URL length and structure.';

  if (length > 75) {
    score -= 40;
    status = 'warning';
    message = 'Slug is quite long. Consider shortening to 3-5 keywords.';
  } else if (length > 50) {
    score -= 15;
    status = 'warning';
    message = 'Slightly long, but acceptable.';
  }

  if (words > 6) {
    score -= 20;
    status = 'warning';
    message = 'Too many words. Shorten for better readability.';
  }

  if (words < 2) {
    score -= 10;
  }

  // Check for numbers
  if (/[0-9]/.test(slug)) {
    score -= 5; // not terrible, but generic words are better
  }

  if (score < 50) status = 'poor';

  return { score: Math.max(0, score), length, words, status, message };
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

export const generateCmsSnippets = () => {
  return {
    nextjs: {
      label: "Next.js App Router",
      language: "javascript",
      code: `// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  // Fetch from DB using the slug
  const post = await getPostBySlug(slug);
  
  return <h1>{post.title}</h1>;
}`
    },
    wordpress: {
      label: "WordPress (PHP)",
      language: "php",
      code: `// Ensure a string is a safe slug in WordPress
$safe_slug = sanitize_title('My Awesome Post 2026!');
// Output: my-awesome-post-2026`
    },
    node: {
      label: "Node.js (Slugify)",
      language: "javascript",
      code: `// npm install slugify
const slugify = require('slugify');

const slug = slugify('Hello World!', {
  lower: true,
  strict: true,
  replacement: '-'
});`
    },
    python: {
      label: "Python (Django)",
      language: "python",
      code: `from django.utils.text import slugify

# Django's built-in slugify method
safe_slug = slugify("Hello World!")
# Output: hello-world`
    }
  };
};
