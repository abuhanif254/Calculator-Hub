---
title: "JWT (JSON Web Tokens) verstehen: Ein kompletter Leitfaden"
description: "Erfahren Sie, wie JSON Web Tokens nach RFC 7519 aufgebaut sind, wie Signaturprüfung und Base64Url-Dekodierung funktionieren und welche Sicherheitsregeln beim Token-Handling gelten."
category: "Productivity & Utilities"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "jwt-decoder"
relatedType: "tool"
faqs:
  - question: "Worin liegt der Unterschied zwischen Base64Url-Kodierung und echter Verschlüsselung bei einem JWT?"
    answer: "Ein klassisches JWT (genauer: JWS, JSON Web Signature) ist lediglich Base64Url-kodiert und kryptografisch signiert, aber nicht verschlüsselt. Jede Person, die das Token abfängt, kann Header und Payload innerhalb von Millisekunden im Klartext lesen. Die Signatur schützt ausschließlich die Integrität und Authentizität gegen Manipulation."
  - question: "Wie kann ich den Inhalt eines JWT prüfen, ohne Produktions-Tokens zu gefährden?"
    answer: "Fügen Sie aktive Access- oder ID-Tokens aus Produktivumgebungen niemals in serverseitige Online-Tools ein, da diese auf fremden Servern protokolliert werden könnten. Nutzen Sie stattdessen einen rein clientseitigen Decoder mit Zero-Cloud-Architektur, der das Token lokal im Arbeitsspeicher Ihres Browsers dekodiert."
  - question: "Was passiert bei einem Algorithm-Confusion-Angriff (alg: none oder RS256 zu HS256)?"
    answer: "Bei mangelhaft konfigurierten Bibliotheken akzeptiert der Server unter Umständen das im Header stehende Feld alg ungeprüft. Ein Angreifer kann alg auf none setzen und die Signatur entfernen oder bei einem asymmetrischen RS256-System den öffentlichen Schlüssel als HMAC-Geheimnis für HS256 missbrauchen. Der Server muss den erwarteten Algorithmus daher stets fest im Code erzwingen."
  - question: "Sollten JWTs im Webbrowser besser in HttpOnly-Cookies oder im localStorage gespeichert werden?"
    answer: "Für klassische Webanwendungen gelten Cookies mit den Attributen HttpOnly, Secure und SameSite=Lax oder Strict meist als sicherer, da JavaScript im Falle einer XSS-Lücke keinen Lesezugriff auf HttpOnly-Cookies hat. Im localStorage abgelegte Tokens können hingegen bei jedem erfolgreichen Cross-Site-Scripting-Angriff direkt ausgelesen werden."
  - question: "Wie lassen sich kurze JWT-Laufzeiten mit einer guten Benutzererfahrung kombinieren?"
    answer: "Da sich einmal ausgestellte, zustandslose JWTs vor Ablauf ihres exp-Claims nur schwer einzeln widerrufen lassen, wählt man für Access-Tokens kurze Lebensdauern von etwa 5 bis 15 Minuten. Für längere Sitzungen stellt der Authentifizierungsserver zusätzlich ein separat gespeichertes, widerrufbares Refresh-Token mit Rotation aus."
---

JSON Web Tokens (JWT) bilden heute das Rückgrat der zustandslosen Authentifizierung und Autorisierung in modernen Web-APIs, Single-Page-Anwendungen und Microservice-Architekturen. Gleichzeitig führen Missverständnisse rund um Kodierung, Signaturprüfung und Speicherung regelmäßig zu kritischen Sicherheitslücken in Produktivsystemen.

Dieser Leitfaden erklärt den Aufbau von JWTs nach dem Standard **RFC 7519**, zeigt anhand eines konkreten Beispiels die Dekodierung und Lebensdauer-Berechnung und fasst die wichtigsten Sicherheitsregeln für Entwickler zusammen. Zum schnellen, datenschutzkonformen Prüfen Ihrer eigenen Tokens steht Ihnen unser clientseitiges [JWT-Decoder-Tool](/de/werkzeuge/jwt-decoder) zur Verfügung.

## Aufbau und Spezifikation nach RFC 7519

Ein signiertes JSON Web Token (JWS) besteht aus genau drei kompakten Zeichenfolgen, die durch zwei Punkte (`.`) miteinander verkettet sind:

```text
<Header>.<Payload>.<Signatur>
```

