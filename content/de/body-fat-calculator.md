---
title: "Körperfettanteil-Rechner"
metaTitle: "Körperfettanteil-Rechner: KFA mit US-Navy-Methode prüfen"
description: "Berechnen Sie Ihren Körperfettanteil (KFA), Ihre absolute Fettmasse und Ihre fettfreie Körpermasse (Magermasse) anhand der US-Navy-Umfangsmethode."
metaDescription: "Kostenloser Körperfettanteil-Rechner nach US-Navy-Methode: KFA, Fettmasse, Magermasse und Fitness-Kategorie aus Hals-, Taillen- und Hüftumfang."
metaKeywords: "körperfettanteil rechner, kfa berechnen, us navy methode formel, magermasse berechnen, fettmasse körper, körperfett tabelle mann frau, umfangsmessung"
faqs:
  - question: "Wie genau ist die US-Navy-Methode im Vergleich zu DEXA-Scan oder BIA-Waage?"
    answer: "Die US-Navy-Umfangsmethode weicht im Vergleich zu klinischen Referenzverfahren wie dem DEXA-Scan oder dem hydrostatischen Wiegen im Mittel um rund drei bis vier Prozentpunkte ab. Da sie nicht wie günstige Körperfettwaagen (BIA) stark von tageszeitlichen Schwankungen des Wasserhaushalts abhängt, eignet sie sich bei standardisierter Messtechnik hervorragend zur verlässlichen Verlaufskontrolle."
  - question: "An welcher Körperstelle werden Hals-, Taillen- und Hüftumfang korrekt gemessen?"
    answer: "Der Halsumfang wird waagerecht unmittelbar unterhalb des Kehlkopfs gemessen. Beim Taillenumfang unterscheidet die US-Navy-Formel nach Geschlecht: Männer messen exakt waagerecht auf Höhe des Bauchnabels, Frauen hingegen an der schmalsten Stelle des Oberkörpers oberhalb des Nabels. Der ausschließlich bei Frauen benötigte Hüftumfang wird an der breitesten Stelle des Gesäßes abgenommen."
  - question: "Warum ist der Körperfettanteil oft aussagekräftiger als der klassische BMI?"
    answer: "Der Body-Mass-Index (BMI) betrachtet lediglich Gesamtgewicht und Körpergröße, unterscheidet aber nicht zwischen Muskelgewebe und Körperfett. Kraftsportler mit hoher Muskelmasse gelten nach BMI häufig als übergewichtig, obwohl ihr Körperfettanteil im athletischen Bereich liegt. Umgekehrt deckt der KFA eine normalgewichtige Adipositas auf, bei der trotz normalem Gewicht zu wenig Muskelmasse und zu viel Bauchfett vorliegt."
  - question: "Warum liegen die gesunden Körperfett-Richtwerte für Frauen deutlich höher als für Männer?"
    answer: "Frauen benötigen biologisch bedingt einen höheren Anteil an essenziellem Struktur- und Depotfett zur Aufrechterhaltung des Hormonhaushalts, des Menstruationszyklus und der Fortpflanzungsfähigkeit. Während das lebensnotwendige Minimum bei Männern bei etwa 2 bis 5 % liegt, beträgt es bei Frauen rund 10 bis 13 %; dauerhaft niedrigere Werte können zu Zyklusausfällen und Knochendichteverlust führen."
  - question: "Wozu werden Körpergewicht und Alter im Körperfettanteil-Rechner benötigt?"
    answer: "Für die eigentliche Berechnung des prozentualen Körperfettanteils nach der US-Navy-Formel sind ausschließlich Geschlecht, Körpergröße und die jeweiligen Körperumfänge erforderlich. Das Körpergewicht nutzt der Rechner anschließend, um die absolute Fettmasse sowie die fettfreie Körpermasse (Magermasse) in Kilogramm oder Pfund aufzuschlüsseln; das Alter dient der Plausibilitätsprüfung für Erwachsene und Jugendliche ab 15 Jahren."
---

## Körperzusammensetzung präziser bewerten als auf der Waage

Die klassische Badezimmerwaage misst ausschließlich die gesamte Körpermasse, verrät jedoch nichts über deren Zusammensetzung. Zwei Menschen mit identischer Körpergröße und demselben Gewicht können gesundheitlich völlig unterschiedlich aufgestellt sein: Während eine trainierte Person über ausgeprägte Skelettmuskulatur und geringe Fettreserven verfügt, kann eine untrainierte Person bei gleichem Gewicht einen riskant hohen Anteil an stoffwechselaktivem Bauchfett (Viszeralfett) tragen. Genau diese diagnostische Lücke schließt der **Körperfettanteil (KFA)**.

