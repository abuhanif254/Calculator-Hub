---
title: "Conversor de MB a GB: Fórmulas SI e IEC, Tabla y Ejemplos"
description: "Convierta megabytes (MB) a gigabytes (GB) con exactitud decimal SI (÷ 1.000) o binaria IEC (÷ 1.024). Fórmulas oficiales, tabla rápida y ejemplos prácticos."
faqs:
  - question: "¿Cuántos megabytes (MB) hay exactamente en un gigabyte (GB)?"
    answer: "Según el Sistema Internacional de Unidades (SI) y las normas del NIST, 1 gigabyte equivale exactamente a 1.000 megabytes. En el estándar binario de la IEC, 1 gibibyte (GiB) equivale a 1.024 mebibytes (MiB)."
  - question: "¿Por qué un disco duro de 500 GB muestra unos 465 GB en Windows?"
    answer: "Los fabricantes expresan la capacidad en gigabytes decimales (500.000 millones de bytes). Sin embargo, sistemas operativos como Windows calculan el espacio en gibibytes binarios dividiendo entre 1.073.741.824 bytes, lo que arroja aproximadamente 465,66 GiB aunque siga mostrando las siglas GB."
  - question: "¿Qué estándar utilizan las operadoras de telefonía para los planes de datos?"
    answer: "Las operadoras móviles y los proveedores de telecomunicaciones emplean el sistema decimal SI (1 GB = 1.000 MB). Por ello, un plan de 10 GB ofrece 10.000 MB de tráfico de datos, no 10.240 MB."
  - question: "¿Cuál es la diferencia técnica entre MB y MiB?"
    answer: "El megabyte (MB) corresponde a una potencia de diez (10^6 = 1.000.000 de bytes), mientras que el mebibyte (MiB) representa una potencia de dos (2^20 = 1.048.576 bytes). La diferencia entre ambos es del 4,86 %, un margen que crece en unidades mayores como GB y GiB."
  - question: "¿Cuándo conviene dividir entre 1.000 y cuándo entre 1.024 al convertir MB a GB?"
    answer: "Divida entre 1.000 para capacidades de discos SSD, tarjetas SD, planes de datos móviles y velocidades de red. Divida entre 1.024 cuando trabaje con módulos de memoria RAM, máquinas virtuales o tamaños de archivos reportados por sistemas binarios."
---

Para convertir megabytes (MB) a gigabytes (GB) bajo el Sistema Internacional de Unidades (SI), divida los megabytes entre `1.000` (`GB = MB ÷ 1.000`). Así, `2.500 MB` equivalen exactamente a `2,5 GB`, una regla decimal empleada en almacenamiento comercial y telecomunicaciones.

En entornos binarios —como memoria RAM y sistemas operativos—, se aplica el estándar de la Comisión Electrotécnica Internacional (IEC), cuya constante exacta es `1.024` (`GiB = MiB ÷ 1.024`). Distinguir ambos criterios evita errores al dimensionar servidores o verificar discos.

## Fórmula exacta de conversión y normas internacionales

En 1998, la IEC publicó la enmienda que originó la norma **ISO/IEC 80000-13**, adoptada también por el **NIST**. Esta normativa reservó los prefijos decimales (`mega-` y `giga-`) para potencias de 10 y creó los prefijos binarios (`mebi-` y `gibi-`) para potencias de 2.

Las fórmulas oficiales son:

- **Sistema decimal (SI / NIST):** `GB = MB ÷ 1.000`, donde `1 MB = 10⁶ bytes` y `1 GB = 10⁹ bytes`.
- **Sistema binario (IEC / ISO 80000-13):** `GiB = MiB ÷ 1.024`, donde `1 MiB = 2²⁰ bytes (1.048.576 bytes)` y `1 GiB = 2³⁰ bytes (1.073.741.824 bytes)`.

En términos absolutos, `1 GiB` equivale aproximadamente a `1,0737 GB`, una diferencia del `7,37 %`.

## Ejemplos prácticos paso a paso

Los siguientes casos ilustran cómo aplicar la constante adecuada según el contexto técnico:

### 1. Control de consumo en un plan de datos móviles (sistema decimal SI)

Suponga que su teléfono inteligente registra un consumo acumulado de `4.750 MB` en actualizaciones y descarga de mapas dentro de una tarifa mensual de `15 GB`. Como las operadoras facturan en base decimal:

1. Aplique la fórmula SI: `4.750 MB ÷ 1.000 = 4,75 GB`.
2. Calcule el saldo disponible: `15 GB - 4,75 GB = 10,25 GB` (equivalentes a `10.250 MB`).

