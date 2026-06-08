import { ToolConfig } from './types';

export const pdfMetadataViewerConfig: ToolConfig = {
  slug: "pdf-metadata-viewer",
  title: "PDF Metadata Viewer",
  shortDescription: "Inspect PDF document properties, metadata, and security settings. View Title, Author, Subject, Keywords, Creator, Producer, page count, and custom fields locally.",
  category: "PDF Tools",
  keywords: [
    "PDF Metadata Viewer", "View PDF Metadata", "PDF Metadata Inspector", "PDF Properties Viewer",
    "PDF Information Viewer", "PDF Document Inspector", "inspect pdf properties", "read pdf metadata",
    "check pdf security", "pdf metadata analyzer", "detect hidden metadata pdf", "pdf custom properties",
    "pdf xmp viewer", "online pdf inspector", "local pdf analyzer"
  ],

  longDescription: `
## The Comprehensive Guide to PDF Metadata: Architecture, Security, and Lifecycle Management

In the modern digital landscape, the documents we share carry far more information than meets the eye. Every invoice, contract, scientific manuscript, and legal filing distributed in the Portable Document Format (PDF) contains two layers of data: the visible page content and the hidden structural metadata. Metadata—often defined simply as "data about data"—describes the origin, history, properties, and classification of a file.

Under the ISO 32000 specification governing the PDF format, metadata serves as the digital fingerprint of a document. It enables operating systems to index files, search engines to parse content, document management systems to catalog assets, and assistive technologies to interpret structure. However, this convenience comes with substantial security, legal, and operational considerations. 

This guide provides an in-depth technical analysis of PDF metadata architecture, details the coexistence of legacy Info dictionaries and modern XMP streams, explores the critical privacy and security risks associated with hidden document tracking, and outlines best practices for professional metadata management.

---

## 1. The History and Standards of Metadata in the PDF Specification

The concept of document metadata has evolved alongside the PDF format itself. Developed by Adobe Systems in the early 1990s and subsequently standardized by the International Organization for Standardization (ISO) in 2008, the PDF specification has accommodated various methods for storing metadata.

### The Legacy Document Information Dictionary (Info Dict)
In the early days of PDF (from version 1.0 through 1.3), metadata was stored exclusively in a single table known as the **Document Information Dictionary** (commonly referred to as the \`/Info\` dictionary). This dictionary is referenced in the PDF's trailer and contains a set of key-value pairs representing basic document attributes. The standard keys defined in the specification include:
- **\`/Title\`**: The name of the document.
- **\`/Author\`**: The person or entity that created the content.
- **\`/Subject\`**: A brief description or theme of the document.
- **\`/Keywords\`**: A list of comma-separated or space-separated search terms.
- **\`/Creator\`**: The application that generated the original document (e.g., Microsoft Word, Google Docs).
- **\`/Producer\`**: The engine that converted the document into a PDF (e.g., Adobe Distiller, pdf-lib, TCPDF).
- **\`/CreationDate\`**: The timestamp denoting when the document was first created.
- **\`/ModDate\`**: The timestamp denoting when the document was last modified.
- **\`/Trapped\`**: A boolean flag indicating whether the file has been processed for commercial printing trapping.

While simple and easy to parse, the Info dictionary suffers from severe limitations: it only supports simple string data, lacks a standardized format for custom properties, and does not natively support advanced character sets or internationalization (i.e., multi-language metadata).

### The Modern Extensible Metadata Platform (XMP)
To address the limitations of the legacy Info dictionary, Adobe introduced the **Extensible Metadata Platform (XMP)** in PDF 1.4 (2001). XMP is an XML-based framework that embeds metadata directly into files using the Resource Description Framework (RDF) standard. 

Under the XMP standard, metadata is stored in an XML stream known as the **Metadata Stream**, which is attached to the document's root catalog dictionary under the \`/Metadata\` key. Unlike the flat Info dictionary, XMP organizes metadata into structured schemas and namespaces:
- **Dublin Core (\`dc\`)**: Standard properties for describing resources (e.g., \`dc:title\`, \`dc:creator\`, \`dc:description\`, \`dc:publisher\`).
- **Adobe PDF Schema (\`pdf\`)**: PDF-specific attributes (e.g., \`pdf:Keywords\`, \`pdf:PDFVersion\`, \`pdf:Producer\`).
- **XMP Basic (\`xmp\`)**: General metadata properties (e.g., \`xmp:CreateDate\`, \`xmp:ModifyDate\`, \`xmp:CreatorTool\`).
- **XMP Media Management (\`xmpMM\`)**: Tracking properties for file history, document lineages, and versions (e.g., \`xmpMM:DocumentID\`, \`xmpMM:InstanceID\`).

With XMP, a single PDF can store complex, localized, and extensibility-friendly metadata records. It supports nested arrays, language-specific title variants, and custom metadata properties defined by specific industries or organizations.

---

## 2. Under the Hood: Low-Level PDF Object Structures and Trailer References

To inspect or edit PDF metadata programmatically, one must understand how a PDF file is assembled at a binary level. A PDF is composed of four main sections: a header, a body containing indirect objects, a cross-reference table (xref), and a trailer.

\`\`\`mermaid
graph TD
    subgraph PDF File Structure
        H[Header: %PDF-1.7] --> B[Body: Indirect Objects]
        B --> X[Cross-Reference Table: xref]
        X --> T[Trailer: trailer dictionary]
    end
    T -->|References /Info| I[Info Dictionary]
    T -->|References /Root| C[Catalog Dictionary]
    C -->|References /Metadata| M[XMP Metadata Stream]
\`\`\`

### The Trailer and the Info Dictionary
At the very end of a PDF file, the **Trailer** dictionary provides the starting points for parsing the document. It contains references to critical root objects:
\`\`\`text
trailer
<<
  /Size 45
  /Root 2 0 R
  /Info 3 0 R
>>
startxref
145224
%%EOF
\`\`\`
In the example above, the \`/Info\` dictionary is identified as indirect object number 3 (represented as \`3 0 R\`). If we locate object 3 in the file body, we see:
\`\`\`text
3 0 obj
<<
  /Title (Quarterly Financial Report)
  /Author (John Doe)
  /Creator (Microsoft Word)
  /Producer (Adobe PDF Library 15.0)
  /CreationDate (D:20260601120000Z)
  /ModDate (D:20260608093000Z)
>>
endobj
\`\`\`
Strings in the Info dictionary are typically represented as literal string parentheses \`(...)\` or hex-encoded strings \`<...>\`. Dates follow a strict PDF date format: \`D:YYYYMMDDHHmmSS[OHH'mm']\`, where \`O\` represents the timezone offset relative to UTC (or \`Z\` for Zulu time).

### The Catalog and the Metadata Stream
The trailer's \`/Root\` key references the **Catalog** dictionary. The catalog serves as the root index for all resources, pages, outlines, and interactive elements. It is also where the XMP Metadata Stream is registered:
\`\`\`text
2 0 obj
<<
  /Type /Catalog
  /Pages 1 0 R
  /Metadata 4 0 R
>>
endobj
\`\`\`
Object 4 is a stream object containing the raw XML payload of the XMP metadata:
\`\`\`text
4 0 obj
<<
  /Type /Metadata
  /Subtype /XML
  /Length 1240
>>
stream
<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
   <dc:format>application/pdf</dc:format>
   <dc:title>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">Quarterly Financial Report</rdf:li>
    </rdf:Alt>
   </dc:title>
   <dc:creator>
    <rdf:Seq>
     <rdf:li>John Doe</rdf:li>
    </rdf:Seq>
   </dc:creator>
  </rdf:Description>
 </rdf:RDF>
 </x:xmpmeta>
<?xpacket end="w"?>
endstream
endobj
\`\`\`
The XMP packet is enclosed within \`<?xpacket?>\` processing instructions, allowing applications (such as operating system search indexers) to scan files and extract metadata directly without fully parsing the PDF object tree.

### The Synchronization Challenge
Because PDF metadata is split between the legacy \`/Info\` dictionary and the modern XMP \`/Metadata\` stream, inspection engines must review both. If an application updates the Author in the Info dictionary but leaves the XMP stream unchanged, the document contains conflicting metadata. Advanced PDF properties checkers highlight these discrepancy risks.

---

## 3. Security and Privacy Implications of PDF Metadata

While metadata is essential for search and organization, it presents a significant vector for data leaks. When a document is shared externally, it often contains hidden information that creators are unaware of. 

### Common Types of Leaked Information
1. **Usernames and Real Names**: The \`/Author\` field of a document is often auto-populated by the word processing software with the name of the system user. This can leak the real name of anonymous whistleblowers, internal authors, or corporate representatives.
2. **Network Paths and File Systems**: The XMP metadata stream frequently logs the local directory paths of files or templates referenced during creation. This can leak corporate server names, network structures, share folders, or internal project codenames.
3. **Software Versions and Operating Systems**: The \`/Creator\` and \`/Producer\` fields leak the exact tools used to compile the document (e.g., "Microsoft Word 2016", "macOS Version 12.4 (Build 21F79) Quartz PDFContext"). Hackers can use this information to determine the target's operating system and identify software vulnerabilities.
4. **Dates and Revision History**: Creation and modification timestamps reveal the chronological timeline of document editing. In sensitive environments, they can expose how long a document was reviewed or when last-minute edits were made. XMP Media Management tags (\`xmpMM\`) also store a unique tracking ID (\`DocumentID\` and \`InstanceID\`) that links different versions of the same file, making it possible to trace document lineages.

### Notable Metadata Leak Scandals
- **The UK "Dodgy Docket" (2003)**: The UK government published a dossier justifying the invasion of Iraq. Analysis of the PDF's metadata revealed that the document was heavily copied from a graduate student's thesis and had been edited by several government communications directors, whose names were left in the revision history metadata.
- **Corporate Lawsuits**: In high-profile acquisitions or litigation, lawyers have inadvertently leaked trade secrets, negotiation parameters, or confidential client identities by failing to sanitize custom properties and editing histories from PDF filings.

### Inspection vs. Sanitization
Inspection is the first line of defense. By reading document properties with an advanced viewer, users can evaluate their privacy risk before sharing. Sanitization involves stripping all non-essential metadata.

---

## 4. Metadata in Compliance, Legal, and Archival Frameworks

Document metadata is not just a convenience—in many industries, it is a legal and regulatory requirement.

### Legal Discovery and Bates Numbering
In corporate litigation and regulatory investigations, documents undergo **electronic discovery (e-discovery)**. During this process, files must be cataloged using unique sequential identifiers known as **Bates Numbering**. 
- Custom metadata properties are added to the PDF files to store Bates codes, document classifications, and source identifiers.
- These custom attributes allow litigation databases to query, sort, and index millions of documents without modifying their visible content.

### PDF/A for Long-Term Archiving
The **PDF/A** standard (ISO 19005) is a specialized profile designed for the digital preservation of electronic documents. PDF/A strictly regulates metadata:
- **Mandatory XMP**: Legacy Info dictionaries are deprecated or restricted. All metadata must be stored in the XML-based XMP format.
- **Custom Schema Descriptions**: If custom metadata properties are used in a PDF/A document, the document must include an embedded schema definition (metadata about the metadata) that describes the semantics and data types of those custom properties. This ensures that archival software running 50 years in the future can interpret the custom attributes.
- **Device-Independent Colors and Fonts**: The metadata must document the color spaces and font encodings embedded in the file to guarantee identical visual rendering across decades.

---

## 5. Why Local Client-Side Processing Offers Superior Security

Many online utility websites require users to upload their PDFs to a remote server to view or edit metadata. While convenient, this practice introduces massive compliance and security hazards:
- **Corporate Governance**: Uploading proprietary data (e.g., draft patents, merger agreements, financial tables) to a third-party server violates corporate data protection agreements and non-disclosure clauses.
- **Regulatory Frameworks**: Transmitting documents containing personally identifiable information (PII) to unverified servers runs afoul of the General Data Protection Regulation (GDPR), the Health Insurance Portability and Accountability Act (HIPAA), and local privacy mandates.
- **Data Retention Risk**: Once a document is uploaded to a remote server, it is subject to caching, logging, and storage on disk. If the server is compromised or has loose access controls, your private documents could be leaked.

### The Client-Side Solution: Zero-Trust Processing
Our **PDF Metadata Viewer** operates on a zero-trust model. By utilizing modern JavaScript compilers executing locally within the browser's sandbox:
1. **No Data Transmission**: Your PDF bytes are read directly from your local file system into browser memory. They are never sent over the internet or uploaded to our servers.
2. **Instant Performance**: By eliminating the need to transmit large files over slow network connections, files are analyzed instantly.
3. **Absolute Privacy**: When you view metadata, check security levels, or inspect embedded fonts, the file modifications occur in a secure browser process, keeping your sensitive corporate data confidential.

---

## Summary of Core Best Practices
- **Audit Before Export**: Always inspect your PDF's document properties and hidden metadata before publishing files externally.
- **Verify Public Files**: Use a viewer to inspect creator names, file systems, and dates from documents intended for public distribution.
- **Maintain Schema Alignment**: When reviewing fields, ensure that both the legacy Info dictionary and the XMP stream are checked for inconsistencies.
- **Leverage Client-Side Tools**: Process files locally to keep confidential data secure inside your network perimeter.
`,

  faq: [
    {
      question: "What is PDF metadata?",
      answer: "PDF metadata is structured information embedded inside a PDF file that describes its attributes, such as the Title, Author, Subject, Keywords, Creator (the software that created the source file), Producer (the software that converted it to PDF), and the Creation and Modification dates. It acts as a digital fingerprint that helps search engines, indexing tools, and document management systems organize files."
    },
    {
      question: "How can I view PDF metadata?",
      answer: "You can view PDF metadata by dragging and dropping your PDF file into our online viewer. The tool will parse the PDF binary locally and display standard properties, custom fields, page counts, fonts, and security permissions."
    },
    {
      question: "What information is stored in PDF metadata?",
      answer: "A standard PDF metadata record contains document details (Title, Author, Subject, Keywords), creation tools (Creator, Producer), timestamp details (Creation Date, Modification Date), language codes, page count, PDF version, custom corporate metadata, and security settings."
    },
    {
      question: "Can metadata affect privacy?",
      answer: "Yes, metadata can affect privacy significantly. It can leak your computer username, the paths of files on your local server, the revision history of the document, the exact operating system used, and the date and time of file edits."
    },
    {
      question: "Is this PDF metadata viewer free?",
      answer: "Yes, this tool is 100% free. There are no subscriptions, registration requirements, file size limits, or watermark insertions."
    },
    {
      question: "Are my PDFs secure and private?",
      answer: "Yes, absolutely. This tool operates 100% client-side inside your web browser. Your PDFs are never uploaded to any remote server; they are parsed, analyzed, and read locally on your device, ensuring complete privacy."
    },
    {
      question: "Can I export the metadata I view?",
      answer: "Yes, you can export the extracted metadata as JSON, CSV, TXT, or download a printable PDF report of the properties."
    },
    {
      question: "Can I inspect multiple PDFs at once?",
      answer: "Yes. Our tool supports uploading multiple PDF files at once. You can compare metadata side-by-side or inspect files individually using a file list dropdown."
    },
    {
      question: "Does metadata contain personal information?",
      answer: "It often does. By default, applications like Microsoft Word or Adobe Acrobat add your local system username to the 'Author' field and date tags when creating a document."
    },
    {
      question: "Can I compare PDF metadata?",
      answer: "Yes. The tool features a Comparison Mode where you can upload two PDF files (PDF A and PDF B) and view their metadata fields side-by-side, with differences highlighted."
    },
    {
      question: "What is XMP metadata, and why is it important?",
      answer: "XMP (Extensible Metadata Platform) is an XML-based metadata standard introduced by Adobe in PDF 1.4. Unlike the legacy flat Info dictionary, XMP organizes metadata into structured namespaces. It allows for complex data types, multi-language support, and custom properties, and is required for specialized standards like PDF/A."
    },
    {
      question: "What is the difference between Creator and Producer?",
      answer: "Creator refers to the application that generated the original document before it became a PDF (such as Microsoft Word or Google Docs). Producer refers to the conversion engine that turned the original file format into the final PDF binary (such as Adobe Acrobat Distiller, pdf-lib, or TCPDF)."
    },
    {
      question: "Can I view custom metadata fields?",
      answer: "Yes. Any custom properties added to the document's Info dictionary (e.g. Department, Reference Number) are parsed and shown in the Custom Metadata tab."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the PDF Metadata Viewer is fully responsive and works on mobile phones, tablets, and desktop computers. File uploads can be performed via drag-and-drop or by browsing your mobile files."
    },
    {
      question: "Can I see creation and modification dates of a PDF?",
      answer: "Yes, the viewer extracts and parses these timestamps from the PDF trailer, converting them into a readable local timezone format."
    },
    {
      question: "Does viewing metadata change the PDF file in any way?",
      answer: "No. The viewer is read-only. Your PDF remains exactly as it was. Since the parsing is local and non-modifying, your original file is not touched."
    },
    {
      question: "What standard metadata fields are supported for viewing?",
      answer: "We support viewing Title, Author, Subject, Keywords, Creator, Producer, Creation Date, Modification Date, Document ID, and Document Language."
    },
    {
      question: "How is the document language metadata used?",
      answer: "The language metadata (e.g., 'en', 'es-es') tells PDF readers and web browsers what language the document is written in. This is critical for accessibility because it allows screen readers to choose the correct voice and pronunciation rules when reading the PDF aloud."
    },
    {
      question: "What are custom property presets?",
      answer: "Common custom properties found in corporate PDFs include Document ID, Department, Project Name, Company, Version, and Reference Number. The viewer displays these custom key-value pairs clearly."
    },
    {
      question: "Does the viewer support PDF/A files?",
      answer: "Yes. The viewer can parse and display the metadata of PDF/A files, showing the embedded XMP schemas and conformance specifications."
    },
    {
      question: "What happens if my PDF is password-protected?",
      answer: "If a PDF is password-protected or has reading restrictions, you will need to enter the document password before the client-side engine can parse the file and read its metadata."
    },
    {
      question: "Why does my operating system show different PDF properties?",
      answer: "Windows File Explorer or macOS Finder might cache document metadata or read only specific legacy fields. Our tool parses the raw objects directly, ensuring you see the complete, true metadata fields."
    },
    {
      question: "Can I view the metadata of scanned PDFs?",
      answer: "Yes. Scanned PDFs have the same metadata structures as searchable PDFs. You can view their properties, file size, pages, and creation parameters in the same way."
    },
    {
      question: "Does the viewer show embedded fonts?",
      answer: "Yes. Under the Advanced tab, the viewer parses the resources of the document to list all embedded font names used in the document."
    },
    {
      question: "What is the Privacy Risk Score?",
      answer: "The Privacy Risk Score is an algorithmic score calculated based on the presence of hidden, potentially tracking information inside the metadata (such as author names, creation tools, editing history, and creation dates). A higher score indicates more tracking details are exposed."
    },
    {
      question: "What is the Document Health Score?",
      answer: "The Document Health Score measures how well-optimized the document metadata is for SEO and accessibility. It grades the presence of a title, keywords, subject, description, language tag, and page dimensions."
    },
    {
      question: "Can I see page dimensions of the PDF?",
      answer: "Yes. Under the Technical tab, the viewer displays the width and height of each page in points, inches, and millimeters, mapping them to standard layouts like Letter or A4."
    },
    {
      question: "What encryption details are shown?",
      answer: "The viewer displays whether the file is encrypted, the encryption method (e.g., Standard V2/V4), and the active permissions (Printing, Modifying, Content Copying)."
    },
    {
      question: "Does the tool run offline?",
      answer: "Yes. Because the PDF parsing engine runs entirely locally in your browser, once the page is loaded, you can disconnect from the internet and continue inspecting PDF metadata offline."
    },
    {
      question: "What is a Document ID in PDF metadata?",
      answer: "A Document ID is a unique key usually located in the file's trailer. It is used by version control systems to link and track different editions or revisions of a document."
    },
    {
      question: "Can I inspect massive PDF files?",
      answer: "Yes. Since the metadata parsing runs client-side in the browser, file sizes are limited only by your device's RAM. It can easily handle PDFs containing hundreds of megabytes or thousands of pages."
    },
    {
      question: "Can I filter or search metadata fields?",
      answer: "Yes. The interface features a search bar that allows you to instantly search or filter standard, custom, and advanced metadata keys."
    },
    {
      question: "Does the viewer store a local inspection history?",
      answer: "Yes. A summary of recently inspected files is saved locally in your browser's LocalStorage, allowing you to review previously analyzed metadata details."
    },
    {
      question: "Why should I use local PDF metadata viewers instead of Acrobat?",
      answer: "Adobe Acrobat is a premium, paid desktop application. Our tool offers a fast, free, web-based alternative that runs in any browser on any device. It processes files locally in seconds, offering the same security and privacy as a desktop app without requiring any software installation."
    },
    {
      question: "Can I view metadata in different languages?",
      answer: "Yes, our web application is fully translated and supports multi-language i18n routing, integrating with your preferred locale settings."
    }
  ],

  relatedTools: [
    { name: "PDF Metadata Editor", slug: "pdf-metadata-editor" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" }
  ],

  features: [
    "100% secure client-side browser execution—no file uploads",
    "Extract and display standard fields: Title, Author, Subject, Keywords, Creator, Producer",
    "View advanced technical details including PDF version, page count, and dimensions",
    "Extract and display all embedded font names",
    "Inspect security permissions (printing, editing, copying allowed)",
    "Privacy Risk Score evaluates exposure of personal info and usernames",
    "Document Health & SEO check measures search engine indexing readiness",
    "Batch processing: Compare metadata across two files side-by-side",
    "Quick search and filter controls over all metadata fields",
    "Save local operation log of recently viewed files",
    "Export metadata report as JSON, CSV, TXT, or print-ready PDF Report"
  ],

  useCases: [
    "Verify whether system credentials and usernames are leaked inside documents before public posting",
    "Inspect the security permissions of a contract or legal form to see if printing or editing is locked",
    "Check if an academic paper metadata is optimized for citation indexes and search engine crawling",
    "Analyze embedded fonts of a document for compliance with printing press requirements",
    "Identify custom metadata keys (e.g. Bates codes, corporate IDs) inside legal files",
    "Compare metadata differences between two versions of the same document"
  ],

  howToSteps: [
    "Select or drag and drop your PDF files into the upload box.",
    "View the parsed file characteristics, size, and page count.",
    "Navigate between the Dashboard, Properties, Advanced, Security, and SEO tabs to inspect details.",
    "Search specific keys using the search filter bar.",
    "Switch to Comparison tab to load a second file and view differences side-by-side.",
    "Click the Export button to save the metadata properties as JSON, CSV, TXT, or a print PDF report."
  ],

  examples: [
    {
      title: "Inspecting PDF Privacy Leaks",
      description: "Detect hidden personal tags, editing history details, and system parameters.",
      input: "Upload: annual-report-v3.pdf\nSize: 4.2 MB\nPages: 24",
      output: "Author: John Smith\nCreator Tool: Microsoft Word 2016\nProducer: OS X Quartz PDFContext\nCreation Date: 2026-06-01\nPrivacy Score: 78% (High exposure of tracking parameters)"
    },
    {
      title: "Checking Document SEO Readiness",
      description: "Verify if PDF properties contain search-friendly parameters.",
      input: "Upload: user-manual.pdf\nTitle: (Empty)\nKeywords: (Empty)\nLanguage: Not set",
      output: "Health Score: 30% (Poor)\nIssues: Missing title, missing language code, missing search keywords\nRecommendation: Set Title and Lang tags to improve search ranking and screen reader compatibility."
    }
  ]
};
