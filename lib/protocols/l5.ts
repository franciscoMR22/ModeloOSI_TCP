import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L5_PROTOCOLS: Protocol[] = [
  {
    id: "onc-rpc",
    acronym: "ONC RPC",
    fullName: { es: "Llamada a Procedimiento Remoto de Open Network Computing (Sun RPC)", en: "Open Network Computing Remote Procedure Call (Sun RPC)" },
    osi: [5],
    category: "rpc",
    status: "current",
    bodies: ["IETF"],
    year: 1988,
    identifiers: ["TCP 111", "UDP 111 (rpcbind/portmapper)"],
    summary: {
      es: "ONC RPC permite que un programa ejecute una función en otra máquina como si fuera local: envía el nombre de la función y sus argumentos, y recibe el resultado. Sun lo creó en los años 80 y sigue siendo la base de NFS.",
      en: "ONC RPC lets a program run a function on another machine as if it were local: it sends the function's identifier and arguments and receives the result. Sun created it in the 1980s and it still underpins NFS.",
    },
    analogy: {
      es: "Como llamar a un conmutador: primero preguntas en qué extensión atiende el departamento (rpcbind), luego llamas y pides el trámite por su número.",
      en: "Like calling a switchboard: first you ask which extension the department is on (rpcbind), then you call and request the service by its number.",
    },
    everyday: {
      es: "Montar carpetas NFS en servidores Linux y Unix, y servicios clásicos como NIS o el demonio de montaje mountd.",
      en: "Mounting NFS shares on Linux and Unix servers, and classic services such as NIS or the mountd mount daemon.",
    },
    technical: [
      {
        es: "Cada servicio se identifica con un número de programa, uno de versión y uno de procedimiento; por ejemplo, 100000 es rpcbind, 100003 es NFS y 100005 es mountd. Un mensaje CALL lleva un identificador de transacción (xid), la versión de RPC (2), esos tres números, credenciales y un verificador; el REPLY indica si la llamada fue aceptada o rechazada y devuelve los resultados. Argumentos y resultados se serializan en XDR.",
        en: "Each service is identified by a program number, a version number and a procedure number; for example, 100000 is rpcbind, 100003 is NFS and 100005 is mountd. A CALL message carries a transaction ID (xid), the RPC version (2), those three numbers, credentials and a verifier; the REPLY states whether the call was accepted or denied and returns the results. Arguments and results are serialised in XDR.",
      },
      {
        es: "Puede ir sobre UDP o TCP; sobre TCP usa record marking, un encabezado de 4 bytes por fragmento con un bit de «último fragmento». Como los servicios suelen escuchar en puertos dinámicos, el cliente consulta primero a rpcbind (portmapper) en el puerto 111 (RFC 1833). NFSv4 evita este paso usando el puerto fijo 2049.",
        en: "It can run over UDP or TCP; over TCP it uses record marking, a 4-byte header per fragment with a \"last fragment\" bit. Because services usually listen on dynamic ports, the client first asks rpcbind (portmapper) on port 111 (RFC 1833). NFSv4 avoids this step by using the fixed port 2049.",
      },
      {
        es: "La especificación original es RFC 1057 (1988), revisada en RFC 1831 (1995); la vigente es RFC 5531 (2009). Se suele ubicar en L5 porque gestiona el diálogo petición-respuesta entre procesos, pero en la práctica es una biblioteca dentro de la aplicación, sin una capa propia en TCP/IP.",
        en: "The original specification is RFC 1057 (1988), revised in RFC 1831 (1995); the current one is RFC 5531 (2009). It is usually placed at L5 because it manages the request-response dialogue between processes, but in practice it is a library inside the application, with no layer of its own in TCP/IP.",
      },
    ],
    howItWorks: [
      { es: "El cliente pregunta a rpcbind (puerto 111) en qué puerto escucha el programa y la versión deseados.", en: "The client asks rpcbind (port 111) which port the desired program and version listen on." },
      { es: "rpcbind responde con el puerto dinámico registrado por el servicio.", en: "rpcbind replies with the dynamic port the service registered." },
      { es: "El cliente envía un CALL con xid, programa, versión, procedimiento, credenciales y argumentos en XDR.", en: "The client sends a CALL with xid, program, version, procedure, credentials and XDR-encoded arguments." },
      { es: "El servidor ejecuta el procedimiento y devuelve un REPLY con el mismo xid y el resultado.", en: "The server runs the procedure and returns a REPLY with the same xid and the result." },
    ],
    facts: [
      { label: { es: "Versión del protocolo", en: "Protocol version" }, value: "RPC v2 (RFC 5531)" },
      { label: { es: "Serialización", en: "Serialisation" }, value: "XDR (RFC 4506)" },
      { label: { es: "Identificación", en: "Addressing" }, value: { es: "Programa / versión / procedimiento", en: "Program / version / procedure" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: "AUTH_NONE, AUTH_SYS, RPCSEC_GSS" },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "UDP o TCP (con record marking)", en: "UDP or TCP (with record marking)" } },
    ],
    security: {
      es: "AUTH_SYS confía en el UID y GID que declara el cliente, así que cualquiera con acceso de red puede suplantar usuarios; RPCSEC_GSS (RFC 2203) con Kerberos aporta autenticación real e incluso cifrado. rpcbind expuesto a Internet revela servicios internos y se ha usado para ataques de amplificación por UDP. Debe filtrarse el puerto 111 en el perímetro.",
      en: "AUTH_SYS trusts the UID and GID the client claims, so anyone with network access can impersonate users; RPCSEC_GSS (RFC 2203) with Kerberos provides real authentication and even encryption. An Internet-exposed rpcbind reveals internal services and has been abused for UDP amplification attacks. Port 111 should be filtered at the perimeter.",
    },
    tools: [
      { command: "rpcinfo -p servidor", description: { es: "Lista los programas RPC registrados y sus puertos", en: "Lists registered RPC programs and their ports" } },
      { command: "showmount -e servidor", description: { es: "Muestra las exportaciones NFS vía mountd", en: "Shows NFS exports via mountd" } },
    ],
    wireshark: "rpc",
    relations: { dependsOn: ["xdr", "tcp", "udp"], usedBy: ["nfs"] },
    specs: [
      { id: "RFC 5531", title: { es: "RPC: especificación del protocolo versión 2", en: "RPC: Remote Procedure Call Protocol Specification Version 2" }, url: rfc(5531) },
      { id: "RFC 1833", title: { es: "Protocolos de enlace (binding) para ONC RPC v2", en: "Binding Protocols for ONC RPC Version 2" }, url: rfc(1833) },
      { id: "RFC 2203", title: { es: "Especificación del protocolo RPCSEC_GSS", en: "RPCSEC_GSS Protocol Specification" }, url: rfc(2203) },
    ],
  },
  {
    id: "netbios",
    acronym: "NetBIOS",
    fullName: { es: "NetBIOS sobre TCP/IP (NBT)", en: "NetBIOS over TCP/IP (NBT)" },
    osi: [5],
    category: "session",
    status: "legacy",
    bodies: ["IETF"],
    year: 1987,
    identifiers: ["UDP 137 (NBNS)", "UDP 138 (NBDS)", "TCP 139 (NBSS)"],
    summary: {
      es: "NetBIOS es una antigua interfaz que permitía a los equipos de una red local encontrarse por nombre y abrir sesiones entre sí. Windows la usó durante años para compartir archivos e impresoras; hoy la reemplazan DNS y SMB directo sobre TCP.",
      en: "NetBIOS is an old interface that let computers on a local network find each other by name and open sessions. Windows used it for years for file and printer sharing; today DNS and SMB directly over TCP replace it.",
    },
    everyday: {
      es: "Los nombres de equipo que aparecían en «Entorno de red» de Windows y los recursos \\\\EQUIPO compartidos en redes antiguas.",
      en: "The computer names that showed up in Windows \"Network Neighborhood\" and \\\\COMPUTER shares on older networks.",
    },
    technical: [
      {
        es: "NetBIOS nació en 1983 como API de IBM y Sytek para redes locales, no como protocolo de cable. RFC 1001 y RFC 1002 (1987) lo adaptaron a TCP/IP con tres servicios: nombres (NBNS, UDP 137), datagramas (UDP 138) y sesión (TCP 139). Los nombres tienen 16 bytes: 15 caracteres más un sufijo que indica el tipo de servicio, como <00> estación de trabajo o <20> servidor de archivos.",
        en: "NetBIOS was born in 1983 as an IBM and Sytek API for local networks, not as a wire protocol. RFC 1001 and RFC 1002 (1987) adapted it to TCP/IP with three services: name (NBNS, UDP 137), datagram (UDP 138) and session (TCP 139). Names are 16 bytes: 15 characters plus a suffix giving the service type, such as <00> workstation or <20> file server.",
      },
      {
        es: "La resolución de nombres puede hacerse por broadcast (nodo B), consultando un servidor de nombres (nodo P, en Windows el servidor WINS) o combinando ambos (nodos M y H). El servicio de sesión abre una conexión TCP al puerto 139, envía un SESSION REQUEST con los nombres llamado y llamante, y a partir de ahí transporta mensajes SMB.",
        en: "Name resolution can use broadcast (B-node), query a name server (P-node; in Windows, the WINS server) or combine both (M- and H-nodes). The session service opens a TCP connection to port 139, sends a SESSION REQUEST with the called and calling names, and from then on carries SMB messages.",
      },
      {
        es: "Desde Windows 2000, SMB puede ir directamente sobre TCP 445 sin NetBIOS (direct hosting), y los nombres se resuelven con DNS. Su servicio de sesión es uno de los pocos ejemplos reales de algo parecido a una capa de sesión dentro de TCP/IP.",
        en: "Since Windows 2000, SMB can run directly over TCP 445 without NetBIOS (direct hosting), and names are resolved with DNS. Its session service is one of the few real examples of something resembling a session layer within TCP/IP.",
      },
    ],
    facts: [
      { label: { es: "Nombres", en: "Names" }, value: { es: "16 B (15 caracteres + sufijo de servicio)", en: "16 B (15 characters + service suffix)" } },
      { label: { es: "Servicios", en: "Services" }, value: { es: "Nombres, datagramas y sesión", en: "Name, datagram and session" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Red local (broadcast) o WINS", en: "Local network (broadcast) or WINS" } },
      { label: { es: "Sucesor", en: "Successor" }, value: { es: "SMB directo en TCP 445 + DNS", en: "Direct SMB on TCP 445 + DNS" } },
    ],
    security: {
      es: "La resolución por broadcast no se autentica: herramientas como Responder contestan las consultas NBT-NS (y LLMNR) para hacerse pasar por el equipo buscado y capturar hashes NTLM. Exponer los puertos 137–139 a Internet filtra nombres de equipos, dominios y usuarios. La recomendación es desactivar NetBIOS sobre TCP/IP donde no se necesite y bloquear esos puertos en el perímetro.",
      en: "Broadcast resolution is unauthenticated: tools such as Responder answer NBT-NS (and LLMNR) queries to impersonate the requested host and capture NTLM hashes. Exposing ports 137–139 to the Internet leaks host, domain and user names. The recommendation is to disable NetBIOS over TCP/IP where not needed and block those ports at the perimeter.",
    },
    tools: [
      { command: "nbtstat -A 192.168.1.10", description: { es: "Consulta la tabla de nombres NetBIOS de un equipo (Windows)", en: "Queries a host's NetBIOS name table (Windows)" } },
      { command: "nmblookup -A 192.168.1.10", description: { es: "Lo mismo desde Linux con Samba", en: "Same from Linux with Samba" } },
      { command: "nmap -sU -p 137 --script nbstat 192.168.1.0/24", description: { es: "Enumera nombres NetBIOS en una subred", en: "Enumerates NetBIOS names on a subnet" } },
    ],
    wireshark: "nbns || nbss || nbdgm",
    relations: { dependsOn: ["tcp", "udp"], usedBy: ["smb"], replacedBy: ["dns"] },
    specs: [
      { id: "RFC 1001", title: { es: "NetBIOS sobre TCP/UDP: conceptos y métodos", en: "Protocol Standard for a NetBIOS Service on a TCP/UDP Transport: Concepts and Methods" }, url: rfc(1001) },
      { id: "RFC 1002", title: { es: "NetBIOS sobre TCP/UDP: especificaciones detalladas", en: "Protocol Standard for a NetBIOS Service on a TCP/UDP Transport: Detailed Specifications" }, url: rfc(1002) },
    ],
  },
  {
    id: "socks5",
    acronym: "SOCKS5",
    fullName: { es: "Protocolo SOCKS versión 5", en: "SOCKS Protocol Version 5" },
    osi: [5],
    category: "proxy",
    status: "current",
    bodies: ["IETF"],
    year: 1996,
    identifiers: ["TCP 1080"],
    summary: {
      es: "SOCKS5 es un protocolo de proxy genérico: el cliente le pide al proxy que se conecte en su nombre a cualquier servidor y puerto, y luego el proxy reenvía los datos sin interpretarlos. Sirve para cualquier aplicación, no solo para la web.",
      en: "SOCKS5 is a generic proxy protocol: the client asks the proxy to connect on its behalf to any server and port, and the proxy then relays the data without interpreting it. It works for any application, not just the web.",
    },
    analogy: {
      es: "Como pedirle a un intermediario que marque un número por ti y luego te pase la llamada: quien contesta solo ve al intermediario.",
      en: "Like asking an intermediary to dial a number for you and then hand you the call: the person answering only sees the intermediary.",
    },
    everyday: {
      es: "Navegar a través de un túnel SSH (ssh -D), el navegador Tor y proxies corporativos para aplicaciones que no son web.",
      en: "Browsing through an SSH tunnel (ssh -D), the Tor Browser, and corporate proxies for non-web applications.",
    },
    technical: [
      {
        es: "Tras abrir una conexión TCP al proxy, el cliente ofrece métodos de autenticación (0x00 sin autenticación, 0x01 GSSAPI, 0x02 usuario/contraseña según RFC 1929) y el servidor elige uno. Después envía una petición con el comando y el destino, expresado como IPv4, IPv6 o nombre de dominio; en este último caso la resolución DNS la hace el proxy, lo que evita fugas de DNS del cliente.",
        en: "After opening a TCP connection to the proxy, the client offers authentication methods (0x00 no authentication, 0x01 GSSAPI, 0x02 username/password per RFC 1929) and the server picks one. It then sends a request with the command and the destination, given as IPv4, IPv6 or a domain name; in the latter case the proxy performs the DNS resolution, avoiding client-side DNS leaks.",
      },
      {
        es: "Hay tres comandos: CONNECT abre una conexión TCP saliente, BIND espera una conexión entrante (pensado para el modo activo de FTP) y UDP ASSOCIATE establece un relé UDP donde cada datagrama lleva una pequeña cabecera con su destino. SOCKS4 no tenía RFC ni soportaba IPv6, UDP o autenticación real; SOCKS5 se publicó como RFC 1928 en 1996.",
        en: "There are three commands: CONNECT opens an outbound TCP connection, BIND waits for an inbound connection (intended for active-mode FTP) and UDP ASSOCIATE sets up a UDP relay in which each datagram carries a small header with its destination. SOCKS4 had no RFC and did not support IPv6, UDP or real authentication; SOCKS5 was published as RFC 1928 in 1996.",
      },
      {
        es: "Se le asigna a L5 de forma convencional porque interviene entre el transporte y la aplicación, estableciendo la «sesión» con el destino, pero en realidad es un protocolo de aplicación sobre TCP que la aplicación o su biblioteca de red deben soportar.",
        en: "It is conventionally assigned to L5 because it sits between transport and application, setting up the \"session\" to the destination, but it is really an application protocol over TCP that the application or its networking library must support.",
      },
    ],
    howItWorks: [
      { es: "Saludo: el cliente envía la versión (5) y la lista de métodos de autenticación que admite.", en: "Greeting: the client sends the version (5) and the list of authentication methods it supports." },
      { es: "El proxy elige un método (o 0xFF si ninguno es aceptable) y, si aplica, se autentica al cliente.", en: "The proxy picks a method (or 0xFF if none is acceptable) and, if required, the client authenticates." },
      { es: "Petición: CONNECT, BIND o UDP ASSOCIATE con el tipo de dirección, el destino y el puerto.", en: "Request: CONNECT, BIND or UDP ASSOCIATE with the address type, destination and port." },
      { es: "Respuesta: el código 0x00 indica éxito; desde ese momento el proxy reenvía los bytes en ambos sentidos.", en: "Reply: code 0x00 means success; from then on the proxy relays bytes in both directions." },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: "TCP 1080" },
      { label: { es: "Comandos", en: "Commands" }, value: "CONNECT, BIND, UDP ASSOCIATE" },
      { label: { es: "Direcciones", en: "Addresses" }, value: { es: "IPv4, IPv6 o nombre de dominio", en: "IPv4, IPv6 or domain name" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Ninguna, GSSAPI o usuario/contraseña", en: "None, GSSAPI or username/password" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "No", en: "No" } },
    ],
    security: {
      es: "SOCKS5 no cifra nada: el usuario y la contraseña de RFC 1929 viajan en claro, igual que los datos si la aplicación no usa TLS. Un proxy SOCKS abierto se abusa para spam, fraude y para ocultar el origen de ataques, así que debe exigir autenticación o limitarse a localhost, como hacen ssh -D y Tor.",
      en: "SOCKS5 encrypts nothing: the RFC 1929 username and password travel in cleartext, as does the data unless the application uses TLS. An open SOCKS proxy gets abused for spam, fraud and hiding the origin of attacks, so it must require authentication or be bound to localhost, as ssh -D and Tor do.",
    },
    tools: [
      { command: "ssh -D 1080 usuario@servidor", description: { es: "Crea un proxy SOCKS local que sale por el servidor SSH", en: "Creates a local SOCKS proxy exiting through the SSH server" } },
      { command: "curl --socks5-hostname 127.0.0.1:1080 https://example.com", description: { es: "Usa el proxy y delega la resolución DNS en él", en: "Uses the proxy and lets it resolve DNS" } },
    ],
    wireshark: "socks",
    relations: { dependsOn: ["tcp", "udp"], usedBy: ["ssh"] },
    specs: [
      { id: "RFC 1928", title: { es: "Protocolo SOCKS versión 5", en: "SOCKS Protocol Version 5" }, url: rfc(1928) },
      { id: "RFC 1929", title: { es: "Autenticación usuario/contraseña para SOCKS V5", en: "Username/Password Authentication for SOCKS V5" }, url: rfc(1929) },
      { id: "RFC 1961", title: { es: "Autenticación GSS-API para SOCKS V5", en: "GSS-API Authentication Method for SOCKS Version 5" }, url: rfc(1961) },
    ],
  },
  {
    id: "pptp",
    acronym: "PPTP",
    fullName: { es: "Protocolo de Túnel Punto a Punto", en: "Point-to-Point Tunneling Protocol" },
    osi: [5],
    category: "tunneling",
    status: "deprecated",
    bodies: ["IETF", "Microsoft"],
    year: 1999,
    identifiers: ["TCP 1723", "IP protocol 47 (GRE)"],
    summary: {
      es: "PPTP fue uno de los primeros protocolos de VPN, muy popular por venir integrado en Windows. Hoy se considera inseguro: su autenticación y cifrado pueden romperse, y no debe usarse.",
      en: "PPTP was one of the first VPN protocols, hugely popular because it came built into Windows. Today it is considered insecure: its authentication and encryption can be broken, and it should not be used.",
    },
    everyday: {
      es: "Aparece aún en routers y sistemas antiguos; Apple lo retiró de iOS y macOS en 2016.",
      en: "It still shows up in old routers and systems; Apple removed it from iOS and macOS in 2016.",
    },
    technical: [
      {
        es: "PPTP usa dos canales: una conexión de control TCP al puerto 1723 para crear, mantener y cerrar el túnel (Start-Control-Connection, Outgoing-Call, Echo, Call-Clear) y un canal de datos que encapsula tramas PPP en una versión mejorada de GRE (protocolo IP 47). El Call ID viaja en el campo de clave de GRE para distinguir las sesiones.",
        en: "PPTP uses two channels: a TCP control connection to port 1723 to create, maintain and tear down the tunnel (Start-Control-Connection, Outgoing-Call, Echo, Call-Clear), and a data channel that encapsulates PPP frames in an enhanced version of GRE (IP protocol 47). The Call ID travels in the GRE key field to tell sessions apart.",
      },
      {
        es: "Lo desarrolló un consorcio encabezado por Microsoft, que lo incluyó en Windows NT 4.0, y se publicó como RFC 2637 (1999) de carácter informativo, no como estándar. PPTP no cifra por sí mismo: la confidencialidad la aporta MPPE (RFC 3078), basado en RC4, con claves derivadas de la autenticación MS-CHAPv2. Como GRE no tiene puertos, atravesar NAT requiere soporte específico («PPTP passthrough»).",
        en: "It was developed by a Microsoft-led consortium, which shipped it in Windows NT 4.0, and was published as Informational RFC 2637 (1999), not as a standard. PPTP does not encrypt by itself: confidentiality comes from MPPE (RFC 3078), based on RC4, with keys derived from MS-CHAPv2 authentication. Because GRE has no ports, traversing NAT requires specific support (\"PPTP passthrough\").",
      },
    ],
    facts: [
      { label: { es: "Control", en: "Control" }, value: "TCP 1723" },
      { label: { es: "Datos", en: "Data" }, value: { es: "PPP sobre GRE mejorado (IP 47)", en: "PPP over enhanced GRE (IP 47)" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "MPPE (RC4), débil", en: "MPPE (RC4), weak" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "MS-CHAPv2 (rota)", en: "MS-CHAPv2 (broken)" } },
      { label: { es: "Tipo de RFC", en: "RFC status" }, value: { es: "Informativo", en: "Informational" } },
    ],
    security: {
      es: "En 2012 se demostró que cualquier intercambio MS-CHAPv2 capturado se reduce a romper una sola clave DES de 56 bits, lo que permite recuperar la contraseña y descifrar la sesión MPPE; Microsoft desaconsejó su uso al año siguiente. RC4 también está roto. Debe reemplazarse por IPsec/IKEv2, WireGuard o una VPN basada en TLS.",
      en: "In 2012 it was shown that any captured MS-CHAPv2 exchange reduces to cracking a single 56-bit DES key, which recovers the password and decrypts the MPPE session; Microsoft advised against its use the following year. RC4 is also broken. It should be replaced by IPsec/IKEv2, WireGuard or a TLS-based VPN.",
    },
    tools: [
      { command: "nmap -p 1723 --script pptp-version servidor", description: { es: "Detecta un servidor PPTP y su fabricante", en: "Detects a PPTP server and its vendor" } },
    ],
    wireshark: "pptp || gre",
    relations: { dependsOn: ["tcp", "gre", "ppp"], replacedBy: ["ipsec", "l2tp"] },
    specs: [
      { id: "RFC 2637", title: { es: "Point-to-Point Tunneling Protocol (PPTP)", en: "Point-to-Point Tunneling Protocol (PPTP)" }, url: rfc(2637) },
      { id: "RFC 3078", title: { es: "Microsoft Point-To-Point Encryption (MPPE)", en: "Microsoft Point-To-Point Encryption (MPPE) Protocol" }, url: rfc(3078) },
    ],
  },
  {
    id: "l2tp",
    acronym: "L2TP",
    fullName: { es: "Protocolo de Túnel de Capa 2", en: "Layer 2 Tunneling Protocol" },
    osi: [5, 2],
    category: "tunneling",
    status: "current",
    bodies: ["IETF"],
    year: 1999,
    identifiers: ["UDP 1701", "IP protocol 115 (L2TPv3)"],
    summary: {
      es: "L2TP crea túneles que transportan conexiones de capa 2 (como PPP) a través de una red IP. No cifra nada por sí mismo, por eso casi siempre se combina con IPsec en la conocida VPN «L2TP/IPsec».",
      en: "L2TP builds tunnels that carry layer-2 connections (such as PPP) across an IP network. It encrypts nothing by itself, which is why it is almost always combined with IPsec in the well-known \"L2TP/IPsec\" VPN.",
    },
    everyday: {
      es: "VPN de acceso remoto integradas en Windows, macOS y Android, y redes de proveedores de Internet que llevan las sesiones PPP de sus clientes hasta un concentrador.",
      en: "Remote-access VPNs built into Windows, macOS and Android, and ISP networks that carry their customers' PPP sessions to a concentrator.",
    },
    technical: [
      {
        es: "L2TP combina ideas de L2F (Cisco) y PPTP. Un LAC (concentrador de acceso) y un LNS (servidor de red) establecen un túnel dentro del cual viajan una o varias sesiones, cada una normalmente una conexión PPP. Los mensajes de control (SCCRQ, SCCRP, SCCCN para el túnel; ICRQ, ICRP, ICCN para las sesiones; HELLO para mantenerlo vivo) se entregan de forma confiable con números de secuencia Ns/Nr y se codifican como AVP.",
        en: "L2TP combines ideas from L2F (Cisco) and PPTP. A LAC (access concentrator) and an LNS (network server) establish a tunnel carrying one or more sessions, each normally a PPP connection. Control messages (SCCRQ, SCCRP, SCCCN for the tunnel; ICRQ, ICRP, ICCN for sessions; HELLO as keepalive) are delivered reliably with Ns/Nr sequence numbers and encoded as AVPs.",
      },
      {
        es: "L2TPv2 (RFC 2661, 1999) viaja sobre UDP 1701 y está ligado a PPP. L2TPv3 (RFC 3931, 2005) generaliza el túnel para transportar otros protocolos de capa 2, como Ethernet, en pseudowires entre proveedores, y puede ir directamente sobre IP (protocolo 115).",
        en: "L2TPv2 (RFC 2661, 1999) runs over UDP 1701 and is tied to PPP. L2TPv3 (RFC 3931, 2005) generalises the tunnel to carry other layer-2 protocols, such as Ethernet, in pseudowires between providers, and can run directly over IP (protocol 115).",
      },
      {
        es: "Como L2TP no cifra, RFC 3193 (2001) define L2TP/IPsec: primero IKE negocia una asociación de seguridad (UDP 500, o UDP 4500 con NAT traversal) y después ESP en modo transporte protege el tráfico UDP 1701. La autenticación PPP (por ejemplo, MS-CHAPv2) ocurre dentro del túnel ya cifrado.",
        en: "Because L2TP does not encrypt, RFC 3193 (2001) defines L2TP/IPsec: IKE first negotiates a security association (UDP 500, or UDP 4500 with NAT traversal) and then ESP in transport mode protects the UDP 1701 traffic. PPP authentication (e.g. MS-CHAPv2) takes place inside the already encrypted tunnel.",
      },
    ],
    facts: [
      { label: { es: "Puerto", en: "Port" }, value: { es: "UDP 1701 (L2TPv3 también sobre IP 115)", en: "UDP 1701 (L2TPv3 also over IP 115)" } },
      { label: { es: "Carga", en: "Payload" }, value: { es: "PPP (v2); Ethernet y otros (v3)", en: "PPP (v2); Ethernet and others (v3)" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Ninguno; se usa IPsec (RFC 3193)", en: "None; IPsec is used (RFC 3193)" } },
      { label: { es: "Extremos", en: "Endpoints" }, value: "LAC ↔ LNS" },
    ],
    security: {
      es: "L2TP sin IPsec expone todo el tráfico en claro. En L2TP/IPsec, la debilidad típica es una clave precompartida (PSK) común a todos los usuarios, que permite a cualquiera que la conozca montar un servidor falso; son preferibles los certificados. El doble encapsulado añade sobrecarga, y hoy suele preferirse IKEv2 o WireGuard.",
      en: "L2TP without IPsec exposes all traffic in cleartext. In L2TP/IPsec, the typical weakness is a pre-shared key (PSK) common to all users, which lets anyone who knows it set up a rogue server; certificates are preferable. Double encapsulation adds overhead, and IKEv2 or WireGuard are usually preferred today.",
    },
    multiLayerNote: {
      es: "L2TP transporta tramas de capa 2 (PPP o Ethernet) dentro de UDP/IP, así que su carga es L2 mientras que él mismo viaja sobre L4. Por su función de establecer y mantener túneles y sesiones se suele listar en L5, pero esa ubicación es una convención de los libros más que una propiedad del protocolo.",
      en: "L2TP carries layer-2 frames (PPP or Ethernet) inside UDP/IP, so its payload is L2 while it rides on L4 itself. Because it establishes and maintains tunnels and sessions it is usually listed at L5, but that placement is a textbook convention rather than a property of the protocol.",
    },
    tools: [
      { command: "ip l2tp show tunnel", description: { es: "Muestra túneles L2TPv3 configurados en Linux", en: "Shows configured L2TPv3 tunnels on Linux" } },
      { command: "tcpdump -n udp port 1701 or udp port 4500", description: { es: "Captura el tráfico L2TP y L2TP/IPsec con NAT-T", en: "Captures L2TP and NAT-T L2TP/IPsec traffic" } },
    ],
    wireshark: "l2tp",
    relations: { dependsOn: ["udp", "ppp"], replaces: ["pptp"] },
    specs: [
      { id: "RFC 2661", title: { es: "Layer Two Tunneling Protocol «L2TP»", en: "Layer Two Tunneling Protocol \"L2TP\"" }, url: rfc(2661) },
      { id: "RFC 3931", title: { es: "Layer Two Tunneling Protocol versión 3 (L2TPv3)", en: "Layer Two Tunneling Protocol - Version 3 (L2TPv3)" }, url: rfc(3931) },
      { id: "RFC 3193", title: { es: "Protección de L2TP con IPsec", en: "Securing L2TP using IPsec" }, url: rfc(3193) },
    ],
  },
  {
    id: "rtcp",
    acronym: "RTCP",
    fullName: { es: "Protocolo de Control de RTP", en: "RTP Control Protocol" },
    osi: [5, 7],
    category: "session",
    status: "current",
    bodies: ["IETF"],
    year: 1996,
    identifiers: ["UDP (RTP port + 1)"],
    summary: {
      es: "RTCP acompaña a RTP, el protocolo que transporta el audio y el video en tiempo real. Mientras RTP lleva los medios, RTCP informa periódicamente sobre la calidad: cuántos paquetes se perdieron, cuánta variación de retardo hay y cómo sincronizar audio con video.",
      en: "RTCP accompanies RTP, the protocol that carries real-time audio and video. While RTP carries the media, RTCP periodically reports on quality: how many packets were lost, how much delay variation there is, and how to synchronise audio with video.",
    },
    analogy: {
      es: "Si RTP es el camión que reparte, RTCP es el reporte de entregas que envían destinatarios y remitente: qué llegó, qué se perdió y a qué hora.",
      en: "If RTP is the delivery truck, RTCP is the delivery report exchanged by sender and recipients: what arrived, what was lost and when.",
    },
    everyday: {
      es: "Videollamadas (WebRTC, Teams, Zoom), telefonía IP con SIP y cámaras de seguridad con RTSP.",
      en: "Video calls (WebRTC, Teams, Zoom), SIP-based IP telephony and RTSP security cameras.",
    },
    technical: [
      {
        es: "RTP añade a cada paquete de medios un número de secuencia, una marca de tiempo y un identificador de fuente (SSRC). RTCP define paquetes de control: SR (Sender Report, tipo 200) con una marca de tiempo NTP de 64 bits asociada a la de RTP, RR (Receiver Report, 201) con fracción perdida, pérdidas acumuladas, jitter entre llegadas y datos para calcular el RTT, SDES (202) con el CNAME de la fuente, BYE (203) y APP (204).",
        en: "RTP adds a sequence number, a timestamp and a source identifier (SSRC) to each media packet. RTCP defines control packets: SR (Sender Report, type 200) with a 64-bit NTP timestamp tied to the RTP timestamp, RR (Receiver Report, 201) with fraction lost, cumulative loss, interarrival jitter and data to compute the RTT, SDES (202) with the source CNAME, BYE (203) and APP (204).",
      },
      {
        es: "La correspondencia NTP↔RTP de los SR permite sincronizar flujos distintos (lip-sync entre audio y video). El tráfico RTCP se limita al 5 % del ancho de banda de la sesión, con un intervalo que crece con el número de participantes. Tradicionalmente RTP usa un puerto par y RTCP el siguiente impar; RFC 5761 permite multiplexarlos en el mismo puerto, como hace WebRTC. RFC 4585 añade retroalimentación rápida (NACK, PLI) para video.",
        en: "The NTP↔RTP mapping in SRs allows separate streams to be synchronised (lip-sync between audio and video). RTCP traffic is capped at 5 % of session bandwidth, with an interval that grows with the number of participants. Traditionally RTP uses an even port and RTCP the next odd one; RFC 5761 allows multiplexing them on the same port, as WebRTC does. RFC 4585 adds rapid feedback (NACK, PLI) for video.",
      },
      {
        es: "RTP y RTCP se definieron en RFC 1889 (1996) y su especificación vigente es RFC 3550 (2003). SRTP y SRTCP (RFC 3711) añaden cifrado y autenticación; en SRTCP la autenticación es obligatoria.",
        en: "RTP and RTCP were defined in RFC 1889 (1996) and the current specification is RFC 3550 (2003). SRTP and SRTCP (RFC 3711) add encryption and authentication; in SRTCP, authentication is mandatory.",
      },
    ],
    facts: [
      { label: { es: "Tipos de paquete", en: "Packet types" }, value: "SR 200, RR 201, SDES 202, BYE 203, APP 204" },
      { label: { es: "Ancho de banda", en: "Bandwidth" }, value: { es: "≤ 5 % de la sesión", en: "≤ 5 % of the session" } },
      { label: { es: "Puerto", en: "Port" }, value: { es: "RTP + 1, o multiplexado (RFC 5761)", en: "RTP + 1, or multiplexed (RFC 5761)" } },
      { label: { es: "Métricas", en: "Metrics" }, value: { es: "Pérdidas, jitter, RTT, sincronización", en: "Loss, jitter, RTT, synchronisation" } },
      { label: { es: "Versión segura", en: "Secure version" }, value: "SRTCP (RFC 3711)" },
    ],
    security: {
      es: "Sin protección, un atacante puede inyectar paquetes BYE falsos para cortar un flujo o reportes manipulados que degraden la calidad. El CNAME puede revelar usuario y equipo; RFC 7022 recomienda generarlo aleatoriamente. SRTCP autentica los paquetes de control y, junto con SRTP, cifra la sesión.",
      en: "Unprotected, an attacker can inject forged BYE packets to cut a stream or tampered reports that degrade quality. The CNAME may reveal user and host; RFC 7022 recommends generating it randomly. SRTCP authenticates control packets and, together with SRTP, encrypts the session.",
    },
    multiLayerNote: {
      es: "RFC 3550 describe RTP/RTCP como un marco de nivel de aplicación que suele implementarse dentro de la propia aplicación, sobre UDP. Hay textos que lo ubican en L4 (por su función de transporte de medios), otros en L5 (por gestionar la sesión y su control) y otros en L7. Aquí se lista en L5 por RTCP, que supervisa y sincroniza la sesión.",
      en: "RFC 3550 describes RTP/RTCP as an application-level framework usually implemented within the application itself, over UDP. Some texts place it at L4 (for its media-transport role), others at L5 (for managing and controlling the session) and others at L7. Here it is listed at L5 because of RTCP, which monitors and synchronises the session.",
    },
    tools: [
      { command: "tshark -r llamada.pcap -q -z rtp,streams", description: { es: "Resume flujos RTP con pérdidas y jitter", en: "Summarises RTP streams with loss and jitter" } },
      { command: "tshark -r llamada.pcap -Y rtcp", description: { es: "Filtra los reportes RTCP de una captura", en: "Filters RTCP reports from a capture" } },
    ],
    wireshark: "rtcp",
    relations: { dependsOn: ["udp"], usedBy: ["sip", "rtsp"] },
    specs: [
      { id: "RFC 3550", title: { es: "RTP: protocolo de transporte para aplicaciones en tiempo real", en: "RTP: A Transport Protocol for Real-Time Applications" }, url: rfc(3550) },
      { id: "RFC 3711", title: { es: "Protocolo de transporte en tiempo real seguro (SRTP)", en: "The Secure Real-time Transport Protocol (SRTP)" }, url: rfc(3711) },
      { id: "RFC 5761", title: { es: "Multiplexación de RTP y RTCP en un solo puerto", en: "Multiplexing RTP Data and Control Packets on a Single Port" }, url: rfc(5761) },
      { id: "RFC 4585", title: { es: "Perfil RTP con retroalimentación basada en RTCP (AVPF)", en: "Extended RTP Profile for RTCP-Based Feedback (RTP/AVPF)" }, url: rfc(4585) },
    ],
  },
  {
    id: "iso8327",
    acronym: "ISO 8327",
    fullName: { es: "Protocolo de sesión OSI orientado a conexión (ISO/IEC 8327-1 / ITU-T X.225)", en: "OSI Connection-Oriented Session Protocol (ISO/IEC 8327-1 / ITU-T X.225)" },
    osi: [5],
    category: "session",
    status: "legacy",
    bodies: ["ISO/IEC", "ITU-T"],
    year: 1987,
    identifiers: ["TCP 102 (ISO-TSAP, RFC 1006)"],
    summary: {
      es: "Es la capa de sesión «pura» del modelo OSI: un protocolo diseñado específicamente para organizar el diálogo entre dos aplicaciones, decidir quién habla en cada momento y marcar puntos de control para reanudar si algo falla. Hoy es raro verlo fuera de nichos industriales y de telecomunicaciones.",
      en: "This is the \"pure\" session layer of the OSI model: a protocol designed specifically to organise the dialogue between two applications, decide who speaks when, and set checkpoints so work can resume if something fails. Today it is rarely seen outside industrial and telecom niches.",
    },
    analogy: {
      es: "Como un debate con moderador: solo quien tiene el micrófono (el testigo) puede hablar, y el moderador marca pausas numeradas para poder retomar desde la última si se corta la transmisión.",
      en: "Like a moderated debate: only whoever holds the microphone (the token) may speak, and the moderator marks numbered breaks so the session can pick up from the last one if the broadcast drops.",
    },
    everyday: {
      es: "Subestaciones eléctricas que usan IEC 61850 (MMS), sistemas de mensajería X.400 y directorios X.500 heredados.",
      en: "Electrical substations using IEC 61850 (MMS), X.400 messaging systems and legacy X.500 directories.",
    },
    technical: [
      {
        es: "ISO/IEC 8326 (= ITU-T X.215) define el servicio de sesión y ISO/IEC 8327-1 (= ITU-T X.225) el protocolo, publicado por primera vez en 1987. Ofrece servicios como S-CONNECT, S-DATA, S-RELEASE y S-U-ABORT, y se intercambia mediante SPDU como CN (Connect), AC (Accept), RF (Refuse), DT (Data), FN (Finish), DN (Disconnect) y AB (Abort). Las capacidades se negocian por unidades funcionales: kernel, semidúplex, dúplex, datos acelerados, sincronización menor y mayor, resincronización y gestión de actividades.",
        en: "ISO/IEC 8326 (= ITU-T X.215) defines the session service and ISO/IEC 8327-1 (= ITU-T X.225) the protocol, first published in 1987. It provides services such as S-CONNECT, S-DATA, S-RELEASE and S-U-ABORT, exchanged through SPDUs such as CN (Connect), AC (Accept), RF (Refuse), DT (Data), FN (Finish), DN (Disconnect) and AB (Abort). Capabilities are negotiated as functional units: kernel, half-duplex, duplex, expedited data, minor and major synchronisation, resynchronisation and activity management.",
      },
      {
        es: "El control de diálogo se basa en testigos (tokens): el de datos decide quién transmite en semidúplex, y hay otros para sincronización menor, sincronización mayor/actividad y liberación. Los puntos de sincronización numerados permiten volver a un estado conocido: uno mayor requiere confirmación y cierra una unidad de diálogo, uno menor puede no confirmarse. La gestión de actividades permite iniciar, interrumpir, reanudar y descartar trabajos lógicos, como una transferencia de archivo larga.",
        en: "Dialogue control is token-based: the data token decides who transmits in half-duplex, and there are others for minor synchronisation, major synchronisation/activity and release. Numbered synchronisation points let parties return to a known state: a major point requires confirmation and closes a dialogue unit, a minor one may go unconfirmed. Activity management allows logical jobs, such as a long file transfer, to be started, interrupted, resumed and discarded.",
      },
      {
        es: "Casi ningún protocolo de Internet usa una capa de sesión separada: TCP y las aplicaciones asumieron esas funciones. La pila OSI superior sobrevive gracias a RFC 1006 (1987), que transporta el servicio de transporte ISO sobre TCP en el puerto 102 con una cabecera TPKT de 4 bytes. Así funcionan, por ejemplo, MMS (ISO 9506) en IEC 61850, junto con la presentación ISO 8823 y ACSE, y los sistemas X.400.",
        en: "Almost no Internet protocol uses a separate session layer: TCP and applications took over those functions. The upper OSI stack survives thanks to RFC 1006 (1987), which carries the ISO transport service over TCP on port 102 with a 4-byte TPKT header. That is how, for instance, MMS (ISO 9506) in IEC 61850 works, along with ISO 8823 presentation and ACSE, as well as X.400 systems.",
      },
    ],
    howItWorks: [
      { es: "Se establece una conexión de transporte ISO (sobre TCP 102 con RFC 1006 y COTP).", en: "An ISO transport connection is set up (over TCP 102 with RFC 1006 and COTP)." },
      { es: "CN/AC: los extremos negocian unidades funcionales, la asignación inicial de testigos y el número inicial de sincronización.", en: "CN/AC: endpoints negotiate functional units, initial token assignment and the initial synchronisation serial number." },
      { es: "DT: se intercambian datos; en semidúplex solo transmite quien posee el testigo de datos (S-TOKEN-GIVE / S-TOKEN-PLEASE).", en: "DT: data is exchanged; in half-duplex only the holder of the data token transmits (S-TOKEN-GIVE / S-TOKEN-PLEASE)." },
      { es: "Se insertan puntos de sincronización menores y mayores; ante un fallo, S-RESYNCHRONIZE vuelve a uno de ellos.", en: "Minor and major synchronisation points are inserted; on failure, S-RESYNCHRONIZE returns to one of them." },
      { es: "FN/DN: liberación ordenada de la sesión sin pérdida de datos (o AB para abortar).", en: "FN/DN: orderly session release without data loss (or AB to abort)." },
    ],
    facts: [
      { label: { es: "Protocolo", en: "Protocol" }, value: "ISO/IEC 8327-1 = ITU-T X.225" },
      { label: { es: "Servicio", en: "Service" }, value: "ISO/IEC 8326 = ITU-T X.215" },
      { label: { es: "Control de diálogo", en: "Dialogue control" }, value: { es: "Testigos: datos, sincronización menor, mayor/actividad, liberación", en: "Tokens: data, minor sync, major sync/activity, release" } },
      { label: { es: "Sobre TCP/IP", en: "Over TCP/IP" }, value: { es: "RFC 1006, TCP 102", en: "RFC 1006, TCP 102" } },
      { label: { es: "Uso actual", en: "Current use" }, value: { es: "IEC 61850 MMS, X.400, X.500", en: "IEC 61850 MMS, X.400, X.500" } },
    ],
    security: {
      es: "El protocolo de sesión no incluye autenticación ni cifrado. En entornos industriales, el puerto TCP 102 expuesto permite a cualquiera hablar con los equipos; la protección se basa en segmentación de red y en perfiles de seguridad adicionales, como IEC 62351 para IEC 61850, que añade TLS.",
      en: "The session protocol includes no authentication or encryption. In industrial environments, an exposed TCP port 102 lets anyone talk to the devices; protection relies on network segmentation and additional security profiles, such as IEC 62351 for IEC 61850, which adds TLS.",
    },
    tools: [
      { command: "tshark -r captura.pcap -Y ses", description: { es: "Muestra las SPDU de sesión ISO 8327 decodificadas", en: "Shows decoded ISO 8327 session SPDUs" } },
      { command: "tcpdump -n tcp port 102", description: { es: "Captura tráfico OSI sobre TCP (RFC 1006)", en: "Captures OSI-over-TCP traffic (RFC 1006)" } },
    ],
    wireshark: "ses",
    relations: { dependsOn: ["tcp"] },
    specs: [
      { id: "ITU-T X.225", title: { es: "Protocolo de sesión orientado a conexión: especificación", en: "Connection-oriented Session protocol: Protocol specification" }, url: "https://www.itu.int/rec/T-REC-X.225" },
      { id: "ITU-T X.215", title: { es: "Definición del servicio de sesión", en: "Session service definition" }, url: "https://www.itu.int/rec/T-REC-X.215" },
      { id: "RFC 1006", title: { es: "Servicio de transporte ISO sobre TCP", en: "ISO Transport Service on top of the TCP" }, url: rfc(1006) },
    ],
  },
];
