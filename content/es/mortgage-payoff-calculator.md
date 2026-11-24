---
title: "Calculadora de Pago Anticipado de Hipoteca"
metaTitle: "Calculadora de Pago Anticipado de Hipoteca | Ahorro Real"
description: "Calcula cuánto tiempo e intereses ahorras al amortizar capital extra, pagar cada dos semanas o refinanciar tu hipoteca con cuadro de amortización."
metaDescription: "Calcula cuánto plazo e intereses ahorras al amortizar tu hipoteca con pagos extra, esquema quincenal o subrogación en EUR o USD paso a paso."
metaKeywords: "calculadora pago anticipado hipoteca, amortización anticipada hipoteca, pagos extras a capital, pagos quincenales hipoteca, ahorro intereses hipoteca, subrogación hipotecaria, cuadro de amortización"
faqs:
  - question: "¿Conviene amortizar capital para reducir plazo o para reducir la cuota mensual?"
    answer: "Matemáticamente, reducir el plazo genera siempre un ahorro total en intereses superior, porque mantiene la misma capacidad de pago mensual mientras elimina meses completos de devengo sobre el saldo vivo. Reducir la cuota, en cambio, resulta preferible cuando necesitas aliviar de inmediato la carga mensual del presupuesto familiar o crear margen frente a una hipoteca variable."
  - question: "¿Cómo funciona el esquema de pagos quincenales acelerados en una hipoteca?"
    answer: "Consiste en abonar la mitad de tu cuota mensual cada dos semanas. Como el año tiene 52 semanas, efectúas 26 medios pagos, equivalentes a 13 cuotas mensuales completas en lugar de 12. Esa cuota adicional anual se aplica íntegra a capital —equivalente a sumar un doceavo de la cuota cada mes— y suele recortar entre 3 y 5 años en hipotecas largas."
  - question: "¿En qué momento de la vida del préstamo ahorra más intereses un abono extraordinario?"
    answer: "Durante los primeros años del cuadro de amortización francés, cuando el capital pendiente es más alto y los intereses representan la mayor porción de cada recibo. Un pago único de 15.000 € en el primer año evita que ese capital devengue intereses compuestos durante más de dos décadas, generando un ahorro muy superior al mismo aporte en los últimos cinco años."
  - question: "¿Qué comisiones pueden limitar la rentabilidad de amortizar anticipadamente?"
    answer: "En España, la Ley de Contratos de Crédito Inmobiliario fija topes legales a la comisión por reembolso anticipado —hasta el 2 % en tipo fijo los primeros diez años y el 1,5 % después, o 0,25 % a 0,15 % en tipo variable—, mientras que en Latinoamérica varían según el contrato y la normativa local. Conviene restar esa comisión del ahorro proyectado antes de ejecutar la operación."
  - question: "¿Cuándo resulta más rentable refinanciar o subrogar que hacer pagos extra?"
    answer: "La refinanciación o subrogación destaca cuando logras rebajar el TIN de forma sustancial y planeas conservar la vivienda más allá del punto de equilibrio en que recuperas los gastos de tasación, notaría y comisión de cancelación. Si ya te quedan pocos años o no superas ese umbral de recuperación, los abonos extraordinarios directos suelen rendir más sin costes de formalización."
---

Una hipoteca a 25 o 30 años suele acumular en intereses más de la mitad del capital prestado. Sin embargo, cada euro o dólar que adelantas al principal reduce desde el mes siguiente la base sobre la que el banco calcula intereses, acortando años del **cuadro de amortización** con un efecto acumulativo inmediato.

Esta **Calculadora de Pago Anticipado de Hipoteca** simula en `EUR €` o `USD $` tu crédito bajo el sistema francés de cuota fija. Compara abonos extra mensuales, aportaciones anuales, un pago único extraordinario, el **esquema quincenal acelerado** y una **refinanciación o subrogación** con sus gastos de cierre y punto de equilibrio.

## Ecuaciones de Amortización Acelerada y Refinanciación

### 1. Cuota Base y Evolución Mensual del Saldo Vivo

Para un capital pendiente $P$, un Tipo de Interés Nominal anual (**TIN**), tasa mensual $r = \text{TIN} / 12$ y $n = 12t$ mensualidades restantes ($t$ años), la cuota fija ordinaria $C$ y la TAE sin comisiones son:

$$C = P \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}, \qquad \text{TAE}_{\text{pura}} = (1 + r)^{12} - 1$$

Con amortización acelerada, en cada mes $k$ el interés devengado vale $I_k = S_{k-1} \cdot r$, la amortización ordinaria es $A_k = C - I_k$ y el saldo vivo desciende según el abono extraordinario $E_k$:

$$S_k = \max\!\left(0,\; S_{k-1} - A_k - E_k\right), \qquad E_k = E_m + E_{\text{quinc}} + E_{\text{anual}}\,\mathbf{1}_{12 \mid k} + E_{\text{único}}\,\mathbf{1}_{k = k_0}$$

En el esquema quincenal acelerado (26 medios pagos al año = 13 cuotas completas), el equivalente mensual extra es $E_{\text{quinc}} = C / 12$.

### 2. Plazo Exacto con Abono Mensual y Punto de Equilibrio al Refinanciar

Cuando solo se añade un aporte mensual constante $E_m$, el número exacto de cuotas $n'$ y el punto de equilibrio $n_{\text{eq}}$ de una refinanciación con nueva cuota $C_{\text{nueva}}$ y gastos de cierre $G_{\text{cierre}}$ son:

