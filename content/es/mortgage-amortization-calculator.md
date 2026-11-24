---
title: "Calculadora de Amortización de Hipoteca"
metaTitle: "Calculadora de Amortización de Hipoteca | Cuadro Anual"
description: "Calcula la cuota fija de tu hipoteca y consulta el cuadro de amortización mensual y anual con el desglose exacto de capital, intereses y saldo pendiente."
metaDescription: "Genera el cuadro de amortización de tu hipoteca mes a mes. Analiza el reparto entre capital e intereses, el punto de inflexión y compara 15, 20 y 30 años."
metaKeywords: "calculadora amortización hipoteca, cuadro de amortización hipotecaria, tabla pagos hipoteca, capital e intereses hipoteca, sistema francés, amortización anticipada"
faqs:
  - question: "¿En qué momento de una hipoteca fija a 30 años empiezo a amortizar más capital que intereses?"
    answer: "El mes exacto depende únicamente del plazo y del tipo de interés nominal (TIN). En una hipoteca a 30 años con un 4,50 % TIN, el punto de inflexión se produce en el mes 176 (año 14 y 8 meses), cuando la amortización de capital supera por primera vez a la partida de intereses dentro de la cuota fija mensual."
  - question: "¿Qué diferencia existe entre el TIN utilizado en el cuadro de amortización y la TAE hipotecaria?"
    answer: "El Tipo de Interés Nominal (TIN) es el porcentaje pactado con el banco para calcular exactamente tu cuota mensual y cada fila de la tabla de amortización. La Tasa Anual Equivalente (TAE), en cambio, integra además comisiones de apertura, gastos de tasación y seguros vinculados para permitirte comparar el coste real entre distintas ofertas."
  - question: "¿Cómo varía el cuadro de amortización en una hipoteca variable referenciada al Euríbor o la TIIE?"
    answer: "En una hipoteca a tipo variable, el cuadro de amortización se recalcula en cada fecha de revisión (semestral o anual) tomando como nuevo principal el saldo vivo pendiente en ese momento, el plazo remanente y el nuevo tipo de interés actualizado. Si el índice sube, crece la cuota mensual y aumenta la proporción destinada a intereses."
  - question: "¿Ahorra más intereses amortizar hipoteca reduciendo plazo o reduciendo cuota?"
    answer: "Reducir el plazo genera un ahorro de intereses sustancialmente mayor porque elimina mensualidades completas del tramo final y acorta el tiempo de devengo sobre la deuda viva. Reducir la cuota, en cambio, conserva el mismo horizonte temporal y resulta útil solo si priorizas rebajar tu compromiso financiero mensual."
  - question: "¿Qué ocurre con el saldo pendiente si vendo la vivienda antes de que venza la hipoteca?"
    answer: "En la fecha de compraventa únicamente debes cancelar el saldo vivo de capital pendiente que figura en ese mes del cuadro de amortización (más los intereses devengados desde la última cuota y la eventual comisión de cancelación anticipada), nunca los intereses futuros no transcurridos."
---

El **cuadro de amortización de una hipoteca** desglosa mes a mes y año a año cómo cada recibo bancario extingue la deuda contraída para comprar una vivienda. En España, Latinoamérica y Estados Unidos, la práctica totalidad de las hipotecas residenciales opera bajo el **sistema de amortización francés**, que mantiene una cuota constante mientras el tipo de interés permanece fijo.

Aunque el recibo mensual no varíe, su reparto interno cambia radicalmente con el tiempo: en los primeros años predominan los intereses sobre un capital todavía elevado, mientras la reducción de deuda avanza con lentitud. Examinar este calendario —en euros (€) o dólares estadounidenses (USD)— resulta esencial para comparar plazos de 15, 20 o 30 años, planificar amortizaciones anticipadas y conocer el saldo exacto de cancelación en caso de venta o subrogación.

## Ecuaciones del Cuadro de Amortización Hipotecario

Para una hipoteca de capital inicial $P$, Tipo de Interés Nominal anual ($\text{TIN}$) y $n$ mensualidades, la tasa mensual efectiva es $i = \frac{\text{TIN}}{12 \times 100}$ y la **cuota mensual fija** ($M$) es:

$$M = P \cdot \frac{i(1 + i)^n}{(1 + i)^n - 1}$$

### 1. Recurrencia mensual y saldo vivo cerrado

Para cualquier mes $k$ (de $1$ a $n$), los intereses ($I_k$), el capital amortizado ($A_k$) y el saldo pendiente ($S_k$) derivan del saldo del período previo ($S_{k-1}$, con $S_0 = P$):

$$I_k = S_{k-1} \cdot i, \qquad A_k = M - I_k, \qquad S_k = S_{k-1} - A_k$$

El saldo vivo en cualquier mes futuro $k$ también se calcula directamente sin iterar:

$$S_k = P \cdot \frac{(1 + i)^n - (1 + i)^k}{(1 + i)^n - 1}$$

### 2. Punto de inflexión hipotecario ($k^*$)

