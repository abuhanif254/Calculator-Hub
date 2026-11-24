---
title: "Calculadora de Vida Media"
metaTitle: "Calculadora de Vida Media | Decaimiento Radiactivo Exacto"
description: "Calcula la cantidad restante, cantidad inicial, periodo de semidesintegración, tiempo transcurrido y constante de decaimiento exponencial paso a paso."
metaDescription: "Calcula vida media, semidesintegración, masa restante, tiempo transcurrido y constante de decaimiento con isótopos preconfigurados paso a paso."
metaKeywords: "calculadora de vida media, periodo de semidesintegración, decaimiento radiactivo, constante de decaimiento, fórmula de vida media, datación carbono 14, desintegración exponencial, física nuclear"
faqs:
  - question: "¿Qué diferencia científica existe entre periodo de semidesintegración (semivida) y vida media promedio?"
    answer: "El periodo de semidesintegración o semivida (t₁/₂) es el tiempo necesario para que se desintegre exactamente la mitad de los núcleos inestables de una muestra. La vida media promedio (τ = 1/λ) representa la esperanza de vida estadística de un núcleo individual y es siempre un 44,27 % mayor que la semivida (τ = t₁/₂ / ln 2). Aunque en el uso cotidiano se dice vida media para referirse a t₁/₂, en física nuclear conviene distinguir ambos parámetros."
  - question: "¿Se agota completamente una sustancia radiactiva después de dos periodos de semidesintegración?"
    answer: "No. El decaimiento radiactivo sigue una ley exponencial, no lineal: tras una semivida queda el 50 % de la muestra; tras dos semividas queda la mitad de la mitad, es decir, el 25 %; tras tres semividas permanece el 12,5 % y tras diez semividas aún subsiste aproximadamente el 0,098 % del material original."
  - question: "¿La temperatura, la presión o el estado químico modifican la vida media de un radioisótopo?"
    answer: "En condiciones ordinarias, no. La desintegración radiactiva es un proceso cuántico gobernado por fuerzas nucleares internas que resultan insensibles a la temperatura, la presión, los campos eléctricos convencionales o los enlaces químicos. Por esa estabilidad inmutable los radioisótopos sirven como relojes precisos en geología y arqueología."
  - question: "¿Cómo se calcula el tiempo transcurrido en la datación por carbono-14?"
    answer: "Mientras un organismo vive mantiene una proporción de carbono-14 en equilibrio con la atmósfera. Al morir cesa el intercambio y ese isótopo comienza a desintegrarse con una semivida de 5.730 años. Midiendo la fracción remanente N(t)/N₀ en un espectrómetro, se despeja la antigüedad aplicando t = 5.730 · ln(N₀/N(t)) / ln(2) y se afina luego con curvas de calibración dendrocronológica."
  - question: "¿Por qué la calculadora convierte las unidades de tiempo a segundos del SI para obtener la constante de decaimiento?"
    answer: "En el Sistema Internacional de Unidades (SI), la actividad radiactiva se expresa en bequerelios (Bq = desintegraciones por segundo) y la constante de decaimiento λ en s⁻¹. Unificar internamente horas, días o años a segundos elimina errores de escala en el exponente t/t₁/₂ y garantiza resultados dimensionalmente coherentes."
---

La desintegración exponencial describe cómo disminuye a lo largo del tiempo una población de núcleos atómicos inestables, la concentración plasmática de un fármaco o la intensidad de un trazador radiactivo. Aunque en física y química rigurosas el tiempo necesario para que desaparezca la mitad de una muestra se denomina **periodo de semidesintegración** o **semivida** ($t_{1/2}$), en la práctica académica y profesional hispanohablante suele buscarse popularmente como **vida media**.

Esta **Calculadora de Vida Media** resuelve cualquiera de las cinco variables fundamentales del decaimiento exponencial: **cantidad restante** ($N(t)$), **cantidad inicial** ($N_0$), **semivida** ($t_{1/2}$), **tiempo transcurrido** ($t$) y **constante de decaimiento** ($\lambda$). Incorpora isótopos preconfigurados —como carbono-14, yodo-131, cesio-137, radón-222, plutonio-239 y uranio-238—, notación científica y conversión automática a unidades homogéneas del Sistema Internacional (SI).

