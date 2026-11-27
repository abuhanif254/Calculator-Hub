---
title: "Calculadora de la Regla del 72: Tiempo de Duplicación de Capital"
description: "Calcule en cuántos años se duplicará su inversión con la Regla del 72, compárela con el cálculo logarítmico exacto y mida el impacto real de la inflación."
faqs:
  - question: "¿Por qué se utiliza el número 72 en lugar de 69,3 o 70 para estimar la duplicación?"
    answer: "Aunque el logaritmo natural de 2 equivale aproximadamente a 0,693 —lo que haría de 69,3 el numerador exacto bajo capitalización continua—, en la práctica financiera cotidiana la capitalización suele ser anual. Con tasas anuales habituales entre el 5 % y el 10 %, el número 72 ofrece un ajuste notablemente más cercano al cálculo exacto y posee además muchos divisores enteros (2, 3, 4, 6, 8, 9 y 12), lo que agiliza enormemente el cálculo mental."
  - question: "¿La Regla del 72 sirve también para medir cuánto tarda la inflación en reducir mi poder adquisitivo a la mitad?"
    answer: "Sí. Si divide 72 entre la tasa anual de inflación esperada, obtendrá el número aproximado de años necesarios para que el poder de compra de un importe fijo se reduzca exactamente a la mitad. Por ejemplo, con una inflación sostenida del 3 % anual en la zona euro o en economías latinoamericanas estabilizadas, unos 20.000 € o dólares actuales perderán la mitad de su capacidad adquisitiva real en aproximadamente 24 años."
  - question: "¿En qué rango de tasas de interés resulta más precisa la Regla del 72?"
    answer: "Su máxima precisión se observa entre el 6 % y el 10 % de rentabilidad anual compuesta, donde el margen de error respecto a la fórmula logarítmica exacta es inferior al 1 % (apenas unos días o semanas de diferencia). Por debajo del 4 % conviene recurrir a la Regla del 70, y por encima del 15 % resulta recomendable aplicar directamente la ecuación logarítmica o añadir un punto al numerador por cada tres puntos por encima del 8 %."
  - question: "¿Cómo se aplica la Regla del 72 cuando los intereses se capitalizan de forma continua o mensual?"
    answer: "Cuando un producto financiero capitaliza de forma continua —un modelo teórico habitual en derivados y valoración financiera— debe emplear la Regla del 69,3. Si la capitalización es mensual, como ocurre en hipotecas o tarjetas de crédito rotativas, la tasa nominal anual subestima el coste real; en ese caso, convierta primero el tipo nominal en tasa anual equivalente (TAE) antes de dividir 72 entre el porcentaje resultante."
  - question: "¿Qué ocurre si realizo aportaciones periódicas mensuales en lugar de invertir un capital único?"
    answer: "La Regla del 72 asume un capital inicial único sin aportaciones ni retiradas adicionales durante todo el horizonte temporal. Si usted realiza aportaciones periódicas —por ejemplo, 300 € al mes en un fondo indexado—, su patrimonio total se duplicará mucho antes de lo que predice la fórmula, ya que el ahorro acumulado se suma al rendimiento compuesto del capital previo."
---

La Regla del 72 es una herramienta de cálculo mental que permite estimar cuántos años tardará un capital en duplicarse bajo una tasa de rendimiento compuesto anual constante. Basta con dividir 72 entre la tasa anual expresada en porcentaje para obtener una aproximación inmediata sin hojas de cálculo ni calculadoras científicas.

Además de proyectar ahorros e inversiones a largo plazo, este principio funciona en sentido inverso para medir la erosión de la inflación sobre el dinero inmovilizado o el crecimiento de una deuda con intereses elevados. Comprender sus fundamentos y límites evita errores habituales al comparar productos financieros en euros u otras divisas.

## Fórmula matemática, variables y comparación metodológica

La expresión abreviada de la Regla del 72 es:

`Años de duplicación ≈ 72 ÷ r (%)`

Aquí `r` representa la tasa anual compuesta expresada como entero porcentual (por ejemplo, `8` para un 8 %). Para hallar el resultado exacto bajo capitalización anual discreta —el estándar en cuentas remuneradas, bonos y fondos indexados—, se resuelve `(1 + r)^t = 2` mediante logaritmos naturales:

`Años exactos = ln(2) ÷ ln(1 + r)`

En esta ecuación `r` se expresa en decimal (`0,08` para un 8 %) y `ln(2)` equivale aproximadamente a `0,693147`. De ahí surgen dos variantes cercanas: la **Regla del 69,3** (`69,3 ÷ r`), exacta bajo capitalización continua instantánea, y la **Regla del 70** (`70 ÷ r`), preferida para tasas bajas de crecimiento económico o inflación moderada entre el 1 % y el 4 %.

