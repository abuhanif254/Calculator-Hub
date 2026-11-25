---
metaTitle: "HMAC-Generator & Prüfer Online | SHA-256, SHA-512 & MD5"
metaDescription: "Erstellen und prüfen Sie HMAC-Signaturen (SHA-256, SHA-512, SHA-1, MD5) lokal per Web Crypto API – für Webhooks, API-Requests, JWT und Dateien."
metaKeywords: "hmac generator, hmac sha256 online, hmac prüfer, webhook signatur prüfen, hmac sha512, api authentifizierung, rfc 2104, message authentication code"
title: "HMAC Generator"
shortDescription: "Berechnen und verifizieren Sie kryptografisch sichere Hash-based Message Authentication Codes (HMAC) für Texte und lokale Dateien direkt im Browser. Unterstützt HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 und HMAC-MD5 ohne Serverübertragung."
faqs:
  - question: "Warum schützt HMAC im Gegensatz zu reinem SHA-256 vor Length-Extension-Angriffen?"
    answer: "Hashfunktionen nach dem Merkle-Damgård-Prinzip wie SHA-256 oder SHA-512 erlauben es Angreifern, bei einer naiven Konstruktion H(Schlüssel || Nachricht) weitere Daten anzuhängen und ohne Kenntnis des Schlüssels einen gültigen Hash zu berechnen. HMAC schachtelt zwei unabhängige Hash-Durchläufe mit unterschiedlichem Schlüssel-Padding (ipad und opad), wodurch der innere Zustand vollständig versiegelt bleibt."
  - question: "Welcher HMAC-Algorithmus eignet sich für Webhooks, REST-APIs und JWT-Signaturen?"
    answer: "Für moderne Webhooks (etwa Stripe, GitHub oder Shopify), AWS-Signaturverfahren und JWTs (HS256) ist HMAC-SHA256 der etablierte Industriestandard. Für besonders hohe Sicherheitsmargen empfiehlt sich HMAC-SHA512 (HS512), während HMAC-SHA1 und HMAC-MD5 ausschließlich aus Gründen der Abwärtskompatibilität zu Legacy-Systemen eingesetzt werden sollten."
  - question: "Wie verarbeitet der HMAC-Generator große Dateien lokal im Browser ohne Server-Upload?"
    answer: "Dateien bis 20 MB werden für SHA-256, SHA-512 und SHA-1 direkt über die hardwarebeschleunigte SubtleCrypto-Schnittstelle des Browsers signiert. Bei größeren Dateien oder bei HMAC-MD5 wechselt das Werkzeug automatisch auf ein progressives 2-MB-Chunk-Streaming, sodass der Arbeitsspeicher geschont wird und kein einziges Byte Ihr Gerät verlässt."
  - question: "Warum muss der Signaturvergleich auf dem Server in konstanter Zeit (Timing-Safe) erfolgen?"
    answer: "Ein normaler Zeichenkettenvergleich mit === bricht beim ersten abweichenden Byte ab. Über statistische Laufzeitmessungen über viele Anfragen hinweg könnten Angreifer eine gültige Signatur Byte für Byte rekonstruieren. Serverseitige Endpunkte sollten daher stets Konstantzeit-Funktionen wie crypto.timingSafeEqual() in Node.js oder hmac.compare_digest() in Python verwenden."
  - question: "Ist ein HMAC-Wert umkehrbar oder verschlüsselt er die übertragenen Nutzdaten?"
    answer: "Nein. HMAC ist keine Verschlüsselung, sondern ein kryptografischer Nachrichten-Authentifizierungscode (MAC). Er verbirgt den Klartext der Nachricht nicht, beweist dem Empfänger mit demselben geheimen Schlüssel jedoch zuverlässig, dass die Daten unverändert (Integrität) und vom berechtigten Absender (Authentizität) stammen."
