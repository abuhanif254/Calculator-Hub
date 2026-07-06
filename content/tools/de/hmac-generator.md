---
metaTitle: "HMAC Generator & Prüfer Online | SHA256, SHA512, MD5"
metaDescription: "Generieren und überprüfen Sie kryptografisch sichere Hash-basierte Message Authentication Codes (HMAC). Unterstützt SHA256, SHA512, SHA1 und MD5 für APIs."
metaKeywords: "hmac generator, hmac sha256 generator, api anfrage signieren, webhook signatur, hmac sha512, hmac verifizierung, hmac schlüssel"
title: "HMAC Generator"
shortDescription: "Generieren und überprüfen Sie kryptografisch sichere HMACs clientseitig für API-Schlüssel, Webhook-Signaturen und Datenintegrität."
faqs:
  - question: "Was ist ein HMAC?"
    answer: "HMAC steht für Hash-based Message Authentication Code. Es handelt sich um eine kryptografische Signatur, die einen geheimen Schlüssel und eine Hash-Funktion (wie SHA-256) kombiniert, um sowohl die Integrität (keine Änderungen) als auch die Authentizität (echter Absender) der Daten zu überprüfen."
  - question: "Werden meine geheimen Schlüssel an Ihren Server gesendet?"
    answer: "Nein, absolut nicht. Alle Berechnungen werden vollständig lokal in Ihrem Browser mit der Web Crypto API durchgeführt. Ihre Nutzdaten und geheimen Schlüssel verlassen niemals Ihr Gerät."
  - question: "Warum sollte ich HMAC anstelle eines normalen Hashes wie SHA-256 verwenden?"
    answer: "Standard-Hashes sind anfällig für 'Length Extension Attacks', bei denen ein Angreifer Daten an eine Nachricht anhängen und einen gültigen Hash generieren kann. Das zweistufige Design von HMAC macht es immun gegen diese Angriffe."
  - question: "Welchen HMAC-Algorithmus sollte ich wählen?"
    answer: "Für die meisten modernen Anwendungen ist HMAC-SHA256 die Standardempfehlung. Verwenden Sie HMAC-SHA512 für maximale Sicherheit und HMAC-MD5 nur für ältere Systeme."
  - question: "Ist HMAC dasselbe wie Verschlüsselung?"
    answer: "Nein. Verschlüsselung (Encryption) verbirgt Daten. HMAC ist eine Einwegfunktion, um zu überprüfen, ob Daten manipuliert wurden. HMAC verbirgt nicht den Nachrichteninhalt."
features:
  - "Sichere clientseitige HMAC-Generierung (Web Crypto API)"
  - "Unterstützung für HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 und HMAC-MD5"
  - "Duale Eingabemodi: Textnachricht oder lokale Datei-Signatur"
  - "Echtzeit-HMAC-Generierung mit sofortigen Aktualisierungen"
  - "Integrierte Prüfsummen-Verifizierung-Engine"
  - "Sicherer Zufallsgenerator für geheime Schlüssel (CSPRNG)"
  - "Vollständige Protokollierung des Sitzungsverlaufs (lokal gespeichert)"
useCases:
  - "Generieren authentischer HMAC-Signaturen für API-Tests"
  - "Simulieren und Überprüfen von Webhook-Signaturen (Stripe, GitHub)"
  - "Berechnen lokaler Dateiprüfsummen mit gemeinsam genutzten Schlüsseln"
  - "Generieren von Signaturen für JWTs (HS256/HS512-Token)"
howToSteps:
  - "Wählen Sie Ihren Eingabemodus: 'Texteingabe' oder 'Datei'."
  - "Wählen Sie den Hash-Algorithmus (z.B. SHA-256)."
  - "Geben Sie Ihre Nachricht ein oder laden Sie eine Datei hoch."
  - "Geben Sie Ihren symmetrischen geheimen Schlüssel ein."
  - "Die HMAC-Signatur wird sofort generiert. Kopieren Sie sie."
  - "Optional: Fügen Sie eine erwartete Signatur unter 'Vergleichen' ein."
---

## Was ist HMAC?

Ein **HMAC** (Hash-based Message Authentication Code) ist eine spezielle Art von Message Authentication Code, der eine kryptografische Hash-Funktion und einen kryptografischen Schlüssel umfasst. Er wird verwendet, um gleichzeitig die **Datenintegrität** und die **Authentizität** einer Nachricht zu überprüfen.

Im Gegensatz zu Standard-Hashes (SHA-256) verwendet ein HMAC einen symmetrischen Schlüssel. Dieser Schlüssel stellt sicher, dass nur Personen, die den geheimen Schlüssel besitzen, die Signatur generieren oder überprüfen können.

---

## Wie HMAC funktioniert: Die Formel

Das einfache Hashen einer mit einem Schlüssel verketteten Nachricht ($Hash(Schlüssel + Nachricht)$) ist anfällig für **Length Extension Attacks**.

HMAC verhindert dies durch Hashen von Schlüssel und Nachricht in einer zweistufigen Struktur:
$$\\text{HMAC}(K, m) = H((K^+ \\oplus \\text{opad}) \\parallel H((K^+ \\oplus \\text{ipad}) \\parallel m))$$

Dieser Mechanismus macht HMAC sehr sicher gegen Erweiterungs- und Kürzungsangriffe.

---

## HMAC vs. Standard-Hashing

| Feature | Standard-Hash (z.B. SHA-256) | HMAC (z.B. HMAC-SHA256) |
| :--- | :--- | :--- |
| **Eingaben** | Nur Nachricht ($m$) | Nachricht ($m$) + Geheimer Schlüssel ($K$) |
| **Zweck** | Integrität überprüfen | Integrität UND Authentizität |
| **Schwachstellen**| Anfällig für Längenerweiterung | Immun |
| **Anwendungsfälle**| Passwörter, Dateien | API-Signaturen, Webhooks, JWT |

---

## Unterstützte Algorithmen

1. **HMAC-SHA256**: Hochsicher. Industriestandard für das Signieren von API-Anfragen und Webhooks (Stripe, GitHub).
2. **HMAC-SHA512**: Extrem sicher. Für maximalen Datenschutz.
3. **HMAC-SHA1**: Veraltet. Dank HMAC-Design sicher, aber nur für alte Systeme (Git).
4. **HMAC-MD5**: Schwach. Nur aus Kompatibilitätsgründen verwenden.

---

## Webentwickler-Anwendungen

### 1. Webhook-Signaturüberprüfung
Wenn ein Drittanbieterdienst (Stripe) einen Webhook an Ihren Server sendet, hasht er ihn mit einem geheimen Schlüssel. Ihr Server berechnet den HMAC mit demselben Schlüssel, um die Echtheit zu überprüfen.

### 2. Signieren von API-Anfragen (AWS-Stil)
Anstatt API-Schlüssel direkt über das Netzwerk zu senden, verwendet AWS HMAC-Signaturen, um zu verhindern, dass die Schlüssel abgefangen werden.

### 3. JSON Web Token (JWT) Signaturen
Bei Verwendung des HS256-Algorithmus wird die JWT-Signatur mit HMAC berechnet. Dies hindert Benutzer daran, ihre Daten (z. B. "Rolle") zu ändern.

---

## Vollständige clientseitige Sicherheit

Unser HMAC-Generator arbeitet **100 % lokal** in Ihrem Browser. Ihre Nutzdaten und geheimen Schlüssel verlassen niemals Ihr Gerät. Es ist völlig sicher und privat.