Alle drei Segmente werden im Format **Base64Url** (gemäß RFC 4648 § 5) kodiert. Im Unterschied zu klassischem Base64 ersetzt Base64Url die URL-kritischen Zeichen `+` durch `-` sowie `/` durch `_` und verzichtet auf abschließende Füllzeichen (`=`).

### 1. Der Header (JOSE Header)

Der Header beschreibt die Metadaten des Tokens – mindestens den verwendeten Signaturalgorithmus (`alg`) und meist den Typ (`typ: "JWT"`). Bei Schlüsselrotation kommt zusätzlich eine Schlüssel-ID (`kid`) hinzu, damit der empfangende Server den passenden Prüfschlüssel auswählen kann.

### 2. Der Payload (Claims / Nutzdaten)

Der Payload enthält die eigentlichen Aussagen (*Claims*) als JSON-Objekt. RFC 7519 unterscheidet drei Kategorien:

- **Registered Claims:** Standardisierte Kurznamen wie `iss` (Aussteller / *Issuer*), `sub` (eindeutige Benutzer-ID / *Subject*), `aud` (Zielsystem / *Audience*), `exp` (Ablaufzeitpunkt / *Expiration Time*), `nbf` (*Not Before*), `iat` (Ausstellungszeitpunkt / *Issued At*) und `jti` (eindeutige Token-ID). Zeitstempel werden stets als Unix-Epoch-Sekunden in UTC angegeben.
- **Public Claims:** Kollisionsfrei definierte Felder (z. B. über IANA-Registrierung oder eindeutige URIs).
- **Private Claims:** Anwendungsspezifische Attribute wie `role`, `tenant_id` oder `scope`.

### 3. Die Signatur

Die Signatur verknüpft den Base64Url-kodierten Header und Payload kryptografisch mit einem geheimen oder privaten Schlüssel:

```text
Signatur = Signierfunktion(Base64Url(Header) + "." + Base64Url(Payload), Secret_oder_PrivateKey)
```

Verändert ein Angreifer auch nur ein einziges Zeichen im Payload – etwa `role` von `"user"` auf `"admin"` –, stimmt die neu berechnete Signatur auf dem Server nicht mehr mit dem dritten Segment überein und das Token wird abgewiesen. Bei asymmetrischen Verfahren (`RS256`, `ES256`, `EdDSA`) signiert ausschließlich der zentrale Authentifizierungsserver mit seinem privaten Schlüssel, während beliebige Ressourcen-Server die Echtheit über den öffentlich bereitgestellten JWKS-Endpunkt (*JSON Web Key Set*) anhand der `kid` im Header verifizieren können, ohne selbst ein gemeinsames Secret zu kennen.

## Schritt-für-Schritt-Analyse eines Beispiel-JWT

