---
title: "Altersvorsorge-Sparplan-Rechner (401k)"
metaTitle: "401(k)- & Altersvorsorge-Rechner mit Arbeitgeberzuschuss"
description: "Prognostizieren Sie das Endkapital Ihres 401(k)-Plans oder einer betrieblichen Altersvorsorge (bAV) mit Arbeitgeberzuschuss, Gehaltsplus und Zinseszins."
metaDescription: "Prognostizieren Sie Ihr Vorsorgekapital mit Arbeitgeber-Match, Gehaltsplus und Zinseszins. Inkl. 2026er 401(k)-, bAV- und Säule-3a-Grenzen."
metaKeywords: "401k Rechner deutsch, Altersvorsorge Sparplan Rechner, Arbeitgeberzuschuss Rechner, bAV Rechner 2026, 401k Höchstbetrag 2026, betriebliche Altersvorsorge Zinseszins, Säule 3a 2026"
faqs:
  - question: "Wie hoch sind die offiziellen US-401(k)-Höchstgrenzen für das Steuerjahr 2026?"
    answer: "Im Jahr 2026 liegt das reguläre Arbeitnehmer-Einzahlungslimit bei 24.500 $ (unter 50 Jahren). Beschäftigte ab 50 Jahren dürfen einen Nachholbetrag (Catch-up) von 8.000 $ hinzufügen (gesamt 32.500 $). Für die Jahrgänge 60 bis 63 gilt nach SECURE 2.0 ein erhöhter Super-Catch-up von 11.250 $ (gesamt 35.750 $). Das kombinierte Gesamtlimit inklusive Arbeitgeber-Match nach IRC Section 415(c) beträgt 72.000 $ (bzw. 80.000 $ ab 50 und 83.250 $ für 60- bis 63-Jährige)."
  - question: "Lässt sich der 401(k)-Rechner auch für eine deutsche bAV oder Schweizer Pensionskasse nutzen?"
    answer: "Ja. Das mathematische Prinzip aus prozentualer Brutto-Entgeltumwandlung, Arbeitgeberzuschuss und jährlicher Gehaltssteigerung ist identisch. Prüfen Sie bei einer deutschen bAV jedoch die 2026er Fördergrenzen nach § 3 Nr. 63 EStG: Maximal 8.112 € im Jahr (676 €/Monat, 8 % der BBG von 101.400 €) sind steuerfrei und 4.056 € (338 €/Monat, 4 % der BBG) zusätzlich sozialversicherungsfrei."
  - question: "Was passiert mit einem bestehenden US-401(k), wenn ich nach Deutschland zurückkehre?"
    answer: "Ein bestehender 401(k) darf grundsätzlich in den USA weiterlaufen und steuerbegünstigt wachsen, solange der US-Verwalter Auslandskunden zulässt (ggf. vor Rückkehr zu einem auslandsfreundlichen Anbieter als Rollover-IRA übertragen). Eine vorzeitige Auszahlung vor Alter 59½ löst reguläre Einkommensteuer plus 10 % US-Strafsteuer aus. Bei regulärer Auszahlung im Ruhestand regelt Artikel 18 des Doppelbesteuerungsabkommens USA–Deutschland regelmäßig die Besteuerung im Wohnsitzstaat."
  - question: "Ab welchem Arbeitgeberzuschuss lohnt sich eine deutsche bAV gegenüber einem privaten ETF-Sparplan?"
    answer: "Da die Entgeltumwandlung in der deutschen bAV die späteren Ansprüche aus der gesetzlichen Rentenversicherung mindert und im Ruhestand volle Kranken- und Pflegeversicherungsbeiträge (oberhalb des monatlichen GKV-Freibetrags) sowie Einkommensteuer anfallen, reicht der gesetzliche Mindestzuschuss von 15 % häufig kaum aus. Finanziell attraktiv wird eine bAV meist erst ab 25 % bis 50 % echtem Arbeitgeberzuschuss und niedrigen Vertragskosten."
  - question: "Was bedeuten Unverfallbarkeit (Vesting) und True-Up beim Arbeitgeber-Match?"
    answer: "Ihre eigenen Einzahlungen gehören Ihnen sofort zu 100 %. Arbeitgeberzuschüsse im US-401(k) unterliegen jedoch oft einer Vesting-Frist (z. B. 3-Jahres-Cliff oder gestaffelt über 2 bis 6 Jahre) – bei früherem Jobwechsel verfallen nicht unverfallbare Anteile. Ein True-Up stellt zudem sicher, dass Sie keinen Arbeitgeber-Match verlieren, wenn Sie das Jahreslimit von 24.500 $ bereits vor Dezember ausschöpfen."
---

## Wie Arbeitgeberzuschuss und Gehaltssteigerungen das Vorsorgekapital vervielfachen

