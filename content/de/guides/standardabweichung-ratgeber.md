---
title: "Standardabweichung verstehen mit Beispielen"
description: "Eine klare Erklärung von Standardabweichung und Varianz: Der Unterschied zwischen Populations- und Stichprobenformeln und was σ über die Datenstreuung aussagt."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "standard-deviation-calculator"
---

## Was ist die Standardabweichung?

Die **Standardabweichung** ist ein Maß dafür, wie stark die Werte in einem Datensatz um den Mittelwert (Durchschnitt) streuen. Eine kleine Standardabweichung bedeutet, dass sich die Werte eng um den Mittelwert konzentrieren; eine große Standardabweichung bedeutet, dass die Werte weit verstreut sind.

Sie beantwortet die grundlegende Frage: *"Wie typisch ist der Durchschnitt?"*

Die Standardabweichung wird durch den griechischen Buchstaben **σ (Sigma)** für eine Grundgesamtheit (Population) und **s** für eine Stichprobe dargestellt.

## Die Formeln

### Standardabweichung der Grundgesamtheit (σ)
Verwenden Sie diese, wenn Sie Daten für eine **gesamte Population** haben.

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{N}(x_i - \mu)^2}{N}}
$$

### Standardabweichung der Stichprobe (s)
Verwenden Sie diese, wenn Ihre Daten eine **Stichprobe aus einer größeren Population** sind.

$$
s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
$$

**Der entscheidende Unterschied:** Die Stichprobenformel dividiert durch **(n − 1)** anstelle von **n**. Dies wird **Bessel-Korrektur** genannt.

## Schritt-für-Schritt-Anleitung: Berechnungsbeispiel

**Datensatz: [4, 7, 13, 2, 1]** (Stichprobe, n = 5)

### Schritt 1: Mittelwert berechnen
$$
\bar{x} = \frac{4 + 7 + 13 + 2 + 1}{5} = 5,4
$$

### Schritt 2: Abweichung vom Mittelwert finden
$$ -1,4, 1,6, 7,6, -3,4, -4,4 $$

### Schritt 3: Abweichungen quadrieren
$$ 1,96, 2,56, 57,76, 11,56, 19,36 $$

### Schritt 4: Quadrierte Abweichungen summieren
$$ \sum = \textbf{93,2} $$

### Schritt 5: Durch (n − 1) dividieren (Stichprobenvarianz)
$$ s^2 = \frac{93,2}{4} = \textbf{23,3} $$

### Schritt 6: Quadratwurzel ziehen
$$ s = \sqrt{23,3} \approx \textbf{4,83} $$

## Die empirische Regel (68-95-99,7 Regel)
Für normalverteilte Daten (Glockenkurve):
- **μ ± 1σ:** 68,27 % der Werte
- **μ ± 2σ:** 95,45 % der Werte
- **μ ± 3σ:** 99,73 % der Werte

## Häufig gestellte Fragen

**Warum ist die Standardabweichung nützlicher als die Varianz?**
Die Varianz ist in quadrierten Einheiten. Die Standardabweichung bringt die Streuung auf die ursprüngliche Maßeinheit zurück, sodass sie direkt vergleichbar ist.

**Kann die Standardabweichung null oder negativ sein?**
Sie kann null sein (wenn alle Werte identisch sind), aber sie kann **niemals** negativ sein.
