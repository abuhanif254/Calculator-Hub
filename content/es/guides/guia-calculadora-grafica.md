---
title: "Graficando Funciones: Parábolas y Pendientes"
description: "Guía técnica sobre representación gráfica de funciones lineales y cuadráticas: pendiente, ordenada al origen, vértice de la parábola, discriminante y análisis de intersecciones."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "graphing-calculator"
faqs:
  - question: "¿Qué diferencia geométrica existe entre una pendiente positiva, negativa, nula e indefinida?"
    answer: "Una pendiente positiva (m > 0) indica que la recta asciende de izquierda a derecha; una pendiente negativa (m < 0) desciende en ese mismo sentido. Cuando m = 0, la recta es completamente horizontal (y = b) porque la variable dependiente no cambia al variar x. En cambio, una recta vertical (x = c) tiene pendiente indefinida, ya que el desplazamiento horizontal Δx es cero y la división por cero no existe en los números reales."
  - question: "¿Cómo se determina si una parábola tiene un valor máximo o un valor mínimo?"
    answer: "El signo del coeficiente cuadrático 'a' en f(x) = a·x² + b·x + c define la concavidad de la parábola. Si a > 0, las ramas se abren hacia arriba y el vértice corresponde al punto mínimo global de la función. Si a < 0, las ramas se abren hacia abajo y el vértice representa el punto máximo global."
  - question: "¿Qué indica el discriminante en una ecuación cuadrática al graficarla?"
    answer: "El discriminante Δ = b² − 4ac revela cuántas veces corta la parábola al eje horizontal (eje x). Si Δ > 0, existen dos intersecciones reales distintas; si Δ = 0, la parábola toca el eje x en un único punto que coincide exactamente con su vértice; si Δ < 0, la curva no cruza el eje x y sus raíces pertenecen al conjunto de los números complejos."
  - question: "¿Por qué la forma canónica f(x) = a·(x − h)² + k invierte el signo aparente de h?"
    answer: "Porque el parámetro h mide el desplazamiento horizontal respecto al origen para anular el término cuadrático: cuando x = h, el binomio (x − h) vale cero y la función alcanza su extremo k. Así, en f(x) = (x − 3)² + 2, el vértice está en x = +3 (desplazado 3 unidades a la derecha), mientras que en (x + 3)² + 2 está en x = −3 (3 unidades a la izquierda)."
  - question: "¿Cómo saber si dos rectas graficadas son paralelas o perpendiculares sin medir ángulos?"
    answer: "Basta con comparar sus pendientes cuando ambas ecuaciones están en la forma y = m·x + b. Dos rectas no verticales son paralelas si poseen exactamente la misma pendiente (m₁ = m₂) y distinta ordenada al origen (b₁ ≠ b₂). Son perpendiculares entre sí cuando el producto de sus pendientes es igual a menos uno (m₁ × m₂ = −1), es decir, cuando una es el inverso negativo de la otra."
---

La representación gráfica traduce una regla algebraica `y = f(x)` en una curva sobre el plano cartesiano `(x, y)`, permitiendo evaluar visualmente tasas de cambio, intersecciones con los ejes y extremos locales. Mientras las funciones lineales describen relaciones de variación constante mediante rectas, las funciones cuadráticas generan parábolas que modelan aceleraciones, trayectorias y procesos de optimización.

Interpretar sus parámetros analíticos evita depender de tablas extensas de valores y permite anticipar el trazo de cualquier ecuación. Con nuestra [Calculadora Gráfica](/es/calculadoras/calculadora-grafica) puede superponer funciones, localizar raíces reales y verificar vértices o puntos de corte con precisión numérica.

## Ecuaciones lineales, pendiente y ordenada al origen

Toda función lineal de primer grado traza una línea recta cuya forma estándar más práctica es la **pendiente-ordenada al origen**:

```text
y = m·x + b
```

Aquí `x` es la variable independiente, `y` la variable dependiente y `m` la **pendiente**, definida como el cociente constante entre variación vertical y horizontal dados dos puntos `P₁(x₁, y₁)` y `P₂(x₂, y₂)`:

```text
m = Δy / Δx = (y₂ − y₁) / (x₂ − x₁)
```

El término `b` corresponde a la **ordenada al origen** `(0, b)`, punto donde la recta cruza el eje vertical. Si `m ≠ 0`, corta también al eje horizontal en `(−b / m, 0)`. Cuando se conoce una pendiente `m` y un punto `(x₁, y₁)`, la **forma punto-pendiente** `y − y₁ = m·(x − x₁)` construye la recta de inmediato. Dos rectas son paralelas si `m₁ = m₂` y perpendiculares si `m₁ · m₂ = −1`.

## Ecuaciones cuadráticas y geometría de la parábola

Al incluir un término cuadrático (`x²`), la pendiente deja de ser constante y la gráfica adopta forma de **parábola**:

```text
f(x) = a·x² + b·x + c    (con a ≠ 0)
```

