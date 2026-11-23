---
title: "Calculadora APR (Tasa Anual Equivalente)"
metaTitle: "Calculadora APR | Conoce el Costo Financiero Total Real"
description: "Calcula la Tasa de Porcentaje Anual (APR) real de préstamos hipotecarios, vehiculares y personales considerando comisiones de apertura, seguros y costos de cierre."
metaDescription: "Calcula la Tasa Anual Equivalente (APR) real de cualquier crédito. Compara la tasa de interés nominal contra comisiones y cargos de apertura."
metaKeywords: "calculadora apr, tasa anual equivalente, calcular tae, costo financiero total, comparar tasas prestamos, apr vs tasa de interes nominal"
faqs:
  - question: "¿En qué se diferencia el Tipo de Interés Nominal (TIN) del APR o la TAE?"
    answer: "El Tipo de Interés Nominal (TIN) refleja únicamente el porcentaje que la entidad financiera cobra como remuneración por el capital prestado, sin considerar la frecuencia de capitalización ni los gastos asociados. El APR (Annual Percentage Rate) y la TAE (Tasa Anual Equivalente) integran dentro de un solo indicador anualizado tanto los intereses nominales como las comisiones de apertura, gastos de estudio y costos obligatorios de formalización."
  - question: "¿Cuál es la diferencia matemática entre el APR estadounidense y la TAE europea?"
    answer: "Ambos indicadores parten de hallar la tasa interna de retorno periódica (por ejemplo, mensual) que iguala el capital neto recibido con el valor presente de las cuotas. Sin embargo, el APR multiplica esa tasa efectiva mensual por 12 (anualización simple o proporcional), mientras que la TAE europea y el CAT mexicano elevan (1 más la tasa mensual) a la potencia 12 y restan 1, incorporando el efecto del interés compuesto mes a mes."
  - question: "¿Por qué un préstamo a corto plazo con comisión de apertura tiene un APR mucho más alto que uno a largo plazo?"
    answer: "Porque los gastos fijos iniciales (como una comisión de apertura del 2 %) se reparten únicamente durante la vida del crédito. En un préstamo personal a 12 o 24 meses, ese cargo inicial se amortiza en muy poco tiempo, elevando drásticamente la tasa efectiva anualizada; en una hipoteca a 25 o 30 años, el mismo porcentaje inicial se diluye a lo largo de cientos de cuotas mensuales."
  - question: "¿Conviene pagar puntos de descuento o comisiones iniciales para reducir la tasa de interés nominal?"
    answer: "Solo resulta rentable si mantienes el préstamo durante un tiempo superior al punto de equilibrio financiero (break-even point). Si pagas una comisión inicial elevada a cambio de rebajar el TIN en 0,25 puntos porcentuales, pero cancelas, vendes el inmueble o refinancias el crédito a los tres años, no habrás acumulado suficiente ahorro en cuotas mensuales para compensar el desembolso inicial, y tu APR efectivo real habrá sido mucho mayor."
  - question: "¿Puede el APR ser igual a la tasa de interés nominal?"
    answer: "Sí. En el estándar estadounidense (APR simple), cuando un préstamo no cobra absolutamente ninguna comisión de apertura, gasto de originación, seguro obligatorio vinculado ni cargo administrativo de cierre, la tasa efectiva mensual coincide exactamente con la tasa nominal mensual y el APR es idéntico al TIN. En el estándar TAE, incluso sin comisiones, la TAE será ligeramente superior al TIN debido a la capitalización mensual."
---

Al evaluar ofertas de préstamos hipotecarios, créditos automotrices o financiación personal, fijarse únicamente en el **Tipo de Interés Nominal (TIN)** conduce con frecuencia a decisiones financieras subóptimas. Una entidad bancaria puede publicitar un tipo nominal aparentemente bajo, pero exigir comisiones de apertura, gastos de originación, costos de tasación o seguros vinculados que encarecen de forma sustancial el financiamiento.

