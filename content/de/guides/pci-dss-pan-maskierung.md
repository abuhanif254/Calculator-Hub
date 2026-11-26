---
title: "PCI DSS PAN-Maskierung: Schutz von Karteninhaberdaten in Datenbanken"
description: "Technischer Leitfaden zu PCI DSS v4.0 Anforderung 3 — wie Sie Primary Account Numbers (PAN) maskieren, kürzen, hashen und tokenisieren, um Karteninhaberdaten rechtskonform zu schützen."
category: "Privacy & Security"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "database-anonymizer"
relatedType: "tool"
faqs:
  - question: "Wie viele Ziffern einer Kreditkartennummer dürfen maximal angezeigt werden?"
    answer: "Gemäß PCI DSS v4.0 Anforderung 3.4.1 dürfen bei der Anzeige der Primary Account Number (PAN) maximal die ersten sechs (BIN/IIN) und die letzten vier Ziffern sichtbar sein. Jeder weitergehende Klartext erfordert eine dokumentierte geschäftliche Notwendigkeit und strikte Rollenbeschränkung."
  - question: "Reicht einfaches SHA-256-Hashing zur Speicherung von PANs unter PCI DSS v4.0?"
    answer: "Nein. PCI DSS v4.0 Anforderung 3.5.1.2 (verbindlich seit dem 31. März 2025) schreibt zwingend schlüsselbasierte kryptografische Einweg-Hashes wie HMAC-SHA-256 vor. Ungekeyte Hashes oder einfache statische Salts gelten angesichts moderner GPU-Leistung nicht mehr als ausreichend sicher."
  - question: "Darf ich gleichzeitig die gekürzte PAN und einen Hash derselben Karte speichern?"
    answer: "Nur unter strengen Auflagen nach Anforderung 3.5.1.1 und 3.5.1.2. Wenn sowohl die gekürzte PAN (erste 6 und letzte 4 Ziffern) als auch ein ungekeyter Hash gespeichert werden, lassen sich die fehlenden sechs Mittelziffern in Millisekunden erraten. Bei paralleler Speicherung sind starke kryptografische Schlüssel oder getrennte Systeme Pflicht."
  - question: "Darf der Kartenprüfcode (CVV/CVC) verschlüsselt in der Datenbank gespeichert werden?"
    answer: "Nein. Der dreistellige oder vierstellige Card Verification Code zählt zu den Sensitive Authentication Data (SAD). Nach PCI DSS Anforderung 3.3.1 ist jede Speicherung von SAD nach erfolgter Autorisierung streng untersagt — selbst in verschlüsselter oder gehashter Form."
  - question: "Wie reduziert Tokenisierung den Umfang meines PCI-DSS-Audits?"
    answer: "Ersetzt ein zentraler Token-Tresor innerhalb der Cardholder Data Environment (CDE) die echte PAN durch ein wertloses Stellvertreter-Token, verlassen keine Karteninhaberdaten diesen Tresor. Nachgelagerte Bestell-, Analyse- und Testdatenbanken fallen dadurch regelmäßig aus dem direkten PCI-DSS-Prüfungsumfang heraus."
---

Der **Payment Card Industry Data Security Standard (PCI DSS v4.0 / v4.0.1)** verpflichtet alle Organisationen, die Zahlungskartendaten speichern, verarbeiten oder übertragen, zum umfassenden Schutz der **Primary Account Number (PAN)**. Die 13- bis 19-stellige Kartennummer bildet das zentrale Identifikationsmerkmal im Zahlungsverkehr und unterliegt in **Anforderung 3** strengen Vorgaben für Anzeige, Speicherung und Schlüsselverwaltung.

Seit dem vollständigen Inkrafttreten der zukunftsgerichteten Anforderungen von PCI DSS v4.0 am **31. März 2025** gelten verschärfte Regeln für kryptografische Verfahren: Ungekeyte Einweg-Hashes sind unzulässig, und jede Speicherung sensibler Authentifizierungsdaten (SAD) nach der Autorisierung bleibt ausnahmslos verboten. Für Datenbankarchitekten gilt daher das Prinzip, Klartext-PANs durch Kürzung, Tokenisierung oder schlüsselbasierte Hashes vollständig aus Anwendungs- und Testdatenbanken zu verbannen.

