---
title: "Abschreibungsrechner (AfA): Lineare & Degressive Abschreibung"
metaTitle: "Abschreibungsrechner (AfA): Linear & Degressiv berechnen"
description: "Berechnen Sie die steuerliche und bilanzielle Absetzung für Abnutzung (AfA) nach linearer, degressiver und leistungsbezogener Methode inklusive Abschreibungsplan."
metaDescription: "Kostenloser Abschreibungsrechner (AfA) für Unternehmen und Selbstständige: Lineare, degressive und leistungsbezogene AfA samt Buchwertverlauf berechnen."
metaKeywords: "abschreibungsrechner, afa rechner, lineare abschreibung, degressive abschreibung, buchwert berechnen, nutzungsdauer afa tabelle, wirtschaftsgut abschreiben, gwg grenze"
faqs:
  - question: "Wie berechnet sich die Abschreibung bei einem Kauf mitten im Geschäftsjahr?"
    answer: "In Deutschland gilt das monatsgenaue Pro-rata-temporis-Prinzip nach § 7 Abs. 1 Satz 4 EStG: Für jeden angefangenen Monat ab dem Zeitpunkt der Lieferung oder Fertigstellung wird ein Zwölftel der Jahres-AfA angesetzt, während die restlichen Monate am Ende der Nutzungsdauer in ein weiteres Kalenderjahr rücken. In Österreich greift hingegen nach § 7 Abs. 2 EStG die Halbjahres-AfA mit voller Jahresabschreibung im ersten Halbjahr und halber Jahresabschreibung ab Juli."
  - question: "Wann ist der optimale Zeitpunkt für den Wechsel von der degressiven zur linearen AfA?"
    answer: "Da die geometrisch-degressive Abschreibung prozentual vom fallenden Restbuchwert rechnet, erreicht sie mathematisch niemals null. Der steuerlich optimale Übergang zur linearen AfA erfolgt genau in dem Wirtschaftsjahr, in dem die lineare Verteilung des verbleibenden Restbuchwerts auf die Restnutzungsdauer erstmals höher ausfällt als der degressive Abschreibungsbetrag."
  - question: "Welche Grenzen gelten für geringwertige Wirtschaftsgüter (GWG) in Deutschland und Österreich?"
    answer: "In Deutschland dürfen selbstständig nutzbare, abnutzbare bewegliche Wirtschaftsgüter bis 800 € netto im Anschaffungsjahr sofort voll abgeschrieben werden (§ 6 Abs. 2 EStG); alternativ steht für Güter zwischen 250,01 € und 1.000 € netto der fünfjährige Sammelposten offen. In Österreich liegt die Sofortabschreibungsgrenze für GWG bei 1.000 € netto (§ 13 EStG). In beiden Ländern ist der Nettopreis auch für Kleinunternehmer ohne Vorsteuerabzug für die Grenzwertprüfung maßgeblich."
  - question: "Was bedeutet der steuerliche Erinnerungswert von 1 € am Ende der Nutzungsdauer?"
    answer: "Wird ein vollständig abgeschriebenes Anlagegut weiterhin im Betrieb genutzt, bleibt es mit einem symbolischen Restbuchwert von 1,00 € im Anlagenverzeichnis stehen. Dieser Erinnerungswert verhindert, dass noch vorhandene Maschinen, Fahrzeuge oder Möbel aus der Buchhaltung verschwinden; erst beim Verkauf, bei Verschrottung oder Entnahme wird dieser letzte Euro ausgebucht."
  - question: "Welche Kosten gehören zu den abschreibungsfähigen Anschaffungskosten eines Anlageguts?"
    answer: "Nach § 255 Abs. 1 HGB zählen neben dem reinen Kaufpreis sämtliche Anschaffungsnebenkosten wie Fracht, Transportversicherung, Zoll, Montage, Fundamentarbeiten und Vermittlungsgebühren zur Bemessungsgrundlage. Preisnachlässe wie Skonti, Rabatte und Boni müssen davon abgezogen werden. Laufende Wartung, Reparaturen und Schulungen sind hingegen sofort abzugsfähige Betriebsausgaben."
---

