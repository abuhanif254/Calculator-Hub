---
title: "Datenmaskierungstechniken: Hashing, Tokenisierung & Schwärzung im Vergleich"
description: "Vergleichen Sie die wirksamsten Methoden zur Datenmaskierung — kryptografisches Hashing, Tokenisierung, Redaktion, Pseudonymisierung und formatbewahrende Verschlüsselung."
---

## Methoden der Datenmaskierung im technischen Vergleich

Die Wahl des richtigen Maskierungsverfahrens richtet sich danach, ob Feldlängen, Prüfsummen oder relationale Fremdschlüsselbeziehungen (`JOIN`) erhalten bleiben müssen.

### 1. Vollständige und partielle Schwärzung (Redaction)
Ersetzt sensible Zeichenfolgen durch feste Platzhalter (`[REDACTED]` oder `****-****-****-4242`).Optimal für Logdateien, Support-Ansichten und Dokumentenexporte.

### 2. Kryptografisches Hashing mit Salt (Salted SHA-256)
Überführt Eingabewerte unumkehrbar in einen Hashwert fester Länge. Durch einen geheimen Salt erzeugt derselbe Ursprungswert deterministisch denselben Hash, sodass Datenbank-Joins und Dublettenprüfungen in Testsystemen weiterhin funktionieren.

### 3. Formatbewahrende synthetische Ersetzung
Generiert realistische, aber vollständig fiktive Namen, E-Mail-Adressen und Telefonnummern, die alle Datenbank-Constraints und Validierungsregeln der Anwendung erfüllen.
