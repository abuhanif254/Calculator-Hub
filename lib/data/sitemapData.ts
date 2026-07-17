import { FileText, Shield, Zap, Palette, Wrench, Users, TrendingUp, DollarSign, Heart, Hash, Grid3X3, Briefcase, File, Image as ImageIcon, Lock, Settings } from "lucide-react";

export const sitemapCategories = [
  {
    title: "Financial Calculators",
    id: "financial",
    icon: DollarSign,
    description: "Explore our free suite of financial tools to accurately calculate mortgages, auto loans, ROI, and retirement planning.",
    links: [
      "Mortgage Calculator", "Mortgage Calculator UK", "Savings Calculator", "Loan Calculator", "Auto Loan Calculator", "Interest Calculator",
      "Payment Calculator", "Retirement Calculator", "Amortization Calculator", "Investment Calculator",
      "Inflation Calculator", "Finance Calculator", "Income Tax Calculator", "Compound Interest Calculator",
      "Salary Calculator", "Interest Rate Calculator", "Sales Tax Calculator", "Currency Calculator",
      "House Affordability Calculator", "Rent Calculator", "Estate Tax Calculator", "Social Security Calculator",
      "Annuity Payout Calculator", "Credit Cards Payoff Calculator", "Debt Consolidation Calculator",
      "Student Loan Calculator", "Simple Interest Calculator", "Bond Calculator", "Roth IRA Calculator",
      "RMD Calculator", "Cash Back or Low Interest Calculator", "Depreciation Calculator", "Margin Calculator",
      "Business Loan Calculator", "Real Estate Calculator", "Personal Loan Calculator", "Lease Calculator",
      "Budget Calculator", "IRR Calculator", "APR Calculator", "VA Mortgage Calculator", "HELOC Calculator",
      "Rent vs. Buy Calculator", "Present Value Calculator", "Commission Calculator", 
      "Percent Off Calculator", "Mortgage Payoff Calculator", "401K Calculator", "Canadian Mortgage Calculator",
      "Marriage Tax Calculator", "Annuity Calculator",
      "Debt Payoff Calculator", "College Cost Calculator", "CD Calculator",
      "Mutual Fund Calculator", "VAT Calculator",
      "Average Return Calculator", "Debt-to-Income Ratio Calculator", "Boat Loan Calculator", "Rental Property Calculator", "FHA Loan Calculator", "Down Payment Calculator", "Future Value Calculator", "Mortgage Amortization Calculator"
    ]
  },
  {
    title: "Fitness and Health Calculators",
    id: "fitness",
    icon: Heart,
    description: "Achieve your wellness goals with calculators for BMI, daily calories, macronutrients, and pregnancy tracking.",
    links: [
      "Advanced Sleep Cycle Calculator", "BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "BMR Calculator",
      "Ideal Weight Calculator", "Pace Calculator", "Pregnancy Calculator", "Pregnancy Conception Calculator",
      "Due Date Calculator", "Macro Calculator", "Carbohydrate Calculator", "Healthy Weight Calculator", "Ovulation Calculator"]
  },
  {
    title: "Math Calculators",
    id: "math",
    icon: Hash,
    description: "Solve complex mathematical equations, geometry problems, and statistical analysis with precision.",
    links: [
      "Graphing Calculator", "Scientific Calculator", "Fraction Calculator", "Percentage Calculator",
      "Triangle Calculator", "Standard Deviation Calculator", "Volume Calculator", "Percent Error Calculator",
      "Scientific Notation Calculator", "Binary Calculator", "Half-Life Calculator", "Statistics Calculator", "P-Value Calculator"
    ]
  },
  {
    title: "Other Calculators",
    id: "other",
    icon: Grid3X3,
    description: "A wide variety of everyday utility calculators including time, date, conversion, and miscellaneous estimates.",
    links: [
      "Age Calculator", "Date Calculator", "Time Calculator", "Hours Calculator",
      "GPA Calculator", "Grade Calculator", "Concrete Calculator", "Subnet Calculator",
      "Conversion Calculator", "Height Calculator", "IP Subnet Calculator"]
  },
  {
    title: "Calculators for Your Site",
    id: "site-calculators",
    icon: Briefcase,
    description: "Embed our free, high-performance calculators directly into your own website or blog.",
    links: [
    ]
  }
];

export const generalLinks = [
  "Home Page", "About Us", "Privacy Policy", "Terms of Use"
];

