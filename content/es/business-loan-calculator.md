---
title: "Calculadora de Préstamos Comerciales"
metaTitle: "Calculadora de Préstamos Comerciales: Cuota, TIN y TAE"
description: "Simule la cuota mensual, el cuadro de amortización y el coste real TAE de préstamos empresariales considerando comisiones de apertura."
metaDescription: "Calcule la cuota mensual, intereses totales y TAE real de préstamos comerciales para pymes. Compare financiación de circulante e inversión en activos."
metaKeywords: "calculadora de prestamos comerciales, prestamo para empresas y pymes, calcular cuota prestamo empresarial, cuadro de amortizacion frances, tin y tae prestamo negocios, ratio cobertura servicio deuda dscr"
faqs:
  - question: "¿Por qué la TAE de un préstamo empresarial suele ser bastante mayor que el TIN ofertado por el banco?"
    answer: "El Tipo de Interés Nominal (TIN) solo refleja el coste del dinero sobre el capital pendiente. En cambio, la Tasa Anual Equivalente (TAE) incorpora el efecto de la capitalización mensual más los gastos iniciales obligatorios: comisión de apertura y estudio, corretaje de póliza ante notario, primas de seguros vinculados y coste de avales. Cuanto más corto es el plazo del préstamo, más inflan las comisiones iniciales la TAE final."
  - question: "¿Qué es el periodo de carencia en un préstamo comercial y cómo afecta al coste total?"
    answer: "Un periodo de carencia (habitualmente de 6 a 24 meses al inicio de proyectos industriales) exime temporalmente a la empresa de devolver el principal. Si es carencia parcial, la empresa paga únicamente los intereses mensuales y el capital pendiente no baja; si es carencia total, los intereses se capitalizan sumándose a la deuda principal. En ambos casos, el importe total de intereses pagados al vencimiento aumenta de forma notable."
  - question: "¿Qué nivel de Ratio de Cobertura del Servicio de la Deuda (DSCR) exigen los comités de riesgo bancario?"
    answer: "La banca comercial suele exigir un DSCR (Debt Service Coverage Ratio) mínimo de entre 1,20x y 1,35x. Esto significa que el flujo de caja operativo libre de la empresa (EBITDA menos impuestos y CAPEX de mantenimiento) debe superar al menos en un 20 % a un 35 % la suma anual de cuotas de capital e intereses del préstamo solicitado junto con el resto de la deuda financiera vigente."
  - question: "¿Son deducibles fiscalmente los pagos mensuales de un préstamo de negocios?"
    answer: "Solamente la fracción de la cuota correspondiente a los intereses devengados y las comisiones bancarias de apertura o gestión constituyen un gasto financiero deducible en el Impuesto sobre Sociedades (con las limitaciones legales sobre el beneficio operativo, como el tope del 30 % del EBITDA). La devolución del principal amortizado es un movimiento de balance que reduce pasivo y tesorería, por lo que no es gasto deducible."
  - question: "¿Cuándo conviene elegir una póliza de crédito en lugar de un préstamo comercial a plazo fijo?"
    answer: "El préstamo comercial entrega todo el capital el primer día y devenga intereses por el 100 % del saldo desde el inicio, siendo idóneo para inversiones en activo fijo (maquinaria, reformas, adquisiciones). La póliza o línea de crédito permite disponer y devolver fondos según las puntas de tesorería, cobrando intereses solo por el saldo dispuesto, por lo que es la herramienta adecuada para financiar capital circulante."
---

Estructurar la financiación ajena de una pyme o corporación exige ir más allá de conocer la cuota mensual que se cargará en la cuenta corriente. Al evaluar un **préstamo comercial**, la dirección financiera debe contrastar el coste efectivo real de la deuda —medido a través de la **Tasa Anual Equivalente (TAE)** tras descontar comisiones de apertura y gastos de formalización— frente al retorno sobre el capital invertido (ROIC) que generará el proyecto financiado.

Tanto si busca financiar la adquisición de activos productivos (CAPEX) como si necesita consolidar pasivos o reforzar el fondo de maniobra, esta herramienta desglosa el cuadro de amortización período a período, diferenciando la carga financiera deducible del reembolso neto de capital.

## Anatomía Matemática de un Préstamo Empresarial (Sistema Francés y Coste Efectivo)

La gran mayoría de los préstamos corporativos y líneas de banca de desarrollo en España y Latinoamérica se estructuran bajo el **sistema de amortización francés** de cuotas periódicas constantes. Aunque la empresa abona el mismo importe total cada mes (a tipo fijo o hasta la revisión del índice de referencia), la composición interna cambia mes a mes: al principio predominan los intereses y progresivamente crece la proporción destinada a amortizar principal.

### 1. Fórmula de la Cuota Periódica Constante ($C$)
Dado un capital principal solicitado $P$, un Tipo de Interés Nominal anual ($\text{TIN}$) pagadero en $m$ periodos al año ($m = 12$ para pagos mensuales, $m = 4$ para trimestrales) y un plazo total de $n$ pagos:

$$r = \frac{\text{TIN}}{m}$$

$$C = P \times \frac{r(1 + r)^n}{(1 + r)^n - 1}$$

En cada periodo $k$ (desde $1$ hasta $n$), el desglose sobre el capital pendiente anterior ($S_{k-1}$) se calcula mediante tres ecuaciones:
* **Intereses del periodo ($I_k$):** $I_k = S_{k-1} \times r$ (gasto financiero deducible).
* **Amortización de capital ($A_k$):** $A_k = C - I_k$ (reducción del pasivo en balance).
* **Nuevo capital pendiente ($S_k$):** $S_k = S_{k-1} - A_k$.

