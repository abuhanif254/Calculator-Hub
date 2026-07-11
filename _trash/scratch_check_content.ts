import { calculators } from './lib/data/calculators';
import { allToolsConfig } from './lib/data/tools';
import fs from 'fs';
import path from 'path';

const LOW_CONTENT_THRESHOLD = 500; // Words

function countWords(str: string) {
  if (!str) return 0;
  return str.split(/\s+/).filter(word => word.length > 0).length;
}

const lowContentTools: any[] = [];

console.log("Checking Calculators...");
calculators.forEach(calc => {
  let contentToCount = calc.seoContent || "";
  
  // Check if markdown file exists
  const mdPath = path.join(process.cwd(), "content", "en", `${calc.slug}.md`);
  if (fs.existsSync(mdPath)) {
    contentToCount = fs.readFileSync(mdPath, "utf-8");
  }

  const words = countWords(contentToCount);
  if (words < LOW_CONTENT_THRESHOLD) {
    lowContentTools.push({
      type: 'Calculator',
      title: calc.title,
      slug: calc.slug,
      words: words
    });
  }
});

console.log("Checking Developer Tools...");
Object.values(allToolsConfig).forEach(tool => {
  const words = countWords(tool.longDescription);
  if (words < LOW_CONTENT_THRESHOLD) {
    lowContentTools.push({
      type: 'Developer Tool',
      title: tool.title,
      slug: tool.slug,
      words: words,
      file: `lib/data/tools/${tool.slug}.ts`
    });
  }
});

lowContentTools.sort((a, b) => a.words - b.words);

console.log(`\nFound ${lowContentTools.length} pages with low content (<${LOW_CONTENT_THRESHOLD} words):\n`);
lowContentTools.forEach(item => {
  console.log(`- [${item.type}] ${item.title}: ${item.words} words`);
});

fs.writeFileSync('low_content_list.json', JSON.stringify(lowContentTools, null, 2));
