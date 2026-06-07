import { ToolConfig } from './types';

export const unlockPdfConfig: ToolConfig = {
  slug: "unlock-pdf",
  title: "Unlock PDF",
  shortDescription: "Remove password protection and operational restrictions from your PDF files. Fast, secure, and 100% client-side browser processing.",
  category: "PDF Tools",
  keywords: [
    "Unlock PDF", "Remove PDF Password", "PDF Unlocker", "Remove PDF Protection", "Decrypt PDF",
    "PDF Security", "PDF Restrictions", "PDF Encryption", "Business Documents", "Secure PDF Management",
    "Online PDF Unlock Tool", "PDF password remover", "client-side PDF decryption", "remove PDF print lock",
    "unlock PDF copy restrictions", "remove PDF edit lock", "unlock secure PDF"
  ],

  longDescription: `
## The Comprehensive Guide to Decrypting Secure PDFs and Managing Document Access Controls

In modern document administration, secure file exchange is a fundamental pillar of business workflows. Large and small organizations alike encrypt sensitive PDFs—such as employment contracts, financial audits, medical records, and legal briefs—to protect data confidentiality. PDF security handlers (governed by the ISO 32000 specification) enable creators to restrict access through User and Owner passwords.

While security is critical, document workflows often require unlocking these files for internal distribution, compilation, or archiving. Unlocking a PDF is the process of removing this cryptographic wrapper. Our **Unlock PDF** tool offers a high-performance, browser-based solution that performs decryption entirely client-side. 

> [!IMPORTANT]
> **Authorization and Password Requirements**: This tool is designed for users who already possess the correct password and have the legal authorization to decrypt the files. This utility **does not support password cracking, dictionary attacks, or brute-force decryption**. Decrypting a PDF without the owner's permission or bypass-cracking is a violation of intellectual property rights and document security principles.

---

## 1. How PDF Decryption Works: Inside the Security Handler

To understand how a PDF is decrypted, we must look at the standard standard encryption dictionaries built into the file structure.

### The /Encrypt Dictionary
When a PDF is protected, the file structure contains an \`/Encrypt\` dictionary reference in the trailer object. This dictionary defines:
- **\`/Filter\`**: The name of the security handler (typically \`Standard\`).
- **\`/V\` & \`/R\`**: The version and revision numbers defining the cryptographic complexity (e.g., version 5, revision 6 for modern PDF 2.0 files).
- **\`/Length\`**: The key size in bits (such as 128 or 256).
- **\`/O\` & \`/U\`**: The Owner and User hash validation arrays.
- **\`/P\`**: The permissions integer representing allowed operations.

### The Decryption Sequence
When you enter a password to unlock a PDF, the decryption engine executes a specific cryptographic handshake:
1. **Password Hashing**: The entered password is padded and hashed using the algorithm version specified in the dictionary (MD5 for older ciphers; SHA-256 or SHA-384 for modern AES-256 structures).
2. **Key Derivation**: If the entered password matches the User hash key, the engine uses the hash value to derive the document's master encryption key. If it matches the Owner hash key, the engine decrypts the owner verification string to reconstruct the user password, and then derives the master encryption key.
3. **Decryption of Object Streams**: The derived master key is fed into a symmetric block cipher (AES or RC4) to decrypt individual object streams (containing page content, text characters, forms, and raster images) as they are parsed into the viewer's memory.
4. **Stripping the Security Envelope**: To permanently unlock the PDF, the engine removes the \`/Encrypt\` reference from the trailer dictionary and writes all document objects back as unencrypted streams, producing a clean, unprotected PDF.

---

## 2. Decryption vs. Cracking: Why Brute-Force is Computationally Impossible

It is common to confuse *decrypting* a document with *cracking* its password. There is a fundamental difference in mathematics and computational complexity between the two.

### Decrypting with a Known Password
When you provide the correct password, the decryption engine performs a direct key derivation function. The validation matches instantly, and the cipher decrypts the file streams in milliseconds. This is a legitimate administrative action.

### Cracking an Unknown Password (AES-256)
Password cracking involves attempting to bypass or discover the encryption key without knowing the password. For modern PDFs protected with **AES-256** (Advanced Encryption Standard with a 256-bit key), cracking is practically impossible:
- **Key Space**: A 256-bit key has 2^256 possible combinations. This is a decimal number with 78 digits (approximately 1.1 x 10^77).
- **Energy Requirements**: To brute-force an AES-256 key using the laws of thermodynamics, a supercomputer testing every combination would require more energy than is produced by the sun over its entire lifetime.
- **Symmetric Hardening**: Even if a computer could test billions of passwords per second, the SHA-256 key derivation round counts (up to 100,000 rounds per attempt in modern PDF Revisions) add processing delays that make large-scale dictionary attacks on AES-256 useless.

Because of these cryptographic boundaries, our **Unlock PDF** tool operates under a strict security policy: it only removes protection when the correct user or owner password is provided. We do not support brute-force cracking because it is computationally infeasible and violates security standards.

---

## 3. Client-Side Decryption: The HIPAA and GDPR Privacy Gold Standard

When managing business documents, data privacy is a primary concern. Traditional online PDF unlockers require you to upload your files to their remote servers, creating significant risks:
- **Data Breaches**: If the server infrastructure is hacked, or if temporary directories are exposed, your sensitive records and document passwords can be stolen.
- **Regulatory Penalties**: Compliance rules like the General Data Protection Regulation (GDPR) and Health Insurance Portability and Accountability Act (HIPAA) strictly restrict the transmission of personal data (PII) or health records (PHI) to unverified third-party servers.

### The Zero-Trust Browser Sandbox
Our **Unlock PDF** tool addresses these vulnerabilities through **100% client-side execution**:
1. **Local Memory Processing**: When you select a PDF file, it is read into your browser's local RAM as a \`Uint8Array\` buffer.
2. **In-Browser Decryption**: The decryption libraries (\`@pdfsmaller/pdf-decrypt\` working in tandem with \`pdf-lib\`) execute inside the browser's Javascript sandbox.
3. **Zero Network Transmission**: No files or passwords are ever sent to our servers. All parsing, validation, and decryption happen locally on your device's CPU.
4. **Offline Capability**: You can load our tool page, disconnect your internet connection, drag in your password-protected PDF, enter the password, and decrypt it. The tool functions entirely offline.

---

## 4. Understanding Operational Restrictions and Permissions

PDF security handlers allow creators to lock specific operations even if you can open and read the file (User password empty, but Owner password set). These restrictions are defined by the \`/P\` bitwise integer flag:

- **Printing Blocks**: The print buttons in PDF readers are grayed out, preventing physical copies.
- **Text & Image Copying**: Users cannot select or copy text blocks, or extract embedded image assets.
- **Modifying & Editing**: Page text, layouts, and vector shapes are locked against changes.
- **Form Filling**: Interactive text inputs and checkbox fields cannot be filled.
- **Document Assembly**: Users cannot insert, delete, or rotate pages.

When you unlock a PDF with the correct Owner Password, the tool reconstructs the document catalog, removes the permissions flag (\`/P\`), and saves the file with all features fully enabled. This restores editing, printing, and copying capabilities for your administrative workflows.

---

## 5. Step-by-Step Guide: How to Unlock and Decrypt Your PDFs

### Step 1: Upload Your Protected Files
Drag and drop your password-protected PDF documents into the dashed upload area, or click the browse button to select them from your hard drive or mobile files. The tool analyzes each file to detect its encryption status. If you upload an unencrypted file, the tool will let you know it is already unlocked.

### Step 2: Enter the Document Passwords
For each encrypted PDF in the list, input the correct password. You can click the eye icon to toggle password visibility. If you uploaded multiple files that share the same password, you can enter it once and click **Apply to All** to save time.

### Step 3: Decrypt the Files
Click the **Unlock PDF** button. The browser-based engine hashes your input, verifies the keys, decrypts the document objects, and removes the security definitions. If the password is wrong, the tool displays a clear "Invalid Password" warning.

### Step 4: Download the Unlocked Documents
Once decrypted, save your files:
- For single PDFs, click the download button to save the unencrypted file.
- For multiple PDFs, the tool bundles all unlocked files into a single **ZIP archive** for easy download.
`,
  relatedTools: [
    { name: "Protect PDF", slug: "protect-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" }
  ],
  features: [
    "100% Browser Decryption: PDF files are processed locally on your machine and never uploaded to any server.",
    "Granular Restriction Removal: Instantly remove print locks, text copying locks, form filling blocks, and page editing blocks.",
    "Strong Password Support: Easily decrypt modern AES-256 and legacy RC4-128 password formats.",
    "Batch Processing: Unlock multiple password-protected PDFs at once in a single session.",
    "Instant Verification: Live password validation checks inputs and shows immediate feedback.",
    "Zipped Downloads: Download all batch-processed, decrypted files in a single ZIP archive.",
    "Zero-Trust Architecture: No document or password keys are logged or stored."
  ],
  useCases: [
    "Removing print restrictions from academic articles for paper-based reviews.",
    "Decrypting legal briefs to copy text blocks into active case notes.",
    "Removing edit locks on corporate templates to update brand layouts.",
    "Permanently unlocking invoice records to automate text extraction script parsing.",
    "Consolidating multiple secured reports into a single, unlocked archive."
  ],
  howToSteps: [
    "Select and upload your password-protected PDF files to the uploader.",
    "Enter the correct open or owner password in the password field next to each document.",
    "Click the 'Unlock PDF' button to verify the passwords and decrypt the documents locally.",
    "Save the decrypted PDFs back to your computer (or as a ZIP folder for batches)."
  ],
  examples: [],
  faq: [
    {
      question: "How do I unlock a PDF?",
      answer: "Upload your password-protected PDF file to our tool, enter the correct password, and click 'Unlock PDF'. The tool will decrypt the document locally and let you download the unlocked version."
    },
    {
      question: "Do I need the password to unlock the PDF?",
      answer: "Yes. This tool requires you to know and enter the correct password. It is an administrative decryption tool, not a password cracking utility."
    },
    {
      question: "Can this tool crack passwords or bypass them without knowing them?",
      answer: "No. The tool does not perform brute-force attacks or password cracking. Bypassing modern AES-256 encryption without the correct password is mathematically impossible in a web browser."
    },
    {
      question: "Is this tool free?",
      answer: "Yes. The tool is 100% free with no page limits, file count caps, or registration requirements."
    },
    {
      question: "Are my files secure?",
      answer: "Yes, because the decryption happens entirely client-side in your web browser. Your files and passwords never leave your device, ensuring complete privacy."
    },
    {
      question: "Can I remove restrictions like printing and copying?",
      answer: "Yes. By entering the correct Owner Password, you can decrypt the PDF and remove all restrictions, enabling printing, copying, editing, and form filling."
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes. The tool is fully responsive and compatible with mobile phones, tablets, and desktops using any modern web browser."
    },
    {
      question: "Are my uploaded files stored on your servers?",
      answer: "No. Our zero-trust architecture means that files are read directly into browser RAM and decrypted locally. No files are uploaded or stored."
    },
    {
      question: "Can I unlock large PDFs?",
      answer: "Yes. Because processing runs locally on your computer's CPU, there are no file upload bottlenecks. The only limit is your browser's memory."
    },
    {
      question: "What happens if I forget my PDF password?",
      answer: "Because we do not store passwords or documents, we cannot recover or retrieve forgotten passwords. You must locate the password to unlock the file."
    },
    {
      question: "What is the difference between a user password and an owner password?",
      answer: "A User (Open) password is required to open and read a PDF. An Owner (Permissions) password is used to configure restrictions like printing, copying, or editing."
    },
    {
      question: "Can this tool unlock multiple PDFs at the same time?",
      answer: "Yes. You can upload multiple PDFs in a batch, enter their passwords, decrypt them together, and download them as a single ZIP archive."
    },
    {
      question: "Why does my browser say a PDF is already unlocked?",
      answer: "If you upload a PDF that does not require a password to open and has no operational restrictions active, the tool will notify you that it is already unlocked."
    },
    {
      question: "Does this tool support AES-256 encryption?",
      answer: "Yes, the tool fully supports high-security AES-256 encryption, which is standard in modern PDF 2.0 files."
    },
    {
      question: "Will unlocking a PDF reduce its visual quality?",
      answer: "No. The decryption process removes the cryptographic security dictionary envelope without modifying the visual contents, page layouts, fonts, or image resolutions."
    },
    {
      question: "Does the tool support legaly binding signatures?",
      answer: "Decrypting or modifying a PDF that has been cryptographically signed will break the digital signature envelope. If a document is signed, it is best to leave it locked to preserve signature integrity."
    },
    {
      question: "How do I know if my PDF is locked?",
      answer: "When you upload a file, the tool automatically parses the file header. If the file requires a password to open, the tool will prompt you to enter the password."
    },
    {
      question: "Can I unlock PDFs offline?",
      answer: "Yes. Once the page is loaded in your browser, you can disconnect your internet and decrypt files offline, as the decryption engine runs entirely on your local CPU."
    },
    {
      question: "Is it legal to remove passwords from a PDF?",
      answer: "Yes, provided you are the owner of the document, have the password, or have been authorized by the owner to remove the protection."
    },
    {
      question: "Why does the uploader reject some PDF files?",
      answer: "This can happen if the file is severely corrupted, is not a PDF, or has a file structure that is unreadable by the browser-based parser."
    },
    {
      question: "Can I use the same password for all files in a batch?",
      answer: "Yes. If you upload multiple files that use the same password, you can enter the password once and click the 'Apply to All' option to unlock all of them in one go."
    },
    {
      question: "Does this tool store the passwords I type?",
      answer: "No. The passwords you type are kept in temporary React state variables in your browser's memory and are never logged, stored, or transmitted."
    },
    {
      question: "Why do some PDF readers still prompt for a password after unlocking?",
      answer: "This only happens if the decryption process failed. If the decryption completes successfully and you download the new file, it will open without a password in all PDF readers."
    },
    {
      question: "What is PDF encryption standard revision 6?",
      answer: "Revision 6 is the latest standard introduced in PDF 2.0, utilizing advanced SHA-384 hashing and AES-256 ciphers to protect files against modern hacking architectures."
    },
    {
      question: "Can I unlock a PDF that is read-only?",
      answer: "Yes. Read-only restrictions are governed by the Owner Password. By providing the owner password to the tool, the read-only constraint is removed."
    },
    {
      question: "How long does it take to decrypt a file?",
      answer: "For most standard PDFs, decryption takes less than a second once the correct password is entered."
    },
    {
      question: "Does this tool support HIPAA compliance?",
      answer: "Yes. Because no files or passwords are sent to a server, this tool complies with HIPAA's security rules for local processing of protected health information."
    },
    {
      question: "Can I remove passwords from a PDF on an iPhone?",
      answer: "Yes. The tool is fully optimized for mobile web browsers on Safari and Chrome on iOS and Android devices."
    },
    {
      question: "How is a ZIP download generated for batch processing?",
      answer: "We use a browser-based compression library (JSZip) to compile the decrypted PDF files into a single ZIP folder in your browser memory before triggering the download."
    },
    {
      question: "Why can't pdf-lib decrypt files on its own?",
      answer: "pdf-lib is designed to modify and compile PDF structures, but it does not contain the cryptographic decryption ciphers or hash validation handlers required to unlock files."
    },
    {
      question: "Can I remove security from a PDF portfolio?",
      answer: "If the portfolio itself is password-protected, the tool can decrypt it. However, if individual files inside the portfolio are encrypted with different passwords, they must be decrypted separately."
    },
    {
      question: "Will unlocking a PDF remove its metadata?",
      answer: "No. The tool preserves the PDF's standard metadata (title, author, creation date) during decryption unless you choose to strip it."
    },
    {
      question: "Is this tool compliant with GDPR?",
      answer: "Yes. Since there is no server-side transfer, storage, or collection of document data or personal info, the tool fully complies with GDPR's privacy-by-design guidelines."
    },
    {
      question: "Can I use the tool on a Chromebook?",
      answer: "Yes. The tool works on ChromeOS, macOS, Windows, Linux, and any platform with a modern, standards-compliant web browser."
    },
    {
      question: "What is the difference between decryption and unlocking?",
      answer: "In this context, they are the same. Unlocking refers to the user experience of removing the password, while decryption is the technical process of decoding the scrambled file bytes."
    },
    {
      question: "Why does a PDF open without a password in Chrome but ask for one in Acrobat?",
      answer: "Some browsers cache PDF passwords or credentials. If Chrome opens a file without prompting but Acrobat does, the file is still encrypted and Chrome is simply remembering the password."
    }
  ]
};
