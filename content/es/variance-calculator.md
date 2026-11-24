---
title: "Calculadora de Varianza: La Guía Definitiva de Dispersión"
metaTitle: "Calculadora de Varianza | Muestra, Población y Fórmulas"
description: "Calcule la varianza muestral y poblacional, la suma de cuadrados y la desviación típica paso a paso. Incluye la corrección de Bessel, ejemplos resueltos y comparativas."
metaDescription: "Calcule la varianza muestral y poblacional, suma de cuadrados y desviación estándar al instante. Incluye corrección de Bessel, fórmulas y ejemplos."
metaKeywords: "calculadora de varianza, varianza muestral, varianza poblacional, suma de cuadrados, correccion de bessel, dispersion estadistica, desviacion tipica"
faqs:
  - question: "¿Cuándo debo usar la varianza muestral (n - 1) en lugar de la poblacional (N)?"
    answer: "Utilice la varianza poblacional (dividiendo entre N) únicamente cuando su conjunto de datos incluya a la totalidad de los elementos del universo analizado, como todas las facturas emitidas por una empresa en un ejercicio. Seleccione la varianza muestral (dividiendo entre n - 1) siempre que trabaje con un subconjunto extraído para estimar sin sesgo la dispersión de una población mayor."
  - question: "¿Por qué se elevan al cuadrado las desviaciones respecto a la media al calcular la varianza?"
    answer: "Si promediáramos las desviaciones simples respecto a la media, los signos positivos y negativos se cancelarían y el resultado sería siempre cero. Elevar cada distancia al cuadrado garantiza términos no negativos, penaliza con mayor intensidad las desviaciones grandes y genera una función diferenciable y aditiva indispensable en análisis de varianza (ANOVA) y regresión lineal."
  - question: "¿Qué diferencia práctica existe entre la varianza y la desviación estándar?"
    answer: "La varianza cuantifica la dispersión en unidades al cuadrado (como euros al cuadrado o megapascales al cuadrado), lo que facilita operaciones algebraicas y descomposiciones de riesgo. La desviación estándar o típica es la raíz cuadrada positiva de la varianza y devuelve la medida a la unidad original de los datos para interpretarla de forma directa."
  - question: "¿Puede la varianza tomar un valor negativo o igual a cero?"
    answer: "Nunca puede ser negativa porque promedia cuadrados de números reales, los cuales son siempre mayores o iguales a cero. La varianza vale exactamente cero solo cuando todas las observaciones de la serie son idénticas entre sí, indicando ausencia absoluta de variabilidad."
  - question: "¿Cómo alteran los valores atípicos el resultado de la varianza?"
    answer: "Al elevar al cuadrado cada distancia hasta la media, la varianza muestra una sensibilidad cuadrática frente a datos extremos. Un registro situado cuatro veces más lejos de la media que un dato ordinario aporta dieciséis veces más a la suma de cuadrados, por lo que en series muy asimétricas conviene contrastarla con el rango intercuartílico (RIC)."
---

La dispersión estadística mide con qué amplitud se reparten las observaciones alrededor de su valor central. Aunque la media aritmética o la mediana señalan el centro de una serie, dos conjuntos con idéntico promedio pueden exhibir niveles de riesgo, precisión y consistencia opuestos. La **varianza** ($\sigma^2$ en poblaciones y $s^2$ en muestras) es la métrica angular de la variabilidad: cuantifica el promedio de las distancias al cuadrado entre cada observación y la media aritmética.

En finanzas cuantitativas, control industrial de calidad, física experimental y aprendizaje automático, la varianza estructura el modelado de la incertidumbre. Desde medir la volatilidad histórica de una cartera en euros o dólares hasta ejecutar un análisis de varianza (ANOVA) entre tratamientos clínicos o diagnosticar el compromiso entre sesgo y varianza, dominar su cálculo asegura interpretaciones fiables.

## Fórmulas de la Varianza: Poblacional y Muestral

El cálculo riguroso exige distinguir si los datos registrados abarcan el censo completo de la población o representan una muestra aleatoria extraída para inferir parámetros poblacionales.

### 1. Varianza Poblacional ($\sigma^2$)

Cuando se dispone de la totalidad de los $N$ elementos del universo observado:

$$\sigma^2 = \frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}$$

### 2. Varianza Muestral ($s^2$) con Corrección de Bessel

Para una muestra de tamaño $n$, se aplica la corrección de Bessel dividiendo la suma de cuadrados entre $n - 1$:

$$s^2 = \frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}$$

### 3. Identidad Algebraica de la Suma de Cuadrados ($SC$)

$$SC = \sum_{i=1}^{n} (x_i - \bar{x})^2 = \sum_{i=1}^{n} x_i^2 - \frac{\left(\sum_{i=1}^{n} x_i\right)^2}{n}$$

### Definición de Variables

* **$\sigma^2$ y $s^2$**: Varianza poblacional y estimador insesgado muestral (en unidades cuadráticas).
* **$x_i$**: Cada observación numérica individual de la serie.
* **$\mu$ y $\bar{x}$**: Media poblacional ($\frac{1}{N}\sum x_i$) y media muestral ($\frac{1}{n}\sum x_i$).
* **$N$ y $n$**: Número total de observaciones en la población o en la muestra.
* **$n - 1$**: Grados de libertad ($gl$) de la corrección de Bessel.