La ventaja práctica del 72 radica en que, al pasar de capitalización continua a anual, el denominador `ln(1 + r)` crece más lento que `r`, desplazando el numerador óptimo hacia 72 para rendimientos del 6 % al 10 %, además de contar con diez divisores enteros que facilitan el cálculo mental.

## Ejemplo práctico paso a paso en euros

Suponga que un inversor destina `25.000 €` a una cartera global de fondos indexados con una rentabilidad neta esperada del `8 %` anual compuesto, reinvirtiendo todos los dividendos.

1. **Estimación con la Regla del 72:** se divide el numerador entre el porcentaje anual: `72 ÷ 8 = 9,00 años`. El capital pasaría de `25.000 €` a `50.000 €` en nueve años.
2. **Comprobación logarítmica exacta:** aplicando `ln(2) ÷ ln(1 + 0,08)`, con `ln(2) ≈ 0,693147` y `ln(1,08) ≈ 0,076961`, resulta `0,693147 ÷ 0,076961 = 9,0065 años`, una desviación de apenas dos días. Al noveno año el saldo exacto sería `25.000 × (1,08)^9 = 49.975,12 €`.
3. **Ajuste por inflación:** con una inflación media del `3 %` anual, la rentabilidad real aproximada desciende al `5 %` (`8 % − 3 %`; exactamente `(1,08 ÷ 1,03) − 1 = 4,854 %` según Fisher). A ese `5 %` real (`72 ÷ 5 = 14,4 años`), se requieren más de catorce años para duplicar el **poder adquisitivo real**, mientras que el efectivo inmovilizado pierde la mitad de su valor en `72 ÷ 3 = 24 años`.

## Tabla comparativa de escenarios y precisión por regla

La siguiente tabla contrasta el tiempo estimado de duplicación según las tres reglas rápidas frente al cálculo logarítmico exacto bajo capitalización anual:

| Tasa anual (`r`) | Contexto financiero habitual | Regla del 72 | Regla del 70 | Regla del 69,3 | Cálculo exacto |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2 % | Depósito conservador o inflación baja | 36,00 años | 35,00 años | 34,65 años | 35,00 años |
| 4 % | Deuda pública o renta fija de calidad | 18,00 años | 17,50 años | 17,33 años | 17,67 años |
| 6 % | Cartera mixta equilibrada | 12,00 años | 11,67 años | 11,55 años | 11,90 años |
| 8 % | Renta variable global diversificada | 9,00 años | 8,75 años | 8,66 años | 9,01 años |
| 10 % | Renta variable histórica nominal | 7,20 años | 7,00 años | 6,93 años | 7,27 años |
| 15 % | Deuda rotativa o tarjetas de crédito | 4,80 años | 4,67 años | 4,62 años | 4,96 años |

Como muestra la comparativa, en tasas bajas del 2 % al 4 % la Regla del 70 refleja con mayor fidelidad el comportamiento exacto, mientras que alrededor del 8 % la Regla del 72 resulta prácticamente indistinguible del logaritmo natural. En tipos del 15 % o superiores, todas las reglas mentales tienden a subestimar ligeramente el tiempo real de duplicación, aunque siguen siendo válidas para dimensionar con urgencia el coste de una deuda onerosa.

## Estrategias, errores comunes y advertencias fiscales

Un error frecuente al aplicar esta regla consiste en utilizar la rentabilidad bruta anunciada por un producto financiero sin descontar comisiones de gestión, inflación ni tributación. En jurisdicciones como España o la mayoría de países de Latinoamérica, las plusvalías y rendimientos del capital mobiliario tributan al materializarse o de forma periódica según el vehículo elegido. Un fondo que rinde un 7 % bruto pero soporta un 1,5 % en comisiones anuales ofrece en realidad un 5,5 % neto antes de impuestos, lo que alarga la duplicación de 10,3 años a más de 13 años.

Tampoco debe confundirse la tasa nominal con la tasa efectiva anual cuando los intereses se liquidan de forma mensual o trimestral, ni olvidar que los mercados financieros presentan volatilidad. Una cartera con rentabilidad media aritmética del 8 % pero fuertes caídas intermedias obtendrá una tasa compuesta anual inferior debido al efecto de la secuencia de retornos.

**Aviso informativo:** los cálculos expuestos tienen carácter estrictamente educativo y orientativo. No constituyen asesoramiento financiero, fiscal ni de inversión personalizado; consulte siempre la normativa tributaria vigente en su país y evalúe su perfil de riesgo antes de tomar decisiones patrimoniales.
