---
title: "Calculadora Estadística"
metaTitle: "Calculadora Estadística Descriptiva | Media y Cuartiles"
description: "Analiza conjuntos de datos al instante: calcula media, mediana, moda, varianza, desviación estándar, cuartiles, rango intercuartílico, asimetría y curtosis."
metaDescription: "Calculadora estadística gratuita en línea. Obtén media, mediana, desviación estándar, cuartiles, rango intercuartílico, asimetría y curtosis al instante."
metaKeywords: "calculadora estadística, estadística descriptiva, media mediana moda, cuartiles y rango intercuartílico, varianza y desviación estándar, asimetría y curtosis, diagrama de caja"
faqs:
  - question: "¿Cuándo conviene utilizar la mediana en lugar de la media aritmética?"
    answer: "La mediana es preferible cuando el conjunto de datos presenta una fuerte asimetría o valores atípicos extremos, como ocurre con salarios, precios de vivienda o tiempos de espera con incidencias puntuales. Mientras la media se desplaza rápidamente ante un dato extremo, la mediana conserva el centro real de la distribución."
  - question: "¿Cuál es la diferencia entre varianza muestral y varianza poblacional?"
    answer: "La varianza poblacional divide la suma de desviaciones cuadráticas entre el número total de elementos (N) y se emplea cuando cuentas con el censo completo del grupo. La varianza muestral divide entre n - 1 (corrección de Bessel) para obtener una estimación insesgada al trabajar con una muestra de una población mayor."
  - question: "¿Cómo se utilizan los cuartiles y el rango intercuartílico (RIC) para detectar valores atípicos?"
    answer: "El rango intercuartílico mide la amplitud del 50 % central de los datos (RIC = Q3 - Q1). Según la regla de las vallas de Tukey, cualquier observación menor que Q1 - 1,5 × RIC o mayor que Q3 + 1,5 × RIC se clasifica como valor atípico candidato para revisión."
  - question: "¿Qué indican el coeficiente de asimetría y la curtosis en exceso?"
    answer: "La asimetría mide hacia qué lado se alarga la cola de la distribución: un valor cercano a cero indica simetría, positivo señala cola extendida a la derecha y negativo a la izquierda. La curtosis en exceso compara el peso de las colas frente a la distribución normal (curtosis 0): valores positivos altos revelan colas pesadas con mayor propensión a eventos extremos."
  - question: "¿Qué expresa el error estándar de la media frente a la desviación estándar?"
    answer: "La desviación estándar cuantifica cuánto se dispersan las observaciones individuales entre sí alrededor del promedio. El error estándar de la media (s dividido entre la raíz de n) estima con cuánta precisión la media de tu muestra aproxima la verdadera media de la población; disminuye conforme aumenta el tamaño muestral."
---

Un listado de cifras sin procesar rara vez permite fundamentar decisiones en investigación, control de calidad o gestión empresarial. Para interpretar cualquier serie numérica con rigor conviene describirla desde cuatro dimensiones: **tendencia central**, **posición**, **dispersión** y **forma de la distribución**.

Nuestra **Calculadora Estadística** acepta datos separados por comas, espacios o saltos de línea y devuelve al instante media, mediana, moda, cuartiles ($Q_1$ y $Q_3$), rango intercuartílico ($RIC$), varianza y desviación estándar (muestral y poblacional), error estándar, asimetría, curtosis en exceso, un histograma basado en la regla de Sturges y un diagrama de caja y bigotes.

## Fórmulas Fundamentales de la Estadística Descriptiva

### 1. Tendencia Central, Dispersión y Error Estándar

Para $n$ observaciones ordenadas $x_1 \le x_2 \le \dots \le x_n$, la media aritmética ($\bar{x}$), las varianzas muestral ($s^2$) y poblacional ($\sigma^2$), y el error estándar ($EE_{\bar{x}}$) se calculan como:

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i, \qquad s^2 = \frac{1}{n - 1}\sum_{i=1}^{n} (x_i - \bar{x})^2, \qquad \sigma^2 = \frac{1}{N}\sum_{i=1}^{N} (x_i - \mu)^2, \qquad EE_{\bar{x}} = \frac{s}{\sqrt{n}}$$

### 2. Cuartiles de Tukey, Rango Intercuartílico y Vallas Atípicas

El resumen de los cinco números ($\text{Mín}, Q_1, \text{Mediana}, Q_3, \text{Máx}$) parte la serie ordenada en cuartos. El primer cuartil ($Q_1$) es la mediana de la mitad inferior y $Q_3$ la de la mitad superior (excluyendo la mediana central si $n$ es impar). De ellos surgen el $RIC$ y las vallas de Tukey:

$$RIC = Q_3 - Q_1, \qquad L_{\text{inf}} = Q_1 - 1,5 \times RIC, \qquad L_{\text{sup}} = Q_3 + 1,5 \times RIC$$

### 3. Asimetría Muestral ($g_1$) y Regla de Sturges ($k$)

El coeficiente ajustado de Fisher-Pearson ($g_1$) mide el sesgo de las colas ($n \ge 3$), mientras que la regla de Sturges fija las clases del histograma:

$$g_1 = \frac{n}{(n - 1)(n - 2)}\sum_{i=1}^{n}\left(\frac{x_i - \bar{x}}{s}\right)^3, \qquad k = \lceil 1 + 3,322 \log_{10}(n) \rceil$$

Donde:

* **$x_i$ y $n$ ($N$)**: Cada observación y tamaño de la muestra (o población completa).
* **$\bar{x}, \mu, s, \sigma$**: Medias y desviaciones estándar muestral ($\sqrt{s^2}$) y poblacional ($\sqrt{\sigma^2}$).
* **$Q_1, Q_3, RIC$**: Cuartiles primero y tercero, y amplitud del $50\text{ \%}$ central.
* **$L_{\text{inf}}, L_{\text{sup}}$**: Umbrales fuera de los cuales un dato se marca como valor atípico.
* **$g_1$**: Asimetría ($0$ indica simetría; valores positivos revelan cola derecha más larga).

## Ejemplo Práctico Resuelto Paso a Paso

Analicemos los tiempos de respuesta en minutos de un equipo técnico en $n = 9$ incidencias ordenadas de menor a mayor:

$$\{14,\; 16,\; 18,\; 18,\; 20,\; 21,\; 22,\; 25,\; 26\}$$

1. **Tendencia central:**
   * **Media ($\bar{x}$):** $\frac{180}{9} = \mathbf{20,00\text{ min}}$.
   * **Mediana:** Quinta posición central ($n = 9$) = **$\mathbf{20\text{ min}}$**.
   * **Moda:** Valor más frecuente (aparece dos veces) = **$\mathbf{18\text{ min}}$**.
2. **Posición y detección de atípicos:**
   * Mitad inferior $\{14, 16, 18, 18\} \implies Q_1 = \frac{16 + 18}{2} = \mathbf{17,00\text{ min}}$.
   * Mitad superior $\{21, 22, 25, 26\} \implies Q_3 = \frac{22 + 25}{2} = \mathbf{23,50\text{ min}}$.
   * **$RIC$:** $23,50 - 17,00 = \mathbf{6,50\text{ min}}$.
   * **Vallas de Tukey:** $L_{\text{inf}} = 7,25\text{ min}$ y $L_{\text{sup}} = 33,25\text{ min}$. Al quedar todos los datos entre $14$ y $26$, **no hay valores atípicos**.
3. **Dispersión y forma:**
   * **Suma de cuadrados ($SC$):** $36 + 16 + 4 + 4 + 0 + 1 + 4 + 25 + 36 = \mathbf{126\text{ min}^2}$.
   * **Muestral ($n - 1 = 8$):** $s^2 = \frac{126}{8} = 15,75\text{ min}^2 \implies s = \sqrt{15,75} \approx \mathbf{3,97\text{ min}}$.
   * **Poblacional ($N = 9$):** $\sigma^2 = \frac{126}{9} = 14,00\text{ min}^2 \implies \sigma = \sqrt{14} \approx \mathbf{3,74\text{ min}}$.
   * **Error estándar ($EE_{\bar{x}}$):** $\frac{3,9686}{3} \approx \mathbf{1,32\text{ min}}$.
   * **Forma e histograma:** Asimetría $g_1 \approx 0,14$, curtosis en exceso $g_2 \approx -0,77$ y $k = 5\text{ intervalos}$.

## Efecto de un Valor Atípico: Métricas Sensibles frente a Robustas

Si la última incidencia pasa de $26\text{ min}$ a **$62\text{ min}$** por una caída del servidor, observa cómo responden ambas familias de indicadores ($n = 9$):

| Indicador Estadístico | Serie Limpia (máx. 26) | Con Atípico (máx. 62) | Variación | Robustez |
| :--- | :--- | :--- | :--- | :--- |
| **Media ($\bar{x}$)** | 20,00 min | 24,00 min | +20,0 % | Baja |
| **Mediana** | 20,00 min | 20,00 min | 0,0 % | Alta |
| **Rango ($\text{Máx} - \text{Mín}$)** | 12,00 min | 48,00 min | +300,0 % | Muy baja |
| **Rango Intercuartílico ($RIC$)** | 6,50 min | 6,50 min | 0,0 % | Alta |
| **Desviación Estándar ($s$)** | 3,97 min | 14,62 min | +268,4 % | Baja |
| **Error Estándar ($EE_{\bar{x}}$)** | 1,32 min | 4,87 min | +268,4 % | Baja |
| **Asimetría ($g_1$)** | +0,14 | +2,72 | Sesgo derecho | Muy sensible |
| **Curtosis en Exceso ($g_2$)** | −0,77 | +7,75 | Colas pesadas | Muy sensible |

El registro $62\text{ min}$ supera la valla superior ($33,25\text{ min}$), multiplica por más de tres la desviación estándar y eleva bruscamente la curtosis, mientras la **mediana ($20\text{ min}$)** y el **$RIC$ ($6,50\text{ min}$)** se mantienen exactos.

## Buenas Prácticas y Errores Habituales

* **Empareja adecuadamente cada par de métricas:** En datos casi simétricos ($|g_1| < 0,5$), reporta **media y desviación estándar**. Ante sesgos marcados o valores extremos reales, utiliza **mediana y $RIC$** para representar el comportamiento típico sin distorsiones.
* **Audita los atípicos antes de descartarlos:** Rebasar $Q_3 + 1,5 \times RIC$ no implica eliminar automáticamente el dato. Separa fallos de registro o sensor de eventos genuinos críticos —como picos de demanda o fallos operativos— que suelen concentrar la información más valiosa.
* **No sustituyas $s$ por $EE_{\bar{x}}$ en informes:** Presentar el error estándar en lugar de la desviación estándar minimiza artificialmente la dispersión observada (con $n = 100$, $EE_{\bar{x}}$ es diez veces menor que $s$). Reserva $EE_{\bar{x}}$ para estimar intervalos de confianza sobre la media poblacional.
