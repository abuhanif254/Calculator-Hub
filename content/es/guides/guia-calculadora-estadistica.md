---
title: "Estadística Descriptiva Explicada: Cómo Analizar Cualquier Conjunto de Datos"
description: "Guía rigurosa de estadística descriptiva: media, mediana, moda, cuartiles, varianza y desviación estándar con corrección de Bessel, rango intercuartílico y análisis paso a paso."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "statistics-calculator"
faqs:
  - question: "¿Cuándo debo usar la fórmula muestral (n − 1) frente a la poblacional (N)?"
    answer: "Utilice la fórmula poblacional (dividiendo entre N) únicamente cuando disponga de todos los individuos del universo de estudio, como las notas de los 30 alumnos de un aula concreta. Cuando analice un subconjunto extraído para inferir propiedades de un grupo mayor, aplique la corrección de Bessel (n − 1) para evitar subestimar la dispersión real."
  - question: "¿Por qué suele interpretarse la desviación estándar en lugar de la varianza?"
    answer: "La varianza eleva al cuadrado las desviaciones respecto a la media, expresando el resultado en unidades cuadráticas poco intuitivas (como euros² o ms²). La desviación estándar extrae la raíz cuadrada de la varianza para devolver la métrica exactamente a las mismas unidades originales que los datos observados."
  - question: "¿Qué combinación de métricas conviene elegir si hay valores atípicos extremos?"
    answer: "Ante valores atípicos pronunciados o distribuciones muy asimétricas, reemplace la media y la desviación estándar por la mediana y el rango intercuartílico (RIC = Q₃ − Q₁). Al depender exclusivamente del orden central de los datos, ni la mediana ni el RIC se distorsionan por observaciones extremas aisladas."
  - question: "¿Para qué sirve el coeficiente de variación (CV) al comparar dos muestras?"
    answer: "El coeficiente de variación divide la desviación estándar entre la media (expresado en porcentaje) para medir la dispersión relativa sin unidades. Permite comparar directamente la variabilidad de fenómenos con escalas muy distintas, como la volatilidad del precio de una acción frente a la variabilidad de un tiempo de entrega."
  - question: "¿Qué diferencia práctica hay entre el rango total y el rango intercuartílico?"
    answer: "El rango total (Máximo − Mínimo) mide la amplitud completa utilizando únicamente los dos valores más extremos de la muestra, por lo que basta un solo error de medición para alterarlo. El rango intercuartílico mide exclusivamente la amplitud del 50 % central de las observaciones, ofreciendo un resumen mucho más estable."
---

La **estadística descriptiva** reúne los métodos matemáticos dedicados a resumir, organizar y cuantificar las características principales de un conjunto de datos observados. Todo análisis exploratorio riguroso exige describir dos dimensiones complementarias: dónde se concentra la distribución (**tendencia central y posición**) y cuánto se apartan los datos entre sí (**dispersión o variabilidad**).

Para obtener simultáneamente recuento, suma, media, mediana, moda, cuartiles, varianza y desviación estándar muestral o poblacional con exactitud, utilice nuestra [Calculadora de Estadística](/es/calculadoras/calculadora-estadistica). A continuación se presentan las fórmulas clave, la corrección de Bessel, un análisis numérico completo paso a paso y los criterios para seleccionar cada indicador.

## Medidas de Tendencia Central y Posición

- **Media aritmética (`x̄` o `μ`)**: cociente entre la suma de observaciones y su número total (`x̄ = ∑xᵢ / n`). Aprovecha cada dato, aunque resulta sensible a valores atípicos.
- **Mediana (`Me`)**: valor central de la serie ordenada (o promedio de los dos valores centrales cuando `n` es par). Resiste asimetrías y extremos.
- **Moda (`Mo`)**: valor o categoría de mayor frecuencia absoluta; única medida válida para datos nominales.
- **Cuartiles y Rango Intercuartílico (`RIC`)**: `Q₁` delimita el percentil 25 y `Q₃` el percentil 75. Su diferencia (`RIC = Q₃ − Q₁`) mide la amplitud del `50%` central de las observaciones.

## Medidas de Dispersión y Corrección de Bessel

Dos conjuntos pueden tener idéntica media y comportamientos opuestos según su grado de dispersión. Para medirlo se utilizan el rango (`x_máx − x_mín`), la varianza y la desviación estándar.

### Varianza Poblacional frente a Muestral

Si los datos representan la **población completa** de tamaño `N`:

```text
σ² = ∑(xᵢ − μ)² / N          |     σ = √σ²
```

Si los datos conforman una **muestra** de tamaño `n`, la media muestral `x̄` se sitúa más cerca de los puntos muestrales que la verdadera media poblacional `μ`. Dividir entre `n` subestimaría sistemáticamente la dispersión real; para corregirlo se aplica la **corrección de Bessel** dividiendo entre `n − 1` grados de libertad:

```text
s² = ∑(xᵢ − x̄)² / (n − 1)    |     s = √s²
```

Asimismo, el **coeficiente de variación** (`CV = (s / x̄) × 100%`) expresa la dispersión relativa en porcentaje, permitiendo comparar series con distintas unidades o escalas.

## Ejemplo Práctico Paso a Paso: Análisis Completo de una Muestra

Considere una muestra de `n = 8` latencias de servidor en milisegundos: `[12, 15, 14, 10, 18, 15, 16, 20]`.

**Paso 1: Ordenar la serie y calcular la suma**

- Serie ordenada: `[10, 12, 14, 15, 15, 16, 18, 20]`
- Suma (`∑xᵢ`): `10 + 12 + 14 + 15 + 15 + 16 + 18 + 20 = 120 ms`

**Paso 2: Calcular tendencia central y posición**

- **Media (`x̄`)**: `120 / 8 = 15.0 ms`
- **Mediana (`Me`)**: promedio de las posiciones 4.ª (`15`) y 5.ª (`15`) = `15.0 ms`
- **Moda (`Mo`)**: `15 ms` (frecuencia máxima: `2`)
- **Rango (`R`)**: `20 − 10 = 10 ms`
- **Cuartiles (mitades exclusivas)**: mitad inferior `[10, 12, 14, 15]` → `Q₁ = 13.0 ms`; mitad superior `[15, 16, 18, 20]` → `Q₃ = 17.0 ms`; `RIC = 17.0 − 13.0 = 4.0 ms`.

**Paso 3: Calcular la suma de cuadrados (`SC`) respecto a `15.0`**

- `(10−15)² + (12−15)² + (14−15)² + (15−15)² + (15−15)² + (16−15)² + (18−15)² + (20−15)²`
- `25 + 9 + 1 + 0 + 0 + 1 + 9 + 25 = 70 ms²`

**Paso 4: Calcular varianza, desviación estándar y coeficiente de variación**

```text
Varianza muestral (s²)         = 70 / (8 − 1) = 70 / 7 = 10.0 ms²
Desviación estándar muestral   = √10.0 ≈ 3.1623 ms
Varianza poblacional (σ²)      = 70 / 8 = 8.75 ms²
Desviación estándar poblac.    = √8.75 ≈ 2.9580 ms
Coeficiente de variación (CV)  = (3.1623 / 15.0) × 100% ≈ 21.08%
```

## Tabla Comparativa de Métricas Descriptivas

| Métrica | Fórmula | Sensibilidad a Atípicos | Escala Mínima | Uso Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| Media (`x̄`) | `∑xᵢ / n` | Muy alta | Intervalo / Razón | Datos simétricos sin extremos |
| Mediana (`Me`) | Percentil 50 | Muy baja | Ordinal | Salarios, precios, series asimétricas |
| Moda (`Mo`) | Máxima frecuencia | Nula en casos aislados | Nominal | Categorías y picos multimodales |
| Rango (`R`) | `x_máx − x_mín` | Extrema | Intervalo / Razón | Cotas máximas y mínimas brutas |
| `RIC` | `Q₃ − Q₁` | Muy baja | Ordinal / Intervalo | Dispersión central y diagramas de caja |
| Varianza (`s²`) | `∑(xᵢ − x̄)² / (n − 1)` | Muy alta | Intervalo / Razón | Inferencia estadística y ANOVA |
| Desv. estándar (`s`) | `√[∑(xᵢ − x̄)² / (n − 1)]` | Alta | Intervalo / Razón | Control de calidad y volatilidad |

## Aplicaciones Reales y Advertencias Metodológicas

La estadística descriptiva fundamenta el control industrial de tolerancias (`±3σ`), la medición de riesgo financiero, la descripción basal de ensayos clínicos y el monitoreo de latencia en servicios digitales.

Evite cuatro fallos habituales al interpretarla:

- **Confundir `N` y `n − 1`**: en muestras pequeñas (`n < 30`), omitir la corrección de Bessel subestima sensiblemente la variabilidad (`2.96 ms` frente a `3.16 ms`).
- **Suponer normalidad sin comprobar asimetría**: reglas como «el `95%` cae en `x̄ ± 2s`» fallan en distribuciones sesgadas y pueden predecir cotas negativas sin sentido físico.
- **Discrepancias en cuartiles**: distintos programas emplean variantes de interpolación (Hyndman-Fan, mitades inclusivas o exclusivas) que difieren levemente en muestras reducidas.
- **Paradoja de Simpson**: agregar subgrupos heterogéneos puede invertir tendencias reales; examine siempre los segmentos por separado.
