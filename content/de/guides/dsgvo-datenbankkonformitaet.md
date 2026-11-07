---
title: "DSGVO-Datenbankkonformität: Technischer Leitfaden für Entwickler"
description: "Praxisleitfaden zu Artikel 25 und 32 DSGVO — Datenminimierung, Verschlüsselung, Pseudonymisierung und Audit-Logging für relationale und NoSQL-Datenbanken."
---

## Technische Anforderungen der DSGVO an Datenbankarchitekturen

Die **Datenschutz-Grundverordnung (DSGVO / GDPR)** verpflichtet Entwicklungsteams und Datenbankadministratoren zu konkreten technischen und organisatorischen Maßnahmen (TOM) beim Umgang mit personenbezogenen Daten.

### Artikel 25 DSGVO: Datenschutz durch Technikgestaltung (Privacy by Design)
- **Datenminimierung**: Speicherung ausschließlich jener Attribute, die für den jeweiligen Verarbeitungszweck zwingend erforderlich sind.
- **Schutz von Test- und Staging-Systemen**: Produktive Datenbank-Dumps dürfen niemals ungeschwärzt in Entwicklungs- oder QA-Umgebungen importiert werden.

### Artikel 32 DSGVO: Sicherheit der Verarbeitung & Pseudonymisierung
- **Kryptografische Pseudonymisierung**: Ersetzung direkter Identifikatoren durch gesalzene SHA-256-Hashes oder konsistente Tokens, sodass die referentielle Integrität von Primär- und Fremdschlüsseln erhalten bleibt.
- **Recht auf Löschung (Artikel 17 DSGVO)**: Gezielte Überschreibung personenbezogener Felder in Benutzerdatensätzen, ohne buchhalterische Summen- und Transaktionstabellen zu beschädigen.
