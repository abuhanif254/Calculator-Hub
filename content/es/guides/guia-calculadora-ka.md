---
title: "Calculadora de Ka: Constante de Disociación Ácida"
description: "Guía técnica sobre la constante de disociación ácida (Ka) y el pKa: equilibrio ácido-base, grados de disociación, cálculo paso a paso desde el pH y tabla de ácidos débiles."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ka-calculator"
faqs:
  - question: "¿Qué diferencia práctica existe entre Ka y pKa?"
    answer: "Ka es la constante de equilibrio en notación científica (por ejemplo, 1.75 × 10⁻⁵ para el ácido acético), mientras que pKa = −log₁₀(Ka) convierte ese número en una escala logarítmica manejable (4.76). A mayor Ka, menor pKa y mayor fuerza del ácido para ceder protones en agua."
  - question: "¿Por qué la concentración del agua líquida [H₂O] no aparece en la fórmula de Ka?"
    answer: "En disoluciones acuosas diluidas, el agua actúa como disolvente y su concentración permanece prácticamente constante en torno a 55.5 mol/L, con actividad termodinámica unitaria por convención. Por ese motivo, el término del agua se incorpora dentro de la constante de equilibrio Ka."
  - question: "¿Cuándo es seguro utilizar la aproximación C₀ − x ≈ C₀ al despejar Ka o [H⁺]?"
    answer: "La regla empírica del 5 % establece que la aproximación cuadrática simplificada es aceptable cuando el grado de disociación α = [H⁺] / C₀ es inferior al 5 % (o cuando C₀ / Ka > 400). Si se supera ese umbral, debe resolverse la ecuación cuadrática exacta para evitar errores de cálculo significativos."
  - question: "¿Pueden tener los ácidos polipróticos más de un valor de Ka?"
    answer: "Sí. Un ácido capaz de ceder dos o más protones (como el ácido fosfórico H₃PO₄ o el ácido cítrico) posee una constante sucesiva por cada etapa de ionización: Ka₁, Ka₂, Ka₃. Cada protón sucesivo se desprende con mayor dificultad porque debe separarse de una especie con carga negativa creciente, cumpliéndose Ka₁ >> Ka₂ >> Ka₃."
  - question: "¿Cómo afecta la temperatura al valor de la constante de disociación ácida Ka?"
    answer: "Como toda constante termodinámica de equilibrio, Ka depende exclusivamente de la temperatura según la ecuación de van 't Hoff. Aunque la mayoría de las tablas estándar se refieren a 25 °C (298.15 K), la disociación de muchos ácidos débiles varía ligeramente al aumentar la temperatura, modificando el pH real de la disolución."
---

La **constante de disociación ácida (`Ka`)** cuantifica la fuerza intrínseca de un ácido en medio acuoso al expresar el cociente de equilibrio entre los iones generados (`H₃O⁺` y `A⁻`) y la concentración del ácido molecular intacto (`HA`). Mientras los ácidos fuertes se ionizan casi por completo, los ácidos débiles establecen un equilibrio reversible donde solo una fracción reducida cede protones.

Determinar `Ka` y su cologaritmo `pKa` permite predecir el pH de disoluciones ácidas, formular tampones y analizar equilibrios en química analítica y bioquímica. Nuestra [Calculadora de Ka](/es/calculadoras/calculadora-de-ka) calcula `Ka` y `pKa` directamente desde el pH experimental o las concentraciones de equilibrio. Esta guía presenta las ecuaciones fundamentales, la solución cuadrática exacta, un ejemplo resuelto con ácido fórmico y una tabla comparativa.

## Expresión termodinámica, pKa y grado de disociación

Un ácido débil monoprótico (`HA`) disuelto en agua alcanza el siguiente equilibrio dinámico:

```text
HA(ac) + H₂O(l) ⇌ H₃O⁺(ac) + A⁻(ac)
```

Adoptando la notación abreviada `[H⁺]` para `[H₃O⁺]`, la constante `Ka` y su transformación logarítmica `pKa` se definen como:

```text
Ka = ([H⁺] × [A⁻]) / [HA]
pKa = −log₁₀(Ka)
Ka = 10^(−pKa)
```

Magnitudes de la ecuación:

- **`[H⁺]`:** molaridad en equilibrio de iones hidrógeno (`mol/L`), obtenida del pH mediante `[H⁺] = 10^(−pH)`.
- **`[A⁻]`:** molaridad en equilibrio de la base conjugada (`mol/L`). En una disolución pura de ácido monoprótico, `[A⁻] ≈ [H⁺]`.
- **`[HA]`:** molaridad en equilibrio del ácido no disociado (`C₀ − [H⁺]`, en `mol/L`).

### Grado de disociación (α) y solución cuadrática exacta

El grado de disociación (`α`) mide la fracción ionizada respecto a la concentración analítica inicial (`C₀`), relacionándose con `Ka` mediante la ley de dilución de Ostwald:

```text
α = [H⁺] / C₀
Ka = (C₀ × α²) / (1 − α)
```

Cuando se conoce `Ka` y `C₀`, la concentración exacta `[H⁺]` (sin asumir `C₀ − [H⁺] ≈ C₀`) se obtiene resolviendo la ecuación cuadrática completa:

```text
[H⁺]² + Ka × [H⁺] − (Ka × C₀) = 0
[H⁺] = [ −Ka + √(Ka² + 4 × Ka × C₀) ] / 2
```

## Ejemplo resuelto: cálculo de Ka del ácido fórmico desde el pH

