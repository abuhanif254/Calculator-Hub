---
title: "Calculadora de Moda – Encuentra Modas Simples, Múltiples y Datos Agrupados"
metaTitle: "Calculadora de Moda | Simple, Bimodal y Datos Agrupados"
description: "Calcula la moda estadística en conjuntos simples, bimodales, multimodales y datos agrupados por intervalos. Genera tablas de frecuencia absoluta, relativa y acumulada al instante."
metaDescription: "Calculadora de moda estadística gratuita en línea. Calcula modas simples, bimodales, multimodales y de datos agrupados con tablas de frecuencia."
metaKeywords: "calculadora de moda, moda estadística, datos agrupados, distribución bimodal, distribución multimodal, tabla de frecuencias, intervalo modal, fórmula de Pearson"
faqs:
  - question: "¿Puede un conjunto de datos no tener moda o presentar varias modas a la vez?"
    answer: "Sí. Si todos los valores distintos de una serie aparecen exactamente el mismo número de veces, la distribución es uniforme o amodal y carece de moda. Si dos valores empatan con la frecuencia máxima por encima del resto, el conjunto es bimodal; cuando empatan tres o más valores, se denomina multimodal."
  - question: "¿Qué suele revelar una distribución bimodal en datos reales?"
    answer: "Una distribución bimodal indica habitualmente que se han mezclado dos subpoblaciones o procesos distintos en una sola muestra. Ejemplos clásicos son los picos de tráfico matutino y vespertino en transporte urbano, las medidas biométricas sin separar por sexo o los importes de compra de clientes particulares frente a empresas."
  - question: "¿Cómo se halla la moda cuando los datos continuos están agrupados en intervalos?"
    answer: "Primero se identifica el intervalo modal, es decir, la clase con mayor frecuencia absoluta o densidad de frecuencia. A continuación se aplica la fórmula de interpolación de Czuber utilizando el límite inferior de esa clase, su amplitud y las frecuencias de las clases inmediatamente anterior y posterior."
  - question: "¿Por qué la moda es la única medida de tendencia central válida para variables nominales?"
    answer: "Las variables cualitativas nominales, como el grupo sanguíneo, la ciudad de residencia o el método de pago, no pueden sumarse para obtener una media ni ordenarse jerárquicamente para ubicar una mediana. Como el conteo de frecuencias solo requiere verificar equivalencia entre categorías, la moda es el único estadístico aplicable."
  - question: "¿Cuándo es fiable estimar la moda mediante la relación empírica de Karl Pearson?"
    answer: "La relación empírica de Pearson (tres veces la mediana menos dos veces la media) ofrece una aproximación razonable únicamente en distribuciones unimodales con asimetría moderada. No debe emplearse en conjuntos bimodales, uniformes o con sesgos extremos, donde puede producir valores muy alejados del pico real."
---

La **moda ($Mo$)** es el valor o la categoría que aparece con mayor frecuencia en una muestra o población, coincidiendo con el máximo de su función de masa o densidad. Mientras la media aritmética calcula un centro de gravedad y la mediana ubica el percentil cincuenta, la moda responde con precisión qué resultado exacto ocurre más veces.

En reposición de inventarios, patronaje industrial y clasificación categórica, ni la media ni la mediana garantizan un valor fabricable: una zapatería no puede producir calzado de «talla 41,28», sino las tallas modales que realmente compran sus clientes. Además, la moda es la única medida de tendencia central válida en las cuatro escalas de Stevens (nominal, ordinal, intervalo y razón). Nuestra **Calculadora de Moda** analiza series discretas, categóricas y agrupadas, detecta automáticamente la modalidad y construye tablas completas de frecuencia absoluta, relativa y acumulada.

## Fórmulas Fundamentales de la Moda Estadística

### 1. Datos No Agrupados (Discretos y Categóricos)

En un conjunto con elementos distintos $x \in S$, frecuencia absoluta $f(x)$ y tamaño $N$, la moda maximiza $f(x)$ siempre que no todos los valores compartan igual conteo:

$$Mo = \arg\max_{x \in S} f(x) \quad \text{si } \max_{x \in S} f(x) > \min_{x \in S} f(x)$$

La tabla de distribución se completa con la frecuencia relativa ($h_i = f_i / N$) y la frecuencia acumulada ($F_i = \sum_{j=1}^{i} f_j$). Si cada valor distinto se repite exactamente las mismas veces ($f(x_i) = c$), la serie es uniforme y **amodal**.

### 2. Datos Agrupados en Intervalos (Interpolación de Czuber)

Para variables continuas organizadas en intervalos de amplitud constante, la **clase modal** concentra la mayor frecuencia ($f_i$) y el pico interior se estima mediante interpolación lineal con las clases vecinas:

$$Mo = L_i + \left( \frac{\Delta_1}{\Delta_1 + \Delta_2} \right) \cdot a = L_i + \left( \frac{f_i - f_{i-1}}{2f_i - f_{i-1} - f_{i+1}} \right) \cdot a$$

### 3. Relación Empírica de Karl Pearson y Signo de la Asimetría

En distribuciones unimodales con asimetría moderada, media ($\bar{x}$), mediana ($\tilde{x}$) y moda guardan una separación estable:

$$Mo \approx 3\tilde{x} - 2\bar{x}$$

