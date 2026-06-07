import { ToolConfig } from './types';

export const organizePdfConfig: ToolConfig = {
  slug: "organize-pdf",
  title: "Organize PDF",
  shortDescription: "Rearrange, rotate, delete, duplicate, and insert pages in your PDF documents. Fast, secure, and 100% local client-side processing.",
  category: "PDF Tools",
  keywords: [
    "Organize PDF", "Rearrange PDF Pages", "PDF Page Organizer", "Manage PDF Pages", "Sort PDF Pages",
    "PDF Editing", "PDF Productivity", "Business Documents", "Online PDF Tools", "PDF Workflow Management",
    "Rotate PDF Pages", "Delete PDF Pages", "Duplicate PDF Pages", "Insert Blank Page", "Combine PDF Pages",
    "Free PDF Organizer", "Local PDF Page Rearrange", "Secure PDF Editor", "Client-Side PDF Sorting"
  ],

  longDescription: `
## The Enterprise Guide to PDF Page Organization and Document Structuring

In modern digital environments, document assembly is a core workflow for corporations, legal firms, educational institutions, and developers. Portable Document Format (PDF) files serve as the universal standard for sharing finalized documents, ensuring that layout, typography, and visual assets remain identical across all platforms and devices. However, as business documents are compiled from multiple sources, the need to organize, sort, delete, duplicate, insert, and rotate pages frequently arises.

This article explores the technical details of PDF structure, examining how pages are managed within the file specification, the challenges of client-side web rendering, and how to optimize document compilation pipelines safely without exposing confidential data.

---

## 1. Anatomy of a PDF: How Pages are Structured Internally

To understand how pages are rearranged or organized, it is necessary to examine the underlying structure of a PDF document as defined by the ISO 32000 specification. A PDF is not a simple linear flow of text, but a structured database of cross-referenced objects.

### The Document Catalog and Page Tree
At the root of a PDF's internal structure is the **Document Catalog**, represented by the \`/Catalog\` dictionary. This catalog points to various resource maps, outline structures, metadata streams, and the **Page Tree**.

The Page Tree is a balanced tree structure that defines the order and attributes of all pages in the document. It consists of two primary types of nodes:
- **Intermediate Nodes (\`/Pages\`):** These define hierarchy and can contain references to other \`/Pages\` nodes or individual page leaf nodes. They maintain structural statistics like the total page count for all descendants.
- **Leaf Nodes (\`/Page\`):** These represent individual pages. Each contains page-specific properties, resource maps, and content references.

### Anatomy of a \`/Page\` Leaf Node
An individual page dictionary contains keys that define its properties and resources:
- **\`/Type\`**: Identifies the object type, which must be \`Page\`.
- **\`/Parent\`**: A reference pointing back to the parent \`/Pages\` node in the tree hierarchy.
- **\`/Resources\`**: A dictionary mapping resources required for rendering (e.g., fonts, raster images, graphics states, and forms).
- **\`/MediaBox\`**: A rectangle defining the physical boundaries of the page medium (e.g., Letter size, A4, or custom dimensions).
- **\`/Contents\`**: A content stream (or array of streams) containing the layout instructions that draw paths, write text, and display images on the canvas.
- **\`/Rotate\`**: An integer representing the rotation angle. If present, it must be a multiple of 90 degrees (0, 90, 180, 270) oriented clockwise.

When we organize a PDF—such as rearranging page order, deleting elements, or rotating page orientations—we are updating these specific internal object structures.

---

## 2. Inner Mechanics of Page Organization Operations

Updating a PDF document's layout is not just a matter of changing byte locations. It requires parsing the file into a structural node tree, applying operations, and rebuilding the document catalog cleanly.

### Rearranging and Sorting Pages
When rearranging pages, the tool updates the children array of the parent \`/Pages\` tree node:
1. The document is parsed to locate all \`/Page\` object references (indirect references like \`12 0 R\`).
2. The order of these references in the root \`/Pages\` dictionary's \`/Kids\` array is updated.
3. The total descendant count (\`/Count\`) is verified.
4. The cross-reference table (xref) is updated to link the rearranged page references correctly.

### Deleting Pages
Removing a page requires removing its reference from the \`/Kids\` array and adjusting page pointers:
1. The target leaf reference is removed from the \`/Kids\` array.
2. The \`/Count\` property in all parent \`/Pages\` nodes up the tree is decremented.
3. Any unique resource objects used only by the deleted page (fonts, forms, images) are identified. During save optimization, these orphan objects are removed to reduce file size.

### Duplicating Pages
Duplicating a page is not as simple as pointing to the same leaf node reference twice. Doing so can cause file structure conflicts because leaf nodes must have unique parent references.
1. The tool clones the \`/Page\` leaf node dictionary, creating a new object reference.
2. To keep the file size small, the content streams and resource dictionaries (such as fonts and images) are shared by reference, avoiding duplication of actual assets.
3. The newly generated page dictionary reference is inserted into the parent \`/Kids\` array.

### Rotating Pages
Rotating a page updates the rotation offset relative to the original layout:
1. The page node dictionary is checked for a \`/Rotate\` key.
2. The angle (0, 90, 180, or 270 degrees) is adjusted.
3. If no \`/Rotate\` key is defined, the parent nodes are checked for a default rotation inherited by the page. If none exists, a new \`/Rotate\` key is added to the page dictionary.

### Page Insertion: Blank Pages and Document Merging
Inserting pages introduces new content nodes into the page tree:
- **Blank Page Insertion**: The tool creates a new \`/Page\` leaf node with a default \`/MediaBox\` (e.g., A4 dimensions: 595 by 842 points) and an empty content stream.
- **Document Merging**: When inserting pages from a secondary PDF, the target page object is copied into the destination document. Any external dependencies, such as fonts or images referenced in the page's \`/Resources\` map, must also be copied and registered within the target document's resources map.

---

## 3. High-Performance Client-Side Rendering and UX Challenges

Performing PDF operations inside a web browser sandbox offers security benefits but introduces performance challenges, especially for large documents with hundreds of pages.

### Lazy-Loaded Previews and DOM Optimization
Rendering hundreds of high-quality page previews simultaneously can exhaust browser memory. Our tool uses two optimizations to maintain a responsive interface:
1. **Intersection Observer Dynamic Rendering**: Only pages currently visible in the user's viewport are loaded and rendered. Hidden page thumbnails are kept as light placeholder elements.
2. **Canvas Context Recycling**: When page thumbnails scroll out of view, the rendering tasks are canceled, and the canvas contexts are freed, keeping memory usage minimal.

### Drag-and-Drop Operations with dnd-kit
Rearranging page grids relies on drag-and-drop mechanics. Using \`@dnd-kit/sortable\` ensures a responsive interface:
- **Collision Detection**: The tool calculates grid coordinates in real time to provide visual feedback as pages are dragged.
- **Hardware-Accelerated CSS Transitions**: Page positions are animated using CSS transforms to keep performance smooth.
- **Zero Layout Shifts**: Placeholder elements reserve page dimensions during drag interactions, keeping the rest of the layout stable.

---

## 4. The Client-Side Security Model: Protecting Confidential Information

Traditional online PDF tools require uploading files to cloud servers. This exposes sensitive data to risks:
- **Data Privacy Violations**: Sensitive records like financial reports, legal contracts, and personal documents are exposed to potential security breaches on third-party servers.
- **Regulatory Risks**: Compliance rules like GDPR and HIPAA restrict sharing personal health information (PHI) or personally identifiable information (PII) with unverified systems.

Our tool resolves these issues with a **100% client-side security architecture**:
- **Local Memory Buffer**: Documents are parsed in the browser's local RAM using Javascript.
- **Local CPU Processing**: Sorting, rotation, and file assembly are performed on the user's device.
- **Zero Network Transmission**: No document data is sent to external servers, and the tool can run completely offline.

---

## 5. Session Recovery and Workspace Resilience

Working with large files over long periods requires protection against data loss due to accidental page refreshes or browser crashes.

### Local Draft Recovery via IndexedDB
Since standard localStorage has a 5MB storage limit, saving large PDF binaries directly is not feasible. Our tool uses **IndexedDB** for local draft recovery:
1. **File Caching**: The original PDF binary streams are stored as binary Blobs in a local database.
2. **State Syncing**: The page layout state (index arrays, rotations, duplicates, deletions) is synced to the database after every action.
3. **Session Restore**: If a refresh occurs, the workspace state is rebuilt from IndexedDB, restoring the session exactly where it was left.

---

## 6. Optimization and Cleanup During Document Compilation

Recompiling the page tree can leave unused objects in the file structure. During export, the tool performs a cleanup process:
1. **Unused Object Removal**: The tool scans the document from the root \`/Catalog\` downwards, identifying orphan objects (e.g., fonts, metadata streams, and images from deleted pages) and removing them.
2. **Cross-Reference Table (xref) Rebuilding**: Offsets are recalculated to compile a clean, optimized file structure.
3. **Linearization Options**: The file is prepared for incremental web delivery (page-at-a-time loading), enabling fast initial displays.
`,

  faq: [
    {
      question: "How do I rearrange PDF pages?",
      answer: "Upload your PDF, drag and drop the page thumbnails into your desired order, and click 'Save Changes' to download the organized PDF."
    },
    {
      question: "Can I organize multiple PDFs at the same time?",
      answer: "Yes. You can upload a primary PDF, then click 'Insert Pages' to upload additional files. All pages will appear in the workspace for you to sort and merge."
    },
    {
      question: "Is there a limit on the number of pages I can sort?",
      answer: "No. Since the processing runs locally on your device, there are no software page limits. Performance depends on your browser's memory and CPU."
    },
    {
      question: "Can I insert a blank page into the PDF?",
      answer: "Yes. Click 'Insert Blank Page' in the toolbar to add a blank page at the end of your document or after a selected page."
    },
    {
      question: "How do I delete specific pages?",
      answer: "Hover over the thumbnail of the page you want to delete and click the trash icon. You can also select multiple pages and delete them in bulk."
    },
    {
      question: "Can I duplicate page leaf nodes?",
      answer: "Yes. Click the duplicate icon on a page thumbnail or select multiple pages and use the 'Duplicate Selected' bulk action."
    },
    {
      question: "How do I rotate individual pages?",
      answer: "Each page thumbnail features rotation buttons to turn it 90 degrees clockwise or counterclockwise. You can also select multiple pages to rotate them in bulk."
    },
    {
      question: "Does the PDF organizer preserve high-resolution images?",
      answer: "Yes. The tool updates the structural page tree without recompressing or altering the original image resources or font tables, preserving quality."
    },
    {
      question: "What are the bulk page selection presets?",
      answer: "You can select all pages, clear selections, or use filter presets to instantly select all odd pages, even pages, or a specific page range."
    },
    {
      question: "Can I undo mistakes?",
      answer: "Yes. The tool maintains an undo and redo stack, letting you revert adjustments step-by-step using the buttons or keyboard shortcuts."
    },
    {
      question: "Are my files uploaded to your servers?",
      answer: "No. The tool runs entirely in your web browser. Your files are processed locally and are never uploaded or stored on any server."
    },
    {
      question: "Can I recover my progress if I close the browser tab?",
      answer: "Yes. The tool saves your active session state and document binaries locally using IndexedDB. If the tab is closed, you will be prompted to restore your session."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes. The interface is responsive, and drag-and-drop actions are optimized for touch interactions on iOS and Android devices."
    },
    {
      question: "Can I merge pages from another PDF?",
      answer: "Yes. Use the 'Insert PDF' option to choose a secondary file, which will load its pages directly into your active workspace."
    },
    {
      question: "What keyboard shortcuts are supported?",
      answer: "We support Ctrl+Z for Undo, Ctrl+Y for Redo, Delete for removing selected pages, Ctrl+D for duplicating selected pages, and Ctrl+S for exporting."
    },
    {
      question: "Does the tool support PDF security passwords?",
      answer: "If a document is encrypted, you must provide the password to open it before you can edit or organize its pages."
    },
    {
      question: "How does the Grid vs. List view help?",
      answer: "Grid view provides a visual overview of page thumbnails, while List view displays larger previews and metadata, useful for detail-oriented sorting."
    },
    {
      question: "Is this PDF organization tool free?",
      answer: "Yes. The tool is free to use, without trial periods, watermarks, or user registration requirements."
    },
    {
      question: "Does page organization affect PDF hyperlinks?",
      answer: "Internal document links (like a table of contents) link to target object IDs. Moving pages retains these links, but external page references may require checking."
    },
    {
      question: "Can I change page dimensions or crop pages?",
      answer: "No. This tool is designed to sort, rotate, insert, and delete pages. To crop or change page dimensions, use a dedicated PDF editor."
    },
    {
      question: "Will the PDF file size increase after organization?",
      answer: "No. The tool cleans up orphan objects from deleted pages, often resulting in a smaller, optimized output file."
    },
    {
      question: "What is PDF linearization, and does this tool support it?",
      answer: "Linearization (Fast Web View) structures a PDF for fast loading on the web. Our export engine rebuilds tables to optimize file loading."
    },
    {
      question: "Can I search for text inside page thumbnails?",
      answer: "You can filter pages by page index or range. Text search inside thumbnails is not supported, as previews are rendered as images for performance."
    },
    {
      question: "How do I download the organized file?",
      answer: "Click the 'Export PDF' button. The tool compiles your changes and prompts you to download the finalized document."
    },
    {
      question: "Does the tool support PDF form fields?",
      answer: "Yes. Interactive form fields are preserved, but duplicating a page with form fields may require adjusting field name namespaces."
    },
    {
      question: "What happens to digital signatures when I organize pages?",
      answer: "Rearranging, adding, or deleting pages invalidates cryptographic digital signatures, as these changes modify the document's structure."
    },
    {
      question: "Is there a limit to how many files I can upload?",
      answer: "There is no set limit. You can insert pages from multiple source files as long as your browser has sufficient memory."
    },
    {
      question: "What standard dimensions are used for new blank pages?",
      answer: "New blank pages are generated using standard A4 dimensions (595 by 842 points) in portrait orientation."
    },
    {
      question: "Does the tool run offline?",
      answer: "Yes. Once the page is loaded, you can disconnect from the internet and continue using the tool, as all processing is local."
    },
    {
      question: "Why do some pages show placeholder indicators?",
      answer: "The tool lazy-loads thumbnails to save memory. A loading placeholder is displayed until a page scrolls into the visible area."
    },
    {
      question: "Does the tool work with scanned PDF documents?",
      answer: "Yes. Scanned pages are treated as image objects and can be sorted, rotated, deleted, or duplicated in the same way as text PDFs."
    },
    {
      question: "Can I save my changes as a draft?",
      answer: "Drafts are auto-saved locally in your browser's IndexedDB. You can export the final PDF to save changes to your disk."
    },
    {
      question: "Is the tool compliant with HIPAA and GDPR regulations?",
      answer: "Yes. Because data is processed entirely client-side and never sent to a server, it complies with HIPAA and GDPR security rules."
    },
    {
      question: "What does the 'Modified Pages' indicator show?",
      answer: "It displays the count of pages that have been rotated, duplicated, inserted, or moved from their original positions."
    },
    {
      question: "Can I adjust the thumbnail size?",
      answer: "Yes. You can use the zoom slider in the toolbar to scale page thumbnails to your preferred workspace size."
    },
    {
      question: "Why does parsing take longer for some PDFs?",
      answer: "Large files with high-resolution images, complex vector graphics, or thousands of objects require more time to parse and render."
    },
    {
      question: "How do I clear the workspace?",
      answer: "Click 'Start Over' or 'Clear Workspace' to delete all files from browser memory and IndexedDB and reset the tool."
    }
  ],
  relatedTools: [
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Unlock PDF", slug: "unlock-pdf" }
  ],
  features: [
    "Interactive Drag & Drop: Drag page thumbnails to rearrange pages using dnd-kit.",
    "Granular Page Controls: Rotate, duplicate, or delete individual pages in a visual grid.",
    "Multi-Page Bulk Actions: Apply actions to selections, odd/even pages, or page ranges.",
    "Page Insertion options: Add blank pages or insert pages from secondary PDF files.",
    "Unlimited Undo/Redo: Revert changes step-by-step with session history navigation.",
    "Draft Auto-Recovery: Store session states in browser IndexedDB to prevent data loss.",
    "Zero-Trust Security: 100% browser-based execution ensures data and password privacy."
  ],
  useCases: [
    "Sorting sections of business documents for board presentations.",
    "Removing placeholder or cover pages from digital ebook drafts.",
    "Inserting legal addendums directly into active PDF contracts.",
    "Rotating upside-down scanned pages in document batches.",
    "Reordering student portfolio sheets for academic submissions."
  ],
  howToSteps: [
    "Upload your primary PDF document into the dashed workspace area.",
    "Rearrange pages by dragging and dropping them, or use rotation, deletion, and duplicate tools.",
    "Click 'Insert Page' to add blank pages or import sheets from other PDF documents.",
    "Click 'Export PDF' to compile and download the organized document."
  ],
  examples: []
};
