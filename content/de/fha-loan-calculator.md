---
title: "FHA-Kreditrechner"
metaTitle: "FHA-Kreditrechner | FHA-Hypothek, Rate & MIP berechnen"
description: "Berechnen Sie Ihre monatliche FHA-Hypothekenrate inklusive Vorab-MIP (UFMIP), jährlicher Versicherungsprämie, Grundsteuer und Wohngebäudeversicherung."
metaDescription: "Kostenloser FHA-Kreditrechner: Berechnen Sie monatliche Raten, Vorab-MIP (1,75 %), jährliche MIP, Grundsteuer und Eigenkapital für US-Immobilienkredite."
metaKeywords: "fha kreditrechner, fha hypothek berechnen, fha darlehen usa, mip versicherung berechnen, ufmip 1,75 prozent, us immobilienfinanzierung, fha kreditvoraussetzungen"
faqs:
  - question: "Wie unterscheidet sich die Vorab-MIP (UFMIP) von der jährlichen MIP bei einem FHA-Darlehen?"
    answer: "Die Vorab-Hypothekenversicherungsprämie (Upfront MIP, kurz UFMIP) beträgt pauschal 1,75 % des Basisdarlehensbetrags und wird fast immer direkt auf die Kreditsumme aufgeschlagen und mitfinanziert. Die jährliche MIP hingegen liegt je nach Laufzeit, Darlehenshöhe und Eigenkapitalquote zwischen 0,15 % und 0,75 % p. a. und wird in zwölf gleichen Monatsraten zusammen mit Zins und Tilgung erhoben."
  - question: "Kann die monatliche FHA-Hypothekenversicherung (MIP) während der Laufzeit gekündigt werden?"
    answer: "Das hängt von Ihrer anfänglichen Eigenkapitalquote ab. Leisten Sie beim Kauf nur die Mindestanzahlung von 3,5 % (Beleihungsauslauf über 90 %), bleibt die jährliche MIP über die gesamte Kreditlaufzeit bestehen und lässt sich nur durch eine Umschuldung (Refinanzierung) in ein konventionelles Darlehen beenden. Bringen Sie mindestens 10 % Eigenkapital ein, entfällt die jährliche MIP automatisch nach 11 Jahren."
  - question: "Welcher Kredit-Score (FICO) ist für die Mindestanzahlung von 3,5 % erforderlich?"
    answer: "Für die reduzierte Anzahlung von 3,5 % des Kaufpreises schreibt die Federal Housing Administration einen FICO-Score von mindestens 580 Punkten vor. Liegt der Score zwischen 500 und 579 Punkten, ist eine FHA-Finanzierung zwar weiterhin möglich, erfordert jedoch zwingend einen Eigenkapitaleinsatz von mindestens 10 %."
  - question: "Warum ist die tatsächliche Kreditsumme beim FHA-Darlehen höher als der Kaufpreis abzüglich Anzahlung?"
    answer: "Weil die obligatorische Vorab-Versicherungsprämie von 1,75 % (UFMIP) in der Praxis selten beim Notartermin bar bezahlt, sondern in das Darlehen eingerechnet wird. Dadurch erhöht sich das zu verzinsende Gesamtdarlehen, auf dessen Basis anschließend die monatliche Annuität aus Zins und Tilgung berechnet wird."
  - question: "Können auch Anleger aus Deutschland, Österreich oder der Schweiz einen FHA-Kredit in den USA nutzen?"
    answer: "Ein FHA-Kredit setzt zwingend voraus, dass der Kreditnehmer die finanzierte Immobilie als eigenen Hauptwohnsitz (Primary Residence) in den USA nutzt und über einen rechtmäßigen Aufenthaltsstatus sowie eine US-Sozialversicherungsnummer verfügt. Für reine Kapitalanleger oder Ferienimmobilien ohne US-Hauptwohnsitz sind FHA-Darlehen ausgeschlossen."
---

Ein **FHA-Darlehen** (Federal Housing Administration Loan) ist eines der wichtigsten Instrumente der US-amerikanischen Immobilienfinanzierung und richtet sich an Erstkäufer, Auswanderer mit kurzer US-Kredithistorie sowie Erwerber mit geringem Startkapital. Während Banken im DACH-Raum (Deutschland, Österreich, Schweiz) bei einer Baufinanzierung meist 20 % Eigenkapital zuzüglich Kaufnebenkosten verlangen, ermöglicht ein staatlich besicherter FHA-Kredit den Immobilienerwerb bereits ab einer Anzahlung von **3,5 % des Kaufpreises**.

Da die US-Behörde Federal Housing Administration (Teil des Ministeriums für Wohnungsbau und Stadtentwicklung, HUD) das Ausfallrisiko gegenüber der Bank absichert, zahlen Kreditnehmer im Gegenzug eine zweistufige Hypothekenversicherung – die **Mortgage Insurance Premium (MIP)**. Unser FHA-Kreditrechner bildet diese Finanzierungsarchitektur exakt ab, integriert die einmalige Vorabprämie direkt in den Tilgungsplan und führt sämtliche laufenden Nebenkosten (Grundsteuer, Gebäudeversicherung und Eigentümerumlagen) zu einer monatlichen Gesamtbelastung zusammen.

