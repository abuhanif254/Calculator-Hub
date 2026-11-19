---
title: "Provisionsrechner"
metaTitle: "Provisionsrechner: Staffel, Makler-Split & Zielumsatz"
description: "Kalkulieren Sie Verkaufsprovisionen, progressive Provisionsstaffeln, Immobilienmakler-Splits, Affiliate-Vergütungen sowie den erforderlichen Zielumsatz präzise."
metaDescription: "Provisionsrechner für Vertrieb, Immobilienmakler und Affiliates: Staffelprovision, Rückwärtsrechnung, Makler-Split und Netto-Auszahlung exakt berechnen."
metaKeywords: "Provisionsrechner, Staffelprovision berechnen, Maklerprovision Split, Verkaufsprovision Formel, Zielumsatz berechnen, Affiliate Provision, Handelsvertreter Provision, Vertriebsvergütung"
faqs:
  - question: "Worin unterscheiden sich durchgerechnete und durchstoßende Staffelprovisionen?"
    answer: "Bei einer durchgerechneten (progressiven) Staffel gilt der höhere Prozentsatz jeweils nur für den Umsatzanteil innerhalb der neuen Stufe – ähnlich der Einkommensteuerprogression. Bei einer durchstoßenden Staffel greift der höhere Satz rückwirkend ab dem ersten Euro des Gesamtumsatzes, was an Stufengrenzen sprunghafte Auszahlungsdifferenzen auslöst."
  - question: "Wie wird die Immobilienmakler-Provision im DACH-Raum aufgeteilt?"
    answer: "In Deutschland gilt beim Verkauf von Einfamilienhäusern und Eigentumswohnungen an Verbraucher seit Dezember 2020 das Halbteilungsprinzip (§ 656c BGB): Käufer und Verkäufer teilen sich die Courtage hälftig, häufig je 3,57 % inkl. 19 % MwSt. In Österreich gilt bei Mietwohnungen seit 2023 das Bestellerprinzip, beim Kauf meist bis zu 3 % plus 20 % USt. je Seite. In der Schweiz trägt meist der Verkäufer 2 % bis 3 %."
  - question: "Wie berechne ich rückwärts den nötigen Umsatz für mein Wunsch-Einkommen?"
    answer: "Ziehen Sie zunächst feste Zielboni von Ihrer gewünschten Brutto-Provision ab und teilen Sie den Rest durch den Provisionssatz als Dezimalzahl: Zielumsatz = (Wunschprovision − Fixbonus) ÷ (Provisionssatz ÷ 100). Für ein Netto-Ziel müssen Sie vorab Ihren persönlichen Grenzsteuersatz und eventuelle Sozialabgaben hinzurechnen."
  - question: "Wie werden Provisionen in Deutschland steuerlich behandelt?"
    answer: "Bei angestellten Vertriebsmitarbeitern gelten Provisionen als steuer- und sozialversicherungspflichtiger Arbeitslohn; unregelmäßige Quartals- oder Jahresboni werden als sonstiger Bezug versteuert. Selbstständige Handelsvertreter nach § 84 HGB versteuern Provisionen als gewerbliche Einkünfte, zahlen ggf. Gewerbesteuer und weisen in der Regel 19 % Umsatzsteuer aus."
  - question: "Warum koppeln viele Unternehmen Provisionen an den Deckungsbeitrag statt an den Umsatz?"
    answer: "Reine Umsatzprovisionen verleiten Verkäufer dazu, hohe Rabatte zu gewähren, um Abschlüsse schnell zu sichern – selbst wenn die Marge dabei schrumpft. Deckungsbeitragsprovisionen bemessen den Anteil am verbleibenden Rohertrag nach Abzug variabler Kosten und richten den Vertrieb direkt auf profitables Wachstum aus."
---

## Leistungsabhängige Vergütung transparent planen und vergleichen

Ob im B2B-Softwarevertrieb, als selbstständiger Handelsvertreter nach § 84 HGB, im Immobilienbüro oder im Affiliate-Marketing: Variable Vergütungsmodelle steuern maßgeblich das Einkommen auf Vertriebsseite sowie die Akquisekosten auf Unternehmensseite. In der betrieblichen Praxis reicht ein einfacher Prozentaufschlag selten aus, weil Staffelsprünge, Büro-Splits, Franchisegebühren, Plattformmargen und Zielboni unmittelbar ineinandergreifen. Mit dem **Provisionsrechner** prüfen Sie sowohl die direkte Auszahlung als auch den erforderlichen Zielumsatz für ein definiertes Einkommensziel.

## Berechnungsformeln für Basisprovision, Rückwärtsrechnung und Makler-Split

