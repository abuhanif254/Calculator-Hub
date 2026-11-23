---
title: "Calculadora de Descuentos"
metaTitle: "Calculadora de Descuentos | Precio Final y Rebajas (%)"
description: "Calcula el precio final tras aplicar uno o varios descuentos sucesivos, el ahorro monetario exacto y el impacto del IVA o impuesto sobre las ventas en tus compras."
metaDescription: "Calcula fácilmente el precio final de cualquier producto en oferta. Introduce el precio original y el porcentaje de descuento para ver cuánto ahorras."
metaKeywords: "calculadora de descuentos, calcular porcentaje de rebaja, precio final con descuento, ahorro en compras, calculadora de rebajas, descuentos sucesivos"
faqs:
  - question: "¿Por qué un descuento del 30 % más un 20 % adicional no equivale a un 50 % de rebaja total?"
    answer: "Porque los descuentos sucesivos o acumulativos se aplican de forma multiplicativa y no aditiva. El primer descuento del 30 % reduce un artículo de 100 € a 70 €. El segundo descuento del 20 % se calcula únicamente sobre el subtotal rebajado de 70 € (lo que supone 14 € adicionales), dejando el precio final en 56 € y un descuento efectivo real del 44 %, no del 50 %."
  - question: "¿El impuesto sobre las ventas o IVA se calcula antes o después de aplicar el descuento?"
    answer: "En el comercio minorista y en la facturación estándar, los descuentos comerciales y promocionales reducen directamente la base imponible de la operación. Por tanto, primero se resta el descuento del precio original sin impuestos y, sobre ese nuevo importe neto rebajado, se aplica el porcentaje de IVA o impuesto local sobre las ventas. Matemáticamente, como ambos factores son multiplicativos, el orden entre el factor de rebaja y el factor de impuesto produce el mismo resultado si el precio base no cambia."
  - question: "¿Cómo puedo averiguar el precio original de un producto si solo conozco el precio rebajado y el porcentaje de descuento?"
    answer: "No debes sumar el porcentaje de descuento al precio rebajado, sino dividir el precio final entre el complemento decimal del descuento. Por ejemplo, si pagaste 68 € por una prenda que tenía un 15 % de descuento, divides 68 entre 0,85 (que es 1 menos 0,15), obteniendo exactamente el precio de etiqueta original de 80 €."
  - question: "¿Qué descuento porcentual real representan las ofertas como 2x1, 3x2 o la segunda unidad al 50 %?"
    answer: "Si compras unidades de igual precio, una promoción 2x1 equivale a un 50 % de descuento por unidad. Una oferta 3x2 (llevas tres y pagas dos) representa un ahorro del 33,33 % sobre el total. Por su parte, llevar la segunda unidad al 50 % de descuento supone pagar 1,5 veces el precio por dos artículos, lo que equivale exactamente a un 25 % de rebaja media por unidad."
  - question: "¿Conviene aplicar primero un cupón de importe fijo en dinero o un porcentaje de descuento?"
    answer: "Para el comprador, siempre resulta más ventajoso que la tienda aplique primero el descuento porcentual sobre el precio original completo y reste después el cupón de importe fijo (por ejemplo, 10 €). Si el comercio descuenta primero los 10 € fijos, la base sobre la que se calcula el porcentaje de rebaja disminuye y el ahorro monetario total será menor."
---

## Matemática Comercial de los Descuentos y Promociones

Durante campañas comerciales de gran volumen —como rebajas de temporada, liquidaciones de inventario, *Black Friday* o promociones con cupones acumulables— los comercios emplean estructuras de precios que combinan porcentajes de rebaja directos, descuentos escalonados sobre artículos ya rebajados y promociones por volumen. Comprender la aritmética detrás de cada oferta permite verificar en segundos el **precio neto de compra**, el **ahorro monetario real** y el **descuento porcentual efectivo** antes de pasar por caja.

