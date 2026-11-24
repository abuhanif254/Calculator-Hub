---
title: "Calculadora de Valor P"
metaTitle: "Calculadora de Valor P | Pruebas Z, t, Chi-Cuadrado y F"
description: "Calcula el valor p exacto para pruebas Z, t de Student, chi-cuadrado y F de ANOVA, e interpreta la significación estadística frente a tu nivel alfa."
metaDescription: "Calcula el valor p exacto a partir de estadísticos Z, t de Student, chi-cuadrado y F en contrastes de una o dos colas con interpretación inmediata."
metaKeywords: "calculadora de valor p, calcular valor p, prueba z, prueba t de student, chi cuadrado, prueba f anova, significación estadística, hipótesis nula, contraste bilateral"
faqs:
  - question: "¿Qué significa exactamente un valor p inferior a 0,05?"
    answer: "Un valor p inferior a 0,05 indica que, asumiendo que la hipótesis nula es cierta, la probabilidad de obtener un estadístico igual o más extremo que el observado en la muestra es menor al 5 %. Cuando el umbral de significación fijado de antemano es alfa = 0,05, ese resultado proporciona evidencia estadística suficiente para rechazar la hipótesis nula."
  - question: "¿Cuándo debo elegir un contraste unilateral frente a uno bilateral?"
    answer: "El contraste bilateral evalúa desviaciones en ambos sentidos —mayor o menor que el valor de referencia— y constituye la opción estándar cuando no existe una justificación teórica previa de dirección. El contraste unilateral solo es válido si antes de recopilar los datos la hipótesis alternativa especifica un único sentido de cambio, concentrando todo el nivel alfa en una sola cola."
  - question: "¿Por qué un valor p alto no demuestra que la hipótesis nula sea verdadera?"
    answer: "El valor p cuantifica la compatibilidad entre los datos y la hipótesis nula, nunca la probabilidad de que dicha hipótesis sea cierta. Un valor p elevado puede deberse simplemente a una muestra pequeña o a una elevada variabilidad con baja potencia estadística; por eso la conclusión correcta es no rechazar la hipótesis nula, jamás aceptarla como probada."
  - question: "¿Cuándo conviene aplicar la prueba Z en lugar de la prueba t de Student?"
    answer: "La prueba Z requiere conocer con exactitud la desviación estándar poblacional o trabajar con muestras suficientemente grandes donde el teorema central del límite hace despreciable la diferencia entre ambas distribuciones. Cuando se estima la dispersión a partir de la muestra —situación habitual en experimentos clínicos, industriales o académicos—, la prueba t de Student con sus grados de libertad ofrece un valor p exacto."
  - question: "¿Por qué las pruebas chi-cuadrado y F de ANOVA suelen evaluarse solo en la cola derecha?"
    answer: "Tanto el estadístico chi-cuadrado como el estadístico F en el análisis de la varianza (ANOVA) se construyen a partir de sumas o cocientes de cuadrados, por lo que toman valores no negativos y son asimétricos hacia la derecha. Las discrepancias relevantes respecto a la hipótesis nula desplazan el estadístico hacia valores grandes en la cola superior."
---

En investigación clínica, control de calidad industrial, econometría y experimentación científica, una diferencia observada en una muestra no prueba por sí sola un efecto real: el azar muestral genera fluctuaciones constantes. El contraste de hipótesis cuantifica esta incertidumbre mediante el **valor $p$**, la probabilidad de observar un estadístico igual o más extremo que el calculado asumiendo cierta la **hipótesis nula ($H_0$)**.

Esta **Calculadora de Valor P** calcula directamente la función de distribución acumulada exacta para cuatro pruebas fundamentales: **prueba $Z$**, **prueba $t$ de Student**, **chi-cuadrado ($\chi^2$)** y **prueba $F$ de Fisher-Snedecor (ANOVA)**. Basta seleccionar la distribución, indicar una o dos colas cuando aplique, ingresar el estadístico con sus grados de libertad ($\nu$) y comparar frente al **nivel de significación ($\alpha$)**.

## Fórmulas del Valor P para Pruebas Z, t, Chi-Cuadrado y F

### 1. Distribuciones Simétricas: Prueba $Z$ y Prueba $t$ de Student

Para contrastar una media muestral $\bar{x}$ frente a $\mu_0$ con tamaño $n$, se usa $Z$ si se conoce la desviación estándar poblacional $\sigma$, y $t$ de Student si se estima con la desviación muestral $s$ ($\nu = n - 1$ grados de libertad):

$$z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}, \qquad t = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}$$

Con la función de distribución acumulada $F(\cdot)$ correspondiente ($\Phi$ para $Z$ o $F_{t,\nu}$ para $t$):

$$p_{\text{bilateral}} = 2\bigl[1 - F(|T|)\bigr], \qquad p_{\text{unilateral derecha}} = 1 - F(T), \qquad p_{\text{unilateral izquierda}} = F(T)$$

### 2. Distribuciones Asimétricas de Cola Derecha: $\chi^2$ y $F$

En pruebas de independencia o bondad de ajuste con frecuencias observadas ($O_i$) y esperadas ($E_i$), y en el análisis de la varianza (**ANOVA**) comparando varianzas entre grupos ($CM_{\text{entre}}$) y dentro de grupos ($CM_{\text{dentro}}$), el valor $p$ equivale al área superior:

$$\chi^2 = \sum \frac{(O_i - E_i)^2}{E_i}, \qquad p_{\chi^2} = 1 - F_{\chi^2,\nu}(\chi^2)$$

