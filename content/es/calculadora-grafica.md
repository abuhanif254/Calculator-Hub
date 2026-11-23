---
title: "Calculadora Gráfica"
metaTitle: "Calculadora Gráfica en Línea | Graficar Funciones 2D"
description: "Traza y analiza funciones algebraicas, trigonométricas, exponenciales y logarítmicas en el plano cartesiano con detección de raíces e intersecciones."
metaDescription: "Grafica funciones matemáticas en línea gratis. Visualiza ecuaciones polinómicas, trigonométricas y exponenciales, puntos críticos e intersecciones en 2D."
metaKeywords: "calculadora grafica, graficar funciones en linea, plano cartesiano, representar ecuaciones, raices de una funcion, vertice parabola, asintotas"
faqs:
  - question: "¿Cómo debo escribir potencias, raíces y fracciones en la calculadora gráfica?"
    answer: "Utiliza el símbolo de acento circunflejo (^) para los exponentes, por ejemplo x^2 para equis al cuadrado. Para raíces cuadradas emplea sqrt(x), y encierra siempre entre paréntesis el numerador y el denominador de las expresiones racionales, como (x+1)/(x-2), para respetar la jerarquía de operaciones."
  - question: "¿En qué unidad angular se evalúan las funciones trigonométricas como sin(x) y cos(x)?"
    answer: "En el análisis matemático y en las calculadoras gráficas estándar, las funciones trigonométricas se evalúan en radianes. Por ello, un ciclo completo de sin(x) o cos(x) tiene un período de 2π (aproximadamente 6,2832 unidades en el eje X) en lugar de 360 unidades."
  - question: "¿Cómo puedo encontrar visualmente la solución de un sistema de dos ecuaciones?"
    answer: "Introduce ambas funciones simultáneamente en el graficador, por ejemplo f(x) y g(x). Los puntos exactos donde las dos curvas se cruzan en el plano cartesiano poseen coordenadas (x, y) que satisfacen ambas ecuaciones al mismo tiempo, representando las soluciones reales del sistema."
  - question: "¿Por qué una función logarítmica o una raíz cuadrada aparece cortada en una parte del gráfico?"
    answer: "Porque el trazado refleja el dominio real de definición de la función. La raíz cuadrada sqrt(x) solo existe en los números reales para x ≥ 0, mientras que el logaritmo natural ln(x) solo está definido para valores estrictamente positivos (x > 0) y presenta una asíntota vertical en x = 0."
  - question: "¿Cómo afectan los límites de los ejes X e Y a la forma visual de una curva?"
    answer: "Si el rango numérico del eje Y es mucho mayor o menor que el del eje X, la proporción geométrica se comprime o estira visualmente. Para apreciar pendientes de 45 grados o curvas simétricas sin distorsión óptica, ajusta los límites mínimo y máximo de ambos ejes a intervalos equivalentes."
---

Representar una función matemática $y = f(x)$ sobre el plano cartesiano bidimensional convierte expresiones algebraicas abstractas en trayectorias geométricas claras. Al visualizar el comportamiento continuo de una curva a lo largo del eje de abscisas ($X$) y del eje de ordenadas ($Y$), es posible identificar de inmediato su dominio de existencia, sus raíces o ceros, los intervalos de crecimiento y decrecimiento, los extremos relativos y el comportamiento asintótico.

Nuestra **Calculadora Gráfica** permite trazar y superponer múltiples funciones polinómicas, racionales, irracionales, trigonométricas, exponenciales y logarítmicas en tiempo real, ajustando la ventana $[x_{\min}, x_{\max}] \times [y_{\min}, y_{\max}]$ para inspeccionar la curva y sus intersecciones.

## Fundamentos Matemáticos del Trazado de Funciones en el Plano Cartesiano

El motor de representación evalúa la expresión simbólica $f(x)$ mediante un muestreo continuo del intervalo horizontal $[x_{\min}, x_{\max}]$ con paso $\Delta x$, generando pares ordenados $(x_i, y_i)$ donde $y_i = f(x_i)$. Para predecir la geometría de cualquier curva al graficarla, destacan tres formulaciones analíticas:

### 1. Ecuación General de Transformación de Funciones
A partir de una función elemental base $f(x)$ (como $x^2$, $\sqrt{x}$, $\sin(x)$ o $e^x$), cualquier modificación de sus parámetros geométricos responde a:

$$y = a \cdot f\bigl(b(x - h)\bigr) + k$$

Donde cada parámetro produce un efecto específico sobre el plano:
* **$a$ (Escala vertical y reflexión):** Si $|a| > 1$, estira la gráfica verticalmente; si $0 < |a| < 1$, la comprime. Si $a < 0$, invierte la curva respecto al eje $X$.
* **$b$ (Escala horizontal y frecuencia):** Si $|b| > 1$, comprime la curva horizontalmente; si $0 < |b| < 1$, la dilata. En funciones periódicas como $\sin(bx)$ o $\cos(bx)$, define el período mediante $T = \frac{2\pi}{|b|}$.
* **$h$ (Traslación horizontal o desfase):** Desplaza la gráfica $h$ unidades hacia la derecha si $h > 0$, o $|h|$ hacia la izquierda si $h < 0$.
* **$k$ (Traslación vertical):** Eleva la gráfica $k$ unidades hacia arriba si $k > 0$, o la desciende $|k|$ hacia abajo si $k < 0$.

