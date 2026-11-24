---
title: "Calculadora de Préstamo FHA"
metaTitle: "Calculadora de Préstamo FHA | Cuota Mensual y Prima MIP"
description: "Calcula la cuota mensual de una hipoteca respaldada por la FHA con enganche desde el 3,5 %, prima de seguro hipotecario (MIP) inicial y anual, impuestos y seguro."
metaDescription: "Calcula tu pago mensual de préstamo FHA con enganche del 3,5 %, prima MIP inicial del 1,75 % y anual del 0,55 %, impuestos de propiedad y seguro."
metaKeywords: "calculadora de préstamo fha, hipoteca fha, prima de seguro hipotecario mip, enganche 3.5 fha, cuota mensual fha, requisitos préstamo fha"
faqs:
  - question: "¿Qué puntuación crediticia mínima exige un préstamo FHA para el enganche del 3,5 %?"
    answer: "Las normas de la Administración Federal de Vivienda (FHA) exigen una puntuación crediticia mínima de 580 puntos para acceder al pago inicial mínimo del 3,5 %. Los solicitantes con puntuaciones entre 500 y 579 puntos pueden optar al programa, pero deben aportar al menos un 10 % de enganche."
  - question: "¿Es posible cancelar la prima mensual del seguro hipotecario (MIP) en un préstamo FHA?"
    answer: "Si aportas menos del 10 % de pago inicial al originar la hipoteca, la prima mensual MIP permanece vigente durante toda la vida del préstamo y solo se elimina refinanciando a una hipoteca convencional una vez acumulado suficiente capital propio. Si aportas un 10 % o más de entrada, la MIP se cancela automáticamente tras 11 años de pagos puntuales."
  - question: "¿Conviene financiar la prima inicial del 1,75 % o pagarla en efectivo al cierre?"
    answer: "Financiar la prima inicial evita reducir tu liquidez de emergencia al escriturar, pero incrementa el saldo hipotecario y genera intereses compuestos durante 15 o 30 años. Si cuentas con reservas suficientes tras cubrir el enganche y los gastos de cierre, abonarla al contado reduce tanto la cuota mensual como el interés total."
  - question: "¿Se puede utilizar un préstamo FHA para comprar una propiedad de inversión o multifamiliar?"
    answer: "Los préstamos FHA están reservados exclusivamente para residencia principal: debes mudarte dentro de los 60 días posteriores al cierre y habitar la propiedad al menos un año. Sin embargo, el programa permite financiar edificios multifamiliares de hasta 4 unidades siempre que residas en una de ellas y alquiles las restantes."
  - question: "¿Cuándo resulta más conveniente una hipoteca convencional que un préstamo FHA?"
    answer: "Para compradores con puntuación crediticia igual o superior a 720 puntos y un enganche del 10 % al 20 %, la hipoteca convencional suele ofrecer una TAE más baja porque evita la prima inicial del 1,75 % y permite cancelar el seguro hipotecario privado al alcanzar el 20 % de capital propio. En perfiles con crédito de 580 a 680 y enganche reducido, la FHA suele ofrecer una cuota menor."
---

Para compradores de primera vivienda con ahorro limitado o historial crediticio moderado, la hipoteca asegurada por la **Administración Federal de Vivienda de Estados Unidos (FHA)** ofrece un acceso muy flexible a la propiedad. El respaldo federal protege al banco frente a impagos, permitiendo entradas desde el **3,5 %** y tipos nominales competitivos.

Nuestra **Calculadora de Préstamo FHA** desglosa tu cuota mensual en dólares estadounidenses (USD), integrando la **prima inicial del seguro hipotecario (1,75 %)**, la **prima anual mensualizada (MIP)**, los impuestos locales, el seguro de hogar y las cuotas de comunidad.

## Estructura y Requisitos del Programa FHA

La entidad bancaria concede el crédito bajo la garantía federal y cuatro reglas fundamentales:

* **Enganche y crédito:** Entrada mínima del **3,5 %** con puntuación crediticia desde 580, o del **10 %** entre 500 y 579 puntos.
* **Relación deuda-ingresos:** Referencia del **31 %** de ingresos brutos para vivienda y **43 %** para deudas totales, ampliable con factores compensatorios.
* **Doble prima de seguro hipotecario (MIP):** Todo prestatario paga una prima inicial del **1,75 %** y una prima anual prorrateada cada mes según plazo y porcentaje financiado.
* **Residencia principal y límites locales:** El capital base respeta los topes anuales por condado del HUD y el inmueble debe ocuparse como vivienda habitual.

## Fórmulas de Cálculo: Capital Financiado, MIP y Cuota Total

Habitualmente la prima inicial ($C_{\text{inicial}}$) se suma al capital base ($P_{\text{base}}$) para formar el saldo sujeto a intereses ($P_{\text{total}}$):

$$P_{\text{base}} = V - E, \qquad C_{\text{inicial}} = P_{\text{base}} \times 0,0175, \qquad P_{\text{total}} = P_{\text{base}} + C_{\text{inicial}}$$

La cuota de capital e intereses ($M_{\text{PI}}$) por amortización francesa, la MIP mensual inicial ($M_{\text{MIP}}$) y el pago total ($M_{\text{total}}$) se calculan mediante:

$$M_{\text{PI}} = P_{\text{total}} \times \frac{r(1 + r)^n}{(1 + r)^n - 1}, \qquad M_{\text{MIP}} = \frac{P_{\text{base}} \times t_{\text{MIP}}}{12}$$

$$M_{\text{total}} = M_{\text{PI}} + M_{\text{MIP}} + \frac{I_{\text{anual}} + S_{\text{anual}}}{12} + G_{\text{com}}$$

Donde **$V$** y **$E$** son el precio de compra y el enganche (USD); **$r = \frac{\text{TIN anual}}{12 \times 100}$** es la tasa mensual; **$n$** es el número de cuotas (360 o 180); **$t_{\text{MIP}}$** es la tasa anual MIP en decimal (recalculada cada año sobre el saldo programado); y **$I_{\text{anual}}$, $S_{\text{anual}}$ y $G_{\text{com}}$** son el impuesto predial anual, el seguro anual y la cuota mensual de comunidad.

## Ejemplo Práctico Resuelto Paso a Paso

Supongamos la compra de una vivienda principal de **320.000 USD** con enganche del **3,5 %** (**11.200 USD**), a **30 años** ($n = 360$) y tipo fijo del **6,00 % TIN anual** ($r = 0,005$). Los impuestos anuales suman **3.840 USD** (320,00 USD/mes), el seguro cuesta **1.500 USD/año** (125,00 USD/mes) y no hay cuotas de comunidad.

1. **Capital base, prima inicial (1,75 %) y saldo financiado:**
   $$P_{\text{base}} = 320.000 - 11.200 = 308.800\text{ USD}$$
   $$C_{\text{inicial}} = 308.800 \times 0,0175 = 5.404\text{ USD}, \qquad P_{\text{total}} = 314.204\text{ USD}$$
2. **Cuota mensual de capital e intereses ($M_{\text{PI}}$):**
   Con $(1,005)^{360} \approx 6,02257521$:
   $$M_{\text{PI}} = 314.204 \times \frac{0,005 \times 6,02257521}{6,02257521 - 1} = 314.204 \times 0,00599551 = 1.883,81\text{ USD/mes}$$
3. **Prima mensual MIP del primer año ($t_{\text{MIP}} = 0,55\text{ \%}$):**
   $$M_{\text{MIP}} = \frac{308.800 \times 0,0055}{12} = 141,53\text{ USD/mes}$$
4. **Cuota mensual total ($M_{\text{total}}$) y coste en 30 años:**
   $$M_{\text{total}} = 1.883,81 + 141,53 + 320,00 + 125,00 = \mathbf{2.470,34\text{ USD/mes}}$$
   En 360 pagos, capital e intereses suman **678.172,22 USD** (**363.968,22 USD** en intereses). Financiar los 5.404 USD de prima inicial sube la cuota en **32,40 USD/mes**, suponiendo **11.663,90 USD** acumulados en 30 años.

## Tabla Oficial de Prima Anual MIP (Préstamos Estándar)

Tasas vigentes de prima anual MIP y su impacto mensual inicial sobre una casa de **320.000 USD**:

| Plazo | Enganche (Financiación) | Capital Base | Prima Inicial (1,75 %) | MIP Anual | MIP Mensual | Duración MIP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **30 años (> 15)** | 3,5 % (96,5 %) | 308.800 USD | 5.404 USD | **0,55 %** | 141,53 USD | Toda la vida |
| **30 años (> 15)** | 5,0 % (95,0 %) | 304.000 USD | 5.320 USD | **0,50 %** | 126,67 USD | Toda la vida |
| **30 años (> 15)** | 10,0 % (90,0 %) | 288.000 USD | 5.040 USD | **0,50 %** | 120,00 USD | **11 años** |
| **15 años o menos** | 3,5 % (96,5 %) | 308.800 USD | 5.404 USD | **0,40 %** | 102,93 USD | Toda la vida |
| **15 años o menos** | 10,0 % (90,0 %) | 288.000 USD | 5.040 USD | **0,15 %** | 36,00 USD | **11 años** |

## Errores Frecuentes y Estrategias de Ahorro con Hipotecas FHA

### 1. Creer que la MIP Se Cancela al Llegar al 20 % de Patrimonio
Con menos del 10 % de enganche, la MIP **no desaparece automáticamente** al acumular 20 % de capital propio. Planifica refinanciar a una hipoteca convencional sin seguro cuando tu crédito mejore y el patrimonio alcance ese umbral.

### 2. Descuidar los Criterios de Habitabilidad en la Tasación FHA
El tasador FHA exige seguridad y salubridad: ausencia de pintura descascarada anterior a 1978, techos sanos, cableado seguro y barandillas intactas. Las viviendas con daños graves requieren reparación previa del vendedor o la modalidad de rehabilitación **FHA 203(k)**.

### 3. Desaprovechar Concesiones del Vendedor y Ayudas Locales
El programa permite concesiones del vendedor de hasta el **6 % del precio** para gastos de cierre y depósito en garantía, y admite subvenciones estatales o municipales para el enganche del 3,5 %, minimizando el efectivo inicial.
