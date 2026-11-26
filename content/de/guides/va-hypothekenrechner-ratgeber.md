---
title: "Der ultimative Leitfaden für VA-Kredite: Keine Anzahlung, keine PMI"
description: "Erfahren Sie, wie die VA-Finanzierungsgebühr berechnet wird, warum keine private Hypothekenversicherung anfällt und wie Sie mit dem VA-Hypothekenrechner Ihre exakte Monatsrate ermitteln."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "va-mortgage-calculator"
relatedType: "calculator"
faqs:
  - question: "Wer hat Anspruch auf ein staatlich abgesichertes VA-Hypothekendarlehen?"
    answer: "Anspruchsberechtigt sind aktive Angehörige der US-Streitkräfte, Veteranen mit entsprechender Mindestdienstzeit, Mitglieder der Nationalgarde und Reserve sowie bestimmte überlebende Ehepartner. Als verbindlicher Nachweis gegenüber der kreditgebenden Bank dient das sogenannte Certificate of Eligibility (COE), das beim US-Department of Veterans Affairs beantragt wird."
  - question: "Warum fällt bei einem VA-Kredit trotz 0 % Anzahlung keine PMI an?"
    answer: "Bei konventionellen US-Hypotheken mit weniger als 20 % Eigenkapital verlangen Banken eine private Hypothekenversicherung (PMI), um ihr Ausfallrisiko abzudecken. Beim VA-Darlehen übernimmt das Department of Veterans Affairs eine staatliche Ausfallgarantie für einen erheblichen Teil der Kreditsumme, sodass die laufende monatliche Versicherungsprämie vollständig entfällt."
  - question: "Wie hoch ist die einmalige VA-Finanzierungsgebühr (VA Funding Fee)?"
    answer: "Bei der erstmaligen Nutzung ohne Anzahlung beträgt die VA-Finanzierungsgebühr regulär 2,15 % des Basisdarlehens. Mit mindestens 5 % Anzahlung sinkt sie auf 1,50 %, ab 10 % Anzahlung auf 1,25 %. Bei einer erneuten Nutzung ohne Anzahlung steigt der Satz auf 3,30 %, während sich die Sätze bei 5 % bzw. 10 % Eigenkapital ebenfalls auf 1,50 % und 1,25 % reduzieren."
  - question: "Welche Kreditnehmer sind von der VA-Finanzierungsgebühr befreit?"
    answer: "Von der Gebühr vollständig befreit sind Veteranen, die eine VA-Entschädigung für eine dienstbedingte Behinderung erhalten oder Anspruch darauf hätten (sofern sie keine Ruhestandsbezüge vorziehen), aktive Soldaten mit Purple-Heart-Auszeichnung vor Abschluss sowie berechtigte überlebende Ehepartner gefallener oder vollständig dienstbeschädigter Militärangehöriger."
  - question: "Gibt es bei VA-Darlehen weiterhin eine gesetzliche Darlehensobergrenze?"
    answer: "Für Kreditnehmer mit vollem, ungenutztem VA-Anspruch (Full Entitlement) existiert seit 2020 keine bundesweite Darlehensobergrenze mehr für eine Finanzierung ohne Anzahlung. Bestehen hingegen bereits aktive oder zuvor ausgefallene VA-Kredite (Partial Entitlement), richtet sich das anzahlungsfreie Limit nach den jeweiligen County-spezifischen FHFA-Obergrenzen."
---

Ein **VA-Darlehen** (VA Loan) ist ein vom US-Department of Veterans Affairs (VA) abgesichertes Hypothekendarlehen, das aktiven US-Soldaten, Veteranen und berechtigten Ehepartnern den Erwerb von selbst genutztem Wohneigentum ohne Anzahlung und ohne laufende private Hypothekenversicherung (**PMI**) ermöglicht. Weil die Bundesbehörde gegenüber privaten Kreditgebern einen Teil des Ausfallrisikos garantiert, vergeben Banken diese Kredite häufig zu Zinssätzen, die rund **0,25 bis 0,50 Prozentpunkte** unter vergleichbaren konventionellen Hypotheken liegen.

