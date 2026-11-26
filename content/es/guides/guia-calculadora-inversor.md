---
title: "Inversores: Convirtiendo Energía de Batería en AC"
description: "Aprenda cómo funciona un inversor CC/CA, la diferencia entre onda sinusoidal pura y modificada, el cálculo de corriente en batería y el dimensionamiento seguro frente a picos de arranque."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "inverter-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué un inversor de 2,000 W requiere cables tan gruesos en el lado de la batería de 12 V?"
    answer: "Porque la potencia es el producto de tensión por corriente (P = V × I). Para entregar 2,000 W en alterna a 120 V o 230 V bastan 16.7 A u 8.7 A, pero del lado de una batería de 12 V (contando un 90 % de eficiencia) circulan unos 185 A continuos. Corrientes tan altas exigen secciones gruesas de cobre para evitar caídas de voltaje y sobrecalentamiento peligroso."
  - question: "¿Qué equipos pueden dañarse si se conectan a un inversor de onda sinusoidal modificada?"
    answer: "Los dispositivos con motores de inducción o velocidad variable (frigoríficos modernos, bombas de agua, herramientas con control de fase), cargadores sin transformador, fuentes con corrección activa del factor de potencia (PFC), equipos médicos (CPAP), impresoras láser y hornos microondas sufren calentamiento adicional, zumbidos o fallos electrónicos con onda modificada."
  - question: "¿Cuál es la diferencia entre la potencia continua y la potencia pico de un inversor?"
    answer: "La potencia continua es la carga máxima en vatios (W) que el inversor puede sostener indefinidamente dentro de su rango térmico. La potencia pico o de arranque (habitualmente el doble de la continua durante 1 a 5 segundos) permite absorber las corrientes transitorias de arranque de compresores, neveras o sierras eléctricas."
  - question: "¿Cuándo conviene pasar de un banco de baterías de 12 V a uno de 24 V o 48 V?"
    answer: "Por regla técnica, los sistemas de hasta 1,200 W suelen operar cómodamente a 12 V; entre 1,500 W y 3,000 W conviene utilizar 24 V para reducir a la mitad el amperaje en corriente continua; y a partir de 3,000 W o 4,000 W el estándar profesional es 48 V, lo que minimiza pérdidas resistivas, calibres de cable y costo en protecciones."
  - question: "¿El inversor consume energía de la batería cuando los aparatos conectados están apagados?"
    answer: "Sí. Todo inversor necesita alimentar sus propios circuitos de control y conmutación mientras permanece encendido, lo que genera un autoconsumo en vacío típico de 5 W a 35 W según su potencia nominal. Si no va a utilizar cargas alternas durante la noche o períodos prolongados, conviene apagarlo o activar su modo de ahorro (ECO)."
---

Las baterías almacenan electricidad en **corriente continua (`CC` o `DC`)** a tensiones bajas (`12 V`, `24 V` o `48 V`), mientras que los electrodomésticos y herramientas estándar funcionan con **corriente alterna (`CA` o `AC`)** a `120 V` (`60 Hz`) o `230 V` (`50 Hz`). El **inversor de potencia** conmuta electrónicamente la corriente continua del banco de baterías y la transforma mediante etapas de elevación y filtrado en una onda alterna apta para alimentar cargas domésticas o industriales.

Dimensionar correctamente este equipo exige sumar las cargas simultáneas, prever los picos inductivos de arranque, elegir el tipo de onda adecuado y calcular el amperaje máximo en batería considerando las pérdidas por eficiencia. Nuestra [Calculadora de Inversores](/es/calculadoras/calculadora-de-inversor) determina la potencia recomendada del equipo, la corriente continua extraída y el calibre de protección necesario.

## Principios eléctricos y fórmulas de dimensionamiento

Un cálculo riguroso evalúa tanto la demanda de salida en `CA` como el estrés eléctrico en la entrada `CC`:

```text
P_continua = Σ P_cargas_simultáneas
P_inversor_mín = P_continua × 1.25
I_CC = P_continua / (V_batería × η_inversor)
I_CC_máx = P_continua / (V_mín_batería × η_inversor)
I_fusible = I_CC_máx × 1.25
```

- **`P_continua` (`W`):** suma de la potencia real absorbida por todos los aparatos encendidos a la vez. En cargas reactivas conviene comprobar además los `VA` totales (`W / FP`).
- **`1.25` (Margen del `25 %`):** evita operar al `100 %` del límite térmico, prolonga la vida de los transistores MOSFET/IGBT y compensa el calor ambiente.
- **`η_inversor`:** eficiencia típica de conversión (`0.85` a `0.93` en onda pura); el resto (`1 − η`) se disipa en calor.
- **`V_mín_batería`:** voltaje mínimo bajo carga antes del corte (`11.0 V` en `12 V` o `22.0 V` en `24 V`), punto donde la corriente `CC` alcanza su máximo.

