---
metaTitle: "JWT Decoder & Inspektor | Header, Claims & Ablauf prüfen"
metaDescription: "Dekodieren Sie JSON Web Tokens (RFC 7519) clientseitig im Browser. Prüfen Sie Base64Url-Header, Payload-Claims, Ablaufzeiten und Algorithmen."
metaKeywords: "jwt decoder, json web token dekodieren, rfc 7519 parser, jwt payload prüfen, base64url jwt, jwt signatur algorithmen, oauth2 access token inspektor"
title: "JWT Decoder"
shortDescription: "Analysieren Sie JSON Web Tokens (RFC 7519) clientseitig im Browser: Dekodieren Sie Header und Payload-Claims, prüfen Sie Unix-Ablaufzeiten und decken Sie Algorithmus-Risiken auf."
faqs:
  - question: "Warum lässt sich der Payload eines JWT ohne geheimen Schlüssel auslesen?"
    answer: "Standard-JWTs sind signierte Tokens nach RFC 7515 (JWS), keine verschlüsselten Container. Header und Payload sind lediglich Base64Url-kodiert, um die Übertragung in HTTP-Headern zu ermöglichen. Die kryptografische Signatur schützt ausschließlich vor unbefugter Manipulation (Integrität), nicht vor dem Mitlesen (Vertraulichkeit)."
  - question: "Ist es sicher, ein Produktiv-Token in diesen Online-JWT-Decoder einzufügen?"
    answer: "Unser Decoder führt die Base64Url-Dekodierung und Zeitstempel-Auswertung zu 100 % lokal im Arbeitsspeicher Ihres Browsers aus; es erfolgt keinerlei Netzwerkübertragung. Aus allgemeiner Sicherheitsdisziplin sollten Sie produktive Access-Tokens dennoch niemals in fremde Webdienste kopieren und kurzlebige Tokens verwenden."
  - question: "Was unterscheidet JWS (3 Segmente) von JWE (5 Segmente)?"
    answer: "Ein signiertes JSON Web Signature Token (JWS, RFC 7515) besteht aus drei durch Punkte getrennten Teilen: Header.Payload.Signature. Ein verschlüsseltes JSON Web Encryption Token (JWE, RFC 7516) umfasst fünf Segmente (Protected Header, Encrypted Key, IV, Ciphertext und Authentication Tag), sodass der Inhalt ohne privaten Schlüssel unlesbar bleibt."
  - question: "Wie rechnet das Tool die numerischen Ansprüche exp, nbf und iat um?"
    answer: "Gemäß RFC 7519 sind zeitbasierte Claims als NumericDate definiert – also als ganze Sekunden seit dem 1. Januar 1970 00:00:00 UTC (Unix-Epoche). Der Decoder übersetzt diese Werte automatisch in Ihre lokale Zeitzone sowie UTC und zeigt an, ob das Token bereits abgelaufen oder noch nicht gültig ist."
  - question: "Warum ist der Signaturalgorithmus alg: none ein schweres Sicherheitsrisiko?"
    answer: "Setzt ein Header alg auf none, signalisiert das Token eine fehlende Signatur. Akzeptiert ein Backend diesen Algorithmus ohne strikte Whitelist, kann jeder Angreifer beliebige Rollen oder Benutzer-IDs (etwa sub oder admin: true) in den Payload schreiben und sich ohne Passwort authentifizieren."
features:
  - "Sofortige Base64Url-Dekodierung (RFC 4648 Abschnitt 5) mit sauber formatierter JSON-Darstellung von Header und Payload"
  - "Automatische Auswertung aller registrierten RFC-7519-Claims (iss, sub, aud, exp, nbf, iat, jti) inklusive Echtzeit-Ablaufstatus"
  - "Erkennung symmetrischer und asymmetrischer JWS-Algorithmen (HS256, RS256, PS256, ES256, EdDSA) sowie Warnung bei alg: none"
  - "Prüfung von Key-ID-Metadaten (kid) und Token-Typ (typ, cty) für OAuth-2.0- und OpenID-Connect-Integrationen"
  - "Erkennung typischer Formatfehler wie fehlendes Segment-Trennzeichen, ungültiges UTF-8 oder verwechseltes JWE-Format"
  - "100 % clientseitige Verarbeitung im Browser ohne Server-Logging oder externe API-Aufrufe"