### 2. Asignación de memoria RAM en un servidor virtual (sistema binario IEC)

Un panel de administración asigna `16.384 MiB` de memoria RAM a una máquina virtual (valor frecuentemente rotulado como «16.384 MB» en utilidades antiguas). Si una base de datos reserva `6.144 MiB` para caché:

1. Convierta la memoria total: `16.384 MiB ÷ 1.024 = 16 GiB`.
2. Convierta la reserva de la base de datos: `6.144 MiB ÷ 1.024 = 6 GiB`.
3. Determine la memoria restante para el sistema operativo: `16 GiB - 6 GiB = 10 GiB` (`10.240 MiB`).

### 3. Almacenamiento de vídeo en una unidad SSD (conversión cruzada SI a IEC)

Un archivo maestro de vídeo 4K tiene un tamaño exacto de `128.000 MB` según la notación decimal (`128.000 ÷ 1.000 = 128 GB`). Si desea verificar cuánto espacio ocupará en un sistema operativo que calcula en base binaria:

1. Exprese el volumen en bytes decimales: `128.000 × 1.000.000 = 128.000.000.000 bytes`.
2. Divida entre el tamaño binario de un gibibyte (`1.073.741.824 bytes`): `128.000.000.000 ÷ 1.073.741.824 = 119,21 GiB`.

## Tabla de referencia rápida de MB a GB

La siguiente tabla compara los valores más consultados tanto en notación decimal SI como en notación binaria IEC (asumiendo la misma cifra inicial en MiB):

| Megabytes / Mebibytes | Gigabytes (SI: ÷ 1.000) | Gibibytes (IEC: ÷ 1.024) | Contexto habitual |
| :--- | :--- | :--- | :--- |
| 100 | 0,1 GB | 0,0977 GiB | Documento técnico ilustrado o álbum comprimido |
| 256 | 0,256 GB | 0,25 GiB | Imagen de arranque o caché de navegador |
| 500 | 0,5 GB | 0,4883 GiB | Paquete de actualización menor en dispositivos móviles |
| 1.000 | 1 GB | 0,9766 GiB | Equivalencia exacta de 1 gigabyte decimal |
| 1.024 | 1,024 GB | 1 GiB | Equivalencia exacta de 1 gibibyte binario |
| 2.048 | 2,048 GB | 2 GiB | Partición de intercambio o módulo básico de RAM |
| 4.096 | 4,096 GB | 4 GiB | Límite máximo de archivo en sistemas FAT32 |
| 8.192 | 8,192 GB | 8 GiB | Memoria RAM estándar para ofimática y desarrollo |
| 10.000 | 10 GB | 9,7656 GiB | Cuota básica de almacenamiento en la nube |
| 100.000 | 100 GB | 97,6563 GiB | Copia de seguridad completa o biblioteca multimedia |

## Casos de uso profesionales y errores frecuentes

En ingeniería de sistemas, almacenamiento y telecomunicaciones, elegir el divisor incorrecto produce desviaciones que superan el `7 %` en la escala de gigabytes y alcanzan casi el `10 %` al llegar a terabytes (`TB` frente a `TiB`).

El error más extendido ocurre al evaluar unidades **SSD**, discos externos o tarjetas de memoria. Un fabricante comercializa una unidad de `1 TB` (`1.000 GB`), es decir, `1.000.000 MB`. Al conectarla a un equipo con Windows, el sistema divide los `10¹² bytes` entre `2³⁰` y reporta `931,32 GiB` bajo la etiqueta «GB». Muchos usuarios interpretan erróneamente esa diferencia de `68,68 GB` como un defecto de fábrica o espacio oculto, cuando en realidad obedece al cambio de base aritmética; en cambio, macOS y la mayoría de distribuciones Linux modernas muestran `1.000 GB` en base decimal para mantener coherencia con el etiquetado físico.

Otro fallo habitual consiste en mezclar **megabits (Mb)** con **megabytes (MB)** al estimar tiempos de descarga. Una conexión de fibra de `1.000 Mbps` transfiere bits, no bytes (`1 byte = 8 bits`), por lo que su tasa máxima teórica equivale a `125 MB/s` (`0,125 GB/s`). Finalmente, conviene recordar que la memoria RAM sigue utilizando exclusivamente potencias de dos (`16 GiB = 16.384 MiB`), aunque en el mercado minorista continúe anunciándose comercialmente con la abreviatura tradicional `GB`.
