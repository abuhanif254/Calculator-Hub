const fs = require('fs');
const path = require('path');

const basePath = 'c:\\nexus\\Calculator-Hub\\app\\[locale]\\database-privacy';

const pages = [
  { path: 'connections', feature: 'Database Connections' },
  { path: 'explorer', feature: 'Database Explorer' },
  { path: 'projects', feature: 'Projects' },
  { path: 'organizations', feature: 'Organizations' },
  { path: 'secrets', feature: 'Secrets Manager' },
  { path: 'scanner', feature: 'Sensitive Data Scanner' },
  { path: 'scanner/findings', feature: 'Scanner Findings' },
  { path: 'masking/rules', feature: 'Masking Rule Builder' },
  { path: 'masking/templates', feature: 'Template Library' },
  { path: 'masking/marketplace', feature: 'Rule Marketplace' },
  { path: 'masking/preview', feature: 'Preview Before Execute' },
  { path: 'jobs', feature: 'Job Management' },
  { path: 'jobs/history', feature: 'Job History' },
  { path: 'jobs/scheduler', feature: 'Job Scheduler' },
  { path: 'export', feature: 'Export' },
  { path: 'import', feature: 'Import' },
  { path: 'reports', feature: 'Reports' },
  { path: 'compliance', feature: 'Compliance Center' },
  { path: 'audit', feature: 'Audit Logs' },
  { path: 'api-keys', feature: 'API Keys' },
  { path: 'webhooks', feature: 'Webhooks' },
  { path: 'users', feature: 'User Management' },
  { path: 'users/roles', feature: 'Roles & Permissions' },
  { path: 'monitoring', feature: 'Performance Monitor' },
  { path: 'monitoring/workers', feature: 'Worker Nodes' },
  { path: 'monitoring/queue', feature: 'Queue Manager' },
  { path: 'settings', feature: 'Settings' }
];

pages.forEach(p => {
  const fullDir = path.join(basePath, ...p.path.split('/'));
  fs.mkdirSync(fullDir, { recursive: true });
  
  const up = p.path.split('/').length + 2;
  const upString = '../'.repeat(up);
  
  const content = `'use client';\nimport { ComingSoon } from '${upString}components/platform/ui/PlatformUI';\nexport default function Page() {\n  return <ComingSoon feature="${p.feature}" />;\n}\n`;
  
  fs.writeFileSync(path.join(fullDir, 'page.tsx'), content);
});

const anonymizeDir = path.join(basePath, 'anonymize');
fs.mkdirSync(anonymizeDir, { recursive: true });
const anonymizeContent = `'use client';
import { DatabaseAnonymizerTool } from '../../../../components/tools/DatabaseAnonymizerTool';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';

export default function AnonymizePage() {
  return (
    <div>
      <PageHeader
        title="Upload & Mask"
        subtitle="Anonymize any structured or unstructured data file in seconds"
      />
      <DatabaseAnonymizerTool />
    </div>
  );
}
`;
fs.writeFileSync(path.join(anonymizeDir, 'page.tsx'), anonymizeContent);
console.log('Done!');
