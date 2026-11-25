---
metaTitle: "Hash Generator | MD5, SHA-1, SHA-256, SHA-512 & SHA-3"
metaDescription: "Berechnen Sie MD5, SHA-1, SHA-256, SHA-512 und SHA-3 lokal im Browser. Vergleichen Sie Prüfsummen für Text und Dateien 100 % clientseitig."
metaKeywords: "hash generator, md5 hash berechnen, sha-256 generator, sha-512 hash, sha-3 keccak, dateiintegrität prüfen, prüfsumme online, kryptografische hashfunktion"
title: "Hash Generator"
shortDescription: "Berechnen und vergleichen Sie MD5-, SHA-1-, SHA-2- und SHA-3-Prüfsummen für Texte und Dateien in Echtzeit – vollständig lokal im Browser ohne Datenübertragung."
faqs:
  - question: "Warum zeigt der Hash Generator Sicherheitsbewertungen wie Schwach oder Veraltet an?"
    answer: "Die Sicherheitsindikatoren trennen kryptografisch gebrochene Verfahren wie MD5 und SHA-1 klar von belastbaren Standards wie SHA-256, SHA-512 und SHA-3. So erkennen Sie sofort, ob ein Algorithmus nur für Legacy-Prüfsummen taugt oder für sicherheitskritische Integritätsprüfungen geeignet ist."
  - question: "Worin unterscheidet sich SHA-3 (Keccak) technisch von der SHA-2-Familie?"
    answer: "SHA-2 basiert wie MD5 und SHA-1 auf der iterativen Merkle-Damgård-Konstruktion mit fester Blockkompression. SHA-3 nutzt stattdessen die Keccak-Sponge-Architektur mit einer 1600-Bit-Zustandspermutation, die strukturell immun gegen Length-Extension-Angriffe ist und eine unabhängige mathematische Absicherung bietet."
  - question: "Warum weicht mein Hash im Browser manchmal von der Ausgabe des Linux-Befehls echo ab?"
    answer: "Der Befehl echo hängt standardmäßig ein unsichtbares Zeilenumbruchzeichen (LF, 0x0A) an den Text an, während ein Textfeld ohne abschließende Leerzeile gehasht wird. Verwenden Sie im Terminal printf '%s' ohne Zeilenumbruch und prüfen Sie, ob Dateien Unix-LF oder Windows-CRLF enthalten."
  - question: "Kann ich einen berechneten Hash wieder in den ursprünglichen Text zurückverwandeln?"
    answer: "Nein. Kryptografische Hashfunktionen sind mathematische Einwegfunktionen (Preimage-Resistenz), bei denen Eingaben beliebiger Länge verlustbehaftet auf eine feste Bitlänge abgebildet werden. Kurze oder ungesalzene Standardwörter lassen sich zwar über Wörterbücher erraten, der Algorithmus selbst ist jedoch nicht umkehrbar."
  - question: "Verlassen meine Dateien oder geheimen Zeichenketten bei der Berechnung meinen Rechner?"
    answer: "Nein. Sämtliche Hash-Berechnungen für Text- und Dateieingaben laufen zu 100 % lokal im Arbeitsspeicher Ihres Browsers. Es erfolgen weder Uploads noch Server-Logs, sodass Sie auch interne Konfigurationsdateien oder proprietäre Builds bedenkenlos prüfen können."
features:
  - "Parallele Echtzeit-Berechnung von acht Verfahren: MD5, SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA3-256 und SHA3-512"
  - "Integrierte Prüfsummen-Verifizierung mit automatischer Algorithmus-Erkennung beim Einfügen eines erwarteten Hashs"
  - "Duale Eingabemodi für UTF-8-kodierte Texte sowie lokale Binärdateien per Drag-and-Drop inklusive Bytegrößen- und Laufzeitanzeige"
  - "Deutliche Sicherheitsklassifizierung zur sofortigen Unterscheidung zwischen veralteten Legacy-Hashes und empfohlenen Standards"
  - "Ein-Klick-Kopieren einzelner oder aller Prüfsummen sowie strukturierter JSON-Export (hash_report.json) für Audit-Protokolle"
  - "Vollständig clientseitige Ausführung im Browser ohne Netzwerkübertragung sensibler Inhalte oder Dateien"
