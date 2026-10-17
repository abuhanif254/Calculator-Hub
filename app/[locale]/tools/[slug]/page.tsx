import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { ToastProvider } from '../../../components/platform/ui/Toast';
import { getToolConfig, allToolsConfig } from '../../../../lib/data/tools';
import dynamic from 'next/dynamic';

const JsonFormatterTool = dynamic(() => import('../../../components/tools/JsonFormatterTool').then(m => m.JsonFormatterTool));
const DiffCheckerTool = dynamic(() => import('../../../components/tools/DiffCheckerTool').then(m => m.DiffCheckerTool));
const HtmlFormatterTool = dynamic(() => import('../../../components/tools/HtmlFormatterTool').then(m => m.HtmlFormatterTool));
const CssBeautifierTool = dynamic(() => import('../../../components/tools/CssBeautifierTool').then(m => m.CssBeautifierTool));
const JsBeautifierTool = dynamic(() => import('../../../components/tools/JsBeautifierTool').then(m => m.JsBeautifierTool));
const XmlFormatterTool = dynamic(() => import('../../../components/tools/XmlFormatterTool').then(m => m.XmlFormatterTool));
const MarkdownPreviewerTool = dynamic(() => import('../../../components/tools/MarkdownPreviewerTool').then(m => m.MarkdownPreviewerTool));
const SqlFormatterTool = dynamic(() => import('../../../components/tools/SqlFormatterTool').then(m => m.SqlFormatterTool));
const YamlFormatterTool = dynamic(() => import('../../../components/tools/YamlFormatterTool').then(m => m.YamlFormatterTool));
const CsvViewerTool = dynamic(() => import('../../../components/tools/CsvViewerTool').then(m => m.CsvViewerTool));
const Base64EncodeTool = dynamic(() => import('../../../components/tools/Base64EncodeTool').then(m => m.Base64EncodeTool));
const Base64DecodeTool = dynamic(() => import('../../../components/tools/Base64DecodeTool').then(m => m.Base64DecodeTool));
const UrlEncoderTool = dynamic(() => import('../../../components/tools/UrlEncoderTool').then(m => m.UrlEncoderTool));
const UrlDecoderTool = dynamic(() => import('../../../components/tools/UrlDecoderTool').then(m => m.UrlDecoderTool));
const JwtDecoderTool = dynamic(() => import('../../../components/tools/JwtDecoderTool').then(m => m.JwtDecoderTool));
const HashGeneratorTool = dynamic(() => import('../../../components/tools/HashGeneratorTool').then(m => m.HashGeneratorTool));
const Md5GeneratorTool = dynamic(() => import('../../../components/tools/Md5GeneratorTool').then(m => m.Md5GeneratorTool));
const Sha256GeneratorTool = dynamic(() => import('../../../components/tools/Sha256GeneratorTool').then(m => m.Sha256GeneratorTool));
const PasswordGeneratorTool = dynamic(() => import('../../../components/tools/PasswordGeneratorTool').then(m => m.PasswordGeneratorTool));
const HmacGeneratorTool = dynamic(() => import('../../../components/tools/HmacGeneratorTool').then(m => m.HmacGeneratorTool));
const QrCodeGeneratorTool = dynamic(() => import('../../../components/tools/QrCodeGeneratorTool').then(m => m.QrCodeGeneratorTool));
const MetaTagGeneratorTool = dynamic(() => import('../../../components/tools/meta-tag-generator').then(m => m.MetaTagGeneratorTool));
const OpenGraphGeneratorTool = dynamic(() => import('../../../components/tools/open-graph-generator').then(m => m.OpenGraphGeneratorTool));
const TwitterCardGeneratorTool = dynamic(() => import('../../../components/tools/twitter-card-generator').then(m => m.TwitterCardGeneratorTool));
const RobotsTxtGeneratorTool = dynamic(() => import('../../../components/tools/robots-txt-generator').then(m => m.RobotsTxtGeneratorTool));
const SitemapXmlGeneratorTool = dynamic(() => import('../../../components/tools/sitemap-xml-generator').then(m => m.SitemapXmlGeneratorTool));
const HtaccessGeneratorTool = dynamic(() => import('../../../components/tools/htaccess-generator').then(m => m.HtaccessGeneratorTool));
const ResponsiveScreenTesterTool = dynamic(() => import('../../../components/tools/responsive-screen-tester').then(m => m.ResponsiveScreenTesterTool));
const HttpHeaderCheckerTool = dynamic(() => import('../../../components/tools/http-header-checker').then(m => m.HttpHeaderCheckerTool));
const RedirectCheckerTool = dynamic(() => import('../../../components/tools/redirect-checker').then(m => m.RedirectCheckerTool));
const WebsiteScreenshotTool = dynamic(() => import('../../../components/tools/website-screenshot-tool').then(m => m.WebsiteScreenshotTool));
const DnsLookupTool = dynamic(() => import('../../../components/tools/dns-lookup').then(m => m.DnsLookupTool));
const IpLookupTool = dynamic(() => import('../../../components/tools/ip-lookup').then(m => m.IpLookupTool));
const UserAgentParserTool = dynamic(() => import('../../../components/tools/user-agent-parser').then(m => m.UserAgentParserTool));
const MimeTypeCheckerTool = dynamic(() => import('../../../components/tools/mime-type-checker').then(m => m.MimeTypeCheckerTool));
const ColorPickerTool = dynamic(() => import('../../../components/tools/color-picker').then(m => m.ColorPickerTool));
const GradientGeneratorTool = dynamic(() => import('../../../components/tools/GradientGeneratorTool').then(m => m.GradientGeneratorTool));
const TailwindColorPaletteTool = dynamic(() => import('../../../components/tools/TailwindColorPaletteTool').then(m => m.TailwindColorPaletteTool));
const CssShadowGeneratorTool = dynamic(() => import('../../../components/tools/CssShadowGeneratorTool').then(m => m.CssShadowGeneratorTool));
const GlassmorphismGeneratorTool = dynamic(() => import('../../../components/tools/GlassmorphismGeneratorTool').then(m => m.GlassmorphismGeneratorTool));
const NeumorphismGeneratorTool = dynamic(() => import('../../../components/tools/NeumorphismGeneratorTool').then(m => m.NeumorphismGeneratorTool));
const ContrastCheckerTool = dynamic(() => import('../../../components/tools/ContrastCheckerTool').then(m => m.ContrastCheckerTool));
const ColorPaletteGeneratorTool = dynamic(() => import('../../../components/tools/ColorPaletteGeneratorTool').then(m => m.ColorPaletteGeneratorTool));
const HexToRgbTool = dynamic(() => import('../../../components/tools/hex-to-rgb').then(m => m.HexToRgbTool));
const UuidGeneratorTool = dynamic(() => import('../../../components/tools/UuidGeneratorTool').then(m => m.UuidGeneratorTool));
const SlugGeneratorTool = dynamic(() => import('../../../components/tools/SlugGeneratorTool').then(m => m.SlugGeneratorTool));
const LoremIpsumGeneratorTool = dynamic(() => import('../../../components/tools/LoremIpsumGeneratorTool').then(m => m.LoremIpsumGeneratorTool));
const FakeUserDataGeneratorTool = dynamic(() => import('../../../components/tools/FakeUserDataGeneratorTool').then(m => m.FakeUserDataGeneratorTool));
const RandomNumberGeneratorTool = dynamic(() => import('../../../components/tools/RandomNumberGeneratorTool').then(m => m.RandomNumberGeneratorTool));
const ApiMockDataGeneratorTool = dynamic(() => import('../../../components/tools/ApiMockDataGeneratorTool').then(m => m.ApiMockDataGeneratorTool));
const HtmlTableGeneratorTool = dynamic(() => import('../../../components/tools/HtmlTableGeneratorTool').then(m => m.HtmlTableGeneratorTool));
const UsernameGeneratorTool = dynamic(() => import('../../../components/tools/UsernameGeneratorTool').then(m => m.UsernameGeneratorTool));
const RandomStringGeneratorTool = dynamic(() => import('../../../components/tools/RandomStringGeneratorTool').then(m => m.RandomStringGeneratorTool));
const StrongPasswordGeneratorTool = dynamic(() => import('../../../components/tools/StrongPasswordGeneratorTool').then(m => m.StrongPasswordGeneratorTool));
const RgbToHexTool = dynamic(() => import('../../../components/tools/RgbToHexTool').then(m => m.RgbToHexTool));
const MergePdfTool = dynamic(() => import('../../../components/tools/MergePdfTool').then(m => m.MergePdfTool));
const SplitPdfTool = dynamic(() => import('../../../components/tools/SplitPdfTool').then(m => m.SplitPdfTool));
const CompressPdfTool = dynamic(() => import('../../../components/tools/CompressPdfTool').then(m => m.CompressPdfTool));
const EditPdfTool = dynamic(() => import('../../../components/tools/EditPdfTool').then(m => m.EditPdfTool));
const PdfToJpgTool = dynamic(() => import('../../../components/tools/PdfToJpgTool').then(m => m.PdfToJpgTool));
const JpgToPdfTool = dynamic(() => import('../../../components/tools/JpgToPdfTool').then(m => m.JpgToPdfTool));
const RemovePdfPagesTool = dynamic(() => import('../../../components/tools/RemovePdfPagesTool').then(m => m.RemovePdfPagesTool));
const RotatePdfTool = dynamic(() => import('../../../components/tools/RotatePdfTool').then(m => m.RotatePdfTool));
const WatermarkPdfTool = dynamic(() => import('../../../components/tools/WatermarkPdfTool').then(m => m.WatermarkPdfTool));
const ProtectPdfTool = dynamic(() => import('../../../components/tools/ProtectPdfTool').then(m => m.ProtectPdfTool));
const UnlockPdfTool = dynamic(() => import('../../../components/tools/UnlockPdfTool').then(m => m.UnlockPdfTool));
const OrganizePdfTool = dynamic(() => import('../../../components/tools/OrganizePdfTool').then(m => m.OrganizePdfTool));
const AddPageNumbersPdfTool = dynamic(() => import('../../../components/tools/AddPageNumbersPdfTool').then(m => m.AddPageNumbersPdfTool));
const PdfMetadataEditorTool = dynamic(() => import('../../../components/tools/PdfMetadataEditorTool').then(m => m.PdfMetadataEditorTool));
const PdfMetadataViewerTool = dynamic(() => import('../../../components/tools/PdfMetadataViewerTool').then(m => m.PdfMetadataViewerTool));
const PdfExtractPagesTool = dynamic(() => import('../../../components/tools/PdfExtractPagesTool').then(m => m.PdfExtractPagesTool));
const PdfCropPagesTool = dynamic(() => import('../../../components/tools/PdfCropPagesTool').then(m => m.PdfCropPagesTool));
const PdfOcrTool = dynamic(() => import('../../../components/tools/PdfOcrTool').then(m => m.PdfOcrTool));
const PdfToWordTool = dynamic(() => import('../../../components/tools/PdfToWordTool').then(m => m.PdfToWordTool));
const WordToPdfTool = dynamic(() => import('../../../components/tools/WordToPdfTool').then(m => m.WordToPdfTool));
const ExcelToPdfTool = dynamic(() => import('../../../components/tools/ExcelToPdfTool').then(m => m.ExcelToPdfTool));
const PowerPointToPdfTool = dynamic(() => import('../../../components/tools/PowerPointToPdfTool').then(m => m.PowerPointToPdfTool));
const ImageToPdfTool = dynamic(() => import('../../../components/tools/ImageToPdfTool').then(m => m.ImageToPdfTool));
const CompressImageTool = dynamic(() => import('../../../components/tools/CompressImageTool').then(m => m.CompressImageTool));
const ResizeImageTool = dynamic(() => import('../../../components/tools/ResizeImageTool').then(m => m.ResizeImageTool));
const PhotoEditorTool = dynamic(() => import('../../../components/tools/PhotoEditorTool').then(m => m.PhotoEditorTool));
const WordCounterTool = dynamic(() => import('../../../components/tools/WordCounterTool').then(m => m.WordCounterTool));
const CaseConverterTool = dynamic(() => import('../../../components/tools/CaseConverterTool').then(m => m.CaseConverterTool));
const AIPromptHelperTool = dynamic(() => import('../../../components/tools/AIPromptHelperTool').then(m => m.AIPromptHelperTool));
const InstagramTiktokHashtagGeneratorTool = dynamic(() => import('../../../components/tools/InstagramTiktokHashtagGeneratorTool').then(m => m.InstagramTiktokHashtagGeneratorTool));
const BioLinkPageGeneratorTool = dynamic(() => import('../../../components/tools/BioLinkPageGeneratorTool').then(m => m.BioLinkPageGeneratorTool));
const HtmlCssJsPlaygroundTool = dynamic(() => import('../../../components/tools/HtmlCssJsPlaygroundTool').then(m => m.HtmlCssJsPlaygroundTool));
const BackgroundRemoverTool = dynamic(() => import('../../../components/tools/BackgroundRemoverTool').then(m => m.BackgroundRemoverTool));
const QrCodeStudioTool = dynamic(() => import('../../../components/tools/QrCodeStudioTool').then(m => m.QrCodeStudioTool));
const PdfToExcelTool = dynamic(() => import('../../../components/tools/PdfToExcelTool').then(m => m.PdfToExcelTool));
const PdfToPowerPointTool = dynamic(() => import('../../../components/tools/PdfToPowerPointTool').then(m => m.PdfToPowerPointTool));
const PdfToHtmlTool = dynamic(() => import('../../../components/tools/PdfToHtmlTool').then(m => m.PdfToHtmlTool));
const PdfToTextTool = dynamic(() => import('../../../components/tools/PdfToTextTool').then(m => m.PdfToTextTool));
const PdfToPngTool = dynamic(() => import('../../../components/tools/PdfToPngTool').then(m => m.PdfToPngTool));
const PngToPdfTool = dynamic(() => import('../../../components/tools/PngToPdfTool').then(m => m.PngToPdfTool));
const HtmlToPdfTool = dynamic(() => import('../../../components/tools/HtmlToPdfTool').then(m => m.HtmlToPdfTool));
const TextToPdfTool = dynamic(() => import('../../../components/tools/TextToPdfTool').then(m => m.TextToPdfTool));
const EpubToPdfTool = dynamic(() => import('../../../components/tools/EpubToPdfTool').then(m => m.EpubToPdfTool));
const PdfToEpubTool = dynamic(() => import('../../../components/tools/PdfToEpubTool').then(m => m.PdfToEpubTool));
const FlattenPdfTool = dynamic(() => import('../../../components/tools/FlattenPdfTool').then(m => m.FlattenPdfTool));
const SignPdfTool = dynamic(() => import('../../../components/tools/SignPdfTool').then(m => m.SignPdfTool));
const RedactPdfTool = dynamic(() => import('../../../components/tools/RedactPdfTool').then(m => m.RedactPdfTool));
const RepairPdfTool = dynamic(() => import('../../../components/tools/RepairPdfTool').then(m => m.RepairPdfTool));
const ScanToPdfTool = dynamic(() => import('../../../components/tools/ScanToPdfTool').then(m => m.ScanToPdfTool));
const CropImageTool = dynamic(() => import('../../../components/tools/CropImageTool').then(m => m.CropImageTool));
const RotateImageTool = dynamic(() => import('../../../components/tools/RotateImageTool').then(m => m.RotateImageTool));
const FlipImageTool = dynamic(() => import('../../../components/tools/FlipImageTool').then(m => m.FlipImageTool));
const ImageConverterTool = dynamic(() => import('../../../components/tools/ImageConverterTool').then(m => m.ImageConverterTool));
const BlurFacesInImageTool = dynamic(() => import('../../../components/tools/BlurFacesInImageTool').then(m => m.default));
const WatermarkImageTool = dynamic(() => import('../../../components/tools/WatermarkImageTool').then(m => m.WatermarkImageTool));
const PixelateImageTool = dynamic(() => import('../../../components/tools/PixelateImageTool').then(m => m.PixelateImageTool));
const BlurImageTool = dynamic(() => import('../../../components/tools/BlurImageTool').then(m => m.BlurImageTool));
const HeicToJpgTool = dynamic(() => import('../../../components/tools/HeicToJpgTool').then(m => m.HeicToJpgTool));
const SvgToPngTool = dynamic(() => import('../../../components/tools/SvgToPngTool').then(m => m.SvgToPngTool));
const FaviconGeneratorTool = dynamic(() => import('../../../components/tools/FaviconGeneratorTool').then(m => m.FaviconGeneratorTool));
const PngToSvgTool = dynamic(() => import('../../../components/tools/PngToSvgTool').then(m => m.PngToSvgTool));
const SvgOptimizerTool = dynamic(() => import('../../../components/tools/SvgOptimizerTool').then(m => m.SvgOptimizerTool));
const ConvertToWebpTool = dynamic(() => import('../../../components/tools/ConvertToWebpTool').then(m => m.ConvertToWebpTool));
const ConvertToPngTool = dynamic(() => import('../../../components/tools/ConvertToPngTool').then(m => m.ConvertToPngTool));
const ConvertToJpgTool = dynamic(() => import('../../../components/tools/ConvertToJpgTool').then(m => m.ConvertToJpgTool));
const ConvertToSvgTool = dynamic(() => import('../../../components/tools/ConvertToSvgTool').then(m => m.ConvertToSvgTool));
const ConvertToGifTool = dynamic(() => import('../../../components/tools/ConvertToGifTool').then(m => m.ConvertToGifTool));
const ImageMetadataViewerTool = dynamic(() => import('../../../components/tools/ImageMetadataViewerTool').then(m => m.ImageMetadataViewerTool));
const ImageMetadataRemoverTool = dynamic(() => import('../../../components/tools/ImageMetadataRemoverTool').then(m => m.ImageMetadataRemoverTool));
const ColorPickerFromImageTool = dynamic(() => import('../../../components/tools/ColorPickerFromImageTool').then(m => m.ColorPickerFromImageTool));
const ColorPaletteGeneratorFromImageTool = dynamic(() => import('../../../components/tools/ColorPaletteGeneratorFromImageTool'));
const AiImageUpscalerTool = dynamic(() => import('../../../components/tools/AiImageUpscalerTool'));
const IcoToPngTool = dynamic(() => import('../../../components/tools/IcoToPngTool').then(m => m.IcoToPngTool));
const AiImageGeneratorTool = dynamic(() => import('../../../components/tools/AiImageGeneratorTool').then(m => m.AiImageGeneratorTool));
const MemeGeneratorTool = dynamic(() => import('../../../components/tools/MemeGeneratorTool').then(m => m.MemeGeneratorTool));
const ImageToBase64Tool = dynamic(() => import('../../../components/tools/ImageToBase64Tool').then(m => m.ImageToBase64Tool));
const Base64ToImageTool = dynamic(() => import('../../../components/tools/Base64ToImageTool').then(m => m.Base64ToImageTool));
const MortgageCalculatorUkTool = dynamic(() => import('../../../components/tools/MortgageCalculatorUkTool').then(m => m.MortgageCalculatorUkTool));
const DatabaseAnonymizerTool = dynamic(() => import('../../../components/platform/ui/DatabaseAnonymizerTool').then(m => m.DatabaseAnonymizerTool));
const TextToSpeechTool = dynamic(() => import('../../../components/tools/TextToSpeechTool').then(m => m.TextToSpeechTool));

