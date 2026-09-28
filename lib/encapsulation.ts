import type { L } from "@/lib/i18n";
import type { HeaderId } from "@/lib/headers";

/**
 * Modelo del simulador: una petición HTTP/2 (trama HEADERS) cifrada con TLS 1.3 sobre TCP/IPv4/Ethernet.
 * Todos los tamaños son los reales de cada especificación.
 */

export const MTU = 1500;
export const ETH_HEADER = 14;
export const ETH_FCS = 4;
export const ETH_MIN_PAYLOAD = 46;
export const PREAMBLE_SFD = 8;
export const IFG = 12; // hueco entre tramas (inter-frame gap)
export const IPV4_HEADER = 20;
export const TCP_HEADER = 20;
export const TCP_TIMESTAMPS = 12;
export const TLS_HEADER = 5;
export const TLS_INNER_TYPE = 1;
export const TLS_TAG = 16;
export const H2_FRAME_HEADER = 9;

export interface EncapInput {
  /** Bytes del bloque HPACK (carga de la trama HEADERS). */
  payload: number;
  tcpTimestamps: boolean;
}

export interface EncapResult {
  tcpHeader: number;
  mss: number;
  tlsRecord: number; // registro completo en el cable (cabecera + cifrado + tag)
  tlsLength: number; // campo Length del registro
  segments: number; // segmentos TCP necesarios
  firstSegmentPayload: number;
  hpackInFirst: number; // bytes de HPACK que caben en el primer segmento
  trailerInFirst: boolean; // si el tipo interno y el tag de TLS caben en el primer segmento
  ipTotal: number; // del primer paquete
  padding: number;
  frame: number; // trama del primer segmento, sin preámbulo
  wire: number; // bytes que ocupa el primer segmento en el cable (preámbulo + trama + IFG)
  totalWire: number; // todos los segmentos
  efficiency: number; // payload útil / bytes en el cable
}

export function computeEncapsulation({ payload, tcpTimestamps }: EncapInput): EncapResult {
  const tcpHeader = TCP_HEADER + (tcpTimestamps ? TCP_TIMESTAMPS : 0);
  const mss = MTU - IPV4_HEADER - tcpHeader;
  const tlsLength = H2_FRAME_HEADER + payload + TLS_INNER_TYPE + TLS_TAG;
  const tlsRecord = TLS_HEADER + tlsLength;
  const segments = Math.ceil(tlsRecord / mss);
  const firstSegmentPayload = Math.min(tlsRecord, mss);
  const hpackInFirst = Math.max(0, Math.min(payload, firstSegmentPayload - TLS_HEADER - H2_FRAME_HEADER));
  const trailerInFirst = segments === 1;

  const frameFor = (segPayload: number) => {
    const ip = IPV4_HEADER + tcpHeader + segPayload;
    const pad = Math.max(0, ETH_MIN_PAYLOAD - ip);
    return { ip, pad, frame: ETH_HEADER + ip + pad + ETH_FCS };
  };

  const first = frameFor(firstSegmentPayload);
  let totalWire = 0;
  let remaining = tlsRecord;
  while (remaining > 0) {
    const seg = Math.min(remaining, mss);
    totalWire += PREAMBLE_SFD + frameFor(seg).frame + IFG;
    remaining -= seg;
  }

  return {
    tcpHeader,
    mss,
    tlsRecord,
    tlsLength,
    segments,
    firstSegmentPayload,
    hpackInFirst,
    trailerInFirst,
    ipTotal: first.ip,
    padding: first.pad,
    frame: first.frame,
    wire: PREAMBLE_SFD + first.frame + IFG,
    totalWire,
    efficiency: payload / totalWire,
  };
}

export type SegmentId = "preamble" | "eth" | "ip" | "tcp" | "tls-hdr" | "h2-hdr" | "hpack" | "tls-trailer" | "pad" | "fcs";

export interface PacketSegment {
  id: SegmentId;
  osi: number;
  label: string;
  bytes: number;
  kind: "header" | "payload" | "trailer";
  header?: HeaderId;
  note?: L;
}

