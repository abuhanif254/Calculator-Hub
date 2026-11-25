---
metaTitle: "MD5 Generator Online | MD5-Prüfsumme & Hash berechnen"
metaDescription: "Generieren Sie MD5-Hashes (RFC 1321) für Text und große Dateien lokal im Browser. Mit 2-MB-Chunk-Streaming, Groß-/Kleinschreibung und Vergleich."
metaKeywords: "md5 generator, md5 hash berechnen, md5 prüfsumme online, rfc 1321 md5, datei md5 prüfen, md5sum alternative, text zu md5, md5 checksumme"
title: "MD5 Generator"
shortDescription: "Berechnen Sie 128-Bit-MD5-Prüfsummen nach RFC 1321 für Texte und große Dateien lokal im Browser – inklusive 2-MB-Chunk-Streaming, Live-Vergleich und Verlauf."
faqs:
  - question: "Warum wird MD5 heute noch verwendet, obwohl der Algorithmus als kryptografisch gebrochen gilt?"
    answer: "MD5 gilt ausschließlich für Sicherheitszwecke wie Signaturen, Zertifikate oder Passwörter als ungeeignet, weil gezielte Kollisionen praktisch erzeugbar sind. In nicht-adversariellen Einsatzbereichen – etwa bei Legacy-Schnittstellen, Cache-Schlüsseln, Objektspeicher-Headern oder zur Erkennung zufälliger Übertragungsfehler – bleibt MD5 wegen seiner Geschwindigkeit und breiten Unterstützung weiterhin im Einsatz."
  - question: "Wie verarbeitet der MD5 Generator sehr große Dateien ohne Browser-Absturz?"
    answer: "Statt eine komplette ISO- oder Archivdatei auf einmal in den Arbeitsspeicher zu laden, liest das Tool Dateien inkrementell in 2-MB-Blöcken (Chunks) über die FileReader-API ein und aktualisiert den internen MD5-Zustand schrittweise. Dadurch bleibt der Speicherverbrauch auch bei mehreren Gigabyte stabil."
  - question: "Warum stimmt mein lokaler MD5-Hash nicht mit dem AWS-S3-ETag einer großen Datei überein?"
    answer: "Bei Single-Part-Uploads entspricht der S3-ETag tatsächlich dem regulären MD5-Hash der Datei. Sobald S3 jedoch einen Multipart-Upload nutzt, berechnet der Dienst den MD5 über die aneinandergehängten Binär-MD5-Werte der einzelnen Teile und hängt einen Bindestrich samt Teileanzahl an (etwa -5)."
  - question: "Macht es einen Unterschied, ob ein MD5-Hash in Klein- oder Großbuchstaben ausgegeben wird?"
    answer: "Mathematisch repräsentieren beide Schreibweisen exakt dieselben 16 Bytes (128 Bit). Manche Windows-Skripte oder ältere Prüftools vergleichen Zeichenketten jedoch case-sensitiv, weshalb Sie die Ausgabe im Generator per Schalter direkt umschalten können."
  - question: "Ist ein MD5-Hash durch Entschlüsselung wieder in den Originaltext umkehrbar?"
    answer: "Nein. MD5 ist eine verlustbehaftete Einwegfunktion und kein Verschlüsselungsverfahren. Zwar lassen sich gängige Wörter über riesige vorberechnete Datenbanken (Rainbow Tables) oder schnelle GPU-Wörterbuchangriffe zuordnen, beliebige oder längere Eingaben können jedoch nicht zurückgerechnet werden."
features:
  - "Echtzeit-Berechnung von 128-Bit-MD5-Hashes (RFC 1321) für beliebige UTF-8-Zeichenketten inklusive Sonderzeichen und Emojis"
  - "Speicherschonendes 2-MB-Chunk-Streaming mit Fortschrittsanzeige für große lokale Dateien per Drag-and-Drop"
  - "Direkter Prüfsummen-Vergleich (Verify) gegen erwartete MD5-Strings mit sofortiger Treffer- oder Abweichungsmeldung"
  - "Umschaltung zwischen Klein- und Großschreibung der 32-stelligen Hexadezimalausgabe für plattformübergreifende Kompatibilität"
  - "Lokaler Sitzungsverlauf der letzten zehn berechneten Text- und Datei-Hashes im Browser-Speicher (localStorage)"
  - "100 % clientseitige Verarbeitung ohne Server-Upload, sodass vertrauliche Dateien und Eingaben Ihr Gerät nie verlassen"
