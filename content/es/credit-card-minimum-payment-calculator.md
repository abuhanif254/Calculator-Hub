---
title: "Calculadora de Pago Mínimo de Tarjeta de Crédito"
metaTitle: "Calculadora de Pago Mínimo de Tarjeta de Crédito y TAE"
description: "Calcula cuántos años tardarás en liquidar tu tarjeta de crédito y cuántos intereses pagarás si solo abonas la cuota mínima mensual frente a un pago fijo."
metaDescription: "Descubre el coste real de pagar solo el mínimo de tu tarjeta de crédito. Compara intereses totales, años de deuda y cuánto ahorras con una cuota fija."
metaKeywords: "calculadora de pago mínimo de tarjeta de crédito, intereses tarjeta revolving, amortización tarjeta de crédito, salir de deudas tarjeta, TAE tarjeta"
faqs:
  - question: "¿Cómo calculan exactamente los bancos el pago mínimo mensual de una tarjeta de crédito?"
    answer: "Las entidades financieras utilizan dos métodos principales en sus contratos: 1) Un porcentaje plano del saldo pendiente al cierre de facturación (habitualmente entre el 2 % y el 3 % del capital dispuesto), o 2) El 1 % del capital principal más el 100 % de los intereses devengados en el mes y posibles comisiones. En ambos casos se aplica un importe mínimo absoluto o suelo (por ejemplo, 20 € o $25-$35 USD) cuando el porcentaje arroja una cifra menor."
  - question: "¿Por qué tardo más de 15 o 20 años en pagar una deuda pequeña si abono el mínimo?"
    answer: "Porque el pago mínimo se recalcula cada mes sobre un saldo ligeramente menor. A medida que tu deuda baja, el banco también reduce tu cuota mensual exigida (por ejemplo, de 120 € pasa a 90 €, luego a 60 € y finalmente al suelo de 25 €), frenando artificialmente la amortización de capital y alargando el préstamo durante décadas."
  - question: "¿Qué ocurre si mi cuota mensual elegida es menor o igual a los intereses del mes?"
    answer: "Se produce el fenómeno de amortización negativa o deuda perpetua. Si debes 4.000 € a un tipo nominal anual (TIN) del 24 % (2 % mensual), tu tarjeta genera 80 € de intereses el primer mes. Si tu cuota configurada es de 75 € o 80 €, ningún céntimo reduce el capital principal y la deuda crece o se vuelve matemáticamente infinita."
  - question: "¿Pierdo el período de gracia sin intereses en nuevas compras si solo pago el mínimo?"
    answer: "Sí. Las tarjetas de crédito solo ofrecen el período de gracia libre de intereses (de 25 a 45 días) cuando liquidas el 100 % del saldo del estado de cuenta anterior (pago a fin de mes). En cuanto dejas saldo pendiente pagando el mínimo, todas las compras nuevas que realices con esa tarjeta empiezan a generar intereses diarios desde el mismo día de la compra."
  - question: "¿Cuál es el truco más sencillo para salir rápido de la deuda sin cambiar de banco?"
    answer: "Sustituye el porcentaje variable del pago mínimo por una cuota fija en euros o dólares que al menos duplique el pago mínimo del primer mes, y no la reduzcas en los meses siguientes. Mantener constante la cuota inicial evita la desaceleración del pago mínimo y suele recortar el plazo total de 18 años a menos de 3 años."
---

La trampa matemática del **pago mínimo en las tarjetas de crédito** (conocidas en España como **tarjetas *revolving*** y en Estados Unidos y Latinoamérica como *revolving credit cards*) está diseñada para maximizar los ingresos por intereses de la entidad emisora. Al exigirte desembolsar únicamente entre el **2 % y el 3 % de tu deuda cada mes**, la cuota parece asumible a corto plazo, pero la mayor parte del recibo mensual se consume en intereses y apenas amortiza una fracción mínima del capital pendiente.

