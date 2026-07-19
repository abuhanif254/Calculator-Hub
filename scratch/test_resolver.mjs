import { resolveHref } from '../lib/utils/linkResolver.js';

console.log("Resolving 'Tip Calculator':", resolveHref("Tip Calculator"));
console.log("Resolving 'tip-calculator':", resolveHref("tip-calculator"));
