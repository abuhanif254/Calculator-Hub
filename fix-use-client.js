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

const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Check if edge runtime is in the file
  if (content.includes("export const runtime = 'edge';")) {
    // Remove all instances of it to clean up
    content = content.replace(/export const runtime = 'edge';\r?\n?/g, '');
    
    // Now add it back correctly
    if (content.trim().startsWith('"use client"') || content.trim().startsWith("'use client'")) {
      // Find the end of the use client directive
      let lines = content.split('\n');
      let useClientIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"use client"') || lines[i].includes("'use client'")) {
          useClientIndex = i;
          break;
        }
      }
      
      lines.splice(useClientIndex + 1, 0, "export const runtime = 'edge';");
      content = lines.join('\n');
    } else {
      content = "export const runtime = 'edge';\n" + content;
    }
    
    fs.writeFileSync(f, content);
    count++;
  }
});

console.log('Fixed ' + count + ' files with use client ordering');