Ein betrieblich geförderter Altersvorsorge-Sparplan – sei es ein US-amerikanischer **401(k)-Plan** für deutschsprachige Expats und Beschäftigte US-amerikanischer Konzerne oder eine **betriebliche Altersvorsorge (bAV)** mit Arbeitgeberzuschuss im DACH-Raum – entfaltet eine andere Dynamik als ein statischer privater Sparplan. Drei Verstärker greifen jedes Jahr ineinander: Ihre prozentualen **Eigenbeiträge aus dem Bruttogehalt**, der **Arbeitgeberzuschuss** (*Employer Match*) sowie **jährliche Gehaltssteigerungen**, die beide Zahlungsströme automatisch mit anheben.

Gerade der Arbeitgeber-Match stellt eine kaum schlagbare Sofortrendite dar. Verdoppelt oder bezuschusst Ihr Arbeitgeber beispielsweise `50 %` Ihrer Einzahlungen bis `6 %` des Bruttogehalts, erhalten Sie unmittelbar am Zahltag **50 % risikofreie Zusatzrendite** auf den geförderten Beitragsanteil – noch bevor der Kapitalmarkt einen einzigen Prozentpunkt erwirtschaftet.

## Die jährliche Wachstumsformel mit Arbeitgeberzuschuss

Weil Gehalt, Eigenbeitrag und gedeckelter Arbeitgeberzuschuss von Jahr zu Jahr mitwachsen, berechnet der Sparplan-Rechner das Endkapital schrittweise für jedes einzelne Beitragsjahr `k` bis zum geplanten Renteneintritt:

```text
Eigenbeitrag_k     = Bruttogehalt_k × s
ArbeitgeberMatch_k = Bruttogehalt_k × min(s, MatchDeckel) × MatchQuote
Jahresrendite_k    = (Kapital_(k-1) × r) + (Eigenbeitrag_k + ArbeitgeberMatch_k) × (r / 2)
Kapital_k          = Kapital_(k-1) + Eigenbeitrag_k + ArbeitgeberMatch_k + Jahresrendite_k
Bruttogehalt_(k+1) = Bruttogehalt_k × (1 + g)
```

So steuern die einzelnen Größen Ihre Projektion:

- **`Kapital_(k-1)` (Vorjahresbestand):** Das zu Jahresbeginn bereits investierte Vorsorgeguthaben, das über alle zwölf Monate hinweg die volle Jahresrendite `r` erzielt.
- **`Bruttogehalt_k` & `g` (Jahresgehalt und Steigerungsrate):** Ihr Bruttoeinkommen im jeweiligen Jahr, dynamisiert um die erwartete Lohnentwicklung `g` (z. B. `2,5 % p. a.`).
- **`s` (Eigene Sparquote in %):** Der direkt aus der Gehaltsabrechnung abgeführte Prozentsatz Ihres Bruttolohns.
- **`MatchQuote` & `MatchDeckel`:** Die Zuschussformel des Arbeitgebers. Bei „50 % Match bis 6 % Gehalt“ greift `min(s, 0,06) × 0,50` – wer `8 %` einzahlt, schöpft exakt den vollen `3-%`-Arbeitgeberzuschuss aus, erhält darüber hinaus jedoch keinen weiteren Bonus.
- **`(r / 2)` (Halbjahres-Zinsfaktor):** Da laufende Gehaltsbeiträge gleichmäßig über 12 Monats- bzw. 26 Zweiwochen-Abrechnungen eingehen und nicht gesammelt am 1. Januar, verzinsen sich die Neubeiträge im Einzahlungsjahr im Mittel für ein halbes Jahr.

## Durchgerechnetes Fallbeispiel: 30 Jahre Vermögensaufbau mit und ohne Zuschuss

Verfolgen wir den konkreten Verlauf einer **35-jährigen Fachkraft**, die bis zum **65. Lebensjahr** (`30 Jahre`) vorsorgt. Ausgangsdaten: **`30.000 €`** (bzw. `$`) bestehendes Guthaben, **`80.000 €`** Startgehalt, **`2,5 %`** jährliche Gehaltssteigerung, **`8 %`** Eigenbeitrag, ein **Arbeitgeberzuschuss von `50 %` bis `6 %` Gehalt** (effektiv `3 %`) und **`7,0 % p. a.`** durchschnittliche Kapitalmarktrendite.

**Jahr 1 (Alter 35 → 36):**

1. Eigenbeitrag: `80.000 € × 8 % = 6.400,00 €`
2. Arbeitgeberzuschuss (gedeckelt auf 6 %): `80.000 € × min(8 %, 6 %) × 50 % = 2.400,00 €`
3. Kapitalmarktrendite: `(30.000 € × 0,07) + [(6.400 € + 2.400 €) × 0,035] = 2.100,00 € + 308,00 € = 2.408,00 €`
4. **Endstand nach Jahr 1:** `30.000 € + 6.400 € + 2.400 € + 2.408 € = 41.208,00 €`
5. In Jahr 2 steigt das Gehalt auf `82.000,00 €`, der Eigenbeitrag auf `6.560,00 €`, der Zuschuss auf `2.460,00 €` und der Bestand nach `3.200,26 €` Rendite auf **`53.428,26 €`**.

**Gesamtergebnis nach 30 Jahren (Alter 65):**