## Mathematische Formeln zur Berechnung der FHA-Gesamtrate

Im Gegensatz zu einem regulären Annuitätendarlehen erfolgt die Berechnung einer FHA-Hypothek in zwei Stufen, da die mitfinanzierte Vorab-Versicherungsprämie die Verzinsungsbasis erhöht. Alle Werte lassen sich im Rechner wahlweise in Euro (`€`) oder US-Dollar (`$`) kalkulieren.

### 1. Basisdarlehen und Gesamtdarlehensbetrag (inkl. UFMIP)

Zunächst wird vom Kaufpreis $K$ der Immobilie das eingebrachte Eigenkapital abgezogen, um den Basisdarlehensbetrag $B_0$ zu bestimmen:

$$B_0 = K \cdot \left(1 - q_{\text{EK}}\right)$$

Auf diesen Basisbetrag erhebt die FHA eine einmalige Vorabprämie (**Upfront Mortgage Insurance Premium**, kurz $\text{UFMIP}$) in Höhe von aktuell $1{,}75\text{ \%}$:

$$\text{UFMIP} = B_0 \cdot 0{,}0175$$

Wird diese Prämie in das Darlehen eingerechnet, ergibt sich der zu verzinsende Gesamtdarlehensbetrag $B_{\text{ges}}$:

$$B_{\text{ges}} = B_0 + \text{UFMIP} = B_0 \cdot 1{,}0175$$

### 2. Monatliche Annuität und laufende Gesamtrate (PITI + MIP)

Die monatliche Rate für Zins und Tilgung ($M_{\text{ZT}}$) berechnet sich nach der klassischen Annuitätenformel auf Basis von $B_{\text{ges}}$:

$$M_{\text{ZT}} = B_{\text{ges}} \cdot \frac{i \cdot (1 + i)^n}{(1 + i)^n - 1}$$

Dabei gelten folgende Variablendefinitionen:
*   $i = \frac{r_{\text{nom}}}{12}$: Monatlicher Periodenzinssatz (jährlicher Nominalzinssatz geteilt durch 12 Monate)
*   $n$: Gesamtzahl der monatlichen Raten (bei 30 Jahren Laufzeit gilt $n = 360$, bei 15 Jahren gilt $n = 180$)
*   $s_{\text{MIP}}$: Jährlicher Prämiensatz der laufenden FHA-Versicherung (standardmäßig $0{,}55\text{ \%}$ p. a. bei 30 Jahren Laufzeit und 3,5 % Anzahlung)

Die monatliche Teilrate für die laufende Hypothekenversicherung ($M_{\text{MIP}}$) wird auf Grundlage des Basisdarlehens $B_0$ ermittelt:

$$M_{\text{MIP}} = \frac{B_0 \cdot s_{\text{MIP}}}{12}$$

Addiert man die über ein Treuhandkonto (Escrow Account) abgerechneten Grundsteuern ($T_{\text{Grund}}$), die Wohngebäudeversicherung ($V_{\text{Gebäude}}$) sowie eventuelle Gebühren der Eigentümergemeinschaft ($G_{\text{HOA}}$), lautet die Formel für die monatliche Gesamtbelastung:

$$M_{\text{gesamt}} = M_{\text{ZT}} + M_{\text{MIP}} + \frac{T_{\text{Grund}}}{12} + \frac{V_{\text{Gebäude}}}{12} + G_{\text{HOA}}$$

## Praxisbeispiel: Schritt-für-Schritt-Kalkulation einer FHA-Hypothek

Betrachten wir eine vollständige Beispielrechnung für den Erwerb eines Einfamilienhauses zu einem Kaufpreis von **320.000,00 €** (beziehungsweise dem entsprechenden US-Dollar-Betrag) bei minimaler Anzahlung:

*   **Kaufpreis ($K$):** `320.000,00 €`
*   **Anzahlung ($q_{\text{EK}} = 3{,}5\text{ \%}$):** `11.200,00 €`
*   **Nominalzinssatz ($r_{\text{nom}}$):** `6,00 %` p. a. (Monatszins $i = 0{,}50\text{ \%} = 0{,}005$)
*   **Kreditlaufzeit:** `30 Jahre` ($n = 360$ Monate)
*   **Jährliche MIP ($s_{\text{MIP}}$):** `0,55 %` p. a.
*   **Grundsteuer ($1{,}25\text{ \%}$ p. a.):** `4.000,00 €` pro Jahr
*   **Wohngebäudeversicherung:** `1.440,00 €` pro Jahr
*   **HOA-Gemeinschaftsumlage:** `85,00 €` pro Monat

### Rechenweg im Detail

1.  **Basisdarlehen ($B_0$) ermitteln:**
    $$B_0 = 320.000{,}00\text{ €} - 11.200{,}00\text{ €} = 308.800{,}00\text{ €}$$
