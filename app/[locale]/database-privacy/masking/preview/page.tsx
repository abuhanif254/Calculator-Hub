'use client';

import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { PreviewModule } from '../../../../components/platform/masking/PreviewModule';

export default function PreviewPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Preview Before Execute"
        subtitle="Test your masking rules against a live sample before committing"
      />
      <PreviewModule />
    </div>
  );
}