Anstelle einer monatlichen Versicherungsprämie erhebt die Behörde jedoch meist eine einmalige **VA-Finanzierungsgebühr** (VA Funding Fee), die in der Regel direkt in den Darlehensbetrag eingerechnet wird. Ein herkömmlicher Tilgungsrechner bildet diese Besonderheit nicht ab. Mit unserem [VA-Hypothekenrechner](/de/rechner/va-hypothekenrechner) ermitteln Sie automatisch die exakte Finanzierungsgebühr nach Nutzungsstatus und Anzahlung, addieren sie korrekt zum Darlehenskapital und berechnen Ihre tatsächliche monatliche Belastung inklusive Grundsteuer und Wohngebäudeversicherung.

## Methodik, Parameter und Berechnungsformel

Die Kalkulation eines festverzinslichen VA-Darlehens verläuft in drei logischen Schritten: Zuerst wird das Basisdarlehen aus Kaufpreis und Eigenkapital ermittelt, anschließend die prozentuale VA-Finanzierungsgebühr aufgeschlagen (sofern keine Befreiung vorliegt) und abschließend die monatliche Annuität auf das erhöhte Gesamtdarlehen berechnet.

```text
Basisdarlehen (P_basis) = Kaufpreis × (1 − Anzahlungsquote)
Finanzierungsgebühr (F) = P_basis × Gebührensatz_VA
Gesamtdarlehen (P_ges)  = P_basis + F
Monatsrate Zins & Tilg. = P_ges × [r × (1 + r)^n] / [(1 + r)^n − 1]
Gesamtrate (PITI)       = Monatsrate Zins & Tilg. + Grundsteuer/12 + Gebäudeversicherung/12
```

Die entscheidenden Eingangsgrößen des Modells lauten:

- **`P_basis` (Basisdarlehen):** Finanzierungsbedarf nach Abzug einer Anzahlung (`Kaufpreis` bei 0 % Eigenkapital).
- **`Gebührensatz_VA` (Funding Fee):** Gesetzlich gestaffelter Satz zwischen **0,00 %** (bei Befreiung) und **3,30 %** (Folgenutzung ohne Anzahlung). Für eine reine Zinssenkungs-Umschuldung (**IRRRL**) gilt pauschal **0,50 %**.
- **`r` (Monatlicher Zinssatz):** Jährlicher Nominalzins geteilt durch zwölf (`Sollzins p. a. ÷ 12`).
- **`n` (Laufzeit in Monaten):** Standardmäßig `360` Monate bei 30 Jahren oder `180` Monate bei 15 Jahren.

Wird die Finanzierungsgebühr nicht bar bei Abschluss gezahlt, erhöht sie das verzinste Kapital `P_ges` und verursacht über die Laufzeit zusätzliche Zinsen.

## Durchgerechnetes Beispiel: Kauf ohne Anzahlung mit Erstnutzung

Angenommen, Sie erwerben als erstmaliger VA-Kreditnehmer ein Einfamilienhaus für **400.000 $** ohne Anzahlung (`0 %`). Sie wählen eine 30-jährige Zinsbindung (`n = 360`) zu einem gebundenen Nominalzinssatz von **6,00 % p. a.** (`r = 0,06 ÷ 12 = 0,005`).

1. **Basisdarlehen und Finanzierungsgebühr:** Da keine Anzahlung geleistet wird, beträgt `P_basis = 400.000 $`. Bei Erstnutzung unter 5 % Anzahlung greift der Gebührensatz von **2,15 %**:
   `F = 400.000 $ × 0,0215 = 8.600,00 $`
2. **Verzinstes Gesamtdarlehen:** Durch die Einfinanzierung der Gebühr steigt die Kreditsumme auf:
   `P_ges = 400.000 $ + 8.600,00 $ = 408.600,00 $`
3. **Monatliche Zins- und Tilgungsrate (P&I):**
   ```text
   M = 408.600 × [0,005 × (1,005)^360] / [(1,005)^360 − 1]
   M = 408.600 × [0,005 × 6,022575] / [6,022575 − 1] = 2.449,76 $
   ```
4. **Vollständige Wohnkostenrate (PITI):** Rechnet man beispielhaft **400,00 $** monatlich für Grundsteuer (*Property Tax*) und **150,00 $** für die Wohngebäudeversicherung (*Homeowners Insurance*) hinzu, liegt die gesamte monatliche Belastung bei **2.999,76 $** — bei **0,00 $** PMI.

Verglichen mit einem befreiten Veteranen (`P_ges = 400.000 $`, Rate **2.398,20 $** P&I) erhöht die mitfinanzierte Gebühr die Monatsrate um **51,56 $**. Über 360 Monate summiert sich diese Mehrbelastung auf **18.561,60 $**, weil auf die **8.600 $** Gebühr zusätzlich **9.961,60 $** Zinsen entfallen.

