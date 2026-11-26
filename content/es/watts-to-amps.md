---
title: "Conversor de Vatios (W) a Amperios (A): Fórmulas CC/CA y Tabla"
description: "Convierta vatios (W) a amperios (A) en corriente continua y alterna (12 V, 48 V, 120 V y 230 V) con factor de potencia. Fórmulas, disyuntores y ejemplos."
faqs:
  - question: "¿Cuántos amperios consumen 1.000 vatios en 120 V y en 230 V?"
    answer: "Con un factor de potencia unitario (FP = 1), 1.000 W consumen exactamente 8,33 amperios en una línea de 120 V (1.000 ÷ 120) y 4,35 amperios en una red de 230 V (1.000 ÷ 230)."
  - question: "¿Por qué se incluye el factor de potencia al convertir vatios a amperios en corriente alterna?"
    answer: "En corriente alterna, equipos con motores, compresores o fuentes conmutadas presentan un desfase entre la onda de tensión y la de corriente. El factor de potencia (entre 0 y 1) corrige ese desfase para calcular la corriente real que circula por los conductores y disyuntores."
  - question: "¿Cuál es la diferencia de amperaje entre un sistema solar de 12 V y uno de 48 V?"
    answer: "Al cuadruplicar la tensión de 12 V a 48 V, la intensidad de corriente necesaria para entregar la misma potencia se divide entre cuatro. Por ejemplo, una carga de 1.200 W requiere 100 A en 12 V, pero solo 25 A en 48 V."
  - question: "¿Cómo se dimensiona un disyuntor a partir del cálculo en amperios?"
    answer: "Para cargas continuas que operan durante tres horas o más, las normativas eléctricas recomiendan no superar el 80 % de la capacidad nominal del interruptor. Por ejemplo, un consumo continuo de 12 A exige un disyuntor de 15 A o 16 A."
  - question: "¿Se puede convertir vatios a amperios sin conocer el voltaje?"
    answer: "No. El vatio mide potencia eléctrica y el amperio mide intensidad de corriente; ambos están vinculados por la tensión eléctrica (voltios) según la ley de Watt, por lo que el voltaje del circuito es un dato obligatorio."
---

Para convertir vatios (`W`) a amperios (`A`), divida la potencia activa entre la tensión eléctrica del circuito en voltios (`V`). En corriente continua (`CC`), la fórmula directa es `I (A) = P (W) ÷ V (V)`; por ejemplo, una carga de `600 W` sobre una batería de `12 V` demanda exactamente `50 A`.

En corriente alterna (`CA`) monofásica —como redes de `120 V` en América o `230 V` en Europa y gran parte de Sudamérica—, se incorpora el factor de potencia (`FP`): `I (A) = P (W) ÷ (V × FP)`. Este cálculo permite elegir el calibre correcto del cableado y dimensionar disyuntores con seguridad.

## Fórmula exacta y fundamentos internacionales

La relación entre potencia, tensión e intensidad deriva de la **ley de Watt** y está normalizada por el **Sistema Internacional de Unidades (SI)**, la norma **IEC 60050** y el reglamento eléctrico **NEC** para instalaciones de baja tensión.

Las ecuaciones oficiales son:

- **Corriente continua (CC):** `I (A) = P (W) ÷ V (V)` (sin factor de potencia porque la polaridad es constante).
- **Corriente alterna monofásica (CA):** `I (A) = P (W) ÷ (V × FP)`, donde `FP = cos(φ)` oscila entre `0` y `1`. Cargas resistivas como estufas o termos presentan `FP = 1,0`; motores y fuentes conmutadas suelen situarse entre `0,75` y `0,90`.
- **Corriente alterna trifásica:** `I (A) = P (W) ÷ (√3 × V_línea × FP)`, aplicando `√3 ≈ 1,732` junto a la tensión entre fases.

## Ejemplos prácticos paso a paso

Los siguientes ejemplos muestran la verificación exacta en sistemas fotovoltaicos y redes residenciales:

### 1. Banco de baterías solares en 12 V frente a 48 V (corriente continua)

Una instalación fotovoltaica alimenta una carga continua de `600 W`. Calculemos la corriente en el cableado para ambas tensiones:

1. En `12 V`: `I = 600 W ÷ 12 V = 50 A`.
2. En `48 V`: `I = 600 W ÷ 48 V = 12,5 A`.

Al cuadruplicar la tensión a `48 V`, la corriente baja cuatro veces, permitiendo conductores más delgados y reduciendo las pérdidas térmicas (`I² × R`) en un factor de 16.

### 2. Circuito doméstico en 120 V CA con carga inductiva

Una aspiradora industrial consume `1.200 W` reales en una red de `120 V` con `FP = 0,85`:

1. Multiplique tensión y factor de potencia: `120 V × 0,85 = 102`.
2. Divida la potencia: `I = 1.200 ÷ 102 = 11,76 A`.

Según la regla del `80 %` para cargas continuas, un disyuntor de `15 A` soporta hasta `12 A` continuos, operando casi al límite.

### 3. Electrodoméstico resistivo en red de 230 V CA

Un horno doméstico tiene `2.300 W` nominales a `230 V` con carga resistiva (`FP = 1,0`):

1. Aplique la fórmula monofásica: `I = 2.300 ÷ (230 × 1,0) = 10 A`.
2. Proteja la línea con un interruptor magnetotérmico de `16 A` y conductor de `2,5 mm²`.

## Tabla de referencia rápida de Vatios a Amperios

La tabla muestra la intensidad de corriente resultante (`A`) para los voltajes más frecuentes en sistemas solares (`12 V` y `48 V` CC) y redes domésticas (`120 V` y `230 V` CA con `FP = 1,0`):

| Potencia (W) | 12 V CC (A) | 48 V CC (A) | 120 V CA (A) | 230 V CA (A) | Equipo representativo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 100 W | 8,33 A | 2,08 A | 0,83 A | 0,43 A | Iluminación LED o cargador de ordenador |
| 300 W | 25,00 A | 6,25 A | 2,50 A | 1,30 A | Televisor, consola y equipo de red |
| 500 W | 41,67 A | 10,42 A | 4,17 A | 2,17 A | Ordenador de sobremesa o nevera portátil |
| 1.000 W | 83,33 A | 20,83 A | 8,33 A | 4,35 A | Horno microondas o cafetera eléctrica |
| 1.200 W | 100,00 A | 25,00 A | 10,00 A | 5,22 A | Tostadora o herramienta eléctrica de mano |
| 1.500 W | 125,00 A | 31,25 A | 12,50 A | 6,52 A | Calefactor doméstico portátil |
| 2.000 W | 166,67 A | 41,67 A | 16,67 A | 8,70 A | Hervidor de agua rápido o plancha |
| 2.400 W | 200,00 A | 50,00 A | 20,00 A | 10,43 A | Termo eléctrico o climatizador |
| 3.600 W | 300,00 A | 75,00 A | 30,00 A | 15,65 A | Cargador lento de vehículo eléctrico o secadora |

## Aplicaciones prácticas y errores habituales de cálculo

El paso de vatios a amperios es esencial en auditorías de carga residencial, instalación de inversores solares, diseño de cuadros eléctricos y selección de regletas o cables alargadores. Un error de cálculo en el amperaje provoca caídas de tensión, disparos intempestivos de protecciones o sobrecalentamiento peligroso del aislamiento.

El fallo más frecuente en corriente alterna consiste en omitir el **factor de potencia** (`FP`) al evaluar motores, bombas de agua o fuentes de alimentación industriales. Si una bomba de `1.100 W` a `230 V` presenta un `FP = 0,75`, su consumo aparente asciende a `1.100 ÷ (230 × 0,75) = 6,38 A`, casi un `33 %` más de corriente que los `4,78 A` obtenidos suponiendo `FP = 1`. Ignorar este margen subestima el calibre del cable necesario.

También conviene distinguir entre **potencia nominal continua** y **pico de arranque**, así como recordar las diferencias regionales de tensión (`110–127 V` a `60 Hz` frente a `220–240 V` a `50 Hz`). En inversores conectados a baterías de `12 V`, además, debe añadirse la pérdida de eficiencia del propio inversor (típicamente un `10 %`–`15 %`) al calcular el amperaje real que circulará desde la batería hacia los bornes de entrada.