import { Link, routing, resolveIntlHref } from '../../../../i18n/routing';
import ReactMarkdown from 'react-markdown';
import { ToolVisitTracker } from '../../../components/ToolVisitTracker';
import { FavoriteButton } from '../../../components/FavoriteButton';
import { AdSenseContainer } from '../../../components/AdSenseContainer';
import { getGuideForTool } from '@/lib/data/guides';
import { getCollectionsForSlug } from '@/lib/data/collections';
import { getLocalizedGuide } from '@/lib/utils/guideLocalization';
import { getLocalizedCalcMeta } from '@/lib/utils/toolLocalization';
import { getCalculatorBySlug } from '@/lib/data/calculators';
import { enrichToolSeoContent, getLocalizedReviewerByline } from '@/lib/utils/seoContentEnricher';
import { ChevronRight, ArrowRight, Lightbulb, Zap, HelpCircle, Code, Layers, BookOpen, Clock, Wrench } from 'lucide-react';

const toolComponents: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "diff-checker": DiffCheckerTool,
  "html-formatter": HtmlFormatterTool,
  "css-beautifier": CssBeautifierTool,
  "js-beautifier": JsBeautifierTool,
  "xml-formatter": XmlFormatterTool,
  "markdown-previewer": MarkdownPreviewerTool,
  "sql-formatter": SqlFormatterTool,
  "yaml-formatter": YamlFormatterTool,
  "csv-viewer": CsvViewerTool,
  "base64-encode": Base64EncodeTool,
  "base64-decode": Base64DecodeTool,
  "url-encoder": UrlEncoderTool,
  "url-decoder": UrlDecoderTool,
  "jwt-decoder": JwtDecoderTool,
  "hash-generator": HashGeneratorTool,
  "md5-generator": Md5GeneratorTool,
  "sha256-generator": Sha256GeneratorTool,
  "password-generator": PasswordGeneratorTool,
  "hmac-generator": HmacGeneratorTool,
  "qr-code-generator": QrCodeGeneratorTool,
  "meta-tag-generator": MetaTagGeneratorTool,
  "open-graph-generator": OpenGraphGeneratorTool,
  "twitter-card-generator": TwitterCardGeneratorTool,
  "robots-txt-generator": RobotsTxtGeneratorTool,
  "sitemap-xml-generator": SitemapXmlGeneratorTool,
  "htaccess-generator": HtaccessGeneratorTool,
  "responsive-screen-tester": ResponsiveScreenTesterTool,
  "http-header-checker": HttpHeaderCheckerTool,
  "redirect-checker": RedirectCheckerTool,
  "website-screenshot-tool": WebsiteScreenshotTool,
  "dns-lookup": DnsLookupTool,
  "ip-lookup": IpLookupTool,
  "user-agent-parser": UserAgentParserTool,
  "mime-type-checker": MimeTypeCheckerTool,
  "color-picker": ColorPickerTool,
  "gradient-generator": GradientGeneratorTool,
  "tailwind-color-palette": TailwindColorPaletteTool,
  "css-shadow-generator": CssShadowGeneratorTool,
  "glassmorphism-generator": GlassmorphismGeneratorTool,
  "neumorphism-generator": NeumorphismGeneratorTool,
  "contrast-checker": ContrastCheckerTool,
  "color-palette-generator": ColorPaletteGeneratorTool,
  "hex-to-rgb": HexToRgbTool,
  "uuid-generator": UuidGeneratorTool,
  "slug-generator": SlugGeneratorTool,
  "lorem-ipsum-generator": LoremIpsumGeneratorTool,
  "fake-user-data-generator": FakeUserDataGeneratorTool,
  "random-number-generator": RandomNumberGeneratorTool,
  "api-mock-data-generator": ApiMockDataGeneratorTool,
  "html-table-generator": HtmlTableGeneratorTool,
  "username-generator": UsernameGeneratorTool,
  "random-string-generator": RandomStringGeneratorTool,
  "strong-password-generator": StrongPasswordGeneratorTool,
  "rgb-to-hex": RgbToHexTool,
  "merge-pdf": MergePdfTool,
  "split-pdf": SplitPdfTool,
  "compress-pdf": CompressPdfTool,
  "edit-pdf": EditPdfTool,
  "pdf-to-jpg": PdfToJpgTool,
  "jpg-to-pdf": JpgToPdfTool,
  "remove-pdf-pages": RemovePdfPagesTool,
  "rotate-pdf": RotatePdfTool,
  "watermark-pdf": WatermarkPdfTool,
  "protect-pdf": ProtectPdfTool,
  "unlock-pdf": UnlockPdfTool,
  "organize-pdf": OrganizePdfTool,
  "add-page-numbers-pdf": AddPageNumbersPdfTool,
  "pdf-metadata-editor": PdfMetadataEditorTool,
  "pdf-metadata-viewer": PdfMetadataViewerTool,
  "pdf-extract-pages": PdfExtractPagesTool,
  "pdf-crop-pages": PdfCropPagesTool,
  "pdf-ocr": PdfOcrTool,
  "pdf-to-word": PdfToWordTool,
  "word-to-pdf": WordToPdfTool,
  "excel-to-pdf": ExcelToPdfTool,
  "powerpoint-to-pdf": PowerPointToPdfTool,
  "image-to-pdf": ImageToPdfTool,
  "compress-image": CompressImageTool,
  "resize-image": ResizeImageTool,
  "photo-editor": PhotoEditorTool,
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "ai-prompt-helper": AIPromptHelperTool,
  "instagram-tiktok-hashtag-generator": InstagramTiktokHashtagGeneratorTool,
  "bio-link-page-generator": BioLinkPageGeneratorTool,
  "html-css-js-playground": HtmlCssJsPlaygroundTool,
  "background-remover": BackgroundRemoverTool,
  "qr-code-studio": QrCodeStudioTool,
  "pdf-to-excel": PdfToExcelTool,
  "pdf-to-powerpoint": PdfToPowerPointTool,
  "pdf-to-html": PdfToHtmlTool,
  "pdf-to-text": PdfToTextTool,
  "pdf-to-png": PdfToPngTool,
  "png-to-pdf": PngToPdfTool,
  "html-to-pdf": HtmlToPdfTool,
  "text-to-pdf": TextToPdfTool,
  'epub-to-pdf': EpubToPdfTool,
  'pdf-to-epub': PdfToEpubTool,
  'flatten-pdf': FlattenPdfTool,
  'sign-pdf': SignPdfTool,
  'redact-pdf': RedactPdfTool,
  'repair-pdf': RepairPdfTool,
  'scan-to-pdf': ScanToPdfTool,
  'crop-image': CropImageTool,
  'rotate-image': RotateImageTool,
  'flip-image': FlipImageTool,
  'image-converter': ImageConverterTool,
  'image-metadata-viewer': ImageMetadataViewerTool,
  'image-metadata-remover': ImageMetadataRemoverTool,
  'color-picker-from-image': ColorPickerFromImageTool,
  'color-palette-generator-from-image': ColorPaletteGeneratorFromImageTool,
  'ai-image-upscaler': AiImageUpscalerTool,
  'blur-faces-in-image': BlurFacesInImageTool,
  'watermark-image': WatermarkImageTool,
  'pixelate-image': PixelateImageTool,
  'blur-image': BlurImageTool,
  'heic-to-jpg': HeicToJpgTool,
  'svg-to-png': SvgToPngTool,
  'favicon-generator': FaviconGeneratorTool,
  'png-to-svg': PngToSvgTool,
  'svg-optimizer': SvgOptimizerTool,
  'convert-to-webp': ConvertToWebpTool,
  'convert-to-png': ConvertToPngTool,
  'convert-to-jpg': ConvertToJpgTool,
  'convert-to-svg': ConvertToSvgTool,
  'convert-to-gif': ConvertToGifTool,
  'ico-to-png': IcoToPngTool,
  'ai-image-generator': AiImageGeneratorTool,
  'meme-generator': MemeGeneratorTool,
  'image-to-base64': ImageToBase64Tool,
  'base64-to-image': Base64ToImageTool,
  'mortgage-calculator-uk': MortgageCalculatorUkTool,
  'database-anonymizer': DatabaseAnonymizerTool,
  'text-to-speech': TextToSpeechTool,
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const toolMarkdownCache = new Map<string, matter.GrayMatterFile<string> | null>();