$$n' = \frac{-\ln\!\left(1 - \frac{P \cdot r}{C + E_m}\right)}{\ln(1 + r)}, \qquad n_{\text{eq}} = \left\lceil \frac{G_{\text{cierre}}}{C - C_{\text{nueva}}} \right\rceil, \qquad \text{Ahorro}_{\text{neto}} = I_{\text{est}} - I_{\text{refi}} - G_{\text{cierre}}$$

Donde:

* **$P$ y $S_k$:** capital pendiente inicial y saldo vivo tras la cuota $k$.
* **$r$, $n$ y $n'$:** tipo mensual, cuotas restantes estándar y cuotas tras acelerar pagos.
* **$C$ y $C_{\text{nueva}}$:** cuota mensual ordinaria actual y cuota tras refinanciar.
* **$E_m$, $E_{\text{anual}}$ y $E_{\text{único}}$:** abonos mensuales, anuales y pago puntual en el mes $k_0$.
* **$I_{\text{est}}$, $I_{\text{refi}}$ y $G_{\text{cierre}}$:** intereses estándar, intereses refinanciados y costes de cierre.

## Ejemplo Práctico Paso a Paso: 200.000 € al 4,20 % TIN (25 Años)

Supongamos una hipoteca con saldo pendiente **$P = 200.000\text{ €}$**, **$t = 25\text{ años}$** ($n = 300$ cuotas) y **$\text{TIN} = 4{,}20\,\%$** ($r = 0{,}0035$ exacto; TAE pura del `4,28 %`). Calculemos el impacto de añadir **$E_m = 200\text{ €/mes}$** a capital:

1. **Cuota base y coste estándar:** con $(1{,}0035)^{300} = \mathbf{2{,}852417}$:
   $$C = 200.000 \cdot \frac{0{,}0035 \times 2{,}852417}{2{,}852417 - 1} = \mathbf{1.077{,}88\text{ €/mes}}$$
   Sin pagos extra desembolsarías `323.365,39 €`, incluidos **`123.365,39 €`** en intereses.
2. **Inicio del cuadro acelerado:**
   * **Mes 1:** intereses de $200.000 \times 0{,}0035 = \mathbf{700{,}00\text{ €}}$; amortización ordinaria de `377,88 €` más **`200,00 €`** extra; saldo de **`199.422,12 €`**.
   * **Mes 2:** intereses de $199.422{,}12 \times 0{,}0035 = \mathbf{697{,}98\text{ €}}$ (`0,70 €` menos frente al plan base); amortización de `379,91 €` más `200,00 €` extra; saldo de **`198.842,21 €`**.
3. **Plazo exacto con $C' = 1.277{,}88\text{ €}$:**
   $$n' = \frac{-\ln\!\left(1 - \frac{700}{1.277{,}8846}\right)}{\ln(1{,}0035)} = \mathbf{227{,}14\text{ meses}} \implies \mathbf{228\text{ cuotas (19 años)}}$$
4. **Ahorro total:** los intereses descienden a **`90.253,53 €`**, ahorrando **`33.111,86 €`** y **`6 años`** (`72` cuotas).

## Tabla Comparativa de Estrategias (200.000 € al 4,20 % TIN)

| Estrategia de Pago Anticipado | Plazo Final | Tiempo Ahorrado | Intereses Totales | Ahorro en Intereses |
| :--- | :--- | :--- | :--- | :--- |
| **Plan estándar (1.077,88 €/mes)** | 25 años 0 meses | — | 123.365,39 € | 0,00 € |
| **Pago quincenal acelerado (+89,82 €/mes eq.)** | 21 años 10 meses | 3 años 2 meses | 105.790,93 € | 17.574,46 € |
| **Pago único de 15.000 € (mes 12)** | 22 años 1 mes | 2 años 11 meses | 99.781,16 € | 23.584,23 € |
| **Abono anual de +2.500 €/año** | 19 años 0 meses | 6 años 0 meses | 90.638,59 € | 32.726,80 € |
| **Abono extra de +200 €/mes** | 19 años 0 meses | 6 años 0 meses | 90.253,53 € | 33.111,86 € |
| **Combinado (+200 €/mes y +1.500 €/año)** | 16 años 7 meses | 8 años 5 meses | 78.168,27 € | 45.197,12 € |
| **Refinanciación 3,30 % a 25 años (3.000 € gastos)** | 25 años 0 meses | 0 meses *(cuota 979,92 €)* | 93.976,94 € | 26.388,45 € *(neto)* |

Aportar `200 €/mes` (`2.400 €/año`) ahorra **`385,06 €` más** que entregar `2.500 €` al cierre de cada año porque reduce el principal once meses antes. En la refinanciación al `3,30 %`, bajar la cuota en `97,96 €/mes` sitúa el punto de equilibrio en el **mes 31**.

## Errores Habituales al Amortizar tu Hipoteca

* **No exigir aplicación directa al capital:** algunos bancos imputan pagos extra como adelanto de recibos futuros; ordena siempre amortización parcial de capital con reducción de plazo.
* **Vaciar tu fondo de emergencia:** inmovilizar liquidez en el inmueble te deja expuesto a imprevistos; conserva primero de 3 a 6 meses de gastos esenciales.
* **Amortizar antes de cancelar deudas más caras:** liquidar tarjetas al `20 %` TAE o préstamos personales al `8 %` supera siempre el ahorro de una hipoteca al `4 %`.
* **Omitir comisiones y ventajas fiscales:** descuenta la comisión contractual por reembolso anticipado y revisa los límites anuales si aplicas deducciones históricas por vivienda habitual.
* **Reiniciar el plazo al subrogar:** sustituir 16 años pendientes por una hipoteca nueva a 25 años puede elevar el interés total pese a un TIN menor.
