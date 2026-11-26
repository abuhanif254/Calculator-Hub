---
title: "Calculadora de Ecuación de Nernst: Electroquímica"
description: "Guía técnica sobre la ecuación de Nernst en electroquímica: potencial de celda en condiciones no estándar, versión a 25 °C, cociente Q, relación con ΔG y ejemplo resuelto."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "nernst-equation-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué disminuye el voltaje de una batería conforme se descarga?"
    answer: "Al operar la celda electroquímica, los reactivos se consumen y los productos se acumulan, lo que incrementa progresivamente el cociente de reacción Q. Dado que la ecuación de Nernst resta un término proporcional a ln(Q), el potencial real de la celda (E) desciende de forma continua hasta alcanzar E = 0 V en el equilibrio."
  - question: "¿Cuándo es válido utilizar el factor simplificado 0.0592 V en la ecuación de Nernst?"
    answer: "El factor 0.0592 V (más exactamente 0.05916 V) solo es válido a exactamente 25 °C (298.15 K) y empleando logaritmo en base 10 (log₁₀(Q)). Si el sistema opera a otra temperatura, como 37 °C en fisiología (donde el factor pasa a 0.0615 V) o en una celda industrial caliente, debe utilizarse la forma completa con RT/(nF) y logaritmo natural."
  - question: "¿Qué ocurre cuando el cociente de reacción Q es menor que 1?"
    answer: "Cuando Q < 1 (predominan los reactivos sobre los productos respecto a las condiciones estándar), ln(Q) y log₁₀(Q) toman valores negativos. Al restar una cantidad negativa en la ecuación de Nernst, el potencial real de la celda (E) resulta mayor que el potencial estándar E°."
  - question: "¿Por qué la ecuación de Nernst permite construir celdas de concentración con E° = 0 V?"
    answer: "En una celda de concentración ambos electrodos son del mismo material y tienen idéntico potencial estándar, de modo que E°_celda = 0 V. Sin embargo, si las concentraciones iónicas en ambos compartimentos difieren, Q es distinto de 1 y el término −(RT/nF) × ln(Q) genera un voltaje neto positivo que impulsa la igualación de concentraciones."
  - question: "¿Cómo se determina correctamente el valor de n en la ecuación de Nernst?"
    answer: "El parámetro n corresponde al número total de moles de electrones transferidos en la ecuación redox global balanceada, no al de una sola semirreacción sin ajustar. Por ejemplo, al combinar Al → Al³⁺ + 3e⁻ con Cu²⁺ + 2e⁻ → Cu, el mínimo común múltiplo es 6, por lo que n = 6."
---

Los potenciales estándar (`E°`) aplican únicamente a `25 °C` (`298.15 K`), actividad `1 M` en disolución y `1 bar` (`≈ 1 atm`) para gases. Sin embargo, baterías, sensores electroquímicos, sistemas de corrosión y membranas biológicas operan casi siempre fuera de esas condiciones ideales.

La **ecuación de Nernst** calcula el **potencial real (`E`)** para cualquier temperatura y concentración no estándar, vinculando la termodinámica con el voltaje en voltios (`V`). La [Calculadora de Ecuación de Nernst](/es/calculadoras/calculadora-de-ecuacion-de-nernst) resuelve tanto la forma térmica general como la expresión simplificada a `25 °C`.

## Formulación matemática y parámetros fundamentales

Para una reacción redox reversible con transferencia de `n` moles de electrones:

```text
E = E° − [(R × T) / (n × F)] × ln(Q)
```

Donde:

- **`E` y `E°`:** potencial real y potencial estándar de celda (`E°_cátodo − E°_ánodo`), en `V`.
- **`R`:** constante de los gases (`8.31446 J/(mol·K)`).
- **`T`:** temperatura absoluta en kelvin (`K = °C + 273.15`).
- **`n`:** moles de electrones transferidos en la ecuación global balanceada.
- **`F`:** constante de Faraday (`96,485 C/mol`).
- **`Q`:** cociente de reacción (`[Productos]^p / [Reactivos]^r`), omitiendo sólidos y líquidos puros.

### Forma simplificada a 25 °C (298.15 K)

Al convertir `ln(Q) = 2.302585 × log₁₀(Q)` a `298.15 K`, el factor `(R × T × 2.302585) / F` vale `0.05916 V` (habitualmente redondeado a `0.0592 V`):

```text
E = E° − (0.05916 / n) × log₁₀(Q)
```

### Vínculo con la energía libre de Gibbs (ΔG) y el equilibrio

La energía libre satisface `ΔG = −n × F × E` y `ΔG° = −n × F × E°`. En una celda agotada (`E = 0 V`), `Q` iguala a `Keq`:

