---
title: "Calculadora de Hipotecas Canadiense"
metaTitle: "Calculadora de Hipotecas Canadiense | Capitalización Real"
description: "Calcula tu hipoteca en Canadá aplicando la capitalización semestral obligatoria por ley, el seguro hipotecario CMHC, pagos acelerados y el cuadro de amortización."
metaDescription: "Calcula tu hipoteca en Canadá con capitalización semestral legal, TAE real, seguro CMHC, pagos quincenales acelerados y cuadro de amortización."
metaKeywords: "calculadora de hipotecas canadiense, hipoteca en canadá, capitalización semestral, cuota hipotecaria canadá, seguro hipotecario cmhc, cuadro de amortización, pagos quincenales acelerados"
faqs:
  - question: "¿Por qué las hipotecas a tipo fijo en Canadá se capitalizan semestralmente y cómo afecta a la cuota?"
    answer: "La Ley de Intereses federal de Canadá establece que las hipotecas residenciales a tipo fijo no pueden capitalizarse más de dos veces al año. Como el interés compuesto actúa con menor frecuencia que la capitalización mensual utilizada en Estados Unidos, la tasa efectiva anual (TAE) y la cuota mensual resultan ligeramente más bajas para el mismo tipo nominal."
  - question: "¿Qué diferencia existe en Canadá entre el plazo contractual del préstamo y el período de amortización?"
    answer: "El período de amortización es el tiempo total necesario para liquidar completamente la deuda, habitualmente 25 años (o hasta 30 años con una entrada del 20 % o superior). El plazo contractual es la vigencia del contrato actual con el banco —por lo general de 3 o 5 años—, al final del cual debes renovar el saldo restante al tipo de interés vigente en el mercado."
  - question: "¿Cuál es la entrada mínima exigida para comprar vivienda en Canadá y cuándo se paga seguro hipotecario?"
    answer: "La entrada mínima es del 5 % sobre los primeros 500.000 CAD del precio de compra y del 10 % sobre el tramo adicional dentro del límite asegurable; para viviendas que superan ese límite se exige un 20 % mínimo. Si aportas menos del 20 % de entrada, la ley exige contratar un seguro de impago hipotecario (CMHC) cuya prima se suma normalmente al capital financiado."
  - question: "¿Cómo reducen los pagos quincenales acelerados el plazo y los intereses de una hipoteca canadiense?"
    answer: "En la modalidad quincenal acelerada pagas exactamente la mitad de tu cuota mensual cada catorce días. Como un año tiene 26 períodos quincenales, abonas el equivalente a 13 mensualidades al año en lugar de 12; esa mensualidad adicional amortiza capital directamente, acortando una hipoteca de 25 años en más de tres años y ahorrando decenas de miles de dólares en intereses."
  - question: "¿Qué es la penalización por diferencial de tipos de interés al cancelar anticipadamente una hipoteca fija?"
    answer: "Si cancelas o refinancias una hipoteca canadiense a tipo fijo antes de finalizar su plazo contractual, el banco aplica la mayor entre dos penalizaciones: tres meses de intereses o el diferencial de tipos de interés. Este cálculo compara tu tasa contratada frente a la tasa vigente para el plazo restante y puede representar miles de dólares canadienses si los tipos han bajado."
---

Financiar una vivienda en Toronto, Vancouver, Montreal o Calgary responde a reglas financieras distintas a las del resto del mundo. Usar una calculadora hipotecaria genérica de Estados Unidos o Europa produce cuotas erróneas y sobrestima los intereses porque asume capitalización mensual. En Canadá, la *Ley de Intereses* federal exige que las hipotecas a tipo fijo se capitalicen como máximo **dos veces al año** (capitalización semestral), alterando la tasa efectiva y todo el **cuadro de amortización**.

Nuestra **Calculadora de Hipotecas Canadiense** aplica estrictamente la fórmula legal semestral para estimar tu cuota exacta en dólares canadienses (`CAD $`), la **TAE** real, el recargo del seguro hipotecario, el ahorro de los pagos quincenales acelerados y el desglose entre capital e intereses.

## Ecuaciones de Capitalización Semestral y Cuota Nivelada

Para que una hipoteca fija con pagos mensuales, semimensuales o quincenales cumpla la capitalización semestral, el tipo nominal anual ($r_{\text{nom}}$) debe convertirse primero a la tasa periódica equivalente ($i_m$).

### 1. Tasa Efectiva Anual (TAE) y Tasa Periódica Equivalente

La **TAE** resultante de capitalizar dos veces al año y la tasa efectiva para $m$ pagos anuales son:

$$\text{TAE} = \left(1 + \frac{r_{\text{nom}}}{2}\right)^{2} - 1, \qquad i_{m} = \left(1 + \frac{r_{\text{nom}}}{2}\right)^{\frac{2}{m}} - 1$$

Con pagos mensuales ($m = 12$), el exponente se simplifica a $1/6$, dando $i_{12} = (1 + r_{\text{nom}}/2)^{1/6} - 1$.

### 2. Fórmula de la Cuota Constante (Sistema Francés)

Conocida $i_m$, la cuota nivelada ($C$) que amortiza el préstamo en $N = m \times \text{años}$ vencimientos responde a:

$$C = P \cdot \frac{i_m (1 + i_m)^{N}}{(1 + i_m)^{N} - 1}$$

