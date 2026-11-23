---
title: "Calculadora de Pago de Tarjeta de Crédito"
metaTitle: "Calculadora de Pago de Tarjeta de Crédito | Plazo y Cuotas"
description: "Calcula el plazo exacto para liquidar la deuda de tu tarjeta de crédito o la cuota mensual necesaria para saldarla antes, con desglose completo de intereses."
metaDescription: "Calcula gratis cuándo liquidarás tu tarjeta de crédito, qué cuota mensual necesitas y cuántos intereses ahorras frente al pago mínimo revolving."
metaKeywords: "calculadora pago tarjeta de crédito, liquidar deuda tarjeta, intereses tarjeta revolving, TAE tarjeta de crédito, cuadro de amortización, método avalancha"
faqs:
  - question: "¿Qué ocurre si mi pago mensual es igual o inferior a los intereses del primer mes?"
    answer: "Cuando tu cuota mensual no supera los intereses devengados en el primer ciclo, el saldo vivo nunca desciende y se produce amortización negativa o deuda perpetua. Para comenzar a reducir el capital insoluto, el pago mensual debe ser estrictamente mayor que el producto del saldo inicial por la tasa periódica mensual."
  - question: "¿Cuál es la diferencia entre el TIN, la TAE y el CAT en una tarjeta de crédito?"
    answer: "El TIN (Tipo de Interés Nominal) refleja el interés puro anual y se divide entre doce para calcular el interés mensual sobre el saldo pendiente. La TAE en España y el CAT en Latinoamérica expresan el coste efectivo anual e incorporan la capitalización periódica y comisiones obligatorias. Para modelar el recibo mensual exacto conviene introducir el TIN contractual y contrastar el coste global con la TAE o el CAT."
  - question: "¿Por qué el pago mínimo de una tarjeta revolving alarga tanto la deuda?"
    answer: "Las tarjetas de pago aplazado o revolving fijan cuotas mínimas muy reducidas, habitualmente entre el 1 % y el 3 % del saldo dispuesto. En esos niveles, casi todo el recibo se destina a cubrir los intereses del mes y apenas unos euros amortizan capital, lo que puede prolongar la deuda más de diez años y duplicar o triplicar el importe original."
  - question: "¿Cómo puedo reducir más rápido los intereses si acumulo saldo en varias tarjetas?"
    answer: "Existen dos métodos probados: el método avalancha consiste en pagar el mínimo en todas las tarjetas y volcar cada euro adicional a la que tenga la TAE más alta, logrando el menor coste financiero posible; el método bola de nieve prioriza liquidar primero el saldo más pequeño para ganar impulso psicológico y liberar cuotas progresivamente."
  - question: "¿Conviene cancelar la tarjeta de crédito justo después de dejar el saldo a cero?"
    answer: "Si la tarjeta no cobra comisión anual de mantenimiento y mantienes disciplina de gasto, dejarla abierta con saldo cero suele beneficiar tu perfil crediticio porque conserva la antigüedad del historial y reduce tu porcentaje de utilización del crédito disponible. En cambio, conviene cancelarla si implica cuotas anuales elevadas o riesgo de recaer en financiación aplazada."
---

Liquidar una tarjeta de crédito exige entender cómo interactúan el saldo aplazado, el interés compuesto mensual y el importe de cada cuota. A diferencia de un préstamo con vencimiento cerrado, las tarjetas de crédito operan como líneas de pago aplazado (*revolving*): mientras subsista capital pendiente, los intereses se acumulan ciclo tras ciclo. Nuestra herramienta resuelve dos escenarios clave: calcular cuántos meses tardarás en alcanzar el saldo cero con una cuota mensual fija, o determinar la cuota exacta necesaria para extinguir la deuda en un plazo objetivo, mostrando el cuadro de amortización y el coste total en intereses.

## Fórmulas para Calcular la Liquidación de una Tarjeta

Primero convertimos el Tipo de Interés Nominal anual ($\text{TIN}$) en la tasa periódica mensual ($r$) y la vinculamos con la Tasa Anual Equivalente ($\text{TAE}$) sin comisiones:

$$r = \frac{\text{TIN}}{12 \times 100}, \qquad \text{TAE} = (1 + r)^{12} - 1$$

### 1. Plazo de liquidación con pago mensual fijo ($n$)

Si abonas una cuota constante $M$ sin nuevos cargos, el número de meses para cancelar el saldo inicial $S_0$ sigue la fórmula logarítmica:

$$n = \left\lceil -\frac{\ln\left(1 - \frac{r \cdot S_0}{M}\right)}{\ln(1 + r)} \right\rceil$$

Esta ecuación exige cumplir la condición de amortización $M > S_0 \cdot r$. Si el pago mensual no supera los intereses del primer ciclo, el saldo jamás decrece.

### 2. Cuota fija para un plazo objetivo ($M$) y cuadro de amortización

Cuando prefieres saldar la tarjeta en exactamente $n$ meses, la cuota constante responde al sistema francés:

$$M = S_0 \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

En ambos casos, el cuadro de amortización mensual avanza de forma recursiva a partir del saldo del mes anterior ($S_{k-1}$):

$$I_k = S_{k-1} \times r, \qquad A_k = M - I_k, \qquad S_k = S_{k-1} - A_k$$

Definición de variables:

*   **$S_0$ (Saldo inicial):** Capital total pendiente al iniciar el plan.
*   **$\text{TIN}$ y $\text{TAE}$:** Interés nominal anual del contrato y coste efectivo anual por capitalización mensual.
*   **$r$ (Tasa periódica mensual):** Interés mensual en formato decimal aplicado sobre el saldo vivo.
*   **$M$ (Cuota mensual fija):** Importe constante destinado a intereses y reducción de capital.
*   **$n$ (Plazo en meses):** Mensualidades totales hasta dejar la deuda en cero (con ajuste final de céntimos).
*   **$I_k$, $A_k$ y $S_k$:** Interés del mes $k$, principal amortizado y saldo insoluto restante.