useCases:
  - "Integritätsprüfung heruntergeladener Linux-ISOs, Firmware-Images und Software-Archive gegen veröffentlichte Prüfsummen"
  - "Schneller Abgleich zwischen verschiedenen Hash-Familien bei der Migration von Legacy-Systemen von MD5 oder SHA-1 auf SHA-256"
  - "Identifikation unbekannter Prüfsummen aus Bug-Reports oder Logs anhand der Bitlänge und des sofortigen Vergleichsfelds"
  - "Erzeugung deterministischer Content-Fingerprints für Build-Artefakte, Konfigurationsdateien und Reproduzierbarkeits-Checks in CI/CD"
  - "Dokumentation von Release-Prüfsummen über den JSON-Berichtsexport für interne Compliance- und Freigabeprozesse"
  - "Fehlersuche bei abweichenden Prüfsummen zwischen Windows-, macOS- und Linux-Umgebungen durch UTF-8- und Zeilenumbruch-Tests"
howToSteps:
  - "Wählen Sie oben den gewünschten Eingabemodus: 'Text' für Zeichenketten oder 'Datei' für lokale Binärdateien."
  - "Geben Sie Ihren Text direkt in das Eingabefeld ein oder ziehen Sie eine Datei per Drag-and-Drop in die Upload-Zone."
  - "Prüfen Sie in der Ergebnisliste gleichzeitig alle acht generierten Prüfsummen inklusive Bitlänge und Sicherheitsbewertung."
  - "Fügen Sie zur Verifizierung eine bekannte Referenz-Prüfsumme in das Vergleichsfeld ein, um sofort den passenden Algorithmus zu bestätigen."
  - "Kopieren Sie den benötigten Hash mit einem Klick oder laden Sie alle Ergebnisse gebündelt als JSON-Bericht herunter."
---

Kryptografische Hashfunktionen bilden das Fundament digitaler Datenintegrität in Softwareverteilung, Netzwerksicherheit, Versionsverwaltung und API-Architekturen. Sie verdichten Eingabedaten beliebiger Größe deterministisch auf einen kompakten Fingerabdruck (*Message Digest*) fester Bitlänge – unabhängig davon, ob ein einzelnes Byte oder ein mehrhundert Megabyte großes Release-Archiv verarbeitet wird. Der **Hash Generator** berechnet acht etablierte Verfahren (`MD5`, `SHA-1`, `SHA-224`, `SHA-256`, `SHA-384`, `SHA-512`, `SHA3-256` und `SHA3-512`) simultan und vollständig clientseitig im Browser, bewertet ihr aktuelles Sicherheitsniveau und gleicht vorhandene Referenz-Prüfsummen automatisch gegen alle erzeugten Digests ab.

## Merkle-Damgård versus Keccak-Sponge: Interne Konstruktionsprinzipien

Obwohl sämtliche kryptografische Hashfunktionen nach außen ähnlich wirken – deterministisch, nicht umkehrbar (*Preimage-Resistenz*) und mit starkem Lawineneffekt (*Avalanche-Effekt*), bei dem ein einzelnes gekipptes Eingabebit im Mittel die Hälfte aller Ausgabebits verändert –, unterscheiden sich ihre internen Bauprinzipien erheblich.

`MD5`, `SHA-1` und die gesamte `SHA-2`-Familie folgen der iterativen **Merkle-Damgård-Konstruktion** mit Davies-Meyer-Kompressionsfunktion. Die Nachricht wird zunächst per Padding auf ein Vielfaches der internen Blockgröße (512 Bit bei MD5/SHA-1/SHA-256, 1024 Bit bei SHA-384/SHA-512) erweitert, wobei am Ende die ursprüngliche Nachrichtenlänge angehängt wird. Anschließend verarbeitet die Kompressionsfunktion Block für Block den vorherigen Verkettungswert. Da bei ungekürzten Ausgaben (`MD5`, `SHA-1`, `SHA-256`, `SHA-512`) der finale interne Zustand direkt ausgegeben wird, entsteht eine strukturelle Eigenheit: **Length-Extension-Angriffe**. Kennt ein Angreifer `H(secret || message)` sowie die Länge von `secret`, kann er ohne Kenntnis des Geheimnisses eine gültige Prüfsumme für `H(secret || message || padding || zusatzdaten)` berechnen. Genau deshalb eignen sich naive Präfix-Konstruktionen nicht zur Nachrichtenauthentifizierung – hierfür sind echte MAC-Verfahren wie unser [HMAC-Generator](/de/werkzeuge/hmac-generator) zwingend erforderlich.

