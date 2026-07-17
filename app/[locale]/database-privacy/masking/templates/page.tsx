'use client';

import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { TemplatesModule } from '../../../../components/platform/masking/TemplatesModule';

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Template Library"
        subtitle="Browse and apply pre-built masking templates to your columns"
      />
      <TemplatesModule />
    </div>
  );
}
