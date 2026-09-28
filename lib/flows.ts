import type { L } from "@/lib/i18n";

/**
 * Diagramas de secuencia: handshakes (TCP, TLS 1.3, QUIC) y el recorrido completo de una URL.
 * `t` es el instante de envío en RTT; el mensaje llega 0.5 RTT después.
 */

export interface FlowActor {
  id: string;
  label: L;
}

export interface FlowMessage {
  from: string;
  /** Igual a `from` para una acción local (nota sobre la línea de vida). */
  to: string;
  label: string;
  sub?: L;
  osi: number[];
  /** Protocolo del catálogo para abrir su ficha. */
  protocolId?: string;
  t?: number;
  encrypted?: boolean;
  basic: L;
  technical: L;
}

export interface Flow {
  id: string;
  title: L;
  description: L;
  actors: FlowActor[];
  messages: FlowMessage[];
  summary: L;
  /** RTT hasta recibir la respuesta (para la comparación). */
  rttToResponse?: number;
}

const client: FlowActor = { id: "client", label: { es: "Cliente", en: "Client" } };
const server: FlowActor = { id: "server", label: { es: "Servidor", en: "Server" } };

const TCP_OPEN: FlowMessage[] = [
  {
    from: "client", to: "server", label: "SYN", t: 0, osi: [4], protocolId: "tcp",
    sub: { es: "seq=1000 · MSS=1460 · SACK_PERM · WS=7", en: "seq=1000 · MSS=1460 · SACK_PERM · WS=7" },
    basic: {
      es: "El cliente pide abrir una conexión y propone su número de secuencia inicial.",
      en: "The client asks to open a connection and proposes its initial sequence number.",
    },
    technical: {
      es: "Segmento con SYN = 1 y un ISN aleatorio (RFC 6528; aquí 1000 para leerlo fácil). Las opciones anuncian el MSS (1460 en Ethernet), el soporte de SACK y el factor de Window Scale. El SYN consume un número de secuencia aunque no lleve datos.",
      en: "Segment with SYN = 1 and a random ISN (RFC 6528; 1000 here for readability). Options advertise the MSS (1460 on Ethernet), SACK support and the Window Scale factor. The SYN consumes one sequence number even though it carries no data.",
    },
  },
  {
    from: "server", to: "client", label: "SYN-ACK", t: 0.5, osi: [4], protocolId: "tcp",
    sub: { es: "seq=5000 · ack=1001 · MSS=1460 · WS=8", en: "seq=5000 · ack=1001 · MSS=1460 · WS=8" },
    basic: {
      es: "El servidor acepta, confirma el número del cliente y propone el suyo.",
      en: "The server accepts, acknowledges the client's number and proposes its own.",
    },
    technical: {
      es: "SYN = 1 y ACK = 1: ack = 1001 confirma el SYN del cliente (ISN + 1). El servidor guarda estado para la conexión semiabierta, o usa SYN cookies si está bajo ataque, y anuncia sus opciones. Window Scale solo se activa si ambos extremos lo ofrecen.",
      en: "SYN = 1 and ACK = 1: ack = 1001 acknowledges the client's SYN (ISN + 1). The server keeps half-open state (or uses SYN cookies under attack) and advertises its options; Window Scale is only enabled if both sides offer it.",
    },
  },
  {
    from: "client", to: "server", label: "ACK", t: 1, osi: [4], protocolId: "tcp",
    sub: { es: "seq=1001 · ack=5001", en: "seq=1001 · ack=5001" },
    basic: {
      es: "El cliente confirma y la conexión queda abierta en ambos sentidos.",
      en: "The client confirms: the connection is open in both directions.",
    },
    technical: {
      es: "Tras 1 RTT el cliente pasa a ESTABLISHED y puede enviar datos en este mismo segmento o en el siguiente. El servidor llega a ESTABLISHED al recibirlo, 1.5 RTT después del inicio.",
      en: "After 1 RTT the client is ESTABLISHED and may send data in this very segment or the next. The server becomes ESTABLISHED when it arrives, 1.5 RTT after the start.",
    },
  },
];

