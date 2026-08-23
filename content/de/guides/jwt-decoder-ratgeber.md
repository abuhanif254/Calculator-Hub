---
title: "JWT (JSON Web Tokens) verstehen: Ein kompletter Leitfaden"
description: "Erfahren Sie, wie JWTs strukturiert sind, wie Sie sie sicher dekodieren und warum Sie niemals sensible Daten darin speichern sollten."
---

# JWT (JSON Web Tokens) verstehen: Ein kompletter Leitfaden

JSON Web Tokens (JWT) sind zum Industriestandard für die Sicherung von APIs geworden. Sie werden jedoch oft falsch verstanden, was zu Sicherheitslücken führt.

In diesem Leitfaden zerlegen wir die Anatomie eines JWT, erklären die Funktionsweise und zeigen Ihnen, wie Sie Ihre Tokens mit unserem [JWT-Decoder-Tool](/de/tools/jwt-decoder) sicher überprüfen.

---

## 🏗️ Die Anatomie eines JWT

Ein JWT ist eine lange Zeichenfolge, die in drei durch Punkte (`.`) getrennte Teile unterteilt ist:

`Header.Payload.Signatur`

### 1. Der Header
Besteht aus zwei Teilen: dem Tokentyp (JWT) und dem Signaturalgorithmus (z.B. HMAC SHA256). Er ist Base64Url-kodiert.

### 2. Der Payload (Nutzdaten)
Enthält die *Claims* (Ansprüche), wie Benutzer-ID, Rolle und Ablaufdatum (`exp`). Ebenfalls Base64Url-kodiert.

### 3. Die Signatur
Wird aus dem kodierten Header, dem kodierten Payload, einem Geheimnis und dem Algorithmus erstellt. Dient zur Überprüfung, ob der Sender der ist, der er vorgibt zu sein.

---

## 🔒 Das größte Missverständnis: Verschlüsselung vs. Kodierung

**Ein Standard-JWT ist NICHT verschlüsselt, es ist nur kodiert.**

Jeder, der ein JWT abfängt, kann es leicht dekodieren, um den Inhalt zu sehen. Die Signatur verhindert, dass das Token *modifiziert* wird, aber sie verbirgt die Daten nicht.

**Goldene Regel:** Speichern Sie NIEMALS sensible Informationen (Passwörter, Kreditkarten) in einem JWT.

---

## ⚙️ So dekodieren Sie ein JWT sicher

Beim Debuggen müssen Entwickler JWTs überprüfen. Das Einfügen von Produktions-Tokens auf einer beliebigen Website ist eine schreckliche Sicherheitspraxis.

Unser **JWT-Decoder** verwendet eine **Zero-Cloud-Architektur**.
* **100% Client-seitig:** Die Dekodierung erfolgt vollständig in Ihrem Browser.
* **Keine Serverprotokolle:** Das Token verlässt niemals Ihr Gerät.

---

## ❓ Häufig gestellte Fragen (FAQ)

### Was passiert, wenn ein JWT abläuft?
Der Payload enthält einen `exp`-Claim. Wenn die aktuelle Zeit diesen überschreitet, lehnt der Server das Token ab.

### Sollte ich JWTs im LocalStorage oder in Cookies speichern?
Für Webanwendungen gilt das Speichern in `HttpOnly`-Cookies im Allgemeinen als sicherer gegen XSS-Angriffe als `localStorage`.
