import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L7B_PROTOCOLS: Protocol[] = [
  {
    id: "snmp",
    acronym: "SNMP",
    fullName: { es: "Protocolo Simple de Administración de Red", en: "Simple Network Management Protocol" },
    osi: [7],
    category: "management",
    status: "current",
    bodies: ["IETF"],
    year: 1988,
    identifiers: ["UDP 161", "UDP 162"],
    summary: {
      es: "SNMP permite consultar y configurar a distancia routers, switches, impresoras y servidores: cuánto tráfico pasa por un puerto, si un ventilador falló o cuánta memoria queda. También deja que los equipos avisen por su cuenta cuando algo sale mal.",
      en: "SNMP lets you remotely query and configure routers, switches, printers and servers: how much traffic crosses a port, whether a fan failed or how much memory is left. It also lets devices raise an alert on their own when something goes wrong.",
    },
    analogy: {
      es: "Como un tablero de instrumentos con miles de indicadores numerados: el supervisor pregunta por el número del indicador y el equipo responde con su lectura; si algo se sale de rango, el equipo toca la alarma por su cuenta.",
      en: "Like an instrument panel with thousands of numbered gauges: the supervisor asks for a gauge by its number and the device replies with its reading; if something goes out of range, the device sounds the alarm on its own.",
    },
    everyday: {
      es: "Las gráficas de tráfico de un proveedor de Internet o de herramientas como Zabbix, PRTG o LibreNMS suelen alimentarse con SNMP.",
      en: "The traffic graphs of an ISP or of tools such as Zabbix, PRTG or LibreNMS are usually fed by SNMP.",
    },
    technical: [
      {
        es: "El modelo tiene un gestor (NMS) y agentes en cada equipo. La información se organiza en la MIB, un árbol jerárquico cuyos nodos se identifican con OIDs (por ejemplo, 1.3.6.1.2.1.1.1.0 es sysDescr). Los mensajes se codifican en ASN.1 con reglas BER y viajan sobre UDP: el agente escucha en el puerto 161 y el gestor recibe notificaciones en el 162.",
        en: "The model has a manager (NMS) and an agent on each device. Information is organised in the MIB, a hierarchical tree whose nodes are identified by OIDs (e.g. 1.3.6.1.2.1.1.1.0 is sysDescr). Messages are encoded in ASN.1 with BER rules and travel over UDP: the agent listens on port 161 and the manager receives notifications on 162.",
      },
      {
        es: "Las operaciones básicas son Get, GetNext y Set; SNMPv2c añadió GetBulk (para recorrer tablas con menos peticiones) e Inform (notificación con confirmación), frente al Trap sin confirmar. Herramientas como snmpwalk recorren un subárbol encadenando GetNext o GetBulk hasta salir de él.",
        en: "The basic operations are Get, GetNext and Set; SNMPv2c added GetBulk (to walk tables with fewer requests) and Inform (an acknowledged notification), versus the unacknowledged Trap. Tools such as snmpwalk traverse a subtree by chaining GetNext or GetBulk until they leave it.",
      },
      {
        es: "Existen tres versiones en uso. SNMPv1 (RFC 1157, 1990) y SNMPv2c (RFC 1901, 1996) se autentican solo con una community string que viaja en claro. SNMPv3 (RFC 3411–3418, 2002, STD 62) introduce una arquitectura modular con el modelo de seguridad USM (autenticación e integridad con HMAC y cifrado) y el control de acceso VACM.",
        en: "Three versions are in use. SNMPv1 (RFC 1157, 1990) and SNMPv2c (RFC 1901, 1996) authenticate only with a community string sent in cleartext. SNMPv3 (RFC 3411–3418, 2002, STD 62) introduces a modular architecture with the USM security model (HMAC-based authentication and integrity plus encryption) and VACM access control.",
      },
    ],
    howItWorks: [
      { es: "El gestor envía un GetRequest/GetBulkRequest con uno o más OIDs al puerto UDP 161 del agente.", en: "The manager sends a GetRequest/GetBulkRequest with one or more OIDs to the agent's UDP port 161." },
      { es: "El agente valida la community (v1/v2c) o el usuario USM (v3) y consulta su MIB.", en: "The agent validates the community (v1/v2c) or USM user (v3) and looks up its MIB." },
      { es: "El agente devuelve un Response con los pares OID-valor (varbinds) o un código de error.", en: "The agent returns a Response with OID-value pairs (varbinds) or an error code." },
      { es: "Ante un evento (enlace caído, reinicio), el agente envía un Trap o Inform al puerto UDP 162 del gestor.", en: "On an event (link down, reboot), the agent sends a Trap or Inform to the manager's UDP port 162." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: { es: "UDP 161 (consultas), UDP 162 (notificaciones)", en: "UDP 161 (queries), UDP 162 (notifications)" } },
      { label: { es: "Codificación", en: "Encoding" }, value: "ASN.1 BER" },
      { label: { es: "Direccionamiento de datos", en: "Data addressing" }, value: { es: "OIDs dentro de la MIB", en: "OIDs within the MIB" } },
      { label: { es: "Versiones", en: "Versions" }, value: "v1, v2c, v3" },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Solo en SNMPv3 (USM)", en: "Only in SNMPv3 (USM)" } },
    ],
    security: {
      es: "En v1/v2c la community string (a menudo \"public\" o \"private\" por defecto) viaja en claro y funciona como contraseña de lectura o escritura, así que cualquiera que capture el tráfico puede reutilizarla. Los agentes expuestos a Internet también sirven para ataques de amplificación con GetBulk. La recomendación es usar SNMPv3 con authPriv, restringir el acceso por ACL y nunca exponer UDP 161 públicamente.",
      en: "In v1/v2c the community string (often \"public\" or \"private\" by default) travels in cleartext and acts as a read or write password, so anyone capturing the traffic can reuse it. Agents exposed to the Internet can also be abused for GetBulk amplification attacks. The recommendation is SNMPv3 with authPriv, ACL-restricted access and never exposing UDP 161 publicly.",
    },
    tools: [
      { command: "snmpwalk -v2c -c public 192.0.2.1 1.3.6.1.2.1.1", description: { es: "Recorre el grupo system de la MIB-II (Net-SNMP)", en: "Walks the MIB-II system group (Net-SNMP)" } },
      { command: "snmpget -v3 -l authPriv -u admin -a SHA -A clave -x AES -X clave 192.0.2.1 sysUpTime.0", description: { es: "Consulta un OID con SNMPv3 autenticado y cifrado", en: "Queries an OID with authenticated, encrypted SNMPv3" } },
    ],
    wireshark: "snmp",
    relations: { dependsOn: ["udp", "asn1"] },
    specs: [
      { id: "RFC 3411", title: { es: "Arquitectura para describir marcos de gestión SNMP", en: "An Architecture for Describing SNMP Management Frameworks" }, url: rfc(3411) },
      { id: "RFC 3414", title: { es: "Modelo de seguridad basado en usuarios (USM) para SNMPv3", en: "User-based Security Model (USM) for SNMPv3" }, url: rfc(3414) },
      { id: "RFC 3416", title: { es: "Operaciones del protocolo SNMP versión 2", en: "Version 2 of the Protocol Operations for SNMP" }, url: rfc(3416) },
      { id: "RFC 1157", title: { es: "Simple Network Management Protocol (SNMPv1)", en: "A Simple Network Management Protocol (SNMP)" }, url: rfc(1157) },
      { id: "RFC 1901", title: { es: "Introducción a SNMPv2 basado en communities", en: "Introduction to Community-based SNMPv2" }, url: rfc(1901) },
    ],
  },
  {
    id: "ntp",
    acronym: "NTP",
    fullName: { es: "Protocolo de Tiempo de Red", en: "Network Time Protocol" },
    osi: [7],
    category: "time",
    status: "current",
    bodies: ["IETF"],
    year: 1985,
    identifiers: ["UDP 123", "TCP 4460 (NTS-KE)"],
    summary: {
      es: "NTP mantiene sincronizados los relojes de computadoras, teléfonos y servidores con una precisión de milisegundos a través de Internet. Sin un reloj correcto fallan los certificados, los registros de eventos y la autenticación.",
      en: "NTP keeps the clocks of computers, phones and servers synchronised to within milliseconds across the Internet. Without a correct clock, certificates, event logs and authentication break.",
    },
    analogy: {
      es: "Como preguntar la hora por teléfono y anotar cuándo hiciste la pregunta y cuándo llegó la respuesta: con esos tiempos puedes descontar lo que tardó la llamada y ajustar tu reloj con precisión.",
      en: "Like asking for the time over the phone while noting when you asked and when the answer arrived: with those times you can subtract the call delay and set your watch precisely.",
    },
    everyday: {
      es: "Tu PC o teléfono ajusta la hora automáticamente contra servidores como time.windows.com, time.apple.com o pool.ntp.org.",
      en: "Your PC or phone sets its clock automatically against servers such as time.windows.com, time.apple.com or pool.ntp.org.",
    },
    technical: [
      {
        es: "NTP organiza los relojes en una jerarquía de estratos: el estrato 0 son las referencias físicas (GPS, relojes atómicos), el estrato 1 son los servidores conectados directamente a ellas, y cada salto añade un nivel hasta 15; el 16 significa \"no sincronizado\". Los clientes consultan varios servidores y combinan sus resultados con algoritmos de selección y agrupamiento que descartan relojes erróneos.",
        en: "NTP arranges clocks in a hierarchy of strata: stratum 0 are physical references (GPS, atomic clocks), stratum 1 are servers directly attached to them, and each hop adds a level up to 15; 16 means \"unsynchronised\". Clients query several servers and combine the results with selection and clustering algorithms that discard bad clocks.",
      },
      {
        es: "Cada intercambio registra cuatro marcas de tiempo: T1 (envío del cliente), T2 (recepción en el servidor), T3 (respuesta del servidor) y T4 (llegada al cliente). El desfase se calcula como θ = ((T2 − T1) + (T3 − T4)) / 2 y el retardo de ida y vuelta como δ = (T4 − T1) − (T3 − T2), suponiendo un camino simétrico. El reloj local se corrige gradualmente (slew) en lugar de saltar, salvo desfases grandes.",
        en: "Each exchange records four timestamps: T1 (client send), T2 (server receive), T3 (server reply) and T4 (client receive). The offset is θ = ((T2 − T1) + (T3 − T4)) / 2 and the round-trip delay is δ = (T4 − T1) − (T3 − T2), assuming a symmetric path. The local clock is corrected gradually (slewed) rather than stepped, except for large offsets.",
      },
      {
        es: "Las marcas de tiempo son de 64 bits (32 para segundos desde 1900 y 32 para la fracción), por lo que la era actual termina en 2036. NTPv4 (RFC 5905, 2010) reemplaza a NTPv3 (RFC 1305) y a SNTP (RFC 4330). Network Time Security (NTS, RFC 8915, 2020) añade autenticación criptográfica: un handshake NTS-KE sobre TLS en TCP 4460 entrega cookies y claves que protegen luego los paquetes NTP.",
        en: "Timestamps are 64 bits (32 for seconds since 1900 and 32 for the fraction), so the current era ends in 2036. NTPv4 (RFC 5905, 2010) replaces NTPv3 (RFC 1305) and SNTP (RFC 4330). Network Time Security (NTS, RFC 8915, 2020) adds cryptographic authentication: an NTS-KE handshake over TLS on TCP 4460 delivers cookies and keys that then protect the NTP packets.",
      },
    ],
    howItWorks: [
      { es: "El cliente envía un paquete en modo 3 (cliente) con su marca de envío T1 al puerto UDP 123.", en: "The client sends a mode 3 (client) packet carrying its send timestamp T1 to UDP port 123." },
      { es: "El servidor anota T2 al recibirlo y T3 al responder en modo 4 (servidor), junto con su estrato.", en: "The server records T2 on receipt and T3 when replying in mode 4 (server), along with its stratum." },
      { es: "El cliente anota T4 y calcula desfase y retardo con las cuatro marcas.", en: "The client records T4 and computes offset and delay from the four timestamps." },
      { es: "Tras varias muestras y servidores, el algoritmo de disciplina ajusta la frecuencia y la hora del reloj local.", en: "After several samples and servers, the discipline algorithm adjusts the local clock's frequency and time." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: "UDP 123" },
      { label: { es: "Estratos", en: "Strata" }, value: { es: "1–15 (16 = no sincronizado)", en: "1–15 (16 = unsynchronised)" } },
      { label: { es: "Marca de tiempo", en: "Timestamp" }, value: { es: "64 bits, época 1900 (desborda en 2036)", en: "64 bits, 1900 epoch (wraps in 2036)" } },
      { label: { es: "Precisión típica", en: "Typical accuracy" }, value: { es: "Milisegundos en Internet, mejor en LAN", en: "Milliseconds over the Internet, better on a LAN" } },
      { label: { es: "Seguridad moderna", en: "Modern security" }, value: "NTS (RFC 8915)" },
    ],
    security: {
      es: "El comando de control monlist de ntpd devolvía la lista de los últimos 600 clientes ante una petición diminuta, lo que se explotó masivamente para ataques de amplificación DDoS (CVE-2013-5211); se corrige desactivándolo o actualizando ntpd. Un atacante en la ruta puede además falsificar respuestas y desplazar el reloj, lo que invalida certificados y tickets de Kerberos; NTS evita esa manipulación.",
      en: "ntpd's monlist control command returned the last 600 clients in response to a tiny request, which was massively exploited for DDoS amplification attacks (CVE-2013-5211); the fix is disabling it or upgrading ntpd. An on-path attacker can also forge replies and shift the clock, breaking certificates and Kerberos tickets; NTS prevents that tampering.",
    },
    tools: [
      { command: "chronyc sources -v", description: { es: "Muestra los servidores, su estrato y desfase (chrony)", en: "Shows servers, their stratum and offset (chrony)" } },
      { command: "ntpq -p", description: { es: "Lista los pares NTP con retardo, desfase y jitter (ntpd)", en: "Lists NTP peers with delay, offset and jitter (ntpd)" } },
      { command: "w32tm /query /status", description: { es: "Estado de sincronización horaria en Windows", en: "Time synchronisation status on Windows" } },
    ],
    wireshark: "ntp",
    relations: { dependsOn: ["udp", "tls"], usedBy: ["kerberos"] },
    specs: [
      { id: "RFC 5905", title: { es: "Network Time Protocol versión 4", en: "Network Time Protocol Version 4: Protocol and Algorithms Specification" }, url: rfc(5905) },
      { id: "RFC 8915", title: { es: "Network Time Security para NTP", en: "Network Time Security for the Network Time Protocol" }, url: rfc(8915) },
      { id: "RFC 958", title: { es: "Network Time Protocol (versión original)", en: "Network Time Protocol (NTP)" }, url: rfc(958) },
    ],
  },
  {
    id: "ldap",
    acronym: "LDAP",
    fullName: { es: "Protocolo Ligero de Acceso a Directorios", en: "Lightweight Directory Access Protocol" },
    osi: [7],
    category: "auth",
    status: "current",
    bodies: ["IETF"],
    year: 1993,
    identifiers: ["TCP 389", "TCP 636 (LDAPS)", "TCP 3268 (AD Global Catalog)"],
    summary: {
      es: "LDAP es el protocolo para consultar y modificar directorios: bases de datos jerárquicas con usuarios, grupos, equipos y sus atributos. Es lo que usan las empresas para que un mismo usuario y contraseña sirvan en muchos sistemas.",
      en: "LDAP is the protocol for querying and modifying directories: hierarchical databases of users, groups, computers and their attributes. It is what organisations use so the same username and password work across many systems.",
    },
    analogy: {
      es: "Como el directorio telefónico de una gran empresa organizado por país, sede y departamento: puedes buscar a alguien por cualquier dato y obtener su ficha completa.",
      en: "Like a large company's phone directory organised by country, site and department: you can look someone up by any attribute and get their full record.",
    },
    everyday: {
      es: "Cuando inicias sesión en la computadora del trabajo, la VPN o una aplicación interna con tu cuenta corporativa, detrás suele haber Active Directory u OpenLDAP respondiendo por LDAP.",
      en: "When you log in to your work computer, the VPN or an internal app with your corporate account, Active Directory or OpenLDAP is usually answering over LDAP behind the scenes.",
    },
    technical: [
      {
        es: "El directorio forma un árbol llamado DIT (Directory Information Tree). Cada entrada tiene un nombre distintivo (DN) único que describe su ruta, por ejemplo uid=jperez,ou=Personas,dc=ejemplo,dc=com, y un conjunto de atributos definidos por clases de objeto (objectClass) en el esquema. Los mensajes del protocolo se codifican en ASN.1 BER sobre TCP 389.",
        en: "The directory forms a tree called the DIT (Directory Information Tree). Each entry has a unique distinguished name (DN) describing its path, e.g. uid=jdoe,ou=People,dc=example,dc=com, and a set of attributes defined by object classes (objectClass) in the schema. Protocol messages are ASN.1 BER-encoded over TCP 389.",
      },
      {
        es: "Las operaciones son Bind (autenticación, simple o SASL), Search, Compare, Add, Delete, Modify, ModifyDN, Abandon, Unbind y Extended. Una búsqueda indica una base, un alcance (base, one o sub) y un filtro en notación prefija como (&(objectClass=person)(mail=*@ejemplo.com)) (RFC 4515). Las respuestas llegan como una serie de SearchResultEntry seguida de SearchResultDone.",
        en: "Operations are Bind (authentication, simple or SASL), Search, Compare, Add, Delete, Modify, ModifyDN, Abandon, Unbind and Extended. A search specifies a base, a scope (base, one or sub) and a prefix-notation filter such as (&(objectClass=person)(mail=*@example.com)) (RFC 4515). Results arrive as a series of SearchResultEntry messages followed by SearchResultDone.",
      },
      {
        es: "LDAPv3 está definido por la serie RFC 4510–4519 (2006), con el protocolo en RFC 4511; procede de LDAPv1 (RFC 1487, 1993), concebido como acceso ligero a directorios X.500. El cifrado se obtiene con StartTLS (una operación Extended que convierte la conexión en 389 a TLS) o con LDAPS en TCP 636. Active Directory de Microsoft es la implementación más extendida, junto con OpenLDAP y 389 Directory Server.",
        en: "LDAPv3 is defined by the RFC 4510–4519 series (2006), with the protocol in RFC 4511; it descends from LDAPv1 (RFC 1487, 1993), conceived as lightweight access to X.500 directories. Encryption comes from StartTLS (an Extended operation that upgrades the connection on 389 to TLS) or LDAPS on TCP 636. Microsoft Active Directory is the most widespread implementation, alongside OpenLDAP and 389 Directory Server.",
      },
    ],
    howItWorks: [
      { es: "El cliente abre TCP 389 y, opcionalmente, envía StartTLS para cifrar la conexión.", en: "The client opens TCP 389 and optionally sends StartTLS to encrypt the connection." },
      { es: "Bind: se autentica con un DN y contraseña (simple) o con SASL (por ejemplo, GSSAPI/Kerberos).", en: "Bind: it authenticates with a DN and password (simple) or with SASL (e.g. GSSAPI/Kerberos)." },
      { es: "Search: envía base, alcance, filtro y atributos deseados; el servidor devuelve las entradas que coinciden.", en: "Search: it sends base, scope, filter and requested attributes; the server returns the matching entries." },
      { es: "Unbind: el cliente cierra la sesión y la conexión TCP.", en: "Unbind: the client ends the session and the TCP connection." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "TCP 389 (StartTLS), TCP 636 (LDAPS)", en: "TCP 389 (StartTLS), TCP 636 (LDAPS)" } },
      { label: { es: "Codificación", en: "Encoding" }, value: "ASN.1 BER" },
      { label: { es: "Modelo de datos", en: "Data model" }, value: { es: "Árbol (DIT) de entradas identificadas por DN", en: "Tree (DIT) of entries identified by DN" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Bind simple o SASL", en: "Simple bind or SASL" } },
      { label: { es: "Implementaciones", en: "Implementations" }, value: "Active Directory, OpenLDAP, 389 DS" },
    ],
    security: {
      es: "Un bind simple sin TLS envía la contraseña en claro. Las aplicaciones que arman filtros concatenando texto del usuario son vulnerables a inyección LDAP, y los binds anónimos pueden filtrar el directorio completo. En Active Directory se recomienda exigir firma LDAP y channel binding, además de usar LDAPS o StartTLS en todas las conexiones.",
      en: "A simple bind without TLS sends the password in cleartext. Applications that build filters by concatenating user input are vulnerable to LDAP injection, and anonymous binds can leak the whole directory. In Active Directory, requiring LDAP signing and channel binding is recommended, along with LDAPS or StartTLS on every connection.",
    },
    tools: [
      { command: "ldapsearch -x -H ldap://ldap.ejemplo.com -b \"dc=ejemplo,dc=com\" \"(uid=jperez)\"", description: { es: "Busca una entrada con un bind anónimo (OpenLDAP)", en: "Searches for an entry with an anonymous bind (OpenLDAP)" } },
      { command: "ldapwhoami -x -H ldaps://ldap.ejemplo.com -D \"uid=jperez,ou=Personas,dc=ejemplo,dc=com\" -W", description: { es: "Verifica credenciales con un bind simple sobre LDAPS", en: "Checks credentials with a simple bind over LDAPS" } },
    ],
    wireshark: "ldap",
    relations: { dependsOn: ["tcp", "tls", "asn1"] },
    specs: [
      { id: "RFC 4511", title: { es: "LDAP: el protocolo", en: "Lightweight Directory Access Protocol (LDAP): The Protocol" }, url: rfc(4511) },
      { id: "RFC 4510", title: { es: "LDAP: hoja de ruta de las especificaciones", en: "LDAP: Technical Specification Road Map" }, url: rfc(4510) },
      { id: "RFC 4513", title: { es: "LDAP: métodos de autenticación y mecanismos de seguridad", en: "LDAP: Authentication Methods and Security Mechanisms" }, url: rfc(4513) },
      { id: "RFC 4515", title: { es: "LDAP: representación en texto de los filtros de búsqueda", en: "LDAP: String Representation of Search Filters" }, url: rfc(4515) },
    ],
  },
  {
    id: "kerberos",
    acronym: "Kerberos",
    fullName: { es: "Kerberos versión 5", en: "Kerberos Version 5" },
    osi: [7],
    category: "auth",
    status: "current",
    bodies: ["IETF"],
    year: 1993,
    identifiers: ["UDP 88", "TCP 88", "TCP/UDP 464 (kpasswd)"],
    summary: {
      es: "Kerberos permite iniciar sesión una sola vez y luego acceder a muchos servicios de la red sin volver a escribir la contraseña y sin que esta viaje por la red. Es el corazón de la autenticación en los dominios de Windows.",
      en: "Kerberos lets you sign in once and then access many network services without typing your password again and without the password ever crossing the network. It is the heart of authentication in Windows domains.",
    },
    analogy: {
      es: "Como la pulsera de un parque de diversiones: muestras tu identificación una vez en la entrada, te dan una pulsera con fecha de caducidad, y con ella obtienes boletos para cada atracción sin volver a identificarte.",
      en: "Like an amusement-park wristband: you show your ID once at the gate, get a wristband with an expiry time, and use it to get a ticket for each ride without showing your ID again.",
    },
    everyday: {
      es: "Al iniciar sesión en una PC unida a Active Directory y abrir carpetas compartidas, impresoras o la intranet sin que te pidan la contraseña.",
      en: "When you log in to an Active Directory-joined PC and open shared folders, printers or the intranet without being asked for your password.",
    },
    technical: [
      {
        es: "Kerberos se basa en un tercero de confianza, el KDC (Key Distribution Center), que comparte una clave secreta con cada usuario y servicio de un reino (realm). El KDC tiene dos funciones: el Authentication Service (AS), que emite un Ticket-Granting Ticket (TGT) tras autenticar al usuario, y el Ticket-Granting Service (TGS), que canjea ese TGT por tickets para servicios concretos.",
        en: "Kerberos relies on a trusted third party, the KDC (Key Distribution Center), which shares a secret key with every user and service in a realm. The KDC has two roles: the Authentication Service (AS), which issues a Ticket-Granting Ticket (TGT) after authenticating the user, and the Ticket-Granting Service (TGS), which exchanges that TGT for tickets to specific services.",
      },
      {
        es: "Un ticket de servicio va cifrado con la clave del servicio y contiene una clave de sesión, así que el servicio puede validarlo sin consultar al KDC. El cliente lo presenta en un AP-REQ con un autenticador que incluye una marca de tiempo; por eso los relojes deben estar sincronizados (tolerancia típica de 5 minutos). El servidor puede responder con AP-REP para lograr autenticación mutua.",
        en: "A service ticket is encrypted with the service's key and carries a session key, so the service can validate it without contacting the KDC. The client presents it in an AP-REQ with an authenticator containing a timestamp; that is why clocks must be synchronised (typical tolerance 5 minutes). The server can reply with an AP-REP to achieve mutual authentication.",
      },
      {
        es: "Nació en el Proyecto Athena del MIT en los años 80; la versión 5 se publicó como RFC 1510 (1993) y hoy la define RFC 4120 (2005). Los mensajes se codifican en ASN.1 DER y viajan por UDP o TCP 88. Los tipos de cifrado actuales son AES (RFC 3962 y RFC 8009); RFC 8429 depreca 3DES y RC4. Las aplicaciones lo integran mediante GSS-API y SPNEGO (por ejemplo, en SMB, LDAP o HTTP Negotiate).",
        en: "It was born in MIT's Project Athena in the 1980s; version 5 was published as RFC 1510 (1993) and is now defined by RFC 4120 (2005). Messages are ASN.1 DER-encoded and travel over UDP or TCP 88. Current encryption types are AES (RFC 3962 and RFC 8009); RFC 8429 deprecates 3DES and RC4. Applications integrate it through GSS-API and SPNEGO (e.g. in SMB, LDAP or HTTP Negotiate).",
      },
    ],
    howItWorks: [
      { es: "AS-REQ/AS-REP: el cliente pide un TGT al KDC (con preautenticación); lo recibe junto con una clave de sesión cifrada con la clave derivada de su contraseña.", en: "AS-REQ/AS-REP: the client asks the KDC for a TGT (with pre-authentication); it receives it with a session key encrypted under its password-derived key." },
      { es: "TGS-REQ/TGS-REP: presenta el TGT y pide un ticket para un servicio identificado por su SPN.", en: "TGS-REQ/TGS-REP: it presents the TGT and requests a ticket for a service identified by its SPN." },
      { es: "AP-REQ: envía el ticket de servicio y un autenticador con marca de tiempo al servidor.", en: "AP-REQ: it sends the service ticket and a timestamped authenticator to the server." },
      { es: "AP-REP (opcional): el servidor demuestra conocer la clave de sesión y queda autenticación mutua.", en: "AP-REP (optional): the server proves it knows the session key, giving mutual authentication." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "UDP/TCP 88" },
      { label: { es: "Tercero de confianza", en: "Trusted third party" }, value: { es: "KDC (AS + TGS)", en: "KDC (AS + TGS)" } },
      { label: { es: "Tolerancia de reloj", en: "Clock skew tolerance" }, value: { es: "5 minutos por defecto", en: "5 minutes by default" } },
      { label: { es: "Codificación", en: "Encoding" }, value: "ASN.1 DER" },
      { label: { es: "Cifrado recomendado", en: "Recommended encryption" }, value: "AES (aes256-cts-hmac-sha1-96, aes256-cts-hmac-sha384-192)" },
    ],
    security: {
      es: "En Kerberoasting, cualquier usuario del dominio pide tickets de servicio para cuentas con SPN y descifra fuera de línea la contraseña de la cuenta de servicio, sobre todo si se usa RC4; se mitiga con contraseñas largas o cuentas gMSA y solo AES. Un golden ticket es un TGT falsificado con la clave de la cuenta krbtgt, que da acceso total hasta que esa clave se rota dos veces. Otras técnicas conocidas son AS-REP roasting (cuentas sin preautenticación) y pass-the-ticket.",
      en: "In Kerberoasting, any domain user requests service tickets for SPN accounts and cracks the service account's password offline, especially when RC4 is used; mitigations are long passwords or gMSA accounts and AES only. A golden ticket is a TGT forged with the krbtgt account key, granting full access until that key is rotated twice. Other known techniques are AS-REP roasting (accounts without pre-authentication) and pass-the-ticket.",
    },
    tools: [
      { command: "kinit usuario@EJEMPLO.COM", description: { es: "Obtiene un TGT (MIT Kerberos / Heimdal)", en: "Obtains a TGT (MIT Kerberos / Heimdal)" } },
      { command: "klist", description: { es: "Lista los tickets en caché (Linux, macOS y Windows)", en: "Lists cached tickets (Linux, macOS and Windows)" } },
      { command: "kvno HTTP/web.ejemplo.com", description: { es: "Solicita un ticket de servicio y muestra su versión de clave", en: "Requests a service ticket and shows its key version" } },
    ],
    wireshark: "kerberos",
    relations: { dependsOn: ["udp", "tcp", "asn1", "ntp"], usedBy: ["ldap", "smb", "nfs"] },
    specs: [
      { id: "RFC 4120", title: { es: "The Kerberos Network Authentication Service (V5)", en: "The Kerberos Network Authentication Service (V5)" }, url: rfc(4120) },
      { id: "RFC 3962", title: { es: "Cifrado AES para Kerberos 5", en: "Advanced Encryption Standard (AES) Encryption for Kerberos 5" }, url: rfc(3962) },
      { id: "RFC 8429", title: { es: "Deprecación de 3DES y RC4 en Kerberos", en: "Deprecate Triple-DES (3DES) and RC4 in Kerberos" }, url: rfc(8429) },
      { id: "RFC 1510", title: { es: "Kerberos V5 (especificación original)", en: "The Kerberos Network Authentication Service (V5)" }, url: rfc(1510) },
    ],
  },
  {
    id: "radius",
    acronym: "RADIUS",
    fullName: { es: "Servicio de Autenticación Remota de Usuarios por Marcación", en: "Remote Authentication Dial-In User Service" },
    osi: [7],
    category: "auth",
    status: "current",
    bodies: ["IETF"],
    year: 1997,
    identifiers: ["UDP 1812 (auth)", "UDP 1813 (accounting)", "TCP 2083 (RadSec)"],
    summary: {
      es: "RADIUS centraliza la autenticación de quien se conecta a una red: redes Wi-Fi corporativas, VPN o el acceso a Internet de un proveedor. El equipo de acceso pregunta al servidor RADIUS si el usuario es válido y qué permisos tiene, y le informa cuánto tiempo estuvo conectado.",
      en: "RADIUS centralises authentication for whoever connects to a network: corporate Wi-Fi, VPNs or an ISP's Internet access. The access device asks the RADIUS server whether the user is valid and what they may do, and reports how long they stayed connected.",
    },
    analogy: {
      es: "Como el guardia de la entrada de un edificio que no tiene la lista de empleados: llama por teléfono a la oficina central, que le dice si dejar pasar a la persona, a qué pisos, y anota la hora de entrada y salida.",
      en: "Like a building's door guard who does not hold the staff list: they phone head office, which says whether to let the person in, to which floors, and logs the time in and out.",
    },
    everyday: {
      es: "Al conectarte a la Wi-Fi WPA2/WPA3-Enterprise de tu empresa o universidad (por ejemplo, eduroam) con tu usuario y contraseña.",
      en: "When you join your company's or university's WPA2/WPA3-Enterprise Wi-Fi (e.g. eduroam) with your username and password.",
    },
    technical: [
      {
        es: "RADIUS implementa AAA: autenticación, autorización y contabilidad (accounting). El cliente RADIUS es el NAS (punto de acceso, switch, concentrador VPN), no el usuario final. Los mensajes van sobre UDP 1812 (Access-Request, Access-Accept, Access-Reject, Access-Challenge) y UDP 1813 para accounting (RFC 2866); los puertos históricos 1645/1646 aún aparecen en equipos antiguos.",
        en: "RADIUS implements AAA: authentication, authorisation and accounting. The RADIUS client is the NAS (access point, switch, VPN concentrator), not the end user. Messages run over UDP 1812 (Access-Request, Access-Accept, Access-Reject, Access-Challenge) and UDP 1813 for accounting (RFC 2866); the historic ports 1645/1646 still appear on older gear.",
      },
      {
        es: "Cada paquete lleva un código, un identificador, un autenticador de 16 bytes y atributos TLV (usuario, VLAN asignada, tiempo de sesión…), extensibles con Vendor-Specific Attributes. NAS y servidor comparten un secreto: la contraseña del usuario se oculta con MD5 del secreto y el Request Authenticator, y la respuesta se firma también con MD5. En 802.1X, el NAS encapsula EAP dentro de atributos RADIUS (RFC 3579) hacia el servidor.",
        en: "Each packet carries a code, an identifier, a 16-byte authenticator and TLV attributes (user, assigned VLAN, session timeout…), extensible through Vendor-Specific Attributes. NAS and server share a secret: the user's password is hidden with an MD5 of the secret and the Request Authenticator, and the reply is also signed with MD5. In 802.1X, the NAS carries EAP inside RADIUS attributes (RFC 3579) to the server.",
      },
      {
        es: "La especificación vigente es RFC 2865 (2000), que reemplazó a RFC 2058 (1997). Diameter (RFC 6733) se diseñó como sucesor, con transporte confiable y mejor manejo de fallos, y domina en redes móviles 4G, pero RADIUS sigue siendo el estándar en redes empresariales y de proveedores. RadSec (RFC 6614) transporta RADIUS sobre TLS en TCP 2083.",
        en: "The current specification is RFC 2865 (2000), which replaced RFC 2058 (1997). Diameter (RFC 6733) was designed as its successor, with reliable transport and better failure handling, and dominates 4G mobile networks, but RADIUS remains the standard in enterprise and ISP networks. RadSec (RFC 6614) carries RADIUS over TLS on TCP 2083.",
      },
    ],
    howItWorks: [
      { es: "El usuario se conecta al NAS, que envía un Access-Request con sus credenciales al servidor RADIUS.", en: "The user connects to the NAS, which sends an Access-Request with the credentials to the RADIUS server." },
      { es: "El servidor valida contra su base (a menudo LDAP/Active Directory) y puede pedir más datos con Access-Challenge (por ejemplo, rondas EAP).", en: "The server validates against its store (often LDAP/Active Directory) and may request more data with Access-Challenge (e.g. EAP rounds)." },
      { es: "Responde Access-Accept con atributos de autorización (VLAN, ACL, tiempo) o Access-Reject.", en: "It replies Access-Accept with authorisation attributes (VLAN, ACL, timeout) or Access-Reject." },
      { es: "El NAS envía Accounting-Request Start, Interim-Update y Stop al puerto 1813 durante la sesión.", en: "The NAS sends Accounting-Request Start, Interim-Update and Stop to port 1813 during the session." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "UDP 1812 (autenticación), UDP 1813 (accounting)", en: "UDP 1812 (authentication), UDP 1813 (accounting)" } },
      { label: { es: "Modelo", en: "Model" }, value: "AAA" },
      { label: { es: "Protección", en: "Protection" }, value: { es: "Secreto compartido + MD5", en: "Shared secret + MD5" } },
      { label: { es: "Uso principal", en: "Main use" }, value: { es: "802.1X, VPN, acceso de proveedores", en: "802.1X, VPN, ISP access" } },
      { label: { es: "Sucesor", en: "Successor" }, value: "Diameter (RFC 6733)" },
    ],
    security: {
      es: "Toda la integridad de RADIUS sobre UDP depende de MD5 y del secreto compartido. Blast-RADIUS (2024, CVE-2024-3596) demostró que un atacante en la ruta puede usar una colisión MD5 de prefijo elegido para convertir un Access-Reject en un Access-Accept. La mitigación inmediata es exigir el atributo Message-Authenticator en todos los paquetes; la solución de fondo es transportar RADIUS sobre TLS (RadSec, RFC 6614) o DTLS.",
      en: "All of RADIUS-over-UDP integrity relies on MD5 and the shared secret. Blast-RADIUS (2024, CVE-2024-3596) showed that an on-path attacker can use an MD5 chosen-prefix collision to turn an Access-Reject into an Access-Accept. The immediate mitigation is requiring the Message-Authenticator attribute on every packet; the lasting fix is carrying RADIUS over TLS (RadSec, RFC 6614) or DTLS.",
    },
    tools: [
      { command: "radtest usuario clave 127.0.0.1 0 secreto", description: { es: "Envía un Access-Request de prueba (FreeRADIUS)", en: "Sends a test Access-Request (FreeRADIUS)" } },
      { command: "radiusd -X", description: { es: "Ejecuta FreeRADIUS en modo depuración mostrando cada atributo", en: "Runs FreeRADIUS in debug mode showing every attribute" } },
    ],
    wireshark: "radius",
    relations: { dependsOn: ["udp"], usedBy: ["dot1x"] },
    specs: [
      { id: "RFC 2865", title: { es: "Remote Authentication Dial In User Service (RADIUS)", en: "Remote Authentication Dial In User Service (RADIUS)" }, url: rfc(2865) },
      { id: "RFC 2866", title: { es: "RADIUS Accounting", en: "RADIUS Accounting" }, url: rfc(2866) },
      { id: "RFC 3579", title: { es: "Soporte de RADIUS para EAP", en: "RADIUS Support For Extensible Authentication Protocol (EAP)" }, url: rfc(3579) },
      { id: "RFC 6614", title: { es: "RADIUS sobre TLS (RadSec)", en: "Transport Layer Security (TLS) Encryption for RADIUS" }, url: rfc(6614) },
    ],
  },
  {
    id: "sip",
    acronym: "SIP",
    fullName: { es: "Protocolo de Inicio de Sesión", en: "Session Initiation Protocol" },
    osi: [7],
    category: "media",
    status: "current",
    bodies: ["IETF"],
    year: 1999,
    identifiers: ["UDP 5060", "TCP 5060", "TCP 5061 (TLS)"],
    summary: {
      es: "SIP es el protocolo que establece, modifica y termina llamadas de voz y video por Internet: hace sonar el teléfono, negocia qué códec usar y cuelga. La voz en sí no viaja por SIP, sino por RTP.",
      en: "SIP is the protocol that sets up, modifies and tears down voice and video calls over the Internet: it rings the phone, negotiates which codec to use and hangs up. The voice itself does not travel over SIP, but over RTP.",
    },
    analogy: {
      es: "Como la operadora de una central telefónica: localiza al destinatario, le avisa que tiene una llamada y conecta a ambos; una vez conectados, la conversación va por otro canal.",
      en: "Like a switchboard operator: they locate the callee, tell them a call is coming and connect both parties; once connected, the conversation flows over a different channel.",
    },
    everyday: {
      es: "Teléfonos IP de oficina, centrales como Asterisk o 3CX, troncales SIP de operadores y las llamadas VoLTE de tu celular, que usan SIP dentro de la red IMS.",
      en: "Office IP phones, PBXs such as Asterisk or 3CX, carrier SIP trunks and your phone's VoLTE calls, which use SIP inside the IMS network.",
    },
    technical: [
      {
        es: "SIP es un protocolo de texto con sintaxis similar a HTTP: peticiones con métodos (INVITE, ACK, BYE, CANCEL, REGISTER, OPTIONS y extensiones como SUBSCRIBE, NOTIFY o REFER) y respuestas con códigos de clase 1xx a 6xx (100 Trying, 180 Ringing, 200 OK, 486 Busy Here). Los usuarios se identifican con URIs como sip:ana@ejemplo.com, o sips: cuando se exige TLS.",
        en: "SIP is a text protocol with HTTP-like syntax: requests with methods (INVITE, ACK, BYE, CANCEL, REGISTER, OPTIONS and extensions such as SUBSCRIBE, NOTIFY or REFER) and responses with 1xx–6xx class codes (100 Trying, 180 Ringing, 200 OK, 486 Busy Here). Users are identified by URIs such as sip:ana@example.com, or sips: when TLS is required.",
      },
      {
        es: "La arquitectura incluye agentes de usuario (UA), registrars donde cada UA registra su ubicación actual, proxies que enrutan las peticiones y B2BUA como las centrales o los SBC. El cuerpo del INVITE lleva una descripción SDP (RFC 8866) con IPs, puertos y códecs; el modelo oferta/respuesta (RFC 3264) acuerda los parámetros de la sesión.",
        en: "The architecture includes user agents (UAs), registrars where each UA registers its current location, proxies that route requests and B2BUAs such as PBXs or SBCs. The INVITE body carries an SDP description (RFC 8866) with IPs, ports and codecs; the offer/answer model (RFC 3264) agrees on session parameters.",
      },
      {
        es: "Una vez aceptada la llamada, el audio y el video viajan directamente entre los extremos (o a través de un SBC) sobre RTP, con RTCP para estadísticas de calidad y SRTP para cifrarlos. RFC 3261 (2002) es la especificación vigente y reemplazó a RFC 2543 (1999). Como SDP anuncia IPs privadas, el paso por NAT suele requerir SBC, STUN/TURN o ICE.",
        en: "Once the call is accepted, audio and video flow directly between the endpoints (or through an SBC) over RTP, with RTCP for quality statistics and SRTP to encrypt them. RFC 3261 (2002) is the current specification and replaced RFC 2543 (1999). Because SDP advertises private IPs, NAT traversal usually requires an SBC, STUN/TURN or ICE.",
      },
    ],
    howItWorks: [
      { es: "REGISTER: cada teléfono informa al registrar en qué IP y puerto puede ser localizado.", en: "REGISTER: each phone tells the registrar at which IP and port it can be reached." },
      { es: "INVITE con oferta SDP: el llamante lo envía al proxy, que lo reenvía al destinatario; vuelven 100 Trying y 180 Ringing.", en: "INVITE with SDP offer: the caller sends it to the proxy, which forwards it to the callee; 100 Trying and 180 Ringing come back." },
      { es: "200 OK con respuesta SDP cuando el destinatario contesta; el llamante confirma con ACK.", en: "200 OK with SDP answer when the callee picks up; the caller confirms with ACK." },
      { es: "Los medios fluyen por RTP/RTCP según lo acordado en SDP.", en: "Media flows over RTP/RTCP as agreed in SDP." },
      { es: "BYE de cualquiera de las partes, respondido con 200 OK, termina la llamada.", en: "A BYE from either party, answered with 200 OK, ends the call." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "5060 UDP/TCP, 5061 TLS", en: "5060 UDP/TCP, 5061 TLS" } },
      { label: { es: "Formato", en: "Format" }, value: { es: "Texto, estilo HTTP", en: "Text, HTTP-style" } },
      { label: { es: "Descripción de sesión", en: "Session description" }, value: "SDP (RFC 8866)" },
      { label: { es: "Medios", en: "Media" }, value: { es: "RTP/RTCP (SRTP cifrado)", en: "RTP/RTCP (SRTP encrypted)" } },
      { label: { es: "Direccionamiento", en: "Addressing" }, value: "sip: / sips: URIs" },
    ],
    security: {
      es: "Los servidores SIP expuestos a Internet reciben escaneos constantes que prueban extensiones y contraseñas; una cuenta comprometida permite fraude de llamadas internacionales (toll fraud). Sin TLS, la señalización y los números marcados viajan en claro y se pueden secuestrar registros. Se recomienda SIP sobre TLS (5061), SRTP para los medios, contraseñas robustas, fail2ban y un SBC en el perímetro.",
      en: "Internet-exposed SIP servers get constant scans that probe extensions and passwords; a compromised account enables international toll fraud. Without TLS, signalling and dialled numbers travel in cleartext and registrations can be hijacked. Recommended practice is SIP over TLS (5061), SRTP for media, strong passwords, fail2ban and an SBC at the edge.",
    },
    tools: [
      { command: "sngrep", description: { es: "Muestra en consola los diálogos SIP como diagramas de flujo", en: "Shows SIP dialogs as call-flow diagrams in the terminal" } },
      { command: "tcpdump -n -i any port 5060", description: { es: "Captura la señalización SIP sin cifrar", en: "Captures unencrypted SIP signalling" } },
    ],
    wireshark: "sip",
    relations: { dependsOn: ["udp", "tcp", "tls", "rtcp"] },
    specs: [
      { id: "RFC 3261", title: { es: "SIP: Session Initiation Protocol", en: "SIP: Session Initiation Protocol" }, url: rfc(3261) },
      { id: "RFC 3264", title: { es: "Modelo oferta/respuesta con SDP", en: "An Offer/Answer Model with the Session Description Protocol (SDP)" }, url: rfc(3264) },
      { id: "RFC 8866", title: { es: "SDP: Session Description Protocol", en: "SDP: Session Description Protocol" }, url: rfc(8866) },
      { id: "RFC 3550", title: { es: "RTP: protocolo de transporte para aplicaciones en tiempo real", en: "RTP: A Transport Protocol for Real-Time Applications" }, url: rfc(3550) },
    ],
  },
  {
    id: "rtsp",
    acronym: "RTSP",
    fullName: { es: "Protocolo de Transmisión en Tiempo Real", en: "Real-Time Streaming Protocol" },
    osi: [7],
    category: "media",
    status: "current",
    bodies: ["IETF"],
    year: 1998,
    identifiers: ["TCP 554"],
    summary: {
      es: "RTSP funciona como un control remoto para flujos de video y audio: permite pedir un stream, reproducirlo, pausarlo y detenerlo. Es el protocolo estándar para ver cámaras IP y grabadores de videovigilancia.",
      en: "RTSP works like a remote control for video and audio streams: it lets you request a stream, play it, pause it and stop it. It is the standard protocol for watching IP cameras and video surveillance recorders.",
    },
    analogy: {
      es: "Como los botones de una videocasetera: RTSP envía las órdenes de reproducir, pausar o detener, mientras la cinta (el video) llega por otro cable.",
      en: "Like the buttons on a VCR: RTSP sends the play, pause and stop commands, while the tape (the video) arrives over a different cable.",
    },
    everyday: {
      es: "Al agregar una cámara de seguridad a un NVR o a VLC con una dirección rtsp://usuario:clave@192.168.1.64:554/stream1.",
      en: "When adding a security camera to an NVR or to VLC with an address like rtsp://user:pass@192.168.1.64:554/stream1.",
    },
    technical: [
      {
        es: "RTSP es un protocolo de texto parecido a HTTP, pero con estado: el servidor mantiene una sesión identificada por la cabecera Session, y cada petición se numera con CSeq. Los métodos principales son OPTIONS, DESCRIBE (devuelve una descripción SDP de los medios), SETUP (negocia el transporte de cada pista), PLAY, PAUSE, TEARDOWN y GET_PARAMETER/SET_PARAMETER.",
        en: "RTSP is an HTTP-like text protocol, but stateful: the server keeps a session identified by the Session header, and each request is numbered with CSeq. The main methods are OPTIONS, DESCRIBE (returns an SDP description of the media), SETUP (negotiates transport for each track), PLAY, PAUSE, TEARDOWN and GET_PARAMETER/SET_PARAMETER.",
      },
      {
        es: "RTSP solo controla; los medios viajan normalmente por RTP con informes RTCP, ya sea en puertos UDP negociados en SETUP o intercalados (interleaved) dentro de la misma conexión TCP 554, útil para atravesar NAT y firewalls. La cabecera Transport indica cuál de los dos modos se usa.",
        en: "RTSP only controls; media normally travels over RTP with RTCP reports, either on UDP ports negotiated in SETUP or interleaved within the same TCP 554 connection, which helps traverse NATs and firewalls. The Transport header states which of the two modes is used.",
      },
      {
        es: "RTSP 1.0 (RFC 2326, 1998) es la versión que implementan casi todas las cámaras y bibliotecas. RTSP 2.0 (RFC 7826, 2016) no es compatible con la 1.0: elimina el transporte de la señalización sobre UDP, retira métodos como RECORD y aclara la gestión de sesiones, pero su adopción es escasa. Para distribución masiva en la web se prefieren HLS, DASH o WebRTC.",
        en: "RTSP 1.0 (RFC 2326, 1998) is the version implemented by almost every camera and library. RTSP 2.0 (RFC 7826, 2016) is not backward compatible with 1.0: it drops signalling over UDP, removes methods such as RECORD and clarifies session handling, but adoption is low. For mass web distribution, HLS, DASH or WebRTC are preferred.",
      },
    ],
    howItWorks: [
      { es: "DESCRIBE rtsp://cámara/stream: el servidor responde con SDP que lista las pistas (video H.264/H.265, audio).", en: "DESCRIBE rtsp://camera/stream: the server replies with SDP listing the tracks (H.264/H.265 video, audio)." },
      { es: "SETUP por pista: se acuerda RTP sobre UDP (puertos cliente/servidor) o intercalado en TCP; el servidor asigna un Session.", en: "SETUP per track: RTP over UDP (client/server ports) or interleaved over TCP is agreed; the server assigns a Session." },
      { es: "PLAY: comienza el envío de paquetes RTP; PAUSE lo suspende sin cerrar la sesión.", en: "PLAY: RTP packets start flowing; PAUSE suspends them without closing the session." },
      { es: "TEARDOWN: libera la sesión y los recursos del servidor.", en: "TEARDOWN: releases the session and server resources." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "TCP 554" },
      { label: { es: "Formato", en: "Format" }, value: { es: "Texto, estilo HTTP, con estado", en: "Text, HTTP-style, stateful" } },
      { label: { es: "Transporte de medios", en: "Media transport" }, value: { es: "RTP/RTCP sobre UDP o intercalado en TCP", en: "RTP/RTCP over UDP or interleaved over TCP" } },
      { label: { es: "Versiones", en: "Versions" }, value: { es: "1.0 (RFC 2326) y 2.0 (RFC 7826), incompatibles", en: "1.0 (RFC 2326) and 2.0 (RFC 7826), incompatible" } },
    ],
    security: {
      es: "Muchas cámaras IP salen de fábrica con credenciales por defecto o sin autenticación y quedan expuestas en TCP 554, lo que permite ver sus imágenes desde Internet. RTSP autentica con Basic o Digest y, sin TLS, tanto la señalización como el video viajan en claro. Conviene cambiar las credenciales, no publicar el puerto y acceder por VPN.",
      en: "Many IP cameras ship with default credentials or no authentication and end up exposed on TCP 554, letting anyone view their feed from the Internet. RTSP authenticates with Basic or Digest and, without TLS, both signalling and video travel in cleartext. Change the credentials, do not publish the port and access it through a VPN.",
    },
    tools: [
      { command: "ffprobe rtsp://192.168.1.64:554/stream1", description: { es: "Muestra las pistas y códecs que ofrece la cámara", en: "Shows the tracks and codecs the camera offers" } },
      { command: "ffplay -rtsp_transport tcp rtsp://192.168.1.64:554/stream1", description: { es: "Reproduce el stream forzando RTP intercalado en TCP", en: "Plays the stream forcing RTP interleaved over TCP" } },
    ],
    wireshark: "rtsp",
    relations: { dependsOn: ["tcp", "udp", "rtcp", "video-codecs"] },
    specs: [
      { id: "RFC 7826", title: { es: "Real-Time Streaming Protocol versión 2.0", en: "Real-Time Streaming Protocol Version 2.0" }, url: rfc(7826) },
      { id: "RFC 2326", title: { es: "Real Time Streaming Protocol (RTSP 1.0)", en: "Real Time Streaming Protocol (RTSP)" }, url: rfc(2326) },
    ],
  },
  {
    id: "mqtt",
    acronym: "MQTT",
    fullName: { es: "MQTT (mensajería publicar/suscribir para IoT)", en: "MQTT (publish/subscribe messaging for IoT)" },
    osi: [7],
    category: "messaging",
    status: "current",
    bodies: ["OASIS", "ISO/IEC"],
    year: 1999,
    identifiers: ["TCP 1883", "TCP 8883 (TLS)"],
    summary: {
      es: "MQTT es un protocolo de mensajería muy ligero en el que los dispositivos publican datos en \"temas\" y otros se suscriben a ellos, todo a través de un servidor intermediario (broker). Es el estándar de facto para sensores e Internet de las Cosas.",
      en: "MQTT is a very lightweight messaging protocol where devices publish data to \"topics\" and others subscribe to them, all through an intermediary server (broker). It is the de facto standard for sensors and the Internet of Things.",
    },
    analogy: {
      es: "Como una estación de radio con muchos canales: los sensores transmiten en su canal (casa/sala/temperatura) y quien quiera escuchar sintoniza ese canal, sin que emisor y oyente se conozcan.",
      en: "Like a radio station with many channels: sensors broadcast on their channel (home/living/temperature) and anyone interested tunes in, without sender and listener knowing each other.",
    },
    everyday: {
      es: "Domótica con Home Assistant, sensores industriales, flotas de vehículos y plataformas como AWS IoT Core o Azure IoT Hub.",
      en: "Home automation with Home Assistant, industrial sensors, vehicle fleets and platforms such as AWS IoT Core or Azure IoT Hub.",
    },
    technical: [
      {
        es: "Los clientes abren una conexión TCP persistente con el broker (1883, u 8883 con TLS) y envían paquetes de control binarios con una cabecera fija de apenas 2 bytes: CONNECT, PUBLISH, SUBSCRIBE, PINGREQ, DISCONNECT, entre otros. Los temas son cadenas jerárquicas separadas por \"/\"; al suscribirse, \"+\" sustituye un nivel y \"#\" todos los niveles restantes (casa/+/temperatura, fabrica/#).",
        en: "Clients open a persistent TCP connection to the broker (1883, or 8883 with TLS) and send binary control packets with a fixed header of just 2 bytes: CONNECT, PUBLISH, SUBSCRIBE, PINGREQ, DISCONNECT, among others. Topics are hierarchical strings separated by \"/\"; when subscribing, \"+\" matches one level and \"#\" all remaining levels (home/+/temperature, factory/#).",
      },
      {
        es: "Ofrece tres niveles de calidad de servicio: QoS 0 (como máximo una vez, sin confirmación), QoS 1 (al menos una vez, con PUBACK) y QoS 2 (exactamente una vez, con el intercambio PUBREC/PUBREL/PUBCOMP). Un mensaje retenido (retained) queda guardado en el broker para entregarse a nuevos suscriptores, y el Last Will es un mensaje que el broker publica si el cliente se desconecta de forma inesperada.",
        en: "It offers three quality-of-service levels: QoS 0 (at most once, no acknowledgement), QoS 1 (at least once, with PUBACK) and QoS 2 (exactly once, with the PUBREC/PUBREL/PUBCOMP exchange). A retained message is stored by the broker and delivered to new subscribers, and the Last Will is a message the broker publishes if the client disconnects unexpectedly.",
      },
      {
        es: "Lo crearon Andy Stanford-Clark (IBM) y Arlen Nipper en 1999 para monitorear oleoductos por enlaces satelitales. OASIS publicó MQTT 3.1.1 en 2014, adoptado como ISO/IEC 20922:2016, y MQTT 5.0 en 2019, que añade códigos de motivo, propiedades de usuario, suscripciones compartidas, alias de temas y expiración de mensajes y sesiones. También puede transportarse sobre WebSocket para clientes web.",
        en: "It was created by Andy Stanford-Clark (IBM) and Arlen Nipper in 1999 to monitor oil pipelines over satellite links. OASIS published MQTT 3.1.1 in 2014, adopted as ISO/IEC 20922:2016, and MQTT 5.0 in 2019, which adds reason codes, user properties, shared subscriptions, topic aliases and message and session expiry. It can also run over WebSocket for web clients.",
      },
    ],
    howItWorks: [
      { es: "CONNECT: el cliente se identifica (client ID, usuario, keep-alive, Last Will) y el broker responde CONNACK.", en: "CONNECT: the client identifies itself (client ID, user, keep-alive, Last Will) and the broker replies CONNACK." },
      { es: "SUBSCRIBE: el suscriptor indica filtros de tema con su QoS; el broker confirma con SUBACK.", en: "SUBSCRIBE: the subscriber lists topic filters with their QoS; the broker confirms with SUBACK." },
      { es: "PUBLISH: el publicador envía un mensaje a un tema; el broker lo reenvía a todos los suscriptores que coincidan.", en: "PUBLISH: the publisher sends a message to a topic; the broker forwards it to every matching subscriber." },
      { es: "PINGREQ/PINGRESP mantienen viva la conexión; si se rompe sin DISCONNECT, el broker publica el Last Will.", en: "PINGREQ/PINGRESP keep the connection alive; if it drops without DISCONNECT, the broker publishes the Last Will." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "TCP 1883, TCP 8883 (TLS)", en: "TCP 1883, TCP 8883 (TLS)" } },
      { label: { es: "Patrón", en: "Pattern" }, value: { es: "Publicar/suscribir con broker", en: "Publish/subscribe via broker" } },
      { label: { es: "Cabecera fija", en: "Fixed header" }, value: { es: "2 B mínimo", en: "2 B minimum" } },
      { label: { es: "QoS", en: "QoS" }, value: { es: "0, 1 y 2", en: "0, 1 and 2" } },
      { label: { es: "Comodines", en: "Wildcards" }, value: { es: "+ (un nivel), # (varios niveles)", en: "+ (single level), # (multi-level)" } },
    ],
    security: {
      es: "MQTT no exige autenticación ni cifrado: es común encontrar brokers en el puerto 1883 abiertos a Internet donde cualquiera puede suscribirse a \"#\" y leer o inyectar datos de dispositivos. Se debe usar TLS (8883), usuario y contraseña o certificados de cliente, y ACL por tema en el broker.",
      en: "MQTT requires neither authentication nor encryption: it is common to find brokers on port 1883 open to the Internet where anyone can subscribe to \"#\" and read or inject device data. Use TLS (8883), username/password or client certificates, and per-topic ACLs on the broker.",
    },
    tools: [
      { command: "mosquitto_sub -h broker.ejemplo.com -t 'casa/#' -v", description: { es: "Se suscribe a todos los temas bajo casa/ y muestra el tema de cada mensaje", en: "Subscribes to every topic under casa/ and prints each message's topic" } },
      { command: "mosquitto_pub -h broker.ejemplo.com -t casa/sala/luz -m on -q 1", description: { es: "Publica un mensaje con QoS 1", en: "Publishes a message with QoS 1" } },
    ],
    wireshark: "mqtt",
    relations: { dependsOn: ["tcp", "tls", "websocket"] },
    specs: [
      { id: "MQTT 5.0", title: { es: "MQTT versión 5.0 (OASIS Standard)", en: "MQTT Version 5.0 (OASIS Standard)" }, url: "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html" },
      { id: "MQTT 3.1.1", title: { es: "MQTT versión 3.1.1 (OASIS Standard)", en: "MQTT Version 3.1.1 (OASIS Standard)" }, url: "https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html" },
      { id: "ISO/IEC 20922:2016", title: { es: "MQTT versión 3.1.1 como norma ISO/IEC", en: "MQTT Version 3.1.1 as an ISO/IEC standard" } },
    ],
  },
  {
    id: "coap",
    acronym: "CoAP",
    fullName: { es: "Protocolo de Aplicación Restringida", en: "Constrained Application Protocol" },
    osi: [7],
    category: "messaging",
    status: "current",
    bodies: ["IETF"],
    year: 2014,
    identifiers: ["UDP 5683", "UDP 5684 (DTLS)"],
    summary: {
      es: "CoAP es como un HTTP en miniatura para dispositivos muy limitados, como sensores con baterías y pocos kilobytes de memoria. Usa GET, POST, PUT y DELETE sobre recursos, pero con mensajes binarios diminutos sobre UDP.",
      en: "CoAP is like a miniature HTTP for very constrained devices, such as battery-powered sensors with a few kilobytes of memory. It uses GET, POST, PUT and DELETE on resources, but with tiny binary messages over UDP.",
    },
    analogy: {
      es: "Como mandar telegramas en lugar de cartas: el mismo tipo de pedido (\"dame la temperatura\"), pero en el formato más corto posible y con acuse de recibo solo cuando hace falta.",
      en: "Like sending telegrams instead of letters: the same kind of request (\"give me the temperature\"), but in the shortest possible format and with a receipt only when needed.",
    },
    everyday: {
      es: "Redes de sensores en edificios y agricultura, medidores inteligentes, gestión de dispositivos con LwM2M y el ecosistema Thread.",
      en: "Sensor networks in buildings and agriculture, smart meters, device management with LwM2M and the Thread ecosystem.",
    },
    technical: [
      {
        es: "CoAP sigue el modelo REST: recursos identificados por URIs coap:// o coaps://, métodos GET, POST, PUT y DELETE, y códigos de respuesta con formato clase.detalle (2.05 Content, 4.04 Not Found) que se corresponden con los de HTTP. Su cabecera fija mide 4 bytes (versión, tipo, longitud del token, código y Message ID), seguida del token, opciones codificadas por diferencia y el payload, a menudo en CBOR.",
        en: "CoAP follows the REST model: resources identified by coap:// or coaps:// URIs, GET, POST, PUT and DELETE methods, and response codes in class.detail form (2.05 Content, 4.04 Not Found) that map to HTTP's. Its fixed header is 4 bytes (version, type, token length, code and Message ID), followed by the token, delta-encoded options and the payload, often CBOR.",
      },
      {
        es: "Como UDP no es confiable, CoAP añade una capa de mensajes: los mensajes CON (confirmables) se retransmiten con espera exponencial hasta recibir un ACK, mientras que los NON no se confirman; RST rechaza un mensaje. El Message ID detecta duplicados y el token empareja peticiones con respuestas, que pueden llegar en el propio ACK (piggybacked) o por separado.",
        en: "Because UDP is unreliable, CoAP adds a messaging layer: CON (confirmable) messages are retransmitted with exponential back-off until an ACK arrives, while NON messages are not acknowledged; RST rejects a message. The Message ID detects duplicates and the token matches requests with responses, which may arrive in the ACK itself (piggybacked) or separately.",
      },
      {
        es: "RFC 7252 (2014) define el núcleo. Observe (RFC 7641) permite suscribirse a un recurso y recibir notificaciones cuando cambia, y la transferencia por bloques (RFC 7959) divide cuerpos grandes, como actualizaciones de firmware, en fragmentos. El descubrimiento de recursos usa /.well-known/core, CoAP admite multicast, y RFC 8323 lo lleva sobre TCP y WebSocket.",
        en: "RFC 7252 (2014) defines the core. Observe (RFC 7641) lets a client subscribe to a resource and be notified when it changes, and block-wise transfer (RFC 7959) splits large bodies, such as firmware updates, into chunks. Resource discovery uses /.well-known/core, CoAP supports multicast, and RFC 8323 carries it over TCP and WebSocket.",
      },
    ],
    howItWorks: [
      { es: "El cliente envía un CON GET coap://sensor/temp con un Message ID y un token.", en: "The client sends a CON GET coap://sensor/temp with a Message ID and a token." },
      { es: "El servidor responde con un ACK que incluye 2.05 Content y el valor (respuesta piggybacked).", en: "The server replies with an ACK carrying 2.05 Content and the value (piggybacked response)." },
      { es: "Si no llega el ACK, el cliente retransmite con temporizador exponencial (4 reintentos por defecto).", en: "If no ACK arrives, the client retransmits with an exponential timer (4 retries by default)." },
      { es: "Con la opción Observe, el servidor sigue enviando notificaciones cada vez que el valor cambia.", en: "With the Observe option, the server keeps sending notifications every time the value changes." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "UDP 5683, UDP 5684 (DTLS)", en: "UDP 5683, UDP 5684 (DTLS)" } },
      { label: { es: "Cabecera fija", en: "Fixed header" }, value: "4 B" },
      { label: { es: "Tipos de mensaje", en: "Message types" }, value: "CON, NON, ACK, RST" },
      { label: { es: "Modelo", en: "Model" }, value: { es: "REST (GET/POST/PUT/DELETE)", en: "REST (GET/POST/PUT/DELETE)" } },
      { label: { es: "Extensiones clave", en: "Key extensions" }, value: { es: "Observe (RFC 7641), bloques (RFC 7959)", en: "Observe (RFC 7641), block-wise (RFC 7959)" } },
    ],
    security: {
      es: "Sin DTLS, CoAP no ofrece confidencialidad ni autenticación. Al ir sobre UDP, los servidores expuestos a Internet pueden usarse para ataques de reflexión y amplificación, porque una petición pequeña a /.well-known/core puede generar una respuesta mucho mayor. Se protege con DTLS (coaps, 5684) o con OSCORE (RFC 8613), que cifra de extremo a extremo incluso a través de proxies.",
      en: "Without DTLS, CoAP offers no confidentiality or authentication. Running over UDP, Internet-exposed servers can be abused for reflection and amplification attacks, because a small request to /.well-known/core can trigger a much larger response. It is protected with DTLS (coaps, 5684) or OSCORE (RFC 8613), which encrypts end to end even across proxies.",
    },
    tools: [
      { command: "coap-client -m get coap://[2001:db8::1]/.well-known/core", description: { es: "Descubre los recursos de un dispositivo (libcoap)", en: "Discovers a device's resources (libcoap)" } },
      { command: "coap-client -m get -s 60 coap://sensor.local/temp", description: { es: "Observa un recurso durante 60 s (libcoap)", en: "Observes a resource for 60 s (libcoap)" } },
    ],
    wireshark: "coap",
    relations: { dependsOn: ["udp", "dtls", "cbor"] },
    specs: [
      { id: "RFC 7252", title: { es: "The Constrained Application Protocol (CoAP)", en: "The Constrained Application Protocol (CoAP)" }, url: rfc(7252) },
      { id: "RFC 7641", title: { es: "Observación de recursos en CoAP", en: "Observing Resources in the Constrained Application Protocol (CoAP)" }, url: rfc(7641) },
      { id: "RFC 7959", title: { es: "Transferencia por bloques en CoAP", en: "Block-Wise Transfers in the Constrained Application Protocol (CoAP)" }, url: rfc(7959) },
      { id: "RFC 8613", title: { es: "OSCORE: seguridad de objetos para CoAP", en: "Object Security for Constrained RESTful Environments (OSCORE)" }, url: rfc(8613) },
    ],
  },
  {
    id: "amqp",
    acronym: "AMQP",
    fullName: { es: "Protocolo Avanzado de Encolamiento de Mensajes", en: "Advanced Message Queuing Protocol" },
    osi: [7],
    category: "messaging",
    status: "current",
    bodies: ["OASIS", "ISO/IEC"],
    year: 2012,
    identifiers: ["TCP 5672", "TCP 5671 (TLS)"],
    summary: {
      es: "AMQP es un protocolo abierto para que aplicaciones empresariales intercambien mensajes de forma confiable a través de colas, aunque estén escritas en lenguajes distintos o no estén conectadas al mismo tiempo. Es habitual en banca, comercio electrónico y microservicios.",
      en: "AMQP is an open protocol that lets business applications exchange messages reliably through queues, even when they are written in different languages or not online at the same time. It is common in banking, e-commerce and microservices.",
    },
    analogy: {
      es: "Como una oficina de correos entre sistemas: el remitente deja el paquete, la oficina lo guarda en el casillero correcto y lo entrega cuando el destinatario está listo, con acuse de recibo.",
      en: "Like a post office between systems: the sender drops off the parcel, the office stores it in the right box and delivers it when the recipient is ready, with a receipt.",
    },
    everyday: {
      es: "Un pedido en una tienda en línea que se encola para facturación, inventario y envío; plataformas como Azure Service Bus, ActiveMQ o RabbitMQ.",
      en: "An online-store order queued for billing, inventory and shipping; platforms such as Azure Service Bus, ActiveMQ or RabbitMQ.",
    },
    technical: [
      {
        es: "Bajo el nombre AMQP conviven dos protocolos distintos e incompatibles. AMQP 0-9-1 define un modelo de broker con exchanges (direct, fanout, topic, headers), colas y bindings, y es el protocolo nativo de RabbitMQ. AMQP 1.0, estandarizado por OASIS en 2012 e ISO/IEC 19464:2014, es un protocolo de transferencia simétrico entre pares que no impone ninguna topología de broker.",
        en: "Two different, incompatible protocols share the AMQP name. AMQP 0-9-1 defines a broker model with exchanges (direct, fanout, topic, headers), queues and bindings, and is RabbitMQ's native protocol. AMQP 1.0, standardised by OASIS in 2012 and ISO/IEC 19464:2014, is a symmetric peer-to-peer transfer protocol that imposes no broker topology.",
      },
      {
        es: "En AMQP 1.0, una conexión TCP (5672, o 5671 con TLS) lleva varias sesiones, y cada sesión varios enlaces (links) unidireccionales entre nodos. El control de flujo se basa en créditos: el receptor concede cuántos mensajes acepta. Cada transferencia se confirma con un estado de entrega (accepted, rejected, released, modified), lo que permite garantías \"al menos una vez\" y transacciones.",
        en: "In AMQP 1.0, a TCP connection (5672, or 5671 with TLS) carries several sessions, and each session several unidirectional links between nodes. Flow control is credit-based: the receiver grants how many messages it accepts. Each transfer is settled with a delivery state (accepted, rejected, released, modified), enabling at-least-once guarantees and transactions.",
      },
      {
        es: "Los datos usan un sistema de tipos binario propio y autodescriptivo, y la autenticación se negocia con SASL, además de TLS. AMQP nació en JPMorgan Chase en 2003 para evitar la dependencia de middleware propietario. Azure Service Bus, Azure Event Hubs, Apache ActiveMQ Artemis y Apache Qpid usan AMQP 1.0, y RabbitMQ 4.x también lo admite de forma nativa junto a 0-9-1.",
        en: "Data uses its own self-describing binary type system, and authentication is negotiated with SASL in addition to TLS. AMQP was born at JPMorgan Chase in 2003 to avoid lock-in to proprietary middleware. Azure Service Bus, Azure Event Hubs, Apache ActiveMQ Artemis and Apache Qpid use AMQP 1.0, and RabbitMQ 4.x also supports it natively alongside 0-9-1.",
      },
    ],
    howItWorks: [
      { es: "Cabecera de protocolo \"AMQP\" + versión, seguida de negociación SASL y opcionalmente TLS.", en: "\"AMQP\" protocol header + version, followed by SASL negotiation and optionally TLS." },
      { es: "open / begin / attach: se abren la conexión, una sesión y un enlace emisor o receptor hacia una cola o tema.", en: "open / begin / attach: the connection, a session and a sender or receiver link to a queue or topic are opened." },
      { es: "flow: el receptor concede créditos; transfer: el emisor envía mensajes dentro de ese crédito.", en: "flow: the receiver grants credit; transfer: the sender sends messages within that credit." },
      { es: "disposition: el receptor liquida cada entrega (accepted, rejected…); detach / end / close cierran el enlace, la sesión y la conexión.", en: "disposition: the receiver settles each delivery (accepted, rejected…); detach / end / close tear down link, session and connection." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "TCP 5672, TCP 5671 (TLS)", en: "TCP 5672, TCP 5671 (TLS)" } },
      { label: { es: "Estándar", en: "Standard" }, value: "OASIS AMQP 1.0, ISO/IEC 19464:2014" },
      { label: { es: "Control de flujo", en: "Flow control" }, value: { es: "Por créditos en cada enlace", en: "Credit-based per link" } },
      { label: { es: "Ojo", en: "Watch out" }, value: { es: "AMQP 0-9-1 (RabbitMQ) ≠ AMQP 1.0", en: "AMQP 0-9-1 (RabbitMQ) ≠ AMQP 1.0" } },
    ],
    security: {
      es: "Sin TLS, las credenciales SASL PLAIN y los mensajes viajan en claro por el puerto 5672. Los brokers suelen instalar usuarios por defecto (por ejemplo, guest/guest en RabbitMQ, limitado a localhost en versiones recientes) que deben eliminarse. Se recomienda TLS en 5671, autenticación por certificado o SASL robusto, y permisos mínimos por cola o virtual host.",
      en: "Without TLS, SASL PLAIN credentials and messages travel in cleartext on port 5672. Brokers often ship default users (e.g. guest/guest in RabbitMQ, restricted to localhost in recent versions) that should be removed. Recommended practice is TLS on 5671, certificate or strong SASL authentication, and least-privilege permissions per queue or virtual host.",
    },
    tools: [
      { command: "rabbitmqctl list_queues name messages consumers", description: { es: "Lista colas, mensajes pendientes y consumidores (RabbitMQ)", en: "Lists queues, pending messages and consumers (RabbitMQ)" } },
      { command: "rabbitmq-diagnostics listeners", description: { es: "Muestra los puertos y protocolos que escucha el broker", en: "Shows the ports and protocols the broker listens on" } },
    ],
    wireshark: "amqp",
    relations: { dependsOn: ["tcp", "tls"] },
    specs: [
      { id: "OASIS AMQP 1.0", title: { es: "Advanced Message Queuing Protocol versión 1.0 (OASIS Standard)", en: "OASIS Advanced Message Queuing Protocol (AMQP) Version 1.0" }, url: "https://docs.oasis-open.org/amqp/core/v1.0/amqp-core-complete-v1.0.pdf" },
      { id: "ISO/IEC 19464:2014", title: { es: "AMQP v1.0 como norma ISO/IEC", en: "Advanced Message Queuing Protocol (AMQP) v1.0 specification" } },
    ],
  },
  {
    id: "xmpp",
    acronym: "XMPP",
    fullName: { es: "Protocolo Extensible de Mensajería y Presencia", en: "Extensible Messaging and Presence Protocol" },
    osi: [7],
    category: "messaging",
    status: "current",
    bodies: ["IETF"],
    year: 2004,
    identifiers: ["TCP 5222 (cliente-servidor)", "TCP 5269 (servidor-servidor)"],
    summary: {
      es: "XMPP (antes Jabber) es un protocolo abierto de mensajería instantánea y presencia: saber quién está conectado y enviarle mensajes. Es federado como el correo: usuarios de servidores distintos pueden hablar entre sí.",
      en: "XMPP (formerly Jabber) is an open protocol for instant messaging and presence: knowing who is online and sending them messages. It is federated like email: users on different servers can talk to each other.",
    },
    analogy: {
      es: "Como el correo electrónico pero en tiempo real: cada persona tiene una dirección usuario@servidor, y los servidores se entregan los mensajes entre sí.",
      en: "Like email but in real time: everyone has a user@server address, and servers hand messages to each other.",
    },
    everyday: {
      es: "Clientes como Conversations o Gajim, servidores como ejabberd o Prosody, y sistemas de chat y notificaciones internos. Google Talk lo usó, y WhatsApp arrancó sobre una variante modificada.",
      en: "Clients such as Conversations or Gajim, servers such as ejabberd or Prosody, and internal chat and notification systems. Google Talk used it, and WhatsApp started on a modified variant.",
    },
    technical: [
      {
        es: "XMPP intercambia flujos XML (XML streams) de larga duración sobre TCP: el cliente abre un <stream:stream> hacia su servidor en el puerto 5222 y dentro envía unidades llamadas stanzas. Hay tres tipos: <message/> (mensajes), <presence/> (disponibilidad y suscripciones) e <iq/> (petición-respuesta, como leer la lista de contactos o roster).",
        en: "XMPP exchanges long-lived XML streams over TCP: the client opens a <stream:stream> to its server on port 5222 and sends units called stanzas inside it. There are three types: <message/> (messages), <presence/> (availability and subscriptions) and <iq/> (request-response, such as fetching the contact list or roster).",
      },
      {
        es: "Las direcciones son JID con la forma parte-local@dominio/recurso, donde el recurso distingue cada dispositivo conectado. El servidor se localiza con registros DNS SRV (_xmpp-client._tcp y _xmpp-server._tcp), y la federación entre servidores usa TCP 5269. STARTTLS y SASL son obligatorios de implementar para el cifrado y la autenticación.",
        en: "Addresses are JIDs of the form localpart@domain/resource, where the resource distinguishes each connected device. The server is located through DNS SRV records (_xmpp-client._tcp and _xmpp-server._tcp), and server-to-server federation uses TCP 5269. STARTTLS and SASL are mandatory to implement for encryption and authentication.",
      },
      {
        es: "Surgió como Jabber en 1999; el IETF lo estandarizó en RFC 3920 y 3921 (2004), hoy reemplazados por RFC 6120 (núcleo) y RFC 6121 (mensajería y presencia), ambos de 2011. La extensibilidad es su fuerte: la XMPP Standards Foundation publica XEPs como las salas de chat MUC (XEP-0045), el cifrado de extremo a extremo OMEMO (XEP-0384) o Jingle para voz y video (XEP-0166).",
        en: "It emerged as Jabber in 1999; the IETF standardised it in RFC 3920 and 3921 (2004), now replaced by RFC 6120 (core) and RFC 6121 (messaging and presence), both from 2011. Extensibility is its strength: the XMPP Standards Foundation publishes XEPs such as MUC chat rooms (XEP-0045), OMEMO end-to-end encryption (XEP-0384) or Jingle for voice and video (XEP-0166).",
      },
    ],
    howItWorks: [
      { es: "El cliente resuelve el SRV _xmpp-client._tcp del dominio y abre TCP 5222 con un encabezado de stream XML.", en: "The client resolves the domain's _xmpp-client._tcp SRV record and opens TCP 5222 with an XML stream header." },
      { es: "STARTTLS eleva la conexión a TLS y SASL (por ejemplo, SCRAM-SHA-1) autentica al usuario.", en: "STARTTLS upgrades the connection to TLS and SASL (e.g. SCRAM-SHA-1) authenticates the user." },
      { es: "Resource binding asigna el JID completo; el cliente pide el roster con <iq/> y anuncia <presence/>.", en: "Resource binding assigns the full JID; the client fetches the roster with <iq/> and announces <presence/>." },
      { es: "Un <message/> a un usuario de otro dominio viaja por la conexión servidor-servidor en TCP 5269.", en: "A <message/> to a user on another domain travels over the server-to-server connection on TCP 5269." },
    ],
    facts: [
      { label: { es: "Puertos", en: "Ports" }, value: { es: "TCP 5222 (C2S), TCP 5269 (S2S)", en: "TCP 5222 (C2S), TCP 5269 (S2S)" } },
      { label: { es: "Formato", en: "Format" }, value: { es: "Flujos XML", en: "XML streams" } },
      { label: { es: "Stanzas", en: "Stanzas" }, value: "message, presence, iq" },
      { label: { es: "Direccionamiento", en: "Addressing" }, value: "JID (localpart@domain/resource)" },
      { label: { es: "Extensiones", en: "Extensions" }, value: { es: "XEPs de la XMPP Standards Foundation", en: "XEPs from the XMPP Standards Foundation" } },
    ],
    security: {
      es: "TLS protege cada salto cliente-servidor y servidor-servidor, pero los servidores pueden leer los mensajes; para confidencialidad de extremo a extremo se usa OMEMO. Los analizadores XML deben rechazar construcciones peligrosas como entidades externas o expansiones masivas (\"billion laughs\"), y las federaciones abiertas atraen spam, por lo que los servidores aplican límites y listas de bloqueo.",
      en: "TLS protects each client-server and server-server hop, but servers can read the messages; OMEMO provides end-to-end confidentiality. XML parsers must reject dangerous constructs such as external entities or massive expansions (\"billion laughs\"), and open federation attracts spam, so servers apply rate limits and blocklists.",
    },
    tools: [
      { command: "dig +short SRV _xmpp-client._tcp.jabber.org", description: { es: "Descubre el servidor XMPP de un dominio", en: "Discovers a domain's XMPP server" } },
      { command: "openssl s_client -connect jabber.org:5222 -starttls xmpp", description: { es: "Prueba STARTTLS y muestra el certificado del servidor", en: "Tests STARTTLS and shows the server certificate" } },
    ],
    wireshark: "xmpp",
    relations: { dependsOn: ["tcp", "tls", "xml", "dns"] },
    specs: [
      { id: "RFC 6120", title: { es: "XMPP: núcleo", en: "Extensible Messaging and Presence Protocol (XMPP): Core" }, url: rfc(6120) },
      { id: "RFC 6121", title: { es: "XMPP: mensajería instantánea y presencia", en: "Extensible Messaging and Presence Protocol (XMPP): Instant Messaging and Presence" }, url: rfc(6121) },
      { id: "RFC 3920", title: { es: "XMPP: núcleo (versión original)", en: "Extensible Messaging and Presence Protocol (XMPP): Core" }, url: rfc(3920) },
    ],
  },
  {
    id: "bgp",
    acronym: "BGP",
    fullName: { es: "Protocolo de Puerta de Enlace de Frontera", en: "Border Gateway Protocol" },
    osi: [7, 3],
    category: "routing",
    status: "current",
    bodies: ["IETF"],
    year: 1989,
    identifiers: ["TCP 179"],
    summary: {
      es: "BGP es el protocolo con el que las grandes redes que forman Internet (proveedores, nubes, universidades) se anuncian mutuamente qué direcciones IP alcanzan. Decide por qué redes viaja tu tráfico entre continentes; sin él, Internet serían islas aisladas.",
      en: "BGP is the protocol the large networks that make up the Internet (ISPs, clouds, universities) use to tell each other which IP addresses they can reach. It decides which networks your traffic crosses between continents; without it, the Internet would be isolated islands.",
    },
    analogy: {
      es: "Como un sistema de carreteras entre países en el que cada país publica a qué ciudades se llega a través de él y por cuántas fronteras se pasa; cada país elige la ruta según distancia y según sus acuerdos comerciales.",
      en: "Like a road system between countries where each country publishes which cities can be reached through it and how many borders you cross; each country picks routes by distance and by its commercial agreements.",
    },
    everyday: {
      es: "Cada vez que visitas un sitio en otro país, BGP ya eligió el camino entre tu proveedor y el del sitio. Las caídas globales de servicios, como la de Facebook en 2021, a menudo tienen origen en errores de BGP.",
      en: "Every time you visit a site in another country, BGP has already chosen the path between your ISP and the site's. Global outages, such as Facebook's in 2021, often originate in BGP mistakes.",
    },
    technical: [
      {
        es: "BGP es un protocolo de vector de rutas (path-vector) entre sistemas autónomos (AS), cada uno identificado por un número de AS; desde RFC 6793 son de 4 bytes. Cada anuncio incluye el prefijo y el atributo AS_PATH con la lista de AS atravesados, lo que evita bucles: un router descarta rutas que ya contienen su propio AS. eBGP se usa entre AS distintos e iBGP dentro del mismo AS, que requiere malla completa o reflectores de rutas (RFC 4456).",
        en: "BGP is a path-vector protocol between autonomous systems (ASes), each identified by an AS number; since RFC 6793 they are 4 bytes. Each advertisement carries the prefix and the AS_PATH attribute listing the ASes traversed, which prevents loops: a router discards routes that already contain its own AS. eBGP runs between different ASes and iBGP within one AS, which requires a full mesh or route reflectors (RFC 4456).",
      },
      {
        es: "Los vecinos (peers) se configuran manualmente y se conectan por TCP 179. Hay cuatro mensajes base: OPEN (versión, AS, hold time, capacidades), UPDATE (anuncia o retira prefijos con sus atributos), KEEPALIVE (por defecto cada 30 s, con hold time de 90 s) y NOTIFICATION (error y cierre). Las actualizaciones son incrementales: tras el intercambio inicial solo se envían cambios. MP-BGP (RFC 4760) extiende BGP a IPv6, VPN MPLS y EVPN.",
        en: "Neighbours (peers) are configured manually and connect over TCP 179. There are four base messages: OPEN (version, AS, hold time, capabilities), UPDATE (advertises or withdraws prefixes with their attributes), KEEPALIVE (every 30 s by default, with a 90 s hold time) and NOTIFICATION (error and teardown). Updates are incremental: after the initial exchange only changes are sent. MP-BGP (RFC 4760) extends BGP to IPv6, MPLS VPNs and EVPN.",
      },
      {
        es: "La selección de la mejor ruta es una política, no una métrica única: se prefiere el mayor LOCAL_PREF, luego el AS_PATH más corto, el menor ORIGIN, el menor MED, eBGP sobre iBGP y el menor costo IGP hacia el siguiente salto, entre otros desempates. BGP-1 apareció en RFC 1105 (1989), BGP-4 en RFC 1771 (1995) y la especificación vigente es RFC 4271 (2006). La tabla global IPv4 ronda ya el millón de prefijos.",
        en: "Best-path selection is a policy, not a single metric: highest LOCAL_PREF is preferred, then shortest AS_PATH, lowest ORIGIN, lowest MED, eBGP over iBGP and lowest IGP cost to the next hop, among other tie-breakers. BGP-1 appeared in RFC 1105 (1989), BGP-4 in RFC 1771 (1995) and the current specification is RFC 4271 (2006). The global IPv4 table is now around one million prefixes.",
      },
    ],
    howItWorks: [
      { es: "Los routers abren una sesión TCP 179 con cada vecino configurado.", en: "Routers open a TCP 179 session with each configured neighbour." },
      { es: "OPEN: intercambian número de AS, router ID, hold time y capacidades (4-byte AS, MP-BGP…); KEEPALIVE confirma y la sesión pasa a Established.", en: "OPEN: they exchange AS number, router ID, hold time and capabilities (4-byte AS, MP-BGP…); a KEEPALIVE confirms and the session becomes Established." },
      { es: "UPDATE: se envían todas las rutas permitidas por la política de salida; después, solo cambios y retiros.", en: "UPDATE: all routes allowed by the outbound policy are sent; afterwards, only changes and withdrawals." },
      { es: "Cada router aplica su política de entrada, elige la mejor ruta por prefijo y la instala en la tabla de enrutamiento IP.", en: "Each router applies its inbound policy, picks the best path per prefix and installs it in the IP routing table." },
      { es: "Un error provoca NOTIFICATION y el cierre; perder KEEPALIVE durante el hold time retira todas las rutas del vecino.", en: "An error triggers a NOTIFICATION and teardown; missing KEEPALIVEs for the hold time withdraws all of the neighbour's routes." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: "TCP 179" },
      { label: { es: "Tipo", en: "Type" }, value: { es: "Vector de rutas (path-vector), EGP", en: "Path-vector, EGP" } },
      { label: { es: "Números de AS", en: "AS numbers" }, value: { es: "4 bytes (RFC 6793)", en: "4 bytes (RFC 6793)" } },
      { label: { es: "Mensajes", en: "Messages" }, value: "OPEN, UPDATE, KEEPALIVE, NOTIFICATION" },
      { label: { es: "Temporizadores por defecto", en: "Default timers" }, value: { es: "Keepalive 30 s, hold time 90 s", en: "Keepalive 30 s, hold time 90 s" } },
      { label: { es: "Atributos de decisión", en: "Decision attributes" }, value: "LOCAL_PREF, AS_PATH, ORIGIN, MED" },
    ],
    security: {
      es: "BGP confía en lo que anuncian los vecinos: un AS puede anunciar prefijos ajenos (secuestro de rutas, como el de YouTube por Pakistan Telecom en 2008) o propagar rutas que no debía (fugas de rutas). RPKI con validación de origen (ROV, RFC 6811) comprueba que el AS que origina un prefijo esté autorizado mediante ROAs firmadas; BGPsec (RFC 8205) firma el AS_PATH completo, pero apenas se ha desplegado. Las sesiones se protegen con filtros de prefijos, TCP-AO o MD5 y GTSM.",
      en: "BGP trusts what neighbours announce: an AS can advertise someone else's prefixes (route hijacking, like Pakistan Telecom's YouTube hijack in 2008) or propagate routes it should not (route leaks). RPKI Route Origin Validation (ROV, RFC 6811) checks that the originating AS is authorised through signed ROAs; BGPsec (RFC 8205) signs the whole AS_PATH but is barely deployed. Sessions are protected with prefix filters, TCP-AO or MD5, and GTSM.",
    },
    multiLayerNote: {
      es: "BGP es, técnicamente, una aplicación: corre sobre TCP en el puerto 179 y confía en él para la entrega confiable, así que sus mensajes viajan como cualquier protocolo de capa 7. Pero su propósito es construir las tablas de enrutamiento de la capa 3, y por eso se estudia junto con OSPF o IS-IS como protocolo de enrutamiento del plano de control de red.",
      en: "BGP is technically an application: it runs over TCP on port 179 and relies on it for reliable delivery, so its messages travel like any layer 7 protocol. But its purpose is to build layer 3 routing tables, which is why it is studied alongside OSPF or IS-IS as a routing protocol of the network control plane.",
    },
    tools: [
      { command: "vtysh -c \"show bgp summary\"", description: { es: "Estado de las sesiones BGP y prefijos recibidos (FRRouting)", en: "BGP session state and received prefixes (FRRouting)" } },
      { command: "show ip bgp 8.8.8.0/24", description: { es: "Rutas y atributos para un prefijo (Cisco IOS y looking glasses)", en: "Paths and attributes for a prefix (Cisco IOS and looking glasses)" } },
      { command: "whois -h whois.radb.net AS15169", description: { es: "Consulta la información de enrutamiento registrada de un AS", en: "Queries an AS's registered routing information" } },
    ],
    wireshark: "bgp",
    relations: { dependsOn: ["tcp"], usedBy: ["mpls"] },
    specs: [
      { id: "RFC 4271", title: { es: "A Border Gateway Protocol 4 (BGP-4)", en: "A Border Gateway Protocol 4 (BGP-4)" }, url: rfc(4271) },
      { id: "RFC 4760", title: { es: "Extensiones multiprotocolo para BGP-4", en: "Multiprotocol Extensions for BGP-4" }, url: rfc(4760) },
      { id: "RFC 6793", title: { es: "Soporte de BGP para números de AS de 4 octetos", en: "BGP Support for Four-Octet Autonomous System (AS) Number Space" }, url: rfc(6793) },
      { id: "RFC 6811", title: { es: "Validación de origen de prefijos BGP (RPKI ROV)", en: "BGP Prefix Origin Validation" }, url: rfc(6811) },
      { id: "RFC 8205", title: { es: "Especificación del protocolo BGPsec", en: "BGPsec Protocol Specification" }, url: rfc(8205) },
    ],
  },
];
