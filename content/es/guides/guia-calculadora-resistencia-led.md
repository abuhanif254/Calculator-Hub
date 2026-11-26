---
title: "Resistencias para LED: Protegiendo sus Componentes"
description: "Guía técnica de electrónica para dimensionar la resistencia limitadora de un LED: ley de Ohm, tensión directa por color, disipación térmica, series E12/E24 y arreglos serie-paralelo."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "led-resistor-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué se quema un LED al conectarlo directamente a una batería sin resistencia?"
    answer: "Un LED es un diodo semiconductor con una curva exponencial de corriente frente a voltaje. Una vez superada su tensión directa umbral (entre 1.8 V y 3.4 V según el color), un pequeño exceso de voltaje dispara la corriente de forma casi ilimitada, sobrecalentando la unión semiconductora hasta destruir el componente en milisegundos."
  - question: "¿Se debe redondear hacia arriba o hacia abajo al elegir un valor comercial de resistencia?"
    answer: "Siempre debe redondearse hacia el valor estándar inmediato superior dentro de las series E12 o E24. Elegir una resistencia ligeramente mayor reduce de forma segura la corriente unos pocos miliamperios casi sin pérdida visible de brillo, mientras que redondear hacia abajo puede exceder la corriente nominal máxima del LED."
  - question: "¿Puedo proteger varios LED en paralelo utilizando una única resistencia compartida?"
    answer: "No es recomendable. Debido a las tolerancias de fabricación, ningún par de LED tiene exactamente la misma tensión directa (Vf) ni idéntico coeficiente térmico. El LED con menor Vf absorberá mayor corriente, se calentará más, reducirá aún más su caída de voltaje y terminará quemándose, trasladando toda la corriente a los LED restantes en efecto cascada."
  - question: "¿Qué potencia nominal debe tener la resistencia limitadora de un LED?"
    answer: "Calcule la potencia disipada con P = (Vs − Vf) × If y multiplíquela por un factor de seguridad mínimo de 2× para evitar sobrecalentamiento. Para corrientes estándar de 20 mA con fuentes de 5 V o 9 V basta una resistencia de 1/4 W (0.25 W), pero a 12 V o 24 V suele requerirse una resistencia de 1/2 W (0.50 W) o superior."
  - question: "¿Cuándo conviene reemplazar la resistencia simple por un controlador de corriente constante?"
    answer: "Las resistencias son ideales para indicadores y tiras de baja corriente (5 mA a 30 mA). En LED de potencia (1 W, 3 W o más, con corrientes de 350 mA a 1,000 mA) o en fuentes cuyo voltaje fluctúa mucho —como baterías automotrices de 12 V a 14.4 V—, una resistencia desperdicia demasiada energía en calor y conviene usar un regulador de corriente constante."
---

Un diodo emisor de luz (**LED**) no autorregula su consumo como una bombilla incandescente. Al ser una unión semiconductora, una vez superado su umbral de conducción presenta una impedancia mínima; si se conecta directamente a una batería de `5 V`, `9 V` o `12 V`, la corriente se dispara de forma exponencial y destruye la cápsula en milisegundos.

Para proteger el circuito se intercala una **resistencia limitadora en serie** que absorbe el voltaje excedente y fija la corriente de trabajo. Nuestra [Calculadora de Resistencias para LED](/es/calculadoras/calculadora-de-resistencia-led) obtiene de inmediato el valor óhmico exacto, la pieza comercial estándar y su potencia mínima recomendada. Esta guía detalla las ecuaciones de diseño, un cálculo resuelto completo, una tabla de valores por color y los errores críticos de montaje.

## Ley de Ohm aplicada, disipación térmica y parámetros

Para una rama con `n` LED idénticos en serie y una resistencia `R` alimentados por una fuente continua `Vs`, las leyes de Kirchhoff y Ohm determinan:

```text
R (Ω) = (Vs − n × Vf) / If
P_R (W) = (Vs − n × Vf) × If = If² × R
If_real (A) = (Vs − n × Vf) / R_comercial
```

