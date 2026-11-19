---
title: "Calculadora de Depreciación"
metaTitle: "Calculadora de Depreciación de Activos y Cuadro Contable"
description: "Calcule la pérdida de valor de sus activos fijos mediante los métodos lineal, saldo decreciente, suma de dígitos y unidades producidas."
metaDescription: "Calcule la depreciación contable y fiscal de activos fijos con los métodos lineal, saldo decreciente y suma de dígitos. Genere el cuadro anual exacto."
metaKeywords: "calculadora de depreciacion, amortizacion contable activos fijos, metodo lineal depreciacion, saldo doblemente decreciente, valor residual activo, vida util fiscal, suma de digitos de los años"
faqs:
  - question: "¿Cuál es la diferencia práctica entre depreciación lineal y depreciación acelerada para una empresa?"
    answer: "La depreciación lineal reparte el coste del activo en cuotas idénticas durante toda su vida útil, estabilizando el beneficio contable reportado. La depreciación acelerada (doble saldo decreciente o suma de dígitos) concentra un mayor gasto deducible en los primeros ejercicios, reduciendo la base imponible del Impuesto sobre Sociedades al inicio y mejorando la liquidez inmediata mediante el diferimiento fiscal."
  - question: "¿Por qué en el método de doble saldo decreciente no se resta el valor residual al principio del cálculo?"
    answer: "A diferencia del método lineal, el saldo decreciente aplica el porcentaje de amortización directamente sobre el Valor Neto Contable (valor en libros) al inicio de cada año, sin descontar previamente el valor residual. Sin embargo, la norma contable establece un límite estricto: en los últimos años de vida útil, la cuota se ajusta o se cambia a método lineal para que el valor final en libros nunca caiga por debajo del valor residual estimado."
  - question: "¿Se puede depreciar el valor total de compra de un inmueble comercial o nave industrial?"
    answer: "No. En la contabilidad financiera y fiscal (tanto bajo NIIF como en el Plan General de Contabilidad y legislaciones tributarias latinoamericanas), los terrenos no sufren desgaste físico ni agotamiento y tienen vida útil ilimitada. Antes de calcular la cuota anual, debe segregar el valor del suelo (según tasación o recibo catastral) y amortizar exclusivamente el coste de la construcción."
  - question: "¿Cómo se calcula la depreciación si el activo se compra a mitad del ejercicio fiscal?"
    answer: "La amortización comienza desde la fecha en que el activo está en condiciones técnicas de funcionamiento, no desde la fecha de factura o pago. Si una máquina entra en operación el 1 de julio en una empresa con cierre fiscal a 31 de diciembre, la cuota del primer año debe prorratearse proporcionalmente por los 6 meses de uso efectivo (184/365 días)."
  - question: "¿Qué gastos adicionales al precio de factura deben incluirse en el coste inicial depreciable?"
    answer: "El coste histórico o base capitalizable incluye el precio de adquisición neto de descuentos más todos los desembolsos directamente atribuibles para poner el activo en funcionamiento: transporte, seguros de tránsito, aranceles aduaneros, cimentación, montaje técnico y pruebas de calibración inicial. Los gastos de formación del personal o mantenimiento rutinario se contabilizan como gasto corriente del ejercicio."
---

En la gestión financiera empresarial, la **depreciación** (denominada **amortización del inmovilizado material** en España y depreciación de activos fijos en Latinoamérica) cuantifica la pérdida sistemática de valor que sufren los bienes productivos por el uso, el paso del tiempo y la obsolescencia tecnológica. Aunque constituye un gasto contable que no implica salida de efectivo (*gasto no monetario*), impacta directamente en el resultado operativo (EBIT), en el valor en libros del balance y en la carga del Impuesto sobre Sociedades o Impuesto sobre la Renta (ISR).

Elegir el método de amortización adecuado permite alinear el desgaste real de la maquinaria, flota de transporte o equipos informáticos con los ingresos que ayudan a generar, optimizando al mismo tiempo el escudo fiscal de la empresa.

## Métodos de Amortización Contable y sus Fórmulas Matemáticas

Todo cálculo parte de tres parámetros: el **Coste de Adquisición Capitalizado ($C$)**, que suma el precio de compra más los costes de instalación y puesta en marcha; el **Valor Residual o de Salvamento ($V_r$)**, que representa el importe estimado de recuperación al final del ciclo; y la **Vida Útil ($n$)**, expresada en años o unidades de producción. La diferencia $C - V_r$ conforma la **base amortizable**.

### 1. Método Lineal o de Cuota Constante
Es el estándar más utilizado por su simplicidad y por servir de referencia en las tablas fiscales oficiales. Asume que el activo aporta idéntica utilidad económica en cada ejercicio:

$$D_t = \frac{C - V_r}{n}$$

Donde $D_t$ es el gasto por depreciación del año $t$, y el Valor Neto Contable al cierre de dicho ejercicio es $VNC_t = C - (t \times D_t)$.

### 2. Método del Saldo Decreciente (y Doble Saldo Decreciente)
Este método acelerado aplica un porcentaje fijo sobre el **Valor Neto Contable inicial de cada año** ($VNC_{t-1}$). El factor de aceleración ($f$) suele fijarse en $2$ (doble saldo decreciente) o $1{,}5$:

$$D_t = VNC_{t-1} \times \left(\frac{f}{n}\right)$$

Aquí el valor residual $V_r$ no se descuenta al principio, sino que opera como suelo contable: en el tramo final de vida útil, la cuota se limita a $VNC_{t-1} - V_r$ para que el valor en libros final cierre exactamente en $V_r$.

### 3. Método de la Suma de los Dígitos de los Años (SDA)
Proporciona una desaceleración progresiva que amortiza el $100\%$ de la base depreciable. Primero se obtiene el denominador $S$ sumando los dígitos de los años de vida útil:

$$S = \frac{n(n + 1)}{2}$$

Para cada año $t$ (desde $1$ hasta $n$), el numerador corresponde a los años restantes de vida útil ($n - t + 1$):

$$D_t = (C - V_r) \times \frac{n - t + 1}{S}$$

### 4. Método de Unidades de Producción u Horas de Uso
Idóneo para maquinaria industrial, aeronaves o moldes cuyo desgaste depende de la intensidad de trabajo. Si la capacidad total certificada es $U_{\text{totales}}$ y en el año $t$ se producen $U_t$ unidades:

$$D_t = \left(\frac{C - V_r}{U_{\text{totales}}}\right) \times U_t$$

## Caso Práctico Comparativo: Maquinaria Industrial de 65.000 €

Una planta metalúrgica adquiere un centro de mecanizado CNC con un coste total capitalizado $C = 65.000\text{ €}$ ($61.500\text{ €}$ de factura más $3.500\text{ €}$ de instalación), un valor residual estimado $V_r = 5.000\text{ €}$ (**base amortizable** de $60.000\text{ €}$) y una vida útil $n = 5\text{ años}$:

1. **Lineal:** Cuota fija anual de $\frac{65.000 - 5.000}{5} = 12.000\text{ €/año}$ ($20\%$ anual sobre la base amortizable).
2. **Suma de Dígitos (SDA):** Con denominador $S = \frac{5 \times 6}{2} = 15$, las cuotas anuales sobre $60.000\text{ €}$ son: Año 1 ($\frac{5}{15}$) = $20.000\text{ €}$; Año 2 ($\frac{4}{15}$) = $16.000\text{ €}$; Año 3 ($\frac{3}{15}$) = $12.000\text{ €}$; Año 4 ($\frac{2}{15}$) = $8.000\text{ €}$; Año 5 ($\frac{1}{15}$) = $4.000\text{ €}$.
3. **Doble Saldo Decreciente ($f = 2$):** Aplica el $\frac{2}{5} = 40\%$ sobre el Valor Neto Contable inicial de cada año: Año 1 ($65.000 \times 0{,}40$) = $26.000\text{ €}$; Año 2 ($39.000 \times 0{,}40$) = $15.600\text{ €}$; Año 3 ($23.400 \times 0{,}40$) = $9.360\text{ €}$; Año 4 ($14.040 \times 0{,}40$) = $5.616\text{ €}$; y en el Año 5 se amortiza el remanente hasta el valor residual ($8.424 - 5.000 = 3.424\text{ €}$).

### Tabla Comparativa del Cuadro de Amortización (Maquinaria 65.000 €)

| Año | Cuota Lineal | VNC Lineal | Cuota Suma Dígitos | VNC Suma Dígitos | Cuota Doble Saldo | VNC Doble Saldo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Año 1** | 12.000 € | 53.000 € | 20.000 € | 45.000 € | 26.000 € | 39.000 € |
| **Año 2** | 12.000 € | 41.000 € | 16.000 € | 29.000 € | 15.600 € | 23.400 € |
| **Año 3** | 12.000 € | 29.000 € | 12.000 € | 17.000 € | 9.360 € | 14.040 € |
| **Año 4** | 12.000 € | 17.000 € | 8.000 € | 9.000 € | 5.616 € | 8.424 € |
| **Año 5** | 12.000 € | **5.000 €** | 4.000 € | **5.000 €** | 3.424 € | **5.000 €** |

## Criterios Fiscales y Errores Críticos en la Gestión de Activos

Al parametrizar sus activos fijos, distinga entre la **depreciación contable** (bajo normas NIIF/IFRS) y los coeficientes máximos de **depreciación fiscal** autorizados por la ley tributaria:

* **Omitir la segregación del terreno en inmuebles:** En naves industriales o locales (vida útil de 33 a 50 años, al $2\% - 3\%$ anual), el suelo nunca se amortiza. Si compra un inmueble por $400.000\text{ €}$ y el terreno representa el $35\%$ ($140.000\text{ €}$), solo puede depreciar los $260.000\text{ €}$ de la construcción.
* **Confundir mantenimiento (OPEX) con mejoras (CAPEX):** Las reparaciones ordinarias van a gasto del ejercicio; en cambio, una modernización estructural que prolonga la vida útil de la máquina (8 a 12 años) debe capitalizarse, recalculando las cuotas futuras.
* **Inflar el valor residual para maquillar el EBIT:** Asignar un valor de salvamento irrealmente alto reduce la cuota anual e infla el beneficio operativo a corto plazo, pero provocará una pérdida extraordinaria por deterioro al retirar el equipo.
