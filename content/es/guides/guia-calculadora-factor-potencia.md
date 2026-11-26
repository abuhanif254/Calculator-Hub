---
title: "Factor de Potencia: La Analogía de la Cerveza"
description: "Comprenda qué es el factor de potencia, la diferencia entre potencia real (kW), reactiva (kVAR) y aparente (kVA) mediante la analogía de la cerveza, y cómo calcular la corrección capacitiva."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "power-factor-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la potencia reactiva no realiza trabajo útil aunque incremente la corriente eléctrica?"
    answer: "La potencia reactiva (medida en kVAR) oscila continuamente entre el generador y los campos magnéticos o eléctricos de motores, transformadores y balastos. Durante un semiciclo de la onda alterna se almacena energía en el campo magnético y durante el siguiente se devuelve a la red, por lo que su promedio neto de trabajo útil es cero, aunque sí circula corriente por los cables."
  - question: "¿Qué diferencia existe entre el factor de potencia de desplazamiento y el factor de potencia real?"
    answer: "El factor de potencia de desplazamiento equivale al coseno del ángulo de desfase entre la onda fundamental de tensión y la de corriente (cos φ). El factor de potencia real incluye además la distorsión armónica total (THD) generada por cargas no lineales como variadores de frecuencia o fuentes conmutadas, reduciendo la relación entre potencia activa y potencia aparente total."
  - question: "¿Por qué las compañías eléctricas imponen recargos cuando el factor de potencia baja de 0.90 o 0.95?"
    answer: "Un factor de potencia bajo obliga a la empresa distribuidora a dimensionar transformadores, líneas de transmisión y subestaciones para transportar una corriente aparente muy superior a la potencia activa facturada en kWh. El recargo tarifario compensa las pérdidas por efecto Joule (I² × R) y la pérdida de capacidad disponible en la infraestructura de distribución."
  - question: "¿Puede producirse un factor de potencia adelantado y causar problemas en la instalación?"
    answer: "Sí. Si se instala un banco de capacitores sobredimensionado o se dejan condensadores fijos conectados cuando la planta trabaja con poca carga inductiva, la corriente se adelanta respecto a la tensión. Un factor de potencia fuertemente capacitivo puede elevar el voltaje en barras por encima de los límites nominales y provocar disparos de protecciones o daños en equipos electrónicos."
  - question: "¿Cómo influyen los armónicos en la selección de un banco de condensadores para corregir el factor de potencia?"
    answer: "Los condensadores presentan una impedancia que disminuye a frecuencias altas, por lo que pueden absorber corrientes armónicas provenientes de rectificadores y variadores de velocidad, o entrar en resonancia paralela con el transformador. En entornos con distorsión armónica apreciable se emplean filtros desintonizados con reactores de rechazo sintonizados por debajo del quinto armónico."
---

En corriente alterna (CA), no toda la electricidad que llega a una instalación realiza trabajo útil. La **analogía de la cerveza** resume con claridad esta división física: al servir una jarra, el **líquido** equivale a la **potencia real (`P`, en kW)** que sí ejecuta trabajo mecánico o térmico; la **espuma** representa la **potencia reactiva (`Q`, en kVAR)** necesaria para sostener los campos magnéticos de motores y transformadores sin producir trabajo neto; y la **jarra completa** corresponde a la **potencia aparente (`S`, en kVA)** que debe transportar la red.

El **factor de potencia (`FP`)** mide la fracción de la capacidad total aprovechada como potencia útil. Mediante nuestra [Calculadora de Factor de Potencia](/es/calculadoras/calculadora-de-factor-de-potencia), puede obtener al instante el `FP`, el ángulo de desfase (`φ`), la potencia reactiva y la capacidad del banco de condensadores requerida para evitar recargos tarifarios.

## Principios técnicos y triángulo de potencias

En un circuito sinusoidal equilibrado, estas tres magnitudes forman el **triángulo de potencias**, donde `P` es el cateto horizontal, `Q` el vertical y `S` la hipotenusa:

```text
S = √(P² + Q²)
FP = P / S = cos(φ)
Q = P × tan(φ) = S × sin(φ)
```

- **`P` (Potencia real, en `kW`):** energía transformada por unidad de tiempo en trabajo mecánico, calor o luz; es la magnitud registrada por los medidores en `kWh`.
- **`Q` (Potencia reactiva, en `kVAR`):** energía intercambiada cíclicamente con cargas inductivas (motores, transformadores) o capacitivas. Es positiva en cargas inductivas (en atraso) y negativa en cargas capacitivas (en adelanto).
- **`S` (Potencia aparente, en `kVA`):** capacidad eléctrica total suministrada (`S = V × I` en monofásico; `S = √3 × V_línea × I_línea` en trifásico).
- **`φ` (Ángulo de desfase):** separación angular entre voltaje y corriente. Un `FP = 1.0` implica `φ = 0°` (sin espuma); un `FP = 0.80` equivale a `φ = 36.87°`.

