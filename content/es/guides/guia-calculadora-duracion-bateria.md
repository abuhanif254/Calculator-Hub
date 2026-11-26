---
title: "Duración de la Batería: ¿Cuánto Tiempo Durará?"
description: "Aprenda a interpretar la capacidad de las baterías (mAh, Ah y Wh), aplicar la ley de Peukert y la profundidad de descarga (DoD), y calcular su autonomía real con precisión."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "battery-runtime-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Por qué dos baterías de 100 Ah con distinto voltaje no almacenan la misma energía?"
    answer: "Los amperios-hora (Ah) miden únicamente la carga eléctrica transferida, no la energía total. Para comparar baterías de distinto voltaje debe multiplicarse la capacidad por la tensión nominal (Wh = Ah × V). Una batería de 24 V y 100 Ah almacena 2,400 Wh, exactamente el doble de energía que una de 12 V y 100 Ah (1,200 Wh)."
  - question: "¿A qué se debe que una batería dure menos cuando se descarga con corrientes muy altas?"
    answer: "Según la ley de Peukert, las reacciones electroquímicas internas y la resistencia interna generan caídas de tensión y calor que reducen la capacidad efectiva conforme aumenta la corriente de descarga. Este efecto es muy pronunciado en baterías de plomo-ácido (exponente k entre 1.15 y 1.30) y casi despreciable en baterías de litio LiFePO₄ (k cercano a 1.03)."
  - question: "¿Qué porcentaje de profundidad de descarga (DoD) conviene respetar para alargar la vida útil?"
    answer: "En baterías de plomo-ácido (inundadas, AGM o gel) conviene limitar la descarga diaria al 50 % de DoD para evitar la sulfatación irreversible de las placas. En cambio, las celdas de fosfato de hierro y litio (LiFePO₄) toleran descargas habituales del 80 % al 90 % de DoD manteniendo varios miles de ciclos."
  - question: "¿Cómo afecta un inversor de corriente alterna a los cálculos de autonomía?"
    answer: "Un inversor convierte corriente continua de bajo voltaje en corriente alterna de 120 V o 230 V con una eficiencia típica del 85 % al 92 %, además de presentar un autoconsumo continuo en reposo. Por ello, para calcular la duración real debe dividirse la potencia de la carga alterna entre la eficiencia del inversor y sumar dicho autoconsumo."
  - question: "¿Cómo influye la temperatura ambiente fría en la capacidad disponible de una batería?"
    answer: "El frío ralentiza la difusión iónica en el electrolito y eleva la resistencia interna. A 0 °C, una batería de plomo-ácido puede perder entre un 20 % y un 30 % de su capacidad utilizable temporalmente. En baterías de litio la pérdida es menor en descarga, pero está estrictamente prohibido cargarlas por debajo de 0 °C salvo que incluyan calefacción interna o electrolito especial."
---

La autonomía real de una batería rara vez coincide con una división simple entre la capacidad impresa y el consumo del dispositivo. Aunque un acumulador indique `100 Ah` o `20,000 mAh`, su tiempo operativo depende de cuatro variables simultáneas: el **voltaje nominal**, la **profundidad de descarga segura (`DoD`)**, la **eficiencia de conversión** del inversor o regulador y la pérdida ante corrientes altas descrita por la **ley de Peukert**.

Para estimar con exactitud cuánto durará un dron, una autocaravana, un respaldo solar o una batería portátil externa sin dañar las celdas, conviene convertir siempre la capacidad a **vatios-hora (`Wh`)** útiles. Nuestra [Calculadora de Duración de Batería](/es/calculadoras/calculadora-de-autonomia-de-bateria) integra estos factores químicos y eléctricos para ofrecer un cálculo realista en horas y minutos.

## Fundamentos de capacidad y ecuaciones de autonomía

La capacidad se expresa en **miliamperios-hora (`mAh`)** para electrónica ligera o en **amperios-hora (`Ah`)** para bancos estacionarios. Como las cargas consumen potencia en **vatios (`W`)**, la energía utilizable se calcula así:

```text
C (Ah) = C (mAh) / 1,000
E_nominal (Wh) = C (Ah) × V_nominal (V)
E_útil (Wh) = E_nominal × DoD × η_sistema
t (horas) = E_útil (Wh) / P_carga (W)
```

- **`C`:** capacidad nominal medida normalmente a una descarga lenta de `20 horas` (`C₂₀`) en plomo-ácido o de `5 horas` (`C₅`) en litio.
- **`V_nominal`:** voltaje de referencia (`3.7 V` en ion-litio NMC, `12.8 V` en `LiFePO₄`, `12 V` en plomo-ácido, `24 V` o `48 V` en bancos grandes).
- **`DoD` (Profundidad de Descarga):** fracción segura aprovechable (`0.50` en plomo-ácido; `0.80` a `0.90` en `LiFePO₄`).
- **`η_sistema`:** eficiencia de cableado e inversor (`0.85` a `0.92` en `CA`; `0.95` a `0.98` en `CC` directa).

