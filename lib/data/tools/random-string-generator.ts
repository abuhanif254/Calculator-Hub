import { ToolConfig } from './types';

export const randomStringGeneratorConfig: ToolConfig = {
  slug: "random-string-generator",
  title: "Random String Generator",
  shortDescription: "Generate highly customizable, cryptographically secure random strings. Create API keys, session tokens, passwords, database IDs, and coupon codes in bulk. Custom character sets, patterns, and entropy analysis included.",
  category: "Generators",
  keywords: [
    "random string generator", "secure token generator", "api key generator", "diceware generator",
    "alphanumeric string maker", "cryptographic string creator", "session id generator", "coupon code generator",
    "password string generator", "developer naming utilities", "hexadecimal string generator", "base64 string generator",
    "pattern-based string generator", "bulk key generator"
  ],

  longDescription: `
A **Random String Generator** is an essential utility for developers, security analysts, database managers, QA testers, and systems administrators. In modern software engineering, random strings are critical building blocks for authentication keys, API tokens, cryptographic salts, session identifiers, database primary keys, promotional codes, and simulated test data.

This generator produces random sequences of characters customized to your exact constraints. By leveraging browser-native Cryptographically Secure Pseudo-Random Number Generators (CSPRNG), this tool ensures that strings created for security-sensitive use cases (like session tokens or passwords) are mathematically unpredictable and safe from statistical guessing attacks.

---

### Understanding Randomness: PRNG vs CSPRNG

In computing, generating "true" randomness is notoriously difficult because computers are designed to be deterministic—always producing the exact same output for a given set of inputs. To solve this, developers use two primary classes of generators:

#### 1. Pseudo-Random Number Generators (PRNG)
PRNGs use mathematical algorithms (such as the Mersenne Twister or Linear Congruential Generators) to produce sequences of numbers that *appear* random. These algorithms require a starting number called a **seed**. 
* *The Risk*: If an attacker can determine the seed or the internal state of the algorithm (which is often based on the system clock or process ID), they can predict every future string generated. Javascript's standard \`Math.random()\` is a PRNG and should **never** be used to generate passwords, API keys, or security tokens.

#### 2. Cryptographically Secure Pseudo-Random Number Generators (CSPRNG)
CSPRNGs are designed to meet strict security standards. They collect entropy from physical system sources (e.g., keyboard timings, network packets, hardware thermal noise) and process it using cryptographic hash functions or block ciphers.
* *The Security*: A CSPRNG ensures **next-bit unpredictability**—even if an attacker knows the first 1,000 characters generated, they have a 0% statistical advantage in guessing the 1,001st character. Our tool utilizes the browser's native CSPRNG:
$$\`window.crypto.getRandomValues()\`$$

---

### The Mathematics of Entropy

**Entropy** is the measure of uncertainty or unpredictability in a random string. It is measured in **bits**. The higher the entropy, the more difficult it is for a hacker to crack or guess the string using brute-force attacks.

#### The Entropy Equation:
$$E = L \\times \\log_2(R)$$

Where:
* $E$ is the total entropy in bits.
* $L$ is the length of the generated string.
* $R$ is the size of the character pool (base pool size).

#### Character Pool Reference ($R$):
- **Numeric only** (0-9): $R = 10$ (approx. 3.32 bits per character)
- **Hexadecimal** (0-9, a-f): $R = 16$ (approx. 4.0 bits per character)
- **Alphabet-only** (a-z, A-Z): $R = 52$ (approx. 5.70 bits per character)
- **Alphanumeric** (a-z, A-Z, 0-9): $R = 62$ (approx. 5.95 bits per character)
- **Alphanumeric + Common Symbols**: $R = 94$ (approx. 6.55 bits per character)

#### Crack-Time Threat Levels:
- **< 40 bits**: **Low Security**. Can be cracked in seconds via basic computing power.
- **40 - 64 bits**: **Medium Security**. Safe for temporary tokens, but vulnerable to heavy GPU brute-forcing.
- **65 - 127 bits**: **High Security**. Standard for user passwords and API keys. Takes centuries to crack.
- **128+ bits**: **Military/Cryptographic Grade**. Safe from all current brute-force attempts, including theoretical quantum computing attacks.

---

### Application of Random Strings in Modern Tech

#### 1. API Keys and Token Authentication
API keys act as both identification and credentials for programmatic access. They are usually generated as long hexadecimal or base64 strings (typically 32 to 64 characters) to ensure that the search space is too vast to guess.

#### 2. Session IDs and JWT Secrets
When a user logs into a website, the server generates a unique **Session ID** to identify their browser on subsequent requests. If the Session ID is predictable, an attacker can hijack another user's session (Session Hijacking). Session tokens must always be generated using a CSPRNG and have at least 128 bits of entropy.

#### 3. Database Keys (UUID vs NanoID vs Auto-Increment)
Traditionally, database tables used auto-incrementing integers (\`1\`, \`2\`, \`3\`) as primary keys. However, this exposes business metrics (e.g., an attacker can guess the total number of orders by looking at the order ID). 
* **UUID (Universally Unique Identifier)**: 128-bit values represented as 36 characters (e.g., \`f47ac10b-58cc-4372-a567-0e02b2c3d479\`).
* **NanoID**: A smaller, faster, and more customizable alternative to UUID, offering comparable security with a shorter length (typically 21 characters).

#### 4. Coupon Codes and Invite Systems
Promotional systems require unique, easy-to-read codes. These systems require a delicate balance:
* **Excluding Confusing Characters**: Avoid ähnlich-looking letters like \`O\`, \`0\`, \`I\`, \`l\`, and \`1\` to prevent customer support complaints.
* **Capitalization**: Standardizing codes in uppercase makes them easier to read and type manually.

---

### Security Best Practices for Keys & Secrets

1. **Rotate Keys Regularly**: Change sensitive API keys and session secrets periodically to minimize exposure in the event of a silent leak.
2. **Never Commit Secrets to Git**: Use environment configuration files (\`.env\`) and tools like Git Guardian or pre-commit hooks to prevent keys from leaking to public GitHub repositories.
3. **Use Safe Comparison Algorithms**: When validating tokens on your backend, protect against **timing attacks** by comparing tokens using constant-time algorithms (like Node's \`crypto.timingSafeEqual\`) rather than standard string comparisons (\`==\`).
`,

  features: [
    "CSPRNG Randomness: Uses secure Web Crypto API random number algorithms for absolute unpredictability.",
    "Custom Character Pool: Toggle uppercase, lowercase, numbers, and symbols, or input a custom alphabet.",
    "Exclude Ambiguous Characters: Strip confusing letters (0, O, I, l, 1) in one click.",
    "Pattern-Based Generation: Supply custom masks (e.g., DEV-****-####) for structured codes.",
    "Bulk Generator Mode: Create up to 5,000 strings simultaneously with customizable count controls.",
    "Interactive Entropy Meter: Calculates real-time entropy bits, character diversity, and estimated security level.",
    "Preset Configurations: Instant templates for API Tokens, Database Keys, Coupon codes, and JWT Secrets.",
    "Session History & Favorites: Star and save favorite configurations, and log previous session outputs.",
    "Structured Exporters: Download lists of generated strings as TXT, CSV, or JSON array data."
  ],

  useCases: [
    "Developers generating unique API keys, bearer tokens, or server salts for database configurations.",
    "Database administrators seeding large columns with unique identifiers (UUID-like or NanoID-like keys).",
    "Marketers and business operations teams generating batches of promo, discount, or invite codes.",
    "QA engineers creating diverse string payloads to test limits of forms, input filters, and API parsers.",
    "Security specialists compiling random dictionaries for brute-force password strength tests.",
    "Systems operators generating complex random credentials for routers, servers, and automated scripts."
  ],

  howToSteps: [
    "Select your generator format: 'Random Character' or 'Custom Pattern'.",
    "Choose a preset from the dashboard to auto-populate configuration fields (optional).",
    "Set the target string length using the length slider, or input your mask in pattern mode.",
    "Configure character sets by toggling uppercase, lowercase, numbers, symbols, or adding custom sets.",
    "Optionally exclude ambiguous characters (like 0 and O) or avoid repeating characters in the same string.",
    "Specify the number of strings to generate in bulk (e.g., 100 strings).",
    "Click 'Generate Strings' to trigger the engine. The entropy meter updates immediately.",
    "Copy individual strings, copy the list, or export the batch as TXT, CSV, or JSON."
  ],

  examples: [
    {
      title: "Secure API Key String",
      description: "A long, complex alphanumeric string suited for authorization headers.",
      input: "Length: 48, Mode: Random, Character sets: Uppercase, Lowercase, Numbers",
      output: "qA9sK2jH7fG4dD8sS3aA9zX8cC7vB6nM5kL4jH3gF2dD1sS8a"
    },
    {
      title: "Clean Discount Promo Code",
      description: "An uppercase code excluding confusing characters, conforming to a structured mask.",
      input: "Pattern: 'SUMMER-XXXX-2026', Exclude Ambiguous: True",
      output: "SUMMER-KPEW-2026"
    },
    {
      title: "JWT Token Key Preset",
      description: "High-entropy key incorporating symbols for cryptographic signature verify operations.",
      input: "Length: 64, Mode: Random, Characters: All sets (Alphanumeric + Special Symbols)",
      output: "z$k_P9_xD4%zM2*r7#vG$k8!P9_xD4%zM2*r7#vG$k8!P9_xD4%zM2*r7#vG$k8!"
    }
  ],

  faq: [
    {
      question: "What is a random string generator?",
      answer: "A random string generator is a developer tool that creates unpredictable sequences of characters based on length, specific character pools, and formatting parameters."
    },
    {
      question: "Are the generated random strings cryptographically secure?",
      answer: "Yes. Our generator uses the Web Crypto API's cryptographically secure pseudo-random number generator (CSPRNG) via window.crypto.getRandomValues(). This is far more secure than Math.random() and is safe for security tokens."
    },
    {
      question: "Can I generate API keys or tokens with this tool?",
      answer: "Yes, you can configure the character pool and length (such as 32 or 64 characters) to generate secure API tokens, bearer keys, and salts."
    },
    {
      question: "What is entropy in a random string?",
      answer: "Entropy measures the unpredictability of a string. Calculated in bits, it depends on string length and pool size. Higher entropy values indicate stronger resistance against brute-force guessing."
    },
    {
      question: "How do I avoid confusing characters in generated coupon codes?",
      answer: "Enable the 'Exclude Ambiguous Characters' option. This removes similar-looking characters like O, 0, I, l, 1, and 8, which commonly cause readability errors."
    },
    {
      question: "What is pattern-based generation?",
      answer: "Pattern mode lets you define a template using custom placeholders (like X for letters, # for numbers, or * for any char). The generator then fills in those placeholders randomly, keeping the structural layout intact."
    },
    {
      question: "Can I generate random strings in bulk?",
      answer: "Yes, you can generate up to 5,000 strings at a time. The tool handles bulk generations client-side without lagging your browser."
    },
    {
      question: "Is my generated data sent to a server?",
      answer: "No. For maximum security, all generations, configurations, and exports are processed entirely locally inside your browser. No strings are ever transmitted over the network."
    },
    {
      question: "Can I copy the output as a JSON array?",
      answer: "Yes, the export tools allow you to copy the entire batch directly as a JSON array string or comma-separated CSV list."
    },
    {
      question: "What is a secure length for session identifiers?",
      answer: "Session IDs should contain at least 128 bits of entropy. A standard alphanumeric string of 22 characters or more provides over 130 bits of entropy, which is highly secure."
    }
  ],

  relatedTools: [
    { name: "Password Generator", slug: "password-generator" },
    { name: "UUID Generator", slug: "uuid-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "SHA256 Generator", slug: "sha256-generator" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Random Number Generator", slug: "random-number-generator" }
  ]
};
