---
title: "Calculadora de Rendimiento Promedio"
metaTitle: "Calculadora de Rendimiento Promedio | CAGR y Retorno Real"
description: "Calcule el rendimiento histórico real de sus inversiones. Descubra la tasa de crecimiento anual compuesta (CAGR) y analice el crecimiento de su cartera."
metaDescription: "Calculadora gratuita de rendimiento promedio y CAGR. Mida la tasa de crecimiento anual compuesta y la media geométrica de su cartera de inversión."
metaKeywords: "calculadora de rendimiento promedio, calcular cagr, tasa de crecimiento anual compuesta, retorno de inversion, rendimiento cartera de acciones, media geometrica"
faqs:
  - question: "¿Cuál es la diferencia entre el rendimiento promedio aritmético y la media geométrica (CAGR)?"
    answer: "El promedio aritmético suma los rendimientos porcentuales de cada período y los divide entre el número de períodos, asumiendo que el capital invertido se reinicia al mismo monto cada año. La media geométrica o CAGR incorpora el efecto real de la capitalización compuesta, donde las ganancias o pérdidas de un año alteran la base de capital del año siguiente, ofreciendo la tasa exacta de crecimiento patrimonial."
  - question: "¿Por qué la media geométrica siempre es menor o igual que la media aritmética?"
    answer: "Por una propiedad matemática conocida como desigualdad entre las medias aritmética y geométrica. Cualquier variación o volatilidad entre los retornos periódicos reduce el crecimiento compuesto porque las pérdidas porcentuales se aplican sobre un capital mayor tras una subida, mientras que las recuperaciones posteriores parten de un capital reducido. Solo cuando el rendimiento es idéntico en todos los períodos ambas medias coinciden exactamente."
  - question: "¿Cómo afectan las aportaciones periódicas o retiros al cálculo del rendimiento promedio?"
    answer: "Cuando existen flujos de entrada o salida de efectivo durante la vida de la inversión, el CAGR simple entre el saldo inicial y el saldo final deja de ser válido porque confunde el dinero aportado con la rentabilidad generada. En esos casos se debe emplear el rendimiento ponderado por el tiempo (TWR) para evaluar al gestor o la Tasa Interna de Retorno (TIR) para medir la rentabilidad ponderada por el dinero del inversor."
  - question: "¿Por qué una pérdida del 50 % requiere una ganancia del 100 % para recuperar el capital?"
    answer: "Si una cartera de 10 000 € sufre una caída del 50 %, su valor se reduce a 5 000 €. Si al año siguiente sube un 50 %, solo gana 2 500 € sobre la nueva base reducida, llegando a 7 500 €. Para recuperar los 5 000 € perdidos partiendo desde una base de 5 000 €, el activo necesita duplicar su valor, lo que exige una rentabilidad positiva del 100 %."
  - question: "¿Cómo se descuenta la inflación para obtener el rendimiento promedio real?"
    answer: "No basta con restar la inflación directamente a la rentabilidad nominal; debe aplicarse la ecuación exacta de Fisher: se divide (1 más la tasa nominal) entre (1 más la tasa de inflación) y al resultado se le resta 1. Esta operación refleja la variación auténtica del poder adquisitivo de la cartera."
---

Evaluar el desempeño histórico de una cartera de valores, un fondo indexado o un activo inmobiliario exige distinguir entre las métricas estadísticas simples y las tasas de capitalización compuesta. Con frecuencia, los informes comerciales destacan el promedio aritmético de los retornos anuales, una cifra que ignora la asimetría de las caídas del mercado y sobreestima sistemáticamente el capital acumulado cuando existe volatilidad.

Esta guía detalla las ecuaciones financieras que rigen el rendimiento promedio aritmético, la media geométrica o **Tasa de Crecimiento Anual Compuesta (CAGR)**, el ajuste por inflación mediante la identidad de Fisher y el impacto cuantitativo de la dispersión de retornos sobre el patrimonio a largo plazo.

## Fórmulas Matemáticas del Rendimiento Promedio y Compuesto

Según el objetivo del análisis financiero —estimar el valor esperado de un período aislado o medir el crecimiento real acumulado a lo largo de varios años—, se emplean cuatro formulaciones complementarias.

### 1. Rendimiento Promedio Aritmético ($R_A$)

Representa la media simple de una serie de retornos periódicos independientes ($r_1, r_2, \dots, r_n$) observados durante $n$ períodos de igual duración:

$$R_A = \frac{1}{n} \sum_{t=1}^{n} r_t = \frac{r_1 + r_2 + \dots + r_n}{n}$$

El promedio aritmético es el estimador estadístico del retorno esperado para **un único período futuro** aislado, pero no debe proyectarse de forma compuesta a múltiples años si los retornos presentan varianza.

### 2. Media Geométrica o Tasa de Crecimiento Anual Compuesta ($\text{CAGR}$ / $R_G$)

La media geométrica determina la tasa de rentabilidad anual constante que, aplicada de forma compuesta sobre el valor inicial ($V_i$), produce exactamente el valor final ($V_f$) al cabo de $n$ años:

$$R_G = \left[ \prod_{t=1}^{n} (1 + r_t) \right]^{\frac{1}{n}} - 1 = \left( \frac{V_f}{V_i} \right)^{\frac{1}{n}} - 1$$

Donde:
* $r_t$: rendimiento porcentual (expresado en tanto por uno) en el período $t$.
* $n$: número total de períodos o años de la inversión.
* $V_i$ y $V_f$: capital inicial invertido y patrimonio final acumulado al cierre del período $n$.

### 3. Drenaje por Volatilidad y Rendimiento Real (Ecuación de Fisher)

La diferencia entre la media aritmética ($R_A$) y la media geométrica ($R_G$) crece en proporción a la varianza ($\sigma^2$) de los rendimientos periódicos, fenómeno denominado drenaje por volatilidad:

$$R_G \approx R_A - \frac{\sigma^2}{2}$$

Para medir el incremento neto del poder adquisitivo descontando la tasa de inflación anualizada ($\pi$), se aplica la ecuación de Fisher:

$$r_{\text{real}} = \frac{1 + R_G}{1 + \pi} - 1$$

## Ejemplo Práctico Paso a Paso: Cartera de Renta Variable en 4 Años

Un inversor destina un capital inicial de $V_i = 20\,000\text{ €}$ a una cartera de acciones durante $n = 4\text{ años}$, registrando los siguientes rendimientos anuales:
* **Año 1**: $+25,0\,\%$ ($r_1 = +0,25$) $\rightarrow$ Capital: $20\,000 \times 1,25 = 25\,000\text{ €}$
* **Año 2**: $-20,0\,\%$ ($r_2 = -0,20$) $\rightarrow$ Capital: $25\,000 \times 0,80 = 20\,000\text{ €}$
* **Año 3**: $+15,0\,\%$ ($r_3 = +0,15$) $\rightarrow$ Capital: $20\,000 \times 1,15 = 23\,000\text{ €}$
* **Año 4**: $+10,0\,\%$ ($r_4 = +0,10$) $\rightarrow$ Capital final ($V_f$): $23\,000 \times 1,10 = 25\,300\text{ €}$

1. **Rendimiento promedio aritmético**:
   $$R_A = \frac{25\,\% - 20\,\% + 15\,\% + 10\,\%}{4} = \frac{30\,\%}{4} = 7,50\,\%\text{ anual}$$
   Si el inversor proyectara ese $7,50\,\%$ de forma compuesta durante 4 años, esperaría un saldo erróneo de $20\,000 \times (1,075)^4 = 26\,709,38\text{ €}$ (sobreestimación de $1\,409,38\text{ €}$).
2. **Media geométrica (CAGR)**:
   Multiplicamos los factores anuales: $1,25 \times 0,80 \times 1,15 \times 1,10 = 1,2650$. Extraemos la raíz cuarta:
   $$R_G = (1,2650)^{0,25} - 1 = 1,060527 - 1 = 0,060527 \approx \mathbf{6,05\,\%\text{ anual}}$$
   Comprobamos con los saldos extremos: $(25\,300 / 20\,000)^{0,25} - 1 = 6,05\,\%$.
3. **Rendimiento real descontando una inflación del $2,80\,\%$ anual ($\pi = 0,028$)**:
   $$r_{\text{real}} = \frac{1,060527}{1,0280} - 1 = 1,031641 - 1 = \mathbf{3,16\,\%\text{ anual real}}$$

## Tabla Comparativa: El Efecto del Drenaje por Volatilidad

La siguiente tabla compara cinco carteras durante **10 años** (alternando 5 años alcistas y 5 años bajistas sobre $10\,000\text{ €}$). Aunque **todas tienen una media aritmética idéntica del $10,00\,\%$**, la mayor desviación estándar ($\sigma$) erosiona drásticamente el CAGR y el patrimonio final:

| Perfil de Cartera | Año Alcista (5 a.) | Año Bajista (5 a.) | Media Aritmética | Desviación Estándar | CAGR Real | Capital Final a 10 Años |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Estabilidad total** | $+10,0\,\%$ | $+10,0\,\%$ | $10,00\,\%$ | $0,00\,\%$ | **$10,00\,\%$** | $25\,937,42\text{ €}$ |
| **Volatilidad baja** | $+20,0\,\%$ | $0,0\,\%$ | $10,00\,\%$ | $10,00\,\%$ | **$9,54\,\%$** | $24\,883,20\text{ €}$ |
| **Bolsa estándar** | $+30,0\,\%$ | $-10,0\,\%$ | $10,00\,\%$ | $20,00\,\%$ | **$8,17\,\%$** | $21\,924,48\text{ €}$ |
| **Alta volatilidad** | $+45,0\,\%$ | $-25,0\,\%$ | $10,00\,\%$ | $35,00\,\%$ | **$4,28\,\%$** | $15\,208,75\text{ €}$ |
| **Especulación extrema** | $+70,0\,\%$ | $-50,0\,\%$ | $10,00\,\%$ | $60,00\,\%$ | **$-7,79\,\%$** | $4\,437,05\text{ €}$ |

## Criterios Institucionales y Errores Frecuentes al Evaluar Carteras

* **Asimetría matemática de las pérdidas (*Drawdowns*)**: las caídas porcentuales exigen rentabilidades exponencialmente mayores para recuperar el nivel previo. Una caída del $10\,\%$ requiere un $+11,11\,\%$; un retroceso del $25\,\%$ exige un $+33,33\,\%$; una pérdida del $40\,\%$ obliga a ganar un $+66,67\,\%$; y un desplome del $75\,\%$ necesita un $+300,00\,\%$ solo para empatar.
* **Rendimiento Ponderado por el Tiempo (TWR) frente a la TIR**: si realiza aportaciones periódicas, no puede dividir el saldo final entre el capital total aportado para hallar el CAGR. Para evaluar el activo subyacente aislando el momento de los flujos de caja debe encadenar geométricamente los subperíodos (**TWR**); para medir la rentabilidad efectiva de cada euro según la fecha exacta en que se aportó, debe calcular la **Tasa Interna de Retorno (TIR)**.
* **Impacto compuesto de las comisiones (*TER*)**: una comisión anual de gestión del $1,50\,\%$ frente al $0,15\,\%$ de un fondo indexado resta directamente $1,35$ puntos anuales a la tasa geométrica, absorbiendo más del $25\,\%$ del patrimonio potencial al cabo de 25 años.
