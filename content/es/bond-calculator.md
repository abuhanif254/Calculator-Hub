---
title: "Calculadora de Bonos"
metaTitle: "Calculadora de Bonos: Precio, TIR (YTM) y Rendimiento"
description: "Valore instrumentos de renta fija calculando el precio teórico del bono, el rendimiento corriente (Current Yield) y la TIR al vencimiento (YTM)."
metaDescription: "Calcule el precio de mercado de un bono, el rendimiento actual y la TIR al vencimiento (YTM). Analice emisiones bajo la par, sobre la par y sensibilidad."
metaKeywords: "calculadora de bonos, precio teorico de un bono, rendimiento al vencimiento ytm, tir de un bono, rendimiento corriente current yield, renta fija cupones bajo la par"
faqs:
  - question: "¿Por qué baja el precio de mercado de un bono cuando suben los tipos de interés oficiales?"
    answer: "Porque los cupones de un bono a tipo fijo ya emitido permanecen inalterados. Si el banco central sube los tipos y las nuevas emisiones ofrecen un cupón del 5 %, nadie pagará el 100 % del valor nominal por un bono antiguo que solo paga un 3 %. Para que ese bono antiguo resulte competitivo y ofrezca al nuevo comprador una rentabilidad total equivalente al 5 % de mercado, su precio de cotización en el mercado secundario debe caer por debajo de su valor nominal (bajo la par)."
  - question: "¿Qué diferencia hay entre el Rendimiento Actual (Current Yield) y el Rendimiento al Vencimiento (YTM)?"
    answer: "El Rendimiento Actual (Current Yield) divide únicamente el cupón anual entre el precio de compra actual, ignorando qué ocurrirá cuando el bono venza. En cambio, el Rendimiento al Vencimiento (YTM o TIR del bono) es la rentabilidad total anualizada que obtendrá si mantiene el título hasta su amortización final, ya que suma tanto el cobro de todos los cupones como la ganancia o pérdida de capital entre su precio de compra y el valor nominal reembolsado."
  - question: "¿Qué significa comprar un bono bajo la par, a la par o sobre la par?"
    answer: "Un bono cotiza a la par cuando su precio de mercado coincide exactamente con su valor nominal (por ejemplo, 1.000 € o 100 %). Cotiza bajo la par (con descuento) cuando su precio es inferior al nominal porque su cupón es menor que el interés actual del mercado. Cotiza sobre la par (con prima) cuando su precio supera el valor nominal porque paga un cupón superior a las tasas vigentes en el mercado."
  - question: "¿Qué diferencia existe entre el precio limpio (clean price) y el precio sucio (dirty price) al comprar un bono?"
    answer: "Las pantallas de cotización financiera muestran habitualmente el precio limpio (excluido el cupón en curso). Sin embargo, si compra un bono entre dos fechas de pago de cupón, deberá abonar al vendedor el llamado precio sucio o precio total de liquidación, que es igual al precio limpio más el cupón corrido (la fracción proporcional de intereses devengados desde el último pago de cupón hasta el día de la compra)."
  - question: "¿La TIR al vencimiento (YTM) garantiza exactamente esa rentabilidad anual pase lo que pase?"
    answer: "Solo bajo tres condiciones estrictas: que mantenga el bono en cartera hasta la fecha de vencimiento final, que el emisor no incurra en impago o reestructuración (riesgo de crédito) y que usted pueda reinvertir todos los cupones intermedios cobrados exactamente a esa misma tasa YTM. Si los tipos de interés bajan durante la vida del bono, sus cupones se reinvertirán a tasas menores, reduciendo ligeramente la rentabilidad realizada."
---

A pesar de su denominación tradicional, la **renta fija** no ofrece un precio estático ni una rentabilidad única a menos que se comprenda su mecánica de actualización de flujos. Cuando un inversor adquiere un bono del Tesoro, una obligación del Estado o un bono corporativo en el mercado secundario, el rendimiento real depende de cuatro magnitudes: el **Valor Nominal ($VN$)** de reembolso, la **tasa de cupón anual ($c$)**, el **plazo hasta el vencimiento ($n$)** y el **precio de cotización vigente ($P_0$)**.

