import { getPlaygroundPen } from '@/lib/playgroundService';
import { PlaygroundEmbedClient } from '@/app/components/tools/html-css-js-playground/PlaygroundEmbedClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface EmbedPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export async function generateMetadata({ params }: EmbedPageProps): Promise<Metadata> {
  const pen = await getPlaygroundPen(params.id);
  
  if (!pen) {
    return { title: 'Pen Not Found' };
  }

  return {
    title: `${pen.title || 'Nexus Playground Pen'} - Embed`,
  };
}

export default async function PlaygroundEmbedPage({ params }: EmbedPageProps) {
  const pen = await getPlaygroundPen(params.id);
  
  if (!pen) {
    notFound();
  }

  return <PlaygroundEmbedClient pen={pen} penId={params.id} />;
}