const TLS13_OVER_TCP: FlowMessage[] = [
  {
    from: "client", to: "server", label: "ClientHello", t: 1, osi: [6, 5], protocolId: "tls",
    sub: { es: "SNI=example.com · ALPN=h2 · key_share X25519", en: "SNI=example.com · ALPN=h2 · key_share X25519" },
    basic: {
      es: "El cliente saluda: dice a qué sitio quiere conectarse y qué versiones y cifrados soporta, y envía su mitad del intercambio de claves.",
      en: "The client says hello: which site it wants, which versions and ciphers it supports, and sends its half of the key exchange.",
    },
    technical: {
      es: "Viaja en claro dentro de un registro TLS de tipo handshake. Incluye un key_share (por ejemplo X25519) para que el servidor derive las claves de inmediato: por eso TLS 1.3 completa en 1 RTT y TLS 1.2 necesitaba 2. SNI indica el dominio, ALPN los protocolos de aplicación y supported_versions la versión real (1.3).",
      en: "Sent in clear inside a handshake-type TLS record. It includes a key_share (e.g. X25519) so the server can derive keys immediately — that is why TLS 1.3 finishes in 1 RTT versus 2 for TLS 1.2. SNI names the domain, ALPN the application protocols, and supported_versions the real version (1.3).",
    },
  },
  {
    from: "server", to: "client", label: "ServerHello + {EE, Certificate, CertVerify, Finished}", t: 1.5, osi: [6, 5], protocolId: "tls", encrypted: true,
    sub: { es: "todo excepto ServerHello va cifrado", en: "everything but ServerHello is encrypted" },
    basic: {
      es: "El servidor elige los parámetros, envía su certificado y demuestra que tiene la clave privada. Casi todo va ya cifrado.",
      en: "The server picks the parameters, sends its certificate and proves it holds the private key. Almost everything is already encrypted.",
    },
    technical: {
      es: "ServerHello lleva el key_share del servidor. Desde ahí ambos derivan con HKDF las claves de handshake y el resto viaja cifrado. EncryptedExtensions confirma ALPN = h2; Certificate trae la cadena X.509; CertificateVerify es una firma sobre la transcripción que prueba la posesión de la clave privada, y Finished es un MAC de todo el handshake.",
      en: "ServerHello carries the server's key_share; from then on both derive handshake keys with HKDF and the rest is encrypted. EncryptedExtensions confirms ALPN = h2; Certificate carries the X.509 chain; CertificateVerify is a signature over the transcript proving private-key possession; Finished is a MAC over the whole handshake.",
    },
  },
  {
    from: "client", to: "server", label: "{Finished} + HTTP/2 GET /", t: 2, osi: [6, 7], protocolId: "http2", encrypted: true,
    sub: { es: "preface + SETTINGS + HEADERS (stream 1)", en: "preface + SETTINGS + HEADERS (stream 1)" },
    basic: {
      es: "El cliente valida el certificado, confirma el handshake y en el mismo envío manda la petición.",
      en: "The client validates the certificate, confirms the handshake and sends the request in the same flight.",
    },
    technical: {
      es: "El cliente verifica la cadena hasta una CA raíz de confianza, el nombre (SAN) y la firma. Envía su Finished y, sin esperar, el preámbulo de conexión HTTP/2 (PRI * HTTP/2.0 + SETTINGS) y la trama HEADERS con GET /, ya cifrados con las claves de tráfico de aplicación.",
      en: "The client verifies the chain up to a trusted root CA, the name (SAN) and the signature. It sends its Finished and, without waiting, the HTTP/2 connection preface (PRI * HTTP/2.0 + SETTINGS) and the HEADERS frame with GET /, already encrypted with application traffic keys.",
    },
  },
  {
    from: "server", to: "client", label: "HEADERS :status 200 + DATA", t: 2.5, osi: [7], protocolId: "http2", encrypted: true,
    sub: { es: "respuesta recibida a los 3 RTT", en: "response received at 3 RTT" },
    basic: {
      es: "El servidor responde con la página.",
      en: "The server answers with the page.",
    },
    technical: {
      es: "La respuesta llega 3 RTT después del primer SYN. El servidor suele enviar también NewSessionTicket, que permite reanudar la sesión y usar 0-RTT en la próxima visita.",
      en: "The response arrives 3 RTT after the first SYN. The server usually also sends NewSessionTicket, enabling session resumption and 0-RTT on the next visit.",
    },
  },
];