export const developerToolsMenu = [
  {
    title: "Text & Formatting",
    icon: FileText,
    id: "text-formatting",
    description: "Format, minify, and validate JSON, HTML, CSS, SQL, and other text-based documents.",
    items: [
      { name: "Word Counter & Character Counter", desc: "Count words, characters, and sentences in real time" },
      { name: "Case Converter", desc: "Convert text letter cases instantly" },
      { name: "JSON Formatter", desc: "Format and indent JSON data" },
      { name: "HTML Formatter", desc: "Format HTML code" },
      { name: "CSS Beautifier", desc: "Beautify CSS styles" },
      { name: "JS Beautifier", desc: "Format JS code" },
      { name: "XML Formatter", desc: "Format XML documents" },
      { name: "Markdown Previewer", desc: "Preview Markdown instantly" },
      { name: "SQL Formatter", desc: "Format SQL queries" },
      { name: "YAML Formatter", desc: "Format YAML files" },
      { name: "CSV Viewer", desc: "View CSV data as table" },
      { name: "Diff Checker", desc: "Compare text differences" }]
  },
  {
    title: "Encoding & Security",
    icon: Shield,
    id: "encoding-security",
    description: "Secure your data with Base64, URL encoders, JWT decoders, and robust hash generators.",
    items: [
      { name: "Base64 Encode", desc: "Encode text to Base64" },
      { name: "Base64 Decode", desc: "Decode Base64 to text" },
      { name: "URL Encoder", desc: "Encode URL characters" },
      { name: "URL Decoder", desc: "Decode URL characters" },
      { name: "JWT Decoder", desc: "Decode JWT tokens" },
      { name: "Hash Generator", desc: "Generate text hashes" },
      { name: "MD5 Generator", desc: "Generate MD5 hashes" },
      { name: "SHA256 Generator", desc: "Generate SHA256 hashes" },
      { name: "Password Generator", desc: "Generate secure passwords" },
      { name: "HMAC Generator", desc: "Generate HMAC codes" },
      { name: "QR Code Studio", desc: "Create advanced custom QR codes" }]
  },
  {
    title: "Generators",
    icon: Zap,
    id: "generators",
    description: "Instantly create UUIDs, mock user data, passwords, API mock data, and HTML tables.",
    items: [
      { name: "AI Prompt Helper & Optimizer", desc: "Optimize prompts for ChatGPT, Claude, and Gemini" },
      { name: "Instagram & TikTok Hashtag Generator", desc: "Generate trending, niche, and viral hashtags for social media posts" },
      { name: "Bio Link Page Generator", desc: "Create a beautiful, mobile-first personal landing page hub" },
      { name: "UUID Generator", desc: "Generate UUIDs v4" },
      { name: "Slug Generator", desc: "Create URL-friendly slugs" },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text" },
      { name: "Fake User Data Generator", desc: "Generate mock user data" },
      { name: "Random Number Generator", desc: "Generate random numbers" },
      { name: "Random String Generator", desc: "Generate random strings" },
      { name: "Username Generator", desc: "Generate random usernames" },
      { name: "API Mock Data Generator", desc: "Create mock API responses" },
      { name: "Strong Password Generator", desc: "Create strong passwords" },
      { name: "HTML Table Generator", desc: "Generate HTML tables" }]
  },
  {
    title: "Color Tools",
    icon: Palette,
    id: "color-tools",
    description: "Design tools including HEX/RGB converters, gradient generators, and Tailwind palettes.",
    items: [
      { name: "HEX to RGB", desc: "Convert HEX to RGB" },
      { name: "RGB to HEX", desc: "Convert RGB to HEX" },
      { name: "Color Picker", desc: "Pick colors from palette" },
      { name: "Gradient Generator", desc: "Create CSS gradients" },
      { name: "Tailwind Color Palette", desc: "Explore Tailwind colors" },
      { name: "CSS Shadow Generator", desc: "Generate box shadows" },
      { name: "Glassmorphism Generator", desc: "Create glass UI effects" },
      { name: "Neumorphism Generator", desc: "Create neomorphic styles" },
      { name: "Contrast Checker", desc: "Check color contrast ratio" },
      { name: "Color Palette Generator", desc: "Generate color schemes" }]
  },
  {
    title: "Web Dev Utilities",
    icon: Wrench,
    id: "web-dev-utilities",
    description: "Essential utilities like SEO tag generators, Minifiers, HTTP header checkers, and IP lookups.",
    items: [
      { name: "HTML / CSS / JavaScript Playground", desc: "Live code editor for frontend development" },
      { name: "Meta Tag Generator", desc: "Generate HTML meta tags" },
      { name: "Open Graph Generator", desc: "Generate OG tags" },
      { name: "Twitter Card Generator", desc: "Generate Twitter cards" },
      { name: "robots.txt Generator", desc: "Create robots.txt files" },
      { name: "sitemap.xml Generator", desc: "Generate XML sitemaps" },
      { name: ".htaccess Generator", desc: "Generate Apache .htaccess" },
      { name: "Responsive Screen Tester", desc: "Test responsive designs" },
      { name: "HTTP Header Checker", desc: "Check HTTP response headers" },
      { name: "Redirect Checker", desc: "Check URL redirects" },
      { name: "Website Screenshot Tool", desc: "Capture website screenshots" },
      { name: "DNS Lookup", desc: "Perform DNS lookups" },
      { name: "IP Lookup", desc: "Find IP address details" },
      { name: "User Agent Parser", desc: "Parse User Agent strings" },
      { name: "MIME Type Checker", desc: "Check MIME types" },
      { name: "Favicon Generator", desc: "Generate website icons and PWA manifests", isNew: true, slug: "favicon-generator" },
      { name: "SVG Optimizer", desc: "Optimize and minify SVG vector images", isNew: true, slug: "svg-optimizer" },
      { name: "Database Dump Anonymizer", desc: "Mask PII in SQL/CSV dumps", isNew: true, slug: "database-anonymizer" }]
  }
];

