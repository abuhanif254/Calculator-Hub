---
title: "Calculadora de Media – Media Aritmética, Ponderada, Geométrica y Armónica"
metaTitle: "Calculadora de Media: Aritmética, Ponderada y Geométrica"
description: "Calcule la media aritmética, ponderada, geométrica, armónica y cuadrática con soluciones paso a paso. Descubra qué promedio aplicar según la naturaleza de sus datos."
metaDescription: "Calcule la media aritmética, ponderada, geométrica, armónica y cuadrática paso a paso. Incluye desigualdad MA-MG-MH, ejemplos financieros y tablas."
metaKeywords: "calculadora de media, media aritmetica, media ponderada, media geometrica, media armonica, media cuadratica, promedio estadistico, estadistica descriptiva"
faqs:
  - question: "¿En qué se diferencian la media aritmética, la media geométrica y la media armónica?"
    answer: "La media aritmética suma las observaciones y divide entre el total, resultando ideal para magnitudes aditivas. La media geométrica multiplica los valores y extrae la raíz enésima, captando tasas de crecimiento compuesto. La media armónica es el inverso del promedio de los inversos y promedia con exactitud razones y velocidades sobre distancias o cantidades iguales."
  - question: "¿Por qué debe utilizarse la media geométrica en rentabilidades financieras compuestas?"
    answer: "Porque los rendimientos porcentuales se acumulan multiplicativamente periodo tras periodo sobre el capital anterior. Cuando existe volatilidad, la media aritmética siempre sobrestima la tasa de crecimiento anual compuesta (TCAC) real, mientras que la media geométrica aplicada a los factores de crecimiento (1 + r) reproduce exactamente el capital final."
  - question: "¿Por qué la media armónica ofrece la velocidad media exacta en un recorrido de ida y vuelta?"
    answer: "Al recorrer distancias idénticas a velocidades distintas, se emplea más tiempo en el tramo lento que en el tramo rápido. La media armónica pondera automáticamente cada velocidad según el tiempo real dedicado a cada segmento, mientras que la media aritmética asume erróneamente duraciones idénticas."
  - question: "¿Se puede calcular la media geométrica o la armónica si existen ceros o valores negativos?"
    answer: "Ambas medias clásicas exigen números reales estrictamente positivos (x > 0). En la media geométrica un solo cero anula todo el producto y un número negativo puede generar raíces complejas; en la media armónica dividir entre cero es indefinido. Para rentabilidades negativas, convierta cada tasa r en su factor positivo (1 + r) antes de calcular la media geométrica."
  - question: "¿Qué demuestra la desigualdad clásica entre las medias pitagóricas (MA >= MG >= MH)?"
    answer: "Para cualquier serie de números reales positivos, la media aritmética (MA) es siempre mayor o igual que la media geométrica (MG), y esta a su vez mayor o igual que la media armónica (MH). Las tres coinciden exclusivamente cuando todos los valores del conjunto son iguales entre sí."
---

En el uso cotidiano, hablar de «promedio» suele asociarse únicamente con la media aritmética simple. Sin embargo, aplicar un promedio aditivo sin ponderar introduce distorsiones importantes en finanzas, ingeniería, física y ciencia de datos. Según si las observaciones se suman linealmente, se capitalizan de forma multiplicativa periodo tras periodo, expresan tasas por unidad o conllevan pesos desiguales, cada escenario requiere una media distinta para hallar su verdadero centro estadístico.

Las medias aritmética, geométrica y armónica conforman las tres **medias pitagóricas** clásicas. Al sumar la media ponderada, la media cuadrática y la media recortada, el analista dispone de herramientas exactas para calificaciones académicas, tasas anuales equivalentes (TAE y TCAC), señales eléctricas alternas y econometría resistente a extremos.

## Fórmulas de los Principales Tipos de Media

Cada formulación conserva una propiedad algebraica concreta sobre un conjunto de $n$ observaciones $\{x_1, x_2, \dots, x_n\}$.

### 1. Media Aritmética ($MA$, $\bar{x}$ o $\mu$)

Preserva la suma total del conjunto ($n\bar{x} = \sum x_i$), ideal para magnitudes aditivas e independientes:

$$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i = \frac{x_1 + x_2 + \dots + x_n}{n}$$

### 2. Media Ponderada ($\bar{x}_w$)

Escala cada observación según su peso, frecuencia o capital asignado $w_i$:

$$\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}$$

### 3. Media Geométrica ($MG$)

Preserva el producto de valores positivos ($MG^n = \prod x_i$); en series extensas se evalúa con logaritmos neperianos para evitar desbordamientos numéricos:

$$MG = \left( \prod_{i=1}^{n} x_i \right)^{\frac{1}{n}} = \exp\left( \frac{1}{n} \sum_{i=1}^{n} \ln(x_i) \right)$$

### 4. Media Armónica ($MH$)

Se define como el recíproco de la media aritmética de los inversos para datos positivos ($x_i > 0$):

$$MH = \frac{n}{\sum_{i=1}^{n} \frac{1}{x_i}}$$

### 5. Media Cuadrática ($MC$ o $RMS$)

Empleada en tensión eficaz de corriente alterna y error cuadrático medio, preserva la magnitud cuadrática:

$$MC = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_i^2}$$

### Definición de Variables

* **$x_i$**: Cada observación numérica de la muestra o población.
* **$n$**: Número total de observaciones analizadas.
* **$w_i$**: Peso o frecuencia no negativa asignada a $x_i$.
* **$\prod_{i=1}^{n}$ y $\ln(x_i)$**: Operador productorio de los $n$ términos y logaritmo natural para $x_i > 0$.

## Jerarquía Potencial y Arrastre por Volatilidad