Schaffen Unternehmen oder Selbstständige Maschinen, Fahrzeuge, IT-Systeme oder Betriebsgebäude an, mindern diese Ausgaben den steuerpflichtigen Gewinn nicht sofort im Kaufjahr. Stattdessen verteilen die steuerliche **Absetzung für Abnutzung (AfA)** (§ 7 EStG in Deutschland und Österreich; eidgenössische und kantonale Abschreibungssätze in der Schweiz) sowie die handelsrechtliche Abschreibung (§ 253 HGB, UGB, OR) die Anschaffungskosten planmäßig über die betriebsgewöhnliche Nutzungsdauer. Der **Abschreibungsrechner (AfA)** berechnet jährliche Abschreibungsbeträge, Restbuchwerte zum Bilanzstichtag und den optimalen Methodenwechsel.

## Die drei zentralen Abschreibungsmethoden und ihre Formeln

Je nach Rechtslage, Anlageklasse und tatsächlicher Beanspruchung gelten drei maßgebliche Berechnungsgleichungen:

```text
Lineare AfA:                  A_lin = (AK − RW) ÷ N
Zeitanteilige AfA (Jahr 1):   A_1   = A_lin × (M ÷ 12)
Geometrisch-degressive AfA:   A_t   = BW_(t−1) × p        mit BW_t = BW_(t−1) − A_t
Leistungsbezogene AfA:        A_t   = (AK − RW) × (L_t ÷ L_ges)
```

Die Parameter sind eindeutig abgegrenzt:

- **`AK` (Anschaffungs- oder Herstellungskosten):** Nettokaufpreis plus Anschaffungsnebenkosten (Fracht, Zoll, Montage) minus Skonti und Rabatte in Euro (`€`). Ohne Vorsteuerabzugsberechtigung gilt der Bruttobetrag.
- **`RW` (Erwarteter Restwert):** Geschätzter Veräußerungserlös am Nutzungsende; im deutschen Steuerrecht regelmäßig `0 €` (bei Weiternutzung `1,00 €` Erinnerungswert im Schlussjahr).
- **`N` (Betriebsgewöhnliche Nutzungsdauer):** Richtwerte liefern die amtlichen AfA-Tabellen (etwa 6 Jahre für Pkw, 13 Jahre für Büromöbel oder 1 Jahr für qualifizierte Computerhardware).
- **`M` (Nutzungsmonate im Kaufjahr):** Anzahl voller und angefangener Monate ab Lieferdatum im deutschen Pro-rata-temporis-Verfahren.
- **`BW_(t−1)` und `p`:** Restbuchwert zu Jahresbeginn und degressiver Prozentsatz. Sobald `BW_(t−1) ÷ Restjahre ≥ BW_(t−1) × p` gilt, liefert der **Wechsel zur linearen AfA** den höheren Abzug und führt den Buchwert exakt auf null.
- **`L_t` und `L_ges`:** Nachgewiesene Jahresleistung (Kilometer oder Maschinenstunden) geteilt durch die geschätzte Gesamtleistung bei stark schwankendem Verschleiß.

## Durchgerechnetes Praxisbeispiel: CNC-Fräsmaschine für 60.000 €

Ein vorsteuerabzugsberechtigter Metallbaubetrieb kauft am 2. Januar eine CNC-Fräsmaschine für **`56.500,00 €`** netto zuzüglich **`3.500,00 €`** netto für Transport und Montage (`AK = 60.000,00 €`). Bei **`N = 5 Jahren`** Nutzungsdauer und **`RW = 0,00 €`** vergleicht der Betrieb die **lineare AfA (20 % p. a.)** mit einer **geometrisch-degressiven AfA von 30 %** (je nach geltender steuerrechtlicher Obergrenze im Anschaffungsjahr oder schweizerischer Buchwertabschreibung).

1. **Lineare Jahres-AfA:** `A_lin = 60.000,00 € ÷ 5 = 12.000,00 €` konstant in jedem Jahr.
2. **Degressive AfA Jahr 1:** `A_1 = 60.000,00 € × 30 % = 18.000,00 €`; Restbuchwert `BW_1 = 42.000,00 €`.
3. **Degressive AfA Jahr 2:** Degressiv fallen `42.000,00 € × 30 % = 12.600,00 €` an; linear auf 4 Restjahre wären es nur `10.500,00 €`. Der Betrieb bleibt degressiv (`BW_2 = 29.400,00 €`).
4. **Methodenwechsel Jahr 3:** Degressiv ergäben sich nur noch `29.400,00 € × 30 % = 8.820,00 €`, während der Wechsel zur linearen AfA über 3 Restjahre **`29.400,00 € ÷ 3 = 9.800,00 €`** jährlich freisetzt. In den Jahren 3, 4 und 5 werden jeweils `9.800,00 €` abgeschrieben, bis `BW_5 = 0,00 €` erreicht ist.

