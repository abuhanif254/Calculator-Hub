'use client';

import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { JobHistoryModule } from '../../../../components/platform/jobs/JobHistoryModule';

export default function JobHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Job History"
        subtitle="Review past anonymization runs for compliance and reporting"
      />
      <JobHistoryModule />
    </div>
  );
}