Como la amortización crece geométricamente según $A_k = \frac{M}{(1 + i)^{n - k + 1}}$, el primer mes en que el capital amortizado supera a los intereses ($A_k > I_k$) viene dado por:

$$k^* = \max\!\left(1,\; \left\lceil n + 1 - \frac{\ln 2}{\ln(1 + i)} \right\rceil\right)$$

Definición de variables:

* **$P$:** Principal hipotecario financiado tras descontar la entrada o enganche.
* **$i$ y $n$:** Tasa mensual efectiva ($\text{TIN} / 1.200$) y número total de recibos mensuales.
* **$I_k$, $A_k$ y $S_k$:** Interés, amortización de capital y deuda viva correspondientes al mes $k$.
* **$k^*$:** Mes de inflexión a partir del cual más del 50 % de cada cuota reduce deuda.

## Ejemplo Numérico Paso a Paso: Hipoteca de 250.000 € al 4,50 % a 30 Años

Evaluemos una hipoteca fija de **250.000,00 €** al **4,50 % TIN anual** con un plazo de **30 años** (360 mensualidades).

1. **Tasa mensual y cuota constante ($M$):**
   $$i = \frac{4,50}{12 \times 100} = 0,00375, \qquad (1 + 0,00375)^{360} \approx 3,84769805$$
   $$M = 250.000 \times \frac{0,00375 \times 3,84769805}{3,84769805 - 1} = 1.266,71\text{ €/mes}$$
2. **Desglose de los primeros recibos y de la mitad del plazo:**
   * **Mes 1:** Los intereses suman 937,50 € (74,0 % de la cuota), el capital amortizado es de 329,21 € y el saldo vivo desciende a 249.670,79 €.
   * **Mes 2:** Al reducirse la deuda, los intereses bajan a 936,27 €, la amortización asciende a 330,45 € y el saldo queda en 249.340,34 €.
   * **Mes 180 (Año 15):** A mitad exacta del contrato todavía se deben **165.584,89 €** (el **66,2 %** del principal), pero ya se han pagado **143.593,28 €** en intereses (69,7 % del total).
3. **Punto de inflexión y coste acumulado:**
   $$k^* = \left\lceil 361 - \frac{0,693147}{0,003743} \right\rceil = \lceil 175,81 \rceil = \text{Mes } 176$$
   En el **mes 176** (año 14 y 8 meses), los intereses caen a 632,92 € mientras el capital amortizado alcanza por primera vez 633,80 €. Tras 360 cuotas, el desembolso acumulado suma **456.016,78 €**, incluyendo **206.016,78 €** de intereses.

## Comparativa de Amortización Hipotecaria: 15, 20, 25 y 30 Años

La tabla contrasta la evolución de la misma hipoteca de **250.000 € al 4,50 % TIN** en cuatro plazos habituales:

| Plazo | Cuota Mensual | Interés Mes 1 | Capital Mes 1 | Punto de Inflexión | Intereses Totales | Desembolso Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **15 años (180)** | 1.912,48 € | 937,50 € | 974,98 € | Mes 1 | 94.246,98 € | 344.246,98 € |
| **20 años (240)** | 1.581,62 € | 937,50 € | 644,12 € | Mes 56 | 129.589,63 € | 379.589,63 € |
| **25 años (300)** | 1.389,58 € | 937,50 € | 452,08 € | Mes 116 | 166.874,36 € | 416.874,36 € |
| **30 años (360)** | 1.266,71 € | 937,50 € | 329,21 € | Mes 176 | 206.016,78 € | 456.016,78 € |

La palanca de las amortizaciones voluntarias es extraordinaria: añadir **150,00 € extra al mes** directamente a capital en la hipoteca a 30 años elimina **70 mensualidades** (5 años y 10 meses menos) y ahorra **45.743,43 €** en intereses, manteniendo la seguridad de una cuota contractual más baja.

## Aspectos Críticos y Errores Comunes al Analizar tu Hipoteca

* **Confundir la cuota hipotecaria con el coste total de la vivienda:** El cuadro cubre únicamente capital e intereses; impuestos inmobiliarios (IBI o predial), seguros de hogar y vida vinculados y comunidad de propietarios se pagan aparte y añaden entre un 15 % y un 25 % al gasto mensual.
* **Simular recibos con la TAE en vez del TIN:** La TAE sirve para comparar ofertas entre bancos integrando gastos y comisiones, pero el calendario de pagos real se calcula exclusivamente con el **TIN** pactado.
* **Amortizar anticipadamente demasiado tarde:** En el año 20 de la hipoteca de 250.000 € a 30 años ya se ha pagado el **85,5 %** de todos los intereses (176.235,49 €). El mayor ahorro de los pagos extra se concentra en la primera década.
* **Pasar por alto comisiones de cancelación anticipada:** Antes de realizar reembolsos extraordinarios en hipotecas fijas, revisa en la escritura las comisiones vigentes y sus topes legales para comprobar que el ahorro neto de intereses supera cualquier penalización.