La **Tasa de Porcentaje Anual (APR)** —y su homóloga compuesta en España y Latinoamérica, la **Tasa Anual Equivalente (TAE)** o **Costo Anual Total (CAT)**— sintetiza el interés nominal y todos los cargos obligatorios de formalización en una única tasa porcentual anualizada, permitiendo comparar préstamos heterogéneos bajo una misma base matemática.

## Fórmulas Financieras para el Cálculo del APR y la TAE

El cálculo riguroso de la tasa anual real de un préstamo amortizable mediante cuotas periódicas constantes (sistema de amortización francés) se desarrolla en cuatro etapas secuenciales.

### 1. Cuota Periódica Contractual ($C$) y Capital Neto Recibido ($P_{\text{neto}}$)

Primero se determina el pago periódico ($C$, habitualmente mensual, con $m = 12$ pagos al año) sobre el capital nominal solicitado ($P$) aplicando la tasa nominal por período ($i_{\text{nom}} = \frac{\text{TIN}}{m}$) durante $n$ pagos totales:

$$C = P \cdot \frac{i_{\text{nom}} (1 + i_{\text{nom}})^n}{(1 + i_{\text{nom}})^n - 1}$$

A continuación, se descuentan del principal nominal ($P$) todos los gastos iniciales obligatorios de apertura, estudio, originación y cierre ($G_0$) retenidos o abonados al formalizar el préstamo para hallar el capital neto efectivamente recibido:

$$P_{\text{neto}} = P - G_0$$

### 2. Ecuación de Equivalencia Financiera y Anualización (APR vs. TAE)

Se calcula la tasa interna de retorno periódica ($i_{\text{ef}}$) que iguala el capital neto disponible ($P_{\text{neto}}$) con el valor actual de las $n$ cuotas periódicas ($C$):

$$P_{\text{neto}} = \sum_{t=1}^{n} \frac{C}{(1 + i_{\text{ef}})^t} = C \cdot \frac{1 - (1 + i_{\text{ef}})^{-n}}{i_{\text{ef}}}$$

Dado que $i_{\text{ef}}$ no puede despejarse algebraicamente de forma directa para $n > 4$, se resuelve por iteración numérica (método de Newton-Raphson) y se anualiza según la normativa aplicable:

$$\text{APR (Estándar EE. UU.)} = i_{\text{ef}} \times m, \qquad \text{TAE (Estándar Europeo / CAT)} = (1 + i_{\text{ef}})^m - 1$$

Donde:
* $P$: importe nominal del préstamo solicitado.
* $G_0$: suma de comisiones de apertura, costos de cierre y cargos obligatorios iniciales.
* $n$: número total de cuotas durante la vida del crédito ($n = \text{años} \times m$).
* $m$: frecuencia de pagos por año ($m = 12$ para cuotas mensuales).

## Ejemplo Práctico Paso a Paso: Hipoteca de 200 000 € con Comisiones

Un comprador solicita un préstamo hipotecario con las siguientes condiciones:
* **Importe nominal ($P$)**: $200\,000\text{ €}$
* **Tipo de Interés Nominal ($\text{TIN}$)**: $4,50\,\%$ anual ($i_{\text{nom}} = 0,045 / 12 = 0,00375$)
* **Plazo de amortización**: $20\text{ años}$ ($n = 240\text{ cuotas mensuales}$, $m = 12$)
* **Comisión de apertura y gastos de formalización ($G_0$)**: $4\,000\text{ €}$ ($2,00\,\%$ del capital)

1. **Calcular la cuota mensual constante ($C$)**:
   Con $(1 + 0,00375)^{240} = 2,455466$, sustituimos en la fórmula de amortización francesa:
   $$C = 200\,000 \times \frac{0,00375 \times 2,455466}{2,455466 - 1} = 1\,265,30\text{ € al mes}$$
2. **Determinar el capital neto recibido ($P_{\text{neto}}$)**:
   $$P_{\text{neto}} = 200\,000\text{ €} - 4\,000\text{ €} = 196\,000\text{ €}$$
