import type { L, Language } from "@/lib/i18n";

export type { Language, L };

/** Nivel de explicación global: usuario final o técnico. */
export type DetailMode = "basic" | "technical";

export interface Responsibility {
  title: L;
  detail: L;
}

export interface TroubleshootItem {
  symptom: L;
  cause: L;
  tools: string[];
}

interface LayerBase {
  number: number;
  name: L;
  pdu: L;
  color: string;
  keywords: string[];
  /** Nivel básico */
  summary: L;
  analogy: L;
  /** Nivel técnico */
  overview: L;
  responsibilities: Responsibility[];
  header: L;
  addressing: L;
  services: { provides: L; uses: L };
  devices: L;
  troubleshooting: TroubleshootItem[];
}

export interface OSILayer extends LayerBase {
  standard: string;
}

export interface TCPIPLayer extends LayerBase {
  rfc: string;
}

// Correspondencia TCP/IP → OSI (número de capa TCP/IP → números de capa OSI)
export const TCPIP_TO_OSI: Record<number, number[]> = {
  4: [7, 6, 5],
  3: [4],
  2: [3],
  1: [2, 1],
};

export function osiToTcpip(osiNumber: number): number {
  return Number(Object.keys(TCPIP_TO_OSI).find((k) => TCPIP_TO_OSI[Number(k)].includes(osiNumber)));
}

