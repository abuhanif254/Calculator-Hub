const fs = require('fs');
const path = require('path');

try {
  const content = fs.readFileSync(path.join(__dirname, 'lib/data/tools/index.ts'), 'utf-8');
  console.log('Has aiImageUpscalerConfig import:', content.includes('aiImageUpscalerConfig'));
  console.log('Has [aiImageUpscalerConfig.slug]:', content.includes('[aiImageUpscalerConfig.slug]: aiImageUpscalerConfig'));
} catch (e) {
  console.error(e);
}