features:
  - "Native clientseitige Signaturberechnung über SubtleCrypto (crypto.subtle.sign) für HMAC-SHA256, HMAC-SHA512 und HMAC-SHA1"
  - "Unterstützung für Legacy-HMAC-MD5 sowie automatisches 2-MB-Chunk-Streaming für große Dateien über 20 MB ohne Browser-Blockade"
  - "Dualer Eingabemodus für UTF-8-Textnachrichten (JSON-Payloads, Query-Strings) und lokale Binärdateien per Drag-and-Drop mit Fortschrittsanzeige"
  - "Integrierter CSPRNG-Schlüsselgenerator für kryptografisch sichere 256-Bit-Zufallsschlüssel (Hex) samt Maskierungsfunktion für Geheimnisse"
  - "Echtzeit-Verifizierung zum direkten Abgleich der erzeugten Signatur mit einer erwarteten Referenz-Prüfsumme inklusive Groß-/Kleinschreibung"
  - "Praxisfertige Entwickler-Codebeispiele (Webhooks, AWS SigV4, JWT, Express) und lokal gespeicherter Sitzungsverlauf der letzten zehn Vorgänge"
useCases:
  - "Nachstellung, Debugging und Verifizierung von Stripe-, GitHub-, Shopify- und Slack-Webhook-Signaturen in der Backend-Entwicklung"
  - "Testen signierter REST-API-Anfragen und mehrstufiger Schlüsselableitungen nach dem AWS-Signature-V4-Protokoll"
  - "Überprüfung der symmetrischen Signaturkomponente von JSON Web Tokens (JWT mit HS256 und HS512) während der Authentifizierungsanalyse"
  - "Authentifizierte Integritätsprüfung lokaler Build-Artefakte, Firmware-Pakete und Konfigurationsdateien mit vorab geteiltem Geheimnis"
  - "Fehlersuche bei Kodierungs- und Zeilenumbruch-Diskrepanzen (LF vs. CRLF, UTF-8-BOM) beim Signieren roher HTTP-Request-Bodies"
  - "Erzeugung und Validierung symmetrischer Shared Secrets für interne Microservice-Kommunikation in Staging- und CI/CD-Pipelines"
howToSteps:
  - "Wählen Sie den Eingabemodus 'Texteingabe' für JSON-Bodies und Zeichenketten oder wechseln Sie auf 'Datei' für lokale Binär- und Konfigurationsdateien."
  - "Legen Sie den gewünschten Hash-Algorithmus fest – standardmäßig HMAC-SHA256, oder alternativ HMAC-SHA512, HMAC-SHA1 bzw. HMAC-MD5."
  - "Geben Sie Ihren symmetrischen geheimen Schlüssel ein oder erzeugen Sie per Generator-Button sofort einen kryptografisch zufälligen 32-Byte-Hex-Schlüssel."
  - "Fügen Sie die zu signierende Nachricht ein oder ziehen Sie eine Datei in den Upload-Bereich; die HMAC-Signatur erscheint automatisch in Echtzeit."
  - "Stellen Sie bei Bedarf Groß- oder Kleinschreibung der Hex-Ausgabe ein und kopieren Sie das Ergebnis per Ein-Klick-Schaltfläche in die Zwischenablage."
  - "Fügen Sie optional eine empfangene Referenzsignatur in das Vergleichsfeld ein, um sofort auf exakte Übereinstimmung zu prüfen."
---

Ein **HMAC** (*Hash-based Message Authentication Code*) kombiniert eine kryptografische Hashfunktion mit einem geheimen symmetrischen Schlüssel, um gleichzeitig die **Integrität** und die **Authentizität** einer Nachricht oder Datei nachzuweisen. Während ein einfacher Hash wie SHA-256 lediglich zufällige Übertragungsfehler aufdeckt – ein Angreifer könnte Nachricht und Prüfsumme gemeinsam austauschen –, stellt HMAC sicher, dass nur Parteien im Besitz des geheimen Schlüssels eine gültige Signatur erzeugen oder verifizieren können. Dieser **HMAC-Generator** berechnet und prüft Signaturen für `HMAC-SHA256`, `HMAC-SHA512`, `HMAC-SHA1` und `HMAC-MD5` vollständig lokal im Browser über die Web Crypto API, ohne sensible Schlüssel oder Nutzdaten über das Netzwerk zu senden.

## Aufbau nach RFC 2104 und Schutz vor Length-Extension-Angriffen