export const OSI_LAYERS: OSILayer[] = [
  {
    number: 7,
    name: { es: "Aplicación", en: "Application" },
    pdu: { es: "Datos", en: "Data" },
    standard: "ISO/IEC 7498-1 §7.1",
    color: "#2B5F8A",
    keywords: ["Request/Response", "URI", "ALPN", "API"],
    summary: {
      es: "Es la capa con la que interactúan los programas: define cómo una aplicación pide y recibe servicios de red, como cargar una página, enviar un correo o resolver un nombre. No es la aplicación en sí (el navegador), sino los protocolos que esta usa para comunicarse.",
      en: "This is the layer programs interact with: it defines how an application requests and receives network services, such as loading a page, sending an email or resolving a name. It is not the application itself (the browser) but the protocols the application uses to communicate.",
    },
    analogy: {
      es: "Es el idioma y el formulario que usan dos oficinas para pedirse cosas: «envíame el documento X» y «aquí está, código 200».",
      en: "It is the language and the form two offices use to ask each other for things: “send me document X” and “here it is, code 200”.",
    },
    overview: {
      es: "La capa 7 da a los procesos de aplicación acceso al entorno de comunicación. En el modelo ISO se compone de elementos de servicio de aplicación (ASE), como ACSE para establecer asociaciones. En Internet corresponde a protocolos como HTTP, DNS o SMTP, que definen la sintaxis de los mensajes, su semántica (métodos, códigos de estado) y el orden del intercambio. Es la única capa sin otra capa superior: sus usuarios son directamente los procesos de aplicación.",
      en: "Layer 7 gives application processes access to the communication environment. In the ISO model it is made of application service elements (ASEs), such as ACSE for establishing associations. On the Internet it corresponds to protocols like HTTP, DNS or SMTP, which define message syntax, their semantics (methods, status codes) and the order of the exchange. It is the only layer with no layer above it: its users are the application processes themselves.",
    },
    responsibilities: [
      {
        title: { es: "Identificar interlocutores y recursos", en: "Identify peers and resources" },
        detail: {
          es: "Determina con quién comunicarse y qué recurso se pide: resuelve un nombre con DNS, interpreta una URL o localiza un servidor de correo mediante sus registros MX.",
          en: "Determines whom to talk to and which resource is requested: resolves a name with DNS, parses a URL, or locates a mail server through its MX records.",
        },
      },
      {
        title: { es: "Definir la semántica del intercambio", en: "Define the exchange semantics" },
        detail: {
          es: "Establece qué mensajes existen, qué significan y en qué orden se envían: petición y respuesta en HTTP, secuencia EHLO → MAIL FROM → RCPT TO → DATA en SMTP.",
          en: "Specifies which messages exist, what they mean and in what order they flow: request/response in HTTP, the EHLO → MAIL FROM → RCPT TO → DATA sequence in SMTP.",
        },
      },
      {
        title: { es: "Autenticación y autorización", en: "Authentication and authorization" },
        detail: {
          es: "Verifica la identidad del usuario o del servicio (contraseñas, tokens OAuth, tickets Kerberos) y decide a qué recursos puede acceder.",
          en: "Verifies the user's or service's identity (passwords, OAuth tokens, Kerberos tickets) and decides which resources it may access.",
        },
      },
      {
        title: { es: "Negociar capacidades", en: "Negotiate capabilities" },
        detail: {
          es: "Acuerda versiones y opciones con el otro extremo: ALPN elige HTTP/2 o HTTP/3, las cabeceras Accept negocian el formato y EHLO anuncia las extensiones SMTP.",
          en: "Agrees on versions and options with the peer: ALPN selects HTTP/2 or HTTP/3, Accept headers negotiate the format, and EHLO advertises SMTP extensions.",
        },
      },
    ],
    header: {
      es: "Cada protocolo define su propio formato: cabeceras de texto en HTTP/1.1, tramas binarias con cabeceras comprimidas (HPACK) en HTTP/2, o una cabecera fija de 12 B en DNS.",
      en: "Each protocol defines its own format: text headers in HTTP/1.1, binary frames with compressed headers (HPACK) in HTTP/2, or a fixed 12 B header in DNS.",
    },
    addressing: {
      es: "Nombres y recursos: URL/URI (https://host/ruta), nombres de dominio y direcciones de correo (usuario@dominio). El puerto «bien conocido» del servicio (443, 53, 25) enlaza este nivel con el transporte.",
      en: "Names and resources: URLs/URIs (https://host/path), domain names and email addresses (user@domain). The service's well-known port (443, 53, 25) links this level to the transport.",
    },
    services: {
      provides: {
        es: "Servicios de red que los procesos de aplicación usan directamente: navegadores, clientes de correo, APIs.",
        en: "Network services used directly by application processes: browsers, mail clients, APIs.",
      },
      uses: {
        es: "La capa de presentación (L6) para la representación y protección de los datos. En TCP/IP, directamente los sockets de TCP, UDP o QUIC.",
        en: "The presentation layer (L6) for data representation and protection. In TCP/IP, TCP, UDP or QUIC sockets directly.",
      },
    },
    devices: {
      es: "Servidores y clientes, proxies inversos, balanceadores de capa 7, firewalls de aplicaciones web (WAF) y gateways de API.",
      en: "Servers and clients, reverse proxies, layer-7 load balancers, web application firewalls (WAFs) and API gateways.",
    },
    troubleshooting: [
      {
        symptom: { es: "El sitio responde 502 o 504", en: "The site returns 502 or 504" },
        cause: {
          es: "El proxy o el balanceador no recibe respuesta del servidor de origen (backend caído o demasiado lento).",
          en: "The proxy or load balancer gets no answer from the origin server (backend down or too slow).",
        },
        tools: ["curl -v", "proxy logs"],
      },
      {
        symptom: { es: "El nombre no resuelve (NXDOMAIN / SERVFAIL)", en: "The name does not resolve (NXDOMAIN / SERVFAIL)" },
        cause: {
          es: "El registro DNS no existe, falla la validación DNSSEC o el resolvedor es inaccesible.",
          en: "The DNS record does not exist, DNSSEC validation fails, or the resolver is unreachable.",
        },
        tools: ["dig", "nslookup"],
      },
      {
        symptom: { es: "Error 401 o 403", en: "401 or 403 error" },
        cause: {
          es: "Credenciales ausentes o incorrectas, o permisos insuficientes a nivel de aplicación; la red funciona bien.",
          en: "Missing or wrong credentials, or insufficient application-level permissions; the network itself is fine.",
        },
        tools: ["curl -i", "DevTools › Network"],
      },
    ],
  },
  {
    number: 6,
    name: { es: "Presentación", en: "Presentation" },
    pdu: { es: "Datos", en: "Data" },
    standard: "ISO/IEC 7498-1 §7.2 · ISO/IEC 8822",
    color: "#1F7A82",
    keywords: ["Transfer syntax", "ASN.1", "UTF-8", "Encryption"],
    summary: {
      es: "Se asegura de que ambos extremos entiendan los datos de la misma forma: traduce formatos, codifica los caracteres, comprime y, según la convención más común, cifra.",
      en: "It makes sure both ends understand the data the same way: it translates formats, encodes characters, compresses and, by the most common convention, encrypts.",
    },
    analogy: {
      es: "Un traductor: el mensaje es el mismo, pero lo convierte a un idioma y formato que el otro lado entienda, y puede meterlo en un sobre sellado.",
      en: "A translator: the message stays the same, but it is converted into a language and format the other side understands, and may be put in a sealed envelope.",
    },
    overview: {
      es: "La capa 6 resuelve la diferencia entre la sintaxis abstracta (qué información se transmite) y la sintaxis de transferencia (cómo se representa en bits). En OSI, ambos extremos negocian un contexto de presentación, por ejemplo ASN.1 con codificación BER o DER. En Internet no existe como capa separada: sus funciones las cumplen formatos y bibliotecas (UTF-8, JSON, Protobuf, gzip) y TLS, que se ubica aquí por convención.",
      en: "Layer 6 bridges abstract syntax (what information is sent) and transfer syntax (how it is represented as bits). In OSI both ends negotiate a presentation context, for example ASN.1 with BER or DER encoding. On the Internet it does not exist as a separate layer: its functions are performed by formats and libraries (UTF-8, JSON, Protobuf, gzip) and by TLS, which is placed here by convention.",
    },
    responsibilities: [
      {
        title: { es: "Traducción de sintaxis", en: "Syntax translation" },
        detail: {
          es: "Convierte las estructuras internas de cada sistema a un formato canónico independiente de la arquitectura, como el orden de bytes big-endian en XDR o la codificación TLV (tipo-longitud-valor) de BER.",
          en: "Converts each system's internal structures into a canonical, architecture-independent format, such as big-endian byte order in XDR or BER's TLV (type-length-value) encoding.",
        },
      },
      {
        title: { es: "Codificación de caracteres", en: "Character encoding" },
        detail: {
          es: "Representa el texto de forma inequívoca. UTF-8 (1 a 4 bytes por carácter, compatible con ASCII) reemplazó a ASCII, EBCDIC y a las páginas de códigos regionales.",
          en: "Represents text unambiguously. UTF-8 (1–4 bytes per character, ASCII-compatible) replaced ASCII, EBCDIC and regional code pages.",
        },
      },
      {
        title: { es: "Compresión", en: "Compression" },
        detail: {
          es: "Reduce el tamaño de los datos antes de enviarlos (DEFLATE, Brotli, Zstandard). En HTTP se negocia con Accept-Encoding y Content-Encoding.",
          en: "Shrinks data before sending it (DEFLATE, Brotli, Zstandard). HTTP negotiates it with Accept-Encoding / Content-Encoding.",
        },
      },
      {
        title: { es: "Cifrado e integridad", en: "Encryption and integrity" },
        detail: {
          es: "Protege la confidencialidad y detecta alteraciones con cifrado autenticado (AEAD en TLS 1.3). Ubicarlo en L6 es una convención didáctica: TLS también gestiona sesiones (L5) y se sitúa entre el transporte y la aplicación.",
          en: "Protects confidentiality and detects tampering with authenticated encryption (AEAD in TLS 1.3). Placing it at L6 is a teaching convention: TLS also manages sessions (L5) and sits between transport and application.",
        },
      },
    ],
    header: {
      es: "Por lo general no añade una cabecera propia. TLS sí añade un registro con 5 B de cabecera (tipo, versión y longitud) más el tag de autenticación del cifrado AEAD (16 B con AES-GCM).",
      en: "Usually adds no header of its own. TLS does add a record with a 5 B header (type, version, length) plus the AEAD authentication tag (16 B with AES-GCM).",
    },
    addressing: {
      es: "Ninguno: opera sobre los datos de un diálogo ya establecido. En OSI existen selectores de presentación (PSEL).",
      en: "None: it works on the data of an already established dialogue. OSI defines presentation selectors (PSELs).",
    },
    services: {
      provides: {
        es: "Datos en una sintaxis acordada y, opcionalmente, protegidos, para la capa de aplicación.",
        en: "Data in an agreed syntax, optionally protected, for the application layer.",
      },
      uses: {
        es: "La capa de sesión (L5) para el diálogo; en TCP/IP, directamente el flujo de transporte.",
        en: "The session layer (L5) for the dialogue; in TCP/IP, the transport stream directly.",
      },
    },
    devices: {
      es: "No hay equipos dedicados: la implementan bibliotecas (OpenSSL, zlib, ICU). En la red, los terminadores y aceleradores TLS descargan el cifrado de los servidores.",
      en: "No dedicated devices: libraries implement it (OpenSSL, zlib, ICU). In the network, TLS terminators and accelerators offload encryption from servers.",
    },
    troubleshooting: [
      {
        symptom: { es: "Caracteres extraños (Ã© en lugar de é)", en: "Garbled characters (Ã© instead of é)" },
        cause: {
          es: "Un extremo interpreta UTF-8 como Latin-1 o al revés (mojibake).",
          en: "One side interprets UTF-8 as Latin-1 or vice versa (mojibake).",
        },
        tools: ["file -i", "iconv"],
      },
      {
        symptom: { es: "Error de certificado o «handshake failure»", en: "Certificate error or “handshake failure”" },
        cause: {
          es: "Certificado vencido, cadena incompleta, nombre que no coincide con el SNI, o versiones y cifrados sin ninguno en común.",
          en: "Expired certificate, incomplete chain, name not matching the SNI, or no common versions or ciphers.",
        },
        tools: ["openssl s_client -connect host:443", "testssl.sh"],
      },
    ],
  },
  {
    number: 5,
    name: { es: "Sesión", en: "Session" },
    pdu: { es: "Datos", en: "Data" },
    standard: "ISO/IEC 7498-1 §7.3 · ISO/IEC 8326",
    color: "#2E8C6B",
    keywords: ["Dialogue control", "Tokens", "Sync points", "Resumption"],
    summary: {
      es: "Organiza el diálogo entre dos aplicaciones: abre, mantiene y cierra la sesión, decide quién habla y cuándo, y permite retomar una transferencia desde un punto de control en lugar de empezar de cero.",
      en: "It organises the dialogue between two applications: it opens, maintains and closes the session, decides who speaks and when, and lets a transfer resume from a checkpoint instead of starting over.",
    },
    analogy: {
      es: "El moderador de una reunión: la abre, da la palabra por turnos y, si se corta, la retoma desde el último acuerdo anotado.",
      en: "A meeting moderator: opens it, gives the floor in turns and, if it drops, resumes from the last recorded agreement.",
    },
    overview: {
      es: "En OSI (ISO/IEC 8326 para el servicio y 8327 para el protocolo), la capa 5 ofrece control de diálogo (half-duplex mediante tokens, o full-duplex), puntos de sincronización mayores y menores para recuperar transferencias largas, y gestión de actividades. En Internet no hay un protocolo de sesión genérico: el control de diálogo queda en cada aplicación, y mecanismos como la reanudación de sesión de TLS, las cookies de HTTP o RPC cumplen ese papel.",
      en: "In OSI (ISO/IEC 8326 for the service, 8327 for the protocol), layer 5 provides dialogue control (half-duplex via tokens, or full-duplex), major and minor synchronization points to recover long transfers, and activity management. The Internet has no generic session protocol: dialogue control lives in each application, and mechanisms such as TLS session resumption, HTTP cookies or RPC fill that role.",
    },
    responsibilities: [
      {
        title: { es: "Establecer y liberar la sesión", en: "Establish and release the session" },
        detail: {
          es: "Crea la conexión de sesión sobre el transporte, negocia sus parámetros y la cierra de forma ordenada (sin perder datos en tránsito) o abrupta.",
          en: "Creates the session connection over the transport, negotiates its parameters and closes it either gracefully (without losing in-flight data) or abruptly.",
        },
      },
      {
        title: { es: "Control del diálogo", en: "Dialogue control" },
        detail: {
          es: "Decide quién transmite: en half-duplex solo habla quien tiene el token de datos; en full-duplex ambos transmiten a la vez.",
          en: "Decides who transmits: in half-duplex only the holder of the data token may send; in full-duplex both sides send at once.",
        },
      },
      {
        title: { es: "Sincronización y recuperación", en: "Synchronization and recovery" },
        detail: {
          es: "Inserta puntos de control en el flujo para que, tras un fallo, la transferencia se reanude desde el último punto confirmado y no desde el principio.",
          en: "Inserts checkpoints in the stream so that, after a failure, the transfer resumes from the last confirmed point rather than from the beginning.",
        },
      },
      {
        title: { es: "Gestión de actividades", en: "Activity management" },
        detail: {
          es: "Agrupa operaciones en unidades lógicas (por ejemplo, un documento completo) que se pueden interrumpir, retomar o descartar como un todo.",
          en: "Groups operations into logical units (e.g. a whole document) that can be interrupted, resumed or discarded as a whole.",
        },
      },
    ],
    header: {
      es: "En OSI añade SPDU (unidades de datos de protocolo de sesión) con los parámetros de la sesión. En TCP/IP no existe una cabecera de sesión genérica.",
      en: "In OSI it adds SPDUs (session protocol data units) carrying session parameters. TCP/IP has no generic session header.",
    },
    addressing: {
      es: "Selectores de sesión (SSEL) en OSI. En Internet, identificadores propios de cada aplicación: ID o ticket de sesión TLS, cookies, IDs de llamada de SIP.",
      en: "Session selectors (SSELs) in OSI. On the Internet, application-specific identifiers: TLS session IDs or tickets, cookies, SIP Call-IDs.",
    },
    services: {
      provides: {
        es: "Un diálogo organizado y recuperable para la capa de presentación.",
        en: "An organised, recoverable dialogue for the presentation layer.",
      },
      uses: {
        es: "El servicio de transporte extremo a extremo (L4).",
        en: "The end-to-end transport service (L4).",
      },
    },
    devices: {
      es: "Ninguno dedicado: es lógica de software en los extremos.",
      en: "None dedicated: it is software logic at the endpoints.",
    },
    troubleshooting: [
      {
        symptom: { es: "Una descarga larga reinicia desde cero tras un corte", en: "A long download restarts from zero after a drop" },
        cause: {
          es: "No hay reanudación: el servidor no acepta peticiones de rango o el protocolo no tiene puntos de control.",
          en: "No resumption: the server does not accept range requests or the protocol has no checkpoints.",
        },
        tools: ["curl -C -", "curl -I (Accept-Ranges)"],
      },
      {
        symptom: { es: "La sesión expira o se cierra de forma inesperada", en: "The session expires or closes unexpectedly" },
        cause: {
          es: "Tiempos de inactividad del servidor, del balanceador o de un NAT intermedio que descarta el estado.",
          en: "Idle timeouts on the server, the load balancer or an intermediate NAT that drops state.",
        },
        tools: ["ss -o", "application logs"],
      },
    ],
  },
  {
    number: 4,
    name: { es: "Transporte", en: "Transport" },
    pdu: { es: "Segmentos", en: "Segments" },
    standard: "ISO/IEC 7498-1 §7.4 · ISO/IEC 8073",
    color: "#6E9142",
    keywords: ["Ports", "3-way handshake", "Sliding window", "ARQ"],
    summary: {
      es: "Lleva los datos de un programa a otro programa en otra computadora. Según el protocolo, garantiza que lleguen completos y en orden (TCP) o prioriza la rapidez (UDP). Los puertos indican a qué aplicación va cada dato.",
      en: "It carries data from one program to another program on another computer. Depending on the protocol it guarantees complete, in-order delivery (TCP) or favours speed (UDP). Ports say which application each piece of data is for.",
    },
    analogy: {
      es: "La mensajería interna de un edificio: la dirección (IP) te lleva al edificio, pero el número de oficina (puerto) dice a quién entregar, y el servicio puede exigir firma de recibido (TCP) o no (UDP).",
      en: "A building's internal mail: the street address (IP) gets you to the building, the office number (port) says who receives it, and the service may require a signed receipt (TCP) or not (UDP).",
    },
    overview: {
      es: "La capa 4 es la primera extremo a extremo: solo la implementan los hosts, no los routers. Aísla a las capas superiores de las particularidades de la red y ofrece el nivel de servicio que se pida: confiable y orientado a conexión (TCP, SCTP) o datagramas sin garantías (UDP). Multiplexa varias conversaciones sobre una misma IP mediante puertos. En los protocolos confiables implementa números de secuencia, confirmaciones, retransmisión, control de flujo y control de congestión.",
      en: "Layer 4 is the first end-to-end layer: only hosts implement it, not routers. It shields upper layers from network specifics and offers the requested service level: reliable and connection-oriented (TCP, SCTP) or best-effort datagrams (UDP). It multiplexes many conversations over one IP address using ports, and reliable protocols add sequence numbers, acknowledgements, retransmission, flow control and congestion control.",
    },
    responsibilities: [
      {
        title: { es: "Multiplexación por puertos", en: "Port multiplexing" },
        detail: {
          es: "Identifica la aplicación de destino con números de puerto de 16 bits; cada conexión se distingue por la 4-tupla (IP y puerto de origen, IP y puerto de destino).",
          en: "Identifies the destination application with 16-bit port numbers; each connection is distinguished by its 4-tuple (source IP/port, destination IP/port).",
        },
      },
      {
        title: { es: "Segmentación y reensamblado", en: "Segmentation and reassembly" },
        detail: {
          es: "Divide el flujo en segmentos que quepan en la MTU (MSS = MTU − cabeceras IP y TCP: 1460 B en Ethernet con IPv4) y los reconstruye en orden en el destino.",
          en: "Splits the stream into segments that fit the MTU (MSS = MTU − IP and TCP headers: 1460 B on Ethernet with IPv4) and rebuilds them in order at the destination.",
        },
      },
      {
        title: { es: "Confiabilidad", en: "Reliability" },
        detail: {
          es: "Detecta errores con un checksum y recupera las pérdidas retransmitiendo (ARQ) según las confirmaciones y los temporizadores. TCP no corrige errores: descarta el segmento dañado y lo vuelve a pedir.",
          en: "Detects errors with a checksum and recovers losses by retransmitting (ARQ) based on acknowledgements and timers. TCP does not correct errors: it drops the damaged segment and gets it resent.",
        },
      },
      {
        title: { es: "Control de flujo", en: "Flow control" },
        detail: {
          es: "El receptor anuncia cuántos bytes puede aceptar (ventana deslizante, rwnd) para que un emisor rápido no lo sature.",
          en: "The receiver advertises how many bytes it can accept (sliding window, rwnd) so a fast sender does not overwhelm it.",
        },
      },
      {
        title: { es: "Control de congestión", en: "Congestion control" },
        detail: {
          es: "El emisor ajusta su tasa a la capacidad de la red con una ventana de congestión (cwnd) usando algoritmos como slow start, CUBIC o BBR, para no colapsar los enlaces compartidos.",
          en: "The sender adapts its rate to network capacity with a congestion window (cwnd) using algorithms such as slow start, CUBIC or BBR, so shared links do not collapse.",
        },
      },
    ],
    header: {
      es: "TCP añade de 20 a 60 B (puertos, número de secuencia, ACK, flags, ventana, checksum y opciones); UDP añade solo 8 B.",
      en: "TCP adds 20–60 B (ports, sequence number, ACK, flags, window, checksum, options); UDP adds just 8 B.",
    },
    addressing: {
      es: "Puertos de 16 bits: 0–1023 bien conocidos, 1024–49151 registrados y 49152–65535 dinámicos o efímeros (RFC 6335).",
      en: "16-bit ports: 0–1023 well-known, 1024–49151 registered, 49152–65535 dynamic/ephemeral (RFC 6335).",
    },
    services: {
      provides: {
        es: "Transferencia extremo a extremo, confiable o no, para la capa de sesión. En TCP/IP, directamente para las aplicaciones mediante sockets.",
        en: "End-to-end transfer, reliable or not, for the session layer. In TCP/IP, directly for applications through sockets.",
      },
      uses: {
        es: "La entrega de paquetes host a host, sin garantías, de la capa de red.",
        en: "Best-effort host-to-host packet delivery from the network layer.",
      },
    },
    devices: {
      es: "Los hosts. También lo inspeccionan los firewalls con estado, los NAT y los balanceadores de capa 4, que miran puertos y el estado de las conexiones.",
      en: "Hosts. It is also inspected by stateful firewalls, NATs and layer-4 load balancers, which look at ports and connection state.",
    },
    troubleshooting: [
      {
        symptom: { es: "«Connection refused»", en: "“Connection refused”" },
        cause: {
          es: "El host responde con RST: no hay ningún proceso escuchando en ese puerto.",
          en: "The host replies with RST: no process is listening on that port.",
        },
        tools: ["ss -tlnp", "nc -vz host port"],
      },
      {
        symptom: { es: "«Connection timed out»", en: "“Connection timed out”" },
        cause: {
          es: "Un firewall descarta los paquetes en silencio o el host no es alcanzable.",
          en: "A firewall silently drops the packets or the host is unreachable.",
        },
        tools: ["nc -vz", "tcpdump"],
      },
      {
        symptom: { es: "Transferencias lentas en un enlace rápido", en: "Slow transfers on a fast link" },
        cause: {
          es: "Retransmisiones por pérdidas, o una ventana o buffer pequeños frente al producto ancho de banda × RTT.",
          en: "Loss-driven retransmissions, or a window or buffer too small for the bandwidth × RTT product.",
        },
        tools: ["ss -ti", "iperf3"],
      },
    ],
  },
  {
    number: 3,
    name: { es: "Red", en: "Network" },
    pdu: { es: "Paquetes", en: "Packets" },
    standard: "ISO/IEC 7498-1 §7.5 · ISO/IEC 8473",
    color: "#B8862E",
    keywords: ["Longest prefix match", "CIDR", "TTL", "Best effort"],
    summary: {
      es: "Hace que un paquete viaje entre redes distintas hasta su destino, aunque cruce decenas de routers. Usa direcciones lógicas (IP) y decide por dónde enviar cada paquete.",
      en: "It makes a packet travel across different networks to its destination, even through dozens of routers. It uses logical (IP) addresses and decides where to send each packet.",
    },
    analogy: {
      es: "El correo entre ciudades: con la dirección completa (IP), cada centro de distribución (router) decide el siguiente tramo sin conocer la ruta entera.",
      en: "Mail between cities: with the full address (IP), each sorting centre (router) picks the next hop without knowing the whole route.",
    },
    overview: {
      es: "La capa 3 entrega paquetes host a host a través de múltiples redes interconectadas. Define un direccionamiento lógico jerárquico independiente del hardware (IPv4 de 32 bits, IPv6 de 128 bits), y cada router reenvía salto a salto consultando su tabla de rutas con el criterio del prefijo más largo. Los protocolos de enrutamiento (OSPF, IS-IS, BGP) construyen esas tablas. IP es un servicio de «mejor esfuerzo»: no garantiza entrega, orden ni ausencia de duplicados, y los problemas se notifican con ICMP.",
      en: "Layer 3 delivers packets host to host across many interconnected networks. It defines hierarchical logical addressing independent of hardware (32-bit IPv4, 128-bit IPv6), and each router forwards hop by hop by looking up its routing table with longest-prefix match. Routing protocols (OSPF, IS-IS, BGP) build those tables. IP is a best-effort service: it guarantees neither delivery, order nor absence of duplicates, and problems are reported with ICMP.",
    },
    responsibilities: [
      {
        title: { es: "Direccionamiento lógico", en: "Logical addressing" },
        detail: {
          es: "Asigna direcciones jerárquicas (prefijo de red + identificador de host, en notación CIDR) independientes de la tecnología de enlace, lo que permite agregar rutas.",
          en: "Assigns hierarchical addresses (network prefix + host identifier, in CIDR notation) independent of the link technology, which enables route aggregation.",
        },
      },
      {
        title: { es: "Reenvío (forwarding)", en: "Forwarding" },
        detail: {
          es: "En cada salto, el router elige la interfaz de salida según el prefijo más largo que coincida con la dirección de destino, decrementa el TTL y reenvía.",
          en: "At each hop the router picks the outgoing interface by the longest prefix matching the destination address, decrements the TTL and forwards.",
        },
      },
      {
        title: { es: "Enrutamiento (routing)", en: "Routing" },
        detail: {
          es: "Construye las tablas de rutas con rutas estáticas o protocolos dinámicos de estado de enlace (OSPF, IS-IS), vector de distancias (RIP) o vector de rutas (BGP).",
          en: "Builds routing tables with static routes or dynamic protocols: link-state (OSPF, IS-IS), distance-vector (RIP) or path-vector (BGP).",
        },
      },
      {
        title: { es: "Fragmentación y MTU", en: "Fragmentation and MTU" },
        detail: {
          es: "Adapta los paquetes a la MTU de cada enlace. En IPv4 los routers pueden fragmentar (salvo con DF activo); en IPv6 solo fragmenta el origen, y se prefiere Path MTU Discovery.",
          en: "Fits packets to each link's MTU. In IPv4 routers may fragment (unless DF is set); in IPv6 only the source fragments, and Path MTU Discovery is preferred.",
        },
      },
      {
        title: { es: "Control de vida y errores", en: "Lifetime and error control" },
        detail: {
          es: "El TTL (Hop Limit en IPv6) evita que un paquete circule para siempre en un bucle. ICMP informa destinos inalcanzables, TTL agotado o paquetes demasiado grandes.",
          en: "The TTL (Hop Limit in IPv6) stops a packet from looping forever. ICMP reports unreachable destinations, expired TTLs or packets that are too big.",
        },
      },
    ],
    header: {
      es: "IPv4 añade de 20 a 60 B (versión, TTL, protocolo, checksum y direcciones de 32 bits); IPv6 añade 40 B fijos más cabeceras de extensión opcionales.",
      en: "IPv4 adds 20–60 B (version, TTL, protocol, checksum, 32-bit addresses); IPv6 adds a fixed 40 B plus optional extension headers.",
    },
    addressing: {
      es: "IPv4 (192.0.2.10/24) e IPv6 (2001:db8::10/64). Rangos privados según RFC 1918: 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16.",
      en: "IPv4 (192.0.2.10/24) and IPv6 (2001:db8::10/64). RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
    },
    services: {
      provides: {
        es: "Entrega de paquetes host a host entre redes, sin garantías, para la capa de transporte.",
        en: "Best-effort host-to-host packet delivery across networks for the transport layer.",
      },
      uses: {
        es: "La transmisión de tramas dentro de cada enlace local (L2).",
        en: "Frame transmission within each local link (L2).",
      },
    },
    devices: {
      es: "Routers, switches de capa 3 y firewalls.",
      en: "Routers, layer-3 switches and firewalls.",
    },
    troubleshooting: [
      {
        symptom: { es: "ping responde «Destination Host Unreachable»", en: "ping reports “Destination Host Unreachable”" },
        cause: {
          es: "No hay ruta al destino, o el último router no logra resolver la dirección de enlace del host.",
          en: "There is no route to the destination, or the last router cannot resolve the host's link-layer address.",
        },
        tools: ["ping", "ip route get <IP>"],
      },
      {
        symptom: { es: "traceroute se detiene en un salto", en: "traceroute stops at one hop" },
        cause: {
          es: "Un router o firewall descarta el tráfico o el ICMP, o la ruta de regreso es asimétrica.",
          en: "A router or firewall drops the traffic or the ICMP, or the return path is asymmetric.",
        },
        tools: ["traceroute / tracert", "mtr"],
      },
      {
        symptom: { es: "Las páginas grandes se cuelgan pero las pequeñas cargan", en: "Large pages hang while small ones load" },
        cause: {
          es: "Agujero negro de MTU: se filtra el ICMP «Fragmentation Needed» o «Packet Too Big» y falla Path MTU Discovery.",
          en: "MTU black hole: ICMP “Fragmentation Needed” / “Packet Too Big” is filtered and Path MTU Discovery fails.",
        },
        tools: ["ping -M do -s 1472", "tracepath"],
      },
    ],
  },
  {
    number: 2,
    name: { es: "Enlace de datos", en: "Data Link" },
    pdu: { es: "Tramas", en: "Frames" },
    standard: "ISO/IEC 7498-1 §7.6 · IEEE 802",
    color: "#C0572A",
    keywords: ["MAC", "LLC", "FCS", "VLAN"],
    summary: {
      es: "Mueve tramas entre dispositivos conectados al mismo enlace local, por ejemplo tu computadora y el router de casa. Usa direcciones físicas (MAC) y detecta si una trama llegó dañada.",
      en: "It moves frames between devices on the same local link, such as your computer and your home router. It uses physical (MAC) addresses and detects whether a frame arrived damaged.",
    },
    analogy: {
      es: "El repartidor de un solo edificio: conoce cada puerta por su número interno (MAC) y entrega dentro del edificio; para ir a otro edificio le pasa el paquete al portero (el router).",
      en: "A courier inside one building: knows every door by its internal number (MAC) and delivers within the building; for another building it hands the parcel to the doorman (the router).",
    },
    overview: {
      es: "La capa 2 convierte el medio físico en un enlace que la capa de red percibe como libre de errores. Delimita las tramas, direcciona dentro del segmento local con direcciones MAC de 48 bits, controla el acceso a un medio compartido y detecta errores con un CRC-32 (FCS). La IEEE la divide en dos subcapas: LLC (802.2), que interactúa con la capa de red, y MAC, específica de cada tecnología (802.3 Ethernet, 802.11 Wi-Fi). Los switches aprenden en qué puerto está cada MAC y reenvían cada trama solo por ese puerto.",
      en: "Layer 2 turns the physical medium into a link the network layer sees as error-free. It delimits frames, addresses within the local segment using 48-bit MAC addresses, controls access to a shared medium and detects errors with a CRC-32 (FCS). IEEE splits it into two sublayers: LLC (802.2), which faces the network layer, and MAC, specific to each technology (802.3 Ethernet, 802.11 Wi-Fi). Switches learn which port each MAC lives on and forward each frame only there.",
    },
    responsibilities: [
      {
        title: { es: "Tramado", en: "Framing" },
        detail: {
          es: "Delimita el inicio y el fin de cada unidad: preámbulo y SFD en Ethernet, bandera 0x7E con relleno de bits o bytes en HDLC y PPP.",
          en: "Marks where each unit begins and ends: preamble and SFD in Ethernet, the 0x7E flag with bit/byte stuffing in HDLC and PPP.",
        },
      },
      {
        title: { es: "Direccionamiento físico", en: "Physical addressing" },
        detail: {
          es: "Entrega dentro del enlace local con direcciones MAC: 24 bits de OUI del fabricante más 24 bits asignados por este. FF:FF:FF:FF:FF:FF es broadcast.",
          en: "Delivers within the local link using MAC addresses: a 24-bit vendor OUI plus 24 vendor-assigned bits. FF:FF:FF:FF:FF:FF is broadcast.",
        },
      },
      {
        title: { es: "Control de acceso al medio", en: "Media access control" },
        detail: {
          es: "Wi-Fi usa CSMA/CA con confirmaciones. En Ethernet conmutado full-duplex no hay colisiones; CSMA/CD solo aplica al Ethernet half-duplex legado.",
          en: "Wi-Fi uses CSMA/CA with acknowledgements. Switched full-duplex Ethernet has no collisions; CSMA/CD only applies to legacy half-duplex Ethernet.",
        },
      },
      {
        title: { es: "Detección de errores", en: "Error detection" },
        detail: {
          es: "El FCS (CRC-32) permite descartar las tramas corruptas. Ethernet no retransmite: la recuperación queda para las capas superiores (Wi-Fi sí retransmite en el propio enlace).",
          en: "The FCS (CRC-32) lets corrupted frames be discarded. Ethernet does not retransmit: recovery is left to upper layers (Wi-Fi does retransmit on the link).",
        },
      },
      {
        title: { es: "Segmentación lógica y bucles", en: "Logical segmentation and loops" },
        detail: {
          es: "Separa dominios de broadcast con VLAN (802.1Q) y evita bucles entre switches con STP, RSTP o MSTP.",
          en: "Separates broadcast domains with VLANs (802.1Q) and prevents switch loops with STP/RSTP/MSTP.",
        },
      },
    ],
    header: {
      es: "Ethernet II añade 14 B de cabecera (MAC destino, MAC origen y EtherType), 4 B opcionales de etiqueta VLAN y 4 B de FCS al final.",
      en: "Ethernet II adds a 14 B header (destination MAC, source MAC, EtherType), an optional 4 B VLAN tag and a 4 B trailing FCS.",
    },
    addressing: {
      es: "Direcciones MAC de 48 bits (00:1A:2B:3C:4D:5E). Para llegar a otra red se usa la MAC del router (gateway) como destino.",
      en: "48-bit MAC addresses (00:1A:2B:3C:4D:5E). To reach another network, the router's (gateway's) MAC is used as destination.",
    },
    services: {
      provides: {
        es: "Transferencia de tramas dentro de un enlace, con detección de errores, para la capa de red.",
        en: "Frame transfer within a link, with error detection, for the network layer.",
      },
      uses: {
        es: "La transmisión de bits sin estructura de la capa física.",
        en: "The unstructured bit transmission of the physical layer.",
      },
    },
    devices: {
      es: "Switches, bridges, puntos de acceso Wi-Fi y tarjetas de red (NIC).",
      en: "Switches, bridges, Wi-Fi access points and network interface cards (NICs).",
    },
    troubleshooting: [
      {
        symptom: { es: "Conflicto o suplantación de IP", en: "IP conflict or spoofing" },
        cause: {
          es: "Dos hosts responden ARP por la misma IP, o hay envenenamiento ARP.",
          en: "Two hosts answer ARP for the same IP, or ARP poisoning is taking place.",
        },
        tools: ["ip neigh / arp -a", "arping"],
      },
      {
        symptom: { es: "Red saturada por tormentas de broadcast", en: "Network saturated by broadcast storms" },
        cause: {
          es: "Hay un bucle de capa 2 sin STP, o STP está mal configurado.",
          en: "There is a layer-2 loop without STP, or STP is misconfigured.",
        },
        tools: ["show spanning-tree", "tcpdump -e"],
      },
      {
        symptom: { es: "Un host sin conectividad dentro de su VLAN", en: "A host with no connectivity inside its VLAN" },
        cause: {
          es: "El puerto está en la VLAN equivocada o el enlace troncal no permite esa VLAN.",
          en: "The port is in the wrong VLAN or the trunk does not allow that VLAN.",
        },
        tools: ["bridge vlan show", "show vlan"],
      },
    ],
  },
  {
    number: 1,
    name: { es: "Física", en: "Physical" },
    pdu: { es: "Bits", en: "Bits" },
    standard: "ISO/IEC 7498-1 §7.7",
    color: "#8C3A1E",
    keywords: ["Line coding", "Modulation", "Baud", "Medium"],
    summary: {
      es: "Convierte los bits en señales físicas (pulsos eléctricos, luz o radio) y las transmite por el medio. Define cables, conectores, voltajes, frecuencias y velocidades.",
      en: "It turns bits into physical signals (electrical pulses, light or radio) and transmits them over the medium. It defines cables, connectors, voltages, frequencies and speeds.",
    },
    analogy: {
      es: "Las carreteras y los vehículos: no importa qué transportan, solo que el camino exista y que las señales lleguen legibles al otro lado.",
      en: "Roads and vehicles: what they carry does not matter, only that the road exists and the signals arrive readable at the other end.",
    },
    overview: {
      es: "La capa 1 especifica las características mecánicas, eléctricas, funcionales y de procedimiento para activar, mantener y desactivar la conexión física. Incluye el medio (par trenzado, fibra, espectro radioeléctrico), los conectores (RJ45, LC), la codificación de línea y la modulación (PAM-5 en 1000BASE-T, OFDM en Wi-Fi), la sincronización de bits y la tasa de señalización. No entiende tramas ni direcciones: solo transporta símbolos.",
      en: "Layer 1 specifies the mechanical, electrical, functional and procedural characteristics to activate, maintain and deactivate the physical connection. It covers the medium (twisted pair, fibre, radio spectrum), connectors (RJ45, LC), line coding and modulation (PAM-5 in 1000BASE-T, OFDM in Wi-Fi), bit synchronization and signalling rate. It knows nothing about frames or addresses: it just carries symbols.",
    },
    responsibilities: [
      {
        title: { es: "Codificación de línea y modulación", en: "Line coding and modulation" },
        detail: {
          es: "Representa los bits como símbolos eléctricos, ópticos o de radio: NRZ, Manchester, 4B5B/MLT-3, PAM-5 y PAM-16 en cobre; QAM y OFDM en radio.",
          en: "Represents bits as electrical, optical or radio symbols: NRZ, Manchester, 4B5B/MLT-3, PAM-5 and PAM-16 on copper; QAM and OFDM over radio.",
        },
      },
      {
        title: { es: "Sincronización de bits", en: "Bit synchronization" },
        detail: {
          es: "Recupera el reloj del emisor a partir de la señal para muestrear cada símbolo en el instante correcto. Por eso existen los códigos con transiciones garantizadas y el preámbulo de Ethernet.",
          en: "Recovers the sender's clock from the signal to sample each symbol at the right instant; that is why codes with guaranteed transitions and Ethernet's preamble exist.",
        },
      },
      {
        title: { es: "Medio y conectores", en: "Medium and connectors" },
        detail: {
          es: "Especifica el tipo y la categoría del cable, la longitud máxima (100 m en par trenzado), el pinout (T568A/B), la longitud de onda en fibra o la banda de radio.",
          en: "Specifies cable type and category, maximum length (100 m for twisted pair), pinout (T568A/B), fibre wavelength or radio band.",
        },
      },
      {
        title: { es: "Tasa y modo de transmisión", en: "Rate and transmission mode" },
        detail: {
          es: "Fija la velocidad (baudios y bits por segundo), el modo (simplex, half-duplex o full-duplex) y la autonegociación entre los extremos.",
          en: "Sets the speed (baud and bits per second), the mode (simplex, half- or full-duplex) and autonegotiation between the ends.",
        },
      },
    ],
    header: {
      es: "No añade cabecera. Ethernet antepone un preámbulo de 7 B más 1 B de SFD para que el receptor se sincronice.",
      en: "Adds no header. Ethernet prepends a 7 B preamble plus a 1 B SFD so the receiver can synchronise.",
    },
    addressing: { es: "Ninguno.", en: "None." },
    services: {
      provides: {
        es: "Transmisión transparente de bits para la capa de enlace.",
        en: "Transparent bit transmission for the data link layer.",
      },
      uses: { es: "El medio físico.", en: "The physical medium." },
    },
    devices: {
      es: "Hubs, repetidores, transceptores (SFP), módems, cables y antenas.",
      en: "Hubs, repeaters, transceivers (SFP), modems, cables and antennas.",
    },
    troubleshooting: [
      {
        symptom: { es: "Enlace caído o LED apagado", en: "Link down or LED off" },
        cause: {
          es: "Cable dañado o desconectado, transceptor incompatible o puerto deshabilitado.",
          en: "Damaged or unplugged cable, incompatible transceiver or disabled port.",
        },
        tools: ["ethtool eth0", "cable tester"],
      },
      {
        symptom: { es: "Errores CRC o velocidad negociada menor", en: "CRC errors or lower negotiated speed" },
        cause: {
          es: "Cable de categoría insuficiente, interferencia electromagnética o conectores mal ponchados.",
          en: "Insufficient cable category, electromagnetic interference or badly crimped connectors.",
        },
        tools: ["ethtool -S eth0", "ip -s link"],
      },
      {
        symptom: { es: "Wi-Fi inestable", en: "Unstable Wi-Fi" },
        cause: {
          es: "Interferencia en el canal, señal débil (RSSI bajo) o canal saturado por redes vecinas.",
          en: "Channel interference, weak signal (low RSSI) or a channel crowded by neighbouring networks.",
        },
        tools: ["iw dev wlan0 link", "spectrum analyzer"],
      },
    ],
  },
];

