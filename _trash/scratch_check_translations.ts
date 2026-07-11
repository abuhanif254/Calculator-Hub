import { calculators } from './lib/data/calculators';
import fs from 'fs';
import path from 'path';

function countWords(str: string) {
  if (!str) return 0;
  return str.split(/\s+/).filter(word => word.length > 0).length;
}

const locales = ['es', 'fr', 'de'];
const results: Record<string, any> = {};

calculators.forEach(calc => {
  const missingLocales: string[] = [];
  const lowContentLocales: string[] = [];
  
  locales.forEach(locale => {
    // Determine the slug for the locale
    const slug = calc.slugs?.[locale as keyof typeof calc.slugs] || calc.slug;
    const mdPath = path.join(process.cwd(), "content", locale, `${slug}.md`);
    
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, "utf-8");
      const words = countWords(content);
      if (words < 500) {
        lowContentLocales.push(`${locale} (${words}w)`);
      }
    } else {
      missingLocales.push(locale);
    }
  });

  if (missingLocales.length > 0 || lowContentLocales.length > 0) {
    results[calc.slug] = {
      title: calc.title,
      missing: missingLocales,
      lowContent: lowContentLocales,
    };
  }
});

console.log("Calculators needing translation/expansion:");
Object.keys(results).forEach(slug => {
  console.log(`- ${results[slug].title} (${slug}):`);
  if (results[slug].missing.length > 0) console.log(`    Missing: ${results[slug].missing.join(', ')}`);
  if (results[slug].lowContent.length > 0) console.log(`    Low Content: ${results[slug].lowContent.join(', ')}`);
});
