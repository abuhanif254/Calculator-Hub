import { ToolConfig } from './types';
import { jsonFormatterConfig } from './json-formatter';
import { diffCheckerConfig } from './diff-checker';
import { htmlFormatterConfig } from './html-formatter';
import { cssBeautifierConfig } from './css-beautifier';
import { jsBeautifierConfig } from './js-beautifier';
import { xmlFormatterConfig } from './xml-formatter';
import { markdownPreviewerConfig } from './markdown-previewer';
import { sqlFormatterConfig } from './sql-formatter';
import { yamlFormatterConfig } from './yaml-formatter';
import { csvViewerConfig } from './csv-viewer';
import { base64EncodeConfig } from './base64-encode';
import { base64DecodeConfig } from './base64-decode';
import { urlEncoderConfig } from './url-encoder';
import { urlDecoderConfig } from './url-decoder';
import { jwtDecoderConfig } from './jwt-decoder';
import { hashGeneratorConfig } from './hash-generator';
import { md5GeneratorConfig } from './md5-generator';
import { sha256GeneratorConfig } from './sha256-generator';
import { passwordGeneratorConfig } from './password-generator';
import { hmacGeneratorConfig } from './hmac-generator';
import { qrCodeGeneratorConfig } from './qr-code-generator';
import { metaTagGeneratorConfig } from './meta-tag-generator';
import { openGraphGeneratorConfig } from './open-graph-generator';

export * from './types';

export const allToolsConfig: Record<string, ToolConfig> = {
  [jsonFormatterConfig.slug]: jsonFormatterConfig,
  [diffCheckerConfig.slug]: diffCheckerConfig,
  [htmlFormatterConfig.slug]: htmlFormatterConfig,
  [cssBeautifierConfig.slug]: cssBeautifierConfig,
  [jsBeautifierConfig.slug]: jsBeautifierConfig,
  [xmlFormatterConfig.slug]: xmlFormatterConfig,
  [markdownPreviewerConfig.slug]: markdownPreviewerConfig,
  [sqlFormatterConfig.slug]: sqlFormatterConfig,
  [yamlFormatterConfig.slug]: yamlFormatterConfig,
  [csvViewerConfig.slug]: csvViewerConfig,
  [base64EncodeConfig.slug]: base64EncodeConfig,
  [base64DecodeConfig.slug]: base64DecodeConfig,
  [urlEncoderConfig.slug]: urlEncoderConfig,
  [urlDecoderConfig.slug]: urlDecoderConfig,
  [jwtDecoderConfig.slug]: jwtDecoderConfig,
  [hashGeneratorConfig.slug]: hashGeneratorConfig,
  [md5GeneratorConfig.slug]: md5GeneratorConfig,
  [sha256GeneratorConfig.slug]: sha256GeneratorConfig,
  [passwordGeneratorConfig.slug]: passwordGeneratorConfig,
  [hmacGeneratorConfig.slug]: hmacGeneratorConfig,
  [qrCodeGeneratorConfig.slug]: qrCodeGeneratorConfig,
  [metaTagGeneratorConfig.slug]: metaTagGeneratorConfig,
  [openGraphGeneratorConfig.slug]: openGraphGeneratorConfig,
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return allToolsConfig[slug];
}
