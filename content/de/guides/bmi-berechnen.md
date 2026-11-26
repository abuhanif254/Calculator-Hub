---
title: "So berechnen Sie Ihren BMI und was er bedeutet"
description: "Ein umfassender Leitfaden zum Body-Mass-Index: die Standardformel, die Klassifikation nach WHO und DAG, ein Rechenbeispiel sowie klinische Grenzen und ergänzende Maße."
category: "Health"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "bmi-calculator"
faqs:
  - question: "Ab welchem Wert gilt ein BMI offiziell als Übergewicht oder Adipositas?"
    answer: "Nach der Klassifikation der Weltgesundheitsorganisation (WHO) und der Deutschen Adipositas-Gesellschaft (DAG) beginnt Übergewicht (Präadipositas) ab einem BMI von 25,0 kg/m². Ab 30,0 kg/m² liegt eine Adipositas Grad I vor, ab 35,0 kg/m² Grad II und ab 40,0 kg/m² Grad III. Ein BMI zwischen 18,5 und 24,9 kg/m² gilt für Erwachsene im Allgemeinen als Normalgewicht."
  - question: "Warum unterscheidet der BMI nicht zwischen Muskelmasse und Körperfett?"
    answer: "Die Formel nutzt ausschließlich das Gesamtkörpergewicht und die Körpergröße im Quadrat. Da Muskelgewebe eine höhere Dichte als Fettgewebe besitzt, erhalten gut trainierte Kraftsportler trotz niedrigem Körperfettanteil häufig einen BMI über 25,0 kg/m². Umgekehrt können Menschen mit wenig Muskulatur einen normalen BMI aufweisen, obwohl ihr viszeraler Fettanteil erhöht ist."
  - question: "Gelten für ältere Menschen ab 65 Jahren andere BMI-Empfehlungen?"
    answer: "Ja. Während die formale WHO-Grenze unverändert bei 18,5 bis 24,9 kg/m² liegt, empfehlen Fachgesellschaften wie die Deutsche Gesellschaft für Ernährung (DGE) und die ESPEN für Personen ab 65 Jahren häufig einen Zielbereich von etwa 22 bis 27 kg/m². Leicht höhere Energiereserven im Alter verringern das Risiko für Mangelernährung und Sarkopenie."
  - question: "Können Kinder und Jugendliche mit derselben BMI-Formel bewertet werden?"
    answer: "Die rechnerische Formel bleibt identisch, die Auswertung unterscheidet sich jedoch grundlegend. Da sich Körperproportionen und Fettanteil im Wachstum ständig verändern, werden Kinder und Jugendliche nicht nach festen Erwachsenengrenzen beurteilt, sondern anhand alters- und geschlechtsspezifischer BMI-Perzentile (im DACH-Raum etwa nach Kromeyer-Hauschild)."
  - question: "Welche Kennzahlen ergänzen den BMI am sinnvollsten?"
    answer: "In der klinischen Praxis wird der BMI vor allem mit dem Taillenumfang und dem Taille-zu-Größe-Verhältnis (Waist-to-Height Ratio, WHtR) kombiniert. Ein Taillenumfang über 94 cm bei Männern beziehungsweise über 80 cm bei Frauen deutet auf ein erhöhtes kardiometabolisches Risiko hin; beim WHtR gilt ein Wert unter 0,50 als günstiger Richtwert."
---

Der Body-Mass-Index (BMI) setzt das Körpergewicht in Relation zum Quadrat der Körpergröße und liefert damit einen standardisierten Orientierungswert zur Einordnung des Körpergewichts. Nach der Klassifikation der Weltgesundheitsorganisation (WHO) liegt der Normalbereich für Erwachsene zwischen `18,5` und `24,9 kg/m²`; Werte ab `25,0 kg/m²` gelten als Übergewicht (Präadipositas), Werte ab `30,0 kg/m²` als Adipositas.

Als epidemiologisches Screening-Instrument ermöglicht der BMI eine schnelle Risikoeinschätzung für Herz-Kreislauf-Erkrankungen und Typ-2-Diabetes ohne Labor- oder Geräteaufwand. Da die Kennzahl jedoch weder die Körperzusammensetzung noch die Fettverteilung erfasst, sollte sie stets gemeinsam mit dem Taillenumfang und individuellen Gesundheitsdaten interpretiert werden.

