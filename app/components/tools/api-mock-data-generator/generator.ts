import { SchemaField, FieldType, FieldRules } from "./types";

// ====================================================
// DATASETS FOR MOCK GENERATION
// ====================================================

const FIRST_NAMES = [
  "John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Jessica",
  "Robert", "Karen", "William", "Lisa", "Joseph", "Sandra", "Daniel", "Donna",
  "Thomas", "Ashley", "Matthew", "Kimberly", "Mark", "Patricia", "Donald", "Linda",
  "Alex", "Sophia", "Daniel", "Olivia", "Liam", "Emma", "Noah", "Ava",
  "Oliver", "Isabella", "Lucas", "Mia", "Mason", "Charlotte", "Ethan", "Amelia"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia",
  "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
  "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez",
  "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young",
  "Allen", "Sanchez", "Wright", "King", "Scott", "Green", "Baker", "Adams", "Nelson"
];

const DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "protonmail.com", "techcorp.com", "innovatelabs.io", "cloudsoft.net",
  "apexsolutions.co", "nexusdev.tech", "corporatesystems.org"
];

const STREET_NAMES = [
  "Oak", "Maple", "Pine", "Cedar", "Elm", "Washington", "Main", "Broadway",
  "Park", "Lake", "Hill", "Sunset", "Valley", "River", "Forest", "View"
];

const STREET_TYPES = ["St", "Ave", "Rd", "Ln", "Dr", "Ct", "Way", "Blvd"];

const CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
  "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
  "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle"
];

const STATES = [
  "NY", "CA", "IL", "TX", "AZ", "PA", "FL", "IN", "OH", "NC", "WA", "MA",
  "GA", "MI", "TN", "CO", "OR", "VA", "MD", "NJ"
];

const COUNTRIES = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany",
  "France", "Japan", "Brazil", "India", "South Africa", "Mexico",
  "Spain", "Italy", "Netherlands", "Singapore", "New Zealand", "Switzerland"
];

const COMPANY_NAMES = [
  "TechCorp", "InnovateLabs", "CloudSoft", "QuantumSystems", "ApexDigital",
  "NexusTech", "AeroDynamix", "GlobalTrade", "InfiniteLoop", "CyberGuard",
  "PeakVentures", "BlueNexus", "AlphaSolutions", "VeritasGroup", "OmniSystems"
];

const JOB_TITLES = [
  "Software Engineer", "Frontend Developer", "Backend Developer", "Product Manager",
  "UX/UI Designer", "Data Scientist", "DevOps Engineer", "QA Engineer",
  "Systems Analyst", "IT Director", "Database Administrator", "HR Manager",
  "Marketing Specialist", "Sales Director", "Financial Analyst", "Operations Manager"
];

const PRODUCT_PREFIXES = [
  "Wireless", "Smart", "Ultra", "Portable", "Ergonomic", "Professional",
  "Mini", "Mechanical", "Digital", "Precision", "Premium", "Heavy Duty"
];

const PRODUCT_NOUNS = [
  "Mouse", "Keyboard", "Headphones", "Monitor", "SSD", "Charger", "Webcam",
  "Speaker", "Watch", "Hub", "Desk", "Chair", "Microphone", "Projector"
];

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF"];

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
  "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/605.1.15",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0"
];

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
  "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip",
  "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor",
  "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore",
  "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
  "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt",
  "mollit", "anim", "id", "est", "laborum"
];

// ====================================================
// GENERATION HELPERS
// ====================================================

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, precision = 2): number {
  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(precision));
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateUUID(): string {
  // Simple RFC4122 v4 compliant UUID generator
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateIpAddress(v6 = false): string {
  if (v6) {
    return Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 65536).toString(16)
    ).join(":");
  }
  return Array.from({ length: 4 }, () => randomNumber(0, 255)).join(".");
}

