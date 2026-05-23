// Fake User Data Generator Utilities

export type LocaleType = 'US' | 'UK' | 'CA' | 'DE' | 'FR' | 'ES' | 'IN' | 'BD' | 'Random';
export type ExportFormat = 'JSON' | 'CSV' | 'SQL_Postgres' | 'SQL_MySQL' | 'XML' | 'YAML';

export interface FakeUserOptions {
  amount: number;
  locale: LocaleType;
  fields: {
    id: boolean;
    fullName: boolean;
    username: boolean;
    email: boolean;
    password: boolean;
    phone: boolean;
    dob: boolean;
    gender: boolean;
    address: boolean;
    country: boolean;
    city: boolean;
    zipCode: boolean;
    company: boolean;
    jobTitle: boolean;
    website: boolean;
    bio: boolean;
    avatar: boolean;
  };
  passwordOptions: {
    length: number;
    includeSymbols: boolean;
    includeNumbers: boolean;
  };
  seed?: string;
}

export interface FakeUser {
  [key: string]: string | number | undefined;
}

// Custom simple PRNG (Mulberry32) for seed-based deterministic generation
export class PRNG {
  private state: number;

  constructor(seed: number) {
    this.state = seed;
  }

  next(): number {
    this.state |= 0;
    this.state = this.state + 0x6D2B79F5 | 0;
    let t = Math.imul(this.state ^ this.state >>> 15, 1 | this.state);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Dictionaries
const names = {
  US: { first: ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"], last: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"] },
  UK: { first: ["Oliver", "Olivia", "George", "Amelia", "Harry", "Isla", "Noah", "Ava", "Jack", "Emily", "Charlie", "Isabella", "Leo", "Mia", "Jacob", "Poppy", "Freddie", "Ella", "Alf", "Lily"], last: ["Smith", "Jones", "Taylor", "Williams", "Brown", "Davies", "Evans", "Wilson", "Thomas", "Roberts", "Johnson", "Lewis", "Walker", "Robinson", "Wood"] },
  CA: { first: ["Liam", "Olivia", "Jackson", "Emma", "Noah", "Charlotte", "Lucas", "Amelia", "Oliver", "Ava", "William", "Chloe", "Benjamin", "Lily", "Theodore", "Harper", "Jack", "Sophia", "Levi", "Isabella"], last: ["Smith", "Brown", "Tremblay", "Martin", "Roy", "Wilson", "MacDonald", "Gagnon", "Johnson", "Taylor", "Cote", "Campbell", "Anderson", "Leblanc", "Lee"] },
  DE: { first: ["Maximilian", "Marie", "Alexander", "Sophie", "Paul", "Maria", "Elias", "Sophia", "Ben", "Emilia", "Noah", "Emma", "Leon", "Hannah", "Louis", "Anna", "Jonas", "Mia", "Felix", "Lea"], last: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Schäfer", "Koch", "Bauer", "Richter", "Klein"] },
  FR: { first: ["Gabriel", "Jade", "Léo", "Louise", "Raphaël", "Emma", "Arthur", "Ambre", "Louis", "Alice", "Jules", "Alba", "Adam", "Rose", "Maël", "Anna", "Lucas", "Mia", "Hugo", "Lina"], last: ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefebvre", "Leroy", "Roux"] },
  ES: { first: ["Hugo", "Lucía", "Mateo", "Martina", "Martín", "Sofía", "Lucas", "María", "Leo", "Julia", "Daniel", "Valeria", "Alejandro", "Paula", "Pablo", "Emma", "Manuel", "Daniela", "Álvaro", "Carla"], last: ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno"] },
  IN: { first: ["Aarav", "Aanya", "Vihaan", "Diya", "Advik", "Ananya", "Reyansh", "Prisha", "Kabir", "Riya", "Atharva", "Aarohi", "Aryan", "Sara", "Ishaan", "Avni", "Shaurya", "Kavya", "Arjun", "Aditi"], last: ["Sharma", "Verma", "Gupta", "Malhotra", "Bhatia", "Rao", "Patel", "Reddy", "Singh", "Yadav", "Kumar", "Mishra", "Das", "Bose", "Jain"] },
  BD: { first: ["Arafat", "Fatima", "Rahman", "Ayesha", "Habib", "Nusrat", "Tariq", "Sadia", "Imran", "Farhana", "Tanvir", "Saima", "Rakib", "Maliha", "Mahmud", "Sultana", "Hasan", "Sumaiya", "Kamrul", "Nadia"], last: ["Islam", "Ahmed", "Hossain", "Chowdhury", "Khan", "Rahman", "Ali", "Das", "Mia", "Uddin", "Akter", "Begum", "Khatun", "Molla", "Sikder"] },
};

const domains = ["example.com", "mock-domain.net", "test-email.org", "demo-site.io", "fake-mail.co"];
const cities = {
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
  UK: ["London", "Birmingham", "Manchester", "Glasgow", "Newcastle", "Sheffield", "Leeds", "Bristol", "Liverpool", "Edinburgh"],
  CA: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Quebec City", "Hamilton", "Winnipeg", "Halifax"],
  DE: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"],
  FR: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
  ES: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao"],
  IN: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur"],
  BD: ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Comilla", "Narayanganj", "Gazipur"]
};

const countries = {
  US: "United States", UK: "United Kingdom", CA: "Canada", DE: "Germany", 
  FR: "France", ES: "Spain", IN: "India", BD: "Bangladesh"
};

const companySuffixes = ["Inc.", "LLC", "Group", "Solutions", "Technologies", "Global", "Systems", "Consulting", "Partners", "Digital"];
const jobTitles = ["Software Engineer", "Product Manager", "Data Scientist", "Marketing Specialist", "Sales Representative", "HR Manager", "UX Designer", "DevOps Engineer", "Financial Analyst", "Operations Director", "CTO", "CEO", "Accountant", "Customer Success Agent", "Business Analyst"];
const bios = [
  "Passionate about technology and innovation.", "Coffee enthusiast and code writer.",
  "Building the future of digital products.", "Loves traveling, hiking, and open source.",
  "Always learning, always growing.", "Expert in turning coffee into code.",
  "Helping businesses scale through data.", "Design thinker and problem solver.",
  "Minimalist. Tech geek. Explorer.", "Focused on delivering high-quality solutions."
];

// Helper methods
const randArr = (arr: any[], prng: PRNG) => arr[Math.floor(prng.next() * arr.length)];
const randInt = (min: number, max: number, prng: PRNG) => Math.floor(prng.next() * (max - min + 1)) + min;

function generateString(length: number, prng: PRNG, useSymbols = false, useNumbers = true) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(prng.next() * chars.length));
  }
  return result;
}

function generatePhoneNumber(locale: LocaleType, prng: PRNG): string {
  if (locale === 'US' || locale === 'CA') return `+1-${randInt(200,999,prng)}-${randInt(200,999,prng)}-${randInt(1000,9999,prng)}`;
  if (locale === 'UK') return `+44-7${randInt(100,999,prng)}-${randInt(100000,999999,prng)}`;
  if (locale === 'DE') return `+49-15${randInt(1,9,prng)}-${randInt(1000000,9999999,prng)}`;
  if (locale === 'FR') return `+33-6-${randInt(10,99,prng)}-${randInt(10,99,prng)}-${randInt(10,99,prng)}-${randInt(10,99,prng)}`;
  if (locale === 'ES') return `+34-6${randInt(10,99,prng)}-${randInt(100,999,prng)}-${randInt(100,999,prng)}`;
  if (locale === 'IN') return `+91-9${randInt(100000000,999999999,prng)}`;
  if (locale === 'BD') return `+880-1${randInt(3,9,prng)}-${randInt(10000000,99999999,prng)}`;
  return `+${randInt(1,99,prng)}-${randInt(1000000000,9999999999,prng)}`;
}

function generateZipCode(locale: LocaleType, prng: PRNG): string {
  if (locale === 'US') return `${randInt(10000,99999,prng)}`;
  if (locale === 'UK') return `${generateString(2,prng,false,false).toUpperCase()}${randInt(1,9,prng)} ${randInt(1,9,prng)}${generateString(2,prng,false,false).toUpperCase()}`;
  if (locale === 'CA') return `${generateString(1,prng,false,false).toUpperCase()}${randInt(0,9,prng)}${generateString(1,prng,false,false).toUpperCase()} ${randInt(0,9,prng)}${generateString(1,prng,false,false).toUpperCase()}${randInt(0,9,prng)}`;
  if (locale === 'DE' || locale === 'FR' || locale === 'ES') return `${randInt(10000,99999,prng)}`;
  if (locale === 'IN') return `${randInt(100000,999999,prng)}`;
  if (locale === 'BD') return `${randInt(1000,9999,prng)}`;
  return `${randInt(10000,99999,prng)}`;
}

export function generateFakeUsers(options: FakeUserOptions): FakeUser[] {
  // Use user seed string to create a numeric seed, or use Math.random() fallback
  let numericSeed = Math.random() * 1000000;
  if (options.seed && options.seed.trim() !== '') {
    numericSeed = 0;
    for (let i = 0; i < options.seed.length; i++) {
      numericSeed = ((numericSeed << 5) - numericSeed) + options.seed.charCodeAt(i);
      numericSeed |= 0;
    }
  }

  const prng = new PRNG(numericSeed);
  const users: FakeUser[] = [];

  for (let i = 0; i < options.amount; i++) {
    const user: FakeUser = {};
    const loc = (options.locale === 'Random' ? randArr(['US', 'UK', 'CA', 'DE', 'FR', 'ES', 'IN', 'BD'], prng) : options.locale) as keyof typeof names;
    
    const firstName = randArr(names[loc].first, prng);
    const lastName = randArr(names[loc].last, prng);
    const gender = prng.next() > 0.5 ? 'Male' : 'Female';

    if (options.fields.id) user.id = generateString(12, prng, false, true).toLowerCase();
    if (options.fields.fullName) user.fullName = `${firstName} ${lastName}`;
    if (options.fields.username) user.username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${randInt(1, 999, prng)}`;
    if (options.fields.email) user.email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randArr(domains, prng)}`;
    if (options.fields.password) user.password = generateString(options.passwordOptions.length, prng, options.passwordOptions.includeSymbols, options.passwordOptions.includeNumbers);
    if (options.fields.phone) user.phone = generatePhoneNumber(loc, prng);
    
    if (options.fields.dob) {
      const year = randInt(1960, 2005, prng);
      const month = randInt(1, 12, prng).toString().padStart(2, '0');
      const day = randInt(1, 28, prng).toString().padStart(2, '0');
      user.dob = `${year}-${month}-${day}`;
    }
    
    if (options.fields.gender) user.gender = gender;
    
    if (options.fields.address) user.address = `${randInt(1, 9999, prng)} ${randArr(names['US'].last, prng)} St.`;
    if (options.fields.country) user.country = countries[loc];
    if (options.fields.city) user.city = randArr(cities[loc], prng);
    if (options.fields.zipCode) user.zipCode = generateZipCode(loc, prng);
    
    if (options.fields.company) user.company = `${randArr(names['US'].last, prng)} ${randArr(companySuffixes, prng)}`;
    if (options.fields.jobTitle) user.jobTitle = randArr(jobTitles, prng);
    
    if (options.fields.website) user.website = `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.example.com`;
    if (options.fields.bio) user.bio = randArr(bios, prng);
    
    if (options.fields.avatar) {
      // Use ui-avatars as a placeholder avatar generator with initial letters
      user.avatar = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&size=128`;
    }

    users.push(user);
  }

  return users;
}

// Export Formatters
export function formatData(users: FakeUser[], format: ExportFormat): string {
  if (users.length === 0) return "";

  switch (format) {
    case 'JSON':
      return JSON.stringify(users, null, 2);
      
    case 'CSV': {
      const headers = Object.keys(users[0]);
      let csv = headers.join(',') + '\n';
      users.forEach(u => {
        csv += headers.map(h => {
          let val = String(u[h] || '');
          if (val.includes(',') || val.includes('"') || val.includes('\n')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',') + '\n';
      });
      return csv;
    }
      
    case 'SQL_Postgres':
    case 'SQL_MySQL': {
      const isPostgres = format === 'SQL_Postgres';
      const tableName = 'users';
      const headers = Object.keys(users[0]);
      
      const escapeSql = (val: any) => {
        if (val === null || val === undefined) return 'NULL';
        if (typeof val === 'number') return val.toString();
        // Escape single quotes
        return `'${String(val).replace(/'/g, "''")}'`;
      };

      let sql = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES\n`;
      const rows = users.map(u => {
        const values = headers.map(h => escapeSql(u[h]));
        return `  (${values.join(', ')})`;
      });
      
      sql += rows.join(',\n') + ';';
      return sql;
    }

    case 'XML': {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';
      users.forEach(u => {
        xml += '  <user>\n';
        Object.entries(u).forEach(([k, v]) => {
          // Escape XML special chars
          let val = String(v)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
          xml += `    <${k}>${val}</${k}>\n`;
        });
        xml += '  </user>\n';
      });
      xml += '</users>';
      return xml;
    }

    case 'YAML': {
      let yaml = '';
      users.forEach((u) => {
        yaml += '- ';
        let first = true;
        Object.entries(u).forEach(([k, v]) => {
          let val = String(v);
          if (val.includes(':') || val.includes('\n') || val.includes('"') || val.includes("'") || val.includes('#')) {
             val = `"${val.replace(/"/g, '\\"')}"`;
          }
          if (first) {
            yaml += `${k}: ${val}\n`;
            first = false;
          } else {
            yaml += `  ${k}: ${val}\n`;
          }
        });
      });
      return yaml;
    }
    
    default:
      return JSON.stringify(users, null, 2);
  }
}

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
