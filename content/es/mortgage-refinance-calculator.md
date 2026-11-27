---
title: "Calculadora de Refinanciación Hipotecaria"
description: "Calcule el punto de equilibrio, el ahorro mensual y los intereses totales al refinanciar o subrogar su hipoteca considerando gastos notariales y comisiones."
faqs:
  - question: "¿Cuándo compensa realmente refinanciar o subrogar una hipoteca?"
    answer: "Compensa cuando la reducción del tipo de interés permite recuperar todos los gastos de cierre y comisiones antes de vender o amortizar la vivienda, manteniendo además un ahorro neto positivo en intereses totales. Un recorte mínimo de entre 0,75 y 1,00 punto porcentual suele justificar la operación si restan más de diez años."
  - question: "¿Qué gastos de cierre debo incluir en el cálculo del punto de equilibrio?"
    answer: "Debe sumar tasación homologada, comisión por amortización anticipada o subrogación de la entidad de origen, honorarios de notaría, inscripción registral, gestoría e impuestos aplicables según su jurisdicción. En España, la Ley 5/2019 atribuye al banco la mayoría de los aranceles notariales y registrales, por lo que el cliente asume principalmente tasación y comisión pactada."
  - question: "¿En qué consiste la trampa del reinicio de plazo al refinanciar?"
    answer: "Consiste en reducir la cuota mensual alargando de nuevo el calendario de pagos hasta 25 o 30 años cuando ya había amortizado varios ejercicios de su hipoteca original. Aunque el alivio de tesorería inmediato resulta atractivo, reiniciar el cuadro francés genera un volumen acumulado de intereses mucho mayor al final del préstamo."
  - question: "¿Es mejor optar por una novación, una subrogación de acreedor o una cancelación y apertura?"
    answer: "La novación modifica las condiciones con su propio banco con menor coste; la subrogación traslada el préstamo a otra entidad manteniendo la hipoteca viva; y la cancelación con nueva apertura permite ampliar capital o cambiar garantías con mayores gastos. Conviene solicitar ofertas vinculantes en las tres vías y comparar la TAE resultante."
  - question: "¿Cómo influye el sistema de amortización francés en el momento óptimo para refinanciar?"
    answer: "En el sistema francés, las cuotas de los primeros años destinan una proporción elevada al pago de intereses y menor a devolver capital. Por ello, refinanciar durante la primera mitad de la vida del préstamo maximiza el ahorro financiero, mientras que hacerlo en los últimos años ofrece un margen mucho más reducido."
---

La refinanciación hipotecaria —mediante subrogación a otra entidad, novación o cancelación y apertura de un nuevo préstamo— permite sustituir una deuda costosa por otra con un tipo de interés inferior o un calendario adaptado a su liquidez. Para tomar una decisión racional no basta con mirar la rebaja de la cuota mensual: resulta imprescindible calcular el punto de equilibrio exacto en meses y comprobar si la operación genera ahorro neto tras descontar todos los gastos de formalización.

Nuestra calculadora compara la estructura de su préstamo vigente frente a la nueva oferta hipotecaria, integrando la variación de la Tasa Anual Equivalente (TAE), las comisiones de salida, los costes notariales o de tasación y el impacto del plazo restante. Así evita decisiones impulsivas basadas únicamente en el alivio inmediato de tesorería y protege su patrimonio frente al coste oculto de alargar la deuda.

## Fórmula matemática, variables y marco regulatorio

El indicador central para evaluar la viabilidad de una refinanciación es el punto de equilibrio, es decir, los meses necesarios para que el ahorro acumulado en cuotas compense el desembolso inicial:

`Meses de equilibrio = Gastos totales de cierre ÷ (Cuota mensual anterior − Cuota mensual nueva)`

Cada cuota mensual bajo el sistema de amortización francés —estándar en España, Europa y gran parte de Latinoamérica— se calcula mediante:

`Cuota = Capital × [r × (1 + r)^n] ÷ [(1 + r)^n − 1]`

Donde:

- **Capital (`P`)**: saldo pendiente de amortizar en la fecha de la operación.
- **Tipo mensual (`r`)**: Tipo de Interés Nominal (TIN) anual dividido entre `12`, expresado en tanto por uno.
- **Plazo (`n`)**: número total de mensualidades restantes del préstamo actual o de la nueva hipoteca.
- **Gastos totales de cierre**: suma de tasación oficial, comisiones por reembolso anticipado o subrogación, notaría, registro, gestoría y tributos locales.

