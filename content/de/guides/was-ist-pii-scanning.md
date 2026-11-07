---
title: "Was ist PII-Scanning? Kompletter Leitfaden zur Erkennung sensibler Daten"
description: "Erfahren Sie, wie das Scannen personenbezogener Daten (PII) funktioniert, welche sensiblen Identifikatoren Datenbanken enthalten und wie Sie Datenschutzverletzungen verhindern."
---

## Was sind personenbezogene Daten (PII)?

**Personenbezogene Daten (Personally Identifiable Information, PII)** umfassen alle Einzelangaben über persönliche oder sachliche Verhältnisse einer bestimmten oder bestimmbaren natürlichen Person. In relationalen SQL-Datenbanken, JSON-Dokumenten und CSV-Exporten spürt **automatisiertes PII-Scanning** sensible Datenfelder auf, bevor Produktionsdaten in Staging-, Test- oder Analyseumgebungen gelangen.

### Direkte Identifikatoren vs. Quasi-Identifikatoren
- **Direkte Identifikatoren**: Vollständiger Name, Sozialversicherungsnummer, Steuer-ID, E-Mail-Adresse, Telefonnummer, IBAN, Kreditkartennummer (PAN) und IP-Adresse.
- **Quasi-Identifikatoren**: Geburtsdatum, Postleitzahl, Berufsbezeichnung und Standortdaten, die in Kombination eine Re-Identifizierung ermöglichen.

## Funktionsweise moderner Client-Side PII-Scanner

Leistungsfähige PII-Erkennungssysteme kombinieren drei Prüfebenen:
1. **Schema- und Spaltenheuristik**: Auswertung von Feldnamen (`email`, `telefon`, `iban`, `geburtsdatum`) in SQL-Schemata und CSV-Kopfzeilen.
2. **Reguläre Ausdrücke & Prüfsummenvalidierung**: Mathematische Verifikation über den **Luhn-Algorithmus (Modulo 10)** für Zahlungskarten sowie strukturierte Mustererkennung.
3. **Lokale In-Browser-Maskierung**: Unmittelbare Pseudonymisierung mittels SHA-256-Hashing, Tokenisierung oder synthetischer Ersatzwerte ohne Server-Upload.
