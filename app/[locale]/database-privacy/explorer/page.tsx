'use client';

import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { ExplorerModule } from '../../../components/platform/explorer/ExplorerModule';

export default function ExplorerPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Database Explorer" 
        subtitle="Browse and inspect your connected schemas and tables" 
      />
      <ExplorerModule />
    </div>
  );
}
