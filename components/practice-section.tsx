"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { CheckCircle2, XCircle, RefreshCw, Trophy, Hand, Split } from "lucide-react";
import { GlassCard, HOVER_SPRING } from "@/components/glass-card";
import { useProtocolCatalog } from "@/hooks/use-protocol-catalog";
import { OSI_LAYERS, TCPIP_LAYERS, osiToTcpip, type DetailMode, type Language } from "@/lib/network-data";
import type { Protocol } from "@/lib/protocols/types";
import { LAYER_COLORS } from "@/lib/encapsulation";

const ROUND_SIZE = 8;

// Protocolos conocidos y de una sola capa para el nivel fácil
const EASY_IDS = [
  "http1", "dns", "smtp", "ssh", "ftp", "imap", "json", "utf8", "image-formats", "onc-rpc", "netbios", "socks5",
  "tcp", "udp", "ipv4", "ipv6", "icmp", "ospf", "ethernet", "wifi-mac", "vlan-8021q", "ppp", "1000base-t", "wifi-phy", "usb",
];

const T = {
  es: {
    heading: "Modo práctica",
    subheading: "Arrastra cada protocolo a su capa, o tócalo y luego toca la capa",
    model: { osi: "OSI (7 capas)", tcpip: "TCP/IP (4 capas)" },
    difficulty: { easy: "Fácil", hard: "Difícil (incluye multicapa)" },
    score: "Aciertos al primer intento",
    newRound: "Nueva ronda",
    loading: "Cargando protocolos…",
    correct: (p: string, layer: string) => `¡Correcto! ${p} va en ${layer}.`,
    wrong: (p: string, layer: string, right: string) => `${p} no va en ${layer}. Su lugar es ${right}.`,
    done: (s: number, n: number) => `Ronda terminada: ${s} de ${n} al primer intento.`,
    perfect: "¡Ronda perfecta!",
    hint: "Toca o arrastra un protocolo para empezar.",
    selected: (p: string) => `${p} seleccionado: ahora toca una capa.`,
    multi: "Multicapa: cualquiera de sus capas es válida.",
    layerShort: "Capa",
  },
  en: {
    heading: "Practice mode",
    subheading: "Drag each protocol onto its layer, or tap it and then tap the layer",
    model: { osi: "OSI (7 layers)", tcpip: "TCP/IP (4 layers)" },
    difficulty: { easy: "Easy", hard: "Hard (includes multi-layer)" },
    score: "Correct on first try",
    newRound: "New round",
    loading: "Loading protocols…",
    correct: (p: string, layer: string) => `Correct! ${p} belongs in ${layer}.`,
    wrong: (p: string, layer: string, right: string) => `${p} does not go in ${layer}. It belongs in ${right}.`,
    done: (s: number, n: number) => `Round over: ${s} of ${n} on the first try.`,
    perfect: "Perfect round!",
    hint: "Tap or drag a protocol to start.",
    selected: (p: string) => `${p} selected: now tap a layer.`,
    multi: "Multi-layer: any of its layers is accepted.",
    layerShort: "Layer",
  },
};

type Model = "osi" | "tcpip";
type Difficulty = "easy" | "hard";

