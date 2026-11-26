---
title: "Comprender la Desviación Estándar con Ejemplos"
description: "Guía técnica sobre la desviación estándar y la varianza: diferencia entre fórmulas poblacional y muestral, corrección de Bessel, regla empírica y análisis de dispersión."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "standard-deviation-calculator"
faqs:
  - question: "¿Por qué la fórmula muestral divide por n − 1 en lugar de n?"
    answer: "Se denomina corrección de Bessel. Al estimar la dispersión de una población usando solo una muestra, la media muestral se ajusta a los propios datos observados y subestima ligeramente la dispersión real respecto a la media poblacional verdadera. Dividir por n − 1 (los grados de libertad) corrige ese sesgo y convierte la varianza muestral en un estimador insesgado."
  - question: "¿Cuándo debo elegir la desviación estándar poblacional frente a la muestral?"
    answer: "Utilice la desviación estándar poblacional (σ) únicamente cuando disponga de la totalidad de los registros del grupo que desea describir, sin extrapolar hacia fuera (por ejemplo, las calificaciones finales de todos los alumnos de un aula concreta). Emplee la muestral (s) siempre que analice un subconjunto de mediciones para inferir el comportamiento de un proceso o población mayor."
  - question: "¿Por qué suele preferirse la desviación estándar a la varianza para interpretar datos?"
    answer: "La varianza promedia diferencias elevadas al cuadrado, por lo que queda expresada en unidades cuadráticas difíciles de visualizar (como euros cuadrados o segundos cuadrados). Al extraer la raíz cuadrada, la desviación estándar devuelve la medida de dispersión a las mismas unidades originales que los datos y la media."
  - question: "¿Qué indica una desviación estándar igual a cero o mayor que la media?"
    answer: "Una desviación estándar de 0 significa que todas las observaciones del conjunto son idénticas, sin variación alguna. Nunca puede ser negativa. Si supera el valor de la media en variables positivas, revela una dispersión muy elevada o la presencia de valores atípicos extremos y asimetría pronunciada."
  - question: "¿La regla empírica 68-95-99,7 se cumple en cualquier conjunto de datos?"
    answer: "No. Los porcentajes exactos del 68,27 %, 95,45 % y 99,73 % dentro de 1, 2 y 3 desviaciones estándar solo rigen cuando los datos siguen aproximadamente una distribución normal (campana de Gauss). Para distribuciones asimétricas o desconocidas se aplica la desigualdad de Chebyshev, que garantiza al menos el 75 % dentro de ±2σ y el 88,89 % dentro de ±3σ."
---

La **desviación estándar** cuantifica cuánto se alejan, de forma típica, los valores de un conjunto de datos respecto a su media aritmética. Una desviación pequeña indica que las observaciones se agrupan cerca del promedio; una desviación grande advierte elevada variabilidad y menor representatividad de la media por sí sola para predecir un caso individual.

Matemáticamente equivale a la raíz cuadrada de la varianza, lo que devuelve la métrica de dispersión a las mismas unidades físicas o monetarias de la variable medida. Antes de calcularla resulta imprescindible decidir si los datos constituyen una **población completa (`σ`)** o una **muestra representativa (`s`)**, ya que ambos escenarios utilizan distinto denominador.

## Fundamentos matemáticos y definición de parámetros

### Desviación estándar poblacional (σ) frente a muestral (s)

Para una población completa de `N` elementos con media `μ = (Σxᵢ) / N`, la varianza (`σ²`) y la desviación estándar poblacional (`σ`) se calculan mediante:

```text
σ² = Σ(xᵢ − μ)² / N
σ  = √[ Σ(xᵢ − μ)² / N ]
```

Cuando los datos forman una muestra de tamaño `n` con media `x̄ = (Σxᵢ) / n` extraída de un universo mayor, se aplica la **corrección de Bessel** dividiendo por `n − 1` grados de libertad:

```text
s² = Σ(xᵢ − x̄)² / (n − 1)
s  = √[ Σ(xᵢ − x̄)² / (n − 1) ]
```

Los parámetros que intervienen en ambas ecuaciones son:

- **`xᵢ`:** Cada observación individual registrada desde `i = 1` hasta `N` o `n`.
- **`μ` y `x̄`:** Media aritmética de la población total y de la muestra observada, respectivamente.
- **`(xᵢ − x̄)²`:** Desviación cuadrática respecto a la media; elevar al cuadrado evita que las diferencias positivas y negativas se anulen entre sí y penaliza más los alejamientos extremos.
- **`n − 1`:** Grados de libertad efectivos tras haber consumido un grado al estimar `x̄` con los propios datos.

### Coeficiente de variación y regla empírica

