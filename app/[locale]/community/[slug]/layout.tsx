import { Metadata } from 'next';
import { fetchPostBySlugRest } from '@/lib/firebase-rest';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  const post = await fetchPostBySlugRest(slug);

  if (!post) {
    return {
      title: 'Discussion Not Found | Nexus Community',
      description: 'The requested discussion could not be found.',
    };
  }

  const plainContent = post.content
    .replace(/[#_*~`>]/g, '') // strip basic markdown
    .substring(0, 150) + (post.content.length > 150 ? '...' : '');

  return {
    title: `${post.title} | Nexus Community`,
    description: plainContent,
    openGraph: {
      title: post.title,
      description: plainContent,
      type: 'article',
      authors: [post.authorName || 'Nexus Member'],
      siteName: 'Nexus Calculator Hub',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainContent,
    },
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
