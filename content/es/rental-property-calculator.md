---
title: "Calculadora de Propiedades de Alquiler"
metaTitle: "Calculadora de Propiedad de Alquiler | Flujo de Caja y ROI"
description: "Analiza la rentabilidad de una propiedad en alquiler calculando el Ingreso Operativo Neto, el flujo de caja mensual, la tasa de capitalización y el ROI sobre efectivo."
metaDescription: "Analiza propiedades de alquiler: calcula Ingreso Operativo Neto, flujo de caja mensual, tasa de capitalización y ROI sobre el capital invertido."
metaKeywords: "calculadora de propiedades de alquiler, inversión inmobiliaria, flujo de caja alquiler, tasa de capitalización, ingreso operativo neto, retorno sobre inversión inmobiliaria"
faqs:
  - question: "¿Qué diferencia existe entre la tasa de capitalización y el retorno sobre efectivo (ROI)?"
    answer: "La tasa de capitalización divide el Ingreso Operativo Neto entre el precio de compra del inmueble y evalúa su rendimiento intrínseco como si se adquiriera al contado, sin hipoteca. El retorno sobre el efectivo invertido divide el flujo de caja anual después de hipoteca entre todo el dinero desembolsado de tu bolsillo (entrada, gastos de cierre y reforma)."
  - question: "¿Qué porcentaje de la renta conviene reservar para vacancia, mantenimiento y reformas mayores?"
    answer: "Un modelo prudente destina entre un 5 % y un 8 % de la renta bruta a periodos de desocupación o rotación de inquilinos, un 5 % adicional a reparaciones rutinarias y otro 5 % a un fondo de reposición para gastos de capital mayores como cubierta, caldera, electrodomésticos o climatización."
  - question: "¿Qué es la relación de cobertura del servicio de la deuda y qué umbral exigen los bancos?"
    answer: "La relación de cobertura del servicio de la deuda divide el Ingreso Operativo Neto anual entre el total anual de cuotas hipotecarias. La mayoría de las entidades que financian propiedades de inversión exigen un mínimo de 1,20 a 1,25, lo que garantiza que el alquiler neto cubre holgadamente la hipoteca incluso ante imprevistos."
  - question: "¿Cuándo genera ventaja financiera apalancarse con hipoteca en lugar de comprar al contado?"
    answer: "Existe apalancamiento financiero positivo cuando la tasa de capitalización del inmueble supera la constante anual de la deuda (cuotas anuales divididas entre el capital hipotecado). Si el interés hipotecario eleva dicha constante por encima de la tasa de capitalización, el endeudamiento reduce tu rentabilidad sobre el capital propio."
  - question: "¿Por qué el flujo de caja mensual no captura toda la rentabilidad real de un alquiler?"
    answer: "Además del flujo de caja libre mensual, un inmueble alquilado genera riqueza por otras tres vías: la amortización gradual del capital hipotecado que paga el propio inquilino con su renta, la plusvalía o revalorización histórica del activo y las deducciones fiscales sobre intereses, gastos operativos y depreciación del edificio."
---

Invertir en inmuebles de alquiler constituye una estrategia sólida para crear patrimonio y renta recurrente, pero castiga con dureza las estimaciones optimistas. Comprar una vivienda fijándose solo en el alquiler bruto anunciado oculta impuestos locales, periodos vacíos, reparaciones mayores y costes hipotecarios que pueden volver deficitaria la operación.

Nuestra **Calculadora de Propiedades de Alquiler** (compatible con euros € o dólares USD) condensa el análisis inmobiliario profesional en cinco métricas esenciales: **Ingreso Operativo Neto (ION)**, **flujo de caja mensual**, **tasa de capitalización**, **retorno sobre el efectivo invertido (ROI)** y **cobertura del servicio de la deuda**.

## Ecuaciones Fundamentales del Análisis Inmobiliario

Una evaluación rigurosa distingue entre la rentabilidad propia del inmueble y el efecto de la hipoteca.

### 1. Ingreso Efectivo Bruto e Ingreso Operativo Neto (ION)
A partir del alquiler mensual ($R_{\text{mensual}}$), otros ingresos ($O_{\text{mensual}}$, como garaje) y la tasa de vacancia esperada ($v$, en tanto por uno), se calcula el **Ingreso Efectivo Bruto ($IEB$)** y, tras deducir los gastos operativos anuales ($G_{\text{operativos}}$), el **Ingreso Operativo Neto ($ION$)**:

$$IEB = (R_{\text{mensual}} + O_{\text{mensual}}) \times 12 \times (1 - v), \qquad ION = IEB - G_{\text{operativos}}$$

El $ION$ excluye siempre las cuotas hipotecarias para medir la generación pura de caja del inmueble.

### 2. Servicio de la Deuda y Flujo de Caja Neto
Para un capital hipotecado $P$, tipo nominal mensual $r = \frac{\text{TIN anual}}{12 \times 100}$ y $n$ cuotas, la mensualidad fija ($M$), el **Servicio de la Deuda Anual ($SDA$)** y el **Flujo de Caja Anual ($FC_{\text{anual}}$)** son:

$$M = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}, \qquad SDA = 12M, \qquad FC_{\text{anual}} = ION - SDA$$