`SHA-3` (standardisiert in **FIPS PUB 202**) bricht bewusst mit diesem Design und nutzt die **Keccak-Sponge-Konstruktion**. Ein 1600 Bit großer interner Zustand wird in eine sichtbare Rate `r` und eine verborgene Kapazität `c` aufgeteilt (`r + c = 1600`). In der *Absorb*-Phase werden Eingabeblöcke der Breite `r` per XOR eingemischt und durch 24 Runden der Permutation `Keccak-f[1600]` durchmischt; in der *Squeeze*-Phase werden nur Bits aus dem Rate-Bereich ausgegeben. Weil die Kapazität niemals vollständig offengelegt wird, ist SHA-3 von Grund auf immun gegen Length-Extension-Angriffe.

Ein häufiger Praxis-Fallstrick betrifft den Unterschied zwischen **originalem Keccak** und **NIST SHA-3**: Bei der Standardisierung zu FIPS 202 ergänzte NIST das Padding-Domain-Separator-Byte `0x06`, während ältere Keccak-Implementierungen (darunter Ethereum/Solidity `keccak256` und klassische JavaScript-Bibliotheken) das ursprüngliche Byte `0x01` verwenden. Bei plattformübergreifenden Protokollen sollten Sie deshalb stets gegen bekannte Testvektoren prüfen, ob NIST-SHA-3 oder Roh-Keccak gefordert ist.

## Algorithmus-Spezifikation und Sicherheitsmatrix im Vergleich

| Algorithmus | Standard | Ausgabelänge | Interne Blockgröße / Rate | Konstruktion | Sicherheitsstatus | Typischer Einsatzbereich |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `MD5` | RFC 1321 | 128 Bit (32 Hex) | 512 Bit | Merkle-Damgård | **Schwach / Gebrochen** | Nicht-sicherheitskritische Prüfsummen, Cache-Keys, Legacy-ETags |
| `SHA-1` | FIPS 180-4 | 160 Bit (40 Hex) | 512 Bit | Merkle-Damgård | **Veraltet** | Historische Git-Commits, reine Legacy-Kompatibilität |
| `SHA-224` | FIPS 180-4 | 224 Bit (56 Hex) | 512 Bit | Merkle-Damgård (gekürzt) | **Stark** | Kompakte Signaturen, ressourcenschonende Protokolle |
| `SHA-256` | FIPS 180-4 | 256 Bit (64 Hex) | 512 Bit | Merkle-Damgård | **Stark (Standard)** | Software-Checksums, TLS 1.3, OCI-Container, Blockchain |
| `SHA-384` | FIPS 180-4 | 384 Bit (96 Hex) | 1024 Bit | Merkle-Damgård (gekürzt) | **Stark** | Hochsichere TLS-Zertifikate, immun gegen Length Extension |
| `SHA-512` | FIPS 180-4 | 512 Bit (128 Hex) | 1024 Bit | Merkle-Damgård | **Stark** | 64-Bit-Plattformen, Datenintegrität mit hohem Durchsatz |
| `SHA3-256` | FIPS 202 | 256 Bit (64 Hex) | 1088 Bit (Rate) | Keccak-Sponge | **Sehr stark** | Moderne Protokolle, kryptografische Redundanz zu SHA-2 |
| `SHA3-512` | FIPS 202 | 512 Bit (128 Hex) | 576 Bit (Rate) | Keccak-Sponge | **Sehr stark** | Langfristige Integritätsnachweise und Post-Quantum-Reserven |

Für spezialisierte Workflows mit Chunk-Streaming sehr großer Archive oder dedizierter Einzelanalyse stehen zudem der [SHA256-Generator](/de/werkzeuge/sha256-generator) und der [MD5-Generator](/de/werkzeuge/md5-generator) bereit.

## Hashing, HMAC, Passwort-KDF und Verschlüsselung sauber trennen