### Onda sinusoidal pura frente a onda modificada

Los inversores de **onda sinusoidal modificada** generan una señal escalonada con una distorsión armónica (`THD`) del `25 %` al `40 %`. Aunque funcionan en resistencias puras, provocan recalentamiento en motores, zumbidos en audio y daños en fuentes electrónicas modernas. Los de **onda sinusoidal pura** reconstruyen una sinusoide suave mediante modulación `PWM` (`THD < 3 %`), igualando la calidad de la red pública y garantizando compatibilidad total.

## Ejemplo resuelto paso a paso: sistema de 24 V en cabaña aislada

Suponga que desea alimentar simultáneamente un frigorífico eficiente de **`120 W`** continuos (pico de arranque de **`720 W`**), un microondas cuya placa posterior declara **`1,350 W`** absorbidos (`900 W` de cocción útil), iluminación LED de **`60 W`** y un ordenador de **`150 W`**.

1. **Carga continua simultánea (`P_continua`):**
   ```text
   P_continua = 120 + 1,350 + 60 + 150 = 1,680 W
   ```
2. **Margen de seguridad del `25 %`:**
   ```text
   P_inversor_mín = 1,680 W × 1.25 = 2,100 W
   ```
   Se elige un inversor comercial de **onda pura de `2,500 W` continuos** (`5,000 W` pico).
3. **Verificación de arranque:**
   Si el compresor arranca con el resto activo (`1,560 + 720 = 2,280 W`), la demanda queda por debajo de los `2,500 W` continuos y muy lejos de los `5,000 W` pico.
4. **Corriente en batería de `24 V` con eficiencia `η = 0.90`:**
   ```text
   I_CC (24 V) = 1,680 / (24 × 0.90) = 77.78 A
   I_CC_máx (22 V) = 1,680 / (22 × 0.90) = 84.85 A
   ```
5. **Comparación frente a `12 V` y protección `CC`:**
   ```text
   I_CC (12 V) = 1,680 / (12 × 0.90) = 155.56 A
   I_fusible (24 V) = 84.85 × 1.25 = 106.06 A → Fusible CC de 110 A o 125 A
   ```

Elegir `24 V` en vez de `12 V` reduce la corriente a la mitad, permitiendo cableado de `25 mm²` (`4 AWG`) con pérdidas térmicas cuatro veces menores.

## Comparativa de arquitecturas según onda y voltaje

| Arquitectura / Tipo | Potencia recomendada | Distorsión (`THD`) | Eficiencia | Compatibilidad | Corriente `CC` por `1,000 W` (`η = 90 %`) |
| --- | --- | --- | --- | --- | --- |
| Onda modificada (`12 V`) | `150 – 600 W` | `25 % – 40 %` | `80 % – 86 %` | Solo resistencias y cargas simples | `92.6 A` |
| Onda pura portátil (`12 V`) | `300 – 1,500 W` | `< 3 %` | `87 % – 91 %` | Electrónica, portátiles y motores pequeños | `92.6 A` |
| Onda pura media (`24 V`) | `1,500 – 3,500 W` | `< 3 %` | `89 % – 93 %` | Electrodomésticos, bombas y herramientas | `46.3 A` |
| Onda pura estacionaria (`48 V`) | `3,000 – 15,000 W` | `< 2 %` | `91 % – 95 %` | Viviendas completas y talleres | `23.1 A` |
| Inversor-cargador híbrido (`48 V`) | `5,000 – 12,000 W` | `< 2 %` | `92 % – 96 %` | Autoconsumo con red, generador y MPPT | `23.1 A` |
| Microinversor de red | `300 – 2,000 W` | `< 3 %` | `95 % – 97 %` | Inyección directa solar sin batería | No aplica (`CC` solar directa) |

## Errores habituales y normativa de seguridad

Evite tres fallos críticos al especificar inversores:

- **Confundir potencia útil con potencia eléctrica absorbida:** un microondas de «`900 W`» de cocción consume cerca de `1,350 W` reales de la toma. Verifique siempre la placa trasera en `W` o amperios de entrada.
- **Ignorar el factor de potencia inductivo:** un motor de `650 W` con `FP = 0.65` exige `1,000 VA` al inversor, pudiendo disparar la protección por sobrecarga.
- **Instalar disyuntores de `CA` en corriente continua:** la `CC` no cruza por cero y sostiene arcos eléctricos peligrosos; utilice fusibles `ANL`/`MEGA` o interruptores certificados para `CC` junto al borne positivo.

Conforme a los estándares IEC 62109 y NEC Artículo 690/706, la salida `CA` requiere protección diferencial (`RCD`/`GFCI`) y una única unión neutro-tierra coordinada cuando exista conmutación con la red pública.
