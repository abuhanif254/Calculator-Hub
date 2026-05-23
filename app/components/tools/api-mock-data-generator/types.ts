export type FieldType =
  // Basic Types
  | "string"
  | "number"
  | "boolean"
  | "float"
  | "integer"
  | "decimal"
  | "null"
  | "date"
  | "time"
  | "timestamp"
  // Identity Data
  | "fullname"
  | "firstname"
  | "lastname"
  | "username"
  | "email"
  | "phone"
  | "password"
  | "uuid"
  // Internet Data
  | "url"
  | "domain"
  | "ip"
  | "useragent"
  | "avatar"
  // Location Data
  | "country"
  | "city"
  | "state"
  | "zip"
  | "latitude"
  | "longitude"
  | "address"
  // Business Data
  | "company"
  | "jobtitle"
  | "currency"
  | "price"
  | "productname"
  // Developer Data
  | "apikey"
  | "jwt"
  | "slug"
  | "hexcolor"
  | "base64"
  | "hash"
  // Lorem Data
  | "sentence"
  | "paragraph"
  | "description"
  | "articlesnippet"
  // Nested Data
  | "object"
  | "array";

export interface FieldRules {
  min?: number;              // min length for string, min value for number/float, min items for array
  max?: number;              // max length for string, max value for number/float, max items for array
  maxLength?: number;        // max length for string
  precision?: number;        // decimal places for float/decimal
  required?: boolean;        // if false, can sometimes be omitted entirely (optional fields)
  nullable?: boolean;        // if true, value can be null (with nullableProbability)
  nullProbability?: number;  // percent probability of being null (0 to 100)
  enumValues?: string[];     // list of possible values for enum-like selection
  regexPattern?: string;     // mock matches specific regex (or simple regex generator)
  unique?: boolean;          // unique values within generated records
  startDate?: string;        // start date for date/timestamp range
  endDate?: string;          // end date for date/timestamp range
}

export interface SchemaField {
  id: string;
  name: string;
  type: FieldType;
  rules: FieldRules;
  fields?: SchemaField[];    // populated only if type is "object" or "array"
  isEditing?: boolean;
}

export interface ApiSimulationConfig {
  delay: number;             // Response delay in ms (0 - 5000)
  statusCode: number;        // HTTP Status Code (200, 201, 400, 401, 403, 404, 500)
  usePagination: boolean;    // Wrap in standard paging envelope
  page: number;              // Page number
  limit: number;             // Page limit
  totalRecords: number;      // Total virtual records
}

export type OutputFormat =
  | "json"
  | "json_min"
  | "csv"
  | "sql"
  | "js_object"
  | "typescript"
  | "graphql"
  | "json_schema"
  | "zod";