useCases:
  - "Debugging von 401-Unauthorized- und 403-Forbidden-Fehlern in Single-Page-Apps (React, Angular, Vue) und Mobile-Clients"
  - "Prüfung von OAuth-2.0-Scopes, Rollen-Claims und Mandanten-IDs aus Identity-Providern wie Keycloak, Entra ID oder Auth0"
  - "Verifizierung von Token-Laufzeiten (exp/nbf) und Ursachenanalyse bei Clock-Skew-Problemen zwischen Microservices"
  - "Kontrolle der Key-ID (kid) im JOSE-Header während einer laufenden JWKS-Schlüsselrotation"
  - "Sicherheits-Review auf überdimensionierte Payloads, versehentlich gespeicherte PII-Daten oder unsichere Algorithmen"
  - "Schnelle Inspektion benutzerdefinierter Claims aus API-Gateways, Reverse Proxies oder Service-Mesh-Headern"
howToSteps:
  - "Kopieren Sie den vollständigen JWT-String (ohne vorangestelltes 'Bearer ') aus den Browser-DevTools oder API-Logs."
  - "Fügen Sie das aus drei punktgetrennten Segmenten bestehende Token in das Eingabefeld des Decoders ein."
  - "Prüfen Sie im Bereich Header den deklarierten Algorithmus (alg), den Typ (typ) und eine eventuelle Schlüssel-ID (kid)."
  - "Analysieren Sie im Payload-Bereich sowohl die standardisierten RFC-7519-Claims als auch anwendungsspezifische Berechtigungen."
  - "Kontrollieren Sie die automatisch umgerechneten Zeitstempel für iat, nbf und exp auf Ablauf oder künftige Gültigkeit."
  - "Verifizieren Sie bei Bedarf den kryptografischen Signaturabgleich separat gegen Ihr Backend-Secret oder den JWKS-Endpunkt."
---

In zustandslosen Web-Architekturen, Microservice-Landschaften sowie OAuth-2.0- und OpenID-Connect-Flows bilden **JSON Web Tokens (JWT)** das Rückgrat moderner Authentifizierung und Autorisierung. Wenn ein API-Gateway unerwartet mit `401 Unauthorized` antwortet, eine Rolle fehlt oder ein Token Sekunden nach der Ausstellung abläuft, liefert der Blick in die dekodierte Token-Struktur sofortige Klarheit. Der **JWT Decoder** zerlegt signierte Tokens gemäß **RFC 7519** und **RFC 7515** vollständig clientseitig im Browser, übersetzt kryptische Base64Url-Zeichenketten in lesbares JSON und prüft Zeitstempel sowie Algorithmus-Metadaten in Echtzeit.

## Protokoll-Interna: Base64Url, JWS-Struktur und RFC-7519-Claims

Ein klassisches, signiertes JWT (technisch ein **JWS Compact Serialization** nach RFC 7515) besteht aus exakt drei Segmenten, getrennt durch zwei Punkte (`.`):

`BASE64URL(Header) + "." + BASE64URL(Payload) + "." + BASE64URL(Signature)`

Entscheidend ist das Kodierungsverfahren **Base64Url (RFC 4648 Abschnitt 5)**: Gegenüber klassischem Base64 werden die URL-problematischen Zeichen `+` durch `-` und `/` durch `_` ersetzt, während das abschließende Padding (`=`) vollständig entfällt. Dadurch lässt sich das Token ohne zusätzliche Prozentkodierung sicher in HTTP-Headern (`Authorization: Bearer <token>`) oder Query-Parametern transportieren. Einzelne Segmente lassen sich übrigens jederzeit auch isoliert mit unserem [Base64-Decoder](/de/werkzeuge/base64-decode) nachvollziehen.

