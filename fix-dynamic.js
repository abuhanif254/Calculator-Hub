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

const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.includes('[') && f.endsWith('page.tsx'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('generateStaticParams') && !content.includes("export const runtime = 'edge'")) {
    console.log(f);
    fs.writeFileSync(f, "export const runtime = 'edge';\n" + content);
    count++;
  }
});
console.log('Updated ' + count + ' dynamic files');
