---
metaTitle: "SHA256 Generator Online | SHA-256-Hash & Checksum prüfen"
metaDescription: "Erstellen und prüfen Sie SHA-256-Hashes (FIPS 180-4) lokal im Browser mit Web Crypto API. Echtzeit-Text-Hashing und Datei-Checksums ohne Upload."
metaKeywords: "sha256 generator, sha-256 hash berechnen, sha256 prüfsumme prüfen, fips 180-4, web crypto sha-256, dateiintegrität sha256sum, sri hash sha256"
title: "SHA256 Generator"
shortDescription: "Berechnen und verifizieren Sie kryptografisch sichere 256-Bit-Prüfsummen nach FIPS 180-4 vollständig clientseitig über die native Web Crypto API und progressives Datei-Streaming."
faqs:
  - question: "Wie nutzt dieser SHA256 Generator die Web Crypto API und was passiert bei sehr großen Dateien?"
    answer: "Texteingaben und Dateien bis 20 MB werden direkt über die native Browser-Schnittstelle window.crypto.subtle.digest verarbeitet, die von Hardware-Beschleunigung profitiert. Bei Dateien über 20 MB schaltet das Tool automatisch auf ein progressives 2-MB-Chunk-Streaming um, damit auch Multi-Gigabyte-ISOs ohne Speicherabsturz gehasht werden."
  - question: "Ist SHA-256 trotz Fortschritten bei Hardware und Quantencomputern weiterhin sicher?"
    answer: "Ja. SHA-256 bietet 256 Bit Urbildresistenz und 128 Bit Kollisionsresistenz nach dem Geburtstagsparadoxon, wofür bislang kein praktikabler Angriff existiert. Selbst unter Annahme des Grover-Quantenalgorithmus verbleibt eine effektive Urbildsicherheit von 128 Bit, weshalb SHA-256 weiterhin als globaler Industriestandard gilt."
  - question: "Warum sollte ich Benutzerpasswörter nicht einfach mit SHA-256 und Salt speichern?"
    answer: "SHA-256 ist bewusst auf maximalen Durchsatz ausgelegt und lässt sich auf modernen GPUs und ASICs milliardenfach pro Sekunde berechnen. Für Passwörter sind stattdessen speicher- und rechenintensive Key-Derivation-Funktionen wie Argon2id, scrypt oder bcrypt Pflicht."
  - question: "Warum weichen die 64 Hex-Zeichen von einem Subresource-Integrity-Attribut (sha256-...) ab?"
    answer: "HEX-Prüfsummen kodieren die 32 Digest-Bytes als 64 Zeichen aus 0–9 und a–f. Für HTML-SRI-Attribute (integrity='sha256-...') verlangt die W3C-Spezifikation jedoch die kompaktere Base64-Kodierung exakt derselben 32 Binärbytes, die 44 Zeichen umfasst."
  - question: "Werden meine Dateien, Quellcodes oder Texte an einen Server übertragen?"
    answer: "Nein. Sowohl die Berechnung über Web Crypto API als auch das progressive Datei-Streaming und der lokale Verlauf erfolgen zu 100 % im Arbeitsspeicher Ihres Browsers. Sensible Dateien und Prüfsummen verlassen niemals Ihr Endgerät."
features:
  - "Hybride Client-Engine: Native Web Crypto API (SubtleCrypto) bis 20 MB und automatisches 2-MB-Chunk-Streaming für große Dateien"
  - "Echtzeit-Hashing von UTF-8-Texteingaben mit sofortiger Ausgabe der 64-stelligen hexadezimalen 256-Bit-Prüfsumme"
  - "Integrierter Prüfsummen-Vergleich (Verify) zur exakten Überprüfung heruntergeladener Software- und ISO-Images"
  - "Umschaltbare Groß- und Kleinschreibung der Hex-Ausgabe sowie Ein-Klick-Export als Prüfdatei oder Zwischenablage"
  - "Lokale Verlaufshistorie der letzten zehn Text- und Datei-Hashes im Browser-Speicher (localStorage)"
  - "100 % clientseitige Verarbeitung ohne Netzwerkübertragung plus optionale teilbare URL-Parameter für nicht-sensible Testvektoren"
