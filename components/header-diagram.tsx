"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { DetailMode, Language } from "@/lib/network-data";
import { fillExample, type HeaderSpec } from "@/lib/headers";

const ROW_BITS = 32;

const T = {
  es: { bits: "bits", variable: "variable", example: "Ejemplo", hint: "Pasa el mouse o toca un campo para ver qué significa.", bytes: "B fijos" },
  en: { bits: "bits", variable: "variable", example: "Example", hint: "Hover or tap a field to see what it means.", bytes: "B fixed" },
};

interface Cell {
  field: number;
  span: number;
  continued: boolean;
  variable: boolean;
}

/** Reparte los campos en filas de 32 bits; un campo que cruza el borde se parte en varios tramos. */
function layoutRows(spec: HeaderSpec): Cell[][] {
  const rows: Cell[][] = [];
  let row: Cell[] = [];
  let used = 0;
  const flush = () => {
    if (row.length) rows.push(row);
    row = [];
    used = 0;
  };

  spec.fields.forEach((f, i) => {
    if (f.bits === null) {
      flush();
      rows.push([{ field: i, span: ROW_BITS, continued: false, variable: true }]);
      return;
    }
    let remaining = f.bits;
    let continued = false;
    while (remaining > 0) {
      const take = Math.min(remaining, ROW_BITS - used);
      row.push({ field: i, span: take, continued, variable: false });
      used += take;
      remaining -= take;
      continued = true;
      if (used === ROW_BITS) flush();
    }
  });
  flush();
  return rows;
}

interface HeaderDiagramProps {
  spec: HeaderSpec;
  lang: Language;
  mode: DetailMode;
  values?: Record<string, string | number>;
  color?: string;
}

export function HeaderDiagram({ spec, lang, mode, values, color = "var(--primary)" }: HeaderDiagramProps) {
  const t = T[lang];
  const rows = useMemo(() => layoutRows(spec), [spec]);
  const [active, setActive] = useState<number | null>(null);
  const field = active !== null ? spec.fields[active] : null;

  return (
    <div className="space-y-3" style={{ ["--hd-color" as string]: color }}>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold">{spec.title[lang]}</span>
        <span className="text-[10px] font-mono text-muted-foreground">
          {spec.spec} · {spec.fixedBytes} {t.bytes}
        </span>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <div className="min-w-[460px]">
          {/* Regla de bits */}
          <div className="grid grid-cols-[repeat(32,minmax(0,1fr))] text-[8px] font-mono text-muted-foreground/70 mb-0.5">
            {Array.from({ length: ROW_BITS }, (_, b) => (
              <span key={b} className="text-center">{b % 8 === 0 || b === 31 ? b : ""}</span>
            ))}
          </div>

          <div className="space-y-px" onPointerLeave={() => setActive(null)}>
            {rows.map((cells, r) => (
              <div key={r} className="grid grid-cols-[repeat(32,minmax(0,1fr))] gap-px">
                {cells.map((c, k) => {
                  const f = spec.fields[c.field];
                  const isActive = active === c.field;
                  return (
                    <motion.button
                      key={k}
                      type="button"
                      onPointerEnter={() => setActive(c.field)}
                      onFocus={() => setActive(c.field)}
                      onClick={() => setActive(c.field)}
                      animate={{ scale: isActive ? 1.02 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      style={{ gridColumn: `span ${c.span} / span ${c.span}` }}
                      className={`relative h-9 min-w-0 rounded-[4px] border px-1 flex flex-col items-center justify-center text-center transition-colors duration-200 ${
                        isActive
                          ? "border-[color:var(--hd-color)] bg-[color-mix(in_oklch,var(--hd-color)_22%,transparent)]"
                          : c.variable
                            ? "border-dashed border-foreground/20 bg-foreground/[0.03] hover:bg-foreground/[0.06]"
                            : "border-foreground/15 bg-[color-mix(in_oklch,var(--hd-color)_7%,transparent)] hover:bg-[color-mix(in_oklch,var(--hd-color)_14%,transparent)]"
                      }`}
                    >
                      <span className={`truncate max-w-full font-mono leading-tight ${c.span < 6 ? "text-[8px]" : "text-[10px]"} ${c.continued ? "opacity-50" : ""}`}>
                        {c.span < 3 ? f.name[0] : f.name}
                      </span>
                      {!c.continued && c.span >= 6 && (
                        <span className="text-[8px] font-mono text-muted-foreground leading-none">
                          {f.bits === null ? t.variable : `${f.bits} ${t.bits}`}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explicación del campo */}
      <div className="min-h-[5.5rem] rounded-xl border border-white/30 dark:border-slate-700/60 bg-white/30 dark:bg-slate-900/40 p-3">
        <AnimatePresence mode="wait" initial={false}>
          {field ? (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-1"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs font-bold">{field.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{field.bits === null ? t.variable : `${field.bits} ${t.bits}`}</span>
                <span className="text-[10px] font-mono">
                  <span className="text-muted-foreground">{t.example}: </span>
                  <span className="text-primary">{fillExample(field.example, values)}</span>
                </span>
              </div>
              <p className="text-xs text-foreground/85 leading-relaxed">{mode === "technical" ? field.technical[lang] : field.basic[lang]}</p>
            </motion.div>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-muted-foreground italic">
              {t.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
