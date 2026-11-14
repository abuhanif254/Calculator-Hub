import { NextResponse } from 'next/server';
import { fetchPostsRest } from '@/lib/firebase-rest';

export async function GET() {
  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net').replace(/\/$/, '');
  
  // Fetch up to 1000 recent community posts for the sitemap
  const posts = await fetchPostsRest(undefined, 1000);

  let urls = `
  <url>
    <loc>${baseUrl}/en/community</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>`;

  if (posts && posts.length > 0) {
    for (const post of posts) {
      if (!post.slug || post.slug === 'hello-cca921ec' || post.slug.startsWith('to-use-a-')) continue;
      const plainText = (post.content || '').replace(/<[^>]+>/g, ' ').trim();
      const wordCount = plainText.split(/\s+/).filter(Boolean).length;
      if (wordCount < 100) continue;

      urls += `
  <url>
    <loc>${baseUrl}/en/community/${post.slug}</loc>
    <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
