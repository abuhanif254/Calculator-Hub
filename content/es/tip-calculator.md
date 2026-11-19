---
title: "Calculadora de Propinas"
metaTitle: "Calculadora de Propinas: Dividir Cuenta e Impuestos"
description: "Calcule el porcentaje exacto de propina antes o después de impuestos, aplique descuentos y divida la cuenta de restaurante entre varios comensales al instante."
metaDescription: "Calcule propinas en restaurantes, separe el subtotal sin impuestos, aplique descuentos y divida la cuenta entre amigos con las costumbres de cada país."
metaKeywords: "calculadora de propinas, dividir cuenta restaurante, calcular propina antes o despues de impuestos, porcentaje de propina por pais, propina en espana mexico estados unidos"
faqs:
  - question: "¿La propina debe calcularse sobre el subtotal antes de impuestos o sobre el total final con IVA?"
    answer: "Según las normas internacionales de etiqueta y consumo, la propina debe calcularse siempre sobre el subtotal antes de impuestos (base imponible). La propina es una gratificación por la comida y el servicio prestado por el personal, por lo que no tiene sentido aplicar un porcentaje adicional sobre el dinero recaudado para Hacienda."
  - question: "¿Cómo se calcula la propina si utilizo un cupón de descuento o una promoción 2x1?"
    answer: "Cuando se aplica un código promocional, descuento de fidelidad o tarjeta regalo, la buena práctica en hostelería consiste en calcular el porcentaje de propina sobre el importe original de los platos antes de restar el descuento, ya que el trabajo de cocina y atención en mesa ha sido idéntico."
  - question: "¿Qué diferencia hay entre el cargo por servicio incluido y la propina voluntaria?"
    answer: "El cargo por servicio ('service charge', 'auto-gratuity' o 'cubierto') es un suplemento fijo, habitualmente entre el 10 % y el 18 %, que muchos restaurantes añaden automáticamente a la factura en mesas de 6 o más personas. Si el ticket ya incluye un cargo por servicio, no es necesario dejar una segunda propina salvo que desee premiar una atención excepcional."
  - question: "¿Cuál es el porcentaje de propina habitual en España frente a México o Estados Unidos?"
    answer: "En España la propina es totalmente discrecional y suele oscilar entre el 5 % y el 10 % en restaurantes de mesa cuando el trato ha sido excelente. En México y gran parte de Latinoamérica el estándar habitual se sitúa entre el 10 % y el 15 %, mientras que en Estados Unidos y Canadá forma parte esencial del salario del camarero y oscila entre el 18 % y el 22 %."
  - question: "¿Cómo dividir la cuenta de forma justa cuando algunos comensales consumieron mucho más?"
    answer: "Si la diferencia de consumo es grande (por ejemplo, bebidas alcohólicas o entrantes exclusivos), lo más equitativo es calcular el porcentaje global de propina e impuestos de la mesa y aplicarlo proporcionalmente al subtotal de cada persona, utilizando el redondeo al alza para cubrir los céntimos impares."
---

Calcular la gratificación adecuada al finalizar una comida o cena parece sencillo hasta que intervienen impuestos indirectos, promociones en factura, recargos automáticos para grupos y la necesidad de repartir el pago entre varios amigos. Una diferencia aparentemente menor —como aplicar el porcentaje sobre el total con impuestos en lugar del subtotal neto— altera el desembolso final. Esta calculadora desglosa al céntimo la propina justa, el impuesto aplicable y la cuota exacta por comensal.

## ¿Se calcula la propina sobre el subtotal sin impuestos o sobre el total con IVA?

Uno de los errores más habituales al pagar con datáfono o terminal de punto de venta (TPV) ocurre cuando la pantalla sugiere botones rápidos de propina (15 %, 18 %, 20 %, 25 %) calculados automáticamente sobre el **total bruto con impuestos incluidos**:

* **Por qué debe usar el subtotal antes de impuestos:** En jurisdicciones como Estados Unidos, Canadá o México, o en facturas desglosadas en España y Latinoamérica, el impuesto al consumo (IVA, *Sales Tax* o ITBMS, entre el 7 % y el 21 %) es un tributo estatal. Si consume 100 $ y el impuesto local es del 10 %, su factura sube a 110 $. Al pulsar «20 %» sobre el total final, pagará 22 $ de propina en lugar de 20 $, lo que equivale en realidad a dejar un **22 % sobre su consumo neto**.
* **El efecto de los descuentos y tarjetas regalo:** En sentido inverso, si disfruta de un descuento promocional de 30 € en una cena cuyo valor de carta era de 120 €, calcular la propina solo sobre los 90 € restantes penaliza al equipo de sala, que sirvió una mesa de 120 €. Nuestra herramienta le permite elegir la base exacta sobre la que desea gratificar.

## Fórmulas matemáticas para el cálculo de propina y división por comensal

Para obtener un desglose financiero exacto, separamos en primer lugar la base neta del consumo respecto a la carga impositiva:

### 1. Extracción del subtotal neto (si el precio de carta ya incluye el IVA)
$$S_{\text{Neto}} = \frac{T_{\text{Facturado}}}{1 + t_{\text{Impuesto}}}$$

