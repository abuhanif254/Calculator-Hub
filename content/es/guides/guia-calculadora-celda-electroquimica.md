---
title: "Calculadora de Celda Electroquímica: Baterías Explicadas"
description: "Aprenda cómo las celdas galvánicas generan electricidad, cómo calcular el potencial estándar de celda y use nuestra calculadora gratuita."
category: "Math & Science"
relatedCalculator: "electrochemical-cell-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Por qué los potenciales estándar de reducción no se multiplican por los coeficientes estequiométricos?"
    answer: "El potencial eléctrico es una propiedad intensiva, medida en voltios (julios por culombio), por lo que depende de la diferencia de energía por unidad de carga y no de la cantidad total de materia que reacciona. Duplicar los moles de electrones duplica tanto la energía libre de Gibbs (ΔG°) como la carga total transferida (n × F), de modo que el cociente E° = −ΔG° / (n × F) permanece constante."
  - question: "¿Cuál es la diferencia práctica entre una celda galvánica y una celda electrolítica?"
    answer: "Una celda galvánica (o voltaica) aprovecha una reacción redox espontánea con potencial positivo (E_celda > 0 y ΔG < 0) para entregar trabajo eléctrico al exterior, como ocurre al descargar una batería. Una celda electrolítica, en cambio, presenta un potencial negativo (E_celda < 0 y ΔG > 0) y requiere una fuente externa de voltaje superior a |E_celda| para forzar una reacción no espontánea, como en la recarga de acumuladores o la electrólisis del agua."
  - question: "¿Cómo afecta la concentración de los iones al voltaje real de una batería?"
    answer: "Cuando las concentraciones difieren de 1 mol/L o los gases no están a 1 bar, el voltaje se desvía de E°_celda según la ecuación de Nernst. Aumentar la concentración de los reactivos o disminuir la de los productos reduce el cociente de reacción Q, lo que eleva el potencial medido. Conforme la batería se descarga, Q aumenta de forma continua hasta que E_celda cae a 0 V en el equilibrio."
  - question: "¿Qué electrodo actúa como ánodo y cuál como cátodo al usar tablas de reducción?"
    answer: "Al comparar dos semirreacciones escritas como reducciones en condiciones estándar, la especie con mayor potencial estándar de reducción (E°_red más positivo o menos negativo) tiene mayor afinidad por los electrones y actúa como cátodo (reducción). La especie con menor E°_red se invierte para actuar como ánodo (oxidación), cediendo electrones hacia el circuito externo."
  - question: "¿Por qué el voltaje en terminales de una celda real es menor que el calculado con Nernst?"
    answer: "La ecuación de Nernst predice la fuerza electromotriz en circuito abierto (corriente nula). En operación real bajo carga, la tensión en terminales disminuye por la caída óhmica interna debida a la resistencia del electrolito y los electrodos (I × R_int), así como por los sobrepotenciales de activación y de transferencia de masa en la interfaz electrodo-electrolito."
---

Una celda electroquímica convierte la energía química de una reacción de oxidación-reducción (redox) en energía eléctrica al separar físicamente sus dos semirreacciones. Para determinar el voltaje teórico en condiciones estándar (`298,15 K`, gases a `1 bar` y disoluciones de `1 mol/L`), se resta el potencial estándar de reducción del ánodo al del cátodo: `E°_celda = E°_cátodo − E°_ánodo`. Cuando `E°_celda > 0`, el proceso es espontáneo y la celda opera como una batería galvánica.

Si las concentraciones iónicas o la temperatura se desvían del estado estándar, el voltaje real se ajusta mediante la ecuación de Nernst, que relaciona el potencial con la temperatura absoluta y el cociente de reacción `Q`. Puede verificar el potencial de celda y su espontaneidad en nuestra [Calculadora de Celda Electroquímica](/es/calculadoras/calculadora-de-celda-electroquimica).

## Principios electroquímicos y ecuaciones fundamentales

Toda celda galvánica consta de dos semiceldas unidas por un conductor externo y un puente salino. En el **ánodo** se produce la oxidación (cesión de electrones hacia el circuito), mientras que en el **cátodo** ocurre la reducción (captación de electrones). El puente salino preserva la electroneutralidad permitiendo la migración interna de iones sin mezclar directamente las especies reactivas.

Por convención de la IUPAC, todos los potenciales tabulados (`E°_red`) corresponden a reducciones medidas frente al electrodo estándar de hidrógeno (`0,000 V`). Las ecuaciones operativas esenciales son:

```text
E°_celda = E°_cátodo − E°_ánodo
ΔG° = −n × F × E°_celda
E_celda = E°_celda − ((R × T) / (n × F)) × ln(Q)
```

Aquí, `E°_celda` está en voltios (`V`), `ΔG°` es la energía libre estándar (`J/mol`), `n` representa los moles de electrones transferidos en la ecuación balanceada, `F` es la constante de Faraday (`96 485 C/mol`), `R` es la constante universal de los gases (`8,3145 J/(mol·K)`), `T` es la temperatura absoluta (`K`) y `Q` es el cociente de reacción. A `298,15 K` (`25 °C`), la ecuación de Nernst adopta la forma práctica `E_celda = E°_celda − (0,05916 V / n) × log10(Q)`.

## Cálculo paso a paso: celda de Daniell fuera del estado estándar

