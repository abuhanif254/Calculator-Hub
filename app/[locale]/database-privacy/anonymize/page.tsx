'use client';

import { DatabaseAnonymizerTool } from '../../../components/platform/ui/DatabaseAnonymizerTool';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import type { Metadata } from 'next';

export default function AnonymizePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        title="Upload & Mask"
        subtitle="Anonymize any CSV, JSON, or TSV file instantly — 30+ PII detectors, 10 masking strategies, all client-side"
      />
      <DatabaseAnonymizerTool />
    </div>
  );
}
