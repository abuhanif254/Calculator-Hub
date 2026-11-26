---
title: "Cómo Funciona la Calculadora de Vida Media (Decaimiento Radiactivo)"
description: "Guía técnica sobre el período de semidesintegración radiactiva: ecuaciones de decaimiento exponencial, constante de desintegración, ejemplos resueltos y usos científicos."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "half-life-calculator"
faqs:
  - question: "¿Cambia la vida media de un isótopo con la temperatura, la presión o los enlaces químicos?"
    answer: "No. El decaimiento radiactivo es un proceso puramente nuclear regido por interacciones nucleares fuertes y débiles dentro del núcleo atómico. Las variaciones térmicas, de presión o de estado químico afectan únicamente a los electrones periféricos y no alteran la constante de desintegración ni la vida media de forma apreciable."
  - question: "¿Por qué se utiliza el término vida media en lugar de tiempo total de desintegración?"
    answer: "Porque el decaimiento radiactivo sigue una ley exponencial asintótica: en cada intervalo igual a una vida media la muestra se reduce a la mitad, de modo que teóricamente la función nunca alcanza el cero absoluto. Aunque tras unas diez vidas medias resta menos del 0.1 % inicial, la única magnitud constante y bien definida es el período necesario para reducir la cantidad al 50 %."
  - question: "¿Qué diferencia existe entre vida media física (t₁/₂) y vida media promedio (τ)?"
    answer: "La vida media física o período de semidesintegración (t₁/₂) es el tiempo en que decae exactamente el 50 % de los núcleos iniciales. La vida media promedio o tiempo de vida medio (τ = 1 / λ = t₁/₂ / ln(2)) es aproximadamente 1.4427 veces mayor y representa el tiempo esperado que sobrevive un núcleo antes de desintegrarse, instante en que resta un 36.79 % (1/e) de la muestra."
  - question: "¿Pueden introducirse valores de radiactividad en becquerels (Bq) o curies (Ci) en lugar de masa?"
    answer: "Sí. La actividad radiactiva A(t) es directamente proporcional al número de núcleos radiactivos presentes (A = λ × N). Por ello, la ecuación exponencial funciona exactamente igual si N₀ y N(t) se expresan en masa (mg, g), número de átomos, cuentas por minuto (cpm) o unidades de actividad (Bq, MBq, mCi), siempre que ambas usen la misma unidad."
  - question: "¿Qué ocurre después de transcurridas diez vidas medias en una muestra radiactiva?"
    answer: "Al cabo de 10 vidas medias la fracción remanente es (1/2)^10 = 1/1024, lo que equivale aproximadamente al 0.0977 % de la cantidad o actividad inicial. En protección radiológica hospitalaria e industrial, este umbral de diez semividas suele utilizarse como referencia operativa inicial para estimar el almacenamiento por decaimiento antes de verificar los niveles residuales con un detector."
---

La **vida media** (técnicamente *período de semidesintegración*, símbolo `t₁/₂`) es el tiempo necesario para que exactamente el `50 %` de los núcleos inestables de una sustancia radiactiva se desintegren. Constituye una propiedad nuclear invariante de cada isótopo: tras una vida media queda el `50 %` de la muestra; tras dos, el `25 %`; tras tres, el `12.5 %`, describiendo una ley de decaimiento exponencial continua.

Una calculadora de vida media despeja cualquiera de las cuatro variables de la cinética nuclear de primer orden: cantidad o actividad inicial (`N₀`), cantidad restante (`N(t)`), tiempo transcurrido (`t`) y vida media (`t₁/₂`). Esta guía reúne las ecuaciones fundamentales, un ejemplo clínico resuelto paso a paso, una tabla comparativa de radionúclidos y las advertencias experimentales clave.

## Formulación matemática y parámetros principales

La tasa media de desintegración de una muestra pura es proporcional al número de núcleos inestables presentes en cada instante. Esta relación se expresa mediante la ecuación en base un medio:

```text
N(t) = N₀ × (1 / 2)^(t / t₁/₂)
```

Donde:

- **`N₀`:** cantidad inicial en masa (`g`, `mg`), número de núcleos o actividad radiactiva (`Bq`, `MBq`, `mCi`) en `t = 0`.
- **`N(t)`:** cantidad o actividad remanente en el instante `t`, en idénticas unidades que `N₀`.
- **`t`:** tiempo transcurrido desde la referencia inicial.
- **`t₁/₂`:** período de semidesintegración del isótopo, en la misma unidad temporal que `t` (horas, días o años).

### Constante de desintegración (λ) y vida promedio (τ)

En física nuclear y radiofarmacia también se utilizan la **constante de desintegración** `λ` (probabilidad de decaimiento por unidad de tiempo) y el **tiempo de vida medio** `τ`:

```text
λ = ln(2) / t₁/₂ ≈ 0.693147 / t₁/₂
τ = 1 / λ = t₁/₂ / ln(2) ≈ 1.442695 × t₁/₂
N(t) = N₀ × e^(−λ × t)
```

Para calcular el tiempo transcurrido `t` o estimar `t₁/₂` a partir de dos mediciones experimentales se aplican las ecuaciones logarítmicas inversas:

```text
t    = [t₁/₂ × ln(N₀ / N(t))] / ln(2)
t₁/₂ = [t × ln(2)] / ln(N₀ / N(t))
```

## Ejemplo numérico resuelto: radiofarmacia con Yodo-131

Considere una fuente terapéutica de **Yodo-131 (`¹³¹I`)**, utilizado en tratamientos de tiroides, con vida media `t₁/₂ = 8.02 días` y actividad inicial `N₀ = 500 MBq`.

### Parte A: actividad restante tras `t = 20 días`

1. **Calcular el número de semividas transcurridas:**
   ```text
   n = 20 días / 8.02 días ≈ 2.493766
   ```
2. **Evaluar el factor exponencial y la actividad final:**
   ```text
   (1 / 2)^2.493766 ≈ 0.177542
   N(20) = 500 MBq × 0.177542 ≈ 88.77 MBq
   ```
3. **Verificación mediante la constante `λ`:**
   ```text
   λ = 0.693147 / 8.02 días ≈ 0.086427 días⁻¹
   N(20) = 500 × e^(−0.086427 × 20) = 500 × e^(−1.72854) ≈ 88.77 MBq
   ```

### Parte B: tiempo necesario para descender al `10 %` (`50 MBq`)

Para determinar cuántos días tardará la fuente en caer de `500 MBq` a `50 MBq`:

```text
t = [8.02 × ln(500 / 50)] / ln(2)
t = (8.02 × 2.302585) / 0.693147 ≈ 26.64 días
```

## Tabla de referencia de isótopos radiactivos comunes

| Isótopo | Símbolo | Vida media (`t₁/₂`) | Constante `λ` aproximada | Modo de decaimiento | Aplicación principal |
|---|---|---|---|---|---|
| Tecnecio-99m | `⁹⁹ᵐTc` | `6.01 horas` | `0.1153 h⁻¹` | Transición isomérica | Gammagrafía médica y SPECT |
| Yodo-131 | `¹³¹I` | `8.02 días` | `0.0864 días⁻¹` | Beta (`β⁻`) y gamma | Terapia del cáncer tiroideo |
| Cobalto-60 | `⁶⁰Co` | `5.27 años` | `0.1315 años⁻¹` | Beta (`β⁻`) y gamma | Radioterapia y esterilización |
| Cesio-137 | `¹³⁷Cs` | `30.17 años` | `0.0230 años⁻¹` | Beta (`β⁻`) y gamma | Calibración e industria |
| Carbono-14 | `¹⁴C` | `5730 años` | `1.21 × 10⁻⁴ años⁻¹` | Beta (`β⁻`) | Datación arqueológica orgánica |
| Plutonio-239 | `²³⁹Pu` | `24 110 años` | `2.87 × 10⁻⁵ años⁻¹` | Alfa (`α`) | Reactores y sondas espaciales |
| Uranio-238 | `²³⁸U` | `4.47 × 10⁹ años` | `1.55 × 10⁻¹⁰ años⁻¹` | Alfa (`α`) | Geocronología geológica |

## Aplicaciones prácticas y advertencias de precisión

El modelo exponencial simple resulta exacto en calibración de dosis médicas, datación radiométrica y estimación de blindajes, siempre que se respeten cuatro límites operativos:

- **Consistencia estricta de unidades temporales:** el fallo más común ocurre al mezclar `t` en días o meses con `t₁/₂` en años o horas. Ambas magnitudes deben convertirse a la misma unidad antes de calcular `t / t₁/₂`.
- **Vida media física frente a vida media efectiva:** dentro de un organismo vivo, un radiofármaco se elimina tanto por decaimiento nuclear (`t_física`) como por excreción biológica (`t_biol`). La tasa real sigue la vida media efectiva: `1 / t_ef = (1 / t_física) + (1 / t_biol)`.
- **Cadenas de desintegración acopladas:** cuando el producto hijo también es radiactivo (como en las series del uranio o del radón), la actividad total no decae como una exponencial única, sino conforme a las ecuaciones de Bateman.
- **Límites del radiocarbono y control regulatorio:** la datación con `¹⁴C` pierde precisión más allá de `50 000 años` (`~8.7` semividas) y requiere calibración dendrocronológica (curvas IntCal). En entornos hospitalarios o nucleares, la liberación de residuos decaídos exige medición directa con detectores calibrados según la normativa vigente de protección radiológica.