3. **Hallar la tasa efectiva mensual ($i_{\text{ef}}$)**:
   Igualando $196\,000\text{ €}$ al valor actual de $240\text{ pagos}$ de $1\,265,30\text{ €}$, la resolución numérica arroja $i_{\text{ef}} = 0,0039534$ ($0,39534\,\%\text{ mensual}$).
4. **Obtener el APR y la TAE anualizados**:
   * **APR anual**: $\text{APR} = 0,0039534 \times 12 = 0,04744 \approx \mathbf{4,74\,\%}$ ($24$ puntos básicos por encima del TIN).
   * **TAE compuesta**: $\text{TAE} = (1 + 0,0039534)^{12} - 1 = 0,04848 \approx \mathbf{4,85\,\%}$.
   * **Desembolso total**: $(240 \times 1\,265,30\text{ €}) + 4\,000\text{ €} = \mathbf{307\,672\text{ €}}$ ($103\,672\text{ €}$ en intereses más $4\,000\text{ €}$ en cargos iniciales).

## Tabla Comparativa: Impacto de las Comisiones y el Plazo en un Crédito de 100 000 €

La siguiente tabla muestra cómo una misma comisión inicial altera drásticamente el APR y la TAE según el plazo del préstamo, y cómo comparar ofertas con distinto TIN:

| Escenario ($P = 100\,000\text{ €}$) | Plazo | TIN Anual | Gastos ($G_0$) | Cuota Mensual | APR Real | TAE Compuesta | Costo Financiero Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Oferta A (Hipoteca con comisión)** | $15\text{ años}$ | $5,00\,\%$ | $3\,000\text{ €}$ | $790,79\text{ €}$ | **$5,46\,\%$** | **$5,60\,\%$** | $45\,342,85\text{ €}$ |
| **Oferta B (Hipoteca sin comisión)** | $15\text{ años}$ | $5,30\,\%$ | $0\text{ €}$ | $806,57\text{ €}$ | **$5,30\,\%$** | **$5,43\,\%$** | $45\,182,78\text{ €}$ |
| **Oferta C (Préstamo a 5 años)** | $5\text{ años}$ | $5,00\,\%$ | $3\,000\text{ €}$ | $1\,887,12\text{ €}$ | **$6,27\,\%$** | **$6,45\,\%$** | $16\,227,40\text{ €}$ |
| **Oferta D (Crédito a 2 años)** | $2\text{ años}$ | $5,00\,\%$ | $3\,000\text{ €}$ | $4\,387,14\text{ €}$ | **$8,14\,\%$** | **$8,45\,\%$** | $8\,291,34\text{ €}$ |

Entre la **Oferta A** ($5,00\,\%$ TIN con $3\,000\text{ €}$ de comisión) y la **Oferta B** ($5,30\,\%$ TIN sin comisiones), la Oferta B resulta financieramente más barata tanto en APR ($5,30\,\%$ frente a $5,46\,\%$) como en costo total desembolsado.

## Claves para Comparar Préstamos y Evitar Trampas Financieras

* **El riesgo de amortización o cancelación anticipada**: el APR oficial asume que usted mantendrá el préstamo durante todo el plazo contractual. Si contrata una hipoteca a 30 años pagando $4\,000\text{ €}$ de comisión inicial para rebajar el TIN, pero vende el inmueble o refinancia al quinto año, esos $4\,000\text{ €}$ se habrán amortizado en solo 60 meses en vez de 360, disparando su APR efectivo real.
* **Comisiones deducidas frente a comisiones financiadas**: cuando el banco suma las comisiones de apertura al principal del préstamo ($P + G_0$) para que no tenga que abonarlas al firmar, usted pasa a pagar intereses compuestos mensuales sobre las propias comisiones durante toda la vigencia del crédito.
* **Productos vinculados o bonificados**: antes de aceptar una rebaja de $0,25$ puntos en el TIN a cambio de contratar seguros de vida o de protección de pagos con el banco, incorpore el sobrecosto anual de dichas pólizas como gasto periódico; con frecuencia, contratar un seguro independiente en el mercado libre y asumir un TIN sin bonificar ofrece una TAE real menor.
