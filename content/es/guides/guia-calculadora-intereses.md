---
title: "Interés Simple vs. Compuesto: Una Guía Completa de Crecimiento"
description: "Aprenda la diferencia técnica entre el interés simple y el compuesto, sus fórmulas exactas, la frecuencia de capitalización y cómo usar nuestra Calculadora de Intereses."
category: "Finance"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "interest-calculator"
faqs:
  - question: "¿Cuál es la diferencia fundamental entre el interés simple y el interés compuesto?"
    answer: "El interés simple se calcula únicamente sobre el capital inicial original durante toda la operación, generando un crecimiento lineal constante. El interés compuesto se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores, produciendo un crecimiento exponencial que acelera con el tiempo."
  - question: "¿Cómo influye la frecuencia de capitalización en el rendimiento real?"
    answer: "A mayor frecuencia de capitalización (mensual o diaria frente a anual), mayor es la tasa anual efectiva (TAE), porque los intereses generados comienzan antes a producir nuevos intereses. Al 6% nominal anual durante 10 años, $10,000 crecen a $17,908.48 con capitalización anual frente a $18,193.97 con capitalización mensual."
  - question: "¿Qué diferencia existe entre la tasa de interés nominal (TIN) y la TAE?"
    answer: "La tasa nominal es el porcentaje anual pactado sin considerar la capitalización dentro del año ni las comisiones. La Tasa Anual Equivalente (TAE) incorpora la frecuencia de capitalización para reflejar el rendimiento o costo real anualizado: un 6% nominal capitalizado mensualmente equivale a una TAE del 6.17%."
  - question: "¿Para qué sirve la Regla del 72 en la planificación financiera?"
    answer: "La Regla del 72 permite estimar rápidamente cuántos años tarda en duplicarse una inversión con interés compuesto dividiendo 72 entre la tasa anual porcentual. Por ejemplo, al 6% anual compuesto, un capital tarda aproximadamente 12 años en duplicarse (72 / 6 = 12)."
  - question: "¿Por qué la inflación y los impuestos reducen el crecimiento compuesto proyectado?"
    answer: "El cálculo bruto muestra el crecimiento nominal, pero la inflación disminuye el poder adquisitivo futuro y los impuestos sobre rendimientos o ganancias de capital reducen el saldo neto cada año o al reembolsar. Evaluar la tasa real neta evita sobreestimar la riqueza futura."
---

El interés simple y el interés compuesto determinan la velocidad a la que crece un ahorro o se encarece una deuda. Mientras el interés simple aplica la tasa pactada únicamente sobre el capital original —generando una ganancia idéntica en cada período—, el interés compuesto reinvierte los intereses devengados en el saldo base, de modo que cada nuevo ciclo produce intereses sobre el capital inicial y sobre los rendimientos acumulados previamente.

Esta distinción explica por qué dos productos financieros con la misma tasa nominal del 6% anual arrojan resultados divergentes a mediano y largo plazo. Para modelar con exactitud cualquier horizonte de ahorro, certificado de depósito o financiamiento, puede introducir sus propios parámetros en nuestra [Calculadora de Intereses](/es/calculadoras/calculadora-de-interes) y contrastar ambos regímenes al instante.

## Fórmulas Fundamentales y Definición de Parámetros

El modelo matemático del interés simple sigue una progresión aritmética lineal. Tanto el interés acumulado (`I`) como el monto final (`A`) dependen directamente de tres variables:

```text
I = P × r × t
A = P × (1 + r × t)
```

En contraste, el interés compuesto discreto responde a una función exponencial donde la frecuencia de capitalización (`n`) multiplica el efecto de reinversión dentro de cada año:

```text
A = P × (1 + r / n)^(n × t)
I = A − P
TAE = (1 + r / n)^n − 1
```

Para aplicaciones teóricas o ciertos derivados con capitalización continua, el límite matemático cuando `n` tiende a infinito utiliza la constante de Euler (`e ≈ 2.71828`): `A = P × e^(r × t)`. Las variables se definen de la siguiente forma:

- **`P` (Capital principal):** Monto inicial depositado o prestado.
- **`r` (Tasa nominal anual):** Porcentaje anual en decimal (`6%` = `0.06`).
- **`n` (Frecuencia de capitalización):** Veces al año que el interés se suma al capital (`1` = anual, `4` = trimestral, `12` = mensual, `365` = diaria).
- **`t` (Plazo en años):** Duración total; si se expresa en meses, divídalo entre `12`.
- **`TAE` (Tasa Anual Equivalente):** Rendimiento efectivo anualizado tras la capitalización periódica.

La **Regla del 72** estima los años necesarios para duplicar un capital compuesto mediante `t ≈ 72 / (r × 100)`: al `6%` anual, se duplica en unos 12 años (exactamente `11.90`).

