'use client';

import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { MaskingRulesModule } from '../../../../components/platform/masking/MaskingRulesModule';

export default function MaskingRulesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Masking Rules"
        subtitle="Define algorithms and logic to protect sensitive data columns"
      />
      <MaskingRulesModule />
    </div>
  );
}
