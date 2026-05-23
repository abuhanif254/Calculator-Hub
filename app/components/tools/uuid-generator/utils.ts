import { v1 as uuidv1, v4 as uuidv4, v6 as uuidv6, v7 as uuidv7, validate } from 'uuid';

export type UuidVersion = 'v1' | 'v4' | 'v6' | 'v7';

export interface FormatOptions {
  uppercase: boolean;
  removeHyphens: boolean;
  addBraces: boolean;
  addQuotes: boolean;
}

export function generateUuid(version: UuidVersion): string {
  switch (version) {
    case 'v1': return uuidv1();
    case 'v4': return uuidv4();
    case 'v6': return uuidv6();
    case 'v7': return uuidv7();
    default: return uuidv4();
  }
}

export function formatUuid(uuid: string, options: FormatOptions): string {
  let result = uuid;
  
  if (options.removeHyphens) {
    result = result.replace(/-/g, '');
  }
  
  if (options.uppercase) {
    result = result.toUpperCase();
  }
  
  if (options.addBraces) {
    result = `{${result}}`;
  }
  
  if (options.addQuotes) {
    result = `"${result}"`;
  }
  
  return result;
}

export function generateBulkUuids(version: UuidVersion, count: number, options: FormatOptions): string[] {
  // Prevent excessive bulk generation that could freeze the browser
  const safeCount = Math.min(Math.max(1, count), 10000);
  const uuids: string[] = [];
  
  for (let i = 0; i < safeCount; i++) {
    uuids.push(formatUuid(generateUuid(version), options));
  }
  
  return uuids;
}

export function validateUuid(input: string): boolean {
  // Remove possible wrappers for validation
  let cleanInput = input.trim();
  cleanInput = cleanInput.replace(/^\{|\}$/g, '');
  cleanInput = cleanInput.replace(/^"|"$/g, '');
  
  // Re-add hyphens if they are missing (validate expects standard format)
  // uuid package's validate() strictly expects hyphens
  if (cleanInput.length === 32 && !cleanInput.includes('-')) {
    cleanInput = `${cleanInput.slice(0, 8)}-${cleanInput.slice(8, 12)}-${cleanInput.slice(12, 16)}-${cleanInput.slice(16, 20)}-${cleanInput.slice(20)}`;
  }

  return validate(cleanInput);
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Failed to copy", err);
    return false;
  }
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateSnippets = (version: UuidVersion) => {
  const snippets: Record<string, { label: string; code: string; language: string }> = {
    javascript: {
      label: "JavaScript / TypeScript",
      language: "javascript",
      code: `// Using standard crypto API (v4 only)
const uuid = crypto.randomUUID();

// Using the 'uuid' npm package
import { ${version} as uuid${version} } from 'uuid';
const myUuid = uuid${version}();`
    },
    nodejs: {
      label: "Node.js (Native)",
      language: "javascript",
      code: `const crypto = require('crypto');
// Node 15.6.0+ native v4 generation
const uuid = crypto.randomUUID();`
    },
    python: {
      label: "Python",
      language: "python",
      code: `import uuid

# Generate a UUID ${version === 'v4' ? 'v4' : (version === 'v1' ? 'v1' : 'v4')}
my_uuid = uuid.uuid${version === 'v4' ? '4' : (version === 'v1' ? '1' : '4')}()
print(str(my_uuid))`
    },
    java: {
      label: "Java",
      language: "java",
      code: `import java.util.UUID;

// Native Java UUID (v4)
UUID myUuid = UUID.randomUUID();
System.out.println(myUuid.toString());`
    },
    csharp: {
      label: "C# / .NET",
      language: "csharp",
      code: `using System;

// Generate a new GUID
Guid myGuid = Guid.NewGuid();
Console.WriteLine(myGuid.ToString());`
    },
    postgresql: {
      label: "PostgreSQL",
      language: "sql",
      code: `-- Ensure the pgcrypto extension is installed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Generate v4 UUID
SELECT gen_random_uuid();

-- Using as default in a table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL
);`
    }
  };

  return snippets;
};