## Cómo Calculan los Bancos la Cuota Mínima Mensual

Al cierre de cada ciclo mensual de facturación, el banco determina tu recibo mínimo aplicando una de estas dos reglas contractuales:

1. **Método del Porcentaje Plano sobre Saldo ($2\%$ al $4\%$)**: Multiplica el saldo dispuesto total por un porcentaje fijo ($p_{\text{min}}$), respetando siempre una **cuota suelo mínima** ($M_{\text{suelo}}$, típicamente de 20 € a 35 $). Si el interés mensual de la tarjeta es del $1,83\%$ ($22\%$ TIN anual) y tu pago mínimo es del $2,00\%$, solo un **$0,17\%$ de tu deuda se amortiza el primer mes**.
2. **Método Compuesto ($1\%$ de Capital + Intereses del Mes)**: Exige abonar el 100 % de los intereses devengados en el ciclo más el 1 % del saldo principal (más comisiones por mora o exceso de límite, si existen), garantizando que el capital principal baje al menos un 1 % mensual antes de nuevas compras.

## Ecuaciones Matemáticas de Amortización de Tarjetas de Crédito

Definamos las variables que gobiernan el cuadro de amortización mes a mes ($t = 1, 2, \dots, N$):
- $B_{t-1}$: Capital pendiente al inicio del mes $t$ (siendo $B_0$ la deuda inicial).
- $\text{TIN}$: Tipo de Interés Nominal anual (o *APR*), de donde resulta la tasa mensual efectiva $i = \frac{\text{TIN}}{12}$ y la Tasa Anual Equivalente $\text{TAE} = (1 + i)^{12} - 1$.
- $p_{\text{min}}$: Porcentaje de pago mínimo mensual estipulado en el contrato.
- $M_{\text{suelo}}$: Importe mínimo absoluto en moneda (por ejemplo, 25 € o dólares).

### 1. Interés Devengado, Pago Mínimo y Nuevo Saldo en el Mes $t$

$$I_t = B_{t-1} \times i$$

$$P_t = \min\Big(B_{t-1} + I_t, \; \max\left(B_{t-1} \times p_{\text{min}}, \, M_{\text{suelo}}\right)\Big)$$

$$B_t = B_{t-1} + I_t - P_t$$

### 2. Fórmula Logarítmica del Plazo ($N$) con Cuota Fija ($C_{\text{fija}}$)

Si en vez de aceptar un pago mínimo decreciente decides abonar una **cuota mensual fija constante** $C_{\text{fija}}$ (siempre que $C_{\text{fija}} > B_0 \cdot i$), el número exacto de meses para liquidar el saldo a cero se calcula mediante:

$$N = -\frac{\ln\left(1 - \frac{B_0 \cdot i}{C_{\text{fija}}}\right)}{\ln(1 + i)}$$

## Caso Práctico Paso a Paso: Deuda de 4.500 € / $4,500 al 21,99 % TIN

Analicemos a **David**, quien acumula un saldo de **4.500 €** (`$4,500 USD`) en su tarjeta con un **TIN / APR del 21,99 % anual** ($\text{TAE} = 24,35\%$), sin realizar compras adicionales. La tasa mensual efectiva es $i = \frac{0,2199}{12} = 0,018325$ (**1,8325 % mensual**).

### Escenario A: David paga solo el mínimo del 2,5 % (suelo de 25 € / $)
- **Mes 1**:
  - Intereses del mes 1 ($I_1$): $4.500 \times 0,018325 = \mathbf{82,46\text{ € / \$}}$.
  - Pago mínimo exigido ($P_1$): $4.500 \times 0,025 = \mathbf{112,50\text{ € / \$}}$.
  - Capital realmente amortizado ($P_1 - I_1$): $112,50 - 82,46 = \mathbf{30,04\text{ € / \$}}$ (el **73,3 %** del recibo se pierde en intereses bancarios).
  - Nuevo saldo pendiente ($B_1$): $4.500 - 30,04 = \mathbf{4.469,96\text{ € / \$}}$.
