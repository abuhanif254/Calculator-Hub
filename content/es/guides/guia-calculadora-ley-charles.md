---
title: "Calculadora de la Ley de Charles: Volumen vs. Temperatura"
description: "Guía técnica sobre la ley de Charles: relación isobárica V₁/T₁ = V₂/T₂, conversión obligatoria a kelvin, ejemplo numérico resuelto, tabla térmica y aplicaciones en ingeniería."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "charles-law-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la temperatura debe convertirse siempre a Kelvin antes de aplicar la ley de Charles?"
    answer: "Porque el volumen de un gas ideal solo es directamente proporcional a la temperatura medida desde el cero absoluto (-273.15 °C). En grados Celsius la escala tiene un cero arbitrario en la congelación del agua, lo que produce cocientes erróneos, divisiones por cero a 0 °C o volúmenes negativos bajo cero."
  - question: "¿Qué ocurre realmente si se enfría un gas hacia el cero absoluto (0 K)?"
    answer: "La extrapolación lineal de la ley de Charles predice volumen nulo a 0 K, pero ningún gas real alcanza ese estado manteniendo su fase gaseosa. Antes de llegar a 0 K, las atracciones intermoleculares provocan que el gas se licúe o solidifique (por ejemplo, el nitrógeno condensa a 77.36 K y el helio a 4.22 K)."
  - question: "¿Qué variables permanecen fijas en la ley de Charles?"
    answer: "La ley de Charles describe un proceso estrictamente isobárico en sistema cerrado: tanto la presión externa que soporta el gas como la cantidad de moles (masa gaseosa) deben mantenerse constantes durante todo el calentamiento o enfriamiento."
  - question: "¿Qué diferencia histórica existe entre la ley de Charles y la ley de Gay-Lussac?"
    answer: "Jacques Charles descubrió en 1787 la expansión térmica de los gases a presión constante, mientras que Joseph Louis Gay-Lussac publicó los resultados cuantitativos en 1802 y también formuló la relación análoga entre presión y temperatura a volumen constante. Por ello, en la literatura técnica hispana a veces se cita la relación V/T como primera ley de Charles y Gay-Lussac."
  - question: "¿Puede aplicarse la ley de Charles a un recipiente rígido como un cilindro metálico de gas?"
    answer: "No. Un cilindro rígido impide que el volumen cambie (proceso isocórico, no isobárico). Al calentar un gas en un tanque cerrado de acero, el volumen permanece fijo y lo que aumenta proporcionalmente es la presión interna, fenómeno regido por la ley de Gay-Lussac (P₁/T₁ = P₂/T₂)."
---

La **ley de Charles** establece que, a presión y cantidad de sustancia constantes, el volumen de un gas ideal es directamente proporcional a su temperatura termodinámica absoluta. Expresada mediante la relación `V₁ / T₁ = V₂ / T₂`, esta ley explica la expansión térmica de los gases al calentarse y su contracción al enfriarse cuando el recipiente se adapta libremente a una presión externa fija.

Observada por Jacques Charles en 1787 y publicada cuantitativamente por Joseph Louis Gay-Lussac en 1802, esta linealidad fundamentó el concepto de cero absoluto (`-273.15 °C`). Nuestra [Calculadora de la Ley de Charles](/es/calculadoras/calculadora-de-ley-de-charles) convierte automáticamente temperaturas a kelvin y resuelve cualquier incógnita; aquí examinamos su base física, un ejercicio resuelto verificado, una tabla térmica y los errores de cálculo más comunes.

## Principios físicos y formulación matemática

En un proceso isobárico (`P = constante`), elevar la temperatura aumenta la energía cinética traslacional media de las moléculas, incrementando la fuerza de sus colisiones contra las paredes móviles del recipiente (como un émbolo sin fricción o una membrana flexible). Para mantener la presión interna igualada con la presión atmosférica exterior, el volumen aumenta hasta compensar la mayor energía cinética con una menor densidad numérica de partículas.

La ecuación canónica de la ley de Charles es:

```text
V / T = constante = (n × R) / P
V₁ / T₁ = V₂ / T₂
```

### Definición de variables y exigencia de escala absoluta

