---
title: "Calculadora de Ahorros"
metaTitle: "Calculadora de Ahorros | Interés Compuesto e Inflación"
description: "Proyecta el crecimiento de tus ahorros con interés compuesto, aportaciones periódicas, planificador de metas y ajuste real por inflación en EUR o USD."
metaDescription: "Calcula el crecimiento de tus ahorros con interés compuesto, depósitos periódicos, TAE efectiva, ajuste por inflación y metas en EUR o USD."
metaKeywords: "calculadora de ahorros, interés compuesto, crecimiento de ahorros, TAE y TIN, depósitos recurrentes, ahorro con inflación, planificador de metas financieras"
faqs:
  - question: "¿Por qué la calculadora distingue entre saldo nominal y poder adquisitivo real?"
    answer: "El saldo nominal refleja la cifra exacta en euros o dólares que aparecerá en tu cuenta al final del plazo, pero la inflación reduce progresivamente lo que puedes comprar con ese dinero. El poder adquisitivo real descuenta el saldo final por la inflación anual acumulada, mostrándote a cuántos euros o dólares actuales equivale realmente tu ahorro futuro."
  - question: "¿Qué diferencia supone depositar al inicio del mes frente al final del mes?"
    answer: "Cuando realizas tu aportación al principio de cada mes (anualidad anticipada), cada depósito comienza a generar intereses un periodo completo antes que si lo ingresaras al cierre del mes. En un plan de 300 € mensuales durante 15 años al 4,80 % TIN, ese simple cambio de calendario suma 315,44 € adicionales sin aportar ni un céntimo más."
  - question: "¿Cómo influye la frecuencia de capitalización en la TAE de una cuenta de ahorro?"
    answer: "Cuanto mayor es la frecuencia con que los intereses se incorporan al capital —diaria o mensual frente a anual—, antes generan nuevos intereses sobre intereses. Un 4,80 % TIN con capitalización anual equivale exactamente al 4,80 % TAE, pero con capitalización mensual sube al 4,91 % TAE y con capitalización diaria alcanza el 4,92 % TAE."
  - question: "¿Cómo calculo cuánto debo ahorrar al mes para alcanzar una meta concreta?"
    answer: "El modo Planificador de Metas de la calculadora proyecta primero cuánto crecerá tu depósito inicial por sí solo al horizonte fijado, resta esa cifra de tu objetivo final y aplica la fórmula inversa de la anualidad compuesta para determinar la aportación mensual, quincenal o semanal exacta necesaria."
  - question: "¿Debo tener en cuenta los impuestos sobre los intereses al planificar ahorros a largo plazo?"
    answer: "Sí. En España los rendimientos del capital mobiliario tributan en la base del ahorro entre el 19 % y el 30 % según tramos, y en Latinoamérica rigen retenciones locales sobre intereses o ganancias financieras. Para obtener una proyección neta realista, introduce en la calculadora una tasa de rendimiento anual ya ajustada tras impuestos."
---

Construir patrimonio a largo plazo depende tanto de tu disciplina de ahorro como de la matemática del **interés compuesto**. A diez, quince o veinticinco años vista, los rendimientos reinvertidos acaban superando al capital aportado de tu bolsillo —siempre que la **TAE** real de tu cuenta o inversión bata a la **inflación**.

Esta **Calculadora de Ahorros** proyecta tu saldo en `EUR €` o `USD $` combinando depósito inicial, aportaciones periódicas (semanales, quincenales, mensuales, trimestrales o anuales), frecuencia de capitalización, calendario al inicio o cierre del mes, depósitos puntuales, escalado anual, ajuste por inflación y un **planificador inverso de metas**.

## Ecuaciones de Interés Compuesto, Inflación y Metas

### 1. TAE Efectiva y Valor Futuro con Depósitos Recurrentes

Dado un Tipo de Interés Nominal anual (**TIN**) $r$ en decimal y $m$ capitalizaciones anuales ($m = 1$ anual, $4$ trimestral, $12$ mensual o $365$ diaria), la **TAE** y la tasa efectiva mensual $i_m$ son:

$$\text{TAE} = \left(1 + \frac{r}{m}\right)^m - 1, \qquad i_m = \left(1 + \frac{r}{m}\right)^{m/12} - 1$$

Con depósito inicial $P_0$, aportación mensual equivalente $A$ y $n = 12t$ meses ($t$ años), el saldo final nominal $VF$ es:

$$VF = P_0 (1 + i_m)^n + A \cdot \frac{(1 + i_m)^n - 1}{i_m} \cdot (1 + \delta \cdot i_m)$$

Aquí $\delta = 0$ representa aportes al **final del mes** (anualidad ordinaria) y $\delta = 1$ al **inicio del mes** (anualidad anticipada).

### 2. Poder Adquisitivo Real y Cuota para una Meta

Descontando una inflación anual media $\pi$ se obtiene el poder adquisitivo real $VF_{\text{real}}$, y despejando la cuota $A_{\text{req}}$ se halla el ahorro mensual necesario para una meta $M$:

$$VF_{\text{real}} = \frac{VF}{(1 + \pi)^t}, \qquad A_{\text{req}} = \frac{\left(M - P_0 (1 + i_m)^n\right) \cdot i_m}{\left((1 + i_m)^n - 1\right)(1 + \delta \cdot i_m)}$$

Donde:

* **$P_0$ y $A$:** depósito inicial y aportación mensual equivalente.
* **$r$, $m$ e $i_m$:** TIN anual, capitalizaciones al año y tasa mensual efectiva.
* **$t$ y $n$:** horizonte en años y número total de meses ($n = 12t$).
* **$VF$ y $VF_{\text{real}}$:** saldo final nominal y poder de compra real con inflación $\pi$.
* **$M$ y $A_{\text{req}}$:** capital objetivo y aportación mensual requerida.

## Ejemplo Práctico Paso a Paso: 10.000 € + 300 €/Mes a 15 Años

Evaluemos un plan con **$P_0 = 10.000\text{ €}$**, **$A = 300\text{ €/mes}$** al cierre del mes ($\delta = 0$), **$\text{TIN} = 4{,}80\,\%$** con capitalización mensual ($m = 12$), **$t = 15\text{ años}$** ($n = 180$ meses) e inflación **$\pi = 2{,}50\,\%$**:

1. **Tasa mensual y TAE:** $i_m = 0{,}048 / 12 = \mathbf{0{,}004}$ (`0,40 %` mensual), equivalente a una **TAE** de $(1{,}004)^{12} - 1 = \mathbf{4{,}91\,\%}$.
2. **Factor compuesto:** $(1 + 0{,}004)^{180} = \mathbf{2{,}051485}$.
3. **Valor futuro desglosado:**
   $$VF_{\text{inicial}} = 10.000 \times 2{,}051485 = \mathbf{20.514{,}85\text{ €}}$$
   $$VF_{\text{aportes}} = 300 \times \frac{2{,}051485 - 1}{0{,}004} = \mathbf{78.861{,}36\text{ €}}$$
4. **Saldo nominal e intereses:** el capital alcanza **`99.376,21 €`**. Frente a los **`64.000,00 €`** aportados ($10.000 + 300 \times 180$), los intereses compuestos suman **`35.376,21 €`** (`35,6 %` del saldo).
5. **Poder adquisitivo real:** con $(1{,}025)^{15} = 1{,}448298$:
   $$VF_{\text{real}} = \frac{99.376{,}21}{1{,}448298} = \mathbf{68.615{,}85\text{ €}}$$

Para alcanzar exactamente **`100.000,00 €`** nominales en 15 años, el planificador inverso determina una aportación de **`302,37 €/mes`**.

## Tabla Comparativa: Rentabilidad, Capitalización y Plazo

Con `10.000 €` iniciales, `300 €/mes` e inflación del `2,50 %`, la tabla compara tasas, capitalización y horizonte:

| Escenario de Ahorro | TAE | Total Aportado | Intereses Ganados | Saldo Final Nominal | Poder Adquisitivo Real |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **2,40 % TIN mensual (15 años)** | 2,43 % | 64.000,00 € | 15.250,27 € | 79.250,27 € | 54.719,58 € |
| **4,80 % TIN anual, fin de mes (15 años)** | 4,80 % | 64.000,00 € | 34.396,11 € | 98.396,11 € | 67.939,12 € |
| **4,80 % TIN mensual, fin de mes (15 años)** | 4,91 % | 64.000,00 € | 35.376,21 € | 99.376,21 € | 68.615,85 € |
| **4,80 % TIN mensual, inicio de mes (15 años)** | 4,91 % | 64.000,00 € | 35.691,65 € | 99.691,65 € | 68.833,65 € |
| **6,00 % TIN mensual (15 años)** | 6,17 % | 64.000,00 € | 47.786,55 € | 111.786,55 € | 77.184,76 € |
| **4,80 % TIN mensual (25 años)** | 4,91 % | 100.000,00 € | 106.535,24 € | 206.535,24 € | 111.403,17 € |

Al `2,40 %` TIN frente a una inflación del `2,50 %`, el valor real (`54.719,58 €`) queda por debajo del dinero aportado (`64.000 €`). En contraste, alargar el horizonte de 15 a 25 años al `4,80 %` triplica los intereses (`106.535,24 €`), superando al total ingresado.

## Errores Habituales al Planificar tus Ahorros

* **Proyectar metas sin descontar inflación:** fijar objetivos en moneda nominal a 20 años infradota tu poder de compra futuro; aplica siempre entre un `2,5 %` y un `3,5 %` de inflación estimada.
* **Confundir TIN promocional con TAE real:** muchas cuentas remuneradas solo ofrecen su tipo máximo durante pocos meses o hasta un tope de saldo; utiliza la TAE media o activa la tasa variable.
* **Ignorar retenciones fiscales sobre intereses:** los impuestos liquidados cada ejercicio reducen el capital que sigue componiendo; introduce una rentabilidad neta tras impuestos.
* **Congelar la aportación mensual:** mantener la misma cifra durante una década pierde peso real; programa un aumento anual del `3 %` al `5 %` acorde con tus ingresos.
* **Romper la capitalización por falta de liquidez:** mantén un fondo de emergencia separado para evitar rescates anticipados con penalizaciones.