### Corrección por la ley de Peukert

Cuando la corriente de descarga (`I`) excede la tasa de referencia (`C / H`, con `H = 20 h` habitual), la capacidad efectiva cae según:

```text
t_Peukert = H × [ C / (I × H) ]^k
```

El exponente **`k`** vale `1.00` en una batería ideal, `1.02–1.05` en `LiFePO₄` y `1.15–1.30` en plomo-ácido AGM o gel. En plomo-ácido, el valor `t_Peukert` (hasta descarga total) se multiplica luego por la `DoD` segura (`0.50`).

## Ejemplo práctico paso a paso: LiFePO₄ frente a AGM

Suponga que alimenta un equipo de `CA` de **`180 W`** mediante un inversor con **`88 %` (`0.88`) de eficiencia**, más un enrutador de `CC` directa de **`12 W`**. Compararemos dos bancos de **`200 Ah`**: **litio `LiFePO₄` (`12.8 V`, `DoD = 80 %`)** y **plomo-ácido AGM (`12.0 V`, `DoD = 50 %`, `k = 1.20` a `C₂₀`)**.

1. **Potencia total demandada a la batería (`P_bat`):**
   ```text
   P_bat = (180 W / 0.88) + 12 W = 204.55 + 12 = 216.55 W
   ```
2. **Autonomía en el banco `LiFePO₄` (`12.8 V`, `200 Ah`):**
   ```text
   E_útil = 200 Ah × 12.8 V × 0.80 = 2,048 Wh
   I_descarga = 216.55 W / 12.8 V = 16.92 A
   t_LiFePO4 = 2,048 Wh / 216.55 W = 9.46 horas (9 h 27 min)
   ```
3. **Autonomía en el banco AGM (`12.0 V`, `200 Ah`, `k = 1.20`):**
   ```text
   I_descarga = 216.55 W / 12.0 V = 18.05 A
   t_Peukert(100 %) = 20 × [ 200 / (18.05 × 20) ]^1.20 = 20 × 0.4923 = 9.85 h
   t_AGM_seguro (50 % DoD) = 9.85 × 0.50 = 4.92 horas (4 h 55 min)
   ```

Aunque ambos indican `200 Ah`, el banco `LiFePO₄` brinda casi el **doble de autonomía segura (`9 h 27 min` frente a `4 h 55 min`)**.

## Comparativa de tecnologías de baterías

La tabla resume los parámetros operativos clave que determinan la duración útil y la vida cíclica:

| Química | Voltaje nominal por celda | `DoD` recomendada | Exponente `k` | Ciclos de vida | Aplicación habitual |
| --- | --- | --- | --- | --- | --- |
| `LiFePO₄` (LFP) | `3.2 V` (`12.8 V` / 4S) | `80 % – 90 %` | `1.02 – 1.05` | `3,000 – 6,000` | Energía solar, autocaravanas y respaldo |
| Ion-Litio (`NMC` / `NCA`) | `3.6 V – 3.7 V` | `80 %` | `1.03 – 1.06` | `800 – 1,500` | Portátiles, drones y movilidad eléctrica |
| Plomo-Ácido Inundada | `2.0 V` (`12.0 V` / 6S) | `50 %` | `1.15 – 1.25` | `400 – 700` | Sistemas ventilados y tracción industrial |
| Plomo-Ácido `AGM` | `2.0 V` (`12.0 V` / 6S) | `50 %` | `1.15 – 1.25` | `500 – 800` | Respaldo SAI (UPS) y uso sin mantenimiento |
| Gel de Ciclo Profundo | `2.0 V` (`12.0 V` / 6S) | `50 % – 60 %` | `1.18 – 1.30` | `700 – 1,100` | Descargas lentas en telecomunicaciones y náutica |
| `NiMH` recargable | `1.2 V` | `80 % – 90 %` | `1.05 – 1.12` | `500 – 1,000` | Instrumentación portátil y celdas AA/AAA |

## Errores frecuentes, seguridad y normativa

Los errores más comunes al estimar autonomías provienen de tres omisiones:

- **Ignorar el autoconsumo del inversor:** un inversor de `2,000 W` encendido todo el día consume `15–30 W` en vacío (`360–720 Wh/día`), agotando bancos pequeños sin cargas activas.
- **Usar baterías de arranque en ciclo profundo:** sus placas finas se sulfatan rápidamente si se descargan al `50 %` de manera repetida.
- **Subestimar la caída de tensión:** cables delgados provocan cortes prematuros por bajo voltaje (`10.5 V` en `12 V`) antes de consumir la energía disponible.

Por seguridad, toda batería de litio debe integrar un **Sistema de Gestión (`BMS`)** con protección frente a subtensión, sobrecorriente y carga bajo `0 °C` (que provoca dendritas metálicas). Para transporte aéreo comercial (normativa IATA), las baterías portátiles de litio no pueden exceder `100 Wh` por unidad sin permiso expreso de la aerolínea (`160 Wh` como límite absoluto).