export const HANDSHAKE_FLOWS: Flow[] = [
  {
    id: "tcp",
    title: { es: "TCP: handshake de 3 vías", en: "TCP: 3-way handshake" },
    description: {
      es: "Cómo dos hosts acuerdan números de secuencia y opciones antes de intercambiar un solo byte de datos.",
      en: "How two hosts agree on sequence numbers and options before exchanging a single data byte.",
    },
    actors: [client, server],
    messages: [
      ...TCP_OPEN,
      {
        from: "client", to: "server", label: "PSH, ACK (datos)", t: 1, osi: [4], protocolId: "tcp",
        sub: { es: "seq=1001 · len=517", en: "seq=1001 · len=517" },
        basic: { es: "Ya se pueden enviar datos.", en: "Data can now be sent." },
        technical: {
          es: "Los datos empiezan en seq = 1001. Con TCP Fast Open (RFC 7413) y una cookie previa, estos datos podrían viajar en el propio SYN y ahorrar 1 RTT, aunque su despliegue es limitado porque algunos equipos intermedios descartan SYN con datos.",
          en: "Data starts at seq = 1001. With TCP Fast Open (RFC 7413) and a prior cookie, this data could ride in the SYN itself and save 1 RTT, though deployment is limited because some middleboxes drop SYNs with data.",
        },
      },
    ],
    summary: { es: "1 RTT antes de poder enviar datos.", en: "1 RTT before any data can be sent." },
  },
  {
    id: "https-tcp",
    title: { es: "HTTPS sobre TCP + TLS 1.3", en: "HTTPS over TCP + TLS 1.3" },
    description: {
      es: "La combinación clásica de HTTP/2: primero se abre TCP, después TLS y al final la petición.",
      en: "The classic HTTP/2 stack: TCP opens first, then TLS, then the request.",
    },
    actors: [client, server],
    messages: [...TCP_OPEN, ...TLS13_OVER_TCP],
    summary: { es: "Petición enviada a los 2 RTT; respuesta a los 3 RTT.", en: "Request sent at 2 RTT; response at 3 RTT." },
    rttToResponse: 3,
  },
  {
    id: "quic",
    title: { es: "HTTP/3 sobre QUIC", en: "HTTP/3 over QUIC" },
    description: {
      es: "QUIC negocia el transporte y la criptografía en el mismo viaje, sobre UDP.",
      en: "QUIC negotiates transport and cryptography in the same flight, over UDP.",
    },
    actors: [client, server],
    messages: [
      {
        from: "client", to: "server", label: "Initial [ClientHello]", t: 0, osi: [4, 6], protocolId: "quic",
        sub: { es: "UDP 443 · ≥ 1200 B · ALPN=h3", en: "UDP 443 · ≥ 1200 B · ALPN=h3" },
        basic: {
          es: "El primer paquete ya incluye el saludo TLS: no hay un paso previo para abrir la conexión.",
          en: "The very first packet already carries the TLS hello: there is no separate connection-setup step.",
        },
        technical: {
          es: "El ClientHello de TLS 1.3 viaja en un frame CRYPTO dentro de un paquete Initial, rellenado hasta al menos 1200 B para limitar la amplificación. Las claves Initial se derivan del Destination Connection ID: protegen contra alteraciones accidentales, pero no frente a un observador.",
          en: "The TLS 1.3 ClientHello travels in a CRYPTO frame inside an Initial packet padded to at least 1200 B to limit amplification. Initial keys are derived from the Destination Connection ID: they protect against accidental tampering, not against an observer.",
        },
      },
      {
        from: "server", to: "client", label: "Initial [ServerHello] + Handshake [EE, Cert, CV, Fin]", t: 0.5, osi: [4, 6], protocolId: "quic", encrypted: true,
        sub: { es: "límite anti-amplificación: 3× lo recibido", en: "anti-amplification limit: 3× received" },
        basic: {
          es: "El servidor responde con su parte del handshake y su certificado, igual que en TLS 1.3.",
          en: "The server replies with its handshake and certificate, just like TLS 1.3.",
        },
        technical: {
          es: "Los parámetros de transporte de QUIC (límites de flujo, Connection IDs) viajan como una extensión TLS, así que transporte y criptografía se acuerdan a la vez. Hasta validar la dirección del cliente, el servidor no puede enviar más de 3 veces lo recibido (RFC 9000 §8).",
          en: "QUIC transport parameters (flow limits, Connection IDs) travel as a TLS extension, so transport and crypto are agreed together. Until the client's address is validated, the server may not send more than 3× what it received (RFC 9000 §8).",
        },
      },
      {
        from: "client", to: "server", label: "Handshake [Finished] + 1-RTT [HEADERS GET /]", t: 1, osi: [4, 6, 7], protocolId: "http3", encrypted: true,
        sub: { es: "stream 0 · QPACK", en: "stream 0 · QPACK" },
        basic: {
          es: "Tras un solo viaje de ida y vuelta, el cliente ya envía la petición.",
          en: "After a single round trip, the client is already sending the request.",
        },
        technical: {
          es: "La petición HTTP/3 va en un stream bidireccional (el 0), dentro de paquetes 1-RTT. Las cabeceras usan QPACK en lugar de HPACK para no depender del orden de llegada entre streams.",
          en: "The HTTP/3 request goes on a bidirectional stream (stream 0) in 1-RTT packets. Headers use QPACK instead of HPACK so they do not depend on cross-stream arrival order.",
        },
      },
      {
        from: "server", to: "client", label: "1-RTT [HEADERS :status 200 + DATA]", t: 1.5, osi: [4, 7], protocolId: "http3", encrypted: true,
        sub: { es: "respuesta recibida a los 2 RTT", en: "response received at 2 RTT" },
        basic: { es: "La respuesta llega un viaje antes que con TCP + TLS.", en: "The response arrives one round trip earlier than with TCP + TLS." },
        technical: {
          es: "Respuesta a los 2 RTT, uno menos que con TCP + TLS 1.3. Además, si se pierde un paquete de otro stream, este no se bloquea: no hay bloqueo de cabeza de línea entre streams.",
          en: "Response at 2 RTT, one fewer than TCP + TLS 1.3. And if a packet of another stream is lost, this one is not stalled: no cross-stream head-of-line blocking.",
        },
      },
    ],
    summary: { es: "Petición enviada a 1 RTT; respuesta a los 2 RTT.", en: "Request sent at 1 RTT; response at 2 RTT." },
    rttToResponse: 2,
  },
  {
    id: "quic-0rtt",
    title: { es: "QUIC con 0-RTT (reanudación)", en: "QUIC with 0-RTT (resumption)" },
    description: {
      es: "En una visita repetida, el cliente envía la petición en el primer paquete.",
      en: "On a repeat visit, the client sends the request in the very first packet.",
    },
    actors: [client, server],
    messages: [
      {
        from: "client", to: "server", label: "Initial [ClientHello + PSK] + 0-RTT [GET /]", t: 0, osi: [4, 6, 7], protocolId: "quic", encrypted: true,
        sub: { es: "early_data · ticket de sesión previo", en: "early_data · prior session ticket" },
        basic: {
          es: "Como ya se conocían, el cliente manda la petición junto con el saludo.",
          en: "Because they met before, the client sends the request together with the hello.",
        },
        technical: {
          es: "Con un ticket de una visita anterior (PSK), el cliente cifra la petición con la clave de early data y la envía junto al ClientHello. Solo deben ir peticiones idempotentes: un atacante podría reenviar (replay) estos paquetes.",
          en: "Using a ticket from a previous visit (PSK), the client encrypts the request with the early-data key and sends it alongside the ClientHello. Only idempotent requests belong here: an attacker could replay these packets.",
        },
      },
      {
        from: "server", to: "client", label: "Initial [SH] + Handshake [EE, Fin] + 1-RTT [200 OK]", t: 0.5, osi: [4, 6, 7], protocolId: "quic", encrypted: true,
        sub: { es: "respuesta recibida a 1 RTT", en: "response received at 1 RTT" },
        basic: { es: "La respuesta llega en un solo viaje de ida y vuelta.", en: "The response arrives in a single round trip." },
        technical: {
          es: "El servidor acepta el early data y responde de inmediato. Con PSK no reenvía el certificado, lo que hace el vuelo más pequeño. Puede rechazar el 0-RTT (por ejemplo, si el ticket expiró), y entonces el cliente reenvía la petición en 1-RTT.",
          en: "The server accepts the early data and answers right away; with a PSK it does not resend the certificate, making the flight smaller. It may reject 0-RTT (e.g. expired ticket), in which case the client resends the request in 1-RTT.",
        },
      },
      {
        from: "client", to: "server", label: "Handshake [Finished]", t: 1, osi: [4, 6], protocolId: "quic", encrypted: true,
        basic: { es: "El cliente cierra el handshake.", en: "The client completes the handshake." },
        technical: {
          es: "A partir de aquí todo usa claves 1-RTT con secreto hacia adelante completo; los datos 0-RTT no lo tenían.",
          en: "From here on everything uses 1-RTT keys with full forward secrecy, which the 0-RTT data lacked.",
        },
      },
    ],
    summary: { es: "Respuesta en 1 RTT (solo al reanudar).", en: "Response in 1 RTT (resumption only)." },
    rttToResponse: 1,
  },
];

