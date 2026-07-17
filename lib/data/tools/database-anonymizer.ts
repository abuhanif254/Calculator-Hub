import { ToolConfig } from './types';

export const databaseAnonymizerConfig: ToolConfig = {
  slug: "database-anonymizer",
  title: "Enterprise Database Dump Anonymizer",
  shortDescription: "Securely anonymize and mask PII (Personally Identifiable Information) in massive SQL and CSV database dumps using our high-performance streaming engine.",
  category: "Developer Tools",
  keywords: ["database anonymizer", "mask PII in SQL", "anonymize CSV online", "SQL dump masker", "GDPR compliance tool", "fake data generator", "database sanitizer"],
  
  longDescription: `
Database anonymization is the process of protecting private or sensitive information by erasing or encrypting identifiers that connect an individual to stored data. When developers need to use production databases in a staging or development environment for testing, they must first anonymize the data to prevent accidental leaks of Personally Identifiable Information (PII) like emails, passwords, credit card numbers, and names.

Our **Enterprise Database Dump Anonymizer** is a high-performance, streaming-based developer tool designed to tackle massive database files (both .sql and .csv) that would normally crash a web browser.

### Why You Need This Tool

When debugging complex production issues, developers often need a realistic dataset. However, downloading a raw production database dump violates data privacy laws (like GDPR, HIPAA, or CCPA). 

Running traditional scripts to anonymize gigabytes of data can be slow, complex to set up, and prone to memory crashes. Our tool solves this by providing a zero-setup, lightning-fast web interface powered by a dedicated Rust streaming backend.

### How It Works (Streaming Architecture)

Traditional web tools require you to upload a file entirely into memory before processing it. If you try to upload a 2GB SQL dump, your browser tab will instantly crash.

We utilize a **Streaming Architecture** powered by Cloudflare Workers and Rust:
1. When you select a file, we stream it chunk-by-chunk to our edge servers.
2. The Rust backend uses highly optimized regular expressions to detect PII (like emails and credit cards) on the fly.
3. It instantly replaces them with safe, anonymized fake data.
4. The anonymized data is streamed directly back to your browser as a download.

**Zero Storage Guarantee:** Your data is never saved to a disk or database. It only exists in temporary RAM for milliseconds during the streaming process and is permanently destroyed immediately.

### Key Features
- **Massive File Support:** Process GBs of SQL and CSV data without browser crashes.
- **Auto PII Detection:** Automatically detects standard PII formats.
- **Blazing Fast:** Powered by a Rust WebAssembly edge backend.
- **Privacy First:** 100% ephemeral streaming architecture with no persistent storage.
  `,

  features: [
    "Supports .sql and .csv file formats",
    "Streams data chunk-by-chunk to prevent memory limits",
    "Automatically masks emails, credit cards, and common PII",
    "Zero-storage architecture guarantees data privacy",
    "High-performance processing powered by Rust at the edge"
  ],

  useCases: [
    "Preparing production database dumps for local development",
    "Sharing datasets with third-party contractors securely",
    "Complying with GDPR and CCPA data anonymization requirements",
    "Sanitizing massive log files containing sensitive user data"
  ],

  howToSteps: [
    "Click the upload area to select your .sql or .csv database dump.",
    "Wait for the streaming upload to initialize.",
    "The tool will stream the file to our Rust backend, anonymize the data on-the-fly, and immediately start downloading the safe version.",
    "Use the anonymized file in your local development environment safely."
  ],

  examples: [],

  faq: [
    {
      question: "Is my database saved on your servers?",
      answer: "No. We use a pure streaming architecture. Your data flows into our Rust processing node, is anonymized in RAM, and flows directly back to you. Nothing is ever saved to a disk."
    },
    {
      question: "What file sizes do you support?",
      answer: "Because we use streaming, we can theoretically support files of unlimited size. However, network stability will dictate the maximum practical size."
    },
    {
      question: "Does this break SQL syntax?",
      answer: "No, our regex engine is specifically tuned to replace string values without breaking the surrounding INSERT statements or CSV delimiters."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "SQL Formatter", slug: "sql-formatter" },
    { name: "CSV Viewer", slug: "csv-viewer" }
  ]
};
