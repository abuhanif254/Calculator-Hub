---
metaTitle: "JWT Decoder Online | JSON Web Token Parser"
metaDescription: "Erweiterter JSON Web Token (JWT) Decoder. Analysieren Sie Header, Payload-Claims, Ablaufdaten und verifizieren Sie Signaturalgorithmen sofort."
metaKeywords: "jwt decoder, jwt dekodieren, json web token parser, jwt analysator, jwt inspektor, jwt online analysieren, jwt payload"
title: "JWT Decoder"
shortDescription: "Erweiterter JSON Web Token (JWT) Decoder. Analysieren Sie Header, Claims und Ablaufdaten sofort."
faqs:
  - question: "Was ist ein JWT?"
    answer: "Ein JSON Web Token (JWT) ist ein Standard (RFC 7519), der eine kompakte und in sich geschlossene Methode zur sicheren Übertragung von Informationen zwischen Parteien als JSON-Objekt definiert. Es wird häufig zur Autorisierung verwendet."
  - question: "Ist es sicher, ein JWT online zu dekodieren?"
    answer: "Ja, unser JWT-Decoder-Tool wird vollständig lokal in Ihrem Browser ausgeführt. Es werden niemals Daten an unsere Server gesendet, sodass die Überprüfung sensibler Token zu 100 % sicher ist."
  - question: "Warum kann jeder den JWT-Payload lesen?"
    answer: "JWTs sind nur Base64Url-codiert, nicht verschlüsselt. Sie sollen die Datenintegrität (durch die Signatur) gewährleisten, nicht die Datenvertraulichkeit. Sensible Daten sollten niemals in einem unverschlüsselten Standard-JWT gespeichert werden."
  - question: "Was passiert, wenn ein Token abgelaufen ist?"
    answer: "Wenn ein Server ein JWT verifiziert, überprüft er den Anspruch 'exp' (Ablauf). Wenn die aktuelle Zeit nach der Ablaufzeit liegt, lehnt der Server das Token mit einem 401-Fehler ab."
  - question: "Was ist der 'none'-Algorithmus?"
    answer: "Der 'none'-Algorithmus bedeutet, dass das Token nicht signiert ist. Dies ist extrem gefährlich, da es jedem ermöglicht, den Payload zu ändern. Sichere Systeme sollten Token mit dem 'none'-Algorithmus immer ablehnen."
features:
  - "Sofortige Echtzeitanalyse von JWT-Header und -Payload"
  - "Automatische Base64Url-Dekodierung und JSON-Syntaxhervorhebung"
  - "Detaillierte Zeitleistenanalyse für die Ansprüche exp, iat und nbf"
  - "Visuelle Statusanzeigen für Token-Ablauf und Gültigkeit"
  - "Algorithmus-Erkennung (HS256, RS256, ES256, etc.)"
  - "Sicherheitsanalyse für den 'none'-Algorithmus"
  - "100 % clientseitige lokale Ausführung: Ihre Token verlassen niemals den Browser"
useCases:
  - "Fehlerbehebung bei Authentifizierungsflüssen in Single-Page-Apps (React, Angular, Vue)"
  - "Überprüfen von Berechtigungen, die von OAuth 2.0 oder OpenID Connect erteilt wurden"
  - "Überprüfen der Ablaufdaten von Token, die vom Backend ausgestellt wurden"
  - "Untersuchung von 'Invalid Signature'-Fehlern bei der API-Integration"
  - "Inspektion benutzerdefinierter privater Claims, die von Middleware eingefügt wurden"
howToSteps:
  - "Suchen Sie Ihre JWT-Zeichenfolge. Sie sollte aus drei durch Punkte getrennten Textblöcken bestehen."
  - "Fügen Sie das gesamte Token in das Eingabefeld ein."
  - "Das Tool analysiert und dekodiert das Token sofort."
  - "Überprüfen Sie den Abschnitt 'Header' auf Tokentyp und Algorithmus."
  - "Untersuchen Sie den Abschnitt 'Payload', um eingebettete Benutzerdaten anzuzeigen."
  - "Überprüfen Sie das Fenster 'Expiration' auf menschenlesbare Ablaufdaten."
