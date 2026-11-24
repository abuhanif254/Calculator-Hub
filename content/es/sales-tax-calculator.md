---
title: "Calculadora de Impuesto sobre Ventas / IVA"
metaTitle: "Calculadora de IVA e Impuesto sobre Ventas | Extraer IVA"
description: "Calcula el IVA o impuesto sobre ventas en segundos: añade el tipo impositivo al precio neto o realiza el cálculo inverso para extraer la base imponible y la cuota tributaria."
metaDescription: "Calcula el IVA o impuesto sobre ventas al instante. Añade el porcentaje a un precio neto o extrae la base imponible y el impuesto del total."
metaKeywords: "calculadora de iva, impuesto sobre ventas, sacar iva, cálculo inverso del iva, base imponible, precio neto y bruto, cuota tributaria, igv, itbis"
faqs:
  - question: "¿Cómo se añade el IVA o impuesto sobre ventas a un precio neto?"
    answer: "Multiplica el precio neto o base imponible por el tipo impositivo expresado en decimal para obtener la cuota del impuesto y súmala al importe original. De forma directa, multiplicar la base imponible por (1 + tasa decimal) ofrece inmediatamente el precio bruto final."
  - question: "¿Cómo se extrae el IVA de un precio bruto que ya incluye impuestos?"
    answer: "Divide el precio bruto total entre (1 + tasa decimal) para recuperar la base imponible exacta. Después resta esa base imponible al precio total para conocer la cuota de impuesto contenida en el recibo o factura."
  - question: "¿Por qué es incorrecto restar el 21 % directamente al precio final para sacar el IVA?"
    answer: "Porque los porcentajes no son simétricos al aplicarse sobre bases distintas. Un producto de 100 € con un 21 % de IVA cuesta 121 €; si restaras el 21 % de 121 € descontarías 25,41 € y obtendrías 95,59 € en lugar de 100 €. Para revertir correctamente el impuesto siempre debes dividir entre 1,21."
  - question: "¿Qué diferencia existe entre el IVA y el impuesto estatal sobre ventas?"
    answer: "El IVA (al igual que el IGV en Perú o el ITBIS en República Dominicana) es un impuesto indirecto multifase que se aplica en cada eslabón de producción y distribución con derecho a deducir el impuesto soportado. El impuesto sobre ventas, habitual en Estados Unidos, es monofásico y se cobra una única vez en caja al consumidor final sumando tasas estatales, de condado y municipales."
  - question: "¿Los descuentos comerciales se aplican antes o después de calcular el IVA?"
    answer: "Por regla general tributaria, los descuentos comerciales previos a la emisión de la factura reducen directamente la base imponible, por lo que el IVA o impuesto sobre ventas se calcula siempre sobre el importe neto ya rebajado y no sobre el precio de catálogo original."
---

Los impuestos indirectos al consumo intervienen en todo presupuesto personal, comprobante comercial y declaración tributaria. En el ámbito hispanohablante adoptan denominaciones y tipos diversos —**IVA** en España, México, Argentina, Colombia o Chile; **IGV** en Perú; **ITBIS** en República Dominicana; **IGIC** en Canarias—, junto al **impuesto sobre ventas** estatal y municipal vigente en Estados Unidos y Canadá. Dominar tanto el cálculo directo como el inverso previene errores de facturación, márgenes comerciales mal estimados y descuadres en la liquidación periódica ante Hacienda.

Nuestra **Calculadora de Impuesto sobre Ventas / IVA** trabaja en modo dual: al **añadir impuesto**, calcula la cuota y el total bruto partiendo del precio neto; al **extraer impuesto** (cálculo inverso), desglosa un comprobante con impuestos incluidos para revelar al céntimo la base imponible real y la cuota tributaria.

## Ecuaciones del Cálculo Directo e Inverso de Impuestos

### 1. Cálculo Directo: Añadir Impuesto al Precio Neto

Conocida la **base imponible ($B$)** —el ingreso neto que conserva el vendedor— y el **tipo impositivo ($t$)** en decimal, la cuota tributaria ($I$) y el total bruto ($P_{\text{bruto}}$) se calculan mediante:

$$I = B \cdot t, \qquad P_{\text{bruto}} = B \cdot (1 + t)$$

### 2. Cálculo Inverso: Extraer Base Imponible y Cuota del Total

Cuando se dispone únicamente del importe final con impuestos incluidos ($P_{\text{bruto}}$), el desglose correcto divide entre el factor $(1 + t)$:

$$B = \frac{P_{\text{bruto}}}{1 + t}, \qquad I = P_{\text{bruto}} - B = P_{\text{bruto}} \cdot \frac{t}{1 + t}$$

### 3. Descuentos Comerciales y Peso Efectivo en el Precio Bruto

Los descuentos comerciales previos ($d$) minoran la base imponible antes de gravar el impuesto. Asimismo, la fracción real que ocupa el impuesto dentro del total facturado corresponde a la tasa efectiva sobre bruto ($t_{\text{bruto}}$):

$$P_{\text{final}} = B \cdot (1 - d) \cdot (1 + t), \qquad t_{\text{bruto}} = \frac{t}{1 + t}$$

Donde cada variable representa:

* **$B$**: Base imponible o precio neto libre de impuestos.
* **$t$**: Tipo impositivo aplicable en decimal (por ejemplo, $21\text{ \%} = 0,21$ o $16\text{ \%} = 0,16$).
* **$I$**: Cuota tributaria recaudada para la administración fiscal.
* **$P_{\text{bruto}}$**: Importe final con impuestos incluidos.
* **$d$**: Descuento comercial previo al impuesto expresado en decimal.
* **$t_{\text{bruto}}$**: Porcentaje real del impuesto dentro del total pagado (siempre inferior a $t$).

## Ejemplos Prácticos Resueltos Paso a Paso

### Ejemplo 1: Facturación Directa con Descuento e IVA del 21 % (España)

Una consultora emite una factura de servicios valorados en **800,00 €** con un descuento comercial del **10 %** ($d = 0,10$) y un IVA general del **21 %** ($t = 0,21$):

1. **Base imponible neta:** $B_{\text{desc}} = 800,00 \times (1 - 0,10) = \mathbf{720,00\text{ €}}$.
2. **Cuota de IVA repercutido:** $I = 720,00 \times 0,21 = \mathbf{151,20\text{ €}}$.
3. **Total bruto a cobrar:** $P_{\text{final}} = 720,00 + 151,20 = \mathbf{871,20\text{ €}}$ (comprobación: $720,00 \times 1,21 = 871,20\text{ €}$).

### Ejemplo 2: Cálculo Inverso desde un Recibo Bruto al 16 % (México / USD)

Una empresa contabiliza una factura pagada de equipo de oficina por **1.450,00 USD** con **16 %** de IVA incluido ($t = 0,16$) para separar el gasto deducible del impuesto acreditable:

1. **Base imponible:**
   $$B = \frac{1.450,00}{1,16} = \mathbf{1.250,00\text{ USD}}$$
2. **Cuota extraída:** $I = 1.450,00 - 1.250,00 = \mathbf{200,00\text{ USD}}$ ($1.250,00 \times 0,16 = 200,00\text{ USD}$).
3. **Error de la resta directa:** Descontar el $16\text{ \%}$ sobre $1.450,00\text{ USD}$ declararía un impuesto inflado de $232,00\text{ USD}$ y una base falsa de $1.218,00\text{ USD}$, generando un descuadre fiscal de **32,00 USD** frente al comprobante real.

## Tabla de Referencia: Tipos Generales y Desglose de 1.000,00 Brutos

Descomposición exacta de un comprobante de **1.000,00** (EUR o USD) con impuesto incluido en jurisdicciones representativas:

| Jurisdicción e Impuesto | Tipo / Factor | Peso en Bruto ($t_{\text{bruto}}$) | Neto de 1.000,00 | Impuesto |
| :--- | :--- | :--- | :--- | :--- |
| **España / Argentina (IVA general)** | 21,00 % (1,2100) | 17,36 % | 826,45 | 173,55 |
| **Colombia / Chile (IVA general)** | 19,00 % (1,1900) | 15,97 % | 840,34 | 159,66 |
| **Perú (IGV)** | 18,00 % (1,1800) | 15,25 % | 847,46 | 152,54 |
| **México (IVA general)** | 16,00 % (1,1600) | 13,79 % | 862,07 | 137,93 |
| **España (IVA reducido)** | 10,00 % (1,1000) | 9,09 % | 909,09 | 90,91 |
| **EE. UU. (tasa combinada ejemplo)** | 8,25 % (1,0825) | 7,62 % | 923,79 | 76,21 |
| **Canarias (IGIC general)** | 7,00 % (1,0700) | 6,54 % | 934,58 | 65,42 |

Un IVA del $21\text{ \%}$ representa exactamente el $17,36\text{ \%}$ del importe final abonado en caja, jamás el $21\text{ \%}$; esta asimetría porcentual se acentúa conforme aumenta el tipo impositivo.

## IVA frente a Impuesto sobre Ventas y Errores Contables Comunes

Aunque la aritmética por operación coincide, el mecanismo recaudatorio difiere: bajo el **IVA multifase**, cada empresa repercute el impuesto en sus ventas, deduce el impuesto soportado en sus compras e ingresa a Hacienda únicamente la diferencia sobre el valor añadido; en Europa y gran parte de Latinoamérica, el precio al consumidor final debe mostrarse con impuestos incluidos, mientras que entre empresas suele negociarse en precios netos. Por el contrario, el **impuesto sobre ventas monofásico** (como en Estados Unidos) se añade una sola vez en caja combinando tasas estatales, de condado y municipales sobre el precio de etiqueta.

Evita estos cuatro errores frecuentes en facturación y contabilidad:

* **Restar el porcentaje al total bruto:** Nunca multipliques el bruto por $t$ para hallar la cuota; divide siempre entre $(1 + t)$ para preservar la identidad contable $B + I = P_{\text{bruto}}$.
* **Mezclar tipos impositivos en una misma base:** Alimentos básicos, libros, transporte público o medicamentos suelen tributar a tipos reducidos o quedar exentos; agrupa siempre cada base por tipo en facturas mixtas.
* **Ignorar impuestos en cascada:** En combustibles, impuestos especiales o recargo de equivalencia minorista, determinados gravámenes previos forman parte de la base del IVA, elevando la carga efectiva por encima de la suma lineal.
* **Descuadres por redondeo de líneas frente a totales:** Redondear la cuota artículo por artículo puede diferir en varios céntimos frente al cálculo sobre la suma total de bases imponibles; sigue el criterio de redondeo exigido por la autoridad tributaria local.