Considere una celda de cinc y cobre a `298,15 K` con concentraciones no estándar: `Zn(s) | Zn²⁺(ac, 0,10 mol/L) || Cu²⁺(ac, 1,50 mol/L) | Cu(s)`. Los potenciales estándar son `E°(Cu²⁺/Cu) = +0,34 V` y `E°(Zn²⁺/Zn) = −0,76 V`.

1. **Identificación de electrodos:** Como `+0,34 V > −0,76 V`, el par `Cu²⁺/Cu` actúa como cátodo (reducción) y el par `Zn²⁺/Zn` como ánodo (oxidación). La ecuación global `Zn(s) + Cu²⁺(ac) → Zn²⁺(ac) + Cu(s)` transfiere `n = 2` moles de electrones.
2. **Potencial estándar (`E°_celda`):** `E°_celda = +0,34 V − (−0,76 V) = +1,10 V`.
3. **Espontaneidad (`ΔG°`):** `ΔG° = −2 × 96 485 C/mol × 1,10 V = −212 267 J/mol = −212,27 kJ/mol`. El signo negativo confirma una reacción espontánea.
4. **Cociente de reacción (`Q`):** Excluyendo los sólidos puros, `Q = [Zn²⁺] / [Cu²⁺] = 0,10 / 1,50 = 0,0667`, cuyo logaritmo decimal es `log10(0,0667) = −1,1761`.
5. **Corrección de Nernst a `25 °C`:** `E_celda = 1,10 V − (0,05916 V / 2) × (−1,1761) = 1,10 V + 0,0348 V = 1,135 V`. El exceso de reactivo `Cu²⁺` eleva la tensión `35 mV` sobre el valor estándar.

## Comparativa de sistemas electroquímicos representativos

La tabla siguiente compara baterías primarias, acumuladores recargables y celdas electrolíticas según sus semirreacciones, potencial teórico y aplicación principal.

| Sistema | Ánodo (oxidación) | Cátodo (reducción) | Voltaje (`n`) | Uso principal |
| :--- | :--- | :--- | :--- | :--- |
| Daniell | `Zn → Zn²⁺ + 2 e⁻` | `Cu²⁺ + 2 e⁻ → Cu` | `+1,10 V` (`2`) | Celda galvánica de referencia |
| Alcalina | `Zn + 2 OH⁻ → ZnO + H₂O + 2 e⁻` | `2 MnO₂ + H₂O + 2 e⁻ → Mn₂O₃ + 2 OH⁻` | `+1,50 V` (`2`) | Pila primaria de consumo |
| Plomo-ácido | `Pb + HSO₄⁻ → PbSO₄ + H⁺ + 2 e⁻` | `PbO₂ + HSO₄⁻ + 3 H⁺ + 2 e⁻ → PbSO₄ + 2 H₂O` | `+2,05 V` (`2`) | Arranque automotriz y respaldo |
| NiMH | `MH + OH⁻ → M + H₂O + e⁻` | `NiO(OH) + H₂O + e⁻ → Ni(OH)₂ + OH⁻` | `+1,20 V` (`1`) | Equipos portátiles e híbridos |
| Litio LFP | `LiC₆ → C₆ + Li⁺ + e⁻` | `FePO₄ + Li⁺ + e⁻ → LiFePO₄` | `+3,20 V` (`1`) | Vehículos y almacenamiento fijo |
| Litio NMC | `LiC₆ → C₆ + Li⁺ + e⁻` | `Li₁₋ₓMO₂ + x Li⁺ + x e⁻ → LiMO₂` | `+3,70 V` (`1`) | Electrónica y tracción eléctrica |
| Electrólisis `H₂O` | `2 H₂O → O₂ + 4 H⁺ + 4 e⁻` | `4 H⁺ + 4 e⁻ → 2 H₂` | `−1,23 V` (`4`) | Producción electrolítica de `H₂` |

## Aplicaciones prácticas, errores frecuentes y límites de precisión

En ingeniería de baterías y almacenamiento estacionario, conocer `E_celda` permite dimensionar cadenas de celdas conectadas en serie para alcanzar tensiones nominales de bus (`400 V` u `800 V` en vehículos eléctricos) y calcular la energía específica teórica del dispositivo. En protección contra la corrosión marina e industrial, las tablas de reducción guían la selección de ánodos de sacrificio de magnesio (`−2,37 V`) o cinc (`−0,76 V`) capaces de proteger catódicamente estructuras de acero (`−0,44 V`) enterradas o sumergidas. En instrumentación analítica, los sensores potenciométricos y pH-metros traducen variaciones de voltaje en concentraciones mediante la pendiente nernstiana de `59,16 mV` por década a `25 °C`.

El fallo de cálculo más habitual consiste en multiplicar `E°` por los coeficientes estequiométricos al balancear los electrones intercambiados; recuerde que el potencial es una propiedad intensiva y nunca se escala. También es frecuente invertir el signo del potencial anódico antes de restarlo o introducir la temperatura en grados Celsius en lugar de kelvin absolutos en la ecuación de Nernst.

Por último, conviene recordar que sustituir actividades por molaridades solo es exacto en disoluciones diluidas (`< 0,01 mol/L`). En electrolitos concentrados, las interacciones electrostáticas entre iones exigen emplear coeficientes de actividad efectivos, y bajo régimen de corriente real la resistencia óhmica interna (`I × R_int`) junto con los sobrepotenciales reducen la tensión útil medida en los terminales respecto al valor teórico de equilibrio.
