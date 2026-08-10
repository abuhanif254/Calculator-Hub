const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.endsWith('route.ts') || f.replace(/\\/g, '/').endsWith('app/layout.tsx'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes("export const runtime = 'edge'")) {
    fs.writeFileSync(f, "export const runtime = 'edge';\n" + content);
    count++;
  }
});

console.log('Updated ' + count + ' files');
