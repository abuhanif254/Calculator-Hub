---
title: "Calculadora de Triángulos"
metaTitle: "Calculadora de Triángulos | Lados, Ángulos y Área Exacta"
description: "Resuelve cualquier triángulo al instante mediante los métodos LLL, LAL o base y altura. Obtén ángulos internos, lados faltantes, perímetro y área exacta."
metaDescription: "Calculadora de triángulos gratis en línea. Resuelve lados, ángulos, perímetro y área con métodos LLL, LAL, base y altura, ley de cosenos y Herón."
metaKeywords: "calculadora de triángulos, resolver triángulo, área de triángulo, ley de los cosenos, fórmula de Herón, lados y ángulos, método LLL, método LAL, perímetro"
faqs:
  - question: "¿Qué datos mínimos necesito para resolver completamente un triángulo?"
    answer: "Para determinar de manera única todos los lados, ángulos, perímetro y área se requieren tres datos independientes, de los cuales al menos uno debe ser una longitud de lado. Conocer solo los tres ángulos (AAA) define la forma por semejanza, pero deja infinitos tamaños posibles."
  - question: "¿Por qué la calculadora rechaza ciertas combinaciones de tres lados en el modo LLL?"
    answer: "Todo triángulo plano debe cumplir la desigualdad triangular: la suma de dos lados cualesquiera tiene que ser estrictamente mayor que el tercer lado. Si introduce longitudes como 3 m, 4 m y 8 m, los extremos nunca pueden unirse y la herramienta avisa que la figura es geométricamente imposible."
  - question: "¿Cómo calcula el área la herramienta si no conozco la altura perpendicular?"
    answer: "En el modo LLL aplica la fórmula de Herón a partir del semiperímetro y las tres longitudes medidas, sin necesidad de trazar alturas. En el modo LAL obtiene primero el tercer lado mediante la ley de los cosenos y evalúa el área equivalente a la mitad del producto de dos lados por el seno del ángulo comprendido."
  - question: "¿Cuándo surge el caso ambiguo en la resolución de triángulos?"
    answer: "El caso ambiguo aparece exclusivamente en configuraciones lado-lado-ángulo (LLA), cuando el ángulo conocido no está comprendido entre los dos lados y puede generar cero, una o dos soluciones distintas. Los modos LLL y LAL de nuestra calculadora garantizan siempre una solución única dentro de sus dominios válidos."
  - question: "¿Puedo utilizar esta calculadora para comprobar escuadras de 90° en obra o carpintería?"
    answer: "Sí. Basta medir los dos catetos y la diagonal en la misma unidad del Sistema Internacional (metros, centímetros o milímetros) e introducirlos en el modo LLL. Si los ángulos arrojan exactamente 90,00°, la esquina está a escuadra perfecta, como ocurre con la proporción clásica 3-4-5 o sus múltiplos."
---

El triángulo es el único polígono rígido de la geometría euclidiana: tres segmentos unidos por sus vértices forman una estructura indeformable que sustenta la topografía, las cerchas arquitectónicas, la carpintería y la trigonometría aplicada.

Nuestra **Calculadora de Triángulos** resuelve al instante cualquier triángulo plano en tres modos operativos: **3 lados conocidos (LLL)**, **2 lados y ángulo comprendido (LAL)** y **Base y Altura**. En los dos primeros devuelve todos los ángulos internos en grados sexagesimales, el lado faltante si corresponde, el perímetro y el área exacta; en el tercero calcula directamente la superficie.

## Reglas de Validez Geométrica

Todo triángulo plano de lados $a, b, c$ y ángulos opuestos $\alpha, \beta, \gamma$ cumple dos leyes invariantes:

* **Suma angular constante:** Los ángulos internos suman siempre un ángulo llano: $\alpha + \beta + \gamma = 180^\circ$ ($\pi$ radianes).
* **Desigualdad triangular:** La suma de dos lados cualesquiera debe superar estrictamente al tercero ($a + b > c$, $a + c > b$ y $b + c > a$). En el modo **LAL**, el ángulo comprendido debe cumplir $0^\circ < \gamma < 180^\circ$.

## Ecuaciones Fundamentales de la Trigonometría Triangular

El motor combina la **ley de los cosenos**, la **fórmula de Herón** y la expresión clásica de superficie para resolver triángulos acutángulos, rectángulos y obtusángulos.

### 1. Ley de los Cosenos (Modos LLL y LAL)

Conocidos dos lados $a$ y $b$ junto con el ángulo comprendido $\gamma$ (modo **LAL**), el tercer lado $c$ resulta de:

$$c = \sqrt{a^2 + b^2 - 2ab\cos\gamma}$$

Cuando $\gamma = 90^\circ$ ($\cos 90^\circ = 0$), esta ley se reduce al **teorema de Pitágoras** ($c = \sqrt{a^2 + b^2}$). Con los tres lados conocidos (modo **LLL** o tras despejar $c$), los ángulos internos se calculan mediante:

$$\alpha = \arccos\!\left(\frac{b^2 + c^2 - a^2}{2bc}\right), \qquad \beta = \arccos\!\left(\frac{a^2 + c^2 - b^2}{2ac}\right), \qquad \gamma = 180^\circ - \alpha - \beta$$

Además, todo triángulo verifica la **ley de los senos**: $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma}$.

### 2. Perímetro y Área (Herón, Seno y Base por Altura)

