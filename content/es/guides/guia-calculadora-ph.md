---
title: "Calculadora de pH: Midiendo la Acidez"
description: "Guía técnica sobre la escala de pH: definición logarítmica, cálculo de la concentración de iones hidrógeno en ácidos fuertes y débiles, ejemplos resueltos y errores comunes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "ph-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué un cambio de una unidad de pH equivale a multiplicar por diez la acidez?"
    answer: "Porque la escala de pH es logarítmica de base 10 y de signo negativo. Pasar de pH 4.0 a pH 3.0 implica aumentar la concentración molar de iones hidrógeno [H⁺] de 1.0 × 10⁻⁴ M a 1.0 × 10⁻³ M, es decir, diez veces más protones libres por litro de disolución."
  - question: "¿Puede el pH ser menor que 0 o mayor que 14?"
    answer: "Sí. El rango de 0 a 14 corresponde a disoluciones acuosas diluidas entre 1 M de ácido fuerte y 1 M de base fuerte a 25 °C. Un ácido fuerte concentrado como HCl 6 M posee una actividad protónica que arroja valores de pH negativos cercanos a −0.8, mientras que NaOH 5 M supera pH 14.7."
  - question: "¿Por qué el agua pura no siempre tiene pH exactamente igual a 7.00?"
    answer: "La autoionización del agua es un proceso endotérmico, por lo que su constante Kw aumenta con la temperatura. A 25 °C, Kw = 1.00 × 10⁻¹⁴ y la neutralidad exacta es pH 7.00; a 0 °C sube a 7.47 y a 100 °C desciende a 6.14, aunque el agua siga siendo químicamente neutra porque [H⁺] = [OH⁻]."
  - question: "¿Cuál es el pH de una disolución muy diluida de ácido clorhídrico, como 1.0 × 10⁻⁸ M?"
    answer: "No es pH 8.0, ya que un ácido en agua no puede generar una disolución alcalina. A concentraciones inferiores a 10⁻⁶ M debe sumarse la contribución de la autoionización del agua (1.0 × 10⁻⁷ M). Resolviendo el balance de cargas se obtiene [H⁺] ≈ 1.05 × 10⁻⁷ M, equivalente a un pH ácido de 6.98."
  - question: "¿Qué diferencia existe entre concentración molar de [H⁺] y actividad protónica en el cálculo del pH?"
    answer: "La definición rigurosa de la IUPAC emplea la actividad del ion hidrógeno (a_H⁺ = γ × [H⁺]), donde γ es el coeficiente de actividad. En disoluciones diluidas (< 0.01 M), γ ≈ 1 y ambos valores coinciden; en disoluciones salinas o concentradas (> 0.1 M), las interacciones electrostáticas reducen γ y la concentración analítica difiere de la lectura del pH-metro."
---

El **pH** (*potencial de hidrógeno*) cuantifica la acidez o alcalinidad de una disolución acuosa mediante el logaritmo decimal negativo de la actividad de los iones hidrógeno (`[H⁺]` o `[H₃O⁺]`). Propuesta por Søren Sørensen en 1909, esta escala transforma concentraciones entre `1 M` y `10⁻¹⁴ M` en valores compactos centrados en `7.00` para la neutralidad pura a `25 °C`.

Con nuestra [Calculadora de pH](/es/calculadoras/calculadora-de-ph) puede obtener al instante el pH, `[H⁺]`, el `pOH` y `[OH⁻]` en notación decimal o científica. Esta guía reúne las ecuaciones fundamentales, el tratamiento de ácidos fuertes y débiles, dos cálculos resueltos paso a paso, una tabla comparativa y las advertencias analíticas clave.

## Fundamentos matemáticos y parámetros de la escala de pH

En términos termodinámicos estrictos, el pH se define con la actividad protónica (`a_H⁺`). En disoluciones diluidas (fuerza iónica `< 0.01 M`), el coeficiente de actividad se aproxima a la unidad y se emplea directamente la concentración molar:

```text
pH = −log₁₀(a_H⁺) ≈ −log₁₀([H⁺])
[H⁺] = 10^(−pH)
```

Los parámetros que rigen el equilibrio acuoso a `25 °C` (`298.15 K`) son:

- **`[H⁺]`:** concentración molar de iones hidrógeno hidratados en equilibrio (`mol/L` o `M`).
- **`[OH⁻]`:** concentración molar de iones hidróxido en equilibrio (`M`).
- **`Kw` (producto iónico del agua):** `Kw = [H⁺] × [OH⁻] = 1.00 × 10⁻¹⁴` a `25 °C`. Si `[H⁺] > 1.00 × 10⁻⁷ M`, el medio es ácido (`pH < 7.00`); si `[H⁺] < 1.00 × 10⁻⁷ M`, es alcalino (`pH > 7.00`).

### Ácidos fuertes frente a ácidos débiles

La relación entre la concentración inicial (`C_a`) y `[H⁺]` depende de la fuerza ácida:

- **Ácidos fuertes monopróticos** (`HCl`, `HNO₃`, `HBr`, `HClO₄`): se disocian al `100 %`, cumpliéndose `[H⁺] = C_a` entre `10⁻⁶ M` y `0.1 M`.
- **Ácidos débiles monopróticos** (`CH₃COOH`, `HF`, `HCOOH`): se ionizan parcialmente según `Ka = ([H⁺] × [A⁻]) / [HA]`. Si `C_a / Ka ≥ 400`, la disociación es menor del `5 %` y aplica:

```text
[H⁺] ≈ √(Ka × C_a)
```

Si `C_a / Ka < 400`, debe resolverse la ecuación cuadrática `[H⁺]² + Ka × [H⁺] − Ka × C_a = 0`.

## Ejemplo práctico paso a paso: cálculo de pH en dos escenarios

Calculamos el pH a `25 °C` para un ácido fuerte y un ácido débil.

### Escenario A: Ácido clorhídrico (`HCl`) `0.025 M`

1. **Disociación total:** al ser un ácido fuerte monoprótico y superar `10⁻⁶ M`, se cumple `[H⁺] = 0.025 M`.
2. **Cálculo logarítmico:**

```text
pH = −log₁₀(0.025) = −(0.39794 − 2) = 1.602 ≈ 1.60
[OH⁻] = (1.00 × 10⁻¹⁴) / 0.025 = 4.00 × 10⁻¹³ M
```

### Escenario B: Ácido acético (`CH₃COOH`) `0.10 M` (`Ka = 1.8 × 10⁻⁵`)

1. **Validar aproximación:** `C_a / Ka = 0.10 / (1.8 × 10⁻⁵) = 5,556 ≥ 400` (válida).
2. **Calcular `[H⁺]`, pH y porcentaje ionizado:**

```text
[H⁺] = √(1.8 × 10⁻⁵ × 0.10) = √(1.8 × 10⁻⁶) = 1.3416 × 10⁻³ M
pH = −log₁₀(1.3416 × 10⁻³) = 2.872 ≈ 2.87
Ionización (%) = (1.3416 × 10⁻³ / 0.10) × 100 = 1.34 %
```

Aunque el ácido acético cuadruplica la molaridad del `HCl`, su pH es `1.27` unidades superior porque apenas el `1.34 %` cede su protón.

## Tabla comparativa de valores de pH y concentraciones (`25 °C`)

| Sustancia o medio de referencia | pH típico | `[H⁺]` (M) | `[OH⁻]` (M) | Clasificación |
| :--- | :---: | :---: | :---: | :--- |
| Ácido gástrico fisiológico | `1.50` | `3.16 × 10⁻²` | `3.16 × 10⁻¹³` | Ácido fuerte biológico |
| Jugo de limón natural | `2.20` | `6.31 × 10⁻³` | `1.58 × 10⁻¹²` | Ácido débil (cítrico) |
| Vinagre comercial (~5 %) | `2.50` | `3.16 × 10⁻³` | `3.16 × 10⁻¹²` | Ácido débil diluido |
| Café negro filtrado | `5.00` | `1.00 × 10⁻⁵` | `1.00 × 10⁻⁹` | Ligeramente ácido |
| Agua pura (`25 °C`) | `7.00` | `1.00 × 10⁻⁷` | `1.00 × 10⁻⁷` | Neutro absoluto |
| Sangre arterial humana | `7.40` | `3.98 × 10⁻⁸` | `2.51 × 10⁻⁷` | Tampón fisiológico |
| Lejía doméstica | `12.00` | `1.00 × 10⁻¹²` | `1.00 × 10⁻²` | Fuertemente alcalino |

## Aplicaciones prácticas, errores frecuentes y límites de precisión

El control preciso del pH resulta esencial en entornos clínicos, alimentarios e industriales:

- **Fisiología clínica:** la sangre arterial oscila entre `7.35` y `7.45`; desviaciones fuera de ese margen revelan acidosis o alcalosis metabólica o respiratoria.
- **Seguridad alimentaria:** mantener `pH < 4.6` en conservas ácidas previene el crecimiento de *Clostridium botulinum*.
- **Tratamiento de aguas:** la desinfección clorada alcanza su máxima eficacia entre `pH 6.5` y `7.5`, donde predomina el ácido hipocloroso (`HOCl`).
- **Farmacia y cosmética:** el pH del vehículo determina la estabilidad química y la absorción mucosa de fármacos ionizables.

### Errores frecuentes y advertencias metodológicas

1. **Omitir el aporte del agua en disoluciones ultradiluidas:** aplicar `−log₁₀(C_a)` a `HCl 10⁻⁸ M` arrojaría `pH 8.0`, resultado físicamente imposible; cuando `C_a < 10⁻⁶ M`, debe resolverse `[H⁺] × ([H⁺] − C_a) = Kw`.
2. **Ignorar la temperatura:** `Kw` cambia con la temperatura y la pendiente del electrodo de vidrio varía de `59.16 mV/pH` (`25 °C`) a `61.54 mV/pH` (`37 °C`).
3. **Confundir fuerza ácida con acidez real:** un ácido fuerte diluido (`HCl 10⁻⁵ M`, `pH 5.00`) es menos ácido que un ácido débil concentrado (`CH₃COOH 1.0 M`, `pH 2.37`).
4. **Calibración deficiente:** usar tampones alcalinos (`pH 10.0`) alterados por `CO₂` atmosférico introduce errores sistemáticos relevantes.