## Szenariovergleich: VA-Gebührenstaffel vs. konventionelles Darlehen

Die folgende Tabelle vergleicht die reine Zins-, Tilgungs- und Versicherungsbelastung (ohne Grundsteuer/Gebäudeversicherung) für ein Objekt zum Kaufpreis von **400.000 $** bei 30 Jahren Laufzeit und **6,00 %** VA-Zinssatz gegenüber einem konventionellen Darlehen mit **6,50 %** Zins und **0,65 %** jährlicher PMI:

| Finanzierungsszenario | Anzahlung | Gebühr / PMI-Satz | Finanzierte Kreditsumme | Monatliche Rate (P&I + PMI) | Eigenkapital bei Abschluss |
|---|---|---|---|---|---|
| VA Erstnutzung (0 % Anzahlung) | 0 $ | 2,15 % Einmalgebühr | 408.600,00 $ | 2.449,76 $ | 0 $ |
| VA Erstnutzung (5 % Anzahlung) | 20.000 $ | 1,50 % Einmalgebühr | 385.700,00 $ | 2.312,47 $ | 20.000 $ |
| VA Erstnutzung (10 % Anzahlung) | 40.000 $ | 1,25 % Einmalgebühr | 364.500,00 $ | 2.185,36 $ | 40.000 $ |
| VA Folgenutzung (0 % Anzahlung) | 0 $ | 3,30 % Einmalgebühr | 413.200,00 $ | 2.477,34 $ | 0 $ |
| VA Befreiter Veteran (0 % Anzahlung) | 0 $ | 0,00 % (befreit) | 400.000,00 $ | 2.398,20 $ | 0 $ |
| Konventionell (5 % Anzahlung) | 20.000 $ | 0,65 % PMI p. a. | 380.000,00 $ | 2.607,69 $ | 20.000 $ |

Selbst bei 0 % Anzahlung und 2,15 % Finanzierungsgebühr bleibt das VA-Darlehen monatlich **157,93 $** günstiger als ein konventionelles Darlehen mit 5 % Anzahlung (`2.401,86 $` Rate zuzüglich `205,83 $` PMI = `2.607,69 $`). Zudem schont der Wegfall der 20.000 $-Anzahlung Ihre sofortige Liquidität erheblich.

## Praxisregeln, Fallstricke und behördliche Vorgaben

In der praktischen Anwendung übersehen Käufer bei VA-Finanzierungen häufig vier wichtige Details, die über Wirtschaftlichkeit und Genehmigungsfähigkeit entscheiden:

- **Resale-Risiko bei 100-%-Finanzierung:** Wer mit 0 % Anzahlung kauft und die 2,15 %- oder 3,30 %-Gebühr mitfinanziert, startet mit einer Beleihung von **102,15 % bis 103,30 %** des Immobilienwerts. Müssen Sie das Haus in den ersten zwei bis drei Jahren verkaufen, reicht der Verkaufserlös nach Abzug von Makler- und Abschlusskosten eventuell nicht zur Tilgung der Restschuld.
- **Restliche Einkommensprüfung (*Residual Income*) statt starrer DTI-Grenze:** Obwohl viele Banken eine Schuldenquote (**DTI**) von maximal 41 % anstreben, bewertet das VA-System primär das monatlich frei verfügbare Resteinkommen nach Abzug aller Wohnkosten, Steuern und Lebenshaltungskosten gestaffelt nach Region und Haushaltsgröße.
- **Strenge VA-Gutachterstandards (*MPR*):** Jede finanzierte Immobilie muss den *Minimum Property Requirements* des VA genügen (sicheres Dach, funktionierende Heizung, schädlingsfreier Zustand, bleifreie Anstriche). Stark renovierungsbedürftige Objekte scheitern daher häufig an der Bewertung.
- **Nutzungspflicht als Hauptwohnsitz:** VA-Darlehen sind auf selbst genutzte Hauptwohnsitze mit Einzug meist innerhalb von **60 Tagen** beschränkt. Reine Kapitalanlagen sind ausgeschlossen; Mehrfamilienhäuser bis zu vier Einheiten sind zulässig, sofern Sie eine Einheit selbst bewohnen.

Prüfen Sie vor Angebotsabgabe, ob eine **5-%-Anzahlung** Ihre Gebühr auf **1,50 %** senkt und sich angesichts Ihrer Haltedauer rechnet.
