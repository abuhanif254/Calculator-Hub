---
metaTitle: "Passwort-Generator: Sichere Passwörter & Entropie-Test"
metaDescription: "Erstellen Sie kryptografisch sichere Passwörter und Diceware-Passphrasen offline im Browser – mit CSPRNG, Entropie-Rechner, WLAN-Presets und QR-Export."
metaKeywords: "passwort generator, sicheres passwort erstellen, passwort entropie berechnen, passphrase generator, diceware deutsch, csprng passwort, wlan passwort erstellen, passwort stärke prüfen"
title: "Erweiterter Passwort-Generator"
shortDescription: "Generieren Sie kryptografisch sichere Zufallspasswörter und einprägsame Passphrasen direkt im Browser über die Web Crypto API. Konfigurieren Sie Zeichensätze, Sicherheits-Presets, Entropie-Metriken und QR-Codes vollständig offline."
faqs:
  - question: "Warum nutzt der Passwort-Generator window.crypto.getRandomValues() statt Math.random()?"
    answer: "Math.random() basiert in JavaScript-Engines auf einem deterministischen Pseudozufallsgenerator wie xorshift128+, dessen interner Zustand sich aus beobachteten Ausgaben rekonstruieren lässt. Die Web Crypto API greift dagegen direkt auf den kryptografisch sicheren Zufallsgenerator (CSPRNG) des Betriebssystems zu und liefert unvorhersehbare 32-Bit-Entropiewerte."
  - question: "Wie wird die Passwort-Entropie berechnet und ab wie vielen Bits gilt ein Kennwort als sicher?"
    answer: "Bei gleichverteilten Zufallszeichen gilt die Shannon-Formel E = L × log₂(R), wobei L die Zeichenlänge und R die Größe des Zeichenpools bezeichnet. Für reguläre Benutzerkonten empfehlen sich mindestens 70 bis 80 Bit; für Master-Passwörter, SSH-Passphrasen, API-Secrets und Festplattenverschlüsselung sollten 100 bis 128 Bit oder mehr erreicht werden."
  - question: "Wann sind Diceware-Passphrasen besser geeignet als zufällige Zeichenfolgen?"
    answer: "Passphrasen aus vier bis sechs zufällig gezogenen Wörtern lassen sich deutlich leichter merken und fehlerfrei abtippen als kryptische Sonderzeichenketten. Sie eignen sich ideal für Master-Passwörter von Passwort-Managern, Betriebssystem-Logins und Laufwerksverschlüsselungen (BitLocker, LUKS, FileVault), wo kein Autofill verfügbar ist."
  - question: "Was bewirken die Filter 'Ähnliche Zeichen ausschließen' und 'Mehrdeutige Symbole entfernen'?"
    answer: "Der Ähnlichkeitsfilter entfernt optisch leicht verwechselbare Glyphen wie I, l, 1, O, 0 und |, was beim manuellen Eingeben von WLAN-Schlüsseln oder Notfallcodes Tippfehler verhindert. Der Filter für mehrdeutige Symbole schließt zudem Sonderzeichen wie Klammern, Anführungszeichen und Schrägstriche aus, die in Shells, URLs oder älteren Formularen Probleme verursachen können."
  - question: "Werden generierte Passwörter, Verlaufseinträge oder QR-Codes an einen Server übertragen?"
    answer: "Nein. Sowohl die Zufallserzeugung als auch die Entropieanalyse und das Zeichnen des QR-Codes auf einem HTML-Canvas erfolgen zu 100 % lokal im Arbeitsspeicher Ihres Browsers. Der optionale Verlauf speichert maximal 30 Einträge ausschließlich im lokalen localStorage Ihres Geräts und lässt sich jederzeit vollständig löschen."