function generateHexColor(): string {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color.padStart(6, "0")}`;
}

function generateLoremText(wordsCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordsCount; i++) {
    words.push(randomItem(LOREM_WORDS));
  }
  const text = words.join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function generateSentence(): string {
  const length = randomNumber(6, 14);
  return generateLoremText(length) + ".";
}

function generateParagraph(): string {
  const count = randomNumber(3, 6);
  return Array.from({ length: count }, generateSentence).join(" ");
}

function generatePhone(): string {
  const area = randomNumber(200, 999);
  const prefix = randomNumber(200, 999);
  const line = randomNumber(1000, 9999);
  return `(${area}) ${prefix}-${line}`;
}

function generatePassword(len = 12): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let pass = "";
  for (let i = 0; i < len; i++) {
    pass += chars.charAt(randomNumber(0, chars.length - 1));
  }
  return pass;
}

function generateAPIKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "sk_live_";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(randomNumber(0, chars.length - 1));
  }
  return key;
}

function generateBase64(str: string): string {
  try {
    return btoa(str);
  } catch (e) {
    return btoa("lorem ipsum dolor sit amet");
  }
}

function generateHash(len = 32): string {
  const chars = "abcdef0123456789";
  let hash = "";
  for (let i = 0; i < len; i++) {
    hash += chars.charAt(randomNumber(0, chars.length - 1));
  }
  return hash;
}

function generateJWT(username = "developer"): string {
  const header = generateBase64(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = generateBase64(JSON.stringify({
    sub: "1234567890",
    name: username,
    iat: Math.floor(Date.now() / 1000) - 3600,
    exp: Math.floor(Date.now() / 1000) + 3600,
    roles: ["admin", "developer"]
  }));
  const signature = generateHash(43);
  return `${header}.${payload}.${signature}`;
}

// ====================================================
// FIELD-LEVEL MOCK RESOLVER
// ====================================================

export function generateFieldValue(
  type: FieldType,
  rules: FieldRules,
  nestedFields?: SchemaField[],
  uniqueValues?: Record<string, Set<any>>,
  fieldKey?: string
): any {
  // 1) Nullability check
  if (rules.nullable && rules.nullProbability !== undefined) {
    if (randomNumber(1, 100) <= rules.nullProbability) {
      return null;
    }
  }

  // Helper to ensure uniqueness if required
  const makeUnique = (generator: () => any): any => {
    if (!rules.unique || !fieldKey || !uniqueValues) {
      return generator();
    }
    if (!uniqueValues[fieldKey]) {
      uniqueValues[fieldKey] = new Set<any>();
    }
    const set = uniqueValues[fieldKey];
    let attempts = 0;
    let val = generator();
    while (set.has(val) && attempts < 100) {
      val = generator();
      attempts++;
    }
    set.add(val);
    return val;
  };

  // 2) Enum option
  if (rules.enumValues && rules.enumValues.length > 0) {
    return makeUnique(() => {
      const rawVal = randomItem(rules.enumValues!);
      if (type === "number" || type === "integer" || type === "float" || type === "decimal" || type === "timestamp" || type === "price") {
        const parsed = Number(rawVal);
        return isNaN(parsed) ? rawVal : parsed;
      }
      return rawVal;
    });
  }

  // Parse date ranges
  const getStartEndDate = () => {
    const sDate = rules.startDate ? new Date(rules.startDate) : new Date(2020, 0, 1);
    const eDate = rules.endDate ? new Date(rules.endDate) : new Date(2028, 0, 1);
    return { sDate, eDate };
  };

  switch (type) {
    // Basic Types
    case "string":
      return makeUnique(() => {
        const len = rules.maxLength ? randomNumber(rules.min || 5, rules.maxLength) : (rules.min || 10);
        return generateLoremText(Math.max(1, Math.floor(len / 6)));
      });
    case "number":
      return makeUnique(() => randomNumber(rules.min ?? 1, rules.max ?? 100));
    case "boolean":
      return Math.random() > 0.5;
    case "float":
      return makeUnique(() => randomFloat(rules.min ?? 1, rules.max ?? 100, rules.precision ?? 2));
    case "integer":
      return makeUnique(() => randomNumber(rules.min ?? 1, rules.max ?? 10000));
    case "decimal":
      return makeUnique(() => randomFloat(rules.min ?? 10, rules.max ?? 1000, rules.precision ?? 2));
    case "null":
      return null;
    case "date": {
      const { sDate, eDate } = getStartEndDate();
      return makeUnique(() => randomDate(sDate, eDate).toISOString().split("T")[0]);
    }
    case "time":
      return makeUnique(() => {
        const h = String(randomNumber(0, 23)).padStart(2, "0");
        const m = String(randomNumber(0, 59)).padStart(2, "0");
        const s = String(randomNumber(0, 59)).padStart(2, "0");
        return `${h}:${m}:${s}`;
      });
    case "timestamp": {
      const { sDate, eDate } = getStartEndDate();
      return makeUnique(() => Math.floor(randomDate(sDate, eDate).getTime() / 1000));
    }

    // Identity Data
    case "fullname":
      return makeUnique(() => `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`);
    case "firstname":
      return makeUnique(() => randomItem(FIRST_NAMES));
    case "lastname":
      return makeUnique(() => randomItem(LAST_NAMES));
    case "username":
      return makeUnique(() => {
        const f = randomItem(FIRST_NAMES).toLowerCase();
        const l = randomItem(LAST_NAMES).toLowerCase();
        return `${f}.${l}${randomNumber(10, 99)}`;
      });
    case "email":
      return makeUnique(() => {
        const u = randomItem(FIRST_NAMES).toLowerCase() + randomNumber(1, 99);
        return `${u}@${randomItem(DOMAINS)}`;
      });
    case "phone":
      return makeUnique(generatePhone);
    case "password":
      return generatePassword(rules.max ?? 12);
    case "uuid":
      return makeUnique(generateUUID);

    // Internet Data
    case "url":
      return makeUnique(() => `https://${randomItem(COMPANY_NAMES).toLowerCase()}.com/api/v1/${generateLoremText(1)}`);
    case "domain":
      return makeUnique(() => `${randomItem(COMPANY_NAMES).toLowerCase()}.${randomItem(["com", "org", "io", "dev"])}`);
    case "ip":
      return makeUnique(() => generateIpAddress(false));
    case "useragent":
      return randomItem(USER_AGENTS);
    case "avatar":
      return `https://i.pravatar.cc/150?img=${randomNumber(1, 70)}`;

    // Location Data
    case "country":
      return randomItem(COUNTRIES);
    case "city":
      return randomItem(CITIES);
    case "state":
      return randomItem(STATES);
    case "zip":
      return makeUnique(() => String(randomNumber(10000, 99999)));
    case "latitude":
      return makeUnique(() => randomFloat(-90, 90, 6));
    case "longitude":
      return makeUnique(() => randomFloat(-180, 180, 6));
    case "address":
      return makeUnique(() => `${randomNumber(100, 9999)} ${randomItem(STREET_NAMES)} ${randomItem(STREET_TYPES)}, ${randomItem(CITIES)}, ${randomItem(STATES)} ${randomNumber(10000, 99999)}`);

    // Business Data
    case "company":
      return makeUnique(() => randomItem(COMPANY_NAMES));
    case "jobtitle":
      return randomItem(JOB_TITLES);
    case "currency":
      return randomItem(CURRENCIES);
    case "price":
      return makeUnique(() => randomFloat(rules.min ?? 5, rules.max ?? 500, rules.precision ?? 2));
    case "productname":
      return makeUnique(() => `${randomItem(PRODUCT_PREFIXES)} ${randomItem(PRODUCT_NOUNS)}`);

    // Developer Data
    case "apikey":
      return makeUnique(generateAPIKey);
    case "jwt":
      return generateJWT();
    case "slug":
      return makeUnique(() => generateLoremText(3).toLowerCase().replace(/\s+/g, "-"));
    case "hexcolor":
      return generateHexColor();
    case "base64":
      return generateBase64(generateLoremText(5));
    case "hash":
      return generateHash(32);

    // Lorem Data
    case "sentence":
      return generateSentence();
    case "paragraph":
      return generateParagraph();
    case "description":
      return generateLoremText(12) + ".";
    case "articlesnippet":
      return generateParagraph().slice(0, 150) + "...";

    // Nested Objects and Arrays
    case "object": {
      if (!nestedFields || nestedFields.length === 0) return {};
      const obj: Record<string, any> = {};
      nestedFields.forEach((field) => {
        obj[field.name] = generateFieldValue(
          field.type,
          field.rules,
          field.fields,
          uniqueValues,
          fieldKey ? `${fieldKey}.${field.name}` : field.name
        );
      });
      return obj;
    }
    case "array": {
      const minLength = rules.min ?? 1;
      const maxLength = rules.max ?? 5;
      const count = randomNumber(minLength, maxLength);
      const arr: any[] = [];

      for (let i = 0; i < count; i++) {
        // For array, if nestedFields exists, we treat it as an array of objects
        // If not, we fall back to a simple type generation. Let's see what type the elements should be.
        // Usually, in a nested field builder, array has fields inside or an element type.
        // We will design the SchemaField array to store its element details in `fields`.
        if (nestedFields && nestedFields.length > 0) {
          const itemObj: Record<string, any> = {};
          nestedFields.forEach((field) => {
            itemObj[field.name] = generateFieldValue(
              field.type,
              field.rules,
              field.fields,
              uniqueValues,
              fieldKey ? `${fieldKey}[].${field.name}` : `${field.name}[]`
            );
          });
          arr.push(itemObj);
        } else {
          // Fallback array of standard strings or integers
          arr.push(generateFieldValue("string", { min: 5, max: 10 }));
        }
      }
      return arr;
    }

    default:
      return "";
  }
}

