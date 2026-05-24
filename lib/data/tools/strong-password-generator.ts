import { ToolConfig } from './types';

export const strongPasswordGeneratorConfig: ToolConfig = {
  slug: "strong-password-generator",
  title: "Strong Password Generator",
  shortDescription: "Generate highly secure, custom passwords and Diceware passphrases instantly. Analyze security strength, check existing passwords offline, estimate crack-times, and enforce enterprise-grade compliance rules.",
  category: "Security / Generators",
  keywords: [
    "strong password generator", "secure password maker", "diceware passphrase generator", "xkcd password creator",
    "password strength checker", "password entropy calculator", "offline credentials generator", "random password tool",
    "custom symbol password generator", "enterprise password policy generator", "api secret key generator"
  ],

  longDescription: `
A **Strong Password Generator** is a fundamental tool for digital security. In an era dominated by automated botnets, credential stuffing lists, and sophisticated hacking clusters, basic passwords like 'password123' or 'johnny99' can be compromised in milliseconds. Creating long, randomized, and highly complex credentials is the single most effective defense for securing personal accounts, servers, database systems, and application environments.

This security utility allows you to generate robust, cryptographically secure passwords and memorable multi-word passphrases. It also includes an offline password checker to evaluate your existing credentials, calculating visual strength metrics, estimated crack-times, and identifying structural weaknesses completely locally.

---

### What Makes a Password Truly Strong?

Historically, security guidelines forced users to compile short passwords with arbitrary rules (e.g., 'at least 8 characters, one capital letter, one number, and one symbol'). However, modern security authorities, such as the National Institute of Standards and Technology (NIST), have revised these standards. The modern consensus focuses on three key attributes:

1. **Length**: Length is the single most critical factor in password complexity. A 16-character password made of lowercase letters is mathematically stronger than an 8-character password featuring mixed cases, numbers, and symbols.
2. **Entropy**: The measure of predictability in a string. Higher entropy means there are no repeating patterns, sequential keys (like 'qwerty' or '12345'), or dictionary words.
3. **Uniqueness**: Never reuse a password. If a breach occurs on one service, credential stuffing bots will automatically test those leaked login details across thousands of other popular websites.

---

### Understanding Password Attacks

Cybercriminals employ automated tools to systematically crack accounts. Understanding these mechanisms helps us design stronger defense parameters:

#### 1. Brute-Force Attacks
An automated program guesses every possible combination of characters in sequence (e.g. \`aaaa\`, \`aaab\`, \`aaac\`). Short passwords (under 10 characters) are cracked almost instantly because the total search space is extremely small.

#### 2. Dictionary Attacks
Dictionary programs feed arrays of common words, phrases, and pre-leaked credentials into login portals. Attackers also use hybrid dictionary mutations, which automatically append numbers or change letters to symbols (like replacing 'S' with '$').

#### 3. Credential Stuffing
Billions of leaked credentials from historical database breaches are compiled into combo lists. Bots systematically feed these lists into major platforms. If a user reused their breached password, the attacker gains access.

---

### The Diceware Passphrase Solution (XKCD Style)

How can humans remember highly secure credentials without writing them down? The **Diceware Passphrase** method solves this problem. Instead of choosing a random string of symbols (like \`8#kL!9zP$x\`), you choose a sequence of random, unrelated dictionary words (such as \`gravity-banana-rocket-sunset-window\`).

#### Why Passphrases Work:
- **High Memory Retention**: The human brain easily visualizes five or six distinct words compared to a random character string.
- **Vast Search Space**: Selecting words from a standard dictionary of 7,776 words provides approximately 12.9 bits of entropy per word. A 5-word passphrase yields $5 \\times 12.9 = 64.5$ bits of entropy, which is secure for standard accounts. A 6-word passphrase yields over 77 bits, which takes decades to crack with modern clusters.

---

### Password Entropy Basics

Entropy is the mathematical measurement of a password's strength. The higher the entropy value (measured in bits), the safer the password is:

#### The Entropy Equation:
$$E = L \\times \\log_2(R)$$

Where:
- $E$ is the entropy in bits.
- $L$ is the string length.
- $R$ is the size of the character pool.

#### Strength Levels:
- **< 28 bits**: **Very Weak**. Vulnerable to instant cracking.
- **28 to 59 bits**: **Weak / Medium**. Vulnerable to offline brute-force attacks.
- **60 to 127 bits**: **Strong**. Safe for general accounts.
- **128+ bits**: **Very Strong / Cryptographic**. mathematically uncrackable.

---

### Absolute Local Execution

Your security is our priority. This Strong Password Generator operates with **absolute local execution**:
- **0% Network Transmission**: All random generation, styling configuration, and password strength checks happen entirely client-side inside your browser sandbox. No passwords are ever sent to our servers or external APIs.
- **CSPRNG Randomness**: The generator uses browser-native \`window.crypto.getRandomValues()\` to pull physical noise from the operating system, ensuring true mathematical randomness.
`,

  features: [
    "CSPRNG Randomness: Uses secure Web Crypto API algorithms for absolute unpredictability.",
    "Dual Modes: Switch between customizable character passwords and XKCD-style Diceware passphrases.",
    "Offline Password Checker: Paste and analyze the strength, entropy, and potential vulnerabilities of any password completely locally.",
    "Comprehensive Entropy Analyzer: Displays real-time entropy bits, character diversity, and estimated crack-times.",
    "Exclude Ambiguous Characters: Exclude confusing symbols (O, 0, I, l, 1) in one click.",
    "Enterprise Preset Rules: Templates for banking, admin, WiFi, and database rules.",
    "Favorites & Caches: Offline localStorage log to save favorite settings and configurations.",
    "Bulk Generator Mode: Create up to 100 strong passwords simultaneously.",
    "Structured Exporters: Download generated lists as TXT, CSV, or JSON array data."
  ],

  useCases: [
    "Generating secure master passwords for credentials managers.",
    "Creating easy-to-remember passphrases for manual entries.",
    "Enforcing strict database, router, or server root access credentials.",
    "Seeding database fields with random secure user passwords for testing.",
    "Checking existing passwords for structural weaknesses or repetition warnings.",
    "Creating unique corporate credentials that satisfy strict security audits."
  ],

  howToSteps: [
    "Select your mode: 'Character Generator', 'Passphrase (Words)', or 'Password Checker'.",
    "For Generator: Use the length slider to set character length, or select a preset to configure character pools.",
    "For Passphrase: Choose the number of words, separator symbol (e.g. hyphen), and casing.",
    "Toggle advanced checks like 'Exclude Ambiguous' or 'Avoid Repeated' to refine rules.",
    "Specify bulk count (e.g. 50 passwords) and click 'Generate Passwords'.",
    "To analyze a password: Type it in the Checker tab to read real-time security warnings.",
    "Click copy to clipboard or download the batch as a TXT, CSV, or JSON file."
  ],

  examples: [
    {
      title: "Secure Server Admin Password",
      description: "A highly complex, long password suited for server root controls.",
      input: "Length: 24, Presets: Admin (Uppercase, Lowercase, Numbers, Symbols)",
      output: "r7#vG$k8!P9_xD4%zM2*tH7n"
    },
    {
      title: "Diceware Passphrase",
      description: "A secure, easy-to-type passphrase composed of random words.",
      input: "Words: 5, Separator: hyphen, Casing: lowercase",
      output: "rocket-banana-gravity-sunset-window"
    },
    {
      title: "Clean WiFi Password Preset",
      description: "Long alphanumeric password omitting similar letters to prevent entry confusion.",
      input: "Length: 16, Presets: WiFi (Exclude similar & ambiguous)",
      output: "tH7nK3wM9pQ4rY6x"
    }
  ],

  faq: [
    {
      question: "What is a strong password?",
      answer: "A strong password is a unique credential of high length (at least 16 characters) with no predictable sequences, repeated keys, or dictionary words."
    },
    {
      question: "Is this password generator secure?",
      answer: "Yes. All random calculations and string generations are performed 100% locally in your browser. No passwords are sent to external servers."
    },
    {
      question: "What is a Diceware passphrase?",
      answer: "Diceware is a method of generating passphrases by randomly choosing words from a standardized wordlist. These are highly secure yet easy for humans to remember."
    },
    {
      question: "What is password entropy?",
      answer: "Entropy measures password unpredictability in bits. Higher entropy means a password is exponentially harder for brute-force tools to guess."
    },
    {
      question: "How does the offline password checker work?",
      answer: "The checker analyzes character diversity, patterns, length, and keyboard walk sequences locally in the browser sandbox, ensuring absolute privacy."
    },
    {
      question: "Why should I avoid Math.random()?",
      answer: "Math.random() is pseudo-random and predictable. For security credentials, we use cryptographically secure random values (CSPRNG)."
    },
    {
      question: "How long should a secure password be?",
      answer: "For standard accounts, at least 14-16 characters is recommended. For critical admin, database, or email accounts, target 20+ characters."
    },
    {
      question: "Can I generate passwords in bulk?",
      answer: "Yes, you can generate up to 100 secure passwords at a time and export them as TXT, CSV, or JSON files."
    },
    {
      question: "What is the benefit of excluding ambiguous characters?",
      answer: "It removes similar characters like O, 0, I, l, and 1, which are easily misread when typing passwords manually."
    },
    {
      question: "Are my passwords stored in history forever?",
      answer: "No, your generated configurations are saved in local storage and can be deleted instantly by clicking the 'Clear History' button."
    }
  ],

  relatedTools: [
    { name: "Advanced Password Generator", slug: "password-generator" },
    { name: "Random String Generator", slug: "random-string-generator" },
    { name: "SHA256 Generator", slug: "sha256-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "UUID Generator", slug: "uuid-generator" },
    { name: "HMAC Generator", slug: "hmac-generator" }
  ]
};
