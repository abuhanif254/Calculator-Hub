const fs = require('fs');
const path = require('path');
const contentDir = path.join('c:', 'nexus', 'Calculator-Hub', 'content', 'en');
const fileContents = fs.readFileSync(path.join('c:', 'nexus', 'Calculator-Hub', 'lib', 'data', 'calculators.ts'), 'utf8');

const regex = /slug:\s*"([^"]+)"/g;
let match;
const calculators = [];
while ((match = regex.exec(fileContents)) !== null) {
  calculators.push(match[1]);
}

const missing = [];
const existingSizes = [];

calculators.forEach(slug => {
    const mdPath = path.join(contentDir, `${slug}.md`);
    if (!fs.existsSync(mdPath)) {
        missing.push(slug);
    } else {
        const size = fs.statSync(mdPath).size;
        existingSizes.push({ slug, size });
    }
});

existingSizes.sort((a, b) => a.size - b.size);

console.log("=== MISSING MARKDOWN FILES (0 Bytes - Lowest Content) ===");
missing.forEach(m => console.log(m));

console.log("\n=== SMALLEST MARKDOWN FILES ===");
existingSizes.slice(0, 10).forEach(e => console.log(`${e.slug} - ${e.size} bytes`));
