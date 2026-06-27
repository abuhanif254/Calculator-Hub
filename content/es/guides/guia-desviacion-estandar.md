---
title: "Comprender la Desviación Estándar con Ejemplos"
description: "Una explicación clara de la desviación estándar y la varianza: la diferencia entre fórmulas de población y muestra, y cómo interpretar los resultados."
category: "Math & Science"
readingTime: 7
lastUpdated: "2026-06-11"
relatedCalculator: "standard-deviation-calculator"
---

## ¿Qué es la Desviación Estándar?

La **desviación estándar** es una medida de qué tan dispersos están los valores en un conjunto de datos alrededor de la media (promedio). Una desviación estándar pequeña significa que los valores se agrupan estrechamente alrededor de la media; una desviación estándar grande significa que los valores están muy dispersos.

Responde a la pregunta fundamental: *"¿Qué tan típico es el promedio?"*

La desviación estándar está representada por la letra griega **σ (sigma)** para una población y **s** para una muestra.

## Las Fórmulas

### Desviación Estándar de la Población (σ)
Úsela cuando tenga datos de una **población completa** (todos los miembros posibles del grupo que está estudiando).

$$
\sigma = \sqrt{\frac{\sum_{i=1}^{N}(x_i - \mu)^2}{N}}
$$

### Desviación Estándar de la Muestra (s)
Úsela cuando sus datos sean una **muestra extraída de una población más grande**.

$$
s = \sqrt{\frac{\sum_{i=1}^{n}(x_i - \bar{x})^2}{n-1}}
$$

**La diferencia fundamental:** La fórmula de muestra divide por **(n − 1)** en lugar de **n**. Esto se llama **corrección de Bessel**.

## Guía Paso a Paso: Ejemplo Resuelto

**Conjunto de datos: [4, 7, 13, 2, 1]** (Trátelo como una muestra, n = 5)

### Paso 1: Calcule la Media
$$
\bar{x} = \frac{4 + 7 + 13 + 2 + 1}{5} = 5.4
$$

### Paso 2: Encuentre cada desviación de la media
$$ (4 - 5.4) = -1.4, (7 - 5.4) = 1.6, (13 - 5.4) = 7.6, (2 - 5.4) = -3.4, (1 - 5.4) = -4.4 $$

### Paso 3: Cuadre cada desviación
$$ 1.96, 2.56, 57.76, 11.56, 19.36 $$

### Paso 4: Sume las desviaciones al cuadrado
$$ 1.96 + 2.56 + 57.76 + 11.56 + 19.36 = \textbf{93.2} $$

### Paso 5: Divida por (n − 1) para la varianza muestral
$$ s^2 = \frac{93.2}{4} = \textbf{23.3} $$

### Paso 6: Tome la raíz cuadrada
$$ s = \sqrt{23.3} \approx \textbf{4.83} $$

**Interpretación:** El valor promedio en este conjunto de datos es 5.4, y un punto de datos típico se desvía de esa media en aproximadamente **±4.83 unidades**.

## La Regla Empírica (Regla 68-95-99.7)
Para conjuntos de datos que siguen una distribución normal (curva de campana):
- **μ ± 1σ:** 68.27% de los valores
- **μ ± 2σ:** 95.45% de los valores
- **μ ± 3σ:** 99.73% de los valores

## Preguntas Frecuentes

**¿Por qué la desviación estándar es más útil que la varianza?**
La varianza está en unidades al cuadrado. La desviación estándar devuelve la dispersión a la unidad de medida original, haciéndola directamente comparable a la media.

**¿Puede la desviación estándar ser cero o negativa?**
Puede ser cero (si todos los valores son idénticos), pero nunca puede ser negativa.
