---
title: "Calculadora de Mediana – Encuentre la Mediana con Soluciones Paso a Paso"
metaTitle: "Calculadora de Mediana, Cuartiles, RIC y Cinco Números"
description: "Calcule la mediana, los cuartiles (Q1 y Q3), el rango intercuartílico (RIC) y el resumen de cinco números para datos impares, pares y agrupados paso a paso."
metaDescription: "Calcule la mediana, cuartiles, rango intercuartílico (RIC) y valores atípicos paso a paso. Incluye fórmulas para datos pares, impares y agrupados."
metaKeywords: "calculadora de mediana, calcular mediana, cuartiles q1 q3, rango intercuartilico, resumen de cinco numeros, diagrama de caja, valores atipicos, datos agrupados"
faqs:
  - question: "¿Cómo se calcula la mediana cuando la muestra tiene un número par de datos?"
    answer: "Primero ordene todos los valores de menor a mayor. Cuando el tamaño n es par no existe un único dato central; en su lugar, se identifican los dos valores centrales situados en las posiciones n/2 y (n/2) + 1, se suman y se dividen entre 2 para hallar su promedio aritmético."
  - question: "¿Por qué los economistas utilizan la renta mediana en lugar del ingreso medio?"
    answer: "Las distribuciones de ingresos y patrimonio presentan una fuerte asimetría positiva: una minoría de rentas muy elevadas arrastra la media aritmética muy por encima de lo que gana un hogar típico. La mediana señala exactamente el percentil 50 y permanece inalterada aunque los ingresos del extremo superior se dupliquen o tripliquen."
  - question: "¿Qué significa que la mediana posea un punto de ruptura del 50 %?"
    answer: "En estadística robusta, el punto de ruptura indica qué proporción máxima de observaciones puede corromperse hacia valores arbitrariamente extremos antes de que el estimador pierda validez. Hasta casi la mitad de una muestra puede alterarse hacia un extremo sin desplazar la mediana fuera del núcleo central, mientras que la media aritmética tiene un punto de ruptura del 0 %."
  - question: "¿Cómo se relacionan la mediana, los cuartiles y el rango intercuartílico (RIC)?"
    answer: "Los cuartiles dividen una serie ordenada en cuatro bloques del 25 % cada uno. El primer cuartil (Q1) es la mediana de la mitad inferior (percentil 25), el segundo cuartil (Q2) coincide con la mediana general (percentil 50) y el tercer cuartil (Q3) es la mediana de la mitad superior (percentil 75). El rango intercuartílico (RIC = Q3 - Q1) mide la amplitud del 50 % central de los datos."
  - question: "¿Es posible calcular la mediana de una variable categórica nominal?"
    answer: "No. Para hallar la mediana resulta imprescindible que las observaciones admitan una ordenación ascendente o descendente con sentido lógico. Por ello se calcula en variables de intervalo, de razón y ordinales (como valoraciones del 1 al 5), pero nunca en categorías nominales sin jerarquía (como colores o nacionalidades)."
---

La **mediana** ($\tilde{x}$ o $Q_2$) es el centro posicional de una distribución: el valor exacto que divide una serie ordenada en un $50\%$ inferior y un $50\%$ superior. A diferencia de la media aritmética, que pondera cada dato según su magnitud, la mediana depende exclusivamente de su rango ordenado, convirtiéndose en el estimador robusto clave en economía, valoración inmobiliaria y latencia de sistemas.

Cuando una serie presenta fuerte asimetría o valores atípicos extremos, la media aritmética se desplaza hacia la cola larga y deja de reflejar el caso típico. Anclada junto al primer y tercer cuartil ($Q_1$ y $Q_3$), la mediana ofrece un resumen fiel de posición central y dispersión no paramétrica.

## Fórmulas para Datos No Agrupados y Agrupados

Antes de calcular la mediana, toda muestra $\{x_1, \dots, x_n\}$ debe clasificarse en orden no decreciente:

$$x_{(1)} \le x_{(2)} \le x_{(3)} \le \dots \le x_{(n)}$$

donde $x_{(1)}$ es el mínimo y $x_{(n)}$ el máximo.

### 1. Número Impar de Datos ($n$ impar)

Un único valor ocupa la posición central exacta $k = \frac{n + 1}{2}$:

$$\text{Mediana } (\tilde{x}) = x_{\left(\frac{n + 1}{2}\right)}$$

### 2. Número Par de Datos ($n$ par)

La mediana es el promedio aritmético de los dos estadísticos centrales en $\frac{n}{2}$ y $\frac{n}{2} + 1$:

$$\text{Mediana } (\tilde{x}) = \frac{x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2} + 1\right)}}{2}$$

### 3. Mediana en Datos Agrupados por Intervalos

Se interpola linealmente dentro de la **clase mediana** (primer intervalo cuya frecuencia acumulada alcanza o supera $\frac{N}{2}$):

$$\text{Mediana} = L_i + \left( \frac{\frac{N}{2} - F_{i-1}}{f_i} \right) \times a$$

### Definición de Variables

* **$x_{(k)}$**: Valor situado en la posición $k$ tras la ordenación ascendente.
* **$n$ o $N$**: Total de observaciones de la serie.
* **$L_i$ y $a$**: Límite inferior exacto y amplitud de la clase mediana.
* **$F_{i-1}$ y $f_i$**: Frecuencia acumulada previa y frecuencia absoluta de la clase mediana.

## Cuartiles, Rango Intercuartílico ($RIC$) y Vallas de Tukey

