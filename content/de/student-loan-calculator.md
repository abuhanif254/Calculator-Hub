---
title: "Studienkredit Rechner: Rückzahlung & Zinsrechner"
metaTitle: "Studienkredit Rechner: BAföG, KfW & Rückzahlung planen"
description: "Berechnen Sie Monatsraten, Gesamtzinsen und Tilgungsdauer für Studienkredite, KfW-Darlehen und BAföG-Rückzahlungen inklusive Karenzzeit und Sondertilgung."
metaDescription: "Studienkredit Rechner für DACH: Berechnen Sie Monatsrate, Effektivzins, Zinskosten in der Karenzzeit sowie die Ersparnis durch Sondertilgung und BAföG."
metaKeywords: "studienkredit rechner, kfw studienkredit zinsen, bafoeg rueckzahlung rechner, bildungskredit tilgungsplan, karenzzeit zinsen, sondertilgung studienkredit, studienfinanzierung dach"
faqs:
  - question: "Wie unterscheidet sich die BAföG-Rückzahlung von einem verzinsten Studienkredit?"
    answer: "In Deutschland besteht die staatliche BAföG-Förderung in der Regel zur Hälfte aus einem Zuschuss und zur Hälfte aus einem zinslosen Staatsdarlehen, dessen Rückzahlung bei regulärem Bezug auf insgesamt 10.010 € gedeckelt ist. Ein klassischer Studienkredit – etwa über die KfW oder Geschäftsbanken – ist dagegen ab der ersten Auszahlung voll verzinst, kennt keine gesetzliche Schuldenobergrenze und erzeugt durch Zinseszinsen erhebliche Zusatzkosten."
  - question: "Was passiert mit den Zinsen während der Auszahlungs- und Karenzzeit?"
    answer: "Bei vielen Studienkrediten können Zinsen während des Studiums und der anschließenden tilgungsfreien Karenzzeit gestundet werden. Dieser Zinsaufschub schont kurzfristig das knappe Budget, doch die aufgelaufenen Zinsen werden der Restschuld zugeschlagen und fortan mitverzinst. Wer zumindest die laufenden Zinsen bereits während der Karenzphase begleicht, verhindert diesen Zinseszinseffekt vollständig."
  - question: "Wie stark verkürzen Sondertilgungen die Laufzeit eines Studienkredits?"
    answer: "Jede Sondertilgung fließt zu 100 % in den Abbau der offenen Restschuld, sodass in allen Folgemonaten weniger Zinsen anfallen und der reguläre Tilgungsanteil Ihrer Monatsrate automatisch steigt. Bei einem Darlehen über 18.000 € zu 6,50 % Sollzins nach 18 Monaten Zinsaufschub verkürzt bereits eine jährliche Sondertilgung von 1.000 € die Tilgungszeit von zehn auf sieben Jahre und spart rund 2.334 € an Zinsen."
  - question: "Sind Zinsen für einen Studienkredit im DACH-Raum steuerlich absetzbar?"
    answer: "In Deutschland lassen sich Kreditzinsen für ein Zweitstudium – etwa einen Master nach dem Bachelor oder ein Studium nach abgeschlossener Berufsausbildung – unbegrenzt als Werbungskosten absetzen; im Erststudium gelten sie im Rahmen der Sonderausgaben bis 6.000 € pro Jahr. In Österreich sind Bildungsdarlehenszinsen unter bestimmten Voraussetzungen als Werbungskosten bei Aus- oder Fortbildung abziehbar, während in der Schweiz Schuldzinsen grundsätzlich im Rahmen des privaten Schuldzinsenabzugs berücksichtigt werden."
  - question: "Welches Risiko bergen variable Zinssätze wie beim KfW-Studienkredit?"
    answer: "Variable Studienkredite orientieren sich meist am europäischen Referenzzins EURIBOR zuzüglich einer festen Bankmarge und werden halbjährlich angepasst. Steigt der Sollzins während einer zehnjährigen Rückzahlung um zwei Prozentpunkte, erhöhen sich Monatsrate und Gesamtzinskosten spürbar. Eine solide Tilgungsplanung prüft daher immer auch ein konservatives Stressszenario mit höherem Zinssatz."
---