En contabilidad minorista y finanzas del consumidor, todo descuento porcentual opera como una reducción proporcional sobre el valor de referencia vigente en cada etapa de la transacción. Dominar el método del **factor complementario** evita errores de cálculo mental y permite comparar ofertas de distinta naturaleza.

---

## Fórmulas Exactas para Calcular Descuentos

### 1. Descuento Simple y Método del Complemento

Dado un precio original ($P_0$) y un porcentaje de descuento único ($d$, expresado entre $0$ y $100$), el ahorro monetario ($A$) y el precio final con descuento ($P_f$) se determinan mediante:

$$
A = P_0 \times \left( \frac{d}{100} \right) \quad ; \quad P_f = P_0 - A = P_0 \times \left( 1 - \frac{d}{100} \right)
$$

El término $\left( 1 - \frac{d}{100} \right)$ es el **complemento del descuento** y representa la proporción del precio original que el cliente abona. Ante una rebaja del $35\,\%$, el comprador paga directamente el $65\,\%$ del valor ($P_f = P_0 \times 0,65$).

### 2. Descuentos Sucesivos o Acumulativos (Doble Rebaja)

Cuando sobre un mismo producto se encadenan dos descuentos porcentuales ($d_1$ y $d_2$), la segunda rebaja actúa exclusivamente sobre el subtotal resultante del primer descuento:

$$
P_f = P_0 \times \left( 1 - \frac{d_1}{100} \right) \times \left( 1 - \frac{d_2}{100} \right)
$$

El **porcentaje de descuento único equivalente ($d_{\text{eq}}$)** a dos rebajas sucesivas $d_1$ y $d_2$ responde a la ecuación:

$$
d_{\text{eq}} = d_1 + d_2 - \frac{d_1 \times d_2}{100}
$$

### 3. Precio Total con Impuestos (IVA / Sales Tax) y Cálculo Inverso

Si el precio de etiqueta no incluye impuestos indirectos y debe añadirse una tasa impositiva ($t$), el desembolso final en caja ($P_{\text{total}}$) y la fórmula inversa para reconstruir el precio original ($P_0$) son:

$$
P_{\text{total}} = P_f \times \left( 1 + \frac{t}{100} \right) \quad ; \quad P_0 = \frac{P_f}{1 - \frac{d}{100}}
$$

### Definición de Variables
* **$P_0$ (Precio Original):** Precio de catálogo o etiqueta antes de promociones (en $€$ o $\text{USD}$).
* **$d, d_1, d_2$ (Porcentajes de Descuento):** Tasas nominales de rebaja expresadas en porcentaje ($\%$).
* **$A$ (Ahorro Total):** Importe monetario descontado respecto al precio original ($A = P_0 - P_f$).
* **$P_f$ (Precio Neto Rebajado):** Importe del artículo tras deducir los descuentos comerciales.
* **$d_{\text{eq}}$ (Descuento Efectivo Equivalente):** Porcentaje real de ahorro total sobre el precio inicial $P_0$.
* **$t$ (Tasa de Impuesto):** Porcentaje de Impuesto sobre el Valor Añadido (IVA) o impuesto sobre ventas.

---

## Ejemplo Numérico Paso a Paso

Imaginemos la compra de un portátil cuyo precio original sin impuestos es de **$1\,200,00\text{ €}$**. La tienda aplica una rebaja inicial del **$25\,\%$** y un cupón con un **$10\,\%$ adicional** sobre el precio ya rebajado, sujeto a un **$21\,\%$ de IVA**.

1. **Primer descuento ($d_1 = 25\,\%$):**
   * Primer ahorro: $A_1 = 1\,200,00\text{ €} \times 0,25 = 300,00\text{ €}$.
   * Subtotal rebajado: $P_1 = 1\,200,00\text{ €} - 300,00\text{ €} = 900,00\text{ €}$.
