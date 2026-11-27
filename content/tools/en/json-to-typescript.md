---
metaTitle: "JSON to TypeScript Generator — Recursive Interface Types"
metaDescription: "Generate strict TypeScript export interfaces from JSON payloads locally in your browser. Handles nested objects, union arrays, and API DTO scaffolding."
metaKeywords: "json to typescript generator, typescript interface from json, union array types, api dto type safety, zod runtime validation, client side typescript tool"
title: "JSON to TypeScript Interface Generator"
shortDescription: "Infer clean, recursive TypeScript export interfaces and union array types from raw JSON payloads directly in your browser for end-to-end API type safety."
faqs:
  - question: "How does the generator handle arrays containing mixed types or different object shapes?"
    answer: "Every element inside an array is inspected recursively. Mixed primitive arrays produce sorted union types like '(string | number)[]', while heterogeneous object arrays merge properties and mark keys missing from some elements as optional ('?')."
  - question: "Should I use generated TypeScript interfaces alone to validate untrusted API responses?"
    answer: "No. TypeScript interfaces exist only at compile time and are erased from emitted JavaScript. Pair your generated interfaces with a runtime schema validator like Zod, Valibot, or TypeBox at API boundaries to verify external payloads."
  - question: "How are nested objects named when generating multiple interfaces?"
    answer: "Nested plain objects are extracted into named PascalCase top-level 'export interface' declarations derived from their parent property name, preventing deeply indented inline types and improving IDE autocomplete readability."
  - question: "What happens when JSON keys contain hyphens, spaces, or start with digits?"
    answer: "Keys that are not valid JavaScript identifiers (such as 'content-type' or '2fa_enabled') are automatically wrapped in quotes inside the generated interface so the output compiles cleanly under 'tsc --strict'."
  - question: "Is my API response or secret payload uploaded to any server?"
    answer: "No. AST traversal, type inference, and interface formatting run 100% locally inside your browser, keeping proprietary API schemas and internal payloads completely private."
features:
  - "Recursive AST type inference extracting clean top-level 'export interface' blocks"
  - "Heterogeneous array merging with automatic optional property ('?') detection"
  - "Union type synthesis for nullable fields and mixed-type JSON arrays"
  - "Automatic PascalCase interface naming and safe quoting for non-identifier keys"
  - "Zero-upload client-side execution ready for strict TypeScript and Zod DTO workflows"
useCases:
  - "Scaffolding typed Data Transfer Objects (DTOs) from live REST or GraphQL JSON responses"
  - "Replacing 'any' in legacy fetch() wrappers with strict compile-time response contracts"
  - "Documenting third-party webhook payloads (Stripe, GitHub, Slack) before writing handlers"
  - "Generating baseline interfaces to pair with Zod or Valibot runtime validation schemas"
  - "Inspecting complex nested NoSQL document structures as concise type definitions"
howToSteps:
  - "Paste a sample JSON object or array response into the input editor."
  - "Set your desired root interface name (for example, 'OrderResponse')."
  - "Review the extracted nested interfaces, optional properties, and union array types."
  - "Copy the generated 'export interface' code directly into your '.ts' types module."
---

Typing third-party REST responses or internal microservice payloads by hand wastes engineering time and invites subtle mismatches between API contracts and frontend code. Yet grabbing a single sample payload and slapping `as MyResponse` onto `fetch()` creates false confidence when optional properties disappear or arrays mix `null` and object shapes. This generator inspects full JSON trees to infer accurate, idiomatic TypeScript `export interface` declarations built for strict codebases.

All JSON parsing, structural type merging, and interface formatting run 100% client-side inside your browser. Zero bytes are ever uploaded to external servers, allowing you to safely scaffold types from proprietary API logs, internal staging responses, and sensitive production fixtures.

## Under-the-Hood Architecture and Specification

A reliable JSON-to-TypeScript inference engine operates as a recursive structural type lattice over the parsed JSON Abstract Syntax Tree (AST):

1. **Primitive Mapping:** JSON `string`, `number`, `boolean`, and `null` literals map directly to TypeScript `string`, `number`, `boolean`, and `null`. Unlike naive tools that emit `any` for `null`, retaining `null` exposes nullable fields explicitly so `strictNullChecks` catches unguarded property reads.
2. **Array Unification:** Empty arrays (`[]`) infer `unknown[]` rather than `any[]`, preserving type safety under `noImplicitAny`. For populated arrays, the engine inspects *every* element rather than only index `0`:
   - Mixed primitives deduplicate into union arrays such as `(string | number | null)[]`.
   - Object arrays unify their property maps. Any key present in at least one element but absent in another is emitted with the optional modifier (`key?: T`), and keys with differing types across elements merge into `T1 | T2`.