El coeficiente `a` determina la concavidad y apertura: si `a > 0` abre hacia arriba (mínimo global); si `a < 0` abre hacia abajo (máximo global). Valores mayores de `|a|` estrechan la curva, mientras `c` marca el corte vertical en `(0, c)`.

Toda parábola es simétrica respecto al eje vertical `x = h` que pasa por su **vértice** `V(h, k)`:

```text
h = −b / (2a)
k = f(h) = c − b² / (4a)
```

Sus raíces reales (cortes con el eje `x` donde `f(x) = 0`) dependen del **discriminante** `Δ = b² − 4ac` dentro de `x = (−b ± √Δ) / (2a)`. Si `Δ > 0`, existen dos raíces reales; si `Δ = 0`, una raíz doble tangente en el vértice; y si `Δ < 0`, la curva no interseca el eje `x`.

## Ejemplo práctico paso a paso: recta y trayectoria parabólica

Suponga una calibración lineal que pasa por `P₁(2, 5)` y `P₂(6, 13)`, junto con el movimiento vertical de un proyectil descrito por `h(t) = −5t² + 20t + 1.5`, con `t` en segundos y `h(t)` en metros.

1. **Ecuación de la recta:** Se calcula la pendiente `m = (13 − 5) / (6 − 2) = 8 / 4 = 2`. Con `P₁(2, 5)` en la forma punto-pendiente: `y − 5 = 2·(x − 2)`, que resulta `y = 2x + 1`. Su ordenada al origen es `(0, 1)` y su raíz es `(−0.5, 0)`.
2. **Vértice parabólico (altura máxima):** En `h(t) = −5t² + 20t + 1.5`, se identifican `a = −5`, `b = 20` y `c = 1.5`. Como `a < 0`, el vértice es un máximo en `t_v = −20 / (2 × (−5)) = 2.0 s`. Evaluando en la función: `h(2.0) = −5·(4) + 20·(2) + 1.5 = 21.5 m`.
3. **Impacto en el suelo (`h(t) = 0`):** El discriminante vale `Δ = 20² − 4·(−5)·(1.5) = 430`, con `√430 ≈ 20.7364`. Las raíces son `t₁ = (−20 + 20.7364) / (−10) ≈ −0.074 s` y `t₂ = (−20 − 20.7364) / (−10) ≈ 4.074 s`. Dentro del dominio físico `t ≥ 0`, el proyectil despega de `1.5 m`, alcanza `21.5 m` a los `2.0 s` y cae al suelo a los `4.074 s`.

## Comparativa de formas algebraicas y familias de funciones

Seleccionar la expresión algebraica adecuada expone directamente las propiedades gráficas requeridas:

| Forma algebraica | Ecuación | Parámetros visibles | Rasgo gráfico inmediato | Aplicación habitual |
| :--- | :--- | :--- | :--- | :--- |
| Lineal pendiente-ordenada | `y = m·x + b` | `m`, `b` | Inclinación y corte vertical | Regresión lineal y costos |
| Lineal punto-pendiente | `y − y₁ = m·(x − x₁)` | `m`, `(x₁, y₁)` | Recta anclada a un punto | Tangentes y secantes |
| Constante | `y = c` | `c` (`m = 0`) | Recta horizontal paralela a `x` | Umbrales y costos fijos |
| Cuadrática estándar | `y = a·x² + b·x + c` | `a, b, c` | Concavidad y corte `(0, c)` | Cinemática y ajuste polinómico |
| Cuadrática canónica | `y = a·(x − h)² + k` | `a`, vértice `(h, k)` | Extremo y traslaciones | Optimización y reflectores |
| Cuadrática factorizada | `y = a·(x − r₁)·(x − r₂)` | `a`, raíces `r₁, r₂` | Cortes con el eje horizontal | Análisis de ceros y signos |

## Aplicaciones técnicas, errores frecuentes y precisión numérica

En física, ingeniería y economía, las ecuaciones lineales modelan curvas de calibración analítica y puntos de equilibrio entre ingresos y costos, mientras las parábolas describen arcos estructurales, antenas parabólicas y funciones cuadráticas de beneficio máximo.

Al configurar una gráfica conviene evitar cuatro errores habituales:

- **Escalas desiguales en los ejes:** Si las unidades de `x` e `y` difieren en pantalla, las rectas perpendiculares (`m₁ · m₂ = −1`) no parecen formar 90 grados; active siempre una relación de aspecto 1:1 para inspecciones geométricas.
- **Ventana de visualización estrecha:** Un rango reducido puede ocultar el vértice o las raíces reales de una parábola, induciendo a creer que no existen.
- **Inversión de signos en traslaciones:** Reemplazar `x` por `(x − h)` con `h > 0` desplaza la gráfica hacia la derecha, no hacia la izquierda.
- **Redondeo prematuro en `h`:** Truncar decimales de `h = −b / (2a)` antes de evaluar `f(h)` amplifica el error cuadrático en `k`.
