import type { Protocol } from "@/lib/protocols/types";
import { TCPIP_TO_OSI } from "@/lib/network-data";
import { L1_PROTOCOLS } from "@/lib/protocols/l1";
import { L2_PROTOCOLS } from "@/lib/protocols/l2";
import { L3_PROTOCOLS } from "@/lib/protocols/l3";
import { L4_PROTOCOLS } from "@/lib/protocols/l4";
import { L5_PROTOCOLS } from "@/lib/protocols/l5";
import { L6_PROTOCOLS } from "@/lib/protocols/l6";
import { L7A_PROTOCOLS } from "@/lib/protocols/l7a";
import { L7B_PROTOCOLS } from "@/lib/protocols/l7b";

// Este módulo pesa bastante (todo el texto del catálogo); se carga bajo demanda con
// hooks/use-protocol-catalog.ts, nunca con un import estático desde un componente.

export const ALL_PROTOCOLS: Protocol[] = [
  ...L7A_PROTOCOLS,
  ...L7B_PROTOCOLS,
  ...L6_PROTOCOLS,
  ...L5_PROTOCOLS,
  ...L4_PROTOCOLS,
  ...L3_PROTOCOLS,
  ...L2_PROTOCOLS,
  ...L1_PROTOCOLS,
];

export const PROTOCOLS_BY_ID: Record<string, Protocol> = Object.fromEntries(ALL_PROTOCOLS.map((p) => [p.id, p]));

/** Protocolos cuya capa principal es `osi`, más los multicapa que también operan ahí. */
export function protocolsForOsi(osi: number): Protocol[] {
  const primary = ALL_PROTOCOLS.filter((p) => p.osi[0] === osi);
  const secondary = ALL_PROTOCOLS.filter((p) => p.osi[0] !== osi && p.osi.includes(osi));
  return [...primary, ...secondary];
}

/** Unión de las capas OSI que agrupa una capa TCP/IP, sin duplicados. */
export function protocolsForTcpip(tcpip: number): Protocol[] {
  const seen = new Set<string>();
  return (TCPIP_TO_OSI[tcpip] ?? []).flatMap((osi) => protocolsForOsi(osi)).filter((p) => !seen.has(p.id) && seen.add(p.id));
}
