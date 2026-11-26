---
title: "Entendiendo la Varianza: Fórmulas de Población vs. Muestra"
description: "Guía técnica sobre la varianza estadística: fórmulas poblacional y muestral, corrección de Bessel, relación con la desviación estándar, cálculo paso a paso y errores comunes."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "variance-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué la varianza muestral divide entre n − 1 en lugar de n?"
    answer: "Al calcular la varianza de una muestra se emplea la media muestral en lugar de la media poblacional desconocida. Como cada observación está matemáticamente más cerca de su propia media muestral que de la media real de la población, dividir entre n subestimaría sistemáticamente la dispersión verdadera. Dividir entre n − 1 (corrección de Bessel) produce un estimador insesgado de la varianza poblacional."
  - question: "¿Qué diferencia hay entre varianza y desviación estándar?"
    answer: "La varianza mide la dispersión promedio en unidades elevadas al cuadrado (por ejemplo, euros cuadrados o milisegundos cuadrados), mientras que la desviación estándar es su raíz cuadrada positiva y vuelve a expresarse en las mismas unidades que los datos originales. La varianza es esencial para propiedades algebraicas como sumar dispersiones independientes, y la desviación estándar facilita la interpretación directa."
  - question: "¿Qué indica una varianza igual a cero?"
    answer: "Una varianza igual a cero significa que todas las observaciones del conjunto de datos son idénticas entre sí e iguales a la media aritmética, por lo que no existe dispersión alguna. A la inversa, la varianza nunca puede ser negativa porque resulta de sumar desviaciones elevadas al cuadrado."
  - question: "¿Cómo afectan los valores atípicos a la varianza?"
    answer: "La varianza es extremadamente sensible a los valores atípicos porque eleva al cuadrado la distancia de cada observación respecto a la media. Una observación alejada diez veces más que otra contribuye cien veces más a la suma de cuadrados, por lo que ante datos con colas pesadas conviene complementar el análisis con el rango intercuartílico o la desviación absoluta mediana."
  - question: "¿Cuándo se debe usar la fórmula de varianza poblacional?"
    answer: "Debe aplicarse la fórmula poblacional (dividiendo entre N) únicamente cuando se dispone de la totalidad de los elementos de interés y no se pretende inferir hacia un grupo mayor; por ejemplo, las calificaciones finales de todos los estudiantes de una clase específica o los retornos completos de un fondo durante un periodo cerrado."
---

La **varianza** es la medida cuadrática fundamental de dispersión estadística y cuantifica cuánto se alejan las observaciones de un conjunto de datos respecto a su media aritmética. Mientras las medidas de tendencia central resumen el valor típico, la varianza describe la consistencia operativa, la volatilidad financiera o el nivel de incertidumbre inherente del fenómeno analizado.

Determinar con rigor si sus observaciones conforman la población completa o una muestra extraída de un universo mayor define el denominador exacto de la ecuación. Puede calcular al instante ambos parámetros, junto con la desviación estándar, la suma de cuadrados y cada desviación individual en nuestra [Calculadora de Varianza](/es/calculadoras/calculadora-de-varianza).

## Fórmulas de varianza poblacional y muestral

Las desviaciones simples `(xᵢ − x̄)` siempre suman cero porque los signos positivos y negativos se cancelan. Para evitar esa anulación y ponderar con mayor severidad los alejamientos grandes, la varianza eleva al cuadrado cada distancia antes de promediarla.

### Varianza poblacional (`σ²`)

Se aplica cuando se ha medido la **totalidad** del conjunto de interés (`N` elementos), cuya media exacta es `μ`:

```text
σ² = [ Σ(xᵢ − μ)² ] / N
```

### Varianza muestral (`s²`) y corrección de Bessel

En la mayoría de los estudios empíricos se analiza una muestra de `n` observaciones extraída de una población mayor. Como la media poblacional `μ` es desconocida, se sustituye por `x̄` y se divide entre `n − 1` grados de libertad (**corrección de Bessel**):

```text
s² = [ Σ(xᵢ − x̄)² ] / (n − 1)
```

Al centrar las desviaciones en `x̄`, la suma de cuadrados resulta ligeramente menor que respecto a `μ`. Dividir entre `n − 1` compensa exactamente ese sesgo a la baja en valor esperado (`E[s²] = σ²`).

### Desviación estándar y coeficiente de variación

