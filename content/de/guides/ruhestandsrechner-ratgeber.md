---
title: "Ruhestandsplanung Grundlagen: Wie viel Kapital brauchen Sie wirklich?"
description: "Erfahren Sie, wie Sie Ihren Kapitalbedarf für den Ruhestand berechnen, die 4-%-Regel richtig anwenden und den Ruhestandsrechner für präzise Prognosen nutzen."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "retirement-calculator"
relatedType: "calculator"
faqs:
  - question: "Wie funktioniert die 4-%-Regel in der Ruhestandsplanung?"
    answer: "Die 4-%-Regel besagt, dass Sie im ersten Jahr des Ruhestands 4 % Ihres breit gestreuten Portfolios (typischerweise 50–75 % Aktien und 25–50 % Anleihen) entnehmen und diesen Betrag in den Folgejahren jeweils an die Inflation anpassen können, ohne dass das Kapital innerhalb von 30 Jahren mit hoher Wahrscheinlichkeit aufgebraucht wird. Daraus leitet sich direkt der Multiplikator 25 für den Kapitalbedarf ab."
  - question: "Reicht die 80-%-Einkommensregel für jeden Haushalt aus?"
    answer: "Nein, die 80-%-Regel ist lediglich ein grober Richtwert. Wer im Alter ein abbezahltes Eigenheim bewohnt und keine hohen Kinder- oder Berufskosten mehr hat, kommt oft mit 65–70 % des letzten Nettoeinkommens aus. Umgekehrt können steigende Ausgaben für private Krankenversicherung, Pflege oder Reisen einen Bedarf von 90–100 % erfordern."
  - question: "Warum muss ich in der Altersvorsorge zwischen nominaler und realer Rendite unterscheiden?"
    answer: "Eine nominale Rendite von 6,5 % klingt attraktiv, spiegelt aber nicht die tatsächliche Kaufkraft wider. Bei einer jährlichen Inflation von 2,2 % beträgt die reale Rendite nach der exakten Fisher-Gleichung nur rund 4,21 %. Nur wenn Sie real rechnen, zeigt Ihnen das Ergebnis, was Sie sich von Ihrem späteren Vermögen tatsächlich leisten können."
  - question: "Was ist das Renditereihenfolgerisiko (Sequence-of-Returns Risk)?"
    answer: "Das Renditereihenfolgerisiko beschreibt die Gefahr, dass starke Börseneinbrüche unmittelbar vor oder in den ersten fünf Jahren nach Renteneintritt auftreten. Da Sie in dieser Phase gleichzeitig laufend Kapital für Ihren Lebensunterhalt entnehmen müssen, schrumpft der Depotbestand dauerhaft schneller, als spätere Aufschwünge ihn ausgleichen können."
  - question: "Wie berücksichtige ich gesetzliche Renten oder betriebliche Zusagen im Rechner?"
    answer: "Ziehen Sie Ihre erwarteten sicheren Renteneinnahmen (z. B. gesetzliche Rentenversicherung, Beamtenpension oder Betriebsrente nach Steuern) von Ihrem monatlichen Wunschbudget ab. Nur die verbleibende Versorgungslücke muss durch Ihr privates Kapitalvermögen über die 25x-Regel gedeckt werden."
---

Um Ihren Kapitalbedarf für den Ruhestand realistisch zu bestimmen, ermitteln Sie zunächst Ihre monatliche **Versorgungslücke** – also die Differenz zwischen Ihrem angestrebten Lebenshaltungsbudget im Alter und den zu erwartenden staatlichen oder betrieblichen Renten. Nach der etablierten **4-%-Regel** (der sogenannten *25x-Regel*) benötigen Sie beim Renteneintritt ein privates Portfolio in Höhe des **25-Fachen** Ihrer jährlichen Versorgungslücke, um diese über mindestens 30 Jahre inflationsangepasst zu finanzieren.

Da Kaufkraftverlust, Besteuerung und Anlagehorizont das notwendige Zielkapital erheblich verschieben, reicht einfaches Kopfrechnen für eine verlässliche Planung nicht aus. Mit unserem [Ruhestandsrechner](/de/rechner/rentenrechner) verknüpfen Sie Ihr aktuelles Alter, vorhandenes Startkapital, Ihre monatliche Sparrate, erwartete Marktrenditen sowie eine realistische Teuerungsrate zu einer kaufkraftbereinigten Langfristprognose.