useCases:
  - "Verifizierung offizieller SHA256SUMS-Dateien nach dem Download von Linux-Distributionen, Betriebssystem-ISOs und Firmware"
  - "Prüfung und Abgleich unveränderlicher Docker- und OCI-Container-Digests (image@sha256:...) in CI/CD-Pipelines"
  - "Erzeugung reproduzierbarer Fingerprints für Build-Artefakte, Software-Bills-of-Materials (SBOM) und Compliance-Archive"
  - "Debugging von SHA-256-Signaturen, API-Request-Payloads (etwa AWS SigV4) und kryptografischen Testvektoren"
  - "Kontrolle identischer Backup-Archive und Datenbank-Dumps vor und nach Cloud- oder Server-Migrationen"
  - "Lehre, Audit und Verifikation kryptografischer Grundlagen wie Lawineneffekt, Merkle-Bäumen und UTF-8-Normalisierung"
howToSteps:
  - "Wählen Sie im Werkzeug die Registerkarte 'Text' oder 'Datei' entsprechend Ihrer Eingabequelle."
  - "Geben Sie für Text Ihre Zeichenkette ein – die 64-stellige SHA-256-Prüfsumme wird in Echtzeit berechnet."
  - "Ziehen Sie für Dateien das gewünschte Archiv per Drag-and-Drop in die Dropzone und warten Sie auf den Fortschrittsbalken."
  - "Passen Sie bei Bedarf die Schreibweise der Hex-Zeichen über den Schalter für Klein- oder Großbuchstaben an."
  - "Fügen Sie zum Integritätsabgleich die offizielle Hersteller-Prüfsumme in das Vergleichsfeld ein, um eine exakte Übereinstimmung zu prüfen."
  - "Kopieren Sie den geprüften Digest in die Zwischenablage oder laden Sie das Ergebnis für Ihre Dokumentation herunter."
---

**SHA-256 (Secure Hash Algorithm 256-bit)**, spezifiziert in **FIPS PUB 180-4** und **RFC 6234**, bildet den weltweiten Referenzstandard für kryptografische Integritätsprüfungen. Ob TLS-1.3-Zertifikate, OCI-Container-Digests, Git-Objekt-Hashes, Software-Releases oder Blockchain-Protokolle: Überall dort, wo Manipulationen zuverlässig ausgeschlossen werden müssen, verdichtet SHA-256 beliebige Binärdaten deterministisch auf eine 256 Bit (32 Bytes) lange Prüfsumme – dargestellt als 64 hexadezimale Zeichen. Dieser **SHA256 Generator** kombiniert für Texte und Dateien bis 20 MB die native **Web Crypto API** (`window.crypto.subtle.digest`) mit einem progressiven **2-MB-Chunk-Streaming** für größere Dateien und arbeitet zu 100 % lokal im Browser.

## Interne Funktionsweise von SHA-256 nach FIPS PUB 180-4

SHA-256 gehört zur **SHA-2-Familie** und nutzt die **Merkle-Damgård-Konstruktion** mit einer 512-Bit-Blockgröße und einem 256-Bit-Zustand aus acht 32-Bit-Registern (`a` bis `h`):