interface Feedback {
  ok: boolean;
  text: string;
  detail: string;
  key: number;
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pointerOf(e: MouseEvent | TouchEvent | PointerEvent) {
  return "changedTouches" in e ? e.changedTouches[0] : e;
}

function zoneAt(e: MouseEvent | TouchEvent | PointerEvent): number | null {
  const { clientX, clientY } = pointerOf(e);
  for (const el of document.elementsFromPoint(clientX, clientY)) {
    const zone = (el as HTMLElement).closest?.("[data-drop-zone]") as HTMLElement | null;
    if (zone) return Number(zone.dataset.dropZone);
  }
  return null;
}

interface PracticeSectionProps {
  lang: Language;
  mode: DetailMode;
}

export function PracticeSection({ lang, mode }: PracticeSectionProps) {
  const t = T[lang];
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "300px" });
  const catalog = useProtocolCatalog(inView);

  const [model, setModel] = useState<Model>("osi");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [round, setRound] = useState<Protocol[]>([]);
  const [placed, setPlaced] = useState<Record<string, number>>({});
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const [hoverZone, setHoverZone] = useState<number | null>(null);
  const [wrongZone, setWrongZone] = useState<{ zone: number; key: number } | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const dragged = useRef(false);

  const zones = model === "osi" ? OSI_LAYERS : TCPIP_LAYERS;
  const zoneName = useCallback(
    (n: number) => {
      const layer = zones.find((z) => z.number === n);
      return `${t.layerShort} ${n} (${layer?.name[lang] ?? ""})`;
    },
    [zones, t.layerShort, lang]
  );

  const newRound = useCallback(() => {
    if (!catalog) return;
    const pool =
      difficulty === "easy"
        ? EASY_IDS.map((id) => catalog.PROTOCOLS_BY_ID[id]).filter(Boolean)
        : catalog.ALL_PROTOCOLS;
    setRound(shuffle(pool).slice(0, ROUND_SIZE));
    setPlaced({});
    setMissed(new Set());
    setSelected(null);
    setFeedback(null);
  }, [catalog, difficulty]);

  // Primera ronda al cargar el catálogo y una nueva al cambiar la dificultad o el modelo
  useEffect(() => {
    newRound();
  }, [newRound, model]);

  const correctZones = useCallback(
    (p: Protocol) => [...new Set(model === "osi" ? p.osi : p.osi.map(osiToTcpip))],
    [model]
  );

  const attempt = (id: string, zone: number) => {
    const p = round.find((r) => r.id === id);
    if (!p || placed[id] !== undefined) return;
    const right = correctZones(p);
    const ok = right.includes(zone);
    const detail = p.multiLayerNote && difficulty === "hard" ? p.multiLayerNote[lang] : p.summary[lang];
    if (ok) {
      setPlaced((prev) => ({ ...prev, [id]: zone }));
      setSelected(null);
      setFeedback({ ok, text: t.correct(p.acronym, zoneName(zone)) + (right.length > 1 ? ` ${t.multi}` : ""), detail, key: Date.now() });
    } else {
      setMissed((prev) => new Set(prev).add(id));
      setWrongZone({ zone, key: Date.now() });
      setFeedback({ ok, text: t.wrong(p.acronym, zoneName(zone), right.map(zoneName).join(" / ")), detail, key: Date.now() });
    }
  };

  const remaining = round.filter((p) => placed[p.id] === undefined);
  const finished = round.length > 0 && remaining.length === 0;
  const score = round.filter((p) => placed[p.id] !== undefined && !missed.has(p.id)).length;

  const byZone = useMemo(() => {
    const map: Record<number, Protocol[]> = {};
    round.forEach((p) => {
      const z = placed[p.id];
      if (z !== undefined) (map[z] ??= []).push(p);
    });
    return map;
  }, [round, placed]);

  return (
    <section ref={rootRef} className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
        <h2 className="gradient-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.heading}</h2>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{t.subheading}</p>
      </motion.div>

      <GlassCard lift={false} className="rounded-3xl p-4 sm:p-6">
        <div className="relative z-10 space-y-5">
          {/* Opciones */}
          <div data-tour="practice-controls" className="flex flex-wrap items-center gap-2">
            <Segmented value={model} options={(["osi", "tcpip"] as Model[]).map((m) => ({ id: m, label: t.model[m] }))} onChange={setModel} layoutId="practice-model" />
            <Segmented
              value={difficulty}
              options={(["easy", "hard"] as Difficulty[]).map((d) => ({ id: d, label: t.difficulty[d] }))}
              onChange={setDifficulty}
              layoutId="practice-diff"
            />
            <div className="ml-auto flex items-center gap-3">
              <span className="text-[11px] font-mono">
                <span className="text-muted-foreground">{t.score}: </span>
                <span className="text-primary font-bold">{score} / {round.length || ROUND_SIZE}</span>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={HOVER_SPRING}
                onClick={newRound}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-primary text-primary-foreground"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.newRound}
              </motion.button>
            </div>
          </div>

          {/* Protocolos por colocar */}
          <div className="min-h-[3.25rem] rounded-2xl border border-dashed border-primary/25 p-2 flex flex-wrap gap-2 items-center">
            {!catalog && <span className="text-xs text-muted-foreground italic px-2">{t.loading}</span>}
            <AnimatePresence mode="popLayout">
              {remaining.map((p) => (
                <motion.button
                  key={p.id}
                  layout
                  drag
                  dragSnapToOrigin
                  dragElastic={0.6}
                  whileDrag={{ scale: 1.12, zIndex: 50, cursor: "grabbing", boxShadow: "0 12px 30px -8px rgba(37,99,235,0.45)" }}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={HOVER_SPRING}
                  onDragStart={() => {
                    dragged.current = true;
                    setSelected(null);
                  }}
                  onDrag={(e) => setHoverZone(zoneAt(e))}
                  onDragEnd={(e) => {
                    const zone = zoneAt(e);
                    setHoverZone(null);
                    if (zone !== null) attempt(p.id, zone);
                  }}
                  onClick={() => {
                    // Un arrastre también dispara click al soltar: se ignora
                    if (dragged.current) {
                      dragged.current = false;
                      return;
                    }
                    setSelected((s) => (s === p.id ? null : p.id));
                  }}
                  title={p.fullName[lang]}
                  className={`relative touch-none select-none cursor-grab inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border bg-white/70 dark:bg-slate-800 transition-colors ${
                    selected === p.id ? "border-primary ring-2 ring-primary/40 text-primary" : "border-white/50 dark:border-slate-700"
                  }`}
                >
                  {difficulty === "hard" && p.osi.length > 1 && <Split className="w-3 h-3 opacity-50" />}
                  {p.acronym}
                </motion.button>
              ))}
            </AnimatePresence>
            {finished && (
              <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 px-2">
                <Trophy className="w-4 h-4" />
                {score === round.length ? t.perfect : t.done(score, round.length)}
              </motion.span>
            )}
          </div>

          {/* Mensaje */}
          <div className="min-h-[4.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              {feedback ? (
                <motion.div
                  key={feedback.key}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl border p-3 ${feedback.ok ? "border-emerald-500/30 bg-emerald-500/10" : "border-rose-500/30 bg-rose-500/10"}`}
                >
                  <p className="flex items-center gap-1.5 text-xs font-bold">
                    {feedback.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                    {feedback.text}
                  </p>
                  <p className="mt-1 text-xs text-foreground/80 leading-relaxed">{mode === "technical" || !feedback.ok ? feedback.detail : feedback.detail.split(". ")[0] + "."}</p>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-xs text-muted-foreground italic">
                  <Hand className="w-3.5 h-3.5" /> {selected ? t.selected(round.find((r) => r.id === selected)?.acronym ?? "") : t.hint}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Capas destino */}
          <div className="space-y-2">
            {zones.map((z) => {
              const color = LAYER_COLORS[model === "osi" ? z.number : ({ 4: 7, 3: 4, 2: 3, 1: 2 } as Record<number, number>)[z.number]];
              const isHover = hoverZone === z.number;
              const shake = wrongZone?.zone === z.number;
              return (
                <motion.div
                  key={`${model}-${z.number}-${shake ? wrongZone?.key : ""}`}
                  data-drop-zone={z.number}
                  onClick={() => selected && attempt(selected, z.number)}
                  animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0, scale: isHover ? 1.015 : 1 }}
                  transition={shake ? { duration: 0.4 } : HOVER_SPRING}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 min-h-[3rem] transition-colors ${
                    selected ? "cursor-pointer" : ""
                  } ${isHover || selected ? "border-[color:var(--zc)]" : "border-white/30 dark:border-slate-700/60"}`}
                  style={{
                    ["--zc" as string]: color,
                    background: isHover ? `color-mix(in oklch, ${color} 18%, transparent)` : `color-mix(in oklch, ${color} 6%, transparent)`,
                  }}
                >
                  <span className="shrink-0 w-28 sm:w-40">
                    <span className="block text-[10px] font-mono font-bold" style={{ color }}>
                      {model === "osi" ? "OSI" : "TCP/IP"} L{z.number}
                    </span>
                    <span className="block text-xs font-semibold truncate">{z.name[lang]}</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <AnimatePresence>
                      {(byZone[z.number] ?? []).map((p) => (
                        <motion.span
                          key={p.id}
                          layout
                          initial={{ opacity: 0, scale: 0.5, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={HOVER_SPRING}
                          className={`text-[11px] font-mono font-bold px-2 py-1 rounded-md border ${
                            missed.has(p.id)
                              ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                              : "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          {p.acronym}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

function Segmented<V extends string>({ value, options, onChange, layoutId }: { value: V; options: { id: V; label: string }[]; onChange: (v: V) => void; layoutId: string }) {
  return (
    <div role="radiogroup" className="flex items-center rounded-lg border border-primary/15 bg-primary/5 p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`relative text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${value === o.id ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
        >
          {value === o.id && <motion.span layoutId={layoutId} transition={HOVER_SPRING} className="absolute inset-0 rounded-md bg-background/80 shadow-sm border border-primary/20" />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