Unser **Körperfettanteil-Rechner** nutzt die wissenschaftlich validierte **US-Navy-Methode** nach Hodgdon und Beckett (1984). Sie erfordert weder teure Laboruntersuchungen noch schwankungsanfällige Strommessungen, sondern lediglich ein flexibles Schneidermaßband. Aus Geschlecht, Körpergröße, Hals- und Taillenumfang (sowie dem Hüftumfang bei Frauen) schätzt das Verfahren zunächst die mittlere **Körperdichte** und leitet daraus über die **Siri-Gleichung** den prozentualen Körperfettanteil, die **absolute Fettmasse**, die **fettfreie Körpermasse (Magermasse)** – bestehend aus Muskulatur, Knochen, Organen und Körperwasser – sowie die sportmedizinische Fitness-Kategorie ab. Eingaben sind im metrischen SI-System (`cm`, `kg`) wie auch in angloamerikanischen Einheiten (`ft/in`, `lbs`) möglich.

## Die exakten Formeln der US-Navy-Methode

Sämtliche Berechnungen erfolgen intern verlustfrei in Zentimetern (`cm`) und Kilogramm (`kg`). Die Gleichungen verknüpfen eine logarithmische Schätzung der Körperdichte **`D`** (in `g/cm³`) mit der klassischen Siri-Formel `KFA (%) = (495 / D) − 450`:

```text
1. Männer (Bedingung: U_T > U_H):
   D_Mann  = 1,0324 − 0,19077 × log10(U_T − U_H) + 0,15456 × log10(h)
   KFA (%) = (495 / D_Mann) − 450

2. Frauen (Bedingung: U_T + U_Hü > U_H):
   D_Frau  = 1,29579 − 0,35004 × log10(U_T + U_Hü − U_H) + 0,22100 × log10(h)
   KFA (%) = (495 / D_Frau) − 450

3. Absolute Fettmasse und fettfreie Masse (Magermasse):
   m_Fett  = m × (KFA / 100)  [kg]   |   m_Mager = m − m_Fett  [kg]

Umrechnung angloamerikanischer Eingaben:
   1 lb = 0,453592 kg  |  1 Fuß (ft) = 30,48 cm  |  1 Zoll (in) = 2,54 cm
```

**Bedeutung der Variablen:**
- **`h`** steht für die Körpergröße in Zentimetern (`cm`).
- **`U_H`** bezeichnet den Halsumfang in `cm` (dient als Maß für Statur und Knochenbau).
- **`U_T`** ist der Taillenumfang in `cm` (Männer auf Bauchnabelhöhe, Frauen an der schmalsten Rumpfstelle).
- **`U_Hü`** ist der Hüftumfang in `cm` (nur in der weiblichen Formel enthalten, um die physiologische Fettverteilung im Becken- und Gesäßbereich abzubilden).
- **`m`** gibt das gesamte Körpergewicht in Kilogramm (`kg`) an; **`log10`** ist der dekadische Logarithmus zur Basis 10.

## Schritt-für-Schritt-Rechenbeispiele

### Beispiel 1: Mann (34 Jahre, 180 cm, 82,0 kg)
Gemessene Umfänge: Halsumfang 39,0 cm, Taillenumfang auf Bauchnabelhöhe 85,0 cm.

1. **Umfangsdifferenz bestimmen:** `U_T − U_H = 85,0 cm − 39,0 cm = 46,0 cm`.
2. **Dekadische Logarithmen berechnen:** `log10(46,0) = 1,662758` und `log10(180,0) = 2,255273`.
3. **Körperdichte ermitteln:** `D_Mann = 1,0324 − (0,19077 × 1,662758) + (0,15456 × 2,255273) = 1,0324 − 0,317204 + 0,348575 = 1,063771 g/cm³`.
4. **Körperfettanteil berechnen:** Eingesetzt in die Siri-Gleichung ergibt sich `(495 / 1,063771) − 450 = 465,326 − 450 = 15,33 %`, gerundet **15,3 %** (Kategorie **Fitness**).
5. **Fettmasse und Magermasse aufteilen:** Bei 82,0 kg Gesamtgewicht entfallen **12,6 kg** (`12,57 kg`) auf reine Fettmasse und **69,4 kg** (`69,43 kg`) auf fettfreie Körpermasse.

