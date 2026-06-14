import { NextResponse } from 'next/server';
import { fetchPostsRest } from '@/lib/firebase-rest';

export async function GET() {
  const baseUrl = (process.env.APP_URL || 'https://nexuscalculator.net').replace(/\/$/, '');
  
  // Fetch up to 50 recent community posts for the RSS feed
  const posts = await fetchPostsRest(undefined, 50);

  let items = '';

  if (posts && posts.length > 0) {
    for (const post of posts) {
      // Create plain text preview from content
      const plainTextContent = post.content.replace(/<[^>]+>/g, '').substring(0, 200) + '...';
      
      items += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/en/community/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/community/${post.slug}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      <description><![CDATA[${plainTextContent}]]></description>
      <author>${post.authorName || 'Community Member'}</author>
    </item>`;
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nexus Community</title>
    <link>${baseUrl}/en/community</link>
    <description>Latest discussions, tutorials, and questions from the Nexus Developer Community.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