* **`V₁` y `V₂` (volúmenes inicial y final):** espacio ocupado por el gas, en unidades coherentes (`L`, `mL`, `cm³` o `m³`).
* **`T₁` y `T₂` (temperaturas absolutas):** deben expresarse obligatoriamente en **kelvin (`K`)** mediante `T(K) = T(°C) + 273.15` (o en Rankine, `T(°R) = T(°F) + 459.67`).
* **Coeficiente de expansión isobárica:** todo gas ideal a `0 °C` (`273.15 K`) expande su volumen en `1 / 273.15` (`0.3661 %`) de su volumen a `0 °C` por cada kelvin de incremento térmico.

## Ejemplo resuelto paso a paso: expansión térmica en laboratorio

Una jeringa de vidrio con émbolo de fricción despreciable contiene `V₁ = 2.50 L` de nitrógeno seco a `T₁ = 20.0 °C` y presión atmosférica constante de `1.00 atm`. Se sumerge en un baño térmico hasta alcanzar `T₂ = 95.0 °C`. Calculamos el volumen final `V₂` y el porcentaje de expansión.

### Paso 1: Conversión obligatoria de Celsius a Kelvin

```text
T₁ = 20.0 + 273.15 = 293.15 K
T₂ = 95.0 + 273.15 = 368.15 K
```

### Paso 2: Despeje y verificación aritmética

Despejando `V₂` desde `V₁ / T₁ = V₂ / T₂`:

```text
V₂ = V₁ × (T₂ / T₁)
V₂ = 2.50 L × (368.15 K / 293.15 K)
V₂ = 920.375 L·K / 293.15 K = 3.1396 L ≈ 3.14 L
```

El volumen aumenta en `0.64 L`, equivalente a una expansión del `25.58 %`. Si se hubiera cometido el error de dividir directamente en grados Celsius (`2.50 × 95.0 / 20.0`), se habría obtenido `11.88 L`, un fallo cercano al `278 %` respecto al valor termodinámico real.

## Tabla de expansión isobárica para 1.000 L de gas ideal

La tabla detalla la evolución volumétrica de `V₀ = 1.000 L` medido a `0 °C` y `1.00 atm` en seis puntos térmicos:

| Temperatura (`°C`) | Temperatura absoluta (`K`) | Relación `T / 273.15` | Volumen (`L`) | Cambio frente a `0 °C` | Densidad relativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `-50.0 °C` | `223.15 K` | `0.81695` | `0.817 L` | `-18.30 %` | `122.4 %` |
| `0.0 °C` | `273.15 K` | `1.00000` | `1.000 L` | `0.00 %` (base) | `100.0 %` |
| `25.0 °C` | `298.15 K` | `1.09152` | `1.092 L` | `+9.15 %` | `91.6 %` |
| `100.0 °C` | `373.15 K` | `1.36610` | `1.366 L` | `+36.61 %` | `73.2 %` |
| `200.0 °C` | `473.15 K` | `1.73220` | `1.732 L` | `+73.22 %` | `57.7 %` |
| `300.0 °C` | `573.15 K` | `2.09830` | `2.098 L` | `+109.83 %` | `47.7 %` |

Al pasar de `0 °C` (`273.15 K`) a `273.15 °C` (`546.30 K`), la temperatura absoluta se duplica, el volumen alcanza `2.000 L` y la densidad del gas cae exactamente a la mitad.

## Usos reales, errores habituales y límites experimentales

La ley de Charles explica múltiples procesos térmicos en ingeniería y física aplicada:

* **Globos aerostáticos:** al calentar el aire interior de la envoltura abierta a la atmósfera, el gas se expande manteniendo presión casi igual a la exterior y expulsa masa por la boca inferior, reduciendo su densidad respecto al aire frío circundante para generar empuje ascensional.
* **Balones y neumáticos en clima frío:** un balón inflado a `22 °C` (`295.15 K`) reduce su volumen teórico aproximadamente un `7.5 %` al enfriarse a `0 °C` (`273.15 K`).
* **Panificación y horneado:** los gases atrapados en la masa fermentada se expanden notablemente entre `25 °C` y `200 °C`, contribuyendo al volumen final de la estructura alveolar.

### Advertencias de rigor experimental

* **Tensión elástica del contenedor:** un globo de látex muy tenso ejerce presión adicional variable según su diámetro, alterando la condición isobárica estricta.
* **Evaporación y presión de vapor:** si existe agua líquida dentro del sistema, calentar incrementa los moles de vapor gaseoso `n` y rompe el supuesto de masa fija.
* **Proximidad al punto de condensación:** cerca de la temperatura de licuefacción o bajo presiones altas, las fuerzas atractivas intermoleculares desvían la curva de la linealidad ideal hasta producir cambio de fase.
