---
metaTitle: "Generador y Verificador HMAC Online | SHA256, SHA512, MD5"
metaDescription: "Genere y verifique códigos de autenticación de mensajes basados en hash (HMAC) criptográficamente seguros. Admite SHA256, SHA512, SHA1 y MD5 para API y webhooks."
metaKeywords: "generador hmac, hmac sha256, código de autenticación de mensajes, firma api, verificador de webhook, hmac sha512, firma hmac md5, herramienta hmac online"
title: "Generador HMAC"
shortDescription: "Genere y verifique códigos HMAC criptográficamente seguros en el lado del cliente para claves API, firmas de webhooks y validación de datos."
faqs:
  - question: "¿Qué es un HMAC?"
    answer: "HMAC significa Código de Autenticación de Mensajes basado en Hash. Es una firma criptográfica que combina una clave secreta y una función hash (como SHA-256) para verificar tanto la integridad como la autenticidad de los datos."
  - question: "¿Se envían mis claves secretas a su servidor?"
    answer: "No, en absoluto. Todos los cálculos se realizan completamente dentro del entorno de prueba local de su navegador utilizando JavaScript (Web Crypto API). Sus mensajes y claves nunca salen de su dispositivo."
  - question: "¿Por qué usar HMAC en lugar de un hash normal como SHA-256?"
    answer: "Los hashes estándar son vulnerables a 'ataques de extensión de longitud', donde un atacante puede agregar datos y generar un hash válido. El diseño anidado de HMAC lo hace inmune a estos ataques."
  - question: "¿Qué algoritmo HMAC debo elegir?"
    answer: "Para la mayoría de las aplicaciones modernas, HMAC-SHA256 es la recomendación estándar. Ofrece un excelente equilibrio entre velocidad y seguridad. Use HMAC-SHA512 para máxima seguridad."
  - question: "¿HMAC es lo mismo que encriptación?"
    answer: "No. La encriptación es una función bidireccional que oculta datos. HMAC es una función unidireccional que se usa para verificar que los datos no se han alterado y provienen de un remitente confiable."
features:
  - "Generación de HMAC en el lado del cliente mediante Web Crypto API"
  - "Soporte para múltiples algoritmos: HMAC-SHA256, HMAC-SHA512, HMAC-SHA1 y HMAC-MD5"
  - "Modos de entrada duales: mensaje de texto o firma de archivo local"
  - "Generación de HMAC en tiempo real con actualizaciones instantáneas"
  - "Motor de verificación de suma de comprobación integrado"
  - "Contador automático de caracteres e indicadores de tamaño"
  - "Generador de claves secretas seguras y aleatorias (CSPRNG)"
  - "Historial de sesión almacenado localmente en el navegador"
useCases:
  - "Generación de firmas HMAC auténticas para pruebas de API"
  - "Simulación y verificación de firmas de webhooks (Stripe, GitHub)"
  - "Cálculo de sumas de comprobación de archivos locales con claves compartidas"
  - "Generación de firmas para JWT seguros (tokens HS256 / HS512)"
howToSteps:
  - "Elija su modo de entrada: 'Entrada de texto' o 'Firma de archivo'."
  - "Seleccione el algoritmo hash criptográfico (ej., SHA-256)."
  - "Ingrese su mensaje o arrastre un archivo local."
  - "Ingrese su clave secreta simétrica, o haga clic en 'Generar Clave'."
  - "La firma HMAC se genera instantáneamente. Haga clic en copiar."
  - "Opcional: Pegue una firma esperada en 'Comparar' para verificar."
---

## ¿Qué es HMAC? 

Un **HMAC** (Hash-based Message Authentication Code) es un tipo específico de código de autenticación de mensajes que involucra una función hash criptográfica y una clave criptográfica secreta. Se utiliza para verificar simultáneamente la **integridad de los datos** y la **autenticidad** de un mensaje.

A diferencia de los hashes estándar (como SHA-256 o MD5), un HMAC utiliza una clave simétrica precompartida. Esta clave garantiza que solo las personas que poseen la clave secreta puedan generar o verificar la firma, protegiendo los canales de comunicación contra suplantación y manipulación.

---

## Cómo Funciona HMAC: La Fórmula Criptográfica

Simplemente codificar un mensaje concatenado con una clave ($Hash(Clave + Mensaje)$) es vulnerable a un ataque severo conocido como **ataque de extensión de longitud**. 

HMAC evita esto al aplicar un hash a la clave y al mensaje en una estructura anidada de dos pasadas:
$$\\text{HMAC}(K, m) = H((K^+ \\oplus \\text{opad}) \\parallel H((K^+ \\oplus \\text{ipad}) \\parallel m))$$

Esta función matemática rompe la vulnerabilidad, haciendo que HMAC sea altamente seguro contra manipulaciones.

---

## HMAC frente al Hashing Estándar

| Característica | Hash Estándar (ej., SHA-256) | HMAC (ej., HMAC-SHA256) |
| :--- | :--- | :--- |
| **Entradas** | Solo mensaje ($m$) | Mensaje ($m$) + Clave secreta ($K$) |
| **Propósito** | Verificar integridad de datos | Verificar integridad Y autenticidad |
| **Vulnerabilidades**| Vulnerable a ataques de extensión | Inmune a ataques de extensión |
| **Casos de uso** | Sumas de comprobación, contraseñas | Firmas API, webhooks, JWT |

---

## Algoritmos Soportados

1. **HMAC-SHA256**: Altamente seguro. El estándar de la industria para firmas de API (Stripe, GitHub) y JWT.
2. **HMAC-SHA512**: Extremadamente seguro. Utilizado para la máxima protección de datos.
3. **HMAC-SHA1**: Legado. Seguro gracias a HMAC, pero reservado para sistemas antiguos.
4. **HMAC-MD5**: Obsoleto/Débil. Úselo solo para compatibilidad con sistemas heredados.

---

## Aplicaciones en el Desarrollo Web

### 1. Verificación de Firmas de Webhooks
Cuando un servicio (como Stripe) envía un webhook a su servidor, debe verificar que provenga de ese proveedor.
* El proveedor codifica la solicitud JSON con una clave secreta que compartió con usted y envía la firma en un encabezado (`Stripe-Signature`).
* Su servidor calcula el HMAC de la solicitud utilizando la misma clave y lo compara.

### 2. Firma de Solicitudes de API (Ej. AWS)
Servicios como AWS utilizan HMAC para no enviar claves API por la red, previniendo intercepciones.

### 3. Firmas de JSON Web Token (JWT)
Los JWT que usan el algoritmo HS256 firman el token con:
$\\text{Firma} = \\text{HMAC-SHA256}(\\text{Base64Url}(\\text{Header}) + \".\" + \\text{Base64Url}(\\text{Payload}), \\text{Clave Secreta})$

---

## Seguridad Completa del Lado del Cliente

Esta herramienta procesa todos los cálculos al 100% en el lado del cliente utilizando su navegador web. Ni sus claves secretas ni sus mensajes se envían nunca a nuestros servidores.