## Methodik, Formel und genaue Parameterdefinition

Die Berechnung geht auf den belgischen Mathematiker Adolphe Quetelet zurück, der bereits im 19. Jahrhundert beobachtete, dass das Gewicht gesunder Erwachsener näherungsweise proportional zum Quadrat der Körpergröße ansteigt. In der medizinischen Diagnostik wird der BMI in der Einheit `kg/m²` angegeben, auch wenn im Alltag oft nur die reine Maßzahl genannt wird.

```text
BMI = Körpergewicht (kg) / [Körpergröße (m)]²
```

Falls die Körpergröße in Zentimetern vorliegt, wird sie vorab durch `100` geteilt oder direkt über den Faktor `10.000` skaliert:

```text
BMI = [Körpergewicht (kg) × 10.000] / [Körpergröße (cm)]²
```

Für eine reproduzierbare Berechnung müssen die beiden Eingangsgrößen exakt definiert und standardisiert erfasst werden:

- **Körpergewicht (`kg`):** Messung auf einer kalibrierten Waage am besten morgens nach dem Aufstehen, nüchtern und nach dem Toilettengang in minimaler Bekleidung. Tagesschwankungen durch Nahrung, Flüssigkeit und Glykogenspeicher betragen leicht `1` bis `2 kg`.
- **Körpergröße (`m` oder `cm`):** Messung barfuß, aufrecht stehend, mit Fersen, Gesäß und Hinterkopf an einer ebenen Wand. Da die Bandscheiben im Tagesverlauf leicht komprimiert werden, fällt die Körpergröße abends häufig um `1` bis `1,5 cm` geringer aus als morgens.

In der wissenschaftlichen Literatur existiert zudem der sogenannte „Neue BMI“ nach Nick Trefethen mit dem Exponenten `2,5` statt `2,0`, da sehr große Menschen mit dem klassischen Quadrat leicht überschätzt und sehr kleine Menschen unterschätzt werden. Klinische Leitlinien im deutschsprachigen Raum — darunter die S3-Leitlinie der Deutschen Adipositas-Gesellschaft (DAG) — stützen sich jedoch weiterhin verbindlich auf den klassischen Quetelet-Index.

## Schritt-für-Schritt-Rechenbeispiel mit Gewichtskorridor

Angenommen wird eine erwachsene Person mit einer Körpergröße von `178 cm` und einem gemessenen Gewicht von `84,5 kg`. Ziel ist die Bestimmung des aktuellen BMI, die Einordnung in die WHO-Kategorie sowie die Ableitung des rechnerischen Normalgewichtsbereichs.

1. **Größe in Meter umrechnen:** `178 cm / 100 = 1,78 m`.
2. **Größenwert quadrieren:** `1,78 m × 1,78 m = 3,1684 m²`.
3. **Gewicht durch die quadrierte Größe teilen:** `84,5 kg / 3,1684 m² = 26,6696 kg/m²`. Gerundet auf eine Nachkommastelle ergibt sich ein BMI von **26,7 kg/m²**.
4. **Kategorie zuordnen:** Der Wert liegt zwischen `25,0` und `29,9 kg/m²` und fällt damit in den Bereich **Übergewicht (Präadipositas)**.
5. **Normalgewichtskorridor berechnen:** Durch Umstellen der Formel nach dem Gewicht (`Gewicht = BMI × Größe²`) lässt sich die Gewichtsspanne für den Normalbereich (`18,5` bis `24,9 kg/m²`) bestimmen:
   - Untere Grenze: `18,5 × 3,1684 = 58,6 kg`
   - Obere Grenze: `24,9 × 3,1684 = 78,9 kg`

Zur besseren Einordnung empfiehlt sich im gleichen Schritt der Blick auf den Taillenumfang. Beträgt dieser im Beispiel `92 cm`, liegt er zwar unterhalb der männlichen Risikoschwelle von `94 cm`, ergibt aber ein Taille-zu-Größe-Verhältnis (`92 cm / 178 cm`) von `0,52`. Dieser Wert überschreitet den Richtwert von `0,50` knapp und signalisiert, dass sich bereits moderates Bauchfett angesammelt hat.

## Klassifikationstabelle nach WHO und klinischer Praxis

Die folgende Übersicht zeigt die international gültigen Grenzwerte der WHO für Erwachsene ab 18 Jahren sowie deren Bedeutung für Stoffwechselrisiken und die Versorgungspraxis im DACH-Raum.

