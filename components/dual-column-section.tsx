"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { OSI_LAYERS, TCPIP_LAYERS, osiToTcpip, Language, DetailMode } from "@/lib/network-data";
import { LayerCard } from "@/components/layer-card";
import { MappingConnectors } from "@/components/mapping-connectors";

export interface ProtocolFocus {
  id: string;
  osi: number;
}

interface DualColumnSectionProps {
  lang: Language;
  mode: DetailMode;
  /** Protocolo elegido en la búsqueda global: se abre en su capa OSI principal. */
  focus: ProtocolFocus | null;
  onFocusHandled: () => void;
}

export function DualColumnSection({ lang, mode, focus, onFocusHandled }: DualColumnSectionProps) {
  const [activeOSI, setActiveOSI] = useState<number | null>(null);
  const [activeTCPIP, setActiveTCPIP] = useState<number | null>(null);
  // Capa TCP/IP del grupo en hover (una capa OSI en hover resalta su grupo TCP/IP completo)
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focus) setActiveOSI(focus.osi);
  }, [focus]);
  const osiRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tcpipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setOsiRef = useCallback((el: HTMLDivElement | null, i: number) => {
    osiRefs.current[i] = el;
  }, []);

  const setTcpipRef = useCallback((el: HTMLDivElement | null, i: number) => {
    tcpipRefs.current[i] = el;
  }, []);

  // Diccionario interno para textos fijos de esta sección
  const texts = {
    es: { osi: "Modelo de Referencia OSI", tcp: "Modelo Conceptual TCP/IP", desc: "ISO/IEC 7498-1 vs RFC 1122 / 1123", l7: "7 Capas", l4: "4 Capas" },
    en: { osi: "OSI Reference Model", tcp: "TCP/IP Conceptual Model", desc: "ISO/IEC 7498-1 vs RFC 1122 / 1123", l7: "7 Layers", l4: "4 Layers" }
  };

  const t = texts[lang];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="gradient-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {t.osi} <span className="text-primary/40">vs</span> {t.tcp}
        </h2>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          {t.desc}
        </p>
      </motion.div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
        {/* Conectores SVG dinámicos */}
        <MappingConnectors 
          osiLayerRefs={osiRefs} 
          tcpipLayerRefs={tcpipRefs} 
          containerRef={containerRef}
          highlightedGroup={hoveredGroup}
        />

        {/* Columna OSI */}
        <div className="space-y-4 relative z-20">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="flex-1 border-t-2 border-dashed border-accent/40" />
            <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase">{t.l7}</span>
            <div className="w-8 border-t-2 border-dashed border-accent/40" />
          </div>
          {OSI_LAYERS.map((layer, i) => {
            const group = osiToTcpip(layer.number);
            return (
              <div key={layer.number} ref={(el) => setOsiRef(el, i)} data-tour={i === 0 ? "layer-card" : undefined}>
                <LayerCard
                  layer={layer}
                  isOSI={true}
                  index={i}
                  lang={lang}
                  mode={mode}
                  focusProtocolId={focus?.osi === layer.number ? focus.id : null}
                  onFocusHandled={onFocusHandled}
                  isActive={activeOSI === layer.number}
                  onToggle={() => setActiveOSI(activeOSI === layer.number ? null : layer.number)}
                  isHighlighted={hoveredGroup === group}
                  isDimmed={hoveredGroup !== null && hoveredGroup !== group}
                  onHoverChange={(h) => setHoveredGroup(h ? group : null)}
                />
              </div>
            );
          })}
        </div>

        {/* Columna TCP/IP */}
        <div className="space-y-4 relative z-20">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-8 border-t-2 border-dashed border-accent/40" />
            <span className="font-mono text-[10px] font-bold text-primary tracking-widest uppercase">{t.l4}</span>
            <div className="flex-1 border-t-2 border-dashed border-accent/40" />
          </div>
          {TCPIP_LAYERS.map((layer, i) => {
            // Alineación visual: La capa 4 de TCP/IP abarca 3 de OSI (App, Pres, Ses)
            const marginClass = i === 0 ? "" : i === 1 ? "md:mt-[150px]" : "";
            
            return (
              <div key={layer.number} ref={(el) => setTcpipRef(el, i)} className={marginClass}>
                <LayerCard
                  layer={layer}
                  isOSI={false}
                  index={i}
                  lang={lang}
                  mode={mode}
                  isActive={activeTCPIP === layer.number}
                  onToggle={() => setActiveTCPIP(activeTCPIP === layer.number ? null : layer.number)}
                  isHighlighted={hoveredGroup === layer.number}
                  isDimmed={hoveredGroup !== null && hoveredGroup !== layer.number}
                  onHoverChange={(h) => setHoveredGroup(h ? layer.number : null)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}