1. **Big-Endian-Padding**: Jede Eingabe wird mit einem einzelnen `1`-Bit (`0x80`) abgeschlossen, mit Null-Bits bis zur Länge `448 mod 512` aufgefüllt und schließlich um die ursprüngliche Nachrichtenlänge als 64-Bit-Ganzzahl im **Big-Endian-Format** ergänzt.
2. **Nothing-up-my-sleeve-Konstanten**: Um den Verdacht verborgener Hintertüren auszuschließen, leiten sich die acht 32-Bit-Initialwerte `H0..H7` aus den Nachkommastellen der Quadratwurzeln der ersten acht Primzahlen (`2` bis `19`, beginnend mit `0x6a09e667`) ab. Die 64 Rundenkonstanten `K[0..63]` stammen entsprechend aus den Kubikwurzeln der ersten 64 Primzahlen (`2` bis `311`).
3. **Nachrichtenexpansion (Message Schedule)**: Jeder 512-Bit-Block liefert zunächst sechzehn 32-Bit-Wörter `W[0..15]`, die über die bitweisen Rotations- und Shift-Funktionen `σ₀` und `σ₁` auf insgesamt 64 Wörter `W[0..63]` erweitert werden.
4. **64 Kompressionsrunden**: In jeder Runde mischen die nichtlinearen Funktionen `Ch` (*Choose*) und `Maj` (*Majority*) zusammen mit den Rotationsfunktionen `Σ₀` und `Σ₁` das jeweilige Nachrichtenwort `W[t]` und die Konstante `K[t]` in die Arbeitsregister. Nach 64 Runden werden die Register modulo 2³² auf den Zustand addiert.