export const pdfToolsMenu = [
  {
    title: "PDF Manipulation",
    icon: File,
    id: "pdf-manipulation",
    description: "Merge, split, compress, and organize your PDF files easily.",
    items: [
      { name: "Merge PDF", desc: "Combine multiple PDFs into one" },
      { name: "Split PDF", desc: "Extract pages from a PDF" },
      { name: "Organize PDF", desc: "Rearrange, rotate, and manage PDF pages" },
      { name: "Remove PDF Pages", desc: "Delete pages from a PDF document" },
      { name: "Compress PDF", desc: "Reduce PDF file size" },
      { name: "Edit PDF", desc: "Edit text and images in PDF" },
      { name: "Rotate PDF", desc: "Rotate pages in a PDF" },
      { name: "PDF Extract Pages", desc: "Extract specific pages or page ranges from a PDF document" },
      { name: "PDF Crop Pages", desc: "Crop page margins, remove white space, and trim scanned borders" },
      { name: "PDF OCR", desc: "Extract text from scanned PDFs and create searchable documents" },
      { name: "Repair PDF", desc: "Repair corrupted PDF files" },
      { name: "Add Page Numbers to PDF", desc: "Insert page numbers in PDF" },
      { name: "PDF Metadata Editor", desc: "View, edit, and clean PDF document properties and metadata" },
      { name: "PDF Metadata Viewer", desc: "Inspect document properties, view metadata, and check PDF security settings" }]
  },
  {
    title: "Convert from PDF",
    icon: FileText,
    id: "convert-from-pdf",
    description: "Convert PDF files into editable formats and images.",
    items: [
      { name: "PDF to PowerPoint", desc: "Convert PDF presentation to PPTX" },
      { name: "PDF to Excel", desc: "Convert PDF tables to Excel spreadsheets" },
      { name: "PDF to Word", desc: "Convert PDF to Word document" },

      { name: "PDF to JPG", desc: "Extract images from PDF" },
      { name: "PDF to PNG", desc: "Convert PDF to PNG images" },
      { name: "PDF to Text", desc: "Extract text from PDF" },
      { name: "PDF to HTML", desc: "Convert PDF to HTML webpage" },
      { name: "PDF to EPUB", desc: "Convert PDF to EPUB ebook" }]
  },
  {
    title: "Convert to PDF",
    icon: Settings,
    id: "convert-to-pdf",
    description: "Convert various file formats into standard PDF documents.",
    items: [
      { name: "Word to PDF", desc: "Convert Word to PDF" },
      { name: "Excel to PDF", desc: "Convert Excel to PDF" },
      { name: "PowerPoint to PDF", desc: "Convert PowerPoint to PDF" },
      { name: "Image to PDF", desc: "Convert images to PDF" },
      { name: "JPG to PDF", desc: "Convert JPG images to PDF" },
      { name: "PNG to PDF", desc: "Convert PNG images to PDF" },
      { name: "HTML to PDF", desc: "Convert HTML webpage to PDF" },
      { name: "TXT to PDF", desc: "Convert Text document to PDF" },
      { name: "EPUB to PDF", desc: "Convert EPUB ebook to PDF" },
      { name: "Scan to PDF", desc: "Scan documents using your camera to PDF" }]
  },
  {
    title: "PDF Security",
    icon: Lock,
    id: "pdf-security",
    description: "Add passwords, remove restrictions, and secure your PDFs.",
    items: [
      { name: "Protect PDF", desc: "Encrypt with a password" },
      { name: "Unlock PDF", desc: "Remove PDF password" },
      { name: "Sign PDF", desc: "Add digital signature" },
      { name: "Watermark PDF", desc: "Add watermark to PDF" },
      { name: "Redact PDF", desc: "Permanently blackout text" },
      { name: "Flatten PDF", desc: "Flatten forms and annotations" }]
  }
];

