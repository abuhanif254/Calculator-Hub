---
title: "Calculadora de Desviación Estándar"
metaTitle: "Calculadora de Desviación Estándar | Muestra y Población"
description: "Calcule la desviación estándar, la varianza y la media aritmética al instante. Soporta conjuntos de datos tanto de población completa como de muestra estadística."
metaDescription: "Calculadora de desviación estándar en línea gratuita. Obtenga al instante la desviación típica, la varianza, la media y el error estándar de sus datos."
metaKeywords: "calculadora de desviacion estandar, desviacion tipica, calcular varianza, desviacion de la muestra, desviacion poblacional, correccion de bessel, estadistica descriptiva"
faqs:
  - question: "¿Cuándo debo elegir la desviación estándar muestral (s) en lugar de la poblacional (σ)?"
    answer: "Utilice la fórmula poblacional (σ, dividiendo entre N) solo cuando sus datos incluyan a todos los elementos del grupo estudiado. Si sus datos son un subconjunto extraído para estimar una población mayor, seleccione la desviación estándar muestral (s, dividiendo entre n - 1)."
  - question: "¿Por qué la desviación estándar de una muestra se divide entre n - 1?"
    answer: "Dividir entre n - 1 se denomina corrección de Bessel. Como la media muestral se calcula con los mismos datos observados, estos tienden a estar ligeramente más cerca de su media muestral que de la verdadera media poblacional. Restar un grado de libertad corrige ese sesgo a la baja."
  - question: "¿En qué se diferencia la desviación estándar de la varianza?"
    answer: "La varianza promedia las desviaciones al cuadrado respecto a la media, quedando expresada en unidades al cuadrado (como metros cuadrados o dólares al cuadrado). La desviación estándar es la raíz cuadrada de la varianza, devolviendo la medida a la unidad original de los datos."
  - question: "¿Puede la desviación estándar ser negativa o igual a cero?"
    answer: "Nunca puede ser negativa porque proviene de una suma de cuadrados y una raíz cuadrada principal no negativa. Solo es igual a cero cuando todos los valores del conjunto son idénticos entre sí, indicando ausencia total de dispersión."
  - question: "¿Cómo afectan los valores atípicos al cálculo de la desviación estándar?"
    answer: "Al elevar al cuadrado cada distancia respecto a la media, un valor extremo multiplica su peso sobre la suma de cuadrados e infla la desviación estándar. En muestras con valores atípicos severos conviene complementar el análisis con el rango intercuartílico (RIC)."
---

Conocer el promedio de un conjunto de datos resulta insuficiente para evaluar la precisión, el riesgo o la homogeneidad de una variable. Dos carteras de inversión pueden registrar la misma rentabilidad media anual del 8 %, pero mientras una avanza con fluctuaciones mínimas, la otra sufre oscilaciones extremas. La **desviación estándar** (o **desviación típica**) es la métrica fundamental de la estadística descriptiva e inferencial que cuantifica cuánta dispersión existe alrededor de la media aritmética.

Nuestra calculadora procesa cualquier serie numérica para obtener simultáneamente la desviación estándar muestral y poblacional, la varianza, la media aritmética, la suma de cuadrados, el error estándar y el coeficiente de variación.

## ¿Qué es la Desviación Estándar y Por Qué es Fundamental?

A diferencia de la varianza —que queda expresada en unidades elevadas al cuadrado difíciles de interpretar directamente—, la desviación estándar extrae la raíz cuadrada de dicha dispersión cuadrática media. Así, el resultado conserva exactamente la misma unidad de medida que las observaciones originales (milímetros, segundos, grados Celsius o euros).

* **Desviación estándar baja:** Indica que los datos se agrupan muy cerca del promedio. En manufactura o laboratorio refleja alta repetibilidad y control de calidad.
* **Desviación estándar alta:** Señala que los valores se dispersan en un rango amplio respecto a la media. En finanzas representa mayor volatilidad del activo y en estudios poblacionales evidencia alta heterogeneidad.

## Fórmulas de la Desviación Estándar: Población ($\sigma$) vs. Muestra ($s$)

El cálculo riguroso exige distinguir si los números ingresados abarcan la totalidad del universo estudiado o una muestra extraída de él.

### 1. Desviación Estándar Poblacional ($\sigma$)

Cuando se dispone del censo completo de los $N$ elementos de la población:

$$\sigma = \sqrt{\sigma^2} = \sqrt{\frac{\sum_{i=1}^{N} (x_i - \mu)^2}{N}}$$

### 2. Desviación Estándar Muestral ($s$) y Corrección de Bessel

Cuando se analiza una muestra de tamaño $n$ para inferir los parámetros de una población mayor, el denominador emplea los grados de libertad ($n - 1$):

$$s = \sqrt{s^2} = \sqrt{\frac{\sum_{i=1}^{n} (x_i - \bar{x})^2}{n - 1}}$$

### 3. Coeficiente de Variación ($CV$) y Error Estándar ($EE_{\bar{x}}$)

$$CV = \left(\frac{s}{|\bar{x}|}\right) \times 100\%, \qquad EE_{\bar{x}} = \frac{s}{\sqrt{n}}$$

