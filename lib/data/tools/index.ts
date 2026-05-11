import { ToolConfig } from './types';
import { jsonFormatterConfig } from './json-formatter';
import { diffCheckerConfig } from './diff-checker';
import { htmlFormatterConfig } from './html-formatter';
import { cssBeautifierConfig } from './css-beautifier';
import { jsBeautifierConfig } from './js-beautifier';

export * from './types';

export const allToolsConfig: Record<string, ToolConfig> = {
  [jsonFormatterConfig.slug]: jsonFormatterConfig,
  [diffCheckerConfig.slug]: diffCheckerConfig,
  [htmlFormatterConfig.slug]: htmlFormatterConfig,
  [cssBeautifierConfig.slug]: cssBeautifierConfig,
  [jsBeautifierConfig.slug]: jsBeautifierConfig,
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return allToolsConfig[slug];
}

