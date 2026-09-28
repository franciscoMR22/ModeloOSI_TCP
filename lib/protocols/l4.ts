import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L4_PROTOCOLS: Protocol[] = [
  {
    id: "tcp",
    acronym: "TCP",
    fullName: { es: "Protocolo de Control de Transmisión", en: "Transmission Control Protocol" },
    osi: [4],
    category: "transport",
    status: "current",
    bodies: ["IETF"],
    year: 1981,
    identifiers: ["IP protocol 6"],
    summary: {
      es: "TCP garantiza que los datos lleguen completos, en orden y sin duplicados entre dos programas, aunque la red por debajo pierda o desordene paquetes. Es la base de la web, el correo y casi cualquier transferencia que no pueda perder información.",
      en: "TCP guarantees that data arrives complete, in order and without duplicates between two programs, even when the network underneath loses or reorders packets. It underpins the web, email and almost any transfer that cannot afford to lose information.",
    },
    analogy: {
      es: "Como enviar un libro por mensajería hoja por hoja: cada hoja va numerada, el destinatario confirma cuáles recibió y el remitente reenvía las que falten antes de que se arme el libro.",
      en: "Like shipping a book page by page: every page is numbered, the recipient confirms which ones arrived, and the sender resends the missing ones before the book is put back together.",
    },
    everyday: {
      es: "Cada vez que abres una página HTTPS, descargas un archivo o sincronizas tu correo.",
      en: "Every time you open an HTTPS page, download a file or sync your email.",
    },
    technical: [
      {
        es: "TCP ofrece un flujo de bytes confiable, orientado a conexión y full-duplex sobre IP, que no garantiza la entrega. Cada byte tiene un número de secuencia de 32 bits; el receptor devuelve confirmaciones acumulativas (ACK) con el siguiente byte que espera, y el emisor retransmite lo que no se confirma antes de que expire el temporizador de retransmisión (RTO), calculado a partir del RTT medido.",
        en: "TCP provides a reliable, connection-oriented, full-duplex byte stream over IP, which does not guarantee delivery. Every byte carries a 32-bit sequence number; the receiver returns cumulative acknowledgements (ACK) with the next byte it expects, and the sender retransmits anything not acknowledged before the retransmission timeout (RTO), derived from the measured RTT, expires.",
      },
      {
        es: "El control de flujo evita saturar al receptor: este anuncia en cada segmento su ventana de recepción (rwnd, 16 bits, ampliable hasta 2^30 bytes con Window Scale). El control de congestión evita saturar la red: el emisor mantiene una ventana de congestión (cwnd) que crece con slow start y congestion avoidance y se reduce ante pérdidas (RFC 5681). En la práctica envía como máximo min(rwnd, cwnd) bytes sin confirmar.",
        en: "Flow control protects the receiver: it advertises its receive window (rwnd, 16 bits, extendable up to 2^30 bytes with Window Scale) in every segment. Congestion control protects the network: the sender keeps a congestion window (cwnd) that grows through slow start and congestion avoidance and shrinks on loss (RFC 5681). In practice it sends at most min(rwnd, cwnd) unacknowledged bytes.",
      },
      {
        es: "Una conexión se identifica por la 4-tupla (IP origen, puerto origen, IP destino, puerto destino). Se abre con el handshake de 3 vías y se cierra de forma ordenada con FIN en cada sentido; el extremo que cierra primero pasa por TIME_WAIT durante 2×MSL para absorber segmentos retrasados. RFC 9293 (2022) consolidó en un solo documento la especificación original de 1981 y sus correcciones.",
        en: "A connection is identified by the 4-tuple (source IP, source port, destination IP, destination port). It opens with the 3-way handshake and closes gracefully with a FIN in each direction; the side that closes first sits in TIME_WAIT for 2×MSL to absorb delayed segments. RFC 9293 (2022) consolidated the original 1981 specification and its errata into a single document.",
      },
    ],
    howItWorks: [
      { es: "SYN: el cliente elige un número de secuencia inicial (ISN) aleatorio y lo envía con el flag SYN.", en: "SYN: the client picks a random initial sequence number (ISN) and sends it with the SYN flag." },
      { es: "SYN-ACK: el servidor confirma ISN+1 y envía su propio ISN.", en: "SYN-ACK: the server acknowledges ISN+1 and sends its own ISN." },
      { es: "ACK: el cliente confirma el ISN del servidor; la conexión queda ESTABLISHED (1 RTT de coste).", en: "ACK: the client acknowledges the server's ISN; the connection becomes ESTABLISHED (1 RTT of cost)." },
      { es: "Transferencia: los datos se dividen en segmentos ≤ MSS, se confirman y se retransmiten si se pierden.", en: "Transfer: data is split into segments ≤ MSS, acknowledged, and retransmitted if lost." },
      { es: "Cierre: FIN → ACK en cada sentido (o RST para abortar).", en: "Teardown: FIN → ACK in each direction (or RST to abort)." },
    ],
    facts: [
      { label: { es: "Cabecera", en: "Header" }, value: { es: "20 B mínimo, hasta 60 B con opciones", en: "20 B minimum, up to 60 B with options" } },
      { label: { es: "Orientado a conexión", en: "Connection-oriented" }, value: { es: "Sí (handshake de 3 vías)", en: "Yes (3-way handshake)" } },
      { label: { es: "Confiable", en: "Reliable" }, value: { es: "Sí: ACK, retransmisión, orden", en: "Yes: ACKs, retransmission, ordering" } },
      { label: { es: "Flags", en: "Flags" }, value: "CWR, ECE, URG, ACK, PSH, RST, SYN, FIN" },
      { label: { es: "Checksum", en: "Checksum" }, value: { es: "Obligatorio, incluye pseudo-cabecera IP", en: "Mandatory, covers an IP pseudo-header" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "No; se delega en TLS", en: "No; delegated to TLS" } },
    ],
    security: {
      es: "El SYN flood agota la tabla de conexiones semiabiertas; se mitiga con SYN cookies. Los ISN deben ser impredecibles (RFC 6528) para evitar el secuestro de sesiones, y RFC 5961 endurece TCP contra la inyección de RST y SYN ciegos. TCP no cifra ni autentica: la confidencialidad depende de TLS.",
      en: "A SYN flood exhausts the half-open connection table; SYN cookies mitigate it. ISNs must be unpredictable (RFC 6528) to prevent session hijacking, and RFC 5961 hardens TCP against blind RST and SYN injection. TCP neither encrypts nor authenticates: confidentiality relies on TLS.",
    },
    tools: [
      { command: "ss -tan", description: { es: "Lista sockets TCP y su estado (ESTAB, TIME-WAIT…)", en: "Lists TCP sockets and their state (ESTAB, TIME-WAIT…)" } },
      { command: "ss -ti", description: { es: "Muestra RTT, cwnd y retransmisiones por conexión", en: "Shows RTT, cwnd and retransmissions per connection" } },
      { command: "nc -vz example.com 443", description: { es: "Prueba si un puerto TCP acepta conexiones", en: "Checks whether a TCP port accepts connections" } },
    ],
    wireshark: "tcp.flags.syn == 1 && tcp.flags.ack == 0",
    relations: { dependsOn: ["ipv4", "ipv6"], usedBy: ["http1", "http2", "tls", "ssh", "smtp", "bgp"], replacedBy: [] },
    specs: [
      { id: "RFC 9293", title: { es: "Transmission Control Protocol (TCP)", en: "Transmission Control Protocol (TCP)" }, url: rfc(9293) },
      { id: "RFC 5681", title: { es: "Control de congestión de TCP", en: "TCP Congestion Control" }, url: rfc(5681) },
      { id: "RFC 6298", title: { es: "Cálculo del temporizador de retransmisión", en: "Computing TCP's Retransmission Timer" }, url: rfc(6298) },
    ],
  },
  {
    id: "udp",
    acronym: "UDP",
    fullName: { es: "Protocolo de Datagramas de Usuario", en: "User Datagram Protocol" },
    osi: [4],
    category: "transport",
    status: "current",
    bodies: ["IETF"],
    year: 1980,
    identifiers: ["IP protocol 17"],
    summary: {
      es: "UDP envía mensajes independientes sin establecer conexión ni confirmar su llegada. Es mínimo y rápido, ideal cuando es preferible perder un dato que esperar a que se reenvíe: llamadas, videojuegos, DNS o streaming en vivo.",
      en: "UDP sends independent messages without setting up a connection or confirming delivery. It is minimal and fast, ideal when losing a piece of data is better than waiting for it to be resent: calls, games, DNS or live streaming.",
    },
    analogy: {
      es: "Como mandar postales: cada una viaja por su cuenta, no hay acuse de recibo y pueden llegar desordenadas o no llegar.",
      en: "Like sending postcards: each travels on its own, there is no receipt, and they may arrive out of order or not at all.",
    },
    everyday: {
      es: "Al resolver un nombre de dominio, en videollamadas y en HTTP/3 (que viaja sobre QUIC, encima de UDP).",
      en: "When resolving a domain name, in video calls, and in HTTP/3 (which runs over QUIC on top of UDP).",
    },
    technical: [
      {
        es: "UDP añade a IP solo dos cosas: multiplexación por puertos y un checksum opcional. Su cabecera de 8 bytes contiene puerto origen, puerto destino, longitud y checksum. Preserva los límites de mensaje (cada send() produce un datagrama) y no tiene estado de conexión, retransmisión, orden ni control de congestión.",
        en: "UDP adds only two things to IP: port multiplexing and an optional checksum. Its 8-byte header holds source port, destination port, length and checksum. It preserves message boundaries (each send() yields one datagram) and has no connection state, retransmission, ordering or congestion control.",
      },
      {
        es: "El checksum es opcional en IPv4 (valor 0 = sin checksum) pero obligatorio en IPv6, salvo excepciones para túneles (RFC 6935/6936). Como UDP no reacciona a la congestión, RFC 8085 exige a las aplicaciones implementar su propio control de tasa, temporizadores y tamaño de datagrama que evite la fragmentación IP.",
        en: "The checksum is optional over IPv4 (value 0 = no checksum) but mandatory over IPv6, with tunnel exceptions (RFC 6935/6936). Because UDP does not react to congestion, RFC 8085 requires applications to implement their own rate control, timers and datagram sizing that avoids IP fragmentation.",
      },
      {
        es: "Esa simplicidad lo convierte en sustrato para protocolos que implementan su propia confiabilidad en espacio de usuario, como QUIC, o que toleran pérdidas, como RTP. También admite multicast y broadcast, cosa que TCP no puede.",
        en: "That simplicity makes it the substrate for protocols that implement their own reliability in user space, such as QUIC, or that tolerate loss, such as RTP. It also supports multicast and broadcast, which TCP cannot.",
      },
    ],
    facts: [
      { label: { es: "Cabecera", en: "Header" }, value: { es: "8 B fijos", en: "8 B fixed" } },
      { label: { es: "Orientado a conexión", en: "Connection-oriented" }, value: "No" },
      { label: { es: "Confiable", en: "Reliable" }, value: { es: "No: sin ACK, orden ni retransmisión", en: "No: no ACKs, ordering or retransmission" } },
      { label: { es: "Multicast / broadcast", en: "Multicast / broadcast" }, value: { es: "Sí", en: "Yes" } },
      { label: { es: "Tamaño máximo", en: "Maximum size" }, value: { es: "65 507 B de datos sobre IPv4 (limitado en la práctica por la MTU)", en: "65,507 B of payload over IPv4 (limited in practice by the MTU)" } },
    ],
    security: {
      es: "Como no hay handshake, la IP de origen se puede falsificar fácilmente. Eso permite ataques de reflexión y amplificación (DNS, NTP, memcached) en los que una respuesta grande se dirige a la víctima. Las mitigaciones son el filtrado de origen BCP 38 (RFC 2827), la limitación de tasa y cerrar servicios UDP abiertos innecesarios.",
      en: "With no handshake, the source IP is trivially spoofed. That enables reflection and amplification attacks (DNS, NTP, memcached) where a large response is aimed at the victim. Mitigations are BCP 38 source filtering (RFC 2827), rate limiting and closing unnecessary open UDP services.",
    },
    tools: [
      { command: "ss -uan", description: { es: "Lista sockets UDP abiertos", en: "Lists open UDP sockets" } },
      { command: "nc -u host 5000", description: { es: "Envía datagramas UDP a mano", en: "Sends UDP datagrams by hand" } },
      { command: "tcpdump -n udp port 53", description: { es: "Captura el tráfico DNS sobre UDP", en: "Captures DNS traffic over UDP" } },
    ],
    wireshark: "udp",
    relations: { dependsOn: ["ipv4", "ipv6"], usedBy: ["dns", "dhcp", "ntp", "quic", "snmp", "tftp", "coap", "rtcp"] },
    specs: [
      { id: "RFC 768", title: { es: "User Datagram Protocol", en: "User Datagram Protocol" }, url: rfc(768) },
      { id: "RFC 8085", title: { es: "Pautas de uso de UDP", en: "UDP Usage Guidelines" }, url: rfc(8085) },
    ],
  },
  {
    id: "quic",
    acronym: "QUIC",
    fullName: { es: "QUIC (transporte multiplexado y seguro sobre UDP)", en: "QUIC (multiplexed, secure transport over UDP)" },
    osi: [4],
    category: "transport",
    status: "current",
    bodies: ["IETF"],
    year: 2021,
    identifiers: ["UDP 443"],
    summary: {
      es: "QUIC es un transporte moderno que hace lo mismo que TCP + TLS pero en un solo protocolo, más rápido para abrir conexiones y sin que un paquete perdido frene todo lo demás. Es la base de HTTP/3.",
      en: "QUIC is a modern transport that does what TCP + TLS do but as a single protocol, faster to open connections and without one lost packet stalling everything else. It is the foundation of HTTP/3.",
    },
    analogy: {
      es: "Si TCP es una sola fila en la que todos esperan si alguien se detiene, QUIC abre varias filas independientes dentro del mismo pasillo: si una se atasca, las demás siguen avanzando.",
      en: "If TCP is a single queue where everyone waits when one person stops, QUIC opens several independent queues inside the same corridor: if one jams, the others keep moving.",
    },
    everyday: {
      es: "Google, YouTube, Meta y Cloudflare sirven gran parte de su tráfico por QUIC/HTTP/3.",
      en: "Google, YouTube, Meta and Cloudflare serve much of their traffic over QUIC/HTTP/3.",
    },
    technical: [
      {
        es: "QUIC corre sobre UDP y se implementa en espacio de usuario, lo que permite evolucionarlo sin cambiar el kernel ni los equipos intermedios. Integra el handshake de TLS 1.3 (RFC 9001): una conexión nueva queda lista en 1 RTT, y una reanudada puede enviar datos en 0-RTT. Todo el payload y casi toda la cabecera van cifrados; incluso el número de paquete tiene protección de cabecera.",
        en: "QUIC runs over UDP and is implemented in user space, so it can evolve without changing kernels or middleboxes. It integrates the TLS 1.3 handshake (RFC 9001): a new connection is ready in 1 RTT, and a resumed one can send data in 0-RTT. The whole payload and nearly all of the header are encrypted; even the packet number is header-protected.",
      },
      {
        es: "Multiplexa streams independientes dentro de una conexión, cada uno con su propio orden y control de flujo, así que una pérdida solo detiene su stream. Esto elimina el bloqueo de cabeza de línea que sufre HTTP/2 sobre TCP. La detección de pérdidas y el control de congestión (RFC 9002) usan números de paquete que nunca se reutilizan, lo que evita la ambigüedad de retransmisión de TCP.",
        en: "It multiplexes independent streams within one connection, each with its own ordering and flow control, so a loss only stalls its own stream. This removes the head-of-line blocking HTTP/2 suffers over TCP. Loss detection and congestion control (RFC 9002) use packet numbers that are never reused, avoiding TCP's retransmission ambiguity.",
      },
      {
        es: "Las conexiones se identifican por Connection IDs y no por la 4-tupla, así que sobreviven a un cambio de red (por ejemplo, de Wi-Fi a datos móviles) mediante la migración de conexión. RFC 8999 fija las invariantes independientes de la versión, y RFC 9369 define QUIC v2.",
        en: "Connections are identified by Connection IDs rather than the 4-tuple, so they survive a network change (e.g. Wi-Fi to cellular) through connection migration. RFC 8999 fixes the version-independent invariants, and RFC 9369 defines QUIC v2.",
      },
    ],
    howItWorks: [
      { es: "Initial: el cliente envía un ClientHello de TLS 1.3 dentro de paquetes Initial, rellenados hasta al menos 1200 B.", en: "Initial: the client sends a TLS 1.3 ClientHello inside Initial packets padded to at least 1200 B." },
      { es: "Handshake: el servidor responde con ServerHello, certificado y Finished; ya se pueden enviar datos (1 RTT).", en: "Handshake: the server replies with ServerHello, certificate and Finished; data can now flow (1 RTT)." },
      { es: "1-RTT: los streams de aplicación (por ejemplo, peticiones HTTP/3) viajan cifrados y multiplexados.", en: "1-RTT: application streams (e.g. HTTP/3 requests) travel encrypted and multiplexed." },
      { es: "Migración: si cambia la IP del cliente, el Connection ID mantiene la conexión tras validar la nueva ruta.", en: "Migration: if the client's IP changes, the Connection ID keeps the connection alive after the new path is validated." },
    ],
    facts: [
      { label: { es: "Sustrato", en: "Substrate" }, value: "UDP" },
      { label: { es: "Handshake", en: "Handshake" }, value: { es: "1 RTT (0-RTT al reanudar)", en: "1 RTT (0-RTT on resumption)" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "Obligatorio (TLS 1.3 integrado)", en: "Mandatory (built-in TLS 1.3)" } },
      { label: { es: "Multiplexación", en: "Multiplexing" }, value: { es: "Streams sin bloqueo de cabeza de línea", en: "Streams without head-of-line blocking" } },
      { label: { es: "Migración de conexión", en: "Connection migration" }, value: { es: "Sí (Connection IDs)", en: "Yes (Connection IDs)" } },
    ],
    security: {
      es: "Los datos 0-RTT se pueden reenviar (replay), así que solo deben usarse para peticiones idempotentes. Para evitar amplificación, un servidor no envía más de 3 veces lo recibido hasta validar la dirección del cliente (RFC 9000 §8). Como va cifrado, los firewalls no pueden inspeccionarlo; muchas redes corporativas bloquean UDP 443 para forzar el uso de TCP.",
      en: "0-RTT data can be replayed, so it should only carry idempotent requests. To prevent amplification, a server sends no more than 3× what it received until the client address is validated (RFC 9000 §8). Being encrypted, it cannot be inspected by firewalls; many corporate networks block UDP 443 to force a fallback to TCP.",
    },
    multiLayerNote: {
      es: "QUIC viaja sobre UDP (L4) pero reimplementa funciones de transporte (confiabilidad, flujo, congestión), incorpora el cifrado de TLS (tradicionalmente L6) y se diseñó junto con HTTP/3 (L7). Rompe la separación clásica de capas a propósito.",
      en: "QUIC rides on UDP (L4) yet reimplements transport functions (reliability, flow, congestion), embeds TLS encryption (traditionally L6), and was designed alongside HTTP/3 (L7). It deliberately breaks classic layer separation.",
    },
    tools: [
      { command: "curl --http3 -I https://cloudflare.com", description: { es: "Fuerza una petición por HTTP/3 sobre QUIC", en: "Forces a request over HTTP/3 on QUIC" } },
      { command: "SSLKEYLOGFILE=keys.log", description: { es: "Exporta las claves para que Wireshark pueda descifrar QUIC", en: "Exports keys so Wireshark can decrypt QUIC" } },
    ],
    wireshark: "quic",
    relations: { dependsOn: ["udp", "tls"], usedBy: ["http3", "doh"], replaces: [] },
    specs: [
      { id: "RFC 9000", title: { es: "QUIC: transporte multiplexado y seguro basado en UDP", en: "QUIC: A UDP-Based Multiplexed and Secure Transport" }, url: rfc(9000) },
      { id: "RFC 9001", title: { es: "Uso de TLS para proteger QUIC", en: "Using TLS to Secure QUIC" }, url: rfc(9001) },
      { id: "RFC 9002", title: { es: "Detección de pérdidas y control de congestión", en: "QUIC Loss Detection and Congestion Control" }, url: rfc(9002) },
      { id: "RFC 9369", title: { es: "QUIC versión 2", en: "QUIC Version 2" }, url: rfc(9369) },
    ],
  },
  {
    id: "sctp",
    acronym: "SCTP",
    fullName: { es: "Protocolo de Transmisión de Control de Flujo", en: "Stream Control Transmission Protocol" },
    osi: [4],
    category: "transport",
    status: "current",
    bodies: ["IETF"],
    year: 2000,
    identifiers: ["IP protocol 132"],
    summary: {
      es: "SCTP es un transporte confiable como TCP, pero trabaja con mensajes en lugar de un flujo de bytes, puede llevar varios canales independientes en una sola asociación y usar varias direcciones IP a la vez para no caerse si falla una ruta. Se usa mucho en telecomunicaciones.",
      en: "SCTP is a reliable transport like TCP, but it works with messages instead of a byte stream, can carry several independent channels in one association and use several IP addresses at once so it survives a path failure. It is heavily used in telecom.",
    },
    everyday: {
      es: "Señalización de redes móviles 4G/5G y canales de datos de WebRTC (encapsulado sobre DTLS).",
      en: "Signalling in 4G/5G mobile networks and WebRTC data channels (encapsulated over DTLS).",
    },
    technical: [
      {
        es: "SCTP mantiene una asociación entre dos extremos que pueden tener varias direcciones IP (multi-homing). Una ruta es la primaria y las demás se vigilan con HEARTBEAT, para conmutar si la primaria falla. Dentro de la asociación hay múltiples streams con orden independiente (multi-streaming), lo que evita el bloqueo de cabeza de línea entre mensajes no relacionados.",
        en: "SCTP maintains an association between endpoints that may each have several IP addresses (multi-homing). One path is primary and the others are monitored with HEARTBEATs so traffic can fail over if the primary fails. Inside the association there are multiple independently ordered streams (multi-streaming), avoiding head-of-line blocking between unrelated messages.",
      },
      {
        es: "El paquete tiene una cabecera común de 12 bytes (puertos, verification tag y checksum CRC32c) seguida de chunks tipados (DATA, SACK, INIT, HEARTBEAT…). El inicio es un handshake de 4 vías con cookie firmada (INIT, INIT-ACK, COOKIE-ECHO, COOKIE-ACK): el servidor no guarda estado hasta recibir la cookie, lo que lo hace resistente a inundaciones tipo SYN flood.",
        en: "A packet has a 12-byte common header (ports, verification tag and CRC32c checksum) followed by typed chunks (DATA, SACK, INIT, HEARTBEAT…). Setup is a 4-way handshake with a signed cookie (INIT, INIT-ACK, COOKIE-ECHO, COOKIE-ACK): the server keeps no state until the cookie returns, making it resistant to SYN-flood-style attacks.",
      },
      {
        es: "Su despliegue en Internet abierto es limitado porque muchos NAT y firewalls solo entienden TCP y UDP. Por eso, en WebRTC se encapsula sobre DTLS/UDP (RFC 8261). RFC 9260 (2022) es la especificación vigente y reemplaza a RFC 4960.",
        en: "Deployment on the open Internet is limited because many NATs and firewalls only understand TCP and UDP. That is why WebRTC encapsulates it over DTLS/UDP (RFC 8261). RFC 9260 (2022) is the current specification, replacing RFC 4960.",
      },
    ],
    facts: [
      { label: { es: "Cabecera común", en: "Common header" }, value: { es: "12 B + chunks", en: "12 B + chunks" } },
      { label: { es: "Unidad", en: "Unit" }, value: { es: "Mensajes (preserva límites)", en: "Messages (boundaries preserved)" } },
      { label: { es: "Handshake", en: "Handshake" }, value: { es: "4 vías con cookie", en: "4-way with cookie" } },
      { label: { es: "Multi-homing", en: "Multi-homing" }, value: { es: "Sí", en: "Yes" } },
      { label: { es: "Checksum", en: "Checksum" }, value: "CRC32c" },
    ],
    security: {
      es: "El handshake con cookie y el verification tag de 32 bits dificultan la inyección ciega y los ataques de inundación. Aun así, SCTP no cifra: se protege con DTLS (RFC 6083) o con IPsec.",
      en: "The cookie handshake and the 32-bit verification tag make blind injection and flooding harder. SCTP still does not encrypt: it is protected with DTLS (RFC 6083) or IPsec.",
    },
    tools: [
      { command: "ss -S", description: { es: "Lista sockets SCTP en Linux", en: "Lists SCTP sockets on Linux" } },
      { command: "checksctp", description: { es: "Comprueba el soporte SCTP del kernel (lksctp-tools)", en: "Checks kernel SCTP support (lksctp-tools)" } },
    ],
    wireshark: "sctp",
    relations: { dependsOn: ["ipv4", "ipv6"], usedBy: ["dtls"] },
    specs: [
      { id: "RFC 9260", title: { es: "Stream Control Transmission Protocol", en: "Stream Control Transmission Protocol" }, url: rfc(9260) },
      { id: "RFC 8261", title: { es: "Encapsulación de SCTP sobre DTLS", en: "Datagram Transport Layer Security (DTLS) Encapsulation of SCTP Packets" }, url: rfc(8261) },
    ],
  },
  {
    id: "dccp",
    acronym: "DCCP",
    fullName: { es: "Protocolo de Control de Congestión de Datagramas", en: "Datagram Congestion Control Protocol" },
    osi: [4],
    category: "transport",
    status: "legacy",
    bodies: ["IETF"],
    year: 2006,
    identifiers: ["IP protocol 33"],
    summary: {
      es: "DCCP pretendía ser un punto medio: datagramas no confiables como UDP, pero con control de congestión como TCP, pensado para multimedia en tiempo real. Casi no se adoptó.",
      en: "DCCP aimed to be a middle ground: unreliable datagrams like UDP, but with TCP-style congestion control, designed for real-time media. It saw almost no adoption.",
    },
    technical: [
      {
        es: "DCCP establece una conexión y negocia un mecanismo de control de congestión intercambiable (CCID): CCID 2 imita el comportamiento AIMD de TCP (RFC 4341) y CCID 3 usa TFRC para una tasa más suave (RFC 4342). Confirma los paquetes para medir la congestión, pero no retransmite los datos perdidos.",
        en: "DCCP sets up a connection and negotiates a pluggable congestion control mechanism (CCID): CCID 2 mimics TCP's AIMD behaviour (RFC 4341) and CCID 3 uses TFRC for smoother rates (RFC 4342). It acknowledges packets to measure congestion but does not retransmit lost data.",
      },
      {
        es: "Tener un número de protocolo IP propio le impidió atravesar NAT y firewalls, y el ecosistema resolvió el mismo problema en espacio de usuario sobre UDP (RTP con control de congestión, y después QUIC). Por falta de uso, su implementación se retiró del kernel Linux en 2025.",
        en: "Having its own IP protocol number kept it from traversing NATs and firewalls, and the ecosystem solved the same problem in user space over UDP (congestion-controlled RTP, later QUIC). For lack of use, its implementation was removed from the Linux kernel in 2025.",
      },
    ],
    facts: [
      { label: { es: "Confiable", en: "Reliable" }, value: "No" },
      { label: { es: "Control de congestión", en: "Congestion control" }, value: { es: "Sí (CCID 2 / CCID 3)", en: "Yes (CCID 2 / CCID 3)" } },
      { label: { es: "Adopción", en: "Adoption" }, value: { es: "Muy baja", en: "Very low" } },
    ],
    wireshark: "dccp",
    relations: { dependsOn: ["ipv4", "ipv6"], replacedBy: ["quic"] },
    specs: [
      { id: "RFC 4340", title: { es: "Datagram Congestion Control Protocol", en: "Datagram Congestion Control Protocol" }, url: rfc(4340) },
      { id: "RFC 4341", title: { es: "CCID 2: control de congestión tipo TCP", en: "CCID 2: TCP-like Congestion Control" }, url: rfc(4341) },
      { id: "RFC 4342", title: { es: "CCID 3: TFRC", en: "CCID 3: TCP-Friendly Rate Control (TFRC)" }, url: rfc(4342) },
    ],
  },
  {
    id: "mptcp",
    acronym: "MPTCP",
    fullName: { es: "TCP Multiruta", en: "Multipath TCP" },
    osi: [4],
    category: "extensions",
    status: "current",
    bodies: ["IETF"],
    year: 2013,
    identifiers: ["TCP option kind 30"],
    summary: {
      es: "MPTCP permite que una misma conexión TCP use varias rutas a la vez, por ejemplo Wi-Fi y datos móviles, para ganar velocidad o no cortarse al cambiar de red. Para las aplicaciones sigue siendo un socket TCP normal.",
      en: "MPTCP lets a single TCP connection use several paths at once, such as Wi-Fi and cellular, to gain throughput or stay up when switching networks. To applications it still looks like a normal TCP socket.",
    },
    everyday: {
      es: "Apple lo usa desde 2013 en Siri y en otros servicios para pasar de Wi-Fi a datos móviles sin cortar la sesión.",
      en: "Apple has used it since 2013 for Siri and other services to hand over from Wi-Fi to cellular without dropping the session.",
    },
    technical: [
      {
        es: "Una conexión MPTCP está formada por subflujos, cada uno una conexión TCP ordinaria en la red, que se agregan con opciones TCP (kind 30): MP_CAPABLE negocia el soporte y las claves, MP_JOIN añade subflujos autenticados con HMAC-SHA256 y DSS mapea los bytes de cada subflujo a un número de secuencia de datos global.",
        en: "An MPTCP connection is made of subflows, each an ordinary TCP connection on the wire, bound together with TCP options (kind 30): MP_CAPABLE negotiates support and keys, MP_JOIN adds subflows authenticated with HMAC-SHA256, and DSS maps each subflow's bytes to a global data sequence number.",
      },
      {
        es: "El control de congestión acoplado (por ejemplo, LIA, RFC 6356) evita que la conexión multiruta sea más agresiva que un TCP normal en un cuello de botella compartido. Si un middlebox elimina las opciones, la conexión vuelve a TCP normal. RFC 8684 (v1) reemplaza a RFC 6824 (v0), y Linux lo incluye de forma nativa desde la versión 5.6.",
        en: "Coupled congestion control (e.g. LIA, RFC 6356) keeps the multipath connection from being more aggressive than regular TCP at a shared bottleneck. If a middlebox strips the options, the connection falls back to plain TCP. RFC 8684 (v1) replaces RFC 6824 (v0), and Linux ships it natively since version 5.6.",
      },
    ],
    facts: [
      { label: { es: "Compatibilidad", en: "Compatibility" }, value: { es: "Vuelve a TCP normal si no hay soporte", en: "Falls back to plain TCP without support" } },
      { label: { es: "Autenticación de subflujos", en: "Subflow authentication" }, value: "HMAC-SHA256" },
      { label: { es: "Casos de uso", en: "Use cases" }, value: { es: "Movilidad, agregación de enlaces", en: "Mobility, link aggregation" } },
    ],
    security: {
      es: "Las claves de MP_CAPABLE viajan en claro durante el handshake, así que un atacante en la ruta inicial puede secuestrar subflujos. MPTCP no aporta confidencialidad: debe combinarse con TLS.",
      en: "MP_CAPABLE keys travel in cleartext during the handshake, so an attacker on the initial path could hijack subflows. MPTCP provides no confidentiality: it should be combined with TLS.",
    },
    tools: [
      { command: "ip mptcp endpoint show", description: { es: "Muestra las direcciones que MPTCP puede usar", en: "Shows the addresses MPTCP may use" } },
      { command: "mptcpize run curl https://example.com", description: { es: "Ejecuta una aplicación TCP forzando MPTCP", en: "Runs a TCP application forcing MPTCP" } },
    ],
    wireshark: "mptcp",
    relations: { dependsOn: ["tcp"] },
    specs: [
      { id: "RFC 8684", title: { es: "Extensiones TCP para operación multiruta", en: "TCP Extensions for Multipath Operation with Multiple Addresses" }, url: rfc(8684) },
      { id: "RFC 6356", title: { es: "Control de congestión acoplado", en: "Coupled Congestion Control for Multipath Transport Protocols" }, url: rfc(6356) },
    ],
  },
  {
    id: "tcp-extensions",
    acronym: "TCP ext.",
    fullName: { es: "Extensiones de TCP (SACK, Window Scale, ECN, Fast Open, CUBIC)", en: "TCP Extensions (SACK, Window Scale, ECN, Fast Open, CUBIC)" },
    osi: [4],
    category: "extensions",
    status: "current",
    bodies: ["IETF"],
    year: 1992,
    summary: {
      es: "El TCP de 1981 se diseñó para redes lentas. Una serie de extensiones lo adaptó a enlaces de gigabits, a redes con pérdidas y a conexiones intercontinentales sin cambiar su esencia.",
      en: "The 1981 TCP was designed for slow networks. A series of extensions adapted it to gigabit links, lossy networks and intercontinental paths without changing its essence.",
    },
    technical: [
      {
        es: "Window Scale y Timestamps (RFC 7323): la ventana de 16 bits limita el rendimiento a 64 KiB por RTT; el factor de escala la amplía hasta 1 GiB. Los timestamps mejoran la medición del RTT y protegen contra números de secuencia reciclados (PAWS) en enlaces rápidos.",
        en: "Window Scale and Timestamps (RFC 7323): the 16-bit window caps throughput at 64 KiB per RTT; the scale factor extends it to 1 GiB. Timestamps improve RTT measurement and protect against wrapped sequence numbers (PAWS) on fast links.",
      },
      {
        es: "SACK (RFC 2018) permite confirmar bloques recibidos fuera de orden, para que el emisor retransmita solo los huecos y no todo lo posterior a una pérdida. RACK-TLP (RFC 8985) detecta las pérdidas por tiempo en lugar de contar ACK duplicados.",
        en: "SACK (RFC 2018) lets the receiver acknowledge out-of-order blocks so the sender retransmits only the gaps rather than everything after a loss. RACK-TLP (RFC 8985) detects losses by time instead of counting duplicate ACKs.",
      },
      {
        es: "ECN (RFC 3168) permite que los routers marquen la congestión en la cabecera IP en vez de descartar paquetes. TCP Fast Open (RFC 7413) envía datos en el mismo SYN usando una cookie previa. CUBIC (RFC 9438) es el control de congestión por defecto en Linux, Windows y macOS; BBR, de Google, estima el ancho de banda y el RTT en lugar de reaccionar a las pérdidas, pero aún no es un RFC.",
        en: "ECN (RFC 3168) lets routers mark congestion in the IP header instead of dropping packets. TCP Fast Open (RFC 7413) sends data in the SYN itself using a prior cookie. CUBIC (RFC 9438) is the default congestion control in Linux, Windows and macOS; Google's BBR estimates bandwidth and RTT instead of reacting to loss, but is not yet an RFC.",
      },
    ],
    facts: [
      { label: { es: "Negociación", en: "Negotiation" }, value: { es: "Opciones TCP en el SYN", en: "TCP options in the SYN" } },
      { label: { es: "Ventana máxima", en: "Maximum window" }, value: { es: "2^30 B con Window Scale", en: "2^30 B with Window Scale" } },
      { label: { es: "Control de congestión por defecto", en: "Default congestion control" }, value: "CUBIC (RFC 9438)" },
    ],
    tools: [
      { command: "sysctl net.ipv4.tcp_congestion_control", description: { es: "Algoritmo de congestión activo en Linux", en: "Active congestion control algorithm on Linux" } },
      { command: "ss -ti", description: { es: "Muestra wscale, SACK, cwnd y RTT por conexión", en: "Shows wscale, SACK, cwnd and RTT per connection" } },
    ],
    wireshark: "tcp.options.sack_perm || tcp.options.wscale.shift",
    relations: { dependsOn: ["tcp"] },
    specs: [
      { id: "RFC 7323", title: { es: "Extensiones TCP para alto rendimiento", en: "TCP Extensions for High Performance" }, url: rfc(7323) },
      { id: "RFC 2018", title: { es: "Confirmaciones selectivas (SACK)", en: "TCP Selective Acknowledgment Options" }, url: rfc(2018) },
      { id: "RFC 3168", title: { es: "Notificación explícita de congestión (ECN)", en: "The Addition of Explicit Congestion Notification (ECN) to IP" }, url: rfc(3168) },
      { id: "RFC 7413", title: { es: "TCP Fast Open", en: "TCP Fast Open" }, url: rfc(7413) },
      { id: "RFC 9438", title: { es: "CUBIC para redes rápidas y de larga distancia", en: "CUBIC for Fast and Long-Distance Networks" }, url: rfc(9438) },
      { id: "RFC 8985", title: { es: "RACK-TLP: detección de pérdidas por tiempo", en: "The RACK-TLP Loss Detection Algorithm for TCP" }, url: rfc(8985) },
    ],
  },
];
