"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Pause, Play, RefreshCw, SkipBack, SkipForward, Terminal, ArrowDownToLine, ArrowUpFromLine, MousePointerClick } from "lucide-react";
import { GlassCard, HOVER_SPRING } from "@/components/glass-card";
import { HeaderDiagram } from "@/components/header-diagram";
import type { DetailMode, Language } from "@/lib/network-data";
import { HEADERS } from "@/lib/headers";
import {
  buildSegments,
  computeEncapsulation,
  headerValues,
  IFG,
  LAYER_COLORS,
  MTU,
  SIM_STEPS,
  type Direction,
  type PacketSegment,
  type SegmentId,
} from "@/lib/encapsulation";

const T = {
  es: {
    title: "Simulador de Encapsulamiento",
    subtitle: "Una petición HTTP/2 cifrada con TLS 1.3 recorre la pila con los tamaños reales de cada cabecera.",
    send: "Envío", receive: "Recepción",
    play: "Reproducir", pause: "Pausa", prev: "Anterior", next: "Siguiente", reset: "Reiniciar",
    speed: "Velocidad", payload: "Cabeceras HPACK", timestamps: "Timestamps TCP",
    idleSend: "Pulsa Reproducir o Siguiente: la aplicación todavía no ha generado datos.",
    idleReceive: "Llega una señal al puerto de red con la trama completa. Pulsa Reproducir para desencapsularla.",
    doneSend: "Trama en el cable. Cadena: Datos → Segmento → Paquete → Trama → Bits.",
    doneReceive: "Petición entregada a la aplicación: cada capa quitó solo lo que ella misma añadió.",
    frame: "Trama Ethernet", ip: "Paquete IP / MTU", segments: "Segmentos TCP", efficiency: "Eficiencia en el cable",
    wire: "Ocupación real en el cable (primer segmento)", clickHint: "Haz clic en una cabecera para inspeccionarla",
    noHeader: "Esta parte no tiene formato de campos propio.",
    step: "Paso", of: "de",
  },
  en: {
    title: "Encapsulation Simulator",
    subtitle: "A TLS 1.3-encrypted HTTP/2 request travels down the stack with every header's real size.",
    send: "Send", receive: "Receive",
    play: "Play", pause: "Pause", prev: "Previous", next: "Next", reset: "Reset",
    speed: "Speed", payload: "HPACK headers", timestamps: "TCP timestamps",
    idleSend: "Press Play or Next: the application has not produced any data yet.",
    idleReceive: "A signal arrives at the network port carrying the full frame. Press Play to decapsulate it.",
    doneSend: "Frame on the wire. Chain: Data → Segment → Packet → Frame → Bits.",
    doneReceive: "Request delivered to the application: each layer removed only what it added itself.",
    frame: "Ethernet frame", ip: "IP packet / MTU", segments: "TCP segments", efficiency: "Wire efficiency",
    wire: "Actual wire usage (first segment)", clickHint: "Click a header to inspect it",
    noHeader: "This part has no field format of its own.",
    step: "Step", of: "of",
  },
};

const SPEEDS = [0.5, 1, 2];
const BASE_DELAY = 2200;

const fmt = (n: number) => n.toLocaleString("en-US");

interface EncapsulationSimulatorProps {
  lang: Language;
  mode: DetailMode;
}

