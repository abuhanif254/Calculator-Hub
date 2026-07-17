'use client';

import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { ScannerModule } from '../../../components/platform/scanner/ScannerModule';

export default function ScannerPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sensitive Data Scanner" 
        subtitle="Run automated discovery jobs to locate exposed PII across connected databases" 
      />
      <ScannerModule />
    </div>
  );
}
