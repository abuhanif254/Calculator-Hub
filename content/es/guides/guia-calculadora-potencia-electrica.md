---
title: "Potencia Eléctrica: Calculando Vatios (P=VI)"
description: "Domine la Ley de Watt para calcular potencia eléctrica en vatios (W), potencia aparente (VA), potencia reactiva (VAr) y consumo en corriente continua, monofásica y trifásica."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electrical-power-calculator"
faqs:
  - question: "¿Cuál es la diferencia entre vatios (W) y voltamperios (VA) en un SAI o generador?"
    answer: "El vatio (W) mide la potencia activa real que se convierte en trabajo útil, luz o calor. El voltamperio (VA) mide la potencia aparente total que circula por el circuito (S = V × I). En cargas con factor de potencia inferior a 1, como fuentes de ordenador o motores, la demanda en VA es mayor que en W; por ello los SAI (UPS) y generadores especifican ambos límites y ninguno debe superarse."
  - question: "¿Un electrodoméstico de 1,200 W consume menos electricidad a 240 V que a 120 V?"
    answer: "No en términos de energía ni de potencia activa: 1,200 W siguen siendo 1,200 julios por segundo en ambos casos. Lo que cambia es la intensidad de corriente: a 240 V el aparato demanda 5 A, mientras que a 120 V exige 10 A. Al reducir la corriente a la mitad, los sistemas de 240 V permiten usar cables más delgados y sufrir cuatro veces menos pérdidas por calor en el cableado (P_pérdida = I² × R)."
  - question: "¿Cómo se relaciona la potencia eléctrica en vatios con los caballos de fuerza (HP)?"
    answer: "El vatio y el caballo de fuerza miden la misma magnitud física (tasa de transferencia de energía). Un caballo de fuerza mecánico imperial (HP) equivale aproximadamente a 745.7 vatios, mientras que el caballo de vapor métrico (CV) equivale a 735.5 vatios. Al calcular el consumo eléctrico real de un motor de 1 HP debe dividirse además por su eficiencia eléctrica (por ejemplo, 80 % a 90 %)."
  - question: "¿Por qué los motores eléctricos consumen mucha más potencia al arrancar que en marcha normal?"
    answer: "Al estar el rotor detenido no existe fuerza contraelectromotriz que limite la corriente, por lo que el devanado actúa momentáneamente casi como una impedancia muy baja. Durante fracciones de segundo hasta unos pocos segundos, el pico de arranque puede multiplicar por 3 a 7 veces la potencia nominal, exigiendo inversores y protecciones capaces de tolerar sobrecargas transitorias."
  - question: "¿Se puede aplicar P = V × I directamente en circuitos trifásicos?"
    answer: "No directamente con el voltaje entre fases. En un sistema trifásico equilibrado, la potencia activa total es P = √3 × V_L × I_L × cos φ, donde √3 ≈ 1.7321, V_L es la tensión de línea entre fases (por ejemplo 400 V o 208 V) e I_L es la corriente por fase. Omitir el factor √3 subestima la potencia real en más de un 42 %."
---

La **potencia eléctrica** (símbolo `P`) expresa la rapidez con la que la energía eléctrica se transfiere o se transforma en calor, luz, movimiento mecánico o trabajo químico. Su unidad en el Sistema Internacional es el **vatio** (`W`), equivalente a un julio por segundo (`1 W = 1 J/s`).

Mientras un foco LED de `10 W` transforma `10 julios` cada segundo, un horno microondas de `1,000 W` convierte energía cien veces más rápido. Calcular la potencia exacta resulta esencial para dimensionar instalaciones domiciliarias, elegir generadores de respaldo o estimar la carga térmica de un cuadro eléctrico. Con nuestra [Calculadora de Potencia Eléctrica](/es/calculadoras/calculadora-de-potencia-electrica) puede obtener cualquiera de las magnitudes a partir de las otras dos variables.

## Ley de Watt y triángulo de potencias en corriente alterna

En corriente continua (CC) y en cargas de corriente alterna (CA) puramente resistivas, la potencia eléctrica se rige por la **Ley de Watt** y sus variantes derivadas al sustituir mediante la Ley de Ohm (`V = I × R`):

```text
Fórmulas básicas (CC y CA resistiva):
P = V × I
P = I² × R
P = V² / R
```

Donde `P` se expresa en vatios (`W`), `V` en voltios (`V`), `I` en amperios (`A`) y `R` en ohmios (`Ω`). Un mismo nivel de potencia puede alcanzarse con distintas combinaciones de tensión e intensidad: `120 V × 10 A = 1,200 W`, idéntico resultado que `240 V × 5 A = 1,200 W`.

### Potencia activa, reactiva y aparente en corriente alterna

En equipos con bobinas o condensadores (motores, bombas, transformadores, balastos), la onda de corriente se desfasa un ángulo `φ` respecto a la onda de tensión. Aparecen entonces tres magnitudes vinculadas por el teorema de Pitágoras:

```text
Potencia aparente (S, en VA):
S = V × I

Potencia activa (P, en W):
P = V × I × cos φ

Potencia reactiva (Q, en VAr):
Q = V × I × sin φ

Relación vectorial (Triángulo de Potencias):
S² = P² + Q²
```

En instalaciones trifásicas equilibradas, las mismas expresiones incorporan el factor `√3` (`≈ 1.7321`) al trabajar con la tensión entre fases (`V_L`) y la corriente de línea (`I_L`): `P = √3 × V_L × I_L × cos φ`.

## Ejemplo práctico paso a paso: motor monofásico frente a calefactor

Considere un compresor de aire de taller con motor monofásico conectado a `V = 230 V` que demanda una corriente medida con pinza amperimétrica de `I = 8.5 A` y posee un factor de potencia nominal `cos φ = 0.85`. Se desea conocer sus tres potencias y compararlas con una carga resistiva equivalente.

1. **Calcular la potencia aparente (`S`):**
   `S = 230 V × 8.5 A = 1,955 VA` (`1.955 kVA`).
   Este valor determina la corriente real que soportan los cables y el límite mínimo de un generador o transformador que alimente el motor.
2. **Calcular la potencia activa o real (`P`):**
   `P = 1,955 VA × 0.85 = 1,661.75 W` (`≈ 1.66 kW`).
   Es la potencia efectiva que realiza trabajo mecánico y pérdidas internas, y la que registra el contador eléctrico residencial.
3. **Calcular la potencia reactiva (`Q`):**
   Aplicando el triángulo de potencias:
   `Q = √(S² − P²) = √(1,955² − 1,661.75²) = √(3,822,025 − 2,761,413.06) = √1,060,611.94 ≈ 1,029.86 VAr`.
4. **Comparación con una estufa resistiva de `1,661.75 W` (`cos φ = 1.0`) a `230 V`:**
   La estufa requeriría únicamente `I = 1,661.75 W / 230 V = 7.225 A`, es decir, un `15 %` menos de intensidad en los conductores para entregar exactamente los mismos vatios activos que el compresor.

## Referencia técnica de potencia por tipo de equipo

La tabla siguiente muestra valores típicos de potencia activa (`W`), tensión nominal (`V`), factor de potencia (`cos φ`), corriente eficaz (`A`) y potencia aparente (`VA`) en cargas habituales:

| Equipo eléctrico | Potencia activa (`P`) | Tensión (`V`) | Factor de potencia (`cos φ`) | Corriente (`I`) | Potencia aparente (`S`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Lámpara LED residencial | `10 W` | `230 V` | `0.85` | `0.051 A` | `11.8 VA` |
| Cargador portátil USB-C | `65 W` | `230 V` | `0.92` | `0.307 A` | `70.7 VA` |
| Refrigerador doméstico (marcha) | `180 W` | `120 V` | `0.80` | `1.875 A` | `225.0 VA` |
| Horno microondas | `1,200 W` | `120 V` | `0.95` | `10.526 A` | `1,263.2 VA` |
| Aire acondicionado *inverter* | `1,500 W` | `230 V` | `0.96` | `6.793 A` | `1,562.5 VA` |
| Cargador rápido doméstico VE | `7,360 W` | `230 V` | `0.99` | `32.323 A` | `7,434.3 VA` |

## Errores habituales y criterios de precisión

- **Confundir potencia instantánea (`W`) con energía (`Wh`):** un secador de pelo de `2,000 W` tiene el doble de potencia que un radiador de `1,000 W`, pero si el secador opera `6 minutos` (`200 Wh`) y el radiador funciona `3 horas` (`3,000 Wh`), el radiador consume quince veces más energía en la factura.
- **Dimensionar inversores o grupos electrógenos solo por vatios:** un SAI especificado en `1,000 VA / 600 W` no puede alimentar un horno resistivo de `800 W`, aunque `800` sea menor que `1,000 VA`, porque supera su tope de potencia activa (`600 W`). Igualmente, alimentar cargas con bajo `cos φ` puede saturar el límite de `VA` antes de alcanzar el tope de vatios.
- **Ignorar la potencia de salida frente a la potencia absorbida:** en motores, fuentes conmutadas y amplificadores, la etiqueta comercial suele destacar la potencia útil entregada en el eje o salida, no la potencia eléctrica absorbida de la red. Un motor de `1,000 W` mecánicos con eficiencia del `82 %` absorbe `1,000 / 0.82 ≈ 1,220 W` de la línea eléctrica.
- **Omitir el recargo por energía reactiva en entornos industriales:** aunque los usuarios domésticos solo suelen abonar energía activa (`kWh`), las tarifas comerciales e industriales penalizan económicamente un factor de potencia por debajo de `0.90–0.95`, obligando a instalar bancos de condensadores para compensar `Q`.
