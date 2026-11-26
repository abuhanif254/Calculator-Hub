---
title: "Interés Simple vs. Compuesto: ¿Cuál es la Diferencia?"
description: "Domine la diferencia matemática entre interés simple y compuesto, sus fórmulas exactas, aplicaciones en préstamos e inversiones y proyecciones a largo plazo."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "simple-interest-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué el interés simple y el compuesto coinciden exactamente en el primer año con capitalización anual?"
    answer: "Porque durante el primer período completo todavía no existen intereses previos acumulados sobre los cuales calcular nuevos rendimientos. La divergencia comienza a partir del segundo período, cuando el interés compuesto empieza a generar rendimiento sobre los intereses ya devengados."
  - question: "¿Cómo funciona el interés simple diario en los préstamos para automóviles?"
    answer: "En un crédito automotriz de interés simple diario, la entidad multiplica cada día el saldo de capital pendiente por la tasa anual dividida entre 365. Si usted realiza el pago antes de la fecha de corte o aporta dinero extra al principal, reduce el saldo diario y paga menos intereses totales en el contrato."
  - question: "¿Qué diferencia existe entre tasa nominal (APR) y rendimiento porcentual anual (APY)?"
    answer: "La APR mide la tasa anual simple sin incorporar el efecto de la capitalización intraanual, mientras que el APY (o TAE en otros mercados) refleja el rendimiento o costo efectivo real tras incluir la frecuencia de capitalización mensual o diaria. Por eso dos productos con igual APR pueden tener distinto APY."
  - question: "¿Se puede convertir un préstamo de interés simple en uno muy costoso si se atrasan los pagos?"
    answer: "Sí. Aunque el préstamo sea de interés simple, cada día de retraso respecto a la fecha pactada mantiene el capital más alto durante más tiempo y genera devengo diario adicional. A lo largo de varios meses, pagar sistemáticamente tarde desplaza una mayor proporción de cada cuota hacia intereses y deja un saldo residual al final del plazo."
  - question: "¿En qué instrumentos financieros conviene buscar interés simple frente a interés compuesto?"
    answer: "Como prestatario, siempre le favorece el interés simple (sobre todo con abonos anticipados sin penalización), porque evita pagar intereses sobre intereses impagados. Como ahorrador o inversor, en cambio, le conviene el interés compuesto con la mayor frecuencia de capitalización posible para acelerar el crecimiento exponencial del capital."
---

Cuando usted solicita un préstamo o invierte capital, el costo o rendimiento del dinero se calcula bajo dos regímenes matemáticos fundamentales: **interés simple** (crecimiento lineal calculado únicamente sobre el principal original) e **interés compuesto** (crecimiento exponencial calculado sobre el principal más los intereses acumulados en períodos previos).

A corto plazo —por ejemplo, en operaciones a 90 días o un año— la diferencia monetaria entre ambos sistemas suele ser reducida. Sin embargo, a medida que el horizonte temporal supera los cinco o diez años, la capitalización compuesta amplifica de forma drástica el saldo final. Puede calcular montos exactos bajo régimen lineal en la [Calculadora de Interés Simple](/es/calculadoras/calculadora-de-interes-simple).

## Fórmulas Exactas y Convenciones Temporales

La diferencia estructural radica en si los intereses devengados se incorporan o no a la base de cálculo en los períodos siguientes:

```text
Interés Simple:
  I = P × r × t
  A_simple = P × (1 + r × t)

Interés Compuesto (con m capitalizaciones por año):
  A_compuesto = P × (1 + r / m)^(m × t)
  I_compuesto = A_compuesto − P
```

Definición exacta de cada parámetro:

- **P (Principal):** Capital inicial prestado o invertido, expresado en unidades monetarias.
- **r (Tasa Nominal Anual):** Tasa de interés anual expresada en forma decimal (`6.5%` = `0.065`).
- **t (Tiempo):** Duración expresada en años. Cuando el plazo se mide en meses o días, debe convertirse a años: `t = meses ÷ 12` o `t = días ÷ 365` (base comercial estándar en banca minorista, aunque ciertos contratos corporativos usan base `360`).
- **m (Frecuencia de Capitalización):** Número de veces al año en que los intereses compuestos se suman al capital (`m = 1` anual, `m = 4` trimestral, `m = 12` mensual, `m = 365` diaria).

### Cálculo Diario en Préstamos Amortizables de Interés Simple

En préstamos automotrices y personales modernos, el interés simple opera mediante devengo diario sobre el saldo vivo:

```text
Interés Diario = Saldo de Capital Actual × (r / 365)
```

Si transcurren 30 días entre pagos, el interés del ciclo equivale a `30 × Interés Diario`. Esto explica por qué pagar unos días antes o adelantar capital reduce inmediatamente el cargo financiero del mes siguiente.

