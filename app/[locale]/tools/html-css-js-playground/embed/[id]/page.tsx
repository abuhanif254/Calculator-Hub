export const runtime = 'edge';
import { getPlaygroundPen } from '@/lib/playgroundService';
import dynamic from 'next/dynamic';

const PlaygroundEmbedClient = dynamic(
  () => import('@/app/components/tools/html-css-js-playground/PlaygroundEmbedClient').then((mod) => mod.PlaygroundEmbedClient),
  { ssr: false, loading: () => <div className="p-4 text-center text-slate-500 text-sm">Loading Embed...</div> }
);
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
    return { title: 'Pen Not Found' };
  }

  return {
    title: `${pen.title || 'Nexus Playground Pen'} - Embed`,
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

