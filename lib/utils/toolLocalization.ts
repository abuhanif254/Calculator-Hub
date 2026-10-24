import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getCalculatorBySlug } from "@/lib/data/calculators";
import { getToolConfig } from "@/lib/data/tools";
import { getMessageNamespaceCalcMeta } from "@/lib/utils/getCalculatorMessages";

const toolMetaCache = new Map<string, { title: string; description: string }>();
const calcMetaCache = new Map<string, { title: string; description: string }>();

function extractMarkdownTitleAndDesc(filePath: string): { title?: string; metaTitle?: string; description?: string } {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = matter(raw);
    const data = parsed.data || {};
    let title: string | undefined = data.title;
    const metaTitle: string | undefined = typeof data.metaTitle === "string" ? data.metaTitle.trim() : undefined;
    let description: string | undefined = data.shortDescription || data.description || data.metaDescription;

    if (!title) {
      const leadingH1 = parsed.content.match(/^\s*#\s+([^\r\n]+)/);
      if (leadingH1) {
        title = leadingH1[1].replace(/\*\*/g, "").split(/\s*[:|–—]\s*/)[0].trim();
      } else if (metaTitle) {
        title = metaTitle.split(/\s*[|–—-]\s*/)[0].trim();
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

    return { title: title?.trim(), metaTitle, description: description?.trim() };
  } catch {
    return {};
  }
}

export function localizeFallbackToolTitle(title: string, locale: string): string {
  if (!title || locale === "en") return title;
  if (locale === "de") {
    return title
      .replace(/\bFormatter & Validator\b/gi, "Formatierer & Validator")
      .replace(/\bFormatter & Beautifier\b/gi, "Formatierer & Beautifier")
      .replace(/\bBeautifier & Formatter\b/gi, "Formatierer & Beautifier")
      .replace(/\bEncoder & Decoder\b/gi, "Encoder & Decoder (Deutsch)")
      .replace(/\bDiff Checker & Text Compare\b/gi, "Diff-Checker & Textvergleich")
      .replace(/\bLorem Ipsum & Dummy Text Generator\b/gi, "Lorem-Ipsum- & Blindtext-Generator")
      .replace(/\bQR Code Generator & Designer\b/gi, "QR-Code-Generator & Designer")
      .replace(/\bAPI Mock Data Generator\b/gi, "API-Mock-Daten-Generator")
      .replace(/\bFake User Data Generator\b/gi, "Testdaten- & Benutzer-Generator")
      .replace(/\bHTML \/ CSS \/ JavaScript Playground\b/gi, "HTML / CSS / JavaScript Code-Playground")
      .replace(/\bInstagram & TikTok Hashtag Generator\b/gi, "Instagram- & TikTok-Hashtag-Generator")
      .replace(/\bMeme Generator\b/gi, "Meme-Generator Online")
      .replace(/\bSEO Slug Generator\b/gi, "SEO-Slug-Generator")
      .replace(/\bUUID Generator\b/gi, "UUID- & GUID-Generator");
  }
  return title;
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
    if (locale !== "en" && config?.title && title === config.title) {
      title = localizeFallbackToolTitle(title, locale);
    }
  } else if (locale !== "en") {
    const enPath = path.join(process.cwd(), "content", "tools", "en", `${slug}.md`);
    if (fs.existsSync(enPath)) {
      const md = extractMarkdownTitleAndDesc(enPath);
      if (!fallbackTitle && md.title) title = localizeFallbackToolTitle(md.title, locale);
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
  const nsMeta = getMessageNamespaceCalcMeta(calc.slug, locale, calc.parentSlug);

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
    nsMeta.title ||
    fallbackTitle ||
    calc.title;

  const description =
    mdDesc ||
    translation?.description ||
    translation?.meta?.description ||
    nsMeta.description ||
    fallbackDescription ||
    calc.description;

  const result = { title: title.trim(), description: description.trim() };
  calcMetaCache.set(cacheKey, result);
  return result;
}
