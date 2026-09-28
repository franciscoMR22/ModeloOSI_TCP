import type { L } from "@/lib/i18n";

export interface HeaderField {
  name: string;
  /** Ancho en bits; `null` = longitud variable. */
  bits: number | null;
  example: string;
  basic: L;
  technical: L;
}

export interface HeaderSpec {
  id: HeaderId;
  title: L;
  spec: string;
  /** Tamaño fijo en bytes (sin campos variables). */
  fixedBytes: number;
  fields: HeaderField[];
}

export type HeaderId = "ethernet" | "ipv4" | "ipv6" | "tcp" | "udp" | "tls" | "http2";

export const HEADERS: Record<HeaderId, HeaderSpec> = {
  ethernet: {
    id: "ethernet",
    title: { es: "Trama Ethernet II", en: "Ethernet II frame" },
    spec: "IEEE 802.3 · Ethernet II (DIX)",
    fixedBytes: 18,
    fields: [
      {
        name: "Destination MAC",
        bits: 48,
        example: "a4:5e:60:c2:11:08",
        basic: {
          es: "A qué tarjeta de red va la trama dentro de la red local. Si el destino está en otra red, es la MAC del router.",
          en: "Which network card the frame is for on the local network. If the destination is on another network, it is the router's MAC.",
        },
        technical: {
          es: "MAC de 48 bits del siguiente salto, resuelta por ARP (IPv4) o NDP (IPv6). El bit I/G del primer octeto distingue unicast (0) de grupo (1) y el bit U/L indica si la dirección es universal o local. FF:FF:FF:FF:FF:FF es broadcast.",
          en: "48-bit MAC of the next hop, resolved by ARP (IPv4) or NDP (IPv6). The first octet's I/G bit marks unicast (0) vs group (1), and the U/L bit universal vs locally administered. FF:FF:FF:FF:FF:FF is broadcast.",
        },
      },
      {
        name: "Source MAC",
        bits: 48,
        example: "3c:22:fb:9a:04:7e",
        basic: { es: "La tarjeta de red que envía.", en: "The network card that sends it." },
        technical: {
          es: "MAC de la interfaz emisora. Los switches la aprenden para llenar su tabla de direcciones (CAM). Nunca puede ser una dirección de grupo.",
          en: "MAC of the sending interface. Switches learn it to populate their address (CAM) table. It can never be a group address.",
        },
      },
      {
        name: "EtherType",
        bits: 16,
        example: "0x0800 (IPv4)",
        basic: { es: "Qué protocolo va dentro: IPv4, IPv6, ARP…", en: "Which protocol is inside: IPv4, IPv6, ARP…" },
        technical: {
          es: "Los valores ≥ 0x0600 identifican el protocolo de la carga: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP, 0x8100 etiqueta 802.1Q. Los valores ≤ 1500 se interpretan como longitud (tramas IEEE 802.3 con LLC).",
          en: "Values ≥ 0x0600 identify the payload protocol: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP, 0x8100 802.1Q tag. Values ≤ 1500 are read as a length (IEEE 802.3 frames with LLC).",
        },
      },
      {
        name: "Payload",
        bits: null,
        example: "46–1500 B",
        basic: { es: "El paquete IP que se transporta.", en: "The IP packet being carried." },
        technical: {
          es: "De 46 a 1500 B (MTU). Si el paquete tiene menos de 46 B, se rellena (padding) para que la trama alcance el mínimo de 64 B, necesario para la detección de colisiones original.",
          en: "46–1500 B (MTU). Packets under 46 B are padded so the frame reaches the 64 B minimum, originally required for collision detection.",
        },
      },
      {
        name: "FCS",
        bits: 32,
        example: "0x9c3b61d2",
        basic: { es: "Código que detecta si la trama se dañó por el camino.", en: "A code that detects whether the frame was damaged in transit." },
        technical: {
          es: "Frame Check Sequence: CRC-32 calculado sobre las MAC, el EtherType y la carga, y colocado al final de la trama. Si el receptor no obtiene el mismo valor, descarta la trama sin avisar a nadie.",
          en: "Frame Check Sequence: a CRC-32 over the MACs, EtherType and payload, placed at the end of the frame. If the receiver computes a different value it silently discards the frame.",
        },
      },
    ],
  },
  ipv4: {
    id: "ipv4",
    title: { es: "Cabecera IPv4", en: "IPv4 header" },
    spec: "RFC 791",
    fixedBytes: 20,
    fields: [
      {
        name: "Version",
        bits: 4,
        example: "4",
        basic: { es: "Versión del protocolo IP.", en: "IP protocol version." },
        technical: {
          es: "Siempre 4. Permite al receptor distinguir IPv4 de IPv6 (6) antes de interpretar el resto.",
          en: "Always 4. Lets the receiver tell IPv4 from IPv6 (6) before parsing the rest.",
        },
      },
      {
        name: "IHL",
        bits: 4,
        example: "5",
        basic: { es: "Tamaño de la cabecera.", en: "Header size." },
        technical: {
          es: "Internet Header Length en palabras de 32 bits: 5 = 20 B sin opciones, máximo 15 = 60 B.",
          en: "Internet Header Length in 32-bit words: 5 = 20 B without options, up to 15 = 60 B.",
        },
      },
      {
        name: "DSCP",
        bits: 6,
        example: "0 (CS0)",
        basic: { es: "Prioridad del tráfico (voz, video, normal).", en: "Traffic priority (voice, video, normal)." },
        technical: {
          es: "Differentiated Services Code Point (RFC 2474): clase de servicio para QoS; por ejemplo, 46 = EF para voz. Reemplaza al antiguo campo ToS.",
          en: "Differentiated Services Code Point (RFC 2474): QoS service class, e.g. 46 = EF for voice. Replaces the old ToS field.",
        },
      },
      {
        name: "ECN",
        bits: 2,
        example: "00",
        basic: { es: "Aviso de congestión sin descartar paquetes.", en: "Congestion signal without dropping packets." },
        technical: {
          es: "Explicit Congestion Notification (RFC 3168): 00 = sin ECN, 01/10 = capaz de ECN, 11 = CE (un router marcó congestión).",
          en: "Explicit Congestion Notification (RFC 3168): 00 not-ECT, 01/10 ECN-capable, 11 CE (a router marked congestion).",
        },
      },
      {
        name: "Total Length",
        bits: 16,
        example: "{ipTotal}",
        basic: { es: "Tamaño total del paquete.", en: "Total packet size." },
        technical: {
          es: "Longitud del datagrama en bytes (cabecera + datos), con un máximo de 65 535; en Ethernet la limita la MTU de 1500 B.",
          en: "Datagram length in bytes (header + data), up to 65,535; on Ethernet it is bounded by the 1500 B MTU.",
        },
      },
      {
        name: "Identification",
        bits: 16,
        example: "0x1c46",
        basic: { es: "Número para reagrupar fragmentos.", en: "Number used to regroup fragments." },
        technical: {
          es: "Identifica los fragmentos de un mismo datagrama. Si DF está activo y no hay fragmentación, RFC 6864 permite que no sea único.",
          en: "Ties together fragments of one datagram. With DF set and no fragmentation, RFC 6864 allows it to be non-unique.",
        },
      },
      {
        name: "Flags",
        bits: 3,
        example: "010 (DF)",
        basic: { es: "Indica si se permite fragmentar el paquete.", en: "Whether the packet may be fragmented." },
        technical: {
          es: "Un bit reservado, DF (Don't Fragment) y MF (More Fragments). Con DF = 1, un router que no puede reenviar el paquete por su MTU responde con ICMP «Fragmentation Needed»: es la base de Path MTU Discovery.",
          en: "Reserved bit, DF (Don't Fragment) and MF (More Fragments). With DF = 1 a router that cannot forward it returns ICMP “Fragmentation Needed”, the basis of Path MTU Discovery.",
        },
      },
      {
        name: "Fragment Offset",
        bits: 13,
        example: "0",
        basic: { es: "Posición del fragmento dentro del paquete original.", en: "Fragment position within the original packet." },
        technical: {
          es: "Desplazamiento del fragmento, en unidades de 8 bytes, respecto al inicio de los datos del datagrama original.",
          en: "Offset of the fragment, in 8-byte units, from the start of the original datagram's data.",
        },
      },
      {
        name: "TTL",
        bits: 8,
        example: "64",
        basic: { es: "Cuántos saltos puede dar antes de descartarse.", en: "How many hops it may take before being discarded." },
        technical: {
          es: "Cada router lo decrementa en 1; al llegar a 0 descarta el paquete y envía ICMP Time Exceeded, lo que aprovecha traceroute. Valores iniciales típicos: 64 (Linux, macOS) y 128 (Windows).",
          en: "Each router decrements it by 1; at 0 it drops the packet and sends ICMP Time Exceeded, which traceroute exploits. Typical initial values: 64 (Linux/macOS), 128 (Windows).",
        },
      },
      {
        name: "Protocol",
        bits: 8,
        example: "6 (TCP)",
        basic: { es: "Qué protocolo transporta: TCP, UDP…", en: "Which protocol it carries: TCP, UDP…" },
        technical: {
          es: "Número de protocolo IANA de la carga: 1 ICMP, 6 TCP, 17 UDP, 50 ESP, 89 OSPF.",
          en: "IANA protocol number of the payload: 1 ICMP, 6 TCP, 17 UDP, 50 ESP, 89 OSPF.",
        },
      },
      {
        name: "Header Checksum",
        bits: 16,
        example: "0xb1e6",
        basic: { es: "Detecta daños en la cabecera.", en: "Detects header damage." },
        technical: {
          es: "Complemento a uno de la suma de las palabras de 16 bits de la cabecera. Se recalcula en cada salto porque cambia el TTL y solo cubre la cabecera. IPv6 lo eliminó.",
          en: "One's-complement sum of the header's 16-bit words. Recomputed at every hop because the TTL changes; covers only the header. IPv6 removed it.",
        },
      },
      {
        name: "Source Address",
        bits: 32,
        example: "192.168.1.34",
        basic: { es: "IP de quien envía.", en: "IP of the sender." },
        technical: {
          es: "Dirección IPv4 de origen. Un NAT la reescribe al salir a Internet y recalcula los checksums de IP y TCP.",
          en: "Source IPv4 address. A NAT rewrites it on the way to the Internet and recomputes the IP and TCP checksums.",
        },
      },
      {
        name: "Destination Address",
        bits: 32,
        example: "203.0.113.10",
        basic: { es: "IP del destino final.", en: "IP of the final destination." },
        technical: {
          es: "Dirección IPv4 de destino. No cambia en el camino (salvo por NAT) y es la que usan los routers para buscar el prefijo más largo en su tabla.",
          en: "Destination IPv4 address. It does not change en route (except through NAT) and is what routers match against the longest prefix.",
        },
      },
      {
        name: "Options",
        bits: null,
        example: "0–40 B",
        basic: { es: "Extras opcionales, casi nunca usados.", en: "Optional extras, rarely used." },
        technical: {
          es: "Opciones como Record Route o Timestamp. Son raras en la práctica: muchos routers las procesan por software (más lento) o las filtran.",
          en: "Options such as Record Route or Timestamp. Rare in practice: many routers process them in software (slow path) or filter them.",
        },
      },
    ],
  },
  ipv6: {
    id: "ipv6",
    title: { es: "Cabecera IPv6", en: "IPv6 header" },
    spec: "RFC 8200",
    fixedBytes: 40,
    fields: [
      {
        name: "Version",
        bits: 4,
        example: "6",
        basic: { es: "Versión del protocolo IP.", en: "IP protocol version." },
        technical: { es: "Siempre 6.", en: "Always 6." },
      },
      {
        name: "Traffic Class",
        bits: 8,
        example: "0x00",
        basic: { es: "Prioridad del tráfico.", en: "Traffic priority." },
        technical: {
          es: "Equivale a DSCP (6 bits) + ECN (2 bits) de IPv4.",
          en: "Equivalent to IPv4's DSCP (6 bits) + ECN (2 bits).",
        },
      },
      {
        name: "Flow Label",
        bits: 20,
        example: "0x3a2f1",
        basic: { es: "Marca los paquetes de una misma conversación.", en: "Tags packets of the same conversation." },
        technical: {
          es: "Identifica un flujo para darle un tratamiento uniforme; los routers lo usan, por ejemplo, para repartir carga entre rutas iguales (ECMP) sin mirar dentro del paquete (RFC 6437).",
          en: "Identifies a flow for uniform treatment; routers use it, e.g., for ECMP load balancing without parsing deeper (RFC 6437).",
        },
      },
      {
        name: "Payload Length",
        bits: 16,
        example: "{payloadV6}",
        basic: { es: "Tamaño de lo que va después de la cabecera.", en: "Size of what follows the header." },
        technical: {
          es: "Longitud en bytes de todo lo que sigue a la cabecera base de 40 B, incluidas las cabeceras de extensión.",
          en: "Length in bytes of everything after the 40 B base header, including extension headers.",
        },
      },
      {
        name: "Next Header",
        bits: 8,
        example: "6 (TCP)",
        basic: { es: "Qué viene a continuación.", en: "What comes next." },
        technical: {
          es: "Tipo de la siguiente cabecera: una de extensión (0 Hop-by-Hop, 43 Routing, 44 Fragment) o el protocolo superior, con la misma numeración que el campo Protocol de IPv4.",
          en: "Type of the next header: an extension header (0 Hop-by-Hop, 43 Routing, 44 Fragment) or the upper-layer protocol, numbered like IPv4's Protocol.",
        },
      },
      {
        name: "Hop Limit",
        bits: 8,
        example: "64",
        basic: { es: "Saltos máximos, como el TTL.", en: "Maximum hops, like TTL." },
        technical: {
          es: "Se decrementa en cada router; al llegar a 0 se envía ICMPv6 Time Exceeded.",
          en: "Decremented by each router; at 0 an ICMPv6 Time Exceeded is sent.",
        },
      },
      {
        name: "Source Address",
        bits: 128,
        example: "2001:db8::34",
        basic: { es: "IPv6 de quien envía.", en: "Sender's IPv6 address." },
        technical: { es: "Dirección de origen de 128 bits.", en: "128-bit source address." },
      },
      {
        name: "Destination Address",
        bits: 128,
        example: "2001:db8:1::10",
        basic: { es: "IPv6 del destino.", en: "Destination IPv6 address." },
        technical: {
          es: "Dirección de destino de 128 bits. No hay checksum de cabecera: IPv6 confía en los checksums del enlace y del transporte.",
          en: "128-bit destination address. There is no header checksum: IPv6 relies on link and transport checksums.",
        },
      },
    ],
  },
  tcp: {
    id: "tcp",
    title: { es: "Cabecera TCP", en: "TCP header" },
    spec: "RFC 9293",
    fixedBytes: 20,
    fields: [
      {
        name: "Source Port",
        bits: 16,
        example: "54321",
        basic: { es: "Puerto temporal del programa que envía.", en: "Temporary port of the sending program." },
        technical: {
          es: "Puerto efímero elegido por el sistema operativo del cliente (IANA recomienda 49152–65535; Linux usa 32768–60999 por defecto).",
          en: "Ephemeral port chosen by the client OS (IANA suggests 49152–65535; Linux defaults to 32768–60999).",
        },
      },
      {
        name: "Destination Port",
        bits: 16,
        example: "443",
        basic: { es: "Puerto del servicio: 443 = HTTPS.", en: "Service port: 443 = HTTPS." },
        technical: {
          es: "Identifica el servicio en el servidor. Junto con las dos IP y el puerto de origen forma la 4-tupla que identifica la conexión.",
          en: "Identifies the service on the server; with both IPs and the source port it forms the 4-tuple identifying the connection.",
        },
      },
      {
        name: "Sequence Number",
        bits: 32,
        example: "0xa65f1c3c",
        basic: { es: "Número del primer byte de este segmento.", en: "Number of this segment's first byte." },
        technical: {
          es: "Posición del primer byte de datos en el flujo, contada desde un ISN aleatorio (RFC 6528). En un SYN es el propio ISN.",
          en: "Position of the first data byte in the stream, counted from a random ISN (RFC 6528). In a SYN it is the ISN itself.",
        },
      },
      {
        name: "Acknowledgment Number",
        bits: 32,
        example: "0x3e91b7a0",
        basic: { es: "Siguiente byte que se espera del otro lado.", en: "Next byte expected from the other side." },
        technical: {
          es: "Válido cuando ACK = 1: confirma de forma acumulativa todos los bytes anteriores a este número.",
          en: "Valid when ACK = 1: cumulatively acknowledges every byte before this number.",
        },
      },
      {
        name: "Data Offset",
        bits: 4,
        example: "{tcpOffset}",
        basic: { es: "Tamaño de la cabecera TCP.", en: "TCP header size." },
        technical: {
          es: "Longitud de la cabecera en palabras de 32 bits: 5 = 20 B, 8 = 32 B (con timestamps), máximo 15 = 60 B.",
          en: "Header length in 32-bit words: 5 = 20 B, 8 = 32 B (with timestamps), max 15 = 60 B.",
        },
      },
      {
        name: "Reserved",
        bits: 4,
        example: "0000",
        basic: { es: "Reservado.", en: "Reserved." },
        technical: { es: "Reservado para uso futuro; debe ir en cero.", en: "Reserved for future use; must be zero." },
      },
      {
        name: "Flags",
        bits: 8,
        example: "ACK PSH",
        basic: {
          es: "Señales de control: iniciar (SYN), confirmar (ACK), terminar (FIN) o abortar (RST).",
          en: "Control signals: start (SYN), acknowledge (ACK), finish (FIN), abort (RST).",
        },
        technical: {
          es: "CWR y ECE (ECN, RFC 3168), URG, ACK, PSH (entregar ya a la aplicación), RST, SYN y FIN. Un segmento de datos normal lleva ACK y, a menudo, PSH.",
          en: "CWR and ECE (ECN, RFC 3168), URG, ACK, PSH (deliver to the app now), RST, SYN, FIN. A normal data segment carries ACK and often PSH.",
        },
      },
      {
        name: "Window",
        bits: 16,
        example: "501",
        basic: { es: "Cuántos datos más puede recibir quien envía este segmento.", en: "How much more data the sender of this segment can receive." },
        technical: {
          es: "Ventana de recepción anunciada. Si se negoció Window Scale (RFC 7323), se multiplica por 2^shift: 501 × 2^7 = 64 128 B.",
          en: "Advertised receive window, multiplied by 2^shift if Window Scale was negotiated (RFC 7323): 501 × 2^7 = 64,128 B.",
        },
      },
      {
        name: "Checksum",
        bits: 16,
        example: "0x4f1a",
        basic: { es: "Detecta daños en el segmento.", en: "Detects segment damage." },
        technical: {
          es: "Cubre la cabecera, los datos y una pseudo-cabecera con las IP, el protocolo y la longitud. Es obligatorio.",
          en: "Covers header, data and a pseudo-header with the IPs, protocol and length. Mandatory.",
        },
      },
      {
        name: "Urgent Pointer",
        bits: 16,
        example: "0",
        basic: { es: "Casi nunca se usa.", en: "Almost never used." },
        technical: {
          es: "Solo tiene sentido con URG. Está prácticamente en desuso y RFC 6093 desaconseja usarlo en aplicaciones nuevas.",
          en: "Only meaningful with URG. Practically obsolete; RFC 6093 advises new applications not to use it.",
        },
      },
      {
        name: "Options",
        bits: null,
        example: "{tcpOptions}",
        basic: { es: "Extras negociados al abrir la conexión.", en: "Extras negotiated when opening the connection." },
        technical: {
          es: "En el SYN: MSS, Window Scale y SACK-permitted. Si se negociaron Timestamps, cada segmento los lleva (10 B + 2 de relleno = 12 B).",
          en: "In the SYN: MSS, Window Scale, SACK-permitted. If Timestamps were negotiated, every segment carries them (10 B + 2 padding = 12 B).",
        },
      },
    ],
  },
  udp: {
    id: "udp",
    title: { es: "Cabecera UDP", en: "UDP header" },
    spec: "RFC 768",
    fixedBytes: 8,
    fields: [
      {
        name: "Source Port",
        bits: 16,
        example: "53000",
        basic: { es: "Puerto de quien envía.", en: "Sender's port." },
        technical: {
          es: "Opcional en teoría (0 = sin respuesta esperada); en la práctica, un puerto efímero.",
          en: "Optional in theory (0 = no reply expected); in practice an ephemeral port.",
        },
      },
      {
        name: "Destination Port",
        bits: 16,
        example: "53",
        basic: { es: "Puerto del servicio: 53 = DNS.", en: "Service port: 53 = DNS." },
        technical: { es: "Identifica el socket de destino.", en: "Identifies the destination socket." },
      },
      {
        name: "Length",
        bits: 16,
        example: "40",
        basic: { es: "Tamaño del datagrama.", en: "Datagram size." },
        technical: { es: "Cabecera + datos en bytes; el mínimo es 8.", en: "Header + data in bytes; minimum 8." },
      },
      {
        name: "Checksum",
        bits: 16,
        example: "0x7d2e",
        basic: { es: "Detecta daños.", en: "Detects damage." },
        technical: {
          es: "Opcional en IPv4 (0 = sin checksum) y obligatorio en IPv6. Cubre una pseudo-cabecera, igual que TCP.",
          en: "Optional over IPv4 (0 = none), mandatory over IPv6. Covers a pseudo-header like TCP.",
        },
      },
    ],
  },
  tls: {
    id: "tls",
    title: { es: "Registro TLS 1.3", en: "TLS 1.3 record" },
    spec: "RFC 8446 §5",
    fixedBytes: 5,
    fields: [
      {
        name: "ContentType",
        bits: 8,
        example: "23 (application_data)",
        basic: { es: "Qué contiene el registro.", en: "What the record contains." },
        technical: {
          es: "En TLS 1.3, todo registro cifrado se muestra como 23 (application_data). El tipo real (handshake, alerta o datos) va cifrado dentro, en el último byte del texto plano (TLSInnerPlaintext).",
          en: "In TLS 1.3 every encrypted record shows 23 (application_data); the real type (handshake, alert, data) is encrypted inside, as the last byte of the plaintext (TLSInnerPlaintext).",
        },
      },
      {
        name: "Legacy Version",
        bits: 16,
        example: "0x0303",
        basic: { es: "Versión «de compatibilidad».", en: "“Compatibility” version." },
        technical: {
          es: "Siempre 0x0303 (TLS 1.2), por compatibilidad con equipos intermedios. La versión real, 1.3, se negocia con la extensión supported_versions.",
          en: "Fixed to 0x0303 (TLS 1.2) for middlebox compatibility; the real version 1.3 is negotiated via the supported_versions extension.",
        },
      },
      {
        name: "Length",
        bits: 16,
        example: "{tlsLength}",
        basic: { es: "Tamaño de los datos cifrados.", en: "Size of the encrypted data." },
        technical: {
          es: "Longitud del texto cifrado: texto plano + 1 B de tipo interno + relleno opcional + 16 B de tag AEAD. Máximo 2^14 + 256 B.",
          en: "Ciphertext length: plaintext + 1 B inner type + optional padding + 16 B AEAD tag. Max 2^14 + 256 B.",
        },
      },
      {
        name: "Encrypted record",
        bits: null,
        example: "{tlsLength} B",
        basic: { es: "Los datos de la aplicación, ya cifrados.", en: "The application data, encrypted." },
        technical: {
          es: "Resultado del cifrado AEAD (por ejemplo, AES-128-GCM o ChaCha20-Poly1305) con un nonce derivado del número de secuencia del registro, que nunca viaja en claro.",
          en: "AEAD output (e.g. AES-128-GCM or ChaCha20-Poly1305) using a nonce derived from the record sequence number, which never goes on the wire.",
        },
      },
      {
        name: "Auth tag",
        bits: 128,
        example: "16 B",
        basic: { es: "Sello que demuestra que nadie alteró los datos.", en: "A seal proving nobody altered the data." },
        technical: {
          es: "Tag de autenticación AEAD de 128 bits. Si al descifrar no coincide, el registro se rechaza y la conexión se cierra con una alerta bad_record_mac.",
          en: "128-bit AEAD authentication tag. If it does not verify on decryption, the record is rejected and the connection is closed with a bad_record_mac alert.",
        },
      },
    ],
  },
  http2: {
    id: "http2",
    title: { es: "Trama HTTP/2", en: "HTTP/2 frame" },
    spec: "RFC 9113 §4.1",
    fixedBytes: 9,
    fields: [
      {
        name: "Length",
        bits: 24,
        example: "{h2Length}",
        basic: { es: "Tamaño del contenido de la trama.", en: "Size of the frame content." },
        technical: {
          es: "Longitud de la carga de la trama, sin contar estos 9 B. El máximo por defecto es 16 384 (SETTINGS_MAX_FRAME_SIZE).",
          en: "Frame payload length, excluding these 9 B. Default maximum 16,384 (SETTINGS_MAX_FRAME_SIZE).",
        },
      },
      {
        name: "Type",
        bits: 8,
        example: "0x1 (HEADERS)",
        basic: { es: "Qué tipo de trama es.", en: "Which kind of frame it is." },
        technical: {
          es: "0x0 DATA, 0x1 HEADERS, 0x3 RST_STREAM, 0x4 SETTINGS, 0x6 PING, 0x7 GOAWAY, 0x8 WINDOW_UPDATE…",
          en: "0x0 DATA, 0x1 HEADERS, 0x3 RST_STREAM, 0x4 SETTINGS, 0x6 PING, 0x7 GOAWAY, 0x8 WINDOW_UPDATE…",
        },
      },
      {
        name: "Flags",
        bits: 8,
        example: "0x05",
        basic: { es: "Indicadores de la trama.", en: "Frame indicators." },
        technical: {
          es: "En HEADERS: END_STREAM (0x1) indica que no habrá cuerpo y END_HEADERS (0x4) que el bloque de cabeceras está completo.",
          en: "For HEADERS: END_STREAM (0x1) means no body follows; END_HEADERS (0x4) means the header block is complete.",
        },
      },
      {
        name: "R",
        bits: 1,
        example: "0",
        basic: { es: "Bit reservado.", en: "Reserved bit." },
        technical: { es: "Reservado; se ignora al recibir.", en: "Reserved; ignored on receipt." },
      },
      {
        name: "Stream Identifier",
        bits: 31,
        example: "1",
        basic: { es: "A qué petición pertenece la trama.", en: "Which request the frame belongs to." },
        technical: {
          es: "Identifica el flujo. Los iniciados por el cliente son impares; el 0 corresponde a la conexión completa (SETTINGS, PING).",
          en: "Identifies the stream. Client-initiated streams are odd; 0 means the whole connection (SETTINGS, PING).",
        },
      },
      {
        name: "Header Block (HPACK)",
        bits: null,
        example: "{hpack} B",
        basic: { es: "Las cabeceras de la petición, comprimidas.", en: "The request headers, compressed." },
        technical: {
          es: "Bloque HPACK (RFC 7541): índices a una tabla estática de 61 entradas y a una tabla dinámica, más literales con codificación Huffman. «:method GET» ocupa un solo byte (índice 2).",
          en: "HPACK block (RFC 7541): indices into a 61-entry static table and a dynamic table, plus Huffman-coded literals. “:method GET” takes a single byte (index 2).",
        },
      },
    ],
  },
};

/** Cabecera asociada a cada protocolo del catálogo (pestaña «Cabecera» del popover). */
export const HEADER_BY_PROTOCOL: Record<string, HeaderId> = {
  ethernet: "ethernet",
  ipv4: "ipv4",
  ipv6: "ipv6",
  tcp: "tcp",
  udp: "udp",
  tls: "tls",
  http2: "http2",
};

/** Sustituye {marcadores} en los valores de ejemplo. */
export function fillExample(example: string, values: Record<string, string | number> = {}): string {
  return example.replace(/\{(\w+)\}/g, (_, k) => (k in values ? String(values[k]) : "—"));
}
