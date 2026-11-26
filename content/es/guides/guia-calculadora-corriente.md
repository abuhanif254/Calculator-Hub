---
title: "Corriente Eléctrica: El Flujo de Electrones"
description: "Guía técnica sobre la corriente eléctrica: definición en amperios, corriente continua frente a alterna, cálculo por Ley de Ohm y potencia, dimensionamiento de cables y seguridad eléctrica."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "current-calculator"
faqs:
  - question: "¿Qué es exactamente un amperio y cuántos electrones transporta?"
    answer: "El amperio (A) es la unidad del Sistema Internacional para la intensidad de corriente eléctrica y equivale al paso de un culombio de carga por segundo (1 A = 1 C/s). En términos microscópicos, esto representa aproximadamente 6.2415 × 10¹⁸ cargas elementales (electrones) atravesando la sección transversal de un conductor cada segundo."
  - question: "¿Por qué se afirma que la corriente mata y no el voltaje?"
    answer: "El voltaje es la diferencia de potencial que impulsa las cargas, pero el daño fisiológico en tejidos y miocardio depende de la intensidad que atraviesa el cuerpo y de su duración. Una corriente alterna de apenas 30 a 50 miliamperios (0.03–0.05 A) por el tórax puede desencadenar fibrilación ventricular; el voltaje solo determina cuánta corriente logra vencer la resistencia de la piel."
  - question: "¿Cuál es la diferencia práctica entre corriente continua (CC/DC) y corriente alterna (CA/AC)?"
    answer: "En corriente continua los electrones fluyen en un único sentido con polaridad constante, propia de baterías, paneles solares y electrónica digital. En corriente alterna la polaridad y el sentido del flujo invierten su dirección periódicamente de forma senoidal (50 Hz o 60 Hz en redes públicas), lo que facilita transformar tensiones y reducir pérdidas en largas líneas de transmisión."
  - question: "¿Cómo influye el factor de potencia al calcular la corriente en corriente alterna?"
    answer: "En cargas inductivas como motores, compresores o transformadores, parte de la corriente oscila para sostener campos magnéticos sin generar trabajo útil. Por ello, la corriente real demandada aumenta según I = P / (V × cos φ). Si se omite el factor de potencia (cos φ), se subestima la corriente real y se corre el riesgo de sobrecalentar conductores y disparar protecciones."
  - question: "¿Qué ocurre si se supera la capacidad de corriente de un cable eléctrico?"
    answer: "Todo conductor presenta una resistencia eléctrica interna y disipa calor proporcional al cuadrado de la corriente (P = I² × R). Si la corriente supera la ampacidad nominal del cable, la temperatura degrada el aislamiento de PVC o XLPE, provoca cortocircuitos entre fases o neutro y puede iniciar un incendio eléctrico dentro de canalizaciones o muros."
---

La **corriente eléctrica** (símbolo `I`) es el flujo neto de carga eléctrica que atraviesa la sección de un conductor por unidad de tiempo. Se mide en **amperios** (`A`), donde `1 A` equivale a un culombio por segundo (`1 C/s`, aproximadamente `6.2415 × 10¹⁸` electrones por segundo). Mientras el voltaje aporta la presión que impulsa las cargas, la corriente cuantifica el caudal real en movimiento.

Calcular la intensidad exacta resulta indispensable porque determina directamente el calibre de los conductores, la capacidad de las protecciones termomagnéticas y el riesgo térmico o fisiológico del circuito. Con nuestra [Calculadora de Corriente](/es/calculadoras/calculadora-de-corriente) puede despejar este valor al instante a partir de tensión, resistencia o potencia.

## Fundamentos físicos y ecuaciones de cálculo

La intensidad media de corriente parte de la carga eléctrica (`ΔQ`, en culombios) que cruza una sección del circuito en un intervalo de tiempo (`Δt`, en segundos): `I = ΔQ / Δt`. En el diseño eléctrico habitual, la intensidad se calcula combinando la **Ley de Ohm** o la **Ley de Watt**:

```text
Corriente continua o resistiva (Ley de Ohm):
I = V / R

Corriente continua por potencia:
I = P / V

Corriente alterna monofásica:
I = P / (V × cos φ)

Corriente alterna trifásica equilibrada:
I = P / (√3 × V_L × cos φ)
```

Donde:

- **`I`:** intensidad de corriente en amperios (`A`); en corriente alterna corresponde al valor eficaz o RMS (*Root Mean Square*).
- **`V`:** tensión eléctrica en voltios (`V`); **`V_L`** indica la tensión de línea entre fases en redes trifásicas (`400 V` o `208 V`).
- **`R`:** resistencia eléctrica total en ohmios (`Ω`).
- **`P`:** potencia activa consumida por la carga en vatios (`W`).
- **`cos φ`:** factor de potencia adimensional (`0` a `1`); vale `1.0` en resistencias puras y entre `0.75` y `0.95` en motores y fuentes conmutadas.

