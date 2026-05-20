import { ToolConfig } from './types';

export const qrCodeGeneratorConfig: ToolConfig = {
  slug: "qr-code-generator",
  title: "QR Code Generator & Designer",
  shortDescription: "Generate fully customizable QR codes instantly. Create offline vector SVG or high-resolution PNG QR codes for URLs, WiFi networks, vCards, SMS, emails, social profiles, and crypto wallet addresses with custom colors, gradients, rounded dots, and embedded brand logos.",
  category: "Encoding & Security",
  keywords: [
    "qr code generator", "generate qr code", "custom qr code generator", "free qr creator",
    "qr code with logo", "bulk qr code generator", "wifi qr code generator", "vcard qr code",
    "svg qr code download", "qr code styling", "client side qr code", "vector qr code"
  ],

  longDescription: `
## What is a QR Code?

A **QR Code (Quick Response Code)** is a two-dimensional matrix barcode that stores binary data in a grid of black and white squares. Originally designed to track automotive parts, QR codes have evolved into the primary gateway connecting physical assets to the digital world. Unlike traditional one-dimensional barcodes (UPC codes), which only store a few numbers horizontally, a QR code stores data both vertically and horizontally. This two-dimensional structure allows it to hold up to **7,089 numeric characters** or **4,296 alphanumeric characters**, representing a massive increase in data capacity.

At a beginner-friendly level, a QR code acts like a hyper-efficient printed hyperlink. When you point a smartphone camera or an optical scanner at the grid, the device translates the visual arrangement of squares back into text, web URLs, contact files (vCards), or command triggers.

---

## How QR Codes Work: The Anatomy of a Grid

To understand how a QR code works under the hood, we must analyze its layout. A QR code is not just a random scattering of squares; it is a highly structured grid governed by international standards (ISO/IEC 18004).

### 1. Finder Patterns (Position Detection Markers)
The most recognizable elements of a QR code are the **three large squares in the corners** (top-left, top-right, and bottom-left). These markers allow scanners to instantly identify the presence of a QR code and determine its orientation. Because of these markers, a smartphone can scan a QR code upside down, sideways, or at an angle.

### 2. Alignment Patterns
As QR codes grow in size (versions), they include smaller squares scattered in the grid. These **alignment patterns** act as guideposts to help scanners correct for perspective distortion when a QR code is printed on a curved surface, like a soda can, or scanned at an extreme angle.

### 3. Timing Patterns
Connecting the finder patterns is a line of alternating black and white modules. These **timing patterns** establish the coordinate system of the grid, allowing the scanner to determine the size of individual modules (cells) and calculate the matrix dimensions.

### 4. Format and Version Information
Surrounding the finder patterns are areas that contain format details, including the selected **error correction level** and the **mask pattern** applied to the data. This allows the scanner to calibrate its decoding algorithm before reading the main payload.

### 5. Quiet Zone
Every QR code requires a margin of solid light space (ideally 4 modules wide) surrounding the entire grid. This **quiet zone** separates the code from surrounding designs, ensuring the scanner does not read adjacent text or graphics as part of the QR code.

---

## History of QR Technology

The QR code was invented in **1994 by Masahiro Hara** from the Japanese company **Denso Wave**, a subsidiary of Toyota. 

At the time, Japanese supermarkets and manufacturing plants were using traditional barcodes. However, barcodes could only store about 20 characters of information, requiring workers to scan multiple barcodes on a single item. Denso Wave needed a barcode that could store kanji, kana, and alphanumeric characters, and be scanned at high speeds.

Masahiro Hara came up with the idea of a two-dimensional grid while playing Go, a strategic board game. He found that a 1:1:3:1:1 ratio of black and white spaces in the position markers was uniquely rare, ensuring that scanners would never mistake surrounding text or packaging designs for a barcode.

In a bold move that accelerated global adoption, Denso Wave chose **not to exercise its patent rights**. They made the technology free and open-source, allowing developers worldwide to build generators and readers, laying the foundation for the QR codes we use today.

---

## Static vs. Dynamic QR Codes

When designing QR codes for business or personal use, it is critical to understand the distinction between static and dynamic codes.

### Static QR Codes
In a **static QR code**, the target data is encoded directly into the matrix. For example, if you encode \`https://nexuscalculator.net\`, the binary representation of that exact text is drawn directly onto the grid.
* **Pros**: Never expires; requires no external servers; completely safe and private.
* **Cons**: The QR code cannot be updated once printed. If the URL changes, the QR code becomes a dead link. Furthermore, storing large amounts of text makes the grid extremely dense and complex, making it harder for older cameras to scan.

### Dynamic QR Codes
A **dynamic QR code** does not encode the final payload directly. Instead, it encodes a shortened redirect URL pointing to a web server. When scanned, the user is temporarily routed to the server, which redirects them to the final destination.
* **Pros**: The destination URL can be changed at any time without changing the printed QR code. It also allows businesses to track scan metrics (number of scans, location, device OS). The QR grid remains simple and easy to scan.
* **Cons**: If the redirect server goes offline, the QR code breaks. Dynamic QR services often require paid subscriptions.

---

## Error Correction Level (Reed-Solomon) Explained

One of the most powerful features of QR codes is their built-in resilience. QR codes use **Reed-Solomon Error Correction**, a mathematical algorithm that allows a scanner to fully decode the information even if the QR code is partially torn, dirty, or covered.

There are four error correction levels:

1. **Level L (Low)**: Can recover up to **7%** of damaged data. It results in the simplest grid, which is excellent for clean digital screens.
2. **Level M (Medium)**: Can recover up to **15%** of damaged data. This is the default setting for general use.
3. **Level Q (Quartile)**: Can recover up to **25%** of damaged data. Suitable for physical materials prone to wear.
4. **Level H (High)**: Can recover up to **30%** of damaged data. This is the highest level of protection.

### Why Error Correction Matters for Designers
If you want to create a branded QR code by **embedding a custom logo in the center**, you must choose **Level H (High)**. Since the logo covers a portion of the QR modules, the scanner treats the logo as "damaged" data. The Reed-Solomon algorithm uses the redundant data blocks scattered across the rest of the grid to reconstruct the covered information.

---

## Practical Applications & Use Cases

### 1. WiFi Network Sharing
Instead of typing long, complex alphanumeric passwords, users can scan a WiFi QR code. The standardized payload format:
\`WIFI:T:WPA;S:MyNetwork;P:SuperSecretPassword;;\`
allows Android and iOS devices to automatically parse the SSID, authentication type, and password, and connect to the network with a single tap.

### 2. Digital Business Cards (vCard)
A vCard QR code encodes a complete contact card (name, phone, email, organization, address, and social links) using the VCARD schema. Scanners immediately prompt the user to "Add to Contacts," eliminating manual typing errors at networking events.

### 3. Google Maps Coordinates
Perfect for invitations, business flyers, and real estate signs. By encoding a geolocation URI like \`https://maps.google.com/?q=latitude,longitude\`, scanners immediately open Google Maps or Apple Maps, guiding visitors directly to the physical venue.

### 4. Direct Messaging (SMS & WhatsApp)
For customer service and feedback loops, you can generate a QR code containing an SMS trigger:
\`SMSTO:+1234567890:Hello, I have a question about my order.\`
Or a WhatsApp direct link. When scanned, it opens the user's messaging app with the number and message pre-populated.

### 5. Cryptocurrency Transactions
Sharing crypto public addresses is prone to catastrophic typos. A QR code encoding a wallet address (e.g., \`bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\`) allows sender apps to scan, verify, and execute transfers safely.

---

## Best Practices for QR Code Design & Branding

To ensure your custom designed QR codes look professional and scan reliably, follow these guidelines:

* **Maintain High Contrast**: Always keep a strong contrast between the foreground modules and the background. Dark foregrounds on light backgrounds scan best. Avoid light yellow or pastel foregrounds.
* **Respect the Quiet Zone**: Do not place text, borders, or images right against the edge of the QR code. Keep a margin of at least 4 module widths around the code.
* **Keep Logos Central and Sized Correctly**: The embedded logo should reside exactly in the center and occupy no more than 20% of the overall QR area. Ensure you use **Level H Error Correction** when embedding images.
* **Avoid Complex Gradients in Small Sizes**: While gradient colors look premium, avoid multi-colored gradients on very small printed QR codes (under 2cm), as optical cameras may struggle to distinguish light gradient values.
* **Download the Correct File Format**: Use **PNG** for digital screens, presentations, and website displays. Use **SVG (Scalable Vector Graphics)** for physical printing, marketing materials, and large-scale banners, as vector graphics can scale infinitely without pixelation.

---

## QR Code Security Considerations

As QR codes grow in popularity, so do security risks. Users should remain vigilant against **Qishing (QR Code Phishing)**:
* **Tampered QR Codes**: Scammers sometimes paste malicious static stickers over legitimate QR codes on public parking meters, menus, or advertisements to redirect victims to credential-harvesting pages.
* **Verification**: Always inspect the destination URL shown by your smartphone camera before clicking to open a link, ensuring the hostname matches the expected brand.
* **Client-side Execution**: When generating QR codes containing sensitive payloads (like passwords or private keys), use client-side generators (like this tool) that run entirely inside your browser. Avoid generators that send your inputs to remote APIs.

---

## QR Code Developer Integration Guide

Developers can integrate QR generation into their applications using simple payload formats.

### Common Standardized Schemas:

* **URL**: \`https://yoursite.com\`
* **Plain Text**: \`Any raw string representation\`
* **Email**: \`mailto:support@yoursite.com?subject=Inquiry&body=Hello\`
* **Phone Call**: \`tel:+15551234567\`
* **SMS**: \`SMSTO:+15551234567:Your message here\`
* **WhatsApp**: \`https://wa.me/15551234567?text=Hello\`
* **Geolocation**: \`geo:37.7749,-122.4194\`
* **WiFi**: \`WIFI:S:NetworkName;T:WPA;P:PasswordName;H:false;;\`
* **vCard (v3.0)**:
  \`\`\`text
  BEGIN:VCARD
  VERSION:3.0
  N:Doe;John;;;
  FN:John Doe
  ORG:Acme Corp
  TEL;TYPE=CELL:+15551234567
  EMAIL;TYPE=INTERNET:john@acme.com
  URL:https://acme.com
  END:VCARD
  \`\`\`
* **Calendar Event (iCalendar)**:
  \`\`\`text
  BEGIN:VEVENT
  SUMMARY:Product Launch
  DTSTART:20260601T090000Z
  DTEND:20260601T103000Z
  LOCATION:Conference Room A
  DESCRIPTION:Launch event.
  END:VEVENT
  \`\`\`
`,

  faq: [
    {
      question: "Is this QR Code Generator free and secure?",
      answer: "Yes, this tool is 100% free and operates entirely client-side. The QR code matrix is calculated and drawn inside your browser. No text, passwords, or files are ever transmitted to our servers."
    },
    {
      question: "What is the maximum amount of data a QR code can hold?",
      answer: "A Version 40 QR code can store up to 7,089 numeric characters or 4,296 alphanumeric characters. Our generator automatically scales the QR version to fit your text size dynamically."
    },
    {
      question: "Which file format should I download for printing?",
      answer: "For professional printing, download the SVG format. SVG is a vector format, meaning it can be scaled to any size (from business cards to giant billboards) without losing sharpness. Use PNG for digital displays."
    },
    {
      question: "Why isn't my QR code scanning?",
      answer: "This is usually caused by low color contrast (e.g., light blue dots on a white background), insufficient margins (violating the quiet zone), or because an embedded logo is too large for the error correction level."
    },
    {
      question: "Can I use transparent backgrounds with QR codes?",
      answer: "Yes. Our tool allows you to enable transparent backgrounds, which is highly useful when embedding the QR code onto styled website sections, brochures, or dark mockups. Just make sure the final surface has sufficient contrast."
    },
    {
      question: "What are the four error correction levels?",
      answer: "They are L (7% recovery), M (15% recovery), Q (25% recovery), and H (30% recovery). Higher levels add more redundancy, making the QR code larger but more resilient to scratches and allowing logo placement."
    }
  ],

  features: [
    "100% offline generation in your browser sandbox, ensuring absolute privacy",
    "Generates QR codes for URLs, Text, WiFi, vCards, Email, SMS, WhatsApp, Location, and Crypto",
    "Real-time preview updates in real-time as you type or change configurations",
    "Custom dot patterns (Square, Circles/Dots, Rounded capsules)",
    "Color customization with solid backgrounds, linear/radial gradients, and transparency",
    "Branded customization for finder eyes (distinct border and center dot colors)",
    "Center logo overlay support via click selection or drag-and-drop",
    "Adjustable QR code sizes (up to 1024px) and margins (quiet zone)",
    "Downloads in lossless raster PNG or infinite-vector SVG formats",
    "Direct copy-to-clipboard functionality for generated images and encoded text",
    "Batch generation mode to parse multiple items and download them collectively as a ZIP file",
    "Local generation history panel with simple one-click deletion"
  ],

  useCases: [
    "Creating customized menus or marketing banners with embedded corporate logos",
    "Generating quick-connect WiFi QR codes for meeting rooms, hotels, and retail cafes",
    "Creating vCard QR codes for digital business cards to instantly share contacts",
    "Generating cryptocurrency payment links for safe mobile wallet transfers",
    "Creating calendar invitations or physical brochures with direct Google Maps directions",
    "Bulk-generating inventory tags or event registration passes in a single batch"
  ],

  howToSteps: [
    "Choose a QR code type tab (e.g. Website URL, Wi-Fi, vCard) and fill out the fields.",
    "Adjust the QR Code size (e.g., 256px, 512px) and select an Error Correction Level (choose 'H' if embedding a logo).",
    "Customize colors by switching from Solid to Gradient, and pick your primary brand colors.",
    "Select a dot style (e.g., Rounded or Dots) and customize the Finder Eyes shapes and colors.",
    "Upload your logo image by dragging it into the preview area or clicking the upload button.",
    "Download the finished QR Code as PNG or SVG, or copy it directly to your clipboard.",
    "Switch to the 'Batch Generator' tab if you want to generate and download multiple QR codes in a ZIP file.",
    "Track or clear your generated QR history dynamically in the history panel below."
  ],

  examples: [
    {
      title: "WiFi Access Point",
      description: "Generates an auto-connecting QR code for guest Wi-Fi networks.",
      input: "SSID: OfficeGuest, Password: password123, Encryption: WPA",
      output: "WIFI:T:WPA;S:OfficeGuest;P:password123;;"
    },
    {
      title: "Contact Card (vCard)",
      description: "Creates an instant contact import card for smartphones.",
      input: "Name: Alice Smith, Email: alice@example.com, Phone: +15559876543",
      output: "BEGIN:VCARD\\nVERSION:3.0\\nN:Smith;Alice\\nFN:Alice Smith\\nEMAIL:alice@example.com\\nTEL:+15559876543\\nEND:VCARD"
    }
  ],

  relatedTools: [
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Base64 Decode", slug: "base64-decode" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "URL Decoder", slug: "url-decoder" },
    { name: "Password Generator", slug: "password-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "JWT Decoder", slug: "jwt-decoder" }
  ]
};