En una curva simétrica coinciden $Mo = \tilde{x} = \bar{x}$; en una distribución con sesgo positivo (cola larga a la derecha) suele cumplirse $Mo < \tilde{x} < \bar{x}$, mientras que en sesgo negativo ocurre el orden inverso.

Donde las variables representan:

* **$f(x), h_i, F_i$**: Frecuencia absoluta, frecuencia relativa y frecuencia acumulada.
* **$L_i$ y $a$**: Límite inferior real y amplitud uniforme del intervalo modal.
* **$f_i, f_{i-1}, f_{i+1}$**: Frecuencias de la clase modal, de la clase previa y de la posterior.
* **$\Delta_1, \Delta_2$**: Excesos de frecuencia $\Delta_1 = f_i - f_{i-1}$ y $\Delta_2 = f_i - f_{i+1}$.

## Regímenes de Modalidad

* **Amodal:** Todos los valores distintos registran idéntica frecuencia, como $\{14, 19, 25, 31\}$ o $\{5, 5, 12, 12\}$.
* **Unimodal:** Domina un único máximo bien definido alrededor del cual se concentra la muestra.
* **Bimodal:** Dos valores empatan en la frecuencia máxima, señal frecuente de dos subpoblaciones mezcladas (por ejemplo, consumo eléctrico diurno y nocturno).
* **Multimodal:** Tres o más picos distintos reflejan estacionalidad cíclica o perfiles heterogéneos combinados.

## Ejemplos Prácticos Resueltos Paso a Paso

### Ejemplo 1: Serie Discreta Bimodal en Tallas de Calzado

Una zapatería registra $n = 16$ pares vendidos en tallaje europeo:

$$\{38,\; 39,\; 39,\; 40,\; 40,\; 40,\; 40,\; 41,\; 41,\; 42,\; 42,\; 42,\; 42,\; 43,\; 43,\; 44\}$$

1. **Tabla de frecuencias ($h_i = f_i / 16$):** Tallas $38$ y $44$ ($f = 1$; $6,25\text{ \%}$); tallas $39$, $41$ y $43$ ($f = 2$; $12,50\text{ \%}$); tallas $40$ y $42$ ($f = 4$; $25,00\text{ \%}$).
2. **Moda resultante:** Dos valores empatan con frecuencia máxima $4$, por lo que la distribución es **bimodal** con $Mo = \{40,\; 42\}$.
3. **Lectura operativa:** Media ($\frac{656}{16} = 41,00$) y mediana ($41,00$) señalan la talla $41$, que solo suma el $12,50\text{ \%}$ de ventas; planificar pedidos con el promedio dejaría desabastecidas las dos tallas que concentran el $50\text{ \%}$ de la demanda real.

### Ejemplo 2: Interpolación en Datos Agrupados

Un servicio de reparto clasifica $N = 120$ tiempos de entrega en cinco clases de amplitud $a = 10\text{ min}$: $[10, 20)$ con $f = 14$, $[20, 30)$ con $f_{i-1} = 28$, $[30, 40)$ con $f_i = 46$ (clase modal), $[40, 50)$ con $f_{i+1} = 22$ y $[50, 60]$ con $f = 10$.

1. **Parámetros:** $L_i = 30$, $a = 10$, $\Delta_1 = 46 - 28 = 18$ y $\Delta_2 = 46 - 22 = 24$.
2. **Cálculo:**
   $$Mo = 30 + \left( \frac{18}{18 + 24} \right) \times 10 = 30 + \frac{180}{42} \approx \mathbf{34,29\text{ min}}$$

El pico queda por debajo de la marca de clase ($35\text{ min}$) porque el intervalo previo ($28$) pesa más que el posterior ($22$), desplazando la moda hacia el límite inferior.

## Comparativa: Moda, Mediana y Media

| Propiedad Estadística | Moda ($Mo$) | Mediana ($\tilde{x}$) | Media ($\bar{x}$) |
| :--- | :--- | :--- | :--- |
| **Escalas válidas** | **Nominal**, ordinal, intervalo y razón | Ordinal, intervalo y razón | Intervalo y razón |
| **Unicidad** | $0$, $1$, $2$ o varias modas | Siempre única | Siempre única |
| **Valor observado** | Sí (en datos discretos) | Sí si $n$ es impar | Rara vez coincide |
| **Sensibilidad a atípicos** | **Nula** | Muy baja ($50\text{ \%}$) | Alta |
| **Uso principal** | Tallas, categorías y mezclas | Ingresos y precios sesgados | Inferencia y regresión |

## Errores Frecuentes y Criterios de Interpretación

* **Confundir la frecuencia con la moda:** En el primer ejemplo la moda no es $4$ (el número de repeticiones), sino las tallas $40$ y $42$ que alcanzan ese máximo.
* **Aplicar Czuber con clases de amplitud desigual:** Si los intervalos difieren en ancho, calcula primero la densidad de frecuencia ($d_i = f_i / a_i$) para identificar correctamente la clase modal.
* **Reportar modas casuales en datos continuos sin agrupar:** Con muchos decimales, una coincidencia aislada carece de valor analítico; agrupa en intervalos consistentes o emplea estimación de densidad por núcleo.
* **Forzar la fórmula de Pearson en muestras bimodales:** La aproximación $3\tilde{x} - 2\bar{x}$ falla con dos picos o colas extremas; segmenta primero los subgrupos antes de resumir la tendencia central.
