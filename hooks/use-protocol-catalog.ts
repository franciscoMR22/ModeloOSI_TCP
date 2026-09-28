"use client";

import { useEffect, useState } from "react";

type CatalogModule = typeof import("@/lib/protocols");

// Caché a nivel de módulo: el catálogo se descarga una sola vez por sesión
let cached: CatalogModule | null = null;
let pending: Promise<CatalogModule> | null = null;

export function loadProtocolCatalog(): Promise<CatalogModule> {
  if (cached) return Promise.resolve(cached);
  pending ??= import("@/lib/protocols").then((m) => (cached = m));
  return pending;
}

/** Devuelve el catálogo cuando `enabled` es true (carga diferida); null mientras llega. */
export function useProtocolCatalog(enabled = true): CatalogModule | null {
  const [catalog, setCatalog] = useState<CatalogModule | null>(cached);

  useEffect(() => {
    if (!enabled || catalog) return;
    let alive = true;
    loadProtocolCatalog().then((m) => alive && setCatalog(m));
    return () => {
      alive = false;
    };
  }, [enabled, catalog]);

  return catalog;
}
