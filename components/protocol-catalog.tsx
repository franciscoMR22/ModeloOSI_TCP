"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, ChevronDown, Split } from "lucide-react";
import { HOVER_SPRING } from "@/components/glass-card";
import { ProtocolPopover } from "@/components/protocol-popover";
import type { DetailMode, Language } from "@/lib/network-data";
import type { CategoryId, Protocol } from "@/lib/protocols/types";
import { CATEGORY_LABELS, STATUS_DOT, STATUS_LABELS } from "@/lib/protocols/labels";

// Cuántos chips se muestran antes de "Ver todos"
const COLLAPSED_COUNT = 10;

const T = {
  es: { search: "Filtrar protocolos…", showAll: (n: number) => `Ver todos (${n})`, showLess: "Ver menos", none: "Sin coincidencias", multi: "Opera en varias capas" },
  en: { search: "Filter protocols…", showAll: (n: number) => `Show all (${n})`, showLess: "Show less", none: "No matches", multi: "Spans several layers" },
};

interface ProtocolCatalogProps {
  protocols: Protocol[];
  byId: Record<string, Protocol>;
  /** Capa de la tarjeta (número OSI) para marcar los protocolos cuya capa principal es otra. */
  homeOsi: number[];
  lang: Language;
  mode: DetailMode;
  /** Protocolo a abrir desde la búsqueda global. */
  focusId?: string | null;
  onFocusHandled?: () => void;
}

export function ProtocolCatalog({ protocols, byId, homeOsi, lang, mode, focusId, onFocusHandled }: ProtocolCatalogProps) {
  const t = T[lang];
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Apertura desde Ctrl+K: mostrar todo, abrir el popover y centrar el chip
  useEffect(() => {
    if (!focusId || !protocols.some((p) => p.id === focusId)) return;
    setQuery("");
    setExpanded(true);
    const timer = setTimeout(() => {
      const chip = rootRef.current?.querySelector<HTMLElement>(`[data-protocol-id="${focusId}"]`);
      chip?.scrollIntoView({ behavior: "smooth", block: "center" });
      // Esperar a que termine el scroll para que el popover se ancle en la posición final
      setTimeout(() => setOpenId(focusId), 450);
      onFocusHandled?.();
    }, 350);
    return () => clearTimeout(timer);
  }, [focusId, protocols, onFocusHandled]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return protocols;
    return protocols.filter(
      (p) => p.acronym.toLowerCase().includes(q) || p.fullName[lang].toLowerCase().includes(q) || p.id.includes(q) || p.identifiers?.some((i) => i.toLowerCase().includes(q))
    );
  }, [protocols, query, lang]);

  const visible = expanded || query ? filtered : filtered.slice(0, COLLAPSED_COUNT);

  // Agrupar por categoría conservando el orden de aparición
  const groups = useMemo(() => {
    const map = new Map<CategoryId, Protocol[]>();
    visible.forEach((p) => map.set(p.category, [...(map.get(p.category) ?? []), p]));
    return [...map.entries()];
  }, [visible]);

  return (
    <div ref={rootRef} className="space-y-3">
      <label className="flex items-center gap-2 rounded-lg border border-white/40 dark:border-slate-700 bg-white/40 dark:bg-slate-900/40 px-2.5 py-1.5 focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search}
          className="w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
      </label>

      <motion.div layout className="space-y-3">
        <AnimatePresence initial={false}>
          {groups.map(([category, items]) => (
            <motion.div
              key={category}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <span className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground/80 mb-1.5">
                {CATEGORY_LABELS[category][lang]}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {items.map((p, i) => {
                  const foreign = !homeOsi.includes(p.osi[0]) || p.osi.length > 1;
                  return (
                    <ProtocolPopover
                      key={p.id}
                      protocol={p}
                      byId={byId}
                      lang={lang}
                      mode={mode}
                      open={openId === p.id}
                      onOpenChange={(o) => setOpenId(o ? p.id : null)}
                    >
                      <motion.button
                        data-protocol-id={p.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ...HOVER_SPRING, delay: Math.min(i * 0.02, 0.2) }}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        title={`${p.fullName[lang]} · ${STATUS_LABELS[p.status][lang]}`}
                        className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg border transition-[background-color,border-color,box-shadow] duration-300 ease-out-expo hover:shadow-[0_4px_14px_-4px_var(--glow-color)] data-[state=open]:ring-2 data-[state=open]:ring-primary/40 ${
                          openId === p.id
                            ? "bg-primary/10 border-primary/40 text-primary"
                            : "bg-white/50 dark:bg-slate-800 border-white/40 dark:border-slate-700 hover:border-primary/40"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                        {p.acronym}
                        {foreign && <Split className="w-3 h-3 opacity-50" aria-label={t.multi} />}
                      </motion.button>
                    </ProtocolPopover>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {groups.length === 0 && <p className="text-xs text-muted-foreground italic">{t.none}</p>}
      </motion.div>

      {!query && filtered.length > COLLAPSED_COUNT && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:opacity-70 transition-opacity"
        >
          {expanded ? t.showLess : t.showAll(filtered.length)}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={HOVER_SPRING} className="inline-flex">
            <ChevronDown className="w-3 h-3" />
          </motion.span>
        </button>
      )}
    </div>
  );
}