## Ejemplo Numérico Paso a Paso

Analicemos un saldo de **$S_0 = 5.000,00\text{ €}$** con un **$\text{TIN} = 21,60\%$** (**$\text{TAE} = 23,87\%$** sin comisiones).

1.  **Tasa mensual y umbral de intereses:**
    $$r = \frac{21,60}{12 \times 100} = 0,018\text{ mensual }(1,80\%)$$
    En el primer mes se devengan $I_1 = 5.000,00 \times 0,018 = 90,00\text{ €}$ de intereses. Cualquier cuota igual o inferior a $90,00\text{ €}$ perpetúa la deuda.

2.  **Plazo con cuota fija de $M = 150,00\text{ €}$:**
    $$n = \left\lceil -\frac{\ln\left(1 - \frac{90,00}{150,00}\right)}{\ln(1,018)} \right\rceil = \left\lceil -\frac{\ln(0,40)}{\ln(1,018)} \right\rceil = \lceil 51,36 \rceil = 52\text{ meses}$$
    Liquidarás la tarjeta en **4 años y 4 meses** (51 cuotas de $150,00\text{ €}$ y una última de $54,58\text{ €}$). Los tres primeros ciclos evolucionan así:
    *   **Mes 1:** Interés $90,00\text{ €}$, capital $60,00\text{ €}$, saldo vivo $4.940,00\text{ €}$.
    *   **Mes 2:** Interés $88,92\text{ €}$, capital $61,08\text{ €}$, saldo vivo $4.878,92\text{ €}$.
    *   **Mes 3:** Interés $87,82\text{ €}$, capital $62,18\text{ €}$, saldo vivo $4.816,74\text{ €}$.

    El desembolso acumulado suma **$7.704,58\text{ €}$**, de los cuales **$2.704,58\text{ €}$** son intereses.

3.  **Cuota para liquidar en $n = 24\text{ meses}$:**
    $$(1,018)^{24} \approx 1,534429 \implies M = 5.000,00 \times \frac{0,018 \times 1,534429}{1,534429 - 1} = 258,40\text{ €}$$
    Abonando **$258,40\text{ €}$ al mes**, los intereses bajan a **$1.201,70\text{ €}$** (total pagado: $6.201,70\text{ €}$), logrando un **ahorro de $1.502,88\text{ €}$** frente a la cuota de $150,00\text{ €}$.

## Impacto de la Cuota Mensual en el Plazo y los Intereses

Comparativa para una deuda de **$5.000,00\text{ €}$ al $21,60\%$ TIN ($23,87\%$ TAE)** sin nuevos cargos:

| Cuota Mensual ($M$) | Plazo de Liquidación | Intereses Totales | Desembolso Total | Intereses / Capital |
| :--- | :--- | :--- | :--- | :--- |
| **$100,00\text{ €}$** | 130 meses (10 años y 10 meses) | $7.906,98\text{ €}$ | $12.906,98\text{ €}$ | $158,14\%$ |
| **$125,00\text{ €}$** | 72 meses (6 años) | $3.919,62\text{ €}$ | $8.919,62\text{ €}$ | $78,39\%$ |
| **$150,00\text{ €}$** | 52 meses (4 años y 4 meses) | $2.704,58\text{ €}$ | $7.704,58\text{ €}$ | $54,09\%$ |
| **$200,00\text{ €}$** | 34 meses (2 años y 10 meses) | $1.702,69\text{ €}$ | $6.702,69\text{ €}$ | $34,05\%$ |
| **$250,00\text{ €}$** | 26 meses (2 años y 2 meses) | $1.254,09\text{ €}$ | $6.254,09\text{ €}$ | $25,08\%$ |
| **$500,00\text{ €}$** | 12 meses (1 año) | $562,48\text{ €}$ | $5.562,48\text{ €}$ | $11,25\%$ |

El ahorro es fuertemente no lineal: elevar la cuota de $100,00\text{ €}$ a $200,00\text{ €}$ suprime **96 meses** de deuda y ahorra **$6.204,29\text{ €}$ en intereses**, reduciendo el sobrecoste del $158,14\%$ al $34,05\%$.

## Estrategias Eficaces y Errores Frecuentes

*   **Sustituye el pago mínimo porcentual por una cuota fija alta:** El mínimo *revolving* (habitualmente entre el $1\%$ y el $3\%$ del saldo) desciende cada mes conforme baja la deuda, prolongando los pagos durante más de una década. Fijar un recibo constante muy superior a $S_0 \cdot r$ acelera exponencialmente la amortización.
*   **Congela nuevas compras y evita retirar efectivo:** Al financiar un saldo aplazado suele perderse el período de gracia sin intereses, por lo que cada compra adicional genera interés diario inmediato sobre el saldo medio diario. Las disposiciones en cajero añaden además comisiones del $3\%$ al $5\%$ y tipos más altos.
*   **Prioriza entre método avalancha y bola de nieve:** Con varias tarjetas, el **método avalancha** (destinar todo excedente a la TAE más elevada) minimiza el coste financiero total, mientras que el **método bola de nieve** (liquidar primero el saldo menor) aporta victorias rápidas para mantener la disciplina.
*   **Verifica comisiones antes de refinanciar:** Una transferencia de saldo al $0\%$ promocional o un préstamo personal de consolidación solo compensan cuando la comisión de apertura y el tipo posterior al tramo promocional mantienen el coste total por debajo de tu calendario actual.