Esta calculadora resuelve de forma bidireccional la ecuación de valoración de bonos: permite hallar el precio teórico que debería pagar por una emisión dada su rentabilidad objetivo, o despejar la **Tasa Interna de Retorno o Rendimiento al Vencimiento (YTM)** a partir del precio al que cotiza hoy en el mercado.

## Ecuaciones de Valoración de Renta Fija: Precio Teórico, Current Yield y TIR (YTM)

Matemáticamente, un bono ordinario (*plain vanilla bond*) combina una **anualidad ordinaria** (la corriente de cupones periódicos) y un **pago único futuro** (la devolución del principal nominal al vencimiento).

### 1. Precio Teórico del Bono ($P_0$)
Si un bono con Valor Nominal $VN$ paga una tasa de cupón anual $c$ distribuida en $m$ pagos al año ($m = 1$ anual, $m = 2$ semestral, $m = 4$ trimestral), cada cupón periódico es $C = \frac{VN \times c}{m}$ durante $N = n \times m$ periodos. Descontando los flujos a una rentabilidad exigida al vencimiento $\text{YTM}$ (con tasa periódica $y = \frac{\text{YTM}}{m}$):

$$P_0 = \sum_{t=1}^{N} \frac{C}{(1 + y)^t} + \frac{VN}{(1 + y)^N} = C \times \left[\frac{1 - (1 + y)^{-N}}{y}\right] + \frac{VN}{(1 + y)^N}$$

### 2. Rendimiento Corriente o Actual (*Current Yield - CY*)
Mide únicamente la rentabilidad por cupón anual respecto al precio de mercado pagado, sin incluir la ganancia o pérdida de capital a vencimiento:

$$CY = \frac{\text{Cupón Anual Total}}{P_0} = \frac{VN \times c}{P_0}$$

### 3. Rendimiento al Vencimiento (*Yield to Maturity - YTM*)
Es la verdadera TIR del bono: la tasa de descuento que iguala el precio de mercado ($P_0$) con el valor presente de todos sus cobros futuros. Nuestro simulador despeja la YTM exacta mediante iteración numérica de Newton-Raphson, mientras que la aproximación analítica clásica para verificación rápida es:

$$\text{YTM}_{\text{aprox}} \approx \frac{(VN \times c) + \left(\frac{VN - P_0}{n}\right)}{\frac{VN + P_0}{2}}$$

## Caso Práctico de Valoración: Bono Corporativo con Cupón Semestral

Analicemos la compra en el mercado secundario de una obligación corporativa con estas condiciones:
* **Valor Nominal ($VN$):** $1.000\text{ €}$ (o $\$1.000\text{ USD}$).
* **Tasa de cupón nominal ($c$):** $5{,}00\%$ anual, pagadero **semestralmente** ($m = 2$).
* **Vencimiento remanente ($n$):** $4\text{ años}$ ($N = 4 \times 2 = 8\text{ semestres}$).
* **Rentabilidad exigida por el mercado ($\text{YTM}$):** $6{,}40\%$ anual para deuda de igual calificación crediticia.

### Paso 1: Parametrización semestral
Cada seis meses el título abona un cupón de $C = \frac{1.000 \times 0{,}05}{2} = 25{,}00\text{ €}$ ($50{,}00\text{ €/año}$), y la tasa de descuento semestral es $y = \frac{0{,}064}{2} = 0{,}032$ ($3{,}20\%$ por semestre).

### Paso 2: Descuento de los 8 cupones y del principal
Con el factor de descuento del octavo semestre $(1 + 0{,}032)^{-8} \approx 0{,}777238$:
1. **Valor Presente de los 8 cupones:**
   $$VP_{\text{cupones}} = 25{,}00 \times \left[\frac{1 - 0{,}777238}{0{,}032}\right] = 25{,}00 \times 6{,}961321 = 174{,}03\text{ €}$$