useCases:
  - "Abgleich von Datei-Prüfsummen gegen ältere FTP-Mirror-Listen, Debian-md5sums-Dateien oder interne Backup-Manifeste"
  - "Erzeugung kompakter 32-Zeichen-Schlüssel für Redis-, Memcached- oder CDN-Caches aus langen SQL- und API-Parametern"
  - "Berechnung und Fehlersuche bei AWS-S3-Content-MD5-Prüfwerten und Single-Part-ETag-Integritätsprüfungen"
  - "Deduplizierung identischer Mediendateien, Dokumente oder Produktbilder in lokalen Medienarchiven"
  - "Erstellung klassischer Gravatar-Avatar-Hashes aus normalisierten E-Mail-Adressen für bestehende CMS-Integrationen"
  - "Validierung von Integrations- und Regressionstests bei Legacy-Webhooks und ERP-Schnittstellen mit MD5-Prüfsumme"
howToSteps:
  - "Wählen Sie zwischen dem Tab 'Text' für direkte Zeichenketten und 'Datei' für lokale Dateien."
  - "Tippen oder fügen Sie bei Text Ihre Eingabe ein; der 32-stellige MD5-Hash aktualisiert sich automatisch."
  - "Ziehen Sie bei einer Datei diese per Drag-and-Drop in das Upload-Feld und verfolgen Sie den 2-MB-Chunk-Fortschritt."
  - "Schalten Sie die Hex-Ausgabe bei Bedarf zwischen Klein- und Großbuchstaben um."
  - "Fügen Sie zum Integritätsabgleich die erwartete Prüfsumme in das Vergleichsfeld ein, um eine exakte Übereinstimmung zu verifizieren."
---

Der **Message Digest Algorithm 5 (MD5)**, 1992 von Ronald Rivest in **RFC 1321** spezifiziert, erzeugt aus jeder beliebigen Bytefolge einen deterministischen 128-Bit-Fingerabdruck (16 Bytes, dargestellt als 32 hexadezimale Zeichen). Auch wenn MD5 aus sicherheitskritischen Protokollen längst verbannt wurde, begegnet der Algorithmus Entwicklern und Administratoren täglich in Bestands-APIs, Cloud-Objektspeichern, Paket-Manifesten und Caching-Layern. Dieser **MD5 Generator** berechnet MD5-Prüfsummen für Texte und große Dateien vollständig lokal im Browser – ohne Upload und ohne Speicherengpässe dank inkrementeller Blockverarbeitung.

## Algorithmus-Interna von MD5 nach RFC 1321

MD5 implementiert eine klassische **Merkle-Damgård-Struktur**, die Nachrichten sequenziell in 512-Bit-Blöcken (64 Bytes) komprimiert:

1. **Bit-Padding und Längenfeld**: An die Eingabebytes wird zwingend ein einzelnes gesetztes Bit (`0x80`) angehängt, gefolgt von so vielen Null-Bits, bis die Gesamtbitlänge kongruent zu `448 mod 512` ist. Die verbleibenden 64 Bit enthalten die ursprüngliche Nachrichtenlänge in Bits als vorzeichenlose Ganzzahl im **Little-Endian-Format** (modulo 2⁶⁴).
2. **Initialisierung der vier 32-Bit-Register**: Vor dem ersten Block wird der interne 128-Bit-Zustand mit vier festen Konstanten initialisiert: `A = 0x67452301`, `B = 0xefcdab89`, `C = 0x98badcfe` und `D = 0x10325476`.
3. **64 Kompressionsrunden in vier Phasen**: Jeder 512-Bit-Block wird in sechzehn 32-Bit-Wörter `M[0..15]` (Little-Endian) zerlegt und durchläuft vier Runden zu je 16 Schritten. Jede Runde verwendet eine eigene nichtlineare Bit-Funktion (`F`, `G`, `H`, `I`), definierte zyklische Linksrotationen sowie 64 feste Rundenkonstanten, die aus dem ganzzahligen Teil von `⌊2³² · |sin(i)|⌋` (für `i = 1..64`) abgeleitet sind.
4. **Zustandsaddition und Ausgabe**: Nach Abschluss der 64 Schritte werden die Zwischenregister modulo 2³² auf den bisherigen Zustand addiert. Nach dem letzten Block entsteht durch Little-Endian-Ausgabe von `A`, `B`, `C` und `D` die 32-stellige Hex-Prüfsumme.

