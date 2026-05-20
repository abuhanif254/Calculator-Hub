import { ToolConfig } from './types';

export const jwtDecoderConfig: ToolConfig = {
  slug: "jwt-decoder",
  title: "JWT Decoder Tool",
  shortDescription: "Advanced JSON Web Token (JWT) decoder. Parse headers, payload claims, analyze expiration dates, and verify signature algorithms instantly.",
  category: "Encoding & Security",
  keywords: [
    "jwt decoder", "decode jwt", "json web token parser", "jwt analyzer",
    "jwt expiration checker", "parse jwt online", "jwt payload viewer",
    "jwt signature algorithm", "jwt debugger", "jwt token reader",
    "base64url decode jwt", "jwt security analysis", "check jwt valid"
  ],

  longDescription: `
## What is a JWT?

**JSON Web Token (JWT)** is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

JWTs are heavily used in modern web applications, particularly in single-page applications (SPAs) and stateless architectures, for **authentication** and **information exchange**.

---

## JWT Structure

A JSON Web Token consists of three parts separated by dots (\`.\`):

1. **Header**: Contains metadata about the type of token and the cryptographic algorithms used to secure its contents.
2. **Payload (Claims)**: Contains the statements (claims) about an entity (typically, the user) and additional data.
3. **Signature**: Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

When combined, these three parts typically look like this: \`xxxxx.yyyyy.zzzzz\`

### 1. The Header

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.

Example Header JSON:
\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`
This JSON is then **Base64Url** encoded to form the first part of the JWT.

### 2. The Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

**Registered claims**: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are:
- \`iss\` (Issuer): Who issued the token.
- \`exp\` (Expiration time): When the token expires.
- \`sub\` (Subject): Whom the token refers to.
- \`aud\` (Audience): Who the token is intended for.
- \`iat\` (Issued at): When the token was created.
- \`nbf\` (Not before): When the token becomes valid.

**Public claims**: These can be defined at will by those using JWTs. But to avoid collisions, they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision-resistant namespace.

**Private claims**: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.

Example Payload JSON:
\`\`\`json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "exp": 1735689600
}
\`\`\`
The payload is then **Base64Url** encoded to form the second part of the JWT.

*Note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted.*

### 3. The Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

For example, if you want to use the HMAC SHA256 algorithm, the signature will be created in this way:
\`\`\`javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
\`\`\`
The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

---

## How JWT Authentication Works

1. **User Login**: The user provides credentials (e.g., username and password) to the authentication server.
2. **Token Generation**: If the credentials are valid, the server creates a JWT, signs it with a secret key, and sends it back to the client.
3. **Token Storage**: The client stores the JWT (usually in \`localStorage\`, \`sessionStorage\`, or an \`HttpOnly\` cookie).
4. **Subsequent Requests**: For every subsequent API request to a protected route, the client includes the JWT in the \`Authorization\` header using the Bearer schema: \`Authorization: Bearer <token>\`.
5. **Token Verification**: The server intercepts the request, verifies the JWT's signature and expiration. If valid, it grants access to the requested resources.

---

## JWT Security Best Practices

When implementing JWTs, consider the following security best practices:

- **Always Verify the Signature**: Ensure your application validates the token's signature on the server-side before trusting the payload.
- **Do Not Store Sensitive Data**: The payload is only Base64Url encoded, not encrypted. Anyone who intercepts the token can read it. Never store passwords, Social Security numbers, or API keys in a JWT payload.
- **Keep Tokens Short-Lived**: Use the \`exp\` claim to limit a token's lifespan. Short expiration times (e.g., 15 minutes) minimize the window of opportunity if a token is compromised.
- **Use Refresh Tokens**: For long-lasting sessions, use short-lived access tokens (JWTs) paired with long-lived refresh tokens (opaque strings).
- **Enforce Strong Algorithms**: Do not allow the \`none\` algorithm. Use strong algorithms like \`RS256\` (asymmetric) or \`HS256\` (symmetric with a strong, long secret key).
- **Validate \`iss\` and \`aud\` Claims**: Ensure the token was issued by your trusted server and is intended for the specific application consuming it.

---

## Common JWT Algorithms

Our tool detects the signing algorithm specified in the header. The most common algorithms are:

- **HS256 (HMAC with SHA-256)**: Symmetric algorithm. Both the issuer and verifier share the same secret key.
- **RS256 (RSA Signature with SHA-256)**: Asymmetric algorithm. The issuer uses a private key to sign the token, and the verifier uses a public key to verify it.
- **ES256 (ECDSA using P-256 and SHA-256)**: Asymmetric algorithm similar to RSA but faster and uses smaller keys.

---

## JWT Expiration and Timestamps

JWT uses Unix epoch time (the number of seconds that have elapsed since January 1, 1970) for its time-based claims:

- **\`exp\` (Expiration Time)**: The time after which the token must not be accepted.
- **\`iat\` (Issued At)**: The time at which the token was issued.
- **\`nbf\` (Not Before)**: The time before which the token must not be accepted.

Our JWT Decoder automatically parses these numeric values into human-readable local dates and clearly indicates if a token is currently active, expired, or not yet valid.
  `,

  features: [
    "Instant real-time parsing of JWT Header and Payload",
    "Automatic Base64Url decoding and JSON syntax highlighting",
    "Detailed timeline analysis for exp, iat, and nbf claims",
    "Visual status indicators for token expiration and validity",
    "Algorithm detection (HS256, RS256, ES256, etc.)",
    "Security analysis for 'none' algorithm and missing expirations",
    "Structure analysis displaying segment sizes and boundaries",
    "One-click copy and download functionalities for headers, payloads, and tokens",
    "100% secure client-side execution—your tokens never leave the browser"
  ],

  useCases: [
    "Debugging authentication flows in frontend single-page applications (React, Angular, Vue)",
    "Inspecting claims granted by an OAuth 2.0 or OpenID Connect identity provider",
    "Verifying that backend services are issuing tokens with the correct expiration dates",
    "Investigating 'Token Expired' or 'Invalid Signature' errors during API integration",
    "Learning and teaching how JSON Web Tokens are structured and encoded",
    "Checking custom private claims injected by backend authorization middleware"
  ],

  howToSteps: [
    "Locate your JWT string. It should look like three blocks of random text separated by dots.",
    "Paste the entire token into the 'Encoded JWT' input area.",
    "The tool will instantly parse and decode the token without hitting any servers.",
    "Review the 'Header' section to see the token type and cryptographic algorithm.",
    "Inspect the 'Payload' section to view the claims and user data embedded in the token.",
    "Check the 'Expiration & Timeline' panel to see human-readable dates for when the token was issued and when it expires.",
    "Use the copy buttons to extract specific JSON blocks or the entire token."
  ],

  examples: [
    {
      title: "Standard User Authentication JWT",
      description: "A common token containing user ID, roles, and standard timestamps.",
      input: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImV4cCI6MjUzNDA1MDAwMCwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      output: 'Header: { "alg": "HS256", "typ": "JWT" }\nPayload: { "sub": "1234567890", "name": "John Doe", "admin": true, "exp": 2534050000, "iat": 1516239022 }'
    }
  ],

  faq: [
    {
      question: "What is a JWT?",
      answer: "A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. It is commonly used for authorization and information exchange."
    },
    {
      question: "Is it safe to decode a JWT online?",
      answer: "Yes, our JWT Decoder tool runs entirely locally in your browser. No data is ever sent to our servers, making it 100% safe to inspect sensitive tokens."
    },
    {
      question: "Can I edit the JWT and use it?",
      answer: "You can edit the payload, but doing so changes the data and invalidates the cryptographic signature. Unless you also have the secret key to re-sign the token, the modified token will be rejected by the server."
    },
    {
      question: "Why can anyone read the JWT payload?",
      answer: "JWTs are only Base64 encoded, not encrypted. They are designed to guarantee data integrity (via the signature), not data confidentiality. Sensitive data should not be stored in a standard JWT."
    },
    {
      question: "What happens if a token is expired?",
      answer: "When a server verifies a JWT, it checks the 'exp' (expiration) claim. If the current time is past the expiration time, the server will reject the token with a 401 Unauthorized or similar error."
    },
    {
      question: "What is the 'none' algorithm?",
      answer: "The 'none' algorithm means the token is not signed. This is extremely dangerous as it allows anyone to modify the payload. Secure systems should always reject tokens using the 'none' algorithm."
    },
    {
      question: "What does 'Base64Url encoded' mean?",
      answer: "It is a variation of standard Base64 encoding made safe for URLs and filenames. It omits padding '=' characters and uses '-' and '_' instead of '+' and '/'."
    },
    {
      question: "How do I verify the signature?",
      answer: "To verify a signature, you need the original secret key (for symmetric algorithms like HS256) or the public key (for asymmetric algorithms like RS256). Since our tool operates purely client-side without access to your backend secrets, it decodes the payload but cannot mathematically verify the signature's authenticity."
    },
    {
      question: "What is the difference between JWT and sessions?",
      answer: "Sessions are stateful and store user data on the server, while the client just holds a session ID in a cookie. JWTs are stateless; the token itself contains all the necessary user data and is verified via cryptography without needing a database lookup on the server."
    },
    {
      question: "How do I check JWT expiration?",
      answer: "A standard JWT contains an 'exp' claim in its payload, representing the expiration time as a Unix timestamp. You can use our tool to instantly parse this timestamp and see the exact local time when the token expires."
    }
  ],

  relatedTools: [
    { name: "Base64 Encode Tool", slug: "base64-encode" },
    { name: "Base64 Decode Tool", slug: "base64-decode" },
    { name: "JSON Formatter", slug: "json-formatter" },
    { name: "URL Encoder", slug: "url-encoder" },
    { name: "URL Decoder", slug: "url-decoder" },
    { name: "Hash Generator", slug: "hash-generator" }
  ]
};
