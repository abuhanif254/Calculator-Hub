---
title: "Conversor de kWh a Vatios (W): Fórmula, Auditoría Eléctrica y Tabla"
description: "Convierta kilovatios hora (kWh) a vatios (W) según las horas de consumo. Fórmula exacta para auditorías eléctricas, factura de luz, baterías y energía solar."
faqs:
  - question: "¿Cuántos vatios equivale exactamente 1 kilovatio hora (kWh)?"
    answer: "Depende de las horas de funcionamiento, ya que el kWh mide energía y el vatio mide potencia. Si 1 kWh se consume en exactamente 1 hora, la potencia media es de 1.000 vatios; si se consume en 10 horas, equivale a 100 vatios."
  - question: "¿Se puede convertir kWh a vatios sin conocer el tiempo?"
    answer: "No es posible obtener una potencia en vatios sin especificar la duración en horas. Los kWh representan energía acumulada (potencia multiplicada por tiempo), por lo que el tiempo es una variable matemática imprescindible."
  - question: "¿Cuál es la diferencia entre kW y kWh en una factura de electricidad?"
    answer: "El kilovatio (kW) indica la potencia máxima instantánea o contratada que soporta su instalación en un momento dado, mientras que el kilovatio hora (kWh) mide el volumen total de energía consumida durante todo el periodo de facturación."
  - question: "¿Cómo estimar los vatios de un frigorífico a partir de su consumo diario en kWh?"
    answer: "Divida los kWh diarios multiplicados por 1.000 entre 24 horas para obtener la potencia media continua. No obstante, como el compresor trabaja de forma intermitente, su potencia instantánea mientras está encendido será entre dos y tres veces mayor que ese promedio."
  - question: "¿Cómo se calculan los kWh de una batería a partir de su voltaje y amperios hora?"
    answer: "Multiplique el voltaje nominal (V) por la capacidad en amperios hora (Ah) y divida el resultado entre 1.000. Por ejemplo, una batería de 48 V y 100 Ah almacena 4,8 kWh de energía bruta."
---

Para convertir kilovatios hora (`kWh`) a vatios (`W`), multiplique la energía en kilovatios hora por `1.000` (para pasar a vatios hora) y divida el resultado entre el número de horas de funcionamiento (`t`): `P (W) = [E (kWh) × 1.000] ÷ Horas`. Con esta relación exacta, consumir `3 kWh` durante un intervalo continuo de `2 horas` equivale a una potencia media de `1.500 W`.

Dado que el kilovatio hora cuantifica la **energía acumulada** y el vatio mide la **potencia instantánea** (el ritmo al que se consume o genera esa energía), el tiempo actúa como puente obligatorio entre ambas magnitudes. Esta conversión es clave para auditar facturas eléctricas, estimar el consumo fantasma en reposo y calcular la autonomía real de baterías solares.

## Fórmula exacta y definición en el Sistema Internacional

De acuerdo con el **Sistema Internacional de Unidades (SI)** y las normas **ISO 80000-5** e **IEC 60027**, el vatio (`W`) equivale a un julio de energía transferido por segundo (`1 W = 1 J/s`), mientras que el kilovatio hora (`kWh`) representa la energía total desarrollada por una potencia de `1.000 W` mantenida durante `3.600 segundos` (`1 kWh = 3,6 megajulios`).

Las fórmulas exactas para pasar de energía a potencia media y viceversa son:

- **De kilovatios hora a vatios:** `P (W) = [E (kWh) × 1.000] ÷ t (horas)`
- **De vatios a kilovatios hora:** `E (kWh) = [P (W) × t (horas)] ÷ 1.000`

Cuando el periodo temporal corresponde exactamente a `1 hora`, el factor de conversión se simplifica a `1 kWh ÷ 1 h = 1.000 W`. Para periodos de facturación mensual o diario, basta convertir los días en horas totales (`horas = días × 24`).

## Ejemplos prácticos paso a paso

A continuación se resuelven tres escenarios habituales en auditorías energéticas e instalaciones fotovoltaicas:

### 1. Auditoría de consumo continuo en una factura mensual

