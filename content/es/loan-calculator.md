---
title: "Calculadora de Préstamos"
metaTitle: "Calculadora de Préstamos | Cuotas, TAE y Amortización"
description: "Calcula cuotas mensuales fijas, intereses totales, préstamos de pago diferido y bonos cupón cero con fórmulas verificadas y cuadro de amortización."
metaDescription: "Calcula tu cuota mensual, intereses totales, TAE y cuadro de amortización para préstamos amortizables, pagos diferidos y bonos en EUR o USD."
metaKeywords: "calculadora de préstamos, cuota mensual préstamo, cuadro de amortización, sistema francés, TAE y TIN, préstamo de pago diferido, bono cupón cero, intereses de préstamo"
faqs:
  - question: "¿Qué diferencia hay entre el TIN y la TAE al comparar dos préstamos?"
    answer: "El TIN (Tipo de Interés Nominal) indica únicamente el porcentaje anual pactado sobre el capital sin reflejar la frecuencia de capitalización ni los gastos adicionales. La TAE (Tasa Anual Equivalente) o el CAT en Latinoamérica integra la capitalización efectiva, las comisiones de apertura o estudio y los seguros obligatorios, permitiendo comparar el costo financiero real entre distintas ofertas bancarias."
  - question: "¿Por qué se pagan más intereses durante las primeras cuotas de un préstamo amortizable?"
    answer: "En el sistema de amortización francés, la cuota mensual permanece constante, pero el interés de cada periodo se calcula sobre el capital pendiente de devolver. Como el saldo vivo alcanza su máximo al inicio del contrato, los primeros pagos destinan una proporción alta a intereses y menos a amortizar capital; con cada mes la relación se invierte progresivamente."
  - question: "¿En qué se diferencian un préstamo amortizable, un préstamo de pago diferido y un bono?"
    answer: "El préstamo amortizable se devuelve en cuotas periódicas regulares que cubren intereses y capital hasta liquidar la deuda. El préstamo de pago diferido acumula intereses compuestos durante todo el plazo y exige un único desembolso total al vencimiento. En un bono cupón cero se parte de un valor nominal predeterminado al vencimiento y se descuenta hacia el presente para hallar el importe recibido al inicio."
  - question: "¿Cómo afecta la frecuencia de capitalización al costo final de un crédito?"
    answer: "Cuanto más frecuente es la capitalización —por ejemplo, mensual o diaria frente a anual— antes se incorporan los intereses devengados a la base de cálculo, elevando el tipo efectivo anual y la suma total pagada. Un TIN del 6,00 % con capitalización mensual genera una tasa efectiva pura del 6,17 %."
  - question: "¿Conviene reducir plazo o reducir cuota al realizar una amortización anticipada?"
    answer: "Desde el punto de vista matemático, reducir el plazo genera siempre un ahorro superior en intereses totales porque elimina meses de devengo sobre el capital pendiente. Reducir la cuota, en cambio, resulta útil cuando se prioriza aliviar la carga mensual del presupuesto familiar."
---

Evaluar una financiación fijándose solo en la cuota mensual oculta miles de euros o dólares en intereses acumulados. Ya sea al comparar un préstamo personal, financiar un vehículo, valorar un crédito comercial de pago único o descontar un bono cupón cero, dominar las matemáticas del endeudamiento resulta esencial antes de firmar.

Esta **Calculadora de Préstamos** integra tres modelos financieros: el **préstamo amortizable** de cuota constante (sistema francés), el **préstamo de pago diferido** con liquidación única al vencimiento y el **bono** a valor nominal predeterminado. Al introducir capital, tipo nominal (**TIN**), frecuencia de capitalización y plazo en `EUR €` o `USD $`, calcula al instante cuota periódica, intereses acumulados y desembolso total.

## Fórmulas de Amortización, Pago Diferido y Bonos

### 1. Préstamo Amortizable de Cuota Fija (Sistema Francés)

Para un capital prestado $P$, un TIN anual $r$ (en decimal), $m$ capitalizaciones al año y $n = 12t$ cuotas mensuales ($t$ años), el tipo efectivo mensual $i_{\text{ef}}$ y la cuota fija $C$ son:

$$i_{\text{ef}} = \left(1 + \frac{r}{m}\right)^{m/12} - 1, \qquad C = P \cdot \frac{i_{\text{ef}}(1 + i_{\text{ef}})^n}{(1 + i_{\text{ef}})^n - 1}$$

$$T_{\text{pagado}} = C \cdot n, \qquad I_{\text{total}} = T_{\text{pagado}} - P$$

Con capitalización mensual ($m = 12$), se simplifica a $i_{\text{ef}} = r/12$. En cada cuota $k$ del **cuadro de amortización**, los intereses valen $I_k = S_{k-1} \cdot i_{\text{ef}}$ y el capital amortizado resulta $A_k = C - I_k$, reduciendo el saldo vivo a $S_k = S_{k-1} - A_k$.

### 2. Pago Diferido, Bono Cupón Cero y TAE Pura

En un préstamo de pago diferido tras $t$ años, el monto al vencimiento $A$ acumula interés compuesto; en un bono con valor nominal $V_N$, el valor actual recibido $P_0$ descuenta ese nominal hacia el inicio:

$$A = P\left(1 + \frac{r}{m}\right)^{m \cdot t}, \qquad P_0 = \frac{V_N}{\left(1 + \frac{r}{m}\right)^{m \cdot t}}, \qquad \text{TAE}_{\text{pura}} = \left(1 + \frac{r}{m}\right)^m - 1$$

Donde:

* **$P$ y $S_k$:** capital inicial prestado y saldo pendiente tras la cuota $k$.
* **$r$ y $i_{\text{ef}}$:** tipo de interés nominal anual (TIN) y tipo efectivo mensual.
* **$m$, $t$ y $n$:** capitalizaciones anuales, plazo en años y total de pagos mensuales.
* **$C$, $T_{\text{pagado}}$ e $I_{\text{total}}$:** cuota constante, total desembolsado e intereses acumulados.
* **$A$, $V_N$ y $P_0$:** pago único al vencimiento, valor nominal y capital descontado inicial.

## Ejemplo Práctico Paso a Paso: 25.000 € al 6,00 % TIN

Supongamos un crédito de **$P = 25.000\text{ €}$** a **$t = 5\text{ años}$** ($n = 60$ meses) al **$r = 6{,}00\,\%$ TIN** (`0,06`) con capitalización mensual ($m = 12$):

1. **Tipo mensual y TAE pura:** $i_{\text{ef}} = 0{,}06 / 12 = \mathbf{0{,}005}$ (`0,50 %` mensual), equivalente a una **TAE** sin comisiones de $(1 + 0{,}005)^{12} - 1 = \mathbf{6{,}17\,\%}$.
2. **Factor de capitalización:** $(1 + 0{,}005)^{60} = \mathbf{1{,}348850}$.
3. **Cuota mensual fija:**
   $$C = 25.000 \cdot \frac{0{,}005 \times 1{,}348850}{1{,}348850 - 1} = \mathbf{483{,}32\text{ €}}$$
4. **Inicio del cuadro de amortización:**
   * **Mes 1:** intereses de $25.000 \times 0{,}005 = \mathbf{125{,}00\text{ €}}$; amortización de $483{,}32 - 125{,}00 = \mathbf{358{,}32\text{ €}}$; saldo vivo de **`24.641,68 €`**.
   * **Mes 2:** intereses de $24.641{,}68 \times 0{,}005 = \mathbf{123{,}21\text{ €}}$; amortización de $483{,}32 - 123{,}21 = \mathbf{360{,}11\text{ €}}$; saldo vivo de **`24.281,57 €`**.
5. **Desembolso total:** $483{,}32 \times 60 = \mathbf{28.999{,}20\text{ €}}$, con **`3.999,20 €`** en intereses.

En cambio, bajo **pago diferido** a 5 años al mismo `6,00 %` TIN mensual, el pago único al vencimiento sube a $25.000 \times 1{,}348850 = \mathbf{33.721{,}25\text{ €}}$ (`8.721,25 €` de intereses), más del doble porque el saldo nunca disminuye antes del vencimiento.

## Tabla Comparativa: Plazos y Modalidades (25.000 € al 6,00 % TIN)

| Modalidad y Plazo | Cuota Mensual | Pago al Vencimiento | Total Pagado | Intereses Totales |
| :--- | :--- | :--- | :--- | :--- |
| **Amortizable a 3 años (36 meses)** | 760,55 € | — | 27.379,74 € | 2.379,74 € |
| **Amortizable a 5 años (60 meses)** | 483,32 € | — | 28.999,20 € | 3.999,20 € |
| **Amortizable a 7 años (84 meses)** | 365,21 € | — | 30.677,96 € | 5.677,96 € |
| **Pago diferido a 5 años** | 0,00 € | 33.721,25 € | 33.721,25 € | 8.721,25 € |
| **Bono cupón cero (5 años, $V_N = 25.000\text{ €}$)** | 0,00 € | 25.000,00 € *(recibes 18.534,30 €)* | 25.000,00 € | 6.465,70 € |

Extender el préstamo de 3 a 7 años recorta la cuota mensual un **`52,0 %`** (`395,34 €` menos), pero multiplica los intereses totales por **`2,39`**, añadiendo **`3.298,22 €`** de sobrecosto. En bienes que se deprecian rápido, como automóviles, los plazos largos pueden dejar el saldo vivo por encima del valor de mercado durante años.

## Errores Frecuentes al Simular y Contratar un Préstamo

* **Comparar por TIN en vez de TAE o CAT:** un TIN bajo acompañado de comisión de apertura del 2 % y seguros obligatorios suele resultar más caro que una oferta con TIN algo mayor y sin gastos vinculados.
* **Alargar el plazo solo para bajar la cuota:** cada año extra mantiene alto el capital pendiente y encarece los intereses acumulados; elige el plazo más corto compatible con tu presupuesto.
* **Omitir la frecuencia de capitalización:** en el préstamo diferido de `25.000 €` a 5 años al `6,00 %`, capitalizar mensualmente frente a anualmente (`33.455,64 €`) suma **`265,61 €`** extra en intereses.
* **Reiniciar el plazo al refinanciar:** reemplazar un crédito con 2 años restantes por otro nuevo a 5 años puede elevar el costo total pese a un TIN inferior; mantén siempre un plazo igual o menor al pendiente.