export function EncapsulationSimulator({ lang, mode }: EncapsulationSimulatorProps) {
  const t = T[lang];
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState<Direction>("send");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [payload, setPayload] = useState(38);
  const [timestamps, setTimestamps] = useState(false);
  const [selected, setSelected] = useState<SegmentId | null>(null);

  const steps = useMemo(() => (direction === "send" ? SIM_STEPS : [...SIM_STEPS].reverse()), [direction]);
  const result = useMemo(() => computeEncapsulation({ payload, tcpTimestamps: timestamps }), [payload, timestamps]);
  const values = useMemo(() => headerValues(result, payload), [result, payload]);
  const last = steps.length - 1;
  const current = step >= 0 ? steps[step] : null;
  const finished = step === last;

  // Capa más baja visible: en envío crece hacia abajo; en recepción cada capa quita la suya
  const lowestOsi = useMemo(() => {
    if (direction === "send") return current ? current.osi : 8;
    if (!current) return 1;
    return current.osi === 7 ? 7 : current.osi + 1;
  }, [direction, current]);

  const segments = useMemo(() => buildSegments(result, payload, lowestOsi), [result, payload, lowestOsi]);
  const selectedSegment = segments.find((s) => s.id === selected) ?? null;

  useEffect(() => {
    if (selected && !segments.some((s) => s.id === selected)) setSelected(null);
  }, [segments, selected]);

  // Reproducción automática
  useEffect(() => {
    if (!playing) return;
    if (finished) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => Math.min(s + 1, last)), step < 0 ? 300 : BASE_DELAY / speed);
    return () => clearTimeout(id);
  }, [playing, step, finished, last, speed]);

  const reset = () => {
    setPlaying(false);
    setStep(-1);
    setSelected(null);
  };

  const switchDirection = (d: Direction) => {
    if (d === direction) return;
    setDirection(d);
    reset();
  };

  const statusText = !current ? (direction === "send" ? t.idleSend : t.idleReceive) : current.detail[direction](result, payload)[lang];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto">
      <GlassCard lift={false} className="rounded-3xl overflow-hidden">
        {/* Barra de consola */}
        <div className="relative z-10 bg-slate-900/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-1" />
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>{t.title}</span>
            </div>
          </div>

          {/* Dirección */}
          <div role="radiogroup" className="flex items-center rounded-lg bg-white/5 p-0.5 border border-white/10">
            {(["send", "receive"] as Direction[]).map((d) => {
              const Icon = d === "send" ? ArrowDownToLine : ArrowUpFromLine;
              return (
                <button
                  key={d}
                  role="radio"
                  aria-checked={direction === d}
                  onClick={() => switchDirection(d)}
                  className={`relative flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors ${direction === d ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
                >
                  {direction === d && <motion.span layoutId="sim-dir-pill" transition={HOVER_SPRING} className="absolute inset-0 rounded-md bg-primary/80" />}
                  <Icon className="relative w-3.5 h-3.5" />
                  <span className="relative">{t[d]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 p-4 sm:p-8 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>

          {/* Controles */}
          <div className="flex flex-wrap items-center gap-2">
            <ControlButton onClick={() => setStep((s) => Math.max(-1, s - 1))} disabled={step < 0} label={t.prev}>
              <SkipBack className="w-3.5 h-3.5" />
            </ControlButton>
            <ControlButton
              primary
              onClick={() => {
                if (finished) {
                  setStep(-1);
                  setPlaying(true);
                } else setPlaying((p) => !p);
              }}
              label={playing ? t.pause : t.play}
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{playing ? t.pause : t.play}</span>
            </ControlButton>
            <ControlButton onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={finished} label={t.next}>
              <SkipForward className="w-3.5 h-3.5" />
            </ControlButton>
            <ControlButton onClick={reset} label={t.reset}>
              <RefreshCw className="w-3.5 h-3.5" />
            </ControlButton>

            <div className="flex items-center gap-1 ml-auto text-[11px] font-mono">
              <span className="text-muted-foreground mr-1">{t.speed}</span>
              {SPEEDS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded-md border transition-colors ${speed === s ? "border-primary/40 bg-primary/10 text-primary" : "border-transparent hover:border-primary/20"}`}
                >
                  {s}×
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="space-y-1.5">
              <span className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                {t.payload} <span className="text-primary">{fmt(payload)} B</span>
              </span>
              <input
                type="range"
                min={20}
                max={6000}
                step={1}
                value={payload}
                onChange={(e) => setPayload(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </label>
            <label className="flex items-center gap-2 text-[11px] font-mono cursor-pointer select-none sm:justify-end">
              <input type="checkbox" checked={timestamps} onChange={(e) => setTimestamps(e.target.checked)} className="accent-[var(--primary)]" />
              {t.timestamps} (+12 B)
            </label>
          </div>

          {/* Paquete */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3" /> {t.clickHint}</span>
              {current && <span>{t.step} {step + 1} {t.of} {steps.length} · L{current.osi}</span>}
            </div>
            <div className="min-h-[4.5rem] rounded-2xl border border-dashed border-primary/20 p-2 flex items-stretch gap-1 overflow-x-auto">
              <LayoutGroup>
                <AnimatePresence initial={false} mode="popLayout">
                  {segments.map((s) => (
                    <SegmentBlock
                      key={s.id}
                      segment={s}
                      selected={selected === s.id}
                      reduceMotion={!!reduceMotion}
                      onSelect={() => setSelected(selected === s.id ? null : s.id)}
                    />
                  ))}
                </AnimatePresence>
              </LayoutGroup>
            </div>
          </div>

          {/* Paso actual */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${direction}-${step}-${lang}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-primary/20 bg-white/70 dark:bg-slate-900/70 p-4 shadow-lg"
            >
              {current && (
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white"
                    style={{ background: LAYER_COLORS[current.osi] }}
                  >
                    OSI L{current.osi}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">TCP/IP · {current.tcpip}</span>
                  <span className="text-xs font-semibold">{current.title[direction][lang]}</span>
                </div>
              )}
              <p className="text-xs text-foreground/85 leading-relaxed">{statusText}</p>
              {finished && (
                <p className="mt-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  {direction === "send" ? t.doneSend : t.doneReceive}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pasos */}
          <ol className="grid grid-cols-7 gap-1">
            {steps.map((s, i) => (
              <li key={s.osi}>
                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep(i);
                  }}
                  className="w-full group"
                  aria-label={s.title[direction][lang]}
                >
                  <motion.div
                    className="h-1.5 rounded-full"
                    animate={{ opacity: i <= step ? 1 : 0.2, scaleY: i === step ? 1.6 : 1 }}
                    transition={HOVER_SPRING}
                    style={{ background: LAYER_COLORS[s.osi] }}
                  />
                  <span className={`block mt-1 text-[10px] font-mono text-center transition-colors ${i === step ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                    L{s.osi}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* Métricas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <Metric label={t.frame} value={`${fmt(result.frame)} B`} />
            <Metric label={t.ip} value={`${fmt(result.ipTotal)} / ${MTU}`} gauge={result.ipTotal / MTU} />
            <Metric label={t.segments} value={`${result.segments} × MSS ${fmt(result.mss)}`} />
            <Metric label={t.efficiency} value={`${(result.efficiency * 100).toFixed(1)} %`} gauge={result.efficiency} />
          </div>

          <WireBar result={result} label={t.wire} />

          {/* Inspector */}
          <AnimatePresence initial={false}>
            {selectedSegment && (
              <motion.div
                key={selectedSegment.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-white/30 dark:border-slate-700/60 bg-white/50 dark:bg-slate-900/60 p-4 space-y-3">
                  {selectedSegment.note && <p className="text-xs text-foreground/80">{selectedSegment.note[lang]}</p>}
                  {selectedSegment.header ? (
                    <HeaderDiagram
                      spec={HEADERS[selectedSegment.header]}
                      lang={lang}
                      mode={mode}
                      values={values}
                      color={LAYER_COLORS[selectedSegment.osi]}
                    />
                  ) : (
                    !selectedSegment.note && <p className="text-xs text-muted-foreground italic">{t.noHeader}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </section>
  );
}

function ControlButton({ children, onClick, disabled, primary, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={HOVER_SPRING}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/60 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700 hover:border-primary/40"
      }`}
    >
      {children}
    </motion.button>
  );
}

function SegmentBlock({ segment: s, selected, onSelect, reduceMotion }: { segment: PacketSegment; selected: boolean; onSelect: () => void; reduceMotion: boolean }) {
  const color = LAYER_COLORS[s.osi];
  const isPayload = s.kind === "payload";
  // Las cabeceras no son proporcionales a sus bytes para que se lean; la carga ocupa el resto
  const width = isPayload ? undefined : Math.min(120, Math.max(58, s.bytes * 3));
  return (
    <motion.button
      layout={!reduceMotion}
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, scale: 0.6, y: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 12 }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      style={{
        width,
        ["--seg" as string]: color,
      }}
      className={`relative shrink-0 rounded-lg border px-2 py-2 text-left flex flex-col justify-center transition-[box-shadow,background-color] duration-300 ${
        isPayload ? "flex-1 min-w-[96px]" : ""
      } ${s.kind === "trailer" ? "border-dashed" : ""} ${
        selected ? "ring-2 ring-[color:var(--seg)] shadow-lg" : "hover:shadow-[0_6px_18px_-6px_var(--seg)]"
      } border-[color:color-mix(in_oklch,var(--seg)_50%,transparent)] bg-[color-mix(in_oklch,var(--seg)_16%,transparent)]`}
    >
      <span className="text-[10px] font-mono font-bold truncate" style={{ color }}>{s.label}</span>
      <span className="text-[10px] font-mono text-muted-foreground">{fmt(s.bytes)} B</span>
      <span className="absolute top-1 right-1.5 text-[8px] font-mono text-muted-foreground/70">L{s.osi}</span>
    </motion.button>
  );
}

function Metric({ label, value, gauge }: { label: string; value: string; gauge?: number }) {
  return (
    <div className="rounded-xl border border-white/30 dark:border-slate-700/60 bg-white/40 dark:bg-slate-900/40 px-3 py-2 transition-colors duration-300 hover:border-primary/30">
      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="block text-sm font-mono font-bold">{value}</span>
      {gauge !== undefined && (
        <div className="mt-1.5 h-1 rounded-full bg-primary/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"
            animate={{ width: `${Math.min(100, gauge * 100)}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </div>
      )}
    </div>
  );
}

/** Barra proporcional: cuántos bytes del cable son datos útiles y cuántos son sobrecarga. */
function WireBar({ result: r, label }: { result: ReturnType<typeof computeEncapsulation>; label: string }) {
  const parts = [
    { osi: 1, bytes: 8, name: "Preamble" },
    { osi: 2, bytes: 14, name: "Eth" },
    { osi: 3, bytes: 20, name: "IP" },
    { osi: 4, bytes: r.tcpHeader, name: "TCP" },
    { osi: 6, bytes: 5 + (r.trailerInFirst ? 17 : 0), name: "TLS" },
    { osi: 7, bytes: r.firstSegmentPayload - 5 - (r.trailerInFirst ? 17 : 0), name: "HTTP/2" },
    { osi: 2, bytes: r.padding + 4, name: "FCS" },
    { osi: 1, bytes: IFG, name: "IFG" },
  ].filter((p) => p.bytes > 0);
  const total = parts.reduce((a, p) => a + p.bytes, 0);
  return (
    <div className="space-y-1.5">
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label} · {fmt(total)} B
      </span>
      <div className="flex h-3 rounded-full overflow-hidden border border-white/30 dark:border-slate-700/60">
        {parts.map((p, i) => (
          <motion.div
            key={i}
            title={`${p.name}: ${p.bytes} B`}
            animate={{ width: `${(p.bytes / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
            style={{ background: LAYER_COLORS[p.osi], opacity: p.name === "HTTP/2" ? 1 : 0.55 }}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}
