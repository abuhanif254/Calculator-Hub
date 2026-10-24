import fs from "fs";
import path from "path";
import { calculators } from "../lib/data/calculators";
import { allToolsConfig } from "../lib/data/tools";
import { comparisons } from "../lib/data/comparisons";
import { collections } from "../lib/data/collections";
import { getCategoryForCalculator } from "../lib/data/categories";
import { getLocalizedCalcMeta, getLocalizedToolMeta } from "../lib/utils/toolLocalization";

interface SearchIndexEntry {
  objectID: string;
  slug: string;
  title: string;
  titles: {
    en: string;
    es: string;
    fr: string;
    de: string;
  };
  description: string;
  type: "calculator" | "developer-tool" | "comparison" | "collection";
  category: string;
  categoryId: string;
  keywords: string[];
  href: string;
}

const entries: SearchIndexEntry[] = [];
const seenIds = new Set<string>();

// 1. All Calculators (346)
for (const calc of calculators) {
  if (seenIds.has(calc.slug)) continue;
  seenIds.add(calc.slug);

  const catDef = getCategoryForCalculator(calc.category);
  const enMeta = getLocalizedCalcMeta(calc.slug, "en", calc.title, calc.description);
  const esMeta = getLocalizedCalcMeta(calc.slug, "es", calc.title, calc.description);
  const frMeta = getLocalizedCalcMeta(calc.slug, "fr", calc.title, calc.description);
  const deMeta = getLocalizedCalcMeta(calc.slug, "de", calc.title, calc.description);

  const kwSet = new Set<string>();
  (calc.meta?.keywords || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .forEach((k) => kwSet.add(k));

  if (esMeta.title !== enMeta.title) kwSet.add(esMeta.title);
  if (frMeta.title !== enMeta.title) kwSet.add(frMeta.title);
  if (deMeta.title !== enMeta.title) kwSet.add(deMeta.title);

  entries.push({
    objectID: calc.slug,
    slug: calc.slug,
    title: enMeta.title,
    titles: {
      en: enMeta.title,
      es: esMeta.title,
      fr: frMeta.title,
      de: deMeta.title,
    },
    description: enMeta.description,
    type: "calculator",
    category: calc.category,
    categoryId: catDef?.id ?? "other",
    keywords: Array.from(kwSet).slice(0, 10),
    href: `/calculators/${calc.slug}`,
  });
}

// 2. All Developer, PDF & Image Tools (135)
for (const tool of Object.values(allToolsConfig)) {
  if (seenIds.has(tool.slug)) continue;
  seenIds.add(tool.slug);

  const enMeta = getLocalizedToolMeta(tool.slug, "en", tool.title, tool.shortDescription);
  const esMeta = getLocalizedToolMeta(tool.slug, "es", tool.title, tool.shortDescription);
  const frMeta = getLocalizedToolMeta(tool.slug, "fr", tool.title, tool.shortDescription);
  const deMeta = getLocalizedToolMeta(tool.slug, "de", tool.title, tool.shortDescription);

  const kwSet = new Set<string>(tool.keywords || []);
  if (esMeta.title !== enMeta.title) kwSet.add(esMeta.title);
  if (frMeta.title !== enMeta.title) kwSet.add(frMeta.title);
  if (deMeta.title !== enMeta.title) kwSet.add(deMeta.title);

  entries.push({
    objectID: tool.slug,
    slug: tool.slug,
    title: enMeta.title,
    titles: {
      en: enMeta.title,
      es: esMeta.title,
      fr: frMeta.title,
      de: deMeta.title,
    },
    description: enMeta.description,
    type: "developer-tool",
    category: tool.category,
    categoryId: "developer-tools",
    keywords: Array.from(kwSet).slice(0, 10),
    href: `/tools/${tool.slug}`,
  });
}

// 3. All Side-by-Side Comparisons (16)
for (const comp of comparisons) {
  const objectID = `compare-${comp.slug}`;
  if (seenIds.has(objectID)) continue;
  seenIds.add(objectID);

  const esTitle = comp.translations?.es?.title || comp.title;
  const frTitle = comp.translations?.fr?.title || comp.title;
  const deTitle = comp.translations?.de?.title || comp.title;

  entries.push({
    objectID,
    slug: comp.slug,
    title: comp.title,
    titles: {
      en: comp.title,
      es: esTitle,
      fr: frTitle,
      de: deTitle,
    },
    description: comp.seoDescription,
    type: "comparison",
    category: "Comparisons",
    categoryId: "comparisons",
    keywords: [comp.title, esTitle, frTitle, deTitle, comp.toolA.replace(/-/g, " "), comp.toolB.replace(/-/g, " ")],
    href: `/compare/${comp.slug}`,
  });
}

// 4. All Workflow Collections (18)
for (const col of collections) {
  const objectID = `collection-${col.slug}`;
  if (seenIds.has(objectID)) continue;
  seenIds.add(objectID);

  const esTitle = col.translations?.es?.title || col.title;
  const frTitle = col.translations?.fr?.title || col.title;
  const deTitle = col.translations?.de?.title || col.title;

  entries.push({
    objectID,
    slug: col.slug,
    title: col.title,
    titles: {
      en: col.title,
      es: esTitle,
      fr: frTitle,
      de: deTitle,
    },
    description: col.description,
    type: "collection",
    category: "Collections",
    categoryId: "collections",
    keywords: [col.title, esTitle, frTitle, deTitle, "toolkit", "collection", "workflow"],
    href: `/collections/${col.slug}`,
  });
}

const outPath = path.join(process.cwd(), "public", "search-index.json");
const payload = {
  updatedAt: new Date().toISOString(),
  totalTools: entries.length,
  tools: entries,
};

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf-8");
console.log(`Generated search-index.json with ${entries.length} total items.`);
