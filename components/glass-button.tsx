"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { HOVER_SPRING } from "@/components/glass-card";

const SIZES = {
  sm: "h-8 px-3 text-[11px]",
  default: "h-10 px-5 text-sm",
} as const;

export interface GlassButtonProps extends HTMLMotionProps<"button"> {
  /** Tiñe el vidrio y el borde; por defecto el color primario del tema. */
  glowColor?: string;
  size?: keyof typeof SIZES;
}

/**
 * Botón con el mismo vidrio esmerilado del resto del sitio: reutiliza la clase `.glass-card`
 * (fondo translúcido + blur(16px) + borde y sombra suaves), solo con el color de fondo y de
 * borde teñidos por `glowColor` para que cada instancia adopte el color de su capa.
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
  { glowColor = "var(--primary)", size = "default", className, children, type = "button", style, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={HOVER_SPRING}
      style={{
        background: `color-mix(in oklch, ${glowColor} 16%, var(--glass-bg))`,
        borderColor: `color-mix(in oklch, ${glowColor} 42%, var(--glass-border))`,
        ...style,
      }}
      className={cn(
        "glass-card inline-flex items-center justify-center gap-1.5 rounded-full font-mono font-bold transition-shadow duration-300 hover:shadow-lg",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
    </motion.button>
  );
});
