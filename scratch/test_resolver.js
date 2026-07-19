const { resolveHref } = require('../lib/utils/linkResolver');
const { getToolBySlug } = require('../lib/registry');

console.log("Resolving 'Tip Calculator':", resolveHref("Tip Calculator"));