Ein Studienkredit begleitet Absolventinnen und Absolventen häufig viele Jahre in den Berufsalltag hinein. Anders als gewöhnliche Ratenkredite bestehen typische Bildungsdarlehen im DACH-Raum – vom KfW-Studienkredit und dem Bildungskredit des Bundes bis zu regionalen Förderkrediten in Österreich und der Schweiz – aus drei Phasen: der **Auszahlungsphase** mit monatlichen Teilbeträgen, einer tilgungsfreien **Karenzzeit** für den Berufseinstieg und der anschließenden **Tilgungsphase**. Mit dem **Studienkredit Rechner** simulieren Sie exakt, wie Zinssatz, Zinsaufschub in der Karenzzeit, Wunschrate und Sondertilgungen Ihre monatliche Belastung, Restlaufzeit und gesamten Zinskosten verändern.

## Mathematische Grundlagen: Zinsaufschub, Annuität und Tilgungsdauer

In der Tilgungsphase arbeiten fast alle Studienkredite als **Annuitätendarlehen** mit konstanter Monatsrate `R`. Werden Zinsen während einer `m`-monatigen Karenzzeit gestundet und dem Saldo zugeschlagen (Kapitalisierung), wächst die anfängliche Auszahlungssumme `K_0` bis zum Tilgungsstart auf `K_Start`. Die maßgeblichen Formeln lauten:

```text
Anfangsschuld nach Zinsaufschub:  K_Start = K_0 × (1 + i)^m
Konstante Monatsrate:             R       = K_Start × [i × (1 + i)^n] ÷ [(1 + i)^n − 1]
Tilgungsdauer bei Wunschrate R:   n       = −ln(1 − (K_Start × i) ÷ R) ÷ ln(1 + i)
Gesamter Zinsaufwand:             Z       = (R × n) − K_0
Effektiver Jahreszins (PAngV):    i_eff   = (1 + i)^12 − 1
```

Die Variablen sind wie folgt definiert:

- **`K_0` (Ausgezahlte Kreditsumme):** Gesamtbetrag aller bezogenen Studienzahlungen in Euro (`€`) am Ende der Auszahlungsphase.
- **`i` (Monatlicher Sollzins):** Jährlicher Sollzinssatz geteilt durch `12`. Wegen der monatlichen Zinsverrechnung liegt der Effektivzins `i_eff` leicht über dem nominalen Sollzins.
- **`m` (Monate mit Zinsaufschub):** Dauer der Karenzphase mit gestundeten, monatlich kapitalisierten Zinsen. Zahlen Sie Zinsen laufend selbst, gilt `K_Start = K_0`.
- **`n` (Tilgungsdauer in Monaten):** Zahl der Monatsraten bis zur Volltilgung. Bei gewählter Rate `R` muss zwingend `R > K_Start × i` gelten, da die Restschuld sonst unaufhörlich anwächst.

## Durchgerechnetes Praxisbeispiel: 18.000 € Studienkredit mit Karenzzeit

Eine Absolventin bezog über 30 Monate jeweils `600,00 €` und beendet das Studium mit **`K_0 = 18.000,00 €`** Darlehenssumme. Der Sollzins beträgt **`6,50 % p. a.`** (`6,70 %` Effektivzins). Sie nutzt eine **18-monatige Karenzzeit mit Zinsaufschub** (`m = 18`) und vereinbart danach **10 Jahre Tilgung** (`n = 120` Monate).

1. **Monatszins bestimmen:** `i = 0,065 ÷ 12 = 0,00541667` (`0,5417 %` monatlich).
2. **Kapitalisierung in der Karenzzeit:** Mit `(1 + i)^18 = 1,102121` steigt die Restschuld vor der ersten Tilgungsrate auf `K_Start = 18.000,00 € × 1,102121 = 19.838,19 €` – der Zinsaufschub addiert **`1.838,19 €`** an Zinseszinsen.
3. **Konstante Monatsrate berechnen:** Über `(1 + i)^120 = 1,912184` ergibt sich `R = 19.838,19 € × (0,00541667 × 1,912184) ÷ (1,912184 − 1) = 225,26 €`.
4. **Zins- und Tilgungsverlauf prüfen:** Im **1. Monat** entfallen `107,46 €` auf Zinsen und `117,80 €` auf Tilgung. Im **120. Monat** betragen die Zinsen nur noch `1,21 €`, während `224,05 €` die letzte Restschuld tilgen.
5. **Gesamtkosten bilanzieren:** Über zehn Jahre fließen **`27.031,03 €`** an die Bank zurück. Gegenüber `18.000,00 €` Auszahlung entstehen **`9.031,03 €`** reine Zinskosten.

### Wirkung einer höheren Monatsrate ab Berufseinstieg
Hebt dieselbe Absolventin ihre Rate gleich zu Beginn auf glatte **`300,00 €`** an, verkürzt sich die Tilgungsdauer auf **83 Monate** (6 Jahre und 11 Monate). Die Gesamtrückzahlung sinkt auf **`24.627,51 €`** – eine Ersparnis von **37 Monaten** und **`2.403,52 €`** Zinsen.

