import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Guide } from '@/lib/data/guides';

export function getLocalizedGuide(guide: Guide, locale: string): Guide {
  if (locale === 'en') return guide;

  const currentSlug = guide.slugs?.[locale as keyof typeof guide.slugs] || guide.slug;
  const filePath = path.join(process.cwd(), 'content', locale, 'guides', `${currentSlug}.md`);
  
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    
    return {
      ...guide,
      title: data.title || guide.title,
      description: data.description || guide.description,
    };
  }
  
  return guide;
}