## PCI DSS v4.0 Anforderungen 3.4 und 3.5 im Detail

PCI DSS unterscheidet strikt zwischen der **Maskierung bei der Anzeige** (Anforderung 3.4) und der **Unlesbarmachung bei der Speicherung** (Anforderung 3.5). Maskierung auf der Benutzeroberfläche schützt vor unbefugtem Mitlesen, macht gespeicherte Daten in der Datenbank jedoch nicht automatisch compliant.

### Anzeigeregel: Maximal BIN + letzte 4 Ziffern (Anforderung 3.4.1)

Bei jeder Darstellung einer PAN auf Bildschirmen, Belegen, Abrechnungen oder in Support-Systemen gilt die Obergrenze:

```text
Sichtbare Ziffern <= Erste 6 Ziffern (BIN) + Letzte 4 Ziffern
```

Bei einer 16-stelligen Karte bleiben damit mindestens **6 Ziffern** in der Mitte durch Platzhalter wie `*` oder `X` verdeckt (z. B. `453201******7891` oder noch sparsamer `************7891`). Vollständige PANs dürfen ausschließlich autorisierte Rollen mit nachgewiesenem Geschäftsbedarf einsehen.

### Zulässige Speicherverfahren (Anforderung 3.5.1)

Um gespeicherte PANs in jeder Datenbank — einschließlich Backups, Logs und Analyse-Systemen — unlesbar zu machen, lässt PCI DSS exakt vier Mechanismen zu:

1. **Irreversible Kürzung (Truncation):** Dauerhafte Löschung der nicht benötigten Mittelziffern, sodass niemals mehr Segmente existieren, als zur Identifikation erforderlich sind (meist nur die letzten vier Ziffern).
2. **Schlüsselbasierte Einweg-Hashes (Anforderung 3.5.1.2):** Berechnung von `HMAC-SHA-256(K, PAN)` oder einer vergleichbaren Funktion mit einem geheimen kryptografischen Schlüssel `K`, der getrennt vom Hash in einem HSM oder KMS verwaltet wird.
3. **Indextoken (Tokenization):** Ersetzung der PAN durch ein kryptografisch zufälliges oder formatkonformes Token ohne mathematische Rückführbarkeit ohne Zugriff auf den Token-Tresor.
4. **Starke Kryptografie:** Verschlüsselung der PAN (z. B. AES-256-GCM) mit strikter Schlüsseltrennung, Rotation und Zugriffskontrolle gemäß Anforderung 3.6 und 3.7.

## Rechenbeispiel: Luhn-Validierung, Trunkierung und Angriffswiderstand

Prüfen wir die technischen Mechanismen anhand einer Test-PAN mit 16 Ziffern: `4532 0155 8812 7891`.

1. **Luhn-Prüfziffer verifizieren (Mod-10-Algorithmus):** Von rechts nach links wird jede zweite Ziffer (Positionen 15, 13, 11, 9, 7, 5, 3, 1 von links gezählt) verdoppelt; ist das Produkt größer als `9`, wird die Quersumme gebildet (`d_i × 2 − 9`):
   - Verdoppelte Positionen: `4→8`, `3→6`, `0→0`, `5→10 (1)`, `8→16 (7)`, `1→2`, `7→14 (5)`, `9→18 (9)`. Summe: `8 + 6 + 0 + 1 + 7 + 2 + 5 + 9 = 38`.
   - Unveränderte Positionen (inkl. Prüfziffer `1`): `5 + 2 + 1 + 5 + 8 + 2 + 8 + 1 = 32`.
   - Gesamtsumme: `38 + 32 = 70`. Da `70 mod 10 = 0`, ist die Testnummer strukturell gültig.
2. **Gefahr bei gekoppelter Speicherung (BIN+4 + ungekeyter Hash):**
   Speichert ein System `453201******7891` gemeinsam mit einem ungekeyten `SHA-256(PAN)`, bleiben genau **6 unbekannte Ziffern** in der Mitte (`000000` bis `999999`). Der effektive Suchraum sinkt von `10^15` (unter Berücksichtigung der Luhn-Prüfziffer) auf:
   `10^6 = 1.000.000` Kandidaten (mit Luhn-Filter sogar nur `100.000` gültige Kombinationen).
   Auf einer Standard-CPU lassen sich `100.000` SHA-256-Hashes in unter **20 Millisekunden** berechnen. Die Kombination aus partieller Anzeige und ungekeytem Hash macht die gesamte PAN faktisch zum Klartext.
