import { getPlaygroundPen } from '@/lib/playgroundService';
import { HtmlCssJsPlaygroundToolBase } from '@/app/components/tools/HtmlCssJsPlaygroundTool';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pen = await getPlaygroundPen(params.id);
  
  if (!pen) {
    return { title: 'Pen Not Found' };
  }

  return {
    title: `${pen.title || 'Nexus Playground Pen'}`,
    description: 'A custom HTML, CSS, and JS playground created on Nexus.',
    openGraph: {
      title: `${pen.title || 'Nexus Playground Pen'}`,
      description: 'Check out this code snippet on Nexus!',
    }
  };
}

export default async function PlaygroundPenPage({ params }: PageProps) {
  const pen = await getPlaygroundPen(params.id);
  
  if (!pen) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">{pen.title || 'Nexus Playground Pen'}</h1>
        <p className="text-slate-600 dark:text-slate-400">View and edit this shared code snippet.</p>
      </div>
      <HtmlCssJsPlaygroundToolBase initialData={pen} penId={params.id} />
    </div>
  );
}