Betrachten wir folgendes kompakte Beispiel-Token:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzQ4MjEiLCJuYW1lIjoiQW5uYSBXZWJlciIsInJvbGUiOiJlZGl0b3IiLCJpYXQiOjE3NjQxNTM2MDAsImV4cCI6MTc2NDE1NzIwMH0.3w8kR7m...
```

1. **Header Base64Url-dekodieren:** Das erste Segment `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` ergibt im Klartext `{"alg":"HS256","typ":"JWT"}`. Das Token nutzt somit symmetrisches HMAC mit SHA-256.
2. **Payload Base64Url-dekodieren:** Das zweite Segment liefert:
   ```json
   {
     "sub": "user_4821",
     "name": "Anna Weber",
     "role": "editor",
     "iat": 1764153600,
     "exp": 1764157200
   }
   ```
3. **Gültigkeitsdauer rechnerisch prüfen:** Ziehen Sie den Ausstellungszeitpunkt (`iat`) vom Ablaufzeitpunkt (`exp`) ab:
   ```text
   Laufzeit = exp − iat = 1.764.157.200 − 1.764.153.600 = 3.600 Sekunden (= 60 Minuten)
   ```
   Bei `256 Bit` (32 Byte) Output-Länge von SHA-256 erzeugt die Signatur exakt `43` Base64Url-Zeichen. Für die reine Einsichtnahme in Header und Payload benötigt der [JWT-Decoder](/de/werkzeuge/jwt-decoder) keinen geheimen Schlüssel; für die Verifizierung der Echtheit auf dem Server ist jedoch zwingend das hinterlegte Secret erforderlich.

## Vergleichstabelle: Signaturalgorithmen und JWE im Sicherheitsvergleich

Die Wahl des kryptografischen Verfahrens beeinflusst Schlüsselsicherheit, Verteilungsaufwand und Token-Größe in HTTP-Headern erheblich:

| Verfahren | Schlüsselmodell | Typische Einsatzumgebung | Verifizierbar durch | Kritisches Risiko bei Fehlkonfiguration |
| :--- | :--- | :--- | :--- | :--- |
| `HS256` (HMAC-SHA256) | Symmetrisch (ein Secret) | Monolith oder eng gekoppelte Backend-Dienste | Nur Systeme mit dem geheimen Schlüssel | Schwaches Secret lässt sich per Brute-Force offline knacken |
| `RS256` (RSA-SHA256, 2048+ Bit) | Asymmetrisch (Privat / Öffentlich) | OAuth 2.0 / OpenID Connect, Microservices | Jeden Dienst über öffentlichen JWKS-Endpunkt | Algorithm-Confusion-Angriff bei fehlender `alg`-Prüfung |
| `ES256` (ECDSA P-256) | Asymmetrisch (Elliptische Kurve) | Mobile APIs, hohe Last, kompakte Header | Jeden Dienst über öffentlichen Schlüssel | Fehlerhafte Zufallszahl (`k`) gefährdet privaten Schlüssel |
| `EdDSA` (Ed25519) | Asymmetrisch (Edwards-Kurve) | Moderne Zero-Trust- und Edge-Architekturen | Jeden Dienst über öffentlichen Schlüssel | Geringere Unterstützung in älteren Enterprise-Bibliotheken |
| `alg: none` | Keine Signatur | Ausschließlich unsignierte Sonderfälle | Keine kryptografische Prüfung | Vollständige Authentifizierungs-Umgehung in Produktion |
| `JWE` (RFC 7516) | Inhaltsverschlüsselung (z. B. AES-GCM) | Übertragung vertraulicher Claims | Nur Empfänger mit Entschlüsselungsschlüssel | Deutlich größerer Overhead und komplexeres Key-Management |

## Sicherheitsarchitektur, Zero-Cloud-Debugging und typische Fehler

Der folgenschwerste Irrtum beim Einsatz von JWTs ist die Verwechslung von **Kodierung** und **Verschlüsselung**. Ein Standard-JWT (JWS) schützt Daten ausschließlich gegen unbemerkte Veränderung, nicht gegen Mitlesen. Speichern Sie daher niemals Passwörter, Kreditkartendaten, API-Schlüssel oder besonders schützenswerte personenbezogene Daten im Payload.

Vermeiden Sie in Produktivumgebungen außerdem diese vier häufigen Architekturfehler:

- **Aktive Tokens auf Dritt-Server hochladen:** Ein abgefangenes, noch nicht abgelaufenes Bearer-Token gewährt jedem Besitzer sofortigen API-Zugriff im Namen des angemeldeten Benutzers. Verwenden Sie beim Debuggen konsequent ein **Zero-Cloud-Werkzeug**, das vollständig lokal im Arbeitsspeicher Ihres Browsers läuft und keinerlei Serverprotokolle anlegt.
- **Blindes Vertrauen in das `alg`-Feld:** Übergeben Sie Ihrer Validierungsbibliothek immer eine explizite Allowlist (z. B. ausschließlich `["RS256"]`) und lehnen Sie `alg: none` strikt ab.
- **Fehlende Prüfung von `iss`, `aud` und `exp`:** Ein gültig signiertes Token aus einem Test-Tenant oder für einen anderen Dienst darf von Ihrer API niemals akzeptiert werden.
- **Überdimensionierte Payloads und ungeschützte Speicherung:** Da das Token bei jedem API-Aufruf im `Authorization: Bearer ...`-Header mitgesendet wird, bläht ein überfüllter Payload jeden Request auf. Für Browser-Sitzungen bietet ein `HttpOnly; Secure; SameSite=Lax`-Cookie zudem deutlich besseren Schutz vor Token-Diebstahl durch Cross-Site-Scripting (XSS) als die Ablage im `localStorage`.
- **Kurze Access-Tokens mit Refresh-Rotation kombinieren:** Weil sich zustandslose JWTs bis zum Ablauf von `exp` nicht ohne zusätzliche Sperrlisten widerrufen lassen, sollten Access-Tokens nur 5 bis 15 Minuten gültig sein. Längere Sitzungen sichern Sie über widerrufbare Refresh-Tokens mit automatischer Rotation bei jeder Erneuerung.