/** Segmentos del primer paquete en orden de transmisión, para las capas OSI ≥ `lowestOsi`. */
export function buildSegments(r: EncapResult, payload: number, lowestOsi: number): PacketSegment[] {
  const all: PacketSegment[] = [
    {
      id: "preamble", osi: 1, label: "Preamble + SFD", bytes: PREAMBLE_SFD, kind: "header",
      note: {
        es: "7 B de 10101010 para sincronizar el reloj del receptor y 1 B de SFD (10101011) que marca el inicio de la trama. No forman parte de la trama ni los ve Wireshark.",
        en: "7 B of 10101010 to lock the receiver's clock and a 1 B SFD (10101011) marking the start of the frame. They are not part of the frame and Wireshark never sees them.",
      },
    },
    { id: "eth", osi: 2, label: "Ethernet", bytes: ETH_HEADER, kind: "header", header: "ethernet" },
    { id: "ip", osi: 3, label: "IPv4", bytes: IPV4_HEADER, kind: "header", header: "ipv4" },
    { id: "tcp", osi: 4, label: "TCP", bytes: r.tcpHeader, kind: "header", header: "tcp" },
    { id: "tls-hdr", osi: 6, label: "TLS", bytes: TLS_HEADER, kind: "header", header: "tls" },
    { id: "h2-hdr", osi: 7, label: "HTTP/2", bytes: H2_FRAME_HEADER, kind: "header", header: "http2" },
    {
      id: "hpack", osi: 7, label: "HPACK", bytes: r.hpackInFirst, kind: "payload", header: "http2",
      note: r.segments > 1
        ? {
            es: `Solo ${r.hpackInFirst} de ${payload} B caben en este segmento; el resto viaja en los ${r.segments - 1} siguientes.`,
            en: `Only ${r.hpackInFirst} of ${payload} B fit in this segment; the rest travels in the next ${r.segments - 1}.`,
          }
        : undefined,
    },
    {
      id: "tls-trailer", osi: 6, label: "Type + Tag", bytes: TLS_INNER_TYPE + TLS_TAG, kind: "trailer", header: "tls",
      note: {
        es: "1 B con el tipo real del contenido más 16 B del tag AEAD. En la práctica se cifran junto con los datos; aquí se separan para ver cuánto ocupan.",
        en: "1 B carrying the real content type plus the 16 B AEAD tag. They are encrypted along with the data; shown separately here to reveal their size.",
      },
    },
    {
      id: "pad", osi: 2, label: "Padding", bytes: r.padding, kind: "trailer",
      note: {
        es: "Relleno para alcanzar la carga mínima de 46 B de Ethernet.",
        en: "Padding to reach Ethernet's 46 B minimum payload.",
      },
    },
    { id: "fcs", osi: 2, label: "FCS", bytes: ETH_FCS, kind: "trailer", header: "ethernet" },
  ];

  return all.filter((s) => {
    if (s.osi < lowestOsi) return false;
    if (s.id === "tls-trailer" && !r.trailerInFirst) return false;
    if (s.id === "pad" && r.padding === 0) return false;
    return true;
  });
}

/** Valores de ejemplo dinámicos para las cabeceras del inspector. */
export function headerValues(r: EncapResult, payload: number): Record<string, string | number> {
  return {
    ipTotal: `${r.ipTotal} B`,
    payloadV6: `${r.ipTotal - IPV4_HEADER} B`,
    tcpOffset: r.tcpHeader / 4,
    tcpOptions: r.tcpHeader > TCP_HEADER ? "NOP NOP TS (12 B)" : "—",
    tlsLength: r.tlsLength,
    h2Length: payload,
    hpack: payload,
  };
}

export type Direction = "send" | "receive";

export interface SimStep {
  osi: number;
  tcpip: string;
  title: Record<Direction, L>;
  detail: Record<Direction, (r: EncapResult, payload: number) => L>;
}

const fmt = (n: number) => n.toLocaleString("en-US");