/** Tiempo hasta recibir la primera respuesta, en RTT, para comparar pilas. */
export const RTT_COMPARISON: { id: string; label: string; rtt: number; note: L }[] = [
  { id: "tls12", label: "TCP + TLS 1.2", rtt: 4, note: { es: "1 TCP + 2 TLS + 1 petición", en: "1 TCP + 2 TLS + 1 request" } },
  { id: "https-tcp", label: "TCP + TLS 1.3", rtt: 3, note: { es: "1 TCP + 1 TLS + 1 petición", en: "1 TCP + 1 TLS + 1 request" } },
  { id: "tls13-0rtt", label: "TCP + TLS 1.3 0-RTT", rtt: 2, note: { es: "1 TCP + petición en early data", en: "1 TCP + request in early data" } },
  { id: "quic", label: "QUIC (HTTP/3)", rtt: 2, note: { es: "1 QUIC+TLS + 1 petición", en: "1 QUIC+TLS + 1 request" } },
  { id: "quic-0rtt", label: "QUIC 0-RTT", rtt: 1, note: { es: "petición en el primer paquete", en: "request in the first packet" } },
];

export const URL_FLOW: Flow = {
  id: "url",
  title: { es: "¿Qué pasa cuando escribes una URL?", en: "What happens when you type a URL?" },
  description: {
    es: "Desde que presionas Enter en https://example.com hasta que ves la página, tocando cada capa del modelo.",
    en: "From pressing Enter on https://example.com to seeing the page, touching every layer of the model.",
  },
  actors: [
    { id: "browser", label: { es: "Navegador", en: "Browser" } },
    { id: "gateway", label: { es: "Router (gateway)", en: "Router (gateway)" } },
    { id: "resolver", label: { es: "Resolvedor DNS", en: "DNS resolver" } },
    { id: "dns", label: { es: "Raíz · TLD · autoritativo", en: "Root · TLD · authoritative" } },
    { id: "server", label: { es: "Servidor web", en: "Web server" } },
  ],
  messages: [
    {
      from: "browser", to: "browser", label: "Parse URL · HSTS", osi: [7],
      basic: {
        es: "El navegador interpreta lo que escribiste: qué sitio, qué página, y que debe conectarse de forma segura.",
        en: "The browser interprets what you typed: which site, which page, and that it must connect securely.",
      },
      technical: {
        es: "https://example.com/ se descompone en esquema https (puerto 443), host example.com y ruta /. Se consulta la lista HSTS: si el dominio está en ella, nunca intentará HTTP en claro. Si el texto no parece una URL, se envía al buscador predeterminado.",
        en: "https://example.com/ splits into scheme https (port 443), host example.com and path /. The HSTS list is checked: if the domain is on it, plain HTTP is never attempted. If the text does not look like a URL, it goes to the default search engine.",
      },
    },
    {
      from: "browser", to: "browser", label: "Caches (HTTP · DNS · hosts)", osi: [7],
      basic: {
        es: "Primero revisa si ya tiene guardada la página o la dirección del sitio de una visita anterior.",
        en: "First it checks whether it already stored the page or the site's address from a previous visit.",
      },
      technical: {
        es: "Busca en su caché HTTP y luego la IP en la caché DNS del navegador, en la del sistema operativo y en el archivo hosts. Si hay una entrada válida (con el TTL vigente), se salta los pasos de DNS.",
        en: "It checks its HTTP cache, then the IP in the browser's DNS cache, the OS cache and the hosts file. A valid entry (TTL not expired) skips the DNS steps.",
      },
    },
    {
      from: "browser", to: "gateway", label: "ARP Request (broadcast)", osi: [2, 3], protocolId: "arp",
      sub: { es: "¿Quién tiene 192.168.1.1? Responde a 192.168.1.34", en: "Who has 192.168.1.1? Tell 192.168.1.34" },
      basic: {
        es: "Para salir de tu red, la computadora necesita la dirección física del router, así que se la pregunta a toda la red local.",
        en: "To leave your network, the computer needs the router's physical address, so it asks the whole local network.",
      },
      technical: {
        es: "El resolvedor DNS, como el resto de Internet, está fuera de la subred, así que el siguiente salto es el gateway. Si su MAC no está en la caché ARP, se envía una trama a FF:FF:FF:FF:FF:FF con EtherType 0x0806.",
        en: "The DNS resolver, like the rest of the Internet, is outside the subnet, so the next hop is the gateway. If its MAC is not in the ARP cache, a frame is sent to FF:FF:FF:FF:FF:FF with EtherType 0x0806.",
      },
    },
    {
      from: "gateway", to: "browser", label: "ARP Reply", osi: [2, 3], protocolId: "arp",
      sub: { es: "192.168.1.1 está en a4:5e:60:c2:11:08", en: "192.168.1.1 is at a4:5e:60:c2:11:08" },
      basic: { es: "El router responde con su dirección física.", en: "The router answers with its physical address." },
      technical: {
        es: "La respuesta es unicast y la entrada queda unos minutos en la caché ARP (ip neigh). En IPv6, el mismo papel lo cumple NDP con Neighbor Solicitation y Neighbor Advertisement.",
        en: "Unicast reply; the entry is cached for minutes (ip neigh). With IPv6, NDP plays the same role with Neighbor Solicitation/Advertisement.",
      },
    },
    {
      from: "browser", to: "resolver", label: "DNS Query A / AAAA", osi: [7, 4], protocolId: "dns",
      sub: { es: "example.com · UDP 53 · RD=1", en: "example.com · UDP 53 · RD=1" },
      basic: {
        es: "La computadora pregunta a su servidor DNS qué dirección IP corresponde a example.com.",
        en: "The computer asks its DNS server which IP address belongs to example.com.",
      },
      technical: {
        es: "El resolvedor stub del sistema envía consultas A y AAAA con Recursion Desired, por UDP 53, salvo que esté configurado DoH o DoT (cifrados). El ID de 16 bits y el puerto de origen aleatorio dificultan el envenenamiento de caché.",
        en: "The OS stub resolver sends A and AAAA queries with Recursion Desired over UDP 53, unless DoH/DoT (encrypted) is configured. The 16-bit ID and random source port make cache poisoning harder.",
      },
    },
    {
      from: "resolver", to: "dns", label: "Root → .com → example.com", osi: [7, 4], protocolId: "dns",
      sub: { es: "resolución iterativa · referencias NS", en: "iterative resolution · NS referrals" },
      basic: {
        es: "Si no lo sabe, el resolvedor pregunta en cadena: a la raíz, a los servidores de .com y por último al servidor del dominio.",
        en: "If it does not know, the resolver asks in a chain: the root, the .com servers, and finally the domain's own server.",
      },
      technical: {
        es: "La raíz responde con una referencia a los servidores de .com; estos, a los NS de example.com, y el autoritativo entrega el registro A. Con DNSSEC, el resolvedor valida la cadena de firmas (DS/RRSIG) desde la raíz. Cada respuesta se guarda en caché según su TTL.",
        en: "The root refers to the .com servers, they refer to example.com's NS, and the authoritative server returns the A record. With DNSSEC the resolver validates the signature chain (DS/RRSIG) from the root. Each answer is cached per its TTL.",
      },
    },
    {
      from: "resolver", to: "browser", label: "DNS Response", osi: [7, 4], protocolId: "dns",
      sub: { es: "A 203.0.113.10 · TTL 3600", en: "A 203.0.113.10 · TTL 3600" },
      basic: { es: "Llega la respuesta: la IP del sitio.", en: "The answer arrives: the site's IP." },
      technical: {
        es: "Respuesta recursiva con el registro A (y AAAA si existe). Si hay ambos, el navegador aplica Happy Eyeballs (RFC 8305): intenta IPv6 y, si tarda, prueba IPv4 en paralelo.",
        en: "Recursive answer with the A record (and AAAA if present). With both, the browser applies Happy Eyeballs (RFC 8305): it tries IPv6 and races IPv4 if it is slow.",
      },
    },
    {
      from: "browser", to: "server", label: "TCP SYN → SYN-ACK → ACK", osi: [4, 3], protocolId: "tcp",
      sub: { es: "192.168.1.34:54321 → 203.0.113.10:443 · 1 RTT", en: "192.168.1.34:54321 → 203.0.113.10:443 · 1 RTT" },
      basic: { es: "Abre una conexión confiable con el servidor.", en: "It opens a reliable connection to the server." },
      technical: {
        es: "Handshake de 3 vías hacia el puerto 443. Cada paquete pasa por el gateway, que hace NAT: reescribe 192.168.1.34:54321 con su IP pública y guarda la traducción para reconocer las respuestas.",
        en: "3-way handshake to port 443. Every packet crosses the gateway, which performs NAT: it rewrites 192.168.1.34:54321 to its public IP and keeps the mapping to match replies.",
      },
    },
    {
      from: "browser", to: "server", label: "TLS 1.3 ClientHello", osi: [6, 5], protocolId: "tls",
      sub: { es: "SNI=example.com · ALPN=h2,http/1.1", en: "SNI=example.com · ALPN=h2,http/1.1" },
      basic: {
        es: "Empieza el saludo seguro: el navegador propone cómo cifrar la conversación.",
        en: "The secure greeting starts: the browser proposes how to encrypt the conversation.",
      },
      technical: {
        es: "Incluye versiones, suites de cifrado, key_share, SNI y ALPN. El SNI viaja en claro, salvo que se use Encrypted Client Hello (ECH).",
        en: "Carries versions, cipher suites, key_share, SNI and ALPN. SNI is visible in clear unless Encrypted Client Hello (ECH) is used.",
      },
    },
    {
      from: "server", to: "browser", label: "ServerHello … Certificate … Finished", osi: [6, 5], protocolId: "tls", encrypted: true,
      basic: {
        es: "El servidor demuestra quién es con un certificado firmado por una autoridad de confianza.",
        en: "The server proves who it is with a certificate signed by a trusted authority.",
      },
      technical: {
        es: "El navegador verifica la cadena de certificados hasta una CA raíz de su almacén, la vigencia, que example.com aparezca en el SAN y el estado de revocación (por ejemplo, con OCSP stapling). Si algo falla, muestra la advertencia de «la conexión no es privada».",
        en: "The browser verifies the chain up to a root CA in its store, the validity period, that example.com is in the SAN, and revocation status (e.g. OCSP stapling). Any failure triggers the “connection is not private” warning.",
      },
    },
    {
      from: "browser", to: "server", label: "HTTP/2: SETTINGS + GET /", osi: [7], protocolId: "http2", encrypted: true,
      sub: { es: ":method GET · :path / · :authority example.com", en: ":method GET · :path / · :authority example.com" },
      basic: { es: "Por fin pide la página.", en: "It finally requests the page." },
      technical: {
        es: "Preámbulo PRI * HTTP/2.0, trama SETTINGS y HEADERS en el stream 1 con HPACK. Todo va cifrado en registros TLS, dentro de segmentos TCP, paquetes IP y tramas Ethernet: exactamente lo que muestra el simulador de encapsulamiento.",
        en: "PRI * HTTP/2.0 preface, a SETTINGS frame and HEADERS on stream 1 with HPACK — all encrypted in TLS records inside TCP segments, IP packets and Ethernet frames: exactly what the encapsulation simulator shows.",
      },
    },
    {
      from: "server", to: "browser", label: "200 OK + HTML", osi: [7], protocolId: "http2", encrypted: true,
      sub: { es: "HEADERS :status 200 · DATA", en: "HEADERS :status 200 · DATA" },
      basic: { es: "El servidor envía la página.", en: "The server sends the page." },
      technical: {
        es: "Cabeceras de respuesta (content-type, cache-control, alt-svc) y el HTML en tramas DATA. Si el servidor anuncia HTTP/3 con Alt-Svc o con un registro DNS HTTPS (RFC 9460), la próxima visita puede usar QUIC.",
        en: "Response headers (content-type, cache-control, alt-svc) and the HTML in DATA frames. If the server advertises HTTP/3 via Alt-Svc or a DNS HTTPS record (RFC 9460), the next visit can use QUIC.",
      },
    },
    {
      from: "browser", to: "browser", label: "Parse · Fetch · Render", osi: [7],
      basic: {
        es: "El navegador lee la página, descarga estilos, scripts e imágenes y la dibuja en pantalla.",
        en: "The browser reads the page, downloads styles, scripts and images, and paints it on screen.",
      },
      technical: {
        es: "Analiza el HTML y construye el DOM; descubre CSS, JS e imágenes y los pide por la misma conexión multiplexada (o a otros dominios, repitiendo DNS, TCP y TLS). Con el DOM y el CSSOM calcula el layout y pinta.",
        en: "It parses the HTML into the DOM, discovers CSS, JS and images and fetches them over the same multiplexed connection (or other origins, repeating DNS, TCP and TLS). With DOM + CSSOM it computes layout and paints.",
      },
    },
  ],
  summary: {
    es: "Una sola página toca las 7 capas: L2 para ARP, L3 e IP en cada salto, L4 para TCP, L5/L6 para TLS y L7 para DNS y HTTP.",
    en: "A single page load touches all 7 layers: L2 for ARP, L3/IP at every hop, L4 for TCP, L5/L6 for TLS and L7 for DNS and HTTP.",
  },
};