Zur schnellen Plausibilitätsprüfung dienen drei kanonische Testvektoren: Die leere Eingabe (`""`, 0 Bytes) liefert stets `d41d8cd98f00b204e9800998ecf8427e`, die fünf UTF-8-Bytes `Hallo` ergeben `d1bf93299de1b68e6d382c893bf1215f`, während `Hallo\n` (mit Unix-Zeilenumbruch durch `echo`) bereits auf `3290ec3c19a8a39362f7d70043f15627` springt.

## Kryptoanalyse: Warum MD5 für Sicherheitszwecke unzulässig ist

Bereits 2004 demonstrierten Xiaoyun Wang und Hongbo Yu praktikable Kollisionsangriffe per modularer Differentialkryptoanalyse. Mit Werkzeugen wie `fastcoll` lassen sich heute auf handelsüblicher Laptop-Hardware innerhalb von Millisekunden zwei verschiedene Dateien mit identischem MD5-Hash erzeugen. Noch gravierender sind **Chosen-Prefix-Kollisionen** (Stevens et al., 2008): Dabei können zwei beliebig vorgegebene Dateianfänge durch angehängte Kollisionsblöcke auf denselben MD5-Wert gezwungen werden. Auf diese Weise wurde 2008 ein gefälschtes Zwischenzertifikat einer Zertifizierungsstelle (*Rogue CA*) konstruiert, und 2012 nutzte die Flame-Malware exakt diesen Angriffstyp zur Fälschung einer Microsoft-Code-Signatur.

Hinzu kommt die enorme Rechengeschwindigkeit moderner GPUs, die über 100 Milliarden ungesalzene MD5-Berechnungen pro Sekunde erreichen. Deshalb muss streng zwischen legitimen Bestandsanwendungen und verbotenen Sicherheitskontexten unterschieden werden:

| Einsatzszenario | MD5 zulässig? | Technische Begründung | Empfohlene Alternative |
| :--- | :--- | :--- | :--- |
| Cache-Schlüssel (Redis, Varnish) & interne Deduplizierung | **Ja (ohne Angreifer)** | Schnelle Gleichverteilung bei vertrauenswürdigen Daten | `BLAKE3` oder `xxHash64` |
| Erkennung zufälliger Bitfehler in internen Pipelines | **Bedingt** | Erkennt Übertragungsfehler, aber keine gezielte Manipulation | `SHA-256` oder `CRC32C` |
| AWS S3 `Content-MD5`-Header & Single-Part-ETag | **Protokollbedingt** | Von älteren S3-Clients und HTTP-RFC 1864 vorgegeben | `x-amz-checksum-sha256` |
| Gravatar-Legacy-URLs in Bestandssystemen | **Legacy** | Historische E-Mail-Normalisierung, seit 2024 abgelöst | `SHA-256` (aktueller Gravatar-Standard) |
| Integritätsprüfung öffentlicher Downloads & ISOs | **Nein** | Angreifer können manipulierte Binaries kollisionsgleich signieren | [SHA256-Generator](/de/werkzeuge/sha256-generator) + GPG |
| Passwortspeicherung, API-Auth & digitale Signaturen | **Strikt verboten** | GPU-Brute-Force, Rainbow Tables und Chosen-Prefix-Kollisionen | `Argon2id` / [HMAC-Generator](/de/werkzeuge/hmac-generator) |

Benötigen Sie statt MD5 einen direkten Vergleich über moderne Algorithmen wie SHA-256, SHA-512 oder SHA-3, wechseln Sie unmittelbar zu unserem [Hash-Generator](/de/werkzeuge/hash-generator).

