import type { L } from "@/lib/i18n";

export type ProtocolStatus = "current" | "legacy" | "deprecated";

export type StandardsBody =
  | "IETF"
  | "IEEE"
  | "ISO/IEC"
  | "ITU-T"
  | "W3C"
  | "ECMA"
  | "OASIS"
  | "ANSI/TIA"
  | "Unicode"
  | "Bluetooth SIG"
  | "USB-IF"
  | "CableLabs"
  | "CNCF"
  | "Google"
  | "Microsoft"
  | "Cisco";

export type CategoryId =
  // L7
  | "web" | "naming" | "config" | "email" | "transfer" | "files" | "remote" | "messaging"
  | "management" | "time" | "auth" | "media" | "routing"
  // L6
  | "security" | "encoding" | "text" | "compression" | "formats"
  // L5
  | "rpc" | "session" | "tunneling" | "proxy"
  // L4
  | "transport" | "extensions"
  // L3
  | "addressing" | "control" | "translation"
  // L2
  | "framing" | "switching" | "discovery" | "resolution" | "wireless" | "wan"
  // L1
  | "copper" | "fiber" | "access" | "power" | "cabling" | "serial";

export interface SpecRef {
  /** Identificador exacto: "RFC 9293", "IEEE 802.1Q-2022", "ITU-T X.690". */
  id: string;
  title: L;
  url?: string;
}

export interface ProtocolFact {
  label: L;
  value: string | L;
}

export interface ProtocolTool {
  command: string;
  description: L;
}

export interface Protocol {
  /** Identificador único en kebab-case; se usa en `relations`. */
  id: string;
  acronym: string;
  fullName: L;
  /** Capas OSI donde opera; la primera es la capa principal (la del archivo que lo define). */
  osi: number[];
  category: CategoryId;
  status: ProtocolStatus;
  bodies: StandardsBody[];
  /** Año de la primera especificación publicada. */
  year: number;
  /** Puertos, números de protocolo IP, EtherTypes, bandas…: "TCP 443", "EtherType 0x0806". */
  identifiers?: string[];

  // Nivel básico (usuario final)
  summary: L;
  analogy?: L;
  everyday?: L;

  // Nivel técnico
  technical: L[];
  howItWorks?: L[];
  facts: ProtocolFact[];
  security?: L;
  /** Por qué no encaja limpiamente en una sola capa. */
  multiLayerNote?: L;
  tools?: ProtocolTool[];
  /** Filtro de visualización de Wireshark. */
  wireshark?: string;

  relations?: {
    dependsOn?: string[];
    usedBy?: string[];
    replaces?: string[];
    replacedBy?: string[];
  };
  specs: SpecRef[];
}
