import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCalculatorBySlug } from "@/lib/data/calculators";
import { getToolConfig } from "@/lib/data/tools";

const toolMetaCache = new Map<string, { title: string; description: string }>();
const calcMetaCache = new Map<string, { title: string; description: string }>();

function extractMarkdownTitleAndDesc(filePath: string): { title?: string; description?: string } {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(raw);
    const data = parsed.data || {};
    let title: string | undefined = data.title;
    let description: string | undefined = data.shortDescription || data.description || data.metaDescription;

    if (!title) {
      const leadingH1 = parsed.content.match(/^\s*#\s+([^\r\n]+)/);
      if (leadingH1) {
        title = leadingH1[1].replace(/\*\*/g, "").split(/\s*[:|–—]\s*/)[0].trim();
      } else if (typeof data.metaTitle === "string") {
        title = data.metaTitle.split(/\s*[|–—-]\s*/)[0].trim();
      }
    }

    if (!description) {
      const contentWithoutH1 = parsed.content.replace(/^\s*#\s+[^\r\n]+\r?\n*/, "");
      const firstPara = contentWithoutH1
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .find((p) => p.length > 30 && !p.startsWith("#") && !p.startsWith("*") && !p.startsWith("-") && !p.startsWith("|"));
      if (firstPara) {
        description = firstPara
          .replace(/\*\*([^*]+)\*\*/g, "$1")
          .replace(/\*([^*]+)\*/g, "$1")
          .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
          .slice(0, 220)
          .trim();
      }
    }

    return { title: title?.trim(), description: description?.trim() };
  } catch {
    return {};
  }
}

export function getLocalizedToolMeta(
  slug: string,
  locale: string,
  fallbackTitle?: string,
  fallbackDescription?: string
): { title: string; description: string } {
  const cacheKey = `${locale}:${slug}`;
  if (toolMetaCache.has(cacheKey)) {
    return toolMetaCache.get(cacheKey)!;
  }

  const config = getToolConfig(slug);
  let title = fallbackTitle || config?.title || slug;
  let description = fallbackDescription || config?.shortDescription || "";

  const localizedPath = path.join(process.cwd(), "content", "tools", locale, `${slug}.md`);
  if (fs.existsSync(localizedPath)) {
    const md = extractMarkdownTitleAndDesc(localizedPath);
    if (md.title) title = md.title;
    if (md.description) description = md.description;
  } else if (locale !== "en") {
    const enPath = path.join(process.cwd(), "content", "tools", "en", `${slug}.md`);
    if (fs.existsSync(enPath)) {
      const md = extractMarkdownTitleAndDesc(enPath);
      if (!fallbackTitle && md.title) title = md.title;
      if (!fallbackDescription && md.description) description = md.description;
    }
  }

  const result = { title, description };
  toolMetaCache.set(cacheKey, result);
  return result;
}

export function getLocalizedCalcMeta(
  slug: string,
  locale: string,
  fallbackTitle?: string,
  fallbackDescription?: string
): { title: string; description: string } {
  const cacheKey = `${locale}:${slug}`;
  if (calcMetaCache.has(cacheKey)) {
    return calcMetaCache.get(cacheKey)!;
  }

  const calc = getCalculatorBySlug(slug);
  if (!calc) {
    return {
      title: fallbackTitle || slug,
      description: fallbackDescription || "",
    };
  }

  const localizedSlug = calc.slugs?.[locale as keyof typeof calc.slugs];
  const translation = calc.translations?.[locale];

  let mdTitle: string | undefined;
  let mdDesc: string | undefined;

  const candidatePaths = [
    path.join(process.cwd(), "content", locale, `${calc.slug}.md`),
    ...(localizedSlug ? [path.join(process.cwd(), "content", locale, `${localizedSlug}.md`)] : []),
  ];

  const existingPath = candidatePaths.find((p) => fs.existsSync(p));
  if (existingPath) {
    const md = extractMarkdownTitleAndDesc(existingPath);
    mdTitle = md.title;
    mdDesc = md.description;
  }

  const title =
    mdTitle ||
    translation?.title ||
    (translation?.meta?.title ? translation.meta.title.split(/\s*[|–—-]\s*/)[0].trim() : undefined) ||
    fallbackTitle ||
    calc.title;

  const description =
    mdDesc ||
    translation?.description ||
    translation?.meta?.description ||
    fallbackDescription ||
    calc.description;

  const result = { title: title.trim(), description: description.trim() };
  calcMetaCache.set(cacheKey, result);
  return result;
}
