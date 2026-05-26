import { FileText, Shield, Zap, Palette, Wrench, Users, TrendingUp, DollarSign, Heart, Hash, Grid3X3, Briefcase, File, Image as ImageIcon, Lock, Settings } from "lucide-react";

export const sitemapCategories = [
  {
    title: "Financial Calculators",
    id: "financial",
    icon: DollarSign,
    description: "Explore our free suite of financial tools to accurately calculate mortgages, auto loans, ROI, and retirement planning.",
    links: [
      "Mortgage Calculator", "Savings Calculator", "Loan Calculator", "Auto Loan Calculator", "Interest Calculator",
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
      "Marriage Tax Calculator", "Pension Calculator", "Annuity Calculator", "Credit Card Calculator",
      "Debt Payoff Calculator", "Repayment Calculator", "College Cost Calculator", "CD Calculator",
      "Mutual Fund Calculator", "IRA Calculator", "VAT Calculator", "Auto Lease Calculator",
      "Average Return Calculator", "Discount Calculator", "Debt-to-Income Ratio Calculator",
      "Take-Home-Paycheck Calculator", "Boat Loan Calculator", "Refinance Calculator", "Rental Property Calculator",
      "ROI Calculator", "FHA Loan Calculator", "Home Equity Loan Calculator", "Down Payment Calculator",
      "Payback Period Calculator", "Future Value Calculator", "Mortgage Calculator UK", "Mortgage Amortization Calculator"
    ]
  },
  {
    title: "Fitness and Health Calculators",
    id: "fitness",
    icon: Heart,
    description: "Achieve your wellness goals with calculators for BMI, daily calories, macronutrients, and pregnancy tracking.",
    links: [
      "BMI Calculator", "Calorie Calculator", "Body Fat Calculator", "BMR Calculator",
      "Ideal Weight Calculator", "Pace Calculator", "Pregnancy Calculator", "Pregnancy Conception Calculator",
      "Due Date Calculator", "Macro Calculator", "Carbohydrate Calculator", "Healthy Weight Calculator",
      "One Rep Max Calculator", "Protein Calculator", "TDEE Calculator", "Conception Calculator",
      "GFR Calculator", "Body Surface Area Calculator", "Anorexic BMI Calculator", "Overweight Calculator",
      "Pregnancy Weight Gain Calculator", "Army Body Fat Calculator", "Lean Body Mass Calculator",
      "Calories Burned Calculator", "Target Heart Rate Calculator", "Fat Intake Calculator", "Ovulation Calculator",
      "Period Calculator", "Body Type Calculator", "BAC Calculator", "Weight Watcher Points Calculator"
    ]
  },
  {
    title: "Math Calculators",
    id: "math",
    icon: Hash,
    description: "Solve complex mathematical equations, geometry problems, and statistical analysis with precision.",
    links: [
      "Graphing Calculator", "Scientific Calculator", "Fraction Calculator", "Percentage Calculator", "Random Number Generator",
      "Triangle Calculator", "Standard Deviation Calculator", "Volume Calculator", "Percent Error Calculator",
      "Scientific Notation Calculator", "Binary Calculator", "Half-Life Calculator", "Slope Calculator", "Area Calculator", "Probability Calculator",
      "Mean, Median, Mode, Range Calculator", "Z-score Calculator", "Ratio Calculator", "Circle Calculator",
      "Pythagorean Theorem Calculator", "Root Calculator", "Greatest Common Factor Calculator", "Rounding Calculator",
      "Prime Factorization Calculator", "Basic Calculator", "Average Calculator",
      "Number Sequence Calculator", "Exponent Calculator", "Hex Calculator", "Quadratic Formula Calculator",
      "Log Calculator", "Sample Size Calculator", "Statistics Calculator", "Permutation and Combination Calculator",
      "Confidence Interval Calculator", "Distance Calculator", "Surface Area Calculator", "Right Triangle Calculator",
      "Least Common Multiple Calculator", "Factor Calculator", "Matrix Calculator", "Big Number Calculator",
      "Common Factor Calculator", "Long Division Calculator", "P-Value Calculator"
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
      "Password Generator", "Conversion Calculator", "Height Calculator", "IP Subnet Calculator",
      "Voltage Drop Calculator", "Square Footage Calculator", "Time Zone Calculator", "GDP Calculator",
      "Horsepower Calculator", "Stair Calculator", "Ohms Law Calculator", "Shoe Size Conversion",
      "Mileage Calculator", "Mass Calculator", "Speed Calculator", "Molecular Weight Calculator",
      "Golf Handicap Calculator", "Tire Size Calculator", "Tile Calculator", "Gravel Calculator",
      "Heat Index Calculator", "Bandwidth Calculator", "URL Encode / Decode", "Day Counter",
      "Bra Size Calculator", "Dice Roller", "Fuel Cost Calculator", "BTU Calculator", "Time Card Calculator",
      "Love Calculator", "Gas Mileage Calculator", "Engine Horsepower Calculator", "Resistor Calculator",
      "Electricity Calculator", "Tip Calculator", "Density Calculator", "Weight Calculator", "Molarity Calculator",
      "Roman Numeral Converter", "Sleep Calculator", "Roofing Calculator", "Mulch Calculator", "Wind Chill Calculator",
      "Dew Point Calculator", "Base64 Encode / Decode", "Time Duration Calculator", "Day of the Week Calculator"
    ]
  },
  {
    title: "Calculators for Your Site",
    id: "site-calculators",
    icon: Briefcase,
    description: "Embed our free, high-performance calculators directly into your own website or blog.",
    links: [
      "Mortgage Calculator for Your Site", "Scientific Calculator for Your Site", "Concrete Calculator for Your Site",
      "Math Calculator for Your Site", "Love Calculator for Your Site"
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
      { name: "JSON Formatter", desc: "Format and indent JSON data" },
      { name: "JSON Validator", desc: "Validate your JSON strings" },
      { name: "HTML Formatter", desc: "Format HTML code" },
      { name: "CSS Beautifier", desc: "Beautify CSS styles" },
      { name: "JS Beautifier", desc: "Format JS code" },
      { name: "XML Formatter", desc: "Format XML documents" },
      { name: "Markdown Previewer", desc: "Preview Markdown instantly" },
      { name: "SQL Formatter", desc: "Format SQL queries" },
      { name: "YAML Formatter", desc: "Format YAML files" },
      { name: "CSV Viewer", desc: "View CSV data as table" },
      { name: "Diff Checker", desc: "Compare text differences" },
    ]
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
      { name: "QR Code Generator", desc: "Create QR codes" },
    ]
  },
  {
    title: "Generators",
    icon: Zap,
    id: "generators",
    description: "Instantly create UUIDs, mock user data, passwords, API mock data, and HTML tables.",
    items: [
      { name: "UUID Generator", desc: "Generate UUIDs v4" },
      { name: "Slug Generator", desc: "Create URL-friendly slugs" },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text" },
      { name: "Fake User Data Generator", desc: "Generate mock user data" },
      { name: "Random Number Generator", desc: "Generate random numbers" },
      { name: "Random String Generator", desc: "Generate random strings" },
      { name: "Username Generator", desc: "Generate random usernames" },
      { name: "API Mock Data Generator", desc: "Create mock API responses" },
      { name: "Strong Password Generator", desc: "Create strong passwords" },
      { name: "HTML Table Generator", desc: "Generate HTML tables" },
    ]
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
      { name: "Color Palette Generator", desc: "Generate color schemes" },
    ]
  },
  {
    title: "Web Dev Utilities",
    icon: Wrench,
    id: "web-dev-utilities",
    description: "Essential utilities like SEO tag generators, Minifiers, HTTP header checkers, and IP lookups.",
    items: [
      { name: "Meta Tag Generator", desc: "Generate HTML meta tags" },
      { name: "Open Graph Generator", desc: "Generate OG tags" },
      { name: "Twitter Card Generator", desc: "Generate Twitter cards" },
      { name: "robots.txt Generator", desc: "Create robots.txt files" },
      { name: "sitemap.xml Generator", desc: "Generate XML sitemaps" },
      { name: ".htaccess Generator", desc: "Generate Apache .htaccess" },
      { name: "CSS Minifier", desc: "Minify CSS code" },
      { name: "JS Minifier", desc: "Minify JavaScript code" },
      { name: "HTML Minifier", desc: "Minify HTML code" },
      { name: "Responsive Screen Tester", desc: "Test responsive designs" },
      { name: "HTTP Header Checker", desc: "Check HTTP response headers" },
      { name: "Redirect Checker", desc: "Check URL redirects" },
      { name: "Website Screenshot Tool", desc: "Capture website screenshots" },
      { name: "DNS Lookup", desc: "Perform DNS lookups" },
      { name: "IP Lookup", desc: "Find IP address details" },
      { name: "User Agent Parser", desc: "Parse User Agent strings" },
      { name: "MIME Type Checker", desc: "Check MIME types" },
    ]
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
      { name: "Compress PDF", desc: "Reduce PDF file size" },
      { name: "Edit PDF", desc: "Edit text and images in PDF" },
      { name: "Rotate PDF", desc: "Rotate pages in a PDF" },
      { name: "Extract Pages", desc: "Extract specific pages" },
      { name: "Repair PDF", desc: "Repair corrupted PDF files" },
      { name: "Add Page Numbers", desc: "Insert page numbers in PDF" },
    ]
  },
  {
    title: "Convert from PDF",
    icon: FileText,
    id: "convert-from-pdf",
    description: "Convert PDF files into editable formats and images.",
    items: [
      { name: "PDF to Word", desc: "Convert PDF to Word document" },
      { name: "PDF to Excel", desc: "Convert PDF to Excel spreadsheet" },
      { name: "PDF to PPT", desc: "Convert PDF to PowerPoint presentation" },
      { name: "PDF to JPG", desc: "Extract images from PDF" },
      { name: "PDF to PNG", desc: "Convert PDF to PNG images" },
      { name: "PDF to Text", desc: "Extract text from PDF" },
      { name: "PDF to HTML", desc: "Convert PDF to HTML webpage" },
    ]
  },
  {
    title: "Convert to PDF",
    icon: Settings,
    id: "convert-to-pdf",
    description: "Convert various file formats into standard PDF documents.",
    items: [
      { name: "Word to PDF", desc: "Convert Word to PDF" },
      { name: "Excel to PDF", desc: "Convert Excel to PDF" },
      { name: "PPT to PDF", desc: "Convert PowerPoint to PDF" },
      { name: "JPG to PDF", desc: "Convert JPG images to PDF" },
      { name: "PNG to PDF", desc: "Convert PNG images to PDF" },
      { name: "HTML to PDF", desc: "Convert HTML webpage to PDF" },
      { name: "TXT to PDF", desc: "Convert Text document to PDF" },
    ]
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
      { name: "Flatten PDF", desc: "Flatten forms and annotations" },
    ]
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
      { name: "Compress Image", desc: "Reduce image file size" },
      { name: "Resize Image", desc: "Change image dimensions" },
      { name: "Crop Image", desc: "Crop and trim images" },
      { name: "Rotate Image", desc: "Rotate image orientation" },
      { name: "Flip Image", desc: "Flip images horizontally or vertically" },
      { name: "Watermark Image", desc: "Add custom watermark to image" },
      { name: "Blur Image", desc: "Blur faces or objects in image" },
      { name: "Pixelate Image", desc: "Pixelate parts of an image" },
    ]
  },
  {
    title: "Image Conversion",
    icon: ImageIcon,
    id: "image-conversion",
    description: "Convert between various image formats easily.",
    items: [
      { name: "HEIC to JPG", desc: "Convert iPhone HEIC to JPG" },
      { name: "SVG to PNG", desc: "Convert vector SVG to PNG" },
      { name: "PNG to SVG", desc: "Convert raster PNG to SVG" },
      { name: "Convert to WEBP", desc: "Convert images to WEBP" },
      { name: "Convert to PNG", desc: "Convert images to PNG" },
      { name: "Convert to JPG", desc: "Convert images to JPG" },
      { name: "Convert to SVG", desc: "Convert images to SVG" },
      { name: "Convert to GIF", desc: "Convert images to GIF" },
      { name: "ICO to PNG", desc: "Convert favicon ICO to PNG" },
    ]
  },
  {
    title: "Advanced Tools",
    icon: Wrench,
    id: "advanced-image-tools",
    description: "Advanced utilities for developers and designers.",
    items: [
      { name: "AI Image Generator", desc: "Generate images with AI text prompts" },
      { name: "Meme Generator", desc: "Create custom memes with text" },
      { name: "Image to Base64", desc: "Convert image to Base64 string" },
      { name: "Base64 to Image", desc: "Decode Base64 to image" },
      { name: "Remove Background", desc: "Remove image background" },
      { name: "Color Extractor", desc: "Extract color palette" },
      { name: "Image Upscaler", desc: "Upscale image resolution using AI" },
    ]
  }
];

