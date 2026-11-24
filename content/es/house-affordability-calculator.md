---
title: "Calculadora de Asequibilidad de Vivienda"
metaTitle: "Calculadora de Asequibilidad de Vivienda | Hipoteca y DTI"
description: "Estima el precio máximo de la vivienda que puedes financiar según tus ingresos brutos, deudas mensuales, entrada disponible, tipo de interés (TIN), plazo y ratio DTI."
metaDescription: "Calcula el precio máximo de vivienda que puedes comprar según ingresos, deudas, entrada, TIN y ratio DTI. Estima tu cuota hipotecaria real al instante."
metaKeywords: "calculadora de asequibilidad de vivienda, cuanta casa puedo comprar, asequibilidad de hipoteca, capacidad de endeudamiento, ratio DTI, cuota hipotecaria, entrada vivienda"
faqs:
  - question: "¿Cómo calcula un banco el precio máximo de vivienda que puedo pagar?"
    answer: "Las entidades aplican un límite de esfuerzo financiero (ratio DTI) sobre tus ingresos mensuales, restan tus cuotas de deuda vigentes y reservan el margen restante para cubrir capital, intereses del cuadro de amortización, impuestos sobre la propiedad, seguro de hogar y cuota de comunidad. A partir de ese presupuesto mensual despejan el capital financiable y le suman tu entrada disponible."
  - question: "¿Qué relación deuda-ingreso (DTI) suele exigirse en España y Latinoamérica?"
    answer: "En España y Europa, los criterios prudenciales recomiendan que el conjunto de deudas no supere el 30 % al 35 % de los ingresos disponibles, mientras que el referente hipotecario internacional fija el 36 % de los ingresos brutos totales. Algunos bancos admiten hasta el 40 % o 43 % con perfiles de alta estabilidad laboral y ahorro elevado, aunque con menor colchón de seguridad."
  - question: "¿Debo introducir todo mi ahorro en el campo de entrada o enganche?"
    answer: "No. Antes de asignar tu entrada debes apartar los gastos de compraventa y escrituración —como el Impuesto de Transmisiones Patrimoniales (ITP) o IVA, notaría, registro de la propiedad, tasación y gestoría—, que suelen absorber entre un 8 % y un 12 % adicional en España y entre un 4 % y un 8 % en muchos países de Latinoamérica."
  - question: "¿Por qué una pequeña deuda de coche o tarjeta reduce tanto el presupuesto de compra?"
    answer: "Porque cada euro o dólar comprometido en deudas de corto plazo resta capacidad directa a la cuota mensual hipotecaria durante los próximos 20 o 30 años. Por ejemplo, con una hipoteca al 3,60 % a 30 años, eliminar una cuota mensual de 350 € amplía el precio máximo asequible de la vivienda en cerca de 69.356 €."
  - question: "¿Cuál es la diferencia entre el TIN y la TAE al estimar la asequibilidad?"
    answer: "El Tipo de Interés Nominal (TIN) determina la cuota pura mensual del cuadro de amortización francés, mientras que la Tasa Anual Equivalente (TAE) incorpora además comisiones de apertura, tasación y productos vinculados exigidos por el banco. Para comparar ofertas hipotecarias de forma fiable conviene revisar siempre la TAE junto con el gasto mensual total de tenencia."
---

Comprar una vivienda exige alinear dos límites concretos: tu **capacidad de pago mensual** y el **ahorro líquido** reservado para la entrada o enganche. Fijarse solo en un múltiplo del salario anual ignora que las deudas vigentes, los impuestos locales, la comunidad y cada medio punto en el tipo de interés modifican de forma decisiva el precio que un banco financiará.

Esta **Calculadora de Asequibilidad de Vivienda** reproduce el filtro bancario real en `EUR €` o `USD $`. A partir de tus ingresos brutos anuales, deudas mensuales, entrada, tipo de interés nominal (TIN), plazo, impuesto anual sobre la propiedad (IBI o predial), seguro de hogar y cuota de comunidad, determina el **precio máximo de compra**, el capital financiable y el desglose exacto de tu cuota.

## Ecuación de Asequibilidad y Cuadro de Amortización Francés

El cálculo enlaza el tope de endeudamiento (**ratio DTI**) con el factor mensual del **cuadro de amortización** de cuota constante (sistema francés) para despejar directamente el valor máximo del inmueble.

### 1. Presupuesto Mensual Máximo de Vivienda

Sea $Y_m = Y_{\text{anual}} / 12$ el ingreso bruto mensual, $L$ el límite máximo de endeudamiento en decimal (como `0,35` o `0,36`) y $D_{\text{exist}}$ la suma de cuotas mensuales vigentes (coche, tarjetas o préstamos personales):

$$H_{\text{máx}} = \max\!\left(0,\; L \cdot Y_m - D_{\text{exist}}\right)$$

### 2. Factor de Cuota y Precio Máximo Financiable

Con tasa mensual $r = \text{TIN} / 12$ y $n = 12t$ pagos en $t$ años, el factor mensual $f$ del sistema francés es:

$$f = \frac{r(1 + r)^n}{(1 + r)^n - 1} \qquad \left(\text{si } r = 0,\; f = \frac{1}{n}\right)$$

Dado que $H_{\text{máx}}$ cubre capital e intereses sobre el préstamo ($P = V - E$), impuesto mensual ($V \cdot \tau_m$), seguro ($S_m$) y comunidad ($C_m$), se cumple $H_{\text{máx}} = (V - E)f + V\tau_m + S_m + C_m$. Despejando el precio máximo $V_{\text{máx}}$:

$$V_{\text{máx}} = \frac{H_{\text{máx}} - S_m - C_m + E \cdot f}{f + \tau_m}$$

Donde:

* **$V_{\text{máx}}$ y $P = V_{\text{máx}} - E$:** precio máximo asequible y capital hipotecario financiado.
* **$E$:** entrada o enganche neto disponible tras apartar impuestos y gastos de escrituración.
* **$f$:** cuota mensual de amortización e intereses por cada unidad monetaria prestada.
* **$\tau_m = \tau_{\text{anual}} / 12$:** tasa mensual del impuesto inmobiliario (IBI o impuesto predial).
* **$S_m$ y $C_m$:** prima mensual del seguro de hogar y cuota mensual de comunidad.

## Ejemplo Práctico Paso a Paso: Hogar con 60.000 € Anuales

Evaluemos un hogar con **$Y_{\text{anual}} = 60.000\text{ €}$** (`5.000 €/mes`), préstamo de coche de **$D_{\text{exist}} = 350\text{ €/mes}$** y **$E = 60.000\text{ €}$** para entrada. Aplicamos un techo **$L = 35\,\%$**, hipoteca fija al **$\text{TIN} = 3{,}60\,\%$** a **30 años** (`360` cuotas), IBI del **$0{,}60\,\%$** ($\tau_m = 0{,}0005$), seguro de `480 €/año` ($S_m = 40\text{ €}$) y comunidad de $C_m = 80\text{ €/mes}$.

1. **Cuota máxima de vivienda:** $H_{\text{máx}} = 0{,}35 \times 5.000 - 350 = \mathbf{1.400{,}00\text{ €/mes}}$.
2. **Factor mensual ($f$):** con $r = 0{,}003$ y $(1{,}003)^{360} \approx 2{,}939923$:
   $$f = \frac{0{,}003 \times 2{,}939923}{2{,}939923 - 1} \approx \mathbf{0{,}00454645}$$
3. **Precio máximo de compra ($V_{\text{máx}}$):**
   $$V_{\text{máx}} = \frac{1.400 - 40 - 80 + 60.000 \times 0{,}00454645}{0{,}00454645 + 0{,}0005} = \frac{1.552{,}79}{0{,}00504645} \approx \mathbf{307.698{,}71\text{ €}}$$
4. **Desglose mensual exacto:** con un préstamo de **$P = 247.698{,}71\text{ €}$**, la cuota de capital e intereses asciende a `1.126,15 €`, el IBI mensual a `153,85 €`, el seguro a `40,00 €` y la comunidad a `80,00 €`, sumando exactamente **`1.400,00 €/mes`** (`35,00 %` de DTI).

Destacan dos conclusiones prácticas: el préstamo equivale al **`80,5 %`** del precio (si el banco limita la financiación al `80 %`, tu entrada fijará un tope real de `300.000 €`), y cancelar el préstamo de `350 €/mes` elevaría tu presupuesto máximo a **`377.054,34 €`** (**`+69.355,64 €`**).

## Tabla de Sensibilidad: Impacto del TIN y el Plazo

Con el mismo perfil (`60.000 €` anuales, `350 €` de deudas, `60.000 €` de entrada, `35 %` de DTI y `0,60 %` de IBI), la tabla muestra la caída del presupuesto cuando sube el interés o se reduce el plazo:

| TIN Anual | Precio Máximo (30 años) | Préstamo (30 años) | Capital e Intereses | % Financiado | Precio Máximo (20 años) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2,50 %** | 340.822,58 € | 280.822,58 € | 1.109,59 € | 82,4 % | 275.553,33 € |
| **3,60 %** | 307.698,71 € | 247.698,71 € | 1.126,15 € | 80,5 % | 256.815,84 € |
| **4,50 %** | 284.543,38 € | 224.543,38 € | 1.137,73 € | 78,9 % | 243.110,11 € |
| **5,50 %** | 262.334,45 € | 202.334,45 € | 1.148,83 € | 77,1 % | 229.402,56 € |
| **6,50 %** | 243.266,18 € | 183.266,18 € | 1.158,37 € | 75,3 % | 217.119,43 € |

Subir del `2,50 %` al `6,50 %` a 30 años recorta la capacidad de compra en **97.556,40 €** (`-28,6 %`), un efecto idéntico al operar en hipotecas en `USD $`.

## Errores Habituales al Estimar tu Presupuesto Hipotecario

* **Confundir la entrada con el ahorro total:** en España el ITP o IVA, notaría, registro y tasación rondan el `10 %`; comprar una vivienda de `300.000 €` con `20 %` de entrada exige unos `90.000 €` líquidos, no solo `60.000 €`.
* **Comparar préstamos solo por TIN y no por TAE:** comisiones de apertura y seguros vinculados elevan el coste efectivo por encima de la rebaja nominal.
* **Agotar el DTI en hipotecas variables:** calcular al límite con el tipo inicial expone tu liquidez si repunta el Euríbor o la tasa de referencia local.
* **Olvidar el límite del 80 % sobre tasación:** aunque los ingresos permitan mayor cuota, la banca suele financiar hasta el `80 %` del menor valor entre compraventa y tasación.
* **Ignorar el mantenimiento anual:** reserva al menos un `1 %` del valor del inmueble cada año para reparaciones y derramas.
