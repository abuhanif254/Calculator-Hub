---
title: "Calculadora de Reinversión de Dividendos (DRIP)"
metaTitle: "Calculadora de Reinversión de Dividendos (DRIP) y Rentas"
description: "Calcula el efecto bola de nieve al reinvertir dividendos automáticamente, el crecimiento de tus acciones y tu rentabilidad sobre coste (Yield on Cost)."
metaDescription: "Simula el crecimiento de tu cartera de dividendos con reinversión DRIP, aumento anual del dividendo, retención fiscal e ingresos pasivos proyectados."
metaKeywords: "calculadora reinversión de dividendos, calculadora DRIP español, interés compuesto dividendos, calcular yield on cost, vivir de los dividendos simulador"
faqs:
  - question: "¿Qué diferencia hay entre la rentabilidad por dividendo actual y el Yield on Cost (YoC)?"
    answer: "La rentabilidad por dividendo actual divide el dividendo anual entre la cotización de mercado de hoy. En cambio, la Rentabilidad sobre Coste (Yield on Cost o YoC) divide los dividendos anuales que cobras hoy entre el capital que desembolsaste originalmente de tu bolsillo, reflejando el verdadero retorno pasivo de tu inversión histórica."
  - question: "¿Cómo afecta la retención de impuestos al efecto bola de nieve de los dividendos?"
    answer: "Cada vez que una acción o ETF de distribución reparte efectivo, Hacienda o el fisco de origen aplica una retención (por ejemplo, el 19 % en España o el 15 % en EE. UU. con el formulario W-8BEN). Esto significa que solo reinviertes el dividendo neto, por lo que incluir la tasa impositiva en la calculadora es indispensable para no sobreestimar el capital final."
  - question: "¿Es mejor una acción que paga un 7 % de dividendo fijo o una que paga el 3 % pero crece al 8 % anual?"
    answer: "A plazos superiores a 12 años, una empresa con un dividendo inicial moderado (3 % – 3,5 %) que incrementa su pago un 7 % u 8 % anual supera en rentas pasivas y patrimonio total a una compañía con un 7 % estancado, además de ofrecer mayor protección frente a la inflación."
  - question: "¿Qué es el Payout Ratio y por qué es vital revisarlo antes de proyectar un plan DRIP?"
    answer: "El Payout Ratio es el porcentaje del beneficio neto o del Flujo de Caja Libre (Free Cash Flow) que la empresa destina a pagar dividendos. Si supera el 80 % de forma recurrente (salvo en REITs o SOCIMIs), el dividendo corre riesgo de ser recortado o congelado ante cualquier caída de ventas."
  - question: "¿El dividendo flexible (Scrip Dividend) funciona igual que una reinversión DRIP real?"
    answer: "Solo si la empresa amortiza la totalidad de las nuevas acciones emitidas. Si la compañía emite acciones nuevas para pagar el dividendo pero no recompra títulos en el mercado, se produce una dilución: tendrás más acciones, pero cada una representará una fracción menor del beneficio empresarial."
---

Un **Plan de Reinversión de Dividendos (DRIP, por sus siglas en inglés)** activa un doble motor de capitalización compuesta dentro de una cartera de acciones o ETFs de distribución. A diferencia de la renta fija tradicional, donde solo crece el saldo monetario, al reinvertir dividendos en empresas de calidad operan dos fuerzas simultáneas: **cada cobro compra nuevas acciones** (aumentando tu número de títulos sin poner dinero nuevo de tu bolsillo) y, paralelamente, **la propia empresa incrementa el dividendo que paga por cada acción** año tras año.

Esta calculadora modela con precisión ese efecto bola de nieve incorporando la revalorización del precio de la acción, la tasa de crecimiento anual del dividendo (*DGR*), las aportaciones periódicas y la merma fiscal por retención de impuestos en cada reparto.

## Matemática del efecto bola de nieve en una cartera de dividendos crecientes

En una estrategia DRIP, el número de acciones nuevas ($\Delta N_t$) que se incorporan a la cartera en cada periodo $t$ depende del flujo neto de dividendos recibido tras descontar la tasa impositiva efectiva ($\tau$) y del precio de cotización vigente ($P_t$):

$$\Delta N_t = \frac{N_{t-1} \cdot D_t \cdot (1 - \tau)}{P_t} \qquad \text{donde} \qquad N_t = N_{t-1} + \Delta N_t + \frac{A_t}{P_t}$$

A su vez, tanto el dividendo por acción ($D_t$) como el precio de cotización ($P_t$) evolucionan según sus respectivas tasas anuales de crecimiento compuesto ($g_d$ y $g_p$):

$$D_t = D_0 (1 + g_d)^t \qquad \text{y} \qquad P_t = P_0 (1 + g_p)^t$$

Las variables fundamentales del cálculo son:

* **$N_t$**: Número total de acciones acumuladas al cierre del periodo $t$.
* **$D_t$**: Dividendo bruto anual pagado por cada acción en el año $t$.
* **$\tau$**: Retención o tipo impositivo efectivo sobre dividendos (por ejemplo, $0,19$ para un 19 %).
* **$P_t$**: Precio de mercado de cada acción en el momento de ejecutar la reinversión.
* **$A_t$**: Aportación adicional de capital nuevo realizada por el inversor en el periodo $t$.
* **Rentabilidad sobre Coste (*Yield on Cost* o $\text{YoC}$)**: Mide qué porcentaje de tu desembolso original recuperas cada año exclusivamente en forma de dividendos brutos:
  $$\text{YoC}_t = \frac{N_t \cdot D_t}{\text{Capital Total Aportado de tu Bolsillo}}$$

