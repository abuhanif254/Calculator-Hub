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
import { splitPdfConfig } from './split-pdf';
import { compressPdfConfig } from './compress-pdf';
import { editPdfConfig } from './edit-pdf';
import { pdfToJpgConfig } from './pdf-to-jpg';
import { jpgToPdfConfig } from './jpg-to-pdf';
import { removePdfPagesConfig } from './remove-pdf-pages';
import { rotatePdfConfig } from './rotate-pdf';
import { watermarkPdfConfig } from './watermark-pdf';
import { protectPdfConfig } from './protect-pdf';
import { qrCodeStudioConfig } from './qr-code-studio';
import { unlockPdfConfig } from './unlock-pdf';
import { organizePdfConfig } from './organize-pdf';
import { addPageNumbersPdfConfig } from './add-page-numbers-pdf';
import { pdfMetadataEditorConfig } from './pdf-metadata-editor';
import { pdfMetadataViewerConfig } from './pdf-metadata-viewer';
import { pdfExtractPagesConfig } from './pdf-extract-pages';
import { pdfCropPagesConfig } from './pdf-crop-pages';
import { pdfOcrConfig } from './pdf-ocr';
import { pdfToWordConfig } from './pdf-to-word';
import { wordToPdfConfig } from './word-to-pdf';
import { excelToPdfConfig } from './excel-to-pdf';
import { powerpointToPdfConfig } from './powerpoint-to-pdf';
import { imageToPdfConfig } from './image-to-pdf';
import { compressImageConfig } from './compress-image';
import { resizeImageConfig } from './resize-image';
import { photoEditorConfig } from './photo-editor';
import { wordCounterConfig } from './word-counter';
import { caseConverterConfig } from './case-converter';
import { aiPromptHelperConfig } from './ai-prompt-helper';
import { instagramTiktokHashtagGeneratorConfig } from './instagram-tiktok-hashtag-generator';
import { bioLinkPageGeneratorConfig } from './bio-link-page-generator';
import { htmlCssJsPlaygroundConfig } from './html-css-js-playground';
import { backgroundRemoverConfig } from './background-remover';
import { pdfToExcelConfig } from './pdf-to-excel';
import { pdfToPowerPointConfig } from './pdf-to-powerpoint';

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
  [splitPdfConfig.slug]: splitPdfConfig,
  [compressPdfConfig.slug]: compressPdfConfig,
  [editPdfConfig.slug]: editPdfConfig,
  [pdfToJpgConfig.slug]: pdfToJpgConfig,
  [jpgToPdfConfig.slug]: jpgToPdfConfig,
  [removePdfPagesConfig.slug]: removePdfPagesConfig,
  [rotatePdfConfig.slug]: rotatePdfConfig,
  [watermarkPdfConfig.slug]: watermarkPdfConfig,
  [qrCodeStudioConfig.slug]: qrCodeStudioConfig,
  [protectPdfConfig.slug]: protectPdfConfig,
  [unlockPdfConfig.slug]: unlockPdfConfig,
  [organizePdfConfig.slug]: organizePdfConfig,
  [addPageNumbersPdfConfig.slug]: addPageNumbersPdfConfig,
  [pdfMetadataEditorConfig.slug]: pdfMetadataEditorConfig,
  [pdfMetadataViewerConfig.slug]: pdfMetadataViewerConfig,
  [pdfExtractPagesConfig.slug]: pdfExtractPagesConfig,
  [pdfCropPagesConfig.slug]: pdfCropPagesConfig,
  [pdfOcrConfig.slug]: pdfOcrConfig,
  [pdfToWordConfig.slug]: pdfToWordConfig,
  [wordToPdfConfig.slug]: wordToPdfConfig,
  [excelToPdfConfig.slug]: excelToPdfConfig,
  [powerpointToPdfConfig.slug]: powerpointToPdfConfig,
  [imageToPdfConfig.slug]: imageToPdfConfig,
  [compressImageConfig.slug]: compressImageConfig,
  [resizeImageConfig.slug]: resizeImageConfig,
  [photoEditorConfig.slug]: photoEditorConfig,
  [wordCounterConfig.slug]: wordCounterConfig,
  [caseConverterConfig.slug]: caseConverterConfig,
  [aiPromptHelperConfig.slug]: aiPromptHelperConfig,
  [instagramTiktokHashtagGeneratorConfig.slug]: instagramTiktokHashtagGeneratorConfig,
  [bioLinkPageGeneratorConfig.slug]: bioLinkPageGeneratorConfig,
  [htmlCssJsPlaygroundConfig.slug]: htmlCssJsPlaygroundConfig,
  [backgroundRemoverConfig.slug]: backgroundRemoverConfig,
  [pdfToExcelConfig.slug]: pdfToExcelConfig,
  [pdfToPowerPointConfig.slug]: pdfToPowerPointConfig,
};

export function getToolConfig(slug: string): ToolConfig | undefined {
  return allToolsConfig[slug];
}
