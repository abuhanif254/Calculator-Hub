---
title: "Calculadora de Probabilidad"
metaTitle: "Calculadora de Probabilidad | Bayes, Unión y Binomial"
description: "Calcula probabilidades simples y compuestas, probabilidad condicional, teorema de Bayes, valor esperado, distribución binomial y razón de momios con simuladores interactivos."
metaDescription: "Calculadora de probabilidad en línea gratuita. Calcula unión, intersección, probabilidad condicional, teorema de Bayes, valor esperado y binomial."
metaKeywords: "calculadora de probabilidad, probabilidad condicional, teorema de bayes, valor esperado, distribución binomial, unión e intersección de sucesos, ley de los grandes números"
faqs:
  - question: "¿Qué diferencia existe entre sucesos independientes y sucesos mutuamente excluyentes?"
    answer: "Dos sucesos son independientes cuando la ocurrencia de uno no altera la probabilidad del otro, cumpliéndose P(A y B) = P(A) × P(B). En cambio, dos sucesos mutuamente excluyentes o disjuntos no pueden ocurrir al mismo tiempo, por lo que P(A y B) = 0. Por esa razón, dos sucesos con probabilidad mayor que cero nunca pueden ser independientes y excluyentes a la vez."
  - question: "¿Cuándo se multiplican probabilidades y cuándo se suman?"
    answer: "Se multiplican probabilidades al buscar la intersección de sucesos, es decir, que ocurran tanto A como B simultánea o secuencialmente. Se suman probabilidades al calcular la unión, es decir, que ocurra A, B o ambos, recordando restar siempre su intersección P(A y B) para no contabilizar dos veces los casos compartidos."
  - question: "¿Cómo actualiza el teorema de Bayes la probabilidad cuando aparece nueva evidencia?"
    answer: "El teorema de Bayes combina la probabilidad inicial o a priori de una hipótesis P(A) con la verosimilitud de observar la evidencia dada esa hipótesis P(B|A), dividiendo el producto entre la probabilidad total de la evidencia P(B). Este ajuste evita la falacia de la tasa base al interpretar pruebas médicas, controles de calidad o alertas de fraude."
  - question: "¿Cómo se convierte una probabilidad en razón de momios y viceversa?"
    answer: "La probabilidad divide los casos favorables entre el total de resultados posibles, mientras que la razón de momios divide los casos favorables entre los desfavorables. Dada una probabilidad p, los momios a favor equivalen a p / (1 - p); inversamente, con momios a favor de a:b, la probabilidad resulta a / (a + b)."
  - question: "¿Qué demuestra la ley de los grandes números en los simuladores de monedas y dados?"
    answer: "La ley de los grandes números establece que, a medida que aumenta el número de ensayos idénticos e independientes, la frecuencia relativa empírica observada en la simulación converge progresivamente hacia la probabilidad teórica exacta del suceso, reduciendo las desviaciones propias de muestras pequeñas."
---

La teoría de la probabilidad cuantifica la incertidumbre asignando a cada suceso aleatorio un número real entre $0$ (imposibilidad) y $1$ (certeza absoluta). Sustentada en los axiomas de Kolmogórov —no negatividad ($P(E) \ge 0$), normalización del espacio muestral ($P(\Omega) = 1$) y aditividad para sucesos disjuntos—, resulta clave en epidemiología, ingeniería de fiabilidad, finanzas cuantitativas y control de calidad.

Como la intuición falla ante eventos encadenados, pagos asimétricos y prevalencias bajas, nuestra **Calculadora de Probabilidad** computa con exactitud operaciones de conjuntos —unión, intersección, complemento y disyunción exclusiva—, probabilidad condicional, teorema de Bayes, distribución binomial, esperanza matemática, conversión a razón de momios y simuladores de monedas y dados.

## Fórmulas Esenciales de Probabilidad y Teorema de Bayes

### 1. Regla de Laplace, Adición y Multiplicación

En un espacio equiprobable $\Omega$, la probabilidad de $A$ divide casos favorables $n(A)$ entre posibles $n(\Omega)$, y su complemento vale $P(A^c) = 1 - P(A)$. Para dos sucesos $A$ y $B$:

$$P(A) = \frac{n(A)}{n(\Omega)}, \qquad P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

* **Independientes:** $P(A \cap B) = P(A) \cdot P(B)$.
* **Dependientes:** $P(A \cap B) = P(A) \cdot P(B \mid A)$.
* **Mutuamente excluyentes:** $P(A \cap B) = 0$.
* **Exactamente uno (disyunción exclusiva):** $P(A \triangle B) = P(A) + P(B) - 2P(A \cap B)$.

### 2. Probabilidad Condicional y Teorema de Bayes

La probabilidad condicional $P(A \mid B)$ mide la ocurrencia de $A$ sabiendo que $B$ sucedió. Expandiendo $P(B)$ mediante la ley de probabilidad total resulta el teorema de Bayes:

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(B \mid A) \cdot P(A)}{P(B \mid A)P(A) + P(B \mid A^c)P(A^c)}$$

### 3. Distribución Binomial, Valor Esperado y Razón de Momios

Para $k$ éxitos en $n$ ensayos de Bernoulli independientes con probabilidad $p$, esperanza matemática $E[X]$ y momios a favor ($R_{\text{favor}}$):

$$P(X = k) = \binom{n}{k} p^k (1 - p)^{n - k}, \qquad E[X] = \sum_{i=1}^{m} x_i P(X = x_i), \qquad R_{\text{favor}} = \frac{p}{1 - p}$$