$$F = \frac{CM_{\text{entre}}}{CM_{\text{dentro}}}, \qquad p_F = 1 - F_{F,\nu_1,\nu_2}(F)$$

Donde cada variable representa:

* **$T$ y $F(\cdot)$:** estadístico de prueba ($z$ o $t$) y su función de distribución acumulada exacta bajo $H_0$.
* **$\nu$, $\nu_1$ y $\nu_2$:** grados de libertad de la distribución (numerador y denominador en ANOVA).
* **$\alpha$:** nivel de significación prefijado (`0,05` o `0,01`), probabilidad máxima admitida de **error de tipo I** (falso positivo).
* **Regla de decisión:** si $p < \alpha$, se **rechaza $H_0$**; si $p \ge \alpha$, **no se rechaza $H_0$**.

## Ejemplo Práctico Paso a Paso: Control de Volumen en Planta Envasadora

Una planta calibra envases de $\mu_0 = 500\text{ mL}$ (sistema métrico SI). Para detectar desviaciones en cualquier sentido ($H_0: \mu = 500\text{ mL}$; $H_1: \mu \ne 500\text{ mL}$) con $\alpha = 0{,}05$, mide $n = 25$ envases y obtiene $\bar{x} = 497{,}4\text{ mL}$ y $s = 5{,}2\text{ mL}$. Al desconocer $\sigma$, aplica una **prueba $t$ bilateral**:

1. **Error estándar:** $EE = \frac{5{,}2}{\sqrt{25}} = \frac{5{,}2}{5} = \mathbf{1{,}04\text{ mL}}$.
2. **Estadístico $t$:** $t = \frac{497{,}4 - 500{,}0}{1{,}04} = \frac{-2{,}6}{1{,}04} = \mathbf{-2{,}50}$.
3. **Grados de libertad:** $\nu = 25 - 1 = \mathbf{24}$.
4. **Valor $p$ exacto:** con $F_{t,24}(2{,}50) = 0{,}99017$, el área de una cola es $0{,}00983$ (`0,98 %`) y el valor $p$ bilateral resulta:
   $$p_{\text{bilateral}} = 2 \times 0{,}00983 = \mathbf{0{,}01965} \quad (\mathbf{1{,}97\,\%})$$
5. **Conclusión:** como $0{,}01965 < 0{,}05$, se **rechaza $H_0$** y procede recalibrar la línea. Bajo un umbral más estricto ($\alpha = 0{,}01$), en cambio, $0{,}01965 \ge 0{,}01$ y la evidencia bilateral no bastaría.

Aplicar erróneamente una prueba $Z$ a $z = -2{,}50$ daría $p_{\text{bilateral}} = \mathbf{0{,}01242}$, subestimando el valor $p$ real en un **`36,8 %`** al omitir las colas más pesadas de la distribución $t$ con $\nu = 24$.

## Tabla de Referencia: Valores Críticos por Tipo de Prueba

| Contraste Estadístico | Parámetros | Dirección | Crítico ($\alpha = 0{,}05$) | Crítico ($\alpha = 0{,}01$) | Aplicación Principal |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Prueba $Z$** | $\sigma$ conocida | Unilateral | 1,645 | 2,326 | Proporciones o medias con muestra grande |
| **Prueba $Z$** | $\sigma$ conocida | Bilateral | 1,960 | 2,576 | Desviación bidireccional con $\sigma$ conocida |
| **Prueba $t$ de Student** | $\nu = 24$ | Unilateral | 1,711 | 2,492 | Media direccional con $s$ muestral |
| **Prueba $t$ de Student** | $\nu = 24$ | Bilateral | 2,064 | 2,797 | Comparación de medias con $\sigma$ desconocida |
| **Chi-cuadrado ($\chi^2$)** | $\nu = 4$ | Cola derecha | 9,488 | 13,277 | Tablas de contingencia y bondad de ajuste |
| **Prueba $F$ (ANOVA)** | $\nu_1 = 3,\ \nu_2 = 36$ | Cola derecha | 2,866 | 4,377 | Comparación simultánea de 4 medias |

En nuestro ejemplo ($|t| = 2{,}50$, $\nu = 24$), el estadístico supera el umbral bilateral de `2,064` ($\alpha = 0{,}05$), queda bajo el bilateral de `2,797` ($\alpha = 0{,}01$) y rebasa el unilateral de `2,492` ($\alpha = 0{,}01$), evidenciando por qué fijar el número de colas antes del muestreo es obligatorio.

## Errores Habituales al Interpretar el Valor P

* **Suponer que el valor $p$ es la probabilidad de que $H_0$ sea cierta:** mide $P(\text{datos tan extremos} \mid H_0)$, jamás $P(H_0 \mid \text{datos})$; invertir el condicional ignora la verosimilitud previa.
* **Equiparar significación estadística con relevancia práctica:** con muestras enormes ($n = 50.000$), una variación irrelevante de `0,2 mL` puede lograr $p < 0{,}001$; acompaña siempre el valor $p$ con **tamaño del efecto** e intervalo de confianza.
* **Cambiar a una cola tras ver los datos o buscar significación a conveniencia:** dividir el valor $p$ por dos *a posteriori*, descartar valores atípicos selectivamente o repetir pruebas sin ajuste (como Bonferroni) dispara los falsos positivos.
* **Emplear la prueba $Z$ con muestras pequeñas y dispersión muestral:** sustituir $\sigma$ por $s$ exige usar la distribución $t$ para no subestimar la incertidumbre.
