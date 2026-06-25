import { resolveHref } from './lib/utils/linkResolver';
import { sitemapCategories, developerToolsMenu, pdfToolsMenu, imageToolsMenu } from './lib/data/sitemapData';

const allLinks = [
  ...sitemapCategories.flatMap(c => c.links),
  ...developerToolsMenu.flatMap(c => c.items.map(i => i.name)),
  ...pdfToolsMenu.flatMap(c => c.items.map(i => i.name)),
  ...imageToolsMenu.flatMap(c => c.items.map(i => i.name)),
];

const missing = [];
for (const link of allLinks) {
  if (resolveHref(link) === '/sitemap') {
    missing.push(link);
  }
}

console.log("Missing Links:", JSON.stringify(missing, null, 2));