### Grundprovision und Rückwärtsrechnung (Zielumsatz)

Bei einem linearen Vergütungsmodell ergibt sich die Brutto-Provision aus dem provisionsfähigen Nettoumsatz `U`, dem Provisionssatz `s` (in Prozent) und einem vertraglichen Fixbonus `B` bei Zielerreichung:

```
Bruttoprovision       = U × (s ÷ 100) + B
Erforderlicher Umsatz = (Zielprovision − B) ÷ (s ÷ 100)
```

Im kaufmännischen Abrechnungsalltag bezieht sich `U` fast immer auf den **Nettoumsatz ohne Umsatzsteuer** abzüglich Retouren, Rabatten und Skonti.

### Progressive (durchgerechnete) Staffelprovision

Bei gestaffelten Vertriebszielen wird jede Umsatztranche zwischen Untergrenze `U_i` und Obergrenze `O_i` mit ihrem eigenen Prozentsatz `s_i` bewertet:

```
Staffelprovision = Summe über alle Stufen i von:
                   max(0, min(U, O_i) − U_i) × (s_i ÷ 100)
```

Der **effektive Mischsatz** ergibt sich anschließend aus `Staffelprovision ÷ U × 100`.

### Immobilienmakler-Split inklusive Franchise-Abzug

Arbeiten selbstständige Immobilienberater unter dem Dach eines Maklerhauses oder Franchise-Netzwerks, durchläuft die Gesamtprovision mehrere vertragliche Teilungsstufen:

```
Netto-Auszahlung Makler = Gesamtprovision_netto × Büroteilung × (1 − Franchisegebühr) × Makleranteil
```

Dabei bezeichnet `Büroteilung` den Anteil bei Gemeinschaftsgeschäften (oft `0,50` zwischen Verkäufer- und Käuferbüro), `Franchisegebühr` die Markenlizenz (häufig `0,05` bis `0,08`) und `Makleranteil` den individuellen Split mit dem Büro (üblich `0,50` bis `0,75`).

## Zwei Praxisbeispiele: B2B-Staffelprovision und Immobilien-Split

### Beispiel 1: Durchgerechnete vs. durchstoßende Staffel im B2B-Vertrieb

Eine Vertriebsmanagerin erzielt im Quartal `140.000,00 €` provisionsfähigen Neukundenumsatz (netto). Ihr Vergütungsplan sieht drei Stufen vor:

- **Stufe 1** (`0 €` bis `50.000 €`): `5 %`
- **Stufe 2** (`50.001 €` bis `100.000 €`): `8 %`
- **Stufe 3** (ab `100.001 €`): `12 %`

**Berechnung bei durchgerechneter (progressiver) Staffel:**
1. Erste `50.000 € × 0,05 = 2.500,00 €`
2. Nächste `50.000 € × 0,08 = 4.000,00 €`
3. Verbleibende `40.000 € × 0,12 = 4.800,00 €`
4. **Summe**: `11.300,00 €` brutto → effektiver Mischsatz `11.300 ÷ 140.000 = 8,07 %`.

**Vergleich mit durchstoßender Staffel:**
Greift der höchste erreichte Satz (`12 %`) rückwirkend ab dem ersten Euro, steigt die Provision auf `140.000 € × 0,12 = 16.800,00 €` – eine Differenz von `5.500,00 €` bei identischer Vertriebsleistung. Unternehmen bevorzugen daher meist progressive Staffeln, weil sie keine extremen Sprünge an einzelnen Umsatzschwellen erzeugen.

### Beispiel 2: Makler-Auszahlung beim Hausverkauf in Deutschland

Ein Einfamilienhaus wird für `500.000,00 €` verkauft. Vereinbart ist die in Deutschland verbreitete hälftige Courtage nach § 656c BGB: jeweils `3,57 %` brutto (`3,00 %` netto plus `19 %` MwSt.) für Verkäufer und Käufer. In Österreich gilt bei Immobilienkäufen meist eine ähnliche Höchstgrenze von `3 %` netto je Seite, während in der Schweiz typischerweise allein der Verkäufer `2 %` bis `3 %` trägt.

1. **Gesamt-Courtagepool**: `500.000 € × 0,06 = 30.000,00 €` netto (`35.700,00 €` brutto).
2. **Gemeinschaftsgeschäft (`50 / 50`)**: Ein Partnerbüro brachte den Käufer ein; beim Verkäuferbüro verbleiben `15.000,00 €` netto.
3. **Franchisegebühr (`6 %`)**: `15.000 € × 0,94 = 14.100,00 €` verbleibender Büro-Nettoertrag.
4. **Makler-Büro-Split (`65 / 35`)**: Der ausführende Immobilienberater erhält `14.100 € × 0,65 = 9.165,00 €` netto vor Einkommensteuer und eigenen Betriebskosten wie Exposé-Erstellung, Portalinseraten und Fahrtkosten.

