import { ToolConfig } from './types';

export const editPdfConfig: ToolConfig = {
  slug: "edit-pdf",
  title: "Edit PDF",
  shortDescription: "Edit, annotate, draw, and sign PDF documents online. Add text, shapes, and images directly in your browser. 100% secure, private, and local.",
  category: "PDF Manipulation Tools",
  keywords: [
    "Edit PDF", "PDF editor", "online PDF editor", "add text to PDF", "annotate PDF",
    "highlight PDF", "sign PDF", "modify PDF", "PDF productivity", "free PDF editor",
    "draw on PDF", "insert image into PDF", "electronic signature PDF", "rearrange PDF pages",
    "fill PDF form", "delete PDF pages", "PDF annotation tool", "web PDF editor",
    "modify PDF text", "add watermark to PDF", "safe PDF editor", "no install PDF editor"
  ],

  longDescription: `
## The Comprehensive Guide to Digital Document Editing: Master the PDF Layout

The Portable Document Format (PDF) was developed by Adobe in the early 1990s as a way to share documents containing text formatting, inline graphics, and layout rules across different operating systems. The core design philosophy of a PDF is absolute preservation: once compiled, a PDF should look exactly the same whether it is opened on a Windows desktop, an Apple iPhone, a Linux workstation, or printed on physical paper. 

To achieve this cross-platform visual consistency, PDFs operate on a fixed-layout design system. Unlike responsive web pages or flowable text documents (like Microsoft Word or HTML files), a PDF specifies the exact coordinates ($x, y$ offsets) of every letter, vector path, line, and image block on the page relative to a grid. 

While this makes the PDF excellent for sharing finished agreements, reports, and books, it makes editing them notoriously difficult. Normal text files allow you to insert letters and have the surrounding paragraphs wrap naturally. In a PDF, there is no inherent concept of a "paragraph" or "word flow" at the layout engine level. The file simply contains draw commands: "draw letter 'A' at offset (100, 250), draw letter 'B' at offset (106, 250)". 

Our **Online Edit PDF Tool** provides a client-side solution to this challenge. Operating directly inside your browser tab, it decodes the underlying layout stream, renders the visual canvas, overlays a flexible object interaction layer, and lets you add text, draw vectors, embed images, apply highlight annotations, and sign documents safely without downloading or installing any desktop software.

---

## Browser-Based Client-Side PDF Editing: Security and Privacy

Most web-based PDF editors require you to upload your files to external server farms. Once uploaded, a server parses your file, modifies it, and sends it back to you. This model poses severe privacy and compliance risks. If you are handling corporate financial reports, medical histories, legal agreements, or student transcripts, uploading them to third-party databases can violate standard regulations (including GDPR, HIPAA, and CCPA).

Our utility utilizes a **privacy-first local-first architecture**:
1. **Zero-Upload Sandbox**: Smaller files are loaded directly into your browser using WebAssembly and Javascript engines.
2. **Local Compilation**: When you click "Export PDF", the editing coordinates, text strings, and vector shapes are drawn directly onto the page locally.
3. **No File Transmission**: Your documents never leave your physical device. Your data remains completely private.
4. **Offline Capability**: Once the page is loaded, you can disconnect your internet connection and edit your documents completely offline.

---

## Anatomy of the Editor: Visual Overlays and Coordinate Mapping

To understand how our tool allows you to modify a PDF, we must examine the coordinate conversion pipeline:

### 1. Document Rendering
The tool utilizes **PDF.js** to parse the binary object tree of the uploaded PDF. It extracts the page layout, font dictionaries, and color profiles, and renders each page page-by-page onto a standard HTML5 \`<canvas>\` element.

### 2. The Interaction Overlay
Directly on top of the rendered canvas, we overlay a transparent, high-precision SVG/HTML layer that has matching width, height, and scale. When you draw a shape, type text, or drop an image, the tool records the coordinates ($x, y$), width, height, rotation angle, and stroke weights inside a local React state array representing the *Object Layer*.

### 3. Coordinate Transformation
Because the rendered canvas scale changes depending on your browser's zoom level, page viewport width, and device screen size (e.g. mobile vs. desktop), the editor converts layout pixels into absolute PDF units ($1/72$ inch postscript units). This coordinate mapping ensures that when you drop a text box or place a signature, it appears in the exact same location on the exported PDF regardless of what device you are using to edit.

### 4. Vector Path Compilation
When you draw freehand lines, write text, or drop shapes, the editor translates these layers into PDF vector drawing commands (like page stream operators) using **pdf-lib**. These instructions are injected into the exported PDF file structure, creating high-fidelity visual representations that are native to the PDF format rather than simple flat images.

---

## Comprehensive Feature Guide

### 1. Advanced Text Insertion and Typography
Add text blocks to fill out unformated forms, add notes, or append paragraphs. The editor supports:
- **Font Properties**: Customize font sizes, weights, and select standard families (Helvetica, Times Roman, Courier).
- **Text Alignment**: Align paragraphs (Left, Center, Right) to match document margins.
- **Transformations**: Move text boxes anywhere, resize them to enforce text wrapping, and rotate them by any angle to label diagonal drawings or blueprints.

### 2. High-Fidelity Vector Shapes
Illustrate ideas, highlight regions, or block out content using shape overlays:
- **Rectangles & Circles**: Outline key figures or create background fill containers.
- **Lines & Arrows**: Point to specific columns, labels, or call-out text segments.
- **Fills & Borders**: Adjust fill transparency, border colors, and stroke weights to suit your design.

### 3. Digital Signatures and Electronic Signatures
Signing contracts, waivers, and NDAs is one of the most common document editing needs. Our signature module provides three options:
- **Draw Signature**: Draw your signature using a stylus, mouse, or trackpad with smooth vector line curves.
- **Type Signature**: Type your name and convert it to a beautiful handwritten script font.
- **Upload Signature**: Upload a scanned image of your physical signature (supports PNG with transparent backgrounds).
Once placed, you can scale, reposition, and rotate the signature to fit clean sign lines.

### 4. Interactive Annotations and Drawing Tools
Annotate, review, and comment on papers:
- **Freehand Drawing (Pencil / Marker)**: Highlight passages, scribble notes, or sketch layouts with custom line widths and opacities.
- **Text Annotations**: Highlight, underline, or strikeout key text areas.
- **Sticky Notes**: Drop comment tags anywhere on the page to leave detailed reviews.

### 5. Document Page Management
Structure your documents correctly directly from the sidebar layout:
- **Rearrange Pages**: Drag and drop page thumbnails to reorder pages.
- **Rotate Pages**: Fix landscape pages that were scanned sideways.
- **Delete Pages**: Remove blank pages or irrelevant sections.
- **Duplicate Pages**: Clone existing form templates or page structures.

---

## Business and Professional Workflows

### 1. Corporate and Legal Agreements
Speed up contract cycles. Instead of printing, signing physically, and scanning a contract back, corporate users can write text, apply signatures, and save agreements electronically in seconds.

### 2. Academic and Educational Reviews
Teachers and students can review theses, assign grades, write feedback margins, highlight citations, and annotate research papers directly without printing.

### 3. Construction and Architecture Layouts
Use arrows, lines, and custom text blocks to mark up site blueprints, call out structural elements, and annotate scale measurements on site layouts.

By leveraging client-side Web APIs, this utility bridges the gap between static PDFs and dynamic web apps, offering a professional document suite that operates with ultimate security and efficiency.
  `,

  features: [
    "Full-featured PDF editor toolbar: insert text, shapes, vector drawings, images, and digital signatures.",
    "HTML5 Canvas Overlay technology: select, resize, rotate, move, and copy any object after it has been drawn.",
    "Comprehensive page management: drag-and-drop page sorting, delete pages, rotate pages, and duplicate pages in the sidebar.",
    "Secure digital signatures: draw signature with mouse/stylus, type signature with hand-written script fonts, or upload png transparent files.",
    "Annotation options: apply text highlights, underlines, strikeouts, sticky note comments, and markup indicators.",
    "Local-first browser sandboxing: all editing processes compile in local memory without uploading files to external databases.",
    "Robust undo/redo stack: unlimited rollback changes for all object edits, placements, and deletions.",
    "Auto-save drafts: automatically preserves current document state in localStorage to prevent loss of edits during refresh.",
    "High-fidelity PDF compilation: outputs clean postscript paths, text objects, and image dictionaries using pdf-lib.",
    "Fully responsive Adobe-inspired design: side-by-side thumbnail navigation panel and responsive toolbars.",
    "Strict keyboard shortucts: Ctrl+S to save, Ctrl+Z to undo, Ctrl+Y to redo, and Delete to remove selected object."
  ],

  useCases: [
    "Adding an electronic signature to a freelance contract or rental lease agreement.",
    "Filling out non-fillable flat PDF forms by inserting text fields on top of lines.",
    "Drawing circles, lines, and boxes to mark up design layouts and blueprints.",
    "Highlighting citations and writing comments on research paper drafts.",
    "Deleting blank pages and rearranging page order before exporting a final report.",
    "Inserting a company logo image watermark on top of corporate presentations."
  ],

  howToSteps: [
    "Upload your PDF by dragging it into the editor sandbox or browsing your local files.",
    "Use the Left Sidebar to navigate pages, view thumbnails, or reorder pages via drag-and-drop.",
    "Select any tool from the Top Toolbar (e.g. Add Text, Draw, Rectangle, Image, or Signature).",
    "Click or draw on the page canvas to place or sketch your object.",
    "Adjust colors, font sizes, weights, fills, border widths, and opacity in the Right Settings Panel.",
    "Reposition, resize, or rotate your objects using the interactive transformation handles.",
    "Verify your changes, use Undo/Redo as needed, and click 'Export PDF' to download your final optimized document."
  ],

  examples: [
    {
      title: "Electronic Signature Placement",
      description: "Quickly sign a rental agreement by typing or drawing your signature and placing it on page 3.",
      input: "Lease_Contract.pdf (4 pages) -> Add Signature -> Draw Signature applied",
      output: "Lease_Contract_Signed.pdf (4 pages) -> Signature embedded cleanly on page 3"
    },
    {
      title: "PDF Form Filling",
      description: "Fill out a flat scanned job application by placing text elements over blank text fields.",
      input: "Application_Form.pdf (1 page) -> Add Text selected -> Placed name and email fields",
      output: "Application_Form_Filled.pdf (1 page) -> All text boxes compiled as vector text layers"
    }
  ],

  faq: [
    {
      question: "How do I edit a PDF file online?",
      answer: "Upload your document to our tool. Click any tool in the toolbar (Text, Shape, Drawing, or Signature) to add layers, configure styles in the right panel, and click 'Export PDF' to download."
    },
    {
      question: "Is this Edit PDF tool free?",
      answer: "Yes, this editor is 100% free with no registration, no watermarks, and no usage limits."
    },
    {
      question: "Are my files secure when editing?",
      answer: "Yes. Our tool runs client-side inside your browser sandbox. Files never leave your computer, ensuring complete privacy."
    },
    {
      question: "Can I add text to a PDF?",
      answer: "Yes, you can click 'Add Text', type anywhere, change the font family, font size, weight, color, alignment, and move/rotate it."
    },
    {
      question: "How do I sign a PDF?",
      answer: "Click the 'Signature' tool. You can draw your signature, type your name using script fonts, or upload an image file of your signature."
    },
    {
      question: "Can I highlight text inside a PDF?",
      answer: "Yes, you can use the highlight annotation tool or marker tool to draw transparent highlight rectangles over paragraphs."
    },
    {
      question: "Does this tool support scanned PDFs?",
      answer: "Yes. You can edit scanned PDFs by overlaying text, drawing shapes, and inserting annotations directly on top of the page images."
    },
    {
      question: "Can I insert images into a PDF?",
      answer: "Yes, you can upload images (PNG, JPG, SVG, WebP), scale, rotate, and position them anywhere in the document."
    },
    {
      question: "Can I delete or remove pages from the PDF?",
      answer: "Yes, the sidebar displays page thumbnails. You can click the delete icon on any thumbnail to remove that page."
    },
    {
      question: "How do I rearrange the order of pages?",
      answer: "Click and drag any page thumbnail in the left sidebar to change its position, then export the PDF."
    },
    {
      question: "Can I rotate individual pages?",
      answer: "Yes, you can click the rotate button on a thumbnail to rotate that page by 90, 180, or 270 degrees."
    },
    {
      question: "Is there an undo and redo feature?",
      answer: "Yes, the editor has an unlimited undo/redo history stack to revert edits or recover deleted objects."
    },
    {
      question: "Does the editor support keyboard shortcuts?",
      answer: "Yes, it supports Ctrl+S to export, Ctrl+Z to undo, Ctrl+Y to redo, and the Delete key to remove the selected object."
    },
    {
      question: "Can I copy and paste annotations?",
      answer: "Yes, select any object and use Ctrl+C to copy and Ctrl+V to paste it on the same page or another page."
    },
    {
      question: "Will my text formatting be preserved?",
      answer: "Yes, when you export, the newly added text is embedded into the PDF structure using standard vector PDF fonts."
    },
    {
      question: "Can I edit PDFs on my phone or tablet?",
      answer: "Yes, our layout is fully responsive and supports touch inputs for drawing, moving, and scaling objects on mobile screens."
    },
    {
      question: "Does it support password-protected files?",
      answer: "No, password-protected PDFs must be decrypted or unlocked before they can be loaded into the editor."
    },
    {
      question: "What image formats are supported?",
      answer: "You can insert images in PNG, JPG, JPEG, SVG, and WebP formats."
    },
    {
      question: "How does the auto-save feature work?",
      answer: "Your progress is saved to your browser's localStorage. If the tab refreshes, the editor recovers your active draft."
    },
    {
      question: "Does editing a PDF alter the original text layer?",
      answer: "This editor allows you to add text, annotations, and shapes on top of existing layers. It does not overwrite the existing text layer directly, ensuring the original PDF remains compliant and high-fidelity."
    },
    {
      question: "Can I add page numbers to the PDF?",
      answer: "Yes, you can manually place text boxes for page numbering or use annotations."
    },
    {
      question: "Is there a file size limit for uploading PDFs?",
      answer: "We support files up to 150MB. Large files may experience longer rendering times depending on your device's memory."
    },
    {
      question: "How do I draw arrows and shapes?",
      answer: "Select the shape tool from the toolbar, click and drag on the page canvas to define size, and adjust fill/border colors in the right panel."
    },
    {
      question: "Does the export option optimize file size?",
      answer: "Yes. pdf-lib rebuilds the catalog and strips redundant duplicate objects during export to keep file sizes small."
    },
    {
      question: "Can I add watermark labels?",
      answer: "Yes, you can add text or upload a PNG image, place it across pages, and adjust its opacity to serve as a watermark."
    },
    {
      question: "What fonts can I use?",
      answer: "The editor supports standard PDF fonts including Helvetica, Times Roman, and Courier, with normal, bold, and italic styles."
    },
    {
      question: "Is OCR supported in this editor?",
      answer: "This version does not perform optical character recognition (OCR), but you can edit pre-OCR scanned pages by drawing overlays."
    },
    {
      question: "Can I duplicate template pages?",
      answer: "Yes, the thumbnail panel features a duplicate button to clone pages, including their layout and contents."
    },
    {
      question: "Are signatures legally binding?",
      answer: "Electronic signatures created here are generally compliant with the ESIGN Act and eIDAS, but check local regulations for specific legal documents."
    },
    {
      question: "Can I search for text inside the PDF?",
      answer: "Yes, there is a search utility in the left sidebar that scans page content and lists matches."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes, once the website loads, the entire editing and compilation process is handled in local browser memory without needing internet access."
    },
    {
      question: "What is the grid snapping feature?",
      answer: "Grid snapping aligns moved or resized objects to a virtual grid, ensuring clean layout alignments."
    },
    {
      question: "Can I edit forms?",
      answer: "Yes, you can place text fields over form lines to fill out flat surveys, applications, and tax documents."
    },
    {
      question: "How do I remove an annotation?",
      answer: "Select the object by clicking it, and press the Delete key or click the trash can icon on the selector box."
    },
    {
      question: "Can I merge other PDFs during editing?",
      answer: "To merge multiple documents, we recommend using our dedicated 'Merge PDF' tool before uploading the combined file to the editor."
    }
  ],

  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ]
};
