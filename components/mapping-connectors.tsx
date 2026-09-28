"use client";

import { motion } from "motion/react";
import { TCPIP_LAYERS, TCPIP_TO_OSI } from "@/lib/network-data";
import { useEffect, useRef, useState } from "react";

const mappingColors: Record<number, string> = {
  4: "#7c3aed",
  3: "#2563eb",
  2: "#0284c7",
  1: "#0369a1",
};

interface ConnectorPath {
  d: string;
  color: string;
  key: string;
  group: number;
}

interface ConnectorProps {
  osiLayerRefs: React.RefObject<(HTMLDivElement | null)[]>;
  tcpipLayerRefs: React.RefObject<(HTMLDivElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Capa TCP/IP cuyo grupo está en hover; sus líneas se resaltan y el resto se atenúa. */
  highlightedGroup?: number | null;
}

export function MappingConnectors({ osiLayerRefs, tcpipLayerRefs, containerRef, highlightedGroup = null }: ConnectorProps) {
  const [paths, setPaths] = useState<ConnectorPath[]>([]);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const computePaths = () => {
      const containerRect = container.getBoundingClientRect();
      const newPaths: ConnectorPath[] = [];

      TCPIP_LAYERS.forEach((tcpLayer, ti) => {
        const tcpEl = tcpipLayerRefs.current?.[ti];
        if (!tcpEl) return;

        const tcpRect = tcpEl.getBoundingClientRect();
        const tcpLeftX = tcpRect.left - containerRect.left;
        const tcpCenterY = tcpRect.top - containerRect.top + tcpRect.height / 2;

        (TCPIP_TO_OSI[tcpLayer.number] || []).forEach((osiNum) => {
          const osiEl = osiLayerRefs.current?.[7 - osiNum]; // L7 es el índice 0, L1 el índice 6
          if (!osiEl) return;

          const osiRect = osiEl.getBoundingClientRect();
          const osiRightX = osiRect.right - containerRect.left;
          const osiCenterY = osiRect.top - containerRect.top + osiRect.height / 2;

          // Curva de Bézier suave entre los dos modelos
          const cpx = osiRightX + (tcpLeftX - osiRightX) / 2;
          newPaths.push({
            d: `M ${osiRightX} ${osiCenterY} C ${cpx} ${osiCenterY}, ${cpx} ${tcpCenterY}, ${tcpLeftX} ${tcpCenterY}`,
            color: mappingColors[tcpLayer.number],
            key: `osi-${osiNum}-tcp-${tcpLayer.number}`,
            group: tcpLayer.number,
          });
        });
      });

      setPaths(newPaths);
      setDims({ width: containerRect.width, height: containerRect.height });
    };

    // Agrupa varias notificaciones en un solo cálculo por frame
    const schedule = () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(computePaths);
    };

    // Observa el contenedor y cada tarjeta: expandir una capa mueve las demás aunque la altura total no cambie
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    [...(osiLayerRefs.current ?? []), ...(tcpipLayerRefs.current ?? [])].forEach((el) => el && observer.observe(el));

    const timer = setTimeout(schedule, 100);
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", schedule);
    };
  }, [containerRef, osiLayerRefs, tcpipLayerRefs]);

  if (dims.width === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none z-10 hidden md:block"
      width={dims.width}
      height={dims.height}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="connector-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((p, i) => {
        const isOn = highlightedGroup === p.group;
        const isOff = highlightedGroup !== null && !isOn;
        return (
          <g key={p.key}>
            <motion.path
              id={p.key}
              d={p.d}
              fill="none"
              stroke={p.color}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isOn ? 0.9 : isOff ? 0.08 : 0.3,
                strokeWidth: isOn ? 2 : 1.2,
              }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut", delay: i * 0.05 },
                opacity: { duration: 0.35 },
                strokeWidth: { type: "spring", stiffness: 300, damping: 25 },
              }}
              style={isOn ? { filter: "url(#connector-glow)" } : undefined}
            />
            {/* Paquete de luz que recorre la conexión resaltada */}
            {isOn && (
              <motion.circle
                r={3.5}
                fill={p.color}
                filter="url(#connector-glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <animateMotion dur="1.6s" repeatCount="indefinite" path={p.d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.65 0 0.35 1" />
              </motion.circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}