## Rückzahlungsstrategien für 18.000 € Studienkredit im Vergleich

Die Tabelle vergleicht zentrale Rückzahlungsmodelle für **`18.000,00 €`** Ausgangsdarlehen bei **`6,50 % Sollzins p. a.`**:

| Rückzahlungsstrategie | Startschuld | Monatsrate | Tilgungsdauer | Gesamtrückzahlung | Gesamtzinsen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Sofortige Tilgung (5 Jahre)** | 18.000,00 € | 352,19 € | 60 Monate | 21.131,44 € | 3.131,44 € |
| **Sofortige Tilgung (10 Jahre)** | 18.000,00 € | 204,39 € | 120 Monate | 24.526,36 € | 6.526,36 € |
| **18 Mon. Karenz, Zinsen gezahlt** | 18.000,00 € | 204,39 € | 120 Monate | 26.281,36 € | 8.281,36 € |
| **18 Mon. Karenz, Zinsaufschub (10 J.)** | 19.838,19 € | 225,26 € | 120 Monate | 27.031,03 € | 9.031,03 € |
| **18 Mon. Aufschub + 1.000 € ST/Jahr** | 19.838,19 € | 225,26 € | 84 Monate | 24.697,01 € | 6.697,01 € |
| **18 Mon. Karenz, Zinsaufschub (15 J.)** | 19.838,19 € | 172,81 € | 180 Monate | 31.106,14 € | 13.106,14 € |

Bereits das laufende Zahlen der Karenzzinsen (`97,50 €` monatlich, gesamt `1.755,00 €`) spart gegenüber dem Zinsaufschub **`749,67 €`**. Noch wirksamer ist eine jährliche Sondertilgung (`ST`) von **`1.000,00 €`**: Sie verkürzt die Laufzeit um drei Jahre auf **84 Monate** und spart **`2.334,02 €`** Zinsen.

Eine klare Sonderstellung in Deutschland genießt das staatliche **BAföG**: Sein Darlehensanteil bleibt dauerhaft zinslos, startet erst fünf Jahre nach Ende der Regelstudienzeit in vierteljährlichen Raten ab `130 €` pro Monat und ist bei regulärem Bezug gesetzlich auf **`10.010 €`** gedeckelt. Bei einer vorzeitigen Einmalzahlung gewährt das Bundesverwaltungsamt zudem einen spürbaren prozentualen Nachlass auf die Restschuld. Auch Studienbeihilfen in Österreich sowie kantonale Darlehen in der Schweiz liegen kostenseitig weit unter ungesicherten Bankkrediten.

## Häufige Fehler bei der Studienkredit-Rückzahlung vermeiden

- **Zinsaufschub unüberlegt voll ausschöpfen:** Gestundete Zinsen erzeugen Zinseszinsen über die gesamte Laufzeit. Sobald ein stabiles Gehalt fließt, spart der sofortige Wechsel in die aktive Tilgung Hunderte Euro.
- **Zinsänderungsrisiko variabler Kredite unterschätzen:** Klettert im Beispiel mit 18-monatigem Zinsaufschub der variable Sollzins (halbe Jahresanpassung am EURIBOR) von `6,50 %` auf `8,50 %`, steigt die Monatsrate auf **`253,41 €`** und die Zinslast wächst um **`3.378,01 €`** auf **`12.409,04 €`**.
- **Zuerst zinsloses BAföG statt Bankdarlehen tilgen:** Hochverzinste Studienkredite haben Vorrang. Eine vorzeitige Einmalablösung des BAföG lohnt sich rechnerisch nur, wenn der gesetzliche Nachlass die eingesparten Bankzinsen übersteigt.
- **Steuerliche Zinsabsetzbarkeit liegen lassen:** Kreditzinsen (nicht die reine Tilgung) sind in Deutschland im Zweitstudium unbegrenzt als Werbungskosten absetzbar; legen Sie die jährliche Zinsbescheinigung stets Ihrer Steuererklärung bei.
- **Kostenfreie Sondertilgung und Umschuldung vernachlässigen:** Programme wie der KfW-Studienkredit gestatten kostenfreie Sondertilgungen ohne Vorfälligkeitsentschädigung. Bei dauerhaft hohen variablen Sätzen schafft nach dem Berufseinstieg oft eine Umschuldung in einen festverzinslichen Ratenkredit deutliche Zinsersparnis.