- **Mes 2**: El nuevo pago mínimo baja a **111,75 € / $** (81,91 € / $ de intereses y solo 29,84 € / $ de amortización de deuda).
- **Resultado acumulado**: Al reducirse la cuota cada mes hasta llegar al suelo de 25 € / $, David tardará **231 meses (19 años y 3 meses)** en saldar la tarjeta y pagará **6.642 € / $ solo en intereses**, desembolsando un total de **11.142 € / $** por una deuda original de 4.500 € / $.

### Escenario B: David fija una cuota constante de 160 € / $ al mes
Aplicando la fórmula logarítmica con $C_{\text{fija}} = 160\text{ € / \$}$:
1. Proporción de interés inicial: $\frac{82,4625}{160} = 0,515391$.
2. Numerador logarítmico: $-\ln(1 - 0,515391) = -\ln(0,484609) = 0,724413$.
3. Denominador logarítmico: $\ln(1,018325) = 0,018159$.
4. **Plazo total ($N$)**: $N = \frac{0,724413}{0,018159} = \mathbf{39,89\text{ meses (3 años y 4 meses)}}$.
5. **Intereses totales pagados**: $(39,89 \times 160) - 4.500 = \mathbf{1.882\text{ € / \$}}$.

Con solo fijar su recibo mensual en 160 € / $ (47,50 € / $ más que la primera cuota mínima), David **recorta 15 años y 11 meses de deuda** y **ahorra 4.760 € / $ en intereses**.

## Tabla Comparativa: Coste de 5.000 € / $5,000 de Deuda (al 22 % TIN)

Impacto de cinco estrategias para liquidar **5.000 € / $** al **22,00 % TIN** ($1,833\%$ mensual, suelo mínimo de 25 € / $):

|Estrategia de Pago|Cuota Mes 1|Tiempo Total|Intereses Pagados|Total Pagado|Ahorro vs. Mínimo 2 %|
|:---|:---|:---|:---|:---|:---|
|**Pago Mínimo 2,0 % (decreciente)**|100,00 €/$|**367 meses (30,6 años)**|**14.318 €/$**|19.318 €/$|— *(Referencia base)*|
|**Pago Mínimo 3,0 % (decreciente)**|150,00 €/$|**178 meses (14,8 años)**|**4.685 €/$**|9.685 €/$|**+9.633 €/$ ahorrados**|
|**Cuota Fija de 150 €/$**|150,00 €/$|**50 meses (4,2 años)**|**2.463 €/$**|7.463 €/$|**+11.855 €/$ ahorrados**|
|**Cuota Fija de 250 €/$**|250,00 €/$|**25 meses (2,1 años)**|**1.203 €/$**|6.203 €/$|**+13.115 €/$ ahorrados**|
|**Transferencia 0 % (18 meses)**|277,78 €/$|**18 meses (1,5 años)**|**150 €/$** *(comisión 3 %)*|5.150 €/$|**+14.168 €/$ ahorrados**|

## Estrategias Prácticas para Salir de la Deuda Revolving

- **Cambia en tu banca online de «Porcentaje» a «Importe Fijo»**: Configura hoy mismo una cantidad fija mensual en euros o dólares que supere al menos el doble de los intereses mensuales que aparecen en tu extracto bancario.
- **No utilices la tarjeta mientras amortizas saldo**: Si realizas compras nuevas en una tarjeta con saldo aplazado, pierdes el período de gracia y pagas intereses diarios desde el primer día sobre cada compra cotidiana.
- **Refinancia mediante transferencia de saldo (*Balance Transfer*) o préstamo personal**: Si tu tarjeta supera el 20 % TAE, trasladar la deuda a una promoción al 0 % APR (con comisión inicial del 3 %) o a un préstamo personal bancario al 7 %–9 % TAE reduce más del 70 % de la factura de intereses.
