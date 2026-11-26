---
title: "Caída de Voltaje: Por Qué los Cables Largos Pierden Energía"
description: "Comprenda por qué la tensión eléctrica disminuye a lo largo de conductores extensos, cómo calcular la caída de voltaje en corriente continua y alterna, y qué sección elegir."
category: "Math & Science"
relatedCalculator: "voltage-drop-calculator"
relatedType: "calculator"
readingTime: 8
lastUpdated: "2026-11-26"
faqs:
  - question: "¿Cuál es el porcentaje máximo de caída de voltaje recomendado en una instalación eléctrica?"
    answer: "Las normativas técnicas internacionales, como el Código Eléctrico Nacional (NEC) en América y la norma IEC 60364 / REBT en Europa, recomiendan un límite máximo del 3 % en circuitos derivados individuales (especialmente en iluminación) y del 5 % combinado entre el alimentador principal y el punto de consumo final."
  - question: "¿Por qué la caída de voltaje resulta mucho más crítica en sistemas de 12 V o 24 V que en 230 V?"
    answer: "Porque el porcentaje de pérdida es inversamente proporcional a la tensión nominal. Una pérdida absoluta de 1,5 V representa apenas un 0,65 % en una red de 230 V, pero equivale a un 12,5 % en una instalación solar o automotriz de 12 V, suficiente para apagar inversores o impedir el arranque de equipos."
  - question: "¿Debe multiplicarse por dos la distancia al calcular un circuito monofásico?"
    answer: "Sí. En corriente continua y en corriente alterna monofásica, la corriente recorre el conductor de ida (fase o positivo) y regresa por el conductor de retorno (neutro o negativo). Si la carga está a 40 metros del tablero, la longitud eléctrica efectiva del circuito es de 80 metros."
  - question: "¿Qué diferencia existe entre usar cobre o aluminio en la caída de tensión?"
    answer: "A igual temperatura y sección transversal, el aluminio presenta una resistividad eléctrica aproximadamente 1,6 veces mayor que el cobre (0,0282 Ω·mm²/m frente a 0,0178 Ω·mm²/m a 20 °C). Por ello, para igualar la caída de voltaje de un cable de cobre, el aluminio requiere aumentar uno o dos escalones de sección normalizada."
  - question: "¿Qué ocurre con un motor eléctrico si recibe un voltaje muy inferior al nominal?"
    answer: "Un motor de inducción o de potencia constante intenta mantener su par mecánico absorbiendo mayor intensidad de corriente cuando baja el voltaje. Ese exceso de amperaje incrementa el calentamiento por efecto Joule (I² × R), degrada el aislamiento de los devanados y puede disparar protecciones térmicas o dañar el equipo."
---

Cuando una herramienta conectada a un alargador extenso pierde fuerza, o una luminaria parpadea al encender otro equipo, la causa es la **caída de voltaje** (o caída de tensión). Ningún conductor comercial de cobre o aluminio es perfecto: cada metro opone resistencia eléctrica al paso de los electrones, disipando energía en forma de calor y reduciendo la diferencia de potencial que llega a la carga.

A mayor longitud del tendido, menor sección del conductor o mayor corriente demandada, más pronunciada será esa pérdida eléctrica. Para dimensionar cables con seguridad antes de ejecutar una instalación, utilice nuestra [Calculadora de Caída de Voltaje](/es/calculadoras/calculadora-de-caida-de-voltaje) aplicando las ecuaciones y criterios técnicos siguientes.

## Principios físicos, resistencia del conductor y fórmulas de cálculo

La caída de voltaje obedece a la **ley de Ohm** y a la **ley de Pouillet**. La resistencia de un cable homogéneo crece linealmente con su longitud y resistividad, y disminuye de forma inversamente proporcional a su sección transversal. El producto de esa resistencia por la corriente determina los voltios perdidos en el trayecto.

En circuitos de **corriente continua (CC)** o **corriente alterna monofásica (CA)** resistivos, el recorrido incluye ida y retorno, por lo que la distancia se duplica:

```text
ΔV = (2 × L × I × ρ) / S
%ΔV = (ΔV / V_nominal) × 100
```

En líneas **trifásicas equilibradas**, el factor pasa de `2` a `√3` (`≈ 1,732`), incorporando el factor de potencia (`cos φ`) y la reactancia inductiva unitaria (`X_u`) en conductores gruesos:

```text
ΔV_3φ = √3 × L × I × (R_u × cos φ + X_u × sen φ)
```

Definición de parámetros:

- **ΔV (V):** Caída de tensión absoluta entre el origen y la carga.
- **L (m):** Distancia física unidireccional del tramo en metros.
- **I (A):** Intensidad de corriente nominal del circuito en amperios.
- **ρ (Ω·mm²/m):** Resistividad del metal a temperatura de servicio. A 20 °C vale `0,0178 Ω·mm²/m` (cobre) y `0,0282 Ω·mm²/m` (aluminio); bajo carga (70–75 °C), el cobre asciende a `~0,021 Ω·mm²/m`.
- **S (mm²):** Sección transversal útil en milímetros cuadrados.

## Ejemplo numérico paso a paso: bomba hidráulica monofásica

Suponga una bomba monofásica de `230 V` y `14 A` situada a `45 m` del cuadro eléctrico, alimentada con cable de cobre de `2,5 mm²` (`ρ = 0,021 Ω·mm²/m` en servicio).

1. **Calcular la resistencia total de ida y vuelta:**
   El recorrido eléctrico es `2 × 45 m = 90 m`. Aplicando Pouillet:
   `R = (0,021 × 90) / 2,5 = 1,89 / 2,5 = 0,756 Ω`.
2. **Obtener la caída de voltaje absoluta:**
   `ΔV = 14 A × 0,756 Ω = 10,584 V ≈ 10,58 V`.
3. **Calcular el porcentaje de caída:**
   `%ΔV = (10,584 / 230) × 100 = 4,60 %`.
4. **Determinar tensión útil y pérdida térmica:**
   Al motor llegan `230 − 10,58 = 219,42 V`, mientras el cable disipa `P = 14² × 0,756 = 148,18 W` en calor.
5. **Corregir según límite del 3 % (`6,90 V`):**
   El `4,60 %` excede la recomendación para circuitos derivados. Al subir a `4,0 mm²`, la resistencia baja a `0,4725 Ω`, la caída desciende a `6,62 V` (`2,88 %`) y la instalación cumple la tolerancia.

## Comparativa de secciones de cable (cobre, 230 V, 16 A, 50 m)

La tabla muestra la variación para un circuito monofásico de `230 V` y `16 A` a `50 m` (`100 m` totales, `ρ = 0,021 Ω·mm²/m`):

| Sección (mm²) | Calibre aprox. | Resistencia (Ω) | Caída (V) | Caída (%) | Pérdida (W) | Criterio técnico |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1,5 mm²` | ~16 AWG | `1,400 Ω` | `22,40 V` | `9,74 %` | `358,4 W` | Crítico: riesgo térmico y fallo |
| `2,5 mm²` | ~14 AWG | `0,840 Ω` | `13,44 V` | `5,84 %` | `215,0 W` | Inadecuado: supera el 5 % |
| `4,0 mm²` | ~12 AWG | `0,525 Ω` | `8,40 V` | `3,65 %` | `134,4 W` | Aceptable en fuerza; alto en luz |
| `6,0 mm²` | ~10 AWG | `0,350 Ω` | `5,60 V` | `2,43 %` | `89,6 W` | Óptimo en circuito derivado (< 3 %) |
| `10,0 mm²` | ~8 AWG | `0,210 Ω` | `3,36 V` | `1,46 %` | `53,8 W` | Alta eficiencia en tramos largos |
| `16,0 mm²` | ~6 AWG | `0,131 Ω` | `2,10 V` | `0,91 %` | `33,6 W` | Ideal para acometidas o solar CC |

## Aplicaciones prácticas, errores frecuentes y criterios normativos

El control de caída de tensión resulta crítico en sistemas fotovoltaicos aislados, cargadores de vehículos eléctricos, bombeo agrícola y alumbrado exterior. En redes de `12 V` o `24 V` en corriente continua, perder apenas `1 V` supone entre un `4 %` y un `8 %` de merma energética, provocando cortes prematuros en inversores o carga incompleta de baterías.

Al proyectar un circuito deben evitarse cuatro errores frecuentes:

- **Omitir el retorno eléctrico:** Calcular con `L` en vez de `2 × L` en líneas monofásicas o de CC subestima la pérdida a la mitad.
- **Usar resistividad a 20 °C sin ajuste térmico:** En canalizaciones cerradas bajo carga, la resistencia del cobre aumenta un `0,393 %` por cada grado Celsius sobre 20 °C.
- **Confundir ampacidad con caída admisible:** Un cable de `2,5 mm²` soporta térmicamente `16 A` en tramos cortos, pero resulta insuficiente a `60 m` por caída excesiva.
- **Ignorar la corriente de arranque:** Los motores demandan de cuatro a seis veces su amperaje nominal al encender, causando subtensiones transitorias severas.

Todo dimensionado debe validarse frente a la normativa local aplicable (REBT ITC-BT-19 en España, NOM en México o NEC en América), eligiendo siempre la sección superior entre ampacidad, caída de tensión y protección contra cortocircuitos.