### Beispiel 2: Frau (31 Jahre, 168 cm, 62,0 kg)
Gemessene Umfänge: Hals 33,0 cm, schmalste Taille 69,0 cm, breiteste Hüfte 95,0 cm.

1. **Kombinierter Umfangswert:** `U_T + U_Hü − U_H = 69,0 + 95,0 − 33,0 = 131,0 cm`.
2. **Körperdichte berechnen:** Mit `log10(131,0) = 2,117271` und `log10(168,0) = 2,225309` folgt `D_Frau = 1,29579 − 0,741130 + 0,491793 = 1,046454 g/cm³`.
3. **Ergebnis:** Über die Siri-Formel ergibt sich ein KFA von `23,03 %` (gerundet **23,0 %**, Kategorie **Fitness**). Das entspricht **14,3 kg Fettmasse** und **47,7 kg fettfreier Masse**.

## Referenztabelle: Körperfett-Kategorien nach Geschlecht

Die Einteilung im Rechner orientiert sich an den international etablierten Grenzwerten des American Council on Exercise (ACE), die auch in der deutschsprachigen Sportmedizin als praxisnahe Richtschnur dienen:

|Kategorie|Männer (KFA)|Frauen (KFA)|Physiologische und sportliche Einordnung|
|:---|:---|:---|:---|
|**Zu niedrig (kritisch)**|unter 2 %|unter 10 %|Gesundheitlich bedenklich; Risiko für Hormon- und Organstörungen|
|**Essenzielles Fett**|2 % – 5 %|10 % – 13 %|Lebensnotwendige Grundreserve; nur kurzfristig im Wettkampfsport|
|**Athleten**|6 % – 13 %|14 % – 20 %|Sehr geringer Fettanteil, ausgeprägte Muskeldefinition|
|**Fitness**|14 % – 17 %|21 % – 24 %|Schlank, sportlich, stoffwechselgesunder Zielbereich|
|**Durchschnitt / Akzeptabel**|18 % – 24 %|25 % – 31 %|Gesellschaftlicher Normbereich ohne akutes Übergewichtsrisiko|
|**Adipositas (stark erhöht)**|ab 25 %|ab 32 %|Deutlich erhöhtes Risiko für Herz-Kreislauf- und Stoffwechselerkrankungen|

Im höheren Erwachsenenalter verschieben sich die physiologischen Normbereiche moderat nach oben: Ab etwa 40 Jahren nimmt die Skelettmuskulatur ohne gezieltes Krafttraining schrittweise ab, sodass ein leicht höherer Körperfettanteil um ein bis zwei Prozentpunkte pro Lebensjahrzehnt medizinisch unbedenklich bleibt.

## Häufige Messfehler vermeiden und Fortschritte sicher verfolgen

- **Maßband exakt anlegen:** Führen Sie das Maßband flach und waagerecht über die nackte Haut, ohne Gewebe einzudrücken oder Luftspalten zu lassen. Bereits 2 cm Messabweichung am Bauch verändern den berechneten KFA bei einem erwachsenen Mann um etwa 1,6 bis 2,0 Prozentpunkte.
- **Standardisierte Bedingungen einhalten:** Messen Sie stets morgens nüchtern nach dem Toilettengang in entspannter Haltung – niemals direkt nach Mahlzeiten oder intensivem Krafttraining. Atmen Sie vor dem Ablesen des Taillenumfangs ruhig aus und ziehen Sie den Bauch keinesfalls ein.
- **Grenzen der Umfangsmethode kennen:** Während die Methode das gesundheitlich relevante Bauchfett gut abbildet, kann sie bei ausgeprägten Kraftsportlern mit sehr starker Nackenmuskulatur den wahren Fettanteil leicht unterschätzen. Auch bei stark atypischer Fettverteilung an Armen oder Beinen liefert eine klinische DEXA-Messung oder eine fachgerechte Caliper-Hautfaltenmessung (etwa die 7-Falten-Methode nach Jackson und Pollock) genauere Einzelwerte.
- **Verlaufskurve statt Momentaufnahme nutzen:** Beim gleichzeitigen Fettabbau und Muskelaufbau (Körperrekomposition) stagniert die Personenwaage oft über Wochen. Wenn Ihr Taillenumfang alle zwei bis vier Wochen messbar abnimmt und die berechnete Magermasse stabil bleibt oder ansteigt, arbeiten Ernährung und Training nachweislich in die richtige Richtung.