Eine naheliegende, aber kryptografisch fehlerhafte Idee wäre es, Schlüssel und Nachricht einfach aneinanderzuhängen und einmal zu hashen: `H(K || m)`. Bei klassischen Hashfunktionen auf Basis der **Merkle-Damgård-Konstruktion** – dazu zählen MD5, SHA-1, SHA-256 und SHA-512 – entspricht der finale Digest direkt dem internen Kompressionszustand nach dem letzten Nachrichtenblock. Kennt ein Angreifer `H(K || m)` und die Länge von `K`, kann er das standardmäßige Bit-Padding rekonstruieren, beliebige eigene Daten `m'` anhängen und den gültigen Hash `H(K || m || padding || m')` berechnen, ohne jemals den Schlüssel `K` gesehen zu haben. Dieser **Length-Extension-Angriff** kompromittiert API-Signaturen und Session-Cookies vollständig.

Die Spezifikation **RFC 2104** (sowie **FIPS 198-1**) eliminiert diese Schwachstelle durch eine zweistufige, verschachtelte Hash-Struktur:

```text
HMAC(K, m) = H((K₀ ⊕ opad) || H((K₀ ⊕ ipad) || m))
```

Dabei spielen die Blockgröße `B` der zugrunde liegenden Hashfunktion (64 Byte bei SHA-256, SHA-1 und MD5; 128 Byte bei SHA-512) und die Schlüsselnormalisierung `K₀` eine zentrale Rolle:

1. **Schlüsselnormalisierung (`K₀`)**: Ist der Schlüssel `K` länger als die Blockgröße `B`, wird er zunächst einmalig gehasht (`K₀ = H(K)`) und danach mit Null-Bytes (`0x00`) auf `B` Bytes aufgefüllt. Ist `K` kürzer als `B`, erfolgt direkt das Zero-Padding auf exakt `B` Bytes.
2. **Inneres und äußeres Padding (`ipad` / `opad`)**: `K₀` wird bitweise per XOR (`⊕`) mit zwei fest definierten Konstanten verknüpft: dem *Inner Pad* `ipad` (`0x36` wiederholt `B`-mal) und dem *Outer Pad* `opad` (`0x5c` wiederholt `B`-mal).
3. **Zweistufiges Hashing**: Zuerst berechnet der Algorithmus den inneren Hash über `(K₀ ⊕ ipad) || m`. Erst dessen Ausgabe wird zusammen mit `(K₀ ⊕ opad)` im äußeren Durchlauf gehasht. Weil der innere Zustand nicht mehr nach außen tritt, laufen Längenerweiterungsangriffe vollständig ins Leere.

Für die Praxis empfiehlt RFC 2104 eine Schlüssellänge, die mindestens der Ausgabelänge `L` der Hashfunktion entspricht – also mindestens **32 Byte (256 Bit)** für `HMAC-SHA256` und **64 Byte (512 Bit)** für `HMAC-SHA512`. Kürzere Schlüssel reduzieren die effektive Sicherheit, während extrem lange Schlüssel oberhalb der Blockgröße keinen zusätzlichen Entropiegewinn mehr liefern.

## Algorithmen im technischen Vergleich

Bemerkenswert aus kryptografischer Sicht: Sicherheitsbeweise (Bellare 2006) zeigen, dass HMAC nicht zwingend eine kollisionsresistente Hashfunktion voraussetzt, sondern lediglich eine Pseudozufallsfunktion (PRF) der Kompressionsstufe. Deshalb gelten selbst `HMAC-MD5` und `HMAC-SHA1` in der Praxis als deutlich widerstandsfähiger als reine MD5- oder SHA-1-Hashes. Dennoch schreiben aktuelle Richtlinien wie **BSI TR-02102-1** und **NIST SP 800-107** für alle Neuentwicklungen mindestens `HMAC-SHA256` vor.

| Algorithmus | Blockgröße `B` | Ausgabelänge | Browser-Engine | Sicherheitsstatus & typische Protokolle |
| :--- | :--- | :--- | :--- | :--- |
| **HMAC-SHA256** | 64 Byte (512 Bit) | 256 Bit (64 Hex-Zeichen) | Native Web Crypto (`SubtleCrypto`) | Empfohlener Standard: Stripe-/GitHub-Webhooks, AWS SigV4, JWT (`HS256`) |
| **HMAC-SHA512** | 128 Byte (1024 Bit) | 512 Bit (128 Hex-Zeichen) | Native Web Crypto (`SubtleCrypto`) | Sehr hohe Sicherheitsmarge: JWT (`HS512`), PBKDF2, HKDF, 64-Bit-CPUs |
| **HMAC-SHA1** | 64 Byte (512 Bit) | 160 Bit (40 Hex-Zeichen) | Native Web Crypto (`SubtleCrypto`) | Veraltet für Neusysteme; verbreitet in TOTP (RFC 6238), OAuth 1.0a, Legacy-APIs |
| **HMAC-MD5** | 64 Byte (512 Bit) | 128 Bit (32 Hex-Zeichen) | Progressives CryptoJS-Streaming | Nur für Altsysteme (z. B. CRAM-MD5, ältere DNS-TSIG-Konfigurationen) |