---

## Was ist ein JWT?

Ein **JSON Web Token (JWT)** ist ein offener Standard (RFC 7519), der eine kompakte und in sich geschlossene Methode zur sicheren Übertragung von Informationen zwischen Parteien als JSON-Objekt definiert. Diese Informationen können verifiziert und vertrauenswürdig sein, da sie digital signiert sind (HMAC, RSA oder ECDSA).

JWTs werden in modernen Webanwendungen, insbesondere in Single-Page-Anwendungen (SPAs) und zustandslosen Architekturen, stark für **Authentifizierung** und **Informationsaustausch** verwendet.

---

## JWT-Struktur

Ein JSON Web Token besteht aus drei durch Punkte (`.`) getrennten Teilen:

1. **Header (Kopfzeile)**: Enthält Metadaten über den Tokentyp und die kryptografischen Algorithmen.
2. **Payload (Claims/Ansprüche)**: Enthält die Aussagen über eine Entität (normalerweise den Benutzer) und zusätzliche Daten.
3. **Signature (Signatur)**: Wird verwendet, um die Integrität des Tokens zu überprüfen.

Zusammengesetzt sehen diese drei Teile typischerweise so aus: `xxxxx.yyyyy.zzzzz`

### 1. Der Header

Der Header besteht normalerweise aus zwei Teilen: dem Tokentyp (JWT) und dem verwendeten Signaturalgorithmus, z. B. HMAC SHA256. Dieses JSON wird dann **Base64Url**-codiert, um den ersten Teil des JWT zu bilden.

### 2. Der Payload

Der zweite Teil des Tokens ist der Payload, der die Ansprüche (Claims) enthält. Es gibt drei Arten von Ansprüchen:

**Registrierte Ansprüche**: Dies sind vordefinierte Ansprüche, die nicht zwingend, aber empfohlen sind:
- `iss` (Aussteller): Wer das Token ausgestellt hat.
- `exp` (Ablaufzeit): Wann das Token abläuft.
- `sub` (Betreff): Auf wen sich das Token bezieht.
- `iat` (Ausgestellt am): Wann das Token erstellt wurde.

Der Payload wird **Base64Url**-codiert, um den zweiten Teil zu bilden.

*Beachten Sie, dass diese Informationen von jedem gelesen werden können. Legen Sie keine geheimen Informationen im Payload ab.*

### 3. Die Signatur

Um den Signaturteil zu erstellen, müssen Sie den codierten Header, den codierten Payload, ein Geheimnis und den angegebenen Algorithmus zusammen signieren.

---

## JWT-Sicherheits Best Practices

- **Überprüfen Sie immer die Signatur**: Stellen Sie sicher, dass Ihre Anwendung die Signatur des Tokens serverseitig validiert.
- **Speichern Sie keine sensiblen Daten**: Der Payload ist nur Base64Url-codiert, nicht verschlüsselt.
- **Kurze Lebensdauer**: Verwenden Sie den Anspruch `exp`, um die Lebensdauer eines Tokens zu begrenzen (z. B. 15 Minuten).
- **Verwenden Sie Refresh Tokens**: Verwenden Sie für langlebige Sitzungen kurzlebige Zugriffstoken (JWTs) gepaart mit langlebigen Refresh Tokens.
- **Starke Algorithmen**: Lassen Sie den Algorithmus `none` nicht zu.

---

## JWT-Ablauf und Zeitstempel

JWT verwendet die Unix-Epochenzeit (Sekunden seit dem 1. Januar 1970) für seine zeitbasierten Ansprüche. Unser JWT-Decoder analysiert diese numerischen Werte automatisch in lesbare lokale Daten und zeigt deutlich an, ob ein Token aktiv oder abgelaufen ist.