## Praxis-Fallstricke und schrittweise Migration von Bestandssystemen

In realen Projekten sorgen vier MD5-Besonderheiten regelmäßig für vermeintlich unerklärliche Abweichungen:

- **AWS-S3-Multipart-ETag**: Lädt ein Client eine Datei in einem Stück hoch, stimmt der HTTP-Header `ETag` mit dem normalen MD5-Hash überein. Bei einem Multipart-Upload (häufig bereits ab 5 MB oder 8 MB) bildet S3 jedoch den MD5 über die konkatenierten **rohen 16-Byte-MD5-Digests** aller hochgeladenen Teile und ergänzt das Suffix `-<Teileanzahl>` (etwa `9bb58f26192e4ba00f01e2e7b136bbd8-5`). Ein einfacher `md5sum`-Abgleich schlägt hier zwangsläufig fehl.
- **Base64-kodierter `Content-MD5`-Header**: Nach RFC 1864 erwarten S3- und HTTP-APIs nicht die 32 Hex-Zeichen, sondern die 24 Zeichen lange Base64-Kodierung der 16 Rohbytes. Zum Prüfen der Kodierung lässt sich ergänzend der [Base64-Encoder](/de/werkzeuge/base64-encode) nutzen.
- **Gravatar-Normalisierung**: Vor dem Hashen müssen führende und nachgestellte Leerzeichen entfernt und alle Buchstaben kleingeschrieben werden – für `dev@example.de` ergibt dies `e65ea14d3b1f161e5c5bb790ba8f149d`.
- **Namensbasierte UUIDv3 (RFC 9562)**: Ältere verteilte Systeme leiten deterministische 128-Bit-Kennungen per MD5 über Namespace und Name ab (`UUIDv3`), setzen Versions- und Variantenbits jedoch explizit um; für moderne IDs nutzen Sie besser UUIDv4/v7 im [UUID-Generator](/de/werkzeuge/uuid-generator).

Müssen Sie ein historisches System von MD5 ablösen, bewährt sich eine **unterbrechungsfreie Dual-Phase**: Für Legacy-Passwortdatenbanken werden bestehende MD5-Einträge sofort per *Envelope-Hashing* (`Argon2id(MD5(passwort))`) gekapselt und beim nächsten erfolgreichen Benutzer-Login transparent auf reines `Argon2id(passwort)` umgespeichert. Bei Datei-Verteilungen und Cloud-Uploads liefern Release-Pipelines übergangsweise sowohl `MD5SUMS` als auch `SHA256SUMS` aus, während S3-Integrationen auf den Header `x-amz-checksum-sha256` migriert werden.

## CLI-, Code-Beispiele und speicherschonendes 2-MB-Streaming

Für automatisierte Skripte und den Abgleich mit lokalen Prüfsummen im Terminal stehen systemeigene Befehle sowie Streaming-Implementierungen zur Verfügung:

```bash
# Linux: Text ohne Zeilenumbruch, Einzeldatei und Batch-Manifest prüfen
printf '%s' 'Hallo' | md5sum
md5sum backup-2026.tar.gz
md5sum -c MD5SUMS

# macOS (BSD md5) und Windows PowerShell
md5 -r backup-2026.tar.gz
Get-FileHash -Path .\backup-2026.tar.gz -Algorithm MD5
```

```python
import hashlib

def md5_datei_stream(pfad: str, chunk_groesse: int = 2 * 1024 * 1024) -> str:
    h = hashlib.md5()
    with open(pfad, "rb") as f:
        while block := f.read(chunk_groesse):
            h.update(block)
    return h.hexdigest()
```

Nach exakt demselben Prinzip arbeitet auch dieser Online-Generator im Browser: Große Dateien werden in **2-MB-Segmenten** über `File.slice()` und `FileReader` eingelesen und inkrementell verarbeitet, sodass weder Arbeitsspeicher-Spitzen noch blockierte Browser-Tabs entstehen. Gleichzeitig bleiben sämtliche Daten vollständig lokal auf Ihrem Rechner.