Donde las variables representan:
* **$\sigma$ y $\sigma^2$**: Desviación estándar y varianza de la población completa.
* **$s$ y $s^2$**: Desviación estándar y varianza insesgada de la muestra.
* **$x_i$**: Cada valor individual observado en el conjunto de datos.
* **$\mu$ y $\bar{x}$**: Media aritmética poblacional ($\mu = \frac{\sum x_i}{N}$) y media muestral ($\bar{x} = \frac{\sum x_i}{n}$).
* **$N$ y $n$**: Número total de observaciones en la población o en la muestra.
* **$n - 1$**: Grados de libertad de la **corrección de Bessel**, que elimina el sesgo a la baja producido al medir las distancias respecto a $\bar{x}$ en lugar de la verdadera media desconocida $\mu$.

## Ejemplo de Cálculo Paso a Paso con Verificación Aritmética

Supongamos que un ingeniero mide la latencia en milisegundos ($\text{ms}$) de seis consultas a un servidor: **$\{12, 15, 18, 20, 22, 33\}$**.

### Paso 1: Cálculo de la media aritmética ($\bar{x}$)

$$\bar{x} = \frac{12 + 15 + 18 + 20 + 22 + 33}{6} = \frac{120}{6} = 20\text{ ms}$$

### Paso 2: Desviaciones individuales y suma de cuadrados ($SC$)

Restamos la media ($20\text{ ms}$) a cada dato y elevamos la diferencia al cuadrado:
* $x_1 = 12 \implies (12 - 20)^2 = 64$; $x_2 = 15 \implies (15 - 20)^2 = 25$
* $x_3 = 18 \implies (18 - 20)^2 = 4$; $x_4 = 20 \implies (20 - 20)^2 = 0$
* $x_5 = 22 \implies (22 - 20)^2 = 4$; $x_6 = 33 \implies (33 - 20)^2 = 169$

Sumamos los seis cuadrados para obtener la Suma de Cuadrados ($SC$):

$$SC = 64 + 25 + 4 + 0 + 4 + 169 = 266\text{ ms}^2$$

### Paso 3: Resultados como muestra ($n - 1 = 5$) y como población ($N = 6$)

* **Varianza y desviación estándar muestral:** $s^2 = \frac{266}{5} = 53,20\text{ ms}^2 \implies s = \sqrt{53,20} \approx 7,2938\text{ ms}$.
* **Error estándar y coeficiente de variación muestral:** $EE_{\bar{x}} = \frac{7,2938}{\sqrt{6}} \approx 2,9777\text{ ms}$; $CV = \frac{7,2938}{20} \times 100\% = 36,47\%$.
* **Varianza y desviación estándar poblacional:** $\sigma^2 = \frac{266}{6} \approx 44,3333\text{ ms}^2 \implies \sigma = \sqrt{44,3333} \approx 6,6583\text{ ms}$.

## Tabla de la Regla Empírica (Distribución Normal)

En una distribución normal o gaussiana, la desviación estándar determina qué porcentaje de los datos se concentra en cada intervalo alrededor de la media:

| Intervalo Simétrico | Datos Contenidos | Probabilidad en Colas Exteriores | Aplicación Técnica Principal |
| :--- | :--- | :--- | :--- |
| **$\mu \pm 1\sigma$** | **68,27 %** | 31,73 % (aprox. 1 de cada 3) | Banda de fluctuación ordinaria o variabilidad cotidiana. |
| **$\mu \pm 1,96\sigma$** | **95,00 %** | 5,00 % (1 de cada 20) | Estándar para intervalos de confianza del 95 % ($\alpha = 0,05$). |
| **$\mu \pm 2\sigma$** | **95,45 %** | 4,55 % (aprox. 1 de cada 22) | Umbral de alerta temprana en control estadístico de calidad. |
| **$\mu \pm 3\sigma$** | **99,73 %** | 0,27 % (1 de cada 370) | Límite de control industrial de Shewhart para anomalías. |
| **$\mu \pm 6\sigma$** | **99,9999998 %** | 0,0000002 % (2 por mil millones) | Estándar *Seis Sigma* de manufactura (3,4 defectos por millón). |

## Consejos Prácticos y Errores Frecuentes

* **Use el Coeficiente de Variación entre escalas distintas:** Para comparar la dispersión de salarios (en miles de dólares) frente a la antigüedad laboral (en años), utilice siempre el **Coeficiente de Variación ($CV$)**, que es adimensional y expresa la dispersión como porcentaje de la media.
* **Verifique la función en hojas de cálculo:** La función `DESVEST.M` divide entre $n - 1$ (muestra), mientras que `DESVEST.P` divide entre $N$ (población). Confundirlas en muestras pequeñas ($n < 30$) sesga los resultados.
* **Cuidado con las distribuciones asimétricas:** La regla del $68\text{–}95\text{–}99,7\%$ rige solo para distribuciones normales. En datos asimétricos aplique la **desigualdad de Chebyshev**, que garantiza al menos un $1 - \frac{1}{k^2}$ de los datos ($75\%$ para $k = 2$ y $88,9\%$ para $k = 3$) dentro de $k$ desviaciones estándar.