### 2. Puntos Notables de una Función Cuadrática ($f(x) = ax^2 + bx + c$)
Las funciones de segundo grado describen una parábola cuyo extremo absoluto (mínimo si $a > 0$, máximo si $a < 0$) es el **vértice** $V(x_v, y_v)$, mientras que sus **raíces** ($y = 0$) dependen del discriminante $\Delta = b^2 - 4ac \ge 0$:

$$x_v = -\frac{b}{2a}, \quad y_v = c - \frac{b^2}{4a}, \quad x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### 3. Intersección Geométrica entre Dos Curvas
Dados dos modelos funcionales $y = f(x)$ e $y = g(x)$, sus puntos de cruce $(x_c, y_c)$ corresponden a las soluciones reales de la ecuación $f(x) - g(x) = 0$.

## Ejemplo Resuelto Paso a Paso: Análisis y Cruce de una Parábola con una Recta

Analicemos la función cuadrática **$f(x) = 2x^2 - 8x + 6$** y sus puntos de intersección con la recta **$g(x) = 2x - 2$**.

1. **Intersección vertical ($Y$):** Evaluando en $x = 0$, obtenemos $f(0) = 6 \implies (0, 6)$ y $g(0) = -2 \implies (0, -2)$.
2. **Raíces de la parábola (eje $X$):** Igualamos $2x^2 - 8x + 6 = 0$. Con $a = 2$, $b = -8$ y $c = 6$, el discriminante es $\Delta = (-8)^2 - 4(2)(6) = 16$:
   $$x = \frac{8 \pm \sqrt{16}}{4} = \frac{8 \pm 4}{4} \implies x_1 = 1, \quad x_2 = 3$$
   La parábola corta al eje horizontal en **$(1, 0)$** y **$(3, 0)$**.
3. **Coordenadas del vértice:** Como $a = 2 > 0$, la parábola abre hacia arriba. Sus coordenadas son $x_v = 8/4 = 2$ e $y_v = 2(2)^2 - 8(2) + 6 = -2$, situando el mínimo absoluto en **$V(2, -2)$**.
4. **Intersección entre ambas funciones ($f(x) = g(x)$):**
   $$2x^2 - 8x + 6 = 2x - 2 \implies 2x^2 - 10x + 8 = 0 \implies (x - 1)(x - 4) = 0$$
   Las soluciones son $x = 1$ y $x = 4$. Sustituyendo en $g(x)$ obtenemos $g(1) = 0$ y $g(4) = 6$, cruzándose en **$(1, 0)$** y **$(4, 6)$**.

## Tabla de Referencia: Familias de Funciones, Sintaxis y Propiedades

Guía de sintaxis y geometría para las funciones más habituales:

| Familia | Expresión | Sintaxis | Dominio Real | Rasgos Geométricos Principales |
| :--- | :--- | :--- | :--- | :--- |
| **Lineal** | $f(x) = mx + b$ | `2*x - 3` | $(-\infty, \infty)$ | Recta con pendiente $m$ y corte en $(0, b)$. |
| **Cuadrática** | $f(x) = ax^2 + bx + c$ | `2*x^2 - 8*x + 6` | $(-\infty, \infty)$ | Parábola con vértice en $x_v = -b/(2a)$. |
| **Racional** | $f(x) = 1/(x - a)$ | `1/(x - 2)` | $\mathbb{R} \setminus \{a\}$ | Asíntota vertical $x = a$ y horizontal $y = 0$. |
| **Radical** | $f(x) = \sqrt{x - a}$ | `sqrt(x - 1)` | $[a, \infty)$ | Semiparábola que nace en $(a, 0)$. |
| **Exponencial** | $f(x) = e^{kx}$ | `exp(0.5*x)` | $(-\infty, \infty)$ | Crecimiento rápido, corta en $(0, 1)$. |
| **Logarítmica** | $f(x) = \ln(x)$ | `ln(x)` | $(0, \infty)$ | Corta en $(1, 0)$ con asíntota vertical $x = 0$. |
| **Sinusoidal** | $f(x) = A\sin(bx)$ | `3*sin(2*x)` | $(-\infty, \infty)$ | Onda entre $[-A, A]$ con período $T = 2\pi/|b|$. |

## Recomendaciones de Uso y Errores Frecuentes al Graficar Ecuaciones

* **Omisión de paréntesis en denominadores y exponentes:** Para graficar $f(x) = \frac{x + 4}{x - 3}$, escribe `(x + 4) / (x - 3)`. Si introduces `x + 4 / x - 3`, la jerarquía algebraica dividirá solo `4/x`, trazando $x + \frac{4}{x} - 3$. Igualmente, escribe `e^(2*x)` en lugar de `e^2*x`.
* **Escala en radianes frente a grados:** Si introduces `sin(x)` con un eje $x \in [-360, 360]$, verás más de $114$ oscilaciones comprimidas porque $x$ se evalúa en radianes ($2\pi \approx 6,2832\text{ rad}$ por ciclo). Ajusta el eje $X$ al intervalo $[-6,5, \; 6,5]$ para visualizar dos ondas limpias.
* **Interpretación de asíntotas verticales:** En funciones donde el denominador se anula, como $\tan(x)$ en $x = \frac{\pi}{2}$ o $f(x) = \frac{1}{x - 2}$ en $x = 2$, la ordenada diverge hacia $\pm\infty$, por lo que la curva no es continua ni corta a la recta vertical $x = a$.