### Unterjähriger Kauf und leistungsbezogene AfA in der Praxis
Erfolgt die Lieferung erst am **12. Oktober**, verkürzt sich die lineare AfA im 1. Jahr in **Deutschland** auf `3 ÷ 12` (Oktober bis Dezember): `12.000,00 € × (3 ÷ 12) = 3.000,00 €`; die verbleibenden `9.000,00 €` folgen im 6. Kalenderjahr. In **Österreich** greift stattdessen die **Halbjahres-AfA**: Bei Inbetriebnahme im zweiten Halbjahr sind pauschal **`6.000,00 €`** (50 % einer Jahresrate) absetzbar.

Wird stattdessen ein Liefertransporter für **`45.000,00 €`** netto mit einer dokumentierten Gesamtlaufleistung von `250.000 km` (`0,18 €` je Kilometer) im 1. Jahr exakt `42.500 km` gefahren, erlaubt die **leistungsbezogene AfA** einen abnutzungsgerechten Abzug von **`45.000,00 € × (42.500 ÷ 250.000) = 7.650,00 €`**.

## Abschreibungsplan im Vergleich: Linear gegen Degressiv mit Wechsel

Die Übersicht vergleicht beide Verfahren für die `60.000-€`-Maschine inklusive des kumulierten steuerlichen Stundungseffekts bei `30 %` Unternehmenssteuersatz:

| Geschäftsjahr | Lineare AfA | Buchwert linear | Degressive AfA (30 %, m. Wechsel) | Buchwert degressiv | Kumulierter Steuervorteil (30 %) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jahr 1** | 12.000,00 € | 48.000,00 € | 18.000,00 € (degressiv) | 42.000,00 € | +1.800,00 € |
| **Jahr 2** | 12.000,00 € | 36.000,00 € | 12.600,00 € (degressiv) | 29.400,00 € | +1.980,00 € |
| **Jahr 3** | 12.000,00 € | 24.000,00 € | 9.800,00 € (Wechsel linear) | 19.600,00 € | +1.320,00 € |
| **Jahr 4** | 12.000,00 € | 12.000,00 € | 9.800,00 € (linear) | 9.800,00 € | +660,00 € |
| **Jahr 5** | 12.000,00 € | 0,00 € | 9.800,00 € (linear) | 0,00 € | 0,00 € |
| **Summe** | **60.000,00 €** | **—** | **60.000,00 €** | **—** | **0,00 €** |

Über fünf Jahre bleibt das Abschreibungsvolumen mit `60.000,00 €` identisch. Der Nutzen der degressiven AfA liegt im **Steuerstundungseffekt**: In den ersten beiden Jahren verbleiben bis zu **`1.980,00 €`** länger als zinsfreie Liquidität im Unternehmen.

## Typische Fehler in der steuerlichen Abschreibungspraxis

- **Rechnungsdatum statt Lieferdatum ansetzen:** Maßgeblich für den AfA-Beginn ist die Übergabe beziehungsweise Betriebsbereitschaft. Eine im Dezember bezahlte, aber im Januar gelieferte Anlage zählt erst im neuen Geschäftsjahr.
- **Anschaffungsnebenkosten sofort als Aufwand buchen:** Fracht, Montage und Fundamentarbeiten gehören zwingend zu den aktivierten Anschaffungskosten (`AK`) und dürfen nicht direkt im Kaufjahr abgezogen werden.
- **Selbstständige Nutzbarkeit bei GWG übersehen:** Ein Monitor für `450 €` netto liegt unter der deutschen `800-€`-Grenze (Österreich: `1.000 €`), ist allein ohne Rechner jedoch nicht selbstständig nutzbar und zählt daher nicht als klassisches GWG (Ausnahme: gesonderte Regelungen für digitale Wirtschaftsgüter).
- **Grund und Boden versehentlich mitabschreiben:** Bei betrieblichen Immobilien nutzt sich nur das Gebäude ab; der Bodenanteil muss vorab über eine saubere Kaufpreisaufteilung abgetrennt werden.
- **Unzulässigen Methodenwechsel ansetzen:** Der Wechsel von degressiv zu linear ist zulässig, der umgekehrte Wechsel von linear zu degressiv jedoch nach § 7 Abs. 3 EStG ausgeschlossen.
- **Umsatzsteuer falsch behandeln:** Regelbesteuerte Betriebe schreiben stets den Nettowert ab; nur Kleinunternehmer (§ 19 UStG) oder steuerbefreite Berufsgruppen ohne Vorsteuerabzug setzen Bruttobeträge an.