### 3. Tasa de Capitalización, ROI sobre Efectivo y Cobertura de Deuda
Con $V_{\text{compra}}$ como precio de adquisición y $E_{\text{total}} = E_{\text{inicial}} + G_{\text{cierre}} + G_{\text{reforma}}$ como capital propio desembolsado (entrada, impuestos de transmisión, notaría y reforma inicial):

$$TC = \frac{ION}{V_{\text{compra}}} \times 100, \qquad ROI_{\text{efectivo}} = \frac{FC_{\text{anual}}}{E_{\text{total}}} \times 100, \qquad RCSD = \frac{ION}{SDA}$$

## Ejemplo Práctico Resuelto Paso a Paso

Analicemos la compra de un apartamento urbano de **78 m²** por **200.000 €** ($V_{\text{compra}}$). Aportas un **20 % de entrada** (**40.000 €**), pagas **14.000 €** de impuestos y escrituración (7 %) y destinas **6.000 €** a adecuación inicial, sumando **60.000 €** de capital propio ($E_{\text{total}}$).

Hipotecas **160.000 €** a **30 años** ($n = 360$ meses) al **4,80 % TIN anual** ($r = 0,048 / 12 = 0,004$). La renta bruta es de **2.000 €/mes** (24.000 €/año) con un **5 %** de vacancia.

1. **Ingreso Efectivo Bruto ($IEB$):** $24.000 \times (1 - 0,05) = 22.800,00\text{ €/año}$.
2. **Gastos operativos anuales ($G_{\text{operativos}}$):**
   * Fijos: impuesto inmobiliario (900 €), seguro de hogar e impago (540 €) y comunidad (960 €) = **2.400,00 €**.
   * Variables sobre $IEB$: gestión inmobiliaria al 8 % (1.824,00 €), mantenimiento al 5 % (1.140,00 €) y fondo de reformas mayores al 5 % (1.140,00 €) = **4.104,00 €**.
   * Total operativo: $2.400,00 + 4.104,00 = 6.504,00\text{ €/año}$.
3. **Ingreso Operativo Neto ($ION$) y Tasa de Capitalización ($TC$):**
   $$ION = 22.800,00 - 6.504,00 = 16.296,00\text{ €/año}, \qquad TC = \frac{16.296,00}{200.000} \times 100 = 8,15\text{ \%}$$
4. **Cuota hipotecaria ($M$) y flujo de caja neto:**
   Con $(1,004)^{360} \approx 4,20858993$:
   $$M = 160.000 \times \frac{0,004 \times 4,20858993}{4,20858993 - 1} = 160.000 \times 0,00524665 = 839,46\text{ €/mes}$$
   * **Servicio de la deuda ($SDA$):** $839,46 \times 12 = 10.073,52\text{ €/año}$.
   * **Flujo de caja neto:** $16.296,00 - 10.073,52 = \mathbf{6.222,48\text{ €/año}}$ (**518,54 €/mes**).
5. **ROI sobre efectivo y cobertura de deuda ($RCSD$):**
   $$ROI_{\text{efectivo}} = \frac{6.222,48}{60.000} \times 100 = 10,37\text{ \%}, \qquad RCSD = \frac{16.296,00}{10.073,52} = 1,62$$

## Comparativa de Escenarios: Apalancamiento y Estrés

Esta tabla contrasta cuatro escenarios sobre la misma vivienda de **200.000 €** (más 20.000 € de cierre y reforma):

| Escenario | Capital Propio | ION Anual | Cuota ($M$) | Flujo Mensual | Tasa Cap. | ROI Efectivo | Cobertura |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Al contado (0 % deuda)** | 220.000 € | 16.296,00 € | 0,00 € | 1.358,00 € | 8,15 % | 7,41 % | Sin deuda |
| **Base (20 % entrada, 4,80 %)** | 60.000 € | 16.296,00 € | 839,46 € | 518,54 € | 8,15 % | **10,37 %** | 1,62 |
| **Tipo alto (6,60 % TIN)** | 60.000 € | 16.296,00 € | 1.021,85 € | 336,15 € | 8,15 % | **6,72 %** | 1,33 |
| **Vacancia alta (12 %, 4,80 %)** | 60.000 € | 14.918,40 € | 839,46 € | 403,74 € | 7,46 % | 8,07 % | 1,48 |

Al 4,80 % TIN la deuda genera **apalancamiento positivo**, elevando el ROI del 7,41 % al **10,37 %**. En cambio, al 6,60 % TIN el ROI cae al **6,72 %**, por debajo de la compra al contado (apalancamiento negativo).

## Errores Críticos que Destruyen la Rentabilidad

### 1. Omitir Vacancia y Reservas para Reformas Estructurales
Restar solo hipoteca e impuestos al alquiler crea un beneficio ficticio. Una caldera averiada o una derrama de 6.000 € pueden borrar un año entero de caja si no aprovisionas un fondo mensual separado.

### 2. Excluir Impuestos y Reforma del Capital Invertido
Dividir el flujo anual únicamente entre los 40.000 € de entrada —ignorando los 20.000 € de impuestos y obra— inflaría artificialmente el ROI del 10,37 % al 15,56 %, distorsionando la comparación frente a otras inversiones.

### 3. No Presupuestar Gestión Profesional al Autogestionar
Aunque atiendas tú mismo al inquilino al principio, incluye siempre entre un **8 % y 10 % de gestión** en la calculadora. Si el piso solo rinde cuando tu tiempo vale cero, no podrás delegar ni escalar tu cartera.