Dado que la varianza se expresa en unidades cuadráticas (`kg²`, `ms²`, `€²`), su raíz cuadrada positiva devuelve la **desviación estándar** (`σ = √σ²` o `s = √s²`) en la escala original. Para comparar la variabilidad relativa entre series con escalas distintas se utiliza el **coeficiente de variación**: `CV = (s / |x̄|) × 100%`.

## Ejemplo numérico paso a paso

Considere cinco tiempos de respuesta (en milisegundos) registrados en un servidor bajo carga estable: `[40, 44, 48, 52, 66]` ms.

1. **Calcular la media aritmética:** `x̄ = (40 + 44 + 48 + 52 + 66) / 5 = 250 / 5 = 50` ms.
2. **Calcular las desviaciones (`xᵢ − 50`):** `−10, −6, −2, +2, +16` (verificación: suma igual a `0`).
3. **Elevar al cuadrado y sumar (`SC`):** `100 + 36 + 4 + 4 + 256 = 400` ms².
4. **Dividir según el alcance del conjunto:**
   - **Como muestra (`n = 5`, denominador `n − 1 = 4`):** `s² = 400 / 4 = 100` ms²; desviación estándar `s = √100 = 10` ms y `CV = (10 / 50) × 100% = 20%`.
   - **Como población completa (`N = 5`):** `σ² = 400 / 5 = 80` ms² y `σ = √80 ≈ 8.9443` ms.

Con cinco observaciones, la varianza muestral (`100`) supera en un 25% a la poblacional (`80`); en cambio, con `n = 1,000`, la discrepancia entre `n` y `n − 1` desciende por debajo del 0.1%.

## Comparativa de medidas de dispersión

| Medida estadística | Fórmula principal | Unidades | Sensibilidad a atípicos | Uso recomendado | Limitación principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Varianza poblacional (`σ²`) | `Σ(xᵢ − μ)² / N` | Cuadráticas | Muy alta | Censos completos y modelos teóricos | Lectura poco intuitiva al cuadrado |
| Varianza muestral (`s²`) | `Σ(xᵢ − x̄)² / (n − 1)` | Cuadráticas | Muy alta | Inferencia estadística, ANOVA y regresión | Exige `n ≥ 2`; sensible a colas largas |
| Desviación estándar (`s`) | `√s²` | Originales | Alta | Reporte estándar y control de calidad | No es directamente aditiva |
| Coeficiente de variación | `(s / \|x̄\|) × 100%` | Porcentaje | Alta | Comparar dispersión entre distintas unidades | Se inestabiliza si `x̄` tiende a cero |
| Rango intercuartílico | `Q₃ − Q₁` | Originales | Baja | Distribuciones asimétricas o sesgadas | Ignora la mitad extrema de los datos |
| Desviación absoluta mediana | `mediana(\|xᵢ − mediana\|)` | Originales | Muy baja | Series ruidosas y detección de anomalías | Menor tratabilidad analítica |

## Aplicaciones prácticas y precauciones metodológicas

La propiedad algebraica clave de la varianza es la **aditividad**: para dos variables aleatorias independientes `X` e `Y`, la varianza de su suma o diferencia equivale a `Var(X ± Y) = Var(X) + Var(Y)`, propiedad que no cumplen las desviaciones estándar lineales. Por ello sustenta la teoría moderna de carteras financieras, la propagación de tolerancias en metrología industrial y el análisis de varianza (ANOVA).

Para evitar errores metodológicos frecuentes al reportar dispersión en informes científicos o financieros, tenga en cuenta tres precauciones esenciales:

- **No aplicar `N` en muestras destinadas a inferencia:** en hojas de cálculo y paquetes estadísticos, seleccionar por descuido la función de varianza poblacional en lugar de la muestral subestima sistemáticamente la variabilidad real, estrecha de forma artificial los intervalos de confianza y distorsiona las pruebas t.
- **Vigilar cambios de régimen temporal (heterocedasticidad):** una serie histórica puede presentar varianza muy estable en un tramo tranquilo y multiplicarse bruscamente durante periodos de estrés o cambio estructural, invalidando cualquier estimación única de riesgo constante.
- **Evitar inestabilidad numérica con medias elevadas:** la fórmula abreviada `Σxᵢ²/n − x̄²` sufre cancelación catastrófica en aritmética de coma flotante cuando la media supera en varios órdenes de magnitud a la desviación estándar; en cálculo computacional resulta preferible el algoritmo de Welford en una sola pasada.