// ====================================================
// CORE MOCK GENERATION FUNCTION
// ====================================================

export function generateMockData(
  schema: SchemaField[],
  count: number,
  startId = 1
): any[] {
  const results: any[] = [];
  const uniqueValues: Record<string, Set<any>> = {};

  for (let i = 0; i < count; i++) {
    const record: Record<string, any> = {};
    schema.forEach((field) => {
      // Auto-increment id support if there's a field named 'id' of type integer/number
      if (field.name.toLowerCase() === "id" && (field.type === "integer" || field.type === "number")) {
        record[field.name] = startId + i;
      } else {
        record[field.name] = generateFieldValue(
          field.type,
          field.rules,
          field.fields,
          uniqueValues,
          field.name
        );
      }
    });
    results.push(record);
  }

  return results;
}

// ====================================================
// FORMAT SERIALIZERS
// ====================================================

export function convertToJSON(data: any[], minified: boolean): string {
  return JSON.stringify(data, null, minified ? 0 : 2);
}

export function convertToJSObject(data: any[]): string {
  const json = JSON.stringify(data, null, 2);
  // Replace double-quoted property keys with unquoted or single quoted keys for native JS
  return `const mockData = ${json};`;
}

export function convertToCSV(data: any[], schema: SchemaField[]): string {
  if (data.length === 0) return "";
  
  // Extract flat keys
  const getFlatKeys = (fields: SchemaField[], prefix = ""): string[] => {
    let keys: string[] = [];
    fields.forEach((f) => {
      const fullKey = prefix ? `${prefix}.${f.name}` : f.name;
      if (f.type === "object") {
        keys = [...keys, ...getFlatKeys(f.fields || [], fullKey)];
      } else {
        keys.push(fullKey);
      }
    });
    return keys;
  };

  const headers = getFlatKeys(schema);
  const csvRows = [headers.join(",")];

  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : "";
    }, obj);
  };

  data.forEach((row) => {
    const values = headers.map((header) => {
      let val = getNestedValue(row, header);
      if (val === null || val === undefined) {
        val = "";
      } else if (typeof val === "object") {
        val = JSON.stringify(val);
      }
      
      // Escape commas and quotes for CSV
      let valStr = String(val);
      if (valStr.includes(",") || valStr.includes('"') || valStr.includes("\n")) {
        valStr = `"${valStr.replace(/"/g, '""')}"`;
      }
      return valStr;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

export function convertToSQL(data: any[], schema: SchemaField[], tableName = "mock_table"): string {
  if (data.length === 0) return "";

  // Helper to escape values for SQL statements
  const formatSqlValue = (val: any, type: FieldType): string => {
    if (val === null || val === undefined) return "NULL";
    if (type === "boolean") return val ? "TRUE" : "FALSE";
    if (type === "number" || type === "integer" || type === "float" || type === "decimal" || type === "timestamp") {
      return isNaN(Number(val)) ? "NULL" : String(val);
    }
    if (typeof val === "object") {
      // Serialize nested items as stringified JSON or text
      return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
    }
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  const insertStatements: string[] = [];
  const columns = schema.map(f => `\`${f.name}\``).join(", ");

  data.forEach((row) => {
    const values = schema.map((field) => {
      return formatSqlValue(row[field.name], field.type);
    }).join(", ");
    insertStatements.push(`INSERT INTO \`${tableName}\` (${columns}) VALUES (${values});`);
  });

  return insertStatements.join("\n");
}

// ====================================================
// TYPE GENERATORS
// ====================================================

function mapFieldTypeToTs(type: FieldType): string {
  switch (type) {
    case "number":
    case "float":
    case "integer":
    case "decimal":
    case "timestamp":
      return "number";
    case "boolean":
      return "boolean";
    case "null":
      return "null";
    case "object":
      return "Record<string, any>";
    case "array":
      return "any[]";
    default:
      return "string";
  }
}

export function generateTypeScript(schema: SchemaField[], interfaceName = "ApiResponse"): string {
  const renderInterfaceBody = (fields: SchemaField[], indent = "  "): string => {
    let body = "";
    fields.forEach((f) => {
      const isNullable = f.rules.nullable ? " | null" : "";
      const isOptional = f.rules.required === false ? "?" : "";
      
      if (f.type === "object" && f.fields && f.fields.length > 0) {
        body += `${indent}${f.name}${isOptional}: {\n${renderInterfaceBody(f.fields, indent + "  ")}${indent}}${isNullable};\n`;
      } else if (f.type === "array" && f.fields && f.fields.length > 0) {
        body += `${indent}${f.name}${isOptional}: {\n${renderInterfaceBody(f.fields, indent + "  ")}${indent}}[]${isNullable};\n`;
      } else {
        const tsType = mapFieldTypeToTs(f.type);
        body += `${indent}${f.name}${isOptional}: ${tsType}${isNullable};\n`;
      }
    });
    return body;
  };

  return `export interface ${interfaceName} {\n${renderInterfaceBody(schema)}}`;
}

export function generateZodSchema(schema: SchemaField[], schemaName = "apiResponseSchema"): string {
  const renderZodBody = (fields: SchemaField[], indent = "  "): string => {
    let body = "";
    fields.forEach((f) => {
      let zodType = "z.string()";
      
      if (f.type === "number" || f.type === "integer" || f.type === "float" || f.type === "decimal" || f.type === "timestamp") {
        zodType = "z.number()";
      } else if (f.type === "boolean") {
        zodType = "z.boolean()";
      } else if (f.type === "null") {
        zodType = "z.null()";
      } else if (f.type === "object" && f.fields && f.fields.length > 0) {
        zodType = `z.object({\n${renderZodBody(f.fields, indent + "  ")}${indent}})`;
      } else if (f.type === "array" && f.fields && f.fields.length > 0) {
        zodType = `z.array(z.object({\n${renderZodBody(f.fields, indent + "  ")}${indent}}))`;
      } else if (f.type === "uuid") {
        zodType = "z.string().uuid()";
      } else if (f.type === "email") {
        zodType = "z.string().email()";
      } else if (f.type === "url") {
        zodType = "z.string().url()";
      }

      if (f.rules.nullable) {
        zodType += ".nullable()";
      }
      if (f.rules.required === false) {
        zodType += ".optional()";
      }

      body += `${indent}${f.name}: ${zodType},\n`;
    });
    return body;
  };

  return `import { z } from "zod";\n\nexport const ${schemaName} = z.object({\n${renderZodBody(schema)}});`;
}

export function generateJSONSchema(schema: SchemaField[], title = "ApiResponse"): string {
  const renderSchemaProperties = (fields: SchemaField[]): Record<string, any> => {
    const props: Record<string, any> = {};
    fields.forEach((f) => {
      let schemaType: string | string[] = "string";
      if (f.type === "number" || f.type === "integer" || f.type === "float" || f.type === "decimal" || f.type === "timestamp") {
        schemaType = "number";
      } else if (f.type === "boolean") {
        schemaType = "boolean";
      } else if (f.type === "null") {
        schemaType = "null";
      } else if (f.type === "object") {
        schemaType = "object";
      } else if (f.type === "array") {
        schemaType = "array";
      }

      if (f.rules.nullable) {
        schemaType = [schemaType as string, "null"];
      }

      const itemDef: Record<string, any> = {
        type: schemaType,
        description: `Generated ${f.type} data field`
      };

      if (f.type === "object" && f.fields && f.fields.length > 0) {
        itemDef.properties = renderSchemaProperties(f.fields);
        itemDef.required = f.fields.filter(sub => sub.rules.required !== false).map(sub => sub.name);
      } else if (f.type === "array" && f.fields && f.fields.length > 0) {
        itemDef.items = {
          type: "object",
          properties: renderSchemaProperties(f.fields),
          required: f.fields.filter(sub => sub.rules.required !== false).map(sub => sub.name)
        };
      }

      props[f.name] = itemDef;
    });
    return props;
  };

  const jsonSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title,
    type: "object",
    properties: renderSchemaProperties(schema),
    required: schema.filter(f => f.rules.required !== false).map(f => f.name)
  };

  return JSON.stringify(jsonSchema, null, 2);
}

export function generateGraphQL(schema: SchemaField[], typeName = "ResponseItem"): string {
  const mapFieldTypeToGql = (type: FieldType): string => {
    switch (type) {
      case "number":
      case "integer":
      case "timestamp":
        return "Int";
      case "float":
      case "decimal":
        return "Float";
      case "boolean":
        return "Boolean";
      default:
        return "String";
    }
  };

  const renderGraphQLType = (fields: SchemaField[], name: string): { definitions: string; core: string } => {
    let defs = "";
    let body = `type ${name} {\n`;
    
    fields.forEach((f) => {
      const isRequired = f.rules.required !== false ? "!" : "";
      
      if (f.type === "object" && f.fields && f.fields.length > 0) {
        const subName = `${name}_${f.name.charAt(0).toUpperCase() + f.name.slice(1)}`;
        const subRes = renderGraphQLType(f.fields, subName);
        defs += subRes.definitions;
        body += `  ${f.name}: ${subName}${isRequired}\n`;
      } else if (f.type === "array" && f.fields && f.fields.length > 0) {
        const subName = `${name}_${f.name.charAt(0).toUpperCase() + f.name.slice(1)}`;
        const subRes = renderGraphQLType(f.fields, subName);
        defs += subRes.definitions;
        body += `  ${f.name}: [${subName}!]${isRequired}\n`;
      } else {
        const gqlType = mapFieldTypeToGql(f.type);
        body += `  ${f.name}: ${gqlType}${isRequired}\n`;
      }
    });

    body += "}\n\n";
    return { definitions: defs + body, core: name };
  };

  const { definitions } = renderGraphQLType(schema, typeName);

  return `# GraphQL Schema Types\n\n${definitions}`;
}
