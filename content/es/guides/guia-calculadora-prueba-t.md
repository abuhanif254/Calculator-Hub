---
title: "Entendiendo la Prueba T: Muestras Independientes vs. Emparejadas"
description: "Guía técnica sobre la prueba t de Student y de Welch: fórmulas para muestras independientes y emparejadas, cálculo paso a paso, grados de libertad, valor p y tamaño del efecto."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "t-test-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuándo debo elegir la prueba t de Welch en lugar de la prueba t clásica de Student?"
    answer: "Conviene emplear la prueba t de Welch por defecto al comparar dos muestras independientes, ya que no exige que las varianzas poblacionales sean iguales (homocedasticidad). Cuando los tamaños muestrales y las varianzas difieren, la prueba de Welch mantiene la tasa real de error tipo I sin apenas perder potencia estadística si las varianzas resultan ser similares."
  - question: "¿Qué diferencia práctica existe entre una prueba t de una cola y una de dos colas?"
    answer: "Una prueba de dos colas evalúa si existe una diferencia estadísticamente significativa en cualquier dirección (mayor o menor que cero), dividiendo el nivel alfa entre ambos extremos de la distribución. La prueba de una cola concentra todo el nivel de significancia en un único sentido especificado antes de recoger los datos, por lo que solo es válida cuando una desviación en sentido contrario carece de relevancia científica o práctica."
  - question: "¿Cómo afecta un tamaño muestral muy grande a la interpretación del valor p?"
    answer: "Con muestras muy numerosas, el error estándar disminuye drásticamente y diferencias diminutas e irrelevantes en la práctica pueden producir un valor p inferior a 0.05. Por ese motivo, todo contraste debe acompañarse del tamaño del efecto (como la d de Cohen) y de un intervalo de confianza para distinguir la significancia estadística de la relevancia real."
  - question: "¿La prueba t sigue siendo válida si mis datos no siguen exactamente una distribución normal?"
    answer: "Gracias al teorema del límite central, la prueba t es bastante robusta frente a desviaciones moderadas de la normalidad cuando cada grupo supera aproximadamente 30 observaciones y no presenta asimetría extrema. Con muestras pequeñas y distribuciones muy sesgadas o con valores atípicos severos, resulta más fiable recurrir a alternativas no paramétricas como la prueba U de Mann-Whitney o la prueba de rangos con signo de Wilcoxon."
  - question: "¿Qué significan los grados de libertad en una prueba t de Student?"
    answer: "Los grados de libertad (gl) indican el número de valores independientes que pueden variar libremente al estimar los parámetros de la muestra y determinan la forma exacta de la distribución t utilizada para calcular el valor p. En muestras independientes con varianzas iguales equivalen a n₁ + n₂ − 2, mientras que en muestras emparejadas corresponden a n − 1 pares."
---

La **prueba t de Student** es un contraste de hipótesis paramétrico diseñado para determinar si la diferencia observada entre dos medias muestrales refleja una discrepancia real en las poblaciones de origen o puede atribuirse al azar del muestreo. Al desconocer la desviación estándar poblacional, sustituye dicho parámetro por su estimación muestral y evalúa el resultado mediante una distribución con colas más pesadas indexada por los grados de libertad.

Elegir correctamente entre una **prueba t para muestras independientes** y una **prueba t para muestras emparejadas** depende del diseño de recogida de datos. Puede calcular el estadístico, el valor p y los intervalos de confianza al instante con nuestra [Calculadora de Prueba T](/es/calculadoras/calculadora-prueba-t).

## Fundamentos matemáticos y variantes de la prueba t

Toda prueba t construye un cociente señal-ruido: en el numerador se sitúa la diferencia entre medias y en el denominador el error estándar de dicha diferencia.

### Muestras independientes (Student y Welch)

Se aplica cuando las observaciones de ambos grupos no guardan relación entre sí (por ejemplo, grupo de control frente a grupo tratado en un experimento aleatorio). Si se asume igualdad de varianzas poblacionales (homocedasticidad), se calcula la **varianza combinada** (`sₚ²`):

```text
sₚ² = [ (n₁ − 1) · s₁² + (n₂ − 1) · s₂² ] / (n₁ + n₂ − 2)
EE  = √[ sₚ² · (1/n₁ + 1/n₂) ]
t   = (x̄₁ − x̄₂) / EE       con gl = n₁ + n₂ − 2
```

Aquí `x̄₁` y `x̄₂` son las medias muestrales, `s₁²` y `s₂²` las varianzas insesgadas, y `n₁` y `n₂` los tamaños grupales. Cuando no puede garantizarse igualdad de varianzas, la **prueba t de Welch** usa el error estándar `EE_Welch = √(s₁²/n₁ + s₂²/n₂)` con grados de libertad efectivos de Welch-Satterthwaite.