3. **Audit-Scope-Berechnung durch Tokenisierung:**
   Hält ein Händler `500.000` Zahlungsdatensätze über `12` interne Microservices (Bestellung, Versand, BI, Support, Test-DB) verteilt, unterliegen ohne Tokenisierung alle 12 Systeme den strengen CDE-Kontrollen. Verlagert man die echte PAN in einen einzigen isolierten Vault und verteilt ausschließlich ein 16-stelliges Zufallstoken (Speicherbedarf unverändert `500.000 × 16 Bytes ≈ 7,63 MiB`), reduziert sich der direkte CDE-Scope für die gespeicherte PAN auf **1 von 12 Systemen** (`−91,7 %` Angriffsfläche).

## Vergleich der Schutzmechanismen nach PCI DSS v4.0

| Methode | PCI-DSS-Referenz | CDE-Scope-Reduktion | Joins & Dublettenprüfung | Schlüsselverwaltung nötig | Größtes Risiko bei Fehlkonfiguration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Anzeigemaskierung (BIN+4)** | Req. 3.4.1 | Keine (nur UI-Schutz) | Nicht anwendbar | Nein | Klartext liegt weiter im Backend/DOM |
| **Irreversible Kürzung** | Req. 3.5.1 | Vollständig (wenn CDE frei) | Nur grob über letzte 4 Ziffern | Nein | Kombination mit Hash derselben PAN |
| **Keyed HMAC-SHA-256** | Req. 3.5.1.2 | Hoch (falls Schlüssel getrennt) | Vollständig (deterministisch) | Ja (KMS/HSM Pflicht) | Statischer Salt oder Schlüssel im Code |
| **Tokenisierung (Vault)** | Req. 3.5.1 | Sehr hoch (isoliert CDE) | Vollständig (mit Token-ID) | Vault-Zugriffskontrolle | Rückschluss durch fortlaufende Tokens |
| **AES-256-GCM** | Req. 3.5.1 / 3.6 | Gering (bleibt im CDE) | Nur mit statischem IV (unsicher) | Ja (strikte Rotation) | Klartextschlüssel auf demselben Host |
| **Formatbewahrende FPE** | Req. 3.5.1 | Mittel (Schema-Erhalt) | Vollständig | Ja (strenge Schlüsselpolitik) | Luhn-Erhalt bei schwacher Schlüsselwahl |

## Typische Audit-Befunde, Betriebsrisiken und Entwicklungsumgebungen

In PCI-DSS-Assessments (ROC/SAQ) führen wiederkehrend dieselben Implementierungsfehler zu Nachbesserungsauflagen:

* **Verbotene Speicherung von CVV/CVC und Magnetstreifen:** Sensitive Authentication Data (SAD) dürfen nach Abschluss der Zahlungsautorisierung unter keinen Umständen persistiert werden — weder in Datenbankspalten noch in Debug-Logs von Payment-Gateways oder Message-Queues.
* **Unbeabsichtigte PAN-Leaks in Logs und Fehlerberichten:** Ausnahme-Stacktraces, HTTP-Request-Logs oder APM-Traces erfassen häufig ungefilterte Formular-Payloads. Implementieren Sie zentrale Log-Filter, die Ziffernfolgen mit Luhn-Validierung automatisch vor dem Schreiben schwärzen.
* **Kartennummern in Entwicklungs- und QA-Systemen:** Nach PCI DSS Anforderung 6.5.3 ist die Verwendung echter Produktions-PANs in Test- und Entwicklungsumgebungen grundsätzlich untersagt. Bevor Sie Datenbank-Dumps in lokale oder Staging-Umgebungen laden, sollten sämtliche PAN-Spalten lokal auf dem gesicherten System durch synthetische Luhn-kompatible Testnummern ersetzt oder gekürzt werden — beispielsweise mit unserem [Datenbank-Anonymisierer](/de/werkzeuge/database-anonymizer).
