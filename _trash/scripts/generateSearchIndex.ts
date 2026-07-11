import fs from 'fs';
import path from 'path';

// Note: since this runs at build time, we dynamically import the registry
// or we use tsx to run this script before next build.
import { allTools } from '../lib/registry';

/**
 * ═══════════════════════════════════════════════════════
 * SEARCH INDEX GENERATOR
 * ═══════════════════════════════════════════════════════
 * Generates a static JSON search index from the unified tool registry.
 * This file is saved to public/search-index.json.
 *
 * Benefits:
 * 1. Can be fetched asynchronously by the client to power client-side search
 *    without bundling all metadata into the initial JS.
 * 2. Can be ingested by external search providers like Algolia or Meilisearch.
 * 3. Cacheable at the Edge/CDN level for zero-latency retrieval.
 * ═══════════════════════════════════════════════════════
 */

async function generate() {
  console.log('Generating search index...');
  
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const outputPath = path.join(publicDir, 'search-index.json');
  
  const searchData = {
    updatedAt: new Date().toISOString(),
    totalTools: allTools.length,
    tools: allTools.map((t) => ({
      objectID: t.slug,
      slug: t.slug,
      title: t.title,
      description: t.description,
      type: t.type,
      category: t.category,
      categoryId: t.categoryId,
      keywords: t.keywords.split(',').map(k => k.trim()),
      href: t.href,
    }))
  };

  fs.writeFileSync(outputPath, JSON.stringify(searchData));
  
  console.log(`✅ Search index generated at public/search-index.json (${allTools.length} tools)`);
}

generate().catch(console.error);