## Ejemplos Numéricos Verificados Paso a Paso

### Caso 1: Operación a Plazo Medio ($15,000 al 6.5% anual durante 5 años)

Suponga que compara un pagaré de interés simple frente a un instrumento compuesto al `6.5%` anual (`r = 0.065`) durante `t = 5` años sobre `P = $15,000`:

1. **Bajo interés simple:**
   - Interés anual constante: `$15,000 × 0.065 = $975.00` cada año.
   - Interés total en 5 años: `I = $15,000 × 0.065 × 5 = $4,875.00`
   - Monto final acumulado: `A_simple = $15,000 + $4,875.00 = $19,875.00`
2. **Bajo interés compuesto anual (`m = 1`):**
   - `A_compuesto = $15,000 × (1 + 0.065)^5 = $15,000 × 1.370087 = $20,551.30`
   - Interés total: `$5,551.30` (`$676.30` más que el régimen simple).
3. **Bajo interés compuesto mensual (`m = 12`):**
   - Tasa por período: `0.065 ÷ 12 = 0.00541667` durante `60` meses.
   - `A_compuesto = $15,000 × (1.00541667)^60 = $20,742.26`
   - Interés total: **`$5,742.26`** (una brecha de **`$867.26`** frente al interés simple).

### Caso 2: Plazo Fraccionario en Días ($20,000 al 7.2% durante 180 días)

Para un préstamo puente o pagaré comercial a `180` días sobre base anual de `365` días:

1. **Convierta los días a años:** `t = 180 ÷ 365 = 0.493151` años.
2. **Calcule el interés:** `I = $20,000 × 0.072 × (180 ÷ 365) = $710.14`
3. **Total a liquidar al vencimiento:** `$20,710.14` (con un devengo diario exacto de `$3.9452` al día).

## Evolución Comparada: $10,000 al 7.0% Anual (1 a 30 Años)

La tabla demuestra por qué el tiempo es el factor determinante entre una curva lineal y una exponencial sobre un capital base de `$10,000` al `7.0%` anual:

| Horizonte | Interés Simple (Monto Final) | Interés Simple (Solo Interés) | Compuesto Anual (Monto Final) | Compuesto Mensual (Monto Final) | Brecha Mensual vs. Simple |
|---|---|---|---|---|---|
| 1 año | $10,700.00 | $700.00 | $10,700.00 | $10,722.90 | +$22.90 |
| 3 años | $12,100.00 | $2,100.00 | $12,250.43 | $12,329.26 | +$229.26 |
| 5 años | $13,500.00 | $3,500.00 | $14,025.52 | $14,176.25 | +$676.25 |
| 10 años | $17,000.00 | $7,000.00 | $19,671.51 | $20,096.61 | +$3,096.61 |
| 20 años | $24,000.00 | $14,000.00 | $38,696.84 | $40,387.39 | +$16,387.39 |
| 30 años | $31,000.00 | $21,000.00 | $76,122.55 | $81,164.97 | +$50,164.97 |

A los 30 años, el régimen simple apenas triplica el capital (`$31,000.00`), mientras que el interés compuesto mensual lo multiplica por más de ocho veces (`$81,164.97`), generando `$50,164.97` adicionales sin haber aportado un solo dólar extra.

## Aplicaciones Reales, Errores de Interpretación y Matices Contractuales

Distinguir ambos métodos resulta indispensable para evitar sorpresas tanto en productos de crédito como en instrumentos de ahorro:

- **Dónde predomina el interés simple:** Préstamos para automóviles, créditos personales a plazo fijo, letras del Tesoro a corto plazo, bonos con pago periódico de cupones no reinvertidos y préstamos privados formalizados entre familiares o socios.
- **Dónde predomina el interés compuesto:** Cuentas de ahorro de alto rendimiento, carteras de inversión y planes de retiro con reinversión automática de dividendos, así como saldos rotativos de **tarjetas de crédito**, donde la capitalización suele aplicarse diariamente sobre el saldo promedio diario cuando no se liquida el total del estado de cuenta.

### Errores Frecuentes al Comparar Contratos

1. **Confundir préstamos de tasa plana con interés simple real:** Algunos contratos calculan `P × r × t` sobre el monto inicial completo aunque usted amortice capital cada mes, elevando la tasa efectiva casi al doble frente al interés simple sobre saldo insoluto.
2. **Ignorar la convención de días (`365` vs. `360`):** Un crédito sobre base `Actual/360` cobra `365 ÷ 360 = 1.01389` veces la tasa anual declarada en un año calendario completo.
3. **Asumir capitalización en préstamos puntuales:** En hipotecas o préstamos automotrices pagados a tiempo cada mes, la cuota liquida íntegramente el interés del período y evita cualquier capitalización salvo en mora.