features:
  - "Kryptografisch sichere Zufallserzeugung (CSPRNG) über window.crypto.getRandomValues() der nativen Web Crypto API – 100 % lokal und offline"
  - "Drei Generatormodi: Zufallszeichen bis 128 Stellen, einprägsame Wort-Zahlen-Kombinationen und Diceware-Passphrasen mit wählbarem Trennzeichen"
  - "Vorkonfigurierte Sicherheits-Presets für Gaming, Online-Banking, WLAN (WPA2/WPA3), Entwickler-Secrets (32 Zeichen) und Unternehmensrichtlinien"
  - "Feingranulare Ausschlussfilter für optisch ähnliche Zeichen (I, l, 1, O, 0), mehrdeutige Symbole sowie Zeichenwiederholungen und Tastatursequenzen"
  - "Echtzeit-Entropieanalyse in Bits mit geschätzter Knackdauer für Online- und Offline-Brute-Force-Szenarien sowie automatischen Musterwarnungen"
  - "Stapelgenerierung mehrerer Kennwörter, lokaler Canvas-QR-Code für Mobilgeräte, TXT-Export und lokal löschbarer Sitzungsverlauf"
useCases:
  - "Erstellung von 20- bis 32-stelligen Master-Passwörtern, Datenbank-Zugangsdaten und Geheimnissen für CI/CD-Umgebungen"
  - "Generierung fehlerfrei ablesbarer WPA3-WLAN-Schlüssel ohne verwechselbare Zeichen (0/O, 1/l/I) inklusive schnellem QR-Code-Scan"
  - "Einrichtung einprägsamer Diceware-Passphrasen für Festplattenverschlüsselung (BitLocker, LUKS, FileVault) und Passwort-Manager"
  - "Umsetzung aktueller Compliance-Empfehlungen nach BSI IT-Grundschutz, ISO 27001 und NIST SP 800-63B bei neuen Dienst- und Admin-Konten"
  - "Erzeugung kompatibler Zugangsdaten für Banking-Portale, Legacy-Systeme und Shell-Skripte ohne problematische Escape-Sonderzeichen"
  - "Stapelweise Erstellung einzigartiger Initialpasswörter für Staging-Systeme, Testkonten und interne IT-Rollouts"
howToSteps:
  - "Wählen Sie den gewünschten Generatormodus: 'Zufällig' für maximale Zeichendichte, 'Einprägsam' für Wort-Ziffern-Kombinationen oder 'Passphrase' für Diceware-Wortketten."
  - "Übernehmen Sie bei Bedarf ein Sicherheits-Preset (z. B. WLAN, Banking, Entwickler oder Enterprise) oder stellen Sie Zeichenlänge bzw. Wortanzahl individuell ein."
  - "Aktivieren oder deaktivieren Sie Großbuchstaben, Kleinbuchstaben, Ziffern sowie benutzerdefinierte Sonderzeichen und legen Sie im Passphrase-Modus das Trennzeichen fest."
  - "Schalten Sie bei Bedarf erweiterte Filter zu, um ähnliche Glyphen (I/l/1, O/0), mehrdeutige Symbole, direkte Wiederholungen oder Zeichensequenzen auszuschließen."
  - "Kontrollieren Sie die Echtzeit-Entropieanzeige (Bits, Stärke-Score, Online-/Offline-Knackzeit) und erhöhen Sie optional die Stapelanzahl für mehrere Passwörter auf einmal."
  - "Kopieren Sie das Ergebnis mit einem Klick, exportieren Sie den Stapel als TXT-Datei oder öffnen Sie den lokalen QR-Code zur direkten Übernahme auf Ihr Smartphone."
---

Ein starkes Passwort schützt Konten, Server, API-Zugänge und verschlüsselte Datenträger nicht durch komplexe Merktricks, sondern durch mathematisch messbare Unvorhersehbarkeit. Dieser **Passwort-Generator** erzeugt kryptografisch belastbare Zufallskennwörter, einprägsame Wortkombinationen und Diceware-Passphrasen vollständig clientseitig im Browser – ohne jede Netzwerkkommunikation. Gleichzeitig berechnet die integrierte Analyse-Engine in Echtzeit die effektive Entropie in Bits, erkennt Schwächen wie Zeichenwiederholungen oder Tastatursequenzen und schätzt Widerstandszeiten gegen Online- und Offline-Angriffe ab. Damit deckt das Werkzeug sowohl alltägliche Anforderungen wie robuste WLAN-Schlüssel als auch sicherheitskritische Administrations-Workflows nach den Leitlinien von **BSI IT-Grundschutz** und **NIST SP 800-63B** ab.

## Kryptografische Zufallserzeugung: CSPRNG statt Math.random()

