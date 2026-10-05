"use client";

import { forwardRef, useId } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { HOVER_SPRING } from "@/components/glass-card";

// Caja del botón según el tamaño; el espaciado entre ícono y texto va aparte, en el contenido.
const SIZES = {
  sm: "h-8 px-3 text-[11px]",
  default: "h-10 px-5 text-sm",
} as const;

export interface LiquidGlassButtonProps extends HTMLMotionProps<"button"> {
  /** Tiñe el vidrio y el bisel; por defecto el color primario del tema. Útil para que cada
   *  instancia adopte el color de su capa (igual que `GlassCard`/`ProtocolPopover`). */
  glowColor?: string;
  size?: keyof typeof SIZES;
}

/**
 * Botón de "vidrio líquido": un filtro SVG de turbulencia + displacement distorsiona lo que
 * hay detrás a través de `backdrop-filter: url(#filtro)`, con un bisel de sombras internas
 * encima para dar volumen (basado en el componente LiquidButton de 21st.dev, adaptado a los
 * tokens oklch y al lenguaje visual de vidrio ya establecidos en el sitio).
 *
 * Degradado: Safari y Firefox no soportan `backdrop-filter` con una referencia a un filtro SVG,
 * así que ahí la distorsión simplemente no aparece y el botón se queda en el tinte translúcido
 * de abajo — sigue viéndose como vidrio, solo que sin la refracción.
 */
export const LiquidGlassButton = forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(function LiquidGlassButton(
  { glowColor = "var(--primary)", size = "default", className, children, type = "button", ...props },
  ref
) {
  // Cada instancia necesita su propio filtro: varias tarjetas con botón a la vez no pueden compartir un solo id de SVG.
  const filterId = `liquid-glass-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={HOVER_SPRING}
      className={cn("relative inline-flex items-center justify-center rounded-full font-mono font-bold", SIZES[size], className)}
      {...props}
    >
      {/* Bisel: sombras internas que dan volumen de vidrio, con o sin soporte de la distorsión */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full shadow-[inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.8),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.4),inset_0_0_6px_2px_rgba(255,255,255,0.15),0_2px_8px_-2px_rgba(15,23,42,0.25)] dark:shadow-[inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.25),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.5),inset_0_0_6px_2px_rgba(255,255,255,0.06),0_2px_10px_-2px_rgba(0,0,0,0.5)]"
      />
      {/* Vidrio: tinte translúcido del color de la capa, distorsionado por el filtro SVG */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden rounded-full border"
        style={{
          background: `color-mix(in oklch, ${glowColor} 16%, transparent)`,
          borderColor: `color-mix(in oklch, ${glowColor} 38%, transparent)`,
          backdropFilter: `url(#${filterId})`,
          WebkitBackdropFilter: `url(#${filterId})`,
        }}
      />
      <span className="relative z-10 pointer-events-none inline-flex items-center gap-1.5">{children as React.ReactNode}</span>
      <GlassDistortionFilter id={filterId} />
    </motion.button>
  );
});

function GlassDistortionFilter({ id }: { id: string }) {
  return (
    <svg aria-hidden className="absolute w-0 h-0">
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.08 0.08" numOctaves={1} seed={2} result="turbulence" />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale={16} xChannelSelector="R" yChannelSelector="B" result="displaced" />
        <feGaussianBlur in="displaced" stdDeviation="1.2" />
      </filter>
    </svg>
  );
}
