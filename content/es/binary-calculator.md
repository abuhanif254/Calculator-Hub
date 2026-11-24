---
title: "Calculadora Binaria: Operaciones y Conversión Numérica"
metaTitle: "Calculadora Binaria | Operaciones Base 2 y Conversor"
description: "Realiza sumas, restas, multiplicaciones, divisiones y operaciones lógicas bit a bit en base 2. Convierte números enteros y fraccionarios entre binario, decimal, octal y hexadecimal."
metaDescription: "Realiza sumas, restas, multiplicaciones, divisiones y operaciones bit a bit en base 2. Convierte binario a decimal, hexadecimal y octal al instante."
metaKeywords: "calculadora binaria, operaciones binarias, conversor binario a decimal, suma binaria, aritmetica binaria, sistema binario, complemento a dos, binario a hexadecimal"
faqs:
  - question: "¿Cómo funciona la suma binaria cuando coinciden dos o tres unos en una columna?"
    answer: "En base 2 solo existen los dígitos 0 y 1, por lo que 0+0=0 y 1+0=1 sin acarreo. Cuando se suman 1+1 el resultado es 10 en binario (se escribe 0 y se lleva un acarreo de 1 a la columna izquierda), y cuando además entra un acarreo previo (1+1+1) el resultado es 11 en binario (se escribe 1 y se acarrea 1)."
  - question: "¿Por qué los ordenadores utilizan el complemento a dos para representar números negativos?"
    answer: "El complemento a dos asigna al bit más significativo un peso negativo (-2^(w-1)), lo que garantiza una única representación del cero y permite que la unidad aritmético-lógica ejecute la resta como una suma ordinaria: A - B = A + (~B + 1), simplificando el diseño físico del procesador."
  - question: "¿Cómo se convierte rápidamente un número binario a hexadecimal o a octal?"
    answer: "Dado que 16 = 2^4 y 8 = 2^3, basta agrupar los bits desde la coma binaria hacia la izquierda en bloques de 4 bits para hexadecimal o de 3 bits para octal, completando con ceros a la izquierda si hace falta. En la parte fraccionaria los grupos se forman desde la coma hacia la derecha añadiendo ceros al final."
  - question: "¿Qué diferencia existe entre una operación aritmética y una operación lógica bit a bit?"
    answer: "Las operaciones aritméticas (+, -, *, /) tratan toda la cadena de bits como una magnitud numérica con acarreos entre posiciones. Las operaciones bit a bit (AND, OR, XOR, NOT) comparan de forma independiente cada posición de bit sin propagar acarreos, resultando esenciales en máscaras de red, permisos y control de registros de hardware."
  - question: "¿Por qué ciertas fracciones decimales sencillas como 0,1 no tienen representación binaria exacta?"
    answer: "Un número fraccionario solo tiene expansión finita en base 2 si su denominador irreducible es una potencia de 2 (como 1/2, 3/4 o 5/8). Como 0,1 = 1/10 contiene el factor primo 5 en el denominador, en binario produce una secuencia periódica infinita (0,0001100110011...), lo que exige cuidado al redondear cálculos monetarios."
---

Desde microcontroladores industriales hasta servidores y protocolos de red, toda la computación digital opera sobre el **sistema binario (base 2)**. Frente a las diez cifras del sistema decimal, utiliza únicamente dos dígitos —`0` y `1`, llamados **bits**— que representan los dos estados eléctricos estables en cada transistor.

Nuestra **Calculadora Binaria** reúne la aritmética en base 2 (`+`, `-`, `*`, `/`, resto `%`), el álgebra lógica **bit a bit** (`AND`, `OR`, `XOR`, `NOT`, `NAND`, `NOR`, `XNOR` y desplazamientos), la conversión inmediata entre **binario, decimal, octal y hexadecimal** (incluidas fracciones), registros de 8, 16, 32 y 64 bits con y sin signo y codificación ASCII.

## Ecuaciones Fundamentales del Sistema Binario

### 1. Expansión Posicional en Base 2 (Enteros y Fracciones)

Todo número binario con $m$ bits enteros a la izquierda de la coma y $k$ bits fraccionarios a la derecha equivale en base 10 a la suma de potencias de dos:

$$N_{10} = \sum_{i=-k}^{m-1} b_i \cdot 2^i = b_{m-1}2^{m-1} + \dots + b_0 2^0 + b_{-1}2^{-1} + \dots + b_{-k}2^{-k}$$

Donde **$b_i \in \{0, 1\}$** es cada bit, **$m$ y $k$** son las longitudes entera y fraccionaria, y **$2^i$** es el peso posicional (`1, 2, 4, 8...` a la izquierda; `0,5; 0,25; 0,125...` a la derecha).

### 2. Complemento a Dos y Desplazamientos de Bits

En un registro de $w$ bits, un entero **sin signo** abarca $[0,\; 2^w - 1]$. En aritmética **con signo** mediante **complemento a dos**, el bit más significativo ($b_{w-1}$) tiene peso negativo y la negación se obtiene invirtiendo todos los bits ($\sim x$) y sumando `1`:

$$N_{\text{signo}} = -b_{w-1}\cdot 2^{w-1} + \sum_{i=0}^{w-2} b_i \cdot 2^i, \qquad -x \equiv (\sim x) + 1 \pmod{2^w}$$

La suma sigue las reglas básicas de acarreo ($0+0=0$, $1+0=1$, $1+1=10_2$, $1+1+1=11_2$). Para enteros sin signo, desplazar $s$ bits equivale a multiplicar o dividir por $2^s$:

$$x \ll s = x \cdot 2^s \pmod{2^w}, \qquad x \gg s = \left\lfloor \frac{x}{2^s} \right\rfloor$$

## Ejemplo Práctico Paso a Paso: Fracción Binaria y Registro de 8 Bits

### Parte A: Convertir `11010,101₂` a Decimal y Hexadecimal

1. **Parte entera (`11010₂`):** $1\cdot 16 + 1\cdot 8 + 0\cdot 4 + 1\cdot 2 + 0\cdot 1 = \mathbf{26_{10}}$.
2. **Parte fraccionaria (`,101₂`):** $1\cdot 0{,}5 + 0\cdot 0{,}25 + 1\cdot 0{,}125 = \mathbf{0{,}625_{10}}$.
3. **Resultado en base 10 y base 16:** sumando ambos términos obtenemos **`26,625₁₀`**. Agrupando en bloques de 4 bits desde la coma (`0001 1010 , 1010₂`), cada bloque se traduce a `1`, `A` y `A`, resultando exactamente **`1A,A₁₆`**.

### Parte B: Suma, Resta en Complemento a Dos y Máscara `AND`

Sean dos registros de 8 bits: **$A = \text{0101 1010}_2$ (`90₁₀`, `0x5A`)** y **$B = \text{0010 1101}_2$ (`45₁₀`, `0x2D`)**.

1. **Suma ($A + B$):** columna a columna resulta **`1000 0111₂`**. Sin signo vale $128 + 4 + 2 + 1 = \mathbf{135_{10}}$ (`0x87`); con signo de 8 bits se produce desbordamiento y el valor se lee como $-128 + 7 = \mathbf{-121_{10}}$.
2. **Resta en complemento a dos ($A - B$):** invertimos $B$ (`~B = 1101 0010₂`), sumamos `1` para formar `-45` (`1101 0011₂`) y sumamos con $A$:
   $$\text{0101 1010}_2 + \text{1101 0011}_2 = (\mathbf{1})\;\text{0010 1101}_2$$
   Al descartar el acarreo del noveno bit queda **`0010 1101₂`**, exactamente **`45₁₀`** (`0x2D`).
3. **Máscara `AND` de 4 bits inferiores:** `0101 1010₂ AND 0000 1111₂ = 0000 1010₂` (`10₁₀`, `0x0A`), técnica habitual para extraer campos en tramas de red.

## Tabla de Referencia: Anchos de Registro y Rangos Numéricos

| Ancho | Dígitos Hex | Rango Sin Signo ($[0,\, 2^w - 1]$) | Rango Con Signo (Complemento a Dos) | Uso Habitual |
| :--- | :--- | :--- | :--- | :--- |
| **4 bits** | 1 | `0` a `15` | `-8` a `7` | Dígito hexadecimal único, código BCD |
| **8 bits** | 2 | `0` a `255` | `-128` a `127` | Texto ASCII, canales RGB, octetos IPv4 |
| **16 bits** | 4 | `0` a `65.535` | `-32.768` a `32.767` | Puertos TCP/UDP, audio PCM, sensores |
| **32 bits** | 8 | `0` a `4.294.967.295` | `-2.147.483.648` a `2.147.483.647` | Direcciones IPv4, contadores estándar |
| **64 bits** | 16 | `0` a `18.446.744.073.709.551.615` | `-9.223.372.036.854.775.808` a `9.223.372.036.854.775.807` | Arquitecturas modernas, marcas temporales |

En lógica bit a bit, `AND` devuelve `1` solo si ambos bits son `1` (limpiar o aislar bits); `OR` devuelve `1` si al menos uno es `1` (activar banderas); `XOR` devuelve `1` cuando difieren (conmutar estados); y `NOT` invierte cada bit.

## Errores Comunes al Trabajar en Base 2

* **Ignorar el desbordamiento en registros fijos:** superar $2^{w-1}-1$ en aritmética con signo (`90 + 45 = 135` en 8 bits) altera el bit de signo y produce resultados negativos sin aviso.
* **Leer un patrón de bits sin comprobar el signo:** `1111 1111₂` vale `255` sin signo, pero `-1` en complemento a dos de 8 bits.
* **Agrupar desde el extremo erróneo al pasar a octal o hexadecimal:** los bloques de 3 o 4 bits salen siempre desde la coma binaria hacia afuera; hacerlo al revés multiplica o divide el valor por potencias de dos.
* **Asumir exactitud finita para `0,1` o `0,2` en binario:** al generar secuencias periódicas infinitas en base 2, conviene usar enteros (céntimos) o tipos decimales exactos en aplicaciones financieras.
* **Confundir desplazamiento lógico y aritmético a la derecha:** en enteros negativos, insertar ceros a la izquierda rompe el signo; el desplazamiento aritmético replica el bit superior.
