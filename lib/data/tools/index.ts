import { ToolConfig } from './types';
import { jsonFormatterConfig } from './json-formatter';
import { diffCheckerConfig } from './diff-checker';

export * from './types';

export const allToolsConfig: Record<string, ToolConfig> = {
  [jsonFormatterConfig.slug]: jsonFormatterConfig,
  [diffCheckerConfig.slug]: diffCheckerConfig,
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return allToolsConfig[slug];
}