Para comparar la dispersión relativa entre variables con distinta escala o unidad de medida se emplea el **coeficiente de variación**, definido como `CV = (s / |x̄|) × 100 %`. En distribuciones normales (simétricas en forma de campana), la **regla empírica** indica que aproximadamente el **68,27 %** de las observaciones cae dentro de `μ ± 1σ`, el **95,45 %** dentro de `μ ± 2σ` y el **99,73 %** dentro de `μ ± 3σ`. Para distribuciones cualesquiera, la desigualdad de Chebyshev garantiza al menos `1 − 1/k²` dentro de `±kσ`.

## Cálculo paso a paso con verificación aritmética

Considere cinco mediciones muestrales (`n = 5`) del tiempo de respuesta de un servidor expresado en milisegundos: `[12, 15, 18, 20, 25]`.

1. **Calcular la media muestral (`x̄`):**
   Sumamos las cinco mediciones y dividimos entre el tamaño muestral: `(12 + 15 + 18 + 20 + 25) / 5 = 90 / 5 = 18,0 ms`.
2. **Obtener cada desviación respecto a la media (`xᵢ − x̄`):**
   `12 − 18 = −6`, `15 − 18 = −3`, `18 − 18 = 0`, `20 − 18 = +2` y `25 − 18 = +7`. Como comprobación aritmética, la suma exacta de desviaciones es `−6 − 3 + 0 + 2 + 7 = 0`.
3. **Elevar al cuadrado y sumar (`Σ(xᵢ − x̄)²`):**
   `(−6)² + (−3)² + 0² + 2² + 7² = 36 + 9 + 0 + 4 + 49 = 98 ms²`.
4. **Calcular la varianza muestral (`s²`):**
   Dividimos la suma de cuadrados entre `n − 1 = 4`: `s² = 98 / 4 = 24,5 ms²`.
5. **Extraer la raíz cuadrada para obtener `s`:**
   `s = √24,5 ≈ 4,9497 ms`, es decir, `4,95 ms` redondeado a dos decimales.
6. **Comparación si fuese población completa (`N = 5`):**
   `σ² = 98 / 5 = 19,6 ms²` y `σ = √19,6 ≈ 4,4272 ms` (`4,43 ms`).

La interpretación práctica muestra una latencia media de `18,0 ms` con una dispersión muestral típica de `±4,95 ms` y un coeficiente de variación del `27,5 %`.

## Comparación de métricas de dispersión y criterios de uso

| Métrica estadística | Fórmula resumida | Unidades | Sensibilidad a atípicos | Escenario recomendado |
|---|---|---|---|---|
| Desviación poblacional (`σ`) | `√[Σ(xᵢ−μ)² / N]` | Mismas que `x` | Alta | Censos completos sin extrapolación |
| Desviación muestral (`s`) | `√[Σ(xᵢ−x̄)² / (n−1)]` | Mismas que `x` | Alta | Inferencia desde muestras (`n ≥ 2`) |
| Varianza (`s²` o `σ²`) | Cuadrado de `s` o `σ` | Cuadráticas (`x²`) | Muy alta | Modelos ANOVA y regresión lineal |
| Coeficiente de variación (`CV`) | `(s / \|x̄\|) × 100 %` | Adimensional (`%`) | Alta | Comparar escalas o unidades distintas |
| Rango intercuartílico (`RIC`) | `Q₃ − Q₁` | Mismas que `x` | Muy baja (robusta) | Datos muy asimétricos o con atípicos |
| Error estándar (`EE`) | `s / √n` | Mismas que `x` | Moderada | Precisión de la media estimada |

## Aplicaciones reales, errores frecuentes y cautelas estadísticas

En **control de calidad**, los gráficos de proceso fijan límites en `±3σ` (o seis sigmas) para detectar derivas antes de fabricar defectos. En **finanzas**, la desviación de rendimientos diarios escalada por `√252` mide la volatilidad anualizada, y en **laboratorios clínicos** verifica la repetibilidad analítica.

Al analizar resultados conviene evitar cuatro errores habituales:

- **Confundir `s` con el error estándar (`EE`):** `s` mide la variabilidad individual y no converge a cero al ampliar la muestra; `EE = s / √n` cuantifica la incertidumbre de la media estimada y decrece cuando aumenta `n`.
- **Aplicar `s` en datos muy asimétricos:** En salarios o tiempos con atípicos extremos, unos pocos valores inflan `s`; utilice mediana y rango intercuartílico (`RIC`).
- **Sesgo residual en muestras pequeñas:** Aunque `s²` es insesgado, `s = √s²` subestima ligeramente a `σ` cuando `n < 10`.
- **Cancelación numérica en programación:** Con datos grandes y poca dispersión relativa (valores cercanos a `10⁹` variando en `0,1`), la fórmula rápida `[Σxᵢ² − (Σxᵢ)² / n] / (n − 1)` pierde precisión flotante; utilice el método centrado de dos pasadas o el algoritmo de Welford.