- **Startguthaben:** `30.000 €`
- **Summe eigener Einzahlungen:** `280.977 €`
- **Summe Arbeitgeberzuschüsse:** `105.366 €`
- **Kumulierte Kapitalmarktrendite:** `928.197 €`
- **Prognostiziertes Endkapital mit Match:** **`1.344.540 €`**

Stellen Sie exakt denselben Sparplan **ohne Arbeitgeberzuschuss** gegenüber: Das Endkapital schrumpft auf **`1.040.130 €`**. Die nominell `105.366 €` Arbeitgeberbeiträge wachsen durch den Zinseszinseffekt über drei Jahrzehnte auf **`304.411 €` zusätzliches Ruhestandskapital** an – fast das Dreifache der reinen Zuschusssumme.

## Fördergrenzen 2026 im Vergleich: US-401(k), deutsche bAV und Schweizer Säule 3a

Prozentbasierte Sparplan-Rechner prüfen keine gesetzlichen Höchstbeträge automatisch. Gleichen Sie Ihre berechnete Jahreseinzahlung daher stets mit den gültigen **2026er Obergrenzen** Ihres Vorsorgesystems ab:

| Vorsorgesystem & Altersgruppe (Stand 2026) | Maximaler Eigenbeitrag / Jahr | Nachholbetrag (Catch-up) | Gesamt-Förderrahmen (inkl. Arbeitgeber / Sonderregeln) |
| :--- | :--- | :--- | :--- |
| **US-401(k) – unter 50 Jahre** | 24.500 $ | 0 $ | 72.000 $ gesamt (IRC Sec. 415(c)) |
| **US-401(k) – 50 bis 59 & ab 64 Jahre** | 32.500 $ | 8.000 $ | 80.000 $ gesamt (inkl. Catch-up) |
| **US-401(k) – 60 bis 63 Jahre (SECURE 2.0)** | 35.750 $ | 11.250 $ (Super Catch-up) | 83.250 $ gesamt (sofern vom Plan unterstützt) |
| **Deutschland bAV (§ 3 Nr. 63 EStG, BBG 101.400 €)** | 8.112 € steuerfrei (676 €/Monat) | — | 4.056 € (338 €/Monat) zusätzlich SV-frei; mind. 15 % AG-Zuschuss bei SV-Ersparnis |
| **Schweiz Säule 3a (mit Pensionskasse BVG)** | 7.258 CHF | Rückwirkender Einkauf ab 2026 möglich | Ohne Pensionskasse: bis 36.288 CHF (max. 20 % Nettoeinkommen) |

## Kritische Fallstricke bei 401(k), bAV und internationaler Karriere

### Pflicht zur Roth-Nachzahlung (2026) und fehlender True-Up beim 401(k)
Seit 2026 greift unter dem US-Gesetz SECURE 2.0 eine wichtige Neuerung: Beschäftigte ab 50 Jahren, deren sozialversicherungspflichtiges Vorjahresgehalt (FICA-Lohn 2025) beim selben Arbeitgeber über **`150.000 $`** lag, müssen ihre Catch-up-Beiträge zwingend als **Roth-401(k)** (aus versteuertem Einkommen) leisten. Prüfen Sie zudem in den Planunterlagen, ob Ihr Arbeitgeber einen **Jahresausgleich (True-Up)** durchführt – fehlt dieser, verlieren Sie wertvolle Match-Monate, wenn Sie das `24.500-$`-Limit bereits im Herbst ausschöpfen.

### Vesting-Fristen vor einem Jobwechsel exakt prüfen
Wechseln Sie in den USA kurz vor einer dreijährigen *Cliff-Vesting*-Grenze das Unternehmen, verfallen oft `10.000 $` oder mehr an Arbeitgeberbeiträgen samt Rendite. In der deutschen bAV sind eigene Entgeltumwandlungen sofort unverfallbar; rein arbeitgeberfinanzierte Zusagen werden nach drei Jahren Betriebszugehörigkeit (ab dem 21. Lebensjahr) unverfallbar.

### Produktkosten und nachgelagerte Abgaben in der deutschen bAV
Während US-401(k)-Pläne häufig günstige institutionelle Indexfonds mit `0,03 % bis 0,08 %` laufenden Kosten bieten, schmälern in deutschen bAV-Direktversicherungen oft Abschlussprovisionen, Garantiekosten und effektive Jahreskosten über `1,0 %` den Zinseszins massiv. Da im Ruhestand zudem Einkommensteuer und volle Kranken- und Pflegeversicherungsbeiträge auf die Auszahlung anfallen, lohnt sich die bAV erst bei einem großzügigen Arbeitgeberzuschuss (idealerweise `30 % bis 100 %`) und einer schlanken ETF-basierten Nettopolice.

### Doppelbesteuerung bei Rückkehr aus den USA vermeiden
Lösen Sie einen 401(k) bei Rückkehr in den DACH-Raum nicht überstürzt auf: Neben der Nachversteuerung greift vor dem Alter 59½ eine `10-%`-Strafsteuer der IRS. Ein geordneter Verbleib in einem US-Rollover-Depot mit sauberer Anwendung des Doppelbesteuerungsabkommens schützt oft Jahrzehnte steuerbegünstigten Wachstums.
