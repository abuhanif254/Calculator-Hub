---
title: "Resistencia de Cables: Por Qué se Calientan"
description: "Guía técnica sobre la resistencia eléctrica en conductores: ley de Pouillet, efecto Joule, calibración AWG y mm², caída de tensión, corrección térmica y dimensionamiento seguro."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "wire-resistance-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la resistencia total de un circuito de dos hilos se calcula con el doble de la distancia?"
    answer: "En un circuito de corriente continua o monofásico, la corriente circula desde la fuente hasta la carga por el conductor de ida y regresa por el conductor de retorno. Si una carga se ubica a 10 metros del panel, la electricidad recorre 20 metros de cable en total, por lo que tanto la resistencia como la caída de tensión deben multiplicarse por dos."
  - question: "¿Por qué un número AWG menor corresponde a un cable más grueso?"
    answer: "El sistema American Wire Gauge (AWG) proviene del proceso histórico de trefilado de alambres, donde el número indicaba cuántas veces pasaba el metal por matrices progresivamente más estrechas. Cada reducción de tres números AWG duplica aproximadamente el área de la sección transversal y reduce la resistencia a la mitad."
  - question: "¿Cuál es la diferencia práctica entre usar cobre y aluminio en una instalación?"
    answer: "El aluminio eléctrico posee una resistividad cercana a 2.82 × 10⁻⁸ Ω·m frente a 1.72 × 10⁻⁸ Ω·m del cobre recocido, es decir, un 64 % más de resistencia para la misma sección. Para igualar la caída de tensión y el límite térmico del cobre, el aluminio exige subir dos calibres AWG, además de requerir terminales bimetálicos y pasta antioxidante."
  - question: "¿Aumenta la resistencia de un conductor cuando el cable se calienta?"
    answer: "Sí. En metales puros como el cobre y el aluminio, el coeficiente térmico de resistencia es positivo (alrededor de +0.393 % por cada grado Celsius en el cobre). Un cable que pasa de 20 °C a 70 °C incrementa su resistencia en casi un 20 %, lo que eleva la caída de tensión y las pérdidas térmicas bajo carga continua."
  - question: "¿Qué límite de caída de tensión se recomienda para evitar fallos y sobrecalentamiento?"
    answer: "Las normas de referencia como el Código Eléctrico Nacional (NEC) y el reglamento IEC 60364 recomiendan no superar el 3 % de caída de tensión en circuitos ramales individuales ni el 5 % acumulado desde la acometida hasta la carga final. En sistemas de bajo voltaje (12 V o 24 V DC), mantener la caída por debajo del 3 % es crítico."
---

Ningún conductor metálico convencional transporta energía eléctrica sin oposición. Incluso un tramo corto de cobre presenta una **resistencia eléctrica** que transforma parte de la corriente en calor y provoca una pérdida medible de voltaje entre la fuente y el equipo conectado. Cuando el cargador de un dispositivo o un cable alargador se entibian al tacto, están disipando energía térmica proporcional a esa resistencia interna.

Nuestra [Calculadora de Resistencia de Cables](/es/calculadoras/calculadora-de-resistencia-de-cable) determina la resistencia total en ohmios (`Ω`), la caída de tensión y la pérdida térmica según el material, la sección transversal, la longitud del circuito y la temperatura operativa. A continuación se detallan las ecuaciones físicas, un ejemplo numérico verificado, una tabla comparativa por calibre y las pautas normativas esenciales.

## Ley de Pouillet, efecto Joule y parámetros clave

La resistencia en corriente continua de un conductor uniforme queda definida por la **ley de Pouillet**:

```text
R₂₀ = ρ₂₀ × (L / A)
```

- **`R₂₀` (ohmios, `Ω`):** resistencia del tramo a la temperatura de referencia de `20 °C`.
- **`ρ₂₀` (resistividad eléctrica):** constante del material. En cobre recocido estándar (100 % IACS) vale `1.72 × 10⁻⁸ Ω·m` (`0.0172 Ω·mm²/m`). En aluminio eléctrico (serie 1350) sube a `2.82 × 10⁻⁸ Ω·m` (`0.0282 Ω·mm²/m`), mientras que en plata es `1.59 × 10⁻⁸ Ω·m` y en oro `2.44 × 10⁻⁸ Ω·m`.
- **`L` (metros, `m`):** longitud total del recorrido eléctrico. En circuitos DC o monofásicos incluye ida y vuelta (`2 × distancia`).
- **`A` (milímetros cuadrados, `mm²`):** área metálica de la sección transversal, excluyendo el aislamiento.

### Calentamiento por efecto Joule y ajuste térmico

La circulación de corriente disipa calor conforme a la **ley de Joule**, mientras la temperatura altera la resistencia del metal:

```text
P_pérdida = I² × R(T)
ΔV = I × R(T)
R(T) = R₂₀ × [1 + α × (T − 20 °C)]
```

El coeficiente térmico `α` vale `0.00393 °C⁻¹` en cobre y `0.00403 °C⁻¹` en aluminio. Debido al término cuadrático `I²`, duplicar la corriente cuadruplica el calor generado en el cable, elevando `T` y reforzando `R(T)`.

## Ejemplo práctico resuelto: línea solar de 24 V DC

Considere una carga de `15 A` alimentada a `24 V DC` mediante un tendido unidireccional de `10 m` (longitud total de circuito `L = 20 m`) con cable de cobre `14 AWG` (`A = 2.08 mm²`), comparado luego frente a `10 AWG` (`A = 5.26 mm²`).

1. **Resistencia base a `20 °C` (14 AWG):**
   `R₂₀ = 0.0172 × (20 / 2.08) = 0.344 / 2.08 = 0.1654 Ω`
2. **Caída de tensión y pérdidas a `20 °C`:**
   `ΔV₂₀ = 15 A × 0.1654 Ω = 2.48 V` (`10.3 %` de `24 V`, excesivo).
   `P₂₀ = 15² × 0.1654 = 225 × 0.1654 = 37.2 W` disipados en calor.
3. **Corrección térmica a `60 °C` (`ΔT = 40 °C`):**
   `R₆₀ = 0.1654 × [1 + 0.00393 × 40] = 0.1654 × 1.1572 = 0.1914 Ω`
   `ΔV₆₀ = 15 × 0.1914 = 2.87 V` (`12.0 %`) y `P₆₀ = 225 × 0.1914 = 43.1 W`.
4. **Mejora al usar cobre `10 AWG` (`5.26 mm²`):**
   `R₂₀ = 0.0172 × (20 / 5.26) = 0.0654 Ω`
   `ΔV₂₀ = 15 × 0.0654 = 0.98 V` (`4.09 %`) y `P₂₀ = 225 × 0.0654 = 14.7 W`, reduciendo el calentamiento en más de un `60 %`.

## Comparativa técnica por calibre AWG a 20 °C

La tabla resume la geometría y resistencia lineal por kilómetro de un conductor único en cobre (`0.0172 Ω·mm²/m`) y aluminio (`0.0282 Ω·mm²/m`):

| Calibre (AWG) | Diámetro (mm) | Sección (mm²) | Cu (Ω/km) | Al (Ω/km) | Aplicación habitual |
| --- | --- | --- | --- | --- | --- |
| 18 AWG | 1.02 | 0.823 | 20.90 | 34.26 | Señalización, electrónica y tiras LED cortas |
| 16 AWG | 1.29 | 1.31 | 13.13 | 21.53 | Alargadores ligeros y audio automotriz |
| 14 AWG | 1.63 | 2.08 | 8.27 | 13.56 | Circuitos de iluminación residencial (15 A) |
| 12 AWG | 2.05 | 3.31 | 5.20 | 8.52 | Tomas de corriente generales (20 A) |
| 10 AWG | 2.59 | 5.26 | 3.27 | 5.36 | Climatización, secadoras y paneles DC (30 A) |
| 8 AWG | 3.26 | 8.37 | 2.05 | 3.37 | Subpaneles y cargadores EV (40–50 A) |

## Errores frecuentes, efectos en alterna y criterios normativos

Al dimensionar conductores reales, la resistencia DC es solo el punto de partida. Conviene evitar cuatro fallos habituales:

- **Omitir el retorno:** ingresar `10 m` en lugar de `20 m` subestima a la mitad la caída de voltaje en líneas monofásicas o DC. En sistemas trifásicos equilibrados se aplica el factor `√3` (`1.732`) en lugar de `2`.
- **Confundir resistencia con ampacidad:** un tramo corto puede mostrar poca caída de tensión y aun así fundir su cubierta si supera la ampacidad nominal. Las normas NEC e IEC 60364 exigen ajustar la corriente máxima según el aislante (`60 °C`, `75 °C` o `90 °C`), la temperatura ambiente y el agrupamiento en tuberías.
- **Ignorar el efecto pelicular y la reactancia en AC:** en corriente alterna (`50/60 Hz`) y calibres gruesos (`> 70 mm²`), la corriente se concentra hacia la periferia del metal y surge reactancia inductiva (`X_L`), elevando la impedancia por encima del valor DC.
- **Emplear aluminio revestido de cobre (CCA) sin ajuste:** los cables económicos CCA poseen núcleo de aluminio y presentan cerca de un `60 %` más de resistencia que el cobre puro.
