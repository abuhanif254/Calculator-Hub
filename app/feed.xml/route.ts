import { NextResponse } from 'next/server';
import { fetchPostsRest } from '@/lib/firebase-rest';
import { featuredGuides } from '@/lib/data/guides';
import { comparisons } from '@/lib/data/comparisons';

export async function GET() {
  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

  let items = '';

  // 1. Syndicate Featured Peer-Reviewed Educational Guides
  for (const guide of featuredGuides.slice(0, 25)) {
    const pubDate = guide.lastUpdated ? new Date(guide.lastUpdated).toUTCString() : new Date('2026-10-01').toUTCString();
    items += `
    <item>
      <title><![CDATA[${guide.title}]]></title>
      <link>${baseUrl}/en/guides/${guide.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/guides/${guide.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${guide.category}]]></category>
      <description><![CDATA[${guide.description}]]></description>
      <author>Md. Shamim Hossain (NexusCalculator Editorial Board)</author>
    </item>`;
  }

  // 2. Syndicate Side-by-Side Methodology Comparisons
  for (const comp of comparisons) {
    items += `
    <item>
      <title><![CDATA[${comp.title}]]></title>
      <link>${baseUrl}/en/compare/${comp.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/compare/${comp.slug}</guid>
      <pubDate>${new Date('2026-10-01').toUTCString()}</pubDate>
      <category><![CDATA[Comparison]]></category>
      <description><![CDATA[${comp.seoDescription} Verdict: ${comp.verdict}]]></description>
      <author>Md. Shamim Hossain (NexusCalculator Editorial Board)</author>
    </item>`;
  }

  // 3. Syndicate Recent Community Discussions
  try {
    const posts = await fetchPostsRest(undefined, 25);
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const plainTextContent = post.content.replace(/<[^>]+>/g, '').substring(0, 200) + '...';
        items += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/en/community/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/community/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <category><![CDATA[Community]]></category>
      <description><![CDATA[${plainTextContent}]]></description>
      <author>${post.authorName || 'Community Member'}</author>
    </item>`;
      }
    }
  } catch {
    // Gracefully continue if Firestore REST is unavailable
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NexusCalculator — Guides, Comparisons &amp; Engineering Updates</title>
    <link>${baseUrl}/en</link>
    <description>Peer-reviewed financial, health, and mathematical guides, side-by-side methodology comparisons, and community discussions from NexusCalculator.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