### Corrección capacitiva y distorsión armónica

Para elevar un factor de potencia inductivo inicial (`FP₁ = cos(φ₁)`) hasta un objetivo (`FP₂ = cos(φ₂)`), se instala un banco de capacitores de potencia reactiva `Q_c`:

```text
Q_c = P × [tan(φ₁) − tan(φ₂)]
```

Si existen cargas no lineales (variadores de velocidad, rectificadores o fuentes conmutadas), la corriente se deforma y el factor de potencia real incorpora la distorsión armónica total de corriente (`THD_i`):

```text
FP_real = cos(φ₁) / √(1 + THD_i²)
```

Los capacitores convencionales compensan `cos(φ₁)`, pero no eliminan los armónicos sin filtros específicos.

## Ejemplo práctico paso a paso: compensación en un taller industrial

Un taller trifásico opera con una potencia activa de **`P = 120 kW`** y demanda **`S₁ = 160 kVA`**. La distribuidora exige mantener un `FP` mínimo de `0.95`.

1. **Factor de potencia inicial (`FP₁`):**
   ```text
   FP₁ = 120 kW / 160 kVA = 0.75 (inductivo)
   ```
2. **Ángulo de fase y potencia reactiva inicial (`Q₁`):**
   ```text
   φ₁ = arccos(0.75) = 41.41°
   Q₁ = √(160² − 120²) = √11,200 = 105.83 kVAR
   ```
3. **Potencia reactiva máxima admisible para `FP₂ = 0.95`:**
   ```text
   φ₂ = arccos(0.95) = 18.19°
   Q₂ = 120 kW × tan(18.19°) = 120 × 0.3287 = 39.44 kVAR
   ```
4. **Capacidad requerida del banco de condensadores (`Q_c`):**
   ```text
   Q_c = 105.83 kVAR − 39.44 kVAR = 66.39 kVAR
   ```
   Se selecciona un banco automático escalonado de **`70 kVAR`**.
5. **Nueva demanda aparente y reducción de corriente:**
   ```text
   S₂ = 120 kW / 0.95 = 126.32 kVA
   Reducción de corriente = 1 − (126.32 / 160) = 21.1 %
   ```

Esta corrección libera `33.68 kVA` en el transformador y reduce las pérdidas térmicas (`I² × R`) en los cables en un `37.7 %` sin alterar la producción.

## Comparativa de capacidad aparente para una carga de 100 kW

La tabla muestra cómo aumentan la potencia aparente (`S`) y la reactiva (`Q`) necesarias para entregar **`100 kW`** útiles según el factor de potencia:

| `FP` (`cos φ`) | Desfase (`φ`) | Potencia aparente (`S`) | Potencia reactiva (`Q`) | Corriente extra vs. `FP = 1` | Impacto técnico y tarifario |
| --- | --- | --- | --- | --- | --- |
| `1.00` | `0.00°` | `100.00 kVA` | `0.00 kVAR` | `+0.0 %` | Condición resistiva ideal; aprovechamiento máximo |
| `0.95` | `18.19°` | `105.26 kVA` | `32.87 kVAR` | `+5.3 %` | Estándar industrial sin recargos tarifarios |
| `0.90` | `25.84°` | `111.11 kVA` | `48.43 kVAR` | `+11.1 %` | Umbral mínimo comercial habitual |
| `0.85` | `31.79°` | `117.65 kVA` | `61.97 kVAR` | `+17.6 %` | Caídas de tensión y penalización frecuente |
| `0.80` | `36.87°` | `125.00 kVA` | `75.00 kVAR` | `+25.0 %` | Sobrecarga térmica en transformadores y líneas |
| `0.70` | `45.57°` | `142.86 kVA` | `102.02 kVAR` | `+42.9 %` | Desperdicio severo; corrección prioritaria |

## Aplicaciones, errores comunes y normativa eléctrica

Controlar el factor de potencia es decisivo al dimensionar **grupos electrógenos y sistemas SAI (UPS)** (especificados en `kVA` a `FP = 0.80`), estabilizar líneas agrícolas largas y ampliar capacidad en plantas sin sustituir el transformador.

Errores frecuentes que deben evitarse:

- **Confundir `kW` con `kVA`:** un generador de `80 kVA` alimentando una carga con `FP = 0.75` solo entrega `60 kW` activos antes de sobrecargarse.
- **Usar capacitores fijos en cargas variables:** en vacío sobrecompensan la red, adelantando la corriente y elevando peligrosamente la tensión. Conviene instalar bancos automáticos con regulador varimétrico.
- **Subestimar la tensión nominal del dieléctrico:** en redes con armónicos deben emplearse capacitores de mayor tensión asignada y reactores de rechazo.

Las normas IEEE 519 e IEC 60831 establecen los límites de distorsión armónica y los requisitos de seguridad térmica antes de energizar cualquier banco de compensación.