Gewöhnliche Zufallsfunktionen wie `Math.random()` sind für sicherheitsrelevante Kennwörter grundsätzlich ungeeignet. JavaScript-Engines wie V8 implementieren `Math.random()` als deterministischen Pseudozufallsgenerator (*xorshift128+*), der auf Geschwindigkeit ausgelegt ist. Bereits eine kleine Folge beobachteter Ausgabewerte genügt einem Angreifer mit einem SMT-Solver, um den internen 128-Bit-Zustand zu rekonstruieren und vergangene wie künftige Ausgaben exakt vorherzusagen.

Der Generator greift deshalb ausschließlich auf die **Web Crypto API** (`window.crypto.getRandomValues()`) zu. Sie speist ein `Uint32Array` direkt aus dem kryptografisch sicheren Zufallsgenerator (**CSPRNG**) des Betriebssystems – unter Linux `getrandom()` bzw. `/dev/urandom`, unter macOS `arc4random_buf` und unter Windows `BCryptGenRandom`. Der Kernel sammelt dafür physikalische Entropie aus Hardware-Rauschquellen (CPU-Jitter, Interrupt-Latenzen, RDRAND/RDSEED) und mischt sie über Algorithmen wie ChaCha20 oder AES-CTR-DRBG.

### Zeichenauswahl, Oversampling und Modulo-Bias

Im Zufallsmodus liest das Tool einen überdimensionierten 32-Bit-Puffer (`length × 4`), um optionale Qualitätsfilter ohne Blockieren auszuführen. Bei aktivem Schutz gegen Wiederholungen oder Sequenzen prüft die Logik, ob das Zeichen bereits vorkommt oder ob benachbarte ASCII-Codepunkte direkt aufeinanderfolgen (`|c₂ - c₁| === 1`, etwa `ab` oder `78`), und zieht bei Treffern neue Zufallswerte nach. Da `2³²` deutlich größer als jeder Standard-Zeichenpool (`R ≤ 94`) ist, bleibt eine eventuelle Restabweichung beim Modulo-Mapping unter `10⁻⁷`; für sicherheitskritische Backend-Bibliotheken empfiehlt sich dennoch exaktes *Rejection Sampling* wie in `crypto.randomInt()`. Ebenso gilt: Jeder zusätzliche Ausschlussfilter verkleinert den effektiven Suchraum leicht – für maschinenlesbare API-Secrets liefert der ungefilterte Zufallsmodus bei 24 bis 32 Stellen die höchste Informationsdichte.

## Entropie-Modell, Zeichenpools und Brute-Force-Realität

Die **Entropie** eines zufällig generierten Passworts beschreibt seine Unvorhersehbarkeit in Bits. Für gleichverteilte Einzelzeichen ergibt sie sich aus Länge `L` und Poolgröße `R`:

```text
E_Zeichen    = L × log₂(R)
E_Passphrase = W × log₂(N)   (W = Wörter, N = Wortlistengröße)
```

Praxisrelevant ist vor allem das zugrunde liegende Angriffsmodell. Bei einem **Online-Angriff** gegen ein Login-Formular drosseln Rate-Limits, Captchas und Kontosperren Angreifer typischerweise auf rund `100` Versuche pro Sekunde. Gelangt jedoch eine gestohlene Passwort-Datenbank in fremde Hände, laufen **Offline-Brute-Force-Angriffe** auf spezialisierten GPU-Clustern ungebremst. Wurden Passwörter serverseitig fahrlässig mit schnellen Hashfunktionen wie ungesalzenem MD5 oder SHA-1 gespeichert, erreichen moderne GPU-Rigs bis zu `10¹²` Prüfungen pro Sekunde. Erst moderne, speicherharte Schlüsselableitungsfunktionen (*Key Derivation Functions*) wie **Argon2id**, **scrypt** oder **bcrypt** mit individuellem Salt verlangsamen Offline-Cracking um viele Größenordnungen. Gegen **Credential Stuffing** – also das automatisierte Durchprobieren geleakter Zugangsdaten auf fremden Plattformen – hilft jedoch ausschließlich ein einzigartiges Passwort pro Konto.