## Por Qué Se Divide entre $n - 1$: Corrección de Bessel

Cuando se desconoce la verdadera media poblacional $\mu$, resulta obligatorio sustituirla por la media muestral $\bar{x}$. Por propiedad algebraica, $\bar{x}$ minimiza la suma de distancias cuadráticas dentro de esa muestra concreta, por lo que siempre se cumple:

$$\sum_{i=1}^{n} (x_i - \bar{x})^2 \le \sum_{i=1}^{n} (x_i - \mu)^2$$

Dividir esa suma entre $n$ subestimaría sistemáticamente $\sigma^2$ en muestreos repetidos. Emplear $n - 1$ corrige ese sesgo a la baja mediante el factor $\frac{n}{n - 1}$: fijada $\bar{x}$, solo $n - 1$ observaciones varían libremente, pues la última queda fijada por la restricción $\sum(x_i - \bar{x}) = 0$.

## Ejemplo Resuelto Paso a Paso con Verificación Aritmética

Un laboratorio metalúrgico mide la resistencia a la tracción (en megapascales, $\text{MPa}$) de una muestra aleatoria de $n = 6$ probetas de acero: **$\{14, 18, 20, 22, 26, 32\}\text{ MPa}$**.

1. **Media muestral ($\bar{x}$)**:
   $$\bar{x} = \frac{14 + 18 + 20 + 22 + 26 + 32}{6} = \frac{132}{6} = 22\text{ MPa}$$
2. **Desviaciones ($x_i - \bar{x}$)**:
   Restando $22$ a cada medición obtenemos $-8, -4, -2, 0, +4, +10$, cuya suma es exactamente $0$, verificando la exactitud de la media.
3. **Suma de Cuadrados ($SC$)**:
   $$SC = (-8)^2 + (-4)^2 + (-2)^2 + 0^2 + 4^2 + 10^2 = 64 + 16 + 4 + 0 + 16 + 100 = 200\text{ MPa}^2$$
   Comprobación algebraica: $\sum x_i^2 = 3.104$, luego $SC = 3.104 - \frac{132^2}{6} = 3.104 - 2.904 = 200\text{ MPa}^2$.
4. **Varianza muestral ($n - 1 = 5$) y poblacional ($N = 6$)**:
   $$s^2 = \frac{200}{5} = 40,00\text{ MPa}^2, \qquad s = \sqrt{40,00} \approx 6,3246\text{ MPa}$$
   Si las seis probetas conformaran el lote íntegro fabricado ($N = 6$), la varianza poblacional sería $\sigma^2 = \frac{200}{6} \approx 33,3333\text{ MPa}^2$ (con $\sigma \approx 5,7735\text{ MPa}$).

## Tabla Comparativa de Métricas de Dispersión

| Métrica | Fórmula | Unidades | Sensibilidad a Atípicos | Uso Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Varianza muestral ($s^2$)** | $\frac{\sum (x_i - \bar{x})^2}{n - 1}$ | Cuadráticas ($\text{u}^2$) | Muy alta | ANOVA, regresión, gestión de carteras |
| **Desviación estándar ($s$)** | $\sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}$ | Originales | Alta | Intervalos de confianza, control de calidad |
| **Coeficiente de variación ($CV$)** | $\frac{s}{|\bar{x}|} \times 100\%$ | Porcentaje ($\%$) | Alta | Comparar dispersión entre escalas distintas |
| **Desviación media absoluta ($DMA$)** | $\frac{\sum |x_i - \bar{x}|}{n}$ | Originales | Moderada | Pronóstico de demanda y seguimiento robusto |
| **Rango intercuartílico ($RIC$)** | $Q_3 - Q_1$ | Originales | Muy baja | Datos asimétricos y diagramas de caja |

## Aplicaciones Prácticas y Errores Frecuentes

La fortaleza teórica de la varianza reside en su **propiedad aditiva** para variables independientes: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$. Por ello, ANOVA descompone la variabilidad total ($SC_{\text{total}}$) en variación explicada entre grupos ($SC_{\text{entre}}$) y variación residual interna ($SC_{\text{intra}}$) para calcular el estadístico $F$. En finanzas, la teoría moderna de carteras integra varianzas ($w_i^2 \sigma_i^2$) y covarianzas ($2 w_i w_j \text{Cov}(i, j)$) para cuantificar cuánto riesgo reduce la diversificación.

Evite estos cuatro fallos frecuentes al calcularla:

* **Confundir funciones en hojas de cálculo**: En Excel en español, `VAR.S` aplica el divisor muestral $n - 1$ y `VAR.P` usa el poblacional $N$. Intercambiarlas con $n < 30$ sesga los contrastes.
* **Comparar unidades cuadráticas con lineales**: Nunca contraste $40\text{ €}^2$ directamente frente a una media expresada en euros; extraiga siempre la raíz cuadrada ($s$) antes de fijar tolerancias.
* **Cancelación numérica con la fórmula rápida**: Con cifras grandes y variación diminuta (p. ej., alrededor de $100.000,00\text{ €}$ con diferencias de céntimos), restar $\sum x_i^2$ y $(\sum x_i)^2 / n$ pierde precisión; centre los datos o utilice el algoritmo de Welford.
* **Desatender la asimetría**: Como la varianza penaliza igual subidas y caídas, compleméntela en carteras asimétricas con la semivarianza a la baja o con el $RIC$.