2. **Segundo descuento adicional ($d_2 = 10\,\%$):**
   * Segundo ahorro (sobre $900,00\text{ €}$): $A_2 = 900,00\text{ €} \times 0,10 = 90,00\text{ €}$.
   * Precio neto final: $P_f = 900,00\text{ €} - 90,00\text{ €} = 810,00\text{ €}$.
3. **Descuento efectivo equivalente ($d_{\text{eq}}$):**
   * Ahorro acumulado: $A = 300,00\text{ €} + 90,00\text{ €} = 390,00\text{ €}$.
   * Rebaja real: $d_{\text{eq}} = 25 + 10 - \frac{25 \times 10}{100} = 32,5\,\%$.
4. **Incorporación del impuesto ($t = 21\,\%$):**
   * Cuota de IVA ($170,10\text{ €}$) y total a pagar: $P_{\text{total}} = 810,00\text{ €} \times 1,21 = 980,10\text{ €}$.

---

## Tabla de Equivalencias de Descuentos Sucesivos y Promociones

Comparativa entre el descuento aparente anunciado y la **rebaja real efectiva** sobre **$100,00\text{ €}$**:

| Promoción Anunciada | Suma Aparente | Descuento Real ($d_{\text{eq}}$) | Factor Final | Precio ($100\text{ €}$) |
| :--- | :--- | :--- | :--- | :--- |
| **$20\,\% + 10\,\%$ adicional** | $30,00\,\%$ | **$28,00\,\%$** | $0,720$ | $72,00\text{ €}$ |
| **$30\,\% + 20\,\%$ adicional** | $50,00\,\%$ | **$44,00\,\%$** | $0,560$ | $56,00\text{ €}$ |
| **$40\,\% + 25\,\%$ adicional** | $65,00\,\%$ | **$55,00\,\%$** | $0,450$ | $45,00\text{ €}$ |
| **$50\,\% + 20\,\%$ adicional** | $70,00\,\%$ | **$60,00\,\%$** | $0,400$ | $40,00\text{ €}$ |
| **2.ª unidad al $50\,\%$** | $50,00\,\%$ (2.ª ud.) | **$25,00\,\%$ por ud.** | $0,750$ | $75,00\text{ €}$ |
| **Promoción $3 \times 2$** | 1 ud. gratis | **$33,33\,\%$ por ud.** | $0,667$ | $66,67\text{ €}$ |

---

## Consejos Prácticos y Trampas Frecuentes en Rebajas

* **Regla del artículo de menor valor en ofertas multicompra ($3 \times 2$ o 2.ª unidad):** Cuando combinas productos de distinto precio en una promoción $3 \times 2$ o de segunda unidad al $50\,\%$, la caja aplica la rebaja al **artículo más económico del lote**. Si compras un abrigo de $200\text{ €}$ y una camisa de $40\text{ €}$ con la segunda unidad al $50\,\%$, el ahorro será de solo $20\text{ €}$ ($8,33\,\%$ sobre $240\text{ €}$). Agrupa en compras separadas artículos de precio similar.
* **Secuencia entre cupones fijos y descuentos porcentuales:** Si combinas un cupón de $20\text{ €}$ y una rebaja del $20\,\%$ en una compra de $150\text{ €}$, verifica el orden de aplicación. Si se descuenta primero el $20\,\%$ y luego los $20\text{ €}$, pagarás $100\text{ €}$; si primero restan los $20\text{ €}$ y luego aplican el $20\,\%$ sobre $130\text{ €}$, abonarás $104\text{ €}$.
* **Umbrales de envío gratuito:** Comprueba si el pedido mínimo para envío gratis (por ejemplo, $50\text{ €}$) se evalúa sobre el subtotal original o sobre el importe neto rebajado, pues un descuento que deje el carrito en $48,50\text{ €}$ puede añadir gastos de envío.
* **Verificación del precio histórico de 30 días:** En la Unión Europea y diversas normativas de Latinoamérica, cualquier rebaja anunciada debe calcularse sobre el **precio más bajo registrado en los 30 días previos**, evitando subidas artificiales previas a la campaña.