Mientras la distribución binomial modela repeticiones con éxito o fracaso, la esperanza matemática resume la ganancia o pérdida media a largo plazo en decisiones financieras, seguros o juegos de azar.

Donde:

* **$\Omega$ y $A^c$**: Espacio muestral completo y complemento de $A$.
* **$P(A)$ y $P(B \mid A)$**: Probabilidad *a priori* de $A$ y verosimilitud de $B$ dado $A$.
* **$P(A \mid B)$**: Probabilidad *a posteriori* de $A$ tras observar la evidencia $B$.
* **$\binom{n}{k}$**: Combinaciones $\frac{n!}{k!(n - k)!}$ de $k$ éxitos en $n$ ensayos.
* **$E[X]$ y $R_{\text{favor}}$**: Promedio ponderado a largo plazo y cociente favorable frente a desfavorable.

## Ejemplos Prácticos Resueltos Paso a Paso

### Ejemplo 1: Sensores Independientes en una Planta Industrial

Dos detectores independientes vigilan fugas de gas: el sensor $A$ detecta una anomalía con $P(A) = 0,60$ y el sensor $B$ con $P(B) = 0,45$.

1. **Ambos detectan ($A \cap B$):** $0,60 \times 0,45 = \mathbf{0,27}$ ($27,0\text{ \%}$).
2. **Al menos uno detecta ($A \cup B$):** $0,60 + 0,45 - 0,27 = \mathbf{0,78}$ ($78,0\text{ \%}$).
3. **Exactamente uno detecta ($A \triangle B$):** $0,60 + 0,45 - 2(0,27) = \mathbf{0,51}$ ($51,0\text{ \%}$).
4. **Ninguno detecta ($A^c \cap B^c$):** $1 - 0,78 = \mathbf{0,22}$ ($22,0\text{ \%}$), verificable como $0,40 \times 0,55 = 0,22$.

### Ejemplo 2: Teorema de Bayes en una Prueba Diagnóstica

Una afección tiene prevalencia del $2\text{ \%}$ ($P(E) = 0,02$, $P(E^c) = 0,98$). Una prueba rápida posee sensibilidad del $94\text{ \%}$ ($P(+ \mid E) = 0,94$) y especificidad del $92\text{ \%}$, lo que implica un $8\text{ \%}$ de falsos positivos ($P(+ \mid E^c) = 0,08$). Ante un positivo, calculamos $P(E \mid +)$:

1. **Verdaderos positivos:** $0,94 \times 0,02 = 0,0188$.
2. **Falsos positivos:** $0,08 \times 0,98 = 0,0784$.
3. **Probabilidad total de positivo:** $P(+) = 0,0188 + 0,0784 = 0,0972$ ($9,72\text{ \%}$).
4. **Probabilidad *a posteriori*:**
   $$P(E \mid +) = \frac{0,0188}{0,0972} \approx \mathbf{0,1934} \quad (\mathbf{19,34\text{ \%}})$$

Aun con un $94\text{ \%}$ de sensibilidad, menos de uno de cada cinco positivos padece realmente la afección porque el $8\text{ \%}$ de falsos positivos recae sobre el $98\text{ \%}$ sano; por ello los protocolos clínicos exigen una prueba confirmatoria de mayor especificidad.

## Tabla de Referencia de Operaciones Probabilísticas

| Operación | Fórmula Matemática | Condición Lógica | Interpretación Verbal |
| :--- | :--- | :--- | :--- |
| **Complemento** | $1 - P(A)$ | Negación | El suceso $A$ **no** ocurre |
| **Intersección indep.** | $P(A) \cdot P(B)$ | $P(B \mid A) = P(B)$ | Ocurren **ambos** sin influencia |
| **Intersección dep.** | $P(A) \cdot P(B \mid A)$ | $B$ depende de $A$ | Ocurren **ambos** en secuencia |
| **Unión disjunta** | $P(A) + P(B)$ | $P(A \cap B) = 0$ | Ocurre $A$ **o** $B$ sin cruce |
| **Unión general** | $P(A) + P(B) - P(A \cap B)$ | Sucesos compatibles | Ocurre **al menos uno** de los dos |
| **Disyunción exclusiva** | $P(A) + P(B) - 2P(A \cap B)$ | Exclusión estricta | Ocurre **exactamente uno** |
| **Ningún suceso** | $1 - P(A \cup B)$ | Ley de De Morgan | **No** ocurre ni $A$ ni $B$ |
| **Al menos un éxito** | $1 - (1 - p)^n$ | $n$ ensayos indep. | Al menos un acierto en $n$ intentos |

## Errores Habituales y Criterios de Aplicación

* **Confundir independencia con exclusión mutua:** Si dos sucesos con probabilidad positiva son disjuntos, que ocurra $A$ anula a $B$ ($P(B \mid A) = 0 \ne P(B)$); por tanto, son dependientes, jamás independientes.
* **Invertir el condicional ($P(A \mid B) \ne P(B \mid A)$):** Equiparar la sensibilidad de una prueba diagnóstica con la probabilidad de estar enfermo tras dar positivo comete la falacia del condicional transpuesto e ignora la tasa base poblacional.
* **Caer en la falacia del jugador:** En lanzamientos independientes de monedas o dados, las rachas previas no alteran la probabilidad del intento siguiente; la convergencia de la ley de los grandes números ocurre por dilución estadística en muestras amplias, nunca por compensación del azar.
* **Sumar sucesos compatibles sin restar el solapamiento:** Omitir $-P(A \cap B)$ infla la probabilidad real y puede producir resultados imposibles por encima de $1$.
