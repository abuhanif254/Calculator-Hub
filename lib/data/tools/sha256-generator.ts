import { ToolConfig } from './types';

export const sha256GeneratorConfig: ToolConfig = {
  slug: "sha256-generator",
  title: "SHA256 Generator Tool",
  shortDescription: "Generate secure SHA-256 hashes instantly from text or files. Perform real-time live hashing, drag & drop file verification, and hash comparison entirely client-side using native Web Crypto APIs.",
  category: "Encoding & Security",
  keywords: [
    "sha256 generator", "sha256 hash online", "generate sha256", "sha256 checksum calculator",
    "text to sha256", "file to sha256", "sha256 encode", "sha256 hashing tool",
    "cryptographic checksum", "client-side sha256", "verify file integrity", "sha256 compare"
  ],

  longDescription: `
## What is SHA-256?

**SHA-256 (Secure Hash Algorithm 256-bit)** is a cryptographic hash function that processes an input of arbitrary length and produces a fixed-size 256-bit (32-byte) signature. This output is represented as a 64-character hexadecimal string. 

Designed by the National Security Agency (NSA) and published by the National Institute of Standards and Technology (NIST) in 2001 as part of the SHA-2 family, SHA-256 has become the global standard for securing digital communications, verifying data integrity, and conducting cryptographic validations. Unlike encryption algorithms, which are designed to scramble and subsequently decrypt data using a key, SHA-256 is a **one-way mathematical function**—once data is hashed, it cannot be reversed to its original state.

---

## How SHA-256 Hashing Works

Cryptographic hashing is a mathematical process that transforms input data into a fixed-length string. The SHA-256 algorithm processes messages in 512-bit blocks. The overall hashing procedure can be summarized as follows:

1. **Preprocessing and Padding**: The input message is padded with a single '1' bit followed by a sequence of '0' bits until the message length is 64 bits short of a multiple of 512. The final 64 bits are filled with the original message's length in bits.
2. **Parsing**: The padded message is divided into N blocks of 512 bits.
3. **Message Schedule**: Each 512-bit block is expanded into a 64-word message schedule, where each word is 32 bits.
4. **Initialization**: The algorithm initializes eight 32-bit hash variables ($H_0$ through $H_7$) with fractional parts of the square roots of the first eight prime numbers ($2, 3, 5, 7, 11, 13, 17, 19$).
5. **Compression Loop**: The core of the algorithm consists of 64 rounds of mathematical operations performed on each block. In each round, logical functions (like \`Ch\`, \`Maj\`, \`Σ_0\`, and \`Σ_1\`), bitwise rotations, shifts, and modular additions are carried out using 64 constant values derived from the cube roots of the first 64 prime numbers.
6. **Final Digest**: After processing all blocks, the values of $H_0$ through $H_7$ are concatenated to produce the final 256-bit hash.

---

## Cryptographic Hashing Concepts

To understand the security of SHA-256, it is helpful to look at the core tenets of cryptographic hash functions:

* **Deterministic**: The exact same input will *always* generate the exact same hash output. Even a minor difference in the input, such as changing a uppercase letter to lowercase or adding an invisible space, will yield a completely different hash.
* **Pre-image Resistance (One-Way)**: Given a hash digest $H$, it is computationally impossible to reconstruct the original input $x$ such that $\\text{SHA256}(x) = H$. This ensures passwords and sensitive payloads stored as hashes remain safe.
* **Second Pre-image Resistance**: Given an input $x$, it is computationally infeasible to find another distinct input $y$ such that $\\text{SHA256}(x) = \\text{SHA256}(y)$.
* **Collision Resistance**: It is mathematically infeasible to find *any* two arbitrary inputs $x$ and $y$ that produce the identical hash output. If a collision is discovered, the algorithm is considered cryptographically broken.
* **Avalanche Effect**: A tiny change in the input triggers a cascade of changes throughout the calculation rounds. The resulting hash output is completely changed and bears no statistical resemblance to the original hash.

---

## SHA-256 vs MD5: A Detailed Comparison

| Feature | MD5 (Message Digest 5) | SHA-256 (Secure Hash Algorithm 2) |
| :--- | :--- | :--- |
| **Output Size** | 128 bits (32 hex characters) | 256 bits (64 hex characters) |
| **Year Released** | 1991 | 2001 |
| **Security Status** | Cryptographically Broken | Cryptographically Secure |
| **Collision Vulnerability** | High (Proven collisions in seconds) | Extreme Resistance (No collisions found) |
| **Computation Speed** | Extremely Fast | Fast (Slightly slower than MD5) |
| **Common Uses** | Non-secure Checksums, Caching | Blockchain, SSL Certificates, Passwords, APIs |

---

## Why SHA-256 is More Secure

The security of a hash function is largely determined by its resistance to brute-force attacks and cryptographic cryptanalysis. 
While MD5 has $2^{128}$ possible output combinations, SHA-256 has a vast keyspace of $2^{256}$ possibilities. This number is astronomical—approximately $1.15 \\times 10^{77}$ combinations. 

To put this in perspective:
* The number of atoms in the observable universe is estimated to be around $10^{80}$.
* If every computer on Earth combined forces to calculate SHA-256 hashes, it would still take trillions of years to exhaust even a fraction of the search space.

Furthermore, MD5 has structural design flaws that allow mathematical exploits. Using "chosen-prefix collision" attacks, researchers can generate two different PDF files with identical MD5 checksums. SHA-256 has no such known mathematical exploits. For security-critical components, SHA-256 is the absolute minimum standard.

---

## Blockchain and Cryptocurrency Usage

SHA-256 gained widespread mainstream recognition due to its inclusion in the **Bitcoin (BTC) protocol** designed by Satoshi Nakamoto. Hashing is the bedrock of blockchain systems in three vital areas:

### 1. Proof-of-Work (Mining)
In Bitcoin mining, miners compete to solve a cryptographic puzzle. They must take a block header, append a random number called a **nonce**, and double-hash it using SHA-256:
$$\\text{Hash} = \\text{SHA256}(\\text{SHA256}(\\text{Block Header} + \\text{Nonce}))$$
The objective is to find a nonce that produces a hash value lower than a target difficulty threshold (meaning the hash starts with a specific number of leading zeros).

### 2. Block Chaining
Each block in a blockchain contains the SHA-256 hash of the *previous* block. This creates an immutable chronological chain. If an attacker tries to alter a transaction in a past block, its hash will change, causing a mismatch in the next block, instantly breaking the chain and exposing the tamper attempt.

### 3. Merkle Trees
Within a block, hundreds of transactions are organized into a binary hash tree (Merkle Tree). Transactions are hashed in pairs, and their hashes are concatenated and hashed again, ascending until a single **Merkle Root** hash is created. This root represents all transactions in the block, allowing light clients to verify a transaction's existence with minimal data.

---

## Password Hashing Basics & Best Practices

A common mistake made by junior developers is storing raw passwords directly in a database as SHA-256 hashes. Although SHA-256 is one-way, attackers who compromise the database can use pre-computed tables of common words and their SHA-256 hashes (known as **Rainbow Tables**) or massive GPU brute-force rigs to crack passwords in seconds.

To store passwords securely, developers should follow these rules:

1. **Use a Salt**: A salt is a unique, cryptographically random string appended to the password before hashing:
   $$\\text{Stored Hash} = \\text{SHA256}(\\text{Password} + \\text{Salt})$$
   This invalidates pre-computed rainbow tables and ensures that two users with the same password have completely different hashes in the database.
2. **Use Key Derivation Functions**: For maximum security, use specialized slow hashing algorithms such as **bcrypt**, **Argon2**, or **PBKDF2**. These algorithms repeat the hashing process thousands of times (iteration cost) and consume memory, making GPU-based brute-force attacks economically impractical. SHA-256 can be used as the base PRF (pseudo-random function) inside PBKDF2.

---

## API Security & HMAC Examples

Modern APIs use SHA-256 to verify that requests have not been tampered with in transit. This is often achieved using **HMAC (Hash-based Message Authentication Code)**. 

### How API Signatures Work:
1. The client and the API server share a secret key.
2. When sending an API request, the client concatenates the request method, URL, timestamp, and body.
3. The client computes an HMAC using the SHA-256 algorithm and the shared secret:
   $$\\text{Signature} = \\text{HMAC-SHA256}(\\text{Request Payload}, \\text{Secret Key})$$
4. The client sends the signature in the \`X-Signature\` header.
5. The server recalculates the HMAC using its copy of the secret key. If the signatures match, the server knows the request is authentic and unchanged.

---

## File Integrity Verification

When downloading operating systems (such as Linux ISOs), software executables, or database backups, publishers publish a SHA-256 checksum file.
You can use our **SHA256 Generator** to compute the checksum of your downloaded file locally. By pasting the expected hash into the **Compare / Verify** field, you can immediately verify whether the file was corrupted during download or modified by a malicious middleman. If the hashes match, your file is safe and intact.

---

## Digital Signatures Explanation

Digital signatures provide authentication, non-repudiation, and integrity. In a standard digital signature scheme (like RSA or ECDSA):
1. The sender hashes the document using SHA-256 to create a small digest.
2. The sender encrypts the digest with their **Private Key** (this encrypted hash is the digital signature).
3. The recipient receives the document and the signature.
4. The recipient decrypts the signature using the sender's **Public Key** to obtain the original digest.
5. The recipient hashes the received document and compares it to the decrypted digest. If they match, the recipient is assured that the document was signed by the sender and was not altered.

---

## Developer Workflow & Cybersecurity Applications

* **Software Distribution Checksums**: Verifying files before installation to prevent supply chain attacks (e.g. validating npm, pip, or docker image digests).
* **Git Version Control**: Git hashes objects (commits, trees, blobs) to track changes. While legacy Git uses SHA-1, modern Git repositories support transitioning to SHA-256 for stronger collision resistance.
* **Intrusion Detection Systems (IDS)**: Security suites scan system files and compare their SHA-256 hashes against a database of known clean system files. Any modified file is flagged as a potential trojan.
* **Malware Analysis**: Threat intelligence networks index malicious binaries by their SHA-256 hashes. Security analysts query databases like VirusTotal using SHA-256 checksums to identify malware.

---

## Complete Client-Side Security

Our Advanced SHA256 Generator tool is built with a **security-first mindset**:
* **100% Client-Side Processing**: All calculations are performed directly on your device inside your browser sandbox. We do not upload your text or files to external APIs or our servers.
* **Safe Local Hashing**: It uses the browser-native Web Crypto API (\`window.crypto.subtle\`) whenever possible. This native implementation runs at compiled machine speeds, protects against side-channel attacks, and ensures private execution even if you disconnect from the internet.
* **No UI Freezing**: Large files are read progressively in chunks, preventing your browser tab from crashing or lagging.
`,

  features: [
    "Instant live hashing as you type",
    "High-speed browser-native Web Crypto API processing",
    "Secure file hashing with drag-and-drop upload zone",
    "Progressive file reader handling massive files with zero tab lag",
    "Uppercase and lowercase hash output toggle",
    "Side-by-side hash comparison for verification",
    "Live character counter and byte size indicator",
    "Persisted recent hashes history in local storage",
    "Sample text quick-fill for fast testing"
  ],

  useCases: [
    "Checking downloaded software installer checksums for integrity",
    "Creating deterministic cryptographically secure unique IDs",
    "Generating API webhook signatures for local debugging",
    "Verifying that backup archives or database dumps are uncorrupted",
    "Comparing two files side-by-side to verify matching binaries",
    "Testing and simulating cryptographic algorithms for school or work projects"
  ],

  howToSteps: [
    "Select the 'Text Input' or 'File Hash' tab based on your needs.",
    "For text: type or paste your string. The SHA256 hash updates in real-time.",
    "For files: drag and drop your file into the zone, or browse to upload it.",
    "Choose whether you want a lowercase (abc) or uppercase (ABC) hash output.",
    "Click the copy icon to copy the generated hash to your clipboard, or click the download icon to save it as a text file.",
    "To verify a checksum: paste the expected hash in the 'Compare' input field. The tool will check it and display a match result.",
    "Scroll down to retrieve hashes from your local session history at any time."
  ],

  examples: [
    {
      title: "Simple Phrase Hash",
      description: "Hash output for a classic string query.",
      input: "hello world",
      output: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
    },
    {
      title: "Avalanche Effect Demonstration",
      description: "Capitalizing a single letter results in a completely different hash output.",
      input: "Hello world",
      output: "64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c"
    },
    {
      title: "Empty String Hash",
      description: "The unique hash representation of an empty string payload.",
      input: "",
      output: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ],

  faq: [
    {
      question: "What is a SHA256 Generator?",
      answer: "A SHA256 generator is a utility that takes an input—whether text strings or binary files—and computes its 256-bit cryptographic signature using the Secure Hash Algorithm 256-bit."
    },
    {
      question: "Is SHA-256 reversible?",
      answer: "No. SHA-256 is a one-way hashing function, not an encryption algorithm. You cannot decrypt or reverse a SHA-256 hash to find the original text. The only way to guess the original text is through brute-force or dictionary lookup attacks."
    },
    {
      question: "How secure is SHA-256?",
      answer: "SHA-256 is highly secure and is currently considered cryptographically unbreakable. There are no known practical collision attacks or mathematical shortcuts to bypass it. It is trusted by governments, banks, and major blockchains."
    },
    {
      question: "Why does the SHA-256 hash change when I change one character?",
      answer: "This is a feature known as the 'avalanche effect'. Modern cryptographic hash functions are designed so that a tiny change in input values causes a massive, unpredictable change in the output, making it impossible to guess patterns."
    },
    {
      question: "Can two different files have the same SHA-256 hash?",
      answer: "Theoretically, yes (called a hash collision), because there are infinite possible inputs but a finite number of hashes (2^256). However, in practice, the chance of finding a collision is so infinitesimally small that it is considered impossible with current technology."
    },
    {
      question: "Are my files uploaded to your servers for hashing?",
      answer: "No. Our generator executes completely client-side in your web browser. No files, texts, or logs are uploaded, sent, or saved to any server, ensuring total privacy and offline security."
    },
    {
      question: "Does this tool work on huge files?",
      answer: "Yes. The tool reads files in chunks using modern streaming browser APIs. This prevents loading the entire file into active memory, preventing browser lag or tab crashes even for multi-gigabyte files."
    }
  ],

  relatedTools: [
    { name: "HMAC Generator", slug: "hmac-generator" },
    { name: "Password Generator", slug: "password-generator" },
    { name: "MD5 Generator", slug: "md5-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Base64 Decode", slug: "base64-decode" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "URL Decoder", slug: "url-decoder" }
  ]
};