| BMI-Bereich (`kg/m²`) | WHO-Klassifikation | Kardiometabolisches Risiko | Klinische Einordnung (DACH-Praxis) |
|---|---|---|---|
| Unter `18,5` | Untergewicht | Erhöht (Mangelernährung, Osteoporose) | Abklärung möglicher konsumierender Erkrankungen, Essstörungen oder Malabsorption |
| `18,5` – `24,9` | Normalgewicht | Geringstes Basisrisiko | Referenzbereich für gesunde Erwachsene mit normaler Muskel- und Fettverteilung |
| `25,0` – `29,9` | Übergewicht (Präadipositas) | Leicht bis moderat erhöht | Präventive Lebensstilberatung; Therapiebedarf vor allem bei hohem Taillenumfang oder Begleiterkrankungen |
| `30,0` – `34,9` | Adipositas Grad I | Deutlich erhöht (Typ-2-Diabetes, Hypertonie) | Strukturierte multimodale Basistherapie aus Ernährung, Bewegung und Verhalten |
| `35,0` – `39,9` | Adipositas Grad II | Hoch (Schlafapnoe, Fettleber, KHK) | Intensivierte medizinische Betreuung; Prüfung medikamentöser oder chirurgischer Optionen bei Komorbiditäten |
| `40,0` und höher | Adipositas Grad III | Sehr hoch | Adipositaszentrum; häufig Indikation für bariatrische/metabolische Eingriffe gemäß S3-Leitlinie |

## Anwendungsbereiche, typische Fehlerquellen und klinische Grenzen

Der BMI eignet sich hervorragend für langfristige Verlaufskontrollen in der Hausarztpraxis, für epidemiologische Vergleiche sowie als erste Einstiegshürde bei Krankenkassen- oder Präventionsprogrammen. In der individuellen Bewertung führt eine isolierte Betrachtung jedoch häufig zu Fehlschlüssen:

- **Fehlende Trennung der Gewebearten:** Kraftsportler oder körperlich hart arbeitende Personen mit hoher fettfreier Masse erreichen schnell Werte von `26` bis `29 kg/m²`, ohne ein erhöhtes Fettdepot zu besitzen. Umgekehrt birgt die sogenannte *Sarkopenische Adipositas* bei älteren oder bewegungsarmen Personen ein Risiko trotz eines scheinbar unauffälligen BMI von `23 kg/m²`.
- **Ignorierte Fettverteilung:** Entscheidend für das Entzündungs- und Diabetesrisiko ist nicht das subkutane Fett an Hüfte oder Oberschenkeln, sondern das metabolisch aktive viszerale Bauchfett. Als verlässliche Ergänzung gelten laut WHO ein Taillenumfang von maximal `94 cm` bei Männern (`> 102 cm` deutlich erhöhtes Risiko) und `80 cm` bei Frauen (`> 88 cm` deutlich erhöhtes Risiko).
- **Alters-, Geschlechts- und Herkunftsunterschiede:** Frauen weisen bei identischem BMI physiologisch einen höheren Körperfettanteil auf als Männer. Bei Menschen asiatischer Abstammung steigt das Diabetesrisiko bereits bei niedrigeren BMI-Werten, weshalb die WHO für den asiatisch-pazifischen Raum Übergewicht bereits ab `23,0 kg/m²` und Adipositas ab `25,0 kg/m²` ansetzt.
- **Messfehler und unrealistische Kurzfristvergleiche:** Selbst geringe Abweichungen bei der Größenmessung wirken sich quadratisch aus. Wird beispielsweise eine Größe von `1,75 m` fälschlich mit `1,72 m` angegeben, steigt der berechnete BMI bei `80 kg` künstlich von `26,1` auf `27,0 kg/m²`.

### Hinweise zu Diagnostik und Datenschutz

Ein rechnerischer BMI ersetzt keine ärztliche Untersuchung mit Blutdruckmessung, Nüchternblutzucker, HbA1c und Lipidprofil. Achten Sie bei digitalen BMI-Rechnern zudem auf Datensparsamkeit: Für eine reine Berechnung sind weder Name noch E-Mail-Adresse erforderlich, und clientseitige Rechner verarbeiten Körpermaße direkt im Browser ohne Speicherung auf externen Servern.
