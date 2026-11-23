---
title: "Calculadora de Amortización"
description: "Genera el cuadro de amortización completo de tu préstamo mes a mes y analiza cómo se distribuye cada cuota entre pago de intereses y reducción de capital."
metaTitle: "Calculadora de Amortización | Cuadro de Cuotas e Interés"
metaDescription: "Genera tu cuadro de amortización detallado mes a mes. Calcula cuotas fijas, desglose entre capital e intereses y el ahorro real por pagos anticipados."
metaKeywords: "calculadora de amortización, cuadro de amortización, sistema francés de préstamos, desglose capital e intereses, amortización anticipada, tabla de pagos"
faqs:
  - question: "¿Por qué al principio del préstamo pago tantos intereses y tan poco capital?"
    answer: "En el sistema de amortización francés, los intereses de cada mes se calculan sobre el saldo vivo pendiente. Como al inicio del contrato la deuda está prácticamente intacta, la carga de intereses es máxima; a medida que cada cuota reduce el principal, el interés mensual baja y la proporción destinada a capital crece exponencialmente."
  - question: "¿Qué diferencia hay entre el sistema de amortización francés y el sistema alemán?"
    answer: "El sistema francés mantiene una cuota total constante durante toda la vida del préstamo (con capital creciente e interés decreciente), mientras que el sistema alemán fija una cuota de amortización de capital constante todos los meses, lo que genera recibos totales más altos al principio que van disminuyendo progresivamente."
  - question: "¿Qué conviene más al hacer una amortización anticipada parcial: reducir cuota o reducir plazo?"
    answer: "Desde el punto de vista matemático, reducir el plazo genera un ahorro de intereses mucho mayor porque elimina recibos completos del tramo temporal y acorta el tiempo durante el cual el banco aplica intereses compuestos. Reducir la cuota solo es preferible si necesitas aliviar tu flujo de caja mensual de inmediato."
  - question: "¿Cuándo es más rentable realizar abonos extraordinarios a capital?"
    answer: "Durante el primer tercio de la vida del préstamo. Dado que los intereses se devengan sobre el saldo insoluto de cada período, inyectar capital al inicio evita que ese dinero genere intereses acumulados durante todos los años restantes del contrato."
  - question: "¿Qué ocurre en el cuadro de amortización si el préstamo tiene un período de carencia?"
    answer: "Durante una carencia parcial solo pagas los intereses mensuales y el saldo vivo de la deuda no disminuye en absoluto. En una carencia total no pagas nada durante esos meses, pero los intereses no abonados se suman al principal (capitalización), encareciendo las cuotas futuras."
---

La amortización financiera es el proceso contable y matemático mediante el cual un deudor extingue gradualmente el capital de un préstamo a través de pagos periódicos que cubren tanto los intereses devengados como una fracción del principal. Comprender el cuadro de amortización resulta indispensable antes de firmar una hipoteca, un préstamo personal o un crédito empresarial, ya que revela con exactitud qué porcentaje de tu dinero reduce realmente la deuda en cada vencimiento y cuánto se destina al costo financiero del banco.

## Ecuaciones del Sistema de Amortización Francés

La inmensa mayoría de los préstamos bancarios e hipotecarios en España y Latinoamérica se estructuran bajo el **sistema de amortización francés** (o de cuotas constantes). En este modelo, el prestatario abona exactamente el mismo importe total en cada período, pero la composición interna de la cuota cambia mes a mes.

### 1. Cálculo de la Cuota Periódica Fija ($C$)

$$C = P_0 \times \frac{i(1 + i)^n}{(1 + i)^n - 1}$$

### 2. Desglose Mensual de Intereses, Capital y Saldo Vivo

Para cualquier período $k$ (desde $k = 1$ hasta $k = n$), los valores de cada fila del cuadro de amortización se obtienen de forma recursiva a partir del saldo pendiente del mes anterior ($S_{k-1}$):

$$I_k = S_{k-1} \times i$$

$$A_k = C - I_k$$

$$S_k = S_{k-1} - A_k = P_0 \times \frac{(1 + i)^n - (1 + i)^k}{(1 + i)^n - 1}$$

Donde las variables financieras se definen como:

*   **$P_0$ (Principal inicial):** El capital total prestado al inicio de la operación ($S_0 = P_0$).
*   **$i$ (Tipo de interés efectivo por período):** Para préstamos mensuales, equivale al Tipo de Interés Nominal anual dividido entre doce y expresado en tanto por uno ($i = \frac{\text{TIN}}{12 \times 100}$).
*   **$n$ (Número total de períodos):** La cantidad total de pagos a lo largo del préstamo (años multiplicados por $12$).
*   **$C$ (Cuota periódica constante):** El recibo mensual total que suma capital más intereses.
*   **$I_k$ (Cuota de interés del mes $k$):** El importe que cobra la entidad financiera por el uso del capital pendiente durante ese mes.
*   **$A_k$ (Cuota de amortización del mes $k$):** La parte del pago mensual que reduce efectivamente tu deuda.
*   **$S_k$ (Saldo vivo o capital insoluto):** La deuda restante tras abonar el recibo del período $k$.

