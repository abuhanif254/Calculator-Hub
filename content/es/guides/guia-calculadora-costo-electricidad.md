---
title: "Costo de Electricidad: ¿Cuánto Cuesta Usar sus Electrodomésticos?"
description: "Guía técnica para calcular el consumo eléctrico en kWh y el gasto real de sus electrodomésticos: potencia nominal, ciclos de trabajo, factor de potencia y tarifas eléctricas."
category: "Math & Science"
readingTime: 8
lastUpdated: "2026-11-26"
relatedCalculator: "electricity-cost-calculator"
relatedType: "calculator"
faqs:
  - question: "¿Cuál es la diferencia entre kilovatio (kW) y kilovatio-hora (kWh) en la factura eléctrica?"
    answer: "El kilovatio (kW) mide la potencia instantánea que demanda un equipo, es decir, la velocidad a la que consume energía. El kilovatio-hora (kWh) mide la energía total acumulada en el tiempo: equivale a mantener una carga de 1,000 vatios funcionando de manera continua durante una hora completa, y es la unidad que facturan las compañías."
  - question: "¿Por qué un refrigerador de 150 W no consume energía a plena potencia las 24 horas?"
    answer: "Los electrodomésticos controlados por termostato —como refrigeradores, congeladores, termos eléctricos y aires acondicionados— operan mediante ciclos de trabajo intermitentes. Una vez alcanzada la temperatura consignada, el compresor o la resistencia se detiene o modula al mínimo en modelos inverter, reduciendo el ciclo efectivo típico al 30 %–50 % del tiempo conectado."
  - question: "¿La etiqueta técnica del electrodoméstico muestra siempre el consumo real?"
    answer: "No necesariamente. La placa trasera indica la potencia máxima de diseño para dimensionar fusibles y cables. Un ordenador portátil con cargador de 65 W o un horno microondas con grill rara vez operan al 100 % de su capacidad de forma sostenida; medir cargas variables con un vatímetro enchufable ofrece una lectura mucho más precisa."
  - question: "¿Cómo influye el consumo en espera (standby) en la factura anual?"
    answer: "Aunque un televisor, decodificador o microondas apagado con reloj digital consuma entre 1 W y 8 W, permanece conectado 8,760 horas al año. Cada vatio continuo equivale exactamente a 8.76 kWh anuales; sumar diez dispositivos con 3 W en reposo añade cerca de 263 kWh al año sin aportar utilidad activa."
  - question: "¿Basta multiplicar los kWh por el precio unitario para conocer el total de la factura?"
    answer: "El cálculo directo estima con exactitud el término variable de energía, pero las facturas reales suelen incorporar cargos fijos por potencia contratada, escalones de consumo por bloques, tarifas con discriminación horaria (punta, llano y valle) e impuestos locales. Para comparar tarifas variables, conviene aplicar el costo marginal por kWh del tramo correspondiente."
---

Para conocer el costo real de operar cualquier equipo eléctrico basta convertir su potencia activa en **kilovatios-hora (kWh)** y multiplicarla por el precio unitario de su tarifa. Mientras los vatios (`W`) expresan la demanda instantánea, los `kWh` cuantifican la energía acumulada en el tiempo, que es la magnitud medida por el contador de su vivienda.

Con nuestra [Calculadora de Costo de Electricidad](/es/calculadoras/calculadora-de-costo-de-electricidad) puede estimar el gasto diario, mensual y anual de cualquier electrodoméstico. Esta guía presenta las ecuaciones exactas —incluido el ciclo de trabajo y el factor de potencia—, un análisis comparativo resuelto, una tabla de referencias domésticas y las particularidades de la facturación eléctrica.

## Fórmulas fundamentales y parámetros del consumo

La estimación rigurosa de la energía consumida integra la potencia activa del aparato, sus horas diarias de conexión y el porcentaje efectivo de actividad:

```text
E_diaria (kWh) = [P (W) × t (h/día) × f_ciclo] / 1,000
Costo_diario = E_diaria (kWh) × Tarifa ($/kWh)
Costo_mensual = Costo_diario × 30
Costo_anual = Costo_diario × 365
```

- **`P` (potencia activa en vatios, `W`):** energía transformada en calor o trabajo por segundo. Si la etiqueta solo indica voltios (`V`) y amperios (`A`), la potencia activa monofásica es `P = V × I × cos(φ)`, donde `cos(φ)` es el **factor de potencia** (`1.0` en resistencias puras; `0.65`–`0.95` en motores y fuentes conmutadas).
- **`t` (horas por día):** tiempo diario en que el equipo permanece encendido.
- **`f_ciclo` (ciclo de trabajo, `0` a `1`):** fracción temporal en que el compresor o resistencia consume energía. Vale `1.0` en iluminación LED y alrededor de `0.35` en un refrigerador doméstico eficiente.
- **`1,000`:** factor de conversión de vatios-hora (`Wh`) a kilovatios-hora (`kWh`).