### 2. Capital Neto Disponible y Coste Efectivo Real (TAE)
Si el banco aplica una comisión de apertura ($c_{\text{ap}}$ en tanto por uno) y existen gastos de intervención notarial o estudio ($G_f$), la liquidez neta que entra en tesorería en el momento cero es:

$$P_{\text{neto}} = P \times (1 - c_{\text{ap}}) - G_f$$

Como el banco calcula las cuotas sobre el nominal íntegro $P$ pero entrega solo $P_{\text{neto}}$, la **TAE real** supera al TIN contractual.

### 3. Ratio de Cobertura del Servicio de la Deuda (DSCR)
Los comités de riesgo bancario evalúan la capacidad de repago mediante la métrica **DSCR** (*Debt Service Coverage Ratio*):

$$\text{DSCR} = \frac{\text{EBITDA} - \text{Impuestos en Efectivo} - \text{CAPEX de Mantenimiento}}{\text{Principal Anual Amortizado} + \text{Intereses Anuales}}$$

Un ratio igual o superior a $1{,}25\times$ proporciona el margen de solvencia exigido habitualmente por las entidades financieras.

## Simulación Paso a Paso: Financiación de Expansión por 120.000 €

Analicemos el caso de una empresa logística que solicita un préstamo mercantil para automatizar su almacén bajo estas condiciones:
* **Importe nominal ($P$):** $120.000\text{ €}$ (o $\$120.000\text{ USD}$).
* **Plazo:** $5\text{ años}$ ($n = 60\text{ cuotas mensuales}$).
* **Tipo de Interés Nominal ($\text{TIN}$):** $6{,}60\%$ fijo anual.
* **Comisión de apertura:** $1{,}50\%$ ($1.800\text{ €}$) más **gastos de formalización notarial** de $600\text{ €}$.

### Paso 1: Cálculo de la tasa mensual y cuota fija
Convertimos el TIN anual a tasa mensual dividiendo entre $12$:

$$r = \frac{0{,}066}{12} = 0{,}0055 \quad (0{,}55\% \text{ mensual})$$

Con el factor compuesto $(1 + 0{,}0055)^{60} \approx 1{,}389708$, aplicamos la fórmula de la cuota francesa:

$$C = 120.000 \times \frac{0{,}0055 \times 1{,}389708}{1{,}389708 - 1} = 120.000 \times 0{,}0196131 = 2.353{,}58\text{ €/mes}$$

### Paso 2: Evolución del primer pago y coste acumulado
* **Mes 1:** Los intereses ascienden a $120.000 \times 0{,}0055 = 660{,}00\text{ €}$ y la amortización de principal es de $2.353{,}58 - 660{,}00 = 1.693{,}58\text{ €}$, dejando un saldo vivo de $118.306{,}42\text{ €}$.
* **Total pagado en 60 meses:** $2.353{,}58\text{ €} \times 60 = 141.214{,}55\text{ €}$ ($21.214{,}55\text{ €}$ en intereses nominales).
* **Coste financiero total real y TAE:** Al descontar en origen $2.400\text{ €}$ ($1.800\text{ €}$ de apertura + $600\text{ €}$ de póliza), la empresa recibe $117.600\text{ €}$ netos. El coste total suma $21.214{,}55 + 2.400 = 23.614{,}55\text{ €}$, elevando la **TAE efectiva al $7{,}71\%$** frente al $6{,}60\%$ TIN nominal.

## Comparativa de Instrumentos de Financiación Corporativa

Utilizar deuda a largo plazo para cubrir circulante genera costes por saldos ociosos, mientras que financiar activos fijos con líneas de corto plazo estrangula la liquidez:

| Instrumento Financiero | Plazo Habitual | Estructura de Coste Principal | Garantía / Colateral Típico | Finalidad Empresarial Óptima |
| :--- | :--- | :--- | :--- | :--- |
| **Préstamo Comercial a Plazo** | 3 a 7 años | TIN fijo/variable + Apertura (0,5 % – 2 %) | Garantía corporativa, aval SGR o personal | Compra de maquinaria, reformas o expansión |
| **Póliza / Línea de Crédito** | 12 meses (renovable) | Interés sobre dispuesto + Disponibilidad | Garantía corporativa y facturación | Cubrir desfases de tesorería, nóminas y stock |
| **Leasing Financiero** | 3 a 10 años | Cuota con ventaja fiscal + Opción compra | El propio bien financiado | Flotas de vehículos, maquinaria e inmuebles |
| **Factoring / Descuento** | 30 a 120 días | Interés por días + Comisión (0,2 % – 1 %) | Cesión de facturas de clientes B2B | Anticipar cobros comerciales sin consumir CIRBE |

## Criterios de Riesgo Bancario y Trampas Contractuales a Vigilar

1. **Desajuste entre vida útil del activo y plazo del préstamo:** Nunca financie un activo con un préstamo cuyo vencimiento supere la vida productiva del bien (por ejemplo, financiar equipos informáticos o furgonetas de reparto a 7 años). Seguiría pagando cuotas por activos ya obsoletos.
2. **Comisiones por amortización anticipada a tipo fijo:** Si prevé cancelar deuda antes de tiempo con excedentes de caja, revise la cláusula de compensación por coste de rotura (*breakage cost*), que puede penalizar hasta un $2\%$ del capital reembolsado si los tipos de mercado han bajado.
3. **Avales personales solidarios:** Antes de comprometer el patrimonio personal de los socios al $100\%$, tramite el respaldo de una **Sociedad de Garantía Recíproca (SGR)** o programas estatales (ICO, NAFIN, CORFO, BANCÓLDEX), que avalan hasta el $80\%$ del riesgo ante la banca y reducen el tipo de interés.