En España, la Ley 5/2019 limita las comisiones por reembolso anticipado en préstamos a tipo fijo (hasta un `2 %` durante los diez primeros años y un `1,5 %` después, con el límite de la pérdida financiera) y asigna al banco los aranceles notariales, registrales y de gestoría en la constitución. En otros mercados hispanohablantes, como México, Colombia o Chile, el prestatario suele asumir escritura, registro y avalúo, elevando el umbral de equilibrio.

## Ejemplo práctico paso a paso en euros

Suponga una hipoteca a tipo fijo con capital pendiente de `180 000 €` y `20 años` (`240 meses`) restantes al `4,50 %` TIN anual (`r = 0,045 ÷ 12 = 0,00375`).

1. **Cuota actual**:
   `Cuota anterior = 180 000 × [0,00375 × (1,00375)^240] ÷ [(1,00375)^240 − 1] = 1 138,77 €` al mes.
   Hasta el vencimiento abonará `93 304,53 €` en intereses pendientes.

2. **Nueva cuota sin ampliar plazo**:
   Otra entidad ofrece subrogar al `2,85 %` TIN (`r = 0,002375`) manteniendo exactamente los mismos `20 años` (`240 meses`) para evitar el reinicio de plazo:
   `Cuota nueva = 180 000 × [0,002375 × (1,002375)^240] ÷ [(1,002375)^240 − 1] = 984,81 €` al mes.
   El ahorro mensual bruto asciende a `1 138,77 € − 984,81 € = 153,96 €`.

3. **Gastos de cierre y punto de equilibrio**:
   Sume `350 €` de tasación, `450 €` de comisión de subrogación (`0,25 %`), `950 €` entre notaría y registro asumidos y `400 €` de gestoría, totalizando `2 150 €`:
   `Meses de equilibrio = 2 150 ÷ 153,96 = 13,96 meses` (aproximadamente `14 meses`).

4. **Ahorro neto total en intereses**:
   La nueva hipoteca acumula `56 355,29 €` en intereses, frente a `93 304,53 €` de la original. Tras descontar los `2 150,00 €` de gastos de cierre, el ahorro patrimonial neto alcanza los `34 799,24 €`.

## Escenarios comparativos de refinanciación (`180 000 €` al `4,50 %`, `20 años` restantes)

La tabla compara alternativas de tipo, plazo y costes para ilustrar cómo cambia el beneficio financiero neto:

| Escenario | Nuevo TIN | Plazo nuevo | Cuota mensual | Ahorro mensual | Gastos cierre | Equilibrio | Ahorro neto total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Hipoteca vigente | 4,50 % | 20 años | 1 138,77 € | 0,00 € | 0 € | — | 0,00 € |
| Subrogación moderada | 3,50 % | 20 años | 1 043,93 € | 94,84 € | 2 150 € | 22,7 meses | 20 611,93 € |
| Subrogación óptima | 2,85 % | 20 años | 984,81 € | 153,96 € | 2 150 € | 14,0 meses | 34 799,24 € |
| Recorte con comisión alta | 2,50 % | 20 años | 953,83 € | 184,94 € | 4 500 € | 24,3 meses | 39 886,48 € |
| Trampa reinicio de plazo | 3,25 % | 30 años | 783,37 € | 355,40 € | 2 800 € | 7,9 meses | −11 509,16 € |
| Reducción de plazo | 2,85 % | 15 años | 1 230,10 € | −91,33 € | 2 150 € | No aplica | 49 736,06 € |

Al reiniciar el plazo a `30 años`, la cuota cae en `355,40 €` mensuales, pero los intereses totales suben a `102 013,69 €`, provocando una pérdida neta de `11 509,16 €`. En cambio, acortar el plazo a `15 años` eleva ligeramente el pago mensual, pero dispara el ahorro neto por encima de `49 700 €`.

## Perspectiva estratégica, errores frecuentes y advertencias

El fallo más habitual es evaluar solo la caída del TIN ignorando vinculaciones comerciales que encarecen la TAE real, como seguros de vida de prima única o comisiones de cuenta. Exija siempre la Ficha Europea de Información Normalizada (FEIN) o documento equivalente y recalcule el punto de equilibrio con esos costes incluidos.

Igualmente crítico es olvidar su horizonte de permanencia. Si planea vender la vivienda en menos de dos años y su equilibrio tarda `24 meses`, perderá dinero. Evite también sumar los gastos de cierre al nuevo capital salvo necesidad estricta, pues pagará intereses durante décadas sobre comisiones iniciales.

*Nota informativa: contenido exclusivamente divulgativo que no constituye asesoramiento financiero ni jurídico personalizado. Verifique comisiones y condiciones contractuales con su entidad o asesor independiente.*