- **`Vs` (tensión de alimentación, `V`):** voltaje máximo entregado por la fuente o batería a plena carga (`4.2 V` en celdas Li-ion de `3.7 V`; `14.4 V` en sistemas automotrices de `12 V`).
- **`Vf` (tensión directa, `V`):** caída de voltaje propia de cada LED al conducir. Oscila entre `1.8–2.1 V` en tonos rojos y amarillos, y `3.0–3.4 V` en verdes de alto brillo, azules y blancos.
- **`n` (LED en serie):** número de diodos encadenados en la misma rama. Debe cumplirse `Vs > n × Vf` con al menos `1.5–2.0 V` de margen sobre la resistencia para estabilizar la corriente.
- **`If` (corriente directa deseada, `A`):** intensidad objetivo en amperios (`20 mA = 0.020 A`; en indicadores modernos, `10–15 mA` brinda brillo suficiente y mayor durabilidad).
- **`P_R` (potencia disipada, `W`):** calor generado en la resistencia. Se aplica un **factor de seguridad `2×`** (`P_nominal ≥ 2 × P_R`) para evitar estrés térmico.

## Ejemplo práctico resuelto: LED azul de 3.2 V en fuente de 12 V

Suponga una fuente regulada de `12 V DC` alimentando LED azules con `Vf = 3.2 V` e `If = 20 mA` (`0.020 A`). Analizamos primero un solo LED y luego tres en serie.

### Escenario 1: un único LED (`n = 1`)

1. **Cálculo de resistencia teórica:**
   `R = (12 − 3.2) / 0.020 = 8.8 / 0.020 = 440 Ω`
2. **Valor comercial (serie E24) y corriente efectiva:**
   El valor estándar inmediato superior es `470 Ω`. La corriente real resulta:
   `If_real = 8.8 / 470 = 0.0187 A = 18.7 mA`.
3. **Disipación y potencia física recomendada:**
   `P_R = 8.8 × 0.0187 = 0.165 W`.
   Con el margen `2×` (`0.33 W`), una resistencia de `1/4 W` (`0.25 W`) se calentaría en exceso; conviene instalar una resistencia de **`1/2 W` (`0.50 W`)**.

### Escenario 2: tres LED en serie (`n = 3`)

Tres LED idénticos suman `3 × 3.2 V = 9.6 V` de caída útil:

- `R = (12 − 9.6) / 0.020 = 2.4 / 0.020 = 120 Ω` (valor comercial exacto en E12 y E24).
- `P_R = 2.4 × 0.020 = 0.048 W`, cubierta holgadamente por una resistencia de `1/4 W` (`0.25 W`), reduciendo las pérdidas térmicas en más del `70 %`.

## Valores de tensión directa y resistencias E24 por color

La tabla resume los parámetros habituales para LED indicadores a `If = 20 mA` (`0.020 A`) con fuentes de `5 V` y `12 V`:

| Color / Tipo de LED | Semiconductor | Longitud de onda | Vf típica | E24 (Vs = 5 V) | E24 (Vs = 12 V) |
| --- | --- | --- | --- | --- | --- |
| Infrarrojo (IR) | GaAs / AlGaAs | 850–940 nm | 1.3 V | 200 Ω | 560 Ω |
| Rojo estándar | AlGaInP / GaAsP | 620–645 nm | 2.0 V | 150 Ω | 510 Ω |
| Ámbar / Amarillo | AlGaInP | 585–595 nm | 2.1 V | 150 Ω | 510 Ω |
| Verde alto brillo | InGaN | 520–530 nm | 3.1 V | 100 Ω | 470 Ω |
| Azul | InGaN | 460–475 nm | 3.2 V | 91 Ω | 470 Ω |
| Blanco frío / neutro | InGaN + fósforo | Banda ancha | 3.2 V | 91 Ω | 470 Ω |
| Ultravioleta (UV-A) | InGaN / AlGaN | 365–400 nm | 3.5 V | 75 Ω | 430 Ω |

## Errores de montaje y límites prácticos de la resistencia

Incluso aplicando la fórmula correcta, cuatro descuidos habituales causan fallos prematuros en prototipos y luminarias:

- **Compartir una resistencia entre LED en paralelo:** las tolerancias de `Vf` provocan que el diodo con menor caída absorba más corriente, se caliente, baje aún más su `Vf` y falle en efecto cascada (*thermal runaway*). Cada rama paralela requiere su propia resistencia.
- **Exceder la tensión inversa máxima (`V_R`):** la mayoría de los LED soportan apenas `5 V` en polarización inversa; invertir la polaridad a `12 V` o alimentarlos con AC sin protección destruye la unión.
- **Omitir caídas de voltaje de controladores:** salidas digitales o transistores BJT en saturación pierden `0.2–0.7 V`, reduciendo la corriente disponible respecto al cálculo ideal.
- **Usar resistencias en LED de potencia (`≥ 1 W`):** para corrientes de `350–1,000 mA` la disipación resistiva es ineficiente y térmicamente inestable; debe emplearse un controlador conmutado (*driver*) de corriente constante.