## Webhook-Verifizierung, Rohdaten-Fallen und Timing-Angriffe

Beim Einbinden von Webhooks (Stripe, GitHub, Shopify, PayPal) treten in der Praxis zwei klassische Implementierungsfehler auf, die sich mit diesem Tool schnell eingrenzen lassen:

### Roh-Payload statt neu serialisiertem JSON

Viele Web-Frameworks parsen eingehende HTTP-Bodies automatisch als JSON-Objekt. Berechnet das Backend den HMAC anschließend über `JSON.stringify(req.body)`, schlägt die Prüfung fast immer fehl: Schon ein abweichendes Leerzeichen, eine geänderte Schlüsselreihenfolge, ein UTF-8-BOM oder ein `CRLF`- statt `LF`-Zeilenumbruch erzeugt eine komplett andere Signatur. Maßgeblich für die Signaturberechnung ist stets der unveränderte **Raw Request Buffer** (`Buffer` / `Uint8Array`).

### Konstantzeit-Vergleich gegen Side-Channel-Leaks

Ebenso kritisch ist der Vergleich der berechneten Signatur mit dem HTTP-Header des Absenders. Ein gewöhnlicher String-Vergleich (`===`) terminiert beim ersten nicht übereinstimmenden Zeichen und gibt über statistisch messbare Laufzeitunterschiede schrittweise Informationen preis. Serverseitiger Produktionscode muss deshalb zwingend einen Konstantzeit-Vergleich einsetzen:

```javascript
import crypto from "node:crypto";

export function verifyWebhookSignature(rawBodyBuffer, receivedHex, secret) {
  const expectedHex = crypto
    .createHmac("sha256", secret)
    .update(rawBodyBuffer)
    .digest("hex");

  const expectedBuf = Buffer.from(expectedHex, "hex");
  const receivedBuf = Buffer.from(receivedHex, "hex");

  // Längenprüfung verhindert Ausnahmen in timingSafeEqual
  if (expectedBuf.length !== receivedBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, receivedBuf);
}
```

Für schnelle Quervergleiche im Terminal oder in CI-Skripten lässt sich dieselbe Signatur direkt mit OpenSSL gegenprüfen:

```bash
printf '%s' '{"event":"invoice.paid","id":"evt_9182"}' | openssl dgst -sha256 -hmac "mein_geheimer_schluessel"
```

## Browser-Architektur für Dateien und verwandte Werkzeuge

Der Generator kombiniert zwei lokale Verarbeitungsstufen: UTF-8-Texte sowie lokale Dateien bis **20 MB** laufen für SHA-256, SHA-512 und SHA-1 über `window.crypto.subtle.importKey()` und `window.crypto.subtle.sign()` direkt auf nativen, häufig hardwarebeschleunigten Krypto-Routinen (SHA-NI). Bei größeren Dateien über 20 MB oder beim Legacy-Verfahren `HMAC-MD5` liest der Browser die Datei stückweise in **2-MB-Chunks** ein und aktualisiert den HMAC-Zustand inkrementell, sodass der Arbeitsspeicher konstant bleibt und die Oberfläche reaktionsfähig bleibt. Ergänzend zu diesem Werkzeug unterstützen der [SHA-256-Generator](/de/werkzeuge/sha256-generator) und der [Hash-Generator](/de/werkzeuge/hash-generator) ungeschlüsselte Prüfsummen, der [JWT-Decoder](/de/werkzeuge/jwt-decoder) die Token-Analyse, der [Passwort-Generator](/de/werkzeuge/password-generator) die Schlüsselerzeugung und der [Base64-Encoder](/de/werkzeuge/base64-encode) das Umwandeln von Binärsignaturen für HTTP-Header.
