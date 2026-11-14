import { getPlaygroundPen } from '@/lib/playgroundService';
import { PlaygroundEmbedClient } from '@/app/components/tools/html-css-js-playground/PlaygroundEmbedClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface EmbedPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pen = await getPlaygroundPen(resolvedParams.id);
  
  if (!pen) {
    return {
      title: 'Pen Not Found',
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    };
  }

  return {
    title: `${pen.title || 'Nexus Playground Pen'} - Embed`,
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export default async function PlaygroundEmbedPage({ params }: EmbedPageProps) {
  const resolvedParams = await params;
  const pen = await getPlaygroundPen(resolvedParams.id);
  
  if (!pen) {
    notFound();
  }

  return <PlaygroundEmbedClient pen={pen} penId={resolvedParams.id} />;
}