2. **Valor Presente del reembolso nominal ($1.000\text{ €}$):**
   $$VP_{\text{principal}} = 1.000 \times 0{,}777238 = 777{,}24\text{ €}$$
3. **Precio teórico de mercado ($P_0$):**
   $$P_0 = 174{,}03\text{ €} + 777{,}24\text{ €} = 951{,}27\text{ €} \quad (95{,}127\% \text{ del nominal})$$

### Paso 3: Interpretación del descuento y del Current Yield
El bono cotiza **bajo la par** ($951{,}27\text{ €} < 1.000\text{ €}$) porque su cupón ($5{,}00\%$) es menor que el rendimiento exigido hoy por el mercado ($6{,}40\%$). Su **Rendimiento Corriente ($CY$)** es:

$$CY = \frac{50{,}00\text{ €}}{951{,}27\text{ €}} = 5{,}256\%$$

Además del $5{,}26\%$ vía cupones, al vencer en 4 años el inversor recibirá $1.000\text{ €}$ por un bono que pagó a $951{,}27\text{ €}$, sumando una plusvalía a vencimiento de $+48{,}73\text{ €}$ que eleva su rentabilidad anualizada total (YTM) exactamente al **$6{,}40\%$**.

## Régimen de Cotización: Bajo la Par, a la Par y Sobre la Par

Esta tabla resume las relaciones matemáticas entre el precio de cotización y las métricas de rendimiento en renta fija:

| Estado de Cotización del Bono | Relación Precio vs. Nominal | Jerarquía Matemática de Tasas | Composición del Retorno del Inversor | Convergencia a Vencimiento (Pull to Par) |
| :--- | :--- | :--- | :--- | :--- |
| **Bono Bajo la Par (Descuento)** | $P_0 < VN$ ($< 100\%$) | $\text{Cupón } c < CY < \text{YTM}$ | Cupones + Ganancia de capital a vencimiento | El precio sube gradualmente hacia $VN$ |
| **Bono a la Par** | $P_0 = VN$ ($= 100\%$) | $\text{Cupón } c = CY = \text{YTM}$ | 100 % procedente del flujo de cupones | El precio se mantiene en torno a $VN$ |
| **Bono Sobre la Par (Prima)** | $P_0 > VN$ ($> 100\%$) | $\text{Cupón } c > CY > \text{YTM}$ | Cupones altos − Pérdida de capital a vencimiento | El precio baja gradualmente hacia $VN$ |
| **Bono Cupón Cero (Letra / Strip)** | $P_0 \ll VN$ (descuento puro) | $c = 0\% = CY < \text{YTM}$ | 100 % procedente de la diferencia $(VN - P_0)$ | Ascenso compuesto hasta alcanzar $VN$ |

## Riesgos Operativos en Renta Fija: Duración, Cupón Corrido y Cláusulas Call

* **Sensibilidad a tipos y Duración Modificada:** Cuanto más largo sea el vencimiento ($n$) y más bajo el cupón ($c$), mayor será la **Duración Modificada**. Un bono a 20 años con cupón del 2 % tiene una duración modificada cercana a $15$, por lo que una subida de $1\%$ en los tipos de interés provocará una caída aproximada del $15\%$ en su precio de mercado.
* **Bonos rescatables (*Callable Bonds*):** Muchas emisiones corporativas permiten al emisor amortizar anticipadamente el bono a un precio prefijado. Si los tipos caen, la empresa rescatará el título para refinanciarse más barato, limitando su plusvalía; verifique siempre el *Yield to Call (YTC)*.
* **Fiscalidad entre cupones y ganancia de capital:** Los cupones periódicos tributan en el año de cobro como rendimiento del capital mobiliario, mientras que la plusvalía de un bono comprado bajo la par se difiere fiscalmente hasta su venta o amortización.