```text
ln(Keq) = (n × F × E°) / (R × T)
log₁₀(Keq) = (n × E°) / 0.05916   (a 25 °C)
```

## Ejemplo numérico resuelto paso a paso

Considere una pila Daniell operando a `25 °C` (`298.15 K`) con concentraciones no estándar: `[Cu²⁺] = 1.50 M` y `[Zn²⁺] = 0.015 M`. Los potenciales estándar de reducción son `E°(Cu²⁺/Cu) = +0.340 V` y `E°(Zn²⁺/Zn) = −0.763 V`.

**Paso 1: Escribir la reacción global balanceada y hallar `E°` y `n`.**

El cobre se reduce en el cátodo y el cinc se oxida en el ánodo transfiriendo `n = 2` electrones:

```text
Zn(s) + Cu²⁺(ac) ⇌ Zn²⁺(ac) + Cu(s)
E°_celda = E°_cátodo − E°_ánodo = 0.340 V − (−0.763 V) = +1.103 V
```

**Paso 2: Calcular el cociente de reacción `Q`.**

Los electrodos metálicos sólidos (`Zn` y `Cu`) tienen actividad unitaria y se omiten:

```text
Q = [Zn²⁺] / [Cu²⁺] = 0.015 M / 1.50 M = 0.010 = 10⁻²
```

**Paso 3: Aplicar la ecuación de Nernst a `25 °C`.**

```text
E = 1.103 − (0.05916 / 2) × log₁₀(0.010)
E = 1.103 − (0.02958) × (−2)
E = 1.103 + 0.05916 ≈ 1.162 V
```

Verificando con la forma exacta en logaritmo natural: `(8.31446 × 298.15) / (2 × 96,485) × ln(0.010) = 0.012846 × (−4.60517) = −0.05916 V`, confirmando `E = 1.162 V`. Al existir un exceso de reactivo (`Cu²⁺`) y escasez de producto (`Zn²⁺`), el voltaje real supera al estándar en `59.2 mV`.

## Tabla de escenarios y celdas electroquímicas representativas

| Escenario o sistema | Valor de E° | Cociente Q | Efecto sobre E | Significado fisicoquímico |
| :--- | :--- | :--- | :--- | :--- |
| Condiciones estándar | `E° > 0` | `Q = 1` | `E = E°` | El término logarítmico se anula (`ln(1) = 0`) |
| Exceso de reactivos (`25 °C`, `n = 2`) | `E° > 0` | `Q = 10⁻³` | `E = E° + 0.0887 V` | Mayor fuerza impulsora hacia productos |
| Exceso de productos (`25 °C`, `n = 2`) | `E° > 0` | `Q = 10³` | `E = E° − 0.0887 V` | Batería parcialmente descargada |
| Celda totalmente agotada | `E° > 0` | `Q = Keq` | `E = 0 V` | Equilibrio termodinámico (`ΔG = 0`) |
| Celda de concentración (`n = 1`, `25 °C`) | `E° = 0 V` | `0.01 / 1.0 = 10⁻²` | `E = +0.1183 V` | Impulsada solo por gradiente de concentración |
| Potencial de equilibrio de `K⁺` (`37 °C`) | `E° = 0 V` | `[K⁺]_int / [K⁺]_ext ≈ 30` | `E ≈ −90.9 mV` | Base del potencial de reposo neuronal |

## Aplicaciones en sensores, baterías, fisiología y errores frecuentes

La ecuación de Nernst sustenta el funcionamiento de **pH-metros** y electrodos selectivos de iones (`59.16 mV` por unidad de pH a `25 °C` con `n = 1`), la construcción de diagramas de corrosión de Pourbaix, el modelado de curvas de descarga en baterías de ion-litio y el cálculo de potenciales de equilibrio transmembrana para `Na⁺`, `K⁺` y `Cl⁻` en neurofisiología a `37 °C` (`310.15 K`).

Evite cuatro errores frecuentes al calcular `E`:

1. **Mezclar `0.0592` con `ln` o `RT/(nF)` con `log₁₀`:** emplear el logaritmo incorrecto altera el término de corrección por un factor de `2.3026`.
2. **Dejar `T` en grados Celsius:** introducir `25` en lugar de `298.15 K` reduce el término térmico en más de un `90 %`.
3. **Aplicar `0.0592 V` fuera de `25 °C`:** en medios fisiológicos a `37 °C` (`310.15 K`) el coeficiente exacto es `0.0615 V`.
4. **Invertir `Q` o errar en `n`:** colocar los reactivos en el numerador invierte el signo del desplazamiento de voltaje, y elegir un `n` distinto al de la ecuación redox global balanceada distorsiona la pendiente logarítmica.