## Ejemplo comparativo paso a paso: carga continua frente a carga cíclica

Suponga una tarifa plana de `0.18 USD/kWh` (el procedimiento es idéntico en euros o moneda local). Comparemos dos aparatos para demostrar el impacto del ciclo de trabajo.

### Caso A: calefactor eléctrico portátil (carga continua)

Un calefactor resistivo de `1,500 W` funciona `6 horas` cada noche a máxima potencia (`f_ciclo = 1.0`):

1. **Energía diaria:**
   `E_diaria = (1,500 W × 6 h × 1.0) / 1,000 = 9.00 kWh/día`
2. **Costo diario y mensual (`30 días`):**
   `Costo_diario = 9.00 × 0.18 = 1.62 USD/día`
   `Costo_mensual = 1.62 × 30 = 48.60 USD/mes` (`270 kWh/mes`, o `194.40 USD` en cuatro meses de invierno).

### Caso B: refrigerador doméstico (carga cíclica)

Un refrigerador con compresor nominal de `150 W` permanece conectado `24 horas` diarias, pero su termostato activa el compresor solo un `35 %` del tiempo (`f_ciclo = 0.35`):

1. **Energía diaria:**
   `E_diaria = (150 W × 24 h × 0.35) / 1,000 = 1.26 kWh/día`
2. **Costo diario, mensual y anual:**
   `Costo_diario = 1.26 × 0.18 = 0.23 USD/día`
   `Costo_mensual (30 d) = 1.26 × 30 × 0.18 = 6.80 USD/mes` (`37.80 kWh/mes`)
   `Costo_anual (365 d) = 1.26 × 365 × 0.18 = 82.78 USD/año` (`459.90 kWh/año`).

Pese a estar enchufado todo el día, el refrigerador cuesta siete veces menos al mes que el calefactor usado seis horas.

## Consumo y gasto de referencia por electrodoméstico

La tabla compara siete equipos habituales a `0.18 $/kWh`, sobre un mes de `30 días` y un año de `365 días`:

| Equipo doméstico | Potencia (W) | Uso diario y ciclo | kWh/mes | Costo/mes ($) | Costo/año ($) |
| --- | --- | --- | --- | --- | --- |
| Bombilla LED estándar | 10 W | 5 h/día (100 %) | 1.50 | 0.27 | 3.29 |
| Ordenador portátil | 65 W | 8 h/día (70 % carga) | 10.92 | 1.97 | 23.91 |
| Refrigerador doméstico | 150 W | 24 h/día (35 % ciclo) | 37.80 | 6.80 | 82.78 |
| PC de escritorio + monitor | 350 W | 6 h/día (100 %) | 63.00 | 11.34 | 137.97 |
| Secadora de ropa | 3,000 W | 1 h/día (90 % ciclo) | 81.00 | 14.58 | 177.39 |
| Aire acondicionado split | 1,200 W | 8 h/día (65 % ciclo) | 187.20 | 33.70 | 409.97 |
| Calefactor eléctrico | 1,500 W | 6 h/día (100 %) | 270.00 | 48.60 | 591.30 |

*(El gasto anual de climatización supone operación constante; en uso estacional debe prorratearse por meses activos).*

## Errores habituales y matices de la facturación eléctrica

Al auditar el gasto energético de un hogar o taller, cuatro factores suelen desviar los cálculos preliminares:

- **Confundir potencia pico de placa con demanda media:** en ordenadores, televisores y aparatos *inverter*, el consumo oscila de forma continua según la carga gráfica, el brillo o la temperatura ambiente. Un medidor enchufable conectado durante `24 horas` captura el promedio real mejor que la potencia máxima impresa en la etiqueta trasera.
- **Omitir el consumo fantasma (*standby*):** dispositivos conectados en espera continua suman `8.76 kWh/año` por cada vatio constante; reunir `25 W` agregados en el hogar equivale a `219 kWh/año` (`39.42 USD/año` a `0.18 USD/kWh`).
- **Tarifas por bloques y discriminación horaria:** en tarifas escalonadas o por franjas horarias (punta, llano y valle), reducir un consumo intensivo ahorra al **precio marginal del tramo más alto** o de la hora activa, nunca al promedio ponderado del recibo anterior.
- **Cargos fijos e impuestos:** la fórmula `kWh × tarifa` refleja el término variable de energía consumida, pero no incluye cargos fijos por potencia contratada, alquiler de equipos de medida ni tributos locales o IVA, que deben añadirse al auditar la factura total.