Las cuatro medias anteriores integran la familia de medias potenciales $M_p = \left(\frac{1}{n}\sum x_i^p\right)^{1/p}$ ($p=2$ cuadrática, $p=1$ aritmética, $p\to 0$ geométrica y $p=-1$ armónica). Para cualquier serie de números reales positivos rige siempre la desigualdad:

$$MC \ge MA \ge MG \ge MH$$

La igualdad ocurre únicamente cuando todos los valores son idénticos. A mayor varianza, mayor resulta la distancia entre $MA$ y $MG$ —efecto conocido en finanzas como **arrastre por volatilidad** ($MG \approx MA - \frac{\sigma^2}{2}$)—, lo que explica por qué dos carteras con igual rendimiento aritmético acumulan patrimonios finales distintos.

## Ejemplos Resueltos Paso a Paso con Verificación Aritmética

### Ejemplo 1: Comparación de $MA$, $MG$ y $MH$ en Serie Exponencial

Analicemos cinco mediciones crecientes: **$\{4, 8, 16, 32, 64\}$**.

1. **Media aritmética ($MA$)**:
   $$\bar{x} = \frac{4 + 8 + 16 + 32 + 64}{5} = \frac{124}{5} = 24,80$$
2. **Media geométrica ($MG$)**:
   Expresando cada número como potencia de $2$ ($2^2, 2^3, 2^4, 2^5, 2^6$):
   $$MG = (4 \times 8 \times 16 \times 32 \times 64)^{\frac{1}{5}} = \left(2^{20}\right)^{\frac{1}{5}} = 2^4 = 16,00$$
3. **Media armónica ($MH$)**:
   Sumando las fracciones con denominador común $64$:
   $$MH = \frac{5}{\frac{1}{4} + \frac{1}{8} + \frac{1}{16} + \frac{1}{32} + \frac{1}{64}} = \frac{5}{\frac{31}{64}} = \frac{320}{31} \approx 10,3226$$

Se verifica exactamente el ordenamiento pitagórico: $24,80 > 16,00 > 10,3226$.

### Ejemplo 2: Rentabilidad Compuesta en Euros y Velocidad Media

Una cartera de $10.000\text{ €}$ gana $+50\%$ el primer año ($15.000\text{ €}$) y pierde $-50\%$ el segundo año ($7.500\text{ €}$). La media aritmética indica $0,00\%$, ocultando una pérdida real del $25\%$. Al usar factores de crecimiento $(1 + r_i)$ iguales a $1,50$ y $0,50$:

$$MG_{\text{anual}} = \sqrt{1,50 \times 0,50} - 1 = \sqrt{0,75} - 1 \approx -13,40\%\text{ anual}$$

Al capitalizar $10.000 \times 0,75 = 7.500\text{ €}$ se comprueba el saldo final exacto. Igualmente, un vehículo que recorre $120\text{ km}$ a $40\text{ km/h}$ ($3\text{ h}$) y regresa $120\text{ km}$ a $60\text{ km/h}$ ($2\text{ h}$) promedia $MH = \frac{2}{\frac{1}{40} + \frac{1}{60}} = 48,0\text{ km/h}$ ($240\text{ km} / 5\text{ h}$), y no los $50\text{ km/h}$ erróneos de la media aritmética.

## Tabla de Referencia: Qué Media Elegir

| Tipo de Media | Fórmula | Dominio | Ante Atípicos | Uso Recomendado |
| :--- | :--- | :--- | :--- | :--- |
| **Aritmética ($MA$)** | $\frac{1}{n}\sum x_i$ | $\mathbb{R}$ | Sensible | Mediciones físicas, presupuestos |
| **Ponderada ($\bar{x}_w$)** | $\frac{\sum w_i x_i}{\sum w_i}$ | $x_i \in \mathbb{R},\ w_i \ge 0$ | Según pesos | Notas con créditos, coste de capital |
| **Geométrica ($MG$)** | $\left(\prod x_i\right)^{1/n}$ | $x_i > 0$ | Atenúa picos | Rentabilidades compuestas (TCAC), índices |
| **Armónica ($MH$)** | $\frac{n}{\sum (1/x_i)}$ | $x_i > 0$ | Pesa mínimos | Velocidades iguales distancias, múltiplos PER |
| **Cuadrática ($MC$)** | $\sqrt{\frac{1}{n}\sum x_i^2}$ | $\mathbb{R}$ | Amplifica extremos | Corriente alterna, error cuadrático (RECM) |
| **Recortada** | $MA$ sin $k\%$ extremo | $\mathbb{R}$ | Robusta | Puntuaciones de jurados, tasas de referencia |

## Errores Frecuentes y Buenas Prácticas

* **Promediar tasas sobre bases distintas sin ponderar**: Un margen comercial del $20\%$ sobre ventas de $10.000\text{ €}$ y otro del $10\%$ sobre $90.000\text{ €}$ arrojan un margen combinado ponderado del $11\%$ ($\frac{2.000 + 9.000}{100.000}$), nunca del $15\%$.
* **Usar media aritmética en retornos secuenciales**: Para evaluar fondos o préstamos multiperiodo, convierta cada rendimiento a su factor $(1 + r_i)$ y utilice la media geométrica o la TAE equivalente.
* **Verificar funciones en hojas de cálculo**: En Excel en español use `PROMEDIO`, `MEDIA.GEOM`, `MEDIA.ARMO`, `MEDIA.ACOTADA` y `SUMAPRODUCTO(datos;pesos)/SUMA(pesos)`; introducir un cero o un negativo en `MEDIA.GEOM` o `MEDIA.ARMO` devuelve el error `#¡NUM!`.
* **Vigilar distribuciones muy asimétricas**: En salarios, facturas o precios inmobiliarios, complemente la media aritmética con la mediana o con una media recortada al $5\%$ o $10\%$.
