---
metaTitle: "Búsqueda DNS | Comprobador de Registros (A, MX, TXT) y SPF/DMARC"
metaDescription: "Realice búsquedas DNS en tiempo real. Inspeccione registros A, AAAA, MX, TXT, CNAME, NS, SOA. Analice la seguridad del correo (SPF, DMARC) y la propagación."
metaKeywords: "busqueda dns, comprobador dns, dns lookup, registros dns, registro a, registro mx, verificar spf, verificar dmarc, propagacion dns, dns checker"
title: "Búsqueda de Registros DNS (DNS Lookup)"
shortDescription: "Inspeccione registros DNS (A, MX, TXT, CNAME, NS) en tiempo real. Analice la seguridad de su correo (SPF/DMARC) y diagnostique errores de propagación."
faqs:
  - question: "¿Qué es una búsqueda DNS (DNS Lookup)?"
    answer: "Una búsqueda DNS es el proceso de consultar servidores DNS para encontrar los registros asociados a un dominio. Esto incluye asignar nombres a direcciones IP (registros A/AAAA), servidores de correo (MX) y seguridad (TXT)."
  - question: "¿Qué es la propagación DNS?"
    answer: "Es el tiempo durante el cual los cambios en los registros DNS se extienden globalmente. Dado que los resolutores almacenan registros según su TTL, la propagación puede tardar desde unos minutos hasta 48 horas."
  - question: "¿Qué es SPF (Sender Policy Framework)?"
    answer: "SPF es un registro DNS TXT que enumera todas las direcciones IP y servidores autorizados para enviar correos electrónicos desde su dominio, evitando que los spammers falsifiquen su nombre."
  - question: "¿Qué es DMARC?"
    answer: "DMARC es un registro que indica a los receptores cómo tratar los correos electrónicos que no superan las comprobaciones de SPF o DKIM (por ejemplo, ponerlos en cuarentena o rechazarlos)."
  - question: "¿Por qué mi dominio no resuelve?"
    answer: "Los problemas pueden ocurrir debido a retrasos en la propagación, registro expirado, configuración incorrecta de nombres de servidor (NS) o conflictos (como establecer un CNAME en el dominio raíz)."
  - question: "¿Puede el DNS afectar al SEO?"
    answer: "Sí. Unos servidores de nombres lentos aumentan la latencia del sitio (Tiempo hasta el primer byte o TTFB), lo que degrada la experiencia del usuario y las métricas de Google Core Web Vitals. Las caídas del DNS también impiden que los bots indexen sus páginas."
features:
  - "Busca 10 tipos de registros DNS (A, AAAA, MX, TXT, CNAME, NS, SOA, CAA, SRV, PTR)."
  - "Inspecciona las configuraciones de seguridad del correo saliente (SPF, DMARC, DKIM)."
  - "Analizador WHOIS (RDAP) para fechas de registro, expiración y detalles del registrador."
  - "Detecta automáticamente redes de alojamiento (Cloudflare, AWS Route 53)."
  - "Escáner de DNS Inverso (PTR) para buscar nombres de host conectados a IP."
  - "Comparte resultados de búsqueda mediante parámetros de URL."
useCases:
  - "Desarrolladores diagnosticando mapeos de dominio y redirecciones locales."
  - "Administradores auditando configuraciones de correo (Email) para prevenir suplantación."
  - "Especialistas SEO diagnosticando latencia del dominio (TTFB)."
  - "Proveedores de hosting verificando el estado de la propagación global."
howToSteps:
  - "Ingrese un nombre de dominio (ej. ejemplo.com) o dirección IP en el campo de búsqueda."
  - "Haga clic en 'Consultar DNS' para iniciar la inspección."
  - "Revise las tarjetas de resumen que muestran el proveedor de hosting y nombres de servidor."
  - "Navegue entre las pestañas para examinar registros individuales (A, MX, TXT) y sus TTL."
  - "Verifique la tarjeta de 'Diagnósticos de Seguridad' para alertas sobre SPF/DMARC faltantes."
---

## Introducción al Sistema de Nombres de Dominio (DNS)

El **DNS** es la piedra angular de Internet, a menudo descrito como la \"guía telefónica de la web\". Traduce nombres de dominio legibles por humanos (como `ejemplo.com`) en direcciones IP que las máquinas pueden leer (como `93.184.216.34`). 

Cuando edita la zona DNS, debe esperar el tiempo de propagación (establecido por el TTL). Nuestra herramienta realiza consultas directamente contra resolutores globales, permitiéndole diagnosticar errores de inmediato.

---

## Tipos de Registros DNS y su función

### 1. Registros A y AAAA (Direcciones IP)
* **A (IPv4):** El registro más fundamental. Mapea un dominio directamente a una dirección IPv4 (ej. `93.184.216.34`).
* **AAAA (IPv6):** Funciona igual que el registro A, pero mapea dominios a direcciones IPv6 de 128 bits.

### 2. Registro CNAME (Nombre Canónico)
Mapea un dominio alias al nombre de dominio canónico (real). Actúa como una redirección. 
*Nota técnica: No se puede colocar un registro CNAME en la raíz del dominio (ej. en `ejemplo.com`), solo en subdominios (ej. `www.ejemplo.com`).*

### 3. Registro MX (Intercambiador de Correo)
Especifica los servidores responsables de recibir correos electrónicos de su dominio. Cada registro MX incluye una **Prioridad** (números más bajos se intentan primero).

### 4. Registro TXT (Texto)
Contiene texto asociado con el dominio. Se utiliza para la validación de propiedad (Google Search Console) y marcos de seguridad de correo (SPF, DMARC, DKIM).

### 5. Registro NS (Servidor de Nombres)
Define qué servidores son los \"autoritativos\" (los responsables) de responder a las consultas DNS de su dominio (por ejemplo, `ns1.cloudflare.com`).

### 6. Registro CAA (Autorización de Autoridad de Certificación)
Especifica qué Autoridades de Certificación (como Let's Encrypt) están permitidas para emitir certificados SSL/TLS para el dominio. Evita la emisión fraudulenta de SSL.

### 7. Registro PTR (DNS Inverso)
Mapea una dirección IP a un nombre de dominio (el inverso exacto de un registro A). Los servidores de correo realizan comprobaciones PTR a las IP entrantes para verificar que no sean fuentes de SPAM.

---

## Seguridad del Correo: SPF, DKIM y DMARC

El correo electrónico es vulnerable a la suplantación de identidad (Spoofing). Para proteger su marca y mejorar la entrega en la bandeja de entrada, configure estos 3 registros TXT:

1. **SPF (Sender Policy Framework):** Enumera qué servidores tienen permiso para enviar correos en nombre de su dominio. (Ej. `v=spf1 include:_spf.google.com ~all`).
2. **DKIM (DomainKeys Identified Mail):** Añade una firma criptográfica a los correos salientes. La clave pública se publica en un registro TXT.
3. **DMARC:** Indica a los servidores receptores qué hacer con los correos que fallan las comprobaciones SPF o DKIM (Ej. `p=reject` para rechazar todos los correos falsos).

Utilice nuestro buscador de DNS para localizar debilidades en la infraestructura de su dominio.
