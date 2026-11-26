---
title: "Tasas de Interés Explicadas: APR Nominal vs. Efectiva"
description: "Aprenda la diferencia matemática entre tasa nominal (APR), tasa efectiva anual (APY/TEA) y capitalización continua para comparar préstamos, tarjetas y depósitos con precisión."
category: "Finance"
relatedCalculator: "interest-rate-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es la diferencia fundamental entre APR, APY y TAE?"
    answer: "En el ámbito anglosajón, el APR (Tasa de Porcentaje Anual) refleja la tasa nominal anualizada de un préstamo más ciertas comisiones obligatorias, pero no capitaliza el interés compuesto intraanual. El APY (Rendimiento Porcentual Anual) es la tasa efectiva anual pura que sí incluye el efecto de la capitalización. En Europa, la TAE (Tasa Anual Equivalente) integra tanto la frecuencia de capitalización como las comisiones bancarias."
  - question: "¿Por qué una tasa nominal del 18 % con capitalización diaria cuesta más del 18 % al año?"
    answer: "Porque cada día se aplica la fracción 18 % / 365 sobre el saldo acumulado del día anterior, generando intereses sobre los intereses previamente devengados. Al repetirse este proceso 365 veces en un año sin abonos intermedios, el costo real acumulado asciende al 19.716 % anual efectivo."
  - question: "¿Cómo convierto una Tasa Efectiva Anual en una tasa periódica mensual?"
    answer: "No debe dividir la tasa efectiva entre 12, pues sobreestimaría el costo mensual. Debe aplicar la fórmula inversa mediante raíz duodécima: tasa mensual = (1 + TEA)^(1/12) − 1. Por ejemplo, una TEA del 10.00 % equivale a una tasa mensual exacta de (1.10)^(1/12) − 1 = 0.7974 %, es decir, un 9.5690 % nominal anual."
  - question: "¿Existe un límite matemático al beneficio de aumentar la frecuencia de capitalización?"
    answer: "Sí. A medida que el número de períodos de capitalización m tiende al infinito, el factor (1 + r/m)^m converge hacia la constante exponencial e^r, donde e ≈ 2.7182818. Esto significa que pasar de capitalización diaria a horaria o continua apenas añade unas milésimas de punto porcentual."
  - question: "¿Por qué dos préstamos con la misma tasa de interés nominal pueden tener un APR o CAT muy distinto?"
    answer: "Porque los indicadores regulatorios de costo total (como el APR hipotecario en EE. UU., la TAE en España o el CAT en México) incorporan comisiones de apertura, puntos de descuento, seguros obligatorios y gastos de estudio además de la tasa de interés nominal. Un préstamo con menor tasa nominal pero altas comisiones iniciales puede resultar más caro."
---

Cuando una entidad bancaria publicita una tasa de interés, rara vez refleja en una sola cifra el costo o rendimiento verdadero al término de un año. La **tasa nominal** —expresada frecuentemente como tasa base anual o `APR` en tarjetas de crédito— multiplica la tasa periódica por el número de períodos del año, omitiendo el efecto multiplicador de los intereses devengados dentro del propio ejercicio.

La **Tasa Efectiva Anual (`TEA` o `APY`)**, en cambio, mide la rentabilidad o el costo financiero real tras incorporar la frecuencia exacta de capitalización. Para convertir cualquier tasa anunciada en su equivalente efectivo y comparar ofertas en igualdad de condiciones, utilice nuestra [Calculadora de Tasas de Interés](/es/calculadoras/calculadora-tasa-de-interes).

## Marco Matemático: Nominal, Efectiva y Capitalización Continua

La conversión exige conocer la tasa nominal anual `r` (en decimal), la frecuencia anual de capitalización `m` (`1` anual, `4` trimestral, `12` mensual, `365` diaria) y la constante de Euler `e ≈ 2.7182818`:

```text
Tasa Periódica (i)               = r / m
Tasa Efectiva Anual (TEA / APY)  = (1 + r / m)^m − 1
Capitalización Continua          = e^r − 1
Conversión Inversa (TEA a r)     = m × [(1 + TEA)^(1 / m) − 1]
```

Con capitalización anual (`m = 1`), ambas tasas coinciden (`TEA = r`). A medida que aumentan `m` y `r`, crece la brecha entre la tasa publicitada y la carga real, aunque dicha diferencia converge hacia el techo estricto de la capitalización continua (`e^r − 1`).

## Ejemplo Paso a Paso: Tarjeta de Crédito y Depósito a Plazo

### Caso A: Saldo de `$10,000` en Tarjeta al `18.00%` Nominal

