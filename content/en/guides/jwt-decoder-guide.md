---
title: "Understanding JWT (JSON Web Tokens): A Complete Guide"
description: "Learn how JWTs are structured, how to decode them safely, and why you should never store sensitive data in the payload."
---

# Understanding JWT (JSON Web Tokens): A Complete Guide

JSON Web Tokens (JWTs) have become the industry standard for securing APIs and authenticating users in modern web applications. However, they are frequently misunderstood by new developers, leading to critical security flaws.

In this guide, we will break down the anatomy of a JWT, explain how it works under the hood, and show you how to inspect your tokens using our secure [JWT Decoder Tool](/en/tools/jwt-decoder).

---

## 🏗️ The Anatomy of a JWT

A JWT is a long string that looks like gibberish. However, if you look closely, you will see it is divided into three distinct parts, separated by periods (`.`):

`Header.Payload.Signature`

### 1. The Header
The header typically consists of two parts: the type of the token (which is JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.
This JSON is then **Base64Url encoded** to form the first part of the JWT.

### 2. The Payload (Claims)
The payload contains the *claims*. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.
* *Example Data:* User ID, email, role (admin/user), and expiration time (`exp`).
This JSON is also Base64Url encoded to form the second part of the JWT.

### 3. The Signature
To create the signature part, you take the encoded header, the encoded payload, a secret, and the algorithm specified in the header, and sign that. 
The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

---

## 🔒 The Biggest JWT Misconception: Encryption vs. Encoding

The most dangerous mistake developers make is assuming that a JWT is *encrypted*. 

**A standard JWT is NOT encrypted; it is only encoded.**

Anyone who intercepts a JWT can easily Base64-decode the Header and the Payload to see exactly what is inside. The Signature prevents them from *modifying* the token (because they don't have the server's secret key to generate a new valid signature), but it does not hide the data.

**Golden Rule:** NEVER put sensitive information like passwords, credit card numbers, or internal system secrets inside a JWT payload.

---

## ⚙️ How to Decode a JWT Safely

When debugging authentication issues, developers often need to inspect the contents of a JWT to check if the user ID is correct or if the token has expired.

While there are many online decoders, pasting your production JWTs into a random website is a terrible security practice. If that website logs your token, they can impersonate your user until the token expires.

Our **JWT Decoder** uses a **Zero-Cloud Architecture**. 
* **100% Client-Side:** The decoding happens entirely within your browser using JavaScript.
* **No Server Logs:** The token never leaves your device, guaranteeing your session remains secure.

---

## ❓ Frequently Asked Questions (FAQ)

### What happens when a JWT expires?
The payload contains an `exp` (expiration) claim, which is a numeric timestamp. When the server receives the token, it checks this timestamp. If the current time is past the `exp` time, the server rejects the token, and the user must re-authenticate (often using a refresh token).

### Can I invalidate or revoke a JWT?
Because JWTs are stateless (the server doesn't keep a database of active tokens), you cannot easily revoke a single JWT before it expires. The most common workaround is to keep token lifetimes very short (e.g., 15 minutes) and rely on a stateful "refresh token" to get new ones.

### Should I store JWTs in LocalStorage or Cookies?
For web applications, storing JWTs in `HttpOnly` cookies is generally considered more secure against Cross-Site Scripting (XSS) attacks than storing them in `localStorage`.