## Ejemplo Numérico Paso a Paso de un Cuadro de Amortización

Analicemos un préstamo de **$P_0 = 100.000,00\text{ €}$** contratado a un tipo de interés nominal fijo del **$4,80\%$ anual** durante un plazo de **$10\text{ años}$ ($n = 120\text{ meses}$)**.

1.  **Tasa mensual efectiva ($i$):**
    $$i = \frac{4,80}{12 \times 100} = 0,004\text{ mensual }(0,40\%)$$
2.  **Cálculo de la cuota mensual constante ($C$):**
    $$(1 + 0,004)^{120} = (1,004)^{120} \approx 1,61452832$$
    $$C = 100.000 \times \frac{0,004 \times 1,61452832}{1,61452832 - 1} = 1.050,91\text{ €}$$
3.  **Evolución durante los tres primeros meses:**
    *   **Mes 1:** Sobre el saldo inicial $S_0 = 100.000,00\text{ €}$, el interés es $I_1 = 400,00\text{ €}$. El capital amortizado es $A_1 = 650,91\text{ €}$ y el nuevo saldo vivo baja a $S_1 = 99.349,09\text{ €}$.
    *   **Mes 2:** Sobre el saldo $S_1 = 99.349,09\text{ €}$, el interés baja a $I_2 = 397,40\text{ €}$. El capital amortizado sube a $A_2 = 653,51\text{ €}$, dejando un saldo vivo $S_2 = 98.695,58\text{ €}$.
    *   **Mes 3:** El interés desciende a $I_3 = 394,78\text{ €}$ y la amortización de capital alcanza $A_3 = 656,13\text{ €}$, con un saldo final $S_3 = 98.039,45\text{ €}$.

Al concluir los $120$ meses, el prestatario habrá desembolsado **$126.108,68\text{ €}$**, de los cuales $100.000,00\text{ €}$ corresponden al principal y **$26.108,68\text{ €}$** al costo acumulado en intereses.

## Evolución del Cuadro de Amortización por Hitos Temporales

En la siguiente tabla se observa cómo progresa la distribución de la cuota de $1.050,91\text{ €}$ y la reducción del saldo vivo para el préstamo anterior ($100.000\text{ €}$ al $4,80\%$ anual a $120$ meses):

| Período | Cuota ($C$) | Interés ($I_k$) | Capital ($A_k$) | Saldo Vivo ($S_k$) |
| :--- | :--- | :--- | :--- | :--- |
| **Mes 1** | $1.050,91\text{ €}$ | $400,00\text{ €}$ | $650,91\text{ €}$ | $99.349,09\text{ €}$ |
| **Mes 12** | $1.050,91\text{ €}$ | $370,78\text{ €}$ | $680,13\text{ €}$ | $92.014,68\text{ €}$ |
| **Mes 36** | $1.050,91\text{ €}$ | $302,39\text{ €}$ | $748,52\text{ €}$ | $74.848,94\text{ €}$ |
| **Mes 60** | $1.050,91\text{ €}$ | $227,13\text{ €}$ | $823,78\text{ €}$ | $55.959,25\text{ €}$ |
| **Mes 96** | $1.050,91\text{ €}$ | $99,82\text{ €}$ | $951,09\text{ €}$ | $24.003,57\text{ €}$ |
| **Mes 120** | $1.050,91\text{ €}$ | $4,19\text{ €}$ | $1.046,72\text{ €}$ | $0,00\text{ €}$ |

Observa un fenómeno clave de la curva de amortización: al llegar exactamente a la mitad temporal del préstamo (**Mes 60**), todavía no se ha devuelto la mitad del dinero; solo se ha amortizado el **$44,04\%$ del capital** ($44.040,75\text{ €}$), mientras que el $55,96\%$ sigue pendiente.

## Consejos de Gestión y Optimización de tu Deuda

*   **Aprovecha el efecto asimétrico de los pagos anticipados:** En hipotecas a $20$ o $30$ años con tasas superiores al $4\%$, durante los primeros cinco años entre el $60\%$ y el $75\%$ de cada recibo mensual se consume en intereses. Realizar una amortización anticipada parcial en los primeros años recorta directamente el saldo vivo sobre el que se calculan todos los recibos posteriores, generando un ahorro financiero libre de riesgo equivalente a la tasa de interés del crédito.
*   **Compara sistemas de amortización antes de firmar:** Además del sistema francés, existen el **sistema alemán** (donde amortizas una fracción fija de capital $A = P_0 / n$ cada mes y la cuota total decrece con el tiempo, pagando menos intereses totales) y el **sistema americano** (donde solo abonas intereses periódicos $I = P_0 \times i$ y devuelves el $100\%$ del principal en un único pago final al vencimiento).
*   **Revisa las comisiones por reembolso anticipado:** Antes de inyectar ahorros extra para rebajar tu deuda, verifica en tu contrato si existe una penalización por amortización anticipada. En la mayoría de las legislaciones hipotecarias modernas, estas comisiones están estrictamente limitadas por ley según el tramo temporal del préstamo.