### Corriente eficaz (RMS) y valor pico en corriente alterna

Las redes públicas operan en corriente alterna senoidal a `50 Hz` o `60 Hz`. Un amperímetro estándar mide el valor eficaz (`I_RMS`), equivalente térmicamente a una corriente continua de igual magnitud, mientras el pico máximo instantáneo alcanza:

```text
I_pico = I_RMS × √2 ≈ I_RMS × 1.4142
```

Conocer `I_pico` es clave para dimensionar diodos rectificadores y semiconductores que deben soportar crestas de onda sin degradarse.

## Ejemplo práctico paso a paso: circuito de un termo eléctrico

Suponga que instala un termo eléctrico cuya resistencia calefactora mide `R = 18.4 Ω` conectado a una red monofásica de `V = 230 V` (`cos φ = 1.0`). Se requiere hallar intensidad, potencia disipada, carga en 10 minutos y protección adecuada.

1. **Cálculo de corriente por Ley de Ohm:**
   `I = 230 V / 18.4 Ω = 12.5 A`
2. **Potencia térmica entregada:**
   `P = 230 V × 12.5 A = 2,875 W` (`2.875 kW`).
3. **Carga desplazada en 10 minutos (`t = 600 s`):**
   `ΔQ = 12.5 A × 600 s = 7,500 C`.
4. **Criterio de dimensionamiento continuo:**
   Para cargas prolongadas se aplica un margen del `80 %` (`12.5 A / 0.80 = 15.625 A`). Debe tenderse cable de cobre de `2.5 mm²` (`12 AWG`) con interruptor de `16 A` o `20 A` según código local, evitando líneas de `1.5 mm²`.

## Referencia de intensidades, efectos fisiológicos y calibres

La siguiente tabla resume rangos característicos de corriente, su impacto fisiológico o térmico y las protecciones recomendadas:

| Intensidad | Contexto típico | Efecto fisiológico o térmico | Calibre / Protección habitual | Riesgo operativo |
| :--- | :--- | :--- | :--- | :--- |
| `1 mA` (`0.001 A`) | Sensores, señalización | Umbral de percepción cutánea leve | Pistas PCB / cable `24–26 AWG` | Despreciable; seguro al tacto |
| `30 mA` (`0.030 A`) | Fuga a tierra en equipos | Contracción muscular severa | Diferencial (RCD) de `30 mA` | Alto; límite de disparo residencial |
| `50–100 mA` | Descarga fase-tierra | Fibrilación ventricular letal | Diferencial (`6–30 mA`) | Crítico; paro cardíaco en segundos |
| `2.5 A` | Iluminación LED o cargador `100 W` | Calentamiento mínimo en cables | Cable `0.75 mm²` (`18 AWG`) / `3–5 A` | Bajo con aislamiento íntegro |
| `10 A` | Aparatos medianos a `230 V` | Disipación moderada en empalmes | Cable `1.5 mm²` (`14 AWG`) / `10–16 A` | Riesgo en regletas sobrecargadas |
| `16–20 A` | Cocina, lavado, climatización | Calentamiento en bornes flojos | Cable `2.5 mm²` (`12 AWG`) / `16–20 A` | Incendio por falso contacto |
| `32–40 A` | Inducción o cargador VE | Elevado efecto Joule (`I² × R`) | Cable `6.0–10.0 mm²` (`8–6 AWG`) / `32–40 A` | Crítico sin línea dedicada |

## Errores frecuentes y advertencias normativas

- **Confundir corriente nominal con corriente de arranque:** motores, compresores y bombas demandan durante fracciones de segundo entre `3` y `7 veces` su intensidad nominal. Dimensionar protecciones o inversores sin este margen provoca disparos inmediatos.
- **Ignorar la caída de tensión en tiradas largas:** calcular solo por ampacidad térmica falla en tramos superiores a `25–30 metros` o instalaciones solares de `12–24 V`, donde la resistencia del cable reduce el voltaje útil.
- **Confundir diferencial y magnetotérmico:** un magnetotérmico de `16 A` protege el cable frente a sobrecargas y cortocircuitos, pero nunca evita una electrocución de `50 mA`. La protección vital recae en diferenciales (RCD/GFCI) de `30 mA` o `5 mA`.
- **Medir corriente en paralelo con el multímetro:** la intensidad se mide siempre en **serie** o mediante pinza amperimétrica. Conectar el amperímetro directamente sobre un tomacorriente provoca un cortocircuito franco que funde el fusible interno y genera arco eléctrico.
