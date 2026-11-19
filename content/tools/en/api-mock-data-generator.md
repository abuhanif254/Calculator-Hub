---
metaTitle: "API Mock Data Generator — JSON Schemas, SQL & TypeScript"
metaDescription: "Build nested mock API schemas, simulate REST latency and HTTP errors, and export JSON, SQL, CSV, Zod, GraphQL, or TypeScript types in your browser."
metaKeywords: "API mock data generator, mock api response, json mock data, fake json api, rest api simulator, schema mock generator, typescript interface generator, db insert generator, sql insert mock, csv mock data, graphql mock api, fake data builder"
title: "API Mock Data Generator"
shortDescription: "Design nested JSON API schemas with 40+ semantic field types, simulate REST latency and HTTP error codes, and export payloads alongside TypeScript, Zod, GraphQL, and JSON Schema contracts."
faqs:
  - question: "How does the generator enforce unique values across nested objects and arrays?"
    answer: "Each field marked unique maintains an in-memory Set keyed by its full hierarchical path (for example, items[].sku or address.zip). During synthesis, the engine retries generation up to 100 times per record to prevent duplicate keys within the batch."
  - question: "Are the generated JWTs and API keys cryptographically valid credentials?"
    answer: "No. Mock API keys (sk_live_ prefixed) and JWTs (HS256 header, sample claims payload, and random hex signature) are structurally realistic strings created strictly for frontend parsing and contract testing. Never use them for real authentication or signing."
  - question: "How are nested objects handled when exporting to flat formats like CSV or SQL?"
    answer: "CSV export recursively flattens nested objects into dot-notation column headers (such as address.coordinates.lat) and stringifies array values with RFC 4180 quote escaping. SQL export serializes nested objects and arrays as single-quote-escaped JSON strings suitable for JSON or JSONB columns."
  - question: "What HTTP conditions can I test in API Simulation Mode?"
    answer: "You can inject configurable artificial latency up to 5,000 ms, return standard HTTP status codes including 200, 201, 400, 401, 403, 404, and 500, and wrap records inside a pagination envelope containing page, limit, and total record metadata."
  - question: "Do custom schemas or generated payloads leave my browser?"
    answer: "Never. Schema definitions are stored only in your browser's localStorage when you explicitly click Save Schema, and all data synthesis, type compilation, and file exports run locally in JavaScript."
features:
  - "Recursive visual schema builder supporting deeply nested objects, variable-length arrays, and 40+ semantic data types"
  - "Field-level constraint engine covering min/max bounds, decimal precision, custom enum arrays, uniqueness sets, and probabilistic null injection"
  - "Four-target contract compiler generating TypeScript interfaces, Zod validators, JSON Schema Draft-07, and GraphQL SDL from one schema"
  - "Interactive REST API simulator with 0–5,000 ms network latency, HTTP status overrides (200–500), and pagination envelopes"
  - "Multi-format data exporter producing pretty or minified JSON, dot-flattened CSV, SQL INSERT statements, and native JavaScript arrays"
  - "Pre-built starter presets for User, Product, Blog, Ecommerce, Social Media, and Authentication APIs plus localStorage schema persistence"
useCases:
  - "Unblocking React, Vue, and mobile teams with realistic JSON contracts before backend microservices are deployed"
  - "Generating Zod runtime validators and TypeScript interfaces simultaneously during OpenAPI and API-first design reviews"
  - "Verifying UI skeleton screens, retry logic, and error boundaries under slow responses and 401/404/500 HTTP failures"
  - "Seeding PostgreSQL or MySQL staging tables with thousands of typed rows including JSON/JSONB columns"
  - "Creating deterministic edge-case test payloads with nullable fields, empty arrays, and boundary prices for QA suites"
  - "Embedding realistic sample payloads and GraphQL types inside technical API documentation and Postman collections"
howToSteps:
  - "Load an existing preset (User, Product, Blog, Ecommerce, Social Media, or Auth) or click Add Root Field to model a custom payload."
  - "Assign semantic field types across Basic, Identity, Internet, Location, Business, Developer, Lorem, Object, or Array categories."
  - "Open each field's validation rules to configure numeric ranges, decimal precision, date bounds, enum options, uniqueness, or null probability."
  - "Set your desired record count (up to 5,000 rows) and inspect live data in JSON, Minified JSON, CSV, SQL, or JS Object format."
  - "Switch to Type Definitions to copy compiled TypeScript interfaces, Zod schemas, GraphQL types, or JSON Schema Draft-07."
  - "Open API Simulation Mode to configure response latency, HTTP status codes, and pagination envelopes for client-side integration tests."
---

Modern web and mobile teams rarely build frontend and backend layers strictly sequentially. Waiting for database migrations, service controllers, and staging deployments before wiring UI components stalls entire sprints. By defining a shared data contract up front and generating structurally authentic mock payloads locally in the browser, frontend engineers, backend architects, and QA teams can develop and validate against the same shape in parallel—without exposing proprietary internal schemas to external cloud mocking services.

## Recursive Schema Architecture and Field Constraint Rules

Unlike flat tabular generators, real REST and GraphQL payloads contain multi-level hierarchies: an e-commerce order embeds a shipping address object, which in turn embeds geographic coordinates, alongside a variable-length array of line items. The generator models every payload as a recursive tree of `SchemaField` nodes. When the resolver encounters an `object` node, it traverses child fields recursively; when it encounters an `array` node, it samples a length between `rules.min` and `rules.max` (defaulting to 1–5 items) and synthesizes a typed element object per iteration.

Fine-grained constraints turn generic dummy JSON into adversarial test data capable of exposing subtle client bugs:

- **Stochastic Nullability**: Setting `nullable: true` alongside `nullProbability` (0–100%) injects `null` values on a controlled percentage of rows, immediately revealing unhandled `Cannot read properties of null` crashes in UI renderers.
- **Scoped Uniqueness & Sequential Keys**: Integer or number fields named `id` at the root level auto-increment cleanly from `startId`, while any field flagged `unique` tracks emitted values in a path-scoped `Set` (for example, `comments[].id` or `email`) so identifiers remain collision-free across the batch.
- **Format-Authentic Primitives**: Semantic resolvers generate RFC 4122 Version 4 UUIDs (setting the `4` version nibble and `10xx` variant bits), ISO 8601 dates (`YYYY-MM-DD`), Unix epoch seconds, IPv4 dotted quads, decimal coordinates (`-90` to `90` latitude and `-180` to `180` longitude at 6-digit precision), realistic browser `User-Agent` strings, and HS256-structured mock JWTs. You can inspect generated token structures directly inside our [JWT Decoder](/en/tools/jwt-decoder) to confirm claim formatting.

## Compiling One Visual Model into Four Type Systems

Maintaining mock fixtures separately from TypeScript types, runtime validators, and API documentation almost always results in schema drift. The generator eliminates manual translation by compiling the exact same schema AST into four industry-standard contract formats:

| Schema Feature | TypeScript Interface | Zod Validator | JSON Schema (Draft-07) | GraphQL SDL |
| :--- | :--- | :--- | :--- | :--- |
| **Integer / Timestamp** | `number` | `z.number()` | `"type": "number"` | `Int` |
| **Float / Decimal / Price** | `number` | `z.number()` | `"type": "number"` | `Float` |
| **Email / UUID / URL** | `string` | `z.string().email()` / `.uuid()` / `.url()` | `"type": "string"` | `String` |
| **Nullable Field** | `T \| null` | `.nullable()` | `"type": ["<type>", "null"]` | Nullable field (omits `!` if optional) |
| **Optional Field (`required: false`)** | `field?: T` | `.optional()` | Excluded from `required[]` array | Omits non-null `!` modifier |
| **Nested Object / Array** | Inline `{ ... }` or `{ ... }[]` | `z.object({ ... })` / `z.array(...)` | Nested `properties` / `items` | Hoisted `Parent_Child` named object type |

Notice how GraphQL SDL automatically hoists nested anonymous objects into distinct named types (such as `ResponseItem_Address` and `ResponseItem_Address_Coordinates`) because GraphQL does not permit inline anonymous object definitions inside type fields.

## Simulating Real-World HTTP Status Codes and Network Jitter

Testing exclusively against instant `200 OK` JSON files hides race conditions, double-submit bugs, and broken empty states. API Simulation Mode mirrors real network behavior defined in RFC 9110:

1. **Latency Injection (0–5,000 ms)**: Dialing response delay to 1,500–3,000 ms exposes missing loading indicators, layout shifts when skeleton placeholders swap to real text, and stale-response bugs when users trigger rapid filter changes without `AbortController` cancellation.
2. **Error Status Verification**: Toggling `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, and `500 Internal Server Error` confirms that authentication interceptors trigger token refresh flows on `401`, permission banners render cleanly on `403`, and unexpected `500` responses land in graceful fallback UI rather than unhandled promise rejections.
3. **Pagination Envelopes**: Enabling pagination wraps the generated slice inside standard `page`, `limit`, and `totalRecords` metadata so you can test boundary conditions—including last-page partial arrays and zero-item responses—before backend cursor or offset logic exists.

## Runtime Validation Workflow: Pairing Mock Payloads with Zod

Because TypeScript interfaces vanish at compile time, pairing a generated Zod schema with mock JSON responses catches upstream API breaking changes during integration tests:

```typescript
import { z } from "zod";

// Copied directly from the Type Definitions -> Zod tab
export const userApiSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.string(),
  address: z.object({
    city: z.string(),
    zipCode: z.string().nullable(),
  }),
});

export type UserApiItem = z.infer<typeof userApiSchema>;

export async function fetchUsers(endpoint: string): Promise<UserApiItem[]> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const payload: unknown = await res.json();
  return z.array(userApiSchema).parse(payload);
}
```

When inspecting minified API payloads or comparing serialized responses before plugging them into tests, you can pretty-print and validate syntax with our [JSON Formatter](/en/tools/json-formatter).

## Flattening Nested Payloads for CSV and SQL Seeding

Exporting hierarchical schemas into relational tables or spreadsheets requires predictable serialization rules:

- **Dot-Path CSV Flattening**: Nested `object` properties expand into dot-delimited columns (for example, `address.city`, `address.coordinates.lat`), while nested `array` fields serialize as JSON strings wrapped in RFC 4180 double quotes (`""` escaping internal quotes).
- **Typed SQL Statements**: The SQL serializer emits backtick-quoted table and column identifiers (`INSERT INTO \`mock_table\` (...) VALUES (...);`), maps booleans to native `TRUE`/`FALSE`, preserves numeric scalars unquoted, and converts nested objects or arrays into single-quote-escaped JSON literals ready for `JSON` or `JSONB` columns. If you are preparing PostgreSQL scripts that require double-quoted identifiers instead of MySQL backticks, or need formatted multi-line readability before running migrations, run the output through our [SQL Formatter](/en/tools/sql-formatter).
- **Client-Side Batch Ceiling**: Generating up to 5,000 records runs instantaneously in the browser's main thread without backend quotas; for multi-million-row stress benchmarks, export the schema's JSON Schema or Zod definition and drive bulk seeding inside a local Node.js or Python script.