John Tukey definió el **resumen de cinco números** —Mínimo, $Q_1$, $Q_2$, $Q_3$ y Máximo— como base del diagrama de caja y bigotes:

* **$Q_1$ (percentil 25)** y **$Q_3$ (percentil 75)**: Medianas de las mitades inferior y superior.
* **$Q_2$ (percentil 50)**: Mediana global $\tilde{x}$.
* **Rango intercuartílico ($RIC = Q_3 - Q_1$)**: Amplitud del $50\%$ central.

A partir del $RIC$ se fijan las **vallas de Tukey** para detectar valores atípicos sin suponer normalidad:

$$\text{Límite inferior} = Q_1 - 1,5 \times RIC, \qquad \text{Límite superior} = Q_3 + 1,5 \times RIC$$

Asimismo, la **desviación mediana absoluta** ($DMA = \text{mediana}(|x_i - \tilde{x}|)$) mide la dispersión típica con inmunidad ante extremos.

## Ejemplos Resueltos Paso a Paso con Verificación Aritmética

### Ejemplo 1: Muestra Impar, Muestra Par y Detección de Atípicos

Un tasador registra $n = 9$ ventas residenciales (en miles de euros, $\text{mil €}$):

$$\text{Precios} = \{310, 275, 340, 290, 1.450, 325, 280, 360, 300\}$$

1. **Ordenación**: $\{275, 280, 290, 300, 310, 325, 340, 360, 1.450\}$.
2. **Mediana impar ($n = 9$)**: En $k = \frac{9 + 1}{2} = 5$, $\tilde{x} = x_{(5)} = 310\text{ mil €}$. Frente a ella, la media aritmética es $\bar{x} = \frac{3.930}{9} \approx 436,67\text{ mil €}$, arrastrada por la propiedad de $1.450\text{ mil €}$ por encima de ocho de las nueve casas.
3. **Cuartiles ($Q_1, Q_3$), $RIC$ y límite atípico (mitades exclusivas)**:
   * Mitad inferior $\{275, 280, 290, 300\} \implies Q_1 = \frac{280 + 290}{2} = 285\text{ mil €}$.
   * Mitad superior $\{325, 340, 360, 1.450\} \implies Q_3 = \frac{340 + 360}{2} = 350\text{ mil €}$.
   * $RIC = 350 - 285 = 65\text{ mil €}$ y límite superior $350 + 1,5(65) = 447,5\text{ mil €}$, confirmando que $1.450\text{ mil €}$ es atípico.
4. **Muestra par ($n = 8$, sin el atípico)**: Con $\{275, 280, 290, 300, 310, 325, 340, 360\}$, promediamos las posiciones $4$ y $5$: $\tilde{x}_{\text{par}} = \frac{300 + 310}{2} = 305\text{ mil €}$ (apenas varió $5\text{ mil €}$, mientras la media cayó $126,67\text{ mil €}$).

### Ejemplo 2: Mediana en Tabla de Frecuencias Agrupadas

Con $N = 50$ tiempos de respuesta de servidor (en $\text{ms}$), $18$ registros están por debajo de $40\text{ ms}$ ($F_{i-1} = 18$) y $14$ caen en $[40, 50)\text{ ms}$ ($L_i = 40$, $f_i = 14$, $a = 10$). Como $\frac{N}{2} = 25$ cae en ese tramo:

$$\text{Mediana} = 40 + \left(\frac{25 - 18}{14}\right) \times 10 = 40 + 0,5 \times 10 = 45,0\text{ ms}$$

## Tabla de Referencia: Forma de la Distribución y Centro Óptimo

| Forma de la Distribución | Relación Matemática | Centro Óptimo | Dispersión Óptima | Ejemplos |
| :--- | :--- | :--- | :--- | :--- |
| **Simétrica (normal)** | $\text{Media} = \text{Mediana} = \text{Moda}$ | Media ($\bar{x}$) | Desviación estándar ($s$) | Estatura, tolerancias industriales |
| **Asimétrica positiva** | $\text{Moda} < \text{Mediana} < \text{Media}$ | **Mediana ($\tilde{x}$)** | Rango intercuartílico ($RIC$) | Salarios, vivienda, latencia de red |
| **Asimétrica negativa** | $\text{Media} < \text{Mediana} < \text{Moda}$ | **Mediana ($\tilde{x}$)** | Rango intercuartílico ($RIC$) | Edad de jubilación, exámenes fáciles |
| **Escalas ordinales** | Rango jerárquico no métrico | **Mediana ($\tilde{x}$)** | $RIC$ o rango percentil | Encuestas (1 a 5), escalas clínicas |
| **Colas pesadas (Cauchy)** | Media teórica indefinida | **Mediana ($\tilde{x}$)** | Desviación mediana absoluta | Retornos bursátiles intradía |

## Errores Frecuentes y Matices Metodológicos

* **Olvidar ordenar la serie**: Extraer el elemento intermedio en orden cronológico invalida el cálculo; clasifique siempre de menor a mayor.
* **Criterios de cuartiles distintos**: En Excel en español, `CUARTIL.EXC` excluye la mediana central en muestras impares y genera un $RIC$ ligeramente mayor que `CUARTIL.INC`; use siempre el mismo criterio al comparar series.
* **Confundir mediana de medianas con mediana global**: Promediar o hallar la mediana de subgrupos no reproduce la mediana combinada; una primero todos los registros.
* **Intervalos demasiado amplios en datos agrupados**: La interpolación supone distribución uniforme dentro de la clase mediana; si $a$ es muy ancho, refine las clases.