Suponga que un medidor inteligente registra un consumo de `108 kWh` en `30 días` para un pequeño servidor doméstico o equipo de climatización de respaldo que permanece encendido las `24 horas`:

1. Calcule el total de horas del periodo: `30 días × 24 horas/día = 720 horas`.
2. Convierta los kilovatios hora a vatios hora: `108 kWh × 1.000 = 108.000 Wh`.
3. Divida entre las horas totales: `P = 108.000 ÷ 720 = 150 W` de potencia media continua.

### 2. Autonomía de descarga en una batería solar residencial

Un banco de baterías de litio dispone de `5,12 kWh` de energía utilizable y debe sostener cargas esenciales durante un corte nocturno de `8 horas`:

1. Convierta la capacidad energética a vatios hora: `5,12 × 1.000 = 5.120 Wh`.
2. Divida entre la duración requerida: `P = 5.120 ÷ 8 = 640 W` de potencia constante disponible sin agotar la reserva antes del amanecer.

### 3. Potencia media frente a potencia activa en un frigorífico

La etiqueta energética de un frigorífico indica un consumo diario de `1,2 kWh` cada `24 horas`:

1. Potencia media sobre las 24 horas: `(1,2 × 1.000) ÷ 24 = 50 W`.
2. Si el compresor solo funciona el `35 %` del día (`24 × 0,35 = 8,4 horas` efectivas), la potencia real mientras el motor está activo es `1.200 ÷ 8,4 = 142,86 W`, un dato crucial al dimensionar un inversor solar capaz de soportar su arranque.

## Tabla de referencia rápida de kWh a Vatios

La siguiente tabla muestra la potencia media en vatios resultante según distintas combinaciones reales de energía (`kWh`) y duración de uso (`horas`):

| Energía (kWh) | Tiempo de uso (h) | Potencia media (W) | Escenario práctico equivalente |
| :--- | :--- | :--- | :--- |
| 0,1 kWh | 1 h | 100 W | Televisor LED mediano o iluminación básica |
| 0,5 kWh | 2 h | 250 W | Ordenador de sobremesa en trabajo de oficina |
| 1 kWh | 1 h | 1.000 W | Microondas o tostadora a plena potencia |
| 1,5 kWh | 24 h | 62,5 W | Promedio diario de un frigorífico doméstico |
| 2,4 kWh | 8 h | 300 W | Alumbrado nocturno de un local comercial pequeño |
| 3,6 kWh | 3 h | 1.200 W | Ciclo largo de lavadora con agua caliente |
| 5 kWh | 10 h | 500 W | Producción media diaria de un módulo solar |
| 12 kWh | 24 h | 500 W | Consumo eléctrico diario de una vivienda pequeña |
| 30 kWh | 720 h (30 días) | 41,67 W | Consumo mensual continuo de dispositivos en espera |

## Casos de uso en energía solar, facturación y errores comunes

En auditorías energéticas domésticas e industriales, convertir los `kWh` facturados a potencia media (`W`) permite detectar consumos ocultos o cargas en reposo que pasan desapercibidas en el recibo mensual. Si una vivienda deshabitada registra `72 kWh` en `30 días` (`720 horas`), significa que mantiene una carga fantasma permanente de `100 W` encendida día y noche.

El error conceptual más extendido consiste en intentar igualar `kWh` y `W` directamente como si midieran lo mismo —una confusión habitual al leer expresiones coloquiales como «consume 2.000 kWh por hora»—. También es frecuente olvidar el rendimiento de conversión en instalaciones solares: si necesita entregar `1.000 W` en corriente alterna durante `4 horas` (`4 kWh` útiles) a través de un inversor con una eficiencia del `90 %`, la batería deberá suministrar `4 ÷ 0,90 = 4,44 kWh`.

Por último, al utilizar datos de `kWh` diarios para elegir un generador o inversor, nunca dimensione el equipo basándose únicamente en la potencia media de 24 horas. Cargas cíclicas como bombas de presión, microondas o secadores concentran varios kilovatios hora en pocos minutos, exigiendo una potencia instantánea (`W`) muy superior al promedio diario.