Considere una deuda de `$10,000` durante un año completo al `18.00%` nominal (`r = 0.18`) sin abonos intermedios:

1. **Capitalización mensual (`m = 12`):** `i = 0.18 / 12 = 1.50%` mensual. `TEA = (1.015)^12 − 1 = 19.562%`, generando `$1,956.18` en intereses (`+$156.18` sobre el `18%` simple).
2. **Capitalización diaria (`m = 365`):** `i = 0.18 / 365 = 0.0493%` diario. `TEA = (1 + 0.18 / 365)^365 − 1 = 19.716%`, elevando el interés anual a `$1,971.64`.
3. **Capitalización continua (`m → ∞`):** `TEA_continua = e^0.18 − 1 = 19.722%`, equivalente a `$1,972.17` (solo `$0.53` adicional respecto a la diaria).

### Caso B: Selección Entre Dos Depósitos Bancarios

Compare una **Oferta 1** al `6.00%` nominal con liquidación anual (`TEA = 6.000%`) frente a una **Oferta 2** al `5.88%` nominal capitalizable diariamente (`m = 365`). Aplicando `(1 + 0.0588 / 365)^365 − 1`, la Oferta 2 rinde una `TEA = 6.056%`. Pese a anunciar `12` puntos básicos menos de tasa nominal, la capitalización diaria la hace `5.6` puntos básicos más rentable.

## Impacto de la Capitalización por Nivel de Tasa

La tabla compara la `TEA` resultante según la frecuencia de capitalización (`1 pb = 0.01%`):

| Nominal (`r`) | Anual (`m=1`) | Trimestral (`m=4`) | Mensual (`m=12`) | Diaria (`m=365`) | Continua (`m→∞`) | Brecha Diaria |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`4.00%`** | `4.000%` | `4.060%` | `4.074%` | `4.081%` | `4.081%` | `+8.1 pb` |
| **`6.00%`** | `6.000%` | `6.136%` | `6.168%` | `6.183%` | `6.184%` | `+18.3 pb` |
| **`8.00%`** | `8.000%` | `8.243%` | `8.300%` | `8.328%` | `8.329%` | `+32.8 pb` |
| **`12.00%`** | `12.000%` | `12.551%` | `12.683%` | `12.747%` | `12.750%` | `+74.7 pb` |
| **`18.00%`** | `18.000%` | `19.252%` | `19.562%` | `19.716%` | `19.722%` | `+171.6 pb` |
| **`24.00%`** | `24.000%` | `26.248%` | `26.824%` | `27.115%` | `27.125%` | `+311.5 pb` |

Mientras en hipotecas del `4%–6%` el efecto compuesto suma apenas `8` a `18` puntos básicos, en tarjetas al `24.00%` la capitalización diaria eleva la tasa real por encima del `27.11%`.

## Aplicaciones Reales, Comisiones Ocultas y Matices Regulatorios

Al evaluar contratos bancarios, líneas de crédito o instrumentos de ahorro reales, considere cinco reglas prácticas adicionales:

- **Diferencias entre `APR`, `APY`, `TAE` y `CAT`:** En EE. UU., la ley `TILA` exige que el `APR` de préstamos incluya comisiones de apertura y puntos de descuento amortizados en el plazo, pero sin capitalizar los intereses mensuales; en ahorro (`TISA`), el `APY` refleja la tasa efectiva pura. En España (`TAE`) y México (`CAT`), el indicador oficial integra tanto la capitalización periódica como las comisiones bancarias y los seguros obligatorios vinculados al contrato.
- **Convenciones de conteo de días:** Ciertos créditos comerciales y líneas corporativas aplican la base `Actual/360`, dividiendo la tasa nominal entre `360` días para calcular el cargo diario mientras cobran sobre los `365` días reales del año calendario, lo que encarece la tasa efectiva en aproximadamente un `1.39%` relativo sobre la tasa nominal anunciada.
- **Error de división directa en conversiones inversas:** Para obtener el tipo mensual equivalente de una `TEA` del `10.00%`, dividir `10% / 12 = 0.8333%` es matemáticamente incorrecto, ya que capitalizado doce veces daría `10.471%`. La fórmula exacta es `(1.10)^(1/12) − 1 = 0.7974%` mensual, equivalente a un `9.5690%` nominal anual.
- **Tasas promocionales y períodos de gracia:** Muchas tarjetas ofrecen un `0%` introductorio que, de no saldarse antes del vencimiento, aplica intereses retroactivos sobre el saldo original completo.
- **Homogeneización previa:** Compare ofertas financieras únicamente cuando todas compartan la misma frecuencia efectiva y descuenten o incorporen las comisiones no reembolsables de formalización.
