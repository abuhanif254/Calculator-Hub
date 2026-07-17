'use client';

import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { JobsModule } from '../../../components/platform/jobs/JobsModule';

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Management"
        subtitle="Monitor and control active anonymization jobs across all databases"
      />
      <JobsModule />
    </div>
  );
}