3. **Identifier Normalization & Extraction:** Nested objects extract into named PascalCase `export interface` definitions (`User`, `BillingAddress`). Property names containing hyphens, dots, or leading numbers (for example, `"x-request-id"`) are quoted automatically so the generated code passes `tsc --strict` with zero manual cleanup. When multiple nested properties share identical structural shapes across distant branches of a response, normalizing interfaces at the top level avoids redundant inline type literals and makes downstream refactoring predictable across large monorepos.

By separating structural inference from code emission, the generator also avoids common naming collisions—automatically disambiguating duplicate child interface names when two distinct parent objects both contain a nested `metadata` or `config` sub-object with incompatible fields.

## Step-by-Step Developer Walkthrough

Take a realistic paginated API payload featuring a nullable cursor, an empty array, a non-identifier header key, and an array of objects where the second item omits an optional `discount` field:

```json
{
  "request-id": "req_8841a",
  "nextCursor": null,
  "warnings": [],
  "items": [
    { "id": "sku_1", "price": 29.99, "discount": 5, "tags": ["sale", 2026] },
    { "id": "sku_2", "price": 15.0, "tags": ["core"] }
  ]
}
```

1. **Root Extraction:** `"request-id"` is quoted because `-` is invalid in an unquoted TypeScript identifier, while `nextCursor` stays `null` (ready to widen to `string | null` if documented as a string cursor).
2. **Array Merging:** Inspecting both `items` records reveals `discount` exists only on the first element, producing `discount?: number`. Meanwhile, `tags` mixes strings and numbers, yielding `(string | number)[]`.
3. **Safe Empty Array:** `warnings` produces `unknown[]` instead of unsafe `any[]`.

Generated TypeScript output:

```ts
export interface RootResponse {
  "request-id": string;
  nextCursor: null;
  warnings: unknown[];
  items: Item[];
}

export interface Item {
  id: string;
  price: number;
  discount?: number;
  tags: (string | number)[];
}
```

## Type Inference Mapping Reference

| JSON Input Pattern | Naive Generator Output | Strict Inference Output | Why It Matters in `tsc --strict` |
| :--- | :--- | :--- | :--- |
| `[]` (empty array) | `any[]` | `unknown[]` | Prevents silent `any` propagation across callers |
| `null` | `any` | `null` | Forces explicit null checks under `strictNullChecks` |
| `["a", 1, "b"]` | `any[]` or `string[]` | `(string | number)[]` | Catches missing `typeof` narrowing at compile time |
| `[{a: 1}, {a: 2, b: "x"}]` | `{ a: number }[]` (drops `b`) | `{ a: number; b?: string }[]` | Preserves sparse keys without losing optionality |
| `"x-api-key": "123"` | `x-api-key: string` (syntax error) | `"x-api-key": string` | Compiles immediately without manual quoting |
| `{"user": {"id": 1}}` | Deeply nested inline block | Extracted `export interface User` | Keeps DTOs modular, exportable, and reusable |

## Production Pitfalls, Security, and Performance Edge Cases

The biggest mistake TypeScript teams make is **confusing compile-time interfaces with runtime validation**. Every `export interface` is erased completely during compilation to JavaScript. If a third-party endpoint suddenly changes `price` from `29.99` to `"29.99"` or returns `{ error: "rate_limited" }` with HTTP 200, TypeScript cannot stop `item.price.toFixed(2)` from throwing a `TypeError` in production. Treat generated interfaces as your DTO blueprint, then enforce untrusted network boundaries at runtime using a schema library such as **Zod**, **Valibot**, or **ArkType**:

```ts
import { z } from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  price: z.number(),
  discount: z.number().optional(),
  tags: z.array(z.union([z.string(), z.number()])),
});
export type Item = z.infer<typeof ItemSchema>;
```

A second common pitfall is **single-sample blindness**. Generating an interface from one JSON response cannot distinguish an enum (`"pending" | "paid" | "failed"`) from an arbitrary `string`, nor can it tell whether a `null` field is normally a `string | null`. Always test against multiple representative payloads—especially error states, empty collections, and pagination boundaries—before locking down shared DTO types.

Finally, watch for **dictionary-style maps** keyed by dynamic IDs (such as `{ "usr_101": { ... }, "usr_102": { ... } }`). Inferring static properties for each dynamic UUID creates brittle, unscalable interfaces; refactor those sections manually to `Record<string, UserSummary>` so your types generalize cleanly across any runtime key. In addition, pay close attention to **ISO-8601 timestamps and serialized decimals**: JSON represents both dates and high-precision monetary amounts as `string` values, so review generated interfaces to document branded types (such as `ISODateString` or `DecimalString`) or parse them into `Date` instances inside a dedicated API mapper layer rather than performing raw string arithmetic in UI components.