// Helper function to read markdown content for tools
function getMarkdownContent(slug: string, locale: string) {
  try {
    let targetPath = path.join(process.cwd(), "content", "tools", locale, `${slug}.md`);

    // Fallback to english if language file is missing
    if (!fs.existsSync(targetPath)) {
      const fallbackPath = path.join(process.cwd(), "content", "tools", "en", `${slug}.md`);
      if (fs.existsSync(fallbackPath)) {
        targetPath = fallbackPath;
      } else {
        return null;
      }
    }

    if (toolMarkdownCache.has(targetPath)) {
      return toolMarkdownCache.get(targetPath)!;
    }

    const fileContent = fs.readFileSync(targetPath, "utf-8");
    const parsed = matter(fileContent);
    parsed.data = parsed.data || {};

    // Extract leading H1 from markdown body if frontmatter title is missing, and strip leading H1 to avoid duplicate <h1>
    const leadingH1Match = parsed.content.match(/^\s*#\s+([^\r\n]+)\r?\n*/);
    if (leadingH1Match) {
      const extractedH1 = leadingH1Match[1]
        .replace(/\*\*/g, '')
        .split(/\s*[:|–—]\s*/)[0]
        .trim();
      if (!parsed.data.title && extractedH1) {
        parsed.data.title = extractedH1;
      }
      parsed.content = parsed.content.slice(leadingH1Match[0].length).trim();
    }

    if (!parsed.data.title && typeof parsed.data.metaTitle === 'string') {
      parsed.data.title = parsed.data.metaTitle.split(/\s*[|–—-]\s*/)[0].trim();
    }
    if (!parsed.data.shortDescription) {
      if (typeof parsed.data.description === 'string' && parsed.data.description.trim()) {
        parsed.data.shortDescription = parsed.data.description.trim();
      } else if (typeof parsed.data.metaDescription === 'string' && parsed.data.metaDescription.trim()) {
        parsed.data.shortDescription = parsed.data.metaDescription.trim();
      }
    }

    toolMarkdownCache.set(targetPath, parsed);
    return parsed;
  } catch (e) {
    console.error("Error reading markdown for tool", slug, locale, e);
    return null;
  }
}

// Locale-specific path segments for /tools/[slug] as defined in i18n/routing.ts
const toolPathSegments: Record<string, string> = {
  en: 'tools',
  es: 'herramientas',
  fr: 'outils',
  de: 'werkzeuge',
};

const toolPageTranslations: Record<string, {
  home: string;
  developerTools: string;
  howToUse: (title: string) => string;
  step: string;
  realExamples: string;
  faq: string;
  keyFeatures: string;
  commonUseCases: string;
  relatedTools: string;
  moreToolsHeading: string;
  viewAllTools: string;
  guideBadge: string;
  guideCta: string;
  minRead: string;
  collectionsHeading: string;
  viewAllCollections: string;
}> = {
  en: {
    home: "Home",
    developerTools: "Developer Tools",
    howToUse: (title) => `How to Use ${title}`,
    step: "Step",
    realExamples: "Real Examples",
    faq: "Frequently Asked Questions",
    keyFeatures: "Key Features",
    commonUseCases: "Common Use Cases",
    relatedTools: "Related Tools",
    moreToolsHeading: "Explore More Tools in This Category",
    viewAllTools: "View All Developer & Utility Tools",
    guideBadge: "In-Depth Technical Guide",
    guideCta: "Read Complete Guide",
    minRead: "min read",
    collectionsHeading: "Curated Workflow Toolkits",
    viewAllCollections: "Explore all toolkits",
  },
  es: {
    home: "Inicio",
    developerTools: "Herramientas de Desarrollador",
    howToUse: (title) => `Cómo usar ${title}`,
    step: "Paso",
    realExamples: "Ejemplos Reales",
    faq: "Preguntas Frecuentes",
    keyFeatures: "Características Principales",
    commonUseCases: "Casos de Uso Comunes",
    relatedTools: "Herramientas Relacionadas",
    moreToolsHeading: "Explorar Más Herramientas de Esta Categoría",
    viewAllTools: "Ver Todas las Herramientas",
    guideBadge: "Guía Técnica Detallada",
    guideCta: "Leer la Guía Completa",
    minRead: "min de lectura",
    collectionsHeading: "Paquetes de Herramientas",
    viewAllCollections: "Ver todas las colecciones",
  },
  de: {
    home: "Startseite",
    developerTools: "Entwickler-Tools",
    howToUse: (title) => `Anleitung: ${title} verwenden`,
    step: "Schritt",
    realExamples: "Praxisbeispiele",
    faq: "Häufig gestellte Fragen (FAQ)",
    keyFeatures: "Hauptmerkmale",
    commonUseCases: "Typische Anwendungsbereiche",
    relatedTools: "Verwandte Tools",
    moreToolsHeading: "Weitere Tools in dieser Kategorie entdecken",
    viewAllTools: "Alle Entwickler-Tools anzeigen",
    guideBadge: "Ausführlicher Technik-Ratgeber",
    guideCta: "Vollständigen Ratgeber Lesen",
    minRead: "Min. Lesezeit",
    collectionsHeading: "Kuratierte Workflow-Toolkits",
    viewAllCollections: "Alle Sammlungen entdecken",
  },
  fr: {
    home: "Accueil",
    developerTools: "Outils Développeur",
    howToUse: (title) => `Comment utiliser ${title}`,
    step: "Étape",
    realExamples: "Exemples Concrets",
    faq: "Foire Aux Questions (FAQ)",
    keyFeatures: "Fonctionnalités Clés",
    commonUseCases: "Cas d'Utilisation Fréquents",
    relatedTools: "Outils Connexes",
    moreToolsHeading: "Découvrir Plus d'Outils dans Cette Catégorie",
    viewAllTools: "Voir Tous les Outils",
    guideBadge: "Guide Technique Complet",
    guideCta: "Lire le Guide Complet",
    minRead: "min de lecture",
    collectionsHeading: "Packs d'Outils Thématiques",
    viewAllCollections: "Explorer toutes les collections",
  }
};

// SSG configuration — fully static, no revalidation needed.
// All tool data lives in TypeScript source files (lib/data/tools/).
// Content only changes when code is deployed, so revalidate=false (build-time only)
// eliminates all ISR background re-renders, saving Vercel free tier limits.
export const revalidate = false;
export const dynamicParams = false;

// SSG: pre-render every locale × tool slug combination at build time
// This produces static HTML served from CDN edge — much better LCP than SSR
export function generateStaticParams() {
  return Object.keys(allToolsConfig).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  const config = getToolConfig(slug);
  if (!config) return {};

  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  const mdData = getMarkdownContent(slug, locale);

  const rawMetaTitle = mdData?.data?.metaTitle || mdData?.data?.title || config.title;
  const metaTitle = rawMetaTitle.replace(/\s*\|\s*Nexus.*$/i, '').trim();
  const metaDescription = mdData?.data?.metaDescription || mdData?.data?.shortDescription || config.shortDescription;
  const metaKeywords = mdData?.data?.metaKeywords || config.keywords.join(", ");

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/tools/[slug]', locale, slug),
  };
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = await params;
  const { locale, slug: resolvedSlug } = resolvedParams;
  setRequestLocale(locale);
  const config = getToolConfig(resolvedSlug);

  if (!config) {
    notFound();
  }

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net').replace(/\/$/, '');
  const { getCanonicalUrl, canonicalizeInternalHref } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/tools/[slug]', locale, config.slug);

  const ToolComponent = toolComponents[config.slug];

  if (!ToolComponent) {
    return <div className="p-8 text-center">Tool component not found for this slug.</div>;
  }

  const mdData = getMarkdownContent(resolvedSlug, locale);
  const hasLocalizedMd = fs.existsSync(path.join(process.cwd(), "content", "tools", locale, `${resolvedSlug}.md`));
  const localizedData = (locale === 'en' || hasLocalizedMd) ? mdData?.data : undefined;

  const pageTitle = localizedData?.title || config.title;
  const pageShortDesc = localizedData?.shortDescription || config.shortDescription;
  const rawLongDesc = (locale === 'en' || hasLocalizedMd) ? (mdData?.content || config.longDescription) : '';

  const {
    enrichedMarkdown: pageLongDesc,
    localizedExamples: pageExamples,
    resolvedFaqs: pageFaqs,
    resolvedHowToSteps: pageHowToSteps,
    resolvedFeatures: pageFeatures,
    resolvedUseCases: pageUseCases,
  } = enrichToolSeoContent({
    config,
    locale,
    localizedTitle: pageTitle,
    localizedShortDesc: pageShortDesc,
    rawMarkdown: rawLongDesc,
    hasLocalizedMd,
    localizedFeatures: localizedData?.features,
    localizedUseCases: localizedData?.useCases,
    localizedFaqs: localizedData?.faqs,
    localizedHowToSteps: localizedData?.howToSteps,
  });
  const reviewerByline = getLocalizedReviewerByline(config.category || 'Engineering', locale, '2026-10-01');
  const ioLabels: Record<string, { input: string; output: string }> = {
    en: { input: 'Input', output: 'Output' },
    es: { input: 'Entrada', output: 'Salida' },
    fr: { input: 'Entrée', output: 'Sortie' },
    de: { input: 'Eingabe', output: 'Ausgabe' },
  };
  const io = ioLabels[locale] || ioLabels.en;

  const t = toolPageTranslations[locale] || toolPageTranslations.en;
  const toolsSegment = toolPathSegments[locale] || 'tools';
  const currentToolHref = `/${locale}/${toolsSegment}/${config.slug}`;

  // Companion guide lookup (matches exact tool guide or category-matched tool guide)
  const relatedGuide = getGuideForTool(config.slug, config.category);
  const localizedGuide = relatedGuide ? getLocalizedGuide(relatedGuide, locale) : null;
  const guideSlug = relatedGuide ? (relatedGuide.slugs?.[locale as keyof typeof relatedGuide.slugs] || relatedGuide.slug) : null;

  // Curated workflow collections lookup for bidirectional internal linking
  const relatedCollections = getCollectionsForSlug(config.slug, config.category, 2);

  // Circular window of 8 sibling tools in the same category (guarantees uniform internal link graph degree across all 135 tools)
  const allToolsList = Object.values(allToolsConfig);
  const categoryTools = allToolsList.filter((item) => item.category === config.category);
  const currentCategoryIdx = Math.max(0, categoryTools.findIndex((item) => item.slug === config.slug));
  const siblingTools: typeof allToolsList = [];
  const seenSlugs = new Set<string>([config.slug]);

  for (let offset = 1; offset < categoryTools.length && siblingTools.length < 8; offset++) {
    const candidate = categoryTools[(currentCategoryIdx + offset) % categoryTools.length];
    if (candidate && !seenSlugs.has(candidate.slug)) {
      seenSlugs.add(candidate.slug);
      siblingTools.push(candidate);
    }
  }
  if (siblingTools.length < 8) {
    const currentGlobalIdx = Math.max(0, allToolsList.findIndex((item) => item.slug === config.slug));
    for (let offset = 1; offset < allToolsList.length && siblingTools.length < 8; offset++) {
      const candidate = allToolsList[(currentGlobalIdx + offset) % allToolsList.length];
      if (candidate && !seenSlugs.has(candidate.slug)) {
        seenSlugs.add(candidate.slug);
        siblingTools.push(candidate);
      }
    }
  }

  // Generate Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t.home, "item": getCanonicalUrl('/', locale) },
      { "@type": "ListItem", "position": 2, "name": t.developerTools, "item": getCanonicalUrl('/tools', locale) },
      { "@type": "ListItem", "position": 3, "name": pageTitle, "item": canonicalUrl }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageFaqs.map((q: any) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageTitle,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": pageShortDesc,
    "url": canonicalUrl,
    "inLanguage": locale,
    "dateModified": reviewerByline.lastUpdated,
    "author": {
      "@type": "Organization",
      "name": "NexusCalculator",
      "url": baseUrl
    },
    "reviewedBy": {
      "@type": "Person",
      "name": "MD Abu Hanif Mia"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // HowTo schema — unlocks step-by-step rich results in Google Search
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": t.howToUse(pageTitle),
    "description": pageShortDesc,
    "url": canonicalUrl,
    "step": pageHowToSteps.map((stepText: string, index: number) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `${t.step} ${index + 1}`,
      "text": stepText
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">{t.home}</Link>
          <ChevronRight size={14} />
          <Link href="/tools" className="hover:text-[#518231] transition-colors">{t.developerTools}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{pageTitle}</span>
        </nav>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SEO Hero Section */}
        <section className="text-center py-8 max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400">
            {pageShortDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
            <FavoriteButton
              slug={config.slug}
              title={pageTitle}
              type="developer-tool"
              href={currentToolHref}
            />
            <span>•</span>
            <span>
              <strong className="text-slate-700 dark:text-slate-300">{reviewerByline.reviewedBy} MD Abu Hanif Mia</strong> ({reviewerByline.verifiedBadge})
            </span>
          </div>
        </section>

        <ToolVisitTracker
          slug={config.slug}
          title={pageTitle}
          type="developer-tool"
          href={currentToolHref}
        />

        {/* Main Tool Interface */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-2 sm:p-6 lg:p-8">
          <NextIntlClientProvider
            locale={locale}
            messages={await getMessages().then((m: any) => ({
              Tools: m?.Tools,
              tools: m?.tools,
              HmacGenerator: m?.HmacGenerator,
              PasswordGenerator: m?.PasswordGenerator,
              QrCodeGenerator: m?.QrCodeGenerator,
            }))}
          >
            <ToastProvider>
              <ToolComponent />
            </ToastProvider>
          </NextIntlClientProvider>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          <div className="lg:col-span-2 space-y-12">
            {/* Companion Guide Callout */}
            {localizedGuide && guideSlug && (
              <aside aria-label="Technical Guide" className="p-6 md:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-[#518231]/10 dark:via-slate-900 dark:to-slate-900/60 rounded-2xl border border-[#518231]/25 dark:border-[#518231]/35 shadow-sm relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
                      {t.guideBadge}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {localizedGuide.readingTime} {t.minRead}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                  {localizedGuide.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                  {localizedGuide.description}
                </p>
                <div>
                  <Link
                    href={{ pathname: '/guides/[slug]', params: { slug: guideSlug } }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white text-sm font-semibold shadow-sm transition-all hover:gap-3"
                  >
                    <span>{t.guideCta}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </aside>
            )}

            {/* Explanation / SEO Article */}
            <section className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-[#518231] prose-a:text-[#518231]">
              <ReactMarkdown
                components={{
                  h1({ node, children, ...props }: any) {
                    return <h2 {...props}>{children}</h2>;
                  },
                  a({ node, href, children, ...props }: any) {
                    const resolvedHref = canonicalizeInternalHref(href, locale);
                    return (
                      <a href={resolvedHref} {...props}>
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {pageLongDesc}
              </ReactMarkdown>
            </section>

            {/* In-Article Horizontal Ad (Non-intrusive) */}
            <div className="w-full flex justify-center py-4">
              <div className="w-full max-w-[728px]">
                <AdSenseContainer slot="tools_content_middle" style={{ minHeight: '90px' }} />
              </div>
            </div>

            {/* How To Use */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="text-[#518231]" /> {t.howToUse(pageTitle)}
              </h2>
              <div className="grid gap-4">
                {pageHowToSteps.map((step: string, idx: number) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 mt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Real Examples */}
            {pageExamples.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Code className="text-[#518231]" /> {t.realExamples}
                </h2>
                <div className="space-y-8">
                  {pageExamples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800">
                      <div className="px-6 py-4 bg-slate-800 border-b border-slate-700">
                        <h3 className="text-lg font-bold text-white">{ex.title}</h3>
                        <p className="text-sm text-slate-400">{ex.description}</p>
                      </div>
                      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                        <div className="p-4">
                          <div className="text-xs font-semibold text-slate-500 mb-2 uppercase">{io.input}</div>
                          <pre className="text-sm text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded-lg custom-scrollbar"><code>{ex.input}</code></pre>
                        </div>
                        <div className="p-4">
                          <div className="text-xs font-semibold text-[#518231] mb-2 uppercase">{io.output}</div>
                          <pre className="text-sm text-green-400 overflow-x-auto p-2 bg-slate-950 rounded-lg custom-scrollbar"><code>{ex.output}</code></pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="text-[#518231]" /> {t.faq}
              </h2>
              <div className="space-y-4">
                {pageFaqs.map((faq: any, idx: number) => (
                  <details key={idx} className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-slate-900 dark:text-white list-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronRight className="transform group-open:rotate-90 transition-transform text-slate-400" />
                    </summary>
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Features */}

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="text-amber-500" /> {t.keyFeatures}
              </h3>
              <ul className="space-y-3">
                {pageFeatures.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="text-blue-500" /> {t.commonUseCases}
              </h3>
              <ul className="space-y-3">
                {pageUseCases.map((useCase: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Tools */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t.relatedTools}</h3>
              <div className="space-y-2">
                {config.relatedTools.map((tool, idx) => {
                  // Link-integrity guard: only emit links that resolve to a real page.
                  // A slug can be a developer tool OR a calculator (e.g. UK mortgage tool → calculators).
                  const isTool = Boolean(allToolsConfig[tool.slug]);
                  const isCalc = !isTool && Boolean(getCalculatorBySlug(tool.slug));
                  if (!isTool && !isCalc) return null;
                  const relatedMd = isTool ? getMarkdownContent(tool.slug, locale) : null;
                  const localizedToolName = isCalc
                    ? getLocalizedCalcMeta(tool.slug, locale, tool.name).title
                    : (relatedMd?.data?.title || tool.name);
                  return (
                    <Link
                      key={idx}
                      href={isCalc
                        ? ({ pathname: '/calculators/[slug]', params: { slug: tool.slug } } as any)
                        : { pathname: '/tools/[slug]', params: { slug: tool.slug } }}
                      className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-lg hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group"
                    >
                      <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#518231] transition-colors">{localizedToolName}</span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-[#518231] group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Curated Workflow Collections */}
            {relatedCollections.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#518231]" /> {t.collectionsHeading}
                  </h3>
                  <Link
                    href={resolveIntlHref('/collections')}
                    className="text-xs font-bold text-[#518231] hover:underline"
                  >
                    {t.viewAllCollections}
                  </Link>
                </div>
                <div className="space-y-3">
                  {relatedCollections.map((col) => {
                    const colTr = col.translations?.[locale];
                    const colTitle = colTr?.title || col.title;
                    const colDesc = colTr?.description || col.description;
                    return (
                      <Link
                        key={col.slug}
                        href={resolveIntlHref(`/collections/${col.slug}`)}
                        className="group block p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-[#518231]/35 transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                            {colTitle}
                          </span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-[#518231] group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                          {colDesc}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ad Placement Sidebar */}
            <div className="sticky top-24 pt-4">
              <AdSenseContainer slot="tools_sidebar" />
            </div>
          </div>
        </div>

        {/* Circular Category Sibling Tools Grid (Uniform Internal Link Graph) */}
        {siblingTools.length > 0 && (
          <section className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.moreToolsHeading}</h2>
              <Link
                href="/tools"
                className="text-sm font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] dark:hover:text-[#518231] hover:underline inline-flex items-center"
              >
                {t.viewAllTools} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siblingTools.map((sibling) => {
                const siblingMd = getMarkdownContent(sibling.slug, locale);
                const siblingTitle = siblingMd?.data?.title || sibling.title;
                const siblingDesc = siblingMd?.data?.shortDescription || sibling.shortDescription;
                return (
                  <Link
                    key={sibling.slug}
                    href={{ pathname: '/tools/[slug]', params: { slug: sibling.slug } }}
                    className="group flex flex-col bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
                      {siblingTitle}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {siblingDesc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