Bereits ein einziges geändertes Bit in der Eingabe kaskadiert über diese 64 Runden vollständig durch den Zustand (*Avalanche-Effekt*). Die leere Zeichenkette (`""`) ergibt stets `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; die fünf UTF-8-Bytes `Hallo` erzeugen exakt `753692ec36adb4c794c973945eb2a99c1649703ea6f76bf259abb4fb838e013e`.

## Sicherheitsmargen, Hardware-Beschleunigung und Verfahrensvergleich

Mit 2²⁵⁶ (rund 1,15 × 10⁷⁷) möglichen Ausgabewerten bietet SHA-256 eine theoretische Urbildresistenz von 256 Bit und gemäß dem Geburtstagsparadoxon eine **Kollisionsresistenz von 128 Bit** (2¹²⁸ Operationen). Auf modernen Prozessoren beschleunigen dedizierte Befehlssatzerweiterungen wie **Intel/AMD SHA-NI** oder die **ARMv8-Crypto-Extensions** (Apple Silicon, AWS Graviton) die Kompressionsrunden direkt in Silizium auf mehrere Gigabyte pro Sekunde – wovon auch die native Web Crypto API moderner Browser unmittelbar profitiert.

| Verfahren | Ausgabelänge | Kollisionssicherheit | Hardware-Beschleunigung | Length-Extension-Risiko | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `MD5` | 128 Bit (32 Hex) | Gebrochen (< 1 Sek.) | Nein | Ja | Nur nicht-sicherheitskritische Legacy-Prüfsummen |
| `SHA-1` | 160 Bit (40 Hex) | Gebrochen (SHAttered) | Teilweise (SHA-NI) | Ja | Historische Systeme, abgelöst |
| `SHA-256` | 256 Bit (64 Hex) | **128 Bit (Sicher)** | **Ja (SHA-NI / ARMv8)** | Ja (ohne HMAC) | Software-Checksums, TLS, OCI-Images, Signatur-Digests |
| `SHA-512` | 512 Bit (128 Hex) | **256 Bit (Sicher)** | 64-Bit-Register / ARMv8 | Ja (ohne HMAC) | Sehr hoher Durchsatz auf 64-Bit-Servern |
| `SHA3-256` | 256 Bit (64 Hex) | **128 Bit (Sicher)** | Begrenzt (ARMv8.2) | **Nein (Sponge)** | Kryptografische Diversität, moderne Protokolle |
| `Argon2id` | Variabel | Speicherharte KDF | Absichtlich gebremst | Nicht anwendbar | Passwortspeicherung und Schlüsselableitung |

Beachten Sie dabei zwei essenzielle Grenzen: Weil SHA-256 auf Merkle-Damgård basiert, darf für signierte API-Anfragen oder Webhooks niemals ein naives `SHA256(secret + payload)` eingesetzt werden – verwenden Sie stattdessen [HMAC-SHA256 im HMAC-Generator](/de/werkzeuge/hmac-generator), das auch den Signaturalgorithmen in [JSON Web Tokens (JWT)](/de/werkzeuge/jwt-decoder) zugrunde liegt. Und weil SHA-256 extrem schnell rechnet, gehören Benutzerpasswörter ausnahmslos in **Argon2id** oder **scrypt**. Für einen schnellen Direktvergleich mehrerer Hash-Familien hilft zudem unser [Hash-Generator](/de/werkzeuge/hash-generator), während Legacy-Systeme über den [MD5-Generator](/de/werkzeuge/md5-generator) bedient werden.

## Praxis-Workflows: ISO-Checksums, SRI-Tags und Container-Digests

1. **Linux-ISOs & Release-Binaries verifizieren**: Laden Sie die offizielle `SHA256SUMS`-Datei stets über HTTPS vom Hersteller und prüfen Sie diese bei sicherheitskritischen Deployments zusätzlich per GPG-Signatur, bevor Sie den lokalen Hash im Vergleichsfeld abgleichen.
2. **Subresource Integrity (SRI) im Frontend**: Ein `<script>`-Tag mit `integrity="sha256-..."` erwartet nicht die 64 Hex-Zeichen, sondern die **Base64-Kodierung der rohen 32 Hash-Bytes** (44 Zeichen). Details zur Base64-Darstellung prüfen Sie bei Bedarf im [Base64-Encoder](/de/werkzeuge/base64-encode).
3. **Content-Addressable Storage & DevSecOps**: Docker- und OCI-Registries pinnen unveränderliche Container-Layer über `image@sha256:<64-hex>` statt mutierbarer Tags wie `:latest`. Auch Git unterstützt das SHA-256-Objektformat, stellt dem Dateiinhalt beim Hashen jedoch stets den Header `blob <Bytegröße>\0` voran – deshalb unterscheidet sich eine Git-Objekt-ID gezielt von der reinen Datei-Prüfsumme.
4. **TLS-Zertifikats-Fingerprints & zeitkonstante Prüfungen**: In Public-Key-Infrastrukturen dienen SHA-256-Fingerprints (`openssl x509 -noout -fingerprint -sha256`) dem eindeutigen Abgleich von X.509-Zertifikaten und SPKI-Pins. Vergleichen Backends SHA-256-Digests von API-Keys, Webhook-Payloads oder Reset-Tokens, vermeiden zeitkonstante Funktionen wie `crypto.timingSafeEqual` (Node.js) oder `hmac.compare_digest` (Python) Timing-Seitenkanalangriffe gegenüber einem regulären `===`.

## Reproduzierbare Terminal-Kommandos und Web-Crypto-Code

Für automatisierte Builds und lokale Gegenproben unter Linux, macOS, Windows und JavaScript:

```bash
# Linux & macOS: Datei prüfen und SHA256SUMS-Manifest verifizieren
sha256sum debian-13-amd64.iso
sha256sum -c SHA256SUMS
shasum -a 256 debian-13-amd64.iso

# Subresource-Integrity-Hash (Base64 der 32 Rohbytes) erzeugen
openssl dgst -sha256 -binary bundle.min.js | openssl base64 -A

# Windows PowerShell: SHA-256-Prüfsumme ausgeben
Get-FileHash -Path .\installer.exe -Algorithm SHA256
```

```javascript
// Natives Client-Hashing mit der Web Crypto API (UTF-8)
async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
```

Achten Sie beim Terminal-Vergleich von Texten stets auf identische Kodierung (`UTF-8`) und fehlende Zusatz-Zeilenumbrüche (`printf '%s'` statt `echo`). Durch die hybride Architektur – native Web Crypto API bis 20 MB und 2-MB-Chunk-Streaming darüber hinaus – liefert der SHA256 Generator sekundenschnelle, datenschutzkonforme Prüfsummen direkt auf Ihrem Gerät.