Definición de variables:

* **$r_{\text{nom}}$:** tipo nominal anual pactado en formato decimal (por ejemplo, `5,50 % = 0,055`).
* **$\text{TAE}$:** tasa anual equivalente efectiva bajo capitalización semestral canadiense.
* **$m$:** frecuencia anual de pagos (`12` mensual, `24` semimensual, `26` quincenal).
* **$i_m$:** tasa de interés efectiva aplicada en cada vencimiento.
* **$P$:** capital hipotecado inicial (precio menos entrada, más la prima del seguro si aplica).
* **$N$ y $C$:** total de cuotas del plazo de amortización e importe fijo de cada cuota periódica.

Además, el sistema canadiense separa el **plazo contractual** (habitualmente 3 o 5 años con tipo garantizado) del **período de amortización** total (hasta 25 años con entrada menor al 20 %, o 30 años con 20 % o más). Toda compra con entrada inferior al 20 % exige un **seguro de impago hipotecario (CMHC)** financiado dentro del préstamo con primas estándar del **4,00 %** (entrada de 5 % a 9,99 %), **3,10 %** (10 % a 14,99 %) o **2,80 %** (15 % a 19,99 %).

## Ejemplo Práctico Paso a Paso: Hipoteca de 500.000 CAD al 5,50 %

Supongamos la compra de una vivienda de **625.000 CAD** aportando un **20 % de entrada** (125.000 CAD, sin seguro CMHC). El capital financiado es **500.000 CAD** al **5,50 % nominal fijo** (`0,055`) con amortización a **25 años** (`300` cuotas mensuales).

1. **TAE efectiva semestral:** $(1 + 0{,}055/2)^2 - 1 = 1{,}0275^2 - 1 = \mathbf{5{,}5756\,\%}$ (frente al **5,6408 %** bajo capitalización mensual).
2. **Tasa mensual efectiva:** $i_{12} = 1{,}0275^{1/6} - 1 \approx \mathbf{0{,}00453168}$ (**0,453168 % mensual**, frente al 0,458333 % mensual estadounidense).
3. **Cuota mensual exacta:**
   $$C = 500.000 \cdot \frac{0{,}00453168 \cdot (1{,}00453168)^{300}}{(1{,}00453168)^{300} - 1} \approx \mathbf{3.051{,}96\text{ CAD}}$$
4. **Cuadro de amortización e intereses acumulados:** en el mes 1 se pagan **2.265,84 CAD** de intereses y se amortizan **786,12 CAD** de capital, bajando el saldo a **499.213,88 CAD**. A tipo constante durante 25 años, los intereses totales ascienden a **415.587,22 CAD**, ahorrando **5.544,01 CAD** frente a capitalización mensual (`3.070,44 CAD`/mes y `421.131,24 CAD` de intereses).

## Tabla Comparativa: Frecuencias de Pago (500.000 CAD al 5,50 %)

La tabla contrasta cuota, intereses acumulados y plazo real según el esquema elegido sobre **500.000 CAD** al **5,50 % nominal** y amortización base de **25 años**:

| Modalidad de Pago | Pagos/Año | Cuota por Período | Intereses Totales | Plazo Real de Cancelación |
| :--- | :--- | :--- | :--- | :--- |
| **Mensual (semestral canadiense)** | 12 | 3.051,96 CAD | 415.587,22 CAD | 25 años exactos |
| **Mensual (capitalización mensual, ref.)** | 12 | 3.070,44 CAD | 421.131,24 CAD | 25 años exactos |
| **Semimensual (canadiense)** | 24 | 1.524,25 CAD | 414.552,28 CAD | 25 años exactos |
| **Quincenal estándar (canadiense)** | 26 | 1.406,88 CAD | 414.472,73 CAD | 25 años exactos |
| **Quincenal acelerada ($C / 2$)** | 26 | 1.525,98 CAD | 343.513,28 CAD | 21 años y 3 meses |

Elegir pagos **quincenales acelerados** (la mitad de la cuota mensual cada catorce días) equivale a abonar **13 mensualidades al año** en lugar de 12: ese pago adicional reduce íntegramente el capital, elimina **3 años y 9 meses** del préstamo y ahorra **72.073,94 CAD** en intereses.

## Errores Comunes y Riesgos en Hipotecas Canadienses

* **Confundir capitalización fija y variable:** mientras las hipotecas a tipo fijo capitalizan semestralmente por ley, gran parte de las hipotecas variables canadienses ligadas a la tasa preferencial bancaria capitalizan mensualmente; revisa siempre tu contrato.
* **Subestimar el riesgo de renovación a los 5 años:** el cuadro a 25 años supone tipo constante como guía, pero al expirar tu plazo contractual deberás renovar el saldo pendiente a las tasas vigentes del mercado.
* **Omitir el coste compuesto del seguro CMHC:** en una vivienda de 500.000 CAD con 10 % de entrada (450.000 CAD base), la prima del 3,10 % añade **13.950 CAD** al principal (463.950 CAD), devengando intereses durante toda la amortización.
* **Ignorar la penalización por cancelación anticipada:** liquidar una hipoteca fija antes de su vencimiento activa la mayor sanción entre tres meses de interés o el diferencial de tipos de interés, que puede costar miles de dólares si las tasas bajaron.
