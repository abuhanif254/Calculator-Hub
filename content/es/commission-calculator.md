---
title: "Calculadora de Comisiones"
metaTitle: "Calculadora de Comisiones | Ventas, Niveles y Ganancias"
description: "Calcula comisiones por ventas, escalas progresivas o planas, repartos inmobiliarios, programas de afiliados, proyectos independientes y distribución de beneficios netos."
metaDescription: "Calcula comisiones por ventas, tramos progresivos o planos, repartos inmobiliarios, afiliados y beneficios netos tras impuestos al instante."
metaKeywords: "calculadora de comisiones, comision por ventas, comisiones escalonadas, comision inmobiliaria, afiliados, distribucion de ganancias, comision progresiva, calcular comision"
faqs:
  - question: "¿Qué diferencia práctica existe entre una comisión escalonada progresiva y una plana retroactiva?"
    answer: "En el modelo progresivo cada porcentaje superior se aplica únicamente al tramo de ventas que excede el umbral anterior, de forma análoga a los tramos del IRPF. En el modelo plano retroactivo, al superar una meta comercial, la tasa más alta pasa a aplicarse retroactivamente sobre la totalidad de las ventas del periodo, generando saltos bruscos de compensación."
  - question: "¿Debe calcularse la comisión comercial sobre el importe con IVA o sobre la base imponible neta?"
    answer: "Siempre sobre la base imponible neta, descontando el IVA u otros impuestos indirectos, devoluciones y descuentos comerciales. El impuesto recaudado corresponde a la administración tributaria y no constituye ingreso real para la empresa."
  - question: "¿Cómo se reparte paso a paso una comisión inmobiliaria entre agencias, franquicia y agentes?"
    answer: "Primero se calcula el fondo total sobre el precio de escrituración (habitualmente entre el 3 % y el 6 %) y se divide entre la agencia captadora y la compradora (a menudo 50/50). Sobre la porción de cada parte se deduce primero la regalía de franquicia si existe y, del remanente, se aplica el reparto pactado entre correduría y agente."
  - question: "¿Para qué sirve el modo inverso de la calculadora de comisiones?"
    answer: "El cálculo inverso parte de tu meta de ingresos brutos y despeja exactamente qué volumen de facturación debes cerrar para alcanzarla según tu porcentaje de comisión y tu bono fijo, facilitando la planificación de cuotas semanales o mensuales."
  - question: "¿Cómo afectan las retenciones fiscales y las devoluciones al cobro neto de comisiones?"
    answer: "Las comisiones forman parte de la renta gravable y están sujetas a retención de IRPF o impuestos sobre la renta locales, reduciendo el importe disponible en cuenta entre un 15 % y un 35 % según tramo. Además, muchos contratos devengan la comisión al cobro efectivo de la factura para evitar ajustes posteriores por impagos o cancelaciones."
---

En ventas corporativas, corretaje inmobiliario, plataformas digitales y programas de afiliados, la retribución variable define el grueso de los ingresos. Sin embargo, pasar del volumen facturado al ingreso real disponible en cuenta rara vez es una simple multiplicación: los **tramos marginales**, las **regalías de franquicia**, las **comisiones de plataforma** y las **retenciones fiscales** alteran el cobro neto en más de un 30 %.

Nuestra **Calculadora de Comisiones** cubre seis esquemas profesionales en `EUR €` o `USD $`: **comisión básica e inversa** (por objetivo), **escala por niveles** (progresiva o plana retroactiva), **reparto inmobiliario**, **afiliados con recurrencia**, **proyectos independientes** y **reparto de beneficios** entre socios, mostrando siempre el neto tras impuestos.

## Ecuaciones de los Modelos de Comisión

### 1. Comisión Básica, Cálculo Inverso y Pago Neto

Sea $V$ el volumen de ventas netas (sin IVA), $t$ la tasa en decimal, $B$ el bono fijo y $r_{\text{imp}}$ la retención fiscal. El cobro bruto $C_{\text{bruta}}$, el neto $C_{\text{neta}}$ y las ventas requeridas $V_{\text{req}}$ para un objetivo bruto $G$ son:

$$C_{\text{bruta}} = V \cdot t + B, \qquad C_{\text{neta}} = C_{\text{bruta}}(1 - r_{\text{imp}}), \qquad V_{\text{req}} = \frac{\max(0,\; G - B)}{t}$$

### 2. Escala Progresiva frente a Tasa Plana Retroactiva

Con umbrales crecientes $0 = U_0 < U_1 < \dots < U_k$ y tasas $t_1, \dots, t_k$, el **modelo progresivo** aplica cada tipo solo a la fracción vendida dentro de su intervalo (y el exceso sobre $U_k$ liquida al último tipo $t_k$):

$$C_{\text{prog}} = \sum_{i=1}^{k} \max\!\left(0,\; \min(V,\, U_i) - U_{i-1}\right)\cdot t_i + \max(0,\; V - U_k)\cdot t_k + B$$

En el **modelo plano retroactivo**, al alcanzar el mayor umbral $V \ge U_j$ con tasa $t_{\text{activo}}$, todo el volumen liquida a esa tasa única: $C_{\text{plana}} = V \cdot t_{\text{activo}} + B$.

### 3. Corretaje Inmobiliario y Afiliados Recurrentes