Der **JOSE-Header** beschreibt, wie das Token kryptografisch zu prüfen ist (`alg`, `typ`, optional `kid` zur Auswahl des passenden Schlüssels aus einem **JWKS**-Endpunkt nach RFC 7517). Der **Payload** transportiert die eigentlichen Aussagen (*Claims*). RFC 7519 Abschnitt 4.1 definiert sieben zentrale registrierte Claims:

- `iss` (*Issuer*): Eindeutige Kennung des Ausstellers (z. B. die OpenID-Discovery-URL).
- `sub` (*Subject*): Stabiler Identifikator des Benutzers oder technischen Clients.
- `aud` (*Audience*): Zielsystem oder API-Bezeichner, für den das Token bestimmt ist.
- `exp` (*Expiration Time*): Ablaufzeitpunkt als Unix-Sekunden (UTC); danach muss das Token abgelehnt werden.
- `nbf` (*Not Before*): Frühester Gültigkeitszeitpunkt, nützlich bei verzögert aktivierten Tokens.
- `iat` (*Issued At*): Ausstellungszeitpunkt zur Altersberechnung und Widerrufsprüfung.
- `jti` (*JWT ID*): Eindeutige Token-ID zur Abwehr von Replay-Angriffen.

Ein dekodierter Beispiel-Token aus einem OpenID-Connect-Login zeigt das typische Zusammenspiel:

```json
// Dekodierter Header (JOSE)
{
  "alg": "ES256",
  "typ": "JWT",
  "kid": "2026-11-prod-ecdsa-key-01"
}

// Dekodierter Payload (Claims)
{
  "iss": "https://auth.example.de/realms/core",
  "sub": "usr_9f83c210-4b7a-4a62",
  "aud": ["billing-api", "orders-api"],
  "scope": "invoices:read invoices:write",
  "iat": 1795420800,
  "nbf": 1795420800,
  "exp": 1795421700,
  "jti": "tok_7e4d12ab91"
}
```

## Vergleich der JWT-Signaturalgorithmen (RFC 7518)

Die Wahl des Signaturverfahrens bestimmt sowohl das Schlüsselmanagement als auch das Sicherheitsniveau verteilter Systeme:

| Algorithmus | Schlüsseltyp | Kryptografie-Verfahren | Typische Stärke & Einsatzgebiet | Sicherheitshinweis |
| :--- | :--- | :--- | :--- | :--- |
| `HS256` / `HS512` | Symmetrisch (Shared Secret) | HMAC mit SHA-256 / SHA-512 | Sehr schnell; interne Monolithen oder eng gekoppelte Dienste | Jeder Prüfer kennt das Secret und kann selbst Tokens fälschen |
| `RS256` | Asymmetrisch (RSA ≥ 2048 Bit) | RSASSA-PKCS1-v1_5 + SHA-256 | Breitester Enterprise-Support in OIDC/SAML-Umgebungen | Größere Signaturen; strenge PKCS#1-Validierung nötig |
| `PS256` | Asymmetrisch (RSA ≥ 2048 Bit) | RSASSA-PSS + SHA-256 | Moderner, probabilistischer Nachfolger von RS256 | Empfohlen gegenüber RS256 bei neuer RSA-Infrastruktur |
| `ES256` | Asymmetrisch (ECDSA P-256) | Elliptische Kurven + SHA-256 | Sehr kompakte Tokens, schnelle Signatur, ideal für APIs | Sicherer Zufallsgenerator (CSPRNG) beim Signieren zwingend |
| `EdDSA` | Asymmetrisch (Ed25519) | Edwards-Curve DSA | Deterministisch, immun gegen Nonce-Fehler, extrem performant | Moderner Standard; Client-Bibliotheken vorab prüfen |
| `none` | Kein Schlüssel | Keine Signatur | **Ausschließlich** interne Tests ohne Vertrauensgrenze | In Produktionssystemen strikt blockieren |

Für die isolierte Prüfung von HMAC-Signaturen oder SHA-Prüfsummen stehen Ihnen ergänzend unser [HMAC-Generator](/de/werkzeuge/hmac-generator) und der [SHA-256-Generator](/de/werkzeuge/sha256-generator) zur Verfügung.