In Sicherheits-Reviews führt die Verwechslung kryptografischer Grundbausteine regelmäßig zu kritischen Schwachstellen:

- **Kryptografische Hashfunktionen** schützen ausschließlich vor unbemerkter Veränderung (*Integrität*). Sie nutzen keinen Schlüssel und bieten keinerlei Vertraulichkeit.
- **HMAC (RFC 2104)** kombiniert eine Hashfunktion zweistufig mit einem geheimen Schlüssel und garantiert damit Integrität **und** Authentizität – etwa bei Webhook-Signaturen oder HS256-Tokens (inspektierbar mit dem [JWT-Decoder](/de/werkzeuge/jwt-decoder)).
- **Passwort-Hashfunktionen (KDFs)** wie **Argon2id**, **scrypt** oder **bcrypt** verlangsamen die Berechnung bewusst über hohen Speicher- und Rechenaufwand plus individuellem Salt. Schnelle Allzweck-Hashes wie SHA-256 oder MD5 sind für Passwortdatenbanken ungeeignet, da moderne GPUs Milliarden Versuche pro Sekunde durchrechnen. Zum Erzeugen starker Geheimnisse empfiehlt sich ergänzend der [Passwort-Generator](/de/werkzeuge/strong-password-generator).
- **Verschlüsselung** (z. B. AES-256-GCM) ist reversibel und dient dem Schutz der Vertraulichkeit mittels Schlüssel.

## Typische Fehlerquellen: UTF-8, Zeilenumbrüche und CLI-Abgleich

Wenn zwei Systeme für vermeintlich identischen Text unterschiedliche Hashes liefern, liegt fast nie ein Fehler im Algorithmus vor, sondern eine abweichende Byte-Repräsentation. Bereits ein angehängtes Zeilenumbruchzeichen (`LF` vs. `CRLF`) verändert den SHA-256-Digest komplett:

- `Hallo` (5 Bytes UTF-8): `753692ec36adb4c794c973945eb2a99c1649703ea6f76bf259abb4fb838e013e`
- `Hallo\n` (6 Bytes, Unix-LF): `78fca7a0dbd0325b8f77333c82fb1ba2a5cbf9e90284bd24e91cb58ac1d6232f`
- `Hallo\r\n` (7 Bytes, Windows-CRLF): `175fafa305e1a6b217963bc76039061049314671ccfd48077256d75396ee73a6`

Ebenso heimtückisch sind **UTF-8-Byte-Order-Marks** (`0xEF 0xBB 0xBF`) aus Windows-Editoren sowie abweichende Unicode-Normalisierungsformen (`NFC` vs. `NFD`), bei denen deutsche Umlaute wie `ä` entweder als einzelner Codepoint (`U+00E4`) oder als zusammengesetzte Sequenz (`a` + `U+0308`) kodiert sind. Für reproduzierbare Terminal-Abgleiche unter Linux, macOS und Windows bewähren sich explizite Kommandos ohne impliziten Zeilenumbruch:

```bash
# Linux / macOS: exaktes Byte-Hashing ohne abschließendes Newline
printf '%s' 'Hallo' | openssl dgst -sha256
printf '%s' 'Hallo' | openssl dgst -sha512

# Datei-Prüfsumme mit OpenSSL oder sha256sum
openssl dgst -sha256 release-v2.4.tar.gz
sha256sum release-v2.4.tar.gz

# Windows PowerShell: SHA-256 und SHA-512 lokal ermitteln
Get-FileHash -Path .\release-v2.4.tar.gz -Algorithm SHA256
Get-FileHash -Path .\release-v2.4.tar.gz -Algorithm SHA512
```

Werden Prüfsummen etwa für HTTP-Header oder Subresource-Integrity-Attribute nicht hexadezimal, sondern in Base64 benötigt, lassen sich binäre Digests nahtlos im [Base64-Encoder](/de/werkzeuge/base64-encode) weiterverarbeiten. Dank lokaler Ausführung im Browser, automatischem Abgleich im Vergleichsfeld und JSON-Report-Export liefert der Hash Generator belastbare Prüfergebnisse für Entwicklung, Betrieb und Sicherheitsaudits – ganz ohne Server-Upload.