Con el perímetro $P = a + b + c$ y el semiperímetro $s = \frac{P}{2}$, el área $A$ se obtiene por tres fórmulas equivalentes:

$$A = \sqrt{s(s - a)(s - b)(s - c)} = \frac{1}{2}ab\sin\gamma = \frac{b \cdot h}{2}$$

Donde cada variable indica:

* **$a, b, c$**: Longitudes de los lados en la misma unidad del Sistema Internacional (m, cm o mm).
* **$\alpha, \beta, \gamma$**: Ángulos interiores opuestos a $a, b, c$ en grados sexagesimales.
* **$P$ y $s$**: Perímetro total y semiperímetro ($s = \frac{a + b + c}{2}$).
* **$h$ y $A$**: Altura perpendicular sobre la base $b$ y área en unidades cuadradas ($\text{m}^2$, $\text{cm}^2$).

## Ejemplos Resueltos Paso a Paso

### Ejemplo 1: Parcela Triangular en Modo LLL ($a = 7\text{ m}$, $b = 8\text{ m}$, $c = 13\text{ m}$)

1. **Desigualdad triangular:** $7 + 8 = 15 > 13$ (triángulo válido).
2. **Perímetro y semiperímetro:** $P = 7 + 8 + 13 = \mathbf{28\text{ m}}$ y $s = \mathbf{14\text{ m}}$.
3. **Área por Herón:**
   $$A = \sqrt{14 \cdot 7 \cdot 6 \cdot 1} = \sqrt{588} \approx \mathbf{24,25\text{ m}^2}$$
4. **Ángulos internos por ley de los cosenos:**
   $$\gamma = \arccos\!\left(\frac{49 + 64 - 169}{2 \cdot 7 \cdot 8}\right) = \arccos(-0,5) = \mathbf{120,00^\circ}$$
   $$\alpha = \arccos\!\left(\frac{64 + 169 - 49}{2 \cdot 8 \cdot 13}\right) = \arccos\!\left(\frac{184}{208}\right) \approx \mathbf{27,80^\circ}, \qquad \beta = 180^\circ - 120^\circ - 27,80^\circ = \mathbf{32,20^\circ}$$

Al ser $\gamma > 90^\circ$, la parcela forma un triángulo escaleno obtusángulo.

### Ejemplo 2: Cercha de Cubierta en Modo LAL ($a = 6\text{ m}$, $b = 8\text{ m}$, $\gamma = 60^\circ$)

1. **Tirante inferior ($c$):** $c = \sqrt{36 + 64 - 2 \cdot 6 \cdot 8 \cdot \cos 60^\circ} = \sqrt{52} \approx \mathbf{7,21\text{ m}}$.
2. **Perímetro y área:** $P = \mathbf{21,21\text{ m}}$ y $A = \frac{1}{2} \cdot 6 \cdot 8 \cdot \sin 60^\circ \approx \mathbf{20,78\text{ m}^2}$.
3. **Ángulos restantes:** $\alpha \approx \mathbf{46,10^\circ}$ y $\beta \approx \mathbf{73,90^\circ}$.

## Clasificación de Triángulos y Cuadro de Referencia

| Tipo | Definición | Relación ($c$ lado mayor) | Propiedad y Uso Habitual |
| :--- | :--- | :--- | :--- |
| **Equilátero** | $a = b = c$; ángulos de $60^\circ$ | $a^2 + b^2 > c^2$ | Altura $h = \frac{\sqrt{3}}{2}a$; celosías simétricas |
| **Isósceles** | Dos lados y dos ángulos iguales | Según ángulo vértice | Cubiertas a dos aguas y caballetes |
| **Escaleno** | Tres lados y ángulos distintos | Según $\gamma$ | Parcelas irregulares y triangulación |
| **Rectángulo** | Un ángulo exacto de $90^\circ$ | $a^2 + b^2 = c^2$ | Escuadras en obra (regla 3-4-5), rampas |
| **Acutángulo** | Tres ángulos menores de $90^\circ$ | $a^2 + b^2 > c^2$ | Todas las alturas quedan en el interior |
| **Obtusángulo** | Un ángulo mayor de $90^\circ$ | $a^2 + b^2 < c^2$ | Dos alturas caen fuera de la base |

## Errores Frecuentes y Consejos Prácticos

* **Mezclar unidades de longitud:** Convierta siempre todos los lados a la misma unidad (por ejemplo, todos a metros) antes de calcular para conservar la coherencia del perímetro y del área.
* **Confundir grados con radianes:** La calculadora usa grados sexagesimales ($0^\circ$–$180^\circ$). Al comprobar con hojas de cálculo o calculadoras científicas, recuerde convertir a radianes ($\text{rad} = \text{grados} \times \frac{\pi}{180}$).
* **Usar un lado inclinado como altura:** En el modo **Base y Altura**, $h$ debe ser estrictamente perpendicular ($90^\circ$) a la base; ingresar una arista lateral sobreestima el área.
* **Ingresar un ángulo no incluido en LAL:** En el modo LAL el ángulo debe situarse exactamente entre los dos lados conocidos; si es opuesto a uno de ellos (caso LLA), el resultado no será válido.
* **Triángulos casi planos:** Cuando $a + b$ supera apenas a $c$, pequeñas imprecisiones de cinta métrica en obra alteran notablemente los ángulos; verifique siempre las diagonales dos veces.
