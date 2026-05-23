import { SchemaField } from "./types";

export interface PresetTemplate {
  name: string;
  description: string;
  schema: SchemaField[];
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    name: "User API",
    description: "Generate user account information, including contact details, location, job, and avatar urls.",
    schema: [
      { id: "u1", name: "id", type: "integer", rules: { min: 1, max: 100000, unique: true } },
      { id: "u2", name: "fullName", type: "fullname", rules: {} },
      { id: "u3", name: "username", type: "username", rules: { unique: true } },
      { id: "u4", name: "email", type: "email", rules: { unique: true } },
      { id: "u5", name: "phone", type: "phone", rules: {} },
      { id: "u6", name: "avatarUrl", type: "avatar", rules: {} },
      { id: "u7", name: "jobTitle", type: "jobtitle", rules: {} },
      {
        id: "u8",
        name: "address",
        type: "object",
        rules: {},
        fields: [
          { id: "u8_1", name: "street", type: "address", rules: {} },
          { id: "u8_2", name: "city", type: "city", rules: {} },
          { id: "u8_3", name: "state", type: "state", rules: {} },
          { id: "u8_4", name: "country", type: "country", rules: {} },
          { id: "u8_5", name: "zipCode", type: "zip", rules: {} },
          {
            id: "u8_6",
            name: "coordinates",
            type: "object",
            rules: {},
            fields: [
              { id: "u8_6_1", name: "lat", type: "latitude", rules: {} },
              { id: "u8_6_2", name: "lng", type: "longitude", rules: {} }
            ]
          }
        ]
      },
      { id: "u9", name: "role", type: "string", rules: { enumValues: ["admin", "editor", "viewer", "guest"] } },
      { id: "u10", name: "isActive", type: "boolean", rules: {} }
    ]
  },
  {
    name: "Product API",
    description: "Ideal for product catalogs, including prices, stock status, ratings, and company metadata.",
    schema: [
      { id: "p1", name: "id", type: "integer", rules: { min: 1, max: 100000, unique: true } },
      { id: "p2", name: "name", type: "productname", rules: {} },
      { id: "p3", name: "sku", type: "uuid", rules: { unique: true } },
      { id: "p4", name: "price", type: "price", rules: { min: 10, max: 1000, precision: 2 } },
      { id: "p5", name: "discount", type: "float", rules: { min: 0, max: 30, precision: 1 } },
      { id: "p6", name: "inStock", type: "boolean", rules: {} },
      { id: "p7", name: "inventoryCount", type: "integer", rules: { min: 0, max: 500 } },
      { id: "p8", name: "brand", type: "company", rules: {} },
      { id: "p9", name: "description", type: "description", rules: {} },
      { id: "p10", name: "rating", type: "float", rules: { min: 1, max: 5, precision: 1 } }
    ]
  },
  {
    name: "Blog API",
    description: "Generate blog post feeds with authors, categories, tags, and recursive comments sections.",
    schema: [
      { id: "b1", name: "id", type: "integer", rules: { min: 1, max: 1000, unique: true } },
      { id: "b2", name: "title", type: "sentence", rules: {} },
      { id: "b3", name: "slug", type: "slug", rules: { unique: true } },
      { id: "b4", name: "summary", type: "articlesnippet", rules: {} },
      { id: "b5", name: "content", type: "paragraph", rules: {} },
      { id: "b6", name: "publishedAt", type: "date", rules: {} },
      {
        id: "b7",
        name: "author",
        type: "object",
        rules: {},
        fields: [
          { id: "b7_1", name: "id", type: "integer", rules: { min: 1, max: 100 } },
          { id: "b7_2", name: "name", type: "fullname", rules: {} },
          { id: "b7_3", name: "email", type: "email", rules: {} }
        ]
      },
      {
        id: "b8",
        name: "comments",
        type: "array",
        rules: { min: 1, max: 4 },
        fields: [
          { id: "b8_1", name: "id", type: "uuid", rules: {} },
          { id: "b8_2", name: "userName", type: "username", rules: {} },
          { id: "b8_3", name: "commentText", type: "sentence", rules: {} },
          { id: "b8_4", name: "likes", type: "integer", rules: { min: 0, max: 100 } }
        ]
      }
    ]
  },
  {
    name: "Ecommerce API",
    description: "Simulate shop checkouts, carts, and invoices containing nested item arrays and totals.",
    schema: [
      { id: "e1", name: "orderId", type: "uuid", rules: { unique: true } },
      { id: "e2", name: "customerName", type: "fullname", rules: {} },
      { id: "e3", name: "email", type: "email", rules: {} },
      { id: "e4", name: "orderDate", type: "date", rules: {} },
      {
        id: "e5",
        name: "items",
        type: "array",
        rules: { min: 2, max: 5 },
        fields: [
          { id: "e5_1", name: "productId", type: "integer", rules: { min: 100, max: 999 } },
          { id: "e5_2", name: "name", type: "productname", rules: {} },
          { id: "e5_3", name: "quantity", type: "integer", rules: { min: 1, max: 5 } },
          { id: "e5_4", name: "price", type: "price", rules: { min: 5, max: 150 } }
        ]
      },
      { id: "e6", name: "currency", type: "currency", rules: {} },
      { id: "e7", name: "shippingFee", type: "float", rules: { min: 5, max: 25 } },
      { id: "e8", name: "paymentStatus", type: "string", rules: { enumValues: ["paid", "pending", "failed", "refunded"] } }
    ]
  },
  {
    name: "Social Media API",
    description: "Generate social feeds containing posts, interactions, locations, and commentators lists.",
    schema: [
      { id: "s1", name: "postId", type: "uuid", rules: { unique: true } },
      { id: "s2", name: "authorName", type: "fullname", rules: {} },
      { id: "s3", name: "authorAvatar", type: "avatar", rules: {} },
      { id: "s4", name: "content", type: "paragraph", rules: {} },
      { id: "s5", name: "likesCount", type: "integer", rules: { min: 0, max: 5000 } },
      { id: "s6", name: "sharesCount", type: "integer", rules: { min: 0, max: 800 } },
      { id: "s7", name: "location", type: "city", rules: {} },
      {
        id: "s8",
        name: "tags",
        type: "array",
        rules: { min: 1, max: 3 },
        fields: [
          { id: "s8_1", name: "tag", type: "slug", rules: {} }
        ]
      }
    ]
  },
  {
    name: "Authentication API",
    description: "Mock token generation responses returned on successful login endpoints.",
    schema: [
      { id: "a1", name: "accessToken", type: "jwt", rules: {} },
      { id: "a2", name: "tokenType", type: "string", rules: { enumValues: ["Bearer"] } },
      { id: "a3", name: "expiresIn", type: "integer", rules: { enumValues: ["3600"] } },
      { id: "a4", name: "apiKey", type: "apikey", rules: {} },
      {
        id: "a5",
        name: "user",
        type: "object",
        rules: {},
        fields: [
          { id: "a5_1", name: "id", type: "uuid", rules: {} },
          { id: "a5_2", name: "email", type: "email", rules: {} },
          { id: "a5_3", name: "name", type: "fullname", rules: {} }
        ]
      }
    ]
  },
  {
    name: "Dashboard Analytics API",
    description: "Mock stats, conversions, traffic metrics, and warning levels for control dashboards.",
    schema: [
      { id: "d1", name: "timestamp", type: "timestamp", rules: {} },
      { id: "d2", name: "visitorsCount", type: "integer", rules: { min: 1000, max: 25000 } },
      { id: "d3", name: "conversionRate", type: "float", rules: { min: 0.5, max: 4.8, precision: 2 } },
      { id: "d4", name: "bounceRate", type: "float", rules: { min: 30.5, max: 70.2, precision: 2 } },
      { id: "d5", name: "serverCpuLoad", type: "float", rules: { min: 5.5, max: 95.0, precision: 1 } },
      { id: "d6", name: "hasAlerts", type: "boolean", rules: {} }
    ]
  },
  {
    name: "CRM API",
    description: "Generate client deal metrics, contact details, priority categories, and transaction amounts.",
    schema: [
      { id: "c1", name: "leadId", type: "uuid", rules: {} },
      { id: "c2", name: "contactName", type: "fullname", rules: {} },
      { id: "c3", name: "company", type: "company", rules: {} },
      { id: "c4", name: "email", type: "email", rules: {} },
      { id: "c5", name: "dealValue", type: "price", rules: { min: 1000, max: 75000, precision: 2 } },
      { id: "c6", name: "stage", type: "string", rules: { enumValues: ["Discovery", "Proposal Sent", "Negotiation", "Closed Won", "Closed Lost"] } },
      { id: "c7", name: "priority", type: "string", rules: { enumValues: ["High", "Medium", "Low"] } }
    ]
  }
];