## Ejemplo Numérico Paso a Paso: $10,000 al 6% Durante 10 Años

Suponga `P = $10,000`, `r = 0.06` y `t = 10` años bajo tres regímenes distintos:

- **Interés simple:** Genera `$600.00` anuales constantes (`$10,000 × 0.06`). Al cabo de 10 años, `A = 10,000 × (1 + 0.06 × 10) = $16,000.00` (`$6,000.00` de interés total).
- **Compuesto anual (`n = 1`):** En el año 1 alcanza `$10,600.00` (`$600.00` de interés); en el año 2, `$11,236.00` (`$636.00`); en el año 3, `$11,910.16` (`$674.16`). Al año 10: `A = 10,000 × (1.06)^10 = $17,908.48` (`$7,908.48` de interés, `+$1,908.48` frente al interés simple).
- **Compuesto mensual (`n = 12`):** La tasa mensual es `0.06 / 12 = 0.005` durante `120` períodos (`TAE = (1.005)^12 − 1 = 6.17%`). En el año 1 logra `$10,616.78` y al año 10 alcanza `A = 10,000 × (1.005)^120 = $18,193.97` (`$8,193.97` de interés, `+$285.49` sobre el compuesto anual y `+$2,193.97` sobre el simple).

## Comparativa por Horizonte y Frecuencia de Capitalización

La siguiente tabla muestra la evolución exacta de `$10,000` al `6%` nominal anual sin aportes adicionales en distintos horizontes temporales:

| Horizonte | Interés Simple | Compuesto Anual (`n=1`) | Compuesto Trimestral (`n=4`) | Compuesto Mensual (`n=12`) | Compuesto Diario (`n=365`) | Ventaja Mensual vs. Simple |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1 año** | $10,600.00 | $10,600.00 | $10,613.64 | $10,616.78 | $10,618.31 | +$16.78 |
| **5 años** | $13,000.00 | $13,382.26 | $13,468.55 | $13,488.50 | $13,498.26 | +$488.50 |
| **10 años** | $16,000.00 | $17,908.48 | $18,140.18 | $18,193.97 | $18,220.29 | +$2,193.97 |
| **15 años** | $19,000.00 | $23,965.58 | $24,432.20 | $24,540.94 | $24,594.21 | +$5,540.94 |
| **20 años** | $22,000.00 | $32,071.35 | $32,906.63 | $33,102.04 | $33,197.90 | +$11,102.04 |
| **30 años** | $28,000.00 | $57,434.91 | $59,693.23 | $60,225.75 | $60,487.53 | +$32,225.75 |

Observe que, aunque el salto de capitalización mensual a diaria apenas añade `$261.78` en 30 años (`$60,225.75` frente a `$60,487.53`), la brecha entre el interés simple y el compuesto mensual alcanza `+$32,225.75` en tres décadas.

## Aplicaciones Reales, Errores Comunes y Advertencias de Precisión

En la práctica financiera, el interés compuesto actúa a favor del inversor en cuentas de ahorro de alto rendimiento, bonos cupón cero, fondos indexados con reinversión de dividendos y planes de jubilación. Por el contrario, actúa en contra del deudor en tarjetas de crédito —que suelen devengar intereses con capitalización diaria sobre el saldo promedio diario cuando no se liquida el total mensual— y en préstamos con amortización negativa. El interés simple predomina en pagarés a corto plazo, letras del Tesoro a descuento y préstamos automotrices o personales de interés simple donde el cargo diario se calcula sobre el saldo insoluto vigente sin capitalizar intereses no vencidos.

Al proyectar escenarios, evite cuatro errores habituales:

1. **Confundir tasa nominal con tasa efectiva:** Comparar un depósito al `6.00%` TAE con otro al `6.00%` nominal mensual distorsiona la decisión, pues el segundo rinde en realidad `6.17%` TAE.
2. **Desalinear unidades de `r` y `t`:** Aplicar una tasa mensual (`0.5%`) con un exponente en años (`10`) subestima drásticamente el resultado; tasa periódica y número de períodos deben compartir la misma base temporal.
3. **Ignorar la erosión inflacionaria:** Si su cartera rinde `6%` nominal pero la inflación anual promedia `2.5%`, la tasa real aproximada mediante la ecuación de Fisher es `(1.06 / 1.025) − 1 = 3.41%`.
4. **Omitir el arrastre fiscal:** En cuentas gravables sujetas a retención anual sobre intereses (por ejemplo, cuentas remuneradas o certificados bancarios), pagar impuestos cada año reduce la base que se reinvierte, a diferencia de las cuentas con diferimiento fiscal como los planes `401(k)` o `IRA`.
