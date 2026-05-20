import { ToolConfig } from './types';

export const passwordGeneratorConfig: ToolConfig = {
  slug: "password-generator",
  title: "Advanced Password Generator",
  shortDescription: "Generate cryptographically secure, random passwords and passphrases instantly. Customize character sets, use presets, analyze entropy, and view visual strength metrics completely offline.",
  category: "Encoding & Security",
  keywords: [
    "password generator", "generate secure password", "random password maker", "diceware passphrase generator",
    "strong password creator", "password entropy calculator", "api keys generator", "pronounceable password",
    "wifi password generator", "secure credentials generator", "client-side password generator", "password strength analyzer"
  ],

  longDescription: `
## What is a Strong Password?

A **strong password** is a unique, complex credential designed to resist unauthorized access and automated cracking attempts. Historically, systems enforced simple rules like "at least 8 characters, one number, and one symbol." However, modern cybersecurity standards, such as those published by the National Institute of Standards and Technology (NIST), have shifted the definition. 

Today, a strong password is characterized by:
1. **High Length**: Length is the single most critical factor in password security. A minimum of 16 characters is recommended for general accounts, and 20+ characters for critical credentials.
2. **High Entropy**: True randomness, meaning characters are chosen in an unpredictable sequence from a large pool (alphabet, numbers, special symbols).
3. **Uniqueness**: A strong password is never reused across multiple services. If a single account is breached, a unique password prevents attackers from gaining lateral access to other logins (a common attack known as credential stuffing).

---

## Why Password Security Matters

In the modern digital economy, passwords serve as the primary gateway to our personal identity, financial resources, intellectual property, and private communications. A single compromised credential can lead to devastating consequences:
* **Identity Theft**: Attackers can assume your identity to open credit lines, apply for loans, or commit fraud.
* **Financial Loss**: Access to banking portals or cryptocurrency wallets can result in immediate draining of assets.
* **Corporate Breaches**: In corporate environments, over 80% of data breaches involve weak, default, or stolen passwords. Attackers leverage these credentials to deploy ransomware, exfiltrate sensitive customer data, and disrupt business continuity.

---

## Common Password Attack Methods

Hackers employ sophisticated, automated techniques to exploit weak credentials. Understanding these methods is the first step in defending against them.

### 1. Brute-Force Attacks
A **brute-force attack** involves an automated program checking every possible combination of characters in a sequence (e.g., \`aaaaa\`, \`aaaab\`, \`aaaac\`) until it finds the correct password. While impractical for long, complex passwords, short passwords (under 10 characters) can be cracked in seconds using consumer-grade hardware.

### 2. Dictionary Attacks
Instead of guessing random character combinations, a **dictionary attack** feeds a list of common words, phrases, and leaked passwords into a cracking program. Attackers also use variations called **hybrid dictionary attacks**, which append numbers or symbols to dictionary words (e.g., converting "password" to "P@ssw0rd123").

### 3. Credential Stuffing
When a service is breached, lists of usernames and passwords (often called "combo lists") are leaked onto the dark web. In a **credential stuffing attack**, botnets automatically test these leaked credentials across thousands of other popular websites (e.g., social networks, banking, retail). If a user reused the same password on the breached site as their email or bank, the attacker gains instant access.

### 4. Phishing
**Phishing** is a social engineering technique where attackers trick users into entering their credentials on a fake website that mimics a legitimate service (like a banking login or email provider). No matter how strong your password is, it can be compromised if you voluntarily hand it over to a fraudulent form.

### 5. Keyloggers and Spyware
**Keyloggers** are malicious software installed on a victim's device that record every keystroke pressed. The recorded keys are transmitted back to the hacker, allowing them to capture passwords as they are typed.

---

## Password Entropy Basics

**Password entropy** is a mathematical measurement of a password's unpredictability and strength. It represents the number of guesses an attacker would have to make, in a worst-case scenario, to brute-force the password. Entropy is measured in **bits**.

### The Entropy Formula:
$$E = L \\times \\log_2(R)$$

Where:
* $E$ is the entropy in bits.
* $L$ is the length of the password (number of characters).
* $R$ is the size of the character pool (pool size).

### Character Pool Sizes ($R$):
* Numbers only (0-9): $R = 10$
* Lowercase letters (a-z): $R = 26$
* Alphanumeric (lowercase + uppercase + numbers): $R = 62$
* Full keyboard ASCII symbols: $R = 94$

### What do the Entropy Levels mean?
* **< 28 bits**: **Very Weak**. Can be cracked instantly.
* **28 to 35 bits**: **Weak**. Vulnerable to quick offline brute-force attacks.
* **36 to 59 bits**: **Medium**. Reasonable protection against online cracking, but vulnerable to offline attacks.
* **60 to 127 bits**: **Strong**. Safe for standard user accounts. Takes decades to crack with supercomputers.
* **128+ bits**: **Very Strong / Cryptographic**. Mathematically impossible to crack with current human technology. Suitable for root keys, encryption keys, and master passwords.

---

## How Password Generators Work

Our advanced tool does not use basic random number functions like Javascript's \`Math.random()\`. Standard random functions are **pseudo-random** (PRNGs) and rely on predictable math algorithms. If an attacker knows the seed value or the algorithm's state, they can predict every subsequent number generated. This makes them unsuitable for cryptographic security.

Instead, this tool uses the browser-native **CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)** via the Web Crypto API:
$$\`window.crypto.getRandomValues()\`$$

### Why CSPRNG is Safe:
1. **Entropy Harvesting**: CSPRNG collects entropy from physical noise in the computer hardware (CPU thermal noise, network packets, keystroke timings).
2. **Unpredictability**: It is mathematically impossible for an attacker to determine previous or future generated numbers, even if they know the current state of the generator.
3. **Uniform Distribution**: Every character has an equal probability of selection, eliminating bias or predictable patterns.

---

## Passphrases vs Passwords (The Diceware Method)

A major challenge in security is that humans need to remember passwords, but computers are incredibly fast at cracking them. The **Diceware Method** solves this by generating **passphrases**—strings of random dictionary words rather than random character strings.

### How it Works:
1. A physical die is rolled five times to generate a 5-digit number (e.g., \`2-4-5-1-3\`).
2. This number is matched against a standardized list of 7,776 words. For example, \`24513\` corresponds to the word "gravity".
3. Repeating this process 5 or 6 times yields a passphrase like: \`gravity-banana-rocket-sunset-window\`.

### Why Passphrases are Superior:
* **Memorable**: It is much easier for a human to visualize five random words than to memorize a string like \`7#kL!9zP$x\`.
* **High Entropy**: Each word from a 7,776-word list provides approximately 12.92 bits of entropy ($log_2(7776)$). A 5-word passphrase yields $5 \\times 12.92 = 64.6$ bits of entropy. A 6-word passphrase yields 77.5 bits, which is virtually uncrackable, yet easy to type!

---

## Best Password Practices

1. **Use a Master Password Manager**: You should only need to remember one strong master password. Let a password manager handle the generation, storage, and auto-fill of unique passwords for all your other accounts.
2. **Enable Two-Factor Authentication (2FA)**: Even if an attacker steals your password, 2FA requires a second verification step (like a code from an authenticator app or a hardware security key) to gain access.
3. **Stop Frequent Password Rotations**: Modern NIST guidelines advise *against* forcing users to rotate passwords every 90 days. Forced rotations lead users to make simple, predictable changes (e.g., changing \`PasswordMarch!\` to \`PasswordJune!\`). Only rotate passwords if you suspect a breach.
4. **Never Write Passwords Down**: Do not keep plaintext passwords in sticky notes, notepad files, or unencrypted spreadsheets.

---

## Cybersecurity Tips for Developers

* **Protect API Keys and Secrets**: Never commit plaintext API keys, passwords, or database credentials to version control systems like GitHub. Use environment variables (\`.env\`) and secret vaults.
* **Use Slow Hashing Functions**: When storing passwords in a database, never use fast hash functions like MD5, SHA-1, or SHA-256. Use slow key-derivation functions like **bcrypt**, **Argon2id**, or **PBKDF2**. These functions introduce intentional work factors that make database brute-forcing incredibly slow and expensive for hackers.
* **Enforce Password Length in Forms**: Set robust minimum length requirements on registration forms. Allow users to submit long passphrases—do not set arbitrary maximum limits (like capping passwords at 16 characters).

---

## Complete Client-Side Security

Our Advanced Password Generator tool operates with **absolute local execution**:
* **No Server Submissions**: Your generated passwords and custom character configurations are processed entirely within your local browser sandbox. They are never sent to our servers or any external APIs.
* **Secure QR Codes**: The QR Code generator uses a local Canvas drawing engine to render the QR pattern. Your password never leaves your browser, ensuring no network snooping.
* **Secure History**: The history of generated passwords is saved in your browser's \`localStorage\`. You can wipe it instantly with a single click, and it is never synchronized to cloud servers.
`,

  features: [
    "CSPRNG-driven secure password generation using Web Crypto APIs",
    "Adjustable password length slider supporting up to 128 characters",
    "Full character set customization (uppercase, lowercase, numbers, symbols)",
    "Support for multiple password generations at once (1 to 20 outputs)",
    "Pronounceable password mode generating vowel-consonant syllables",
    "Memorable word-based password generator with custom separators",
    "Diceware-style passphrase generator using a secure English wordlist",
    "Filters to exclude ambiguous symbols and similar-looking characters (1, l, o, 0)",
    "Avoid repeated and sequential characters options for customized compliance",
    "Real-time password analysis displaying entropy bits and visual strength score",
    "Visual crack-time estimation across online and offline hacking clusters",
    "Clean strength breakdown identifying weak patterns, repetitions, and warnings",
    "Built-in local QR code generator for easy mobile WiFi/account scanning",
    "One-click copy, text file exports, and persistent session history log",
    "Fully accessible keyboard controls and instant premium dark-mode graphics"
  ],

  useCases: [
    "Generating highly complex passwords for banking portals and cryptocurrency wallets",
    "Creating memorable passphrases for master passwords in password managers",
    "Generating bulk random credentials for database seeding or system administration",
    "Creating safe, clean WiFi passwords without similar letters to prevent typing confusion",
    "Creating random API keys, bearer tokens, or salt keys for developer applications",
    "Testing password compliance limits against custom enterprise character restrictions"
  ],

  howToSteps: [
    "Select your generator mode: 'Random', 'Memorable', or 'Passphrase'.",
    "Adjust the password length slider (or word count slider) to your target size.",
    "Toggle character sets or select presets (e.g. WiFi, Banking, Developer) to auto-configure settings.",
    "Refine advanced settings such as 'Exclude Similar', 'Avoid Repeats', or add custom symbols.",
    "Set the 'Generate Multiple' count if you need to create passwords in bulk.",
    "Click 'Regenerate' to trigger a new random batch. The strength indicators update in real-time.",
    "Click the copy icon to copy a password, or click the QR code icon to scan it on your phone.",
    "Export your session's generated lists to a text file for backup, or clear history when done."
  ],

  examples: [
    {
      title: "Strong Developer Preset",
      description: "A highly complex, long password with symbols and numbers suited for root keys.",
      input: "Length: 20, Presets: Developer",
      output: "r7#vG$k8!P9_xD4%zM2*"
    },
    {
      title: "Clean WiFi Password",
      description: "Long alphanumeric password excluding ambiguous or similar characters for painless manual entry.",
      input: "Length: 16, Presets: WiFi (Exclude similar & ambiguous)",
      output: "tH7nK3wM9pQ4rY6x"
    },
    {
      title: "Diceware Passphrase",
      description: "A secure, memorable passphrase using dictionary words joined by hyphens.",
      input: "Words: 5, Mode: Passphrase, Separator: hyphen",
      output: "rocket-banana-gravity-sunset-window"
    }
  ],

  faq: [
    {
      question: "Is this password generator secure?",
      answer: "Yes, absolutely. The generator runs 100% client-side inside your browser sandbox. It utilizes browser-native, cryptographically secure random values (CSPRNG) which are unpredictable. Your passwords are never transmitted over the internet."
    },
    {
      question: "What is the difference between a password and a passphrase?",
      answer: "A password is a string of random characters, numbers, and symbols (e.g., 'k#8$Lm9!'). A passphrase is a sequence of random words (e.g., 'rocket-banana-gravity'). Passphrases are much easier for humans to remember while providing equal or greater security due to the size of the dictionary pool."
    },
    {
      question: "What is password entropy?",
      answer: "Password entropy is a mathematical measure of a password's strength based on its length and the size of the character pool. It represents the difficulty of cracking the password by guessing. Higher entropy means a safer credential."
    },
    {
      question: "Why should I avoid Math.random() for security?",
      answer: "Math.random() uses pseudo-random number algorithms which are predictable. If an attacker can determine the internal state of the program, they can guess all subsequent generated passwords. Cryptographically secure random generators (CSPRNG) utilize system noise to ensure absolute unpredictability."
    },
    {
      question: "What is a Diceware passphrase?",
      answer: "Diceware is a method for creating passphrases using physical dice rolls to select words from a pre-made wordlist. Our passphrase generator simulates this process using secure computer algorithms to choose highly unpredictable words."
    },
    {
      question: "Are my passwords stored in history forever?",
      answer: "No. Your generated history is stored locally in your browser's localStorage. It is never uploaded or shared. You can delete it at any time by clicking the 'Clear History' button."
    },
    {
      question: "Can I use the QR code to scan a password into my phone?",
      answer: "Yes. Clicking the QR Code icon displays a dynamically drawn QR code of the password. You can scan this using your phone's camera or a password manager app to transfer the password instantly without typing."
    }
  ],

  relatedTools: [
    { name: "HMAC Generator", slug: "hmac-generator" },
    { name: "SHA256 Generator", slug: "sha256-generator" },
    { name: "MD5 Generator", slug: "md5-generator" },
    { name: "Hash Generator", slug: "hash-generator" },
    { name: "JWT Decoder", slug: "jwt-decoder" },
    { name: "Base64 Encode", slug: "base64-encode" },
    { name: "Base64 Decode", slug: "base64-decode" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "URL Decoder", slug: "url-decoder" }
  ]
};