## Ecuaciones Fundamentales del Decaimiento Exponencial

La cinética de desintegración radiactiva es un proceso de primer orden cuya tasa de pérdida instantánea resulta proporcional al número de núcleos intactos en cada momento ($dN/dt = -\lambda N$). Integrar esa ecuación diferencial produce las expresiones que utiliza la calculadora.

### 1. Ley de Desintegración, Constante $\lambda$ y Vida Media Promedio $\tau$

$$N(t) = N_0 \cdot \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}} = N_0 \cdot e^{-\lambda t}$$

$$\lambda = \frac{\ln(2)}{t_{1/2}} \approx \frac{0{,}693147}{t_{1/2}}, \qquad \tau = \frac{1}{\lambda} = \frac{t_{1/2}}{\ln(2)} \approx 1{,}442695 \cdot t_{1/2}$$

### 2. Despejes para Antigüedad ($t$), Masa Inicial ($N_0$) y Semivida ($t_{1/2}$)

Cuando se conocen las masas o actividades inicial y final, aplicar logaritmos naturales permite despejar directamente cualquiera de las incógnitas restantes:

$$N_0 = \frac{N(t)}{(0{,}5)^{t / t_{1/2}}}, \qquad t = t_{1/2} \cdot \frac{\ln\!\left(N_0 / N(t)\right)}{\ln(2)}, \qquad t_{1/2} = \frac{t \cdot \ln(2)}{\ln\!\left(N_0 / N(t)\right)}$$

Donde:

* **$N(t)$ y $N_0$**: Cantidad restante tras el tiempo $t$ y cantidad inicial (masa en `g` o `mg`, número de núcleos o actividad radiactiva en bequerelios `Bq`, donde $A(t) = \lambda N(t)$).
* **$t$**: Tiempo transcurrido, siempre expresado en la misma unidad temporal que $t_{1/2}$ (o convertido a segundos `s` del SI).
* **$t_{1/2}$**: Periodo de semidesintegración (semivida) propio de cada isótopo o sustancia.
* **$\lambda$**: Constante de decaimiento, es decir, probabilidad de desintegración por unidad de tiempo (`s⁻¹` en el SI).
* **$\tau$**: Vida media promedio estadística de un núcleo individual antes de desintegrarse.

## Ejemplos Prácticos Resueltos Paso a Paso

### Caso 1: Masa Restante de Yodo-131 en Medicina Nuclear

Una unidad hospitalaria recibe **$N_0 = 200\text{ mg}$** de yodo-131 ($^{131}\text{I}$), cuya semivida es **$t_{1/2} = 8{,}02\text{ días}$**. ¿Cuánta masa radiactiva sigue activa después de **$t = 20\text{ días}$**?

1. **Número de semividas transcurridas:** dividimos $20 / 8{,}02 = \mathbf{2{,}4938}$ semividas.
2. **Conversión al SI y constante $\lambda$:** multiplicando `8,02 días × 86.400 s/día` obtenemos $t_{1/2} = 692.928\text{ s}$. Por tanto, $\lambda = 0{,}693147 / 692.928 = \mathbf{1{,}000 \times 10^{-6}\text{ s}^{-1}}$ (`0,08643 días⁻¹`), y la vida media promedio vale $\tau = 8{,}02 / 0{,}693147 = \mathbf{11{,}57\text{ días}}$.
3. **Masa restante $N(20)$:** evaluamos $N(20) = 200 \cdot (0{,}5)^{2{,}4938} = 200 \cdot 0{,}17754 = \mathbf{35{,}51\text{ mg}}$.
4. **Fracción remanente y desintegrada:** permanece activo exactamente el **`17,75 %`** de la dosis original, mientras que el **`82,25 %`** (`164,49 mg`) ya se ha transformado en xenón-131 estable.

