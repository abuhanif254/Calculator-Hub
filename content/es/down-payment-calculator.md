---
title: "Calculadora de Pago Inicial"
metaTitle: "Calculadora de Pago Inicial | Enganche, Cuota e Interés"
description: "Calcula el pago inicial o enganche necesario para comprar una vivienda o un automóvil, evalúa su efecto en la cuota mensual y determina el depósito requerido para ajustarte a tu presupuesto."
metaDescription: "Calcula el pago inicial o enganche ideal para tu casa o auto. Compara cuotas mensuales, intereses totales y el depósito necesario según tu presupuesto."
metaKeywords: "calculadora de pago inicial, enganche de casa, entrada hipoteca, depósito para auto, relación préstamo valor, cuota mensual hipoteca, seguro hipotecario"
faqs:
  - question: "¿Qué porcentaje de pago inicial se recomienda aportar al comprar una vivienda?"
    answer: "El umbral de referencia en España, Latinoamérica y Estados Unidos es el 20 % del valor del inmueble. Este porcentaje permite encuadrarse dentro del límite bancario habitual del 80 % de financiación, acceder a un tipo de interés nominal (TIN) más competitivo y evitar recargos como seguros hipotecarios adicionales o avales de terceros."
  - question: "¿Los impuestos y gastos de escrituración están incluidos dentro del pago inicial?"
    answer: "No. El pago inicial o entrada se descuenta directamente del precio de compraventa para reducir el capital del préstamo. Los impuestos de transmisión (ITP o IVA), notaría, registro de la propiedad, tasación y gestoría se abonan aparte al contado, lo que suele exigir un ahorro adicional de entre el 8 % y el 12 % del precio de la vivienda."
  - question: "¿Cómo puedo calcular el enganche exacto necesario para lograr una cuota mensual determinada?"
    answer: "Debes aplicar el cálculo inverso de anualidades: a partir de tu cuota mensual objetivo, la tasa de interés y el plazo elegido, la calculadora determina el capital máximo financiable y lo resta del precio de compra. La diferencia resultante es el pago inicial mínimo que debes aportar para no superar tu límite mensual."
  - question: "¿Cuánto pago inicial conviene dar al financiar un automóvil nuevo?"
    answer: "La pauta financiera más prudente es aportar al menos un 20 % del precio del vehículo. Dado que un automóvil nuevo suele perder entre un 15 % y un 25 % de su valor comercial durante el primer año, un enganche insuficiente provoca que el saldo pendiente del crédito supere rápidamente al valor real de reventa del coche."
  - question: "¿Siempre resulta rentable aportar el mayor pago inicial posible?"
    answer: "No necesariamente. Aunque un enganche más alto reduce de forma directa los intereses acumulados y la cuota mensual, vaciar el fondo de emergencia para aumentar el depósito puede obligarte a recurrir después a tarjetas de crédito o préstamos personales con una TAE muy superior a la de la hipoteca."
---

El **pago inicial** —conocido como **entrada** en España y **enganche** o **pie** en Latinoamérica— es la porción del precio de una vivienda o vehículo que el comprador desembolsa al contado con fondos propios al firmar la compraventa. El resto constituye el capital principal financiado mediante préstamo bancario.

Definir con precisión ese depósito, ya sea en euros (€) o en dólares estadounidenses (USD), condiciona simultáneamente tu patrimonio neto inicial, la relación préstamo-valor que determina el tipo de interés nominal (TIN) y la Tasa Anual Equivalente (TAE), la cuota mensual y el coste acumulado en intereses.

## Ecuaciones del Pago Inicial y Cuota Objetivo

El modelo vincula el precio de adquisición con el sistema francés de cuotas constantes tanto en sentido directo como en sentido inverso (despejar el depósito necesario para fijar una cuota máxima).

### 1. Cálculo directo de financiación y coste

Si $V$ es el precio total y $p$ el porcentaje de entrada, el pago inicial ($E$), el capital financiado ($P$) y la relación préstamo-valor ($\text{RPV}$) son:

$$E = V \cdot \frac{p}{100}, \qquad P = V - E, \qquad \text{RPV} = \frac{P}{V} \times 100$$

Con una tasa mensual efectiva $i = \frac{\text{TIN}}{12 \times 100}$ y $n$ mensualidades, la cuota mensual fija ($M$), el interés total ($I_{\text{total}}$) y el desembolso global ($D_{\text{total}}$) responden a:

$$M = P \cdot \frac{i(1 + i)^n}{(1 + i)^n - 1}$$

$$I_{\text{total}} = (M \cdot n) - P, \qquad D_{\text{total}} = E + (M \cdot n)$$

### 2. Cálculo inverso para una cuota mensual objetivo

Cuando partes de un límite presupuestario mensual ($M_{\text{obj}}$), el capital máximo financiable ($P_{\text{máx}}$) y el depósito mínimo requerido ($E_{\text{req}}$) se despejan directamente:

$$P_{\text{máx}} = M_{\text{obj}} \cdot \frac{(1 + i)^n - 1}{i(1 + i)^n}, \qquad E_{\text{req}} = \max\!\left(0,\; V - P_{\text{máx}}\right)$$

Definición de variables:

* **$V$:** Precio total del inmueble o vehículo.
* **$E$ y $p$:** Importe monetario del pago inicial y su porcentaje sobre $V$.
* **$P$:** Capital principal financiado por la entidad bancaria.
* **$i$ y $n$:** Tipo de interés mensual efectivo y plazo total en meses.
* **$M_{\text{obj}}$ y $E_{\text{req}}$:** Cuota mensual deseada y pago inicial necesario para alcanzarla.

## Ejemplo Numérico Paso a Paso: Vivienda y Cuota Objetivo

Analicemos la compra de una vivienda de **300.000 €** con hipoteca fija al **4,20 % TIN anual** a **25 años** (300 meses) y un **pago inicial del 20 %**.

1. **Entrada y capital financiado:**
   $E = 300.000 \times 0,20 = 60.000\text{ €}$, por lo que $P = 240.000\text{ €}$ y la relación préstamo-valor queda en el **80 %**.
2. **Tasa mensual y factor compuesto:**
   $$i = \frac{4,20}{12 \times 100} = 0,0035, \qquad (1 + 0,0035)^{300} \approx 2,85241720$$
3. **Cuota fija, intereses y desembolso total:**
   $$M = 240.000 \times \frac{0,0035 \times 2,85241720}{2,85241720 - 1} = 1.293,46\text{ €/mes}$$
   En 300 recibos se abonan 388.038,47 € al banco, de los cuales **148.038,47 €** son intereses. Sumando los 60.000 € de entrada, el desembolso global alcanza **448.038,47 €**.
4. **Cálculo inverso para limitar la cuota a 1.150,00 €/mes:**
   Con el mismo factor de anualidad ($0,0053894232$), el préstamo máximo viable es:
   $$P_{\text{máx}} = \frac{1.150,00}{0,0053894232} = 213.380,91\text{ €}$$
   Así, el comprador necesita un enganche requerido de **86.619,09 €**, equivalente al **28,87 %** del precio de la vivienda.

## Comparativa del Pago Inicial en una Compra de 300.000 €

La tabla muestra el efecto de modificar el porcentaje de entrada sobre el mismo inmueble de 300.000 € al 4,20 % TIN a 25 años, manteniendo fijo el tipo para aislar el impacto puro del capital prestado:

| Pago Inicial (%) | Entrada (€) | Préstamo ($P$) | Relación Préstamo-Valor | Cuota Mensual | Intereses Totales | Ahorro frente al 5 % |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **5 %** | 15.000 € | 285.000 € | 95 % | 1.535,99 € | 175.795,68 € | 0,00 € |
| **10 %** | 30.000 € | 270.000 € | 90 % | 1.455,14 € | 166.543,28 € | 9.252,40 € |
| **15 %** | 45.000 € | 255.000 € | 85 % | 1.374,30 € | 157.290,87 € | 18.504,81 € |
| **20 %** | 60.000 € | 240.000 € | 80 % | 1.293,46 € | 148.038,47 € | 27.757,21 € |
| **25 %** | 75.000 € | 225.000 € | 75 % | 1.212,62 € | 138.786,06 € | 37.009,62 € |
| **30 %** | 90.000 € | 210.000 € | 70 % | 1.131,78 € | 129.533,66 € | 46.262,02 € |

Cada tramo de 5 puntos adicionales (15.000 € más de entrada) recorta la cuota en **80,84 € mensuales** y ahorra **9.252,40 €** en intereses. En el mercado bancario real, cruzar el umbral del 20 % amplifica aún más esa ventaja al suprimir seguros hipotecarios obligatorios y abrir acceso a diferenciales más bajos.

## Errores Frecuentes al Planificar el Pago Inicial

* **Confundir ahorro total con entrada disponible:** Impuestos de transmisión (ITP o IVA), notaría, registro y tasación absorben entre un 8 % y un 12 % adicional. Para aportar el 20 % de entrada en vivienda habitual suele requerirse ahorrar cerca del 30 % del precio.
* **Vaciar por completo el fondo de emergencia:** Descapitalizarse para subir el enganche deja al hogar expuesto a imprevistos o reparaciones, lo que puede forzar deuda posterior en tarjetas a una TAE muy superior. Reserva siempre de tres a seis meses de gastos líquidos.
* **Ignorar el coste de oportunidad:** Retrasar años la compra para reunir un 10 % extra resulta contraproducente si la vivienda se encarece más rápido que el rendimiento neto de tu ahorro o si repuntan los tipos hipotecarios.
* **Subestimar la depreciación en vehículos:** Aportar menos del 15 % o 20 % en un coche nuevo financiado a 60–84 meses genera patrimonio negativo durante los primeros años, obligándote a cubrir la diferencia en caso de siniestro o venta anticipada.