## Ejemplo numérico: Cartera de 20.000 € durante 20 años con y sin reinversión DRIP

Veamos el impacto aritmético real sobre una inversión única de **20.000 €** (`USD 20,000`) sin aportaciones posteriores ($A_t = 0$) durante un horizonte de **20 años**. Compras **400 acciones** a un precio inicial $P_0 = 50\text{ €}$, que reparten un dividendo inicial $D_0 = 2,00\text{ €}$ por título (**4,00 % de rentabilidad por dividendo**). Asumimos que tanto el beneficio como el dividendo por acción y la cotización crecen a un ritmo moderado del **6,00 % anual** ($g_d = g_p = 0,06$), manteniendo la rentabilidad por dividendo de mercado constante en el 4,00 %. Aplicamos una retención fiscal del **19 %** ($\tau = 0,19$) en cada cobro.

1. **Tasa neta de acumulación de acciones**: Al descontar el 19 % de impuestos sobre el 4,00 % de dividendo, el número de acciones en cartera crece un $4,00\% \times (1 - 0,19) = 3,24\%$ compuesto anual.
2. **Acciones acumuladas al año 20 ($N_{20}$)**:
   $$N_{20} = 400 \times (1 + 0,0324)^{20} = 400 \times 1,89245 = 756,98\text{ acciones}$$
3. **Evolución del precio y del dividendo unitario en el año 20**:
   * Precio por acción ($P_{20}$): $50\text{ €} \times (1,06)^{20} = 50 \times 3,20714 = 160,36\text{ €}$.
   * Dividendo por acción ($D_{20}$): $2,00\text{ €} \times (1,06)^{20} = 6,414\text{ € por título}$.
4. **Comparación final en el año 20**:
   * **Con Reinversión DRIP**: Posees **756,98 acciones** valoradas en **121.389,31 €**. Tu renta pasiva anual asciende a $756,98 \times 6,414\text{ €} = \mathbf{4.855,47\text{ €/año}}$ (404,62 €/mes). Tu **Rentabilidad sobre Coste (YoC)** alcanza el **24,28 % anual** ($4.855,47 / 20.000$).
   * **Sin Reinversión (gastando los dividendos)**: Sigues teniendo las **400 acciones** iniciales valoradas en **64.142,71 €**, y tu renta anual por dividendos se queda en **2.565,71 €/año**. Reinvertir los dividendos netos ha generado **57.246,60 € extra de patrimonio** y un **89,2 % más de ingresos pasivos anuales**.

## Comparativa de perfiles: Alto Dividendo Estancado vs. Crecimiento del Dividendo (DGI)

Un error frecuente al buscar rentas pasivas es elegir acciones guiándose únicamente por un porcentaje inicial muy alto. Esta tabla muestra cómo evolucionan 10.000 € invertidos durante 20 años con reinversión DRIP (retención fiscal del 19 %) bajo tres perfiles bursátiles reales:

| Perfil de Cartera de Dividendos | Dividendo Inicial (%) | Crecimiento Anual del Dividendo ($g_d$) | Revalorización Anual Precio ($g_p$) | Renta Anual Bruta al Año 20 | Yield on Cost (YoC) al Año 20 | Valor Total de Cartera al Año 20 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Alto Rendimiento Estancado** (*Telecoms / Utilities maduras*) | 7,00 % | 1,0 % | 1,5 % | 2.385 € | 23,85 % | 41.240 € |
| **Aristócratas del Dividendo (DGI)** (*Consumo básico / Salud / Industria*) | 3,50 % | 7,5 % | 7,0 % | 2.660 € | 26,60 % | 68.450 € |
| **Crecimiento Acelerado de Dividendo** (*Tecnología madura / Pagos*) | 1,50 % | 12,0 % | 10,0 % | 1.930 € | 19,30 % | 88.920 € |

## Fiscalidad internacional y cómo evitar las trampas de dividendo (Yield Traps)

* **Optimiza la doble retención con el formulario W-8BEN**: Si inviertes desde España o países de Latinoamérica con convenio de doble imposición (como México, Chile o Colombia) en acciones de Estados Unidos, tramitar el formulario **W-8BEN** en tu bróker reduce la retención en origen de la hacienda estadounidense (IRS) del **30 % al 15 %** (o al 10 % en el caso de México). En tu declaración anual podrás deducir ese impuesto extranjero para evitar pagar dos veces por el mismo dividendo.
* **Desconfía de rentabilidades superiores al 8 % sin soporte en caja**: Cuando una acción ofrece un 9 % o 10 % de dividendo, a menudo se debe a que su cotización se ha desplomado porque el mercado descuenta un recorte inminente del pago (*Yield Trap*). Verifica siempre que el dividendo esté cubierto holgadamente por el **Flujo de Caja Libre (*Free Cash Flow*)** y que la deuda neta no supere 3 veces el EBITDA.
