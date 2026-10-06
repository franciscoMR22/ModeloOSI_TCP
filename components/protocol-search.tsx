"use client";

import { useEffect, useMemo, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useProtocolCatalog } from "@/hooks/use-protocol-catalog";
import type { Language } from "@/lib/network-data";
import { STATUS_DOT } from "@/lib/protocols/labels";
import type { Protocol } from "@/lib/protocols/types";

const T = {
  es: {
    title: "Buscar protocolo",
    description: "Busca por siglas, nombre, puerto o identificador",
    placeholder: "HTTP, 443, EtherType, OSPF…",
    empty: "Sin resultados",
    layer: (n: number) => `Capa ${n}`,
  },
  en: {
    title: "Search protocol",
    description: "Search by acronym, name, port or identifier",
    placeholder: "HTTP, 443, EtherType, OSPF…",
    empty: "No results",
    layer: (n: number) => `Layer ${n}`,
  },
};

interface ProtocolSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: Language;
  onSelect: (protocol: Protocol) => void;
}

export function ProtocolSearch({ open, onOpenChange, lang, onSelect }: ProtocolSearchProps) {
  const t = T[lang];
  const catalog = useProtocolCatalog(open);

  // Atajo global Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  // Agrupar por capa principal, de L7 a L1
  const byLayer = useMemo(() => {
    if (!catalog) return [];
    return [7, 6, 5, 4, 3, 2, 1].map((n) => ({ n, items: catalog.ALL_PROTOCOLS.filter((p) => p.osi[0] === n) })).filter((g) => g.items.length);
  }, [catalog]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t.title}
      description={t.description}
      className="glass-card sm:max-w-xl"
    >
      <CommandInput placeholder={t.placeholder} />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>{t.empty}</CommandEmpty>
        {byLayer.map(({ n, items }) => (
          <CommandGroup key={n} heading={t.layer(n)}>
            {items.map((p) => (
              <CommandItem
                key={p.id}
                // cmdk filtra por este valor: incluye nombre completo e identificadores (puertos, EtherType…)
                value={`${p.acronym} ${p.fullName.es} ${p.fullName.en} ${(p.identifiers ?? []).join(" ")}`}
                onSelect={() => {
                  onOpenChange(false);
                  onSelect(p);
                }}
                className="flex items-center gap-3"
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[p.status]}`} />
                <span className="font-mono text-xs font-bold min-w-[5rem]">{p.acronym}</span>
                <span className="text-xs text-muted-foreground truncate">{p.fullName[lang]}</span>
                {p.identifiers?.[0] && <span className="ml-auto text-[10px] font-mono text-muted-foreground/70 shrink-0">{p.identifiers[0]}</span>}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