Para un inmueble de precio $P$, comisión global $t_{\text{tot}}$, reparto entre agencias $s_{\text{lado}}$, regalía de franquicia $f_{\text{franq}}$ y participación del agente $s_{\text{agente}}$:

$$C_{\text{agente}} = P \cdot t_{\text{tot}} \cdot s_{\text{lado}} \cdot (1 - f_{\text{franq}}) \cdot s_{\text{agente}}$$

En **afiliación** con $N$ clientes, precio $p$, bono fijo por alta ($\text{CPA}$), tasa inicial $t_0$, tasa recurrente $t_{\text{rec}}$ y permanencia media de $L$ meses ($L \ge 1$):

$$C_{\text{afiliado}} = N \cdot \left[\text{CPA} + p \cdot t_0 + p \cdot t_{\text{rec}} \cdot (L - 1)\right]$$

## Ejemplo Práctico Paso a Paso: Escala Progresiva, Plana e Inversa

Consideremos un comercial que cierra **$V = 75.000\text{ €}$** netos en el mes, con bono fijo **$B = 1.000\text{ €}$**, retención fiscal **$r_{\text{imp}} = 24\,\%$** y cuatro tramos: `5 %` hasta `15.000 €`, `8 %` hasta `40.000 €`, `12 %` hasta `70.000 €` y `15 %` por encima de `70.000 €`.

1. **Desglose progresivo por tramos:**
   * Tramo 1 (`15.000 €` al `5 %`): **`750,00 €`**
   * Tramo 2 (`25.000 €` al `8 %`): **`2.000,00 €`**
   * Tramo 3 (`30.000 €` al `12 %`): **`3.600,00 €`**
   * Excedente (`5.000 €` al `15 %`): **`750,00 €`**
2. **Bruto y neto progresivo:** la comisión variable suma **`7.100,00 €`** (tipo efectivo **`9,47 %`**). Con el bono de `1.000 €` totaliza **`8.100,00 €` brutos**; descontando el `24 %` de retención (`1.944,00 €`), el cobro neto es **`6.156,00 €`**.
3. **Contraste con tasa plana retroactiva:** al superar `70.000 €`, el `15 %` gravaría los `75.000 €` íntegros: $75.000 \times 0{,}15 + 1.000 = \mathbf{12.250{,}00\text{ €}}$ brutos (**`9.310,00 €`** netos), **`4.150,00 €`** más en bruto sobre la misma venta.
4. **Cálculo inverso de cuota:** para ganar `6.000 €` brutos con tasa fija del `6 %` y bono de `1.200 €`, la facturación necesaria es:
   $$V_{\text{req}} = \frac{6.000 - 1.200}{0{,}06} = \mathbf{80.000{,}00\text{ €}}$$

## Tabla Comparativa: Los Seis Modelos de Comisión

| Modelo | Base | Fórmula Sintética | Ejemplo Verificado | Sector Habitual |
| :--- | :--- | :--- | :--- | :--- |
| **Básica fija** | Ventas netas | $V \cdot t + B$ | `50.000 €` × `5 %` + `1.000 €` = **3.500 €** | Ventas B2B, comercio |
| **Escala progresiva** | Tramos marginales | $\sum \Delta V_i t_i + B$ | `75.000 €` (5/8/12/15 %) + `1.000 €` = **8.100 €** | Software corporativo, banca |
| **Escala plana** | Total al umbral | $V \cdot t_{\text{activo}} + B$ | `75.000 €` × `15 %` + `1.000 €` = **12.250 €** | Equipos de cierre, seguros |
| **Inmobiliaria** | Precio escritura | $P \cdot t \cdot s_{\text{lado}} (1 - f) s_{\text{ag}}$ | `300.000 €`, `5 %`, 50/50, `4 %` franq., `70 %` = **5.040 €** | Corredurías inmobiliarias |
| **Afiliados** | Altas y renovaciones | $N[p t_0 + p t_{\text{rec}}(L-1)]$ | `100` × `50 USD`, `30 %` + `20 %` × 5 m = **6.500 USD** | Suscripciones, creadores |
| **Reparto beneficios** | Margen operativo | $(I_{\text{tot}} - G_{\text{op}}) s_{\text{socio}}$ | (`120.000 €` − `45.000 €`) × `60 %` = **45.000 €** | Socios y agencias |

En el modo para **profesionales independientes**, las comisiones intermedias se descuentan del presupuesto: un proyecto de `4.000 €` con `10 %` de plataforma y `5 %` de referido deja **`3.400 €`** antes de impuestos.

## Errores Frecuentes al Negociar y Liquidar Comisiones

* **Asumir retroactividad en escalas progresivas:** confundir ambos sistemas sobrestima el ingreso real en más de un tercio al superar un tramo.
* **Comisionar sobre importes con IVA incluido:** en España y Latinoamérica los impuestos indirectos deben quedar siempre fuera de la base comisionable.
* **Omitir deducciones en cascada:** en corretaje inmobiliario la regalía de franquicia se resta antes del reparto con la agencia, reduciendo el porcentaje neto del agente.
* **Ignorar cláusulas de devolución o devengo al cobro:** cuando existe retrocesión por cancelación o impago, conviene mantener reserva hasta vencer el plazo de garantía.
* **Planificar metas inversas sin descontar retenciones:** obtener `4.500 €` netos con un `25 %` de IRPF requiere `6.000 €` brutos (`4.500 / 0,75`).