2.  **Vorab-Versicherungsprämie ($\text{UFMIP}$) und Gesamtdarlehen ($B_{\text{ges}}$) bestimmen:**
    $$\text{UFMIP} = 308.800{,}00\text{ €} \cdot 0{,}0175 = 5.404{,}00\text{ €}$$
    $$B_{\text{ges}} = 308.800{,}00\text{ €} + 5.404{,}00\text{ €} = 314.204{,}00\text{ €}$$
3.  **Monatliche Zins- und Tilgungsrate ($M_{\text{ZT}}$) berechnen:**
    Mit dem Aufzinsungsfaktor $(1{,}005)^{360} \approx 6{,}022575$ ergibt sich:
    $$M_{\text{ZT}} = 314.204{,}00\text{ €} \cdot \frac{0{,}005 \cdot 6{,}022575}{6{,}022575 - 1} = 314.204{,}00\text{ €} \cdot 0{,}005995505 = 1.883{,}81\text{ €}$$
4.  **Laufende Nebenkosten und monatliche MIP addieren:**
    *   Monatliche MIP: $\frac{308.800{,}00\text{ €} \cdot 0{,}0055}{12} = 141{,}53\text{ €}$
    *   Monatliche Grundsteuer: $\frac{4.000{,}00\text{ €}}{12} = 333{,}33\text{ €}$
    *   Monatliche Gebäudeversicherung: $\frac{1.440{,}00\text{ €}}{12} = 120{,}00\text{ €}$
    *   Monatliche HOA-Gebühr: $85{,}00\text{ €}$
5.  **Monatliche Gesamtrate ($M_{\text{gesamt}}$):**
    $$M_{\text{gesamt}} = 1.883{,}81\text{ €} + 141{,}53\text{ €} + 333{,}33\text{ €} + 120{,}00\text{ €} + 85{,}00\text{ €} = 2.563{,}67\text{ €}$$

## Referenzmatrix: Aktuelle FHA-MIP-Sätze nach Laufzeit und Eigenkapital

Für Standard-FHA-Kredite (bis zu einem Basisdarlehen von 726.200 $) gelten folgende jährliche Prämiensätze und Bindungsfristen:

| Kreditlaufzeit | Anzahlung (Eigenkapital) | Beleihungsauslauf (LTV) | Jährlicher MIP-Satz | Zahlungsdauer der jährlichen MIP |
| :--- | :--- | :--- | :--- | :--- |
| **Über 15 Jahre (z. B. 30 J.)** | `< 5,0 %` (min. `3,5 %`) | `> 95,0 %` | **0,55 % p. a.** | Gesamte Kreditlaufzeit (30 Jahre) |
| **Über 15 Jahre (z. B. 30 J.)** | `5,0 % bis < 10,0 %` | `> 90,0 % bis 95,0 %` | **0,50 % p. a.** | Gesamte Kreditlaufzeit (30 Jahre) |
| **Über 15 Jahre (z. B. 30 J.)** | `≥ 10,0 %` | `≤ 90,0 %` | **0,50 % p. a.** | Automatischer Wegfall nach **11 Jahren** |
| **Bis 15 Jahre** | `< 10,0 %` (min. `3,5 %`) | `> 90,0 %` | **0,40 % p. a.** | Gesamte Kreditlaufzeit (15 Jahre) |
| **Bis 15 Jahre** | `≥ 10,0 %` | `≤ 90,0 %` | **0,15 % p. a.** | Automatischer Wegfall nach **11 Jahren** |

## Wichtige Bonitätsregeln und typische Fehler bei der Planung

Wer eine FHA-Finanzierung plant oder mit einem konventionellen Bankkredit vergleicht, sollte drei strukturelle Besonderheiten beachten:

*   **Verschuldungsquoten (Debt-to-Income Ratio, DTI):** Die FHA prüft zwei Kennzahlen. Die *Front-End Ratio* setzt die monatliche Wohnkostenrate ($M_{\text{gesamt}}$) ins Verhältnis zum monatlichen Bruttoeinkommen und darf im Regelfall **31 %** nicht überschreiten. Die *Back-End Ratio* schließt alle weiteren Kreditverpflichtungen (Autokredite, Studienkredite, Kreditkarten) ein und liegt standardmäßig bei maximal **43 %**.
*   **Verzinsungseffekt der mitfinanzierten UFMIP:** Da die Vorabprämie von $1{,}75\text{ \%}$ zum Kreditbetrag addiert wird, zahlen Sie über 30 Jahre hinweg auch auf diese Gebühr Zinsen. Im obigen Beispiel kosten die mitfinanzierten `5.404,00 €` bei `6,00 %` Zinsen über die Gesamtlaufzeit zusätzlich rund `6.260,00 €` an Zinsaufwand.
*   **Lebenslange MIP-Bindung bei 3,5 % Anzahlung:** Anders als die private Hypothekenversicherung (PMI) bei konventionellen US-Darlehen, die automatisch entfällt, sobald durch Tilgung 20 % Eigenkapital (80 % LTV) erreicht sind, läuft die FHA-MIP bei einer Startanzahlung unter 10 % bis zur letzten Rate weiter. Sobald Ihre Restschuld unter 80 % des aktuellen Immobilienwerts sinkt, lohnt sich daher meist eine Umschuldung in ein konventionelles Darlehen.