export const TCPIP_LAYERS: TCPIPLayer[] = [
  {
    number: 4,
    name: { es: "Aplicación", en: "Application" },
    pdu: { es: "Datos", en: "Data" },
    rfc: "RFC 1123 (Application & Support)",
    color: "#2B5F8A",
    keywords: ["Sockets", "End-to-end", "Services"],
    summary: {
      es: "Agrupa lo que en OSI son las capas 5, 6 y 7: los protocolos que las aplicaciones usan directamente (HTTP, DNS, correo), incluidos el formato de los datos y el cifrado.",
      en: "It groups what OSI splits into layers 5, 6 and 7: the protocols applications use directly (HTTP, DNS, email), including data formatting and encryption.",
    },
    analogy: {
      es: "Una oficina completa: redacta el mensaje, lo traduce y lo sella en el mismo lugar antes de entregarlo a mensajería.",
      en: "A whole office: it writes the message, translates it and seals it in one place before handing it to the courier.",
    },
    overview: {
      es: "RFC 1122 describe las capas de comunicación y deja los requisitos de las aplicaciones a su documento hermano, RFC 1123. A diferencia de OSI, no hay capas separadas de presentación ni de sesión: cada protocolo resuelve por su cuenta la representación de datos (MIME, JSON), la seguridad (TLS como biblioteca) y el control del diálogo. Las aplicaciones acceden al transporte con la API de sockets, eligiendo TCP, UDP o QUIC y un puerto.",
      en: "RFC 1122 describes the communication layers and leaves application requirements to its companion, RFC 1123. Unlike OSI, there are no separate presentation or session layers: each protocol handles data representation (MIME, JSON), security (TLS as a library) and dialogue control on its own. Applications reach the transport through the sockets API, choosing TCP, UDP or QUIC and a port.",
    },
    responsibilities: [
      {
        title: { es: "Protocolos de servicio", en: "Service protocols" },
        detail: {
          es: "Definen los mensajes y su semántica para cada servicio: HTTP para la web, SMTP e IMAP para el correo, DNS para los nombres y SSH para el acceso remoto.",
          en: "Define messages and semantics for each service: HTTP for the web, SMTP/IMAP for email, DNS for names, SSH for remote access.",
        },
      },
      {
        title: { es: "Representación de datos (funciones de L6)", en: "Data representation (L6 functions)" },
        detail: {
          es: "Cada protocolo elige su formato y codificación: MIME en el correo, JSON o Protobuf en las APIs, UTF-8 para el texto y gzip o Brotli para la compresión.",
          en: "Each protocol picks its format and encoding: MIME in email, JSON or Protobuf in APIs, UTF-8 for text, gzip/Brotli for compression.",
        },
      },
      {
        title: { es: "Seguridad extremo a extremo", en: "End-to-end security" },
        detail: {
          es: "TLS y DTLS se integran como bibliotecas por encima del transporte; QUIC los incorpora dentro del propio transporte.",
          en: "TLS and DTLS are integrated as libraries above the transport; QUIC builds them into the transport itself.",
        },
      },
      {
        title: { es: "Gestión del diálogo (funciones de L5)", en: "Dialogue management (L5 functions)" },
        detail: {
          es: "Las sesiones, los reintentos y la reanudación los implementa la aplicación: cookies y tokens en HTTP, reanudación de sesión en TLS, peticiones de rango para continuar descargas.",
          en: "Sessions, retries and resumption are implemented by the application: cookies and tokens in HTTP, TLS session resumption, range requests to continue downloads.",
        },
      },
    ],
    header: {
      es: "Depende de cada protocolo de aplicación.",
      en: "Depends on each application protocol.",
    },
    addressing: {
      es: "Nombres de dominio, URL y puertos de servicio.",
      en: "Domain names, URLs and service ports.",
    },
    services: {
      provides: { es: "Servicios de red para usuarios y programas.", en: "Network services for users and programs." },
      uses: { es: "Sockets TCP, UDP o QUIC de la capa de transporte.", en: "TCP, UDP or QUIC sockets from the transport layer." },
    },
    devices: {
      es: "Servidores, clientes, proxies y balanceadores de capa 7.",
      en: "Servers, clients, proxies and layer-7 load balancers.",
    },
    troubleshooting: [
      {
        symptom: { es: "La API responde con un error", en: "The API responds with an error" },
        cause: {
          es: "Un problema de lógica o de configuración del servicio, no de la red: revisa el código de estado y el cuerpo de la respuesta.",
          en: "A service logic or configuration issue, not the network: check the status code and response body.",
        },
        tools: ["curl -v", "DevTools › Network"],
      },
      {
        symptom: { es: "El dominio no resuelve", en: "The domain does not resolve" },
        cause: {
          es: "Falla de DNS en el resolvedor o en la delegación de la zona.",
          en: "DNS failure at the resolver or in the zone delegation.",
        },
        tools: ["dig +trace"],
      },
    ],
  },
  {
    number: 3,
    name: { es: "Transporte", en: "Transport" },
    pdu: { es: "Segmentos / datagramas", en: "Segments / datagrams" },
    rfc: "RFC 1122 §4 (Transport Layer)",
    color: "#6E9142",
    keywords: ["Congestion control", "Sequence numbers", "Sockets"],
    summary: {
      es: "Equivale a la capa 4 de OSI: entrega datos entre programas de distintos hosts, con garantías (TCP) o sin ellas (UDP).",
      en: "Equivalent to OSI layer 4: it delivers data between programs on different hosts, with guarantees (TCP) or without them (UDP).",
    },
    analogy: {
      es: "La mensajería interna de un edificio: la dirección te lleva al edificio y el número de oficina (puerto), a la persona.",
      en: "A building's internal mail: the address gets you to the building, the office number (port) to the person.",
    },
    overview: {
      es: "RFC 1122 §4 fija los requisitos de UDP y TCP para los hosts: cálculo del RTO, algoritmo de Nagle, ACK retardados, keep-alives y reacción ante mensajes ICMP. Es la capa que más ha evolucionado desde entonces, con extensiones de alto rendimiento, controles de congestión modernos y QUIC, que lleva el transporte al espacio de usuario sobre UDP.",
      en: "RFC 1122 §4 sets host requirements for UDP and TCP: RTO calculation, Nagle's algorithm, delayed ACKs, keep-alives and reactions to ICMP messages. It is the layer that has evolved most since then, with high-performance extensions, modern congestion control and QUIC, which moves transport into user space over UDP.",
    },
    responsibilities: [
      {
        title: { es: "Puertos y sockets", en: "Ports and sockets" },
        detail: {
          es: "Multiplexa las conversaciones con puertos de 16 bits; el sistema operativo expone cada extremo como un socket.",
          en: "Multiplexes conversations with 16-bit ports; the OS exposes each endpoint as a socket.",
        },
      },
      {
        title: { es: "Flujo confiable (TCP)", en: "Reliable stream (TCP)" },
        detail: {
          es: "Secuencia, confirmaciones, retransmisión, control de flujo y control de congestión para entregar un flujo de bytes íntegro y ordenado.",
          en: "Sequencing, acknowledgements, retransmission, flow and congestion control to deliver an intact, ordered byte stream.",
        },
      },
      {
        title: { es: "Datagramas (UDP)", en: "Datagrams (UDP)" },
        detail: {
          es: "Mensajes independientes con una sobrecarga mínima de 8 B. La aplicación decide cómo manejar pérdidas y ritmo (RFC 8085).",
          en: "Independent messages with minimal 8 B overhead; the application decides how to handle loss and pacing (RFC 8085).",
        },
      },
    ],
    header: {
      es: "TCP: 20–60 B. UDP: 8 B.",
      en: "TCP: 20–60 B. UDP: 8 B.",
    },
    addressing: {
      es: "Puertos (0–65535) combinados con las direcciones IP en la 4-tupla.",
      en: "Ports (0–65535) combined with IP addresses in the 4-tuple.",
    },
    services: {
      provides: { es: "Sockets para las aplicaciones.", en: "Sockets for applications." },
      uses: { es: "Datagramas IP de la capa Internet.", en: "IP datagrams from the Internet layer." },
    },
    devices: {
      es: "Hosts, firewalls con estado, NAT y balanceadores de capa 4.",
      en: "Hosts, stateful firewalls, NATs and layer-4 load balancers.",
    },
    troubleshooting: [
      {
        symptom: { es: "«Connection refused» o «timed out»", en: "“Connection refused” or “timed out”" },
        cause: {
          es: "«Refused»: nadie escucha en el puerto (RST). «Timed out»: un firewall descarta el tráfico o el host no responde.",
          en: "Refused: nothing listens on the port (RST). Timed out: a firewall drops traffic or the host does not answer.",
        },
        tools: ["ss -tlnp", "nc -vz host port"],
      },
    ],
  },
  {
    number: 2,
    name: { es: "Internet", en: "Internet" },
    pdu: { es: "Paquetes (datagramas IP)", en: "Packets (IP datagrams)" },
    rfc: "RFC 1122 §3 (Internet Layer)",
    color: "#B8862E",
    keywords: ["Hourglass", "Datagram", "Routing table"],
    summary: {
      es: "Corresponde a la capa 3 de OSI: IP lleva cada paquete entre redes hasta su destino. Es la «cintura» del modelo: todo pasa por IP.",
      en: "It corresponds to OSI layer 3: IP carries each packet across networks to its destination. It is the model's “waist”: everything goes through IP.",
    },
    analogy: {
      es: "El sistema postal nacional: no importa si la carta va en camión, avión o barco, todas usan el mismo formato de dirección.",
      en: "The national postal system: whether a letter travels by truck, plane or ship, all use the same address format.",
    },
    overview: {
      es: "La capa Internet es el punto de convergencia del modelo de reloj de arena: muchas aplicaciones y transportes arriba, muchas tecnologías de enlace abajo y un solo protocolo en medio, IP. RFC 1122 §3 exige a los hosts implementar IP e ICMP, e IGMP si usan multicast. Sigue el principio extremo a extremo: la red es simple y no guarda estado, y la inteligencia (confiabilidad, orden) queda en los hosts.",
      en: "The Internet layer is the convergence point of the hourglass model: many applications and transports above, many link technologies below, and a single protocol in between, IP. RFC 1122 §3 requires hosts to implement IP and ICMP (and IGMP for multicast). It follows the end-to-end principle: the network is simple and stateless, and intelligence (reliability, ordering) lives in the hosts.",
    },
    responsibilities: [
      {
        title: { es: "Direccionamiento IP", en: "IP addressing" },
        detail: {
          es: "Direcciones IPv4 e IPv6 con prefijos CIDR que identifican la red y el host de forma independiente del enlace.",
          en: "IPv4 and IPv6 addresses with CIDR prefixes identifying network and host independently of the link.",
        },
      },
      {
        title: { es: "Reenvío salto a salto", en: "Hop-by-hop forwarding" },
        detail: {
          es: "Cada router decide solo el siguiente salto consultando su tabla de rutas por el prefijo más largo.",
          en: "Each router decides only the next hop by looking up its routing table with longest-prefix match.",
        },
      },
      {
        title: { es: "Fragmentación y PMTUD", en: "Fragmentation and PMTUD" },
        detail: {
          es: "Adapta el tamaño de los paquetes a la MTU del camino, preferiblemente descubriéndola (PMTUD) en lugar de fragmentar.",
          en: "Adapts packet size to the path MTU, preferably by discovering it (PMTUD) rather than fragmenting.",
        },
      },
      {
        title: { es: "Mensajes de control (ICMP)", en: "Control messages (ICMP)" },
        detail: {
          es: "Informa errores y permite diagnósticos: eco (ping), TTL agotado (traceroute), destino inalcanzable y «paquete demasiado grande».",
          en: "Reports errors and enables diagnostics: echo (ping), time exceeded (traceroute), destination unreachable, packet too big.",
        },
      },
    ],
    header: {
      es: "IPv4: 20–60 B. IPv6: 40 B más cabeceras de extensión.",
      en: "IPv4: 20–60 B. IPv6: 40 B plus extension headers.",
    },
    addressing: {
      es: "Direcciones IPv4 (32 bits) e IPv6 (128 bits).",
      en: "IPv4 (32-bit) and IPv6 (128-bit) addresses.",
    },
    services: {
      provides: { es: "Entrega de datagramas host a host, sin garantías.", en: "Best-effort host-to-host datagram delivery." },
      uses: { es: "Tramas de la capa de enlace.", en: "Frames from the link layer." },
    },
    devices: { es: "Routers y switches de capa 3.", en: "Routers and layer-3 switches." },
    troubleshooting: [
      {
        symptom: { es: "No hay respuesta a ping ni a traceroute", en: "No answer to ping or traceroute" },
        cause: {
          es: "Falta una ruta, falla el gateway predeterminado o un firewall filtra ICMP.",
          en: "A missing route, a failing default gateway, or a firewall filtering ICMP.",
        },
        tools: ["ping", "traceroute", "ip route"],
      },
    ],
  },
  {
    number: 1,
    name: { es: "Enlace (Acceso a Red)", en: "Link (Network Access)" },
    pdu: { es: "Tramas / bits", en: "Frames / bits" },
    rfc: "RFC 1122 §2 (Link Layer)",
    color: "#C0572A",
    keywords: ["MAC address", "ARP", "Hardware interface"],
    summary: {
      es: "Agrupa las capas 1 y 2 de OSI: la tecnología concreta que conecta un equipo con su red local, como Ethernet o Wi-Fi.",
      en: "It groups OSI layers 1 and 2: the concrete technology connecting a device to its local network, such as Ethernet or Wi-Fi.",
    },
    analogy: {
      es: "Las calles y el repartidor del barrio: llevan el paquete hasta la puerta, sea caminando, en bicicleta o en moto.",
      en: "The neighbourhood streets and courier: they bring the parcel to the door, whether on foot, by bike or by motorbike.",
    },
    overview: {
      es: "RFC 1122 §2 no define ninguna tecnología de enlace: solo fija lo que debe cumplir para transportar IP, como la resolución de direcciones (ARP, RFC 826) y el encapsulamiento de IP sobre Ethernet (RFC 894). Dejar abierto el hardware permitió que IP funcionara sobre Ethernet, Wi-Fi, PPP, fibra o redes celulares sin cambios. Los libros de texto la llaman «Acceso a Red», nombre que viene del modelo del Departamento de Defensa (DoD).",
      en: "RFC 1122 §2 defines no link technology: it only states what one must do to carry IP, such as address resolution (ARP, RFC 826) and IP-over-Ethernet encapsulation (RFC 894). Leaving hardware open is what let IP run unchanged over Ethernet, Wi-Fi, PPP, fibre or cellular networks. Textbooks call it “Network Access”, a name from the Department of Defense (DoD) model.",
    },
    responsibilities: [
      {
        title: { es: "Encapsular IP en tramas", en: "Encapsulate IP in frames" },
        detail: {
          es: "Coloca cada datagrama IP dentro de la trama de la tecnología local e indica con el EtherType (0x0800 para IPv4, 0x86DD para IPv6) qué protocolo transporta.",
          en: "Places each IP datagram inside the local technology's frame, using the EtherType (0x0800 IPv4, 0x86DD IPv6) to signal the protocol carried.",
        },
      },
      {
        title: { es: "Resolución de direcciones", en: "Address resolution" },
        detail: {
          es: "Traduce la IP del siguiente salto a una dirección MAC: ARP en IPv4 y NDP (sobre ICMPv6) en IPv6.",
          en: "Maps the next-hop IP to a MAC address: ARP for IPv4, NDP (over ICMPv6) for IPv6.",
        },
      },
      {
        title: { es: "Transmisión física", en: "Physical transmission" },
        detail: {
          es: "Convierte las tramas en señales por cobre, fibra o radio según el estándar del medio.",
          en: "Turns frames into signals over copper, fibre or radio according to the medium's standard.",
        },
      },
      {
        title: { es: "Detección de errores", en: "Error detection" },
        detail: {
          es: "Verifica el FCS (CRC-32) y descarta las tramas corruptas antes de entregarlas a IP.",
          en: "Checks the FCS (CRC-32) and discards corrupted frames before handing them to IP.",
        },
      },
    ],
    header: {
      es: "En Ethernet: 14 B de cabecera más 4 B de FCS, además del preámbulo físico.",
      en: "On Ethernet: 14 B header plus 4 B FCS, in addition to the physical preamble.",
    },
    addressing: {
      es: "Direcciones MAC de 48 bits (o su equivalente en otras tecnologías).",
      en: "48-bit MAC addresses (or the equivalent in other technologies).",
    },
    services: {
      provides: { es: "Entrega de datagramas IP dentro de la red local.", en: "Delivery of IP datagrams within the local network." },
      uses: { es: "El medio físico.", en: "The physical medium." },
    },
    devices: {
      es: "Switches, puntos de acceso, tarjetas de red, módems y cables.",
      en: "Switches, access points, NICs, modems and cables.",
    },
    troubleshooting: [
      {
        symptom: { es: "Sin conectividad local", en: "No local connectivity" },
        cause: {
          es: "Enlace caído, VLAN incorrecta o ARP que no se resuelve para el gateway.",
          en: "Link down, wrong VLAN, or ARP failing to resolve the gateway.",
        },
        tools: ["ip link", "ip neigh", "ethtool"],
      },
    ],
  },
];
