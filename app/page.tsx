"use client";

import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { DualColumnSection, type ProtocolFocus } from "@/components/dual-column-section";
import { ProtocolSearch } from "@/components/protocol-search";
import { loadProtocolCatalog } from "@/hooks/use-protocol-catalog";
import { EncapsulationSimulator } from "@/components/encapsulation-simulator";
import { FlowsSection } from "@/components/flows-section";
import { Language, DetailMode } from "@/lib/network-data";
import { motion } from "motion/react";
import { Network } from "lucide-react";

export default function Page() {
  const [lang, setLang] = useState<Language>("es");
  const [mode, setMode] = useState<DetailMode>("basic");
  const [searchOpen, setSearchOpen] = useState(false);
  const [focus, setFocus] = useState<ProtocolFocus | null>(null);
  const clearFocus = useCallback(() => setFocus(null), []);

  // Lleva a la tarjeta de la capa y abre la ficha del protocolo (búsqueda global y flujos)
  // La capa se toma del catálogo: la ficha vive en su capa principal, no en la que liste quien la invoca
  const openProtocol = useCallback((id: string, fallbackOsi: number) => {
    document.getElementById("layers")?.scrollIntoView({ behavior: "smooth" });
    loadProtocolCatalog().then((c) => setFocus({ id, osi: c.PROTOCOLS_BY_ID[id]?.osi[0] ?? fallbackOsi }));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const footerText = {
    es: "Arquitectura de Sistemas © 2026 • Francisco Mireles Rodriguez",
    en: "Systems Architecture © 2026 • Francisco Mireles Rodriguez"
  };

  return (
    <div className="mesh-gradient min-h-screen transition-colors duration-500">
      {/* Orbes ambientales animados */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.12 240), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.14 280), transparent 70%)" }}
        />
      </div>

      <Navbar
        currentLang={lang}
        onLanguageChange={setLang}
        mode={mode}
        onModeChange={setMode}
        onSearch={() => setSearchOpen(true)}
      />
      <ProtocolSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
        lang={lang}
        onSelect={(p) => openProtocol(p.id, p.osi[0])}
      />
      
      <main className="relative z-10 pt-20">
        <div id="hero"><HeroSection lang={lang} /></div>
        <div id="layers"><DualColumnSection lang={lang} mode={mode} focus={focus} onFocusHandled={clearFocus} /></div>
        <div id="trace"><EncapsulationSimulator lang={lang} mode={mode} /></div>
        <div id="flows"><FlowsSection lang={lang} mode={mode} onOpenProtocol={openProtocol} /></div>
      </main>

      <footer className="px-6 py-12 border-t border-primary/10 text-center relative z-10 mt-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-primary opacity-60">
            <Network className="w-5 h-5" />
            <span className="font-mono text-[10px] tracking-[0.3em]">OSI × TCP/IP</span>
          </div>
          <p className="text-xs font-mono text-muted-foreground italic">
            {footerText[lang]}
          </p>
        </div>
      </footer>
    </div>
  );
}