import { ToolConfig } from './types';

export const pdfMetadataEditorConfig: ToolConfig = {
  slug: "pdf-metadata-editor",
  title: "PDF Metadata Editor",
  shortDescription: "View, edit, or strip metadata properties from your PDF documents. Modify Title, Author, Subject, Keywords, Creator, and custom properties, or clean sensitive hidden fields locally.",
  category: "PDF Tools",
  keywords: [
    "PDF Metadata Editor", "Edit PDF Metadata", "PDF Properties Editor", "PDF Document Information Editor",
    "PDF Metadata Manager", "PDF Information Editor", "remove pdf metadata", "strip pdf properties",
    "clean pdf metadata", "pdf privacy cleaner", "edit document properties pdf", "pdf custom metadata",
    "pdf xmp metadata editor", "bulk edit pdf metadata", "batch pdf properties modifier"
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
In the early days of PDF (from version 1.0 through 1.3), metadata was stored exclusively in a single table known as the **Document Information Dictionary** (commonly referred to as the \\\`/Info\\\` dictionary). This dictionary is referenced in the PDF's trailer and contains a set of key-value pairs representing basic document attributes. The standard keys defined in the specification include:
- **\\\`/Title\\\`**: The name of the document.
- **\\\`/Author\\\`**: The person or entity that created the content.
- **\\\`/Subject\\\`**: A brief description or theme of the document.
- **\\\`/Keywords\\\`**: A list of comma-separated or space-separated search terms.
- **\\\`/Creator\\\`**: The application that generated the original document (e.g., Microsoft Word, Google Docs).
- **\\\`/Producer\\\`**: The engine that converted the document into a PDF (e.g., Adobe Distiller, pdf-lib, TCPDF).
- **\\\`/CreationDate\\\`**: The timestamp denoting when the document was first created.
- **\\\`/ModDate\\\`**: The timestamp denoting when the document was last modified.
- **\\\`/Trapped\\\`**: A boolean flag indicating whether the file has been processed for commercial printing trapping.

While simple and easy to parse, the Info dictionary suffers from severe limitations: it only supports simple string data, lacks a standardized format for custom properties, and does not natively support advanced character sets or internationalization (i.e., multi-language metadata).

### The Modern Extensible Metadata Platform (XMP)
To address the limitations of the legacy Info dictionary, Adobe introduced the **Extensible Metadata Platform (XMP)** in PDF 1.4 (2001). XMP is an XML-based framework that embeds metadata directly into files using the Resource Description Framework (RDF) standard. 

Under the XMP standard, metadata is stored in an XML stream known as the **Metadata Stream**, which is attached to the document's root catalog dictionary under the \\\`/Metadata\\\` key. Unlike the flat Info dictionary, XMP organizes metadata into structured schemas and namespaces:
- **Dublin Core (\\\`dc\\\`)**: Standard properties for describing resources (e.g., \\\`dc:title\\\`, \\\`dc:creator\\\`, \\\`dc:description\\\`, \\\`dc:publisher\\\`).
- **Adobe PDF Schema (\\\`pdf\\\`)**: PDF-specific attributes (e.g., \\\`pdf:Keywords\\\`, \\\`pdf:PDFVersion\\\`, \\\`pdf:Producer\\\`).
- **XMP Basic (\\\`xmp\\\`)**: General metadata properties (e.g., \\\`xmp:CreateDate\\\`, \\\`xmp:ModifyDate\\\`, \\\`xmp:CreatorTool\\\`).
- **XMP Media Management (\\\`xmpMM\\\`)**: Tracking properties for file history, document lineages, and versions (e.g., \\\`xmpMM:DocumentID\\\`, \\\`xmpMM:InstanceID\\\`).

With XMP, a single PDF can store complex, localized, and extensibility-friendly metadata records. It supports nested arrays, language-specific title variants, and custom metadata properties defined by specific industries or organizations.

---

## 2. Under the Hood: Low-Level PDF Object Structures and Trailer References

To inspect or edit PDF metadata programmatically, one must understand how a PDF file is assembled at a binary level. A PDF is composed of four main sections: a header, a body containing indirect objects, a cross-reference table (xref), and a trailer.

\\\`\\\`\\\`mermaid
graph TD
    subgraph PDF File Structure
        H[Header: %PDF-1.7] --> B[Body: Indirect Objects]
        B --> X[Cross-Reference Table: xref]
        X --> T[Trailer: trailer dictionary]
    end
    T -->|References /Info| I[Info Dictionary]
    T -->|References /Root| C[Catalog Dictionary]
    C -->|References /Metadata| M[XMP Metadata Stream]
\\\`\\\`\\\`

### The Trailer and the Info Dictionary
At the very end of a PDF file, the **Trailer** dictionary provides the starting points for parsing the document. It contains references to critical root objects:
\\\`\\\`\\\`text
trailer
<<
  /Size 45
  /Root 2 0 R
  /Info 3 0 R
>>
startxref
145224
%%EOF
\\\`\\\`\\\`
In the example above, the \\\`/Info\\\` dictionary is identified as indirect object number 3 (represented as \\\`3 0 R\\\`). If we locate object 3 in the file body, we see:
\\\`\\\`\\\`text
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
\\\`\\\`\\\`
Strings in the Info dictionary are typically represented as literal string parentheses \\\`(...)\\\` or hex-encoded strings \\\`<...>\\\`. Dates follow a strict PDF date format: \\\`D:YYYYMMDDHHmmSS[OHH'mm']\\\`, where \\\`O\\\` represents the timezone offset relative to UTC (or \\\`Z\\\` for Zulu time).

### The Catalog and the Metadata Stream
The trailer's \\\`/Root\\\` key references the **Catalog** dictionary. The catalog serves as the root index for all resources, pages, outlines, and interactive elements. It is also where the XMP Metadata Stream is registered:
\\\`\\\`\\\`text
2 0 obj
<<
  /Type /Catalog
  /Pages 1 0 R
  /Metadata 4 0 R
>>
endobj
\\\`\\\`\\\`
Object 4 is a stream object containing the raw XML payload of the XMP metadata:
\\\`\\\`\\\`text
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
\\\`\\\`\\\`
The XMP packet is enclosed within \\\`<?xpacket?>\\\` processing instructions, allowing applications (such as operating system search indexers) to scan files and extract metadata directly without fully parsing the PDF object tree.

### The Synchronization Challenge
Because PDF metadata is split between the legacy \\\`/Info\\\` dictionary and the modern XMP \\\`/Metadata\\\` stream, editors must keep them synchronized. If an application updates the Author in the Info dictionary but leaves the XMP stream unchanged, the document contains conflicting metadata. Modern PDF editors resolve this by writing to both locations and aligning fields.

---

## 3. Security and Privacy Implications of PDF Metadata

While metadata is essential for search and organization, it presents a significant vector for data leaks. When a document is shared externally, it often contains hidden information that creators are unaware of. 

### Common Types of Leaked Information
1. **Usernames and Real Names**: The \\\`/Author\\\` field of a document is often auto-populated by the word processing software with the name of the system user. This can leak the real name of anonymous whistleblowers, internal authors, or corporate representatives.
2. **Network Paths and File Systems**: The XMP metadata stream frequently logs the local directory paths of files or templates referenced during creation. This can leak corporate server names, network structures, share folders, or internal project codenames.
3. **Software Versions and Operating Systems**: The \\\`/Creator\\\` and \\\`/Producer\\\` fields leak the exact tools used to compile the document (e.g., "Microsoft Word 2016", "macOS Version 12.4 (Build 21F79) Quartz PDFContext"). Hackers can use this information to determine the target's operating system and identify software vulnerabilities.
4. **Dates and Revision History**: Creation and modification timestamps reveal the chronological timeline of document editing. In sensitive environments, they can expose how long a document was reviewed or when last-minute edits were made. XMP Media Management tags (\\\`xmpMM\\\`) also store a unique tracking ID (\\\`DocumentID\\\` and \\\`InstanceID\\\`) that links different versions of the same file, making it possible to trace document lineages.

### Notable Metadata Leak Scandals
- **The UK \"Dodgy Docket\" (2003)**: The UK government published a dossier justifying the invasion of Iraq. Analysis of the PDF's metadata revealed that the document was heavily copied from a graduate student's thesis and had been edited by several government communications directors, whose names were left in the revision history metadata.
- **Corporate Lawsuits**: In high-profile acquisitions or litigation, lawyers have inadvertently leaked trade secrets, negotiation parameters, or confidential client identities by failing to sanitize custom properties and editing histories from PDF filings.

### Sanitizing vs. Editing
Editing metadata involves modifying fields to reflect updated details. Sanitization (or Privacy Mode), however, involves stripping all non-essential metadata entirely. This includes removing the XMP stream, clearing dates, erasing system creators, and deleting custom properties to create a completely clean document before public release.

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

Many online utility websites require users to upload their PDFs to a remote server to edit metadata or convert files. While convenient, this practice introduces massive compliance and security hazards:
- **Corporate Governance**: Uploading proprietary data (e.g., draft patents, merger agreements, financial tables) to a third-party server violates corporate data protection agreements and non-disclosure clauses.
- **Regulatory Frameworks**: Transmitting documents containing personally identifiable information (PII) to unverified servers runs afoul of the General Data Protection Regulation (GDPR), the Health Insurance Portability and Accountability Act (HIPAA), and local privacy mandates.
- **Data Retention Risk**: Once a document is uploaded to a remote server, it is subject to caching, logging, and storage on disk. If the server is compromised or has loose access controls, your private documents could be leaked.

### The Client-Side Solution: Zero-Trust Processing
Our **PDF Metadata Editor** operates on a zero-trust model. By utilizing modern JavaScript compilers like \\\`pdf-lib\\\` and \\\`JSZip\\\` executing locally within the browser's sandbox:
1. **No Data Transmission**: Your PDF bytes are read directly from your local file system into browser memory. They are never sent over the internet or uploaded to our servers.
2. **Instant Performance**: By eliminating the need to transmit large files (which can be hundreds of megabytes in size) over slow network uploads and downloads, files are processed instantly.
3. **Absolute Privacy**: When you edit metadata, sanitise dates, or clear custom fields, the file modifications occur in a secure browser process, keeping your sensitive corporate data confidential.

---

## Summary of Core Best Practices
- **Audit Before Export**: Always inspect your PDF's document properties and hidden metadata before publishing files externally.
- **Sanitize Public Files**: Use Privacy Mode to strip creator names, file systems, and dates from documents intended for public distribution.
- **Maintain Schema Alignment**: When editing standard fields, ensure that both the legacy Info dictionary and the XMP stream are updated to prevent system conflicts.
- **Leverage Client-Side Tools**: Process files locally to keep confidential data secure inside your network perimeter.
`,

  faq: [
    {
      question: "What is PDF metadata?",
      answer: "PDF metadata is structured information embedded inside a PDF file that describes its attributes, such as the Title, Author, Subject, Keywords, Creator (the software that created the source file), Producer (the software that converted it to PDF), and the Creation and Modification dates. It acts as a digital fingerprint that helps search engines, indexing tools, and document management systems organize files."
    },
    {
      question: "How do I edit PDF metadata?",
      answer: "You can edit PDF metadata by dragging and dropping your PDF file into this editor, modifying the fields displayed in the properties panels, and clicking 'Export PDF'. The tool will write the new metadata directly into the PDF's binary structure and download the updated document back to your computer."
    },
    {
      question: "Can I remove author information from a PDF?",
      answer: "Yes, you can edit or completely delete the Author field. This removes your name (or the name of your computer system) from the document, protecting your anonymity before sharing the file."
    },
    {
      question: "What is the 'Remove Sensitive Metadata' or Privacy Mode?",
      answer: "Privacy Mode is a one-click sanitizer that strips all personal and hidden metadata from your document. It deletes the Author, Creator, Producer, Creation and Modification Dates, custom properties, and completely removes the XMP XML Metadata stream to prevent data leaks."
    },
    {
      question: "Are my PDF files secure when using this tool?",
      answer: "Yes, absolutely. This tool operates 100% client-side inside your web browser. Your PDFs are never uploaded to any remote server; they are parsed, edited, and compiled locally on your device, ensuring complete privacy."
    },
    {
      question: "What is XMP metadata, and why is it important?",
      answer: "XMP (Extensible Metadata Platform) is an XML-based metadata standard introduced by Adobe in PDF 1.4. Unlike the legacy flat Info dictionary, XMP organizes metadata into structured namespaces. It allows for complex data types, multi-language support, and custom properties, and is required for specialized standards like PDF/A."
    },
    {
      question: "Can I bulk edit metadata for multiple PDFs?",
      answer: "Yes. Our tool supports uploading multiple PDF files at once. You can apply a metadata template or enter values in the editor to update the metadata across all loaded PDFs in a single batch, then download them all as a ZIP archive."
    },
    {
      question: "What is the difference between Creator and Producer?",
      answer: "Creator refers to the application that generated the original document before it became a PDF (such as Microsoft Word or Google Docs). Producer refers to the conversion engine that turned the original file format into the final PDF binary (such as Adobe Acrobat Distiller, pdf-lib, or TCPDF)."
    },
    {
      question: "Can I add custom metadata fields?",
      answer: "Yes. You can add custom key-value pairs (e.g., 'Department', 'Project Name', 'Reference ID') in the Custom Properties panel. These properties are written directly into the PDF trailer's Info dictionary as custom keys."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, the PDF Metadata Editor is fully responsive and works on mobile phones, tablets, and desktop computers. File uploads can be performed via drag-and-drop or by browsing your mobile files."
    },
    {
      question: "Can I remove the creation and modification dates from a PDF?",
      answer: "Yes. By clearing the Creation Date and Modification Date inputs or enabling Privacy Mode, the timestamps are completely removed from the PDF's trailer, keeping the document's editing timeline hidden."
    },
    {
      question: "Does editing metadata change the text or images inside my PDF?",
      answer: "No. Metadata editing only alters the structural properties in the PDF trailer and catalog. The visible text, images, pages, fonts, and layout of your PDF remain entirely untouched."
    },
    {
      question: "What standard metadata fields are supported for editing?",
      answer: "We support editing the Title, Author, Subject, Keywords, Creator, Producer, Creation Date, Modification Date, and Document Language."
    },
    {
      question: "How is the document language metadata used?",
      answer: "The language metadata (e.g., 'en', 'es-es') tells PDF readers and web browsers what language the document is written in. This is critical for accessibility because it allows screen readers to choose the correct voice and pronunciation rules when reading the PDF aloud."
    },
    {
      question: "What custom property presets are available?",
      answer: "We offer presets for common custom fields, including Document ID, Department, Project Name, Company, Version, and Reference Number. You can also type in your own custom keys."
    },
    {
      question: "Is this PDF Metadata Editor free to use?",
      answer: "Yes, this tool is 100% free. There are no subscriptions, registration requirements, file size limits, or watermark insertions."
    },
    {
      question: "Can I save metadata settings as a template?",
      answer: "Yes. Once you have configured standard or custom metadata values, you can save them as a template. This allows you to apply the same properties to future uploads without having to type them in again."
    },
    {
      question: "Does the editor support PDF/A files?",
      answer: "Yes. The editor can modify the metadata of PDF/A files. However, keep in mind that PDF/A has strict rules regarding metadata formatting (such as requiring matching XMP packets), so we recommend using Privacy Mode only if you do not need to strictly maintain the PDF/A validation profile."
    },
    {
      question: "What happens if my PDF is password-protected?",
      answer: "If a PDF is password-protected or has editing restrictions, you will need to enter the password or unlock the file before the tool can read and write its metadata."
    },
    {
      question: "Why does my operating system show different PDF properties?",
      answer: "Windows File Explorer or macOS Finder might cache document metadata or read only specific legacy fields. After exporting a PDF from our tool, your operating system will display the updated values once it refreshes its file index cache."
    },
    {
      question: "Can I edit the metadata of scanned PDFs?",
      answer: "Yes. Scanned PDFs have the same metadata structures as searchable PDFs. You can view, edit, or clean their properties in the same way."
    },
    {
      question: "Does removing metadata make my PDF file size smaller?",
      answer: "Yes, slightly. Stripping custom fields and deleting large XML XMP metadata streams can reduce the file size of your PDF by a few kilobytes."
    },
    {
      question: "Is there a limit to the number of keywords I can add?",
      answer: "No, there is no technical limit to the number of keywords you can add. However, it is best practice to keep them concise, relevant, and comma-separated for optimal search indexing."
    },
    {
      question: "How do search engines use PDF keywords?",
      answer: "Web search engines (like Google or Bing) read PDF metadata to index document contents. Relevant titles, descriptions, and keywords in your PDF metadata help improve the document's search visibility (SEO)."
    },
    {
      question: "Can I view PDF metadata without editing it?",
      answer: "Yes. You can simply upload your PDF, view all parsed standard and custom properties in the comparison panel, and exit the tool without clicking export. Since the tool runs locally, no changes are made unless you choose to download the file."
    },
    {
      question: "What character sets are supported for metadata fields?",
      answer: "We support full UTF-8 character encoding. You can enter metadata in any language, including special symbols, non-Latin alphabets (such as Cyrillic, Kanji, or Arabic), and emojis."
    },
    {
      question: "What is PDF version metadata, and can I change it?",
      answer: "PDF version metadata (e.g., PDF-1.4, PDF-1.7) indicates the PDF specification version used to compile the file. Our tool extracts and displays the PDF version, but it cannot change the binary version tag, as that is determined by the document's internal structure."
    },
    {
      question: "What is a custom property key?",
      answer: "A custom property key is a text identifier for a non-standard metadata field. It must be alphanumeric and should not contain spaces or special characters (e.g. 'CorporateID' rather than 'Corporate ID')."
    },
    {
      question: "Can I restore metadata after I have cleared it?",
      answer: "No. Once you click export and download the sanitized PDF, the original metadata is permanently removed from that downloaded file. We recommend keeping a backup copy of your original PDF if you think you might need the metadata later."
    },
    {
      question: "Does the editor support massive PDF files?",
      answer: "Yes. Since the metadata editing runs client-side in the browser, file sizes are limited only by your device's RAM. It can easily handle PDFs containing hundreds of megabytes or thousands of pages."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes. Because the PDF parsing and writing engine runs entirely locally in your browser, once the page is loaded, you can disconnect from the internet and continue editing PDF metadata offline."
    },
    {
      question: "What metadata is removed in Privacy Mode?",
      answer: "Privacy Mode removes: Author, Creator, Producer, Creation Date, Modification Date, all custom properties, and deletes the XMP stream dictionary from the catalog. This wipes out editing programs, usernames, file systems, and timestamps."
    },
    {
      question: "How does the tool show before/after metadata differences?",
      answer: "We provide a live comparison panel that lists your document's original metadata fields alongside your newly updated properties. This lets you inspect changes side-by-side before downloading the final file."
    },
    {
      question: "Are metadata template presets saved on your servers?",
      answer: "No. Any custom metadata templates or property presets you save are stored in your browser's LocalStorage. They are never uploaded or shared."
    },
    {
      question: "What happens if a PDF file is corrupted?",
      answer: "If the PDF's internal object structure is severely corrupted, the parser will throw an error. The tool will display a user-friendly alert explaining that the file cannot be read, rather than crashing."
    },
    {
      question: "Why should I use local PDF metadata editors instead of Acrobat?",
      answer: "Adobe Acrobat is a premium, paid desktop application. Our tool offers a fast, free, web-based alternative that runs in any browser on any device. It processes files locally in seconds, offering the same security and privacy as a desktop app without requiring any software installation."
    }
  ],

  relatedTools: [
    { name: "PDF Metadata Viewer", slug: "pdf-metadata-viewer" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Organize PDF", slug: "organize-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" }
  ],

  features: [
    "View complete PDF file details including version and page count",
    "Edit standard properties: Title, Author, Subject, Keywords, Creator, Producer",
    "Add, edit, or remove custom metadata properties (e.g. Department, Reference ID)",
    "One-click Privacy Mode to strip all personal details, dates, and XMP streams",
    "Side-by-side before/after comparison panel",
    "Save metadata settings as templates for future reuse",
    "Process multiple PDFs in batch mode and export as a ZIP",
    "100% secure client-side browser execution—no file uploads"
  ],

  useCases: [
    "Remove author names and software tags from documents to preserve privacy",
    "Add keywords and subjects to business reports to improve catalog search indexing",
    "Format metadata fields of academic papers to conform to APA or MLA requirements",
    "Index court files with custom Bates numbering and case ID metadata",
    "Sanitize public-facing PDFs to prevent leaking server directory paths or system usernames",
    "Automate standardized corporate metadata tagging using template configurations"
  ],

  howToSteps: [
    "Select or drag and drop your PDF files into the upload box.",
    "View the parsed document information, including standard fields and custom properties.",
    "Type new values into the metadata editor inputs to update properties.",
    "Toggle 'Privacy Mode' if you want to completely sanitize and remove all hidden properties.",
    "Add custom metadata fields (e.g. Project Name) using the properties panel.",
    "Verify changes in the live before/after comparison panel, and click 'Export PDF' to download."
  ],

  examples: [
    {
      title: "Sanitizing PDF Properties",
      description: "Remove system credentials and document creation timestamps prior to public release.",
      input: "Author: John Doe\nCreator: Word 2016\nCreationDate: D:20260601100000Z\nProducer: OS X Quartz\nCustomKey: InternalSharePath(/servers/finance/docs/)",
      output: "Author: (Removed)\nCreator: (Removed)\nCreationDate: (Removed)\nProducer: (Removed)\nCustomKey: (Deleted)\nXMP stream: (Wiped)"
    },
    {
      title: "Adding Corporate Metadata",
      description: "Embed official corporate metadata details, keywords, and department classifications.",
      input: "Title: Annual Statement\nAuthor: (Empty)",
      output: "Title: Nexus Corp 2026 Annual Report\nAuthor: Nexus Corporation\nKeywords: Finance, Annual Report, 2026\nDepartment: Finance Division\nSecurityClass: Confidential"
    }
  ]
};
