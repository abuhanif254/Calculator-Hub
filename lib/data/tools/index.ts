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
import { twitterCardGeneratorConfig } from './twitter-card-generator';
import { robotsTxtGeneratorConfig } from './robots-txt-generator';
import { sitemapXmlGeneratorConfig } from './sitemap-xml-generator';
import { htaccessGeneratorConfig } from './htaccess-generator';
import { responsiveScreenTesterConfig } from './responsive-screen-tester';
import { httpHeaderCheckerConfig } from './http-header-checker';
import { redirectCheckerConfig } from './redirect-checker';
import { websiteScreenshotToolConfig } from './website-screenshot-tool';
import { dnsLookupConfig } from './dns-lookup';
import { ipLookupConfig } from './ip-lookup';
import { userAgentParserConfig } from './user-agent-parser';
import { mimeTypeCheckerConfig } from './mime-type-checker';
import { colorPickerConfig } from './color-picker';
import { gradientGeneratorConfig } from './gradient-generator';
import { tailwindColorPaletteConfig } from './tailwind-color-palette';
import { cssShadowGeneratorConfig } from './css-shadow-generator';
import { glassmorphismGeneratorConfig } from './glassmorphism-generator';
import { neumorphismGeneratorConfig } from './neumorphism-generator';
import { contrastCheckerConfig } from './contrast-checker';
import { colorPaletteGeneratorConfig } from './color-palette-generator';

import { hexToRgbConfig } from './hex-to-rgb';
import { uuidGeneratorConfig } from './uuid-generator';
import { slugGeneratorConfig } from './slug-generator';
import { loremIpsumGeneratorConfig } from './lorem-ipsum-generator';
import { fakeUserDataGeneratorConfig } from './fake-user-data-generator';
import { randomNumberGeneratorConfig } from './random-number-generator';
import { apiMockDataGeneratorConfig } from './api-mock-data-generator';
import { htmlTableGeneratorConfig } from './html-table-generator';
import { usernameGeneratorConfig } from './username-generator';
import { randomStringGeneratorConfig } from './random-string-generator';
import { strongPasswordGeneratorConfig } from './strong-password-generator';
import { rgbToHexConfig } from './rgb-to-hex';
import { mergePdfConfig } from './merge-pdf';
import { compressImageConfig } from './compress-image';
import { resizeImageConfig } from './resize-image';



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
  [twitterCardGeneratorConfig.slug]: twitterCardGeneratorConfig,
  [robotsTxtGeneratorConfig.slug]: robotsTxtGeneratorConfig,
  [sitemapXmlGeneratorConfig.slug]: sitemapXmlGeneratorConfig,
  [htaccessGeneratorConfig.slug]: htaccessGeneratorConfig,
  [responsiveScreenTesterConfig.slug]: responsiveScreenTesterConfig,
  [httpHeaderCheckerConfig.slug]: httpHeaderCheckerConfig,
  [redirectCheckerConfig.slug]: redirectCheckerConfig,
  [websiteScreenshotToolConfig.slug]: websiteScreenshotToolConfig,
  [dnsLookupConfig.slug]: dnsLookupConfig,
  [ipLookupConfig.slug]: ipLookupConfig,
  [userAgentParserConfig.slug]: userAgentParserConfig,
  [mimeTypeCheckerConfig.slug]: mimeTypeCheckerConfig,
  [colorPickerConfig.slug]: colorPickerConfig,
  [gradientGeneratorConfig.slug]: gradientGeneratorConfig,
  [tailwindColorPaletteConfig.slug]: tailwindColorPaletteConfig,
  [cssShadowGeneratorConfig.slug]: cssShadowGeneratorConfig,
  [glassmorphismGeneratorConfig.slug]: glassmorphismGeneratorConfig,
  [neumorphismGeneratorConfig.slug]: neumorphismGeneratorConfig,
  [contrastCheckerConfig.slug]: contrastCheckerConfig,
  [colorPaletteGeneratorConfig.slug]: colorPaletteGeneratorConfig,
  [hexToRgbConfig.slug]: hexToRgbConfig,
  [uuidGeneratorConfig.slug]: uuidGeneratorConfig,
  [slugGeneratorConfig.slug]: slugGeneratorConfig,
  [loremIpsumGeneratorConfig.slug]: loremIpsumGeneratorConfig,
  [fakeUserDataGeneratorConfig.slug]: fakeUserDataGeneratorConfig,
  [randomNumberGeneratorConfig.slug]: randomNumberGeneratorConfig,
  [apiMockDataGeneratorConfig.slug]: apiMockDataGeneratorConfig,
  [htmlTableGeneratorConfig.slug]: htmlTableGeneratorConfig,
  [usernameGeneratorConfig.slug]: usernameGeneratorConfig,
  [randomStringGeneratorConfig.slug]: randomStringGeneratorConfig,
  [strongPasswordGeneratorConfig.slug]: strongPasswordGeneratorConfig,
  [rgbToHexConfig.slug]: rgbToHexConfig,
  [mergePdfConfig.slug]: mergePdfConfig,
  [compressImageConfig.slug]: compressImageConfig,
  [resizeImageConfig.slug]: resizeImageConfig,
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return allToolsConfig[slug];
}