### Caso 2: Datación Arqueológica por Carbono-14 ($^{14}\text{C}$)

En un fragmento de madera antigua se mide que solo sobrevive el **`30 %`** de la proporción inicial de $^{14}\text{C}$ ($N(t)/N_0 = 0{,}30$), con $t_{1/2} = 5.730\text{ años}$:

1. **Relación logarítmica:** $\ln(N_0 / N(t)) = \ln(1 / 0{,}30) = \ln(3{,}3333) = \mathbf{1{,}20397}$.
2. **Antigüedad estimada:** $t = 5.730 \cdot (1{,}20397 / 0{,}69315) = 5.730 \cdot 1{,}73697 = \mathbf{9.952{,}8\text{ años}}$ ($\approx 9.953\text{ años}$ de edad radiocarbónica convencional).

## Tabla de Referencia de Radioisótopos Comunes (SI)

Los valores de $\lambda$ emplean el año juliano estándar del modelo (`365,25 días = 31.557.600 s`):

| Radioisótopo | Semivida ($t_{1/2}$) | Constante $\lambda$ ($\text{s}^{-1}$) | Vida Media Promedio ($\tau$) | Aplicación Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Tecnecio-99m ($^{99\text{m}}\text{Tc}$)** | 6,01 horas | $3{,}204 \times 10^{-5}$ | 8,67 horas | Gammagrafía diagnóstica hospitalaria |
| **Radón-222 ($^{222}\text{Rn}$)** | 3,8235 días | $2{,}098 \times 10^{-6}$ | 5,52 días | Control radiológico ambiental en sótanos |
| **Yodo-131 ($^{131}\text{I}$)** | 8,02 días | $1{,}000 \times 10^{-6}$ | 11,57 días | Terapia tiroidea en medicina nuclear |
| **Cesio-137 ($^{137}\text{Cs}$)** | 30,17 años | $7{,}280 \times 10^{-10}$ | 43,53 años | Gestión de residuos nucleares y radioterapia |
| **Carbono-14 ($^{14}\text{C}$)** | 5.730 años | $3{,}833 \times 10^{-12}$ | 8.267 años | Datación arqueológica de restos orgánicos |
| **Plutonio-239 ($^{239}\text{Pu}$)** | 24.110 años | $9{,}110 \times 10^{-13}$ | 34.783 años | Combustible nuclear y salvaguardas |
| **Uranio-238 ($^{238}\text{U}$)** | $4{,}468 \times 10^{9}$ años | $4{,}916 \times 10^{-18}$ | $6{,}446 \times 10^{9}$ años | Geocronología de rocas terrestres antiguas |

## Errores Comunes en Cálculos de Vida Media y Decaimiento

* **Intercambiar semivida ($t_{1/2}$) y vida media promedio ($\tau$):** introducir $\tau$ donde la fórmula exige $t_{1/2}$ induce un error sistemático del **44,27 %** en los tiempos calculados y desvía gravemente cualquier dosimetría clínica o edad geológica.
* **Mezclar escalas temporales en el exponente $t / t_{1/2}$:** dividir un tiempo transcurrido en horas entre una semivida expresada en días sin convertir primero ambas magnitudes a la misma unidad (idealmente segundos `s` del SI) invalida por completo el resultado.
* **Suponer un agotamiento lineal tras dos semividas:** creer que en $2\,t_{1/2}$ desaparece el `100 %` de la muestra ignora la naturaleza asintótica de la función exponencial; incluso después de 10 semividas persiste el `0,098 %` del material original.
* **Extrapolar el carbono-14 más allá de su techo instrumental:** por encima de `50.000 años` (8,73 semividas) solo queda un `0,236 %` del $^{14}\text{C}$ inicial, rozando el ruido de fondo; para muestras geológicas de millones de años se recurre a cadenas como uranio-plomo o potasio-argón. En farmacología, recuerda además que la semivida biológica sí varía según la función hepática y renal del paciente.
