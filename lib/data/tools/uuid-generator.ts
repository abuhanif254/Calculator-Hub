import { ToolConfig } from './types';

export const uuidGeneratorConfig: ToolConfig = {
  slug: "uuid-generator",
  title: "UUID Generator",
  shortDescription: "Generate random, unique, and cryptographically secure UUIDs (v1, v4, v6, v7). Instantly create individual or bulk UUIDs for your databases, APIs, and microservices.",
  category: "Generators",
  keywords: ["UUID generator", "GUID generator", "UUID v4", "UUID v7", "bulk UUID", "generate UUIDs", "online UUID tool", "database IDs", "unique identifier"],
  
  longDescription: `
A **Universally Unique Identifier (UUID)** is a 128-bit number used to identify information in computer systems. Also known as Globally Unique Identifiers (GUIDs) in the Microsoft ecosystem, UUIDs are heavily utilized in software development, databases, and microservices architectures to ensure uniqueness across distributed systems without needing a central coordinator.

Our **Production-Grade UUID Generator** allows you to instantly generate cryptographically secure UUIDs. It supports generating multiple versions including **UUID v1**, **UUID v4**, **UUID v6**, and **UUID v7**, ensuring you have the right format for any architectural requirement.

### Why Use UUIDs Instead of Auto-Incrementing IDs?
In traditional relational databases, auto-incrementing integer IDs (like 1, 2, 3...) are common. While efficient, they present several challenges in modern architectures:
- **Security & Guessability:** Sequential IDs expose the size and growth rate of your data. If a user's ID is 100, they know there are likely 99 users before them, and they can easily guess other IDs to attempt unauthorized access.
- **Distributed Systems:** In a microservices environment where multiple instances write to different database nodes concurrently, generating sequential IDs without a centralized lock is nearly impossible. UUIDs can be generated locally on any node without collision risks.
- **Offline Creation:** With UUIDs, clients can generate IDs offline and sync them with the server later, knowing there will be no conflict.

### Understanding UUID Versions
Different UUID versions serve different purposes:

#### UUID v1 (Time and MAC Address based)
Generated using the current timestamp and the MAC address of the computer generating it. While it provides chronological order, exposing the MAC address can be a privacy concern in some contexts.

#### UUID v4 (Randomly Generated)
The most common version. UUID v4 is generated using cryptographically secure random numbers. With $2^{122}$ possible values, the probability of a collision is so astronomically low that it is considered practically zero. This makes it perfect for general-purpose identifiers.

#### UUID v6 & v7 (Time-Sorted Random)
Database indexes (especially B-trees) can suffer from fragmentation and poor insert performance when using completely random UUID v4s. UUID v6 and v7 solve this by placing the timestamp at the beginning of the UUID, making them lexicographically sortable by creation time. **UUID v7** is highly recommended for database primary keys as it combines time-ordering with randomness.

### Best Practices for Developers
1. **Use UUID v7 for Databases:** If your database engine and ORM support it, favor UUID v7 for primary keys to optimize indexing and insert performance.
2. **Store as Binary when Possible:** While UUIDs are 36-character strings (with hyphens), they are fundamentally 128-bit numbers. Some databases (like PostgreSQL) have native \`UUID\` column types that store them efficiently as 16 bytes.
3. **Never Use UUIDs for Cryptographic Secrets:** While UUID v4 is random, it is designed for identification, not for generating secure passwords or API keys.
  `,

  features: [
    "Support for multiple UUID versions: v1, v4, v6, and v7",
    "Instantly generate single or bulk UUIDs (up to 10,000 at once)",
    "Export generated UUIDs to JSON, CSV, or TXT",
    "Custom formatting options: uppercase, lowercase, remove hyphens, add braces/quotes",
    "Developer utility snippets for generating UUIDs in multiple programming languages",
    "Real-time UUID validation and version detection",
    "100% Client-side generation (Secure & Private)",
    "Local history system to restore recently generated UUIDs"
  ],

  useCases: [
    "Generating random primary keys for database records (PostgreSQL, MySQL, MongoDB)",
    "Creating unique correlation IDs for tracing distributed microservices logs",
    "Mocking data for API endpoints and testing environments",
    "Generating secure, unguessable IDs for public-facing URLs and resources",
    "Creating unique identifiers for client-side offline data creation",
    "Validating external UUIDs to ensure they meet format specifications"
  ],

  howToSteps: [
    "Select the UUID version you want to generate (v4 is the default and most common).",
    "Choose how many UUIDs you need by clicking one of the bulk options or entering a custom amount.",
    "Toggle any formatting options, such as uppercase or stripping hyphens.",
    "Click the 'Generate' button (or it will generate automatically on load).",
    "Use the copy buttons to copy a single UUID, or copy all of them as an array, CSV, or raw list.",
    "If you generated a large batch, use the 'Download' button to export them to a file.",
    "Check the 'Developer Snippets' tab to see how to implement UUID generation in your own code.",
    "Use the 'Validator' tab to paste an existing UUID and verify its format and version."
  ],

  examples: [
    {
      title: "Standard UUID v4",
      description: "The default format for a randomly generated UUID v4.",
      input: "Generate 1 UUID v4",
      output: "123e4567-e89b-12d3-a456-426614174000"
    },
    {
      title: "No Hyphens (Uppercase)",
      description: "UUID formatted without hyphens and converted to uppercase.",
      input: "Generate UUID (No Hyphens, Uppercase)",
      output: "123E4567E89B12D3A456426614174000"
    },
    {
      title: "JSON Array Format",
      description: "Generating a bulk list of UUIDs formatted as a JSON array.",
      input: "Generate 3 UUIDs -> Copy as JSON Array",
      output: `[
  "550e8400-e29b-41d4-a716-446655440000",
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "6ba7b811-9dad-11d1-80b4-00c04fd430c8"
]`
    }
  ],

  faq: [
    {
      question: "What does UUID stand for?",
      answer: "UUID stands for Universally Unique Identifier. It is a 128-bit label used to uniquely identify information in computer systems. In the Microsoft ecosystem, they are often referred to as GUIDs (Globally Unique Identifiers)."
    },
    {
      question: "Are UUIDs completely unique? Can they collide?",
      answer: "While mathematically possible, a collision (generating the exact same UUID twice) is practically impossible for UUID v4. With $2^{122}$ (approx 5.3 x 10^36) possible variations, you could generate 1 billion UUIDs per second for 85 years, and the probability of a single collision would still be around 50%."
    },
    {
      question: "What is the difference between UUID v4 and v7?",
      answer: "UUID v4 is completely random. UUID v7 combines a Unix timestamp (with millisecond precision) with random data. Because v7 starts with a timestamp, the generated UUIDs are naturally sorted by time, which makes them much more efficient for database indexing than fully random v4 UUIDs."
    },
    {
      question: "Is this tool secure?",
      answer: "Yes. All UUIDs are generated directly inside your web browser using modern web cryptography APIs. We do not track, store, or transmit the UUIDs you generate over the network."
    },
    {
      question: "Should I use UUIDs or Auto-Incrementing IDs?",
      answer: "Auto-incrementing IDs (1, 2, 3...) are simple and efficient but expose your data size and can be easily guessed. They also create bottlenecks in distributed databases. UUIDs hide your data scale, cannot be guessed, and can be generated anywhere independently, making them the standard choice for modern distributed applications."
    },
    {
      question: "How long is a UUID?",
      answer: "A standard string representation of a UUID contains 36 characters: 32 hexadecimal digits and 4 hyphens, formatted as 8-4-4-4-12."
    },
    {
      question: "What does a UUID v4 look like?",
      answer: "A UUID v4 looks like this: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. Notice the '4' in the third section, indicating the version. The 'y' will always be 8, 9, a, or b."
    }
  ],

  relatedTools: [
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "Password Generator", slug: "password-generator" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "Base64 Encode", slug: "base64-encode" }
  ]
};