/** Pasos en orden de envío (L7 → L1); la recepción los recorre al revés. */
export const SIM_STEPS: SimStep[] = [
  {
    osi: 7,
    tcpip: "App",
    title: {
      send: { es: "La aplicación genera la petición", en: "The application builds the request" },
      receive: { es: "La aplicación recibe la petición", en: "The application receives the request" },
    },
    detail: {
      send: (_r, p) => ({
        es: `El navegador codifica GET /api/v1 como trama HEADERS de HTTP/2: 9 B de cabecera de trama + ${fmt(p)} B de cabeceras comprimidas con HPACK. Un GET no lleva cuerpo, por eso el flag END_STREAM va activo.`,
        en: `The browser encodes GET /api/v1 as an HTTP/2 HEADERS frame: 9 B frame header + ${fmt(p)} B of HPACK-compressed headers. A GET has no body, so END_STREAM is set.`,
      }),
      receive: () => ({
        es: "HPACK reconstruye las cabeceras con sus tablas estática y dinámica, el servidor identifica el flujo 1 y enruta GET /api/v1 al manejador correspondiente.",
        en: "HPACK rebuilds the headers from its static and dynamic tables; the server identifies stream 1 and routes GET /api/v1 to its handler.",
      }),
    },
  },
  {
    osi: 6,
    tcpip: "App",
    title: {
      send: { es: "TLS 1.3 cifra el registro", en: "TLS 1.3 encrypts the record" },
      receive: { es: "TLS descifra y verifica", en: "TLS decrypts and verifies" },
    },
    detail: {
      send: (r) => ({
        es: `Se añade 1 B con el tipo real del contenido, se cifra con AEAD (p. ej. AES-128-GCM) y se agrega un tag de 16 B. Delante va la cabecera de registro de 5 B: tipo 23, versión 0x0303 y Length = ${fmt(r.tlsLength)}.`,
        en: `1 B with the real content type is appended, the data is AEAD-encrypted (e.g. AES-128-GCM) and a 16 B tag is added. In front goes the 5 B record header: type 23, version 0x0303, Length = ${fmt(r.tlsLength)}.`,
      }),
      receive: () => ({
        es: "Se descifra con la clave de tráfico de la sesión y se verifica el tag AEAD. Si alguien alteró un solo bit, la verificación falla y la conexión se cierra con la alerta bad_record_mac.",
        en: "It is decrypted with the session's traffic key and the AEAD tag is verified. If a single bit was altered, verification fails and the connection closes with a bad_record_mac alert.",
      }),
    },
  },
  {
    osi: 5,
    tcpip: "App",
    title: {
      send: { es: "Sesión: sin cabecera propia", en: "Session: no header of its own" },
      receive: { es: "Sesión: sin cabecera que quitar", en: "Session: no header to strip" },
    },
    detail: {
      send: () => ({
        es: "En TCP/IP no hay protocolo de sesión separado. El diálogo ya existe: la conexión TCP y la sesión TLS se establecieron antes (handshake TCP de 1 RTT + TLS 1.3 de 1 RTT). Esta capa no añade bytes.",
        en: "TCP/IP has no separate session protocol. The dialogue already exists: the TCP connection and TLS session were set up earlier (1-RTT TCP handshake + 1-RTT TLS 1.3). This layer adds no bytes.",
      }),
      receive: () => ({
        es: "El registro pertenece a una sesión TLS ya establecida sobre esa conexión; el estado de la sesión (claves, número de secuencia de registro) vive en la biblioteca TLS.",
        en: "The record belongs to a TLS session already established on this connection; session state (keys, record sequence number) lives in the TLS library.",
      }),
    },
  },
  {
    osi: 4,
    tcpip: "Transport",
    title: {
      send: { es: "TCP segmenta", en: "TCP segments" },
      receive: { es: "TCP entrega el flujo", en: "TCP delivers the stream" },
    },
    detail: {
      send: (r) => ({
        es: `Cabecera de ${r.tcpHeader} B${r.tcpHeader > 20 ? " (20 + 12 de timestamps)" : ""} con puertos 54321 → 443. MSS = 1500 − 20 − ${r.tcpHeader} = ${fmt(r.mss)} B. El registro TLS de ${fmt(r.tlsRecord)} B ${r.segments > 1 ? `se divide en ${r.segments} segmentos` : "cabe en un solo segmento"}.`,
        en: `${r.tcpHeader} B header${r.tcpHeader > 20 ? " (20 + 12 for timestamps)" : ""} with ports 54321 → 443. MSS = 1500 − 20 − ${r.tcpHeader} = ${fmt(r.mss)} B. The ${fmt(r.tlsRecord)} B TLS record ${r.segments > 1 ? `is split into ${r.segments} segments` : "fits in a single segment"}.`,
      }),
      receive: (r) => ({
        es: `El kernel busca el socket por la 4-tupla, verifica el checksum, ordena los ${r.segments > 1 ? `${r.segments} segmentos` : "datos"} por número de secuencia, envía un ACK y entrega el flujo de bytes a TLS.`,
        en: `The kernel finds the socket by 4-tuple, verifies the checksum, orders the ${r.segments > 1 ? `${r.segments} segments` : "data"} by sequence number, sends an ACK and hands the byte stream to TLS.`,
      }),
    },
  },
  {
    osi: 3,
    tcpip: "Internet",
    title: {
      send: { es: "IPv4 encapsula", en: "IPv4 encapsulates" },
      receive: { es: "IPv4 valida y entrega", en: "IPv4 validates and delivers" },
    },
    detail: {
      send: (r) => ({
        es: `Cabecera de 20 B: 192.168.1.34 → 203.0.113.10, TTL 64, Protocol 6 (TCP) y DF activo. Total Length = ${fmt(r.ipTotal)} B, dentro de la MTU de 1500.`,
        en: `20 B header: 192.168.1.34 → 203.0.113.10, TTL 64, Protocol 6 (TCP), DF set. Total Length = ${fmt(r.ipTotal)} B, within the 1500 MTU.`,
      }),
      receive: () => ({
        es: "Verifica el checksum de la cabecera y que la IP de destino sea local. Como DF está activo no hay fragmentos que reensamblar; lee Protocol = 6, quita 20 B y entrega a TCP.",
        en: "Verifies the header checksum and that the destination IP is local; with DF set there are no fragments to reassemble. Reads Protocol = 6, strips 20 B and hands off to TCP.",
      }),
    },
  },
  {
    osi: 2,
    tcpip: "Link",
    title: {
      send: { es: "Ethernet arma la trama", en: "Ethernet builds the frame" },
      receive: { es: "Ethernet comprueba la trama", en: "Ethernet checks the frame" },
    },
    detail: {
      send: (r) => ({
        es: `14 B de cabecera (MAC del gateway resuelta por ARP, MAC propia, EtherType 0x0800) y 4 B de FCS (CRC-32) al final${r.padding ? `, más ${r.padding} B de relleno` : ""}. Trama de ${fmt(r.frame)} B (mínimo 64, máximo 1518).`,
        en: `14 B header (gateway MAC resolved by ARP, own MAC, EtherType 0x0800) and a 4 B FCS (CRC-32) at the end${r.padding ? `, plus ${r.padding} B of padding` : ""}. ${fmt(r.frame)} B frame (min 64, max 1518).`,
      }),
      receive: () => ({
        es: "La NIC recalcula el CRC-32 y lo compara con el FCS: si no coincide, descarta la trama en silencio. Comprueba que la MAC de destino es la suya, lee EtherType 0x0800 y entrega a IPv4.",
        en: "The NIC recomputes the CRC-32 and compares it with the FCS, silently dropping the frame on mismatch. It checks the destination MAC is its own, reads EtherType 0x0800 and hands off to IPv4.",
      }),
    },
  },
  {
    osi: 1,
    tcpip: "Link",
    title: {
      send: { es: "Bits al medio físico", en: "Bits onto the medium" },
      receive: { es: "Señal → bits", en: "Signal → bits" },
    },
    detail: {
      send: (r) => ({
        es: `Preámbulo de 7 B + SFD de 1 B y, tras la trama, 12 B de silencio (IFG). En 1000BASE-T viaja con codificación PAM-5 por 4 pares a la vez: ${fmt(r.wire)} B en el cable para este segmento.`,
        en: `7 B preamble + 1 B SFD and, after the frame, a 12 B idle gap (IFG). On 1000BASE-T it travels PAM-5-coded over 4 pairs at once: ${fmt(r.wire)} B on the wire for this segment.`,
      }),
      receive: () => ({
        es: "El PHY recupera el reloj con el preámbulo, decodifica los símbolos PAM-5 y detecta el SFD (…10101011) para saber dónde empieza la trama.",
        en: "The PHY recovers the clock from the preamble, decodes the PAM-5 symbols and detects the SFD (…10101011) to find where the frame starts.",
      }),
    },
  },
];

export const LAYER_COLORS: Record<number, string> = {
  7: "#7c3aed", 6: "#6d28d9", 5: "#4f46e5", 4: "#2563eb", 3: "#0284c7", 2: "#0369a1", 1: "#075985",
};