### 2. Cálculo del importe de la propina ($P$)
Cuando la propina se evalúa sobre el valor del servicio sin impuestos (sumando opcionalmente posibles descuentos $D_{\text{Promocional}}$ para no perjudicar al personal):

$$P = \left( S_{\text{Neto}} + D_{\text{Promocional}} \right) \times p_{\text{Propina}}$$

### 3. Factura total ($T_{\text{Final}}$) y cuota por persona ($C_{\text{Individual}}$)
$$T_{\text{Final}} = \left( S_{\text{Neto}} \times (1 + t_{\text{Impuesto}}) \right) + P \qquad \text{y} \qquad C_{\text{Individual}} = \frac{T_{\text{Final}}}{N_{\text{Comensales}}}$$

Variables del modelo:
* $S_{\text{Neto}}$: Subtotal de comida y bebida antes de impuestos (tras aplicar el descuento en factura).
* $t_{\text{Impuesto}}$: Tipo impositivo en tanto por uno (ej. $0,10$ para un 10 % de IVA en hostelería, o $0,085$ para un 8,5 % de *Sales Tax*).
* $D_{\text{Promocional}}$: Importe descontado mediante cupones o promociones.
* $p_{\text{Propina}}$: Porcentaje de propina elegido en tanto por uno (ej. $0,18$ para el 18 %).
* $N_{\text{Comensales}}$: Número total de personas entre las que se divide la cuenta.

## Ejemplo práctico paso a paso: Cena de grupo con impuestos y descuento

Supongamos que **$N = 4\text{ comensales}$** acuden a cenar. El importe original de la carta suma **$160,00\text{ \$}$**, pero canjean un cupón de **$D_{\text{Promocional}} = 20,00\text{ \$}$**, reduciendo el subtotal facturado a **$S_{\text{Neto}} = 140,00\text{ \$}$**. El impuesto local es del **$8,5\,\%$** ($t_{\text{Impuesto}} = 0,085$) y acuerdan dejar una **propina del $18\,\%$** ($p_{\text{Propina}} = 0,18$).

1. **Impuesto sobre el subtotal facturado:** $\text{Impuesto} = 140,00 \times 0,085 = \mathbf{11,90\text{ \$}}$ (Total antes de propina = $\mathbf{151,90\text{ \$}}$).
2. **Cálculo de la propina (dos criterios):**
   * *Opción A (Sobre subtotal facturado sin impuestos):* $P_A = 140,00 \times 0,18 = \mathbf{25,20\text{ \$}}$.
   * *Opción B (Sobre consumo original antes del cupón, sin impuestos):* $P_B = 160,00 \times 0,18 = \mathbf{28,80\text{ \$}}$.
3. **Total de la mesa y división entre los 4 amigos (Opción A):**
   $$T_{\text{Final}} = 140,00 + 11,90 + 25,20 = \mathbf{177,10\text{ \$}} \implies C_{\text{Individual}} = \frac{177,10}{4} = \mathbf{44,28\text{ \$ por persona}}$$
   *(Con la Opción B, el total sería de $180,70\text{ \$}$, equivalente a **$45,18\text{ \$}$ por comensal**).*

## Guía internacional de propinas por país y servicio

| País o Región | Restaurantes de Mesa | Cafeterías y Bares | Reparto / Taxis | Costumbre y Regulación Local |
| :--- | :--- | :--- | :--- | :--- |
| **España** | **5 % – 10 %** (voluntario) | Redondeo (0,20 €–1 €) | 1 € – 2 € | Salario regulado por convenio; premia la excelencia. |
| **México** | **10 % – 15 %** (habitual) | 10 % en mesa | 10 % o 20–50 MXN | PROFECO prohíbe exigirla, pero el 10 %–15 % es norma social. |
| **EE. UU. y Canadá** | **18 % – 22 %** (estándar) | 1 $ – 2 $ por bebida | 15 % – 20 % | Parte esencial del sueldo del camarero. |
| **Colombia / Chile / Argentina** | **10 %** (sugerido) | Redondeo o 10 % | Redondeo en app | La ley permite sugerir el 10 % preguntando al cliente. |
| **Francia / Italia / Reino Unido** | **5 % – 12,5 %** (ver ticket) | Redondeo | Redondeo | Francia incluye servicio; Italia aplica *coperto*; Londres 12,5 %. |
| **Japón** | **0 %** (sin propina) | 0 % | 0 % | No se deja propina; el servicio ya está integrado. |

## Consejos prácticos para evitar cobros duplicados al pagar

* **Revise si el ticket ya incluye recargo por grupo:** En cenas de 6 o más personas, compruebe si figura una línea de *Service Charge*, *Gratuity* o *Servicio*. Si ya le cargaron un 15 % o 18 %, añadir otro 18 % en el datáfono duplicará la propina hasta el 36 %.
* **Atención a las pantallas táctiles en mostrador:** Muchos terminales en locales de comida para llevar (*take-away*) sugieren por defecto 20 %, 25 % y 30 %. En pedidos sin servicio de mesa puede elegir «Sin propina».
* **Efectivo frente a tarjeta:** Entregar la propina en efectivo asegura que el personal reciba el 100 % del importe de inmediato sin comisiones bancarias.