## Methodik: Versorgungslücke, Fisher-Gleichung und 4-%-Regel

Eine strukturierte Altersvorsorgeplanung trennt sauber zwischen der **Ansparphase** bis zum Renteneintritt und der anschließenden **Entnahmephase**. Entscheidend für belastbare Ergebnisse ist die Unterscheidung zwischen **nominalen Beträgen** (dem später auf dem Depotauszug angezeigten Euro-Wert) und **realen Beträgen** (der heutigen Kaufkraft). Nur eine reale Berechnung macht sofort sichtbar, welchen Lebensstandard Ihr Vermögen in Jahrzehnten tatsächlich trägt.

```text
Jährliche Versorgungslücke (L) = (Wunschbudget/Monat − Sichere Rente/Monat) × 12
Zielkapital (K_ziel, real)     = L / Entnahmerate = L × 25   (bei 4-%-Regel)
Reale Rendite (r_real)        = [(1 + r_nom) / (1 + i)] − 1
Benötigte Sparrate (PMT)      = [K_ziel − PV × (1 + r_m)^n] × r_m / [(1 + r_m)^n − 1]
```

Die Formelparameter sind exakt definiert: `r_nom` bezeichnet die erwartete jährliche Nominalrendite (beispielsweise 0,065 bei einem weltweit gestreuten Aktien-Anleihen-Portfolio), `i` die unterstellte jährliche Inflationsrate (etwa 0,022 für 2,2 % Teuerung), `PV` Ihr bereits angespartes Startkapital, `r_m = r_real / 12` die monatliche reale Wachstumsrate und `n` die Zahl der verbleibenden Sparmonate bis zum Rentenbeginn.

### Zwei zentrale Faustregeln kritisch eingeordnet

- **Die 80-%-Einkommensregel:** Sie unterstellt, dass Haushalte im Ruhestand rund 80 % ihres letzten Nettoeinkommens benötigen, weil berufsbezogene Ausgaben wie Pendelkosten und aktive Altersvorsorgebeiträge entfallen. Dennoch variiert der reale Bedarf je nach Wohnsituation (abbezahlte Immobilie versus Miete) und Reise- oder Gesundheitskosten stark, weshalb ein individuelles Haushaltsbudget stets vorzuziehen ist.
- **Die 4-%-Regel (Trinity-Studie):** Diese Entnahmeregel wurde auf Basis historischer US-Kapitalmarktdaten für einen 30-jährigen Entnahmezeitraum bei mindestens 50 % Aktienanteil entwickelt. Wer bereits mit 50 oder 55 Jahren in den Ruhestand geht und 40 bis 45 Entnahmejahre abdecken muss, sollte vorsichtiger mit **3,25 % bis 3,5 %** Anfangsentnahme planen (Multiplikator 28,6 bis 30,8).

## Schritt-für-Schritt-Rechenbeispiel

Angenommen, Sie sind heute **40 Jahre** alt, planen Ihren Renteneintritt mit **65 Jahren** (`t = 25` Jahre bzw. `n = 300` Monate) und verfügen bereits über ein ETF-Startkapital von **30.000 €**. Im Alter wünschen Sie sich ein kaufkraftbereinigtes Monatsbudget von **4.000 €** netto; Ihre voraussichtliche gesetzliche und betriebliche Rente nach Steuern deckt davon **1.800 €** ab. Sie kalkulieren mit **6,5 %** nominaler Jahresrendite bei **2,2 %** durchschnittlicher Inflation.