export const imageToolsMenu = [
  {
    title: "Image Editing",
    icon: Palette,
    id: "image-editing",
    description: "Compress, resize, and edit your images quickly.",
    items: [
      { name: "Photo Editor", desc: "Advanced online photo editor" },
      { name: 'Image Metadata Viewer', desc: 'Read EXIF data, camera settings, and GPS location securely', isNew: true, slug: 'image-metadata-viewer' },
      { name: 'Image Metadata Remover', desc: 'Remove EXIF data from photos', isNew: true, slug: 'image-metadata-remover' },
      { name: 'Color Picker From Image', desc: 'Extract exact HEX/RGB colors from photos', isNew: true, slug: 'color-picker-from-image' },
      { name: 'Color Palette Generator From Image', desc: 'Extract dominant colors and create designer-ready palettes from photos', isNew: true, slug: 'color-palette-generator-from-image' },
      { name: 'AI Image Upscaler', desc: 'Enhance and upscale images up to 4x using AI', isNew: true, slug: 'ai-image-upscaler' },
      { name: 'Pixelate Image', desc: 'Pixelate faces or censor sensitive data locally', isNew: true, slug: 'pixelate-image' },
      { name: 'Blur Faces in Image', desc: 'Automatically detect and blur faces for privacy', isNew: true, slug: 'blur-faces-in-image' },
      { name: "Watermark Image", desc: "Add custom text, logos, or tiled watermarks", slug: "watermark-image" },
      { name: "Compress Image", desc: "Reduce image file size" },
      { name: "Resize Image", desc: "Change image dimensions" },
      { name: "Crop Image", desc: "Crop and trim images" },
      { name: "Rotate Image", desc: "Rotate image orientation" },
      { name: "Flip Image", desc: "Flip images horizontally or vertically" },
      { name: "Blur Image", desc: "Blur faces or objects in image", isNew: true, slug: "blur-image" }]
  },
  {
    title: "Image Conversion",
    icon: ImageIcon,
    id: "image-conversion",
    description: "Convert between various image formats easily.",
    items: [
      { name: "Image Converter", desc: "Batch convert JPG, PNG, and WEBP" },
      { name: "HEIC to JPG", desc: "Convert iPhone HEIC to JPG", isNew: true, slug: "heic-to-jpg" },
      { name: "SVG to PNG", desc: "Convert vector SVG to PNG", isNew: true, slug: "svg-to-png" },
      { name: "PNG to SVG", desc: "Convert raster PNG to SVG", isNew: true, slug: "png-to-svg" },

      { name: "Convert to WebP", desc: "Convert images to WebP format", isNew: true, slug: "convert-to-webp" },
      { name: "Convert to PNG", desc: "Convert images to PNG format", isNew: true, slug: "convert-to-png" },
      { name: "Convert to JPG", desc: "Convert images to JPG format", isNew: true, slug: "convert-to-jpg" },
      { name: "Convert to SVG", desc: "Convert images to SVG format", isNew: true, slug: "convert-to-svg" },
      { name: "Convert to GIF", desc: "Convert images to GIF format", isNew: true, slug: "convert-to-gif" },
      { name: "ICO to PNG", desc: "Convert favicon ICO to PNG", isNew: true, slug: "ico-to-png" }]
  },
  {
    title: "Advanced Tools",
    icon: Wrench,
    id: "advanced-image-tools",
    description: "Advanced utilities for developers and designers.",
    items: [
      { name: "AI Image Generator", desc: "Generate images with AI text prompts", isNew: true, slug: "ai-image-generator" },
      { name: "Meme Generator", desc: "Create custom memes with text", isNew: true, slug: "meme-generator" },
      { name: "Image to Base64", desc: "Convert image to Base64 string", isNew: true, slug: "image-to-base64" },
      { name: "Base64 to Image", desc: "Decode Base64 to image", slug: "base64-to-image" },
      { name: "Remove Background", desc: "Remove image background", slug: "background-remover" }]
  }
];