### Muestras emparejadas (dependientes)

Se emplea cuando cada observación del primer grupo está vinculada a una del segundo, como mediciones antes y después sobre los mismos sujetos. El método calcula cada diferencia individual `dᵢ = x₁ᵢ − x₂ᵢ`, su media `d̄` y su desviación estándar `s_d`:

```text
t = d̄ / (s_d / √n)       con gl = n − 1
```

Al eliminar la variabilidad basal entre individuos, el diseño emparejado reduce el error estándar y aumenta la potencia estadística.

## Ejemplo numérico paso a paso: muestras independientes

Un equipo técnico evalúa la autonomía en horas de una batería estándar frente a una nueva formulación química con dos lotes independientes de `n₁ = 6` y `n₂ = 6` dispositivos:

- **Grupo A (Estándar):** `[10.2, 10.8, 9.9, 10.5, 10.1, 10.3]` h.
- **Grupo B (Nueva):** `[11.0, 11.4, 10.7, 11.2, 10.9, 11.4]` h.

1. **Medias muestrales:** `x̄₁ = 61.8 / 6 = 10.30` h y `x̄₂ = 66.6 / 6 = 11.10` h (diferencia observada = `0.80` h).
2. **Varianzas muestrales (`s² = Σ(xᵢ − x̄)² / (n − 1)`):**
   - Grupo A: suma de cuadrados `0.01 + 0.25 + 0.16 + 0.04 + 0.04 + 0.00 = 0.50`, luego `s₁² = 0.50 / 5 = 0.10` h².
   - Grupo B: suma de cuadrados `0.01 + 0.09 + 0.16 + 0.01 + 0.04 + 0.09 = 0.40`, luego `s₂² = 0.40 / 5 = 0.08` h².
3. **Varianza combinada y error estándar:**
   - `sₚ² = (0.50 + 0.40) / 10 = 0.09` h² (desviación combinada `sₚ = 0.30` h).
   - `EE = √[0.09 · (1/6 + 1/6)] = √0.03 ≈ 0.1732` h.
4. **Estadístico t y significancia:**
   - `t = (11.10 − 10.30) / 0.1732 ≈ 4.6188` con `gl = 10`.
   - El valor crítico bilateral para `α = 0.05` es `2.228` (`3.169` para `α = 0.01`). Como `4.6188 > 3.169`, se obtiene `p < 0.001` (`p ≈ 0.00095`). La **d de Cohen** equivale a `0.80 / 0.30 = 2.67`, confirmando un efecto real de gran magnitud.

## Comparativa entre variantes y pruebas relacionadas

| Tipo de prueba | Relación entre grupos | Supuesto de varianza | Grados de libertad | Uso principal | Alternativa no paramétrica |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Prueba t de una muestra | Un grupo vs. referencia | No aplica | `n − 1` | Control frente a estándar teórico | Wilcoxon de una muestra |
| Student independiente | Dos grupos distintos | Homocedasticidad | `n₁ + n₂ − 2` | Experimentos controlados equilibrados | Prueba U de Mann-Whitney |
| Welch independiente | Dos grupos distintos | Varianzas desiguales | Welch-Satterthwaite | Comparación general robusta | Prueba U de Mann-Whitney |
| Muestras emparejadas | Medidas repetidas | Normalidad de `dᵢ` | `n_pares − 1` | Diseños pre-post o cruzados | Rangos con signo de Wilcoxon |
| ANOVA de un factor | Tres o más grupos | Homocedasticidad | `k − 1` y `N − k` | Múltiples tratamientos simultáneos | Prueba de Kruskal-Wallis |

## Interpretación del valor p, supuestos y errores frecuentes

El **valor p** mide la probabilidad de obtener un estadístico t igual o más extremo que el observado bajo la hipótesis nula de igualdad de medias. No equivale a la probabilidad de que dicha hipótesis sea cierta ni mide la magnitud práctica del hallazgo. Aunque suele adoptarse `α = 0.05`, áreas como la física experimental o la genómica emplean umbrales más exigentes.

Para evitar conclusiones sesgadas, conviene prevenir cuatro fallos habituales:

- **Tratar datos emparejados como independientes:** ignorar la correlación entre mediciones repetidas infla el error estándar y oculta efectos reales.
- **Encadenar múltiples pruebas t sin ajuste:** realizar diez comparaciones por pares con `α = 0.05` eleva la probabilidad de al menos un falso positivo cerca del 40%; ante tres o más grupos debe aplicarse ANOVA con corrección de Bonferroni o Tukey.
- **Ignorar valores atípicos:** un único error de registro distorsiona simultáneamente la media y la varianza muestral.
- **Omitir tamaño del efecto e intervalo de confianza:** un `p = 0.03` con una `d` minúscula o un intervalo demasiado amplio indica relevancia práctica dudosa o baja precisión muestral.
