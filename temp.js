const fs = require('fs');

const extractSlugs = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  // We want to avoid matching the localized slugs inside the 'slugs' object if they have 'slug' in them,
  // but looking closely, the localized slugs are like `en: '...'`.
  // Wait, `slug: '...'` only matches the main slug.
  return matches.map(m => m[1]);
};

const extractRelated = (filePath) => {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = [...content.matchAll(/relatedCalculator:\s*['"]([^'"]+)['"]/g)];
  return matches.map(m => m[1]);
};

const calcSlugs = extractSlugs('lib/data/calculators.ts');
const toolSlugs = extractSlugs('lib/data/tools.ts');
const allTools = [...new Set([...calcSlugs, ...toolSlugs])];

const existingGuides = extractRelated('lib/data/guides.ts');

const missing = allTools.filter(slug => !existingGuides.includes(slug));

console.log('Total Unique Slugs in calculators/tools.ts: ' + allTools.length);
console.log('Total Guides related items: ' + existingGuides.length);
console.log('Missing Guides: ' + missing.length);

console.log('\nTop 30 Missing:');
fs.writeFileSync('missing.txt', missing.join('\n'))