Una disolución acuosa de ácido fórmico (`HCOOH`) de concentración inicial `C₀ = 0.200 M` presenta un pH de `2.23` a `25 °C`. Determine `Ka`, `pKa` y el porcentaje de disociación.

### Paso 1: calcular `[H⁺]` en equilibrio

```text
[H⁺] = 10^(−2.23) = 5.888 × 10⁻³ M = 0.005888 M
```

### Paso 2: plantear el balance de equilibrio (ICE)

Para `HCOOH(ac) ⇌ H⁺(ac) + HCOO⁻(ac)`, la autoionización del agua (`1.0 × 10⁻⁷ M`) es despreciable frente a `5.888 × 10⁻³ M`:

- `[H⁺]_eq = 5.888 × 10⁻³ M`
- `[HCOO⁻]_eq = 5.888 × 10⁻³ M`
- `[HCOOH]_eq = 0.200 − 0.005888 = 0.1941 M`

### Paso 3: despejar `Ka` y `pKa`

```text
Ka = (5.888 × 10⁻³)² / 0.1941 = (3.467 × 10⁻⁵) / 0.1941 = 1.786 × 10⁻⁴ ≈ 1.79 × 10⁻⁴
pKa = −log₁₀(1.786 × 10⁻⁴) = 3.748 ≈ 3.75
```

### Paso 4: comprobar el grado de disociación

```text
α = 0.005888 / 0.200 = 0.02944 → 2.94 %
```

Aunque `2.94 %` queda por debajo del criterio del `5 %`, omitir el término `−0.005888` en el denominador habría dado `Ka = 1.73 × 10⁻⁴`, subestimando la constante real en un `3.1 %`. En ensayos potenciométricos o en síntesis orgánica, emplear siempre la concentración exacta de equilibrio garantiza concordancia con los valores termodinámicos de referencia y evita errores acumulados al proyectar diluciones sucesivas o al estimar la fuerza ácida relativa frente a otros ácidos carboxílicos alifáticos.

Si la concentración inicial de ácido fórmico se diluyera diez veces hasta `0.0200 M`, el porcentaje de disociación aumentaría significativamente hasta superar el `9 %`, momento en el cual la ecuación simplificada dejaría de ser fiable y resultaría imprescindible resolver la ecuación cuadrática completa para predecir correctamente el pH resultante.

## Tabla comparativa de constantes Ka y pKa a 25 °C

Ácidos ordenados de mayor a menor acidez relativa en disolución acuosa:

| Ácido | Fórmula | Base conjugada | `Ka` (25 °C) | `pKa` | Fuerza relativa |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Ácido oxálico (`Ka₁`) | `H₂C₂O₄` | `HC₂O₄⁻` | `5.60 × 10⁻²` | `1.25` | Débil moderadamente fuerte |
| Ácido fosfórico (`Ka₁`) | `H₃PO₄` | `H₂PO₄⁻` | `6.92 × 10⁻³` | `2.16` | Poliprótico (1.ª etapa) |
| Ácido fluorhídrico | `HF` | `F⁻` | `6.31 × 10⁻⁴` | `3.20` | Débil (reactivo con sílice) |
| Ácido fórmico | `HCOOH` | `HCOO⁻` | `1.78 × 10⁻⁴` | `3.75` | Carboxílico simple |
| Ácido benzoico | `C₆H₅COOH` | `C₆H₅COO⁻` | `6.31 × 10⁻⁵` | `4.20` | Conservante alimentario |
| Ácido acético | `CH₃COOH` | `CH₃COO⁻` | `1.75 × 10⁻⁵` | `4.76` | Ácido débil de referencia |
| Ácido cianhídrico | `HCN` | `CN⁻` | `6.17 × 10⁻¹⁰` | `9.21` | Ácido muy débil |

## Aplicaciones prácticas, errores frecuentes y límites de precisión

### Aplicaciones científicas e industriales

- **Valoraciones potenciométricas:** permite localizar el punto de semiequivalencia (`pH = pKa`), predecir el salto de pH en el punto de equivalencia y elegir el indicador colorimétrico adecuado.
- **Química médica:** grupos electronegativos vecinos estabilizan la base conjugada por efecto inductivo, elevando `Ka` y modulando la solubilidad y absorción de fármacos.
- **Control ambiental:** define la especiación entre formas tóxicas neutras y aniones en aguas residuales, como el ácido hipocloroso (`HOCl / OCl⁻`, `pKa = 7.53`).

### Errores frecuentes y advertencias metodológicas

1. **Ignorar la contribución del agua en disoluciones muy diluidas:** si `C₀ < 10⁻⁵ M` o `Ka < 10⁻¹⁰`, los `10⁻⁷ M` de `H⁺` del agua pura alteran el equilibrio y requieren resolver el balance de cargas `[H⁺] = [A⁻] + Kw / [H⁺]`.
2. **Sustituir `[HA]` por `C₀` en el denominador:** `Ka` exige la concentración *en equilibrio* (`C₀ − [H⁺]`), no la concentración nominal inicial.
3. **Mezclar constantes de disolventes distintos:** el `pKa` del ácido acético pasa de `4.76` en agua a `12.6` en DMSO; nunca utilice constantes tabuladas en medios no acuosos para cálculos en agua.
4. **Desatender la fuerza iónica:** la adición de electrolitos inertes reduce los coeficientes de actividad y disminuye el `pKa` aparente entre `0.05` y `0.15` unidades.