## Schlüsselrotation mit JWKS (RFC 7517), Speicherung und Widerruf

In produktiven Microservice-Architekturen veröffentlichen Identity-Provider wie Keycloak, Microsoft Entra ID oder Auth0 ihre öffentlichen Signierschlüssel über einen standardisierten **JWKS-Endpunkt** (`/.well-known/jwks.json`). Bei einer geplanten Schlüsselrotation signiert der Auth-Server neue Tokens mit einer neuen Schlüsselkennung im Header-Feld `kid`, während der alte öffentliche Schlüssel übergangsweise im JWKS verbleibt, bis sämtliche Alt-Tokens abgelaufen sind. Prüfen Sie bei unerklärlichen `Invalid Signature`-Fehlern zuerst, ob die im Decoder angezeigte `kid` überhaupt im gecachten JWKS Ihres Backends existiert – und nutzen Sie `kid` serverseitig niemals ungefiltert als Dateipfad oder SQL-Parameter, um **Key-ID-Injection** auszuschließen.

Für Browser-Clients gilt zudem eine klare Architekturentscheidung beim Speicherort: Das Ablegen langlebiger Tokens in `localStorage` macht diese über jede XSS-Schwachstelle auslesbar. Sicherer ist das **Backend-for-Frontend-Muster (BFF)** mit `HttpOnly; Secure; SameSite=Lax`-Cookies sowie kurzlebigen Access-Tokens (5 bis 15 Minuten) gepaart mit **Refresh-Token-Rotation** und Wiederverwendungserkennung. Muss eine Sitzung sofort gesperrt werden, ergänzt eine kompakte Redis-Denylist auf Basis des `jti`-Claims den Schutz – oder man weicht für hochsensible Kundenportale auf opake Referenz-Tokens mit **Token Introspection (RFC 7662)** aus.

## Kritische Sicherheitslücken und Praxis-Troubleshooting

Ein reines Dekodieren ersetzt niemals die serverseitige Signaturprüfung. In Sicherheits-Audits tauchen fünf Fehlerklassen besonders häufig auf:

1. **Algorithm Confusion (`RS256` → `HS256`)**: Verlässt sich eine Bibliothek blind auf das `alg`-Feld im ungeprüften Header, kann ein Angreifer den öffentlich zugänglichen RSA-Public-Key als HMAC-Secret verwenden und ein `HS256`-Token selbst signieren. Abhilfe schafft ausschließlich eine fest konfigurierte Algorithmus-Whitelist pro Schlüssel auf dem Server.
2. **Fehlende `aud`- und `iss`-Validierung**: Ohne Prüfung von `aud` lässt sich ein gültiges Access-Token von Dienst A unbefugt bei Dienst B desselben Identity-Providers einlösen (*Token Substitution*).
3. **Vermeintliches `TokenExpiredError` trotz frischem Token**: Weichen Systemuhren zwischen Auth-Server und API-Knoten um wenige Sekunden ab (*Clock Skew*), schlagen `nbf`- und `exp`-Prüfungen fehl. Synchronisieren Sie alle Container-Hosts per NTP und erlauben Sie in der Middleware eine kleine Toleranz (üblich sind 30 bis 60 Sekunden).
4. **Verwechslung von ID-Token und Access-Token**: In OpenID Connect dient das **ID-Token** ausschließlich dem Client zur Authentifizierung des Benutzers, während Backend-APIs konsequent das **Access-Token** inklusive seiner `scope`- und `aud`-Claims verifizieren müssen.
5. **Überladene Payloads und fehlende Vertraulichkeit**: Speichern Sie niemals Passwörter, Kreditkartendaten oder umfangreiche Rechtematrizen im unverschlüsselten JWS-Payload. Große Tokens sprengen das 4-KB-Cookie-Limit und belasten jeden HTTP-Request. Benötigen Sie größere Datenstrukturen zur Offline-Prüfung, formatieren Sie den extrahierten JSON-Payload sauber im [JSON Formatter](/de/werkzeuge/json-formatter) – und greifen Sie bei streng vertraulichen Inhalten auf echtes **JWE (RFC 7516)** zurück.
