"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";
import type { Language } from "@/lib/network-data";
import type { Flow } from "@/lib/flows";
import { LAYER_COLORS } from "@/lib/encapsulation";

interface SequenceDiagramProps {
  flow: Flow;
  lang: Language;
  /** Índice del mensaje actual; los anteriores se ven completos y los siguientes atenuados. */
  step: number;
  onSelect: (index: number) => void;
  showTime?: boolean;
}

export function SequenceDiagram({ flow, lang, step, onSelect, showTime = false }: SequenceDiagramProps) {
  const cols = flow.actors.length;
  const index = (id: string) => flow.actors.findIndex((a) => a.id === id);
  const grid = { gridTemplateColumns: `${showTime ? "3.25rem " : ""}repeat(${cols}, minmax(0, 1fr))` };

  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className={cols > 3 ? "min-w-[640px]" : "min-w-[420px]"}>
        {/* Actores */}
        <div className="grid gap-2 mb-2" style={grid}>
          {showTime && <span />}
          {flow.actors.map((a) => (
            <div
              key={a.id}
              className="text-center text-[11px] font-bold rounded-xl border border-primary/20 bg-primary/5 px-2 py-1.5 truncate"
            >
              {a.label[lang]}
            </div>
          ))}
        </div>

        <div className="relative">
          {/* Líneas de vida */}
          <div className="absolute inset-0 grid gap-2 pointer-events-none" style={grid}>
            {showTime && <span />}
            {flow.actors.map((a) => (
              <div key={a.id} className="flex justify-center">
                <div className="w-px h-full bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />
              </div>
            ))}
          </div>

          <div className="relative space-y-1">
            {flow.messages.map((m, i) => {
              const from = index(m.from);
              const to = index(m.to);
              const self = from === to;
              const left = Math.min(from, to);
              const right = Math.max(from, to);
              const span = right - left + 1;
              const rightward = to >= from;
              const state = i < step ? "past" : i === step ? "current" : "future";
              const color = LAYER_COLORS[m.osi[0]] ?? "#6E9142";
              const offset = showTime ? 2 : 1;

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => onSelect(i)}
                  animate={{ opacity: state === "future" ? 0.22 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full grid gap-2 items-center rounded-lg py-1.5 text-left transition-colors ${
                    state === "current" ? "bg-primary/[0.06]" : "hover:bg-primary/[0.04]"
                  }`}
                  style={grid}
                >
                  {showTime && (
                    <span className="text-[10px] font-mono text-muted-foreground text-right pr-1">
                      {m.t !== undefined ? `${m.t} RTT` : ""}
                    </span>
                  )}

                  {self ? (
                    <div style={{ gridColumn: `${from + offset} / span 1` }} className="flex justify-center">
                      <div
                        className={`relative z-10 max-w-full rounded-lg border px-2 py-1 text-center bg-background/80 backdrop-blur-sm ${state === "current" ? "shadow-lg" : ""}`}
                        style={{ borderColor: `${color}66` }}
                      >
                        <span className="block text-[10px] font-mono font-bold truncate" style={{ color }}>{m.label}</span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ gridColumn: `${left + offset} / span ${span}` }} className="relative h-11">
                      {/* La flecha va del centro de la columna de origen al de destino */}
                      <div
                        className="absolute top-1/2 h-0"
                        style={{ left: `calc(100% / ${span} / 2)`, right: `calc(100% / ${span} / 2)` }}
                      >
                        <motion.div
                          initial={false}
                          animate={{ scaleX: state === "future" ? 0.001 : 1 }}
                          transition={{ type: "spring", stiffness: 140, damping: 22 }}
                          style={{ originX: rightward ? 0 : 1, background: color }}
                          className="relative h-[2px] rounded-full"
                        >
                          <span
                            className="absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[5px] border-y-transparent"
                            style={
                              rightward
                                ? { right: -1, borderLeft: `7px solid ${color}` }
                                : { left: -1, borderRight: `7px solid ${color}` }
                            }
                          />
                        </motion.div>
                        <div className="absolute inset-x-0 -top-[1.15rem] flex justify-center">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-1.5 rounded bg-background/70 backdrop-blur-sm truncate max-w-full" style={{ color }}>
                            {m.encrypted && <Lock className="w-2.5 h-2.5 shrink-0" />}
                            {m.label}
                          </span>
                        </div>
                        {m.sub && (
                          <div className="absolute inset-x-0 top-1.5 flex justify-center">
                            <span className="text-[9px] font-mono text-muted-foreground truncate max-w-full px-1">{m.sub[lang]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