## Branchen-Benchmark: Übliche Provisionssätze im DACH-Raum

Je nach Geschäftsmodell, Verkaufszyklus und Rohmarge variieren branchenübliche Sätze erheblich:

| Branche / Vergütungsmodell | Typischer Provisionssatz | Bemessungsgrundlage | Wichtige Vertragsbesonderheit |
| :--- | :--- | :--- | :--- |
| B2B-Software & SaaS-Vertrieb | `8 % – 15 %` (mit Beschleuniger bis `20 %`) | Jährlicher Vertragswert | Häufig Fixgehalt `50–60 %` + variabler Anteil `40–50 %` |
| Handelsvertreter (§ 84 HGB) | `3 % – 12 %` | Nettoumsatz nach Zahlungseingang | Gesetzlicher Ausgleichsanspruch (§ 89b HGB) bei Vertragsende |
| Immobilienmakler (Wohnkauf DE) | `3,00 %` netto (`3,57 %` brutto) je Partei | Beurkundeter Kaufpreis | Halbteilungsprinzip (§ 656c BGB); interner Split `50/50–75/25` |
| Versicherungs- & Finanzvermittlung | `25 – 45 ‰` Abschluss + `1 % – 3 %` Bestand | Beitragssumme bzw. Jahresprämie | Stornohaftungszeit meist `60` Monate (Rückforderungsrisiko) |
| Affiliate-Marketing (Handel vs. SaaS) | `2 % – 8 %` (Handel) / `20 % – 30 %` (SaaS) | Warenkorb netto oder Abo-Umsatz | Cookie-Laufzeit (`1–90` Tage) und wiederkehrende Vergütung prüfen |
| Freelancer- & Agenturvermittlung | `10 % – 20 %` Abzug | Projekthonorar / Tagessatz | Vermittlungsgebühr vorab auf den Ziel-Stundensatz aufschlagen |

## Entscheidende Stellschrauben und Fallstricke bei Provisionsverträgen

### Fälligkeit: Vertragsabschluss oder Zahlungseingang?

Nach § 87a HGB entsteht der unbedingte Provisionsanspruch für selbstständige Handelsvertreter grundsätzlich erst, wenn das Unternehmen das Geschäft ausgeführt hat und der Kunde bezahlt. Auch bei angestellten Außendienstlern lohnt ein genauer Blick in den Arbeitsvertrag: Bei langen Zahlungszielen oder Projektmeilensteinen vergeht zwischen Unterschrift und Auszahlung oft ein halbes Jahr. Vereinbaren Sie bei größeren Projekten nach Möglichkeit Abschlagszahlungen.

### Rückforderungsklauseln und Stornohaftung einkalkulieren

Kündigt ein Abonnement-Kunde innerhalb der ersten Monate oder widerruft ein Versicherungsnehmer seinen Vertrag während der Stornohaftungszeit, fordern viele Unternehmen bereits gezahlte Provisionen anteilig zurück. Selbstständige Vermittler sollten dafür konsequent eine eigene Stornoreserve von `15 %` bis `25 %` der erhaltenen Abschlusscourtagen zurücklegen.

### Klippeneffekte und Provisionsdeckel kritisch prüfen

Durchstoßende Staffeln verleiten zu taktischen Auftragsverschiebungen: Wer kurz vor Quartalsende die nächste Schwelle knapp verfehlt, schiebt Abschlüsse bewusst in die nächste Periode. Ebenso kontraproduktiv sind harte Provisionsdeckel, da sie leistungsstarke Verkäufer nach Erreichen des Maximums ausbremsen. Transparente progressive Staffeln mit klaren Beschleunigungsfaktoren ab `100 %` Zielerreichung halten Anreize dauerhaft fair und planbar.

### Netto-Wirkung vor jeder Verhandlung simulieren

Verwechseln Sie niemals eine hohe Brutto-Provision mit frei verfügbarem Einkommen. Bei Freelancern auf Vermittlungsplattformen schmälern `15 %` Plattformgebühr, durchlaufende Umsatzsteuer (Liquiditätsfalle bei Sollversteuerung) sowie Einkommensteuer und Krankenversicherung den Auszahlungsbetrag spürbar. Nutzen Sie die Rückwärtsrechnung, um Ihren wirtschaftlich notwendigen Mindestumsatz oder Tagessatz vor Vertragsabschluss sauber herzuleiten.