| Konfiguration / Preset | Zeichenpool `R` bzw. Wortliste | Länge | Entropie (ca.) | Offline-Resistenz (`10¹²` Hashes/s) | Empfohlener Einsatz |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 6-stellige Ziffern-PIN | `10` (0–9) | 6 Zeichen | 19,9 Bit | Sofort (< 1 ms) | Nur mit Hardware-Sperre (SIM) |
| Gaming-Preset (gefiltert) | ~`65` | 12 Zeichen | 72,3 Bit | Mehrere Jahre | Konten mit aktiver 2FA |
| Banking-Preset (Alphanumerisch) | `62` (A–Z, a–z, 0–9) | 16 Zeichen | 95,3 Bit | Millionen Jahre | Portale mit Sonderzeichen-Sperre |
| WLAN-Preset (WPA2/WPA3) | `55` (ohne `I,l,1,O,0`) | 20 Zeichen | 115,6 Bit | Billionen Jahre | Router-Schlüssel, Gäste-WLAN |
| Entwickler-Secret (Voll-ASCII) | `94` (inkl. Symbole) | 32 Zeichen | 209,7 Bit | Praktisch unknackbar | DB-Credentials, API-Secrets |
| Diceware-Passphrase (6 Wörter) | `7.776` (EFF-Langliste) | 6 Wörter | 77,5 Bit | Jahrzehnte bis Jahrhunderte | Master-Passwort, Festplatten |

## Filter für Lesbarkeit, Shell-Kompatibilität und Passphrasen

In produktiven Umgebungen scheitern theoretisch optimale Kennwörter oft an Eingabehürden oder strengen Parser-Regeln.

### Homoglyphen- und Sonderzeichenfilter

Serifenlose Schriften machen `I`, `l` und `1` sowie `O` und `0` kaum unterscheidbar. Das Entfernen dieser Glyphen senkt den Pool nur geringfügig (von `62` auf `55` Zeichen, also `0,17` Bit weniger pro Stelle), reduziert Tippfehler bei WLAN-Schlüsseln und Ausdrucken jedoch drastisch. Ebenso verhindert das Ausschließen mehrdeutiger Symbole (`{}[]()/\'"~,;:.<>`), dass Kennwörter in Bash-Skripten, `.env`-Dateien, Datenbank-URIs oder YAML-Konfigurationen als Steuerzeichen fehlinterpretiert werden.

### Passphrasen statt kurzer Sonderzeichenketten

Für Schlüsselkennwörter ohne Autofill – etwa das Master-Passwort eines Tresors oder eine LUKS-Boot-Passphrase – kombiniert der Modus **Passphrase** zufällig gezogene Wörter mit wählbarem Trennzeichen (`-`, `.`, `_`), optionaler Großschreibung und zweistelliger CSPRNG-Zahl. Vier bis sechs unabhängige Wörter liefern hohe Entropie und folgen **NIST SP 800-63B**, das Länge und Einzigartigkeit klar vor erzwungenen Sonderzeichen-Regeln und periodischen Passwortwechseln priorisiert.

## Praxisbeispiele für Entwickler und DevOps-Pipelines

Für eigene Node.js-Dienste empfiehlt sich ebenfalls eine CSPRNG-API mit verzerrungsfreier (*rejection-sampling*) Indexwahl wie `crypto.randomInt()`:

```javascript
import { randomInt } from "node:crypto";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*+-=";

export function generateSafePassword(length = 24) {
  let result = "";
  for (let i = 0; i < length; i++) {
    // randomInt vermeidet Modulo-Bias durch Rejection Sampling
    result += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return result;
}
```

Für Infrastruktur-Secrets direkt im Terminal erzeugt OpenSSL URL-sichere Schlüssel mit 192 Bit Entropie:

```bash
openssl rand -base64 24 | tr '+/' '-_' | tr -d '='
```

## Lokale Ausführung und verwandte Sicherheitswerkzeuge

Alle Berechnungen – einschließlich der Canvas-basierten QR-Code-Erzeugung – laufen isoliert in Ihrer Browser-Sandbox. Kein Kennwort verlässt das Gerät; der Verlauf speichert höchstens 30 Einträge im lokalen `localStorage` und lässt sich jederzeit löschen. Für angrenzende Workflows stehen der [Zufalls-String-Generator](/de/werkzeuge/random-string-generator), der [HMAC-Generator](/de/werkzeuge/hmac-generator), der [SHA-256-Generator](/de/werkzeuge/sha256-generator), der [UUID-Generator](/de/werkzeuge/uuid-generator) sowie der [QR-Code-Generator](/de/werkzeuge/qr-code-generator) bereit.