1. **Versorgungslücke bestimmen:** Aus Wunschbudget minus sicherer Rente ergibt sich eine monatliche Lücke von `4.000 − 1.800 = 2.200 €`, was jährlich **26.400 €** in heutiger Kaufkraft entspricht.
2. **Reales Zielkapital nach der 4-%-Regel ermitteln:** Multipliziert mit dem Faktor 25 benötigen Sie zum Rentenbeginn exakt **660.000 €** reales Kapital. Beachten Sie den Kaufkrafteffekt: Bei 2,2 % Inflation über 25 Jahre (`1,022^25 = 1,7229`) entspricht die Lücke von 26.400 € bei Renteneintritt nominal rund **45.486 €** pro Jahr (nominales Zielkapital etwa 1,137 Mio. €).
3. **Reale Rendite nach Fisher berechnen:** Gemäß `(1,065 / 1,022) − 1` beträgt die reale jährliche Wachstumsrate **4,21 %** (`r_real = 0,042074`), woraus ein monatlicher Realzins von `0,0035062` folgt.
4. **Beitrag des Startkapitals abziehen:** Ihr vorhandenes Depot von 30.000 € wächst in 300 Monaten real auf **85.731 €** an. Vom Zielkapital verbleiben somit noch 574.269 € anzusparen.
5. **Erforderliche monatliche Sparrate berechnen:** Über die Annuitätenformel errechnet sich eine monatliche reale Sparrate von **1.083,86 €** (in der Praxis empfiehlt sich eine jährliche Dynamisierung dieser Sparrate im Gleichschritt mit der Inflation).

## Einfluss des Startalters: Szenariovergleich

Die folgende Übersicht zeigt die monatlich erforderliche Sparrate für dasselbe reale Zielkapital von **660.000 €** mit **65 Jahren**, diesmal beginnend bei **0 € Startkapital** und einer realen Rendite von **4,21 %** p. a.:

| Einstiegsalter | Ansparjahre | Sparrate / Monat | Eigene Einzahlungen | Realer Zinseszinsgewinn | Eigenanteil am Ziel |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **25 Jahre** | 40 Jahre | **530,06 €** | 254.428 € | 405.572 € | 38,5 % |
| **30 Jahre** | 35 Jahre | **690,91 €** | 290.181 € | 369.819 € | 44,0 % |
| **35 Jahre** | 30 Jahre | **916,29 €** | 329.864 € | 330.136 € | 50,0 % |
| **40 Jahre** | 25 Jahre | **1.245,67 €** | 373.701 € | 286.299 € | 56,6 % |
| **45 Jahre** | 20 Jahre | **1.757,89 €** | 421.893 € | 238.107 € | 63,9 % |
| **50 Jahre** | 15 Jahre | **2.636,74 €** | 474.614 € | 185.386 € | 71,9 % |

Wer bereits mit 25 Jahren statt erst mit 50 Jahren einsteigt, kommt mit rund einem Fünftel der monatlichen Sparrate aus (530 € gegenüber 2.637 €), da mehr als 61 % des Endkapitals allein durch den realen Zinseszinseffekt entstehen.

## Praxisbeispiele, typische Fehler und methodische Grenzen

In Deutschland, Österreich und der Schweiz bildet das private Wertpapierdepot häufig die flexible dritte Säule neben gesetzlicher Rente (bzw. AHV) und betrieblicher Altersvorsorge. Im internationalen Vergleich – etwa bei US-Vorsorgekonten mit gesetzlichen Jahresobergrenzen von 24.500 $ im 401(k)-Plan oder 7.500 $ in einer IRA (Stand 2026) – folgt die dahinterliegende Deckungslückenrechnung exakt derselben Mathematik.

Vermeiden Sie in der praktischen Umsetzung drei weitverbreitete Planungsfehler:

- **Bruttobeträge mit Nettokaufkraft verwechseln:** Sowohl gesetzliche und betriebliche Renten als auch spätere Depotentnahmen unterliegen regelmäßig der Einkommen- oder Kapitalertragsteuer sowie Kranken- und Pflegeversicherungsbeiträgen. Rechnen Sie konsequent auf Nach-Steuer-Basis.
- **Unterschätzung des Renditereihenfolgerisikos:** Ein scharfer Aktieneinbruch unmittelbar rund um den Renteneintritt schädigt laufende Entnahmen überproportional. Ein Liquiditätspuffer für zwei bis drei Jahresausgaben in Tagesgeld oder kurzlaufenden Anleihen verhindert Zwangsverkäufe im Tief.
- **Starre Entnahmeautomatismen:** Eine leichte Anpassung der jährlichen Entnahmen in Verlustjahren (etwa vorübergehendes Aussetzen des Inflationsausgleichs) stabilisiert das Portfolio weitaus besser als eine starre 4-%-Regel.

Sämtliche Ergebnisse des Ruhestandsrechners stellen deterministische Modellprognosen auf Grundlage Ihrer Annahmen dar; sie ersetzen keine individuelle Finanz- oder Rentenberatung und bilden weder künftige Steuerreformen noch unerwartete Pflegekosten ab.
