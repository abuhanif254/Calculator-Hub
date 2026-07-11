require('ts-node').register({ transpileOnly: true });
const { allToolsConfig } = require('./lib/data/tools');
console.log(Object.keys(allToolsConfig).filter(k => k.includes('image-upscaler') || k.includes('blur-faces')));
