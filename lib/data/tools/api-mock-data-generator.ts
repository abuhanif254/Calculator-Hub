import { ToolConfig } from './types';

export const apiMockDataGeneratorConfig: ToolConfig = {
  slug: "api-mock-data-generator",
  title: "API Mock Data Generator",
  shortDescription: "Instantly generate realistic mock API response data in multiple formats. Build custom JSON schemas, simulate REST API latency, customize HTTP status codes, and export TypeScript types or SQL inserts.",
  category: "Generators",
  keywords: [
    "API mock data generator", "mock api response", "json mock data", "fake json api",
    "rest api simulator", "schema mock generator", "typescript interface generator",
    "db insert generator", "sql insert mock", "csv mock data", "graphql mock api",
    "fake data builder", "qa api testing", "frontend prototype api"
  ],

  longDescription: `
An **API Mock Data Generator** is an essential utility in modern software development, designed to bridge the gap between frontend prototyping, backend API design, database seeding, and quality assurance testing. By allowing developers and engineers to generate realistic, structurally diverse datasets instantly, this tool decouples teams, minimizes service dependencies, and accelerates rapid prototyping workflows.

### Understanding the API Mocking Paradigm

In traditional web application architectures, frontend developers are often blocked while waiting for backend engineers to finish designing and implementing server-side logic, routing, and database entities. Similarly, QA engineers are limited in writing automated test suites because staging environments may lack diverse or edge-case records. 

API Mocking solves this bottleneck. By establishing a type-safe contract (a schema) early in the development lifecycle, teams can work concurrently:
1. **Frontend Teams** bind their UI components to a local mock REST server that mimics actual server responses.
2. **Backend Teams** implement database controllers and routes using the agreed schema.
3. **QA Engineers** test form validation boundaries, state boundaries (like empty lists, large payloads, or 500 error scenarios), and edge-case validation using customizable mock payloads.

### How this Tool Fits into Your Workflow

Our production-grade mock generator processes complex fields, nested objects, and arrays entirely on the client side. This respects data privacy (your configurations and schemas are never uploaded to our servers) and ensures execution speeds under 2ms.

#### 1. Prototyping and Frontend Development
When prototyping dashboard layouts, charts, or user profiles, you need data that is more realistic than simple \`lorem ipsum\` blocks. By generating fields like \`fullname\`, \`price\`, \`avatarUrl\`, or \`latitude/longitude\`, you can see exactly how layouts handle varied data lengths, image loading states, and geographical inputs.

#### 2. REST API Simulation & HTTP Latency Testing
A common pitfall in single-page applications (SPAs) is failing to handle network latency or unexpected HTTP errors. Our **API Simulation Mode** lets you test these scenarios interactively:
- **Latency Spikes:** Slide the delay control to 2000ms to see if your React loaders or skeleton screens render correctly.
- **Error Boundaries:** Simulate \`401 Unauthorized\` or \`500 Internal Server Error\` status codes to verify that UI error banners display correctly.
- **Pagination Validation:** Wrap your mock data inside a standard paging response containing page numbers, limits, and total item counts.

#### 3. Database Seeding and Relational Testing
When setting up a database for testing (MySQL, PostgreSQL, SQL Server), you need tables populated with thousands of rows to test query performance, indexes, and search behaviors. Generating SQL inserts manually is tedious. This generator allows you to create bulk \`INSERT\` statements mapping object schemas directly to table rows. For flatter files, you can export raw datasets in CSV or minified JSON.

#### 4. Type-Safe Design (TypeScript, Zod, and GraphQL)
Modern developers favor type safety. Instead of writing TypeScript interfaces, Zod validation schemas, or GraphQL types from scratch based on a JSON payload, this tool infers types directly from your visual schema model. 

For instance, checking the \`nullable\` rule on a string field translates directly to \`string | null\` in TypeScript, \`z.string().nullable()\` in Zod, and a non-required \`String\` field in GraphQL schemas.

### Deep Dive into Supported Data Types

To ensure generated payloads match production environments, the engine supports a vast library of semantic types:
- **Basic Scalars:** Generates strings, integers, floating-point numbers, decimals, timestamps, and true/false values. Numeric fields support min/max ranges and decimal precision.
- **Semantic Identity:** Generates realistic first names, last names, usernames, secure passwords, telephone numbers, and compliant UUIDs (v4).
- **Network Data:** Generates mock URLs, domain names, mock IP addresses (both IPv4 and IPv6 format), browser user agents, and placeholder avatar URLs.
- **Location Structures:** Generates geographic datasets including states, cities, countries, zip codes, coordinates (latitude/longitude), and complete mailing addresses.
- **Business Logic:** Generates company names, currency codes, product names, prices, and job titles.
- **Lorem Generators:** When you need plain text, generate custom length sentences, paragraphs, descriptions, or snippets.

### Security and Best Practices in API Mocking

When utilizing mock data in tests, keep the following security considerations in mind:
1. **Never use real credentials:** Ensure mock passwords, secrets, and API keys are entirely randomized. This tool generates simulated hashes and API keys for this reason.
2. **Edge Cases Matter:** Do not just test happy paths. Use the validation rules to generate optional (nullable) fields, extreme numbers (min/max), and empty arrays to verify application resilience.
3. **Decouple from Server:** Keep mock services modular. When production routes are finalized, switching from mocks to actual servers should require changing only a base URL or environment variable.
  `,

  features: [
    "Interactive Custom Schema Builder with nesting supports for objects and arrays",
    "Comprehensive field library: Basic, Identity, Location, Business, Developer, and Lorem data",
    "Advanced field validation rules: min/max, precision, nullable, required, and enum options",
    "API Simulator Mode: Test latency delays (up to 5s), custom HTTP statuses, and pagination envelopes",
    "Multi-format exporters: Export raw/minified JSON, CSV, SQL INSERT statements, and JS objects",
    "Automatic type generation: Compile Zod validators, TypeScript interfaces, GraphQL, and JSON Schemas",
    "Seeded dataset presets: Instantly load Users, Products, CRM, Social Media, and Auth layouts",
    "100% Client-side processing: High performance with total privacy"
  ],

  useCases: [
    "Frontend prototyping before backend endpoints are built",
    "Seeding relational databases with SQL insert commands for load testing",
    "Simulating network latency and checking UI skeleton loaders",
    "Validating error handling components by simulating HTTP status errors",
    "Generating Zod schemas and TypeScript typings from visual layout designs",
    "Writing automated API client test suites with deterministic mock data",
    "Creating sample payloads for developer API documentation"
  ],

  howToSteps: [
    "Select a preloaded template preset (like User API or Product API) or build one from scratch.",
    "Add new fields dynamically by clicking 'Add Root Field'. Select your desired semantic data type.",
    "Expand a field's 'Validation Rules' details section to set limits like min/max values, date ranges, precision, or unique constraints.",
    "Create nested collections by adding fields of type 'Object' or 'Array' and appending child attributes.",
    "Select the record count you want to generate. Preview results in real-time.",
    "Switch format tabs to view data as JSON, CSV, SQL inserts, or JavaScript structures.",
    "Use the 'Type Definitions' tab to copy TypeScript or Zod code directly into your codebase.",
    "Switch to 'API Simulation' tab to slide network latency, pick status codes, and test endpoint behaviors."
  ],

  examples: [
    {
      title: "User Profile JSON Schema",
      description: "Generates a structured user account with contact info, avatar URL, and job title.",
      input: "Preset: User API",
      output: `[
  {
    "id": 1,
    "fullName": "Sarah Smith",
    "username": "sarah.smith45",
    "email": "sarah.smith45@gmail.com",
    "phone": "(415) 555-2671",
    "avatarUrl": "https://i.pravatar.cc/150?img=12",
    "jobTitle": "Frontend Developer",
    "address": {
      "street": "142 Maple Rd",
      "city": "Seattle",
      "state": "WA",
      "country": "United States",
      "zipCode": "98101",
      "coordinates": {
        "lat": 47.6062,
        "lng": -122.3321
      }
    },
    "role": "admin",
    "isActive": true
  }
]`
    },
    {
      title: "Product Table SQL Insertion",
      description: "Mock SQL inserts for seeding relational database product inventories.",
      input: "Schema: Product API (id, name, price, brand) -> Format: SQL",
      output: `INSERT INTO \`mock_users\` (\`id\`, \`name\`, \`price\`, \`brand\`) VALUES (1, 'Smart Monitor', 349.99, 'TechCorp');
INSERT INTO \`mock_users\` (\`id\`, \`name\`, \`price\`, \`brand\`) VALUES (2, 'Wireless Headphones', 129.50, 'ApexDigital');
INSERT INTO \`mock_users\` (\`id\`, \`name\`, \`price\`, \`brand\`) VALUES (3, 'Ergonomic Chair', 249.00, 'NexusTech');`
    },
    {
      title: "TypeScript API Typings",
      description: "TypeScript interfaces auto-inferred from custom schema hierarchies.",
      input: "Type Generator: TypeScript",
      output: `export interface MockResponse {
  id: number;
  fullName: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  isActive: boolean;
}`
    }
  ],

  faq: [
    {
      question: "What is API mock data?",
      answer: "API mock data consists of simulated responses that mimic real API payloads. Developers use mock data to build and test applications independently of actual backend services."
    },
    {
      question: "Are there any privacy concerns? Is my data sent to your servers?",
      answer: "No. All generation and schema building happens locally in your web browser. No data, schemas, or configurations are ever sent to our servers. Your security and privacy are 100% preserved."
    },
    {
      question: "Can I generate nested objects and arrays?",
      answer: "Yes. By adding a field with type 'Object' or 'Array', you can append child fields recursively to create deeply nested JSON payloads of any complexity."
    },
    {
      question: "How does the API Simulation Mode work?",
      answer: "It allows you to simulate network requests locally. You can specify latency delays (e.g. 1.5 seconds) and choose HTTP status codes (like 404 or 500) to see how your frontend application handles loading spinners or error screens."
    },
    {
      question: "What formats can I export my mock data to?",
      answer: "We support exporting as JSON, Minified JSON, CSV spreadsheets, SQL INSERT statements, and raw JavaScript arrays."
    },
    {
      question: "Does the tool automatically generate TypeScript interfaces?",
      answer: "Yes. The 'Type Definitions' tab automatically converts your visual schema into exportable TypeScript interfaces, Zod schema objects, GraphQL types, and JSON Schema definitions."
    },
    {
      question: "Can I save my custom schemas for future use?",
      answer: "Yes. By clicking 'Save Schema', your current schema layout is saved in your browser's localStorage. You can restore it anytime from the list in the sidebar."
    },
    {
      question: "How many mock records can I generate at once?",
      answer: "You can generate up to 5,000 records instantly. To prevent browser memory overflows or freezing, we limit client-side generation to a safe threshold of 5,000 items."
    },
    {
      question: "Can I enforce unique values on generated fields?",
      answer: "Yes. Checking the 'Unique' option in a field's validation rules ensures that the generation engine keeps track of previously output values and prevents duplicates (e.g. for usernames or email addresses)."
    },
    {
      question: "Is this API Mock Data Generator free to use?",
      answer: "Yes, this tool is 100% free with no signups, limitations, or premium tiers required."
    }
  ],

  relatedTools: [
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "UUID Generator", slug: "uuid-generator" },
    { name: "Fake User Data Generator", slug: "fake-user-data-generator" },
    { name: "Random String Generator", slug: "random-string-generator" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Hash Generator", slug: "hash-generator" }
  ]
};
