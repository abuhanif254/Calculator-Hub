import { ToolConfig } from './types';

export const protectPdfConfig: ToolConfig = {
  slug: "protect-pdf",
  title: "Protect PDF",
  shortDescription: "Secure your PDF files with high-grade password encryption and granular permission restrictions. 100% private client-side processing.",
  category: "PDF Tools",
  keywords: [
    "Protect PDF", "Password Protect PDF", "Encrypt PDF", "Secure PDF", "Lock PDF",
    "PDF Security", "PDF Privacy", "PDF Encryption", "Business Documents", "Legal Documents",
    "Confidential Files", "Online PDF Protection", "PDF password locker", "client-side PDF encryption",
    "restrict PDF printing", "restrict PDF copying", "PDF permissions password", "AES-256 PDF protection"
  ],

  longDescription: `
## The Comprehensive Technical Guide to PDF Document Encryption and Security Handlers

In the modern corporate, legal, and educational landscapes, protecting sensitive documents is a critical operational requirement. Financial audits, legal contracts, clinical health records, and corporate blueprints are routinely distributed in the Portable Document Format (PDF). While PDF ensures that visual representation remains consistent across all operating systems and screens, it also contains specific internal data structures designed to control access, verify authenticity, and restrict user operations.

Understanding how a PDF is locked, encrypted, and restricted requires examining the inner workings of the PDF specification (ISO 32000). Rather than relying on simple cloud-based obfuscation, professional security requires understanding standard cryptographic algorithms, internal document dictionaries, and the mathematical representation of document permissions.

---

## 1. Anatomy of PDF Security Handlers and the Encryption Dictionary

A standard PDF file is composed of a header, a body containing objects (pages, fonts, images, text blocks), a cross-reference table (xref) mapping byte offsets, and a trailer that links to the root directory object. When a PDF is protected, an **Encryption Dictionary** is added to the document trailer under the \`/Encrypt\` key.

The \`/Encrypt\` dictionary instructs PDF viewers (such as Adobe Acrobat, Google Chrome, or Apple Preview) how to decrypt the document data streams and what restrictions to enforce. It typically contains the following keys:

- **\`/Filter\`**: The name of the security handler that determines how the document is authenticated (usually \`Standard\`).
- **\`/V\`**: The algorithm version number. It specifies which security handler version is active:
  - \`1\` or \`2\`: RC4 encryption (40-bit or 128-bit).
  - \`4\`: Security handler permitting custom crypt filters.
  - \`5\`: AES-256 encryption introduced in PDF 1.7 Extension Level 3 and finalized in PDF 2.0.
- **\`/R\`**: The revision number of the security handler (e.g., \`2\`, \`3\`, \`4\`, \`5\`, or \`6\`).
- **\`/Length\`**: The length of the encryption key in bits. For AES-256, this key length is \`256\`.
- **\`/O\` (Owner Password Key)**: A 32-byte or 127-byte sequence derived from the owner password. It is used to verify permissions access.
- **\`/U\` (User Password Key)**: A 32-byte or 127-byte sequence derived from the user password. It is checked when a reader opens the file to verify view permissions.
- **\`/P\` (Permissions Integer)**: A 32-bit signed integer representing the bitmask of allowed user operations.

When a viewer opens an encrypted PDF, it parses the trailer, extracts the \`/Encrypt\` dictionary, prompts the user for a password, hashes the input, matches it against \`/U\` or \`/O\`, and builds the encryption key to decrypt the object streams.

---

## 2. The Mathematics of Verification Keys: \`/O\` and \`/U\`

The standard PDF security handler calculates the Owner Key (\`/O\`) and User Key (\`/U\`) through a deterministic hashing process that prevents the retrieval of the original password from the stored document.

### Calculating the User Key (\`/U\`) in Revision 3 (RC4 128-bit)
1. **Padding**: The input user password is padded or truncated to exactly 32 bytes using a fixed padding string defined in the PDF specification.
2. **MD5 Hashing**: An MD5 hash is initialized. The padded password, the file identifier string (\`/ID\` array from the trailer), the permission integer (\`/P\`), and the encrypt metadata are concatenated and hashed.
3. **RC4 Iteration**: The resulting 16-byte MD5 digest is processed through 50 iterations of RC4 encryption using keys derived dynamically. The final 32-byte array represents the \`/U\` value.

### Calculating the Owner Key (\`/O\`) in Revision 3
The Owner Key is designed to allow the owner password to decrypt the user password. When the owner enters their password, the viewer decrypts the \`/O\` value to reconstruct the user password, which is then used to decrypt the rest of the document.
1. **Padding**: The owner password is padded/truncated to 32 bytes.
2. **Initial MD5**: The padded owner password is hashed using MD5.
3. **Iterative Encryption**: The user password (already padded to 32 bytes) is encrypted using RC4 with a key derived from the owner's MD5 hash. This process is repeated 50 times to produce the 32-byte \`/O\` key.

### Modern AES-256 Revision 5 & 6 Hashing
In modern PDF security (Revision 5 and 6, standard in PDF 2.0), the hashing mechanism is updated to use **SHA-256** and **SHA-384** along with **PBKDF2** (Password-Based Key Derivation Function 2) or custom rounding iterations. The passwords are padded, salted with 8-byte random values, and hashed 100,000+ times to prevent brute-force attacks. This provides enterprise-level resistance against modern GPU-based cracking setups.

---

## 3. Cryptographic Algorithms: RC4 vs. AES

Choosing the right security configuration depends on the balance between compatibility and cryptographic strength.

### RC4 (40-bit and 128-bit)
- **Mechanism**: A stream cipher designed by Ron Rivest in 1987. It encrypts byte-by-byte.
- **Security**: 40-bit RC4 is highly vulnerable to brute-force attacks and can be cracked in minutes. 128-bit RC4 is stronger but contains statistical biases that make it vulnerable to sophisticated ciphertext-only attacks.
- **Use Case**: Used today only for legacy compatibility with extremely old PDF readers (Acrobat 5.0 and older).

### AES (Advanced Encryption Standard - 128-bit and 256-bit)
- **Mechanism**: A symmetric block cipher developed by Vincent Rijmen and Joan Daemen. It processes data in 128-bit blocks using key sizes of 128, 192, or 256 bits.
- **Security**: AES-256 is the gold standard for global encryption, trusted by banks, military installations, and governments. There are no known practical attacks against a properly implemented AES-256 cipher.
- **Use Case**: Standard for all modern secure PDFs (Acrobat 7.0 and newer). Our tool defaults to high-security AES encryption engines, ensuring your files are safe from unauthorized extraction.

---

## 4. Granular Permissions and the Bitwise \`/P\` Flag

The PDF specification contains a powerful mechanism for restricting user operations even when a document can be opened and viewed. This is governed by the \`/P\` entry in the encryption dictionary.

The \`/P\` value is a **32-bit signed integer** representing a bitmask. By toggling specific bits to \`0\` (disallowed) or \`1\` (allowed), the creator restricts what the viewer application will permit the user to do. PDF viewers read this integer, parse its bits, and gray out user interface options (like the 'Print' or 'Copy' buttons) accordingly.

### The Bitwise Map of Document Restrictions
Here is how the bits are defined under the standard security handler (using 1-based indexing for bits):

| Bit Position | Value | Operation Controlled | Description when set to 0 |
|:---:|:---:|---|---|
| **Bit 3** | \`4\` | **Printing** | The user cannot print the document. |
| **Bit 4** | \`8\` | **Modifying Contents** | The user cannot modify the content of the document. |
| **Bit 5** | \`16\` | **Text & Image Copying** | The user cannot copy text or extract images to the clipboard. |
| **Bit 6** | \`32\` | **Adding Annotations** | The user cannot add comments, highlights, or edit form fields. |
| **Bit 9** | \`256\` | **Form Filling** | The user cannot fill in existing interactive form fields. |
| **Bit 10** | \`512\` | **Accessibility Access** | Disabling this blocks screen readers from reading text (deprecated in PDF 2.0). |
| **Bit 11** | \`1024\` | **Document Assembly** | The user cannot insert, delete, or rotate pages. |
| **Bit 12** | \`2048\` | **High Quality Print** | The user can only print at low resolution (draft quality). |

### Mathematical Flag Calculation Example
If you want to allow a user to **print** (Bit 3 = 1) and **copy text** (Bit 5 = 1), but restrict **editing** (Bit 4 = 0) and **document assembly** (Bit 11 = 0), the security engine starts with all bits set to 1 (which equals the decimal number \`-1\` or \`0xFFFFFFFF\` in two's complement notation), and clears the restricted bits:

1. Start with standard permissions integer: \`-3901\` (which keeps unused/system bits active as required by standard spec).
2. Uncheck Editing (Bit 4): subtract \`8\` or set bit to \`0\`.
3. Uncheck Document Assembly (Bit 11): subtract \`1024\` or set bit to \`0\`.
4. The resulting bitwise integer is written into the \`/P\` field of the final PDF file structure.

> [!WARNING]
> **A Note on Permission Enforcement**: Document restrictions are enforced by the *viewer software*. While mainstream readers like Adobe Acrobat, Google Chrome, Firefox, and Safari strictly respect the \`/P\` flags, some open-source, custom, or command-line tools can bypass these flags because the file content itself is not doubly encrypted. A user with the correct User Password can always decrypt the document stream; the permissions flag simply requests the viewer to block specific UI actions. If absolute protection against copying is required, documents should be flattened or watermarked.

---

## 5. Server-Side vs. Client-Side PDF Protection: The Zero-Trust Advantage

When securing confidential documents, where the encryption takes place is just as important as the strength of the password.

### Cloud Server-Side Encryption (Traditional Online Tools)
Traditional PDF tools require you to upload your files to their remote server. The server parses the PDF, applies the password, encrypts the file, and sends a download link back.
- **Vulnerabilities**: Your documents travel across the internet. If the company's servers are compromised, or if they retain temporary logs, your passwords and data could be exposed.
- **Compliance Issues**: Sharing documents containing personal data, financial records, or health files violates strict regulations like **HIPAA** or **GDPR** if the host server lacks enterprise compliance certifications.

### Browser Client-Side Encryption (Our Tool)
Our tool uses a **Zero-Trust Client-Side Architecture**:
1. **Local Sandboxing**: When you drag a PDF into the upload zone, the file is loaded into the browser's local RAM as an \`ArrayBuffer\`.
2. **In-Browser Encryption**: The encryption engine (\`pdf-lib\` coupled with local cryptographic libraries) runs inside your browser's JavaScript environment.
3. **No Uploads**: The file never travels over the network. The encryption keys and protected PDF bytes are compiled locally.
4. **Instant Download**: The file is saved directly to your downloads folder, ensuring complete privacy, zero transmission latency, and offline support.

---

## 6. Best Practices for Choosing Strong Passwords

Even the strongest AES-256 encryption can fail if the password is easy to guess. To protect your files from brute-force dictionary attacks:

- **Entropy is Key**: Entropy measures the unpredictability of a password. Aim for at least 80 bits of entropy.
- **Length over Complexity**: A longer password (e.g., a passphrase like \`correct-horse-battery-staple\`) is much harder for a computer to guess than a short, complex password (e.g., \`P@$$w0rd\`).
- **Avoid Dictionary Words**: Do not use common dictionary words, names, dates, or sequential characters (e.g., \`123456\`).
- **Use Our Password Generator**: Our built-in generator uses cryptographically secure random number generators (\`window.crypto.getRandomValues\`) to generate passwords with customizable length, symbols, numbers, and letter cases.

---

## 7. Step-by-Step Guide: How to Secure Your PDF Files

### Step 1: Upload Your Documents
Drag and drop one or more PDF files into the upload box. The tool parses the file structures to extract the metadata, displaying the file name, file size, and page count.

### Step 2: Choose Your Protection Settings
Decide how you want to protect your file:
- **Open (User) Password**: Set this if you want to require a password to view the PDF.
- **Owner (Permissions) Password**: Set this to restrict actions like printing, copying, or editing.

### Step 3: Configure Granular Restrictions
If you set an Owner Password, you can toggle specific permissions:
- *Allow Printing*: Clear this to block printing.
- *Allow Copying*: Clear this to prevent text or image extraction.
- *Allow Modifying*: Clear this to block content changes.
- *Allow Annotations*: Clear this to prevent user comments.
- *Allow Form Filling*: Clear this to prevent form entry.
- *Allow Document Assembly*: Clear this to block page deletion or rotation.

### Step 4: Encrypt and Export
Click **Protect PDF**. The files are encrypted locally in your browser. Single files are downloaded as a protected PDF, while multiple files are zipped together automatically.
`,
  relatedTools: [
    { name: "Unlock PDF", slug: "unlock-pdf" },
    { name: "Watermark PDF", slug: "watermark-pdf" },
    { name: "Edit PDF", slug: "edit-pdf" },
    { name: "Merge PDF", slug: "merge-pdf" },
    { name: "Split PDF", slug: "split-pdf" },
    { name: "Compress PDF", slug: "compress-pdf" },
    { name: "Rotate PDF", slug: "rotate-pdf" },
    { name: "Remove PDF Pages", slug: "remove-pdf-pages" }
  ],
  features: [
    "100% Client-Side Encryption: Files never leave your web browser.",
    "Granular Permissions Control: Separately toggle printing, text/image copying, editing, annotations, form filling, and page assembly.",
    "Strong AES-128 & AES-256 Support: Industry-standard symmetric encryption algorithms.",
    "Live Password Strength Estimator: Analyzes length, complexity, and entropy dynamically.",
    "Cryptographically Secure Password Generator: Generates unpredictable passwords with customizable rules.",
    "Batch Processing: Protect multiple PDF documents at once and export as a ZIP archive.",
    "Privacy First: Zero file retention, zero logging of user passwords."
  ],
  useCases: [
    "Securing legal contracts before sending to external signees.",
    "Restricting editing and printing on proprietary ebooks or manuals.",
    "Encrypting sensitive payroll or tax documents with personal passwords.",
    "Protecting medical records to maintain HIPAA compliance.",
    "Batch-protecting enterprise reports before sharing with team workspaces."
  ],
  howToSteps: [
    "Upload your PDF files by dragging them into the dropzone or clicking browse.",
    "Enter a password to require users to enter it before opening/reading the PDF.",
    "Set an owner password and configure granular restrictions (disable printing, copying, editing).",
    "Use the password strength checker or click generate to create a secure password.",
    "Click the 'Protect PDF' button to run the local browser-based encryption.",
    "Save the protected PDF file directly (or ZIP archive for multiple uploads) to your device."
  ],
  examples: [],
  faq: [
    {
      question: "How do I password protect a PDF?",
      answer: "Drag and drop your PDF file into our secure uploader, enter a password in the 'Open Password' field, configure any permission restrictions you need, and click 'Protect PDF'. The file is encrypted instantly in your browser."
    },
    {
      question: "Is PDF encryption secure?",
      answer: "Yes, our tool uses strong AES encryption protocols. If you use a high-entropy password, it is mathematically impossible to crack the file with current computing technology."
    },
    {
      question: "Can I prevent printing of my PDF?",
      answer: "Yes. By setting an Owner/Permissions password and unchecking 'Allow Printing', viewers like Adobe Acrobat and web browsers will block the print functionality."
    },
    {
      question: "Can I restrict copying of text and images?",
      answer: "Yes. Setting an Owner/Permissions password and unchecking 'Allow Copying' will block users from highlighting text or extracting images from the document."
    },
    {
      question: "Is this tool free?",
      answer: "Yes, the tool is 100% free with no file limits, watermarks, or registrations required."
    },
    {
      question: "Are my PDFs stored on your servers?",
      answer: "No. Our tool processes everything client-side in your web browser. Your files and passwords never leave your device."
    },
    {
      question: "Does it work on mobile?",
      answer: "Yes, the tool is fully responsive and works on iOS, Android, tablets, and desktops."
    },
    {
      question: "Can I protect large PDFs?",
      answer: "Yes, because the processing runs locally on your device's CPU and RAM, there are no file transfer bottlenecks."
    },
    {
      question: "What password should I use?",
      answer: "We recommend using a long passphrase (at least 12 characters) with a mix of uppercase, lowercase, numbers, and symbols. You can also use our secure password generator."
    },
    {
      question: "Can I remove the password protection later?",
      answer: "Yes, but you must know the password to remove it. You can open the PDF using the password, then export it without encryption or use our 'Unlock PDF' tool."
    },
    {
      question: "What is the difference between a user password and an owner password?",
      answer: "A User (Open) password is required to open and read the PDF. An Owner (Permissions) password is used to restrict operational permissions (printing, copying, editing) and can be different from the User password."
    },
    {
      question: "Can a user remove restrictions if they only have the user password?",
      answer: "No. Standard PDF viewers will require the Owner/Permissions password to remove restrictions or edit permissions settings."
    },
    {
      question: "What happens if I forget the password?",
      answer: "Because we process files locally and never store passwords, we cannot recover forgotten passwords. Make sure to keep a copy of your password in a safe place."
    },
    {
      question: "What encryption standards does this tool support?",
      answer: "The tool supports AES-128 and AES-256 encryption algorithms, which are the industry standards for document security."
    },
    {
      question: "Is client-side encryption safer than server-side encryption?",
      answer: "Absolutely. With client-side encryption, your private documents and passwords are never transmitted across the network or stored on remote servers, avoiding database leaks or interception."
    },
    {
      question: "How does the bitwise permission flag (/P) work?",
      answer: "The permission flags are coded into a single 32-bit integer in the PDF trailer. Toggling specific bits notifies compatible PDF readers to enable or disable features like printing, editing, and copying."
    },
    {
      question: "Does password protecting a PDF affect its visual quality?",
      answer: "No. The encryption process scrambles the file bytes (text streams, images, objects) without altering the layout, resolution, or styling of the page."
    },
    {
      question: "Can someone bypass the copying restriction by taking screenshots?",
      answer: "Yes. Permission flags instruct the viewer software to restrict UI actions. They cannot prevent the user from taking visual screenshots of their screen or using OCR on the image."
    },
    {
      question: "Can I protect multiple PDFs at once?",
      answer: "Yes. Our tool supports batch uploading. You can drag in multiple PDFs, set the password settings once, protect all of them in a batch, and download them as a single ZIP folder."
    },
    {
      question: "Will search engines index my password-protected PDF?",
      answer: "No. Search engine crawlers cannot open or index password-protected PDFs because they cannot decrypt the content streams without the password."
    },
    {
      question: "What are the security presets (Basic, Business, Maximum)?",
      answer: "Presets allow quick configuration: Basic requires a password to open, Business adds copying/printing blocks, and Maximum restricts all operations including page assembly and form filling."
    },
    {
      question: "How is password strength calculated?",
      answer: "It uses an entropy-based mathematical formula analyzing password length, diversity of character types (uppercase, numbers, symbols), and patterns, displaying a rating from Weak to Very Strong."
    },
    {
      question: "Does this tool require an active internet connection?",
      answer: "No. Once the tool page is loaded in your browser, you can disconnect from the internet and continue encrypting files offline. The encryption libraries run entirely in your local browser sandbox."
    },
    {
      question: "Is there a file size limit for protecting PDFs?",
      answer: "There is no server-imposed limit. The limit is determined by your browser's memory capacity. Most modern devices can easily handle PDFs up to several hundred megabytes."
    },
    {
      question: "Does this tool support PDF 2.0?",
      answer: "Yes. The encryption engine writes files compliant with modern PDF 2.0 standards, which include advanced SHA-256 key derivation and AES block ciphers."
    },
    {
      question: "Are electronic signatures preserved after protecting a PDF?",
      answer: "Yes. However, adding password protection to an already signed PDF might invalidate the digital signature envelope. It is best to apply security restrictions *before* applying cryptographic signatures."
    },
    {
      question: "Can a password-protected PDF be combined or merged?",
      answer: "No. To merge or split password-protected PDFs, you must first remove the encryption. PDF merging engines cannot read the internal structures of locked files without decrypting them first."
    },
    {
      question: "How does the password generator work?",
      answer: "It uses the browser's secure window.crypto API to generate a cryptographically strong, random string of characters based on your chosen length and character types."
    },
    {
      question: "Are PDF password restrictions legally binding?",
      answer: "Permissions flags are technical boundaries, not legal agreements. While they prevent quick copying or editing, they should be combined with legal contracts (like NDAs) for absolute protection."
    },
    {
      question: "What is PDF document assembly restriction?",
      answer: "Document assembly refers to the ability to insert pages, delete pages, rotate pages, or create bookmarks. Restricting this blocks readers from reordering or restructuring the PDF."
    },
    {
      question: "Can I restrict form filling and annotations?",
      answer: "Yes, you can toggle form filling and comments separately. Disallowing this prevents users from filling out interactive forms or adding sticky notes."
    },
    {
      question: "Does this tool support HIPAA and GDPR compliance?",
      answer: "Yes, because the documents are processed locally on your device and are never sent to a cloud database, this tool is ideal for zero-trust data compliance requirements."
    },
    {
      question: "How do I download the protected PDFs?",
      answer: "After the encryption finishes, a download button will appear. If you uploaded a single file, it will download as a PDF. If you uploaded multiple files, they will download as a ZIP file."
    },
    {
      question: "What is entropy in password security?",
      answer: "Entropy measures the complexity and randomness of a password. It is calculated in bits: higher entropy means a password is exponentially harder for a computer to guess through trial and error."
    },
    {
      question: "Can this tool encrypt PDFs that are already encrypted?",
      answer: "No. You cannot encrypt a PDF that is already locked with a password. You must first unlock the PDF before applying new security settings."
    },
    {
      question: "Does the password generator store my generated password?",
      answer: "No. The password generator runs locally in your browser. The generated password is shown to you and applied to the encryption handler, but is never logged or stored anywhere."
    }
  ]
};
